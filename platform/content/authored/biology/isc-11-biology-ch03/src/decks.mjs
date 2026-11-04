// ISC 11 Biology ch03 Protista, Fungi, Lichens and Viruses. Part 1 (t01-t02) protists and the fungal body and sexual stages;
// Part 2 (t03-t04) fungal classes, uses, lichens, mycorrhiza, viruses, viroids and prions. No fungal life cycles (removed topic).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { LOCO, HYPHAE, LICHEN, TMV, PHAGE } from './svgs.mjs';
import { PROTOZOA, POND, pct, STAGE, CLASSES, classify, YR, ASCI, ascospores } from './calc.mjs';

export const V = {
  loco: svgV(LOCO, 'Amoeba, a flagellate and Paramecium with their organs of locomotion'),
  hyphae: svgV(HYPHAE, 'Coenocytic and septate fungal hyphae'),
  lichen: svgV(LICHEN, 'Vertical section of a lichen thallus'),
  tmv: svgV(TMV, 'Structure of tobacco mosaic virus'),
  phage: svgV(PHAGE, 'Structure of a bacteriophage'),
};

const FL = pct(POND.flagellates, POND.total);
const CI = pct(POND.ciliates, POND.total);
const RH = pct(POND.rhizopods, POND.total);
const OT = pct(POND.others, POND.total);
const ST = STAGE(4);
const GAP1 = YR.beijerinck - YR.ivanowsky;
const GAP2 = YR.stanley - YR.beijerinck;
const GAP3 = YR.diener - YR.stanley;

export const deck1 = deck({
  part: 1,
  title: 'Protista, Fungi, Lichens and Viruses — Part 1: Protists and the fungal body',
  goals: [
    'Give two characteristics and two examples of each protist group and compare locomotion in rhizopods, flagellates and ciliates',
    'State the general characteristics of fungi and define plasmogamy, karyogamy and dikaryophase',
  ],
  slides: [
    sl('title', 'Protists and fungi', {
      b: 'Part 1: single-celled eukaryotes, then the fungi and how their cells combine.',
      v: flow('LR', [['p', 'Kingdom Protista'], ['f', 'Kingdom Fungi'], ['s', 'Sexual stages of fungi']], [['p', 'f'], ['f', 's']], 'Flow from protists to fungi to sexual stages'),
      n: 'This part looks at two kingdoms of eukaryotes. First the protists, mostly single-celled organisms that live in water. Then the fungi, with their threads called hyphae, and the stages by which fungal cells combine in sexual reproduction.',
    }),
    sl('concept', 'Kingdom Protista', {
      b: 'Protists are unicellular eukaryotes, mostly aquatic, and form a link between the prokaryotes and the other eukaryotic kingdoms.',
      v: table(['Group', 'Characteristics', 'Examples'], [['Chrysophytes', 'Diatoms and golden algae; silica shells that persist as diatomaceous earth; photosynthetic', 'Diatoms, desmids'], ['Dinoflagellates', 'Cell wall with cellulose plates; two flagella; some cause red tides', 'Gonyaulax'], ['Euglenoids', 'No cell wall but a flexible pellicle; two flagella; photosynthetic in light, feed on organisms in the dark', 'Euglena'], ['Slime moulds', 'Saprophytes that form a creeping mass, the plasmodium, and spore-bearing fruiting bodies', 'Physarum']], 'Table of four protist groups with characteristics and examples'),
      n: 'Chrysophytes have glassy shells of silica. Dinoflagellates have plates of cellulose and two flagella. Euglenoids have a flexible pellicle and can both photosynthesise and feed. Slime moulds creep over decaying matter and form spores.',
    }),
    sl('concept', 'Protozoans and how they move', {
      b: 'Protozoans are animal-like protists, grouped by their way of moving.',
      v: table(['Group', 'Locomotion', 'Examples'], PROTOZOA.map((x) => [x.g, x.move, x.eg]), 'Table of four groups of protozoans with locomotion and examples'),
      n: 'Rhizopods creep with pseudopodia, which are temporary false feet. Flagellates swim with one or more flagella. Ciliates are covered with cilia. Sporozoans, such as the malarial parasite, have no organ of movement and form infective spore-like stages.',
    }),
    sl('diagram', 'Pseudopodia, flagella and cilia', {
      b: 'Compare the three kinds of locomotory organ.',
      v: V.loco,
      n: 'The amoeba pushes out blunt pseudopodia and flows into them. The flagellate beats a long whip-like flagellum. The ciliate, Paramecium, is covered with many short cilia that beat together like oars.',
    }),
    sl('example', 'Worked example 1: a pond sample', {
      b: `A drop of pond water holds ${POND.total} protozoans: ${POND.flagellates} flagellates, ${POND.ciliates} ciliates, ${POND.rhizopods} rhizopods and the rest of other kinds. Find the percentage of each group.`,
      ul: [
        `Others = ${POND.total} − ${POND.flagellates} − ${POND.ciliates} − ${POND.rhizopods} = **${POND.others}**.`,
        `Flagellates = ${POND.flagellates} ÷ ${POND.total} × 100 = **${FL} percent**; ciliates = **${CI} percent**.`,
        `Rhizopods = **${RH} percent**; others = **${OT} percent**.`,
      ],
      v: table(['Group', 'Number', 'Percentage'], [['Flagellates', String(POND.flagellates), String(FL)], ['Ciliates', String(POND.ciliates), String(CI)], ['Rhizopods', String(POND.rhizopods), String(RH)], ['Others', String(POND.others), String(OT)]], 'Worked table of the percentage of each protozoan group in the sample'),
      n: 'First find the number left over, thirty, by subtraction. Then divide each group by two hundred and multiply by one hundred. Flagellates make forty percent, ciliates twenty-five percent, rhizopods twenty percent and the others fifteen percent.',
    }),
    sl('check', 'Quick check: reading the sample', {
      b: 'Use the same sample. What percentage of the protozoans are ciliates?',
      n: 'Quick check. Divide the number of ciliates by the total.',
      chk: 'pond-num',
    }),
    sl('concept', 'Kingdom Fungi', {
      b: 'Fungi are heterotrophic eukaryotes that absorb food; most are multicellular filaments.',
      v: table(['Feature', 'Detail'], [['Body', 'A network of threads called hyphae, forming a mycelium; yeast is unicellular'], ['Cell wall', 'Chitin'], ['Nutrition', 'Saprophytic, parasitic or symbiotic; digestive enzymes are released and the food is absorbed'], ['Storage food', 'Glycogen and oil'], ['Reproduction', 'Vegetative (fragmentation, budding), asexual spores and sexual spores']], 'Table of general characteristics of fungi'),
      n: 'A fungus is a mass of hyphae. Its walls contain chitin. It releases enzymes onto dead matter or a living host and absorbs the digested food. It stores glycogen and oil and multiplies by fragments, buds and spores.',
    }),
    sl('diagram', 'Kinds of hyphae', {
      b: 'Hyphae may be **aseptate and coenocytic** (no cross walls, many nuclei) or **septate** (with cross walls).',
      v: V.hyphae,
      n: 'In a coenocytic hypha the cytoplasm is one continuous tube with many nuclei. In a septate hypha, cross walls with small pores divide the thread into compartments, each with one or two nuclei.',
    }),
    sl('concept', 'Spores and kinds of sexual union', {
      b: 'Fungi make **asexual spores** (sporangiospores, conidia) and **sexual spores** (zygospores, ascospores, basidiospores). Sexual union is classified by the gametes.',
      v: table(['Term', 'Meaning'], [['Isogamy', 'Fusion of two gametes alike in size and form'], ['Anisogamy', 'Fusion of two gametes of different size'], ['Oogamy', 'Fusion of a small motile male gamete with a large non-motile female gamete']], 'Table of isogamy, anisogamy and oogamy'),
      n: 'If the two gametes look alike, the union is isogamy. If they differ in size, it is anisogamy. In oogamy a small motile male gamete fuses with a large stationary egg.',
    }),
    sl('concept', 'Plasmogamy, dikaryophase and karyogamy', {
      b: 'Fusion of fungal cells takes place in two steps, with a pause between them.',
      v: flow('LR', [['a', 'Hyphae of two mating types meet'], ['b', 'Plasmogamy: cytoplasm fuses'], ['c', 'Dikaryophase: two separate haploid nuclei in one cell'], ['d', 'Karyogamy: the two nuclei fuse']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of plasmogamy, dikaryophase and karyogamy'),
      n: 'Plasmogamy is the fusion of cytoplasm of two cells. The nuclei do not fuse at once. The cell holds two separate nuclei in a stage called the dikaryophase. Karyogamy is the later fusion of the two nuclei into one.',
    }),
    sl('example', 'Worked example 2: counting nuclei and chromosomes', {
      b: 'Each haploid nucleus of a fungus has 4 chromosomes. Follow the numbers through the stages.',
      ul: [
        `After plasmogamy: **${ST.plasmogamy.nuclei}** nuclei with ${ST.plasmogamy.chromosomesEach} chromosomes each, so **${ST.plasmogamy.total}** chromosomes in the cell.`,
        `In the dikaryophase the count stays at **${ST.dikaryophase.total}** chromosomes in two nuclei.`,
        `After karyogamy: **${ST.karyogamy.nuclei}** nucleus holding **${ST.karyogamy.chromosomes}** chromosomes (diploid).`,
      ],
      v: table(['Stage', 'Nuclei', 'Chromosomes in all'], [['After plasmogamy', String(ST.plasmogamy.nuclei), String(ST.plasmogamy.total)], ['Dikaryophase', String(ST.dikaryophase.nuclei), String(ST.dikaryophase.total)], ['After karyogamy', String(ST.karyogamy.nuclei), String(ST.karyogamy.chromosomes)]], 'Worked table of nuclei and chromosomes in the three stages'),
      n: 'Plasmogamy brings two haploid nuclei into one cell, so there are eight chromosomes in two nuclei. They stay that way through the dikaryophase. Karyogamy then fuses them into one diploid nucleus with eight chromosomes.',
    }),
    sl('check', 'Quick check: dikaryotic cell', {
      b: 'Each haploid nucleus has 7 chromosomes. How many chromosomes are present altogether in a dikaryotic cell?',
      n: 'Quick check. Count the nuclei and the chromosomes in each.',
      chk: 'dikaryon-num',
    }),
    sl('check', 'Quick check: locomotion', {
      b: 'Match each protozoan group with its way of moving.',
      n: 'Quick check. Think of the name of each locomotory organ.',
      chk: 'loco-match',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Protista: chrysophytes, dinoflagellates, euglenoids, slime moulds and protozoans.',
        'Protozoans: rhizopods (pseudopodia), flagellates (flagella), ciliates (cilia), sporozoans (none).',
        'Fungi: hyphae and mycelium, chitin wall, absorptive nutrition; hyphae aseptate or septate.',
        'Gametes: isogamy, anisogamy, oogamy; plasmogamy, dikaryophase, karyogamy.',
      ],
      v: table(['Group', 'Locomotion'], PROTOZOA.map((x) => [x.g, x.move]), 'Summary table of protozoan locomotion'),
      n: 'To recap: protists include four algal and mould groups and four protozoan groups sorted by their organs of movement. Fungi are absorptive, with chitin walls and hyphae. Their sexual union passes through plasmogamy, the dikaryophase and karyogamy.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Link each protozoan group with its **organ of locomotion** and an **example**.',
        'Define **plasmogamy** (cytoplasm fuses), **karyogamy** (nuclei fuse) and **dikaryophase** (two nuclei in one cell).',
        'Do not describe fungal life cycles; **definitions** are enough.',
        'Name the **chitin** wall when listing fungal features.',
      ],
      n: 'Exam tips. Pair every protozoan group with its organ of movement. Define the three stages of fungal union precisely. Do not describe life cycles. And mention chitin when listing fungal features.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Protista, Fungi, Lichens and Viruses — Part 2: Fungal classes, lichens, viruses, viroids and prions',
  goals: [
    'Classify a fungus into its class from given characters and state the uses of fungi',
    'Distinguish ectomycorrhiza from endomycorrhiza and explain the partnership in a lichen',
    'Draw and label TMV and a bacteriophage and distinguish viruses, viroids and prions',
  ],
  slides: [
    sl('title', 'Classes, partnerships and viruses', {
      b: 'Part 2: the four fungal classes, living partnerships, and agents that are not cells.',
      v: flow('LR', [['c', 'Four fungal classes'], ['l', 'Lichens and mycorrhiza'], ['v', 'Viruses, viroids and prions']], [['c', 'l'], ['l', 'v']], 'Flow from fungal classes to partnerships to viruses'),
      n: 'This part covers the four classes of fungi, two partnerships in which fungi live with other organisms, and finally viruses, viroids and prions, which are infectious agents that are not true cells.',
    }),
    sl('concept', 'Four classes of fungi', {
      b: 'Fungi are placed in classes by their hyphae and sexual spores.',
      v: table(['Class', 'Hyphae', 'Sexual spore', 'Asexual spore', 'Examples'], CLASSES.map((x) => [x.c, x.hyphae, x.sexual, x.asexual, x.eg]), 'Table of the four classes of fungi'),
      n: 'Zygomycetes have aseptate hyphae and form zygospores. Ascomycetes make ascospores inside sacs called asci. Basidiomycetes make basidiospores on a club-shaped basidium. Deuteromycetes are those in which no sexual stage is known.',
    }),
    sl('example', 'Worked example 1: which class?', {
      b: 'Place three moulds in their classes from the characters seen under the microscope.',
      ul: [
        `Mould P: aseptate hyphae, zygospores: **${classify('Aseptate', 'Zygospore')}**.`,
        `Mould Q: septate hyphae, spores in sac-like asci: **${classify('Septate', 'Ascospores')}**.`,
        `Mould R: septate hyphae, only conidia, no sexual stage known: **${classify('Septate', 'Not known')}**.`,
      ],
      v: table(['Mould', 'Characters', 'Class'], [['P', 'Aseptate hyphae; zygospores', classify('Aseptate', 'Zygospore')], ['Q', 'Septate hyphae; ascospores in asci', classify('Septate', 'Ascospores')], ['R', 'Septate hyphae; no sexual stage known', classify('Septate', 'Not known')]], 'Worked table placing three moulds in classes'),
      n: 'Look at the hyphae first. Aseptate hyphae with zygospores mean Zygomycetes. Septate hyphae with spores in asci mean Ascomycetes. If no sexual stage has ever been seen, the fungus goes into Deuteromycetes.',
    }),
    sl('check', 'Quick check: ascospores', {
      b: `A fruiting body has ${ASCI.count + 30} asci, each with ${ASCI.perAscus} ascospores. How many ascospores does it carry?`,
      n: 'Quick check. Multiply the number of asci by the spores in each.',
      chk: 'asci-num',
    }),
    sl('concept', 'Fungi in medicine, bakery and decomposition', {
      b: 'Fungi are useful in several ways.',
      v: table(['Area', 'Fungus', 'Role'], [['Medicine', 'Penicillium', 'Source of the antibiotic penicillin'], ['Bakery', 'Yeast (Saccharomyces)', 'Ferments sugar to carbon dioxide, which makes dough rise'], ['Decomposition', 'Saprophytic moulds and mushrooms', 'Break down dead matter and return minerals to the soil']], 'Table of uses of fungi'),
      n: 'Penicillium gives penicillin. Yeast ferments sugar, and the carbon dioxide it releases makes dough rise. Saprophytic fungi decompose dead matter and return minerals to the soil.',
    }),
    sl('diagram', 'A lichen', {
      b: 'A lichen is a **symbiosis** of a fungus (**mycobiont**) and an alga or cyanobacterium (**phycobiont**).',
      v: V.lichen,
      n: 'The fungus gives shelter, water and minerals, and the alga makes food by photosynthesis. Lichens grow very slowly and are sensitive to air pollution, especially sulphur dioxide, so they serve as pollution indicators.',
    }),
    sl('concept', 'Mycorrhiza', {
      b: 'A mycorrhiza is a partnership between a fungus and the roots of a plant.',
      v: table(['Type', 'Where the fungus lives', 'Example'], [['Ectomycorrhiza', 'Forms a sheath around the root; hyphae spread between the cells of the cortex, not inside them', 'Pine (Pinus)'], ['Endomycorrhiza', 'Hyphae penetrate into the root cortical cells', 'Many herbs and crops']], 'Table distinguishing ectomycorrhiza from endomycorrhiza'),
      n: 'In both kinds the fungus absorbs water and minerals, especially phosphorus, for the plant, and the plant supplies sugars. In ectomycorrhiza the fungus makes a sheath outside the root. In endomycorrhiza its hyphae enter the root cells.',
    }),
    sl('check', 'Quick check: lichens', {
      b: 'Judge the assertion and the reason about lichens.',
      n: 'Quick check. Which partner makes the food?',
      chk: 'lichen-ar',
    }),
    sl('concept', 'Viruses: between living and non-living', {
      b: 'Viruses show features of both living and non-living things.',
      v: table(['Non-living features', 'Living features'], [['Can be crystallised', 'Contain genetic material (DNA or RNA)'], ['Not cells; no metabolism of their own', 'Multiply and mutate inside a host cell'], ['Inert outside a host', 'Infect and cause disease']], 'Table of living and non-living features of viruses'),
      n: 'Outside a host a virus is an inert particle that can even be crystallised. Inside a living cell it uses the host machinery to multiply and can mutate. This is why viruses are called a link between the living and the non-living.',
    }),
    sl('diagram', 'Tobacco mosaic virus', {
      b: 'TMV has a helical capsid of capsomeres surrounding a single strand of RNA.',
      v: V.tmv,
      n: 'The rod has a protein coat made of many identical subunits called capsomeres wound in a helix. Inside the coat runs a single strand of ribonucleic acid, which is the genetic material.',
    }),
    sl('diagram', 'A bacteriophage', {
      b: 'A bacteriophage infects bacteria. Its head holds double-stranded DNA.',
      v: V.phage,
      n: 'The phage has a many-sided head with DNA inside, a collar, a tail with a contractile sheath, a base plate and tail fibres. The fibres attach to the bacterium and the DNA is injected through the tail.',
    }),
    sl('example', 'Worked example 2: a timeline of discovery', {
      b: 'Ivanowsky, Beijerinck, Stanley and Diener made key discoveries. How many years separate them?',
      ul: [
        `Ivanowsky ${YR.ivanowsky}: sap of diseased tobacco still infected after passing a bacterial filter.`,
        `Beijerinck ${YR.beijerinck}: named the agent contagium vivum fluidum, **${GAP1}** years later.`,
        `Stanley ${YR.stanley}: crystallised the virus, **${GAP2}** years after Beijerinck; Diener ${YR.diener}: viroids, **${GAP3}** years after Stanley.`,
      ],
      v: table(['Scientist', 'Year', 'Contribution'], [['Ivanowsky', String(YR.ivanowsky), 'Filtrate of diseased tobacco sap still infectious'], ['Beijerinck', String(YR.beijerinck), 'Contagium vivum fluidum (infectious living fluid)'], ['Stanley', String(YR.stanley), 'Crystallised the virus; it was mainly protein and RNA'], ['Diener', String(YR.diener), 'Discovered viroids']], 'Worked table of the history of viruses and viroids'),
      n: 'Ivanowsky showed that the cause of tobacco mosaic passed through a filter that stops bacteria. Six years later Beijerinck named it a living infectious fluid. Stanley crystallised it in nineteen thirty-five, and Diener found viroids in nineteen seventy-one.',
    }),
    sl('check', 'Quick check: years', {
      b: 'How many years passed between Ivanowsky’s observation and Diener’s discovery of viroids?',
      n: 'Quick check. Subtract the earlier year from the later one.',
      chk: 'years-num',
    }),
    sl('concept', 'Viruses, viroids and prions', {
      b: 'Three kinds of infectious agent, none of them a cell.',
      v: table(['Agent', 'Composition', 'Example or disease'], [['Virus', 'Nucleic acid (DNA or RNA) inside a protein coat', 'Tobacco mosaic virus, bacteriophage'], ['Viroid', 'Free RNA of low molecular weight, no protein coat', 'Potato spindle tuber disease'], ['Prion', 'Abnormally folded infectious protein, no nucleic acid', 'BSE in cattle; CJD in humans']], 'Table comparing viruses, viroids and prions'),
      n: 'A virus has nucleic acid in a protein coat. A viroid is only a short piece of free RNA with no coat. A prion is a misfolded protein with no nucleic acid at all. Prions cause mad cow disease in cattle and Creutzfeldt-Jakob disease in humans.',
    }),
    sl('check', 'Quick check: prions', {
      b: 'Decide whether the statement about prions is true or false.',
      n: 'Quick check. What is a prion made of?',
      chk: 'prion-tf',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Classes: Zygomycetes (zygospores), Ascomycetes (asci), Basidiomycetes (basidia), Deuteromycetes (sexual stage unknown).',
        'Uses: penicillin, bread, decomposition.',
        'Lichen = fungus + alga; pollution indicator. Mycorrhiza: ecto (sheath) and endo (inside root cells).',
        'Viruses: capsid and nucleic acid; TMV (RNA, helix), bacteriophage (DNA, head and tail). Viroid = RNA only; prion = protein only.',
      ],
      v: table(['Agent', 'Genetic material'], [['Virus', 'DNA or RNA'], ['Viroid', 'RNA only'], ['Prion', 'None; protein only']], 'Summary table of viruses, viroids and prions'),
      n: 'To recap: four fungal classes are told apart by hyphae and sexual spores. Fungi give medicines, food and decomposition. Lichens and mycorrhiza are partnerships. A virus has a coat and nucleic acid, a viroid only RNA, and a prion only protein.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Classify a fungus by **hyphae** and the **sexual spore**.',
        'In a lichen, name the **mycobiont** and the **phycobiont** and what each supplies.',
        'Label **capsid and RNA** in TMV, and **head, collar, sheath, base plate and fibres** in a phage.',
        'Distinguish virus, viroid and prion by **what they contain**.',
      ],
      n: 'Exam tips. Use hyphae and sexual spores to place a fungus in its class. Name both partners in a lichen. Label virus drawings fully. And separate viruses, viroids and prions by their content.',
    }),
  ],
});
void YR;
