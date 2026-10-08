'use client';

import type { ArchiveID, ArchiveIDRecord } from '@/types/archive';
import type { FilterArguments, TagArgs, ContentTypeArgs, SortOrderArgs, SearchQueryArgs, TagTypeArgs } from '@/types/filter';
import filterArchive from './filter-archive';
import { 
  createContext, 
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useMediaQueryContext } from '../navigator/navigator-provider';
import archiveIDsJson from '@/data/archive-ids.json';
import { hydrateArchiveID } from '../archive/hydrate-archive-id';

type FilterContextValue = {
  filterArguments: FilterArguments;
  setFilterArguments: React.Dispatch<React.SetStateAction<FilterArguments>>;
  filteredArchiveIDs: ArchiveID[];
  inactiveTags: TagArgs[];
  // resetFilter: () => void;
  onToggleTagType: (type: TagTypeArgs) => void;
  onToggleTag: (keyword: TagArgs) => void;
  onToggleTitleSearch: (searchQuery: SearchQueryArgs) => void;
  onToggleContentType: (type: ContentTypeArgs) => void;
  onToggleSortOrder: (sortOrder: SortOrderArgs) => void;
}

const DEFAULT_FILTER_ARGUMENTS:FilterArguments = {
  contentType: 'all',
  tags: [],
  tagType: 'keywords',
  searchQuery: '',
  sortOrder: 'Chronological',
}
const DISABLE_FILTER_ON_MOBILE = true;
function isDefaultFilterArguments(args: FilterArguments): boolean {
  return (
    args.contentType === DEFAULT_FILTER_ARGUMENTS.contentType &&
    args.searchQuery === DEFAULT_FILTER_ARGUMENTS.searchQuery &&
    args.sortOrder === DEFAULT_FILTER_ARGUMENTS.sortOrder &&
    args.tags.length === 0 &&
    args.tagType === DEFAULT_FILTER_ARGUMENTS.tagType
  );
}

const FilterContext = createContext<FilterContextValue | null>(
  null,
)

export default function FilterProvider({ children } : {children:ReactNode}){
  const [ filterArguments, setFilterArguments ] = useState<FilterArguments>(
    DEFAULT_FILTER_ARGUMENTS,
  );
  const archiveIDs = useMemo(
    () => ((archiveIDsJson as ArchiveIDRecord[]).map(hydrateArchiveID)),
    []
  );

  const { isBelowMobile } = useMediaQueryContext();
  // const resetFilter = useCallback(() => {
  //   setFilterArguments({ ...DEFAULT_FILTER_ARGUMENTS });
  // }, []);
  useEffect(() => {
    if (!isBelowMobile) return;
    const reset = () => {
      setFilterArguments((prev) => {
        if(isDefaultFilterArguments(prev)) return prev;
        return { ...DEFAULT_FILTER_ARGUMENTS };
      })
    };
    reset();
  }, [isBelowMobile]);
  const {
    contentType,
    searchQuery,
    sortOrder,
    tags,
    tagType,
  } = filterArguments;

  const filteredArchiveIDs = useMemo(
    () => {
      const criteria = { contentType, searchQuery, sortOrder, tags };
      if (isBelowMobile && DISABLE_FILTER_ON_MOBILE) {
        return filterArchive(archiveIDs, DEFAULT_FILTER_ARGUMENTS);
      }
      return filterArchive(archiveIDs, criteria);
    },
    [contentType, searchQuery, sortOrder, tags, isBelowMobile, archiveIDs]
  );

  const selectedTagSet = useMemo(() => new Set(tags), [tags]);
  const { keywordSet, toolSet } = useMemo(() => {
    const keywordSet = new Set<TagArgs>();
    const toolSet = new Set<TagArgs>();
    for (const ID of archiveIDs) {
      for (const keyword of ID.keywords) keywordSet.add(keyword);
      for (const tool of ID.tools) toolSet.add(tool);
    }
    return { keywordSet, toolSet };
  }, [archiveIDs]);

  const onToggleTag = useCallback((tag:TagArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((k) => k != tag)
        : [...prev.tags, tag],
    }));
  }, []);
  const onToggleTagType = useCallback((tagType:TagTypeArgs) => {
    setFilterArguments((prev) => {
      const tags =
        tagType === 'all'
          ? prev.tags
          : prev.tags.filter((tag) =>
            tagType === 'keywords' ? keywordSet.has(tag) : toolSet.has(tag)
          );
      
      return { ...prev, tagType, tags };
    })
  }, [keywordSet, toolSet])
  const onToggleTitleSearch = useCallback((searchQuery:SearchQueryArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      searchQuery,
    }))
  }, []);
  const onToggleContentType = useCallback((contentType:ContentTypeArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      contentType,
    }));
  }, []);
  const onToggleSortOrder = useCallback((sortOrder:SortOrderArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      sortOrder,
    }));
  }, []);
  const inactiveTags: TagArgs[] = useMemo(() => {
    const includeKeywords = tagType === "all" || tagType === "keywords";
    const includeTools = tagType === "all" || tagType === "tools";
    const visible = new Set<TagArgs>();

    for (const item of filteredArchiveIDs) {
      if (includeKeywords) {
        for (const keyword of item.keywords) visible.add(keyword);
      }
      if (includeTools) {
        for (const tool of item.tools) visible.add(tool);
      }
    }

    const inactive: TagArgs[] = [];
    for (const tag of visible) {
      if (!selectedTagSet.has(tag)) inactive.push(tag);
    }
    inactive.sort((a, b) => a.localeCompare(b));
    return inactive;
  }, [filteredArchiveIDs, selectedTagSet, tagType]);
  
  const value = useMemo(
    () => ({
      filterArguments,
      setFilterArguments,
      filteredArchiveIDs,
      inactiveTags,
      // resetFilter,
      onToggleTag,
      onToggleTagType,
      onToggleTitleSearch,
      onToggleContentType,
      onToggleSortOrder,
    }),
    [
      filterArguments, 
      filteredArchiveIDs, 
      inactiveTags,
      // resetFilter,
      onToggleTag,
      onToggleTagType,
      onToggleTitleSearch,
      onToggleContentType,
      onToggleSortOrder,
    ]
  );

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilterContext(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      'useFilterContext() must be called within FilterProvider',
    );
  }
  return context;
}