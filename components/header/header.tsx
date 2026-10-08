"use client";

import type { HeaderExpand } from '@/types/navigator';
import MoreSearchOptions from './containers/more-search-options';
import SelectedFilterArgument from './containers/selected-filter-argument';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';
import HeaderFirstRow from './containers/header-first-row';

const HEADER_HEIGHT: Record<HeaderExpand, string> = {
  'hidden': 'h-26',
  'level-1': 'h-46',
  'level-2': 'h-66',
}

export default function Header(){
  const { headerExpand } = useHeaderContext();
  const headerHeight = HEADER_HEIGHT[headerExpand];

  return (
    <header
      className={`${headerHeight} w-full max-w-full min-w-0 pr-3 pl-3 pt-3 pb-3 bg-lmBg dark:bg-dmBg header-transition`}
    >
      <div
        className="w-full h-full min-w-0 flex flex-col items-stretch p-0 gap-0 overflow-hidden"
      >
        <div
          className="header-row"
        > 
          <HeaderFirstRow />
        </div>
        <div
          className="header-row"
        >
          <MoreSearchOptions />
        </div>
        <div
          className="header-row"
        >
          <SelectedFilterArgument />
        </div>
       </div>
    </header>
  )
}