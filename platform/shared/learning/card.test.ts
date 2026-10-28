import { describe, expect, it } from 'vitest';
import { CARD_ATTRIBUTES, CARD_TIERS, PLAYER_CARD } from '../config/learning';
import { playerCard, ratingFor, tierFor, type CardEvidence } from './card';

const none: CardEvidence = { firstTryChecked: 0, firstTryCorrect: 0, activeDaysInWindow: 0, speed: null, chaptersTouched: 0, masteryScores: [], testsTaken: 0, testsMeanPct: null };
const star: CardEvidence = {
  firstTryChecked: 120,
  firstTryCorrect: 114,
  activeDaysInWindow: 26,
  speed: { items: 60, expectedSec: 3600, spentSec: 3000 },
  chaptersTouched: 24,
  masteryScores: Array.from({ length: 24 }, () => 95),
  testsTaken: 8,
  testsMeanPct: 96,
};

describe('playerCard', () => {
  it('a brand-new student gets the floor rating, bronze, provisional, without SPD', () => {
    const c = playerCard(none);
    expect(c).toMatchObject({ overall: PLAYER_CARD.floor, tier: 'bronze', provisional: true, formulaVersion: PLAYER_CARD.formulaVersion });
    expect(c.attributes.map((a) => a.key)).toEqual(['ACC', 'CON', 'BRE', 'MAS', 'TST']);
    for (const a of c.attributes) expect(a).toMatchObject({ value: PLAYER_CARD.floor, raw: 0 });
    expect(c.attributes.find((a) => a.key === 'ACC')!.explain).toBe('No practice answers checked yet');
  });

  it('a strong, regular student reaches elite with every attribute in 40–99', () => {
    const c = playerCard(star);
    expect(c.tier).toBe('elite');
    expect(c.provisional).toBe(false);
    expect(c.attributes.map((a) => a.key)).toEqual([...CARD_ATTRIBUTES]);
    for (const a of c.attributes) {
      expect(a.value).toBeGreaterThanOrEqual(PLAYER_CARD.floor);
      expect(a.value).toBeLessThanOrEqual(PLAYER_CARD.ceiling);
    }
    expect(c.overall).toBeLessThanOrEqual(PLAYER_CARD.ceiling);
  });

  it('is deterministic: same evidence, same card', () => {
    expect(playerCard(star)).toEqual(playerCard({ ...star, masteryScores: [...star.masteryScores] }));
  });

  it('overall is the weighted mean of the attribute values (SPD weight redistributed when absent)', () => {
    const ev = { ...star, speed: null };
    const c = playerCard(ev);
    const w = c.attributes.reduce((s, a) => s + a.weight, 0);
    expect(w).toBeCloseTo(1 - PLAYER_CARD.attributes.SPD.weight, 6);
    expect(c.overall).toBe(Math.round(c.attributes.reduce((s, a) => s + a.weight * a.value, 0) / w));
  });

  it('accuracy needs volume: 5/5 is not a 99', () => {
    const c = playerCard({ ...none, firstTryChecked: 5, firstTryCorrect: 5 });
    const acc = c.attributes.find((a) => a.key === 'ACC')!;
    expect(acc.raw).toBeCloseTo(5 / PLAYER_CARD.attributes.ACC.fullConfidenceAt, 3);
    expect(acc.value).toBeLessThan(60);
    expect(acc.explain).toContain('100% right first time on 5 questions');
  });

  it('speed: omitted below the minimum, rushing is not rewarded past fastRatio, slow rates low', () => {
    const at = (items: number, expectedSec: number, spentSec: number) => playerCard({ ...none, speed: { items, expectedSec, spentSec } }).attributes.find((a) => a.key === 'SPD');
    expect(at(PLAYER_CARD.attributes.SPD.minItems - 1, 600, 600)).toBeUndefined();
    expect(at(20, 600, 0)).toBeUndefined();
    const rushed = at(20, 1200, 100)!;
    const brisk = at(20, 1250, 1000)!;
    expect(rushed.value).toBe(PLAYER_CARD.ceiling);
    expect(brisk.value).toBe(rushed.value);
    expect(at(20, 600, 600)!.value).toBeLessThan(PLAYER_CARD.ceiling);
    expect(at(20, 100, 1000)!.value).toBe(PLAYER_CARD.floor);
  });

  it('mastery averages over at least minChapters chapters', () => {
    const one = playerCard({ ...none, chaptersTouched: 1, masteryScores: [100] }).attributes.find((a) => a.key === 'MAS')!;
    expect(one.raw).toBeCloseTo(1 / PLAYER_CARD.attributes.MAS.minChapters, 3);
  });

  it('tests count fully only from fullConfidenceAt tests', () => {
    const one = playerCard({ ...none, testsTaken: 1, testsMeanPct: 90 }).attributes.find((a) => a.key === 'TST')!;
    expect(one.raw).toBeCloseTo(0.9 / PLAYER_CARD.attributes.TST.fullConfidenceAt, 3);
    const many = playerCard({ ...none, testsTaken: 5, testsMeanPct: 90 }).attributes.find((a) => a.key === 'TST')!;
    expect(many.raw).toBeCloseTo(0.9, 3);
  });

  it('consistency counts active days (never the streak) and caps at the target', () => {
    const c = playerCard({ ...none, activeDaysInWindow: 40 }).attributes.find((a) => a.key === 'CON')!;
    expect(c.value).toBe(PLAYER_CARD.ceiling);
    expect(c.explain).toContain(`of the last ${PLAYER_CARD.attributes.CON.windowDays}`);
  });

  it('defends against bad input (negative, NaN, correct > checked)', () => {
    const c = playerCard({ ...none, firstTryChecked: 3, firstTryCorrect: 10, activeDaysInWindow: -2, chaptersTouched: Number.NaN, masteryScores: [-5, 250], testsTaken: -1, testsMeanPct: 400 });
    for (const a of c.attributes) {
      expect(a.raw).toBeGreaterThanOrEqual(0);
      expect(a.raw).toBeLessThanOrEqual(1);
    }
    expect(c.attributes.find((a) => a.key === 'ACC')!.explain).toContain('100%');
  });
});

describe('tiers and ratings config', () => {
  it('tiers cover the whole 40–99 range, highest first', () => {
    expect(tierFor(PLAYER_CARD.floor)).toBe('bronze');
    expect(tierFor(PLAYER_CARD.ceiling)).toBe('elite');
    const mins = PLAYER_CARD.tiers.map((t) => t.min);
    expect([...mins].sort((a, b) => b - a)).toEqual(mins);
    expect(PLAYER_CARD.tiers.map((t) => t.tier).sort()).toEqual([...CARD_TIERS].sort());
    expect(tierFor(74)).toBe('silver');
    expect(tierFor(75)).toBe('gold');
  });

  it('ratingFor maps 0–1 onto floor–ceiling and clamps', () => {
    expect(ratingFor(0)).toBe(PLAYER_CARD.floor);
    expect(ratingFor(1)).toBe(PLAYER_CARD.ceiling);
    expect(ratingFor(2)).toBe(PLAYER_CARD.ceiling);
    expect(ratingFor(-1)).toBe(PLAYER_CARD.floor);
  });

  it('attribute weights sum to 1', () => {
    const sum = Object.values(PLAYER_CARD.attributes).reduce((s, a) => s + a.weight, 0);
    expect(sum).toBeCloseTo(1, 6);
  });
});
