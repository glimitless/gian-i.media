import SearchBar from '../buttons/search-bar';
import ExpandHeader from '../buttons/expand-header';
import { useFilterContext } from '@/lib/filter/filter-provider';
import ResetFilter from '../buttons/reset-filter';
import { useMediaQueryContext } from '@/lib/navigator/navigator-provider';

export default function TitleSearchContainer(){
  const { filterArguments, onToggleTitleSearch, isDefault, resetFilter } = useFilterContext();
  const { searchQuery } = filterArguments;
  const { isBelowMobile } = useMediaQueryContext();

  return (
    <div className="flex flex-row h-16 w-auto gap-4">
      <SearchBar 
        variantProps={{
          type: 'title'
        }}
        value={searchQuery}
        setValue={onToggleTitleSearch}
      />
      <ExpandHeader />
      {(!isDefault && !isBelowMobile) && 
        <div className="hidden @min-[72.5em]/viewport:inline">
          <ResetFilter resetFilter={resetFilter} />
        </div>
      }
    </div>
  )
}