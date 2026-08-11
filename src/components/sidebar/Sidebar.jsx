import './Sidebar.css';
import { SidebarButton } from '../sidebar-button/SidebarButton';
import WorksIcon from '../../assets/icons/sidebar/gc_works-icon.svg?react';
import NotebookIcon from '../../assets/icons/sidebar/gc_notebook-icon.svg?react';
import AboutIcon from '../../assets/icons/sidebar/gc_about-icon.svg?react';
import GCWordmark from '../../assets/icons/sidebar/gc_wordmark.svg?react';
import TempleIcon from '../../assets/icons/sidebar/gc_temple-icon.svg?react';
import { useNavigate, useMatch } from 'react-router';


export function Sidebar({ sidebarProps }){
  const navigate = useNavigate();
  const isWorksResultsPage = useMatch('/') && sidebarProps.contentType==='Works';
  const isWorkPage = useMatch({ path: '/works', end:false });
  const isNotesResultsPage = useMatch('/') && sidebarProps.contentType==='Notes';
  const isNotePage = useMatch({ path: '/notes', end:false });
  const isAboutPage = useMatch('/about');

  const templeOnClick = () => {
    sidebarProps.sidebarState === 'hidden' ? sidebarProps.setSidebarState('expanded') : sidebarProps.setSidebarState('hidden');
  }
  const worksOnClick = () => {
    sidebarProps.onToggleContentType('Works');
    navigate('/');
  }
  const notesOnClick = () => {
    sidebarProps.onToggleContentType('Notes');
    navigate('/');
  }
  const aboutOnClick = () => {
    navigate('/about');
  }

  return (
    <div className={`sidebar ${sidebarProps.sidebarState}`}>
      <div className='temple-button-container'>
        <SidebarButton 
          TempleIcon={TempleIcon} 
          sidebarState={sidebarProps.sidebarState}
          onClick={templeOnClick} 
        />
        <div className="name-wordmark-container">
          <GCWordmark aria-label="Gian Cambridge" />
        </div>
      </div>
      
      <div className="center-buttons-container">
        <SidebarButton 
          WorksIcon={WorksIcon} 
          isWorksResultsPage={isWorksResultsPage}
          isWorkPage={isWorkPage}
          onClick={worksOnClick}
        />
        <SidebarButton 
          NotebookIcon={NotebookIcon}
          isNotesResultsPage={isNotesResultsPage}
          isNotePage={isNotePage}
          onClick={notesOnClick}
        />
      </div>

      <SidebarButton 
        AboutIcon={AboutIcon} 
        isAboutPage={isAboutPage}
        onClick={aboutOnClick}
      />
    </div>
  )
}