/**
 * ADR-023: models and components of the UI revamp — practice list, mastery display, learner progress, heatmap,
 * player card, weekly league, store rarity, learning path, subject tiles.
 */
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { MyActivity, MyPlayerCard, MyProgress, PracticeSummary, Schemas } from '@/platform/shared/api-client';

vi.mock('next/navigation', () => ({ usePathname: () => '/learn', useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));

import { bandOf, headerCounts, isTypingTarget, itemStatus, stemPreview, type ListItem } from '../practice/practice-list';
import { evidenceFrom, chapterMastery, masteryCounts, ASSUMED_PRACTICE_POOL } from '../lib/mastery';
import { continueChapter, fromGuestProgress, fromMemberProgress, subjectOfChapter } from '../lib/learner';
import { dayLabel, heatLevel, heatmapWeeks, weekday, windowStart } from '../me/heatmap-model';
import { Heatmap } from '../me/Heatmap';
import { BlankPlayerCard, CardAttributes, crestInitials, PlayerCard } from '../me/PlayerCard';
import { itemRarity } from '../coins/rarity';
import { zoneRows } from '../leaderboard/WeeklyLeague';
import { stepState, type HubProgressState } from '../learn/HubProgress';
import { subjectStyle } from '../learn/subject-style';
import { chapterHref, greeting } from '../learn/LearnHome';
import { DifficultyTag, MasteryBar, MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';

afterEach(() => cleanup());

const item = (over: Partial<ListItem> = {}): ListItem => ({ id: 'q', difficulty: 3, status: null, answered: null, lastCorrect: null, ...over });

describe('practice list model', () => {
  it('status: solved once is solved; this visit, the API and the device all count', () => {
    expect(itemStatus(item(), undefined, undefined)).toBe('new');
    expect(itemStatus(item({ status: 'attempted' }), undefined, undefined)).toBe('attempted');
    expect(itemStatus(item({ status: 'solved' }), false, undefined)).toBe('solved');
    expect(itemStatus(item({ status: 'attempted' }), true, undefined)).toBe('solved');
    expect(itemStatus(item(), null, undefined)).toBe('attempted'); // written answer, not auto-graded
    expect(itemStatus(item(), undefined, true)).toBe('solved'); // guest device
    expect(itemStatus(item(), undefined, false)).toBe('attempted');
    expect(itemStatus(item({ answered: true, lastCorrect: true }), undefined, undefined)).toBe('solved');
    expect(itemStatus(item({ answered: true, lastCorrect: false }), undefined, undefined)).toBe('attempted');
  });

  it('difficulty band from the API, else from content difficulty 1–5', () => {
    expect(bandOf({ difficulty: 1 })).toBe('easy');
    expect(bandOf({ difficulty: 2 })).toBe('easy');
    expect(bandOf({ difficulty: 3 })).toBe('medium');
    expect(bandOf({ difficulty: 5 })).toBe('hard');
    expect(bandOf({ difficulty: 1, band: 'hard' })).toBe('hard');
  });

  it('header counts: computed for guests, the API summary for members (never below this visit)', () => {
    const items = [item({ id: 'a', difficulty: 1 }), item({ id: 'b', difficulty: 3 }), item({ id: 'c', difficulty: 5 }), item({ id: 'd', difficulty: 1 })];
    const statusOf = (it: ListItem): 'solved' | 'attempted' | 'new' => (it.id === 'a' ? 'solved' : it.id === 'b' ? 'attempted' : 'new');
    const guest = headerCounts(items, statusOf, null, 4);
    expect(guest).toEqual({ total: 4, solved: 1, attempted: 1, byBand: { easy: { total: 2, solved: 1 }, medium: { total: 1, solved: 0 }, hard: { total: 1, solved: 0 } } });
    const summary: PracticeSummary = { total: 75, byDifficulty: { easy: { total: 30, solved: 5 }, medium: { total: 25, solved: 0 }, hard: { total: 20, solved: 2 } }, byStatus: { new: 60, attempted: 8, solved: 7 } };
    const member = headerCounts(items, statusOf, summary, 4);
    expect(member.total).toBe(75);
    expect(member.solved).toBe(7);
    expect(member.byBand.easy).toEqual({ total: 30, solved: 5 });
    expect(member.byBand.hard).toEqual({ total: 20, solved: 2 });
  });

  it('stem preview is plain text: maths, chemistry, links and blanks flattened, then truncated', () => {
    expect(stemPreview('The prime factorisation of $1176$ is')).toBe('The prime factorisation of 1176 is');
    expect(stemPreview(String.raw`Iron: $x\,\mathrm{Fe}$`)).toBe('Iron: x Fe');
    expect(stemPreview('Balance \\ce{H2 + O2 -> H2O} **now**')).toBe('Balance H2 + O2 → H2O now');
    expect(stemPreview('Fill: water boils at ___ °C')).toBe('Fill: water boils at …… °C');
    expect(stemPreview('See [this](https://x.test) <b>raw</b>')).not.toContain('https');
    const long = stemPreview('word '.repeat(60), 40);
    expect(long.length).toBeLessThanOrEqual(40);
    expect(long.endsWith('…')).toBe(true);
  });

  it('shortcuts only when not typing', () => {
    const text = document.createElement('input');
    const radio = document.createElement('input');
    radio.type = 'radio';
    expect(isTypingTarget(text)).toBe(true);
    expect(isTypingTarget(document.createElement('textarea'))).toBe(true);
    expect(isTypingTarget(radio)).toBe(false);
    expect(isTypingTarget(document.body)).toBe(false);
    expect(isTypingTarget(null)).toBe(false);
  });
});

describe('mastery from browser data (shared formula)', () => {
  it('no activity → not started; real totals make one answer count for little', () => {
    expect(chapterMastery(evidenceFrom(null, { lessonParts: 2, practiceTotal: 75 })).level).toBe('not_started');
    const one = chapterMastery(evidenceFrom({ lessonPartsStarted: 0, lessonPartsCompleted: 0, answered: 1, correct: 1 }, { lessonParts: 2, practiceTotal: 75 }));
    expect(one.level).toBe('attempted');
    expect(one.hints.length).toBeGreaterThan(0);
  });
  it('unknown pool size: an assumed pool keeps one right answer from reading as full coverage', () => {
    const e = evidenceFrom({ lessonPartsStarted: 0, lessonPartsCompleted: 0, answered: 1, correct: 1 });
    expect(e.practiceTotal).toBe(ASSUMED_PRACTICE_POOL);
    expect(chapterMastery(e).level).toBe('attempted');
  });
  it('lots of right answers and a finished lesson reach proficient or better', () => {
    const m = chapterMastery(evidenceFrom({ lessonPartsStarted: 2, lessonPartsCompleted: 2, answered: 50, correct: 47 }, { lessonParts: 2, practiceTotal: 60 }));
    expect(['proficient', 'mastered']).toContain(m.level);
  });
  it('counts per level', () => {
    expect(masteryCounts(['mastered', 'attempted', 'mastered'])).toEqual({ not_started: 0, attempted: 1, familiar: 0, proficient: 0, mastered: 2 });
  });
});

describe('learner progress model', () => {
  const now = '2026-10-28T10:00:00.000Z';
  it('guest device progress → chapters, subjects, totals, continue', () => {
    const p = fromGuestProgress({
      v: 1,
      lessons: [
        { chapter: 'cbse-10-science-ch01', slide: 5, completed: false, updatedAt: '2026-10-27T10:00:00.000Z' },
        { chapter: 'cbse-10-mathematics-ch02', slide: 9, completed: true, updatedAt: now },
      ],
      practice: [
        { chapter: 'cbse-10-science-ch01', question: 'q_a', correct: true, answeredAt: '2026-10-27T11:00:00.000Z' },
        { chapter: 'cbse-10-science-ch01', question: 'q_b', correct: false, answeredAt: '2026-10-27T11:01:00.000Z' },
      ],
    });
    expect(p.source).toBe('device');
    expect(p.streak).toBeNull();
    expect(p.practiceAnswered).toBe(2);
    expect(p.practiceCorrect).toBe(1);
    expect(p.lessonsCompleted).toBe(1);
    expect(p.chapters['cbse-10-science-ch01']!.answered).toBe(2);
    expect(p.chapters['cbse-10-science-ch01']!.number).toBe(1);
    expect(p.subjects.map((s) => s.subjectId).sort()).toEqual(['cbse-10-mathematics', 'cbse-10-science']);
    expect(continueChapter(p)?.chapterId).toBe('cbse-10-mathematics-ch02');
    expect(subjectOfChapter('isc-12-hindi-ch03')).toBe('isc-12-hindi');
  });

  it('member progress → streak, level progress, accuracy and snapshots', () => {
    const mp: MyProgress = {
      totals: { xp: 150, level: 2, levelStartXp: 100, nextLevelXp: 200, streak: { current: 3, longest: 5, lastActiveDay: '2026-10-28', atRisk: false, freezeAvailableThisWeek: true }, lessonsCompleted: 1, practiceAttempts: 4, practiceAccuracy: 0.75 },
      subjects: [
        {
          subjectId: 'cbse-10-science',
          name: 'Science',
          chapters: [
            {
              chapterId: 'cbse-10-science-ch01',
              number: 1,
              title: 'Chemical Reactions and Equations',
              lessons: { partsStarted: 1, partsCompleted: 0, lastPart: 1, lastSlide: 4, lastMode: 'read', updatedAt: now },
              practice: { attempts: 4, questionsAnswered: 4, questionsCorrect: 3, accuracy: 0.75, lastAnsweredAt: now },
            },
          ],
        },
      ],
    };
    const p = fromMemberProgress(mp);
    expect(p.levelProgress).toBeCloseTo(0.5);
    expect(p.streak?.current).toBe(3);
    expect(p.accuracy).toBe(0.75);
    expect(p.chapters['cbse-10-science-ch01']!.title).toBe('Chemical Reactions and Equations');
    expect(continueChapter(p)?.chapterId).toBe('cbse-10-science-ch01');
    expect(continueChapter(null)).toBeNull();
  });
});

describe('activity heatmap', () => {
  it('weeks start on Monday, padding cells are out of range, months labelled once', () => {
    expect(weekday('2026-10-26')).toBe(0); // a Monday
    expect(weekday('2026-11-01')).toBe(6); // a Sunday
    const weeks = heatmapWeeks([{ date: '2026-10-28', total: 12 }], '2026-09-30', '2026-10-28');
    expect(weeks.every((w) => w.days.length === 7)).toBe(true);
    const days = weeks.flatMap((w) => w.days);
    expect(days[0]!.date).toBe('2026-09-28');
    expect(days[0]!.inRange).toBe(false);
    expect(days.find((d) => d.date === '2026-10-28')).toMatchObject({ total: 12, level: 3, inRange: true });
    expect(days.find((d) => d.date === '2026-11-01')?.inRange).toBe(false);
    expect(weeks.filter((w) => w.month).map((w) => w.month)).toEqual(['Oct']);
  });
  it('intensity thresholds', () => {
    expect([0, 1, 3, 4, 9, 10, 19, 20, 99].map(heatLevel)).toEqual([0, 1, 1, 2, 2, 3, 3, 4, 4]);
    expect(dayLabel('2026-10-05')).toBe('5 Oct 2026');
    expect(windowStart('2026-10-28', '2026-10-28', 1, 7)).toBe('2026-10-22');
    expect(windowStart('2025-10-28', '2026-10-28', 366)).toBe('2025-10-28');
  });
  it('renders one summary for screen readers and a cell per day in range', () => {
    const activity: MyActivity = {
      timezone: 'Asia/Kolkata',
      from: '2026-10-01',
      to: '2026-10-28',
      days: 28,
      calendar: [
        { date: '2026-10-27', answered: 3, solved: 2, lessonsCompleted: 1, testsSubmitted: 0, total: 4 },
        { date: '2026-10-28', answered: 9, solved: 5, lessonsCompleted: 0, testsSubmitted: 1, total: 10 },
      ],
      totals: { answered: 12, solved: 7, lessonsCompleted: 1, testsSubmitted: 1, activeDays: 2 },
      streak: { current: 2, longest: 2, lastActiveDay: '2026-10-28', atRisk: false, freezeAvailableThisWeek: true },
      activeDaysAllTime: 2,
    };
    render(<Heatmap activity={activity} />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('aria-label')).toBe('Activity heatmap: 2 active days in the last 28 days; busiest day 28 Oct 2026 with 10 activities');
    // At least 16 weeks are drawn, so a new student sees a calendar to fill.
    expect(screen.getByTestId('heatmap').querySelectorAll('[title]')).toHaveLength(112);
    expect(screen.getByTitle('28 Oct 2026: 10 activities').getAttribute('data-level')).toBe('3');
  });
});

describe('player card (private, deterministic)', () => {
  const card: MyPlayerCard = {
    publicName: 'Brave Otter 123',
    avatar: { id: 'otter', bg: 'sky', isDefault: true },
    level: 4,
    xp: 1240,
    coins: 30,
    overall: 78,
    tier: 'gold',
    provisional: false,
    formulaVersion: 1,
    asOfDay: '2026-10-28',
    attributes: [
      { key: 'ACC', label: 'Accuracy', value: 81, raw: 0.7, weight: 0.25, explain: 'First-try accuracy' },
      { key: 'CON', label: 'Consistency', value: 64, raw: 0.4, weight: 0.15, explain: 'Active days' },
    ],
  };
  it('shows the public name, overall, tier and attributes, with one accessible description', () => {
    render(<PlayerCard card={card} />);
    const el = screen.getByTestId('player-card');
    expect(el.getAttribute('data-tier')).toBe('gold');
    expect(el.getAttribute('aria-label')).toBe('Gold player card: overall 78. Accuracy 81, Consistency 64.');
    expect(el.textContent).toContain('Brave Otter 123');
    expect(el.textContent).toContain('81 ACC');
    expect(crestInitials('Brave Otter 123')).toBe('BO');
    expect(crestInitials('')).toBe('?');
  });
  it('provisional ribbon; attribute explanations; blank card has no numbers', () => {
    render(<PlayerCard card={{ ...card, provisional: true }} />);
    expect(screen.getByTestId('player-card').getAttribute('aria-label')).toContain('(provisional)');
    cleanup();
    render(<CardAttributes card={card} />);
    expect(screen.getByText('First-try accuracy')).toBeTruthy();
    cleanup();
    render(<BlankPlayerCard title="Solve 10 questions" />);
    expect(screen.getByTestId('player-card-blank').textContent).not.toMatch(/\b[4-9]\d\b/); // no rating
  });
});

describe('weekly league zones', () => {
  type St = Schemas['LeagueCurrent']['standings'][number];
  const st = (rank: number, zone: St['zone']): St => ({ rank, name: `S ${rank}`, avatar: null, xp: 100 - rank, zone, isMe: rank === 3 });
  it('labels the promotion zone and every change of zone', () => {
    const rows = zoneRows([st(1, 'promotion'), st(2, 'promotion'), st(3, 'safe'), st(4, 'relegation')]);
    expect(rows.map((r) => (r.kind === 'divider' ? `[${r.zone}]` : r.s.rank))).toEqual(['[promotion]', 1, 2, '[safe]', 3, '[relegation]', 4]);
    expect(zoneRows([st(1, 'safe')]).map((r) => r.kind)).toEqual(['row']);
  });
});

describe('store rarity (deterministic, earned only)', () => {
  const base = { priceCoins: 100, stock: null, eligibilityLabel: null, availableFrom: null, availableUntil: null };
  it('from the item facts only', () => {
    expect(itemRarity(base)).toBe('common');
    expect(itemRarity({ ...base, priceCoins: 600 })).toBe('rare');
    expect(itemRarity({ ...base, priceCoins: 2500 })).toBe('epic');
    expect(itemRarity({ ...base, availableUntil: '2026-12-31T00:00:00Z' })).toBe('epic');
    expect(itemRarity({ ...base, stock: 50 })).toBe('legendary');
    expect(itemRarity({ ...base, eligibilityLabel: 'Top 10 in a live mock' })).toBe('legendary');
  });
});

describe('chapter learning path', () => {
  const p = (over: Partial<HubProgressState> = {}): HubProgressState => ({ source: 'device', parts: [], practiceAnswered: 0, practiceCorrect: 0, ...over });
  it('step states', () => {
    expect(stepState('notes', false, null)).toBe('soon');
    expect(stepState('lesson', true, null)).toBe('todo');
    expect(stepState('lesson', true, p({ parts: [{ part: 1, slide: 3, completed: false }] }))).toBe('progress');
    expect(stepState('lesson', true, p({ parts: [{ part: 1, slide: 20, completed: true }, { part: 2, slide: null, completed: false }] }))).toBe('progress');
    expect(stepState('lesson', true, p({ parts: [{ part: 1, slide: 20, completed: true }] }))).toBe('done');
    expect(stepState('practice', true, p({ practiceAnswered: 2, practiceCorrect: 1 }), 75)).toBe('progress');
    expect(stepState('practice', true, p({ practiceAnswered: 50, practiceCorrect: 45 }), 75)).toBe('done');
    expect(stepState('test', true, p())).toBe('todo');
  });
});

describe('course display helpers', () => {
  it('subject tiles are stable and recognisable', () => {
    expect(subjectStyle('cbse-10-mathematics', 'Mathematics (Standard 041 / Basic 241)')).toEqual({ glyph: 'π', hue: 'blue', art: 'maths' });
    expect(subjectStyle('cbse-10-hindi-a', 'Hindi Course A', 'hi')).toEqual({ glyph: 'हि', hue: 'red', art: 'hindi' });
    expect(subjectStyle('cbse-10-science', 'Science').glyph).toBe('Sc');
    expect(subjectStyle('cbse-12-painting', 'Painting')).toEqual(subjectStyle('cbse-12-painting', 'Painting'));
  });
  it('chapter links from ids (CISCE ids map to the cisce board slug)', () => {
    expect(chapterHref('cbse-10-science-ch01')).toBe('/learn/cbse/10/science/ch01');
    expect(chapterHref('icse-10-chemistry-ch03')).toBe('/learn/cisce/10/chemistry/ch03');
    expect(chapterHref('isc-12-hindi-ch02')).toBe('/learn/cisce/12/hindi/ch02');
    expect(chapterHref('nonsense')).toBeNull();
  });
  it('greeting uses India time, not the device zone', () => {
    expect(greeting(new Date('2026-10-28T02:00:00Z'))).toBe('Good morning'); // 07:30 IST
    expect(greeting(new Date('2026-10-28T09:00:00Z'))).toBe('Good afternoon'); // 14:30 IST
    expect(greeting(new Date('2026-10-28T14:00:00Z'))).toBe('Good evening'); // 19:30 IST
  });
});

describe('kit: mastery and difficulty displays', () => {
  it('pip and ring always say the level / value in text', () => {
    render(<MasteryPip level="proficient" />);
    expect(screen.getByText('Proficient')).toBeTruthy();
    cleanup();
    render(<ProgressRing value={42.4} label="Science: 42% mastery" />);
    const ring = screen.getByRole('img', { name: 'Science: 42% mastery' });
    expect(ring.textContent).toBe('42%');
  });
  it('segmented bar describes the counts', () => {
    render(<MasteryBar counts={{ not_started: 10, attempted: 2, familiar: 1, proficient: 0, mastered: 1 }} label="Science chapters" />);
    expect(screen.getByRole('img').getAttribute('aria-label')).toBe('Science chapters: 10 not started, 2 attempted, 1 familiar, 1 mastered');
  });
  it('difficulty tag text', () => {
    render(<DifficultyTag band="hard" />);
    const tag = screen.getByText('Hard');
    expect(tag.getAttribute('data-band')).toBe('hard');
    expect(within(tag.parentElement!).getByText('Hard')).toBeTruthy();
  });
});
