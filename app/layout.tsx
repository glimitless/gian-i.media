import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import ThemeProvider from '@/lib/theme/theme-provider';
import FilterProvider from '@/lib/filter/filter-provider';
import NavigatorProvider from '@/lib/navigator/navigator-provider';
import Sidebar from '@/components/sidebar/sidebar';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import MainScroll from '@/components/main-scroll/main-scroll';

export const metadata: Metadata = {
  title: 'Gian-I Media',
  description: 'Gian-I Media is a multidisciplinary creative studio specializing in graphic design, branding, digital experiences, and interactive media.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full selection:bg-#af81b9 antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full selection:bg-[#ECB3CB] selection:text-lmPrimary bg-lmBg dark:bg-dmBg">
        <ThemeProvider>
          <NavigatorProvider>
            <FilterProvider>
              <div className="@container/viewport min-h-dvh h-dvh flex flex-row">
                <Sidebar />
                <div className="@container/content self-stretch flex min-w-0 flex-1 flex-col">
                  <Header />
                    <MainScroll>
                      {children}
                    </MainScroll>
                  <Footer />
                </div>
              </div>
            </FilterProvider>
          </NavigatorProvider>
        </ThemeProvider>
      </body>
      
    </html>
  );
}