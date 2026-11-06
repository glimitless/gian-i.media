import MobileHomeLink from '../buttons/mobile-home-link';
import { usePathname } from 'next/navigation';
import ExpandMobileFilter from '../buttons/expand-mobile-filter';
import { useFilterContext } from '@/lib/filter/filter-provider';
import ResetFilter from '../buttons/reset-filter';
import { useMediaQueryContext } from '@/lib/navigator/navigator-provider';

export default function MobileHomeLinkContainer(){
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { isDefault, resetFilter } = useFilterContext();
  const { isBelowMobile } = useMediaQueryContext();

  return (
    <div className="@min-[93.8em]/viewport:hidden  flex flex-row gap-4 @min-[72.5em]/viewport:gap-0 min-w-0">
      <MobileHomeLink isHome={isHome} />
      {isHome && 
        <ExpandMobileFilter />
      }
      {(!isDefault && isBelowMobile) && 
        <div className="inline @min-[72.5em]/viewport:hidden">
          <ResetFilter resetFilter={resetFilter} />
        </div>
      }
    </div>
  );
} 