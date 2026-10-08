import { TagTypeArgs } from '@/types/filter';
import { useFilterContext } from '@/lib/filter/filter-provider';

export default function TagTypeOption({ tagType, active }:{ tagType:TagTypeArgs, active:TagTypeArgs }){
  const { onToggleTagType } = useFilterContext();

  function onClick(){
    if(tagType === active)
      return;

    onToggleTagType(tagType);
  }

  return (
    <button
      className={`btn-template ${tagType === active && 'btn-template-active'} px-4`}
      onClick={onClick}
    >
      {tagType.charAt(0).toUpperCase() + tagType.slice(1)}
    </button>
  )
}