import './teachers.css';
import { cn } from '@/lib/utils';

/**
 * Pieces of "A teacher's week" (/teachers, ADR-034): the diary's day heading and the hero's week planner.
 * Server components.
 */

export const WEEK = [
  { id: 'friday', day: 'Fri', name: 'Friday', time: '4:00 pm', line: 'Set three outcomes' },
  { id: 'saturday', day: 'Sat', name: 'Saturday', time: 'Over chai', line: 'Read the brief, approve it' },
  { id: 'wednesday', day: 'Wed', name: 'Wednesday', time: 'Period 3', line: 'The class does the mission' },
  { id: 'monday', day: 'Mon', name: 'Monday', time: '8:10 am', line: 'Groups and next moves' },
  { id: 'tuesday', day: 'Tue', name: 'Next Tuesday', time: 'Five minutes', line: 'The recheck' },
] as const;

export type DayId = (typeof WEEK)[number]['id'];

/** A torn-off calendar leaf with the day, and the time in pencil beside it. */
export function DayHeading({ id, className, tone = 'vermilion' }: { id: DayId; className?: string; tone?: 'vermilion' | 'ultramarine' | 'sap' | 'ochre' }) {
  const d = WEEK.find((w) => w.id === id)!;
  const colour = { vermilion: 'text-vermilion-ink', ultramarine: 'text-ultramarine', sap: 'text-sap', ochre: 'text-[#8a6410]' }[tone];
  return (
    <div className={cn('flex items-end gap-4', className)} data-reveal>
      <span className="day-leaf relative grid h-[88px] w-[78px] shrink-0 place-items-center pt-3 rotate-[-3deg] md:h-[100px] md:w-[88px]">
        <span className={cn('font-serif text-[2.1rem] leading-none tracking-[-0.02em] md:text-[2.4rem]', colour)}>{d.day}</span>
      </span>
      <span className="pb-1">
        <span className="hand block text-[1.2rem] leading-none text-graphite">{d.time}</span>
        <span className="mt-1 block font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[0.95] tracking-[-0.025em]">{d.name}</span>
      </span>
    </div>
  );
}

/** The hero's planner: the week as a list of links down the page. */
export function WeekPlanner() {
  return (
    <nav aria-label="The week, day by day" className="leaf relative px-5 pb-4 pt-6 md:px-6">
      <p className="hand text-[1.15rem] leading-none text-vermilion-ink">This week</p>
      <ol className="mt-3">
        {WEEK.map((w, i) => (
          <li key={w.id} className="border-t border-ink/10 first:border-t-0">
            <a
              href={`#${w.id}`}
              className="group grid grid-cols-[2.6rem_1fr_auto] items-baseline gap-3 py-2 text-ink"
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="font-serif text-[1.15rem] italic text-graphite">{w.day}</span>
              <span className="text-[0.98rem] font-medium leading-snug">
                {w.line}
                <span className="hand block text-[1rem] font-normal leading-tight text-graphite">{w.time}</span>
              </span>
              <span aria-hidden="true" className="translate-x-0 text-graphite transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
