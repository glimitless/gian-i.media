import { ThumbnailNav } from "../../components/thumbnail-nav/ThumbnailNav";
import { NoteSectionTextContainer } from "./container/NoteSectionTextContainer";

export function NoteSectionPageBody({ 
  noteId, type, note, section, filteredNavItems, 
  blockId, prevSectionId, nextSectionId, 
}){
  return (
    <div className="two-column-page-container">
      <div className="content-grid">
        <div className="content-grid-column page-content">
          <NoteSectionTextContainer 
            section={section} 
            noteTitle={note.title}
            noteId={noteId}
            type={type}
            blockId={blockId}
            prevSectionId={prevSectionId}
            nextSectionId={nextSectionId}
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