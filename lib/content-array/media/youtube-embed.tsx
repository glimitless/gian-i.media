'use client';

import { useState } from "react";
import Image from "next/image";

export default function YoutubeEmbed({ videoId, title, aspect }: { videoId: string, title: string, aspect: string }) {
  const [active, setActive] = useState<boolean>(false);
  if (active) {
    return (
      <iframe
        className="relative block h-full w-full border-0 mb-2.25"
        style={{ aspectRatio: aspect }}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title || 'Youtube Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }


  return (
    <button
      type="button"
      style={{ aspectRatio: aspect }}
      className="relative block w-full h-full border-0 p-0 cursor-pointer bg-transparent mb-2.25"
      onClick={() => setActive(true)}
      aria-label={`Play ${title || 'Youtube Video'}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title ? `YouTube thumbnail: ${title}` : 'YouTube video thumbnail'}
        loading="lazy"
        className="h-full w-full object-cover"
        width={0}
        height={0}
        sizes="100vw"
      />
      <span
        aria-hidden
        className="
          pointer-events-none absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-lmYoutubeEmbedBackground dark:bg-dmYoutubeEmbedBackground
          color-transition
          after:content-[''] after:absolute after:top-1/2 after:left-[55%]
          after:-translate-x-1/2 after:-translate-y-1/2
          after:border-y-[0.75rem] after:border-y-transparent
          after:border-l-[1.1rem] after:border-l-lmYoutubeEmbedPrimary dark:after:border-l-dmYoutubeEmbedPrimary
          after:color-transition
          "
      />
    </button>
  )
}