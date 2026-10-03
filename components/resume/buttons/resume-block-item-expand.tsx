import DownArrowhead from '@/assets/svg/icons/header/up-arrowhead.svg';

export default function ResumeBlockItemExpand(
  {name, institution, date, location, isItemExpanded, setIsItemExpanded}
  : {
    name:string;
    institution:string;
    date:string;
    location:string;
    isItemExpanded:boolean;
    setIsItemExpanded:React.Dispatch<React.SetStateAction<boolean>>;
  }
){
  return (
    <button
      type="button"
      aria-expanded={isItemExpanded}
      className="info-expand-btn-template"
      onClick={() => setIsItemExpanded(!isItemExpanded)}
    >
      <div 
        className="info-expand-btn-template-svg-container"
      >
        <DownArrowhead 
          className={`info-expand-btn-template-svg ${isItemExpanded ? 'rotate-0' : 'rotate-180'}`}
        />
      </div>
      <div className="text-left flex-1">
        <p>{name} | {institution}</p>
        <h3>{date} | {location}</h3>
      </div>
    </button>
  )
}