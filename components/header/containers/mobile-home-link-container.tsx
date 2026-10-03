import MobileHomeLink from '../buttons/mobile-home-link';
import { usePathname } from 'next/navigation';
import NameWordmark from '@/assets/svg/icons/sidebar/gc_wordmark.svg';

export default function MobileHomeLinkContainer({isBelowMobile} : {isBelowMobile:boolean}){
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="flex flex-row gap-4 min-w-0">
      <MobileHomeLink isHome={isHome} />
      {(isHome && isBelowMobile) && 
        <div className="flex flex-row w-auto items-center justify-center">
          <NameWordmark className="h-[1.53rem] w-auto shrink-0 text-lmSecondary dark:text-dmSecondary color-transition" />
        </div>
      }
    </div>
  );
} 