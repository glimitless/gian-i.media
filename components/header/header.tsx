"use client";

import type { HeaderExpand } from '@/types/navigator';
import MoreSearchOptions from './containers/more-search-options';
import SelectedFilterArgument from './containers/selected-filter-argument';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';
import HeaderFirstRow from './containers/header-first-row';

const HEADER_HEIGHT: Record<HeaderExpand, string> = {
  'hidden': 'h-0 py-0',
  'level-1': 'h-26 py-3',
  'level-2': 'h-46 py-3',
  'level-3': 'h-66 py-3'
}

export default function Header(){
  const { headerExpand } = useHeaderContext();
  const headerHeight = HEADER_HEIGHT[headerExpand];

  return (
    <header
      className={`${headerHeight} w-full max-w-full min-h-0 min-w-0 overflow-hidden px-3 bg-lmBg dark:bg-dmBg header-transition`}
    >
      <div
        className="w-full h-full min-w-0 flex flex-col items-stretch gap-0 overflow-hidden p-0"
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