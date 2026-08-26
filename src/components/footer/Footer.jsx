import './Footer.css';
import { ContactLink } from './buttons/ContactLink';
import { MobileAboutLink } from './buttons/MobileAboutLink';

export function Footer({ isBelowTablet }){
  return(
    <div className="footer">
      {isBelowTablet && 
        <MobileAboutLink />
      }
      <div className="contact-links-container">
        <ContactLink link="https://www.instagram.com/gian.immanuel/" label="Instagram" />
        <ContactLink link="https://www.linkedin.com/in/giancambridge/" label="LinkedIn"/>
      </div>
    </div>
  );
}