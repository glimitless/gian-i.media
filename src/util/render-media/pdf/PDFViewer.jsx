import './PDFViewer.css';
import { useState, useRef, useEffect } from 'react';
import { PDFDirectionControls } from './PDFDirectionControls';
import { PDFExpandModal } from './PDFExpandModal';

export function PDFViewer({ pages }){
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ currentPageDisplay, setCurrentPageDisplay ] = useState('1');
  const [ isPDFOpen, setIsPDFOpen ] = useState(false);
  const pageInputRef = useRef(null);

  useEffect(() => {
    if(!isPDFOpen) return;
    
    function onKeyDown(event) {
      if(event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        setIsPDFOpen(false);
      }else if (!event.ctrlKey && event.target.tagName !== 'INPUT' &&
        (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D')
      ){
        event.preventDefault();
        setCurrentPage(prev => {
          const finalPage = pages.length - 1;
          const nextPage = prev >= finalPage ? finalPage : prev + 1;
          setCurrentPageDisplay(nextPage + 1);
          return nextPage;
        });
      }else if (!event.ctrlKey && event.target.tagName !== 'INPUT' &&
        (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A')
      ){
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
  }, [isPDFOpen, pages.length]);
  return(
    <div className="pdf-viewer">
      <div 
        className="pdf-pages"
        onClick={() => pageInputRef.current?.focus()}
      >
        <img src={pages[currentPage].lowRes} />
      </div>
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
              <img src={pages[currentPage].highRes} />
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
    </div>
  )
}