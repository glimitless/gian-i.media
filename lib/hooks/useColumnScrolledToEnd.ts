'use client';

import { useEffect, useState, type RefObject } from "react";
import { THREE_COLUMN_BREAKPOINT_EM } from "../media-query/mediaQuery";

function isAtEnd(element: HTMLElement) {
  return element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
}

export default function useColumnScrolledToEnd(
  enabled: boolean,
  mainRef: RefObject<HTMLElement | null>,
  rootFontSizePx: number,
){
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if(!enabled) return;

    const main = mainRef.current;
    if (!main) return;

    const scroller = () => {
      const media = main.querySelector<HTMLElement>('.three-column-page-media-container');
      const isThreeColumn = main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;
      if (isThreeColumn && media) return media;
      return main.querySelector<HTMLElement>(
        '.two-column-page-content-column, .three-column-page-content-column'
      );
    };

    const update = () => {
      const column = scroller();
      setAtEnd(!!column && isAtEnd(column));
    };

    update();
    main.addEventListener('scroll', update, { capture: true, passive: true });
    window.addEventListener('resize', update);
    return () => {
      main.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', update);
    }

  }, [enabled, mainRef, rootFontSizePx]);

  return atEnd;
}