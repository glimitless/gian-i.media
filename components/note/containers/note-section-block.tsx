'use client';

import { NoteSectionBlockExpand } from '../buttons/note-section-block-expand';
import { EightDigitDate, GroupIdArgs, IndividualBlockIdArgs, IndividualIdArgs } from '@/types/archive';
import { useState, useRef } from 'react';
import useScrollIntoViewAfterExpand from '@/lib/hooks/useScrollIntoViewAfterExpand';
import NoteSectionBlockReadLink from '../buttons/note-section-block-read-link';

export default function NoteSectionBlock(
  { title, date, summary, noteId, sectionId, blockId }
  : {
    title:string;
    date:EightDigitDate;
    summary:string[];
    noteId:GroupIdArgs;
    sectionId:IndividualIdArgs;
    blockId:IndividualBlockIdArgs
  }
){
  const [ isItemExpanded, setIsItemExpanded ] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const expandGridRef = useRef<HTMLDivElement>(null);
  useScrollIntoViewAfterExpand(isItemExpanded, expandGridRef, itemRef);

  return (
    <div ref={itemRef} className="block-item">
      <NoteSectionBlockExpand 
        title={title}
        date={date}
        isItemExpanded={isItemExpanded}
        setIsItemExpanded={setIsItemExpanded}
      />
      <div
        ref={expandGridRef}
        className={`grid item-expand-transition ${isItemExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden min-h-0">
          <ul className="block-list variant-2">
            {summary.map((summaryPoint, i) => (
              <li key={i}>{summaryPoint}</li>
            ))}
          </ul>
          <NoteSectionBlockReadLink 
            noteId={noteId}
            sectionId={sectionId}
            blockId={blockId}
          />
        </div>
        
      </div>
    </div>
  )
}