import './about.css';
import { Scene } from '@/components/story/Scene';
import { Kinetic } from '@/components/story/Kinetic';
import { BrushArt } from '@/components/brush/BrushArt';
import { Arrow, Marked, Note } from '@/components/brush/marks';
import { PALETTE } from '@/components/brush/palette';

/**
 * /about's title page (ADR-034): a book on the desk. As the page scrolls, its cover swings open (CSS 3D, scrubbed by
 * the scene's progress) and the first page carries the prologue, line by line. On wide screens the inside of the
 * cover becomes the left-hand page, spelling out S·O·Y·L. Under reduced motion the cover simply opens on the
 * first step. One pinned scene, about two and a half screens.
 */
export function BookOpening() {
  return (
    <Scene id="title-page" chapter="Title page" length={2.6} mobileLength={2.3} steps={4} underNav aria-label="Title page">
      <div className="page grid h-full grid-cols-12 content-center items-center gap-y-6 pb-6 md:gap-x-6">
        <div className="col-span-12 lg:col-span-4">
          <p className="hand mb-3 text-[1.25rem] text-vermilion-ink md:mb-5">About SOYL</p>
          <Kinetic as="h1" load text="Story of Your Life." className="t-display max-w-[9ch] text-[clamp(2.6rem,6.4vw,5.4rem)]" />
          <p className="t-lead mt-4 hidden max-w-[34ch] text-graphite sm:block md:mt-6">
            Why assignments are becoming missions, in three short chapters.
          </p>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-8">
          <div className="book-area relative">
            <div className="book">
              {/* The first page: the prologue. */}
              <div className="book-page flex flex-col justify-between p-6 pl-7 md:p-9 md:pl-10">
                <div>
                  <p className="hand text-[1.1rem] text-vermilion-ink" data-at="1">
                    Prologue
                  </p>
                  <p className="mt-2 font-serif text-[clamp(1.55rem,3.2vw,2.35rem)] leading-[1.08] tracking-[-0.015em]" data-at="1">
                    Answers are{' '}
                    <Marked mark="strike" ink="vermilion" weight={3.5}>
                      cheap.
                    </Marked>
                  </p>
                  <p className="font-serif text-[clamp(1.55rem,3.2vw,2.35rem)] leading-[1.08] tracking-[-0.015em]" data-at="2">
                    Thinking is not.
                  </p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-graphite md:text-[1.02rem]" data-at="2">
                    A correct answer used to prove a pupil had learned. Now technology writes it for free.
                  </p>
                </div>
                <div data-at="3">
                  <Note ink="ultramarine" tilt={-2} className="text-[1.15rem] leading-snug md:text-[1.3rem]">
                    So we’re replacing assignments with missions: work that asks pupils to think, and shows how they did.
                  </Note>
                  <Arrow to="down-right" ink="ultramarine" className="mt-1 h-9 w-12" />
                </div>
                <span aria-hidden="true" className="t-num absolute bottom-3 right-4 font-serif text-[0.8rem] italic text-graphite">
                  i
                </span>
              </div>

              {/* The cover. */}
              <div className="book-cover" aria-hidden="true">
                <div className="face face--front">
                  <BrushArt
                    art="thoughtprint"
                    options={{ ridges: 15 }}
                    seed={41}
                    stepMs={45}
                    eager
                    bg={PALETTE.sheetDeep}
                    className="absolute inset-x-[8%] top-[20%] aspect-square"
                  />
                  <span className="book-spine" />
                  <div className="absolute inset-x-0 top-0 px-7 pt-6 md:px-9 md:pt-8">
                    <p className="t-eyebrow text-[0.7rem] text-graphite">SOYL Academy</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 px-7 pb-6 md:px-9 md:pb-8">
                    <p className="font-serif text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1] tracking-[-0.02em] text-ink">
                      <span className="text-ultramarine">S</span>tory <span className="text-vermilion-ink">o</span>f
                      <br />
                      <span className="text-[#9a7414]">Y</span>our <span className="text-sap">L</span>ife
                    </p>
                    <p className="hand mt-2 text-[1rem] text-graphite">Every pupil writes their own.</p>
                  </div>
                </div>
                <div className="face face--back flex flex-col justify-center gap-3 px-8 md:px-10">
                  {[
                    ['S', 'Story', 'text-ultramarine'],
                    ['O', 'of', 'text-vermilion-ink'],
                    ['Y', 'Your', 'text-[#9a7414]'],
                    ['L', 'Life', 'text-sap'],
                  ].map(([l, w, c]) => (
                    <p key={l} className="flex items-baseline gap-4">
                      <span className={`font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] leading-none ${c}`}>{l}</span>
                      <span className="hand text-[1.35rem] text-graphite">{w}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <p className="book-hint hand mt-5 text-center text-[1.05rem] text-graphite md:mt-6" aria-hidden="true">
              Scroll to open
            </p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
