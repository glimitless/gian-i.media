'use client'

import ColorThemeSwitch from "./buttons/color-theme-switch";
import LandingHeaderNav from "./containers/landing-header-nav";

export default function LandingHeader(){

  return (
    <header
      className="h-26 py-5 px-5 absolute w-full bg-lmBg dark:bg-dmBg header-transition overflow-hidden z-4"
    >
      <div
        className="w-full h-full flex flex-row justify-between"
      >
        <LandingHeaderNav />
        <ColorThemeSwitch />
      </div>
    </header>
  )
}