// ch05 Morphology of Flowering Plants — every number and every floral formula used by decks, SVGs and questions is computed (and checked) here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
export const eq = (value, expected, what) => {
  if (typeof expected === 'string' ? value !== expected : Math.abs(value - expected) > 1e-9) throw new Error(`calc: ${what} = ${value}, expected ${expected}`);
};

/** Leaves on a branch: one per node (alternate), two (opposite) or three or more (whorled). */
export const leavesOnBranch = (nodes, perNode) => nodes * perNode;
export const N = {};
N.alt = leavesOnBranch(9, 1);
N.opp = leavesOnBranch(7, 2);
N.whorl = leavesOnBranch(5, 4);
eq(N.alt, 9, 'alternate leaves');
eq(N.opp, 14, 'opposite leaves');
eq(N.whorl, 20, 'whorled leaves');

/** A raceme opens one flower a day from the base upwards (acropetal succession); buds still closed after `day` days. */
export const budsLeft = (total, day) => Math.max(total - day, 0);
N.racemeTotal = 12;
N.racemeDay = 5;
N.racemeBuds = budsLeft(N.racemeTotal, N.racemeDay);
eq(N.racemeBuds, 7, 'raceme buds left');
/** Number of the flower (counting from the base) that opens on day d. */
export const openFlower = (d) => d;
eq(openFlower(8), 8, 'flower opening on day 8');

/** Ovules, and seeds when a share of them is fertilised and develops. */
export const ovules = (locules, perLocule) => locules * perLocule;
export const seeds = (locules, perLocule, pct) => round((ovules(locules, perLocule) * pct) / 100);
N.tomatoOvules = ovules(2, 30);
N.tomatoSeeds = seeds(2, 30, 80);
N.lemonOvules = ovules(5, 4);
N.lemonSeeds = seeds(5, 4, 75);
eq(N.tomatoOvules, 60, 'tomato ovules');
eq(N.tomatoSeeds, 48, 'tomato seeds');
eq(N.lemonOvules, 20, 'lemon ovules');
eq(N.lemonSeeds, 15, 'lemon seeds');

/** A mango, a drupe: fruit mass split into epicarp (skin), mesocarp (flesh) and the stony endocarp with its seed. */
export const MANGO = { total: 400, epicarp: 30, stone: 60 };
MANGO.mesocarp = MANGO.total - MANGO.epicarp - MANGO.stone;
MANGO.mesoPct = round((MANGO.mesocarp / MANGO.total) * 100, 1);
eq(MANGO.mesocarp, 310, 'mango mesocarp');
eq(MANGO.mesoPct, 77.5, 'mango mesocarp share');

/** Root tip marked with ink at 1 mm intervals from the tip; growth (mm) of each interval after a day, interval 1 at the tip. */
export const ELONG = [0.2, 0.5, 2.4, 3.1, 1.8, 0.6, 0, 0, 0, 0];
export const sum = (a) => round(a.reduce((x, y) => x + y, 0), 1);
N.elongTotal = sum(ELONG);
N.elongMaxInterval = ELONG.indexOf(Math.max(...ELONG)) + 1;
N.elongFinalLength = round(ELONG.length + N.elongTotal, 1);
N.elongFirstThree = sum(ELONG.slice(0, 3));
eq(N.elongTotal, 8.6, 'total root elongation');
eq(N.elongMaxInterval, 4, 'interval of greatest elongation');
eq(N.elongFinalLength, 18.6, 'final length of the marked region');
eq(N.elongFirstThree, 3.1, 'growth of the first three intervals');
N.elongMeri = sum(ELONG.slice(0, 2));
N.elongElong = sum(ELONG.slice(2, 6));
N.elongMature = sum(ELONG.slice(6));
eq(N.elongMeri, 0.7, 'meristematic growth');
eq(N.elongElong, 7.9, 'elongation-region growth');
eq(N.elongMature, 0, 'maturation growth');
eq(N.elongMeri + N.elongElong + N.elongMature, N.elongTotal, 'zones add up');

/** A 250 g sample of maize grain, 82 percent endosperm (illustrative). */
N.maizeSample = 250;
N.maizeEndo = round((N.maizeSample * 82) / 100);
eq(N.maizeEndo, 205, 'maize endosperm mass');

/** Stamens and carpels in a flower of a given formula, and the number of flowers needed for a stated number of stamens. */
export const stamensIn = (flowers, perFlower) => flowers * perFlower;
N.stamens40 = stamensIn(40, 5);
eq(N.stamens40, 200, 'stamens in 40 Solanum flowers');

// ---------------------------------------------------------------- floral formulas
/** Whorl entry: n members, fused (cohesion shown in brackets) or free. */
const w = (n, fused = false) => ({ n, fused });
export const FLOWERS = {
  solanum: { sym: 'actino', sex: 'bisexual', K: w(5, true), C: w(5, true), A: { ...w(5), epipetalous: true }, G: { ...w(2, true), pos: 'superior' } },
  imaginary: { sym: 'actino', sex: 'bisexual', K: w(4), C: w(4), A: w(6), G: { ...w(1), pos: 'inferior' } },
  lily: { sym: 'actino', sex: 'bisexual', K: w(0), C: w(0), A: w(6), G: { ...w(3, true), pos: 'superior' } },
  zygo: { sym: 'zygo', sex: 'bisexual', K: w(5, true), C: w(5), A: w(10), G: { ...w(1), pos: 'superior' } },
};
const part = (letter, x) => `${letter}${x.fused ? `(${x.n})` : x.n}`;
/** Plain-text floral formula (G is underlined with U+0332 when the ovary is superior, overlined with U+0305 when inferior). */
export function formulaText(f) {
  const g = f.G.pos === 'superior' ? 'G̲' : 'G̅';
  return `${f.sym === 'actino' ? '⊕' : '%'} ${f.sex === 'bisexual' ? '⚥' : f.sex === 'male' ? '♂' : '♀'} K${f.K.fused ? `(${f.K.n})` : f.K.n} C${f.C.fused ? `(${f.C.n})` : f.C.n} A${f.A.fused ? `(${f.A.n})` : f.A.n} ${g}${f.G.fused ? `(${f.G.n})` : f.G.n}`;
}
/** KaTeX floral formula. */
export function formulaTex(f) {
  const sub = (x) => (x.fused ? `_{(${x.n})}` : `_{${x.n}}`);
  const sym = f.sym === 'actino' ? '\\oplus' : '\\%';
  const g = f.G.pos === 'superior' ? `\\underline{G}${sub(f.G)}` : `\\overline{G}${sub(f.G)}`;
  const body = `K${sub(f.K)}\\ C${sub(f.C)}\\ A${sub(f.A)}\\ ${g}`;
  return `${sym}\\ ${body}`;
}
/** Facts read straight from the formula. */
export function facts(f) {
  return {
    members: f.K.n + f.C.n + f.A.n + f.G.n,
    gamosepalous: f.K.fused,
    gamopetalous: f.C.fused,
    syncarpous: f.G.n > 1 && f.G.fused,
    apocarpous: f.G.n > 1 && !f.G.fused,
    superior: f.G.pos === 'superior',
    stamens: f.A.n,
    carpels: f.G.n,
  };
}
const S1 = facts(FLOWERS.solanum);
eq(formulaTex(FLOWERS.solanum), '\\oplus\\ K_{(5)}\\ C_{(5)}\\ A_{5}\\ \\underline{G}_{(2)}', 'Solanaceae formula (TeX)');
eq(S1.members, 17, 'floral members in Solanum');
eq(S1.syncarpous, true, 'Solanum syncarpous');
eq(S1.stamens, 5, 'Solanum stamens');
eq(S1.carpels, 2, 'Solanum carpels');
eq(formulaTex(FLOWERS.imaginary), '\\oplus\\ K_{4}\\ C_{4}\\ A_{6}\\ \\overline{G}_{1}', 'imaginary formula (TeX)');
eq(facts(FLOWERS.imaginary).members, 15, 'imaginary flower members');
eq(facts(FLOWERS.imaginary).superior, false, 'imaginary ovary inferior');
eq(facts(FLOWERS.lily).members, 9, 'lily-type flower members');
eq(facts(FLOWERS.zygo).members, 21, 'zygomorphic flower members');
eq(formulaTex(FLOWERS.zygo), '\\%\\ K_{(5)}\\ C_{5}\\ A_{10}\\ \\underline{G}_{1}', 'zygomorphic formula (TeX)');
export const SOL = FLOWERS.solanum;
export const SOL_TEX = formulaTex(SOL);
export const SOL_TEXT = formulaText(SOL);
export const SOL_FACTS = S1;

/** Placentation panels in the lettered diagram: A to E in this order. */
export const PLAC_ORDER = ['parietal', 'basal', 'axile', 'marginal', 'free central'];
export const placLetter = (type) => 'ABCDE'[PLAC_ORDER.indexOf(type)];
eq(placLetter('axile'), 'C', 'axile letter');
eq(placLetter('basal'), 'B', 'basal letter');
eq(placLetter('free central'), 'E', 'free central letter');
eq(placLetter('marginal'), 'D', 'marginal letter');
eq(placLetter('parietal'), 'A', 'parietal letter');

/** Lettered flower: letters on five parts. */
export const FLOWER_LETTERS = { anther: 'A', sepal: 'B', stigma: 'C', ovary: 'D', petal: 'E' };
