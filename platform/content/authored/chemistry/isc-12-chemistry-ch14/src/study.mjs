// ISC 12 Chemistry ch14 Alcohols — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Alcohols — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Classification, structure, names and physical properties',
      `Mono-, di-, trihydric; monohydric CₙH₂ₙ₊₁OH are **1°, 2°, 3°**. IUPAC: alkan-n-ol (3-methylbutan-1-ol, 2-methylpropan-2-ol); diols keep -e (ethane-1,2-diol). O is sp³; C–O–H ≈ 108.9°; O–H polar.

**Physical:** hydrogen bonding → b.p. much higher than alkanes/ethers of similar mass; b.p. rises with chain length, falls with branching; lower alcohols miscible with water, solubility falls as the alkyl group grows.`,
      [kt('Monohydric alcohol', 'An alcohol with one –OH group.'), kt('Hydrogen bonding', 'Attraction between the δ+ H of an O–H group and a lone pair on another electronegative atom.')],
      [],
      V.hbond,
      [1],
    ),
    sec(
      '2. Preparation',
      r`- **Alkenes:** direct hydration (H₂O/H⁺) or indirect (cold conc. H₂SO₄ then boil with water) — Markovnikov; **hydroboration–oxidation** (B₂H₆; H₂O₂/OH⁻) — anti-Markovnikov.
- **Alkyl halides:** aqueous KOH or moist Ag₂O.
- **Carbonyl reduction:** aldehyde → 1°, ketone → 2° (H₂/Ni, NaBH₄, LiAlH₄); esters/acids → 1° (LiAlH₄).
- **Primary amines + HNO₂:** RNH₂ → ROH + N₂ + H₂O.
- **Grignard:** HCHO → 1°; RCHO → 2°; R₂CO → 3° (then H₃O⁺).`,
      [kt('Hydroboration–oxidation', 'Addition of B₂H₆ to an alkene followed by H₂O₂/OH⁻; gives anti-Markovnikov alcohols.')],
      [fm(r`\ce{CH3MgI + HCHO -> CH3CH2OMgI}`, 'Grignard addition to methanal (then H₃O⁺ gives ethanol)')],
      table(['Carbonyl + RMgX', 'Alcohol'], [['HCHO', '1°'], ['R′CHO', '2°'], ['R′COR″', '3°']], 'Table of Grignard routes'),
      [2],
    ),
    sec(
      '3. Manufacture (outline)',
      r`**Methanol (Bosch):** $\ce{C + H2O -> CO + H2}$ (water gas, 1273 K); $\ce{CO + 2H2 -> CH3OH}$ over ZnO–Cr₂O₃, 573–673 K, 200–300 atm.
**Ethanol (fermentation):** molasses (sucrose) + yeast; invertase: sucrose → glucose + fructose; zymase: $\ce{C6H12O6 -> 2C2H5OH + 2CO2}$.`,
      [kt('Zymase', 'Yeast enzyme complex converting glucose into ethanol and CO₂.'), kt('Water gas', 'A mixture of CO and H₂ made from steam and hot coke.')],
      [fm(r`\ce{CO + 2H2 -> CH3OH}`, 'Methanol synthesis')],
      table(['Product', 'Catalyst'], [['Methanol', 'ZnO–Cr₂O₃'], ['Ethanol', 'Invertase, zymase']], 'Table of manufacture'),
      [3],
    ),
    sec(
      '4. Acidity and reactions of the O–H and C–O bonds',
      r`**Acidity:** 2ROH + 2Na → 2RONa + H₂; alcohols are weaker acids than water (+I of alkyl); CH₃OH > 1° > 2° > 3°.

**C–O cleavage:** HX (HI > HBr > HCl; ZnCl₂ for HCl); PCl₃, PCl₅ (white HCl fumes — test for –OH); SOCl₂ (gaseous by-products).

**Esterification:** RCOOH + R′OH ⇌ RCOOR′ + H₂O (conc. H₂SO₄); acid chlorides (pyridine) and anhydrides give esters irreversibly. **Mechanism:** protonate acid C=O → alcohol O attacks → proton transfer → lose H₂O → lose H⁺; ester O comes from the alcohol.`,
      [kt('Esterification', 'Formation of an ester from an alcohol and a carboxylic acid (or acid chloride/anhydride).')],
      [fm(r`\ce{CH3COOH + C2H5OH <=>[H+] CH3COOC2H5 + H2O}`, 'Esterification')],
      table(['Reagent', 'Product'], [['Na', 'RONa + H₂'], ['PCl₅', 'RCl + POCl₃ + HCl'], ['SOCl₂', 'RCl + SO₂ + HCl'], ['CH₃COCl', 'Ester + HCl']], 'Table of reactions of alcohols'),
      [4],
    ),
    sec(
      '5. Oxidation and dehydration',
      r`**Oxidation:** 1° → aldehyde (PCC; Cu, 573 K) → acid (K₂Cr₂O₇/H⁺, KMnO₄); 2° → ketone; 3° resist (Cu, 573 K → alkene). Dichromate turns orange → green with 1° and 2°.

**Dehydration (conc. H₂SO₄):** ethanol → ethene at 443 K; → ethoxyethane at 413 K (excess ethanol). Ease 3° > 2° > 1°. **Mechanism:** $\ce{CH3CH2OH + H+ -> CH3CH2OH2+}$; $\ce{CH3CH2OH2+ -> CH3CH2+ + H2O}$ (slow); $\ce{CH3CH2+ -> CH2=CH2 + H+}$.`,
      [kt('PCC', 'Pyridinium chlorochromate, a mild oxidant that converts 1° alcohols into aldehydes.')],
      [fm(r`\ce{C2H5OH ->[conc. H2SO4][443 K] CH2=CH2 + H2O}`, 'Dehydration')],
      table(['Alcohol', 'Oxidation product'], [['1°', 'Aldehyde → acid'], ['2°', 'Ketone'], ['3°', 'None (mild)']], 'Table of oxidation products'),
      [5],
    ),
    sec(
      '6. Conversions, Lucas test and uses',
      `**Ascent:** ROH → RCl → RMgCl → + HCHO, H₃O⁺ → RCH₂OH. **Descent:** RCH₂OH → RCOOH → RCONH₂ → RNH₂ (Br₂/KOH, Hofmann) → ROH (HNO₂).

**Lucas test** (anhydrous ZnCl₂ + conc. HCl, room temperature): 3° turbid at once; 2° about 5 min; 1° no turbidity.

**Uses:** methanol — solvent, methanal manufacture, fuel; highly poisonous. Ethanol — solvent, medicines, sanitisers, beverages, fuel blended with petrol.`,
      [kt('Lucas reagent', 'Anhydrous ZnCl₂ in conc. HCl, used to distinguish 1°, 2° and 3° alcohols.'), kt('Hofmann bromamide reaction', 'RCONH₂ + Br₂ + KOH → RNH₂ with one carbon fewer.')],
      [],
      table(['Alcohol class', 'Lucas test'], [['3°', 'Immediate'], ['2°', '≈ 5 min'], ['1°', 'None at room temperature']], 'Table of Lucas test'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying alcohols are stronger acids than water.
- Placing the ¹⁸O label in the water during esterification (it stays in the ester).
- Forgetting temperatures for dehydration (443 K ethene; 413 K ether).
- Grignard + HCHO giving 2° alcohols (it gives 1°).

**How marks are usually awarded**
- Mechanisms (2–3 marks): every step with the intermediate.
- Conversions (1 mark per step): reagent and intermediate.
- Tests (1–2 marks): reagent and observation for each class.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formula of monohydric alcohols?', 'CₙH₂ₙ₊₁OH.', 'formula', 1),
    fc(2, 'IUPAC name of (CH₃)₃COH?', '2-Methylpropan-2-ol.', 'fact', 1),
    fc(3, 'Why do alcohols boil high?', 'Intermolecular hydrogen bonding.', 'concept', 1),
    fc(4, 'Effect of branching on b.p.?', 'Lowers it.', 'concept', 1),
    fc(5, 'Hydroboration–oxidation follows?', 'Anti-Markovnikov.', 'fact', 2),
    fc(6, 'Indirect hydration reagent?', 'Cold conc. H₂SO₄, then boil with water.', 'fact', 2),
    fc(7, 'RNH₂ + HNO₂?', 'ROH + N₂ + H₂O.', 'fact', 2),
    fc(8, 'RMgX + HCHO gives?', '1° alcohol.', 'fact', 2),
    fc(9, 'RMgX + ketone gives?', '3° alcohol.', 'fact', 2),
    fc(10, 'Ketone reduced gives?', '2° alcohol.', 'fact', 2),
    fc(11, 'Methanol catalyst (Bosch)?', 'ZnO–Cr₂O₃.', 'fact', 3),
    fc(12, 'Enzymes in fermentation of molasses?', 'Invertase, zymase.', 'fact', 3),
    fc(13, 'Why are alcohols weaker acids than water?', 'Alkyl +I destabilises alkoxide.', 'concept', 4),
    fc(14, 'Acidity order of alcohols?', 'CH₃OH > 1° > 2° > 3°.', 'fact', 4),
    fc(15, 'Test for –OH with PCl₅?', 'White fumes of HCl.', 'fact', 4),
    fc(16, 'HX reactivity with alcohols?', 'HI > HBr > HCl.', 'fact', 4),
    fc(17, 'Where does ¹⁸O of the alcohol end up?', 'In the ester.', 'concept', 4),
    fc(18, 'First step of esterification mechanism?', 'Protonation of the acid C=O.', 'concept', 4),
    fc(19, 'Why add pyridine with acid chlorides?', 'Removes HCl.', 'concept', 4),
    fc(20, '1° alcohol + PCC?', 'Aldehyde.', 'fact', 5),
    fc(21, '2° alcohol + K₂Cr₂O₇/H⁺?', 'Ketone.', 'fact', 5),
    fc(22, '3° alcohol over Cu at 573 K?', 'Alkene.', 'fact', 5),
    fc(23, 'Ethanol + conc. H₂SO₄ at 443 K?', 'Ethene.', 'fact', 5),
    fc(24, 'Ethanol + conc. H₂SO₄ at 413 K?', 'Ethoxyethane.', 'fact', 5),
    fc(25, 'Slow step of dehydration?', 'Loss of water to form carbocation.', 'concept', 5),
    fc(26, 'Lucas reagent?', 'Anhydrous ZnCl₂ + conc. HCl.', 'definition', 6),
    fc(27, 'Lucas: 3° alcohol?', 'Turbid at once.', 'fact', 6),
    fc(28, 'Ascent of series uses?', 'Grignard + HCHO.', 'concept', 6),
    fc(29, 'Descent of series uses?', 'Hofmann bromamide on the amide.', 'concept', 6),
    fc(30, 'Why is methanol dangerous?', 'Poisonous: blindness, death.', 'fact', 6),
    fc(31, 'Exam tip: dehydration', 'State the temperature: 443 K ethene, 413 K ether.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
