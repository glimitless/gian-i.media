import { useFilterContext } from "@/lib/filter/filter-provider";
import ExpandFilterArguments from "../buttons/expand-filter-arguments";
import ActiveKeywords from "./active-keywords";

export default function MoreSearchOptions(){
  const { filterArguments } = useFilterContext();
  const { type, sortOrder } = filterArguments;

  return (
    <div 
      className="w-full h-full p-0 flex flex-row gap-0 overflow-hidden"
    >
      <div className="w-auto height-full p-2 flex flex-row gap-4">
        <ExpandFilterArguments 
          variantProps={{
            type: 'type',
            current: type,
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
            type: 'keywords',
          }} 
        />
      </div>
      <ActiveKeywords />
    </div>
  )
}