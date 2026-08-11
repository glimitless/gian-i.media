import './NoteSectionItemReadLink.css';
import { Link } from 'react-router';

export function NoteSectionItemReadLink({
  noteId, sectionId, blockId, type,
}){
  return (
    <div className="read-link-container">
      <Link 
        to={`/${type}/${noteId}/${sectionId}/${blockId}`}
        className="read-link"
      >
        Read
      </Link>
    </div>
    
  )
}