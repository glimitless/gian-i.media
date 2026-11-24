import Link from 'next/link';
import Image from 'next/image';
import type { WorkWorkCollectionLinkThumbnail, GroupIdArgs, IndividualIdArgs } from '@/types/archive';
import mediaURL from '@/lib/media-url/media-url';

export default function WorkCollectionsGridItem(
  { thumbnail, alt, workId, collectionId, title, medium} 
  : { 
    thumbnail:WorkWorkCollectionLinkThumbnail,
    alt:string;
    workId:GroupIdArgs,
    collectionId:IndividualIdArgs,
    title: string,
    medium: string,
  }
){
  return (
    <div className="block w-full">
      <Link
        aria-label={title}
        href={`/archive/works/${workId}/${collectionId}`}
        className="block aspect-square w-full h-auto p-0 bg-lmSurface dark:bg-dmSurface img-thumbnail-transition img-thumbnail-hover"
      >
        <Image 
          className="w-full h-auto"
          src={mediaURL(thumbnail, 'image')}
          alt={alt}
          width={0}
          height={0}
        />
      </Link>
      <p className="mt-3 mb-0">{title}</p>
      <h3>{medium}</h3>
    </div>
  )
}