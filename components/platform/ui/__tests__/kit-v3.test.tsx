/**
 * Design language v3 kit (ADR-032): structure, accessible names and the "colour is never the only cue" rule.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ButtonLink } from '../kit/ButtonLink';
import { Card, EmptyState, SkeletonCard } from '../kit/Display';
import { GoalRing, WeekStrip, weekDays, istToday } from '../kit/Goal';
import { DateChip, GreetingHeader, greetingFor } from '../kit/Greeting';
import { DataTable, dataTableNum, List, ListRow, StatusPill, Timeline } from '../kit/Lists';
import { CardGrid, PageColumns, PageSection, SectionHeader } from '../kit/Page';
import { LeaderboardMini, RailCard } from '../kit/Rail';
import { StatCard, StatGrid } from '../kit/Stat';
import { ContinueCard, IconTile, ModeTile, SubjectCard } from '../kit/Tiles';
import { isTint, STUDY_MODES, subjectTint, TINT_NAMES } from '../kit/tints';

describe('tints', () => {
  it('maps course hues and subject-art kinds to tints; unknown → neutral', () => {
    for (const hue of ['blue', 'red', 'yellow', 'green', 'violet', 'teal']) expect(subjectTint(hue)).toBe(hue);
    expect(subjectTint('maths')).toBe('blue');
    expect(subjectTint('hindi')).toBe('red');
    expect(subjectTint('chemistry')).toBe('teal');
    expect(subjectTint('nonsense')).toBe('neutral');
    expect(subjectTint(null)).toBe('neutral');
    expect(isTint('pink')).toBe(true);
    expect(isTint('purple')).toBe(false);
    expect(TINT_NAMES).toHaveLength(9);
    for (const m of Object.values(STUDY_MODES)) expect(isTint(m.tint)).toBe(true);
  });
});

describe('Greeting', () => {
  it('greets by the hour in India time', () => {
    expect(greetingFor(new Date('2026-11-12T02:30:00Z'))).toBe('Good morning'); // 08:00 IST
    expect(greetingFor(new Date('2026-11-12T08:30:00Z'))).toBe('Good afternoon'); // 14:00 IST
    expect(greetingFor(new Date('2026-11-12T14:30:00Z'))).toBe('Good evening'); // 20:00 IST
    expect(greetingFor(new Date('2026-11-11T20:30:00Z'))).toBe('Good evening'); // 02:00 IST
  });
  it('GreetingHeader: one h1 title, subtitle, actions; art is decorative', () => {
    render(
      <GreetingHeader variant="hero" eyebrow="CBSE Class 10" title="Good evening, Asha" subtitle="One lesson closer." actions={<ButtonLink href="/learn">Continue</ButtonLink>} art={<span>art</span>} />,
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Good evening, Asha');
    expect(screen.getByRole('link', { name: 'Continue' }).getAttribute('href')).toBe('/learn');
    expect(screen.getByText('art').closest('[aria-hidden="true"]')).not.toBeNull();
  });
  it('DateChip says the full date to screen readers', () => {
    render(<DateChip date={new Date('2026-11-12T06:00:00Z')} />);
    expect(screen.getByText(/Today is Thursday, 12 November/)).toBeTruthy();
  });
});

describe('cards and tiles', () => {
  it('SubjectCard is one link with the subject, meta and written progress', () => {
    render(
      <CardGrid label="Your subjects">
        <SubjectCard href="/learn/cbse/10/science" title="Science" meta="13 chapters" tint="green" art={<svg />} progress={{ value: 42, label: '42% done' }} />
      </CardGrid>,
    );
    const list = screen.getByRole('list', { name: 'Your subjects' });
    const link = within(list).getByRole('link');
    expect(link.getAttribute('href')).toBe('/learn/cbse/10/science');
    expect(link.textContent).toContain('Science');
    expect(link.textContent).toContain('13 chapters');
    expect(link.textContent).toContain('42% done');
    expect(link.getAttribute('data-tint')).toBe('green');
  });
  it('ModeTile: the mode name by default; disabled is not a link', () => {
    render(
      <ul>
        <ModeTile mode="practice" href="/p" meta="77 questions" />
        <ModeTile mode="flashcards" meta="Coming soon" disabled />
      </ul>,
    );
    expect(screen.getByRole('link').textContent).toContain('Practice');
    expect(screen.getAllByRole('link')).toHaveLength(1);
    const off = screen.getByText('Flashcards').closest('[data-mode]')!;
    expect(off.getAttribute('aria-disabled')).toBe('true');
  });
  it('ContinueCard: one link with eyebrow, title, meta and the call to action', () => {
    render(<ContinueCard href="/learn/x/lesson" title="Chemical Reactions" meta="Science · Part 2 of 3" progress={{ value: 60, label: '60%' }} />);
    const link = screen.getByRole('link');
    expect(link.textContent).toMatch(/Continue where you left off.*Chemical Reactions.*Science · Part 2 of 3.*60%.*Continue/);
  });
  it('IconTile is decorative', () => {
    const { container } = render(<IconTile icon="book" tint="yellow" />);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
  it('Card tint and EmptyState tint set their custom properties', () => {
    const { container } = render(
      <>
        <Card tint="pink">x</Card>
        <EmptyState title="Nothing yet" tint="green" compact />
        <SkeletonCard thumb />
      </>,
    );
    const card = container.querySelector('[data-tint="pink"]') as HTMLElement;
    expect(card.style.getPropertyValue('--card-tint')).toBe('var(--p-tint-pink)');
    expect(screen.getByRole('heading', { name: 'Nothing yet' })).toBeTruthy();
  });
});

describe('stats and goals', () => {
  it('StatCard writes the trend in words; with href it is a link', () => {
    render(
      <StatGrid label="This week">
        <StatCard label="Solved this week" value={12} trend={{ direction: 'up', text: '3 more than last week' }} href="/me/progress" />
        <StatCard label="Accuracy" value="78" unit="%" />
      </StatGrid>,
    );
    expect(screen.getByRole('group', { name: 'This week' })).toBeTruthy();
    expect(screen.getByRole('link').textContent).toContain('3 more than last week');
  });
  it('GoalRing names its progress; done when the target is met', () => {
    const { container, rerender } = render(<GoalRing value={15} target={20} unit="questions" label="Today's goal: 15 of 20 questions" />);
    expect(screen.getByRole('img', { name: "Today's goal: 15 of 20 questions" })).toBeTruthy();
    expect(container.querySelector('[data-done]')).toBeNull();
    rerender(<GoalRing value={22} target={20} unit="questions" label="done" />);
    expect(container.querySelector('[data-done]')).not.toBeNull();
  });
  it('weekDays: Monday first, states from the active days, India-time today', () => {
    // Thursday 12 Nov 2026.
    const days = weekDays(['2026-11-09', '2026-11-11', '2026-11-12'], '2026-11-12');
    expect(days.map((d) => d.label)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    expect(days.map((d) => d.date)[0]).toBe('2026-11-09');
    expect(days.map((d) => d.state)).toEqual(['done', 'missed', 'done', 'today-done', 'upcoming', 'upcoming', 'upcoming']);
    expect(weekDays([], '2026-11-15').map((d) => d.state).at(-1)).toBe('today'); // Sunday
    expect(istToday(new Date('2026-11-11T19:00:00Z'))).toBe('2026-11-12'); // 00:30 IST
  });
  it('WeekStrip writes every day state for screen readers', () => {
    render(<WeekStrip days={weekDays(['2026-11-10'], '2026-11-12')} label="Study days this week" />);
    const list = screen.getByRole('list', { name: 'Study days this week' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(7);
    expect(list.textContent).toContain('Tue: studied');
    expect(list.textContent).toContain('Thu: today, not yet');
    expect(list.textContent).toContain('Fri: coming up');
  });
});

describe('lists, tables, rail', () => {
  it('ListRow with href is one link; current row is marked', () => {
    render(
      <List label="Chapters">
        <ListRow href="/a" title="Light" meta="12 slides" trailing={<StatusPill tone="success">Done</StatusPill>} current />
        <ListRow title="Sound" />
      </List>,
    );
    expect(screen.getByRole('link').getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('list', { name: 'Chapters' }).children).toHaveLength(2);
  });
  it('StatusPill live shows a dot and the word', () => {
    const { container } = render(<StatusPill tone="live">Live now</StatusPill>);
    expect(container.textContent).toBe('Live now');
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });
  it('DataTable is a focusable, named scroll region with a caption', () => {
    render(
      <DataTable caption="Your tests" hideCaption>
        <thead>
          <tr>
            <th scope="col">Test</th>
            <th scope="col" className={dataTableNum}>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Chapter 1</th>
            <td className={dataTableNum}>18/20</td>
          </tr>
        </tbody>
      </DataTable>,
    );
    const region = screen.getByRole('region', { name: 'Your tests' });
    expect(region.getAttribute('tabindex')).toBe('0');
    expect(screen.getByRole('table', { name: 'Your tests' })).toBeTruthy();
  });
  it('Timeline lists items with time, title and optional links', () => {
    render(<Timeline label="Upcoming live mocks" items={[{ id: 'a', time: 'Sat', timeSub: '15 Nov', title: 'Science mock', href: '/tests/live/a', status: <StatusPill>Registered</StatusPill> }, { id: 'b', time: 'Sun', title: 'Maths mock' }]} />);
    const list = screen.getByRole('list', { name: 'Upcoming live mocks' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(within(list).getByRole('link').textContent).toContain('Science mock');
  });
  it('LeaderboardMini: medals for the top three, ranks written, "You" in words', () => {
    render(
      <LeaderboardMini
        label="This week's league"
        rows={[
          { rank: 1, name: 'Quiet Sparrow', avatar: { id: 'sparrow', bg: 'sky' }, score: 320 },
          { rank: 2, name: 'Brave Otter', avatar: null, score: 300, you: true },
        ]}
      />,
    );
    const rows = within(screen.getByRole('list', { name: "This week's league" })).getAllByRole('listitem');
    expect(rows[0]!.textContent).toContain('Rank 1');
    expect(rows[1]!.getAttribute('data-you')).toBe('true');
    expect(rows[1]!.textContent).toContain('You');
  });
  it('RailCard and PageSection are labelled sections; SectionHeader renders the See all link and count', () => {
    render(
      <PageColumns rail={<RailCard id="goal" title="Today's goal" action={{ href: '/me/progress', label: 'Details' }}>x</RailCard>}>
        <PageSection id="subjects" title="Your subjects" count={6} action={{ href: '/learn', label: 'See all' }}>
          y
        </PageSection>
        <SectionHeader title="Plain" />
      </PageColumns>,
    );
    expect(screen.getByRole('region', { name: "Today's goal" })).toBeTruthy();
    expect(screen.getByRole('region', { name: /Your subjects/ })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'See all' }).getAttribute('href')).toBe('/learn');
    expect(screen.getByRole('complementary', { name: 'Your day at a glance' })).toBeTruthy();
  });
});
