import Link from 'next/link';
import Image from 'next/image';
import Reveal from './reveal';
import mediaURL from '@/lib/media-url/media-url';

export default function ArchivePromo({ workCount, noteCount }: { workCount: number; noteCount: number }) {
  return (
    <section className="landing-section relative overflow-hidden bg-lmSurface dark:bg-dmSurface bg-transition-2" aria-labelledby="the-archive">
      <Image
        className="absolute inset-0 w-full h-full object-cover dark:hidden image-theme-transition"
        src={mediaURL('/landing-page/archive-light.webp', 'image')}
        alt=""
        aria-hidden="true"
        fill
      />
      <Image
        className="absolute inset-0 w-full h-full object-cover hidden dark:block image-theme-transition"
        src={mediaURL('/landing-page/archive-dark.webp', 'image')}
        alt=""
        aria-hidden="true"
        fill
      />
      <div aria-hidden="true" className="absolute inset-0 bg-lmSurface/80 dark:bg-dmSurface/80 bg-transition-2" />
      <Reveal className="landing-section-wrap relative">
        <h1 id="the-archive" className="mb-4">The archive</h1>
        <p className="max-w-5xl mb-8">
          {workCount} {workCount === 1 ? 'work' : 'works'} and {noteCount} {noteCount === 1 ? 'note' : 'notes'} in one place: client projects, personal experiments and the
          thinking behind them. Filter by medium, tool or keyword.
        </p>
        <Link href="/archive" className="btn-template w-max px-5">
          Browse the archive
        </Link>
      </Reveal>
    </section>
  );
}
