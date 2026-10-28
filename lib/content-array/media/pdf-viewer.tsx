'use client';

import type { MediaPartArgs } from '@/types/content-body';
import ImgModalX from '@/public/svg/icons/image-modal/img-modal-x.svg';
import { useEffect, useRef, useState } from 'react';
import PDFDirectionControls from './pdf/pdf-direction-controls';
import PDFExpandModal from './pdf/pdf-expand-modal';
import PDFPageMedia from './pdf/pdf-page-media';
import clampPDFPage from './pdf/clamp-pdf-page';

const PRERENDER_RADIUS = 2;

function pageRenderRange(current: number, count: number){
  const start = Math.max(0, current - PRERENDER_RADIUS);
  const end = Math.min(count - 1, current + PRERENDER_RADIUS);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export default function PDFViewer({ pages }: { pages: MediaPartArgs[] }) {
  const isSinglePage = pages.length === 1;
  const pageCount = pages.length;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const pageInputRef = useRef<HTMLInputElement>(null);

  const activePage = pages[currentPage];

  function goToPage(next: number) {
    setCurrentPage(clampPDFPage(next, pageCount));
  }

  function onPDFBackgroundClick(event: React.MouseEvent<HTMLDivElement>) {
    if (activePage.type === 'video') {
      if (event.target === event.currentTarget) {
        pageInputRef.current?.focus();
      }
      return;
    }

    if (isSinglePage) {
      setIsImgLoaded(false);
      setIsOpen(true);
    } else {
      pageInputRef.current?.focus();
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (isSinglePage || event.ctrlKey || event.target instanceof HTMLInputElement) {
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        setCurrentPage((prev) => clampPDFPage(prev + 1, pageCount));
      } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        setCurrentPage((prev) => clampPDFPage(prev - 1, pageCount));
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    }
  }, [isOpen, isSinglePage, pageCount])

  const multiPageModal = (isOpen && !isSinglePage) && (
    <div className="fixed inset-0 flex flex-col z-6">
      <div className="relative flex-1 min-h-0 bg-lmImageModalBackground dark:bg-dmImageModalBackground">
        {pageRenderRange(currentPage, pageCount).map((index) => {
          const isActive = index === currentPage;
          return (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center ${isActive ? '' : 'invisible pointer-events-none'}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <PDFPageMedia
                page={pages[index]}
                quality="full"
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>
      <div className="h-26 bg-lmSurface dark:bg-dmSurface flex flex-row justify-between pl-5 pr-5 pb-5 pt-5">
        <PDFDirectionControls
          currentPage={currentPage}
          setCurrentPage={goToPage}
          pageCount={pageCount}
        />
        <PDFExpandModal setIsOpen={setIsOpen} variant="minimize" />
      </div>
    </div>
  )

  const singleImageModal = isOpen && isSinglePage && pages[0].type === 'image' && (
    <div className="fixed inset-0 flex-col z-6 flex items-center justify-center bg-lmImageModalBackground dark:bg-dmImageModalBackground">
      <button
        type="button"
        className="absolute top-8 right-8 z-9 p-0 cursor-pointer opacity-75"
        aria-label="Close image modal"
        onClick={() => setIsOpen(false)}
      >
        <ImgModalX className="w-10 h-10 text-lmSecondary dark:text-dmSecondary" />
      </button>
      {!isImgLoaded && <div className="absolute z-7 loader" />}
      <PDFPageMedia
        page={pages[0]}
        quality="full"
        className={`${isImgLoaded ? 'opacity-100' : 'opacity-0'} z-8 max-w-[95vw] max-h-95vh`}
        onLoad={() => setIsImgLoaded(true)}
        isActive={true}
      />
    </div>
  )

  return (
    <div className="pdf-viewer block">
      <div
        className="relative w-full aspect-5/4 bg-lmSurface dark:bg-dmSurface bcvg-transition mb-[0.6rem] flex justify-center items-center"
        onClick={onPDFBackgroundClick}
      >
        {pageRenderRange(currentPage, pageCount).map((index) => {
          const isActive = index === currentPage;
          return (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center ${isActive ? '' : 'invisible pointer-events-none'}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <PDFPageMedia 
                page={pages[index]} 
                isActive={isActive}
              />
            </div>
          )
        })}
      </div>
      {!isSinglePage && (
        <div
          className="p-[0.4rem] h-[4.8rem] w-full flex flex-row justify-between"
        >
          <PDFDirectionControls 
            currentPage={currentPage}
            setCurrentPage={goToPage}
            pageCount={pageCount}
            pageInputRef={pageInputRef}
          />
          <PDFExpandModal setIsOpen={setIsOpen} variant="maximize" />
          {multiPageModal}
        </div>
      )}

      {singleImageModal}
    </div>
  )
}