import FilterProvider from '@/lib/filter/filter-provider';
import NavigatorProvider from '@/lib/navigator/navigator-provider';
import MobileFilterMenu from '@/components/mobile-filter-menu/mobile-filter-menu';
import Sidebar from '@/components/sidebar/sidebar';
import ArchiveHeader from '@/components/header/archive-header';
import MainScroll from '@/components/main-scroll/main-scroll';
import type { ReactNode } from 'react';

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return (
    <NavigatorProvider>
      <FilterProvider>
        <div className="@container/viewport min-h-dvh h-dvh flex flex-row relative">
          <MobileFilterMenu />
          <Sidebar />
          <div className="@container/content relative self-stretch flex min-w-0 flex-1 flex-col">
            <ArchiveHeader />
            <MainScroll>
              {children}
            </MainScroll>
          </div>
        </div>
      </FilterProvider>
    </NavigatorProvider>
  )
}