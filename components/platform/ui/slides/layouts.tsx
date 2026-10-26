/**
 * One presentational component per slide layout in platform/shared/content/deck.ts, plus
 * `renderSlide(slide, options)`. No 'use client': render slides in a Server Component and hand
 * them to the (client) player as children, so Markdown and KaTeX cost no client JS.
 */
import type { ReactNode } from 'react';
import type { Slide } from '@/platform/shared/content/deck';
import { cx } from '../cx';
import { Icon } from '../kit/Icon';
import { Markdown } from '../render/Markdown';
import { MathBlock } from '../render/MathBlock';
import { Visual } from '../visual/Visual';
import { SlideFrame, type SlideMode } from './SlideFrame';
import type { NarrationHighlight } from './ReadAlong';
import s from './slides.module.css';

export interface SlideRenderOptions {
  index?: number;
  total?: number;
  mode?: SlideMode;
  highlight?: NarrationHighlight | null;
  showNarration?: boolean;
  /** Deck language ("hi" switches to Devanagari typography). */
  lang?: string;
  /** Deck goals, shown on the title slide. */
  goals?: string[];
  /** Renders the practice question of a `check` slide (the player/test engine owns questions). */
  renderCheck?: (questionId: string) => ReactNode;
  headingLevel?: 'h1' | 'h2' | 'h3';
  idPrefix?: string;
  className?: string;
}

export interface LayoutProps {
  slide: Slide;
  options: SlideRenderOptions;
}

/* ── Shared pieces ─────────────────────────────────────────────────────────── */

function Body({ md, lang }: { md?: string; lang?: string }) {
  if (!md || !md.trim()) return null;
  return (
    <Markdown lang={lang} headingOffset={2} className={s.text}>
      {md}
    </Markdown>
  );
}

function Bullets({ items, ordered, variant }: { items?: string[]; ordered?: boolean; variant?: 'steps' | 'check' | 'tips' }) {
  if (!items || items.length === 0) return null;
  const List = ordered ? 'ol' : 'ul';
  return (
    <List className={cx(s.bullets, variant && s[`bullets-${variant}`])}>
      {items.map((item, i) => (
        <li key={i}>
          {variant === 'check' && <Icon name="check" size={18} className={s.bulletIcon} />}
          {variant === 'tips' && <Icon name="alert" size={18} className={s.bulletIcon} />}
          <Markdown inline>{item}</Markdown>
        </li>
      ))}
    </List>
  );
}

function MathList({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className={s.math}>
      {items.map((tex, i) => (
        <MathBlock key={i} tex={tex} />
      ))}
    </div>
  );
}

function frameProps(slide: Slide, o: SlideRenderOptions) {
  return {
    slideId: slide.id,
    heading: slide.heading,
    index: o.index,
    total: o.total,
    narration: slide.narration,
    mode: o.mode,
    showNarration: o.showNarration,
    highlight: o.highlight,
    lang: o.lang,
    headingLevel: o.headingLevel,
    idPrefix: o.idPrefix,
    layout: slide.layout,
    className: o.className,
  };
}

/* ── Layouts ───────────────────────────────────────────────────────────────── */

export function TitleSlide({ slide, options }: LayoutProps) {
  return (
    <SlideFrame {...frameProps(slide, options)} kicker="Lesson" kickerIcon="book" centred>
      <Body md={slide.body_md} lang={options.lang} />
      {options.goals && options.goals.length > 0 && (
        <div className={s.goals}>
          <p className={s.goalsTitle}>{options.lang === 'hi' ? 'इस पाठ में आप सीखेंगे' : 'In this lesson you will'}</p>
          <Bullets items={options.goals} variant="check" />
        </div>
      )}
      {slide.visual && <Visual visual={slide.visual} />}
    </SlideFrame>
  );
}

export function ConceptSlide({ slide, options }: LayoutProps) {
  const hasVisual = !!slide.visual;
  return (
    <SlideFrame {...frameProps(slide, options)} kicker="Concept" kickerTone="neutral">
      <div className={cx(hasVisual && s.split)}>
        <div className={s.stack}>
          <Body md={slide.body_md} lang={options.lang} />
          <Bullets items={slide.bullets} />
          <MathList items={slide.math} />
        </div>
        {slide.visual && <Visual visual={slide.visual} />}
      </div>
    </SlideFrame>
  );
}

export function TwoColumnSlide({ slide, options }: LayoutProps) {
  const [left, right] = slide.columns ?? ['', ''];
  return (
    <SlideFrame {...frameProps(slide, options)} kicker="Compare" kickerTone="neutral">
      <Body md={slide.body_md} lang={options.lang} />
      <div className={s.columns}>
        <div className={s.column}>
          <Markdown lang={options.lang}>{left}</Markdown>
        </div>
        <div className={s.column}>
          <Markdown lang={options.lang}>{right}</Markdown>
        </div>
      </div>
      <Bullets items={slide.bullets} />
      <MathList items={slide.math} />
      {slide.visual && <Visual visual={slide.visual} />}
    </SlideFrame>
  );
}

export function DiagramSlide({ slide, options }: LayoutProps) {
  return (
    <SlideFrame {...frameProps(slide, options)} kicker="Diagram" kickerTone="neutral">
      {slide.visual && <Visual visual={slide.visual} className={s.diagramVisual} />}
      <Body md={slide.body_md} lang={options.lang} />
      <Bullets items={slide.bullets} />
      <MathList items={slide.math} />
    </SlideFrame>
  );
}

export function ExampleSlide({ slide, options }: LayoutProps) {
  return (
    <SlideFrame {...frameProps(slide, options)} kicker={options.lang === 'hi' ? 'हल किया गया उदाहरण' : 'Worked example'} kickerTone="highlight">
      <div className={s.problem}>
        <Body md={slide.body_md} lang={options.lang} />
      </div>
      <MathList items={slide.math} />
      <Bullets items={slide.bullets} ordered variant="steps" />
      {slide.visual && <Visual visual={slide.visual} />}
    </SlideFrame>
  );
}

export function CheckSlide({ slide, options }: LayoutProps) {
  const id = slide.check_question_id;
  const check = id && options.renderCheck ? options.renderCheck(id) : null;
  return (
    <SlideFrame {...frameProps(slide, options)} kicker={options.lang === 'hi' ? 'अपनी समझ जाँचें' : 'Check your understanding'} kickerIcon="check" kickerTone="success">
      <Body md={slide.body_md} lang={options.lang} />
      <Bullets items={slide.bullets} />
      <MathList items={slide.math} />
      {slide.visual && <Visual visual={slide.visual} />}
      <div className={s.check} data-question-id={id ?? undefined}>
        {check ?? <p className={s.checkPlaceholder}>The practice question appears here.</p>}
      </div>
    </SlideFrame>
  );
}

export function SummarySlide({ slide, options }: LayoutProps) {
  return (
    <SlideFrame {...frameProps(slide, options)} kicker={options.lang === 'hi' ? 'सारांश' : 'Summary'} kickerTone="accent">
      <Body md={slide.body_md} lang={options.lang} />
      <Bullets items={slide.bullets} variant="check" />
      <MathList items={slide.math} />
      {slide.visual && <Visual visual={slide.visual} />}
    </SlideFrame>
  );
}

export function ExamTipsSlide({ slide, options }: LayoutProps) {
  return (
    <SlideFrame {...frameProps(slide, options)} kicker={options.lang === 'hi' ? 'परीक्षा सुझाव' : 'Exam tips'} kickerIcon="spark" kickerTone="warning">
      <Body md={slide.body_md} lang={options.lang} />
      <Bullets items={slide.bullets} variant="tips" />
      <MathList items={slide.math} />
      {slide.visual && <Visual visual={slide.visual} />}
    </SlideFrame>
  );
}

export const SLIDE_LAYOUT_COMPONENTS = {
  title: TitleSlide,
  concept: ConceptSlide,
  'two-column': TwoColumnSlide,
  diagram: DiagramSlide,
  example: ExampleSlide,
  check: CheckSlide,
  summary: SummarySlide,
  'exam-tips': ExamTipsSlide,
} as const satisfies Record<Slide['layout'], (props: LayoutProps) => ReactNode>;

/** The entry point for the player: the right layout for a slide, inside its SlideFrame. */
export function renderSlide(slide: Slide, options: SlideRenderOptions = {}): ReactNode {
  const Layout = SLIDE_LAYOUT_COMPONENTS[slide.layout] ?? ConceptSlide;
  return <Layout key={slide.id} slide={slide} options={options} />;
}
