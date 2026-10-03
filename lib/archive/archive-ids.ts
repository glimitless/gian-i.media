import archiveIDsJson from '@/data/archive-ids.json'
import type { ArchiveID, ArchiveIDRecord } from "@/types/archive";
import { hydrateArchiveID } from './hydrate-archive-id';

export const archiveIDRecords = archiveIDsJson as ArchiveIDRecord[];

export function findArchiveIDRecord(
  id:string,
  type: ArchiveIDRecord['type'],
): ArchiveIDRecord | undefined {
  return archiveIDRecords.find(
    (item) => item.id === id && (item.type === type)
  );
}

export function findHydratedArchiveID(
  id: string,
  type: ArchiveIDRecord['type'],
): ArchiveID | undefined {
  const record = findArchiveIDRecord(id, type);
  return record ? hydrateArchiveID(record) : undefined;
}