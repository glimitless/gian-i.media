import ThumbnailNav from '@/components/thumbnail-nav/thumbnail-nav';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { findArchiveNoteSectionContent, findArchiveNoteRecord, getNoteSectionNeighbors } from '@/lib/archive/archive-notes';
import type { GroupIdArgs, IndividualBlockIdArgs, IndividualIdArgs } from '@/types/archive';
import { notFound } from 'next/navigation';
import NoteSectionPageBody from '@/components/note-section/note-section-page-body';

type NoteSectionPageProps =  {
  params: Promise<{noteId:GroupIdArgs, sectionId:IndividualIdArgs, blockId:IndividualBlockIdArgs}>
}

export default async function NoteSectionBlockPage({ params }:NoteSectionPageProps){
  const type = 'notes';
  const { noteId, sectionId, blockId } = await params;

  const archiveIDRecord = findArchiveIDRecord(noteId, type);
  const archiveNoteRecord = findArchiveNoteRecord(noteId);
  if(!archiveIDRecord || !archiveNoteRecord) notFound();

  const neighbors = getNoteSectionNeighbors(archiveNoteRecord.content.sections, sectionId);
  if(!neighbors) notFound();

  const archiveNoteSectionContent = findArchiveNoteSectionContent(noteId, sectionId);
  if(!archiveNoteSectionContent) notFound();


  

  return (
    <div className="two-column-page-container">
      <div className="two-column-page-grid">
        <div className="two-column-page-content-column">
          <NoteSectionPageBody 
            blockId={blockId}
            noteTitle={archiveIDRecord.title}
            sectionTitle={neighbors.current.content.title}
            blocks={archiveNoteSectionContent.blocks}
            blockLinks={neighbors.current.content.blocks}
            noteId={noteId}
            previousSectionId={neighbors.previous?.id}
            nextSectionId={neighbors.next?.id}
          />
        </div>
        <div className="two-column-page-navigation-column">
          <ThumbnailNav
            groupParams={
              {
                type: type,
                id: noteId,
                title: archiveIDRecord.title,
                thumbnailRecord: archiveIDRecord.thumbnail
              }
            }
          />
        </div>
      </div>
    </div>
  )
}