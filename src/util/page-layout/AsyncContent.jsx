import { Suspense } from "react";

export function AysncContent({ 
  fallback = (
    <div className="content-fallback">
      <div className="loader" />,
    </div> 
  ),
  children,
}){
  return <Suspense fallback={fallback}>{children}</Suspense>
}