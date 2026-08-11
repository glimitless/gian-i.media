import { PageShell } from '../../util/page-layout/PageShell.jsx';
import { AysncContent } from '../../util/page-layout/AsyncContent.jsx';
import { LazyWorkPageBody } from '../../util/page-layout/lazyPage.js';
import { useParams } from 'react-router';
import content from '../../content/content.js';

export function WorkPage({ headerProps, sidebarProps, filteredNavItems, }) {
  const type = 'works';
  const { workId } = useParams();
  const work = Object.values(content.works).find(
    (item) => item.id === workId
  );

  return (
    <div className="viewport">
      <PageShell headerProps={headerProps} sidebarProps={sidebarProps}>
        <AysncContent>
          <LazyWorkPageBody
            work={work} 
            filteredNavItems={filteredNavItems} 
            id={workId}
            type={type}
          />
        </AysncContent>
      </PageShell>
    </div>
  );
}
