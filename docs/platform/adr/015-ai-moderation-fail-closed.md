# ADR-015: AI moderation — Content Safety in and out, local stand-in, fail closed

- Status: accepted (ai-gateway M4, 2026-10-27)
- Related: CONTEXT §12; ARCHITECTURE §10; threat model AC-13, AC-14, AC-15, F-027; requirements API-16; ASVS X-1, X-2, 16.5.3; ADR-013

## Context

The users are children. Every prompt and every response must be moderated, the tone must be
age-appropriate, and harmful or off-topic requests refused (CONTEXT §12). Azure AI Content Safety is
the production classifier, but no resource exists yet; local development and CI need a deterministic
stand-in. A moderation outage must never let unchecked text through (F-027).

## Decision

1. **One interface** (`ModerationProvider`): `analyzeText(text)` → severities for hate, sexual,
   self-harm and violence (0..7); `shieldPrompt(userPrompt, documents)` → user-attack and
   document-attack flags.
   - `AzureContentSafetyProvider`: `text:analyze` (FourSeverityLevels, 10,000-character slices) and
     `text:shieldPrompt` (Prompt Shields), API version 2024-09-01, keyless bearer token, 5 s timeout.
   - `LocalRuleModerationProvider`: deterministic English/Hindi/Hinglish rule lists (rules.ts), with
     syllabus phrases removed first so "sexual reproduction", "sex chromosomes", "sexually
     transmitted diseases", Hiroshima and Durkheim are never refused. Refused in production (GEN-3).
   - `FailingModerationProvider`: `CONTENT_SAFETY_PROVIDER=disabled`, the production default.
2. **Policy** (`Moderator`, thresholds in `AI_MODERATION`): block sexual and self-harm at severity ≥ 2
   (low) and hate and violence at ≥ 4 (medium) so history and science lessons can be discussed;
   Prompt Shields on the student's own text; document shields on upload text and answers being
   evaluated; a local topic guard (dating, gambling, hacking, game cheats, gossip) on chat actions.
   Verdicts store categories and severities only, never the text.
3. **Input**: blocked → no model call, a fixed refusal, credits refunded, `ai_requests.status =
   moderated` (or `refused` for off-topic). A self-harm signal gets a supportive message with
   Tele-MANAS 14416, KIRAN 1800-599-0019 and 112, and a structured `self_harm_signal` alert log for
   the review queue; nobody is contacted automatically (owner policy decision pending).
4. **Output**: streamed text is moderated in chunks of about 400 characters, cut at sentence ends,
   before each chunk is sent. A blocked chunk stops the model, is never shown, and the request is
   refunded. Evaluation feedback is moderated before it is stored.
5. **Fail closed** (F-027, API-16): any provider error, timeout or missing token raises
   `ModerationUnavailableError`; the gateway sends `ai_unavailable`, refunds and makes no (further)
   model call. The same holds for the KV store (rate limits and stream slots fail closed on AI
   routes), blob storage and the model provider. Learning content is unaffected.
6. **Defence in depth**: prompts declare tagged text to be data and neutralise tag sequences;
   structured outputs are validated and clamped; the model has no tools; Azure OpenAI's own content
   filters stay on (INFRA-5).

## Consequences

- Locally and in CI the rules are deterministic, so the jailbreak/injection fixtures are stable tests.
- Production needs an Azure AI Content Safety resource in Central India with the API's managed identity
  as Cognitive Services User; until then AI stays off (it is also off by consent, D-031).
- Moderating each output chunk adds a round trip per ~400 characters (≈ 50–150 ms with Azure).
- The local rule lists are a starter set; red-team sets in English, Hindi and Hinglish must run against
  the real models and Content Safety before launch (AC-15 verify step).
