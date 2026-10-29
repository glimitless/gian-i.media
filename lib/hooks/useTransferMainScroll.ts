'use client';

import { useEffect } from "react";
import { contentScroller } from "./useColumnScrolledToEnd";

// Room on either side of the parked scroll offset. A gesture has to stay
// inside this range so the browser can finish its wheel animation.
const SLACK = 80_000;
const PARK = SLACK / 2;
const RECENTER_FALLBACK_MS = 200;

function isColumnPage(main: HTMLElement) {
  return !!main.querySelector(
    '.two-column-page-container, .three-column-page-container'
  );
}

function pagePin(main: HTMLElement) {
  const first = main.firstElementChild;
  if (!(first instanceof HTMLElement)) return null;
  if (first.hasAttribute('data-main-scroll-slack')) return null;
  return first;
}

export default function useTransferMainScroll() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('.main-scroll');
    if (!main) return;

    // The gutter and nav are not the content column, so a wheel there scrolls
    // main. Main keeps a tall slack range and the page stays pinned, which lets
    // the browser run its own wheel animation. Each frame's delta is copied
    // onto the column. The footer is not touched; it sticks to the viewport.
    let syncing = false;
    let parked = false;
    let anchor = 0;
    let carry = 0;
    let column: HTMLElement | null = null;
    let columnWidth = -1;
    let pin: HTMLElement | null = null;
    let slack: HTMLElement | null = null;
    let recenterTimer = 0;
    let refreshFrame = 0;

    const fitPin = () => {
      if (!pin?.isConnected) pin = pagePin(main);
      if (!pin || main.clientHeight === 0) return;
      const height = `${main.clientHeight}px`;
      if (pin.style.height !== height) pin.style.height = height;
    };

    const resolveColumn = () => {
      if (column?.isConnected && main.clientWidth === columnWidth) return;
      columnWidth = main.clientWidth;
      column = isColumnPage(main) ? contentScroller(main) : null;
    };

    const recenter = () => {
      if (!parked) return;
      window.clearTimeout(recenterTimer);
      recenterTimer = 0;
      if (Math.abs(main.scrollTop - PARK) < 0.5) {
        anchor = main.scrollTop;
        carry = 0;
        return;
      }
      syncing = true;
      main.scrollTop = PARK;
      anchor = PARK;
      carry = 0;
      syncing = false;
    };

    const enable = () => {
      if (main.clientHeight === 0) return;
      pin = pagePin(main);
      if (!pin) return;

      if (!slack?.isConnected) {
        main.querySelector('[data-main-scroll-slack]')?.remove();
        slack = document.createElement('div');
        slack.setAttribute('data-main-scroll-slack', '');
        slack.setAttribute('aria-hidden', 'true');
        slack.style.cssText = `height:${SLACK}px;flex:none;pointer-events:none;`;
        main.appendChild(slack);
      }

      const wasParked = parked;
      pin.style.position = 'sticky';
      pin.style.top = '0px';
      pin.style.flex = '0 0 auto';
      pin.style.minHeight = '0px';
      pin.style.width = '100%';
      main.style.overflowAnchor = 'none';
      main.style.overscrollBehavior = 'none';
      parked = true;
      fitPin();

      // A later enable() must not pull scrollTop back to PARK mid-gesture.
      if (!wasParked) {
        syncing = true;
        main.scrollTop = PARK;
        anchor = main.scrollTop;
        carry = 0;
        syncing = false;
      }
      resolveColumn();
    };

    const clearPin = () => {
      if (!pin) return;
      pin.style.removeProperty('position');
      pin.style.removeProperty('top');
      pin.style.removeProperty('flex');
      pin.style.removeProperty('min-height');
      pin.style.removeProperty('width');
      pin.style.removeProperty('height');
    };

    const disable = () => {
      if (!parked && !slack && !main.querySelector('[data-main-scroll-slack]')) return;
      window.clearTimeout(recenterTimer);
      recenterTimer = 0;
      parked = false;
      syncing = true;
      clearPin();
      slack?.remove();
      main.querySelector('[data-main-scroll-slack]')?.remove();
      main.style.removeProperty('overflow-anchor');
      main.style.removeProperty('overscroll-behavior');
      if (main.scrollTop !== 0) main.scrollTop = 0;
      syncing = false;
      slack = null;
      pin = null;
      column = null;
      columnWidth = -1;
      anchor = 0;
      carry = 0;
    };

    const syncMode = () => {
      if (isColumnPage(main)) enable();
      else disable();
    };

    const scheduleRecenter = () => {
      window.clearTimeout(recenterTimer);
      recenterTimer = window.setTimeout(recenter, RECENTER_FALLBACK_MS);
    };

    const onScroll = () => {
      if (syncing || !parked) return;
      if (!column?.isConnected) resolveColumn();

      const top = main.scrollTop;
      const delta = top - anchor;
      anchor = top;
      if (delta === 0) return;

      // Navigation and other programmatic jumps are not one gesture frame.
      if (Math.abs(delta) > 4000) {
        carry = 0;
        recenter();
        return;
      }

      if (column) {
        carry += delta;
        const before = column.scrollTop;
        column.scrollTop = before + carry;
        const leftover = carry - (column.scrollTop - before);
        // A fraction the column did not accept. A full unused delta means the
        // column is at an edge; keeping it would release as a jump later.
        carry = Math.abs(leftover) >= 1 ? 0 : leftover;
      }
      scheduleRecenter();
    };

    const onScrollEnd = () => {
      if (!parked || syncing) return;
      recenter();
    };

    const scheduleSync = () => {
      if (refreshFrame) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        syncMode();
      });
    };

    // Clear a translate left on the footer by an earlier version of this hook.
    for (const node of main.children) {
      if (node instanceof HTMLElement) node.style.removeProperty('translate');
    }

    syncMode();

    const observer = new MutationObserver(scheduleSync);
    observer.observe(main, { childList: true, subtree: true });
    const resizeObserver = new ResizeObserver(() => {
      if (!parked) {
        if (isColumnPage(main)) enable();
        return;
      }
      fitPin();
      if (main.clientWidth !== columnWidth) resolveColumn();
    });
    resizeObserver.observe(main);

    main.addEventListener('scroll', onScroll, { passive: true });
    main.addEventListener('scrollend', onScrollEnd);
    return () => {
      cancelAnimationFrame(refreshFrame);
      window.clearTimeout(recenterTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      main.removeEventListener('scroll', onScroll);
      main.removeEventListener('scrollend', onScrollEnd);
      disable();
    };
  }, []);
}
