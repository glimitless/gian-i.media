import { useHeaderContext } from "@/lib/navigator/navigator-provider";
import { useFilterContext } from "@/lib/filter/filter-provider";
import type { ContentTypeArgs, SortOrderArgs, TagTypeArgs } from "@/types/filter";
import ContentTypeOption from "../buttons/content-type-option";
import SortOrderOption from "../buttons/sort-order-option";
import KeywordsSelected from "./keywords-selected";
import TagTypeOption from "../buttons/tag-type-option";

const CONTENT_TYPE_OPTIONS:ContentTypeArgs[] = [
  'all',
  'works',
  'notes',
];
const TAG_TYPE_OPTIONS:TagTypeArgs[] = [
  'all',
  'keywords',
  'tools',
]
const SORT_ORDER_OPTIONS:SortOrderArgs[] = [
  'Chronological',
  'Reverse Chronological',
  'Alphabetical',
  'Reverse Alphabetical',
];


export default function SelectedFilterArgument(){
  const { selectedLevel2Option } = useHeaderContext();
  const { filterArguments } = useFilterContext();
  const { contentType, sortOrder, tagType } = filterArguments;

  if(selectedLevel2Option === 'type'){
    return (
      <div className="w-full min-w-0 h-16 flex flex-row p-2 gap-4">
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
    )
  }else if(selectedLevel2Option === 'sort'){
    return (
      <div className="w-full min-w-0 h-16 flex flex-row p-2 gap-4">
        {SORT_ORDER_OPTIONS.map((option, i) => (
          <SortOrderOption 
            sortOrder={option}
            active={sortOrder}
            key={i}
          />
        ))}
      </div>
    )
  }else if(selectedLevel2Option === 'tag-type'){
    return (
      <div
        className="w-full min-w-0 h-16 flex flex-row p-2 gap-4"
      >
        {TAG_TYPE_OPTIONS.map((option, i) => (
          <TagTypeOption 
            tagType={option}
            active={tagType}
            key={i}
          />
        ))}
      </div>
    )
  }else if(selectedLevel2Option === 'tag'){
    return (
      <KeywordsSelected />
    )
  }
}