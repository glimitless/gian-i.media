'use client';

import type { MediaPartArgs } from '@/types/content-body';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type PDFPageMediaProps = {
  page: MediaPartArgs;
  className?: string;
  onLoad?: () => void;
  isActive: boolean;
}

export default function PDFPageMedia({
  page,
  className,
  onLoad,
  isActive
}: PDFPageMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || page.type !== 'video') return;

    if (isActive && page.autoplay){
      void video.play();
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isActive, page]);

  if (page.type === 'image') {
    return (
      <Image
        className={className ?? 'w-full h-full max-w-full max-h-full object-contain'} 
        src={`/images/${page.src}`}
        alt={page.alt}
        width={page.width}
        height={page.height}
        onLoad={onLoad}
      />
    )
  }

  if (page.type === 'video') {
    return (
      <video 
        ref={videoRef}
        className={`pdf-page-video w-full h-full max-w-full max-h-full object-contain ${className ?? ''}`}
        src={`/video/${page.src}`}
        controls={page.controls}
        loop={page.loop}
        muted={page.muted}
        autoPlay={isActive && page.autoplay}
        playsInline
      />
    )
  }

  return null;
}