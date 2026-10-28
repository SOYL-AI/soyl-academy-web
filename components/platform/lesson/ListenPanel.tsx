'use client';

/**
 * Listen-mode dock (lazy chunk; only loaded when a student turns Listen on): play/pause for the current slide's
 * narration, the clock, "Auto-play next slide", and the read-along text with the spoken word highlighted
 * (time-proportional estimate, player-logic.ts `wordAtTime`). It sits between the slide and the bottom bar, so it
 * never covers the slide. The <audio> element itself stays in the player.
 */
import { useMemo } from 'react';
import { Button } from '@/components/platform/ui/kit/Button';
import { ReadAlong } from '@/components/platform/ui/slides/ReadAlong';
import { segmentNarration } from '@/components/platform/ui/slides/segment';
import { wordAtTime } from './player-logic';
import s from './lesson.module.css';

export function formatTime(sec: number): string {
  const t = Math.max(0, Math.floor(sec));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}

export interface ListenPanelProps {
  narration: string;
  lang?: string;
  hasAudio: boolean;
  playing: boolean;
  time: number;
  duration: number;
  onToggle: () => void;
  autoplay: boolean;
  onAutoplay: (on: boolean) => void;
}

export function ListenPanel({ narration, lang, hasAudio, playing, time, duration, onToggle, autoplay, onAutoplay }: ListenPanelProps) {
  const sentences = useMemo(() => segmentNarration(narration), [narration]);
  const word = hasAudio && (playing || time > 0) ? wordAtTime(sentences, time, duration) : null;
  return (
    <section className={s.listen} aria-label="Narration" data-testid="narration">
      <div className={s.listenControls}>
        {hasAudio ? (
          <>
            <Button size="sm" icon={playing ? 'pause' : 'play'} onClick={onToggle} aria-label={playing ? 'Pause narration' : 'Play narration'}>
              {playing ? 'Pause' : 'Play'}
            </Button>
            <span className={s.audioTime} aria-hidden="true">
              {formatTime(time)} / {formatTime(duration)}
            </span>
          </>
        ) : (
          <p className={s.listenNote}>This slide has no narration audio.</p>
        )}
        <label className={s.autoplay}>
          <input type="checkbox" checked={autoplay} onChange={(e) => onAutoplay(e.currentTarget.checked)} data-testid="autoplay-next" />
          Auto-play next slide
        </label>
      </div>
      {/* A short scroll area (long narration): focusable so keyboard users can scroll it (axe scrollable-region-focusable). */}
      <div className={s.readAlong} lang={lang} tabIndex={0} role="group" aria-label="Narration text">
        <ReadAlong text={narration} highlight={word !== null ? { word } : null} lang={lang} />
      </div>
    </section>
  );
}
