import type { ContentTypeArgs, SortOrderArgs, TagTypeArgs } from '@/types/filter';
import DownArrowhead from '@/public/svg/icons/header/down-arrowhead.svg';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';
import { useMobileHeaderContext } from '@/lib/navigator/navigator-provider';

type VariantProps = (
  {
    type:'type',
    current:ContentTypeArgs,
  } | {
    type:'sort',
    current:SortOrderArgs,
  } | {
    type:'tag'
  } | {
    type:'tag-type',
    current:TagTypeArgs,
  }
)

export default function ExpandFilterArguments({variantProps, mobile = false}:{variantProps:VariantProps, mobile?:boolean}){
  const {
    headerExpand,
    setHeaderExpand,
    selectedLevel2Option,
    setSelectedLevel2Option,
  } = useHeaderContext();
  const {
    mobileHeaderExpand,
    setMobileHeaderExpand,
    mobileSelectedLevel2Option,
    setMobileSelectedLevel2Option
  } = useMobileHeaderContext();
  


  function onClick(){
    if(mobile){
      const isThisOpen = mobileHeaderExpand === 'level-2' && mobileSelectedLevel2Option === variantProps.type;

      if(isThisOpen){
        setMobileHeaderExpand('level-1');
        return;
      }

      setMobileHeaderExpand('level-2');
      setMobileSelectedLevel2Option(variantProps.type)
    }
    else{
      const isThisOpen = 
      headerExpand === 'level-3' && selectedLevel2Option === variantProps.type;

      if(isThisOpen){
        setHeaderExpand('level-2');
        return;
      }

      setHeaderExpand('level-3');
      setSelectedLevel2Option(variantProps.type);
    }
    
  }

  let message:string;
  switch(variantProps.type){
    case 'type':
      message = `Type: ${variantProps.current.charAt(0).toUpperCase() + variantProps.current.slice(1)}`;
      break;
    case 'sort':
      message = `Sort by: ${variantProps.current}`;
      break;
    case 'tag-type':
      message = `Tag: ${variantProps.current.charAt(0).toUpperCase() + variantProps.current.slice(1)}`;
      break;
    case 'tag':
      message = 'Filter tags';
      break;
  }
  
  return (
    <button 
      className={`btn-template ${mobile ? mobileHeaderExpand === 'level-2' && mobileSelectedLevel2Option === variantProps.type ? 'btn-template-active cursor-pointer' : '' : headerExpand === 'level-3' && selectedLevel2Option === variantProps.type ? 'btn-template-active cursor-pointer' : ''} px-4 shrink-0 gap-2`}
      onClick={onClick}
    >
      {message}
      <DownArrowhead 
        className={`w-[0.8rem] h-auto ${mobile ? mobileHeaderExpand === 'level-2' && mobileSelectedLevel2Option === variantProps.type ? 'rotate-180' : 'rotate-0' : headerExpand === 'level-3' && selectedLevel2Option === variantProps.type ? 'rotate-180' : 'rotate-0'} ${mobile ? 'down-arrowhead-transition-2' : 'down-arrowhead-transition'}`} 
      />
    </button>
  )
}