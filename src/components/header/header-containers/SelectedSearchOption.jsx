import './SelectedSearchOption.css';
import { ContentTypeOption } from '../header-buttons/ContentTypeOption';
import { SortOrderOption } from '../header-buttons/SortOrderOption';
import { InactiveKeywordsContainer } from './InactiveKeywordsContainer';
import { KeywordSearchContainer } from './KeywordSearchContainer';
import { useState } from 'react';

const CONTENT_TYPE_OPTIONS = ['All', 'Works', 'Notes'];
const SORT_ORDER_OPTIONS = ['Chronological', 'Reverse Chronological', 'Alphabetical', 'Reverse Alphabetical'];

export function SelectedSearchOption({ 
  selectedOptionDisplay, contentType, sortOrder, 
  onToggleContentType, onToggleSortOrder, 
  inactiveKeywords, onToggleKeyword
}){
  
  const [ keywordSearchQuery, setKeywordSearchQuery ] = useState('');
  const displayedInactiveKeywords = inactiveKeywords.filter((keyword) =>
    keyword.toLowerCase().includes(keywordSearchQuery.trim().toLowerCase())
  );
  

  if(selectedOptionDisplay==='sort') {
    return (
      <div className="selected-search-option no-overflow">
        {SORT_ORDER_OPTIONS.map((sortOrderOption) => (
          <SortOrderOption 
            key={sortOrderOption} 
            sortOrderOption={sortOrderOption} 
            activeSortOrder={sortOrder}
            onToggleSortOrder={onToggleSortOrder}
          />
        ))}
      </div>
    );
  } else if (selectedOptionDisplay==='keywords') {
    return (
      <div className="selected-search-option overflow">
        <KeywordSearchContainer 
          keywordSearchQuery={keywordSearchQuery} 
          setKeywordSearchQuery={setKeywordSearchQuery}
        />
        <InactiveKeywordsContainer 
          inactiveKeywords={displayedInactiveKeywords} 
          onToggleKeyword={onToggleKeyword} 
        />
      </div>
    );
  } else if (selectedOptionDisplay==='type') {
    return (
      <div className="selected-search-option no-overflow">
        {CONTENT_TYPE_OPTIONS.map((type) => (
          <ContentTypeOption 
            key={type} 
            type={type} 
            activeType={contentType} 
            onToggleContentType={onToggleContentType} 
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="selected-search-option">
      </div>
    );
  }
  
}