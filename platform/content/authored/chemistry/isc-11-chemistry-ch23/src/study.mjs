// ch23 Alkynes — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Alkynes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Nomenclature, isomerism and the triple bond',
      `**Alkynes** are unsaturated hydrocarbons with one C≡C bond; general formula **CₙH₂ₙ₋₂**. **Naming:** longest chain containing the triple bond; change **-ane to -yne**; the triple bond gets the **lowest locant** (but-1-yne, pent-2-yne, 4-methylhex-2-yne); with a double bond too, the name ends **-en-yne**. **Isomerism:** position and chain isomerism only (C₄H₆: 2 alkynes; C₅H₈: 3); **no cis–trans** isomerism because the triple-bonded carbons carry one group each on a straight line. **Structure of ethyne:** each carbon is **sp hybridised** (two sp orbitals, 50% s); the molecule is **linear (180°)**; the bond is **one σ and two π** (two perpendicular π clouds); **C≡C 120 pm**, C–H 106 pm; ethyne has 3 σ and 2 π bonds. Bond enthalpies (kJ mol⁻¹): C–C 347, C=C 611, C≡C 837, so the second π bond (226) is weaker than the first (264).`,
      [kt('Alkyne', 'An unsaturated hydrocarbon containing one carbon–carbon triple bond.'), kt('Terminal alkyne', 'An alkyne with the triple bond at the end of the chain, so that one triple-bonded carbon carries a hydrogen (≡C–H).'), kt('sp hybridisation', 'Mixing of one s and one p orbital to give two orbitals at 180°, each with 50% s character.')],
      [fm(r`\text{C}_n\text{H}_{2n-2}`, 'General formula of alkynes')],
      V.triple,
      [1],
    ),
    sec(
      '2. Physical properties',
      `Alkynes are colourless, non-polar or very weakly polar, **insoluble in water**, soluble in organic solvents; ethyne is **very soluble in propanone** (cylinders hold it dissolved in propanone on a porous filler). C₂–C₄ are gases (ethyne sublimes at −84 °C); higher members are liquids. **Boiling points are slightly higher than those of the alkene and alkane with the same carbon number** (but-1-yne 8.1 °C, but-1-ene −6.3 °C, butane −0.5 °C; pent-1-yne 40.2 °C, pentane 36.1 °C), because the linear molecules pack closely and the π electrons are easily polarised. The boiling point rises with chain length; a terminal alkyne boils lower than the internal isomer (but-1-yne 8.1 °C, but-2-yne 27.0 °C).`,
      [kt('Sublimation', 'Change of a solid directly into a gas; ethyne at 1 atm turns from solid to gas at −84 °C.')],
      [],
      table(['Carbons', 'Alkane bp (°C)', 'Alkene bp (°C)', 'Alkyne bp (°C)'], [['4', 'Butane −0.5', 'But-1-ene −6.3', 'But-1-yne 8.1'], ['5', 'Pentane 36.1', 'Pent-1-ene 30.0', 'Pent-1-yne 40.2'], ['6', 'Hexane 68.7', 'Hex-1-ene 63.5', 'Hex-1-yne 71.3']], 'Table comparing boiling points of alkane, alkene and alkyne'),
      [2],
    ),
    sec(
      '3. Preparation',
      `**Calcium carbide:** CaCO₃ → CaO + CO₂; CaO + 3C → CaC₂ + CO (electric furnace, about 2273 K); **CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂** (traces of H₂S, PH₃, NH₃ are removed by acidified CuSO₄ solution). **Natural gas:** 2CH₄ → C₂H₂ + 3H₂ (electric arc, about 1773 K, rapid quenching), or partial oxidation 6CH₄ + O₂ → 2C₂H₂ + 2CO + 10H₂. **Dehydrohalogenation:** a vicinal (X on adjacent carbons) or geminal (both X on one carbon) dihalide loses 2 HX with alcoholic KOH (the second step often needs NaNH₂): CH₂BrCH₂Br + 2KOH → HC≡CH + 2KBr + 2H₂O. **Kolbe's method:** electrolysis of aqueous potassium maleate or fumarate gives ethyne and CO₂ at the anode, H₂ and KOH at the cathode.`,
      [kt('Vicinal dihalide', 'A compound with a halogen atom on each of two adjacent carbons.'), kt('Geminal dihalide', 'A compound with both halogen atoms on the same carbon.')],
      [],
      V.carbide,
      [2],
    ),
    sec(
      '4. Acidic character and acetylides',
      `The C–H of a terminal alkyne uses an **sp orbital (50% s)**; the orbital is close to the nucleus, so the carbon is relatively electronegative, the proton is released more easily and **HC≡C⁻ is stabilised**. Approximate pKa: ethyne 25, ethene 44, ethane 50, so the order of acidity is **ethyne > ethene > ethane** (the order of s character). Ethyne is weaker than water and alcohols. **Acetylides:** 2HC≡CH + 2Na → 2HC≡CNa + H₂; HC≡CH + NaNH₂ → HC≡CNa + NH₃; with **ammoniacal silver nitrate** a **white** precipitate of silver acetylide; with **ammoniacal cuprous chloride** a **red** precipitate of copper acetylide. Only **terminal** alkynes react; but-2-yne does not. Dry heavy-metal acetylides explode; dilute HNO₃ regenerates the alkyne.`,
      [kt('Acetylide', 'A salt formed by replacing the acidic hydrogen of a terminal alkyne by a metal, e.g. HC≡CNa or AgC≡CAg.'), kt('s character', 'The percentage of s orbital in a hybrid orbital: sp 50%, sp² 33.3%, sp³ 25%.')],
      [],
      V.schar,
      [3],
    ),
    sec(
      '5. Addition reactions',
      `**H₂:** with Ni, Pt or Pd to the alkane (HC≡CH + 2H₂ → CH₃CH₃); with **Lindlar's catalyst** (Pd/CaCO₃, poisoned with Pb(OAc)₂/quinoline) the **cis alkene** (syn addition); with **Na in liquid NH₃** the **trans alkene** (anti addition). **Halogens** add twice (1,2-dihaloalkene then 1,1,2,2-tetrahaloalkane); bromine water is decolourised, more slowly than by an alkene. **HX** adds twice by **Markownikoff's rule**, giving a **geminal** dihalide (HC≡CH + HCl → CH₂=CHCl → CH₃CHCl₂; propyne + 2HBr → 2,2-dibromopropane); chloroethene is the monomer of PVC. **Water** (HgSO₄, dilute H₂SO₄, about 333 K): enol, then carbonyl by **tautomerism**; ethyne gives **ethanal**, propyne gives **propanone**, every other alkyne a ketone.`,
      [kt("Lindlar's catalyst", 'Palladium on calcium carbonate, poisoned with lead acetate and quinoline; it reduces an alkyne only as far as the cis alkene.'), kt('Enol', 'A compound with an OH group on a carbon that is doubly bonded to another carbon; it rearranges to the carbonyl form.'), kt('Tautomerism', 'The rapid shift of a hydrogen atom and a double bond that interconverts isomers such as an enol and a carbonyl compound.')],
      [],
      V.reduce,
      [4],
      [V.hydration],
    ),
    sec(
      '6. Oxidation, ozonolysis, polymerisation and uses',
      `**Combustion:** 2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O; sooty flame in air (92.3% carbon), very hot **oxy-acetylene flame (about 3000 °C)** in oxygen, used for welding. **Hot KMnO₄** cleaves C≡C to carboxylic acids (R–C≡C–R gives 2RCOOH; a terminal alkyne gives RCOOH and CO₂); cold dilute KMnO₄ is also decolourised. **Ozonolysis** gives 1,2-dicarbonyl compounds (ethyne gives glyoxal, OHC–CHO). **Polymerisation:** 3C₂H₂ → C₆H₆ through a **red-hot iron tube at 873 K** (propyne gives 1,3,5-trimethylbenzene); linear: vinylacetylene (Cu₂Cl₂, NH₄Cl) and **polyacetylene**. **Uses:** oxy-acetylene welding; ethanal and ethanoic acid; chloroethene (PVC); neoprene; tetrachloroethane solvent.`,
      [kt('Oxy-acetylene flame', 'The flame of ethyne burning in pure oxygen, about 3000 °C, used to weld and cut metals.'), kt('Cyclic polymerisation', 'The joining of three ethyne molecules into a ring, giving benzene.')],
      [],
      V.poly,
      [4],
    ),
    sec(
      '7. Distinguishing alkanes, alkenes and alkynes',
      `**Ammoniacal AgNO₃** (white precipitate) or **ammoniacal Cu₂Cl₂** (red precipitate): **only terminal alkynes**. **Bromine water** (or bromine in CCl₄) and **Baeyer's reagent** (cold dilute alkaline KMnO₄): decolourised by **alkenes and alkynes**, not by alkanes. Scheme: ethane, ethene and ethyne → ammoniacal AgNO₃: precipitate = ethyne; the others → bromine water: decolourised = ethene, no change = ethane. But-1-yne and but-2-yne are separated by ammoniacal AgNO₃ (precipitate with but-1-yne only).`,
      [kt("Baeyer's reagent", 'Cold, dilute, alkaline potassium permanganate; decolourised by alkenes and alkynes.')],
      [],
      table(['Test', 'Ethane', 'Ethene', 'Ethyne'], [['Bromine water', 'No change', 'Decolourised', 'Decolourised'], ["Baeyer's reagent", 'No change', 'Decolourised', 'Decolourised'], ['Ammoniacal AgNO₃', 'No change', 'No change', 'White precipitate']], 'Table of the results of three tests on ethane, ethene and ethyne'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling the triple bond "one σ and one π" (it is one σ and two π), or the molecule bent (ethyne is linear, 180°).
- Writing cis–trans isomers for an alkyne (none exist).
- Forgetting that a dihalide needs two moles of KOH, or that HX and X₂ add twice (geminal and tetrahalo products).
- Giving propanal for the hydration of propyne (the product is propanone) or an aldehyde from any alkyne except ethyne.
- Saying bromine water separates ethene from ethyne (both decolourise it; use ammoniacal AgNO₃).
- Claiming that all alkynes react with silver nitrate (only terminal ones).

**How marks are usually awarded**
- Structure: hybridisation, σ and π count, angle and bond length.
- Preparation and reactions: balanced equation with the reagent and condition.
- Acidity: 50% s character, stability of the acetylide ion, comparison with ethene and ethane.
- Tests: reagent, observation and conclusion for each compound.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formula of alkynes?', 'CₙH₂ₙ₋₂ (one C≡C bond).', 'fact', 1),
    fc(2, 'How are alkynes named?', 'Longest chain containing C≡C; -ane becomes -yne; lowest locant for the triple bond.', 'concept', 1),
    fc(3, 'Hybridisation and shape of ethyne?', 'sp; linear, H–C–C = 180°.', 'fact', 1),
    fc(4, 'Bonds in the C≡C bond?', 'One σ (sp–sp) and two π (p–p, in perpendicular planes).', 'concept', 1),
    fc(5, 'Length of C≡C in ethyne?', 'About 120 pm (C=C 134 pm; C–C 154 pm).', 'fact', 1),
    fc(6, 'Number of σ and π bonds in ethyne?', '3 σ and 2 π.', 'fact', 1),
    fc(7, 'Why do alkynes show no cis–trans isomerism?', 'Each triple-bonded carbon has only one other group, on a straight line.', 'concept', 1),
    fc(8, 'Number of alkynes of formula C₄H₆ and C₅H₈?', '2 and 3.', 'fact', 1),
    fc(9, 'Compare boiling points of alkane, alkene and alkyne of equal carbon number.', 'Alkyne highest (linear shape, polarisable π electrons); alkene lowest of the three for C₄ and C₅ (but-1-yne 8.1, but-1-ene −6.3, butane −0.5 °C).', 'concept', 2),
    fc(10, 'In which solvent is ethyne stored in cylinders?', 'Dissolved in propanone on a porous filler (very soluble in propanone).', 'fact', 2),
    fc(11, 'Laboratory source of ethyne and equation?', 'CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂.', 'example', 2),
    fc(12, 'How is calcium carbide made?', 'CaO + 3C → CaC₂ + CO in an electric furnace at about 2273 K.', 'fact', 2),
    fc(13, 'Impurities in carbide ethyne and their removal?', 'H₂S, PH₃, NH₃; washed out with acidified copper(II) sulphate solution.', 'fact', 2),
    fc(14, 'Ethyne from natural gas?', '2CH₄ → C₂H₂ + 3H₂ in an electric arc at about 1773 K, then rapid quenching; or partial oxidation.', 'concept', 2),
    fc(15, 'Dihalide to alkyne: reagent and moles?', 'Alcoholic KOH, 2 mol (then NaNH₂ if needed); vicinal or geminal dihalide.', 'concept', 2),
    fc(16, "Kolbe's method for ethyne?", 'Electrolysis of aqueous potassium maleate or fumarate: ethyne and CO₂ at the anode.', 'example', 2),
    fc(17, 'Why is ethyne acidic?', 'The C–H bond uses an sp orbital (50% s), making carbon more electronegative and stabilising HC≡C⁻.', 'concept', 3),
    fc(18, 'Order of acidity of C–H in ethane, ethene, ethyne?', 'Ethyne > ethene > ethane (pKa about 25, 44, 50).', 'fact', 3),
    fc(19, 'Test for a terminal alkyne with silver?', 'Ammoniacal AgNO₃ gives a white precipitate of silver acetylide.', 'concept', 3),
    fc(20, 'Test for a terminal alkyne with copper?', 'Ammoniacal Cu₂Cl₂ gives a red precipitate of copper acetylide.', 'concept', 3),
    fc(21, 'Ethyne with NaNH₂?', 'HC≡CH + NaNH₂ → HC≡CNa + NH₃ (sodium acetylide).', 'example', 3),
    fc(22, 'Why does but-2-yne give no acetylide?', 'It has no hydrogen on a triple-bonded carbon.', 'concept', 3),
    fc(23, 'Ethyne + excess H₂ (Ni)?', 'Ethane (two moles of H₂ per mole of ethyne).', 'example', 4),
    fc(24, 'Alkyne to cis alkene; to trans alkene?', 'H₂ with Lindlar catalyst; Na in liquid NH₃.', 'concept', 4),
    fc(25, 'Ethyne + 2Br₂?', '1,1,2,2-Tetrabromoethane, CHBr₂CHBr₂.', 'example', 4),
    fc(26, 'Propyne + 2HBr?', '2,2-Dibromopropane (Markownikoff twice, geminal).', 'example', 4),
    fc(27, 'Hydration of ethyne: reagents and product?', 'HgSO₄, dilute H₂SO₄: ethenol (enol) → ethanal.', 'example', 4),
    fc(28, 'Hydration of propyne gives?', 'Propanone (by Markownikoff addition and tautomerism).', 'example', 4),
    fc(29, 'Hot KMnO₄ with R–C≡C–R?', 'Two molecules of RCOOH.', 'concept', 4),
    fc(30, 'Cyclic polymerisation of ethyne?', '3C₂H₂ → C₆H₆ in a red-hot iron tube at 873 K.', 'example', 4),
    fc(31, 'Why does ethyne burn with a sooty flame?', 'High carbon content (92.3%), so combustion is incomplete in air.', 'concept', 4),
    fc(32, 'How to distinguish ethane, ethene and ethyne?', 'Ammoniacal AgNO₃ precipitate = ethyne; the rest with bromine water: decolourised = ethene, no change = ethane.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
