import './CollectionsGridItem.css';
import { Link } from 'react-router';

export function CollectionsGridItem({ 
  thumbnail, title, medium,
  id, type, collectionId,
}){
  return (
    <div className='collections-grid-item'>
      <Link to={`/${type}/${id}/${collectionId}`} className='collection-item-thumbnail'>
        <img src={thumbnail}></img>
      </Link>
      <p className='collection-item-name'>{title}</p>
      <h3>{medium}</h3>
    </div>
  )
}