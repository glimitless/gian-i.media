import './NoteSectionItemExpand.css'
import DownArrowhead from '../../../assets/icons/header/down-arrowhead.svg?react';
import { formatDate } from '../../../util/formatDate';

export function NoteSectionItemExpand({
  title, date, isItemExpanded, setIsItemExpanded,
}){
  return (
    <button 
      className={`note-section-item-expand ${isItemExpanded ? 'is-expanded' : ''}`}
      onClick={() => setIsItemExpanded(!isItemExpanded)}
    >
      <div className="svg">
        <DownArrowhead />
      </div>
      <div className="text">
        <p>{title}</p>
        <h3>{formatDate(date)}</h3>
      </div>
    </button>
  )
  
}