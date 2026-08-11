import './SortOrderOption.css';

export function SortOrderOption({ sortOrderOption, activeSortOrder, onToggleSortOrder }){
  function onClick(){
    if(sortOrderOption === activeSortOrder)
      return;

    onToggleSortOrder(sortOrderOption);
  }

  return(
    <button 
      className={`sort-order-option ${sortOrderOption === activeSortOrder ? 'is-active' : ''}`} 
      onClick={onClick}
    >
      {sortOrderOption}
    </button>
  )
}