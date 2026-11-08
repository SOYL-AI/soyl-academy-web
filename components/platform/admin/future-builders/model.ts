/**
 * Pure helpers for the Future Builders admin section (ADR-027): filters → API query, IST formatting, labels.
 * No React, no DOM (unit-tested in components/platform/__tests__/admin-future-builders.test.tsx).
 */
import type { FbEnrollment } from '@/platform/shared/api-client';
import { API_BROWSER_BASE, buildQuery } from '@/platform/shared/api-client';

export const EMAIL_STATUSES = ['pending', 'sent', 'failed'] as const;
export type EmailStatusFilter = '' | (typeof EMAIL_STATUSES)[number];
export const LEAD_KINDS = ['callback', 'notify', 'waitlist'] as const;
export type LeadKindFilter = '' | (typeof LEAD_KINDS)[number];

export interface FbFilters {
  /** Inclusive IST days; empty = open-ended. */
  from: string;
  to: string;
  emailStatus: EmailStatusFilter;
  kind: LeadKindFilter;
}

export const EMPTY_FILTERS: FbFilters = { from: '', to: '', emailStatus: '', kind: '' };

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Null when the dates are usable, otherwise a message (the API checks again). */
export function filterError(f: Pick<FbFilters, 'from' | 'to'>): string | null {
  if ((f.from && !DAY.test(f.from)) || (f.to && !DAY.test(f.to))) return 'Dates must be YYYY-MM-DD.';
  if (f.from && f.to && f.from > f.to) return 'The start date is after the end date.';
  return null;
}

/** Query for the registrations list/export (empty filters left out). */
export function enrollmentQuery(f: FbFilters): { from?: string; to?: string; emailStatus?: (typeof EMAIL_STATUSES)[number] } {
  return { ...(f.from ? { from: f.from } : {}), ...(f.to ? { to: f.to } : {}), ...(f.emailStatus ? { emailStatus: f.emailStatus } : {}) };
}

/** Query for the enquiries list/export. */
export function leadQuery(f: FbFilters): { from?: string; to?: string; kind?: (typeof LEAD_KINDS)[number] } {
  return { ...(f.from ? { from: f.from } : {}), ...(f.to ? { to: f.to } : {}), ...(f.kind ? { kind: f.kind } : {}) };
}

/** Same-origin proxy URL of a CSV export (GET; the session cookie travels, WEB-5). */
export function exportUrl(what: 'enrollments' | 'leads', f: FbFilters): string {
  const q = what === 'enrollments' ? enrollmentQuery(f) : leadQuery(f);
  return `${API_BROWSER_BASE}/v1/admin/future-builders/${what}/export${buildQuery(q)}`;
}

export function exportFileName(what: 'registrations' | 'enquiries', f: Pick<FbFilters, 'from' | 'to'>, today: string): string {
  return `soyl-future-builders-${what}-${f.from || 'start'}-to-${f.to || today}.csv`;
}

const IST = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
/** "8 Nov 2026, 3:42 pm" (IST). */
export const istDateTime = (iso: string): string => IST.format(new Date(iso));

/** Paise → "₹4,999" or "₹4,999.50" (Indian digit grouping). */
export function rupees(paise: number): string {
  const r = paise / 100;
  return `₹${new Intl.NumberFormat('en-IN', { minimumFractionDigits: Number.isInteger(r) ? 0 : 2, maximumFractionDigits: 2 }).format(r)}`;
}

export const OFFER_LABELS: Record<string, string> = { 'diwali-2026': 'Diwali 2026', standard: 'Standard' };
export const KIND_LABELS: Record<string, string> = { callback: 'Call back', notify: 'Notify me', waitlist: 'Waitlist' };

export function emailStatusTone(status: FbEnrollment['emailStatus']): 'success' | 'warning' | 'danger' {
  return status === 'sent' ? 'success' : status === 'failed' ? 'danger' : 'warning';
}
