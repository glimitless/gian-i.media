"use client";

import type { HeaderExpand } from '@/types/navigator';
import ColorModeSwitch from './buttons/color-mode-switch';
import MobileHomeLinkContainer from './containers/mobile-home-link-container';
import TitleSearchContainer from './containers/title-search-container';
import MoreSearchOptions from './containers/more-search-options';
import SelectedFilterArgument from './containers/selected-filter-argument';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';
import { useMediaQueryContext } from '@/lib/navigator/navigator-provider';

const HEADER_HEIGHT: Record<HeaderExpand, string> = {
  'hidden': 'h-26',
  'level-1': 'h-46',
  'level-2': 'h-66',
}

export default function Header(){
  const { headerExpand } = useHeaderContext();
  const { isBelowMobile, isBelowTablet } = useMediaQueryContext();
  const headerHeight = HEADER_HEIGHT[headerExpand];

  return (
    <header
      className={`${headerHeight} w-full max-w-full min-w-0 pr-3 pl-3 pt-3 pb-3 bg-lmBg dark:bg-dmBg header-transition`}
    >
      <div
        className="w-full h-full min-w-0 flex flex-col items-stretch p-0 gap-0 overflow-hidden"
      >
        <div
          className="header-row p-2 justify-between"
        > 
          <div className="flex flex-row justify-start gap-4 h-full">
            <div className="flex @min-[99em]/viewport:hidden">
              {isBelowTablet && <MobileHomeLinkContainer isBelowMobile={isBelowMobile} />}
            </div>
            <div className="hidden @min-[59.5em]/viewport:flex">
              {!isBelowMobile && <TitleSearchContainer />}
            </div>
          </div>
          <ColorModeSwitch />
        </div>
        <div
          className="header-row p-0 justify-start"
        >
          <MoreSearchOptions />
        </div>
        <div
          className="header-row p-0 justify-start"
        >
          <SelectedFilterArgument />
        </div>
       </div>
    </header>
  )
}