// ISC 11 ch01 — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Some Basic Concepts: Measurement, Laws of Chemical Combination and Atomic Theory — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Scope of chemistry and classification of matter',
      r`Chemistry studies the composition, structure, properties and changes of matter. It contributes to **medicine** (drugs, diagnostics), **agriculture** (fertilisers, soil testing), **industry** (metals, polymers, glass, soaps, fuels) and the **environment** (monitoring pollutants, green processes).

Matter is a **pure substance** (fixed composition) or a **mixture** (variable composition, separable by physical methods). A pure substance is an **element** (one kind of atom) or a **compound** (different atoms combined in a fixed ratio by mass, separable only by chemical methods). A mixture is **homogeneous** (uniform, such as brass) or **heterogeneous** (visibly different parts, such as oil and water).`,
      [kt('Element', 'A pure substance made of one kind of atom that cannot be split chemically.'), kt('Compound', 'A pure substance of two or more elements combined in a fixed mass ratio.'), kt('Homogeneous mixture', 'A mixture with uniform composition throughout.'), kt('Heterogeneous mixture', 'A mixture whose parts can be seen and separated physically.')],
      [],
      flow('TB', [['m', 'Matter'], ['p', 'Pure substance'], ['x', 'Mixture'], ['e', 'Element'], ['c', 'Compound'], ['ho', 'Homogeneous'], ['he', 'Heterogeneous']], [['m', 'p'], ['m', 'x'], ['p', 'e'], ['p', 'c'], ['x', 'ho'], ['x', 'he']], 'Flow chart classifying matter'),
      [1],
    ),
    sec(
      '2. Precision, accuracy and significant figures',
      r`**Precision** is the closeness of repeated measurements to one another; **accuracy** is the closeness of a measurement, or of the mean, to the true value. **Percentage error** $= \dfrac{|\text{measured} - \text{true}|}{\text{true}} \times 100$.

**Significant figures:** non-zero digits and zeros between them count; leading zeros do not; trailing zeros count after a decimal point; all coefficient digits count in scientific notation. **Add or subtract:** keep the fewest decimal places. **Multiply or divide:** keep the fewest significant figures. Exact numbers have unlimited significant figures. Round only at the end.`,
      [kt('Significant figures', 'The digits of a measurement that are known reliably, plus one estimated digit.'), kt('Precision', 'Agreement of repeated readings with one another.'), kt('Accuracy', 'Agreement of a reading or mean with the true value.'), kt('Systematic error', 'An error that shifts all readings the same way, for example a zero error.')],
      [fm(r`\text{percentage error} = \dfrac{|x_\text{measured} - x_\text{true}|}{x_\text{true}} \times 100`, 'Percentage error')],
      V.precAcc,
      [2],
    ),
    sec(
      '3. SI units and dimensional analysis',
      r`The SI base units are metre, kilogram, second, ampere, kelvin, mole and candela. Derived units: newton $= \text{kg m s}^{-2}$, pascal $= \text{kg m}^{-1}\text{ s}^{-2}$, joule $= \text{kg m}^{2}\text{ s}^{-2}$. The litre ($1\ \text{dm}^3 = 10^{-3}\ \text{m}^3$) is not an SI unit.

**Dimensional analysis** converts units with **conversion factors equal to 1**: for example $1\ \text{atm} = 101325\ \text{Pa}$, $1\ \text{L} = 10^{-3}\ \text{m}^3$, $1\ \text{nm} = 10^{-9}\ \text{m}$. Volume units step by $10^{3}$ (m³, dm³, cm³). It also checks that equations are homogeneous and gives units of constants, for example $R = PV/(nT)$ in J K⁻¹ mol⁻¹, and shows that $1\ \text{L atm} = 101.3\ \text{J}$.`,
      [kt('Conversion factor', 'A ratio of equal quantities in different units, equal to 1.'), kt('Derived unit', 'A unit built from base units, such as the pascal or joule.'), kt('Dimensional analysis', 'Using units to convert quantities, check equations and find units of constants.')],
      [fm(r`1\ \text{atm} = 101325\ \text{Pa}`, 'Pressure'), fm(r`1\ \text{L atm} \approx 101.3\ \text{J}`, 'Energy')],
      V.volLadder,
      [3],
    ),
    sec(
      '4. Conservation of mass, definite and multiple proportions',
      r`- **Conservation of mass** (Lavoisier): total mass of reactants equals total mass of products; count every substance, including gases.
- **Definite (constant) proportions** (Proust): a pure compound always has the same elements in the same mass ratio. Test: two samples give the same mass fraction.
- **Multiple proportions** (Dalton): when two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a simple whole-number ratio. Test: fix one element at 1.00 g and compare the other (for example $\ce{Cu2O}$ and $\ce{CuO}$ give 1 : 2).`,
      [kt('Law of conservation of mass', 'Mass is neither created nor destroyed in a chemical reaction.'), kt('Law of definite proportions', 'A compound has fixed composition by mass.'), kt('Law of multiple proportions', 'Masses of one element combining with a fixed mass of another are in a simple whole-number ratio.')],
      [],
      V.massBars,
      [4],
    ),
    sec(
      '5. Reciprocal proportions and Gay-Lussac’s law',
      r`**Reciprocal proportions** (Richter): if A and B each combine with a fixed mass of C, then A and B combine with each other in the same ratio or a simple multiple of it. Example: through hydrogen S : O $= 16 : 8 = 2 : 1$; in $\ce{SO2}$ the ratio is 1 : 1, half of this.

**Gay-Lussac’s law:** gases react, and form gaseous products, in simple whole-number volume ratios when measured at the same temperature and pressure. The volume ratio equals the coefficient ratio of the balanced equation: $\ce{N2 + 3H2 -> 2NH3}$ is $1 : 3 : 2$. **Avogadro’s law:** equal volumes of gases at the same temperature and pressure contain equal numbers of molecules; it explains why hydrogen and chlorine are diatomic. Liquid water is taken to have negligible volume.`,
      [kt('Law of reciprocal proportions', 'Two elements combine with each other in the ratio, or a simple multiple of the ratio, in which they combine with a third element.'), kt('Gay-Lussac’s law', 'Gaseous volumes react in simple whole-number ratios at constant temperature and pressure.'), kt('Avogadro’s law', 'Equal volumes of gases at the same temperature and pressure hold equal numbers of molecules.')],
      [],
      V.recip,
      [4],
      [V.combVols],
    ),
    sec(
      '6. Dalton’s atomic theory and its limitations',
      r`**Postulates:** matter consists of indivisible atoms; atoms of an element are identical in mass and properties; atoms of different elements differ; compounds form by combination of atoms in small whole-number ratios; atoms are rearranged, not created or destroyed, in reactions.

**Explains:** conservation of mass (no atoms lost), definite proportions (fixed atom ratio of fixed-mass atoms), multiple proportions (same atoms in different whole-number ratios) and reciprocal proportions.

**Limitations:** atoms are divisible (electron, proton, neutron); atoms of an element can differ in mass (isotopes); it treated gas particles as atoms and so could not explain Gay-Lussac’s law (molecules, Avogadro); it cannot explain allotropes (diamond and graphite).`,
      [kt('Atom', 'The smallest particle of an element that takes part in chemical change.'), kt('Molecule', 'A group of atoms bonded together that can exist independently.'), kt('Isotopes', 'Atoms of the same element with different masses.')],
      [],
      table(['Postulate', 'Law explained'], [['Atoms are not created or destroyed', 'Conservation of mass'], ['Fixed whole-number combination', 'Definite proportions'], ['More than one whole-number combination', 'Multiple proportions']], 'Table linking Dalton’s postulates to laws'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Rounding in the middle of a calculation or quoting too many significant figures.
- Dividing percentage error by the measured value instead of the true value.
- Taking 1 L as 10⁻⁶ m³, or using a factor of 10 instead of 10³ between cubic units.
- Verifying a law without stating the ratio and the law's name.
- Treating liquid water as a gas when finding the volume after combustion.
- Calling reciprocal proportions multiple proportions.

**How marks are usually awarded**
- 1-mark items: a definition, a single conversion or a significant-figure count.
- Verification of a law (2–3 marks): per-gram masses (1), simple ratio (1), law named and stated (1).
- Gas-volume problems: volume ratio from the balanced equation (1), each volume (1), total or leftover gas (1).
- Limitations of Dalton's theory: each limitation with its evidence (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name two ways chemistry helps agriculture.', 'Fertilisers (nitrogen, phosphorus, potassium) and soil testing or plant-protection chemicals.', 'concept', 1),
    fc(2, 'Difference between an element and a compound?', 'An element has one kind of atom; a compound has different atoms combined in a fixed mass ratio.', 'definition', 1),
    fc(3, 'Is brass homogeneous or heterogeneous?', 'Homogeneous: its composition is uniform throughout.', 'example', 1),
    fc(4, 'How can a mixture be separated, but a compound not?', 'A mixture by physical methods; a compound only by chemical methods.', 'concept', 1),
    fc(5, 'Precision versus accuracy?', 'Precision: readings agree with each other. Accuracy: readings (or their mean) agree with the true value.', 'definition', 2),
    fc(6, 'Formula for percentage error?', r`$\dfrac{|\text{measured} - \text{true}|}{\text{true}} \times 100$`, 'formula', 2),
    fc(7, 'Significant figures rule for addition?', 'Keep the fewest decimal places.', 'concept', 2),
    fc(8, 'Significant figures rule for multiplication?', 'Keep the fewest significant figures.', 'concept', 2),
    fc(9, 'How many significant figures in 0.00205?', 'Three (leading zeros do not count; the zero between 2 and 5 does).', 'example', 2),
    fc(10, 'How many significant figures in 3.040?', 'Four (the trailing zero after a decimal point counts).', 'example', 2),
    fc(11, 'Write 0.000306 in scientific notation.', r`$3.06 \times 10^{-4}$`, 'example', 2),
    fc(12, 'Which common unit of volume is not an SI unit?', 'The litre (1 dm³ = 10⁻³ m³).', 'fact', 2),
    fc(13, 'SI base-unit form of the pascal?', r`$\text{kg m}^{-1}\text{ s}^{-2}$`, 'fact', 2),
    fc(14, 'SI base-unit form of the joule?', r`$\text{kg m}^{2}\text{ s}^{-2}$`, 'fact', 2),
    fc(15, 'What is a conversion factor?', 'A ratio of equal quantities in different units; it equals 1 and does not change the quantity.', 'definition', 3),
    fc(16, '1 atm in pascal?', '101325 Pa, which is 1.013 × 10⁵ Pa.', 'fact', 3),
    fc(17, 'How many cm³ in 1 m³?', r`$10^{6}$ (and $10^{3}$ dm³).`, 'fact', 3),
    fc(18, 'Convert 3.6 L to m³.', r`$3.6 \times 10^{-3}\ \text{m}^3$`, 'example', 3),
    fc(19, 'Why is PV an energy?', r`Pa m³ = (N m⁻²) m³ = N m = J.`, 'concept', 3),
    fc(20, 'Value of 1 L atm in joules?', 'About 101.3 J.', 'fact', 3),
    fc(21, 'Law of conservation of mass (Lavoisier)?', 'Total mass of reactants equals total mass of products in a chemical reaction.', 'definition', 4),
    fc(22, 'Law of definite proportions (Proust)?', 'A pure compound always has the same elements in the same mass ratio.', 'definition', 4),
    fc(23, 'Law of multiple proportions (Dalton)?', 'Masses of one element combining with a fixed mass of another are in a simple whole-number ratio.', 'definition', 4),
    fc(24, 'Law of reciprocal proportions (Richter)?', 'Two elements combine with each other in the same ratio, or a simple multiple, as they do with a third element.', 'definition', 4),
    fc(25, 'Gay-Lussac’s law?', 'Gases react in simple whole-number volume ratios at the same temperature and pressure.', 'definition', 4),
    fc(26, 'Avogadro’s law?', 'Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules.', 'definition', 4),
    fc(27, 'Volume ratio in N₂ + 3H₂ → 2NH₃?', '1 : 3 : 2.', 'example', 4),
    fc(28, 'Name two postulates of Dalton’s theory.', 'Matter is made of indivisible atoms; atoms combine in simple whole-number ratios; atoms are not created or destroyed in reactions.', 'concept', 5),
    fc(29, 'Which postulate explains conservation of mass?', 'Atoms are neither created nor destroyed in a chemical reaction; they are rearranged.', 'concept', 5),
    fc(30, 'Two limitations of Dalton’s theory?', 'Atoms are divisible (subatomic particles); atoms of an element can differ in mass (isotopes).', 'concept', 5),
    fc(31, 'Why could Dalton not explain Gay-Lussac’s law?', 'He took gas particles to be single atoms; Avogadro’s diatomic molecules were needed.', 'concept', 5),
  ],
};
