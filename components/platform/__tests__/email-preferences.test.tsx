/**
 * D-055 email reminders on the web: the /me card (toggle, phone-only note, parent address pending/active, resend,
 * remove, field errors, hidden for staff) and the two email-link pages (fragment token, button press only).
 */
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type EmailPreferences as Prefs } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({ api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() } }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));

import { EmailPreferences } from '../me/EmailPreferences';
import { EmailUnsubscribeClient, ParentConfirmClient, emailTokenFromHash } from '../me/EmailPreferencesLinks';

const prefs = (over: Partial<Prefs> = {}, parent: Partial<Prefs['parent']> = {}): Prefs => ({
  studentEmail: 'a***@gmail.com',
  reminders: true,
  remindersAvailable: true,
  ...over,
  parent: { email: null, status: 'none', reminders: true, unsubscribedAt: null, ...parent },
});
const TOKEN = `01900000-0000-7000-8000-000000000001.s0.${'a'.repeat(43)}`;
const wrap = (ui: React.ReactNode) => render(<ToastProvider>{ui}</ToastProvider>);

beforeEach(() => {
  for (const fn of Object.values(h.api)) fn.mockReset();
});
afterEach(() => {
  cleanup();
  window.history.replaceState(null, '', '/');
});

describe('Email reminders card', () => {
  it('shows the masked address and turns reminders off with PATCH', async () => {
    h.api.get.mockResolvedValue(prefs());
    h.api.patch.mockResolvedValue(prefs({ reminders: false }));
    wrap(<EmailPreferences />);
    const toggle = (await screen.findByTestId('email-reminders-toggle')) as HTMLInputElement;
    expect(toggle.checked).toBe(true);
    expect(screen.getByText(/To a\*\*\*@gmail\.com/)).toBeTruthy();
    fireEvent.click(toggle);
    await waitFor(() => expect(h.api.patch).toHaveBeenCalledWith('/v1/me/email-preferences', { body: { reminders: false } }));
    await waitFor(() => expect((screen.getByTestId('email-reminders-toggle') as HTMLInputElement).checked).toBe(false));
    expect(screen.getByRole('heading', { name: 'Email reminders' })).toBeTruthy();
  });

  it('phone-only accounts get a note instead of the switch', async () => {
    h.api.get.mockResolvedValue(prefs({ studentEmail: null, reminders: false, remindersAvailable: false }));
    wrap(<EmailPreferences />);
    expect(await screen.findByTestId('email-reminders-unavailable')).toBeTruthy();
    expect(screen.queryByTestId('email-reminders-toggle')).toBeNull();
  });

  it('adds a parent address (PUT), shows pending, resends after the cooldown, and removes it', async () => {
    h.api.get.mockResolvedValue(prefs());
    h.api.put.mockResolvedValue({ ...prefs({}, { email: 'm***@home.in', status: 'pending' }), resendAfterSeconds: 0 });
    h.api.post.mockResolvedValue({ ...prefs({}, { email: 'm***@home.in', status: 'pending' }), resendAfterSeconds: 60 });
    h.api.delete.mockResolvedValue(prefs());
    wrap(<EmailPreferences />);
    const box = await screen.findByTestId('parent-email');
    fireEvent.change(within(box).getByLabelText('Parent or guardian’s email'), { target: { value: 'mum@home.in' } });
    fireEvent.click(within(box).getByTestId('parent-email-send'));
    await waitFor(() => expect(h.api.put).toHaveBeenCalledWith('/v1/me/parent-email', { body: { email: 'mum@home.in' } }));
    await waitFor(() => expect(screen.getByTestId('parent-email').getAttribute('data-status')).toBe('pending'));
    expect(screen.getByText('Waiting for them to confirm')).toBeTruthy();
    fireEvent.click(screen.getByTestId('parent-email-resend'));
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/me/parent-email/resend'));
    await waitFor(() => expect((screen.getByTestId('parent-email-resend') as HTMLButtonElement).disabled).toBe(true));
    fireEvent.click(screen.getByTestId('parent-email-remove'));
    await waitFor(() => expect(h.api.delete).toHaveBeenCalledWith('/v1/me/parent-email'));
    await waitFor(() => expect(screen.getByTestId('parent-email').getAttribute('data-status')).toBe('none'));
  });

  it('shows the API field message (own address refused) and the active state with its own switch', async () => {
    h.api.get.mockResolvedValue(prefs());
    h.api.put.mockRejectedValue(new ApiError(400, 'validation_failed', { type: 't', title: 't', status: 400, code: 'validation_failed', traceId: 'x', errors: [{ path: 'body.email', message: 'Use your parent’s or guardian’s email, not your own.' }] }));
    wrap(<EmailPreferences />);
    const box = await screen.findByTestId('parent-email');
    fireEvent.change(within(box).getByLabelText('Parent or guardian’s email'), { target: { value: 'me@gmail.com' } });
    fireEvent.click(within(box).getByTestId('parent-email-send'));
    expect(await screen.findByText(/not your own/)).toBeTruthy();
    cleanup();
    h.api.get.mockResolvedValue(prefs({}, { email: 'm***@home.in', status: 'active' }));
    wrap(<EmailPreferences />);
    expect(await screen.findByText('Confirmed')).toBeTruthy();
    expect(screen.getByTestId('parent-reminders-toggle')).toBeTruthy();
    expect(screen.queryByTestId('parent-email-resend')).toBeNull();
  });

  it('says when a parent unsubscribed; hides itself for staff (403)', async () => {
    h.api.get.mockResolvedValue(prefs({}, { unsubscribedAt: '2026-11-10T06:00:00.000Z' }));
    wrap(<EmailPreferences />);
    expect((await screen.findByTestId('parent-email-unsubscribed')).textContent).toContain('10 November 2026');
    cleanup();
    h.api.get.mockRejectedValue(new ApiError(403, 'forbidden', { type: 't', title: 't', status: 403, code: 'forbidden', traceId: 'x' }));
    wrap(<EmailPreferences />);
    await waitFor(() => expect(h.api.get).toHaveBeenCalled());
    await waitFor(() => expect(screen.queryByTestId('email-reminders')).toBeNull());
  });
});

describe('email link pages', () => {
  it('reads only well-formed tokens from the fragment', () => {
    expect(emailTokenFromHash(`#t=${TOKEN}`)).toBe(TOKEN);
    expect(emailTokenFromHash(`#t=${TOKEN.replace('.s0.', '.x0.')}`)).toBeNull();
    expect(emailTokenFromHash('#t=abc')).toBeNull();
    expect(emailTokenFromHash('')).toBeNull();
  });

  it('unsubscribe: nothing happens until the button; the token leaves the address bar', async () => {
    window.history.replaceState(null, '', `/me/email/unsubscribe#t=${TOKEN}`);
    h.api.post.mockResolvedValue({ kind: 'student', alreadyOff: false });
    wrap(<EmailUnsubscribeClient />);
    const btn = await screen.findByTestId('email-unsubscribe-confirm');
    expect(window.location.hash).toBe('');
    expect(h.api.post).not.toHaveBeenCalled();
    fireEvent.click(btn);
    await waitFor(() => expect(h.api.post).toHaveBeenCalledWith('/v1/email/unsubscribe', { body: { token: TOKEN } }));
    expect((await screen.findByTestId('email-unsubscribe-done')).textContent).toContain('no more reminder emails');
  });

  it('parent confirm: button press only; an expired link explains what to do', async () => {
    const c = TOKEN.replace('.s0.', '.c2.');
    window.history.replaceState(null, '', `/me/email/parent-confirm#t=${c}`);
    h.api.post.mockRejectedValueOnce(new ApiError(410, 'email_link_expired', { type: 't', title: 't', status: 410, code: 'email_link_expired', traceId: 'x' }));
    wrap(<ParentConfirmClient />);
    const btn = await screen.findByTestId('parent-confirm-button');
    expect(h.api.post).not.toHaveBeenCalled();
    fireEvent.click(btn);
    expect(await screen.findByText(/expired or was replaced/)).toBeTruthy();
    h.api.post.mockResolvedValueOnce({ status: 'active', alreadyConfirmed: false });
    fireEvent.click(screen.getByTestId('parent-confirm-button'));
    expect((await screen.findByTestId('parent-confirm-done')).textContent).toContain('confirmed');
  });

  it('a page opened without a token says so', async () => {
    window.history.replaceState(null, '', '/me/email/unsubscribe');
    wrap(<EmailUnsubscribeClient />);
    expect(await screen.findByText(/This link is incomplete/)).toBeTruthy();
  });
});
