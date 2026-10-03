import { useState, useEffect } from 'react';

const FALLBACK_ROOT_PX = 10;


export function useRootFontSizePx():number{
  const [ rootFontSizePx, setRootFontSizePx ] = useState<number>(FALLBACK_ROOT_PX);

  useEffect(() => {
    const readRoot = () => {
      const rootPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      setRootFontSizePx(Number.isFinite(rootPx) ? rootPx : FALLBACK_ROOT_PX);
    };
    readRoot();
    
    window.addEventListener('resize', readRoot);
    return () => window.removeEventListener('resize', readRoot);
  }, []);

  return rootFontSizePx;
}


const TABLET_BREAKPOINT_EM = 99;
const MOBILE_BREAKPOINT_EM = 63.5;

function useMediaQuery(query:string):boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia(query);

    const sync = async () => {setMatches(mq.matches)};
    sync();

    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);

  return matches;
}

export function useIsBelowTabletBreakpoint(rootFontSizePx: number) {
  return useMediaQuery(`(max-width: ${(TABLET_BREAKPOINT_EM * rootFontSizePx) - 1}px)`);
}

export function useIsBelowMobileBreakpoint(rootFontSizePx: number) {
  return useMediaQuery(`(max-width: ${(MOBILE_BREAKPOINT_EM * rootFontSizePx) - 1}px)`);
}