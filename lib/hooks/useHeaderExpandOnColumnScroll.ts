'use client';

import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { HeaderExpand } from "@/types/navigator";

const THREE_COLUMN_BREAKPOINT_EM = 144;
const HEADER_HEIGHT_TRANSITION_MS = 440;
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
    let ignoreDirectionUntil = 0;
    
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
      if (previous === undefined) return;
      const delta = top - previous;
      if (delta === 0) return;
      // Header height animates for 0.44s. The media column grows and shrinks
      // with it, and the browser adjusts scrollTop. Ignore that adjustment.
      if (performance.now() < ignoreDirectionUntil) return;
      const main = mainRef.current;
      const isThreeColumn =
        !!main && main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;
      // Scroll down hides the header only from level 1.
      // At the three-column breakpoint the media column is the scroller.
      const shouldHide =
        delta > 0 && (isContentColumn || (isMediaColumn && isThreeColumn));
      if (shouldHide) {
        setHeaderExpand((current) => {
          if (current !== 'level-1') return current;
          ignoreDirectionUntil = performance.now() + HEADER_HEIGHT_TRANSITION_MS;
          return 'hidden';
        });
        return;
      }
      // Scroll up restores level 1 only while the header is hidden.
      // On mobile, NavigatorProvider forces hidden, so leave it alone.
      if (delta > 0 || isBelowMobile) return;
      const shouldReveal =
        isContentColumn || (isMediaColumn && isThreeColumn);
      if (!shouldReveal) return;

      setHeaderExpand((current) => {
        if (current !== 'hidden') return current;
        ignoreDirectionUntil = performance.now() + HEADER_HEIGHT_TRANSITION_MS;
        return 'level-1';
      });
    };

    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [setHeaderExpand, mainRef, rootFontSizePx, isBelowMobile]);
}