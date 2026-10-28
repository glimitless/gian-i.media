import ContactLink from "../buttons/contact-link";
import LeftArrowhead from '@/assets/svg/icons/pdf/left-arrowhead.svg';
import { type SetStateAction, type Dispatch } from 'react';

type MobileAboutLinkProps = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function ContactLinks({ isExpanded, setIsExpanded }: MobileAboutLinkProps) {

  return (
    <>
      <div className="flex @min-[50em]/viewport:hidden flex-row gap-[0.45rem] @min-[50em]/viewport:gap-0">
        <div className={`grid footer-expand-transition min-h-0 ${isExpanded ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'}`}>
          <div className="overflow-hidden min-w-0 flex justify-end">
            <div className="whitespace-nowrap flex w-max shrink-0 flex-row gap-5 p-[0.4rem]">
              <ContactLink href="https://github.com/glimitless" label="GitHub" />
              <ContactLink href="https://www.instagram.com/gian.immanuel/" label="Instagram" />
              <ContactLink href="https://www.linkedin.com/in/giancambridge/" label="LinkedIn" />
            </div>
          </div>
        </div>

        <div className="p-[0.4rem] @min-[50em]/viewport:p-0">
          <button
            className={`btn-template ${isExpanded ? 'btn-template-active min-w-16 shrink-0' : 'min-w-0'} flex flex-row @min-[50em]/viewport:hidden btn-template-transition justify-center items-center px-5`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <LeftArrowhead className={`h-6 w-auto text-lmSecondary dark:text-dmSecondary shrink-0 footer-expand-transition ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
            <div className={`whitespace-nowrap overflow-hidden footer-expand-transition ${isExpanded ? 'w-0' : 'w-[5.445rem]'}`}>
              <div className="pl-4">
                Contact
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="hidden @min-[50em]/viewport:flex flex-row gap-5 p-[0.4rem]">
        <ContactLink href="https://github.com/glimitless" label="GitHub" />
        <ContactLink href="https://www.instagram.com/gian.immanuel/" label="Instagram" />
        <ContactLink href="https://www.linkedin.com/in/giancambridge/" label="LinkedIn" />
      </div>
    </>



  )
}