/**
 * Dev-only gallery of the platform UI kit, renderers and slide layouts (design-system, M1).
 * Gated by itself (the (platform) layout arrives later with web-platform): 404 unless
 * NODE_ENV !== 'production' AND the platform flag is on. Never reachable in a production build.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readFlags } from '@/platform/shared/config/flags';
import { Deck, type Slide } from '@/platform/shared/content/deck';
import type { Visual as VisualData } from '@/platform/shared/content/visual';
import { notoDevanagari } from '@/components/platform/ui/fonts';
import { PlatformRoot } from '@/components/platform/ui/PlatformRoot';
import { Button, IconButton } from '@/components/platform/ui/kit/Button';
import { CreditChip } from '@/components/platform/ui/kit/CreditChip';
import { Avatar, Badge, Card, CardMeta, CardTitle, Chip, EmptyState, ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { Markdown } from '@/components/platform/ui/render/Markdown';
import { MathBlock } from '@/components/platform/ui/render/MathBlock';
import { renderSlide } from '@/components/platform/ui/slides/layouts';
import { Visual } from '@/components/platform/ui/visual/Visual';
import { SAMPLE_CHECK_QUESTION, SAMPLE_DECK, SAMPLE_DECK_HI } from '@/components/platform/ui/__fixtures__/sample-deck';
import { MARKDOWN_XSS, SVG_XSS } from '@/components/platform/ui/__fixtures__/xss-corpus';
import { ChipDemo, FormDemo, OverlayDemo, TabsDemo } from './GalleryClient';
import s from './gallery.module.css';

export const metadata: Metadata = {
  title: 'Platform UI gallery (dev)',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

function gate() {
  if (process.env.NODE_ENV === 'production' || !readFlags().platformEnabled) notFound();
}

interface QuestionLike {
  id: string;
  stem_md: string;
  options: Array<{ id: string; text_md: string }>;
}

function QuestionPreview({ q }: { q: QuestionLike }) {
  return (
    <div className={s.question}>
      <Markdown>{q.stem_md}</Markdown>
      <ol className={s.options} type="a">
        {q.options.map((o) => (
          <li key={o.id}>
            <Markdown inline>{o.text_md}</Markdown>
          </li>
        ))}
      </ol>
    </div>
  );
}

function loadExemplar(path = 'science/cbse-10-science-ch01'): { decks: Deck[]; questions: QuestionLike[] } | null {
  try {
    const file = join(process.cwd(), 'platform/content-templates/exemplars', path, 'release.json');
    const raw = JSON.parse(readFileSync(file, 'utf8')) as { decks: unknown[]; questions: QuestionLike[] };
    return { decks: raw.decks.map((d) => Deck.parse(d)), questions: raw.questions };
  } catch {
    return null;
  }
}

const SWATCHES = [
  '--p-bg', '--p-surface', '--p-surface-2', '--p-ink', '--p-ink-muted', '--p-ink-subtle', '--p-border-strong', '--p-accent',
  '--p-highlight', '--p-danger', '--p-success', '--p-warning', '--diagram-accent', '--diagram-muted', '--diagram-fill',
  '--diagram-blue', '--diagram-green', '--diagram-yellow', '--diagram-brown', '--diagram-red',
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className={s.section} aria-labelledby={`${id}-h`} id={id}>
      <h2 id={`${id}-h`} className={s.h2}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function KitSample() {
  return (
    <div className={s.stack}>
      <div className={s.row}>
        <Button>Start lesson</Button>
        <Button variant="secondary">Notes</Button>
        <Button variant="ghost">Skip</Button>
        <Button variant="danger">Delete account</Button>
        <Button loading>Saving</Button>
        <Button size="sm" icon="speaker">
          Listen
        </Button>
        <IconButton icon="chevronLeft" label="Previous slide" variant="secondary" />
        <IconButton icon="chevronRight" label="Next slide" variant="secondary" />
      </div>
      <div className={s.row}>
        <Badge>Draft</Badge>
        <Badge tone="accent">New</Badge>
        <Badge tone="success" icon="check">
          Completed
        </Badge>
        <Badge tone="warning">2 days left</Badge>
        <Badge tone="danger">Missed</Badge>
        <Badge tone="highlight">Exam favourite</Badge>
        <Chip static>Chemistry</Chip>
        <CreditChip balance={18} />
      </div>
      <ProgressBar label="Lesson progress" value={7} max={18} valueText="7 of 18 slides" />
    </div>
  );
}

export default function UiGalleryPage() {
  gate();
  const deck = Deck.parse(SAMPLE_DECK);
  const deckHi = Deck.parse(SAMPLE_DECK_HI);
  const exemplar = loadExemplar();
  const maths = loadExemplar('maths/cbse-10-mathematics-ch06');
  const mathsGeometry = (maths?.decks ?? []).flatMap((d) => d.slides.flatMap((sl) => (sl.visual?.kind === 'geometry' ? [{ id: `p${d.part}-${sl.id}`, visual: sl.visual }] : [])));
  const mathsTableSlide = maths?.decks[0].slides.find((sl) => sl.visual?.kind === 'table');
  const sampleVisuals = deck.slides.flatMap((sl) => (sl.visual ? [sl.visual] : [])) as VisualData[];
  const renderCheck = (id: string) => {
    const q = id === SAMPLE_CHECK_QUESTION.id ? SAMPLE_CHECK_QUESTION : [...(exemplar?.questions ?? []), ...(maths?.questions ?? [])].find((x) => x.id === id);
    return q ? <QuestionPreview q={q} /> : null;
  };
  const slideList = (slides: Slide[], opts: { lang?: string; goals?: string[]; idPrefix: string }) =>
    slides.map((slide, i) => (
      <div key={slide.id} className={s.slideWrap}>
        {renderSlide(slide, { index: i + 1, total: slides.length, renderCheck, ...opts })}
      </div>
    ));

  return (
    <PlatformRoot className={`${notoDevanagari.variable} ${s.page}`} data-testid="ui-gallery">
      <div className={s.container}>
        <header className={s.intro}>
          <p className={s.eyebrow}>SOYL platform · design system · dev only</p>
          <h1 className={s.h1}>UI kit and content renderers</h1>
          <p className={s.lead}>
            Every component, visual kind and slide layout, rendered from fixtures that validate against the shared content schema. This page returns 404 in
            production builds and when the platform flag is off.
          </p>
          <nav aria-label="Gallery sections" className={s.toc}>
            {[
              ['tokens', 'Tokens'],
              ['kit', 'Components'],
              ['overlays', 'Overlays'],
              ['forms', 'Forms'],
              ['markdown', 'Markdown & maths'],
              ['visuals', 'Visuals'],
              ['slides', 'Slides'],
              ['hindi', 'Hindi'],
              ['exemplar', 'Science exemplar'],
              ['maths', 'Maths geometry'],
              ['dark', 'Dark theme'],
              ['hostile', 'Hostile content'],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </header>

        <Section id="tokens" title="Tokens">
          <ul className={s.swatches}>
            {SWATCHES.map((t) => (
              <li key={t}>
                <span className={s.swatch} style={{ background: `var(${t})` }} aria-hidden="true" />
                <code>{t}</code>
              </li>
            ))}
          </ul>
          <p className={s.typeScale}>
            <span style={{ fontSize: 'var(--p-text-3xl)' }}>Aa 3xl</span> <span style={{ fontSize: 'var(--p-text-2xl)' }}>Aa 2xl</span>{' '}
            <span style={{ fontSize: 'var(--p-text-xl)' }}>Aa xl</span> <span style={{ fontSize: 'var(--p-text-lg)' }}>Aa lg</span> <span>Aa md</span>{' '}
            <span style={{ fontSize: 'var(--p-text-sm)' }}>Aa sm</span> <span style={{ fontSize: 'var(--p-text-xs)' }}>Aa xs</span>
          </p>
          <p lang="hi" className={s.devanagariSample} data-testid="devanagari-sample">
            हिंदी: प्रकाश का अपवर्तन — क्षेत्रफल, संज्ञा, द्विविस्थापन अभिक्रिया
          </p>
        </Section>

        <Section id="kit" title="Components">
          <KitSample />
          <div className={s.grid}>
            <Card as="article">
              <CardTitle>Chemical Reactions and Equations</CardTitle>
              <CardMeta>Chapter 1 · 43 slides · 77 questions</CardMeta>
              <ProgressBar label="Chapter 1 progress" value={60} thin hideLabel tone="success" />
            </Card>
            <Card elevated>
              <div className={s.row}>
                <Avatar name="Aarav Sharma" />
                <Avatar name="प्रिया वर्मा" />
                <Avatar name="Meera" size={32} />
              </div>
            </Card>
            <Card aria-busy="true">
              <Skeleton variant="circle" />
              <Skeleton lines={3} />
            </Card>
            <Card>
              <EmptyState title="No tests attempted yet" action={<Button size="sm">Browse tests</Button>}>
                Tests are free. Your scores and solutions appear here.
              </EmptyState>
            </Card>
          </div>
          <ChipDemo />
          <TabsDemo
            lesson={<p>Lesson: 21 slides, read or listen.</p>}
            notes={<Markdown>{'**Notes** with maths: $\\ce{CaO + H2O -> Ca(OH)2}$'}</Markdown>}
            practice={<p>Practice: 77 questions in board formats.</p>}
          />
        </Section>

        <Section id="overlays" title="Dialog, bottom sheet, toast">
          <OverlayDemo />
        </Section>

        <Section id="forms" title="Forms">
          <FormDemo />
        </Section>

        <Section id="markdown" title="Markdown and maths">
          <Card>
            <Markdown>
              {[
                '### Speed and velocity',
                'Speed is distance per unit time: $v = \\dfrac{s}{t}$. A train covers **120 km** in **2 h**, so $v = 60\\,\\text{km/h}$.',
                '- Unit of speed: m/s',
                '- A *vector* has direction; speed does not',
                '',
                '$$s = ut + \\tfrac{1}{2}at^2$$',
                '',
                'Photosynthesis: \\ce{6CO2 + 6H2O ->[sunlight][chlorophyll] C6H12O6 + 6O2}',
                '',
                '| Quantity | SI unit |',
                '|---|---|',
                '| Force | newton (N) |',
                '| Energy | joule (J) |',
                '',
                'See the [CBSE curriculum](https://cbseacademic.nic.in/curriculum.html) or [your chapter list](/learn).',
              ].join('\n')}
            </Markdown>
          </Card>
          <MathBlock tex={'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\qquad \\int_0^{\\pi} \\sin x \\, dx = 2 \\qquad \\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}'} />
        </Section>

        <Section id="visuals" title="Visuals (every kind)">
          <div className={s.grid}>
            {sampleVisuals.map((v, i) => (
              <div key={i} data-visual-kind={v.kind}>
                <p className={s.kind}>{v.kind}</p>
                <Visual visual={v} />
              </div>
            ))}
            <div data-visual-kind="chem">
              <p className={s.kind}>chem (equation)</p>
              <Visual visual={{ kind: 'chem', spec: { equation: 'Zn + CuSO4 -> ZnSO4 + Cu' }, alt: 'Zinc displaces copper from copper sulphate solution' }} />
            </div>
          </div>
        </Section>

        <Section id="slides" title="Slides: every layout (English)">
          <div className={s.slides}>{slideList(deck.slides, { goals: deck.goals, idPrefix: 'sample' })}</div>
          <h3 className={s.h3}>Listen mode (word 9 highlighted)</h3>
          <div className={s.slideWrap} data-testid="listen-slide">
            {renderSlide(deck.slides[1], { mode: 'listen', highlight: { word: 9 }, index: 2, total: deck.slides.length, idPrefix: 'listen' })}
          </div>
        </Section>

        <Section id="hindi" title="Hindi deck (Devanagari)">
          <div className={s.slides}>{slideList(deckHi.slides, { lang: 'hi', goals: deckHi.goals, idPrefix: 'hindi' })}</div>
          <div className={s.slideWrap}>
            {renderSlide(deckHi.slides[0], { lang: 'hi', mode: 'listen', highlight: { word: 4 }, idPrefix: 'hindi-listen' })}
          </div>
        </Section>

        <Section id="exemplar" title="Science exemplar: CBSE 10 Science ch. 1 (Part 1)">
          {exemplar ? (
            <div className={s.slides}>{slideList(exemplar.decks[0].slides, { goals: exemplar.decks[0].goals, idPrefix: 'ex1' })}</div>
          ) : (
            <p>Exemplar not found.</p>
          )}
        </Section>

        <Section id="maths" title="Maths exemplar: CBSE 10 Maths ch. 6 (Triangles), every geometry figure">
          <p className={s.note}>Coordinates use the maths convention (origin bottom-left, y up); the renderer flips y. Labels sit outside each shape.</p>
          <div className={s.grid}>
            {mathsGeometry.map(({ id, visual }) => (
              <div key={id} data-geometry={id}>
                <p className={s.kind}>{id}</p>
                <Visual visual={visual} />
              </div>
            ))}
          </div>
          {mathsTableSlide && <div className={s.slideWrap}>{renderSlide(mathsTableSlide, { idPrefix: 'maths-table' })}</div>}
        </Section>

        <Section id="dark" title="Dark theme (forced)">
          <PlatformRoot theme="dark" className={s.darkPanel}>
            <div className={s.stack}>
              <KitSample />
              {renderSlide(deck.slides[2], { index: 3, total: deck.slides.length, idPrefix: 'dark' })}
              {renderSlide(deck.slides[6], { index: 7, total: deck.slides.length, idPrefix: 'dark2' })}
            </div>
          </PlatformRoot>
        </Section>

        <Section id="hostile" title="Hostile content (XSS corpus, must render inert)">
          <p className={s.note}>Each payload below tries to run script or load a remote resource. The e2e test fails if anything executes.</p>
          <details className={s.details}>
            <summary>Markdown payloads ({MARKDOWN_XSS.length})</summary>
            <ol className={s.hostileList} data-testid="hostile-markdown">
              {MARKDOWN_XSS.map((p, i) => (
                <li key={i}>
                  <Markdown cdnBase="https://cdn.soylai.com/content">{p}</Markdown>
                </li>
              ))}
            </ol>
          </details>
          <div className={s.hostileGrid} data-testid="hostile-svg">
            {SVG_XSS.map((p, i) => (
              <Visual key={i} visual={{ kind: 'svg', spec: p, alt: `Hostile SVG sample ${i + 1}` }} />
            ))}
          </div>
        </Section>
      </div>
    </PlatformRoot>
  );
}
