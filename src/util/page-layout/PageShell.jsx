import { Sidebar } from "../../components/sidebar/Sidebar";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { useIsBelowMobileBreakpoint, useIsBelowTabletBreakpoint } from "../../hooks/useMediaQuery";
import { useRef } from "react";

export function PageShell({ sidebarProps, headerProps, children }){
  const isBelowTablet = useIsBelowTabletBreakpoint();
  const isBelowMobile = useIsBelowMobileBreakpoint();
  const contentRef = useRef(null);

  const scrollContentToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth'})
  };

  return (
    <div className="viewport">
      {!isBelowTablet && (
        <Sidebar 
          isBelowTablet={isBelowTablet}
          sidebarProps={sidebarProps} 
        />
      )}
      <div className="main">
        <Header 
          headerProps={headerProps} 
          isBelowTablet={isBelowTablet}
          isBelowMobile={isBelowMobile}
          scrollContentToTop={scrollContentToTop}
        />
        <div className="content" ref={contentRef}>
          {children}
        </div>
        <Footer 
          isBelowTablet={isBelowTablet}
          isBelowMobile={isBelowMobile}
        />
      </div>
    </div>
  )
}