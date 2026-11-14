import './home-story.css';
import { thoughtprint } from '@/content/story';
import { Scene } from '@/components/story/Scene';
import { BrushArt } from '@/components/brush/BrushArt';
import { Arrow, Note } from '@/components/brush/marks';

/**
 * Chapter four, the Thoughtprint (ADR-034): the payoff of the hour. A Thoughtprint paints itself, ridge by ridge,
 * and handwritten notes arrive one by one, pointing at where Ira started, where her thinking turned, and what she
 * can now do. Then the rule: no mark, no percentage.
 */
const SPOTS = [
  // Desktop positions around the print (percent of the art box); arrows point inwards.
  {
    box: 'left-[-6%] top-[6%] lg:left-[-30%]',
    arrow: 'down-right' as const,
    arrowBox: 'right-[-22%] top-[60%]',
  },
  {
    box: 'right-[-6%] top-[30%] lg:right-[-30%]',
    arrow: 'down-left' as const,
    arrowBox: 'left-[-24%] top-[55%]',
  },
  {
    box: 'left-[-4%] bottom-[2%] lg:left-[-26%]',
    arrow: 'right' as const,
    arrowBox: 'right-[-26%] top-[20%]',
  },
];

export function ThoughtprintChapter() {
  return (
    <Scene
      id="thoughtprint"
      chapter={thoughtprint.chapter}
      length={2.4}
      mobileLength={2.2}
      steps={4}
      className="bg-sheet"
      aria-label="Chapter four: the Thoughtprint"
    >
      <div className="page grid h-full grid-cols-12 content-center gap-x-6 gap-y-6 py-8">
        <div className="col-span-12 lg:col-span-4">
          <p className="hand text-[1.35rem] text-vermilion-ink">Wednesday, 4:45 pm</p>
          <h2 className="t-headline mt-2 max-w-[13ch]">{thoughtprint.headline}</h2>
          <p className="mt-3 max-w-[36ch] text-graphite max-md:text-[15px] md:mt-4">{thoughtprint.line}</p>
          <p data-at="3" className="mt-6">
            <Note ink="vermilion-ink" tilt={-2} className="text-[1.4rem]">
              {thoughtprint.never}
            </Note>
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="relative mx-auto aspect-square w-[min(100%,calc(100svh-430px),520px)] lg:w-[min(100%,calc(100svh-180px),520px)]">
            <BrushArt art="thoughtprint" options={{}} seed={41} stepMs={45} className="absolute inset-0" />
            <p className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] uppercase tracking-[0.12em] text-graphite">
              Example · Ira · Class 8 · Electricity
            </p>
            {thoughtprint.notes.map((n, i) => (
              <div key={n.text} data-at={n.at} className={`absolute hidden w-[min(15rem,34vw)] md:block ${SPOTS[i]!.box}`}>
                <Note ink="ink" tilt={i % 2 ? 1.5 : -1.5} className="bg-sheet/85 text-[1.15rem] leading-snug">
                  {n.text}
                </Note>
                <Arrow to={SPOTS[i]!.arrow} ink="graphite" className={`absolute h-12 w-16 ${SPOTS[i]!.arrowBox}`} />
              </div>
            ))}
          </div>
          {/* Phones: the notes as a list under the print. */}
          <div className="mt-3 md:hidden">
            <ol className="narr-stack">
              {thoughtprint.notes.map((n) => (
                <li key={n.text} data-at={n.at} data-fade="">
                  <Note ink="ink" tilt={-1} className="text-[1.15rem] leading-snug">
                    {n.text}
                  </Note>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Scene>
  );
}
