'use client';

/**
 * Slide player (ARCHITECTURE §3.2), in focus mode (learn-mode, 2026-10-29). Slides arrive as server-rendered React
 * nodes (Markdown, KaTeX and diagrams cost no client JS); this component only navigates, remembers and narrates.
 *
 * Layout: a slim strip (close → chapter, the deck title as a one-line h1, part switcher, "7 / 21", Listen,
 * Explain, options), a segmented progress bar, the slide card filling the rest of the screen (a long slide
 * scrolls inside its card, with a "More below" cue, never the page), and a bottom bar (Previous / Next, Check on
 * question slides). The whole view is pinned under the app top bar (focus.tsx), so the page never scrolls.
 *
 * - Navigation: ← / → / Space (Shift+Space back) / PageUp / PageDown / Home / End, ↑ ↓ scroll a long slide,
 *   swipe left/right (not from the screen edges, not inside sideways scrollers), Previous/Next buttons.
 * - "Finish" on the last slide ends the part: a completion screen (lazy chunk) with a summary of the quick checks.
 * - Deep links: `?slide=N` (with `?part=`) opens slide N; the URL follows the slide (replaceState, so the
 *   browser's Back still leaves the lesson, and Back from another page returns to the same slide).
 * - Read mode (default) and listen mode (lazy chunk: narration controls, autoplay-next, read-along highlight).
 *   Listen mode is offered only when the deck has audio this browser can play (ADR-017; no speechSynthesis, WEB-1).
 * - Position: members → debounced PUT /v1/me/lesson-progress; guests → soyl_guest_v1. Resumes on return.
 * - Only the previous, current and next two slides are mounted (hidden + inert when not current); the next two
 *   are prefetched (their images switch to eager loading).
 */
import Link from 'next/link';
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import type { PracticeAnswerResult } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { readGuestLessonPosition, readGuestProgress, recordGuestLessonPosition } from '../lib/guest-storage';
import { ReportMistake } from '../report/ReportMistake';
import { ExplainSlideButton } from '../ai/ExplainSlide';
import { CheckResultsProvider } from './CheckQuestion';
import { DotsIcon, useFocusTop, usePopover } from './focus';
import {
  applyNav,
  isEdgeStart,
  isInteractiveTarget,
  keyAction,
  mountedWindow,
  openingPosition,
  PROGRESS_DEBOUNCE_MS,
  slideFromSearch,
  startsInHorizontalScroller,
  swipeAction,
  withSlideParam,
  type CheckOutcome,
  type NavAction,
  type OpeningNote,
} from './player-logic';
import f from './focus.module.css';
import s from './lesson.module.css';

const ListenPanel = lazy(() => import('./ListenPanel').then((m) => ({ default: m.ListenPanel })));
const CompletionScreen = lazy(() => import('./CompletionScreen').then((m) => ({ default: m.CompletionScreen })));

export interface SlideMeta {
  id: string;
  heading: string;
  narration: string;
  audio: { url: string; mime: string; durationMs: number } | null;
  /** The practice question of a `check` slide. */
  checkQuestionId?: string | null;
}

export interface LessonLinks {
  hub: string;
  notes?: string;
  flashcards?: string;
  practice?: string;
  nextPart?: { href: string; title: string };
}

export interface LessonPartLink {
  part: number;
  title: string;
  href: string;
}

export interface SlidePlayerProps {
  chapterId: string;
  /** Deck part as the API names it (0 = single deck). */
  part: number;
  /** True for the chapter's first part (guest positions saved before parts existed belong to it). */
  firstPart: boolean;
  slides: ReactNode[];
  meta: SlideMeta[];
  lang?: string;
  links: LessonLinks;
  /** The deck title: the page's h1 (one line in the strip). */
  title?: string;
  /** The chapter's name, for the close button's label. */
  chapterTitle?: string;
  /** Every part of the chapter (the part switcher shows when there are two or more). */
  parts?: LessonPartLink[];
  beta?: boolean;
}

type Mode = 'read' | 'listen';

export function SlidePlayer({ chapterId, part, firstPart, slides, meta, lang, links, title = 'Lesson', chapterTitle, parts = [], beta }: SlidePlayerProps) {
  const total = slides.length;
  const last = total - 1;
  const { state: session } = useSession();
  const toast = useToast();
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mode, setMode] = useState<Mode>('read');
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState<OpeningNote>(null);
  const [announce, setAnnounce] = useState('');
  const [audioSupport, setAudioSupport] = useState<'unknown' | 'yes' | 'no'>('unknown');
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [checks, setChecks] = useState<Record<string, CheckOutcome>>({});
  const [overflow, setOverflow] = useState<{ scrolls: boolean; more: boolean }>({ scrolls: false, more: false });
  const viewportRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const touch = useRef<{ x: number; y: number; ignore: boolean } | null>(null);
  const continuePlaying = useRef(false);
  const indexRef = useRef(0);
  const finishedRef = useRef(false);
  const urlIndex = useRef<number | null>(null);
  const isMember = session.status === 'member';
  const { anchorRef, style: focusStyle } = useFocusTop();

  const deckHasAudio = meta.some((m) => m.audio);
  const current = meta[index];
  const partIndex = parts.findIndex((p) => p.part === part);
  const partLabel = parts.length > 1 && partIndex >= 0 ? `Part ${partIndex + 1} of ${parts.length}` : null;

  useLayoutEffect(() => {
    indexRef.current = index;
    finishedRef.current = finished;
  }, [index, finished]);

  /* ── Deep link: open the slide in the URL before the first paint ─────────────────────────────── */
  useLayoutEffect(() => {
    const i = slideFromSearch(window.location.search, total);
    urlIndex.current = i;
    if (i !== null && i > 0) {
      indexRef.current = i;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable after hydration; before paint avoids a flash of slide 1
      setIndex(i);
    }
  }, [total]);

  /* ── Audio support (iOS Safari before 18.4 cannot play Ogg Opus; ADR-017) ─────────────────── */
  useEffect(() => {
    const first = meta.find((m) => m.audio)?.audio;
    if (!first) return;
    let ok = false;
    try {
      ok = document.createElement('audio').canPlayType(first.mime) !== '';
    } catch {
      ok = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection needs the DOM
    setAudioSupport(ok ? 'yes' : 'no');
  }, [meta]);

  /* ── Resume ──────────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (session.status === 'loading' || ready) return;
    let cancelled = false;
    const resume = (slide: number | null | undefined, done: boolean) => {
      if (cancelled) return;
      const open = openingPosition(urlIndex.current, slide, done, total);
      if (open.index !== indexRef.current) {
        indexRef.current = open.index;
        setIndex(open.index);
      }
      setNote(open.note);
      if (done) setCompleted(true);
      setReady(true);
    };
    if (session.status === 'member') {
      api
        .get('/v1/me/progress/chapters/{id}', { params: { id: chapterId } })
        .then((res) => {
          const l = res.lessons.find((x) => x.part === part);
          resume(l?.slide, !!l?.completedAt);
        })
        .catch(() => resume(null, false));
    } else {
      const p = readGuestProgress();
      const l = readGuestLessonPosition(p, chapterId, part) ?? (firstPart ? readGuestLessonPosition(p, chapterId, undefined) : null);
      resume(l?.slide, !!l?.completed);
    }
    return () => {
      cancelled = true;
    };
  }, [session.status, ready, chapterId, part, firstPart, total]);

  /* ── Save position (debounced) ───────────────────────────────────────────────────────────── */
  const pending = useRef<{ slide: number; mode: Mode } | null>(null);
  const flush = useCallback(async () => {
    const p = pending.current;
    pending.current = null;
    if (!p) return;
    const reachedEnd = p.slide === last;
    if (isMember) {
      try {
        const res = await api.put('/v1/me/lesson-progress', { body: { chapterId, part, slide: p.slide, mode: p.mode, ...(reachedEnd ? { completed: true } : {}) } });
        if (res.completedAt) setCompleted(true);
        if (res.xpAwarded > 0) toast.show({ title: `Lesson complete! +${res.xpAwarded} XP`, description: res.streak?.current ? `Streak: ${res.streak.current} day${res.streak.current === 1 ? '' : 's'}` : undefined, tone: 'success' });
        if (res.badgesAwarded.length) toast.show({ title: 'New badge!', description: res.badgesAwarded.join(', '), tone: 'success' });
      } catch {
        // Best effort: the next slide change saves again.
      }
    } else {
      recordGuestLessonPosition(chapterId, { part, slide: p.slide, completed: reachedEnd, mode: p.mode });
      if (reachedEnd) setCompleted(true);
    }
  }, [isMember, chapterId, part, last, toast]);

  useEffect(() => {
    if (!ready) return;
    pending.current = { slide: index, mode };
    const t = window.setTimeout(() => void flush(), PROGRESS_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [ready, index, mode, flush]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') void flush();
    };
    document.addEventListener('visibilitychange', onHide);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      void flush();
    };
  }, [flush]);

  /* ── The URL follows the slide (deep links; Back from another page returns here) ─────────────── */
  useEffect(() => {
    if (!ready) return;
    const here = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const want = withSlideParam(here, index);
    if (want !== here) window.history.replaceState(null, '', want);
  }, [ready, index]);

  useEffect(() => {
    const onPop = () => {
      const i = slideFromSearch(window.location.search, total) ?? 0;
      indexRef.current = i;
      finishedRef.current = false;
      setIndex(i);
      setFinished(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [total]);

  /* ── Navigation ──────────────────────────────────────────────────────────────────────────── */
  const finish = useCallback(() => {
    finishedRef.current = true;
    setFinished(true);
    setNote(null);
    // Save "completed" now rather than after the debounce, so the summary can say so.
    pending.current = { slide: last, mode };
    void flush();
  }, [last, mode, flush]);

  const jump = useCallback((to: number) => {
    finishedRef.current = false;
    indexRef.current = to;
    setFinished(false);
    setIndex(to);
    setNote(null);
  }, []);

  const go = useCallback(
    (action: NavAction) => {
      if (!action) return;
      if (finishedRef.current) {
        if (action === 'prev' || action === 'first') jump(action === 'first' ? 0 : last);
        return;
      }
      const i = indexRef.current;
      if (action === 'next' && i === last) {
        finish();
        return;
      }
      const next = applyNav(action, i, total);
      if (next !== i) jump(next);
    },
    [total, last, finish, jump],
  );

  const currentSlot = useCallback(() => viewportRef.current?.querySelector<HTMLElement>(`[data-slide-index="${indexRef.current}"]`) ?? null, []);

  useEffect(() => {
    const h = meta[index]?.heading ?? '';
    // eslint-disable-next-line react-hooks/set-state-in-effect -- announce after the slide changed
    setAnnounce(finished ? `${partLabel ? `Part ${partIndex + 1}` : 'Lesson'} complete` : `Slide ${index + 1} of ${total}${h ? `: ${h}` : ''}`);
    if (finished) return;
    // Prefetch the next two slides' images (they are mounted but hidden).
    const root = viewportRef.current;
    if (root) {
      for (const n of [index + 1, index + 2]) root.querySelectorAll<HTMLImageElement>(`[data-slide-index="${n}"] img[loading="lazy"]`).forEach((img) => img.setAttribute('loading', 'eager'));
    }
  }, [index, total, meta, finished, partLabel, partIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (isInteractiveTarget(e.target, e.key) || document.querySelector('dialog[open]')) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        // ↑ ↓ scroll a long slide (the page itself never scrolls).
        const slot = currentSlot();
        if (!slot || finishedRef.current) return;
        e.preventDefault();
        slot.scrollBy({ top: e.key === 'ArrowDown' ? 64 : -64 });
        return;
      }
      const action = keyAction(e.key, e.shiftKey);
      if (!action) return;
      e.preventDefault();
      go(action);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, currentSlot]);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t || e.touches.length > 1) {
      touch.current = null;
      return;
    }
    const ignore = isEdgeStart(t.clientX, window.innerWidth) || startsInHorizontalScroller(e.target, viewportRef.current);
    touch.current = { x: t.clientX, y: t.clientY, ignore };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    const t = e.changedTouches[0];
    if (!start || !t || start.ignore) return;
    const action = swipeAction(t.clientX - start.x, t.clientY - start.y);
    if (action) go(action);
  };

  /* ── A long slide scrolls inside its card: "More below" ─────────────────────────────────────── */
  useEffect(() => {
    const slot = finished ? null : currentSlot();
    if (!slot) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- nothing to measure
      setOverflow({ scrolls: false, more: false });
      return;
    }
    const check = () => {
      const scrolls = slot.scrollHeight > slot.clientHeight + 1;
      const more = scrolls && slot.scrollHeight - slot.scrollTop - slot.clientHeight > 8;
      setOverflow((o) => (o.scrolls === scrolls && o.more === more ? o : { scrolls, more }));
    };
    check();
    slot.addEventListener('scroll', check, { passive: true });
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(check) : null;
    ro?.observe(slot);
    for (const child of Array.from(slot.children)) ro?.observe(child);
    return () => {
      slot.removeEventListener('scroll', check);
      ro?.disconnect();
    };
  }, [index, finished, currentSlot]);

  const scrollMore = () => {
    const slot = currentSlot();
    slot?.scrollBy({ top: Math.round(slot.clientHeight * 0.7), behavior: 'smooth' });
  };

  /* ── Quick checks ────────────────────────────────────────────────────────────────────────── */
  const onCheckResult = useCallback((id: string, r: PracticeAnswerResult) => {
    setChecks((c) => ({ ...c, [id]: { correct: r.correct } }));
  }, []);
  const checkId = current?.checkQuestionId ?? null;
  const checkPending = !finished && !!checkId && !checks[checkId];
  const submitCheck = () => {
    const form = currentSlot()?.querySelector<HTMLFormElement>('article[data-question-id] form');
    if (!form) return;
    form.requestSubmit();
    window.requestAnimationFrame(() => form.querySelector('[role="alert"]')?.scrollIntoView({ block: 'nearest' }));
  };

  /* ── Listen mode ─────────────────────────────────────────────────────────────────────────── */
  const audio = current?.audio ?? null;
  const listenAvailable = deckHasAudio && audioSupport === 'yes';

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (mode !== 'listen' || !audio || finished) {
      el.pause();
      el.removeAttribute('src');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset the clock with the source
      setTime(0);
      setPlaying(false);
      return;
    }
    if (el.getAttribute('src') !== audio.url) {
      el.src = audio.url;
      setTime(0);
    }
    if (continuePlaying.current) {
      el.play().catch(() => setPlaying(false));
    }
  }, [mode, audio, finished]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el || !audio) return;
    if (el.paused) {
      continuePlaying.current = true;
      el.play().catch(() => setPlaying(false));
    } else {
      continuePlaying.current = false;
      el.pause();
    }
  };

  const onEnded = () => {
    setPlaying(false);
    if (indexRef.current < last && continuePlaying.current && autoplay) {
      window.setTimeout(() => go('next'), 700);
    } else {
      continuePlaying.current = false;
    }
  };

  const switchMode = (m: Mode) => {
    if (m === 'read') {
      continuePlaying.current = false;
      audioRef.current?.pause();
    }
    setMode(m);
  };

  const primary = links.nextPart
    ? { href: links.nextPart.href, label: `Next: ${links.nextPart.title}` }
    : links.practice
      ? { href: links.practice, label: 'Practise this chapter' }
      : { href: links.hub, label: 'Back to the chapter' };
  const noteId = `${chapterId}-p${part}-player`;

  return (
    <>
      <div ref={anchorRef} className={f.anchor} aria-hidden="true" />
      <CheckResultsProvider onResult={onCheckResult}>
        <div
          className={cx(f.focus, s.player)}
          style={focusStyle}
          data-testid="slide-player"
          data-index={index}
          data-mode={mode}
          data-ready={ready || undefined}
          data-finished={finished || undefined}
        >
          <header className={f.strip}>
            <div className={f.stripInner}>
              <Link href={links.hub} className={cx(f.tool, f.close)} aria-label={`Close the lesson, back to ${chapterTitle ? `the chapter: ${chapterTitle}` : 'the chapter'}`} data-testid="lesson-close">
                <Icon name="close" size={22} />
              </Link>
              <div className={f.titleBlock}>
                <h1 className={f.title} lang={lang} title={title}>
                  {title}
                </h1>
                <div className={f.sub}>
                  {partLabel ? <PartSwitcher parts={parts} current={part} label={partLabel} /> : <span>Lesson</span>}
                  <span className={f.dot} aria-hidden="true">
                    ·
                  </span>
                  <span className={f.count} aria-hidden="true" data-testid="slide-count">
                    {finished ? 'Done' : `${index + 1} / ${total}`}
                  </span>
                  {beta && (
                    <span className={f.beta} title="Checked automatically; a teacher review is coming.">
                      Beta
                    </span>
                  )}
                </div>
              </div>
              {deckHasAudio && (
                <button
                  type="button"
                  className={f.tool}
                  aria-pressed={mode === 'listen'}
                  disabled={!listenAvailable}
                  aria-describedby={audioSupport === 'no' ? `${noteId}-audio` : undefined}
                  onClick={() => switchMode(mode === 'listen' ? 'read' : 'listen')}
                  data-testid="listen-mode"
                >
                  <Icon name="speaker" size={20} />
                  <span className={f.toolLabel}>Listen</span>
                </button>
              )}
              {!finished && <ExplainSlideButton chapterId={chapterId} part={part} slideId={current?.id} slideNumber={index + 1} />}
              <PlayerMenu
                chapterId={chapterId}
                part={part}
                index={index}
                meta={meta}
                links={links}
                lang={lang}
                deckHasAudio={deckHasAudio}
                audioUnsupported={audioSupport === 'no'}
                noteId={noteId}
                beta={beta}
                onJump={jump}
              />
            </div>
            <SlideProgress index={finished ? total : index} total={total} />
          </header>

          <div className={f.stage}>
            <div
              ref={viewportRef}
              className={s.viewport}
              role="region"
              aria-roledescription="carousel"
              aria-label="Lesson slides"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              lang={lang}
              hidden={finished}
              data-more={overflow.more || undefined}
            >
              {mountedWindow(index, total).map((i) => (
                <div
                  key={meta[i]?.id ?? i}
                  data-slide-index={i}
                  hidden={i !== index}
                  inert={i !== index}
                  className={s.slot}
                  tabIndex={i === index && overflow.scrolls ? 0 : undefined}
                >
                  {slides[i]}
                </div>
              ))}
              {overflow.more && (
                <button type="button" className={s.more} onClick={scrollMore} tabIndex={-1} aria-hidden="true">
                  More below <Icon name="arrowDown" size={16} />
                </button>
              )}
            </div>
            {note && !finished && (
              <div className={s.resume} data-testid="resume-note">
                <span>{note.kind === 'resume' ? `Continuing from slide ${note.index + 1}.` : `Opened at slide ${note.index + 1}.`}</span>
                <button type="button" className={s.linkButton} onClick={() => jump(0)}>
                  Start over
                </button>
                <button type="button" className={s.noteClose} onClick={() => setNote(null)} aria-label="Dismiss">
                  <Icon name="close" size={16} />
                </button>
              </div>
            )}
            {finished && (
              <Suspense fallback={<div className={s.doneLoading} aria-hidden="true" />}>
                <CompletionScreen
                  heading={partLabel ? `Part ${partIndex + 1} complete` : 'Lesson complete'}
                  slides={total}
                  checkIds={meta.map((m) => m.checkQuestionId)}
                  checks={checks}
                  saved={completed}
                  isMember={isMember}
                  links={links}
                  primaryHref={primary.href}
                  onRestart={() => jump(0)}
                />
              </Suspense>
            )}
          </div>

          <div className={s.dock}>
            {mode === 'listen' && current && !finished && (
              <Suspense fallback={<div className={s.listenLoading} aria-hidden="true" />}>
                <ListenPanel
                  narration={current.narration}
                  lang={lang}
                  hasAudio={!!audio}
                  playing={playing}
                  time={time}
                  duration={audio ? audio.durationMs / 1000 : 0}
                  onToggle={togglePlay}
                  autoplay={autoplay}
                  onAutoplay={setAutoplay}
                />
              </Suspense>
            )}
            <audio
              ref={audioRef}
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={onEnded}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              hidden
            />
          </div>

          <nav className={f.bar} aria-label="Slide navigation">
            <div className={f.barInner}>
              <Button variant="secondary" icon="chevronLeft" className={f.big} onClick={() => go('prev')} disabled={index === 0 && !finished} data-testid="prev-slide">
                <span className={f.hideNarrow}>Previous</span>
              </Button>
              <p className={f.barHint} aria-hidden="true">
                <kbd className={f.kbd}>←</kbd> <kbd className={f.kbd}>→</kbd> or <kbd className={f.kbd}>Space</kbd> to move
              </p>
              {finished ? (
                <Link href={primary.href} className={cx(s.primaryLink, f.big, f.grow)} data-testid="lesson-next-step">
                  {primary.label} <Icon name="chevronRight" size={18} />
                </Link>
              ) : checkPending ? (
                <>
                  <Button variant="secondary" className={f.big} onClick={() => go('next')} data-testid="next-slide">
                    Skip
                  </Button>
                  <Button className={cx(f.big, f.grow)} icon="check" onClick={submitCheck} data-testid="check-slide">
                    Check
                  </Button>
                </>
              ) : (
                <Button className={cx(f.big, f.grow)} onClick={() => go('next')} data-testid="next-slide">
                  {index === last ? 'Finish' : 'Next'} <Icon name="chevronRight" size={18} />
                </Button>
              )}
            </div>
          </nav>
          <p className="p-visually-hidden" aria-live="polite" data-testid="slide-announcer">
            {announce}
          </p>
        </div>
      </CheckResultsProvider>
    </>
  );
}

/** One segment per slide (a continuous bar for very long decks); the current slide is marked. */
function SlideProgress({ index, total }: { index: number; total: number }) {
  const done = Math.min(index + 1, total);
  const label = index >= total ? `All ${total} slides done` : `Slide ${index + 1} of ${total}`;
  return (
    <div className={f.progress} role="progressbar" aria-label="Lesson progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-valuetext={label}>
      {total <= 40 ? (
        Array.from({ length: total }, (_, i) => <span key={i} className={cx(f.seg, (i < index || index >= total) && f.segOn, i === index && f.segNow)} />)
      ) : (
        <span className={f.track}>
          <span className={f.fill} style={{ display: 'block', width: `${Math.round((done / Math.max(total, 1)) * 100)}%` }} />
        </span>
      )}
    </div>
  );
}

/** "Part 1 of 2 ▾": the chapter's parts as links (in the HTML even while closed). */
function PartSwitcher({ parts, current, label }: { parts: LessonPartLink[]; current: number; label: string }) {
  const pop = usePopover();
  return (
    <span className={f.popWrap}>
      <button type="button" className={f.chip} {...pop.buttonProps} data-testid="part-switcher">
        {label}
        <Icon name="chevronDown" size={14} />
      </button>
      <div className={cx(f.pop, f.popStart)} {...pop.panelProps}>
        <nav aria-label="Lesson parts">
          <ol className={f.popList}>
            {parts.map((p, i) => (
              <li key={p.part}>
                {p.part === current ? (
                  <span className={f.popItem} aria-current="page">
                    <span className={s.outlineNo}>{i + 1}</span>
                    <span className={s.outlineText}>{p.title}</span>
                  </span>
                ) : (
                  <Link href={p.href} className={f.popItem} onClick={() => pop.close()}>
                    <span className={s.outlineNo}>{i + 1}</span>
                    <span className={s.outlineText}>{p.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </span>
  );
}

/** Options: report a mistake, other ways into the chapter, the slide outline (jump), notes about the mode. */
function PlayerMenu({
  chapterId,
  part,
  index,
  meta,
  links,
  lang,
  deckHasAudio,
  audioUnsupported,
  noteId,
  beta,
  onJump,
}: {
  chapterId: string;
  part: number;
  index: number;
  meta: SlideMeta[];
  links: LessonLinks;
  lang?: string;
  deckHasAudio: boolean;
  audioUnsupported: boolean;
  noteId: string;
  beta?: boolean;
  onJump: (i: number) => void;
}) {
  const pop = usePopover();
  const current = meta[index];
  return (
    <span className={f.popWrap}>
      <button type="button" className={f.tool} aria-label="Lesson options" {...pop.buttonProps} data-testid="lesson-options">
        <DotsIcon />
      </button>
      <div className={f.pop} {...pop.panelProps} data-testid="lesson-options-panel">
        <ul className={f.popList}>
          <li>
            <ReportMistake target={{ chapterId, contentType: 'deck', part, itemRef: current?.id }} what={`slide ${index + 1}`} compact className={cx(f.popItem, s.menuReport)} />
          </li>
          {links.notes && (
            <li>
              <Link href={links.notes} className={f.popItem}>
                <Icon name="book" size={18} /> Chapter notes
              </Link>
            </li>
          )}
          {links.practice && (
            <li>
              <Link href={links.practice} className={f.popItem}>
                <Icon name="target" size={18} /> Practise questions
              </Link>
            </li>
          )}
        </ul>
        <div className={f.popSep} />
        <p className={f.popHeading} id={`${noteId}-outline`}>
          Slides
        </p>
        <ol className={f.popList} aria-labelledby={`${noteId}-outline`} lang={lang}>
          {meta.map((m, i) => (
            <li key={m.id}>
              <button
                type="button"
                className={f.popItem}
                aria-current={i === index ? 'step' : undefined}
                onClick={() => {
                  onJump(i);
                  pop.close(true);
                }}
              >
                <span className={s.outlineNo}>{i + 1}</span>
                <span className={s.outlineText}>{m.heading}</span>
              </button>
            </li>
          ))}
        </ol>
        {beta && (
          <p className={f.popNote} lang="en">
            <strong>Beta</strong>: checked automatically; a teacher review is coming.
          </p>
        )}
        {(!deckHasAudio || audioUnsupported) && (
          <p className={f.popNote} id={`${noteId}-audio`} lang="en">
            {audioUnsupported ? (
              <>Narration audio does not play in this browser yet. Update your browser to listen; reading works everywhere.</>
            ) : (
              <>
                <strong>Read mode</strong>: this lesson has no narration yet.
              </>
            )}
          </p>
        )}
      </div>
    </span>
  );
}
