import ActiveTag from '../buttons/active-tag';
import useHorizontalWheelScroll from '@/lib/hooks/useHorizontalWheelScroll';
import { useFilterContext } from '@/lib/filter/filter-provider';

export default function ActiveTags(){
  const { filterArguments, onToggleTag } = useFilterContext();
  const { tags } = filterArguments;
  const scrollRef = useHorizontalWheelScroll();

  return (
    <div 
      className="flex flex-1 flex-row min-w-0 items-center p-2 gap-2 overflow-x-auto overflow-y-hidden scrollbar-none-webkit"
      ref={scrollRef}
    >
      {tags.map((tag) => {
        return(
          <ActiveTag 
            key={tag}
            keyword={tag}
            onToggleTag={onToggleTag}
          />
        )
      })}
    </div>
  )

}