/** `catalog` (stage 1): validate every catalog file and print counts. Non-zero exit on any error. */
import { familyForSubject } from '../../config/families';
import { table } from '../io';
import type { Pipeline } from '../pipeline';

export function catalogCommand(p: Pipeline, opts: { verbose?: boolean } = {}): { exitCode: number } {
  const c = p.catalog;
  const errors = c.issues.filter((i) => i.severity === 'error');
  const warnings = c.issues.filter((i) => i.severity === 'warning');
  const rows = new Map<string, { subjects: number; syllabi: number; chapters: number; topics: number; blueprints: number }>();
  for (const s of c.subjects) {
    const key = `${s.board}|${s.exam}|${s.class}`;
    const row = rows.get(key) ?? { subjects: 0, syllabi: 0, chapters: 0, topics: 0, blueprints: 0 };
    row.subjects++;
    const syl = c.syllabi.get(s.id);
    if (syl) {
      row.syllabi++;
      row.chapters += syl.chapters.length;
      row.topics += syl.chapters.reduce((n, ch) => n + ch.topics.length, 0);
    }
    row.blueprints += c.blueprints.filter((b) => b.subject_id === s.id).length;
    rows.set(key, row);
  }
  for (const b of c.blueprints.filter((x) => x.subject_id === null)) {
    const row = rows.get(`${b.board}|${b.exam}|${b.class}`);
    if (row) row.blueprints++;
  }
  const sorted = [...rows.entries()].sort(([a], [b]) => {
    const [ba, ea, ca] = a.split('|');
    const [bb, eb, cb] = b.split('|');
    return ba!.localeCompare(bb!) || Number(ca) - Number(cb) || ea!.localeCompare(eb!);
  });
  const total = { subjects: 0, syllabi: 0, chapters: 0, topics: 0, blueprints: 0 };
  for (const [, r] of sorted) for (const k of Object.keys(total) as (keyof typeof total)[]) total[k] += r[k];
  p.log(`catalog: ${c.dir}`);
  p.log(
    table(
      ['board', 'exam', 'class', 'subjects', 'syllabi', 'chapters', 'topics', 'blueprints'],
      [
        ...sorted.map(([key, r]) => [...key.split('|'), r.subjects, r.syllabi, r.chapters, r.topics, r.blueprints]),
        ['total', '', '', total.subjects, total.syllabi, total.chapters, total.topics, total.blueprints],
      ],
      ['l', 'l', 'r', 'r', 'r', 'r', 'r', 'r'],
    ),
  );
  const families = new Map<string, number>();
  const unknown: string[] = [];
  for (const s of c.subjects) {
    const f = familyForSubject(s);
    families.set(f.family, (families.get(f.family) ?? 0) + 1);
    if (f.matchedBy === 'unknown') unknown.push(s.id);
  }
  p.log(`families: ${[...families.entries()].sort().map(([f, n]) => `${f} ${n}`).join(', ')}`);
  p.log(`unmapped subjects (fell back to "other"): ${unknown.length ? unknown.join(', ') : 'none'}`);
  for (const w of opts.verbose ? warnings : warnings.slice(0, 10)) p.log(`  warning ${w.file}: ${w.message}`);
  if (!opts.verbose && warnings.length > 10) p.log(`  … ${warnings.length - 10} more warnings (--verbose)`);
  for (const e of errors) p.log(`  ERROR ${e.file}: ${e.message}`);
  p.log(`catalog ${errors.length ? 'INVALID' : 'valid'}: ${errors.length} error(s), ${warnings.length} warning(s)`);
  return { exitCode: errors.length ? 1 : 0 };
}
