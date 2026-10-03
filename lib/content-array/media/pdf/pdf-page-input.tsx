'use client';

import type { RefObject } from 'react';
import { useState } from 'react';
import clampPDFPage from './clamp-pdf-page';

type PDFCurrentPageProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
  pageInputRef?: RefObject<HTMLInputElement | null>;
}

export default function PDFPageInput({
  currentPage,
  setCurrentPage,
  pageCount,
  pageInputRef,
}: PDFCurrentPageProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft ?? String(currentPage + 1);

  function commitDraft(input: string){
    if(input === '') {
      setDraft(null);
      return;
    }
    setCurrentPage(clampPDFPage(Number(input) - 1, pageCount));
    setDraft(null);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    if(value === '' || (/^\d+$/.test(value) && Number(value) <= pageCount)){
      setDraft(value);
      if(value !== ''){
        setCurrentPage(clampPDFPage(Number(value) - 1, pageCount));
      }
    }
  }

  function onBlur() {
    if (draft === '') {
      setDraft(null);
      return;
    }
    if (draft !== null) commitDraft(draft);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey) return;

    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D'){
      event.preventDefault();
      setDraft(null);
      setCurrentPage(currentPage + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A'){
      event.preventDefault();
      setDraft(null);
      setCurrentPage(currentPage - 1);
    } else if (event.key === 'Escape' || event.key === 'Enter'){
      event.preventDefault();
      event.currentTarget.blur();
    }
  }

  return (
    <label className="btn-template pdf-page-input w-auto cursor-text gap-1 pl-[0.9rem] pr-[1.1rem]">
      <input
        ref={pageInputRef}
        className="text-button h-8 w-auto field-sizing-content min-w-0 rounded-[0.5rem] bg-lmSurface dark:bg-dmSurface text-lmSecondary dark:text-dmSecondary whitespace-nowrap px-2 bg-color-transition-2 focus-visible:outline-none pb-1"
        value={display}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        inputMode="numeric"
        aria-label="Current PDF page"
      />
      <span
        className="text-button ml-[0.2rem] text-lmFadedText dark:text-dmFadedText whitespace-nowrap color-transition"
      >
        / {pageCount.toString()}
      </span>
    </label>
  )
  
}