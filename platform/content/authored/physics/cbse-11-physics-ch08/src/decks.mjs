// ch08 Mechanical Properties of Solids — two decks: Part 1 (t01) stress, strain, Hooke's law and the stress-strain curve;
// Part 2 (t02) Young's, shear and bulk moduli, with ropes, beams and bridges. Every number and every graph is computed here.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, Y, B_WATER, RHO_WATER, R6, areaD, areaR, radiusA, elongate, pwl } from './phys.mjs';
import * as G from './svgs.mjs';

const MPa = 1e6;
/** Spoken form of a number in scientific notation, for narration (no symbols). */
const spk = (x, n = 2) => {
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = Number((x / 10 ** e).toPrecision(n));
  return `${m.toFixed(n - 1)} times ten to the ${e < 0 ? 'minus ' : ''}${Math.abs(e)}`;
};

// ---------------------------------------------------------------- the ductile-metal curve (illustrative metal, Y = 7.0 x 10^10 Pa)
export const CUR = { Y: Y.aluminium / MPa, eA: 0.0021, eB: 0.0024, sB: 160, eU: 0.02, sU: 250, eF: 0.034, sF: 205, eP: 0.012 };
CUR.sA = CUR.Y * CUR.eA; // proportional limit lies on the Hooke line OA
CUR.sigma = (e) => {
  if (e <= CUR.eA) return CUR.Y * e;
  if (e <= CUR.eB) return CUR.sA + ((CUR.sB - CUR.sA) * (e - CUR.eA)) / (CUR.eB - CUR.eA);
  if (e <= CUR.eU) return CUR.sU - (CUR.sU - CUR.sB) * ((CUR.eU - e) / (CUR.eU - CUR.eB)) ** 2;
  return CUR.sU - (CUR.sU - CUR.sF) * ((e - CUR.eU) / (CUR.eF - CUR.eU)) ** 2;
};
const sample = (a, b, n) => Array.from({ length: n + 1 }, (_, k) => a + ((b - a) * k) / n);
CUR.pts = (to) => [...new Set([0, CUR.eA, CUR.eB, ...sample(CUR.eB, CUR.eU, 26), ...sample(CUR.eU, CUR.eF, 16)].filter((e) => e <= to + 1e-12).map((e) => Math.round(e * 1e5) / 1e5))].sort((x, y) => x - y).map((e) => [e, Math.round(CUR.sigma(e) * 10) / 10]);
CUR.sP = CUR.sigma(CUR.eP);
CUR.ePerm = CUR.eP - CUR.sP / CUR.Y; // strain left after unloading along a line parallel to OA
CUR.brittle = { Y: 65000, eF: 0.0009 };
CUR.brittle.sF = CUR.brittle.Y * CUR.brittle.eF;
// rubber-like (elastomer) model curve: stress in MPa against strain
export const RUB = { G: 0.35, c: 0.004 };
RUB.sigma = (x) => RUB.G * ((1 + x) - 1 / (1 + x) ** 2) + RUB.c * x ** 3;
RUB.slope0 = R6(3 * RUB.G);

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { d: G.WIRE_DATA.d, F: G.WIRE_DATA.F, L: G.WIRE_DATA.L, dL: G.WIRE_DATA.dL };
ex1.A = areaD(ex1.d);
ex1.stress = ex1.F / ex1.A;
ex1.strain = ex1.dL / ex1.L;
const ex2 = { A: 60e-6, sy: 250 * MPa, su: 400 * MPa };
ex2.Fy = ex2.sy * ex2.A;
ex2.Fu = ex2.su * ex2.A;
const ex3 = { k: 0.02, loads: [5, 10, 15, 20, 25, 30, 35], ext: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.78] };
ex3.pred = ex3.k * 35;
ex3.dev = ex3.ext[6] - ex3.pred;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex4 = { F: 100, L: 2.0, d: 0.8e-3, dL: 2.0e-3 };
ex4.A = areaD(ex4.d);
ex4.stress = ex4.F / ex4.A;
ex4.strain = ex4.dL / ex4.L;
ex4.Y = ex4.stress / ex4.strain;
const ex5 = { m: 1500, L: 30, A: 4.0e-4, Y: Y.steel };
ex5.F = R6(ex5.m * g);
ex5.stress = ex5.F / ex5.A;
ex5.strain = ex5.stress / ex5.Y;
ex5.dL = ex5.strain * ex5.L;
const ex6 = { G: 8.4e10, a: 0.2, b: 0.25, F: 4.2e4, h: 0.1 };
ex6.A = ex6.a * ex6.b;
ex6.stress = ex6.F / ex6.A;
ex6.theta = ex6.stress / ex6.G;
ex6.dx = ex6.theta * ex6.h;
const ex7 = { h: 4000 };
ex7.p = RHO_WATER * g * ex7.h;
ex7.frac = ex7.p / B_WATER;
ex7.litres = ex7.frac * 1000; // litres lost from each cubic metre (1 m^3 = 1000 L)
const ex8 = { M: 2500, n: 4, sb: 4.0e8, sf: 8 };
ex8.F = R6((ex8.M * g) / ex8.n);
ex8.sw = ex8.sb / ex8.sf;
ex8.A = ex8.F / ex8.sw;
ex8.r = radiusA(ex8.A);
const ex9 = { rr: 2, ll: 2 };
ex9.ratio = ex9.ll / ex9.rr ** 2;
const ex10 = { F: 120, Ls: 1.5, Lc: 1.0, d: 1.0e-3 };
ex10.A = areaD(ex10.d);
ex10.ds = elongate(ex10.F, ex10.Ls, ex10.A, Y.steel);
ex10.dc = elongate(ex10.F, ex10.Lc, ex10.A, Y.copper);
ex10.tot = ex10.ds + ex10.dc;

export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10 };

// ---------------------------------------------------------------- visuals
export const V = {
  stress: svgV(G.STRESS, 'Four kinds of stress: tensile on a rod, compressive on a pillar, shear on a block and hydraulic pressure on all faces', 'The restoring force per unit area depends on how the load is applied.'),
  shear: svgV(G.SHEAR, 'A block fixed at its base with a force along its top face, sliding sideways by delta x, with the shear angle theta', 'Shear strain is the angle of shear, delta x over h.'),
  wire: svgV(G.WIRE, 'A steel wire carrying 150 newtons with an extension of 0.8 millimetres drawn 300 times too large', 'The extension is tiny; it is drawn 300 times too large.'),
  ywires: svgV(G.YWIRES, 'Bars showing the extension of equal steel, brass and aluminium wires under the same load', 'Same wire, same load: the larger Young modulus, the smaller the extension.'),
  bulk: svgV(G.BULK, 'A cube before and after being squeezed by pressure on every face: same shape, smaller volume', 'Bulk strain is the fractional change of volume.'),
  beam: svgV(G.BEAM, 'A bent beam with compressed top layers and stretched bottom layers, and an I-shaped section', 'Material far from the middle layer works hardest.'),
};

const ax = (label, min, max) => ({ label, min, max });
const pt1 = (label, at) => ({ label, kind: 'scatter', points: [at] });
const L_OA = Math.round(CUR.eA * 1e5) / 1e5;
export const plotHooke = plot(
  {
    x: ax('strain (no unit)', 0, 0.0006),
    y: ax('stress (MPa)', 0, 130),
    functions: [
      { expr: `${Y.steel / MPa}*x`, label: `steel: slope Y = ${dec(Y.steel / 1e11, 2)} × 10¹¹ Pa`, domain: [0, 0.0006] },
      { expr: `${Y.copper / MPa}*x`, label: `copper: slope Y = ${dec(Y.copper / 1e11, 2)} × 10¹¹ Pa`, domain: [0, 0.0006] },
      { expr: `${Y.aluminium / MPa}*x`, label: `aluminium: slope Y = ${dec(Y.aluminium / 1e10, 2)} × 10¹⁰ Pa`, domain: [0, 0.0006] },
    ],
  },
  'Stress against strain for steel, copper and aluminium within the elastic limit: three straight lines through the origin whose slopes are the Young moduli, steel the steepest',
  'Within the limit, stress is proportional to strain; the slope is the modulus.',
);
const curveSeries = (to) => ({ label: 'ductile metal (illustrative curve)', kind: 'line', points: CUR.pts(to) });
export const plotCurve = plot(
  {
    x: ax('strain (no unit)', 0, 0.036),
    y: ax('stress (MPa)', 0, 280),
    series: [
      curveSeries(CUR.eF),
      pt1(`A: proportional limit (${dec(CUR.sA, 3)} MPa)`, [CUR.eA, CUR.sA]),
      pt1(`B: elastic limit and yield point (${CUR.sB} MPa)`, [CUR.eB, CUR.sB]),
      pt1(`C: ultimate stress (${CUR.sU} MPa)`, [CUR.eU, CUR.sU]),
      pt1(`D: fracture (${CUR.sF} MPa)`, [CUR.eF, CUR.sF]),
    ],
  },
  'Stress-strain curve of a ductile metal: a straight rise to the proportional limit A, a bend to the elastic limit and yield point B, a long plastic region rising to the ultimate stress C, then a fall to fracture at D',
  'The metal behaves elastically up to B; between B and D the strain is largely permanent.',
);
export const plotUnload = plot(
  {
    x: ax('strain (no unit)', 0, 0.022),
    y: ax('stress (MPa)', 0, 270),
    series: [
      curveSeries(CUR.eU),
      { label: 'unloading line, parallel to the first straight part', kind: 'line', points: [[Math.round(CUR.ePerm * 1e5) / 1e5, 0], [CUR.eP, Math.round(CUR.sP * 10) / 10]] },
      pt1(`stretched to ${dec(CUR.sP, 4)} MPa at strain ${CUR.eP}`, [CUR.eP, Math.round(CUR.sP * 10) / 10]),
      pt1(`permanent strain ${dec(CUR.ePerm, 3)} left at zero stress`, [Math.round(CUR.ePerm * 1e5) / 1e5, 0]),
    ],
  },
  'Stress-strain curve beyond the elastic limit with an unloading line drawn parallel to the first straight part: when the load is removed the stress falls to zero but a permanent strain of about 0.0087 remains',
  'Unloading follows a line parallel to OA, so a permanent strain remains.',
);
export const plotBrittle = plot(
  {
    x: ax('strain (no unit)', 0, 0.012),
    y: ax('stress (MPa)', 0, 270),
    series: [
      curveSeries(0.012),
      { label: 'brittle solid (glass-like)', kind: 'line', points: [[0, 0], [CUR.brittle.eF, CUR.brittle.sF]] },
      pt1(`brittle solid fractures at strain ${CUR.brittle.eF}`, [CUR.brittle.eF, CUR.brittle.sF]),
    ],
  },
  'A ductile metal curve with a long plastic region compared with a brittle solid, whose straight line stops at a small strain where it fractures',
  'A brittle solid breaks soon after the elastic region; a ductile one stretches a long way first.',
);
export const plotRubber = plot(
  {
    x: ax('strain (no unit)', 0, 5),
    y: ax('stress (MPa)', 0, 3),
    functions: [
      { expr: `${RUB.G}*((1+x)-1/(1+x)^2)+${RUB.c}*x^3`, label: 'rubber-like elastomer (illustrative model)', domain: [0, 5] },
      { expr: `${RUB.slope0}*x`, label: 'straight line with the initial slope (Hooke)', domain: [0, 2.4] },
    ],
  },
  'Stress-strain curve of a rubber-like material up to a strain of five: it is curved, not a straight line, so Hooke law fails, and it keeps returning to its shape even after very large strain',
  'An elastomer stretches many times its length yet is still elastic; its curve is not linear.',
);
export const plotLoadExt = plot(
  {
    x: ax('load (N)', 0, 40),
    y: ax('extension (mm)', 0, 0.9),
    series: [
      { label: 'Hooke prediction: 0.020 mm per newton', kind: 'line', points: [[0, 0], [35, Math.round(ex3.pred * 1000) / 1000]] },
      { label: 'measured extensions', kind: 'scatter', points: ex3.loads.map((F, i) => [F, ex3.ext[i]]) },
    ],
  },
  'Load against extension for a wire in a school experiment: the first six points lie on a straight line through the origin, the seventh, at 35 newtons, lies above it',
  'The first six readings obey Hooke; the last one has left the line.',
);
const Lw = 2.0;
const Aw = areaD(1.0e-3);
const kmm = (Ym) => R6((Lw / (Aw * Ym)) * 1000); // mm of extension per newton for the 2.0 m, 1.0 mm wire
export const plotExt = plot(
  {
    x: ax('load (N)', 0, 200),
    y: ax('extension (mm)', 0, 8),
    functions: [
      { expr: `${kmm(Y.steel)}*x`, label: 'steel', domain: [0, 200] },
      { expr: `${kmm(Y.brass)}*x`, label: 'brass', domain: [0, 200] },
      { expr: `${kmm(Y.aluminium)}*x`, label: 'aluminium', domain: [0, 200] },
    ],
  },
  'Extension against load for a 2.0 metre wire of diameter 1.0 millimetre in steel, brass and aluminium: three straight lines, the steepest for aluminium, which has the smallest Young modulus',
  'Slope = L / (A Y): the smaller the modulus, the steeper the line.',
);
export const plotWater = plot(
  {
    x: ax('increase of pressure (MPa)', 0, 100),
    y: ax('decrease of volume (percent)', 0, 5),
    functions: [{ expr: `x/${B_WATER / MPa / 100}`, label: 'water, B = 2.2 × 10⁹ Pa', domain: [0, 100] }],
    vlines: [
      { x: R6(ex7.p / MPa), label: `${ex7.h / 1000} km deep: ${dec(ex7.p / MPa, 3)} MPa, volume down ${dec(ex7.frac * 100, 3)} percent`, dashed: true },
      { x: 98, label: '10 km deep: 98 MPa, volume down 4.45 percent', dashed: true },
    ],
  },
  'Fractional decrease of the volume of sea water against the increase of pressure: a straight line, about 1.8 percent at 4 kilometres depth and 4.5 percent at 10 kilometres',
  'Even in the deepest trench water is compressed by under 5 percent.',
);

// ---------------------------------------------------------------- tables
const T_EP = table(
  ['Behaviour', 'After the load is removed', 'Examples'],
  [
    ['Elastic', 'regains its original size and shape', 'steel spring, quartz fibre (within the limit)'],
    ['Plastic', 'stays deformed', 'putty, wet clay, a bent copper strip'],
    ['Elastomer', 'regains its shape even after a very large strain, but not in proportion', 'rubber band, the wall of the aorta'],
  ],
  'Table comparing elastic, plastic and elastomeric behaviour with examples',
);
const T_EX2 = table(
  ['Quantity', 'Yield', 'Ultimate'],
  [
    ['Stress (MPa)', String(ex2.sy / MPa), String(ex2.su / MPa)],
    ['Area (mm²)', String(ex2.A * 1e6), String(ex2.A * 1e6)],
    ['Force = stress × area (kN)', dec(ex2.Fy / 1000, 3), dec(ex2.Fu / 1000, 3)],
  ],
  'Table of the yield and ultimate stress of a steel rod, its area and the corresponding forces',
);
const T_Y = table(
  ['Metal', 'Young modulus Y (Pa)', 'Extension of the 2.0 m, 1.0 mm wire at 200 N (mm)'],
  [['steel', '2.0 × 10¹¹', dec(kmm(Y.steel) * 200, 3)], ['copper', '1.1 × 10¹¹', dec(kmm(Y.copper) * 200, 3)], ['brass', '9.1 × 10¹⁰', dec(kmm(Y.brass) * 200, 3)], ['aluminium', '7.0 × 10¹⁰', dec(kmm(Y.aluminium) * 200, 3)]],
  'Table of the Young moduli of steel, copper, brass and aluminium and the extension of an identical wire of each under 200 newtons',
);
const T_EX4 = table(
  ['Step', 'Working'],
  [
    ['Area', `π (0.40 mm)² = ${sci(ex4.A, 3)} m²`],
    ['Stress F / A', `${ex4.F} / ${sci(ex4.A, 3)} = ${sci(ex4.stress, 3)} Pa`],
    ['Strain ΔL / L', `${ex4.dL * 1000} mm / ${ex4.L * 1000} mm = ${ex4.strain}`],
    ['Y = stress / strain', `${sci(ex4.Y, 3)} Pa, close to steel`],
  ],
  'Table of the steps to find the Young modulus of a wire from a measured load and extension',
);
const T_MOD = table(
  ['Modulus', 'Stress', 'Strain', 'Where it applies'],
  [
    ['Young Y', 'tensile or compressive, F / A', 'ΔL / L', 'solids'],
    ['Shear G', 'tangential force per area, F / A', 'angle θ = Δx / h', 'solids (a fluid flows instead)'],
    ['Bulk B', 'pressure change p', '−ΔV / V', 'solids, liquids and gases'],
  ],
  'Table comparing Young, shear and bulk moduli by stress, strain and where each applies',
);
const T_ROPE = table(
  ['Design choice', 'Reason'],
  [
    ['Many thin strands twisted together', 'flexible over a pulley, yet the total cross-section carries the load'],
    ['Working stress = breaking stress ÷ safety factor', 'keeps the rope far below its elastic limit even with jerks and ageing'],
    ['Check the stretch ΔL = F L / (A Y)', 'a long rope under load must not extend too much'],
  ],
  'Table of design choices for crane and lift ropes and the reason for each',
);
const T_EX8 = table(
  ['Step', 'Working'],
  [
    ['Load on one rope', `${ex8.M} × ${g} / ${ex8.n} = ${dec(ex8.F, 4)} N`],
    ['Working stress', `${sci(ex8.sb, 2)} / ${ex8.sf} = ${sci(ex8.sw, 2)} Pa`],
    ['Area needed', `${dec(ex8.F, 4)} / ${sci(ex8.sw, 2)} = ${sci(ex8.A, 3)} m²`],
    ['Radius', `√(A / π) = ${dec(ex8.r * 1000, 3)} mm`],
  ],
  'Table of the steps to find the radius of each lift rope using a safety factor',
);
const T_EX9 = table(
  ['Wire', 'Length', 'Radius', 'Extension ∝ L / r²'],
  [['A', 'L', 'r', '1'], ['B', `${ex9.ll} L`, `${ex9.rr} r`, `${ex9.ll} / ${ex9.rr ** 2} = ${dec(ex9.ratio, 2)}`]],
  'Table comparing the extension of two wires of the same material under the same load with different lengths and radii',
);
const T_EX10 = table(
  ['Wire', 'L (m)', 'Extension F L / (A Y) (mm)'],
  [['steel', String(ex10.Ls), dec(ex10.ds * 1000, 4)], ['copper', String(ex10.Lc), dec(ex10.dc * 1000, 4)], ['total (same force in both)', String(ex10.Ls + ex10.Lc), dec(ex10.tot * 1000, 4)]],
  'Table of the extensions of a steel wire and a copper wire joined end to end under 120 newtons and their sum',
);
export const TABLES = { T_EP, T_EX2, T_Y, T_EX4, T_MOD, T_ROPE, T_EX8, T_EX9, T_EX10 };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Mechanical Properties of Solids — Part 1: Stress, strain and Hooke’s law',
  goals: [
    'Distinguish elastic, plastic and elastomeric behaviour',
    'Define tensile, compressive, shear and hydraulic stress and the matching strains, and calculate them',
    'State Hooke’s law and read a stress–strain curve: proportional limit, elastic limit, yield point, ultimate stress and fracture',
  ],
  slides: [
    sl('title', 'Mechanical Properties of Solids', {
      b: 'Part 1 — what happens inside a wire, a cable or a girder when it is pulled, pushed or twisted, and how we measure it.',
      v: V.wire,
      n: 'A lift cable, a bridge girder and a rubber band all change shape when a load acts on them. Some return to their shape when the load is removed, and some do not. In this part we meet stress and strain, Hooke’s law, and the stress strain curve that tells an engineer how far a material can be trusted.',
    }),
    sl('concept', 'Elastic, plastic and elastomers', {
      b: 'A **deforming force** changes the size or shape of a solid; interatomic forces then try to restore it.',
      ul: [
        '**Elasticity**: the property of regaining the original size and shape when the deforming force is removed.',
        '**Plasticity**: the solid stays deformed. Putty and wet clay are close to perfectly plastic.',
        'No real body is perfectly elastic; steel, quartz and phosphor bronze come close within limits.',
        'Rubber is an **elastomer**: it returns even after huge strains, but its behaviour is not simply proportional.',
      ],
      v: T_EP,
      n: 'When a force deforms a solid, the forces between its atoms pull it back. A body that regains its shape afterwards is called elastic, and one that stays deformed is called plastic. Steel and quartz are very nearly elastic inside their limits. Putty is plastic. Rubber is special: it returns to its shape even after a very large stretch, and it is called an elastomer.',
    }),
    sl('diagram', 'Stress: restoring force per unit area', {
      b: 'In equilibrium the **restoring force** inside the body equals the applied force.',
      m: [r`\text{stress} = \dfrac{F}{A}`],
      ul: [
        'SI unit: pascal, Pa = N m⁻² (megapascal, MPa = 10⁶ Pa); dimensions M L⁻¹ T⁻².',
        'Tensile (stretching) and compressive (squeezing) stress act perpendicular to the area: **longitudinal stress**.',
        '**Shear stress**: force parallel to the face, per unit area of the face.',
        '**Hydraulic stress**: the pressure p acting on every face.',
      ],
      v: V.stress,
      n: 'Stress is the restoring force per unit area, force divided by area, measured in pascals. Pull on a rod and it is tensile, squeeze a pillar and it is compressive, and both act at right angles to the area. A force along the face gives shear stress. Pressure on all faces, like water on a submerged block, is hydraulic stress.',
    }),
    sl('concept', 'Strain: the fractional change', {
      b: 'Strain measures how much the body is deformed compared with its original size; it has **no unit**.',
      m: [r`\text{longitudinal strain} = \dfrac{\Delta L}{L}`, r`\text{shear strain} = \dfrac{\Delta x}{h} = \tan\theta \approx \theta`, r`\text{volume strain} = \dfrac{\Delta V}{V}`],
      ul: [
        'Longitudinal strain: change of length per original length.',
        'Shear strain: the angle θ (in radian) through which the faces turn; for small angles tan θ ≈ θ.',
        'Volume strain: change of volume per original volume.',
      ],
      v: V.shear,
      n: 'Strain says how much a body has changed compared with its original size. Longitudinal strain is the extension divided by the original length. Shear strain is the sideways shift divided by the height, which is the angle of shear in radians. Volume strain is the change in volume divided by the original volume. Each is a ratio, so none of them has a unit.',
    }),
    sl('example', 'Worked example 1: stress and strain in a wire', {
      b: r`A steel wire of diameter $${ex1.d * 1000}$ mm and length $${ex1.L}$ m carries a load of $${ex1.F}$ N and stretches by $${ex1.dL * 1000}$ mm. Find the stress and the strain.`,
      ul: [
        r`Area $A = \pi (d/2)^2 = \pi (${ex1.d / 2 * 1000} \times 10^{-3})^2 = ${sci(ex1.A, 3)}$ m$^2$.`,
        r`Stress $= F/A = \dfrac{${ex1.F}}{${sci(ex1.A, 3)}} = ${sci(ex1.stress, 3)}$ Pa.`,
        r`Strain $= \Delta L / L = ${ex1.dL * 1000} \times 10^{-3} / ${ex1.L} = ${sci(ex1.strain, 2)}$ (no unit).`,
      ],
      v: V.wire,
      n: `Start with the area of cross section, which comes from the diameter: about ${spk(ex1.A, 3)} square metres. Dividing the load of one hundred and fifty newtons by it gives a stress of about ${spk(ex1.stress, 3)} pascals. The strain is the extension, point eight millimetres, divided by the length, two point five metres: ${spk(ex1.strain, 2)}, with no unit.`,
    }),
    sl('check', 'Quick check: the unit of stress', {
      b: 'Choose the correct option.',
      v: V.stress,
      chk: 'stressunit-mcq',
      n: 'Remember that stress is a force divided by an area, and think about what the unit of strain must be.',
    }),
    sl('concept', 'Hooke’s law', {
      b: 'For small deformations the stress is directly proportional to the strain.',
      m: [r`\text{stress} \propto \text{strain} \;\Rightarrow\; \dfrac{\text{stress}}{\text{strain}} = \text{constant}`],
      ul: [
        'The constant is the **modulus of elasticity** of the material; it depends on the material and the kind of strain.',
        'Within the limit, a graph of stress against strain is a straight line through the origin; its slope is the modulus.',
        'For a spring the same idea reads F = k x: extension proportional to load.',
        'Steel has the steepest line here: a given stress produces the smallest strain.',
      ],
      v: plotHooke,
      n: 'Hooke’s law says that for small deformations, stress is directly proportional to strain. The ratio is a constant called the modulus of elasticity, and it is the slope of the straight line on a stress strain graph. In the graph a steel wire gives the steepest line, so the same stress produces the least strain in steel.',
    }),
    sl('diagram', 'The stress–strain curve of a ductile metal', {
      b: 'A wire is loaded slowly until it breaks; stress is plotted against strain.',
      ul: [
        '**OA**: straight line, Hooke’s law holds. A is the **proportional limit**.',
        '**B**: the **elastic limit** (here taken together with the **yield point**): beyond it the body does not fully recover.',
        '**BC**: plastic region; the stress needed rises to the **ultimate stress** at C (the greatest stress the metal bears).',
        '**CD**: the wire thins (necks) and **fractures** at D.',
      ],
      v: plotCurve,
      n: 'This is the stress strain curve of a ductile metal. Along the first straight part, Hooke’s law holds, and point A is the proportional limit. At B, the elastic limit and yield point, the metal stops recovering fully. Between B and C the strain is largely permanent. C is the ultimate stress, the highest stress the metal can bear, and the wire finally breaks at D.',
    }),
    sl('diagram', 'Beyond the elastic limit: permanent set', {
      b: 'Stretch the wire to a point P beyond B, then remove the load slowly.',
      ul: [
        'The stress falls along a line **parallel to OA**, not back along the loading curve.',
        r`At zero stress a **permanent strain** remains: $\varepsilon_\text{perm} = \varepsilon_P - \sigma_P / Y$.`,
        `Here P is at strain ${CUR.eP} and stress ${dec(CUR.sP, 4)} MPa, so ${dec(CUR.ePerm, 3)} of strain is left.`,
        'A wire that has been stretched past its yield point stays longer: it has a permanent set.',
      ],
      v: plotUnload,
      n: `Suppose we stretch the wire to a point beyond the elastic limit and then slowly remove the load. The stress does not retrace the curve. It falls along a line parallel to the first straight part, and when the stress reaches zero a permanent strain of about ${dec(CUR.ePerm, 3)} is left. The wire is now permanently longer.`,
    }),
    sl('example', 'Worked example 2: how much load before yielding?', {
      b: r`A steel rod of cross-section $${ex2.A * 1e6}$ mm$^2$ has a yield stress of $${ex2.sy / MPa}$ MPa and an ultimate stress of $${ex2.su / MPa}$ MPa. Find the largest load that keeps it elastic, and the load at which it is about to break.`,
      ul: [
        r`$A = ${ex2.A * 1e6} \times 10^{-6} = ${sci(ex2.A, 2)}$ m$^2$.`,
        r`Yield load $= \sigma_y A = ${ex2.sy / MPa} \times 10^6 \times ${sci(ex2.A, 2)} = ${sci(ex2.Fy, 3)}\ \text{N} = ${dec(ex2.Fy / 1000, 3)}\ \text{kN}$.`,
        r`Ultimate load $= \sigma_u A = ${ex2.su / MPa} \times 10^6 \times ${sci(ex2.A, 2)} = ${sci(ex2.Fu, 3)}\ \text{N} = ${dec(ex2.Fu / 1000, 3)}\ \text{kN}$.`,
        'A designer keeps the working load well below the first value.',
      ],
      v: T_EX2,
      n: `Force is stress times area. The area is sixty square millimetres, which is six times ten to the minus five square metres. At the yield stress the load is ${dec(ex2.Fy / 1000, 3)} kilonewtons, the most the rod can carry and still recover. At the ultimate stress it is ${dec(ex2.Fu / 1000, 3)} kilonewtons, the load at which it is about to give way.`,
    }),
    sl('concept', 'Ductile and brittle solids', {
      b: 'Materials differ in how far they stretch between the elastic limit and fracture.',
      ul: [
        '**Ductile**: a long plastic region (copper, iron, aluminium). They can be drawn into wires and absorb a lot of energy before breaking.',
        '**Brittle**: fracture soon after the elastic limit (glass, cast iron). They shatter with little warning.',
        'The longer the plastic region, the more warning a structure gives before it fails.',
      ],
      v: plotBrittle,
      n: 'A ductile material, such as copper or iron, has a long plastic region, so it can be drawn into wire and gives warning before it fails. A brittle material, such as glass, breaks soon after the elastic limit, with very little stretch. On the graph the glass like line stops almost at once, while the metal curve continues.',
    }),
    sl('check', 'Quick check: reading the curve', {
      b: 'Choose the correct option.',
      v: plotCurve,
      chk: 'yieldpt-mcq',
      n: 'Think about what the wire does after the load is removed once the yield point has been crossed.',
    }),
    sl('concept', 'Elastomers', {
      b: 'Rubber, and the wall of the aorta, can be stretched to several times their length and still recover.',
      ul: [
        'The stress–strain curve is **not a straight line**: Hooke’s law fails, although the material is elastic.',
        'There is **no well-defined plastic region**: the body keeps returning to its shape.',
        'The strain is large for a small stress, so such a material is easy to stretch.',
      ],
      v: plotRubber,
      n: 'Rubber and the wall of the aorta are elastomers. They can be stretched to many times their original length and still spring back, but the curve is bent, not straight, so Hooke’s law does not hold. There is no clear plastic region. Notice that being elastic is not the same as being hard to stretch.',
    }),
    sl('example', 'Worked example 3: finding where Hooke’s law ends', {
      b: r`In a school experiment a wire carries loads of $5, 10, \dots, 35$ N. The extensions are $0.10, 0.20, 0.30, 0.40, 0.50, 0.60$ and $${ex3.ext[6]}$ mm. Up to which load does the wire obey Hooke’s law?`,
      ul: [
        r`Extension per newton $= 0.10 / 5 = ${ex3.k}$ mm N$^{-1}$ for the first six readings.`,
        r`Hooke prediction at 35 N: $${ex3.k} \times 35 = ${dec(ex3.pred, 3)}$ mm.`,
        r`Measured $${ex3.ext[6]}$ mm is larger by $${dec(ex3.dev, 2)}$ mm, so the limit is about $30$ N.`,
      ],
      v: plotLoadExt,
      n: `For the first six readings every five newtons adds the same point one zero millimetres, so the ratio is steady. Hooke’s law would predict ${dec(ex3.pred, 3)} millimetres at thirty five newtons, but we measured ${ex3.ext[6]}. The wire has left the straight line after thirty newtons, so that is about the limit of Hooke’s law.`,
    }),
    sl('check', 'Quick check: permanent set', {
      b: 'Work out the number.',
      v: plotUnload,
      chk: 'permset-num',
      n: 'Use the unloading line, which is parallel to the first straight part of the curve.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Stress', 'F / A in pascal; tensile, compressive, shear or hydraulic'],
          ['Strain', 'ΔL / L, angle θ = Δx / h, or ΔV / V; no unit'],
          ['Hooke’s law', 'stress ∝ strain within the proportional limit'],
          ['Curve', 'A proportional limit, B elastic limit and yield point, C ultimate stress, D fracture'],
          ['Beyond B', 'unloading is parallel to OA; a permanent strain remains'],
          ['Elastomer', 'elastic but not linear; no clear plastic region'],
        ],
        'Summary table of stress, strain, Hooke’s law, the stress-strain curve and elastomers',
      ),
      n: 'To sum up. Stress is force per area and strain is the fractional change, a number with no unit. Hooke’s law says stress is proportional to strain within the proportional limit. On the curve, A is the proportional limit, B the elastic limit and yield point, C the ultimate stress and D the fracture. Beyond B, unloading leaves a permanent strain. Elastomers are elastic but not linear.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Convert diameter to radius and millimetre to metre before using A = πr²: the commonest slip.',
        'Strain has no unit; if your strain carries one, you divided wrongly.',
        'Name the points on the curve in order: proportional limit, elastic limit and yield point, ultimate stress, fracture.',
        'Unloading beyond the elastic limit goes parallel to the initial line, not back along the loading curve.',
      ],
      v: T_EP,
      n: 'Convert the diameter to a radius and millimetres to metres before using the area formula. Remember that strain has no unit. On the stress strain curve, name the points in order: proportional limit, elastic limit and yield point, ultimate stress and fracture. And when you unload beyond the elastic limit, draw the unloading line parallel to the first straight part.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Mechanical Properties of Solids — Part 2: Elastic moduli and their applications',
  goals: [
    'Define and calculate Young’s modulus, the shear modulus and the bulk modulus',
    'Compare materials by their moduli, including steel against rubber',
    'Apply elastic behaviour to ropes, cranes, beams and bridges',
  ],
  slides: [
    sl('title', 'Elastic Moduli', {
      b: 'Part 2 — one number for each kind of strain tells us how stiff a material is.',
      v: V.ywires,
      n: 'Pull on three wires of equal size with the same load, one of steel, one of brass and one of aluminium. They stretch by different amounts. The number that describes this difference is the modulus of elasticity. In this part we meet three of them and use them for ropes, beams and the deep sea.',
    }),
    sl('concept', 'Young’s modulus', {
      b: 'For a wire of length L and area A stretched by ΔL under a force F:',
      m: [r`Y = \dfrac{\text{tensile stress}}{\text{longitudinal strain}} = \dfrac{F/A}{\Delta L/L} = \dfrac{F L}{A\,\Delta L}`],
      ul: [
        'SI unit: pascal (N m⁻²), the same as stress, since strain has no unit.',
        'Y depends only on the **material**, not on the length or the thickness of the wire.',
        'A larger Y means a stiffer material: less extension for the same stress.',
        'The same value works for compression within the elastic limit.',
      ],
      v: T_Y,
      n: 'Young’s modulus is the ratio of tensile stress to longitudinal strain. Written out, it is force times length divided by area times extension. Its unit is the pascal. It belongs to the material, not to the particular wire, so a thick wire and a thin one of the same metal have the same Young’s modulus. The table gives the values and the extension of one standard wire.',
    }),
    sl('diagram', 'Same wire, same load, different metals', {
      b: 'Each wire is 2.0 m long and 1.0 mm in diameter, and carries 200 N.',
      ul: [
        r`Extension $\Delta L = \dfrac{F L}{A Y}$: inversely proportional to $Y$ for equal $F$, $L$ and $A$.`,
        'Steel stretches least; aluminium most.',
        'In everyday speech we say steel is more elastic than rubber: it needs far more stress for the same strain.',
      ],
      v: V.ywires,
      n: `The bars show the extension of the three wires. Steel stretches about ${dec(kmm(Y.steel) * 200, 3)} millimetres, brass ${dec(kmm(Y.brass) * 200, 3)} and aluminium ${dec(kmm(Y.aluminium) * 200, 3)}. Extension is inversely proportional to Young’s modulus, so the metal with the largest modulus stretches least. That is why steel is called more elastic than rubber: it takes far more stress to produce the same strain.`,
    }),
    sl('example', 'Worked example 4: Young’s modulus from an experiment', {
      b: r`A wire of length $${ex4.L}$ m and diameter $${ex4.d * 1000}$ mm extends by $${ex4.dL * 1000}$ mm under a load of $${ex4.F}$ N. Find its Young modulus.`,
      ul: [
        r`$A = \pi (0.40 \times 10^{-3})^2 = ${sci(ex4.A, 3)}$ m$^2$; stress $= ${sci(ex4.stress, 3)}$ Pa.`,
        r`Strain $= ${ex4.dL * 1000} / ${ex4.L * 1000} = ${ex4.strain}$.`,
        r`$Y = \dfrac{${sci(ex4.stress, 3)}}{${ex4.strain}} = ${sci(ex4.Y, 3)}$ Pa: the wire is steel.`,
      ],
      v: T_EX4,
      n: `First find the area, about ${spk(ex4.A, 3)} square metres, then the stress, ${spk(ex4.stress, 3)} pascals. The strain is two millimetres divided by two thousand millimetres, which is point zero zero one. Dividing, Young’s modulus comes to ${spk(ex4.Y, 3)} pascals, which matches steel.`,
    }),
    sl('example', 'Worked example 5: stretch of a lift cable', {
      b: r`A steel cable of length $${ex5.L}$ m and cross-section $4.0$ cm$^2$ supports a load of mass $${ex5.m}$ kg ($g = ${g}$ m s$^{-2}$, $Y = 2.0 \times 10^{11}$ Pa). Find its extension.`,
      ul: [
        r`$F = mg = ${ex5.m} \times ${g} = ${ex5.F}$ N; $A = 4.0 \times 10^{-4}$ m$^2$.`,
        r`Stress $= ${ex5.F} / (4.0 \times 10^{-4}) = ${sci(ex5.stress, 3)}$ Pa; strain $= ${sci(ex5.strain, 3)}$.`,
        r`$\Delta L = \text{strain} \times L = ${sci(ex5.strain, 3)} \times ${ex5.L} = ${sci(ex5.dL, 3)}\ \text{m} = ${dec(ex5.dL * 1000, 3)}\ \text{mm}$.`,
      ],
      v: plotExt,
      n: `The weight is ${ex5.F} newtons. Divided by the area, the stress is ${spk(ex5.stress, 3)} pascals. Dividing by Young’s modulus gives a strain of ${spk(ex5.strain, 3)}. Multiplying by thirty metres, the cable stretches by only ${dec(ex5.dL * 1000, 3)} millimetres, which shows how stiff steel is.`,
    }),
    sl('check', 'Quick check: comparing wires', {
      b: 'Choose the correct option.',
      v: plotExt,
      chk: 'ytwostrain-mcq',
      n: 'Use the fact that, for equal force, length and area, the extension is inversely proportional to the Young modulus.',
    }),
    sl('concept', 'Shear modulus', {
      b: 'A tangential force F on a face of area A turns the faces through the angle θ.',
      m: [r`G = \dfrac{\text{shear stress}}{\text{shear strain}} = \dfrac{F/A}{\Delta x / h} = \dfrac{F}{A\,\theta}`],
      ul: [
        'Also called the **modulus of rigidity**; SI unit pascal.',
        'Only solids have a shear modulus: a fluid cannot resist a sideways force, it flows.',
        'For most metals G is smaller than Y, roughly Y / 3.',
      ],
      v: V.shear,
      n: 'When a force acts along a face, the body shears, and the shear modulus is the shear stress divided by the shear strain, which is the angle theta. It is also called the modulus of rigidity. Only solids have it, because a fluid just flows. For most metals it is smaller than Young’s modulus, roughly a third of it.',
    }),
    sl('example', 'Worked example 6: shear of a steel plate', {
      b: r`A force of $${ex6.F / 1000}$ kN acts along the top face of a steel block, $${ex6.a}$ m by $${ex6.b}$ m, of height $${ex6.h}$ m. For steel $G = 8.4 \times 10^{10}$ Pa. Find the shear angle and the sideways shift of the top face.`,
      ul: [
        r`Area $= ${ex6.a} \times ${ex6.b} = ${ex6.A}$ m$^2$; shear stress $= ${sci(ex6.F, 2)} / ${ex6.A} = ${sci(ex6.stress, 3)}$ Pa.`,
        r`$\theta = \text{stress}/G = \dfrac{${sci(ex6.stress, 2)}}{${sci(ex6.G, 2)}} = ${sci(ex6.theta, 2)}$ rad.`,
        r`$\Delta x = \theta h = ${sci(ex6.theta, 2)} \times ${ex6.h} = ${sci(ex6.dx, 2)}$ m, about one micrometre.`,
      ],
      v: V.shear,
      n: `The area of the face is point zero five square metres, so the shear stress is ${spk(ex6.stress, 2)} pascals. Dividing by the shear modulus gives an angle of ${spk(ex6.theta, 2)} radians. Multiplying by the height, the top face moves by about ${spk(ex6.dx, 2)} metres, around one micrometre, which is why a steel block looks perfectly rigid.`,
    }),
    sl('concept', 'Bulk modulus and compressibility', {
      b: 'Increase the pressure on every face by p and the volume falls by ΔV.',
      m: [r`B = -\dfrac{p}{\Delta V / V} = -\dfrac{p\,V}{\Delta V}`, r`\text{compressibility } k = \dfrac{1}{B}`],
      ul: [
        'The minus sign makes B positive, since ΔV is negative when p is positive.',
        'Solids, liquids and gases all have a bulk modulus; for gases it is far smaller.',
        'Liquids: water has B = 2.2 × 10⁹ Pa, so it is hard to compress but not impossible.',
      ],
      v: V.bulk,
      n: 'Squeeze a body equally from all sides and its volume falls. The bulk modulus is the pressure increase divided by the fractional decrease in volume, with a minus sign so that it comes out positive. Its reciprocal is the compressibility. Unlike the other moduli, it applies to liquids and gases as well as solids.',
    }),
    sl('example', 'Worked example 7: water at the bottom of the sea', {
      b: r`At a depth of $${ex7.h / 1000}$ km the extra pressure of sea water is $\rho g h$, with $\rho = ${RHO_WATER}$ kg m$^{-3}$ and $g = ${g}$ m s$^{-2}$. By what fraction does the volume of water shrink? ($B = 2.2 \times 10^9$ Pa)`,
      ul: [
        r`$p = \rho g h = ${RHO_WATER} \times ${g} \times ${ex7.h} = ${sci(ex7.p, 3)}$ Pa.`,
        r`$\dfrac{\Delta V}{V} = \dfrac{p}{B} = \dfrac{${sci(ex7.p, 3)}}{2.2 \times 10^{9}} = ${dec(ex7.frac, 3)}$, about ${dec(ex7.frac * 100, 3)} percent.`,
        r`So each $1$ m$^3$ of water loses about $${dec(ex7.litres, 3)}$ litres.`,
      ],
      v: plotWater,
      n: `The extra pressure at four kilometres depth is density times g times depth, ${spk(ex7.p, 3)} pascals. Dividing by the bulk modulus of water gives a fractional decrease of ${dec(ex7.frac, 3)}, about ${dec(ex7.frac * 100, 3)} percent. A cubic metre of water would lose roughly ${dec(ex7.litres, 3)} litres. Even at this depth water is only slightly compressed.`,
    }),
    sl('concept', 'The three moduli side by side', {
      b: 'Each modulus is a stress divided by the matching strain.',
      ul: [
        'Same unit for all three: pascal.',
        'A bigger modulus means a stiffer response; a gas has a tiny bulk modulus and a solid a huge one.',
        'A material can be stiff in one way and soft in another: rubber shears and stretches easily but resists compression strongly.',
      ],
      v: T_MOD,
      n: 'Here are the three moduli together. Young’s modulus links tensile stress to longitudinal strain. The shear modulus links shear stress to the angle of shear. The bulk modulus links pressure to volume strain. All three have the unit pascal, and a bigger modulus means a stiffer material for that kind of deformation.',
    }),
    sl('check', 'Quick check: which modulus?', {
      b: 'Choose the correct option.',
      v: T_MOD,
      chk: 'moduliapply-mcq',
      n: 'Ask which kinds of deformation a liquid can resist.',
    }),
    sl('concept', 'Cranes, lifts and ropes', {
      b: 'Elastic behaviour decides how a rope is designed.',
      ul: [
        'The rope’s breaking stress is a property of the steel; the rope must never be loaded near it.',
        '**Safety factor** = breaking stress ÷ working stress, often 8 to 10 for lifting ropes.',
        'The cross-section is chosen so that the working stress is well inside the elastic region.',
        'A rope of many thin strands is flexible; a solid rod of the same area would be too stiff to bend over a pulley.',
      ],
      v: T_ROPE,
      n: 'A crane or lift rope must never be loaded near its breaking stress. Engineers divide the breaking stress by a safety factor, often eight to ten, to get the working stress, and then choose the cross section so the load gives only that stress. The rope is made of many thin strands so that it stays flexible over pulleys.',
    }),
    sl('example', 'Worked example 8: choosing lift ropes', {
      b: r`A lift of total mass $${ex8.M}$ kg hangs from $${ex8.n}$ identical steel ropes. Steel of breaking stress $4.0 \times 10^8$ Pa is used with a safety factor of $${ex8.sf}$. Find the least radius of each rope (treat each as solid; $g = ${g}$ m s$^{-2}$).`,
      ul: [
        r`Load on one rope $= ${ex8.M} \times ${g} / ${ex8.n} = ${dec(ex8.F, 4)}$ N.`,
        r`Working stress $= 4.0 \times 10^8 / ${ex8.sf} = ${sci(ex8.sw, 2)}$ Pa.`,
        r`$A = F / \text{stress} = ${sci(ex8.A, 3)}$ m$^2$, so $r = \sqrt{A/\pi} = ${dec(ex8.r * 1000, 3)}$ mm.`,
      ],
      v: T_EX8,
      n: `Each rope carries a quarter of the weight, ${dec(ex8.F, 4)} newtons. With a safety factor of eight the working stress is ${spk(ex8.sw, 2)} pascals. The area is the load divided by that stress, ${spk(ex8.A, 3)} square metres, and the radius from the area comes to ${dec(ex8.r * 1000, 3)} millimetres.`,
    }),
    sl('concept', 'Beams, girders and bridges', {
      b: 'A beam on two supports with a load sags: the top layers are compressed and the bottom layers are stretched.',
      ul: [
        'A middle layer keeps its length; material near it carries little stress.',
        'The largest stresses are at the top and bottom surfaces, so beams are made **I-shaped**: wide flanges far from the middle, a thin web between.',
        'For the same material and load, a **deeper** beam sags much less than a shallow one; a stiffer material (larger Y) also sags less.',
        'This saves material and weight in bridges and building frames.',
      ],
      v: V.beam,
      n: 'When a beam carries a load, it bends. The upper layers are squeezed, the lower layers are stretched, and a middle layer keeps its length. The largest stresses are at the top and bottom, so the best use of steel is to put most of it there, in the flanges of an I shaped girder. A deeper beam also sags far less.',
    }),
    sl('example', 'Worked example 9: comparing two wires', {
      b: r`Wire B has twice the length and twice the radius of wire A; both are of the same material and carry the same load. Compare their extensions.`,
      ul: [
        r`$\Delta L = \dfrac{F L}{A Y} = \dfrac{F L}{\pi r^2 Y} \propto \dfrac{L}{r^2}$ for the same $F$ and $Y$.`,
        r`$\dfrac{\Delta L_B}{\Delta L_A} = \dfrac{${ex9.ll}}{${ex9.rr}^2} = ${dec(ex9.ratio, 2)}$.`,
        'A longer wire stretches more; a thicker wire stretches less, with the square of the radius.',
      ],
      v: T_EX9,
      n: `Extension is proportional to length divided by the square of the radius. Wire B has twice the length, which doubles the extension, and twice the radius, which cuts it to a quarter. The ratio is two divided by four, which is ${dec(ex9.ratio, 2)}. So the longer, thicker wire stretches half as much as wire A.`,
    }),
    sl('example', 'Worked example 10: two wires in series', {
      b: r`A steel wire ($${ex10.Ls}$ m) is joined end to end to a copper wire ($${ex10.Lc}$ m); both have diameter $${ex10.d * 1000}$ mm and the combination carries $${ex10.F}$ N. Find the total extension ($Y_\text{steel} = 2.0 \times 10^{11}$ Pa, $Y_\text{Cu} = 1.1 \times 10^{11}$ Pa).`,
      ul: [
        r`The same force acts in both wires. $A = ${sci(ex10.A, 3)}$ m$^2$.`,
        r`Steel: $\Delta L = F L / (A Y) = ${dec(ex10.ds * 1000, 4)}$ mm; copper: $${dec(ex10.dc * 1000, 4)}$ mm.`,
        r`Total $= ${dec(ex10.ds * 1000, 4)} + ${dec(ex10.dc * 1000, 4)} = ${dec(ex10.tot * 1000, 4)}$ mm.`,
      ],
      v: T_EX10,
      n: `In a series arrangement the same force acts in each wire and the extensions add. The steel wire stretches ${dec(ex10.ds * 1000, 4)} millimetres and the copper wire ${dec(ex10.dc * 1000, 4)} millimetres, a total of ${dec(ex10.tot * 1000, 4)} millimetres. The shorter copper wire stretches slightly more, because its Young’s modulus is lower.`,
    }),
    sl('check', 'Quick check: a deep-sea compression', {
      b: 'Choose the correct option.',
      v: plotWater,
      chk: 'deepsea-mcq',
      n: 'The fractional change of volume is the pressure increase divided by the bulk modulus.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Young’s modulus', 'Y = F L / (A ΔL); the material’s stiffness in stretching'],
          ['Shear modulus', 'G = F / (A θ); solids only'],
          ['Bulk modulus', 'B = − p V / ΔV; compressibility = 1 / B'],
          ['Wires', 'ΔL ∝ F L / (r² Y); in series the extensions add'],
          ['Ropes', 'working stress = breaking stress ÷ safety factor'],
          ['Beams', 'I-section; deeper beam sags less'],
        ],
        'Summary table of Young, shear and bulk moduli, wire extension, rope design and beams',
      ),
      n: 'To sum up. Young’s modulus is stress over longitudinal strain, the shear modulus is stress over the shear angle, and the bulk modulus is pressure over fractional volume change. Extension of a wire grows with length and falls with the square of the radius and with the modulus. Ropes are designed with a safety factor, and beams are made deep and I shaped.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Write which modulus applies before choosing the formula; fluids have only a bulk modulus.',
        'Wires in series carry the same force and their extensions add; in parallel they share the extension.',
        'Quote the data given (Y, B, g) and keep all lengths in metres and areas in square metres.',
        'For a design question say what the safety factor is and why it is used.',
      ],
      v: T_MOD,
      n: 'First decide which modulus applies; a liquid has only a bulk modulus. When wires are joined end to end, the same force acts in each and the extensions add. Keep lengths in metres and areas in square metres, and use the data given. In a design question, say what the safety factor is and why engineers use it.',
    }),
  ],
});

export const NUMCHECK = {
  slope: (CUR.sigma(CUR.eA) - CUR.sigma(0)) / CUR.eA,
};
void pwl;
void areaR;
