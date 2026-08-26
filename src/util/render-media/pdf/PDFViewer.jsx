import './PDFViewer.css';
import { useState, useRef, useEffect } from 'react';
import { PDFDirectionControls } from './PDFDirectionControls';
import { PDFExpandModal } from './PDFExpandModal';
import { PDFPageMedia } from './PDFPageMedia';
import ImgModalX from '../../../assets/icons/image-modal/img-modal-x.svg?react';

export function PDFViewer({ pages }) {
  const isSinglePage = pages.length === 1;
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageDisplay, setCurrentPageDisplay] = useState('1');
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const pageInputRef = useRef(null);

  function onPagesClick(event) {
    if(isSinglePage && pages[currentPage].type === 'video')
      return; 
    else if(pages[currentPage].type === 'video'){
      if(event.target === event.currentTarget){
        pageInputRef.current?.focus();
      }
      return;
    }

    if(isSinglePage) {
      setIsImgLoaded(false);
      setIsPDFOpen(true);
    } else {
      pageInputRef.current?.focus();
    }
  }
  
  useEffect(() => {
    if (!isPDFOpen) return;

    function onKeyDown(event) {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        setIsPDFOpen(false);
      } 
      
      if(isSinglePage) return;
      
      if (!event.ctrlKey && event.target.tagName !== 'INPUT' &&
        (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D')
      ) {
        event.preventDefault();
        setCurrentPage(prev => {
          const finalPage = pages.length - 1;
          const nextPage = prev >= finalPage ? finalPage : prev + 1;
          setCurrentPageDisplay(nextPage + 1);
          return nextPage;
        });
      } else if (!event.ctrlKey && event.target.tagName !== 'INPUT' &&
        (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A')
      ) {
        event.preventDefault();
        setCurrentPage(prev => {
          const finalPage = 0;
          const nextPage = prev <= finalPage ? finalPage : prev - 1;
          setCurrentPageDisplay(nextPage + 1);
          return nextPage;
        });
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    }
  }, [isPDFOpen, pages.length, isSinglePage]);

  return (
    <div className="pdf-viewer">
      <div
        className={`pdf-pages ${isSinglePage ? 'single' : ''}`}
        onClick={onPagesClick}
      >
        <PDFPageMedia page={pages[currentPage]} />
      </div>
      {!isSinglePage && (
        <div className="pdf-controls">
          <PDFDirectionControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pdfLength={pages.length}
            currentPageDisplay={currentPageDisplay}
            setCurrentPageDisplay={setCurrentPageDisplay}
            pageInputRef={pageInputRef}
          />
          <PDFExpandModal
            setIsPDFOpen={setIsPDFOpen}
            maximize
          />
          {isPDFOpen && (
            <div className="pdf-modal">
              <div
                className="pdf-modal-pages"
              >
                <PDFPageMedia
                  page={pages[currentPage]}
                  quality="high"
                  currentPage={currentPage}
                />
              </div>
              <div className="pdf-modal-controls">
                <PDFDirectionControls
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pdfLength={pages.length}
                  currentPageDisplay={currentPageDisplay}
                  setCurrentPageDisplay={setCurrentPageDisplay}
                />
                <PDFExpandModal
                  setIsPDFOpen={setIsPDFOpen}
                  minimize
                />
              </div>
            </div>
          )}
        </div>
      )}
      {(isPDFOpen && isSinglePage && pages[0].type === 'image') && (
        <div className="pdf-modal">
          <div className='image-modal' onClick={() => setIsPDFOpen(false)}>
            <button
              className="image-modal-close"
              onClick={() => setIsPDFOpen(false)}
              aria-label="close"
            >
              <ImgModalX />
            </button>
            {!isImgLoaded && (
              <div className="loader" />
            )}
            <PDFPageMedia
              page={pages[0]}
              quality="high"
              currentPage={0}
              className={isImgLoaded ? 'is-loaded' : ''}
              onLoad={() => setIsImgLoaded(true)}
            />
          </div>
        </div>
      )}
    </div>
  )
}