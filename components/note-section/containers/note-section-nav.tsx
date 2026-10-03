import type { GroupIdArgs, IndividualIdArgs } from "@/types/archive"
import NoteSectionNavButton from "../buttons/note-section-nav-button";

export default function NoteSectionNav(
  {noteId, previousSectionId, nextSectionId}
  : {
    noteId: GroupIdArgs;
    previousSectionId: (IndividualIdArgs | undefined);
    nextSectionId: (IndividualIdArgs | undefined);
  }
){
  
  const both = previousSectionId !== undefined && nextSectionId !== undefined;
  const prevOnly = previousSectionId !== undefined && nextSectionId === undefined;
  const nextOnly = previousSectionId === undefined && nextSectionId !== undefined;

  if(both || prevOnly || nextOnly){
    return (
      <div
        className={`flex flex-row p-[0.4rem] ${both && 'justify-between'} ${prevOnly && 'justify-start'} ${nextOnly && 'justify-end'}`}
      >
        {previousSectionId && 
          <NoteSectionNavButton 
            variantProps={{
              type: 'prev',
              noteId: noteId,
              sectionId: previousSectionId,
            }} 
          />
        }
        {nextSectionId && 
          <NoteSectionNavButton 
            variantProps={{
              type: 'next',
              noteId: noteId,
              sectionId: nextSectionId,
            }} 
          />
        }
      </div>
    )
  }else{
    return (
      <></>
    )
  }
  
}