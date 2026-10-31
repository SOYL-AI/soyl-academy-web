// ISC 12 Chemistry ch20 Cyanides, Isocyanides and Diazonium Salts — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cyanides, Isocyanides and Diazonium Salts — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Cyanides and isocyanides',
      r`**Nitriles** R–C≡N (alkanenitriles; CH₃CN ethanenitrile) and **isocyanides** R–N≡C (isocyanoalkanes): functional isomers.

**Cyanides:** RX + ethanolic KCN (ionic; C attacks; +1 C); amide + P₂O₅, heat. **Isocyanides:** RX + AgCN (covalent; N attacks); 1° amine + CHCl₃ + alcoholic KOH (carbylamine).

| Property | Nitrile | Isocyanide |
|---|---|---|
| Smell | Pleasant | Foul |
| Hydrolysis (H⁺) | RCOOH + NH₄⁺ | RNH₂ + HCOOH |
| Reduction | RCH₂NH₂ (1°) | RNHCH₃ (2°) |
| Heating | Stable | Isomerises to nitrile |`,
      [kt('Nitrile', 'A compound R–C≡N, named as an alkanenitrile.'), kt('Isocyanide', 'A compound R–N≡C, isomeric with the nitrile.')],
      [fm(r`\ce{CH3CH2I + AgCN -> CH3CH2NC + AgI}`, 'Isocyanide from AgCN')],
      table(['Reagent with RX', 'Product'], [['KCN', 'Nitrile'], ['AgCN', 'Isocyanide']], 'Table of cyanide reagents'),
      [1],
    ),
    sec(
      '2. Preparation and stability of diazonium salts',
      r`**Diazotisation:** $\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}$ at **273–278 K** (ice); HNO₂ formed in situ; excess HNO₂ turns starch–iodide paper blue. Aryl diazonium ions are resonance-stabilised but decompose on warming (→ phenol + N₂); dry salts are explosive; alkyl diazonium ions decompose at once.`,
      [kt('Diazotisation', 'Conversion of a primary aromatic amine into a diazonium salt with nitrous acid in the cold.')],
      [fm(r`\ce{C6H5N2Cl + H2O -> C6H5OH + N2 + HCl}`, 'Decomposition on warming')],
      table(['Condition', 'Result'], [['273–278 K', 'Stable in solution'], ['Warm', 'Phenol + N₂'], ['Dry', 'Explosive']], 'Table of diazonium stability'),
      [2],
    ),
    sec(
      '3. Replacement reactions',
      `| Reagent | Product |
|---|---|
| CuCl/HCl (Sandmeyer) | ArCl |
| CuBr/HBr (Sandmeyer) | ArBr |
| CuCN/KCN (Sandmeyer) | ArCN |
| Cu powder + HCl/HBr (Gattermann) | ArCl/ArBr |
| KI, warm | ArI |
| HBF₄; heat (Balz–Schiemann) | ArF |
| H₃PO₂ or CH₃CH₂OH | ArH |
| H₂O, warm | ArOH |
| ArN₂BF₄ + NaNO₂, Cu, heat | ArNO₂ |

In each case N₂ is evolved and the new group occupies the position of –N₂⁺.`,
      [kt('Sandmeyer reaction', 'Replacement of –N₂⁺ by Cl, Br or CN using copper(I) salts.'), kt('Balz–Schiemann reaction', 'Preparation of aryl fluorides by heating arenediazonium fluoroborates.')],
      [fm(r`\ce{C6H5N2BF4 -> C6H5F + BF3 + N2}`, 'Balz–Schiemann')],
      table(['Group', 'Reagent'], [['–F', 'HBF₄, heat'], ['–I', 'KI'], ['–H', 'H₃PO₂'], ['–CN', 'CuCN']], 'Table of key replacements'),
      [3],
    ),
    sec(
      '4. Coupling and synthetic importance',
      r`**Coupling** (para): phenol in mildly alkaline solution → 4-hydroxyazobenzene (orange); 2-naphthol → orange-red dye (test for ArNH₂); aniline or N,N-dimethylaniline in mildly acidic solution → 4-aminoazobenzene (yellow) or butter yellow. Colour from the conjugated –N=N– system.

**Importance:** introduces F, I, CN, OH not possible directly; –NH₂ used as a removable director (aniline → 2,4,6-tribromoaniline → diazotise → H₃PO₂ → 1,3,5-tribromobenzene); dyes.`,
      [kt('Azo coupling', 'Electrophilic substitution of an activated arene by a diazonium ion to give Ar–N=N–Ar′.')],
      [fm(r`\ce{C6H5N2Cl + C6H5NH2 -> H2NC6H4N=NC6H5 + HCl}`, 'Coupling with aniline')],
      table(['Partner', 'pH', 'Product'], [['Phenol', 'Alkaline', '4-Hydroxyazobenzene'], ['Aniline', 'Mildly acidic', '4-Aminoazobenzene']], 'Table of coupling'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- AgCN giving nitriles (it gives isocyanides).
- Isocyanide hydrolysis giving a carboxylic acid with the same carbons.
- Diazotising at room temperature.
- Coupling phenol in acid or aniline in alkali.

**How marks are usually awarded**
- Replacement reactions (1 mark each): reagent, condition, product.
- Syntheses (1 mark per step): every intermediate named.
- Coupling (2 marks): equation with pH and product colour.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'IUPAC name of CH₃CN?', 'Ethanenitrile.', 'fact', 1),
    fc(2, 'RX + KCN?', 'Nitrile RCN.', 'fact', 1),
    fc(3, 'RX + AgCN?', 'Isocyanide RNC.', 'fact', 1),
    fc(4, 'Amide + P₂O₅?', 'Nitrile.', 'fact', 1),
    fc(5, 'Carbylamine reaction product?', 'Isocyanide.', 'fact', 1),
    fc(6, 'Nitrile hydrolysis?', 'Carboxylic acid + NH₄⁺.', 'fact', 1),
    fc(7, 'Isocyanide hydrolysis?', 'Amine + methanoic acid.', 'fact', 1),
    fc(8, 'Nitrile reduction?', 'Primary amine.', 'fact', 1),
    fc(9, 'Isocyanide reduction?', 'Secondary amine.', 'fact', 1),
    fc(10, 'Which isomer smells foul?', 'Isocyanide.', 'fact', 1),
    fc(11, 'Diazotisation temperature?', '273–278 K.', 'fact', 2),
    fc(12, 'Why keep diazonium salts cold?', 'They decompose to phenol + N₂.', 'concept', 2),
    fc(13, 'Why are aryl diazonium ions more stable?', 'Resonance with the ring.', 'concept', 2),
    fc(14, 'Test for excess HNO₂?', 'Starch–iodide paper turns blue.', 'fact', 2),
    fc(15, 'Sandmeyer reagents?', 'CuCl/HCl, CuBr/HBr, CuCN/KCN.', 'fact', 3),
    fc(16, 'Gattermann reagent?', 'Cu powder + HX.', 'fact', 3),
    fc(17, 'ArN₂⁺ → ArI?', 'Warm with KI.', 'fact', 3),
    fc(18, 'ArN₂⁺ → ArF?', 'HBF₄, then heat (Balz–Schiemann).', 'fact', 3),
    fc(19, 'ArN₂⁺ → ArH?', 'H₃PO₂ or ethanol.', 'fact', 3),
    fc(20, 'ArN₂⁺ → ArOH?', 'Warm water.', 'fact', 3),
    fc(21, 'ArN₂⁺ → ArNO₂?', 'ArN₂BF₄ + NaNO₂, Cu, heat.', 'fact', 3),
    fc(22, 'Coupling pH for phenol?', 'Mildly alkaline.', 'fact', 4),
    fc(23, 'Coupling pH for aniline?', 'Mildly acidic.', 'fact', 4),
    fc(24, 'Position of coupling?', 'Para to –OH or –NH₂.', 'fact', 4),
    fc(25, 'Phenol coupling product?', '4-Hydroxyazobenzene (orange).', 'fact', 4),
    fc(26, 'Aniline coupling product?', '4-Aminoazobenzene (yellow).', 'fact', 4),
    fc(27, 'Why are azo compounds coloured?', 'Extended conjugation through –N=N–.', 'concept', 4),
    fc(28, 'Test for ArNH₂?', 'Diazotise, couple with alkaline 2-naphthol: orange-red.', 'fact', 4),
    fc(29, '1,3,5-Tribromobenzene from aniline?', 'Br₂(aq); diazotise; H₃PO₂.', 'fact', 4),
    fc(30, 'Benzoic acid from aniline?', 'Diazotise; CuCN; hydrolyse.', 'fact', 4),
    fc(31, 'Exam tip: syntheses', 'Name every intermediate and reagent.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
