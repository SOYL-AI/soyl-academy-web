'use client';

import './story.css';
import { useEffect, useState } from 'react';

/**
 * The chapter rail (ADR-034): on wide screens, a column of numbered chapters in the left margin that shows where
 * the reader is in the page's story and lets them skip ahead (every pinned scene can be skipped from here). It
 * reads the page's `[data-chapter][id]` sections after hydration; with no chapters it renders nothing.
 * Phones get no rail: chapters are short there and the page itself is the progress.
 */
interface Chapter {
  id: string;
  title: string;
}

export function ChapterRail({ label = 'Chapters' }: { label?: string }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('main [data-chapter][id]'));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the server-rendered page
    setChapters(els.map((el) => ({ id: el.id, title: el.dataset.chapter || '' })));
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent((e.target as HTMLElement).id);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (chapters.length < 3) return null;

  return (
    <nav
      aria-label={label}
      className="rail pointer-events-none fixed left-4 top-1/2 z-20 hidden -translate-y-1/2 min-[1400px]:block min-[1500px]:left-6"
    >
      <ol className="pointer-events-auto flex flex-col gap-1">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={current === c.id ? 'step' : undefined}
              className="rail-link group flex h-7 items-center gap-2.5 text-ink"
            >
              <span className="t-num w-5 text-right font-serif text-[0.8rem] italic text-graphite">{String(i + 1).padStart(2, '0')}</span>
              <span aria-hidden="true" className="rail-dot h-1.5 w-1.5 shrink-0 rounded-full bg-ink/35" />
              <span className="rail-label hand whitespace-nowrap rounded bg-sheet/90 px-1 text-[1rem] leading-none">{c.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
