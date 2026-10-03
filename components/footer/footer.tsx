import ContactLink from "./buttons/contact-link";
import { MobileAboutLink } from "./buttons/mobile-about-link";

export default function Footer(){
  return (
    <footer
      className="flex h-26 flex-row bg-lmBg dark:bg-dmBg pr-5 pl-5 pt-5 pb-5 bg-transition-2 justify-between"
    >
      <MobileAboutLink  />
      <div className="flex flex-row gap-5">
        <ContactLink href="https://www.instagram.com/gian.immanuel/" label="Instagram" />
        <ContactLink href="https://www.linkedin.com/in/giancambridge/" label="LinkedIn" />
      </div>
    </footer>
  )
}