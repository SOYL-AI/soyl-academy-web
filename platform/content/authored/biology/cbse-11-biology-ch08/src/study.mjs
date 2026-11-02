// ch08 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Cell: The Unit of Life — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Cell theory; prokaryotic and eukaryotic cells',
      `Anything less than a complete cell does not ensure independent living, so the **cell is the fundamental structural and functional unit** of all living organisms. **Anton von Leeuwenhoek** first saw and described a live cell; **Robert Brown** later discovered the nucleus.

**Cell theory.** **Matthias Schleiden** (1838) concluded that plants are composed of different kinds of cells forming tissues. **Theodore Schwann** (1839) found that animal cells have a thin outer layer, now called the **plasma membrane**, and that the **cell wall** is unique to plant cells; he proposed that the bodies of animals and plants are composed of cells and products of cells. Their theory did not explain how new cells form. **Rudolf Virchow** (1855) explained that cells divide and new cells form from pre-existing cells (*omnis cellula e cellula*). The modern cell theory: (i) all living organisms are composed of cells and products of cells; (ii) all cells arise from pre-existing cells.

**Overview.** Cells with a membrane-bound nucleus are **eukaryotic**; those without are **prokaryotic**. Eukaryotic cells have membrane-bound organelles (ER, Golgi complex, lysosomes, mitochondria, microbodies, vacuoles); ribosomes, which are not membrane-bound, occur in all cells. Animal cells have a **centrosome**. **Sizes:** Mycoplasma, the smallest cells, about **0.3 µm**; bacteria **3–5 µm**; human red blood cell about **7 µm**; the largest isolated single cell is the egg of an ostrich; nerve cells are among the longest. Shapes include disc-like, polygonal, columnar, cuboidal, thread-like and irregular.

**Plant versus animal cells.** Plant cells have a **cell wall, plastids and a large central vacuole**; animal cells have **centrioles**, absent in almost all plant cells.`,
      [kt('Cell theory', 'All organisms are made of cells and cell products, and all cells arise from pre-existing cells.'), kt('Prokaryotic cell', 'A cell without a nuclear envelope or membrane-bound organelles.'), kt('Eukaryotic cell', 'A cell with an organised nucleus and membrane-bound organelles.')],
      table(['Feature', 'Prokaryotic', 'Eukaryotic'], [['Nuclear envelope', 'Absent', 'Present'], ['Membrane-bound organelles', 'Absent', 'Present'], ['Ribosomes', '70S', '80S (cytoplasm)'], ['Examples', 'Bacteria, blue-green algae, mycoplasma, PPLO', 'Protists, fungi, plants, animals']], 'Table comparing prokaryotic and eukaryotic cells'),
      [1],
    ),
    sec(
      '2. Prokaryotic cells',
      `Prokaryotes — **bacteria, blue-green algae, mycoplasma and PPLO** (pleuro pneumonia like organisms) — are generally smaller than eukaryotic cells and multiply more rapidly. Bacteria are rod-like (**bacillus**), spherical (**coccus**), comma-shaped (**vibrio**) or spiral (**spirillum**). A cell wall surrounds the membrane in all except **mycoplasma**. There is no well-defined nucleus: the genetic material is **naked**. Besides the genomic DNA (a single circular chromosome), many bacteria have small circular **plasmids**, which confer characters such as **antibiotic resistance** and are used to monitor bacterial transformation with foreign DNA. Apart from ribosomes, there are no organelles like those of eukaryotes.

**Cell envelope.** Most prokaryotes, especially bacteria, have a chemically complex envelope of three tightly bound layers: the outer **glycocalyx**, the **cell wall** and the **plasma membrane**, acting as a single protective unit. Bacteria that take up the Gram stain are **Gram-positive**; those that do not are **Gram-negative**. The glycocalyx may be a loose sheath (**slime layer**) or thick and tough (**capsule**). The wall fixes the shape and gives strong support that stops the bacterium bursting or collapsing. The plasma membrane is selectively permeable.

**Mesosome.** An extension of the plasma membrane into the cell as vesicles, tubules and lamellae; it helps in **cell wall formation, DNA replication and distribution** to daughter cells, **respiration, secretion**, and increases the membrane’s surface area and enzyme content. In cyanobacteria, **chromatophores** are membranous extensions containing pigments.

**Surface structures.** Motile bacteria have **flagella**, each with a **filament, hook and basal body**. **Pili** are elongated tubular structures of a special protein; **fimbriae** are small bristle-like fibres that help some bacteria attach to rocks in streams and to host tissues. Neither has a role in motility.

**Ribosomes and inclusions.** Ribosomes, associated with the plasma membrane, are about **15 nm by 20 nm** and are made of **50S and 30S** subunits forming **70S** ribosomes, the sites of protein synthesis. Several ribosomes on one mRNA form a **polysome (polyribosome)**. **Inclusion bodies** — phosphate granules, cyanophycean granules and glycogen granules — store reserve material free in the cytoplasm, not bound by membranes. **Gas vacuoles** occur in blue-green, purple and green photosynthetic bacteria.`,
      [kt('Glycocalyx', 'Outer layer of the bacterial envelope: a slime layer if loose, a capsule if thick and tough.'), kt('Mesosome', 'Infolding of the bacterial plasma membrane that aids wall formation, DNA replication and respiration.'), kt('Plasmid', 'Small circular DNA outside the bacterial chromosome, often carrying antibiotic resistance.'), kt('Polysome', 'Several ribosomes translating one mRNA together.')],
      V.prokaryote,
      [1],
    ),
    sec(
      '3. Cell membrane and cell wall',
      `**Cell membrane.** Its detailed structure was studied after the electron microscope came into use in the 1950s. Chemical studies, especially on human **red blood cells**, showed that the membrane is mainly **lipid and protein**, the lipids (mainly **phosphoglycerides**) forming a **bilayer** with **polar heads towards the outer sides** and **hydrophobic tails towards the inside**, protecting the non-polar tails from the aqueous environment. Membranes also contain carbohydrates. The ratio of protein to lipid varies: the human red cell membrane has about **52 percent protein and 40 percent lipid**. **Peripheral proteins** lie on the surface; **integral proteins** are partly or totally buried.

The **fluid mosaic model** of **Singer and Nicolson (1972)** states that the **quasi-fluid** nature of the lipid allows **lateral movement of proteins** within the bilayer; this fluidity is important for **cell growth, formation of intercellular junctions, secretion, endocytosis and cell division**.

**Transport.** The membrane is **selectively permeable**. **Passive transport** needs no energy: neutral solutes cross by **simple diffusion** along the concentration gradient, and water by **osmosis**. Polar molecules cannot pass through the non-polar lipid bilayer and need **carrier proteins**. **Active transport** moves ions or molecules **against** the concentration gradient using **ATP**, as in the **sodium–potassium pump**.

**Cell wall.** A non-living rigid layer that forms the outer covering of the plasma membrane of fungi and plants. It gives **shape**, protects from **mechanical damage and infection**, helps **cell-to-cell interaction** and is a barrier to **undesirable macromolecules**. **Algal walls:** cellulose, galactans, mannans and minerals such as **calcium carbonate**; **other plants:** cellulose, hemicellulose, pectins and proteins. The **primary wall** of a young cell can grow; the **secondary wall** forms on its inner side (towards the membrane) as the cell matures. The **middle lamella**, mainly **calcium pectate**, holds neighbouring cells together. **Plasmodesmata** traverse the wall and middle lamella and connect the cytoplasm of neighbouring cells.`,
      [kt('Fluid mosaic model', 'Singer and Nicolson’s model: a quasi-fluid lipid bilayer with a mosaic of proteins that can move sideways.'), kt('Active transport', 'Movement against the concentration gradient using ATP.'), kt('Middle lamella', 'Layer of calcium pectate gluing neighbouring plant cells together.'), kt('Plasmodesmata', 'Cytoplasmic strands crossing walls to connect neighbouring plant cells.')],
      V.membrane,
      [2],
    ),
    sec(
      '4. The endomembrane system',
      `The **endoplasmic reticulum (ER), Golgi complex, lysosomes and vacuoles** form the **endomembrane system**, because their functions are coordinated. Mitochondria, chloroplasts and peroxisomes are not included.

**ER.** A network of tiny tubules dividing the intracellular space into **luminal** (inside ER) and **extra-luminal** (cytoplasm) compartments. **Rough ER (RER)** bears ribosomes, is common in cells active in **protein synthesis and secretion**, and is extensive and continuous with the outer membrane of the nucleus. **Smooth ER (SER)** is the major site of **lipid synthesis**; in animal cells lipid-like **steroidal hormones** are made in SER.

**Golgi apparatus.** **Camillo Golgi (1898)** saw densely stained reticular structures near the nucleus. It has many flat, disc-shaped sacs, **cisternae**, **0.5–1.0 µm** across, stacked in parallel and arranged concentrically near the nucleus, with a convex **cis (forming) face** and a concave **trans (maturing) face**. Its main job is **packaging** materials for intracellular targets or for secretion. Vesicles from the ER fuse with the cis face and move towards the trans face; proteins made on the ER are **modified** in the cisternae before release. It is an important site of **glycoprotein and glycolipid** formation.

**Lysosomes.** Membrane-bound vesicles formed by **Golgi packaging**, very rich in **hydrolytic enzymes** (hydrolases: **lipases, proteases, carbohydrases**) optimally active at **acidic pH**; they can digest carbohydrates, proteins, lipids and nucleic acids.

**Vacuoles.** Membrane-bound spaces containing water, sap, excretory products and other materials not useful to the cell, bounded by a single membrane, the **tonoplast**. In plant cells they can occupy **up to 90 percent** of the cell volume, and the tonoplast moves ions into the vacuole **against their concentration gradient**, so their concentration is much higher than in the cytoplasm. In **Amoeba** the **contractile vacuole** carries out osmoregulation and excretion; in many protists **food vacuoles** form by engulfing food.`,
      [kt('Endomembrane system', 'ER, Golgi complex, lysosomes and vacuoles, whose functions are coordinated.'), kt('Cis face', 'The convex forming face of the Golgi, where ER vesicles fuse.'), kt('Lysosome', 'Golgi-derived vesicle of hydrolytic enzymes active at acidic pH.'), kt('Tonoplast', 'The membrane bounding a vacuole.')],
      V.animal,
      [3],
      [V.plant],
    ),
    sec(
      '5. Mitochondria, plastids, ribosomes, cytoskeleton, cilia, centrioles and nucleus',
      `**Mitochondria** are not easily seen unless stained; their number depends on the cell’s physiological activity. They are sausage-shaped or cylindrical, **0.2–1.0 µm** wide (average 0.5 µm) and **1.0–4.1 µm** long. A **double membrane**: the outer membrane forms a continuous boundary; the inner membrane forms infoldings, **cristae**, that increase the surface area, around the **matrix**. Each membrane has its own enzymes. Mitochondria are the sites of **aerobic respiration** and produce **ATP** — the **power houses** of the cell. The matrix has a single **circular DNA**, a few RNA molecules, **70S ribosomes** and what is needed for protein synthesis. Mitochondria divide by **fission**.

**Plastids** occur in all plant cells and in euglenoids. **Chloroplasts** (chlorophyll and carotenoids; trap light), **chromoplasts** (fat-soluble carotenoids such as carotene and xanthophylls: yellow, orange or red) and **leucoplasts** (colourless stores: **amyloplasts** — starch, as in potato; **elaioplasts** — oils and fats; **aleuroplasts** — proteins). Chloroplasts, mainly in leaf **mesophyll**, are lens-shaped, oval, spherical, discoid or ribbon-like, **5–10 µm** long and **2–4 µm** wide; **one** per cell in *Chlamydomonas*, **20–40** per mesophyll cell. Two membranes (the inner less permeable) enclose the **stroma**, which contains **thylakoids** stacked as **grana**, joined by **stroma lamellae**; each thylakoid encloses a **lumen**. The stroma has enzymes for making **carbohydrates and proteins**, small double-stranded **circular DNA** and **70S ribosomes**. **Chlorophyll** is in the thylakoids.

**Ribosomes**, seen as dense particles by **George Palade (1953)**, are made of **RNA and protein** with **no membrane**. Eukaryotic cytoplasmic ribosomes are **80S** (**60S + 40S** subunits); prokaryotic are **70S** (**50S + 30S**). S is the **Svedberg unit**, a sedimentation coefficient that indirectly measures density and size.

**Cytoskeleton:** microtubules, microfilaments and intermediate filaments; mechanical support, motility and maintenance of shape.

**Cilia and flagella** are hair-like outgrowths of the membrane: cilia are small and work like oars; flagella are longer and move the cell (bacterial flagella are structurally different). The core, the **axoneme**, has **nine pairs of doublet peripheral microtubules** and a **central pair** (the **9 + 2 array**); the central tubules are joined by bridges and enclosed by a **central sheath**, linked to each peripheral doublet by a **radial spoke**; peripheral doublets are joined by **linkers**. Both arise from centriole-like **basal bodies**.

**Centrosome:** usually two cylindrical **centrioles** lying **perpendicular** to each other in amorphous **pericentriolar material**. Each has a **cartwheel** organisation of **nine evenly spaced peripheral triplet fibrils** of **tubulin**, with a central proteinaceous **hub** joined to the triplets by **radial spokes**. Centrioles form the **basal bodies** of cilia and flagella and the **spindle fibres** of animal cells during division.

**Nucleus.** Described by Robert Brown (1831); Flemming named the basic-dye-staining material **chromatin**. The **nuclear envelope** has two membranes with a **perinuclear space** of **10–50 nm**; the outer membrane is continuous with the ER and bears ribosomes; **nuclear pores** allow RNA and proteins to move both ways. The nucleoplasm contains **nucleoli** (not membrane-bound; sites of active **rRNA synthesis**; larger and more numerous in protein-making cells) and **chromatin** (DNA, basic **histones**, non-histone proteins and RNA). A human cell has about **2 m** of DNA in **46 chromosomes**. Mature red cells of many mammals and **sieve tube cells** lack a nucleus. Each chromosome has a **centromere** with disc-shaped **kinetochores**: **metacentric** (middle), **sub-metacentric** (nearer one end), **acrocentric** (close to one end; one extremely short arm), **telocentric** (terminal). Some chromosomes have a non-staining **secondary constriction** that gives a small fragment called the **satellite**.

**Microbodies:** minute membrane-bound vesicles containing various enzymes, in plant and animal cells.`,
      [kt('Cristae', 'Infoldings of the inner mitochondrial membrane.'), kt('Granum', 'A stack of thylakoids in a chloroplast.'), kt('Svedberg unit (S)', 'Sedimentation coefficient indicating density and size of a particle.'), kt('Axoneme', 'The 9 + 2 microtubule core of a cilium or flagellum.'), kt('Kinetochore', 'Disc-shaped structure on each side of the centromere.')],
      V.mitoChloro,
      [3],
      [V.axoneme, V.chromosomes],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Crediting Schleiden and Schwann with "cells from pre-existing cells" (that was Virchow).
- Adding S values: 50S and 30S make 70S, not 80S.
- Placing mitochondria or chloroplasts in the endomembrane system.
- Reversing the Golgi faces (enter at cis, leave at trans).
- Calling a secondary wall the outer layer (it forms on the inner side of the primary wall).
- Describing the axoneme as 9 triplets (that is the centriole) or the centriole as 9 + 2.
- Saying ribosomes are bounded by a membrane.

**How marks are usually awarded**
- 1-mark items: name an organelle, a scientist, a plastid, a chromosome type or a transport process.
- 2–3-mark answers: cell theory; prokaryote versus eukaryote; fluid mosaic model; transport classification; RER versus SER; plastid types; chromosome types.
- 5-mark answers: prokaryotic cell; membrane and wall; endomembrane system; mitochondria and chloroplasts compared; nucleus and chromosomes.
- Case-based items: a bacterial culture, red cell membranes, a protein-tracking experiment or leaf and root plastids, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Two statements of the cell theory?', 'Organisms are made of cells and cell products; all cells arise from pre-existing cells.', 'concept', 1),
    fc(2, 'Who added “cells from pre-existing cells”?', 'Rudolf Virchow (1855).', 'fact', 1),
    fc(3, 'Smallest cells?', 'Mycoplasma, about 0.3 µm.', 'fact', 1),
    fc(4, 'Largest isolated single cell?', 'The egg of an ostrich.', 'fact', 1),
    fc(5, 'Four shapes of bacteria?', 'Bacillus, coccus, vibrio, spirillum.', 'fact', 1),
    fc(6, 'Three layers of the bacterial envelope?', 'Glycocalyx, cell wall, plasma membrane.', 'concept', 1),
    fc(7, 'Slime layer versus capsule?', 'Loose glycocalyx versus thick, tough glycocalyx.', 'definition', 1),
    fc(8, 'Roles of the mesosome?', 'Wall formation, DNA replication and distribution, respiration, secretion, more membrane surface.', 'concept', 1),
    fc(9, 'What are plasmids?', 'Small circular DNA outside genomic DNA, giving traits such as antibiotic resistance.', 'definition', 1),
    fc(10, 'Pili and fimbriae?', 'Surface structures not used for motility; fimbriae help attachment.', 'fact', 1),
    fc(11, 'Prokaryotic ribosome?', '70S, from 50S and 30S subunits.', 'fact', 1),
    fc(12, 'Inclusion bodies?', 'Free reserve granules: phosphate, cyanophycean, glycogen.', 'definition', 1),
    fc(13, 'Fluid mosaic model?', 'Singer and Nicolson (1972): quasi-fluid lipid bilayer with mobile proteins.', 'concept', 2),
    fc(14, 'Red cell membrane composition?', 'About 52 percent protein, 40 percent lipid.', 'fact', 2),
    fc(15, 'Passive versus active transport?', 'Down the gradient without energy versus against it using ATP.', 'concept', 2),
    fc(16, 'Middle lamella is made of?', 'Mainly calcium pectate.', 'fact', 2),
    fc(17, 'Where does the secondary wall form?', 'On the inner side of the primary wall, towards the membrane.', 'fact', 2),
    fc(18, 'Endomembrane system?', 'ER, Golgi complex, lysosomes and vacuoles.', 'concept', 3),
    fc(19, 'RER versus SER?', 'RER: ribosomes, proteins; SER: lipids and steroid hormones.', 'concept', 3),
    fc(20, 'Golgi faces?', 'Cis (forming, convex) and trans (maturing, concave).', 'fact', 3),
    fc(21, 'Lysosome enzymes?', 'Lipases, proteases, carbohydrases active at acidic pH.', 'fact', 3),
    fc(22, 'Share of a plant cell taken by the vacuole?', 'Up to 90 percent.', 'fact', 3),
    fc(23, 'Mitochondrion size?', '0.2–1.0 µm wide, 1.0–4.1 µm long.', 'fact', 3),
    fc(24, 'Three types of leucoplast?', 'Amyloplasts (starch), elaioplasts (oils, fats), aleuroplasts (proteins).', 'fact', 3),
    fc(25, 'Parts inside a chloroplast?', 'Stroma, thylakoids stacked into grana, stroma lamellae.', 'concept', 3),
    fc(26, 'Eukaryotic ribosome subunits?', '60S and 40S, forming 80S.', 'fact', 3),
    fc(27, 'Axoneme arrangement?', '9 + 2: nine peripheral doublets and a central pair.', 'fact', 3),
    fc(28, 'Centriole structure?', 'Cartwheel of nine peripheral triplets of tubulin with a central hub.', 'fact', 3),
    fc(29, 'Role of the nucleolus?', 'Active synthesis of ribosomal RNA.', 'fact', 3),
    fc(30, 'Four chromosome types?', 'Metacentric, sub-metacentric, acrocentric, telocentric.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
