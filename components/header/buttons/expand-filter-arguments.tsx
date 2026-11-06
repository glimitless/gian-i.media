import type { ContentTypeArgs, SortOrderArgs, TagTypeArgs } from '@/types/filter';
import DownArrowhead from '@/public/svg/icons/header/down-arrowhead.svg';
import { useHeaderContext, useMobileHeaderContext } from '@/lib/navigator/navigator-provider';

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

function filterArgumentLabel(variantProps: VariantProps): string {
  switch(variantProps.type){
    case 'type':
      return `Type: ${variantProps.current.charAt(0).toUpperCase() + variantProps.current.slice(1)}`;
    case 'sort':
      return `Sort by: ${variantProps.current}`;
    case 'tag-type':
      return `Tag: ${variantProps.current.charAt(0).toUpperCase() + variantProps.current.slice(1)}`;
    case 'tag':
      return 'Filter tags';
  }
}

function FilterArgumentButton({
  label,
  open,
  onClick,
  arrowTransitionClass,
}: {
  label: string,
  open: boolean,
  onClick: () => void,
  arrowTransitionClass: string,
}){
  return (
    <button
      className={`btn-template ${open ? 'btn-template-active cursor-pointer' : ''} px-4 shrink-0 gap-2`}
      onClick={onClick}
    >
      {label}
      <DownArrowhead
        className={`w-[0.8rem] h-auto ${open ? 'rotate-180' : 'rotate-0'} ${arrowTransitionClass}`}
      />
    </button>
  )
}

export default function ExpandFilterArguments({ variantProps }: { variantProps: VariantProps }){
  const {
    headerExpand,
    setHeaderExpand,
    selectedLevel2Option,
    setSelectedLevel2Option,
  } = useHeaderContext();
  const open = headerExpand === 'level-3' && selectedLevel2Option === variantProps.type;

  function onClick(){
    if(open){
      setHeaderExpand('level-2');
      return;
    }

    setHeaderExpand('level-3');
    setSelectedLevel2Option(variantProps.type);
  }

  return (
    <FilterArgumentButton
      label={filterArgumentLabel(variantProps)}
      open={open}
      onClick={onClick}
      arrowTransitionClass="down-arrowhead-transition"
    />
  )
}

export function ExpandMobileFilterArguments({ variantProps }: { variantProps: VariantProps }){
  const {
    mobileHeaderExpand,
    setMobileHeaderExpand,
    mobileSelectedLevel2Option,
    setMobileSelectedLevel2Option,
  } = useMobileHeaderContext();
  const open = mobileHeaderExpand === 'level-2' && mobileSelectedLevel2Option === variantProps.type;

  function onClick(){
    if(open){
      setMobileHeaderExpand('level-1');
      return;
    }

    setMobileHeaderExpand('level-2');
    setMobileSelectedLevel2Option(variantProps.type);
  }

  return (
    <FilterArgumentButton
      label={filterArgumentLabel(variantProps)}
      open={open}
      onClick={onClick}
      arrowTransitionClass="down-arrowhead-transition-3"
    />
  )
}
