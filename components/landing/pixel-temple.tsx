'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type p5 from 'p5';

// Spec: landing-ref/visualization-details.txt. Cloud shapes after the pixel-art clouds in landing-ref/.
// Tones run highlight, body, shadow: lightest to darkest in both themes.
const TONES = {
  light: ['BgActive', 'Surface', 'Medium'],
  dark: ['FadedText', 'Medium', 'Surface'],
} as const;
const BREATH_AMOUNT = 0.04;
const BREATH_PERIOD = 9;
const OPEN_SECONDS = 1.5;
const CLEARING_MARGIN = 1.25; // clouds start 25% beyond the h1 box
const POCKET_RADIUS_PX = 60;
const POCKET_REFILL_SECONDS = 0.8;
const MORPH = 0.04;

type RGB = [number, number, number];
type Lump = { c: number; r: number; h: number; seed: number };
type Cloud = {
  x: number; // px, left-to-right drift
  yFrac: number; // flat bottom, as a fraction of the stage height
  w: number; // body half-width, cells
  speed: number; // px per second
  seed: number;
  lumps: Lump[];
  tailL: number;
  tailR: number;
};

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Superellipse (p=4) distance: 1 on the h1 box's edge, so the clearing hugs the copy at every wrap.
function clearingDistance(dx: number, dy: number, rx: number, ry: number) {
  return Math.pow((dx / rx) ** 4 + (dy / ry) ** 4, 0.25);
}

function readPalette(dark: boolean): RGB[] {
  const style = getComputedStyle(document.documentElement);
  return TONES[dark ? 'dark' : 'light'].map((tone) => {
    const hex = style.getPropertyValue(`--color-${dark ? 'dm' : 'lm'}${tone}`).trim();
    const n = parseInt(hex.slice(1, 7), 16);
    return Number.isNaN(n) ? [128, 128, 128] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  });
}

function isDark() {
  return document.documentElement.classList.contains('dark');
}

function makeClouds(cols: number, rows: number, widthPx: number): Cloud[] {
  const count = Math.min(16, Math.max(7, Math.round((cols * rows) / 3500)));
  const sizeScale = Math.min(1, Math.max(0.6, cols / 250));
  const lanes = Array.from({ length: count }, (_, i) => i).sort(() => Math.random() - 0.5);
  return lanes
    .map((lane) => {
      const depth = Math.random();
      const w = (8 + 32 * depth) * sizeScale;
      const height = w * (0.55 + Math.random() * 0.2);
      const lumpCount = 3 + Math.floor(Math.random() * 4);
      const lumps = Array.from({ length: lumpCount }, (_, i) => {
        const along = lumpCount === 1 ? 0 : i / (lumpCount - 1) - 0.5; // -0.5..0.5 across the body
        const r = w * (0.25 + Math.random() * 0.25);
        return {
          c: along * w * 1.4 + (Math.random() - 0.5) * w * 0.2,
          r,
          // taller lumps toward the middle give the stacked, domed top; capped so no lump becomes a pillar
          h: Math.min(r,height * (0.5 + 0.5 * (1 - Math.abs(along) * 1.4) + Math.random() * 0.2)),
          seed: Math.random() * 1000,
        };
      });
      return {
        x: Math.random() * widthPx,
        yFrac: (lane + 0.6 + (Math.random() - 0.5) * 0.6) / count,
        w,
        speed: 3 + 6 * depth, // nearer, bigger clouds move faster
        seed: Math.random() * 1000,
        lumps,
        tailL: Math.random() < 0.5 ? w * (0.3 + Math.random() * 0.5) : 0,
        tailR: Math.random() < 0.6 ? w * (0.3 + Math.random() * 0.6) : 0,
      };
    })
    .sort((a, b) => a.speed - b.speed); // far clouds first
}

export default function PixelTemple({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const host = canvasHostRef.current;
    const title = titleRef.current;
    if (!section || !stage || !host || !title) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let instance: p5 | undefined;
    let cancelled = false;
    const cleanups: (() => void)[] = [];

    import('p5')
      .then(({ default: P5 }) => {
        if (cancelled) return;
        instance = new P5((p: p5) => {
          let cell = 5;
          let cols = 0;
          let rows = 0;
          let field = new Uint8Array(0); // 0 empty, 1 highlight, 2 body, 3 shadow
          let pocket = new Float32Array(0); // cursor wake, refills over time
          // The frame is drawn one pixel per cell, then scaled up with smoothing off.
          const buffer = document.createElement('canvas');
          const bufferCtx = buffer.getContext('2d')!;
          let image = new ImageData(1, 1);
          let pixels = new Uint32Array(image.data.buffer);
          let clouds: Cloud[] = [];
          // Clearing centre and half-extents of the h1 box, in cells.
          let cx = 0, cy = 0, rx = 1, ry = 1;
          let t = 0, breathPhase = 0, calm = 0;
          let open = reduced ? 1 : 0;
          let revealed = false;
          const pointer = { x: 0, y: 0, active: false };
          const trail = { x: 0, y: 0 };

          const fadeMs = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-bc2')) || 0.25) * 1000;
          let fromPalette = readPalette(isDark());
          let toPalette = fromPalette;
          let fadeStart = -Infinity;

          const packedPaletteAt = (now: number) => {
            const k = Math.min(1, (now - fadeStart) / fadeMs);
            return toPalette.map((to, i) => {
              const [r, g, b] = to.map((c, j) => Math.round(fromPalette[i][j] + (c - fromPalette[i][j]) * k));
              return ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0; // ImageData is little-endian RGBA
            });
          };
          const paletteAt = (now: number): RGB[] => {
            const k = Math.min(1, (now - fadeStart) / fadeMs);
            return toPalette.map((to, i) => to.map((c, j) => fromPalette[i][j] + (c - fromPalette[i][j]) * k) as RGB);
          };

          const measure = () => {
            const w = stage.clientWidth;
            const h = stage.clientHeight;
            cell = w < 640 ? 7 : 5;
            cols = Math.ceil(w / cell);
            rows = Math.ceil(h / cell);
            field = new Uint8Array(cols * rows);
            pocket = new Float32Array(cols * rows);
            buffer.width = cols;
            buffer.height = rows;
            image = new ImageData(cols, rows);
            pixels = new Uint32Array(image.data.buffer);
            if (clouds.length === 0) clouds = makeClouds(cols, rows, w);
            // offsets ignore the h1's fade, and its offsetParent is the stage-sized overlay
            cx = (title.offsetLeft + title.offsetWidth / 2) / cell;
            cy = (title.offsetTop + title.offsetHeight / 2) / cell;
            rx = title.offsetWidth / 2 / cell + 1;
            ry = title.offsetHeight / 2 / cell + 1;
          };

          const paint = (x: number, y: number, tone: number) => {
            if (x >= 0 && x < cols && y >= 0 && y < rows) field[y * cols + x] = tone;
          };

          // Column-by-column: a domed, stepped top from stacked lumps, a flat bottom that
          // steps up at the ends, tapered tails, and highlight/shadow bands with stepped edges.
          // `s` scales the clearing box (half-extents rx*s, ry*s around cx, cy).
          const rasterize = (cloud: Cloud, s: number) => {
            const lumps = cloud.lumps.map((lump) => ({
              c: lump.c + (p.noise(lump.seed + 50, t * MORPH * 0.75) - 0.5) * cloud.w * 0.3,
              r: lump.r,
              h: lump.h * (0.7 + 0.6 * p.noise(lump.seed, t * MORPH)),
            }));
            const left = Math.min(...lumps.map((l) => l.c - l.r));
            const right = Math.max(...lumps.map((l) => l.c + l.r));
            const height = Math.max(...lumps.map((l) => l.h));
            const tailL = cloud.tailL * (0.6 + 0.8 * p.noise(cloud.seed, t * MORPH));
            const tailR = cloud.tailR * (0.6 + 0.8 * p.noise(cloud.seed + 20, t * MORPH));
            const ox = Math.round(cloud.x / cell);
            let base = Math.round(cloud.yFrac * rows);

            // Parting: as a cloud drifts into the clearing's columns, the whole cloud rises
            // or sinks out of its way, so its shape stays intact.
            const overlapX = Math.min(ox + right + tailR, cx + rx * s) - Math.max(ox + left - tailL, cx - rx * s);
            const approach = smoothstep(-cloud.w, 0, overlapX);
            if (approach > 0) {
              const gap = 2;
              const above = base - height / 2 < cy;
              const need = above
                ? Math.max(0, base - (cy - ry * s) + gap)
                : Math.max(0, cy + ry * s - (base - height) + gap);
              base += Math.round((above ? -need : need) * approach);
            }

            for (let u = Math.floor(left - tailL); u <= Math.ceil(right + tailR); u++) {
              let top = 0;
              for (const l of lumps) {
                const k = (u - l.c) / l.r;
                if (k > -1 && k < 1) top = Math.max(top, l.h * Math.sqrt(1 - k * k));
              }
              const x = ox + u;
              const fromEdge = Math.min(u - left, right - u);
              if (top >= 2) {
                const lift = fromEdge < cloud.w * 0.3 ? Math.floor((cloud.w * 0.3 - fromEdge) * 0.5) : 0;
                const yTop = base - Math.round(top);
                const yBottom = base - lift;
                if (yBottom - yTop < 1) continue;
                const span = yBottom - yTop + 1;
                const wobble = p.noise(cloud.seed + u * 0.18, t * MORPH);
                const highlight = Math.max(1, Math.round(span * 0.18 + wobble * 3));
                const shadow = Math.max(1, Math.round(span * 0.28 + (wobble - 0.5) * 6));
                for (let y = yTop; y <= yBottom; y++) {
                  paint(x, y, y < yTop + highlight ? 1 : y > yBottom - shadow ? 3 : 2);
                }
              } else {
                // Tail: a thin band off the body's lower side, tapering to one cell.
                const into = u < left + cloud.w * 0.5 ? (left - u) / Math.max(1, tailL) : (u - right) / Math.max(1, tailR);
                if (into > 1) continue;
                const k = Math.max(0, into);
                const thickness = Math.max(1, Math.round(3 * (1 - k)));
                const yBottom = base - 1 - Math.round(k * 2);
                for (let y = yBottom - thickness + 1; y <= yBottom; y++) paint(x, y, y === yBottom - thickness + 1 ? 1 : 2);
              }
            }
          };

          // Scale at which the clearing passes every corner of the stage.
          const fullClearScale = () =>
            Math.max(...[[0, 0], [cols, 0], [0, rows], [cols, rows]].map(([x, y]) => clearingDistance(x - cx, y - cy, rx, ry)));

          const scrollProgress = () => {
            const rect = section.getBoundingClientRect();
            const range = rect.height - window.innerHeight;
            return range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
          };

          p.setup = () => {
            const canvas = p.createCanvas(stage.clientWidth, stage.clientHeight);
            canvas.parent(host);
            measure();
            if (reduced) p.noLoop();
          };

          p.draw = () => {
            const now = p.millis();
            const dt = Math.min(0.05, p.deltaTime / 1000);
            const width = stage.clientWidth;

            if (!reduced) {
              open = Math.min(1, open + dt / OPEN_SECONDS);
              trail.x += (pointer.x - trail.x) * 0.15;
              trail.y += (pointer.y - trail.y) * 0.15;
              const inside = pointer.active && clearingDistance(pointer.x - cx, pointer.y - cy, rx, ry) < CLEARING_MARGIN;
              calm += ((inside ? 1 : 0) - calm) * Math.min(1, dt * 2);
              const refill = dt / POCKET_REFILL_SECONDS;
              for (let i = 0; i < pocket.length; i++) if (pocket[i] > 0) pocket[i] = Math.max(0, pocket[i] - refill);
              if (pointer.active) {
                const r = POCKET_RADIUS_PX / cell;
                for (let y = Math.max(0, Math.floor(trail.y - r)); y <= Math.min(rows - 1, Math.ceil(trail.y + r)); y++) {
                  for (let x = Math.max(0, Math.floor(trail.x - r)); x <= Math.min(cols - 1, Math.ceil(trail.x + r)); x++) {
                    const strength = 1 - smoothstep(0.35, 1, Math.hypot(x - trail.x, y - trail.y) / r);
                    const i = y * cols + x;
                    if (strength > pocket[i]) pocket[i] = strength;
                  }
                }
              }
              const pace = 1 - 0.95 * calm;
              t += dt * pace;
              breathPhase += dt * ((2 * Math.PI) / BREATH_PERIOD) * pace;
              for (const cloud of clouds) {
                cloud.x += cloud.speed * dt * pace;
                const reach = (cloud.w * 2 + cloud.tailL + cloud.tailR) * cell;
                if (cloud.x - reach > width) cloud.x = -reach; // wrap around
              }
            }

            if (!revealed && open > 0.7) {
              revealed = true;
              setIsOpen(true);
            }

            const eased = 1 - Math.pow(1 - open, 3);
            const breath = 1 + BREATH_AMOUNT * (1 - 0.8 * calm) * Math.sin(breathPhase);
            const widen = reduced ? 1 : 1 + (fullClearScale() / CLEARING_MARGIN - 1) * smoothstep(0, 1, scrollProgress());
            const s = CLEARING_MARGIN * eased * breath * widen;
            const tones = packedPaletteAt(now);

            field.fill(0);
            for (const cloud of clouds) rasterize(cloud, s);

            // Hard pixel edges: whatever is still inside the clearing or the cursor's wake is cut.
            for (let y = 0; y < rows; y++) {
              for (let x = 0; x < cols; x++) {
                const i = y * cols + x;
                const tone = field[i];
                pixels[i] =
                  tone && pocket[i] < 0.5 && clearingDistance(x + 0.5 - cx, y + 0.5 - cy, rx, ry) >= s ? tones[tone - 1] : 0;
              }
            }

            bufferCtx.putImageData(image, 0, 0);
            const ctx = p.drawingContext as CanvasRenderingContext2D;
            p.clear();
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(buffer, 0, 0, cols * cell, rows * cell);
          };

          // Run only while the tab and the hero are visible.
          let tabVisible = !document.hidden;
          let onScreen = true;
          const syncLoop = () => {
            if (reduced) return;
            if (tabVisible && onScreen) p.loop();
            else p.noLoop();
          };
          const onVisibility = () => {
            tabVisible = !document.hidden;
            syncLoop();
          };
          document.addEventListener('visibilitychange', onVisibility);
          cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

          const intersection = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            syncLoop();
          });
          intersection.observe(stage);
          cleanups.push(() => intersection.disconnect());

          const resize = new ResizeObserver(() => {
            if (!p.drawingContext) return;
            p.resizeCanvas(stage.clientWidth, stage.clientHeight);
            measure();
            if (reduced) p.redraw();
          });
          resize.observe(stage);
          resize.observe(title);
          cleanups.push(() => resize.disconnect());

          const theme = new MutationObserver(() => {
            const now = p.millis();
            fromPalette = paletteAt(now);
            toPalette = readPalette(isDark());
            fadeStart = reduced ? -Infinity : now;
            if (reduced) p.redraw();
          });
          theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
          cleanups.push(() => theme.disconnect());

          if (!reduced) {
            const toCells = (e: PointerEvent) => {
              const rect = stage.getBoundingClientRect();
              pointer.x = (e.clientX - rect.left) / cell;
              pointer.y = (e.clientY - rect.top) / cell;
            };
            const onMove = (e: PointerEvent) => {
              toCells(e);
              if (e.pointerType === 'mouse') pointer.active = true;
            };
            const onDown = (e: PointerEvent) => {
              toCells(e);
              trail.x = pointer.x;
              trail.y = pointer.y;
              pointer.active = true;
            };
            const onUp = (e: PointerEvent) => {
              if (e.pointerType !== 'mouse') pointer.active = false;
            };
            const onLeave = () => {
              pointer.active = false;
            };
            const listeners: [string, (e: PointerEvent) => void][] = [
              ['pointermove', onMove],
              ['pointerdown', onDown],
              ['pointerup', onUp],
              ['pointercancel', onLeave],
              ['pointerleave', onLeave],
            ];
            listeners.forEach(([type, fn]) => stage.addEventListener(type, fn as EventListener));
            cleanups.push(() => listeners.forEach(([type, fn]) => stage.removeEventListener(type, fn as EventListener)));
          }
        });
      })
      .catch(() => setIsOpen(true));

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      instance?.remove();
    };
  }, []);

  return (
    // Two screens tall: the second scrolls the clearing open until the clouds are gone.
    <section ref={sectionRef} className="relative h-[200dvh] motion-reduce:h-dvh">
      <div ref={stageRef} className="sticky top-0 h-dvh w-full overflow-hidden">
        <div ref={canvasHostRef} className="absolute inset-0 [image-rendering:pixelated]" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <h1
            ref={titleRef}
            className={`max-w-[44rem] @min-[50em]/viewport:max-w-[56rem] text-center reveal-transition ${isOpen ? 'opacity-100' : 'motion-safe:opacity-0'}`}
          >
            {children}
          </h1>
        </div>
      </div>
    </section>
  );
}
