import { PageShell } from '../../util/page-layout/PageShell.jsx';
import { AysncContent } from '../../util/page-layout/AsyncContent.jsx';
import { LazyNotePageBody } from '../../util/page-layout/lazyPage.js';
import { useParams } from 'react-router';
import content from '../../content/content.js';

export function NotePage({ sidebarProps, headerProps, filteredNavItems }) {
  const type = 'notes';
  const { noteId } = useParams();
  const note = Object.values(content.notes).find(
    (item) => item.id === noteId
  );

  return (
    <PageShell headerProps={headerProps} sidebarProps={sidebarProps}>
      <AysncContent>
        <LazyNotePageBody
          note={note}
          filteredNavItems={filteredNavItems}
          noteId={noteId}
          type={type}
        />
      </AysncContent>
    </PageShell>
  );
}
