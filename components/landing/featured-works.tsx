import Link from 'next/link';
import Image from 'next/image';
import Reveal from './reveal';
import mediaURL from '@/lib/media-url/media-url';
import formatDate from '@/lib/format-date/format-date';
import renderContentBody from '@/lib/content-array/render-content-body';
import type { ContentBlockArgs } from '@/types/content-body';
import type { EightDigitDate } from '@/types/archive';

export type FeaturedWork = {
  id: string;
  title: string;
  date: EightDigitDate;
  summary: ContentBlockArgs;
  thumbnail: string;
  alt: string;
};

export default function FeaturedWorks({ works }: { works: FeaturedWork[] }) {
  return (
    <section className="landing-section" aria-labelledby="selected-work">
      <Reveal className="landing-section-wrap">
        <h1 id="selected-work" className="mb-9">Selected works</h1>
        <ul className="featured-works-grid">
          {works.map((work) => (
            <li key={work.id}>
              <Link
                href={`/archive/works/${work.id}`}
                aria-label={work.title}
                className="block aspect-square w-full overflow-hidden bg-lmSurface dark:bg-dmSurface img-thumbnail-transition img-thumbnail-hover"
              >
                <Image
                  className="w-full h-full object-cover"
                  src={mediaURL(work.thumbnail, 'image')}
                  alt={work.alt}
                  width={0}
                  height={0}
                />
              </Link>
              <p className="mt-5 mb-2 text-[2.3rem] text-lmPrimary dark:bg-dmPrimary font-normal">{work.title}</p>
              <h3 className="mb-3">{formatDate(work.date)}</h3>
              <div className="mb-4">
                {renderContentBody([[work.summary]])}
              </div>
              
              <Link href={`/archive/works/${work.id}`} className="text-link text-button">
                View {work.title}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
