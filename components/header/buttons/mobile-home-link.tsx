import Link from 'next/link';
import TempleIcon from '@/assets/svg/icons/sidebar/gc_temple-icon.svg';
import type { MouseEvent } from 'react';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';

export default function MobileHomeLink({isHome}:{isHome:boolean}){
  const { scrollMainToTop } = useHeaderContext();

  function onClick(event:MouseEvent<HTMLAnchorElement>){
    if(isHome){
      event.preventDefault();
      scrollMainToTop();
    }
  }

  return (
    <Link
      className={`btn-template ${isHome && 'btn-template-active'} w-16 justify-center`}
      href="/"
      onClick={(event) => onClick(event)}
    >
      <TempleIcon className="w-10" />
    </Link>
  )
}