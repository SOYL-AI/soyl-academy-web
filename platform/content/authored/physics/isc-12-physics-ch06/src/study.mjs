// ISC 12 Physics ch06 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, termPlot, groupPlot, potPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cells, Kirchhoff’s Laws, Bridges and Potentiometer — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Emf, internal resistance and terminal p.d.',
      `- **Emf** E: work done by the cell (non-electrostatic, chemical action) per unit charge taken once round the circuit; unit volt (J C⁻¹). Equal to the terminal p.d. on open circuit.
- **Internal resistance** r: resistance of the electrolyte and electrodes; grows with electrode separation, falls with larger immersed area.
- Energy per coulomb: $E = IR + Ir = I(R + r)$, so the **terminal p.d.** $V = IR = E - Ir$ while discharging; $V = E + Ir$ while being charged.
- V–I graph: straight line, intercept E on the V-axis, slope −r, short-circuit current E/r (e.g. E = 4.5 V, r = 0.30 Ω, R = 2.7 Ω: I = 1.5 A, V = 4.05 V).`,
      [kt('Emf', 'Energy supplied by a source per unit charge passing once round the circuit.'), kt('Internal resistance', 'Resistance of the material inside a cell, through which its own current must pass.'), kt('Terminal potential difference', 'Potential difference across the terminals of a cell; E − Ir while it supplies current I.')],
      [fm(r`E = I(R + r),\qquad V = E - Ir`, 'Cell on load')],
      V.load,
      [1],
      [termPlot],
    ),
    sec(
      '2. Grouping of cells',
      `- **n identical cells in series:** emf nE, resistance nr; $I = \\dfrac{nE}{R + nr}$ (best when R ≫ r). With some cells reversed, their emfs subtract but their resistances still add.
- **m identical cells in parallel:** emf E, resistance r/m; $I = \\dfrac{E}{R + r/m}$ (best when R ≪ r).
- **Mixed (m rows of n):** $I = \\dfrac{nE}{R + nr/m}$, largest when $R = nr/m$.
- **Two unequal cells in parallel:** $E_{eq} = \\dfrac{E_1r_2 + E_2r_1}{r_1 + r_2}$, $r_{eq} = \\dfrac{r_1r_2}{r_1 + r_2}$. The weaker cell may be charged by the stronger one.`,
      [kt('Mixed grouping', 'Identical cells arranged as m parallel rows, each of n cells in series.')],
      [fm(r`I = \dfrac{nE}{R + nr/m}`, 'Mixed grouping'), fm(r`E_{eq} = \dfrac{E_1r_2 + E_2r_1}{r_1 + r_2},\quad r_{eq} = \dfrac{r_1r_2}{r_1 + r_2}`, 'Two cells in parallel')],
      V.groups,
      [2],
      [groupPlot, V.uneq],
    ),
    sec(
      '3. Kirchhoff’s laws',
      `- **Junction law** (conservation of charge): $\\sum I = 0$ at any junction.
- **Loop law** (conservation of energy): $\\sum E = \\sum IR$ round any closed loop.
- Signs: −IR going along the current through a resistor, +IR against it; +E crossing a cell from − to +, −E from + to −.
- Assume directions; a negative answer means the current flows the other way. Use as many independent loops as there are unknown currents less the junction equations.`,
      [kt('Junction', 'A point in a circuit where three or more conductors meet.'), kt('Loop', 'Any closed conducting path in a network.')],
      [fm(r`\sum I = 0,\qquad \sum E = \sum IR`, 'Kirchhoff’s laws')],
      V.kirch,
      [3],
    ),
    sec(
      '4. Wheatstone bridge and metre bridge',
      `- Wheatstone bridge (P, Q in one pair of arms, R, S in the other, galvanometer between their junctions): **balanced** when $\\dfrac{P}{Q} = \\dfrac{R}{S}$ (from the loop law with $I_g = 0$). Balance is independent of the cell’s emf and the galvanometer’s resistance; the bridge is most sensitive when all four arms are of the same order.
- **Metre bridge:** uniform 100 cm wire forms two arms; unknown X in the left gap, known R in the right, balance at l: $X = R\\,\\dfrac{l}{100 - l}$. Aim for l near 50 cm (end resistances matter least); interchange X and R and average.`,
      [kt('Null point', 'Position of the jockey at which the galvanometer shows no deflection.')],
      [fm(r`\dfrac{P}{Q} = \dfrac{R}{S}`, 'Bridge balance'), fm(r`X = R\,\dfrac{l}{100 - l}`, 'Metre bridge')],
      V.bridge,
      [4],
      [V.metre],
    ),
    sec(
      '5. Potentiometer: principle, gradient, sensitivity',
      `- A uniform wire carrying a steady current: potential drop ∝ length, $V = kl$. A cell (+ to A) balanced at length l: $E = kl$, with **no current** drawn — an **ideal voltmeter**.
- **Potential gradient** $k = V_{AB}/L = I\\rho/A$ (V m⁻¹). Wire of constantan or manganin (high ρ, low temperature coefficient), uniform cross-section.
- **Sensitivity** rises as k falls: longer wire, more resistance in the driver circuit. Balance needs driver emf (p.d. across the wire) > E and both + terminals at A.`,
      [kt('Potential gradient', 'Fall of potential per unit length along the potentiometer wire.'), kt('Sensitivity of a potentiometer', 'Change in balancing length per unit change in emf; greater when the potential gradient is smaller.')],
      [fm(r`E = kl,\qquad k = \dfrac{V_{AB}}{L}`, 'Potentiometer')],
      V.pot,
      [5],
      [potPlot],
    ),
    sec(
      '6. Potentiometer applications',
      `- **Comparing emfs** (two-way key, same k): $\\dfrac{E_1}{E_2} = \\dfrac{l_1}{l_2}$; neither k nor the internal resistances are needed. Sum-and-difference method: $\\dfrac{E_1 + E_2}{E_1 - E_2} = \\dfrac{l_a}{l_b}$.
- **Internal resistance:** open circuit $E = kl_1$; with R across the cell, $V = kl_2$; $r = R\\,\\dfrac{l_1 - l_2}{l_2}$.`,
      [],
      [fm(r`\dfrac{E_1}{E_2} = \dfrac{l_1}{l_2}`, 'Comparing emfs'), fm(r`r = R\,\dfrac{l_1 - l_2}{l_2}`, 'Internal resistance')],
      V.potCmp,
      [6],
      [V.potInt],
    ),
  ],
  exam_tips_md: `- Derive E = I(R + r) from energy per coulomb; V = E + Ir when charging.
- Mixed grouping: largest current when R = nr/m.
- Kirchhoff: label currents, one sign convention, negative answer = reversed direction.
- Potentiometer: smaller k, more sensitive; no balance if the wire’s p.d. is less than E.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is the emf of a cell?', 'Work done by the cell per unit charge taken once round the circuit.', 'concept', 1),
    fc(2, 'Terminal p.d. of a cell supplying current I?', '$V = E - Ir$.', 'formula', 1),
    fc(3, 'Terminal p.d. of a cell being charged with current I?', '$V = E + Ir$.', 'formula', 1),
    fc(4, 'Relation from energy conservation for a cell on load?', '$E = I(R + r)$.', 'formula', 1),
    fc(5, 'What do the intercepts of the V–I line of a cell give?', 'V-axis: E; I-axis: short-circuit current E/r; slope −r.', 'concept', 1),
    fc(6, 'When does the terminal p.d. equal the emf?', 'On open circuit (no current drawn).', 'fact', 1),
    fc(7, 'Two factors that raise a cell’s internal resistance?', 'Larger electrode separation; smaller area of electrodes in the electrolyte.', 'fact', 1),
    fc(8, 'Current from n identical cells in series?', '$nE/(R + nr)$.', 'formula', 2),
    fc(9, 'Current from m identical cells in parallel?', '$E/(R + r/m)$.', 'formula', 2),
    fc(10, 'Current from m rows of n cells (mixed)?', '$nE/(R + nr/m)$.', 'formula', 2),
    fc(11, 'Condition for maximum current in mixed grouping?', '$R = nr/m$.', 'formula', 2),
    fc(12, 'Series or parallel for a very small external resistance?', 'Parallel.', 'concept', 2),
    fc(13, 'Equivalent emf of two cells in parallel?', '$(E_1r_2 + E_2r_1)/(r_1 + r_2)$.', 'formula', 2),
    fc(14, 'Equivalent internal resistance of two cells in parallel?', '$r_1r_2/(r_1 + r_2)$.', 'formula', 2),
    fc(15, 'Effect of one reversed cell among n in series?', 'Emf falls by 2E; internal resistance unchanged.', 'example', 2),
    fc(16, 'Kirchhoff’s junction law expresses conservation of…?', 'Charge.', 'fact', 3),
    fc(17, 'Kirchhoff’s loop law expresses conservation of…?', 'Energy.', 'fact', 3),
    fc(18, 'Sign of IR when the loop is traversed along the current?', 'Negative (a fall of potential).', 'concept', 3),
    fc(19, 'A solved current comes out negative. Meaning?', 'It flows opposite to the assumed direction.', 'concept', 3),
    fc(20, 'Balance condition of a Wheatstone bridge?', '$P/Q = R/S$.', 'formula', 4),
    fc(21, 'Metre bridge formula (X in the left gap)?', '$X = R\\,l/(100 - l)$.', 'formula', 4),
    fc(22, 'Why balance a metre bridge near 50 cm?', 'End resistances cause the least error.', 'exam-tip', 4),
    fc(23, 'Does a bridge’s balance depend on the cell’s emf?', 'No.', 'fact', 4),
    fc(24, 'Principle of the potentiometer?', 'With a steady current in a uniform wire, potential drop ∝ length.', 'concept', 5),
    fc(25, 'Potential gradient?', 'Fall of potential per unit length of the wire, $k = V_{AB}/L$.', 'formula', 5),
    fc(26, 'How to make a potentiometer more sensitive?', 'Reduce k: longer wire or more rheostat resistance.', 'concept', 5),
    fc(27, 'Why is a potentiometer called an ideal voltmeter?', 'It draws no current at balance.', 'concept', 5),
    fc(28, 'Comparing emfs with a potentiometer?', '$E_1/E_2 = l_1/l_2$.', 'formula', 6),
    fc(29, 'Internal resistance with a potentiometer?', '$r = R(l_1 - l_2)/l_2$.', 'formula', 6),
    fc(30, 'Exam tip: no balance point on the wire?', 'Driver p.d. too small, or + terminals not both at A.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
