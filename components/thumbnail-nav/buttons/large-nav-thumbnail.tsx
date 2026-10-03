import Link from 'next/link';
import Image from 'next/image';
import type { GroupIdArgs, IndividualIdArgs } from '@/types/archive';

export default function LargeNavThumbnail(
  {active, thumbnail, title, alt, workId, collectionId} :
  {
    active:boolean, 
    thumbnail:string, 
    alt:string, 
    title:string,
    workId:GroupIdArgs, 
    collectionId:IndividualIdArgs
  }
){
  return (
    <Link
      aria-label={title}
      aria-current={active ? "page" : undefined}
      href={`/works/${workId}/${collectionId}`}
      className={`group shrink-0 flex w-32 h-32 items-center justify-center p-0 relative bg-lmSurface dark:bg-dmSurface bcvg-transition ${active && 'cursor-default'}`}
    >
      <Image 
        className="w-32 h-32"
        src={`/images/${thumbnail}`}
        width={80}
        height={80}
        alt={alt}
      />
      <span 
        className={`absolute inset-0 bg-lmSurface dark:bg-dmSurface pointer-events-none img-thumbnail-transition ${active ? 'opacity-24' : 'opacity-78 group-hover:opacity-41'} `}
      />
    </Link>
  )
}