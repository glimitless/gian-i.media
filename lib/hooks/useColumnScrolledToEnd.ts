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

      const useMedia = column.classList.contains('three-column-page-media-container');
      footer.style.animationTimeline = useMedia ? '--media-footer' : '--content-footer';

      const maxScroll = column.scrollHeight - column.clientHeight;
      const contentEnd = maxScroll - footerHeight;
      footer.style.animationRange = `${contentEnd}px ${maxScroll}px`;
      concealFooter(footer, column.scrollTop <= contentEnd);
    };

    const onScroll = () => {
      const footer = footerRef.current;
      const column = contentScroller(main, rootFontSizePx);
      if (!column || !footer) return;

      const contentEnd = column.scrollHeight - column.clientHeight - footerHeight;
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
      window.removeEventListener('resize', apply);
      main.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [enabled, mainRef, rootFontSizePx, footerHeight, layoutKey, footerRef]);
}