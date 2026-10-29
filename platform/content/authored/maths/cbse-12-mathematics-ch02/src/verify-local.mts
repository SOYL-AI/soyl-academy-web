// Local stage-5 deterministic checks (the same deterministicChecks used by `content verify`) for this chapter only.
import fs from 'node:fs';
import { deterministicChecks } from '../../../../../content-pipeline/src/verify/checks';
const rel = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let n = 0;
for (const q of rel.questions) for (const f of deterministicChecks(q)) { n++; console.log(f.severity, f.ref, f.check, f.message); }
console.log(`${rel.questions.length} questions, ${n} flags`);
