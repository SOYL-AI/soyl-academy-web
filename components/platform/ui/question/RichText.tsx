'use client';

/**
 * Content Markdown rendered in the browser, for text that only exists after a client request: the answer
 * key revealed after answering (solution, model answer, marking scheme, rubric), and practice questions
 * fetched page by page. It is the same reviewed renderer as on the server (WEB-7), loaded lazily: KaTeX
 * and react-markdown are a separate chunk that is fetched the first time it is needed, never on page load.
 *
 * Until the chunk arrives the text shows as plain text (never as HTML).
 */
import { lazy, Suspense, type ComponentProps } from 'react';
import s from './question.module.css';

const LazyMarkdown = lazy(() => import('../render/Markdown').then((m) => ({ default: m.Markdown })));

/** Starts loading the renderer chunk early (e.g. when the student starts typing an answer). */
export function preloadRichText(): void {
  void import('../render/Markdown');
}

export type RichTextProps = ComponentProps<typeof LazyMarkdown>;

export function RichText(props: RichTextProps) {
  const Tag = props.inline ? 'span' : 'div';
  return (
    <Suspense
      fallback={
        <Tag className={s.plainFallback} lang={props.lang}>
          {props.children}
        </Tag>
      }
    >
      <LazyMarkdown {...props} />
    </Suspense>
  );
}
