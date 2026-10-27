'use client';

import { useEffect, useLayoutEffect, useState, type RefObject } from "react";
import { THREE_COLUMN_BREAKPOINT_EM } from "../media-query/mediaQuery";

export function contentScroller(main: HTMLElement, rootFontSizePx: number){
  const media = main.querySelector<HTMLElement>('.three-column-page-media-container');
  const isThreeColumn = main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;

  if (isThreeColumn && media) return media;

  return main.querySelector<HTMLElement>(
    '.two-column-page-content-column, .three-column-page-content-column'
  );
}

function applyFooterPad(column: HTMLElement, footerHeight: number){
  if (column.dataset.basePaddingBottom === undefined) {
    column.dataset.basePaddingBottom = getComputedStyle(column).paddingBottom;
  }

  column.style.paddingBottom = `calc(${column.dataset.basePaddingBottom} + ${footerHeight}px)`;
}

export default function useColumnFooterReveal(
  enabled: boolean,
  mainRef: RefObject<HTMLElement | null>,
  rootFontSizePx: number,
  footerHeight: number,
  layoutKey: string,
){
  const [reveal, setReveal] = useState(0);

  useLayoutEffect(() => {
    if (!enabled || footerHeight <= 0) return;

    const main = mainRef.current;
    if (!main) return;

    const apply = () => {
      const column = contentScroller(main, rootFontSizePx);
      if (!column) return;
      applyFooterPad(column, footerHeight);
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(main, { childList: true, subtree: true });
    window.addEventListener('resize', apply);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, [enabled, mainRef, rootFontSizePx, footerHeight, layoutKey]);

  useEffect(() => {
    if (!enabled) return;

    const main = mainRef.current;
    if (!main) return;

    const update = () => {
      const column = contentScroller(main, rootFontSizePx);

      if (!column || footerHeight <= 0) {
        setReveal(0);
        return;
      }

      const maxScroll = column.scrollHeight - column.clientHeight;
      const contentEnd = maxScroll - footerHeight;
      const overscroll = column.scrollTop - contentEnd;
      const next = overscroll >= footerHeight - 1
        ? footerHeight
        : Math.max(0, overscroll);

      setReveal(next);
    };

    update();
    main.addEventListener('scroll', update, { capture: true, passive: true });
    window.addEventListener('resize', update);

    return () => {
      main.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', update);
    };
  }, [enabled, mainRef, rootFontSizePx, footerHeight, layoutKey]);

  return reveal;
}