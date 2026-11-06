'use client'

import { useMobileHeaderContext } from "@/lib/navigator/navigator-provider"
import MobileFilterHeader from "./containers/mobile-filter-header";

export default function MobileFilterMenu(){
  const { mobileHeaderExpand } = useMobileHeaderContext();

  return (
    <div className={`flex @min-[72.5em]/viewport:hidden absolute w-full z-11 ${mobileHeaderExpand === 'hidden' ? 'h-0' : 'h-full'}  flex-col justify-start bg-lmSurface dark:bg-dmSurface mobile-filter-menu-transition overflow-hidden`}>
      <MobileFilterHeader />
    </div>
  )
}