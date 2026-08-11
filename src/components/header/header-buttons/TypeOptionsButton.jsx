import './TypeOptionsButton.css';
import DownArrowhead from '../../../assets/icons/header/down-arrowhead.svg?react'

export function TypeOptionsButton({ 
  contentType, expand, setExpand, 
  setSelectedOptionDisplay 
}){
  function onClick(){
    if(expand==='active-level-2-type'){
      setExpand('active-level-1')
    } else{
      setExpand('active-level-2-type');
      setSelectedOptionDisplay('type');
    }
  };

  return (
    <button 
      className={`type-options-button ${expand === 'active-level-2-type' ? 'is-expanded' : ''}`}
      onClick={onClick}
    >
      {`Type: ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}
      <DownArrowhead />
    </button>
  )
}