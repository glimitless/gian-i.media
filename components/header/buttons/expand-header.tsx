import DownArrowhead from '@/assets/svg/icons/header/down-arrowhead.svg';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';

export default function ExpandHeader(){
  const { headerExpand, setHeaderExpand } = useHeaderContext();

  function onClick(){
   setHeaderExpand(headerExpand === 'hidden' ? 'level-1' : 'hidden');
  }

  return (
    <button 
      className="btn-template w-16 flex flex-row justify-center"
      type="button"
      aria-label="Expand filter options"
      onClick={onClick}
    >
      <DownArrowhead 
        className={`w-[1.7rem] h-auto down-arrowhead-transition ${headerExpand === 'hidden' ? 'rotate-0' : 'rotate-180'}`} 
      />
    </button>
  )
}