'use client';

import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { HeaderExpand } from "@/types/navigator";
import { THREE_COLUMN_BREAKPOINT_EM } from "../media-query/mediaQuery";

const HEADER_HEIGHT_TRANSITION_MS = 440;
const INTENTIONAL_SCROLL_EM = 2;
const CONTENT_COLUMN_CLASSES = [
  'three-column-page-content-column',
  'two-column-page-content-column',
];
const MEDIA_COLUMN_CLASS = 'three-column-page-media-container';
const FILTER_GRID_CLASS = 'filter-grid';

export default function useHeaderExpandOnColumnScroll(
  setHeaderExpand: Dispatch<SetStateAction<HeaderExpand>>,
  mainRef: RefObject<HTMLElement | null>,
  rootFontSizePx: number,
){
  useEffect(() => {
    const lastScrollTop = new WeakMap<HTMLElement, number>();
    let ignoreDirectionUntil = 0;
    let pendingDelta = 0;
    
    const onScroll = (event: Event) => {
      const target = event.target;
      if(!(target instanceof HTMLElement)) return;

      const isContentColumn = CONTENT_COLUMN_CLASSES.some((className) =>
        target.classList.contains(className)
      );
      const isMediaColumn = target.classList.contains(MEDIA_COLUMN_CLASS);
      // The home page scrolls main. The filter grid sits inside that scroller.
      const isFilterGrid =
        target.classList.contains(FILTER_GRID_CLASS) ||
        (target === mainRef.current && !!target.querySelector(`.${FILTER_GRID_CLASS}`));
      const isPageScroll = isContentColumn || isFilterGrid;
      if (!isPageScroll && !isMediaColumn) return;

      const top = target.scrollTop;
      const previous = lastScrollTop.get(target);
      lastScrollTop.set(target, top);
      if (previous === undefined) return;
      if (top <= 0) {
        pendingDelta = 0;
        const main = mainRef.current;
        const isThreeColumn =
          !!main && main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;
        const shouldReveal = isPageScroll || (isMediaColumn && isThreeColumn);
        if (!shouldReveal) return;

        setHeaderExpand((current) => {
          if (current !== 'hidden') return current;
          ignoreDirectionUntil = performance.now() + HEADER_HEIGHT_TRANSITION_MS;
          return 'level-1';
        });
        return;
      }
      const delta = top - previous;
      if (delta === 0) return;
      // Header height animates for 0.44s. The media column grows and shrinks
      // with it, and the browser adjusts scrollTop. Ignore that adjustment.
      if (performance.now() < ignoreDirectionUntil) return;
      // A direction change starts over. The short reverse at the end of a
      // touch scroll stays under the threshold.
      if ((pendingDelta > 0 && delta < 0) || (pendingDelta < 0 && delta > 0)) {
        pendingDelta = 0;
      }
      pendingDelta += delta;
      if (Math.abs(pendingDelta) < INTENTIONAL_SCROLL_EM * rootFontSizePx) return;
      const main = mainRef.current;
      const isThreeColumn =
        !!main && main.clientWidth >= THREE_COLUMN_BREAKPOINT_EM * rootFontSizePx;
      // Scroll down hides the header only from level 1.
      // At the three-column breakpoint the media column is the scroller.
      const shouldHide =
        pendingDelta > 0 && (isPageScroll || (isMediaColumn && isThreeColumn));
      if (shouldHide) {
        setHeaderExpand((current) => {
          if (current !== 'level-1') return current;
          ignoreDirectionUntil = performance.now() + HEADER_HEIGHT_TRANSITION_MS;
          pendingDelta = 0;
          return 'hidden';
        });
        return;
      }
      // Scroll up restores level 1 only while the header is hidden.
      if (pendingDelta > 0) return;
      const shouldReveal =
        isPageScroll || (isMediaColumn && isThreeColumn);
      if (!shouldReveal) return;

      setHeaderExpand((current) => {
        if (current !== 'hidden') return current;
        ignoreDirectionUntil = performance.now() + HEADER_HEIGHT_TRANSITION_MS;
        pendingDelta = 0;
        return 'level-1';
      });
    };

    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [setHeaderExpand, mainRef, rootFontSizePx]);
}