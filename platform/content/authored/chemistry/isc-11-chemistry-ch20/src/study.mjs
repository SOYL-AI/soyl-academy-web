// ch20 Basic Concepts of Organic Reaction Mechanisms — notes and flashcards.
import { T, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Basic Concepts of Organic Reaction Mechanisms — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Types of reaction',
      `**Substitution:** an atom or group is replaced by another (free-radical substitution of alkanes; nucleophilic substitution of haloalkanes). **Addition:** a π bond breaks and two σ bonds form (electrophilic addition to alkenes; nucleophilic addition to carbonyl compounds). **Elimination:** a small molecule (HX, H₂O) is removed from adjacent atoms and a π bond forms (haloalkane with alcoholic KOH; alcohol with concentrated H₂SO₄ at 443 K).`,
      [kt('Substitution', 'A reaction in which one atom or group is replaced by another.'), kt('Elimination', 'Removal of a small molecule from adjacent atoms to form a multiple bond.')],
      [],
      V.types,
      [1],
    ),
    sec(
      '2. Fission of bonds',
      `**Homolytic fission:** the shared pair divides, one electron to each atom, giving **free radicals** (half-headed arrows); favoured by light, heat, peroxides, non-polar solvents. **Heterolytic fission:** both electrons go to the more electronegative atom, giving a **cation and an anion** (full-headed arrow); favoured by polar bonds and polar solvents.`,
      [kt('Homolytic fission', 'Bond breaking in which each atom keeps one electron of the pair, forming free radicals.'), kt('Heterolytic fission', 'Bond breaking in which one atom takes both electrons, forming ions.')],
      [],
      V.fission,
      [2],
    ),
    sec(
      '3. Free radicals, carbocations, carbanions and their stability',
      `**Free radical:** seven electrons on carbon, one unpaired. **Carbocation:** six electrons, sp², planar, empty p orbital. **Carbanion:** eight electrons with a lone pair, sp³, pyramidal. Stability of carbocations and free radicals: **3° > 2° > 1° > methyl** (+I effect and hyperconjugation; 9, 6, 3, 0 α C–H bonds). Carbanions: **CH₃⁻ > 1° > 2° > 3°** because alkyl groups push electrons onto the negative carbon. Allyl and benzyl species are extra stable through resonance.`,
      [kt('Carbocation', 'An ion with a positively charged carbon atom that has only six valence electrons.'), kt('Carbanion', 'An ion with a negatively charged carbon atom carrying a lone pair.')],
      [],
      V.stabil,
      [2],
    ),
    sec(
      '4. Electrophiles and nucleophiles',
      `An **electrophile** accepts an electron pair: positive (H⁺, NO₂⁺, Br⁺) or neutral and electron-deficient (BF₃, AlCl₃, SO₃). A **nucleophile** donates an electron pair: negative (OH⁻, CN⁻, Cl⁻, RO⁻) or neutral with a lone pair (NH₃, H₂O, ROH). Nucleophiles attack electron-poor carbon (C–X, C=O); electrophiles attack electron-rich sites (C=C, benzene ring).`,
      [kt('Electrophile', 'A reagent that is electron-seeking and accepts a pair of electrons.'), kt('Nucleophile', 'A reagent that is nucleus-seeking and donates a pair of electrons.')],
      [],
      V.types,
      [3],
    ),
    sec(
      '5. Inductive, electromeric and mesomeric effects',
      `**Inductive effect:** permanent polarisation of σ bonds; **+I** (alkyl groups: (CH₃)₃C– > (CH₃)₂CH– > CH₃CH₂– > CH₃–) and **−I** (–NO₂ > –CN > –F > –Cl > –Br > –I); falls off with distance. Acid strength: CH₃COOH (pKa 4.76) < ClCH₂COOH (2.86) < Cl₂CHCOOH (1.29) < Cl₃CCOOH (0.65); FCH₂COOH is stronger than ClCH₂COOH. **Mesomeric (resonance) effect:** permanent transfer of π or lone-pair electrons: **+M** (–OH, –NH₂, –OR, –Cl) and **−M** (–NO₂, –CN, >C=O, –COOH); the ethanoate ion is a hybrid of two equal structures. **Electromeric effect:** temporary complete shift of a π pair, only in the presence of an attacking reagent.`,
      [kt('Inductive effect', 'Permanent polarisation of σ bonds by atoms or groups of different electronegativity, falling off with distance.'), kt('Electromeric effect', 'A temporary complete shift of a π electron pair to one atom in the presence of an attacking reagent.')],
      [fm(r`K_a = 10^{-pK_a}`, 'Acid dissociation constant from pKa')],
      V.induct,
      [4],
      [V.meso],
    ),
    sec(
      '6. Hyperconjugation',
      `The delocalisation of σ electrons of a C–H bond next to a positive carbon, a C=C or a radical centre (**no-bond resonance**). The ethyl cation: CH₃–CH₂⁺ ↔ H⁺ CH₂=CH₂. The number of α C–H bonds is 3 in CH₃CH₂⁺, 6 in (CH₃)₂CH⁺ and 9 in (CH₃)₃C⁺, so the tertiary cation is most stable. It also stabilises alkenes: more alkyl groups on the C=C, more stable.`,
      [kt('Hyperconjugation', 'Stabilising overlap of a σ C–H bond with an adjacent empty p or π orbital, also called no-bond resonance.')],
      [],
      V.hyper,
      [4],
    ),
    sec(
      '7. Free-radical and polar mechanisms',
      r`**Free-radical chlorination of methane:** initiation Cl₂ → 2Cl· ; propagation Cl· + CH₄ → CH₃· + HCl and CH₃· + Cl₂ → CH₃Cl + Cl· ; termination CH₃· + Cl· → CH₃Cl. Overall $\ce{CH4 + Cl2 -> CH3Cl + HCl}$. **SN2:** rate = k[RX][Nu⁻], one step, backside attack, inversion; methyl > 1° > 2° > 3°; strong nucleophile. **SN1:** rate = k[RX], slow ionisation to a planar carbocation then fast attack, racemisation; 3° > 2° > 1°; polar protic solvent. **E2:** rate = k[RX][base], one concerted step, strong base. **E1:** rate = k[RX], carbocation then loss of β-H. Aqueous KOH favours substitution; concentrated alcoholic KOH with heat favours elimination: $\ce{C2H5Br + KOH -> C2H4 + KBr + H2O}$.`,
      [kt('SN2', 'Bimolecular nucleophilic substitution: one step, second-order, inversion of configuration.'), kt('SN1', 'Unimolecular nucleophilic substitution: slow ionisation to a carbocation, first order, racemisation.')],
      [fm(r`\text{SN2: rate} = k[\text{RX}][\text{Nu}^-]`, 'Second order'), fm(r`\text{SN1: rate} = k[\text{RX}]`, 'First order')],
      V.sn2,
      [5],
      [V.sn1, V.elim],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Half-headed arrows for a pair of electrons, or arrows that start at an atom instead of a lone pair or bond.
- Calling BF₃ a nucleophile, or saying every nucleophile is negatively charged.
- Giving the carbocation order for carbanions.
- Writing racemisation for SN2 or inversion for SN1.
- Saying the electromeric effect is permanent.

**How marks are usually awarded**
- Stability questions: order (1 mark), +I effect and hyperconjugation with the α C–H count (1 mark each).
- Mechanisms: each step or arrow (0.5–1 mark), rate law, stereochemistry.
- Numericals: rate law or pKa relation, substitution, answer with unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is substitution?', 'One atom or group is replaced by another.', 'definition', 1),
    fc(2, 'What happens in an addition reaction?', 'A π bond breaks and two σ bonds form.', 'concept', 1),
    fc(3, 'What happens in elimination?', 'A small molecule (HX, H₂O) is removed and a π bond forms.', 'concept', 1),
    fc(4, 'Kind of reaction: alkane + Cl₂ in light?', 'Free-radical substitution.', 'example', 1),
    fc(5, 'Kind of reaction: CH₃CHO + HCN?', 'Nucleophilic addition.', 'example', 1),
    fc(6, 'Kind of reaction: propene + HBr?', 'Electrophilic addition.', 'example', 1),
    fc(7, 'Homolytic fission: products and arrow?', 'Two free radicals; half-headed arrows.', 'definition', 2),
    fc(8, 'Heterolytic fission: products and arrow?', 'A cation and an anion; full-headed arrow.', 'definition', 2),
    fc(9, 'What favours homolytic fission?', 'UV light, heat, peroxides, non-polar solvent, gas phase.', 'concept', 2),
    fc(10, 'Shape of a carbocation?', 'sp², trigonal planar, six electrons, empty p orbital.', 'fact', 2),
    fc(11, 'Shape of a carbanion?', 'sp³, pyramidal, with a lone pair.', 'fact', 2),
    fc(12, 'A free radical is…?', 'Neutral, with an unpaired electron (paramagnetic).', 'definition', 2),
    fc(13, 'Order of carbocation stability?', '3° > 2° > 1° > methyl.', 'fact', 2),
    fc(14, 'Order of carbanion stability?', 'CH₃⁻ > 1° > 2° > 3°.', 'fact', 2),
    fc(15, 'Why are 3° carbocations stable?', '+I effect of three alkyl groups and nine α C–H bonds for hyperconjugation.', 'concept', 2),
    fc(16, 'Define electrophile.', 'An electron-seeking reagent that accepts an electron pair.', 'definition', 3),
    fc(17, 'Define nucleophile.', 'A reagent that donates an electron pair to an electron-poor atom.', 'definition', 3),
    fc(18, 'Neutral electrophiles?', 'BF₃, AlCl₃, SO₃ (incomplete octet).', 'example', 3),
    fc(19, 'Neutral nucleophiles?', 'NH₃, H₂O, ROH (lone pair).', 'example', 3),
    fc(20, 'Classify NO₂⁺, BF₃, OH⁻, NH₃, H₂O.', 'Electrophiles: NO₂⁺, BF₃. Nucleophiles: OH⁻, NH₃, H₂O.', 'example', 3),
    fc(21, 'Define the inductive effect.', 'Permanent polarisation of σ bonds by electronegativity differences; falls with distance.', 'definition', 4),
    fc(22, 'Order of −I effect of halogens?', 'F > Cl > Br > I.', 'fact', 4),
    fc(23, 'Order of acid strength: ethanoic, chloro-, dichloro-, trichloroethanoic?', 'Increases with Cl: pKa 4.76, 2.86, 1.29, 0.65.', 'fact', 4),
    fc(24, 'Ka from pKa?', 'Ka = 10 to the power −pKa.', 'formula', 4),
    fc(25, 'Mesomeric effect: +M and −M groups?', '+M: –OH, –NH₂, –Cl; −M: –NO₂, –CN, C=O.', 'fact', 4),
    fc(26, 'Is the electromeric effect permanent?', 'No: temporary, only with an attacking reagent.', 'concept', 4),
    fc(27, 'What is hyperconjugation?', 'Delocalisation of σ C–H electrons into an adjacent empty p or π orbital (no-bond resonance).', 'definition', 4),
    fc(28, 'α C–H bonds in ethyl, isopropyl, tert-butyl cations?', '3, 6 and 9.', 'fact', 4),
    fc(29, 'SN2: rate law and stereochemistry?', 'Rate = k[RX][Nu⁻]; inversion by backside attack.', 'concept', 5),
    fc(30, 'SN1: rate law and stereochemistry?', 'Rate = k[RX]; racemisation through a planar carbocation.', 'concept', 5),
    fc(31, 'KOH conditions: substitution or elimination?', 'Aqueous KOH: substitution; concentrated alcoholic KOH with heat: elimination.', 'concept', 5),
    fc(32, 'Stages of free-radical chlorination of methane?', 'Initiation, propagation (two steps), termination.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
