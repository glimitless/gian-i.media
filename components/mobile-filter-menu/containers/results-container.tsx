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
        className="underline cursor-pointer w-fit"
        onClick={() => setMobileHeaderExpand('hidden')}
      >
        {filteredArchiveIDs.length} result{filteredArchiveIDs.length != 1 && 's'}
      </h2>
    </div>
  )
}