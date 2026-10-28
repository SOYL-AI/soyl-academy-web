/**
 * /learn — the platform home (ARCHITECTURE §3.1: public, static). Boards and classes are the fixed beta scope
 * (CONTEXT §4: CBSE and CISCE, Classes 7–12), so the page needs no API call and is prerendered.
 * ADR-023: signed in → a dashboard above the class picker (client island: continue, streak, heatmap, subjects
 * with mastery, player card, league); signed out → the hero "pick your board and class", then the subjects
 * that have lessons and a sign-in nudge (guest progress keeps working).
 */
import Link from 'next/link';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { GuestHome, MemberDashboard } from '@/components/platform/learn/LearnHome';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, learnPath, type BoardSlug } from '@/components/platform/lib/catalog';
import { Icon } from '@/components/platform/ui/kit/Icon';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';
import h from '@/components/platform/learn/home.module.css';

export const metadata = platformMetadata({
  title: 'Learn free: CBSE and ICSE/ISC, Classes 7–12',
  description: 'Free visual lessons, notes, flashcards, practice and tests for every CBSE and CISCE (ICSE/ISC) subject, Classes 7 to 12.',
  path: '/learn',
});

const BLURBS: Record<BoardSlug, string> = {
  cbse: 'Central Board of Secondary Education, Classes 7–12.',
  cisce: 'ICSE for Classes 7–10 and ISC for Classes 11–12.',
};

export default function LearnPage() {
  requirePlatform();
  return (
    <div className={`${shell.page} ${shell.wide}`}>
      <MemberDashboard />
      <section className={h.hero} aria-labelledby="learn-title">
        <p className={h.heroKicker}>Free for every student</p>
        <h1 id="learn-title" className={h.heroTitle}>
          What are you studying?
        </h1>
        <p className={h.heroLead}>Pick your board and class. Lessons, notes, flashcards, practice and tests are free for every subject.</p>
        <ul className={h.heroPoints}>
          <li>
            <Icon name="check" size={18} /> Visual lessons with narration
          </li>
          <li>
            <Icon name="check" size={18} /> Practice with instant checks
          </li>
          <li>
            <Icon name="check" size={18} /> Board-pattern tests
          </li>
        </ul>
        <div className={s.boards}>
          {BOARDS.map((board) => (
            <section key={board} aria-labelledby={`board-${board}`} className={s.boardCard}>
              <h2 id={`board-${board}`} className={s.boardName}>
                {BOARD_NAMES[board]}
              </h2>
              <p className={s.boardBlurb}>{BLURBS[board]}</p>
              <ul className={s.classGrid}>
                {CLASS_LEVELS.map((c) => (
                  <li key={c}>
                    <Link href={learnPath(board, c)} className={s.classLink} aria-label={`${BOARD_NAMES[board]} Class ${c}${board === 'cisce' ? ` (${examLabel(board, c)})` : ''}`}>
                      <span className={s.classNumber}>{c}</span>
                      <span className={s.classExam}>{board === 'cisce' ? examLabel(board, c) : 'Class'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <GuestHome />
    </div>
  );
}
