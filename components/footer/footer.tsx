'use client';

import { MobileAboutLink } from "./buttons/mobile-about-link";
import ContactLinks from "./container/contact-links";
import { useState, useEffect } from "react";
import { useMediaQueryContext } from "@/lib/navigator/navigator-provider";

export default function Footer(){
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false);
  const { isBelowMobile } = useMediaQueryContext();


  // useEffect(() => {

  // }, [isBelowMobile])

  return (
    <footer
      className="flex flex-row bg-lmBg dark:bg-dmBg bg-transition-2 justify-between"
    >
      <div className={`overflow-hidden whitespace-nowrap ${isExpanded ? 'w-0' : 'w-auto'}`}>
        <MobileAboutLink  />
      </div>
      
      <ContactLinks 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </footer>
  )
}