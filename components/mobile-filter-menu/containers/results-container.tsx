import { useFilterContext } from "@/lib/filter/filter-provider"
import { useMobileHeaderContext } from "@/lib/navigator/navigator-provider"

export default function ResultsContainer(){
  const { filteredArchiveIDs } = useFilterContext();
  const { setMobileHeaderExpand } = useMobileHeaderContext();

  return (
    <div 
      className="p-5"
    >
      <h2 
        className="underline"
        onClick={() => setMobileHeaderExpand('hidden')}
      >
        {filteredArchiveIDs.length} results
      </h2>
    </div>
  )
}