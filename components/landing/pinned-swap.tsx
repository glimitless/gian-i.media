'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

// content pins at its bottom edge, then fades out while heldContent fades in over it in the same cell.
// Pinned for two viewports: the first swaps the two, the second holds heldContent before the page scrolls on.
export default function PinnedSwap({ content, heldContent }: { content: ReactNode; heldContent: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIsPinning(true);
    const onScroll = () => {
      // The pin's top edge, then one viewport further up the section: the end of the first 100dvh of spacer.
      const pinTop = Math.min(0, window.innerHeight - contentHeight);
      setIsSwapped(section.getBoundingClientRect().top <= pinTop - window.innerHeight);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [contentHeight]);

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
          inert={isPinning && !isSwapped}
          className={`motion-safe:row-1 motion-safe:col-1 motion-safe:self-end ${isSwapped ? 'reveal-transition-after' : 'reveal-transition motion-safe:opacity-0 motion-safe:translate-y-8 motion-safe:pointer-events-none'}`}
        >
          {heldContent}
        </div>
      </div>
      <div className="h-[200dvh] motion-reduce:hidden" aria-hidden="true" />
    </section>
  );
}
