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
      className="group relative block w-full h-full border-0 p-0 cursor-pointer bg-transparent mb-2.25"
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
      />
      <span
        aria-hidden
        className="
          pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center w-[12.5%] aspect-square rounded-full
          bg-lmYoutubeEmbedBackground dark:bg-dmYoutubeEmbedBackground
          text-lmYoutubeEmbedPrimary dark:text-dmYoutubeEmbedPrimary
          opacity-90 group-hover:opacity-75 group-focus-visible:opacity-100
          transition-opacity duration-(--duration-o1) ease-o1 
          "
      >
        <svg viewBox="0 0 24 24" className="size-[50%] translate-x-[6%]" fill="currentColor" stroke="currentColor" strokeWidth={4} strokeLinejoin="round">
          <path d="M7.75 5.25 L18.75 12 L7.75 18.75 Z" />
        </svg>
      </span>
    </button>
  )
}