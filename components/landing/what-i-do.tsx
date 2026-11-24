import Image from 'next/image';
import Reveal from './reveal';

// PLACEHOLDER copy: drafted from data/archive-ids.json and
// data/works/. Replace before launch.
const DISCIPLINES = [
  {
    title: 'Brand & Graphic Design',
    detail: 'Identities for Parlour, Paypr and Rocket Science Ltd., and posters, signage and an exhibition for Design Photography.',
  },
  {
    title: 'Product & UI Design & Development',
    detail: 'The GazettE at AXXS Digital, plus sites I design and build in code: SensingChange, the planetary archive for Visualizing Science, and this portfolio.',
  },
  {
    title: 'Interactive Media',
    detail: 'A live visualization for the TIME: Unwinding the Spiral exhibition and an Arduino controller prototype for Visualizing Science.',
  },
];

export default function WhatIDo() {
  return (
    <section className="landing-section" aria-labelledby="what-i-do" data-placeholder>
      <Reveal className="landing-section-wrap grid grid-cols-1 gap-y-16 items-center @min-[110em]/main:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] @min-[110em]/main:gap-x-(--page-layout-column-gap)">
        <Image
          className="w-full h-auto aspect-square object-cover"
          src="/landing-images/gc_profile-pic.webp"
          alt="Portrait of Gian-I Cambridge"
          width={1400}
          height={1400}
          sizes="(min-width: 1115px) 40vw, 100vw"
        />
        <div>
          <h2 id="what-i-do" className="mb-8 text-[5.6rem] leading-[1] text-lmPrimary dark:text-dmPrimary @min-[110em]/main:text-[8rem]">
            What I do
          </h2>
          <p className="text-[2.4rem] leading-[3.4rem] @min-[110em]/main:text-[2.8rem] @min-[110em]/main:leading-[4rem]">
            I’m a graphic designer moving into product design, trained at OCAD University and drawn to work at the
            frontier of science and technology. I design the brand and the interface, and more and more I build
            the code behind them.
          </p>
          <ul className="mt-14 space-y-8">
            {DISCIPLINES.map((item) => (
              <li key={item.title}>
                <p>{item.title}</p>
                <h3>{item.detail}</h3>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
