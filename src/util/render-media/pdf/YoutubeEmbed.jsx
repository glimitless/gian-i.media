import { useState } from 'react';
import './YoutubeFacade.css';

export function YoutubeEmbed({ videoId, title }) {
  const [ active, setActive ] = useState(false);

  if (active) {
    return (
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title || 'Youtube Video'}
        allow="encrypted-media; picture-in-picture; web-share;"
        allowFullScreen
      />
    )
  };

  return (
    <button 
      type="button"
      className="youtube-facade"
      onClick={() => setActive(true)}
      aria-label={`Play ${title || 'Youtube Video'}`}
    >
      <img 
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
      />
      <span className="youtube-facade-play" aria-hidden="true" />
    </button>
  )
}