#!/usr/bin/env node
// Turns Checkov's JSON report into GitHub annotations and the CI verdict (INFRA-15).
//   node checkov-summary.mjs <results_json.json>
// Fails when: any check failed, any file could not be parsed, or nothing was scanned (a silent
// parser problem must never look like a clean scan).
import { readFileSync } from 'node:fs';

const file = process.argv[2];
let data;
try {
  data = JSON.parse(readFileSync(file, 'utf8'));
} catch (err) {
  console.log(`::error title=Checkov::no readable report at ${file}: ${err.message}`);
  process.exit(1);
}
const reports = Array.isArray(data) ? data : [data];
let passed = 0;
let failed = 0;
let skipped = 0;
let parsingErrors = 0;
let resources = 0;
for (const r of reports) {
  const s = r.summary ?? {};
  passed += s.passed ?? 0;
  failed += s.failed ?? 0;
  skipped += s.skipped ?? 0;
  parsingErrors += s.parsing_errors ?? 0;
  resources += s.resource_count ?? 0;
  for (const c of r.results?.failed_checks ?? []) {
    const path = `platform/infra${c.file_path ?? ''}`.replace('/infra/infra', '/infra');
    const line = c.file_line_range?.[0] ?? 1;
    console.log(`::error file=${path},line=${line},title=Checkov ${c.check_id}::${c.check_name} (${c.resource})`);
  }
  for (const p of r.results?.parsing_errors ?? []) console.log(`::error title=Checkov parsing error::${p}`);
}
const summary = `Checkov: ${resources} resources, ${passed} passed, ${failed} failed, ${skipped} skipped (justified in .checkov.yaml), ${parsingErrors} parsing errors`;
console.log(`::notice title=Checkov summary::${summary}`);
const bad = failed > 0 || parsingErrors > 0 || resources === 0;
if (resources === 0) console.log('::error title=Checkov::no resources were scanned - treat as a parser failure');
process.exit(bad ? 1 : 0);
