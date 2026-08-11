import './ActiveKeyword.css';
import Checkmark from '../../../assets/icons/header/checkmark.svg?react';
import X from '../../../assets/icons/header/x.svg?react';

export function ActiveKeyword({ keyword, onToggleKeyword }){


  return (
    <button 
      className="active-keyword"
      onClick={() => onToggleKeyword(keyword)}
    >
      <span className='active-keyword-icon'>
        <Checkmark className="active-keyword-checkmark" />
        <X className="active-keyword-x" />
      </span>
      
      {keyword}
    </button>
  )
}