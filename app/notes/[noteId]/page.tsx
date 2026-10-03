import ThumbnailNav from '@/components/thumbnail-nav/thumbnail-nav';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { findArchiveNoteRecord } from '@/lib/archive/archive-notes';
import { GroupIdArgs } from '@/types/archive';
import { notFound } from 'next/navigation';
import NotePageBody from '@/components/note/note-page-body';

type NotePageProps = {
  params: Promise<{noteId: GroupIdArgs}>
}

export default async function NotePage({ params } : NotePageProps){
  const type = 'notes';
  const { noteId } = await params;
  const archiveIDRecord = findArchiveIDRecord(noteId, type);
  if(!archiveIDRecord) notFound();

  const archiveNoteRecord = findArchiveNoteRecord(noteId);
  if(!archiveNoteRecord) notFound();

  return (
    <div className="two-column-page-container">
      <div className="two-column-page-grid">
        <div className="two-column-page-content-column">
          <NotePageBody 
            title={archiveIDRecord.title}
            subtitle={archiveNoteRecord.content.subtitle}
            overview={archiveNoteRecord.content.description}
            sections={archiveNoteRecord.content.sections}
            noteId={noteId}
          />
        </div>
        <div className="two-column-page-navigation-column">
          <ThumbnailNav 
            groupParams={{title: archiveIDRecord.title, type:type, id:noteId, thumbnailRecord:archiveIDRecord.thumbnail}}
          />
        </div>
      </div>
    </div>
  )
}