// ICSE 10 Chemistry ch07 Electrolysis — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const fm = (latex, label) => ({ latex, label });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electrolysis — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electrolytes, non-electrolytes and the particles present',
      `- **Electrolyte:** a compound that conducts electricity in the molten state or in aqueous solution and is decomposed by it.
- **Strong electrolyte:** almost completely ionised; contains ions only (NaCl, KOH, NaOH, dilute HCl, H₂SO₄, HNO₃, CuSO₄, molten PbBr₂).
- **Weak electrolyte:** partly ionised; contains ions and molecules (ethanoic acid, carbonic acid, ammonium hydroxide solution).
- **Non-electrolyte:** contains molecules only; does not conduct (sugar, alcohol, kerosene, carbon tetrachloride).

Solid ionic compounds do not conduct: their ions are held in fixed positions. Metals conduct by electrons with no chemical change; electrolytes conduct by ions and are decomposed.`,
      [kt('Electrolyte', 'A compound that conducts electricity in the molten state or in aqueous solution and is decomposed by it.'), kt('Weak electrolyte', 'An electrolyte that is only partly ionised, so its solution contains both ions and molecules.'), kt('Non-electrolyte', 'A substance that does not conduct electricity in the molten state or in solution, because it contains molecules only.')],
      [],
      table(['Particles present', 'Type', 'Examples'], [['Ions only', 'Strong electrolyte', 'Molten PbBr₂, NaOH solution'], ['Ions and molecules', 'Weak electrolyte', 'CH₃COOH, NH₄OH solutions'], ['Molecules only', 'Non-electrolyte', 'Alcohol, sugar solution, kerosene']], 'Table linking particles present to the type of electrolyte with examples'),
      [1],
    ),
    sec(
      '2. Terms of electrolysis; oxidation and reduction',
      `- **Electrolysis:** decomposition of an electrolyte (molten or in solution) by an electric current.
- **Electrodes:** conductors through which current enters and leaves the electrolyte. **Anode** — joined to the positive terminal; **cathode** — joined to the negative terminal.
- **Cation:** positive ion, moves to the cathode. **Anion:** negative ion, moves to the anode.
- **Oxidation** = loss of electrons (at the **anode**). **Reduction** = gain of electrons (at the **cathode**).`,
      [kt('Electrolysis', 'The decomposition of an electrolyte in the molten state or in solution by passing an electric current through it.'), kt('Anode', 'The electrode joined to the positive terminal of the battery; anions lose electrons there.'), kt('Cathode', 'The electrode joined to the negative terminal of the battery; cations gain electrons there.'), kt('Oxidation', 'Loss of electrons.'), kt('Reduction', 'Gain of electrons.')],
      [fm(r`\ce{Pb^2+ + 2e- -> Pb}`, 'Reduction at a cathode'), fm(r`\ce{2Br- -> Br2 + 2e-}`, 'Oxidation at an anode')],
      table(['Electrode', 'Sign', 'Ions attracted', 'Process'], [['Anode', '+', 'Anions', 'Oxidation'], ['Cathode', '−', 'Cations', 'Reduction']], 'Table of the anode and cathode with sign, ions attracted and process'),
      [2],
    ),
    sec(
      '3. Selective discharge',
      `When several ions can reach an electrode, the one discharged depends on:

1. **Activity series** (K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag): the lower the metal, the more easily its ion is discharged at the cathode. From aqueous solutions of Na⁺, Mg²⁺ or Ca²⁺ salts, hydrogen forms instead. At the anode, OH⁻ is discharged in preference to SO₄²⁻ and NO₃⁻.
2. **Concentration:** a much more concentrated ion can be discharged in preference (Cl⁻ in concentrated brine gives chlorine).
3. **Nature of the electrode:** an active anode (copper, nickel, silver) dissolves instead of an anion being discharged; platinum and graphite are inert.`,
      [kt('Selective discharge', 'The preferential discharge of one ion over others at an electrode, decided by the activity series, concentration and the nature of the electrode.'), kt('Inert electrode', 'An electrode, such as platinum or graphite, that conducts but takes no part in the reaction.')],
      [],
      table(['Solution (platinum electrodes)', 'Cathode', 'Anode'], [['Dilute MgSO₄', 'H₂', 'O₂'], ['Dilute CuSO₄', 'Cu', 'O₂'], ['Dilute Na₂SO₄', 'H₂', 'O₂']], 'Table of the products at each electrode for three dilute solutions with platinum electrodes'),
      [3],
    ),
    sec(
      '4. Electrolysis of molten lead bromide',
      `- Apparatus: **silica crucible** (not attacked by the melt, withstands high temperature); **graphite electrodes** (inert, not attacked by bromine); heat until molten; fume cupboard.
- Lead bromide conducts only when **molten**: then its ions are free to move.
- Ionisation: PbBr₂ → Pb²⁺ + 2Br⁻.
- **Cathode:** Pb²⁺ + 2e⁻ → Pb — silvery grey molten lead collects at the bottom.
- **Anode:** 2Br⁻ → Br₂ + 2e⁻ — reddish-brown fumes of bromine.`,
      [kt('Silica crucible', 'A crucible of silica, used because it is not attacked by molten lead bromide and stands high temperatures.')],
      [fm(r`\ce{PbBr2 -> Pb + Br2}`, 'Overall change')],
      table(['Electrode', 'Reaction', 'Observation'], [['Cathode', 'Pb²⁺ + 2e⁻ → Pb', 'Silvery grey metal at the bottom'], ['Anode', '2Br⁻ → Br₂ + 2e⁻', 'Reddish-brown fumes']], 'Table of electrode reactions and observations for molten lead bromide'),
      [4],
    ),
    sec(
      '5. Electrolysis of acidified water',
      `- Pure water is a very weak electrolyte; **dilute sulphuric acid** is added to increase the number of ions. **Platinum** electrodes are used (inert).
- Ions: H⁺, SO₄²⁻, OH⁻.
- **Cathode:** 4H⁺ + 4e⁻ → 2H₂. **Anode:** 4OH⁻ → 2H₂O + O₂ + 4e⁻ (OH⁻ discharged in preference to SO₄²⁻).
- Hydrogen : oxygen = **2 : 1** by volume: 4 electrons give 2 molecules of H₂ but 1 molecule of O₂ (Avogadro's law).
- The acid is not used up; only water decomposes, so the acid slowly becomes more concentrated.`,
      [kt('Voltameter', 'The vessel in which electrolysis is carried out, holding the electrolyte and the electrodes.')],
      [fm(r`\ce{4OH- -> 2H2O + O2 + 4e-}`, 'Anode reaction'), fm(r`\ce{2H2O -> 2H2 + O2}`, 'Overall change')],
      table(['Electrode', 'Gas', 'Volume'], [['Cathode (−)', 'Hydrogen', '2 volumes'], ['Anode (+)', 'Oxygen', '1 volume']], 'Table of the gases and their relative volumes in the electrolysis of acidified water'),
      [5],
    ),
    sec(
      '6. Copper(II) sulphate solution: copper and platinum electrodes',
      `| | Copper electrodes | Platinum electrodes |
|---|---|---|
| Cathode | Cu²⁺ + 2e⁻ → Cu (copper deposited) | Cu²⁺ + 2e⁻ → Cu (copper deposited) |
| Anode | Cu → Cu²⁺ + 2e⁻ (anode dissolves, no gas) | 4OH⁻ → 2H₂O + O₂ + 4e⁻ (oxygen) |
| Colour | Stays blue | Fades (Cu²⁺ not replaced) |
| Solution | Unchanged | Becomes acidic (H₂SO₄ left) |

Copper electrodes transfer copper from anode to cathode: the basis of copper refining and copper plating.`,
      [kt('Active electrode', 'An electrode, such as a copper anode, that takes part in the reaction and dissolves.')],
      [],
      table(['Electrode used as anode', 'What happens at the anode'], [['Copper (active)', 'Copper dissolves as Cu²⁺'], ['Platinum (inert)', 'OH⁻ discharged; oxygen given off']], 'Table of what happens at a copper anode and at a platinum anode in copper sulphate solution'),
      [6],
    ),
    sec(
      '7. Electroplating and electrorefining',
      `**Electroplating:** article = **cathode**; plating metal = **anode**; electrolyte = solution containing ions of the plating metal. Conditions: clean article, low current for a long time, suitable electrolyte.

- **Nickel plating:** nickel anode, nickel sulphate solution. Cathode Ni²⁺ + 2e⁻ → Ni; anode Ni → Ni²⁺ + 2e⁻.
- **Silver plating:** silver anode, **sodium argentocyanide**, Na[Ag(CN)₂], solution. Cathode Ag⁺ + e⁻ → Ag; anode Ag → Ag⁺ + e⁻. Silver nitrate is avoided: it deposits silver too fast, giving a rough coat; the argentocyanide releases Ag⁺ slowly for a smooth, even, firm coat.

**Electrorefining of copper:** impure copper anode, pure copper cathode, copper(II) sulphate solution acidified with dilute sulphuric acid. Zinc and iron impurities stay in solution; silver and gold collect below the anode as anode mud.`,
      [kt('Electroplating', 'Coating an article with a thin layer of a metal by electrolysis, the article being the cathode.'), kt('Anode mud', 'The insoluble, less reactive impurities (such as silver and gold) that settle below the anode during electrorefining.')],
      [fm(r`\ce{Ni^2+ + 2e- -> Ni}`, 'Nickel deposited at the cathode'), fm(r`\ce{Ag+ + e- -> Ag}`, 'Silver deposited at the cathode')],
      table(['Process', 'Anode', 'Cathode', 'Electrolyte'], [['Nickel plating', 'Nickel', 'Article', 'Nickel sulphate'], ['Silver plating', 'Silver', 'Article', 'Sodium argentocyanide'], ['Refining copper', 'Impure copper', 'Pure copper', 'Acidified copper(II) sulphate']], 'Table of the anode, cathode and electrolyte for nickel plating, silver plating and refining copper'),
      [7],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing anode equations with "− e⁻" on the left; write the electrons as a product: 2Br⁻ → Br₂ + 2e⁻.
- Saying the cathode is positive.
- Forgetting that a copper anode dissolves (no oxygen) while a platinum anode gives oxygen.
- Making the article the anode in electroplating.
- Saying silver nitrate is used for silver plating.

**How marks are usually awarded**
- Electrode equations (1 mark each): correct ions, electrons and charges.
- Observations (1 mark): colour and state, e.g. "reddish-brown fumes at the anode".
- Reasons (1 mark): name the property, e.g. "silica is not attacked by the melt".`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Electrolyte?', 'A compound that conducts when molten or in solution and is decomposed by the current.', 'definition', 1),
    fc(2, 'Strong vs weak electrolyte?', 'Strong: almost fully ionised (ions only). Weak: partly ionised (ions and molecules).', 'concept', 1),
    fc(3, 'Two weak electrolytes?', 'Ethanoic acid, ammonium hydroxide (also carbonic acid).', 'example', 1),
    fc(4, 'Two non-electrolytes?', 'Sugar solution, alcohol (also kerosene, carbon tetrachloride).', 'example', 1),
    fc(5, 'Why does solid NaCl not conduct?', 'Its ions are held in fixed positions and cannot move.', 'concept', 1),
    fc(6, 'Metallic vs electrolytic conduction?', 'Metals: electrons, no chemical change. Electrolytes: ions, decomposition.', 'concept', 1),
    fc(7, 'Anode?', 'Electrode joined to the positive terminal; anions lose electrons there.', 'definition', 2),
    fc(8, 'Cathode?', 'Electrode joined to the negative terminal; cations gain electrons there.', 'definition', 2),
    fc(9, 'Oxidation and reduction in terms of electrons?', 'Oxidation: loss of electrons. Reduction: gain of electrons.', 'definition', 2),
    fc(10, 'Which electrode is the site of reduction?', 'The cathode.', 'fact', 2),
    fc(11, 'Three factors in selective discharge?', 'Activity series position, concentration, nature of the electrode.', 'concept', 3),
    fc(12, 'Cathode product from dilute MgSO₄ (Pt)?', 'Hydrogen.', 'example', 3),
    fc(13, 'Cathode product from dilute CuSO₄?', 'Copper.', 'example', 3),
    fc(14, 'Which anion is discharged more easily: OH⁻ or SO₄²⁻?', 'OH⁻.', 'fact', 3),
    fc(15, 'Why a silica crucible for lead bromide?', 'Not attacked by the melt; withstands high temperature.', 'fact', 4),
    fc(16, 'Why graphite electrodes for lead bromide?', 'Inert; not attacked by bromine.', 'fact', 4),
    fc(17, 'Cathode reaction, molten PbBr₂?', 'Pb²⁺ + 2e⁻ → Pb.', 'formula', 4),
    fc(18, 'Anode reaction, molten PbBr₂?', '2Br⁻ → Br₂ + 2e⁻.', 'formula', 4),
    fc(19, 'Anode observation, molten PbBr₂?', 'Reddish-brown fumes of bromine.', 'fact', 4),
    fc(20, 'Why is acid added to water for electrolysis?', 'Pure water has very few ions; the acid increases conductivity.', 'concept', 5),
    fc(21, 'Anode reaction, acidified water?', '4OH⁻ → 2H₂O + O₂ + 4e⁻.', 'formula', 5),
    fc(22, 'Volume ratio H₂ : O₂ from acidified water?', '2 : 1.', 'fact', 5),
    fc(23, 'CuSO₄ with copper anode: what happens at the anode?', 'Copper dissolves: Cu → Cu²⁺ + 2e⁻; no gas.', 'formula', 6),
    fc(24, 'CuSO₄ with platinum anode: colour change?', 'Blue fades; the solution becomes acidic.', 'fact', 6),
    fc(25, 'Electroplating: article is which electrode?', 'The cathode.', 'fact', 7),
    fc(26, 'Electrolyte for nickel plating?', 'Nickel sulphate solution.', 'fact', 7),
    fc(27, 'Electrolyte for silver plating?', 'Sodium argentocyanide solution.', 'fact', 7),
    fc(28, 'Why not silver nitrate for plating?', 'Silver deposits too fast: rough, uneven coat.', 'concept', 7),
    fc(29, 'Refining copper: anode, cathode, electrolyte?', 'Impure Cu; pure Cu; acidified CuSO₄ solution.', 'diagram', 7),
    fc(30, 'Fate of silver and gold impurities in refining?', 'They settle below the anode as anode mud.', 'fact', 7),
    fc(31, 'Exam tip: anode equations', 'Write electrons as a product: 4OH⁻ → 2H₂O + O₂ + 4e⁻.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
