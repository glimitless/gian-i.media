import './InactiveKeyword.css';
import PlusIcon from '../../../assets/icons/header/plus.svg?react';

export function InactiveKeyword({ keyword, onToggleKeyword }){
  return (
    <button 
      className="inactive-keyword"
      onClick={()=> onToggleKeyword(keyword)}
    >
      <PlusIcon />
      <p className="text">{keyword}</p>
    </button>
  );
};