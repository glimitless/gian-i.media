import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/lib/theme/theme-provider';

export const metadata: Metadata = {
  title: 'Gian-I Media',
  description: 'Gian-I Media is a multidisciplinary creative studio specializing in graphic design, branding, digital experiences, and interactive media.',
};

// Sets the color scheme prior to painting html
const themeScript = `(
  function(){
      var theme = localStorage.getItem('theme') || 'system';
      if (theme === 'system') Theme.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var documentRef = document.documentElement;
      documentRef.classList.remove('light', 'dark');
      documentRef.classList.add(theme);
      documentRef.colorScheme = theme;
    } catch(error) {}
  }
)()`

export default function RootLayout({ children}: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className='h-full antialiased'
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-lmBg dark:bg-dmBg bg-color-transition">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}