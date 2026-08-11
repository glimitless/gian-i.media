import { ThumbnailNav } from "../../components/thumbnail-nav/ThumbnailNav";
import { NoteTextContainer } from "./container/NoteTextContainer";
import { useLayoutEffect, useRef } from 'react';
import { pageContentScroll } from '../../util/autoScroll.js';

export function NotePageBody({ note, filteredNavItems, noteId, type }){

  const pageContentRef = useRef(null);
  useLayoutEffect(() => {
    pageContentScroll(pageContentRef.current);
  }, [noteId]);
  
  return (
    <div className="two-column-page-container">
      <div className="content-grid">
        <div className="content-grid-column page-content" ref={pageContentRef}>
            <NoteTextContainer 
              title={note.title}
              subtitle={note.subtitle}
              overview={note.overview}
              sections={note.sections}
              type={type}
              noteId={noteId}
            />
        </div>
        <div className="content-grid-column navigation">
          <ThumbnailNav 
            activeThumbnail={note.thumbnail}
            activeAncestorId={noteId}
            activeType={type}
            filteredNavItems={filteredNavItems}
          />
        </div>
      </div>
    </div>
  )
}