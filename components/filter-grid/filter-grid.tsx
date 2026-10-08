'use client';

import { useFilterContext } from '@/lib/filter/filter-provider';
import FilterGridItem from './containers/filter-grid-item';
import type { TagArgs, TagTypeArgs } from '@/types/filter';
import type { GroupIdArgs } from '@/types/archive';
import { useMemo } from 'react';

function buildDisplayTags(
  keywords: TagArgs[],
  tools: TagArgs[],
  activeTagType: TagTypeArgs,
): TagArgs[] {
  const tags: TagArgs[] = [];
  if (activeTagType === 'all' || activeTagType === 'keywords') {
    tags.push(...keywords);
  }
  if (activeTagType === 'all' || activeTagType === 'tools') {
    tags.push(...tools);
  }
  if (tags.length > 1) {
    tags.sort((a, b) => a.localeCompare(b));
  }
  return tags;
}

export default function FilterGrid() {
  const { filterArguments, filteredArchiveIDs, onToggleTag } = useFilterContext();
  const { tagType: activeTagType, tags: activeTags } = filterArguments;

  const activeTagSet = useMemo(() => new Set(activeTags), [activeTags]);

  const displayTagsById = useMemo(() => {
    const map = new Map<GroupIdArgs, TagArgs[]>();
    for (const ID of filteredArchiveIDs) {
      map.set(
        ID.id,
        buildDisplayTags(ID.keywords, ID.tools, activeTagType),
      );
    }
    return map;
  }, [filteredArchiveIDs, activeTagType]);

  return (
    <div className="grid w-full grid-rows-auto gap-x-24 gap-y-0 grid-cols-1 @min-[48em]/main:gap-y-5 @min-[48em]/main:grid-cols-2 @min-[75em]/main:grid-cols-3 @min-[102em]/main:grid-cols-4 @min-[129em]/main:grid-cols-5 @min-[156em]/main:grid-cols-6">
      {filteredArchiveIDs.map((ID) => (
        <FilterGridItem
          title={ID.title}
          Thumbnail={ID.thumbnail}
          date={ID.date}
          tags={displayTagsById.get(ID.id) ?? []}
          onToggleTag={onToggleTag}
          activeTagSet={activeTagSet}
          type={ID.type}
          id={ID.id}
          key={ID.id}
        />
      ))}
    </div>
  );
}
