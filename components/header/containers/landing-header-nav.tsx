'use client'

import { usePathname } from 'next/navigation';
import HomeLink from '../buttons/home-link';
import Link from 'next/link';

export default function LandingHeaderNav(){
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-row gap-4"
    >
      <HomeLink isHome={pathname === '/'}/>
      <Link
        className="btn-template px-5 btn-template-transition"
        href="/archive"
      >
        Full archive
      </Link>
    </nav>
  )
}