import './LargeThumbnail.css';
import { Link } from 'react-router';

export function LargeThumbnail({
  thumbnail,
  id,
  activeCollectionId,
  activeType,
  activeAncestorId,
  isActive = false,
}){
  if(id === activeCollectionId && isActive){
    return(
      <Link to={`/${activeType}/${activeAncestorId}/${activeCollectionId}`} className="thumbnail is-active">
        <img src={thumbnail}/>
        <span className="thumbnail-overlay" aria-hidden="true" />
      </Link>
    )
  }else if (id === activeCollectionId && !isActive){
    return null;
  }else{
    return (
      <Link to={`/${activeType}/${activeAncestorId}/${id}`} className="thumbnail">
        <img src={thumbnail}/>
        <span className="thumbnail-overlay" aria-hidden="true" />
      </Link>
    )
  }
}