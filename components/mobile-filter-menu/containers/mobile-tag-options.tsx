import SearchBar from '@/components/header/buttons/search-bar';
import { TagArgs, TagTypeArgs } from '@/types/filter';
import { useState, useMemo } from 'react';
import InactiveKeyword from '@/components/header/buttons/inactive-keyword';
import ActiveTag from '@/components/header/buttons/active-tag';

type MobileTagOptionsProps = {
  tagType: TagTypeArgs,
  inactiveTags: TagArgs[],
  onToggleTag: (keyword: string) => void,
  tags: TagArgs[]
}

export default function MobileTagOptions({ tagType, inactiveTags, onToggleTag, tags }: MobileTagOptionsProps) {
  const [keywordSearchQuery, setKeywordSearchQuery] = useState<string>('');
  const displayedInactiveTags = useMemo(
    () => inactiveTags.filter((keyword) =>
      keyword.toLowerCase().includes(keywordSearchQuery.trim().toLowerCase())
    ), [inactiveTags, keywordSearchQuery]
  );

  return (
    <>
      <div className="mobile-filter-option-container">
        <h2>Active Keywords</h2>
        <div className="mobile-filter-options">
          {tags.map((tag) => {
            return (
              <ActiveTag
                key={tag}
                keyword={tag}
                onToggleTag={onToggleTag}
              />
            )
          })}
        </div>
      </div>
      <div className="mobile-filter-option-container">
        <h2>Inactive Keywords</h2>
        <div className="mobile-filter-options">
          <SearchBar
            variantProps={{
              type: 'tag',
              activeTagType: tagType,
            }}
            value={keywordSearchQuery}
            setValue={setKeywordSearchQuery}
          />
          {displayedInactiveTags.map((keyword) => {
            return (
              <InactiveKeyword
                key={keyword}
                keyword={keyword}
                onToggleTag={onToggleTag}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}