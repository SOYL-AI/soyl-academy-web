/**
 * Design-system 2026-10-29: original artwork and the D-044 credits UI.
 * - every one of the 64 avatar ids renders (inline and as a static SVG), with no external reference;
 * - picker groups, lock/unlock states and progress text for every rule shape; keyboard radio groups;
 *   saving, avatar_locked and reset;
 * - the credit guide and history view-models with their text alternatives;
 * - the bonus-credit toast (creditBonuses[]) and the celebrations it triggers;
 * - /plans copy follows config (no hard-coded allowance or price);
 * - badges, crests, subject glyphs and empty states render; the /me invoices link.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type AvatarCatalog, type CreditGuide, type CreditHistory, type Me } from '@/platform/shared/api-client';
import { AI_ACTIONS, quoteCredits } from '@/platform/shared/config/ai-actions';
import { AVATARS, AVATAR_BACKGROUNDS, AVATAR_IDS, avatarProgress, avatarUnlockLabel, isAvatarUnlocked, type AvatarLearnerState } from '@/platform/shared/config/avatars';
import { CREDIT_BONUSES } from '@/platform/shared/config/credit-bonuses';
import { BADGES, LEAGUE_TIERS } from '@/platform/shared/config/gamification';
import { PLANS } from '@/platform/shared/config/plans';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  credits: { credits: null as unknown, aiAllowed: true, openGuide: vi.fn(), refresh: vi.fn() },
}));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('next/navigation', () => ({ usePathname: () => '/me', useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));
vi.mock('../ai/CreditsProvider', () => ({ useCredits: () => h.credits, useOptionalCredits: () => h.credits }));

import { animalName, AnimalAvatar } from '@/components/platform/ui/kit/AnimalAvatar';
import { CreditChip } from '@/components/platform/ui/kit/CreditChip';
import { EmptyState } from '@/components/platform/ui/kit/Display';
import { BadgeMedal } from '@/components/platform/ui/art/Art';
import { AvatarArt, InlineAvatar } from '@/components/platform/ui/art/AvatarArt';
import { AVATAR_ART_IDS, avatarArt } from '@/components/platform/ui/art/avatar-art';
import { avatarImageFile, avatarSrc, parseAvatarImageFile } from '@/components/platform/ui/art/avatar-src';
import { BADGE_ART_KEYS } from '@/components/platform/ui/art/badge-art';
import { CREST_TIERS, crestForLeague } from '@/components/platform/ui/art/crest-art';
import { EMPTY_ART_KINDS } from '@/components/platform/ui/art/empty-art';
import { EmptyIllustration } from '@/components/platform/ui/art/EmptyIllustration';
import { LeagueCrest } from '@/components/platform/ui/art/LeagueCrest';
import { SUBJECT_ART_KINDS } from '@/components/platform/ui/art/subject-art';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { svgString, walk, SVG_TAGS, type SvgNode } from '@/components/platform/ui/art/svg-tree';
import { balanceLine, bonusLines, bonusToastText, dayName, guideRows, historyRows, historySummary, planList, priceText } from '../ai/credit-guide-model';
import { CreditGuidePanel } from '../ai/CreditGuide';
import { CreditHistoryChart } from '../ai/CreditHistory';
import { CelebrationView, celebrationTitle } from '../celebrate/Celebration';
import { CELEBRATE_EVENT, type Celebration } from '../celebrate/events';
import { announceRewards, badgeName, levelUp } from '../celebrate/rewards';
import { subjectStyle } from '../learn/subject-style';
import { avatarGroups, avatarSaveError, saveState, unlockText } from '../me/avatar-picker-model';
import { PickerView } from '../me/AvatarPicker';
import { SubscriptionCard } from '../me/MeExtras';
import { allowanceLine, bonusCopy, priceExamples } from '../plans/plans-copy';

beforeEach(() => {
  for (const f of Object.values(h.api)) f.mockReset();
  h.credits.openGuide.mockReset();
  h.credits.refresh.mockReset();
});
afterEach(cleanup);

/* ── Fixtures ──────────────────────────────────────────────────────────────── */

/** A catalogue exactly as GET /v1/me/avatars computes it, from the shared config and a learner state. */
function catalogFor(state: AvatarLearnerState, current = { id: 'otter', bg: 'sky', isDefault: true }): AvatarCatalog {
  const avatars = AVATARS.map((a) => ({
    id: a.id,
    animal: a.animal,
    unlocked: isAvatarUnlocked(a, state),
    isPublicNameAnimal: state.publicNameAvatar === a.id,
    unlock: a.unlock,
    unlockLabel: avatarUnlockLabel(a.unlock),
    progress: avatarProgress(a.unlock, state),
  }));
  return {
    current: current as AvatarCatalog['current'],
    default: { id: 'otter', bg: 'sky' } as AvatarCatalog['default'],
    backgrounds: AVATAR_BACKGROUNDS.map((b) => ({ ...b })) as AvatarCatalog['backgrounds'],
    unlockedCount: avatars.filter((a) => a.unlocked).length,
    total: avatars.length,
    avatars: avatars as AvatarCatalog['avatars'],
  };
}

const STATE: AvatarLearnerState = { level: 5, badges: ['first-lesson'], longestStreak: 3, bestLeagueTier: 2, liveMocks: 1, publicNameAvatar: 'whale' };

const GUIDE: CreditGuide = {
  plan: 'free',
  planName: 'Free',
  dailyCredits: 50,
  balance: 50,
  bonusToday: 0,
  creditValuePaise: 10,
  day: '2026-10-29',
  resetAt: '2026-10-29T18:30:00.000Z',
  resetInSeconds: 3600 * 5,
  plansUrl: '/plans',
  plans: [
    { id: 'free', name: 'Free', creditsPerDay: 50 },
    { id: 'plus', name: 'Plus', creditsPerDay: 100 },
    { id: 'pro', name: 'Pro', creditsPerDay: 150 },
    { id: 'board_exam_pass', name: 'Board Exam Pass', creditsPerDay: 150 },
  ],
  actions: [
    { action: 'quick-doubt', label: 'Quick doubt', guide: 'A short answer to one question.', credits: 1, perAnswer: false, maxCredits: 1, mode: 'stream', requiresUpload: false, allowedForPlan: true, remainingToday: 50, perDay: [] },
    { action: 'hard-doubt', label: 'Step-by-step doubt', guide: 'A worked solution.', credits: 7, perAnswer: false, maxCredits: 7, mode: 'stream', requiresUpload: false, allowedForPlan: true, remainingToday: 7, perDay: [] },
    { action: 'evaluate-paper', label: 'AI evaluation of a full paper', guide: 'Marks every written answer.', credits: 7, perAnswer: true, maxCredits: 50, mode: 'job', requiresUpload: false, allowedForPlan: true, remainingToday: 0, perDay: [] },
    {
      action: 'paper-from-upload',
      label: 'Papers like my school’s',
      guide: 'A practice paper from your school’s sample.',
      credits: 80,
      perAnswer: false,
      maxCredits: 80,
      mode: 'job',
      requiresUpload: true,
      allowedForPlan: false,
      remainingToday: 0,
      perDay: [
        { plan: 'pro', count: 1 },
        { plan: 'board_exam_pass', count: 1 },
      ],
    },
  ],
  bonuses: {
    dailyGoal: { credits: 10, target: 10, solvedToday: 7, earnedToday: false },
    streakMilestone: { credits: 5, everyDays: 7, currentStreak: 9, nextMilestone: 14, earnedToday: false },
  },
} as CreditGuide;

const HISTORY: CreditHistory = {
  timezone: 'Asia/Kolkata',
  from: '2026-10-27',
  to: '2026-10-29',
  days: [
    { day: '2026-10-27', granted: 50, bonus: 0, spent: 8, refunded: 1, held: 0, left: 42 },
    { day: '2026-10-28', granted: 50, bonus: 10, spent: 0, refunded: 0, held: 0, left: 60 },
    { day: '2026-10-29', granted: 50, bonus: 15, spent: 20, refunded: 0, held: 0, left: 45 },
  ],
};

/* ── Avatars: art ──────────────────────────────────────────────────────────── */

describe('avatar art', () => {
  it('has a drawing for exactly the 64 config ids (= public-name animals)', () => {
    expect(AVATAR_IDS).toHaveLength(64);
    expect([...AVATAR_ART_IDS].sort()).toEqual([...AVATAR_IDS].sort());
  });

  it.each(AVATAR_IDS.map((id) => [id]))('%s renders inline and as a static SVG with only shapes and literal colours', (id) => {
    const nodes = avatarArt(id)!;
    expect(nodes.length).toBeGreaterThan(3);
    walk(nodes, ([tag, attrs]) => {
      expect(SVG_TAGS).toContain(tag);
      for (const [k, v] of Object.entries(attrs)) {
        expect(k).not.toMatch(/^(href|xlinkHref|style|on\w+)$/i);
        if (k === 'fill' || k === 'stroke') expect(String(v)).toMatch(/^(#[0-9a-f]{6}|none)$/i);
      }
    });
    const svg = svgString(nodes);
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">')).toBe(true);
    expect(svg).not.toMatch(/<(image|text|script|use|foreignObject)|url\(|https?:\/\/(?!www\.w3\.org)/);
    const { container } = render(<AvatarArt id={id} size={48} />);
    const el = container.querySelector(`svg[data-art="${id}"]`)!;
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelectorAll('path, circle, ellipse, rect, polygon').length).toBeGreaterThan(3);
  });

  it('unknown ids draw nothing; image file names round-trip and are versioned', () => {
    expect(avatarArt('dragon')).toBeNull();
    expect(avatarArt('constructor')).toBeNull();
    expect(avatarImageFile('giraffe')).toBe('giraffe.v1.svg');
    expect(avatarSrc('giraffe')).toBe('/me/avatars/giraffe.v1.svg');
    expect(parseAvatarImageFile('giraffe.v1.svg')).toBe('giraffe');
    expect(parseAvatarImageFile('giraffe.v0.svg')).toBeNull();
    expect(parseAvatarImageFile('../x.v1.svg')).toBeNull();
  });

  it('AnimalAvatar: background token, image, "Giraffe avatar" name, decorative next to a name, ring, empty fallback', () => {
    const { container, rerender } = render(<AnimalAvatar avatar={{ id: 'giraffe', bg: 'mint' }} size={32} ring="gold" />);
    const span = container.firstElementChild as HTMLElement;
    expect(span.getAttribute('role')).toBe('img');
    expect(span.getAttribute('aria-label')).toBe('Giraffe avatar');
    expect(span.style.getPropertyValue('--av-bg')).toBe('var(--p-avatar-mint)');
    expect(span.getAttribute('data-ring')).toBe('gold');
    const img = span.querySelector('img')!;
    expect(img.getAttribute('src')).toBe('/me/avatars/giraffe.v1.svg');
    expect(img.getAttribute('alt')).toBe('');
    rerender(<AnimalAvatar avatar={{ id: 'giraffe', bg: 'mint' }} decorative />);
    expect((container.firstElementChild as HTMLElement).getAttribute('aria-hidden')).toBe('true');
    rerender(<AnimalAvatar avatar={null} />);
    expect(container.querySelector('img')).toBeNull();
    expect((container.firstElementChild as HTMLElement).getAttribute('aria-label')).toBe('Student');
    expect(animalName('kingfisher')).toBe('Kingfisher');
  });

  it('InlineAvatar draws inline (no image request)', () => {
    const { container } = render(<InlineAvatar id="owl" bg="peach" size={56} decorative={false} />);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('Owl avatar');
  });
});

/* ── Avatars: picker ───────────────────────────────────────────────────────── */

describe('avatar picker model', () => {
  const catalog = catalogFor(STATE);

  it('groups: starters (with the public-name animal) first, then each rule kind in order', () => {
    const groups = avatarGroups(catalog);
    expect(groups.map((g) => g.key)).toEqual(['starter', 'level', 'badge', 'streak', 'league_tier', 'live_mocks']);
    expect(groups[0]!.avatars[0]!.id).toBe('whale'); // public-name animal leads the starters
    expect(groups[0]!.avatars).toHaveLength(17);
    expect(groups.reduce((n, g) => n + g.avatars.length, 0)).toBe(64);
    const levels = groups.find((g) => g.key === 'level')!.avatars.map((a) => (a.unlock.kind === 'level' ? a.unlock.level : 0));
    expect(levels).toEqual([...levels].sort((a, b) => a - b));
  });

  it('lock and progress text for every rule shape', () => {
    const by = (id: string) => catalog.avatars.find((a) => a.id === id)!;
    expect(unlockText(by('otter'))).toBe('Available to everyone');
    expect(unlockText(by('whale'))).toBe('The animal in your public name');
    expect(by('crane').unlocked).toBe(true); // level 5 reached
    expect(unlockText(by('crane'))).toBe('Unlocked: reach level 5');
    expect(by('moose').unlocked).toBe(false);
    expect(unlockText(by('moose'))).toBe("Reach level 8 — you're level 5");
    expect(unlockText(by('myna'))).toBe('Unlocked: earn the First lesson badge');
    expect(unlockText(by('hoopoe'))).toBe('Earn the Week warrior badge — not earned yet');
    expect(unlockText(by('badger'))).toBe('Keep a 14-day learning streak — your longest is 3 days');
    expect(by('leopard').unlocked).toBe(true); // Silver reached
    expect(unlockText(by('tiger'))).toBe('Play in the Gold league — your best is Silver');
    expect(unlockText(catalogFor({ ...STATE, bestLeagueTier: 0 }).avatars.find((a) => a.id === 'langur')!)).toBe('Play in the Bronze league — you have not played a league yet');
    expect(by('toucan').unlocked).toBe(true);
    expect(unlockText(by('eagle'))).toBe('Take part in 3 live All-India mocks — 1 so far');
  });

  it('save state: same, locked (explained) or a PATCH body', () => {
    expect(saveState(catalogFor(STATE, { id: 'fox', bg: 'mint', isDefault: false }), { id: 'fox', bg: 'mint' })).toEqual({ kind: 'same' });
    expect(saveState(catalog, { id: 'fox', bg: 'ocean' })).toEqual({ kind: 'save', body: { avatar: { id: 'fox', bg: 'ocean' } } });
    const locked = saveState(catalog, { id: 'moose', bg: 'sky' });
    expect(locked).toEqual({ kind: 'locked', reason: "Moose is locked. Reach level 8 — you're level 5." });
  });

  it('save errors are our own words', () => {
    expect(avatarSaveError(new ApiError(403, 'avatar_locked', null))).toMatch(/still locked/);
    expect(avatarSaveError(new ApiError(503, 'network_error', null))).toMatch(/could not reach/);
    expect(avatarSaveError(new Error('x'))).toBe('Your avatar could not be saved. Please try again.');
  });
});

describe('AvatarPicker', () => {
  function renderPicker(catalog = catalogFor(STATE), onSaved = vi.fn()) {
    render(
      <ToastProvider>
        <PickerView catalog={catalog} publicName="Brave Whale 417" onSaved={onSaved} />
      </ToastProvider>,
    );
    return onSaved;
  }

  it('two native radio groups (64 animals, 8 backgrounds), locked ones described; live preview with the public name', () => {
    renderPicker();
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios).toHaveLength(64 + 8);
    expect(new Set(radios.slice(8).map((r) => r.name)).size).toBe(1); // one group: arrow keys move through all animals
    const moose = screen.getByRole('radio', { name: 'Moose' });
    expect(moose.getAttribute('aria-describedby')).toBeTruthy();
    expect(document.getElementById(moose.getAttribute('aria-describedby')!)?.textContent).toBe("Reach level 8 — you're level 5");
    expect(screen.getByTestId('avatar-preview-name').textContent).toBe('Brave Whale 417');
    expect((screen.getByRole('radio', { name: 'Otter' }) as HTMLInputElement).checked).toBe(true);
  });

  it('a locked avatar previews but cannot be saved; an unlocked one saves with the picked background', async () => {
    const me = { avatar: { id: 'fox', bg: 'ocean', isDefault: false } } as Me;
    h.api.patch.mockResolvedValue(me);
    const onSaved = renderPicker();
    fireEvent.click(screen.getByRole('radio', { name: 'Moose' }));
    expect((screen.getByTestId('avatar-save') as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByTestId('avatar-locked-note').textContent).toContain('Moose is locked. Reach level 8');
    fireEvent.click(screen.getByRole('radio', { name: 'Fox' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Ocean' }));
    fireEvent.click(screen.getByTestId('avatar-save'));
    await waitFor(() => expect(onSaved).toHaveBeenCalled());
    expect(h.api.patch).toHaveBeenCalledWith('/v1/me', { body: { avatar: { id: 'fox', bg: 'ocean' } } });
    expect(onSaved.mock.calls[0]![1].current).toEqual(me.avatar);
  });

  it('403 avatar_locked from the API is explained and nothing changes', async () => {
    h.api.patch.mockRejectedValue(new ApiError(403, 'avatar_locked', null));
    const onSaved = renderPicker();
    fireEvent.click(screen.getByRole('radio', { name: 'Fox' }));
    fireEvent.click(screen.getByTestId('avatar-save'));
    expect((await screen.findByTestId('avatar-error')).textContent).toMatch(/still locked/);
    expect(onSaved).not.toHaveBeenCalled();
  });

  it('"Use my default avatar" sends avatar: null', async () => {
    h.api.patch.mockResolvedValue({ avatar: { id: 'otter', bg: 'sky', isDefault: true } } as Me);
    const onSaved = renderPicker(catalogFor(STATE, { id: 'fox', bg: 'mint', isDefault: false }));
    fireEvent.click(screen.getByTestId('avatar-reset'));
    await waitFor(() => expect(onSaved).toHaveBeenCalled());
    expect(h.api.patch).toHaveBeenCalledWith('/v1/me', { body: { avatar: null } });
  });
});

/* ── Credits: guide, bonuses, history ─────────────────────────────────────── */

describe('credit guide', () => {
  it('rows: price, availability on the plan and "≈ N left today"', () => {
    const rows = guideRows(GUIDE);
    expect(rows.map((r) => [r.label, r.price, r.left])).toEqual([
      ['Quick doubt', '1 credit', '≈ 50 left today'],
      ['Step-by-step doubt', '7 credits', '≈ 7 left today'],
      ['AI evaluation of a full paper', '7 credits per answer, at most 50 a paper', 'Not enough credits left today'],
      ['Papers like my school’s', '80 credits', 'Part of the Pro and Board Exam Pass plans'],
    ]);
    expect(planList(['Pro'])).toBe('the Pro plan');
    expect(priceText({ credits: 1, perAnswer: false, maxCredits: 1 })).toBe('1 credit');
    expect(balanceLine({ ...GUIDE, balance: 60, bonusToday: 10 })).toBe('60 credits left today (including 10 bonus) on Free.');
  });

  it('bonuses: today’s goal and the next streak milestone; none without consent', () => {
    const [goal, streak] = bonusLines(GUIDE);
    expect(goal!.title).toBe("+10 AI credits for hitting today's practice goal");
    expect(goal!.detail).toBe('Solve 10 practice questions today: 7 of 10 so far.');
    expect([goal!.current, goal!.target]).toEqual([7, 10]);
    expect(streak!.title).toBe('+5 AI credits on every 7-day streak');
    expect(streak!.detail).toBe('Your streak: 9 days. Next bonus at 14 days.');
    expect([streak!.current, streak!.target]).toEqual([2, 7]);
    expect(bonusLines({ bonuses: null })).toEqual([]);
    const earned = bonusLines({ bonuses: { ...GUIDE.bonuses!, dailyGoal: { ...GUIDE.bonuses!.dailyGoal, earnedToday: true } } });
    expect(earned[0]!.detail).toBe('Earned today. Well done!');
  });

  it('panel: every action listed, plans with the current one marked, bonus progress bars', () => {
    render(<CreditGuidePanel guide={GUIDE} />);
    expect(screen.getByRole('list', { name: 'AI actions and their prices' }).querySelectorAll('li')).toHaveLength(4);
    expect(screen.getByTestId('guide-left-hard-doubt').textContent).toContain('≈ 7 left today');
    expect(screen.getByTestId('guide-left-paper-from-upload').textContent).toContain('Part of the Pro and Board Exam Pass plans');
    expect(screen.getByRole('progressbar', { name: "+10 AI credits for hitting today's practice goal" }).getAttribute('aria-valuetext')).toBe('7 of 10');
    expect(document.querySelector('[data-current]')?.textContent).toContain('Free');
  });
});

describe('credit history', () => {
  const rows = historyRows(HISTORY);

  it('rows per IST day with labels; summary sentence', () => {
    expect(dayName('2026-10-29')).toBe('Thu 29 Oct');
    expect(rows.map((r) => [r.short, r.received, r.spent])).toEqual([
      ['27', 50, 8],
      ['28', 60, 0],
      ['29', 65, 20],
    ]);
    expect(historySummary(rows)).toBe('Last 3 days: 175 credits received (25 of them bonus), 28 used on 2 days, 1 refunded.');
  });

  it('chart: labelled image with a title per bar, legend, and the same numbers as a table', () => {
    render(<CreditHistoryChart rows={rows} />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('aria-label')).toBe(historySummary(rows));
    expect([...img.querySelectorAll('title')].map((t) => t.textContent)).toContain('Wed 28 Oct: 10 bonus credits');
    const table = screen.getByTestId('credit-history-table');
    expect(table.querySelectorAll('tbody tr')).toHaveLength(3);
    expect(table.querySelector('tbody tr th')?.textContent).toBe('Thu 29 Oct'); // newest first
  });
});

/* ── Bonus toast and celebrations ──────────────────────────────────────────── */

describe('bonus credits and celebrations', () => {
  it('toast text from creditBonuses', () => {
    expect(bonusToastText({ kind: 'bonus_goal', credits: 10 })).toBe("+10 AI credits for hitting today's practice goal");
    expect(bonusToastText({ kind: 'bonus_streak', credits: 5 })).toBe('+5 AI credits for your learning streak');
    expect(bonusToastText({ kind: 'bonus_streak', credits: 1 })).toBe('+1 AI credit for your learning streak');
  });

  it('announceRewards: bonus toast, goal celebration, credits refreshed; badges by name; level up', () => {
    const toast = { show: vi.fn(() => 1) };
    const seen: Celebration[] = [];
    const on = (e: Event) => seen.push((e as CustomEvent<Celebration>).detail);
    window.addEventListener(CELEBRATE_EVENT, on);
    const refreshCredits = vi.fn();
    announceRewards({ xpAwarded: 2, badgesAwarded: ['streak-7'], creditBonuses: [{ kind: 'bonus_goal', credits: 10, label: 'Daily practice goal bonus' }] }, { toast, xpBefore: 149, refreshCredits });
    window.removeEventListener(CELEBRATE_EVENT, on);
    expect(toast.show.mock.calls.map((c) => (c as unknown as [{ title: string; description?: string }])[0])).toEqual([
      { title: 'New badge!', description: 'Week warrior', tone: 'success' },
      { title: 'Level 3 reached!', description: 'Keep learning to unlock more avatars.', tone: 'success' },
      { title: "+10 AI credits for hitting today's practice goal", tone: 'success' },
    ]);
    expect(seen.map((c) => c.kind)).toEqual(['badge', 'level', 'goal']);
    expect(refreshCredits).toHaveBeenCalledTimes(1);
    expect(badgeName('first-test')).toBe('Test taker');
    expect(levelUp(48, 2)).toBe(2);
    expect(levelUp(10, 2)).toBeNull();
    expect(levelUp(null, 50)).toBeNull();
  });

  it('celebration visuals are decorative and never focusable', () => {
    for (const c of [{ kind: 'level', level: 4 }, { kind: 'badge', badge: 'first-test', name: 'Test taker' }, { kind: 'goal', credits: 10 }, { kind: 'bonus', credits: 5 }] as Celebration[]) {
      const { container, unmount } = render(<CelebrationView celebration={c} />);
      const layer = container.firstElementChild!;
      expect(layer.getAttribute('aria-hidden')).toBe('true');
      expect(layer.querySelectorAll('a, button, input, [tabindex]')).toHaveLength(0);
      expect(layer.textContent).toContain(celebrationTitle(c));
      unmount();
    }
  });
});

/* ── /plans copy from config ───────────────────────────────────────────────── */

describe('/plans copy follows config', () => {
  it('allowance, prices and bonuses come from PLANS, AI_ACTIONS and CREDIT_BONUSES', () => {
    const plans = [...PLANS].sort((a, b) => a.order - b.order);
    const line = allowanceLine(plans);
    for (const p of plans) expect(line).toContain(String(p.creditsPerDay));
    expect(line.startsWith(`Every logged-in student gets ${PLANS.find((p) => p.id === 'free')!.creditsPerDay} free AI credits a day`)).toBe(true);
    expect(priceExamples()).toContain(`${AI_ACTIONS['hard-doubt'].label}: ${quoteCredits(AI_ACTIONS['hard-doubt'])} credits`);
    expect(bonusCopy()).toContain(`+${CREDIT_BONUSES.dailyGoal.credits} on the day you meet your daily practice goal`);
    expect(bonusCopy()).toContain(`+${CREDIT_BONUSES.streakMilestone.credits} on every ${CREDIT_BONUSES.streakMilestone.everyDays}-day streak`);
  });

  it('no credit allowance or price is written into the plans, ask or explain-slide code', () => {
    const numbers = new Set([...PLANS.map((p) => p.creditsPerDay), 25, 40, 60, CREDIT_BONUSES.dailyGoal.credits, CREDIT_BONUSES.streakMilestone.credits]);
    for (const file of ['components/platform/plans/PlansClient.tsx', 'components/platform/plans/plans-copy.ts', 'app/(platform)/plans/page.tsx', 'components/platform/ai/AskClient.tsx', 'components/platform/ai/ExplainSlide.tsx']) {
      const src = readFileSync(resolve(process.cwd(), file), 'utf8');
      for (const n of numbers) expect(src, `${file} hard-codes ${n} credits`).not.toMatch(new RegExp(`\\b${n}\\s*(free\\s*)?(AI\\s*)?credits?\\b`, 'i'));
    }
  });
});

/* ── Other artwork ─────────────────────────────────────────────────────────── */

describe('badges, crests, subject glyphs, empty states', () => {
  it('a medal for every badge in config, earned and locked', () => {
    expect([...BADGE_ART_KEYS].sort()).toEqual(BADGES.map((b) => b.key).sort());
    for (const b of BADGES) {
      const { container, unmount } = render(<BadgeMedal badge={b.key} locked />);
      expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe(`${b.name} badge, not earned yet`);
      unmount();
    }
  });

  it('a crest per league tier (Bronze … Diamond) and Elite', () => {
    expect(CREST_TIERS).toEqual(['bronze', 'silver', 'gold', 'sapphire', 'diamond', 'elite']);
    expect(LEAGUE_TIERS.map((_, i) => crestForLeague(i + 1))).toEqual(['bronze', 'silver', 'gold', 'sapphire', 'diamond']);
    const { container } = render(<LeagueCrest level={3} />);
    expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('Gold crest');
  });

  it('subject glyphs replace the letter tiles; social and computer science are not "science"', () => {
    expect(subjectStyle('cbse-10-social-science', 'Social Science').art).toBe('social');
    expect(subjectStyle('cbse-12-computer-science', 'Computer Science').art).toBe('computer');
    expect(subjectStyle('cbse-12-political-science', 'Political Science').art).toBe('civics');
    expect(subjectStyle('cbse-10-science', 'Science').art).toBe('science');
    expect(subjectStyle('cbse-9-sanskrit', 'Sanskrit').art).toBe('sanskrit');
    expect(subjectStyle('cbse-12-painting', 'Painting').art).toBe('generic');
    for (const kind of SUBJECT_ART_KINDS) {
      const { container, unmount } = render(<SubjectGlyph kind={kind} />);
      expect(container.querySelector(`svg[data-art="subject-${kind}"]`)?.getAttribute('aria-hidden')).toBe('true');
      unmount();
    }
  });

  it('empty-state illustrations are decorative and use theme tokens only', () => {
    for (const kind of EMPTY_ART_KINDS) {
      const { container, unmount } = render(<EmptyState title="Nothing yet" art={<EmptyIllustration kind={kind} />} />);
      expect(container.querySelector(`[data-art="empty-${kind}"]`)).toBeTruthy();
      expect(container.querySelector('svg')?.closest('[aria-hidden="true"]')).toBeTruthy();
      const colours = [...container.querySelectorAll('svg *')].flatMap((el) => [el.getAttribute('fill'), el.getAttribute('stroke')]).filter((c): c is string => !!c && c !== 'none');
      for (const c of colours) expect(c).toMatch(/^var\(--p-[\w-]+\)$/);
      unmount();
    }
  });
});

/* ── Header chip, /me links ───────────────────────────────────────────────── */

describe('credit chip and /me', () => {
  it('the chip names today’s bonus credits in its label and tooltip', () => {
    const { container } = render(<CreditChip balance={60} bonusToday={10} />);
    expect(container.querySelector('.p-visually-hidden')?.textContent).toMatch(/^60 AI credits left today, including 10 bonus/);
    expect(container.firstElementChild?.getAttribute('title')).toBe('Includes 10 bonus credits earned today');
  });

  it('the plan block links to invoices and receipts', async () => {
    h.api.get.mockResolvedValue({ plan: 'free', planName: 'Free', creditsPerDay: 50, validUntil: null, subscription: null });
    render(<SubscriptionCard />);
    expect((await screen.findByTestId('invoices-link')).getAttribute('href')).toBe('/me/invoices');
    expect(screen.getByTestId('invoices-link').textContent).toBe('Invoices and receipts');
  });

  it('no art module reaches into config it does not need (art stays import-light)', () => {
    const avatarArtSrc = readFileSync(resolve(process.cwd(), 'components/platform/ui/art/avatar-art.ts'), 'utf8');
    const srcSrc = readFileSync(resolve(process.cwd(), 'components/platform/ui/art/avatar-src.ts'), 'utf8');
    expect(srcSrc).not.toMatch(/^import /m);
    expect(avatarArtSrc.match(/^import .*$/gm)).toEqual([expect.stringContaining("from './svg-tree'")]);
    const sample: SvgNode[] = avatarArt('otter')!;
    expect(sample[0]![0]).toBe('path');
  });
});
