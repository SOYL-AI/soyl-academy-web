'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SEQUENCE = ['Ask.', 'Generate.', 'Copy.', 'Paste.', 'Submit.'];

export function Interruption() {
  const container = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!container.current || !stageRef.current) return;

      const q = gsap.utils.selector(stageRef);
      const intro = q('[data-intro]');
      const words = q('[data-word]');
      const circle = q('[data-circle]');
      const summary = q('[data-summary]');

      // Collapse the static (no-JS / reduced-motion) layout into the pinned
      // stage. Everything below is inline style, so the readable fallback
      // survives untouched if this block never runs.
      gsap.set(stageRef.current, { position: 'relative', minHeight: '48vh' });
      gsap.set([...words, ...summary], {
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: '100%',
        margin: 0,
        autoAlpha: 0,
      });
      gsap.set(circle, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(intro, { autoAlpha: 0, y: -40, duration: 1 });

      words.forEach((word, i) => {
        const isLast = i === words.length - 1;
        tl.fromTo(
          word,
          { autoAlpha: 0, scale: 0.88 },
          { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out' }
        );

        if (isLast) {
          tl.fromTo(
            circle,
            { strokeDashoffset: 620, autoAlpha: 1 },
            { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }
          );
          tl.to([word, circle], { autoAlpha: 0, duration: 0.8 }, '+=0.6');
        } else {
          tl.to(word, { autoAlpha: 0, scale: 1.08, duration: 0.8 });
        }
      });

      tl.fromTo(
        summary,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1.4 }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-white min-h-[100svh] py-24 flex items-center overflow-hidden"
    >
      <div ref={stageRef} className="container-default text-center">
        <h2 data-intro className="text-manifesto text-ink uppercase">
          The assignment
          <br />
          is broken.
        </h2>

        {/* Static fallback: a legible sequence. GSAP re-stages these into the
            pinned scene only when motion is allowed. */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {SEQUENCE.map((word, i) => (
            <p
              key={word}
              data-word
              className="text-display text-ink relative inline-block"
            >
              {word}
              {i === SEQUENCE.length - 1 && (
                <svg
                  data-circle
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128%] h-[168%] text-teacher-red pointer-events-none"
                  viewBox="0 0 200 100"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M100,10 C150,10 190,30 190,50 C190,70 150,90 100,90 C50,90 10,70 10,50 C10,30 50,10 100,10 C130,10 150,15 152,17"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="620"
                  />
                </svg>
              )}
            </p>
          ))}
        </div>

        <div data-summary className="mt-20 mx-auto max-w-3xl">
          <p className="text-subhead text-ink-light mb-8">
            When a task can be completed without understanding, submission stops
            being evidence of learning.
          </p>
          <p className="text-headline text-ink">So we changed the task.</p>
        </div>
      </div>
    </section>
  );
}
