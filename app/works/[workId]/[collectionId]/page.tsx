import ThumbnailNav from '@/components/thumbnail-nav/thumbnail-nav';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { GroupIdArgs, IndividualIdArgs } from '@/types/archive';
import { notFound } from 'next/navigation';
import { findArchiveWorkRecord, findArchiveWorkCollectionContent } from '@/lib/archive/archive-works';
import WorkCollectionOverviewContainer from '@/components/work-collection/work-collection-overview-container';
import renderContentBody from '@/lib/content-array/render-content-body';

type WorkCollectionPageProps = {
  params: Promise<{workId:GroupIdArgs, collectionId:IndividualIdArgs}>
}

export default async function WorkCollectionPage({ params }:WorkCollectionPageProps){
  const type = 'works';
  const { workId, collectionId } = await params;

  const archiveIDRecord = findArchiveIDRecord(workId, type);
  const archiveWorkRecord = findArchiveWorkRecord(workId);
  if(!archiveIDRecord || !archiveWorkRecord) notFound();

  const archiveWorkCollectionLink = archiveWorkRecord.content.collectionLinks.find(
    (link) => link.id === collectionId
  );
  if(!archiveWorkCollectionLink) notFound();
  
  const archiveWorkCollectionContent = findArchiveWorkCollectionContent(workId, collectionId);
  if(!archiveWorkCollectionContent) notFound();

  return (
    <div className="three-column-page-container">
      <div className="three-column-page-grid">
        <div className="three-column-page-content-column">
        <div className="three-column-page-overview-container">
          <WorkCollectionOverviewContainer
            collectionTitle={archiveWorkCollectionLink.title}
            workTitle={archiveIDRecord.title}
            medium={archiveWorkCollectionLink.medium}
            overview={archiveWorkCollectionContent.content.description}
          />
        </div>
        <div className="three-column-page-media-container space-y-15">
          {renderContentBody(archiveWorkCollectionContent.content.items)}
        </div>
        </div>
        <div className="three-column-page-navigation-column">
          <ThumbnailNav
            groupParams={
              {
                type: type, 
                id: workId, 
                title: archiveIDRecord.title,
                thumbnailRecord: archiveIDRecord.thumbnail
              }
            } 
            individualParams={
              {
                id:collectionId, 
                collectionLinks:archiveWorkRecord.content.collectionLinks,
                title: archiveWorkCollectionLink.title, 
                thumbnailRecord:archiveWorkCollectionLink.thumbnail,
                thumbnailAlt:archiveWorkCollectionLink.alt
              }
            }
          />
        </div>
      </div>
    </div>
  )
}