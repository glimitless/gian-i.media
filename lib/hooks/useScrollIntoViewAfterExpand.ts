'use client';

import { useEffect, type RefObject } from 'react';

function footerRevealSpace(){
  const value = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--footer-reveal-space'),
  );
  return Number.isFinite(value) ? value : 0;
}

function scrollableAncestor(element: HTMLElement){
  let parent = element.parentElement;

  while(parent){
    const { overflowY } = getComputedStyle(parent);
    if(
      (overflowY === 'auto' || overflowY === 'scroll')
      && parent.scrollHeight > parent.clientHeight
    ){
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

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
      const target = scrollTargetRef.current ?? grid;
      const scroller = scrollableAncestor(target);
      const footerSpace = footerRevealSpace();

      if(!scroller || footerSpace <= 0){
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
        return;
      }

      const scrollerRect = scroller.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const contentEnd = Math.max(0, maxScroll - footerSpace);
      const revealed = Math.min(footerSpace, Math.max(0, scroller.scrollTop - contentEnd));
      const visibleBottom = scrollerRect.bottom - revealed;

      let belowDelta = Math.max(0, targetRect.bottom - visibleBottom);
      if(belowDelta > 0 && scroller.scrollTop + belowDelta > contentEnd){
        belowDelta += footerSpace - revealed;
      }

      const aboveDelta = Math.max(0, scrollerRect.top - targetRect.top);
      let delta = 0;
      if(belowDelta > 0 && aboveDelta > 0) delta = belowDelta < aboveDelta ? belowDelta : -aboveDelta;
      else if(belowDelta > 0) delta = belowDelta;
      else if(aboveDelta > 0) delta = -aboveDelta;

      if(delta !== 0){
        scroller.scrollBy({ top: delta, behavior: 'smooth' });
      }
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
