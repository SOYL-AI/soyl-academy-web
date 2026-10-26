'use client';

/**
 * "Report a mistake" (CONTEXT §4, backend-api M2 point 7): a small button on every content page, slide,
 * flashcard and question. Guests and members can report. The form (dialog) is a separate chunk loaded on
 * the first click, so the button costs almost nothing on page load.
 */
import { lazy, Suspense, useState } from 'react';
import type { ContentReportRequest } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Icon } from '@/components/platform/ui/kit/Icon';
import s from './report.module.css';

const ReportDialog = lazy(() => import('./ReportDialog').then((m) => ({ default: m.ReportDialog })));

export type ReportTarget = Omit<ContentReportRequest, 'reason' | 'comment'>;

export interface ReportMistakeProps {
  target: ReportTarget;
  /** What is being reported, for the dialog title ("this slide"). */
  what?: string;
  /** Icon-only button with a visible tooltip label (inside dense UI such as the player bar). */
  compact?: boolean;
  className?: string;
}

/** `itemRef` must match the API pattern (slide/card ids, section indexes, part ids). */
export function safeItemRef(ref: string | number | undefined | null): string | undefined {
  if (ref === undefined || ref === null) return undefined;
  const v = String(ref).slice(0, 64);
  return /^[A-Za-z0-9_.:-]+$/.test(v) ? v : undefined;
}

export function ReportMistake({ target, what = 'this', compact, className }: ReportMistakeProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <button
        type="button"
        className={cx(s.button, compact && s.compact, className)}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        onPointerEnter={() => void import('./ReportDialog')}
        aria-haspopup="dialog"
        aria-label={compact ? `Report a mistake in ${what}` : undefined}
        title={compact ? 'Report a mistake' : undefined}
        data-testid="report-mistake"
      >
        <Icon name="flag" size={16} />
        {!compact && <span>Report a mistake</span>}
      </button>
      {loaded && (
        <Suspense fallback={null}>
          <ReportDialog open={open} onClose={() => setOpen(false)} target={target} what={what} />
        </Suspense>
      )}
    </>
  );
}
