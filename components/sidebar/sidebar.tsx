'use client';

import { useSidebarContext } from '@/lib/navigator/navigator-provider';
import { useFilterContext } from '@/lib/filter/filter-provider';
import TempleIcon from '@/assets/svg/icons/sidebar/gc_temple-icon.svg';
import WorksIcon from '@/assets/svg/icons/sidebar/gc_works-icon.svg';
import NotesIcon from '@/assets/svg/icons/sidebar/gc_notebook-icon.svg'
import AboutIcon from '@/assets/svg/icons/sidebar/gc_about-icon.svg'
import SidebarButton from './buttons/sidebar-button';
import NameWordmark from '@/assets/svg/icons/sidebar/gc_wordmark.svg';
import { useMediaQueryContext } from '@/lib/navigator/navigator-provider';


export default function Sidebar(){
  const { sidebarExpand, setSidebarExpand } = useSidebarContext();
  const { filterArguments, onToggleContentType } = useFilterContext();
  const { type } = filterArguments;
  const { isBelowTablet } = useMediaQueryContext();

  if(isBelowTablet) return (<></>)
  return (
    <nav 
      className={`${sidebarExpand === 'hidden' ? 'w-26' : 'w-81'} bg-lmSurface dark:bg-dmSurface flex flex-col pr-3 pl-3 pt-3 pb-3 sidebar-transition @max-[99em]/viewport:hidden`}
    >
      <div className="p-2 overflow-hidden flex flex-col justify-between w-full h-full ">
        <div 
          className="w-full flex items-center justify-start gap-4 min-w-16" 
        >
          <SidebarButton
            variantProps={{
              type: "temple",
              svg: TempleIcon,
              setSidebarExpand: setSidebarExpand,
            }}
            sidebarExpand={sidebarExpand}
          />
          <div className="flex flex-1 h-16 w-auto overflow-hidden justify-start items-center min-width min-w-16">
            <NameWordmark className="h-[1.53rem] w-auto shrink-0 text-lmSecondary dark:text-dmSecondary" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <SidebarButton
            variantProps={{
              type: "works",
              svg: WorksIcon,
              href: '/',
              activeContentType: type,
              onToggleContentType: onToggleContentType,
            }}
            sidebarExpand={sidebarExpand}
          />
          <SidebarButton
            variantProps={{
              type: "notes",
              svg: NotesIcon,
              href: '/',
              activeContentType: type,
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