import './SortOptionsButton.css';
import DownArrowhead from '../../../assets/icons/header/down-arrowhead.svg?react'

export function SortOptionsButton({ 
  sortOrder, expand, setExpand, 
  setSelectedOptionDisplay 
}){
  function onClick(){
    if(expand==='active-level-2-sort'){
      setExpand('active-level-1')
    } else{
      setExpand('active-level-2-sort');
      setSelectedOptionDisplay('sort');
    }
  };

  return (
    <button 
      className={`sort-options-button ${expand === 'active-level-2-sort' ? 'is-expanded' : ''}`}
      onClick={onClick}
    >
      {`Sort by: ${sortOrder}`}
      <DownArrowhead />
    </button>
  )
}