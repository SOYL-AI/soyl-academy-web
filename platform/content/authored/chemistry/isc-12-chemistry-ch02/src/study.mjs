// ISC 12 Chemistry ch02 Colligative Properties — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, boilPlot, freezePlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Colligative Properties — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Colligative properties; relative lowering of vapour pressure',
      r`**Colligative properties** of dilute solutions of non-volatile solutes depend on the **number** of solute particles, not their nature: relative lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure.

**Relative lowering of vapour pressure** (from Raoult’s law, $p = p^\circ x_1$): $\dfrac{p^\circ - p}{p^\circ} = x_2$. For dilute solutions $x_2 \approx \dfrac{n_2}{n_1} = \dfrac{w_2M_1}{M_2w_1}$, giving $M_2 = \dfrac{w_2M_1p^\circ}{w_1(p^\circ - p)}$.`,
      [kt('Colligative property', 'A property of a dilute solution that depends only on the number of solute particles, not on their nature.'), kt('Relative lowering of vapour pressure', 'The lowering of vapour pressure divided by the vapour pressure of the pure solvent; equal to the mole fraction of the solute.')],
      [fm(r`\frac{p^\circ - p}{p^\circ} = x_2 \approx \frac{w_2 M_1}{M_2 w_1}`, 'Relative lowering of vapour pressure')],
      V.vplower,
      [1],
    ),
    sec(
      '2. Elevation of boiling point',
      r`A liquid boils when its vapour pressure equals the external pressure; a solution’s vapour pressure is lower, so it boils at a higher temperature: $\Delta T_\text{b} = T_\text{b} - T^\circ_\text{b}$.

**Derivation:** near $T^\circ_\text{b}$ the vapour pressure curves of solvent and solution are nearly parallel straight lines, so $\Delta T_\text{b} \propto \Delta p$. With $p^\circ$ constant, $\Delta T_\text{b} \propto \Delta p/p^\circ = x_2 \approx n_2/n_1 = mM_1/1000$. Hence $\Delta T_\text{b} = K_\text{b}m$, with $K_\text{b}$ the **ebullioscopic (molal elevation) constant**, in K kg mol⁻¹ (water 0.52, benzene 2.53). Thermodynamically $K_\text{b} = \dfrac{R(T^\circ_\text{b})^2M_1}{1000\,\Delta_\text{vap}H}$.

Molar mass: $M_2 = \dfrac{1000K_\text{b}w_2}{\Delta T_\text{b}w_1}$.`,
      [kt('Ebullioscopic constant', 'The elevation of boiling point produced by a 1 mol kg⁻¹ solution; depends only on the solvent.')],
      [fm(r`\Delta T_\text{b} = K_\text{b}\,m = \frac{1000\,K_\text{b}\,w_2}{M_2\,w_1}`, 'Elevation of boiling point')],
      boilPlot,
      [2],
    ),
    sec(
      '3. Depression of freezing point',
      r`At the freezing point the solid and liquid solvent have equal vapour pressures. The solution’s vapour pressure is lower, so it equals that of the solid at a lower temperature: $\Delta T_\text{f} = T^\circ_\text{f} - T_\text{f}$.

**Derivation:** as for boiling point, $\Delta T_\text{f} \propto \Delta p \propto x_2 \propto m$, so $\Delta T_\text{f} = K_\text{f}m$, with $K_\text{f}$ the **cryoscopic (molal depression) constant** (water 1.86, benzene 5.12, camphor 37.7 K kg mol⁻¹); $K_\text{f} = \dfrac{R(T^\circ_\text{f})^2M_1}{1000\,\Delta_\text{fus}H}$.

Molar mass: $M_2 = \dfrac{1000K_\text{f}w_2}{\Delta T_\text{f}w_1}$. Uses: antifreeze, salting roads, camphor (Rast) method.`,
      [kt('Cryoscopic constant', 'The depression of freezing point produced by a 1 mol kg⁻¹ solution; depends only on the solvent.')],
      [fm(r`\Delta T_\text{f} = K_\text{f}\,m = \frac{1000\,K_\text{f}\,w_2}{M_2\,w_1}`, 'Depression of freezing point')],
      freezePlot,
      [3],
    ),
    sec(
      '4. Osmosis and osmotic pressure',
      r`**Diffusion:** spreading of particles from high to low concentration, no membrane. **Osmosis:** flow of solvent only through a **semipermeable membrane** (parchment, cellophane, copper ferrocyanide, animal bladder) from pure solvent or dilute solution into a more concentrated solution. **Osmotic pressure** $\pi$: the excess pressure on the solution that just stops osmosis.

**van’t Hoff laws:** Boyle–van’t Hoff ($\pi \propto C$ at constant $T$); Charles–van’t Hoff ($\pi \propto T$ at constant $C$); Avogadro–van’t Hoff (equimolar solutions at the same $T$ have equal $\pi$). Combined: $\pi = CRT$, $\pi V = nRT$, $M_2 = \dfrac{w_2RT}{\pi V}$ — best for proteins and polymers (room temperature, large values).

**Isotonic** solutions have equal $\pi$ (0.9% NaCl and blood); a cell **shrinks** in a hypertonic solution and **swells** in a hypotonic one. **Reverse osmosis:** pressure greater than $\pi$ forces solvent out of the solution; used for desalination of sea water.`,
      [kt('Semipermeable membrane', 'A membrane that allows solvent molecules but not solute particles to pass.'), kt('Osmotic pressure', 'The excess pressure that must be applied to a solution to prevent the flow of solvent into it through a semipermeable membrane.'), kt('Isotonic solutions', 'Solutions with the same osmotic pressure at the same temperature.'), kt('Reverse osmosis', 'Flow of solvent out of a solution through a semipermeable membrane when a pressure greater than its osmotic pressure is applied.')],
      [fm(r`\pi = CRT`, 'Osmotic pressure'), fm(r`M_2 = \frac{w_2 R T}{\pi V}`, 'Molar mass from osmotic pressure')],
      V.osmosis,
      [4],
      [V.ro],
    ),
    sec(
      '5. Abnormal molar masses and the van’t Hoff factor',
      r`Dissociation increases the number of particles (molar mass appears **low**); association decreases it (molar mass appears **high**, e.g. carboxylic acids dimerise in benzene).

$i = \dfrac{\text{observed colligative property}}{\text{calculated colligative property}} = \dfrac{\text{normal molar mass}}{\text{observed molar mass}}$.

Modified equations: $\Delta p/p^\circ = ix_2$; $\Delta T_\text{b} = iK_\text{b}m$; $\Delta T_\text{f} = iK_\text{f}m$; $\pi = iCRT$.
- **Dissociation** into $n$ ions: $i = 1 + (n-1)\alpha$, so $\alpha = \dfrac{i-1}{n-1}$.
- **Association** of $n$ molecules: $i = 1 - \alpha + \dfrac{\alpha}{n}$, so $\alpha = \dfrac{1-i}{1-1/n}$.`,
      [kt('van’t Hoff factor', 'Ratio of the observed colligative property to the value calculated assuming no dissociation or association.'), kt('Degree of dissociation', 'Fraction of the solute that dissociates into ions.')],
      [fm(r`i = 1 + (n-1)\alpha`, 'Dissociation'), fm(r`i = 1 - \alpha + \frac{\alpha}{n}`, 'Association')],
      table(['Solute', 'Likely i'], [['Glucose, urea in water', '1'], ['NaCl in water', 'up to 2'], ['K₂SO₄ in water', 'up to 3'], ['Ethanoic or benzoic acid in benzene', 'about 0.5']], 'Table of typical van’t Hoff factors'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the mass of solution instead of solvent for molality.
- Adding 273 to a temperature difference.
- Using mL instead of L, or a gas constant that does not match the pressure unit, in π = CRT.
- Forgetting the van’t Hoff factor for electrolytes, or using n = 2 for K₂SO₄ (it is 3).
- Mixing up hypotonic (cell swells) and hypertonic (cell shrinks).

**How marks are usually awarded**
- Derivations (3 marks): the vapour pressure argument, the proportionality to x₂, and the final expression with the constant named.
- Numericals: formula, substitution with units, answer with units; full working is expected in ISC.
- van’t Hoff factor problems: calculated value, observed value, i, then α.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Colligative properties depend on…?', 'The number of solute particles, not their nature.', 'concept', 1),
    fc(2, 'Name the four colligative properties.', 'Relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmotic pressure.', 'fact', 1),
    fc(3, 'Relative lowering of vapour pressure equals…?', 'The mole fraction of the solute.', 'formula', 1),
    fc(4, 'Molar mass from vapour pressure lowering?', 'M₂ = w₂M₁p° ÷ [w₁(p° − p)] (dilute solution).', 'formula', 1),
    fc(5, 'Why does a solution boil at a higher temperature?', 'Its vapour pressure is lower, so it reaches external pressure only at a higher temperature.', 'concept', 2),
    fc(6, 'ΔTb equation?', 'ΔTb = Kb m.', 'formula', 2),
    fc(7, 'Kb of water?', '0.52 K kg mol⁻¹.', 'fact', 2),
    fc(8, 'Key assumption in deriving ΔTb = Kb m?', 'Dilute solution; vapour pressure curves nearly straight and parallel near Tb.', 'concept', 2),
    fc(9, 'Kb depends on…?', 'The solvent only (Kb = R Tb² M₁ ÷ 1000 ΔvapH).', 'concept', 2),
    fc(10, 'Condition at the freezing point?', 'Solid and liquid solvent have equal vapour pressure.', 'concept', 3),
    fc(11, 'ΔTf equation?', 'ΔTf = Kf m.', 'formula', 3),
    fc(12, 'Kf of water and camphor?', '1.86 and about 37.7 K kg mol⁻¹.', 'fact', 3),
    fc(13, 'Why is camphor useful for molar masses?', 'Its very large Kf gives large, easily measured depressions.', 'concept', 3),
    fc(14, 'Diffusion vs osmosis?', 'Diffusion: no membrane, particles spread. Osmosis: only solvent moves, through a semipermeable membrane.', 'concept', 4),
    fc(15, 'Define osmotic pressure.', 'The excess pressure on a solution that just stops solvent entering it through a semipermeable membrane.', 'definition', 4),
    fc(16, 'Boyle–van’t Hoff law?', 'At constant T, π ∝ C.', 'definition', 4),
    fc(17, 'Charles–van’t Hoff law?', 'At constant C, π ∝ T.', 'definition', 4),
    fc(18, 'Avogadro–van’t Hoff law?', 'Equimolar solutions at the same temperature have equal osmotic pressures.', 'definition', 4),
    fc(19, 'Osmotic pressure equation?', 'π = CRT (πV = nRT).', 'formula', 4),
    fc(20, 'Why is osmotic pressure used for proteins?', 'Measured at room temperature; large values even for very dilute solutions.', 'concept', 4),
    fc(21, 'Isotonic with blood?', '0.9% (w/v) NaCl solution.', 'fact', 4),
    fc(22, 'Cell in a hypertonic solution?', 'Loses water and shrinks.', 'concept', 4),
    fc(23, 'Reverse osmosis?', 'Pressure above π forces solvent out of a solution through the membrane; desalination.', 'definition', 4),
    fc(24, 'Two semipermeable membranes?', 'Copper ferrocyanide film, cellophane (also parchment, animal bladder).', 'example', 4),
    fc(25, 'Dissociation makes the molar mass appear…?', 'Lower than normal (more particles).', 'concept', 5),
    fc(26, 'Association makes the molar mass appear…?', 'Higher than normal (fewer particles).', 'concept', 5),
    fc(27, 'Define the van’t Hoff factor.', 'Observed colligative property ÷ calculated value (= normal ÷ observed molar mass).', 'definition', 5),
    fc(28, 'i for dissociation into n ions?', 'i = 1 + (n − 1)α.', 'formula', 5),
    fc(29, 'i for dimerisation?', 'i = 1 − α/2.', 'formula', 5),
    fc(30, 'i for glucose in water?', '1 (no dissociation or association).', 'fact', 5),
    fc(31, 'Exam tip: π = CRT', 'Use litres, kelvin and R matching the pressure unit.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
