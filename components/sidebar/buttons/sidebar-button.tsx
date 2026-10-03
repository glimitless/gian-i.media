import type { MouseEvent } from 'react';
import type { SvgIcon } from '@/types/svg';
import type { SidebarExpand } from '@/types/navigator';
import type { TypeArgs } from '@/types/filter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type VariantProps = (
  {
    type: 'temple';
    svg: SvgIcon;
    setSidebarExpand: React.Dispatch<React.SetStateAction<SidebarExpand>>;
  } | {
    type: ('works' | 'notes');
    svg: SvgIcon;
    href: string;
    activeContentType: TypeArgs;
    onToggleContentType: (type: TypeArgs) => void;
  } | {
    type: 'about';
    svg: SvgIcon;
    href: string;
  }
);

export default function SidebarButton({variantProps, sidebarExpand} : {variantProps:VariantProps, sidebarExpand:SidebarExpand}){

  const pathname = usePathname();
  const isSidebarExpanded = sidebarExpand === 'expanded'; 

  let svgWidth:string;
  let btnPLeft:string;
  let btnGap:string;
  let onClick:((() => void) | undefined);
  
  switch(variantProps.type){
    case 'temple':
      svgWidth = 'w-10';
      btnPLeft = '';
      btnGap = '';
      onClick = () => {
        variantProps.setSidebarExpand(sidebarExpand === 'hidden' ? 'expanded' : 'hidden');
      };
      break;
    case 'works':
      svgWidth = 'w-[2.4rem]';
      btnPLeft = 'pl-[0.8rem]';
      btnGap = 'gap-[0.9rem]';
      onClick = undefined;
      break;
    case 'notes':
      svgWidth = 'w-[2.4rem]';
      btnPLeft = 'pl-[0.8rem]';
      btnGap = 'gap-[0.9rem]';
      onClick = undefined;
      break;
    case 'about':
      svgWidth = 'w-[1.8rem]';
      btnPLeft = 'pl-[1.1rem]';
      btnGap = 'gap-[1.2rem]';
      onClick = undefined;
      break;
  }

  function onFilterLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    contentType: Extract<TypeArgs, 'works' | 'notes'>,
    onToggleContentType: (type: TypeArgs) => void,
    activeContentType: TypeArgs,
  ){
    if(pathname === '/' &&  (contentType === 'notes' || contentType === 'works')){
      onToggleContentType(contentType === activeContentType ? 'all' : contentType);
      event.preventDefault();
    } 
    else if (contentType === 'notes' || contentType === 'works'){
      onToggleContentType(contentType);
    }
  }

  const Icon = variantProps.svg;
  

  if(variantProps.type === 'temple'){
    return (
      <button 
        type="button"
        aria-expanded={isSidebarExpanded}
        aria-label={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        className={`btn-template ${isSidebarExpanded && 'btn-template-active cursor-pointer'} w-16 justify-center shrink-0`}
        onClick={onClick}
      >
        <Icon className={`${svgWidth} h-auto shrink-0 text-lmSecondary dark:text-dmSecondary color-transition`} />
      </button>
    )
    
  } else if(variantProps.type === 'works' || variantProps.type === 'notes') {
    return(
      <Link
        aria-current={pathname.split('/')[1] === variantProps.type ? 'page' : undefined}
        aria-label={!isSidebarExpanded ? variantProps.type.charAt(0).toUpperCase() : undefined}
        className={`btn-template ${((variantProps.type === variantProps.activeContentType && pathname === '/') || pathname.split('/')[1] === variantProps.type) && 'btn-template-active cursor-pointer'} justify-start overflow-hidden whitespace-nowrap ${btnPLeft} ${btnGap}`}
        href={variantProps.href}
        onClick={(event) => onFilterLinkClick(event, variantProps.type, variantProps.onToggleContentType, variantProps.activeContentType)}
      >
        <Icon className={`${svgWidth} h-auto shrink-0 text-lmSecondary dark:text-dmSecondary color-transition`} />
        {variantProps.type.charAt(0).toUpperCase() + variantProps.type.slice(1)}
      </Link>
    )
  } else {
    return(
      <Link
        aria-current={pathname.split('/')[1] === '/about' ? 'page' : undefined}
        aria-label={!isSidebarExpanded ? 'About' : undefined}
        className={`btn-template justify-start overflow-hidden whitespace-nowrap ${btnPLeft} ${btnGap} ${pathname === '/about' && 'btn-template-active'}`}
        href={variantProps.href}
      >
        <Icon className={`${svgWidth} h-auto shrink-0 text-lmSecondary dark:text-dmSecondary color-transition`} />
        {variantProps.type.charAt(0).toUpperCase() + variantProps.type.slice(1)}
      </Link>
    )
  }
}