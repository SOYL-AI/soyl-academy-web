// ISC 11 Biology ch10 notes (one section per syllabus topic) and 30 flashcards.
import { T, table, unit, PROV, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { MEMBRANE_L, CHROMOSOMES_L } from './svgs.mjs';
import { CUBES, TR, CARRIER, axonemeMicrotubules, centrioleMicrotubules, YEARS, CHR, kind } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
void MEMBRANE_L;
void CHROMOSOMES_L;
void svgV;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cell: The Unit of Life — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Historical aspects, cell theory, size and shape; prokaryotic and eukaryotic, plant and animal cells',
      `**History.** **Robert Hooke** (${YEARS.hooke} saw box-like compartments in a thin slice of cork and called them **cells**; he saw only dead cell walls. **Anton van Leeuwenhoek** (${YEARS.leeuwenhoek}) was the first to see **living** cells. **Robert Brown** (${YEARS.brown}) discovered the **nucleus**. **Matthias Schleiden** (${YEARS.schleiden}, plants) and **Theodor Schwann** (${YEARS.schwann}, animals) proposed that the bodies of plants and animals are made of cells and their products. **Rudolf Virchow** (${YEARS.virchow}) stated ***omnis cellula-e cellula***: new cells arise only from **pre-existing cells**, which **modified** the cell theory.

**Cell theory (as modified by Virchow):** (i) all living organisms are composed of cells and their products; (ii) the cell is the basic structural and functional unit of life; (iii) all cells arise from pre-existing cells.

**Size and shape.** Cells range from about 0.3 µm (*Mycoplasma*, the smallest) through bacteria (a few µm) and the human red blood cell (about 7 µm) to the ostrich egg, the largest single cell; some nerve cells are over a metre long. Shapes include discs, spindles, columns, cubes and branched forms, and each suits a function. Size is limited by the **surface-to-volume ratio**: for cubes of side ${CUBES.map((c) => c.side).join(', ')} µm the ratio falls from ${CUBES.map((c) => c.ratio).join(' to ')}, so a large cell is poorly served by its surface.

**Prokaryotic and eukaryotic cells.** Prokaryotes (bacteria, cyanobacteria, *Mycoplasma*) have a **nucleoid** with circular naked DNA, **no membrane-bound organelles** and **70S ribosomes**; they divide by binary fission. Eukaryotes (protists, fungi, plants, animals) have a **true nucleus**, linear DNA with histones, membrane-bound organelles and **80S ribosomes** (70S in mitochondria and plastids).

**Plant and animal cells.** A plant cell has a **cellulose cell wall, plastids and a large central vacuole**, lacks centrioles (in higher plants) and stores **starch**, dividing by a **cell plate**. An animal cell has no wall or plastids, has **centrioles** and small vacuoles, stores **glycogen** and divides by a **furrow**.`,
      [kt('Cell theory', 'Organisms are made of cells; the cell is the unit of structure and function; cells arise from cells.'), kt('Omnis cellula-e cellula', 'Virchow’s statement that every cell comes from a pre-existing cell.'), kt('Prokaryote', 'Cell with no membrane-bound nucleus or organelles.'), kt('Eukaryote', 'Cell with a true nucleus and membrane-bound organelles.')],
      table(['Feature', 'Prokaryotic', 'Eukaryotic'], [['Nucleus', 'Nucleoid, no envelope', 'True nucleus'], ['Ribosomes', '70S', '80S'], ['Organelles', 'No membrane-bound ones', 'Present']], 'Table of prokaryotic and eukaryotic cells'),
      [1],
    ),
    sec(
      '2. Cell wall, plasmodesmata and the plasma membrane; transport',
      `**Cell wall.** A non-living, rigid layer outside the plasma membrane of plants, algae and fungi. In plants it is made of **cellulose, hemicellulose, pectin and proteins**, with a **primary wall** and sometimes a **secondary wall**; **calcium pectate** forms the **middle lamella** that holds neighbouring cells together. Algal walls contain cellulose, galactans, mannans and minerals; fungal walls contain **chitin**. The wall gives **shape and protection** and prevents bursting in hypotonic surroundings. **Plasmodesmata** are cytoplasmic channels through the wall, lined by the plasma membrane and often traversed by a strand of endoplasmic reticulum; they link the cytoplasm of neighbouring cells.

**Fluid mosaic model (Singer and Nicolson, ${YEARS.singer}).** The membrane is a **quasi-fluid bilayer of phospholipids** whose polar heads face the watery surroundings and whose non-polar tails face each other; **proteins** are embedded like a mosaic — **integral** proteins span or penetrate the bilayer and **peripheral** proteins lie on a surface. **Cholesterol** lies among the tails, and **carbohydrate chains** on proteins and lipids face outwards. The lateral movement of lipids and proteins (fluidity) permits **endocytosis, secretion, cell growth, division and formation of junctions**.

**Transport.** **Passive** movement needs no ATP: **simple diffusion** of small non-polar molecules, **facilitated diffusion** through specific **carrier or channel proteins** (rate rises and then **saturates**; example: glucose into a red blood cell) and **osmosis**. **Active transport** moves a substance **against its gradient** with a carrier and **ATP** (example: the **sodium–potassium pump**). Carriers are **uniport** (one substance, one way), **symport** (two substances, same way) or **antiport** (two substances, opposite ways). In the model transport graph the carrier gives ${TR[0].car} units at a concentration of ${TR[0].s} and levels off near its maximum of ${CARRIER.vmax}, while diffusion rises as a straight line.`,
      [kt('Plasmodesmata', 'Cytoplasmic channels that pass through plant cell walls.'), kt('Fluid mosaic model', 'Membrane as a fluid lipid bilayer with a mosaic of proteins (Singer and Nicolson).'), kt('Facilitated diffusion', 'Passive movement through a specific carrier or channel; saturable; no ATP.'), kt('Antiport', 'Carrier that moves two substances in opposite directions.')],
      V.membrane,
      [2],
      [V.carriers, V.rate],
    ),
    sec(
      '3. Endomembrane system: endoplasmic reticulum, Golgi complex, lysosomes and vacuoles',
      `The **endomembrane system** consists of organelles whose functions are coordinated: the **ER, Golgi complex, lysosomes and vacuoles** (mitochondria, chloroplasts and peroxisomes are not included because their functions are not coordinated with these).

- **Endoplasmic reticulum.** A network of tubules and flattened sacs (cisternae) continuous with the nuclear envelope. **Rough ER** has **ribosomes** on its outer face and makes **proteins for secretion and for membranes**; **smooth ER** has none and makes **lipids and steroids**, and detoxifies drugs.
- **Golgi complex** (Camillo Golgi). A stack of flat cisternae near the nucleus with a **cis (forming) face** receiving vesicles from the ER and a **trans (maturing) face** that sends them out; it **modifies, sorts and packages** products, adds carbohydrate, and forms **lysosomes**.
- **Lysosomes.** Single-membrane vesicles with **hydrolytic enzymes** (lipases, proteases, carbohydrases) active at **acidic pH**; digest food and worn-out organelles (“**suicide bags**”).
- **Vacuoles.** Single-membrane sacs; in plants a large central vacuole bounded by the **tonoplast** holds sap, maintains **turgor** and stores waste; **contractile vacuoles** in protists expel water; **food vacuoles** digest food.

**Coordination in secretion.** A protein made on the rough ER enters its cavity, is carried by a **vesicle** to the **cis face**, modified through the stack, leaves the **trans face** in vesicles, and either is **secreted** at the plasma membrane or forms a **lysosome**.`,
      [kt('Cisterna', 'Flattened membranous sac of the ER or the Golgi complex.'), kt('Lysosome', 'Single-membrane bag of hydrolytic enzymes.'), kt('Tonoplast', 'Membrane around the vacuole of a plant cell.'), kt('Endomembrane system', 'ER, Golgi complex, lysosomes and vacuoles, linked by vesicles.')],
      V.endo,
      [3],
    ),
    sec(
      '4. Mitochondria, plastids, ribosomes and microbodies',
      `**Mitochondria** are double-membraned, sausage-shaped organelles. The **outer membrane** is smooth; the **inner membrane** is folded into **cristae** that increase the surface and carry the particles that make **ATP**; the **matrix** contains respiratory enzymes, **circular DNA** and **70S ribosomes**. They are the sites of **aerobic respiration** and divide by fission.

**Plastids** are double-membraned organelles of plants and algae. **Chloroplasts** contain **chlorophyll**; the inner membrane system is a set of **thylakoids** stacked into **grana** and joined by **stroma lamellae**; the **stroma** has enzymes for making carbohydrates and proteins, DNA and 70S ribosomes. **Chromoplasts** hold **carotenoids** and give yellow, orange and red colours. **Leucoplasts** are colourless stores: **amyloplasts** (starch), **elaioplasts** (oils and fats), **aleuroplasts** (proteins).

**Ribosomes** are non-membranous particles of **rRNA and protein**, the sites of protein synthesis: **70S** (50S + 30S) in prokaryotes, mitochondria and plastids; **80S** (60S + 40S) in the cytoplasm of eukaryotes, free or on the rough ER. (S, the Svedberg unit, measures sedimentation rate, so subunit values do not simply add.)

**Microbodies** are single-membrane vesicles with enzymes: **peroxisomes** (catalase; break down hydrogen peroxide) and **glyoxysomes** (germinating fatty seeds; convert fat to carbohydrate).`,
      [kt('Cristae', 'Folds of the inner mitochondrial membrane.'), kt('Granum', 'Stack of thylakoids in a chloroplast.'), kt('Leucoplast', 'Colourless plastid that stores food.'), kt('Peroxisome', 'Microbody with catalase.')],
      V.organelles,
      [4],
    ),
    sec(
      '5. Cytoskeleton; cilia, flagella and centrioles',
      `The **cytoskeleton** is a network of protein filaments: **microfilaments** (actin; thinnest; contraction, shape, cytoplasmic streaming), **intermediate filaments** (fibrous proteins such as keratin; strong mechanical support) and **microtubules** (tubulin; hollow; spindle, cilia, flagella, centrioles; guide the movement of vesicles).

**Cilia and flagella** are hair-like projections of the plasma membrane. **Cilia** are short and numerous and beat like oars; **flagella** are long and few and propel the cell, as in a sperm. Each has a core, the **axoneme**, of **nine peripheral doublet microtubules and two central single microtubules** (the **9 + 2** arrangement, ${axonemeMicrotubules} microtubules in all), joined by **radial spokes**, and arises from a **basal body**.

**Centrioles** form the **centrosome** (two centrioles at right angles) in animal cells and some lower plants; each has **nine peripheral triplets** of microtubules in a cartwheel with **no central pair** (${centrioleMicrotubules} microtubules). They organise the **spindle and asters** in cell division and give rise to basal bodies.`,
      [kt('Axoneme', 'Core of a cilium or flagellum with the 9 + 2 microtubule pattern.'), kt('Basal body', 'Centriole-like structure at the base of a cilium or flagellum.'), kt('Centrosome', 'Pair of centrioles with surrounding material.')],
      V.axoneme,
      [5],
    ),
    sec(
      '6. Nucleus: envelope, chromatin, nucleolus; chromosomes',
      `The **nucleus** (Robert Brown, ${YEARS.brown}) controls the cell. The **nuclear envelope** is two membranes separated by a **perinuclear space**, perforated by **nuclear pores** that control the passage of RNA and proteins; the outer membrane is continuous with the rough ER. The **nucleoplasm** contains **chromatin**, DNA with histone proteins: **euchromatin** is loosely packed, lightly stained and transcriptionally **active**; **heterochromatin** is densely packed, darkly stained and **inactive**. The **nucleolus** is a dense, **non-membrane-bound** body, the site of **rRNA synthesis and assembly of ribosome subunits**; it is large in cells that make much protein.

**Chromosomes** show a **centromere** (primary constriction) bearing disc-shaped **kinetochores** to which spindle fibres attach. By its position they are: **metacentric** (middle, equal arms), **submetacentric** (slightly off the middle, one arm longer), **acrocentric** (near one end, one very short arm) and **telocentric** (at the end). Some chromosomes have a **secondary constriction** that cuts off a small **satellite**. In the model data, short arms of ${CHR.map((c) => c.short).join(', ')} µm on a total of ${CHR[0].total} µm give ${CHR.map((c) => kind(c.total, c.short)).join(', ')} chromosomes. (Strict cut-off values for the types differ between books; the position of the centromere is what the syllabus asks.)`,
      [kt('Chromatin', 'DNA with histones in the nucleus.'), kt('Nucleolus', 'Non-membrane-bound site of rRNA synthesis and ribosome assembly.'), kt('Kinetochore', 'Disc on the centromere where spindle fibres attach.'), kt('Satellite', 'Small segment cut off by a secondary constriction.')],
      V.chromosomes,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving Virchow’s statement as the whole cell theory (it modified it: cells arise from cells).
- Saying facilitated diffusion needs ATP (it does not); or that active transport goes down the gradient (it goes against).
- Labelling the Golgi cis face as the one that releases vesicles (the trans face does).
- Calling lysosomes and peroxisomes the same (lysosomes: hydrolytic enzymes; peroxisomes: catalase).
- Writing 9 + 0 for a cilium (it is 9 + 2; 9 + 0 triplets is the centriole and basal body).
- Mixing up acrocentric (near one end) and telocentric (at the end).

**How marks are usually awarded**
- 1-mark subparts: a scientist, a term, a type of plastid, the cilium pattern, a chromosome type, give-a-reason and analogy.
- 2–3-mark questions: prokaryotic versus eukaryotic or plant versus animal in a table; active transport versus facilitated diffusion; ER and Golgi; chromosome types.
- 5-mark questions in parts: fluid mosaic model with a labelled diagram; endomembrane coordination; mitochondrion and chloroplast diagrams.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Who named cells, and from what?', 'Robert Hooke; dead cork.', 'fact', 1),
    fc(2, 'Who first saw living cells?', 'Anton van Leeuwenhoek.', 'fact', 1),
    fc(3, 'Virchow’s contribution?', 'Omnis cellula-e cellula: cells arise from pre-existing cells.', 'exam-tip', 1),
    fc(4, 'Who discovered the nucleus?', 'Robert Brown.', 'fact', 1),
    fc(5, 'Why are most cells small?', 'A small cell has a larger surface-to-volume ratio.', 'concept', 1),
    fc(6, 'Ribosomes of prokaryotes and eukaryotes?', '70S and 80S.', 'fact', 1),
    fc(7, 'Reserve food of plants and animals?', 'Starch; glycogen.', 'fact', 1),
    fc(8, 'Wall of fungal cells?', 'Chitin.', 'fact', 2),
    fc(9, 'What is the middle lamella?', 'Calcium pectate layer cementing neighbouring plant cells.', 'definition', 2),
    fc(10, 'What are plasmodesmata?', 'Cytoplasmic channels through plant cell walls.', 'definition', 2),
    fc(11, 'Who proposed the fluid mosaic model?', 'Singer and Nicolson (1972).', 'fact', 2),
    fc(12, 'Integral versus peripheral protein?', 'Integral spans or penetrates the bilayer; peripheral lies on the surface.', 'concept', 2),
    fc(13, 'Facilitated diffusion: ATP?', 'No; carrier or channel, down the gradient, saturable.', 'concept', 2),
    fc(14, 'Example of active transport?', 'Sodium–potassium pump.', 'fact', 2),
    fc(15, 'Antiport?', 'Carrier moving two substances in opposite directions.', 'definition', 2),
    fc(16, 'Which ER bears ribosomes?', 'Rough ER.', 'fact', 3),
    fc(17, 'Functions of smooth ER?', 'Lipids and steroids; detoxification.', 'fact', 3),
    fc(18, 'Cis face of Golgi?', 'Forming face; receives vesicles from the ER.', 'concept', 3),
    fc(19, 'Why are lysosomes “suicide bags”?', 'Hydrolytic enzymes can digest the cell itself.', 'concept', 3),
    fc(20, 'Membrane around a plant vacuole?', 'Tonoplast.', 'fact', 3),
    fc(21, 'Parts of a mitochondrion?', 'Outer membrane, inner membrane with cristae, matrix.', 'exam-tip', 4),
    fc(22, 'Stack of thylakoids?', 'Granum.', 'fact', 4),
    fc(23, 'Plastid that stores oil?', 'Elaioplast.', 'fact', 4),
    fc(24, 'Plastid with carotenoids?', 'Chromoplast.', 'fact', 4),
    fc(25, 'Peroxisome enzyme?', 'Catalase.', 'fact', 4),
    fc(26, 'Microtubules in a cilium?', 'Nine doublets plus two central: 9 + 2.', 'exam-tip', 5),
    fc(27, 'Microtubules in a centriole?', 'Nine triplets, no central pair.', 'exam-tip', 5),
    fc(28, 'Function of the nucleolus?', 'Makes rRNA and assembles ribosome subunits.', 'fact', 6),
    fc(29, 'Centromere near one end?', 'Acrocentric chromosome.', 'fact', 6),
    fc(30, 'What is a satellite?', 'Small segment cut off by a secondary constriction.', 'definition', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
