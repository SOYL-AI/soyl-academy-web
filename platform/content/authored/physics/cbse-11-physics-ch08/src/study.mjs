// ch08 notes and flashcards.
import { T, unit, PROV, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, CUR, plotHooke, plotCurve, plotUnload, plotBrittle, plotRubber, plotLoadExt, plotExt, plotWater, TABLES } from './decks.mjs';
import { g } from './phys.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10 } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Mechanical Properties of Solids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Stress, strain and Hooke’s law',
      r`- A **deforming force** changes the size or shape of a solid; a body that regains its original size and shape when the force is removed is **elastic**, one that stays deformed is **plastic**. No real body is perfectly elastic.
- **Stress** is the restoring force per unit area, $F/A$, in pascal (Pa = N m$^{-2}$; dimensions $\text{M L}^{-1}\text{T}^{-2}$). Longitudinal stress is **tensile** (stretching) or **compressive** (squeezing); **shear stress** acts along a face; **hydraulic stress** is the pressure on all faces.
- **Strain** is the fractional change and has no unit: longitudinal strain $\Delta L/L$, shear strain $\Delta x/h = \tan\theta \approx \theta$, volume strain $\Delta V/V$.
- **Hooke's law:** for small deformations stress is proportional to strain; the ratio is the **modulus of elasticity**. Example: a steel wire of diameter ${ex1.d * 1000} mm, length ${ex1.L} m, carrying ${ex1.F} N and stretching ${ex1.dL * 1000} mm has stress $${sci(ex1.stress, 3)}$ Pa and strain $${sci(ex1.strain, 2)}$.
- **Stress–strain curve of a ductile metal:** A proportional limit (Hooke's law ends), B elastic limit and yield point (beyond it the body does not fully recover), C ultimate stress (the greatest stress), D fracture. Beyond B, unloading follows a line parallel to OA and leaves a **permanent strain** (here ${dec(CUR.ePerm, 3)} after stretching to strain ${CUR.eP}).
- **Ductile** materials (copper, iron) have a long plastic region; **brittle** ones (glass, cast iron) fracture soon after the elastic limit. **Elastomers** (rubber, the aorta) stretch to several times their length and recover, but the curve is not a straight line and there is no clear plastic region.
- In a school experiment, loads of 5 N steps give $${ex3.k}$ mm N$^{-1}$ up to 30 N; at 35 N the extension (${ex3.ext[6]} mm) exceeds the Hooke value (${dec(ex3.pred, 3)} mm), so the wire has left the proportional range. A rod of ${ex2.A * 1e6} mm$^2$ with yield stress ${ex2.sy / 1e6} MPa carries ${dec(ex2.Fy / 1000, 3)} kN without yielding.`,
      [kt('Stress', 'Restoring force per unit area, F/A, in pascal.'), kt('Strain', 'Fractional deformation: ΔL/L, Δx/h or ΔV/V; no unit.'), kt('Elastic limit', 'The greatest stress up to which the body regains its original shape when unloaded.'), kt('Ultimate stress', 'The greatest stress the material can bear before fracture.'), kt('Elastomer', 'A material, such as rubber, that is elastic to very large strain but does not obey Hooke’s law.')],
      [fm(r`\text{stress} = \dfrac{F}{A}`, 'Stress'), fm(r`\text{longitudinal strain} = \dfrac{\Delta L}{L}`, 'Longitudinal strain'), fm(r`\text{shear strain} = \dfrac{\Delta x}{h} \approx \theta`, 'Shear strain')],
      plotCurve,
      [1],
      [V.stress, plotHooke, plotUnload, plotBrittle, plotRubber, plotLoadExt, TABLES.T_EP],
    ),
    sec(
      '2. Elastic moduli and applications of elastic behaviour',
      r`- **Young's modulus** $Y = \dfrac{F/A}{\Delta L/L} = \dfrac{FL}{A\,\Delta L}$: it belongs to the material, not to the wire. For equal $F$, $L$ and $A$ the extension is inversely proportional to $Y$: steel ($2.0 \times 10^{11}$ Pa) stretches less than copper ($1.1 \times 10^{11}$), brass ($9.1 \times 10^{10}$) or aluminium ($7.0 \times 10^{10}$). Steel is called more elastic than rubber because it needs a much greater stress for the same strain.
- **Shear modulus (modulus of rigidity)** $G = \dfrac{F/A}{\theta}$; only solids have it. For many metals $G$ is about $Y/3$. A steel plate ($G = 8.4 \times 10^{10}$ Pa) under ${ex6.F / 1000} kN on a face of ${ex6.A} m$^2$ shears by $${sci(ex6.theta, 2)}$ rad, a shift of $${sci(ex6.dx, 2)}$ m over ${ex6.h} m.
- **Bulk modulus** $B = -\dfrac{p}{\Delta V/V}$; compressibility $k = 1/B$. Solids, liquids and gases all have $B$. At ${ex7.h / 1000} km depth the pressure rise of sea water is $\rho g h = ${sci(ex7.p, 3)}$ Pa, so with $B = 2.2 \times 10^9$ Pa its volume falls by ${dec(ex7.frac * 100, 3)} percent.
- **Wire extension:** $\Delta L = \dfrac{FL}{\pi r^2 Y}$ — proportional to $L/r^2$ and inversely to $Y$. Doubling both length and radius halves the extension (factor ${dec(ex9.ratio, 2)}). Two wires joined end to end carry the same force and their extensions add: a steel wire of ${ex10.Ls} m and a copper wire of ${ex10.Lc} m (1.0 mm diameter) under ${ex10.F} N stretch ${dec(ex10.tot * 1000, 4)} mm in all. A steel cable of ${ex5.L} m and 4.0 cm$^2$ under ${ex5.m} kg ($g = ${g}$ m s$^{-2}$) stretches ${dec(ex5.dL * 1000, 3)} mm; the wire in worked example 4 gives $Y = ${sci(ex4.Y, 3)}$ Pa.
- **Ropes and cranes:** working stress = breaking stress ÷ safety factor. Lift ropes of total ${ex8.M} kg on ${ex8.n} ropes with a safety factor ${ex8.sf} and breaking stress $4.0 \times 10^8$ Pa need a radius of ${dec(ex8.r * 1000, 3)} mm each. A rope made of many thin strands is flexible but still has the full cross-section.
- **Beams and bridges:** a loaded beam is compressed above and stretched below, with a middle layer unchanged. Because the stress is largest at the top and bottom, girders are I-shaped, and a deeper beam of the same material sags far less than a shallow one.
- Left out here: Poisson's ratio and the elastic potential energy stored in a stretched wire; they are not named in the syllabus topics and were cut from the rationalised book.`,
      [kt('Young’s modulus', 'Tensile stress divided by longitudinal strain, Y = FL/(AΔL); a property of the material.'), kt('Shear modulus', 'Shear stress divided by shear strain (the angle θ); also called modulus of rigidity.'), kt('Bulk modulus', 'Pressure change divided by the fractional decrease of volume, B = −p/(ΔV/V).'), kt('Compressibility', 'The reciprocal of the bulk modulus.'), kt('Safety factor', 'Breaking stress divided by the working stress allowed in a design.')],
      [fm(r`Y = \dfrac{FL}{A\,\Delta L}`, 'Young’s modulus'), fm(r`G = \dfrac{F}{A\,\theta}`, 'Shear modulus'), fm(r`B = -\dfrac{p\,V}{\Delta V}`, 'Bulk modulus')],
      V.ywires,
      [2],
      [plotExt, V.shear, V.bulk, plotWater, TABLES.T_MOD, V.beam, TABLES.T_ROPE],
    ),
  ],
  exam_tips_md: `- Convert diameter to radius and millimetre to metre before A = πr²; strain has no unit.
- Name the points on the stress–strain curve in order; unloading beyond the elastic limit is parallel to the first straight part.
- Say which modulus applies; liquids and gases have only a bulk modulus.
- Wires joined end to end: same force, extensions add. Same wire stretched: ΔL = FL/(AY).
- For ropes and cranes use working stress = breaking stress ÷ safety factor.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What does an elastic body do when the deforming force is removed?', 'It regains its original size and shape (within its elastic limit).', 'concept', 1),
    fc(2, 'Which is closer to perfectly plastic: putty or quartz fibre?', 'Putty.', 'fact', 1),
    fc(3, 'Define stress and give its SI unit.', 'Restoring force per unit area, F/A; pascal (N m⁻²).', 'concept', 1),
    fc(4, 'Name the four kinds of stress.', 'Tensile, compressive, shear and hydraulic.', 'concept', 1),
    fc(5, 'Why does strain have no unit?', 'It is a ratio of two like quantities (lengths or volumes).', 'concept', 1),
    fc(6, 'Write the shear strain for a top face displaced by Δx on a block of height h.', 'Δx/h = tan θ ≈ θ (radian).', 'formula', 1),
    fc(7, 'State Hooke’s law.', 'Within the proportional limit, stress is proportional to strain.', 'concept', 1),
    fc(8, 'What does the slope of the straight part of a stress–strain graph give?', 'The modulus of elasticity (Young’s modulus for a stretched wire).', 'concept', 1),
    fc(9, 'What is the elastic limit?', 'The greatest stress up to which the body returns to its original shape when unloaded.', 'concept', 1),
    fc(10, 'What is the ultimate stress?', 'The greatest stress the material can bear on the curve, just before fracture.', 'concept', 1),
    fc(11, 'A wire is stretched past its yield point and unloaded. How does the stress fall?', 'Along a line parallel to the first straight part, leaving a permanent strain.', 'concept', 1),
    fc(12, 'Give one ductile and one brittle material.', 'Ductile: copper (or iron); brittle: glass (or cast iron).', 'fact', 1),
    fc(13, 'What is an elastomer? Give two examples.', 'A material elastic to very large strain but not obeying Hooke’s law: rubber, the aorta wall.', 'concept', 1),
    fc(14, 'A rod of 60 mm² cross-section yields at 250 MPa. Load at yield?', '15 kN (stress × area).', 'example', 1),
    fc(15, 'Write Young’s modulus in terms of F, A, L and ΔL.', 'Y = FL/(AΔL).', 'formula', 2),
    fc(16, 'On what does Young’s modulus of a wire depend?', 'Only on the material, not on length or thickness.', 'concept', 2),
    fc(17, 'Which has the larger Young modulus: steel or aluminium?', 'Steel (2.0 × 10¹¹ against 7.0 × 10¹⁰ Pa).', 'fact', 2),
    fc(18, 'Equal wires of steel and copper carry the same load. Which stretches less?', 'Steel, since its Young modulus is larger.', 'concept', 2),
    fc(19, 'Why is steel said to be more elastic than rubber?', 'It needs a much larger stress for the same strain (larger modulus).', 'concept', 2),
    fc(20, 'Define the shear modulus.', 'Shear stress divided by shear strain: G = F/(Aθ).', 'formula', 2),
    fc(21, 'Why does a liquid have no shear modulus?', 'It cannot resist a sideways force: it flows.', 'concept', 2),
    fc(22, 'Define the bulk modulus.', 'B = −p/(ΔV/V): pressure increase over fractional volume decrease.', 'formula', 2),
    fc(23, 'What is compressibility?', 'The reciprocal of the bulk modulus, 1/B.', 'concept', 2),
    fc(24, 'Which moduli can a gas have?', 'Only the bulk modulus.', 'concept', 2),
    fc(25, 'Two wires of the same material and load: A has length L and radius r, B has 2L and 2r. Ratio of extensions B : A?', '1 : 2, since extension ∝ L/r².', 'example', 2),
    fc(26, 'Wires joined end to end carry a load. What is common to both and what adds?', 'The force is the same; the extensions add.', 'concept', 2),
    fc(27, 'Define the safety factor of a rope.', 'Breaking stress divided by the working stress.', 'concept', 2),
    fc(28, 'Why is a crane rope made of many thin strands?', 'It stays flexible over pulleys while the total cross-section carries the load.', 'concept', 2),
    fc(29, 'Why is a girder I-shaped?', 'Stress from bending is largest at the top and bottom, so material is placed there; it saves weight.', 'concept', 2),
    fc(30, 'In a bent beam, which layers are compressed and which are stretched?', 'The upper layers are compressed and the lower layers stretched when it sags under a load.', 'concept', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
