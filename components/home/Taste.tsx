'use client';

import { useState, type ReactNode } from 'react';
import { Dab } from '@/components/ink/Dab';
import { InkButton, InkLink } from '@/components/ink/Button';
import { examLabel, learnPath } from '@/components/platform/lib/catalog';
import { TASTE, type TasteEntry } from '@/content/taste.generated';
import { cn } from '@/lib/utils';
import { useDoor } from './DoorState';

/**
 * Screen 3, the taste (plan §3.2): three live miniatures of the real features for the class chosen on the door,
 * each a link into the feature. The text is verbatim from the authored chapters (content/taste.generated.ts,
 * made by scripts/build-taste.mjs). No AI call is made for a guest: the doubt card shows a question and what
 * asking it costs, not an answer. Then, once the visitor has done anything as a guest, the saved-place line.
 */

/** **bold** and *italic* from the authored markdown; nothing else is interpreted. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong> : part.startsWith('*') && part.length > 2 ? <em key={i}>{part.slice(1, -1)}</em> : part
  );
}

function Card({ label, children, footer }: { label: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-md)] border border-rule bg-paper p-5 md:p-6">
      <p className="ink-label">{label}</p>
      <div className="mt-3 flex-1">{children}</div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">{footer}</div>
    </div>
  );
}

function LessonTaste({ entry }: { entry: TasteEntry }) {
  const [i, setI] = useState(0);
  const slide = entry.slides[i]!;
  return (
    <Card
      label={`Lesson · slide ${i + 1} of ${entry.slides.length}`}
      footer={
        <>
          <InkButton variant="secondary" onClick={() => setI((n) => (n + 1) % entry.slides.length)} aria-label={i + 1 < entry.slides.length ? 'Next slide' : 'Back to the first slide'}>
            {i + 1 < entry.slides.length ? 'Next slide' : 'From the start'}
          </InkButton>
          <InkLink href={learnPath(entry.board, entry.fromClass, entry.subjectId)} variant="quiet">
            Open {entry.subject}
          </InkLink>
        </>
      }
    >
      <div aria-live="polite">
        <p className="ink-title">{inline(slide.heading)}</p>
        {slide.body ? <p className="mt-3 text-graphite">{inline(slide.body)}</p> : null}
        {slide.bullets.length ? (
          <ul className="mt-3 space-y-2 text-graphite">
            {slide.bullets.map((b) => (
              <li key={b} className="flex gap-2.5">
                <Dab pigment="indigo" className="mt-1 text-[0.9rem]" />
                <span>{inline(b)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}

function FlashcardTaste({ entry }: { entry: TasteEntry }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Card
      label="Flashcard"
      footer={
        <InkLink href={learnPath(entry.board, entry.fromClass, entry.subjectId)} variant="quiet">
          More flashcards
        </InkLink>
      }
    >
      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          'flex min-h-[9.5rem] w-full flex-col justify-between rounded-[var(--radius-sm)] border p-4 text-left transition-colors duration-150',
          flipped ? 'border-indigo/30 bg-cobalt-soft' : 'border-rule bg-paper-2'
        )}
      >
        <span aria-live="polite" className={cn(flipped ? 'text-ink' : 'ink-title')}>
          {inline(flipped ? entry.flashcard.back : entry.flashcard.front)}
        </span>
        <span className="mt-4 text-[0.875rem] font-medium text-indigo">{flipped ? 'Tap for the question' : 'Tap for the answer'}</span>
      </button>
    </Card>
  );
}

function DoubtTaste({ entry, credits, guide }: { entry: TasteEntry; credits: number | null; guide: string }) {
  return (
    <Card
      label={credits === null ? 'Ask AI' : `Ask AI · ${credits} ${credits === 1 ? 'credit' : 'credits'}`}
      footer={
        <InkLink href="/ask" variant="quiet" arrow>
          Ask a doubt
        </InkLink>
      }
    >
      <p className="rounded-[var(--radius-sm)] rounded-br-none bg-paper-2 p-4 text-ink">{inline(entry.doubt)}</p>
      <p className="mt-4 text-[0.9375rem] text-graphite">{guide}</p>
    </Card>
  );
}

export function Taste({ doubtCredits, doubtGuide }: { doubtCredits: number | null; doubtGuide: string }) {
  const { board, classLevel, saved } = useDoor();
  const entry = TASTE[`${board}-${classLevel}`];
  if (!entry) return null;
  const borrowed = entry.fromClass !== classLevel;
  const did = saved.slides + saved.questions > 0;

  return (
    <section aria-labelledby="taste-title" className="section">
      <div className="page">
        <h2 id="taste-title" className="ink-head">
          Try it for ten seconds.
        </h2>
        <p className="mt-4 max-w-[60ch] text-graphite">
          From {examLabel(board, entry.fromClass)} Class {entry.fromClass} {entry.subject}: {inline(entry.chapter)}
          {borrowed ? `. Class ${classLevel} has no lesson to show here yet, so this is the nearest class.` : null}
        </p>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          <LessonTaste key={`l-${entry.chapterId}`} entry={entry} />
          <FlashcardTaste key={`f-${entry.chapterId}`} entry={entry} />
          <DoubtTaste entry={entry} credits={doubtCredits} guide={doubtGuide} />
        </div>

        {did ? (
          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-graphite">
            <span className="tabular-nums">
              {saved.slides} {saved.slides === 1 ? 'slide' : 'slides'}, {saved.questions} {saved.questions === 1 ? 'question' : 'questions'}. Saved on this phone only.
            </span>
            <InkLink href="/me" variant="quiet" arrow>
              Keep it
            </InkLink>
          </p>
        ) : null}
      </div>
    </section>
  );
}
