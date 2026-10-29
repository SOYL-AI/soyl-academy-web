/**
 * The student's private player card (FIFA Ultimate Team inspired; GET /v1/me/card). Overall rating 40–99,
 * tier frame (bronze, silver, gold, elite), up to six attributes. Deterministic from the student's own
 * learning, earned only, never shown to anyone else (D-014, D-039): no packs, no randomness, no trading.
 * The name on the card is the auto-generated public name (D-039), never the real name, with the student's animal
 * avatar and a tier crest (design-system, 2026-10-29).
 */
import type { MyPlayerCard } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { LeagueCrest } from '@/components/platform/ui/art/LeagueCrest';
import { AnimalAvatar } from '@/components/platform/ui/kit/AnimalAvatar';
import s from './insights.module.css';

export const TIER_LABELS = { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', elite: 'Elite' } as const;

/** Initials of the public name for the crest ("Brave Otter 123" → "BO"). */
export function crestInitials(name: string): string {
  const words = name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
  return (words.slice(0, 2).map((w) => w[0]!.toUpperCase()).join('') || '?').slice(0, 2);
}

export function PlayerCard({ card, compact = false, className }: { card: MyPlayerCard; compact?: boolean; className?: string }) {
  const attrs = card.attributes;
  const label = `${TIER_LABELS[card.tier]} player card: overall ${card.overall}${card.provisional ? ' (provisional)' : ''}. ${attrs.map((a) => `${a.label} ${a.value}`).join(', ')}.`;
  return (
    <div className={cx(s.card, compact && s.cardCompact, className)} data-tier={card.tier} data-testid="player-card" role="img" aria-label={label}>
      <div className={s.cardInner} aria-hidden="true">
        <div className={s.cardTop}>
          <div className={s.cardRating}>
            <span className={s.cardOverall}>{card.overall}</span>
            <span className={s.cardTier}>
              <LeagueCrest tier={card.tier} size={compact ? 18 : 22} decorative className={s.cardTierCrest} />
              {TIER_LABELS[card.tier]}
            </span>
          </div>
          {card.avatar ? (
            <AnimalAvatar avatar={card.avatar} size={compact ? 46 : 64} decorative className={s.cardAvatar} />
          ) : (
            <span className={s.cardCrest}>{crestInitials(card.publicName)}</span>
          )}
        </div>
        <p className={s.cardName}>{card.publicName}</p>
        <p className={s.cardMeta}>
          Level {card.level} · {card.xp.toLocaleString('en-IN')} XP{card.provisional ? ' · Provisional' : ''}
        </p>
        {attrs.length > 0 && (
          <ul className={s.cardAttrs}>
            {attrs.map((a) => (
              <li key={a.key}>
                <b>{a.value}</b> {a.key}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Attribute rows with what each one measures (shown next to the card on /me). */
export function CardAttributes({ card }: { card: MyPlayerCard }) {
  if (card.attributes.length === 0) return null;
  return (
    <ul className={s.attrList}>
      {card.attributes.map((a) => (
        <li key={a.key}>
          <span className={s.attrHead}>
            <span>
              <b>{a.label}</b> <span className={s.attrKey}>{a.key}</span>
            </span>
            <span className={s.attrValue}>{a.value}</span>
          </span>
          <span className={s.attrTrack} aria-hidden="true">
            <span className={s.attrFill} style={{ width: `${Math.round(((a.value - 40) / 59) * 100)}%` }} />
          </span>
          <span className={s.attrExplain}>{a.explain}</span>
        </li>
      ))}
    </ul>
  );
}

/** A blank card frame for guests and before the first rating (no invented numbers). */
export function BlankPlayerCard({ title, compact = false }: { title: string; compact?: boolean }) {
  return (
    <div className={cx(s.card, s.cardBlank, compact && s.cardCompact)} data-tier="blank" data-testid="player-card-blank">
      <div className={s.cardInner}>
        <div className={s.cardTop} aria-hidden="true">
          <div className={s.cardRating}>
            <span className={s.cardOverall}>?</span>
            <span className={s.cardTier}>Unrated</span>
          </div>
          <span className={s.cardCrest}>?</span>
        </div>
        <p className={s.cardBlankText}>{title}</p>
      </div>
    </div>
  );
}
