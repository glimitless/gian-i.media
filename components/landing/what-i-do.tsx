import Image from 'next/image';
import mediaURL from '@/lib/media-url/media-url';

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
      <div className="landing-section-wrap grid grid-cols-1 gap-y-7 items-center @min-[74em]/main:grid-cols-[20rem_1fr] @min-[89em]/main:grid-cols-[25rem_1fr] @min-[100em]/main:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] @min-[74em]/main:gap-x-26 [132em]/main:gap-x-28">
        <div
          className="h-full w-full flex-col justify-start @min-[132em]/main:justify-center"
        >
          <Image
            className="w-full h-auto aspect-square object-cover"
            src={mediaURL('/landing-page/gc_profile-pic.webp', 'image')}
            alt="Portrait of Gian-I Cambridge"
            width={1400}
            height={1400}
            sizes=""
          />
        </div>
        
        <div>
          <h1 className="">
            I’m a graphic designer transitioning into product design engineering, trained at OCAD University and drawn to work at the frontier of science and technology. I design the brand and the interface, and more and more I build the code behind them.
          </h1>
          <ul className="mt-10 space-y-5">
            {DISCIPLINES.map((item) => (
              <li key={item.title}>
                <p>{item.title}</p>
                <h3>{item.detail}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
