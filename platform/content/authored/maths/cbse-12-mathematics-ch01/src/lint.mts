// Runs the pipeline's stage-4 lint (the same lintExemplar used by `content lint --exemplars`) over
// authored chapter dirs. Usage (from platform/): npx tsx content/authored/maths/cbse-12-mathematics-chNN/src/lint.mts <chapterDir>...
import path from 'node:path';
import { openPipeline } from '../../../../../content-pipeline/src/pipeline';
import { lintExemplar } from '../../../../../content-pipeline/src/commands/lint';

const p = openPipeline({}, { log: () => {} });
let failed = 0;
for (const dir of process.argv.slice(2)) {
  const unit = path.basename(path.resolve(dir));
  const r = lintExemplar(p, { family: 'maths', dir: path.resolve(dir), unit });
  console.log(`${unit}: ${r.errors} error(s), ${r.warnings} warning(s)`);
  for (const f of r.findings) console.log(`  ${f.severity.padEnd(7)} ${f.item} ${f.rule} ${f.path}: ${f.message}`);
  if (r.errors) failed++;
}
process.exitCode = failed ? 1 : 0;
