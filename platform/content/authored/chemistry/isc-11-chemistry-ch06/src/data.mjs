// ISC 11 Chemistry ch06 Classification of Elements and Periodicity in Properties: shared data (standard NCERT-type values,
// aligned with cbse-11-chemistry-ch03) and helpers, so every number in the decks, notes and questions is written once.
export const SYMBOLS = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');

// ---- IUPAC systematic names for Z > 100
export const ROOTS = ['nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn'];
export function nomen(z) {
  const roots = String(z).split('').map((d) => ROOTS[Number(d)]);
  const name = (roots.join('') + 'ium').replace(/iium$/, 'ium');
  const sym = roots.map((x, i) => (i === 0 ? x[0].toUpperCase() : x[0])).join('');
  return { name, sym, roots };
}
export function fromName(name) {
  let s = name.replace(/ium$/, '');
  const out = [];
  while (s.length) {
    const root = [...ROOTS].sort((a, b) => b.length - a.length).find((rt) => s.startsWith(rt));
    if (!root) throw new Error(`bad name ${name}`);
    out.push(ROOTS.indexOf(root));
    s = s.slice(root.length);
  }
  return Number(out.join(''));
}

// ---- configuration, block, period, group (Aufbau; group number unaffected by the Cr/Cu/Pd exceptions)
const ORDER = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
const CAP = { s: 2, p: 6, d: 10, f: 14 };
export function locate(z) {
  let left = z;
  const occ = [];
  for (const sub of ORDER) {
    if (left <= 0) break;
    const n = Math.min(left, CAP[sub[1]]);
    occ.push([sub, n]);
    left -= n;
  }
  const [last, ne] = occ[occ.length - 1];
  const block = last[1];
  const period = Math.max(...occ.filter(([s]) => s[1] === 's').map(([s]) => Number(s[0])));
  let group = null;
  if (block === 's') group = z === 2 ? 18 : ne;
  else if (block === 'p') group = 12 + ne;
  else if (block === 'd') group = ne + 2;
  return { z, block, period, group, occ };
}
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((d) => SUP[d]).join('');
const CORES = [[2, 'He'], [10, 'Ne'], [18, 'Ar'], [36, 'Kr'], [54, 'Xe'], [86, 'Rn']];
/** Short configuration with a noble-gas core, subshells ordered by n then l (textbook style), no exceptions applied. */
export function shorthand(z) {
  const core = [...CORES].reverse().find(([cz]) => cz < z);
  const { occ } = locate(z);
  const cz = core ? core[0] : 0;
  let acc = 0;
  const rest = [];
  for (const [sub, n] of occ) {
    if (acc >= cz) rest.push([sub, n]);
    acc += n;
  }
  rest.sort((a, b) => Number(a[0][0]) - Number(b[0][0]) || 'spdf'.indexOf(a[0][1]) - 'spdf'.indexOf(b[0][1]));
  return `${core ? `[${core[1]}] ` : ''}${rest.map(([sub, n]) => `${sub}${sup(n)}`).join(' ')}`;
}
/** Atomic number from period and group of a main-group or d-block element (long form, f-block excluded). */
export function zFrom(period, group) {
  if (period === 1) return group === 1 ? 1 : 2;
  const before = { 2: 2, 3: 10, 4: 18, 5: 36, 6: 54, 7: 86 }[period];
  if (period <= 3) return before + (group <= 2 ? group : group - 10);
  if (period <= 5) return before + group;
  return before + (group <= 2 ? group : 14 + group);
}
export const sym = (z) => SYMBOLS[z - 1];

// ---- long-form table layout: [column, row] for every element (La and Ac in group 3, f-block rows 8 and 9)
export function cellOf(z) {
  if (z === 1) return { col: 1, row: 1, block: 's' };
  if (z === 2) return { col: 18, row: 1, block: 's' };
  const per = z <= 10 ? 2 : z <= 18 ? 3 : z <= 36 ? 4 : z <= 54 ? 5 : z <= 86 ? 6 : 7;
  const start = { 2: 3, 3: 11, 4: 19, 5: 37, 6: 55, 7: 87 }[per];
  const k = z - start; // 0-based within the period
  if (k < 2) return { col: 1 + k, row: per, block: 's' };
  if (per <= 3) return { col: 13 + (k - 2), row: per, block: 'p' };
  if (per <= 5) return k < 12 ? { col: 3 + (k - 2), row: per, block: 'd' } : { col: 13 + (k - 12), row: per, block: 'p' };
  // periods 6 and 7: 2 s, La/Ac, 14 f, 9 d, 6 p
  if (k === 2) return { col: 3, row: per, block: 'd' };
  if (k < 17) return { col: 3 + (k - 3), row: per === 6 ? 8 : 9, block: 'f' };
  if (k < 26) return { col: 4 + (k - 17), row: per, block: 'd' };
  return { col: 13 + (k - 26), row: per, block: 'p' };
}
export const METALLOIDS = ['B', 'Si', 'Ge', 'As', 'Sb', 'Te'];

// ---- standard values (NCERT-type); radii in pm (metallic radius for metals, covalent for non-metals)
export const IE1 = { H: 1312, He: 2372, Li: 520, Be: 899, B: 801, C: 1086, N: 1402, O: 1314, F: 1681, Ne: 2081, Na: 496, Mg: 737, Al: 577, Si: 786, P: 1012, S: 999, Cl: 1256, Ar: 1520, K: 419, Ca: 590, Rb: 403, Cs: 376 };
export const RADIUS = { Li: 152, Be: 111, B: 88, C: 77, N: 74, O: 66, F: 64, Na: 186, Mg: 160, Al: 143, Si: 117, P: 110, S: 104, Cl: 99, Br: 114, I: 133, K: 231, Rb: 244, Cs: 262 };
export const IONIC = { 'Li⁺': 76, 'Na⁺': 102, 'K⁺': 138, 'Mg²⁺': 72, 'Ca²⁺': 100, 'Al³⁺': 54, 'N³⁻': 171, 'O²⁻': 140, 'F⁻': 133, 'Cl⁻': 181, 'S²⁻': 184 };
export const EGE = { F: -328, Cl: -349, Br: -325, I: -295, O: -141, S: -200, Se: -195, Te: -190, Li: -60, Na: -53, K: -48, He: 48, Ne: 116, Ar: 96 };
export const EN = { H: 2.1, Li: 1.0, Be: 1.5, B: 2.0, C: 2.5, N: 3.0, O: 3.5, F: 4.0, Na: 0.9, Mg: 1.2, Al: 1.5, Si: 1.8, P: 2.1, S: 2.5, Cl: 3.0, K: 0.8, Br: 2.8, I: 2.5, Cs: 0.7 };
export const P2 = ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
export const P3 = ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'];
export const G1 = ['Li', 'Na', 'K', 'Rb', 'Cs'];
export const IE_AL = [577, 1817, 2745, 11577, 14842]; // successive ionisation enthalpies of aluminium, kJ mol-1
export const IE_LI = [520, 7298, 11815];
export const IE_CA = [590, 1145, 4912];
/** Index (0-based) of the removal after which the largest jump occurs: the number of valence electrons is index + 1. */
export const jumpAfter = (arr) => {
  let best = 0;
  let idx = 0;
  for (let i = 1; i < arr.length; i++) if (arr[i] / arr[i - 1] > best) { best = arr[i] / arr[i - 1]; idx = i - 1; }
  return idx;
};
// period-3 oxides and the nature (NCERT)
export const OXIDES3 = [
  ['Na', 'Na₂O', 'strongly basic'],
  ['Mg', 'MgO', 'basic'],
  ['Al', 'Al₂O₃', 'amphoteric'],
  ['Si', 'SiO₂', 'weakly acidic'],
  ['P', 'P₄O₁₀', 'acidic'],
  ['S', 'SO₃', 'strongly acidic'],
  ['Cl', 'Cl₂O₇', 'very strongly acidic'],
];
/** Valency toward hydrogen and toward oxygen of a main-group element of group g (1, 2, 13-17). */
export const valH = (g) => { const v = g <= 2 ? g : g - 10; return v <= 4 ? v : 8 - v; };
export const valO = (g) => (g <= 2 ? g : g - 10);
export const near = (a, b, rel = 0.01) => Math.abs(a - b) <= rel * Math.max(Math.abs(a), Math.abs(b), 1e-300);
