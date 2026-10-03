import InactiveKeywords from "./inactive-keywords";
import SearchBar from "../buttons/search-bar";
import { useFilterContext } from "@/lib/filter/filter-provider";
import { useState } from "react";


export default function KeywordsSelected(){
  const { inactiveKeywords } = useFilterContext();
  const [ keywordSearchQuery, setKeywordSearchQuery ] = useState<string>('');
  const displayedInactiveKeywords = inactiveKeywords.filter((keyword) =>
    keyword.toLowerCase().includes(keywordSearchQuery.trim().toLowerCase())
  );

  return (
    <div className="w-full min-w-0 flex flex-row">
      <div className="p-2">
        <SearchBar 
          type="keyword"
          value={keywordSearchQuery}
          setValue={setKeywordSearchQuery}
        />
      </div>
      <InactiveKeywords 
        displayedInactiveKeywords={displayedInactiveKeywords}
      />
    </div>
  )
}