import type { ArchiveID } from "@/types/archive";
import type { FilterArguments } from "@/types/filter";

export default function filterArchive(
  archiveIDs:ArchiveID[], 
  filterArguments:FilterArguments
): ArchiveID[]{
  const query = filterArguments.searchQuery.trim().toLowerCase();

  const filteredIDs = archiveIDs
    .filter(
      (item) =>
        filterArguments.type.toLowerCase() === 'all' ||
        item.type.toLowerCase() === filterArguments.type.toLowerCase(),
    )
    .filter(
      (item) => 
        query === '' ||
        item.title.toLowerCase().includes(query),
    )
    .filter(
      (item) =>
        filterArguments.keywords.length === 0 ||
        filterArguments.keywords.every((keyword) => 
          item.keywords.includes(keyword),
        ),
    );
  
  filteredIDs.sort((a, b) => {
    switch (filterArguments.sortOrder) {
      case 'Chronological':
        return Number(b.date) - Number(a.date);
      case 'Reverse Chronological':
        return Number(a.date) - Number(b.date);
      case 'Alphabetical':
        return a.title.localeCompare(b.title);
      case 'Reverse Alphabetical':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return filteredIDs;
}