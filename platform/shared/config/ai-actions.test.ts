import { describe, expect, it } from 'vitest';
import { AI_ACTIONS, AI_ACTION_IDS, AI_MODERATION, AI_UPLOADS, actionAllowedOnPlan, isAiActionId, minCredits, quoteCredits } from './ai-actions';
import { AI_GATEWAY, AI_SPEND, CREDIT_VALUE_PAISE, RESERVATION_TTL_SECONDS } from './credits';
import { MODELS } from './models';
import { PLANS, getPlan, plansWithFeature } from './plans';

describe('AI action registry (CONTEXT §6, D-044)', () => {
  it('prices every action as CONTEXT §6 says (repriced to measured cost, D-044)', () => {
    expect(Object.fromEntries(AI_ACTION_IDS.map((id) => [id, quoteCredits(AI_ACTIONS[id], 100)]))).toEqual({
      'quick-doubt': 1,
      'explain-slide': 1,
      'hard-doubt': 7,
      'photo-doubt': 12,
      'evaluate-answer': 7,
      'evaluate-paper': 50,
      'paper-from-upload': 80,
    });
    expect(quoteCredits(AI_ACTIONS['evaluate-paper'], 3)).toBe(21); // 7 per answer
    expect(quoteCredits(AI_ACTIONS['evaluate-paper'], 8)).toBe(50); // capped
    expect(AI_ACTIONS['quick-doubt'].tier).toBe('small');
    expect(AI_ACTIONS['hard-doubt'].tier).toBe('mid');
    expect(AI_ACTIONS['photo-doubt'].vision).toBe(true);
    expect(AI_ACTIONS['paper-from-upload'].plans).toEqual(['pro', 'board_exam_pass']); // D-034
    expect(AI_ACTIONS['paper-from-upload'].requiredFeature).toBe('paper_from_upload');
  });

  it('is internally consistent', () => {
    const planIds = PLANS.map((p) => p.id);
    for (const id of AI_ACTION_IDS) {
      const a = AI_ACTIONS[id];
      expect(a.id).toBe(id);
      expect(isAiActionId(id)).toBe(true);
      expect(a.plans.every((p) => planIds.includes(p))).toBe(true);
      expect(a.maxOutputTokens).toBeLessThanOrEqual(MODELS[a.tier].max_output_tokens);
      // D-044: sold at or above the measured cost (D-040), paper-from-upload included now — except AI marking
      // (₹0.72 per answer for 7 credits = ₹0.70; CONTEXT §6), flagged to the owner below and in the handoff.
      if (a.template !== 'evaluate-answer') expect(a.estCostPaise, id).toBeLessThanOrEqual(minCredits(a) * CREDIT_VALUE_PAISE);
      expect(a.guide.length, id).toBeGreaterThan(10);
      expect(a.moderation.input).toBe('strict');
      expect(a.reservationTtlSeconds).toBeGreaterThan(AI_GATEWAY.maxStreamSeconds); // AC-08
      if (a.vision) expect(a.uploadKinds.length).toBeGreaterThan(0);
      if (a.mode === 'stream') expect(a.reservationTtlSeconds).toBe(RESERVATION_TTL_SECONDS);
    }
    expect(isAiActionId('teleport')).toBe(false);
    expect(AI_SPEND.freeTierShare).toBe(0.6); // D-015
    expect(AI_SPEND.dailyCapInrDefault).toBe(3_000); // D-044
    expect(AI_MODERATION.blockAtSeverity.sexual).toBeLessThanOrEqual(2); // AC-15: minors, block at low
    expect(AI_MODERATION.selfHarmMessage).toMatch(/14416/);
    expect(AI_UPLOADS.contentTypes).not.toContain('image/svg+xml');
    // S6-M01 / ADR-020: images only until PDFs are parsed and rasterised in the worker.
    expect(AI_UPLOADS.contentTypes).toEqual(['image/jpeg', 'image/png', 'image/webp']);
    expect(AI_UPLOADS.sasTtlSeconds).toBeLessThanOrEqual(300);
  });

  it('offers every action only on plans whose daily credits can pay for its smallest purchase (D-034)', () => {
    for (const id of AI_ACTION_IDS) {
      const a = AI_ACTIONS[id];
      for (const planId of a.plans) {
        const plan = PLANS.find((p) => p.id === planId)!;
        // Per-answer evaluation can be bought one answer at a time, so the smallest purchase is what matters.
        expect(quoteCredits(a), `${id} on ${planId}`).toBeLessThanOrEqual(plan.creditsPerDay);
      }
    }
  });

  it('flags that AI marking is priced slightly below measured cost (owner, handoff); paper-from-upload no longer is', () => {
    for (const id of ['evaluate-answer', 'evaluate-paper'] as const) {
      expect(AI_ACTIONS[id].estCostPaise).toBe(72);
      expect(AI_ACTIONS[id].estCostPaise).toBeGreaterThan(minCredits(AI_ACTIONS[id]) * CREDIT_VALUE_PAISE);
    }
    expect(AI_ACTIONS['paper-from-upload'].estCostPaise).toBeLessThanOrEqual(quoteCredits(AI_ACTIONS['paper-from-upload']) * CREDIT_VALUE_PAISE);
  });

  it('gates paper-from-upload by plan feature, not by credits: Plus could afford it since D-044 but does not get it (D-034)', () => {
    const paper = AI_ACTIONS['paper-from-upload'];
    // Plus has enough credits now, so a credit comparison alone would wrongly open it to Plus.
    expect(getPlan('plus').creditsPerDay).toBeGreaterThanOrEqual(quoteCredits(paper));
    expect(getPlan('plus').features).not.toContain('paper_from_upload');
    expect(actionAllowedOnPlan(paper, getPlan('plus'))).toBe(false);
    expect(actionAllowedOnPlan(paper, getPlan('free'))).toBe(false);
    expect(actionAllowedOnPlan(paper, getPlan('pro'))).toBe(true);
    expect(actionAllowedOnPlan(paper, getPlan('board_exam_pass'))).toBe(true);
    // A plan listed on the action but lacking the feature is still refused.
    expect(actionAllowedOnPlan(paper, { id: 'pro', features: ['ai_credits'] })).toBe(false);
    for (const id of AI_ACTION_IDS) {
      const a = AI_ACTIONS[id];
      if (a.requiredFeature) expect([...a.plans], id).toEqual(plansWithFeature(a.requiredFeature));
      for (const p of PLANS) expect(actionAllowedOnPlan(a, p), `${id} on ${p.id}`).toBe(a.plans.includes(p.id));
    }
  });
});
