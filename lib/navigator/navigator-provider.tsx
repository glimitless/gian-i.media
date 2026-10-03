'use client';

import type { HeaderExpand, SelectedLevel2Option, SidebarExpand } from "@/types/navigator";
import { useIsBelowMobileBreakpoint, useIsBelowTabletBreakpoint } from "../media-query/mediaQuery";
import { useRootFontSizePx } from "../media-query/mediaQuery";
import { 
  useState, 
  useMemo,
  useContext,
  useEffect,
  useRef,
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
} from 'react';

type MediaQueryContextValue = {
  isBelowMobile:boolean;
  isBelowTablet:boolean;
  rootFontSizePx:number;
}
const MediaQueryContext = createContext<MediaQueryContextValue | null>(
  null,
)

type HeaderContextValue = {
  headerExpand:HeaderExpand;
  setHeaderExpand: React.Dispatch<React.SetStateAction<HeaderExpand>>;
  selectedLevel2Option:SelectedLevel2Option;
  setSelectedLevel2Option:React.Dispatch<React.SetStateAction<SelectedLevel2Option>>;
  mainRef: RefObject<HTMLDivElement | null>;
  scrollMainToTop: () => void;
}
const HeaderContext = createContext<HeaderContextValue | null>(
  null,
)

type SidebarContextValue = {
  sidebarExpand:SidebarExpand;
  setSidebarExpand:React.Dispatch<React.SetStateAction<SidebarExpand>>;
}

const SidebarContext = createContext<SidebarContextValue | null>(
  null,
)

export default function NavigatorProvider({children} : {children:ReactNode}){
  const rootFontSizePx = useRootFontSizePx();
  const [ headerExpand, setHeaderExpand ] = useState<HeaderExpand>('hidden');
  const [ selectedLevel2Option, setSelectedLevel2Option ] = useState<SelectedLevel2Option>('');
  const [ sidebarExpand, setSidebarExpand ] = useState<SidebarExpand>('hidden');
  const isBelowMobile = useIsBelowMobileBreakpoint(rootFontSizePx);
  const isBelowTablet = useIsBelowTabletBreakpoint(rootFontSizePx);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const scrollMainToTop = useCallback(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, []);

  useEffect(() => {
    if (isBelowMobile && headerExpand !== 'hidden'){
      const updateHeaderExpand = () => setHeaderExpand('hidden');
      updateHeaderExpand();
    };
  }, [isBelowMobile, headerExpand]);

  const headerValue = useMemo(
    () => ({
      headerExpand,
      setHeaderExpand,
      selectedLevel2Option,
      setSelectedLevel2Option,
      mainRef,
      scrollMainToTop,
    }),
    [
      headerExpand,
      selectedLevel2Option,
      scrollMainToTop,
    ]
  );
  const sidebarValue = useMemo(
    () => ({
      sidebarExpand,
      setSidebarExpand,
    }),
    [
      sidebarExpand,
    ]
  );
  const mediaQueryValue = useMemo(
    () => ({
    isBelowMobile,
    isBelowTablet,
    rootFontSizePx,
  }),
  [
    isBelowMobile,
    isBelowTablet,
    rootFontSizePx,
  ]
);

  return (
    <MediaQueryContext.Provider value={mediaQueryValue}>
      <HeaderContext.Provider value={headerValue}>
        <SidebarContext.Provider value={sidebarValue}>
          {children}
        </SidebarContext.Provider>
      </HeaderContext.Provider>
    </MediaQueryContext.Provider>
  )
}

export function useMediaQueryContext(): MediaQueryContextValue {
  const context = useContext(MediaQueryContext);
  if(!context) {
    throw new Error(
      'useMediaQueryContext() must be called within NavigatorProvider'
    );
  }
  return context;
}

export function useHeaderContext(): HeaderContextValue {
  const context = useContext(HeaderContext);
  if(!context) {
    throw new Error(
      'useHeaderContext() must be called within NavigatorProvider'
    );
  }
  return context;
}

export function useSidebarContext(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if(!context) {
    throw new Error(
      'useSidebarContext() must be called within NavigatorProvider'
    );
  }
  return context;
}