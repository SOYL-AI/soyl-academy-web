// ch20 Basic Concepts of Organic Reaction Mechanisms — two decks. Part 1 (t01–t03): types of reaction, bond fission, free radicals,
// carbocations and carbanions with their stabilities, electrophiles and nucleophiles. Part 2 (t04–t05): inductive, electromeric,
// mesomeric effects and hyperconjugation; free-radical, SN1, SN2, E1 and E2 mechanisms. Worked-example numbers are computed here.
import { sl, deck, table, svgV, chem, r } from './lib.mjs';
import { TYPES, FISSION, STABIL, INDUCT, MESO, HYPER, SN2, SN1, ELIM } from './svgs.mjs';
// m × 10ⁿ with superscript digits, for plain-text table cells
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const uexp = (x) => { const [m, e] = x.toExponential(2).split('e'); return `${m} × 10${String(Number(e)).split('').map((c) => SUP[c]).join('')}`; };

export const V = {
  types: svgV(TYPES, 'Three types of reaction with an example of each: substitution, addition and elimination'),
  fission: svgV(FISSION, 'Homolytic fission with half-headed arrows giving two free radicals, and heterolytic fission with a full-headed arrow giving a cation and an anion'),
  stabil: svgV(STABIL, 'Bar chart of the stability of methyl, primary, secondary and tertiary carbocations and free radicals with 0, 3, 6 and 9 alpha C–H bonds, and the reverse order for carbanions'),
  induct: svgV(INDUCT, 'Inductive effect of chlorine along a carbon chain, and pKa bars for ethanoic acid and its chloro derivatives'),
  meso: svgV(MESO, 'Resonance in the ethanoate ion, the mesomeric effect in propenal and the electromeric effect on a carbonyl group, with curved arrows'),
  hyper: svgV(HYPER, 'Hyperconjugation in the ethyl cation with a no-bond resonance structure, and the number of alpha C–H bonds in three alkyl cations'),
  sn2: svgV(SN2, 'SN2 mechanism of bromoethane with hydroxide with curved arrows, transition state, inversion of configuration and an energy profile with one maximum'),
  sn1: svgV(SN1, 'SN1 mechanism of tert-butyl bromide with water in three steps and an energy profile with two maxima and an intermediate'),
  elim: svgV(ELIM, 'E2 elimination of bromoethane with ethoxide in one step, and E1 elimination of tert-butyl bromide through a carbocation'),
};

// ---- worked-example numbers (computed once)
const PKA = { acetic: 4.76, dichloro: 1.29 };
const KaDi = 10 ** -PKA.dichloro;
const KaAc = 10 ** -PKA.acetic;
const ratioDi = KaDi / KaAc;
const R1 = { rate: 3.0e-6, a: 0.1, b: 0.1, a2: 0.2, b2: 0.3 };
R1.k = R1.rate / (R1.a * R1.b);
R1.rate2 = R1.k * R1.a2 * R1.b2;
if (Math.abs(R1.k - 3.0e-4) > 1e-12 || Math.abs(R1.rate2 - 1.8e-5) > 1e-12) throw new Error('rate example mismatch');
const alphaH = [0, 3, 6, 9];

// ================================================================== deck 1
export const deck1 = deck({
  part: 1,
  title: 'Basic Concepts of Organic Reaction Mechanisms — Part 1: Reaction types, intermediates and reagents',
  goals: [
    'Classify a reaction as substitution, addition or elimination',
    'Distinguish homolytic from heterolytic fission and describe free radicals, carbocations and carbanions',
    'Arrange carbocations, free radicals and carbanions in order of stability',
    'Classify reagents, including neutral ones such as BF₃, NH₃ and H₂O, as electrophiles or nucleophiles',
  ],
  slides: [
    sl('title', 'How do organic reactions happen?', {
      b: 'A **mechanism** is the step-by-step account of how bonds break and form. To write one we first sort reactions into **types**, then ask how the bonds break, which **intermediates** form, and which **reagents** attack.',
      v: table(['Question', 'Idea', 'Part 1 topic'], [['What changes?', 'Substitution, addition, elimination', 'Types of reaction'], ['How does a bond break?', 'Homolytic or heterolytic fission', 'Radicals and ions'], ['What is formed?', 'Radical, carbocation, carbanion', 'Stability'], ['What attacks?', 'Electrophile or nucleophile', 'Reagents']], 'Table of four questions about a mechanism with the idea and the topic each leads to'),
      n: 'A mechanism is the step by step story of how an organic reaction happens. To write one, first sort the reaction into a type. Then ask how the bonds break, which intermediate forms, and what kind of reagent attacks. Part one answers each of these questions.',
    }),
    sl('diagram', 'Substitution, addition and elimination', {
      b: '**Substitution:** an atom or group is replaced by another. **Addition:** a π bond breaks and two σ bonds form, so two groups add on. **Elimination:** a small molecule such as HBr or H₂O is removed and a π bond forms.',
      v: V.types,
      n: 'There are three main types of reaction. In substitution one atom or group is replaced by another, as when bromine is replaced by hydroxide. In addition a pi bond breaks and two new sigma bonds form, as when bromine adds to ethene. In elimination a small molecule leaves and a pi bond forms.',
    }),
    sl('concept', 'Kinds of substitution, addition and elimination', {
      b: 'The reagent decides the kind: a **free radical** (chlorine atom), a **nucleophile** (OH⁻, CN⁻) or an **electrophile** (H⁺, Br⁺). Alkanes undergo free-radical substitution, haloalkanes nucleophilic substitution, alkenes electrophilic addition and carbonyl compounds nucleophilic addition.',
      v: table(['Reaction', 'Typical substrate', 'Example'], [['Free-radical substitution', 'Alkane', 'CH₄ + Cl₂ in light'], ['Nucleophilic substitution', 'Haloalkane', 'C₂H₅Br + KCN'], ['Electrophilic addition', 'Alkene', 'CH₃CH=CH₂ + HBr'], ['Nucleophilic addition', 'Aldehyde, ketone', 'CH₃CHO + HCN'], ['Elimination', 'Haloalkane, alcohol', 'Alcoholic KOH; conc. H₂SO₄']], 'Table of kinds of reaction with a typical substrate and an example'),
      n: 'The kind of reagent decides the kind of reaction. Alkanes react with chlorine atoms in free radical substitution. Haloalkanes react with nucleophiles such as cyanide in nucleophilic substitution. Alkenes are attacked by electrophiles in electrophilic addition. Carbonyl compounds undergo nucleophilic addition, and haloalkanes or alcohols can undergo elimination.',
    }),
    sl('check', 'Quick check: type of reaction', {
      b: 'Classify the formation of ethene from ethanol with concentrated sulphuric acid.',
      n: 'Quick check. Ask whether a small molecule has been removed and a double bond formed.',
      chk: 'dehydr-mcq',
    }),
    sl('diagram', 'Two ways to break a bond', {
      b: '**Homolytic fission:** the shared pair is divided, one electron to each atom, giving two **free radicals** (half-headed arrows). **Heterolytic fission:** both electrons go to the more electronegative atom, giving a **cation and an anion** (full-headed arrow).',
      v: V.fission,
      n: 'A covalent bond can break in two ways. In homolytic fission the shared pair is divided equally, one electron to each atom, and two free radicals form. This is shown with half headed arrows. In heterolytic fission both electrons go to the more electronegative atom, so a cation and an anion form. This is shown with a full headed arrow.',
    }),
    sl('concept', 'Conditions for each kind of fission', {
      b: 'Homolysis needs **energy** (light or heat) and favours bonds between **identical or similar atoms**, non-polar solvents or the gas phase, and peroxides. Heterolysis favours **polar bonds** in **polar solvents**.',
      v: table(['Feature', 'Homolytic', 'Heterolytic'], [['Electron pair', 'Shared equally', 'Both go to one atom'], ['Arrow', 'Half-headed (fish-hook)', 'Full-headed'], ['Products', 'Two free radicals', 'Cation and anion'], ['Favoured by', 'UV light, heat, peroxides, non-polar solvent', 'Polar bond, polar solvent'], ['Example', 'Cl₂ → 2Cl·', '(CH₃)₃C–Br → (CH₃)₃C⁺ + Br⁻']], 'Table comparing homolytic and heterolytic fission'),
      n: 'Homolytic fission needs energy such as light or heat. It is favoured for bonds between identical atoms, in non polar solvents or in the gas phase, and by peroxides. Heterolytic fission is favoured when the bond is polar and the solvent is polar, because the solvent stabilises the ions that form.',
    }),
    sl('check', 'Quick check: homolytic fission', {
      b: 'Decide whether a statement about chlorine splitting in sunlight is supported by its reason.',
      n: 'Quick check. Decide whether each statement is true, and whether the reason explains the assertion.',
      chk: 'homolytic-ar',
    }),
    sl('concept', 'Free radicals, carbocations and carbanions', {
      b: 'A **free radical** has an unpaired electron and no charge; a **carbocation** has a positive carbon with six electrons (sp², planar, empty p orbital); a **carbanion** has a negative carbon with a lone pair (sp³, pyramidal).',
      v: table(['Species', 'Valence electrons on carbon', 'Hybridisation and shape', 'Example'], [['Free radical', '7, one unpaired', 'sp², planar (or nearly)', 'CH₃·'], ['Carbocation', '6, none unpaired', 'sp², trigonal planar', 'CH₃⁺'], ['Carbanion', '8, one lone pair', 'sp³, pyramidal', 'CH₃⁻']], 'Table of free radical, carbocation and carbanion with electron count, shape and example'),
      n: 'Three reactive intermediates matter. A free radical has seven electrons on carbon, one of them unpaired. A carbocation has only six, so it is flat with an empty p orbital. A carbanion has eight, including a lone pair, so it is pyramidal. Each is short lived and highly reactive.',
    }),
    sl('diagram', 'How stable are they?', {
      b: 'Alkyl groups **stabilise** a carbocation or a free radical by their **+I effect** and by **hyperconjugation**, so the order is **3° > 2° > 1° > methyl**. For **carbanions** the alkyl groups push electrons onto the charged carbon, so the order is **reversed**.',
      v: V.stabil,
      n: 'Here is the order of stability. For carbocations and free radicals it is tertiary, then secondary, then primary, then methyl, because each alkyl group donates electrons and gives more carbon hydrogen bonds for hyperconjugation. Carbanions are the other way round, because alkyl groups push electrons onto a carbon that is already negative.',
    }),
    sl('example', 'Worked example: ordering intermediates', {
      b: `**Problem.** Arrange (CH₃)₂CH⁺, CH₃⁺, (CH₃)₃C⁺ and CH₃CH₂⁺ in decreasing stability and, for each, count the α C–H bonds. Then arrange the carbanions CH₃⁻, (CH₃)₂CH⁻ and (CH₃)₃C⁻.\n\n**Answer.** Number of α C–H bonds: CH₃⁺ ${alphaH[0]}, CH₃CH₂⁺ ${alphaH[1]}, (CH₃)₂CH⁺ ${alphaH[2]}, (CH₃)₃C⁺ ${alphaH[3]}. Stability: (CH₃)₃C⁺ > (CH₃)₂CH⁺ > CH₃CH₂⁺ > CH₃⁺. For carbanions the order is reversed: CH₃⁻ > (CH₃)₂CH⁻ > (CH₃)₃C⁻.`,
      v: table(['Cation', 'α C–H bonds', 'Class', 'Rank'], [['(CH₃)₃C⁺', `${alphaH[3]}`, 'Tertiary', '1 (most stable)'], ['(CH₃)₂CH⁺', `${alphaH[2]}`, 'Secondary', '2'], ['CH₃CH₂⁺', `${alphaH[1]}`, 'Primary', '3'], ['CH₃⁺', `${alphaH[0]}`, 'Methyl', '4 (least stable)']], 'Table ranking four carbocations by the number of alpha C–H bonds'),
      n: 'Count the carbon hydrogen bonds on the carbons attached to the charged carbon. Methyl has none, ethyl has three, isopropyl has six and tert butyl has nine. More such bonds means more hyperconjugation and a more stable cation. Carbanions follow the reverse order, with the methyl carbanion the most stable.',
    }),
    sl('concept', 'Electrophiles and nucleophiles', {
      b: 'An **electrophile** is electron-seeking: it accepts an electron pair. It may be positive (H⁺, NO₂⁺) or **neutral but electron-deficient** (BF₃, AlCl₃). A **nucleophile** is nucleus-seeking: it donates an electron pair. It may be negative (OH⁻, CN⁻) or **neutral with a lone pair** (NH₃, H₂O, ROH).',
      v: table(['', 'Electrophile', 'Nucleophile'], [['Role', 'Accepts a pair of electrons', 'Donates a pair of electrons'], ['Charged examples', 'H⁺, NO₂⁺, Br⁺', 'OH⁻, CN⁻, Cl⁻, RO⁻'], ['Neutral examples', 'BF₃, AlCl₃, SO₃', 'NH₃, H₂O, ROH'], ['Attacks', 'Electron-rich sites (C=C, ring)', 'Electron-poor carbon (C–X, C=O)']], 'Table comparing electrophiles and nucleophiles with charged and neutral examples'),
      n: 'An electrophile seeks electrons and accepts an electron pair. It may be positively charged, such as the nitronium ion, or neutral but electron deficient, such as boron trifluoride. A nucleophile donates an electron pair. It may be negative, such as hydroxide, or neutral with a lone pair, such as ammonia or water.',
    }),
    sl('example', 'Worked example: classifying reagents', {
      b: '**Problem.** Classify NO₂⁺, BF₃, OH⁻, NH₃ and H₂O.\n\n**Answer.** **Electrophiles:** NO₂⁺ (positive, electron-poor nitrogen) and BF₃ (boron has six electrons). **Nucleophiles:** OH⁻ (negative, with lone pairs), NH₃ (lone pair on N) and H₂O (lone pairs on O). Neutral nucleophiles need a lone pair; neutral electrophiles need an incomplete octet.',
      v: table(['Species', 'Key feature', 'Class'], [['NO₂⁺', 'Positive, electron-poor', 'Electrophile'], ['BF₃', 'Incomplete octet on B', 'Electrophile'], ['OH⁻', 'Negative, lone pairs', 'Nucleophile'], ['NH₃', 'Lone pair on N', 'Nucleophile'], ['H₂O', 'Lone pairs on O', 'Nucleophile']], 'Table classifying five species as electrophile or nucleophile with the key feature'),
      n: 'Look for the key feature. The nitronium ion is positive and electron poor, so it is an electrophile. Boron trifluoride has an incomplete octet, so it too is an electrophile. Hydroxide, ammonia and water all have lone pairs to donate, so they are nucleophiles.',
    }),
    sl('check', 'Quick check: a neutral nucleophile', {
      b: 'Identify the uncharged species that can donate an electron pair.',
      n: 'Quick check. A neutral nucleophile must have a lone pair available.',
      chk: 'nuc-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Reactions are substitution, addition or elimination; the attacking species is a free radical, nucleophile or electrophile.',
        'Homolytic fission gives free radicals; heterolytic fission gives a carbocation and an anion.',
        'Carbocations and free radicals: 3° > 2° > 1° > methyl; carbanions: the reverse.',
        'Electrophiles accept an electron pair (H⁺, NO₂⁺, BF₃); nucleophiles donate one (OH⁻, CN⁻, NH₃, H₂O).',
      ],
      v: table(['Intermediate', 'Structure', 'Stability order'], [['Carbocation', 'sp², planar, six electrons', '3° > 2° > 1° > CH₃⁺'], ['Free radical', 'Seven electrons, one unpaired', '3° > 2° > 1° > CH₃·'], ['Carbanion', 'sp³, pyramidal, lone pair', 'CH₃⁻ > 1° > 2° > 3°']], 'Summary table of the three intermediates, their structure and stability order'),
      n: 'To sum up. Reactions are substitution, addition or elimination. A bond breaks homolytically to give radicals or heterolytically to give ions. Carbocations and radicals become more stable from methyl to tertiary, and carbanions the other way. Electrophiles accept an electron pair and nucleophiles donate one, even when they are neutral.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Use full-headed arrows for movement of an electron pair and half-headed arrows for a single electron.',
        'For stability questions state both reasons: +I effect and hyperconjugation (with the α C–H count).',
        'For neutral species give the reason: a lone pair (nucleophile) or an incomplete octet (electrophile).',
        'Remember that carbanion stability is the reverse of carbocation stability.',
      ],
      v: table(['Slip', 'Fix'], [['Half-headed arrows for a pair', 'A pair needs a full-headed arrow'], ['BF₃ called a nucleophile', 'It has an incomplete octet: electrophile'], ['Carbanions: 3° most stable', 'Alkyl groups destabilise: CH₃⁻ is most stable']], 'Table of three common slips in reaction types and intermediates with the fix'),
      n: 'A few tips. Use full headed arrows for a pair of electrons and half headed arrows for a single electron. In stability questions give both reasons, the inductive effect and hyperconjugation. For a neutral reagent explain it using a lone pair or an incomplete octet. And remember carbanions follow the reverse order of carbocations.',
    }),
  ],
});

// ================================================================== deck 2
export const deck2 = deck({
  part: 2,
  title: 'Basic Concepts of Organic Reaction Mechanisms — Part 2: Electronic effects and mechanisms',
  goals: [
    'Describe the inductive, electromeric and mesomeric effects and hyperconjugation, with examples',
    'Use the inductive effect to compare the acid strengths of chloroethanoic acids',
    'Describe the free-radical, SN1 and SN2 mechanisms and compare them',
    'Distinguish E1 from E2 elimination and state the conditions that favour each',
  ],
  slides: [
    sl('title', 'Why do electrons move?', {
      b: 'Electrons in a molecule are not shared evenly. **Four effects** explain where the electron density is high or low, and so how stable an ion is and where a reagent attacks: **inductive**, **electromeric**, **mesomeric (resonance)** and **hyperconjugation**.',
      v: table(['Effect', 'Permanent?', 'Electrons involved', 'Example'], [['Inductive', 'Yes', 'σ electrons', 'Cl–CH₂–: −I'], ['Mesomeric (resonance)', 'Yes', 'π or lone-pair electrons', 'Ethanoate ion'], ['Hyperconjugation', 'Yes', 'σ C–H electrons', 'tert-Butyl cation'], ['Electromeric', 'No, temporary', 'π electrons', 'C=O with CN⁻']], 'Table of four electronic effects with whether they are permanent, the electrons involved and an example'),
      n: 'Electrons in a molecule are not shared evenly, and four effects describe how they shift. The inductive effect acts on sigma electrons. The mesomeric effect acts on pi and lone pair electrons. Hyperconjugation involves sigma carbon hydrogen electrons. The electromeric effect is the only temporary one, and it appears only when a reagent attacks.',
    }),
    sl('diagram', 'The inductive effect and acid strength', {
      b: 'A more electronegative atom pulls the σ electrons towards itself: the **−I effect** (Cl, F, NO₂); alkyl groups push electrons: the **+I effect**. The effect **fades with distance**. Chlorine atoms stabilise the carboxylate ion, so more Cl means a **stronger acid** (lower pKa).',
      v: V.induct,
      n: 'An electronegative atom such as chlorine pulls sigma electrons towards itself. This is the minus I effect, and it weakens quickly along the chain. In chloroethanoic acids the pull stabilises the carboxylate ion, so each added chlorine atom makes the acid stronger, as the falling pKa values show.',
    }),
    sl('concept', 'Groups with +I and −I effects', {
      b: '**+I (electron-releasing):** alkyl groups, with the order (CH₃)₃C– > (CH₃)₂CH– > CH₃CH₂– > CH₃–. **−I (electron-withdrawing):** –NO₂ > –CN > –F > –Cl > –Br > –I (and –COOH, –OH). Fluorine is the most electronegative halogen, so FCH₂COOH is a stronger acid than ClCH₂COOH.',
      v: table(['Effect', 'Groups', 'Influence on acids'], [['+I', '(CH₃)₃C–, (CH₃)₂CH–, CH₃CH₂–, CH₃–', 'Weaken the acid'], ['−I', '–NO₂, –CN, –F, –Cl, –Br', 'Strengthen the acid'], ['Distance', 'Falls off rapidly', 'Cl on C-2 acts more strongly than on C-3']], 'Table of groups with plus I and minus I effects and their influence on acid strength'),
      n: 'Alkyl groups release electrons, and the effect grows with the number of alkyl groups on the carbon, so tert butyl is the strongest. Groups such as nitro, cyano and the halogens withdraw electrons, and fluorine withdraws more strongly than chlorine. The effect falls off quickly with distance, so a chlorine atom close to the acid group has the greatest influence.',
    }),
    sl('example', 'Worked example: comparing acid strengths', {
      b: r`**Problem.** The pKa of ethanoic acid is 4.76 and that of dichloroethanoic acid is 1.29 (given). How many times stronger is the second acid?

$\dfrac{K_a(\text{dichloro})}{K_a(\text{ethanoic})} = 10^{4.76 - 1.29} = 10^{3.47} = ${ratioDi.toFixed(0)}$. The two chlorine atoms (−I effect) stabilise the carboxylate ion, so the acid is about ${(Math.round(ratioDi / 100) * 100).toFixed(0)} times stronger.`,
      v: table(['Acid', 'pKa', 'Ka (mol L⁻¹)'], [['CH₃COOH', '4.76', uexp(KaAc)], ['Cl₂CHCOOH', '1.29', uexp(KaDi)]], 'Table of pKa and Ka for ethanoic acid and dichloroethanoic acid'),
      n: 'Convert the difference in pKa into a ratio of acid constants. The difference between four point seven six and one point two nine is three point four seven, and ten to that power is about three thousand. So dichloroethanoic acid is about three thousand times stronger, because two chlorine atoms stabilise the carboxylate ion.',
    }),
    sl('check', 'Quick check: pKa and Ka', {
      b: 'Convert the pKa of trichloroethanoic acid to its acid constant.',
      n: 'Quick check. The acid constant is ten raised to minus the pKa.',
      chk: 'kapka-num',
    }),
    sl('diagram', 'Resonance, mesomeric and electromeric effects', {
      b: '**Mesomeric (resonance) effect:** permanent shift of π or lone-pair electrons, drawn as resonance structures. **+M:** groups with lone pairs (–OH, –NH₂, –Cl); **−M:** groups pulling π electrons (–NO₂, –CN, C=O). **Electromeric effect:** a **temporary** complete shift of a π pair, only when a reagent attacks.',
      v: V.meso,
      n: 'Here are three effects of pi and lone pair electrons. In the ethanoate ion two resonance structures share the negative charge equally. In propenal the carbonyl group pulls pi electrons through the chain, which is a permanent mesomeric effect. The electromeric effect is temporary. The pi pair in a carbonyl group moves to oxygen only when a nucleophile approaches.',
    }),
    sl('concept', 'Mesomeric groups and the electromeric effect', {
      b: '**+M groups** donate a lone pair to a π system and raise electron density at ortho and para positions of benzene. **−M groups** withdraw π electrons and lower it. The **electromeric effect** is called **+E** if the π pair moves towards the attacking atom, and **−E** if it moves away.',
      v: table(['Effect', 'Groups or example', 'Result on benzene ring'], [['+M', '–NH₂, –OH, –OCH₃, –Cl', 'Electron density rises at ortho and para'], ['−M', '–NO₂, –CN, –CHO, –COOH', 'Electron density falls at ortho and para'], ['Electromeric', '>C=O with CN⁻', 'Temporary shift to oxygen']], 'Table of mesomeric and electromeric effects with example groups and the result on a benzene ring'),
      n: 'Groups with a lone pair, such as amino and hydroxyl, give it to the ring, which is a plus M effect, and raise the electron density at the ortho and para positions. Groups such as nitro and cyano pull pi electrons out of the ring, which is a minus M effect. The electromeric effect is temporary and shows only when a reagent is present.',
    }),
    sl('diagram', 'Hyperconjugation', {
      b: '**Hyperconjugation** (no-bond resonance) is the delocalisation of σ electrons of a C–H bond **next to** a positive carbon, a double bond or a radical centre. More **α C–H bonds** mean more structures and a more stable species: CH₃CH₂⁺ (3), (CH₃)₂CH⁺ (6), (CH₃)₃C⁺ (9).',
      v: V.hyper,
      n: 'Hyperconjugation is the overlap of a carbon hydrogen sigma bond next to the charged carbon with its empty p orbital. In the ethyl cation, this gives a second structure with a proton and ethene, so the charge is spread out. The tert butyl cation has nine such carbon hydrogen bonds, which makes it more stable than the isopropyl cation, with six.',
    }),
    sl('check', 'Quick check: counting α C–H bonds', {
      b: 'Count the α C–H bonds available for hyperconjugation in an alkene.',
      n: 'Quick check. Count the hydrogens on the carbons directly attached to the carbons of the double bond.',
      chk: 'hypercount-mcq',
    }),
    sl('concept', 'The free-radical mechanism', {
      b: 'Free-radical chlorination of methane in light is a **chain reaction**. **Initiation:** Cl₂ → 2Cl·. **Propagation:** Cl· + CH₄ → CH₃· + HCl; CH₃· + Cl₂ → CH₃Cl + Cl·. **Termination:** radicals combine, e.g. CH₃· + Cl· → CH₃Cl. Each propagation cycle regenerates Cl·.',
      v: chem('CH4 + Cl2 -> CH3Cl + HCl', 'Overall equation for the chlorination of methane to chloromethane and hydrogen chloride', 'Excess chlorine gives CH₂Cl₂, CHCl₃ and CCl₄ as well.'),
      n: 'In the free radical chlorination of methane, light first splits a chlorine molecule into two chlorine atoms. In the two propagation steps a chlorine atom takes a hydrogen from methane to give a methyl radical, which then reacts with chlorine to give chloromethane and a new chlorine atom. The chain ends when two radicals combine.',
    }),
    sl('diagram', 'SN2: one step, backside attack', {
      b: 'The nucleophile attacks the carbon from the side **opposite** to the leaving group; bond making and breaking are **simultaneous**. **Rate = k[RX][Nu⁻]** (second order); the configuration is **inverted**. Favoured by methyl and primary halides, strong nucleophiles and polar aprotic solvents.',
      v: V.sn2,
      n: 'In the S N two mechanism the hydroxide ion attacks the carbon from the side opposite to bromine. The new bond forms as the old bond breaks, through a single transition state. The rate depends on both reactants, so it is second order, and the three other groups flip like an umbrella, so the configuration is inverted.',
    }),
    sl('diagram', 'SN1: two steps through a carbocation', {
      b: 'Step 1 is a **slow** ionisation to a carbocation; steps 2 and 3 are fast. **Rate = k[RX]** (first order). A planar cation can be attacked from either face, so a chiral halide gives **racemisation**. Favoured by tertiary halides and polar protic solvents.',
      v: V.sn1,
      n: 'In the S N one mechanism, the halide first ionises slowly to a planar carbocation. Water then attacks the cation quickly, and a proton is lost. Only the first step decides the rate, so the reaction is first order. The planar cation can be attacked from either face, so an optically active halide gives a racemic product.',
    }),
    sl('concept', 'SN1 and SN2 compared', {
      b: 'The mechanism depends on the **substrate**, **nucleophile** and **solvent**. Tertiary halides give stable cations and are too crowded for backside attack, so they prefer SN1; methyl and primary halides prefer SN2; secondary halides can follow either.',
      v: table(['Feature', 'SN1', 'SN2'], [['Rate law', 'k[RX]', 'k[RX][Nu⁻]'], ['Steps', 'Two, with a carbocation', 'One, with a transition state'], ['Stereochemistry', 'Racemisation', 'Inversion'], ['Substrate order', '3° > 2° > 1° > CH₃', 'CH₃ > 1° > 2° > 3°'], ['Nucleophile', 'Weak is enough', 'Strong needed'], ['Solvent', 'Polar protic', 'Polar aprotic']], 'Table comparing SN1 and SN2 in rate law, steps, stereochemistry, substrate order, nucleophile and solvent'),
      n: 'The two mechanisms differ in many ways. S N one is first order, goes through a carbocation, gives racemisation and prefers tertiary halides and polar protic solvents. S N two is second order, takes one step, gives inversion and prefers methyl and primary halides and strong nucleophiles. Secondary halides can use either path.',
    }),
    sl('example', 'Worked example: using the rate law', {
      b: r`**Problem.** For the SN2 reaction of a bromoalkane with hydroxide, rate $= k[\text{RBr}][\text{OH}^-]$. With $[\text{RBr}] = ${R1.a.toFixed(2)}$ and $[\text{OH}^-] = ${R1.b.toFixed(2)}$ mol L⁻¹, the initial rate is $3.0 \times 10^{-6}$ mol L⁻¹ s⁻¹. Find $k$, and the rate when $[\text{RBr}] = ${R1.a2.toFixed(2)}$ and $[\text{OH}^-] = ${R1.b2.toFixed(2)}$ mol L⁻¹.

$k = \dfrac{3.0 \times 10^{-6}}{${R1.a.toFixed(2)} \times ${R1.b.toFixed(2)}} = 3.0 \times 10^{-4}$ L mol⁻¹ s⁻¹; new rate $= 3.0 \times 10^{-4} \times ${R1.a2.toFixed(2)} \times ${R1.b2.toFixed(2)} = 1.8 \times 10^{-5}$ mol L⁻¹ s⁻¹ (6 times faster).`,
      v: table(['Run', '[RBr]', '[OH⁻]', 'Rate (mol L⁻¹ s⁻¹)'], [['1', `${R1.a.toFixed(2)}`, `${R1.b.toFixed(2)}`, '3.0 × 10⁻⁶'], ['2', `${R1.a2.toFixed(2)}`, `${R1.b2.toFixed(2)}`, '1.8 × 10⁻⁵']], 'Table of two kinetic runs of an SN2 reaction with concentrations and rates'),
      n: 'In an S N two reaction both concentrations appear in the rate law. Dividing the first rate by the product of the two concentrations gives the rate constant. Using that constant with the new concentrations gives the new rate. Doubling one concentration and tripling the other makes the reaction six times faster.',
    }),
    sl('diagram', 'E2 and E1 elimination', {
      b: '**E2:** a strong base removes a β-hydrogen as the leaving group departs, in **one step**; rate = k[RX][base]. **E1:** the halide ionises slowly to a carbocation, then a weak base removes a β-hydrogen; rate = k[RX]. Elimination is favoured by **alcoholic KOH and heat**.',
      v: V.elim,
      n: 'In E two elimination, a strong base removes a hydrogen from the carbon next to the one bearing the halogen, while the halide leaves, all in one step. In E one elimination, the halide first leaves to form a carbocation and then a weak base removes a hydrogen. Both give an alkene, and alcoholic potassium hydroxide with heat favours elimination.',
    }),
    sl('concept', 'E1 and E2 compared; substitution against elimination', {
      b: '**Aqueous KOH** (a nucleophile in water) favours **substitution**; **concentrated alcoholic KOH with heat** favours **elimination**. E2 needs a strong base, shows second-order kinetics and has no intermediate; E1 is first order, has a carbocation and competes with SN1.',
      v: table(['Feature', 'E1', 'E2'], [['Rate law', 'k[RX]', 'k[RX][base]'], ['Steps', 'Two, with a carbocation', 'One, concerted'], ['Base', 'Weak (solvent) enough', 'Strong base needed'], ['Substrate', '3° best', '1°, 2° and 3° possible'], ['Conditions', 'Polar solvent, heat', 'Alcoholic KOH, heat']], 'Table comparing E1 and E2 in rate law, steps, base, substrate and conditions'),
      n: 'Aqueous potassium hydroxide favours substitution, while concentrated alcoholic potassium hydroxide with heat favours elimination. E two is second order and has no intermediate, and it needs a strong base. E one is first order, goes through a carbocation, and a weak base is enough. E one often competes with S N one.',
    }),
    sl('check', 'Quick check: the fastest SN1 reaction', {
      b: 'Choose the alkyl halide that reacts fastest by the SN1 route.',
      n: 'Quick check. The slow step forms a carbocation, so choose the halide that gives the most stable one.',
      chk: 'sn1-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Inductive effect: permanent, through σ bonds, falls with distance; −I groups strengthen acids (CH₃COOH < ClCH₂COOH < Cl₃CCOOH).',
        'Mesomeric: permanent shift of π or lone-pair electrons (+M: –OH, –NH₂; −M: –NO₂). Electromeric: temporary, only with a reagent.',
        'Hyperconjugation: σ C–H electrons next to a cation or π bond; more α C–H bonds, more stability.',
        'SN1: first order, carbocation, racemisation. SN2: second order, inversion. E1 and E2 mirror these with a β-hydrogen lost.',
      ],
      v: table(['Mechanism', 'Rate law', 'Key point'], [['SN1', 'k[RX]', 'Carbocation; racemisation'], ['SN2', 'k[RX][Nu]', 'Backside attack; inversion'], ['E1', 'k[RX]', 'Carbocation; weak base'], ['E2', 'k[RX][base]', 'One step; strong base']], 'Summary table of SN1, SN2, E1 and E2 with the rate law and key point'),
      n: 'In summary. The inductive effect acts through sigma bonds and falls with distance. The mesomeric effect is a permanent shift of pi or lone pair electrons, while the electromeric effect is temporary. Hyperconjugation stabilises cations by sigma carbon hydrogen overlap. S N one and E one are first order through a carbocation. S N two and E two are second order and take one step.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw curved arrows from the electron source (a lone pair or a bond) to where the pair goes; check that each arrow starts at electrons.',
        'Give the rate law, the number of steps and the stereochemistry when comparing SN1 and SN2.',
        'Name the conditions: aqueous KOH for substitution, alcoholic KOH with heat for elimination.',
        'Use "temporary" for the electromeric effect and "permanent" for inductive and mesomeric.',
      ],
      v: table(['Slip', 'Fix'], [['Arrow starting from an atom', 'Start at the lone pair or at the bond'], ['SN2 gives racemisation', 'SN2 inverts; SN1 racemises'], ['E2 has a carbocation intermediate', 'E2 is one concerted step']], 'Table of three common slips in mechanisms with the fix'),
      n: 'Some tips. Curved arrows must start at electrons, either a lone pair or a bond, and end where the pair goes. When comparing the two substitution mechanisms give the rate law, the number of steps and the stereochemistry. Name the conditions for substitution and elimination. And call the electromeric effect temporary, while the others are permanent.',
    }),
  ],
});
