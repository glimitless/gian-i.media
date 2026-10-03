import { SortOrderArgs } from '@/types/filter';
import { useFilterContext } from '@/lib/filter/filter-provider';

export default function SortOrderOption({ sortOrder, active }:{ sortOrder:SortOrderArgs, active:SortOrderArgs }){
  const { onToggleSortOrder } = useFilterContext();

  function onClick(){
    if(sortOrder === active)
      return;

    onToggleSortOrder(sortOrder);
  }

  return (
    <button
      className={`btn-template ${sortOrder === active && 'btn-template-active'} px-4`}
      onClick={onClick}
    >
      {sortOrder}
    </button>
  )
}