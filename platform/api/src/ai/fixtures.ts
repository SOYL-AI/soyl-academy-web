/**
 * Deterministic mock-provider answers for the gateway's templates (local development, tests, CI).
 * Everything here is visibly placeholder text ("[MOCK]") and never presented as real content. The
 * fixtures follow the request's directives (mode, language, schema) so the gateway's behaviour —
 * hint first, language matching, structured outputs, clamping — can be tested end to end offline.
 */
import { MockProvider, MockText, type ModelProvider } from '@soyl/ai-core';
import type { ReplyLanguage, TutorMode } from './prompts';

export const FIXTURE = {
  chat: 'gateway.chat',
  evaluate: 'gateway.evaluate',
  blueprint: 'gateway.blueprint',
} as const;

export interface ChatFixtureInput {
  template: string;
  mode: TutorMode;
  language: ReplyLanguage;
  contextTitles: string[];
  hasImage: boolean;
}

export interface EvaluateFixtureInput {
  steps: { index: number; max: number }[];
  answerWords: number;
}

export interface BlueprintFixtureInput {
  chapterIds: string[];
  pages: number;
}

function chatText(i: ChatFixtureInput): string {
  const grounding = i.contextTitles.length ? ` (based on: ${i.contextTitles.slice(0, 2).join('; ')})` : '';
  const photo = i.hasImage ? ' I read the question in your photo.' : '';
  if (i.language === 'hindi') {
    if (i.mode === 'hint') return `[MOCK] संकेत:${photo} पहले मुख्य विचार को पहचानो${grounding}। अब तुम अगला चरण क्या करोगे?`;
    if (i.mode === 'explain') return `[MOCK] सरल शब्दों में:${grounding} यह स्लाइड एक मुख्य विचार समझाती है। एक उदाहरण सोचो। जाँचो: इसका मुख्य बिंदु क्या है?`;
    return `[MOCK] पूरा हल:${photo}\n1. दिए गए मान लिखो।\n2. सूत्र लगाओ।\n3. उत्तर इकाई के साथ लिखो।${grounding}\n**उत्तर:** (mock)`;
  }
  if (i.language === 'hinglish') {
    if (i.mode === 'hint') return `[MOCK] Hint:${photo} pehle main concept socho${grounding}. Ab next step kya hoga, try karo?`;
    if (i.mode === 'explain') return `[MOCK] Simple words mein:${grounding} yeh slide ek main idea samjhati hai. Ek example socho. Check: main point kya hai?`;
    return `[MOCK] Poora solution:${photo}\n1. Given values likho.\n2. Formula lagao.\n3. Answer unit ke saath likho.${grounding}\n**Answer:** (mock)`;
  }
  if (i.mode === 'hint') return `[MOCK] Hint:${photo} start from the key idea${grounding}. What do you think the next step is? Try it and tell me.`;
  if (i.mode === 'explain') return `[MOCK] In simple words:${grounding} this slide explains one main idea. Think of an everyday example. Quick check: what is the main point?`;
  return `[MOCK] Full solution:${photo}\n1. Write what is given.\n2. Apply the formula.\n3. Write the answer with units.${grounding}\n**Answer:** (mock)\nCommon mistake: forgetting units.`;
}

/** Registers the gateway fixtures on a MockProvider (no-op for real providers). */
export function registerGatewayFixtures(provider: ModelProvider): void {
  if (!(provider instanceof MockProvider)) return;
  provider.register(FIXTURE.chat, ({ input }) => new MockText(chatText(input as ChatFixtureInput)));
  provider.register(FIXTURE.evaluate, ({ input }) => {
    const i = input as EvaluateFixtureInput;
    // Longer answers earn more; deterministic, never above a step's maximum.
    const share = i.answerWords >= 25 ? 1 : i.answerWords >= 8 ? 0.5 : 0;
    return {
      steps: i.steps.map((s) => ({ index: s.index, awarded: Math.floor(s.max * share * 2) / 2, reason: share === 1 ? '[MOCK] Step shown correctly.' : share ? '[MOCK] Partly shown; add the missing working.' : '[MOCK] This step is missing.' })),
      overall_feedback: '[MOCK] Good attempt. Show each step and write units with the final answer.',
      confidence: i.answerWords >= 15 ? 0.82 : 0.45,
    };
  });
  provider.register(FIXTURE.blueprint, ({ input }) => {
    const i = input as BlueprintFixtureInput;
    const chapters = i.chapterIds.slice(0, 4);
    return {
      duration_min: 90,
      total_marks: 40,
      sections: [
        { id: 'A', question_type: 'mcq', count: 10, marks_each: 1, internal_choice: 0 },
        { id: 'B', question_type: 'short', count: 5, marks_each: 2, internal_choice: 1 },
        { id: 'C', question_type: 'short', count: 4, marks_each: 3, internal_choice: 1 },
        { id: 'D', question_type: 'long', count: 2, marks_each: 4, internal_choice: 1 },
      ],
      chapter_ids: chapters,
      notes: '[MOCK] blueprint',
    };
  });
}
