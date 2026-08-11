import './WorkCollectionTextContainer.css';
import { formatText } from '../../../util/formatText';

export function WorkCollectionTextContainer({ workTitle, collectionTitle, collectionMedium, collectionDesc }){
  return (
    <div className="work-collection-text-container">
      <div className="title-container">
        <h1>{collectionTitle}</h1>
        
        <h3>{collectionMedium}</h3>
        <h3>{workTitle}</h3>
      </div>
      {formatText(collectionDesc)}
    </div>
  )
}