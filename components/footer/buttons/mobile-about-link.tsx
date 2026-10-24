'use client';

import Link from 'next/link';
import AboutIcon from '@/assets/svg/icons/sidebar/gc_about-icon.svg'
import { usePathname } from 'next/navigation';

export function MobileAboutLink(){
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div>
      <Link 
        href='/about'
        className={`btn-template ${pathname === '/about' && 'btn-template-active'} ${isHome ? 'w-auto justify-start pl-[1.1rem] pr-[1.2rem] gap-[1.2rem] ' : 'justify-center w-16'}`}
      >
        <AboutIcon className="w-[1.8rem] h-auto text-lmSecondary dark:text-dmSecondary color-transition" />
        {isHome &&
          <>About</>
        }
      </Link>
    </div>
    
  )
}