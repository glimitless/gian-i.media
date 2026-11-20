import type { MouseEvent } from 'react';
import type { SvgIcon } from '@/types/svg';
import type { SidebarExpand } from '@/types/navigator';
import type { ContentTypeArgs } from '@/types/filter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type VariantProps = (
  {
    type: ('works' | 'notes');
    svg: SvgIcon;
    href: string;
    activeContentType: ContentTypeArgs;
    onToggleContentType: (type: ContentTypeArgs) => void;
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
  
  switch(variantProps.type){
    case 'works':
      svgWidth = 'w-[2.4rem]';
      btnPLeft = 'pl-[0.8rem]';
      btnGap = 'gap-[0.9rem]';
      break;
    case 'notes':
      svgWidth = 'w-[2.4rem]';
      btnPLeft = 'pl-[0.8rem]';
      btnGap = 'gap-[0.9rem]';
      break;
    case 'about':
      svgWidth = 'w-[1.8rem]';
      btnPLeft = 'pl-[1.1rem]';
      btnGap = 'gap-[1.2rem]';
      break;
  }

  function onFilterLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    contentType: Extract<ContentTypeArgs, 'works' | 'notes'>,
    onToggleContentType: (type: ContentTypeArgs) => void,
    activeContentType: ContentTypeArgs,
  ){
    if(pathname === '/archive' &&  (contentType === 'notes' || contentType === 'works')){
      onToggleContentType(contentType === activeContentType ? 'all' : contentType);
      event.preventDefault();
    } 
    else if (contentType === 'notes' || contentType === 'works'){
      onToggleContentType(contentType);
    }
  }

  const Icon = variantProps.svg;
  

  if(variantProps.type === 'works' || variantProps.type === 'notes') {
    return(
      <Link
        aria-current={pathname.split('/')[2] === variantProps.type ? 'page' : undefined}
        aria-label={!isSidebarExpanded ? variantProps.type.charAt(0).toUpperCase() : undefined}
        className={`btn-template ${((variantProps.type === variantProps.activeContentType && pathname === '/archive') || pathname.split('/')[2] === variantProps.type) && 'btn-template-active cursor-pointer'} justify-start overflow-hidden whitespace-nowrap ${btnPLeft} ${btnGap}`}
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
        aria-current={pathname.split('/')[2] === '/about' ? 'page' : undefined}
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