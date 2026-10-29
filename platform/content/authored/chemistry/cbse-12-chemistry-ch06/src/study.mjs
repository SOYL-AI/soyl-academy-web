// ch06 Haloalkanes and Haloarenes — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Haloalkanes and Haloarenes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Classification, nomenclature and the C–X bond',
      r`**Classification:** by the number of halogens (mono-, di-, poly-) and by the carbon bearing X — sp³: primary, secondary, tertiary alkyl, allylic, benzylic; sp²: vinylic, aryl. Dihalides: **geminal** (same C, e.g. 1,1-dichloroethane) and **vicinal** (adjacent C, e.g. 1,2-dibromoethane).

**Naming:** halogen as a prefix with a locant — bromoethane, 2-chloropropane, 2-bromo-2-methylpropane, 3-chloroprop-1-ene (allyl chloride), (chloromethyl)benzene (benzyl chloride), 1,4-dichlorobenzene.

**C–X bond:** polar (C δ+, X δ−); bond length C–F 139 < C–Cl 178 < C–Br 193 < C–I 214 pm; bond enthalpy decreases F (452) > Cl (351) > Br (293) > I (234 kJ mol⁻¹), so reactivity is R–I > R–Br > R–Cl > R–F.`,
      [kt('Allylic halide', 'Halogen on an sp³ carbon next to a C=C double bond.'), kt('Vinylic halide', 'Halogen on an sp² carbon of a C=C double bond.'), kt('Geminal dihalide', 'Two halogen atoms on the same carbon.'), kt('Vicinal dihalide', 'Two halogen atoms on adjacent carbons.')],
      [],
      V.polar,
      [1],
      [table(['Bond', 'Length / pm', 'Enthalpy / kJ mol⁻¹'], [['C–F', '139', '452'], ['C–Cl', '178', '351'], ['C–Br', '193', '293'], ['C–I', '214', '234']], 'C–X bond lengths and enthalpies')],
    ),
    sec(
      '2. Preparation',
      r`**From alcohols:** $\ce{ROH + HCl ->[ZnCl2] RCl + H2O}$ (3° alcohols react with conc. HCl alone); $\ce{3ROH + PCl3 -> 3RCl + H3PO3}$; $\ce{ROH + PCl5 -> RCl + POCl3 + HCl}$; $\ce{ROH + SOCl2 -> RCl + SO2 + HCl}$ (best, gaseous by-products). PBr₃ and PI₃ are made in situ from red P and Br₂ or I₂.

**From hydrocarbons:** free-radical halogenation of alkanes (mixtures); HX addition to alkenes (Markovnikov; HBr with peroxide gives anti-Markovnikov); X₂ addition gives vic-dihalides; arenes + X₂ with FeX₃ (dark) give o- and p-haloarenes.

**Sandmeyer reaction:** $\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}$ (also CuBr/HBr).

**Halogen exchange:** Finkelstein $\ce{RCl + NaI ->[acetone] RI + NaCl}$ (NaCl precipitates); Swarts $\ce{CH3Br + AgF -> CH3F + AgBr}$ (also Hg₂F₂, CoF₂, SbF₃).`,
      [kt('Sandmeyer reaction', 'Replacement of the diazonium group by Cl or Br using copper(I) halide.'), kt('Finkelstein reaction', 'Halogen exchange with NaI in dry acetone to form iodoalkanes.'), kt('Swarts reaction', 'Preparation of fluoroalkanes by heating chloro- or bromoalkanes with metallic fluorides.')],
      [],
      flow('LR', [['a', 'Alcohol'], ['b', 'Alkene'], ['c', 'Arene'], ['d', 'Diazonium salt'], ['x', 'Haloalkane / haloarene']], [['a', 'x', 'SOCl₂, PCl₅, HX'], ['b', 'x', 'HX, X₂'], ['c', 'x', 'X₂/FeX₃'], ['d', 'x', 'CuX']], 'Flow of preparation routes from alcohols, alkenes, arenes and diazonium salts to halogen compounds'),
      [2],
    ),
    sec(
      '3. Physical properties',
      r`- Higher boiling points than alkanes of similar mass (polarity, larger size). For the same alkyl group: RF < RCl < RBr < RI. For isomers, branching lowers bp: 2-bromo-2-methylpropane (346 K) < 2-bromobutane (364 K) < 1-bromobutane (375 K).
- Density increases with the number and mass of halogen atoms; bromo- and iodo-compounds are denser than water.
- Only slightly soluble in water (energy to break H-bonds in water is not compensated); soluble in organic solvents.
- p-Dichlorobenzene (mp 323 K) melts higher than o- (256 K) and m- (249 K) isomers because its symmetrical molecules pack better.`,
      [kt('Van der Waals forces', 'Weak attractions between molecules that increase with molecular size and surface area.')],
      [],
      table(['Halomethane', 'bp / °C'], [['CH₃F', '−78'], ['CH₃Cl', '−24'], ['CH₃Br', '4'], ['CH₃I', '42']], 'Boiling points of halomethanes'),
      [3],
    ),
    sec(
      '4. Nucleophilic substitution: SN1 and SN2',
      r`**Products:** aq. KOH → alcohol; NaOR → ether; KCN → nitrile (via C); AgCN → isocyanide (via N); KNO₂ → alkyl nitrite (via O); AgNO₂ → nitroalkane (via N); NH₃ → amine; LiAlH₄ → alkane; R′COOAg → ester.

**SN2:** one step; backside attack; rate $= k[\ce{RX}][\ce{Nu-}]$; **inversion** (Walden inversion); reactivity CH₃X > 1° > 2° > 3° (steric hindrance).

**SN1:** two steps via a **carbocation**; rate $= k[\ce{RX}]$; mostly **racemisation**; reactivity 3° > 2° > 1° > CH₃X; favoured by polar protic solvents; allylic and benzylic halides react fast (resonance-stabilised carbocations).

**Stereochemistry:** a carbon with four different groups is chiral; enantiomers rotate plane-polarised light equally and oppositely (d/+, l/−); a racemic mixture is optically inactive. Retention: same configuration; inversion: opposite configuration.`,
      [kt('Nucleophile', 'An electron-rich species that attacks an electron-deficient carbon.'), kt('Ambident nucleophile', 'A nucleophile that can attack through two different atoms, e.g. CN⁻ (C or N).'), kt('Racemisation', 'Formation of an equal mixture of enantiomers from one enantiomer.'), kt('Walden inversion', 'Inversion of configuration at carbon during an SN2 reaction.')],
      [fm(r`\text{SN2: rate} = k[\ce{RX}][\ce{Nu-}]`, 'SN2 rate law'), fm(r`\text{SN1: rate} = k[\ce{RX}]`, 'SN1 rate law')],
      V.sn2,
      [4],
      [table(['Feature', 'SN1', 'SN2'], [['Steps', '2 (carbocation)', '1'], ['Order', 'First', 'Second'], ['Reactivity', '3° > 2° > 1°', 'CH₃ > 1° > 2° > 3°'], ['Stereochemistry', 'Racemisation', 'Inversion']], 'SN1 and SN2 compared')],
    ),
    sec(
      '5. Elimination, reactions with metals and reactions of haloarenes',
      r`**Elimination:** alcoholic KOH removes HX (β-elimination); **Saytzeff rule** — the more substituted alkene is the major product (2-bromobutane → but-2-ene major). Strong bulky bases and 3° halides favour elimination.

**Metals:** $\ce{RX + Mg ->[dry ether] RMgX}$ (Grignard; water gives RH); **Wurtz** $\ce{2RX + 2Na -> R-R + 2NaX}$; **Wurtz–Fittig** ArX + RX + 2Na → Ar–R; **Fittig** 2ArX + 2Na → Ar–Ar.

**Haloarenes** are much less reactive to nucleophilic substitution: resonance gives C–X partial double-bond character; sp² carbon; unstable phenyl cation; repulsion by the π cloud. Severe conditions are needed ($\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}$) unless –NO₂ groups occupy o/p positions. In **electrophilic substitution** the halogen is deactivating (–I) but **o/p-directing** (+R): nitration, halogenation, sulphonation and Friedel–Crafts reactions give o- and p- products (p major).`,
      [kt('Saytzeff rule', 'In dehydrohalogenation, the alkene with more alkyl groups on the double-bond carbons is the major product.'), kt('Grignard reagent', 'An alkyl- or arylmagnesium halide, RMgX, made in dry ether.')],
      [],
      V.resonance,
      [5],
    ),
    sec(
      '6. Polyhalogen compounds',
      r`- **Dichloromethane:** solvent, paint remover, propellant; affects the central nervous system.
- **Trichloromethane (chloroform):** solvent; once an anaesthetic. Oxidised by air in light to poisonous **phosgene**, $\ce{2CHCl3 + O2 -> 2COCl2 + 2HCl}$, so stored in dark, completely filled bottles.
- **Triiodomethane (iodoform):** yellow solid, antiseptic due to liberated iodine; objectionable smell.
- **Tetrachloromethane:** formerly a solvent and in refrigerant manufacture; causes liver damage; ozone depleting.
- **Freons (CFCs):** refrigerants and propellants; stable, but in the stratosphere release Cl atoms that destroy ozone.
- **DDT:** insecticide used against malaria-carrying mosquitoes; not biodegradable, accumulates in fatty tissue and food chains; banned or restricted in many countries.`,
      [kt('Phosgene', 'Carbonyl chloride, COCl₂, a very poisonous gas formed when chloroform is oxidised by air.'), kt('Freons', 'Chlorofluorocarbons used as refrigerants and propellants; they deplete stratospheric ozone.')],
      [],
      table(['Compound', 'Main use', 'Main hazard'], [['CH₂Cl₂', 'Solvent', 'Nervous system'], ['CHCl₃', 'Solvent', 'Phosgene'], ['CHI₃', 'Antiseptic', 'Smell'], ['CCl₄', 'Formerly solvent', 'Liver; ozone'], ['Freons', 'Refrigerants', 'Ozone depletion'], ['DDT', 'Insecticide', 'Persistence']], 'Uses and hazards of polyhalogen compounds'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using aqueous KOH when elimination is asked (use alcoholic KOH) or vice versa.
- Writing isocyanide for KCN (it gives a nitrile; AgCN gives an isocyanide).
- Giving the SN1 order of reactivity for an SN2 question.
- Saying SN1 gives inversion (it gives mostly racemisation).
- Calling a halogen on benzene meta-directing (it is ortho/para-directing though deactivating).
- Forgetting "dry ether" for Grignard and Wurtz reactions.

**How marks are usually awarded**
- 1-mark items: product, reagent, name or order.
- Conversions (2–3 marks): reagent and condition for each step (½–1 each) + correct intermediate.
- Mechanism answers: rate law (½), steps or transition state (1), stereochemistry (½–1).
- Reasoning (2 marks): fact + reason (resonance, steric hindrance or carbocation stability).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Allylic vs vinylic halide?', 'Allylic: X on the sp³ C next to C=C. Vinylic: X on an sp² C of C=C.', 'definition', 1),
    fc(2, 'IUPAC name of (CH₃)₃CBr?', '2-Bromo-2-methylpropane (tert-butyl bromide).', 'example', 1),
    fc(3, 'Geminal vs vicinal dihalide?', 'Geminal: both X on one carbon. Vicinal: on adjacent carbons.', 'definition', 1),
    fc(4, 'Which C–X bond is weakest?', 'C–I (longest, about 234 kJ mol⁻¹).', 'fact', 1),
    fc(5, 'Why is SOCl₂ preferred for ROH → RCl?', 'By-products SO₂ and HCl are gases and escape, leaving pure RCl.', 'concept', 2),
    fc(6, 'What is Lucas reagent?', 'Conc. HCl with anhydrous ZnCl₂.', 'definition', 2),
    fc(7, 'Peroxide effect?', 'HBr adds to unsymmetrical alkenes anti-Markovnikov in the presence of peroxide (only HBr).', 'concept', 2),
    fc(8, 'Finkelstein reaction?', r`$\ce{RCl + NaI ->[acetone] RI + NaCl}$; NaCl precipitates in acetone.`, 'formula', 2),
    fc(9, 'Swarts reaction?', 'RCl/RBr heated with AgF, Hg₂F₂, CoF₂ or SbF₃ gives RF.', 'definition', 2),
    fc(10, 'Sandmeyer reaction?', 'ArN₂⁺X⁻ + CuCl/HCl (or CuBr/HBr) gives ArCl (or ArBr) + N₂.', 'definition', 2),
    fc(11, 'Effect of branching on bp of isomeric haloalkanes?', 'Branching lowers bp (smaller surface area, weaker van der Waals forces).', 'concept', 3),
    fc(12, 'Why does p-dichlorobenzene melt higher than its isomers?', 'Its symmetrical molecules pack better in the crystal.', 'concept', 3),
    fc(13, 'Why are haloalkanes only slightly soluble in water?', 'Energy to break water’s hydrogen bonds is not released by the new attractions.', 'concept', 3),
    fc(14, 'KCN vs AgCN with RX?', 'KCN → nitrile (RCN); AgCN → isocyanide (RNC).', 'fact', 4),
    fc(15, 'KNO₂ vs AgNO₂ with RX?', 'KNO₂ → alkyl nitrite (R–O–N=O); AgNO₂ → nitroalkane (R–NO₂).', 'fact', 4),
    fc(16, 'SN2: rate law and stereochemistry?', 'Rate = k[RX][Nu⁻]; inversion of configuration.', 'formula', 4),
    fc(17, 'SN1: rate law and stereochemistry?', 'Rate = k[RX]; mostly racemisation.', 'formula', 4),
    fc(18, 'SN2 reactivity order?', 'CH₃X > 1° > 2° > 3° (steric hindrance).', 'fact', 4),
    fc(19, 'SN1 reactivity order?', '3° > 2° > 1° > CH₃X (carbocation stability).', 'fact', 4),
    fc(20, 'What is a racemic mixture?', 'Equal amounts of two enantiomers; optically inactive.', 'definition', 4),
    fc(21, 'Why do benzylic halides react fast by SN1?', 'The benzyl carbocation is stabilised by resonance with the ring.', 'concept', 4),
    fc(22, 'State Saytzeff’s rule.', 'The more substituted alkene is the major product of dehydrohalogenation.', 'definition', 5),
    fc(23, 'Product of 2-bromobutane + alc. KOH?', 'But-2-ene (major) and but-1-ene (minor).', 'example', 5),
    fc(24, 'Wurtz reaction?', '2RX + 2Na (dry ether) → R–R + 2NaX.', 'formula', 5),
    fc(25, 'Why must Grignard reagents be kept dry?', 'Water protonates them: RMgX + H₂O → RH + Mg(OH)X.', 'concept', 5),
    fc(26, 'Two reasons chlorobenzene resists nucleophilic substitution?', 'C–Cl partial double bond by resonance; sp² carbon; unstable phenyl cation.', 'concept', 5),
    fc(27, 'Directing effect of Cl in chlorobenzene?', 'Ortho/para-directing but deactivating.', 'fact', 5),
    fc(28, 'Why is chloroform stored in dark, full bottles?', 'Air and light oxidise it to poisonous phosgene, COCl₂.', 'concept', 6),
    fc(29, 'Why is iodoform an antiseptic?', 'It releases free iodine.', 'fact', 6),
    fc(30, 'Environmental problem of freons?', 'They release Cl atoms in the stratosphere that destroy ozone.', 'fact', 6),
    fc(31, 'Why is DDT a problem?', 'Not biodegradable; accumulates in fatty tissues and food chains.', 'fact', 6),
    fc(32, 'Exam tip: aqueous or alcoholic KOH?', 'Aqueous → substitution (alcohol); alcoholic → elimination (alkene).', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
