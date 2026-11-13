/**
 * ADR-027 Future Builders admin section: the pure helpers (filters → query, export URL, IST and ₹ formatting,
 * tab gating) and the rendered panel (summary tiles, both tables, resend, CSV download through the proxy).
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FbEnrollment, FbEnrollmentsPage, FbLeadsPage } from '@/platform/shared/api-client';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));

import { emailStatusTone, enrollmentQuery, exportFileName, exportUrl, filterError, istDateTime, leadQuery, rupees, EMPTY_FILTERS } from '../admin/future-builders/model';
import FutureBuildersPanel from '../admin/future-builders/FutureBuildersPanel';
import { tabsFor } from '../admin/analytics/model';
import { AdminApp } from '../admin/AdminApp';

const enrollment = (over: Partial<FbEnrollment> = {}): FbEnrollment => ({
  id: '0193e000-0000-7000-8000-000000000001',
  receiptNumber: 'FB-2027-000001',
  paidAt: '2026-11-08T10:12:00.000Z',
  parentName: 'Meera Rao',
  studentName: 'Arjun Rao',
  email: 'meera@example.com',
  phone: '+919876543210',
  grade: '8',
  amountPaise: 499_900,
  currency: 'INR',
  cohort: 'summer-2027',
  offer: 'diwali-2026',
  coupon: 'FRIEND500',
  friendName: null,
  razorpayPaymentId: 'pay_A1',
  razorpayOrderId: 'order_A1',
  source: 'checkout',
  emailStatus: 'failed',
  emailAttempts: 1,
  emailSentAt: null,
  createdAt: '2026-11-08T10:12:01.000Z',
  ...over,
});

const enrollmentsPage: FbEnrollmentsPage = {
  enrollments: [enrollment(), enrollment({ id: '0193e000-0000-7000-8000-000000000002', receiptNumber: 'FB-2027-000002', emailStatus: 'sent', amountPaise: 400_000, razorpayPaymentId: 'pay_B2' })],
  nextCursor: null,
  summary: { count: 2, totalPaise: 899_900, emailFailed: 1 },
};
const leadsPage: FbLeadsPage = {
  leads: [{ id: '0193e000-0000-7000-8000-0000000000aa', kind: 'callback', parentName: 'Ravi Kumar', studentName: null, email: null, phone: '+919900011122', grade: null, source: 'fb_summer_2027', createdAt: '2026-11-08T05:00:00.000Z' }],
  nextCursor: null,
  summary: { count: 1 },
};

beforeEach(() => {
  h.api.get.mockReset();
  h.api.post.mockReset();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('model', () => {
  it('builds queries without empty filters and validates dates', () => {
    expect(enrollmentQuery(EMPTY_FILTERS)).toEqual({});
    expect(enrollmentQuery({ from: '2026-11-01', to: '', emailStatus: 'failed', kind: 'callback' })).toEqual({ from: '2026-11-01', emailStatus: 'failed' });
    expect(leadQuery({ from: '', to: '2026-11-08', emailStatus: 'failed', kind: 'waitlist' })).toEqual({ to: '2026-11-08', kind: 'waitlist' });
    expect(filterError({ from: '2026-11-08', to: '2026-11-01' })).toMatch(/after the end/);
    expect(filterError({ from: '8/11/2026', to: '' })).toMatch(/YYYY-MM-DD/);
    expect(filterError({ from: '', to: '' })).toBeNull();
  });

  it('export URLs go through the same-origin proxy; names say the range', () => {
    expect(exportUrl('enrollments', { from: '2026-11-01', to: '2026-11-08', emailStatus: '', kind: '' })).toBe('/api/platform/v1/admin/future-builders/enrollments/export?from=2026-11-01&to=2026-11-08');
    expect(exportUrl('leads', { ...EMPTY_FILTERS, kind: 'notify' })).toBe('/api/platform/v1/admin/future-builders/leads/export?kind=notify');
    expect(exportFileName('registrations', EMPTY_FILTERS, '2026-11-08')).toBe('soyl-future-builders-registrations-start-to-2026-11-08.csv');
  });

  it('formats IST times, rupees and email status tones', () => {
    expect(istDateTime('2026-11-08T10:12:00.000Z')).toBe('8 Nov 2026, 3:42 pm');
    expect(rupees(499_900)).toBe('₹4,999');
    expect(rupees(12_345_650)).toBe('₹1,23,456.50');
    expect([emailStatusTone('sent'), emailStatusTone('failed'), emailStatusTone('pending')]).toEqual(['success', 'danger', 'warning']);
  });

  it('shows the Future Builders tab only to accounts whose sections include it', () => {
    expect(tabsFor({ sections: ['analytics', 'users', 'future_builders', 'reports'] }).map((t) => t.id).slice(-3)).toEqual(['users', 'future_builders', 'reports']);
    expect(tabsFor({ sections: ['reports'] }).map((t) => t.id)).toEqual(['reports']);
  });
});

describe('panel', () => {
  const mockLists = () =>
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/admin/future-builders/enrollments') return enrollmentsPage;
      if (path === '/v1/admin/future-builders/leads') return leadsPage;
      throw new Error(path);
    });

  it('shows the totals and both tables, and resends a confirmation', async () => {
    mockLists();
    h.api.post.mockResolvedValue({ emailStatus: 'sent' });
    render(<FutureBuildersPanel onProblem={vi.fn()} />);
    const table = await screen.findByTestId('fb-registrations');
    expect((await screen.findByTestId('fb-count')).textContent).toContain('2');
    expect(screen.getByTestId('fb-total').textContent).toContain('₹8,999');
    expect(screen.getByTestId('fb-failed').textContent).toContain('1');
    await waitFor(() => expect(screen.getByTestId('fb-leads').textContent).toContain('1'));
    const rows = within(table).getAllByRole('row');
    expect(rows).toHaveLength(3);
    expect(rows[1]!.textContent).toContain('FB-2027-000001');
    expect(rows[1]!.textContent).toContain('8 Nov 2026, 3:42 pm');
    expect(rows[1]!.textContent).toContain('+919876543210');
    expect(rows[1]!.textContent).toContain('₹4,999');
    expect(rows[1]!.textContent).toContain('Early-bird');
    expect(rows[1]!.textContent).toContain('pay_A1');
    expect(within(await screen.findByTestId('fb-enquiries')).getByText('Ravi Kumar')).toBeTruthy();
    expect(h.api.get).toHaveBeenCalledWith('/v1/admin/future-builders/enrollments', { query: { limit: 50 } });

    fireEvent.click(screen.getByRole('button', { name: 'Resend confirmation for FB-2027-000001' }));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/admin/future-builders/enrollments/{id}/resend', { params: { id: enrollment().id }, body: {} }));
    expect(await within(rows[1]!).findByRole('status')).toHaveProperty('textContent', 'Sent');
    await waitFor(() => expect(within(screen.getByTestId('fb-registrations')).getAllByRole('row')[1]!.textContent).toContain('sent'));
  });

  it('applies filters to both lists and downloads the server CSV', async () => {
    mockLists();
    const fetchMock = vi.fn(async (url: string) => new Response(url.includes('/export') ? 'Receipt number\r\n' : '', { status: 200, headers: { 'content-type': 'text/csv; charset=utf-8' } }));
    vi.stubGlobal('fetch', fetchMock);
    const created: Blob[] = [];
    vi.stubGlobal('URL', Object.assign(URL, { createObjectURL: (b: Blob) => (created.push(b), 'blob:x'), revokeObjectURL: () => undefined }));
    render(<FutureBuildersPanel onProblem={vi.fn()} />);
    await screen.findByTestId('fb-registrations');

    fireEvent.change(screen.getByLabelText('From (IST)'), { target: { value: '2026-11-01' } });
    fireEvent.change(screen.getByLabelText('Email status'), { target: { value: 'failed' } });
    fireEvent.change(screen.getByLabelText('Enquiry kind'), { target: { value: 'callback' } });
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
    await waitFor(() => expect(h.api.get).toHaveBeenCalledWith('/v1/admin/future-builders/enrollments', { query: { from: '2026-11-01', emailStatus: 'failed', limit: 50 } }));
    await waitFor(() => expect(h.api.get).toHaveBeenCalledWith('/v1/admin/future-builders/leads', { query: { from: '2026-11-01', kind: 'callback', limit: 50 } }));

    // The first download button belongs to Registrations, the second to Enquiries.
    fireEvent.click(screen.getAllByRole('button', { name: 'Download CSV' })[0]!);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0]![0]).toBe('/api/platform/v1/admin/future-builders/enrollments/export?from=2026-11-01&emailStatus=failed');
    await waitFor(() => expect(created).toHaveLength(1));
  });

  it('a superadmin opens it from the admin tabs', async () => {
    h.session.state = { status: 'member', user: { id: 'u1', role: 'admin', name: 'A' }, consent: null };
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/admin/me') return { userId: 'u1', role: 'admin', capabilities: ['superadmin'], sections: ['analytics', 'users', 'future_builders', 'reports'] };
      if (path === '/v1/admin/analytics/overview') return new Promise(() => {});
      if (path === '/v1/admin/future-builders/enrollments') return enrollmentsPage;
      if (path === '/v1/admin/future-builders/leads') return leadsPage;
      throw new Error(path);
    });
    render(<AdminApp />);
    const tablist = await screen.findByRole('tablist', { name: 'Admin sections' });
    const tab = within(tablist).getByRole('tab', { name: 'Future Builders' });
    fireEvent.click(tab);
    expect(await screen.findByTestId('fb-registrations')).toBeTruthy();
  });
});
