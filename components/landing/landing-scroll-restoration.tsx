'use client';

import { useEffect } from 'react';

// The root layout's script turns off scroll restoration on '/' before the browser restores a reload; this keeps it off
// while here (also after a client-side arrival or a StrictMode remount) and hands it back when leaving.
export default function LandingScrollRestoration() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    return () => {
      history.scrollRestoration = 'auto';
    };
  }, []);
  return null;
}
