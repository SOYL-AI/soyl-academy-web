// ISC 12 Chemistry ch13 Haloarenes — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Haloarenes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The C–X bond and preparation',
      r`X on an **sp² ring carbon** (aryl halide); benzylic halides (C₆H₅CH₂X) are different. C–Cl in chlorobenzene is **shorter (169 pm vs 177 pm) and stronger** (resonance gives partial double-bond character; sp² carbon) and **less polar** (1.69 D; +R opposes −I).

**Preparation:** benzene + Cl₂/Br₂ with FeCl₃/FeBr₃/AlCl₃ in the dark (iodination needs HNO₃ to remove HI); from benzenediazonium chloride (aniline + NaNO₂ + HCl at 273–278 K): **Sandmeyer** CuCl/HCl or CuBr/HBr; **Gattermann** Cu powder + HX; KI → iodobenzene.`,
      [kt('Aryl halide', 'A compound with a halogen bonded directly to an sp² carbon of an aromatic ring.'), kt('Sandmeyer reaction', 'Replacement of the diazonium group by Cl or Br using CuCl/HCl or CuBr/HBr.'), kt('Gattermann reaction', 'Replacement of the diazonium group by Cl or Br using copper powder and HX.')],
      [fm(r`\ce{C6H5N2Cl ->[CuCl/HCl] C6H5Cl + N2}`, 'Sandmeyer')],
      V.resonance,
      [1],
    ),
    sec(
      '2. Physical properties',
      `Colourless liquids or solids; insoluble in water (no H-bonding), soluble in organic solvents; bromo- and iodo-arenes denser than water. B.p. rises C₆H₅F < C₆H₅Cl < C₆H₅Br < C₆H₅I. Isomeric dihalobenzenes boil at similar temperatures, but the **para isomer melts much higher** (symmetry, better packing): 1,4-dichlorobenzene 323 K vs 1,2- 256 K and 1,3- 249 K.`,
      [kt('Crystal packing', 'How closely molecules fit together in a solid; better packing gives a higher melting point.')],
      [],
      table(['Isomer', 'm.p. / K'], [['1,2-Dichlorobenzene', '256'], ['1,3-Dichlorobenzene', '249'], ['1,4-Dichlorobenzene', '323']], 'Table of dichlorobenzene melting points'),
      [2],
    ),
    sec(
      '3. Electrophilic substitution',
      r`Halogen: **−I** deactivates the ring (slower than benzene); **+R** directs to **ortho/para**; para usually major (steric).

**Nitration mechanism:** $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$; NO₂⁺ attacks o/p (slow) giving a σ-complex stabilised by the Cl lone pair; loss of H⁺ (fast).

Products from chlorobenzene: Cl₂/FeCl₃ → 1,2- and 1,4-dichlorobenzene; HNO₃/H₂SO₄ → 1-chloro-2- and 1-chloro-4-nitrobenzene; conc. H₂SO₄ → 2- and 4-chlorobenzenesulphonic acid; CH₃Cl/AlCl₃ → 2- and 4-chlorotoluene.`,
      [kt('σ-complex', 'The positively charged, non-aromatic intermediate (arenium ion) formed when an electrophile adds to a benzene ring.')],
      [fm(r`\ce{C6H5Cl + HNO3 ->[H2SO4] ClC6H4NO2 + H2O}`, 'Nitration of chlorobenzene')],
      table(['Effect of Cl', 'Consequence'], [['−I', 'Deactivating'], ['+R', 'o/p directing']], 'Table of effects of chlorine'),
      [3],
    ),
    sec(
      '4. Nucleophilic substitution and reduction',
      r`Difficult because of partial double-bond character, sp² carbon, unstable phenyl cation (no SN1), and repulsion/blocked backside (no SN2). **Dow:** C₆H₅Cl + NaOH, 623 K, 300 atm → C₆H₅ONa → phenol.

**o/p-NO₂ groups help** (addition–elimination via a Meisenheimer complex; charge delocalised onto NO₂): 4-nitro 443 K; 2,4-dinitro 368 K; 2,4,6-trinitro warm water. m-NO₂ helps little.

**Cl → NH₂:** NH₃ + Cu₂O, 475 K, 60 atm. **Reduction:** H₂/Pd or Ni–Al alloy/NaOH → benzene.`,
      [kt('Meisenheimer complex', 'The negatively charged σ-complex formed when a nucleophile adds to an activated aryl halide.'), kt('Dow process', 'Industrial hydrolysis of chlorobenzene with NaOH at 623 K and 300 atm.')],
      [fm(r`\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}`, 'Dow process')],
      table(['Substrate', 'Conditions'], [['C₆H₅Cl', '623 K, 300 atm'], ['4-NO₂', '443 K'], ['2,4-(NO₂)₂', '368 K'], ['2,4,6-(NO₂)₃', 'Warm water']], 'Table of hydrolysis conditions'),
      [4],
    ),
    sec(
      '5. Reactions with metals; DDT',
      r`**Wurtz–Fittig:** ArX + RX + 2Na (dry ether) → Ar–R. **Fittig:** 2ArX + 2Na → Ar–Ar. **Grignard:** C₆H₅Br + Mg (dry ether) → C₆H₅MgBr; + H₂O → benzene.

**DDT** = 1,1,1-trichloro-2,2-bis(4-chlorophenyl)ethane, from chlorobenzene + chloral (conc. H₂SO₄). Effective insecticide (malaria), but not biodegradable, fat-soluble, biomagnifies in food chains (thin eggshells in birds); insect resistance; banned or restricted.`,
      [kt('Biomagnification', 'Increase in concentration of a persistent substance at each higher level of a food chain.')],
      [fm(r`\ce{2C6H5Cl + CCl3CHO -> (ClC6H4)2CHCCl3 + H2O}`, 'Manufacture of DDT')],
      table(['Reaction', 'Product'], [['Wurtz–Fittig', 'Alkylbenzene'], ['Fittig', 'Biphenyl'], ['PhMgBr + H₂O', 'Benzene']], 'Table of metal reactions'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling halogen meta-directing (it is o/p-directing but deactivating).
- Saying m-NO₂ activates nucleophilic substitution as much as p-NO₂.
- Confusing Sandmeyer (CuX/HX) with Gattermann (Cu/HX), or Fittig with Wurtz–Fittig.
- Explaining the p-dichlorobenzene melting point by molar mass.

**How marks are usually awarded**
- Mechanisms (2–3 marks): electrophile formation, σ-complex, loss of H⁺; or addition then elimination with the role of NO₂.
- Reasons for low reactivity (2 marks): resonance, sp² carbon, unstable phenyl cation, repulsion.
- DDT (2 marks): structure/equation and an environmental effect.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Aryl halide?', 'X on an sp² carbon of an aromatic ring.', 'definition', 1),
    fc(2, 'C–Cl length in C₆H₅Cl vs CH₃Cl?', '169 pm vs 177 pm.', 'fact', 1),
    fc(3, 'Two reasons for short C–Cl in chlorobenzene?', 'Resonance (partial double bond); sp² carbon.', 'concept', 1),
    fc(4, 'Why is chlorobenzene less polar than chloroethane?', '+R opposes −I.', 'concept', 1),
    fc(5, 'Chlorination of benzene conditions?', 'Cl₂, FeCl₃, dark.', 'fact', 1),
    fc(6, 'Diazotisation conditions?', 'NaNO₂ + HCl, 273–278 K.', 'fact', 1),
    fc(7, 'Sandmeyer reagent for PhCl?', 'CuCl/HCl.', 'fact', 1),
    fc(8, 'Gattermann reagent for PhCl?', 'Cu powder + HCl.', 'fact', 1),
    fc(9, 'Iodobenzene from diazonium salt?', 'Warm with KI.', 'fact', 1),
    fc(10, 'Why is iodination done with HNO₃?', 'Oxidises HI, which would reverse the reaction.', 'concept', 1),
    fc(11, 'Highest-melting dichlorobenzene?', '1,4- (para), 323 K.', 'fact', 2),
    fc(12, 'Why does the para isomer melt highest?', 'Symmetry; better packing.', 'concept', 2),
    fc(13, 'Effect of Cl on EAS rate?', 'Deactivating (−I).', 'concept', 3),
    fc(14, 'Orientation by Cl?', 'Ortho/para (+R).', 'concept', 3),
    fc(15, 'Electrophile in nitration?', 'NO₂⁺.', 'fact', 3),
    fc(16, 'Major product of nitrating PhCl?', '1-Chloro-4-nitrobenzene.', 'fact', 3),
    fc(17, 'Why is para favoured over ortho?', 'Steric hindrance by halogen.', 'concept', 3),
    fc(18, 'Major product PhCl + CH₃Cl/AlCl₃?', '4-Chlorotoluene.', 'fact', 3),
    fc(19, 'Dow process conditions?', '623 K, 300 atm, NaOH.', 'fact', 4),
    fc(20, 'Why no SN1 for PhCl?', 'Phenyl cation very unstable.', 'concept', 4),
    fc(21, 'Why no SN2 for PhCl?', 'Ring blocks backside; electron-rich ring repels Nu⁻.', 'concept', 4),
    fc(22, 'Groups that assist nucleophilic substitution?', 'NO₂ at ortho/para.', 'concept', 4),
    fc(23, 'Meisenheimer complex?', 'Anionic σ-complex in addition–elimination.', 'definition', 4),
    fc(24, 'PhCl → aniline?', 'NH₃, Cu₂O, 475 K, 60 atm.', 'fact', 4),
    fc(25, 'PhCl → benzene?', 'H₂/Pd or Ni–Al alloy/NaOH.', 'fact', 4),
    fc(26, 'Wurtz–Fittig product?', 'Alkylbenzene (Ar–R).', 'fact', 5),
    fc(27, 'Fittig product?', 'Biaryl, e.g. biphenyl.', 'fact', 5),
    fc(28, 'PhMgBr + water?', 'Benzene.', 'fact', 5),
    fc(29, 'DDT made from?', 'Chlorobenzene + chloral, conc. H₂SO₄.', 'fact', 5),
    fc(30, 'Why is DDT restricted?', 'Persistent, fat-soluble, biomagnifies; resistance.', 'concept', 5),
    fc(31, 'Exam tip: halogen in EAS', 'Say “deactivating (−I) but o/p directing (+R)”.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
