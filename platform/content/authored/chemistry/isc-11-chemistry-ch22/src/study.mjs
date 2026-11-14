// ch22 Alkenes — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Alkenes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Nomenclature and the structure of the double bond',
      `**Alkenes** are unsaturated hydrocarbons with one C=C bond; general formula **CₙH₂ₙ**. **Naming:** longest chain containing the double bond; change **-ane to -ene**; number to give the double bond the **lowest locant** (but-1-ene, pent-2-ene, 2-methylbut-2-ene). **Structure of ethene:** each carbon is **sp² hybridised**; three sp² orbitals form σ bonds in one plane (H–C–H 117°, H–C=C 121.5°); the unhybridised **p orbitals** overlap sideways to form the **π bond** above and below the plane. **C=C 134 pm** (C–C 154 pm); C₂H₄ has 5 σ bonds and 1 π bond. The π bond is weaker and exposed, so alkenes are reactive, and it prevents rotation about C=C.`,
      [kt('Alkene', 'An unsaturated hydrocarbon containing one carbon–carbon double bond.'), kt('π bond', 'A bond formed by the sideways overlap of p orbitals; its electron density lies above and below the bond axis.')],
      [fm(r`\text{C}_n\text{H}_{2n}`, 'General formula of alkenes')],
      V.sigmapi,
      [1],
    ),
    sec(
      '2. Isomerism in alkenes',
      `**Chain isomerism** (but-1-ene and 2-methylpropene), **position isomerism** (but-1-ene and but-2-ene) and **geometrical isomerism** (cis and trans), which needs restricted rotation and **two different groups on each doubly bonded carbon**. C₄H₈ has **3 alkenes** (4 stereoisomers); C₅H₁₀ has **5 alkenes** (6 stereoisomers). Alkenes are **functional isomers of cycloalkanes** (C₄H₈ and cyclobutane).`,
      [kt('Geometrical isomerism', 'Stereoisomerism due to restricted rotation about a double bond: cis (like groups on the same side) and trans (opposite sides).')],
      [],
      V.isomers,
      [1],
    ),
    sec(
      '3. Preparation of alkenes',
      `**Dehydration of alcohols:** conc. H₂SO₄ at **443 K** (or Al₂O₃ at 623 K): CH₃CH₂OH → CH₂=CH₂ + H₂O; ease 3° > 2° > 1°; at 413 K with excess alcohol an ether forms. **Dehydrohalogenation:** alcoholic KOH, heat. **Saytzeff's rule:** the **more substituted** (more stable) alkene is the major product (2-bromobutane gives mainly but-2-ene). **Vicinal dihalides:** CH₂BrCH₂Br + Zn → CH₂=CH₂ + ZnBr₂. **Kolbe's method:** electrolysis of aqueous potassium succinate gives ethene at the anode (with CO₂), H₂ and KOH at the cathode. **From alkynes:** H₂ with **Lindlar's catalyst** (Pd/CaCO₃, poisoned) gives the **cis** alkene; **Na in liquid NH₃** gives the **trans** alkene.`,
      [kt("Saytzeff's rule", 'In an elimination, the more substituted (more stable) alkene is the major product.'), kt("Lindlar's catalyst", 'Palladium on calcium carbonate, partly poisoned, used to stop the reduction of an alkyne at the cis alkene.')],
      [],
      V.saytzeff,
      [2],
    ),
    sec(
      '4. Physical properties',
      `Alkenes are non-polar or weakly polar: **insoluble in water**, soluble in organic solvents, **less dense than water**. C₂–C₄ are gases, C₅ onwards liquids; boiling points are close to those of the alkanes with the same number of carbons (pent-1-ene 30.0 °C, pentane 36.1 °C) and rise with chain length. **cis versus trans:** the cis isomer is slightly polar (net dipole), so it has the **higher boiling point** (cis-but-2-ene 3.7 °C, trans 0.9 °C; cis-1,2-dichloroethene 1.9 D, 60.3 °C, trans 0 D, 47.5 °C); the symmetrical trans isomer has the **higher melting point** (−105.5 °C against −138.9 °C).`,
      [kt('Dipole moment', 'A measure of the polarity of a molecule: the vector sum of its bond dipoles.')],
      [],
      table(['Compound', 'bp (°C)', 'mp (°C)', 'Dipole moment (D)'], [['cis-But-2-ene', '3.7', '−138.9', 'About 0.3'], ['trans-But-2-ene', '0.9', '−105.5', '0'], ['cis-1,2-Dichloroethene', '60.3', '−80.5', '1.9'], ['trans-1,2-Dichloroethene', '47.5', '−49.8', '0']], 'Table of boiling point, melting point and dipole moment of cis and trans isomers'),
      [3],
    ),
    sec(
      '5. Addition reactions and the mechanism',
      `**H₂** (Ni, 473 K; Pt or Pd at room temperature) gives the alkane. **Br₂ in CCl₄** gives a vicinal dibromide and the red-brown colour is lost (test). **HX:** Markownikoff's rule — *the negative part adds to the carbon with fewer hydrogens*; propene + HBr gives 2-bromopropane. **H₂SO₄** gives an alkyl hydrogensulphate, hydrolysed by water to the alcohol; **water** with an acid catalyst also gives the alcohol (propene gives propan-2-ol). **Electrophilic addition:** step 1 (slow) the π electrons attack H⁺, forming a carbocation; step 2 (fast) the nucleophile attacks. Carbocation stability: 3° > 2° > 1° > methyl (+I effect, hyperconjugation), which explains Markownikoff's rule.`,
      [kt("Markownikoff's rule", 'When HX adds to an unsymmetrical alkene, the negative part goes to the carbon with fewer hydrogens.'), kt('Electrophile', 'A species that accepts an electron pair; it attacks regions of high electron density such as C=C.'), kt('Hyperconjugation', 'The delocalisation of electrons from adjacent C–H bonds into an empty p orbital, stabilising a carbocation.')],
      [],
      V.mech,
      [4],
    ),
    sec(
      '6. Peroxide effect',
      `In the presence of a peroxide (e.g. benzoyl peroxide), **HBr only** adds to propene to give **1-bromopropane** (anti-Markownikoff). The mechanism is a **free-radical chain**: ROOR → 2RO•; RO• + HBr → ROH + Br•; Br• adds to C-1 to give the more stable **secondary radical**; this takes H from HBr to give the product and Br•. HCl does not show the effect (H–Cl 431 kJ mol⁻¹ is too strong) nor does HI (H–I 299 kJ mol⁻¹; I• does not add readily). H–Br is 366 kJ mol⁻¹.`,
      [kt('Peroxide effect', 'The reversal of orientation in the addition of HBr to an unsymmetrical alkene in the presence of a peroxide, by a free-radical mechanism.')],
      [],
      V.perox,
      [4],
    ),
    sec(
      '7. Oxidation, ozonolysis, polymerisation and uses',
      `**Combustion:** C₂H₄ + 3O₂ → 2CO₂ + 2H₂O (luminous, smoky flame). **Cold dilute alkaline KMnO₄ (Baeyer's test):** adds two OH groups to give a **diol** (ethane-1,2-diol from ethene); purple colour lost and brown MnO₂ forms. **Hot concentrated KMnO₄** cleaves C=C: =CH₂ → CO₂ + H₂O; =CHR → RCOOH; =CR₂ → ketone. **Ozonolysis** (O₃, then Zn/H₂O): the C=C is cut and each carbon becomes C=O: =CH₂ → methanal, =CHR → aldehyde, =CR₂ → ketone; to find an alkene, join the carbonyl carbons by C=C. **Polymerisation:** n CH₂=CH₂ → (–CH₂–CH₂–)ₙ, polythene (high pressure, trace O₂: low density; Ziegler–Natta: high density); propene gives polypropene. **Uses:** polymers, ethanol, antifreeze, PVC, ripening of fruits.`,
      [kt("Baeyer's reagent", 'Cold, dilute, alkaline potassium permanganate; decolourised by alkenes with the formation of a diol.'), kt('Ozonolysis', 'Cleavage of a C=C bond with ozone, followed by reduction, to give carbonyl compounds.'), kt('Polymerisation', 'The joining of many monomer molecules into a long chain.')],
      [],
      V.ozono,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Numbering the chain from the end nearer a substituent instead of giving the double bond the lowest locant.
- Applying Markownikoff's rule to the peroxide reaction (it is reversed), or claiming the peroxide effect for HCl and HI.
- Saying that Lindlar's catalyst gives the trans alkene (it gives cis; Na/NH₃ gives trans).
- Writing that cold alkaline KMnO₄ cleaves the double bond (it gives a diol; hot KMnO₄ cleaves).
- Forgetting that the cis isomer has the higher boiling point but the trans isomer the higher melting point.

**How marks are usually awarded**
- Mechanisms: one mark for each step with the correct intermediate (carbocation or radical), one for the product, and one for the reason (stability).
- Preparations: equation with the correct reagent and conditions.
- Ozonolysis: products from cutting at C=C; structure from joining the carbonyl carbons.
- Calculations: balanced equation, moles, answer with the unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formula of alkenes?', 'CₙH₂ₙ (one C=C bond).', 'fact', 1),
    fc(2, 'How are alkenes named?', 'Longest chain containing C=C; -ane becomes -ene; lowest locant for the double bond.', 'concept', 1),
    fc(3, 'Hybridisation and shape at each carbon of ethene?', 'sp²; planar, bond angles about 120°.', 'fact', 1),
    fc(4, 'Bonds in the C=C bond?', 'One σ bond (sp²–sp² head-on) and one π bond (p–p sideways).', 'concept', 1),
    fc(5, 'Length of C=C in ethene?', 'About 134 pm (C–C is 154 pm).', 'fact', 1),
    fc(6, 'Number of σ and π bonds in ethene?', '5 σ and 1 π.', 'fact', 1),
    fc(7, 'Condition for cis–trans isomerism in alkenes?', 'Two different groups on each doubly bonded carbon (restricted rotation).', 'concept', 1),
    fc(8, 'Number of alkenes of formula C₄H₈ and C₅H₁₀?', '3 and 5 structural isomers.', 'fact', 1),
    fc(9, 'Dehydration of ethanol: reagent and temperature?', 'Conc. H₂SO₄ at 443 K gives ethene (413 K with excess ethanol gives ether).', 'example', 2),
    fc(10, 'Ease of dehydration of alcohols?', '3° > 2° > 1° (carbocation stability).', 'concept', 2),
    fc(11, 'Dehydrohalogenation reagent?', 'Alcoholic KOH, heat.', 'fact', 2),
    fc(12, "State Saytzeff's rule.", 'The more substituted (more stable) alkene is the major product of an elimination.', 'definition', 2),
    fc(13, 'Vicinal dihalide to alkene?', 'Zinc dust: CH₂BrCH₂Br + Zn → CH₂=CH₂ + ZnBr₂.', 'example', 2),
    fc(14, "Kolbe's method for ethene?", 'Electrolysis of aqueous potassium succinate: ethene and CO₂ at the anode.', 'example', 2),
    fc(15, 'Alkyne to cis alkene; to trans alkene?', 'H₂ with Lindlar catalyst; Na in liquid NH₃.', 'concept', 2),
    fc(16, 'Which isomer has the higher boiling point, cis or trans?', 'cis (net dipole moment); trans has the higher melting point (symmetry).', 'concept', 3),
    fc(17, 'Dipole moment of cis- and trans-1,2-dichloroethene?', 'About 1.9 D and zero.', 'fact', 3),
    fc(18, 'State and solubility of alkenes?', 'C₂–C₄ gases, then liquids; insoluble in water, less dense than water.', 'fact', 3),
    fc(19, 'Hydrogenation of alkenes?', 'H₂ with Ni (473 K) or Pt/Pd gives the alkane.', 'concept', 4),
    fc(20, 'Test for a C=C bond with bromine?', 'Br₂ in CCl₄ is decolourised, forming a vicinal dibromide.', 'concept', 4),
    fc(21, "State Markownikoff's rule.", 'In HX addition, the negative part goes to the carbon with fewer hydrogens.', 'definition', 4),
    fc(22, 'Propene + HBr (no peroxide)?', '2-Bromopropane (via the secondary carbocation).', 'example', 4),
    fc(23, 'Type of mechanism for HX addition?', 'Electrophilic addition: π electrons attack H⁺, then X⁻ attacks the carbocation.', 'concept', 4),
    fc(24, 'Order of carbocation stability?', '3° > 2° > 1° > methyl (+I effect and hyperconjugation).', 'concept', 4),
    fc(25, 'Peroxide effect: product and mechanism?', 'HBr adds to propene to give 1-bromopropane; free-radical chain.', 'concept', 4),
    fc(26, 'Why is the peroxide effect limited to HBr?', 'H–Cl is too strong; I• is too unreactive; H–Br suits both steps.', 'concept', 4),
    fc(27, 'Alkene + H₂SO₄, then water?', 'Alkyl hydrogensulphate, then the alcohol (propene gives propan-2-ol).', 'concept', 4),
    fc(28, "Baeyer's test result?", 'Cold dilute alkaline KMnO₄: purple disappears, brown precipitate; diol formed.', 'concept', 5),
    fc(29, 'Hot concentrated KMnO₄ with an alkene?', 'Cleaves C=C: =CH₂ gives CO₂, =CHR gives RCOOH, =CR₂ gives a ketone.', 'concept', 5),
    fc(30, 'Ozonolysis products?', 'The C=C is cut and each carbon becomes C=O: aldehydes or ketones (Zn, H₂O work-up).', 'concept', 5),
    fc(31, 'Polymerisation of ethene?', 'n CH₂=CH₂ → (–CH₂–CH₂–)ₙ, polythene.', 'example', 5),
    fc(32, 'Two forms of polythene and how they are made?', 'Low density: high pressure, trace O₂; high density: Ziegler–Natta catalyst.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
