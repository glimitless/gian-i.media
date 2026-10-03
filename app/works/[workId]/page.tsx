import WorkOverviewContainer from '@/components/work/work-overview-container';
import { notFound } from 'next/navigation';
import { findArchiveIDRecord } from '@/lib/archive/archive-ids';
import { findArchiveWorkRecord } from '@/lib/archive/archive-works';
import WorkExpandedDescription from '@/components/work/work-expanded-description';
import WorkCollectionsGrid from '@/components/work/work-collections-grid';
import ThumbnailNav from '@/components/thumbnail-nav/thumbnail-nav';

type WorkPageProps = {
  params: Promise< {workId:string }>
}

export default async function WorkPage({ params }:WorkPageProps){
  const type = 'works';
  const { workId } = await params;
  const archiveIDRecord = findArchiveIDRecord(workId, type);
  const work = findArchiveWorkRecord(workId);
  if(!archiveIDRecord || !work) notFound();
  
  
  return (
    <div className="three-column-page-container">
      <div className="three-column-page-grid">
        <div className="three-column-page-content-column">
          <div className="three-column-page-overview-container">
            <WorkOverviewContainer 
              title={archiveIDRecord.title} 
              tools={archiveIDRecord.tools}
              overview={work.content.description}
            />
          </div>
          <div className="three-column-page-media-container">
            <WorkCollectionsGrid 
              collections={work.content.collectionLinks} 
              workId={workId}
            />
            {work.content.descriptionEXP && 
              <WorkExpandedDescription descriptionEXP={work.content.descriptionEXP} />
            }
          </div>
        </div>
        <div className="three-column-page-navigation-column">
          <ThumbnailNav 
            groupParams={{title:archiveIDRecord.title, type:type, id:workId, thumbnailRecord:archiveIDRecord.thumbnail}} 
          />
        </div>
      </div>
    </div>
  )
}