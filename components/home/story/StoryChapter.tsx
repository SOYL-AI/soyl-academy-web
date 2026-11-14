import './home-story.css';
import { story } from '@/content/story';
import { Scene } from '@/components/story/Scene';
import { BrushArt } from '@/components/brush/BrushArt';
import { PALETTE } from '@/components/brush/palette';

/**
 * Chapter seven, the Story (ADR-034): where the company's name lands. Ira's Thoughtprints, one per mission, drift
 * past as pages of a sketchbook while the reader scrolls; then "Story of Your Life." Reduced motion: the pages are
 * a row you can swipe.
 */
const TILTS = [-2.2, 1.4, -0.8, 2, -1.6, 0.9, -2.4, 1.2];

export function StoryChapter() {
  return (
    <Scene id="the-story" chapter={story.chapter} length={2.6} mobileLength={2.4} steps={3} className="bg-sheet" aria-label="Chapter seven: the Story">
      <div className="flex h-full flex-col justify-center gap-6 pb-20 pt-16 md:gap-12 md:py-10">
        <div className="page">
          <p className="hand text-[1.35rem] text-vermilion-ink">{story.time}</p>
          <h2 className="t-headline mt-2 max-w-[24ch]">{story.headline}</h2>
          <p className="mt-3 max-w-[52ch] text-graphite max-md:text-[15px] md:mt-4">{story.line}</p>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Ira’s Story: one Thoughtprint per mission"
          className="story-track pl-5 md:pl-10 xl:pl-[max(3.5rem,calc((100vw-1320px)/2+3.5rem))]">
          <ol className="story-row flex w-max gap-5 pr-10 md:gap-8">
            {story.pages.map((pg, i) => (
              <li
                key={pg.title}
                className="story-page w-[46vw] max-w-[260px] shrink-0 bg-white p-3 pb-4 shadow-[0_24px_50px_-30px_rgba(31,28,25,0.5)] md:w-[min(260px,30svh)]"
                style={{ '--r': `${TILTS[i % TILTS.length]}deg` } as React.CSSProperties}
              >
                <div className="relative aspect-square w-full">
                  <BrushArt art="thoughtprint" options={{ ridges: 11, blooms: i % 3 !== 2 }} seed={pg.seed} stepMs={0} bg={PALETTE.sheet} className="absolute inset-0" />
                </div>
                <p className="mt-3 flex items-baseline justify-between text-[12px] uppercase tracking-[0.1em] text-graphite">
                  <span>{pg.subject}</span>
                  <span className="hand text-[1rem] normal-case tracking-normal">{pg.month}</span>
                </p>
                <p className="mt-1 font-serif text-[1.25rem] leading-tight">{pg.title}</p>
              </li>
            ))}
          </ol>
        </div>

        <p data-at="2" className="page font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-none tracking-[-0.025em]">
          <span className="text-ultramarine">S</span>tory <span className="text-vermilion-ink">o</span>f <span className="text-[#9a7414]">Y</span>our{' '}
          <span className="text-sap">L</span>ife.
        </p>
      </div>
    </Scene>
  );
}
