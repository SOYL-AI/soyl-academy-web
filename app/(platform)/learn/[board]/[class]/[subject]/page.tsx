/**
 * /learn/[board]/[class]/[subject] — the course page (ARCHITECTURE §3.1: public, ISR). ADR-023 (Khan style):
 * course sidebar on desktop, the student's course mastery with "Up next" / "Continue", and the chapters in
 * board order grouped by unit, each with its mastery level. Mastery and device progress are client islands
 * (members: GET /v1/me/mastery; guests: this device), so the page itself stays cached.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ChapterProgressNote } from '@/components/platform/learn/LearnClient';
import { MasteryProvider } from '@/components/platform/learn/MasteryProvider';
import { ChapterMasteryPip, SubjectMasteryHeader, type CourseChapterLink } from '@/components/platform/learn/CourseIslands';
import { CourseSidebar, unitsOf } from '@/components/platform/learn/CourseSidebar';
import { BOARD_NAMES, examLabel, langAttr, learnPath, parseBoard, parseClass, subjectIdFor } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';
import c from '@/components/platform/learn/course.module.css';

export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

interface Params {
  board: string;
  class: string;
  subject: string;
}

function parse(p: Params) {
  const board = parseBoard(p.board);
  const classLevel = parseClass(p.class);
  if (!board || !classLevel) return null;
  const subjectId = subjectIdFor(board, classLevel, p.subject);
  return subjectId ? { board, classLevel, subjectId } : null;
}

async function load(params: Promise<Params>) {
  const parsed = parse(await params);
  if (!parsed) return null;
  const data = await getChapters(parsed.subjectId, parsed.board, parsed.classLevel);
  return data ? { ...parsed, data } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const loaded = await load(params);
  if (!loaded) return {};
  const { board, classLevel, data } = loaded;
  const label = `${examLabel(board, classLevel)} Class ${classLevel} ${data.subject.name}`;
  return platformMetadata({
    title: `${label}: chapters`,
    description: `All ${data.chapters.length} chapters of ${label} (${data.academicYear}) with free lessons, notes, flashcards and practice.`,
    path: learnPath(board, classLevel, data.subject.id),
  });
}

export default async function SubjectPage({ params }: { params: Promise<Params> }) {
  requirePlatform();
  const loaded = await load(params);
  if (!loaded) notFound();
  const { board, classLevel, data } = loaded;
  const subject = data.subject;
  const lang = langAttr(subject.language);
  const subjectHref = learnPath(board, classLevel, subject.id);
  const units = unitsOf(data.chapters);
  const showUnits = units.some((g) => g.unit);
  const link = (ch: (typeof data.chapters)[number]): CourseChapterLink => ({ id: ch.id, number: ch.number, title: ch.title, href: learnPath(board, classLevel, subject.id, ch.id) });

  return (
    <div className={`${shell.page} ${shell.wide}`}>
      <MasteryProvider subjectId={subject.id}>
        <div className={c.layout}>
          <CourseSidebar title={subject.name} href={subjectHref} units={units.map((u) => ({ unit: u.unit, chapters: u.chapters.map(link) }))} lang={lang} />
          <div className={c.main}>
            <PageHeader
              crumbs={[
                { name: 'Learn', path: '/learn' },
                { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
                { name: subject.name, path: subjectHref },
              ]}
              title={subject.name}
              lead={`${examLabel(board, classLevel)} Class ${classLevel} · ${data.chapters.length} chapters · ${data.academicYear} syllabus`}
            />
            {subject.theoryOnly && (
              <div className={s.notice}>
                <Icon name="info" size={20} />
                <p>We cover the theory part of this subject. Practicals happen at school.</p>
              </div>
            )}
            {data.chapters.length > 0 && <SubjectMasteryHeader subjectId={subject.id} name={subject.name} chapters={data.chapters.map(link)} lang={lang} />}

            <section className={s.section} aria-labelledby="chapters-title">
              <h2 id="chapters-title" className={s.sectionTitle}>
                Chapters <span className={s.sectionCount}>{data.chapters.length}</span>
              </h2>
              {data.chapters.length === 0 && <p className={s.sectionNote}>Chapters for this subject are being added.</p>}
              {units.map((g, gi) => (
                <div key={`${g.unit ?? 'none'}-${gi}`} className={c.unitCard}>
                  {showUnits && g.unit && (
                    <h3 className={c.unitHead} lang={lang}>
                      <span>{g.unit}</span>
                      <span className={c.unitCount} lang="en">
                        {g.chapters.length} {g.chapters.length === 1 ? 'chapter' : 'chapters'}
                      </span>
                    </h3>
                  )}
                  <ol className={c.chapterList}>
                    {g.chapters.map((ch) => (
                      <li key={ch.id}>
                        <Link href={learnPath(board, classLevel, subject.id, ch.id)} className={c.chapterLink}>
                          <span className={c.chapterNum} aria-hidden="true">
                            {ch.number}
                          </span>
                          <span className={c.chapterMain}>
                            <span className={c.chapterTitle} lang={lang}>
                              <span className="p-visually-hidden">Chapter {ch.number}: </span>
                              {ch.title}
                            </span>
                            <span className={c.chapterMeta}>
                              <ChapterMasteryPip chapterId={ch.id} />
                              {ch.titleEn && ch.titleEn !== ch.title && <span>{ch.titleEn}</span>}
                              <span>{ch.topics.length} topics</span>
                              {!ch.boardAssessed && <Badge>Not in board exam</Badge>}
                              <ChapterProgressNote chapterId={ch.id} />
                            </span>
                          </span>
                          <Icon name="chevronRight" size={20} className={s.itemChevron} />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </section>
          </div>
        </div>
      </MasteryProvider>
    </div>
  );
}
