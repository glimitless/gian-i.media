'use client';

import { useEffect, type RefObject } from 'react';

export default function useScrollIntoViewAfterExpand(
  isExpanded: boolean,
  transitionRef: RefObject<HTMLElement | null>,
  scrollTargetRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if(!isExpanded) return;

    const grid = transitionRef.current;
    if(!grid) return;

    const scrollTarget = () => {
      (scrollTargetRef.current ?? grid).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if(event.propertyName !== 'grid-template-rows') return;
      grid.removeEventListener('transitionend', onTransitionEnd);
      scrollTarget();
    };

    grid.addEventListener('transitionend', onTransitionEnd);

    const fallbackId = window.setTimeout(scrollTarget, 450);

    return () => {
      grid.removeEventListener('transitionend', onTransitionEnd);
      window.clearTimeout(fallbackId);
    };
  }, [isExpanded, transitionRef, scrollTargetRef]);
};