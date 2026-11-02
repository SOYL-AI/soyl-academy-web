// ch13 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Plant Growth and Development — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Growth, differentiation and development',
      `**Growth** is a **permanent, irreversible increase in size** of an organ, or even of a cell, accompanied by metabolic processes that use energy. Plants show **indeterminate (open) growth**: **meristems** at the root and shoot tips divide throughout life (**primary growth**), so new organs are formed continually. The meristematic cells of a growing region pass through three phases: the **meristematic phase** (cells divide), the **elongation phase** (cells enlarge, taking in water) and the **maturation phase** (cells differentiate into permanent cells).

Growth may be measured by an increase in **cell number**, **length**, **area**, **volume**, **fresh weight** or **dry weight**.

**Growth rate.** The increase in growth per unit time is the growth rate. In **arithmetic growth**, only one daughter cell of each division keeps dividing while the other differentiates and matures; the length increases linearly, $L_t = L_0 + rt$, where $L_t$ is the length at time $t$, $L_0$ at the start and $r$ the growth rate. In **geometric growth** both daughter cells keep dividing, so the growth is slow at first (lag phase) and then very fast (log or exponential phase), $W_1 = W_0 e^{rt}$, where $r$ is the **relative growth rate** and $e$ the base of natural logarithms. A plot of growth against time in a limited environment is a **sigmoid (S-shaped) curve**: a **lag phase**, a **log (exponential) phase** and a **stationary phase**, when growth slows as nutrients or space become limiting or as cells age. The **relative growth rate** compares growth with the initial size.

**Conditions for growth:** **water** (turgidity for enlargement; medium for enzymes), **oxygen** (energy from respiration), **nutrients** (macro- and micro-elements), a suitable **temperature**, and **light and gravity**.

**Differentiation, dedifferentiation, redifferentiation.** Cells derived from root and shoot apical meristems and from cambium differentiate and mature to perform specific functions; a vessel element, for example, develops a lignified secondary wall and loses its protoplasm. Living differentiated cells that have lost the capacity to divide can regain it under certain conditions: this is **dedifferentiation**, as in the formation of a **callus** or the interfascicular cambium. The cells produced may again lose the capacity to divide and mature: **redifferentiation**.

**Plasticity** is the ability of plants to follow different pathways in response to the environment or the phase of life, to form different kinds of structures. **Heterophylly** is an example: the leaves of the juvenile plant differ in shape from those of the mature plant in **cotton, coriander and larkspur**, and the leaves of **buttercup** produced in air and in water differ.

**Development** is the sum of all the changes that an organism goes through during its life, from germination to senescence, and includes growth and differentiation. It is under the control of intrinsic factors (genetic and chemical, including plant growth regulators) and extrinsic factors (light, temperature, water, oxygen, nutrition).`,
      [kt('Indeterminate growth', 'Open growth: meristems keep adding new cells throughout the life of the plant.'), kt('Arithmetic growth', 'Only one daughter cell keeps dividing; length increases linearly with time.'), kt('Geometric growth', 'Both daughter cells keep dividing; size increases exponentially.'), kt('Dedifferentiation', 'Regaining of the capacity to divide by living differentiated cells, as in callus formation.'), kt('Plasticity', 'Ability of a plant to form different structures in response to environment or phase of life, as in heterophylly.')],
      V.sigmoid,
      [1],
      [V.types, V.phases, V.measure, V.conds, V.diff],
      [{ label: 'Arithmetic growth', latex: r`L_t = L_0 + rt` }, { label: 'Geometric growth', latex: r`W_1 = W_0 e^{rt}` }],
    ),
    sec(
      '2. Plant growth regulators',
      `**Plant growth regulators (PGRs)** are small, simple molecules of diverse chemical composition that control growth and development. They may be **promoters** (auxins, gibberellins, cytokinins) or **inhibitors** (abscisic acid); ethylene can act as either.

**Auxins** (Greek *auxein*, to grow) include indole-3-acetic acid (**IAA**), indole butyric acid (**IBA**), naphthalene acetic acid (**NAA**) and the synthetic **2,4-D**. They are made at the tips of roots and shoots. The discovery began with the **Darwins**, who observed that the **tip of the coleoptile** perceives light and a signal moves down to make it bend towards the light; **Went** collected a substance from coleoptile tips in **agar blocks** and showed that a block placed on one side of a decapitated coleoptile made it bend. Auxins help to **initiate rooting in stem cuttings**, promote **flowering** in pineapple, **prevent fruit and leaf drop** at early stages (and promote abscission of older leaves and fruits), maintain **apical dominance** (the growing apical bud inhibits the growth of lateral buds, so removing it, as in tea plantations and hedge-making, makes the plant bushy), induce **parthenocarpy** in tomato, control **xylem differentiation** and help in cell division. **2,4-D** is used to kill **dicotyledonous weeds**.

**Gibberellins** (GA3 is the best known) were discovered from the fungus *Gibberella fujikuroi*, which causes the **foolish seedling** disease of rice. They promote **elongation of stems** (increasing the length of grape stalks and of sugarcane stems, with higher sugar yield), improve the **shape and size of fruits** such as apple, **delay senescence** so that fruits stay on the tree longer, **speed up malting** in the brewing industry, and cause **bolting** (internode elongation before flowering) in beet, cabbage and other rosette plants.

**Cytokinins** promote **cell division** (cytokinesis). **Kinetin** was found in autoclaved herring sperm DNA; **zeatin** was isolated from maize kernels and coconut milk. They help to produce **new leaves, lateral shoots and adventitious shoots**, overcome **apical dominance**, and **delay senescence** of leaves by promoting the mobilisation of nutrients to them. They are made where rapid cell division occurs, such as root apices, shoot buds and young fruits.

**Ethylene** is a **gaseous** regulator formed in large amounts in ripening fruits and in tissues undergoing senescence. It **hastens ripening** of fruits such as tomato and apple, **senescence and abscission** of leaves and flowers, promotes **female flowers** in cucumber, breaks **dormancy** of seeds and buds (potato tubers), initiates **rooting**, promotes **flowering** in pineapple and mango and causes **rapid internode and petiole elongation** in deepwater rice. **Ethephon** is the commonest source in agriculture.

**Abscisic acid (ABA)** is a **growth inhibitor**, called the **stress hormone**. It **inhibits seed germination**, induces **seed dormancy**, stimulates the **closure of stomata** and increases tolerance to stress, promotes abscission and senescence, and acts as an **antagonist** to gibberellic acid. Regulators work together or against each other, and the balance (not one alone) controls dormancy, flowering and ageing. (Photoperiodism and vernalisation are not part of this syllabus.)`,
      [kt('Apical dominance', 'Suppression of lateral buds by the growing apical bud, through auxin.'), kt('Bolting', 'Rapid elongation of internodes before flowering in rosette plants, caused by gibberellins.'), kt('Kinetin', 'A cytokinin first isolated from autoclaved herring sperm DNA.'), kt('Ethephon', 'A compound that releases ethylene; used to ripen fruit and hasten flowering.'), kt('Abscisic acid', 'The stress hormone: closes stomata, induces dormancy; antagonist of gibberellins.')],
      V.expt,
      [2],
      [V.pgrs, V.auxin, V.gibb, V.cyto, V.ethylene, V.aba, V.pair],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Defining growth as any change in size (it must be permanent and irreversible: a cell swelling with water and shrinking again has not grown).
- Placing the fastest growth in the lag or stationary phase (it is the log phase).
- Writing that cytokinins close stomata or that ABA promotes cell division (ABA is the stress hormone; cytokinins promote division).
- Saying ethylene is a liquid or a solid (it is a gas; ethephon is the liquid source).
- Mixing up dedifferentiation (regaining division, as in callus) with differentiation (specialisation).
- Using 2,4-D to kill monocot weeds (it kills dicot weeds).

**How marks are usually awarded**
- 1-mark items: a regulator and one effect; a growth phase; a definition term.
- 2–3-mark answers: arithmetic versus geometric growth; phases of the sigmoid curve; differentiation, dedifferentiation and redifferentiation; effects of one regulator.
- 5-mark answers: growth and its measurement with curve; plant growth regulators with discovery and uses.
- Numericals: growth rates, doubling, hormone solutions, germination percentages — write the equation first and show each step.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define growth.', 'A permanent, irreversible increase in size of an organ or cell, using energy.', 'definition', 1),
    fc(2, 'Why is plant growth indeterminate?', 'Meristems at root and shoot tips keep dividing throughout life.', 'concept', 1),
    fc(3, 'Three phases of growth in a region?', 'Meristematic, elongation, maturation.', 'fact', 1),
    fc(4, 'Parameters to measure growth?', 'Cell number, length, area, volume, fresh weight, dry weight.', 'fact', 1),
    fc(5, 'Arithmetic growth equation?', 'L(t) = L0 + rt; a straight line.', 'formula', 1),
    fc(6, 'Geometric growth equation?', 'W1 = W0 e^(rt); an exponential curve.', 'formula', 1),
    fc(7, 'What is arithmetic growth?', 'Only one daughter cell keeps dividing; the other differentiates.', 'concept', 1),
    fc(8, 'What is geometric growth?', 'Both daughter cells keep dividing.', 'concept', 1),
    fc(9, 'Phases of the sigmoid curve?', 'Lag, log (exponential), stationary.', 'fact', 1),
    fc(10, 'Where is growth fastest on the S-curve?', 'In the log (exponential) phase.', 'fact', 1),
    fc(11, 'Why does growth slow in the stationary phase?', 'Nutrients or space become limiting, or cells age.', 'concept', 1),
    fc(12, 'What is relative growth rate?', 'Growth per unit time compared with the initial size.', 'definition', 1),
    fc(13, 'Conditions for growth?', 'Water, oxygen, nutrients, temperature; also light and gravity.', 'fact', 1),
    fc(14, 'Differentiation?', 'Cells from meristems become specialised permanent cells.', 'definition', 1),
    fc(15, 'Dedifferentiation?', 'Living differentiated cells regain the capacity to divide, as in callus.', 'definition', 1),
    fc(16, 'Redifferentiation?', 'Cells formed by dedifferentiation lose division again and mature.', 'definition', 1),
    fc(17, 'What is plasticity?', 'Ability to form different structures in response to environment or life phase.', 'definition', 1),
    fc(18, 'Example of heterophylly?', 'Cotton, coriander, larkspur; buttercup leaves in air and water.', 'fact', 1),
    fc(19, 'What is development?', 'Sum of all changes in the life of the plant: growth and differentiation.', 'definition', 1),
    fc(20, 'Darwin’s coleoptile finding?', 'The tip perceives light and a signal passes down to cause bending.', 'fact', 2),
    fc(21, 'Went’s experiment?', 'Agar block from tips on one side of a decapitated coleoptile makes it bend.', 'fact', 2),
    fc(22, 'Uses of auxins?', 'Rooting of cuttings, apical dominance, preventing fruit drop, parthenocarpy, 2,4-D weed killer.', 'fact', 2),
    fc(23, 'What is apical dominance?', 'The apical bud suppresses lateral buds; removing it makes the plant bushy.', 'concept', 2),
    fc(24, 'Which weeds does 2,4-D kill?', 'Dicotyledonous (broad-leaved) weeds.', 'fact', 2),
    fc(25, 'How were gibberellins discovered?', 'From Gibberella fujikuroi, which causes the foolish seedling disease of rice.', 'fact', 2),
    fc(26, 'Effects of gibberellins?', 'Stem elongation, bolting, bigger fruits, delay senescence, faster malting.', 'fact', 2),
    fc(27, 'Main role of cytokinins?', 'Promote cell division; lateral shoots; delay leaf senescence.', 'fact', 2),
    fc(28, 'Sources of kinetin and zeatin?', 'Kinetin: autoclaved herring sperm DNA. Zeatin: maize kernels and coconut milk.', 'fact', 2),
    fc(29, 'Which regulator is a gas?', 'Ethylene.', 'fact', 2),
    fc(30, 'Effects of ethylene?', 'Ripening, senescence, abscission, female flowers in cucumber, breaks dormancy, flowering in pineapple.', 'fact', 2),
    fc(31, 'Why is ABA called the stress hormone?', 'It closes stomata and raises tolerance to stress such as drought.', 'concept', 2),
    fc(32, 'Gibberellin and ABA?', 'Antagonists: gibberellin breaks dormancy; ABA maintains it.', 'concept', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
