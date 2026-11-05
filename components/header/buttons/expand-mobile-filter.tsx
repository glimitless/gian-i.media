import DownArrowhead from '@/public/svg/icons/header/down-arrowhead.svg';

export default function ExpandMobileFilter(){
  return (
    <button
      className="btn-template btn-template-transition w-16 flex flex-row justify-center @min-[72.5em]/viewport:hidden"
    >
      <DownArrowhead 
        className={'w-6 h-auto down-arrowhead-transition rotate-0'} 
      />
    </button>
  )
}