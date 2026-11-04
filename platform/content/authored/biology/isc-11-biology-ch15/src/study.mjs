// ISC 11 Biology ch15 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { ROOT as RT, CELLS, arith, doubling, LOG, LAG_END, LOG_END, MAXRATE, AGR, RGR_PCT, AUX, magnification, WENT as WN, MEDIA, ratio, outcome, D1, stockVolume } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Plant Growth and Development — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Seed germination: hypogeal, epigeal and viviparous',
      `**Germination** is the growth of the embryo of a seed into a seedling when it gets water, oxygen and a suitable temperature. The radicle comes out first and forms the root system, and the plumule forms the shoot. The way the cotyledons behave gives three types.

- **Epigeal germination** — the **hypocotyl** elongates and pushes the **cotyledons above the soil**, where they may turn green and photosynthesise for a while. Examples: **castor, bean, cotton, sunflower, cucumber, tamarind**.
- **Hypogeal germination** — the **epicotyl** elongates, and the **cotyledons stay below the soil**, supplying food. Examples: **pea, gram, maize, mango** (and other cereal grains).
- **Viviparous germination** — the seed **germinates inside the fruit while it is still attached to the parent plant**. The radicle grows out of the fruit and the heavy seedling drops into the mud and takes root quickly. It is characteristic of **mangroves**, which grow in marshy, salty soil. Examples: **Rhizophora, Sonneratia** (also Heritiera in some books).

| Feature | Epigeal | Hypogeal | Viviparous |
|---|---|---|---|
| Part that elongates | hypocotyl | epicotyl | radicle, inside the fruit |
| Cotyledons | above soil | in soil | inside fruit on the plant |
| Examples | castor, bean | pea, maize | Rhizophora, Sonneratia |`,
      [kt('Epigeal', 'Cotyledons raised above the soil by an elongating hypocotyl.'), kt('Hypogeal', 'Cotyledons stay in the soil; the epicotyl elongates.'), kt('Viviparous', 'Seed germinates within the fruit on the parent plant, as in mangroves.')],
      V.germ,
      [1],
    ),
    sec(
      '2. Phases of growth, growth rate, measurement and factors',
      `**Growth** is a permanent, irreversible increase in size, usually with an increase in dry weight. Plant growth is **open**: meristems keep dividing throughout life, at root tips, shoot tips (**primary growth**) and cambia (**secondary growth**).

**Phases of growth in a meristem** (seen in order up a root tip): **meristematic phase** (cells divide, small, dense cytoplasm, thin walls); **elongation phase** (cells take in water, form a large vacuole and enlarge, and walls are laid down); **maturation phase** (cells reach final size and differentiate).

**Growth rate:** the increase in growth per unit time. In **arithmetic growth**, only one daughter cell keeps dividing: L(t) = L₀ + rt, a straight line (for example a root with L₀ = ${RT.l0} cm and r = ${RT.r} cm a day is ${arith(RT.l0, RT.r, 10)} cm after 10 days). In **geometric growth**, both daughters divide: W(t) = W₀e^(rt); in cells that double every ${CELLS.T} hours one cell gives ${doubling(CELLS.n0, 72, CELLS.T)} cells in 72 hours. **Absolute growth rate** is the total growth per unit time; **relative growth rate** is the growth per unit time **as a proportion of the initial size** (two seedlings both growing 2 cm a day, one from 10 cm and one from 30 cm, have relative rates ${RGR_PCT.A} and ${RGR_PCT.B} percent a day).

**Sigmoid curve:** in a model shoot growing to ${LOG.K} cm, there is a **lag phase** (slow, to about day ${LAG_END}), a **log or exponential phase** (fastest; about ${MAXRATE} cm a day at day ${LOG.t0}; to about day ${LOG_END}) and a **stationary phase** when growth slows as nutrients, water and space become limiting.

**Measuring growth:** directly, by length with a scale or thread, number of leaves, leaf area, volume, fresh weight, dry weight and cell number. The **auxanometer** is an indirect method for the growth of a shoot: in the **arc auxanometer** a thread from the shoot tip passes over a pulley of radius r carrying a pointer of length R over an arc scale, so the pointer exaggerates the growth by R ÷ r (here ${AUX.R} ÷ ${AUX.r} = ${magnification} times); actual growth = pointer movement ÷ ${magnification}.

**Factors affecting growth:** water (cell enlargement), oxygen (respiration), nutrients (building materials), temperature and light.`,
      [kt('Meristem', 'Tissue of actively dividing cells.'), kt('Arithmetic growth', 'Constant increase per unit time; one daughter cell divides.'), kt('Geometric growth', 'Exponential increase; both daughter cells divide.'), kt('Relative growth rate', 'Growth per unit time divided by the initial size.'), kt('Auxanometer', 'Instrument that measures growth by magnifying it with a pointer.')],
      V.sigmoid,
      [2],
      [V.root, V.auxano],
    ),
    sec(
      '3. Differentiation, dedifferentiation and redifferentiation',
      `**Differentiation:** cells derived from meristems mature to perform specific functions, with changes in structure. Example: a cell becomes a **xylem vessel**, losing its protoplasm and depositing **lignin** in its walls. **Dedifferentiation:** differentiated, mature cells **regain the capacity to divide**. Examples: the **interfascicular cambium** forms from parenchyma between vascular bundles; the **cork cambium** forms from cortical cells; **callus** forms from tissue in culture. **Redifferentiation:** the cells produced by a dedifferentiated tissue **lose the capacity to divide again and mature** to perform specific functions. Examples: **secondary xylem and phloem** formed from the vascular cambium; **cork** formed from the cork cambium.

**Sequence of developmental processes:** a seed germinates and grows by **cell division → cell enlargement → differentiation → maturation** of tissues and organs, then flowering, fruiting and **senescence**. Development is the sum of growth and differentiation. Plants show **plasticity**: the form depends on the environment or the stage of life, as in **heterophylly** (different leaf shapes on one plant, for example cotton, coriander and larkspur, or different shapes in air and water in buttercup).`,
      [kt('Differentiation', 'Maturing of cells into specialised structure and function.'), kt('Dedifferentiation', 'Mature cells regain the power to divide.'), kt('Redifferentiation', 'Dedifferentiated cells mature again and lose the power to divide.'), kt('Heterophylly', 'Different leaf forms on the same plant.')],
      table(['Process', 'Example'], [['Differentiation', 'Cell to xylem vessel'], ['Dedifferentiation', 'Cork cambium forms from cortex cells'], ['Redifferentiation', 'Cork formed by cork cambium']], 'Table of examples of differentiation, dedifferentiation and redifferentiation'),
      [3],
    ),
    sec(
      '4. Plant growth regulators',
      `**Plant growth regulators (PGRs)** are small, simple chemicals, made in tiny amounts, that control growth and development. **Promoters:** auxins, gibberellins, cytokinins. **Inhibitor:** abscisic acid. **Ethylene** is a gas with promoting and inhibiting roles.

**Discovery of auxin:** **Charles and Francis Darwin (1880)** found that the tip of a canary-grass coleoptile detects light and that an influence passes down to the bending region. **Boysen-Jensen** showed that the influence passes through a block of gelatin but not through mica. **F. W. Went (1928)** cut off the tips of oat (*Avena*) coleoptiles, placed them on **agar blocks** and placed the blocks **off-centre** on decapitated coleoptiles; the coleoptiles **curved away from the block** because the cells on the block side elongated more. The chemical was named **auxin**. In the **Avena curvature test**, the angle of curvature is proportional to the auxin concentration in the block (illustrative: ${WN.degPerUnit} degrees for each mg per litre).

**Gibberellins:** found from the rice *bakanae* ("foolish seedling") disease caused by the fungus *Gibberella fujikuroi* (Kurosawa). **Cytokinins:** kinetin was found by **Skoog and Miller (1955)** in old or autoclaved DNA; zeatin from maize. **Ethylene:** ripening of fruit near ripe oranges (Cousins). **ABA:** isolated as a growth inhibitor.

| Regulator | Four effects |
|---|---|
| **Auxins** (IAA, IBA, NAA, 2,4-D) | **apical dominance**; **rooting** of cuttings; **parthenocarpy**; prevent **abscission** of young leaves and fruits (also cell elongation; 2,4-D kills broadleaf weeds) |
| **Gibberellins** (GA₃) | **elongation** of stems (bolting; sugarcane); **break dormancy** of seeds and buds (barley malting); increase **fruit size** (grapes) and parthenocarpy; promote **bolting and flowering** |
| **Cytokinins** (kinetin, zeatin) | promote **cell division**; promote **lateral bud growth**; **delay senescence** of leaves; **shoot formation** in tissue culture |
| **Ethylene** | **ripening** of fruits; promotes **abscission** and senescence; promotes **flowering** in pineapple and mango and **female flowers** in cucumber; breaks dormancy and promotes root hairs |
| **Abscisic acid** | **closes stomata** under water stress; maintains **seed dormancy**; **inhibits growth**; promotes leaf **senescence** and abscission |

**Interaction:** the auxin to cytokinin ratio controls organ formation in culture: ${MEDIA.map((m) => `${m.id} (${m.auxin} : ${m.cytokinin}, ratio ${ratio(m)}) gives ${outcome(m)}`).join('; ')}.`,
      [kt('Auxin', 'Growth regulator made at shoot tips; discovered by Went (1928).'), kt('Gibberellin', 'Promotes stem elongation and breaks dormancy.'), kt('Cytokinin', 'Promotes cell division and delays senescence.'), kt('Ethylene', 'Gaseous regulator that ripens fruit.'), kt('Abscisic acid', 'Stress hormone; inhibits growth and closes stomata.')],
      V.went,
      [4],
    ),
    sec(
      '5. Agricultural and horticultural applications',
      `- **Rooting of cuttings:** auxins such as **IBA and NAA**.
- **Ripening of fruits and synchronised flowering:** **ethylene**, supplied as **ethephon**, which releases ethylene; ethylene or NAA brings pineapple to flower together.
- **Weed control:** **2,4-D**, a synthetic auxin, kills broadleaf (dicot) weeds in cereal fields without harming the narrow-leaved crop.
- **Preventing premature fruit and leaf drop:** auxins (NAA) in orchards.
- **Seedless fruits and larger fruits:** **gibberellins** on grapes; auxins for seedless tomato.
- **Increasing sugar yield:** gibberellins lengthen sugarcane stems, so more sugar is made. **Malting:** gibberellins make barley seeds form amylase.
- **Keeping cut flowers and vegetables fresh, delaying senescence:** **cytokinins**.
- **Tissue culture:** auxin and cytokinin in the right ratio; **cucumber:** ethylene for more female flowers.
- **Spray preparation:** a spray is made by diluting a stock using C₁V₁ = C₂V₂; for example ${D1.ml} mL of ${D1.want} ppm from a ${D1.stock} ppm stock needs ${stockVolume(D1.stock, D1.want, D1.ml)} mL of stock.`,
      [kt('Ethephon', 'Chemical that releases ethylene in plant tissues.'), kt('2,4-D', 'Synthetic auxin used as a broadleaf weedicide.'), kt('Parthenocarpy', 'Fruit formation without fertilisation, giving seedless fruit.')],
      table(['Use', 'Regulator'], [['Rooting cuttings', 'Auxin (IBA, NAA)'], ['Ripening fruit', 'Ethylene (ethephon)'], ['Weed control', '2,4-D'], ['Seedless grapes', 'Gibberellin'], ['Freshness of cut flowers', 'Cytokinin']], 'Table of agricultural and horticultural uses of growth regulators'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Mixing up hypocotyl and epicotyl: the hypocotyl lifts the cotyledons in epigeal germination; the epicotyl grows in hypogeal germination.
- Calling viviparous germination a type that happens in soil (it happens on the parent plant, in mangroves).
- Giving absolute growth rate when relative growth rate is asked (divide by the initial size as well).
- Dividing by the pointer length instead of multiplying by pulley radius over pointer length (growth = pointer movement ÷ magnification).
- Saying the coleoptile bends towards the agar block (it bends away from the block side in Went's experiment).
- Calling gibberellins or ethylene inhibitors; the inhibitor of the five is abscisic acid.
- Confusing dedifferentiation with redifferentiation.

**How marks are usually awarded**
- 1-mark subparts: the part that elongates, an example of a type of germination, a regulator for a use, an assertion-reason on apical dominance or stomata.
- 2–3-mark questions: types of germination compared; phases of growth; sigmoid curve; differentiation terms; Went's experiment; four effects of a regulator.
- 5-mark questions in parts: sigmoid curve with phases and rate; auxanometer diagram and calculation; Went's experiment with effects of auxin; uses of regulators.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Which part elongates in epigeal germination?', 'The hypocotyl.', 'fact', 1),
    fc(2, 'Which part elongates in hypogeal germination?', 'The epicotyl.', 'fact', 1),
    fc(3, 'Two examples of epigeal germination?', 'Castor and bean (also cotton, sunflower).', 'fact', 1),
    fc(4, 'Two examples of hypogeal germination?', 'Pea and maize (also gram, mango).', 'fact', 1),
    fc(5, 'What is viviparous germination?', 'Seed germinates inside the fruit while on the parent plant.', 'definition', 1),
    fc(6, 'Two viviparous examples?', 'Rhizophora and Sonneratia (mangroves).', 'fact', 1),
    fc(7, 'Three phases of growth in a meristem?', 'Division, elongation, maturation.', 'exam-tip', 2),
    fc(8, 'Arithmetic growth equation?', 'L(t) = L0 + rt.', 'definition', 2),
    fc(9, 'Geometric growth equation?', 'W(t) = W0 e^(rt).', 'definition', 2),
    fc(10, 'What is relative growth rate?', 'Growth per unit time divided by the initial size.', 'definition', 2),
    fc(11, 'Three phases of the sigmoid curve?', 'Lag, log (exponential), stationary.', 'exam-tip', 2),
    fc(12, 'Why does growth reach a stationary phase?', 'Limiting nutrients, water and space.', 'concept', 2),
    fc(13, 'What does an auxanometer do?', 'Measures growth of a shoot by magnifying it with a pointer.', 'definition', 2),
    fc(14, 'Actual growth from an arc auxanometer?', 'Pointer movement divided by R/r (pointer length over pulley radius).', 'exam-tip', 2),
    fc(15, 'Factors affecting growth?', 'Water, oxygen, nutrients, temperature, light.', 'fact', 2),
    fc(16, 'Define differentiation.', 'Maturing of cells into specialised structure and function.', 'definition', 3),
    fc(17, 'Define dedifferentiation, with an example.', 'Mature cells regain the power to divide; cork cambium.', 'definition', 3),
    fc(18, 'Define redifferentiation, with an example.', 'Dedifferentiated cells mature again; cork or secondary xylem.', 'definition', 3),
    fc(19, 'What is heterophylly?', 'Different leaf forms on one plant, such as cotton and coriander.', 'definition', 3),
    fc(20, 'Who discovered auxin in agar blocks?', 'F. W. Went (1928) on oat coleoptiles.', 'fact', 4),
    fc(21, 'In Went’s experiment, which way does the coleoptile bend?', 'Away from the side with the agar block.', 'concept', 4),
    fc(22, 'Four effects of auxin?', 'Apical dominance, rooting, parthenocarpy, prevent abscission.', 'exam-tip', 4),
    fc(23, 'Four effects of gibberellin?', 'Stem elongation, dormancy breaking, larger fruit, bolting and flowering.', 'exam-tip', 4),
    fc(24, 'Four effects of cytokinin?', 'Cell division, lateral buds, delays senescence, shoot formation.', 'exam-tip', 4),
    fc(25, 'Four effects of ethylene?', 'Fruit ripening, abscission, flowering of pineapple, female flowers in cucumber.', 'exam-tip', 4),
    fc(26, 'Four effects of ABA?', 'Stomatal closure, seed dormancy, growth inhibition, leaf senescence.', 'exam-tip', 4),
    fc(27, 'Which regulator roots cuttings?', 'Auxin (IBA, NAA).', 'fact', 5),
    fc(28, 'Which regulator ripens fruit?', 'Ethylene, from ethephon.', 'fact', 5),
    fc(29, 'Which regulator is used as a weedicide?', '2,4-D, a synthetic auxin.', 'fact', 5),
    fc(30, 'Which regulator makes seedless, larger grapes?', 'Gibberellin.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
