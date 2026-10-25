'use client';

import Footer from "./footer";
import { usePathname } from "next/navigation";

export default function FooterShell(){
  const pathname = usePathname();

  if(pathname === '/'){
    return (
      <Footer />
    )
  }
  
  return (<></>);
}