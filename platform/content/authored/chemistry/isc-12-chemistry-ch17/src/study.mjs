// ISC 12 Chemistry ch17 Benzaldehyde — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Benzaldehyde — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Preparation and physical properties',
      r`C₆H₅CHO: –CHO conjugated with the ring; **no α-H**.

**Etard reaction:** toluene + CrO₂Cl₂ (CS₂/CCl₄) → brown complex → H₂O → benzaldehyde (oxidation stops at CHO). Also: toluene + 2Cl₂ (hν) → C₆H₅CHCl₂ → (H₂O, 373 K) C₆H₅CHO; Gattermann–Koch: C₆H₆ + CO (HCl, AlCl₃/CuCl).

**Properties:** colourless oily liquid, bitter-almond smell, b.p. 452 K, density 1.04 g cm⁻³, slightly soluble in water; air-oxidised to benzoic acid.`,
      [kt('Etard reaction', 'Oxidation of toluene to benzaldehyde by chromyl chloride.')],
      [fm(r`\ce{C6H5CHCl2 + H2O -> C6H5CHO + 2HCl}`, 'Hydrolysis of benzal chloride')],
      table(['Route', 'Reagent'], [['Etard', 'CrO₂Cl₂, then H₂O'], ['Benzal chloride', 'Cl₂/hν, then H₂O'], ['Gattermann–Koch', 'CO + HCl, AlCl₃/CuCl']], 'Table of preparations'),
      [1],
    ),
    sec(
      '2. Oxidation, reduction and addition reactions',
      r`**Oxidation:** air, K₂Cr₂O₇/H⁺, KMnO₄ → benzoic acid; Tollens’ → silver mirror; **Fehling’s: no reaction**.
**Reduction:** H₂/Ni, NaBH₄, LiAlH₄ → benzyl alcohol; Clemmensen or Wolff–Kishner → toluene.
**Addition:** HCN → mandelonitrile C₆H₅CH(OH)CN → (H₃O⁺) mandelic acid; NaHSO₃ → crystalline adduct.
**Ammonia derivatives:** NH₂OH → benzaldoxime; NH₂NH₂ → hydrazone; C₆H₅NHNH₂ → phenylhydrazone. **PCl₅** → benzal chloride C₆H₅CHCl₂.`,
      [kt('Mandelonitrile', 'The cyanohydrin of benzaldehyde, C₆H₅CH(OH)CN.'), kt('Benzal chloride', 'C₆H₅CHCl₂, (dichloromethyl)benzene.')],
      [fm(r`\ce{C6H5CHO + PCl5 -> C6H5CHCl2 + POCl3}`, 'With PCl₅')],
      V.nucadd,
      [2],
    ),
    sec(
      '3. Cannizzaro, benzoin and Perkin reactions',
      r`**Cannizzaro** (conc. NaOH): $\ce{2C6H5CHO + NaOH -> C6H5CH2OH + C6H5COONa}$ (hydride transfer). Crossed with HCHO: benzaldehyde → benzyl alcohol, HCHO → HCOONa.
**Benzoin condensation** (KCN in ethanol, catalytic CN⁻): $\ce{2C6H5CHO -> C6H5CH(OH)COC6H5}$.
**Perkin** ((CH₃CO)₂O + CH₃COONa, 453 K): $\ce{C6H5CHO + (CH3CO)2O -> C6H5CH=CHCOOH + CH3COOH}$ (cinnamic acid).`,
      [kt('Benzoin', '2-Hydroxy-1,2-diphenylethan-1-one, C₆H₅CH(OH)COC₆H₅.'), kt('Cinnamic acid', '3-Phenylprop-2-enoic acid, product of the Perkin reaction.')],
      [fm(r`\ce{2C6H5CHO + NaOH -> C6H5CH2OH + C6H5COONa}`, 'Cannizzaro')],
      table(['Reaction', 'Reagent', 'Product'], [['Cannizzaro', 'Conc. NaOH', 'Benzyl alcohol + benzoate'], ['Benzoin', 'KCN/ethanol', 'Benzoin'], ['Perkin', '(CH₃CO)₂O, CH₃COONa', 'Cinnamic acid']], 'Table of named reactions'),
      [3],
    ),
    sec(
      '4. Ring substitution, tests and uses',
      `–CHO: −I, −R → **deactivating, meta directing**. Nitration (cold) → 3-nitrobenzaldehyde; Cl₂/FeCl₃ → 3-chlorobenzaldehyde; fuming H₂SO₄ → 3-formylbenzenesulphonic acid.

**Benzaldehyde vs ethanal:** Fehling’s (ethanal +, benzaldehyde −); iodoform (ethanal +); dilute alkali (ethanal aldol); conc. alkali (benzaldehyde Cannizzaro); both give Tollens’.

**Uses:** flavouring (almond), perfumes, dyes (malachite green), cinnamic acid, cinnamaldehyde (cross aldol with ethanal), mandelic acid, benzoin.`,
      [kt('Meta director', 'An electron-withdrawing substituent that directs incoming electrophiles to the meta position.')],
      [],
      table(['Test', 'Benzaldehyde', 'Ethanal'], [['Fehling’s', '−', '+'], ['Iodoform', '−', '+'], ['Tollens’', '+', '+']], 'Table of distinguishing tests'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using KMnO₄ to convert toluene to benzaldehyde (gives benzoic acid).
- Saying benzaldehyde reduces Fehling’s solution.
- Giving o/p products for ring substitution (–CHO is meta directing).
- Confusing benzal chloride (C₆H₅CHCl₂) with benzoyl chloride (C₆H₅COCl).

**How marks are usually awarded**
- Named reactions (1–2 marks): reagents, conditions, balanced equation and product name.
- Meta direction (2 marks): electron withdrawal and σ-complex argument.
- Distinguishing tests (1–2 marks): reagent and results for both compounds.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Etard reagent?', 'Chromyl chloride, CrO₂Cl₂ (in CS₂).', 'fact', 1),
    fc(2, 'Why not KMnO₄ on toluene?', 'Gives benzoic acid.', 'concept', 1),
    fc(3, 'Benzal chloride + water?', 'Benzaldehyde.', 'fact', 1),
    fc(4, 'Gattermann–Koch reagents?', 'CO + HCl, AlCl₃/CuCl.', 'fact', 1),
    fc(5, 'Smell of benzaldehyde?', 'Bitter almonds.', 'fact', 1),
    fc(6, 'B.p. of benzaldehyde?', '452 K.', 'fact', 1),
    fc(7, 'White crystals in old benzaldehyde?', 'Benzoic acid.', 'fact', 1),
    fc(8, 'Does benzaldehyde have α-H?', 'No.', 'fact', 1),
    fc(9, 'Tollens’ test?', 'Positive: silver mirror.', 'fact', 2),
    fc(10, 'Fehling’s test?', 'Negative.', 'fact', 2),
    fc(11, 'Benzaldehyde + NaBH₄?', 'Benzyl alcohol.', 'fact', 2),
    fc(12, 'Benzaldehyde + Zn–Hg/HCl?', 'Toluene.', 'fact', 2),
    fc(13, 'Benzaldehyde + HCN?', 'Mandelonitrile.', 'fact', 2),
    fc(14, 'Mandelonitrile hydrolysis?', 'Mandelic acid.', 'fact', 2),
    fc(15, 'Benzaldehyde + NH₂OH?', 'Benzaldoxime.', 'fact', 2),
    fc(16, 'Benzaldehyde + PCl₅?', 'Benzal chloride.', 'fact', 2),
    fc(17, 'Benzaldehyde + conc. NaOH?', 'Benzyl alcohol + sodium benzoate.', 'fact', 3),
    fc(18, 'Key step in Cannizzaro?', 'Hydride transfer.', 'concept', 3),
    fc(19, 'Benzoin condensation catalyst?', 'CN⁻ (KCN in ethanol).', 'fact', 3),
    fc(20, 'Benzoin formula?', 'C₆H₅CH(OH)COC₆H₅.', 'fact', 3),
    fc(21, 'Perkin reagents?', 'Acetic anhydride + sodium acetate, 453 K.', 'fact', 3),
    fc(22, 'Perkin product?', 'Cinnamic acid.', 'fact', 3),
    fc(23, 'Benzaldehyde + HCHO + conc. NaOH?', 'Benzyl alcohol + HCOONa.', 'fact', 3),
    fc(24, 'Directing effect of –CHO?', 'Meta, deactivating.', 'concept', 4),
    fc(25, 'Nitration product?', '3-Nitrobenzaldehyde.', 'fact', 4),
    fc(26, 'Why nitrate in the cold?', 'Avoid oxidising CHO.', 'concept', 4),
    fc(27, 'Distinguish from ethanal?', 'Fehling’s or iodoform.', 'concept', 4),
    fc(28, 'Cinnamaldehyde from?', 'Benzaldehyde + ethanal, dilute NaOH.', 'fact', 4),
    fc(29, 'Dye made from benzaldehyde?', 'Malachite green.', 'fact', 4),
    fc(30, 'Chlorination with FeCl₃?', '3-Chlorobenzaldehyde.', 'fact', 4),
    fc(31, 'Exam tip: benzal vs benzoyl chloride', 'PCl₅ on C₆H₅CHO → C₆H₅CHCl₂; on C₆H₅COOH → C₆H₅COCl.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
