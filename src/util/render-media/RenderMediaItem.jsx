import './RenderMediaItem.css';
import { formatText } from '../formatText';
import { ImageContainer } from './img/ImageContainer';
import { PDFViewer } from './pdf/PDFViewer';

export function RenderMediaItem({ mediaItem }){
  
  return(
    <div className="media-item">
      {mediaItem.type === 'image' && (
        <>
          <ImageContainer 
            lowRes={mediaItem.lowRes} 
            highRes={mediaItem.highRes} 
            alt={mediaItem.alt}
          />
          {mediaItem.desc.length > 0 && (
            <div className="caption-container">
              {formatText(mediaItem.desc)}
            </div>
          )}
        </>
      )}
      {mediaItem.type === 'video' && (
        <>
          <video 
            className="video"
            src={mediaItem.video}
            controls={mediaItem.controls}
            loop={mediaItem.loop}
            muted={mediaItem.muted}
            autoPlay={mediaItem.autoplay}
          />
          {mediaItem.desc.length > 0 && (
            <div className="caption-container">
              {formatText(mediaItem.desc)}
            </div>
          )}
        </>
      )}
      {mediaItem.type === 'pdf' && (
        <>
          <PDFViewer pages={mediaItem.pages} />
          {mediaItem.desc.length > 0 && (
            <div className="caption-container">
              {formatText(mediaItem.desc)}
            </div>
          )}
        </>
        
        
      )}
      
    </div>
  )
}