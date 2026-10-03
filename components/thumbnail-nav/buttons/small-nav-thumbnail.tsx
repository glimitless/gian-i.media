import { GroupIdArgs } from '@/types/archive';
import { TypeArgs } from '@/types/filter';
import { SvgIcon } from '@/types/svg';
import Link from 'next/link';

export default function SmallNavThumbnail(
  {active, thumbnail, title, id, type} 
  : {active:boolean, thumbnail:SvgIcon, title:string, id:GroupIdArgs, type:TypeArgs}
){
  const Icon = thumbnail;

  return (
    <Link
      href={`/${type}/${id}`}
      aria-label={title}
      aria-current={active ? 'page' : undefined}
      className={`group w-16 h-16 flex items-center shrink-0 justify-center p-[0.15rem] bcvg-transition ${active ? 'bg-lmMedium dark:bg-dmMedium cursor-default' : 'bg-lmSurface dark:bg-dmSurface hover:bg-lmBgActive dark:hover:bg-dmBgActive'}`}
    >
      <Icon 
        aria-hidden
        className={`w-full h-auto thumbnail-svg-transition ${active ? 'text-lmBg dark:text-dmBg' : 'text-lmSecondary dark:text-dmSecondary group-hover:hover-scale group-hover:text-lmSecondaryActive group-hover:dark:text-dmSecondaryActive'}`} 
      />
    </Link>
  )
}