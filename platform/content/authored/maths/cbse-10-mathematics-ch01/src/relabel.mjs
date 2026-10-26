// Relabel metadata of bank items by key, e.g. difficulty or competency, without hand-editing long lines.
// Usage: node relabel.mjs <questions.mjs> key=field:value ...  (edits the first `field: ` after Q('key' / caseQ('key')
import fs from 'node:fs';

const [file, ...edits] = process.argv.slice(2);
let s = fs.readFileSync(file, 'utf8');
for (const e of edits) {
  const [key, fv] = e.split('=');
  const [field, value] = fv.split(':');
  const at = s.indexOf(`Q('${key}'`);
  if (at < 0) throw new Error(`no ${key}`);
  const re = new RegExp(String.raw`\b${field}: ('[a-z]+'|\d)`, 'g');
  re.lastIndex = at;
  const m = re.exec(s);
  if (!m) throw new Error(`no ${field} after ${key}`);
  const val = /^\d$/.test(value) ? value : `'${value}'`;
  s = s.slice(0, m.index) + `${field}: ${val}` + s.slice(m.index + m[0].length);
  console.log(`${key}: ${m[0]} -> ${field}: ${val}`);
}
fs.writeFileSync(file, s);
