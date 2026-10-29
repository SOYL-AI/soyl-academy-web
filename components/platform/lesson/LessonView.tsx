/**
 * Lesson page body (Server Component): fetches one deck part (ISR), renders every slide on the server with
 * the UI kit's `renderSlide` (Markdown, KaTeX and diagrams cost no client JS), renders the check-slide
 * question content on the server too, and hands the nodes to the client SlidePlayer (focus mode: the
 * breadcrumb is not shown, but stays in the page as BreadcrumbList data; the deck title is the strip's h1).
 */
import type { LessonDeck } from '@/platform/shared/api-client';
import type { Slide } from '@/platform/shared/content/deck';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbNode } from '@/lib/seo/schema';
import { renderSlide } from '@/components/platform/ui/slides/layouts';
import { buildQuestionSlots } from '@/components/platform/ui/question/slots';
import { cdnBaseFromEnv } from '@/components/platform/ui/render/policy';
import type { ChapterRoute } from '../server/chapter-route';
import { lessonHref } from '../lib/lesson-links';
import { CheckQuestion } from './CheckQuestion';
import { audioMime, audioUrl } from './player-logic';
import { SlidePlayer, type SlideMeta } from './SlidePlayer';

export function LessonView({ route, deck }: { route: ChapterRoute; deck: LessonDeck }) {
  const { hub, base, lang, chapterId } = route;
  const parts = hub.assets.lesson.parts;
  const partIndex = parts.findIndex((p) => p.part === deck.part);
  const nextPart = partIndex >= 0 ? parts[partIndex + 1] : undefined;
  const questions = new Map(deck.checkQuestions.map((q) => [q.id, q]));
  const cdn = cdnBaseFromEnv();

  const renderCheck = (questionId: string) => {
    const q = questions.get(questionId);
    if (!q) return null;
    return <CheckQuestion chapterId={chapterId} question={q} slots={buildQuestionSlots(q, lang)} lang={lang} />;
  };

  // No index/total: the strip shows "7 / 21" once, not on every slide as well.
  const slides = deck.slides.map((slide) =>
    renderSlide(slide as Slide, {
      lang,
      goals: deck.goals,
      renderCheck,
      mode: 'read',
      showNarration: false,
      headingLevel: 'h2',
      idPrefix: `p${deck.part}`,
    }),
  );
  const meta: SlideMeta[] = deck.slides.map((slide) => {
    const url = slide.audio ? audioUrl(slide.audio.key, cdn) : null;
    const checkId = (slide as Slide).layout === 'check' ? (slide as Slide).check_question_id : null;
    return {
      id: slide.id,
      heading: slide.heading,
      narration: slide.narration,
      audio: url && slide.audio ? { url, mime: audioMime(slide.audio.key), durationMs: slide.audio.duration_ms } : null,
      checkQuestionId: checkId && questions.has(checkId) ? checkId : null,
    };
  });

  const crumbs = [...route.crumbs, { name: parts.length > 1 && partIndex >= 0 ? `Lesson, part ${partIndex + 1} of ${parts.length}` : 'Lesson', path: lessonHref(base, parts, deck.part) }];
  const current = crumbs[crumbs.length - 1]!;

  return (
    <div>
      <StructuredData data={{ '@context': 'https://schema.org', ...breadcrumbNode(current.path, crumbs) }} />
      <SlidePlayer
        key={deck.part}
        chapterId={chapterId}
        part={deck.part}
        firstPart={partIndex <= 0}
        slides={slides}
        meta={meta}
        lang={lang}
        title={deck.title}
        chapterTitle={hub.chapter.title}
        beta={deck.reviewStatus === 'beta'}
        parts={parts.map((p) => ({ part: p.part, title: p.title, href: lessonHref(base, parts, p.part) }))}
        links={{
          hub: base,
          notes: hub.assets.notes.available ? `${base}/notes` : undefined,
          flashcards: hub.assets.flashcards.available ? `${base}/flashcards` : undefined,
          practice: hub.assets.practice.available ? `${base}/practice` : undefined,
          nextPart: nextPart ? { href: lessonHref(base, parts, nextPart.part), title: `part ${partIndex + 2}` } : undefined,
        }}
      />
    </div>
  );
}
