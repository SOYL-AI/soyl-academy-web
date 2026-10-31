// ISC 12 Biology ch09 Evolution: Origin of Life and Evidences — question bank in ISC style.
// Radiocarbon ages and fractions are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { remaining, ageFromFraction, halves, HALF_LIFE } from './calc.mjs';
import { MILLER, LIMBS_SVG } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const millerFig = svgV(MILLER, 'Miller–Urey apparatus with boiling water, gas flask with electrodes, condenser and trap');
const limbsFig = svgV(LIMBS_SVG, 'Forelimbs of a human, cheetah, whale and bat drawn as the same five bone groups');

// ---------------------------------------------------------------- t01 origin of life
add('coacervate-mcq', mcq({
  stem: 'Which statement about Oparin’s coacervates is correct?',
  right: 'They are non-living colloidal droplets that can absorb substances and divide.',
  wrong: ['They are the first living bacteria.', 'They are protein droplets made by heating amino acids, as shown by Fox.', 'They are spores that reached Earth from space.'],
  sol: 'Coacervates are non-living protobionts of colloids; microspheres were Fox’s — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('pasteur-mcq', mcq({
  stem: 'In Pasteur’s experiment, boiled broth in a swan-neck flask stayed free of microbes until the curved neck was broken off. What does this show?',
  right: 'Microbes in the broth came from microbes in the air, not from the broth itself.',
  wrong: ['Boiling creates microbes from broth.', 'Air alone turns broth into microbes.', 'Life arose by chemical evolution in the flask.'],
  sol: 'Once dust-borne microbes could reach the broth, it decayed: life comes from pre-existing life (biogenesis) — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('panspermia-mcq', mcq({
  stem: 'The idea that spores or other units of life reached Earth from outer space is called',
  right: 'panspermia',
  wrong: ['abiogenesis', 'biogenesis', 'chemical evolution'],
  sol: 'Panspermia, the cosmozoic theory — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('haldane-mcq', mcq({
  stem: 'Haldane described the early ocean, rich in abiotically formed organic molecules, as a',
  right: 'hot dilute soup',
  wrong: ['primordial ozone layer', 'coacervate', 'swan-neck flask'],
  sol: 'Haldane’s “hot dilute soup” — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('oxygen-mcq', mcq({
  stem: 'If the early Earth’s atmosphere had held as much free oxygen as it does today, what would most likely have happened to the first abiotically formed organic molecules?',
  right: 'They would have been oxidised and broken down before they could accumulate.',
  wrong: ['They would have formed living cells more quickly.', 'They would have been protected from UV radiation and lasted longer.', 'They would have turned into coacervates at once.'],
  sol: 'Free oxygen is highly reactive; a reducing atmosphere let organic molecules build up — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('heterotroph-mcq', mcq({
  stem: 'The first cells are thought to have been anaerobic heterotrophs. Which pair of early-Earth conditions explains this?',
  right: 'There was no free oxygen, and organic molecules were plentiful in the oceans.',
  wrong: ['There was plenty of oxygen, and light was scarce.', 'There was an ozone layer, and no organic molecules.', 'There were many plants to eat, and no water.'],
  sol: 'Without oxygen they had to be anaerobic; the “soup” supplied ready-made food — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('reducing-ar', ar({
  a: 'Organic molecules formed abiotically could accumulate in the early oceans.',
  r: 'The early atmosphere had no free oxygen to oxidise them.',
  key: 'a',
  sol: 'Both are true, and the absence of free oxygen explains why the molecules survived to accumulate — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('microsphere-fill', fill({
  stem: 'Protein-like droplets formed by heating amino acids and then cooling them in water were named ______ by Sidney Fox.',
  acc: [['microspheres', 'microsphere']],
  sol: 'Microspheres.',
  d: 1, c: 'recall', t: [1],
}));
add('ozone-short', short({
  marks: 1,
  stem: 'Give a reason: ultraviolet radiation was an important energy source for chemical evolution on the early Earth.',
  model: 'There was **no ozone layer**, so strong **UV radiation reached the surface** and supplied energy for reactions.',
  sol: 'No ozone layer.',
  scheme: [['No ozone; UV reached surface', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('theories-short', short({
  marks: 2,
  stem: 'Distinguish between abiogenesis and biogenesis, and state which one describes the origin of living things today.',
  model: '**Abiogenesis** (spontaneous generation) states that living things arise from **non-living matter**. **Biogenesis** states that life arises only from **pre-existing life**. Since Pasteur’s swan-neck flask experiment, **biogenesis** is accepted for living things **today**.',
  sol: 'Two definitions; biogenesis today.',
  scheme: [['Both defined', 1], ['Biogenesis applies today', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('protobiont-short', short({
  marks: 2,
  stem: 'Distinguish between protobionts and coacervates.',
  model: '**Protobionts** is the general term for **non-living aggregates** of abiotically made organic molecules with a **membrane-like boundary** that keep an internal environment. **Coacervates** are **one kind** of protobiont, proposed by **Oparin**: **colloidal droplets** of **proteins and polysaccharides** in water.',
  sol: 'General term vs a particular kind.',
  scheme: [['Protobionts described', 1], ['Coacervates as one kind, Oparin, colloids', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('reducing-short', short({
  marks: 3,
  stem: 'A student claims that the first organic molecules could form just as easily under today’s conditions. Using the Oparin–Haldane theory, give three reasons why this is unlikely.',
  model: '(i) Today’s air has **free oxygen**, which would **oxidise and destroy** organic molecules as they formed; the early atmosphere was **reducing**. (ii) The **ozone layer** now **blocks most UV radiation**, removing a major **energy source** for abiotic synthesis. (iii) Any organic molecules formed today would quickly be **eaten by existing microbes**, so they could not **accumulate** into a “soup”.',
  sol: 'Oxygen, ozone, microbes.',
  scheme: [['Free oxygen destroys molecules', 1], ['Ozone blocks UV energy', 1], ['Existing life consumes them', 1]],
  d: 3, c: 'application', t: [1],
}));
add('oparin-short', short({
  marks: 3,
  stem: 'Explain the Oparin–Haldane theory of the origin of life.',
  model: '**Oparin (1924)** and **Haldane (1929)** proposed **chemical evolution**. The early atmosphere was **reducing** — **methane, ammonia, hydrogen and water vapour**, **no free oxygen**. Energy from **lightning, UV radiation and volcanic heat** formed **simple organic molecules** (sugars, amino acids, bases), which collected in the oceans as a **“hot dilute soup”**. These joined into **larger molecules**, which aggregated as **protobionts** such as **coacervates**, from which the **first cells** arose.',
  sol: 'Chemical evolution in steps.',
  scheme: [['Reducing atmosphere gases', 1], ['Energy forms organic molecules in a soup', 1], ['Large molecules, protobionts, first cells', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('origin-long', long({
  stem: '(a) Name and explain three theories of the origin of life other than chemical evolution. [2]\n(b) Distinguish between Oparin’s coacervates and Fox’s microspheres. [2]\n(c) Why can life not arise by chemical evolution on Earth today? [1]',
  model: '(a) **Abiogenesis** — life from non-living matter (disproved for today by **Pasteur**); **biogenesis** — life only from pre-existing life; **panspermia** — spores of life came from **outer space**.\n\n(b) **Coacervates** (Oparin) are **colloidal droplets** of **proteins and polysaccharides** in water that can absorb substances and divide. **Microspheres** (Sidney Fox) are **protein-like droplets** formed by **heating amino acids** and cooling them in water. Both are **non-living protobionts**.\n\n(c) Today’s atmosphere has **free oxygen** and an **ozone layer**, and existing **microbes** would consume any organic molecules, so they cannot **accumulate**.',
  sol: 'Theories; protobionts; today.',
  scheme: [['(a) Three theories', 2], ['(b) Coacervates', 1], ['(b) Microspheres', 1], ['(c) Oxygen, ozone or microbes', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 Miller–Urey
add('miller-gases-mcq', mcq({
  stem: 'Which mixture of gases did Stanley Miller seal in his apparatus in 1953?',
  right: 'Methane, ammonia, hydrogen and water vapour',
  wrong: ['Oxygen, nitrogen and carbon dioxide', 'Ozone, oxygen and water vapour', 'Chlorine, hydrogen and nitrogen'],
  sol: 'He used a reducing mixture like the early atmosphere — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('spark-mcq', mcq({
  stem: 'In the Miller–Urey apparatus, which early-Earth condition did the electric sparks represent?',
  right: 'Lightning in the atmosphere',
  wrong: ['Heat from volcanoes in the sea', 'Rain falling into the oceans', 'Ultraviolet light blocked by ozone'],
  sol: 'The sparks supplied energy as lightning would — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('miller-fig-mcq', mcq({
  stem: 'In the Miller–Urey apparatus shown, where would you take a sample to look for amino acids after a week?',
  right: 'From the trap below the condenser',
  wrong: ['From the gas around the electrodes', 'From the boiling water before it is heated', 'From the air outside the apparatus'],
  sol: 'Products dissolved in condensed water and collected in the trap — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [millerFig],
}));
add('control-mcq', mcq({
  stem: 'A student sets up two identical Miller–Urey apparatuses with the same gases and boiling water, but switches on the sparks in only one. Amino acids appear only in that one. What does the second set-up show?',
  right: 'It is a control showing that an energy source is needed for the amino acids to form.',
  wrong: ['It shows that the gases themselves are amino acids.', 'It shows that boiling water alone makes amino acids.', 'It shows that oxygen is needed for amino acids to form.'],
  sol: 'Only the variable “sparks” differs, so the energy input is responsible for synthesis — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('miller-ar', ar({
  a: 'Miller filled his apparatus with an atmosphere rich in free oxygen.',
  r: 'Free oxygen is needed for amino acids to form abiotically.',
  key: 'd',
  sol: 'Both are false: Miller used reducing gases with no free oxygen, and oxygen would destroy the products — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
add('glycine-fill', fill({
  stem: 'Two amino acids identified in the liquid from Miller’s trap were glycine and ______.',
  acc: [['alanine', 'aspartic acid']],
  sol: 'Alanine (aspartic acid was also found).',
  d: 1, c: 'recall', t: [2],
}));
add('miller-short', short({
  marks: 3,
  stem: 'Describe the Miller–Urey experiment and state its conclusion.',
  model: 'In **1953**, **Miller and Urey** sealed **methane, ammonia, hydrogen and water vapour** in a glass apparatus. Water was **boiled** to circulate vapour; **electrodes** passed **sparks** through the gases (lightning); a **condenser** cooled them, and the liquid collected in a **trap**. After about a **week**, the liquid contained **amino acids** such as **glycine and alanine**. **Conclusion:** organic molecules can form **abiotically** from simple gases with energy in a **reducing** atmosphere, supporting **chemical evolution**.',
  sol: 'Set-up, result, conclusion.',
  scheme: [['Gases and apparatus', 1], ['Amino acids formed', 1], ['Conclusion: chemical evolution', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('miller-long', long({
  stem: '(a) Draw a labelled diagram of the apparatus used by Miller and Urey. [2]\n(b) State what each of the following represented: the gas mixture, the sparks, the boiling water and the condenser. [2]\n(c) Why did the apparatus have to be sealed and free of oxygen? [1]',
  model: '(a) **Diagram:** a flask of **boiling water**; a large flask with **methane, ammonia, hydrogen and water vapour** and two **electrodes**; a **condenser**; a **U-shaped trap** collecting liquid.\n\n(b) Gas mixture — the **reducing early atmosphere**; sparks — **lightning**; boiling water — the warm **ocean** and evaporation; condenser — **cooling and rain**, bringing products into the “sea”.\n\n(c) Oxygen would **oxidise** the products and does not match the **early atmosphere**; sealing also kept out **microbes** and **contamination**.',
  sol: 'Diagram; representations; sealed.',
  scheme: [['(a) Labelled apparatus', 2], ['(b) Four representations', 2], ['(c) No oxygen, no contamination', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 morphological evidence
add('analogous-mcq', mcq({
  stem: 'Which of these pairs are analogous organs?',
  right: 'Sweet potato and potato',
  wrong: ['Forelimb of a whale and wing of a bat', 'Thorn of Bougainvillea and tendril of Cucurbita', 'Heart of a fish and heart of a frog'],
  sol: 'Both store food but one is a root and the other a stem — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('homologous-mcq', mcq({
  stem: 'The thorn of Bougainvillea and the tendril of Cucurbita have different functions but both develop from axillary buds. They are',
  right: 'homologous organs showing divergent evolution',
  wrong: ['analogous organs showing convergent evolution', 'vestigial organs', 'analogous organs showing divergent evolution'],
  sol: 'Same origin (modified stems), different function: homology, divergent evolution — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('divergent-mcq', mcq({
  stem: 'Homologous organs in related organisms are evidence of',
  right: 'divergent evolution',
  wrong: ['convergent evolution', 'spontaneous generation', 'panspermia'],
  sol: 'A common ancestral structure diverged for different functions — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('octopus-mcq', mcq({
  stem: 'The eyes of an octopus and of a human both form sharp images, but their retinas develop in different ways. These eyes illustrate',
  right: 'convergent evolution',
  wrong: ['divergent evolution', 'vestigial organs', 'adaptive radiation from one ancestor'],
  sol: 'Same function, different origin: analogous organs from convergent evolution — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('appendix-mcq', mcq({
  stem: 'Which of these is a vestigial organ in humans?',
  right: 'Vermiform appendix',
  wrong: ['Liver', 'Pancreas', 'Femur'],
  sol: 'The appendix is reduced in humans but functional in herbivores — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('bones-mcq', mcq({
  stem: 'In the figure of the forelimbs of a human, a cheetah, a whale and a bat, which observation shows that the limbs are homologous?',
  right: 'All have the same five bone groups in the same order, though their proportions differ.',
  wrong: ['All are used for the same function.', 'All are the same length.', 'All are found in animals that fly.'],
  sol: 'A shared plan with different proportions shows common origin — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [limbsFig],
}));
add('wingsbat-ar', ar({
  a: 'The wing of a bat and the wing of a butterfly are analogous organs.',
  r: 'Bats are mammals that are active mostly at night.',
  key: 'b',
  sol: 'Both are true, but the bat’s night activity does not explain the analogy, which is due to the same function with different origin — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('vestigial-ar', ar({
  a: 'The human vermiform appendix is a vestigial organ.',
  r: 'In humans the appendix is large and digests cellulose.',
  key: 'c',
  sol: 'A is true; R is false: the human appendix is reduced and does not digest cellulose (it does so in herbivores) — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('nictitating-short', short({
  marks: 1,
  stem: 'Give a reason: the small fold at the inner corner of the human eye (plica semilunaris) is called a vestigial organ.',
  model: 'It is a **reduced remnant** of the **nictitating membrane**, a functional **third eyelid** in **birds and reptiles**.',
  sol: 'Remnant of the third eyelid.',
  scheme: [['Remnant of functional nictitating membrane', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('homo-short', short({
  marks: 2,
  stem: 'Classify each pair as homologous or analogous: (i) flippers of a penguin and a dolphin; (ii) forelimb of a cheetah and arm of a human; (iii) sweet potato and potato; (iv) heart of a fish and heart of a human.',
  model: '(i) **Analogous** — same function (swimming), from a bird wing and a mammal forelimb. (ii) **Homologous** — same bones. (iii) **Analogous** — root and stem storing food. (iv) **Homologous** — the vertebrate heart has a common origin.',
  sol: 'A, H, A, H.',
  scheme: [['(i) and (ii)', 1], ['(iii) and (iv)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('vestigial-short', short({
  marks: 2,
  stem: 'What are vestigial organs? Name two in humans, and state in which animals each is functional.',
  model: '**Vestigial organs** are **reduced, functionless** remnants of organs that were **useful in ancestors**. **Vermiform appendix** — functional in **herbivores** (cellulose digestion); **nictitating membrane** — a third eyelid in **birds and reptiles** (or **coccyx** — the tail of **tailed mammals**).',
  sol: 'Definition and two examples.',
  scheme: [['Definition', 1], ['Two organs with functional animals', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('homanalog-short', short({
  marks: 3,
  stem: 'Distinguish between homologous and analogous organs, giving one plant and one animal example of each, and name the type of evolution each shows.',
  model: '**Homologous organs** have the **same origin and basic structure** but may do **different jobs** — animal: **forelimbs of a whale and a bat**; plant: **thorn of Bougainvillea and tendril of Cucurbita**; they show **divergent evolution**. **Analogous organs** do the **same job** but differ in **origin and structure** — animal: **wings of a butterfly and a bird**; plant: **sweet potato and potato**; they show **convergent evolution**.',
  sol: 'Definitions, examples, evolution types.',
  scheme: [['Definitions', 1], ['Examples of each', 1], ['Divergent vs convergent', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('divergent-short', short({
  marks: 3,
  stem: 'The forelimbs of a whale, a bat and a cheetah are built from the same bones but look very different. Explain this using divergent evolution, and contrast it with how the flippers of a penguin and a dolphin came to look alike.',
  model: 'The three mammals share a **common ancestor** whose forelimb had the same bones; as descendants adapted to **swimming, flying and running**, the bones **changed in proportion** — **divergent evolution**, giving **homologous** organs. Penguins (birds) and dolphins (mammals) are **not closely related**, but both adapted to **swimming**, so their flippers became **similar in shape** — **convergent evolution**, giving **analogous** organs.',
  sol: 'Divergent vs convergent.',
  scheme: [['Common ancestor; bones modified for different uses', 1], ['Named divergent; homologous', 1], ['Penguin–dolphin convergent; analogous', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 embryology, fossils, dating
add('halflife-mcq', mcq({
  stem: 'What is the half-life of carbon-14, the isotope used to date organic remains?',
  right: `${HALF_LIFE} years`,
  wrong: ['573 years', '57 300 years', '4.5 billion years'],
  sol: `Carbon-14 halves every ${HALF_LIFE} years — option (@K).`,
  d: 1, c: 'recall', t: [4],
}));
add('archaeopteryx-mcq', mcq({
  stem: 'Archaeopteryx had feathers and wings but also teeth, clawed fingers and a long bony tail. It is regarded as a connecting link between',
  right: 'reptiles and birds',
  wrong: ['fishes and amphibians', 'birds and mammals', 'amphibians and reptiles'],
  sol: 'Feathers (bird) with teeth and a bony tail (reptile) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('gillslit-mcq', mcq({
  stem: 'A human embryo has pharyngeal pouches (gill slits) for a short time. According to the recapitulation theory, this reflects',
  right: 'descent from fish-like aquatic ancestors',
  wrong: ['the need of the embryo to breathe through gills', 'a mutation that occurs in every human', 'adaptation of the embryo to life in amniotic fluid'],
  sol: 'Ontogeny recapitulates phylogeny: embryonic features echo ancestors — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('vonbaer-mcq', mcq({
  stem: 'Why is Haeckel’s recapitulation theory not accepted literally today?',
  right: 'Embryos resemble the embryos, not the adults, of other animals.',
  wrong: ['Human embryos never show gill slits.', 'Embryos of different vertebrates look entirely different from the start.', 'Fossils show that fishes evolved after mammals.'],
  sol: 'Von Baer’s observation corrected the theory — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('mesozoic-mcq', mcq({
  stem: 'During which era did dinosaurs and gymnosperms dominate life on Earth?',
  right: 'Mesozoic',
  wrong: ['Cenozoic', 'Palaeozoic', 'Precambrian'],
  sol: 'The Mesozoic is the age of reptiles, with gymnosperms dominant — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('pteridophyte-mcq', mcq({
  stem: 'The great coal deposits formed mainly from forests of tree ferns and seed ferns that grew during which era?',
  right: 'Palaeozoic',
  wrong: ['Mesozoic', 'Cenozoic', 'Precambrian'],
  sol: 'The Carboniferous period of the Palaeozoic era — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('strata-mcq', mcq({
  stem: 'In an undisturbed sequence of sedimentary rocks, amphibian fossils are found in a layer above a layer with fish fossils. What can be concluded?',
  right: 'The amphibians lived later than the fishes.',
  wrong: ['The amphibians lived earlier than the fishes.', 'The two lived at exactly the same time.', 'The fossils cannot be compared at all.'],
  sol: 'Upper layers are younger, consistent with fishes evolving before amphibians — option (@K).',
  d: 3, c: 'application', t: [4],
}));
{
  const age = ageFromFraction(1 / 8);
  add('carbon-num', num({
    stem: 'A wooden spear shaft from a cave contains one eighth of the carbon-14 found in living wood. Estimate its age in years.',
    value: age, unit: 'years',
    sol: r`$\dfrac{1}{8} = \left(\dfrac{1}{2}\right)^{3}$, so age $= 3 \times ${HALF_LIFE} = ${age}$ years.`,
    scheme: [[`${age} years`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 17190 || 'value');
}
{
  const f = remaining(halves(4));
  add('remaining-num', num({
    stem: `What fraction of its original carbon-14 will a mammoth tusk still contain ${halves(4)} years after the mammoth died? Give a decimal.`,
    value: f, tol: 0.0001,
    sol: r`$\dfrac{${halves(4)}}{${HALF_LIFE}} = 4$ half-lives; fraction $= \left(\dfrac{1}{2}\right)^{4} = ${f}$.`,
    scheme: [[`${f}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 0.0625 || 'value');
}
add('dino-ar', ar({
  a: 'Radiocarbon dating cannot be used to find the age of dinosaur fossils.',
  r: 'Carbon-14 decays with a half-life of 5730 years, so almost none remains after about 50 000 years.',
  key: 'a',
  sol: 'Both are true; dinosaurs died out about 66 million years ago, far beyond the range set by the half-life — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('cenozoic-fill', fill({
  stem: 'The era known as the “age of mammals”, in which flowering plants became dominant, is the ______ era.',
  acc: [['Cenozoic', 'Caenozoic']],
  sol: 'Cenozoic.',
  d: 1, c: 'recall', t: [4],
}));
add('embryo-short', short({
  marks: 2,
  stem: 'State Haeckel’s recapitulation theory and give one embryological observation that supports common descent of vertebrates.',
  model: 'The theory states that **ontogeny recapitulates phylogeny**: an individual’s **development** repeats the **evolutionary history** of its group. Observation: embryos of **all vertebrates**, including humans, have **gill slits (pharyngeal pouches)**, a **notochord** and a **tail** at an early stage.',
  sol: 'Theory; observation.',
  scheme: [['Theory stated', 1], ['Gill slits, notochord or tail in all vertebrate embryos', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('dating-short', short({
  marks: 3,
  stem: `Explain the principle of radiocarbon dating. A charred seed has half the carbon-14 of a fresh seed: how old is it? Why can the method not date a 300-million-year-old fern fossil?`,
  model: `Living things take in carbon with a **constant proportion of carbon-14**. After **death**, no new carbon enters and carbon-14 **decays** with a **half-life of ${HALF_LIFE} years**, so the **fraction left** shows the **time since death**. Half left → **one half-life → ${halves(1)} years**. After about **50 000 years** almost **no carbon-14 remains**, so a 300-million-year-old fossil is dated by **other isotopes** (such as **uranium–lead**).`,
  sol: 'Principle; one half-life; range.',
  scheme: [['Constant intake, decay after death', 1], [`${halves(1)} years`, 1], ['Too old; other isotopes', 1]],
  d: 3, c: 'application', t: [4],
}));
add('eras-short', short({
  marks: 3,
  stem: 'Name the Palaeozoic, Mesozoic and Cenozoic eras in order of age, and give one dominant animal group and one dominant plant group for each.',
  model: 'From oldest to youngest: the **Palaeozoic** era (about 541–252 million years ago) — **fishes and amphibians** among animals, with **pteridophytes and seed ferns** forming the coal forests; the **Mesozoic** (252–66) — **reptiles, especially dinosaurs**, with **gymnosperms** dominant among plants; the **Cenozoic** (66 to the present) — **mammals**, with **angiosperms (flowering plants)** dominant.',
  sol: 'Three eras.',
  scheme: [['Palaeozoic', 1], ['Mesozoic', 1], ['Cenozoic', 1]],
  d: 2, c: 'recall', t: [4],
}));
{
  const age5 = ageFromFraction(1 / 32);
  add('fossil-long', long({
    stem: `(a) What are fossils? How do rock strata show the order in which groups of organisms appeared? [2]\n(b) Describe the features that make Archaeopteryx a connecting link. [2]\n(c) A bone contains one thirty-second of the carbon-14 of living bone. Calculate its age. [1]`,
    model: `(a) **Fossils** are **remains or impressions** of past organisms preserved in **sedimentary rocks**. Layers (**strata**) are laid down one above another, so **deeper layers are older**: simple forms appear in the oldest rocks and **more complex** forms (fishes, then amphibians, reptiles, birds, mammals) in younger ones.\n\n(b) **Bird features:** **feathers** and **wings**, and a beak-like jaw. **Reptile features:** **teeth**, **clawed fingers** on the wings and a **long bony tail**. It links **reptiles and birds**.\n\n(c) $\\dfrac{1}{32} = \\left(\\dfrac{1}{2}\\right)^{5}$; age $= 5 \\times ${HALF_LIFE} =$ **${age5} years**.`,
    sol: 'Fossils; Archaeopteryx; age.',
    scheme: [['(a) Fossils defined', 1], ['(a) Older strata deeper', 1], ['(b) Bird and reptile features', 2], [`(c) ${age5} years`, 1]],
    wl: [50, 200],
    d: 3, c: 'application', t: [4],
  }), () => age5 === 28650 || 'age');
}

// ---------------------------------------------------------------- t05 biogeography, molecules, adaptive radiation
add('marsupial-ar', ar({
  a: 'Australian marsupials are an example of adaptive radiation.',
  r: 'Many different marsupials evolved from one ancestral stock and spread into different niches.',
  key: 'a',
  sol: 'Both are true, and evolution of many forms from one ancestor into different niches is what adaptive radiation means — option (a).',
  d: 3, c: 'understanding', t: [5],
}));
add('finch-mcq', mcq({
  stem: 'Darwin’s finches on the Galapagos Islands differ mainly in their beaks. They are believed to have evolved from',
  right: 'one seed-eating ancestral finch from the mainland',
  wrong: ['several unrelated birds that arrived separately', 'Archaeopteryx living on the islands', 'insect-eating marsupials'],
  sol: 'One ancestor radiated into many species with beaks suited to different foods — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('glider-mcq', mcq({
  stem: 'The sugar glider of Australia and the flying squirrel of North America look alike and both glide between trees, but one is a marsupial and the other a placental mammal. Their similarity is an example of',
  right: 'convergent evolution',
  wrong: ['homologous organs from divergent evolution', 'recapitulation', 'spontaneous generation'],
  sol: 'Unrelated groups adapting to the same way of life — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('code-mcq', mcq({
  stem: 'Which observation provides molecular evidence that bacteria, plants and animals share a common ancestor?',
  right: 'The codon UUU codes for phenylalanine in all of them.',
  wrong: ['All of them have forelimbs with the same bones.', 'All of them form fossils in sedimentary rocks.', 'All of them have gill slits as embryos.'],
  sol: 'A nearly universal genetic code points to common descent — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('cytc-mcq', mcq({
  stem: 'The cytochrome c of species P differs from human cytochrome c in 1 amino acid, that of species Q in 12, and that of species R in 44. Which conclusion is best supported?',
  right: 'P is the most closely related to humans and R the most distant.',
  wrong: ['R is the most closely related to humans.', 'All three are equally related to humans.', 'Cytochrome c gives no information about relatedness.'],
  sol: 'Fewer differences mean more recent common ancestry — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('endemic-fill', fill({
  stem: 'Species that occur naturally in only one region, like many on the Galapagos Islands, are called ______ species.',
  acc: [['endemic']],
  sol: 'Endemic.',
  d: 1, c: 'recall', t: [5],
}));
add('radiation-short', short({
  marks: 2,
  stem: 'What is adaptive radiation? Explain it with reference to Darwin’s finches.',
  model: '**Adaptive radiation** is the evolution of **many different forms** from **one ancestor**, spreading into **different habitats or niches**. On the Galapagos, finches descended from a **seed-eating ancestor** evolved beaks suited to **seeds, insects, cactus flowers and buds**.',
  sol: 'Definition and finches.',
  scheme: [['Definition', 1], ['Finches from one ancestor with different beaks', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('molecular-short', short({
  marks: 2,
  stem: 'A bacterium, a yeast and a human all use ATP as their energy currency and read the codon AUG as methionine. Explain how these observations support evolution, and give one other molecular evidence.',
  model: 'Such basic features are unlikely to arise **independently** in unrelated organisms, so their **sharing** points to a **common ancestor**. Another evidence: **similarity of DNA and protein sequences**, such as **cytochrome c**, is greater in **more closely related** species.',
  sol: 'Common ancestor; sequence similarity.',
  scheme: [['Shared features imply common ancestor', 1], ['Another molecular evidence', 1]],
  d: 2, c: 'application', t: [5],
}));
add('biogeo-short', short({
  marks: 3,
  stem: 'Australia has many marsupials but few native placental mammals, and several of its marsupials resemble placental mammals elsewhere. Explain these facts using biogeography and the ideas of adaptive radiation and convergent evolution.',
  model: 'Australia was **isolated early**, before placental mammals spread, so **marsupials** filled its niches. From **one ancestral stock**, marsupials **radiated** into many forms — **adaptive radiation**. Because they adapted to the **same ways of life** as placental mammals on other continents, pairs such as the **Tasmanian wolf and wolf** or the **sugar glider and flying squirrel** look alike — **convergent evolution**.',
  sol: 'Isolation; radiation; convergence.',
  scheme: [['Early isolation of Australia', 1], ['Adaptive radiation from one stock', 1], ['Convergence with placentals, example', 1]],
  d: 3, c: 'application', t: [5],
}));
add('radiation-long', long({
  stem: '(a) Define adaptive radiation and explain it with Darwin’s finches. [2]\n(b) Give two examples of Australian marsupials and the placental mammals they resemble, and name the type of evolution shown by each pair. [2]\n(c) Why do isolated island groups often show adaptive radiation? [1]',
  model: '(a) **Adaptive radiation** is the evolution of **many forms from one ancestor** into **different niches**. Galapagos finches, descended from a **seed-eating ancestor**, evolved beaks for **seeds, insects, cactus flowers, grubs and buds**.\n\n(b) **Tasmanian wolf — wolf**; **sugar glider — flying squirrel** (or marsupial mole — mole). Each pair shows **convergent evolution**, since the animals are not closely related but share a way of life.\n\n(c) Islands have **few competitors** and **many empty niches**, and **isolation** prevents gene flow, so colonists **diversify** into new species.',
  sol: 'Radiation; marsupials; islands.',
  scheme: [['(a) Definition with finches', 2], ['(b) Two pairs', 1], ['(b) Convergent evolution', 1], ['(c) Empty niches, isolation', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const S = [['W', 1 / 2], ['X', 1 / 8], ['Y', 1 / 4], ['Z', 0]];
  const ageX = ageFromFraction(1 / 8);
  add('dating-case', mk.case({
    passage: `An archaeologist measured the carbon-14 left in four samples, as a fraction of that in living tissue. The half-life of carbon-14 is ${HALF_LIFE} years.\n\n| Sample | Material | Fraction of carbon-14 left |\n|---|---|---|\n${S.map(([s, f]) => `| ${s} | ${{ W: 'Charcoal', X: 'Bone', Y: 'Seed', Z: 'Fossil fish from deep rock' }[s]} | ${f === 0 ? 'none measurable' : ['1/2', '1/4', '1/8'][[0.5, 0.25, 0.125].indexOf(f)]} |`).join('\n')}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What is the age of sample X in years?',
        value: ageX, unit: 'years',
        sol: r`3 half-lives: $3 \times ${HALF_LIFE} = ${ageX}$ years.`,
        scheme: [[`${ageX}`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('b', mcq({
        stem: 'Arrange samples W, X and Y from youngest to oldest.',
        right: 'W, Y, X',
        wrong: ['X, Y, W', 'Y, W, X', 'W, X, Y'],
        sol: 'More carbon-14 left means younger: 1/2, 1/4, 1/8 — option (@K).',
        d: 3, c: 'analysis', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why does sample Z show no measurable carbon-14, and how could its age be found?',
        model: 'Sample Z is **very old** — more than about **50 000 years** — so nearly all its carbon-14 has **decayed**. Its age can be found by dating the **rock layer** with longer-lived isotopes such as **uranium–lead** or **potassium–argon**.',
        sol: 'Too old; other isotopes.',
        scheme: [['Carbon-14 decayed beyond detection', 1], ['Use uranium–lead or potassium–argon', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Why must a sample be protected from contamination with modern carbon before dating?',
          model: 'Modern carbon contains the **living proportion of carbon-14**. Mixing it in would **raise** the measured carbon-14 and make the sample appear **younger** than it really is.',
          sol: 'Gives a falsely young age.',
          scheme: [['Modern carbon adds carbon-14', 1], ['Sample appears younger', 1]],
          d: 3, c: 'analysis', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 17190 || 'value');
}
add('organs-case', mk.case({
  passage: 'A student compared the forelimbs of four mammals (see the figure) and also noted that the wing of a housefly and the wing of a sparrow are both used for flight.',
  d: 3, c: 'analysis',
  assets: [limbsFig],
  children: [
    part('a', mcq({
      stem: 'Which bone group forms the largest part of the whale’s flipper in the figure?',
      right: 'Phalanges',
      wrong: ['Humerus', 'Carpals', 'Radius and ulna'],
      sol: 'The whale’s phalanges are elongated to support the flipper — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', mcq({
      stem: 'Compared with the four forelimbs, the wings of the housefly and the sparrow are',
      right: 'analogous, showing convergent evolution',
      wrong: ['homologous, showing divergent evolution', 'vestigial, showing loss of function', 'homologous, showing convergent evolution'],
      sol: 'Same function, different origin (cuticle vs forelimb) — option (@K).',
      d: 3, c: 'analysis', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the four forelimbs are better evidence of common ancestry than the two kinds of wing.',
      model: 'The forelimbs share the **same bones in the same order** despite **different uses**, which is best explained by **inheritance from a common ancestor**. The wings share only **function**; similar needs can produce similar shapes in **unrelated** groups, so they do **not** show close common ancestry.',
      sol: 'Shared plan vs shared function.',
      scheme: [['Same plan despite different uses implies ancestry', 1], ['Shared function can arise independently', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Name one homologous pair of organs in plants and explain why the pair is homologous.',
        model: 'The **thorn of Bougainvillea** and the **tendril of Cucurbita** are homologous: both arise from **axillary buds** as **modified stems**, though one gives **protection** and the other **support for climbing**.',
        sol: 'Thorn and tendril.',
        scheme: [['Correct pair', 1], ['Same origin, different function', 1]],
        d: 2, c: 'application', t: [3],
      }),
    ]),
  ],
}));
