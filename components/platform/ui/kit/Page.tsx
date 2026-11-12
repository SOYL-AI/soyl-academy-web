/**
 * Page layout primitives of design language v3 (ADR-032; DESIGN-LANGUAGE.md "Page template"). Server-safe.
 *
 * - PageColumns: the main column plus an optional right rail. Two columns when the page container is at least
 *   1000 px wide (a container query, so it follows the space the app shell leaves, not the window); otherwise one
 *   column with the rail after the main column (or before it: `railFirstOnPhones`).
 * - SectionHeader: a section title with an optional count, description and "See all" link.
 * - PageSection: a <section> labelled by its SectionHeader.
 */
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from './Icon';
import s from './Page.module.css';

export interface PageColumnsProps {
  children: ReactNode;
  /** Right-rail content (RailCards). Rendered as <aside aria-label={railLabel}>. */
  rail?: ReactNode;
  railLabel?: string;
  /** In one column (phones, tablets, the icon-rail desktop), show the rail before the main column. */
  railFirstOnPhones?: boolean;
  className?: string;
}

export function PageColumns({ children, rail, railLabel = 'Your day at a glance', railFirstOnPhones, className }: PageColumnsProps) {
  return (
    <div className={cx(s.columnsWrap, className)}>
      <div className={cx(s.columns, !!rail && s.withRail, railFirstOnPhones && s.railFirst)}>
        <div className={s.main}>{children}</div>
        {rail && (
          <aside className={s.rail} aria-label={railLabel}>
            {rail}
          </aside>
        )}
      </div>
    </div>
  );
}

export interface SectionAction {
  href: string;
  label: string;
}

export interface SectionHeaderProps {
  title: ReactNode;
  /** id of the heading (PageSection uses it for aria-labelledby). */
  id?: string;
  as?: 'h2' | 'h3';
  /** A small count next to the title ("Subjects 6"). */
  count?: number;
  description?: ReactNode;
  /** "See all" link (or any node, e.g. a filter). */
  action?: SectionAction | ReactNode;
  className?: string;
}

function isAction(a: unknown): a is SectionAction {
  return typeof a === 'object' && a !== null && 'href' in a && 'label' in a && typeof (a as SectionAction).href === 'string';
}

export function SectionHeader({ title, id, as: H = 'h2', count, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cx(s.sectionHeader, className)}>
      <div className={s.sectionText}>
        <H id={id} className={s.sectionTitle}>
          {title}
          {typeof count === 'number' && (
            <span className={s.count}>
              <span className="p-visually-hidden">: </span>
              {count.toLocaleString('en-IN')}
            </span>
          )}
        </H>
        {description && <p className={s.sectionDescription}>{description}</p>}
      </div>
      {action &&
        (isAction(action) ? (
          <Link href={action.href} className={s.seeAll}>
            {action.label}
            <Icon name="chevronRight" size={16} />
          </Link>
        ) : (
          <div className={s.sectionAction}>{action}</div>
        ))}
    </div>
  );
}

export interface PageSectionProps extends Omit<SectionHeaderProps, 'className'> {
  /** Required: the heading id that labels the section. */
  id: string;
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function PageSection({ id, children, className, 'data-testid': testId, ...header }: PageSectionProps) {
  return (
    <section className={cx(s.section, className)} aria-labelledby={id} data-testid={testId}>
      <SectionHeader id={id} {...header} />
      {children}
    </section>
  );
}

/** A responsive grid of cards (SubjectCard, ModeTile, StatCard): auto-fill tracks of at least `min` px (default:
 *  the age stage's tile size), one column below that. */
export function CardGrid({ children, min, as: Tag = 'ul', className, label }: { children: ReactNode; min?: number; as?: 'ul' | 'div'; className?: string; label?: string }) {
  const style = min ? ({ '--grid-min': `${min}px` } as CSSProperties) : undefined;
  return (
    <Tag className={cx(s.grid, className)} style={style} aria-label={label}>
      {children}
    </Tag>
  );
}
