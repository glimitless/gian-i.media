import { useEffect, useRef } from 'react';

export function useHorizontalWheelScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if(!element)
      return;

    const onWheel = (event) => {
      // Skips if there's nothing to scroll horizontally
      if(element.scrollWidth <= element.clientWidth) return;
      
      // Picks the scroll direction
      // Prefer vertical wheel delta; fall back to horizontal trackpad delta
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) 
        ? event.deltaY : event.deltaX;
      
      // Does nothing if there's no movement in event
      if(delta === 0) return;
  
      // Stops the page from scrolling vertically
      event.preventDefault();

      // Scrolls the container horizontally
      element.scrollLeft += delta;
    }

    element.addEventListener('wheel', onWheel, { passive: false});
    return () => element.removeEventListener('wheel', onWheel);
  }, []);

  return ref;
}