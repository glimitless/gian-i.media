import type { Metadata } from 'next';

type PageMetadata = {
  metaTitle?: string;
  metaDescription?: string;
}

export function toPageMetadata(pageMetadata: PageMetadata | undefined): Metadata {
  if (!pageMetadata) return {};
  return {
    ...(pageMetadata.metaTitle && {title: pageMetadata.metaTitle}),
    ...(pageMetadata.metaDescription && {description: pageMetadata.metaDescription})
  }
}