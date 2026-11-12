/**
 * Home view-models (design language v3 §10 "Home"): greeting and copy per age stage, the next step, continue meta,
 * subject cards (tint, glyph, "no 0% mastery"), study modes from the chapter hub, upcoming live mocks in India time,
 * the league rows (top five + You) and the goal copy.
 */
import { describe, expect, it } from 'vitest';
import type { ChapterHub, LiveEvent } from '@/platform/shared/api-client';
import type { ChapterSnapshot } from '../lib/learner';
import {
  activeDays,
  contentSubjects,
  continueLabel,
  continueMeta,
  continueProgress,
  durationText,
  goalCaption,
  goalTitle,
  homeSubtitle,
  homeTitle,
  istDayLabel,
  leagueRows,
  modeTiles,
  nextStep,
  subjectCards,
  subjectLook,
  upcomingMocks,
  weekRange,
} from '../dashboard/home-model';

const snap = (over: Partial<ChapterSnapshot> = {}): ChapterSnapshot => ({
  chapterId: 'cbse-10-science-ch03',
  subjectId: 'cbse-10-science',
  number: 3,
  title: 'Metals and Non-metals',
  level: 'attempted',
  lessonPartsStarted: 2,
  lessonPartsCompleted: 1,
  lastPart: 2,
  lastSlide: 5,
  answered: 0,
  correct: 0,
  lastActivityAt: '2026-11-12T10:00:00.000Z',
  ...over,
});

function hub(over: { parts?: number[]; notes?: boolean; flashcards?: number; practice?: number; tests?: number; slides?: number } = {}): ChapterHub {
  const parts = over.parts ?? [1, 2, 3];
  return {
    chapter: { id: 'cbse-10-science-ch03', number: 3, title: 'Metals and Non-metals', titleEn: null, unit: null, boardAssessed: true, schoolAssessment: null, topics: [] },
    subject: { id: 'cbse-10-science', name: 'Science', board: 'cbse', exam: 'cbse', classLevel: 10, language: 'en', script: 'Latn' },
    assets: {
      lesson: { available: parts.length > 0, parts: parts.map((part) => ({ part, title: `Part ${part}`, slideCount: 20, hasAudio: false, version: 1, reviewStatus: 'beta' as const })), slideCount: over.slides ?? parts.length * 20 },
      notes: { available: over.notes ?? true, sections: 6, reviewStatus: null },
      flashcards: { available: (over.flashcards ?? 24) > 0, count: over.flashcards ?? 24, reviewStatus: null },
      practice: { available: (over.practice ?? 60) > 0, count: over.practice ?? 60, byType: {}, byDifficulty: {} },
      tests: { available: (over.tests ?? 0) > 0, count: over.tests ?? 0, items: [] },
    },
  } as ChapterHub;
}

describe('greeting and copy per stage', () => {
  it('titles follow DESIGN-LANGUAGE §6; before mount there is no hour', () => {
    expect(homeTitle('junior', 'Good evening', 'Asha')).toBe('Hi Asha, ready to explore?');
    expect(homeTitle('middle', 'Good evening', 'Asha')).toBe('Good evening, Asha');
    expect(homeTitle('senior', 'Good evening', 'Asha')).toBe('Evening, Asha');
    expect(homeTitle('senior', 'Good morning', null)).toBe('Good morning');
    expect(homeTitle('middle', null, 'Asha')).toBe('Hi, Asha');
    expect(homeTitle('middle', null, '  ')).toBe('Hi there');
  });

  it('one encouraging line: new → goal met → streak today → streak at risk → goal left; never a zero', () => {
    const goal = { met: false, remaining: 11, daysLeft: 4, target: 20 };
    expect(homeSubtitle('middle', { fresh: true, goal, streak: null })).toMatch(/free/);
    expect(homeSubtitle('senior', { fresh: false, goal: { ...goal, met: true }, streak: { current: 5, today: true } })).toBe('Weekly goal met. Extra practice still builds mastery.');
    expect(homeSubtitle('junior', { fresh: false, goal, streak: { current: 3, today: true } })).toBe('Nice one! 3 days in a row.');
    expect(homeSubtitle('middle', { fresh: false, goal, streak: { current: 3, today: true } })).toBe('Good work: 3 days in a row.');
    expect(homeSubtitle('senior', { fresh: false, goal, streak: { current: 3, today: true } })).toBe('3 days in a row.');
    expect(homeSubtitle('middle', { fresh: false, goal, streak: { current: 6, today: false } })).toBe('One short lesson keeps your 6-day streak going.');
    expect(homeSubtitle('middle', { fresh: false, goal, streak: { current: 1, today: true } })).toBe('11 questions to go for this week’s goal.');
    expect(homeSubtitle('senior', { fresh: false, goal: { ...goal, remaining: 1, daysLeft: 1 }, streak: null })).toBe('1 question left on this week’s goal · 1 day to go.');
  });

  it('continue labels stay pill-short', () => {
    expect(continueLabel('junior', snap())).toBe('Let’s go: Chapter 3');
    expect(continueLabel('middle', snap())).toBe('Continue Chapter 3');
    expect(continueLabel('senior', snap())).toBe('Continue: Metals and Non-metals');
    expect(continueLabel('senior', snap({ title: 'Electrostatic Potential and Capacitance' }))).toBe('Continue Chapter 3');
  });
});

describe('next step and continue', () => {
  it('the lesson part the student was on, then practice, else the chapter; without a chapter the class hub or /learn', () => {
    expect(nextStep('middle', { chapter: snap(), hub: hub(), board: 'cbse', classLevel: 10 })).toEqual({ href: '/learn/cbse/10/science/ch03/lesson?part=2', label: 'Continue Chapter 3', kind: 'lesson' });
    expect(nextStep('middle', { chapter: snap({ lastPart: 1 }), hub: hub(), board: 'cbse', classLevel: 10 }).href).toBe('/learn/cbse/10/science/ch03/lesson');
    expect(nextStep('middle', { chapter: snap({ lessonPartsCompleted: 3 }), hub: hub(), board: 'cbse', classLevel: 10 })).toMatchObject({ href: '/learn/cbse/10/science/ch03/practice', kind: 'practice' });
    expect(nextStep('middle', { chapter: snap({ lessonPartsCompleted: 3 }), hub: hub({ practice: 0 }), board: 'cbse', classLevel: 10 })).toMatchObject({ href: '/learn/cbse/10/science/ch03', kind: 'chapter' });
    expect(nextStep('middle', { chapter: snap(), hub: null, board: 'cbse', classLevel: 10 })).toMatchObject({ href: '/learn/cbse/10/science/ch03', kind: 'chapter' });
    expect(nextStep('middle', { chapter: null, hub: null, board: 'cisce', classLevel: 9 })).toEqual({ href: '/learn/cisce/9', label: 'Pick a subject', kind: 'class' });
    expect(nextStep('junior', { chapter: null, hub: null, board: null, classLevel: null })).toEqual({ href: '/learn', label: 'Pick a subject', kind: 'learn' });
  });

  it('continue meta and progress use the hub’s real part count', () => {
    expect(continueMeta(snap({ answered: 4 }), hub(), 'Science')).toBe('Science · Chapter 3 · On part 2 of 3 · 4 answered');
    expect(continueMeta(snap({ lessonPartsCompleted: 3 }), hub(), 'Science')).toBe('Science · Chapter 3 · Lesson done');
    expect(continueMeta(snap(), null, null)).toBe('Chapter 3');
    expect(continueProgress(snap(), hub())).toEqual({ value: (1 / 3) * 100, label: '1 of 3 parts done' });
    expect(continueProgress(snap({ lessonPartsCompleted: 0 }), hub({ parts: [0] }))).toEqual({ value: 0, label: 'Lesson started' });
    expect(continueProgress(snap(), hub({ parts: [] }))).toBeNull();
  });
});

describe('subjects', () => {
  it('one tint per subject (§2), glyph kind, Devanagari names get lang="hi"', () => {
    expect(subjectLook('cbse-10-mathematics', 'Mathematics')).toMatchObject({ tint: 'blue', art: 'maths' });
    expect(subjectLook('cbse-10-science', 'Science')).toMatchObject({ tint: 'green', art: 'science' });
    expect(subjectLook('cbse-10-english-lnl', 'English Language and Literature')).toMatchObject({ tint: 'pink', art: 'english' });
    expect(subjectLook('cbse-10-hindi-a', 'हिंदी (पाठ्यक्रम अ)')).toMatchObject({ tint: 'red', lang: 'hi' });
    expect(subjectLook('cbse-10-social-science', 'Social Science')).toMatchObject({ tint: 'orange' });
    expect(subjectLook('cbse-11-zz-unknown', 'Painting').tint).not.toBe('neutral');
  });

  it('cards: chapters started as the bar, mastery named from 10%, nothing for untouched subjects', () => {
    const subjects = contentSubjects({
      challenges: [
        { subjectId: 'cbse-10-science', subjectName: 'Science' },
        { subjectId: 'cbse-10-science', subjectName: 'Science' },
        { subjectId: 'cbse-10-mathematics', subjectName: 'Mathematics' },
        { subjectId: 'cbse-10-english', subjectName: 'English' },
      ] as never,
    });
    expect(subjects.map((x) => x.subjectId)).toEqual(['cbse-10-science', 'cbse-10-mathematics', 'cbse-10-english']);
    const mastery = [
      { subjectId: 'cbse-10-science', score: 34, chapterCount: 13 },
      { subjectId: 'cbse-10-mathematics', score: 2, chapterCount: 14 },
    ];
    const cards = subjectCards(subjects, 'cbse', 10, mastery, new Map([['cbse-10-science', 3], ['cbse-10-mathematics', 1]]), 'middle');
    expect(cards.map((c) => [c.href, c.meta, c.progress?.label ?? null])).toEqual([
      ['/learn/cbse/10/science', '34% mastery', '3 of 13 chapters'],
      ['/learn/cbse/10/mathematics', 'Started', '1 of 14 chapters'],
      ['/learn/cbse/10/english', 'Not started yet', null],
    ]);
    expect(subjectCards(subjects, 'cbse', 10, [], new Map(), 'junior')[0]!.meta).toBe('Ready when you are');
    expect(contentSubjects(null)).toEqual([]);
  });
});

describe('study modes', () => {
  it('real state from the hub; a mode the chapter does not have is "Coming soon" with no link', () => {
    const tiles = modeTiles('cbse-10-science-ch03', hub({ notes: false, tests: 2 }), snap({ answered: 7 }));
    expect(tiles).toEqual([
      { mode: 'lesson', href: '/learn/cbse/10/science/ch03/lesson', meta: '1 of 3 parts done' },
      { mode: 'notes', href: null, meta: 'Coming soon' },
      { mode: 'flashcards', href: '/learn/cbse/10/science/ch03/flashcards', meta: '24 cards' },
      { mode: 'practice', href: '/learn/cbse/10/science/ch03/practice', meta: '7 of 60 questions tried' },
      { mode: 'tests', href: '/tests', meta: '2 chapter tests · free' },
    ]);
    expect(modeTiles('cbse-10-science-ch03', hub({ parts: [0], slides: 18 }), null)[0]!.meta).toBe('18 slides');
    expect(modeTiles('cbse-10-science-ch03', hub(), snap({ lessonPartsCompleted: 0 }))[0]!.meta).toBe('3 parts · 60 slides');
  });
});

describe('upcoming live mocks', () => {
  const ev = (over: Partial<LiveEvent>): LiveEvent =>
    ({
      id: 'e',
      title: 'Mock',
      phase: 'upcoming',
      subject: { id: 'cbse-10-mathematics', name: 'Mathematics' },
      testId: 't',
      durationMin: 45,
      totalMarks: 40,
      registrationOpensAt: '2026-11-01T00:00:00Z',
      startsAt: '2026-11-15T04:30:00Z',
      lateStartUntil: '2026-11-15T05:00:00Z',
      endsAt: '2026-11-15T05:15:00Z',
      resultsPublishedAt: null,
      ranksBeta: false,
      me: null,
      ...over,
    }) as LiveEvent;
  const now = Date.parse('2026-11-13T12:00:00Z');

  it('joinable only, live first, then by start; India time; status in words', () => {
    const items = upcomingMocks(
      [
        ev({ id: 'done', phase: 'results_published' }),
        ev({ id: 'gone', phase: 'upcoming', lateStartUntil: '2026-11-13T11:00:00Z' }),
        ev({ id: 'later', phase: 'registration_open', startsAt: '2026-11-20T12:30:00Z', durationMin: 180, totalMarks: 80, subject: { id: 'cbse-10-science', name: 'Science' }, me: { registered: true, attemptId: null, attemptStatus: null } }),
        ev({ id: 'soon' }),
        ev({ id: 'now', phase: 'live', startsAt: '2026-11-13T11:30:00Z', lateStartUntil: '2026-11-13T12:30:00Z' }),
      ],
      now,
    );
    expect(items.map((i) => i.id)).toEqual(['now', 'soon', 'later']);
    expect(items[0]!.status).toEqual({ tone: 'live', text: 'Live now' });
    expect(items[1]).toMatchObject({ time: 'Sun', timeSub: '15 Nov', meta: '10:00 · 45 min · 40 marks', href: '/tests/live/soon', status: null, tint: 'blue' });
    expect(items[2]).toMatchObject({ time: 'Fri', timeSub: '20 Nov', meta: '18:00 · 3 h · 80 marks', status: { tone: 'success', text: 'Registered' }, tint: 'green' });
    expect(upcomingMocks([ev({}), ev({ id: 'b' }), ev({ id: 'c' })], now, 2)).toHaveLength(2);
  });

  it('dates and durations', () => {
    expect(istDayLabel('2026-11-14T20:00:00Z')).toBe('Sun 15 Nov'); // 01:30 IST next day
    expect(durationText(45)).toBe('45 min');
    expect(durationText(180)).toBe('3 h');
    expect(durationText(90)).toBe('1 h 30 min');
    expect(weekRange('2026-11-09', '2026-11-15')).toBe('9–15 Nov');
    expect(weekRange('2026-10-26', '2026-11-01')).toBe('26 Oct – 1 Nov');
  });
});

describe('league and goal', () => {
  it('top five plus You (written), "A student" for a hidden name', () => {
    const st = (rank: number, isMe = false, name: string | null = `S${rank}`) => ({ rank, name, avatar: null, xp: 100 - rank, zone: 'safe' as const, isMe });
    expect(leagueRows({ standings: [st(1), st(2, false, null), st(3), st(4), st(5), st(6), st(9, true)], me: null }).map((r) => [r.rank, r.name, !!r.you])).toEqual([
      [1, 'S1', false],
      [2, 'A student', false],
      [3, 'S3', false],
      [4, 'S4', false],
      [5, 'S5', false],
      [9, 'S9', true],
    ]);
    expect(leagueRows({ standings: [st(1, true), st(2)], me: null })).toHaveLength(2);
  });

  it('goal title and caption by stage; active days from the calendar', () => {
    const g = { met: false, progress: 7, target: 20, remaining: 13, daysLeft: 3 };
    expect(goalTitle('middle', g)).toBe('13 more to go');
    expect(goalCaption('middle', g)).toBe('3 days left this week. New practice questions you solve count.');
    expect(goalCaption('senior', { ...g, daysLeft: 0 })).toBe('Last day this week. First-time solves count.');
    expect(goalTitle('junior', { ...g, met: true, progress: 22 })).toBe('Goal smashed: 2 extra');
    expect(goalTitle('middle', { ...g, met: true, progress: 20 })).toBe('Goal met');
    expect(activeDays([{ date: '2026-11-10', total: 0 }, { date: '2026-11-11', total: 3 }])).toEqual(['2026-11-11']);
  });
});
