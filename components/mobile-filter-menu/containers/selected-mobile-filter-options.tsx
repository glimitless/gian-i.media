import { useMobileHeaderContext } from '@/lib/navigator/navigator-provider';
import { useFilterContext } from '@/lib/filter/filter-provider';
import MobileContentTypeOptions from './mobile-content-type-options';
import MobileSortOrderOptions from './mobile-sort-order-options';
import MobileTagTypeOptions from './mobile-tag-type-options';
import MobileTagOptions from './mobile-tag-options';

export default function SelectedMobileFilterOptions(){
  const { mobileHeaderExpand, mobileSelectedLevel2Option } = useMobileHeaderContext();
  const { filterArguments, inactiveTags, onToggleTag } = useFilterContext();
  const { contentType, sortOrder, tagType, tags } = filterArguments;

  return (
    <div className='flex w-full min-h-0 flex-1 flex-col overflow-hidden pt-3'>
      <div
        className={`grid w-full min-h-0 max-h-full ${mobileHeaderExpand === 'level-2' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} selected-mobile-filter-option-transition`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-h-full overflow-y-auto px-5 scrollbar-none-webkit">
            <div className="block">
              {mobileSelectedLevel2Option === 'type' &&
                <MobileContentTypeOptions contentType={contentType} />
              }
              {mobileSelectedLevel2Option === 'sort' &&
                <MobileSortOrderOptions sortOrder={sortOrder} />
              }
              {mobileSelectedLevel2Option === 'tag-type' &&
                <MobileTagTypeOptions tagType={tagType} />
              }
              {mobileSelectedLevel2Option === 'tag' &&
                <MobileTagOptions
                  tagType={tagType}
                  inactiveTags={inactiveTags}
                  onToggleTag={onToggleTag}
                  tags={tags}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}