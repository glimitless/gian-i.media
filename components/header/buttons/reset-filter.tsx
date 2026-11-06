import ResetIcon from '@/public/svg/icons/header/reset.svg'

export default function ResetFilter({ resetFilter } : { resetFilter: () => void }){
  return (
    <button
      className="btn-template btn-template-transition w-16 justify-center"
      onClick={resetFilter}
    >
      <ResetIcon className="w-[1.55rem]" />
    </button>
  )
}