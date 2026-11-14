import './home-story.css';
import { recheck } from '@/content/story';
import { Kinetic } from '@/components/story/Kinetic';
import { Photo } from '@/components/media/Photo';
import { images } from '@/content/images';

/**
 * Chapter six, seven days later (ADR-034): a short, unpinned beat. Ira's dot travels from her Monday group to
 * "Secure" along a drawn line when the section scrolls in.
 */
export function Recheck() {
  return (
    <section id="recheck" data-chapter={recheck.chapter} className="bg-sheet-deep">
      <div className="page grid-12 items-center gap-y-10 py-20 md:py-28">
        <div className="col-span-12 lg:col-span-5">
          <p className="hand text-[1.35rem] text-vermilion-ink">{recheck.time}</p>
          <Kinetic as="h2" text={recheck.headline} className="t-headline mt-2" />
          <p className="t-lead mt-4 max-w-[38ch] text-graphite">{recheck.line}</p>
          <div className="mt-10 max-w-[420px]">
            <Photo image={images.boyWriting} sizes="(min-width: 1024px) 420px, 90vw" aspect="aspect-[3/2]" backdrop="blue" backdropSide="left" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7" data-reveal="fade">
          <div className="relative mx-auto h-[120px] w-[400px] max-w-full">
            <svg viewBox="0 0 400 120" className="ink absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
              <path d="M 20 60 C 120 -10, 260 130, 380 40" pathLength={1} stroke="var(--color-graphite)" strokeWidth="2" strokeDasharray="0.012 0.018" />
            </svg>
            <span aria-hidden="true" className="cross-dot absolute left-0 top-0 -ml-3 -mt-3 block h-6 w-6 rounded-full border-2 border-ink bg-vermilion" />
          </div>
          <div className="mt-4 flex justify-between gap-6 text-[14px]">
            <p className="max-w-[12rem]">
              <span className="block text-[12px] uppercase tracking-[0.1em] text-graphite">Monday</span>
              {recheck.before}
            </p>
            <p className="max-w-[12rem] text-right">
              <span className="block text-[12px] uppercase tracking-[0.1em] text-graphite">Next Tuesday</span>
              <span className="font-semibold text-sap">{recheck.after}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
