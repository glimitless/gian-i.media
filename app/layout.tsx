import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/lib/theme/theme-provider';

export const metadata: Metadata = {
  title: 'Gian-I Media',
  description: 'Gian-I Media is a multidisciplinary creative studio specializing in graphic design, branding, digital experiences, and interactive media.',
};

export default function RootLayout({ children}: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className='h-full antialiased'
      suppressHydrationWarning
    >
      <body className="min-h-full bg-lmBg dark:bg-dmBg bg-color-transition">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}