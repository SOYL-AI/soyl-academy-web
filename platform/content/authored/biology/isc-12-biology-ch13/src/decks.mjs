// ISC 12 Biology ch13 Microbes in Human Welfare — Part 1 (t01–t02), Part 2 (t03–t06).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { STP, BOD, BIOGAS, CURD, BIOCONTROL } from './svgs.mjs';
import { STAGES, pctFall, oxygenDemand, cellsAfter, curdPH, biogasLitres, ferment } from './calc.mjs';

export const V = {
  stp: svgV(STP, 'Flow of a sewage treatment plant through primary and secondary treatment'),
  bod: svgV(BOD, 'Bar chart of BOD falling through the stages of sewage treatment'),
  biogas: svgV(BIOGAS, 'A biogas plant with digester, floating gas holder, inlet and outlet'),
  curd: svgV(CURD, 'Curve of milk pH falling as Lactobacillus makes lactic acid'),
  biocontrol: svgV(BIOCONTROL, 'Biocontrol agents linked to the pests they control'),
};

// ---------------------------------------------------------------- computed numbers
export const LAB = { n0: 1000, t: 6, d: 1 };
export const LAB_N = cellsAfter(LAB.n0, LAB.t, LAB.d);
export const F = ferment(90);
export const BOD_FALL = pctFall(STAGES[0][1], STAGES[2][1]);
export const O2 = oxygenDemand(STAGES[0][1], 5);
export const GAS = biogasLitres(25);

export const deck1 = deck({
  part: 1,
  title: 'Microbes in Human Welfare — Part 1: Microbes at home and in industry',
  goals: [
    'Explain the role of Lactobacillus, Saccharomyces and Propionibacterium in household products',
    'Name microbes used to make beverages, antibiotics, organic acids, alcohol and enzymes',
    'State the sources and uses of streptokinase, cyclosporin A and statins',
  ],
  slides: [
    sl('title', 'Useful microbes', {
      b: 'Part 1 — the bacteria and fungi that make our curd, bread and cheese, and the medicines and chemicals of industry.',
      v: flow('LR', [['h', 'Household products'], ['i', 'Industrial fermentation'], ['m', 'Medicines and enzymes']], [['h', 'i'], ['i', 'm']], 'Flow from household uses to industrial fermentation to medicines and enzymes'),
      n: 'Not all microbes cause disease. Many are used every day, in our kitchens and in large factories, to make food, drinks, medicines and chemicals.',
    }),
    sl('concept', 'Microbes in household products', {
      b: 'Fermentation by microbes changes the taste, texture and nutritive value of food.',
      v: table(['Product', 'Microbe', 'What it does'], [['Curd', 'Lactobacillus (lactic acid bacteria)', 'Makes lactic acid that coagulates and partly digests milk proteins; adds vitamin B12'], ['Bread', 'Saccharomyces cerevisiae (baker’s yeast)', 'Ferments sugar in dough; carbon dioxide makes it rise'], ['Idli and dosa batter', 'Bacteria', 'Fermentation; carbon dioxide puffs the batter'], ['Toddy', 'Yeasts and bacteria', 'Ferments palm sap'], ['Swiss cheese', 'Propionibacterium sharmanii', 'Large holes from carbon dioxide'], ['Roquefort cheese', 'Specific fungi', 'Ripening and flavour']], 'Table of household products and the microbes that make them'),
      n: 'A spoonful of curd added to warm milk supplies lactic acid bacteria that turn the milk into curd. Yeast makes bread rise, and a bacterium called Propionibacterium makes the large holes in Swiss cheese.',
    }),
    sl('diagram', 'How milk becomes curd', {
      b: `**Lactobacillus** and other **lactic acid bacteria (LAB)** multiply in warm milk and make **lactic acid**. The **pH falls** from about ${curdPH(0)} to about ${curdPH(12)}, and milk proteins **coagulate**.`,
      v: V.curd,
      n: 'At first little changes, then the acid builds up quickly as the bacteria multiply, and finally the curve levels off when the curd has set. In the stomach, lactic acid bacteria also help to check disease-causing microbes.',
    }),
    sl('example', 'Worked example 1: multiplying lactic acid bacteria', {
      b: `A starter adds about ${LAB.n0} lactic acid bacteria per millilitre to warm milk. If they double every ${LAB.d} hour, how many are there per millilitre after ${LAB.t} hours?`,
      ul: [
        r`Number of doublings $= \dfrac{${LAB.t}}{${LAB.d}} = ${LAB.t / LAB.d}$.`,
        r`Bacteria $= ${LAB.n0} \times 2^{${LAB.t / LAB.d}} = ${LAB_N}$ per millilitre.`,
        'This rapid growth explains the steep fall in pH in the middle of the curve.',
      ],
      v: table(['Hours', 'Bacteria per mL'], [0, 2, 4, 6].map((h) => [String(h), String(cellsAfter(LAB.n0, h, LAB.d))]), `Worked table: ${LAB_N} bacteria per millilitre after ${LAB.t} hours`),
      n: 'Six doublings multiply the number sixty four times. As the bacteria multiply, they make more and more lactic acid, so the milk sets within a few hours in a warm place but much more slowly in the cold.',
    }),
    sl('check', 'Quick check: cheese', {
      b: 'Which microbe makes the large holes in Swiss cheese?',
      n: 'Quick check. It is a bacterium that releases a gas.',
      chk: 'swiss-mcq',
    }),
    sl('concept', 'Fermented beverages', {
      b: '**Saccharomyces cerevisiae** (**brewer’s yeast**) ferments **malted cereals and fruit juices** to make ethanol.',
      v: table(['Beverage', 'Distilled?'], [['Wine, beer', 'No'], ['Whisky, brandy, rum', 'Yes (distilled after fermentation)']], 'Table of beverages and whether they are distilled'),
      n: 'Wine and beer are made by fermentation alone. Whisky, brandy and rum are distilled after fermentation, which concentrates the alcohol. The same yeast is used in industry to make ethanol for fuel and chemicals.',
    }),
    sl('concept', 'Antibiotics: the story of penicillin', {
      b: '**Antibiotics** are chemicals produced by some microbes that **kill or retard the growth** of other, disease-causing microbes. **Alexander Fleming** noticed that a mould, **Penicillium notatum**, growing on a culture of **Staphylococcus** stopped the bacteria growing around it. **Ernst Chain and Howard Florey** later established its full potential.',
      v: table(['Point', 'Detail'], [['Discoverer', 'Alexander Fleming'], ['Producer', 'Penicillium notatum (a fungus)'], ['Developed by', 'Ernst Chain and Howard Florey'], ['Impact', 'Treated wounded soldiers in World War II; reduced deaths from plague, whooping cough, diphtheria and leprosy']], 'Table about the discovery of penicillin'),
      n: 'A chance contamination led to the first antibiotic. Penicillin saved many lives in the Second World War, and antibiotics have since greatly reduced deaths from bacterial diseases.',
    }),
    sl('concept', 'Organic acids, alcohol and enzymes', {
      b: 'Microbes are grown in large vessels to produce useful chemicals.',
      v: table(['Product', 'Microbe', 'Use'], [['Citric acid', 'Aspergillus niger (fungus)', 'Food and drinks'], ['Acetic acid', 'Acetobacter aceti (bacterium)', 'Vinegar'], ['Butyric acid', 'Clostridium butylicum (bacterium)', 'Industry'], ['Lactic acid', 'Lactobacillus (bacterium)', 'Food'], ['Ethanol', 'Saccharomyces cerevisiae (yeast)', 'Fuel, chemicals'], ['Lipases', 'Microbes', 'Detergents, removing oily stains'], ['Pectinases and proteases', 'Microbes', 'Clearing bottled fruit juices']], 'Table of organic acids, alcohol and enzymes with microbes and uses'),
      n: 'Fungi such as Aspergillus and bacteria such as Acetobacter are grown in bulk to make acids for food. Lipases in detergents digest oily stains, and pectinases and proteases make bottled juices clear.',
    }),
    sl('concept', 'Bioactive molecules for medicine', {
      b: 'Some microbial products act directly on the human body.',
      v: table(['Molecule', 'Microbe', 'Use'], [['Streptokinase', 'Streptococcus (modified by genetic engineering)', '“Clot buster”: removes clots in blood vessels of heart-attack patients'], ['Cyclosporin A', 'Trichoderma polysporum (fungus)', 'Immunosuppressant in organ transplants'], ['Statins', 'Monascus purpureus (yeast)', 'Lower blood cholesterol by competitively inhibiting the enzyme of cholesterol synthesis']], 'Table of bioactive molecules with microbes and uses'),
      n: 'Streptokinase dissolves clots in patients who have had a heart attack. Cyclosporin A suppresses the immune system so that a transplanted organ is not rejected. Statins compete with the enzyme that makes cholesterol and so lower its level in the blood.',
    }),
    sl('example', 'Worked example 2: products of fermentation', {
      b: `Yeast ferments glucose: C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂ (molar masses 180, 46 and 44). What mass of ethanol and of carbon dioxide can 90 g of glucose give?`,
      ul: [
        r`Ethanol $= 90 \times \dfrac{2 \times 46}{180} = ${F.ethanol}$ g.`,
        r`Carbon dioxide $= 90 \times \dfrac{2 \times 44}{180} = ${F.co2}$ g.`,
        'The **carbon dioxide** raises bread dough; the **ethanol** is the basis of beverages and industrial alcohol.',
      ],
      v: table(['Product', 'Mass from 90 g glucose'], [['Ethanol', `${F.ethanol} g`], ['Carbon dioxide', `${F.co2} g`]], `Worked table: ${F.ethanol} g ethanol and ${F.co2} g carbon dioxide`),
      n: 'Half the mass of glucose ends up as ethanol and the rest as carbon dioxide. In bread-making the gas matters and the little alcohol evaporates in baking; in brewing the alcohol matters.',
    }),
    sl('check', 'Quick check: statins', {
      b: 'Which microbe produces statins?',
      n: 'Quick check. It is a yeast that also gives red rice its colour.',
      chk: 'statin-mcq',
    }),
    sl('check', 'Quick check: penicillin', {
      b: 'Judge the assertion and the reason about penicillin.',
      n: 'Quick check. Who discovered it, and who developed it into a medicine?',
      chk: 'penicillin-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Household: Lactobacillus (curd, vitamin B12), Saccharomyces (bread), Propionibacterium sharmanii (Swiss cheese).',
        'Beverages by Saccharomyces cerevisiae; distilled (whisky, brandy, rum) and undistilled (wine, beer).',
        'Penicillin: Fleming, Penicillium notatum; Chain and Florey.',
        'Acids: Aspergillus niger (citric), Acetobacter aceti (acetic), Clostridium butylicum (butyric), Lactobacillus (lactic).',
        'Enzymes: lipases, pectinases, proteases, streptokinase; cyclosporin A (Trichoderma polysporum), statins (Monascus purpureus).',
      ],
      v: table(['Microbe', 'Product'], [['Aspergillus niger', 'Citric acid'], ['Trichoderma polysporum', 'Cyclosporin A'], ['Monascus purpureus', 'Statins'], ['Streptococcus', 'Streptokinase']], 'Summary table of microbes and products'),
      n: 'To recap: microbes give us curd, bread and cheese at home, and drinks, antibiotics, acids, alcohol, enzymes and important medicines in industry.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn each product with its **microbe’s full scientific name**.',
        'Give the **use** of streptokinase, cyclosporin A and statins.',
        'Say which beverages are **distilled**.',
        'Mention **vitamin B12** when explaining why curd is nutritious.',
      ],
      n: 'Exam tips. Write the full scientific name of each microbe. Learn the uses of the three medical molecules. Know which drinks are distilled. And remember that curd gains vitamin B twelve.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Microbes in Human Welfare — Part 2: Sewage, biogas, biocontrol and biofertilisers',
  goals: [
    'Describe primary and secondary treatment of sewage and the meaning of BOD',
    'Describe methanogens, the composition of biogas and the working of a biogas plant',
    'Explain biocontrol, integrated pest management, the harm of chemical pesticides, and biofertilisers',
  ],
  slides: [
    sl('title', 'Microbes for a cleaner environment', {
      b: 'Part 2 — microbes that clean sewage, make fuel, control pests and feed crops.',
      v: flow('LR', [['s', 'Sewage treatment'], ['b', 'Biogas'], ['c', 'Biocontrol'], ['f', 'Biofertilisers']], [['s', 'b'], ['b', 'c'], ['c', 'f']], 'Flow from sewage treatment to biogas to biocontrol to biofertilisers'),
      n: 'Cities produce huge volumes of waste water, and farms use large amounts of chemicals. Microbes can clean the water, turn waste into fuel, control pests and supply nutrients, reducing pollution.',
    }),
    sl('diagram', 'Sewage treatment', {
      b: '**Primary treatment** is physical: floating debris is removed by **filtration**, and grit and soil by **sedimentation**, leaving **primary sludge**. **Secondary (biological) treatment**: the effluent is **aerated**, and **aerobic microbes** grow as **flocs** — masses of bacteria with fungal filaments — that consume organic matter.',
      v: V.stp,
      n: 'The flocs settle in a tank as activated sludge. A little is returned to the aeration tank as an inoculum; the rest goes to anaerobic sludge digesters, where other bacteria digest it and produce biogas. The cleaned effluent goes to rivers.',
    }),
    sl('diagram', 'Biochemical oxygen demand', {
      b: '**BOD** is the amount of **oxygen** that would be consumed if all the **organic matter** in **one litre** of water were oxidised by bacteria. The **higher the BOD**, the **more polluting** the water.',
      v: V.bod,
      n: 'Secondary treatment continues until the BOD of the sewage has fallen a great deal. A low BOD shows that little organic matter remains, so the effluent will not use up the oxygen in the river it enters.',
    }),
    sl('example', 'Worked example 1: how much did treatment help?', {
      b: `In the model plant, raw sewage has a BOD of ${STAGES[0][1]} mg/L and the final effluent ${STAGES[2][1]} mg/L. Find the percentage fall, and the oxygen that 5 litres of raw sewage would use.`,
      ul: [
        r`Fall $= \dfrac{${STAGES[0][1]} - ${STAGES[2][1]}}{${STAGES[0][1]}} \times 100 = ${BOD_FALL}$ percent.`,
        r`Oxygen for 5 L of raw sewage $= ${STAGES[0][1]} \times 5 = ${O2}$ mg.`,
      ],
      v: table(['Stage', 'BOD (mg/L)'], STAGES.map(([s, v]) => [s, String(v)]), `Worked table: BOD falls by ${BOD_FALL} percent`),
      n: 'Most of the fall comes during secondary treatment, when the microbial flocs feed on organic matter. Untreated sewage would rob a river of oxygen, killing fish.',
    }),
    sl('concept', 'Methanogens and biogas', {
      b: '**Biogas** is a mixture of gases, **mainly methane**, with **carbon dioxide** and some **hydrogen sulphide**, produced by **anaerobic** microbial activity. **Methanogens** such as **Methanobacterium** grow **anaerobically on cellulose**; they live in **anaerobic sludge** and in the **rumen of cattle**.',
      v: table(['Point', 'Detail'], [['Producers', 'Methanogens (Methanobacterium)'], ['Habitats', 'Anaerobic sludge; rumen of cattle; cattle dung (gobar)'], ['Main gas', 'Methane'], ['Other gases', 'Carbon dioxide, hydrogen sulphide'], ['Uses', 'Cooking and lighting']], 'Table about methanogens and biogas'),
      n: 'Bacteria in a cow’s rumen help digest the cellulose of grass, and methanogens among them produce methane. Their dung is rich in these bacteria, which is why cattle dung is the usual raw material for biogas.',
    }),
    sl('diagram', 'The biogas plant', {
      b: 'A **concrete tank** (10–15 feet deep) receives a **slurry of dung**. A **floating cover** rises as gas forms; the gas is piped to houses. **Spent slurry** leaves through an outlet and is used as **fertiliser**. The technology was developed in India by **IARI** and **KVIC**.',
      v: V.biogas,
      n: 'The cover floats on the slurry and rises as gas collects beneath it. The gas goes by pipe to nearby homes for cooking and lighting, and the spent slurry, rich in nutrients, is spread on fields.',
    }),
    sl('example', 'Worked example 2: biogas from dung', {
      b: 'Fresh cattle dung yields about 40 litres of biogas per kilogram. How much gas does a family plant give from 25 kg of dung a day?',
      ul: [
        r`Biogas $= 25 \times 40 = ${GAS}$ litres per day.`,
        'This is roughly enough for the daily cooking of a small family, and the slurry is a free fertiliser.',
      ],
      v: table(['Dung (kg)', 'Biogas (L)'], [10, 25, 50].map((k) => [String(k), String(biogasLitres(k))]), `Worked table: 25 kg of dung gives ${GAS} litres`),
      n: 'Multiply the mass of dung by the yield per kilogram. Biogas plants turn a waste into clean fuel, reduce the burning of firewood, and return nutrients to the soil.',
    }),
    sl('check', 'Quick check: BOD', {
      b: 'What does a high BOD indicate about a water sample?',
      n: 'Quick check. More organic matter means more of what?',
      chk: 'bod-mcq',
    }),
    sl('diagram', 'Biocontrol agents', {
      b: '**Biocontrol** is the use of **biological methods** to control plant diseases and pests. Examples: **ladybirds** (aphids), **dragonflies** (mosquitoes), **Bacillus thuringiensis** (caterpillars), the fungus **Trichoderma** (plant pathogens in roots), and **baculoviruses** of the genus **Nucleopolyhedrovirus** (insects).',
      v: V.biocontrol,
      n: 'Spores of Bacillus thuringiensis are sprayed on plants; caterpillars that eat them release a toxin in their gut and die. Baculoviruses are species-specific, so they kill the target pest without harming other insects.',
    }),
    sl('concept', 'Integrated pest management and the harm of pesticides', {
      b: 'An organic farmer aims to keep pests **under control**, not to eradicate them, using **integrated pest management (IPM)**.',
      v: table(['Chemical pesticides', 'Integrated pest management'], [['Toxic to humans and animals', 'Uses natural predators, parasites and pathogens'], ['Kill useful as well as harmful organisms', 'Species-specific agents spare useful insects'], ['Pollute soil, water and food; biomagnify in food chains', 'No chemical residues'], ['Pests become resistant', 'Combines crop rotation, resistant varieties and minimal, targeted chemicals']], 'Table comparing chemical pesticides with integrated pest management'),
      n: 'Pests are part of a food web. Wiping them out also removes the predators that feed on them. Integrated pest management keeps the web working, using predators, microbes and careful farming practices.',
    }),
    sl('concept', 'Biofertilisers', {
      b: '**Biofertilisers** are organisms that **enrich the nutrient quality of soil**.',
      v: table(['Biofertiliser', 'How it helps'], [['Rhizobium (in root nodules of legumes)', 'Symbiotic fixation of atmospheric nitrogen'], ['Azospirillum, Azotobacter (free-living)', 'Fix nitrogen in the soil'], ['Glomus (mycorrhiza)', 'Absorbs phosphorus for the plant; resistance to root pathogens; tolerance of salinity and drought'], ['Cyanobacteria (Anabaena, Nostoc, Oscillatoria)', 'Fix nitrogen in paddy fields; add organic matter']], 'Table of biofertilisers and their roles'),
      n: 'Rhizobium lives in the root nodules of peas and beans and fixes nitrogen for them. Mycorrhizal fungi such as Glomus pass phosphorus to the plant. Blue-green algae enrich the water of rice fields.',
    }),
    sl('check', 'Quick check: methanogens', {
      b: 'Where are methanogens found in nature?',
      n: 'Quick check. Think of places without oxygen, including inside cattle.',
      chk: 'methanogen-mcq',
    }),
    sl('check', 'Quick check: Bt', {
      b: 'Judge the assertion and the reason about Bacillus thuringiensis.',
      n: 'Quick check. Where does the Bt toxin act?',
      chk: 'bt-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Sewage: primary (filtration, sedimentation; primary sludge), secondary (aeration, flocs, BOD falls; activated sludge; anaerobic digesters).',
        'BOD: oxygen used to oxidise organic matter in one litre of water.',
        'Biogas: mainly methane, with carbon dioxide and hydrogen sulphide; methanogens in sludge and rumen; plant by IARI and KVIC.',
        'Biocontrol: ladybird, dragonfly, Bt, Trichoderma, baculoviruses; IPM avoids the harms of chemical pesticides.',
        'Biofertilisers: Rhizobium, Azospirillum, Azotobacter, Glomus, cyanobacteria.',
      ],
      v: table(['Agent', 'Role'], [['Methanobacterium', 'Biogas'], ['Bacillus thuringiensis', 'Kills caterpillars'], ['Glomus', 'Phosphorus uptake'], ['Rhizobium', 'Nitrogen fixation']], 'Summary table of agents and roles'),
      n: 'To recap: microbes clean sewage, produce biogas from waste, control pests without chemicals, and fertilise soil. Each use reduces pollution and dependence on chemicals.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Describe **primary and secondary** treatment in order, using **flocs** and **activated sludge**.',
        'Define **BOD** precisely and relate it to pollution.',
        'Label the **biogas plant** and name the gases.',
        'Give one example each of a **biocontrol agent** and a **biofertiliser** with its action.',
      ],
      n: 'Exam tips. Describe sewage treatment step by step. Define B O D exactly. Label the biogas plant. And for biocontrol and biofertilisers, give a named organism and what it does.',
    }),
  ],
});
