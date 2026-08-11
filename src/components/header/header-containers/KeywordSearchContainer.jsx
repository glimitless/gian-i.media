import { SearchBar } from '../header-buttons/SearchBar';

export function KeywordSearchContainer({ keywordSearchQuery, setKeywordSearchQuery }) {

  return (
    <div className='keyword-search-container'>
      <SearchBar
        placeholder="Search Keywords"
        value={keywordSearchQuery}
        onToggleSearch={setKeywordSearchQuery}
        type="keywords"
      />
    </div>
  )
}

