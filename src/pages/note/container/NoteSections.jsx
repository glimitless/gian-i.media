import { NoteSectionItem } from "./NoteSectionItem"

export function NoteSections({ sections, noteId, type }){
  return (
    <>
      {sections.map((section) => (
        <div className="note-block" key={section.id}>
          <h2>{section.title}</h2>
          {section.blocks.map((item) => (
            <NoteSectionItem 
              title={item.title} 
              date={item.date} 
              summary={item.summary}
              key={item.id}
              noteId={noteId}
              sectionId={section.id}
              blockId={item.id}
              type={type}
            />
          ))}
        </div>
      ))}
    </>
    
  )
}