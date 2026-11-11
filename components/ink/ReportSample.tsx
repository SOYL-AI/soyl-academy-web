import { reportView, WEEK_DAYS, type ReportView } from '@/lib/pricing/report-sample';
import { cn } from '@/lib/utils';
import { Dab } from './Dab';
import s from './ReportSample.module.css';

/**
 * The report a parent receives (plan §4, device 8), as a SAMPLE: labelled "Sample" at the top and "the figures
 * are made up" at the foot. It shows only fields the platform already computes for a student's week (see
 * lib/pricing/report-sample.ts: each is typed against GET /v1/me/dashboard or /v1/me/credits/history). No name:
 * an account keeps an email address and a board and class, nothing more (D-039).
 *
 * A sheet, not a screenshot: real text, so it reads at any width and in the app's light or dark theme.
 * `titleId` is the heading's id (one sample per page; pass another if a page ever has two).
 */
export function ReportSample({ view = reportView(), titleId = 'report-sample-title', className }: { view?: ReportView; titleId?: string; className?: string }) {
  return (
    <article className={cn(s.sheet, className)} aria-labelledby={titleId} data-testid="report-sample">
      <header>
        <div className={s.top}>
          <h3 id={titleId} className={s.title}>
            Weekly report
          </h3>
          <p className={s.sample}>Sample</p>
        </div>
        <p className={s.who}>{view.who} · Monday to Sunday</p>
      </header>

      <div className={s.days} role="img" aria-label={`Studied on ${view.activeDays} of ${WEEK_DAYS} days`}>
        {Array.from({ length: WEEK_DAYS }, (_, i) => (
          <span key={i} className={cn(s.day, i >= view.activeDays && s.dayOff)} />
        ))}
      </div>

      <dl className={s.rows}>
        {view.rows.map((r) => (
          <div key={r.label} className={s.row}>
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
            {r.note ? <dd className={s.note}>{r.note}</dd> : null}
          </div>
        ))}
      </dl>

      <div>
        <p className={s.label}>Where it got hard</p>
        <ul className={s.stuck}>
          {view.stuck.map((c) => (
            <li key={`${c.subject}-${c.title}`} className={s.chapter}>
              <Dab pigment={c.pigment} className={s.dab} />
              <span>
                <span className={s.chapterTitle}>{c.title}</span>, {c.subject}
              </span>
              {c.note ? <span className={s.chapterNote}>{c.note}</span> : null}
            </li>
          ))}
        </ul>
      </div>

      <p className={s.foot}>A sample. The figures are made up to show what the report contains.</p>
    </article>
  );
}
