'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

// content pins at its bottom edge, then fades out while heldContent fades in over it in the same cell.
// The stage scrolls like normal content except at the swap: crossing the pin point (either way) pins it until the
// incoming side's fade ends, then it releases where it sits.
export default function PinnedSwap({ content, heldContent }: { content: ReactNode; heldContent: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heldRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isPinning, setIsPinning] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setContentHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const contentEl = contentRef.current;
    const held = heldRef.current;
    const spacer = spacerRef.current;
    if (!section || !contentEl || !held || !spacer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIsPinning(true);
    // The hold lives here, not in React state: growing the spacer and scrolling to match must land in the same frame.
    // The stage is pinned while 0 <= past <= spacer height; both sections are min-h-dvh, so the spacer's end is
    // always off screen while pinned and resizing it never moves anything visible.
    const EPS = 1;
    let swapped = false;
    let holding = false;
    const room = () => 2 * window.innerHeight; // pinned scroll available during a hold
    // Scroll past the pin point (the sticky top, same formula as the style below).
    const past = () => Math.min(0, window.innerHeight - contentEl.getBoundingClientRect().height) - section.getBoundingClientRect().top;
    const setSpacer = (px: number) => (spacer.style.height = `${px}px`);
    const swap = (next: boolean, hold: boolean) => {
      swapped = next;
      holding = hold;
      setIsSwapped(next);
    };

    const onScroll = () => {
      const p = past();
      const h = spacer.offsetHeight;
      if (!swapped && (holding ? p > h + EPS : p > EPS)) {
        // Down: reached the pin point from above (or fell off the bottom of an up hold). Hold only if pinned now.
        swap(true, !holding && p <= h);
      } else if (swapped && (holding ? p < -EPS : p < h - EPS)) {
        // Up: re-pinned at the spacer's end from below (or ran off the top of a down hold).
        if (!holding && p >= 0) {
          // Only p px of pinned scroll is left above; add room and scroll by the same amount so nothing moves.
          const add = room() - p;
          setSpacer(h + add);
          window.scrollBy(0, add);
          swap(false, true);
        } else {
          setSpacer(Math.max(h, room()));
          swap(false, false);
        }
      }
    };

    // Down release: end the pin exactly where the stage sits (capped in case a fling already passed it).
    const onHeldEnd = (e: TransitionEvent) => {
      if (!swapped || !holding || e.target !== held || e.propertyName !== 'opacity') return;
      setSpacer(Math.min(Math.max(past(), 0), spacer.offsetHeight));
      holding = false;
    };
    // Up release: move the stage to the top end of its pin range so the next upward scroll unpins it.
    const onContentEnd = (e: TransitionEvent) => {
      if (swapped || !holding || e.target !== contentEl || e.propertyName !== 'opacity') return;
      const p = past();
      if (p > 0 && p <= spacer.offsetHeight) window.scrollBy(0, -p);
      holding = false;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    held.addEventListener('transitionend', onHeldEnd);
    contentEl.addEventListener('transitionend', onContentEnd);
    return () => {
      window.removeEventListener('scroll', onScroll);
      held.removeEventListener('transitionend', onHeldEnd);
      contentEl.removeEventListener('transitionend', onContentEnd);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="motion-safe:sticky grid" style={{ top: `min(0px, 100dvh - ${contentHeight}px)` }}>
        <div
          ref={contentRef}
          inert={isSwapped}
          className={`motion-safe:row-1 motion-safe:col-1 motion-safe:self-start ${isSwapped ? 'reveal-transition motion-safe:opacity-0 motion-safe:pointer-events-none' : 'reveal-transition-after'}`}
        >
          {content}
        </div>
        <div
          ref={heldRef}
          inert={isPinning && !isSwapped}
          className={`motion-safe:row-1 motion-safe:col-1 motion-safe:self-end ${isSwapped ? 'reveal-transition-after' : 'reveal-transition motion-safe:opacity-0 motion-safe:translate-y-8 motion-safe:pointer-events-none'}`}
        >
          {heldContent}
        </div>
      </div>
      {/* Tall until the first down release; the effect sizes it in px from then on. */}
      <div ref={spacerRef} className="h-[200dvh] motion-reduce:hidden" aria-hidden="true" />
    </section>
  );
}
