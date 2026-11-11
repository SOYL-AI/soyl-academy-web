import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import s from './ink.module.css';

export type Ground = 'paper' | 'paper-2' | 'slate';

const GROUND: Record<Ground, string> = {
  paper: s.groundPaper,
  'paper-2': s.groundPaper2,
  slate: s.groundSlate,
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** The ground: paper (default), the alternate paper band, or slate (night). */
  ground?: Ground;
  /** Shorter vertical rhythm, for a band between two full sections. */
  tight?: boolean;
  /** Wrap the children in the page container (`.page`, max 1320 px with the site's gutters). Default true. */
  contained?: boolean;
  children: ReactNode;
}

/**
 * A screen of a marketing page. Sections are short and few (plan §3.2); each has one heading, and at most one
 * drawn stroke under it (`Stroke`). Give it `aria-labelledby` pointing at its heading.
 */
export function Section({ ground = 'paper', tight, contained = true, className, children, ...rest }: SectionProps) {
  return (
    <section className={cn(s.section, tight && s.tight, GROUND[ground], className)} {...rest}>
      {contained ? <div className="page">{children}</div> : children}
    </section>
  );
}
