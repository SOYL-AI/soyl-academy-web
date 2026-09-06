'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINES = [
  'To ask better questions.',
  'To build.',
  'To reason.',
  'To disagree.',
  'To explain.',
  'To try again.',
];

export function EducationManifesto() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // NOTE: never call ScrollTrigger.getAll().kill() here — it would tear down
      // the pinned timelines belonging to Interruption and AiManifesto.
      // useGSAP's scope handles cleanup of only this component's triggers.
      gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.22 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'center 55%',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full bg-ink text-white section-padding-lg overflow-hidden"
    >
      <div className="container-default">
        <div data-fade className="max-w-[16ch]">
          <p className="text-manifesto uppercase">
            School should not prepare students to complete tasks.
          </p>
        </div>

        <div data-fade className="max-w-[14ch] ml-auto text-right mt-20 md:mt-32">
          <p className="text-manifesto uppercase text-cobalt-light">
            It should prepare them to face problems.
          </p>
        </div>

        <ul className="my-28 md:my-40 space-y-8 md:space-y-12 max-w-4xl">
          {LINES.map((line, i) => (
            <li
              key={line}
              data-fade
              // Stagger the indent so the list reads as a stepped column
              style={{ paddingLeft: `${(i % 3) * 8}%` }}
            >
              <p className="font-editorial text-[clamp(1.75rem,4vw,3.25rem)] leading-tight text-white/85">
                {line}
              </p>
            </li>
          ))}
        </ul>

        <div data-fade>
          <p className="text-display uppercase text-white mb-10 max-w-[12ch]">
            Thinking
            <br />
            is the work.
          </p>
          <p className="text-eyebrow text-white/45">SOYL Academy</p>
        </div>
      </div>
    </section>
  );
}
