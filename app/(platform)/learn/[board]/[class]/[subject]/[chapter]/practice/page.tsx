/**
 * Practice (ARCHITECTURE §3.1: public, client). The shell (title, filters' counts) is ISR; questions are
 * fetched in the browser page by page (GET /v1/chapters/:id/practice: members get unanswered-first and
 * answered flags, so the list is personal) and checked on the server (POST /v1/practice/answers).
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { loadChapterRoute, type ChapterParams } from '@/components/platform/server/chapter-route';
import { examLabel } from '@/components/platform/lib/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { PracticeApp } from '@/components/platform/practice/PracticeApp';
import shell from '@/components/platform/shell/shell.module.css';

export const revalidate = 600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<ChapterParams> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const r = await loadChapterRoute(params);
  if (!r || !r.hub.assets.practice.available) return {};
  const label = `${examLabel(r.board, r.classLevel)} Class ${r.classLevel} ${r.hub.subject.name}`;
  return platformMetadata({
    title: `${r.hub.chapter.titleEn ?? r.hub.chapter.title} practice questions: ${label}`,
    description: `${r.hub.assets.practice.count} free board-style practice questions for ${label} chapter ${r.hub.chapter.number}, with instant checks, worked solutions and marking schemes.`,
    path: `${r.base}/practice`,
  });
}

export default async function PracticePage({ params }: { params: Promise<ChapterParams> }) {
  requirePlatform();
  const r = await loadChapterRoute(params);
  if (!r || !r.hub.assets.practice.available) notFound();
  const { hub, base, lang, chapterId } = r;
  const hi = lang === 'hi';
  return (
    <div className={`${shell.page} ${shell.wide}`}>
      <PageHeader crumbs={[...r.crumbs, { name: hi ? 'अभ्यास' : 'Practice', path: `${base}/practice` }]} title={`${hi ? 'अभ्यास' : 'Practice'}: ${hub.chapter.title}`} lang={lang} />
      <PracticeApp chapterId={chapterId} lang={lang} total={hub.assets.practice.count} byType={hub.assets.practice.byType} byDifficulty={hub.assets.practice.byDifficulty} />
    </div>
  );
}
