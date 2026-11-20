'use client';

import { useSidebarContext } from '@/lib/navigator/navigator-provider';
import { useFilterContext } from '@/lib/filter/filter-provider';
import type { MouseEvent } from 'react';
import WorksIcon from '@/public/svg/icons/sidebar/gc_works-icon.svg';
import NotesIcon from '@/public/svg/icons/sidebar/gc_notebook-icon.svg'
import AboutIcon from '@/public/svg/icons/sidebar/gc_about-icon.svg'
import SidebarButton from './buttons/sidebar-button';
import NameWordmark from '@/public/svg/icons/sidebar/gc_wordmark.svg';
import RightArrowhead from '@/public/svg/icons/pdf/right-arrowhead.svg';
import { useMediaQueryContext } from '@/lib/navigator/navigator-provider';
import HomeLink from '../header/buttons/home-link';
import { usePathname } from 'next/navigation';


export default function Sidebar(){
  const { sidebarExpand, setSidebarExpand } = useSidebarContext();
  const { filterArguments, onToggleContentType } = useFilterContext();
  const { contentType } = filterArguments;
  const { isBelowTablet } = useMediaQueryContext();
  const pathname = usePathname();

  const isSidebarExpanded = sidebarExpand === 'expanded';

  function toggleSidebar(){
    setSidebarExpand(isSidebarExpanded ? 'hidden' : 'expanded');
  }

  function onSidebarBackgroundClick(event: MouseEvent<HTMLElement>){
    if((event.target as Element).closest('a, button')) return;
    toggleSidebar();
  }

  if(isBelowTablet) return (<></>)
  return (
    <nav
      id="sidebar"
      className={`${isSidebarExpanded ? 'w-81 cursor-sidebar-collapse' : 'w-26 cursor-sidebar-expand'} relative bg-lmSurface dark:bg-dmSurface flex flex-col pr-3 pl-3 pt-3 pb-3 sidebar-transition @max-[92.8em]/viewport:hidden`}
      onClick={onSidebarBackgroundClick}
    >
      {/* Keyboard / screen-reader equivalent of clicking the sidebar background.
          Hidden until focused with the keyboard; not-sr-only resets position and size,
          so they're re-applied under focus-visible. */}
      <button
        type="button"
        aria-label="Sidebar"
        aria-expanded={isSidebarExpanded}
        aria-controls="sidebar"
        onClick={toggleSidebar}
        className="btn-template sr-only focus-visible:not-sr-only focus-visible:absolute! focus-visible:top-1/2 focus-visible:-right-3 focus-visible:z-5 focus-visible:h-12! focus-visible:w-6! focus-visible:-translate-y-1/2 focus-visible:flex justify-center"
      >
        <RightArrowhead
          className={`h-4 w-auto shrink-0 text-lmSecondary dark:text-dmSecondary down-arrowhead-transition ${isSidebarExpanded ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      <div className="p-2 overflow-hidden flex flex-col justify-between w-full h-full ">
        <div 
          className="w-full flex items-center justify-start gap-4 min-w-16" 
        >
          <HomeLink isHome={pathname === '/'} />
          <div className="flex flex-1 h-16 w-auto overflow-hidden justify-start items-center min-width min-w-16">
            <NameWordmark className="h-[1.53rem] w-auto shrink-0 text-lmSecondary dark:text-dmSecondary" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <SidebarButton
            variantProps={{
              type: "works",
              svg: WorksIcon,
              href: '/archive',
              activeContentType: contentType,
              onToggleContentType: onToggleContentType,
            }}
            sidebarExpand={sidebarExpand}
          />
          <SidebarButton
            variantProps={{
              type: "notes",
              svg: NotesIcon,
              href: '/archive',
              activeContentType: contentType,
              onToggleContentType: onToggleContentType,
            }}
            sidebarExpand={sidebarExpand}
          />
        </div>
        <SidebarButton
          variantProps={{
            type: "about",
            svg: AboutIcon,
            href: '/about',
          }}
          sidebarExpand={sidebarExpand}
        />
      </div>
    </nav>
  )
}