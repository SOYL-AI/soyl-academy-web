// ICSE 10 Biology ch03 notes and flashcards.
import { T, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Absorption by Roots and the Ascent of Sap — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Imbibition, diffusion and osmosis',
      `- **Imbibition:** absorption of water by **dry solid materials** (seeds, raisins, wood), which swell. No membrane, no energy.
- **Diffusion:** movement of molecules from a region of **higher** to **lower** concentration until evenly spread (scent in a room; a **potassium permanganate** crystal colouring still water).
- **Osmosis:** movement of **water** molecules through a **selectively permeable membrane** from a **dilute** (hypotonic) solution to a **concentrated** (hypertonic) one. **Endosmosis** = water entering a cell; **exosmosis** = water leaving.
- **Osmotic pressure:** the pressure needed to prevent water entering a solution by osmosis; greater for **stronger** solutions.

**Experiments**
- **Thistle funnel:** sugar solution in a funnel closed with **parchment**, dipped in water → level in the stem **rises** (endosmosis). Control: funnel with water — no rise.
- **Potato osmoscope:** hollowed potato with strong sugar solution stood in water → level inside **rises**; potato cells act as the membrane. Control: empty cup (or boiled potato — cells dead, no osmosis).`,
      [kt('Imbibition', 'Absorption of water by dry solids, which swell.'), kt('Diffusion', 'Movement of molecules from higher to lower concentration.'), kt('Osmosis', 'Movement of water through a selectively permeable membrane from a dilute to a concentrated solution.'), kt('Osmotic pressure', 'Pressure needed to prevent osmotic entry of water into a solution.')],
      V.thistle,
      [1],
      [V.kmno4, V.osmoscope],
    ),
    sec(
      '2. Turgidity, flaccidity and plasmolysis',
      `| Outside solution | Water movement | State of cell |
|---|---|---|
| **Hypotonic** (weaker than cell sap) | Enters (endosmosis) | **Turgid** — cytoplasm pressed against the wall |
| **Isotonic** (equal) | No net movement | No change; a cell that has lost some water stays **flaccid** (limp) |
| **Hypertonic** (stronger) | Leaves (exosmosis) | **Plasmolysed** — cytoplasm shrinks away from the wall |

**Deplasmolysis:** a plasmolysed cell placed in water soon enough regains water and becomes turgid.

**Importance of turgidity:** keeps soft stems and leaves **firm**; opens **stomata**; helps **growth**. Loss of turgor → **wilting**.

**Everyday examples:** salt or sugar preserves pickles and jams (microbes are plasmolysed); excess fertiliser or salt makes plants wilt; sprinkling water keeps vegetables crisp.`,
      [kt('Turgid', 'Swollen with water; cytoplasm pressed against the wall.'), kt('Flaccid', 'Limp; no pressure on the wall.'), kt('Plasmolysis', 'Shrinking of the cytoplasm away from the cell wall due to exosmosis.'), kt('Deplasmolysis', 'Recovery of a plasmolysed cell in water.')],
      V.plasmo,
      [2],
    ),
    sec(
      '3. The root hair',
      `A **root hair** is a long, thin tubular outgrowth of a **single epidermal cell** in the root hair zone.

**Structure:** thin **cell wall** (freely permeable), **cell membrane** (selectively permeable), **cytoplasm** lining the cell, **nucleus**, and a large **vacuole** of cell sap that extends into the hair.

**Adaptations of roots for absorbing water**
- Thousands of root hairs give an **enormous surface area**.
- Root hairs have **thin walls** and **no cuticle**.
- Cell sap is **more concentrated** than soil water, so water enters by **osmosis**.
- Hairs grow **between soil particles**, in contact with the water film.`,
      [kt('Root hair', 'A tubular outgrowth of one epidermal cell of the root.')],
      V.roothair,
      [3],
    ),
    sec(
      '4. Absorption of water and minerals',
      `**Path of water:** soil water → **root hair** → **cortex** → **endodermis** → **pericycle** → **xylem**. Water moves cell to cell by **osmosis**, because each inner cell has slightly more concentrated sap.

**Minerals** are absorbed as **ions**:
- **Passive absorption:** by **diffusion**, down the concentration gradient; no energy.
- **Active absorption:** **against** the concentration gradient, using **energy (ATP)** from respiration. It needs **oxygen** in the soil, so waterlogged soil reduces mineral uptake.`,
      [kt('Active transport', 'Movement of substances against a concentration gradient using energy.'), kt('Passive transport', 'Movement down a concentration gradient without energy.')],
      V.path,
      [4],
    ),
    sec(
      '5. Ascent of sap',
      `**Ascent of sap** is the upward movement of water and dissolved minerals from roots to leaves through the **xylem**.
- **Root pressure:** pressure in the roots that pushes water up a short distance; seen as **sap oozing** from a freshly cut stump.
- **Transpiration pull:** evaporation of water from leaves creates a **suction** that pulls the water column up — the **main force** in tall trees.
- **Cohesion:** attraction between **water molecules**, which keeps the column **continuous**.
- **Adhesion:** attraction between water and the **walls of xylem vessels**.

**Experiment:** a balsam shoot in water coloured with **red ink or eosin** shows red streaks in the stem; a cross-section shows only the **xylem** stained.`,
      [kt('Ascent of sap', 'Upward movement of water and minerals in the xylem.'), kt('Root pressure', 'Pressure developed in roots that pushes water up.'), kt('Transpiration pull', 'Suction created by transpiration that draws water up.'), kt('Cohesion', 'Attraction between water molecules.'), kt('Adhesion', 'Attraction between water and the xylem walls.')],
      V.xylem,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying salt or sugar moves in osmosis (only **water** does).
- Calling imbibition "osmosis".
- Drawing a root hair as many cells or with a cuticle.
- Saying root pressure lifts water to the top of tall trees.
- Mixing up plasmolysis (state) and exosmosis (process).

**How marks are usually awarded**
- 1 mark: a term, a process, or an odd one out with its category.
- 2 marks: two differences or reasons, each matched point for point.
- 3 marks: an experiment (set-up, observation, conclusion) or a labelled diagram (outline, key parts, labels).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Imbibition?', 'Absorption of water by dry solids, which swell.', 'definition', 1),
    fc(2, 'Diffusion?', 'Movement of molecules from higher to lower concentration.', 'definition', 1),
    fc(3, 'Osmosis?', 'Water moving through a selectively permeable membrane to the stronger solution.', 'definition', 1),
    fc(4, 'Endosmosis vs exosmosis?', 'Water entering vs leaving a cell.', 'concept', 1),
    fc(5, 'Membrane in the thistle funnel experiment?', 'Parchment paper.', 'fact', 1),
    fc(6, 'Control for the potato osmoscope?', 'An empty cup (or a boiled potato).', 'exam-tip', 1),
    fc(7, 'Osmotic pressure is higher in…', 'More concentrated solutions.', 'concept', 1),
    fc(8, 'Diffusion demonstration?', 'Potassium permanganate crystal in still water.', 'fact', 1),
    fc(9, 'Hypotonic solution?', 'Weaker than cell sap; cell gains water.', 'definition', 2),
    fc(10, 'Hypertonic solution?', 'Stronger than cell sap; cell loses water.', 'definition', 2),
    fc(11, 'Isotonic solution?', 'Equal to cell sap; no net movement.', 'definition', 2),
    fc(12, 'Turgid cell?', 'Cytoplasm pressed against the wall.', 'definition', 2),
    fc(13, 'Plasmolysis?', 'Cytoplasm shrinks away from the wall by exosmosis.', 'definition', 2),
    fc(14, 'Deplasmolysis?', 'Recovery of a plasmolysed cell in water.', 'definition', 2),
    fc(15, 'Why do pickles keep?', 'Salt plasmolyses microbes.', 'exam-tip', 2),
    fc(16, 'Why does excess fertiliser wilt plants?', 'Soil water becomes hypertonic; exosmosis.', 'exam-tip', 2),
    fc(17, 'Root hair is…', 'An outgrowth of one epidermal cell.', 'fact', 3),
    fc(18, 'Why do root hairs absorb well?', 'Large surface, thin wall, no cuticle, concentrated sap.', 'concept', 3),
    fc(19, 'Selectively permeable part of a root hair?', 'The cell membrane.', 'fact', 3),
    fc(20, 'Path of water in the root?', 'Root hair, cortex, endodermis, pericycle, xylem.', 'exam-tip', 4),
    fc(21, 'Active uptake of minerals needs…', 'Energy from respiration (oxygen).', 'concept', 4),
    fc(22, 'Passive uptake?', 'Diffusion down the gradient, no energy.', 'definition', 4),
    fc(23, 'Why do flooded crops absorb fewer minerals?', 'Little oxygen; less respiration and active uptake.', 'exam-tip', 4),
    fc(24, 'Ascent of sap?', 'Upward movement of water in the xylem.', 'definition', 5),
    fc(25, 'Main force in tall trees?', 'Transpiration pull.', 'fact', 5),
    fc(26, 'Cohesion?', 'Water molecules attract each other.', 'definition', 5),
    fc(27, 'Adhesion?', 'Water clings to the xylem walls.', 'definition', 5),
    fc(28, 'Evidence of root pressure?', 'Sap oozing from a cut stump.', 'fact', 5),
    fc(29, 'Tissue stained in the red-ink experiment?', 'Xylem.', 'fact', 5),
    fc(30, 'Why does colour rise faster when hot and windy?', 'More transpiration, stronger pull.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
