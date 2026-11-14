import './home-story.css';
import Image from 'next/image';
import { tuesday } from '@/content/story';
import { images } from '@/content/images';
import { Scene } from '@/components/story/Scene';

/**
 * Chapter one, Tuesday night (ADR-034): the old way, felt rather than argued. The stage goes dark; a worksheet sits
 * under a lamp, its question counter and countdown running as the reader scrolls (the two things SOYL never shows a
 * pupil), until Friday's score lands on it. Four lines of narration step in on the left.
 */
export function Tuesday() {
  const photo = images.lateNightStudy;
  const { sheet } = tuesday;
  return (
    <Scene id="tuesday" chapter={tuesday.chapter} length={2.8} mobileLength={2.6} steps={4} className="night" aria-label="Chapter one: Tuesday night">
      <div aria-hidden="true" className="night-photo absolute inset-y-0 right-0 w-full lg:w-[68%]">
        <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 68vw, 100vw" className="object-cover" style={{ objectPosition: '40% 50%' }} />
      </div>

      <div className="page relative grid h-full grid-cols-12 content-center gap-x-6 gap-y-8 py-10">
        <div className="col-span-12 lg:col-span-6">
          <p className="hand mb-5 text-[1.35rem] text-[#e9c46a] md:mb-7">{tuesday.time}</p>
          <ol className="narr-stack-m space-y-5">
            {tuesday.lines.map((line, i) => (
              <li
                key={line}
                data-at={i}
                data-fade={i < tuesday.lines.length - 1 ? '' : undefined}
                className="max-w-[24ch] font-serif text-[clamp(1.35rem,2.6vw,2.35rem)] leading-[1.15] tracking-[-0.015em]"
              >
                {line}
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-6 lg:justify-end">
          <div className="worksheet ruled relative w-full max-w-[400px] bg-[#fbf8f1] px-5 pb-6 pt-5 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] md:px-7 md:pb-8">
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink/80 pb-2 text-[12px] font-semibold uppercase tracking-[0.12em]">
              <span>{sheet.subject}</span>
              <span>{sheet.kind}</span>
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[14px]" aria-hidden="true">
              <span>
                Question <span data-count data-from="1" data-to="20" data-range="0.02,0.7">1</span> of 20
              </span>
              <span className="text-vermilion-ink">
                <span data-count data-from="1500" data-to="0" data-format="clock" data-range="0,0.72">25:00</span> left
              </span>
            </div>
            <ol className="mt-4 space-y-4 text-[15px] leading-snug md:text-[16px]">
              {sheet.questions.map((q, i) => (
                <li key={q} className="flex gap-3">
                  <span className="font-mono text-[13px] text-graphite">{i + 13}.</span>
                  <span>
                    {q}
                    <span className="mt-2 block h-px w-full bg-ink/25" />
                  </span>
                </li>
              ))}
            </ol>
            <p className="sr-only">A homework worksheet with a question counter and a countdown timer.</p>
            <div
              data-at="2"
              className="score-stamp absolute -bottom-6 -right-3 grid h-28 w-28 place-items-center rounded-full border-[3px] border-vermilion text-vermilion md:-right-8 md:h-32 md:w-32"
            >
              <span className="font-serif text-[2.4rem] leading-none md:text-[2.8rem]">{sheet.score}</span>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
