import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@/platform/shared/api-client';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));

import { SlidePlayer, type SlideMeta } from '../lesson/SlidePlayer';
import { FlashcardDeck, nextUnmarked } from '../flashcards/FlashcardDeck';
import { ReportDialog, reportErrorMessage } from '../report/ReportDialog';
import { AdminApp } from '../admin/AdminApp';
import { qrPath } from '../admin/QrCode';
import { GUEST_STORAGE_KEY, readGuestLessonPosition, readGuestProgress, recordGuestLessonPosition } from '../lib/guest-storage';

const member = { status: 'member', user: { id: 'u1', role: 'student', name: 'A' }, consent: null };
const CH = 'cbse-10-science-ch01';

beforeEach(() => {
  window.localStorage.clear();
  h.session.state = { status: 'guest' };
  for (const fn of Object.values(h.api)) fn.mockReset();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function slidesFor(n: number) {
  const slides = Array.from({ length: n }, (_, i) => (
    <article key={i} data-testid={`slide-${i}`}>
      <h2>Slide {i + 1}</h2>
      <img src="https://cdn.example/x.png" alt="" loading="lazy" />
    </article>
  ));
  const meta: SlideMeta[] = Array.from({ length: n }, (_, i) => ({ id: `s${i + 1}`, heading: `Slide ${i + 1}`, narration: 'Plants make food. They use sunlight.', audio: null }));
  return { slides, meta };
}

function player(n = 5, extra: Partial<Parameters<typeof SlidePlayer>[0]> = {}) {
  const { slides, meta } = slidesFor(n);
  return render(
    <ToastProvider>
      <SlidePlayer chapterId={CH} part={1} firstPart slides={slides} meta={meta} links={{ hub: '/learn/cbse/10/science/ch01', practice: '/p', notes: '/n' }} {...extra} />
    </ToastProvider>,
  );
}

const current = () => screen.getByTestId('slide-player').getAttribute('data-index');

describe('SlidePlayer', () => {
  it('navigates with keys, buttons and swipes; only nearby slides are mounted', async () => {
    player(6);
    await waitFor(() => expect(screen.getByTestId('slide-player').hasAttribute('data-ready')).toBe(true));
    expect(screen.queryByTestId('slide-4')).toBeNull();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(current()).toBe('1');
    fireEvent.keyDown(window, { key: ' ' });
    expect(current()).toBe('2');
    fireEvent.keyDown(window, { key: ' ', shiftKey: true });
    expect(current()).toBe('1');
    fireEvent.click(screen.getByTestId('next-slide'));
    expect(current()).toBe('2');
    const viewport = screen.getByRole('region', { name: 'Lesson slides' });
    fireEvent.touchStart(viewport, { touches: [{ clientX: 300, clientY: 100 }] });
    fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 150, clientY: 110 }] });
    expect(current()).toBe('3');
    fireEvent.touchStart(viewport, { touches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 300, clientY: 100 }] });
    expect(current()).toBe('2');
    // Window: 1..4 mounted, 0 and 5 not; next two slides' images are eager (prefetch).
    expect(screen.queryByTestId('slide-0')).toBeNull();
    expect(screen.getByTestId('slide-4')).toBeTruthy();
    expect(screen.getByTestId('slide-3').closest('[hidden]')).not.toBeNull();
    await waitFor(() => expect(screen.getByTestId('slide-4').querySelector('img')!.getAttribute('loading')).toBe('eager'));
    expect(screen.getByTestId('slide-announcer').textContent).toBe('Slide 3 of 6: Slide 3');
    // Keys typed in a field are not navigation.
    const input = document.createElement('input');
    document.body.appendChild(input);
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    expect(current()).toBe('2');
    input.remove();
  });

  it('guest: resumes from soyl_guest_v1 and saves the position (debounced), completion at the end', async () => {
    recordGuestLessonPosition(CH, { part: 1, slide: 3, completed: false });
    vi.useFakeTimers({ shouldAdvanceTime: true });
    player(5);
    await waitFor(() => expect(current()).toBe('3'));
    expect(screen.getByTestId('resume-note').textContent).toContain('slide 4');
    fireEvent.keyDown(window, { key: 'End' });
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    const saved = readGuestLessonPosition(readGuestProgress(), CH, 1)!;
    expect(saved).toMatchObject({ part: 1, slide: 4, completed: true, mode: 'read' });
    expect(screen.getByTestId('lesson-complete').textContent).toContain('Lesson part complete');
    expect(window.localStorage.getItem(GUEST_STORAGE_KEY)).not.toContain('Slide');
  });

  it('member: resumes from the API and PUTs lesson progress once per settled slide', async () => {
    h.session.state = member;
    h.api.get.mockResolvedValue({ chapterId: CH, lessons: [{ part: 1, slideCount: 5, slide: 2, mode: 'read', completedAt: null, updatedAt: null }], practice: {} });
    h.api.put.mockResolvedValue({ chapterId: CH, part: 1, slide: 4, slideCount: 5, mode: 'read', completedAt: '2026-10-27T00:00:00Z', updatedAt: '2026-10-27T00:00:00Z', xpAwarded: 10, badgesAwarded: [], streak: null });
    vi.useFakeTimers({ shouldAdvanceTime: true });
    player(5);
    await waitFor(() => expect(current()).toBe('2'));
    expect(h.api.get).toHaveBeenCalledWith('/v1/me/progress/chapters/{id}', { params: { id: CH } });
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    const bodies = h.api.put.mock.calls.map((c) => c[1].body);
    expect(bodies[bodies.length - 1]).toEqual({ chapterId: CH, part: 1, slide: 4, mode: 'read', completed: true });
    expect(bodies.length).toBeLessThanOrEqual(2);
    expect(await screen.findByText(/\+10 XP/)).toBeTruthy();
  });

  it('hides listen mode without audio (ADR-013: no speechSynthesis)', async () => {
    player(3);
    await waitFor(() => expect(screen.getByTestId('slide-player').hasAttribute('data-ready')).toBe(true));
    expect(screen.queryByTestId('listen-mode')).toBeNull();
    expect(screen.getByText('Read mode')).toBeTruthy();
  });

  it('listen mode: plays the slide audio and highlights the spoken word', async () => {
    const canPlay = vi.spyOn(HTMLMediaElement.prototype, 'canPlayType').mockReturnValue('probably');
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      this.dispatchEvent(new Event('play'));
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const { slides, meta } = slidesFor(3);
    meta[0]!.audio = { url: 'https://cdn.soylai.com/audio/a/s1.ogg', mime: 'audio/ogg; codecs="opus"', durationMs: 10_000 };
    render(
      <ToastProvider>
        <SlidePlayer chapterId={CH} part={1} firstPart slides={slides} meta={meta} links={{ hub: '/h' }} />
      </ToastProvider>,
    );
    const listen = await screen.findByTestId('listen-mode');
    await waitFor(() => expect((listen as HTMLButtonElement).disabled).toBe(false));
    fireEvent.click(listen);
    const audio = document.querySelector('audio')!;
    expect(audio.getAttribute('src')).toBe('https://cdn.soylai.com/audio/a/s1.ogg');
    fireEvent.click(screen.getByRole('button', { name: 'Play narration' }));
    expect(play).toHaveBeenCalled();
    Object.defineProperty(audio, 'currentTime', { value: 9.9, configurable: true });
    fireEvent.timeUpdate(audio);
    const narration = screen.getByTestId('narration');
    await waitFor(() => expect(narration.querySelector('[data-highlight-word]')!.getAttribute('data-highlight-word')).toBe('5'));
    expect(canPlay).toHaveBeenCalledWith('audio/ogg; codecs="opus"');
  });

  it('says so when the browser cannot play the audio format', async () => {
    vi.spyOn(HTMLMediaElement.prototype, 'canPlayType').mockReturnValue('');
    const { slides, meta } = slidesFor(2);
    meta[0]!.audio = { url: 'https://cdn.soylai.com/audio/a/s1.ogg', mime: 'audio/ogg; codecs="opus"', durationMs: 1000 };
    render(
      <ToastProvider>
        <SlidePlayer chapterId={CH} part={1} firstPart slides={slides} meta={meta} links={{ hub: '/h' }} />
      </ToastProvider>,
    );
    expect(await screen.findByText(/does not play in this browser/)).toBeTruthy();
    expect((screen.getByTestId('listen-mode') as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('FlashcardDeck', () => {
  const cards = ['a', 'b', 'c'].map((id) => ({ id, tag: 'fact', front: <p>Front {id}</p>, back: <p>Back {id}</p> }));
  it('flips, marks known/learning, reviews the ones still being learnt', () => {
    render(<FlashcardDeck cards={cards} chapterId={CH} />);
    expect(screen.getByText('Front a')).toBeTruthy();
    fireEvent.click(screen.getByTestId('show-answer'));
    expect(screen.getByText('Back a')).toBeTruthy();
    fireEvent.click(screen.getByTestId('mark-known'));
    expect(screen.getByText('Front b')).toBeTruthy();
    fireEvent.keyDown(window, { key: ' ' });
    expect(screen.getByText('Back b')).toBeTruthy();
    fireEvent.click(screen.getByTestId('mark-learning'));
    fireEvent.click(screen.getByTestId('flashcard'));
    fireEvent.click(screen.getByTestId('mark-known'));
    expect(screen.getByTestId('flashcards-done')).toBeTruthy();
    expect(screen.getByRole('status').textContent).toBe('2 known · 1 still learning');
    fireEvent.click(screen.getByRole('button', { name: 'Review 1 still learning' }));
    expect(screen.getByText('Card 1 of 1 (still learning)')).toBeTruthy();
    expect(screen.getByText('Front b')).toBeTruthy();
  });
  it('shuffle keeps every card; arrows move', () => {
    render(<FlashcardDeck cards={cards} chapterId={CH} />);
    fireEvent.click(screen.getByTestId('shuffle'));
    expect(screen.getByText('Card 1 of 3')).toBeTruthy();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('Card 2 of 3')).toBeTruthy();
    expect(nextUnmarked(['a', 'b', 'c'], 0, { b: 'known' })).toBe(2);
  });
});

describe('Report a mistake', () => {
  it('sends reason + comment for a guest and confirms', async () => {
    h.api.post.mockResolvedValue({ id: 'r1', status: 'open', createdAt: '2026-10-27T00:00:00Z' });
    render(<ReportDialog open onClose={() => {}} target={{ chapterId: CH, contentType: 'deck', part: 1, itemRef: 's03' }} what="slide 3" />);
    fireEvent.click(screen.getByRole('button', { name: 'Send report' }));
    expect((await screen.findByTestId('report-error')).textContent).toContain('Choose what is wrong');
    fireEvent.click(screen.getByLabelText('Spelling or grammar mistake'));
    fireEvent.change(screen.getByLabelText(/Details/), { target: { value: '  "recieve" on this slide  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send report' }));
    await screen.findByTestId('report-sent');
    expect(h.api.post).toHaveBeenCalledWith('/v1/content-reports', { body: { chapterId: CH, contentType: 'deck', part: 1, itemRef: 's03', reason: 'typo', comment: '"recieve" on this slide' } });
  });
  it('explains the daily limit', async () => {
    h.api.post.mockRejectedValue(new ApiError(429, 'rate_limited', null));
    render(<ReportDialog open onClose={() => {}} target={{ chapterId: CH, contentType: 'notes' }} what="notes" />);
    fireEvent.click(screen.getByLabelText('Something else'));
    fireEvent.click(screen.getByRole('button', { name: 'Send report' }));
    expect((await screen.findByTestId('report-error')).textContent).toContain('a lot of reports today');
    expect(reportErrorMessage(new ApiError(404, 'not_found', null))).toMatch(/Reload/);
  });
});

describe('/admin', () => {
  it('guests get a staff sign-in prompt; students get "staff only"', () => {
    const { unmount } = render(<AdminApp />);
    expect(screen.getByText('Staff sign-in')).toBeTruthy();
    unmount();
    h.session.state = member;
    render(<AdminApp />);
    expect(screen.getByText('Staff only')).toBeTruthy();
    expect(h.api.get).not.toHaveBeenCalled();
  });

  it('mfa_required → enrol (QR + secret) → confirm → recovery codes once → reports queue', async () => {
    h.session.state = { ...member, user: { ...member.user, role: 'reviewer' } };
    let reportsCalls = 0;
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/admin/reports') {
        reportsCalls++;
        if (reportsCalls === 1) throw new ApiError(403, 'mfa_required', null);
        return { reports: [{ id: 'r1', unit: CH, contentType: 'deck', contentId: 'x', itemRef: 's03', reason: 'typo', comment: '<img src=x onerror=alert(1)>', status: 'open', reporter: 'guest', createdAt: '2026-10-27T05:00:00Z' }], nextCursor: null };
      }
      if (path === '/v1/me/mfa') return { enrolled: false, confirmed: false, sessionVerified: false, recoveryCodesRemaining: 0 };
      throw new Error(path);
    });
    h.api.post.mockImplementation(async (path: string) => {
      if (path === '/v1/me/mfa/totp/enroll') return { secret: 'JBSWY3DPEHPK3PXP', otpauthUri: 'otpauth://totp/SOYL:reviewer?secret=JBSWY3DPEHPK3PXP&issuer=SOYL', digits: 6, periodSeconds: 30, algorithm: 'SHA1', expiresInSeconds: 600 };
      if (path === '/v1/me/mfa/totp/confirm') return { recoveryCodes: ['aaaa-bbbb-cc', 'dddd-eeee-ff'] };
      throw new Error(path);
    });
    render(<AdminApp />);
    fireEvent.click(await screen.findByRole('button', { name: 'Set up authenticator' }));
    expect(await screen.findByTestId('mfa-qr')).toBeTruthy();
    expect(screen.getByText('JBSW Y3DP EHPK 3PXP')).toBeTruthy();
    const inputs = within(screen.getByTestId('mfa-confirm')).getAllByRole('textbox');
    fireEvent.change(inputs[0]!, { target: { value: '123456' } });
    await screen.findByTestId('mfa-recovery-codes');
    expect(h.api.post).toHaveBeenCalledWith('/v1/me/mfa/totp/confirm', { body: { code: '123456' } });
    expect(screen.getByText('aaaa-bbbb-cc')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'I have saved them' }));
    const list = await screen.findByTestId('reports');
    expect(list.textContent).toContain('<img src=x onerror=alert(1)>');
    expect(list.querySelector('img')).toBeNull();
    expect(window.localStorage.length).toBe(0);
  });

  it('verify step accepts a recovery code', async () => {
    h.session.state = { ...member, user: { ...member.user, role: 'admin' } };
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/admin/reports' && h.api.post.mock.calls.length === 0) throw new ApiError(403, 'mfa_required', null);
      if (path === '/v1/admin/reports') return { reports: [], nextCursor: null };
      return { enrolled: true, confirmed: true, sessionVerified: false, recoveryCodesRemaining: 9 };
    });
    h.api.post.mockResolvedValue({ verified: true, method: 'recovery_code', recoveryCodesRemaining: 8 });
    render(<AdminApp />);
    fireEvent.click(await screen.findByRole('button', { name: 'Use a recovery code' }));
    fireEvent.change(screen.getByLabelText('Recovery code'), { target: { value: ' aaaa-bbbb-cc ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(await screen.findByText('No open reports.')).toBeTruthy();
    expect(h.api.post).toHaveBeenCalledWith('/v1/me/mfa/verify', { body: { recoveryCode: 'aaaa-bbbb-cc' } });
  });

  it('the QR encodes the URI as a square matrix', () => {
    const { size, d } = qrPath('otpauth://totp/SOYL:x?secret=JBSWY3DPEHPK3PXP');
    expect(size).toBeGreaterThan(25);
    expect(d.startsWith('M4 4')).toBe(true);
  });
});
