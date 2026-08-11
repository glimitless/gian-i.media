import { PageShell } from '../../util/page-layout/PageShell';
import { AysncContent } from '../../util/page-layout/AsyncContent';
import { LazyNoteSectionPageBody } from '../../util/page-layout/lazyPage';
import { useParams } from 'react-router';
import content from '../../content/content';

export function NoteSectionPage({ sidebarProps, headerProps, filteredNavItems }){
  const type = 'notes';
  const { noteId, sectionId, blockId } = useParams();
  const note = Object.values(content.notes).find(
    (item) => item.id === noteId
  );
  const section = note.sections.find(
    (item) => item.id === sectionId
  )
  const sectionIndex = note.sections.findIndex((item) => item.id === sectionId);
  const previousSection =
    sectionIndex > 0 ? note.sections[sectionIndex - 1] : null;
  const nextSection =
    sectionIndex >= 0 && sectionIndex < note.sections.length - 1
      ? note.sections[sectionIndex + 1]
      : null;

  return (
    <PageShell sidebarProps={sidebarProps} headerProps={headerProps}>
      <AysncContent>
        <LazyNoteSectionPageBody 
          note={note}
          noteId={noteId}
          section={section}
          sectionId={sectionId}
          blockId={blockId}
          type={type}
          filteredNavItems={filteredNavItems}
          prevSectionId={previousSection ? previousSection.id : null}
          nextSectionId={nextSection ? nextSection.id : null}
        />
      </AysncContent>
    </PageShell>
  )
}