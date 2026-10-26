/**
 * The moderation policy the gateway applies (AC-13..AC-15; ADR-015). One place decides "blocked":
 *
 *   input   harm severities ≥ AI_MODERATION.blockAtSeverity → blocked (self-harm → supportive message)
 *           Prompt Shields on the student's text (policy.promptShields) → jailbreak
 *           Prompt Shields on documents (upload text, answers; policy.documentShields) → document_attack
 *           topic guard (policy.topicGuard, local rules, always on) → off_topic
 *   output  harm severities on each streamed chunk (policy.outputChunkChars) and on the whole answer
 *
 * Any provider failure propagates as ModerationUnavailableError: the caller refuses with 503 and
 * refunds (fail closed, F-027). The verdict carries categories and severities only — never the text.
 */
import { AI_MODERATION, type AiModerationPolicy } from '@soyl/shared/config/ai-actions';
import { isOffTopic } from './rules';
import type { HarmCategory, ModerationProvider, ModerationReason, ModerationVerdict } from './types';

const CATEGORIES: HarmCategory[] = ['hate', 'sexual', 'self_harm', 'violence'];

export class Moderator {
  constructor(readonly provider: ModerationProvider) {}

  private harmReasons(severities: Record<HarmCategory, number>): HarmCategory[] {
    return CATEGORIES.filter((c) => severities[c] >= AI_MODERATION.blockAtSeverity[c]);
  }

  /** The student's message (and any document text) before a model call. */
  async checkInput(text: string, policy: AiModerationPolicy, opts: { documents?: string[] } = {}): Promise<ModerationVerdict> {
    const documents = (opts.documents ?? []).filter((d) => d.trim());
    const analysed = await this.provider.analyzeText([text, ...documents].join('\n\n'));
    const reasons: ModerationReason[] = this.harmReasons(analysed.severities);
    if (policy.promptShields || (policy.documentShields && documents.length)) {
      const shield = await this.provider.shieldPrompt(policy.promptShields ? text : '', policy.documentShields ? documents : []);
      if (shield.userAttack) reasons.push('jailbreak');
      if (shield.documentAttack) reasons.push('document_attack');
    }
    if (policy.topicGuard && !reasons.length && isOffTopic(text)) reasons.push('off_topic');
    return {
      blocked: reasons.length > 0,
      reasons,
      severities: analysed.severities,
      selfHarm: analysed.severities.self_harm >= AI_MODERATION.blockAtSeverity.self_harm,
      provider: this.provider.name,
    };
  }

  /** A chunk of model output before it is shown (or a whole structured answer). */
  async checkOutput(text: string): Promise<ModerationVerdict> {
    if (!text.trim()) return { blocked: false, reasons: [], severities: {}, selfHarm: false, provider: this.provider.name };
    const analysed = await this.provider.analyzeText(text);
    const reasons = this.harmReasons(analysed.severities);
    return { blocked: reasons.length > 0, reasons, severities: analysed.severities, selfHarm: false, provider: this.provider.name };
  }

  /** The message shown instead of an answer for a blocked input. */
  static refusalFor(verdict: ModerationVerdict): { message: string; kind: 'self_harm' | 'off_topic' | 'unsafe' } {
    if (verdict.selfHarm) return { message: AI_MODERATION.selfHarmMessage, kind: 'self_harm' };
    if (verdict.reasons.length === 1 && verdict.reasons[0] === 'off_topic') return { message: AI_MODERATION.offTopicMessage, kind: 'off_topic' };
    return { message: AI_MODERATION.refusalMessage, kind: 'unsafe' };
  }
}
