// Writes this chapter's SVGs to a JSON file for rasterising (usage: npx tsx …/dump-svgs.mjs <chapter> <out.json>).
import fs from 'node:fs';
const [ch, out] = process.argv.slice(2);
const mod = await import(`../../cbse-10-science-${ch}/src/svgs.mjs`);
fs.writeFileSync(out, JSON.stringify(mod.ALL));
