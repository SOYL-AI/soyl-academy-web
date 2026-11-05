// ch08 question bank, part 3: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, Y, B_WATER, RHO_WATER, areaD, radiusA, elongate, usci, R6 } from './phys.mjs';

const { mcq, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const ok = (cond, msg) => cond || msg;

// ================================================================ long answers
const l1 = { d: 1.4e-3, sy: 3.0e8 };
l1.A = areaD(l1.d);
l1.F = l1.sy * l1.A;
add('curve-long', long({
  stem: '(a) Describe the stress–strain curve of a ductile metal wire, naming the proportional limit, the elastic limit and yield point, the ultimate stress and the fracture point, and saying how the wire behaves in each region. (b) A wire of diameter 1.4 mm has a yield stress of 3.0 × 10⁸ Pa. Find the largest load it can carry without a permanent change of length.',
  model: r`(a) The curve starts as a straight line OA: stress is proportional to strain (Hooke's law), and A is the **proportional limit**. Up to B, the **elastic limit and yield point**, the wire still returns to its original length on unloading. Beyond B the deformation is largely **plastic**: the stress rises to the **ultimate stress** at C, the greatest on the curve, and then the wire thins and **fractures** at D. A ductile metal has a long BD.

(b) $A = \pi r^2 = \pi (0.70 \times 10^{-3})^2 \approx ${sci(l1.A, 3)}$ m$^2$. The load stays elastic while the stress does not exceed the yield stress, so $F = \sigma_y A \approx 3.0 \times 10^{8} \times ${sci(l1.A, 3)} \approx ${dec(l1.F, 4)}$ N.`,
  sol: 'Regions OA, B, C, D; area 1.54 × 10⁻⁶ m²; F about 462 N.',
  scheme: [['Straight line OA, Hooke’s law; A proportional limit; B elastic limit/yield point', 1], ['Plastic region BC to the ultimate stress; thinning and fracture at D', 1], ['Behaviour in each region described (recovers up to B, permanent beyond)', 1], ['A = πr² ≈ 1.54 × 10⁻⁶ m²', 1], [`F = yield stress × A ≈ ${dec(l1.F, 4)} N`, 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => ok(near(3.0e8 * Math.PI * 0.7e-3 ** 2, l1.F, 1e-9) && Math.abs(l1.F - 461.8) < 0.1, 'l1'));
const l2 = { m: 5.0, L: 3.0, d: 1.0e-3 };
l2.A = areaD(l2.d);
l2.F = R6(l2.m * g);
l2.stress = l2.F / l2.A;
l2.strain = l2.stress / Y.steel;
l2.dL = l2.strain * l2.L;
l2.dLcu = elongate(l2.F, l2.L, l2.A, Y.copper);
l2.ratio = Y.steel / Y.copper;
add('young-long', long({
  stem: '(a) Define Young’s modulus and write the formula for it in terms of F, A, L and ΔL. (b) A steel wire 3.0 m long and 1.0 mm in diameter carries a load of mass 5.0 kg (g = 9.8 m s⁻², Y = 2.0 × 10¹¹ Pa for steel). Find the stress, the strain and the extension. (c) The steel wire is replaced by a copper wire of the same size (Y = 1.1 × 10¹¹ Pa), assumed to stay within its elastic limit. Find the new extension and compare it with the first.',
  model: r`(a) **Young's modulus** is the ratio of tensile stress to longitudinal strain: $Y = \dfrac{F/A}{\Delta L/L} = \dfrac{F L}{A\,\Delta L}$.

(b) $F = mg = 5.0 \times ${g} = ${l2.F}$ N; $A = \pi (0.50 \times 10^{-3})^2 \approx ${sci(l2.A, 3)}$ m$^2$. Stress $= \dfrac{F}{A} \approx ${sci(l2.stress, 3)}$ Pa. Strain $= \dfrac{\text{stress}}{Y} \approx \dfrac{${sci(l2.stress, 3)}}{2.0 \times 10^{11}} \approx ${sci(l2.strain, 3)}$. Extension $\Delta L = \text{strain} \times L \approx ${sci(l2.dL, 3)}\ \text{m} = ${dec(l2.dL * 1000, 3)}$ mm.

(c) For copper, $\Delta L \propto 1/Y$: $\Delta L_{Cu} = ${dec(l2.dL * 1000, 3)} \times \dfrac{2.0 \times 10^{11}}{1.1 \times 10^{11}} \approx ${dec(l2.dLcu * 1000, 3)}$ mm, about ${dec(l2.ratio, 2)} times the steel value, because the Young modulus of copper is smaller.`,
  sol: 'Definition; stress 6.24e7 Pa, strain 3.12e-4, extension 0.936 mm; copper 1.70 mm.',
  scheme: [['Definition and Y = FL/(AΔL)', 1], [`Stress = F/A ≈ ${dec(l2.stress / 1e6, 3)} MPa`, 1], [`Strain = stress/Y; ΔL ≈ ${dec(l2.dL * 1000, 3)} mm`, 1], [`Copper: ΔL ≈ ${dec(l2.dLcu * 1000, 3)} mm`, 1], [`Compared: ${dec(l2.ratio, 2)} times larger, since Y is smaller`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => ok(near(5.0 * 9.8 * 3.0 / (Math.PI * 0.5e-3 ** 2 * 2.0e11) * 1000, l2.dL * 1000, 1e-9) && near(5.0 * 9.8 * 3.0 / (Math.PI * 0.5e-3 ** 2 * 1.1e11) * 1000, l2.dLcu * 1000, 1e-9), 'l2'));
const l3 = { a: 0.1, F: 5.0e4, G: 2.5e10, h: 0.1, V: 4.0e-4, p: 7.0e7, B: 1.4e11 };
l3.A = R6(l3.a * l3.a);
l3.tau = l3.F / l3.A;
l3.theta = l3.tau / l3.G;
l3.dx = l3.theta * l3.h;
l3.dV = (l3.p * l3.V) / l3.B;
add('moduli-long', long({
  stem: '(a) Define the shear modulus and the bulk modulus. (b) A force of 5.0 × 10⁴ N acts along one face of an aluminium cube of side 0.10 m whose opposite face is fixed. Taking the shear modulus of aluminium as 2.5 × 10¹⁰ Pa, find the angle of shear and the displacement of the loaded face. (c) A copper sphere of volume 4.0 × 10⁻⁴ m³ is subjected to an extra all-round pressure of 7.0 × 10⁷ Pa. For copper B = 1.4 × 10¹¹ Pa; find the decrease in its volume.',
  model: r`(a) The **shear modulus** is the ratio of shear stress to shear strain, $G = \dfrac{F/A}{\theta}$, where $\theta = \Delta x/h$ is the angle of shear. The **bulk modulus** is the ratio of the pressure increase to the fractional decrease of volume, $B = -\dfrac{p}{\Delta V/V}$.

(b) Face area $= 0.10^2 = ${l3.A}$ m$^2$; shear stress $= \dfrac{5.0 \times 10^{4}}{${l3.A}} = ${sci(l3.tau, 2)}$ Pa. $\theta = \dfrac{\tau}{G} = \dfrac{${sci(l3.tau, 2)}}{2.5 \times 10^{10}} = ${sci(l3.theta, 2)}$ rad. Displacement $\Delta x = \theta h = ${sci(l3.theta, 2)} \times 0.10 = ${sci(l3.dx, 2)}\ \text{m} = ${dec(l3.dx * 1000, 2)}$ mm.

(c) $|\Delta V| = \dfrac{p V}{B} = \dfrac{7.0 \times 10^{7} \times 4.0 \times 10^{-4}}{1.4 \times 10^{11}} = ${sci(l3.dV, 2)}\ \text{m}^3 = ${dec(l3.dV * 1e6, 2)}$ cm³.`,
  sol: 'G and B defined; θ = 2.0e-4 rad, Δx = 0.020 mm; ΔV = 0.20 cm³.',
  scheme: [['Shear modulus = shear stress/θ (θ = Δx/h)', 1], ['Bulk modulus = p/(−ΔV/V)', 1], [`θ = stress/G = ${usci(l3.theta, 2)} rad`, 1], [`Δx = θh = ${dec(l3.dx * 1000, 2)} mm`, 1], [`|ΔV| = pV/B = ${dec(l3.dV * 1e6, 2)} cm³`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => ok(near((5.0e4 / 0.01 / 2.5e10) * 0.1 * 1000, l3.dx * 1000, 1e-9) && near((7.0e7 / 1.4e11) * 4.0e-4 * 1e6, l3.dV * 1e6, 1e-9), 'l3'));
const l4 = { M: 12000, n: 2, sb: 6.0e8, sf: 6, L: 15 };
l4.F = R6((l4.M * g) / l4.n);
l4.sw = l4.sb / l4.sf;
l4.A = l4.F / l4.sw;
l4.r = radiusA(l4.A);
l4.strain = l4.sw / Y.steel;
l4.dL = l4.strain * l4.L;
add('rope-long', long({
  stem: '(a) What is meant by the safety factor of a rope, and why is a crane rope made of many thin strands? (b) A port crane lifts a container of mass 12 tonnes with two identical steel ropes sharing the load equally. The steel has breaking stress 6.0 × 10⁸ Pa and a safety factor of 6 is used; take g = 9.8 m s⁻² and treat each rope as solid. Find the least radius of each rope. (c) Each rope is 15 m long (Y = 2.0 × 10¹¹ Pa). Find its extension under the working stress.',
  model: r`(a) The **safety factor** is the breaking stress divided by the working stress allowed in the design; it keeps the rope well inside its elastic region despite jerks, wear and ageing. **Many thin strands** make the rope flexible over pulleys while the total cross-section still carries the load.

(b) Load per rope $F = \dfrac{12000 \times ${g}}{2} = ${l4.F}$ N. Working stress $= \dfrac{6.0 \times 10^{8}}{6} = ${sci(l4.sw, 2)}$ Pa. $A = \dfrac{F}{\text{stress}} = \dfrac{${l4.F}}{${sci(l4.sw, 2)}} = ${sci(l4.A, 3)}$ m$^2$. $r = \sqrt{A/\pi} \approx ${sci(l4.r, 3)}\ \text{m} = ${dec(l4.r * 1000, 3)}$ mm.

(c) Strain $= \dfrac{\text{stress}}{Y} = \dfrac{${sci(l4.sw, 2)}}{2.0 \times 10^{11}} = ${sci(l4.strain, 2)}$. $\Delta L = \text{strain} \times L = ${sci(l4.strain, 2)} \times 15 = ${sci(l4.dL, 2)}\ \text{m} = ${dec(l4.dL * 1000, 2)}$ mm.`,
  sol: 'Safety factor and strands; r about 13.7 mm; extension 7.5 mm.',
  scheme: [['Safety factor = breaking stress ÷ working stress, and its purpose', 1], ['Many strands: flexible with the same total cross-section', 1], [`Working stress ${usci(l4.sw, 2)} Pa; A = F/stress = ${dec(l4.A * 1e4, 3)} cm²`, 1], [`r = √(A/π) = ${dec(l4.r * 1000, 3)} mm`, 1], [`Strain = stress/Y; ΔL = ${dec(l4.dL * 1000, 2)} mm`, 1]],
  d: 4, c: 'application', t: [2], wl: null,
}), () => ok(near(Math.sqrt((12000 * 9.8 / 2 / (6.0e8 / 6)) / Math.PI) * 1000, l4.r * 1000, 1e-9) && near((6.0e8 / 6 / 2.0e11) * 15 * 1000, l4.dL * 1000, 1e-9), 'l4'));
const l5 = { Ls: 2.0, Lb: 1.5, d: 1.2e-3, F: 180 };
l5.A = areaD(l5.d);
l5.ds = elongate(l5.F, l5.Ls, l5.A, Y.steel);
l5.db = elongate(l5.F, l5.Lb, l5.A, Y.brass);
l5.tot = l5.ds + l5.db;
l5.es = l5.F / l5.A / Y.steel;
l5.eb = l5.F / l5.A / Y.brass;
add('series-long', long({
  stem: '(a) A steel wire is joined end to end to a brass wire and the combination carries a load. State which quantity is the same in the two wires and which quantities add. (b) The steel wire is 2.0 m long and the brass wire 1.5 m long; both have diameter 1.2 mm and the load is 180 N (Y = 2.0 × 10¹¹ Pa for steel, 9.1 × 10¹⁰ Pa for brass). Find the extension of each wire and the total extension. (c) Which wire has the larger strain, and why?',
  model: r`(a) The **same force** (180 N) acts in both wires, so each carries the same stress if the areas are equal; the **extensions add** to give the total.

(b) $A = \pi (0.60 \times 10^{-3})^2 \approx ${sci(l5.A, 3)}$ m$^2$. Steel: $\Delta L_s = \dfrac{F L}{A Y} = \dfrac{180 \times 2.0}{${sci(l5.A, 3)} \times 2.0 \times 10^{11}} \approx ${dec(l5.ds * 1000, 4)}$ mm. Brass: $\Delta L_b = \dfrac{180 \times 1.5}{${sci(l5.A, 3)} \times 9.1 \times 10^{10}} \approx ${dec(l5.db * 1000, 4)}$ mm. Total $\approx ${dec(l5.ds * 1000, 4)} + ${dec(l5.db * 1000, 4)} = ${dec(l5.tot * 1000, 4)}$ mm.

(c) Strain $= \text{stress}/Y$. The stress is the same, so the wire with the **smaller Young modulus** has the larger strain: brass, with strain $\approx ${sci(l5.eb, 3)}$ against $\approx ${sci(l5.es, 3)}$ for steel.`,
  sol: 'Same force, extensions add; 1.592 mm, 2.623 mm, total 4.215 mm; brass has larger strain.',
  scheme: [['Same force in both wires; extensions add', 1], [`Steel extension ≈ ${dec(l5.ds * 1000, 4)} mm`, 1], [`Brass extension ≈ ${dec(l5.db * 1000, 4)} mm; total ≈ ${dec(l5.tot * 1000, 4)} mm`, 1], [`Strains: brass ≈ ${usci(l5.eb, 3)}, steel ≈ ${usci(l5.es, 3)}`, 1], ['Brass has the larger strain because its Young modulus is smaller (same stress)', 1]],
  d: 4, c: 'analysis', t: [2], wl: null,
}), () => ok(near((180 * 2.0 / (Math.PI * 0.6e-3 ** 2 * 2.0e11) + 180 * 1.5 / (Math.PI * 0.6e-3 ** 2 * 9.1e10)) * 1000, l5.tot * 1000, 1e-9) && l5.eb > l5.es, 'l5'));

// ================================================================ case-based items
const c1 = { L: 2.0, d: 0.9e-3, loads: [5, 10, 15, 20, 25, 30, 35], ext: [0.14, 0.28, 0.42, 0.56, 0.7, 0.99, 1.4] };
c1.A = areaD(c1.d);
c1.k = c1.ext[0] / c1.loads[0]; // mm per N in the Hooke range
c1.pred30 = c1.k * 30;
c1.Y = (20 * c1.L) / (c1.A * (c1.ext[3] * 1e-3));
add('lab-case', mk.case({
  passage: `In a school laboratory in Nagpur, Aarav loads a copper wire of length 2.0 m and diameter 0.90 mm in steps and measures the extension each time. His readings are:\n\n| Load (N) | 5 | 10 | 15 | 20 | 25 | 30 | 35 |\n|---|---|---|---|---|---|---|---|\n| Extension (mm) | 0.14 | 0.28 | 0.42 | 0.56 | 0.70 | 0.99 | 1.40 |\n\nHe notices that the extension grows by equal steps at first, but the steps get larger at the end.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Hooke’s law holds for this wire up to a load of about',
      right: '25 N',
      wrong: ['15 N', '30 N', '35 N'],
      sol: 'Up to 25 N each 5 N step adds 0.14 mm (extension proportional to load). At 30 N the extension is 0.99 mm instead of 0.84 mm, so the proportional range ends at about 25 N — option (@K).',
      d: 2, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Use the reading at 20 N to find the Young modulus of the copper, in units of 10¹¹ Pa.',
      value: v3(c1.Y / 1e11), tol: 0.01, unit: '× 10¹¹ Pa',
      sol: r`$A = \pi (0.45 \times 10^{-3})^2 \approx ${sci(c1.A, 3)}$ m$^2$. $Y = \dfrac{F L}{A\,\Delta L} = \dfrac{20 \times 2.0}{${sci(c1.A, 3)} \times 0.56 \times 10^{-3}} \approx ${sci(c1.Y, 3)}$ Pa. In units of $10^{11}$ Pa: $Y = ${v3(c1.Y / 1e11)}$.`,
      scheme: [[`Y = FL/(AΔL) ≈ ${v3(c1.Y / 1e11)} × 10¹¹ Pa`, 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: `Predict the extension at 30 N if Hooke’s law still held, and explain why the measured 0.99 mm is different.`,
      model: r`In the Hooke range the extension is $${dec(c1.k, 2)}$ mm per newton, so at 30 N it would be $${dec(c1.k, 2)} \times 30 = ${dec(c1.pred30, 3)}$ mm. The measured $0.99$ mm is larger because at 30 N the wire has gone beyond its proportional (and probably elastic) limit, so strain grows faster than stress.`,
      sol: 'Prediction 0.84 mm; beyond the limit.',
      scheme: [[`Hooke prediction = ${dec(c1.k, 2)} × 30 = ${dec(c1.pred30, 3)} mm`, 1], ['Measured value larger: the wire is beyond the proportional/elastic limit', 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Aarav’s friend says: "The wire must have broken at 30 N, because the extension suddenly increased." Evaluate this claim.',
        model: r`The claim is **wrong**. A wire that broke could not be loaded further: the readings continue to 35 N (1.40 mm). The larger steps show only that stress has passed the proportional or elastic limit and the wire is **deforming plastically**; it breaks only when the stress reaches the ultimate stress and the wire fractures.`,
        sol: 'Larger step means plastic deformation, not fracture.',
        scheme: [['Claim wrong: readings continue to 35 N so the wire did not break', 1], ['Larger steps: beyond the limit, plastic deformation, not fracture', 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => ok(near(c1.Y / 1e11, 1.12, 0.005) && near(c1.pred30, 0.84, 1e-9) && near(q.children[1].answer.value, 1.12, 0.005), 'c1'));

const c2 = { m: 1800, n: 3, A: 1.5e-4, L: 24, sb: 4.0e8 };
c2.F = R6((c2.m * g) / c2.n);
c2.stress = c2.F / c2.A;
c2.dL = (c2.stress / Y.steel) * c2.L;
c2.sf = c2.sb / c2.stress;
c2.F2 = R6((c2.m * g) / 2);
c2.stress2 = c2.F2 / c2.A;
c2.sf2 = c2.sb / c2.stress2;
add('lift-case', mk.case({
  passage: 'A lift in a shopping mall in Pune, with its passengers, has a total mass of 1800 kg (g = 9.8 m s⁻²). It hangs from three identical steel ropes, which share the load equally. Each rope has a cross-section of 1.5 cm², a length of 24 m, Young modulus 2.0 × 10¹¹ Pa and breaking stress 4.0 × 10⁸ Pa. Treat each rope as a solid wire.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The tension in each rope when the lift is at rest is',
      right: `${c2.F} N`,
      wrong: [`${c2.m * g} N`, `${c2.m} N`, `${dec(c2.F / 10, 3)} N`],
      sol: `Total weight = 1800 × 9.8 = ${c2.m * g} N, shared by three ropes: ${c2.F} N each — option (@K).`,
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the extension of each rope, in mm.',
      value: v3(c2.dL * 1000), tol: 0.05, unit: 'mm',
      sol: r`Stress $= \dfrac{${c2.F}}{1.5 \times 10^{-4}} = ${sci(c2.stress, 3)}$ Pa; strain $= \dfrac{${sci(c2.stress, 3)}}{2.0 \times 10^{11}} = ${sci(c2.stress / Y.steel, 3)}$. $\Delta L = \text{strain} \times L = ${sci(c2.stress / Y.steel, 3)} \times 24 \approx ${sci(c2.dL, 3)}\ \text{m} = ${v3(c2.dL * 1000)}$ mm.`,
      scheme: [[`Stress = F/A = ${dec(c2.stress / 1e7, 3)} × 10⁷ Pa; strain = stress/Y`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the safety factor of each rope, defined as the breaking stress divided by the working stress, and state what it shows.',
      model: r`Working stress $= ${sci(c2.stress, 3)}$ Pa, so the safety factor $= \dfrac{4.0 \times 10^{8}}{${sci(c2.stress, 3)}} \approx ${dec(c2.sf, 3)}$. The working stress is about one-tenth of the breaking stress, so the rope is used far inside its elastic region.`,
      sol: 'Safety factor about 10.2.',
      scheme: [[`Safety factor = 4.0 × 10⁸ ÷ ${dec(c2.stress / 1e7, 3)} × 10⁷ ≈ ${dec(c2.sf, 3)}`, 1], ['Working stress is a small fraction of breaking stress: well inside the elastic region', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A technician says: "If one rope snapped, the other two would at once exceed the breaking stress." Evaluate this claim.',
        model: r`The claim is **wrong**. With two ropes the tension in each is $\dfrac{${c2.m * g}}{2} = ${c2.F2}$ N, so the stress is $\dfrac{${c2.F2}}{1.5 \times 10^{-4}} = ${sci(c2.stress2, 3)}$ Pa, well below the breaking stress of 4.0 × 10⁸ Pa. The safety factor falls to about ${dec(c2.sf2, 2)}, still above 1.`,
        sol: 'Two ropes: stress 5.88e7 Pa < 4.0e8 Pa.',
        scheme: [[`Stress with two ropes = ${c2.F2} / (1.5 × 10⁻⁴) ≈ ${dec(c2.stress2 / 1e7, 3)} × 10⁷ Pa`, 1], [`Below the breaking stress (factor ≈ ${dec(c2.sf2, 2)}): claim wrong`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => ok(near(c2.F, 5880, 1e-9) && near(c2.dL * 1000, 4.704, 1e-6) && near(q.children[1].answer.value, 4.7, 0.005) && c2.sf2 > 1, 'c2'));

const c3 = { h: 5000, Bs: 1.6e11, Vs: 2.0 };
c3.p = RHO_WATER * g * c3.h;
c3.fw = c3.p / B_WATER;
c3.dVs = (c3.p * c3.Vs) / c3.Bs;
c3.fs = c3.dVs / c3.Vs;
c3.ratio = c3.fw / c3.fs;
add('sub-case', mk.case({
  passage: 'A research submersible dives to a depth of 5.0 km in the Indian Ocean. Take the density of sea water as 1000 kg m⁻³ (constant), g = 9.8 m s⁻², and the bulk modulus of water as 2.2 × 10⁹ Pa. The extra pressure at depth h is ρgh. The submersible’s steel hull encloses a volume of 2.0 m³; the bulk modulus of steel is 1.6 × 10¹¹ Pa.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The increase of pressure at 5.0 km depth is',
      right: '4.9 × 10⁷ Pa',
      wrong: ['4.9 × 10⁴ Pa', '9.8 × 10⁷ Pa', '4.9 × 10¹⁰ Pa'],
      sol: `p = ρgh = 1000 × 9.8 × 5000 = ${usci(c3.p, 2)} Pa — option (@K). (Using h = 5.0 instead of 5000 m would give the second value.)`,
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'By what percentage does the volume of a sample of sea water decrease at this depth?',
      value: v3(c3.fw * 100), tol: 0.01, unit: '%',
      sol: r`$\dfrac{\Delta V}{V} = \dfrac{p}{B} = \dfrac{${sci(c3.p, 2)}}{2.2 \times 10^{9}} \approx ${dec(c3.fw, 3)}$, that is $${v3(c3.fw * 100)}$ percent.`,
      scheme: [[`ΔV/V = p/B ≈ ${dec(c3.fw, 3)} = ${v3(c3.fw * 100)} %`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the decrease in the volume enclosed by the steel hull, and compare the fractional change with that of water.',
      model: r`$|\Delta V| = \dfrac{pV}{B} = \dfrac{${sci(c3.p, 2)} \times 2.0}{1.6 \times 10^{11}} \approx ${sci(c3.dVs, 3)}\ \text{m}^3$, a fractional change of $${sci(c3.fs, 3)}$. For water it is $${dec(c3.fw, 3)}$, about ${dec(c3.ratio, 3)} times larger, because the bulk modulus of water is much smaller than that of steel.`,
      sol: 'Hull ΔV = 6.1e-4 m³, fraction 3.06e-4; water about 73 times more compressed.',
      scheme: [[`|ΔV| = pV/B ≈ ${usci(c3.dVs, 3)} m³`, 1], [`Fractions: steel ≈ ${dec(c3.fs * 1e4, 3)} × 10⁻⁴, water ≈ ${dec(c3.fw, 3)}; water ≈ ${dec(c3.ratio, 3)} times larger`, 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A trainee says: "The pressure at 5.0 km is nearly 500 times atmospheric pressure (1.0 × 10⁵ Pa), so the water must be squeezed to less than half its volume." Evaluate this claim.',
        model: r`The pressure is $\dfrac{${sci(c3.p, 2)}}{1.0 \times 10^{5}} \approx 490$ times atmospheric, but a liquid has a very large bulk modulus. The fractional decrease is only $\dfrac{p}{B} \approx ${dec(c3.fw, 3)}$, about ${v3(c3.fw * 100)} percent, so the claim is **wrong**.`,
        sol: 'Only about 2.2 percent.',
        scheme: [['Pressure about 490 atmospheres is correct, but the claim is wrong', 1], [`Water is compressed only by ΔV/V = p/B ≈ ${v3(c3.fw * 100)} %`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => ok(near(c3.p, 4.9e7, 1e-9) && near(q.children[1].answer.value, 2.23, 0.005) && near(c3.ratio, 1.6e11 / 2.2e9, 1e-9), 'c3'));

const c4 = { a: 0.3, b: 0.2, h: 0.04, F: 2400, G: 8.0e5, Gs: 8.4e10 };
c4.A = c4.a * c4.b;
c4.tau = c4.F / c4.A;
c4.theta = c4.tau / c4.G;
c4.dx = c4.theta * c4.h;
c4.thS = c4.tau / c4.Gs;
c4.dxS = c4.thS * c4.h;
c4.dx2 = c4.theta * 2 * c4.h;
add('pad-case', mk.case({
  passage: 'A bridge in Kolkata rests on rubber bearing pads so that the girder can shift slightly when the temperature changes or traffic brakes. One pad has a top face 0.30 m by 0.20 m and a thickness of 4.0 cm. Its base is fixed. A horizontal force of 2400 N acts along its top face. The shear modulus of this rubber is 8.0 × 10⁵ Pa; for steel it is 8.4 × 10¹⁰ Pa.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The stress produced in the pad is',
      right: `shear stress, ${usci(c4.tau, 2)} Pa`,
      wrong: ['tensile stress, 4.0 × 10⁴ Pa', 'shear stress, 8.0 × 10³ Pa', 'shear stress, 1.2 × 10⁴ Pa'],
      sol: `The force is parallel to the top face, so the stress is a shear stress F/A = 2400/(0.30 × 0.20) = ${usci(c4.tau, 2)} Pa — option (@K).`,
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the sideways displacement of the top face of the pad, in mm (use Δx = θ h).',
      value: v3(c4.dx * 1000), tol: 0.05, unit: 'mm',
      sol: r`$\theta = \dfrac{\text{stress}}{G} = \dfrac{${sci(c4.tau, 2)}}{8.0 \times 10^{5}} = ${c4.theta}$ rad. $\Delta x = \theta h = ${c4.theta} \times 0.040 = ${sci(c4.dx, 2)}\ \text{m} = ${v3(c4.dx * 1000)}$ mm.`,
      scheme: [[`θ = stress/G = ${c4.theta} rad; Δx = θh = ${v3(c4.dx * 1000)} mm`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Show why a steel plate of the same size would be a poor choice for the bearing.',
      model: r`For steel the same stress gives $\theta = \dfrac{${sci(c4.tau, 2)}}{8.4 \times 10^{10}} \approx ${sci(c4.thS, 2)}$ rad and $\Delta x = \theta h \approx ${sci(c4.dxS, 2)}$ m, far less than a micrometre, so almost no movement. The girder could not shift, so large forces would be passed into the pier; rubber, with a far smaller shear modulus, allows millimetres of movement.`,
      sol: 'Steel shift about 1.9e-8 m; rubber 2.0 mm.',
      scheme: [[`Steel: θ ≈ ${usci(c4.thS, 2)} rad, Δx ≈ ${usci(c4.dxS, 2)} m`, 1], ['Almost no movement allowed: forces pass into the pier; rubber (small G) shifts by mm', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'An engineer says: "If the same pad were made twice as thick, the same force would shift the top face twice as far." Evaluate this claim.',
        model: r`The claim is **correct**. The shear stress and the angle $\theta = \tau / G = ${c4.theta}$ rad are unchanged by the thickness, and the displacement is $\Delta x = \theta h$, so doubling $h$ doubles it: $${c4.theta} \times 0.080 = ${sci(c4.dx2, 2)}$ m $= ${dec(c4.dx2 * 1000, 2)}$ mm.`,
        sol: 'Δx = θh doubles: 4.0 mm.',
        scheme: [['θ = τ/G unchanged by the thickness', 1], [`Δx = θh doubles to ${dec(c4.dx2 * 1000, 2)} mm: claim correct`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => ok(near(c4.dx * 1000, 2.0, 1e-9) && near(q.children[1].answer.value, 2.0, 1e-9) && near(c4.dx2, 2 * c4.dx, 1e-9), 'c4'));
