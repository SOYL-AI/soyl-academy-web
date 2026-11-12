'use client';

/**
 * /learn landing (design language v3, ADR-032; DESIGN-LANGUAGE.md §10 "Learn landing"). The page is static; this
 * island reads the session in the browser and shows one of two views. Until the session is known (and for search
 * engines) the static HTML is the guest view.
 *
 * - Guests: "What are you studying?", the board/class picker (server-rendered, passed in), the free-for-everyone
 *   line, "Ready to learn" subject cards for the last class they opened (or CBSE 10), continue on this device, and a
 *   sign-up nudge (guest progress keeps working without an account).
 * - Members: a greeting in their stage's tone, ONE primary action (continue, or start a subject), "Your subjects"
 *   for their class with progress, and in the rail the daily challenge, a compact "Browse another class" card and
 *   the way to Home. No full-size picker again (it was repeated below the dashboard before v3).
 */
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/platform/ui/kit/Button';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Card, cardLinkClass, EmptyState, SkeletonCard } from '@/components/platform/ui/kit/Display';
import { GreetingHeader, greetingFor } from '@/components/platform/ui/kit/Greeting';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { CardGrid, PageColumns, PageSection } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { ContinueCard, IconTile } from '@/components/platform/ui/kit/Tiles';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { useSession } from '../auth/SessionProvider';
import { DailyChallengeCard } from '../coins/DailyChallengeCard';
import { greeting } from '../dashboard/model';
import { BOARD_NAMES, chapterSlug, examLabel, learnPath, type BoardSlug } from '../lib/catalog';
import { readGuestProgress } from '../lib/guest-storage';
import { continueChapter, subjectOfChapter, type ChapterSnapshot } from '../lib/learner';
import { MASTERY_LABELS } from '../lib/mastery';
import { DASHBOARD_PATH } from '../lib/return-to';
import { useStage } from '../shell/StageProvider';
import { continuePill, learnSubtitle, noClassText, stageGreeting } from './copy';
import { TILE_MIN } from './class-hub';
import { LiveSubjectCard } from './CourseIslands';
import { fetchContentSubjects, type ContentSubject } from './content-subjects';
import { chapterHref } from './links';
import { MasteryProvider } from './MasteryProvider';
import { useLearnerProgress } from './ProgressProvider';
import { subjectStyle, subjectTintFor } from './subject-style';
import v from './v3.module.css';

export { chapterHref, greeting };

type Pick = { board: BoardSlug; classLevel: number };

function useClassPick(): Pick | null {
  const { state } = useSession();
  const [guest, setGuest] = useState<Pick | null>(null);
  useEffect(() => {
    const p = readGuestProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    if (p.board && p.classLevel) setGuest({ board: p.board, classLevel: p.classLevel });
  }, []);
  if (state.status === 'member' && state.user.board && state.user.classLevel) return { board: state.user.board, classLevel: state.user.classLevel };
  return state.status === 'guest' ? guest : null;
}

function useContentSubjects(pick: Pick | null): ContentSubject[] | null {
  const [list, setList] = useState<{ key: string; subjects: ContentSubject[] } | null>(null);
  const key = pick ? `${pick.board}-${pick.classLevel}` : '';
  useEffect(() => {
    if (!pick) return;
    let alive = true;
    void fetchContentSubjects(pick.board, pick.classLevel).then((subjects) => alive && setList({ key: `${pick.board}-${pick.classLevel}`, subjects }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` captures pick
  }, [key]);
  return list?.key === key ? list.subjects : null;
}

/** "CBSE · Class 10", "ICSE · Class 9". */
export function classEyebrow(pick: Pick): string {
  return `${examLabel(pick.board, pick.classLevel)} · Class ${pick.classLevel}`;
}

export interface LearnLandingProps {
  /** The full board/class picker (server-rendered). */
  picker: ReactNode;
  /** The compact picker for members ("Browse another class"). */
  compactPicker: ReactNode;
  /** The free-for-everyone line under the guest header (server-rendered). */
  freeLine: ReactNode;
}

export function LearnLanding({ picker, compactPicker, freeLine }: LearnLandingProps) {
  const { state } = useSession();
  if (state.status === 'member') {
    return (
      <MasteryProvider>
        <MemberLearn name={state.user.displayName?.trim() || null} compactPicker={compactPicker} />
      </MasteryProvider>
    );
  }
  return <GuestLearn picker={picker} freeLine={freeLine} />;
}

/* ── Subject cards (both views) ─────────────────────────────────────────────── */

function SubjectGrid({ pick, subjects, label }: { pick: Pick; subjects: ContentSubject[] | null; label: string }) {
  if (subjects === null)
    return (
      <CardGrid label={label} as="div">
        {[0, 1, 2].map((i) => (
          <div key={i} aria-busy="true">
            <SkeletonCard thumb lines={1} />
          </div>
        ))}
      </CardGrid>
    );
  return (
    <CardGrid label={label} min={TILE_MIN} className={v.tiles}>
      {subjects.map((sub) => {
        const st = subjectStyle(sub.subjectId, sub.name);
        return (
          <LiveSubjectCard
            key={sub.subjectId}
            subjectId={sub.subjectId}
            chapterCount={0}
            name={sub.name}
            href={learnPath(pick.board, pick.classLevel, sub.subjectId)}
            tint={subjectTintFor(sub.subjectId, sub.name)}
            art={<SubjectGlyph kind={st.art} size={30} />}
            data-testid="subject-card"
          />
        );
      })}
    </CardGrid>
  );
}

/** The chapter to continue as a ContinueCard (subject tint and glyph, "Science · Chapter 3", mastery). */
function ResumeCard({ next, subjects, eyebrow }: { next: ChapterSnapshot; subjects: ContentSubject[] | null; eyebrow: string }) {
  const { stage } = useStage();
  const href = chapterHref(next.chapterId);
  if (!href) return null;
  const subjectId = subjectOfChapter(next.chapterId);
  const subjectName = subjects?.find((x) => x.subjectId === subjectId)?.name ?? null;
  const st = subjectStyle(subjectId, subjectName ?? subjectId);
  const title = next.title ?? (next.number ? `Chapter ${next.number}` : chapterSlug(next.chapterId));
  const meta = [subjectName, next.number ? `Chapter ${next.number}` : null, MASTERY_LABELS[next.level]].filter(Boolean).join(' · ');
  return (
    <ContinueCard
      href={href}
      eyebrow={eyebrow}
      title={title}
      meta={meta}
      tint={subjectTintFor(subjectId, subjectName ?? subjectId)}
      art={<SubjectGlyph kind={st.art} size={56} />}
      cta={continuePill(stage, 'continue')}
      data-testid="continue-card"
    />
  );
}

/* ── Members ───────────────────────────────────────────────────────────────── */

function MemberLearn({ name, compactPicker }: { name: string | null; compactPicker: ReactNode }) {
  const { stage, pick: byStage } = useStage();
  const pick = useClassPick();
  const subjects = useContentSubjects(pick);
  const { progress, ready } = useLearnerProgress();
  const [greet] = useState(() => greetingFor());
  const next = continueChapter(progress);
  const first = subjects?.[0] ?? null;

  let primary: ReactNode;
  if (!ready) primary = <SkeletonCard thumb lines={2} />;
  else if (next && chapterHref(next.chapterId)) primary = <ResumeCard next={next} subjects={subjects} eyebrow="Continue where you left off" />;
  else if (pick && first) {
    const st = subjectStyle(first.subjectId, first.name);
    primary = (
      <ContinueCard
        href={learnPath(pick.board, pick.classLevel, first.subjectId)}
        eyebrow={byStage({ junior: 'Start exploring', middle: 'Start here', senior: 'Start here' })}
        title={first.name}
        meta="Open the first chapter. Your progress saves as you go."
        tint={subjectTintFor(first.subjectId, first.name)}
        art={<SubjectGlyph kind={st.art} size={56} />}
        cta={continuePill(stage, 'start')}
        data-testid="continue-card"
      />
    );
  } else
    primary = (
      <Card className={v.startCard} data-testid="continue-card">
        <IconTile icon="book" tint="blue" size="lg" />
        <div>
          <p className={v.cardTitle}>Pick a subject to start</p>
          <p className={v.cardText}>Lessons, notes, flashcards and practice are free. Your progress saves as you go.</p>
        </div>
      </Card>
    );

  return (
    <div className={v.stack} data-testid="learn-home-member">
      <GreetingHeader eyebrow={pick ? classEyebrow(pick) : undefined} title={stageGreeting(stage, greet, name)} subtitle={learnSubtitle(stage)} />
      <PageColumns
        className={v.flowRail}
        railLabel="More ways to learn"
        rail={
          <>
            {pick && <DailyChallengeCard board={pick.board} classLevel={pick.classLevel} />}
            <RailCard id="browse-title" title="Browse another class">
              {compactPicker}
            </RailCard>
            <Link href={DASHBOARD_PATH} className={cardLinkClass(v.quietLink)} data-testid="dashboard-link">
              <IconTile icon="chart" tint="violet" size="md" />
              <span className={v.quietLinkText}>
                <span className={v.quietLinkTitle}>Your progress on Home</span>
                <span className={v.quietLinkMeta}>Streak, weekly goal, mastery and test scores</span>
              </span>
              <Icon name="chevronRight" size={18} className={v.quietArrow} />
            </Link>
          </>
        }
      >
        {primary}
        {pick ? (
          <PageSection
            id="my-subjects-title"
            title="Your subjects"
            count={subjects?.length}
            description={`${BOARD_NAMES[pick.board]} Class ${pick.classLevel}`}
            action={{ href: learnPath(pick.board, pick.classLevel), label: 'All subjects' }}
            data-testid="my-subjects"
          >
            <SubjectGrid pick={pick} subjects={subjects} label="Your subjects" />
          </PageSection>
        ) : (
          <PageSection id="my-subjects-title" title="Your subjects" data-testid="my-subjects">
            <EmptyState title="No class yet" icon="book" tint="blue" compact headingLevel="h3" action={<ButtonLink href="/me" size="sm" variant="soft">Set my class</ButtonLink>}>
              {noClassText(stage)}
            </EmptyState>
          </PageSection>
        )}
      </PageColumns>
    </div>
  );
}

/* ── Guests ────────────────────────────────────────────────────────────────── */

function GuestLearn({ picker, freeLine }: { picker: ReactNode; freeLine: ReactNode }) {
  const { state, openLogin } = useSession();
  const pick = useClassPick();
  const shown = pick ?? { board: 'cbse' as const, classLevel: 10 };
  const subjects = useContentSubjects(state.status === 'guest' ? shown : null);
  const { progress } = useLearnerProgress();
  const next = state.status === 'guest' ? continueChapter(progress) : null;
  return (
    <div className={v.stack} data-testid="guest-home">
      <div className={v.headStack}>
        <GreetingHeader
          eyebrow="Free for every student"
          title="What are you studying?"
          subtitle="Pick your board and class. Lessons, notes, flashcards, practice and tests are free for every subject."
        />
        {freeLine}
      </div>
      {next && <ResumeCard next={next} subjects={subjects} eyebrow="Continue on this device" />}
      {picker}
      {state.status === 'guest' && (subjects === null || subjects.length > 0) && (
        <PageSection
          id="ready-title"
          title="Ready to learn"
          description={`${examLabel(shown.board, shown.classLevel)} Class ${shown.classLevel}`}
          action={{ href: learnPath(shown.board, shown.classLevel), label: 'All subjects' }}
        >
          <MasteryProvider>
            <SubjectGrid pick={shown} subjects={subjects} label={`Ready to learn: ${examLabel(shown.board, shown.classLevel)} Class ${shown.classLevel}`} />
          </MasteryProvider>
        </PageSection>
      )}
      {state.status === 'guest' && (
        <Card className={v.nudge}>
          <IconTile icon="star" tint="yellow" size="lg" />
          <div className={v.nudgeText}>
            <h2 className={v.cardTitle}>Save your progress everywhere</h2>
            <p className={v.cardText}>A free account keeps your streak, mastery and player card on every device. No name needed.</p>
          </div>
          <Button variant="secondary" onClick={() => openLogin({ reason: 'Log in to keep your progress on every device. It is free.' })} data-testid="guest-nudge-login">
            Create a free account
          </Button>
        </Card>
      )}
    </div>
  );
}
