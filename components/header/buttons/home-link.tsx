import Link from "next/link";
import TempleIcon from '@/public/svg/icons/sidebar/gc_temple-icon.svg';

export default function HomeLink({isHome} : {isHome:boolean}){
  return (
    <Link
      className={`${isHome} && 'btn-template-active'} btn-template w-16 justify-center items-center shrink-0`}
      href="/"
    >
      <TempleIcon className="w-10 h-auto shrink-0 text-lmSecondary dark:text-dmSecondary color-transition" />
    </Link>
  )
}