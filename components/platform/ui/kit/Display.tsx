import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';
import { Icon, type IconName } from './Icon';
import s from './Display.module.css';

/* ── Card ──────────────────────────────────────────────────────────────────── */

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'li';
  elevated?: boolean;
  flush?: boolean;
}

export function Card({ as: Tag = 'div', elevated, flush, className, ...rest }: CardProps) {
  return <Tag className={cx(s.card, elevated && s.cardElevated, flush && s.cardFlush, className)} {...rest} />;
}

export function CardTitle({ as: Tag = 'h3', className, ...rest }: HTMLAttributes<HTMLHeadingElement> & { as?: 'h2' | 'h3' | 'h4' }) {
  return <Tag className={cx(s.cardTitle, className)} {...rest} />;
}

export function CardMeta({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx(s.cardMeta, className)} {...rest} />;
}

/* ── Badge ─────────────────────────────────────────────────────────────────── */

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'highlight';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  icon?: IconName;
}

export function Badge({ tone = 'neutral', icon, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx(s.badge, tone !== 'neutral' && s[`tone-${tone}`], className)} {...rest}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

/* ── Chip ──────────────────────────────────────────────────────────────────── */

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Toggle chip (filters): renders a button with aria-pressed. Omit for a static chip. */
  selected?: boolean;
  /** Static chip without interaction. */
  static?: boolean;
}

export function Chip({ selected, static: isStatic, className, children, type = 'button', ...rest }: ChipProps) {
  if (isStatic) return <span className={cx(s.chip, className)}>{children}</span>;
  return (
    <button type={type} aria-pressed={selected ?? false} className={cx(s.chip, className)} {...rest}>
      {selected && <Icon name="check" size={16} />}
      {children}
    </button>
  );
}

/* ── ProgressBar ───────────────────────────────────────────────────────────── */

export interface ProgressBarProps {
  value: number;
  max?: number;
  /** Accessible name; shown above the bar unless hideLabel. */
  label: string;
  /** Human text for the value, e.g. "7 of 18 slides". Defaults to a percentage. */
  valueText?: string;
  hideLabel?: boolean;
  thin?: boolean;
  tone?: 'accent' | 'success';
  className?: string;
}

export function ProgressBar({ value, max = 100, label, valueText, hideLabel, thin, tone = 'accent', className }: ProgressBarProps) {
  const safeMax = max > 0 ? max : 1;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const pct = Math.round((clamped / safeMax) * 100);
  const text = valueText ?? `${pct}%`;
  return (
    <div className={cx(s.progress, className)}>
      {!hideLabel && (
        <div className={s.progressLabel} aria-hidden="true">
          <span>{label}</span>
          <span>{text}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-valuetext={text}
        className={cx(s.track, thin && s.trackThin)}
      >
        <div className={cx(s.fill, tone === 'success' && s.fillGood)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ── Skeleton ──────────────────────────────────────────────────────────────── */

export interface SkeletonProps {
  variant?: 'text' | 'block' | 'circle';
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  lines?: number;
  className?: string;
}

/** Decorative placeholder. Wrap the loading region in an element with aria-busy="true". */
export function Skeleton({ variant = 'text', width, height, lines = 1, className }: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <span aria-hidden="true" style={{ display: 'block' }}>
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className={cx(s.skeleton, s.skeletonText, className)} style={{ width: i === lines - 1 ? '60%' : width ?? '100%' }} />
        ))}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cx(s.skeleton, variant === 'text' && s.skeletonText, variant === 'circle' && s.skeletonCircle, className)}
      style={{ width: width ?? (variant === 'circle' ? 40 : '100%'), height: height ?? (variant === 'circle' ? 40 : variant === 'block' ? 120 : undefined) }}
    />
  );
}

/* ── EmptyState ────────────────────────────────────────────────────────────── */

export interface EmptyStateProps {
  title: string;
  children?: ReactNode;
  icon?: IconName;
  /** An illustration (components/platform/ui/art/EmptyIllustration) shown instead of the icon; decorative. */
  art?: ReactNode;
  action?: ReactNode;
  /** h1 when the empty state is the whole page (e.g. a test that could not load). */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export function EmptyState({ title, children, icon = 'book', art, action, headingLevel: H = 'h3', className }: EmptyStateProps) {
  return (
    <div className={cx(s.empty, className)}>
      {art ? (
        <span className={s.emptyArt} aria-hidden="true">
          {art}
        </span>
      ) : (
        <span className={s.emptyIcon}>
          <Icon name={icon} size={26} />
        </span>
      )}
      <H className={s.emptyTitle}>{title}</H>
      {children && <p className={s.emptyBody}>{children}</p>}
      {action}
    </div>
  );
}

/* ── Avatar / Initials ─────────────────────────────────────────────────────── */

/** Light pastels; text is always #171717, so each pair is > 7:1 in light and dark themes. */
const AVATAR_COLOURS = ['#f2d45c', '#c9d3ff', '#bfe6cf', '#ffd2c7', '#e2d4f7', '#cdeaf2'];

export function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/u).filter(Boolean);
  if (words.length === 0) return '?';
  const first = Array.from(words[0])[0] ?? '';
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] ?? '' : '';
  return (first + last).toLocaleUpperCase('en-IN');
}

function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}

export interface AvatarProps {
  /** Display name; only the initials are shown. No remote images (WEB-1, CONTEXT §12). */
  name: string;
  size?: number;
  /** Decorative when the name is printed next to it. */
  decorative?: boolean;
  className?: string;
}

export function Avatar({ name, size = 40, decorative = false, className }: AvatarProps) {
  const bg = AVATAR_COLOURS[hashString(name) % AVATAR_COLOURS.length];
  return (
    <span
      className={cx(s.avatar, className)}
      style={{ width: size, height: size, background: bg, fontSize: Math.round(size * 0.4) }}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': name })}
    >
      {initialsOf(name)}
    </span>
  );
}
