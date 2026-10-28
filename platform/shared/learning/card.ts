/**
 * The private player card (FIFA-Ultimate-Team-inspired; pure, no I/O). Deterministic and explainable:
 * the same evidence always gives the same card, every attribute says how it was computed, and nothing
 * is random, bought or traded (children's product). Numbers: ../config/learning.ts (PLAYER_CARD).
 */
import { CARD_ATTRIBUTES, PLAYER_CARD, type CardAttributeKey, type CardTier } from '../config/learning';

export type { CardAttributeKey, CardTier };
export { CARD_ATTRIBUTES };

export interface CardEvidence {
  /** Practice questions with a first auto-checked answer, and how many of those were right. */
  firstTryChecked: number;
  firstTryCorrect: number;
  /** IST days with learning activity in the last PLAYER_CARD.attributes.CON.windowDays days (today included). */
  activeDaysInWindow: number;
  /** Test questions answered fully right with a recorded time: their expected and spent seconds. Null = no data. */
  speed: { items: number; expectedSec: number; spentSec: number } | null;
  /** Chapters with a lesson started or a practice answer. */
  chaptersTouched: number;
  /** Mastery score (0–100) of every touched chapter. */
  masteryScores: readonly number[];
  /** Distinct tests with a graded attempt, and the mean percentage of each test's latest graded attempt. */
  testsTaken: number;
  testsMeanPct: number | null;
}

export interface CardAttribute {
  key: CardAttributeKey;
  label: string;
  /** PLAYER_CARD.floor–ceiling. */
  value: number;
  /** The 0–1 input behind the value (3 decimals). */
  raw: number;
  weight: number;
  /** One plain-English line: how this number was worked out. */
  explain: string;
}

export interface PlayerCard {
  overall: number;
  tier: CardTier;
  /** Too little evidence yet for the rating to mean much. */
  provisional: boolean;
  formulaVersion: number;
  /** SPD is left out when there is no timing data (the other weights scale up). */
  attributes: CardAttribute[];
}

const A = PLAYER_CARD.attributes;
const clamp01 = (x: number) => (Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0);
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const pct = (x: number) => `${Math.round(x * 100)}%`;
const nonNeg = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** raw 0–1 → floor–ceiling (rounded). */
export const ratingFor = (raw: number) => Math.round(PLAYER_CARD.floor + (PLAYER_CARD.ceiling - PLAYER_CARD.floor) * clamp01(raw));

export function tierFor(overall: number): CardTier {
  return (PLAYER_CARD.tiers.find((t) => overall >= t.min) ?? PLAYER_CARD.tiers[PLAYER_CARD.tiers.length - 1]!).tier;
}

function attribute(key: CardAttributeKey, raw: number, explain: string): CardAttribute {
  const r = r3(clamp01(raw));
  return { key, label: A[key].label, value: ratingFor(r), raw: r, weight: A[key].weight, explain };
}

export function playerCard(ev: CardEvidence): PlayerCard {
  const checked = Math.floor(nonNeg(ev.firstTryChecked));
  const right = Math.min(Math.floor(nonNeg(ev.firstTryCorrect)), checked);
  const active = Math.floor(nonNeg(ev.activeDaysInWindow));
  const touched = Math.floor(nonNeg(ev.chaptersTouched));
  const tests = Math.floor(nonNeg(ev.testsTaken));
  const attrs: CardAttribute[] = [];

  const acc = checked ? right / checked : 0;
  const accConf = clamp01(checked / A.ACC.fullConfidenceAt);
  attrs.push(
    attribute(
      'ACC',
      acc * accConf,
      checked
        ? `${pct(acc)} right first time on ${plural(checked, 'question')}${accConf < 1 ? ` (counts fully from ${A.ACC.fullConfidenceAt})` : ''}`
        : 'No practice answers checked yet',
    ),
  );

  attrs.push(attribute('CON', active / A.CON.targetActiveDays, `Learned on ${plural(Math.min(active, A.CON.windowDays), 'day')} of the last ${A.CON.windowDays} (full at ${A.CON.targetActiveDays})`));

  const sp = ev.speed;
  if (sp && sp.items >= A.SPD.minItems && sp.spentSec > 0 && sp.expectedSec > 0) {
    const ratio = sp.expectedSec / sp.spentSec;
    const raw = (Math.min(ratio, A.SPD.fastRatio) - A.SPD.slowRatio) / (A.SPD.fastRatio - A.SPD.slowRatio);
    attrs.push(attribute('SPD', raw, `On ${plural(sp.items, 'test question')} you got right, you took ${pct(sp.spentSec / sp.expectedSec)} of the expected time`));
  }

  attrs.push(attribute('BRE', touched / A.BRE.targetChapters, `${plural(touched, 'chapter')} explored (full at ${A.BRE.targetChapters})`));

  const masSum = ev.masteryScores.reduce((s, x) => s + Math.min(100, nonNeg(x)), 0);
  const masDen = Math.max(ev.masteryScores.length, A.MAS.minChapters);
  attrs.push(
    attribute(
      'MAS',
      masSum / masDen / 100,
      ev.masteryScores.length
        ? `Average chapter mastery ${Math.round(masSum / masDen)} / 100 over ${plural(masDen, 'chapter')}${ev.masteryScores.length < A.MAS.minChapters ? ` (at least ${A.MAS.minChapters} count)` : ''}`
        : 'No chapters started yet',
    ),
  );

  const meanPct = ev.testsMeanPct === null ? 0 : Math.min(100, nonNeg(ev.testsMeanPct));
  const tstConf = clamp01(tests / A.TST.fullConfidenceAt);
  attrs.push(
    attribute(
      'TST',
      tests ? (meanPct / 100) * tstConf : 0,
      tests ? `Average ${Math.round(meanPct)}% over ${plural(tests, 'test')}${tstConf < 1 ? ` (counts fully from ${A.TST.fullConfidenceAt})` : ''}` : 'No tests taken yet',
    ),
  );

  // Fixed display order regardless of which attributes are present.
  attrs.sort((a, b) => CARD_ATTRIBUTES.indexOf(a.key) - CARD_ATTRIBUTES.indexOf(b.key));
  const weights = attrs.reduce((s, a) => s + a.weight, 0);
  const overallRaw = attrs.reduce((s, a) => s + a.weight * a.value, 0) / weights;
  const overall = Math.min(PLAYER_CARD.ceiling, Math.max(PLAYER_CARD.floor, Math.round(overallRaw)));
  return {
    overall,
    tier: tierFor(overall),
    provisional: checked < PLAYER_CARD.provisional.minCheckedQuestions || active < PLAYER_CARD.provisional.minActiveDays,
    formulaVersion: PLAYER_CARD.formulaVersion,
    attributes: attrs,
  };
}
