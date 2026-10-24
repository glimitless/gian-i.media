import ColorModeSwitch from '../buttons/color-mode-switch';
import MobileHomeLinkContainer from '../containers/mobile-home-link-container';
import TitleSearchContainer from '../containers/title-search-container';
import ActiveTags from './active-tags';

export default function HeaderFirstRow(){

  return (
    <div className="w-full h-full p-0 flex flex-row gap-0 overflow-hidden">
      <div className="flex flex-row justify-start gap-4 h-full p-2">
        <div className="flex @min-[93.8em]/viewport:hidden">
          <MobileHomeLinkContainer />
        </div>
        <div className="hidden @min-[73.5em]/viewport:flex">
          <TitleSearchContainer />
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