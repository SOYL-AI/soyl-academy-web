/**
 * The frame every slide layout renders in: 360 px-first, scales up to a centred card on wide
 * screens, carries slide semantics (aria-roledescription="slide"), language, and the read-along
 * narration with listen-mode highlighting. Navigation, audio and progress belong to the player
 * (web-platform, M2).
 */
import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Badge } from '../kit/Display';
import type { IconName } from '../kit/Icon';
import { ReadAlong, type NarrationHighlight } from './ReadAlong';
import s from './slides.module.css';

export type SlideMode = 'read' | 'listen';

export interface SlideFrameProps {
  slideId: string;
  heading: string;
  /** Short label for the layout ("Worked example"), shown as a badge. */
  kicker?: string;
  kickerIcon?: IconName;
  kickerTone?: 'neutral' | 'accent' | 'success' | 'warning' | 'highlight';
  /** 1-based position, for "3 / 18" and the accessible label. */
  index?: number;
  total?: number;
  narration?: string;
  mode?: SlideMode;
  /** Show the narration text (default: in listen mode). */
  showNarration?: boolean;
  highlight?: NarrationHighlight | null;
  lang?: string;
  /** Heading level of the slide title (default h2: the page/deck title is h1). */
  headingLevel?: 'h1' | 'h2' | 'h3';
  /** Prefix for element ids, unique per deck on the page (default "slide"). */
  idPrefix?: string;
  /** Layout name, for styling hooks and tests. */
  layout: string;
  /** Title slides centre their content. */
  centred?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function SlideFrame({
  slideId,
  heading,
  kicker,
  kickerIcon,
  kickerTone = 'accent',
  index,
  total,
  narration,
  mode = 'read',
  showNarration,
  highlight,
  lang,
  headingLevel: H = 'h2',
  idPrefix = 'slide',
  layout,
  centred,
  children,
  footer,
  className,
}: SlideFrameProps) {
  const position = index && total ? `${index} / ${total}` : null;
  const narrationVisible = (showNarration ?? mode === 'listen') && !!narration;
  const headingId = `${idPrefix}-${slideId}-heading`;
  return (
    <article
      className={cx(s.frame, centred && s.centred, className)}
      aria-roledescription="slide"
      aria-labelledby={headingId}
      data-slide-id={slideId}
      data-layout={layout}
      data-mode={mode}
      lang={lang}
    >
      <header className={s.header}>
        {(kicker || position) && (
          <div className={s.meta}>
            {kicker ? (
              <Badge tone={kickerTone} icon={kickerIcon}>
                {kicker}
              </Badge>
            ) : (
              <span />
            )}
            {position && (
              <span className={s.position}>
                <span className="p-visually-hidden">Slide </span>
                {position}
              </span>
            )}
          </div>
        )}
        <H id={headingId} className={s.heading}>
          {heading}
        </H>
      </header>
      <div className={s.body}>{children}</div>
      {narrationVisible && (
        <section className={cx(s.narration, mode === 'listen' && s.narrationListen)} aria-label="Narration">
          <ReadAlong text={narration!} highlight={mode === 'listen' ? highlight : null} lang={lang} />
        </section>
      )}
      {footer && <footer className={s.footer}>{footer}</footer>}
    </article>
  );
}
