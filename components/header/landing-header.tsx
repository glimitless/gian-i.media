'use client'

import ColorThemeSwitch from "./buttons/color-theme-switch";
import LandingHeaderNav from "./containers/landing-header-nav";
import { useHeaderContext } from "@/lib/navigator/navigator-provider";

export default function LandingHeader(){
  const { headerExpand } = useHeaderContext();
  const isHidden = headerExpand === 'hidden';

  return (
    <header
      className={`${isHidden ? 'h-0 py-0' : 'h-26 py-5'} px-5 fixed top-0 w-full overflow-hidden z-4 header-transition`}
    >
      <div
        className="w-full h-full flex flex-row justify-between"
        inert={isHidden}
      >
        <LandingHeaderNav />
        <ColorThemeSwitch />
      </div>
    </header>
  )
}
