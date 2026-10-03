import type { TypeArgs, SortOrderArgs } from '@/types/filter';
import DownArrowhead from '@/assets/svg/icons/header/down-arrowhead.svg';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';

type VariantProps = (
  {
    type:'type',
    current:TypeArgs,
  } | {
    type:'sort',
    current:SortOrderArgs,
  } | {
    type:'keywords'
  }
)

export default function ExpandFilterArguments({variantProps}:{variantProps:VariantProps}){

  const {
    headerExpand,
    setHeaderExpand,
    selectedLevel2Option,
    setSelectedLevel2Option,
  } = useHeaderContext();


  function onClick(){
    const isThisOpen = 
      headerExpand === 'level-2' && selectedLevel2Option === variantProps.type;

    if(isThisOpen){
      setHeaderExpand('level-1');
      // setSelectedLevel2Option('');
      return;
    }

    setHeaderExpand('level-2');
    setSelectedLevel2Option(variantProps.type);
  }


  let message:string;
  switch(variantProps.type){
    case 'type':
      message = `Type: ${variantProps.current.charAt(0).toUpperCase() + variantProps.current.slice(1)}`;
      break;
    case 'sort':
      message = `Sort by: ${variantProps.current}`;
      break;
    case 'keywords':
      message = 'Filter keywords';
      break;
  }
    
  return (
    <button 
      className="btn-template px-4 shrink-0 gap-2"
      onClick={onClick}
    >
      {message}
      <DownArrowhead 
        className={`w-[0.8rem] h-auto ${headerExpand === 'level-2' && selectedLevel2Option === variantProps.type ? 'rotate-180' : 'rotate-0'} down-arrowhead-transition`} 
      />
    </button>
  )
}