import './MoreSearchOptions.css';
import { SortOptionsButton } from '../header-buttons/SortOptionsButton';
import { KeywordOptionsButton } from '../header-buttons/KeywordOptionsButton';
import { ActiveKeywordsContainer } from './ActiveKeywordsContainer';
import { TypeOptionsButton } from '../header-buttons/TypeOptionsButton';

export function MoreSearchOptions({ 
  sortOrder, contentType, expand, setExpand, 
  setSelectedOptionDisplay, activeKeywords,
  onToggleKeyword
}){
  return (
    <div className="more-search-options">
      <div className="search-categories">
        <TypeOptionsButton 
          contentType={contentType}
          expand={expand}
          setExpand={setExpand}
          setSelectedOptionDisplay={setSelectedOptionDisplay}
        />
        <SortOptionsButton 
          sortOrder={sortOrder}
          expand={expand}
          setExpand={setExpand}
          setSelectedOptionDisplay={setSelectedOptionDisplay}
        />
        <KeywordOptionsButton 
          expand={expand}
          setExpand={setExpand}
          setSelectedOptionDisplay={setSelectedOptionDisplay}
        />
      </div>
      <ActiveKeywordsContainer activeKeywords={activeKeywords} onToggleKeyword={onToggleKeyword} />
    </div>
  );
};