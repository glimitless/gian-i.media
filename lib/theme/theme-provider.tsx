'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }){
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      // disableTransitionOnChange
      storageKey="theme"
      // scriptProps={{ async: true }}
    >
      {children}
    </NextThemesProvider>
  )
}