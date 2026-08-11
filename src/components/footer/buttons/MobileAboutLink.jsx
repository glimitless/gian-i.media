import { Link } from "react-router";
import './MobileAboutLink.css';
import AboutIcon from '../../../assets/icons/sidebar/gc_about-icon.svg?react';
import { useMatch } from "react-router";

export function MobileAboutLink(){
  const isHome = useMatch({ path: '/', end: true});
  const isAbout = useMatch({ path: '/about', end: true})

  return (
    <Link
      className={`mobile-about-link ${isHome ? 'is-home' : ''} ${isAbout ? 'is-active' : ''}`}
      to="/about"
    >
      <AboutIcon />
      {isHome && 
        <p className="text">About</p>
      }
    </Link>
  )
}