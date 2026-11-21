import type {  
  ArchiveNoteSection,
  NoteSectionRecord, 
  NoteSectionNeighbors,
  ArchiveNoteRecord,
  ArchiveNoteID,
  GroupIdArgs, 
  IndividualIdArgs, 
  IndividualBlockIdArgs
} from '@/types/archive';
import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { toPageMetadata } from './page-metadata';
import archiveNoteIDsJson from '@/data/notes/archive-note-ids.json';

const archiveNoteIDs: ArchiveNoteID[] = archiveNoteIDsJson;

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

export function findArchiveNoteMetadata(
  noteId: GroupIdArgs,
  sectionId?: IndividualIdArgs,
  blockId?: IndividualBlockIdArgs
): Metadata {
  const note = archiveNoteIDs.find((item) => item.id === noteId);
  if (!sectionId) return toPageMetadata(note);
  const section = note?.sections.find((item) => item.id === sectionId);
  if (!blockId) return toPageMetadata(section);
  return toPageMetadata(section?.blocks.find((item) => item.id === blockId));
}