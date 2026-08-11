import './NoteSectionNav.css';
import { NoteSectionNavButton } from '../button/NoteSectionNavButton';

export function NoteSectionNav({ type, noteId, prevSectionId, nextSectionId }){

  if(prevSectionId && nextSectionId){
    return (
      <div className="nav-block both-directions">
        <NoteSectionNavButton 
          prev
          type={type}
          noteId={noteId}
          sectionId={prevSectionId}
        />
        <NoteSectionNavButton 
          next
          type={type}
          noteId={noteId}
          sectionId={nextSectionId}
        />
      </div>
    )
  }
  else if(prevSectionId && !nextSectionId){
    return (
      <div className="nav-block previous-only">
        <NoteSectionNavButton 
          prev
          type={type}
          noteId={noteId}
          sectionId={prevSectionId}
        />
     </div>
    )
    
  }
  else if(!prevSectionId && nextSectionId){
    return (
      <div className="nav-block next-only">
        <NoteSectionNavButton 
          next
          type={type}
          noteId={noteId}
          sectionId={nextSectionId}
        />
     </div>
    )
  }
  else{
    return null;
  }
  
    
}