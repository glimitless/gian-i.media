import FilterGrid from "@/components/filter-grid/filter-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse the Gian-I Media archive: design works, collections, and process notes spanning branding, graphic design, digital experiences, and interactive media.'
}

export default async function ArchiveLandingPage() {
  return (
    <div className="box-content block w-full @min-[25em]/main:w-[25em] @min-[53.4em]/main:w-[53.4em] @min-[83.6em]/main:w-[83.6em] @min-[113.8em]/main:w-[113.8em] @min-[144em]/main:w-[144em] @min-[174.2em]/main:w-[174.2em]">
      <FilterGrid />
    </div>
  );
}