'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type p5 from 'p5';

// Spec: landing-ref/visualization-details.txt
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const TONES = ['Surface', 'Medium', 'Secondary'] as const;
const NOISE_SCALE = 0.06;
const DRIFT = NOISE_SCALE / 2.5; // about one cell every 2.5s
const MORPH = 0.03;
const BREATH_AMOUNT = 0.04;
const BREATH_PERIOD = 9;
const OPEN_SECONDS = 1.5;
const EDGE = 1.6;
const POCKET_RADIUS = 6;
const POCKET_REFILL_SECONDS = 0.8;

type RGB = [number, number, number];

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Superellipse (p=4) distance: 1 on the h1 box's edge. A plain ellipse around a wide
// text box overflows narrow screens; this one hugs the copy at every wrap.
function clearingDistance(dx: number, dy: number, rx: number, ry: number) {
  return Math.pow((dx / rx) ** 4 + (dy / ry) ** 4, 0.25);
}

function readPalette(dark: boolean): RGB[] {
  const style = getComputedStyle(document.documentElement);
  return TONES.map((tone) => {
    const hex = style.getPropertyValue(`--color-${dark ? 'dm' : 'lm'}${tone}`).trim();
    const n = parseInt(hex.slice(1, 7), 16);
    return Number.isNaN(n) ? [128, 128, 128] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  });
}

function isDark() {
  return document.documentElement.classList.contains('dark');
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
          let cell = 10;
          let cols = 0;
          let rows = 0;
          let pocket = new Float32Array(0);
          let buckets = [new Int32Array(0), new Int32Array(0), new Int32Array(0)];
          // Clearing centre and half-extents of the h1 box, in cells.
          let cx = 0, cy = 0, rx = 1, ry = 1;
          let tx = 0, tz = 0, breathPhase = 0, calm = 0;
          let open = reduced ? 1 : 0;
          let revealed = false;
          const pointer = { x: 0, y: 0, active: false };
          const trail = { x: 0, y: 0 };

          const fadeMs = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-bc2')) || 0.25) * 1000;
          let fromPalette = readPalette(isDark());
          let toPalette = fromPalette;
          let fadeStart = -Infinity;

          const paletteAt = (now: number): RGB[] => {
            const k = Math.min(1, (now - fadeStart) / fadeMs);
            return toPalette.map((to, i) => to.map((c, j) => fromPalette[i][j] + (c - fromPalette[i][j]) * k) as RGB);
          };

          const measure = () => {
            const w = stage.clientWidth;
            const h = stage.clientHeight;
            cell = w < 640 ? 14 : 10;
            cols = Math.ceil(w / cell);
            rows = Math.ceil(h / cell);
            pocket = new Float32Array(cols * rows);
            buckets = [new Int32Array(cols * rows), new Int32Array(cols * rows), new Int32Array(cols * rows)];
            // offsets ignore the h1's fade, and its offsetParent is the stage-sized overlay
            cx = (title.offsetLeft + title.offsetWidth / 2) / cell;
            cy = (title.offsetTop + title.offsetHeight / 2) / cell;
            rx = title.offsetWidth / 2 / cell + 1;
            ry = title.offsetHeight / 2 / cell + 1;
          };

          // Scale at which the clearing passes every corner of the stage.
          const fullClearScale = () =>
            Math.max(
              ...[[0, 0], [cols, 0], [0, rows], [cols, rows]].map(([x, y]) =>
                clearingDistance(x - cx, y - cy, rx, ry),
              ),
            ) * EDGE;

          const scrollProgress = () => {
            const rect = section.getBoundingClientRect();
            const range = rect.height - window.innerHeight;
            return range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
          };

          p.setup = () => {
            const canvas = p.createCanvas(stage.clientWidth, stage.clientHeight);
            canvas.parent(host);
            p.noiseDetail(3, 0.5);
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
              const inside = pointer.active && clearingDistance(pointer.x - cx, pointer.y - cy, rx, ry) < 1;
              calm += ((inside ? 1 : 0) - calm) * Math.min(1, dt * 2);
              const pace = 1 - 0.95 * calm;
              tx += dt * DRIFT * pace;
              tz += dt * MORPH * pace;
              breathPhase += dt * ((2 * Math.PI) / BREATH_PERIOD) * pace;

              const refill = dt / POCKET_REFILL_SECONDS;
              for (let i = 0; i < pocket.length; i++) if (pocket[i] > 0) pocket[i] = Math.max(0, pocket[i] - refill);
              if (pointer.active) {
                const r = POCKET_RADIUS;
                for (let y = Math.max(0, Math.floor(trail.y - r)); y <= Math.min(rows - 1, Math.ceil(trail.y + r)); y++) {
                  for (let x = Math.max(0, Math.floor(trail.x - r)); x <= Math.min(cols - 1, Math.ceil(trail.x + r)); x++) {
                    const strength = 1 - smoothstep(0.35, 1, Math.hypot(x - trail.x, y - trail.y) / r);
                    const i = y * cols + x;
                    if (strength > pocket[i]) pocket[i] = strength;
                  }
                }
              }
            }

            if (!revealed && open > 0.7) {
              revealed = true;
              setIsOpen(true);
            }

            const eased = 1 - Math.pow(1 - open, 3);
            const breath = 1 + BREATH_AMOUNT * (1 - 0.8 * calm) * Math.sin(breathPhase);
            const widen = reduced ? 1 : 1 + (fullClearScale() - 1) * smoothstep(0, 1, scrollProgress());
            const scale = Math.max(1e-3, eased * breath * widen);

            const counts = [0, 0, 0];
            for (let y = 0; y < rows; y++) {
              for (let x = 0; x < cols; x++) {
                const n = p.noise(x * NOISE_SCALE + tx, y * NOISE_SCALE, tz);
                const density = Math.min(1, Math.max(0, (n - 0.4) / 0.32));
                const d = clearingDistance(x - cx, y - cy, rx, ry) / scale;
                const i = y * cols + x;
                const v = density * smoothstep(1, EDGE, d) * (1 - pocket[i]);
                const threshold = BAYER[(y & 3) * 4 + (x & 3)];
                if (v < threshold) continue;
                // A rare Secondary pixel only in the densest cores.
                const tone = v > 0.7 ? (v >= 0.98 && threshold < 0.1 ? 2 : 1) : 0;
                buckets[tone][counts[tone]++] = i;
              }
            }

            const ctx = p.drawingContext as CanvasRenderingContext2D;
            p.clear();
            paletteAt(now).forEach(([r, g, b], tone) => {
              ctx.fillStyle = `rgb(${r},${g},${b})`;
              const bucket = buckets[tone];
              for (let k = 0; k < counts[tone]; k++) {
                const i = bucket[k];
                ctx.fillRect((i % cols) * cell, Math.floor(i / cols) * cell, cell, cell);
              }
            });
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
    // Two screens tall: the second scrolls the clearing open until the cloud is gone.
    <section ref={sectionRef} className="relative h-[200dvh] motion-reduce:h-dvh">
      <div ref={stageRef} className="sticky top-0 h-dvh w-full overflow-hidden">
        <div ref={canvasHostRef} className="absolute inset-0" aria-hidden="true" />
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
