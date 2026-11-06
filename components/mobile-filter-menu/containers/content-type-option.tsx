import { CONTENT_TYPE_OPTIONS } from '@/lib/filter/filter-provider';
import { ContentTypeArgs } from '@/types/filter';
import ContentTypeOption from '@/components/header/buttons/content-type-option';

export default function MobileContentTypeOptions({ contentType }: { contentType: ContentTypeArgs }) {
  return (
    <div
      className="w-full block space-y-4"
    >
      <h2>Content Type</h2>
      <div className="w-full flex flex-row gap-4">
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