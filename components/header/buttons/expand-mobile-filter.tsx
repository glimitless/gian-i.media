import DownArrowhead from '@/public/svg/icons/header/down-arrowhead.svg';
import { useMobileHeaderContext } from '@/lib/navigator/navigator-provider';

export default function ExpandMobileFilter(){
  const { mobileHeaderExpand, setMobileHeaderExpand } = useMobileHeaderContext();
  function onClick(){
    setMobileHeaderExpand((prev) => prev === 'hidden' ? 'level-1' : 'hidden')
  }

  return (
    <button
      className={`btn-template ${mobileHeaderExpand === 'hidden' ? '' : 'btn-template-active'} btn-template-transition w-16 flex flex-row justify-center @min-[72.5em]/viewport:hidden`}
      onClick={onClick}
    >
      <DownArrowhead 
        className={`w-6 h-auto down-arrowhead-transition-2 ${mobileHeaderExpand === 'hidden' ? 'rotate-0' : 'rotate-180'}`} 
      />
    </button>
  )
}