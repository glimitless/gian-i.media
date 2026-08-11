import { useState, useEffect } from 'react';

const TABLET_BREAKPOINT_PX = 995;
const MOBILE_BREAKPOINT_PX = 605;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function useIsBelowTabletBreakpoint() {
  return useMediaQuery(`(max-width: ${TABLET_BREAKPOINT_PX - 1}px)`);
}

export function useIsBelowMobileBreakpoint() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);
}