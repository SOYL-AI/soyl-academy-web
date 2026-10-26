/**
 * Rendered content of a question ("slots"): stem, options, match columns, passage and visuals as React
 * nodes, built by the reviewed renderers (Markdown/KaTeX/Visual).
 *
 * No 'use client'. Build slots in a Server Component (lesson check slides, notes) and hand them to the
 * client `QuestionCard`, so KaTeX and react-markdown stay on the server. Client pages that fetch
 * questions at run time (practice) build them inside a lazily loaded chunk (`ClientQuestionSlots`).
 *
 * Keys: '' = the question itself; `<childId>` = a case/source part; `<childId>/<altId>` = an alternative.
 */
import type { ReactNode } from 'react';
import type { Visual as VisualData } from '@/platform/shared/content/visual';
import type { StudentQuestion } from '@/platform/shared/api-client';
import { Markdown } from '../render/Markdown';
import { Visual } from '../visual/Visual';
import { numberBlanks, type QuestionPart } from './model';

export interface PartSlots {
  stem: ReactNode;
  options: Record<string, ReactNode>;
  right: Record<string, ReactNode>;
  assets: ReactNode;
}

export interface QuestionSlots {
  passage: ReactNode;
  parts: Record<string, PartSlots>;
}

export function partKey(childId?: string, altId?: string): string {
  if (!childId) return '';
  return altId ? `${childId}/${altId}` : childId;
}

function partSlots(q: QuestionPart, lang: string | undefined): PartSlots {
  const stem = q.type === 'fill-blank' ? numberBlanks(q.stem_md) : q.stem_md;
  return {
    stem: (
      <Markdown lang={lang} headingOffset={3}>
        {stem}
      </Markdown>
    ),
    options: Object.fromEntries(
      q.options.map((o) => [
        o.id,
        <Markdown key={o.id} inline lang={lang}>
          {o.text_md}
        </Markdown>,
      ]),
    ),
    right: Object.fromEntries(
      q.match_right.map((o) => [
        o.id,
        <Markdown key={o.id} inline lang={lang}>
          {o.text_md}
        </Markdown>,
      ]),
    ),
    assets: q.assets.length ? (
      <>
        {(q.assets as VisualData[]).map((v, i) => (
          <Visual key={i} visual={v} />
        ))}
      </>
    ) : null,
  };
}

/** Every slot of a question (and its parts and alternatives). */
export function buildQuestionSlots(q: StudentQuestion, lang?: string): QuestionSlots {
  const parts: Record<string, PartSlots> = { '': partSlots(q, lang) };
  for (const child of q.children ?? []) {
    parts[partKey(child.id)] = partSlots(child, lang);
    for (const alt of child.alternatives ?? []) parts[partKey(child.id, alt.id)] = partSlots(alt, lang);
  }
  return {
    passage: q.passage_md ? (
      <Markdown lang={lang} headingOffset={3}>
        {q.passage_md}
      </Markdown>
    ) : null,
    parts,
  };
}
