import './NoteSectionNavButton.css';
import { Link } from 'react-router';

export function NoteSectionNavButton({
  prev = false,
  next = false,
  type,
  noteId,
  sectionId,
}){
  return (
    <div className="note-section-nav-button-container">
      {prev && <Link 
        className="note-section-nav-button"
        to={`/${type}/${noteId}/${sectionId}`}
      >
        ← Prev
      </Link>}
      {next && <Link 
        className="note-section-nav-button"
        to={`/${type}/${noteId}/${sectionId}`}
      >
        Next →
      </Link>}
    </div>
  )
    
}