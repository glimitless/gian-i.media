import {RenderMediaItem} from './render-media/RenderMediaItem';

export function RenderMedia({ media }){
  return (
    <div className="media-container">
      {media.map((mediaItem) => (
        <RenderMediaItem mediaItem={mediaItem} key={mediaItem.id} />
      ))}
    </div>
  )
}