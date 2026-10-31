// ISC 12 Chemistry ch12 Haloalkanes — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Haloalkanes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Classification, names and the C–X bond',
      `Monohaloalkanes CₙH₂ₙ₊₁X: **1°, 2°, 3°** by the carbon bearing X; allylic and benzylic halides; **gem** (both X on one C) and **vic** (adjacent C) dihalides; tri- and polyhalides. IUPAC: halogen prefix + locant (2-bromo-2-methylpropane); CH₂Cl₂ dichloromethane, CHCl₃ trichloromethane (chloroform), CHI₃ triiodomethane (iodoform).

C–X is **polar** (C δ+), attacked by nucleophiles. Bond length increases and bond enthalpy decreases F → I (C–Cl 351, C–Br 293, C–I 234 kJ mol⁻¹), so reactivity RI > RBr > RCl.`,
      [kt('Geminal dihalide', 'Both halogen atoms on the same carbon, e.g. CH₃CHCl₂.'), kt('Vicinal dihalide', 'Halogen atoms on adjacent carbons, e.g. CH₂BrCH₂Br.')],
      [],
      V.polar,
      [1],
    ),
    sec(
      '2. Preparation',
      r`- **Alkanes:** X₂, light (free radical; mixtures).
- **Alkenes:** HX (Markovnikov); HBr + peroxide (anti-Markovnikov); X₂ → vic-dihalide.
- **Alcohols:** HCl/ZnCl₂ (Lucas), HBr, HI; PCl₃, PCl₅, PBr₃ (red P + Br₂); **SOCl₂ best** (SO₂, HCl gases).
- **Finkelstein:** RCl/RBr + NaI, dry acetone → RI (NaCl/NaBr precipitate).
- **Swarts:** RCl/RBr + AgF, Hg₂F₂, SbF₃ → RF.
- **Hunsdiecker:** RCOOAg + Br₂ (CCl₄, heat) → RBr + CO₂ + AgBr (one C fewer).`,
      [kt('Finkelstein reaction', 'Exchange of Cl or Br for I using NaI in dry acetone.'), kt('Hunsdiecker reaction', 'Silver salt of a carboxylic acid + Br₂ → bromoalkane with one carbon fewer.')],
      [fm(r`\ce{C2H5OH + SOCl2 -> C2H5Cl + SO2 + HCl}`, 'Thionyl chloride method'), fm(r`\ce{RCOOAg + Br2 -> RBr + CO2 + AgBr}`, 'Hunsdiecker')],
      table(['Method', 'Reagent'], [['ROH → RCl', 'SOCl₂'], ['RCl → RI', 'NaI/acetone'], ['RBr → RF', 'AgF'], ['RCOOAg → RBr', 'Br₂/CCl₄']], 'Table of preparations'),
      [2],
    ),
    sec(
      '3. Physical properties',
      `CH₃Cl, CH₃Br, C₂H₅Cl are gases; higher members liquids/solids. B.p. higher than alkanes of similar size (polar, heavier); rises with chain length and halogen size (RI > RBr > RCl > RF); falls with branching (smaller surface area). Slightly soluble in water (cannot repay water’s H-bonds), soluble in organic solvents. RBr, RI, CH₂Cl₂, CHCl₃, CCl₄ denser than water.`,
      [kt('Van der Waals forces', 'Weak intermolecular attractions that increase with molecular size and contact area.')],
      [],
      table(['Compound', 'b.p. / K'], [['CH₃Cl', '249'], ['CH₂Cl₂', '313'], ['CHCl₃', '334'], ['CCl₄', '350']], 'Table of boiling points of chloromethanes'),
      [3],
    ),
    sec(
      '4. Nucleophilic substitution: SN1 and SN2',
      r`**SN2:** one step, backside attack; rate $= k[\ce{RX}][\ce{Nu-}]$; **inversion** (Walden); CH₃X > 1° > 2° > 3°.
**SN1:** slow ionisation to a planar carbocation, then fast attack; rate $= k[\ce{RX}]$; **racemisation**; 3° > 2° > 1° > CH₃X; favoured by polar protic solvents; benzylic/allylic fast.

**Optical activity:** a chiral carbon (four different groups) gives enantiomers that rotate plane-polarised light equally in opposite directions (d/+, l/−); racemic mixture inactive.`,
      [kt('Walden inversion', 'Inversion of configuration at carbon in an SN2 reaction.'), kt('Racemic mixture', 'Equal amounts of two enantiomers; optically inactive.')],
      [fm(r`\text{SN2: rate} = k[\ce{RX}][\ce{Nu-}]`, 'SN2 rate law'), fm(r`\text{SN1: rate} = k[\ce{RX}]`, 'SN1 rate law')],
      V.sn2,
      [4],
    ),
    sec(
      '5. Substitution products',
      `| Reagent | Product |
|---|---|
| aq. KOH / moist Ag₂O | ROH |
| NaI (acetone) | RI |
| NH₃ (excess) | RNH₂ |
| R′NH₂ | RNHR′ |
| KCN | RCN (nitrile) |
| AgCN | RNC (isocyanide) |
| KNO₂ | R–O–N=O (alkyl nitrite) |
| AgNO₂ | R–NO₂ (nitroalkane) |
| R′COOAg | R′COOR (ester) |
| LiAlH₄ | RH |

K salts: CN⁻ attacks via C, NO₂⁻ via O (ionic); Ag salts: via N (covalent).`,
      [kt('Ambident nucleophile', 'A nucleophile that can attack through two different atoms, such as CN⁻ or NO₂⁻.')],
      [],
      table(['Salt', 'Attacking atom'], [['KCN', 'C'], ['AgCN', 'N'], ['KNO₂', 'O'], ['AgNO₂', 'N']], 'Table of ambident nucleophiles'),
      [5],
    ),
    sec(
      '6. Elimination and reactions with metals',
      r`**β-Elimination:** alcoholic KOH, heat → alkene; **Saytzeff:** more substituted alkene is major (2-bromopentane → pent-2-ene). Aqueous KOH → substitution; alcoholic KOH → elimination (especially 3°).

**Wurtz:** $\ce{2RX + 2Na ->[dry ether] R-R + 2NaX}$ (symmetrical alkanes). **Grignard:** $\ce{RX + Mg ->[dry ether] RMgX}$; $\ce{RMgX + H2O -> RH + Mg(OH)X}$.`,
      [kt('Saytzeff’s rule', 'In dehydrohalogenation the more substituted alkene is the major product.'), kt('Grignard reagent', 'An alkylmagnesium halide, RMgX, made from RX and Mg in dry ether.')],
      [fm(r`\ce{2RX + 2Na -> R-R + 2NaX}`, 'Wurtz reaction')],
      table(['Reaction', 'Product'], [['RX + alc. KOH', 'Alkene'], ['2RX + 2Na', 'R–R'], ['RX + Mg', 'RMgX']], 'Table of elimination and metal reactions'),
      [6],
    ),
    sec(
      '7. Polyhalogen compounds',
      r`**Chloroform:** from ethanol or acetone + bleaching powder; oxidised in light to **phosgene** ($\ce{2CHCl3 + O2 -> 2COCl2 + 2HCl}$) — stored in dark, full bottles with a little ethanol; with conc. HNO₃ → chloropicrin CCl₃NO₂; with KOH → HCOOK; with Ag → C₂H₂; carbylamine test with 1° amines.
**Iodoform:** ethanol/acetone + I₂ + NaOH → yellow CHI₃; test for CH₃CO– and CH₃CH(OH)–; antiseptic.
**CH₂Cl₂:** solvent, paint remover; affects the nervous system. **CCl₄:** non-polar (tetrahedral); liver damage; ozone depletion. **Freons (CFCs, e.g. CCl₂F₂):** refrigerants; UV in stratosphere releases Cl• which destroys O₃.`,
      [kt('Phosgene', 'COCl₂, a poisonous gas formed by oxidation of chloroform in light.'), kt('Iodoform test', 'Yellow CHI₃ with I₂/NaOH, given by CH₃CO– and CH₃CH(OH)– compounds.')],
      [fm(r`\ce{CH3COCH3 + 3I2 + 4NaOH -> CHI3 + CH3COONa + 3NaI + 3H2O}`, 'Iodoform from acetone')],
      table(['Compound', 'Key point'], [['CHCl₃', 'Phosgene in light'], ['CHI₃', 'Yellow; antiseptic'], ['CCl₂F₂', 'Ozone depletion']], 'Table of polyhalogen compounds'),
      [7],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- KCN → isocyanide (wrong: it gives a nitrile; AgCN gives isocyanide).
- SN1 gives inversion (wrong: racemisation).
- Using the peroxide effect with HCl (only HBr).
- Forgetting that the Hunsdiecker product has one carbon fewer.

**How marks are usually awarded**
- Mechanisms (2–3 marks): steps, rate law, stereochemistry.
- Products (1 mark each): correct structure and name.
- Polyhalogen compounds: equation plus a use or hazard.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formula of monohaloalkanes?', 'CₙH₂ₙ₊₁X.', 'formula', 1),
    fc(2, 'gem-dihalide?', 'Both X on the same carbon.', 'definition', 1),
    fc(3, 'IUPAC name of CHCl₃?', 'Trichloromethane.', 'fact', 1),
    fc(4, 'Weakest C–X bond?', 'C–I.', 'fact', 1),
    fc(5, 'Why is C δ+ in C–X?', 'Halogen is more electronegative.', 'concept', 1),
    fc(6, 'Best reagent ROH → RCl?', 'SOCl₂ (gaseous by-products).', 'fact', 2),
    fc(7, 'Role of ZnCl₂ in Lucas reagent?', 'Lewis acid helps break C–O.', 'concept', 2),
    fc(8, 'Peroxide effect?', 'Anti-Markovnikov HBr addition with peroxide.', 'concept', 2),
    fc(9, 'Finkelstein reaction?', 'RCl/RBr + NaI in acetone → RI.', 'definition', 2),
    fc(10, 'Swarts reaction?', 'RCl/RBr + AgF/Hg₂F₂/SbF₃ → RF.', 'definition', 2),
    fc(11, 'Hunsdiecker reaction?', 'RCOOAg + Br₂ → RBr + CO₂ + AgBr.', 'definition', 2),
    fc(12, 'Effect of branching on b.p.?', 'Lowers it (smaller surface area).', 'concept', 3),
    fc(13, 'Why are haloalkanes poorly soluble in water?', 'Cannot repay energy of breaking water’s H-bonds.', 'concept', 3),
    fc(14, 'SN2 rate law?', 'k[RX][Nu⁻].', 'formula', 4),
    fc(15, 'SN1 rate law?', 'k[RX].', 'formula', 4),
    fc(16, 'Stereochemistry of SN2?', 'Inversion (Walden).', 'fact', 4),
    fc(17, 'Stereochemistry of SN1?', 'Racemisation (mostly).', 'fact', 4),
    fc(18, 'SN1 order of reactivity?', '3° > 2° > 1° > CH₃X.', 'fact', 4),
    fc(19, 'Racemic mixture?', '1 : 1 enantiomers; optically inactive.', 'definition', 4),
    fc(20, 'RX + KCN?', 'Nitrile, RCN.', 'fact', 5),
    fc(21, 'RX + AgCN?', 'Isocyanide, RNC.', 'fact', 5),
    fc(22, 'RX + AgNO₂?', 'Nitroalkane.', 'fact', 5),
    fc(23, 'RX + KNO₂?', 'Alkyl nitrite.', 'fact', 5),
    fc(24, 'RX + R′COOAg?', 'Ester R′COOR.', 'fact', 5),
    fc(25, 'Saytzeff’s rule?', 'More substituted alkene is major.', 'definition', 6),
    fc(26, 'Aqueous vs alcoholic KOH?', 'Substitution vs elimination.', 'concept', 6),
    fc(27, 'Wurtz reaction?', '2RX + 2Na → R–R (dry ether).', 'definition', 6),
    fc(28, 'Grignard + water?', 'Alkane.', 'fact', 6),
    fc(29, 'Chloroform in light and air?', 'Phosgene, COCl₂.', 'fact', 7),
    fc(30, 'Iodoform test positive for?', 'CH₃CO– and CH₃CH(OH)– compounds.', 'concept', 7),
    fc(31, 'How do freons harm ozone?', 'UV releases Cl• in stratosphere; Cl• destroys O₃.', 'concept', 7),
  ],
  status: 'draft',
  provenance: PROV,
};
