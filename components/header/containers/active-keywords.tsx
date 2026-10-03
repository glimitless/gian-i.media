import ActiveKeyword from '../buttons/active-keyword';
import useHorizontalWheelScroll from '@/lib/hooks/useHorizontalWheelScroll';
import { useFilterContext } from '@/lib/filter/filter-provider';

export default function ActiveKeywords(){
  const { filterArguments, onToggleKeyword } = useFilterContext();
  const { keywords } = filterArguments;
  const scrollRef = useHorizontalWheelScroll();

  return (
    <div 
      className="flex flex-1 flex-row min-w-0 items-center p-2 gap-4 overflow-x-auto overflow-y-hidden scrollbar-none-webkit"
      ref={scrollRef}
    >
      {keywords.map((keyword) => {
        return(
          <ActiveKeyword 
            key={keyword}
            keyword={keyword}
            onToggleKeyword={onToggleKeyword}
          />
        )
      })}
    </div>
  )

}