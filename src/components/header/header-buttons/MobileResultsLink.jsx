import './MobileResultsLink.css';
import { Link } from 'react-router';
import TempleIcon from '../../../assets/icons/sidebar/gc_temple-icon.svg?react';

export function MobileResultsLink({ 
  isHome, isBelowMobile, scrollContentToTop,
}){
  const onClick = (e) => {
    if (isHome && isBelowMobile) {
      e.preventDefault();
      scrollContentToTop();
    }
  }

  return (
    <Link 
      to="/"
      onClick={onClick}
      className={`mobile-results-link ${isHome ? 'is-active' : ''}`}
    >
      <TempleIcon />
    </Link>
  )
}