import type { ArchiveNoteBlock, GroupIdArgs, IndividualBlockIdArgs, IndividualIdArgs, NoteSectionBlockLink } from '@/types/archive';
import NoteSectionBlock from './containers/note-section-block';
import NoteSectionNav from './containers/note-section-nav';
import NoteSectionBlockScrollContainer from './containers/note-section-block-scroll-container';

export default function NoteSectionPageBody(
  { noteId,
    sectionTitle,
    noteTitle,
    blocks,
    blockLinks,
    previousSectionId,
    nextSectionId,
    blockId = ''
  }: {
    noteId: GroupIdArgs;
    sectionTitle: string;
    noteTitle: string;
    blocks: ArchiveNoteBlock[];
    blockLinks: NoteSectionBlockLink[];
    previousSectionId: (IndividualIdArgs | undefined);
    nextSectionId: (IndividualIdArgs | undefined);
    blockId?: IndividualBlockIdArgs;
  }
) {
  const blockIds = blockLinks.map((block) => block.id);

  return (
    <div className="block-page-body">
      <div className="block-page-title-container variant-2">
        <h1>{sectionTitle}</h1>
        <h3>{noteTitle}</h3>
      </div>
      <NoteSectionBlockScrollContainer
        blockId={blockId}
        blockIds={blockIds}
      >
        {blocks.map((block, i) => (
          <NoteSectionBlock
            key={i}
            title={blockLinks[i].content.title}
            date={blockLinks[i].content.date}
            items={block.items}
            id={block.id}
          />
        ))}
        <NoteSectionNav
          noteId={noteId}
          previousSectionId={previousSectionId}
          nextSectionId={nextSectionId}
        />
      </NoteSectionBlockScrollContainer>
    </div>
  )
}