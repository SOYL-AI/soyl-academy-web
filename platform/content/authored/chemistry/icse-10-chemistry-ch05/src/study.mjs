// ICSE 10 Chemistry ch05 Mole Concept: Gas Laws, Molar Volume and Avogadro's Number — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const fm = (latex, label) => ({ latex, label });

export const notes = {
  unit: unit(),
  version: 1,
  title: "Mole Concept: Gas Laws, Molar Volume and Avogadro's Number — Notes",
  language: 'en',
  sections: [
    sec(
      "1. Gay-Lussac's law of combining volumes",
      `**Statement:** when gases react, they do so in volumes that bear a simple whole-number ratio to one another and to the volumes of the gaseous products, all volumes being measured at the same temperature and pressure.

- The volume ratio equals the ratio of the **coefficients** of the gases in the balanced equation: N₂ + 3H₂ → 2NH₃ gives 1 : 3 : 2.
- Count **gases only**. Water formed at room temperature is a liquid; solids are ignored.
- If one gas is in **excess**, find the gas that is used up first; the unused excess is part of the gas left.

**Method:** balanced equation → volume ratio of the gases → multiply → add up the gases left (excess + gaseous products).`,
      [kt("Gay-Lussac's law", 'Reacting gases and gaseous products are in a simple whole-number ratio by volume, at the same temperature and pressure.'), kt('Excess reactant', 'A reactant present in more than the amount needed; part of it remains after the reaction.')],
      [],
      table(['Reaction', 'Volume ratio of gases'], [['N₂ + 3H₂ → 2NH₃', '1 : 3 : 2'], ['2CO + O₂ → 2CO₂', '2 : 1 : 2'], ['CH₄ + 2O₂ → CO₂ + 2H₂O (room temperature)', '1 : 2 : 1 (water not counted)']], 'Table of three reactions with the volume ratios of their gases'),
      [1],
    ),
    sec(
      "2. Avogadro's law and atomicity",
      `**Avogadro's law:** equal volumes of all gases, at the same temperature and pressure, contain equal numbers of molecules.

- At fixed temperature and pressure: **ratio of volumes = ratio of molecules = ratio of coefficients**.
- Equal volumes of different gases have **different masses**, because their molecules have different masses.

**Atomicity** is the number of atoms in one molecule of an element. Hydrogen, oxygen, nitrogen and chlorine are **diatomic** (H₂, O₂, N₂, Cl₂). This follows from volume results. 1 volume of hydrogen + 1 volume of chlorine gives 2 volumes of hydrogen chloride, so each hydrogen molecule must split into two atoms. Similarly 1 volume of nitrogen + 1 volume of oxygen gives 2 volumes of nitrogen monoxide. (The formal proof is not examined.)`,
      [kt("Avogadro's law", 'Equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules.'), kt('Atomicity', 'The number of atoms in one molecule of an element.')],
      [],
      table(['Atomicity', 'Examples'], [['1 (monatomic)', 'He, Ne, Ar'], ['2 (diatomic)', 'H₂, O₂, N₂, Cl₂'], ['3 (triatomic)', 'O₃ (ozone)'], ['4 (tetratomic)', 'P₄']], 'Table of atomicities with example elements'),
      [2],
    ),
    sec(
      "3. The mole and Avogadro's number",
      r`**Mole:** the amount of a substance that contains as many particles (atoms, molecules or ions) as there are atoms in exactly 12 g of carbon-12.

**Avogadro's number** $N_\text{A} = 6.022 \times 10^{23}$ (use $6 \times 10^{23}$ when the question says so).

- Number of particles = moles × $N_\text{A}$.
- Number of **atoms** = number of molecules × atoms in one molecule (atomicity, or atoms in the formula).`,
      [kt('Mole', 'The amount of substance containing as many particles as there are atoms in exactly 12 g of carbon-12.'), kt("Avogadro's number", 'The number of particles in one mole, 6.022 × 10²³.')],
      [fm(r`n = \frac{N}{N_\text{A}}`, 'Moles from number of particles'), fm(r`N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}`, "Avogadro's number")],
      table(['Sample', 'Moles', 'Particles'], [['12 g of carbon', '1', '6.022 × 10²³ atoms'], ['36 g of water', '2', '1.2044 × 10²⁴ molecules'], ['0.5 mol of oxygen gas', '0.5', '3.011 × 10²³ molecules (6.022 × 10²³ atoms)']], 'Table of three samples with their moles and numbers of particles'),
      [3],
    ),
    sec(
      '4. Gram atomic mass and gram molecular mass',
      `| Term | Meaning | Example |
|---|---|---|
| Atomic mass | Mass of one atom relative to one-twelfth of a carbon-12 atom | Na = 23 u |
| Gram atomic mass | Atomic mass in grams; the mass of 1 mol of atoms | 23 g of sodium |
| Molecular mass | Sum of the atomic masses in one molecule | H₂O = 18 u |
| Gram molecular mass (molar mass) | Molecular mass in grams; the mass of 1 mol of molecules | 18 g of water |

**Moles = mass ÷ molar mass.** Always show the molar mass working, for example CaCO₃: 40 + 12 + 3 × 16 = 100 g.`,
      [kt('Gram atomic mass', 'The atomic mass of an element expressed in grams; the mass of one mole of its atoms.'), kt('Gram molecular mass', 'The molecular mass of a substance expressed in grams; the mass of one mole of its molecules.')],
      [fm(r`n = \frac{m}{M}`, 'Moles from mass (m in g, M in g mol⁻¹)')],
      table(['Compound', 'Working', 'Molar mass / g'], [['H₂SO₄', '2 × 1 + 32 + 4 × 16', '98'], ['CaCO₃', '40 + 12 + 3 × 16', '100'], ['(NH₄)₂SO₄', '2 × 14 + 8 × 1 + 32 + 4 × 16', '132']], 'Table of molar mass working for three compounds'),
      [3],
    ),
    sec(
      '5. Molar volume at STP',
      `**Molar volume:** one mole of any gas occupies **22.4 dm³** (22 400 cm³) at **STP** (273 K and 1 atm, that is 760 mm of mercury).

- 22.4 dm³ of a gas at STP weighs its gram molecular mass.
- Moles of gas = volume at STP in dm³ ÷ 22.4. Convert cm³ to dm³ first (divide by 1000).
- Molar volume applies to **gases only**. (Its derivation is not examined.)`,
      [kt('Molar volume', 'The volume occupied by one mole of a gas: 22.4 dm³ at STP.'), kt('STP', 'Standard temperature and pressure: 273 K (0 °C) and 1 atm (760 mm of mercury).')],
      [fm(r`n = \frac{V\ (\text{dm}^3,\ \text{STP})}{22.4}`, 'Moles of a gas from its volume at STP')],
      table(['Gas', 'Mass', 'Moles', 'Volume at STP'], [['Oxygen', '3.2 g', '0.1', '2.24 dm³'], ['Carbon dioxide', '8.8 g', '0.2', '4.48 dm³'], ['Ammonia', '1.7 g', '0.1', '2.24 dm³']], 'Table converting the masses of three gases into moles and volumes at STP'),
      [4],
    ),
    sec(
      '6. Vapour density',
      `**Vapour density (VD):** the ratio of the mass of a certain volume of a gas to the mass of the same volume of hydrogen, at the same temperature and pressure.

- **Relative molecular mass = 2 × vapour density** (use the relation; its proof is not examined).
- Vapour density has **no unit** (a ratio of two masses).
- A gas with VD greater than about 14.4 (air) is heavier than air.

**Typical chain:** VD → M = 2 × VD → moles = mass ÷ M → volume = moles × 22.4 dm³.`,
      [kt('Vapour density', 'Mass of a volume of a gas divided by the mass of the same volume of hydrogen at the same temperature and pressure.')],
      [fm(r`M = 2 \times \text{VD}`, 'Relative molecular mass from vapour density')],
      table(['Gas', 'M', 'VD'], [['Ammonia', '17', '8.5'], ['Oxygen', '32', '16'], ['Sulphur dioxide', '64', '32'], ['Chlorine', '71', '35.5']], 'Table of four gases with relative molecular mass and vapour density'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Counting liquid water as a gas volume in Gay-Lussac problems at room temperature.
- Forgetting to add the excess gas to the gas left at the end.
- Writing "equal numbers of atoms" in Avogadro's law; it is molecules.
- Dividing a volume in cm³ by 22.4 instead of 22 400.
- Giving the number of molecules when the question asks for atoms.
- Writing a unit for vapour density.

**How marks are usually awarded**
- Calculations: the molar mass working, the number of moles, then the final answer with its unit (one mark each in a 3-mark item).
- Laws (1 mark each): include "same temperature and pressure".
- Volume problems: the volume ratio from the balanced equation earns the first mark.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, "Gay-Lussac's law of combining volumes?", 'Reacting gases and gaseous products are in a simple whole-number ratio by volume (same temperature and pressure).', 'definition', 1),
    fc(2, 'Volume ratio in N₂ + 3H₂ → 2NH₃?', '1 : 3 : 2.', 'formula', 1),
    fc(3, 'Is liquid water counted in gas volume problems at room temperature?', 'No: it condenses and takes up almost no volume.', 'fact', 1),
    fc(4, 'Volume of oxygen to burn 10 cm³ of methane (CH₄ + 2O₂ → CO₂ + 2H₂O)?', '20 cm³.', 'example', 1),
    fc(5, 'First step when two gases are mixed in a volume problem?', 'Find the gas that is used up first; the other is in excess.', 'concept', 1),
    fc(6, "Avogadro's law?", 'Equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules.', 'definition', 2),
    fc(7, 'Why do equal volumes of H₂ and CO₂ have different masses?', 'Same number of molecules, but each CO₂ molecule is heavier.', 'concept', 2),
    fc(8, 'Atomicity?', 'The number of atoms in one molecule of an element.', 'definition', 2),
    fc(9, 'Atomicity of hydrogen, oxygen, nitrogen and chlorine?', '2 (diatomic).', 'fact', 2),
    fc(10, 'Atomicity of ozone? Of argon?', 'Ozone 3; argon 1.', 'fact', 2),
    fc(11, 'What does 1 vol H₂ + 1 vol Cl₂ → 2 vol HCl show?', 'Each hydrogen (and chlorine) molecule must contain two atoms.', 'concept', 2),
    fc(12, 'Mole?', 'Amount of substance with as many particles as atoms in exactly 12 g of carbon-12.', 'definition', 3),
    fc(13, "Avogadro's number?", '6.022 × 10²³ particles per mole.', 'fact', 3),
    fc(14, 'Gram atomic mass of sodium (Na = 23)?', '23 g: the mass of 1 mol of sodium atoms.', 'example', 3),
    fc(15, 'Gram molecular mass?', 'The molecular mass in grams: the mass of 1 mol of molecules.', 'definition', 3),
    fc(16, 'Moles from mass?', 'Moles = mass ÷ molar mass.', 'formula', 3),
    fc(17, 'Molecules in 0.5 mol of water?', '0.5 × 6.022 × 10²³ = 3.011 × 10²³.', 'example', 3),
    fc(18, 'Atoms in one molecule of CO₂?', 'Three (one C, two O).', 'fact', 3),
    fc(19, 'Molar mass of H₂SO₄ (H = 1, S = 32, O = 16)?', '98 g mol⁻¹.', 'example', 3),
    fc(20, 'Molar volume at STP?', '22.4 dm³ for one mole of any gas.', 'fact', 4),
    fc(21, 'STP values?', '273 K (0 °C) and 1 atm (760 mm of mercury).', 'fact', 4),
    fc(22, 'Moles of gas from volume at STP?', 'Volume in dm³ ÷ 22.4.', 'formula', 4),
    fc(23, 'Volume of 0.5 mol of oxygen at STP?', '11.2 dm³.', 'example', 4),
    fc(24, 'Does 1 mol of water occupy 22.4 dm³ at STP?', 'No: water is not a gas at 273 K; molar volume is for gases only.', 'concept', 4),
    fc(25, 'Mass of 22.4 dm³ of carbon dioxide at STP?', '44 g (its molar mass).', 'example', 4),
    fc(26, 'Vapour density?', 'Mass of a volume of a gas ÷ mass of the same volume of hydrogen (same temperature and pressure).', 'definition', 5),
    fc(27, 'Relation between M and VD?', 'Relative molecular mass = 2 × vapour density.', 'formula', 5),
    fc(28, 'Unit of vapour density?', 'None: it is a ratio.', 'fact', 5),
    fc(29, 'VD of ammonia (NH₃ = 17)?', '8.5.', 'example', 5),
    fc(30, 'Exam tip: volume in cm³', 'Convert to dm³ (divide by 1000) before dividing by 22.4.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
