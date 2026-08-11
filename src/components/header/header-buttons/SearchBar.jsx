import './SearchBar.css';
import SearchIcon from '../../../assets/icons/header/search-icon.svg?react';

export function SearchBar({ placeholder, value, onToggleSearch, type }) {

  function onChange(event) {
    onToggleSearch(event.target.value);
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      event.target.blur();
    }
  }

  return (
    <div className={`search-bar ${type}`}>
      <span className="search-bar-icon" aria-hidden="true">
        <SearchIcon />
      </span>
      <label className="search-bar-field">
        <input
          className="search-bar-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>

  )

}

