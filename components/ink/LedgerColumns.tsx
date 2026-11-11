import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Dab } from './Dab';
import s from './LedgerColumns.module.css';

/** What is free, always (CLAUDE.md golden rule 3, CONTEXT §5). The homepage ledger lists the same four. */
export const FREE_ALWAYS = ['Lessons', 'Notes and flashcards', 'Practice with instant checks', 'Chapter tests, mock papers and All-India mocks'] as const;

/**
 * The honest ledger as two columns (plan §4, device 2): free, always, against the one metered thing, AI help, and
 * why it is metered. Without section chrome, so a page puts its own heading over it: /plans inside the app (it
 * follows the app's theme) and /parents on paper. `children` go in the metered column, under the reason (the
 * credits meter, the prices). No number is written here.
 */
export function LedgerColumns({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn(s.ledger, className)} data-testid="ledger">
      <div className={s.col}>
        <p className={s.label}>Free, always</p>
        <ul className={s.items}>
          {FREE_ALWAYS.map((item) => (
            <li key={item} className={s.item}>
              <Dab pigment="leaf" className={s.dab} />
              {item}
            </li>
          ))}
        </ul>
        <p className={s.note}>Tests and mock papers need a free account. Lessons and practice do not.</p>
      </div>
      <div className={s.col}>
        <p className={s.label}>Metered</p>
        <p className={s.item}>
          <Dab pigment="turmeric" className={s.dab} />
          AI help
        </p>
        <p className={s.why}>AI costs money to run, so it is the one thing with a meter.</p>
        {children}
      </div>
    </div>
  );
}
