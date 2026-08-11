import './SmallThumbnail.css';
import { Link } from 'react-router';

export function SmallThumbnail({ 
  thumbnail: Thumbnail, 
  id, 
  activeId, 
  activeType,
  type,
  isActive = false, 
}){
  
  if(id === activeId && isActive){
    return(
      <Link to={`/${activeType}/${activeId}`} className="thumbnail is-active">
        <Thumbnail/>
      </Link>
    )
  }else if(id === activeId && !isActive){
    return null;
  }else{
    return(
      <Link to={`/${type}/${id}`} className="thumbnail">
        <Thumbnail/>
      </Link>
    )
  }
}