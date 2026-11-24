import ColorThemeSwitch from "@/components/header/buttons/color-theme-switch";
import MobileHomeLinkContainer from "@/components/header/containers/mobile-home-link-container";

export default function MobileFilterHeader(){
  return (
    <div className="w-full p-5 flex flex-row justify-between">
      <MobileHomeLinkContainer />
      <ColorThemeSwitch />
    </div>
  )
}