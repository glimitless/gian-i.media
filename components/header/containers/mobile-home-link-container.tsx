import MobileHomeLink from '../buttons/mobile-home-link';
import { usePathname } from 'next/navigation';
import ExpandMobileFilter from '../buttons/expand-mobile-filter';

export default function MobileHomeLinkContainer(){
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="@min-[93.8em]/viewport:hidden flex flex-row gap-4 @min-[72.5em]/viewport:gap-0 min-w-0">
      <MobileHomeLink isHome={isHome} />
      {(isHome) && 
        <ExpandMobileFilter />
      }
    </div>
  );
} 