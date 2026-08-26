import './PDFPageMedia.css';
import { useRef, useEffect } from 'react';

export function PDFPageMedia({ 
  page, quality = 'low', currentPage, onLoad, className 
}) {
  const isFirstRender = useRef(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }
    if(videoRef.current){
      videoRef.current?.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentPage])

  if(page.type === 'image'){
    const src = quality === 'high' ? page.highRes : page.lowRes;
    return (
      <img 
        src={src} 
        alt={page.alt} 
        className={className}
        onLoad={onLoad}
      />
    )
  }

  if (page.type === 'video') {
    return (
      <video
        ref={videoRef}
        className="pdf-page-video"
        src={page.video}
        controls={page.controls}
        loop={page.loop}
        muted={page.muted}
        autoPlay={page.autoplay}
      />
    );
  }
  
  return null;
}