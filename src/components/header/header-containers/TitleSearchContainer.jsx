import './TitleSearchContainer.css';
import { SearchBar } from '../header-buttons/SearchBar';
import { ExpandHeader } from '../header-buttons/ExpandHeader'

export function TitleSearchContainer({ onToggleTitleSearch, activeSearch, expand, setExpand }) {

  return (
    <div className="title-search-container">
      <SearchBar
        placeholder='Search Title'
        value={activeSearch}
        onToggleSearch={onToggleTitleSearch}
        type="title"
      />
      <ExpandHeader expand={expand} setExpand={setExpand} />
    </div>
  );
};

