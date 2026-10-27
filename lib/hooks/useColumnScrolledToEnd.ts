'use client';

import { useEffect, useState, type RefObject } from "react";
import { THREE_COLUMN_BREAKPOINT_EM } from "../media-query/mediaQuery";

export function contentScroller(main: HTMLElement, rootFontSizePx: number){
  const media = main.querySelector<HTMLElement>('.three-column-page-media-container');
  const isThreeColumn = main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;

  if (isThreeColumn && media) return media;

  return main.querySelector<HTMLElement>(
    '.two-column-page-content-column, .three-column-page-content-column'
  );
}

function clearFooterPad(column: HTMLElement){
  column.style.paddingBottom = column.dataset.basePaddingBottom ?? '';
  delete column.dataset.basePaddingBottom;
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

  useEffect(() => {
    if (!enabled) return;

    const main = mainRef.current;
    if (!main) return;

    let padded: HTMLElement | null = null;

    const update = () => {
      const column = contentScroller(main, rootFontSizePx);

      if (padded && padded !== column) {
        clearFooterPad(padded);
        padded = null;
      }

      if (!column || footerHeight <= 0) {
        setReveal(0);
        return;
      }

      applyFooterPad(column, footerHeight);
      padded = column;

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
      if (padded) clearFooterPad(padded);
      main.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', update);
    };
  }, [enabled, mainRef, rootFontSizePx, footerHeight, layoutKey]);

  return reveal;
}
