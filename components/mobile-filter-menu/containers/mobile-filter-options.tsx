import SearchBar from "@/components/header/buttons/search-bar";
import { useFilterContext } from "@/lib/filter/filter-provider";

export default function MobileFilterOptions(){
  const { filterArguments, onToggleTitleSearch } = useFilterContext();
  const { searchQuery } = filterArguments;

  return (
    <div
      className="w-full p-5 flex flex-col "
    >
      <div className="w-full max-w-180">
        <SearchBar 
          variantProps={{
            type: 'title'
          }}
          value={searchQuery}
          setValue={onToggleTitleSearch}
        />
      </div>
    </div>
  )
}