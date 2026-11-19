import archiveWorksContentJson from '@/data/archive-works-content.json';
import type { ArchiveWorkRecord, GroupIdArgs, IndividualIdArgs, ArchiveWorkContent, ArchiveWorkCollection } from '@/types/archive';
import path from 'node:path';
import fs from 'node:fs';

const archiveWorksContent = archiveWorksContentJson as ArchiveWorkContent[];

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
  const work = archiveWorksContent.find(
    (item) => item.id === workId
  );
  if (!work) return;

  return work.collections.find(
    (item) => item.id === collectionId
  );
}