'use client';

import { useLayoutEffect, type RefObject } from "react";
import { THREE_COLUMN_BREAKPOINT_EM } from "../media-query/mediaQuery";

export function contentScroller(main: HTMLElement, rootFontSizePx: number){
  const media = main.querySelector<HTMLElement>('.three-column-page-media-container');
  const isThreeColumn = main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;

  if (isThreeColumn && media) return media;

  return main.querySelector<HTMLElement>(
    '.two-column-page-content-column, .three-column-page-content-column'
  );
}

function concealFooter(footer: HTMLElement, concealed: boolean){
  if (footer.inert !== concealed) footer.inert = concealed;

  if (concealed) footer.setAttribute('aria-hidden', 'true');
  else footer.removeAttribute('aria-hidden');
}

function supportsScrollDrivenAnimation(){
  return typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()");
}

function revealProgress(column: HTMLElement, footerHeight: number){
  const maxScroll = column.scrollHeight - column.clientHeight;
  const contentEnd = maxScroll - footerHeight;
  const revealed = Math.min(footerHeight, Math.max(0, column.scrollTop - contentEnd));
  return { maxScroll, contentEnd, revealed };
}

export default function useColumnFooterReveal(
  enabled: boolean,
  mainRef: RefObject<HTMLElement | null>,
  rootFontSizePx: number,
  footerHeight: number,
  layoutKey: string,
  footerRef: RefObject<HTMLElement | null>,
){
  useLayoutEffect(() => {
    if (!enabled || footerHeight <= 0) return;

    const main = mainRef.current;
    const footerNode = footerRef.current;
    if (!main) return;

    let observed: HTMLElement | null = null;
    const resizeObserver = new ResizeObserver(() => apply());

    const apply = () => {
      const footer = footerRef.current;
      const column = contentScroller(main, rootFontSizePx);
      if (!column || !footer) return;

      if (observed !== column) {
        if (observed) resizeObserver.unobserve(observed);
        resizeObserver.observe(column);
        observed = column;
      }

      document.documentElement.style.setProperty('--footer-reveal-space', `${footerHeight}px`);

      const { maxScroll, contentEnd, revealed } = revealProgress(column, footerHeight);
      if (supportsScrollDrivenAnimation()) {
        const useMedia = column.classList.contains('three-column-page-media-container');
        footer.style.removeProperty('transform');
        footer.style.setProperty('animation-timeline', useMedia ? '--media-footer' : '--content-footer');
        footer.style.setProperty('animation-range', `${contentEnd}px ${maxScroll}px`);
      } else {
        footer.style.animationName = 'none';
        footer.style.removeProperty('animation-timeline');
        footer.style.removeProperty('animation-range');
        footer.style.transform = `translateY(${footerHeight - revealed}px)`;
      }
      concealFooter(footer, column.scrollTop <= contentEnd);
    };

    const onScroll = () => {
      const footer = footerRef.current;
      const column = contentScroller(main, rootFontSizePx);
      if (!column || !footer) return;

      const { contentEnd, revealed } = revealProgress(column, footerHeight);
      if (!supportsScrollDrivenAnimation()) {
        footer.style.transform = `translateY(${footerHeight - revealed}px)`;
      }
      concealFooter(footer, column.scrollTop <= contentEnd);
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(main, { childList: true, subtree: true });
    window.addEventListener('resize', apply);
    main.addEventListener('scroll', onScroll, { capture: true, passive: true });

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty('--footer-reveal-space');
      footerNode?.style.removeProperty('transform');
      window.removeEventListener('resize', apply);
      main.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [enabled, mainRef, rootFontSizePx, footerHeight, layoutKey, footerRef]);
}