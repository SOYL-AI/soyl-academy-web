/**
 * Learn hierarchy, design language v3 (ADR-032): stage copy, class hub ordering (a subject with lessons is never
 * folded away), the chapter hub's resume point and study-mode state, the board picker, and the /learn landing for
 * guests and members (no full-size picker for members).
 */
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LearnerProgress } from '../lib/learner';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn() },
  progress: { progress: null as unknown, ready: true, refresh: () => undefined },
  stage: 'middle' as 'junior' | 'middle' | 'senior',
  hub: null as unknown,
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('../learn/ProgressProvider', () => ({ useLearnerProgress: () => h.progress }));
vi.mock('../learn/useInsights', () => ({ useMastery: () => ({ status: 'guest' }) }));
vi.mock('../coins/DailyChallengeCard', () => ({ DailyChallengeCard: () => <section data-testid="daily-challenge" /> }));
vi.mock('../shell/StageProvider', async () => {
  const { byStage } = await import('../shell/stage');
  return { useStage: () => ({ stage: h.stage, classLevel: null, source: 'default', pick: (v: Record<string, unknown>) => byStage(h.stage, v as never) }) };
});

import { chapterCta, classLead, continuePill, noClassText, stageGreeting } from '../learn/copy';
import { PLAIN_OVER, readyFirst, subjectMeta } from '../learn/class-hub';
import { hubResume, resumePart, StudyModes, type HubAssets, type HubProgressState } from '../learn/HubProgress';
import { BoardPicker, classLinkName } from '../learn/BoardPicker';
import { classEyebrow, LearnLanding } from '../learn/LearnHome';
import { MasteryProvider } from '../learn/MasteryProvider';

afterEach(cleanup);
beforeEach(() => {
  h.session = { state: { status: 'guest' }, openLogin: vi.fn() };
  h.progress = { progress: null, ready: true, refresh: () => undefined };
  h.stage = 'middle';
  h.api.get.mockReset();
  h.api.get.mockResolvedValue({ status: 'ok', challenges: [{ subjectId: 'cbse-10-science', subjectName: 'Science' }, { subjectId: 'cbse-10-maths', subjectName: 'Mathematics' }] });
});

describe('stage copy (DESIGN-LANGUAGE §6)', () => {
  it('greets in the tone of each stage, with and without a name', () => {
    expect(stageGreeting('junior', 'Good evening', 'Asha')).toBe('Hi Asha, ready to explore?');
    expect(stageGreeting('middle', 'Good evening', 'Asha')).toBe('Good evening, Asha');
    expect(stageGreeting('senior', 'Good evening', 'Asha')).toBe('Evening, Asha');
    expect(stageGreeting('senior', 'Good morning', null)).toBe('Good morning');
    expect(stageGreeting('junior', 'Good morning', '  ')).toBe('Hi, ready to explore?');
  });
  it('primary actions follow the brief', () => {
    const ch = { number: 3, title: 'Electrostatics' };
    expect(chapterCta('junior', 'continue', ch)).toBe("Let's go: Chapter 3");
    expect(chapterCta('middle', 'continue', ch)).toBe('Continue Chapter 3');
    expect(chapterCta('senior', 'continue', ch)).toBe('Continue: Electrostatics');
    expect(chapterCta('middle', 'start', ch)).toBe('Start Chapter 3');
    expect(continuePill('junior', 'start')).toBe("Let's go");
    expect(continuePill('senior', 'continue')).toBe('Continue');
  });
  it('class lead and empty state never use exclamation marks', () => {
    for (const st of ['junior', 'middle', 'senior'] as const) {
      expect(classLead(st, 3, 12, '2026-27')).toMatch(/^3 courses are ready to learn, free\./);
      expect(noClassText(st)).not.toContain('!');
    }
    expect(classLead('middle', 0, 12, '2026-27')).toBe('12 subjects for 2026-27. Lessons are on the way; every chapter list is already here.');
    expect(classLead('senior', 1, 9, '2026-27')).toBe('1 course is ready to learn, free. 9 subjects · 2026-27 syllabus.');
  });
});

describe('class hub', () => {
  const subjects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  it('lists subjects with lessons first, keeping catalog order, and hides nothing', () => {
    expect(readyFirst(subjects, new Set(['c', 'a'])).map((x) => x.id)).toEqual(['a', 'c', 'b', 'd']);
    expect(readyFirst(subjects, null).map((x) => x.id)).toEqual(['a', 'b', 'c', 'd']);
    expect(readyFirst(subjects, new Set())).toHaveLength(4);
  });
  it('writes what a card leads to', () => {
    expect(subjectMeta({ code: '086' }, 13, true)).toBe('13 chapters · Code 086');
    expect(subjectMeta({ code: '241', theoryOnly: true }, 0, false)).toBe('Lessons coming soon · Code 241 · Theory only');
    expect(subjectMeta({}, 1, null)).toBe('1 chapter');
    expect(subjectMeta({}, 0, null)).toBeUndefined();
    expect(PLAIN_OVER).toBe(8);
  });
});

const ASSETS: HubAssets = {
  base: '/learn/cbse/10/science/ch01',
  parts: [
    { part: 1, slideCount: 21, label: 'Part 1: Equations' },
    { part: 2, slideCount: 18, label: 'Part 2: Redox' },
  ],
  notes: { available: true, sections: 9 },
  flashcards: { available: true, count: 32 },
  practice: { available: true, count: 77 },
  tests: { count: 2, href: '/tests/series/cbse/10/science' },
};
const prog = (over: Partial<HubProgressState> = {}): HubProgressState => ({ source: 'device', parts: [], practiceAnswered: 0, practiceCorrect: 0, ...over });

describe('chapter hub resume point', () => {
  it('starts with the lesson, continues the part in progress, then the next part, then practice', () => {
    expect(hubResume(ASSETS, null)).toMatchObject({ kind: 'start-lesson', part: { part: 1 } });
    expect(hubResume(ASSETS, prog({ parts: [{ part: 1, slide: 4, completed: false }] }))).toMatchObject({ kind: 'continue-lesson', part: { part: 1 }, slide: 4 });
    expect(hubResume(ASSETS, prog({ parts: [{ part: 1, slide: 20, completed: true }] }))).toMatchObject({ kind: 'next-part', part: { part: 2 } });
    const lessonDone = prog({ parts: [{ part: 1, slide: 20, completed: true }, { part: 2, slide: 17, completed: true }] });
    expect(hubResume(ASSETS, lessonDone)).toEqual({ kind: 'practice' });
    expect(hubResume(ASSETS, { ...lessonDone, practiceAnswered: 60, practiceCorrect: 50 })).toEqual({ kind: 'notes' });
    expect(hubResume({ ...ASSETS, parts: [], practice: { available: false, count: 0 }, notes: { available: false, sections: 0 } }, null)).toBeNull();
  });
  it('resumePart prefers the part in progress', () => {
    expect(resumePart(ASSETS.parts, prog({ parts: [{ part: 1, slide: 20, completed: true }, { part: 2, slide: 3, completed: false }] }))?.part.part).toBe(2);
    expect(resumePart([], null)).toBeNull();
  });
});

describe('study modes', () => {
  it('one tile per mode with real state; missing modes say "Coming soon" and do not link', () => {
    h.hub = null;
    render(
      <ul>
        <StudyModes assets={{ ...ASSETS, flashcards: { available: false, count: 0 } }} />
      </ul>,
    );
    expect(screen.getByTestId('mode-lesson').getAttribute('href')).toBe('/learn/cbse/10/science/ch01/lesson');
    expect(screen.getByTestId('mode-lesson').textContent).toContain('2 parts · 39 slides');
    expect(screen.getByTestId('mode-practice').textContent).toContain('77 questions');
    expect(screen.getByTestId('mode-tests').getAttribute('href')).toBe('/tests/series/cbse/10/science');
    const cards = screen.getByTestId('mode-flashcards');
    expect(cards.tagName).toBe('DIV');
    expect(cards.textContent).toContain('Coming soon');
  });
});

describe('board picker', () => {
  it('names every class link in full, in both variants', () => {
    expect(classLinkName('cisce', 10)).toBe('CISCE Class 10 (ICSE)');
    expect(classLinkName('cisce', 12)).toBe('CISCE Class 12 (ISC)');
    expect(classLinkName('cbse', 7)).toBe('CBSE Class 7');
    const { unmount } = render(<BoardPicker />);
    expect(screen.getByRole('link', { name: 'CISCE Class 10 (ICSE)' }).getAttribute('href')).toBe('/learn/cisce/10');
    expect(screen.getAllByRole('heading', { level: 2 }).map((x) => x.textContent)).toEqual(['CBSE', 'CISCE']);
    unmount();
    render(<BoardPicker variant="compact" current={{ board: 'cbse', classLevel: 9 }} />);
    expect(screen.getAllByRole('link')).toHaveLength(12);
    expect(screen.getByRole('link', { name: 'CBSE Class 9' }).getAttribute('aria-current')).toBe('true');
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
  });
});

describe('/learn landing', () => {
  const props = { picker: <div data-testid="picker-full" />, compactPicker: <div data-testid="picker-compact" />, freeLine: <p>free</p> };

  it('guests (and the static HTML) get "What are you studying?" with the full picker', async () => {
    render(<LearnLanding {...props} />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('What are you studying?');
    expect(screen.getByTestId('picker-full')).toBeTruthy();
    expect(screen.queryByTestId('picker-compact')).toBeNull();
    expect(await screen.findByRole('link', { name: /^Science/ })).toBeTruthy();
    expect(screen.getByTestId('guest-nudge-login')).toBeTruthy();
  });

  it('members: greeting, resume point, their subjects, compact picker; never the full picker', async () => {
    h.stage = 'senior';
    h.session = { state: { status: 'member', user: { id: 'u1', displayName: 'Asha', board: 'cbse', classLevel: 10 } }, openLogin: vi.fn() };
    const progress: LearnerProgress = {
      source: 'member',
      xp: 0,
      level: 1,
      levelProgress: 0,
      streak: null,
      lessonsCompleted: 0,
      practiceAnswered: 2,
      practiceCorrect: 1,
      accuracy: 0.5,
      subjects: [],
      chapters: {
        'cbse-10-science-ch02': {
          chapterId: 'cbse-10-science-ch02',
          subjectId: 'cbse-10-science',
          number: 2,
          title: 'Acids, Bases and Salts',
          level: 'attempted',
          lessonPartsStarted: 1,
          lessonPartsCompleted: 0,
          lastPart: 1,
          lastSlide: 3,
          answered: 2,
          correct: 1,
          lastActivityAt: '2026-11-12T10:00:00Z',
        },
      },
    };
    h.progress = { progress, ready: true, refresh: () => undefined };
    render(
      <MasteryProvider>
        <LearnLanding {...props} />
      </MasteryProvider>,
    );
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/^(Morning|Afternoon|Evening), Asha$/);
    expect(screen.queryByTestId('picker-full')).toBeNull();
    expect(screen.getByTestId('picker-compact')).toBeTruthy();
    const resume = screen.getByTestId('continue-card');
    expect(resume.getAttribute('href')).toBe('/learn/cbse/10/science/ch02');
    expect(resume.textContent).toContain('Acids, Bases and Salts');
    expect(screen.getByTestId('dashboard-link').getAttribute('href')).toBe('/me/dashboard');
    const mine = screen.getByTestId('my-subjects');
    expect(await within(mine).findByRole('link', { name: /^Mathematics/ })).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(classEyebrow({ board: 'cisce', classLevel: 9 })).toBe('ICSE · Class 9');
  });

  it('a member without a class gets a calm empty state and the compact picker', () => {
    h.session = { state: { status: 'member', user: { id: 'u1', displayName: null, board: null, classLevel: null } }, openLogin: vi.fn() };
    render(<LearnLanding {...props} />);
    expect(screen.getByText('No class yet')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Set my class' }).getAttribute('href')).toBe('/me');
    expect(screen.getByTestId('picker-compact')).toBeTruthy();
    expect(screen.getByTestId('continue-card').textContent).toContain('Pick a subject to start');
  });
});
