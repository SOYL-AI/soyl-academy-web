// ICSE 10 Biology ch09 Excretory System — question bank in ICSE 2027 style.
// Daily filtrate, reabsorption percentages, urea concentration and water-loss figures come from calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { KID, COMP, WATER } from './calc.mjs';
import { KIDNEY_LETTERED, NEPHRON_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const kidFig = svgV(KIDNEY_LETTERED, 'Longitudinal section of a kidney with parts lettered A to E');
const nepFig = svgV(NEPHRON_LETTERED, 'A nephron with its blood supply, parts lettered A to E');

// ---------------------------------------------------------------- t01 excretion and excretory organs
add('excretion-mcq', mcq({
  stem: 'Excretion is best defined as the',
  right: 'removal of harmful waste products formed by the chemical activities of body cells', wrong: ['removal of undigested food from the alimentary canal', 'release of digestive juices into the intestine', 'release of hormones into the blood'],
  sol: 'Excretion removes metabolic wastes such as urea and carbon dioxide; passing out undigested food is egestion — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('skin-mcq', mcq({
  stem: 'After a long run, Priya\'s sweat tastes salty and leaves faint white marks on her T-shirt when it dries. This shows that sweat removes',
  right: 'salts as well as water', wrong: ['carbon dioxide as well as water', 'glucose as well as water', 'plasma proteins as well as water'],
  sol: 'The white marks are salts left behind when the water of sweat evaporates; sweat also carries a little urea — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lungs-mcq', mcq({
  stem: 'The lungs act as excretory organs because they remove',
  right: 'carbon dioxide and some water vapour', wrong: ['urea and uric acid', 'bile pigments', 'excess salts'],
  sol: 'Carbon dioxide, a waste of respiration, is breathed out with water vapour — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('liver-mcq', mcq({
  stem: 'Bile pigments, formed when old red blood cells are broken down, are excreted by the',
  right: 'liver, through the bile', wrong: ['kidneys, through the urine', 'lungs, in the breath', 'skin, in sweat'],
  sol: 'The liver passes bile pigments from broken-down haemoglobin into the bile, which empties into the intestine — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('urea-source-mcq', mcq({
  stem: 'Urea, the main nitrogenous waste in urine, is produced in the',
  right: 'liver, from excess amino acids', wrong: ['kidneys, from glucose', 'lungs, from carbon dioxide', 'urinary bladder, from salts'],
  sol: 'The liver removes the nitrogen-containing part of excess amino acids (deamination) and turns it into urea; the kidneys only remove it — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('not-excretion-mcq', mcq({
  stem: 'Which of these is NOT an example of excretion?',
  right: 'Passing out undigested food as faeces', wrong: ['Breathing out carbon dioxide', 'Losing salts in sweat', 'Passing urea out in urine'],
  sol: 'Undigested food was never made by body cells, so passing it out is egestion, not excretion — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('dark-urine-mcq', mcq({
  stem: 'After a long football match on a hot afternoon, Tenzing passes a small amount of dark yellow urine. This is because',
  right: 'he lost much water as sweat, so his kidneys reabsorbed more water', wrong: ['his kidneys stopped filtering his blood', 'his bladder absorbed the extra water', 'he made extra glucose in his urine'],
  sol: 'With water lost in sweat, more is reabsorbed from the tubules, so the urine is less and more concentrated — option (@K).',
  d: 2, c: 'application', t: [1, 5],
}));
add('excretion-ar', ar({
  a: 'Removal of faeces is not excretion.',
  r: 'Faeces consist mainly of undigested food that was never part of the body\'s cells.',
  key: 'c',
  sol: 'Both are true, and since faeces are mostly undigested food, not wastes of cell metabolism, their removal is egestion — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('skin-ar', ar({
  a: 'The skin is an excretory organ.',
  r: 'Sweating helps to cool the body.',
  key: 'd',
  sol: 'Both are true, but cooling does not explain excretion; the skin is excretory because sweat carries out water, salts and a little urea — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('urea-tf', tf({
  stem: 'Urea is made in the kidneys.',
  key: 'f',
  sol: 'False. Urea is made in the liver; the kidneys remove it from the blood.',
  d: 1, c: 'recall', t: [1],
}));
add('deamination-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the removal of the nitrogen-containing part of excess amino acids in the liver, leading to the formation of urea.',
  model: '**Deamination.**',
  sol: 'Deamination.', scheme: [['Deamination', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('odd-excretory', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Kidney, Skin, Pancreas, Lungs.',
  model: '**Pancreas**; the others are **excretory organs**.',
  sol: 'The pancreas makes digestive enzymes and hormones.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('reason-skin', short({
  marks: 1, wl: null,
  stem: 'Give reason: the skin is counted among the excretory organs.',
  model: 'Its sweat glands remove **water, salts and a small amount of urea** from the body in **sweat**.',
  sol: 'Sweat removes wastes.', scheme: [['Sweat removes water, salts, urea', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('organs-short', short({
  marks: 2,
  stem: 'Name two excretory organs other than the kidneys and the waste each removes.',
  model: '1. **Lungs**: remove **carbon dioxide** and water vapour in the breath.\n2. **Skin**: removes **water, salts and a little urea** in sweat (the **liver** also excretes **bile pigments** in the bile).',
  sol: 'Lungs: carbon dioxide; skin: sweat; liver: bile pigments.',
  scheme: [['First organ with waste', 1], ['Second organ with waste', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 the urinary system
add('ureter-mcq', mcq({
  stem: 'If both ureters of a person were blocked, what would happen?',
  right: 'Urine would stop reaching the bladder, though the kidneys went on making it', wrong: ['The kidneys would stop receiving blood', 'Urine would leave the body through the renal veins', 'The bladder would fill faster than usual'],
  sol: 'The ureters are the only route from the kidneys to the bladder; blocked, they stop urine reaching it — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('path-urine-mcq', mcq({
  stem: 'Which order shows the path of urine after it leaves a kidney?',
  right: 'Ureter → urinary bladder → urethra', wrong: ['Urethra → urinary bladder → ureter', 'Urinary bladder → ureter → urethra', 'Renal vein → ureter → urethra'],
  sol: 'Urine flows down the ureter, is stored in the bladder and leaves through the urethra — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('stone-mcq', mcq({
  stem: 'A stone completely blocks Mr Iyer\'s left ureter. Which statement is correct?',
  right: 'Urine from the right kidney can still reach the bladder', wrong: ['No urine at all can reach the bladder', 'His left kidney will send urine through the right ureter', 'His blood will stop flowing to both kidneys'],
  sol: 'Each kidney has its own ureter, so the right kidney\'s urine still drains normally — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('bladder-mcq', mcq({
  stem: 'Why can a healthy person wait for some hours before passing urine?',
  right: 'The urinary bladder stretches to store urine, and a ring of muscle at its neck keeps it closed', wrong: ['The kidneys stop making urine until the bladder is empty', 'The ureters store urine and release it slowly', 'Urine is reabsorbed from the bladder into the blood'],
  sol: 'The muscular bladder is a stretchable store, and its sphincter muscle controls release through the urethra — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('bladder-ar', ar({
  a: 'The ureters carry urine from the kidneys to the urinary bladder.',
  r: 'The urinary bladder stores urine until it is passed out through the urethra.',
  key: 'd',
  sol: 'Both are true, but storage in the bladder does not explain what the ureters do — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('urethra-tf', tf({
  stem: 'The urethra carries urine from the kidneys to the urinary bladder.',
  key: 'f',
  sol: 'False. The ureters carry urine to the bladder; the urethra carries it from the bladder to the outside.',
  d: 1, c: 'recall', t: [2],
}));
add('urinepath-short', short({
  marks: 2,
  stem: 'Trace the path of urine from the collecting ducts of a kidney to the outside of the body.',
  model: 'Collecting ducts → **pelvis** of the kidney → **ureter** → **urinary bladder** (stored) → **urethra** → outside. A ring of muscle at the neck of the bladder controls its release.',
  sol: 'Pelvis, ureter, bladder, urethra.',
  scheme: [['Pelvis and ureter', 1], ['Bladder and urethra', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('urinary-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of the human urinary system. Label the kidneys, ureters, urinary bladder, urethra, renal artery and renal vein.',
  model: 'Two **bean-shaped kidneys** with their hollow sides facing the middle; a **renal artery** from the aorta and a **renal vein** to the vena cava at each hilum; a **ureter** from each kidney down to the **urinary bladder**; the **urethra** leading out of the bladder.',
  sol: 'Labelled urinary system.',
  scheme: [['Kidneys, ureters, bladder, urethra in place', 1], ['Renal artery and vein shown', 1], ['Labels', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 structure of the kidney
add('cortex-mcq', mcq({
  stem: 'Under a microscope, a thin slice from the outer region of a kidney shows many tiny round bodies, each a knot of capillaries inside a cup. These bodies and the region are',
  right: 'Malpighian capsules, in the cortex', wrong: ['renal pyramids, in the medulla', 'collecting ducts, in the pelvis', 'loops of Henle, in the cortex'],
  sol: 'The Malpighian capsules (glomerulus in Bowman\'s capsule) lie in the outer cortex, giving it a dotted look — option (@K).',
  d: 2, c: 'application', t: [3, 4],
}));
add('pyramid-mcq', mcq({
  stem: 'The inner region of the kidney is made up of cone-shaped structures called',
  right: 'renal pyramids', wrong: ['Malpighian capsules', 'renal papillae only', 'glomeruli'],
  sol: 'The medulla consists of renal pyramids, whose tips open into the pelvis — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('pelvis-mcq', mcq({
  stem: 'Urine flowing out of the collecting ducts first enters the',
  right: 'pelvis of the kidney', wrong: ['urinary bladder', 'Bowman\'s capsule', 'renal vein'],
  sol: 'Collecting ducts open at the tips of the pyramids into the funnel-shaped pelvis, which leads into the ureter — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hilum-mcq', mcq({
  stem: 'The notch on the inner, concave side of a kidney, where the renal artery, renal vein and ureter join it, is the',
  right: 'hilum', wrong: ['pelvis', 'cortex', 'pyramid'],
  sol: 'The hilum is the depression through which the vessels and the ureter enter or leave — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('kfig-mcq', mcq({
  stem: 'In the figure of a kidney, which letter marks the funnel-shaped cavity in which urine collects before it leaves the kidney?',
  right: 'C', wrong: ['A', 'B', 'E'],
  sol: 'C is the pelvis. A is the cortex, B a renal pyramid of the medulla, E the renal artery — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [kidFig],
}));
add('pelvis-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the funnel-shaped cavity inside the kidney into which urine drains from the pyramids.',
  model: '**Renal pelvis** (pelvis).',
  sol: 'Pelvis.', scheme: [['Pelvis', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('cortex-medulla-short', short({
  marks: 2,
  stem: 'State two differences between the cortex and the medulla of the kidney.',
  model: '1. The **cortex** is the **outer**, darker, dotted region; the **medulla** is the **inner**, striped region.\n2. The cortex contains the **Malpighian capsules and convoluted tubules**; the medulla contains the **loops of Henle and collecting ducts** arranged as **pyramids**.',
  sol: 'Position and appearance; contents.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));

// ---------------------------------------------------------------- t04 the nephron and the Malpighian capsule
add('malpighian-mcq', mcq({
  stem: 'A Malpighian capsule (renal corpuscle) is made up of',
  right: 'Bowman\'s capsule and the glomerulus inside it', wrong: ['the loop of Henle and the collecting duct', 'the renal artery and renal vein', 'the pelvis and the ureter'],
  sol: 'The glomerulus together with the cup-shaped Bowman\'s capsule around it forms the Malpighian capsule — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('afferent-mcq', mcq({
  stem: 'The afferent arteriole entering a glomerulus is wider than the efferent arteriole leaving it. This',
  right: 'builds up a high blood pressure in the glomerulus, which drives ultrafiltration', wrong: ['slows the blood so that no filtration occurs', 'lets red blood cells pass into the capsule', 'carries urine out of the glomerulus'],
  sol: 'More blood enters than can leave quickly, so the pressure rises and forces fluid out into the capsule — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('loop-mcq', mcq({
  stem: 'The loop of Henle lies mainly in the',
  right: 'medulla', wrong: ['cortex', 'pelvis', 'ureter'],
  sol: 'The U-shaped loop dips down into the medulla; the capsule and convoluted tubules stay in the cortex — option (@K).',
  d: 2, c: 'recall', t: [4, 3],
}));
add('nfig-mcq', mcq({
  stem: 'In the figure of a nephron, which letter marks the knot of capillaries from which blood is filtered?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B is the glomerulus. A is Bowman\'s capsule, C the proximal convoluted tubule, E the collecting duct — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [nepFig],
}));
add('efferent-mcq', mcq({
  stem: 'Blood in the efferent arteriole, just after leaving the glomerulus, differs from blood in the afferent arteriole in having',
  right: 'less water and fewer dissolved substances, but the same proteins and blood cells', wrong: ['no red blood cells', 'more urea and more glucose', 'no plasma at all'],
  sol: 'Water and small solutes have been filtered out; cells and proteins are too large and stay in the blood — option (@K).',
  d: 3, c: 'analysis', t: [4, 5],
}));
add('tubulecap-mcq', mcq({
  stem: 'The network of capillaries wrapped round the tubule of a nephron is formed by the',
  right: 'efferent arteriole, after it leaves the glomerulus', wrong: ['afferent arteriole, before it enters the glomerulus', 'renal vein, as it leaves the kidney', 'ureter, as it leaves the pelvis'],
  sol: 'The efferent arteriole branches into capillaries round the tubule, which take back reabsorbed substances and drain towards the renal vein — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('glomerulus-ar', ar({
  a: 'Blood pressure in the glomerulus is high.',
  r: 'The efferent arteriole is wider than the afferent arteriole.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: the efferent arteriole is narrower, which is what keeps the pressure high — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('nephrons-tf', tf({
  stem: 'Each human kidney contains about a million nephrons.',
  key: 't',
  sol: 'True. Each kidney has roughly one million nephrons, the units that form urine.',
  d: 2, c: 'recall', t: [4],
}));
add('bowman-fill', fill({
  stem: 'The double-walled, cup-shaped structure at the beginning of a nephron is called ______ capsule.',
  acc: [["Bowman's", 'Bowmans', 'Bowman']],
  sol: "Bowman's capsule.",
  d: 1, c: 'recall', t: [4],
}));
add('nephron-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the structural and functional unit of the kidney.',
  model: '**Nephron** (kidney tubule).',
  sol: 'Nephron.', scheme: [['Nephron', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('odd-nephron', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Glomerulus, Ureter, Bowman\'s capsule, Loop of Henle.',
  model: '**Ureter**; the others are **parts of a nephron**.',
  sol: 'The ureter carries urine from the kidney to the bladder.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('reason-arteriole', short({
  marks: 1, wl: null,
  stem: 'Give reason: the efferent arteriole is narrower than the afferent arteriole.',
  model: 'It keeps the **blood pressure in the glomerulus high**, which is needed to force fluid out by **ultrafiltration**.',
  sol: 'High pressure for ultrafiltration.', scheme: [['High glomerular pressure for ultrafiltration', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ultra-short', short({
  marks: 2,
  stem: 'Explain how the structure of the Malpighian capsule helps ultrafiltration.',
  model: 'The **wide afferent** and **narrow efferent** arterioles keep the blood in the **glomerulus at high pressure**. The glomerulus is a **large knot of thin capillaries** pressed against the thin inner wall of **Bowman\'s capsule**, giving a big surface across which fluid is forced out.',
  sol: 'Pressure; large thin surface.',
  scheme: [['High pressure from arteriole widths', 1], ['Large, thin filtering surface', 1]],
  d: 3, c: 'understanding', t: [4, 5],
}));
add('nephron-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a nephron with its blood supply. Label the glomerulus, Bowman\'s capsule, the afferent and efferent arterioles and the loop of Henle.',
  model: 'A **Bowman\'s capsule** cup enclosing a **glomerulus**, fed by a **wider afferent arteriole** and drained by a **narrower efferent arteriole** that forms capillaries round the tubule; a coiled **proximal tubule**, a U-shaped **loop of Henle**, a coiled **distal tubule** joining a **collecting duct**.',
  sol: 'Labelled nephron.',
  scheme: [['Capsule with glomerulus and arterioles', 1], ['Tubule: proximal, loop of Henle, distal, collecting duct', 1], ['Labels', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 urine formation
add('filtrate-mcq', mcq({
  stem: 'Which substance in blood plasma is normally absent from the glomerular filtrate?',
  right: 'Plasma proteins', wrong: ['Glucose', 'Urea', 'Sodium chloride'],
  sol: 'Plasma proteins are too large to pass through the filter; small molecules such as glucose, urea and salts pass — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('filtersize-mcq', mcq({
  stem: 'Which pair of substances can BOTH pass from the glomerulus into Bowman\'s capsule in a healthy kidney?',
  right: 'Glucose and urea', wrong: ['Plasma proteins and glucose', 'Red blood cells and urea', 'Platelets and salts'],
  sol: 'Small molecules such as glucose and urea are filtered; proteins, red cells and platelets are too large — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('glucose-urine-mcq', mcq({
  stem: 'Glucose is present in the glomerular filtrate but absent from the urine of a healthy person because',
  right: 'all of it is reabsorbed into the blood in the proximal convoluted tubule', wrong: ['it is changed into urea in the tubule', 'it is too large to be filtered', 'it is used up by the cells of the bladder'],
  sol: 'Selective reabsorption returns all the glucose to the blood from the proximal tubule — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('sugar-mcq', mcq({
  stem: 'A routine test finds glucose in Mr Das\'s urine. The most likely explanation is that',
  right: 'his blood glucose is so high that the tubules cannot reabsorb all of it', wrong: ['his glomeruli have stopped filtering', 'his liver is making urea from glucose', 'his bladder is releasing glucose'],
  sol: 'When blood glucose is very high (as in diabetes), more is filtered than the tubules can take back, so some spills into the urine — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('secretion-mcq', mcq({
  stem: 'Tubular secretion is the',
  right: 'active transfer of substances such as potassium ions and some drugs from the blood into the tubule', wrong: ['filtering of blood in the glomerulus', 'return of glucose from the tubule to the blood', 'storage of urine in the bladder'],
  sol: 'In the distal tubule, cells actively add extra wastes and ions from the surrounding capillaries into the filtrate — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('pct-mcq', mcq({
  stem: 'In an experiment on an animal kidney, reabsorption is blocked in the proximal convoluted tubule only. Which substance, normally absent, would now appear in the urine?',
  right: 'Glucose', wrong: ['Urea', 'Plasma proteins', 'Red blood cells'],
  sol: 'All the glucose is normally taken back in the proximal tubule; if that stops, it stays in the urine. Proteins and red cells are never filtered — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('protein-ar', ar({
  a: 'The glomerular filtrate contains plasma proteins.',
  r: 'Plasma proteins are too large to pass through the walls of the glomerulus and Bowman\'s capsule.',
  key: 'b',
  sol: 'The assertion is false: proteins are kept in the blood. The reason is true and is why they stay out of the filtrate — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
add('reabsorb-ar', ar({
  a: 'The urine of a healthy person contains no glucose.',
  r: 'All the glucose in the filtrate is reabsorbed into the blood in the proximal tubule.',
  key: 'c',
  sol: 'Both are true, and complete reabsorption of glucose explains why none appears in urine — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('secretion-fill', fill({
  stem: 'The active addition of extra potassium ions and some drugs from the blood into the distal tubule is called tubular ______.',
  acc: [['secretion']],
  sol: 'Secretion.',
  d: 2, c: 'recall', t: [5],
}));
add('filtrate-num', num({
  stem: `The two kidneys of an adult form glomerular filtrate at about ${KID.gfr} mL per minute. How many litres of filtrate do they form in one day?`,
  value: KID.filtrate, unit: 'L',
  sol: r`$${KID.gfr} \times 60 \times 24 = ${KID.gfr * 60 * 24}$ mL $= ${KID.filtrate}$ litres a day.`,
  scheme: [[`${KID.filtrate} litres`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 180 || 'value');
add('urea-num', num({
  stem: `Urea is about ${COMP.urea[0]} g per 100 mL in plasma and about ${COMP.urea[2]} g per 100 mL in urine. Roughly how many times more concentrated is urea in urine? Give the nearest whole number.`,
  value: COMP.ureaFactor, tol: 1,
  sol: r`$\dfrac{${COMP.urea[2]}}{${COMP.urea[0]}} \approx ${COMP.ureaFactor}$ times, because most of the water is reabsorbed but urea is not.`,
  scheme: [[`About ${COMP.ureaFactor} times`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 67 || 'value');
add('ultra-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the filtration of blood under high pressure from the glomerulus into Bowman\'s capsule.',
  model: '**Ultrafiltration.**',
  sol: 'Ultrafiltration.', scheme: [['Ultrafiltration', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('odd-urine', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Water, Urea, Glucose, Salts.',
  model: '**Glucose**; the others are **normal constituents of urine**.',
  sol: 'Glucose is fully reabsorbed in a healthy person.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('reason-protein', short({
  marks: 1, wl: null,
  stem: 'Give reason: the urine of a healthy person contains no proteins.',
  model: 'Plasma proteins are **too large to be filtered** through the walls of the glomerulus and Bowman\'s capsule.',
  sol: 'Too large to filter.', scheme: [['Too large to be filtered', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('reason-hot', short({
  marks: 1, wl: null,
  stem: 'Give reason: on a hot summer day a person passes less urine than on a cool day.',
  model: 'Much water is lost in **sweat**, so the kidney tubules **reabsorb more water**, giving a small volume of concentrated urine.',
  sol: 'More water reabsorbed.', scheme: [['Water lost in sweat; more reabsorbed', 1]],
  d: 2, c: 'application', t: [5, 1],
}));
add('filtrate-urine-short', short({
  marks: 2,
  stem: 'State two differences between glomerular filtrate and urine.',
  model: '1. Filtrate contains **glucose** (and amino acids); urine of a healthy person contains **none**.\n2. Filtrate has urea at the **same low concentration as plasma**; urine has urea **much more concentrated**, since most water is reabsorbed (filtrate is also far larger in volume).',
  sol: 'Glucose; urea concentration; volume.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('stages-short', short({
  marks: 3,
  stem: 'Describe the three stages of urine formation and state where each takes place.',
  model: '1. **Ultrafiltration** in the **Malpighian capsule**: blood is filtered under high pressure from the glomerulus into Bowman\'s capsule.\n2. **Selective reabsorption**, mainly in the **proximal convoluted tubule**: glucose, amino acids, most water and salts return to the blood.\n3. **Tubular secretion** in the **distal convoluted tubule**: extra ions, wastes and drugs pass from the blood into the tubule.',
  sol: 'Filtration; reabsorption; secretion with sites.',
  scheme: [['Ultrafiltration with site', 1], ['Selective reabsorption with site', 1], ['Tubular secretion with site', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('compare-short', short({
  marks: 3,
  stem: 'Compare blood plasma, glomerular filtrate and urine of a healthy person for proteins, glucose and urea.',
  model: '| Substance | Plasma | Filtrate | Urine |\n|---|---|---|---|\n| Proteins | **Present** | **Absent** | **Absent** |\n| Glucose | Present | **Present** | **Absent** (all reabsorbed) |\n| Urea | Low | Low (same as plasma) | **Much higher** (concentrated) |',
  sol: 'Proteins only in plasma; glucose not in urine; urea concentrated in urine.',
  scheme: [['Proteins', 1], ['Glucose', 1], ['Urea', 1]],
  d: 3, c: 'analysis', t: [5], wl: [20, 70],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('urinary-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [ureter, urethra, bladder, cortex, medulla, pelvis, renal artery, renal vein]\n\nBlood to be cleaned reaches the kidney through the (a) ______. The outer region of the kidney, the (b) ______, contains the Malpighian capsules. Urine from the pyramids collects in the (c) ______ and flows down the (d) ______ to the bladder. It finally leaves the body through the (e) ______.',
  acc: [['renal artery'], ['cortex'], ['pelvis', 'renal pelvis'], ['ureter'], ['urethra']],
  sol: '(a) renal artery; (b) cortex; (c) pelvis; (d) ureter; (e) urethra.',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('nephron-fill5', fill({
  marks: 5,
  stem: "Select the correct terms to fill in the blanks: [glomerulus, Bowman's capsule, proximal, distal, ultrafiltration, reabsorption, secretion, ureter]\n\nBlood is filtered under pressure from the (a) ______ into Bowman's capsule; this process is (b) ______. All the glucose and most of the water are taken back in the (c) ______ convoluted tubule by selective (d) ______. Extra potassium ions are added to the filtrate in the distal tubule by tubular (e) ______.",
  acc: [['glomerulus'], ['ultrafiltration'], ['proximal'], ['reabsorption'], ['secretion']],
  sol: '(a) glomerulus; (b) ultrafiltration; (c) proximal; (d) reabsorption; (e) secretion.',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('nephron-match5', match({
  marks: 5,
  stem: 'Study the diagram of a nephron and match each lettered part with its function.',
  pairs: [
    ['A', 'Receives the fluid filtered out of the blood'],
    ['B', 'Blood is filtered here under high pressure'],
    ['C', 'Takes back all the glucose and most of the water into the blood'],
    ['D', 'Dips into the medulla and helps to take back water'],
    ['E', 'Carries urine from many nephrons towards the pelvis'],
  ],
  order: [2, 4, 1, 0, 3],
  sol: "A Bowman's capsule; B glomerulus; C proximal convoluted tubule; D loop of Henle; E collecting duct.",
  d: 2, c: 'application', t: [4, 5],
  assets: [nepFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('kidney-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows a longitudinal section of a human kidney. Five parts are lettered A to E.',
  d: 3, c: 'application',
  assets: [kidFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the region labelled A.', model: '**Cortex.**', sol: 'Cortex.', scheme: [['Cortex', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', short({ marks: 2, stem: 'Name the structure labelled B and the region of the kidney that such structures make up.', model: 'B is a **renal pyramid**, a cone-shaped, striped mass whose tip points towards the pelvis. The pyramids together make up the **medulla**, the inner region of the kidney.', sol: 'Renal pyramid; medulla.', scheme: [['Renal pyramid', 1], ['Medulla', 1]], d: 2, c: 'recall', t: [3] })),
    part('c', short({ marks: 2, stem: 'Name C and D and state the function of each.', model: '**C: pelvis**, a funnel that **collects urine** from the tips of the pyramids. **D: ureter**, a tube that **carries urine** from the kidney **to the urinary bladder**.', sol: 'Pelvis collects; ureter carries.', scheme: [['C pelvis with function', 1], ['D ureter with function', 1]], d: 2, c: 'understanding', t: [2, 3] })),
    part('d', short({ marks: 2, stem: 'Name E. How does the blood in E differ from the blood in the vessel that leaves the kidney beside it?', model: 'E is the **renal artery**. Its blood has **more urea** (and more oxygen) than the blood in the **renal vein**, because the kidney removes urea and uses oxygen.', sol: 'Renal artery; more urea.', scheme: [['Renal artery', 1], ['More urea than the renal vein', 1]], d: 2, c: 'application', t: [2] })),
    part('e', short({ marks: 3, stem: 'Explain why the region A has a dotted appearance while B appears striped.', model: 'Region A (cortex) contains the **Malpighian capsules** and **coiled convoluted tubules**, which appear as **dots** in section. Region B (medulla) is made of **straight loops of Henle and collecting ducts** running side by side towards the pelvis, so it looks **striped**.', sol: 'Capsules vs straight tubes.', scheme: [['Cortex: capsules and coiled tubules', 1], ['Medulla: straight loops and ducts', 1], ['Dotted vs striped linked to these', 1]], d: 3, c: 'analysis', t: [3, 4] }), [
      short({ marks: 3, stem: 'Describe the external features of a human kidney: its shape, size, position and covering.', model: 'Each kidney is **bean-shaped**, dark red, about **10 cm long**, lying against the **back wall of the abdomen** on either side of the backbone, the right one slightly lower. Its inner concave side has a notch, the **hilum**, and it is covered by a thin, tough **capsule**.', sol: 'Bean-shaped, hilum, capsule.', scheme: [['Shape and size', 1], ['Position', 1], ['Hilum and capsule', 1]], d: 2, c: 'recall', t: [3] }),
    ]),
  ],
}));
add('filter-case', mk.case({
  passage: `Dr Mehta explained to her class that the two kidneys of an adult filter about ${KID.gfr} mL of fluid from the blood every minute, yet a person passes only about ${KID.urine} litres of urine in a day.`,
  d: 3, c: 'application',
  children: [
    part('a', num({ marks: 2, stem: 'Calculate the volume of glomerular filtrate, in litres, formed in one day.', value: KID.filtrate, unit: 'L', sol: r`$${KID.gfr} \times 60 \times 24 = ${KID.gfr * 60 * 24}$ mL $= ${KID.filtrate}$ litres.`, scheme: [['Minutes in a day used', 1], [`${KID.filtrate} litres`, 1]], d: 2, c: 'application', t: [5] })),
    part('b', num({ marks: 2, stem: 'What percentage of the filtrate is reabsorbed into the blood? Give your answer to one decimal place.', value: KID.pctReabsorbed, unit: '%', sol: r`Reabsorbed: ${KID.filtrate} − ${KID.urine} = ${KID.reabsorbed} litres; $\dfrac{${KID.reabsorbed}}{${KID.filtrate}} \times 100 \approx ${KID.pctReabsorbed}$ percent.`, scheme: [['Volume reabsorbed', 1], [`${KID.pctReabsorbed} percent`, 1]], d: 3, c: 'application', t: [5] })),
    part('c', short({ marks: 1, wl: null, stem: 'In which part of the nephron does most of this reabsorption occur?', model: 'The **proximal convoluted tubule**.', sol: 'Proximal tubule.', scheme: [['Proximal convoluted tubule', 1]], d: 1, c: 'recall', t: [5] })),
    part('d', short({ marks: 2, stem: 'Why is it essential that so much of the filtrate is reabsorbed?', model: 'The filtrate contains **useful substances**: water, **glucose**, amino acids and salts. Without reabsorption the body would lose them, and would **dry out** within hours, since the daily filtrate is several times the whole blood volume.', sol: 'Save water and useful substances.', scheme: [['Useful substances saved', 1], ['Otherwise rapid loss of water', 1]], d: 3, c: 'analysis', t: [5] })),
    part('e', short({ marks: 3, stem: 'Name the three stages of urine formation and the part of the nephron where each takes place.', model: '1. **Ultrafiltration**: in the **Malpighian capsule** (glomerulus into Bowman\'s capsule).\n2. **Selective reabsorption**: mainly in the **proximal convoluted tubule** (also the loop of Henle and distal tubule).\n3. **Tubular secretion**: in the **distal convoluted tubule**.', sol: 'Three stages and sites.', scheme: [['Ultrafiltration', 1], ['Selective reabsorption', 1], ['Tubular secretion', 1]], d: 2, c: 'recall', t: [5] }), [
      short({ marks: 3, stem: 'Explain why urea is about sixty times more concentrated in urine than in plasma, though no urea is made in the kidney.', model: 'Urea is **filtered** at the same concentration as in plasma. As the filtrate passes along the tubule, **most of the water is reabsorbed** but **little urea** is taken back. The same urea therefore ends up in a **much smaller volume** of liquid, so its concentration rises steeply.', sol: 'Water reabsorbed, urea left.', scheme: [['Urea filtered at plasma level', 1], ['Most water reabsorbed, little urea', 1], ['Same urea in a smaller volume', 1]], d: 4, c: 'analysis', t: [5] }),
    ]),
  ],
}), (q) => (q.children[0].answer.value === 180 && q.children[1].answer.value === 99.2) || 'value');
add('test-case', mk.case({
  passage: 'A laboratory tested the urine of three people. A plus sign means the substance was found.\n\n| Person | Glucose | Proteins | Red blood cells |\n|---|---|---|---|\n| P | − | − | − |\n| Q | + | − | − |\n| R | − | + | + |',
  d: 4, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Whose urine is normal?', model: '**P\'s** urine.', sol: 'P.', scheme: [['P', 1]], d: 1, c: 'application', t: [5] })),
    part('b', short({ marks: 2, stem: 'Suggest a reason for the glucose in Q\'s urine.', model: 'Q\'s **blood glucose is too high** (as in diabetes). More glucose is filtered than the **proximal tubule can reabsorb**, so the extra passes into the urine.', sol: 'High blood glucose.', scheme: [['Blood glucose too high', 1], ['Tubules cannot reabsorb all of it', 1]], d: 3, c: 'analysis', t: [5] })),
    part('c', short({ marks: 2, stem: 'Which part of R\'s nephrons is most likely damaged? Explain.', model: 'The **filter in the Malpighian capsule** (the glomerulus and Bowman\'s capsule wall). Proteins and red cells are normally **too large to be filtered**; they can enter the urine only if this filter is **damaged** and leaky.', sol: 'Glomerular filter damaged.', scheme: [['Glomerulus / Malpighian capsule', 1], ['Large molecules and cells leak through', 1]], d: 4, c: 'analysis', t: [4, 5] })),
    part('d', short({ marks: 2, stem: 'State two substances that are present in the glomerular filtrate of a healthy person but absent from the urine.', model: '**Glucose** and **amino acids**: both are filtered, but all of each is **reabsorbed** into the blood in the proximal tubule.', sol: 'Glucose, amino acids.', scheme: [['Glucose', 1], ['Amino acids', 1]], d: 2, c: 'understanding', t: [5] })),
    part('e', short({ marks: 3, stem: 'Explain how ultrafiltration takes place in a healthy Malpighian capsule.', model: 'The **afferent arteriole is wider** than the efferent, so blood in the **glomerulus** is under **high pressure**. Water and small molecules (glucose, amino acids, salts, urea) are **forced out** through the thin capillary walls into **Bowman\'s capsule**; **blood cells and proteins** are too large and stay behind.', sol: 'Pressure; small molecules pass.', scheme: [['High pressure from arterioles', 1], ['Small molecules forced into the capsule', 1], ['Cells and proteins retained', 1]], d: 3, c: 'understanding', t: [4, 5] })),
  ],
}));
add('heat-case', mk.case({
  passage: `During a summer cricket camp, Arjun estimated the water he lost in one day.\n\n| Route | Water lost (mL) |\n|---|---|\n| Urine | ${WATER.urine} |\n| Sweat | ${WATER.sweat} |\n| Breath | ${WATER.breath} |\n| Faeces | ${WATER.faeces} |`,
  d: 3, c: 'application',
  children: [
    part('a', num({ stem: 'What was the total volume of water Arjun lost, in mL?', value: WATER.total, unit: 'mL', sol: r`$${WATER.urine} + ${WATER.sweat} + ${WATER.breath} + ${WATER.faeces} = ${WATER.total}$ mL.`, scheme: [[`${WATER.total} mL`, 1]], d: 1, c: 'application', t: [1] })),
    part('b', num({ marks: 2, stem: 'What percentage of this water was lost in urine? Give your answer to one decimal place.', value: WATER.pctUrine, unit: '%', sol: r`$\dfrac{${WATER.urine}}{${WATER.total}} \times 100 \approx ${WATER.pctUrine}$ percent.`, scheme: [['Urine volume over total', 1], [`${WATER.pctUrine} percent`, 1]], d: 2, c: 'application', t: [1] })),
    part('c', short({ marks: 2, stem: 'Name the excretory organs that removed water in sweat and in breath, and one other waste each removes.', model: 'The **skin** removes water in sweat, together with **salts and a little urea**. The **lungs** remove water vapour in the breath, together with **carbon dioxide**.', sol: 'Skin: salts, urea; lungs: carbon dioxide.', scheme: [['Skin with waste', 1], ['Lungs with waste', 1]], d: 2, c: 'recall', t: [1] })),
    part('d', short({ marks: 2, stem: 'On a match day Arjun sweats far more. Predict how the volume and colour of his urine will change, and explain.', model: 'His urine will be **less in volume** and **darker** (more concentrated). With more water lost in sweat, his kidney tubules **reabsorb more water** into the blood, leaving the urea in less water.', sol: 'Less, darker.', scheme: [['Less and darker urine', 1], ['More water reabsorbed by tubules', 1]], d: 3, c: 'application', t: [1, 5] })),
    part('e', short({ marks: 3, stem: 'Name the main nitrogenous waste in Arjun\'s urine, the organ in which it is made, and the process by which it is made.', model: 'The waste is **urea**. It is made in the **liver**, by **deamination**: the nitrogen-containing part of **excess amino acids** is removed and converted into urea, which the blood carries to the kidneys.', sol: 'Urea; liver; deamination.', scheme: [['Urea', 1], ['Liver', 1], ['Deamination of excess amino acids', 1]], d: 2, c: 'recall', t: [1] }), [
      short({ marks: 3, stem: 'Explain why the water lost in faeces is not counted as excretion, while the water lost in urine is.', model: 'Faeces are mostly **undigested food** that passed through the gut without entering the body\'s cells, so removing them is **egestion**. Urine carries **urea and other wastes** formed by the **chemical activities of cells** and filtered from the blood, so passing urine is **excretion**.', sol: 'Egestion vs excretion.', scheme: [['Faeces: undigested food, egestion', 1], ['Urine: metabolic wastes', 1], ['Excretion defined correctly', 1]], d: 3, c: 'analysis', t: [1] }),
    ]),
  ],
}), (q) => (q.children[0].answer.value === 2450 && q.children[1].answer.value === 61.2) || 'value');
add('nephron-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'The diagram shows one nephron of a human kidney with its blood supply. Five parts are lettered A to E; the dashed line separates the cortex from the medulla.',
  d: 3, c: 'application',
  assets: [nepFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the knot of capillaries labelled B.', model: '**Glomerulus.**', sol: 'Glomerulus.', scheme: [['Glomerulus', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', short({ marks: 2, stem: 'Explain why the blood pressure in B is high.', model: 'B is supplied by a **wide afferent arteriole** and drained by a **narrower efferent arteriole**. Blood enters faster than it can leave, so the **pressure builds up**, which drives ultrafiltration.', sol: 'Wide in, narrow out.', scheme: [['Wide afferent, narrow efferent', 1], ['Pressure builds up', 1]], d: 2, c: 'understanding', t: [4] })),
    part('c', short({ marks: 2, stem: 'Name C and state two substances reabsorbed there.', model: 'C is the **proximal convoluted tubule**. All the **glucose** and **amino acids**, and most of the **water** and salts, are reabsorbed there.', sol: 'Proximal tubule; glucose, amino acids.', scheme: [['Proximal convoluted tubule', 1], ['Two substances', 1]], d: 2, c: 'understanding', t: [4, 5] })),
    part('d', short({ marks: 2, stem: 'In which region of the kidney does D lie, and what does it help to do?', model: 'D, the **loop of Henle**, lies in the **medulla**. It helps the kidney **reabsorb water**, so that the urine can be made more concentrated.', sol: 'Medulla; water reabsorption.', scheme: [['Medulla', 1], ['Helps reabsorb water', 1]], d: 2, c: 'understanding', t: [3, 4] })),
    part('e', short({ marks: 3, wl: null, stem: 'Draw a neat, labelled diagram of the Malpighian capsule. Label the afferent arteriole, efferent arteriole, glomerulus and Bowman\'s capsule.', model: 'A double-walled cup (**Bowman\'s capsule**) enclosing a knot of capillaries (**glomerulus**); a **wide afferent arteriole** entering and a **narrower efferent arteriole** leaving at the same pole; the tubule leaving from the other side.', sol: 'Labelled Malpighian capsule.', scheme: [['Cup with glomerulus', 1], ['Afferent wider than efferent', 1], ['Labels', 1]], d: 3, c: 'application', t: [4] })),
  ],
}));
add('stone-case', mk.case({
  passage: 'Mr Iyer felt a sharp pain in his lower back on the right side. A scan showed a small stone stuck in his right ureter, but his left kidney and ureter were normal. He was told to drink plenty of water to help the stone pass out.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'What is the function of a ureter?', model: 'It carries **urine from the kidney to the urinary bladder**.', sol: 'Kidney to bladder.', scheme: [['Carries urine to the bladder', 1]], d: 1, c: 'recall', t: [2] })),
    part('b', short({ marks: 2, stem: 'Why does urine still collect in Mr Iyer\'s bladder?', model: 'Each kidney has its **own ureter**. His **left kidney and left ureter** are normal, so urine from the left kidney still drains into the **bladder**.', sol: 'Left side works.', scheme: [['Separate ureters', 1], ['Left kidney still drains', 1]], d: 2, c: 'application', t: [2] })),
    part('c', short({ marks: 2, stem: 'Suggest what could happen to his right kidney if the stone stayed stuck for a long time.', model: 'Urine from the right kidney **cannot drain**, so it **backs up** into the pelvis, which swells. The pressure can **damage the nephrons**, and the right kidney may **stop working**.', sol: 'Back pressure damages the kidney.', scheme: [['Urine backs up into the pelvis', 1], ['Kidney damaged or stops working', 1]], d: 4, c: 'analysis', t: [2, 3] })),
    part('d', short({ marks: 2, stem: 'Name the blood vessel that brings blood to the kidney and the one that takes blood away from it.', model: 'Blood reaches each kidney through the **renal artery** (from the aorta) and leaves through the **renal vein** (to the inferior vena cava).', sol: 'Renal artery; renal vein.', scheme: [['Renal artery', 1], ['Renal vein', 1]], d: 1, c: 'recall', t: [2] })),
    part('e', short({ marks: 3, wl: null, stem: 'Draw a neat, labelled diagram of the human urinary system. Mark with an X where Mr Iyer\'s stone is.', model: 'Two **kidneys** with **renal arteries and veins**; a **ureter** from each to the **urinary bladder**; the **urethra**; an **X** on the **right ureter** (on the viewer\'s left in a front view).', sol: 'Labelled urinary system with X.', scheme: [['Kidneys, ureters, bladder, urethra', 1], ['Renal vessels and labels', 1], ['X on the right ureter', 1]], d: 3, c: 'application', t: [2] })),
  ],
}));
