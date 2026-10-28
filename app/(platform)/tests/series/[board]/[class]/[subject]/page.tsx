/**
 * /tests/series/[board]/[class]/[subject] — a subject's test series (ARCHITECTURE §3.1: public list,
 * login to start). The shell (subject name, breadcrumbs) is rendered per request from the (cached) public
 * catalog so the proxy's CSP nonce applies (S6-L03); the series and the student's status per test load in
 * the browser (members get a personal, no-store list).
 */
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { SeriesClient } from '@/components/platform/tests/SeriesClient';
import { examLabel, langAttr, parseBoard, parseClass, subjectIdFor, subjectSlug } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';

interface Params {
  board: string;
  class: string;
  subject: string;
}

async function load(params: Promise<Params>) {
  const p = await params;
  const board = parseBoard(p.board);
  const classLevel = parseClass(p.class);
  if (!board || !classLevel) return null;
  const subjectId = subjectIdFor(board, classLevel, p.subject);
  if (!subjectId) return null;
  const data = await getChapters(subjectId, board, classLevel);
  return data ? { board, classLevel, subjectId, data } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const r = await load(params);
  if (!r) return {};
  const label = `${examLabel(r.board, r.classLevel)} Class ${r.classLevel} ${r.data.subject.name}`;
  return platformMetadata({
    title: `${label} test series: chapter tests and mock papers`,
    description: `Free ${label} chapter tests, unit tests and board-pattern mock papers with results, analysis and marking schemes.`,
    path: `/tests/series/${r.board}/${r.classLevel}/${subjectSlug(r.subjectId)}`,
  });
}

export default async function SeriesPage({ params }: { params: Promise<Params> }) {
  requirePlatform();
  await connection();
  const r = await load(params);
  if (!r) notFound();
  const { board, classLevel, subjectId, data } = r;
  const label = `${examLabel(board, classLevel)} Class ${classLevel}`;
  const path = `/tests/series/${board}/${classLevel}/${subjectSlug(subjectId)}`;
  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={[
          { name: 'Tests', path: '/tests' },
          { name: `${label} ${data.subject.name}`, path },
        ]}
        title={`${data.subject.name} tests`}
        lang={langAttr(data.subject.language)}
        lead={`${label} · free chapter tests, unit tests and mock papers in board pattern`}
      />
      <SeriesClient subjectId={subjectId} subjectName={data.subject.name} />
    </div>
  );
}
