'use client';

/**
 * /learn home islands (ADR-023). The page itself is static; these read the session in the browser.
 * - MemberDashboard (above the class picker): where to learn next. Continue where you left off, a link to the
 *   progress dashboard (D-043: the metrics, heatmap, player card and league live there now, not here), your
 *   subjects with mastery rings, and the daily challenge.
 * - GuestHome (below the hero): continue from this device, the subjects that have lessons, and a sign-in nudge
 *   (guest progress keeps working without an account).
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/platform/ui/kit/Button';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { useSession } from '../auth/SessionProvider';
import { DailyChallengeCard } from '../coins/DailyChallengeCard';
import { greeting } from '../dashboard/model';
import { chapterSlug, examLabel, learnPath, type BoardSlug } from '../lib/catalog';
import { readGuestProgress } from '../lib/guest-storage';
import { continueChapter, subjectOfChapter } from '../lib/learner';
import { MASTERY_HINT_TEXT } from '../lib/mastery';
import { DASHBOARD_PATH } from '../lib/return-to';
import { fetchContentSubjects, type ContentSubject } from './content-subjects';
import { chapterHref } from './links';
import { MasteryProvider, useCourseMastery } from './MasteryProvider';
import { useLearnerProgress } from './ProgressProvider';
import { subjectStyle } from './subject-style';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import s from './home.module.css';

export { chapterHref, greeting };

function useClassPick(): { board: BoardSlug; classLevel: number } | null {
  const { state } = useSession();
  const [guest, setGuest] = useState<{ board: BoardSlug; classLevel: number } | null>(null);
  useEffect(() => {
    const p = readGuestProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    if (p.board && p.classLevel) setGuest({ board: p.board, classLevel: p.classLevel });
  }, []);
  if (state.status === 'member' && state.user.board && state.user.classLevel) return { board: state.user.board, classLevel: state.user.classLevel };
  return state.status === 'guest' ? guest : null;
}

function useContentSubjects(pick: { board: BoardSlug; classLevel: number } | null): ContentSubject[] | null {
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

/* ── Members ───────────────────────────────────────────────────────────────── */

export function MemberDashboard() {
  const { state } = useSession();
  if (state.status !== 'member') return null;
  return (
    <MasteryProvider>
      <Dashboard name={state.user.displayName?.trim() || null} />
    </MasteryProvider>
  );
}

function Dashboard({ name }: { name: string | null }) {
  const pick = useClassPick();
  const subjects = useContentSubjects(pick);
  const [now] = useState(() => new Date());
  return (
    <section className={s.dash} aria-labelledby="dash-title" data-testid="learn-home-member">
      <h2 id="dash-title" className={s.dashTitle}>
        {greeting(now)}
        {name ? `, ${name}` : ''}
      </h2>
      <div className={s.dashGrid}>
        <ContinueCard />
        <DashboardLinkCard />
        <SubjectsCard pick={pick} subjects={subjects} />
      </div>
      {pick && <DailyChallengeCard board={pick.board} classLevel={pick.classLevel} />}
    </section>
  );
}

function ContinueCard() {
  const { progress, ready } = useLearnerProgress();
  const m = useCourseMastery();
  const next = continueChapter(progress);
  const href = next ? chapterHref(next.chapterId) : null;
  if (!ready) return <div className={`${s.tile} ${s.tileWide}`}><Skeleton lines={2} /></div>;
  if (!next || !href) {
    return (
      <div className={`${s.tile} ${s.tileWide} ${s.continueTile}`} data-testid="continue-card">
        <p className={s.kicker}>Start here</p>
        <p className={s.continueTitle}>Pick a subject and open its first chapter.</p>
        <p className={s.muted}>Lessons, notes, flashcards and practice are free. Your progress saves as you go.</p>
      </div>
    );
  }
  const level = m.chapter(next.chapterId);
  return (
    <Link href={href} className={`${s.tile} ${s.tileWide} ${s.continueTile} ${s.tileLink}`} data-testid="continue-card">
      <p className={s.kicker}>Continue where you left off</p>
      <p className={s.continueTitle}>
        {next.number ? `Chapter ${next.number}: ` : ''}
        {next.title ?? chapterSlug(next.chapterId)}
      </p>
      <p className={s.continueMeta}>
        <MasteryPip level={level.level} showLabel />
        {level.hints[0] ? <span>Next: {MASTERY_HINT_TEXT[level.hints[0]]}</span> : null}
      </p>
      <span className={s.continueGo} aria-hidden="true">
        <Icon name="play" size={18} /> Continue
      </span>
    </Link>
  );
}

/** The way to the progress dashboard (D-043), with the streak and level the shell already loaded. */
function DashboardLinkCard() {
  const { progress } = useLearnerProgress();
  const streak = progress?.streak;
  const lp = progress?.levelProgress ?? 0;
  return (
    <Link href={DASHBOARD_PATH} className={`${s.tile} ${s.tileLink}`} data-testid="dashboard-link">
      <div className={s.streakRow}>
        <span className={`${s.flameBig} ${!streak?.current || streak.atRisk ? s.flameCold : ''}`} aria-hidden="true">
          <Icon name="flame" size={30} />
        </span>
        <span>
          <span className={s.bigNum}>{streak?.current ?? 0}</span>
          <span className={s.muted}> day streak</span>
        </span>
      </div>
      {progress?.level != null && (
        <div className={s.levelRow}>
          <ProgressRing value={lp * 100} size={44} stroke={5} label={`Level ${progress.level}: ${Math.round(lp * 100)}% to the next level`}>
            {progress.level}
          </ProgressRing>
          <span className={s.muted}>
            Level {progress.level} · {(progress.xp ?? 0).toLocaleString('en-IN')} XP
          </span>
        </div>
      )}
      <p className={s.muted}>Weekly goal, accuracy, mastery, test scores and focus areas.</p>
      <span className={s.cardCaption}>
        Open your dashboard <Icon name="chevronRight" size={16} />
      </span>
    </Link>
  );
}

function SubjectsCard({ pick, subjects }: { pick: { board: BoardSlug; classLevel: number } | null; subjects: ContentSubject[] | null }) {
  const m = useCourseMastery();
  const { progress } = useLearnerProgress();
  if (!pick) {
    return (
      <div className={`${s.tile} ${s.tileWide}`}>
        <h3 className={s.tileTitle}>Your subjects</h3>
        <p className={s.muted}>Choose your board and class on your profile, or pick one below.</p>
        <Link href="/me" className={s.tileMore}>
          Set my class
        </Link>
      </div>
    );
  }
  return (
    <div className={`${s.tile} ${s.tileWide}`} data-testid="my-subjects">
      <div className={s.tileHead}>
        <h3 className={s.tileTitle}>
          {examLabel(pick.board, pick.classLevel)} Class {pick.classLevel}
        </h3>
        <Link href={learnPath(pick.board, pick.classLevel)} className={s.tileMore}>
          All subjects
        </Link>
      </div>
      {subjects === null ? (
        <Skeleton lines={3} />
      ) : (
        <ul className={s.subjectList}>
          {subjects.map((sub) => {
            const touched = progress?.subjects.find((x) => x.subjectId === sub.subjectId)?.chapters.length ?? 0;
            const agg = m.apiSubject(sub.subjectId);
            const st = subjectStyle(sub.subjectId, sub.name);
            return (
              <li key={sub.subjectId}>
                <Link href={learnPath(pick.board, pick.classLevel, sub.subjectId)} className={s.subjectRow}>
                  <span className={s.subjectTile} data-hue={st.hue} aria-hidden="true">
                    <SubjectGlyph kind={st.art} size={24} />
                  </span>
                  <span className={s.subjectName}>{sub.name}</span>
                  {agg ? (
                    <ProgressRing value={agg.score} size={36} stroke={4} label={`${sub.name}: ${agg.score}% mastery`} />
                  ) : (
                    <span className={s.subjectState}>{touched ? `${touched} started` : 'Not started'}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── Guests ────────────────────────────────────────────────────────────────── */

export function GuestHome() {
  const { state, openLogin } = useSession();
  const pick = useClassPick();
  const shown = pick ?? { board: 'cbse' as const, classLevel: 10 };
  const subjects = useContentSubjects(state.status === 'guest' ? shown : null);
  const { progress } = useLearnerProgress();
  if (state.status !== 'guest') return null;
  const next = continueChapter(progress);
  const href = next ? chapterHref(next.chapterId) : null;
  return (
    <div className={s.guest} data-testid="guest-home">
      {next && href && (
        <Link href={href} className={`${s.tile} ${s.continueTile} ${s.tileLink}`} data-testid="continue-card">
          <p className={s.kicker}>Continue on this device</p>
          <p className={s.continueTitle}>
            {subjects?.find((x) => x.subjectId === subjectOfChapter(next.chapterId))?.name ?? 'Your last chapter'} · Chapter {next.number}
          </p>
          <p className={s.continueMeta}>
            <MasteryPip level={next.level} showLabel />
          </p>
          <span className={s.continueGo} aria-hidden="true">
            <Icon name="play" size={18} /> Continue
          </span>
        </Link>
      )}
      {subjects && subjects.length > 0 && (
        <section aria-labelledby="ready-title" className={s.readySection}>
          <h2 id="ready-title" className={s.sectionTitle}>
            Ready to learn: {examLabel(shown.board, shown.classLevel)} Class {shown.classLevel}
          </h2>
          <ul className={s.readyGrid}>
            {subjects.map((sub) => {
              const st = subjectStyle(sub.subjectId, sub.name);
              return (
                <li key={sub.subjectId}>
                  <Link href={learnPath(shown.board, shown.classLevel, sub.subjectId)} className={s.readyCard}>
                    <span className={s.subjectTile} data-hue={st.hue} aria-hidden="true">
                      <SubjectGlyph kind={st.art} size={24} />
                    </span>
                    <span className={s.subjectName}>{sub.name}</span>
                    <Icon name="chevronRight" size={18} className={s.readyChevron} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <div className={s.nudge}>
        <div>
          <p className={s.nudgeTitle}>Save your progress everywhere</p>
          <p className={s.muted}>A free account keeps your streak, mastery and player card on every device. No name needed.</p>
        </div>
        <Button variant="secondary" onClick={() => openLogin({ reason: 'Log in to keep your progress on every device. It is free.' })} data-testid="guest-nudge-login">
          Create a free account
        </Button>
      </div>
    </div>
  );
}
