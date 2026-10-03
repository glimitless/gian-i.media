import type { ContentBlockArgs } from '@/types/content-body';
import renderContentBody from '@/lib/content-array/render-content-body';
import { GroupIdArgs, NoteSectionRecord } from '@/types/archive';
import NoteSections from './containers/note-sections';

export default function NotePageBody(
  { title, subtitle, overview, sections, noteId}
  : {
    title: string,
    subtitle: string,
    overview: ContentBlockArgs[][],
    sections: NoteSectionRecord[],
    noteId: GroupIdArgs,
  }
){
  return (
    <div
      className="block-page-body"
    >
      <div className="block-page-title-container variant-1">
        <div>
          <h1>{title}</h1>
          <h3>{subtitle}</h3>
        </div>
      </div>
      <div className="block-page-content-container variant-1">
        <div>
          <h2 className="block-header">Overview</h2>
          {renderContentBody(overview)}
        </div>
        <NoteSections 
          sections={sections} 
          noteId={noteId} 
        />
      </div>
      
    </div>
  )
}