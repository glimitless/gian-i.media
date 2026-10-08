import { TagArgs } from "@/types/filter";
import InactiveKeyword from "../buttons/inactive-keyword";
import useHorizontalWheelScroll from '@/lib/hooks/useHorizontalWheelScroll';
import { useFilterContext } from "@/lib/filter/filter-provider";

export default function InactiveKeywords({ displayedInactiveKeywords } : {displayedInactiveKeywords: TagArgs[]}){
  const scrollRef = useHorizontalWheelScroll();
  const { onToggleTag } = useFilterContext();

  return (
    <div 
      ref={scrollRef}
      className="min-w-0 p-2 flex flex-row items-center gap-4 overflow-x-auto overflow-y-hidden scrollbar-none-webkit"
    >
      {displayedInactiveKeywords.map((keyword) => {
        return (
          <InactiveKeyword 
            key={keyword}
            keyword={keyword}
            onToggleTag={onToggleTag}
          />
        )
        
      })}
    </div>
  )
}