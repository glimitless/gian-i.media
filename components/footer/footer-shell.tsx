'use client';

import Footer from "./footer";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { useHeaderContext } from "@/lib/navigator/navigator-provider";
import { useRootFontSizePx } from "@/lib/media-query/mediaQuery";
import useColumnScrolledToEnd from "@/lib/hooks/useColumnScrolledToEnd";
import { contentScroller } from "@/lib/hooks/useColumnScrolledToEnd";

export default function FooterShell(){
  const pathname = usePathname();
  const { mainRef } = useHeaderContext();
  const rootFontSizePx = useRootFontSizePx();
  const isContentPage = pathname !== '/';
  const atEnd = useColumnScrolledToEnd(isContentPage, mainRef, rootFontSizePx);

  useLayoutEffect(() => {
    if(!isContentPage || !atEnd) return;
    const main = mainRef.current;
    if(!main) return;
    const column = contentScroller(main, rootFontSizePx);
    if(!column) return;
    const distance = column.scrollHeight - column.scrollTop - column.clientHeight;
    if(distance > 1) column.scrollTop += distance;
  }, [isContentPage, atEnd, mainRef, rootFontSizePx]);

  if(isContentPage && !atEnd) return null;

  return (
    <div className="pl-[0.85rem] pr-[0.85rem] pt-[0.85rem] pb-[0.85rem]">
      <Footer />
    </div>
  )
  
}