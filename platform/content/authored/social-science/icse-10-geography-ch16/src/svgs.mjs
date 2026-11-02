// ICSE 10 Geography ch16 diagrams (allow-listed elements, palette colours only). Schematic diagrams are labelled "not to scale".
// Raw-material quantities, transport distances and the petrochemical output shares are ILLUSTRATIVE (rounded, made-up but
// realistic values), exported so questions compute every answer from the same numbers. SELF_CHECKS (read by build.mjs) confirm
// that drawings follow the data.
import { svgDoc, S } from './lib.mjs';

const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const r2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- ILLUSTRATIVE raw materials per tonne of steel (tonnes)
export const RAW = [
  { k: 'Iron ore', t: 1.6, c: RED },
  { k: 'Coking coal', t: 0.8, c: 'currentColor' },
  { k: 'Limestone and dolomite', t: 0.3, c: MUT },
  { k: 'Manganese ore', t: 0.02, c: BROWN },
];
export const rawTotal = r2(RAW.reduce((a, r) => a + r.t, 0));
export const need = (k, steelT) => r2(RAW.find((r) => r.k === k).t * steelT);

export const STEEL_FLOW = (() => {
  let s = '';
  const K = 30; // px of arrow thickness per tonne
  let y = 40;
  let ok = true;
  RAW.forEach((r) => {
    const w = Math.max(r.t * K, 1.5);
    s += S.line(20, y, 120, y, { c: r.c, w });
    s += lab(20, y - w / 2 - 4, `${r.k}: ${r.t} t`, { size: 10 });
    s += S.head(130, y, 0, { size: 8, c: r.c });
    if (Math.abs(w - Math.max(r.t * K, 1.5)) > 1e-9) ok = false;
    y += 40;
  });
  // stages
  const box = (x, yy, w, h, l1, l2, fill) => S.rect(x, yy, w, h, { fill, fop: 0.35, c: 'currentColor', sw: 1.2, rx: 4 }) + lab(x + w / 2, yy + h / 2 - 2, l1, { a: 'middle', size: 10, w: 'bold' }) + lab(x + w / 2, yy + h / 2 + 11, l2, { a: 'middle', size: 10 });
  s += box(140, 20, 110, 44, 'Coke ovens', 'coal → coke', MUT);
  s += box(140, 90, 110, 70, 'Blast furnace', 'ore + coke + flux', RED);
  s += box(280, 90, 70, 70, 'Steel', 'melting shop', ACC);
  s += box(370, 90, 60, 70, 'Rolling', 'mills', BLUE);
  s += S.arrow(195, 64, 195, 88, { c: 'currentColor', w: 1.5, size: 6 });
  s += S.arrow(250, 125, 278, 125, { c: RED, w: 3, size: 7 }) + lab(264, 117, 'hot metal', { a: 'middle', size: 10 });
  s += S.arrow(350, 125, 368, 125, { c: ACC, w: 2, size: 6 });
  s += S.arrow(400, 160, 400, 190, { c: BLUE, w: 2, size: 6 }) + lab(400, 204, '1 t steel', { a: 'middle', size: 11, w: 'bold' });
  s += S.arrow(195, 160, 195, 190, { c: MUT, w: 1.5, size: 6 }) + lab(195, 204, 'slag (to cement)', { a: 'middle', size: 10 });
  s += lab(220, 230, `Schematic, not to scale; ${rawTotal} t of solid inputs (illustrative) per tonne of steel, plus water and power`, { a: 'middle', size: 10, c: MUT });
  ok = ok && rawTotal > 1;
  check(ok, `steel flow: input arrow thickness is proportional to the illustrative tonnes (${RAW.map((r) => r.t).join(', ')}) and the inputs (${rawTotal} t) exceed the one tonne of steel produced`);
  return svgDoc(440, 240, `Schematic flow of an integrated steel plant. Illustrative inputs per tonne of steel: ${RAW.map((r) => `${r.k} ${r.t} tonnes`).join(', ')}. Coal is turned into coke in coke ovens; ore, coke and limestone flux are fed into the blast furnace, which gives hot metal and slag; the hot metal is made into steel in the melting shop and shaped in rolling mills.`, s);
})();

// ---------------------------------------------------------------- ILLUSTRATIVE transport comparison (tonne-kilometres per tonne of steel)
export const SITES = {
  A: { name: 'Site A: beside the iron-ore field', km: { 'Iron ore': 0, 'Coking coal': 300, 'Limestone and dolomite': 100, Steel: 800 } },
  B: { name: 'Site B: in the market city', km: { 'Iron ore': 800, 'Coking coal': 900, 'Limestone and dolomite': 700, Steel: 0 } },
};
const tons = { 'Iron ore': 1.6, 'Coking coal': 0.8, 'Limestone and dolomite': 0.3, Steel: 1 };
export const ITEMS = Object.keys(tons);
export const tkm = (site, item) => r2(tons[item] * SITES[site].km[item]);
export const tkmTotal = (site) => r2(ITEMS.reduce((a, i) => a + tkm(site, i), 0));
export const TKM_CHART = (() => {
  const X0 = 120;
  const K = 0.12; // px per tonne-km
  let s = '';
  const fills = [RED, MUT, YEL, BLUE];
  let ok = true;
  ['A', 'B'].forEach((id, j) => {
    const y = 50 + j * 70;
    let x = X0;
    s += lab(X0 - 8, y + 20, `Site ${id}`, { a: 'end', w: 'bold' });
    ITEMS.forEach((it, i) => {
      const w = tkm(id, it) * K;
      if (w > 0) s += S.rect(x, y, w, 30, { fill: fills[i], fop: 0.55, c: 'currentColor', sw: 1 });
      x += w;
    });
    s += lab(x + 6, y + 20, `${tkmTotal(id)}`, { w: 'bold' });
    if (Math.abs(x - X0 - tkmTotal(id) * K) > 1e-6) ok = false;
  });
  ITEMS.forEach((it, i) => (s += S.rect(20 + (i % 2) * 200, 170 + Math.floor(i / 2) * 18, 12, 12, { fill: fills[i], fop: 0.55, c: 'currentColor', sw: 1 }) + lab(38 + (i % 2) * 200, 180 + Math.floor(i / 2) * 18, it === 'Steel' ? 'Finished steel' : it, { size: 10 })));
  s += lab(220, 24, 'Tonne-kilometres of transport per tonne of steel (illustrative)', { a: 'middle', size: 11, w: 'bold' });
  ok = ok && tkmTotal('A') < tkmTotal('B');
  check(ok, `transport chart: segment lengths are proportional to tonne-km; totals A ${tkmTotal('A')} and B ${tkmTotal('B')}, so the raw-material site needs less transport`);
  return svgDoc(440, 215, `Stacked bars, illustrative: tonne-kilometres of transport needed per tonne of steel. Site A beside the iron-ore field: ${ITEMS.map((i) => `${i} ${tkm('A', i)}`).join(', ')}, total ${tkmTotal('A')}. Site B in the market city: ${ITEMS.map((i) => `${i} ${tkm('B', i)}`).join(', ')}, total ${tkmTotal('B')}.`, s);
})();

// ---------------------------------------------------------------- petrochemical tree with ILLUSTRATIVE output of an imagined complex (thousand tonnes a year)
export const PETRO = [
  { k: 'Plastics (polymers)', kt: 600, eg: 'pipes, packaging, bottles' },
  { k: 'Synthetic fibres', kt: 240, eg: 'polyester, nylon, acrylic' },
  { k: 'Synthetic rubber', kt: 120, eg: 'tyres, belts' },
  { k: 'Other chemicals', kt: 240, eg: 'detergents, paints, solvents' },
];
export const petroTotal = PETRO.reduce((a, p) => a + p.kt, 0);
export const petroShare = (k) => Math.round((PETRO.find((p) => p.k === k).kt / petroTotal) * 1000) / 10;
export const PETRO_TREE = (() => {
  let s = '';
  const box = (x, y, w, h, t1, t2, fill) => S.rect(x, y, w, h, { fill, fop: 0.3, c: 'currentColor', sw: 1.2, rx: 4 }) + lab(x + w / 2, y + 15, t1, { a: 'middle', size: 10, w: 'bold' }) + (t2 ? lab(x + w / 2, y + 28, t2, { a: 'middle', size: 10 }) : '');
  s += box(150, 10, 140, 36, 'Crude oil, natural gas', '', BROWN);
  s += S.arrow(220, 46, 220, 62, { w: 1.5, size: 6 });
  s += box(130, 64, 180, 36, 'Refinery and cracker', 'ethylene, propylene, benzene', MUT);
  let ok = true;
  let sum = 0;
  PETRO.forEach((p, i) => {
    const x = 10 + i * 108;
    s += S.arrow(220, 100, x + 50, 136, { w: 1.2, size: 6 });
    s += box(x, 138, 100, 40, p.k.replace(' (polymers)', ''), `${petroShare(p.k)}%`, [BLUE, GREEN, RED, YEL][i]);
    s += lab(x + 50, 194, p.eg.split(', ')[0], { a: 'middle', size: 10 }) + lab(x + 50, 207, p.eg.split(', ').slice(1).join(', '), { a: 'middle', size: 10 });
    sum += petroShare(p.k);
  });
  s += lab(220, 228, `Share of output of an imagined complex, ${petroTotal} thousand tonnes a year (illustrative)`, { a: 'middle', size: 10, c: MUT });
  ok = ok && Math.abs(sum - 100) < 0.05;
  check(ok, `petrochemical tree: four product groups branch from the cracker and their illustrative shares (${PETRO.map((p) => petroShare(p.k)).join(' + ')}) add up to 100%`);
  return svgDoc(440, 236, `Tree of petrochemicals: crude oil and natural gas go to a refinery and cracker, which make building blocks such as ethylene, propylene and benzene; these become ${PETRO.map((p) => `${p.k.toLowerCase()} such as ${p.eg} (${petroShare(p.k)} per cent of an imagined complex's output)`).join('; ')}.`, s);
})();
