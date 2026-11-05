// ICSE 9 Chemistry ch06 notes and flashcards.
import { T, unit, PROV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Hard and Soft Water; Making Water Potable — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Soft and hard water: the action of soap; advantages and disadvantages',
      `**Soft water** lathers readily with soap. **Hard water** does not lather readily with soap; it forms a curdy **scum** because the dissolved **calcium and magnesium salts** react with the soap (a sodium salt of a fatty acid, for example sodium stearate) to form insoluble calcium and magnesium salts of the fatty acid. Lather forms only after these salts are used up.

| | Advantages | Disadvantages |
|---|---|---|
| **Hard water** | Pleasant taste; supplies calcium for bones and teeth; forms a protective coating inside lead pipes so lead does not dissolve | Wastes soap; makes scum; forms **scale** in kettles and boilers (wasting fuel, blocking pipes); dulls cloth |
| **Soft water** | Lathers easily and saves soap; no scale in boilers; good for washing | Contains little calcium; may dissolve lead from lead pipes |

Books vary in the lists of advantages and disadvantages; the points above are the usual ICSE ones.`,
      [kt('Soft water', 'Water that lathers readily with soap.'), kt('Hard water', 'Water that does not lather readily with soap and forms scum.'), kt('Scum', 'The insoluble curdy substance formed when soap reacts with the calcium and magnesium salts of hard water.')],
      [fm(r`\ce{2C17H35COONa + CaCl2 -> (C17H35COO)2Ca v + 2NaCl}`, 'Soap (sodium stearate) and calcium chloride make scum')],
      V.soap,
      [1],
    ),
    sec(
      '2. Temporary and permanent hardness',
      `Rainwater with dissolved carbon dioxide trickles over limestone or chalk and dissolves it: $\\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}$. Water also dissolves other calcium and magnesium salts from rocks and soil.

| | Temporary hardness | Permanent hardness |
|---|---|---|
| Caused by | **Hydrogencarbonates** of calcium and magnesium: Ca(HCO₃)₂, Mg(HCO₃)₂ | **Chlorides and sulphates** of calcium and magnesium: CaCl₂, MgCl₂, CaSO₄, MgSO₄ |
| Removed by boiling? | Yes | No |

Hard water can have both kinds. In the soap test, the soap needed after boiling shows the permanent part; the fall in soap needed on boiling shows the temporary part.`,
      [kt('Temporary hardness', 'Hardness caused by calcium and magnesium hydrogencarbonates; removed by boiling.'), kt('Permanent hardness', 'Hardness caused by calcium and magnesium chlorides and sulphates; not removed by boiling.')],
      [fm(r`\ce{CaCO3 + H2O + CO2 -> Ca(HCO3)2}`, 'Limestone dissolving in rainwater')],
      V.soap,
      [2],
    ),
    sec(
      '3. Removal of hardness by boiling and by washing soda',
      `**Boiling (temporary hardness only):** the hydrogencarbonates break down to insoluble carbonates, which settle as scale or are filtered off.

**Washing soda (temporary and permanent hardness):** sodium carbonate precipitates calcium and magnesium as insoluble carbonates, leaving sodium salts in solution.

| Hardness removed | Equation |
|---|---|
| Temporary, by boiling | Ca(HCO₃)₂ → CaCO₃ + H₂O + CO₂ ; Mg(HCO₃)₂ → MgCO₃ + H₂O + CO₂ |
| Permanent, by washing soda | CaCl₂ + Na₂CO₃ → CaCO₃ + 2NaCl ; MgSO₄ + Na₂CO₃ → MgCO₃ + Na₂SO₄ |
| Temporary, by washing soda | Ca(HCO₃)₂ + Na₂CO₃ → CaCO₃ + 2NaHCO₃ |

Magnesium carbonate is written as the precipitate in most textbooks (it is slightly soluble; some books give magnesium hydroxide when magnesium hydrogencarbonate is boiled).`,
      [kt('Washing soda', 'Sodium carbonate decahydrate; it precipitates calcium and magnesium ions as carbonates.')],
      [fm(r`\ce{Ca(HCO3)2 ->[\Delta] CaCO3 + H2O + CO2}`, 'Boiling calcium hydrogencarbonate'), fm(r`\ce{Mg(HCO3)2 ->[\Delta] MgCO3 + H2O + CO2}`, 'Boiling magnesium hydrogencarbonate'), fm(r`\ce{CaCl2 + Na2CO3 -> CaCO3 v + 2NaCl}`, 'Washing soda with calcium chloride'), fm(r`\ce{MgSO4 + Na2CO3 -> MgCO3 v + Na2SO4}`, 'Washing soda with magnesium sulphate'), fm(r`\ce{Ca(HCO3)2 + Na2CO3 -> CaCO3 v + 2NaHCO3}`, 'Washing soda with calcium hydrogencarbonate')],
      null,
      [3],
    ),
    sec(
      '4. Making water potable',
      `**Potable water** is water that is safe to drink. The steps in water treatment are:

1. **Screening** removes floating litter and large objects.
2. **Coagulation with alum:** potash alum dissolves and forms a jelly-like precipitate of aluminium hydroxide; the sticky **flakes trap fine suspended particles** and carry them down so they **settle**.
3. **Sedimentation and filtration:** the clear water is passed through **beds of sand and gravel**, which hold back the remaining particles.
4. **Chlorination:** a small, controlled dose of chlorine (as gas or bleaching powder) **kills disease-causing germs**.
5. **Defluoridation** (where needed): **excess fluoride** is removed, because too much fluoride damages teeth and bones (fluorosis).

At home, water can be made safer by **boiling** or by using a filter. Drinking limits for fluoride are set by health authorities (about 1 to 1.5 mg per litre is commonly quoted); the exact limit differs between standards.`,
      [kt('Potable water', 'Water that is safe to drink.'), kt('Alum', 'Potash alum, used to make fine suspended particles settle.'), kt('Chlorination', 'Adding chlorine to water to kill germs.'), kt('Defluoridation', 'Removing excess fluoride from water.')],
      [],
      V.treat,
      [4],
    ),
    sec(
      '5. Diseases caused by polluted water',
      `| Disease | Cause | Main signs |
|---|---|---|
| Cholera | Bacteria | Severe watery diarrhoea |
| Typhoid | Bacteria | Prolonged fever |
| Dysentery | Bacteria or amoeba | Diarrhoea with blood |
| Diarrhoea | Bacteria, viruses or others | Loose, watery stools |
| Hepatitis A | Virus | Jaundice (yellow skin and eyes) |
| Polio | Virus | Weakness or paralysis of the limbs |

**Prevention:** protect water sources from sewage; drink boiled, filtered or chlorinated water; wash hands and keep food covered; use vaccines where advised (for example polio, typhoid and hepatitis A); give **oral rehydration solution** for diarrhoea and seek medical help. These diseases spread when sewage or other polluted water mixes with drinking water.`,
      [kt('Water-borne disease', 'A disease spread by drinking water contaminated with disease-causing organisms.')],
      [],
      null,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Naming temporary hardness without the **hydrogencarbonates**, or permanent hardness without the **chlorides and sulphates**.
- Saying boiling removes **permanent** hardness.
- Writing equations for washing soda without balancing, or leaving out the **precipitate**.
- Listing the steps of water treatment without giving the **purpose** of each.
- Saying alum "kills germs"; it makes fine particles **settle**. Chlorine kills germs.
- Naming a disease without its **cause** (bacteria, amoeba or virus).

**How marks are usually awarded**
- 1 mark: a name, a salt, a term or one observation.
- 2 marks: a balanced equation or two differences, matched point for point.
- 3 marks: three steps with their purposes, or advantages and disadvantages.
- 10-mark structured question: a situation or flow diagram followed by parts such as equations, observations, a calculation and a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Soft water?', 'Lathers readily with soap.', 'definition', 1),
    fc(2, 'Hard water?', 'Does not lather readily with soap; forms scum.', 'definition', 1),
    fc(3, 'What is scum?', 'Insoluble calcium and magnesium salts of the fatty acid in soap.', 'fact', 1),
    fc(4, 'Two advantages of hard water?', 'Pleasant taste; calcium for bones and teeth (also protects lead pipes).', 'fact', 1),
    fc(5, 'Two disadvantages of hard water?', 'Wastes soap; forms scale in kettles and boilers.', 'fact', 1),
    fc(6, 'An advantage of soft water?', 'Lathers easily and saves soap.', 'fact', 1),
    fc(7, 'A disadvantage of soft water?', 'May dissolve lead from lead pipes.', 'fact', 1),
    fc(8, 'How does water become hard?', 'Rainwater with carbon dioxide dissolves limestone to form calcium hydrogencarbonate.', 'concept', 2),
    fc(9, 'Temporary hardness is caused by?', 'Hydrogencarbonates of calcium and magnesium.', 'fact', 2),
    fc(10, 'Permanent hardness is caused by?', 'Chlorides and sulphates of calcium and magnesium.', 'fact', 2),
    fc(11, 'Formula of calcium hydrogencarbonate?', 'Ca(HCO₃)₂', 'formula', 2),
    fc(12, 'Which hardness does boiling remove?', 'Temporary hardness only.', 'fact', 3),
    fc(13, 'Equation for boiling calcium hydrogencarbonate?', 'Ca(HCO₃)₂ → CaCO₃ + H₂O + CO₂', 'formula', 3),
    fc(14, 'Equation for boiling magnesium hydrogencarbonate?', 'Mg(HCO₃)₂ → MgCO₃ + H₂O + CO₂', 'formula', 3),
    fc(15, 'Which substance removes both kinds of hardness?', 'Washing soda (sodium carbonate).', 'fact', 3),
    fc(16, 'Washing soda with calcium chloride?', 'CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl', 'formula', 3),
    fc(17, 'Washing soda with magnesium sulphate?', 'MgSO₄ + Na₂CO₃ → MgCO₃↓ + Na₂SO₄', 'formula', 3),
    fc(18, 'Washing soda with calcium hydrogencarbonate?', 'Ca(HCO₃)₂ + Na₂CO₃ → CaCO₃↓ + 2NaHCO₃', 'formula', 3),
    fc(19, 'Potable water?', 'Water that is safe to drink.', 'definition', 4),
    fc(20, 'Purpose of screening?', 'Removes floating litter and large objects.', 'fact', 4),
    fc(21, 'Role of alum?', 'Forms sticky flakes that trap fine particles so they settle.', 'concept', 4),
    fc(22, 'Purpose of the sand and gravel filter?', 'Removes the remaining suspended particles.', 'fact', 4),
    fc(23, 'Purpose of chlorination?', 'Kills disease-causing germs.', 'fact', 4),
    fc(24, 'Purpose of defluoridation?', 'Removes excess fluoride from water.', 'fact', 4),
    fc(25, 'Water-borne diseases caused by bacteria?', 'Cholera, typhoid, diarrhoea (dysentery: bacteria or amoeba).', 'fact', 5),
    fc(26, 'Water-borne diseases caused by viruses?', 'Hepatitis A and polio.', 'fact', 5),
    fc(27, 'Main sign of cholera?', 'Severe watery diarrhoea.', 'fact', 5),
    fc(28, 'Treatment for dehydration in diarrhoea?', 'Oral rehydration solution (and medical help).', 'fact', 5),
    fc(29, 'Three ways to prevent water-borne diseases?', 'Drink treated or boiled water; wash hands; vaccination.', 'exam-tip', 5),
    fc(30, 'Why is chlorination done after filtration?', 'Chlorine works best on clear water; mud can shield germs.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
