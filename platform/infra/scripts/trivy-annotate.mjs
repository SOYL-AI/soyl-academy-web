#!/usr/bin/env node
// Prints Trivy JSON findings as GitHub annotations (so failures are readable without log access)
// and exits 1 when any HIGH/CRITICAL vulnerability with a fix is present (INFRA-15).
//   node trivy-annotate.mjs <trivy.json> <label>
import { readFileSync } from 'node:fs';

const [file, label = 'image'] = process.argv.slice(2);
const report = JSON.parse(readFileSync(file, 'utf8'));
const findings = [];
for (const r of report.Results ?? []) {
  for (const v of r.Vulnerabilities ?? []) {
    findings.push(`${v.Severity} ${v.VulnerabilityID} ${v.PkgName}@${v.InstalledVersion} -> ${v.FixedVersion || 'no fix'} (${r.Target})`);
  }
}
for (const f of findings.slice(0, 40)) console.log(`::error title=trivy ${label}::${f}`);
if (findings.length > 40) console.log(`::error title=trivy ${label}::... and ${findings.length - 40} more`);
console.log(`::notice title=trivy ${label}::${findings.length} HIGH/CRITICAL fixable vulnerabilities`);
process.exit(findings.length ? 1 : 0);
