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
// Ordered dither: the clearing's edge thins out over a band (EDGE - 1) * s * ry cells wide on every side,
// so the sides of a wide title fade as quickly as its top and bottom.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const EDGE = 1.6;
const TEXT_GAP_CELLS = 1;
// The first visible dot (smoothstep reaching the smallest BAYER threshold) sits (FIRST_DOT_D - 1) * s * ry cells out.
const FIRST_DOT_D = 1.06;

type RGB = [number, number, number];
type Lump = { c: number; r: number; h: number; seed: number };
type Cloud = {
  x: number; // px, left-to-right drift
  yFrac: number; // flat bottom, as a fraction of the stage height
  w: number; // body half-width, cells
  speed: number; // px per second
  seed: number;
  lumps: Lump[];
  hasSuccessor: boolean; // each cloud spawns at most one replacement
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

function cloudSizeScale(cols: number) {
  return Math.min(1, Math.max(0.6, cols / 250));
}

function makeCloud(yFrac: number, sizeScale: number, x: number): Cloud {
  const depth = Math.random();
  const w = (8 + 32 * depth) * sizeScale;
  const height = w * (0.55 + Math.random() * 0.2);
  const lumpCount = 3 + Math.floor(Math.random() * 4);
  const lumps = Array.from({ length: lumpCount }, (_, i) => {
    const along = lumpCount === 1 ? 0 : i / (lumpCount - 1) - 0.5; // -0.5..0.5 across the body
    const centre = 1 - Math.abs(along) * 2; // 1 in the middle, 0 at the ends
    // wider and taller puffs toward the middle give the billowing top in landing-ref/
    const r = w * (0.22 + 0.22 * centre + Math.random() * 0.15);
    return {
      c: along * w * 1.4 + (Math.random() - 0.5) * w * 0.2,
      r,
      // capped a little above a half-circle so no lump becomes a pillar
      h: Math.min(r * 1.15, height * (0.45 + 0.6 * centre + Math.random() * 0.15)),
      seed: Math.random() * 1000,
    };
  });
  return {
    x,
    yFrac,
    w,
    speed: 3 + 6 * depth, // nearer, bigger clouds move faster
    seed: Math.random() * 1000,
    lumps,
    hasSuccessor: false,
  };
}

// Rightmost reach in cells from the cloud's origin, at the widest its morphing allows
// (lumps shift up to +0.15w; see shapeOf).
function maxRightReach(cloud: Cloud) {
  return Math.max(...cloud.lumps.map((l) => l.c + l.r)) + cloud.w * 0.15 + 1;
}

// cx, cy, rx, ry: the clearing's centre and resting half-extents, in cells.
function makeClouds(cols: number, rows: number, widthPx: number, cx: number, cy: number, rx: number, ry: number): Cloud[] {
  const count = Math.min(16, Math.max(9, Math.round((cols * rows) / 3500)));
  const sizeScale = cloudSizeScale(cols);
  const cellPx = widthPx / cols;
  const lanes = Array.from({ length: count }, (_, i) => i).sort(() => Math.random() - 0.5);
  return lanes
    .map((lane) => {
      const cloud = makeCloud((lane + 0.6 + (Math.random() - 0.5) * 0.6) / count, sizeScale, 0);
      const base = cloud.yFrac * rows;
      const top = base - Math.max(...cloud.lumps.map((l) => l.h));
      if (base >= cy - ry && top <= cy + ry) {
        // Rows the clearing opens through start with a cloud behind the title, so the
        // load animation has sky to open.
        cloud.x = (cx + (Math.random() - 0.5) * 0.5 * rx) * cellPx;
        return cloud;
      }
      // Start anywhere from just off-screen left to the right edge, so on narrow screens
      // the first clouds don't all leave together and empty the sky.
      const offLeft = maxRightReach(cloud) * cellPx;
      cloud.x = -offLeft + Math.random() * (widthPx + offLeft);
      return cloud;
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
            // offsets ignore the h1's fade, and its offsetParent is the stage-sized overlay
            cx = (title.offsetLeft + title.offsetWidth / 2) / cell;
            cy = (title.offsetTop + title.offsetHeight / 2) / cell;
            // The first dither dot sits TEXT_GAP_CELLS past the rendered text (the longest line sideways,
            // the first and last lines' glyphs vertically, not the h1 box with its leading),
            // even at the breath's smallest scale, so the dither starts right after the copy.
            const range = document.createRange();
            range.selectNodeContents(title);
            const text = range.getBoundingClientRect();
            // The first dot sits s * (r + (FIRST_DOT_D - 1) * ry) out on either axis, since the band is sized from ry.
            const sMin = CLEARING_MARGIN * (1 - BREATH_AMOUNT);
            ry = (text.height / 2 / cell + TEXT_GAP_CELLS) / (sMin * FIRST_DOT_D);
            rx = (text.width / 2 / cell + TEXT_GAP_CELLS) / sMin - (FIRST_DOT_D - 1) * ry;
            if (clouds.length === 0) {
              const band = (EDGE - 1) * ry; // outer edge of the resting fade
              clouds = makeClouds(cols, rows, w, cx, cy, CLEARING_MARGIN * (rx + band), CLEARING_MARGIN * (ry + band));
            }
          };

          const paint = (x: number, y: number, tone: number) => {
            if (x >= 0 && x < cols && y >= 0 && y < rows) field[y * cols + x] = tone;
          };

          // The cloud's morphed shape right now. paintLeft/paintRight are the first and last
          // painted columns, relative to the origin column Math.round(x / cell).
          const shapeOf = (cloud: Cloud) => {
            const lumps = cloud.lumps.map((lump) => ({
              c: lump.c + (p.noise(lump.seed + 50, t * MORPH * 0.75) - 0.5) * cloud.w * 0.3,
              r: lump.r,
              h: lump.h * (0.7 + 0.6 * p.noise(lump.seed, t * MORPH)),
            }));
            const left = Math.min(...lumps.map((l) => l.c - l.r));
            const right = Math.max(...lumps.map((l) => l.c + l.r));
            return {
              lumps,
              left,
              right,
              height: Math.max(...lumps.map((l) => l.h)),
              paintLeft: Math.floor(left),
              paintRight: Math.ceil(right),
            };
          };

          // Column-by-column: a domed, stepped top from stacked lumps, a flat bottom that
          // steps up at the ends, and highlight/shadow bands with stepped edges.
          const rasterize = (cloud: Cloud) => {
            const { lumps, left, right, height, paintLeft, paintRight } = shapeOf(cloud);
            const ox = Math.round(cloud.x / cell);
            if (ox + paintRight < 0 || ox + paintLeft >= cols) return; // entirely off-screen sideways
            const base = Math.round(cloud.yFrac * rows);
            if (base < 0 || base - Math.ceil(height) >= rows) return; // entirely off the top or bottom

            // Pass 1: the body's rows per column, or null where the dome is too low or the
            // lifted bottom meets the top.
            const body: ({ yTop: number; yBottom: number } | null)[] = [];
            let first = Infinity, last = -Infinity; // u can be negative, so no -1 sentinel
            for (let u = paintLeft; u <= paintRight; u++) {
              let top = 0;
              for (const l of lumps) {
                const k = (u - l.c) / l.r;
                if (k > -1 && k < 1) top = Math.max(top, l.h * Math.sqrt(1 - k * k));
              }
              const fromEdge = Math.min(u - left, right - u);
              const lift = Math.max(0, 2 - Math.floor(fromEdge / 2)); // corners step up 1–2 cells, as in landing-ref/
              const yTop = base - Math.round(top);
              const yBottom = base - lift;
              const visible = top >= 2 && yBottom - yTop >= 1;
              body.push(visible ? { yTop, yBottom } : null);
              if (visible) {
                first = Math.min(first, u);
                last = u;
              }
            }
            if (last < first) return; // nothing visible

            let edge = body[first - paintLeft]!;
            for (let u = first; u <= last; u++) {
              const x = ox + u;
              const col = body[u - paintLeft];
              if (col) {
                edge = col;
                const { yTop, yBottom } = col;
                const span = yBottom - yTop + 1;
                const wobble = p.noise(cloud.seed + u * 0.18, t * MORPH);
                const highlight = Math.max(1, Math.round(span * 0.18 + wobble * 3));
                const shadow = Math.max(1, Math.round(span * 0.28 + (wobble - 0.5) * 6));
                for (let y = yTop; y <= yBottom; y++) {
                  paint(x, y, y < yTop + highlight ? 1 : y > yBottom - shadow ? 3 : 2);
                }
              } else {
                // A dip between lumps: bridge it with a band level with the previous column's top.
                const yBottom = Math.min(edge.yBottom, edge.yTop + 2);
                for (let y = edge.yTop; y <= yBottom; y++) paint(x, y, y === edge.yTop ? 1 : 2);
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
              const successors: Cloud[] = [];
              clouds = clouds.filter((cloud) => {
                cloud.x += cloud.speed * dt * pace;
                const ox = Math.round(cloud.x / cell);
                const { paintLeft, paintRight } = shapeOf(cloud);
                // Halfway out on the right: spawn one new cloud in the same lane, placed so its
                // rightmost painted column sits just off the left edge, to drift in without popping.
                if (!cloud.hasSuccessor && ox + (paintLeft + paintRight) / 2 >= cols) {
                  cloud.hasSuccessor = true;
                  const fresh = makeCloud(cloud.yFrac, cloudSizeScale(cols), 0);
                  fresh.x = -(shapeOf(fresh).paintRight + 1) * cell;
                  successors.push(fresh);
                }
                return ox + paintLeft < cols; // drop once its leftmost painted column is past the right edge
              });
              if (successors.length > 0) {
                clouds.push(...successors);
                clouds.sort((a, b) => a.speed - b.speed); // far clouds first
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
            for (const cloud of clouds) rasterize(cloud);

            // Render mask: the clearing fades out in dither (s = 0 draws everything), the cursor's wake is cut.
            // The superellipse overshoot D - 1 divided by its gradient is the distance in cells past the
            // clearing, so the band keeps one width all the way round.
            const a = s * rx, b = s * ry;
            const band = (EDGE - 1) * b;
            for (let y = 0; y < rows; y++) {
              const Y = (y + 0.5 - cy) / b;
              const Y3 = Y * Y * Y;
              const gy = Y3 / b;
              for (let x = 0; x < cols; x++) {
                const i = y * cols + x;
                const tone = field[i];
                let fade = 1;
                if (s > 0) {
                  const X = (x + 0.5 - cx) / a;
                  const X3 = X * X * X;
                  const gx = X3 / a;
                  const D = Math.sqrt(Math.sqrt(X3 * X + Y3 * Y));
                  fade = smoothstep(0, 1, ((D - 1) * D * D * D) / (Math.sqrt(gx * gx + gy * gy) * band));
                }
                pixels[i] = tone && pocket[i] < 0.5 && fade >= BAYER[(y & 3) * 4 + (x & 3)] ? tones[tone - 1] : 0;
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
            className={`max-w-176 @min-[50em]/viewport:max-w-4xl text-center reveal-transition ${isOpen ? 'opacity-100' : 'motion-safe:opacity-0'}`}
          >
            {children}
          </h1>
        </div>
      </div>
    </section>
  );
}
