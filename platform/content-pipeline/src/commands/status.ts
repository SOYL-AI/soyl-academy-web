/** `status`: per-unit stage status in scope, recent runs and the spend ledger. */
import { unitsInScope, type Scope } from '../catalog';
import { inr, table } from '../io';
import type { Pipeline } from '../pipeline';
import type { Stage } from '../state';

export async function statusCommand(p: Pipeline, scope: Scope): Promise<{ exitCode: number }> {
  const refs = unitsInScope(p.catalog, scope);
  const stages: Stage[] = ['outline', 'generate', 'lint', 'verify', 'originality', 'tts', 'publish'];
  const rows: (string | number)[][] = [];
  let needsReview = 0;
  for (const ref of refs) {
    const recs = await Promise.all(stages.map((s) => p.store.getUnitStage(ref.chapter.id, s)));
    if (!recs.some(Boolean) && refs.length > 20) continue;
    const cells = recs.map((r) => {
      if (!r) return '—';
      const items = Object.values(r.items);
      const done = items.filter((i) => i.status === 'done').length;
      needsReview += items.filter((i) => i.status === 'needs_review').length;
      return `${r.status} ${done}/${items.length}`;
    });
    const cost = recs.reduce((n, r) => n + Object.values(r?.items ?? {}).reduce((m, i) => m + i.cost_paise, 0), 0);
    rows.push([ref.chapter.id, ...cells, inr(cost)]);
  }
  if (rows.length) p.log(table(['unit', ...stages, 'cost'], rows, ['l', ...stages.map(() => 'l' as const), 'r']));
  else p.log('no pipeline state for units in scope yet.');
  if (needsReview) p.log(`${needsReview} item(s) need review (re-run with --retry-review after fixing templates)`);

  const runs = (await p.store.listRuns()).slice(-8);
  if (runs.length) {
    p.log('');
    p.log('recent runs:');
    p.log(
      table(
        ['run', 'command', 'provider', 'status', 'items', 'spend'],
        runs.map((r) => [r.id, r.command, r.provider, r.status, Object.entries(r.counts).map(([k, v]) => `${k} ${v}`).join(', '), `${inr(r.budget.spent_paise)}${r.budget.simulated ? ' (sim)' : ''}`]),
        ['l', 'l', 'l', 'l', 'l', 'r'],
      ),
    );
    const inflight = runs.filter((r) => r.batch);
    for (const r of inflight) p.log(`  run ${r.id} has batch ${r.batch!.job_id} (${r.batch!.state}): resume with --run ${r.id} --batch`);
  }
  const real = await p.store.spentPaise({ simulated: false });
  const sim = await p.store.spentPaise({ simulated: true });
  p.log(`spend ledger: real ${inr(real)}, simulated (mock) ${inr(sim)}`);
  return { exitCode: 0 };
}
