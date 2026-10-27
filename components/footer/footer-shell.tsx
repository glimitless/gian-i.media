'use client';

import Footer from "./footer";
import { usePathname } from "next/navigation";
import { useHeaderContext } from "@/lib/navigator/navigator-provider";
import { useRootFontSizePx } from "@/lib/media-query/mediaQuery";
import useColumnScrolledToEnd from "@/lib/hooks/useColumnScrolledToEnd";

export default function FooterShell(){
  const pathname = usePathname();
  const { mainRef } = useHeaderContext();
  const rootFontSizePx = useRootFontSizePx();
  const isContentPage = pathname !== '/';
  const atEnd = useColumnScrolledToEnd(isContentPage, mainRef, rootFontSizePx);

  if(isContentPage && !atEnd) return null;

  return (
    <div className="pl-[0.85rem] pr-[0.85rem] pt-[0.85rem] pb-[0.85rem]">
      <Footer />
    </div>
  )
  
}