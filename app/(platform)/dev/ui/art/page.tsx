/**
 * Dev-only art sheet (design-system, 2026-10-29): every original drawing on one page for review and the owner
 * screenshots (docs/platform/design/avatars-assets/): the 64 avatars at 96/32/24 px on all eight backgrounds,
 * badge medals (earned and locked), league crests, subject glyph tiles and empty-state illustrations. Same gate as
 * the gallery: 404 in production builds and with the platform flag off.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AVATARS, AVATAR_BACKGROUNDS } from '@/platform/shared/config/avatars';
import { BADGES } from '@/platform/shared/config/gamification';
import { readFlags } from '@/platform/shared/config/flags';
import { BadgeMedal } from '@/components/platform/ui/art/Art';
import { InlineAvatar } from '@/components/platform/ui/art/AvatarArt';
import { CREST_TIERS } from '@/components/platform/ui/art/crest-art';
import { EMPTY_ART_KINDS } from '@/components/platform/ui/art/empty-art';
import { EmptyIllustration } from '@/components/platform/ui/art/EmptyIllustration';
import { CREST_NAMES, LeagueCrest } from '@/components/platform/ui/art/LeagueCrest';
import { SUBJECT_ART_KINDS } from '@/components/platform/ui/art/subject-art';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import c from '@/components/platform/learn/course.module.css';
import s from './art.module.css';

export const metadata: Metadata = { title: 'Platform art sheet (dev)', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const HUES = ['blue', 'green', 'violet', 'teal', 'green', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'red', 'red', 'yellow', 'violet', 'blue'];

export default function ArtSheet() {
  if (process.env.NODE_ENV === 'production' || !readFlags().platformEnabled) notFound();
  const bgs = AVATAR_BACKGROUNDS.map((b) => b.id);
  return (
    <div className={s.sheet} data-testid="art-sheet">
      <h1 className={s.h1}>SOYL Academy original artwork</h1>
      <section id="avatars" aria-labelledby="av-title" data-testid="sheet-avatars">
        <h2 id="av-title">Student avatars (64)</h2>
        <ul className={s.avatars}>
          {AVATARS.map((a, i) => (
            <li key={a.id}>
              <InlineAvatar id={a.id} bg={bgs[i % bgs.length]!} size={96} decorative={false} />
              <span className={s.small}>
                <InlineAvatar id={a.id} bg={bgs[(i + 3) % bgs.length]!} size={32} />
                <InlineAvatar id={a.id} bg={bgs[(i + 5) % bgs.length]!} size={24} />
              </span>
              <span className={s.name}>{a.animal}</span>
            </li>
          ))}
        </ul>
      </section>
      <section id="backgrounds" aria-labelledby="bg-title">
        <h2 id="bg-title">Background themes</h2>
        <ul className={s.row}>
          {AVATAR_BACKGROUNDS.map((b) => (
            <li key={b.id}>
              <InlineAvatar id="otter" bg={b.id} size={64} />
              <span className={s.name}>{b.label}</span>
            </li>
          ))}
        </ul>
      </section>
      <section id="badges" aria-labelledby="badge-title" data-testid="sheet-badges">
        <h2 id="badge-title">Badges (earned and locked)</h2>
        <ul className={s.row}>
          {BADGES.map((b) => (
            <li key={b.key}>
              <span className={s.pair}>
                <BadgeMedal badge={b.key} size={72} />
                <BadgeMedal badge={b.key} size={72} locked />
              </span>
              <span className={s.name}>{b.name}</span>
            </li>
          ))}
        </ul>
      </section>
      <section id="crests" aria-labelledby="crest-title" data-testid="sheet-crests">
        <h2 id="crest-title">League crests</h2>
        <ul className={s.row}>
          {CREST_TIERS.map((t) => (
            <li key={t}>
              <LeagueCrest tier={t} size={88} />
              <span className={s.name}>{CREST_NAMES[t]}</span>
            </li>
          ))}
        </ul>
      </section>
      <section id="subjects" aria-labelledby="subject-title" data-testid="sheet-subjects">
        <h2 id="subject-title">Subject tiles</h2>
        <ul className={s.row}>
          {SUBJECT_ART_KINDS.map((k, i) => (
            <li key={k}>
              <span className={c.tile} data-hue={HUES[i]} style={{ width: 64, height: 64 }}>
                <SubjectGlyph kind={k} size={40} />
              </span>
              <span className={s.name}>{k}</span>
            </li>
          ))}
        </ul>
      </section>
      <section id="empty" aria-labelledby="empty-title" data-testid="sheet-empty">
        <h2 id="empty-title">Empty states</h2>
        <ul className={s.row}>
          {EMPTY_ART_KINDS.map((k) => (
            <li key={k}>
              <EmptyIllustration kind={k} width={168} />
              <span className={s.name}>{k}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
