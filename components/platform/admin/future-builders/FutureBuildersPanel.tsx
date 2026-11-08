'use client';

/**
 * Future Builders registrations and enquiries (ADR-027; superadmin). Replaces the Google Sheet: summary tiles
 * (registrations, total collected, failed confirmation emails, enquiries), the two tables with "Load more",
 * a CSV download of each (the server export, audited) and "Resend" of a parent's confirmation email.
 * Filters: IST date range (both tables), email status (registrations), kind (enquiries). Personal data lives
 * only in this component's state; nothing is stored in the browser.
 */
import { useCallback, useEffect, useState } from 'react';
import { ApiError, isApiError, type FbEnrollment, type FbEnrollmentsPage, type FbLead, type FbLeadsPage, type Problem } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, Skeleton } from '@/components/platform/ui/kit/Display';
import { api } from '../../lib/api-browser';
import { problemMessage } from '../../lib/problems';
import { downloadCsv } from '../analytics/Charts';
import { istToday } from '../analytics/model';
import {
  EMAIL_STATUSES,
  EMPTY_FILTERS,
  emailStatusTone,
  enrollmentQuery,
  exportFileName,
  exportUrl,
  filterError,
  istDateTime,
  KIND_LABELS,
  LEAD_KINDS,
  leadQuery,
  OFFER_LABELS,
  rupees,
  type EmailStatusFilter,
  type FbFilters,
  type LeadKindFilter,
} from './model';
import s from '../analytics/analytics.module.css';

const PAGE = 50;

/** GET a CSV export through the same-origin proxy and save it; problems surface as ApiError like api.get. */
async function fetchCsv(url: string): Promise<string> {
  const res = await fetch(url, { credentials: 'same-origin', cache: 'no-store', headers: { accept: 'text/csv, application/problem+json' } });
  if (res.ok) return res.text();
  let problem: Problem | null = null;
  try {
    problem = (await res.json()) as Problem;
  } catch {
    // not JSON
  }
  throw new ApiError(res.status, problem?.code ?? (res.status === 401 ? 'unauthenticated' : 'http_error'), problem);
}

export default function FutureBuildersPanel({ onProblem }: { onProblem: (err: unknown) => void }) {
  const [draft, setDraft] = useState<FbFilters>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<FbFilters>(EMPTY_FILTERS);
  const [enrollments, setEnrollments] = useState<FbEnrollmentsPage | null>(null);
  const [leads, setLeads] = useState<FbLeadsPage | null>(null);
  const [busy, setBusy] = useState<'enrollments' | 'leads' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fail = useCallback(
    (err: unknown) => {
      if (isApiError(err, 'mfa_required')) onProblem(err);
      else setError(problemMessage(err));
    },
    [onProblem],
  );

  const loadEnrollments = useCallback(
    async (f: FbFilters, cursor: string | null) => {
      setBusy('enrollments');
      try {
        const page = await api.get('/v1/admin/future-builders/enrollments', { query: { ...enrollmentQuery(f), limit: PAGE, ...(cursor ? { cursor } : {}) } });
        setEnrollments((prev) => (cursor && prev ? { ...page, enrollments: [...prev.enrollments, ...page.enrollments] } : page));
      } catch (err) {
        fail(err);
      } finally {
        setBusy(null);
      }
    },
    [fail],
  );

  const loadLeads = useCallback(
    async (f: FbFilters, cursor: string | null) => {
      setBusy('leads');
      try {
        const page = await api.get('/v1/admin/future-builders/leads', { query: { ...leadQuery(f), limit: PAGE, ...(cursor ? { cursor } : {}) } });
        setLeads((prev) => (cursor && prev ? { ...page, leads: [...prev.leads, ...page.leads] } : page));
      } catch (err) {
        fail(err);
      } finally {
        setBusy(null);
      }
    },
    [fail],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reload both tables when the applied filters change
    setError(null);
    void loadEnrollments(filters, null).then(() => loadLeads(filters, null));
  }, [filters, loadEnrollments, loadLeads]);

  const draftError = filterError(draft);
  const today = istToday();

  const download = async (what: 'enrollments' | 'leads') => {
    setError(null);
    try {
      const csv = await fetchCsv(exportUrl(what, filters));
      downloadCsv(exportFileName(what === 'enrollments' ? 'registrations' : 'enquiries', filters, today), csv);
    } catch (err) {
      fail(err);
    }
  };

  const onResent = (id: string, emailStatus: FbEnrollment['emailStatus']) =>
    setEnrollments((prev) => (prev ? { ...prev, enrollments: prev.enrollments.map((e) => (e.id === id ? { ...e, emailStatus } : e)) } : prev));

  return (
    <div className={s.dash} data-testid="future-builders">
      <p className={s.note} role="note">
        Registrations arrive from the marketing site after the payment is verified. Contact details are shown in full: every view and download is recorded in the audit log.
      </p>
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}

      <form
        className={s.customRange}
        aria-label="Filters"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draftError) setFilters(draft);
        }}
      >
        <label>
          From (IST)
          <input className={s.input} type="date" value={draft.from} max={today} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
        </label>
        <label>
          To (IST)
          <input className={s.input} type="date" value={draft.to} max={today} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
        </label>
        <label>
          Email status
          <select className={s.input} value={draft.emailStatus} onChange={(e) => setDraft({ ...draft, emailStatus: e.target.value as EmailStatusFilter })}>
            <option value="">All</option>
            {EMAIL_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </label>
        <label>
          Enquiry kind
          <select className={s.input} value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value as LeadKindFilter })}>
            <option value="">All</option>
            {LEAD_KINDS.map((k) => (
              <option key={k} value={k}>
                {KIND_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit" variant="secondary" disabled={Boolean(draftError)}>
          Apply
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setDraft(EMPTY_FILTERS);
            setFilters(EMPTY_FILTERS);
          }}
        >
          Clear
        </Button>
        {draftError && <p className={s.hint}>{draftError}</p>}
      </form>

      <div className={s.kpis} aria-live="polite">
        <Tile label="Registrations" value={enrollments ? String(enrollments.summary.count) : null} testId="fb-count" />
        <Tile label="Total collected" value={enrollments ? rupees(enrollments.summary.totalPaise) : null} testId="fb-total" />
        <Tile label="Confirmation emails failed" value={enrollments ? String(enrollments.summary.emailFailed) : null} testId="fb-failed" />
        <Tile label="Enquiries" value={leads ? String(leads.summary.count) : null} testId="fb-leads" />
      </div>

      <section aria-labelledby="fb-reg-title" className={s.panel}>
        <div className={s.panelHead}>
          <h3 id="fb-reg-title" className={s.panelTitle}>
            Registrations
          </h3>
          <Button variant="ghost" size="sm" onClick={() => void download('enrollments')}>
            Download CSV
          </Button>
        </div>
        {!enrollments && <Skeleton lines={4} />}
        {enrollments && <EnrollmentTable rows={enrollments.enrollments} onResent={onResent} onProblem={fail} />}
        {enrollments?.nextCursor && (
          <Button variant="secondary" size="sm" loading={busy === 'enrollments'} onClick={() => void loadEnrollments(filters, enrollments.nextCursor)}>
            Load more
          </Button>
        )}
      </section>

      <section aria-labelledby="fb-leads-title" className={s.panel}>
        <div className={s.panelHead}>
          <h3 id="fb-leads-title" className={s.panelTitle}>
            Enquiries
          </h3>
          <Button variant="ghost" size="sm" onClick={() => void download('leads')}>
            Download CSV
          </Button>
        </div>
        {!leads && <Skeleton lines={3} />}
        {leads && <LeadTable rows={leads.leads} />}
        {leads?.nextCursor && (
          <Button variant="secondary" size="sm" loading={busy === 'leads'} onClick={() => void loadLeads(filters, leads.nextCursor)}>
            Load more
          </Button>
        )}
      </section>
    </div>
  );
}

function Tile({ label, value, testId }: { label: string; value: string | null; testId: string }) {
  return (
    <div className={s.kpi} data-testid={testId}>
      <p className={s.kpiLabel}>{label}</p>
      <p className={s.kpiValue}>{value ?? '–'}</p>
    </div>
  );
}

function EnrollmentTable({ rows, onResent, onProblem }: { rows: FbEnrollment[]; onResent: (id: string, status: FbEnrollment['emailStatus']) => void; onProblem: (err: unknown) => void }) {
  const header = ['Receipt no.', 'Paid at (IST)', 'Parent', 'Student', 'Email', 'Phone', 'Grade', 'Amount', 'Offer', 'Coupon', 'Payment ID', 'Email status', ''];
  return (
    // Focusable so keyboard users can scroll the wide table at 360 px (axe scrollable-region-focusable).
    <div className={s.tableScroll} tabIndex={0} role="region" aria-label="Registrations">
      <table className={s.table} data-testid="fb-registrations">
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={i} scope="col" className={h === 'Amount' ? s.num : undefined}>
                {h || <span className="p-visually-hidden">Actions</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={header.length} className={s.muted}>
                No registrations match these filters.
              </td>
            </tr>
          )}
          {rows.map((r) => (
            <tr key={r.id}>
              <th scope="row">{r.receiptNumber}</th>
              <td>{istDateTime(r.paidAt)}</td>
              <td>{r.parentName}</td>
              <td>{r.studentName}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{r.grade}</td>
              <td className={s.num}>{rupees(r.amountPaise)}</td>
              <td>{OFFER_LABELS[r.offer] ?? r.offer}</td>
              <td>{r.coupon ?? ''}</td>
              <td>
                <code>{r.razorpayPaymentId}</code>
              </td>
              <td>
                <Badge tone={emailStatusTone(r.emailStatus)}>{r.emailStatus}</Badge>
              </td>
              <td>
                <ResendButton row={r} onResent={onResent} onProblem={onProblem} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResendButton({ row, onResent, onProblem }: { row: FbEnrollment; onResent: (id: string, status: FbEnrollment['emailStatus']) => void; onProblem: (err: unknown) => void }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  return (
    <span>
      <Button
        variant="secondary"
        size="sm"
        loading={busy}
        aria-label={`Resend confirmation for ${row.receiptNumber}`}
        onClick={async () => {
          setBusy(true);
          setDone(null);
          try {
            const r = await api.post('/v1/admin/future-builders/enrollments/{id}/resend', { params: { id: row.id }, body: {} });
            setDone(r.emailStatus === 'sent' ? 'Sent' : 'Failed');
            if (r.emailStatus === 'sent') onResent(row.id, 'sent');
          } catch (err) {
            onProblem(err);
          } finally {
            setBusy(false);
          }
        }}
      >
        Resend
      </Button>{' '}
      {done && (
        <span className={s.muted} role="status">
          {done}
        </span>
      )}
    </span>
  );
}

function LeadTable({ rows }: { rows: FbLead[] }) {
  const header = ['Received (IST)', 'Kind', 'Parent', 'Student', 'Email', 'Phone', 'Grade', 'Form'];
  return (
    <div className={s.tableScroll} tabIndex={0} role="region" aria-label="Enquiries">
      <table className={s.table} data-testid="fb-enquiries">
        <thead>
          <tr>
            {header.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={header.length} className={s.muted}>
                No enquiries match these filters.
              </td>
            </tr>
          )}
          {rows.map((r) => (
            <tr key={r.id}>
              <th scope="row">{istDateTime(r.createdAt)}</th>
              <td>{KIND_LABELS[r.kind] ?? r.kind}</td>
              <td>{r.parentName}</td>
              <td>{r.studentName ?? ''}</td>
              <td>{r.email ?? ''}</td>
              <td>{r.phone}</td>
              <td>{r.grade ?? ''}</td>
              <td>
                <code>{r.source}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
