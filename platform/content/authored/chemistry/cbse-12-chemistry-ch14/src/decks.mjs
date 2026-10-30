// ch14 Chemistry in Everyday Life (formative assessment only) — two decks: Part 1 (t01) chemicals in medicines;
// Part 2 (t02) chemicals in food.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { ENZYME, RECEPTOR } from './svgs.mjs';

export const V = {
  enzyme: svgV(ENZYME, 'An enzyme’s active site holding its substrate, and the same site blocked by a competitive inhibitor drug'),
  receptor: svgV(RECEPTOR, 'Membrane receptors: a messenger binds and sends a signal into the cell; an antagonist binds and blocks the signal'),
};

export const deck1 = deck({
  part: 1,
  title: 'Chemistry in Everyday Life — Part 1: Chemicals in medicines',
  goals: [
    'Explain how drugs act on targets such as enzymes and receptors',
    'Classify drugs by pharmacological effect and give examples',
    'Describe antacids, antihistamines, tranquilisers, analgesics, antimicrobials and antifertility drugs',
    'Distinguish antiseptics from disinfectants and bactericidal from bacteriostatic antibiotics',
  ],
  slides: [
    sl('title', 'Chemistry in Everyday Life', {
      b: 'Part 1 — how medicines work, chemically. (Formative assessment only; not in the board exam.)',
      v: table(['Situation', 'Type of drug'], [['Acidity after a heavy meal', 'Antacid'], ['Sneezing from pollen', 'Antihistamine'], ['Headache', 'Analgesic'], ['Throat infection', 'Antibiotic'], ['Cleaning a cut', 'Antiseptic']], 'Table of everyday situations and the types of drug used'),
      n: 'Namaste! Medicines are chemicals that interact with molecules in our bodies. Every time you take a tablet for acidity, a cold or a headache, a chemical reaction is going on inside you. In this part we look at how drugs act and at the main classes of medicine. This chapter is assessed in school, not in the board exam. Remember: medicines must only be taken as a doctor advises.',
    }),
    sl('concept', 'Drugs and medicines', {
      b: '**Drugs** are chemicals of low molecular mass (about 100–500 u) that interact with macromolecular targets in the body and produce a biological response. When the response is **therapeutic** and useful, they are **medicines**, used to diagnose, prevent or treat disease. Most drugs are harmful at higher doses, so they are used only under medical supervision.',
      v: table(['Classification basis', 'Example of a class'], [['Pharmacological effect', 'Analgesics (pain relief)'], ['Action on a target', 'Antihistamines (block histamine)'], ['Chemical structure', 'Sulphonamides'], ['Molecular target', 'Drugs acting on enzymes or receptors']], 'Table of the bases for classifying drugs with examples'),
      n: 'A drug is a fairly small molecule that interacts with large molecules in the body, such as proteins, and changes how they work. If the effect is useful in treating or preventing disease, the drug is called a medicine. The same substance can heal at one dose and harm at another, which is why medicines are taken only as prescribed. Drugs can be classified by their effect, their action, their structure or their target.',
    }),
    sl('diagram', 'Drugs that act on enzymes', {
      b: 'Enzymes hold their **substrate** in an **active site**. A drug that is similar in shape to the substrate can occupy the active site instead: a **competitive inhibitor**. Some drugs bind elsewhere (an **allosteric site**) and change the shape of the active site. If the bond to the enzyme is strong and covalent, inhibition is **irreversible**.',
      v: V.enzyme,
      n: 'Many drugs work by blocking enzymes. An enzyme holds its usual molecule, the substrate, in a pocket called the active site. A drug with a similar shape can sit in the pocket instead, so the substrate cannot bind and the reaction stops. That is competitive inhibition. Other drugs bind at a different site and change the shape of the pocket, and some form strong bonds that block the enzyme permanently.',
    }),
    sl('diagram', 'Drugs that act on receptors', {
      b: '**Receptors** are proteins in cell membranes that receive chemical messengers (such as neurotransmitters and hormones) and pass a signal into the cell. **Agonists** mimic the natural messenger and switch the receptor on. **Antagonists** bind to the receptor and block it, preventing the messenger’s action.',
      v: V.receptor,
      n: 'Cells talk to each other using chemical messengers. A messenger fits into a receptor protein in the cell membrane, like a key in a lock, and a signal passes into the cell. A drug that copies the messenger and switches the receptor on is an agonist. A drug that sits in the receptor and blocks it is an antagonist, which is useful when a message is being sent too strongly.',
    }),
    sl('example', 'Worked example: enzyme or receptor?', {
      b: r`**Problem.** Decide whether each drug acts on an enzyme or a receptor, and how: (a) a drug with a shape similar to an enzyme’s substrate that competes for the active site; (b) a drug that blocks histamine from binding at its receptors in the stomach; (c) a drug that copies a natural messenger to trigger its receptor.

**(a)** Enzyme — competitive inhibitor.

**(b)** Receptor — antagonist (e.g. ranitidine-type antacid).

**(c)** Receptor — agonist.`,
      v: table(['Drug', 'Target', 'Action'], [['(a) Substrate look-alike', 'Enzyme', 'Competitive inhibition'], ['(b) Histamine blocker', 'Receptor', 'Antagonist'], ['(c) Messenger mimic', 'Receptor', 'Agonist']], 'Table of three drugs with their targets and modes of action'),
      n: 'Ask what the drug binds to and what it does there. A substrate look-alike that competes for an enzyme’s pocket is a competitive inhibitor. A drug that stops histamine reaching its receptor is a receptor antagonist. A drug that imitates the natural messenger and switches the receptor on is an agonist.',
    }),
    sl('check', 'Quick check: drug–target interaction', {
      b: 'Identify how a drug interacts with its target.',
      n: 'Quick check. Decide whether the drug blocks a target or imitates the natural messenger.',
      chk: 'antagonist-mcq',
    }),
    sl('concept', 'Antacids and antihistamines', {
      b: '**Antacids** relieve excess stomach acid: weak bases such as **sodium hydrogencarbonate**, **magnesium hydroxide** and **aluminium hydroxide** neutralise it. Overuse of NaHCO₃ makes the stomach alkaline and triggers more acid. Modern drugs such as **cimetidine** and **ranitidine** block histamine at stomach receptors, so less acid is released. **Antihistamines** (brompheniramine, terfenadine) block histamine at other receptors, relieving allergies such as sneezing and itching.',
      m: [r`\ce{NaHCO3 + HCl -> NaCl + H2O + CO2}`, r`\ce{Mg(OH)2 + 2HCl -> MgCl2 + 2H2O}`],
      v: table(['Drug', 'Type', 'How it helps'], [['Mg(OH)₂, Al(OH)₃', 'Antacid (insoluble base)', 'Neutralises excess acid'], ['Cimetidine, ranitidine', 'Antacid (H₂ blocker)', 'Stops histamine releasing acid'], ['Brompheniramine, terfenadine', 'Antihistamine', 'Blocks histamine in allergies']], 'Table of antacids and antihistamines and how they act'),
      n: 'When the stomach produces too much acid, antacids help. Simple antacids, like magnesium hydroxide, are bases that neutralise the acid. Insoluble bases are preferred, because soluble ones can overshoot and make the stomach alkaline, prompting even more acid. Newer drugs stop the acid being released by blocking histamine at stomach receptors. Antihistamines block histamine at other receptors and relieve allergic sneezing and itching.',
    }),
    sl('example', 'Worked example: antacid calculation', {
      b: r`**Problem.** A patient has about $0.020\ \text{mol}$ of excess HCl in the stomach. What mass of magnesium hydroxide ($M = 58$) is needed to neutralise it?

**Step 1.** $\ce{Mg(OH)2 + 2HCl -> MgCl2 + 2H2O}$: 1 mol Mg(OH)₂ neutralises 2 mol HCl.

**Step 2.** Moles of Mg(OH)₂ $= 0.020 \div 2 = 0.010$.

**Step 3.** Mass $= 0.010 \times 58 = 0.58\ \text{g}$.`,
      v: table(['Quantity', 'Value'], [['Excess HCl', '0.020 mol'], ['Mg(OH)₂ needed', '0.010 mol'], ['Mass of Mg(OH)₂', '0.58 g']], 'Table of moles of acid, moles of base and mass of magnesium hydroxide'),
      n: 'Use the balanced equation. One mole of magnesium hydroxide neutralises two moles of hydrochloric acid. So nought point nought two moles of acid needs nought point nought one moles of the base. Multiplying by the molar mass, fifty eight, gives just over half a gram, which is roughly the amount of base in a typical antacid dose.',
    }),
    sl('concept', 'Tranquilisers and analgesics', {
      b: '**Tranquilisers** act on the nervous system to relieve stress and anxiety: e.g. **equanil** (for depression and hypertension), barbiturates such as **veronal** and **seconal** (hypnotics, sleep-producing). **Analgesics** reduce pain without loss of consciousness: **non-narcotic** (aspirin, paracetamol) relieve pain and fever; aspirin also reduces inflammation and prevents blood clotting. **Narcotic** analgesics (morphine, codeine) relieve severe pain but cause sleep and addiction, so they are strictly controlled.',
      v: table(['Analgesic', 'Type', 'Notes'], [['Aspirin', 'Non-narcotic', 'Pain, fever, inflammation; prevents clotting'], ['Paracetamol', 'Non-narcotic', 'Pain and fever'], ['Morphine, codeine', 'Narcotic', 'Severe pain (e.g. after surgery); addictive']], 'Table of non-narcotic and narcotic analgesics'),
      n: 'Tranquilisers calm the nervous system and are used for anxiety and some mental illnesses; some, called hypnotics, help people sleep. Analgesics reduce pain. Non-narcotic ones like aspirin and paracetamol also bring down fever, and aspirin reduces inflammation and thins the blood. Narcotic analgesics like morphine relieve severe pain but are habit-forming, so they are given only under strict medical control.',
    }),
    sl('concept', 'Antimicrobials: antibiotics', {
      b: '**Antimicrobials** destroy or prevent the growth of microbes: antibacterials, antifungals, antivirals, antiparasitics. **Antibiotics** are chemicals (originally from micro-organisms) that inhibit or kill microbes. **Bactericidal:** kill bacteria (penicillin, ofloxacin, aminoglycosides). **Bacteriostatic:** stop growth (erythromycin, tetracycline, chloramphenicol). **Broad-spectrum** antibiotics act on many types of bacteria (chloramphenicol, ampicillin, amoxycillin); **narrow-spectrum** on a few (penicillin G). Salvarsan (arsenic-based, for syphilis) and **sulphonamides** (prontosil → sulphanilamide) were early synthetic antimicrobials.',
      v: table(['Classification', 'Examples'], [['Bactericidal', 'Penicillin, ofloxacin, aminoglycosides'], ['Bacteriostatic', 'Erythromycin, tetracycline, chloramphenicol'], ['Broad-spectrum', 'Chloramphenicol, ampicillin, amoxycillin, vancomycin, ofloxacin'], ['Narrow-spectrum', 'Penicillin G']], 'Table classifying antibiotics with examples'),
      n: 'Antibiotics are chemicals, first discovered in micro-organisms like moulds, that fight bacterial infections. Some kill bacteria outright and are called bactericidal; others only stop them multiplying, leaving the body’s defences to finish the job, and are called bacteriostatic. A broad-spectrum antibiotic works against many kinds of bacteria; a narrow-spectrum one against a few. Antibiotics must be taken exactly as prescribed, to avoid resistance.',
    }),
    sl('check', 'Quick check: medicines', {
      b: 'Classify a medicine by its use or action.',
      n: 'Quick check. Recall which drugs relieve pain, which calm anxiety and which kill bacteria.',
      chk: 'analgesic-mcq',
    }),
    sl('concept', 'Antiseptics, disinfectants and antifertility drugs', {
      b: '**Antiseptics** kill or prevent growth of micro-organisms on **living tissue** (wounds, skin): Dettol (chloroxylenol + terpineol), bithionol (in soaps), iodine tincture (2–3% iodine in alcohol–water), boric acid (eyes). **Disinfectants** are used on **non-living** objects (floors, drains, instruments). The same substance can be both, depending on **concentration**: 0.2% phenol is an antiseptic, 1% phenol a disinfectant; chlorine at 0.2–0.4 ppm in water is a disinfectant. **Antifertility drugs** are synthetic steroid hormones (progestogen + oestrogen derivatives, e.g. norethindrone, ethynylestradiol).',
      v: table(['Antiseptic (living tissue)', 'Disinfectant (non-living)'], [['0.2% phenol', '1% phenol'], ['Dettol, iodine tincture, boric acid', 'Chlorine (0.2–0.4 ppm in water), SO₂ (low concentration)'], ['Applied to wounds and skin', 'Applied to floors, drains, instruments']], 'Table contrasting antiseptics and disinfectants with examples'),
      n: 'Antiseptics and disinfectants both kill germs, but they are used on different things. Antiseptics, like Dettol or iodine tincture, are gentle enough for skin and wounds. Disinfectants are stronger and are used on floors, drains and instruments. Often the difference is only concentration: a very dilute phenol solution is an antiseptic, while a stronger one is a disinfectant. Antifertility drugs are synthetic steroid hormones used in birth control pills.',
    }),
    sl('check', 'Quick check: antiseptic or disinfectant', {
      b: 'Decide whether a substance at a given concentration is an antiseptic or a disinfectant.',
      n: 'Quick check. Ask whether it is meant for living tissue or for non-living objects.',
      chk: 'phenol-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Drugs: small molecules acting on targets; medicines are drugs with a therapeutic effect.',
        'Enzyme inhibitors (competitive, allosteric, irreversible); receptor agonists and antagonists.',
        'Antacids (bases, H₂ blockers); antihistamines; tranquilisers; analgesics (non-narcotic, narcotic).',
        'Antibiotics: bactericidal vs bacteriostatic; broad vs narrow spectrum.',
        'Antiseptics (living tissue) vs disinfectants (non-living); concentration matters.',
        'Antifertility drugs: synthetic steroid hormones.',
      ],
      v: table(['Class', 'One example'], [['Antacid', 'Mg(OH)₂'], ['Antihistamine', 'Brompheniramine'], ['Tranquiliser', 'Equanil'], ['Non-narcotic analgesic', 'Aspirin'], ['Bactericidal antibiotic', 'Penicillin']], 'Summary table of drug classes with examples'),
      n: 'Let us sum up Part 1. Drugs act mainly on enzymes and receptors, blocking or imitating natural molecules. Medicines are classified by their effect: antacids, antihistamines, tranquilisers, analgesics, antimicrobials and antifertility drugs. Antibiotics may kill bacteria or just stop their growth, and act on a broad or narrow range. Antiseptics are for living tissue, disinfectants for objects.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give one named example for every class of drug.',
        'Antiseptic vs disinfectant: living vs non-living; same chemical may be both.',
        'Bactericidal kills; bacteriostatic stops growth.',
        'Explain why insoluble bases are preferred as antacids.',
      ],
      v: table(['Slip', 'Fix'], [['Morphine is non-narcotic', 'It is narcotic'], ['1% phenol is an antiseptic', 'It is a disinfectant'], ['Chloramphenicol is narrow-spectrum', 'It is broad-spectrum']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'A few tips. Learn one example for each class of medicine. Remember that the same chemical can be an antiseptic or a disinfectant depending on concentration. Keep bactericidal and bacteriostatic straight. And be ready to explain why an insoluble base is a better antacid than baking soda.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemistry in Everyday Life — Part 2: Chemicals in food',
  goals: [
    'Explain why chemicals are added to food',
    'Describe artificial sweetening agents and compare their sweetness',
    'Describe food preservatives and how they work',
    'Explain the role of antioxidants in food',
  ],
  slides: [
    sl('title', 'Chemicals in food', {
      b: 'Part 2 — sweeteners, preservatives and antioxidants.',
      v: table(['Additive group', 'Purpose', 'Example'], [['Artificial sweeteners', 'Sweetness with little or no energy', 'Aspartame, sucralose'], ['Preservatives', 'Prevent spoilage by microbes', 'Sodium benzoate, salt, sugar'], ['Antioxidants', 'Slow oxidation (rancidity)', 'BHT, BHA'], ['Others', 'Colour, flavour, nutrients, emulsifiers', 'Food colours, vitamins']], 'Table of groups of food additives, their purposes and examples'),
      n: 'Look at the label on a packet of biscuits or a bottle of squash and you will find a list of additives. Chemicals are added to food to keep it safe for longer, to make it more appealing, or to change its nutrition. In this part we look at three important groups: artificial sweeteners, preservatives and antioxidants. Additives are allowed only within limits set by food safety laws.',
    }),
    sl('concept', 'Why add chemicals to food?', {
      b: 'Food additives preserve food, improve its appeal and add nutritive value. They include food colours, flavours and sweeteners, fat emulsifiers and stabilisers, flour improvers, antioxidants, preservatives and nutritional supplements (minerals, vitamins, amino acids). Except for nutritional supplements, they generally have **no nutritive value**.',
      v: flow('LR', [['a', 'Food additives'], ['b', 'Keep food safe longer'], ['c', 'Improve taste, colour, texture'], ['d', 'Add nutrients']], [['a', 'b', 'preservatives, antioxidants'], ['a', 'c', 'sweeteners, colours, emulsifiers'], ['a', 'd', 'vitamins, minerals']], 'Flow of the purposes of food additives with examples'),
      n: 'Additives serve three broad purposes. Some, like preservatives and antioxidants, keep food safe and fresh for longer. Others, like sweeteners, colours and emulsifiers, make food look, taste or feel better. And some, like added vitamins and minerals, improve nutrition, as in iodised salt. Apart from those nutrients, most additives provide no nourishment themselves.',
    }),
    sl('concept', 'Artificial sweetening agents', {
      b: 'Sucrose and fructose are natural sweeteners but add **calories**. **Artificial sweeteners** give sweetness with little or no energy, useful for people with diabetes or those controlling weight. Sweetness is compared with cane sugar (sucrose = 1).',
      v: table(['Sweetener', 'Sweetness relative to sucrose', 'Notes'], [['Aspartame', '100', 'Unstable at cooking temperatures; used in cold foods and drinks'], ['Saccharin', '550', 'First popular sweetener; excreted unchanged'], ['Sucralose', '600', 'Trichloro derivative of sucrose; stable at cooking temperature; no calories'], ['Alitame', '2000', 'Very potent; sweetness hard to control']], 'Table of artificial sweeteners with sweetness relative to sucrose and notes'),
      n: 'Sugar is sweet but full of energy. Artificial sweeteners give the taste of sweetness in tiny amounts, with almost no energy, so they help people with diabetes and those watching their weight. Saccharin is about five hundred and fifty times as sweet as sugar. Aspartame is about a hundred times sweeter but breaks down when heated, so it is used only in cold foods. Sucralose survives cooking.',
    }),
    sl('example', 'Worked example: matching sweetness', {
      b: r`**Problem.** A recipe for a cold dessert uses $33\ \text{g}$ of sugar. What mass of saccharin (sweetness 550) would give the same sweetness? Could aspartame be used if the dessert were baked instead?

**Step 1.** Mass of saccharin $= 33 \div 550 = 0.06\ \text{g}$ (60 mg).

**Step 2.** No — aspartame decomposes at cooking temperatures; sucralose, which is heat-stable, could be used for a baked dessert.`,
      v: table(['Sweetener', 'Mass for the sweetness of 33 g sugar'], [['Sucrose', '33 g'], ['Aspartame (100)', '0.33 g'], ['Saccharin (550)', '0.06 g'], ['Sucralose (600)', '0.055 g']], 'Table of masses of sweeteners equivalent in sweetness to thirty three grams of sugar'),
      n: 'Because saccharin is five hundred and fifty times as sweet as sugar, we divide the mass of sugar by five hundred and fifty: only about sixty milligrams is needed. If the dessert is to be baked, aspartame is a poor choice because heat destroys it; sucralose, which is stable on heating, would work instead.',
    }),
    sl('check', 'Quick check: sweeteners', {
      b: 'Choose a suitable sweetener for a situation.',
      n: 'Quick check. Think about stability on heating and how many times sweeter each sweetener is.',
      chk: 'sweetener-mcq',
    }),
    sl('concept', 'Food preservatives', {
      b: '**Preservatives** prevent spoilage by microbial growth. Traditional ones: **table salt**, **sugar** and **vegetable oils** (pickles, jams). Common chemical preservatives: **sodium benzoate** (in small amounts; metabolised to hippuric acid and excreted), salts of **sorbic acid** and **propanoic acid**.',
      v: table(['Preservative', 'Typical use', 'How it works'], [['Salt', 'Pickles, dried fish', 'Draws water out of microbes (osmosis)'], ['Sugar', 'Jams, murabba', 'High concentration dehydrates microbes'], ['Oil', 'Pickles', 'Keeps out air and moisture'], ['Sodium benzoate', 'Squashes, sauces', 'Inhibits growth of moulds and bacteria']], 'Table of preservatives, their uses and how they work'),
      n: 'Food spoils mainly because bacteria and moulds grow in it. Our grandparents preserved mango pickle with salt and oil, and fruit as jam with lots of sugar: high concentrations of salt or sugar draw water out of microbes by osmosis, so they cannot grow. Factories add small amounts of sodium benzoate to squashes and sauces; the body converts it to hippuric acid and excretes it.',
    }),
    sl('example', 'Worked example: preservative concentration', {
      b: r`**Problem.** A food rule allows sodium benzoate up to $0.1\%$ by mass in a fruit squash. What is the maximum mass of sodium benzoate in a $750\ \text{g}$ bottle?

**Step 1.** $0.1\% = 0.1 \div 100 = 0.001$.

**Step 2.** Maximum mass $= 0.001 \times 750 = 0.75\ \text{g}$.`,
      v: table(['Quantity', 'Value'], [['Mass of squash', '750 g'], ['Limit', '0.1% by mass'], ['Maximum sodium benzoate', '0.75 g']], 'Table of squash mass, limit and maximum mass of preservative'),
      n: 'Percentage by mass means grams per hundred grams. Nought point one percent is one thousandth. One thousandth of seven hundred and fifty grams is nought point seven five grams. Food laws set such limits so that preservatives stay at levels that are safe to consume.',
    }),
    sl('check', 'Quick check: preservatives', {
      b: 'Explain how a preservative stops food spoiling.',
      n: 'Quick check. Salt and sugar work by osmosis; sodium benzoate inhibits microbial growth.',
      chk: 'preservative-mcq',
    }),
    sl('concept', 'Antioxidants in food', {
      b: 'Fats and oils react slowly with oxygen and turn **rancid** (bad smell and taste). **Antioxidants** react with oxygen or with free radicals more readily than the food does, so they slow down oxidation. Common food antioxidants: **BHT** (butylated hydroxytoluene) and **BHA** (butylated hydroxyanisole), often with citric or ascorbic acid; **sulfur dioxide** and **sulfites** in wine, beer and fruit juices.',
      v: table(['Antioxidant', 'Typical use'], [['BHA, BHT', 'Butter, oils, chips, biscuits'], ['SO₂, sulfites', 'Fruit juices, wines, dried fruits'], ['Ascorbic acid, citric acid', 'Added with BHA/BHT to boost their effect']], 'Table of food antioxidants and their uses'),
      n: 'Leave a packet of fried snacks open for a few weeks and they start to smell stale. Fats and oils react with oxygen in the air, a process called rancidity. Antioxidants protect food by reacting with oxygen or with free radicals faster than the food does. Butylated hydroxy compounds, known as BHA and BHT, are added to butter, oils and snacks, and sulfur dioxide protects fruit juices.',
    }),
    sl('check', 'Quick check: antioxidants', {
      b: 'Identify the role of an antioxidant in food.',
      n: 'Quick check. Antioxidants are sacrificed so that the food itself is not oxidised.',
      chk: 'antioxidant-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Food additives preserve, improve appeal or add nutrients.',
        'Artificial sweeteners: aspartame (100), saccharin (550), sucralose (600), alitame (2000).',
        'Aspartame is unstable on heating; sucralose is heat-stable.',
        'Preservatives: salt, sugar, oil, sodium benzoate, sorbates, propanoates.',
        'Antioxidants (BHA, BHT, SO₂) slow rancidity.',
      ],
      v: table(['Problem', 'Additive'], [['Too many calories', 'Artificial sweetener'], ['Microbial spoilage', 'Preservative'], ['Rancidity of fats', 'Antioxidant']], 'Summary table matching food problems to additives'),
      n: 'Let us sum up Part 2. Food additives keep food safe, make it more appealing, or add nutrients. Artificial sweeteners give sweetness without calories, with very different strengths and heat stabilities. Preservatives stop microbes spoiling food, and antioxidants stop fats going rancid. All are used within legal limits.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Learn the relative sweetness of the four sweeteners.',
        'State why aspartame is used only in cold foods.',
        'Name sodium benzoate and its fate in the body (hippuric acid).',
        'Give BHA and BHT as antioxidants for fats.',
      ],
      v: table(['Slip', 'Fix'], [['Saccharin is 100 times sweeter', 'About 550 times'], ['Antioxidants kill microbes', 'They slow oxidation'], ['Sucralose breaks down on cooking', 'It is heat-stable']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Learn the sweetness numbers and the heat stability of each sweetener. Know how preservatives such as salt, sugar and sodium benzoate work. Do not confuse preservatives, which stop microbes, with antioxidants, which stop oxidation. And name BHA and BHT when asked for antioxidants.',
    }),
  ],
});
