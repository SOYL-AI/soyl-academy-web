// ISC 12 Physics ch02 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, shellPlot, linePlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electric Flux and Gauss’s Theorem — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electric flux',
      `- **Area vector** $\\Delta\\vec S$: magnitude = area, direction normal to the surface (outward for a closed surface).
- Uniform field, plane area: $\\Delta\\Phi = \\vec E\\cdot\\Delta\\vec S = E\\Delta S\\cos\\theta$ (θ between E and the normal): maximum at 0°, zero at 90°, negative (−EΔS) at 180°.
- General: $\\Phi = \\oint \\vec E\\cdot d\\vec S$ (surface integral). Flux is a **scalar**; unit N m² C⁻¹ (= V m).`,
      [kt('Electric flux', 'The surface integral of E over a surface, a measure of the field passing through it.'), kt('Area vector', 'A vector normal to a surface, of magnitude equal to its area.')],
      [fm(r`\Phi = \oint \vec E\cdot d\vec S`, 'Electric flux')],
      V.flux,
      [1],
    ),
    sec(
      '2. Gauss’s theorem',
      `- **Statement:** the total electric flux through any closed surface is $1/\\varepsilon_0$ times the net charge enclosed: $\\oint \\vec E\\cdot d\\vec S = q_\\text{enc}/\\varepsilon_0$.
- Charges outside contribute **zero net flux** (they still affect E at the surface). Flux is independent of the shape and size of the surface.
- Charge at the centre of a cube: $q/(6\\varepsilon_0)$ through each face.
- **Gaussian surface:** an imaginary closed surface chosen so that over each part E is either normal and of constant size, or parallel to the surface; it must not pass through a point charge.
- Gauss’s theorem and Coulomb’s law are equivalent for static charges.`,
      [kt('Gaussian surface', 'An imaginary closed surface chosen to exploit the symmetry of a charge distribution.')],
      [fm(r`\oint \vec E\cdot d\vec S = \dfrac{q_\text{enc}}{\varepsilon_0}`, 'Gauss’s theorem')],
      V.gauss,
      [2],
      [V.cube],
    ),
    sec(
      '3. Long straight line of charge',
      `Coaxial cylinder (radius r, length l): flux only through the curved surface, $E \\cdot 2\\pi rl = \\lambda l/\\varepsilon_0$, so
$E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r} = \\dfrac{2k\\lambda}{r}$, radially outward for λ > 0; $E \\propto 1/r$.`,
      [],
      [fm(r`E = \dfrac{\lambda}{2\pi\varepsilon_0 r}`, 'Long line of charge')],
      V.apps,
      [3],
      [linePlot],
    ),
    sec(
      '4. Infinite plane sheet of charge',
      `Pillbox of cross-section A through the sheet: flux through the two ends only, $2EA = \\sigma A/\\varepsilon_0$, so $E = \\dfrac{\\sigma}{2\\varepsilon_0}$, **independent of distance**, normal to the sheet.
Two parallel sheets $+\\sigma$ and $-\\sigma$: $E = \\sigma/\\varepsilon_0$ between them (from + to −), $E = 0$ outside.`,
      [],
      [fm(r`E = \dfrac{\sigma}{2\varepsilon_0}`, 'Infinite plane sheet')],
      V.plates,
      [4],
    ),
    sec(
      '5. Thin spherical shell',
      `- **Outside** ($r > R$): $E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2}$ — as if all the charge were at the centre.
- **On the surface** ($r = R$): $E = \\dfrac{q}{4\\pi\\varepsilon_0R^2} = \\dfrac{\\sigma}{\\varepsilon_0}$, with $\\sigma = q/4\\pi R^2$.
- **Inside** ($r < R$): $q_\\text{enc} = 0$, so $E = 0$ (electrostatic shielding).
- Graph of E against r: zero up to R, a jump to its maximum at R, then $\\propto 1/r^2$.`,
      [kt('Electrostatic shielding', 'The absence of field inside a closed charged (conducting) shell.')],
      [fm(r`E = \dfrac{q}{4\pi\varepsilon_0 r^2}\ (r \ge R),\quad E = 0\ (r < R)`, 'Thin spherical shell')],
      shellPlot,
      [5],
    ),
  ],
  exam_tips_md: `- Gauss derivations: surface, where flux is zero, flux = E × area, equate to q_enc/ε₀.
- Sheet: two end faces; line: curved surface only; shell: q_enc = 0 inside.
- Only enclosed charge counts; flux has a sign.
- Plot E against r for the shell with the jump at R.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Direction of the area vector of a closed surface?', 'Outward normal.', 'fact', 1),
    fc(2, 'Flux through a plane area in a uniform field?', '$E\\Delta S\\cos\\theta$.', 'formula', 1),
    fc(3, 'When is the flux through a plane area zero?', 'When E is parallel to the surface (θ = 90° to the normal).', 'concept', 1),
    fc(4, 'Is electric flux a vector or a scalar?', 'A scalar.', 'fact', 1),
    fc(5, 'SI unit of electric flux?', 'N m² C⁻¹ (= V m).', 'fact', 1),
    fc(6, 'Flux for a non-uniform field?', '$\\oint \\vec E\\cdot d\\vec S$.', 'formula', 1),
    fc(7, 'Gauss’s theorem?', 'Total flux through a closed surface = q_enclosed/ε₀.', 'formula', 2),
    fc(8, 'Effect of a charge outside a closed surface on its net flux?', 'None (zero net flux).', 'concept', 2),
    fc(9, 'Does the flux depend on the shape of the closed surface?', 'No, only on the enclosed charge.', 'concept', 2),
    fc(10, 'Charge q at the centre of a cube: flux through one face?', '$q/(6\\varepsilon_0)$.', 'formula', 2),
    fc(11, 'What is a Gaussian surface?', 'An imaginary closed surface chosen to use the symmetry.', 'concept', 2),
    fc(12, 'Why must a Gaussian surface not pass through a point charge?', 'E is undefined there.', 'concept', 2),
    fc(13, 'Zero net flux through a surface: is E zero on it?', 'Not necessarily; only the enclosed charge is zero.', 'concept', 2),
    fc(14, 'Gaussian surface for a long line of charge?', 'Coaxial cylinder.', 'fact', 3),
    fc(15, 'Field of a long line of charge?', '$E = \\lambda/(2\\pi\\varepsilon_0 r)$.', 'formula', 3),
    fc(16, 'How does the field of a line depend on r?', '$E \\propto 1/r$.', 'concept', 3),
    fc(17, 'Gaussian surface for a plane sheet?', 'A pillbox (cylinder) across the sheet.', 'fact', 4),
    fc(18, 'Field of an infinite sheet?', '$E = \\sigma/(2\\varepsilon_0)$, independent of distance.', 'formula', 4),
    fc(19, 'Field between two sheets +σ and −σ?', '$\\sigma/\\varepsilon_0$ (zero outside).', 'formula', 4),
    fc(20, 'Through which faces of the pillbox does flux pass?', 'The two flat ends only.', 'concept', 4),
    fc(21, 'Field outside a charged thin shell?', '$q/(4\\pi\\varepsilon_0 r^2)$, as for a point charge at the centre.', 'formula', 5),
    fc(22, 'Field inside a charged thin shell?', 'Zero.', 'fact', 5),
    fc(23, 'Field on the surface of a charged shell?', '$\\sigma/\\varepsilon_0$.', 'formula', 5),
    fc(24, 'Shape of the E–r graph for a shell?', 'Zero to R, jump to maximum at R, then ∝ 1/r².', 'concept', 5),
    fc(25, 'What is electrostatic shielding?', 'No field inside a closed charged conducting shell.', 'concept', 5),
    fc(26, 'Example: 20 nC on a 10 cm shell. E at the surface?', '1.8 × 10⁴ N C⁻¹.', 'example', 5),
    fc(27, 'Example: λ = 3 μC m⁻¹, r = 5 cm. E?', 'About 1.1 × 10⁶ N C⁻¹.', 'example', 3),
    fc(28, 'Which law makes the flux of a point charge independent of r?', 'The inverse-square law (E ∝ 1/r², area ∝ r²).', 'concept', 2),
    fc(29, 'Exam tip: Gauss derivations?', 'Surface, zero-flux parts, flux = E × area, = q/ε₀.', 'exam-tip', 2),
    fc(30, 'Exam tip: θ in flux problems?', 'Check if it is measured from the surface or the normal.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
