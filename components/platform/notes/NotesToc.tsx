'use client';

/**
 * Notes navigation (client islands; the notes themselves stay server-rendered):
 * - `NotesToc`: the contents list. Inline above the notes on phones and tablets; a sticky sidebar from 1024 px
 *   with the section being read marked and "38% read".
 * - `NotesReaderBar`: phones and tablets only, sticky under the app top bar: the section being read, a reading
 *   progress bar and a "Sections" button that opens the contents as a bottom sheet.
 * Anchors land below the sticky bars (scroll-margin in notes.module.css).
 */
import { useEffect, useState } from 'react';
import { cx } from '@/components/platform/ui/cx';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { activeIndex, readingProgress, stripNumber, type TocItem } from './toc-model';
import s from './notes.module.css';

export const NOTES_ARTICLE_ID = 'notes-article';

/** Where a section counts as "being read": below the top bar (60 px) and, under 1024 px, the reader bar. */
function readingLine(): number {
  return window.innerWidth >= 1024 ? 96 : 136;
}

function useReading(items: TocItem[]): { active: number; progress: number } {
  const [state, setState] = useState({ active: -1, progress: 0 });
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = readingLine();
      const tops = items.map((it) => document.getElementById(it.id)?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY);
      const article = document.getElementById(NOTES_ARTICLE_ID)?.getBoundingClientRect();
      const doc = document.documentElement;
      const atEnd = window.scrollY > 0 && window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      const active = activeIndex(tops, line, atEnd ? window.innerHeight : undefined);
      const progress = article ? Math.round(readingProgress(article.top, article.height, window.innerHeight, line) * 100) / 100 : 0;
      setState((o) => (o.active === active && o.progress === progress ? o : { active, progress }));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);
  return state;
}

function TocList({ items, active, lang, onPick }: { items: TocItem[]; active: number; lang?: string; onPick?: (id: string) => void }) {
  return (
    <ol className={s.tocList} lang={lang}>
      {items.map((it, i) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            className={cx(s.tocLink, i === active && s.tocOn)}
            aria-current={i === active ? 'location' : undefined}
            onClick={
              onPick
                ? (e) => {
                    e.preventDefault();
                    onPick(it.id);
                  }
                : undefined
            }
          >
            <span className={s.tocNo} aria-hidden={it.number === null ? undefined : true}>
              {it.number ?? <Icon name="spark" size={14} />}
            </span>
            <span>{it.number === null ? it.label : stripNumber(it.label)}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function NotesToc({ items, lang, title }: { items: TocItem[]; lang?: string; title: string }) {
  const { active, progress } = useReading(items);
  const pct = Math.round(progress * 100);
  return (
    <nav aria-labelledby="notes-contents" className={s.toc} data-testid="notes-toc">
      <div className={s.tocHead}>
        <h2 id="notes-contents" className={s.tocTitle}>
          {title}
        </h2>
        <span className={s.tocPct} aria-hidden="true">
          {pct}% read
        </span>
      </div>
      <div className={s.tocTrack} aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <TocList items={items} active={active} lang={lang} />
    </nav>
  );
}

export function NotesReaderBar({ items, lang, sheetTitle }: { items: TocItem[]; lang?: string; sheetTitle: string }) {
  const { active, progress } = useReading(items);
  const [open, setOpen] = useState(false);
  const current = active >= 0 ? items[active] : null;
  const pct = Math.round(progress * 100);
  const go = (id: string) => {
    setOpen(false);
    // After the sheet has closed (and unlocked the page scroll), follow the anchor like a normal link.
    window.requestAnimationFrame(() => {
      window.location.hash = id;
    });
  };
  return (
    <div className={s.readerBar} data-testid="notes-reader-bar">
      <div className={s.readerInner}>
        <button type="button" className={s.sectionsButton} onClick={() => setOpen(true)} aria-haspopup="dialog" data-testid="notes-sections">
          <Icon name="list" size={18} />
          <span>{sheetTitle}</span>
        </button>
        <span className={s.readerCurrent} lang={lang} aria-hidden="true">
          {current ? (current.number === null ? current.label : stripNumber(current.label)) : ''}
        </span>
        <span className={s.readerPct} aria-hidden="true">
          {pct}%
        </span>
      </div>
      <div
        className={s.readerTrack}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={`${pct}% read${current ? `, now reading: ${current.label}` : ''}`}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title={sheetTitle} variant="sheet">
        <nav aria-label={sheetTitle} className={s.sheetNav}>
          <TocList items={items} active={active} lang={lang} onPick={go} />
        </nav>
      </Dialog>
    </div>
  );
}
