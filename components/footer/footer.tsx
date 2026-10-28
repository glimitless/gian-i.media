'use client';

import { MobileAboutLink } from "./buttons/mobile-about-link";
import ContactLinks from "./container/contact-links";
import { useState, useEffect } from "react";
import { useMediaQueryContext } from "@/lib/navigator/navigator-provider";

export default function Footer(){
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false);
  const { isBelowPhone } = useMediaQueryContext();

  useEffect(() => {
    if(!isBelowPhone){
      const lockExpand = () => setIsExpanded(true);
      lockExpand();
    }
    const releaseExpand = () => setIsExpanded(false);
    releaseExpand();
    
  }, [isBelowPhone])

  return (
    <footer
      className="flex flex-row bg-lmBg dark:bg-dmBg bg-transition-2 justify-between"
    >
      <div className={`grid @min-[50em]/viewport:hidden footer-expand-transition ${isExpanded ? 'grid-cols-[0fr]' : 'grid-cols-[1fr]'}`}>
        <div className="overflow-hidden min-w-0">
          <div className="w-max whitespace-nowrap">
            <MobileAboutLink />
          </div>
        </div>
      </div>
      <div className="hidden @min-[50em]/viewport:inline">
        <MobileAboutLink  />
      </div>
      
      <ContactLinks 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </footer>
  )
}