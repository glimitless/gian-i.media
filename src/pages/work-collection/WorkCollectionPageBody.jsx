import { ThumbnailNav } from '../../components/thumbnail-nav/ThumbnailNav';
import { WorkCollectionTextContainer } from './container/WorkCollectionTextContainer';
import { RenderMedia } from '../../util/RenderMedia';
import { useRef, useLayoutEffect } from 'react';
import { pageContentScroll } from '../../util/autoScroll';

export function WorkCollectionPageBody({ work, filteredNavItems, workId, collection, workType }){
  const collectionNavItems = work.collections.map(({ thumbnailSmall, id }) => ({
    thumbnailSmall,
    id,
  }));

  const pageContentRef = useRef(null);
  const textColumnRef = useRef(null);
  const collectionsColumnRef = useRef(null);
  useLayoutEffect(() => {
    pageContentScroll(
      pageContentRef.current, textColumnRef.current,
      collectionsColumnRef.current,
    );
  }, [workId, collection.id]);


  return (
    <div className="three-column-page-container">
      <div className="content-grid">
        <div className="content-grid-column page-content" ref={pageContentRef}>
          <div className='page-content-column text' ref={textColumnRef}>
            <WorkCollectionTextContainer 
              workTitle={work.title}
              collectionTitle={collection.title}
              collectionMedium={collection.medium}
              collectionDesc={collection.desc}
            />
          </div>
          <div className='page-content-column collections' ref={collectionsColumnRef}>
            <RenderMedia media={collection.media} />
          </div>
        </div>
        <div className="content-grid-column navigation">
          <ThumbnailNav 
            activeThumbnail={work.thumbnail}
            activeAncestorId={workId}
            activeCollectionId={collection.id}
            activeCollectionThumbnail={collection.thumbnailSmall}
            activeType={workType}
            filteredNavItems={filteredNavItems}
            collectionNavItems={collectionNavItems}
          />
        </div>
      </div>
    </div>
  )
}