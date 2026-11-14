import { Photo } from '@/components/media/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Dab, type Ink } from '@/components/brush/marks';
import { images, type EditorialImage } from '@/content/images';

interface Module {
  short: string;
  title: string;
  build: string;
  image: EditorialImage;
  ink: Ink;
  backdrop: 'blue' | 'red' | 'yellow';
}

const MODULES: Module[] = [
  { short: 'Software', title: 'Software and computing', build: 'Python, APIs and a SQLite database: the software core of the team’s product.', image: images.fbSoftware, ink: 'ultramarine', backdrop: 'blue' },
  { short: 'AI', title: 'AI and automation', build: 'A trained image-recognition model and a smart assistant inside the product.', image: images.fbAi, ink: 'vermilion', backdrop: 'red' },
  { short: 'IoT', title: 'IoT and robotics', build: 'A device that senses and acts: ESP32, sensors and a servo, on their own kit.', image: images.fbIot, ink: 'ochre', backdrop: 'yellow' },
  { short: 'Business', title: 'Entrepreneurship', build: 'Customer interviews, a cost sheet and a three-minute pitch for Demo Day.', image: images.fbPitch, ink: 'sap', backdrop: 'blue' },
];

const MILESTONES = [
  { when: 'Before the first class', what: 'Orientation: meet the instructors, set up the tools' },
  { when: 'Before the IoT module', what: 'The hardware kit arrives at home' },
  { when: 'The final session', what: 'Demo Day: teams pitch to parents and guests' },
];

const STACK = ['Python tool', 'AI model', 'Device', 'Pitch'];

/**
 * The camp, module by module (ADR-033): four pages from a maker's notebook, each with a taped photo, then the
 * milestones and how the layers add up to Demo Day. The summer camp's exact dates and timetable are shared after
 * registration, so no weeks or session counts are stated.
 */
export function Curriculum({ timing }: { timing?: string }) {
  return (
    <section className="section bg-sheet-deep" aria-labelledby="weeks-heading">
      <div className="page">
        <SectionHeader
          id="weeks-heading"
          label="The programme"
          num="02"
          title={
            <>
              Four modules. One <span className="t-accent">working</span> product.
            </>
          }
          intro="Each module adds a layer to the same team project, so by Demo Day the code, the AI and the hardware fit together."
        />

        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <li key={m.title} className="flex flex-col" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <Photo
                image={m.image}
                aspect="aspect-[4/3]"
                reveal={false}
                backdrop={m.backdrop}
                backdropSide={i % 2 ? 'right' : 'left'}
                sizes="(min-width: 1320px) 290px, (min-width: 640px) 45vw, 100vw"
              />
              <p className="hand mt-7 flex items-center gap-2 text-[1.2rem] text-graphite">
                <Dab ink={m.ink} />
                Module {i + 1} · {m.short}
              </p>
              <h3 className="t-title mt-1">{m.title}</h3>
              <p className="mt-3 text-graphite">
                <span className="font-semibold text-ink">They build: </span>
                {m.build}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-[1fr_auto] lg:items-center" data-reveal>
          <ol className="grid gap-4 sm:grid-cols-3">
            {MILESTONES.map((m, i) => (
              <li key={m.when} className="flex gap-3">
                <span className="t-num font-serif text-[1.6rem] italic leading-none text-vermilion-ink">{i + 1}</span>
                <p className="text-ink">
                  <span className="hand block text-[1.15rem] text-graphite">{m.when}</span>
                  {m.what}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {timing && (
          <p className="t-small mt-6 max-w-[70ch] text-graphite" data-reveal>
            {timing}.
          </p>
        )}

        {/* How the layers stack into the capstone. */}
        <div className="leaf mt-10 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8" data-reveal>
          <p className="max-w-[28ch] font-serif text-[1.5rem] leading-tight">One team project runs through all four modules.</p>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 text-[15px] font-semibold" aria-label="How the project grows">
            {STACK.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="sketch-soft px-3.5 py-1.5">{s}</span>
                <span aria-hidden="true" className="hand text-[1.3rem] text-graphite">
                  {i < STACK.length - 1 ? '+' : '='}
                </span>
              </li>
            ))}
            <li>
              <span className="btn-brush inline-block bg-ink px-4 py-1.5 text-sheet">Demo Day</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
