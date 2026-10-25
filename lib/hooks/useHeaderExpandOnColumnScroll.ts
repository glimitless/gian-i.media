'use client';

import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { HeaderExpand } from "@/types/navigator";

const THREE_COLUMN_BREAKPOINT_EM = 144;
const CONTENT_COLUMN_CLASSES = [
  'three-column-page-content-column',
  'two-column-page-content-column',
];
const MEDIA_COLUMN_CLASS = 'three-column-page-media-container';

export default function useHeaderExpandOnColumnScroll(
  setHeaderExpand: Dispatch<SetStateAction<HeaderExpand>>,
  mainRef: RefObject<HTMLElement | null>,
  rootFontSizePx: number,
  isBelowMobile: boolean,
){
  useEffect(() => {
    const lastScrollTop = new WeakMap<HTMLElement, number>();
    
    const onScroll = (event: Event) => {
      const target = event.target;
      if(!(target instanceof HTMLElement)) return;

      const isContentColumn = CONTENT_COLUMN_CLASSES.some((className) =>
        target.classList.contains(className)
      );
      const isMediaColumn = target.classList.contains(MEDIA_COLUMN_CLASS);
      if (!isContentColumn && !isMediaColumn) return;

      const top = target.scrollTop;
      const previous = lastScrollTop.get(target);
      lastScrollTop.set(target, top);
      if(!previous) return;

      const delta = top - previous;
      if(delta === 0) return;

      // Scroll down on either content column hides the header only if it's on level 1
      if(isContentColumn && delta > 0) {
        setHeaderExpand((current) => 
          current === 'level-1' ? 'hidden' : current
        );
        return;
      }

      // Scroll up restores level 1 only while header is hidden
      // On mobile, NavigatorProvider forces hidden, so it is left alone
      if (delta > 0 || isBelowMobile) return;

      const main = mainRef.current;
      const isThreeColumn =
        !!main && main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;
      
      const shouldReveal =
        isContentColumn || (isMediaColumn && isThreeColumn);
      if (!shouldReveal) return;

      setHeaderExpand((current) => 
        current === 'hidden' ? 'level-1' : current 
      );
    };

    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [setHeaderExpand, mainRef, rootFontSizePx, isBelowMobile]);
}