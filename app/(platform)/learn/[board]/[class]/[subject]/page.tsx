/**
 * /learn/[board]/[class]/[subject] — the course page (ARCHITECTURE §3.1: public, ISR). Design language v3 (ADR-032,
 * DESIGN-LANGUAGE.md §10 "Subject hub"): the subject's IconTile beside the title, the course progress card with the
 * ONE primary action ("Up next" / "Continue"), then the chapters in board order as a List per unit, each row with
 * its mastery pip and status. The course sidebar stays on wide screens. Mastery and device progress are client
 * islands (members: GET /v1/me/mastery; guests: this device), so the page itself stays cached.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { subjectStyle, subjectTintFor } from '@/components/platform/learn/subject-style';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { ChapterProgressNote } from '@/components/platform/learn/LearnClient';
import { MasteryProvider } from '@/components/platform/learn/MasteryProvider';
import { ChapterMasteryPip, ChapterStatusPill, SubjectMasteryHeader, type CourseChapterLink } from '@/components/platform/learn/CourseIslands';
import { CourseSidebar, unitsOf } from '@/components/platform/learn/CourseSidebar';
import { Card } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { List, ListRow } from '@/components/platform/ui/kit/Lists';
import { PageSection } from '@/components/platform/ui/kit/Page';
import { IconTile } from '@/components/platform/ui/kit/Tiles';
import { BOARD_NAMES, examLabel, langAttr, learnPath, parseBoard, parseClass, subjectIdFor } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';
import c from '@/components/platform/learn/course.module.css';
import v from '@/components/platform/learn/v3.module.css';

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
  const style = subjectStyle(subject.id, subject.name, subject.language);
  const tint = subjectTintFor(subject.id, subject.name, subject.language);
  const link = (ch: (typeof data.chapters)[number]): CourseChapterLink => ({ id: ch.id, number: ch.number, title: ch.title, href: learnPath(board, classLevel, subject.id, ch.id) });

  return (
    <div className={`${shell.page} ${shell.wide}`}>
      <MasteryProvider subjectId={subject.id}>
        <div className={c.layout}>
          <CourseSidebar title={subject.name} href={subjectHref} units={units.map((u) => ({ unit: u.unit, chapters: u.chapters.map(link) }))} lang={lang} />
          <div className={`${c.main} ${v.stack}`}>
            <div className={v.subjectHead}>
              <span className={v.subjectGlyph} data-testid="subject-glyph">
                <IconTile tint={tint} size="xl">
                  <SubjectGlyph kind={style.art} size={44} />
                </IconTile>
              </span>
              <PageHeader
                crumbs={[
                  { name: 'Learn', path: '/learn' },
                  { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
                  { name: subject.name, path: subjectHref },
                ]}
                title={subject.name}
                lead={`${examLabel(board, classLevel)} Class ${classLevel} · ${data.chapters.length} chapters · ${data.academicYear} syllabus`}
              />
            </div>
            {subject.theoryOnly && (
              <Card tint="blue" className={v.notice}>
                <Icon name="info" size={20} />
                <p>We cover the theory part of this subject. Practicals happen at school.</p>
              </Card>
            )}
            {data.chapters.length > 0 && <SubjectMasteryHeader subjectId={subject.id} name={subject.name} chapters={data.chapters.map(link)} lang={lang} />}

            <PageSection id="chapters-title" title="Chapters" count={data.chapters.length}>
              {data.chapters.length === 0 && <p className={v.sectionNote}>Chapters for this subject are being added.</p>}
              <div className={v.units}>
                {units.map((g, gi) => (
                  <div key={`${g.unit ?? 'none'}-${gi}`} className={v.unit}>
                    {showUnits && g.unit && (
                      <h3 className={v.unitHead} lang={lang}>
                        <span>{g.unit}</span>
                        <span className={v.unitCount} lang="en">
                          {g.chapters.length} {g.chapters.length === 1 ? 'chapter' : 'chapters'}
                        </span>
                      </h3>
                    )}
                    <List label={showUnits && g.unit ? g.unit : 'Chapters'}>
                      {g.chapters.map((ch) => (
                        <ListRow
                          key={ch.id}
                          href={learnPath(board, classLevel, subject.id, ch.id)}
                          lang={lang}
                          leading={
                            <span className={v.chapterLead}>
                              <ChapterMasteryPip chapterId={ch.id} showLabel={false} />
                              <span className={v.chapterNum} style={{ '--tile': `var(--p-tint-${tint})`, '--tile-ink': `var(--p-tint-${tint}-ink)` } as CSSProperties} aria-hidden="true">
                                {ch.number}
                              </span>
                            </span>
                          }
                          title={
                            <>
                              <span className="p-visually-hidden" lang="en">
                                Chapter {ch.number}:{' '}
                              </span>
                              {ch.title}
                            </>
                          }
                          meta={
                            <span className={v.metaLine}>
                              {ch.titleEn && ch.titleEn !== ch.title && <span>{ch.titleEn}</span>}
                              <span>{ch.topics.length} topics</span>
                              {!ch.boardAssessed && <span>Not in board exam</span>}
                              <ChapterProgressNote chapterId={ch.id} />
                            </span>
                          }
                          trailing={
                            <>
                              <ChapterStatusPill chapterId={ch.id} />
                              <Icon name="chevronRight" size={18} className={v.rowChevron} />
                            </>
                          }
                        />
                      ))}
                    </List>
                  </div>
                ))}
              </div>
            </PageSection>
          </div>
        </div>
      </MasteryProvider>
    </div>
  );
}
