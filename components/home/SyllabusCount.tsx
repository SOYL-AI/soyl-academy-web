'use client';

import { InkLink } from '@/components/ink/Button';
import { examLabel, learnPath } from '@/components/platform/lib/catalog';
import { TASTE } from '@/content/taste.generated';
import { cn } from '@/lib/utils';
import { useDoor } from './DoorState';

/**
 * Your syllabus, counted (plan §4, device 3): for the class chosen on the door, each subject's chapters in the
 * 2026-27 syllabus as a row of squares, washed in where a chapter is written and open today, an outline where it is
 * still to come ("an untouched chapter is an outline, a finished one is washed in"). Counted at build time by
 * scripts/build-taste.mjs from platform/catalog and the released chapters; nothing here is typed by hand.
 * Only rendered with the platform on (it sits in the taste section).
 */
const ROWS = 8;

/** Subject pigments (DESIGN.md): Mathematics indigo, Science and Physics madder, Chemistry turmeric, Biology leaf,
 *  the social sciences and commerce henna, languages and the rest ink. */
function pigment(name: string): string {
  const n = name.toLowerCase();
  if (/math/.test(n)) return 'bg-indigo';
  if (/social|history|geograph|civics|economics|political|sociology|psychology|commerce|business|account|entrepreneur/.test(n)) return 'bg-henna';
  if (/chem/.test(n)) return 'bg-turmeric';
  if (/bio/.test(n)) return 'bg-leaf';
  if (/science|physics/.test(n)) return 'bg-madder';
  return 'bg-ink';
}

export function SyllabusCount() {
  const { board, classLevel } = useDoor();
  const entry = TASTE[`${board}-${classLevel}`];
  if (!entry) return null;
  const { chapters, subjects } = entry.count;
  const label = `${examLabel(board, classLevel)} Class ${classLevel}`;
  const started = subjects.filter((s) => s.written > 0).length;
  const rows = subjects.slice(0, ROWS);
  const rest = subjects.slice(ROWS);

  return (
    <div className="mt-14 grid gap-8 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <h3 className="ink-title">{label}, counted.</h3>
        {chapters > 0 ? (
          <p className="mt-4 text-graphite">
            <span className="block font-serif text-[2.75rem] leading-none tracking-[-0.02em] text-ink tabular-nums">{chapters}</span>
            <span className="mt-2 block">
              chapters written so far, across {started} {started === 1 ? 'subject' : 'subjects'}. Every one is free to open.
            </span>
          </p>
        ) : (
          <p className="mt-4 text-graphite">Class {classLevel} chapters are being written now. Until they are ready, Class {entry.fromClass} is open to everyone.</p>
        )}
        <p className="mt-3 text-[0.875rem] text-muted">A filled square is a chapter you can open today; an outline is one still to come. Counted from the 2026-27 syllabus.</p>
        <div className="mt-5">
          <InkLink href={learnPath(board, chapters > 0 ? classLevel : entry.fromClass)} variant="quiet" arrow>
            Open Class {chapters > 0 ? classLevel : entry.fromClass}
          </InkLink>
        </div>
      </div>

      <ul className="space-y-3.5 lg:col-span-8" aria-label={`${label} subjects, chapters written`}>
        {rows.map((s) => (
          <li key={s.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1.5 sm:grid-cols-[11rem_minmax(0,1fr)_3.5rem]">
            <span className="text-[0.9375rem] font-medium text-ink">{s.name}</span>
            <span className="text-right text-[0.875rem] text-muted tabular-nums sm:order-last">
              {s.written}
              {s.syllabus !== null ? `/${s.syllabus}` : ''}
            </span>
            <span
              role="img"
              aria-label={s.syllabus !== null ? `${s.written} of ${s.syllabus} chapters written` : `${s.written} chapters written`}
              className="col-span-2 flex flex-wrap gap-[3px] pt-1 sm:col-span-1"
            >
              {Array.from({ length: s.syllabus ?? s.written }, (_, i) => (
                <span key={i} className={cn('size-2.5 rounded-[2px]', i < s.written ? pigment(s.name) : 'border border-graphite/35')} />
              ))}
            </span>
          </li>
        ))}
        {rest.length ? (
          <li className="pt-1 text-[0.875rem] text-muted">
            Also in the syllabus: {rest.slice(0, 3).map((s) => s.name).join(', ')}
            {rest.length > 3 ? ` and ${rest.length - 3} more` : ''}.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
