import type { KeywordArgs } from '@/types/filter';
import PlusIcon from '@/assets/svg/icons/header/plus.svg';

export default function InactiveKeyword(
  {keyword, onToggleKeyword}
  : {
    keyword:KeywordArgs,
    onToggleKeyword: (keyword: KeywordArgs) => void,
  }
){
  function onClick(){
    onToggleKeyword(keyword);
  }

  return (
    <button 
      className="btn-template whitespace-nowrap px-4 gap-2"
      onClick={onClick}
    >
      <PlusIcon className="w-[0.6rem] text-lmSecondary dark:text-dmSecondary color-transition"/>
      {keyword}
    </button>
  )
}