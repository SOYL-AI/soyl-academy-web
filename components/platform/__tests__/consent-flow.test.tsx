/**
 * D-039 consent flow on the web: age band, parent email, code entry, approved state + withdraw, the parent's
 * withdraw page (fragment token, button press only), and the consent-needed states linking into the flow.
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type ConsentView } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  session: { state: { status: 'member' } as unknown, openLogin: vi.fn(), refresh: vi.fn(async () => ({ status: 'member' })) },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  pathname: '/ask',
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }), usePathname: () => h.pathname }));

import { ConsentFlow } from '../consent/ConsentFlow';
import { nextFromSearch } from '../consent/ConsentPageClient';
import { ParentWithdrawClient, tokenFromHash } from '../consent/ParentWithdrawClient';
import { AiNotice, consentFlowHref } from '../ai/AiDialogs';

const view = (over: Partial<ConsentView> = {}): ConsentView => ({
  flow: 'builtin',
  status: 'required',
  ageBand: null,
  method: null,
  parentEmailHint: null,
  codeExpiresAt: null,
  grantedAt: null,
  revokedAt: null,
  revokedBy: null,
  policyVersion: '2026-10-28',
  ...over,
});

const TOKEN = `01900000-0000-7000-8000-000000000001.1.${'a'.repeat(43)}`;

beforeEach(() => {
  h.session.state = { status: 'member', user: { id: 'u1', role: 'student', displayName: null, board: 'cbse', classLevel: 10 }, consent: 'required' };
  for (const fn of Object.values(h.api)) fn.mockReset();
  h.session.refresh.mockClear();
});
afterEach(() => cleanup());

const wrap = (ui: React.ReactNode) => render(<ToastProvider>{ui}</ToastProvider>);

describe('ConsentFlow (built-in provider)', () => {
  it('age step: under 18 → POST minor; then the parent step', async () => {
    h.api.get.mockResolvedValue(view());
    h.api.post.mockResolvedValue(view({ ageBand: 'minor' }));
    wrap(<ConsentFlow />);
    const form = await screen.findByTestId('consent-age');
    fireEvent.click(within(form).getByRole('radio', { name: /Under 18/ }));
    fireEvent.click(within(form).getByRole('button', { name: 'Continue' }));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/me/consent/age-band', { body: { ageBand: 'minor' } }));
    expect(await screen.findByTestId('consent-parent')).toBeTruthy();
    expect(h.session.refresh).toHaveBeenCalled();
  });

  it('age step: 18 or older needs the agreement tick, then turns on', async () => {
    h.api.get.mockResolvedValue(view());
    h.api.post.mockResolvedValue(view({ status: 'granted', ageBand: 'adult', method: 'self_declared', grantedAt: '2026-10-28T06:00:00.000Z' }));
    wrap(<ConsentFlow next="/ask" />);
    const form = await screen.findByTestId('consent-age');
    fireEvent.click(within(form).getByRole('radio', { name: /18 or older/ }));
    fireEvent.click(within(form).getByRole('button', { name: 'Continue' }));
    expect(await within(form).findByRole('alert')).toBeTruthy();
    expect(h.api.post).not.toHaveBeenCalled();
    fireEvent.click(within(form).getByRole('checkbox'));
    fireEvent.click(within(form).getByRole('button', { name: 'Continue' }));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/me/consent/age-band', { body: { ageBand: 'adult', agree: true } }));
    expect(await screen.findByTestId('consent-granted')).toBeTruthy();
    expect(screen.getByTestId('consent-continue').getAttribute('href')).toBe('/ask');
  });

  it('parent step: shows the API’s field message (own email refused)', async () => {
    h.api.get.mockResolvedValue(view({ ageBand: 'minor' }));
    h.api.post.mockRejectedValue(new ApiError(400, 'validation_failed', { type: 't', title: 't', status: 400, code: 'validation_failed', traceId: 'x', errors: [{ path: 'body.parentEmail', message: 'Use your parent’s or guardian’s email, not your own.' }] }));
    wrap(<ConsentFlow />);
    const form = await screen.findByTestId('consent-parent');
    fireEvent.change(within(form).getByLabelText(/Parent’s or guardian’s email/), { target: { value: 'me@example.com' } });
    fireEvent.click(within(form).getByRole('button', { name: 'Send code to my parent' }));
    expect(await within(form).findByText('Use your parent’s or guardian’s email, not your own.')).toBeTruthy();
  });

  it('code step: shows the masked parent email, verifies the 6 digits, handles a wrong code', async () => {
    h.api.get.mockResolvedValue(view({ ageBand: 'minor', status: 'pending', parentEmailHint: 'p•••@example.org', codeExpiresAt: '2026-10-30T06:00:00.000Z' }));
    h.api.post.mockRejectedValueOnce(new ApiError(400, 'consent_code_invalid', null)).mockResolvedValueOnce(view({ ageBand: 'minor', status: 'granted', method: 'parent_email_code', parentEmailHint: 'p•••@example.org', grantedAt: '2026-10-28T06:00:00.000Z' }));
    wrap(<ConsentFlow />);
    const step = await screen.findByTestId('consent-code');
    expect(step.textContent).toContain('p•••@example.org');
    const input = within(step).getByLabelText(/Approval code from your parent/);
    fireEvent.change(input, { target: { value: '111111' } });
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/me/consent/verify', { body: { code: '111111' } }));
    expect(await within(step).findByText(/not right/)).toBeTruthy();
    fireEvent.change(input, { target: { value: '123456' } });
    expect(await screen.findByTestId('consent-granted')).toBeTruthy();
    expect(screen.getByTestId('consent-granted').textContent).toContain('Approved by a parent (p•••@example.org)');
  });

  it('approved: withdraw asks first, then POSTs withdraw and shows the parent step again', async () => {
    h.api.get.mockResolvedValue(view({ ageBand: 'minor', status: 'granted', method: 'parent_email_code', grantedAt: '2026-10-28T06:00:00.000Z' }));
    h.api.post.mockResolvedValue(view({ ageBand: 'minor', status: 'revoked', revokedBy: 'account_holder', revokedAt: '2026-10-28T07:00:00.000Z' }));
    wrap(<ConsentFlow />);
    fireEvent.click(await screen.findByTestId('consent-withdraw'));
    expect(h.api.post).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('consent-withdraw-confirm'));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/me/consent/withdraw'));
    expect(await screen.findByTestId('consent-parent')).toBeTruthy();
    expect(screen.getByTestId('consent-flow').getAttribute('data-consent')).toBe('revoked');
  });

  it('no consent system (flow none): explains, offers no actions', async () => {
    h.api.get.mockResolvedValue(view({ flow: 'none', status: 'pending', policyVersion: '' }));
    wrap(<ConsentFlow />);
    expect(await screen.findByTestId('consent-none')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('external provider: the earlier start-and-redirect card', async () => {
    h.api.get.mockResolvedValue(view({ flow: 'external', status: 'required', policyVersion: '' }));
    wrap(<ConsentFlow />);
    expect(await screen.findByTestId('consent-notice')).toBeTruthy();
  });
});

describe('parent withdraw page', () => {
  it('reads the token from the fragment only, strips it from the address bar and acts only on the button', async () => {
    window.history.replaceState(null, '', `/me/consent/parent#t=${TOKEN}`);
    h.api.post.mockResolvedValue({ status: 'revoked', alreadyWithdrawn: false });
    wrap(<ParentWithdrawClient />);
    const btn = await screen.findByTestId('parent-withdraw-confirm');
    expect(window.location.hash).toBe('');
    expect(h.api.post).not.toHaveBeenCalled();
    fireEvent.click(btn);
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/consent/parent/withdraw', { body: { token: TOKEN } }));
    expect((await screen.findByTestId('parent-withdraw-done')).textContent).toContain('withdrawn');
  });

  it('a missing or malformed token shows a help message and no button', async () => {
    window.history.replaceState(null, '', '/me/consent/parent#t=bad');
    wrap(<ParentWithdrawClient />);
    await waitFor(() => expect(screen.getByTestId('parent-withdraw').getAttribute('data-phase')).toBe('missing'));
    expect(screen.queryByTestId('parent-withdraw-confirm')).toBeNull();
    expect(tokenFromHash(`#t=${TOKEN}`)).toBe(TOKEN);
    expect(tokenFromHash('#t=')).toBeNull();
    expect(tokenFromHash('')).toBeNull();
  });
});

describe('consent-needed states route into the flow', () => {
  it('AiNotice links to /me/consent with a safe next', () => {
    h.pathname = '/leaderboard';
    render(<AiNotice block={{ kind: 'consent' }} feature="Leaderboards" />);
    expect(screen.getByTestId('consent-flow-link').getAttribute('href')).toBe('/me/consent?next=%2Fleaderboard');
    expect(consentFlowHref('/me/consent')).toBe('/me/consent');
    expect(consentFlowHref(null)).toBe('/me/consent');
  });

  it('next is a same-site path or nothing', () => {
    expect(nextFromSearch('?next=%2Fask')).toBe('/ask');
    expect(nextFromSearch('?next=https%3A%2F%2Fevil.example')).toBeNull();
    expect(nextFromSearch('?next=%2F%2Fevil.example')).toBeNull();
    expect(nextFromSearch('')).toBeNull();
  });
});
