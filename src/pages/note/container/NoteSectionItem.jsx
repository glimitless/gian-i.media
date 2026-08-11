import './NoteSectionItem.css';
import { NoteSectionItemExpand } from "../button/NoteSectionItemExpand";
import { NoteSectionItemReadLink } from '../button/NoteSectionItemReadLink';
import { useState } from "react";

export function NoteSectionItem({ 
  title, date, summary, noteId, type, 
  sectionId, blockId,
}){
  const [ isItemExpanded, setIsItemExpanded ] = useState(false);

  return (
    <div className={`note-section-item ${isItemExpanded ? 'expand' : ''}`}>
      <NoteSectionItemExpand 
        title={title} 
        date={date} 
        isItemExpanded={isItemExpanded}
        setIsItemExpanded={setIsItemExpanded}
      />
      <div className="note-section-item-desc">
        <div className="desc-inner">
          <div className="section-summary">
            <h3>Section Summary</h3>
            <ul>
              {summary.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>
          <NoteSectionItemReadLink
            noteId={noteId}
            sectionId={sectionId}
            blockId={blockId}
            type={type}
          />
        </div>
      </div>
    </div>
  )
}