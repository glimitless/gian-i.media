import ColorModeSwitch from '../buttons/color-mode-switch';
import MobileHomeLinkContainer from '../containers/mobile-home-link-container';
import TitleSearchContainer from '../containers/title-search-container';
import { useMediaQueryContext } from '@/lib/navigator/navigator-provider';
import ActiveTags from './active-tags';

export default function HeaderFirstRow(){
  const { isBelowMobile, isBelowTablet } = useMediaQueryContext();

  return (
    <div className="w-full h-full p-0 flex flex-row gap-0 overflow-hidden">
      <div className="flex flex-row justify-start gap-4 h-full p-2">
        <div className="flex @min-[99em]/viewport:hidden">
          {isBelowTablet && <MobileHomeLinkContainer isBelowMobile={isBelowMobile} />}
        </div>
        <div className="hidden @min-[59.5em]/viewport:flex">
          {!isBelowMobile && <TitleSearchContainer />}
        </div>
      </div>
      <ActiveTags />
      <div
        className="p-2"
      >
        <ColorModeSwitch />
      </div>
      
    </div>
  )
}