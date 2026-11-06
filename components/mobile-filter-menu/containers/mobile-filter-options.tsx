import SearchBar from "@/components/header/buttons/search-bar";
import { useFilterContext } from "@/lib/filter/filter-provider";
import { ExpandMobileFilterArguments } from "@/components/header/buttons/expand-filter-arguments";

export default function MobileFilterOptions(){
  const { filterArguments, onToggleTitleSearch } = useFilterContext();
  const { searchQuery, contentType, sortOrder, tagType } = filterArguments;

  return (
    <div
      className="w-full px-5 pt-6 pb-5 flex flex-col gap-4"
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
      <div className="flex flex-row flex-wrap gap-4">
        <span className="flex flex-row gap-4">
          <ExpandMobileFilterArguments
            variantProps={{
              type: 'type',
              current: contentType,
            }}
          />
          <ExpandMobileFilterArguments
            variantProps={{
              type: 'sort',
              current: sortOrder,
            }}
          />
        </span>
        <span className="flex flex-row gap-4">
          <ExpandMobileFilterArguments
            variantProps={{
              type: 'tag-type',
              current: tagType,
            }}
          />
          {tagType !== 'none' 
            ? <ExpandMobileFilterArguments
                variantProps={{
                  type: 'tag',
                }}
              /> 
            : <></>
          }
        </span>
        
      </div>
    </div>
  )
}