'use client'

import { usePathname } from 'next/navigation';
import HomeLink from '../buttons/home-link';

export default function LandingHeaderNav(){
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-row gap-4"
    >
      <HomeLink isHome={pathname === '/'}/>
    </nav>
  )
}