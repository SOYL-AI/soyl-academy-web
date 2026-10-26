/**
 * State, resume, retries, budget, Batch, and the end-to-end acceptance path
 * plan → outline → generate → lint for cbse-10-science-ch01 on the mock provider.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { MockProvider } from '@soyl/ai-core';
import { coverageCommand } from '../src/commands/coverage';
import { generateCommand, outlineCommand } from '../src/commands/generate';
import { exemplarDirs, lintCommand, lintExemplar } from '../src/commands/lint';
import { planCommand } from '../src/commands/plan';
import { main } from '../src/cli';
import { MOCK_FIXTURES } from '../src/mock-fixtures';
import { FileStateStore, aggregateStatus } from '../src/state';
import { SCOPE, UNIT, testPipeline } from './helpers';

describe('FileStateStore', () => {
  it('upserts items, aggregates unit status and sums the ledger', async () => {
    const { p } = testPipeline();
    const store = p.store as FileStateStore;
    const base = { unit: UNIT, stage: 'generate' as const, attempts: 1, run_id: 'r1', template: 't@1', model: 'mock', usage: null, cost_paise: 1, output: null, error: null, updated_at: 'now' };
    await store.putItem({ ...base, key: 'notes', status: 'done' });
    const rec = await store.putItem({ ...base, key: 'flashcards', status: 'failed' });
    expect(rec.status).toBe('failed');
    expect(Object.keys(rec.items)).toEqual(['notes', 'flashcards']);
    await store.recordSpend({ at: 'x', run_id: 'r1', provider: 'mock', model: 'mock', tier: 'mid', unit: UNIT, stage: 'generate', item: 'notes', usage: { input_tokens: 1, cached_input_tokens: 0, output_tokens: 1 }, cost_paise: 2.5, batch: false, simulated: true });
    await store.recordSpend({ at: 'x', run_id: 'r2', provider: 'azure', model: 'sol', tier: 'mid', unit: UNIT, stage: 'generate', item: 'notes', usage: { input_tokens: 1, cached_input_tokens: 0, output_tokens: 1 }, cost_paise: 10, batch: false, simulated: false });
    expect(await store.spentPaise({ simulated: false })).toBe(10);
    expect(await store.spentPaise({ simulated: true })).toBe(2.5);
    expect(await store.spentPaise({ runId: 'r1' })).toBe(2.5);
    expect(aggregateStatus([])).toBe('pending');
  });

  it('rejects unsafe keys', async () => {
    const { p } = testPipeline();
    await expect(p.store.getUnitStage('../../etc/passwd', 'lint')).rejects.toThrow(/unsafe/);
  });
});

describe('end to end (mock provider): plan → outline → generate → lint', () => {
  it('produces a lint-clean chapter and a cost estimate', async () => {
    const { p, logs } = testPipeline();
    const plan = await planCommand(p, SCOPE);
    expect(plan.exitCode).toBe(0);
    const unit = plan.result.units[0]!;
    expect(unit.unit).toBe(UNIT);
    expect(unit.remaining.length).toBe(10); // outline + deck + notes + flashcards + 4 question batches + 2 case batches
    expect(unit.paise).toBeGreaterThan(0);
    expect(unit.batchPaise).toBeCloseTo(unit.paise / 2, 6);
    expect(logs.join('\n')).toMatch(/estimate ₹[\d,.]+ synchronous/);

    expect((await outlineCommand(p, SCOPE)).exitCode).toBe(0);
    const gen = await generateCommand(p, SCOPE);
    expect(gen.exitCode).toBe(0);
    expect(gen.assembled).toEqual([UNIT]);

    const dir = path.join(p.paths.outDir, UNIT);
    for (const f of ['outline.json', 'deck.p1.json', 'notes.json', 'flashcards.json', 'questions.json']) expect(fs.existsSync(path.join(dir, f)), f).toBe(true);
    const bank = JSON.parse(fs.readFileSync(path.join(dir, 'questions.json'), 'utf8'));
    expect(bank.questions[0].id).toBe('q_cbse10sci_ch01_001');
    expect(bank.questions.length).toBe(63); // 60 practice + 3 deck checks
    const notes = JSON.parse(fs.readFileSync(path.join(dir, 'notes.json'), 'utf8'));
    expect(notes.provenance).toMatchObject({ origin: 'pipeline', model: 'mock', template_version: 'science.notes@1' });

    const lint = await lintCommand(p, SCOPE);
    expect(lint.exitCode).toBe(0);
    expect(lint.reports[0]!.errors).toBe(0);
    expect(lint.reports[0]!.findings.filter((f) => f.severity === 'warning').every((f) => f.rule === 'provenance.mock')).toBe(true);

    // After generation the plan shows nothing left to do.
    const after = await planCommand(p, SCOPE);
    expect(after.result.units[0]!.remaining).toHaveLength(0);

    // Mock output never counts toward coverage.
    const cov = coverageCommand(p, SCOPE);
    expect(cov.report.subjects[0]!.have.deck).toBe(0);
    expect(cov.report.totals.mock_units).toBe(1);
  }, 60_000);

  it('is deterministic for a seed', async () => {
    const read = async (seed: string) => {
      const { p } = testPipeline({ seed });
      await generateCommand(p, SCOPE);
      const q = JSON.parse(fs.readFileSync(path.join(p.paths.outDir, UNIT, 'questions.json'), 'utf8'));
      return q.questions.map((x: { answer: unknown }) => JSON.stringify(x.answer)).join('|');
    };
    expect(await read('a')).toBe(await read('a'));
    expect(await read('a')).not.toBe(await read('b'));
  }, 60_000);

  it('runs through Batch with --batch', async () => {
    const { p, logs } = testPipeline({ batch: true });
    const gen = await generateCommand(p, SCOPE);
    expect(gen.exitCode).toBe(0);
    expect(logs.join('\n')).toMatch(/batch mock-batch-.*: submitted 9 item\(s\)/);
    const run = await p.store.getRun(gen.runId!);
    expect(run?.batch).toBeNull();
    expect(run?.status).toBe('done');
  }, 60_000);
});

describe('resume, retries and budget', () => {
  it('skips completed items when re-run', async () => {
    const { p } = testPipeline();
    await generateCommand(p, SCOPE);
    const again = await generateCommand(p, SCOPE);
    const run = await p.store.getRun(again.runId!);
    expect(run?.counts).toEqual({ skipped: 10 });
    expect(run?.budget.spent_paise).toBe(0);
  }, 60_000);

  it('retries a failing item twice, then marks it needs_review; --retry-review retries it', async () => {
    const { p, logs } = testPipeline();
    await outlineCommand(p, SCOPE);
    // Fail every notes call: patch the mock fixture to produce invalid notes.
    const original = MOCK_FIXTURES.notes!;
    MOCK_FIXTURES.notes = () => ({ unit: UNIT, title: 'x', sections: [] });
    try {
      const gen = await generateCommand(p, SCOPE);
      expect(gen.exitCode).toBe(2);
      const rec = await p.store.getUnitStage(UNIT, 'generate');
      expect(rec?.items.notes?.status).toBe('needs_review');
      expect(rec?.items.notes?.attempts).toBe(3);
      expect(rec?.items.flashcards?.status).toBe('done');
      expect(gen.assembled).toEqual([]);
      expect(logs.join('\n')).toMatch(/notes: needs_review after 3 attempts/);
      // A plain re-run leaves needs_review alone.
      const again = await generateCommand(p, SCOPE);
      expect((await p.store.getRun(again.runId!))?.counts.done ?? 0).toBe(0);
    } finally {
      MOCK_FIXTURES.notes = original;
    }
    p.opts.retryReview = true;
    const fixed = await generateCommand(p, SCOPE);
    expect(fixed.exitCode).toBe(0);
    expect(fixed.assembled).toEqual([UNIT]);
  }, 60_000);

  it('pauses only model calls at the run cap and resumes with --run', async () => {
    // ₹30 per run: each call reserves its worst case (max output tokens), so a few calls fit, then the guard refuses.
    const { p, logs } = testPipeline({ concurrency: 1 }, { CONTENT_BUDGET_INR: '30' });
    const gen = await generateCommand(p, SCOPE);
    expect(gen.status).toBe('paused_budget');
    expect(gen.exitCode).toBe(3);
    expect(logs.join('\n')).toMatch(/budget would be exceeded/);
    const rec = await p.store.getUnitStage(UNIT, 'generate');
    const statuses = Object.values(rec!.items).map((i) => i.status);
    expect(statuses).toContain('paused');
    // Lint (free) still runs on a paused unit and reports it incomplete.
    const lint = await lintCommand(p, SCOPE);
    expect(lint.reports[0]!.findings.some((f) => f.rule === 'unit.incomplete')).toBe(true);
    // Raise the cap and resume the same run.
    p.env.CONTENT_BUDGET_INR = '25000';
    p.opts.runId = gen.runId!;
    const resumed = await generateCommand(p, SCOPE);
    expect(resumed.runId).toBe(gen.runId);
    expect(resumed.exitCode).toBe(0);
    expect(resumed.assembled).toEqual([UNIT]);
  }, 60_000);
});

describe('CLI', () => {
  it('stubs stages 5–9 with "not implemented (M2)" and a non-zero exit', async () => {
    for (const cmd of ['verify', 'originality', 'assemble', 'tts', 'publish']) expect(await main([cmd])).toBe(2);
  });

  it('refuses the mock provider in production (GEN-3)', async () => {
    const { p } = testPipeline({}, { NODE_ENV: 'production' });
    await expect(generateCommand(p, SCOPE)).rejects.toThrow(/production/);
    expect(() => new MockProvider({ env: { NODE_ENV: 'production' } })).toThrow();
  });

  it('explains missing Azure configuration', async () => {
    const { p } = testPipeline({ provider: 'azure' }, {});
    await expect(generateCommand(p, SCOPE)).rejects.toThrow(/AZURE_OPENAI_ENDPOINT/);
  });
});

describe('exemplars pass stage 4', () => {
  const { p } = testPipeline();
  const list = exemplarDirs(p.paths.templatesDir);
  it('finds the exemplar directory', () => {
    expect(Array.isArray(list)).toBe(true);
  });
  for (const ex of list)
    it(`${ex.family}/${ex.unit} is lint-clean`, () => {
      const report = lintExemplar(p, ex);
      expect(report.findings.filter((f) => f.severity === 'error')).toEqual([]);
    });
});
