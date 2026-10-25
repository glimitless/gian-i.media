import DownArrowhead from '@/assets/svg/icons/header/down-arrowhead.svg';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';

export default function ExpandHeader(){
  const { headerExpand, setHeaderExpand } = useHeaderContext();

  function onClick(){
   setHeaderExpand(headerExpand === 'level-1' ? 'level-2' : 'level-1');
  }

  return (
    <button 
      className={`btn-template ${(headerExpand === 'level-1' || headerExpand === 'hidden') ? '' : 'btn-template-active cursor-pointer'} w-16 flex flex-row justify-center`}
      type="button"
      aria-label="Expand filter options"
      onClick={onClick}
    >
      <DownArrowhead 
        className={`w-6 h-auto down-arrowhead-transition ${(headerExpand === 'level-1' || headerExpand === 'hidden') ? 'rotate-0' : 'rotate-180'}`} 
      />
    </button>
  )
}