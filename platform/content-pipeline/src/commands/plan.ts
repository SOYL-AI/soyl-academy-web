/**
 * `plan`: units in scope, what is missing per stage, and a dry-run token + INR estimate for the
 * model work still to do (stages 2–3), compared with the per-run and total budgets. Always a dry
 * run: no model is called. Estimates price the exact prompts that would be sent (rendered
 * templates + JSON Schema) and the expected output size per asset (config/pipeline.ts
 * OUTPUT_TOKENS, reasoning included), at models.ts prices.
 */
import { estimateMessagesTokens, toJsonSchema } from '@soyl/ai-core';
import { MODELS, costPaise, type ModelTier } from '@soyl/shared/config/models';
import { unitsInScope, type Scope } from '../catalog';
import { inr, table } from '../io';
import { budgetCapsPaise, needsWork, type Pipeline } from '../pipeline';
import { generateItems, outlineItem, provisionalOutline, unitContext, type ItemSpec } from '../requests';
import { readOutline } from './generate';

export interface ItemEstimate {
  key: string;
  tier: ModelTier;
  inputTokens: number;
  outputTokens: number;
  paise: number;
  batchPaise: number;
}

export function estimateItem(spec: ItemSpec): ItemEstimate {
  const schemaTokens = Math.ceil(JSON.stringify(spec.request.schema ? toJsonSchema(spec.request.schema) : {}).length / 4);
  const inputTokens = estimateMessagesTokens(spec.request.messages) + schemaTokens;
  const outputTokens = Math.min(spec.expectedOutputTokens, spec.request.maxOutputTokens ?? MODELS[spec.request.tier].max_output_tokens);
  const usage = { input_tokens: inputTokens, cached_input_tokens: 0, output_tokens: outputTokens };
  return { key: spec.key, tier: spec.request.tier, inputTokens, outputTokens, paise: costPaise(spec.request.tier, usage), batchPaise: costPaise(spec.request.tier, usage, { batch: true }) };
}

export interface UnitPlan {
  unit: string;
  title: string;
  family: string;
  outline: string;
  generate: string;
  lint: string;
  parts: number;
  remaining: ItemEstimate[];
  inputTokens: number;
  outputTokens: number;
  paise: number;
  batchPaise: number;
}

export interface PlanResult {
  units: UnitPlan[];
  totals: { inputTokens: number; outputTokens: number; paise: number; batchPaise: number };
  caps: { run: number; total: number; spentReal: number };
  subjectsWithoutSyllabus: string[];
}

export async function planUnits(p: Pipeline, scope: Scope): Promise<PlanResult> {
  const refs = unitsInScope(p.catalog, scope);
  const units: UnitPlan[] = [];
  for (const ref of refs) {
    const ctx = unitContext(p.catalog, ref);
    const stages = {
      outline: await p.store.getUnitStage(ctx.unit, 'outline'),
      generate: await p.store.getUnitStage(ctx.unit, 'generate'),
      lint: await p.store.getUnitStage(ctx.unit, 'lint'),
    };
    const stored = readOutline(p, ctx.unit);
    const outline = stored ?? provisionalOutline(ctx);
    const specs = [...(stored ? [] : [outlineItem(ctx, p.paths)]), ...generateItems(ctx, outline, p.paths)];
    const remaining: ItemEstimate[] = [];
    for (const spec of specs) {
      const stage = spec.asset === 'outline' ? 'outline' : 'generate';
      const prev = stages[stage]?.items[spec.key];
      if (needsWork(prev, p.opts)) remaining.push(estimateItem(spec));
    }
    const gen = stages.generate;
    const genItems = gen ? Object.values(gen.items) : [];
    units.push({
      unit: ctx.unit,
      title: ref.chapter.title,
      family: ctx.family,
      outline: stages.outline?.status ?? 'missing',
      generate: gen ? `${gen.status} ${genItems.filter((i) => i.status === 'done').length}/${specs.length - (stored ? 0 : 1)}` : 'missing',
      lint: stages.lint ? (Object.values(stages.lint.items).some((i) => i.status !== 'done') ? 'errors' : 'clean') : 'missing',
      parts: outline.parts.length,
      remaining,
      inputTokens: remaining.reduce((n, e) => n + e.inputTokens, 0),
      outputTokens: remaining.reduce((n, e) => n + e.outputTokens, 0),
      paise: remaining.reduce((n, e) => n + e.paise, 0),
      batchPaise: remaining.reduce((n, e) => n + e.batchPaise, 0),
    });
  }
  const caps = budgetCapsPaise(p.env);
  const spentReal = await p.store.spentPaise({ simulated: false });
  const subjectIds = new Set(refs.map((r) => r.subject.id));
  const subjectsWithoutSyllabus = (await import('../catalog')).subjectsInScope(p.catalog, scope).filter((s) => !subjectIds.has(s.id) && !p.catalog.syllabi.has(s.id)).map((s) => s.id);
  return {
    units,
    totals: {
      inputTokens: units.reduce((n, u) => n + u.inputTokens, 0),
      outputTokens: units.reduce((n, u) => n + u.outputTokens, 0),
      paise: units.reduce((n, u) => n + u.paise, 0),
      batchPaise: units.reduce((n, u) => n + u.batchPaise, 0),
    },
    caps: { run: caps.run, total: caps.total, spentReal },
    subjectsWithoutSyllabus,
  };
}

const k = (n: number) => (n >= 10_000 ? `${(n / 1000).toFixed(0)}k` : n.toLocaleString('en-IN'));

export async function planCommand(p: Pipeline, scope: Scope): Promise<{ result: PlanResult; exitCode: number }> {
  const result = await planUnits(p, scope);
  if (!result.units.length) {
    p.log('no units in scope.');
    if (result.subjectsWithoutSyllabus.length) p.log(`subjects without a syllabus file: ${result.subjectsWithoutSyllabus.join(', ')}`);
    return { result, exitCode: 1 };
  }
  p.log('plan (dry run: no model calls). Prices: models.ts placeholders, UNVERIFIED until OA-02.');
  p.log(
    `  ${(['small', 'mid', 'verify'] as const).map((t) => `${t}=${MODELS[t].display_name} ₹${MODELS[t].price_inr_per_1m.input}/₹${MODELS[t].price_inr_per_1m.output} per 1M in/out`).join('; ')}; Batch ×${MODELS.mid.batch_price_factor}`,
  );
  p.log('');
  p.log(
    table(
      ['unit', 'title', 'family', 'parts', 'outline', 'generate', 'lint', 'calls', 'in tok', 'out tok', 'est. INR', 'Batch INR'],
      result.units.map((u) => [u.unit, u.title.slice(0, 34), u.family, u.parts, u.outline, u.generate, u.lint, u.remaining.length, k(u.inputTokens), k(u.outputTokens), inr(u.paise), inr(u.batchPaise)]),
      ['l', 'l', 'l', 'r', 'l', 'l', 'l', 'r', 'r', 'r', 'r', 'r'],
    ),
  );
  const t = result.totals;
  p.log('');
  p.log(`total remaining (stages 2–3): ${result.units.reduce((n, u) => n + u.remaining.length, 0)} calls, ${t.inputTokens.toLocaleString('en-IN')} input + ${t.outputTokens.toLocaleString('en-IN')} output tokens`);
  p.log(`  estimate ${inr(t.paise)} synchronous, ${inr(t.batchPaise)} with --batch`);
  p.log(`  per-run cap (CONTENT_BUDGET_INR) ${inr(result.caps.run, 0)}: ${t.paise <= result.caps.run ? 'fits' : `EXCEEDS — split the run (≈${Math.ceil(t.paise / result.caps.run)} runs)`}`);
  const left = result.caps.total - result.caps.spentReal;
  p.log(`  total cap (CONTENT_BUDGET_TOTAL_INR) ${inr(result.caps.total, 0)}, real spend so far ${inr(result.caps.spentReal)}, left ${inr(left)}: ${t.paise <= left ? 'fits' : 'EXCEEDS'}`);
  if (result.subjectsWithoutSyllabus.length) p.log(`  ${result.subjectsWithoutSyllabus.length} subject(s) in scope have no syllabus file yet and are not planned: ${result.subjectsWithoutSyllabus.slice(0, 10).join(', ')}${result.subjectsWithoutSyllabus.length > 10 ? ', …' : ''}`);
  return { result, exitCode: 0 };
}
