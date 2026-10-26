'use client';

import { HEADER_MARGIN } from "./navigator-provider";
import { useHeaderContext } from "./navigator-provider";

export default function HeaderMargin({ isMediaColumn=false }:{ isMediaColumn?:boolean }){
  const { headerExpand } = useHeaderContext();

  if(isMediaColumn){
    return (
      <div className={`${HEADER_MARGIN[headerExpand]} header-margin-transition hidden @min-[144em]/main:block`} />
    )
  }

  return (
    <div className={`${HEADER_MARGIN[headerExpand]} header-margin-transition`} />
  )
}