'use client';

import type { HeaderExpand, SelectedLevel2Option, SidebarExpand, MobileHeaderExpand } from "@/types/navigator";
import { useIsBelowPhoneBreakpoint, useIsBelowMobileBreakpoint, useIsBelowTabletBreakpoint } from "../media-query/mediaQuery";
import { useRootFontSizePx } from "../media-query/mediaQuery";
import useHeaderExpandOnColumnScroll from "../hooks/useHeaderExpandOnColumnScroll";
import { usePathname } from "next/navigation";
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
  isBelowPhone:boolean;
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

type MobileHeaderContextValue = {
  mobileHeaderExpand:MobileHeaderExpand;
  setMobileHeaderExpand:React.Dispatch<React.SetStateAction<MobileHeaderExpand>>;
  mobileSelectedLevel2Option:SelectedLevel2Option;
  setMobileSelectedLevel2Option:React.Dispatch<React.SetStateAction<SelectedLevel2Option>>;
}
const MobileHeaderContext = createContext<MobileHeaderContextValue | null>(
  null,
)

type SidebarContextValue = {
  sidebarExpand:SidebarExpand;
  setSidebarExpand:React.Dispatch<React.SetStateAction<SidebarExpand>>;
}

const SidebarContext = createContext<SidebarContextValue | null>(
  null,
)

export const HEADER_MARGIN: Record<HeaderExpand, string> = {
  'hidden': 'mt-26',
  'level-1': 'mt-26',
  'level-2': 'mt-46',
  'level-3': 'mt-66'
};

export default function NavigatorProvider({children} : {children:ReactNode}){
  const rootFontSizePx = useRootFontSizePx();
  const [ headerExpand, setHeaderExpand ] = useState<HeaderExpand>('level-1');
  const [ mobileHeaderExpand, setMobileHeaderExpand ] = useState<MobileHeaderExpand>('hidden');
  const [ selectedLevel2Option, setSelectedLevel2Option ] = useState<SelectedLevel2Option>('');
  const [ mobileSelectedLevel2Option, setMobileSelectedLevel2Option ] = useState<SelectedLevel2Option>('')
  const [ sidebarExpand, setSidebarExpand ] = useState<SidebarExpand>('hidden');
  const isBelowPhone = useIsBelowPhoneBreakpoint(rootFontSizePx);
  const isBelowMobile = useIsBelowMobileBreakpoint(rootFontSizePx);
  const isBelowTablet = useIsBelowTabletBreakpoint(rootFontSizePx);
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement | null>(null);
  const scrollMainToTop = useCallback(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) 
  }, []);

  useEffect(() => {
    const updateHeaders = () => {
        setHeaderExpand((current) =>
        current === 'hidden' || current === 'level-1' ? current : 'level-1',
      );
      setMobileHeaderExpand((current) =>
        current === 'hidden' ? current : 'hidden',
      );
    }
    updateHeaders()
  }, [isBelowMobile]);
  useEffect(() => {
    const showLevel1 = () => {
      setHeaderExpand((current) => current === 'hidden' ? 'level-1' : current);
    };
    showLevel1();
  }, [pathname]);
  useHeaderExpandOnColumnScroll(
    setHeaderExpand,
    mainRef,
    rootFontSizePx,
  )

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
  const mobileHeaderValue = useMemo(
    () => ({
      mobileHeaderExpand,
      setMobileHeaderExpand,
      mobileSelectedLevel2Option,
      setMobileSelectedLevel2Option
    }),
    [
      mobileHeaderExpand,
      setMobileHeaderExpand,
      mobileSelectedLevel2Option,
      setMobileSelectedLevel2Option
    ]
  )
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
    isBelowPhone,
    isBelowMobile,
    isBelowTablet,
    rootFontSizePx,
  }),
  [
    isBelowPhone,
    isBelowMobile,
    isBelowTablet,
    rootFontSizePx,
  ]
);

  return (
    <MediaQueryContext.Provider value={mediaQueryValue}>
      <HeaderContext.Provider value={headerValue}>
        <MobileHeaderContext.Provider value={mobileHeaderValue}>
          <SidebarContext.Provider value={sidebarValue}>
            {children}
          </SidebarContext.Provider>
        </MobileHeaderContext.Provider>
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

export function useMobileHeaderContext(): MobileHeaderContextValue {
  const context = useContext(MobileHeaderContext);
  if(!context) {
    throw new Error(
      'useMobileHeaderContext() must be called within NavigatorProvider'
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