"use client";

import { useMediaQueryContext } from '@/lib/navigator/navigator-provider';
import { WorkCollectionLink, GroupIdArgs, IndividualIdArgs } from '@/types/archive';
import { ContentTypeArgs } from '@/types/filter';
import { useFilterContext } from '@/lib/filter/filter-provider';
import SmallNavThumbnail from './buttons/small-nav-thumbnail';
import LargeNavThumbnail from './buttons/large-nav-thumbnail';
import { thumbnailByFilename } from '@/lib/archive/thumbnails';

type GroupParams = {
  id: GroupIdArgs,
  title: string,
  thumbnailRecord: string,
  type: ContentTypeArgs,
}
type IndividualParams = {
  id: IndividualIdArgs,
  collectionLinks: WorkCollectionLink[],
  title: string,
  thumbnailRecord: string,
  thumbnailAlt:string,
}

export default function ThumbnailNav(
  { groupParams, individualParams }: { groupParams?: GroupParams, individualParams?: IndividualParams }
) {
  const { filteredArchiveIDs } = useFilterContext();
  const { isBelowMobile } = useMediaQueryContext();

  return (
    <nav className="grid grid-cols-[8rem_4rem] h-full min-h-0">
      {!isBelowMobile &&
        <>
          <div className="col-1 flex flex-col min-h-0 pt-5">
            {(groupParams && individualParams) &&
              <>
                <LargeNavThumbnail
                  active={true}
                  title={individualParams.title}
                  thumbnail={individualParams.thumbnailRecord}
                  alt={individualParams.thumbnailAlt}
                  workId={groupParams.id}
                  collectionId={individualParams.id}
                />
                <div className="block flex-1 min-height-0 overflow-scroll overscroll-y-contain scrollbar-none-webkit pb-5">
                  {individualParams.collectionLinks.map((collectionLink) => {
                    if (collectionLink.id !== individualParams.id) {
                      return (
                        <LargeNavThumbnail
                          key={collectionLink.id}
                          active={false}
                          title={collectionLink.title}
                          thumbnail={collectionLink.thumbnail}
                          alt={collectionLink.alt}
                          workId={groupParams.id}
                          collectionId={collectionLink.id}
                        />
                      )
                    }
                  })}
                </div>
              </>
            }
          </div>

          <div className="col-2 flex flex-col min-h-0 pt-5">
            {(groupParams) &&
              <SmallNavThumbnail
                active={true}
                thumbnail={thumbnailByFilename[groupParams.thumbnailRecord]}
                title={groupParams.title}
                type={groupParams.type}
                id={groupParams.id}
              />
            }
            <div className="block flex-1 min-height-0 overflow-scroll overscroll-y-contain scrollbar-none-webkit pb-5">
              {filteredArchiveIDs.map((ID) => {
                if (ID.id !== groupParams?.id) {
                  return <SmallNavThumbnail
                    key={ID.id}
                    active={false}
                    thumbnail={ID.thumbnail}
                    title={ID.title}
                    type={ID.type}
                    id={ID.id}
                  />
                }
              })}
            </div>
          </div>
        </>
      }
    </nav>
  )
}