import { WorkTextContainer } from './containers/WorkTextContainer';
import { CollectionsGrid } from '../../components/collections-grid/CollectionsGrid';
import { ThumbnailNav } from '../../components/thumbnail-nav/ThumbnailNav';
import { WorkExpandedDescription } from './containers/WorkExpandedDescription';
import { useLayoutEffect, useRef } from 'react';
import { pageContentScroll } from '../../util/autoScroll.js';

export function WorkPageBody({ work, filteredNavItems, id, type }){

  const pageContentRef = useRef(null);
  const textColumnRef = useRef(null);
  const collectionsColumnRef = useRef(null);
  useLayoutEffect(() => {
    pageContentScroll(
      pageContentRef.current, textColumnRef.current,
      collectionsColumnRef.current,
    );
  }, [id]);

  return (
    <div className="three-column-page-container">
      <div className="content-grid">
        <div className="content-grid-column page-content" ref={pageContentRef}>
          <div className='page-content-column text' ref={textColumnRef}>
            <WorkTextContainer 
              title={work.title} 
              tools={work.tools} 
              desc={work.desc} 
            />
          </div>
          <div className='page-content-column collections' ref={collectionsColumnRef}>
            <CollectionsGrid 
              collections={work.collections} 
              id={id}
              type={type}
            />
            {work.descExp.length > 0 && 
              <WorkExpandedDescription descExp={work.descExp} />
            }
          </div>
        </div>
        <div className="content-grid-column navigation">
          <ThumbnailNav 
            activeThumbnail={work.thumbnail}
            activeAncestorId={id}
            activeType={type}
            filteredNavItems={filteredNavItems}
          />
        </div>
      </div>
    </div>
  )
}