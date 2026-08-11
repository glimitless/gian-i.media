import './NoteTextContainer.css';
import { formatText } from '../../../util/formatText';
import { NoteSections } from './NoteSections';

export function NoteTextContainer({ title, subtitle, overview, sections, noteId, type }){
  return (
    <div className="note-text-container">
      <div className="note-block">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
      <div className="note-block">
        <h2>Overview</h2>
        {formatText(overview)}
      </div>
      <NoteSections 
        sections={sections}
        noteId={noteId}
        type={type} 
      />
    </div>
  )
}