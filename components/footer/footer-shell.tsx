'use client';

import Footer from "./footer";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { useHeaderContext } from "@/lib/navigator/navigator-provider";
import { useRootFontSizePx } from "@/lib/media-query/mediaQuery";
import useColumnFooterReveal from "@/lib/hooks/useColumnScrolledToEnd";

const shellClass = "pl-[0.85rem] pr-[0.85rem] pt-[0.85rem] pb-[0.85rem] bg-lmBg dark:bg-dmBg bg-transition-2";

export default function FooterShell(){
  const pathname = usePathname();
  const { mainRef } = useHeaderContext();
  const rootFontSizePx = useRootFontSizePx();
  const isContentPage = pathname !== '/';
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  useColumnFooterReveal(
    isContentPage,
    mainRef,
    rootFontSizePx,
    footerHeight,
    pathname,
    footerRef,
  );

  useLayoutEffect(() => {
    if (!isContentPage) return;

    const footer = footerRef.current;
    if (!footer) return;

    const measure = () => setFooterHeight(footer.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(footer);
    return () => observer.disconnect();
  }, [isContentPage, pathname]);

  if (!isContentPage) {
    return (
      <div className={shellClass}>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden"
      style={{ height: footerHeight }}
    >
      <div
        ref={footerRef}
        className={`${shellClass} pointer-events-auto footer-column-reveal`}
        inert
        aria-hidden="true"
      >
        <Footer />
      </div>
    </div>
  );
}
