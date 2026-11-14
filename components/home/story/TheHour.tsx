import './home-story.css';
import Image from 'next/image';
import { hour } from '@/content/story';
import { images, type EditorialImage, type ImageKey } from '@/content/images';
import { Scene } from '@/components/story/Scene';
import { Dab, Note, type Ink } from '@/components/brush/marks';

/**
 * Chapter three, the hour (ADR-034): a spiral-bound pad whose sheets flip up, one per stage, as the reader scrolls
 * (CSS 3D, driven by the scene's progress, --sp on each sheet). Each sheet is a page of Ira's hour: a photo, what she does, what she thinks,
 * and what SOYL captures. The stage list on the left ticks along. Reduced motion: the sheets swap without turning.
 */
const INK_VAR: Record<string, string> = {
  ochre: 'var(--color-ochre)',
  ultramarine: 'var(--color-ultramarine)',
  vermilion: 'var(--color-vermilion)',
  sap: 'var(--color-sap)',
  graphite: 'var(--color-graphite)',
};

const SOFT: Record<string, string> = {
  ochre: 'var(--color-ochre-soft)',
  ultramarine: 'var(--color-ultramarine-soft)',
  vermilion: 'var(--color-vermilion-soft)',
  sap: 'var(--color-sap-soft)',
  graphite: 'var(--color-sheet-shade)',
};

/** Handwriting has to pass contrast on the white sheet: the light pigments write in ink. */
const HAND: Record<string, Ink | 'vermilion-ink'> = {
  ochre: 'ink',
  ultramarine: 'ultramarine',
  vermilion: 'vermilion-ink',
  sap: 'sap',
  graphite: 'graphite',
};

export function TheHour() {
  const n = hour.stages.length;
  return (
    <Scene id="the-hour" chapter={hour.chapter} length={3.4} mobileLength={3.2} steps={n} progress="targets" className="bg-sheet-deep" aria-label="Chapter three: the hour">
      <div className="page grid h-full grid-cols-12 content-center gap-x-6 gap-y-6 py-8 md:py-10">
        <div className="col-span-12 lg:col-span-5 lg:pr-6">
          <p className="hand text-[1.35rem] text-vermilion-ink">Wednesday, the mission</p>
          <h2 className="t-headline mt-2 max-w-[14ch]">{hour.headline}</h2>
          <p className="mt-4 hidden max-w-[40ch] text-graphite md:block">{hour.intro}</p>
          <ol className="mt-8 hidden space-y-1 lg:block">
            {hour.stages.map((s, i) => (
              <li key={s.name} data-i={i} className="stage-li flex items-center gap-3 font-serif text-[1.5rem] leading-tight">
                <span className="t-num w-6 text-[0.95rem] italic text-graphite">{i + 1}</span>
                {s.name}
                <span aria-hidden="true" className="stage-tick grid h-5 w-5 place-items-center rounded-full text-[12px] text-white" style={{ background: INK_VAR[s.ink] }}>
                  ✓
                </span>
              </li>
            ))}
          </ol>
          <ul className="mt-8 hidden flex-wrap gap-2 lg:flex">
            {hour.rules.map((r) => (
              <li key={r} className="hand rounded-full border border-ink/25 px-3 py-0.5 text-[1.05rem] text-graphite">
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-7">
          <div className="pad relative w-full max-w-[540px]">
            {/* The binding. */}
            <div aria-hidden="true" className="absolute -top-3 left-6 right-6 z-30 flex justify-between">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i} className="pad-ring h-6 w-4" />
              ))}
            </div>
            <div className="relative aspect-[4/5] max-h-[calc(100svh-190px)] w-full sm:aspect-[5/5.4]">
              {hour.stages.map((s, i) => {
                const photo: EditorialImage = images[s.image as ImageKey];
                return (
                  <article
                    key={s.name}
                    data-i={i}
                    data-last={i === n - 1 ? '' : undefined}
                    data-p
                    className="pad-sheet absolute inset-0 flex flex-col bg-[#fdfaf3] px-5 pb-5 pt-7 md:px-7 md:pb-6 md:pt-9"
                    style={{ '--i': i } as React.CSSProperties}
                    aria-label={`Stage ${i + 1} of ${n}: ${s.name}`}
                  >
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-[clamp(2rem,4.4vw,3rem)] leading-none tracking-[-0.02em]">
                        <span className="swipe" style={{ '--swipe': SOFT[s.ink] } as React.CSSProperties}>
                          {s.name}
                        </span>
                      </h3>
                      <span className="hand text-[1.1rem] text-graphite">
                        {i + 1} of {n}
                      </span>
                    </div>
                    <div className="relative mt-4 min-h-0 flex-1 overflow-hidden">
                      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 480px, 90vw" className="object-cover" style={{ objectPosition: photo.focus }} />
                    </div>
                    <p className="mt-4 text-[15px] leading-snug md:text-[16px]">{s.line}</p>
                    <div className="mt-2 flex flex-col items-start gap-1.5 sm:mt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                      <Note ink={HAND[s.ink]} tilt={-1.5} className="max-w-[24ch] text-[1.15rem] leading-tight md:text-[1.35rem]">
                        {s.thought}
                      </Note>
                      <span className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-graphite sm:text-right sm:text-[12px]">
                        <Dab ink={(s.ink === 'graphite' ? 'ink' : s.ink) as Ink} className="h-2.5 w-2.5" />
                        {s.captured}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
