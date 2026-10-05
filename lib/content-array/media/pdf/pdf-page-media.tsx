'use client';

import type { MediaPartArgs } from '@/types/content-body';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type PDFPageMediaProps = {
  page: MediaPartArgs;
  quality?: 'preview' | 'full';
  currentPage: number;
  className?: string;
  onLoad?: () => void;
}

export default function PDFPageMedia({
  page,
  quality = 'preview',
  currentPage,
  className,
  onLoad,
}: PDFPageMediaProps) {
  const skipVideoReset = useRef(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if(skipVideoReset.current) {
      skipVideoReset.current = false;
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, [currentPage]);

  if (page.type === 'image') {
    const isFull = quality === 'full';
    return (
      <Image
        className={className ?? 'w-full h-full max-w-full max-h-full object-contain'} 
        src={`/images/${page.src}`}
        alt={page.alt}
        width={page.width}
        height={page.height}
        quality={isFull ? 90 : 60}
        sizes={isFull ? `${page.width * 3}px` : '100vw'}
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
        autoPlay={page.autoplay}
        playsInline
      />
    )
  }

  return null;
}