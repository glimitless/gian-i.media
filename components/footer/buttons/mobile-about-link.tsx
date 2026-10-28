'use client';

import Link from 'next/link';
import AboutIcon from '@/public/svg/icons/sidebar/gc_about-icon.svg'
import { usePathname } from 'next/navigation';

export function MobileAboutLink(){
  const pathname = usePathname();

  return (
    <div className="@min-[92.8em]/viewport:hidden p-[0.4rem]">
      <Link 
        href='/about'
        className={`btn-template ${pathname === '/about' && 'btn-template-active'} w-auto justify-start pl-[1.1rem] pr-[1.2rem] gap-[1.2rem]`}
      >
        <AboutIcon className="w-[1.8rem] h-auto text-lmSecondary dark:text-dmSecondary color-transition shrink-0" />
        About
      </Link>
    </div>
    
  )
}