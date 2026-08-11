import './WorkExpandedDescription.css';
import { formatText } from '../../../util/formatText';

export function WorkExpandedDescription({ descExp }){
  return(
    <div className="expanded-description">
      {formatText(descExp)}
    </div>
  )
}