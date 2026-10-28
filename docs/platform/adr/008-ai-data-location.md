# ADR-008: AI data location — Azure OpenAI in South India (GlobalStandard), Speech in Central India, Content Safety in South India

- Status: accepted for the production AI deployment (infra-azure, 2026-10-28). The owner and counsel still
  need to confirm the privacy-notice wording (F-014, OA-14).
- Related: D-031, D-033, D-038, D-039; CLAUDE.md golden rule 2; ARCHITECTURE §10 and §13; security
  requirements INFRA-5 and INFRA-9; threat model A4, AC-14 and F-014; ADR-013 (AI gateway); ADR-014 (tutor
  retrieval); ADR-015 (moderation).
- Number: ADR-008 was reserved for this decision in the M1 security requirements and threat model. The M6
  security review (2026-10-27) found that the file did not exist.

## Context

Everything stateful runs in **Central India** (INFRA-9). INFRA-9 also requires an ADR for any exception,
and Azure OpenAI was expected to be one. D-038 lets the Lead create the production AI resources:
GPT-6 Luna for `small`, GPT-6.1 Sol for `mid` and `verify` (D-033), plus embeddings and, if possible, Batch.

The users are children, and AI requests carry their questions, photos of their work and their answers.
We therefore have to record where that data is processed and where it is stored.

### What Azure offers (checked 2026-10-28 with read-only `az` calls on the owner's subscription)

| Service | Central India | South India | Source |
|---|---|---|---|
| Azure OpenAI account (kind `OpenAI`) | **not offered** | S0 | `Microsoft.CognitiveServices/skus` |
| GPT-6 Luna `2026-09-22` | — | **GlobalStandard only** | `az cognitiveservices model list -l southindia` |
| GPT-6.1 Sol `2026-09-29` | — | GlobalStandard, DataZoneStandard, GlobalProvisionedManaged | same |
| text-embedding-3-small `1` | — | GlobalStandard, DataZoneStandard | same |
| GlobalBatch / DataZoneBatch for Luna or Sol | — | **none** | same |
| Speech (kind `SpeechServices`) | S0 | **not offered** | `Microsoft.CognitiveServices/skus` |
| Content Safety (kind `ContentSafety`) | **not offered** | S0 | same |

The South India models report `capabilities.area = APAC`, so their Data Zone is **APAC**, not India.
No Indian region offers a regional `Standard` (in-region processing) deployment of Luna or Sol.
West India, Jio India Central and Jio India West list none of these models.

Subscription quota in South India on 2026-10-28 (`az cognitiveservices usage list`):

| Quota | Used / limit | Left for SOYL Academy |
|---|---|---|
| GlobalStandard gpt-6-luna | 200 / 250 K TPM | **50** |
| GlobalStandard gpt-6.1-sol | 200 / 250 K TPM | **50** |
| DataZoneStandard gpt-6.1-sol | 100 / 100 K TPM | **0** |
| GlobalStandard text-embedding-3-small | 150 / 1,000 K TPM | 850 |
| DataZoneStandard text-embedding-3-small | 0 / 1,000 K TPM | 1,000 |

The owner's other apps use the existing quota through the resources `Soyl` and `voicerag` in resource group
`soyl`. We do not touch or reuse those resources.

## Options considered (chat models)

1. **Central India, regional Standard.** Not possible: Central India has no Azure OpenAI accounts and no
   Luna or Sol.
2. **South India, regional Standard.** Not offered for Luna or Sol.
3. **South India, DataZoneStandard (APAC).** This would process prompts only inside APAC. It is offered
   only for Sol, Luna has no Data Zone offer, and the Sol Data Zone quota is fully used. We would need a
   quota increase and would still have to use Global for Luna.
4. **South India, GlobalStandard.** Offered for both models, with 50K TPM of quota left for each.
   **Chosen.**
5. **GlobalProvisionedManaged (Sol).** Also processes globally, has a minimum of 15 PTU, and is far too
   expensive for our volume.

## Decision

1. **Regions.** `aiLocation = southindia` (Azure OpenAI), `contentSafetyLocation = southindia` and
   `speechLocation = centralindia`. These are three parameters in `main.bicep` and `modules/ai.bicep`
   because no single Indian region offers all three services. All three accounts have
   `publicNetworkAccess = Disabled`, `disableLocalAuth = true` and private endpoints in the Central India
   VNet. Cross-region private endpoints are supported, so traffic between the apps and the AI services
   stays on the Microsoft backbone.
2. **Deployment types** (`params/prod.bicepparam`):

   | Tier | Model | Type | Capacity (K TPM) | Where prompts are processed |
   |---|---|---|---|---|
   | `small` | gpt-6-luna 2026-09-22 | GlobalStandard | 50 | any Azure region Microsoft routes to |
   | `mid` (`verify` reuses it) | gpt-6.1-sol 2026-09-29 | GlobalStandard | 50 | any Azure region |
   | `embedding` | text-embedding-3-small 1 (1536 dims) | **DataZoneStandard** | 100 | the APAC data zone |

   **No Batch deployment**, because no Batch SKU exists for these models.
   `AZURE_OPENAI_DEPLOYMENT_{SMALL,MID}_BATCH` are empty, `@soyl/ai-core` then offers no Batch
   capability, and the content pipeline runs synchronously at the standard price.
   `validate.mjs` allows only the types GlobalStandard, DataZoneStandard, Standard, GlobalBatch and
   DataZoneBatch. Any new type needs an update to this ADR.
3. **Data at rest stays in India.** Azure stores customer data in the resource's geography (India), even
   for Global and Data Zone deployments. We do not use the features that store prompts at the account:
   no Files, Batch, stored completions, Assistants or threads. Conversation history, uploads and AI
   results live in our own Postgres and Blob storage in Central India.
4. **What we send (data minimisation, D-039).**
   - **Chat models:** the template rules, the syllabus scope (board, class, subject and chapter), passages
     from our own published content, the last few turns of the conversation, and the student's message or
     answer. Uploads are photos and PDFs, rebuilt from image data only, so EXIF/GPS, XMP, ICC and comment
     segments are removed (ADR-013 §11). The prompts never contain names, email addresses, phone numbers,
     account ids or other students' data (`platform/api/src/ai/prompts.ts`). Requests carry no `user` or
     safety-identifier field, and the provider sends only the deployment name, the messages and the
     generation options (`platform/ai-core/src/providers/azure.ts`). A student can still type personal
     details into a message: moderation and the prompt rules do not strip free text.
   - **Content pipeline (Luna and Sol):** syllabus text and our generated content only. It sends no
     student data.
   - **Embeddings:** our published content at release time, and the student's question at tutor time
     (ADR-014). This is processed inside APAC.
   - **Content Safety (South India, regional):** the same student text and images, checked before and
     after the model call (ADR-015). Verdicts are stored as categories and severities only.
   - **Speech (Central India):** only our own lesson-narration text, from the content pipeline. It
     receives no student data.
5. **Abuse monitoring and retention.** The facts below come from Microsoft's "Data, privacy, and security
   for Azure OpenAI" documentation as of 2026-10. Re-check them before launch.
   - Prompts and completions are not available to OpenAI. They are not used to train or improve
     foundation models or other Microsoft or third-party products.
   - The default content filters (`Microsoft.DefaultV2`) run synchronously and do not store prompts.
   - **Abuse monitoring:** Microsoft may store prompts and completions for up to **30 days** to detect
     and investigate abuse. This data is stored in the resource's geography, and authorised Microsoft
     reviewers may look at samples that automated systems flag. Customers who meet Microsoft's
     limited-access criteria can apply for **modified abuse monitoring**, which turns off that storage and
     human review. Because the users are minors, **the owner should apply** (owner action below). Until
     approval, the 30-day abuse-monitoring retention applies and must appear in the privacy notice.
   - Content Safety and real-time Speech synthesis do not keep the submitted text or images after
     processing (per their data-privacy documentation).
6. **Consequences for the product promise.** "Your data is **stored** in India" holds. "Your data is
   **processed** only in India" does **not** hold for AI. Chat-model prompts may be processed in any Azure
   region and embeddings anywhere in APAC, with Microsoft acting as processor. The DPDP Act 2023 allows
   transfers outside India except to countries the government restricts. The privacy notice must list
   Microsoft Azure OpenAI as a processor, state that processing may happen outside India, and state the
   abuse-monitoring retention. **Owner and counsel to confirm** (F-014, OA-14).

## Revisit when

- Luna or Sol gets a regional Standard deployment in Central or South India, or a Data Zone with quota.
  Switch then, because only the deployment type and the parameters change.
- Modified abuse monitoring is approved. Update §5 and the privacy notice.
- A Batch SKU appears. Batch would carry content-pipeline prompts only, which contain no personal data.
  Add a `mid-batch` entry and expect roughly 50% lower content costs.
- Quota changes. Capacity is a parameter.

## Owner actions arising

1. **More TPM.** Ask for more GlobalStandard quota for gpt-6-luna and gpt-6.1-sol in South India
   (Azure AI Foundry → Quotas → South India → GlobalStandard → Request quota increase). With 50K TPM, a
   single long content-pipeline request (`max_output_tokens` up to 28K, which Azure counts against TPM up
   front) uses most of a minute's Sol capacity, and pipeline runs compete with students for the same
   deployment.
2. **Modified abuse monitoring.** Apply for the account `oai-soyl-prod-*` (limited-access form).
3. **Privacy notice wording.** Agree the processor and location text with counsel (F-014, OA-14).
