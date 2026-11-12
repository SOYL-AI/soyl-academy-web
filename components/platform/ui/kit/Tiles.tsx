/**
 * Tinted tiles and cards (design language v3, ADR-032). Server-safe; every card that navigates is ONE link.
 *
 * - IconTile: a soft squircle in a tint with an icon or a SubjectGlyph in the tint's ink (decorative).
 * - SubjectCard: a subject (or chapter) as a pastel card: glyph, name, one meta line, optional progress.
 * - ModeTile: a study mode (Lesson, Notes, Flashcards, Practice, Tests) as a tinted tile with an arrow.
 * - ContinueCard: "pick up where you left off": thumbnail, title, "Unit 2 · Lesson 3", progress, Continue pill.
 * Tints come from tints.ts (AA-tested); the subject or mode is always written, colour is never the only cue.
 */
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../cx';
import { Icon, type IconName } from './Icon';
import { STUDY_MODES, type StudyMode, type Tint } from './tints';
import s from './Tiles.module.css';

const tintVars = (tint: Tint) => ({ '--tile': `var(--p-tint-${tint})`, '--tile-ink': `var(--p-tint-${tint}-ink)` }) as CSSProperties;

/* ── IconTile ──────────────────────────────────────────────────────────────── */

export interface IconTileProps {
  icon?: IconName;
  /** Custom content instead of an icon (e.g. <SubjectGlyph kind="maths" />). */
  children?: ReactNode;
  tint?: Tint;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** `inverse`: white tile with the tint's ink (for use ON a tinted card). */
  inverse?: boolean;
  className?: string;
}

const ICON_SIZE = { sm: 16, md: 22, lg: 28, xl: 36 } as const;
const TILE_CLASS = { sm: s.tileSm, md: s.tileMd, lg: s.tileLg, xl: s.tileXl } as const;

export function IconTile({ icon, children, tint = 'blue', size = 'md', inverse, className }: IconTileProps) {
  return (
    <span className={cx(s.iconTile, TILE_CLASS[size], inverse && s.inverse, className)} style={tintVars(tint)} aria-hidden="true">
      {children ?? (icon ? <Icon name={icon} size={ICON_SIZE[size]} /> : null)}
    </span>
  );
}

/* ── Progress (shared by the cards) ─────────────────────────────────────────── */

export interface TileProgress {
  /** 0–100. */
  value: number;
  /** Written next to the bar and used as the accessible text ("42% done", "3 of 12 chapters"). */
  label: string;
}

function TileBar({ progress }: { progress: TileProgress }) {
  const v = Math.max(0, Math.min(100, Math.round(progress.value)));
  return (
    <span className={s.progress}>
      <span className={s.bar} aria-hidden="true">
        <span className={s.barFill} style={{ width: `${v}%` }} />
      </span>
      <span className={s.progressLabel}>{progress.label}</span>
    </span>
  );
}

/* ── SubjectCard ───────────────────────────────────────────────────────────── */

export interface SubjectCardProps {
  href: string;
  title: string;
  /** One line under the title ("14 chapters", "Board exam: 12 Mar"). */
  meta?: ReactNode;
  tint: Tint;
  /** The glyph (<SubjectGlyph kind=… />); shown in a white tile on the tinted card. */
  art?: ReactNode;
  progress?: TileProgress;
  /** Top-right corner (a Badge or StatusPill). */
  badge?: ReactNode;
  /** `tinted` (default): pastel card. `plain`: white card with a tinted glyph tile (dense lists, senior stage). */
  variant?: 'tinted' | 'plain';
  lang?: string;
  /** Render inside a list (CardGrid): wraps the link in <li>. Default true. */
  listItem?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function SubjectCard({ href, title, meta, tint, art, progress, badge, variant = 'tinted', lang, listItem = true, className, 'data-testid': testId }: SubjectCardProps) {
  const card = (
    <Link href={href} className={cx(s.subject, variant === 'plain' && s.plain, className)} style={tintVars(tint)} data-tint={tint} data-testid={testId}>
      <span className={s.subjectTop}>
        <IconTile tint={tint} size="lg" inverse={variant === 'tinted'}>
          {art}
        </IconTile>
        {badge && <span className={s.badge}>{badge}</span>}
      </span>
      <span className={s.subjectTitle} lang={lang}>
        {title}
      </span>
      {meta && <span className={s.meta}>{meta}</span>}
      {progress && <TileBar progress={progress} />}
    </Link>
  );
  return listItem ? <li className={s.item}>{card}</li> : card;
}

/* ── ModeTile ──────────────────────────────────────────────────────────────── */

export interface ModeTileProps {
  mode: StudyMode;
  /** Omit with `disabled` (e.g. "Flashcards: coming soon"). */
  href?: string;
  /** Defaults to the mode's name. */
  title?: string;
  /** "12 lessons", "77 questions", "Coming soon". */
  meta?: ReactNode;
  disabled?: boolean;
  /** Overrides (rare): the mode's tint and icon come from STUDY_MODES. */
  tint?: Tint;
  icon?: IconName;
  listItem?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function ModeTile({ mode, href, title, meta, disabled, tint, icon, listItem = true, className, 'data-testid': testId }: ModeTileProps) {
  const m = STUDY_MODES[mode];
  const body = (
    <>
      <IconTile icon={icon ?? m.icon} tint={tint ?? m.tint} size="md" inverse />
      <span className={s.modeText}>
        <span className={s.modeTitle}>{title ?? m.label}</span>
        {meta && <span className={s.meta}>{meta}</span>}
      </span>
      {!disabled && <Icon name="arrowRight" size={18} className={s.modeArrow} />}
    </>
  );
  const props = { className: cx(s.mode, disabled && s.modeDisabled, className), style: tintVars(tint ?? m.tint), 'data-mode': mode, 'data-testid': testId };
  const tile =
    disabled || !href ? (
      <div {...props} aria-disabled={disabled || undefined}>
        {body}
      </div>
    ) : (
      <Link href={href} {...props}>
        {body}
      </Link>
    );
  return listItem ? <li className={s.item}>{tile}</li> : tile;
}

/* ── ContinueCard ──────────────────────────────────────────────────────────── */

export interface ContinueCardProps {
  href: string;
  /** Small line above the title (default "Continue where you left off"). */
  eyebrow?: string;
  title: string;
  /** "Science · Chapter 1 · Part 2 of 3". */
  meta?: ReactNode;
  progress?: TileProgress;
  /** Thumbnail content (a SubjectGlyph) on the tinted thumbnail. */
  art?: ReactNode;
  tint?: Tint;
  /** The pill's text (default "Continue"). */
  cta?: string;
  lang?: string;
  className?: string;
  'data-testid'?: string;
}

export function ContinueCard({ href, eyebrow = 'Continue where you left off', title, meta, progress, art, tint = 'blue', cta = 'Continue', lang, className, 'data-testid': testId }: ContinueCardProps) {
  return (
    <Link href={href} className={cx(s.continue, className)} style={tintVars(tint)} data-testid={testId}>
      <span className={s.thumb} aria-hidden="true">
        {art ?? <Icon name="play" size={36} />}
      </span>
      <span className={s.continueText}>
        <span className={s.eyebrow}>{eyebrow}</span>
        <span className={s.continueTitle} lang={lang}>
          {title}
        </span>
        {meta && <span className={s.meta}>{meta}</span>}
        {progress && <TileBar progress={progress} />}
      </span>
      <span className={s.cta}>
        <Icon name="play" size={16} />
        {cta}
      </span>
    </Link>
  );
}
