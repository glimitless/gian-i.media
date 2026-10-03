import { type ReactNode, Fragment } from 'react';
import ImageContainer from './media/image-container';
import PDFViewer from './media/pdf-viewer';
import YoutubeEmbed from './media/youtube-embed';
import Image from 'next/image';
import type { ContentBlockArgs, MediaPartArgs, TextPartArgs } from '@/types/content-body';

export default function renderContentBody(contentBody: ContentBlockArgs[][]) {
  return (
    <>
      {contentBody.map((contentBlocks, i) => (
        <div key={i}>
          {contentBlocks.map((block, j) => renderContentBlock(block, j))}
        </div>
      ))}
    </>
  )
}
function renderContentBlock(block: ContentBlockArgs, key: number): ReactNode {
  if (block.type === 'media') {
    return (
      <div
        key={key}
      >
        {block.content.map((mBlock, j) => renderMediaPart(mBlock, j))}
      </div>
    )
  }
  if (block.type === 'pdf') {
    return (
      <PDFViewer
        key={key}
        pages={block.pages}
      />
    )
  }
  if (block.type === 'paragraph') {
    return (
      <p
        key={key}
        className="paragraph"
      >
        {renderTextParts(block.content, key)}
      </p>
    )
  }
  if (block.type === 'caption') {
    return (
      <p
        key={key}
        className="caption"
      >
        {renderTextParts(block.content, key)}
      </p>
    )
  }
  if (block.type === 'subtitle-two') {
    return (
      <h2
        key={key}
        className="mb-[0.7rem]">
        {renderTextParts(block.content, key)}
      </h2>
    )
  }

  if (block.type === 'quote-source') {
    return (
      <ul
        key={key}
        className="quote-source-list-type mt-4 pl-[1.275rem] ml-[1.538rem] text-body text-lmPrimary dark:text-dmPrimary color-transition"
      >
        <li>
          {renderTextParts(block.content, key)}
        </li>
      </ul>
    )
  }

  if (block.type === 'quote-content') {
    return (
      <ul
        key={key}
        className="quote-content-list-type pl-[0.788rem] ml-3 text-body"
      >
        <li className="space-y-4">
          {block.content.map((inner, k) => renderContentBlock(inner, k))}
        </li>
      </ul>
    )
  }

  if (block.type === 'bullet-item') {
    return (
      <Fragment key={key}>
        {block.content.map((inner, k) => renderContentBlock(inner, k))}
      </Fragment>
    )
  }

  if (block.type === 'numbered-list-item') {
    return (
      <Fragment key={key}>
        {block.content.map((inner, k) => renderContentBlock(inner, k))}
      </Fragment>
    )
  }

  if (block.type === 'quote') {
    return (
      <div
        key={key}
        className="quote flex flex-row justify-start"
      >
        <div className="w-2 bg-lmSurface dark:bg-dmSurface bg-transition-2" />
        <div className="flex-1 min-w-0">
          {block.content.map((qBlock, i) => renderContentBlock(qBlock, i))}
        </div>
      </div>
    )
  }

  if (block.type === 'bullet-list') {
    return (
      <ul
        key={key}
        className="bullet-list list-[circle] pl-12 space-y-3 text-body"
      >
        {block.content.map((item, j) => (
          <li
            key={j}
            className="pl-[0.3rem]"
          >
            {item.content.map((inner, k) => renderContentBlock(inner, k))}
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'numbered-list') {
    return (
      <ol
        key={key}
        className="numbered-list pl-10 space-y-4 list-decimal text-body text-lmPrimary dark:text-dmPrimary color-transition"
      >
        {block.content.map((item, j) => (
          <li
            key={j}
            className="pl-[0.3rem]"
          >
            {item.content.map((inner, k) => renderContentBlock(inner, k))}
          </li>
        ))}
      </ol>
    )
  }
}
function renderTextParts(parts: TextPartArgs[], key: number): ReactNode {
  return (
    <>
      {parts.map((textPart, partIndex) => (renderTextPart(textPart, `${key} - ${partIndex}`)))}
    </>
  );

}
function renderMediaPart(part: MediaPartArgs, key: number) {
  if (part.type === 'image') {
    return (
      <ImageContainer
        key={key}
        aspect={part.aspect}
        src={part.src}
        alt={part.alt}
        width={part.width}
        height={part.height}
      >
        <Image
          className="w-full h-auto max-h-full max-w-full"
          src={`/images/${part.src}`}
          alt={part.alt}
          width={0}
          height={0}
          sizes="100vw"
        />
      </ImageContainer>
    )
  }

  if (part.type === 'video') {
    return (
      <video
        key={key}
        style={{ aspectRatio: part.aspect }}
        className="video-regular w-full h-auto"
        src={`/video/${part.src}`}
        controls={part.controls}
        loop={part.loop}
        muted={part.muted}
        autoPlay={part.autoplay}
      />
    )
  }

  if (part.type === 'youtube-embed'){
    return (
      <YoutubeEmbed 
        key={key}
        videoId={part.videoId}
        title={part.title}
        aspect={part.aspect}
      />
    )
  }
}

function renderTextPart(part: TextPartArgs, key: number | string): ReactNode {
  if (part.type === 'text') {
    return <Fragment key={key}>{part.value}</Fragment>;
  }
  else if (part.type === 'external-link') {
    return <a
      key={key}
      href={part.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link"
    >
      {part.label}
    </a>
  }
  else if (part.type === 'download-link') {
    return <a
      key={key}
      href={part.href}
      download={true}
      className="text-link">
      {part.label + ' ↓\uFE0E'}
    </a>
  }
}
// + ' ↗\uFE0E'