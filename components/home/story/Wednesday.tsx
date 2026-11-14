import './home-story.css';
import { wednesday } from '@/content/story';
import { Scene } from '@/components/story/Scene';
import { Dab, Marked, Note } from '@/components/brush/marks';

/**
 * Chapter two, Wednesday (ADR-034): the turn of the story. As the reader scrolls, the worksheet tears in two and
 * falls away, and behind it is a mission: one scene, approved by the teacher. Under reduced motion the torn halves
 * are not drawn and the mission simply sits there.
 */
function Worksheet() {
  return (
    <div className="ruled h-full w-full bg-[#fbf8f1] px-6 pt-6 text-ink shadow-[0_30px_60px_-30px_rgba(31,28,25,0.5)]">
      <div className="flex justify-between border-b-2 border-ink/80 pb-2 text-[12px] font-semibold uppercase tracking-[0.12em]">
        <span>Science · Class 8</span>
        <span>Homework</span>
      </div>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="mt-5 flex gap-3 text-[15px]">
          <span className="font-mono text-graphite">{i + 1}.</span>
          <span className="mt-2 h-px flex-1 bg-ink/25" />
        </div>
      ))}
    </div>
  );
}

export function Wednesday() {
  const { mission } = wednesday;
  return (
    <Scene id="wednesday" chapter={wednesday.chapter} length={2.1} mobileLength={1.9} steps={2} className="tear bg-sheet" aria-label="Chapter two: Wednesday">
      <div className="page flex h-full flex-col items-center justify-center gap-8 py-10 text-center md:gap-10">
        <div>
          <p className="hand text-[1.35rem] text-vermilion-ink">{wednesday.time}</p>
          <h2 className="t-headline mx-auto mt-3 max-w-[22ch]">
            So Ms Rao turned{' '}
            <Marked mark="strike" ink="vermilion" className="text-graphite">
              homework
            </Marked>{' '}
            into a mission.
          </h2>
          <p data-at="1" className="t-lead mx-auto mt-4 max-w-[46ch] text-graphite">
            {wednesday.line}
          </p>
        </div>

        <div className="relative w-full max-w-[560px]">
          <div className="mission-reveal relative rotate-[-1deg] bg-white p-6 text-left shadow-[0_30px_70px_-30px_rgba(31,28,25,0.55)] md:p-9">
            <span aria-hidden="true" className="tape absolute -top-3 left-10 h-6 w-24 rotate-[-4deg]" />
            <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-ultramarine">
              <Dab ink="ultramarine" className="h-2.5 w-2.5" />
              {mission.tag}
            </p>
            <p className="mt-4 font-serif text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.1] tracking-[-0.02em]">{mission.scene}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {mission.outcomes.map((o) => (
                <li key={o} className="rounded-full border border-ink/20 px-3 py-1 text-[13px] text-graphite">
                  {o}
                </li>
              ))}
            </ul>
            <div className="absolute -bottom-5 -right-3 rotate-[-8deg] rounded-[6px] border-2 border-sap bg-white/90 px-3 py-1.5 md:-right-6">
              <Note ink="sap" tilt={0} className="text-[1.15rem]">
                ✓ {mission.approved}
              </Note>
            </div>
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-4 -inset-y-6 md:-inset-x-10">
            <div className="tear-left absolute inset-0">
              <Worksheet />
            </div>
            <div className="tear-right absolute inset-0">
              <Worksheet />
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
