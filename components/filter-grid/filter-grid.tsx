'use client';

import { useFilterContext } from '@/lib/filter/filter-provider';
import FilterGridItem from './containers/filter-grid-item';

export default function FilterGrid(){
  const { filterArguments, filteredArchiveIDs, onToggleKeyword } = useFilterContext();
  const activeKeywords = filterArguments.keywords;

  return ( 
      <div className="grid w-full grid-rows-auto gap-x-24 gap-y-0 grid-cols-1 @min-[48em]/main:gap-y-5 @min-[48em]/main:grid-cols-2 @min-[75em]/main:grid-cols-3 @min-[102em]/main:grid-cols-4 @min-[129em]/main:grid-cols-5 @min-[156em]/main:grid-cols-6">
        {
          filteredArchiveIDs.map((ID) => {
            return (
              <FilterGridItem
                title={ID.title}
                Thumbnail={ID.thumbnail}
                date={ID.date}
                keywords={ID.keywords}
                onToggleKeyword={onToggleKeyword}
                activeKeywords={activeKeywords}
                type={ID.type}
                id={ID.id}
                key={ID.id}
              />
            )
          })
        }
      </div>
    
  )
}
