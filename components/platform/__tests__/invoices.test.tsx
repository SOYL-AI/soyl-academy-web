import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Invoice } from '@/platform/shared/api-client';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));

import { formatIssueDate, invoiceFileName, invoicePdfUrl, InvoicesClient } from '../billing/InvoicesClient';

const member = { status: 'member', user: { id: 'u1', role: 'student', displayName: 'Asha', board: 'cbse', classLevel: 10 }, consent: 'granted' };
const inv = (over: Partial<Invoice> = {}): Invoice => ({
  id: '11111111-1111-4111-8111-111111111111',
  number: 'SOYL/2026-27/000001',
  type: 'tax_invoice',
  title: 'Invoice',
  issueDate: '2026-10-28',
  totalPaise: 49_900,
  totalLabel: '₹499.00',
  description: 'SOYL Academy Board Exam Pass',
  planName: 'Board Exam Pass',
  originalNumber: null,
  gstRegistered: false,
  ...over,
});

beforeEach(() => {
  h.session.state = member;
  h.api.get.mockReset();
  h.session.openLogin.mockReset();
});
afterEach(() => cleanup());

describe('InvoicesClient (/me/invoices)', () => {
  it('lists invoices and credit notes with owner-only PDF links', async () => {
    h.api.get.mockResolvedValue({
      invoices: [
        inv({ id: '22222222-2222-4222-8222-222222222222', type: 'credit_note', title: 'Credit Note', number: 'SOYL/CN/2026-27/000001', originalNumber: 'SOYL/2026-27/000001', issueDate: '2026-11-02' }),
        inv(),
      ],
    });
    render(<InvoicesClient />);
    await waitFor(() => expect(screen.getByTestId('invoices')).toBeTruthy());
    expect(h.api.get).toHaveBeenCalledWith('/v1/me/invoices');
    const items = document.querySelectorAll('li[data-type]');
    expect(items).toHaveLength(2);
    expect(items[0]!.textContent).toContain('Refund');
    expect(items[0]!.textContent).toContain('against SOYL/2026-27/000001');
    expect(items[0]!.textContent).toContain('− ₹499.00');
    expect(items[1]!.textContent).toContain('₹499.00');
    const links = screen.getAllByTestId('invoice-download') as HTMLAnchorElement[];
    expect(links[1]!.getAttribute('href')).toBe('/api/platform/v1/me/invoices/11111111-1111-4111-8111-111111111111/pdf');
    expect(links[1]!.getAttribute('download')).toBe('SOYL-2026-27-000001.pdf');
    expect(links[1]!.textContent).toContain('Download PDF');
    expect(links[1]!.textContent).toContain('SOYL/2026-27/000001');
  });

  it('empty state points to the plans', async () => {
    h.api.get.mockResolvedValue({ invoices: [] });
    render(<InvoicesClient />);
    await waitFor(() => expect(screen.getByText('No invoices yet')).toBeTruthy());
    expect(screen.getByRole('link', { name: 'See plans' }).getAttribute('href')).toBe('/plans');
  });

  it('guest: asks to log in and comes back here; no API call', () => {
    h.session.state = { status: 'guest' };
    render(<InvoicesClient />);
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(h.session.openLogin).toHaveBeenCalledWith(expect.objectContaining({ returnTo: '/me/invoices' }));
    expect(h.api.get).not.toHaveBeenCalled();
  });

  it('error: retry loads again', async () => {
    h.api.get.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ invoices: [inv()] });
    render(<InvoicesClient />);
    await waitFor(() => expect(screen.getByText('We could not load your invoices')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await waitFor(() => expect(screen.getByTestId('invoices')).toBeTruthy());
  });

  it('helpers', () => {
    expect(invoicePdfUrl('a/b')).toBe('/api/platform/v1/me/invoices/a%2Fb/pdf');
    expect(invoiceFileName('SOYL/CN/2026-27/000001')).toBe('SOYL-CN-2026-27-000001.pdf');
    expect(formatIssueDate('2027-04-01')).toMatch(/1 Apr 2027/);
  });
});
