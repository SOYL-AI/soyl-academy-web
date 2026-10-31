// ISC 12 Biology ch13 Microbes in Human Welfare — question bank in ISC style.
// Bacterial counts, fermentation masses, BOD falls and biogas yields are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { cellsAfter, ferment, pctFall, pct, oxygenDemand, biogasLitres } from './calc.mjs';
import { STP, BIOGAS } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const stpFig = svgV(STP, 'Flow of a sewage treatment plant through primary and secondary treatment');
const biogasFig = svgV(BIOGAS, 'A biogas plant with digester, floating gas holder, inlet and outlet');

// ---------------------------------------------------------------- t01 household products
add('curd-mcq', mcq({
  stem: 'Milk with a spoonful of curd added sets in a few hours on a warm day but takes much longer in a refrigerator. Why?',
  right: 'Lactic acid bacteria multiply and make lactic acid much faster at warm temperatures.',
  wrong: ['Yeast in the curd needs light to ferment milk.', 'Cold temperatures destroy all milk proteins.', 'Curd bacteria need oxygen that is absent in a refrigerator.'],
  sol: 'LAB grow best at a suitable warm temperature; cold slows their growth and acid production — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('swiss-mcq', mcq({
  stem: 'Which bacterium produces the large amount of carbon dioxide that forms the big holes in Swiss cheese?',
  right: 'Propionibacterium sharmanii',
  wrong: ['Lactobacillus', 'Acetobacter aceti', 'Streptococcus'],
  sol: 'Propionibacterium sharmanii — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('yeastbread-mcq', mcq({
  stem: 'Dough for bread rises because baker’s yeast',
  right: 'ferments sugars and releases carbon dioxide that is trapped in the dough',
  wrong: ['makes lactic acid that coagulates the flour proteins', 'fixes nitrogen from the air', 'releases methane from the starch'],
  sol: 'Saccharomyces cerevisiae produces CO₂ during fermentation — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('idli-mcq', mcq({
  stem: 'Idli batter left overnight in a warm kitchen becomes puffed up and slightly sour. What has happened?',
  right: 'Bacteria have fermented it, releasing carbon dioxide and acids.',
  wrong: ['The rice has germinated and grown roots.', 'Methanogens have converted it to biogas.', 'The batter has absorbed oxygen from the air.'],
  sol: 'Bacterial fermentation produces CO₂ (puffing) and acid (sourness) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('propioni-fill', fill({
  stem: 'Roquefort cheese gets its flavour from ______ grown on it during ripening, whereas Swiss cheese owes its holes to a bacterium.',
  acc: [['fungi', 'fungus', 'specific fungi']],
  sol: 'Specific fungi.',
  d: 2, c: 'recall', t: [1],
}));
add('curdb12-short', short({
  marks: 1,
  stem: 'Give a reason: curd is considered more nutritious than the milk it is made from.',
  model: 'Lactic acid bacteria **increase vitamin B₁₂** and partly **digest milk proteins**; they also help **check harmful microbes** in the stomach.',
  sol: 'Vitamin B₁₂.',
  scheme: [['Vitamin B₁₂ increased (and protein partly digested)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
{
  const n = cellsAfter(500, 8, 2);
  add('lab-num', num({
    stem: 'A starter adds 500 lactic acid bacteria per millilitre to warm milk. If they double every 2 hours, how many are there per millilitre after 8 hours?',
    value: n,
    sol: r`$\dfrac{8}{2} = 4$ doublings; $500 \times 2^{4} = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 8000 || 'value');
}
add('curd-short', short({
  marks: 2,
  stem: 'Explain how milk is converted into curd and state two ways in which curd is useful to us.',
  model: 'A little curd added to warm milk acts as a **starter** containing **lactic acid bacteria (Lactobacillus)**. They multiply and produce **lactic acid**, which **coagulates and partly digests milk proteins**, setting the milk. Curd is useful because it is richer in **vitamin B₁₂** and its LAB help **check disease-causing microbes** in the stomach.',
  sol: 'LAB and lactic acid; benefits.',
  scheme: [['LAB make lactic acid that coagulates protein', 1], ['Two benefits', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cheese-short', short({
  marks: 2,
  stem: 'A cheese maker wants one batch of cheese with large holes and another with a strong flavour and blue veins. Which microbes should she use for each, and why?',
  model: 'For **large holes** (Swiss type), the bacterium ***Propionibacterium sharmanii***, which produces **a large amount of carbon dioxide** trapped as holes. For **flavour** (Roquefort type), specific **fungi** grown on the cheese during **ripening**, which give it its **particular flavour** and veins.',
  sol: 'Propionibacterium; fungi.',
  scheme: [['Propionibacterium: CO₂ holes', 1], ['Fungi in ripening: flavour', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 industrial products
add('citric-mcq', mcq({
  stem: 'A factory produces citric acid for soft drinks by growing which microbe?',
  right: 'Aspergillus niger',
  wrong: ['Acetobacter aceti', 'Clostridium butylicum', 'Monascus purpureus'],
  sol: 'Citric acid is made by the fungus Aspergillus niger — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('acetic-mcq', mcq({
  stem: 'Vinegar contains acetic acid made by the bacterium',
  right: 'Acetobacter aceti',
  wrong: ['Aspergillus niger', 'Lactobacillus', 'Trichoderma polysporum'],
  sol: 'Acetobacter aceti produces acetic acid — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('statin-mcq', mcq({
  stem: 'Statins, used to lower blood cholesterol, are obtained from',
  right: 'the yeast Monascus purpureus',
  wrong: ['the fungus Trichoderma polysporum', 'the bacterium Streptococcus', 'the fungus Penicillium notatum'],
  sol: 'Statins come from Monascus purpureus — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('statinmech-mcq', mcq({
  stem: 'How do statins lower blood cholesterol?',
  right: 'They competitively inhibit the enzyme responsible for synthesising cholesterol.',
  wrong: ['They dissolve clots in arteries.', 'They suppress the immune system.', 'They digest fat in the gut like lipases.'],
  sol: 'Statins are competitive inhibitors of a cholesterol-synthesis enzyme — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cyclosporin-mcq', mcq({
  stem: 'A patient who has received a kidney transplant is given cyclosporin A. What is its source and purpose?',
  right: 'From Trichoderma polysporum; it suppresses the immune system to prevent rejection.',
  wrong: ['From Monascus purpureus; it lowers cholesterol.', 'From Streptococcus; it dissolves blood clots.', 'From Penicillium; it kills bacteria.'],
  sol: 'Cyclosporin A is an immunosuppressant from Trichoderma polysporum — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('streptokinase-mcq', mcq({
  stem: 'A patient arrives in hospital with a heart attack caused by a clot in a coronary artery. Which microbial product might be given at once?',
  right: 'Streptokinase, a clot buster from Streptococcus',
  wrong: ['Cyclosporin A from Trichoderma', 'Lipase from bacteria', 'Citric acid from Aspergillus'],
  sol: 'Streptokinase removes clots from blood vessels — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('lipase-mcq', mcq({
  stem: 'A washing powder advertised as “removing oily stains even in cold water” most probably contains which microbial enzyme?',
  right: 'Lipase',
  wrong: ['Pectinase', 'Streptokinase', 'Protease from yeast for bread'],
  sol: 'Lipases digest fats and oils in stains — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pectinase-mcq', mcq({
  stem: 'Bottled apple juice is made clear instead of cloudy by treating it with',
  right: 'pectinases and proteases',
  wrong: ['lipases and streptokinase', 'statins', 'cyclosporin A'],
  sol: 'Pectinases and proteases clarify fruit juices — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('beverage-mcq', mcq({
  stem: 'A student lists wine, beer, whisky and rum. Which pair is produced by distilling the fermented broth?',
  right: 'Whisky and rum',
  wrong: ['Wine and beer', 'Wine and whisky', 'Beer and rum'],
  sol: 'Whisky, brandy and rum are distilled; wine and beer are not — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('penicillin-ar', ar({
  a: 'Penicillin was discovered by Alexander Fleming.',
  r: 'Fleming saw that a mould growing on a culture of Staphylococcus stopped the bacteria from growing around it.',
  key: 'a',
  sol: 'Both are true, and the observation explains how the discovery was made — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('clot-fill', fill({
  stem: 'The “clot buster” produced by Streptococcus and modified by genetic engineering is called ______.',
  acc: [['streptokinase']],
  sol: 'Streptokinase.',
  d: 1, c: 'recall', t: [2],
}));
{
  const f = ferment(45);
  add('ethanol-num', num({
    stem: 'Yeast ferments glucose: C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂ (molar masses: glucose 180, ethanol 46). What mass of ethanol, in grams, can be obtained from 45 g of glucose?',
    value: f.ethanol, tol: 0.05, unit: 'g',
    sol: r`Ethanol $= 45 \times \dfrac{2 \times 46}{180} = ${f.ethanol}$ g.`,
    scheme: [[`${f.ethanol} g`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 23 || 'value');
}
add('antibiotic-short', short({
  marks: 2,
  stem: 'What are antibiotics? Describe how penicillin was discovered and developed.',
  model: '**Antibiotics** are chemicals produced by some microbes that **kill or retard the growth** of other, disease-causing microbes. **Alexander Fleming** noticed that a mould, ***Penicillium notatum***, growing on a culture plate of ***Staphylococcus***, stopped the bacteria growing around it. **Ernst Chain and Howard Florey** later established its full potential as a medicine.',
  sol: 'Definition and history.',
  scheme: [['Definition', 1], ['Fleming; Chain and Florey', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('medicines-short', short({
  marks: 3,
  stem: 'Name the microbial source and medical use of (i) streptokinase, (ii) cyclosporin A and (iii) statins.',
  model: '(i) **Streptokinase** — from the bacterium ***Streptococcus*** (modified by genetic engineering); used as a **clot buster** to remove clots from blood vessels after a **heart attack**. (ii) **Cyclosporin A** — from the fungus ***Trichoderma polysporum***; an **immunosuppressant** for **organ-transplant** patients. (iii) **Statins** — from the yeast ***Monascus purpureus***; **lower blood cholesterol** by inhibiting the enzyme for its synthesis.',
  sol: 'Three molecules.',
  scheme: [['Streptokinase', 1], ['Cyclosporin A', 1], ['Statins', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('fermentation-short', short({
  marks: 3,
  stem: 'A small company plans to make (i) vinegar, (ii) a lemon-flavoured soft-drink acid and (iii) fuel ethanol. Name the microbe it should grow for each and the product formed.',
  model: '(i) **Vinegar** — the bacterium ***Acetobacter aceti***, which produces **acetic acid**. (ii) **Soft-drink acid** — the fungus ***Aspergillus niger***, which produces **citric acid**. (iii) **Fuel ethanol** — the yeast ***Saccharomyces cerevisiae***, which **ferments sugars to ethanol** and carbon dioxide. Each is grown on a large scale in **fermentors**.',
  sol: 'Three microbes.',
  scheme: [['Acetobacter: acetic acid', 1], ['Aspergillus niger: citric acid', 1], ['Saccharomyces: ethanol', 1]],
  d: 3, c: 'application', t: [2],
}));
add('industry-long', long({
  stem: '(a) Distinguish between beverages produced with and without distillation, naming the microbe used. [1]\n(b) Name the microbes that produce citric acid, acetic acid, butyric acid and lactic acid. [2]\n(c) State the uses of lipases, pectinases and statins. [2]',
  model: '(a) ***Saccharomyces cerevisiae*** (brewer’s yeast) ferments malted cereals and fruit juices; **wine and beer** are produced **without distillation**, while **whisky, brandy and rum** are made by **distilling** the fermented broth.\n\n(b) **Citric acid** — ***Aspergillus niger***; **acetic acid** — ***Acetobacter aceti***; **butyric acid** — ***Clostridium butylicum***; **lactic acid** — ***Lactobacillus***.\n\n(c) **Lipases** — in **detergents** to remove **oily stains**; **pectinases** (with proteases) — to **clarify bottled fruit juices**; **statins** — to **lower blood cholesterol**.',
  sol: 'Beverages; acids; enzymes.',
  scheme: [['(a) Distilled vs not; yeast', 1], ['(b) Four acids', 2], ['(c) Three uses', 2]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 sewage treatment
add('floc-mcq', mcq({
  stem: 'In the aeration tank of a sewage treatment plant, air is pumped in continuously. What is the main purpose?',
  right: 'To let aerobic microbes grow into flocs that consume organic matter',
  wrong: ['To let methanogens produce biogas', 'To remove grit by sedimentation', 'To kill all microbes in the sewage'],
  sol: 'Aeration supports aerobic flocs that reduce BOD — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('bod-mcq', mcq({
  stem: 'River water sample P has a BOD of 8 mg/L and sample Q a BOD of 45 mg/L. What can be concluded?',
  right: 'Q contains more organic matter and is more polluted than P.',
  wrong: ['P is more polluted because it has less oxygen demand.', 'Q contains more dissolved oxygen than P.', 'Both are equally polluted, as BOD does not measure pollution.'],
  sol: 'Higher BOD means more organic matter to oxidise — greater polluting potential — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('primary-ar', ar({
  a: 'Primary treatment of sewage does not reduce its organic matter as much as secondary treatment does.',
  r: 'Primary treatment removes particles physically by filtration and sedimentation, while secondary treatment uses microbes that consume dissolved organic matter.',
  key: 'a',
  sol: 'Both are true, and the physical versus biological nature of the two stages explains the difference — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('gangaplan-mcq', mcq({
  stem: 'The Ganga Action Plan and Yamuna Action Plan were begun mainly to',
  right: 'build sewage treatment plants so that only treated sewage enters these rivers',
  wrong: ['introduce Gambusia fish into the rivers', 'build biogas plants on the river banks', 'spray Bt spores along the rivers'],
  sol: 'The action plans aimed to save rivers from pollution by treating sewage — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
{
  const f = pctFall(280, 21);
  add('bodfall-num', num({
    stem: 'Raw sewage entering a plant has a BOD of 280 mg/L, and the effluent leaving it has a BOD of 21 mg/L. By what percentage has the BOD fallen? (One decimal place.)',
    value: f, tol: 0.05, unit: '%',
    sol: r`Fall $= \dfrac{280 - 21}{280} \times 100 = ${f}$ percent.`,
    scheme: [[`${f}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 92.5 || 'value');
}
add('bod-short', short({
  marks: 2,
  stem: 'Define BOD. Why does untreated sewage with a high BOD kill fish when it is discharged into a river?',
  model: '**BOD** is the amount of **oxygen** that would be consumed if all the **organic matter in one litre of water** were oxidised by bacteria. Sewage with high BOD lets bacteria multiply on its organic matter and **use up the dissolved oxygen** of the river, so **fish suffocate**.',
  sol: 'Definition; oxygen depletion.',
  scheme: [['Definition', 1], ['Bacteria deplete dissolved oxygen; fish die', 1]],
  d: 2, c: 'application', t: [3],
}));
add('sewage-short', short({
  marks: 3,
  stem: 'Describe the primary and secondary treatment of sewage.',
  model: '**Primary treatment** is physical: **floating debris** is removed by **sequential filtration** and **grit** by **sedimentation**; settled solids form **primary sludge**, and the **effluent** goes on. **Secondary treatment** is biological: the effluent is **aerated** in large tanks so **aerobic microbes** grow into **flocs** that consume organic matter and **reduce BOD**. The effluent then passes to a **settling tank**, where flocs settle as **activated sludge**.',
  sol: 'Primary and secondary.',
  scheme: [['Primary: filtration and sedimentation', 1], ['Secondary: aeration and flocs; BOD falls', 1], ['Settling: activated sludge', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('activated-short', short({
  marks: 3,
  stem: 'In a sewage plant, a small part of the activated sludge is pumped back into the aeration tank, while most is pumped into anaerobic sludge digesters. Explain the reason for each step.',
  model: 'The returned sludge acts as an **inoculum**: it is rich in the **aerobic microbes (flocs)** that digest organic matter, so fresh effluent is treated **quickly**. The rest goes to **anaerobic digesters**, where **anaerobic bacteria** digest the bacteria and fungi in the sludge, reducing its bulk and producing **biogas** (**methane, hydrogen sulphide, carbon dioxide**), which can be used as fuel.',
  sol: 'Inoculum; anaerobic digestion.',
  scheme: [['Returned as inoculum of flocs', 1], ['Anaerobic digestion of sludge', 1], ['Biogas produced', 1]],
  d: 3, c: 'application', t: [3],
}));
add('river-short', short({
  marks: 3,
  stem: 'BOD was measured at three points along a river: 4 mg/L upstream of a town, 38 mg/L just below an outlet of untreated sewage, and 9 mg/L ten kilometres further downstream. Interpret these values and suggest what the town should do.',
  model: 'Upstream the water is **clean** (low BOD). Below the outlet the **organic matter** in sewage raises the BOD sharply, so bacteria use up **dissolved oxygen** — harmful to fish. Downstream the BOD falls as **microbes in the river** gradually decompose the organic matter (**self-purification**) and the sewage is **diluted**. The town should build a **sewage treatment plant** so that only treated, low-BOD effluent is released.',
  sol: 'Clean, polluted, recovering; build STP.',
  scheme: [['Upstream clean; outlet polluted', 1], ['Downstream decomposition and dilution', 1], ['Build sewage treatment plant', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('sewage-long', long({
  stem: '(a) With the help of a flow diagram, describe the treatment of sewage in a sewage treatment plant. [3]\n(b) What is meant by BOD? [1]\n(c) Why is the effluent tested for BOD before it is released into a river? [1]',
  model: '(a) **Raw sewage → primary treatment** (filtration removes floating debris; sedimentation removes grit; **primary sludge** settles) **→ effluent → aeration tank** (aerobic microbes form **flocs** that consume organic matter; BOD falls) **→ settling tank** (flocs settle as **activated sludge**; part returned as **inoculum**, rest to **anaerobic sludge digesters** producing **biogas**) **→ treated effluent** to the river.\n\n(b) **BOD** is the amount of **oxygen consumed** if all the **organic matter in one litre** of water is oxidised by bacteria.\n\n(c) Only if the BOD has fallen enough will the effluent **not deplete** the river’s **dissolved oxygen** and harm aquatic life.',
  sol: 'Flow; BOD; testing.',
  scheme: [['(a) Primary treatment', 1], ['(a) Secondary treatment with flocs', 1], ['(a) Activated sludge and digesters', 1], ['(b) BOD defined', 1], ['(c) Protect river oxygen', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
  assets: [stpFig],
}));

// ---------------------------------------------------------------- t04 biogas
add('methanogen-mcq', mcq({
  stem: 'Methanogens such as Methanobacterium are found naturally in',
  right: 'anaerobic sludge and the rumen of cattle',
  wrong: ['aerated tanks of sewage plants', 'the leaves of legumes', 'the stomach of humans only'],
  sol: 'Methanogens grow anaerobically on cellulose in sludge and the cattle rumen — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('rumen-mcq', mcq({
  stem: 'Why is cattle dung (gobar) the usual raw material for a village biogas plant?',
  right: 'It is rich in methanogens from the rumen and in partly digested cellulose.',
  wrong: ['It contains free oxygen needed for methane formation.', 'It is rich in Rhizobium that fixes methane.', 'It is sterile, so no microbes interfere.'],
  sol: 'Dung carries methanogens and cellulose for anaerobic digestion — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('biogas-ar', ar({
  a: 'The gas holder of a biogas plant floats on the slurry and rises as gas is produced.',
  r: 'Biogas consists mainly of carbon dioxide.',
  key: 'c',
  sol: 'A is true; R is false: biogas is mainly methane — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('methane-fill', fill({
  stem: 'The main fuel gas in biogas, produced by methanogens, is ______.',
  acc: [['methane', 'CH4', 'CH₄']],
  sol: 'Methane.',
  d: 1, c: 'recall', t: [4],
}));
{
  const g = biogasLitres(35);
  add('gas-num', num({
    stem: 'Fresh cattle dung yields about 40 litres of biogas per kilogram. How many litres of biogas would 35 kg of dung give?',
    value: g, unit: 'L',
    sol: r`Biogas $= 35 \times 40 = ${g}$ litres.`,
    scheme: [[`${g}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 1400 || 'value');
}
add('methanogen-short', short({
  marks: 2,
  stem: 'What are methanogens? Name one, and state where methanogens are found in nature.',
  model: '**Methanogens** are bacteria that grow **anaerobically on cellulosic material** and produce large amounts of **methane** (with carbon dioxide and hydrogen). Example: ***Methanobacterium***. They are found in **anaerobic sludge** of sewage plants and in the **rumen of cattle**.',
  sol: 'Definition, example, habitats.',
  scheme: [['Definition and example', 1], ['Habitats', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('biogasplant-short', short({
  marks: 3,
  stem: 'Describe the structure and working of a biogas plant.',
  model: 'A **concrete tank (10–15 feet deep)** receives bio-wastes and a **slurry of cattle dung** through an **inlet**. **Methanogens** in the dung digest it **anaerobically**, producing biogas. A **floating cover (gas holder)** over the slurry **rises** as gas collects; an **outlet pipe** supplies gas to houses for **cooking and lighting**. **Spent slurry** leaves by another outlet and is used as **fertiliser**.',
  sol: 'Tank, cover, outlets.',
  scheme: [['Tank and dung slurry', 1], ['Anaerobic digestion; floating cover', 1], ['Gas pipe and spent slurry', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('biogas-long', long({
  stem: '(a) Name the gases in biogas and the group of microbes that produces it. [1]\n(b) With a labelled diagram, describe a biogas plant. [3]\n(c) Give two advantages of a biogas plant for a village. [1]',
  model: '(a) Mainly **methane**, with **carbon dioxide** and **hydrogen sulphide**; produced by **methanogens** (such as *Methanobacterium*).\n\n(b) **Diagram:** a **digester** — concrete tank 10–15 feet deep — fed through an **inlet** with **dung slurry**; a **floating gas holder** that rises as gas collects; a **gas outlet** pipe to houses; an **outlet** for **spent slurry**. Anaerobic methanogens digest the cellulose in the dung, releasing biogas.\n\n(c) It gives **clean fuel** for cooking and lighting, reducing **firewood** use and smoke; the **spent slurry** is a good **fertiliser** (and waste is disposed of hygienically).',
  sol: 'Gases; plant; advantages.',
  scheme: [['(a) Gases and methanogens', 1], ['(b) Labelled plant', 2], ['(b) Working', 1], ['(c) Two advantages', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
  assets: [biogasFig],
}));

// ---------------------------------------------------------------- t05 biocontrol and IPM
add('ladybird-mcq', mcq({
  stem: 'Aphids are damaging the vegetables in a greenhouse. Which biocontrol agent should the gardener release?',
  right: 'Ladybird beetles',
  wrong: ['Dragonflies', 'Methanogens', 'Rhizobium'],
  sol: 'Ladybirds feed on aphids — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('bt-ar', ar({
  a: 'Spores of Bacillus thuringiensis sprayed on cabbage kill caterpillars that feed on the leaves.',
  r: 'The Bt toxin is released in the gut of the caterpillar and kills the larva.',
  key: 'a',
  sol: 'Both are true, and release of the toxin in the larval gut explains the killing — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('baculo-mcq', mcq({
  stem: 'Which biocontrol agents are best suited to integrated pest management in an ecologically sensitive area, because they are species-specific and harm no non-target organisms?',
  right: 'Baculoviruses of the genus Nucleopolyhedrovirus',
  wrong: ['Broad-spectrum chemical insecticides', 'Methanogens', 'Statins'],
  sol: 'Baculoviruses are narrow-spectrum, species-specific insect pathogens — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('trichoderma-mcq', mcq({
  stem: 'Trichoderma species are used in agriculture as',
  right: 'free-living fungi that control several plant pathogens in the root zone',
  wrong: ['nitrogen-fixing bacteria in root nodules', 'viruses that kill caterpillars', 'yeasts that make statins'],
  sol: 'Trichoderma are biocontrol fungi against plant pathogens — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('nucleo-fill', fill({
  stem: 'Baculoviruses used in biological control of insects mostly belong to the genus ______.',
  acc: [['Nucleopolyhedrovirus']],
  sol: 'Nucleopolyhedrovirus.',
  d: 2, c: 'recall', t: [5],
}));
add('biocontrol-short', short({
  marks: 2,
  stem: 'A farmer’s cabbages are attacked by caterpillars and her pond breeds mosquitoes. Suggest one biocontrol agent for each problem and explain how it works.',
  model: '**Caterpillars:** spray spores of ***Bacillus thuringiensis***; when caterpillars eat them, the **toxin is released in their gut** and kills them. **Mosquitoes:** encourage **dragonflies** (or Gambusia fish), which **feed on mosquitoes** and their larvae.',
  sol: 'Bt; dragonflies.',
  scheme: [['Bt with mechanism', 1], ['Dragonflies with action', 1]],
  d: 2, c: 'application', t: [5],
}));
add('ipm-short', short({
  marks: 3,
  stem: 'Why does an organic farmer prefer to keep pests under control rather than eradicate them? Explain with an example, and name two biological methods used in integrated pest management.',
  model: 'Pests are part of a **food web**: if they are wiped out, the **predators and parasites** that feed on them, such as **ladybirds** that eat aphids, also disappear, and the **balance** of the ecosystem is lost. Keeping pests at **manageable levels** keeps these natural enemies working. Biological methods: release of **predators** (ladybirds, dragonflies), and microbes such as **Bacillus thuringiensis**, **Trichoderma** or **baculoviruses**.',
  sol: 'Food web balance; methods.',
  scheme: [['Natural enemies depend on pests', 1], ['Example', 1], ['Two biological methods', 1]],
  d: 3, c: 'application', t: [5],
}));
add('pesticide-short', short({
  marks: 3,
  stem: 'A village has used heavy doses of chemical insecticides for years. Describe three harmful effects this is likely to have caused.',
  model: '(i) **Toxicity:** residues are **toxic** to farmers, animals and consumers. (ii) **Loss of useful organisms:** insecticides kill **predators, pollinators** and other useful insects along with pests. (iii) **Pollution and resistance:** chemicals contaminate **soil, water and food** and may **biomagnify** in food chains; pests also become **resistant**, so ever larger doses are needed.',
  sol: 'Three effects.',
  scheme: [['Toxicity', 1], ['Useful organisms killed', 1], ['Pollution or resistance', 1]],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 biofertilisers
add('glomus-mcq', mcq({
  stem: 'A crop on phosphorus-poor soil grows better when its roots are inoculated with a fungus. Which fungus is most likely used, and how does it help?',
  right: 'Glomus, which forms mycorrhiza and absorbs phosphorus for the plant',
  wrong: ['Trichoderma, which fixes nitrogen', 'Aspergillus, which makes citric acid in the soil', 'Penicillium, which kills soil bacteria'],
  sol: 'Mycorrhizal Glomus improves phosphorus uptake — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('rhizobium-mcq', mcq({
  stem: 'Farmers often grow a legume such as gram between two cereal crops. The soil benefits mainly because',
  right: 'Rhizobium in the legume’s root nodules fixes atmospheric nitrogen',
  wrong: ['legume roots make statins', 'methanogens in the nodules make biogas', 'the legume produces penicillin'],
  sol: 'Symbiotic Rhizobium enriches soil nitrogen — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('cyano-mcq', mcq({
  stem: 'Which organisms are used as biofertilisers in flooded paddy fields, where they fix nitrogen and add organic matter?',
  right: 'Cyanobacteria such as Anabaena and Nostoc',
  wrong: ['Methanogens such as Methanobacterium', 'Fungi such as Glomus', 'Viruses such as baculoviruses'],
  sol: 'Cyanobacteria are autotrophic nitrogen fixers in paddy — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('glomus-ar', ar({
  a: 'Plants with mycorrhiza tolerate drought and salinity better.',
  r: 'Azotobacter is a free-living nitrogen-fixing bacterium.',
  key: 'b',
  sol: 'Both are true, but Azotobacter’s nitrogen fixation does not explain the benefits of mycorrhizal fungi — option (b).',
  d: 3, c: 'understanding', t: [6],
}));
add('paddy-short', short({
  marks: 1,
  stem: 'Give a reason: farmers growing rice are encouraged to add blue-green algae to their fields.',
  model: 'Cyanobacteria (blue-green algae) **fix atmospheric nitrogen** and add **organic matter**, reducing the need for **chemical fertiliser**.',
  sol: 'Nitrogen fixation.',
  scheme: [['Fix nitrogen; add organic matter', 1]],
  d: 2, c: 'application', t: [6],
}));
add('biofert-short', short({
  marks: 2,
  stem: 'What are biofertilisers? Name one symbiotic and one free-living nitrogen-fixing bacterium.',
  model: '**Biofertilisers** are **organisms that enrich the nutrient quality of soil**, such as nitrogen-fixing bacteria, mycorrhizal fungi and cyanobacteria. Symbiotic: ***Rhizobium*** in the **root nodules of legumes**. Free-living: ***Azotobacter*** (or ***Azospirillum***).',
  sol: 'Definition; examples.',
  scheme: [['Definition', 1], ['Rhizobium and Azotobacter', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('biofert3-short', short({
  marks: 3,
  stem: 'Explain how Rhizobium, Glomus and Anabaena each improve the growth of crops.',
  model: '***Rhizobium*** forms **root nodules** on legumes and **fixes atmospheric nitrogen** into compounds the plant uses. ***Glomus*** forms **mycorrhiza** with roots, **absorbing phosphorus** for the plant and giving resistance to **root pathogens** and tolerance of **drought and salinity**. ***Anabaena***, a **cyanobacterium**, **fixes nitrogen** in **paddy fields** and adds **organic matter**.',
  sol: 'Three biofertilisers.',
  scheme: [['Rhizobium', 1], ['Glomus', 1], ['Anabaena', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('organic-long', long({
  stem: '(a) Explain the role of biofertilisers in organic farming, with three examples. [2]\n(b) Describe how Bacillus thuringiensis and baculoviruses are used to control pests. [2]\n(c) Give one reason why organic farming reduces pollution. [1]',
  model: '(a) Biofertilisers **enrich soil nutrients** without chemicals: ***Rhizobium*** fixes **nitrogen** in legume nodules; ***Azotobacter*** fixes nitrogen **freely** in soil; ***Glomus*** (mycorrhiza) supplies **phosphorus**; **cyanobacteria** fix nitrogen in **paddy**.\n\n(b) **Bt** spores are **sprayed** on crops; caterpillars eating them release the **toxin in their gut** and die. **Baculoviruses** (*Nucleopolyhedrovirus*) infect and kill **specific insect pests**, sparing other organisms — ideal for **IPM**.\n\n(c) It avoids **chemical fertilisers and pesticides**, so there are **no toxic residues** to pollute soil, water and food or to **biomagnify**.',
  sol: 'Biofertilisers; biocontrol; pollution.',
  scheme: [['(a) Role with three examples', 2], ['(b) Bt', 1], ['(b) Baculoviruses', 1], ['(c) No chemical residues', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [5, 6],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const S = [['Inlet (raw sewage)', 320], ['After primary treatment', 210], ['Aeration tank outlet', 40], ['Final effluent', 16]];
  const fall = pctFall(S[0][1], S[3][1]);
  const o2 = oxygenDemand(S[3][1], 1000);
  add('stp-case', mk.case({
    passage: `A city sewage plant recorded the following BOD values one morning.\n\n| Sampling point | BOD (mg/L) |\n|---|---|\n${S.map(([p, v]) => `| ${p} | ${v} |`).join('\n')}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What is the overall percentage fall in BOD from the inlet to the final effluent?',
        value: fall, tol: 0.05, unit: '%',
        sol: r`$\dfrac{${S[0][1]} - ${S[3][1]}}{${S[0][1]}} \times 100 = ${fall}$ percent.`,
        scheme: [[`${fall}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'In which stage does the BOD fall most, and why?',
        right: 'In the aeration tank, because microbial flocs consume dissolved organic matter',
        wrong: ['In primary treatment, because grit is removed', 'In the final effluent, because it is diluted by rain', 'In the inlet, because sewage settles there'],
        sol: 'The largest fall (210 to 40) is due to biological secondary treatment — option (@K).',
        d: 3, c: 'analysis', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: `How much oxygen (in mg) would the organic matter in 1000 litres of the final effluent consume, and why is releasing it acceptable?`,
        model: `Oxygen = ${S[3][1]} × 1000 = **${o2} mg**. This is a **low BOD**; the small amount of organic matter will be decomposed without seriously **depleting the river’s dissolved oxygen**, especially after **dilution**.`,
        sol: `${o2} mg; low BOD.`,
        scheme: [[`${o2} mg`, 1], ['Low BOD; river oxygen not depleted', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'If the air pumps of the aeration tank broke down for two days, how would the BOD of the final effluent change, and why?',
          model: 'The BOD would **rise**, because without air the **aerobic flocs** cannot grow and **consume organic matter**, so more organic matter passes through to the effluent.',
          sol: 'BOD rises.',
          scheme: [['BOD rises', 1], ['Aerobic flocs cannot act', 1]],
          d: 3, c: 'analysis', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 95 || 'value');
}
{
  const Y = { control: 2400, rhizo: 2760, both: 3000 };
  const g1 = Math.round(((Y.rhizo - Y.control) / Y.control) * 1000) / 10;
  add('field-case', mk.case({
    passage: `An agricultural student grew a pulse crop in three plots of equal size with no chemical fertiliser.\n\n| Plot | Treatment | Yield (kg per hectare) |\n|---|---|---|\n| A | None | ${Y.control} |\n| B | Seeds coated with Rhizobium | ${Y.rhizo} |\n| C | Rhizobium + Glomus (mycorrhiza) | ${Y.both} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'By what percentage did Rhizobium alone increase the yield compared with plot A?',
        value: g1, tol: 0.05, unit: '%',
        sol: r`$\dfrac{${Y.rhizo} - ${Y.control}}{${Y.control}} \times 100 = ${g1}$ percent.`,
        scheme: [[`${g1}`, 1]],
        d: 2, c: 'application', t: [6],
      })),
      part('b', mcq({
        stem: 'Which best explains the further gain in plot C over plot B?',
        right: 'Glomus improved phosphorus uptake by the roots.',
        wrong: ['Glomus fixed extra nitrogen in root nodules.', 'Glomus killed caterpillars on the leaves.', 'Glomus produced biogas in the soil.'],
        sol: 'Mycorrhizal fungi absorb phosphorus for the plant — option (@K).',
        d: 3, c: 'analysis', t: [6],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why must the three plots be of equal size and receive the same water and no chemical fertiliser?',
        model: 'So that the **only difference** between plots is the **biofertiliser treatment**. Then any difference in yield can be **attributed to Rhizobium and Glomus**, not to other factors such as **water or fertiliser**.',
        sol: 'Controlled variables.',
        scheme: [['Single variable', 1], ['Yield difference due to biofertilisers', 1]],
        d: 3, c: 'analysis', t: [6],
      }), [
        short({
          marks: 2,
          stem: 'Give two advantages of using biofertilisers instead of chemical fertilisers.',
          model: 'They are **cheap and renewable**, and they **do not pollute** soil and water or leave **residues**; mycorrhizae also give plants **resistance to root pathogens** and **tolerance of drought and salinity**.',
          sol: 'Advantages.',
          scheme: [['First advantage', 1], ['Second advantage', 1]],
          d: 2, c: 'understanding', t: [6],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 15 || 'value');
}
