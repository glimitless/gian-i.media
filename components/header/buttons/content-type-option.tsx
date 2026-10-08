import { ContentTypeArgs } from '@/types/filter';
import { useFilterContext } from '@/lib/filter/filter-provider';

export default function ContentTypeOption({ type, active }:{ type:ContentTypeArgs, active:ContentTypeArgs }){
  const { onToggleContentType } = useFilterContext();

  function onClick(){
    if(type === active)
      return;

    onToggleContentType(type);
  }

  return (
    <button
      className={`btn-template ${type === active && 'btn-template-active'} px-4`}
      onClick={onClick}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  )
}