import { GroupIdArgs, IndividualIdArgs, NoteSectionBlockLink } from '@/types/archive';
import NoteSectionBlock from './note-section-block';

export default function NoteSectionBlocks(
  { noteId, sectionId, blocks}
  : {
    noteId: GroupIdArgs;
    sectionId: IndividualIdArgs;
    blocks: NoteSectionBlockLink[];
  }
){
  return (
    <div className="info-expand-btns-template-container">
      {blocks.map((block) => (
        <NoteSectionBlock 
          key={block.id}
          title={block.content.title}
          date={block.content.date}
          summary={block.content.summary}
          noteId={noteId}
          sectionId={sectionId}
          blockId={block.id}
        />
      ))}
    </div>
  )
}