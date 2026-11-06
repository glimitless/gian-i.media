import SearchBar from '@/components/header/buttons/search-bar';
import { TagTypeArgs } from '@/types/filter';
import { useState } from 'react';

export default function MobileTagOptions({ tagType } : { tagType:TagTypeArgs }){
  const [ keywordSearchQuery, setKeywordSearchQuery ] = useState<string>('');

  return (
    <>
      <div className="mobile-filter-option-container">
        <h2>Active Keywords</h2>
      </div>
      <div className="mobile-filter-option-container">
        <h2>Inactive Keywords</h2>
        <div className="mobile-filter-option">
          <SearchBar 
            variantProps={{
              type: 'tag',
              activeTagType: tagType,
            }}
            value={keywordSearchQuery}
            setValue={setKeywordSearchQuery}
          />
        </div>
      </div>
    </>
  )
}