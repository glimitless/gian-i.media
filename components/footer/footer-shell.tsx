'use client';

import Footer from "./footer";
import { usePathname } from "next/navigation";

export default function FooterShell(){
  const pathname = usePathname();

  if(pathname === '/'){
    return (
      <div className="pl-[0.85rem] pr-[0.85rem] pt-[0.85rem] pb-[0.85rem]">
        <Footer />
      </div>
    )
  }
}