// ch08 question bank, part 2: t02 (Young's, shear and bulk moduli; ropes, beams and bridges).
// Material data are stated in each stem; every numerical is computed here and re-solved by a different route.
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, Y, B_WATER, RHO_WATER, areaD, areaR, radiusA, elongate, usci, R6 } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));
const ok = (cond, msg) => cond || msg;

// ================================================================ t02 objective items
add('ymaterial-mcq', mcq({
  stem: 'A copper wire is cut into two pieces, one twice as long as the other, and the shorter piece is then hammered thinner. The Young modulus of the two pieces compares as',
  right: 'equal, because it depends only on the material',
  wrong: ['the longer piece has twice the value', 'the thinner piece has the larger value', 'the shorter piece has twice the value'],
  sol: 'Young’s modulus Y = (F/A)/(ΔL/L) is a property of the material; length and thickness cancel out of the ratio — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
const yc = { steel: Y.steel, cu: Y.copper };
yc.ratio = yc.cu / yc.steel;
add('ytwostrain-mcq', mcq({
  stem: 'Two wires of identical length and diameter, one of steel (Y = 2.0 × 10¹¹ Pa) and one of copper (Y = 1.1 × 10¹¹ Pa), carry the same load within their elastic limits. The ratio (extension of steel) : (extension of copper) is',
  right: `${dec(yc.ratio, 2)}: the steel wire stretches less`,
  wrong: [`${dec(1 / yc.ratio, 2)}: the steel wire stretches more`, '1.00: both stretch equally because they have equal size', `${dec(yc.ratio ** 2, 2)}: the steel wire stretches less`],
  sol: `For equal F, L and A the extension ΔL = FL/(AY) is inversely proportional to Y: ΔL_steel/ΔL_Cu = Y_Cu/Y_steel = (1.1 × 10¹¹)/(2.0 × 10¹¹) = ${dec(yc.ratio, 2)} — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => ok(near(elongate(10, 1, 1e-6, yc.steel) / elongate(10, 1, 1e-6, yc.cu), 0.55, 1e-9), 'yc'));
add('moduliapply-mcq', mcq({
  stem: 'A sealed syringe is full of water, and pushing the plunger compresses the water very slightly. Of Young’s modulus, the shear modulus and the bulk modulus, the water has',
  right: 'only a bulk modulus: it resists change of volume but flows under a sideways force and has no fixed shape',
  wrong: ['all three moduli, just like steel', 'a Young modulus and a shear modulus but no bulk modulus', 'a shear modulus only, because it is under pressure'],
  sol: 'A fluid cannot sustain a shear stress (it flows), so it has no shear modulus; it is the volume that changes under pressure, so the bulk modulus applies — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('shearmod-mcq', mcq({
  stem: 'A rubber pad lies between a bridge girder and its pier. A horizontal force parallel to the top face makes the top face slide a little. The elastic constant that describes this deformation is the',
  right: 'shear modulus (modulus of rigidity): tangential stress divided by the angle of shear',
  wrong: ['Young modulus: tensile stress divided by longitudinal strain', 'bulk modulus: pressure change divided by fractional change of volume', 'compressibility: fractional change of volume per unit pressure'],
  sol: 'A force along the face is a shear stress and the strain is the angle of shear, so the relevant modulus is G = (F/A)/θ — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
const bk = { air: 1.0e5, water: 2.2e9, steel: 1.6e11 };
bk.kAir = 1 / bk.air;
add('bulkcompr-mcq', mcq({
  stem: 'The bulk moduli of three substances are: air 1.0 × 10⁵ Pa, water 2.2 × 10⁹ Pa and steel 1.6 × 10¹¹ Pa. Which is the most compressible, and what is its compressibility?',
  right: `air, ${dec(bk.kAir * 1e5, 2)} × 10⁻⁵ Pa⁻¹`,
  wrong: [`steel, ${dec((1 / bk.steel) * 1e12, 2)} × 10⁻¹² Pa⁻¹`, `water, ${dec((1 / bk.water) * 1e10, 2)} × 10⁻¹⁰ Pa⁻¹`, `air, 1.0 × 10⁵ Pa⁻¹`],
  sol: `Compressibility = 1/B. The smallest modulus gives the largest compressibility: air, 1/(1.0 × 10⁵) = ${dec(bk.kAir * 1e5, 2)} × 10⁻⁵ Pa⁻¹ — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('radius-mcq', mcq({
  stem: 'A wire P of radius r carries a load F and stretches by e. A second wire Q of the same material and length has radius 2r and carries a load 2F. Within the elastic limit the extension of Q is',
  right: 'e/2',
  wrong: ['2e', 'e', 'e/4'],
  sol: 'ΔL = FL/(πr²Y) ∝ F/r². For Q: (2F)/(2r)² = F/(2r²), which is one half of P’s F/r², so the extension is e/2 — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('strand-mcq', mcq({
  stem: 'The steel rope of a port crane is made of many thin wires twisted together rather than of one solid steel rod of the same total cross-section. The main reason is that the rope',
  right: 'bends easily over a pulley while the combined cross-section still carries the load',
  wrong: ['has a lower breaking stress, so it needs a smaller safety factor', 'has a larger Young modulus than a solid rod of the same steel', 'does not stretch at all, so no safety factor is needed'],
  sol: 'Many thin strands are flexible, yet the sum of their cross-sections carries the load. Young’s modulus is a property of the steel, and a safety factor is needed for any rope — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('girder-mcq', mcq({
  stem: 'Steel girders in a railway bridge have an I-shaped cross-section, with most of the steel in the top and bottom flanges. This is because',
  right: 'the stress from bending is greatest at the top and bottom layers, so material there resists bending best for the weight used',
  wrong: ['steel is stronger in the shape of the letter I than in any other shape', 'the middle layer carries the greatest stress, so it must be thin to save weight', 'the top and bottom layers do not stretch or compress at all'],
  sol: 'In a bent beam the top layers are compressed and the bottom layers stretched, the middle layer is unchanged; the largest stresses are far from the middle, so material is placed there — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const ds = { p: 4.4e7 };
ds.frac = ds.p / B_WATER;
add('deepsea-mcq', mcq({
  stem: 'Sea water has bulk modulus 2.2 × 10⁹ Pa. At a depth where the pressure is higher than at the surface by 4.4 × 10⁷ Pa, the fractional decrease in the volume of the water is',
  right: `${dec(ds.frac * 100, 2)} × 10⁻²`,
  wrong: ['2.0 × 10⁻³', '5.0 × 10¹', '9.7 × 10¹⁶'],
  sol: `ΔV/V = p/B = (4.4 × 10⁷)/(2.2 × 10⁹) = ${dec(ds.frac, 2)} = ${dec(ds.frac * 100, 2)} × 10⁻² — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => ok(near(ds.frac, 0.02, 1e-9), 'ds'));
add('steelrubber-ar', ar({
  a: 'Steel is considered more elastic than rubber.',
  r: 'Rubber can be stretched to a much larger strain than steel before it fractures.',
  key: 'b',
  sol: 'A is true: for the same stress steel shows a far smaller strain (larger modulus), so it is called more elastic. R is true, but it speaks of how far rubber stretches, not of the stress needed per unit strain, so it does not explain A — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('steelcopper-ar', ar({
  a: 'For the same load, a steel wire stretches less than a copper wire of the same length and diameter.',
  r: 'The Young modulus of steel is smaller than that of copper.',
  key: 'c',
  sol: 'A is true: ΔL = FL/(AY) is smaller for the larger Y. R is false: steel (2.0 × 10¹¹ Pa) has a larger modulus than copper (1.1 × 10¹¹ Pa) — option (c).',
  d: 2, c: 'application', t: [2],
}));
add('beamlayers-ar', ar({
  a: 'In a loaded bridge girder, the material close to the middle layer carries much less stress than the material at the top and bottom surfaces.',
  r: 'When a beam bends, its top layers are compressed and its bottom layers are stretched, while the middle layer keeps its length.',
  key: 'a',
  sol: 'Both are true and R explains A: the strain, and so the stress, grows with distance from the unchanged middle layer — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('samey-tf', tf({
  stem: 'A thin steel wire and a thick steel rod have the same Young modulus.',
  key: 't',
  sol: 'True. Young’s modulus is a property of the material; the force per unit area and the strain per unit length remove the dependence on thickness and length.',
  d: 1, c: 'recall', t: [2],
}));
add('gasbulk-tf', tf({
  stem: 'A gas has no bulk modulus, because it can be compressed without any limit.',
  key: 'f',
  sol: 'False. A gas has a bulk modulus; it is simply very small (for air about 1 × 10⁵ Pa), so the gas is easily compressed. Gases and liquids have a bulk modulus but no Young or shear modulus.',
  d: 2, c: 'understanding', t: [2],
}));
add('compress-fill', fill({
  stem: 'A hydraulic engineer quotes the reciprocal of the bulk modulus of an oil as the ___ of the oil.',
  acc: [['compressibility']],
  sol: 'The reciprocal of the bulk modulus is the **compressibility**, k = 1/B.',
  d: 1, c: 'recall', t: [2],
}));

// ================================================================ t02 numericals
const c1 = { m: 1200, L: 40, A: 3.0e-4, Y: Y.steel };
c1.F = R6(c1.m * g);
c1.dL = elongate(c1.F, c1.L, c1.A, c1.Y);
add('elongcable-num', num({
  stem: 'A steel cable 40 m long, of cross-section 3.0 cm², lifts a load of mass 1200 kg at a construction site. Taking g = 9.8 m s⁻² and Y = 2.0 × 10¹¹ Pa, find the extension of the cable, in mm.',
  value: v3(c1.dL * 1000), tol: 0.05, unit: 'mm',
  sol: r`$F = mg = 1200 \times ${g} = ${c1.F}$ N. Stress $= \dfrac{${c1.F}}{3.0 \times 10^{-4}} = ${sci(c1.F / c1.A, 3)}$ Pa; strain $= \dfrac{${sci(c1.F / c1.A, 3)}}{2.0 \times 10^{11}} \approx ${sci(c1.F / c1.A / c1.Y, 3)}$. Extension $\Delta L = \text{strain} \times L \approx ${sci(c1.F / c1.A / c1.Y, 3)} \times 40 \approx ${sci(c1.dL, 3)}\ \text{m} = ${v3(c1.dL * 1000)}$ mm.`,
  scheme: [[`Load F = mg = ${c1.F} N; stress = F/A = ${usci(c1.F / c1.A, 3)} Pa`, 1], [`Strain = stress/Y; ΔL = strain × L = ${v3(c1.dL * 1000)} mm`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => ok(near(c1.m * 9.8 * 40 / (3.0e-4 * 2.0e11) * 1000, q.answer.value, 0.003), 'c1'));
const yb = { L: 1.8, d: 0.9e-3, F: 70, dL: 2.2e-3 };
yb.A = areaD(yb.d);
yb.Y = (yb.F * yb.L) / (yb.A * yb.dL);
add('youngs-num', num({
  stem: 'A brass wire of length 1.8 m and diameter 0.90 mm extends by 2.2 mm when a load of 70 N hangs from it. Find the Young modulus of brass from this reading, in units of 10¹⁰ Pa.',
  value: v3(yb.Y / 1e10), tol: 0.05, unit: '× 10¹⁰ Pa',
  sol: r`$A = \pi (0.45 \times 10^{-3})^2 \approx ${sci(yb.A, 3)}$ m$^2$. $Y = \dfrac{F L}{A\,\Delta L} = \dfrac{70 \times 1.8}{${sci(yb.A, 3)} \times 2.2 \times 10^{-3}} \approx ${sci(yb.Y, 3)}$ Pa. In units of $10^{10}$ Pa: $Y = ${v3(yb.Y / 1e10)}$.`,
  scheme: [['A = πr² with r = 0.45 mm', 1], [`Y = FL/(AΔL) ≈ ${v3(yb.Y / 1e10)} × 10¹⁰ Pa`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => ok(near(((70 / (Math.PI * 0.45e-3 ** 2)) / (2.2e-3 / 1.8)) / 1e10, q.answer.value, 0.003), 'yb'));
const sp = { a: 0.15, b: 0.2, h: 0.05, F: 3000, G: 1.0e6 };
sp.A = sp.a * sp.b;
sp.stress = sp.F / sp.A;
sp.theta = sp.stress / sp.G;
sp.dx = sp.theta * sp.h;
add('shearpad-num', num({
  stem: 'A rubber pad 15 cm by 20 cm and 5.0 cm thick is fixed at its base. A force of 3000 N acts along its top face. Taking the shear modulus of the rubber as 1.0 × 10⁶ Pa, find the sideways displacement of the top face, in mm (use the small-angle form Δx = θ h).',
  value: v3(sp.dx * 1000), tol: 0.05, unit: 'mm',
  sol: r`$A = 0.15 \times 0.20 = ${sp.A}$ m$^2$. Shear stress $= \dfrac{3000}{${sp.A}} = ${sci(sp.stress, 2)}$ Pa. $\theta = \dfrac{\text{stress}}{G} = \dfrac{${sci(sp.stress, 2)}}{1.0 \times 10^{6}} = ${sp.theta}$ rad. $\Delta x = \theta h = ${sp.theta} \times 0.050 = ${sci(sp.dx, 2)}\ \text{m} = ${v3(sp.dx * 1000)}$ mm.`,
  scheme: [[`Shear stress = F/A = ${usci(sp.stress, 2)} Pa`, 1], [`θ = stress/G = ${sp.theta} rad; Δx = θh = ${v3(sp.dx * 1000)} mm`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => ok(near((3000 / (0.15 * 0.2) / 1.0e6) * 0.05 * 1000, q.answer.value, 1e-9), 'sp'));
const bs = { B: 1.6e11, V: 2.0e-3, p: 8.0e7 };
bs.dV = (bs.p * bs.V) / bs.B;
add('bulksphere-num', num({
  stem: 'A sealed steel sphere of volume 2.0 × 10⁻³ m³ is lowered into an ocean trench where the pressure is 8.0 × 10⁷ Pa higher than at the surface. The bulk modulus of steel is 1.6 × 10¹¹ Pa. Find the decrease in volume of the sphere, in cm³.',
  value: v3(bs.dV * 1e6), tol: 0.02, unit: 'cm³',
  sol: r`$B = -\dfrac{p V}{\Delta V}$, so $|\Delta V| = \dfrac{p V}{B} = \dfrac{8.0 \times 10^{7} \times 2.0 \times 10^{-3}}{1.6 \times 10^{11}} = ${sci(bs.dV, 2)}\ \text{m}^3 = ${v3(bs.dV * 1e6)}$ cm³.`,
  scheme: [['|ΔV| = pV/B', 1], [`= ${usci(bs.dV, 2)} m³ = ${v3(bs.dV * 1e6)} cm³`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => ok(near(((8.0e7 / 1.6e11) * 2.0e-3) * 1e6, q.answer.value, 1e-9), 'bs'));
const dw = { h: 2500, V: 1.0e-3 };
dw.p = RHO_WATER * g * dw.h;
dw.frac = dw.p / B_WATER;
dw.dV = dw.frac * dw.V;
add('deepwater-num', num({
  stem: 'A diver’s equipment includes a sealed bottle holding 1.0 litre of fresh water, taken to a depth of 2.5 km in the sea. The extra pressure at that depth is ρgh, with ρ = 1000 kg m⁻³ and g = 9.8 m s⁻²; the bulk modulus of water is 2.2 × 10⁹ Pa. Find the decrease in the volume of the water, in cm³ (1 litre = 1000 cm³).',
  value: v3(dw.dV * 1e6), tol: 0.1, unit: 'cm³',
  sol: r`$p = \rho g h = 1000 \times ${g} \times 2500 = ${sci(dw.p, 3)}$ Pa. $\dfrac{\Delta V}{V} = \dfrac{p}{B} = \dfrac{${sci(dw.p, 3)}}{2.2 \times 10^{9}} \approx ${dec(dw.frac, 3)}$. $\Delta V \approx ${dec(dw.frac, 3)} \times 1000\ \text{cm}^3 = ${v3(dw.dV * 1e6)}$ cm³.`,
  scheme: [[`p = ρgh = ${usci(dw.p, 3)} Pa`, 1], [`ΔV/V = p/B ≈ ${dec(dw.frac, 3)}`, 1], [`ΔV = ${v3(dw.dV * 1e6)} cm³`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => ok(near(1000 * 9.8 * 2500 / 2.2e9 * 1000, q.answer.value, 0.005), 'dw'));
const rt = { r1: 0.5, r2: 1.5 };
rt.ratio = (rt.r2 / rt.r1) ** 2;
add('ratio-num', num({
  stem: 'Two wires of the same material and the same length carry the same load. Wire 1 has radius 0.50 mm and wire 2 has radius 1.5 mm. Find the ratio (extension of wire 1) : (extension of wire 2).',
  value: rt.ratio, tol: 0.05, unit: null,
  sol: r`$\Delta L = \dfrac{F L}{\pi r^2 Y} \propto \dfrac{1}{r^2}$ for equal $F$, $L$ and $Y$. So $\dfrac{\Delta L_1}{\Delta L_2} = \left(\dfrac{r_2}{r_1}\right)^2 = \left(\dfrac{1.5}{0.50}\right)^2 = ${rt.ratio}$.`,
  scheme: [['Extension ∝ 1/r²', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => ok(near(areaR(1.5e-3) / areaR(0.5e-3), q.answer.value, 1e-9), 'rt'));
const cp = { La: 1.2, da: 0.8e-3, Ls: 0.8, F: 90 };
cp.A = areaD(cp.da);
cp.dal = elongate(cp.F, cp.La, cp.A, Y.aluminium);
cp.dst = elongate(cp.F, cp.Ls, cp.A, Y.steel);
cp.tot = cp.dal + cp.dst;
add('composite-num', num({
  stem: 'An aluminium wire 1.2 m long is joined end to end to a steel wire 0.80 m long; both have diameter 0.80 mm. The combination carries a load of 90 N. Taking Y = 7.0 × 10¹⁰ Pa for aluminium and 2.0 × 10¹¹ Pa for steel, find the total extension, in mm.',
  value: v3(cp.tot * 1000), tol: 0.02, unit: 'mm',
  sol: r`The same force acts in both wires and the extensions add. $A = \pi (0.40 \times 10^{-3})^2 \approx ${sci(cp.A, 3)}$ m$^2$. Aluminium: $\Delta L_1 = \dfrac{F L}{A Y} = \dfrac{90 \times 1.2}{${sci(cp.A, 3)} \times 7.0 \times 10^{10}} \approx ${dec(cp.dal * 1000, 4)}$ mm. Steel: $\Delta L_2 = \dfrac{90 \times 0.80}{${sci(cp.A, 3)} \times 2.0 \times 10^{11}} \approx ${dec(cp.dst * 1000, 4)}$ mm. Total $\approx ${dec(cp.dal * 1000, 4)} + ${dec(cp.dst * 1000, 4)} = ${v3(cp.tot * 1000)}$ mm.`,
  scheme: [['Same force in both wires; extensions add', 1], [`Aluminium ${dec(cp.dal * 1000, 4)} mm, steel ${dec(cp.dst * 1000, 4)} mm`, 1], [`Total = ${v3(cp.tot * 1000)} mm`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => ok(near((90 * 1.2 / (Math.PI * 0.4e-3 ** 2 * 7.0e10) + 90 * 0.8 / (Math.PI * 0.4e-3 ** 2 * 2.0e11)) * 1000, q.answer.value, 0.003), 'cp'));
const cr = { M: 4000, sb: 5.0e8, sf: 10 };
cr.F = R6(cr.M * g);
cr.sw = cr.sb / cr.sf;
cr.A = cr.F / cr.sw;
cr.r = radiusA(cr.A);
add('craneradius-num', num({
  stem: 'A harbour crane lifts a steel girder of mass 4.0 tonnes (1 tonne = 1000 kg) with a single steel rope. The steel has breaking stress 5.0 × 10⁸ Pa and a safety factor of 10 is used. Taking g = 9.8 m s⁻² and treating the rope as solid, find the least radius of the rope, in mm.',
  value: v3(cr.r * 1000), tol: 0.1, unit: 'mm',
  sol: r`$F = mg = 4000 \times ${g} = ${cr.F}$ N. Working stress $= \dfrac{5.0 \times 10^{8}}{10} = ${sci(cr.sw, 2)}$ Pa. $A = \dfrac{F}{\text{stress}} = \dfrac{${cr.F}}{${sci(cr.sw, 2)}} = ${sci(cr.A, 3)}$ m$^2$. $r = \sqrt{A/\pi} \approx ${sci(cr.r, 3)}\ \text{m} = ${v3(cr.r * 1000)}$ mm.`,
  scheme: [['Working stress = breaking stress ÷ safety factor = 5.0 × 10⁷ Pa', 1], [`A = F/stress = ${usci(cr.A, 3)} m²`, 1], [`r = √(A/π) = ${v3(cr.r * 1000)} mm`, 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), (q) => ok(near(Math.sqrt((4000 * 9.8 / (5.0e8 / 10)) / Math.PI) * 1000, q.answer.value, 0.003), 'cr'));
const pl = { a: 0.4, L: 3.0, F: 2.4e5, Y: 3.0e10 };
pl.A = R6(pl.a * pl.a);
pl.dL = (pl.F / pl.A / pl.Y) * pl.L;
add('pillar-num', num({
  stem: 'A concrete pillar of square cross-section 0.40 m by 0.40 m and height 3.0 m carries a vertical load of 2.4 × 10⁵ N. Taking Y = 3.0 × 10¹⁰ Pa for concrete in compression, find how much the pillar shortens, in mm.',
  value: v3(pl.dL * 1000), tol: 0.005, unit: 'mm',
  sol: r`$A = 0.40 \times 0.40 = ${pl.A}$ m$^2$. Stress $= \dfrac{2.4 \times 10^{5}}{${pl.A}} = ${sci(pl.F / pl.A, 2)}$ Pa; strain $= \dfrac{${sci(pl.F / pl.A, 2)}}{3.0 \times 10^{10}} = ${sci(pl.F / pl.A / pl.Y, 2)}$. Shortening $= \text{strain} \times L = ${sci(pl.F / pl.A / pl.Y, 2)} \times 3.0 = ${sci(pl.dL, 2)}\ \text{m} = ${v3(pl.dL * 1000)}$ mm.`,
  scheme: [['Stress = F/A and strain = stress/Y', 1], [`ΔL = strain × L = ${v3(pl.dL * 1000)} mm`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => ok(near(2.4e5 * 3.0 / (0.16 * 3.0e10) * 1000, q.answer.value, 1e-9), 'pl'));
const bn = { m: 70, A: 3.0e-4, L: 0.45, Y: 1.6e10 };
bn.F = R6(bn.m * g);
bn.dL = elongate(bn.F, bn.L, bn.A, bn.Y);
add('bone-num', num({
  stem: 'A student of mass 70 kg stands on one leg, so that her whole weight acts along one thigh bone (femur) of length 0.45 m and effective cross-section 3.0 cm². For the bone take Y = 1.6 × 10¹⁰ Pa and g = 9.8 m s⁻². Find the shortening of the bone, in micrometres (1 μm = 10⁻⁶ m).',
  value: v3(bn.dL * 1e6), tol: 0.2, unit: 'μm',
  sol: r`$F = mg = 70 \times ${g} = ${bn.F}$ N; $A = 3.0 \times 10^{-4}$ m$^2$. Stress $= \dfrac{${bn.F}}{3.0 \times 10^{-4}} \approx ${sci(bn.F / bn.A, 3)}$ Pa; strain $= \dfrac{${sci(bn.F / bn.A, 3)}}{1.6 \times 10^{10}} \approx ${sci(bn.F / bn.A / bn.Y, 3)}$. $\Delta L \approx ${sci(bn.F / bn.A / bn.Y, 3)} \times 0.45 \approx ${sci(bn.dL, 3)}\ \text{m} = ${v3(bn.dL * 1e6)}$ μm.`,
  scheme: [[`Weight = ${bn.F} N; stress = F/A`, 1], [`Strain = stress/Y; ΔL = ${v3(bn.dL * 1e6)} μm`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => ok(near(70 * 9.8 * 0.45 / (3.0e-4 * 1.6e10) * 1e6, q.answer.value, 0.003), 'bn'));
const sl8 = { e: 8.0e-4, s: 88e6 };
sl8.Y = sl8.s / sl8.e;
add('slopey-num', num({
  stem: 'The straight part of the stress–strain graph of a metal wire passes through the point (strain 8.0 × 10⁻⁴, stress 88 MPa). Find the Young modulus of the metal, in units of 10¹¹ Pa.',
  value: v3(sl8.Y / 1e11), tol: 0.01, unit: '× 10¹¹ Pa',
  sol: r`Within the straight part $Y$ is the slope: $Y = \dfrac{\text{stress}}{\text{strain}} = \dfrac{88 \times 10^{6}}{8.0 \times 10^{-4}} = ${sci(sl8.Y, 2)}$ Pa. In units of $10^{11}$ Pa: $Y = ${v3(sl8.Y / 1e11)}$ (the metal is copper).`,
  scheme: [['Y = slope = stress/strain', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => ok(near(88e6 / 8.0e-4 / 1e11, q.answer.value, 1e-9), 'sl8'));
const oi = { p: 5.0e6, B: 1.6e9 };
oi.frac = oi.p / oi.B;
add('oilfrac-num', num({
  stem: 'The pressure on a sample of hydraulic oil is raised by 5.0 × 10⁶ Pa. The bulk modulus of the oil is 1.6 × 10⁹ Pa. Find the fractional decrease of its volume, in units of 10⁻³.',
  value: v3(oi.frac * 1e3), tol: 0.01, unit: '× 10⁻³',
  sol: r`$\dfrac{\Delta V}{V} = \dfrac{p}{B} = \dfrac{5.0 \times 10^{6}}{1.6 \times 10^{9}} = ${sci(oi.frac, 3)}$. In units of $10^{-3}$: $\dfrac{\Delta V}{V} = ${v3(oi.frac * 1e3)}$.`,
  scheme: [['ΔV/V = p/B', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => ok(near(5.0e6 / 1.6e9 * 1e3, q.answer.value, 0.004), 'oi'));
const pw = { L: 2.0, d: 1.0e-3, dL: 0.6e-3 };
pw.A = areaD(pw.d);
pw.eps = pw.dL / pw.L;
pw.Fs = Y.steel * pw.A * pw.eps;
pw.Fc = Y.copper * pw.A * pw.eps;
pw.F = pw.Fs + pw.Fc;
add('parallel-num', num({
  stem: 'A steel wire and a copper wire, each 2.0 m long and 1.0 mm in diameter, are fixed side by side between the same two clamps, so that both stretch by the same amount. Taking Y = 2.0 × 10¹¹ Pa for steel and 1.1 × 10¹¹ Pa for copper, find the total load needed to produce a common extension of 0.60 mm, in N.',
  value: v3(pw.F), tol: 0.2, unit: 'N',
  sol: r`Both wires have strain $= \dfrac{0.60 \times 10^{-3}}{2.0} = ${sci(pw.eps, 2)}$. With $A = \pi (0.50 \times 10^{-3})^2 \approx ${sci(pw.A, 3)}$ m$^2$, each wire carries $F = Y A\,\varepsilon$. Steel: $F_s \approx ${dec(pw.Fs, 4)}$ N; copper: $F_c \approx ${dec(pw.Fc, 4)}$ N. Total $\approx ${dec(pw.Fs, 4)} + ${dec(pw.Fc, 4)} = ${v3(pw.F)}$ N.`,
  scheme: [['Same extension and length: same strain 3.0 × 10⁻⁴; forces add', 1], [`F = Y A ε for each: ${dec(pw.Fs, 4)} N and ${dec(pw.Fc, 4)} N`, 1], [`Total = ${v3(pw.F)} N`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [2],
}), (q) => ok(near((Y.steel + Y.copper) * Math.PI * 0.5e-3 ** 2 * (0.6e-3 / 2.0), q.answer.value, 0.003), 'pw'));

// ================================================================ t02 short answers
add('ymod-short', short({
  marks: 2,
  stem: 'Define Young’s modulus and state its SI unit. Why do a thick copper wire and a thin copper wire have the same value of it?',
  model: '**Young’s modulus** is the ratio of tensile stress to longitudinal strain, Y = (F/A)/(ΔL/L) = FL/(AΔL); its unit is the pascal. Stress is force per area and strain is extension per length, so size cancels out: the value depends only on the **material**, hence thick and thin copper wires share it.',
  sol: 'Stress/strain; pascal; material property.',
  scheme: [['Definition Y = stress/strain with unit pascal', 1], ['Depends only on the material (size cancels)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fluid-short', short({
  marks: 2,
  stem: 'Why can a liquid have a bulk modulus but no shear modulus?',
  model: 'A **bulk modulus** needs only a change of volume under pressure, and a liquid resists that. A **shear modulus** needs the body to resist a sideways force with a fixed shape, but a liquid **flows** under any shear stress, so it cannot maintain a shear strain.',
  sol: 'Volume resisted; flows under shear.',
  scheme: [['Liquid resists change of volume: bulk modulus exists', 1], ['Liquid flows under shear stress: no shear modulus', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('igirder-short', short({
  marks: 2,
  stem: 'A designer must carry the same bending load on a bridge with the least weight of steel. Explain why she chooses an I-shaped girder instead of a solid square bar.',
  model: 'When a girder bends, the **top layers are compressed**, the bottom layers are stretched and the middle layer is unchanged, so stress is largest at the top and bottom. An **I-section** puts most of the steel in those flanges and little in the lightly stressed middle, so the girder is as stiff as a solid bar of much greater weight.',
  sol: 'Stress greatest at top and bottom; material placed there.',
  scheme: [['Bending stress greatest far from the middle layer', 1], ['I-section puts material in flanges: same stiffness for less steel', 1]],
  d: 2, c: 'application', t: [2],
}));
add('steelrubber-short3', short({
  marks: 3,
  stem: 'A student says: "Rubber stretches far more than steel, so rubber is more elastic." Explain whether she is right, using Young’s modulus.',
  model: 'She is **wrong**. Elasticity is about regaining shape and about how large a stress is needed for a given strain, measured by the modulus. For the same stress steel gives a very small strain, so its Young modulus (about 2.0 × 10¹¹ Pa) is much larger than that of rubber. Rubber stretches easily, but it needs a far smaller stress per unit strain, so it has the smaller modulus.',
  sol: 'Larger Y means more elastic; steel has the larger Y.',
  scheme: [['Elasticity judged by stress needed per unit strain (modulus)', 1], ['Steel: small strain for a given stress, large Y', 1], ['Rubber stretches easily because Y is small; so steel is more elastic', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('rope-short3', short({
  marks: 3,
  stem: 'A crane lifts heavy steel girders with a rope made of many thin twisted wires. Explain why a safety factor is used and why the rope has many thin strands.',
  model: 'The **safety factor** is the breaking stress divided by the working stress. Using a rope of enough cross-section so that the working stress is a small fraction (say one-tenth) of the breaking stress keeps it inside the elastic region even with jerks and ageing. **Many thin strands** make the rope flexible over pulleys, while the total cross-section still carries the load.',
  sol: 'Safety factor; flexibility.',
  scheme: [['Safety factor = breaking stress ÷ working stress', 1], ['Keeps the rope in the elastic region despite jerks and ageing', 1], ['Many strands: flexible, same total cross-section', 1]],
  d: 3, c: 'application', t: [2],
}));
add('threemod-short3', short({
  marks: 3,
  stem: 'Name the three elastic moduli of a material. For each, state the kind of stress, the kind of strain, and one body to which it applies.',
  model: '**Young’s modulus** = tensile or compressive stress ÷ longitudinal strain (ΔL/L); a stretched steel wire. **Shear modulus** = shear stress ÷ angle of shear θ; a rubber pad under a sideways force (solids only). **Bulk modulus** = pressure change ÷ fractional change of volume (−ΔV/V); water in a sealed vessel (solids, liquids or gases).',
  sol: 'Y, G and B with stress, strain and example.',
  scheme: [['Young: tensile stress ÷ ΔL/L, stretched wire', 1], ['Shear: shear stress ÷ θ, rubber pad (solids)', 1], ['Bulk: p ÷ (−ΔV/V), water in a vessel', 1]],
  d: 2, c: 'understanding', t: [2],
}));
