'use client';

import { useEffect, type RefObject } from 'react';

const BOTTOM_PAD_REM = 1.25;

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

function bottomScrollMargin(target: HTMLElement){
  const pad = BOTTOM_PAD_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const scroller = scrollableAncestor(target);
  const footerSpace = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--footer-reveal-space'),
  );

  if(!scroller || !Number.isFinite(footerSpace) || footerSpace <= 0) return `${pad}px`;

  const scrollerRect = scroller.getBoundingClientRect();
  const footer = document.querySelector<HTMLElement>('.footer-column-reveal');
  const footerCover = footer ? scrollerRect.bottom - footer.getBoundingClientRect().top : 0;
  const maxScroll = scroller.scrollHeight - scroller.clientHeight;
  const contentEnd = Math.max(0, maxScroll - footerSpace);
  const nextScroll = scroller.scrollTop + Math.max(0, target.getBoundingClientRect().bottom + pad - scrollerRect.bottom);
  const reserveFooter = footerCover > 1 || nextScroll > contentEnd;

  return `${reserveFooter ? pad + footerSpace : pad}px`;
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
      const previousMargin = target.style.scrollMarginBottom;
      target.style.scrollMarginBottom = bottomScrollMargin(target);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
      target.style.scrollMarginBottom = previousMargin;
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