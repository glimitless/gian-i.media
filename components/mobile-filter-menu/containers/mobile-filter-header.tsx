import ColorModeSwitch from "@/components/header/buttons/color-mode-switch";
import MobileHomeLinkContainer from "@/components/header/containers/mobile-home-link-container";

export default function MobileFilterHeader(){
  return (
    <div className="w-full p-7 flex flex-row justify-between">
      <MobileHomeLinkContainer />
      <ColorModeSwitch />
    </div>
  )
}