import { EightDigitDate } from '@/types/archive';
import DownArrowhead from '@/assets/svg/icons/header/down-arrowhead.svg';
import formatDate from '@/lib/format-date/format-date';

export function NoteSectionBlockExpand(
  {title, date, isItemExpanded, setIsItemExpanded} 
  : {
    title:string; 
    date:EightDigitDate;
    isItemExpanded:boolean;
    setIsItemExpanded:React.Dispatch<React.SetStateAction<boolean>>
  }

){
  return (
    <button
      type="button"
      className="info-expand-btn-template"
      onClick={() => setIsItemExpanded(!isItemExpanded)}
    >
      <div className="info-expand-btn-template-svg-container">
        <DownArrowhead className={`info-expand-btn-template-svg ${isItemExpanded ? 'rotate-0' : 'rotate-180'}`} />
      </div>
      <div className="info-expand-btn-template-text-container">
        <p>{title}</p>
        <h3>{formatDate(date)}</h3>
      </div>
    </button>
  )
}