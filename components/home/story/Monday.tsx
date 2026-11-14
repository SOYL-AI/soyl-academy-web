import './home-story.css';
import Image from 'next/image';
import { monday } from '@/content/story';
import { images } from '@/content/images';
import { Scene } from '@/components/story/Scene';
import { seededRandom } from '@/components/brush/random';

/**
 * Chapter five, Monday morning (ADR-034): the class re-sorts itself. Thirty-two pupils start scattered (a class
 * list); as the reader scrolls they move into groups by misconception, take their group's colour, and each group
 * gets a next move. Hover or focus a group to pick out its pupils. Positions are computed here, on the server, in
 * container units, so the movement is pure CSS (`--sp` on each dot); reduced motion shows the grouped board.
 */
const INK: Record<string, string> = {
  vermilion: 'var(--color-vermilion)',
  ochre: 'var(--color-ochre)',
  ultramarine: 'var(--color-ultramarine)',
  sap: 'var(--color-sap)',
};

interface Dot {
  g: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x1m: number;
  y1m: number;
  ira: boolean;
}

function layout(): Dot[] {
  const rand = seededRandom(810);
  const dots: Dot[] = [];
  monday.groups.forEach((group, g) => {
    for (let k = 0; k < group.count; k++) {
      // Desktop: four columns; dots in a 3-wide grid under each label.
      const x1 = g * 25 + 6.5 + (k % 3) * 6;
      const y1 = 42 + Math.floor(k / 3) * 9.5;
      // Phones: a 2 × 2 grid of groups; dots 4 wide.
      const gx = (g % 2) * 50;
      const gy = Math.floor(g / 2) * 50;
      const x1m = gx + 8 + (k % 4) * 10.5;
      const y1m = gy + 31 + Math.floor(k / 4) * 5;
      dots.push({ g, x0: 6 + rand() * 88, y0: 10 + rand() * 80, x1, y1, x1m, y1m, ira: g === 0 && k === 0 });
    }
  });
  return dots;
}

export function Monday() {
  const dots = layout();
  const photo = images.emptyClassroom;
  return (
    <Scene id="monday" chapter={monday.chapter} length={2.7} mobileLength={2.5} steps={3} progress="targets" className="bg-sheet" aria-label="Chapter five: Monday morning">
      <div className="page grid h-full grid-cols-12 content-center gap-x-8 gap-y-6 py-8">
        <div className="col-span-12 lg:col-span-4">
          <p className="hand text-[1.35rem] text-vermilion-ink">{monday.time}</p>
          <ol className="narr-stack-m mt-3 space-y-4">
            {monday.lines.map((line, i) => (
              <li
                key={line}
                data-at={i}
                data-fade={i < monday.lines.length - 1 ? '' : undefined}
                className="max-w-[24ch] font-serif text-[clamp(1.3rem,2.2vw,2rem)] leading-[1.15] tracking-[-0.015em]"
              >
                {line}
              </li>
            ))}
          </ol>
          <div className="relative mt-8 hidden aspect-[3/2] w-[78%] rotate-[-2deg] bg-white p-2 shadow-[0_24px_50px_-28px_rgba(31,28,25,0.5)] lg:block">
            <span aria-hidden="true" className="tape absolute -top-3 left-8 z-10 h-5 w-16 rotate-[-5deg]" />
            <div className="relative h-full w-full overflow-hidden">
              <Image src={photo.src} alt={photo.alt} fill sizes="300px" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="leaf relative bg-white p-3 md:p-5">
            <div className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-2">
              <p className="font-semibold">Needs attention · Electricity</p>
              <p className="text-[12px] uppercase tracking-[0.1em] text-graphite">{monday.label}</p>
            </div>
            <div className="board relative mt-3 aspect-[4/5] w-full md:aspect-[16/10]">
              {/* Columns first, dots after: the hover rules use `.group-col:hover ~ .dot` (no :has, which every dot
                  re-checked on every scroll frame). Dots draw above the columns by z-index. */}
              {monday.groups.map((group, g) => (
                <div
                  key={group.name}
                  data-g={g}
                  tabIndex={0}
                  role="group"
                  aria-label={`${group.count} pupils: ${group.name}`}
                  className="group-col absolute rounded-[8px] p-2 outline-offset-2 hover:bg-sheet/60 focus-visible:bg-sheet/60"
                  style={{ '--gl': g * 25, '--glm': (g % 2) * 50, '--gtm': Math.floor(g / 2) * 50 } as React.CSSProperties}
                >
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold leading-tight md:text-[14px]">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: INK[group.ink] }} />
                    {group.count}
                  </p>
                  <p className="mt-1 text-[12px] leading-tight text-ink md:text-[14px]">{group.name}</p>
                  <p data-at="2" className="hand mt-1 text-[0.85rem] leading-[1.1] text-graphite md:absolute md:bottom-2 md:left-2 md:right-2 md:text-[1.05rem]">
                    {group.move}
                  </p>
                </div>
              ))}
              {dots.map((d, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  data-g={d.g}
                  data-ira={d.ira ? '' : undefined}
                  data-p
                  className="dot"
                  style={
                    {
                      '--x0': d.x0.toFixed(2),
                      '--y0': d.y0.toFixed(2),
                      '--x1': d.x1.toFixed(2),
                      '--y1': d.y1.toFixed(2),
                      '--x1m': d.x1m.toFixed(2),
                      '--y1m': d.y1m.toFixed(2),
                      '--c': INK[monday.groups[d.g]!.ink],
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <p className="sr-only">
              An example class of 32 pupils, grouped after a mission:{' '}
              {monday.groups.map((g) => `${g.count} ${g.name.toLowerCase()} (next move: ${g.move})`).join('; ')}.
            </p>
            <p className="mt-2 text-[12px] text-graphite">
              <span className="mr-1 inline-block h-3 w-3 rounded-full border-2 border-ink align-[-2px]" /> Ira
            </p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
