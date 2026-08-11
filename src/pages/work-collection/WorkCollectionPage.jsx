import { PageShell } from '../../util/page-layout/PageShell';
import { AysncContent } from '../../util/page-layout/AsyncContent';
import { LazyWorkCollectionPageBody } from '../../util/page-layout/lazyPage';
import { useParams } from 'react-router';
import content from '../../content/content';
 
export function WorkCollectionPage({ sidebarProps, headerProps, filteredNavItems, }){
  const workType = 'works';
  const { workId, collectionId } = useParams();
  const work = Object.values(content.works).find(
    (item) => item.id === workId
  );
  const collection = Object.values(work.collections).find(
    (item) => item.id === collectionId
  );

  return (
    <PageShell headerProps={headerProps} sidebarProps={sidebarProps}>
      <AysncContent>
        <LazyWorkCollectionPageBody 
          filteredNavItems={filteredNavItems}
          work={work} 
          collection={collection} 
          workId={workId}
          workType={workType}
        />
      </AysncContent>
    </PageShell>
  )
};