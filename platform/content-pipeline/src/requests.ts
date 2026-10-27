/**
 * Builds the model requests for a unit: one per item (outline; deck parts, notes, flashcards,
 * question batches, case batches). Shared by `plan` (estimates) and `outline`/`generate` (calls),
 * so the estimate prices exactly the prompts that would be sent.
 */
import * as yaml from 'js-yaml';
import type { z } from 'zod/v4';
import { toJsonSchema, type StructuredRequest } from '@soyl/ai-core';
import { CONTENT_TARGETS } from '@soyl/shared/config/content-targets';
import type { Blueprint, ChapterOutline, LessonOutline, Question } from '@soyl/shared/content/index';
import { TEXT_FAMILIES, familyForChapter, type Family } from '../config/families';
import { OUTPUT_TOKENS } from '../config/pipeline';
import { questionIdPrefix } from './ids';
import { blueprintsFor, type Catalog, type ChapterRef } from './catalog';
import type { DeckInput, FlashcardsInput, NotesInput, OutlineInput, QuestionsInput, TopicRef } from './mock-fixtures';
import { planSlots, questionBatches, questionPlan, skeletonOutline, type QuestionSlot } from './planning';
import { OutlineGeneration, VerifyReport, deckGenerationSchema, flashcardsSchema, notesSchema, questionBatchSchema } from './schemas';
import { loadFewShot, renderTemplate, resolveTemplate, templateRef, type PromptTemplate, type TemplateAsset, type TemplateVars } from './templates';

export interface TemplateDirs {
  templatesDir: string;
  fallbackTemplatesDir: string;
}

export interface ItemSpec {
  key: string;
  asset: TemplateAsset;
  template: PromptTemplate;
  templateRef: string;
  request: StructuredRequest<unknown>;
  /** Expected (not maximum) output tokens incl. reasoning, for estimates. */
  expectedOutputTokens: number;
  fewShotMissing: string[];
}

export interface UnitContext {
  ref: ChapterRef;
  unit: string;
  family: Family;
  blueprints: Blueprint[];
  topics: TopicRef[];
  language: string;
}

export function unitContext(catalog: Catalog, ref: ChapterRef): UnitContext {
  return {
    ref,
    unit: ref.chapter.id,
    family: familyForChapter(ref.subject, ref.chapter),
    blueprints: blueprintsFor(catalog, ref.subject, ref.chapter.id),
    topics: ref.chapter.topics.map((t) => ({ id: t.id, title: t.title })),
    language: ref.subject.language,
  };
}

const LANGUAGE_NAMES: Record<string, string> = { en: 'English', hi: 'Hindi (Devanagari script)', sa: 'Sanskrit (Devanagari script)', ur: 'Urdu' };

export function targetsText(ctx: UnitContext): string {
  const t = CONTENT_TARGETS;
  const lines = [
    `- ${t.deckSlidesMin}–${t.deckSlidesMax} slides per deck part, one idea per slide.`,
    `- Every deck part has learning goals, concept slides, ${t.checkQuestionsMin}–${t.checkQuestionsMax} check-your-understanding slides, a summary slide and an exam-tips slide.`,
    `- Narration: at most ${t.narrationMaxWords} words per slide, plain spoken language.`,
    `- Flashcards: ${t.flashcardsMin}–${t.flashcardsMax} per chapter.`,
    `- Practice questions: at least ${t.practiceQuestionsMin[ctx.ref.subject.class] ?? 40} per chapter across at least 5 question types.`,
  ];
  if (!TEXT_FAMILIES.has(ctx.family)) {
    lines.push(`- A diagram or visual at least every ${t.visualEverySlides} slides.`, `- At least ${t.workedExamplesMin} worked-example slides.`);
  }
  if (ctx.language === 'hi') lines.push('- Write everything in Hindi, in Devanagari script.');
  return lines.join('\n');
}

function baseVars(ctx: UnitContext): Omit<TemplateVars, 'outline_json' | 'json_schema' | 'few_shot' | 'task' | 'content_json'> {
  const { subject, syllabus, chapter } = ctx.ref;
  return {
    board: subject.board.toUpperCase(),
    exam: subject.exam.toUpperCase(),
    class: String(subject.class),
    subject_name: subject.name,
    language: LANGUAGE_NAMES[subject.language] ?? subject.language,
    chapter_id: chapter.id,
    chapter_title: chapter.title,
    topics_yaml: yaml.dump(
      chapter.topics.map((t) => ({ id: t.id, title: t.title, learning_outcomes: t.learning_outcomes, ...(t.board_assessed ? {} : { board_assessed: false }) })),
      { lineWidth: 120 },
    ),
    learning_outcomes: chapter.topics.flatMap((t) => t.learning_outcomes.map((o) => `- ${o}`)).join('\n') || '(none listed)',
    exam_notes: syllabus.exam_notes ?? '(none)',
    blueprint_yaml: ctx.blueprints.length
      ? yaml.dump(ctx.blueprints.map((b) => ({ id: b.id, paper_type: b.paper_type, total_marks: b.total_marks, sections: b.sections })), { lineWidth: 120 })
      : '(no blueprint yet for this subject: follow the question plan below)',
    targets: targetsText(ctx),
    id_prefix: questionIdPrefix(ctx.unit),
  };
}

/** The JSON Schema text per schema name: generation schemas differ per unit only in normalisation, not shape. */
const schemaTextCache = new Map<string, string>();
function jsonSchemaText(name: string, schema: z.ZodType<unknown>): string {
  let text = schemaTextCache.get(name);
  if (text === undefined) {
    text = JSON.stringify(toJsonSchema(schema));
    schemaTextCache.set(name, text);
  }
  return text;
}

function build(
  ctx: UnitContext,
  dirs: TemplateDirs,
  asset: TemplateAsset,
  key: string,
  schema: z.ZodType<unknown>,
  schemaName: string,
  extra: { outline_json: string; task: string; content_json?: string },
  mockInput: unknown,
  expectedOutputTokens: number,
): ItemSpec {
  const template = resolveTemplate(ctx.family, asset, dirs);
  const fewShot = loadFewShot(template.few_shot, dirs.templatesDir, asset);
  const vars: TemplateVars = { ...baseVars(ctx), content_json: '(not applicable at this stage)', ...extra, json_schema: jsonSchemaText(schemaName, schema), few_shot: fewShot.text };
  const { system, user } = renderTemplate(template, vars);
  return {
    key,
    asset,
    template,
    templateRef: templateRef(template),
    request: {
      tier: template.model_tier,
      maxOutputTokens: template.max_output_tokens,
      temperature: template.temperature,
      reasoningEffort: template.reasoning_effort,
      schema,
      schemaName,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      meta: { unit: ctx.unit, item: key, purpose: `content:${asset}` },
      mock: { fixture: asset, input: mockInput },
    },
    expectedOutputTokens: Math.round(expectedOutputTokens * (1 + OUTPUT_TOKENS.reasoningOverhead)),
    fewShotMissing: fewShot.missing,
  };
}

export function outlineItem(ctx: UnitContext, dirs: TemplateDirs): ItemSpec {
  const plan = questionPlan(ctx.ref.subject.class, ctx.family, ctx.blueprints);
  const skeleton = skeletonOutline(ctx.ref.chapter, ctx.family);
  const slides = skeleton.parts.reduce((n, p) => n + p.slides.length, 0);
  const task = [
    `Plan ${skeleton.parts.length} deck part(s) (split long chapters into parts of 12–25 slides). Suggested topic split:`,
    ...skeleton.parts.map((p) => `- Part ${p.part}: ${p.topic_ids.join(', ')}`),
    `Question plan for this chapter (generated separately, for context): ${plan.by_type.map((t) => `${t.count} ${t.type}`).join(', ')}.`,
  ].join('\n');
  const input: OutlineInput = { chapter: ctx.ref.chapter, family: ctx.family };
  return build(ctx, dirs, 'outline', 'outline', OutlineGeneration as z.ZodType<unknown>, 'lesson_outline', { outline_json: '(not yet planned)', task }, input, OUTPUT_TOKENS.outlineBase + slides * OUTPUT_TOKENS.outlinePerSlide);
}

/** The stored outline: model lesson outline + deterministic question plan. */
export function chapterOutline(ctx: UnitContext, lesson: LessonOutline): Omit<ChapterOutline, 'provenance'> {
  return {
    ...lesson,
    unit: ctx.unit,
    version: 1,
    title: ctx.ref.chapter.title,
    family: ctx.family,
    question_plan: questionPlan(ctx.ref.subject.class, ctx.family, ctx.blueprints),
  };
}

/** Outline used before stage 2 has run (estimates only). */
export function provisionalOutline(ctx: UnitContext): Omit<ChapterOutline, 'provenance'> {
  return chapterOutline(ctx, skeletonOutline(ctx.ref.chapter, ctx.family));
}

export function generateItems(ctx: UnitContext, outline: Omit<ChapterOutline, 'provenance'>, dirs: TemplateDirs): ItemSpec[] {
  const items: ItemSpec[] = [];
  const multi = outline.parts.length > 1;
  for (const part of outline.parts) {
    const partNo = multi ? part.part : null;
    const checks = part.slides.filter((s) => s.layout === 'check').length;
    const input: DeckInput = { unit: ctx.unit, part: partNo, outlinePart: part, topics: ctx.topics, family: ctx.family, language: ctx.language };
    const task = [
      `Write ${multi ? `part ${part.part} of ${outline.parts.length}` : 'the deck'} ("${part.title}") with exactly ${part.slides.length} slides, following the outline slide by slide.`,
      `Each of the ${checks} check slide(s) sets check_question_id to the id of one MCQ in check_questions (write ${checks} MCQs, 1 mark each).`,
      `Deck goals: ${JSON.stringify(outline.goals)}.`,
    ].join('\n');
    items.push(
      build(ctx, dirs, 'deck', `deck.p${part.part}`, deckGenerationSchema(ctx.unit, partNo) as z.ZodType<unknown>, 'deck_part', { outline_json: JSON.stringify(part, null, 1), task }, input,
        OUTPUT_TOKENS.deckBase + part.slides.length * OUTPUT_TOKENS.deckPerSlide + checks * OUTPUT_TOKENS.checkQuestion),
    );
  }
  const outlineJson = JSON.stringify({ goals: outline.goals, parts: outline.parts.map((p) => ({ part: p.part, title: p.title, topic_ids: p.topic_ids })) }, null, 1);
  const notesInput: NotesInput = { unit: ctx.unit, chapterTitle: ctx.ref.chapter.title, topics: ctx.topics, family: ctx.family, language: ctx.language };
  items.push(
    build(ctx, dirs, 'notes', 'notes', notesSchema(ctx.unit) as z.ZodType<unknown>, 'chapter_notes', { outline_json: outlineJson, task: `Write one notes section per topic (${ctx.topics.length} sections), each tagged with its topic id.` }, notesInput,
      OUTPUT_TOKENS.notesBase + ctx.topics.length * OUTPUT_TOKENS.notesPerTopic),
  );
  const cards = Math.round((CONTENT_TARGETS.flashcardsMin + CONTENT_TARGETS.flashcardsMax) / 2);
  const cardsInput: FlashcardsInput = { unit: ctx.unit, topics: ctx.topics, count: cards, language: ctx.language };
  items.push(
    build(ctx, dirs, 'flashcards', 'flashcards', flashcardsSchema(ctx.unit) as z.ZodType<unknown>, 'flashcards', { outline_json: outlineJson, task: `Write exactly ${cards} flashcards covering every topic.` }, cardsInput,
      cards * OUTPUT_TOKENS.flashcard),
  );
  const slots = planSlots(outline.question_plan, ctx.topics.map((t) => t.id));
  for (const batch of questionBatches(slots)) {
    const input: QuestionsInput = { unit: ctx.unit, slots: batch.slots, topics: ctx.topics, language: ctx.language };
    const table = batch.slots.map((s, i) => `${i + 1}. ${s.type}, ${s.marks} mark(s), difficulty ${s.difficulty}, competency ${s.competency}, topic ${s.topic_id}`).join('\n');
    const task = `Write exactly these ${batch.slots.length} question(s), in this order:\n${table}`;
    const out = batch.slots.reduce((n, s) => n + (OUTPUT_TOKENS.question[s.type] ?? OUTPUT_TOKENS.question.default!), 0);
    items.push(build(ctx, dirs, batch.asset, batch.key, questionBatchSchema(ctx.unit, batch.key, batch.slots) as z.ZodType<unknown>, 'question_batch', { outline_json: outlineJson, task }, input, out));
  }
  return items;
}

/** Stage 5: one independent-solve call (verify tier) over a batch of questions. */
export function verifyItem(ctx: UnitContext, dirs: TemplateDirs, questions: Question[], key: string): ItemSpec {
  const content = JSON.stringify(questions.map(({ provenance: _p, ...q }) => q), null, 1);
  const task = `Verify these ${questions.length} question(s). Use each question's id as "ref". Report only real problems.`;
  const input = { questions: questions.map((q) => ({ id: q.id, stem_md: q.stem_md })) };
  const spec = build(ctx, dirs, 'verify', key, VerifyReport as z.ZodType<unknown>, 'verify_report', { outline_json: '(not needed)', task, content_json: content }, input, 120 + questions.length * 140);
  spec.request.meta = { ...spec.request.meta, purpose: 'stage:verify' };
  return spec;
}

/** Stages 5–6: regenerate one flagged question with the same slot (type, marks, difficulty, competency, topic). */
export function regenerateQuestionItem(ctx: UnitContext, dirs: TemplateDirs, q: Question, key: string, reasons: string[], stage: 'verify' | 'originality' = 'verify'): ItemSpec {
  const slot: QuestionSlot = { type: q.type, marks: q.marks, difficulty: q.difficulty, competency: q.competency, topic_id: q.topic_ids[0]! };
  const asset = q.type === 'case-based' || q.type === 'source-based' ? 'case-passages' : 'questions';
  const input: QuestionsInput = { unit: ctx.unit, slots: [slot], topics: ctx.topics, language: ctx.language };
  const task = [
    `Write exactly 1 question: ${slot.type}, ${slot.marks} mark(s), difficulty ${slot.difficulty}, competency ${slot.competency}, topic ${slot.topic_id}.`,
    'It replaces an earlier question that failed automated checks. Do not repeat its problems:',
    ...reasons.slice(0, 8).map((r) => `- ${r}`),
  ].join('\n');
  const spec = build(ctx, dirs, asset, key, questionBatchSchema(ctx.unit, key, [slot]) as z.ZodType<unknown>, 'question_batch', { outline_json: '(see the task)', task }, input, OUTPUT_TOKENS.question[slot.type] ?? OUTPUT_TOKENS.question.default!);
  spec.request.meta = { ...spec.request.meta, purpose: `stage:${stage}` };
  return spec;
}
