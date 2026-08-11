import './ThumbnailNav.css';
import { SmallThumbnail } from './SmallThumbnail';
import { LargeThumbnail } from './LargeThumbnail';
import { useIsBelowMobileBreakpoint } from '../../util/useMediaQuery';

export function ThumbnailNav({
  activeThumbnail,
  activeAncestorId,
  activeCollectionId,
  activeCollectionThumbnail,
  activeType,
  filteredNavItems,
  collectionNavItems = [],
  noActive = false,
}) {
  const isBelowMobile = useIsBelowMobileBreakpoint();

  return (
    <div className="thumbnail-nav">
      {!isBelowMobile &&
        <>
          <div className="large-nav-thumbnails">
            {collectionNavItems.length > 0 && (
              <LargeThumbnail
                thumbnail={activeCollectionThumbnail}
                id={activeCollectionId}
                activeCollectionId={activeCollectionId}
                activeAncestorId={activeAncestorId}
                activeType={activeType}
                isActive
              />
            )}
            <div className="inactive-thumbnails">
              {collectionNavItems.map((item) => (
                <LargeThumbnail
                  thumbnail={item.thumbnailSmall}
                  id={item.id}
                  activeCollectionId={activeCollectionId}
                  activeAncestorId={activeAncestorId}
                  activeType={activeType}
                  key={item.id}
                />
              ))}
            </div>
          </div>
          <div className="small-nav-thumbnails">
            {!noActive &&
              <SmallThumbnail
                id={activeAncestorId}
                activeId={activeAncestorId}
                activeType={activeType}
                thumbnail={activeThumbnail}
                isActive
              />
            }
            <div className="inactive-thumbnails">
              {filteredNavItems.map((item) => (
                <SmallThumbnail
                  id={item.id}
                  activeId={activeAncestorId}
                  activeType={activeType}
                  thumbnail={item.thumbnail}
                  type={item.type}
                  key={item.id} />
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
}