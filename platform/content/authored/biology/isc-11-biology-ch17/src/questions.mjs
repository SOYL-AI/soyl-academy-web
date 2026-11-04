// ISC 11 Biology ch17 Body Fluids and Circulation — question bank in ISC school-examination style.
// Every number is computed in calc.mjs. AR keys (ISC options): a c d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { HEART_Q, ECG_Q } from './svgs.mjs';
import {
  split, RBC, RBC_TRILLION, WBC, absolute, TYPES, recipientsOf, donorsFor, canGive, compatPairs, aboChild, P, rhPositive, rhNeg, RH_POS_PCT, RH_POS_2000, abBO,
  cycleSec, jd, SYSTOLE_S, co, CO_ATH, UNTRAINED, CO_CHK, svFrom, FAIL, HEALTHY_HEART, FAIL_DROP, hrFromRR, EX, pulse, PULSE_Q, PLASMA_300,
} from './calc.mjs';

const { mcq, ar, fill, num, short, long, tf, match, part } = mk;
const heartFig = svgV(HEART_Q, 'Section of the human heart with parts marked A to E');
const ecgFig = svgV(ECG_Q, 'ECG of two beats with features marked A to D');
const names = (a) => a.map((x) => x.replace('-', ' negative').replace('+', ' positive'));

// ================================================================ t01 blood
add('rbc-mcq', mcq({
  stem: 'Which pair correctly links a feature of a mature red blood cell of a mammal with its advantage?',
  right: 'Absence of a nucleus: more space is available for haemoglobin',
  wrong: ['Presence of a large nucleus: more haemoglobin can be made', 'Absence of haemoglobin: the cell stays light and floats easily', 'Possession of granules: the cell can engulf bacteria'],
  sol: 'A mature mammalian erythrocyte has no nucleus, which leaves room for haemoglobin and so for oxygen — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('thrombin-mcq', mcq({
  stem: 'A technician adds a little thrombin to a tube containing only purified fibrinogen dissolved in saline. What will she observe?',
  right: 'Fine threads of fibrin forming a meshwork',
  wrong: ['Prothrombin being formed from the fibrinogen', 'Platelets clumping together', 'Nothing, because thromboplastin is missing'],
  sol: 'Thrombin is the enzyme that converts soluble fibrinogen into insoluble fibrin threads — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('serum-mcq', mcq({
  stem: 'Blood from a vein is allowed to clot in one tube. The clear straw-coloured fluid that is squeezed out of the clot differs from plasma because it lacks',
  right: 'fibrinogen and the other clotting factors',
  wrong: ['albumin and all the globulins', 'water and dissolved salts', 'every kind of protein'],
  sol: 'Serum is plasma from which fibrinogen and the clotting factors have been used up in the clot — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('albumin-mcq', mcq({
  stem: 'A man with a severe liver disease makes too little albumin and develops swelling of the feet. Which function of albumin is mainly affected?',
  right: 'Maintaining the osmotic balance between the blood and the tissues',
  wrong: ['Defence against bacteria', 'Converting prothrombin to thrombin', 'Carrying oxygen'],
  sol: 'Albumin keeps water in the blood; when it is low, fluid leaks into the tissues and causes swelling — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('neutro-mcq', mcq({
  stem: 'A child has a bacterial throat infection. A count of the white cells in her blood is most likely to show a rise in the number of',
  right: 'neutrophils, which engulf bacteria',
  wrong: ['eosinophils, which release histamine', 'basophils, which make antibodies', 'platelets, which digest germs'],
  sol: 'Neutrophils are the commonest phagocytes and increase in bacterial infections — option (@K).',
  d: 2, c: 'application', t: [1],
}));
{
  const t = RBC_TRILLION;
  add('rbc-num', num({
    stem: `An adult has ${RBC.litres} litres of blood with ${RBC.perMm3 / 1e6} million red blood cells in every mm³. (1 litre = 10⁶ mm³.) How many red blood cells, in trillions (10¹²), does the blood contain?`,
    value: t, unit: 'trillion',
    sol: r`Number $= ${RBC.perMm3} \times ${RBC.litres} \times 10^6 = 2.5 \times 10^{13}$; in trillions this is $2.5 \times 10^{13}/10^{12} = ${t}$.`,
    scheme: [[`${t} trillion`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 25 || 'value');
}
add('wbc-num', num({
  stem: `A laboratory report gives a total white cell count of ${WBC.total} per mm³, of which ${WBC.neutrophilPct} percent are neutrophils. How many neutrophils are there per mm³?`,
  value: absolute(WBC.total, WBC.neutrophilPct), unit: 'per mm³',
  sol: r`$${WBC.neutrophilPct}/100 \times ${WBC.total} = ${absolute(WBC.total, WBC.neutrophilPct)}$ per mm³.`,
  scheme: [[`${absolute(WBC.total, WBC.neutrophilPct)}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 8875 || 'value');
add('bag-num', num({
  stem: `A donor gives ${300} mL of whole blood. Taking plasma to be 55 percent of blood, calculate the volume of plasma in mL.`,
  value: PLASMA_300.plasma, unit: 'mL',
  sol: r`$55/100 \times 300 = ${PLASMA_300.plasma}$ mL.`,
  scheme: [[`${PLASMA_300.plasma} mL`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 165 || 'value');
add('serum-ar', ar({
  a: 'Serum does not clot when it is left standing in a test tube.',
  r: 'Serum lacks fibrinogen and the other clotting factors.',
  key: 'a',
  sol: 'Both are true: the clotting factors were used up when the blood clotted, so serum cannot form a second clot — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('plasma-short2', short({
  marks: 2,
  stem: 'Name the three main plasma proteins and state one function of each.',
  model: '**Albumin** maintains the **osmotic balance** between blood and tissues; **globulins** include the **antibodies** and so defend the body; **fibrinogen** takes part in **blood clotting**, being changed to fibrin.',
  sol: 'Three proteins with functions.',
  scheme: [['Albumin and globulins with functions', 1], ['Fibrinogen with function', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('corp-short3', short({
  marks: 3,
  stem: 'Name the three kinds of blood corpuscle and state one structural feature and one function of each.',
  model: '**Erythrocytes (RBC):** biconcave and without a nucleus in mammals, with haemoglobin; they **carry oxygen**. **Leucocytes (WBC):** colourless and nucleated, in granulocyte and agranulocyte types; they **defend** the body by phagocytosis and antibodies. **Platelets:** small **cell fragments** from megakaryocytes; they **start blood clotting**.',
  sol: 'Three corpuscles with features and functions.',
  scheme: [['Erythrocytes: feature and function', 1], ['Leucocytes: feature and function', 1], ['Platelets: feature and function', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('clot-short3', short({
  marks: 3,
  stem: 'Outline the cascade of events by which blood clots at a wound, naming the substances released and the part played by calcium ions.',
  model: 'Damaged tissue and **platelets** release **thromboplastin** (clotting factors). With **calcium ions**, it converts the inactive **prothrombin** of the plasma into **thrombin**. **Thrombin** changes soluble **fibrinogen** into insoluble **fibrin threads**, and the fibrin **meshwork traps blood cells** to form the clot.',
  sol: 'Thromboplastin; prothrombin to thrombin with calcium; fibrinogen to fibrin.',
  scheme: [['Thromboplastin released by platelets and tissue', 1], ['Prothrombin to thrombin with calcium ions', 1], ['Fibrinogen to fibrin and the clot', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('clot-long', long({
  stem: '(a) Name the plasma protein and the enzyme that are directly involved in the formation of a blood clot. [2]\n(b) A boy with a cut finger bleeds for much longer than usual, and tests show that his blood has too few platelets. Explain why this delays clotting. [2]\n(c) Why is blood collected for storage in a blood bank mixed with a substance that removes calcium ions? [1]',
  model: '(a) The plasma protein is **fibrinogen**, which is changed to insoluble fibrin, and the enzyme is **thrombin**, which brings about that change.\n\n(b) Platelets, together with the damaged tissue, **release thromboplastin**, which starts the cascade. With **fewer platelets** less thromboplastin is released, so **thrombin and fibrin form slowly** and the clot is delayed.\n\n(c) **Calcium ions are needed** to convert prothrombin to thrombin; if they are removed, the stored blood **does not clot**.',
  sol: 'Fibrinogen and thrombin; role of platelets; role of calcium.',
  scheme: [['(a) Fibrinogen', 1], ['(a) Thrombin', 1], ['(b) Platelets release thromboplastin', 1], ['(b) Slower thrombin and fibrin formation', 1], ['(c) Calcium needed for thrombin, so no clotting', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [1],
}));

// ================================================================ t02 ABO and Rh
add('donor-mcq', mcq({
  stem: 'A patient of blood group B, Rh negative needs red cells in an emergency. Four donors are available: donor 1 is A positive, donor 2 is B positive, donor 3 is O negative and donor 4 is B negative. Which donors are safe?',
  right: 'Donors 3 and 4 only',
  wrong: ['Donors 2 and 4 only', 'Donors 1, 2 and 3', 'Donor 3 only'],
  sol: 'The donor must have no antigen A and no Rh antigen: O negative and B negative are safe — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => canGive('O-', 'B-') && canGive('B-', 'B-') && !canGive('B+', 'B-') && !canGive('A+', 'B-') || 'compatibility');
add('rh-mcq', mcq({
  stem: 'Four women have just delivered babies. Which one should be given an injection of anti-Rh antibodies?',
  right: 'An Rh-negative woman whose baby is Rh positive',
  wrong: ['An Rh-positive woman whose baby is Rh negative', 'An Rh-positive woman whose baby is Rh positive', 'An Rh-negative woman whose baby is Rh negative'],
  sol: 'Only when an Rh-negative mother has an Rh-positive baby can she be sensitised by its red cells — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('landsteiner-mcq', mcq({
  stem: 'Who discovered the ABO system of blood groups in 1900?',
  right: 'Karl Landsteiner',
  wrong: ['William Harvey', 'Alexander Fleming', 'Gregor Mendel'],
  sol: 'Karl Landsteiner discovered the ABO groups; with Wiener he later reported the Rh factor — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('slide-mcq', mcq({
  stem: 'A drop of a patient’s blood is mixed with anti-A serum, anti-B serum and anti-Rh serum on a slide. Clumping appears with the anti-A and the anti-Rh sera, but not with the anti-B serum. What is the patient’s blood group?',
  right: 'A positive',
  wrong: ['B positive', 'AB positive', 'A negative'],
  sol: 'Clumping with anti-A shows antigen A, none with anti-B shows no antigen B, and clumping with anti-Rh shows Rh positive: A positive — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bchild-mcq', mcq({
  stem: 'Two parents of blood group B have a child of group O. What are the genotypes of the two parents?',
  right: 'Both are IᴮI (Iᴮi)',
  wrong: ['Both are IᴮIᴮ', 'One is IᴮIᴮ and the other is Iᴮi', 'One is IᴬIᴮ and the other is ii'],
  sol: 'A group O child (ii) must receive i from each parent, so both group B parents are heterozygous, Iᴮi — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => P(aboChild('BO', 'BO'), 'O') === 0.25 || 'O child');
add('rhpos-num', num({
  stem: 'An Rh-positive father of genotype Dd and an Rh-negative mother (dd) are expecting a child. What is the probability that the child will be Rh positive? Give a decimal.',
  value: rhPositive('Dd', 'dd'), tol: 0.001,
  sol: r`$Dd \times dd$ gives $Dd$ and $dd$ in equal numbers, so the probability is ${rhPositive('Dd', 'dd')}.`,
  scheme: [[`${rhPositive('Dd', 'dd')}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 0.5 || 'value');
add('pairs-num', num({
  stem: `Consider the eight blood types O−, O+, A−, A+, B−, B+, AB− and AB+. For red cells, a donor type can be given to a recipient type only if the donor has no A, B or Rh antigen that the recipient lacks. Among the ${TYPES.length * TYPES.length} possible donor-recipient pairs (including each type with itself), how many are compatible?`,
  value: compatPairs,
  sol: `Counting the recipients of each donor: O−: ${recipientsOf('O-').length}, O+: ${recipientsOf('O+').length}, A−: ${recipientsOf('A-').length}, A+: ${recipientsOf('A+').length}, B−: ${recipientsOf('B-').length}, B+: ${recipientsOf('B+').length}, AB−: ${recipientsOf('AB-').length}, AB+: ${recipientsOf('AB+').length}; total = ${compatPairs}.`,
  scheme: [[`${compatPairs}`, 1]],
  d: 4, c: 'analysis', t: [2],
}), () => TYPES.reduce((s, d) => s + recipientsOf(d).length, 0) === 27 || 'pairs');
add('rhesus-fill', fill({
  stem: 'The Rh antigen was first observed in the ______ monkey.',
  acc: [['rhesus', 'Rhesus', 'rhesus macaque']],
  sol: 'Rhesus.',
  d: 1, c: 'recall', t: [2],
}));
add('ebf-tf', tf({
  stem: 'Erythroblastosis foetalis usually occurs in the first pregnancy of an Rh-negative mother who carries an Rh-positive foetus.',
  key: 'f',
  sol: 'False. The mother makes anti-Rh antibodies mainly at the first delivery, so the risk is to a later Rh-positive foetus.',
  d: 2, c: 'understanding', t: [2],
}));
add('abo-match', match({
  stem: 'Match each ABO blood group in column I with the antibodies present in its plasma in column II.',
  pairs: [
    ['Group A', 'anti-B'],
    ['Group B', 'anti-A'],
    ['Group AB', 'no anti-A or anti-B'],
    ['Group O', 'anti-A and anti-B'],
  ],
  order: [1, 3, 0, 2],
  marks: 2,
  sol: 'A has anti-B, B has anti-A, AB has neither and O has both.',
  d: 2, c: 'recall', t: [2],
}));
add('ab-ar', ar({
  a: 'A person of group AB is called a universal recipient for red cells.',
  r: 'The plasma of a group AB person contains both anti-A and anti-B antibodies.',
  key: 'c',
  sol: 'A is true, but R is false: group AB plasma has neither anti-A nor anti-B, so it cannot react with any ABO red cells — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('rh-reason', short({
  marks: 1,
  stem: 'Give a reason: An Rh-negative mother is given anti-Rh antibodies soon after delivering her first Rh-positive baby.',
  model: 'The antibodies **destroy any Rh-positive foetal red cells** in her blood before she can make her own anti-Rh antibodies, which would harm a later Rh-positive baby.',
  sol: 'Prevents sensitisation.',
  scheme: [['They remove foetal red cells so that she does not become sensitised', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('agglut-short2', short({
  marks: 2,
  stem: 'What is agglutination? State how it is used to find the ABO group of a blood sample.',
  model: '**Agglutination** is the **clumping of red cells** when an antibody meets the matching antigen. A drop of blood is mixed separately with **anti-A and anti-B sera**; **clumping with anti-A means group A**, with anti-B means group B, with both means group AB and with neither means group O.',
  sol: 'Definition; use of sera.',
  scheme: [['Clumping of red cells by antibody and antigen', 1], ['Anti-A and anti-B sera used to interpret the result', 1]],
  d: 2, c: 'application', t: [2],
}));
add('compat-short3', short({
  marks: 3,
  stem: `A patient is of blood group AB, Rh negative. List all the types from which she can safely receive red cells, and explain why donors of types A positive, B positive and AB positive must be excluded.`,
  model: `She can receive red cells from **${names(donorsFor('AB-')).join(', ')}** (${donorsFor('AB-').length} types). Her cells have antigens A and B, so she has **no anti-A or anti-B**, and all ABO groups are safe. But she is **Rh negative**, so she will make **anti-Rh antibodies** against the **Rh antigen** of A positive, B positive and AB positive donors; these must be excluded.`,
  sol: 'Four donor types; Rh reason.',
  scheme: [['Four types listed', 1], ['No ABO problem because she has no ABO antibodies', 1], ['Rh-positive donors excluded because she is Rh negative', 1]],
  d: 3, c: 'application', t: [2],
}), () => donorsFor('AB-').length === 4 || 'donors');
add('rhcouple-short3', short({
  marks: 3,
  stem: 'A Rh-negative woman is married to a Rh-positive man whose genotype is Dd. (i) What is the probability that their child will be Rh positive? (ii) In which pregnancy is an Rh-positive child at risk? (iii) What treatment is given to the mother to prevent the risk?',
  model: `(i) The woman is dd; Dd × dd gives Dd and dd equally, so the probability of an **Rh-positive child is ${rhPositive('Dd', 'dd')}** (one half). (ii) The first Rh-positive child is usually safe, because the mother makes antibodies mainly after delivery, so the **second (or a later) Rh-positive child** is at risk of **erythroblastosis foetalis**. (iii) She is given **anti-Rh antibodies** soon after the first delivery.`,
  sol: 'One half; later pregnancy; anti-Rh antibodies.',
  scheme: [['Probability one half', 1], ['Later pregnancy at risk, with reason', 1], ['Anti-Rh antibodies after the first delivery', 1]],
  d: 3, c: 'application', t: [2],
}), () => rhPositive('Dd', 'dd') === 0.5 || 'probability');
add('rh-long', long({
  stem: '(a) What is the Rh factor, and name the animal in which it was first found. [1]\n(b) Explain, with the sequence of events, how erythroblastosis foetalis can affect the second Rh-positive child of an Rh-negative mother. [3]\n(c) How can this be prevented? [1]',
  model: '(a) The Rh factor is an **antigen present on the surface of red cells** of Rh-positive people; it was first found in the **rhesus monkey**.\n\n(b) During the **first delivery**, some **Rh-positive foetal red cells enter the mother’s blood**, and she makes **anti-Rh antibodies**. The first child is usually unharmed. In a **later pregnancy** with an Rh-positive foetus, these antibodies **cross the placenta** and **destroy the foetal red cells**, causing anaemia and jaundice, and sometimes death of the child.\n\n(c) The mother is given **anti-Rh antibodies** soon after the first delivery.',
  sol: 'Rh factor; sequence; prevention.',
  scheme: [['(a) Antigen on red cells; rhesus monkey', 1], ['(b) Foetal cells enter mother and she makes antibodies', 1], ['(b) Antibodies cross the placenta in a later pregnancy', 1], ['(b) Destroy foetal red cells', 1], ['(c) Anti-Rh antibodies after the first delivery', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [2],
}));
add('group-case', mk.case({
  passage: 'A hospital tested three patients with anti-A, anti-B and anti-Rh sera. A plus sign means that clumping occurred.\n\n| Patient | anti-A | anti-B | anti-Rh |\n|---|---|---|---|\n| P | + | − | + |\n| Q | − | − | − |\n| R | + | + | − |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the blood group of patient Q?',
      right: 'O negative',
      wrong: ['O positive', 'AB negative', 'No group can be assigned'],
      sol: 'No clumping with any serum means that Q has no A, B or Rh antigen: O negative — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'Which of the patients could safely receive red cells from Q?',
      right: 'P, Q and R, because Q’s red cells carry none of the three antigens',
      wrong: ['Only P, because P is Rh positive', 'Only R, because R has both A and B', 'Only Q, because blood groups must always match exactly'],
      sol: 'Q is O negative, so its red cells carry no A, B or Rh antigen and can be given to all — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why red cells from patient R must not be given to patient P.',
      model: 'R is **AB negative**, so R’s red cells carry **antigen B**. Patient P is **A positive** and has **anti-B antibodies** in the plasma, which would **agglutinate** R’s red cells.',
      sol: 'Antigen B meets anti-B.',
      scheme: [['R’s cells carry antigen B; P has anti-B', 1], ['Agglutination of the donor cells', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Which of the other two patients, Q or R, could safely give red cells to patient P? Give the reason.',
        model: '**Patient Q** (O negative) could safely give red cells to P, because Q’s red cells carry **no A, B or Rh antigen** for P’s antibodies to attack. Patient R could not, because R’s cells carry antigen B, against which P has anti-B.',
        sol: 'Q; no antigens.',
        scheme: [['Patient Q named', 1], ['Q’s cells have no antigens; R’s carry B', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}));

// ================================================================ t03 lymph and open or closed circulation
add('lymph-mcq', mcq({
  stem: 'After an operation in which many lymph nodes were removed from a woman’s armpit, her arm becomes swollen. The most likely reason is that',
  right: 'tissue fluid that would normally return by lymph vessels collects in the arm',
  wrong: ['too many red blood cells enter the arm', 'the arm is making too much lymph from platelets', 'the veins of the arm have lost their valves'],
  sol: 'Lymph vessels return tissue fluid to the blood; when their drainage is blocked, fluid accumulates — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('circ-mcq', mcq({
  stem: 'Which one of these animals has an open circulatory system, with blood flowing in open spaces around the organs?',
  right: 'Cockroach',
  wrong: ['Earthworm', 'Frog', 'Rabbit'],
  sol: 'Arthropods such as the cockroach have an open circulation; annelids and vertebrates have a closed one — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('lymph-tf', tf({
  stem: 'Lymph flows in both directions in the lymph vessels.',
  key: 'f',
  sol: 'False. Lymph vessels have valves, so lymph flows in one direction only, towards the veins near the heart.',
  d: 1, c: 'recall', t: [3],
}));
add('open-reason', short({
  marks: 1,
  stem: 'Give a reason: An open circulatory system supplies oxygen less quickly than a closed one.',
  model: 'In an open system blood flows in **large open spaces at low pressure**, so it moves slowly and cannot be directed.',
  sol: 'Low pressure, slow flow.',
  scheme: [['Low pressure and slow flow in open spaces', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('lymphnode-short2', short({
  marks: 2,
  stem: 'State two functions of lymph nodes.',
  model: 'Lymph nodes **filter the lymph**, trapping and destroying germs with the **phagocytes** in them; they also **produce and store lymphocytes**, which make antibodies and so help in defence.',
  sol: 'Filtering; lymphocytes.',
  scheme: [['Filter lymph and destroy germs', 1], ['Produce and store lymphocytes', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('openclosed-short2', short({
  marks: 2,
  stem: 'Distinguish between an open and a closed circulatory system, giving one example of an animal with each.',
  model: 'In an **open system** the heart pumps blood into **open spaces (sinuses)** that bathe the tissues, as in the **cockroach**; in a **closed system** the blood stays **inside vessels**, as in the **earthworm** or a mammal, which allows faster flow and better control.',
  sol: 'Difference with two examples.',
  scheme: [['Open: blood in sinuses; example', 1], ['Closed: blood in vessels; example', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('lymphblood-short3', short({
  marks: 3,
  stem: 'Give three differences between blood and lymph.',
  model: '1. **Red blood cells** are present in blood but **absent from lymph**.\n2. Blood has **more proteins and nutrients** than lymph, which has less.\n3. The white cells of lymph are mainly **lymphocytes**, while blood has all kinds of white cells and **platelets**; blood is **red**, lymph is **colourless**.',
  sol: 'Three differences.',
  scheme: [['Red cells present or absent', 1], ['Proteins and nutrients', 1], ['White cells, platelets or colour', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 the heart and the cardiac cycle
add('heartfig-mcq', mcq({
  stem: 'The figure shows a section of the human heart with five parts marked A to E. Which letter marks the chamber with the thickest muscular wall?',
  right: 'A',
  wrong: ['B', 'C', 'E'],
  sol: 'The left ventricle, which pumps blood to the whole body, has the thickest wall; it is marked A — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [heartFig],
}));
add('heartfig2-mcq', mcq({
  stem: 'In the same figure, which letter marks the vessel that carries oxygenated blood from the heart to the body?',
  right: 'C',
  wrong: ['A', 'B', 'E'],
  sol: 'The aorta leaves the left ventricle with oxygenated blood; it is marked C — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [heartFig],
}));
add('heartfig3-mcq', mcq({
  stem: 'In the same figure, during which phase of the cardiac cycle is the valve marked D closed?',
  right: 'Ventricular systole',
  wrong: ['Atrial systole', 'Joint diastole', 'It is closed in all phases'],
  sol: 'D is the bicuspid valve; it closes when the ventricles contract, so blood cannot flow back into the auricle — option (@K).',
  d: 3, c: 'analysis', t: [4],
  assets: [heartFig],
}));
add('valve-mcq', mcq({
  stem: 'A child is born with a narrow bicuspid valve, so that blood cannot easily pass from the left auricle to the left ventricle. Which chamber is most likely to have to work harder, and so to enlarge?',
  right: 'The left auricle',
  wrong: ['The right auricle', 'The right ventricle', 'The left ventricle, because it receives more blood'],
  sol: 'The left auricle must push blood through a narrowed opening, so its wall works harder — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('cycle-mcq', mcq({
  stem: 'A cardiologist records the volume of blood in the left ventricle during one cardiac cycle. At the moment when the volume is falling fastest, what are the valves doing?',
  right: 'The bicuspid valve is closed and the semilunar valve of the aorta is open',
  wrong: ['The bicuspid valve is open and the semilunar valve of the aorta is closed', 'Both valves are closed', 'Both valves are open'],
  sol: 'The volume falls as the ventricle ejects blood, with the bicuspid valve closed and the aortic semilunar valve open — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('rate-mcq', mcq({
  stem: `A trained swimmer has a resting heart rate of ${CO_ATH.hr} beats a minute and an untrained student ${UNTRAINED.hr}, yet at rest their cardiac outputs are the same, ${co(UNTRAINED.hr, UNTRAINED.sv)} mL a minute. What is the best explanation?`,
  right: 'The swimmer’s stroke volume is larger',
  wrong: ['The swimmer’s heart is smaller', 'The swimmer has fewer red blood cells', 'The swimmer’s blood pressure must be lower'],
  sol: r`Output $=$ rate $\times$ stroke volume: $${CO_ATH.hr} \times ${CO_ATH.sv} = ${co(CO_ATH.hr, CO_ATH.sv)}$, the same as $${UNTRAINED.hr} \times ${UNTRAINED.sv}$, so the slower heart pumps more blood per beat — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}), () => co(CO_ATH.hr, CO_ATH.sv) === co(UNTRAINED.hr, UNTRAINED.sv) || 'equal outputs');
add('co-num', num({
  stem: `At rest a man’s heart beats ${CO_CHK.hr} times a minute and the stroke volume is ${CO_CHK.sv} mL. What is his cardiac output in mL per minute?`,
  value: co(CO_CHK.hr, CO_CHK.sv), unit: 'mL per minute',
  sol: r`Cardiac output $=$ stroke volume $\times$ heart rate $= ${CO_CHK.sv} \times ${CO_CHK.hr} = ${co(CO_CHK.hr, CO_CHK.sv)}$ mL per minute.`,
  scheme: [[`${co(CO_CHK.hr, CO_CHK.sv)} mL per minute`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 5250 || 'value');
add('sv-num', num({
  stem: 'A woman’s cardiac output is 4800 mL per minute and her heart rate is 80 beats per minute. Calculate her stroke volume in mL.',
  value: svFrom(4800, 80), unit: 'mL',
  sol: r`Stroke volume $=$ output $/$ rate $= 4800/80 = ${svFrom(4800, 80)}$ mL.`,
  scheme: [[`${svFrom(4800, 80)} mL`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 60 || 'value');
add('jd-num', num({
  stem: `During exercise a student’s heart beats 100 times a minute. If atrial systole stays 0.1 s and ventricular systole 0.3 s, how long, in seconds, is the joint diastole in each cycle?`,
  value: jd(100), tol: 0.001, unit: 's',
  sol: r`Cycle $= 60/100 = ${cycleSec(100)}$ s; joint diastole $= ${cycleSec(100)} - ${SYSTOLE_S} = ${jd(100)}$ s.`,
  scheme: [[`${jd(100)} s`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => Math.abs(q.answer.value - 0.2) < 1e-9 || 'value');
add('ventricle-tf', tf({
  stem: 'The right ventricle pumps oxygenated blood into the aorta.',
  key: 'f',
  sol: 'False. The right ventricle pumps deoxygenated blood into the pulmonary artery; the left ventricle pumps blood into the aorta.',
  d: 1, c: 'recall', t: [4],
}));
add('septum-fill', fill({
  stem: 'The thick muscular wall that separates the right and left ventricles is called the ______ septum.',
  acc: [['interventricular', 'inter-ventricular']],
  sol: 'Interventricular.',
  d: 1, c: 'recall', t: [4],
}));
add('thick-reason', short({
  marks: 1,
  stem: 'Give a reason: The walls of the auricles are much thinner than the walls of the ventricles.',
  model: 'The auricles only **push blood a short distance into the ventricles**, whereas the ventricles must pump blood **out of the heart** to the lungs or the body.',
  sol: 'Auricles pump a short distance.',
  scheme: [['Auricles push blood only into the ventricles; ventricles pump it out', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('chordae-reason', short({
  marks: 1,
  stem: 'Give a reason: The flaps of the tricuspid valve do not turn back into the right auricle when the right ventricle contracts.',
  model: 'The flaps are held by the **chordae tendineae**, tendon-like cords attached to the **papillary muscles** of the ventricle wall.',
  sol: 'Chordae tendineae.',
  scheme: [['Chordae tendineae hold the flaps', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('valves-short2', short({
  marks: 2,
  stem: 'Name the valve between the right auricle and the right ventricle and the valve between the left auricle and the left ventricle, and state the common function of all the valves of the heart.',
  model: 'The valve on the right is the **tricuspid valve** and on the left the **bicuspid (mitral) valve**. All the valves **allow blood to flow in one direction only** and prevent it from flowing back.',
  sol: 'Tricuspid and bicuspid; one-way flow.',
  scheme: [['Tricuspid (right) and bicuspid (left)', 1], ['Prevent backflow of blood', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('sv-short2', short({
  marks: 2,
  stem: 'Define stroke volume and cardiac output, and state how the two are related.',
  model: '**Stroke volume** is the **volume of blood pumped by each ventricle in one beat**; **cardiac output** is the **volume pumped by each ventricle in one minute**. **Cardiac output = stroke volume × heart rate.**',
  sol: 'Two definitions; relation.',
  scheme: [['Stroke volume defined', 1], ['Cardiac output defined with the relation', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('cycle-short3', short({
  marks: 3,
  stem: 'Describe what happens in the heart during atrial systole and during ventricular systole, stating the position of the valves.',
  model: 'In **atrial systole** the **auricles contract** and push the remaining blood into the ventricles; the **valves between auricle and ventricle are open** and the semilunar valves are closed. In **ventricular systole** the **ventricles contract**, the **valves between auricle and ventricle close** and the **semilunar valves open**, so blood flows into the **pulmonary artery and the aorta**.',
  sol: 'Atrial systole; ventricular systole with valves.',
  scheme: [['Atrial systole: auricles contract, blood to ventricles', 1], ['Ventricular systole: ventricles contract, AV valves close', 1], ['Semilunar valves open and blood into the aorta and pulmonary artery', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('output-short3', short({
  marks: 3,
  stem: `A healthy man has a heart rate of ${HEALTHY_HEART.hr} per minute and a stroke volume of ${HEALTHY_HEART.sv} mL. A patient with heart failure has a rate of ${FAIL.hr} per minute and a stroke volume of ${FAIL.sv} mL. Calculate the cardiac output of each, and say by what percentage the patient’s output is lower.`,
  model: `Healthy man: $${HEALTHY_HEART.sv} \\times ${HEALTHY_HEART.hr} = ${co(HEALTHY_HEART.hr, HEALTHY_HEART.sv)}$ mL per minute. Patient: $${FAIL.sv} \\times ${FAIL.hr} = ${co(FAIL.hr, FAIL.sv)}$ mL per minute. The patient’s output is lower by $(${co(HEALTHY_HEART.hr, HEALTHY_HEART.sv)} - ${co(FAIL.hr, FAIL.sv)})/${co(HEALTHY_HEART.hr, HEALTHY_HEART.sv)} \\times 100 \\approx ${FAIL_DROP}$ percent, although the heart beats faster, because each beat pumps far less blood.`,
  sol: 'Two outputs; percentage fall.',
  scheme: [['Output of the healthy man', 1], ['Output of the patient', 1], ['Percentage fall', 1]],
  wl: [20, 80],
  d: 3, c: 'application', t: [4],
}), () => FAIL_DROP === 23.8 || 'percent');
add('heart-long', long({
  stem: '(a) Draw a neat labelled diagram of the internal structure of the human heart, showing the four chambers, the valves and the vessels that enter and leave the heart. [3]\n(b) Trace the path of blood from the right auricle to the aorta, naming the valves that it passes. [2]',
  model: '(a) The diagram shows the **right and left auricles** above the **right and left ventricles**, separated by the **interventricular septum**; the **tricuspid valve** (right) and **bicuspid (mitral) valve** (left) between auricle and ventricle, with chordae tendineae; the **semilunar valves** at the origin of the **pulmonary artery** and the **aorta**; the **superior and inferior vena cavae** entering the right auricle and the **pulmonary veins** entering the left auricle. The left ventricle has the thickest wall.\n\n(b) Right auricle → **tricuspid valve** → right ventricle → **semilunar valve** → pulmonary artery → lungs → pulmonary veins → left auricle → **bicuspid valve** → left ventricle → **semilunar valve** → aorta.',
  sol: 'Labelled diagram; path of blood.',
  scheme: [['(a) Four chambers and septum', 1], ['(a) Valves and chordae tendineae', 1], ['(a) Vessels entering and leaving, neat labels', 1], ['(b) Path to the lungs and back with valves', 1], ['(b) Left ventricle to aorta with valve', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
  assets: [heartFig],
}));
add('cycle-long', long({
  stem: `(a) Name the three phases of the cardiac cycle and give their durations in a heart beating 75 times a minute. [3]\n(b) A man’s heart rate rises to 100 beats a minute during exercise. Calculate the duration of one cycle and the joint diastole if the two systoles stay at 0.1 s and 0.3 s, and comment on the result. [2]`,
  model: `(a) **Atrial (auricular) systole**, ${0.1} s; **ventricular systole**, ${0.3} s; **joint diastole**, ${0.4} s; together the cycle lasts **${cycleSec(75)} s**.\n\n(b) Cycle $= 60/100 = ${cycleSec(100)}$ s; joint diastole $= ${cycleSec(100)} - ${SYSTOLE_S} = ${jd(100)}$ s. The resting phase is **halved**, so the heart has **less time to fill** between beats while the contraction times stay the same.`,
  sol: 'Three phases with durations; faster heart.',
  scheme: [['(a) Three phases named', 1], ['(a) Durations 0.1, 0.3 and 0.4 s', 1], ['(a) Total 0.8 s', 1], ['(b) Cycle 0.6 s and joint diastole 0.2 s', 1], ['(b) Comment: diastole shortened', 1]],
  wl: [25, 200],
  d: 3, c: 'application', t: [4],
}), () => jd(100) === 0.2 && cycleSec(75) === 0.8 || 'cycle');
add('heart-case', mk.case({
  passage: `A sports clinic measured an untrained student and a trained swimmer.\n\n| | Heart rate (per minute) at rest | Stroke volume (mL) at rest | Heart rate during exercise | Stroke volume (mL) during exercise |\n|---|---|---|---|---|\n| Untrained student | ${UNTRAINED.hr} | ${UNTRAINED.sv} | ${EX.untrained.hr} | ${EX.untrained.sv} |\n| Swimmer | ${CO_ATH.hr} | ${CO_ATH.sv} | ${EX.athlete.hr} | ${EX.athlete.sv} |`,
  d: 4, c: 'analysis',
  children: [
    part('a', num({
      stem: 'Calculate the cardiac output of the swimmer at rest, in mL per minute.',
      value: co(CO_ATH.hr, CO_ATH.sv), unit: 'mL per minute',
      sol: r`$${CO_ATH.sv} \times ${CO_ATH.hr} = ${co(CO_ATH.hr, CO_ATH.sv)}$ mL per minute.`,
      scheme: [[`${co(CO_ATH.hr, CO_ATH.sv)} mL per minute`, 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('b', mcq({
      stem: 'During exercise, both have the same heart rate. Which statement about their outputs is correct?',
      right: 'The swimmer’s output is greater because each of her beats pumps more blood',
      wrong: ['The student’s output is greater because his heart rate is higher', 'The outputs are equal because the heart rates are equal', 'The swimmer’s output is smaller because her resting rate is lower'],
      sol: r`Output $=$ rate $\times$ stroke volume: swimmer $${EX.athlete.hr} \times ${EX.athlete.sv} = ${co(EX.athlete.hr, EX.athlete.sv)}$ mL, student $${EX.untrained.hr} \times ${EX.untrained.sv} = ${co(EX.untrained.hr, EX.untrained.sv)}$ mL — option (@K).`,
      d: 3, c: 'analysis', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find how much more blood the swimmer’s heart pumps each minute during exercise, and give the reason.',
      model: `Swimmer: $${EX.athlete.sv} \\times ${EX.athlete.hr} = ${co(EX.athlete.hr, EX.athlete.sv)}$ mL; student: $${EX.untrained.sv} \\times ${EX.untrained.hr} = ${co(EX.untrained.hr, EX.untrained.sv)}$ mL. The swimmer pumps $${co(EX.athlete.hr, EX.athlete.sv)} - ${co(EX.untrained.hr, EX.untrained.sv)} = ${co(EX.athlete.hr, EX.athlete.sv) - co(EX.untrained.hr, EX.untrained.sv)}$ mL more a minute, because her **stroke volume is larger**, since training strengthens the heart muscle.`,
      sol: 'Difference in output; larger stroke volume.',
      scheme: [['Both outputs and the difference', 1], ['Larger stroke volume as the reason', 1]],
      wl: [15, 60],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Why can the swimmer supply her muscles with enough blood at rest with a slower heart rate than the student, and what is one advantage of this?',
        model: 'Her heart **pumps more blood in each beat** (a larger stroke volume), so a slower rate gives the same output. The slow rate means the heart has a **longer diastole** to fill and rest, so the heart is less strained.',
        sol: 'Larger stroke volume; longer rest.',
        scheme: [['Larger stroke volume gives the same output at a slower rate', 1], ['An advantage: longer diastole and less strain', 1]],
        d: 3, c: 'analysis', t: [4],
      }),
    ]),
  ],
}), (q) => q.children[0].answer.value === 5760 || 'output');

// ================================================================ t05 regulation, ECG, vessels, circulation
add('nodal-mcq', mcq({
  stem: 'The natural pacemaker of the heart has failed in an elderly patient, and an artificial pacemaker is fitted. The artificial device takes over the function of the',
  right: 'sino-atrial node',
  wrong: ['atrio-ventricular valve', 'bundle of His', 'bicuspid valve'],
  sol: 'The SA node starts each heartbeat and is the natural pacemaker — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ecg-fig-mcq', mcq({
  stem: 'In the ECG shown, which letter marks the tall, narrow spike that records the excitation of the ventricles?',
  right: 'A',
  wrong: ['B', 'C', 'D'],
  sol: 'The QRS complex is the tall narrow spike and shows excitation (depolarisation) of the ventricles, which begins ventricular contraction; it is marked A — option (@K).',
  d: 2, c: 'application', t: [5],
  assets: [ecgFig],
}));
add('ecg-fig2-mcq', mcq({
  stem: 'In the same ECG, the wave marked B comes after the tall spike. What does it represent?',
  right: 'Return of the ventricles to the resting state',
  wrong: ['Excitation of the auricles', 'Contraction of the auricles', 'Closure of the semilunar valves in the veins'],
  sol: 'The T wave represents repolarisation, the return of the ventricles from the excited to the normal state — option (@K).',
  d: 2, c: 'understanding', t: [5],
  assets: [ecgFig],
}));
add('vagus-mcq', mcq({
  stem: 'A drug blocks the effect of the vagus nerve on the heart. What is the expected effect on the heart rate?',
  right: 'The rate rises, because the slowing influence of the parasympathetic nerve is removed',
  wrong: ['The rate falls, because the vagus nerve normally speeds the heart', 'The rate stops, because the SA node needs the vagus nerve to start each beat', 'The rate is unchanged, because the heart is not under nervous control at all'],
  sol: 'The vagus nerve (parasympathetic) slows the heart; blocking it allows the rate to rise — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('vessel-mcq', mcq({
  stem: 'A student measures three blood vessels from a rabbit: vessel P has a wall 1.0 mm thick and a narrow lumen; vessel Q has a wall 0.3 mm thick, a wide lumen and flaps inside; vessel R has a wall one cell thick. Which of these is a vein?',
  right: 'Vessel Q',
  wrong: ['Vessel P', 'Vessel R', 'Both P and Q'],
  sol: 'A thin wall, a wide lumen and valve flaps identify a vein; P is an artery and R a capillary — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('dbl-mcq', mcq({
  stem: 'A drop of blood has just left the right ventricle. Through which vessel does it return to the heart, and into which chamber does it enter?',
  right: 'Pulmonary vein, into the left auricle',
  wrong: ['Pulmonary vein, into the right auricle', 'Vena cava, into the left auricle', 'Aorta, into the right auricle'],
  sol: 'From the right ventricle blood goes to the lungs and returns by the pulmonary veins to the left auricle — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('pulse-num', num({
  stem: `A sphygmomanometer reading of a patient is ${PULSE_Q.sys} over ${PULSE_Q.dia} mm Hg. Find the difference between the systolic and the diastolic pressure (the pulse pressure) in mm Hg.`,
  value: pulse(PULSE_Q.sys, PULSE_Q.dia), unit: 'mm Hg',
  sol: r`$${PULSE_Q.sys} - ${PULSE_Q.dia} = ${pulse(PULSE_Q.sys, PULSE_Q.dia)}$ mm Hg.`,
  scheme: [[`${pulse(PULSE_Q.sys, PULSE_Q.dia)} mm Hg`, 1]],
  d: 1, c: 'application', t: [5],
}), (q) => q.answer.value === 56 || 'value');
add('ecghr-num', num({
  stem: `On an ECG strip that runs at 25 mm per second, the distance between two successive R peaks is 24 mm. Calculate the heart rate in beats per minute, to one decimal place.`,
  value: hrFromRR(24), tol: 0.05, unit: 'beats per minute',
  sol: r`Time between beats $= 24/25 = 0.96$ s; rate $= 60/0.96 = ${hrFromRR(24)}$ beats per minute.`,
  scheme: [[`${hrFromRR(24)} per minute`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => Math.abs(q.answer.value - 62.5) < 0.06 || 'value');
add('artery-tf', tf({
  stem: 'The arteries of the body contain valves that prevent blood from flowing backwards.',
  key: 'f',
  sol: 'False. Valves are present in veins; arteries have thick elastic walls and carry blood under high pressure.',
  d: 1, c: 'recall', t: [5],
}));
add('pacemaker-fill', fill({
  stem: 'The impulse of the heartbeat passes from the atrio-ventricular node into the atrio-ventricular bundle, also called the bundle of ______.',
  acc: [['His', 'His']],
  sol: 'His.',
  d: 1, c: 'recall', t: [5],
}));
add('art-reason', short({
  marks: 1,
  stem: 'Give a reason: The walls of arteries are elastic as well as muscular.',
  model: 'Arteries receive blood from the heart at **high pressure**, and the **elastic wall stretches and then recoils**, which withstands the pressure and keeps blood flowing.',
  sol: 'Stretch and recoil at high pressure.',
  scheme: [['Withstand high pressure by stretching and recoiling', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('ecg-short2', short({
  marks: 2,
  stem: 'What does an electrocardiogram record? State what the P wave and the T wave represent.',
  model: 'An **ECG** records the **electrical activity of the heart**. The **P wave** represents the **excitation (depolarisation) of the auricles**, and the **T wave** represents the **return of the ventricles to the normal (resting) state**.',
  sol: 'Electrical activity; P; T.',
  scheme: [['Records electrical activity of the heart', 1], ['P wave and T wave', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('regul-short2', short({
  marks: 2,
  stem: 'How do the sympathetic and parasympathetic nerves affect the heartbeat? Name one hormone that also affects it.',
  model: '**Sympathetic** nerves **increase the heart rate and the force of the beat**, and **parasympathetic (vagus)** nerves **decrease** them. The hormone **adrenaline** (from the adrenal medulla) increases the heart rate and the cardiac output.',
  sol: 'Sympathetic increases; parasympathetic decreases; adrenaline.',
  scheme: [['Sympathetic increases, parasympathetic decreases', 1], ['Adrenaline', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('capillary-short2', short({
  marks: 2,
  stem: 'Describe the structure of a capillary wall and explain how it suits the function of a capillary.',
  model: 'The wall of a capillary is a **single layer of flat endothelial cells**. Because it is **only one cell thick**, oxygen, nutrients and carbon dioxide can **pass quickly by diffusion** between the blood and the tissues.',
  sol: 'One-cell wall; rapid exchange.',
  scheme: [['Wall of a single layer of endothelium', 1], ['Thin wall allows exchange of materials', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('vessels-short3', short({
  marks: 3,
  stem: 'Give three structural differences between an artery and a vein, and state the direction in which each carries blood.',
  model: 'An **artery** has a **thick, elastic and muscular wall**, a **narrow lumen** and **no valves**, and carries blood **away from the heart**. A **vein** has a **thinner wall with less muscle**, a **wide lumen** and **valves**, and carries blood **towards the heart**.',
  sol: 'Three differences; directions.',
  scheme: [['Wall thickness and muscle', 1], ['Lumen width and valves', 1], ['Direction of blood flow', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('ecg-long', long({
  stem: `(a) Draw a labelled diagram of a normal ECG showing the P wave, QRS complex and T wave. [2]\n(b) State what each of the three features represents. [2]\n(c) On a strip run at 25 mm per second the R–R distance is 24 mm. Calculate the heart rate. [1]`,
  model: `(a) The diagram shows a **small rounded P wave**, a **tall narrow QRS complex** and a **rounded T wave** in that order, with the baseline, and the interval between two R peaks marked as one cycle.\n\n(b) **P wave:** excitation (depolarisation) of the **auricles**, followed by atrial contraction. **QRS complex:** excitation of the **ventricles**, followed by the start of ventricular contraction. **T wave:** **return of the ventricles to the normal state** (repolarisation).\n\n(c) Time between beats $= 24/25 = 0.96$ s; heart rate $= 60/0.96 = ${hrFromRR(24)}$ beats per minute.`,
  sol: 'Diagram; meaning of each wave; rate from R–R.',
  scheme: [['(a) P, QRS and T in order', 1], ['(a) Neat labels and R–R interval', 1], ['(b) P wave and QRS', 1], ['(b) T wave', 1], ['(c) 62.5 beats per minute', 1]],
  wl: [40, 200],
  d: 3, c: 'application', t: [5],
  assets: [ecgFig],
}), () => hrFromRR(24) === 62.5 || 'rate');

// ================================================================ t06 disorders of circulation
add('angina-mcq', mcq({
  stem: 'Which statement correctly distinguishes angina pectoris from heart failure?',
  right: 'Angina is chest pain from too little oxygen reaching the heart muscle, while heart failure is the failure of the heart to pump enough blood',
  wrong: ['Angina is the failure of the heart to pump enough blood, while heart failure is chest pain', 'Both are other names for the stopping of the heartbeat', 'Angina is high blood pressure, while heart failure is low blood pressure'],
  sol: 'Angina is a pain caused by a shortage of oxygen in the heart muscle; heart failure is weak pumping — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('cad-mcq', mcq({
  stem: 'In coronary artery disease the lumen of the coronary arteries is narrowed by deposits of',
  right: 'calcium, fat, cholesterol and fibrous tissue',
  wrong: ['fibrin threads and platelets only', 'urea and uric acid', 'glycogen and starch'],
  sol: 'Atherosclerosis is the deposit of calcium, fat, cholesterol and fibrous tissue in the artery wall — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('htn-mcq', mcq({
  stem: 'A patient’s blood pressure is 160 over 100 mm Hg at three separate visits. Which organs are most at risk if the condition is left untreated?',
  right: 'The heart, the brain and the kidneys',
  wrong: ['The skin and hair only', 'The lungs and the stomach only', 'The bones and the teeth'],
  sol: 'Persistent hypertension damages the heart, the brain and the kidneys — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('fail-mcq', mcq({
  stem: 'A man’s heart still beats, but it cannot pump enough blood for his body. He is breathless and fluid collects in his lungs. This condition is',
  right: 'heart failure',
  wrong: ['cardiac arrest', 'angina pectoris', 'hypertension'],
  sol: 'A heart that beats but does not pump blood effectively enough, with congestion of the lungs, is in heart failure — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('coronary-tf', tf({
  stem: 'The coronary arteries supply blood to the muscle of the heart itself.',
  key: 't',
  sol: 'True. The coronary arteries branch from the aorta and nourish the heart muscle.',
  d: 1, c: 'recall', t: [6],
}));
add('htn-fill', fill({
  stem: 'A blood pressure that is repeatedly found to be ______ over 90 mm Hg or higher is called hypertension.',
  acc: [['140', 'one hundred and forty', '140 mm Hg']],
  sol: '140 over 90 mm Hg.',
  d: 1, c: 'recall', t: [6],
}));
add('angina-ar', ar({
  a: 'Angina pectoris is another name for cardiac arrest.',
  r: 'In angina pectoris the heart suddenly stops beating.',
  key: 'd',
  sol: 'Both are false: angina is chest pain from too little oxygen reaching the heart muscle, and the heart goes on beating — option (d).',
  d: 2, c: 'understanding', t: [6],
}));
add('cad-short2', short({
  marks: 2,
  stem: 'What causes coronary artery disease, and how does it affect the heart?',
  model: 'It is caused by the **deposition of calcium, fat, cholesterol and fibrous tissue** (atherosclerosis) in the **coronary arteries**, which **narrows their lumen**. Less blood and oxygen reach the **heart muscle**, which can lead to chest pain (angina) or damage.',
  sol: 'Deposits narrow coronary arteries; less oxygen to the heart muscle.',
  scheme: [['Deposits narrow the coronary arteries', 1], ['Less oxygen to the heart muscle', 1]],
  d: 1, c: 'understanding', t: [6],
}));
add('disorders-short3', short({
  marks: 3,
  stem: 'Distinguish between angina pectoris and heart failure with reference to the cause, the main symptom and the effect on the heart.',
  model: '**Angina pectoris** is caused by **insufficient oxygen reaching the heart muscle**, often because of narrowed coronary arteries; the main symptom is **acute chest pain**, and the heart continues to pump. **Heart failure** is caused by the **heart being unable to pump blood effectively enough** for the body’s needs; the symptoms include **breathlessness and congestion of the lungs**, and the heart’s output falls.',
  sol: 'Cause, symptom and effect for each.',
  scheme: [['Causes of each', 1], ['Main symptom of each', 1], ['Effect on the heart', 1]],
  d: 2, c: 'analysis', t: [6],
}));
add('disorders-long', long({
  stem: '(a) What is hypertension? State its cause in terms of blood pressure and two organs it can damage. [2]\n(b) Explain how coronary artery disease can lead to angina pectoris. [2]\n(c) How does heart failure differ from cardiac arrest? [1]',
  model: '(a) **Hypertension** is high blood pressure, **140/90 mm Hg or above** on repeated readings. It makes the heart work harder and can damage the **heart, brain and kidneys**.\n\n(b) In **coronary artery disease** the arteries that supply the heart muscle are **narrowed by deposits** of calcium, fat and cholesterol. When the heart works harder, the **muscle does not get enough oxygen**, producing the **chest pain of angina**.\n\n(c) In **heart failure** the heart still beats but **cannot pump blood effectively enough**; in **cardiac arrest** the heart **stops beating**.',
  sol: 'Hypertension; CAD and angina; heart failure and cardiac arrest.',
  scheme: [['(a) 140/90 or above on repeated readings', 1], ['(a) Two organs damaged', 1], ['(b) Narrowed coronary arteries', 1], ['(b) Too little oxygen on effort causes pain', 1], ['(c) Weak pumping against stopped heart', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [6],
}));

// quiet the linter about helpers kept for readability
void [split, RH_POS_PCT, rhNeg, RH_POS_2000, abBO, P];
