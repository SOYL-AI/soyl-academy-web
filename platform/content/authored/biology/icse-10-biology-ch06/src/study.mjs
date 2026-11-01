// ICSE 10 Biology ch06 notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Coordination in Plants — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Plant growth regulators',
      `Plants have no nervous system. They coordinate growth with **plant growth regulators** (**phytohormones**): chemicals made in **small amounts** in one part of the plant that **move** to other parts and control growth and development.

| Group | Regulators | General effect |
|---|---|---|
| **Growth promoters** | Auxins, gibberellins, cytokinins | Speed up cell division, cell elongation, germination, fruit growth |
| **Growth inhibitors** | Abscisic acid (ABA), ethylene | Slow growth; bring about dormancy, ripening, ageing and leaf fall |

Hormones often act **together or against each other**: gibberellin breaks dormancy while abscisic acid maintains it; auxin from the tip suppresses side buds while cytokinin helps them grow.`,
      [kt('Plant growth regulator', 'A chemical made in small amounts in one part of a plant that controls growth elsewhere.'), kt('Growth promoter', 'A regulator that speeds up growth: auxin, gibberellin, cytokinin.'), kt('Growth inhibitor', 'A regulator that slows growth: abscisic acid, ethylene.')],
      V.hormones,
      [1],
    ),
    sec(
      '2. Effects of each regulator',
      `| Regulator | Main effects | Everyday use |
|---|---|---|
| **Auxin** (made at shoot tips) | Cell **elongation** just below the tip; **apical dominance** (lateral buds stay dormant); root formation; fruit growth | Rooting powder for **cuttings**; **seedless fruits**; prevents early fruit drop; synthetic **2,4-D** kills broad-leaved weeds |
| **Gibberellin** | **Lengthens internodes** (dwarf plants grow tall); breaks **dormancy** of seeds and buds; **bolting** of rosette plants | Larger grapes; faster germination of barley |
| **Cytokinin** (made in root tips; rich in coconut water) | Promotes **cell division**; **delays ageing** of leaves; helps lateral buds grow | Keeps cut leaves and flowers fresh; tissue culture |
| **Abscisic acid** — the **stress hormone** | **Closes stomata** when water is short; keeps seeds and buds **dormant**; promotes **leaf fall** | Helps crops survive drought |
| **Ethylene** — a **gas** | **Ripens fruits**; hastens **ageing** and fall of leaves, flowers and fruits | Ripening of bananas and mangoes in closed rooms |

**Apical dominance.** The shoot tip makes auxin, which moves down and keeps lateral buds dormant. Removing the tip (pinching, pruning, plucking tea) removes the auxin, so side shoots grow and the plant becomes bushy.`,
      [kt('Apical dominance', 'Suppression of lateral buds by auxin from the shoot tip.'), kt('Bolting', 'Sudden lengthening of the stem of a rosette plant before flowering, caused by gibberellin.'), kt('Senescence', 'Ageing of a leaf or other part; delayed by cytokinins.'), kt('Parthenocarpy', 'Formation of fruit without fertilisation, giving seedless fruits.')],
      table(['Hormone', 'One key effect'], [['Auxin', 'Apical dominance'], ['Gibberellin', 'Longer internodes'], ['Cytokinin', 'Cell division'], ['Abscisic acid', 'Closes stomata'], ['Ethylene', 'Fruit ripening']], 'Table of one key effect of each plant hormone'),
      [1],
    ),
    sec(
      '3. Tropic movements',
      `A **tropism** (tropic movement) is the **growth** of a plant part **towards** (positive) or **away from** (negative) a **stimulus coming from one direction**. It is slow and permanent because it results from **unequal growth** on the two sides of the organ.

| Tropism | Stimulus | Positive | Negative |
|---|---|---|---|
| **Phototropism** | Light | Shoot | Root |
| **Geotropism** | Gravity | Root | Shoot |
| **Hydrotropism** | Water | Root | — |
| **Thigmotropism** | Touch / contact | Tendrils of pea, gourd, grapevine coil round a support | — |
| **Chemotropism** | Chemicals | Pollen tube grows towards the ovule | — |

The folding of *Mimosa* (touch-me-not) leaflets when touched is **not** a tropism: it is not a growth movement and does not depend on the direction of the touch.

**Experiments**
- **Geotropism:** a seedling laid flat curves its root down and its shoot up. On a slowly rotating **clinostat**, gravity acts on all sides in turn and the seedling grows straight.
- **Hydrotropism:** seeds in a tilted sieve of moist sawdust: roots grow down out of the holes, then curve back into the moist sawdust.`,
      [kt('Tropism', 'Growth movement of a plant part in response to a one-sided stimulus.'), kt('Positive tropism', 'Growth towards the stimulus.'), kt('Clinostat', 'An instrument that rotates a plant slowly so that gravity acts equally on all sides.')],
      V.geo,
      [2],
      [V.other],
    ),
    sec(
      '4. Phototropism and auxin',
      `**How a shoot bends towards light**
1. The **tip** of the shoot senses light coming from one side.
2. **Auxin** moves to the **shaded side** and travels down the stem.
3. Cells on the shaded side **elongate more** than those on the lit side.
4. The shaded side becomes longer, so the shoot **curves towards the light**. The bending happens a short distance **below the tip**, in the zone of elongation.

**Coleoptile experiments** (oat seedlings lit from one side): an intact coleoptile bends; one with its **tip cut off** does not; one with an **opaque cap** over the tip does not; one with an **opaque collar** below the tip still bends. So the **tip perceives light** and a chemical messenger (auxin) passes down to the region that bends.

**Phototropism experiment:** grow a potted seedling in a box with an opening on one side. After a few days the shoot curves towards the opening. A control seedling lit from above grows straight.

In **roots**, auxin collecting on the lower side **slows** elongation, so the upper side grows more and the root curves downwards.`,
      [kt('Phototropism', 'Growth movement in response to one-sided light.'), kt('Coleoptile', 'The sheath covering the young shoot of a grass seedling such as oat.'), kt('Auxin', 'Growth promoter made at the shoot tip; causes cell elongation.')],
      V.photo,
      [2],
      [V.coleoptile],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that auxin collects on the **lit** side: it collects on the **shaded** side.
- Calling ethylene a growth promoter: it is an **inhibitor** (and a gas).
- Saying abscisic acid **opens** stomata: it **closes** them.
- Naming a tropism without **positive** or **negative**.
- Saying the tip bends: the tip **senses**; the region **below** it bends.

**How marks are usually awarded**
- 1 mark: a hormone or tropism named, a biological term, an odd one out **with its category**.
- 2 marks: an effect with its explanation, or two uses.
- 3 marks: an experiment (set-up, observation, conclusion) or a labelled diagram of phototropism.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Plant growth regulators?', 'Chemicals made in small amounts that control growth elsewhere in the plant.', 'definition', 1),
    fc(2, 'Three growth promoters?', 'Auxin, gibberellin, cytokinin.', 'fact', 1),
    fc(3, 'Two growth inhibitors?', 'Abscisic acid, ethylene.', 'fact', 1),
    fc(4, 'Where is auxin made?', 'At the shoot tip.', 'fact', 1),
    fc(5, 'Apical dominance?', 'Lateral buds kept dormant by auxin from the shoot tip.', 'definition', 1),
    fc(6, 'Why does pinching the tip make a plant bushy?', 'Auxin source removed; lateral buds grow.', 'concept', 1),
    fc(7, 'Auxin in rooting powder?', 'Makes stem cuttings form roots.', 'fact', 1),
    fc(8, '2,4-D?', 'A synthetic auxin used as a weedicide against broad-leaved weeds.', 'fact', 1),
    fc(9, 'Hormone that makes dwarf peas tall?', 'Gibberellin (lengthens internodes).', 'fact', 1),
    fc(10, 'Bolting?', 'Sudden stem lengthening in rosette plants, caused by gibberellin.', 'definition', 1),
    fc(11, 'Hormone that breaks seed dormancy?', 'Gibberellin.', 'fact', 1),
    fc(12, 'Main effect of cytokinin?', 'Promotes cell division; delays leaf ageing.', 'fact', 1),
    fc(13, 'Natural source of cytokinin?', 'Coconut water.', 'fact', 1),
    fc(14, 'Stress hormone?', 'Abscisic acid: closes stomata in drought.', 'exam-tip', 1),
    fc(15, 'Gaseous hormone?', 'Ethylene.', 'fact', 1),
    fc(16, 'Why does one ripe fruit ripen others?', 'It gives off ethylene.', 'concept', 1),
    fc(17, 'Gibberellin vs abscisic acid?', 'Gibberellin breaks dormancy; abscisic acid maintains it.', 'concept', 1),
    fc(18, 'Tropism?', 'Growth of a plant part towards or away from a one-sided stimulus.', 'definition', 2),
    fc(19, 'Shoot response to light?', 'Positive phototropism.', 'fact', 2),
    fc(20, 'Root response to gravity?', 'Positive geotropism.', 'fact', 2),
    fc(21, 'Shoot response to gravity?', 'Negative geotropism.', 'fact', 2),
    fc(22, 'Root response to light?', 'Negative phototropism.', 'fact', 2),
    fc(23, 'Roots growing towards water?', 'Positive hydrotropism.', 'fact', 2),
    fc(24, 'Tendril coiling round a stick?', 'Thigmotropism.', 'fact', 2),
    fc(25, 'Pollen tube growing to the ovule?', 'Chemotropism.', 'fact', 2),
    fc(26, 'Where does auxin collect in a shoot lit from one side?', 'On the shaded side.', 'exam-tip', 2),
    fc(27, 'Which part senses light?', 'The shoot tip.', 'concept', 2),
    fc(28, 'Where does the shoot bend?', 'Just below the tip, in the zone of elongation.', 'concept', 2),
    fc(29, 'Clinostat?', 'Rotates a plant slowly so gravity acts equally on all sides.', 'definition', 2),
    fc(30, 'Is Mimosa leaf folding a tropism?', 'No: not a growth movement, not direction-dependent.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
