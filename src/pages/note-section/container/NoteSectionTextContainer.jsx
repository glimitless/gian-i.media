import './NoteSectionTextContainer.css';
import { NoteSectionBlock } from './NoteSectionBlock';
import { NoteSectionNav } from './NoteSectionNav';
import { useRef, useLayoutEffect } from 'react';
import { getVerticalScrollParent, scrollToBlock } from '../../../util/autoScroll';


export function NoteSectionTextContainer({ 
  section, noteTitle, blockId, type, noteId,
  prevSectionId, nextSectionId,
}){
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    const container = containerRef.current;
    if(!container) return;

    const scrollParent = getVerticalScrollParent(container);
    if(!scrollParent) return;

    const hasValidBlock = 
      blockId && section.blocks.some((block) => block.id === blockId);

    if(!hasValidBlock) {
      scrollToBlock(scrollParent, container, container);
      return;
    }
    
    const blockELement = container.querySelector(
      `[section-block-id="${CSS.escape(blockId)}"]`
    );
    if(!blockELement) return;

    scrollToBlock(scrollParent, blockELement, container);
  }, [blockId, section]);

  return (
    <div className="note-section-text-container" ref={containerRef}>
      <div className="note-section-block">
        <h1>{section.title}</h1>
        <h3>{noteTitle}</h3>
      </div>

      {section.blocks.map((block) => (
        <NoteSectionBlock 
          title={block.title} 
          date={block.date} 
          items={block.items}
          id={block.id}
          key={block.id} 
        />
      ))}
      {(prevSectionId || nextSectionId) &&
        <div className="note-section-block">
          <NoteSectionNav 
            type={type}
            noteId={noteId}
            prevSectionId={prevSectionId}
            nextSectionId={nextSectionId}
            
          />
       </div>
      }
      
    </div>
    
  )
}