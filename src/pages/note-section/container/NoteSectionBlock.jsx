import './NoteSectionBlock.css';
import { formatDate } from "../../../util/formatDate";
import { RenderBlockItems } from '../../../util/RenderBlockItems';

export function NoteSectionBlock({ id, title, date, items }){
  return (
    <div className="note-section-block" section-block-id={id} >
      <div className="block-title-container">
        <h2>{title}</h2>
        <h3>{formatDate(date)}</h3>
      </div>
      <RenderBlockItems items={items} />
    </div>
  )
}