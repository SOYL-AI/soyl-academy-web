// Local stage-6 bank-duplicate check (same nearDuplicates/words and thresholds as `content originality`) within this chapter.
import fs from 'node:fs';
import { nearDuplicates, words } from '../../../../../content-pipeline/src/originality/ngrams';
import { ORIGINALITY } from '../../../../../content-pipeline/config/pipeline';
const rel = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const c = rel.questions.map((q) => ({ id: q.id, unit: rel.unit, text: `${q.passage_md ?? ''}\n${q.stem_md}` }));
const seen = new Map(); let n = 0;
for (const x of c) { const k = words(x.text).join(' '); if (k.split(' ').length >= 6 && seen.has(k)) { n++; console.log('exact', x.id, seen.get(k)); } seen.set(k, x.id); }
for (const d of nearDuplicates(c, ORIGINALITY.duplicate)) { n++; console.log('near', d.a.id, d.b.id, d.similarity.toFixed(2)); }
console.log(`${c.length} questions, ${n} duplicate flags`);
