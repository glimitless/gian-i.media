import type { ArchiveWorkRecord, GroupIdArgs, IndividualIdArgs, ArchiveWorkCollection } from '@/types/archive';
import path from 'node:path';
import fs from 'node:fs';

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