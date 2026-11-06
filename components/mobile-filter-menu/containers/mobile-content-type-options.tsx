import { CONTENT_TYPE_OPTIONS } from '@/lib/filter/filter-provider';
import { ContentTypeArgs } from '@/types/filter';
import ContentTypeOption from '@/components/header/buttons/content-type-option';

export default function MobileContentTypeOptions({ contentType }: { contentType: ContentTypeArgs }) {
  return (
    <div
      className="mobile-filter-option-container"
    >
      <h2>Content Type</h2>
      <div className="mobile-filter-options">
        {CONTENT_TYPE_OPTIONS.map((option, i) => {
          return (
            <ContentTypeOption
              type={option}
              active={contentType}
              key={i}
            />
          )
        })}
      </div>
    </div>
  )
}