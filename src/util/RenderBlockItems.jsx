import { Fragment } from 'react';
import { formatText } from './formatText';
import { RenderMediaItem } from './render-media/RenderMediaItem';
import './RenderBlockItems.css';

export function RenderBlockItems({ items = [] }) {
  return items.map((item, i) => {
    if (item.type === 'media') {
      return (
        <Fragment key={i}>
          {item.media.map((mediaItem) => (
            <RenderMediaItem mediaItem={mediaItem} key={mediaItem.id} />
          ))}
        </Fragment>
      );
    }
    
    return (
      <Fragment key={i}>{formatText([item])}</Fragment>
    )
  });
}
