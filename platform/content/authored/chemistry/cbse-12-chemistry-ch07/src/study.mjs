// ch07 Alcohols, Phenols and Ethers — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Alcohols, Phenols and Ethers — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Classification, nomenclature and structure',
      r`**Alcohols:** mono-, di-, trihydric; 1°, 2°, 3° by the carbon bearing –OH; allylic and benzylic alcohols; vinylic/aryl –OH are enols/phenols. **Phenols:** –OH on an aromatic carbon (phenol, cresols, catechol, resorcinol, quinol). **Ethers:** R–O–R (symmetrical) or R–O–R′ (unsymmetrical).

**IUPAC:** alkan-n-ol (propan-2-ol, 2-methylpropan-2-ol, propane-1,2,3-triol); substituted phenols (2-methylphenol, benzene-1,2-diol); ethers as alkoxyalkanes (methoxyethane, methoxybenzene = anisole, 2-methoxy-2-methylpropane).

**Structure:** O is sp³ with two lone pairs. C–O–H in methanol 108.9°; C–O–C in methoxymethane about 111.7° (bulky groups repel). In phenol the C–O bond (136 pm) is shorter than in methanol (142 pm): partial double-bond character from resonance and the sp² carbon.`,
      [kt('Primary alcohol', 'An alcohol whose –OH carbon is bonded to one other carbon.'), kt('Phenol', 'A compound with –OH directly attached to an aromatic ring carbon.'), kt('Unsymmetrical ether', 'An ether whose two groups on oxygen are different.')],
      [],
      V.angles,
      [1],
    ),
    sec(
      '2. Preparation of alcohols and phenols',
      r`**Alcohols:**
- Acid-catalysed hydration of alkenes (Markovnikov): propene → propan-2-ol.
- Hydroboration–oxidation (B₂H₆; H₂O₂/OH⁻): anti-Markovnikov, propene → propan-1-ol.
- Reduction: aldehydes → 1°, ketones → 2° (H₂/Pd, Ni; NaBH₄; LiAlH₄); acids and esters → 1° (LiAlH₄).
- Grignard reagents + carbonyl compounds, then hydrolysis: HCHO → 1°, RCHO → 2°, R₂CO → 3°.

**Phenol:**
- From chlorobenzene: NaOH at 623 K, 300 atm, then acid.
- From benzenesulfonic acid: fuse the sodium salt with NaOH, then acid.
- From diazonium salts: warm with water, $\ce{C6H5N2Cl + H2O -> C6H5OH + N2 + HCl}$.
- **Cumene process:** $\ce{C6H5CH(CH3)2 + O2 -> C6H5C(CH3)2OOH}$; $\ce{C6H5C(CH3)2OOH ->[H+] C6H5OH + CH3COCH3}$ (phenol + propanone).`,
      [kt('Hydroboration–oxidation', 'Addition of B₂H₆ to an alkene followed by H₂O₂/OH⁻, giving the anti-Markovnikov alcohol.'), kt('Cumene', 'Isopropylbenzene, oxidised by air in the industrial production of phenol and propanone.')],
      [],
      table(['Grignard + carbonyl', 'Alcohol after hydrolysis'], [['RMgX + HCHO', 'RCH₂OH (1°)'], ['RMgX + R′CHO', 'RR′CHOH (2°)'], ['RMgX + R′COR″', 'RR′R″COH (3°)']], 'Grignard reagents and carbonyl compounds giving primary, secondary and tertiary alcohols'),
      [2],
      [flow('LR', [['a', 'Cumene'], ['b', 'Cumene hydroperoxide'], ['c', 'Phenol + propanone']], [['a', 'b', 'O₂'], ['b', 'c', 'H⁺']], 'Flow of the cumene process')],
    ),
    sec(
      '3. Physical and chemical properties of alcohols and phenols',
      r`**Physical:** hydrogen bonding gives high boiling points (ethanol 351 K vs methoxymethane 248 K and propane 231 K); lower alcohols are miscible with water; bp rises with chain length and falls with branching.

**Acidity:** alcohols < water < phenol (pKa: ethanol 15.9, water 15.7, phenol 10.0). Phenoxide is resonance-stabilised; electron-withdrawing groups (–NO₂ at o/p) increase acidity (4-nitrophenol 7.1, picric acid 0.5); electron-releasing groups (–CH₃) decrease it. Alcohols and phenols react with Na; phenol also with NaOH; neither with NaHCO₃.

**Alcohols:** esterification $\ce{CH3COOH + C2H5OH <=>[H+] CH3COOC2H5 + H2O}$; with HX (3° > 2° > 1°; Lucas test); with PX₃, SOCl₂; dehydration (conc. H₂SO₄: ethanol → ethene at 443 K, → ethoxyethane at 413 K; ease 3° > 2° > 1°); oxidation 1° → aldehyde (PCC or Cu, 573 K) → acid (KMnO₄, K₂Cr₂O₇), 2° → ketone, 3° resist (alkene over hot Cu).

**Phenol:** –OH activates the ring (o/p): bromine water → 2,4,6-tribromophenol (white ppt); Br₂ in CS₂ at 273 K → mono-bromophenols; dilute HNO₃ → o- and p-nitrophenol (o-isomer steam-volatile, intramolecular H-bond); conc. HNO₃ → picric acid. **Kolbe:** sodium phenoxide + CO₂ → salicylic acid. **Reimer–Tiemann:** CHCl₃ + NaOH → salicylaldehyde. Zn dust → benzene; Na₂Cr₂O₇/H₂SO₄ → benzoquinone. Neutral FeCl₃ gives a violet colour.`,
      [kt('Lucas test', 'Distinguishes 1°, 2° and 3° alcohols by the rate of turbidity with conc. HCl/ZnCl₂.'), kt('Kolbe’s reaction', 'Carboxylation of sodium phenoxide with CO₂ to give salicylic acid.'), kt('Reimer–Tiemann reaction', 'Formylation of phenol with CHCl₃ and NaOH to give salicylaldehyde.')],
      [],
      V.phenoxide,
      [3],
      [V.hbond, table(['Compound', 'pKa'], [['Ethanol', '15.9'], ['Water', '15.7'], ['Phenol', '10.0'], ['4-Nitrophenol', '7.1'], ['Picric acid', '0.5']], 'pKa values')],
    ),
    sec(
      '4. Commercially important alcohols',
      r`**Methanol (wood spirit):** $\ce{CO + 2H2 ->[ZnO/Cr2O3] CH3OH}$ (573–673 K, 200–300 atm). Solvent for paints and varnishes; used to make methanal. Highly poisonous: small quantities cause blindness, larger ones death.

**Ethanol:** fermentation of molasses or starch. $\ce{C12H22O11 + H2O ->[invertase] C6H12O6 + C6H12O6}$; $\ce{C6H12O6 ->[zymase] 2C2H5OH + 2CO2}$. Solvent, sanitisers, beverages, fuel blended with petrol. Industrial alcohol is **denatured** (methanol and a dye such as pyridine added) to make it unfit to drink.`,
      [kt('Denatured alcohol', 'Ethanol made unfit to drink by adding methanol and other substances.'), kt('Fermentation', 'Slow breakdown of sugars by enzymes of yeast to ethanol and carbon dioxide.')],
      [],
      table(['Alcohol', 'Made from', 'Use', 'Hazard'], [['Methanol', 'CO + H₂', 'Solvent, methanal', 'Blindness, death'], ['Ethanol', 'Fermentation of sugars', 'Solvent, fuel, sanitiser', 'Intoxicating']], 'Methanol and ethanol compared'),
      [4],
    ),
    sec(
      '5. Ethers',
      r`**Preparation:** Williamson synthesis — alkoxide/phenoxide + **primary** alkyl halide (SN2): $\ce{C2H5ONa + CH3I -> C2H5OCH3 + NaI}$. With 3° halides, elimination occurs, so the bulky group must be on the alkoxide. Dehydration of 1° alcohols at 413 K gives symmetrical ethers.

**Physical:** bp close to alkanes of similar mass (no H-bonding between molecules); solubility in water similar to alcohols of similar size (they H-bond to water).

**Reactions:** cleavage by HI (or HBr): methyl alkyl ethers → CH₃I + alcohol (SN2 at methyl); tertiary alkyl ethers → tertiary halide + methanol (SN1); aryl alkyl ethers → phenol + alkyl halide ($\ce{C6H5OCH3 + HI -> C6H5OH + CH3I}$). Anisole: –OCH₃ activates the ring, o/p-directing — bromination in ethanoic acid gives mainly 4-bromoanisole; nitration and Friedel–Crafts reactions give mainly para products.`,
      [kt('Williamson synthesis', 'Preparation of ethers by reaction of an alkoxide or phenoxide with a primary alkyl halide.')],
      [],
      table(['Ether + HI', 'Products'], [['CH₃OC₂H₅', 'CH₃I + C₂H₅OH'], ['(CH₃)₃COCH₃', '(CH₃)₃CI + CH₃OH'], ['C₆H₅OCH₃', 'C₆H₅OH + CH₃I']], 'Products of cleavage of ethers by HI'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using a tertiary alkyl halide in a Williamson synthesis (elimination occurs).
- Writing iodobenzene as a product of anisole + HI (phenol + CH₃I form).
- Saying phenol reacts with NaHCO₃ (it is weaker than carbonic acid).
- Forgetting "then H₃O⁺/acidify" in Grignard, Kolbe and Reimer–Tiemann reactions.
- Saying tertiary alcohols oxidise to ketones.

**How marks are usually awarded**
- 1-mark items: product, reagent, name or order.
- Conversions (2–3 marks): reagent and condition per step (½–1) + correct product.
- Acidity explanations: compare the stability of the conjugate bases (resonance, +I/−I/−R) (1–2 marks).
- Tests: reagent (½–1) + observation for each compound (½–1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'IUPAC name of (CH₃)₃COH?', '2-Methylpropan-2-ol (a tertiary alcohol).', 'example', 1),
    fc(2, 'IUPAC name of anisole?', 'Methoxybenzene.', 'example', 1),
    fc(3, 'C–O–H angle in methanol?', 'About 108.9° — slightly less than tetrahedral (lone-pair repulsion).', 'fact', 1),
    fc(4, 'Why is the C–O bond in phenol shorter than in methanol?', 'Partial double-bond character (resonance) and an sp² carbon.', 'concept', 1),
    fc(5, 'Acid hydration vs hydroboration of propene?', 'H⁺/H₂O → propan-2-ol (Markovnikov); B₂H₆ then H₂O₂/OH⁻ → propan-1-ol.', 'concept', 2),
    fc(6, 'RMgX + methanal, then H₃O⁺?', 'A primary alcohol RCH₂OH.', 'formula', 2),
    fc(7, 'RMgX + ketone, then H₃O⁺?', 'A tertiary alcohol.', 'formula', 2),
    fc(8, 'Products of the cumene process?', 'Phenol and propanone.', 'fact', 2),
    fc(9, 'Phenol from a diazonium salt?', 'Warm C₆H₅N₂⁺Cl⁻ with water: phenol + N₂ + HCl.', 'formula', 2),
    fc(10, 'Why do alcohols boil higher than ethers of similar mass?', 'Intermolecular hydrogen bonding between O–H groups.', 'concept', 3),
    fc(11, 'Order of acidity: water, ethanol, phenol?', 'Ethanol < water < phenol.', 'fact', 3),
    fc(12, 'Why is phenol more acidic than ethanol?', 'Phenoxide is stabilised by resonance; ethoxide is destabilised by the +I ethyl group.', 'concept', 3),
    fc(13, 'Effect of –NO₂ at para position on phenol’s acidity?', 'Increases it (−R, −I stabilise phenoxide).', 'concept', 3),
    fc(14, 'Lucas test result for a 3° alcohol?', 'Immediate turbidity at room temperature.', 'fact', 3),
    fc(15, 'Dehydration of ethanol with conc. H₂SO₄ at 443 K and 413 K?', '443 K: ethene; 413 K: ethoxyethane.', 'fact', 3),
    fc(16, 'Oxidation products of 1°, 2°, 3° alcohols?', '1° → aldehyde → acid; 2° → ketone; 3° resist.', 'concept', 3),
    fc(17, 'Reagent to stop oxidation of a 1° alcohol at the aldehyde?', 'PCC (pyridinium chlorochromate), or Cu at 573 K.', 'fact', 3),
    fc(18, 'Phenol + bromine water?', '2,4,6-Tribromophenol (white precipitate).', 'example', 3),
    fc(19, 'Kolbe’s reaction product?', 'Salicylic acid (2-hydroxybenzoic acid).', 'fact', 3),
    fc(20, 'Reimer–Tiemann product?', 'Salicylaldehyde (2-hydroxybenzaldehyde).', 'fact', 3),
    fc(21, 'Why is o-nitrophenol steam-volatile but p-nitrophenol not?', 'o-Nitrophenol has intramolecular H-bonding; p-nitrophenol associates intermolecularly.', 'concept', 3),
    fc(22, 'Test for phenol with FeCl₃?', 'Neutral FeCl₃ gives a violet colour.', 'fact', 3),
    fc(23, 'How is methanol made industrially?', 'CO + 2H₂ over ZnO–Cr₂O₃ at high temperature and pressure.', 'formula', 4),
    fc(24, 'Enzymes in the fermentation of sucrose to ethanol?', 'Invertase (sucrose → glucose + fructose) and zymase (glucose → ethanol + CO₂).', 'fact', 4),
    fc(25, 'What is denatured alcohol?', 'Ethanol made unfit to drink by adding methanol and a dye.', 'definition', 4),
    fc(26, 'Why is methanol dangerous to drink?', 'It is highly poisonous; small amounts can cause blindness.', 'fact', 4),
    fc(27, 'Williamson synthesis?', 'RO⁻Na⁺ + R′X (primary) → R–O–R′ + NaX (SN2).', 'formula', 5),
    fc(28, 'Why not use a tertiary halide in Williamson synthesis?', 'The alkoxide acts as a base and elimination gives an alkene.', 'concept', 5),
    fc(29, 'Products of anisole + HI?', 'Phenol + iodomethane.', 'example', 5),
    fc(30, 'Bromination of anisole in ethanoic acid gives mainly…?', '4-Bromoanisole (methoxy group is o/p-directing; para major).', 'example', 5),
    fc(31, 'Exam tip: phenol vs carboxylic acid', 'Carboxylic acids give CO₂ with NaHCO₃; phenol does not.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
