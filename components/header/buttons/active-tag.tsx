import type { TagArgs } from '@/types/filter';
import Checkmark from '@/assets/svg/icons/header/checkmark.svg';
import X from '@/assets/svg/icons/header/x.svg';

export default function ActiveTag(
  { keyword, onToggleTag }
  : {
    keyword:TagArgs,
    onToggleTag: (keyword: TagArgs) => void,
  }
){
  function onClick(){
    onToggleTag(keyword);
  }

  return (
    <button 
      className="group btn-template cursor-pointer btn-template-active whitespace-nowrap px-4 gap-2"
      onClick={onClick}
    >
      <span className="relative w-[0.9rem] h-[0.9rem] inline-flex items-center justify-center">
        <Checkmark className="absolute w-[0.8rem] text-lmSecondary dark:text-dmSecondary check-x-transition opacity-100 group-hover:opacity-0 pointer-events-none" />
        <X className="absolute w-3 text-lmSecondary dark:text-dmSecondary check-x-transition opacity-0 group-hover:opacity-100 pointer-events-none"/>
      </span>
      
      {keyword}
    </button>
  )
}