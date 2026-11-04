// ch08 Organic Chemistry: Some Basic Principles and Techniques — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Organic Chemistry: Some Basic Principles and Techniques — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Tetravalence, hybridisation and structural representations',
      r`Carbon (1s² 2s² 2p²) forms **four covalent bonds** by promoting an electron and mixing orbitals. **sp³**: four σ bonds, tetrahedral, 109.5° (C–C 154 pm in ethane). **sp²**: three σ and one π, trigonal planar, 120° (C=C 134 pm in ethene). **sp**: two σ and two π, linear, 180° (C≡C 120 pm in ethyne). The higher the s character (25%, 33%, 50%), the shorter and stronger the bond.

Structures are written as **complete** (all atoms and bonds), **condensed** ($\ce{CH3CH(OH)CH3}$), **bond-line** (each end or corner is C; H on C omitted; heteroatoms written out) and **3-D wedge-dash** (solid wedge towards the viewer, dashed away). Count hydrogens as 4 minus the bonds on each carbon.`,
      [kt('Hybridisation', 'Mixing of atomic orbitals of one atom to form equivalent hybrid orbitals.'), kt('Bond-line formula', 'A zigzag drawing in which every end and corner is a carbon atom.')],
      [],
      V.shapes,
      [1],
      [V.bondline],
    ),
    sec(
      '2. Classification and IUPAC nomenclature',
      r`**Acyclic** (open chain) and **cyclic** compounds; cyclic ones are **alicyclic**, **aromatic** (benzenoid or non-benzenoid) or **heterocyclic**. A **functional group** gives characteristic reactions; a **homologous series** has the same group and members differing by $\ce{CH2}$.

**IUPAC name** = prefix + word root + primary suffix (-ane, -ene, -yne) + secondary suffix. Word roots: meth, eth, prop, but, pent, hex, hept, oct, non, dec. Rules: longest chain containing the principal group; lowest locants (group, then multiple bonds, then substituents); alphabetical prefixes; di-, tri- ignored in alphabetising.

**Priority** (high to low): carboxylic acid, ester, acid halide, amide, nitrile, aldehyde, ketone, alcohol, amine, alkene, alkyne. Halo, nitro, alkoxy and alkyl are only prefixes. Examples: 2-methylpentane, 3-hydroxybutanoic acid, but-3-en-1-ol, 4-methylpentan-2-one, 3,3-dimethylpentane.`,
      [kt('Functional group', 'An atom or group of atoms that determines the characteristic chemical properties of a compound.'), kt('Locant', 'The number that shows the position of a substituent or group on the chain.')],
      [],
      table(['Group', 'Suffix', 'Prefix'], [['–COOH', '-oic acid', 'carboxy'], ['–CHO', '-al', 'formyl or oxo'], ['>C=O', '-one', 'oxo'], ['–OH', '-ol', 'hydroxy'], ['–NH₂', '-amine', 'amino'], ['–X, –NO₂', '—', 'halo, nitro']], 'Table of functional groups with suffix and prefix'),
      [2],
    ),
    sec(
      '3. Isomerism',
      r`**Structural isomers** (same molecular formula, different connectivity): **chain** (butane / 2-methylpropane), **position** (propan-1-ol / propan-2-ol), **functional group** (ethanol / methoxymethane) and **metamerism** (methoxypropane / ethoxyethane). $\ce{C5H12}$ has three chain isomers; branching lowers the boiling point (309, 301, 283 K). $\ce{C4H10O}$ has seven alcohol and ether isomers.

**Stereoisomers** (same connectivity, different arrangement in space) are only introduced: **geometrical** (cis and trans but-2-ene; each C=C carbon needs two different groups) and **optical** (a chiral carbon bonded to four different groups gives non-superimposable mirror images, as in lactic acid).`,
      [kt('Isomers', 'Compounds with the same molecular formula but different structures.'), kt('Chiral carbon', 'A carbon bonded to four different atoms or groups.')],
      [],
      V.c5,
      [3],
      [V.stereo],
    ),
    sec(
      '4. Bond fission, intermediates, electrophiles and nucleophiles',
      r`**Homolytic fission**: one electron to each atom, **free radicals** (half-headed arrows; light, heat, non-polar solvent). **Heterolytic fission**: both electrons to the more electronegative atom, **ions** (full arrow; polar solvent).

**Carbocation** (sp², planar, six electrons), **carbanion** (sp³, pyramidal, lone pair), **free radical** (one unpaired electron). Stability: carbocations and radicals $3^\circ > 2^\circ > 1^\circ > \text{CH}_3$; carbanions the reverse. **Electrophiles** accept an electron pair ($\ce{H+}$, $\ce{NO2+}$, $\ce{BF3}$, carbonyl carbon); **nucleophiles** donate one ($\ce{OH-}$, $\ce{CN-}$, $\ce{NH3}$, $\ce{H2O}$).`,
      [kt('Free radical', 'A species with an unpaired electron, formed by homolytic fission.'), kt('Electrophile', 'An electron-deficient species that accepts an electron pair.'), kt('Nucleophile', 'An electron-rich species that donates an electron pair.')],
      [],
      V.fission,
      [4],
      [V.cations],
    ),
    sec(
      '5. Electronic displacements',
      r`**Inductive effect**: permanent shift of σ electrons along a chain; −I groups ($\ce{NO2}$, CN, F, Cl, Br, I, OH) and +I groups (alkyl, increasing from CH₃ to tert-butyl); it fades with distance. It explains why Cl₃CCOOH (pKa about 0.7) is far stronger than CH₃COOH (about 4.8).

**Electromeric effect**: temporary shift of π electrons only in the presence of an attacking reagent. **Resonance**: delocalisation of π electrons and lone pairs; structures differ only in electron positions and have the same number of paired electrons; the **hybrid** is more stable (benzene: all C–C 139 pm; carboxylate: equal C–O bonds). **+R**: –OH, –OR, –NH₂, –X; **−R**: –NO₂, –CN, –CHO, –COOH. **Hyperconjugation**: delocalisation of σ(C–H) electrons into an adjacent p orbital or π bond; the more α hydrogens, the more stable (ethyl 3, isopropyl 6, tert-butyl 9).`,
      [kt('Inductive effect', 'Permanent polarisation of a σ bond caused by an electronegative or electropositive group.'), kt('Resonance', 'Delocalisation of electrons that makes the real structure a hybrid of several contributing structures.'), kt('Hyperconjugation', 'Delocalisation of electrons of a σ(C–H) bond into an adjacent empty p orbital or π bond.')],
      [],
      V.res,
      [4],
      [V.ind],
    ),
    sec(
      '6. Types of reactions and purification',
      r`**Substitution** ($\ce{CH4 + Cl2 -> CH3Cl + HCl}$, radical; $\ce{CH3Br + OH- -> CH3OH + Br-}$, nucleophilic; nitration of benzene, electrophilic), **addition** ($\ce{C2H4 + HBr -> C2H5Br}$, electrophilic; $\ce{CH3CHO + HCN -> CH3CH(OH)CN}$, nucleophilic), **elimination** ($\ce{C2H5Br + KOH -> C2H4 + KBr + H2O}$) and **rearrangement** ($\ce{NH4CNO -> (NH2)2CO}$).

**Purification:** crystallisation (solubility); sublimation (naphthalene, camphor); simple distillation (boiling points differ considerably: chloroform 334 K, aniline 457 K); fractional distillation (close boiling points: acetone 329 K, methanol 338 K); distillation under reduced pressure (glycerol); steam distillation (aniline); differential extraction (ether); **chromatography** (adsorption: column, TLC; partition: paper). $R_f = \dfrac{\text{distance moved by the spot}}{\text{distance moved by the solvent front}}$, always less than 1.`,
      [kt('Rf value', 'Ratio of the distance moved by a component to the distance moved by the solvent front.'), kt('Steam distillation', 'Distillation of a substance that is volatile in steam and immiscible with water, at a temperature below its boiling point.')],
      [fm(r`R_f = \dfrac{d_{\text{spot}}}{d_{\text{solvent}}}`, 'Retardation factor')],
      V.dist,
      [5],
      [V.tlc],
    ),
    sec(
      '7. Qualitative and quantitative analysis',
      r`**Lassaigne extract** (fuse with sodium, extract in water): $\ce{Na + C + N -> NaCN}$, $\ce{2Na + S -> Na2S}$, $\ce{Na + X -> NaX}$. **N:** boil with FeSO₄, acidify with conc. H₂SO₄: Prussian blue. **S:** lead ethanoate gives black PbS; sodium nitroprusside gives violet. **N and S:** blood-red with FeCl₃. **Halogens:** boil with HNO₃ (removes CN⁻, S²⁻), add AgNO₃: white (Cl, soluble in NH₃), pale yellow (Br, sparingly soluble), yellow (I, insoluble).

**Percentages:** Liebig, $\%\text{C} = \tfrac{12}{44}\tfrac{m_{\text{CO}_2}}{m} \times 100$ and $\%\text{H} = \tfrac{2}{18}\tfrac{m_{\text{H}_2\text{O}}}{m} \times 100$. Dumas, $\%\text{N} = \tfrac{28 V}{22400\,m} \times 100$ ($V$ in mL at STP). Kjeldahl, $\%\text{N} = \tfrac{1.4NV}{m}$ (fails for nitro, azo and ring N). Carius: $\%\text{X} = \tfrac{\text{atomic mass}}{\text{M of AgX}}\tfrac{m_{\text{AgX}}}{m} \times 100$; $\%\text{S} = \tfrac{32}{233}\tfrac{m_{\text{BaSO}_4}}{m} \times 100$; $\%\text{P} = \tfrac{62}{222}\tfrac{m_{\text{Mg}_2\text{P}_2\text{O}_7}}{m} \times 100$; oxygen by difference.`,
      [kt('Lassaigne extract', 'The aqueous solution of NaCN, Na₂S and NaX obtained by fusing an organic compound with sodium.'), kt('Carius method', 'Heating a compound with fuming nitric acid and silver nitrate (or barium chloride) in a sealed tube to estimate halogens and sulfur.')],
      [fm(r`\%\text{N} = \dfrac{1.4 \times N \times V}{m}`, 'Kjeldahl'), fm(r`\%\text{C} = \dfrac{12}{44}\dfrac{m_{\text{CO}_2}}{m} \times 100`, 'Liebig carbon')],
      V.nflows,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Choosing the longest chain without the principal functional group, or numbering for substituents before the group.
- Calling any pair of isomers "chain isomers" without checking skeleton, position, group and alkyl groups.
- Putting carbanions in the carbocation stability order.
- Using a full arrow for one electron, or an arrow that starts at the wrong place.
- Forgetting the nitric acid boil before silver nitrate in the halogen test.
- Using the wrong factor (12/44, 2/18, 32/233) or forgetting that Rf is below 1.

**How marks are usually awarded**
- 1-mark items: hybridisation, functional group, IUPAC name, type of fission, colour of a test.
- 2–3 marks: explanation with the effect named (+I, −R, hyperconjugation) and a clear conclusion; curved arrows.
- Numericals: formula (1), substitution (1), answer with units or percentage (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Shape and angle at an sp³ carbon?', 'Tetrahedral, 109.5°.', 'fact', 1),
    fc(2, 'Shape and angle at an sp² carbon?', 'Trigonal planar, 120°.', 'fact', 1),
    fc(3, 'Shape and angle at an sp carbon?', 'Linear, 180°.', 'fact', 1),
    fc(4, 'C–C, C=C and C≡C bond lengths?', '154 pm, 134 pm and 120 pm.', 'fact', 1),
    fc(5, 'What does a solid wedge mean in a 3-D formula?', 'The bond points towards the viewer; a dashed wedge points away.', 'diagram', 1),
    fc(6, 'In a bond-line formula, what is at each end and corner?', 'A carbon atom; hydrogens on carbon are not shown.', 'concept', 1),
    fc(7, 'Classification of cyclic compounds?', 'Alicyclic, aromatic and heterocyclic.', 'fact', 2),
    fc(8, 'What is a homologous series?', 'A family with the same functional group whose members differ by CH₂.', 'definition', 2),
    fc(9, 'Word roots for 1 to 5 carbons?', 'Meth, eth, prop, but, pent.', 'fact', 2),
    fc(10, 'Which chain is chosen in naming?', 'The longest chain that contains the principal functional group.', 'concept', 2),
    fc(11, 'Order of priority of groups (high to low)?', 'Acid, ester, amide, nitrile, aldehyde, ketone, alcohol, amine, alkene, alkyne.', 'fact', 2),
    fc(12, 'Name of CH₃COCH₂CH(CH₃)₂?', '4-methylpentan-2-one.', 'example', 2),
    fc(13, 'Which groups are only ever prefixes?', 'Halo, nitro, alkoxy and alkyl groups.', 'fact', 2),
    fc(14, 'What are ortho, meta and para?', 'Substituents at positions 1,2; 1,3; and 1,4 on a benzene ring.', 'definition', 2),
    fc(15, 'Chain isomers example?', 'Butane and 2-methylpropane.', 'example', 3),
    fc(16, 'Position isomers example?', 'Propan-1-ol and propan-2-ol.', 'example', 3),
    fc(17, 'Functional group isomers example?', 'Ethanol and methoxymethane.', 'example', 3),
    fc(18, 'Metamers example?', 'Methoxypropane and ethoxyethane.', 'example', 3),
    fc(19, 'Condition for cis-trans isomerism?', 'Two different groups on each carbon of the double bond.', 'concept', 3),
    fc(20, 'What is a chiral carbon?', 'A carbon bonded to four different groups.', 'definition', 3),
    fc(21, 'Homolytic and heterolytic fission?', 'Homolytic: one electron each, free radicals. Heterolytic: both electrons to one atom, ions.', 'definition', 4),
    fc(22, 'Stability order of carbocations?', 'Tertiary > secondary > primary > methyl.', 'fact', 4),
    fc(23, 'Stability order of carbanions?', 'Methyl > primary > secondary > tertiary.', 'fact', 4),
    fc(24, 'Electrophile and nucleophile?', 'Electrophile accepts an electron pair; nucleophile donates one.', 'definition', 4),
    fc(25, 'What is the inductive effect?', 'Permanent polarisation of σ bonds by an electronegative or electropositive group; fades with distance.', 'definition', 4),
    fc(26, 'Number of hyperconjugating C–H bonds in tert-butyl cation?', 'Nine.', 'fact', 4),
    fc(27, 'Why is the electromeric effect different from resonance?', 'It is temporary and occurs only when a reagent attacks; resonance is permanent.', 'concept', 4),
    fc(28, 'Which method purifies aniline from non-volatile impurities?', 'Steam distillation.', 'example', 5),
    fc(29, 'Rf formula and range?', 'Distance moved by spot ÷ distance moved by solvent front; always below 1.', 'formula', 5),
    fc(30, 'Colour test for nitrogen in the Lassaigne extract?', 'Prussian blue.', 'exam-tip', 5),
    fc(31, 'Percentage of carbon from CO₂ (Liebig)?', r`$\%\text{C} = \dfrac{12}{44} \times \dfrac{m_{\text{CO}_2}}{m} \times 100$.`, 'formula', 5),
  ],
};
