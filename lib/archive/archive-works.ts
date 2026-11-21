import type { ArchiveWorkRecord, ArchiveWorkID, GroupIdArgs, IndividualIdArgs, ArchiveWorkCollection } from '@/types/archive';
import type { Metadata } from 'next';
import path from 'node:path';
import fs from 'node:fs';
import { toPageMetadata } from './page-metadata';
import archiveWorkIDsJson from '@/data/works/archive-work-ids.json'

const archiveWorkIDs: ArchiveWorkID[] = archiveWorkIDsJson;

export function findArchiveWorkRecord(
  workId:GroupIdArgs
): ArchiveWorkRecord | undefined {
  const file = path.join(process.cwd(), 'data', 'works', workId, 'index.json');
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as ArchiveWorkRecord;
};

export function findArchiveWorkCollectionContent(
  workId:GroupIdArgs, collectionId:IndividualIdArgs
): ArchiveWorkCollection | undefined {
  const file = path.join(process.cwd(), 'data', 'works', workId, `${collectionId}.json`);
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as ArchiveWorkCollection;
}

export function findArchiveWorkMetadata(
  workId: GroupIdArgs,
  collectionId?: IndividualIdArgs
): Metadata {
  const work = archiveWorkIDs.find((item) => item.id === workId);
  if (!collectionId) return toPageMetadata(work);
  return toPageMetadata(work?.collections.find((item) => item.id === collectionId));
}