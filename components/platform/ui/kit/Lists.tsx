/**
 * Lists, tables, status and schedules (design language v3, ADR-032). Server-safe.
 *
 * - StatusPill: a short status in a soft pill ("Live", "Due Sat", "Submitted"), optional dot; text always written.
 * - List + ListRow: rows inside a card with quiet dividers; a row with `href` is one link (44 px+ tall).
 * - DataTable: the v3 table look (no grid lines, header in subtle caps, soft row hover), in a focusable scroll
 *   region so a wide table never widens a 360 px page.
 * - Timeline: upcoming items (live mocks, deadlines) as time + dot + card, like a day schedule.
 */
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../cx';
import type { Tint } from './tints';
import s from './Lists.module.css';

/* ── StatusPill ────────────────────────────────────────────────────────────── */

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'live' | 'highlight';

export function StatusPill({ tone = 'neutral', dot, children, className }: { tone?: StatusTone; dot?: boolean; children: ReactNode; className?: string }) {
  return (
    <span className={cx(s.pill, className)} data-tone={tone}>
      {(dot || tone === 'live') && <span className={s.pillDot} aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ── List / ListRow ────────────────────────────────────────────────────────── */

export function List({ children, label, className, inset }: { children: ReactNode; label?: string; className?: string; /** No card around it. */ inset?: boolean }) {
  return (
    <ul className={cx(s.list, inset && s.listInset, className)} aria-label={label}>
      {children}
    </ul>
  );
}

export interface ListRowProps {
  href?: string;
  /** Avatar, IconTile or a rank. */
  leading?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  /** Right side: a StatusPill, a number, a ButtonLink (only when the row itself has no href). */
  trailing?: ReactNode;
  /** Highlight the row (e.g. the current chapter, "You"). */
  current?: boolean;
  lang?: string;
  className?: string;
  'data-testid'?: string;
}

export function ListRow({ href, leading, title, meta, trailing, current, lang, className, 'data-testid': testId }: ListRowProps) {
  const body = (
    <>
      {leading && <span className={s.leading}>{leading}</span>}
      <span className={s.rowText}>
        <span className={s.rowTitle} lang={lang}>
          {title}
        </span>
        {meta && <span className={s.rowMeta}>{meta}</span>}
      </span>
      {trailing && <span className={s.trailing}>{trailing}</span>}
    </>
  );
  return (
    <li className={cx(s.rowItem, className)} data-current={current || undefined} data-testid={testId}>
      {href ? (
        <Link href={href} className={cx(s.row, s.rowLink)} aria-current={current ? 'page' : undefined}>
          {body}
        </Link>
      ) : (
        <div className={s.row}>{body}</div>
      )}
    </li>
  );
}

/* ── DataTable ─────────────────────────────────────────────────────────────── */

export interface DataTableProps {
  /** The table's caption (its accessible name); visually hidden with `hideCaption`. */
  caption: string;
  hideCaption?: boolean;
  /** <thead> and <tbody>. Mark numeric cells with className={dataTableNum}. */
  children: ReactNode;
  dense?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function DataTable({ caption, hideCaption, children, dense, className, 'data-testid': testId }: DataTableProps) {
  return (
    <div className={cx(s.tableWrap, className)} role="region" aria-label={caption} tabIndex={0} data-testid={testId}>
      <table className={cx(s.table, dense && s.dense)}>
        <caption className={hideCaption ? 'p-visually-hidden' : s.caption}>{caption}</caption>
        {children}
      </table>
    </div>
  );
}

/** Class for numeric cells (right-aligned, tabular figures). */
export const dataTableNum: string = s.num;

/* ── Timeline ──────────────────────────────────────────────────────────────── */

export interface TimelineItem {
  id: string;
  /** "10:00" or "Sat". */
  time: string;
  /** Second line under the time ("15 Nov", "IST"). */
  timeSub?: string;
  title: ReactNode;
  meta?: ReactNode;
  href?: string;
  /** Right side: StatusPill ("Live", "Registered"). */
  status?: ReactNode;
  tint?: Tint;
}

export function Timeline({ items, label, className }: { items: readonly TimelineItem[]; label: string; className?: string }) {
  return (
    <ol className={cx(s.timeline, className)} aria-label={label}>
      {items.map((it) => {
        const style = { '--tl': `var(--p-tint-${it.tint ?? 'blue'})`, '--tl-ink': `var(--p-tint-${it.tint ?? 'blue'}-ink)` } as CSSProperties;
        const card = (
          <>
            <span className={s.tlTitle}>{it.title}</span>
            {it.meta && <span className={s.tlMeta}>{it.meta}</span>}
            {it.status && <span className={s.tlStatus}>{it.status}</span>}
          </>
        );
        return (
          <li key={it.id} className={s.tlItem} style={style}>
            <span className={s.tlTime}>
              <b>{it.time}</b>
              {it.timeSub && <span>{it.timeSub}</span>}
            </span>
            <span className={s.tlRail} aria-hidden="true">
              <span className={s.tlDot} />
            </span>
            <span className={s.tlCardWrap}>
              {it.href ? (
                <Link href={it.href} className={cx(s.tlCard, s.tlCardLink)}>
                  {card}
                </Link>
              ) : (
                <span className={s.tlCard}>{card}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
