// Writes each diagram to a folder for viewing: npx tsx content/authored/physics/cbse-12-physics-ch04/src/dump-svgs.mjs <outdir>
import fs from 'node:fs';
import path from 'node:path';
import { ALL, SELF_CHECKS } from './svgs.mjs';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
for (const [k, v] of Object.entries(ALL)) fs.writeFileSync(path.join(out, `${k}.svg`), v.replace('fill="none"', 'fill="none" style="color:#222;--diagram-accent:#c60;--diagram-muted:#888;--diagram-fill:#eee;--diagram-red:#d22;--diagram-blue:#22d;--diagram-green:#191"'));
console.log(SELF_CHECKS.join('\n'));
console.log(Object.entries(ALL).map(([k, v]) => `${k} ${v.length}`).join('\n'));
