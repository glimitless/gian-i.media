import archiveNotesJson from '@/data/archive-notes.json';
import archiveNotesContentJson from '@/data/archive-notes-content.json';
import type { 
  ArchiveNoteContent, 
  ArchiveNoteSection,
  NoteSectionRecord, 
  NoteSectionNeighbors,
  ArchiveNoteRecord, 
  GroupIdArgs, 
  IndividualIdArgs 
} from '@/types/archive';

const archiveNoteRecords = archiveNotesJson as ArchiveNoteRecord[];
const archiveNoteContentRecords = archiveNotesContentJson as ArchiveNoteContent[];

export function findArchiveNoteRecord(
  noteId: GroupIdArgs
) : ArchiveNoteRecord | undefined {
  return archiveNoteRecords.find(
    (item) => item.id === noteId
  );
};

export function findArchiveNoteSectionContent(
  noteId: GroupIdArgs,
  sectionId: IndividualIdArgs,
) : ArchiveNoteSection | undefined {
  const note = archiveNoteContentRecords.find(
    (item) => item.id === noteId
  );
  if(!note) return undefined;

  return note.sections.find(
    (item) => item.id === sectionId
  );
}

export function getNoteSectionNeighbors(
  sections: NoteSectionRecord[],
  sectionId: IndividualIdArgs,
): NoteSectionNeighbors | undefined {
  const index = sections.findIndex((section) => section.id === sectionId);
  if(index === -1) return undefined;

  return {
    current: sections[index],
    previous: index > 0 ? sections[index - 1] : undefined,
    next: index < sections.length - 1 ? sections[index + 1] : undefined
  }

}