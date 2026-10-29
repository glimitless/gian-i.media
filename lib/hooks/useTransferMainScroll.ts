'use client';

import { useEffect } from "react";
import { contentScroller } from "./useColumnScrolledToEnd";

function isScrollContainer(element: HTMLElement) {
  const { overflowY } = getComputedStyle(element);
  return overflowY === 'scroll' || overflowY === 'auto';
}

function isColumnPage(main: HTMLElement) {
  return !!main.querySelector(
    '.two-column-page-container, .three-column-page-container'
  );
}

function nearestScrollPort(target: EventTarget | null, main: HTMLElement){
  let node = target instanceof Element ? target : null;
  while (node && node !== main) {
    if (node instanceof HTMLElement && isScrollContainer(node)) return node;
    node = node.parentElement;
  }
  return main;
}

function deltaYPx(event: WheelEvent, main: HTMLElement){
  if(event.deltaMode === WheelEvent.DOM_DELTA_PIXEL) return event.deltaY;
  const line = parseFloat(getComputedStyle(main).fontSize) || 16;
  if(event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * line;
  // last case, if event.deltaMode === WheelEvent.DOM_DELTA_PAGE
  return event.deltaY * main.clientHeight;
}

export default function useTransferMainScroll() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('.main-scroll');
    if (!main) return;

    let syncing = false;

    const destination = () => (isColumnPage(main) ? contentScroller(main) : null);

    const onWheel = (event: WheelEvent) => {
      if(event.ctrlKey) return;
      const column = destination();
      if(!column) return;
      if(nearestScrollPort(event.target, main) !== main) return;

      event.preventDefault();
      column.scrollTop += deltaYPx(event, main);
    }

    const onScroll = () => {
      if (syncing) return;
      const column = destination();
      if(!column) return;

      const delta = main.scrollTop;
      if(delta === 0) return;

      syncing = true;
      column.scrollTop += delta;
      main.scrollTop = 0;
      syncing = false;
    }

     main.addEventListener('wheel', onWheel, { passive: false });
     main.addEventListener('scroll', onScroll, { passive: true });
     return () => {
      main.removeEventListener('wheel', onWheel);
      main.removeEventListener('scroll', onScroll);
     }
  }, [])
}