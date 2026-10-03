'use client';

import type { ResumeBlockItem } from '@/types/resume';
import { useRef, useState } from 'react';
import ResumeBlockItemExpand from '../buttons/resume-block-item-expand';
import useScrollIntoViewAfterExpand from '@/lib/hooks/useScrollIntoViewAfterExpand';

export default function ResumeBlockItem({ item } : { item:ResumeBlockItem }){
  const [ isItemExpanded, setIsItemExpanded ] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const expandGridRef = useRef<HTMLDivElement>(null);

  useScrollIntoViewAfterExpand(isItemExpanded, expandGridRef, itemRef);

  return (
    <div ref={itemRef} className="block-item">
      <ResumeBlockItemExpand 
        name={item.name}
        institution={item.institution}
        date={item.date}
        location={item.location}
        isItemExpanded={isItemExpanded}
        setIsItemExpanded={setIsItemExpanded}
      />
      <div 
        ref={expandGridRef}
        className={`grid item-expand-transition ${isItemExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`
      }>
        <div className="overflow-hidden min-h-0">
          <ul className="block-list no-read-link variant-2">
            {item.items.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
} 