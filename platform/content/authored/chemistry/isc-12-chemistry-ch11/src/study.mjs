// ISC 12 Chemistry ch11 Bonding in Coordination Compounds — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Bonding in Coordination Compounds — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Valence bond theory',
      `The metal ion provides empty orbitals (number = coordination number) that **hybridise**; each ligand donates a lone pair into one hybrid orbital. Strong-field ligands (CN⁻, CO; NH₃ with Co³⁺) can pair d electrons; weak-field ligands (F⁻, Cl⁻, H₂O) cannot.

| CN | Hybridisation | Shape | Example |
|---|---|---|---|
| 2 | sp | linear | [Ag(NH₃)₂]⁺ |
| 4 | sp³ | tetrahedral | [NiCl₄]²⁻, [Ni(CO)₄], [Zn(NH₃)₄]²⁺ |
| 4 | dsp² | square planar | [Ni(CN)₄]²⁻, [Ni(dmg)₂] |
| 6 | d²sp³ (inner, low spin) | octahedral | [Fe(CN)₆]⁴⁻, [Co(NH₃)₆]³⁺, [Cr(NH₃)₆]³⁺ |
| 6 | sp³d² (outer, high spin) | octahedral | [Fe(H₂O)₆]²⁺, [CoF₆]³⁻, [FeF₆]³⁻ |

Magnetism: μ = √(n(n+2)) BM. **Limitations:** no explanation of colour or ligand strength; cannot predict tetrahedral vs square planar; not quantitative.`,
      [kt('Inner orbital complex', 'An octahedral complex using (n−1)d orbitals in d²sp³ hybridisation; usually low spin.'), kt('Outer orbital complex', 'An octahedral complex using nd orbitals in sp³d² hybridisation; high spin.')],
      [fm(r`\mu = \sqrt{n(n+2)}\ \text{BM}`, 'Spin-only magnetic moment')],
      table(['Complex', 'Unpaired e⁻', 'μ / BM'], [['[Fe(CN)₆]⁴⁻', '0', '0'], ['[Fe(H₂O)₆]²⁺', '4', '4.90'], ['[Cr(NH₃)₆]³⁺', '3', '3.87'], ['[MnBr₄]²⁻', '5', '5.92']], 'Table of magnetic data'),
      [1],
    ),
    sec(
      '2. Crystal field theory: splitting, magnetism and colour',
      r`Ligands are point charges/dipoles; bonding purely electrostatic. **Octahedral:** $e_g$ ($d_{x^2-y^2}$, $d_{z^2}$) raised by $0.6\Delta_o$; $t_{2g}$ ($d_{xy}$, $d_{yz}$, $d_{xz}$) lowered by $0.4\Delta_o$. **Tetrahedral:** $e$ below $t_2$; $\Delta_t \approx \tfrac{4}{9}\Delta_o$ → always high spin.

**Spectrochemical series:** I⁻ < Br⁻ < SCN⁻ < Cl⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < NH₃ < en < CN⁻ < CO. $\Delta_o < P$ → high spin; $\Delta_o > P$ → low spin (d⁴–d⁷).

**Colour:** d–d transition absorbs light of energy $\Delta_o$; complementary colour seen; $\Delta_o = N_A hc/\lambda$. d⁰ and d¹⁰ ions colourless. **Limitation:** cannot explain why neutral CO is the strongest ligand (covalent/π bonding ignored).`,
      [kt('Crystal field splitting energy', 'The energy gap Δo between the t₂g and e_g sets in an octahedral field.'), kt('Pairing energy', 'The energy needed to put two electrons into the same orbital.'), kt('Spectrochemical series', 'The order of ligands by the size of the splitting they produce.')],
      [fm(r`\Delta_o = \dfrac{N_A h c}{\lambda}`, 'Splitting from absorption wavelength')],
      V.split,
      [2],
    ),
    sec(
      '3. Stability of complexes',
      r`Stepwise: $\ce{M + L <=> ML}$ ($K_1$), $\ce{ML + L <=> ML2}$ ($K_2$), … Overall $\beta_n = K_1K_2\cdots K_n$; **larger β → more stable**; instability constant $= 1/\beta$.

Stability increases with higher charge/smaller size of metal ion, **chelation** (log β: [Ni(en)₃]²⁺ 18.3 vs [Ni(NH₃)₆]²⁺ 8.6), basicity and π-acceptor strength of ligand (cyanide complexes very stable). A ligand forming a more stable complex displaces one forming a less stable complex: [Ag(NH₃)₂]⁺ (log β 7.2) → [Ag(S₂O₃)₂]³⁻ (13.5) → [Ag(CN)₂]⁻ (21.1).`,
      [kt('Overall stability constant', 'β = K₁K₂…Kn, the equilibrium constant for forming the complex from the metal ion and all its ligands.'), kt('Instability constant', 'The reciprocal of the stability constant.')],
      [fm(r`\beta_n = K_1 K_2 \cdots K_n`, 'Overall stability constant')],
      table(['Complex', 'log β'], [['[Ag(NH₃)₂]⁺', '7.2'], ['[Ni(NH₃)₆]²⁺', '8.6'], ['[Ni(en)₃]²⁺', '18.3'], ['[Ag(CN)₂]⁻', '21.1']], 'Table of stability constants'),
      [3],
    ),
    sec(
      '4. Importance of coordination compounds',
      `**Qualitative analysis:** Ni²⁺ + dimethylglyoxime → red [Ni(dmg)₂]; Cu²⁺ + excess NH₃ → deep blue [Cu(NH₃)₄]²⁺; Fe³⁺ + SCN⁻ → blood-red [Fe(SCN)(H₂O)₅]²⁺; Fe³⁺ + K₄[Fe(CN)₆] → Prussian blue; EDTA titration for hardness of water.

**Metallurgy:** Ag and Au leached as [Ag(CN)₂]⁻, [Au(CN)₂]⁻ and displaced by Zn; Mond process: Ni + 4CO → Ni(CO)₄ (330–350 K), decomposed at 450–470 K.

**Biology and medicine:** haemoglobin (Fe, O₂ transport), chlorophyll (Mg, photosynthesis), vitamin B12 (Co); cisplatin (anticancer), EDTA for lead poisoning; hypo dissolves AgBr as [Ag(S₂O₃)₂]³⁻ in photography.`,
      [kt('Mond process', 'Purification of nickel through formation and decomposition of volatile Ni(CO)₄.')],
      [],
      table(['Use', 'Complex'], [['Ni²⁺ test', '[Ni(dmg)₂]'], ['Gold extraction', '[Au(CN)₂]⁻'], ['Ni purification', 'Ni(CO)₄'], ['Oxygen transport', 'Haemoglobin (Fe)']], 'Table of uses of complexes'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the atom's configuration instead of the ion's.
- Calling [Fe(H₂O)₆]²⁺ inner orbital (water is weak field: sp³d²).
- Putting t₂g above e_g in an octahedral diagram.
- Adding stepwise constants instead of multiplying them.

**How marks are usually awarded**
- VBT (3 marks): d count, hybridisation and shape, magnetism.
- CFT (2–3 marks): labelled splitting, configuration, high/low spin reason.
- Stability (2 marks): β expression and comparison.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Hybridisation for square planar?', 'dsp².', 'fact', 1),
    fc(2, 'Hybridisation for inner orbital octahedral?', 'd²sp³.', 'fact', 1),
    fc(3, 'Hybridisation for outer orbital octahedral?', 'sp³d².', 'fact', 1),
    fc(4, 'Shape and hybridisation of [Ni(CO)₄]?', 'Tetrahedral, sp³.', 'fact', 1),
    fc(5, 'Shape of [Ni(CN)₄]²⁻?', 'Square planar (dsp²), diamagnetic.', 'fact', 1),
    fc(6, 'Magnetism of [Fe(CN)₆]⁴⁻?', 'Diamagnetic (d²sp³).', 'fact', 1),
    fc(7, 'Unpaired electrons in [Fe(H₂O)₆]²⁺?', '4 (sp³d²).', 'fact', 1),
    fc(8, 'Spin-only formula?', 'μ = √(n(n+2)) BM.', 'formula', 1),
    fc(9, 'Main limitation of VBT?', 'Cannot explain colour.', 'concept', 1),
    fc(10, 'Why is [Zn(NH₃)₄]²⁺ colourless?', 'Zn²⁺ is d¹⁰: no d–d transition.', 'concept', 1),
    fc(11, 'e_g orbitals?', 'd(x²−y²) and d(z²).', 'fact', 2),
    fc(12, 't₂g energy relative to barycentre?', '−0.4Δo.', 'fact', 2),
    fc(13, 'Δt compared with Δo?', 'Δt ≈ (4/9)Δo.', 'formula', 2),
    fc(14, 'Low spin condition?', 'Δo > P.', 'concept', 2),
    fc(15, 'Weakest and strongest common ligands?', 'I⁻ weakest; CO strongest.', 'fact', 2),
    fc(16, 'Configuration of [CoF₆]³⁻?', 't₂g⁴e_g², 4 unpaired.', 'fact', 2),
    fc(17, 'Configuration of [Mn(CN)₆]⁴⁻?', 't₂g⁵, 1 unpaired.', 'fact', 2),
    fc(18, 'Origin of colour (CFT)?', 'd–d transition; complementary colour seen.', 'concept', 2),
    fc(19, 'Δo from wavelength?', 'Δo = N_A hc/λ.', 'formula', 2),
    fc(20, 'Why are tetrahedral complexes high spin?', 'Δt is smaller than the pairing energy.', 'concept', 2),
    fc(21, 'Limitation of CFT?', 'Treats bonding as ionic; cannot explain why CO is strongest.', 'concept', 2),
    fc(22, 'Overall stability constant?', 'β = K₁K₂…Kn.', 'formula', 3),
    fc(23, 'Instability constant?', '1/β.', 'definition', 3),
    fc(24, 'Larger β means?', 'More stable complex.', 'concept', 3),
    fc(25, 'Why does AgCl dissolve in NH₃?', '[Ag(NH₃)₂]⁺ forms, lowering [Ag⁺].', 'concept', 3),
    fc(26, 'Test for Ni²⁺?', 'Red precipitate with dimethylglyoxime.', 'fact', 4),
    fc(27, 'Test for Fe³⁺ with SCN⁻?', 'Blood-red [Fe(SCN)(H₂O)₅]²⁺.', 'fact', 4),
    fc(28, 'Complex in gold extraction?', '[Au(CN)₂]⁻.', 'fact', 4),
    fc(29, 'Mond process?', 'Ni + 4CO → Ni(CO)₄, then decomposed to pure Ni.', 'fact', 4),
    fc(30, 'Metals in haemoglobin, chlorophyll, B12?', 'Fe, Mg, Co.', 'fact', 4),
    fc(31, 'Exam tip: VBT answers', 'Give d count, hybridisation, shape, inner/outer and magnetism.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
