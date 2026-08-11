import './PDFDirectionControls.css';
import LeftArrowhead from '../../../assets/icons/pdf/left-arrowhead.svg?react';
import RightArrowhead from '../../../assets/icons/pdf/right-arrowhead.svg?react';
import { PDFCurrentPage } from './PDFCurrentPage';

export function PDFDirectionControls({ 
  currentPage, setCurrentPage, pdfLength,
  currentPageDisplay, setCurrentPageDisplay,
  pageInputRef,
}){
  function onClickLeft(){
    if(currentPage <= 0){
      setCurrentPage(0);
      setCurrentPageDisplay(1);
    }
    else{
      const nextPage = currentPage - 1;
      setCurrentPage(nextPage);
      setCurrentPageDisplay(nextPage + 1);
    }
  }
  function onClickRight(){
    if(currentPage >= pdfLength - 1){
      setCurrentPage(pdfLength - 1);
      setCurrentPageDisplay(pdfLength);
    }
    else{
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setCurrentPageDisplay(nextPage + 1);
    }
  }

  return (
    <div className="pdf-direction-controls">
      <button className="pdf-button left" onClick={onClickLeft}>
        <LeftArrowhead/>
      </button>
      <button className="pdf-button right" onClick={onClickRight}>
        <RightArrowhead/>
      </button>
      <PDFCurrentPage 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        currentPageDisplay={currentPageDisplay}
        setCurrentPageDisplay={setCurrentPageDisplay}
        pdfLength={pdfLength}
        pageInputRef={pageInputRef}
      />
    </div>
  )
}