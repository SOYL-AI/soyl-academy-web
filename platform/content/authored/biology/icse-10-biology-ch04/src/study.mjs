// ICSE 10 Biology ch04 Transpiration — notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { WEIGHT, BUDGET } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Transpiration — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Transpiration and its importance',
      `**Transpiration** is the loss of water in the form of **vapour** from the aerial parts of a plant. Water evaporates from the moist cell walls of the leaf into the air spaces and diffuses out.

**Types (by route):** **stomatal** (through stomata; most of the loss), **cuticular** (through the cuticle; small), **lenticular** (through lenticels in bark; very little).

Almost all the water absorbed is lost this way (for example, a plant that absorbs ${BUDGET.absorbed} mL and keeps ${BUDGET.kept} mL loses ${BUDGET.pctLost} per cent).

**Importance:** creates the **transpiration pull** that lifts water and dissolved **minerals** through the xylem; **cools** the leaves; distributes minerals. Because it also wastes water and can cause **wilting**, it is called a **necessary evil**.`,
      [kt('Transpiration', 'Loss of water as vapour from the aerial parts of a plant.'), kt('Transpiration pull', 'The pull on the water columns in the xylem created by evaporation from leaves.')],
      table(['Route', 'Share'], [['Stomata', 'Most'], ['Cuticle', 'Small'], ['Lenticels', 'Very little']], 'Table of the three routes of transpiration and their share'),
      [1],
    ),
    sec(
      '2. Opening and closing of stomata: potassium ion exchange',
      `A **stoma** is a pore surrounded by two bean-shaped **guard cells**, which (unlike other epidermal cells) contain **chloroplasts**. Their **inner walls** (towards the pore) are **thick**; their outer walls are thin.

**Opening (light):** **potassium ions (K+)** move from the neighbouring epidermal cells **into** the guard cells → solute concentration rises → **water enters by osmosis** → guard cells become **turgid** → thin outer walls stretch more, the cells curve apart → **pore opens**.

**Closing (dark, or when the plant is short of water):** K+ ions move **out** → water leaves by osmosis → guard cells become **flaccid** and straight → **pore closes**.`,
      [kt('Guard cells', 'Bean-shaped cells with chloroplasts that surround a stoma and control its opening.'), kt('Turgid', 'Swollen and firm because of water taken in.'), kt('Flaccid', 'Limp because of water lost.')],
      V.stoma,
      [2],
      [V.mechanism],
    ),
    sec(
      '3. Experiments on transpiration',
      `**Loss of weight:** two flasks of water, each with a **layer of oil** (to stop evaporation): A with a leafy shoot, B with a leafless shoot. Weigh at the start and after some hours. A loses much more weight (for example ${WEIGHT.leafy.loss} g against ${WEIGHT.leafless.loss} g in ${WEIGHT.hours} hours). **Conclusion:** water is lost mainly through the leaves. A potted plant with its pot and soil wrapped in polythene can be weighed in the same way.

**Bell jar:** a watered potted plant with its **pot and soil covered in polythene**, under a bell jar on a glass plate; **control**: a covered pot without a plant. **Observation:** drops of water on the inner wall of the jar with the plant only (they turn dry cobalt chloride paper pink). **Conclusion:** the plant gives off water vapour.

**Cobalt chloride paper on a dorsiventral leaf:** dry **blue** paper on both surfaces, covered with glass slides and clipped. **Observation:** the paper on the **lower surface turns pink first**. **Conclusion:** more water is lost from the lower surface, which has **more stomata**. (On an isobilateral leaf such as maize both papers change at about the same time.)`,
      [kt('Cobalt chloride paper', 'Paper that is blue when dry and turns pink when it absorbs moisture.'), kt('Dorsiventral leaf', 'Leaf with distinct upper and lower surfaces; most stomata on the lower surface.')],
      V.belljar,
      [3],
      [V.cobalt, V.weight],
    ),
    sec(
      "4. Ganong's potometer",
      `A **potometer** measures the **rate of water uptake** by a leafy shoot. The shoot is fitted with an **airtight cork** into a water-filled apparatus; an **air bubble** in a **graduated capillary** moves towards the shoot as water is taken up. A **reservoir** with a stopcock resets the bubble.

**Precautions:** cut the shoot **under water** (no air in the xylem); make all joints **airtight** with Vaseline; keep conditions steady.

**Why it approximates transpiration:** nearly all the water absorbed is lost by transpiration.

**Limitations:** it measures **uptake, not loss**; it uses a **cut shoot**, not a whole plant; air leaks and **temperature changes** affect the bubble.`,
      [kt('Potometer', 'Apparatus that measures the rate of water uptake by a cut leafy shoot.')],
      V.potometer,
      [4],
      [V.chart],
    ),
    sec(
      '5. Factors affecting transpiration; adaptations',
      `| Factor | Effect | Reason |
|---|---|---|
| Light | Increases | Stomata open |
| Temperature | Increases | Faster evaporation |
| Humidity | Decreases | Less difference in moisture between leaf and air |
| Wind | Increases | Moist air around the leaf is removed |
| Soil water | Shortage decreases it | Stomata close |

**Adaptations to reduce transpiration:** leaves reduced to **spines** (Opuntia); **thick waxy cuticle**; **sunken stomata**; fewer stomata, mostly on the lower surface; hairs or rolled leaves; shedding leaves in the dry season.`,
      [kt('Wilting', 'Drooping of leaves when water loss exceeds uptake.'), kt('Sunken stomata', 'Stomata in pits that trap moist air.')],
      table(['Condition', 'Rate'], [['Hot, dry, windy, bright', 'High'], ['Cool, humid, still, dark', 'Low']], 'Table: hot, dry, windy and bright conditions give a high rate; cool, humid, still and dark give a low rate'),
      [5],
    ),
    sec(
      '6. Guttation and bleeding',
      `**Guttation:** loss of water as **liquid drops** (containing dissolved salts) through **hydathodes** at the tips and margins of leaves, at **night or early morning** when **root pressure is high** and transpiration is low; for example grasses, tomato, garden nasturtium.

**Bleeding:** oozing of **sap** from a **cut or injured** part of a plant, due to root pressure.

| Transpiration | Guttation |
|---|---|
| Water vapour | Liquid drops with salts |
| Through stomata (mainly) | Through hydathodes |
| Mostly by day | Night and early morning |`,
      [kt('Guttation', 'Loss of liquid water through hydathodes.'), kt('Hydathode', 'Pore at the leaf tip or margin through which guttation occurs.'), kt('Bleeding', 'Oozing of sap from a cut or injured part of a plant.')],
      table(['Process', 'Form'], [['Transpiration', 'Vapour'], ['Guttation', 'Liquid drops'], ['Bleeding', 'Sap from wounds']], 'Table of transpiration, guttation and bleeding and the form of water lost'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing "water" instead of "water vapour" for transpiration.
- Saying potassium ions leave the guard cells when stomata open.
- Forgetting the control (no plant) or the polythene cover in the bell jar experiment.
- Saying a potometer measures transpiration exactly.
- Mixing up guttation (hydathodes, liquid) and bleeding (wounds, sap).

**How marks are usually awarded**
- 1 mark: a term, a colour change, an odd one out **with its category**.
- 2 marks: a precaution with its reason, or two differences.
- 3 marks: the stomatal mechanism in steps, an experiment (set-up, observation, conclusion), or three factors with reasons.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Transpiration?', 'Loss of water vapour from aerial parts.', 'definition', 1),
    fc(2, 'Main route of transpiration?', 'Stomata.', 'fact', 1),
    fc(3, 'Two other routes?', 'Cuticle; lenticels.', 'fact', 1),
    fc(4, 'Two uses of transpiration?', 'Transpiration pull; cooling.', 'concept', 1),
    fc(5, 'Why a "necessary evil"?', 'Useful, but wastes water.', 'concept', 1),
    fc(6, 'Guard cells?', 'Bean-shaped cells with chloroplasts around a stoma.', 'definition', 2),
    fc(7, 'Which guard cell wall is thick?', 'The inner wall, facing the pore.', 'fact', 2),
    fc(8, 'What enters guard cells in light?', 'Potassium ions, then water.', 'concept', 2),
    fc(9, 'Turgid guard cells mean?', 'Stoma open.', 'concept', 2),
    fc(10, 'Why do stomata close at night?', 'Potassium ions and water leave the guard cells.', 'concept', 2),
    fc(11, 'Dry cobalt chloride paper colour?', 'Blue; pink when moist.', 'fact', 3),
    fc(12, 'Which surface turns cobalt paper pink first?', 'Lower surface: more stomata.', 'exam-tip', 3),
    fc(13, 'Why cover the pot with polythene?', 'Stop evaporation from soil.', 'exam-tip', 3),
    fc(14, 'Control for the bell jar?', 'Covered pot without a plant.', 'exam-tip', 3),
    fc(15, 'Why oil on the water in the flask?', 'Stops evaporation from the water surface.', 'exam-tip', 3),
    fc(16, 'Conclusion of the loss-of-weight experiment?', 'Water is lost mainly through leaves.', 'concept', 3),
    fc(17, 'What does a potometer measure?', 'Rate of water uptake.', 'fact', 4),
    fc(18, 'Why cut the shoot under water?', 'Keep air out of the xylem.', 'exam-tip', 4),
    fc(19, 'Use of the reservoir?', 'Reset the air bubble.', 'fact', 4),
    fc(20, 'One limitation of the potometer?', 'Measures uptake, not loss.', 'concept', 4),
    fc(21, 'Effect of wind on transpiration?', 'Increases it.', 'fact', 5),
    fc(22, 'Effect of humidity?', 'Decreases it.', 'fact', 5),
    fc(23, 'Effect of light?', 'Increases it: stomata open.', 'fact', 5),
    fc(24, 'Why do leaves wilt on hot afternoons?', 'Loss faster than uptake.', 'concept', 5),
    fc(25, 'Two desert adaptations?', 'Spines; sunken stomata.', 'fact', 5),
    fc(26, 'How do sunken stomata help?', 'Trap moist air above the pore.', 'concept', 5),
    fc(27, 'Guttation?', 'Liquid water lost through hydathodes.', 'definition', 6),
    fc(28, 'When does guttation occur?', 'Night or early morning: high root pressure.', 'fact', 6),
    fc(29, 'Bleeding?', 'Sap oozing from a cut part.', 'definition', 6),
    fc(30, 'Guttation vs transpiration?', 'Liquid, hydathodes vs vapour, stomata.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
