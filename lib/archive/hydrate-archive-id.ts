import type { ArchiveID, ArchiveIDRecord } from "@/types/archive";
import { thumbnailByFilename } from "./thumbnails";

export function hydrateArchiveID(record: ArchiveIDRecord): ArchiveID {
  const thumbnail = thumbnailByFilename[record.thumbnail];
  if(!thumbnail){
    throw new Error(`Unknown thumbnail: ${record.thumbnail}`)
  }
  return { ...record, thumbnail }
};