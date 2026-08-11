import './ImageContainer.css';
import { useState, useEffect } from 'react';
import ImgModalX from '../../../assets/icons/image-modal/img-modal-x.svg?react';

export function ImageContainer({ lowRes, highRes, alt}){
  const [ isImgOpen, setIsImgOpen ] = useState(false);
  const [ isImgLoaded, setIsImgLoaded ] = useState(false);
  useEffect(() => {
    if(!isImgOpen) return;
    
    function onKeyDown(event) {
      if(event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault()
        setIsImgOpen(false);
    }}

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
  }, [isImgOpen]);

  function imageOnClick(){
    setIsImgLoaded(false);
    setIsImgOpen(true);
  }
  return (
    <>
      <button className="image-container" onClick={imageOnClick}>
        <img src={lowRes} alt={alt} />
      </button>
      {isImgOpen && (
        <div className="image-modal" onClick={() => setIsImgOpen(false)}>
          <button 
            className="image-modal-close"
            onClick={() => setIsImgOpen(false)}
            aria-label="close"
          >
            <ImgModalX /> 
          </button>
          {!isImgLoaded && <div className="loader" />}
          <img 
            className={isImgLoaded ? 'is-loaded' : ''}
            src={highRes} 
            alt={alt}
            onLoad={() => setIsImgLoaded(true)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}