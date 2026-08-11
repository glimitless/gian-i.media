import './ResumeBlockItem.css';
import { ResumeItemExpand } from '../button/ResumeItemExpand';
import { useState } from 'react';

export function ResumeBlockItem({item}){
  const [ isItemExpanded, setIsItemExpanded ] = useState(false);

  return (
    <div className={`expandable-resume-block-item ${isItemExpanded ? 'expand' : ''}`}>
      <ResumeItemExpand 
        name={item.name} 
        institution={item.institution}
        date={item.date}
        location={item.location} 
        isItemExpanded={isItemExpanded}
        setIsItemExpanded={setIsItemExpanded}
      />
      <div className="expandable-resume-block-item-desc">
        <div className="expandable-resume-block-item-desc-inner">
          <ul>
            {item.items.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}