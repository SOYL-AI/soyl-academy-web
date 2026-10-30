// ch14 Chemistry in Everyday Life — question bank. MCQ keys are placed by the builder (balanced);
// AR keys planned: a c b d a c a. Every numerical is re-solved by the check function passed to add().
// Items describe drug classes at textbook level only; none gives dosing advice.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 drugs and targets
add('antagonist-mcq', mcq({
  stem: 'A drug binds to a receptor in the cell membrane but does not pass on any signal, so the natural messenger cannot act. The drug is:',
  right: 'an antagonist',
  wrong: ['an agonist', 'a competitive enzyme substrate', 'an antioxidant'],
  sol: 'Blocking a receptor without activating it is antagonist action — option (@K). An agonist switches the receptor on (@1).',
  d: 2, c: 'understanding', t: [1],
}));
add('competitive-mcq', mcq({
  stem: 'A drug molecule closely resembles the natural substrate of an enzyme and occupies its active site. This type of inhibition is called:',
  right: 'competitive inhibition',
  wrong: ['allosteric inhibition', 'receptor agonism', 'denaturation'],
  sol: 'The drug competes with the substrate for the active site — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('allosteric-mcq', mcq({
  stem: 'A drug binds to an enzyme at a site away from the active site, changing the shape of the active site so the substrate no longer fits. The drug binds at:',
  right: 'an allosteric site',
  wrong: ['the active site', 'a receptor in the cell membrane', 'the substrate'],
  sol: 'Binding elsewhere that alters the active site’s shape is allosteric inhibition — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('medicine-mcq', mcq({
  stem: 'Most drugs are prescribed only in carefully controlled amounts because:',
  right: 'they can be harmful or poisonous at higher doses',
  wrong: ['they are always inactive at low doses', 'they have very high molar masses', 'they never interact with proteins'],
  sol: 'A drug that is therapeutic at one dose may be toxic at another — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('target-tf', tf({
  stem: 'An agonist mimics the natural messenger and switches a receptor on.',
  key: 't',
  sol: 'True. Agonists activate receptors; antagonists block them.',
  d: 1, c: 'recall', t: [1],
}));
add('target-ar', ar({
  a: 'A competitive inhibitor can slow down an enzyme-catalysed reaction.',
  r: 'A competitive inhibitor occupies the active site so that the substrate cannot bind there.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('target-short', short({
  marks: 2,
  stem: 'Explain, with the help of the idea of an active site, how a drug can act as an enzyme inhibitor in two different ways.',
  model: 'A drug similar in shape to the substrate can occupy the active site, so the substrate cannot bind: competitive inhibition. Alternatively, a drug can bind at a different (allosteric) site and change the shape of the active site, so the substrate no longer fits.',
  sol: 'Competitive and allosteric inhibition.',
  scheme: [['Competitive inhibition', 1], ['Allosteric inhibition', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t01 antacids, antihistamines, tranquilisers, analgesics
add('antacid-mcq', mcq({
  stem: 'Why is magnesium hydroxide preferred to sodium hydrogencarbonate as an antacid?',
  right: 'It is insoluble, so excess does not make the stomach alkaline and trigger more acid',
  wrong: ['It produces carbon dioxide gas', 'It is a strong acid', 'It blocks histamine receptors'],
  sol: 'Excess soluble NaHCO₃ makes the stomach alkaline, stimulating more acid; insoluble Mg(OH)₂ does not — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ranitidine-mcq', mcq({
  stem: 'A patient has stomach ulcers caused by excess acid. A doctor prefers a drug such as ranitidine to simple bases because it:',
  right: 'stops histamine from stimulating acid release at stomach receptors',
  wrong: ['neutralises acid instantly by producing CO₂', 'kills the bacteria that make acid', 'coats the stomach with oil'],
  sol: 'Ranitidine blocks histamine’s action at receptors in the stomach wall, reducing acid secretion at source — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('antihistamine-mcq', mcq({
  stem: 'A student sneezes and has itchy eyes every time she dusts old books. A doctor is most likely to suggest:',
  right: 'an antihistamine such as brompheniramine',
  wrong: ['an antacid such as Mg(OH)₂', 'a narcotic analgesic such as morphine', 'an antifertility drug'],
  sol: 'Allergic symptoms are caused by histamine; antihistamines block its receptors — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('analgesic-mcq', mcq({
  stem: 'Which drug is a non-narcotic analgesic that also reduces fever?',
  right: 'Paracetamol',
  wrong: ['Morphine', 'Equanil', 'Penicillin'],
  sol: 'Paracetamol relieves pain and fever without causing addiction — option (@K). Morphine is narcotic (@1).',
  d: 1, c: 'recall', t: [1],
}));
add('aspirin-mcq', mcq({
  stem: 'Aspirin is sometimes given in low doses to people at risk of heart attacks because it:',
  right: 'prevents platelets from clotting',
  wrong: ['kills heart bacteria', 'lowers stomach acid', 'acts as a tranquiliser'],
  sol: 'Aspirin has an anti-blood-clotting action — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('narcotic-mcq', mcq({
  stem: 'Morphine is given only under strict medical control because it:',
  right: 'relieves severe pain but is addictive and causes sleep',
  wrong: ['is a broad-spectrum antibiotic', 'is a weak base used as an antacid', 'has no effect on the nervous system'],
  sol: 'Narcotic analgesics produce sleep and dependence — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('tranquil-mcq', mcq({
  stem: 'Barbiturates such as veronal and seconal belong to which class of drugs?',
  right: 'Tranquilisers (hypnotics)',
  wrong: ['Antibiotics', 'Antacids', 'Antiseptics'],
  sol: 'Barbiturates are sleep-producing tranquilisers — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('drug-match', match({
  stem: 'Match each drug with its class.',
  pairs: [
    ['Equanil', 'Tranquiliser'],
    ['Terfenadine', 'Antihistamine'],
    ['Codeine', 'Narcotic analgesic'],
    ['Cimetidine', 'Antacid'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Equanil → tranquiliser; terfenadine → antihistamine; codeine → narcotic analgesic; cimetidine → antacid.',
  d: 1, c: 'recall', t: [1],
}));
add('antacid-tf', tf({
  stem: 'Antihistamines such as brompheniramine reduce the secretion of acid in the stomach.',
  key: 'f',
  sol: 'False. These antihistamines act on receptors involved in allergy; acid secretion is controlled by different histamine receptors, blocked by drugs such as cimetidine and ranitidine.',
  d: 4, c: 'analysis', t: [1],
}));
add('antacid-ar', ar({
  a: 'Sodium hydrogencarbonate is not an ideal antacid for regular use.',
  r: 'Sodium hydrogencarbonate is an acid.',
  key: 'c',
  sol: 'A is true (excess makes the stomach alkaline and triggers more acid); R is false — NaHCO₃ is a weak base — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('analgesic-ar', ar({
  a: 'Aspirin is used to reduce fever.',
  r: 'Aspirin prevents platelet coagulation.',
  key: 'b',
  sol: 'Both are true, but the anti-clotting action does not explain the fever-reducing (antipyretic) action — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('antacid-num', num({
  marks: 2,
  stem: r`An antacid tablet contains $0.39\ \text{g}$ of aluminium hydroxide, $\ce{Al(OH)3}$ ($M = 78$). How many moles of HCl can it neutralise?`,
  value: 0.015, tol: 0.0002, unit: 'mol',
  sol: r`$\ce{Al(OH)3 + 3HCl -> AlCl3 + 3H2O}$. Moles of Al(OH)₃ $= 0.39 \div 78 = 0.005$; moles of HCl $= 3 \times 0.005 = 0.015$, so $0.015\ \text{mol}$.`,
  scheme: [['Equation and 0.005 mol Al(OH)₃', 1], ['0.015 mol HCl', 1]],
  d: 3, c: 'application', t: [1],
}), () => near((0.39 / 78) * 3, 0.015) || 'aloh3');
add('co2-num', num({
  stem: r`What volume of $\ce{CO2}$, in litres at STP ($22.4\ \text{L mol}^{-1}$), is released when $0.84\ \text{g}$ of $\ce{NaHCO3}$ ($M = 84$) reacts completely with stomach acid?`,
  value: 0.224, tol: 0.002, unit: 'L',
  sol: r`$\ce{NaHCO3 + HCl -> NaCl + H2O + CO2}$ (1 : 1). Moles $= 0.84 \div 84 = 0.01$; volume $= 0.01 \times 22.4 = 0.224$, so $0.224\ \text{L}$.`,
  scheme: [['0.224 L', 1]],
  d: 2, c: 'application', t: [1],
}), () => near((0.84 / 84) * 22.4, 0.224) || 'co2');
add('antacid-short', short({
  marks: 2,
  stem: 'Distinguish between the way magnesium hydroxide and ranitidine relieve acidity.',
  model: 'Magnesium hydroxide is a weak, insoluble base that neutralises the excess hydrochloric acid already in the stomach. Ranitidine does not neutralise acid; it blocks histamine at receptors in the stomach wall, so less acid is released in the first place.',
  sol: 'Neutralisation vs blocking secretion.',
  scheme: [['Mg(OH)₂ neutralises acid', 1], ['Ranitidine blocks histamine, reducing secretion', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('analgesic-short', short({
  marks: 2,
  stem: 'A patient after major surgery is given morphine, while a student with a headache takes paracetamol. Explain the difference between the two drugs.',
  model: 'Both are analgesics. Morphine is a narcotic analgesic: it relieves severe pain but produces sleep and can be addictive, so it is used only under close medical control. Paracetamol is a non-narcotic analgesic: it relieves mild pain and fever without causing addiction or loss of consciousness.',
  sol: 'Narcotic vs non-narcotic.',
  scheme: [['Morphine: narcotic, severe pain, addictive', 1], ['Paracetamol: non-narcotic, mild pain, fever', 1]],
  d: 2, c: 'application', t: [1],
}));
add('class-short3', short({
  marks: 3,
  stem: 'Name the class of drug needed in each case and give one example: (a) a person with anxiety and sleeplessness before an operation; (b) a child with high fever; (c) a person with hay fever (sneezing caused by pollen).',
  model: '(a) A tranquiliser, here a hypnotic such as a barbiturate (e.g. veronal) or equanil, which acts on the nervous system to relieve anxiety and induce sleep. (b) An antipyretic, non-narcotic analgesic such as paracetamol, which lowers fever. (c) An antihistamine such as brompheniramine or terfenadine, which blocks histamine released in the allergic reaction.',
  sol: 'Tranquiliser, antipyretic, antihistamine.',
  scheme: [['(a) Tranquiliser with example', 1], ['(b) Antipyretic/analgesic with example', 1], ['(c) Antihistamine with example', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t01 antimicrobials, antiseptics, antifertility
add('phenol-mcq', mcq({
  stem: 'A 1% solution of phenol is used to clean a hospital floor, while a 0.2% solution is used on skin. This shows that:',
  right: 'the same chemical can be a disinfectant or an antiseptic depending on concentration',
  wrong: ['phenol is an antibiotic', 'phenol is safe on skin at any concentration', 'disinfectants are always weaker than antiseptics'],
  sol: '1% phenol is a disinfectant; 0.2% phenol is an antiseptic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bactericidal-mcq', mcq({
  stem: 'Which antibiotic is bactericidal?',
  right: 'Penicillin',
  wrong: ['Erythromycin', 'Tetracycline', 'Chloramphenicol'],
  sol: 'Penicillin kills bacteria — option (@K). The others are bacteriostatic.',
  d: 2, c: 'recall', t: [1],
}));
add('broad-mcq', mcq({
  stem: 'A doctor needs to treat an infection before the exact bacterium is identified. Which type of antibiotic is the sensible first choice?',
  right: 'A broad-spectrum antibiotic such as ampicillin',
  wrong: ['A narrow-spectrum antibiotic such as penicillin G', 'An antacid', 'A tranquiliser'],
  sol: 'A broad-spectrum antibiotic is effective against many kinds of bacteria — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dettol-mcq', mcq({
  stem: 'Dettol, used on cuts, is a mixture of:',
  right: 'chloroxylenol and terpineol',
  wrong: ['iodine and alcohol', 'phenol and chlorine', 'boric acid and glycerol'],
  sol: 'Dettol contains chloroxylenol and terpineol — option (@K). Iodine in alcohol–water is tincture of iodine (@1).',
  d: 1, c: 'recall', t: [1],
}));
add('chlorine-mcq', mcq({
  stem: 'A municipal water works adds chlorine to drinking water at about 0.3 ppm. Here chlorine acts as:',
  right: 'a disinfectant',
  wrong: ['an antiseptic', 'an antibiotic', 'an antacid'],
  sol: 'Chlorine at 0.2–0.4 ppm kills microbes in water, a non-living medium — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('antifertility-mcq', mcq({
  stem: 'Norethindrone, used in birth control pills, is chemically:',
  right: 'a synthetic steroid hormone (progesterone derivative)',
  wrong: ['an antibiotic', 'a sulpha drug', 'an artificial sweetener'],
  sol: 'Antifertility drugs are synthetic progesterone and oestrogen derivatives — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sulpha-mcq', mcq({
  stem: 'Prontosil showed antibacterial activity only inside the body. This was explained when it was found that:',
  right: 'it is converted in the body into sulphanilamide, the active compound',
  wrong: ['it kills bacteria only at body temperature', 'it reacts with stomach acid to give penicillin', 'it acts as an antacid'],
  sol: 'The body metabolises prontosil to sulphanilamide, which led to the sulpha drugs — option (@K).',
  d: 4, c: 'analysis', t: [1],
}));
add('antiseptic-fill', fill({
  stem: 'A chemical applied to living tissue such as a wound to kill or prevent the growth of microbes is called an ___.',
  acc: [['antiseptic']],
  sol: 'An **antiseptic**; for non-living objects it would be a disinfectant.',
  d: 1, c: 'recall', t: [1],
}));
add('antibiotic-match', match({
  stem: 'Match each antibiotic or antimicrobial with its description.',
  pairs: [
    ['Chloramphenicol', 'Broad-spectrum, bacteriostatic'],
    ['Penicillin G', 'Narrow-spectrum'],
    ['Ofloxacin', 'Bactericidal, broad-spectrum'],
    ['Salvarsan', 'Arsenic-based drug for syphilis'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Chloramphenicol → broad-spectrum bacteriostatic; penicillin G → narrow-spectrum; ofloxacin → bactericidal broad-spectrum; salvarsan → arsenic drug for syphilis.',
  d: 2, c: 'understanding', t: [1],
}));
add('antiseptic-tf', tf({
  stem: 'Boric acid in dilute aqueous solution is used as a mild antiseptic for the eyes.',
  key: 't',
  sol: 'True. Dilute boric acid solution is a weak antiseptic for eyes.',
  d: 1, c: 'recall', t: [1],
}));
add('bacteriostatic-ar', ar({
  a: 'Tetracycline is a bacteriostatic antibiotic.',
  r: 'Bacteriostatic antibiotics kill bacteria outright.',
  key: 'c',
  sol: 'A is true; R is false — bacteriostatic drugs stop bacterial growth rather than killing bacteria — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('phenol-ar', ar({
  a: 'Phenol at 1% concentration is used as an antiseptic on wounds.',
  r: 'The effect of a chemical as an antiseptic or disinfectant depends on its concentration.',
  key: 'd',
  sol: 'A is false (1% phenol is a disinfectant; 0.2% is the antiseptic); R is true — option (d).',
  d: 4, c: 'analysis', t: [1],
}));
add('phenol-num', num({
  stem: 'A hospital needs 2.0 kg of 1.0% (by mass) phenol disinfectant solution. What mass of phenol, in grams, is required?',
  value: 20, tol: 0.1, unit: 'g',
  sol: r`Mass $= 2000 \times 1.0 \div 100 = 20$, so $20\ \text{g}$ of phenol.`,
  scheme: [['20 g', 1]],
  d: 1, c: 'application', t: [1],
}), () => near(2000 * 0.01, 20) || 'phenol');
add('iodine-num', num({
  stem: 'Tincture of iodine contains about 2.5% iodine by mass. What mass of iodine, in grams, is present in 40 g of tincture?',
  value: 1, tol: 0.01, unit: 'g',
  sol: r`Mass $= 40 \times 2.5 \div 100 = 1.0$, so $1.0\ \text{g}$.`,
  scheme: [['1.0 g', 1]],
  d: 1, c: 'application', t: [1],
}), () => near(40 * 0.025, 1) || 'iodine');
add('antiseptic-short', short({
  marks: 2,
  stem: 'Distinguish between antiseptics and disinfectants, giving one example of a substance that can act as both.',
  model: 'Antiseptics are applied to living tissue, such as wounds and skin, to kill or prevent the growth of micro-organisms without harming the tissue. Disinfectants are applied to non-living objects such as floors and drains. Phenol is an example: a 0.2% solution is an antiseptic and a 1% solution is a disinfectant.',
  sol: 'Living vs non-living; phenol.',
  scheme: [['Distinction', 1], ['Phenol (or similar) with concentrations', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('antibiotic-short', short({
  marks: 2,
  stem: 'Explain the terms bactericidal and broad-spectrum, with one example of each.',
  model: 'A bactericidal antibiotic kills bacteria, e.g. penicillin or ofloxacin, whereas a bacteriostatic one only stops their growth. A broad-spectrum antibiotic is effective against a wide range of Gram-positive and Gram-negative bacteria, e.g. ampicillin or chloramphenicol.',
  sol: 'Definitions with examples.',
  scheme: [['Bactericidal with example', 1], ['Broad-spectrum with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('resistance-short', short({
  marks: 2,
  stem: 'A patient stops taking a course of antibiotics after two days because he feels better. Explain why doctors advise against this.',
  model: 'Feeling better does not mean all the bacteria have been killed or stopped. If the course is stopped early, the surviving bacteria, often the least sensitive ones, can multiply again, causing a relapse, and they may become resistant to the antibiotic, so it works less well in future.',
  sol: 'Surviving bacteria; relapse and resistance.',
  scheme: [['Not all bacteria eliminated; relapse', 1], ['Survivors may become resistant', 1]],
  d: 3, c: 'application', t: [1],
}));
add('antimicrobial-short3', short({
  marks: 3,
  stem: 'For each situation, name the type of antimicrobial chemical and an example: (a) cleaning a small cut on the knee; (b) treating a bacterial throat infection; (c) making well water safe to drink.',
  model: '(a) An antiseptic, such as Dettol, tincture of iodine or dilute phenol (0.2%), which can be applied to living tissue. (b) An antibiotic, such as amoxycillin or penicillin, taken as prescribed by a doctor. (c) A disinfectant, such as chlorine at about 0.2–0.4 ppm, which kills microbes in water.',
  sol: 'Antiseptic, antibiotic, disinfectant.',
  scheme: [['(a) Antiseptic with example', 1], ['(b) Antibiotic with example', 1], ['(c) Disinfectant with example', 1]],
  d: 2, c: 'application', t: [1],
}));
add('medicine-long', long({
  stem: '(a) What are drugs and medicines? Why should medicines be taken only under medical advice?\n\n(b) Explain how drugs interact with enzymes and receptors.\n\n(c) Describe antacids and antihistamines, explaining why ranitidine was an improvement over simple antacids.',
  model: 'Drugs are low-molecular-mass chemicals that interact with macromolecular targets and produce a biological response; medicines are drugs with a therapeutic use. Most drugs are harmful in larger doses, so they are taken only as prescribed. A drug can occupy an enzyme’s active site, competing with the substrate (competitive inhibition), or bind at an allosteric site and change the active site’s shape. At receptors, agonists mimic the natural messenger and switch the receptor on, while antagonists block it. Simple antacids such as Mg(OH)₂ and Al(OH)₃ neutralise excess acid; excess NaHCO₃ makes the stomach alkaline and triggers more acid. Ranitidine blocks histamine at stomach receptors, so less acid is released, treating the cause. Antihistamines such as brompheniramine block histamine in allergies.',
  sol: 'Definitions; enzymes and receptors; antacids and antihistamines.',
  scheme: [['(a) Definitions and need for supervision', 1], ['(b) Enzyme and receptor interactions', 2], ['(c) Antacids, ranitidine, antihistamines', 2]],
  d: 3, c: 'understanding', t: [1],
}));
add('antimicrobial-long', long({
  stem: '(a) Classify antibiotics as bactericidal or bacteriostatic, and as broad- or narrow-spectrum, with examples.\n\n(b) Distinguish antiseptics from disinfectants with two examples of each.\n\n(c) Why must a full course of antibiotics be completed?',
  model: 'Bactericidal antibiotics kill bacteria, e.g. penicillin, aminoglycosides and ofloxacin; bacteriostatic antibiotics stop their growth, e.g. erythromycin, tetracycline and chloramphenicol. Broad-spectrum antibiotics such as ampicillin, amoxycillin and chloramphenicol act on many kinds of bacteria; narrow-spectrum ones such as penicillin G act on a few. Antiseptics are applied to living tissue, e.g. Dettol and tincture of iodine; disinfectants are used on non-living objects, e.g. 1% phenol and chlorine in water. The same substance may be either, depending on concentration. Stopping a course early leaves surviving bacteria that can multiply, causing a relapse, and may become resistant, making the antibiotic less useful.',
  sol: 'Classes; antiseptic vs disinfectant; resistance.',
  scheme: [['(a) Two classifications with examples', 2], ['(b) Distinction with examples', 2], ['(c) Relapse and resistance', 1]],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 chemicals in food
add('sweetener-mcq', mcq({
  stem: 'A bakery wants a sugar-free cake that is baked at about 450 K. Which sweetener is most suitable?',
  right: 'Sucralose',
  wrong: ['Aspartame', 'Sucrose', 'Sodium benzoate'],
  sol: 'Sucralose is heat-stable and provides no calories; aspartame decomposes on heating (@1) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('preservative-mcq', mcq({
  stem: 'Sodium benzoate is added to bottled fruit squash in order to:',
  right: 'prevent the growth of microbes that spoil it',
  wrong: ['increase its sweetness', 'prevent fats from becoming rancid', 'add nutritive value'],
  sol: 'Sodium benzoate is a preservative — option (@K). Preventing rancidity is the job of an antioxidant (@2).',
  d: 1, c: 'understanding', t: [2],
}));
add('antioxidant-mcq', mcq({
  stem: 'BHT is added to packets of potato chips. Its role is to:',
  right: 'slow the oxidation of the oil so the chips do not turn rancid',
  wrong: ['kill bacteria on the chips', 'make the chips sweeter', 'make the chips crisp by absorbing water'],
  sol: 'BHT is an antioxidant that reacts with oxygen or radicals before the fat does — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('saccharin-mcq', mcq({
  stem: 'Saccharin is approximately how many times as sweet as cane sugar?',
  right: '550',
  wrong: ['2', '100', '2000'],
  sol: 'Saccharin is about 550 times as sweet — option (@K); 100 is aspartame (@2) and 2000 is alitame (@3).',
  d: 1, c: 'recall', t: [2],
}));
add('diabetic-mcq', mcq({
  stem: 'Why are artificial sweeteners useful for people with diabetes?',
  right: 'They give a sweet taste while adding little or no glucose or energy',
  wrong: ['They lower blood glucose by acting like insulin', 'They kill bacteria in the mouth', 'They are converted into glucose slowly'],
  sol: 'They taste sweet in tiny amounts and provide negligible energy — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('salt-mcq', mcq({
  stem: 'Mango pickle kept in plenty of salt and oil stays good for months. The salt preserves it mainly by:',
  right: 'drawing water out of microbes by osmosis so they cannot grow',
  wrong: ['reacting with oxygen in the jar', 'adding sweetness', 'neutralising acids in the mango'],
  sol: 'A high salt concentration dehydrates microbial cells — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('food-match', match({
  stem: 'Match each food additive with its role.',
  pairs: [
    ['Aspartame', 'Low-calorie sweetener for cold drinks'],
    ['Sodium benzoate', 'Preservative'],
    ['BHA', 'Antioxidant for fats'],
    ['Sulfur dioxide', 'Antioxidant and preservative in fruit juices'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Aspartame → cold-drink sweetener; sodium benzoate → preservative; BHA → antioxidant; SO₂ → antioxidant/preservative in juices.',
  d: 1, c: 'recall', t: [2],
}));
add('food-fill', fill({
  stem: 'In the body, sodium benzoate is metabolised to ___ acid, which is excreted in urine.',
  acc: [['hippuric']],
  sol: '**Hippuric** acid.',
  d: 1, c: 'recall', t: [2],
}));
add('aspartame-tf', tf({
  stem: 'Aspartame is a good sweetener for biscuits that are baked in an oven.',
  key: 'f',
  sol: 'False. Aspartame decomposes at cooking temperatures, so it is used only in cold foods and soft drinks.',
  d: 2, c: 'application', t: [2],
}));
add('nutrition-tf', tf({
  stem: 'Most food additives, other than added vitamins and minerals, have no nutritive value.',
  key: 't',
  sol: 'True. Colours, sweeteners, preservatives and antioxidants are added for appeal or keeping quality, not nutrition.',
  d: 1, c: 'understanding', t: [2],
}));
add('aspartame-ar', ar({
  a: 'Aspartame is used only in cold foods and soft drinks.',
  r: 'Aspartame is unstable at cooking temperatures.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('antioxidant-ar', ar({
  a: 'Antioxidants are added to butter and oils.',
  r: 'Antioxidants kill the bacteria that make fats rancid.',
  key: 'c',
  sol: 'A is true; R is false — antioxidants slow oxidation by reacting with oxygen or free radicals; they are not antimicrobials — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('sucralose-ar', ar({
  a: 'Sucralose is used to sweeten baked products for people watching their weight.',
  r: 'Sucralose is a trichloro derivative of sucrose.',
  key: 'b',
  sol: 'Both are true, but its being a trichloro derivative does not explain the use; the reasons are its heat stability and lack of calories — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('sweet-num', num({
  stem: 'A cold drink needs the sweetness of 40 g of sucrose. What mass of aspartame (about 100 times as sweet as sucrose), in grams, gives the same sweetness?',
  value: 0.4, tol: 0.005, unit: 'g',
  sol: r`Mass $= 40 \div 100 = 0.40$, so $0.40\ \text{g}$.`,
  scheme: [['0.40 g', 1]],
  d: 1, c: 'application', t: [2],
}), () => near(40 / 100, 0.4) || 'aspartame');
add('alitame-num', num({
  marks: 2,
  stem: 'A food scientist compares sweeteners for a 500 mL bottle of lemonade that would otherwise need 50 g of sugar. How many times more mass of saccharin (550) than of alitame (2000) is needed for the same sweetness?',
  value: 3.636, tol: 0.01, unit: null,
  sol: r`Saccharin $= 50 \div 550 = 0.0909\ \text{g}$; alitame $= 50 \div 2000 = 0.025\ \text{g}$; ratio $= 0.0909 \div 0.025 = 3.636$ (equivalently $2000 \div 550$).`,
  scheme: [['Masses of the two sweeteners', 1], ['Ratio about 3.64', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(2000 / 550, 3.636, 0.001) || 'ratio');
add('benzoate-num', num({
  stem: 'A ketchup factory adds sodium benzoate at 0.08% by mass. What mass of sodium benzoate, in grams, is needed for a 25 kg batch?',
  value: 20, tol: 0.1, unit: 'g',
  sol: r`Mass $= 25000 \times 0.08 \div 100 = 20$, so $20\ \text{g}$.`,
  scheme: [['20 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(25000 * 0.0008, 20) || 'benzoate');
add('sweetener-short', short({
  marks: 2,
  stem: 'Give two reasons why artificial sweeteners are used, and explain why aspartame and sucralose suit different foods.',
  model: 'They provide sweetness with little or no energy, which helps people with diabetes and those controlling their weight; and only tiny amounts are needed. Aspartame decomposes on heating, so it is used in cold drinks and desserts, whereas sucralose is heat-stable and can be used in baked foods.',
  sol: 'Low calorie, small amounts; heat stability.',
  scheme: [['Two reasons', 1], ['Heat stability difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('preservative-short', short({
  marks: 2,
  stem: 'Explain how jam made with a lot of sugar and pickle made with a lot of salt resist spoiling, and name one chemical preservative used in bottled squash.',
  model: 'A very high concentration of sugar or salt draws water out of bacteria and moulds by osmosis, so they are dehydrated and cannot grow. Bottled squash commonly contains sodium benzoate (or a sorbate) as a chemical preservative.',
  sol: 'Osmosis; sodium benzoate.',
  scheme: [['Osmotic dehydration of microbes', 1], ['Sodium benzoate or similar', 1]],
  d: 2, c: 'application', t: [2],
}));
add('rancid-short', short({
  marks: 2,
  stem: 'Explain what rancidity is and how antioxidants such as BHA delay it.',
  model: 'Rancidity is the spoiling of fats and oils by slow oxidation in air, giving unpleasant smells and tastes. Antioxidants such as BHA react with oxygen or with the free radicals formed during oxidation more readily than the fat does, so they are used up first and the oxidation of the food is delayed.',
  sol: 'Oxidation of fats; sacrificial antioxidant.',
  scheme: [['Rancidity is oxidation of fats', 1], ['Antioxidants react first with O₂ or radicals', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('label-short3', short({
  marks: 3,
  stem: 'A snack packet label lists: sucralose, sodium benzoate and BHT. State the purpose of each and explain why the manufacturer might choose sucralose rather than aspartame for a snack that is baked.',
  model: 'Sucralose is an artificial sweetener that gives sweetness without calories. Sodium benzoate is a preservative that stops bacteria and moulds from growing. BHT is an antioxidant that slows the oxidation of fats, preventing rancidity. Sucralose is chosen because it is stable at baking temperatures, whereas aspartame would decompose and lose its sweetness when heated.',
  sol: 'Three purposes; heat stability.',
  scheme: [['Purposes of the three additives', 2], ['Sucralose heat-stable; aspartame decomposes', 1]],
  d: 3, c: 'application', t: [2],
}));
add('additive-short3', short({
  marks: 3,
  stem: 'Explain, with one example each, the difference between a food preservative, an antioxidant and an artificial sweetener.',
  model: 'A food preservative prevents spoilage by micro-organisms, for example sodium benzoate in squashes. An antioxidant slows the oxidation of food, especially fats, by reacting with oxygen or free radicals first, for example BHA or BHT in butter and oils. An artificial sweetener gives a sweet taste with little or no energy, for example saccharin or sucralose.',
  sol: 'Three roles with examples.',
  scheme: [['Preservative with example', 1], ['Antioxidant with example', 1], ['Sweetener with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('food-long', long({
  stem: '(a) Why are chemicals added to food? Name four kinds of food additives.\n\n(b) Compare four artificial sweeteners in terms of sweetness and stability, and explain their use for people with diabetes.\n\n(c) Describe how preservatives and antioxidants keep food fresh, with examples.',
  model: 'Chemicals are added to food to preserve it, improve its appeal and add nutritive value; additives include colours, flavours and sweeteners, emulsifiers and stabilisers, antioxidants, preservatives and nutritional supplements such as vitamins. Relative to sucrose, aspartame is about 100 times as sweet but decomposes on cooking; saccharin about 550 times; sucralose about 600 times and heat-stable; alitame about 2000 times, its sweetness hard to control. They give sweetness with negligible energy, so they help diabetics avoid raising blood glucose. Preservatives such as salt, sugar, oil and sodium benzoate prevent microbial growth; sodium benzoate is excreted as hippuric acid. Antioxidants such as BHA, BHT and SO₂ react with oxygen or free radicals before the food does, delaying rancidity.',
  sol: 'Purposes; sweeteners; preservatives and antioxidants.',
  scheme: [['(a) Purposes and four kinds', 1.5], ['(b) Four sweeteners and use for diabetics', 2], ['(c) Preservatives and antioxidants with examples', 1.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('choose-long', long({
  stem: 'A small food company in Pune is designing three products. For each, choose suitable additives and justify your choices: (a) a sugar-free soft drink served chilled; (b) a sugar-free biscuit for people with diabetes; (c) a tomato sauce that must stay safe for a year; (d) a packet of fried namkeen that must not taste stale. (e) What limits the amounts of these additives?',
  model: '(a) Aspartame, about 100 times as sweet as sugar with negligible energy; suitable because the drink is not heated. (b) Sucralose, about 600 times as sweet and stable at baking temperatures, giving no calories; aspartame would decompose. (c) A preservative such as sodium benzoate, which inhibits bacteria and moulds and is excreted as hippuric acid; the sauce’s own salt and sugar also help. (d) An antioxidant such as BHA or BHT, with citric or ascorbic acid, to slow oxidation of the frying oil, preventing rancidity; nitrogen-filled packing also helps. (e) Food safety regulations set maximum permitted levels, because many additives are harmful in large amounts.',
  sol: 'Four choices with reasons; legal limits.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 3, c: 'application', t: [2],
}));
add('drugs-long', long({
  stem: '(a) Distinguish narcotic from non-narcotic analgesics, with examples.\n\n(b) What are tranquilisers? Give two examples and their uses.\n\n(c) Explain why the same chemical, such as phenol, can be an antiseptic or a disinfectant, and name two other antiseptics.',
  model: 'Analgesics relieve pain without causing loss of consciousness. Non-narcotic analgesics such as aspirin and paracetamol relieve mild pain and fever; aspirin also reduces inflammation and prevents platelet clotting. Narcotic analgesics such as morphine and codeine relieve severe pain, for example after surgery, but cause sleep and addiction, so they are strictly controlled. Tranquilisers act on the central nervous system to relieve stress, anxiety and mental illness; equanil is used for depression and hypertension, and barbiturates such as veronal and seconal are hypnotics. Whether a chemical is an antiseptic or a disinfectant depends on its concentration: 0.2% phenol is mild enough for skin, while 1% phenol is used on floors and drains. Other antiseptics include Dettol and tincture of iodine.',
  sol: 'Analgesics; tranquilisers; concentration dependence.',
  scheme: [['(a) Narcotic vs non-narcotic with examples', 2], ['(b) Tranquilisers with examples', 1.5], ['(c) Concentration dependence and two antiseptics', 1.5]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- case-based
add('acidity-case', mk.case({
  passage: 'After a heavy wedding feast, Arjun’s grandfather complains of a burning feeling in his chest caused by excess stomach acid. The family medicine box contains: tablets of magnesium hydroxide with aluminium hydroxide, a packet of baking soda (NaHCO₃), and ranitidine tablets prescribed earlier by his doctor. His doctor advises him to avoid using baking soda regularly. (Mg = 24, O = 16, H = 1)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'How does the magnesium hydroxide tablet relieve the burning feeling?',
      right: 'It neutralises excess hydrochloric acid in the stomach',
      wrong: ['It blocks histamine at the stomach wall', 'It kills bacteria in the stomach', 'It reduces pain by acting on the brain'],
      sol: 'Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'What mass of Mg(OH)₂ (M = 58), in grams, neutralises 0.030 mol of HCl?',
      value: 0.87, tol: 0.005, unit: 'g',
      sol: r`$\ce{Mg(OH)2 + 2HCl -> MgCl2 + 2H2O}$: moles of Mg(OH)₂ $= 0.030 \div 2 = 0.015$; mass $= 0.015 \times 58 = 0.87$, so $0.87\ \text{g}$.`,
      scheme: [['0.87 g', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why does the doctor advise against regular use of baking soda as an antacid?',
      model: 'Baking soda is soluble, so an excess makes the stomach contents alkaline; this triggers the stomach to produce even more acid. It also releases carbon dioxide gas, causing bloating. An insoluble base such as Mg(OH)₂ does not raise the pH above neutral in this way.',
      sol: 'Excess soluble base triggers more acid.',
      scheme: [['Excess makes the stomach alkaline', 1], ['Triggers more acid secretion (and CO₂)', 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Explain how ranitidine works differently from the other two antacids, and why it is useful for long-term problems.',
        model: 'Ranitidine does not neutralise acid. It blocks histamine at receptors in the stomach wall, so the signal to secrete acid is reduced and less acid is produced. Because it acts on the cause of excess acid rather than the acid already present, it is useful for long-term treatment such as ulcers.',
        sol: 'Receptor antagonist; reduces secretion.',
        scheme: [['Blocks histamine receptors; less acid secreted', 1], ['Treats cause; long-term use', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), () => near((0.03 / 2) * 58, 0.87) || 'mgoh2');
add('clinic-case', mk.case({
  passage: 'A rural health clinic keeps the following in stock: Dettol, 1% phenol solution, tincture of iodine, chlorine tablets for water, paracetamol, and two antibiotics — amoxycillin (broad-spectrum, bactericidal) and erythromycin (bacteriostatic). A nurse must decide what to use for a child with a grazed knee, for cleaning the examination table, for a villager with fever and body ache, and for treating the village well.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which item should be used to clean the examination table?',
      right: '1% phenol solution',
      wrong: ['Tincture of iodine', 'Amoxycillin', 'Paracetamol'],
      sol: 'A disinfectant is used on non-living surfaces; 1% phenol is a disinfectant — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'A chlorine tablet supplies 2.4 g of available chlorine. How many litres of well water can it treat at a concentration of 0.3 mg per litre (0.3 ppm)?',
      value: 8000, tol: 10, unit: 'L',
      sol: r`$2.4\ \text{g} = 2400\ \text{mg}$; volume $= 2400 \div 0.3 = 8000$, so $8000\ \text{L}$.`,
      scheme: [['8000 L', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Which items are suitable for the child’s grazed knee and for the villager with fever and body ache? Give reasons.',
      model: 'For the grazed knee, an antiseptic such as Dettol or tincture of iodine, which kills microbes on living tissue without serious harm to it. For fever and body ache, paracetamol, a non-narcotic analgesic and antipyretic that relieves pain and lowers fever.',
      sol: 'Antiseptic; non-narcotic analgesic.',
      scheme: [['Antiseptic for the cut with reason', 1], ['Paracetamol with reason', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Explain the difference between amoxycillin and erythromycin as described, and why antibiotics should not be given for an ordinary viral cold.',
        model: 'Amoxycillin is bactericidal and broad-spectrum: it kills a wide range of bacteria. Erythromycin is bacteriostatic: it stops bacteria from multiplying. Antibiotics act on bacteria, not viruses, so they do not help a viral cold, and unnecessary use encourages resistant bacteria.',
        sol: 'Bactericidal vs bacteriostatic; no effect on viruses.',
        scheme: [['Bactericidal broad-spectrum vs bacteriostatic', 1], ['Ineffective on viruses; resistance risk', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), () => near(2400 / 0.3, 8000) || 'chlorine');
add('juice-case', mk.case({
  passage: 'A juice company in Nagpur sells orange juice in 1-litre cartons. The label reads: “Contains permitted class II preservative (sodium benzoate), antioxidant (ascorbic acid), sweetener (sucralose). No added sugar.” A quality inspector notes that sodium benzoate is present at 0.05% by mass and that the juice has a density of about 1.04 g/mL.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the purpose of the ascorbic acid listed as an antioxidant?',
      right: 'To slow oxidation of the juice, protecting its colour and flavour',
      wrong: ['To kill moulds and yeasts', 'To make the juice sweeter', 'To add calories'],
      sol: 'Ascorbic acid is readily oxidised itself, protecting other components — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'What mass of sodium benzoate, in grams, is present in one carton (1000 mL)?',
      value: 0.52, tol: 0.005, unit: 'g',
      sol: r`Mass of juice $= 1000 \times 1.04 = 1040\ \text{g}$; sodium benzoate $= 1040 \times 0.05 \div 100 = 0.52$, so $0.52\ \text{g}$.`,
      scheme: [['0.52 g', 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'The label says “no added sugar” but the juice tastes sweet. Explain, and say why sucralose rather than aspartame can be used if the juice is pasteurised by heating.',
      model: 'The sweetness comes from the natural sugars of the fruit and from sucralose, an artificial sweetener about 600 times as sweet as sucrose that adds no calories. Sucralose is stable when heated during pasteurisation, whereas aspartame would decompose.',
      sol: 'Natural sugars plus sucralose; heat stability.',
      scheme: [['Natural sugars and sucralose give sweetness', 1], ['Sucralose heat-stable; aspartame not', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain how sodium benzoate preserves the juice and what happens to it in the body.',
        model: 'Sodium benzoate inhibits the growth of bacteria, yeasts and moulds in the acidic juice, so it does not ferment or spoil. In the body it is metabolised to hippuric acid, which is excreted in urine, so in permitted small amounts it is considered safe.',
        sol: 'Antimicrobial; hippuric acid.',
        scheme: [['Inhibits microbial growth', 1], ['Metabolised to hippuric acid and excreted', 1]],
        d: 2, c: 'understanding', t: [2],
      }),
    ]),
  ],
}), () => near(1000 * 1.04 * 0.0005, 0.52) || 'juice');
add('sweet-case', mk.case({
  passage: 'Meena’s mother has diabetes. Meena compares sweeteners for the family kitchen using this table (sweetness relative to sucrose = 1): aspartame 100, saccharin 550, sucralose 600, alitame 2000. She plans to make chilled kheer, baked biscuits and a jug of lemonade, and notes that alitame’s sweetness is hard to control in home cooking.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which sweetener should Meena avoid for the baked biscuits?',
      right: 'Aspartame',
      wrong: ['Sucralose', 'Saccharin', 'None of them; all are equally heat-stable'],
      sol: 'Aspartame decomposes at baking temperatures — option (@K).',
      d: 1, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'The lemonade recipe needs 60 g of sugar. What mass of sucralose, in grams, gives the same sweetness?',
      value: 0.1, tol: 0.002, unit: 'g',
      sol: r`Mass $= 60 \div 600 = 0.10$, so $0.10\ \text{g}$.`,
      scheme: [['0.10 g', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why is alitame’s sweetness hard to control in home cooking, and which sweetener would you recommend for the chilled kheer?',
      model: 'Alitame is about 2000 times as sweet as sugar, so the tiny quantities needed are hard to measure accurately at home, and a small error makes food far too sweet. For chilled kheer, aspartame or sucralose is suitable, since the dish is not heated after the sweetener is added.',
      sol: 'Very high potency; aspartame or sucralose.',
      scheme: [['Potency makes dosing difficult', 1], ['Suitable choice for a cold dish', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'How much more mass of aspartame than sucralose would be needed for the same sweetness, and why might that matter little for a home cook?',
        model: 'Ratio of masses = 600 ÷ 100 = 6, so six times as much aspartame is needed. Since both are needed only in fractions of a gram, the difference in cost and calories is negligible for home use; heat stability matters more.',
        sol: '6 times; small amounts anyway.',
        scheme: [['Six times as much aspartame', 1], ['Small absolute amounts; heat stability matters more', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), () => near(60 / 600, 0.1) || 'sucralose');
