import { describe, expect, it } from 'vitest';
import { CONSENT_REQUIRED, consentAllows, consentGatedFeatures, consentRequiredFor, type ConsentRequirements } from './consent';
import { CONSENT, CONSENT_FEATURES, CONSENT_STATES } from './security';

describe('CONSENT_REQUIRED (D-052, ADR-030)', () => {
  it('covers every consent feature', () => {
    expect(Object.keys(CONSENT_REQUIRED).sort()).toEqual([...CONSENT_FEATURES].sort());
  });

  it('gates only buying and physical-reward redemption', () => {
    expect(consentGatedFeatures()).toEqual(['purchases', 'physical_rewards']);
    expect(CONSENT.gatedFeatures).toEqual(consentGatedFeatures());
  });

  it('opens AI, uploads, leaderboards, ranks, school/city, notifications, merge and tests', () => {
    for (const f of ['ai', 'uploads', 'leaderboards', 'rank_cards', 'profile_school_city', 'notifications', 'merge_guest', 'test_attempts'] as const) {
      expect(consentRequiredFor(f)).toBe(false);
      for (const s of [...CONSENT_STATES, null, undefined]) expect(consentAllows(s, f)).toBe(true);
    }
  });

  it('purchases need granted', () => {
    expect(consentRequiredFor('purchases')).toBe(true);
    expect(consentAllows('granted', 'purchases')).toBe(true);
    for (const s of ['required', 'pending', 'revoked', null, undefined] as const) expect(consentAllows(s, 'purchases')).toBe(false);
  });

  it('flipping one value re-gates a feature', () => {
    const regated: ConsentRequirements = { ...CONSENT_REQUIRED, leaderboards: true };
    expect(consentRequiredFor('leaderboards', regated)).toBe(true);
    expect(consentAllows('pending', 'leaderboards', regated)).toBe(false);
    expect(consentAllows('granted', 'leaderboards', regated)).toBe(true);
    expect(consentGatedFeatures(regated)).toContain('leaderboards');
  });
});
