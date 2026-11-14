// ISC 11 Chemistry ch14 Ionic Equilibrium: Acids, Bases and pH: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { KA, PHOS, alphaApprox, hApprox, pH, f2, f3, f4, ex } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const a1 = alphaApprox(KA.formic, 0.05), h1 = hApprox(KA.formic, 0.05);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Ionic Equilibrium: Acids, Bases and pH — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Strong, weak and non-electrolytes; degree of ionisation',
      r`An **electrolyte** conducts electricity in solution because it gives **ions**. A **strong electrolyte** (HCl, HNO₃, NaOH, KNO₃) is practically completely ionised; a **weak electrolyte** (CH₃COOH, NH₄OH, H₂CO₃) is only partly ionised, so ions and molecules are in equilibrium; a **non-electrolyte** (glucose, urea, sucrose) gives no ions.

The **degree of ionisation** α is the fraction of the dissolved electrolyte present as ions: α = amount ionised ÷ amount dissolved. For a weak acid HA of concentration C, $[\text{H}^+] = C\alpha$. α depends on the nature of the electrolyte and solvent, rises with temperature and **increases on dilution**.`,
      [kt('Electrolyte', 'A substance whose aqueous solution (or melt) conducts electricity through ions.'), kt('Degree of ionisation', 'The fraction of the dissolved electrolyte that is present as ions at equilibrium.')],
      [fm(r`\alpha = \frac{\text{amount ionised}}{\text{amount dissolved}}`, 'Degree of ionisation')],
      V.species,
      [1],
    ),
    sec(
      '2. Arrhenius, Brønsted–Lowry and Lewis concepts; conjugate pairs',
      r`**Arrhenius:** an acid gives H⁺ (H₃O⁺) in water, a base gives OH⁻; limited to aqueous solutions and to bases with OH groups. **Brønsted–Lowry:** an acid is a **proton donor**, a base a **proton acceptor**. **Lewis:** an acid is an **electron-pair acceptor** (H⁺, BF₃, AlCl₃, Cu²⁺), a base an **electron-pair donor** (NH₃, H₂O, OH⁻, CN⁻).

A **conjugate pair** differs by one proton: acid ⇌ base + H⁺. The stronger the acid, the weaker its conjugate base. **Water** is **amphiprotic**. Example: in $\ce{H2S + NH3 <=> HS- + NH4+}$ the pairs are H₂S / HS⁻ and NH₄⁺ / NH₃.`,
      [kt('Conjugate pair', 'An acid and the base formed when it loses one proton.'), kt('Amphiprotic', 'Able to act both as a Brønsted acid and as a Brønsted base, like water.'), kt('Lewis acid', 'An electron-pair acceptor, such as BF₃.'), kt('Coordinate bond', 'A covalent bond in which both electrons come from one atom.')],
      [],
      table(['Concept', 'Acid', 'Base'], [['Arrhenius', 'H⁺ in water', 'OH⁻ in water'], ['Brønsted–Lowry', 'proton donor', 'proton acceptor'], ['Lewis', 'electron-pair acceptor', 'electron-pair donor']], 'Table of the three concepts of acids and bases'),
      [2],
      [V.lewis],
    ),
    sec(
      "3. Ostwald's dilution law (derivation)",
      r`For $\text{HA} \rightleftharpoons \text{H}^+ + \text{A}^-$ with concentration C and degree of ionisation α, the equilibrium amounts are C(1 − α), Cα and Cα. So

$K_a = \dfrac{[\text{H}^+][\text{A}^-]}{[\text{HA}]} = \dfrac{C\alpha \cdot C\alpha}{C(1-\alpha)} = \dfrac{C\alpha^2}{1-\alpha}$.

For a weak electrolyte α ≪ 1, so $K_a = C\alpha^2$, $\alpha = \sqrt{K_a/C}$ and $[\text{H}^+] = C\alpha = \sqrt{K_aC}$. A weak base gives $\alpha = \sqrt{K_b/C}$ and $[\text{OH}^-] = \sqrt{K_bC}$. Hence α increases as C decreases (on dilution), while Ka depends only on temperature. Example: 0.050 mol L⁻¹ methanoic acid ($K_a = 1.8 \times 10^{-4}$) has α ≈ ${f3(a1)} and $[\text{H}^+] \approx$ ${ex(h1, 2)} mol L⁻¹.`,
      [kt("Ostwald's dilution law", 'The degree of ionisation of a weak electrolyte increases on dilution; K = Cα² / (1 − α), and α = √(K/C) for a very weak electrolyte.')],
      [fm(r`K_a = \frac{C\alpha^2}{1-\alpha}`, 'Ostwald law'), fm(r`\alpha = \sqrt{K_a/C}`, 'Weak acid, small α'), fm(r`[\text{H}^+] = \sqrt{K_aC}`, 'Hydrogen ion concentration of a weak acid')],
      V.ostwald,
      [3],
    ),
    sec(
      '4. Acid strength, Ka and Kb; polybasic acids',
      r`A larger Ka (or Kb) means a stronger acid (or base), a larger α at the same concentration and a smaller pKa = −log Ka. At 298 K: Ka(HNO₂) = 4.5 × 10⁻⁴, Ka(HCOOH) = 1.8 × 10⁻⁴, Ka(C₆H₅COOH) = 6.5 × 10⁻⁵, Ka(CH₃COOH) = 1.8 × 10⁻⁵, Ka(HCN) = 4.9 × 10⁻¹⁰; Kb(NH₃) = 1.8 × 10⁻⁵.

A **polybasic acid** ionises in stages, each with its own constant. H₃PO₄ ⇌ H⁺ + H₂PO₄⁻ (Ka1 = 7.5 × 10⁻³); H₂PO₄⁻ ⇌ H⁺ + HPO₄²⁻ (Ka2 = 6.2 × 10⁻⁸); HPO₄²⁻ ⇌ H⁺ + PO₄³⁻ (Ka3 = 4.8 × 10⁻¹³). Ka1 ≫ Ka2 ≫ Ka3, because a proton leaves a negative ion less easily and the H⁺ already present holds back later stages; almost all the H⁺ comes from the first stage.`,
      [kt('pKa', 'The negative logarithm of Ka; a smaller pKa means a stronger acid.'), kt('Polybasic acid', 'An acid that can donate more than one proton per molecule, in stages.')],
      [fm(r`pK_a = -\log K_a`, 'pKa')],
      table(['Stage', 'Equation', 'Ka'], [['1', 'H₃PO₄ ⇌ H⁺ + H₂PO₄⁻', ex(PHOS.k1, 2)], ['2', 'H₂PO₄⁻ ⇌ H⁺ + HPO₄²⁻', ex(PHOS.k2, 2)], ['3', 'HPO₄²⁻ ⇌ H⁺ + PO₄³⁻', ex(PHOS.k3, 2)]], 'Table of the stages of ionisation of phosphoric acid'),
      [3],
      [V.phosph],
    ),
    sec(
      '5. Ionic product of water; pH, pOH and pKw',
      r`Water ionises slightly: $\ce{2H2O <=> H3O+ + OH-}$ and $K_w = [\text{H}^+][\text{OH}^-]$ = 1.0 × 10⁻¹⁴ mol² L⁻² at 298 K. Ionisation is endothermic, so Kw increases with temperature (about 5.5 × 10⁻¹⁴ at 323 K). **pH = −log [H⁺], pOH = −log [OH⁻], pKw = −log Kw** and **pH + pOH = pKw** (14.00 at 298 K). A neutral solution has [H⁺] = [OH⁻], so its pH = ½ pKw (6.63 at 323 K).

**Calculations.** Strong acid: [H⁺] = C (×2 for H₂SO₄ if both protons are counted). Strong base: [OH⁻] = C (×2 for Ca(OH)₂, Ba(OH)₂). Weak acid or base: [H⁺] = √(KaC) or [OH⁻] = √(KbC). Mixture of a strong acid and a strong base: excess moles ÷ total volume. Example: 0.050 mol L⁻¹ strong acid, pH = ${f2(pH(0.05))}; 0.050 mol L⁻¹ ethanoic acid, pH = ${f2(pH(hApprox(KA.acetic, 0.05)))}.`,
      [kt('Ionic product of water', 'Kw = [H⁺][OH⁻], the product of the ion concentrations in water or any dilute aqueous solution at a given temperature.'), kt('pH', 'The negative logarithm (base 10) of the hydrogen ion concentration in mol L⁻¹.')],
      [fm(r`K_w = [\text{H}^+][\text{OH}^-]`, 'Ionic product of water'), fm(r`\text{pH} = -\log[\text{H}^+]`, 'pH'), fm(r`\text{pH} + \text{pOH} = \text{p}K_w`, 'pH, pOH and pKw')],
      table(['Solution', '[H⁺] / mol L⁻¹', 'pH', 'Nature at 298 K'], [['strongly acidic', '1 × 10⁻¹', '1', 'acid'], ['neutral', '1 × 10⁻⁷', '7', 'neutral'], ['strongly basic', '1 × 10⁻¹³', '13', 'basic']], 'Table of three values on the pH scale'),
      [4],
    ),
    sec(
      '6. Acid–base indicators and their choice in titrations',
      r`An **indicator** is a weak organic acid or base whose ionised and un-ionised forms have different colours; the colour changes over a narrow pH range (about two units) and only a few drops are used. Ranges: methyl orange 3.1–4.4 (red to yellow), methyl red 4.4–6.2 (red to yellow), bromothymol blue 6.0–7.6 (yellow to blue), phenolphthalein 8.3–10.0 (colourless to pink).

**Choice:** the indicator range must lie on the steep part of the titration curve. Strong acid–strong base (steep rise about pH 4 to 10): any of the four. Weak acid–strong base (equivalence about pH 8.7 for 0.1 mol L⁻¹ ethanoic acid): phenolphthalein. Strong acid–weak base (equivalence about pH 5.3): methyl orange or methyl red. Weak acid–weak base: no sharp rise, so no ordinary indicator.`,
      [kt('Indicator', 'A weak organic acid or base whose two forms have different colours, used to detect the end point of a titration.'), kt('Equivalence point', 'The stage at which the acid and base have been mixed in exactly equivalent amounts.')],
      [],
      V.titr,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying α decreases on dilution, or that Ka changes with concentration (it depends only on temperature).
- Writing the derivation without the equilibrium amounts C(1 − α), Cα, Cα, or forgetting the approximation α ≪ 1.
- Using pH + pOH = 14 at a temperature other than 298 K, or forgetting that pure water is neutral at pH ½ pKw.
- Not doubling [OH⁻] for Ca(OH)₂ and Ba(OH)₂, or dividing by one volume instead of the total volume in mixtures.
- Naming phenolphthalein for a strong acid titrated with a weak base.

**How marks are usually awarded**
- Derivation of Ostwald's law: equilibrium amounts (1), Ka expression (1), approximation and α = √(Ka/C) (1).
- pH calculations: [H⁺] or [OH⁻] (1), logarithm step (1), final pH with two decimals.
- Conjugate pairs and Lewis acids or bases: each pair or species with its reason.
- Indicator choice: pH at equivalence (1), range matched to the steep part (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
void f4;
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is an electrolyte?', 'A substance whose solution conducts electricity because it contains ions.', 'definition', 1),
    fc(2, 'Give two strong and two weak electrolytes.', 'Strong: HCl, NaOH. Weak: CH₃COOH, NH₄OH.', 'example', 1),
    fc(3, 'Why does a glucose solution not conduct?', 'Glucose is a non-electrolyte: it stays as neutral molecules and gives no ions.', 'concept', 1),
    fc(4, 'Define degree of ionisation.', 'The fraction of the dissolved electrolyte present as ions at equilibrium.', 'definition', 1),
    fc(5, 'How does α change on dilution?', 'It increases.', 'fact', 1),
    fc(6, 'Arrhenius definitions of acid and base?', 'Acid: gives H⁺ in water. Base: gives OH⁻ in water.', 'definition', 2),
    fc(7, 'Brønsted–Lowry definitions?', 'Acid: proton donor. Base: proton acceptor.', 'definition', 2),
    fc(8, 'Lewis definitions?', 'Acid: electron-pair acceptor. Base: electron-pair donor.', 'definition', 2),
    fc(9, 'What is a conjugate acid–base pair?', 'Two species that differ by one proton, such as NH₄⁺ and NH₃.', 'definition', 2),
    fc(10, 'Conjugate base of H₂SO₄? Of HSO₄⁻?', 'HSO₄⁻; SO₄²⁻.', 'fact', 2),
    fc(11, 'Conjugate acid of NH₃? Of H₂O?', 'NH₄⁺; H₃O⁺.', 'fact', 2),
    fc(12, 'Why is water amphiprotic?', 'It can donate a proton (to NH₃) and accept one (from HCl).', 'concept', 2),
    fc(13, 'Why is BF₃ a Lewis acid?', 'Boron has an incomplete octet, so BF₃ accepts an electron pair (for example from NH₃).', 'concept', 2),
    fc(14, 'Two Lewis bases?', 'NH₃ and OH⁻ (or H₂O, Cl⁻, CN⁻): each has a lone pair to donate.', 'example', 2),
    fc(15, 'Limitation of the Arrhenius concept?', 'It applies only to aqueous solutions and needs OH⁻ from the base itself (NH₃ has no OH group).', 'concept', 2),
    fc(16, "Ostwald's dilution law for a weak acid?", r`$K_a = \dfrac{C\alpha^2}{1-\alpha}$, and $\alpha = \sqrt{K_a/C}$ for small α.`, 'formula', 3),
    fc(17, 'Equilibrium amounts for HA ⇌ H⁺ + A⁻ in the derivation?', 'C(1 − α) for HA, Cα for H⁺ and Cα for A⁻.', 'concept', 3),
    fc(18, '[H⁺] of a weak monobasic acid?', r`$[\text{H}^+] = C\alpha = \sqrt{K_aC}$`, 'formula', 3),
    fc(19, 'If C falls to C/4, how does α change?', 'It doubles, since α ∝ 1/√C.', 'fact', 3),
    fc(20, 'What does Ka depend on?', 'Temperature only.', 'fact', 3),
    fc(21, 'Larger Ka means what for pKa and strength?', 'Smaller pKa and a stronger acid.', 'concept', 3),
    fc(22, 'Write the first stage of ionisation of H₃PO₄ and its Ka.', 'H₃PO₄ ⇌ H⁺ + H₂PO₄⁻, Ka1 = 7.5 × 10⁻³.', 'fact', 3),
    fc(23, 'Why is Ka2 much smaller than Ka1?', 'A proton must leave a negative ion, which holds it more strongly; H⁺ from stage one also holds back stage two.', 'concept', 3),
    fc(24, 'State the ionic product of water at 298 K.', 'Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol² L⁻² at 298 K.', 'fact', 4),
    fc(25, 'Why does Kw increase with temperature?', 'The ionisation of water is endothermic.', 'concept', 4),
    fc(26, 'Relation between pH, pOH and pKw?', r`$\text{pH} + \text{pOH} = \text{p}K_w$ (14.00 at 298 K).`, 'formula', 4),
    fc(27, 'pH of pure water at a temperature where Kw = 5.5 × 10⁻¹⁴?', '½ pKw = 6.63: still neutral because [H⁺] = [OH⁻].', 'example', 4),
    fc(28, 'How many times does [H⁺] change per pH unit?', 'By a factor of 10.', 'fact', 4),
    fc(29, 'What is an acid–base indicator?', 'A weak organic acid or base whose ionised and un-ionised forms differ in colour.', 'definition', 5),
    fc(30, 'Indicator for a weak acid titrated with a strong base?', 'Phenolphthalein (8.3–10.0); equivalence about pH 8.7 for 0.1 mol L⁻¹ ethanoic acid.', 'fact', 5),
    fc(31, 'Indicator for a strong acid titrated with a weak base?', 'Methyl orange (3.1–4.4) or methyl red (4.4–6.2); equivalence below pH 7.', 'fact', 5),
    fc(32, 'Why is no indicator suitable for a weak acid against a weak base?', 'The curve has no steep rise at the equivalence point.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
