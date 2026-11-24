import LandingHeader from "@/components/header/landing-header";
import FooterShell from "@/components/footer/footer-shell";
import PixelTemple from "@/components/landing/pixel-temple";
import WhatIDo from "@/components/landing/what-i-do";
import FeaturedWorks, { type FeaturedWork } from "@/components/landing/featured-works";
import ArchivePromo from "@/components/landing/archive-promo";
import NavigatorProvider from "@/lib/navigator/navigator-provider";
import { archiveIDRecords, findArchiveIDRecord } from "@/lib/archive/archive-ids";
import { findArchiveWorkRecord } from "@/lib/archive/archive-works";

const FEATURED_WORK_IDS = ['axxs-digital', 'time-unwinding-the-spiral', 'seventh-sense'];

function loadFeaturedWork(id: string): FeaturedWork {
  const record = findArchiveIDRecord(id, 'works');
  const work = findArchiveWorkRecord(id);
  const cover = work?.content.collectionLinks[0];
  const summary = work?.content.description[0]?.[0];
  if (!record || !cover || !summary) throw new Error(`Featured work is missing data: ${id}`);
  return { id, title: record.title, date: record.date, summary, thumbnail: cover.thumbnail, alt: cover.alt };
}

export default function Home() {
  const works = FEATURED_WORK_IDS.map(loadFeaturedWork);
  const count = (type: 'works' | 'notes') => archiveIDRecords.filter((record) => record.type === type).length;

  return (
    <NavigatorProvider>
      <div className="@container/viewport min-h-dvh w-full relative">
        <LandingHeader />
        <main className="@container/main scrollbar-none">
          <PixelTemple>
            Gian-I Cambridge is a Designer and Aspiring Software Engineer based in Toronto, Canada.
          </PixelTemple>
          <WhatIDo />
          <FeaturedWorks works={works} />
          <ArchivePromo workCount={count('works')} noteCount={count('notes')} />
        </main>
        <FooterShell />
      </div>
    </NavigatorProvider>
  );
}
