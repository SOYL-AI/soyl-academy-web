'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AiManifesto() {
  const container = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!container.current || !stageRef.current) return;

      const q = gsap.utils.selector(stageRef);
      const panels = q('[data-panel]');
      if (panels.length < 3) return;

      // Stack the three panels only when we are actually going to animate them.
      // Left alone, they read as a normal vertical sequence.
      gsap.set(stageRef.current, { position: 'relative', minHeight: '48vh' });
      gsap.set(panels, {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        yPercent: -50,
        margin: 0,
      });
      gsap.set(panels.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(panels[0], { autoAlpha: 0, y: -60, duration: 1 })
        .fromTo(
          panels[1],
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1 },
          '<'
        )
        .to(panels[1], { autoAlpha: 0, y: -60, duration: 1 }, '+=0.8')
        .fromTo(
          panels[2],
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1 },
          '<'
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full bg-cobalt text-white min-h-[100svh] py-24 flex items-center overflow-hidden"
    >
      <div ref={stageRef} className="container-default space-y-24">
        <div data-panel>
          <p className="text-manifesto uppercase max-w-[14ch]">
            We don&rsquo;t want students to stop using AI.
          </p>
        </div>

        <div data-panel>
          <p className="text-manifesto uppercase max-w-[15ch]">
            We want learning that still requires them to think.
          </p>
        </div>

        <div data-panel>
          <p className="text-subhead text-white/75 max-w-[46ch] mb-10">
            AI is changing how students find information, create and solve
            problems. Education should evolve with it — without giving up the
            thinking that learning is meant to develop.
          </p>
          <p className="text-headline text-white max-w-[20ch]">
            Don&rsquo;t design around AI. Design for understanding.
          </p>
        </div>
      </div>
    </section>
  );
}
