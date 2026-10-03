import SearchIcon from '@/assets/svg/icons/header/search-icon.svg';
import type { SearchQueryArgs, KeywordArgs } from '@/types/filter';
import type { ChangeEvent, KeyboardEvent } from 'react';

export default function SearchBar(
  { 
    type, value, setValue 
  } : {
    type:('title' | 'keyword'), 
    value:(SearchQueryArgs | KeywordArgs), 
    setValue: ((searchQuery: SearchQueryArgs) => void | React.Dispatch<React.SetStateAction<KeywordArgs>>)}
){
  let width:string;
  let placeholder:string;
  switch (type) {
      case 'title':
        width='w-96 @min-[78.5em]/content:w-128';
        placeholder='Search Title';
        break;
      case 'keyword':
        width='w-80';
        placeholder='Search Keywords';
        break;
      default:
        width='w-128';
        placeholder='Search Title';
        break;
  }

  function onChange(event: ChangeEvent<HTMLInputElement>){
    setValue(event.target.value);
  }
  function onKeyDown (event: KeyboardEvent<HTMLInputElement>){
    if(event.key === 'Escape'){
      event.currentTarget.blur();
    }
  }
  
  return (
    <div className={`search-bar btn-template justify-start ${width} gap-0`}>
      <label className="flex flex-1 min-w-0 h-full items-center pr-5">
        <span className="h-full flex items-center justify-center px-5 cursor-text">
          <SearchIcon className="h-[1.64rem] w-auto"/>
        </span>
        <input
          className="search-bar-template"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        >
        </input>
      </label>
    </div>
  )
}