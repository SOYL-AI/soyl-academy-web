/**
 * Lesson page body (Server Component): fetches one deck part (ISR), renders every slide on the server with
 * the UI kit's `renderSlide` (Markdown, KaTeX and diagrams cost no client JS), renders the check-slide
 * question content on the server too, and hands the nodes to the client SlidePlayer.
 */
import type { LessonDeck } from '@/platform/shared/api-client';
import type { Slide } from '@/platform/shared/content/deck';
import { Badge } from '@/components/platform/ui/kit/Display';
import { renderSlide } from '@/components/platform/ui/slides/layouts';
import { buildQuestionSlots } from '@/components/platform/ui/question/slots';
import { cdnBaseFromEnv } from '@/components/platform/ui/render/policy';
import type { ChapterRoute } from '../server/chapter-route';
import { lessonHref } from '../lib/lesson-links';
import { PageHeader } from '../shell/PageHeader';
import { CheckQuestion } from './CheckQuestion';
import { audioMime, audioUrl } from './player-logic';
import { SlidePlayer, type SlideMeta } from './SlidePlayer';
import shell from '../shell/shell.module.css';
import s from './lesson.module.css';

export function LessonView({ route, deck }: { route: ChapterRoute; deck: LessonDeck }) {
  const { hub, base, lang, chapterId } = route;
  const parts = hub.assets.lesson.parts;
  const partIndex = parts.findIndex((p) => p.part === deck.part);
  const nextPart = partIndex >= 0 ? parts[partIndex + 1] : undefined;
  const total = deck.slides.length;
  const questions = new Map(deck.checkQuestions.map((q) => [q.id, q]));
  const cdn = cdnBaseFromEnv();

  const renderCheck = (questionId: string) => {
    const q = questions.get(questionId);
    if (!q) return null;
    return <CheckQuestion chapterId={chapterId} question={q} slots={buildQuestionSlots(q, lang)} lang={lang} />;
  };

  const slides = deck.slides.map((slide, i) =>
    renderSlide(slide as Slide, {
      index: i + 1,
      total,
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
    return {
      id: slide.id,
      heading: slide.heading,
      narration: slide.narration,
      audio: url && slide.audio ? { url, mime: audioMime(slide.audio.key), durationMs: slide.audio.duration_ms } : null,
    };
  });

  const partLabel = parts.length > 1 && partIndex >= 0 ? `Part ${partIndex + 1} of ${parts.length}` : null;

  return (
    <div className={shell.page}>
      <PageHeader crumbs={[...route.crumbs, { name: partLabel ? `Lesson, ${partLabel.toLowerCase()}` : 'Lesson', path: lessonHref(base, parts, deck.part) }]} title={deck.title} lang={lang} />
      <div className={s.meta}>
        {partLabel && <span>{partLabel}</span>}
        <span>{total} slides</span>
        {deck.reviewStatus === 'beta' && (
          <Badge tone="warning" title="Checked automatically; a teacher review is coming.">
            Beta
          </Badge>
        )}
      </div>
      {parts.length > 1 && (
        <nav aria-label="Lesson parts" className={s.partNav}>
          <ol>
            {parts.map((p, i) => (
              <li key={p.part}>
                {p.part === deck.part ? (
                  <span aria-current="page" className={s.partCurrent}>
                    Part {i + 1}
                  </span>
                ) : (
                  <a href={lessonHref(base, parts, p.part)} className={s.partLink}>
                    Part {i + 1}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <SlidePlayer
        key={deck.part}
        chapterId={chapterId}
        part={deck.part}
        firstPart={partIndex <= 0}
        slides={slides}
        meta={meta}
        lang={lang}
        links={{
          hub: base,
          notes: hub.assets.notes.available ? `${base}/notes` : undefined,
          practice: hub.assets.practice.available ? `${base}/practice` : undefined,
          nextPart: nextPart ? { href: lessonHref(base, parts, nextPart.part), title: `part ${partIndex + 2}` } : undefined,
        }}
      />
    </div>
  );
}
