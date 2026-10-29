'use client';

import type { ReactNode } from 'react';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';
import FooterShell from '../footer/footer-shell';
import { usePathname } from 'next/navigation';

export default function MainScroll({ children } : { children:ReactNode } ){
  const { mainRef } = useHeaderContext();
  const pathname = usePathname();

  return (
    <main
      className="main-scroll relative flex flex-1 min-h-0 flex-col overflow-scroll bg-lmBg dark:bg-dmBg scrollbar-none-webkit bg-transition-2"
      ref={mainRef}
    >
      <div className={`@container/main flex flex-1 flex-row justify-center px-7 @min-[64em]/viewport:px-5 ${pathname === '/' ? 'items-start' : 'min-h-0 items-stretch'}`}>
        {children}
      </div>
      <FooterShell />
    </main>
  )
}