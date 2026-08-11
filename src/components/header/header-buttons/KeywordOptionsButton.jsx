import './KeywordOptionsButton.css';
import DownArrowhead from '../../../assets/icons/header/down-arrowhead.svg?react';

export function KeywordOptionsButton({ expand, setExpand, setSelectedOptionDisplay }){
  function onClick(){
    if(expand==='active-level-2-keywords'){
      setExpand('active-level-1')
    } else {
      setExpand('active-level-2-keywords');
      setSelectedOptionDisplay('keywords');
    }
        
  };
  return (
    <button 
      className={`keyword-option-button ${expand === 'active-level-2-keywords' ? 'is-expanded' : ''}`}
      onClick={onClick}
    >
      Filter keywords
      <DownArrowhead />
    </button>
  );
};