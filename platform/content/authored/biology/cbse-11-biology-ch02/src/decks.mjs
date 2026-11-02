// ch02 Biological Classification — two decks: Part 1 (t01 five kingdoms, Monera and Protista), Part 2 (Fungi, lichens, viruses and viroids).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { FIVEK, BACT, PROTIST, HYPHAE, VIRUS, LICHEN_SVG } from './svgs.mjs';
import { KINGDOMS, K, classify, WE_GROW, YEAR, GAP, BASIDIA, WE_CYCLE, LICHEN, lichenRatio, PHAGE, LEAVES, FUNGI_CLASSES } from './calc.mjs';

export const V = {
  fivek: svgV(FIVEK, 'Whittaker five-kingdom scheme with Monera at the base, then Protista, then Fungi, Plantae and Animalia'),
  bact: svgV(BACT, 'Coccus, bacillus, vibrio and spirillum forms and a cyanobacterial filament with a heterocyst'),
  protist: svgV(PROTIST, 'Amoeba, Paramecium, Euglena and a diatom with their special structures labelled'),
  hyphae: svgV(HYPHAE, 'Coenocytic and septate fungal hyphae and a branching mycelium'),
  virus: svgV(VIRUS, 'Bacteriophage with parts labelled, a generic virus particle, and a viroid made only of RNA'),
  lichen: svgV(LICHEN_SVG, 'Section of a lichen showing algal cells enclosed by fungal hyphae and what each partner supplies'),
};

export const deck1 = deck({
  part: 1,
  title: 'Biological Classification — Part 1: Five kingdoms, Monera and Protista',
  goals: [
    'Explain why the two-kingdom system was replaced by the five-kingdom system',
    'Compare the five kingdoms on cell type, cell wall, body organisation and nutrition',
    'Describe the groups and importance of Monera',
    'Describe the main groups of Protista',
  ],
  slides: [
    sl('title', 'Biological Classification', {
      b: 'Part 1 — from two kingdoms to five, then the simplest cells: bacteria and the protists.',
      v: flow('LR', [['m', 'Monera'], ['p', 'Protista'], ['f', 'Fungi'], ['pl', 'Plantae'], ['a', 'Animalia']], [['m', 'p'], ['p', 'f'], ['p', 'pl'], ['p', 'a']], 'Flow of the five kingdoms from Monera and Protista to Fungi, Plantae and Animalia'),
      n: 'Early biologists sorted all life into just plants and animals. As microscopes improved, that simple scheme failed. Today we use five kingdoms, and this part meets the first two: the bacteria and the protists.',
    }),
    sl('concept', 'Why two kingdoms were not enough', {
      b: 'Linnaeus placed every organism in **Plantae** or **Animalia**. This scheme did not distinguish between the **eukaryotes and prokaryotes**, **unicellular and multicellular** organisms, or **photosynthetic and non-photosynthetic** organisms.',
      v: table(['Organism', 'Problem under two kingdoms'], [['Bacteria and fungi', 'Placed with plants although they do not photosynthesise and have different walls'], ['Euglena', 'Photosynthesises like a plant but moves like an animal'], ['Unicellular and multicellular forms', 'Grouped together in one kingdom'], ['Prokaryotes and eukaryotes', 'No distinction made']], 'Table of organisms that did not fit the two-kingdom system'),
      n: 'Bacteria and fungi were counted as plants, even though they do not make their own food. Euglena has features of both plants and animals. The old scheme could not separate simple cells from complex cells, or single cells from many cells.',
    }),
    sl('concept', 'The five-kingdom classification', {
      b: 'In **1969 R. H. Whittaker** proposed five kingdoms: **Monera, Protista, Fungi, Plantae and Animalia**. He used **cell structure, body organisation, mode of nutrition, reproduction and phylogenetic relationships**.',
      v: table(['Criterion', 'Question asked'], [['Cell structure', 'Prokaryotic or eukaryotic? Cell wall present?'], ['Body organisation', 'Unicellular, loose tissue or tissues and organs?'], ['Mode of nutrition', 'Autotrophic or heterotrophic?'], ['Reproduction', 'Asexual, sexual or both?'], ['Phylogenetic relationships', 'Which groups share a common ancestry?']], 'Table of the five criteria used by Whittaker'),
      n: 'Whittaker used five kinds of evidence: cell structure, body organisation, how an organism gets food, how it reproduces, and its evolutionary relationships. Together they separated life into five kingdoms.',
    }),
    sl('diagram', 'The five kingdoms', {
      b: '**Monera** are prokaryotes. The **Protista** are unicellular eukaryotes. **Fungi**, **Plantae** and **Animalia** are multicellular eukaryotes that differ in how they obtain food.',
      v: V.fivek,
      n: 'Monera lie at the base because their cells have no nuclear membrane. Protista are single celled eukaryotes. From the protists three multicellular kingdoms are drawn. Fungi absorb food, plants make food, and animals ingest food.',
    }),
    sl('concept', 'Comparing the five kingdoms', {
      b: 'Compare the kingdoms on four features.',
      v: table(['Kingdom', 'Cell type', 'Cell wall', 'Body organisation', 'Nutrition'], KINGDOMS.map((k) => [k.name, k.cell, k.wall, k.body, k.nutrition]), 'Table comparing the five kingdoms on cell type, cell wall, body organisation and nutrition'),
      n: 'Only Monera are prokaryotic. Cell walls differ: non-cellulosic in Monera, chitin in fungi, cellulose in plants and none in animals. Plants are autotrophs, animals and fungi are heterotrophs, and Monera and Protista include both kinds.',
    }),
    sl('check', 'Quick check: reading the table', {
      b: 'A student notes that an organism is multicellular and has a cellulose cell wall and chloroplasts. Which kingdom does the table place it in?',
      n: 'Quick check. Which kingdom has cellulose walls and photosynthesis?',
      chk: 'basis-mcq',
    }),
    sl('example', 'Worked example 1: placing organisms with a key', {
      b: 'Use the key: prokaryote gives Monera; otherwise unicellular gives Protista; otherwise a chitin wall gives Fungi, a cellulose wall with photosynthesis gives Plantae, and no wall with ingestion gives Animalia. Place a mushroom, Euglena and a tiger.',
      ul: [
        `**Mushroom:** eukaryotic, multicellular, chitin wall: **${classify({ prokaryote: false, unicellular: false, wall: 'chitin', autotroph: false })}**.`,
        `**Euglena:** eukaryotic, unicellular: **${classify({ prokaryote: false, unicellular: true, wall: 'none', autotroph: true })}**.`,
        `**Tiger:** eukaryotic, multicellular, no wall, ingests food: **${classify({ prokaryote: false, unicellular: false, wall: 'none', autotroph: false })}**.`,
      ],
      v: table(['Organism', 'Key steps', 'Kingdom'], [['Mushroom', 'Eukaryote, many cells, chitin wall', 'Fungi'], ['Euglena', 'Eukaryote, one cell', 'Protista'], ['Tiger', 'Eukaryote, many cells, no wall, ingests food', 'Animalia']], 'Worked table placing a mushroom, Euglena and a tiger in kingdoms'),
      n: 'Ask the questions in order. A mushroom is a multicellular eukaryote with a chitin wall, so it is a fungus. Euglena is a single celled eukaryote, so it is a protist. A tiger has no cell wall and takes in food, so it is an animal.',
    }),
    sl('diagram', 'Kingdom Monera: shapes of bacteria', {
      b: '**Bacteria** are the sole members of Monera. They are the most abundant organisms and occur in every kind of habitat. They are classified by shape: **coccus**, **bacillus**, **vibrio** and **spirillum**.',
      v: V.bact,
      n: 'Bacteria are microscopic and live almost everywhere, from soil and water to hot springs and the inside of other organisms. By shape they are spherical cocci, rod shaped bacilli, comma shaped vibrios and spiral spirilla.',
    }),
    sl('concept', 'Archaebacteria and eubacteria', {
      b: '**Archaebacteria** live in harsh habitats and have a different cell-wall structure. **Eubacteria** (true bacteria) have a rigid cell wall, and a flagellum if they are motile.',
      v: table(['Group', 'Examples and features'], [['Archaebacteria: halophiles', 'Live in extremely salty areas'], ['Archaebacteria: thermoacidophiles', 'Live in hot springs'], ['Archaebacteria: methanogens', 'Live in marshy areas and in the guts of ruminant animals such as cows; produce methane (biogas) from dung'], ['Eubacteria: cyanobacteria', 'Photosynthetic autotrophs; Nostoc and Anabaena fix nitrogen in heterocysts'], ['Eubacteria: chemosynthetic autotrophs', 'Oxidise inorganic substances such as ammonia and nitrites for energy'], ['Eubacteria: heterotrophs', 'Decomposers; make curd, antibiotics; fix nitrogen in legumes; some cause disease'], ['Mycoplasma', 'No cell wall; smallest living cells; can live without oxygen; pathogenic']], 'Table of archaebacteria, eubacteria and mycoplasma with examples'),
      n: 'Archaebacteria survive in salt lakes, hot springs and marshes, where methanogens produce gas from dung. Eubacteria include cyanobacteria that photosynthesise, chemosynthetic bacteria, and the many heterotrophs. Mycoplasma are the smallest living cells and have no cell wall.',
    }),
    sl('check', 'Quick check: heterocysts', {
      b: 'Specialised cells called heterocysts in Nostoc and Anabaena are used for which process?',
      n: 'Quick check. These cyanobacteria add a vital nutrient to soil and water.',
      chk: 'cyano-mcq',
    }),
    sl('concept', 'Bacteria in our lives', {
      b: 'Most bacteria are **heterotrophs**, and many are **decomposers**. Others help or harm us.',
      v: table(['Helpful', 'Harmful'], [['Making curd from milk', 'Cholera and typhoid in humans'], ['Producing antibiotics', 'Tetanus'], ['Fixing nitrogen in legume roots', 'Citrus canker in plants'], ['Recycling nutrients as decomposers', 'Diseases of farm animals and pets']], 'Table of helpful and harmful bacteria'),
      n: 'Heterotrophic bacteria are the commonest. They decompose dead matter, turn milk into curd, supply antibiotics and fix nitrogen in the roots of legumes. Some cause cholera, typhoid, tetanus and citrus canker.',
    }),
    sl('example', 'Worked example 2: growth by binary fission', {
      b: `Bacteria multiply by **fission**. One cell has a generation time of ${WE_GROW.gen} minutes. How many cells exist after ${WE_GROW.minutes / 60} hours if growth is unchecked?`,
      ul: [
        r`Generations $= \dfrac{${WE_GROW.minutes}}{${WE_GROW.gen}} = ${WE_GROW.gens}$.`,
        r`Cells $= ${WE_GROW.n0} \times 2^{${WE_GROW.gens}} = ${WE_GROW.n}$.`,
        'In real life food runs out, so growth soon slows.',
      ],
      v: table(['Generation', '0', '1', '2', '3', '4', '5', '6'], [['Cells', ...[0, 1, 2, 3, 4, 5, 6].map((g) => String(WE_GROW.n0 * 2 ** g))]], `Worked table of cell numbers: ${WE_GROW.n} cells after ${WE_GROW.gens} generations`),
      n: 'Divide the total time by the generation time to find how many times the population doubles. Here that is six doublings. One cell becomes sixty four cells. In nature food and space run out, so growth slows down.',
    }),
    sl('diagram', 'Kingdom Protista', {
      b: '**Protista** are **unicellular eukaryotes**: chrysophytes, dinoflagellates, euglenoids, slime moulds and protozoans. They form a link between monera, plants, animals and fungi, and their boundary with other kingdoms is not well defined.',
      v: V.protist,
      n: 'Protists are single celled eukaryotes with a nucleus and other organelles. Many move by cilia or flagella. Amoeba uses pseudopodia, Paramecium has cilia, Euglena has a flagellum, and a diatom has a glassy silica shell.',
    }),
    sl('concept', 'Groups of protists', {
      b: 'Each group has a distinctive feature.',
      v: table(['Group', 'Features and examples'], [['Chrysophytes', 'Diatoms and golden algae; diatom walls of silica are indestructible, leaving diatomaceous earth; chief producers in the oceans'], ['Dinoflagellates', 'Mostly marine photosynthetic; two flagella; rapid multiplication makes red tides (Gonyaulax) that can kill fish'], ['Euglenoids', 'Freshwater; no cell wall but a protein-rich pellicle; photosynthetic in light, heterotrophic without it'], ['Slime moulds', 'Saprophytic; form a plasmodium and spore-bearing fruiting bodies'], ['Protozoans', 'Heterotrophs: amoeboid (Amoeba), flagellated (Trypanosoma), ciliated (Paramecium), sporozoans (Plasmodium)']], 'Table of the five groups of protists with features and examples'),
      n: 'Diatoms have silica shells. Dinoflagellates can multiply so fast that the sea turns red. Euglena photosynthesises in light and feeds on other organisms in the dark. Protozoans are heterotrophic and include the parasites of sleeping sickness and malaria.',
    }),
    sl('check', 'Quick check: Euglena', {
      b: 'Why is Euglena difficult to place in either plants or animals?',
      n: 'Quick check. Think about how it gets food in light and in the dark.',
      chk: 'euglena-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Two kingdoms failed to separate prokaryotes from eukaryotes, unicellular from multicellular, and autotrophs from heterotrophs.',
        `Whittaker (${YEAR.whittaker}): Monera, Protista, Fungi, Plantae, Animalia.`,
        'Monera: bacteria; coccus, bacillus, vibrio, spirillum; archaebacteria and eubacteria; mycoplasma.',
        'Cyanobacteria fix nitrogen in heterocysts; bacteria reproduce by fission.',
        'Protista: chrysophytes, dinoflagellates, euglenoids, slime moulds, protozoans.',
      ],
      v: table(['Kingdom', 'Cells', 'Body'], [['Monera', 'Prokaryotic', 'Cellular'], ['Protista', 'Eukaryotic', 'Cellular']], 'Summary table of Monera and Protista'),
      n: 'To recap: Whittaker proposed five kingdoms using several kinds of evidence. Monera are prokaryotic bacteria. Protista are single celled eukaryotes in five groups. Both kingdoms include autotrophs and heterotrophs.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **five kingdoms**, the **year** and **Whittaker**.',
        'For each kingdom state **cell type, wall, organisation and nutrition**.',
        'Give **one example** for each group of Monera and Protista.',
        'Show the **doubling sum** for bacterial growth in two steps.',
      ],
      n: 'Exam tips. Know the five kingdoms and who proposed them. Compare them on cell type, wall, body organisation and nutrition. Learn one example for each group of bacteria and protists. And write growth sums as generations first, then cells.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biological Classification — Part 2: Fungi, lichens, viruses and viroids',
  goals: [
    'Describe the structure, nutrition and reproduction of fungi',
    'Distinguish the four classes of fungi with examples',
    'Explain the partnership in a lichen',
    'Compare viruses and viroids and describe their discovery',
  ],
  slides: [
    sl('title', 'Fungi, lichens, viruses and viroids', {
      b: 'Part 2 — decomposers with threads, partners that live together, and agents that are not quite cells.',
      v: flow('LR', [['f', 'Fungi'], ['l', 'Lichens'], ['v', 'Viruses'], ['vd', 'Viroids']], [['f', 'l'], ['l', 'v'], ['v', 'vd']], 'Flow of topics: fungi, lichens, viruses and viroids'),
      n: 'Fungi are eukaryotes that feed by absorption. Lichens are partnerships between fungi and algae. Viruses and viroids are infectious agents that cannot live without a host. Together they test the edges of our classification.',
    }),
    sl('diagram', 'Kingdom Fungi: hyphae and mycelium', {
      b: 'Fungal bodies are built of long thread-like **hyphae**; their network is the **mycelium**. Some hyphae are continuous tubes with many nuclei (**coenocytic**); others have cross walls (**septate**). The cell wall is made of **chitin** and polysaccharides.',
      v: V.hyphae,
      n: 'A fungus is made of thin threads called hyphae. A network of hyphae is a mycelium. Some hyphae are one long tube holding many nuclei, and others are divided by cross walls. Fungal cell walls contain chitin.',
    }),
    sl('concept', 'How fungi feed', {
      b: 'Fungi are **heterotrophs**. They absorb soluble organic matter from the substrate.',
      v: table(['Type', 'Source of food', 'Example'], [['Saprophytes', 'Dead organic matter', 'Bread mould, mushrooms on logs'], ['Parasites', 'Living plants or animals', 'Rust and smut fungi'], ['Symbionts', 'Partners that live together', 'Lichens with algae; mycorrhiza with roots of higher plants']], 'Table of saprophytic, parasitic and symbiotic fungi'),
      n: 'Fungi cannot make their own food. Saprophytes absorb nutrients from dead matter. Parasites feed on living hosts. Symbionts live in partnership, as in lichens, which pair a fungus with an alga, and mycorrhiza on plant roots.',
    }),
    sl('check', 'Quick check: hyphae', {
      b: 'Which fungal structure is a continuous tube with many nuclei and no cross walls?',
      n: 'Quick check. Think about what septa are and what is missing.',
      chk: 'hyphae-mcq',
    }),
    sl('concept', 'Reproduction in fungi', {
      b: 'Fungi reproduce in **three** ways.',
      v: table(['Method', 'How it happens'], [['Vegetative', 'Fragmentation, fission and budding'], ['Asexual', 'Spores: conidia, sporangiospores or zoospores'], ['Sexual', 'Oospores, ascospores or basidiospores, formed after plasmogamy and karyogamy']], 'Table of vegetative, asexual and sexual reproduction in fungi'),
      n: 'Fungi can multiply by breaking, splitting or budding. They make asexual spores such as conidia. Sexual reproduction forms oospores, ascospores or basidiospores. Yeast is a familiar budding fungus.',
    }),
    sl('concept', 'The sexual cycle', {
      b: '**Plasmogamy** is the fusion of cytoplasm. **Karyogamy** is the fusion of two nuclei. In Ascomycetes and Basidiomycetes a **dikaryon** stage with two nuclei in each cell comes between them.',
      v: flow('LR', [['h', 'Haploid hyphae meet'], ['p', 'Plasmogamy'], ['d', 'Dikaryon (two nuclei per cell)'], ['k', 'Karyogamy: diploid zygote'], ['m', 'Meiosis: haploid spores']], [['h', 'p'], ['p', 'd'], ['d', 'k'], ['k', 'm']], 'Flow of the fungal sexual cycle from haploid hyphae to haploid spores'),
      n: 'Haploid hyphae meet and their cytoplasm fuses, which is plasmogamy. In some fungi the two nuclei then live together in a dikaryon. When they fuse, in karyogamy, a diploid zygote forms. Meiosis then makes haploid spores.',
    }),
    sl('example', 'Worked example 1: chromosome numbers in the cycle', {
      b: `A fungus has ${WE_CYCLE.hypha} chromosomes in each haploid nucleus. Find the number in each nucleus and in the whole cell at the dikaryon stage, in the zygote nucleus, and in the spores.`,
      ul: [
        `Dikaryon: two nuclei, each with ${WE_CYCLE.dikaryonPerNucleus}, so **${WE_CYCLE.dikaryonTotal}** chromosomes per cell, but each nucleus is still haploid.`,
        `Karyogamy gives a diploid zygote nucleus with **${WE_CYCLE.zygote}** chromosomes.`,
        `Meiosis restores **${WE_CYCLE.spores}** chromosomes in each spore.`,
      ],
      v: table(['Stage', 'Nuclei per cell', 'Chromosomes in each nucleus'], [['Haploid hypha', '1', String(WE_CYCLE.hypha)], ['Dikaryon', '2', String(WE_CYCLE.dikaryonPerNucleus)], ['Zygote', '1', String(WE_CYCLE.zygote)], ['Spore', '1', String(WE_CYCLE.spores)]], `Worked table of chromosome numbers: ${WE_CYCLE.hypha}, ${WE_CYCLE.dikaryonPerNucleus} in each of two nuclei, ${WE_CYCLE.zygote} and ${WE_CYCLE.spores}`),
      n: 'In the dikaryon stage the two nuclei stay separate, so each is still haploid. Fusion at karyogamy doubles the number in a single nucleus. Meiosis halves it again, so every spore is haploid.',
    }),
    sl('concept', 'Four classes of fungi', {
      b: `Fungi are placed in four classes: ${FUNGI_CLASSES.join(', ')}.`,
      v: table(['Class', 'Features', 'Examples'], [['Phycomycetes', 'Aseptate, coenocytic mycelium; zoospores or aplanospores; zygospores', 'Mucor, Rhizopus, Albugo'], ['Ascomycetes (sac fungi)', 'Septate mycelium; conidia; ascospores in asci', 'Penicillium, Aspergillus, Neurospora; yeast is unicellular'], ['Basidiomycetes', 'Septate; no asexual spores; four basidiospores on a basidium', 'Agaricus, Ustilago, Puccinia'], ['Deuteromycetes', 'Imperfect fungi: only asexual stage known; conidia', 'Alternaria, Colletotrichum, Trichoderma']], 'Table of the four classes of fungi with features and examples'),
      n: 'Phycomycetes have tubes without cross walls. Ascomycetes make ascospores inside sacs called asci. Basidiomycetes make four basidiospores on a basidium and include mushrooms. Deuteromycetes are called imperfect because only their asexual stage is known.',
    }),
    sl('check', 'Quick check: basidiospores', {
      b: `A mushroom cap has ${BASIDIA.perCap} basidia, each carrying the usual number of basidiospores. How many basidiospores does it carry?`,
      n: 'Quick check. How many spores sit on one basidium?',
      chk: 'basidia-num',
    }),
    sl('diagram', 'Lichens: a living partnership', {
      b: 'A **lichen** is a **symbiotic association** of an **alga** (phycobiont) and a **fungus** (mycobiont). The alga prepares food by photosynthesis; the fungus provides shelter, absorbs water and minerals and protects the alga.',
      v: V.lichen,
      n: 'In a lichen the alga makes food by photosynthesis. The fungus gives shelter, takes up water and minerals, and protects the alga. Neither partner can easily live in the same habitat alone.',
    }),
    sl('concept', 'Lichens as pollution indicators', {
      b: 'Lichens are very sensitive to **air pollution** and do not grow in polluted areas, so they are **pollution indicators**.',
      v: table(['Observation', 'Meaning'], [['Rich growth of many lichens', 'Clean air'], ['Few or no lichens', 'Polluted air, for example in a busy city centre']], 'Table of lichen growth and air quality'),
      n: 'Lichens cannot tolerate polluted air. Where they grow richly, the air is clean. Where they are few or absent, pollution is likely, so lichens act as living pollution indicators.',
    }),
    sl('example', 'Worked example 2: a lichen survey', {
      b: `Lichen cover on tree trunks along a road out of a city is: ${LICHEN.map(([s, p]) => `${s} ${p} percent`).join(', ')}. How many times greater is the cover in the forest than in the city centre, and what does the trend show?`,
      ul: [
        r`$\dfrac{${LICHEN[3][1]}}{${LICHEN[0][1]}} = ${lichenRatio}$ times.`,
        'Cover rises steadily away from the city, as the air becomes cleaner.',
        'So lichens indicate the level of **air pollution**.',
      ],
      v: table(['Site', 'Lichen cover (percent)'], LICHEN.map(([s, p]) => [s, String(p)]), `Worked table of lichen cover rising from ${LICHEN[0][1]} to ${LICHEN[3][1]} percent away from the city`),
      n: 'Divide the forest value by the city centre value to find how many times greater it is. The cover rises as we move away from the city, which shows that the air gets cleaner. This is why lichens are pollution indicators.',
    }),
    sl('concept', 'Viruses: discovery and nature', {
      b: 'Viruses were not in the Whittaker scheme. They are **nucleoproteins**, **inert outside** a living cell, and **replicate only inside a host**.',
      v: table(['Year', 'Scientist', 'Finding'], [[String(YEAR.ivanowsky), 'D. J. Ivanowsky', 'Sap of diseased tobacco still infected plants after filtering out bacteria'], [String(YEAR.beijerinck), 'M. W. Beijerinck', 'Called the infectious fluid contagium vivum fluidum (a living infectious fluid)'], [String(YEAR.stanley), 'W. M. Stanley', 'Crystallised a virus; the crystals were largely protein']], 'Table of the discovery of viruses by Ivanowsky, Beijerinck and Stanley'),
      n: 'Ivanowsky found that sap of diseased tobacco plants stayed infectious after bacteria were filtered out. Beijerinck called it a living infectious fluid. Stanley crystallised the virus, showing that it could be inert and largely made of protein.',
    }),
    sl('diagram', 'Virus and viroid structure', {
      b: 'A virus has a **protein coat** (capsid, made of capsomeres) around its **genetic material**, DNA or RNA. Bacteriophages carry **double-stranded DNA**. A **viroid** is **free RNA** of low molecular weight without a protein coat.',
      v: V.virus,
      n: 'A virus particle is nucleic acid wrapped in a protein coat made of subunits called capsomeres. A bacteriophage has double stranded DNA, a head and a tail. A viroid is even simpler. It is only a short piece of free RNA with no coat.',
    }),
    sl('concept', 'Viruses and viroids compared', {
      b: `T. O. Diener discovered viroids in ${YEAR.diener}, causing potato spindle tuber disease.`,
      v: table(['Feature', 'Virus', 'Viroid'], [['Genetic material', 'DNA or RNA', 'Only RNA, of low molecular weight'], ['Protein coat', 'Present (capsid)', 'Absent'], ['Replication', 'Inside living host cells only', 'Inside host cells'], ['Examples of disease', 'Mumps, smallpox, herpes, influenza, AIDS; mosaic and leaf curl in plants', 'Potato spindle tuber disease']], 'Table comparing viruses and viroids'),
      n: 'Viruses have DNA or RNA inside a protein coat. Viroids are smaller, with only a short RNA and no protein coat. Viruses cause diseases such as mumps, influenza and AIDS, and viroids cause potato spindle tuber disease.',
    }),
    sl('check', 'Quick check: viroids', {
      b: 'Which statement correctly describes a viroid?',
      n: 'Quick check. What does a viroid lack that a virus has?',
      chk: 'viroid-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Fungi: chitin walls; hyphae and mycelium; saprophytes, parasites, symbionts.',
        'Reproduction: vegetative, asexual spores and sexual spores (plasmogamy, dikaryon, karyogamy, meiosis).',
        `Classes: ${FUNGI_CLASSES.join(', ')}.`,
        'Lichens: alga plus fungus; pollution indicators.',
        'Viruses: nucleoprotein, replicate only in a host; viroids: free RNA, no coat.',
        `Years: Ivanowsky ${YEAR.ivanowsky}, Beijerinck ${YEAR.beijerinck}, Stanley ${YEAR.stanley}, Diener ${YEAR.diener}.`,
      ],
      v: table(['Agent', 'Genetic material', 'Coat'], [['Virus', 'DNA or RNA', 'Protein'], ['Viroid', 'RNA only', 'None']], 'Summary table of viruses and viroids'),
      n: 'To recap: fungi are heterotrophic eukaryotes with chitin walls and thread like bodies. Lichens combine an alga and a fungus and indicate clean air. Viruses carry nucleic acid in a protein coat, and viroids are only free RNA.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name **hypha, mycelium, septate, coenocytic** correctly.',
        'Match each **class of fungi** with its spore and an example.',
        'Say what **each partner** gives in a lichen.',
        'Quote the **scientists and years** for viruses and viroids.',
      ],
      n: 'Exam tips. Use the terms hypha, mycelium, septate and coenocytic correctly. Link each class of fungi to its spores and an example. State what the alga and the fungus each supply in a lichen. And learn who discovered viruses and viroids.',
    }),
  ],
});
void K; void GAP; void PHAGE; void LEAVES;
