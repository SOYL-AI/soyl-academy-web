'use client';

/**
 * End of a lesson part (lazy chunk; loaded when the student presses Finish): a small celebration (CSS + inline
 * SVG; still under prefers-reduced-motion), the summary (slides, quick checks right), where the progress is
 * saved, and the ways on. The primary next step (next part / practice) sits in the bottom bar, in thumb reach.
 */
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/platform/ui/kit/Icon';
import type { LessonLinks } from './SlidePlayer';
import type { CompletionSummary } from './player-logic';
import s from './lesson.module.css';

/** Confetti pieces: direction, spin and brand colour (decoration only). */
const PIECES: { dx: number; dy: number; r: number; c: string; round?: boolean }[] = [
  { dx: -70, dy: -58, r: 200, c: 'var(--p-brand-blue)' },
  { dx: 66, dy: -62, r: -160, c: 'var(--p-brand-red)' },
  { dx: -84, dy: 6, r: 120, c: 'var(--p-brand-yellow)', round: true },
  { dx: 86, dy: 2, r: -220, c: 'var(--p-success)' },
  { dx: -46, dy: 64, r: 260, c: 'var(--p-brand-red)', round: true },
  { dx: 50, dy: 60, r: -90, c: 'var(--p-brand-blue)' },
  { dx: -14, dy: -84, r: 180, c: 'var(--p-success)', round: true },
  { dx: 22, dy: 82, r: -240, c: 'var(--p-brand-yellow)' },
  { dx: -92, dy: -30, r: 90, c: 'var(--p-accent)', round: true },
  { dx: 94, dy: -26, r: -120, c: 'var(--p-brand-yellow)' },
  { dx: -64, dy: 40, r: 300, c: 'var(--p-brand-blue)' },
  { dx: 70, dy: 36, r: -300, c: 'var(--p-brand-red)', round: true },
];

export interface CompletionScreenProps {
  heading: string;
  summary: CompletionSummary;
  /** The completion is stored (account or this device). */
  saved: boolean;
  isMember: boolean;
  links: LessonLinks;
  /** The next step already offered in the bottom bar (not repeated here). */
  primaryHref: string;
  onRestart: () => void;
}

export function CompletionScreen({ heading, summary, saved, isMember, links, primaryHref, onRestart }: CompletionScreenProps) {
  const others: { href: string; label: string }[] = [];
  if (links.practice && links.practice !== primaryHref) others.push({ href: links.practice, label: 'Practise questions' });
  if (links.flashcards) others.push({ href: links.flashcards, label: 'Flashcards' });
  if (links.notes) others.push({ href: links.notes, label: 'Read the notes' });
  if (links.hub !== primaryHref) others.push({ href: links.hub, label: 'Back to the chapter' });
  const marked = summary.answered - summary.selfMarked;
  return (
    <section className={s.done} aria-labelledby="lesson-done-title" data-testid="lesson-complete">
      <div className={s.celebrate} aria-hidden="true">
        <svg className={s.confetti} viewBox="-88 -88 176 176" width="176" height="176">
          {PIECES.map((p, i) =>
            p.round ? (
              <circle key={i} cx="0" cy="0" r="4" fill={p.c} style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--r': `${p.r}deg` } as CSSProperties} />
            ) : (
              <rect key={i} x="-3" y="-6" width="6" height="12" rx="1.5" fill={p.c} style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--r': `${p.r}deg` } as CSSProperties} />
            ),
          )}
        </svg>
        <span className={s.medal}>
          <Icon name="check" size={40} />
        </span>
      </div>
      <h2 id="lesson-done-title" className={s.doneTitle} tabIndex={-1}>
        {heading}
      </h2>
      <p className={s.doneHeadline}>{summary.headline}</p>
      <ul className={s.stats}>
        <li className={s.stat}>
          <span className={s.statValue}>{summary.slides}</span>
          <span className={s.statLabel}>slides done</span>
        </li>
        {summary.checks > 0 && (
          <li className={s.stat}>
            <span className={s.statValue}>{marked > 0 ? `${summary.right}/${marked}` : `${summary.answered}/${summary.checks}`}</span>
            <span className={s.statLabel}>{marked > 0 ? 'checks right' : 'checks answered'}</span>
          </li>
        )}
      </ul>
      <p className={s.doneDetail}>{summary.detail}</p>
      <p className={s.saved} data-testid="lesson-saved">
        {saved && <Icon name="checkCircle" size={16} className={s.savedOk} />}
        {saved ? (isMember ? 'Saved to your account.' : 'Saved on this device. Log in to keep it across devices.') : 'Saving your progress…'}
      </p>
      <div className={s.doneLinks}>
        {others.map((o) => (
          <Link key={o.href} href={o.href} className={s.secondaryLink}>
            {o.label}
          </Link>
        ))}
        <button type="button" className={s.secondaryLink} onClick={onRestart}>
          <Icon name="rotate" size={16} /> Go through it again
        </button>
      </div>
    </section>
  );
}
