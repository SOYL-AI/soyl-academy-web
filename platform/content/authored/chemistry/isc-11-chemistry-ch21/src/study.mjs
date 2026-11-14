// ch21 Alkanes — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Alkanes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Hydrocarbons, alkanes and their naming',
      `**Hydrocarbons** contain carbon and hydrogen only. **Open-chain (aliphatic)** hydrocarbons are saturated (**alkanes**) or unsaturated (alkenes, alkynes); **closed-chain (cyclic)** ones are alicyclic (cyclohexane) or aromatic (benzene). **Alkanes** have the general formula **CₙH₂ₙ₊₂**, only C–C and C–H σ bonds, sp³ carbon (bond angle about 109.5°, C–C 154 pm), and form a **homologous series** whose members differ by –CH₂– (14 u). **IUPAC naming:** longest continuous chain; lowest locants; alkyl groups in alphabetical order; di-, tri- for repeats. Example: (CH₃)₃CCH₂CH(CH₃)₂ is 2,2,4-trimethylpentane.`,
      [kt('Homologous series', 'A family of compounds with the same functional group and general formula in which successive members differ by a –CH₂– unit.'), kt('Alicyclic compound', 'A cyclic compound that is not aromatic, such as cyclohexane.')],
      [fm(r`\text{C}_n\text{H}_{2n+2}`, 'General formula of alkanes')],
      table(['n', 'Name', 'Formula', 'Boiling point (°C)'], [['1', 'methane', 'CH₄', '−161.5'], ['2', 'ethane', 'C₂H₆', '−88.6'], ['3', 'propane', 'C₃H₈', '−42.1'], ['4', 'butane', 'C₄H₁₀', '−0.5'], ['5', 'pentane', 'C₅H₁₂', '36.1'], ['6', 'hexane', 'C₆H₁₄', '68.7']], 'Table of the first six alkanes with formula and boiling point'),
      [1],
    ),
    sec(
      '2. Chain isomerism and occurrence',
      `Alkanes show **chain isomerism**. The numbers of isomers (including the straight-chain compound) for C₄ to C₈ are **2, 3, 5, 9 and 18**. **C₅H₁₂:** pentane, 2-methylbutane (isopentane) and 2,2-dimethylpropane (neopentane). **Occurrence:** natural gas and biogas (mainly **methane**, with some ethane, propane and butane) and **petroleum**, which is separated by fractional distillation into LPG, petrol, kerosene, diesel, lubricating oil, wax and bitumen.`,
      [kt('Chain isomerism', 'Isomerism due to different arrangements of the carbon skeleton.'), kt('Fractional distillation', 'Separation of petroleum into fractions of different boiling ranges.')],
      [],
      V.pentanes,
      [1],
    ),
    sec(
      '3. Conformations of ethane: Sawhorse and Newman projections',
      `**Conformations** are different arrangements of atoms obtained by rotation about a single bond. Ethane has two extremes: **staggered** (dihedral angle 60°; lowest energy) and **eclipsed** (0°; highest energy). A **Sawhorse** projection views the C–C bond obliquely; in a **Newman** projection we look along the bond: the front carbon is the centre, the rear carbon the circle. The eclipsed form is higher in energy by about **12.5 kJ mol⁻¹** (the **torsional barrier**) because the C–H bonding pairs on adjacent carbons repel most (**torsional strain**). The barrier is small, so rotation is nearly free at room temperature and the conformations cannot be isolated. **Methane** has no C–C bond and therefore only one arrangement. Energy curve: minima at 60°, 180° and 300°; maxima at 0°, 120° and 240°.`,
      [kt('Conformation', 'A spatial arrangement of atoms in a molecule produced by rotation about a single bond.'), kt('Torsional strain', 'The repulsion between bonding pairs on adjacent atoms that are eclipsed.'), kt('Dihedral angle', 'The angle between a bond on the front carbon and a bond on the rear carbon, seen along the C–C bond.')],
      [fm(r`E(\theta) = \dfrac{V}{2}\left(1 + \cos 3\theta\right),\ V = 12.5\ \text{kJ mol}^{-1}`, 'Torsional energy of ethane (illustrative model of the curve)')],
      V.conform,
      [2],
      [V.energy],
    ),
    sec(
      '4. Preparation of alkanes',
      `**Decarboxylation:** $\\ce{RCOONa + NaOH ->[CaO][\\Delta] R-H + Na2CO3}$, one carbon fewer (CH₃COONa gives methane). **Kolbe electrolysis** of aqueous RCOONa: anode $2\\text{RCOO}^- \\rightarrow \\text{R–R} + 2\\text{CO}_2 + 2e^-$; cathode gives H₂ and OH⁻; sodium ethanoate gives ethane. **Wurtz:** 2RX + 2Na (dry ether) → R–R + 2NaX; a mixture of two halides gives **three alkanes**, so it is unsuitable for unsymmetrical (odd-carbon) alkanes. **Corey–House:** R₂CuLi + R′X → R–R′ (clean, unsymmetrical). **Aldehydes:** Zn–Hg/conc. HCl reduces R–CHO to R–CH₃. **Grignard reagents:** RMgX + H₂O → R–H + Mg(OH)X.`,
      [kt('Decarboxylation', 'Removal of CO₂ from a carboxylate, here by heating with soda lime.'), kt('Wurtz reaction', 'Coupling of two alkyl groups from alkyl halides with sodium in dry ether.'), kt('Corey–House synthesis', 'Coupling of R₂CuLi with an alkyl halide to give R–R′.')],
      [],
      V.kolbe,
      [3],
    ),
    sec(
      '5. Physical properties and their trends',
      `Alkanes are **non-polar**, held by weak **London dispersion forces**. **State:** C₁–C₄ gases, C₅–C₁₇ liquids, higher members solids. **Boiling point** rises with chain length (more surface, stronger forces; the rise per –CH₂– shrinks from about 73 °C to about 23 °C) and **falls with branching** (compact molecule, smaller surface): pentane 309 K > 2-methylbutane 301 K > 2,2-dimethylpropane 283 K. **Density** is below 1 g mL⁻¹ (liquid alkanes float on water). **Solubility:** insoluble in water; soluble in non-polar solvents.`,
      [kt('London (dispersion) forces', 'Weak attractions between temporary dipoles in non-polar molecules, increasing with molecular surface.')],
      [],
      V.bplot,
      [4],
    ),
    sec(
      '6. Combustion and free-radical halogenation',
      `**Combustion:** CₙH₂ₙ₊₂ + (3n + 1)/2 O₂ → n CO₂ + (n + 1) H₂O, strongly exothermic; in limited air, CO and soot form. **Halogenation** (light, or 520–670 K): a **free-radical chain** substitution. **Initiation:** Cl–Cl → 2Cl• (homolytic). **Propagation:** CH₄ + Cl• → •CH₃ + HCl; •CH₃ + Cl₂ → CH₃Cl + Cl•. **Termination:** Cl• + Cl•, •CH₃ + Cl•, •CH₃ + •CH₃. Further substitution gives CH₂Cl₂, CHCl₃ and CCl₄ (excess methane favours CH₃Cl). **Reactivity of halogens:** F₂ > Cl₂ > Br₂ > I₂; **of hydrogens:** 3° > 2° > 1° (chlorination rates about 5.0 : 3.8 : 1.0). **Product ratio** = (number of H × relative rate).`,
      [kt('Free radical', 'An atom or group with an unpaired electron, written with a dot, formed by homolytic fission.'), kt('Chain reaction', 'A reaction in which a reactive species is regenerated, so the steps repeat.')],
      [fm(r`\%\ \text{product} = \dfrac{N_{\text{H}} \times k_{\text{rel}}}{\sum N_{\text{H}} \times k_{\text{rel}}} \times 100`, 'Share of a monochloro product')],
      V.chlor,
      [5],
    ),
    sec(
      '7. Other reactions and uses',
      `**Catalytic oxidation:** 2CH₄ + O₂ → 2CH₃OH (Cu, 523 K, 100 atm); CH₄ + O₂ → HCHO + H₂O (Mo₂O₃); 2C₂H₆ + 3O₂ → 2CH₃COOH + 2H₂O (manganese ethanoate). **Cyclisation and aromatisation:** hexane → cyclohexane + H₂ → benzene + 3H₂ over Cr₂O₃/Al₂O₃ at 773 K and 10–20 atm; heptane → methylbenzene + 4H₂. **Isomerisation:** n-butane → 2-methylpropane (anhydrous AlCl₃/HCl, 573 K). **Pyrolysis (cracking):** large alkanes → smaller alkanes + alkenes (C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆); CH₄ → C + 2H₂. **Uses:** fuels (CNG, LPG, petrol, kerosene, diesel), lubricants, wax, bitumen and chemical feedstock.`,
      [kt('Aromatisation', 'Conversion of an alkane into an aromatic hydrocarbon with loss of hydrogen.'), kt('Pyrolysis (cracking)', 'Breaking of large molecules into smaller ones by strong heating, usually in the absence of air.')],
      [],
      V.arom,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Choosing a chain that is not the longest when naming; forgetting that alphabetical order beats numerical order of the prefixes.
- Calling the eclipsed conformation more stable, or writing the dihedral angles the wrong way round (staggered 60°, eclipsed 0°).
- Writing that Kolbe electrolysis gives an alkane with one carbon fewer than the acid (that is decarboxylation).
- Saying that branching raises the boiling point.
- Drawing chlorination as an ionic reaction or leaving out the termination step.

**How marks are usually awarded**
- Preparation questions: balanced equation with reagent and conditions (1 mark each), plus the name of the product.
- Mechanisms: one mark per stage (initiation, propagation, termination), with the radicals shown.
- Reasoning questions (boiling point, stability): state the trend, then give the reason in terms of surface area and dispersion forces or of torsional strain.
- Calculations: balanced equation, moles, answer with the right unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formula of alkanes?', 'CₙH₂ₙ₊₂.', 'fact', 1),
    fc(2, 'Hybridisation of carbon in alkanes and the bond angle?', 'sp³; about 109.5°.', 'fact', 1),
    fc(3, 'What is a homologous series?', 'A family with the same functional group and general formula; members differ by –CH₂– (14 u).', 'definition', 1),
    fc(4, 'Classify hydrocarbons.', 'Open-chain (saturated or unsaturated) and closed-chain (alicyclic or aromatic).', 'concept', 1),
    fc(5, 'Rules for naming an alkane?', 'Longest chain; lowest locants; alphabetical order of branches; di-, tri- for repeats.', 'concept', 1),
    fc(6, 'Number of chain isomers of C₄, C₅, C₆, C₇, C₈ alkanes?', '2, 3, 5, 9, 18.', 'fact', 1),
    fc(7, 'Chain isomers of pentane?', 'Pentane, 2-methylbutane and 2,2-dimethylpropane.', 'example', 1),
    fc(8, 'Main constituent of natural gas and biogas?', 'Methane.', 'fact', 1),
    fc(9, 'What is a conformation?', 'An arrangement of atoms obtained by rotation about a single bond.', 'definition', 2),
    fc(10, 'Two extreme conformations of ethane?', 'Staggered (60°, most stable) and eclipsed (0°, least stable).', 'fact', 2),
    fc(11, 'Torsional barrier of ethane?', 'About 12.5 kJ mol⁻¹.', 'fact', 2),
    fc(12, 'Why is the staggered form more stable?', 'Bonding pairs on adjacent carbons are farthest apart, so torsional strain is least.', 'concept', 2),
    fc(13, 'What does a Newman projection show?', 'View along the C–C bond: front carbon at the centre, rear carbon as the circle.', 'concept', 2),
    fc(14, 'Why does methane have no conformations?', 'It has no C–C bond to rotate about.', 'concept', 2),
    fc(15, 'Decarboxylation of sodium ethanoate?', 'CH₃COONa + NaOH → CH₄ + Na₂CO₃ (soda lime, heat); one carbon fewer.', 'example', 3),
    fc(16, 'Kolbe electrolysis: product at the anode?', 'R–R (twice R), with CO₂; ethane from sodium ethanoate.', 'concept', 3),
    fc(17, 'Wurtz reaction?', '2RX + 2Na (dry ether) → R–R + 2NaX.', 'concept', 3),
    fc(18, 'Why is the Wurtz reaction unsuitable for odd-carbon alkanes?', 'Two different halides give a mixture of three alkanes that is hard to separate.', 'concept', 3),
    fc(19, 'Corey–House synthesis?', 'R₂CuLi + R′X → R–R′ + RCu + LiX; clean synthesis of unsymmetrical alkanes.', 'concept', 3),
    fc(20, 'Reduction of an aldehyde to an alkane?', 'Zn–Hg and conc. HCl: R–CHO to R–CH₃.', 'concept', 3),
    fc(21, 'Grignard reagent + water?', 'RMgX + H₂O → R–H + Mg(OH)X.', 'example', 3),
    fc(22, 'State and physical trends of alkanes?', 'C₁–C₄ gases, C₅–C₁₇ liquids, then solids; density below 1 g mL⁻¹; insoluble in water.', 'fact', 4),
    fc(23, 'Why does the boiling point rise with chain length?', 'Larger surface, stronger London dispersion forces.', 'concept', 4),
    fc(24, 'Effect of branching on boiling point?', 'Lowers it: compact molecule, smaller surface, weaker forces.', 'concept', 4),
    fc(25, 'Boiling points of the three C₅H₁₂ isomers?', 'Pentane 309 K, 2-methylbutane 301 K, 2,2-dimethylpropane 283 K.', 'fact', 4),
    fc(26, 'Combustion of an alkane CₙH₂ₙ₊₂?', 'Gives n CO₂ and (n + 1) H₂O; needs (3n + 1)/2 O₂.', 'concept', 5),
    fc(27, 'Conditions for halogenation of alkanes?', 'Halogen with ultraviolet or diffused sunlight, or 520–670 K.', 'fact', 5),
    fc(28, 'Three stages of the free-radical mechanism?', 'Initiation, propagation, termination.', 'concept', 5),
    fc(29, 'Order of reactivity of C–H and of halogens?', '3° > 2° > 1°; F₂ > Cl₂ > Br₂ > I₂.', 'concept', 5),
    fc(30, 'Catalytic oxidation of methane to methanol?', '2CH₄ + O₂ → 2CH₃OH (Cu tube, 523 K, 100 atm).', 'example', 5),
    fc(31, 'Aromatisation of hexane?', 'C₆H₁₄ → C₆H₆ + 4H₂ (Cr₂O₃/Al₂O₃, 773 K, 10–20 atm).', 'example', 5),
    fc(32, 'Isomerisation and pyrolysis?', 'n-Butane → 2-methylpropane (AlCl₃/HCl, 573 K); large alkanes crack into smaller alkanes and alkenes.', 'example', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
