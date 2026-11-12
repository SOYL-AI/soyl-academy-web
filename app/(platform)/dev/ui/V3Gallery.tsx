/**
 * Design language v3 (ADR-032) in the dev gallery: every new kit component, a "today" page composition and the
 * three age stages. Server component (zero client JS); rendered twice by page.tsx (page theme and forced dark), so
 * every id takes a prefix.
 */
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import type { SubjectArtKind } from '@/components/platform/ui/art/subject-art';
import { AnimalAvatar } from '@/components/platform/ui/kit/AnimalAvatar';
import { Button } from '@/components/platform/ui/kit/Button';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Badge, Card, CardMeta, CardTitle, EmptyState, SkeletonCard } from '@/components/platform/ui/kit/Display';
import { GoalRing, WeekStrip, weekDays } from '@/components/platform/ui/kit/Goal';
import { DateChip, GreetingHeader } from '@/components/platform/ui/kit/Greeting';
import { DataTable, dataTableNum, List, ListRow, StatusPill, Timeline } from '@/components/platform/ui/kit/Lists';
import { CardGrid, PageColumns, PageSection } from '@/components/platform/ui/kit/Page';
import { LeaderboardMini, RailCard } from '@/components/platform/ui/kit/Rail';
import { StatCard, StatGrid } from '@/components/platform/ui/kit/Stat';
import { ContinueCard, IconTile, ModeTile, SubjectCard } from '@/components/platform/ui/kit/Tiles';
import { subjectTint, TINT_NAMES, type StudyMode } from '@/components/platform/ui/kit/tints';
import { ProgressBar } from '@/components/platform/ui/kit/Display';
import s from './gallery.module.css';

const SUBJECTS: Array<{ name: string; kind: SubjectArtKind; meta: string; pct: number; lang?: string }> = [
  { name: 'Mathematics', kind: 'maths', meta: '14 chapters', pct: 42 },
  { name: 'Science', kind: 'science', meta: '13 chapters', pct: 18 },
  { name: 'Social Science', kind: 'social', meta: '22 chapters', pct: 0 },
  { name: 'English', kind: 'english', meta: '11 chapters', pct: 64 },
  { name: 'हिंदी (Hindi A)', kind: 'hindi', meta: '17 chapters', pct: 5, lang: 'hi' },
  { name: 'Computer Applications', kind: 'computer', meta: '8 chapters', pct: 90 },
];

const MODES: Array<{ mode: StudyMode; meta: string; disabled?: boolean }> = [
  { mode: 'lesson', meta: '3 parts · 21 slides' },
  { mode: 'notes', meta: 'Read in 8 min' },
  { mode: 'flashcards', meta: '24 cards' },
  { mode: 'practice', meta: '77 questions' },
  { mode: 'tests', meta: 'Coming soon', disabled: true },
];

const LEAGUE = [
  { rank: 1, name: 'Quiet Sparrow 947', avatar: { id: 'falcon', bg: 'sky' }, score: 1240 },
  { rank: 2, name: 'Brave Otter 112', avatar: { id: 'otter', bg: 'mint' }, score: 1105, you: true },
  { rank: 3, name: 'Calm Panda 330', avatar: { id: 'panda', bg: 'lavender' }, score: 990 },
  { rank: 4, name: 'Swift Lynx 58', avatar: { id: 'lynx', bg: 'peach' }, score: 870 },
  { rank: 5, name: 'Bright Koala 801', avatar: { id: 'koala', bg: 'sunflower' }, score: 812 },
];

const DEMO_TODAY = '2026-11-12';
const DEMO_DATE = new Date('2026-11-12T12:00:00Z');

function Goal({ p }: { p: string }) {
  return (
    <RailCard id={`${p}-goal`} title="Today's goal" action={{ href: '#', label: 'Change' }}>
      <GoalRing value={15} target={20} unit="questions" label="Today's goal: 15 of 20 questions" title="5 more to go" caption="Practice questions you have not solved before count." />
      <WeekStrip days={weekDays(['2026-11-09', '2026-11-10', '2026-11-12'], DEMO_TODAY)} label="Study days this week" />
    </RailCard>
  );
}

function League({ p }: { p: string }) {
  return (
    <RailCard id={`${p}-league`} title="Weekly league" aside={<StatusPill tone="info">Bronze</StatusPill>} action={{ href: '#', label: 'See all' }}>
      <LeaderboardMini label="Top five this week" rows={LEAGUE} />
    </RailCard>
  );
}

function Upcoming({ p }: { p: string }) {
  return (
    <RailCard id={`${p}-upcoming`} title="Upcoming live mocks">
      <Timeline
        label="Upcoming live mocks"
        items={[
          { id: 'a', time: 'Sat', timeSub: '15 Nov', title: 'Science full mock', meta: '10:00 · 3 h · 80 marks', href: '#', status: <StatusPill tone="success">Registered</StatusPill>, tint: 'green' },
          { id: 'b', time: 'Sun', timeSub: '16 Nov', title: 'Maths chapter sprint', meta: '18:00 · 45 min', href: '#', tint: 'blue' },
          { id: 'c', time: 'Wed', timeSub: '19 Nov', title: 'English writing skills', meta: '17:00 · 1 h', tint: 'pink' },
        ]}
      />
    </RailCard>
  );
}

function Reward({ p }: { p: string }) {
  return (
    <RailCard id={`${p}-reward`} title="Next reward" tint="yellow">
      <div className={s.row}>
        <IconTile icon="gift" tint="yellow" size="lg" inverse />
        <p className={s.v3Copy}>
          <b>Complete 2 more lessons</b> to unlock the Explorer badge.
        </p>
      </div>
      <ProgressBar label="Explorer badge" value={3} max={5} valueText="3 of 5 lessons" />
    </RailCard>
  );
}

export function V3Gallery({ prefix: p }: { prefix: string }) {
  return (
    <div className={s.stack}>
      <h3 className={s.h3}>Tints (fill, ink)</h3>
      <ul className={s.tints}>
        {TINT_NAMES.map((t) => (
          <li key={t} style={{ background: `var(--p-tint-${t})` }}>
            <IconTile icon="star" tint={t} size="sm" inverse />
            <span style={{ color: `var(--p-tint-${t}-ink)` }}>{t}</span>
          </li>
        ))}
      </ul>

      <h3 className={s.h3}>Buttons (pill)</h3>
      <div className={s.row}>
        <ButtonLink href="#" iconEnd="arrowRight">
          Continue learning
        </ButtonLink>
        <Button variant="secondary">Notes</Button>
        <Button variant="soft" icon="sparkles">
          Ask AI
        </Button>
        <Button variant="ghost">Skip</Button>
        <ButtonLink href="#" variant="secondary" size="sm">
          See all tests
        </ButtonLink>
      </div>

      <h3 className={s.h3}>GreetingHeader (hero and plain), DateChip</h3>
      <GreetingHeader
        variant="hero"
        as="h2"
        eyebrow="CBSE · Class 10"
        title="Good evening, Asha"
        subtitle="One short lesson keeps your 6-day streak going."
        actions={
          <ButtonLink href="#" icon="play" size="lg">
            Continue Chapter 1
          </ButtonLink>
        }
        art={<AnimalAvatar avatar={{ id: 'otter', bg: 'mint' }} size={112} decorative />}
      />
      <GreetingHeader as="h2" eyebrow="Tests" title="Practise like the real paper" subtitle="Free chapter tests, unit tests and full board papers." aside={<DateChip date={DEMO_DATE} />} />

      <h3 className={s.h3}>ContinueCard</h3>
      <ContinueCard
        href="#"
        title="Chemical Reactions and Equations"
        meta="Science · Chapter 1 · Part 2 of 3"
        tint="green"
        art={<SubjectGlyph kind="science" size={56} />}
        progress={{ value: 60, label: '60%' }}
      />

      <h3 className={s.h3}>StatCard, StatGrid</h3>
      <StatGrid label="This week">
        <StatCard label="Solved this week" value={24} icon="checkCircle" tint="green" trend={{ direction: 'up', text: '6 more than last week' }} />
        <StatCard label="Accuracy" value={78} unit="%" icon="target" tint="blue" hint="Last 7 days" />
        <StatCard label="Lessons done" value={5} icon="play" tint="violet" />
        <StatCard label="Study days" value="4/7" icon="calendar" tint="orange" trend={{ direction: 'flat', text: 'Same as last week' }} />
      </StatGrid>

      <h3 className={s.h3}>SubjectCard (tinted and plain), CardGrid</h3>
      <CardGrid label="Subjects">
        {SUBJECTS.map((sub) => (
          <SubjectCard
            key={sub.kind}
            href="#"
            title={sub.name}
            lang={sub.lang}
            meta={sub.meta}
            tint={subjectTint(sub.kind)}
            art={<SubjectGlyph kind={sub.kind} size={32} />}
            progress={sub.pct ? { value: sub.pct, label: `${sub.pct}%` } : undefined}
            badge={sub.pct >= 90 ? <StatusPill tone="success">Almost done</StatusPill> : undefined}
          />
        ))}
      </CardGrid>
      <CardGrid label="Subjects (plain)" min={220}>
        {SUBJECTS.slice(0, 3).map((sub) => (
          <SubjectCard key={sub.kind} variant="plain" href="#" title={sub.name} meta={sub.meta} tint={subjectTint(sub.kind)} art={<SubjectGlyph kind={sub.kind} size={32} />} />
        ))}
      </CardGrid>

      <h3 className={s.h3}>ModeTile</h3>
      <CardGrid label="Study modes" min={200}>
        {MODES.map((m) => (
          <ModeTile key={m.mode} mode={m.mode} href={m.disabled ? undefined : '#'} meta={m.meta} disabled={m.disabled} />
        ))}
      </CardGrid>

      <h3 className={s.h3}>RailCard: goal + week, league, upcoming, next reward</h3>
      <div className={s.grid}>
        <Goal p={p} />
        <League p={p} />
        <Upcoming p={p} />
        <Reward p={p} />
      </div>

      <h3 className={s.h3}>List, ListRow, StatusPill, Badge</h3>
      <List label="Chapters">
        <ListRow href="#" leading={<IconTile icon="checkCircle" tint="green" size="sm" />} title="Chapter 1: Chemical Reactions and Equations" meta="Lesson done · 18 of 77 solved" trailing={<StatusPill tone="success">Proficient</StatusPill>} />
        <ListRow href="#" current leading={<IconTile icon="play" tint="blue" size="sm" />} title="Chapter 2: Acids, Bases and Salts" meta="Part 2 of 3" trailing={<StatusPill tone="info">In progress</StatusPill>} />
        <ListRow href="#" leading={<IconTile icon="circle" tint="neutral" size="sm" />} title="Chapter 3: Metals and Non-metals" meta="Not started" />
      </List>
      <div className={s.row}>
        <StatusPill tone="live">Live now</StatusPill>
        <StatusPill tone="warning" dot>
          Due Sat
        </StatusPill>
        <StatusPill tone="danger">Missed</StatusPill>
        <StatusPill tone="highlight">New</StatusPill>
        <StatusPill>Draft</StatusPill>
        <Badge tone="accent">Badge</Badge>
      </div>

      <h3 className={s.h3}>DataTable</h3>
      <DataTable caption="Recent tests">
        <thead>
          <tr>
            <th scope="col">Test</th>
            <th scope="col">Date</th>
            <th scope="col" className={dataTableNum}>
              Score
            </th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Chapter test: Acids, Bases and Salts</th>
            <td>28 Oct</td>
            <td className={dataTableNum}>16/20</td>
            <td>
              <StatusPill tone="success">Marked</StatusPill>
            </td>
          </tr>
          <tr>
            <th scope="row">Unit test: Chemical substances</th>
            <td>2 Nov</td>
            <td className={dataTableNum}>—</td>
            <td>
              <StatusPill tone="warning">AI marking</StatusPill>
            </td>
          </tr>
        </tbody>
      </DataTable>

      <h3 className={s.h3}>EmptyState (tinted), SkeletonCard, Card tint</h3>
      <div className={s.grid}>
        <Card>
          <EmptyState title="No tests yet" icon="clock" tint="pink" compact action={<ButtonLink href="#" size="sm">Browse tests</ButtonLink>}>
            Tests are free. Your scores appear here.
          </EmptyState>
        </Card>
        <div aria-busy="true">
          <SkeletonCard thumb lines={2} />
        </div>
        <Card tint="violet">
          <CardTitle>Tinted card</CardTitle>
          <CardMeta>Any Card takes tint=…</CardMeta>
        </Card>
      </div>

      <h3 className={s.h3}>Page template: PageColumns + PageSection (two columns when the page is ≥ 960 px wide)</h3>
      <PageColumns
        railLabel="Today"
        rail={
          <>
            <Goal p={`${p}-tpl`} />
            <League p={`${p}-tpl`} />
          </>
        }
      >
        <PageSection id={`${p}-tpl-subjects`} title="Your subjects" count={6} action={{ href: '#', label: 'See all' }}>
          <CardGrid label="Your subjects">
            {SUBJECTS.slice(0, 3).map((sub) => (
              <SubjectCard key={sub.kind} href="#" title={sub.name} meta={sub.meta} tint={subjectTint(sub.kind)} art={<SubjectGlyph kind={sub.kind} size={32} />} />
            ))}
          </CardGrid>
        </PageSection>
        <PageSection id={`${p}-tpl-modes`} title="Study your way" as="h2">
          <CardGrid label="Study modes" min={200}>
            {MODES.slice(0, 4).map((m) => (
              <ModeTile key={m.mode} mode={m.mode} href="#" meta={m.meta} />
            ))}
          </CardGrid>
        </PageSection>
      </PageColumns>

      <h3 className={s.h3}>Age stages: junior (7–8), middle (9–10), senior (11–12)</h3>
      <div className={s.stages}>
        {(['junior', 'middle', 'senior'] as const).map((stage) => (
          <div key={stage} data-stage={stage} className={s.stagePanel} data-testid={`${p}-stage-${stage}`}>
            <p className={s.kind}>data-stage=&quot;{stage}&quot;</p>
            <GreetingHeader as="h2" title={stage === 'junior' ? 'Hi Asha, ready to explore?' : stage === 'middle' ? 'Good evening, Asha' : 'Evening, Asha'} subtitle={stage === 'senior' ? '42 days to boards.' : 'Pick up where you left off.'} />
            <CardGrid label={`${stage} subjects`}>
              {SUBJECTS.slice(0, 2).map((sub) => (
                <SubjectCard key={sub.kind} href="#" title={sub.name} meta={sub.meta} tint={subjectTint(sub.kind)} art={<SubjectGlyph kind={sub.kind} size={32} />} progress={{ value: sub.pct, label: `${sub.pct}%` }} />
              ))}
            </CardGrid>
          </div>
        ))}
      </div>
    </div>
  );
}
