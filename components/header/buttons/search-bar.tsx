import SearchIcon from '@/assets/svg/icons/header/search-icon.svg';
import type { SearchQueryArgs, TagArgs, TagTypeArgs } from '@/types/filter';
import type { ChangeEvent, KeyboardEvent } from 'react';

type VariantProps = (
  {
    type: 'title'
  } | {
    type: 'tag',
    activeTagType: TagTypeArgs,
  }
);

export default function SearchBar(
  { 
    variantProps, value, setValue 
  } : {
    variantProps:VariantProps,
    value:(SearchQueryArgs | TagArgs), 
    setValue: ((searchQuery: SearchQueryArgs) => void | React.Dispatch<React.SetStateAction<TagArgs>>)}
){
  let width:string;
  let placeholder:string;
  switch (variantProps.type) {
      case 'title':
        width='w-80 @min-[69em]/viewport:w-96 @min-[99em]/viewport:w-112';
        placeholder='Search title';
        break;
      case 'tag':
        width='w-80';
        placeholder=`Search ${variantProps.activeTagType === 'all' ? 'keywords & tools' : variantProps.activeTagType}`;
        break;
      default:
        width='w-128';
        placeholder=`Search title`;
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