'use client';

import type { ArchiveID, ArchiveIDRecord } from '@/types/archive';
import type { FilterArguments, KeywordArgs, TypeArgs, SortOrderArgs, SearchQueryArgs } from '@/types/filter';
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
  inactiveKeywords: KeywordArgs[];
  // resetFilter: () => void;
  onToggleKeyword: (keyword: KeywordArgs) => void;
  onToggleTitleSearch: (searchQuery: SearchQueryArgs) => void;
  onToggleContentType: (type: TypeArgs) => void;
  onToggleSortOrder: (sortOrder: SortOrderArgs) => void;
}

const DEFAULT_FILTER_ARGUMENTS:FilterArguments = {
  type: 'all',
  keywords: [],
  searchQuery: '',
  sortOrder: 'Chronological',
}
const DISABLE_FILTER_ON_MOBILE = true;
function isDefaultFilterArguments(args: FilterArguments): boolean {
  return (
    args.type === DEFAULT_FILTER_ARGUMENTS.type &&
    args.searchQuery === DEFAULT_FILTER_ARGUMENTS.searchQuery &&
    args.sortOrder === DEFAULT_FILTER_ARGUMENTS.sortOrder &&
    args.keywords.length === 0
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
  const filteredArchiveIDs = useMemo(
    () => {
      if (isBelowMobile && DISABLE_FILTER_ON_MOBILE) {
        return filterArchive(archiveIDs, DEFAULT_FILTER_ARGUMENTS);
      }
      return filterArchive(archiveIDs, filterArguments);
    },
    [filterArguments, isBelowMobile, archiveIDs]
  );

  const onToggleKeyword = useCallback((keyword:KeywordArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      keywords: prev.keywords.includes(keyword)
        ? prev.keywords.filter((k) => k != keyword)
        : [...prev.keywords, keyword],
    }));
  }, []);
  const onToggleTitleSearch = useCallback((searchQuery:SearchQueryArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      searchQuery,
    }))
  }, []);
  const onToggleContentType = useCallback((type:TypeArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      type,
    }));
  }, []);
  const onToggleSortOrder = useCallback((sortOrder:SortOrderArgs) => {
    setFilterArguments((prev) => ({
      ...prev,
      sortOrder,
    }));
  }, []);
  const inactiveKeywords:KeywordArgs[] = useMemo(() => {
    const visible = new Set(
      filteredArchiveIDs.flatMap((item) => item.keywords)
    );
    return[...visible]
      .filter((keyword) => !filterArguments.keywords.includes(keyword))
      .sort((a, b) => a.localeCompare(b));
  }, [filteredArchiveIDs, filterArguments.keywords]);
  
  const value = useMemo(
    () => ({
      filterArguments,
      setFilterArguments,
      filteredArchiveIDs,
      inactiveKeywords,
      // resetFilter,
      onToggleKeyword,
      onToggleTitleSearch,
      onToggleContentType,
      onToggleSortOrder,
    }),
    [
      filterArguments, 
      filteredArchiveIDs, 
      inactiveKeywords,
      // resetFilter,
      onToggleKeyword,
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