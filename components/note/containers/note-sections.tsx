import { GroupIdArgs, NoteSectionRecord } from '@/types/archive';
import NoteSectionBlocks from './note-section-blocks';

export default function NoteSections(
  { sections, noteId } 
  : { 
    sections: NoteSectionRecord[], 
    noteId: GroupIdArgs, 
  }
){
  return (
    <>
      {sections.map((section) => (
        <div 
          key={section.id}
        >
          <h2 className="info-expand-btns-template-container-header">
            {section.content.title}
          </h2>
          <NoteSectionBlocks
            blocks={section.content.blocks}
            noteId={noteId}
            sectionId={section.id}
          />
        </div>
      ))}
    </>
  )
}