import './CollectionsGrid.css';
import { CollectionsGridItem } from './CollectionsGridItem';

export function CollectionsGrid({ collections, id, type }){
  return (
    <div className="collections-grid">
      {collections.map((collection) => (
        <CollectionsGridItem 
          thumbnail={collection.thumbnailLarge} 
          collectionId={collection.id}
          key={collection.id}
          title={collection.title}
          medium={collection.medium}
          id={id}
          type={type}
          date={collection.date}
        />
      ))}
    </div>
  )
}