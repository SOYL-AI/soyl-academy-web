/**
 * /learn — board → class picker (ARCHITECTURE §3.1: public, static). Boards and classes are the fixed
 * beta scope (CONTEXT §4: CBSE and CISCE, Classes 7–12), so this page needs no API call and is prerendered.
 */
import Link from 'next/link';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ContinueLearning } from '@/components/platform/learn/LearnClient';
import { DailyChallengeCard } from '@/components/platform/coins/DailyChallengeCard';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, learnPath, type BoardSlug } from '@/components/platform/lib/catalog';
import { Card } from '@/components/platform/ui/kit/Display';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';

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
    <div className={shell.page}>
      <PageHeader
        crumbs={[{ name: 'Learn', path: '/learn' }]}
        title="What are you studying?"
        lead="Pick your board and class. Lessons, notes, flashcards, practice and tests are free for every subject."
      />
      <ContinueLearning />
      <DailyChallengeCard />
      <div className={s.boards}>
        {BOARDS.map((board) => (
          <Card as="section" key={board} aria-labelledby={`board-${board}`}>
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
          </Card>
        ))}
      </div>
    </div>
  );
}
