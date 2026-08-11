import './SidebarButton.css';

export function SidebarButton({ 
  TempleIcon = null,
  WorksIcon = null,
  NotebookIcon = null,
  AboutIcon = null,
  isWorksResultsPage,
  isWorkPage,
  isNotesResultsPage,
  isNotePage,
  isAboutPage,
  sidebarState,
  onClick,
}) {
  if (TempleIcon) {
    return (
      <button 
        className={`sidebar-button temple-icon sidebar-square ${sidebarState==='expanded' ? 'is-active-square' : ''}`} 
        onClick={onClick}
      >
        <TempleIcon aria-label="Enter Temple"/>
      </button>
    );
  }
  if (WorksIcon) {
    return (
      <button 
        className={`sidebar-button works-icon sidebar-expand ${isWorksResultsPage || isWorkPage ? 'is-active' : ''}`}
        onClick={onClick}
      >
        <WorksIcon aria-label="Works"/>
        <p className="sidebar-text">Works</p>
      </button>
    );
  }
  if (NotebookIcon) {
    return (
      <button 
        className={`sidebar-button notebook-icon sidebar-expand  ${isNotesResultsPage || isNotePage ? 'is-active' : ''}`}
        onClick={onClick}
      >
        <NotebookIcon aria-label="Notebook" />
        <p className="sidebar-text">Notes</p>
      </button>
    );
  }
  if (AboutIcon) {
    return (
      <button 
        className={`sidebar-button about-icon sidebar-expand ${isAboutPage ? 'is-active' : ''}`}
        onClick={onClick}
      >
        <AboutIcon aria-label="About" />
        <p className="sidebar-text">About</p>
      </button>
    );
  }
  return <button className="sidebar-button" />;
}