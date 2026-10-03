import type { WorkCollectionLink, GroupIdArgs } from '@/types/archive';
import WorkCollectionsGridItem from './work-collections-grid-item';

export default function WorkCollectionsGrid({collections, workId} : {collections:WorkCollectionLink[], workId:GroupIdArgs}){
  return (
    <div
      className="w-full grid grid-rows auto grid-cols-1 gap-y-16 @min-[76em]/main:grid-cols-2 @min-[76em]/main:gap-x-16"
    >
      {collections.map((item) => (
        <WorkCollectionsGridItem 
          key={item.id}
          thumbnail={item.thumbnail}
          alt={item.alt}
          workId={workId}
          collectionId={item.id}
          title={item.title}
          medium={item.medium}
        />
      ))}
    </div>
  )
}