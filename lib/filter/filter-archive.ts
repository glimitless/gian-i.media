import type { ArchiveID } from "@/types/archive";
import type { FilterArguments } from "@/types/filter";

/** Fields that affect archive filtering (excludes UI-only `tagType`). */
export type ArchiveFilterCriteria = Omit<FilterArguments, "tagType">;

function itemMatchesTags(item: ArchiveID, tags: FilterArguments["tags"]): boolean {
  if (tags.length === 0) return true;
  for (const tag of tags) {
    if (!item.keywords.includes(tag) && !item.tools.includes(tag)) {
      return false;
    }
  }
  return true;
}

export default function filterArchive(
  archiveIDs: ArchiveID[],
  filterArguments: ArchiveFilterCriteria,
): ArchiveID[] {
  const query = filterArguments.searchQuery.trim().toLowerCase();
  const contentType = filterArguments.contentType.toLowerCase();
  const matchAllContentTypes = contentType === "all";

  const filteredIDs: ArchiveID[] = [];
  for (const item of archiveIDs) {
    if (!matchAllContentTypes && item.type.toLowerCase() !== contentType) {
      continue;
    }
    if (query !== "" && !item.title.toLowerCase().includes(query)) {
      continue;
    }
    if (!itemMatchesTags(item, filterArguments.tags)) {
      continue;
    }
    filteredIDs.push(item);
  }

  filteredIDs.sort((a, b) => {
    switch (filterArguments.sortOrder) {
      case "Chronological":
        return Number(b.date) - Number(a.date);
      case "Reverse Chronological":
        return Number(a.date) - Number(b.date);
      case "Alphabetical":
        return a.title.localeCompare(b.title);
      case "Reverse Alphabetical":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return filteredIDs;
}
