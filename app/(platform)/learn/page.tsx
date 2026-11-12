/**
 * /learn — the platform home (ARCHITECTURE §3.1: public, static). Boards and classes are the fixed beta scope
 * (CONTEXT §4: CBSE and CISCE, Classes 7–12), so the page needs no API call and is prerendered.
 * Design language v3 (ADR-032, DESIGN-LANGUAGE.md §10 "Learn landing"): guests (and the static HTML) get "What are
 * you studying?" with the board/class picker and the subjects ready to learn; members get their greeting, the
 * resume point, their subjects and a compact "Browse another class" card instead of the full picker.
 */
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { LearnLanding } from '@/components/platform/learn/LearnHome';
import { BoardPicker } from '@/components/platform/learn/BoardPicker';
import { Icon } from '@/components/platform/ui/kit/Icon';
import shell from '@/components/platform/shell/shell.module.css';
import v from '@/components/platform/learn/v3.module.css';

export const metadata = platformMetadata({
  title: 'Learn free: CBSE and ICSE/ISC, Classes 7–12',
  description: 'Free visual lessons, notes, flashcards, practice and tests for every CBSE and CISCE (ICSE/ISC) subject, Classes 7 to 12.',
  path: '/learn',
});

const POINTS = ['Visual lessons with narration', 'Practice with instant checks', 'Board-pattern tests'];

export default function LearnPage() {
  requirePlatform();
  return (
    <div className={shell.page}>
      <LearnLanding
        picker={<BoardPicker />}
        compactPicker={<BoardPicker variant="compact" />}
        freeLine={
          <ul className={v.freeLine} aria-label="Free for every student">
            {POINTS.map((p) => (
              <li key={p}>
                <Icon name="check" size={18} /> {p}
              </li>
            ))}
          </ul>
        }
      />
    </div>
  );
}
