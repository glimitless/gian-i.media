import archiveWorksJson from '@/data/archive-works.json';
import archiveWorksContentJson from '@/data/archive-works-content.json';
import type { ArchiveWorkRecord, GroupIdArgs, IndividualIdArgs, ArchiveWorkContent, ArchiveWorkCollection } from '@/types/archive';

const archiveWorkRecords = archiveWorksJson as ArchiveWorkRecord[];
const archiveWorksContent = archiveWorksContentJson as ArchiveWorkContent[];

export function findArchiveWorkRecord(
  workId:GroupIdArgs
): ArchiveWorkRecord | undefined {
  return archiveWorkRecords.find(
    (item) => item.id === workId
  );
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