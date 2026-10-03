'use client';

import type { ReactNode } from 'react';
import { useHeaderContext } from '@/lib/navigator/navigator-provider';

export default function MainScroll({ children } : { children:ReactNode } ){
  const { mainRef } = useHeaderContext();

  return (
    <main 
      className="@container/main flex flex-1 min-h-0 flex-row items-start justify-center overflow-scroll px-7 @min[56em]/viewport:px-5 bg-lmBg dark:bg-dmBg scrollbar-none-webkit bg-transition-2"
      ref={mainRef}
    >
      {children}
    </main>
  )
}