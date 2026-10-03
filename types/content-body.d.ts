export type TextPartArgs = (
  { type: 'text'; value: string;} 
  | { type: 'external-link'; href: string; label: string; } 
  | { type: 'download-link'; href: string; label: string; fileName: string; }
);
type InnerTextBlockArgs = (
  { type: 'paragraph'; content: TextPartArgs[] }
  | { type: 'caption'; content: TextPartArgs[] }
  | { type: 'subtitle-two'; content: TextPartArgs[] }
)
type QuoteContentArgs = {
  type: 'quote-content';
  content: InnerTextBlockArgs[];
}
type QuoteSourceArgs = {
  type: 'quote-source';
  content: TextPartArgs[];
}
type QuoteBlockArgs = {
  type: 'quote';
  content: (QuoteContentArgs | QuoteSourceArgs)[];
}
type BulletItemBlock = {
  type: 'bullet-item';
  content: InnerTextBlockArgs[];
}
type NumberedListItemBlock = {
  type: 'numbered-list-item';
  content: InnerTextBlockArgs[];
}
type NumberedListBlock = {
  type: 'numbered-list';
  content: NumberedListItemBlock[];
}
type BulletListBlock = {
  type: 'bullet-list';
  content: BulletItemBlock[];
}
export type TextBlockArgs = (
    InnerTextBlockArgs
    | QuoteBlockArgs
    | QuoteContentArgs
    | QuoteSourceArgs
    | BulletListBlock
    | BulletItemBlock
    | NumberedListBlock
    | NumberedListItemBlock
);

export type ImageBlockArgs = {
  type: 'image';
  aspect: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  id: string;
}
export type VideoBlockArgs = {
  type: 'video';
  aspect: string;
  src: string;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  autoplay: boolean;
  id: string;
}
export type YoutubeVideoBlockArgs = {
  type: 'youtube-embed';
  aspect: string;
  videoId: string;
  title: string;
  alt: string;
  id: string;
}
export type MediaPartArgs = (ImageBlockArgs | VideoBlockArgs | YoutubeVideoBlockArgs)
export type MediaBlockArgs = {
  type: 'media';
  content: MediaPartArgs[];
}
export type PDFBlockArgs = {
  type: 'pdf';
  pages: MediaPartArgs[];
}

export type ContentBlockArgs = ( MediaBlockArgs | TextBlockArgs | PDFBlockArgs )