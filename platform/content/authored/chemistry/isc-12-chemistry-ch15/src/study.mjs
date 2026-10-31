// ISC 12 Chemistry ch15 Phenols and Ethers — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Phenols and Ethers — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Phenols: classification, names and preparation',
      r`Mono-, di-, trihydric phenols: phenol; cresols (methylphenols); catechol (1,2-), resorcinol (1,3-), quinol (1,4-diol); pyrogallol (1,2,3-triol).

**Preparation:** (1) $\ce{C6H5N2Cl + H2O ->[warm] C6H5OH + N2 + HCl}$; (2) Dow: C₆H₅Cl + NaOH, 623 K, 300 atm, then acid; (3) C₆H₅SO₃Na fused with NaOH (573 K), then acid; (4) **cumene process:** benzene + propene → cumene → (O₂) cumene hydroperoxide → (H⁺) phenol + propanone.`,
      [kt('Cumene', 'Isopropylbenzene, C₆H₅CH(CH₃)₂, made from benzene and propene.')],
      [fm(r`\ce{C6H5C(CH3)2OOH ->[H+] C6H5OH + CH3COCH3}`, 'Cumene hydroperoxide cleavage')],
      table(['Method', 'Key condition'], [['Diazonium salt', 'Warm with water'], ['Dow', '623 K, 300 atm'], ['Sulphonate fusion', 'NaOH, 573 K'], ['Cumene', 'O₂, then H⁺']], 'Table of preparations of phenol'),
      [1],
    ),
    sec(
      '2. Physical properties, acidity and reactions of the –OH group',
      r`Phenol: colourless solid (m.p. 316 K), corrosive, turns pink in air; H-bonding → high b.p.; moderately soluble in water. 2-Nitrophenol: **intramolecular** H-bond → more volatile (steam distillable) than 4-nitrophenol.

**Acidity:** pKa 10.0 (ethanol 15.9) — **phenoxide resonance**. o/p-NO₂ increase acidity (4-nitro 7.1; picric acid 0.4); –CH₃, –OCH₃ decrease. Dissolves in NaOH, not in NaHCO₃.

**Reactions:** NaOH, Na → C₆H₅ONa; Zn dust → C₆H₆; CH₃COCl or (CH₃CO)₂O → phenyl ethanoate; PCl₅ → poor yield of C₆H₅Cl (C–O partial double bond), mainly (C₆H₅O)₃PO.`,
      [kt('Phenoxide ion', 'C₆H₅O⁻, stabilised by delocalisation of its negative charge into the ring.'), kt('Intramolecular hydrogen bond', 'A hydrogen bond within one molecule, e.g. in 2-nitrophenol.')],
      [fm(r`\ce{C6H5OH + NaOH -> C6H5ONa + H2O}`, 'Phenol with NaOH')],
      V.phenoxide,
      [2],
    ),
    sec(
      '3. Electrophilic substitution, named reactions, tests and uses',
      r`–OH activates (+R), o/p directing. Br₂(aq) → **2,4,6-tribromophenol** (white ppt); Br₂/CS₂, 273 K → 4- (and 2-) bromophenol. Dilute HNO₃ → 2- and 4-nitrophenol; conc. HNO₃ → **picric acid**. Conc. H₂SO₄: 2-sulphonic acid at about 290 K, 4- at about 373 K.

**Kolbe:** C₆H₅ONa + CO₂ (400 K, 4–7 atm), H⁺ → **salicylic acid**. **Reimer–Tiemann:** CHCl₃ + NaOH (via :CCl₂), H⁺ → **salicylaldehyde**.

**Tests:** neutral FeCl₃ → violet; azo dye with benzenediazonium chloride (alkaline, cold) → orange 4-hydroxyazobenzene; bromine water → white ppt. **Uses:** antiseptics, Bakelite, aspirin, dyes, picric acid.`,
      [kt('Kolbe reaction', 'Carboxylation of sodium phenoxide with CO₂ to give salicylic acid.'), kt('Reimer–Tiemann reaction', 'Formylation of phenol with CHCl₃ and NaOH to give salicylaldehyde.')],
      [fm(r`\ce{C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr}`, 'Bromine water'), fm(r`\ce{C6H5OH + CHCl3 + 3NaOH -> HOC6H4CHO + 3NaCl + 2H2O}`, 'Reimer–Tiemann')],
      table(['Test', 'Phenol'], [['FeCl₃ (neutral)', 'Violet'], ['Br₂(aq)', 'White ppt'], ['Diazonium salt, alkaline', 'Orange dye']], 'Table of tests for phenol'),
      [3],
    ),
    sec(
      '4. Aliphatic ethers',
      r`O sp³; C–O–C ≈ 111.7°; named as alkoxyalkanes (2-ethoxypropane). **Williamson:** RONa + primary R′X (SN2); tertiary groups go on the alkoxide (tertiary halides eliminate). Also 2ROH → ROR (conc. H₂SO₄, 413 K).

**Physical:** no O–H → b.p. close to alkanes; accept H-bonds → lower ethers soluble like alcohols; volatile, flammable solvents.

**Reactions:** Cl₂ (dark: α-chloro; light: perchloro); O₂ (air, light) → explosive **peroxides** (test FeSO₄/KSCN; remove with acidified FeSO₄); PCl₅ → 2RCl + POCl₃; HI: cold 1 mol → smaller (or tertiary) group becomes RI + alcohol; hot excess → 2RI.`,
      [kt('Williamson synthesis', 'Preparation of an ether from an alkoxide (or phenoxide) and a primary alkyl halide.'), kt('Ether peroxides', 'Explosive compounds formed slowly when ethers stand in air and light.')],
      [fm(r`\ce{C2H5OC2H5 + 2HI -> 2C2H5I + H2O}`, 'Hot excess HI')],
      V.angles,
      [4],
    ),
    sec(
      '5. Anisole',
      r`**Preparation:** C₆H₅ONa + CH₃I → C₆H₅OCH₃ + NaI. –OCH₃ activates (+R), o/p directing, para major: Br₂ in ethanoic acid (no catalyst) → 4-bromoanisole; HNO₃/H₂SO₄ → 4-nitroanisole; CH₃Cl/AlCl₃ → 4-methylanisole; CH₃COCl/AlCl₃ → 4-methoxyacetophenone. **HI** → phenol + CH₃I (aryl C–O does not break).

**Uses of ethers:** ethoxyethane — solvent, Grignard reactions, early anaesthetic; methoxymethane — refrigerant, propellant; anisole — perfumes.`,
      [kt('Anisole', 'Methoxybenzene, C₆H₅OCH₃.')],
      [fm(r`\ce{C6H5OCH3 + HI -> C6H5OH + CH3I}`, 'Cleavage of anisole')],
      table(['Reagent', 'Major product'], [['Br₂/CH₃COOH', '4-Bromoanisole'], ['HNO₃/H₂SO₄', '4-Nitroanisole'], ['CH₃COCl/AlCl₃', '4-Methoxyacetophenone'], ['HI', 'Phenol + CH₃I']], 'Table of reactions of anisole'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying phenol reacts with NaHCO₃.
- Giving monobromophenol for bromine water (it is 2,4,6-tribromophenol).
- Using a tertiary halide in Williamson’s synthesis.
- Writing iodobenzene as a product of anisole + HI.

**How marks are usually awarded**
- Acidity (2 marks): resonance structures of phenoxide; substituent effects.
- Named reactions (1–2 marks): reagents, conditions and product names.
- Ether cleavage (1–2 marks): products with the mechanism that decides them.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Resorcinol?', 'Benzene-1,3-diol.', 'fact', 1),
    fc(2, 'Pyrogallol?', 'Benzene-1,2,3-triol.', 'fact', 1),
    fc(3, 'Cumene process products?', 'Phenol + propanone.', 'fact', 1),
    fc(4, 'Phenol from sodium benzenesulphonate?', 'Fuse with NaOH (573 K), then acid.', 'fact', 1),
    fc(5, 'Phenol from diazonium salt?', 'Warm with water.', 'fact', 1),
    fc(6, 'pKa of phenol vs ethanol?', '10.0 vs 15.9.', 'fact', 2),
    fc(7, 'Why is phenol acidic?', 'Phenoxide resonance stabilisation.', 'concept', 2),
    fc(8, 'Effect of p-NO₂ on acidity?', 'Increases it.', 'concept', 2),
    fc(9, 'Does phenol react with NaHCO₃?', 'No.', 'fact', 2),
    fc(10, 'Phenol + Zn dust?', 'Benzene.', 'fact', 2),
    fc(11, 'Why poor yield with PCl₅?', 'C–O partial double-bond character.', 'concept', 2),
    fc(12, 'Why is 2-nitrophenol steam volatile?', 'Intramolecular H-bond.', 'concept', 2),
    fc(13, 'Phenol + bromine water?', '2,4,6-Tribromophenol (white ppt).', 'fact', 3),
    fc(14, 'Phenol + Br₂/CS₂ at 273 K?', '4-Bromophenol (mainly).', 'fact', 3),
    fc(15, 'Phenol + conc. HNO₃?', 'Picric acid.', 'fact', 3),
    fc(16, 'Kolbe product?', 'Salicylic acid.', 'fact', 3),
    fc(17, 'Reimer–Tiemann product?', 'Salicylaldehyde.', 'fact', 3),
    fc(18, 'Electrophile in Reimer–Tiemann?', 'Dichlorocarbene, :CCl₂.', 'fact', 3),
    fc(19, 'FeCl₃ test for phenol?', 'Violet colour.', 'fact', 3),
    fc(20, 'Azo dye test colour?', 'Orange (4-hydroxyazobenzene).', 'fact', 3),
    fc(21, 'Williamson synthesis?', 'RONa + primary R′X → ROR′.', 'definition', 4),
    fc(22, 'Why not tertiary halides in Williamson?', 'Elimination to alkene.', 'concept', 4),
    fc(23, 'Why do ethers boil like alkanes?', 'No O–H; no H-bonds between molecules.', 'concept', 4),
    fc(24, 'Ether + PCl₅?', '2RCl + POCl₃.', 'fact', 4),
    fc(25, 'Danger of old ether?', 'Explosive peroxides.', 'fact', 4),
    fc(26, 'CH₃OR (1°) + HI?', 'CH₃I + ROH.', 'fact', 4),
    fc(27, '(CH₃)₃COR + HI?', '(CH₃)₃CI + ROH (SN1).', 'fact', 4),
    fc(28, 'Anisole preparation?', 'C₆H₅ONa + CH₃I.', 'fact', 5),
    fc(29, 'Anisole + HI?', 'Phenol + CH₃I.', 'fact', 5),
    fc(30, 'Major product of anisole bromination?', '4-Bromoanisole (no catalyst needed).', 'fact', 5),
    fc(31, 'Exam tip: bromination of phenol', 'State the solvent: water → tribromo; CS₂ → mono.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
