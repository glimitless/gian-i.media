import ContactLink from "./buttons/contact-link";
import { MobileAboutLink } from "./buttons/mobile-about-link";

export default function Footer(){
  return (
    <footer
      className="flex flex-row bg-lmBg dark:bg-dmBg pr-[0.4rem] pl-[0.4rem] pt-[0.4rem] pb-[0.4rem] bg-transition-2 justify-between"
    >
      <div>
        <MobileAboutLink  />
      </div>
      
      <div className="flex flex-row gap-5">
        <ContactLink href="https://github.com/glimitless" label="GitHub" />
        <ContactLink href="https://www.instagram.com/gian.immanuel/" label="Instagram" />
        <ContactLink href="https://www.linkedin.com/in/giancambridge/" label="LinkedIn" />
      </div>
    </footer>
  )
}