import { Photo } from '@/components/media/Photo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CONTACT_HOURS } from '@/content/future-builders';
import { images, type EditorialImage } from '@/content/images';
import { cn } from '@/lib/utils';

interface Module {
  /** First and last week (1-based, inclusive). */
  from: number;
  to: number;
  short: string;
  title: string;
  learn: string;
  build: string;
  image: EditorialImage;
  /** Bar fill, dot and week-tag colours. */
  fill: string;
  text: string;
}

const MODULES: Module[] = [
  {
    from: 1,
    to: 4,
    short: 'Software',
    title: 'Software and computing',
    learn: 'Logic, Python, APIs and SQLite databases, from the very first line of code.',
    build: 'A working Python tool with its own database: the software core of the team’s product.',
    image: images.fbSoftware,
    fill: 'bg-cobalt',
    text: 'text-cobalt',
  },
  {
    from: 5,
    to: 6,
    short: 'AI',
    title: 'AI and automation',
    learn: 'Machine learning, deep learning, image processing and reinforcement-learning agents.',
    build: 'A trained image-recognition model and a smart assistant inside the product.',
    image: images.fbAi,
    fill: 'bg-red-pen',
    text: 'text-red-ink',
  },
  {
    from: 7,
    to: 9,
    short: 'IoT',
    title: 'IoT and robotics',
    learn: 'Low-voltage ESP32 electronics, sensors, servos and networking, on their own kit.',
    build: 'A device that senses and acts: sensors and a servo wired to the team’s software.',
    image: images.fbIot,
    fill: 'bg-highlighter',
    text: 'text-ink',
  },
  {
    from: 10,
    to: 12,
    short: 'Business',
    title: 'Entrepreneurship',
    learn: 'Market discovery, customer interviews, cost sheets and how to pitch.',
    build: 'A tested prototype and a three-minute pitch, presented on Demo Day.',
    image: images.fbPitch,
    fill: 'bg-ink',
    text: 'text-ink',
  },
];

const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);
const moduleFor = (week: number) => MODULES.find((m) => week >= m.from && week <= m.to)!;

const MILESTONES = [
  { when: 'Before week 1', what: 'Orientation: meet the instructors, set up the tools' },
  { when: 'Weeks 3–4', what: 'The hardware kit arrives at home' },
  { when: 'Week 12', what: 'Demo Day: teams pitch to parents and guests' },
];

const STACK = ['Python tool', 'AI model', 'Device', 'Pitch'];

/**
 * The 12 weeks: a week bar coloured by module, the milestones, then one card per module.
 * `upcomingName`: an announced cohort whose timetable isn't set; the week plan is
 * then labelled as the weekend format, with its own timetable to come.
 */
export function Curriculum({ upcomingName }: { upcomingName?: string }) {
  return (
    <section className="section bg-paper" aria-labelledby="weeks-heading">
      <div className="page">
        <SectionHeader
          id="weeks-heading"
          label={upcomingName ? 'The programme' : 'The 12 weeks'}
          num="02"
          title={
            <>
              Four modules. One <span className="t-accent">working</span> product.
            </>
          }
          intro={`${CONTACT_HOURS} hours of live, hands-on building. Each module adds a layer to the same team project, so by Demo Day the code, the AI and the hardware fit together.`}
        />

        {/* Week bar: decorative; the same facts are in the module list below. */}
        <div className="mt-12 md:mt-16" data-reveal aria-hidden="true">
          <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
            {MODULES.map((m) => (
              <p
                key={m.short}
                className="t-small truncate pb-2 font-semibold text-ink"
                style={{ gridColumn: `${m.from} / ${m.to + 1}` }}
              >
                {m.short}
              </p>
            ))}
            {WEEKS.map((w) => (
              <div key={w} className="flex flex-col items-center gap-2">
                <span className={cn('h-3 w-full rounded-full sm:h-4', moduleFor(w).fill)} />
                <span className="t-num text-[13px] text-muted">{w}</span>
              </div>
            ))}
          </div>
        </div>

        {upcomingName && (
          <p className="t-small mt-5 max-w-[70ch] text-muted" data-reveal>
            The week plan shows the 12-week weekend format. The {upcomingName}’s detailed timetable is announced at registration.
          </p>
        )}

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" data-reveal>
          {MILESTONES.map((m) => (
            <li key={m.when} className="flex items-start gap-3 rounded-[var(--radius-md)] bg-white px-4 py-3.5">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-pen" />
              <p className="t-small text-ink">
                <span className="block font-semibold">{m.when}</span>
                {m.what}
              </p>
            </li>
          ))}
        </ul>

        <ol className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <li key={m.title} className="flex flex-col" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <Photo image={m.image} aspect="aspect-[4/3]" reveal={false} sizes="(min-width: 1320px) 290px, (min-width: 768px) 45vw, 100vw" />
              <p className="t-label t-num mt-6 flex items-center gap-2 text-muted">
                <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', m.fill)} />
                Weeks {m.from}–{m.to}
              </p>
              <h3 className="t-title mt-2">{m.title}</h3>
              <p className="mt-3 text-muted">
                <span className="font-semibold text-ink">They learn: </span>
                {m.learn}
              </p>
              <p className="mt-auto border-t border-rule-strong pt-4 text-ink">
                <span className={cn('t-label block font-semibold', m.text)}>They build</span>
                {m.build}
              </p>
            </li>
          ))}
        </ol>

        {/* How the layers stack into the capstone. */}
        <div className="module mt-14 flex flex-col gap-5 p-6 md:mt-20 md:flex-row md:items-center md:justify-between md:p-8" data-reveal>
          <p className="max-w-[30ch] font-serif text-[1.5rem] leading-tight">One team project runs through all four modules.</p>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[15px] font-semibold" aria-label="How the project grows">
            {STACK.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-full border border-rule-strong px-3.5 py-1.5">{s}</span>
                <span aria-hidden="true" className="text-muted">{i < STACK.length - 1 ? '+' : '='}</span>
              </li>
            ))}
            <li>
              <span className="rounded-full bg-ink px-3.5 py-1.5 text-white">Demo Day</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
