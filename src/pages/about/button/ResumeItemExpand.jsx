import './ResumeItemExpand.css';
import DownArrowhead from '../../../assets/icons/header/down-arrowhead.svg?react';

export function ResumeItemExpand({ 
  name, institution, date, location, 
  isItemExpanded, setIsItemExpanded
}){
  return (
    <button 
      className={`resume-block-expand ${isItemExpanded ? 'is-expanded' : ''}`}
      onClick={() => setIsItemExpanded(!isItemExpanded)}
    >
      <div className='svg'>
        <DownArrowhead/>
      </div>
      
      <div className='text'>
        <p>{name} | {institution}</p>
        <h3>{date} | {location}</h3>
      </div>
    </button>
  );
}