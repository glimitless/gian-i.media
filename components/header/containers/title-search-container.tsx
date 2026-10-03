import SearchBar from '../buttons/search-bar';
import ExpandHeader from '../buttons/expand-header';
import { useFilterContext } from '@/lib/filter/filter-provider';

export default function TitleSearchContainer(){
  const { filterArguments, onToggleTitleSearch } = useFilterContext();
  const { searchQuery } = filterArguments;

  return (
    <div className="flex flex-row h-16 w-auto gap-4">
      <SearchBar 
        type="title"
        value={searchQuery}
        setValue={onToggleTitleSearch}
      />
      <ExpandHeader />
    </div>
  )
}