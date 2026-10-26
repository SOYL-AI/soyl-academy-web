#!/usr/bin/env node
// Offline validation of the Bicep in platform/infra (no Azure credentials needed).
//
//   node platform/infra/validate.mjs            # errors fail, warnings are reported
//   node platform/infra/validate.mjs --strict   # CI: warnings fail too
//
// Runs: `bicep build` + `bicep lint` on main.bicep and shared.bicep, `bicep build-params` on every
// params/*.bicepparam, then two policy checks on the compiled JSON:
//   - INFRA-9: every literal resource location is `centralindia` or `global`, and every params file
//     pins location=centralindia and an Indian aiLocation (ADR-008).
//   - GEN-1: no parameter value looks like a credential (long random-looking strings, connection
//     strings, private keys).
// Bicep binary: $BICEP_BIN, else `bicep` on PATH (CI downloads a pinned, checksum-verified release).
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const strict = process.argv.includes('--strict');
const bicep = process.env.BICEP_BIN || 'bicep';
const templates = ['main.bicep', 'shared.bicep'];
const paramFiles = readdirSync(join(here, 'params'))
  .filter((f) => f.endsWith('.bicepparam'))
  .map((f) => join('params', f));

const INDIA_REGIONS = new Set(['centralindia', 'southindia', 'westindia']);
const ALLOWED_LITERAL_LOCATIONS = new Set(['centralindia', 'global']);

let errors = 0;
let warnings = 0;
const rows = [];

function run(args) {
  const r = spawnSync(bicep, args, { cwd: here, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.error) {
    console.error(`cannot run "${bicep}": ${r.error.message}. Set BICEP_BIN or put bicep on PATH.`);
    process.exit(2);
  }
  const diag = `${r.stderr ?? ''}`
    .split(/\r?\n/)
    .filter((l) => /: (Error|Warning|Info) /.test(l))
    .map((l) => l.replace(here, '').replace(/^[\\/]/, ''));
  const e = diag.filter((l) => /: Error /.test(l)).length + (r.status !== 0 && !diag.some((l) => /: Error /.test(l)) ? 1 : 0);
  const w = diag.filter((l) => /: Warning /.test(l)).length;
  return { status: r.status, stdout: r.stdout, diag, e, w };
}

function record(step, file, res) {
  errors += res.e;
  warnings += res.w;
  rows.push({ step, file, errors: res.e, warnings: res.w });
  for (const l of res.diag) console.log(`  ${l}`);
}

function walkLocations(node, path, out) {
  if (Array.isArray(node)) node.forEach((n, i) => walkLocations(n, `${path}[${i}]`, out));
  else if (node && typeof node === 'object') {
    if (typeof node.type === 'string' && typeof node.location === 'string' && !node.location.startsWith('[')) {
      out.push({ path, type: node.type, location: node.location });
    }
    for (const [k, v] of Object.entries(node)) walkLocations(v, `${path}.${k}`, out);
  }
}

const SECRET_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /(AccountKey|SharedAccessKey|Password|pwd)=/i,
  /[a-z]+:\/\/[^/\s:@]+:[^/\s@]+@/i, // credentials in a URL
  /^[A-Za-z0-9+/=_-]{40,}$/, // long opaque token
];
function scanSecrets(value, path, out) {
  if (typeof value === 'string') {
    if (SECRET_PATTERNS.some((re) => re.test(value))) out.push(path);
  } else if (Array.isArray(value)) value.forEach((v, i) => scanSecrets(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) scanSecrets(v, `${path}.${k}`, out);
}

console.log(`bicep: ${run(['--version']).stdout.trim()}`);

for (const t of templates) {
  console.log(`\n# bicep build ${t}`);
  const b = run(['build', t, '--stdout']);
  record('build', t, b);
  if (b.status === 0) {
    const found = [];
    walkLocations(JSON.parse(b.stdout), t, found);
    const bad = found.filter((f) => !ALLOWED_LITERAL_LOCATIONS.has(f.location));
    for (const f of bad) console.log(`  INFRA-9: ${f.type} has literal location "${f.location}" (${f.path})`);
    errors += bad.length;
    console.log(`  INFRA-9: ${found.length} literal locations checked (only centralindia/global allowed), ${bad.length} violations`);
  }
  console.log(`# bicep lint ${t}`);
  record('lint', t, run(['lint', t]));
}

for (const p of paramFiles) {
  console.log(`\n# bicep build-params ${p}`);
  const r = run(['build-params', p, '--stdout']);
  record('build-params', p, r);
  if (r.status !== 0) continue;
  const params = JSON.parse(JSON.parse(r.stdout).parametersJson).parameters;
  const val = (k) => params[k]?.value;
  if (val('location') !== 'centralindia') {
    console.log(`  INFRA-9: location must be centralindia, got ${val('location')}`);
    errors++;
  }
  if (val('aiLocation') !== undefined && !INDIA_REGIONS.has(val('aiLocation'))) {
    console.log(`  INFRA-9/ADR-008: aiLocation must be an Indian region, got ${val('aiLocation')}`);
    errors++;
  }
  const leaks = [];
  for (const [k, v] of Object.entries(params)) scanSecrets(v.value, k, leaks);
  for (const l of leaks) console.log(`  GEN-1: parameter value looks like a credential: ${l}`);
  errors += leaks.length;
  console.log(`  ${Object.keys(params).length} parameters; location=${val('location')}${val('aiLocation') ? `, aiLocation=${val('aiLocation')}` : ''}; credential-like values: ${leaks.length}`);
}

console.log('\n| step | file | errors | warnings |\n|---|---|---|---|');
for (const r of rows) console.log(`| ${r.step} | ${relative('.', r.file).replaceAll('\\', '/')} | ${r.errors} | ${r.warnings} |`);
console.log(`\nTotal: ${errors} error(s), ${warnings} warning(s)${strict ? ' (strict: warnings fail)' : ''}`);
process.exit(errors > 0 || (strict && warnings > 0) ? 1 : 0);
