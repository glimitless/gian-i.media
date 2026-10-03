'use client';

import type { ComponentProps, ReactElement } from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ImgModalX from '@/assets/svg/icons/image-modal/img-modal-x.svg';

type ImageContainerProps = {
  children: ReactElement<ComponentProps<typeof Image>, typeof Image>;
  aspect: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export default function ImageContainer({ children, aspect, src, width, height, alt }: ImageContainerProps) {
  const [isImgOpen, setIsImgOpen] = useState<boolean>(false);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!isImgOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault()
        setIsImgOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
  }, [isImgOpen]);

  function imageOnClick() {
    setIsImgOpen(true);
    setIsImgLoaded(false);
  }

  return (
    <>
      <button
        type="button"
        style={{ aspectRatio: aspect }}
        onClick={imageOnClick}
        className={`image-regular w-full h-auto flex flex-col leading-none bg-lmSurface dark:bg-dmSurface bcvg-transition-2 cursor-pointer`}
      >
        {children}
      </button>
      {isImgOpen && (
        <div
          className="fixed inset-0 z-1 flex items-center justify-center bg-lmImageModalBackground dark:bg-dmImageModalBackground"
          onClick={() => setIsImgOpen(false)}
        >
          <button
            type="button"
            className="absolute top-8 right-8 z-4 p-0 cursor-pointer opacity-75"
            aria-label="Close image modal"
            onClick={() => setIsImgOpen(false)}
          >
            <ImgModalX className="w-10 h-10 text-lmSecondary dark:text-dmSecondary" />
          </button>
          {!isImgLoaded && <div className="absolute z-2 loader" />}
        
          <Image
            className={`${isImgLoaded ? 'opacity-100' : 'opacity-0'} z-3 w-auto h-auto max-w-[95vw] max-h-[95vh]`}
            src={`/images/${src}`}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setIsImgLoaded(true)}
            width={width}
            height={height}
            quality={90}
            sizes={`${(width*3).toString()}px`}
          />
        
          
        </div>
      )}
    </>
  )
}