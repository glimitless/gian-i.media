import Reveal from './reveal';

// PLACEHOLDER copy: drafted from data/resume-blocks.json and
// data/notes/birth/introduction.json. Replace before launch.
const DISCIPLINES = [
  {
    title: 'Brand & graphic design',
    detail: 'Identities, posters, signage and motion for Parlour Caribbean and OCAD University’s Design Photography Studio',
  },
  {
    title: 'Product & UI design',
    detail: 'Features for The Gazette, a Caribbean news app: an author page, a daily digest and a word game',
  },
  {
    title: 'Web design & development',
    detail: 'Sites I design and build in code, including York University’s SensingChange project and this archive',
  },
];

export default function WhatIDo() {
  return (
    <section className="landing-section" aria-labelledby="what-i-do" data-placeholder>
      <Reveal className="landing-section-wrap grid grid-cols-1 gap-y-16 @min-[72em]/main:grid-cols-2 @min-[72em]/main:gap-x-(--page-layout-column-gap)">
        <div>
          <h2 id="what-i-do" className="mb-4">What I do</h2>
          <p>
            I’m a graphic designer moving into product design, trained at OCAD University and drawn to work at the
            frontier of science and technology. I design the brand and the interface, and more and more I build
            the code behind them.
          </p>
        </div>
        <ul className="space-y-10 @min-[72em]/main:pt-14">
          {DISCIPLINES.map((item) => (
            <li key={item.title}>
              <p>{item.title}</p>
              <h3>{item.detail}</h3>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
