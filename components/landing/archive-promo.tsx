import Link from 'next/link';
import Reveal from './reveal';

export default function ArchivePromo({ workCount, noteCount }: { workCount: number; noteCount: number }) {
  return (
    <section className="landing-section bg-lmSurface dark:bg-dmSurface bg-transition-2" aria-labelledby="the-archive">
      <Reveal className="landing-section-wrap">
        <h2 id="the-archive" className="mb-4">The archive</h2>
        <p className="max-w-5xl mb-10">
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
