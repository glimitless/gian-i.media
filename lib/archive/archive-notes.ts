import type {  
  ArchiveNoteSection,
  NoteSectionRecord, 
  NoteSectionNeighbors,
  ArchiveNoteRecord, 
  GroupIdArgs, 
  IndividualIdArgs 
} from '@/types/archive';
import fs from 'node:fs';
import path from 'node:path';

export function findArchiveNoteRecord(
  noteId: GroupIdArgs
) : ArchiveNoteRecord | undefined {
  const file = path.join(process.cwd(), 'data', 'notes', noteId, 'index.json')
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as ArchiveNoteRecord;
};

export function findArchiveNoteSectionContent(
  noteId: GroupIdArgs,
  sectionId: IndividualIdArgs,
) : ArchiveNoteSection | undefined {
  const file = path.join(process.cwd(), 'data', 'notes', noteId, `${sectionId}.json`)
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as ArchiveNoteSection;
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