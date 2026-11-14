import Image from 'next/image';
import { Scene } from '@/components/story/Scene';
import { Kinetic } from '@/components/story/Kinetic';
import { Label } from '@/components/ui/SectionHeader';
import { Dab, Note, type Ink } from '@/components/brush/marks';
import { images, type EditorialImage } from '@/content/images';
import { cn } from '@/lib/utils';

interface Chapter {
  /** Hand-written over the step: "Module 1 · Software". */
  tag: string;
  title: string;
  build: string;
  /** A milestone that falls at this point of the summer. */
  milestone?: string;
  image: EditorialImage;
  ink: Ink;
  /** The print's resting angle on the pile, in degrees. */
  tilt: number;
  /** Where the print lands on the pile (% of the stage). */
  at: [number, number];
}

const CHAPTERS: Chapter[] = [
  {
    tag: 'Module 1 · Software',
    title: 'Software and computing',
    build: 'Python, APIs and a SQLite database: the software core of the team’s product.',
    milestone: 'Before the first class: orientation, tools set up together.',
    image: images.fbSoftware,
    ink: 'ultramarine',
    tilt: -3,
    at: [0, 4],
  },
  {
    tag: 'Module 2 · AI',
    title: 'AI and automation',
    build: 'A trained image-recognition model and a smart assistant inside the product.',
    image: images.fbAi,
    ink: 'vermilion',
    tilt: 2.5,
    at: [9, 0],
  },
  {
    tag: 'Module 3 · IoT',
    title: 'IoT and robotics',
    build: 'A device that senses and acts: ESP32, sensors and a servo, on their own kit.',
    milestone: 'Before this module: the hardware kit arrives at home.',
    image: images.fbIot,
    ink: 'ochre',
    tilt: -1.5,
    at: [3, 9],
  },
  {
    tag: 'Module 4 · Business',
    title: 'Entrepreneurship',
    build: 'Customer interviews, a cost sheet and a three-minute pitch for Demo Day.',
    image: images.fbPitch,
    ink: 'sap',
    tilt: 3,
    at: [11, 6],
  },
  {
    tag: 'The final session',
    title: 'Demo Day',
    build: 'Teams pitch the working product to parents and guests. Code, device and pitch: theirs to keep.',
    image: images.fbPresentation,
    ink: 'vermilion',
    tilt: -1,
    at: [5, 3],
  },
];

const STACK = ['Python tool', 'AI model', 'Device', 'Pitch'];

/**
 * The summer, told as one pinned scene (ADR-034): as the reader scrolls, each module is dealt onto a pile of prints
 * and the team's project grows a layer (Python tool + AI model + device + pitch = Demo Day). Five steps over about
 * three screens. The camp's exact dates and timetable are shared after registration, so no weeks or session counts
 * are stated. Every step's text stays in the page for screen readers and search; under reduced motion the steps
 * simply appear.
 */
export function Curriculum({ timing }: { timing?: string }) {
  return (
    <section id="the-summer" data-chapter="The summer" className="bg-sheet-deep" aria-labelledby="weeks-heading">
      <div className="page pt-20 md:pt-28">
        <Label num="02" className="mb-5">
          The programme
        </Label>
        <h2 id="weeks-heading" className="t-headline max-w-[18ch]">
          <Kinetic as="span" text="Four modules. One working product." />
        </h2>
        <p className="t-lead mt-5 max-w-[52ch] text-graphite">Each module adds a layer to the same team project. Scroll through the summer.</p>
      </div>

      <Scene length={3.2} mobileLength={3} steps={CHAPTERS.length} underNav aria-label="The summer, module by module">
        <div className="page grid h-full grid-rows-[auto_1fr] gap-4 pb-6 pt-4 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-10 md:py-8">
          {/* The pile of prints */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[calc(44svh*1.33)] md:order-2 md:col-span-7 md:max-w-none">
            {CHAPTERS.map((c, i) => (
              <figure
                key={c.title}
                data-at={i}
                className="absolute bg-white p-1.5 pb-2 shadow-[0_22px_40px_-24px_rgba(31,28,25,0.55)] md:p-2.5 md:pb-3"
                style={{ left: `${c.at[0]}%`, top: `${c.at[1]}%`, width: '86%', rotate: `${c.tilt}deg`, zIndex: i + 1 }}
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 1320px) 640px, (min-width: 768px) 52vw, 86vw"
                    placeholder="blur"
                    className="object-cover"
                    style={c.image.focus ? { objectPosition: c.image.focus } : undefined}
                  />
                </span>
                <figcaption className="hand flex items-center gap-2 px-1 pt-1.5 text-[0.95rem] leading-none text-graphite md:text-[1.1rem]">
                  <Dab ink={c.ink} className="h-2.5 w-2.5" />
                  {c.tag}
                </figcaption>
              </figure>
            ))}
            {/* IMAGERY: wanted — one real Demo Day photo (a team pitching a device to parents) for the last print. */}
          </div>

          {/* The words for each step, stacked in one place */}
          <div className="flex min-h-0 flex-col md:order-1 md:col-span-5">
            <ol className="relative min-h-[12.5rem] md:min-h-[17rem]">
              {CHAPTERS.map((c, i) => (
                <li key={c.title} data-only={i} className="absolute inset-0">
                  <p className="hand flex items-center gap-2 text-[1.1rem] text-graphite md:text-[1.25rem]">
                    <Dab ink={c.ink} />
                    {c.tag}
                  </p>
                  <h3 className="mt-1 font-serif text-[clamp(1.7rem,3.4vw,2.75rem)] leading-[1.04] tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-[15px] text-graphite md:text-[1.05rem]">
                    <span className="font-semibold text-ink">They build: </span>
                    {c.build}
                  </p>
                  {c.milestone && (
                    <p className="mt-3 text-[1.05rem] md:text-[1.15rem]">
                      <Note ink="vermilion-ink" tilt={-1.5}>
                        {c.milestone}
                      </Note>
                    </p>
                  )}
                </li>
              ))}
            </ol>

            {/* The project, one layer per module */}
            <ol className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[14px] font-semibold md:mt-6 md:text-[15px]" aria-label="How the project grows">
              {STACK.map((s, i) => (
                <li key={s} data-at={i} className="flex items-center gap-1.5">
                  <span className="sketch-soft bg-sheet px-3 py-1">{s}</span>
                  <span aria-hidden="true" className="hand text-[1.2rem] text-graphite">
                    {i < STACK.length - 1 ? '+' : '='}
                  </span>
                </li>
              ))}
              <li data-at={STACK.length}>
                <span className="btn-brush inline-block bg-ink px-3.5 py-1 text-sheet">Demo Day</span>
              </li>
            </ol>

            {/* Progress through the summer */}
            <div aria-hidden="true" className="mt-4 hidden md:mt-8 md:block">
              <div className="relative h-[3px] w-full max-w-[22rem] overflow-hidden rounded-full bg-ink/15">
                <span className="scene-thread absolute inset-0 bg-vermilion" />
              </div>
              <div className="mt-2 flex max-w-[22rem] justify-between text-[12px] font-semibold uppercase tracking-[0.08em] text-graphite">
                {['Software', 'AI', 'IoT', 'Business', 'Demo'].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {timing && (
        <div className="page pb-16 md:pb-24">
          <p className={cn('t-small max-w-[70ch] text-graphite')} data-reveal>
            {timing}.
          </p>
        </div>
      )}
    </section>
  );
}
