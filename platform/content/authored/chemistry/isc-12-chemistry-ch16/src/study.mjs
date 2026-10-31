// ISC 12 Chemistry ch16 Aldehydes and Ketones — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Aldehydes and Ketones — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Nomenclature, structure and physical properties',
      `Aldehydes **-al** (CHO = C-1): 3-methylbutanal; ketones **-one**: pentan-3-one, 3-methylbutan-2-one; dialdehydes **-dial**. Carbonyl C is **sp²**, planar, ≈ 120°; C=O polar (C δ+).

B.p.: alkanes/ethers < aldehydes/ketones (dipole–dipole) < alcohols (H-bonding); lower members water-soluble (water H-bonds to C=O).`,
      [kt('Carbonyl group', 'The C=O group; polar, with an electrophilic carbon.')],
      [],
      V.carbonyl,
      [1],
    ),
    sec(
      '2. Preparation',
      r`- **Alcohols:** 1° → RCHO (PCC; Cu, 573 K); 2° → ketone.
- **Alkenes:** ozonolysis (O₃; Zn/H₂O). **Alkynes:** H₂O/HgSO₄/H₂SO₄ — ethyne → ethanal; others → ketones.
- **Acid chlorides:** Rosenmund (H₂, Pd/BaSO₄) → RCHO; $\ce{2CH3COCl + (CH3)2Cd -> 2CH3COCH3 + CdCl2}$ → ketones.
- **Calcium salts:** $\ce{(CH3COO)2Ca -> CH3COCH3 + CaCO3}$; with calcium methanoate → aldehyde.
- **Nitriles:** Stephen (SnCl₂/HCl; H₂O) → RCHO; R′MgX then H₃O⁺ → ketone; DIBAL-H → RCHO. **Esters:** DIBAL-H → RCHO.`,
      [kt('Rosenmund reduction', 'Reduction of an acid chloride to an aldehyde with H₂ over Pd poisoned with BaSO₄.'), kt('Stephen reaction', 'Reduction of a nitrile with SnCl₂/HCl followed by hydrolysis to an aldehyde.')],
      [fm(r`\ce{CH3CH2COCl + H2 ->[Pd/BaSO4] CH3CH2CHO + HCl}`, 'Rosenmund')],
      table(['Method', 'Product'], [['Rosenmund', 'Aldehyde'], ['Stephen', 'Aldehyde'], ['R′₂Cd + RCOCl', 'Ketone'], ['RCN + R′MgX', 'Ketone'], ['(RCOO)₂Ca, heat', 'Ketone']], 'Table of preparations'),
      [2],
    ),
    sec(
      '3. Nucleophilic addition',
      r`Reactivity **HCHO > RCHO > R₂CO** (+I and steric effects). **HCN** (trace base → CN⁻): CN⁻ attacks C=O (slow) → alkoxide → protonated → **cyanohydrin**. **NaHSO₃** → crystalline adduct (purification). **Grignard:** HCHO → 1°, RCHO → 2°, R₂CO → 3° alcohols. **Ammonia derivatives** (addition–elimination): NH₂OH → oxime; NH₂NH₂ → hydrazone; C₆H₅NHNH₂ → phenylhydrazone; NH₂NHCONH₂ → semicarbazone; 2,4-DNP → orange 2,4-dinitrophenylhydrazone.`,
      [kt('Cyanohydrin', 'Product of HCN addition to a carbonyl compound: R₂C(OH)CN.'), kt('Oxime', 'C=N–OH compound formed from a carbonyl compound and hydroxylamine.')],
      [fm(r`\ce{CH3COCH3 + HCN -> (CH3)2C(OH)CN}`, 'Cyanohydrin formation')],
      V.nucadd,
      [3],
    ),
    sec(
      '4. Oxidation, iodoform and reduction',
      r`Aldehydes oxidised easily (K₂Cr₂O₇/H⁺, Tollens’, Fehling’s); ketones only by strong oxidants with C–C cleavage. **Iodoform:** CH₃CO– (or CH₃CH(OH)–) + I₂/NaOH → yellow CHI₃ + carboxylate (one C fewer).

**Reduction:** NaBH₄/LiAlH₄/H₂–Ni → alcohols (1° from aldehydes, 2° from ketones). C=O → CH₂: **Clemmensen** (Zn–Hg, conc. HCl; acid); **Wolff–Kishner** (NH₂NH₂, then KOH/ethylene glycol, heat; base); **red P + HI**.`,
      [kt('Clemmensen reduction', 'Reduction of C=O to CH₂ with zinc amalgam and conc. HCl.'), kt('Wolff–Kishner reduction', 'Reduction of C=O to CH₂ via the hydrazone with KOH in ethylene glycol.')],
      [fm(r`\ce{CH3COCH3 + 4HI ->[red P] CH3CH2CH3 + H2O + 2I2}`, 'Red P / HI reduction')],
      table(['Reagent', 'Ketone gives'], [['NaBH₄', '2° alcohol'], ['Zn–Hg/HCl', 'Alkane'], ['NH₂NH₂/KOH', 'Alkane']], 'Table of reductions'),
      [4],
    ),
    sec(
      '5. Aldol, cross aldol and Cannizzaro',
      r`**α-H** acidic (enolate resonance). **Aldol** (dilute OH⁻): enolate attacks C=O of another molecule → β-hydroxy carbonyl → (heat) α,β-unsaturated carbonyl. $\ce{2CH3CHO -> CH3CH(OH)CH2CHO}$ → but-2-enal. **Cross aldol:** best with one partner lacking α-H (HCHO + CH₃CHO → 3-hydroxypropanal).

**Cannizzaro** (no α-H, conc. OH⁻): $\ce{2HCHO + NaOH -> HCOONa + CH3OH}$; crossed with HCHO: HCHO oxidised, the other aldehyde reduced.`,
      [kt('Aldol', 'A β-hydroxy aldehyde or ketone formed by base-catalysed self-addition of a carbonyl compound with α-H.'), kt('Cannizzaro reaction', 'Disproportionation of an aldehyde without α-H in concentrated alkali to an alcohol and a carboxylate.')],
      [fm(r`\ce{2HCHO + NaOH -> HCOONa + CH3OH}`, 'Cannizzaro')],
      table(['Condition', 'Reaction'], [['α-H, dilute OH⁻', 'Aldol'], ['No α-H, conc. OH⁻', 'Cannizzaro']], 'Table of base-catalysed reactions'),
      [5],
    ),
    sec(
      '6. Tests and uses',
      `**Aldehyde vs ketone:** Tollens’ (silver mirror), Fehling’s (red-brown Cu₂O, aliphatic aldehydes), Schiff’s reagent (pink). **Methanal vs ethanal:** iodoform (ethanal +). **Methyl ketones:** iodoform. **2,4-DNP:** orange ppt for any C=O.

**Uses:** methanal — formalin, Bakelite and urea–formaldehyde resins, urotropine ((CH₂)₆N₄); ethanal — ethanoic acid, ethyl ethanoate; propanone — solvent, nail-polish remover; butanone — solvent.`,
      [kt('Tollens’ reagent', 'Ammoniacal silver nitrate; reduced by aldehydes to a silver mirror.'), kt('Fehling’s solution', 'Alkaline copper(II) tartrate; reduced by aliphatic aldehydes to red-brown Cu₂O.')],
      [],
      table(['Test', 'HCHO', 'CH₃CHO', 'CH₃COCH₃'], [['Tollens’', '+', '+', '−'], ['Fehling’s', '+', '+', '−'], ['Iodoform', '−', '+', '+']], 'Table of tests'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Propyne hydration giving propanal (it gives propanone).
- Aldol with benzaldehyde or methanal alone (no α-H: Cannizzaro).
- Methanal giving iodoform (it does not).
- Confusing Clemmensen (acid) and Wolff–Kishner (base).

**How marks are usually awarded**
- Mechanisms (2–3 marks): nucleophile formation, attack, protonation.
- Named preparations (1 mark each): reagent, condition and product.
- Tests (1–2 marks): reagent and observations for both compounds.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'IUPAC name of (CH₃)₂CHCH₂CHO?', '3-Methylbutanal.', 'fact', 1),
    fc(2, 'Hybridisation of carbonyl carbon?', 'sp², planar.', 'fact', 1),
    fc(3, 'Why do carbonyl compounds boil below alcohols?', 'No H-bonding between molecules.', 'concept', 1),
    fc(4, 'Rosenmund reagent?', 'H₂, Pd/BaSO₄.', 'fact', 2),
    fc(5, 'Why poison Pd with BaSO₄?', 'Stops reduction at aldehyde.', 'concept', 2),
    fc(6, 'RCOCl + R′₂Cd?', 'Ketone RCOR′.', 'fact', 2),
    fc(7, 'Heating calcium ethanoate?', 'Propanone + CaCO₃.', 'fact', 2),
    fc(8, 'Stephen reaction product?', 'Aldehyde.', 'fact', 2),
    fc(9, 'Nitrile + Grignard, then H₃O⁺?', 'Ketone.', 'fact', 2),
    fc(10, 'Ethyne + H₂O/HgSO₄?', 'Ethanal.', 'fact', 2),
    fc(11, 'Reactivity to nucleophiles?', 'HCHO > RCHO > R₂CO.', 'concept', 3),
    fc(12, 'Role of base in HCN addition?', 'Generates CN⁻.', 'concept', 3),
    fc(13, 'Use of NaHSO₃ adducts?', 'Purifying aldehydes.', 'fact', 3),
    fc(14, 'Carbonyl + NH₂OH?', 'Oxime.', 'fact', 3),
    fc(15, 'Carbonyl + semicarbazide?', 'Semicarbazone.', 'fact', 3),
    fc(16, 'Iodoform positive structure?', 'CH₃CO– or CH₃CH(OH)–.', 'concept', 4),
    fc(17, 'Clemmensen reagents?', 'Zn–Hg, conc. HCl.', 'fact', 4),
    fc(18, 'Wolff–Kishner reagents?', 'NH₂NH₂, then KOH/ethylene glycol.', 'fact', 4),
    fc(19, 'Ketone + NaBH₄?', '2° alcohol.', 'fact', 4),
    fc(20, 'Why are α-H acidic?', 'Enolate stabilised by resonance.', 'concept', 5),
    fc(21, 'Aldol of ethanal?', '3-Hydroxybutanal → but-2-enal.', 'fact', 5),
    fc(22, 'HCHO + CH₃CHO (dil. OH⁻)?', '3-Hydroxypropanal.', 'fact', 5),
    fc(23, 'Cannizzaro condition?', 'No α-H, conc. alkali.', 'concept', 5),
    fc(24, 'HCHO + conc. NaOH?', 'HCOONa + CH₃OH.', 'fact', 5),
    fc(25, 'Crossed Cannizzaro: which is oxidised?', 'Methanal.', 'concept', 5),
    fc(26, 'Tollens’ positive result?', 'Silver mirror.', 'fact', 6),
    fc(27, 'Fehling’s positive result?', 'Red-brown Cu₂O.', 'fact', 6),
    fc(28, 'Distinguish HCHO from CH₃CHO?', 'Iodoform (CH₃CHO +).', 'concept', 6),
    fc(29, 'Formalin?', '40% aqueous methanal.', 'definition', 6),
    fc(30, 'Urotropine formula?', '(CH₂)₆N₄.', 'fact', 6),
    fc(31, 'Exam tip: aldol vs Cannizzaro', 'Check α-H and alkali strength first.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
