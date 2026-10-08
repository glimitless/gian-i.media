import InactiveTags from "./inactive-tags";
import SearchBar from "../buttons/search-bar";
import { useFilterContext } from "@/lib/filter/filter-provider";
import { useState } from "react";


export default function KeywordsSelected(){
  const { inactiveTags, filterArguments } = useFilterContext();
  const { tagType } = filterArguments;
  const [ keywordSearchQuery, setKeywordSearchQuery ] = useState<string>('');
  const displayedInactiveTags = inactiveTags.filter((keyword) =>
    keyword.toLowerCase().includes(keywordSearchQuery.trim().toLowerCase())
  );

  return (
    <div className="w-full min-w-0 flex flex-row">
      <div className="p-2 flex flex-row h-16 w-auto gap-4">
        <SearchBar 
          variantProps={{
            type: 'tag',
            activeTagType: tagType,
          }}
          value={keywordSearchQuery}
          setValue={setKeywordSearchQuery}
        />
      </div>
      <InactiveTags 
        displayedInactiveTags={displayedInactiveTags}
      />
    </div>
  )
}