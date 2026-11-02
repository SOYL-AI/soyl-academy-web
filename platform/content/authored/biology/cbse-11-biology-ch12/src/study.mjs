// ch12 notes and flashcards.
import { T, table, unit, PROV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { GLYC, LINK, TCA, CONV, N, RQ, GLUCOSE_KJ, ATP_KJ } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Respiration in Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Glycolysis and fermentation',
      `**Cellular respiration** is the **enzymatic oxidation of food** in the cell, releasing energy in **small steps** and storing it in the high-energy bonds of **ATP**, the energy currency of the cell. Plants have no specialised organs for gas exchange; each part (root, stem, leaf) takes care of its own, through stomata and lenticels.

**Glycolysis** (from the Greek for splitting sugar), also called the **EMP pathway** after Embden, Meyerhof and Parnas, takes place in the **cytoplasm of all living organisms** and does not need oxygen. **Glucose (6C)** is phosphorylated using **ATP** to glucose 6-phosphate, isomerised to fructose 6-phosphate and phosphorylated again using a second ATP to **fructose 1,6-bisphosphate**, which splits into two 3-carbon sugar phosphates (**PGAL**). Each PGAL is oxidised and phosphorylated, reducing **NAD⁺ to NADH**, to **1,3-bisphosphoglyceric acid**; in later steps **ATP is made directly from the substrate** (**substrate-level phosphorylation**), giving **pyruvic acid**. Per glucose: **${GLYC.atpIn} ATP used, ${GLYC.atpOut} ATP made, net ${GLYC.netAtp} ATP**, **${GLYC.nadh} NADH** and **${GLYC.pyruvate} pyruvic acid**.

The fate of pyruvic acid depends on oxygen. Without it, **fermentation** follows. In **alcoholic fermentation** (yeast), pyruvic acid is decarboxylated to acetaldehyde by **pyruvic acid decarboxylase** and then reduced to **ethanol** by **alcohol dehydrogenase**, giving ethanol and **CO₂**. In **lactic acid fermentation** (muscle cells during strenuous exercise, some bacteria), pyruvic acid is reduced to **lactic acid** by **lactate dehydrogenase**, with no CO₂. In both, **NADH is reoxidised to NAD⁺**, so glycolysis can continue. **Less than 7 percent** of the energy in glucose is released in fermentation, and not all of it is trapped as ATP (about ${N.effFerm} percent with the figures below); the products can also be hazardous, since yeast is poisoned when the alcohol reaches about 13 percent. With oxygen, pyruvic acid enters the mitochondria (aerobic respiration).

**Counting.** Net ATP, NADH and pyruvic acid scale with the number of glucose molecules (for 3 glucose: ${N.glyc3.atpNet} net ATP, ${N.glyc3.nadh} NADH, ${N.glyc3.pyruvate} pyruvic acid). In alcoholic fermentation 180 g of glucose gives 92 g of ethanol and 88 g of CO₂.`,
      [kt('Glycolysis', 'Splitting of glucose to two pyruvic acid in the cytoplasm, with a net gain of 2 ATP and 2 NADH.'), kt('Substrate-level phosphorylation', 'Making ATP by transferring phosphate directly from a substrate (not by the electron transport system).'), kt('Fermentation', 'Anaerobic fate of pyruvic acid (ethanol and CO₂ in yeast; lactic acid in muscle) that regenerates NAD⁺.'), kt('Anaerobic respiration', 'Breakdown of glucose without oxygen, giving a small yield of ATP.')],
      V.glyc,
      [1],
      [V.fates],
    ),
    sec(
      '2. Aerobic respiration: Krebs cycle and electron transport',
      `In the presence of oxygen, pyruvic acid is transported from the cytoplasm into the **mitochondrial matrix**. The **mitochondrion** has a smooth **outer membrane** and an inner membrane folded into **cristae**; the **matrix** holds the enzymes of the **link reaction and the Krebs cycle**, and the **inner membrane** the **electron transport system (ETS)**.

**Link reaction (oxidative decarboxylation).** Pyruvic acid + CoA + NAD⁺ → **acetyl CoA + CO₂ + NADH**, catalysed by **pyruvate dehydrogenase**, which needs Mg²⁺. Per glucose (2 pyruvic acid): ${LINK.acetylCoA} acetyl CoA, ${LINK.co2} CO₂ and ${LINK.nadh} NADH.

**Krebs (citric acid, TCA) cycle.** **Acetyl CoA (2C)** joins **oxaloacetic acid (4C)** to form **citric acid (6C)**, then isocitric acid. Oxidative decarboxylation gives **α-ketoglutaric acid (5C)** (CO₂, NADH) and **succinyl CoA (4C)** (CO₂, NADH). Succinyl CoA gives **succinic acid**, with **substrate-level phosphorylation** (GTP, then ATP); succinic acid gives **fumaric acid** (FADH₂), then **malic acid**, then **oxaloacetic acid** (NADH), so the cycle can go on. **Per acetyl CoA: ${TCA.nadh} NADH, ${TCA.fadh2} FADH₂, ${TCA.atp} ATP and ${TCA.co2} CO₂.** The cycle turns **twice per glucose**.

**Electron transport system and oxidative phosphorylation.** The ETS lies in the **inner mitochondrial membrane**. **Complex I (NADH dehydrogenase)** receives electrons from NADH; **complex II (succinate dehydrogenase)** receives those from FADH₂; both pass them to **ubiquinone**, then to **complex III (cytochrome bc₁)**, **cytochrome c** and **complex IV (cytochrome c oxidase**, with cytochromes a and a₃ and two copper centres), which passes them to **oxygen**, the **final acceptor**, forming **water**. Without oxygen the chain stops. Complexes I, III and IV **pump protons** from the matrix into the intermembrane space, producing a **proton gradient**; protons flow back through **ATP synthase (complex V)**, a channel **F₀** and a knob **F₁**, which makes **ATP**: **oxidative phosphorylation**.`,
      [kt('Acetyl CoA', 'Two-carbon compound formed from pyruvic acid; enters the Krebs cycle by joining oxaloacetic acid.'), kt('Krebs cycle', 'Cycle in the matrix that oxidises acetyl CoA, giving 3 NADH, 1 FADH₂, 1 ATP and 2 CO₂ per turn.'), kt('Electron transport system', 'Chain of complexes in the inner mitochondrial membrane that passes electrons from NADH and FADH₂ to oxygen.'), kt('Oxidative phosphorylation', 'ATP synthesis by ATP synthase using the proton gradient made by the electron transport system.')],
      V.mito,
      [2],
      [V.krebs, V.ets],
    ),
    sec(
      '3. Energy relations, respiratory quotient and the amphibolic pathway',
      `**ATP convention.** The textbook counts **${CONV.nadh} ATP per NADH** and **${CONV.fadh2} ATP per FADH₂** oxidised in the ETS. For one glucose: glycolysis gives ${GLYC.netAtp} ATP + ${GLYC.nadh} NADH (${GLYC.nadh * CONV.nadh} ATP) = **8**; the link reaction ${LINK.nadh} NADH = **6**; the Krebs cycle (two turns) 2 ATP + ${N.tca.nadh} NADH (${N.tca.nadh * CONV.nadh}) + ${N.tca.fadh2} FADH₂ (${N.tca.fadh2 * CONV.fadh2}) = **24**. Total **${N.total} ATP** (of which 4 by substrate-level phosphorylation); fermentation gives ${GLYC.netAtp}. This is a **theoretical maximum**: it assumes a sequential pathway, that no intermediates are used for other compounds, that only glucose is respired, and that NADH made in glycolysis enters the mitochondria at no cost. Newer measurements (about 2.5 ATP per NADH and 1.5 per FADH₂) give about ${N.totalNew} ATP per glucose.

**Energy.** Complete oxidation of glucose releases about **${GLUCOSE_KJ} kJ per mole**; each mole of ATP traps about **${ATP_KJ} kJ**. So ${N.total} ATP trap about ${N.kjAero} kJ, an efficiency of about **${N.effAero} percent**; the rest is lost as heat. Fermentation traps about ${N.kjFerm} kJ, about ${N.effFerm} percent. Aerobic respiration gives ${N.total / GLYC.netAtp} times as much ATP per glucose as fermentation. Aerobic respiration of one glucose uses 6 O₂ and releases 6 CO₂.

**Respiratory quotient (RQ)** = volume of CO₂ evolved ÷ volume of O₂ consumed. For **carbohydrates** (glucose) the equation C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O gives **RQ = ${RQ.glucose}**. For **fats** (e.g. tripalmitin: 2 C₅₁H₉₈O₆ + 145 O₂ → 102 CO₂ + 98 H₂O) RQ = **${RQ.tripalmitin}** (about 0.7), because fats contain less oxygen and need more of it. **Proteins** give about **0.9**. **Organic acids** give values above 1 (for example malic acid, ${RQ.malic}). In **anaerobic respiration** no oxygen is used, so RQ is infinite. A measured RQ therefore indicates which substrate is being respired.

**Amphibolic pathway.** Respiration is mainly **catabolic** (breakdown of substrates), yet it also supplies intermediates for **anabolic** pathways, so it is called **amphibolic**. Carbohydrates enter as glucose; **fats** are broken into glycerol (enters as PGAL) and fatty acids (enter as acetyl CoA); **proteins** are broken into amino acids, deaminated and fed into the Krebs cycle. Intermediates such as acetyl CoA can also be drawn off to make fatty acids, and Krebs cycle acids to make amino acids.`,
      [kt('Respiratory quotient', 'Volume of CO₂ evolved divided by volume of O₂ consumed in respiration.'), kt('Amphibolic pathway', 'A pathway that is both catabolic and anabolic, because its intermediates are used for biosynthesis.'), kt('Catabolic', 'Breaking down compounds to release energy.'), kt('Anabolic', 'Building compounds, using energy.')],
      V.bars,
      [3],
      [],
      [{ label: 'Respiratory quotient', latex: r`\text{RQ} = \dfrac{\text{volume of CO}_2 \text{ evolved}}{\text{volume of O}_2 \text{ consumed}}` }, { label: 'ATP per glucose (textbook convention)', latex: r`4 + 10 \times 3 + 2 \times 2 = 38` }],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving glycolysis as 4 ATP (it is a net of 2: 2 used, 4 made) or forgetting the 2 NADH.
- Placing glycolysis in the mitochondria (it is in the cytoplasm) or the Krebs cycle in the cytoplasm (it is in the matrix).
- Forgetting that the Krebs cycle turns twice per glucose, or counting 38 ATP without stating the 3 and 2 ATP per NADH and FADH₂ convention.
- Writing RQ as O₂ divided by CO₂ (it is CO₂ divided by O₂), or saying fats have an RQ above 1.
- Saying lactic acid fermentation gives CO₂ (it does not).
- Saying oxygen is used in the Krebs cycle (it is the final acceptor in the electron transport system).

**How marks are usually awarded**
- 1-mark items: a site, an enzyme, a product, a number such as net ATP or NADH per turn, an RQ value, the final electron acceptor.
- 2–3-mark answers: steps and balance sheet of glycolysis; alcoholic and lactic acid fermentation; link reaction; the Krebs cycle products; ETS components; why fats have a low RQ; amphibolic pathway.
- 5-mark answers: aerobic respiration with the Krebs cycle and ETS; ATP balance sheet; aerobic versus anaerobic respiration.
- Numericals: ATP and NADH from n glucose; ATP from given NADH and FADH₂; mass of ethanol or CO₂ from glucose; efficiency; RQ from volumes or equations — always show the working.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define cellular respiration.', 'Enzymatic oxidation of food in the cell, releasing energy in small steps and storing it as ATP.', 'definition', 1),
    fc(2, 'Where does glycolysis occur?', 'In the cytoplasm of all living organisms; no oxygen needed.', 'fact', 1),
    fc(3, 'Another name for glycolysis?', 'The EMP pathway (Embden, Meyerhof, Parnas).', 'fact', 1),
    fc(4, 'ATP used, made and net in glycolysis?', '2 used, 4 made, net 2 ATP per glucose.', 'fact', 1),
    fc(5, 'Products of glycolysis per glucose?', '2 pyruvic acid, 2 NADH, net 2 ATP.', 'fact', 1),
    fc(6, 'What is substrate-level phosphorylation?', 'Making ATP by transferring phosphate directly from a substrate.', 'definition', 1),
    fc(7, 'The three fates of pyruvic acid?', 'Lactic acid, ethanol + CO₂ (fermentation) or acetyl CoA (aerobic respiration).', 'concept', 1),
    fc(8, 'Enzymes of alcoholic fermentation?', 'Pyruvic acid decarboxylase and alcohol dehydrogenase.', 'fact', 1),
    fc(9, 'Enzyme of lactic acid fermentation?', 'Lactate dehydrogenase; no CO₂ is released.', 'fact', 1),
    fc(10, 'Why does fermentation reoxidise NADH?', 'To regenerate NAD⁺ so glycolysis can continue.', 'concept', 1),
    fc(11, 'How much glucose energy is released in fermentation?', 'Less than 7 percent, and not all of it trapped as ATP.', 'fact', 1),
    fc(12, 'Where do the link reaction and Krebs cycle occur?', 'In the mitochondrial matrix.', 'fact', 2),
    fc(13, 'Link reaction equation?', 'Pyruvic acid + CoA + NAD⁺ → acetyl CoA + CO₂ + NADH.', 'concept', 2),
    fc(14, 'Starting step of the Krebs cycle?', 'Acetyl CoA (2C) + oxaloacetic acid (4C) → citric acid (6C).', 'concept', 2),
    fc(15, 'Products of one turn of the Krebs cycle?', '3 NADH, 1 FADH₂, 1 ATP (via GTP) and 2 CO₂.', 'fact', 2),
    fc(16, 'Which Krebs steps release CO₂?', 'Isocitric to α-ketoglutaric acid, and α-ketoglutaric acid to succinyl CoA.', 'fact', 2),
    fc(17, 'Why twice per glucose?', 'One glucose gives 2 pyruvic acid, so 2 acetyl CoA and 2 turns.', 'concept', 2),
    fc(18, 'Where is the ETS located?', 'In the inner mitochondrial membrane (cristae).', 'fact', 2),
    fc(19, 'What do complexes I and II receive?', 'I: electrons from NADH. II: electrons from FADH₂.', 'fact', 2),
    fc(20, 'Order of the ETS after ubiquinone?', 'Complex III (cytochrome bc₁), cytochrome c, complex IV (cytochrome c oxidase), oxygen.', 'concept', 2),
    fc(21, 'Final electron acceptor?', 'Oxygen, which is reduced to water.', 'fact', 2),
    fc(22, 'Parts of ATP synthase?', 'F₀ channel in the membrane and F₁ knob.', 'fact', 2),
    fc(23, 'What is oxidative phosphorylation?', 'ATP made by ATP synthase using the proton gradient from the ETS.', 'definition', 2),
    fc(24, 'ATP convention in the textbook?', '3 ATP per NADH and 2 ATP per FADH₂.', 'formula', 3),
    fc(25, 'ATP from one glucose, aerobic?', '38 ATP (8 from glycolysis, 6 from the link reaction, 24 from the Krebs cycle).', 'formula', 3),
    fc(26, 'Energy efficiency of aerobic respiration?', 'About 40 percent (38 × 30.5 kJ out of 2870 kJ).', 'formula', 3),
    fc(27, 'Define RQ.', 'Volume of CO₂ evolved divided by volume of O₂ consumed.', 'definition', 3),
    fc(28, 'RQ of carbohydrate, fat and protein?', 'Carbohydrate 1; fat about 0.7; protein about 0.9.', 'fact', 3),
    fc(29, 'RQ of organic acids and of anaerobic respiration?', 'Above 1 (organic acids); infinite (no O₂ used).', 'fact', 3),
    fc(30, 'Why is respiration amphibolic?', 'It breaks substrates down (catabolic) and supplies intermediates for synthesis (anabolic).', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
