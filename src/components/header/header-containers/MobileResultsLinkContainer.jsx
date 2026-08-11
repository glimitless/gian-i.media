import './MobileResultsLinkContainer.css';
import { MobileResultsLink } from '../header-buttons/MobileResultsLink';
import GCWordmark from '../../../assets/icons/sidebar/gc_wordmark.svg?react';
import { useMatch } from 'react-router';

export function MobileResultsLinkContainer({ 
  isBelowMobile, scrollContentToTop, 
}){
  const isHome = useMatch({ path: '/', end: true});
  return (
    <div className="mobile-results-link-container">
      <MobileResultsLink 
        isHome={isHome} 
        isBelowMobile={isBelowMobile}
        scrollContentToTop={scrollContentToTop}
      />
      {(isBelowMobile && isHome) &&
        <div className="mobile-wordmark-container">
          <GCWordmark />
        </div>
      }
    </div>
  )
}