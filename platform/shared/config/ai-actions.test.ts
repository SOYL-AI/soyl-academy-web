import { describe, expect, it } from 'vitest';
import { AI_ACTIONS, AI_ACTION_IDS, AI_MODERATION, AI_UPLOADS, isAiActionId, quoteCredits } from './ai-actions';
import { AI_GATEWAY, AI_SPEND, CREDIT_VALUE_PAISE, RESERVATION_TTL_SECONDS } from './credits';
import { MODELS } from './models';
import { PLANS } from './plans';

describe('AI action registry (CONTEXT §6)', () => {
  it('prices every action as CONTEXT §6 says', () => {
    expect(Object.fromEntries(AI_ACTION_IDS.map((id) => [id, quoteCredits(AI_ACTIONS[id], 100)]))).toEqual({
      'quick-doubt': 1,
      'explain-slide': 1,
      'hard-doubt': 6,
      'photo-doubt': 10,
      'evaluate-answer': 6,
      'evaluate-paper': 40,
      'paper-from-upload': 60,
    });
    expect(AI_ACTIONS['quick-doubt'].tier).toBe('small');
    expect(AI_ACTIONS['hard-doubt'].tier).toBe('mid');
    expect(AI_ACTIONS['photo-doubt'].vision).toBe(true);
    expect(AI_ACTIONS['paper-from-upload'].plans).toEqual(['plus', 'pro', 'board_exam_pass']);
  });

  it('is internally consistent', () => {
    const planIds = PLANS.map((p) => p.id);
    for (const id of AI_ACTION_IDS) {
      const a = AI_ACTIONS[id];
      expect(a.id).toBe(id);
      expect(isAiActionId(id)).toBe(true);
      expect(a.plans.every((p) => planIds.includes(p))).toBe(true);
      expect(a.maxOutputTokens).toBeLessThanOrEqual(MODELS[a.tier].max_output_tokens);
      // Sold at or above the CONTEXT §6 estimated cost — except paper-from-upload (₹6.10 for 60 credits = ₹6.00),
      // flagged to the owner in the handoff; the 7-day guardrail will alert on it with real costs.
      if (id !== 'paper-from-upload') expect(a.estCostPaise).toBeLessThanOrEqual(quoteCredits(a) * CREDIT_VALUE_PAISE);
      expect(a.moderation.input).toBe('strict');
      expect(a.reservationTtlSeconds).toBeGreaterThan(AI_GATEWAY.maxStreamSeconds); // AC-08
      if (a.vision) expect(a.uploadKinds.length).toBeGreaterThan(0);
      if (a.mode === 'stream') expect(a.reservationTtlSeconds).toBe(RESERVATION_TTL_SECONDS);
    }
    expect(isAiActionId('teleport')).toBe(false);
    expect(AI_SPEND.freeTierShare).toBe(0.6); // D-015
    expect(AI_SPEND.dailyCapInrDefault).toBe(2_000);
    expect(AI_MODERATION.blockAtSeverity.sexual).toBeLessThanOrEqual(2); // AC-15: minors, block at low
    expect(AI_MODERATION.selfHarmMessage).toMatch(/14416/);
    expect(AI_UPLOADS.contentTypes).not.toContain('image/svg+xml');
    expect(AI_UPLOADS.sasTtlSeconds).toBeLessThanOrEqual(300);
  });

  it('flags two paper-from-upload pricing issues for the owner (handoff): unaffordable on Plus, priced below cost', () => {
    const plus = PLANS.find((p) => p.id === 'plus')!;
    expect(AI_ACTIONS['paper-from-upload'].plans).toContain('plus');
    expect(quoteCredits(AI_ACTIONS['paper-from-upload'])).toBeGreaterThan(plus.creditsPerDay);
    expect(AI_ACTIONS['paper-from-upload'].estCostPaise).toBeGreaterThan(quoteCredits(AI_ACTIONS['paper-from-upload']) * CREDIT_VALUE_PAISE);
  });
});
