import { useFilterContext } from "@/lib/filter/filter-provider";
import ExpandFilterArguments from "../buttons/expand-filter-arguments";

export default function MoreSearchOptions(){
  const { filterArguments } = useFilterContext();
  const { contentType, sortOrder, tagType } = filterArguments;

  return (
    <div 
      className="w-full h-full p-0 flex flex-row gap-0 overflow-hidden"
    >
      <div className="w-auto height-full p-2 flex flex-row gap-4">
        <ExpandFilterArguments 
          variantProps={{
            type: 'type',
            current: contentType,
          }}
        />
        <ExpandFilterArguments 
          variantProps={{
            type: 'sort',
            current: sortOrder,
          }}
        />
        <ExpandFilterArguments 
          variantProps={{
            type: 'tag-type',
            current: tagType,
          }}
        />
        <ExpandFilterArguments
          variantProps={{
            type: 'tag',
          }} 
        />
      </div>
    </div>
  )
}