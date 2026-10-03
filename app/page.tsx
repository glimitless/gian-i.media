'use server';

import FilterGrid from "@/components/filter-grid/filter-grid";

export default async function Home() {
  return (
    <div className="box-content block w-full @min-[25em]/main:w-[25em] @min-[48em]/main:w-[48em] @min-[75em]/main:w-[75em] @min-[102em]/main:w-[102em] @min-[129em]/main:w-[129em] @min-[156em]/main:w-[156em]">
      <FilterGrid />
    </div>
  );
}
