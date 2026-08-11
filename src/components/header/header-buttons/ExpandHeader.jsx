import './ExpandHeader.css';
import DownArrowhead from '../../../assets/icons/header/down-arrowhead.svg?react';

export function ExpandHeader({ expand, setExpand }){
  
  function onClick(){
    expand === 'hidden' ? setExpand('active-level-1') : setExpand('hidden');
  }

  return (
    <button className={`expand-header ${expand !== 'hidden' ? 'is-expanded' : ''}`} onClick={onClick}>
      <DownArrowhead/>
    </button>
  );
};