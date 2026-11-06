import { useMobileHeaderContext } from '@/lib/navigator/navigator-provider';
import { useFilterContext } from '@/lib/filter/filter-provider';
import MobileContentTypeOptions from './mobile-content-type-options';
import MobileSortOrderOptions from './mobile-sort-order-options';
import MobileTagTypeOptions from './mobile-tag-type-options';

export default function SelectedMobileFilterOptions(){
  const { mobileHeaderExpand, mobileSelectedLevel2Option } = useMobileHeaderContext();
  const { filterArguments } = useFilterContext();
  const { contentType, sortOrder, tagType } = filterArguments;

  return (
    <div
      className='w-full flex-1 overflow-hidden pt-3'
    >
      <div
        className={`w-full px-5 ${mobileHeaderExpand === 'level-2' ? 'h-full' : 'h-0'} selected-mobile-filter-option-transition overflow-scroll scrollbar-none-webkit`}
      >
        <div
          className="py-5"
        >
          {mobileSelectedLevel2Option === 'type' &&
            <MobileContentTypeOptions contentType={contentType} />
          }
          {mobileSelectedLevel2Option === 'sort' && 
            <MobileSortOrderOptions sortOrder={sortOrder} />
          }
          {mobileSelectedLevel2Option === 'tag-type' && 
            <MobileTagTypeOptions tagType={tagType} />
          }
        </div>
      </div>
    </div>
  )
}