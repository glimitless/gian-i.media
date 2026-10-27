import ContactLink from "../buttons/contact-link";
import LeftArrowhead from '@/assets/svg/icons/pdf/left-arrowhead.svg';
import { type SetStateAction, type Dispatch } from 'react';

type MobileAboutLinkProps = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function ContactLinks({ isExpanded, setIsExpanded } : MobileAboutLinkProps){

  return (
    <div className="flex flex-row gap-[0.45rem]">
      <div className={`overflow-hidden ${isExpanded ? 'w-auto' : 'w-0'} min-h-0`}>
        <div className="whitespace-nowrap flex flex-row justify-end gap-5 p-[0.4rem]">
          <ContactLink href="https://github.com/glimitless" label="GitHub" />
          <ContactLink href="https://www.instagram.com/gian.immanuel/" label="Instagram" />
          <ContactLink href="https://www.linkedin.com/in/giancambridge/" label="LinkedIn" />
        </div>
      </div>
      
      <div className="p-[0.4rem]">
        <button 
          className={`btn-template  ${isExpanded ? 'btn-template-active' : ''} flex flex-row @min-[41.5em]/viewport:hidden btn-template-transition justify-center items-center px-5`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <LeftArrowhead className={`h-6 w-auto text-lmSecondary dark:text-dmSecondary shrink-0 ${isExpanded ? 'rotate-180' : ''}`}/>
          <div className={`whitespace-nowrap overflow-hidden  ${isExpanded ? 'w-0' : 'w-[5.445rem]'}`}>
            <div className="pl-4">
              Contact
            </div>
          </div>
        </button>
      </div>
    </div>
      
  )
}