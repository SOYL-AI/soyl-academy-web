'use client';

/**
 * Slide player (ARCHITECTURE §3.2). Slides arrive as server-rendered React nodes (Markdown, KaTeX and
 * diagrams cost no client JS); this component only navigates, remembers and narrates.
 *
 * - Navigation: ← / → / Space (Shift+Space back) / Home / End, swipe left/right, Previous/Next buttons.
 * - Progress bar and "slide n of N" (announced politely).
 * - Read mode (default) and listen mode: plays `slide.audio`, highlights the sentence and word being
 *   spoken (time-proportional estimate, player-logic.ts), advances to the next slide at the end of a clip.
 *   Listen mode is offered only when the deck has audio this browser can play (ADR-013): no
 *   speechSynthesis (it can send narration to a third-party cloud voice, WEB-1).
 * - Position: members → debounced PUT /v1/me/lesson-progress; guests → soyl_guest_v1. Resumes on return.
 * - Only the previous, current and next two slides are mounted (hidden + inert when not current): the next
 *   two are prefetched (their images switch to eager loading), the rest load when they come near.
 */
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, ProgressBar } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { ReadAlong } from '@/components/platform/ui/slides/ReadAlong';
import { segmentNarration } from '@/components/platform/ui/slides/segment';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { readGuestLessonPosition, readGuestProgress, recordGuestLessonPosition } from '../lib/guest-storage';
import { ReportMistake } from '../report/ReportMistake';
import { CheckResultsProvider } from './CheckQuestion';
import { applyNav, isInteractiveTarget, keyAction, mountedWindow, PROGRESS_DEBOUNCE_MS, startsInHorizontalScroller, swipeAction, wordAtTime, type NavAction } from './player-logic';
import s from './lesson.module.css';

export interface SlideMeta {
  id: string;
  heading: string;
  narration: string;
  audio: { url: string; mime: string; durationMs: number } | null;
}

export interface LessonLinks {
  hub: string;
  notes?: string;
  practice?: string;
  nextPart?: { href: string; title: string };
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
}

type Mode = 'read' | 'listen';

function formatTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function SlidePlayer({ chapterId, part, firstPart, slides, meta, lang, links }: SlidePlayerProps) {
  const total = slides.length;
  const last = total - 1;
  const { state: session } = useSession();
  const toast = useToast();
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('read');
  const [ready, setReady] = useState(false);
  const [resumedAt, setResumedAt] = useState<number | null>(null);
  const [announce, setAnnounce] = useState('');
  const [audioSupport, setAudioSupport] = useState<'unknown' | 'yes' | 'no'>('unknown');
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const touch = useRef<{ x: number; y: number; ignore: boolean } | null>(null);
  const continuePlaying = useRef(false);
  const isMember = session.status === 'member';

  const deckHasAudio = meta.some((m) => m.audio);
  const current = meta[index];
  const sentences = useMemo(() => segmentNarration(current?.narration ?? ''), [current?.narration]);

  /* ── Audio support (iOS Safari before 18.4 cannot play Ogg Opus; ADR-013) ─────────────────── */
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
      if (slide !== null && slide !== undefined && slide > 0 && slide <= last && !done) {
        setIndex(slide);
        setResumedAt(slide);
      }
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
  }, [session.status, ready, chapterId, part, firstPart, last]);

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

  /* ── Navigation ──────────────────────────────────────────────────────────────────────────── */
  const go = useCallback(
    (action: NavAction) => {
      setIndex((i) => {
        const next = applyNav(action, i, total);
        if (next !== i) setResumedAt(null);
        return next;
      });
    },
    [total],
  );

  useEffect(() => {
    const h = meta[index]?.heading ?? '';
    // eslint-disable-next-line react-hooks/set-state-in-effect -- announce after the slide changed
    setAnnounce(`Slide ${index + 1} of ${total}${h ? `: ${h}` : ''}`);
    // Prefetch the next two slides' images (they are mounted but hidden).
    const root = viewportRef.current;
    if (root) {
      for (const n of [index + 1, index + 2]) root.querySelectorAll<HTMLImageElement>(`[data-slide-index="${n}"] img[loading="lazy"]`).forEach((img) => img.setAttribute('loading', 'eager'));
    }
  }, [index, total, meta]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const action = keyAction(e.key, e.shiftKey);
      if (!action || isInteractiveTarget(e.target)) return;
      // Ignore keys while a dialog (login, report) is open.
      if (document.querySelector('dialog[open]')) return;
      e.preventDefault();
      go(action);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t || e.touches.length > 1) {
      touch.current = null;
      return;
    }
    touch.current = { x: t.clientX, y: t.clientY, ignore: startsInHorizontalScroller(e.target) };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    const t = e.changedTouches[0];
    if (!start || !t || start.ignore) return;
    const action = swipeAction(t.clientX - start.x, t.clientY - start.y);
    if (action) go(action);
  };

  /* ── Listen mode ─────────────────────────────────────────────────────────────────────────── */
  const audio = current?.audio ?? null;
  const listenAvailable = deckHasAudio && audioSupport === 'yes';

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (mode !== 'listen' || !audio) {
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
  }, [mode, audio]);

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
    if (index < last && continuePlaying.current) {
      window.setTimeout(() => go('next'), 700);
    } else {
      continuePlaying.current = false;
    }
  };

  const duration = audio ? audio.durationMs / 1000 : 0;
  const word = mode === 'listen' && audio && (playing || time > 0) ? wordAtTime(sentences, time, duration) : null;

  const switchMode = (m: Mode) => {
    if (m === 'read') {
      continuePlaying.current = false;
      audioRef.current?.pause();
    }
    setMode(m);
  };

  return (
    <CheckResultsProvider>
      <div className={s.player} data-testid="slide-player" data-index={index} data-mode={mode} data-ready={ready || undefined}>
        <div className={s.toolbar}>
          {deckHasAudio ? (
            <div className={s.modeSwitch} role="group" aria-label="Lesson mode">
              <button type="button" className={cx(s.modeButton, mode === 'read' && s.modeOn)} aria-pressed={mode === 'read'} onClick={() => switchMode('read')}>
                <Icon name="book" size={18} /> Read
              </button>
              <button
                type="button"
                className={cx(s.modeButton, mode === 'listen' && s.modeOn)}
                aria-pressed={mode === 'listen'}
                disabled={!listenAvailable}
                onClick={() => switchMode('listen')}
                data-testid="listen-mode"
              >
                <Icon name="speaker" size={18} /> Listen
              </button>
            </div>
          ) : (
            <span className={s.toolbarNote}>Read mode</span>
          )}
          <ReportMistake target={{ chapterId, contentType: 'deck', part, itemRef: current?.id }} what={`slide ${index + 1}`} compact />
        </div>
        {deckHasAudio && audioSupport === 'no' && (
          <p className={s.note} role="note">
            <Icon name="info" size={16} /> Narration audio does not play in this browser yet. Update your browser to listen; reading works everywhere.
          </p>
        )}

        <ProgressBar value={index + 1} max={total} label="Lesson progress" valueText={`Slide ${index + 1} of ${total}`} hideLabel thin className={s.progress} />

        {resumedAt !== null && (
          <div className={s.resume} data-testid="resume-note">
            <span>Continuing from slide {resumedAt + 1}.</span>
            <button type="button" className={s.linkButton} onClick={() => go('first')}>
              Start over
            </button>
          </div>
        )}

        <div
          ref={viewportRef}
          className={s.viewport}
          role="region"
          aria-roledescription="carousel"
          aria-label="Lesson slides"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          lang={lang}
        >
          {mountedWindow(index, total).map((i) => (
            <div key={meta[i]?.id ?? i} data-slide-index={i} hidden={i !== index} inert={i !== index} className={s.slot}>
              {slides[i]}
            </div>
          ))}
        </div>

        {mode === 'listen' && current && (
          <section className={s.listen} aria-label="Narration" data-testid="narration">
            {audio ? (
              <div className={s.audioBar}>
                <Button size="sm" icon={playing ? 'pause' : 'play'} onClick={togglePlay} aria-label={playing ? 'Pause narration' : 'Play narration'}>
                  {playing ? 'Pause' : 'Play'}
                </Button>
                <span className={s.audioTime} aria-hidden="true">
                  {formatTime(time)} / {formatTime(duration)}
                </span>
              </div>
            ) : (
              <p className={s.note}>This slide has no narration audio.</p>
            )}
            <ReadAlong text={current.narration} highlight={word !== null ? { word } : null} lang={lang} />
          </section>
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

        <nav className={s.nav} aria-label="Slide navigation">
          <Button variant="secondary" icon="chevronLeft" onClick={() => go('prev')} disabled={index === 0} data-testid="prev-slide">
            Previous
          </Button>
          <span className={s.counter} aria-hidden="true">
            {index + 1} / {total}
          </span>
          <Button onClick={() => go('next')} disabled={index === last} data-testid="next-slide">
            Next <Icon name="chevronRight" size={18} />
          </Button>
        </nav>
        <p className={s.keysHint}>Tip: use the arrow keys or swipe to move between slides.</p>

        {index === last && (
          <section className={s.done} aria-labelledby="lesson-done-title" data-testid="lesson-complete">
            <h2 id="lesson-done-title" className={s.doneTitle}>
              <Icon name="check" size={22} /> {completed ? 'Lesson part complete' : 'You reached the end'}
              {completed && <Badge tone="success">Done</Badge>}
            </h2>
            <p>{isMember ? 'Your progress is saved to your account.' : 'Your progress is saved on this device. Log in to keep it across devices.'}</p>
            <div className={s.doneLinks}>
              {links.nextPart && (
                <Link href={links.nextPart.href} className={s.primaryLink}>
                  Next: {links.nextPart.title} <Icon name="chevronRight" size={18} />
                </Link>
              )}
              {links.practice && (
                <Link href={links.practice} className={s.secondaryLink}>
                  Practise questions
                </Link>
              )}
              {links.notes && (
                <Link href={links.notes} className={s.secondaryLink}>
                  Read the notes
                </Link>
              )}
              <Link href={links.hub} className={s.secondaryLink}>
                Back to the chapter
              </Link>
            </div>
          </section>
        )}
        <p className="p-visually-hidden" aria-live="polite" data-testid="slide-announcer">
          {announce}
        </p>
      </div>
    </CheckResultsProvider>
  );
}
