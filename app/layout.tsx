import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/lib/theme/theme-provider';

export const metadata: Metadata = {
  title: {
    default: 'Gian-I Media',
    template: '%s | Gian-I Media'
  },
  description: 'Gian-I Media is a multidisciplinary creative studio specializing in graphic design, branding, digital experiences, and interactive media.',
};

// Sets the color scheme prior to painting HTML
const themeScript = `(
  function(){
    try {
      var theme = localStorage.getItem('theme');
      if (theme !== 'light' && theme !== 'dark') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      root.style.colorScheme = theme;
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
      <body className="min-h-full bg-lmBg dark:bg-dmBg bg-color-transition-2">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}