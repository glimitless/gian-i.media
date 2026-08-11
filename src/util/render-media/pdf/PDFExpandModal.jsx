import './PDFExpandModal.css';
import MaximizeIcon from '../../../assets/icons/pdf/maximize.svg?react'
import MinimizeIcon from '../../../assets/icons/pdf/minimize.svg?react'

export function PDFExpandModal({
  setIsPDFOpen, maximize = false, minimize = false,
}){
  function onClick(){
    if(maximize)
      setIsPDFOpen(true)
    else if(minimize)
      setIsPDFOpen(false)
    else
      return null;
  }

  return (
    <button className='pdf-button expand' onClick={onClick}>
      {maximize && <MaximizeIcon />}
      {minimize && <MinimizeIcon />}
    </button>
  )
}