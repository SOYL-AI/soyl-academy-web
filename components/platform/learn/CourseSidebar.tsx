/**
 * Khan-style course sidebar (ADR-023): units → chapters with a mastery pip each, the current chapter marked.
 * Server component (the pips are client islands). Desktop only (≥ 1024 px); on phones the page lists the
 * chapters itself.
 */
import Link from 'next/link';
import { cx } from '@/components/platform/ui/cx';
import { ChapterMasteryPip, type CourseChapterLink } from './CourseIslands';
import s from './course.module.css';

export interface CourseUnit {
  unit: string | null;
  chapters: CourseChapterLink[];
}

export function CourseSidebar({ title, href, units, currentId, lang }: { title: string; href: string; units: CourseUnit[]; currentId?: string; lang?: string }) {
  return (
    <nav aria-label="Course chapters" className={s.sidebar} data-testid="course-sidebar">
      <Link href={href} className={s.sideTitle} lang={lang} aria-current={currentId ? undefined : 'page'}>
        {title}
      </Link>
      {units.map((u, i) => (
        <div key={`${u.unit ?? 'none'}-${i}`} className={s.sideUnit}>
          {u.unit && (
            <p className={s.sideUnitName} lang={lang}>
              {u.unit}
            </p>
          )}
          <ol className={s.sideList}>
            {u.chapters.map((c) => (
              <li key={c.id}>
                <Link href={c.href} className={cx(s.sideLink, c.id === currentId && s.sideOn)} aria-current={c.id === currentId ? 'page' : undefined}>
                  <ChapterMasteryPip chapterId={c.id} showLabel={false} />
                  <span className={s.sideNum} aria-hidden="true">
                    {c.number}
                  </span>
                  <span className={s.sideText} lang={lang}>
                    <span className="p-visually-hidden">Chapter {c.number}: </span>
                    {c.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}

/** Groups catalog chapters by unit, keeping board order. */
export function unitsOf<T extends { unit: string | null }>(chapters: T[]): Array<{ unit: string | null; chapters: T[] }> {
  const groups: Array<{ unit: string | null; chapters: T[] }> = [];
  for (const ch of chapters) {
    const last = groups[groups.length - 1];
    if (last && last.unit === ch.unit) last.chapters.push(ch);
    else groups.push({ unit: ch.unit, chapters: [ch] });
  }
  return groups;
}
