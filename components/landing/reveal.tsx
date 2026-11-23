'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Hidden only under motion-safe, so reduced-motion visitors always see the content.
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsShown(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-transition ${isShown ? '' : 'motion-safe:opacity-0 motion-safe:translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}
