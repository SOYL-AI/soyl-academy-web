// ch08 Microbes in Human Welfare — question bank. AR keys planned: a b a a a c a.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { pctFall, pct, oxygenDemand, STAGES } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 household and industry
add('lab-mcq', mcq({
  stem: 'Which microbes convert milk into curd?',
  right: 'Lactic acid bacteria such as Lactobacillus',
  wrong: ['Baker’s yeast', 'Aspergillus niger', 'Methanobacterium'],
  sol: 'Lactic acid bacteria produce acids that coagulate and partly digest milk proteins — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('citric-mcq', mcq({
  stem: 'Which microbe is used for the commercial production of citric acid?',
  right: 'Aspergillus niger',
  wrong: ['Acetobacter aceti', 'Clostridium butylicum', 'Lactobacillus'],
  sol: 'The fungus Aspergillus niger produces citric acid; Acetobacter aceti gives acetic acid, Clostridium butylicum butyric acid and Lactobacillus lactic acid — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('fleming-ar', ar({
  a: 'Fleming observed that Staphylococci could not grow in the area around a mould growing on his culture plate.',
  r: 'The mould, Penicillium notatum, produced a substance that inhibits the growth of these bacteria.',
  key: 'a',
  sol: 'Both are true; the substance, penicillin, explains the clear zone around the mould — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('idli-mcq', mcq({
  stem: 'Idli batter left overnight becomes light and puffed up. What causes this?',
  right: 'CO₂ released during fermentation of the batter by bacteria',
  wrong: ['Oxygen released by yeast photosynthesis', 'Steam formed at room temperature', 'Lactic acid evaporating from the batter'],
  sol: 'Bacteria ferment the batter and release carbon dioxide, which puffs it up — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('b12-tf', tf({
  stem: 'Curd is nutritionally better than milk partly because lactic acid bacteria increase its vitamin B₁₂ content.',
  key: 't',
  sol: 'True. LAB increase vitamin B₁₂ and also check disease-causing microbes in the stomach.',
  d: 2, c: 'understanding', t: [1],
}));
add('swiss-mcq', mcq({
  stem: 'A cheese-maker wants a cheese with large holes. Which microbe should be used, and why?',
  right: 'Propionibacterium sharmanii, which produces a large amount of CO₂',
  wrong: ['Lactobacillus, which produces oxygen', 'Penicillium notatum, which produces penicillin', 'Methanobacterium, which produces methane'],
  sol: 'The large holes in Swiss cheese come from CO₂ produced by Propionibacterium sharmanii — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('distil-mcq', mcq({
  stem: 'Which of these beverages is produced by distillation of the fermented broth?',
  right: 'Whisky',
  wrong: ['Wine', 'Beer', 'Toddy'],
  sol: 'Whisky, brandy and rum are distilled; wine and beer are produced without distillation — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('acid-match', match({
  stem: 'Match each organic acid (column I) with the microbe used to produce it (column II).',
  pairs: [
    ['Citric acid', 'Aspergillus niger'],
    ['Acetic acid', 'Acetobacter aceti'],
    ['Butyric acid', 'Clostridium butylicum'],
    ['Lactic acid', 'Lactobacillus'],
  ],
  order: [1, 0, 3, 2],
  sol: 'Citric — Aspergillus niger; acetic — Acetobacter aceti; butyric — Clostridium butylicum; lactic — Lactobacillus.',
  d: 2, c: 'recall', t: [1],
}));
add('juice-mcq', mcq({
  stem: 'A fruit-juice factory finds that its bottled apple juice looks cloudy. Which microbial enzymes would help to clarify it?',
  right: 'Pectinases and proteases',
  wrong: ['Lipases', 'Streptokinase', 'Statins'],
  sol: 'Pectinases and proteases break down the substances that make juice cloudy — option (@K). Lipases act on fats; streptokinase and statins are medicines.',
  d: 2, c: 'application', t: [1],
}));
add('stain-mcq', mcq({
  stem: 'A detergent company wants its washing powder to remove oily stains from clothes. Which microbial enzyme should it add?',
  right: 'Lipase',
  wrong: ['Pectinase', 'Streptokinase', 'Cyclosporin A'],
  sol: 'Lipases break down fats and oils, so they remove oily stains — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('transplant-mcq', mcq({
  stem: 'After a kidney transplant, a patient is given a drug to stop her immune system from rejecting the new organ. Which microbial product is used, and from which organism?',
  right: 'Cyclosporin A, from the fungus Trichoderma polysporum',
  wrong: ['Streptokinase, from Streptococcus', 'Statins, from Monascus purpureus', 'Penicillin, from Penicillium notatum'],
  sol: 'Cyclosporin A is an immunosuppressive agent used in organ-transplant patients — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('heart-mcq', mcq({
  stem: 'A man is rushed to hospital with a heart attack caused by a clot in a blood vessel of the heart. Which microbial product can be used to dissolve the clot?',
  right: 'Streptokinase',
  wrong: ['Cyclosporin A', 'Lipase', 'Citric acid'],
  sol: 'Streptokinase from Streptococcus (modified by genetic engineering) is used as a clot buster — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('statin-ar', ar({
  a: 'Statins are used to lower blood cholesterol levels.',
  r: 'Statins are produced by the yeast Monascus purpureus.',
  key: 'b',
  sol: 'Both are true, but the source does not explain the action; statins work by competitively inhibiting an enzyme of cholesterol synthesis — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('bread-mcq', mcq({
  stem: 'A baker kneads two identical batches of dough with yeast. Batch 1 is left in a warm kitchen and batch 2 in a cold storeroom. After an hour, batch 1 has risen much more. Why?',
  right: 'Yeast ferments sugars and releases CO₂ faster at a warm temperature.',
  wrong: ['Cold air contains no oxygen for the dough.', 'Yeast produces oxygen only when it is cold.', 'The warm kitchen killed the yeast in batch 1.'],
  sol: 'Fermentation by yeast is enzyme-driven and faster in warmth, so more CO₂ is released to raise the dough — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('vinegar-mcq', mcq({
  stem: 'A food company wants to make vinegar on a large scale. Which microbe should it use?',
  right: 'Acetobacter aceti',
  wrong: ['Aspergillus niger', 'Propionibacterium sharmanii', 'Trichoderma polysporum'],
  sol: 'Vinegar is mainly acetic acid, produced by Acetobacter aceti — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('yeast-fill', fill({
  stem: 'Both baker’s yeast and brewer’s yeast belong to the species Saccharomyces ______.',
  acc: [['cerevisiae']],
  sol: 'Saccharomyces cerevisiae.',
  d: 1, c: 'recall', t: [1],
}));
add('curd-short', short({
  marks: 2,
  stem: 'Explain how milk is converted into curd, and give two ways in which curd is beneficial.',
  model: 'A little curd added to milk supplies **lactic acid bacteria (LAB)**, which multiply and produce **acids** that **coagulate and partially digest milk proteins**, setting the milk into curd. Curd has **more vitamin B₁₂** than milk, and LAB in the stomach **check disease-causing microbes**.',
  sol: 'LAB acids coagulate proteins; B₁₂ and protection.',
  scheme: [['LAB produce acids that coagulate milk proteins', 1], ['Two benefits', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('penicillin-short', short({
  marks: 3,
  stem: 'Describe how penicillin was discovered and developed into a medicine.',
  model: '**Alexander Fleming**, working on cultures of **Staphylococci**, noticed that a mould growing on one plate, ***Penicillium notatum***, prevented the bacteria from growing around it. He found that the mould produced a chemical, which he named **penicillin**.\n\nLater, **Ernst Chain and Howard Florey** purified it and established its full potential as an antibiotic. It was used extensively to treat soldiers wounded in **World War II**, and the three scientists received the **Nobel Prize in 1945**.',
  sol: 'Observation, identification, development, use.',
  scheme: [['Fleming’s observation with Penicillium notatum and Staphylococci', 1], ['Chain and Florey established potential', 1], ['Use in World War II; Nobel Prize', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('industry-short', short({
  marks: 3,
  stem: 'A biotechnology company plans three products: vinegar, a cholesterol-lowering drug and a drug for transplant patients. Name the microbe it should use for each, and the product obtained.',
  model: '1. **Vinegar**: the bacterium ***Acetobacter aceti***, which produces **acetic acid**, the main component of vinegar.\n\n2. **Cholesterol-lowering drug**: the yeast ***Monascus purpureus***, which produces **statins**; they competitively inhibit an enzyme needed to make cholesterol, so blood cholesterol falls.\n\n3. **Transplant drug**: the fungus ***Trichoderma polysporum***, which produces **cyclosporin A**, an immunosuppressant that stops the immune system rejecting the new organ.',
  sol: 'Match need → product → microbe.',
  scheme: [['Acetobacter aceti for acetic acid', 1], ['Monascus purpureus for statins', 1], ['Trichoderma polysporum for cyclosporin A', 1]],
  d: 3, c: 'application', t: [1],
}));
add('bioactive-short', short({
  marks: 2,
  stem: 'Name the source and one medical use each of streptokinase and statins.',
  model: '**Streptokinase**: produced by ***Streptococcus*** (modified by genetic engineering); used as a **clot buster** in patients who have had a myocardial infarction. **Statins**: produced by the yeast ***Monascus purpureus***; used to **lower blood cholesterol**.',
  sol: 'Source and use for each.',
  scheme: [['Streptokinase source and use', 1], ['Statins source and use', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('microbes-long', long({
  stem: 'Describe the role of microbes in (a) household products and (b) industrial production, giving at least two examples of each kind of product.',
  model: '**(a) Household products.** Lactic acid bacteria such as Lactobacillus turn milk into curd: their acids coagulate and partly digest milk proteins, and they raise vitamin B₁₂ and check harmful microbes in the stomach. Bacteria ferment idli and dosa batter, and baker’s yeast (Saccharomyces cerevisiae) ferments bread dough; in both, CO₂ makes the dough rise. Toddy is made by fermenting palm sap. Swiss cheese gets its large holes from CO₂ made by Propionibacterium sharmanii, and Roquefort cheese is ripened by fungi.\n\n**(b) Industry.** Brewer’s yeast ferments cereals and juices to make ethanol; wine and beer are not distilled, while whisky, brandy and rum are. Antibiotics such as penicillin, from Penicillium notatum, kill or retard disease-causing bacteria. Organic acids are made by Aspergillus niger (citric acid), Acetobacter aceti (acetic acid), Clostridium butylicum (butyric acid) and Lactobacillus (lactic acid). Microbial enzymes include lipases for detergents and pectinases and proteases for clarifying juices. Bioactive molecules include streptokinase (clot buster), cyclosporin A from Trichoderma polysporum (immunosuppressant) and statins from Monascus purpureus (lower cholesterol).',
  sol: 'Household examples; industrial beverages, antibiotics, acids, enzymes, bioactive molecules.',
  scheme: [['Curd with LAB and benefits', 1], ['Other household examples', 1], ['Beverages and antibiotics', 1], ['Acids and enzymes', 1], ['Bioactive molecules', 1]],
  wl: [80, 220],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 sewage and biogas
add('bod-mcq', mcq({
  stem: 'A water sample has a very high BOD. What does this indicate?',
  right: 'The water contains a large amount of organic matter and is highly polluted.',
  wrong: ['The water is very clean and rich in oxygen.', 'The water contains no bacteria.', 'The water has too little organic matter for microbes.'],
  sol: 'BOD measures the oxygen needed to oxidise organic matter; the higher the BOD, the greater the organic pollution — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('dung-ar', ar({
  a: 'Cattle dung is widely used as the raw material in biogas plants.',
  r: 'Cattle dung is rich in methanogenic bacteria that live in the rumen of cattle.',
  key: 'a',
  sol: 'Both are true; the methanogens in dung produce methane in the digester, which explains its use — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('sludge-mcq', mcq({
  stem: 'What is done with most of the activated sludge from the settling tank of a sewage treatment plant?',
  right: 'It is pumped into anaerobic sludge digesters.',
  wrong: ['It is released directly into rivers.', 'It is all returned to the aeration tank.', 'It is burnt in the open.'],
  sol: 'A small part returns to the aeration tank as inoculum; the major part goes to anaerobic sludge digesters — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
{
  const f = pctFall(250, 25);
  add('bod-num', num({
    stem: 'The BOD of sewage entering a treatment plant is 250 mg per litre, and that of the treated effluent is 25 mg per litre. What is the percentage reduction in BOD?',
    value: f, unit: '%',
    sol: r`$\dfrac{250 - 25}{250} \times 100 = \dfrac{225}{250} \times 100 = ${f}$ percent.`,
    scheme: [[`${f}%`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 90 || 'value');
}
{
  const g = oxygenDemand(40, 500) / 1000;
  add('oxygen-num', num({
    stem: 'A pond holds water with a BOD of 40 mg per litre. How many grams of oxygen would bacteria consume in oxidising all the organic matter in 500 litres of this water?',
    value: g, unit: 'g',
    sol: r`$40\ \text{mg/L} \times 500\ \text{L} = 20\,000\ \text{mg} = ${g}\ \text{g}$.`,
    scheme: [[`${g} g`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 20 || 'value');
}
add('river-mcq', mcq({
  stem: 'River P has a BOD of 2 mg per litre and river Q, downstream of a town, has a BOD of 30 mg per litre. Fish are dying in river Q. What is the best explanation?',
  right: 'River Q receives untreated organic waste; microbes breaking it down use up the dissolved oxygen that fish need.',
  wrong: ['River P is more polluted because its BOD is lower.', 'High BOD means more oxygen is available to fish.', 'The fish in river Q are poisoned by methane from the treatment plant.'],
  sol: 'High BOD means much organic matter; its microbial oxidation depletes dissolved oxygen, so fish suffocate — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('primary-tf', tf({
  stem: 'Primary treatment of sewage is a biological process carried out by aerobic microbes.',
  key: 'f',
  sol: 'False. Primary treatment is physical (filtration and sedimentation); secondary treatment is biological.',
  d: 1, c: 'recall', t: [2],
}));
add('gases-mcq', mcq({
  stem: 'Which gases are produced when bacteria digest sludge in anaerobic sludge digesters?',
  right: 'Methane, hydrogen sulphide and carbon dioxide',
  wrong: ['Oxygen and nitrogen', 'Only oxygen', 'Ammonia and ozone'],
  sol: 'Anaerobic digestion produces biogas: methane, hydrogen sulphide and carbon dioxide — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('floc-mcq', mcq({
  stem: 'In the aeration tanks of a sewage treatment plant, “flocs” are',
  right: 'masses of bacteria associated with fungal filaments that consume organic matter',
  wrong: ['particles of grit removed by sedimentation', 'bubbles of methane gas', 'pieces of floating debris removed by filtration'],
  sol: 'Flocs are mesh-like masses of bacteria and fungal filaments that grow on and consume organic matter — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('inoculum-mcq', mcq({
  stem: 'Why is a small part of the activated sludge pumped back into the aeration tank?',
  right: 'It supplies a ready population of useful microbes (inoculum) to treat the incoming effluent quickly.',
  wrong: ['It adds oxygen to the tank.', 'It removes grit from the effluent.', 'It produces methane in the aeration tank.'],
  sol: 'The returned sludge acts as an inoculum of floc-forming microbes, speeding up secondary treatment — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('slurry-mcq', mcq({
  stem: 'Why do farmers return the spent slurry from a biogas plant to their fields?',
  right: 'It is rich in nutrients and serves as a good fertiliser.',
  wrong: ['It contains methane that kills pests.', 'It is a source of penicillin for crops.', 'It removes all bacteria from the soil.'],
  sol: 'After digestion, the slurry still holds plant nutrients and organic matter, so it is used as manure — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('primary-ar', ar({
  a: 'Sewage that has undergone only primary treatment is not yet fit to be released into rivers.',
  r: 'Primary treatment removes only particles, not the dissolved organic matter that gives sewage a high BOD.',
  key: 'a',
  sol: 'Both are true; the dissolved organic matter left after primary treatment still has a high BOD, which explains A — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('stp-short', short({
  marks: 3,
  stem: 'Describe the secondary (biological) treatment of sewage.',
  model: 'The primary effluent is passed into large **aeration tanks**, where it is agitated mechanically and air is pumped in. Useful **aerobic microbes** grow into **flocs** (bacteria with fungal filaments) and consume most of the organic matter, **reducing the BOD** significantly.\n\nThe effluent then goes to a **settling tank**, where the flocs sediment as **activated sludge**. A small part is pumped back into the aeration tank as **inoculum**; most goes to **anaerobic sludge digesters**, where other bacteria digest it, producing **biogas**. The treated effluent is released into rivers.',
  sol: 'Aeration and flocs → BOD falls → settling and activated sludge → digesters.',
  scheme: [['Aeration tanks and flocs', 1], ['BOD reduction', 1], ['Settling, activated sludge, inoculum and digesters', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bod-short', short({
  marks: 2,
  stem: 'Define BOD. Why do sewage treatment plants aim to lower the BOD of sewage before releasing it?',
  model: '**BOD** is the amount of oxygen that would be consumed if all the organic matter in **one litre of water** were oxidised by bacteria. High-BOD sewage released into a river would let microbes **use up the dissolved oxygen**, killing **fish and other aquatic life**, so the BOD is lowered first.',
  sol: 'Definition; effect on dissolved oxygen.',
  scheme: [['Definition with one litre', 1], ['Reason: protect dissolved oxygen and aquatic life', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('biogas-short', short({
  marks: 3,
  stem: 'A village panchayat wants to set up a community biogas plant. Explain how the plant works and give two benefits for the village.',
  model: 'A **slurry of cattle dung** and water is fed into a deep **concrete tank**. **Methanogens** (such as Methanobacterium) from the dung digest it **anaerobically**, producing **biogas**, mainly **methane** with CO₂. The gas collects under a **floating cover**, which rises, and is piped out.\n\nBenefits: a cheap, **clean fuel** for **cooking and lighting** (less smoke than dung cakes or wood), and the **spent slurry** is a good **fertiliser** for fields.',
  sol: 'Feeding, anaerobic digestion, gas collection; two benefits.',
  scheme: [['Dung slurry and anaerobic digestion by methanogens', 1], ['Gas collection under a floating cover', 1], ['Two benefits', 1]],
  d: 3, c: 'application', t: [2],
}));
add('methanogen-short', short({
  marks: 2,
  stem: 'What are methanogens? Name one, and explain why cattle dung is rich in them.',
  model: '**Methanogens** are anaerobic microbes that grow on cellulosic material and produce large amounts of **methane** (with CO₂ and H₂); an example is ***Methanobacterium***. They live in the **rumen** of cattle, where they help break down cellulose, so they pass out in **cattle dung**.',
  sol: 'Definition, example, rumen.',
  scheme: [['Definition and example', 1], ['Present in the rumen, so in dung', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('stp-long', long({
  stem: 'Describe how sewage is treated in a sewage treatment plant. Explain the role of microbes and the significance of BOD in the process.',
  model: '**Why treat sewage.** Municipal waste water contains large amounts of organic matter and microbes, many of them pathogenic, and cannot be discharged directly into rivers.\n\n**Primary treatment.** This is physical: floating debris is removed by sequential filtration, and grit is removed by sedimentation. The settled solids form primary sludge, and the liquid above, the effluent, goes to secondary treatment.\n\n**Secondary treatment.** In aeration tanks the effluent is agitated and air is pumped in. Aerobic microbes grow into flocs, masses of bacteria with fungal filaments, and consume most of the organic matter, so the BOD falls sharply. BOD is the amount of oxygen that would be consumed if all the organic matter in one litre of water were oxidised by bacteria, so it measures how polluting the water is. When the BOD is low enough, the effluent passes to a settling tank, where the flocs settle as activated sludge.\n\n**Sludge.** A small part of the activated sludge is returned as inoculum; the rest goes to anaerobic sludge digesters, where bacteria digest it and produce biogas (methane, hydrogen sulphide and carbon dioxide).\n\n**Release.** The treated effluent is released into natural water bodies. Programmes such as the Ganga and Yamuna Action Plans aim to build enough plants to treat sewage before it reaches rivers.',
  sol: 'Primary; secondary with flocs and BOD; sludge digestion; release.',
  scheme: [['Primary treatment', 1], ['Aeration, flocs, BOD reduction', 1.5], ['BOD defined and its significance', 1], ['Activated sludge and anaerobic digestion', 1], ['Release and action plans', 0.5]],
  wl: [80, 220],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 biocontrol, biofertilisers, antibiotics
add('bt-mcq', mcq({
  stem: 'Which biocontrol agent is used to control butterfly caterpillars?',
  right: 'Bacillus thuringiensis',
  wrong: ['Trichoderma', 'Rhizobium', 'Glomus'],
  sol: 'Spores of Bacillus thuringiensis are sprayed on plants; the toxin released in the caterpillar’s gut kills it — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('myco-ar', ar({
  a: 'Plants with mycorrhizal fungi grow better in soils that are poor in phosphorus.',
  r: 'The fungal partner absorbs phosphorus from the soil and passes it to the plant.',
  key: 'a',
  sol: 'Both are true; phosphorus absorption by the fungus explains better growth in phosphorus-poor soil — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('course-mcq', mcq({
  stem: 'Why does stopping a course of antibiotics early encourage antibiotic resistance?',
  right: 'The most resistant bacteria survive the short exposure and multiply.',
  wrong: ['The antibiotic changes into a poison.', 'The body stops making antibodies.', 'All the bacteria are killed in the first dose.'],
  sol: 'A partial course kills the most sensitive bacteria and leaves the toughest ones to multiply, selecting for resistance — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('aphid-mcq', mcq({
  stem: 'A greenhouse rose crop is infested with aphids, and the grower wants to avoid chemical sprays. What is the best biological control?',
  right: 'Releasing ladybird beetles',
  wrong: ['Releasing dragonflies', 'Adding Rhizobium to the soil', 'Spraying cyclosporin A'],
  sol: 'Ladybird beetles feed on aphids — option (@K); dragonflies control mosquitoes.',
  d: 2, c: 'application', t: [3],
}));
add('paddy-mcq', mcq({
  stem: 'A rice farmer wants a biofertiliser that will add nitrogen to his flooded paddy field. Which should he use?',
  right: 'Cyanobacteria such as Anabaena and Nostoc',
  wrong: ['Glomus (mycorrhiza)', 'Bacillus thuringiensis', 'Penicillium notatum'],
  sol: 'Cyanobacteria fix atmospheric nitrogen and add organic matter, and are important biofertilisers in paddy fields — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('legume-mcq', mcq({
  stem: 'Soybean plants grown in soil inoculated with a particular bacterium develop root nodules and need less nitrogen fertiliser. The bacterium is most likely',
  right: 'Rhizobium',
  wrong: ['Azotobacter', 'Trichoderma', 'Methanobacterium'],
  sol: 'Rhizobium forms nodules on legume roots and fixes nitrogen symbiotically — option (@K). Azotobacter is free-living and forms no nodules.',
  d: 2, c: 'application', t: [3],
}));
add('ipm-mcq', mcq({
  stem: 'In an ecologically sensitive area near a wildlife sanctuary, why are baculoviruses preferred over a broad-spectrum chemical insecticide?',
  right: 'They are species-specific and do not harm plants, mammals, birds, fish or non-target insects.',
  wrong: ['They kill every insect in the area within a day.', 'They also act as nitrogen-fixing biofertilisers.', 'They are cheaper to make than any chemical.'],
  sol: 'Baculoviruses are narrow-spectrum, so useful organisms are spared — ideal for integrated pest management in sensitive areas — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('azoto-mcq', mcq({
  stem: 'A wheat farmer wants a nitrogen-fixing biofertiliser. Wheat is not a legume and does not form root nodules. Which microbe is most suitable?',
  right: 'Azotobacter, a free-living nitrogen-fixing bacterium',
  wrong: ['Rhizobium, which needs legume root nodules', 'Glomus, which mainly supplies phosphorus', 'Bacillus thuringiensis, which kills caterpillars'],
  sol: 'Free-living nitrogen fixers such as Azotobacter and Azospirillum work without nodules — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('trichoderma-tf', tf({
  stem: 'Trichoderma is a bacterium sprayed on crops to kill caterpillars.',
  key: 'f',
  sol: 'False. Trichoderma is a free-living fungus used against plant pathogens; Bacillus thuringiensis is the bacterium used against caterpillars.',
  d: 1, c: 'recall', t: [3],
}));
add('cold-mcq', mcq({
  stem: 'A student with a common cold asks a pharmacist for antibiotics. What is the correct advice?',
  right: 'Antibiotics will not help, because a cold is caused by viruses; misuse also encourages resistant bacteria.',
  wrong: ['Take any leftover antibiotic for two days.', 'Take a double dose to cure the cold faster.', 'Antibiotics will prevent the virus from multiplying.'],
  sol: 'Antibiotics act on bacteria, not viruses; unnecessary use selects for resistance — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('baculo-ar', ar({
  a: 'Baculoviruses are suitable for pest control in ecologically sensitive areas.',
  r: 'Baculoviruses kill all the insects in a field, both pests and useful ones.',
  key: 'c',
  sol: 'A is true. R is false: baculoviruses are narrow-spectrum and do not harm non-target insects, which is why they suit sensitive areas — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
{
  const f = pctFall(10, 4);
  add('spray-num', num({
    stem: 'After adopting biocontrol, a farmer reduced chemical pesticide sprays from 10 to 4 per season. What is the percentage reduction?',
    value: f, unit: '%',
    sol: r`$\dfrac{10 - 4}{10} \times 100 = ${f}$ percent.`,
    scheme: [[`${f}%`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 60 || 'value');
}
{
  const rise = Math.round(((2.6 - 2.0) / 2.0) * 1000) / 10;
  add('yield-num', num({
    stem: 'A plot of gram inoculated with Rhizobium yields 2.6 tonnes per hectare, while an uninoculated control plot yields 2.0 tonnes per hectare. What is the percentage increase in yield?',
    value: rise, unit: '%',
    sol: r`$\dfrac{2.6 - 2.0}{2.0} \times 100 = ${rise}$ percent.`,
    scheme: [[`${rise}%`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 30 || 'value');
}
add('biocontrol-short', short({
  marks: 2,
  stem: 'Explain how spraying Bacillus thuringiensis spores protects a cabbage crop from caterpillars, and why it is better than a chemical insecticide.',
  model: 'Caterpillars that eat leaves sprayed with **Bt spores** take in a **toxin**, which is **released in their gut** and kills them. Bt is **specific** to such insects, so other insects, birds and people are **unharmed**, and it leaves no toxic chemical residues, unlike a broad chemical insecticide.',
  sol: 'Toxin in gut; specificity.',
  scheme: [['Toxin released in the caterpillar’s gut', 1], ['Specific; no harm to others or residues', 1]],
  d: 3, c: 'application', t: [3],
}));
add('resistance-short', short({
  marks: 2,
  stem: 'Explain why the misuse of antibiotics leads to an increase in antibiotic-resistant bacteria.',
  model: 'A bacterial population **varies**; a few cells may be **resistant**. Each use of an antibiotic **kills sensitive bacteria** while resistant ones **survive and multiply** (natural selection). Unnecessary use, wrong doses and incomplete courses **repeat this selection**, so resistant bacteria become common and infections harder to treat.',
  sol: 'Variation + selection.',
  scheme: [['Resistant variants survive while sensitive ones die', 1], ['Misuse repeats selection, spreading resistance', 1]],
  d: 3, c: 'application', t: [3],
}));
add('biofert-short', short({
  marks: 3,
  stem: 'What are biofertilisers? Give one example each of a bacterial, a fungal and a cyanobacterial biofertiliser and how it helps the plant.',
  model: '**Biofertilisers** are organisms that **enrich the nutrient quality of the soil**.\n\n1. **Bacterial:** ***Rhizobium*** in root nodules of legumes **fixes atmospheric nitrogen** (Azotobacter and Azospirillum do so free-living).\n\n2. **Fungal:** **mycorrhiza** (***Glomus***) **absorbs phosphorus** for the plant and gives resistance to root pathogens and tolerance to salinity and drought.\n\n3. **Cyanobacterial:** ***Anabaena*** or ***Nostoc*** **fix nitrogen** in paddy fields and add organic matter.',
  sol: 'Definition and three examples.',
  scheme: [['Definition and bacterial example', 1], ['Fungal example', 1], ['Cyanobacterial example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('biofert-long', long({
  stem: 'What are biocontrol agents and biofertilisers? Explain, with examples, how each helps farmers reduce the use of chemicals.',
  model: '**Biocontrol agents** are living organisms used to control plant diseases and pests. Ladybird beetles eat aphids and dragonflies eat mosquitoes. Spores of Bacillus thuringiensis sprayed on plants kill caterpillars through a toxin released in their gut, without harming other insects. Free-living Trichoderma fungi in the root zone control several plant pathogens. Baculoviruses of the genus Nucleopolyhedrovirus are species-specific, narrow-spectrum insecticides with no negative impact on plants, mammals, birds, fish or non-target insects, so they suit integrated pest management. Using them reduces chemical pesticides that are toxic and pollute soil and water.\n\n**Biofertilisers** are organisms that enrich the nutrient quality of soil. Rhizobium in root nodules of legumes and free-living Azospirillum and Azotobacter fix atmospheric nitrogen. Mycorrhizal fungi such as Glomus absorb phosphorus for the plant and give resistance to root pathogens and tolerance to salinity and drought. Cyanobacteria such as Anabaena, Nostoc and Oscillatoria fix nitrogen in paddy fields and add organic matter. Using them reduces the need for chemical fertilisers.\n\nTogether they form the basis of organic farming, which keeps pests at manageable levels within a balanced ecosystem.',
  sol: 'Definitions; biocontrol examples; biofertiliser examples; reduced chemical use.',
  scheme: [['Biocontrol defined with predator examples', 1], ['Bt, Trichoderma, baculoviruses', 1.5], ['Biofertilisers defined with bacterial examples', 1], ['Mycorrhiza and cyanobacteria', 1], ['Reduced chemicals; organic farming', 0.5]],
  wl: [80, 220],
  d: 3, c: 'understanding', t: [3],
}));
add('organic-long', long({
  stem: 'A farmers’ group is debating whether to replace all chemical pesticides and fertilisers with biocontrol agents and biofertilisers. Evaluate this proposal, giving its advantages, its limitations and a sensible recommendation.',
  model: '**Advantages.** Biocontrol agents such as Bacillus thuringiensis, Trichoderma and baculoviruses are specific to pests or pathogens, so they spare useful insects, birds, fish and people, leave no toxic residues, and keep the natural enemies of pests alive. Biofertilisers such as Rhizobium, Azotobacter, Glomus and cyanobacteria add nitrogen or improve phosphorus uptake and organic matter, improving soil health over time and lowering costs. Together they reduce pollution of soil and water.\n\n**Limitations.** Biological methods often act more slowly, need correct timing and conditions (living organisms must survive), and may not stop a sudden severe outbreak. Farmers need training, and quality supply of inoculants. Yields may dip during the changeover.\n\n**Recommendation.** Rather than an immediate total switch, the group should adopt integrated pest management and integrated nutrient management: use biocontrol and biofertilisers as the first choice, monitor pests, and use chemicals only when necessary and in small amounts, gradually reducing them as the farm ecosystem becomes balanced.\n\n**Judgement.** The proposal is sound in direction but should be phased in.',
  sol: 'Advantages, limitations, phased IPM recommendation.',
  scheme: [['Advantages of biocontrol', 1], ['Advantages of biofertilisers', 1], ['Limitations', 1], ['Recommendation (integrated approach)', 1], ['Reasoned judgement', 1]],
  wl: [80, 220],
  d: 4, c: 'evaluation', t: [3],
}));
add('antibiotic-long', long({
  stem: 'Explain what antibiotics are, using penicillin as an example, and describe five rules for using antibiotics judiciously, giving the reason for each.',
  model: '**Antibiotics** are chemical substances produced by some microbes that can kill or retard the growth of other, disease-causing microbes. Penicillin, made by the mould Penicillium notatum, was discovered by Alexander Fleming when he saw that Staphylococci could not grow around the mould; Chain and Florey later established it as a medicine, and it saved many lives in World War II.\n\n**Judicious use.**\n1. Take antibiotics only when prescribed by a doctor — self-medication may use the wrong drug.\n2. Do not use them for viral infections such as colds — they act only on bacteria, and needless use selects resistance.\n3. Take the correct dose at the right times — low doses let bacteria survive.\n4. Complete the full course — stopping early leaves the most resistant bacteria alive to multiply.\n5. Do not share or keep leftover antibiotics, and avoid unnecessary use in farm animals — both spread resistant bacteria.\n\nThese rules slow the natural selection of resistant bacteria, so that antibiotics keep working for everyone.',
  sol: 'Definition, penicillin, five reasoned rules.',
  scheme: [['Definition and penicillin example', 1], ['Rules 1–2 with reasons', 1.5], ['Rules 3–4 with reasons', 1.5], ['Rule 5 and link to resistance', 1]],
  wl: [80, 220],
  d: 3, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- cases
{
  const [s0, s1, s2] = STAGES;
  const overall = pctFall(s0[1], s2[1]);
  add('bod-case', mk.case({
    passage: `An environmental science class visited a sewage treatment plant and recorded the BOD of water at three points.\n\n| Sampling point | BOD (mg per litre) |\n|---|---|\n| ${s0[0]} | ${s0[1]} |\n| ${s1[0]} | ${s1[1]} |\n| ${s2[0]} | ${s2[1]} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which treatment stage removed more BOD?',
        right: `Secondary treatment (${s1[1]} → ${s2[1]} mg per litre)`,
        wrong: [`Primary treatment (${s0[1]} → ${s1[1]} mg per litre)`, 'Both removed the same amount', 'Neither changed the BOD'],
        sol: `Primary removed ${s0[1] - s1[1]} mg per litre; secondary removed ${s1[1] - s2[1]} mg per litre — option (@K).`,
        d: 2, c: 'analysis', t: [2],
      })),
      part('b', num({
        stem: 'What is the overall percentage reduction in BOD?',
        value: overall, unit: '%',
        sol: r`$\dfrac{${s0[1]} - ${s2[1]}}{${s0[1]}} \times 100 = ${overall}$ percent.`,
        scheme: [[`${overall}%`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why secondary treatment lowers the BOD so much more than primary treatment.',
        model: 'Primary treatment only **removes particles** by filtration and sedimentation; dissolved organic matter remains. In secondary treatment, **aerobic microbes** in the aeration tanks form **flocs** and **consume the dissolved organic matter**, which is what creates BOD, so the BOD falls sharply.',
        sol: 'Physical vs biological removal.',
        scheme: [['Primary removes only particles', 1], ['Microbial flocs consume dissolved organic matter', 1]],
        d: 3, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Predict what would happen to a small river if the raw sewage were released into it without treatment.',
          model: 'Microbes in the river would oxidise the large amount of organic matter, **using up dissolved oxygen** (high BOD). Fish and other aquatic animals would **suffocate and die**, and pathogens in sewage would make the water **unsafe** for people.',
          sol: 'Oxygen depletion and pathogens.',
          scheme: [['Dissolved oxygen depleted, aquatic life dies', 1], ['Pathogens make water unsafe', 1]],
          d: 3, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 90 || 'value');
}
{
  const ctl = 1.8, rhz = 2.34, urea = 2.4;
  const rise = Math.round(((rhz - ctl) / ctl) * 1000) / 10;
  add('field-case', mk.case({
    passage: `An agricultural college compared three plots of chickpea (gram) in the same field.\n\n| Plot | Treatment | Yield (t per hectare) | Root nodules |\n|---|---|---|---|\n| A | No fertiliser | ${ctl} | Few |\n| B | Seeds coated with Rhizobium | ${rhz} | Many |\n| C | Chemical nitrogen fertiliser | ${urea} | Few |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Why does plot B have many root nodules?',
        right: 'Rhizobium bacteria infected the roots and formed nitrogen-fixing nodules.',
        wrong: ['The chemical fertiliser caused nodules to form.', 'Nodules are made by mycorrhizal fungi.', 'Nodules store phosphorus from the soil.'],
        sol: 'Rhizobium forms nodules on legume roots, where it fixes atmospheric nitrogen — option (@K).',
        d: 2, c: 'understanding', t: [3],
      })),
      part('b', num({
        stem: 'By what percentage did Rhizobium raise the yield compared with plot A?',
        value: rise, tol: 0.05, unit: '%',
        sol: r`$\dfrac{${rhz} - ${ctl}}{${ctl}} \times 100 = ${rise}$ percent.`,
        scheme: [[`${rise}%`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Plot C gave a slightly higher yield than plot B. Argue whether Rhizobium is still the better choice for the farmers.',
        model: 'The yields are **very close** (2.4 vs 2.34). Rhizobium is **cheap**, adds nitrogen **without polluting** soil and water, and improves **soil health** over time, while chemical fertiliser is costly and can run off into water. So Rhizobium is the **better long-term choice**, perhaps with a little chemical fertiliser if needed.',
        sol: 'Weigh small yield gap against cost and environment.',
        scheme: [['Notes the small yield difference', 1], ['Cost and environmental benefits give a reasoned choice', 1]],
        d: 4, c: 'evaluation', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'The college wants to test a fungal biofertiliser on the same crop in phosphorus-poor soil. Which one should it test, and what results would show it works?',
          model: 'It should test **mycorrhiza (Glomus)**, which **absorbs phosphorus** for the plant. If treated plots show **higher yield** and **better phosphorus uptake** (and healthier roots) than **untreated control plots** under the same conditions, the biofertiliser works.',
          sol: 'Glomus; controlled comparison.',
          scheme: [['Glomus (mycorrhiza)', 1], ['Expected results compared with a control', 1]],
          d: 3, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 30 || 'value');
}
{
  const zones = { A: 22, B: 8, C: 0 };
  add('antibiotic-case', mk.case({
    passage: `A microbiology student placed paper discs soaked in three antibiotics, A, B and C, on a plate spread with bacteria from a patient’s throat. After a day she measured the clear zone around each disc, where no bacteria grew.\n\n| Antibiotic | Clear zone diameter (mm) |\n|---|---|\n| A | ${zones.A} |\n| B | ${zones.B} |\n| C | ${zones.C} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which antibiotic would be most suitable for treating this infection?',
        right: 'A, which produced the largest clear zone',
        wrong: ['C, which produced no clear zone', 'B, which produced a small clear zone', 'Any of them, as all are antibiotics'],
        sol: 'A larger clear zone shows stronger inhibition of the bacteria — option (@K).',
        d: 2, c: 'analysis', t: [3],
      })),
      part('b', num({
        stem: 'How many millimetres wider was the clear zone of antibiotic A than that of B?',
        value: zones.A - zones.B, unit: 'mm',
        sol: r`$${zones.A} - ${zones.B} = ${zones.A - zones.B}$ mm.`,
        scheme: [[`${zones.A - zones.B} mm`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'The bacteria grew right up to disc C. Suggest how they might have become resistant to antibiotic C.',
        model: 'Repeated or careless **use of antibiotic C** (incomplete courses, unnecessary use) would have **killed sensitive bacteria** while the few **resistant variants survived and multiplied**. Over time the population became **resistant** — natural selection.',
        sol: 'Selection by misuse.',
        scheme: [['Sensitive bacteria killed, resistant survive', 1], ['Misuse repeated the selection', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'This kind of test was made possible by the discovery of antibiotics. Who discovered the first antibiotic, and what did he observe?',
          model: '**Alexander Fleming** discovered **penicillin**. He observed that **Staphylococci did not grow** in the area around a mould, ***Penicillium notatum***, that was growing on his culture plate — a clear zone like those around discs A and B.',
          sol: 'Fleming and the clear zone.',
          scheme: [['Fleming; penicillin', 1], ['Observation of no bacterial growth around Penicillium', 1]],
          d: 2, c: 'recall', t: [1, 3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 14 || 'value');
}
add('fermentation-case', mk.case({
  passage: 'Three bowls of the same warm milk were each given a teaspoon of curd and kept at different temperatures. The time taken for the milk to set into curd was noted.\n\n| Bowl | Temperature (°C) | Time to set (hours) |\n|---|---|---|\n| 1 | 10 | Did not set in 24 hours |\n| 2 | 30 | 8 |\n| 3 | 37 | 5 |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What did the teaspoon of curd supply to the milk?',
      right: 'An inoculum of lactic acid bacteria',
      wrong: ['Yeast cells that produce ethanol', 'Enzymes from Aspergillus niger', 'Methanogenic bacteria'],
      sol: 'The added curd contains millions of LAB, which act as the starter (inoculum) — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'How many hours faster did the milk set at 37 °C than at 30 °C?',
      value: 3, unit: 'h',
      sol: r`$8 - 5 = 3$ hours.`,
      scheme: [['3 hours', 1]],
      d: 1, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain the results of bowls 1 and 3.',
      model: 'The **lactic acid bacteria** multiply and make acid fastest at a **warm temperature** close to 37 °C, so bowl 3 set quickest. At **10 °C** their growth and enzyme activity are **very slow**, so too little acid formed to coagulate the milk proteins in bowl 1.',
      sol: 'Temperature controls microbial activity.',
      scheme: [['Warmth speeds LAB growth and acid production', 1], ['Cold slows them, so no setting', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Give two reasons why curd is considered more nutritious and healthier than plain milk.',
        model: 'Lactic acid bacteria **increase the vitamin B₁₂** content, and the **partly digested proteins** are easier to digest. LAB in the stomach also **check disease-causing microbes**.',
        sol: 'B₁₂; protection.',
        scheme: [['Vitamin B₁₂ or easier digestion', 1], ['Checks harmful microbes', 1]],
        d: 2, c: 'understanding', t: [1],
      }),
    ]),
  ],
}));
