'use client';

import type { RefObject } from 'react';
import LeftArrowhead from '@/assets/svg/icons/pdf/left-arrowhead.svg';
import RightArrowhead from '@/assets/svg/icons/pdf/right-arrowhead.svg';
import PDFPageInput from './pdf-page-input';

type PDFDirectionControlProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
  pageInputRef?: RefObject<HTMLInputElement | null>;
};

export default function PDFDirectionControls({
  currentPage,
  setCurrentPage,
  pageCount,
  pageInputRef,
}: PDFDirectionControlProps) {
  return (
    <div className="flex flex-row justify-start gap-4">
      <button
        type="button"
        className="btn-template w-16 justify-center"
        onClick={() => setCurrentPage(currentPage - 1)}
        aria-label="Previous page"
      >
        <LeftArrowhead className="h-6 w-auto text-lmSecondary dark:text-dmSecondary" />
      </button>
      <button
        type="button"
        className="btn-template w-16 justify-center"
        onClick={() => setCurrentPage(currentPage + 1)}
        aria-label="Next page"
      >
        <RightArrowhead className="h-6 w-auto text-lmSecondary dark:text-dmSecondary" />
      </button>
      <PDFPageInput 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        pageInputRef={pageInputRef}
      />
    </div>
  )
}