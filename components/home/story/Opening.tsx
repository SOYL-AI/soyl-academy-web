import './opening.css';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { opening, prologue } from '@/content/story';
import { images } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
import { BrushArt } from '@/components/brush/BrushArt';
import { Dab, Marked, Note } from '@/components/brush/marks';
import { Kinetic } from '@/components/story/Kinetic';
import { Film } from '@/components/story/Film';
import { Scene } from '@/components/story/Scene';
import { OpeningMotion } from './OpeningMotion';

/**
 * The opening (ADR-034, amended 2026-11-14): the home page's front page, in 3D. Ira's Story is a cloth-bound book
 * lying on a desk among the things of a school night. As the reader scrolls, the book lifts towards them, the cover
 * swings open, three leaves turn (contents → before → after → the Thoughtprint) and the camera falls into the last
 * page, which is Chapter one: Tuesday night, the dark scene that follows.
 *
 * Pure CSS 3D on real DOM, moved by OpeningMotion from the scene's scroll progress (no WebGL, no library). The book is decorative
 * (aria-hidden); screen readers get the headline, the actions and a one-sentence summary. Under
 * prefers-reduced-motion the book sits still and each step shows the next spread.
 */
const PAPER = '#fffdf7';

const STAGES = [
  { name: 'Spark', ink: 'ochre' },
  { name: 'Build', ink: 'ultramarine' },
  { name: 'Defend', ink: 'vermilion' },
  { name: 'Fix', ink: 'sap' },
  { name: 'Reflect', ink: 'graphite' },
] as const;

function v(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

export function Opening() {
  const photo = images.lateNightStudy;
  const { before, after, chapterOne } = opening;

  return (
    <Scene id="prologue" chapter="Prologue" length={4.4} mobileLength={4} steps={6} className="opening" progress="event" aria-label="Prologue: Ira’s Story">
      <OpeningMotion />

      {/* The desk: a lamp-lit wash that paints itself. */}
      <div className="op-desk absolute inset-0" aria-hidden="true">
        <BrushArt
          art="wash"
          options={{
            blooms: [
              { x: 0.7, y: 0.42, r: 0.3, pigment: 'ochre', opacity: 55 },
              { x: 0.94, y: 0.9, r: 0.24, pigment: 'ultramarine', opacity: 40 },
              { x: 0.08, y: 0.86, r: 0.18, pigment: 'vermilion', opacity: 30 },
            ],
          }}
          seed="visit"
          eager
          stepMs={140}
          className="absolute inset-0"
        />
      </div>

      {/* The 3D world. */}
      <div className="op-world" aria-hidden="true">
        <div className="op-book-area">
          <div className="op-plane">
          {/* Things on the desk, at different depths. */}
          <div className="op-prop op-pencil" style={v({ '--x': -0.62, '--y': 0.78, '--r': '-32deg', '--z': '70px', '--d': 1.3, '--sx': '-34vw', '--sy': '18svh' })}>
            <Pencil />
          </div>
          <div className="op-prop op-sticky" style={v({ '--x': 0.74, '--y': -0.12, '--r': '7deg', '--z': '110px', '--d': 1.6, '--sx': '26vw', '--sy': '-20svh' })}>
            <span className="hand">{prologue.note}</span>
          </div>
          <div className="op-prop op-airplane" style={v({ '--x': 1.02, '--y': 0.5, '--r': '14deg', '--z': '160px', '--d': 2, '--sx': '40vw', '--sy': '-8svh' })}>
            <Plane />
          </div>
          <div className="op-prop op-chip" style={v({ '--x': 0.42, '--y': 1.04, '--r': '3deg', '--z': '90px', '--d': 1.4, '--sx': '16vw', '--sy': '24svh' })}>
            <Dab ink="vermilion" /> Mission · Science, Class 8
          </div>
          <span className="op-prop op-drop op-drop--s" style={v({ '--x': 1.16, '--y': 0.96, '--r': '0deg', '--z': '240px', '--d': 2.6, '--sx': '30vw', '--sy': '30svh', '--c': 'var(--color-ochre)' })} />

          <div className="op-float">
            <div className="op-book">
              {/* The block of pages and the binding. */}
              <span className="op-backboard" />
              <span className="op-edge op-edge--right" />
              <span className="op-edge op-edge--bottom" />
              <span className="op-edge op-edge--top" />
              <span className="op-spine" />

              {/* The last right-hand page: Chapter one. The camera falls into it. */}
              <div className="op-page op-page--night">
                <div className="op-face op-face--night">
                  <p className="hand op-k">{chapterOne.label}</p>
                  <p className="op-serif op-night-title">{chapterOne.title}</p>
                  <p className="hand op-night-time">{chapterOne.time}</p>
                  <span className="op-lamp" />
                </div>
              </div>

              {/* Leaf 3: after (front) · the Thoughtprint (back). */}
              <div className="op-leaf" data-leaf="f3" style={v({ '--i': 3 })}>
                <div className="op-face op-face--front">
                  <p className="hand op-k text-sap">{after.label}</p>
                  <p className="op-serif op-line">{after.line}</p>
                  <ol className="op-stages">
                    {STAGES.map((s) => (
                      <li key={s.name}>
                        <Dab ink={s.ink} /> {s.name}
                      </li>
                    ))}
                  </ol>
                  <p className="op-small">{after.rules}</p>
                  <span className="op-folio">iv</span>
                  <span className="op-shade" />
                </div>
                <div className="op-face op-face--back">
                  <div className="op-art">
                    <BrushArt art="thoughtprint" options={{ ridges: 13 }} seed={41} stepMs={30} bg={PAPER} className="absolute inset-0" />
                  </div>
                  <p className="op-serif op-caption">{opening.print}</p>
                  <span className="op-folio op-folio--l">v</span>
                  <span className="op-shade" />
                </div>
              </div>

              {/* Leaf 2: before (front) · the five-stage loop (back). */}
              <div className="op-leaf" data-leaf="f2" style={v({ '--i': 2 })}>
                <div className="op-face op-face--front">
                  <p className="hand op-k text-vermilion-ink">{before.label}</p>
                  <p className="op-serif op-line">{before.line}</p>
                  <div className="op-sheet">
                    <p className="op-sheet-meta">
                      <span>Question 13 of 20</span>
                      <span className="text-vermilion-ink">04:12 left</span>
                    </p>
                    <span className="op-rule" />
                    <span className="op-rule" />
                    <span className="op-rule op-rule--short" />
                    <span className="op-stamp">{before.score}</span>
                  </div>
                  <p className="op-small">
                    {before.question} <b>{before.answer}</b>
                  </p>
                  <span className="op-folio">ii</span>
                  <span className="op-shade" />
                </div>
                <div className="op-face op-face--back">
                  <div className="op-art op-art--loop">
                    <BrushArt art="loop" options={{ nodes: 5, pigments: ['ochre', 'ultramarine', 'vermilion', 'sap'] }} seed={14} stepMs={30} bg={PAPER} className="absolute inset-0" />
                  </div>
                  <p className="op-stage-row">
                    {STAGES.map((s, i) => (
                      <span key={s.name}>
                        {i > 0 && <span className="text-graphite"> → </span>}
                        {s.name}
                      </span>
                    ))}
                  </p>
                  <span className="op-folio op-folio--l">iii</span>
                  <span className="op-shade" />
                </div>
              </div>

              {/* Leaf 1: contents (front) · a photo from Tuesday night (back). */}
              <div className="op-leaf" data-leaf="f1" style={v({ '--i': 1 })}>
                <div className="op-face op-face--front">
                  <p className="op-k op-eyebrow">Contents</p>
                  <p className="op-serif op-title">Ira’s Story</p>
                  <ol className="op-toc">
                    {opening.contents.map((c, i) => (
                      <li key={c.title}>
                        <span className="op-toc-n">{i + 1}</span>
                        <span>{c.title}</span>
                        <span className="op-toc-dots" />
                        <span className="op-toc-p">{c.page}</span>
                      </li>
                    ))}
                  </ol>
                  <span className="op-folio">i</span>
                  <span className="op-shade" />
                </div>
                <div className="op-face op-face--back">
                  <div className="op-photo">
                    <span className="tape op-photo-tape" />
                    <div className="relative h-full w-full overflow-hidden bg-ink">
                      <Image src={photo.src} alt="" fill sizes="320px" className="object-cover" style={{ objectPosition: photo.focus }} />
                    </div>
                    <Note ink="graphite" tilt={-2} className="op-photo-note">
                      {opening.photoNote}
                    </Note>
                  </div>
                  <span className="op-shade" />
                </div>
              </div>

              {/* The cover: front · the inside board with the bookplate. */}
              <div className="op-leaf op-leaf--cover" data-leaf="open" style={v({ '--i': 0 })}>
                <div className="op-face op-face--cover">
                  <span className="op-cover-spine" />
                  <p className="op-cover-kicker">{opening.cover.kicker}</p>
                  <div className="op-cover-label">
                    <BrushArt art="thoughtprint" options={{ ridges: 15 }} seed={7} stepMs={40} eager bg="#fbf7ee" className="absolute inset-0" />
                  </div>
                  <p className="op-cover-title">
                    Story of
                    <br />
                    Your Life
                  </p>
                  <p className="hand op-cover-owner">{opening.cover.owner}</p>
                  <span className="op-shade" />
                </div>
                <div className="op-face op-face--endpaper">
                  <div className="op-bookplate">
                    <p className="op-small">{opening.bookplate.label}</p>
                    <p className="hand op-bookplate-name">{opening.bookplate.name}</p>
                    <p className="op-small">{opening.bookplate.note}</p>
                  </div>
                  <span className="op-shade" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* The night the camera falls into: the same dark as Chapter one, so the cut is seamless. */}
      <div className="op-night" aria-hidden="true" />

      {/* The words. */}
      <div className="op-copy-wrap">
        <div className="page op-copy-page">
          <div className="op-copy">
            <p className="rise mb-5 flex items-center gap-2.5 md:mb-7">
              <Dab ink="vermilion" />
              <span className="hand text-[1.3rem] leading-none text-vermilion-ink">{prologue.eyebrow}</span>
            </p>
            <h1 className="t-display max-w-[15ch] text-[clamp(2.35rem,5.6vw,5.4rem)]">
              <Kinetic as="span" load text={prologue.lines[0]} className="block" />
              <span className="mt-1 block text-graphite">
                <Kinetic as="span" load delay={330} text="Homework only kept the" />{' '}
                <span className="kinetic-load inline-block" style={v({ '--kd': '620ms' })}>
                  <span className="kw" style={v({ '--wi': 0 })}>
                    <Marked mark="ring" ink="vermilion" load delay={1500}>
                      score.
                    </Marked>
                  </span>
                </span>
              </span>
            </h1>
            {/* Static on purpose: on phones this paragraph can be the LCP element. */}
            <p className="t-lead op-support mt-5 max-w-[40ch] text-graphite md:mt-8">{prologue.support}</p>
            <div className="rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-9" style={v({ '--d': '700ms' })}>
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                {PRIMARY_CTA.label}
              </ButtonLink>
              <Film />
            </div>
            <p className="mt-5 text-[13px] text-graphite md:mt-7">{prologue.disclaimer}</p>
          </div>
        </div>
      </div>

      <p className="sr-only">{opening.summary}</p>
      <p className="op-cue hand" aria-hidden="true">
        {opening.cue}
        <span className="op-cue-arrow">↓</span>
      </p>
    </Scene>
  );
}

function Pencil() {
  return (
    <svg viewBox="0 0 240 28" width="100%" height="100%" focusable="false">
      <rect x="34" y="3" width="176" height="22" rx="2" fill="#e2b13c" />
      <rect x="34" y="3" width="176" height="7" fill="#efc65a" />
      <rect x="34" y="18" width="176" height="7" fill="#c99a2a" />
      <rect x="200" y="2" width="16" height="24" fill="#b9b4aa" />
      <rect x="216" y="3" width="20" height="22" rx="5" fill="#e98a7a" />
      <path d="M34 3 L4 14 L34 25 Z" fill="#f1d6aa" />
      <path d="M14 10.4 L4 14 L14 17.6 Z" fill="#3a3631" />
    </svg>
  );
}

function Plane() {
  return (
    <svg viewBox="0 0 120 80" width="100%" height="100%" focusable="false">
      <path d="M4 40 L116 6 L70 76 L56 50 Z" fill="#fffdf7" stroke="#cfc6b4" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M56 50 L116 6 L44 46 Z" fill="#ede5d4" stroke="#cfc6b4" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M56 50 L62 70" stroke="#cfc6b4" strokeWidth="1.5" />
    </svg>
  );
}
