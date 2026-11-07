import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import ThemeProvider from '@/lib/theme/theme-provider';
import FilterProvider from '@/lib/filter/filter-provider';
import NavigatorProvider from '@/lib/navigator/navigator-provider';
import Sidebar from '@/components/sidebar/sidebar';
import Header from '@/components/header/header';
import MainScroll from '@/components/main-scroll/main-scroll';
import MobileFilterMenu from '@/components/mobile-filter-menu/mobile-filter-menu';

export const metadata: Metadata = {
  title: 'Gian-I Media',
  description: 'Gian-I Media is a multidisciplinary creative studio specializing in graphic design, branding, digital experiences, and interactive media.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className='h-full antialiased'
      suppressHydrationWarning
    >
      <body className="min-h-full selection:bg-[#DB99B8] selection:text-lmPrimary dark:selection:bg-[#802D54] dark:selection:text-dmPrimary bg-lmBg dark:bg-dmBg bg-color-transition">
        <ThemeProvider>
          <NavigatorProvider>
            <FilterProvider>
              <div className="@container/viewport min-h-dvh h-dvh flex flex-row relative">
                <MobileFilterMenu />
                <Sidebar />
                <div className="@container/content relative self-stretch flex min-w-0 flex-1 flex-col">
                  <Header />
                  <MainScroll>
                    {children}
                  </MainScroll>
                </div>
              </div>
            </FilterProvider>
          </NavigatorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}