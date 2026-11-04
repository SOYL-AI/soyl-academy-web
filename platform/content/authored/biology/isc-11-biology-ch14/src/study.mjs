// ISC 11 Biology ch14 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { GLY, LINK2, KREBS1, KREBS2, TOTAL, Y, Y2, FERM_ATP, FOLD, effAerobic, effFerm, RQ, SEED_RQ } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Respiration in Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Gas exchange, aerobic and anaerobic respiration, fermentation',
      `**Respiration** is the oxidation of food, mainly glucose, in living cells to release energy, which is trapped in **ATP**. Plants have **no special organs** for gas exchange: each organ exchanges gases by **diffusion**. This works because the rate of respiration in plants is low, cells lie near the surface or beside air spaces, and plant parts are thin or porous. **Leaves** use **stomata** and intercellular spaces; **woody stems** use **lenticels**; **roots** use root hairs and soil air.

**Aerobic respiration** needs oxygen and oxidises glucose completely: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (about 686 kcal per mole). **Anaerobic respiration** takes place without oxygen and oxidises glucose only partly. The first stage of both, **glycolysis**, takes place in the cytoplasm.

**Fermentation** (anaerobic respiration) changes pyruvate to a product that regenerates NAD⁺ so that glycolysis can continue.
- **Alcoholic fermentation:** pyruvate → ethanol + CO₂. It occurs in **yeast** and in plant tissues short of oxygen, such as flooded roots and seeds with impermeable coats. Yeast is poisoned when the alcohol reaches about 13 percent.
- **Lactic acid fermentation:** pyruvate → lactic acid; it occurs in **lactic acid bacteria** (souring of milk to curd) and in **muscle** cells in strenuous exercise.
Only **${FERM_ATP} ATP** per glucose are gained, so fermentation is much less efficient than aerobic respiration (${effFerm} percent of the energy of glucose trapped against ${effAerobic} percent, using 686 kcal per mole of glucose and 7.3 kcal per mole of ATP). **Obligate anaerobes** can live only without oxygen; **facultative anaerobes** use either.

| Feature | Aerobic | Alcoholic fermentation | Lactic acid fermentation |
|---|---|---|---|
| Oxygen | needed | not needed | not needed |
| End products | CO₂, H₂O | ethanol, CO₂ | lactic acid |
| Site | cytoplasm and mitochondria | cytoplasm | cytoplasm |
| ATP per glucose | ${Y.total} | ${FERM_ATP} | ${FERM_ATP} |`,
      [kt('Respiration', 'Oxidation of food in cells to release energy as ATP.'), kt('Aerobic respiration', 'Complete oxidation of glucose using oxygen.'), kt('Fermentation', 'Anaerobic breakdown of pyruvate to ethanol and CO₂, or to lactic acid.'), kt('Lenticel', 'Pore in the bark of woody stems for gas exchange.')],
      V.ferm,
      [1],
    ),
    sec(
      '2. Glycolysis and the Krebs (TCA) cycle as flowcharts',
      `**Glycolysis** (EMP pathway, after Embden, Meyerhof and Parnas) takes place in the **cytoplasm**. One **glucose (6 C)** is changed in a series of steps to two **pyruvate (3 C)**. Two ATP are used early on, four ATP are formed later and ${GLY.nadh} NADH are formed. **Net gain per glucose: ${GLY.net} ATP, ${GLY.nadh} NADH and ${GLY.pyruvate} pyruvate.** (The individual intermediates are not required; learn the flowchart.)

**Link reaction:** in the **mitochondrial matrix**, each pyruvate loses one CO₂ and is oxidised to **acetyl CoA (2 C)**, with one NADH. Per glucose: ${LINK2.co2} CO₂ and ${LINK2.nadh} NADH.

**Krebs cycle (citric acid or TCA cycle; Hans Krebs, 1937):** also in the **matrix**. Acetyl CoA joins **oxaloacetic acid (OAA, 4 C)** to form **citric acid (6 C)**. In the cycle two CO₂ are released, and the cycle ends with OAA, ready to accept another acetyl CoA. **Per acetyl CoA:** ${KREBS1.nadh} NADH, ${KREBS1.fadh2} FADH₂, ${KREBS1.atp} ATP (as GTP) and ${KREBS1.co2} CO₂. **Per glucose (two turns):** ${KREBS2.nadh} NADH, ${KREBS2.fadh2} FADH₂, ${KREBS2.atp} ATP and ${KREBS2.co2} CO₂.

**Totals for one glucose:** ${TOTAL.co2} CO₂ (all the carbon of glucose), ${TOTAL.nadh} NADH (2 glycolysis, 2 link, 6 Krebs), ${TOTAL.fadh2} FADH₂ and ${TOTAL.substrateAtp} ATP made directly (substrate-level phosphorylation). ATP made directly in this way is **substrate-level phosphorylation**, unlike the ATP made on the electron transport system.`,
      [kt('EMP pathway', 'Glycolysis; glucose to pyruvate in the cytoplasm.'), kt('Link reaction', 'Pyruvate to acetyl CoA with release of CO₂ and NADH.'), kt('Krebs cycle', 'Cycle in the matrix that oxidises acetyl CoA to CO₂.'), kt('Substrate-level phosphorylation', 'Direct transfer of phosphate to ADP in glycolysis and the Krebs cycle.')],
      V.glyco,
      [2],
      [V.krebs, V.mito],
    ),
    sec(
      '3. Electron transport, oxidative phosphorylation and the ATP yield',
      `The **electron transport system (ETS)** is in the **inner mitochondrial membrane** (cristae). It is a series of carriers: **complex I** receives electrons from **NADH**; **complex II** from **FADH₂**; electrons pass through **ubiquinone** to **complex III**, **cytochrome c** and **complex IV** (cytochrome oxidase), where **oxygen** is the **final electron acceptor** and combines with H⁺ to form **water**. Complexes I, III and IV **pump protons from the matrix into the intermembrane space**, making a **proton gradient** (the intermembrane space is more acidic).

**Oxidative phosphorylation** (Mitchell’s chemiosmotic hypothesis): protons flow back into the matrix through **ATP synthase** (**F₀F₁ particles**), whose **F₀** is a channel in the membrane and whose **F₁** knob, projecting into the matrix, makes **ATP** from ADP and Pi. Without oxygen the chain stops, NAD⁺ is not regenerated and the cycle halts.

**ATP yield of one glucose (textbook count: 3 ATP per NADH, 2 per FADH₂):** glycolysis ${GLY.net} + ${GLY.nadh} × 3 = ${Y.glycolysis}; link reaction ${LINK2.nadh} × 3 = ${Y.link}; Krebs cycle ${KREBS2.atp} + ${KREBS2.nadh} × 3 + ${KREBS2.fadh2} × 2 = ${Y.krebs}; **total ${Y.total} ATP** (${Y.ets} on the ETS and ${TOTAL.substrateAtp} directly). Some books give 36, when 2 ATP are used to bring cytoplasmic NADH into the mitochondrion, and current estimates, using 2.5 and 1.5 ATP per carrier, give about **${Y2.total} ATP**. Aerobic respiration yields ${FOLD} times the ATP of fermentation.

| Feature | Mitochondrion | Chloroplast |
|---|---|---|
| Membrane | inner membrane | thylakoid membrane |
| Electron source | NADH, FADH₂ | light (water splitting) |
| Final acceptor | O₂ | NADP⁺ |
| H⁺ accumulate in | intermembrane space | thylakoid lumen |
| ATP appears in | matrix | stroma |`,
      [kt('ETS', 'Electron transport system in the inner mitochondrial membrane.'), kt('Oxidative phosphorylation', 'ATP formation using the energy of electron transport and the proton gradient.'), kt('Final acceptor', 'Oxygen, which forms water.'), kt('ATP synthase', 'F₀F₁ enzyme complex that makes ATP as protons flow through it.')],
      V.ets,
      [3],
    ),
    sec(
      '4. Amphibolic pathway and respiratory quotient',
      `Respiration is **amphibolic**: it is **catabolic**, because carbohydrates, fats and proteins are broken down to release energy, and **anabolic**, because intermediates are withdrawn to build other compounds. **Fats** are hydrolysed to glycerol and fatty acids; fatty acids are broken into two-carbon units that enter as **acetyl CoA**, and glycerol enters as a sugar phosphate. **Proteins** give amino acids, which lose their amino group and enter as pyruvate, acetyl CoA or Krebs cycle acids. Acetyl CoA is drawn off to make fatty acids, and Krebs cycle acids to make amino acids, pigments and nucleotides.

The **respiratory quotient (RQ)** is **volume (or moles) of CO₂ released ÷ volume of O₂ consumed**. It is **1.0 for carbohydrates** (glucose: 6 CO₂ for 6 O₂), **less than 1 for fats** (palmitic acid ${RQ.palmitic}; stearic acid ${RQ.stearic}; tripalmitin ${RQ.tripalmitin}), about **0.9 for proteins**, and **greater than 1 for organic acids** (succinic acid ${RQ.succinic}; tartaric acid ${RQ.tartaric}; oxalic acid ${RQ.oxalic}). In **anaerobic** respiration CO₂ is released but no O₂ is used, so the RQ is **infinite**. A mixture of substrates gives an intermediate value, for example ${SEED_RQ} for seeds that use carbohydrate and fat. The RQ is measured with a **respirometer**; the CO₂ is absorbed by potassium hydroxide.`,
      [kt('Amphibolic', 'Both catabolic and anabolic.'), kt('Respiratory quotient', 'CO₂ released divided by O₂ consumed.'), kt('Acetyl CoA', 'Two-carbon entry compound of the Krebs cycle from carbohydrates, fats and proteins.')],
      V.amphi,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving 4 ATP for glycolysis (the net gain is 2).
- Writing detailed intermediates of glycolysis or the Krebs cycle; the syllabus asks for flowcharts only.
- Placing the Krebs cycle in the cytoplasm (it is in the matrix) or the ETS in the matrix (it is in the inner membrane).
- Saying oxygen is used in the Krebs cycle directly; it is the final acceptor of the ETS.
- Forgetting to state the 3 and 2 ATP assumption when giving ${Y.total} ATP.
- Calculating RQ from an unbalanced equation.
- Saying lactic acid fermentation releases CO₂ (it does not).

**How marks are usually awarded**
- 1-mark subparts: site of a stage, an end product, the final electron acceptor, RQ of a substrate, an assertion-reason on fermentation.
- 2–3-mark questions: aerobic versus anaerobic; glycolysis flowchart; Krebs cycle flowchart; ETS and chemiosmosis; why respiration is amphibolic; RQ calculations.
- 5-mark questions in parts: glycolysis and Krebs cycle flowcharts with products; ETS with ATP count; RQ with equations and significance.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'How do woody stems exchange gases?', 'Through lenticels.', 'fact', 1),
    fc(2, 'Why do plants need no special breathing organs?', 'Low respiration rate; short diffusion distance; each part exchanges gas by diffusion.', 'concept', 1),
    fc(3, 'Equation of aerobic respiration?', 'C6H12O6 + 6O2 → 6CO2 + 6H2O + energy.', 'definition', 1),
    fc(4, 'End products of alcoholic fermentation?', 'Ethanol and carbon dioxide.', 'fact', 1),
    fc(5, 'End product of lactic acid fermentation?', 'Lactic acid (no CO2).', 'fact', 1),
    fc(6, 'ATP per glucose in fermentation?', `${FERM_ATP}, net.`, 'fact', 1),
    fc(7, 'Why does yeast stop making alcohol at about 13 percent?', 'Alcohol is toxic to yeast.', 'concept', 1),
    fc(8, 'Where does glycolysis take place?', 'In the cytoplasm.', 'fact', 2),
    fc(9, 'Other name for glycolysis?', 'EMP pathway.', 'fact', 2),
    fc(10, 'Net products of glycolysis per glucose?', `${GLY.net} ATP, ${GLY.nadh} NADH, ${GLY.pyruvate} pyruvate.`, 'exam-tip', 2),
    fc(11, 'Products of the link reaction per pyruvate?', 'Acetyl CoA, CO2 and NADH.', 'fact', 2),
    fc(12, 'Where does the Krebs cycle occur?', 'Mitochondrial matrix.', 'fact', 2),
    fc(13, 'Acid that accepts acetyl CoA in the cycle?', 'Oxaloacetic acid (OAA), giving citric acid.', 'fact', 2),
    fc(14, 'Products of the Krebs cycle per acetyl CoA?', `${KREBS1.nadh} NADH, ${KREBS1.fadh2} FADH2, ${KREBS1.atp} ATP, ${KREBS1.co2} CO2.`, 'exam-tip', 2),
    fc(15, 'CO2 released per glucose in total?', `${TOTAL.co2}.`, 'fact', 2),
    fc(16, 'Who worked out the Krebs cycle?', 'Hans Krebs (1937).', 'fact', 2),
    fc(17, 'Where is the electron transport system?', 'Inner mitochondrial membrane (cristae).', 'fact', 3),
    fc(18, 'Final electron acceptor?', 'Oxygen, forming water.', 'fact', 3),
    fc(19, 'What do complexes I, III and IV do?', 'Pump protons into the intermembrane space.', 'concept', 3),
    fc(20, 'Parts of ATP synthase?', 'F0 channel; F1 knob in the matrix that makes ATP.', 'fact', 3),
    fc(21, 'ATP per NADH and per FADH2 (textbook)?', '3 and 2.', 'exam-tip', 3),
    fc(22, 'Total ATP per glucose (textbook)?', `${Y.total}.`, 'exam-tip', 3),
    fc(23, 'ATP per glucose by current estimates?', `About ${Y2.total} (2.5 and 1.5 per carrier).`, 'concept', 3),
    fc(24, 'Substrate-level phosphorylation?', 'Direct ATP formation in glycolysis and the Krebs cycle.', 'definition', 3),
    fc(25, 'What does amphibolic mean?', 'Both catabolic and anabolic.', 'definition', 4),
    fc(26, 'How do fatty acids enter respiration?', 'As acetyl CoA.', 'fact', 4),
    fc(27, 'Define respiratory quotient.', 'CO2 released divided by O2 consumed.', 'definition', 4),
    fc(28, 'RQ of carbohydrate, fat, protein?', `${RQ.glucose}; about 0.7; about 0.9.`, 'exam-tip', 4),
    fc(29, 'RQ of an organic acid?', 'More than 1 (for example tartaric acid 1.6).', 'fact', 4),
    fc(30, 'RQ in anaerobic respiration?', 'Infinite: CO2 released, no O2 used.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
