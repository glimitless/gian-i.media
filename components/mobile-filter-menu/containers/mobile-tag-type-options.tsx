import TagTypeOption from "@/components/header/buttons/tag-type-option"
import { TAG_TYPE_OPTIONS } from "@/lib/filter/filter-provider"
import { TagTypeArgs } from "@/types/filter"

export default function MobileTagTypeOptions({ tagType } : { tagType: TagTypeArgs }){
  return (
    <div
      className="mobile-filter-option-container"
    >
      <h2>Tag Options</h2>
      <div className="mobile-filter-options">
        {TAG_TYPE_OPTIONS.map((option, i) => {
          return (
            <TagTypeOption
              tagType={option}
              active={tagType}
              key={i}
            />
          )
        })}
      </div>
    </div>
  )
}