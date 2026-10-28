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
// and one source check on modules/storage.bicep:
//   - S6-L02 Blob write contract: the containers each identity can write (Blob Data Contributor/Owner)
//     are exactly the ones its code writes (BLOB_WRITE_CONTRACT below), so a missing grant (403 at run
//     time) or an extra one fails here.
// and the billing contract (ADR-016, D-038, runbooks/billing-go-live.md):
//   - main.bicep's razorpaySecrets names exactly the three Key Vault secrets, each for api, worker and
//     the billing job; no Bicep source sets a Razorpay credential as a plain env value.
//   - every params file: no RAZORPAY_* app setting (main.bicep wires them), no Razorpay secret in
//     appSecrets, no Razorpay key id anywhere; deployBilling=true needs kvSecretRefs=true.
// Bicep binary: $BICEP_BIN, else `bicep` on PATH (CI downloads a pinned, checksum-verified release).
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
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

/**
 * S6-L02: which Blob containers each identity's code writes (put/delete/SAS write).
 *   api       uploads-quarantine (write SAS, delete), uploads (in-process cleaning, account deletion)
 *   worker    both upload containers (processing, retention, purge), content-releases, public-assets
 *   migrator  content-releases (release job)
 *   frontdoor nothing (reads public-assets)
 */
const BLOB_WRITE_CONTRACT = {
  apiPrincipalId: ['uploads', 'uploads-quarantine'],
  workerPrincipalId: ['content-releases', 'public-assets', 'uploads', 'uploads-quarantine'],
  migratorPrincipalId: ['content-releases'],
  frontDoorPrincipalId: [],
};
function blobWriteContract() {
  const src = readFileSync(join(here, 'modules', 'storage.bicep'), 'utf8').replace(/\r\n/g, '\n');
  const containers = new Map([...src.matchAll(/resource (\w+) 'Microsoft\.Storage\/storageAccounts\/blobServices\/containers@[^']+' = \{\s*parent: \w+\s*name: '([^']+)'/g)].map((m) => [m[1], m[2]]));
  const writes = new Map(Object.keys(BLOB_WRITE_CONTRACT).map((k) => [k, new Set()]));
  const writeRole = /roleDefinitionId: roles\.(blobDataContributor|blobDataOwner)\b/;
  // Single assignments: scope = a container symbol.
  for (const m of src.matchAll(/^resource \w+ 'Microsoft\.Authorization\/roleAssignments@[^']+' = \{([\s\S]*?)^\}/gm)) {
    const body = m[1];
    const scope = /scope: (\w+)/.exec(body)?.[1];
    const principal = /principalId: (\w+)/.exec(body)?.[1];
    if (!principal || !writeRole.test(body)) continue;
    if (!containers.has(scope)) throw new Error(`S6-L02: write role for ${principal} at a non-container scope (${scope})`);
    if (!writes.has(principal)) writes.set(principal, new Set());
    writes.get(principal).add(containers.get(scope));
  }
  // The worker's loop over workerContainerNames (one assignment per name).
  const loop = /var workerContainerNames = \[([\s\S]*?)\]/.exec(src);
  const loopBody = /^resource workerContainers 'Microsoft\.Authorization\/roleAssignments@[^']+' = \[([\s\S]*?)^\]/m.exec(src)?.[1] ?? '';
  if (loop && writeRole.test(loopBody) && /principalId: workerPrincipalId/.test(loopBody)) for (const n of loop[1].matchAll(/'([^']+)'/g)) writes.get('workerPrincipalId').add(n[1]);
  let bad = 0;
  for (const [principal, set] of writes) {
    const want = (BLOB_WRITE_CONTRACT[principal] ?? []).slice().sort().join(', ');
    const got = [...set].sort().join(', ');
    const ok = want === got;
    if (!ok) bad++;
    console.log(`  S6-L02 blob writes ${principal}: ${got || '(none)'}${ok ? '' : `  -- expected ${want || '(none)'}`}`);
  }
  return bad;
}

/**
 * Billing (ADR-016): the Razorpay settings reach the apps ONLY as Key Vault secret references, all three
 * together, for api + worker + the billing job (billing/config.ts refuses RAZORPAY_PROVIDER=razorpay
 * without any of them, so a partial set would stop the apps from starting).
 */
const RAZORPAY_SECRETS = {
  'razorpay-key-id': 'RAZORPAY_KEY_ID',
  'razorpay-key-secret': 'RAZORPAY_KEY_SECRET',
  'razorpay-webhook-secret': 'RAZORPAY_WEBHOOK_SECRET',
};
const RAZORPAY_APPS = ['api', 'worker', 'billing'];
const RAZORPAY_CREDENTIAL_ENVS = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_WEBHOOK_SECRET', 'RAZORPAY_WEBHOOK_SECRET_PREVIOUS'];
const RAZORPAY_KEY_ID_RE = /rzp_(live|test)_[A-Za-z0-9]{6,}/;

function billingSourceContract(mainJson) {
  let bad = 0;
  const fail = (msg) => {
    bad++;
    console.log(`  BILLING: ${msg}`);
  };
  const list = mainJson?.variables?.razorpaySecrets;
  if (!Array.isArray(list)) fail('main.bicep has no razorpaySecrets variable');
  else {
    const names = list.map((s) => s.secretName).sort();
    if (names.join(',') !== Object.keys(RAZORPAY_SECRETS).sort().join(',')) fail(`razorpaySecrets must name exactly ${Object.keys(RAZORPAY_SECRETS).join(', ')} (got ${names.join(', ')})`);
    for (const s of list) {
      if (RAZORPAY_SECRETS[s.secretName] && s.envName !== RAZORPAY_SECRETS[s.secretName]) fail(`${s.secretName} must map to ${RAZORPAY_SECRETS[s.secretName]} (got ${s.envName})`);
      const missing = RAZORPAY_APPS.filter((a) => !(s.apps ?? []).includes(a));
      if (missing.length) fail(`${s.secretName} is not referenced by ${missing.join(', ')}`);
      if ('value' in s) fail(`${s.secretName} carries a value; only the secret NAME may be in Bicep`);
    }
  }
  // Safe order: wiring billing must first prove the three secrets exist (keyvault.bicep existence gate).
  const mainSrc = readFileSync(join(here, 'main.bicep'), 'utf8');
  if (!/requiredSecretNames:\s*billingWired\s*\?\s*map\(razorpaySecrets,/.test(mainSrc)) fail('main.bicep must pass the Razorpay secret names to the Key Vault existence gate (requiredSecretNames) when billing is wired');
  // A plain env entry `name: 'RAZORPAY_KEY_SECRET'` (etc.) anywhere in the Bicep sources would bypass Key Vault.
  for (const f of ['main.bicep', ...readdirSync(join(here, 'modules')).map((m) => join('modules', m))]) {
    if (!f.endsWith('.bicep')) continue;
    const src = readFileSync(join(here, f), 'utf8');
    for (const env of RAZORPAY_CREDENTIAL_ENVS) if (new RegExp(`name:\\s*'${env}'`).test(src)) fail(`${f} sets ${env} as a plain env entry; it must come from a Key Vault secret reference`);
    if (RAZORPAY_KEY_ID_RE.test(src)) fail(`${f} contains a Razorpay key id`);
    // `existing` references (the keyvault.bicep existence gate) are fine; a declared secret is not.
    if (/^resource \w+ 'Microsoft\.KeyVault\/vaults\/secrets@[^']+' = /m.test(src)) fail(`${f} creates a Key Vault secret; secret values are set by the owner, never by Bicep`);
  }
  console.log(`  billing: razorpaySecrets ${Array.isArray(list) ? list.map((s) => `${s.secretName}->${s.envName} [${s.apps.join(',')}]`).join('; ') : '(missing)'}; ${bad} problem(s)`);
  return bad;
}

function billingParamsContract(params) {
  const problems = [];
  const val = (k) => params[k]?.value;
  for (const k of Object.keys(val('appSettings') ?? {})) if (/^RAZORPAY_/.test(k)) problems.push(`appSettings.${k}: Razorpay settings are wired by main.bicep (deployBilling), never as app settings`);
  for (const s of val('appSecrets') ?? []) if (/^razorpay-/.test(s.secretName) || /^RAZORPAY_/.test(s.envName)) problems.push(`appSecrets ${s.secretName}: the Razorpay secrets come from main.bicep razorpaySecrets (all three together, deployBilling)`);
  const ids = [];
  (function scan(v, path) {
    if (typeof v === 'string') {
      if (RAZORPAY_KEY_ID_RE.test(v)) ids.push(path);
    } else if (Array.isArray(v)) v.forEach((x, i) => scan(x, `${path}[${i}]`));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) scan(x, `${path}.${k}`);
  })(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, v.value])), 'params');
  for (const p of ids) problems.push(`${p} contains a Razorpay key id; keys live in Key Vault only`);
  if (val('deployBilling') === true && val('kvSecretRefs') !== true) problems.push('deployBilling=true needs kvSecretRefs=true (the Razorpay settings are Key Vault references)');
  for (const p of problems) console.log(`  BILLING: ${p}`);
  return { problems: problems.length, on: val('deployBilling') === true };
}

console.log(`bicep: ${run(['--version']).stdout.trim()}`);
console.log('\n# storage.bicep blob write contract (S6-L02)');
errors += blobWriteContract();

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
    if (t === 'main.bicep') errors += billingSourceContract(JSON.parse(b.stdout));
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
  for (const k of ['aiLocation', 'speechLocation', 'contentSafetyLocation']) {
    if (val(k) !== undefined && !INDIA_REGIONS.has(val(k))) {
      console.log(`  INFRA-9/ADR-008: ${k} must be an Indian region, got ${val(k)}`);
      errors++;
    }
  }
  // ADR-008: model deployments name a known tier (main.bicep maps tiers to AZURE_OPENAI_DEPLOYMENT_*),
  // a real model version and an approved deployment type.
  const AOAI_TIERS = new Set(['small', 'mid', 'verify', 'embedding', 'small-batch', 'mid-batch']);
  const AOAI_SKUS = new Set(['GlobalStandard', 'DataZoneStandard', 'Standard', 'GlobalBatch', 'DataZoneBatch']);
  for (const d of val('aoaiDeployments') ?? []) {
    const problems = [];
    if (!AOAI_TIERS.has(d.tier)) problems.push(`unknown tier "${d.tier}"`);
    if (!AOAI_SKUS.has(d.skuName)) problems.push(`skuName "${d.skuName}" not in ADR-008`);
    if (d.tier?.endsWith('-batch') !== /Batch$/.test(d.skuName ?? '')) problems.push('batch tiers (and only they) use a *Batch sku');
    if (val('aoaiDeployModels') && !/^[0-9]/.test(String(d.version))) problems.push(`placeholder version "${d.version}" with aoaiDeployModels=true`);
    if (!(d.capacity > 0)) problems.push('capacity must be > 0');
    for (const p of problems) console.log(`  ADR-008: aoaiDeployments ${d.name}: ${p}`);
    errors += problems.length;
  }
  const leaks = [];
  for (const [k, v] of Object.entries(params)) scanSecrets(v.value, k, leaks);
  for (const l of leaks) console.log(`  GEN-1: parameter value looks like a credential: ${l}`);
  errors += leaks.length;
  const billing = billingParamsContract(params);
  errors += billing.problems;
  console.log(`  ${Object.keys(params).length} parameters; location=${val('location')}${val('aiLocation') ? `, ai=${val('aiLocation')}/${val('speechLocation')}/${val('contentSafetyLocation')} (openai/speech/safety)` : ''}; credential-like values: ${leaks.length}; billing ${billing.on ? 'ON' : 'off'} (${billing.problems} problem(s))`);
}

console.log('\n| step | file | errors | warnings |\n|---|---|---|---|');
for (const r of rows) console.log(`| ${r.step} | ${relative('.', r.file).replaceAll('\\', '/')} | ${r.errors} | ${r.warnings} |`);
console.log(`\nTotal: ${errors} error(s), ${warnings} warning(s)${strict ? ' (strict: warnings fail)' : ''}`);
process.exit(errors > 0 || (strict && warnings > 0) ? 1 : 0);
