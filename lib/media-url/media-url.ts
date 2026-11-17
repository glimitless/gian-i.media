const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/+$/, '')
const MEDIA_TYPES = {
  'image': 'images',
  'video': 'videos',
  'pdf': 'pdfs'
}

type mediaTypes = keyof typeof MEDIA_TYPES;

export default function mediaURL(src: string, type: mediaTypes): string {
  if (!MEDIA_BASE_URL) return '';
  return `${MEDIA_BASE_URL}/${MEDIA_TYPES[type]}/${src}`
}