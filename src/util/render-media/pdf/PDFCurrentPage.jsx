import './PDFCurrentPage.css';;

export function PDFCurrentPage({ 
  currentPage, setCurrentPage, pdfLength,
  currentPageDisplay, setCurrentPageDisplay,
  pageInputRef,
}){
  function onChange(event){
    const string = event.target.value;

    if(string === '' || /^\d+$/.test(string) && Number(string) <= pdfLength - 1){
      setCurrentPageDisplay(string);
      if(string !== ''){
        setCurrentPage(Number(string) - 1);
      }
    };
  }
  function onBlur(){
    if (currentPageDisplay === ''){
      setCurrentPageDisplay(`${currentPage + 1}`)
    }
  }
  function onKeyDown(event){
    if (!event.ctrlKey && 
      (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D')
    ){
      event.preventDefault();
      
      if (currentPage < pdfLength - 1){
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setCurrentPageDisplay(nextPage + 1)
      }
    } else if (!event.ctrlKey && 
      (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A')
    ){
      event.preventDefault();
      
      if (currentPage > 0){
        const nextPage = currentPage - 1;
        setCurrentPage(nextPage);
        setCurrentPageDisplay(nextPage + 1)
      }
    } else if (!event.ctrlKey && 
      (event.key === 'Escape' || event.key === 'Enter')
    ){
      event.preventDefault();
      event.target.blur();
    }

  }

  return (
    <label className="pdf-current-page">
      <input 
        className='current-page-input' 
        value={currentPageDisplay} 
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={pageInputRef}
      ></input>
      <p className="pdf-length-display">/ {pdfLength}</p>
    </label>
  )
}