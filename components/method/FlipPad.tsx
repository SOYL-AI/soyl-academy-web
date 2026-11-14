import './method.css';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Scene } from '@/components/story/Scene';
import { Dab, Note } from '@/components/brush/marks';
import { images, type EditorialImage } from '@/content/images';
import { sheets } from '@/content/method';
import { cn } from '@/lib/utils';

const INK_TEXT = {
  ochre: 'text-[#8a6410]',
  ultramarine: 'text-ultramarine',
  vermilion: 'text-vermilion-ink',
  sap: 'text-sap',
} as const;

/** What SOYL listens for in each stage: the narration beside the pad. */
const LISTENS = [
  'Listening for the bigger-heater idea, before anything is taught.',
  'Every dial turned is evidence. The path bends to what she does.',
  'One or two questions, aimed at her gap and nobody else’s.',
  'The same misconception as Spark, checked somewhere new.',
  'How sure she was, compared with what she actually did.',
];

/** The spiral binding across the top of the pad. */
function Binding() {
  return (
    <div aria-hidden="true" className="absolute inset-x-6 -top-3 z-30 flex justify-between">
      {Array.from({ length: 13 }, (_, i) => (
        <span key={i} className="relative block h-7 w-2.5">
          <span className="absolute left-0 top-3 h-3 w-2.5 rounded-full bg-ink/80" />
          <span className="absolute left-[3px] top-0 h-5 w-1 rounded-full bg-gradient-to-b from-graphite to-ink" />
        </span>
      ))}
    </div>
  );
}

/**
 * Chapter 2 of /method (ADR-034): the pupil's hour as a spiral-bound pad. One sheet per stage, flipping up over the
 * binding as the page scrolls (CSS 3D, driven by the scene's --p). The stage strip and the narration follow the
 * scene's step. Under reduced motion the sheets simply swap.
 */
export function FlipPad() {
  return (
    <Scene id="hour" chapter="The hour" length={3} mobileLength={3} steps={5} underNav aria-label="The pupil’s hour, stage by stage" className="bg-sheet-deep">
      <div className="page grid h-full grid-rows-[auto_1fr] items-center gap-4 py-4 md:py-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10">
        {/* Narration */}
        <div className="lg:col-span-5">
          <p className="hand text-[1.15rem] text-vermilion-ink md:text-[1.3rem]">Wednesday · the hour</p>
          <h2 className="t-headline mt-1 max-w-[14ch] text-[clamp(1.7rem,4.2vw,3.4rem)]">One hour. Five stages.</h2>
          <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-1 md:mt-6" aria-label="Stages">
            {sheets.map((s, i) => (
              <li key={s.name} data-tab={i} className="stage-tab flex items-center gap-1.5 text-[15px]">
                <Dab ink={s.ink} className="stage-dot h-2.5 w-2.5" />
                {s.name}
              </li>
            ))}
          </ol>
          <div className="narr-stack mt-3 max-w-[34ch] text-[1rem] lg:mt-6">
            {LISTENS.map((line, i) => (
              <p key={i} data-only={i} className="leading-snug text-graphite lg:text-[1.15rem]">
                <span className="t-eyebrow mb-2 block text-[0.72rem] text-ink">SOYL is</span>
                {line}
              </p>
            ))}
          </div>
          <p className="mt-6 hidden text-[1.05rem] lg:block">
            <Note ink="graphite" tilt={-1.5}>
              The minutes are ours. Pupils never see a clock.
            </Note>
          </p>
        </div>

        {/* The pad */}
        <div className="flex h-full min-h-0 items-center justify-center lg:col-span-7">
          <div className="pad relative aspect-[4/5] h-full max-h-[min(640px,100%)] w-auto max-w-full sm:aspect-[5/6] lg:aspect-[6/7]">
            <div aria-hidden="true" className="pad-under-shadow absolute inset-x-4 -bottom-4 h-10 rounded-[50%] bg-ink blur-xl" />
            {/* The cardboard back and the stack's edge. */}
            <div aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-2.5 rounded-[6px] bg-[#c9b99a]" />
            <div aria-hidden="true" className="absolute inset-0 translate-x-[3px] translate-y-[5px] rounded-[6px] border border-ink/10 bg-[#fbf8f1]" />
            <Binding />
            {sheets.map((s, i) => {
              const image: EditorialImage = images[s.image];
              const last = i === sheets.length - 1;
              return (
                <article
                  key={s.name}
                  data-sheet={i}
                  data-last={last ? '' : undefined}
                  aria-label={`${s.name}, minute ${s.minute}`}
                  className="pad-sheet flex flex-col overflow-hidden rounded-[6px] border border-ink/10 bg-[#fffdf8] shadow-[0_2px_0_rgba(31,28,25,0.06)]"
                  style={{ '--i': i, zIndex: sheets.length - i } as CSSProperties}
                >
                  <div className="relative mx-3 mt-7 min-h-[96px] flex-1 overflow-hidden rounded-[3px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 520px, 90vw"
                      placeholder="blur"
                      className="object-cover"
                      style={image.focus ? { objectPosition: image.focus } : undefined}
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#fffdf8]/95 px-2.5 py-1 text-[13px] font-semibold text-ink">
                      <Dab ink={s.ink} className="h-2.5 w-2.5" />
                      {String(i + 1).padStart(2, '0')} / 05
                    </span>
                  </div>
                  <div className="flex shrink-0 flex-col px-5 pb-4 pt-3 md:px-6 md:pb-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-none tracking-[-0.02em]">{s.name}</h3>
                      <span className="hand shrink-0 text-[1rem] text-graphite">minute {s.minute}</span>
                    </div>
                    {s.method !== s.name && <p className={cn('hand text-[1.05rem]', INK_TEXT[s.ink])}>{s.method}</p>}
                    <p className="mt-2 text-[0.98rem] leading-snug md:text-[1.15rem]">{s.does}</p>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-dashed border-ink/20 pt-3 text-[0.85rem]">
                      <span className="text-graphite">
                        <span className="font-semibold text-ink">Captured:</span> {s.captured}
                      </span>
                      <span className="hand text-[1rem] leading-tight text-vermilion-ink">{s.rule}</span>
                    </div>
                  </div>
                  <span aria-hidden="true" className="pad-shade pointer-events-none absolute inset-0 bg-ink" />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Scene>
  );
}
