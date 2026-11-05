// ch08 Mechanical Properties of Solids — question bank, part 1: t01 (stress, strain, Hooke's law, the stress-strain curve).
// Every numerical is computed here and re-solved by an independent `check`; solutions and schemes print the computed values.
// AR keys planned across the chapter: a (permanent set), d (strain unit), c (steel vs copper), b (steel vs rubber), a (beam layers).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, areaD, areaR, R6 } from './phys.mjs';

const { mcq, ar, tf, fill, match, num, short, part } = mk;
void part;
const v3 = (x) => Number(dec(x, 3));
const ok = (cond, msg) => cond || msg;

// ================================================================ t01 multiple choice and objective items
add('stressunit-mcq', mcq({
  stem: 'A civil engineer reports that the stress in a suspension-bridge cable is 180 MPa. Which statement about stress and its unit is correct?',
  right: 'Stress is force per unit area; 1 Pa = 1 N m⁻², so 180 MPa = 1.8 × 10⁸ Pa',
  wrong: ['Stress is force per unit length; its SI unit is N m⁻¹', 'Stress is a dimensionless ratio, so "MPa" is only a label', 'Stress is force multiplied by area; its SI unit is N m²'],
  sol: 'Stress is the restoring force per unit area, F/A, with unit N m⁻² = Pa; "mega" means 10⁶, so 180 MPa = 1.8 × 10⁸ Pa — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const sn = { L: 2.0, dL: 1.0e-3 };
sn.strain = sn.dL / sn.L;
add('strainnodim-mcq', mcq({
  stem: 'A nylon rope 2.0 m long stretches by 1.0 mm when a cyclist ties her bag to it. The longitudinal strain in the rope is',
  right: '5.0 × 10⁻⁴, with no unit',
  wrong: ['5.0 × 10⁻⁴ m', '2.0 × 10³, with no unit', '5.0 × 10⁻⁴ N'],
  sol: `Strain = ΔL/L = 1.0 × 10⁻³ m / 2.0 m = 5.0 × 10⁻⁴; a ratio of two lengths has no unit — option (@K).`,
  d: 1, c: 'understanding', t: [1],
}), () => ok(near(sn.strain, 5.0e-4, 1e-9), 'sn'));
add('stresslength-mcq', mcq({
  stem: 'Two steel wires, P and Q, each of cross-section 2.0 mm², hang from a ceiling and carry the same load. P is 1.0 m long and Q is 3.0 m long. Within the elastic limit, which statement is correct?',
  right: 'The stresses are equal, and Q stretches three times as much as P',
  wrong: ['The stress in Q is three times that in P, and the extensions are equal', 'The stresses are equal, and the extensions are equal', 'The stress in Q is one-third of that in P, and Q stretches three times as much'],
  sol: 'Stress = F/A depends on the load and the area only, so it is the same in both. Strain is the same too (same stress, same material), so the extension ΔL = strain × L is three times larger for the three-times-longer wire — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('hookerange-mcq', mcq({
  stem: 'A student loads a copper wire in steps until it breaks and plots stress against strain. Hooke’s law applies to the part of the graph that is',
  right: 'the initial straight line through the origin, up to the proportional limit',
  wrong: ['the whole curve from the origin up to fracture', 'only the region beyond the yield point, where the wire flows', 'only the single point of ultimate stress'],
  sol: 'Hooke’s law (stress ∝ strain) holds only along the initial straight part, up to the proportional limit; beyond it the curve bends — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('yieldpt-mcq', mcq({
  stem: 'A steel wire is stretched until its stress is well past the yield point and then the load is removed slowly. Which statement describes the wire afterwards?',
  right: 'It is longer than its original length: a permanent strain remains',
  wrong: ['It returns to exactly its original length', 'It becomes shorter than its original length', 'It breaks the moment the load is removed'],
  sol: 'Beyond the elastic limit the deformation is plastic; unloading follows a line parallel to the initial straight part and reaches zero stress at a non-zero strain, so the wire stays longer — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ductile-mcq', mcq({
  stem: 'A hardware workshop draws copper into thin wire but cannot do the same with glass rods. This is because copper is',
  right: 'ductile, with a long plastic region between its elastic limit and fracture',
  wrong: ['brittle, with a long plastic region', 'perfectly elastic, with no plastic region at all', 'an elastomer that obeys Hooke’s law right up to fracture'],
  sol: 'A ductile metal can be stretched permanently by a large amount before it breaks, so it can be drawn into wire; glass is brittle and fractures soon after its elastic limit — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('elastomer-mcq', mcq({
  stem: 'A rubber band is stretched to four times its original length and springs back when released. Which statement is correct?',
  right: 'Rubber is an elastomer: elastic up to a very large strain, but its stress–strain curve is not a straight line',
  wrong: ['Rubber obeys Hooke’s law up to this strain, because it recovers completely', 'Rubber is plastic, because it stretches by a large amount', 'Rubber has a larger Young modulus than steel, because it stretches more'],
  sol: 'An elastomer recovers after very large strains, but stress is not proportional to strain and there is no clear plastic region. Easy stretching means a small modulus, not a large one — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('permanent-ar', ar({
  a: 'A metal wire stretched well beyond its elastic limit stays longer than before when the load is removed.',
  r: 'Beyond the elastic limit the wire has undergone plastic deformation, so a permanent strain is left.',
  key: 'a',
  sol: 'Both statements are true and R explains A: plastic deformation does not reverse on unloading — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('strainunit-ar', ar({
  a: 'A strain of 0.0005 in a copper wire is measured in pascal, the same unit as stress.',
  r: 'Strain is the ratio of the change in length to the original length, so it has no unit.',
  key: 'd',
  sol: 'A is false: strain is a pure number with no unit. R is true. So the correct option is (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('rubberhooke-tf', tf({
  stem: 'A rubber band returns to its original length after being stretched to three times that length, so it must obey Hooke’s law over the whole stretch.',
  key: 'f',
  sol: 'False. Rubber is elastic over a very large strain, but its stress–strain curve is not a straight line, so stress is not proportional to strain over this range. Being elastic is not the same as obeying Hooke’s law.',
  d: 2, c: 'understanding', t: [1],
}));
add('ultimate-fill', fill({
  stem: 'On the stress–strain curve of a drawn copper wire, the greatest stress reached before the wire necks and breaks is called the ___ stress.',
  acc: [['ultimate', 'ultimate tensile', 'breaking']],
  sol: 'It is the **ultimate** stress (the highest point of the curve), after which the wire thins and fractures.',
  d: 1, c: 'recall', t: [1],
}));
add('longitudinal-fill', fill({
  stem: 'A surveyor’s steel tape 30 m long stretches by 3 mm when pulled tight. The ratio 3 mm / 30 m is its ___ strain.',
  acc: [['longitudinal', 'tensile', 'linear']],
  sol: 'The change of length divided by the original length is the **longitudinal** strain.',
  d: 1, c: 'recall', t: [1],
}));
add('stressstrain-match', match({
  stem: 'Each row of Column A describes a stress on a body. Match it with the strain it produces in Column B.',
  pairs: [
    ['Tensile stress on a hanging cable', 'Fractional increase of length'],
    ['Shear stress on a block pushed sideways along its top face', 'Angle through which the faces turn'],
    ['Water pressure on all faces of a submerged steel cube', 'Fractional decrease of volume'],
    ['Compressive stress on a short brick pillar', 'Fractional decrease of length'],
  ],
  order: [2, 0, 3, 1],
  marks: 2,
  sol: 'Tensile stress: ΔL/L increase. Shear stress: the angle of shear θ = Δx/h. Hydraulic stress: −ΔV/V. Compressive stress: ΔL/L decrease.',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t01 numericals
const s1 = { d: 1.2e-3, F: 60 };
s1.A = areaD(s1.d);
s1.stress = s1.F / s1.A;
add('stress-num', num({
  stem: 'A steel wire of diameter 1.2 mm supports a load of 60 N. Find the stress in the wire, in MPa (3 significant figures).',
  value: v3(s1.stress / 1e6), tol: 0.1, unit: 'MPa',
  sol: r`$A = \pi r^2 = \pi (0.60 \times 10^{-3})^2 \approx ${sci(s1.A, 3)}$ m$^2$. Stress $= \dfrac{F}{A} \approx \dfrac{60}{${sci(s1.A, 3)}} \approx ${sci(s1.stress, 3)}$ Pa $= ${v3(s1.stress / 1e6)}$ MPa.`,
  scheme: [['Radius 0.60 mm = 0.60 × 10⁻³ m; A = πr²', 1], [`Stress = F/A = ${v3(s1.stress / 1e6)} MPa`, 1]],
  marks: 2, d: 1, c: 'application', t: [1],
}), (q) => ok(near(60 / (Math.PI * 0.6e-3 ** 2) / 1e6, q.answer.value, 0.003), 'stress'));
const s2 = { L: 1.5, dL: 0.9e-3 };
s2.strain = s2.dL / s2.L;
add('strain-num', num({
  stem: 'A 1.5 m long rope used to tie a tent stretches by 0.90 mm under the pull of the wind. Find the longitudinal strain, in units of 10⁻⁴.',
  value: v3(s2.strain * 1e4), tol: 0.05, unit: '× 10⁻⁴',
  sol: r`Strain $= \dfrac{\Delta L}{L} = \dfrac{0.90 \times 10^{-3}}{1.5} = ${sci(s2.strain, 2)}$. In units of $10^{-4}$: strain $= ${v3(s2.strain * 1e4)}$.`,
  scheme: [['Strain = ΔL/L with both lengths in metres', 1]],
  d: 1, c: 'application', t: [1],
}), (q) => ok(near(0.9 / 1500, q.answer.value * 1e-4, 1e-6), 'strain'));
const ml = { A: 35e-6, sy: 160e6 };
ml.F = R6(ml.sy * ml.A);
add('maxload-num', num({
  stem: 'A pull rod made of an aluminium alloy has a cross-section of 35 mm² and a yield stress of 160 MPa. Find the largest load, in kN, that the rod can carry without exceeding its yield stress.',
  value: v3(ml.F / 1000), tol: 0.05, unit: 'kN',
  sol: r`$A = 35 \times 10^{-6}$ m$^2$. $F = \sigma_y A = 160 \times 10^6 \times 35 \times 10^{-6} = ${ml.F}\ \text{N} = ${v3(ml.F / 1000)}$ kN.`,
  scheme: [['A = 35 × 10⁻⁶ m²', 1], [`F = yield stress × area = ${ml.F} N = ${v3(ml.F / 1000)} kN`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => ok(near(160 * 35 / 1000, q.answer.value, 1e-9), 'ml'));
const hk = { F1: 30, e1: 0.45e-3, F2: 80 };
hk.e2 = hk.e1 * (hk.F2 / hk.F1);
add('hookeext-num', num({
  stem: 'A steel wire in a laboratory extends by 0.45 mm under a load of 30 N. Assuming Hooke’s law holds, find its extension under a load of 80 N, in mm.',
  value: v3(hk.e2 * 1000), tol: 0.01, unit: 'mm',
  sol: r`Extension is proportional to load: $e_2 = e_1 \times \dfrac{F_2}{F_1} = 0.45 \times \dfrac{80}{30} = ${v3(hk.e2 * 1000)}$ mm.`,
  scheme: [['Hooke’s law: extension ∝ load', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => ok(near(0.45 / 30 * 80, q.answer.value, 1e-9), 'hk'));
const ps = { Y: 2.0e11, e: 4.0e-3, s: 3.0e8 };
ps.elastic = ps.s / ps.Y;
ps.perm = ps.e - ps.elastic;
add('permset-num', num({
  stem: 'A steel specimen with Y = 2.0 × 10¹¹ Pa is stretched beyond its elastic limit to a strain of 4.0 × 10⁻³, where the stress is 3.0 × 10⁸ Pa. The load is then removed slowly along a line parallel to the initial straight part of the curve. Find the permanent strain left, in units of 10⁻³.',
  value: v3(ps.perm * 1e3), tol: 0.02, unit: '× 10⁻³',
  sol: r`Strain recovered $= \dfrac{\sigma}{Y} = \dfrac{3.0 \times 10^{8}}{2.0 \times 10^{11}} = ${sci(ps.elastic, 2)}$. Permanent strain $= 4.0 \times 10^{-3} - ${sci(ps.elastic, 2)} = ${sci(ps.perm, 2)}$. In units of $10^{-3}$: permanent strain $= ${v3(ps.perm * 1e3)}$.`,
  scheme: [['Unloading line is parallel to OA: recovered strain = σ/Y = 1.5 × 10⁻³', 1], [`Permanent strain = 4.0 × 10⁻³ − 1.5 × 10⁻³ = ${v3(ps.perm * 1e3)} × 10⁻³`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => ok(near(4.0e-3 - 3.0e8 / 2.0e11, q.answer.value * 1e-3, 1e-9), 'ps'));
const lb = { d: 1.0e-3, s: 3.0e8 };
lb.F = lb.s * areaD(lb.d);
lb.m = lb.F / g;
add('loadbreak-num', num({
  stem: 'A copper wire of diameter 1.0 mm breaks when the stress in it reaches its ultimate stress, 3.0 × 10⁸ Pa. Taking g = 9.8 m s⁻², find the largest mass that can be hung from it before it breaks, in kg (2 significant figures).',
  value: v3(lb.m), tol: 0.1, unit: 'kg',
  sol: r`$A = \pi (0.50 \times 10^{-3})^2 \approx ${sci(areaD(lb.d), 3)}$ m$^2$. Breaking force $F = \sigma_u A \approx ${dec(lb.F, 4)}$ N. Mass $= \dfrac{F}{g} \approx \dfrac{${dec(lb.F, 4)}}{${g}} = ${v3(lb.m)}$ kg.`,
  scheme: [[`A = πr² ≈ ${dec(areaD(lb.d) * 1e7, 3)} × 10⁻⁷ m²`, 1], [`F = ultimate stress × A ≈ ${dec(lb.F, 4)} N`, 1], [`m = F/g = ${v3(lb.m)} kg`, 1]],
  marks: 3, d: 3, c: 'application', t: [1],
}), (q) => ok(near((3.0e8 * Math.PI * 0.5e-3 ** 2) / 9.8, q.answer.value, 0.003), 'lb'));
const sg = { A: 25e-4, tau: 8.0e6 };
sg.F = sg.tau * sg.A;
add('shearglue-num', num({
  stem: 'Two metal plates are joined by a glue layer of area 25 cm². The glue fails when the shear stress in it reaches 8.0 × 10⁶ Pa. Find the largest force, acting along the layer, that the joint can carry, in kN.',
  value: v3(sg.F / 1000), tol: 0.1, unit: 'kN',
  sol: r`$A = 25 \times 10^{-4}$ m$^2$. Shear stress $= F/A$, so $F = 8.0 \times 10^{6} \times 25 \times 10^{-4} = ${sg.F}\ \text{N} = ${v3(sg.F / 1000)}$ kN.`,
  scheme: [['25 cm² = 25 × 10⁻⁴ m²', 1], [`F = shear stress × area = ${sg.F} N = ${v3(sg.F / 1000)} kN`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => ok(near(8.0e6 * 25e-4 / 1000, q.answer.value, 1e-9), 'sg'));
const sa = { h: 0.08, dx: 0.2e-3 };
sa.theta = sa.dx / sa.h;
add('shearangle-num', num({
  stem: 'The top face of a rubber block of height 8.0 cm is pushed sideways by 0.20 mm relative to its fixed base. Find the shear strain (the angle of shear), in units of 10⁻³ rad.',
  value: v3(sa.theta * 1e3), tol: 0.05, unit: '× 10⁻³ rad',
  sol: r`$\theta \approx \tan\theta = \dfrac{\Delta x}{h} = \dfrac{0.20 \times 10^{-3}}{8.0 \times 10^{-2}} = ${sci(sa.theta, 2)}$ rad. In units of $10^{-3}$ rad: $\theta = ${v3(sa.theta * 1e3)}$.`,
  scheme: [['θ ≈ Δx/h with both lengths in metres', 1]],
  d: 1, c: 'application', t: [1],
}), (q) => ok(near(Math.atan(0.2e-3 / 0.08) * 1e3, q.answer.value, 1e-3), 'sa'));

// ================================================================ t01 short answers
add('elplas-short', short({
  marks: 2,
  stem: 'A steel spring in a kitchen scale and a lump of putty are each pulled and then released. Use them to distinguish elastic from plastic behaviour.',
  model: 'The steel spring is **elastic**: when the pulling force is removed it regains its original shape, because the interatomic forces restore it. The putty is **plastic**: it stays deformed after the force is removed. No real body is perfectly elastic or perfectly plastic.',
  sol: 'Spring regains shape; putty does not.',
  scheme: [['Elastic body regains original size and shape (spring)', 1], ['Plastic body stays deformed (putty)', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('hookelaw-short', short({
  marks: 2,
  stem: 'A technician stretches a wire and finds that doubling the load doubles its extension. State Hooke’s law and say what she can conclude about the stress and the strain in the wire.',
  model: '**Hooke’s law:** within the proportional limit, stress is directly proportional to strain. Doubling the load doubles the stress (same area) and the extension doubles the strain (same length), so the ratio of stress to strain is constant and the wire is still within the Hooke range.',
  sol: 'Stress ∝ strain; both double.',
  scheme: [['Statement: stress ∝ strain within the limit', 1], ['Both stress and strain double; ratio constant', 1]],
  d: 2, c: 'application', t: [1],
}));
add('yieldult-short', short({
  marks: 2,
  stem: 'On the stress–strain curve of a ductile metal, explain what is meant by (i) the yield point and (ii) the ultimate stress.',
  model: '(i) The **yield point** (with the elastic limit) is the stress beyond which the metal no longer recovers fully; permanent, plastic strain begins. (ii) The **ultimate stress** is the greatest stress on the curve, the highest the material can bear before it thins and fractures.',
  sol: 'Yield: start of permanent strain. Ultimate: greatest stress.',
  scheme: [['Yield point: beyond it deformation is permanent (plastic)', 1], ['Ultimate stress: the maximum stress on the curve', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('twostress-short', short({
  marks: 2,
  stem: 'A hanging cable and a block pushed sideways along its top face show different kinds of stress. Name the stress and the matching strain for each.',
  model: 'For the hanging cable the stress is **tensile (longitudinal) stress**, F/A, and the strain is **longitudinal strain**, ΔL/L. For the block pushed along its face the stress is **shear stress**, F/A with F parallel to the face, and the strain is the **angle of shear** θ ≈ Δx/h.',
  sol: 'Tensile: ΔL/L. Shear: θ = Δx/h.',
  scheme: [['Cable: tensile stress and ΔL/L', 1], ['Block: shear stress and the angle of shear Δx/h', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('curve-short3', short({
  marks: 3,
  stem: 'Describe the stress–strain curve of a ductile metal wire, naming the points from the proportional limit to fracture.',
  model: 'The curve starts as a straight line, OA, where stress is proportional to strain; A is the **proportional limit**. Up to B, the **elastic limit and yield point**, the wire still recovers. Beyond B the strain is largely permanent (plastic region) and the stress needed rises to the **ultimate stress** at C. After C the wire thins and **fractures** at D.',
  sol: 'OA straight; A, B, C, D named.',
  scheme: [['OA straight line, A proportional limit', 1], ['B elastic limit and yield point; plastic region beyond', 1], ['C ultimate stress; fracture at D', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('permset-short3', short({
  marks: 3,
  stem: 'A wire is stretched beyond its elastic limit and the load is then removed slowly. Describe, with the shape of the unloading graph, what happens to the wire and why.',
  model: 'On the stress–strain graph the unloading path is a straight line **parallel to the initial straight part**, not the loading curve. It reaches zero stress at a **non-zero strain**, the permanent set, so the wire stays longer. Beyond the elastic limit the layers of atoms have slipped to new positions (plastic deformation), so the original shape is not recovered.',
  sol: 'Parallel to OA; permanent strain remains.',
  scheme: [['Unloading line is parallel to the first straight part', 1], ['Zero stress at non-zero strain: permanent set', 1], ['Reason: plastic deformation beyond the elastic limit', 1]],
  d: 3, c: 'application', t: [1],
}));
add('ductbrit-short3', short({
  marks: 3,
  stem: 'A steel girder and a glass plate each fail under tension. Compare ductile and brittle behaviour using the stress–strain curve, and say why ductile materials are preferred for bridges.',
  model: 'A **ductile** material such as steel has a long plastic region between the elastic limit and fracture: it stretches and sags visibly before failing. A **brittle** material such as glass fractures soon after its elastic limit, with little strain and no warning. Bridges use ductile steel because a long plastic region gives warning and absorbs energy before collapse.',
  sol: 'Long vs short plastic region; warning.',
  scheme: [['Ductile: long plastic region', 1], ['Brittle: fracture soon after the elastic limit', 1], ['Ductile preferred: warning before failure', 1]],
  d: 3, c: 'understanding', t: [1],
}));
