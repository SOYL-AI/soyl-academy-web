// ISC 11 Biology ch03 Protista, Fungi, Lichens and Viruses: question bank in ISC school-examination style. Counts, percentages,
// dates and the fungal class key are computed in calc.mjs. AR keys use the ISC Biology options: a b c d. No fungal life cycles.
import { mk, add, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { PHAGE_L } from './svgs.mjs';
import { POND, pct, STAGE, ASCI, ascospores, basidiospores, growth, YR, SIZE, classify, eq } from './calc.mjs';

const { mcq, ar, fill, tf, num, short, long, part, match } = mk;
const phageFig = svgV(PHAGE_L, 'A bacteriophage with five parts marked A to E');
const tbl = (head, body) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${body.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- t01 Protista
add('chrysophyte-mcq', mcq({
  stem: 'Thick layers of glassy powder dug from an old lake bed are the remains of microscopic algae that lived there. Which substance made the walls of these algae so durable?',
  right: 'Silica',
  wrong: ['Chitin', 'Cellulose only', 'Peptidoglycan'],
  sol: 'The walls of diatoms are impregnated with silica, which does not decay — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dino-mcq', mcq({
  stem: 'Which pair of features is correct for dinoflagellates?',
  right: 'Stiff cellulose plates in the wall and two flagella',
  wrong: ['A silica shell in two halves and no flagella', 'A flexible pellicle and a single flagellum', 'A creeping plasmodium and spores'],
  sol: 'Dinoflagellates have cellulose plates and two flagella — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('euglena-mcq', mcq({
  stem: 'A culture of Euglena is kept in complete darkness for several weeks in water rich in dissolved food and tiny organisms. It stays alive because it can',
  right: 'feed heterotrophically',
  wrong: ['photosynthesise in the dark', 'form a silica shell', 'form a plasmodium'],
  sol: 'Without light Euglena behaves as a heterotroph, feeding on small organisms — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('slime-mcq', mcq({
  stem: 'A multinucleate mass of cytoplasm creeps slowly over rotting logs, feeding on dead matter, and later forms stalked structures that release spores. This creeping mass is called a',
  right: 'plasmodium',
  wrong: ['mycelium', 'pellicle', 'pseudopodium'],
  sol: 'The feeding body of a slime mould is the plasmodium — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('loco-mcq', mcq({
  stem: 'A slide of pond water shows a slipper-shaped cell that glides smoothly by the coordinated beating of many short projections over its surface. It is a',
  right: 'ciliate',
  wrong: ['rhizopod', 'flagellate', 'sporozoan'],
  sol: 'Many short beating projections are cilia, so the cell is a ciliate — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('spor-mcq', mcq({
  stem: 'Which group of protozoans has no organ of locomotion?',
  right: 'Sporozoans',
  wrong: ['Rhizopods', 'Flagellates', 'Ciliates'],
  sol: 'Sporozoans, such as the malarial parasite, have no locomotory organ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('entamoeba-mcq', mcq({
  stem: 'Entamoeba, a parasite of the human intestine, belongs to the rhizopods. How does it move?',
  right: 'By pseudopodia',
  wrong: ['By cilia', 'By a flagellum', 'It does not move at all'],
  sol: 'Rhizopods move by pseudopodia — option (@K).',
  d: 1, c: 'application', t: [1],
}));
{
  const o = pct(POND.others, POND.total);
  add('others-num', num({
    stem: `A pond sample holds ${POND.total} protozoans: ${POND.flagellates} flagellates, ${POND.ciliates} ciliates, ${POND.rhizopods} rhizopods and the rest of other kinds. What percentage are of other kinds?`,
    value: o, tol: 0.05, unit: '%',
    sol: `Others = ${POND.total} − ${POND.flagellates} − ${POND.ciliates} − ${POND.rhizopods} = ${POND.others}; ${POND.others} / ${POND.total} × 100 = ${o} percent.`,
    scheme: [[`${o}%`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 15 || 'value');
}
{
  const c = pct(POND.ciliates, POND.total);
  add('pond-num', num({
    stem: `In a pond sample of ${POND.total} protozoans, ${POND.flagellates} are flagellates, ${POND.ciliates} are ciliates and ${POND.rhizopods} are rhizopods. What percentage of the protozoans are ciliates?`,
    value: c, tol: 0.05, unit: '%',
    sol: `${POND.ciliates} / ${POND.total} × 100 = ${c} percent.`,
    scheme: [[`${c}%`, 1]],
    d: 1, c: 'application', t: [1],
  }), (q) => q.answer.value === 25 || 'value');
}
add('loco-match', match({
  stem: 'Match each protozoan group in column I with its way of moving in column II.',
  pairs: [['Rhizopods', 'Pseudopodia'], ['Flagellates', 'Flagella'], ['Ciliates', 'Cilia'], ['Sporozoans', 'No locomotory organ']],
  order: [1, 3, 0, 2],
  marks: 2,
  sol: 'Rhizopods use pseudopodia, flagellates flagella, ciliates cilia, and sporozoans have no locomotory organ.',
  d: 1, c: 'recall', t: [1],
}));
add('chrys-ar', ar({
  a: 'Remains of diatom shells persist in sediments for thousands of years.',
  r: 'The walls of diatoms are impregnated with silica.',
  key: 'a',
  sol: 'Both are true, and R explains A: silica does not decay — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('spor-ar', ar({
  a: 'Plasmodium has no organ of locomotion in its infective stage.',
  r: 'Plasmodium is a free-living ciliate.',
  key: 'c',
  sol: 'A is true. R is false: Plasmodium is a parasitic sporozoan, not a ciliate — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('slime-ar', ar({
  a: 'Slime moulds are placed in kingdom Protista.',
  r: 'Slime moulds are saprophytes that move as a creeping plasmodium.',
  key: 'b',
  sol: 'Both are true, but R describes the habit of slime moulds and does not explain their placement in a kingdom of unicellular eukaryotes — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('giardia-ar', ar({
  a: 'Giardia moves by means of flagella.',
  r: 'Giardia is a flagellate.',
  key: 'a',
  sol: 'Both are true; being a flagellate is the reason it moves by flagella — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('analogy1-short', short({
  marks: 1,
  stem: 'Complete the analogy: Pseudopodia : Amoeba :: Cilia : ______',
  model: '**Paramecium**.',
  sol: 'Paramecium.',
  scheme: [['Paramecium', 1]],
  wl: [1, 10],
  d: 1, c: 'recall', t: [1],
}));
add('loco-short2', short({
  marks: 2,
  stem: 'Compare the locomotion of rhizopods and ciliates, giving one example of each.',
  model: '**Rhizopods** such as *Amoeba* move by **pseudopodia**, temporary extensions of the cell that flow forward. **Ciliates** such as *Paramecium* move by the coordinated beating of numerous short **cilia** covering the body.',
  sol: 'Pseudopodia; cilia.',
  scheme: [['Rhizopods with pseudopodia and an example', 1], ['Ciliates with cilia and an example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('chrys-short2', short({
  marks: 2,
  stem: 'Give two characteristics and two examples of chrysophytes.',
  model: 'Chrysophytes are **photosynthetic** and have cell walls in two overlapping halves **impregnated with silica**, which remain as **diatomaceous earth**. Examples are **diatoms** and **desmids**.',
  sol: 'Two characteristics; two examples.',
  scheme: [['Two characteristics', 1], ['Two examples', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('slime-short2', short({
  marks: 2,
  stem: 'Describe the body of a slime mould and say how it obtains its food.',
  model: 'The body is a creeping, multinucleate mass of cytoplasm called a **plasmodium**. It moves over decaying logs and leaves and feeds as a **saprophyte** on dead organic matter; under unfavourable conditions it forms spore-bearing fruiting bodies.',
  sol: 'Plasmodium; saprophytic.',
  scheme: [['Plasmodium described', 1], ['Saprophytic nutrition', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('protozoa-short3', short({
  marks: 3,
  stem: 'Give one characteristic and one example of each of three groups of protozoans.',
  model: '**Rhizopods** move by **pseudopodia** (*Amoeba*). **Flagellates** move by **flagella** and include parasites (*Trypanosoma*). **Ciliates** are covered with **cilia** (*Paramecium*). **Sporozoans** have **no locomotory organ** and an infective spore-like stage (*Plasmodium*).',
  sol: 'Three groups with a feature and an example.',
  scheme: [['First group', 1], ['Second group', 1], ['Third group', 1]],
  wl: [25, 90],
  d: 1, c: 'recall', t: [1],
}));
add('protist-short3', short({
  marks: 3,
  stem: 'Compare dinoflagellates and euglenoids with respect to the cell covering, the flagella and the mode of nutrition.',
  model: '**Dinoflagellates** have a wall of stiff **cellulose plates**, **two flagella** and are mostly photosynthetic. **Euglenoids** have no wall but a flexible protein-rich **pellicle**, **two flagella**, and are **photosynthetic in light** and **heterotrophic in the dark**.',
  sol: 'Cell covering; flagella; nutrition.',
  scheme: [['Cell covering', 1], ['Flagella', 1], ['Nutrition', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [1],
}));
add('protista-long', long({
  stem: '(a) Name the four groups of protozoans and state how each moves. [2]\n(b) State two features of euglenoids. [2]\n(c) Name the group of protists that cause red tides. [1]',
  model: '(a) **Rhizopods** (pseudopodia), **flagellates** (flagella), **ciliates** (cilia) and **sporozoans** (no locomotory organ).\n\n(b) Euglenoids have **no cell wall but a flexible pellicle**, **two flagella**, and are **photosynthetic in light and heterotrophic in the dark**.\n\n(c) The **dinoflagellates**.',
  sol: 'Four groups; two features; dinoflagellates.',
  scheme: [['(a) Four groups', 1], ['(a) Four ways of moving', 1], ['(b) Pellicle or no wall', 1], ['(b) Two flagella or nutrition', 1], ['(c) Dinoflagellates', 1]],
  wl: [25, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Fungi
add('chitin-mcq', mcq({
  stem: 'Which pair of features is true of the body of a typical fungus?',
  right: 'Hyphae with walls of chitin',
  wrong: ['Hyphae with walls of cellulose', 'A single cell with walls of silica', 'Tissues and organs with walls of peptidoglycan'],
  sol: 'Fungi are made of hyphae with chitin in the walls — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('hypha-mcq', mcq({
  stem: 'Under the microscope a fungal thread is seen as one continuous tube with many nuclei scattered in its cytoplasm and no cross walls. The hypha is',
  right: 'aseptate and coenocytic',
  wrong: ['septate with one nucleus per cell', 'septate with a pore in each wall', 'absent in all fungi'],
  sol: 'No cross walls and many nuclei describe an aseptate, coenocytic hypha — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gamete-mcq', mcq({
  stem: 'In a fungus, two gametes of different sizes fuse. This kind of sexual union is',
  right: 'anisogamy',
  wrong: ['isogamy', 'oogamy', 'plasmogamy'],
  sol: 'Fusion of gametes of unequal size is anisogamy — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('plasmo-mcq', mcq({
  stem: 'Two fungal hyphae of different mating types meet and their cytoplasm fuses, but the nuclei stay separate. This event is',
  right: 'plasmogamy',
  wrong: ['karyogamy', 'dikaryophase', 'oogamy'],
  sol: 'Fusion of the cytoplasm of two cells is plasmogamy — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('dikary-mcq', mcq({
  stem: 'A fungal cell is found to contain two genetically different haploid nuclei lying side by side. This stage is',
  right: 'the dikaryophase',
  wrong: ['karyogamy', 'plasmogamy', 'a diploid phase'],
  sol: 'Two separate haploid nuclei in one cell define the dikaryophase — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  const s = STAGE(7).dikaryophase.total;
  add('dikaryon-num', num({
    stem: 'Each haploid nucleus of a fungus has 7 chromosomes. How many chromosomes are present altogether in a dikaryotic cell?',
    value: s,
    sol: `A dikaryotic cell has 2 nuclei of 7 chromosomes each: 2 × 7 = ${s}.`,
    scheme: [[`${s}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 14 || 'value');
}
{
  const n = STAGE(6).karyogamy.chromosomes;
  add('karyo-num', num({
    stem: 'The haploid nuclei of two mating hyphae each have 6 chromosomes. How many chromosomes are in the single nucleus formed after karyogamy?',
    value: n,
    sol: `The two nuclei fuse: 6 + 6 = ${n} chromosomes (diploid).`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 12 || 'value');
}
{
  const n = growth(5, 90, 360);
  add('yeast-num', num({
    stem: 'A flask is seeded with 5 yeast cells. If the cells double every 90 minutes, how many cells are present after 6 hours?',
    value: n,
    sol: `360 / 90 = 4 generations: 5 × 2 to the power 4 = 5 × 16 = ${n}.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 80 || 'value');
}
add('karyo-fill', fill({
  stem: 'The fusion of the two haploid nuclei in the sexual reproduction of a fungus is called ______.',
  acc: [['karyogamy', 'Karyogamy']],
  sol: 'Karyogamy.',
  d: 1, c: 'recall', t: [2],
}));
add('hypha-tf', tf({
  stem: 'Aseptate hyphae are divided into compartments by cross walls.',
  key: 'f',
  sol: 'False. Septate hyphae have cross walls; aseptate hyphae have none and are coenocytic.',
  d: 1, c: 'recall', t: [2],
}));
add('dikaryon-ar', ar({
  a: 'In many fungi, karyogamy follows plasmogamy only after a delay.',
  r: 'Plasmogamy is the fusion of the cytoplasm of two cells.',
  key: 'b',
  sol: 'Both are true, but the meaning of plasmogamy does not explain why the nuclei fuse later — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('reason-short', short({
  marks: 1,
  stem: 'Give a reason: Fungi are not placed in the plant kingdom.',
  model: 'Fungi are **heterotrophic** and **absorb** their food, and their walls are made of **chitin** and not cellulose.',
  sol: 'Heterotrophic; chitin.',
  scheme: [['Heterotrophic with chitin walls', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('isogamy-short2', short({
  marks: 2,
  stem: 'Distinguish between isogamy, anisogamy and oogamy in one line each.',
  model: '**Isogamy:** fusion of two gametes alike in size and form. **Anisogamy:** fusion of two gametes of different size. **Oogamy:** fusion of a small motile male gamete with a large non-motile female gamete.',
  sol: 'Three one-line definitions.',
  scheme: [['Isogamy and anisogamy', 1], ['Oogamy', 1]],
  wl: [25, 60],
  d: 1, c: 'recall', t: [2],
}));
add('stages-short2', short({
  marks: 2,
  stem: 'Define the dikaryophase and state at what point in sexual reproduction it begins.',
  model: 'The **dikaryophase** is the stage in which a cell contains **two separate haploid nuclei**. It begins after **plasmogamy**, when the cytoplasm of two cells has fused, and ends when the nuclei fuse in **karyogamy**.',
  sol: 'Two nuclei in one cell; after plasmogamy.',
  scheme: [['Definition', 1], ['Begins after plasmogamy', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fungus-short3', short({
  marks: 3,
  stem: 'State three general characteristics of fungi and name the material of their cell wall.',
  model: 'Fungi are **heterotrophic**, absorbing food after digesting it with enzymes released outside the body. The body is made of threads called **hyphae** forming a **mycelium**, and food is stored as **glycogen and oil**. The cell wall is made of **chitin**.',
  sol: 'Three characteristics; chitin.',
  scheme: [['Heterotrophic and absorptive', 1], ['Hyphae and mycelium', 1], ['Chitin walls and storage food', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [2],
}));
add('fungi-long', long({
  stem: '(a) Name the two kinds of fungal hyphae and state how they differ. [2]\n(b) Define plasmogamy, dikaryophase and karyogamy. [2]\n(c) Name the four classes of fungi. [1]',
  model: '(a) **Aseptate (coenocytic)** hyphae have **no cross walls** and many nuclei in continuous cytoplasm; **septate** hyphae are divided by **cross walls** with pores into compartments.\n\n(b) **Plasmogamy:** fusion of the cytoplasm of two cells. **Dikaryophase:** a stage with **two separate haploid nuclei** in one cell. **Karyogamy:** fusion of the two nuclei into one diploid nucleus.\n\n(c) **Zygomycetes, Ascomycetes, Basidiomycetes and Deuteromycetes.**',
  sol: 'Two hyphae types; three definitions; four classes.',
  scheme: [['(a) Aseptate hyphae', 1], ['(a) Septate hyphae', 1], ['(b) Plasmogamy and dikaryophase', 1], ['(b) Karyogamy', 1], ['(c) Four classes', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 Classes, uses, lichens, mycorrhiza
add('pair-mcq', mcq({
  stem: 'Which pair correctly matches a fungus with its class?',
  right: 'Puccinia and Basidiomycetes',
  wrong: ['Mucor and Ascomycetes', 'Trichoderma and Zygomycetes', 'Neurospora and Deuteromycetes'],
  sol: 'Puccinia bears basidiospores and is a basidiomycete. Mucor is a zygomycete, Trichoderma a deuteromycete and Neurospora an ascomycete — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('class-mcq', mcq({
  stem: 'A mould has septate hyphae and produces its sexual spores in tiny sac-like structures called asci. To which class does it belong?',
  right: 'Ascomycetes',
  wrong: ['Zygomycetes', 'Basidiomycetes', 'Deuteromycetes'],
  sol: 'Spores formed inside asci mark the Ascomycetes — option (@K).',
  d: 2, c: 'application', t: [3],
}));
{
  const c = classify('Septate', 'Not known');
  add('deutero-mcq', mcq({
    stem: 'A soil fungus forms only conidia. After years of study no sexual stage has been seen. Which class is it placed in?',
    right: c,
    wrong: ['Zygomycetes', 'Ascomycetes', 'Basidiomycetes'],
    sol: `A fungus whose sexual stage is not known goes into ${c} — option (@K).`,
    d: 2, c: 'application', t: [3],
  }), () => c === 'Deuteromycetes' || 'class');
}
add('penicillin-mcq', mcq({
  stem: 'Which fungus is the source of the antibiotic penicillin?',
  right: 'Penicillium',
  wrong: ['Aspergillus', 'Mucor', 'Agaricus'],
  sol: 'Penicillin is obtained from species of Penicillium — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('lichen-mcq', mcq({
  stem: 'In a lichen, which statement correctly divides the work between the partners?',
  right: 'The alga makes food by photosynthesis and the fungus supplies shelter, water and minerals',
  wrong: ['The fungus makes food by photosynthesis and the alga absorbs minerals', 'Both partners make food by photosynthesis', 'Neither partner gains anything'],
  sol: 'The phycobiont photosynthesises and the mycobiont gives shelter, water and minerals — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('lichenind-mcq', mcq({
  stem: 'Lichens that once covered the walls of a town slowly disappear after a coal-burning power station is built nearby. Which pollutant is the most likely cause?',
  right: 'Sulphur dioxide',
  wrong: ['Carbon dioxide', 'Nitrogen', 'Water vapour'],
  sol: 'Lichens are very sensitive to sulphur dioxide — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ecto-mcq', mcq({
  stem: 'A fungal sheath covers the root tips of a pine seedling. Its hyphae lie between the cortical cells but do not enter them. This association is',
  right: 'ectomycorrhiza',
  wrong: ['endomycorrhiza', 'a lichen', 'a root nodule'],
  sol: 'A sheath outside the root with hyphae between the cells is ectomycorrhiza — option (@K).',
  d: 2, c: 'application', t: [3],
}));
{
  const n = ascospores + 30 * ASCI.perAscus;
  add('asci-num', num({
    stem: `A fruiting body of an ascomycete has ${ASCI.count + 30} asci, and each ascus holds ${ASCI.perAscus} ascospores. How many ascospores does it carry?`,
    value: n,
    sol: `${ASCI.count + 30} × ${ASCI.perAscus} = ${n}.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 1200 || 'value');
}
add('mycobiont-fill', fill({
  stem: 'The fungal partner of a lichen is called the ______.',
  acc: [['mycobiont', 'Mycobiont']],
  sol: 'Mycobiont.',
  d: 1, c: 'recall', t: [3],
}));
add('lichen-ar', ar({
  a: 'Lichens are used as indicators of air pollution.',
  r: 'Lichens are very sensitive to sulphur dioxide in the air.',
  key: 'a',
  sol: 'Both are true, and R explains A: lichens fail to grow where the air has sulphur dioxide — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('uses-short2', short({
  marks: 2,
  stem: 'Name the fungus used in (i) the making of an antibiotic and (ii) baking, and state the product in each case.',
  model: '(i) ***Penicillium*** produces the antibiotic **penicillin**. (ii) **Yeast** (*Saccharomyces*) ferments sugar and releases **carbon dioxide**, which makes the dough rise.',
  sol: 'Penicillium; yeast.',
  scheme: [['Penicillium and penicillin', 1], ['Yeast and carbon dioxide in dough', 1]],
  wl: [15, 50],
  d: 1, c: 'recall', t: [3],
}));
add('ecto-short2', short({
  marks: 2,
  stem: 'Distinguish between ectomycorrhiza and endomycorrhiza on the position of the fungal hyphae.',
  model: 'In **ectomycorrhiza** the fungus forms a **sheath around the root** and its hyphae lie **between** the cortical cells. In **endomycorrhiza** the hyphae **penetrate into** the cortical cells of the root.',
  sol: 'Sheath outside; hyphae inside cells.',
  scheme: [['Ectomycorrhiza', 1], ['Endomycorrhiza', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('lichen-short2', short({
  marks: 2,
  stem: 'Explain why lichens are rare in a heavily polluted town.',
  model: 'Lichens are **very sensitive to air pollutants**, especially **sulphur dioxide**, which damages the algal partner and stops growth. Their absence therefore shows polluted air, and their presence shows clean air.',
  sol: 'Sensitive to sulphur dioxide.',
  scheme: [['Sensitive to sulphur dioxide', 1], ['Indicator of pollution', 1]],
  d: 2, c: 'application', t: [3],
}));
add('class-short3', short({
  marks: 3,
  stem: 'Name the class of each of these fungi and the sexual spore it forms: (i) Rhizopus, (ii) Aspergillus, (iii) Ustilago.',
  model: `(i) *Rhizopus* is a **Zygomycete** and forms **zygospores**. (ii) *Aspergillus* is an **Ascomycete** and forms **ascospores** in asci. (iii) *Ustilago* is a **Basidiomycete** and forms **basidiospores** on a basidium. Characters: ${classify('Aseptate', 'Zygospore')}, ${classify('Septate', 'Ascospores')} and ${classify('Septate', 'Basidiospores')}.`,
  sol: 'Three classes and spores.',
  scheme: [['Rhizopus', 1], ['Aspergillus', 1], ['Ustilago', 1]],
  wl: [25, 90],
  d: 2, c: 'recall', t: [3],
}));
add('lichmyc-short3', short({
  marks: 3,
  stem: 'Explain the partnership in a lichen. State what each partner supplies and give the scientific terms for the two partners.',
  model: 'A lichen is a **symbiosis** of a fungus, the **mycobiont**, and an alga or cyanobacterium, the **phycobiont**. The **alga photosynthesises** and supplies food; the **fungus** gives **shelter, water and minerals** and protects the alga. Both partners gain.',
  sol: 'Symbiosis; two terms; contributions.',
  scheme: [['Partners and terms', 1], ['Alga supplies food', 1], ['Fungus supplies shelter, water and minerals', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [3],
}));
add('mycor-short3', short({
  marks: 3,
  stem: 'Describe the partnership called mycorrhiza and say how each partner benefits.',
  model: 'A **mycorrhiza** is an association between a **fungus and the roots** of a plant. The fungus absorbs **water and minerals**, especially phosphorus, from the soil and passes them to the plant; the plant supplies **sugars** to the fungus. Both partners gain, so it is a **symbiosis**.',
  sol: 'Association; fungus gives minerals; plant gives sugars.',
  scheme: [['Fungus with roots', 1], ['Fungus supplies water and minerals', 1], ['Plant supplies sugars', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [3],
}));
add('symb-long', long({
  stem: '(a) Name the two partners of a lichen and state what each contributes. [2]\n(b) Distinguish ectomycorrhiza from endomycorrhiza. [2]\n(c) Why are lichens used as pollution indicators? [1]',
  model: '(a) The **mycobiont (fungus)** gives shelter, water and minerals; the **phycobiont (alga or cyanobacterium)** makes food by photosynthesis.\n\n(b) In **ectomycorrhiza** the fungus forms a **sheath outside the root** and its hyphae lie between cortical cells; in **endomycorrhiza** the **hyphae enter** the cortical cells.\n\n(c) Lichens are **very sensitive to air pollution**, especially **sulphur dioxide**, so they disappear from polluted places.',
  sol: 'Partners; two types of mycorrhiza; indicator.',
  scheme: [['(a) Fungal partner and contribution', 1], ['(a) Algal partner and contribution', 1], ['(b) Ectomycorrhiza', 1], ['(b) Endomycorrhiza', 1], ['(c) Sensitive to sulphur dioxide', 1]],
  wl: [50, 200],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 Viruses, viroids and prions
add('link-mcq', mcq({
  stem: 'Why are viruses described as a link between living and non-living things?',
  right: 'They can be crystallised outside a host but multiply inside a host cell',
  wrong: ['They are cells with a nucleus but no cytoplasm', 'They make their own food but cannot move', 'They respire but never reproduce'],
  sol: 'Viruses are inert and crystallisable outside a host, yet multiply and mutate inside one — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('tmv-mcq', mcq({
  stem: 'The genetic material of tobacco mosaic virus is',
  right: 'a single strand of RNA',
  wrong: ['double-stranded DNA', 'a single strand of DNA', 'a protein'],
  sol: 'Tobacco mosaic virus has a helical coat around a single strand of RNA — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('fig-head-mcq', mcq({
  stem: 'The figure shows a bacteriophage with five parts marked A to E. Which letter marks the part that holds the double-stranded DNA?',
  right: 'A',
  wrong: ['B', 'C', 'E'],
  sol: 'The many-sided head, marked A, holds the DNA — option (@K).',
  d: 1, c: 'application', t: [4],
  assets: [phageFig],
}));
add('fig-sheath-mcq', mcq({
  stem: 'In the same figure, which letter marks the part that contracts to push the DNA into the bacterium?',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'The contractile sheath of the tail, marked C, drives the core into the host — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [phageFig],
}));
add('fig-fibre-mcq', mcq({
  stem: 'In the same figure, which letter marks the thin threads that first attach the phage to the surface of the bacterium?',
  right: 'E',
  wrong: ['B', 'C', 'D'],
  sol: 'The tail fibres, marked E, attach the phage to the host — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [phageFig],
}));
add('viroid-mcq', mcq({
  stem: 'What is the main structural difference between a viroid and a virus?',
  right: 'A viroid has no protein coat',
  wrong: ['A viroid has a double protein coat', 'A viroid contains only DNA', 'A viroid is larger than a virus'],
  sol: 'A viroid is a short free RNA with no protein coat — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('prion-mcq', mcq({
  stem: 'An infectious agent is isolated from the brain of a diseased animal. It survives treatments that destroy nucleic acids but is destroyed by protein-digesting enzymes. It is most likely a',
  right: 'prion',
  wrong: ['bacteriophage', 'viroid', 'bacterium'],
  sol: 'An infectious agent made only of protein is a prion — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('beijerinck-mcq', mcq({
  stem: 'Which scientist described the infectious fluid of tobacco mosaic disease as a contagium vivum fluidum?',
  right: 'M. W. Beijerinck',
  wrong: ['D. J. Ivanowsky', 'W. M. Stanley', 'T. O. Diener'],
  sol: 'Beijerinck used this phrase in 1898 — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
{
  const g = YR.diener - YR.ivanowsky;
  add('years-num', num({
    stem: 'Ivanowsky made his observation on tobacco mosaic disease in 1892, and Diener discovered viroids in 1971. How many years separate the two discoveries?',
    value: g,
    sol: `1971 − 1892 = ${g} years.`,
    scheme: [[`${g}`, 1]],
    d: 1, c: 'application', t: [4],
  }), (q) => q.answer.value === 79 || 'value');
}
{
  const g = YR.stanley - YR.beijerinck;
  add('gap-num', num({
    stem: 'Beijerinck named the infectious fluid in 1898, and Stanley crystallised a virus in 1935. How many years passed between these two events?',
    value: g,
    sol: `1935 − 1898 = ${g} years.`,
    scheme: [[`${g}`, 1]],
    d: 1, c: 'application', t: [4],
  }), (q) => q.answer.value === 37 || 'value');
}
add('prion-tf', tf({
  stem: 'A prion consists of DNA enclosed in a protein coat.',
  key: 'f',
  sol: 'False. A prion is an abnormally folded protein with no nucleic acid.',
  d: 1, c: 'recall', t: [4],
}));
add('virus-ar', ar({
  a: 'Viruses can multiply in a sterile nutrient broth without any living cells.',
  r: 'Viruses possess their own ribosomes for making proteins.',
  key: 'd',
  sol: 'Both are false: viruses multiply only inside a host cell and have no ribosomes of their own — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('prion-ar', ar({
  a: 'Prions cause bovine spongiform encephalopathy in cattle.',
  r: 'Prions contain RNA enclosed in a protein coat.',
  key: 'c',
  sol: 'A is true. R is false: a prion is protein only — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('analogy2-short', short({
  marks: 1,
  stem: 'Complete the analogy: Bacteriophage : double-stranded DNA :: Tobacco mosaic virus : ______',
  model: '**Single-stranded RNA**.',
  sol: 'RNA.',
  scheme: [['RNA', 1]],
  wl: [1, 12],
  d: 1, c: 'recall', t: [4],
}));
add('reason2-short', short({
  marks: 1,
  stem: 'Give a reason: Viruses are called obligate parasites.',
  model: 'Viruses have **no metabolic machinery of their own** and can multiply **only inside a living host cell**.',
  sol: 'Multiply only in host cells.',
  scheme: [['Can multiply only inside a host cell', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('virus-short2', short({
  marks: 2,
  stem: 'State two reasons for regarding viruses as a link between the living and the non-living.',
  model: 'Outside a host a virus is **inert and can be crystallised**, like a non-living chemical. Inside a living cell it **multiplies and mutates**, using the host machinery, like a living organism.',
  sol: 'Crystallised outside; multiply inside.',
  scheme: [['Non-living feature', 1], ['Living feature', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('prion-short2', short({
  marks: 2,
  stem: 'Distinguish a viroid from a prion on the basis of composition, and name a disease of cattle caused by one of them.',
  model: 'A **viroid** is a short piece of **free RNA** with no protein coat. A **prion** is an **abnormally folded protein** with no nucleic acid. Prions cause **bovine spongiform encephalopathy (BSE)** in cattle.',
  sol: 'RNA only; protein only; BSE.',
  scheme: [['Viroid and prion composition', 1], ['BSE', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('tmv-short3', short({
  marks: 3,
  stem: 'Describe the structure of tobacco mosaic virus, naming its coat, the units that build the coat and its genetic material.',
  model: 'Tobacco mosaic virus is a **helical rod**. Its protein coat, the **capsid**, is built of many identical subunits called **capsomeres** wound in a helix. Inside it runs a **single strand of RNA**, the genetic material.',
  sol: 'Rod; capsid and capsomeres; RNA.',
  scheme: [['Helical rod', 1], ['Capsid of capsomeres', 1], ['Single-stranded RNA', 1]],
  wl: [25, 90],
  d: 2, c: 'recall', t: [4],
}));
add('phage-short3', short({
  marks: 3,
  stem: 'Name five parts of a bacteriophage and state the function of any two of them.',
  model: 'The parts are the **head** with double-stranded DNA, the **collar**, the **tail sheath and core**, the **base plate** and the **tail fibres**. The **tail fibres** attach the phage to a bacterium, and the **contractile sheath** pushes the core through the bacterial wall so that the DNA is injected.',
  sol: 'Five parts; two functions.',
  scheme: [['Five parts', 1], ['One function', 1], ['Second function', 1]],
  wl: [25, 90],
  d: 2, c: 'recall', t: [4],
}));
add('history-short3', short({
  marks: 3,
  stem: 'State the contribution of Ivanowsky, of Beijerinck and of Stanley to the study of viruses.',
  model: `**Ivanowsky** (${YR.ivanowsky}) showed that sap of diseased tobacco still infected healthy plants after passing a bacteria-stopping filter. **Beijerinck** (${YR.beijerinck}) called the agent a **contagium vivum fluidum**. **Stanley** (${YR.stanley}) **crystallised** the virus and showed it to be mainly protein and RNA.`,
  sol: 'Three contributions.',
  scheme: [['Ivanowsky', 1], ['Beijerinck', 1], ['Stanley', 1]],
  wl: [25, 90],
  d: 2, c: 'recall', t: [4],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare a virus, a viroid and a prion in terms of what each contains. Give one example of a disease or host for each.',
  model: 'A **virus** has **nucleic acid (DNA or RNA) in a protein coat**, as in tobacco mosaic virus or a bacteriophage. A **viroid** is **free RNA with no coat**, as in potato spindle tuber disease. A **prion** is an **abnormally folded protein** with no nucleic acid, as in BSE of cattle.',
  sol: 'Three agents compared.',
  scheme: [['Virus', 1], ['Viroid', 1], ['Prion', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [4],
}));
add('unknown-short3', short({
  marks: 3,
  stem: 'A diseased sheep’s brain yields an infectious extract. Treatment with an enzyme that destroys DNA and RNA does not reduce infectivity, but an enzyme that digests protein does. What kind of agent is it? Explain why it is neither a virus nor a viroid.',
  model: 'It is a **prion**. Its infectivity survives **nucleic-acid-digesting enzymes** but not **protein-digesting enzymes**, so it is made of **protein only**. A **virus** contains DNA or RNA in a protein coat and a **viroid** is free RNA; since this agent has **no nucleic acid**, it can be neither.',
  sol: 'Prion; no nucleic acid.',
  scheme: [['Identified as a prion', 1], ['Evidence from the enzymes', 1], ['Why not a virus or a viroid', 1]],
  wl: [25, 90],
  d: 4, c: 'evaluation', t: [4],
}));
add('virus-long', long({
  stem: '(a) Draw a labelled diagram of tobacco mosaic virus. [2]\n(b) Name five parts of a bacteriophage. [2]\n(c) State the contribution of W. M. Stanley to the study of viruses. [1]',
  model: '(a) A straight **helical rod** with the **capsid** built of **capsomeres** and the single-stranded **RNA** inside, labelled.\n\n(b) **Head, collar, tail sheath, base plate and tail fibres** (the head contains double-stranded DNA).\n\n(c) **Stanley** crystallised the virus in 1935 and showed that it is mainly protein with RNA.',
  sol: 'TMV diagram; five phage parts; Stanley.',
  scheme: [['(a) Rod with capsid and capsomeres', 1], ['(a) RNA labelled', 1], ['(b) Any three parts', 1], ['(b) Remaining two parts', 1], ['(c) Crystallised the virus', 1]],
  wl: [30, 200],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const rows = [['Amoeba-like cells', 18], ['Flagellated cells', 30], ['Ciliated cells', 24], ['Other kinds', 8]];
  const total = rows.reduce((s, r) => s + r[1], 0);
  const p = pct(24, total);
  eq([total, p], [80, 30], 'protozoa case');
  add('protozoa-case', mk.case({
    passage: `A student counts the protozoans in a drop of hay-infusion culture.\n\n${tbl(['Type of cell', 'Number'], rows.map((r) => [r[0], String(r[1])]))}`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'What percentage of the protozoans counted are ciliated?',
        value: p, tol: 0.05, unit: '%',
        sol: `Total = ${total}; 24 / ${total} × 100 = ${p} percent.`,
        scheme: [[`${p}%`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('b', mcq({
        stem: 'How do the amoeba-like cells move?',
        right: 'By pseudopodia',
        wrong: ['By cilia', 'By flagella', 'They have no way of moving'],
        sol: 'Amoeboid cells are rhizopods and move by pseudopodia — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the organ of locomotion of the ciliated cells and the genus of a common example.',
        model: 'The ciliated cells move by **cilia**, short hair-like structures that beat together. A common example is ***Paramecium***.',
        sol: 'Cilia; Paramecium.',
        scheme: [['Cilia', 1], ['Paramecium', 1]],
        wl: [8, 40],
        d: 1, c: 'recall', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Name the organ of locomotion of the flagellated cells and give one parasitic example of this group.',
          model: 'The flagellated cells move by **flagella**, long whip-like structures. A parasitic example is ***Trypanosoma***.',
          sol: 'Flagella; Trypanosoma.',
          scheme: [['Flagella', 1], ['Trypanosoma or Giardia', 1]],
          wl: [8, 40],
          d: 1, c: 'recall', t: [1],
        }),
      ]),
    ],
  }));
}
add('agents-case', mk.case({
  passage: `A laboratory studies three infectious agents.\n\n${tbl(['Agent', 'Findings'], [['W', 'DNA enclosed in a protein coat; infects bacteria'], ['X', 'Protein only; no nucleic acid; found in diseased brain tissue'], ['Y', 'Short free RNA with no protein coat; found in diseased coconut palms']])}`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which agent is a prion?',
      right: 'X',
      wrong: ['W', 'Y', 'None of them'],
      sol: 'Protein only with no nucleic acid defines a prion — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', mcq({
      stem: 'What is agent W most likely to be?',
      right: 'A bacteriophage',
      wrong: ['A viroid', 'A prion', 'A fungal spore'],
      sol: 'A virus that infects bacteria is a bacteriophage — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'What is agent Y, and why is it not a virus?',
      model: 'Agent Y is a **viroid**. It consists only of **free RNA with no protein coat**, whereas a virus has nucleic acid enclosed in a protein coat.',
      sol: 'Viroid; no coat.',
      scheme: [['Viroid', 1], ['No protein coat', 1]],
      d: 2, c: 'understanding', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Why does a treatment that destroys all nucleic acids fail to make agent X harmless?',
        model: 'Agent X contains **no nucleic acid**; it is an **abnormally folded protein**, so a treatment that destroys DNA and RNA has **no target** in it.',
        sol: 'No nucleic acid; protein only.',
        scheme: [['No nucleic acid in X', 1], ['It is a protein', 1]],
        d: 3, c: 'analysis', t: [4],
      }),
    ]),
  ],
}));

// ---------------------------------------------------------------- extra application items
add('dough-mcq', mcq({
  stem: 'A baker finds that dough made with old, dead yeast does not rise. Which product of living yeast is missing from the dough?',
  right: 'Carbon dioxide from fermentation of sugar',
  wrong: ['Oxygen from photosynthesis', 'Nitrogen from the air', 'Penicillin from the mould'],
  sol: 'Living yeast ferments sugar and releases carbon dioxide, which makes the dough rise — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('phage-inject-mcq', mcq({
  stem: 'A bacteriophage attaches to a bacterium by its tail fibres and its sheath contracts. What enters the bacterial cell?',
  right: 'The DNA of the phage, while most of the coat stays outside',
  wrong: ['The whole phage including its tail', 'Only the tail fibres', 'The protein coat only'],
  sol: 'The phage injects its DNA and leaves the empty coat outside — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('euglenoid-key-mcq', mcq({
  stem: 'A pond cell has two flagella, no cell wall, a flexible protein-rich covering and green chloroplasts. It is most likely a',
  right: 'euglenoid',
  wrong: ['dinoflagellate', 'diatom', 'slime mould'],
  sol: 'A pellicle in place of a wall with two flagella and chloroplasts marks a euglenoid — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pine-mcq', mcq({
  stem: 'Pine seedlings planted in sterilised soil, free of the fungi normally found around pine roots, grow poorly even though the soil has minerals. The best explanation is that',
  right: 'the mycorrhizal fungus that helps the roots absorb minerals is missing',
  wrong: ['the fungus normally makes food for the seedling by photosynthesis', 'the seedling needs the fungus to fix atmospheric nitrogen in nodules', 'fungi always harm the roots of pines'],
  sol: 'The mycorrhizal fungus normally helps absorption of water and minerals; without it growth is poor — option (@K).',
  d: 3, c: 'application', t: [3],
}));

{
  const n = 3000 / SIZE.tmvLength;
  add('tmv-num', num({
    stem: 'A tobacco mosaic virus particle is 300 nanometres long. How many such particles placed end to end would span 3 micrometres?',
    value: n,
    sol: `3 micrometres = 3000 nanometres; 3000 / 300 = ${n} particles.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 10 || 'value');
}
{
  const n = basidiospores(60);
  add('basidia-num', num({
    stem: 'A small mushroom cap bears 60 basidia, and each basidium carries its usual number of basidiospores. How many basidiospores does the cap carry?',
    value: n,
    sol: `A basidium bears 4 basidiospores: 60 × 4 = ${n}.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 240 || 'value');
}
add('endo-mcq', mcq({
  stem: 'Under the microscope, fungal hyphae are seen entering the cortical cells of the root of a herb and branching inside them. This association is',
  right: 'endomycorrhiza',
  wrong: ['ectomycorrhiza', 'a lichen', 'a root nodule'],
  sol: 'Hyphae that penetrate the cortical cells make an endomycorrhiza — option (@K).',
  d: 2, c: 'application', t: [3],
}));
void match;
