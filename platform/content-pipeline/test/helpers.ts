import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { openPipeline, type Pipeline, type PipelineOptions } from '../src/pipeline';
import { generateCommand } from '../src/commands/generate';
import { readUnitBundle, lintContextFor } from '../src/commands/lint';
import { findChapter } from '../src/catalog';
import type { LintContext, UnitBundle } from '../src/lint/index';

export function tempDir(prefix = 'soyl-pipeline-'): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

export function testPipeline(opts: Partial<PipelineOptions> = {}, env: Record<string, string | undefined> = {}): { p: Pipeline; logs: string[]; dir: string } {
  const dir = tempDir();
  const logs: string[] = [];
  const p = openPipeline(
    { provider: 'mock', ...opts },
    {
      paths: { stateDir: path.join(dir, 'state'), outDir: path.join(dir, 'out') },
      env: { NODE_ENV: 'test', ...env },
      log: (l) => logs.push(l),
    },
  );
  return { p, logs, dir };
}

export const UNIT = 'cbse-10-science-ch01';
export const SCOPE = { board: 'cbse', class: 10, subject: 'science', chapter: 1 } as const;

let cached: { bundle: UnitBundle; ctx: LintContext } | null = null;

/** A lint-clean mock bundle for cbse-10-science-ch01 (generated once per test file). */
export async function mockBundle(): Promise<{ bundle: UnitBundle; ctx: LintContext }> {
  if (!cached) {
    const { p } = testPipeline();
    await generateCommand(p, SCOPE);
    const { bundle } = readUnitBundle(path.join(p.paths.outDir, UNIT));
    cached = { bundle, ctx: lintContextFor(findChapter(p.catalog, UNIT)!, true) };
  }
  return structuredClone(cached);
}
