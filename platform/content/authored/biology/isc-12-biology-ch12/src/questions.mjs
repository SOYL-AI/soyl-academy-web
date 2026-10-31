// ISC 12 Biology ch12 Immunity, AIDS and Substance Abuse — question bank in ISC style.
// Antibody chain counts, ELISA cut-offs, response peaks, pack-years and percentages are computed by calc.mjs.
// AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { chains, elisa, packYears, pct, series, peakIn } from './calc.mjs';
import { ANTIBODY, RESPONSE } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const antibodyFig = svgV(ANTIBODY, 'Y-shaped antibody with two heavy and two light chains');
const responseFig = svgV(RESPONSE, 'Primary and secondary antibody responses after two exposures');

// ---------------------------------------------------------------- t01 innate immunity
add('barrier-mcq', mcq({
  stem: 'Patients with severe burns over much of the body are very likely to suffer infections. Which barrier of innate immunity have they lost?',
  right: 'The physical barrier of intact skin',
  wrong: ['The cytokine barrier of interferons', 'The physiological barrier of stomach acid', 'The cellular barrier of macrophages in the spleen'],
  sol: 'Skin is the main physical barrier; burns remove it — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('mucus-mcq', mcq({
  stem: 'Years of smoking damage the mucus-lined airways of a man, and he now catches chest infections often. Which defence has been weakened?',
  right: 'The physical barrier formed by mucus that traps microbes in the respiratory tract',
  wrong: ['The secondary immune response', 'Passive immunity from his mother', 'The physiological barrier of tears'],
  sol: 'Mucus lining the airways traps microbes — a physical barrier of innate immunity — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('interferon-ar', ar({
  a: 'Interferons help to limit the spread of a viral infection in the body.',
  r: 'Interferons are secreted by virus-infected cells and protect neighbouring non-infected cells from further viral infection.',
  key: 'a',
  sol: 'Both are true, and the protection of neighbouring cells explains how spread is limited — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
add('nk-fill', fill({
  stem: 'Lymphocytes of innate immunity that kill virus-infected and tumour cells without needing antibodies are called natural ______ cells.',
  acc: [['killer']],
  sol: 'Natural killer (NK) cells.',
  d: 1, c: 'recall', t: [1],
}));
add('tears-short', short({
  marks: 1,
  stem: 'Give a reason: tears are regarded as part of the innate immune system.',
  model: 'Tears are a **physiological barrier**: they **wash away** and help **destroy microbes** entering the eye.',
  sol: 'Physiological barrier.',
  scheme: [['Physiological barrier that removes or kills microbes', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('innate-short', short({
  marks: 2,
  stem: 'Name the four types of barriers of innate immunity and give one example of each.',
  model: '**Physical** — skin or mucus of the airways and gut. **Physiological** — acid in the stomach, saliva or tears. **Cellular** — neutrophils, monocytes, natural killer cells or macrophages. **Cytokine** — interferons secreted by virus-infected cells.',
  sol: 'Four barriers.',
  scheme: [['Two barriers with examples', 1], ['Two more', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 acquired immunity, lymphoid organs
add('cmi-mcq', mcq({
  stem: 'A kidney transplanted from a poorly matched donor is attacked and rejected by the recipient. Which part of the immune system is mainly responsible?',
  right: 'Cell-mediated immunity by T-lymphocytes',
  wrong: ['Humoral immunity by IgE', 'The physical barrier of the skin', 'Passive immunity from colostrum'],
  sol: 'Graft rejection is due to cell-mediated immunity, which recognises non-self — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('colostrum-mcq', mcq({
  stem: 'A newborn baby fed on colostrum in the first days after birth becomes protected against some infections. What kind of immunity is this?',
  right: 'Natural passive immunity from IgA antibodies in the colostrum',
  wrong: ['Active immunity from the baby’s own antibodies', 'Innate immunity from skin', 'Artificial active immunity from a vaccine'],
  sol: 'Ready-made IgA antibodies are received from the mother — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('thymus-mcq', mcq({
  stem: 'In which organ do T-lymphocytes mature into antigen-sensitive cells?',
  right: 'Thymus',
  wrong: ['Spleen', 'Tonsils', 'Lymph nodes'],
  sol: 'The thymus is a primary lymphoid organ where T-cells mature — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('spleen-mcq', mcq({
  stem: 'Which secondary lymphoid organ filters blood, trapping blood-borne microbes, and acts as a reservoir of red blood cells?',
  right: 'Spleen',
  wrong: ['Thymus', 'Bone marrow', 'Peyer’s patches'],
  sol: 'The spleen filters blood — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('lymphnode-mcq', mcq({
  stem: 'During a throat infection, small swellings appear in the neck and become tender. What is happening in them?',
  right: 'Lymph nodes are trapping microbes, and lymphocytes there are multiplying in response.',
  wrong: ['The thymus is producing new red blood cells.', 'Antibodies are being made by the skin.', 'Interferons are being stored for later use.'],
  sol: 'Lymph nodes are secondary lymphoid organs where lymphocytes meet antigens and proliferate — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('antivenom-mcq', mcq({
  stem: 'A farmer bitten by a cobra is injected with antivenom rather than a vaccine. Why?',
  right: 'Antivenom supplies ready-made antibodies at once, whereas a vaccine would take too long to act.',
  wrong: ['A vaccine would give only passive immunity.', 'Antivenom makes the farmer produce memory cells.', 'Vaccines work only against viruses.'],
  sol: 'Passive immunisation acts immediately, which is vital for venom — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('secondary-mcq', mcq({
  stem: 'Children receive a booster dose of a vaccine some months after the first dose. What is the main benefit?',
  right: 'It triggers a faster, stronger secondary response from memory cells.',
  wrong: ['It replaces the innate barriers.', 'It gives passive immunity from the mother.', 'It prevents any primary response.'],
  sol: 'Re-exposure to the antigen produces the intensified secondary response — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('graft-ar', ar({
  a: 'Tissue matching is carried out before an organ transplant.',
  r: 'The immune system can distinguish self from non-self, and T-cells attack foreign tissue.',
  key: 'a',
  sol: 'Both are true, and the self–non-self recognition explains why matching is needed — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('activepassive-short', short({
  marks: 2,
  stem: 'Distinguish between active and passive immunity, giving one example of each.',
  model: '**Active immunity:** the person’s **own body makes antibodies** after infection or **vaccination**; it develops **slowly** but **lasts long** — for example, after a measles vaccine. **Passive immunity:** **ready-made antibodies** are received; it acts **at once** but is **short-lived** — for example, **IgA in colostrum** or an injected **antitoxin**.',
  sol: 'Own antibodies vs ready-made.',
  scheme: [['Active with example', 1], ['Passive with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('humoral-short', short({
  marks: 2,
  stem: 'Distinguish between humoral immunity and cell-mediated immunity.',
  model: '**Humoral immunity** is carried out by **B-lymphocytes**, which secrete **antibodies** into blood and lymph that neutralise antigens. **Cell-mediated immunity** is carried out by **T-lymphocytes**, which do not secrete antibodies but **attack infected or foreign cells** and help B-cells; it causes **graft rejection**.',
  sol: 'B-cells vs T-cells.',
  scheme: [['Humoral: B-cells, antibodies', 1], ['CMI: T-cells, graft rejection', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('lymphoid-short', short({
  marks: 3,
  stem: 'Distinguish between primary and secondary lymphoid organs, naming two of each, and state what MALT is.',
  model: '**Primary lymphoid organs** — **bone marrow** and **thymus** — are where lymphocytes are **produced and mature** into antigen-sensitive cells. **Secondary lymphoid organs** — such as the **spleen**, **lymph nodes**, **tonsils**, **Peyer’s patches** and **appendix** — are where mature lymphocytes **meet antigens and proliferate**. **MALT** is **mucosa-associated lymphoid tissue** lining the respiratory, digestive and urogenital tracts; it makes up about **half** of the body’s lymphoid tissue.',
  sol: 'Primary, secondary, MALT.',
  scheme: [['Primary with two examples', 1], ['Secondary with two examples', 1], ['MALT', 1]],
  d: 2, c: 'understanding', t: [2],
}));
{
  const pts = series(70);
  const p1 = peakIn(pts, 0, 39), p2 = peakIn(pts, 40, 70);
  add('memory-short', short({
    marks: 3,
    stem: `The figure shows antibody levels after two exposures to the same antigen, on day 0 and day 40. The peaks are about ${p1} and ${p2} units. Explain the difference in the two responses and how a vaccine makes use of it.`,
    model: `The first exposure gives a **primary response**: antibody levels rise **slowly** to a **low** peak (about ${p1}). It also leaves **memory B and T cells**. On the **second exposure**, these memory cells respond **quickly**, giving a **secondary (anamnestic) response** that rises fast to a much **higher** peak (about ${p2}). A **vaccine** provides the first exposure **safely**, so that a real infection later meets the strong secondary response.`,
    sol: 'Primary, memory, secondary, vaccine.',
    scheme: [['Primary: slow, low; memory cells formed', 1], ['Secondary: fast, strong', 1], ['Vaccine uses memory', 1]],
    d: 3, c: 'application', t: [2],
    assets: [responseFig],
  }), () => p2 > p1 * 3 || 'peaks');
}
add('transplant-short', short({
  marks: 3,
  stem: 'Patient A receives a kidney from an identical twin; patient B receives one from an unrelated, poorly matched donor. B’s kidney is rejected unless he takes immunosuppressant drugs, which also make him prone to infections. Explain all three observations.',
  model: 'An **identical twin** has the **same antigens**, so A’s immune system treats the kidney as **self** and does not attack it. B’s kidney carries **foreign (non-self) antigens**; **T-lymphocytes** recognise them and destroy it — **cell-mediated** graft rejection. **Immunosuppressants** reduce this response, but they **weaken immunity in general**, so B becomes **more prone to infections**.',
  sol: 'Self vs non-self; CMI; immunosuppression.',
  scheme: [['Twin: same antigens, treated as self', 1], ['Unmatched: T-cell rejection', 1], ['Immunosuppressants weaken defence', 1]],
  d: 4, c: 'analysis', t: [2],
}));
add('immunity-long', long({
  stem: '(a) Distinguish between innate and acquired immunity. [1]\n(b) Explain the primary and secondary immune responses with reference to memory. [2]\n(c) Explain why a person bitten by a snake is given antivenom, while a child is given a vaccine against polio. [2]',
  model: '(a) **Innate immunity** is **non-specific** and present **at birth**; **acquired immunity** is **specific**, develops after exposure, and has **memory**.\n\n(b) The **primary response** to the first encounter is **slow and of low intensity**, and leaves **memory B and T cells**. A later encounter with the same antigen triggers a **secondary (anamnestic) response** that is **faster and much stronger**.\n\n(c) Venom acts **quickly**, so the victim needs **ready-made antibodies** at once — **passive immunisation**. A child is not yet infected, so a **vaccine** can safely produce **active immunity** with **long-lasting memory**.',
  sol: 'Innate vs acquired; responses; immunisation.',
  scheme: [['(a) Distinction', 1], ['(b) Primary and memory', 1], ['(b) Secondary response', 1], ['(c) Antivenom: passive, immediate', 1], ['(c) Vaccine: active, memory', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 antibodies, vaccination, autoimmunity
add('igm-mcq', mcq({
  stem: 'Which antibody, a large pentamer, is the first to be produced during a primary immune response?',
  right: 'IgM',
  wrong: ['IgG', 'IgA', 'IgE'],
  sol: 'IgM appears first; IgG dominates the secondary response — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('igg-mcq', mcq({
  stem: 'Which antibody, the most abundant in blood serum, crosses the placenta to protect the foetus?',
  right: 'IgG',
  wrong: ['IgA', 'IgM', 'IgD'],
  sol: 'IgG crosses the placenta — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('vaccine-mcq', mcq({
  stem: 'A child given the measles vaccine stays free of measles when an outbreak occurs at school years later. What does the vaccine leave in the child’s body that explains this?',
  right: 'Memory B and T cells specific to the measles antigen',
  wrong: ['Ready-made antibodies from another person', 'A permanent fever that kills viruses', 'Extra skin layers that block viruses'],
  sol: 'Vaccination produces memory cells for a rapid secondary response — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('autoimmune-mcq', mcq({
  stem: 'Which of these is an autoimmune disease, in which the body’s immune system attacks its own cells?',
  right: 'Rheumatoid arthritis',
  wrong: ['Typhoid', 'AIDS', 'Ringworm'],
  sol: 'Rheumatoid arthritis is autoimmune — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('hepb-mcq', mcq({
  stem: 'The hepatitis B vaccine is made by expressing the gene for a viral surface protein in yeast. What kind of vaccine is this?',
  right: 'A recombinant DNA vaccine made of an antigenic protein',
  wrong: ['A live attenuated virus vaccine', 'An antitoxin for passive immunisation', 'An interferon preparation'],
  sol: 'Recombinant DNA technology produces the antigen in yeast — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('heroin-ar', ar({
  a: 'Heroin is a stimulant obtained from the coca plant.',
  r: 'Cocaine slows down body functions by binding opioid receptors.',
  key: 'd',
  sol: 'Both are false: heroin is a depressant from the poppy; cocaine is a stimulant that interferes with dopamine transport — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
{
  const c = chains(5);
  add('chains-num', num({
    stem: 'An IgM molecule is a pentamer of five basic antibody units. How many polypeptide chains (heavy and light together) does one IgM molecule contain?',
    value: c.total,
    sol: r`Each unit is $\mathrm{H_{2}L_{2}}$ = 4 chains; $5 \times 4 = ${c.total}$.`,
    scheme: [[`${c.total}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 20 || 'value');
}
add('mast-ar', ar({
  a: 'IgD is found on the surface of B-lymphocytes.',
  r: 'IgE binds to mast cells and basophils.',
  key: 'b',
  sol: 'Both are true, but the binding of IgE to mast cells does not explain where IgD is found; IgD acts as an antigen receptor on B-cells — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('iga-fill', fill({
  stem: 'The antibody class found in colostrum, saliva, tears and mucus is Ig______.',
  acc: [['A']],
  sol: 'IgA.',
  d: 1, c: 'recall', t: [3],
}));
add('ig-short', short({
  marks: 2,
  stem: 'Draw or describe the structure of an antibody molecule, naming its chains and bonds.',
  model: 'An antibody is a **Y-shaped** molecule of **four polypeptide chains**: **two heavy** chains forming the stem and inner arms and **two light** chains on the outer arms (**H₂L₂**), held together by **disulfide bonds**. The tips of the two arms are **antigen-binding sites**.',
  sol: 'H₂L₂ with disulfide bonds.',
  scheme: [['Two heavy and two light chains', 1], ['Disulfide bonds and binding sites', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('antibodyclass-short', short({
  marks: 3,
  stem: 'Name the antibody class most involved in each case and give a reason: (i) a newborn protected by its mother’s antibodies before birth; (ii) a breast-fed baby protected in the gut; (iii) a person who sneezes when exposed to pollen.',
  model: '(i) **IgG** — the most abundant antibody in the mother’s blood and the only class that **crosses the placenta**, so the foetus is born with ready-made protection. (ii) **IgA** — secreted into **colostrum** and breast milk, it coats and protects the **lining of the baby’s gut** against microbes. (iii) **IgE** — made against the pollen allergen, it binds **mast cells**, which release **histamine** and cause the **allergic** sneezing.',
  sol: 'IgG, IgA, IgE.',
  scheme: [['(i) IgG with reason', 1], ['(ii) IgA with reason', 1], ['(iii) IgE with reason', 1]],
  d: 3, c: 'application', t: [3],
}));
add('antibody-long', long({
  stem: '(a) Draw a labelled diagram of an antibody molecule. [2]\n(b) State the occurrence and function of IgG, IgA, IgM, IgD and IgE. [2]\n(c) What is autoimmunity? Give one example. [1]',
  model: '(a) **Diagram:** a **Y-shaped** molecule with **two heavy chains** and **two light chains**, **disulfide bonds** between chains, and **antigen-binding sites** at the tips of the arms.\n\n(b) **IgG** — most abundant in serum; **crosses the placenta**. **IgA** — in **secretions and colostrum**; protects surfaces. **IgM** — **pentamer**; **first** in the primary response. **IgD** — on **B-cell surfaces**; antigen receptor. **IgE** — on **mast cells**; **allergy** and worm infections.\n\n(c) **Autoimmunity** is an immune attack on the body’s **own cells**, for example **rheumatoid arthritis**.',
  sol: 'Diagram; classes; autoimmunity.',
  scheme: [['(a) Labelled antibody', 2], ['(b) Five classes', 2], ['(c) Definition and example', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [3],
  assets: [antibodyFig],
}));

// ---------------------------------------------------------------- t04 AIDS
add('hivcell-mcq', mcq({
  stem: 'The number of which cells falls progressively in a person infected with HIV?',
  right: 'Helper T-lymphocytes',
  wrong: ['Red blood cells', 'Platelets', 'Mast cells'],
  sol: 'HIV destroys helper T-cells, weakening the immune response — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('rt-hiv-mcq', mcq({
  stem: 'Which enzyme does HIV use to make a DNA copy of its RNA genome inside a host cell?',
  right: 'Reverse transcriptase',
  wrong: ['RNA polymerase', 'DNA ligase', 'Restriction endonuclease'],
  sol: 'HIV is a retrovirus; reverse transcriptase makes DNA from RNA — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('macrophage-mcq', mcq({
  stem: 'Why are macrophages described as an “HIV factory” in an infected person?',
  right: 'They keep producing new virus particles without being destroyed quickly.',
  wrong: ['They make reverse transcriptase for the body.', 'They produce antibodies against HIV.', 'They destroy all HIV particles they meet.'],
  sol: 'Infected macrophages continue to release virus, unlike helper T-cells, which are killed — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('opportunistic-mcq', mcq({
  stem: 'A man with advanced HIV infection develops tuberculosis and a fungal infection of the mouth, which healthy people resist. These are best described as',
  right: 'opportunistic infections due to loss of helper T-cells',
  wrong: ['autoimmune diseases', 'allergic reactions', 'side effects of the ELISA test'],
  sol: 'Weakened immunity lets normally controlled microbes cause disease — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('hivtouch-ar', ar({
  a: 'HIV can be transmitted through transfusion of contaminated blood.',
  r: 'HIV spreads easily by shaking hands and sharing food with an infected person.',
  key: 'c',
  sol: 'A is true; R is false: HIV does not spread by touch or sharing food — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('elisa-fill', fill({
  stem: 'The test used to detect antibodies against HIV is ELISA, which stands for Enzyme-Linked ______ Assay.',
  acc: [['Immunosorbent', 'Immuno-sorbent']],
  sol: 'Enzyme-Linked Immunosorbent Assay.',
  d: 1, c: 'recall', t: [4],
}));
add('stigma-short', short({
  marks: 1,
  stem: 'Give a reason: there is no risk in shaking hands with or hugging a person living with HIV.',
  model: 'HIV is **not spread by touch**; it passes only through **sexual contact, blood, shared needles** or from **mother to child**.',
  sol: 'Not spread by contact.',
  scheme: [['Not spread by touch; correct routes', 1]],
  d: 2, c: 'application', t: [4],
}));
{
  const neg = [0.06, 0.1];
  const res = elisa([0.21, 0.65], neg);
  add('elisa-num', num({
    stem: 'In an ELISA for HIV antibodies, two negative controls give absorbances of 0.06 and 0.10. The cut-off is 3 times their mean. What is the cut-off value?',
    value: res.cutoff, tol: 0.001,
    sol: r`Mean $= \dfrac{0.06 + 0.10}{2} = 0.08$; cut-off $= 3 \times 0.08 = ${res.cutoff}$.`,
    scheme: [[`${res.cutoff}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => Math.abs(q.answer.value - 0.24) < 1e-9 || 'cutoff');
}
add('aidsspread-short', short({
  marks: 2,
  stem: 'A nurse, a regular blood donor, a person who shares needles to inject drugs, and a classmate of an HIV-positive student are discussed in a health class. Which of them are at real risk of HIV infection, and why?',
  model: 'The **drug user who shares needles** is at real risk, since infected **blood** passes on the needle. The **nurse** is at risk only through **needle-stick injuries** or contact with infected blood. A **blood donor** using sterile equipment and the **classmate** are **not at risk**, because HIV does **not spread by touch** or ordinary contact.',
  sol: 'Blood contact is the risk.',
  scheme: [['Needle sharer (and nurse via blood) at risk', 1], ['Donor and classmate not at risk, with reason', 1]],
  d: 3, c: 'application', t: [4],
}));
add('hivrep-short', short({
  marks: 3,
  stem: 'Describe how HIV multiplies after entering the human body.',
  model: 'HIV first enters **macrophages**. Its **RNA genome** is copied into **viral DNA** by **reverse transcriptase**. The viral DNA is **integrated into the host cell’s DNA** and directs the cell to make new virus particles; the macrophage keeps producing virus (an **HIV factory**). HIV also enters **helper T-lymphocytes**, replicates, and its progeny attack more helper T-cells, whose **number falls progressively**.',
  sol: 'Macrophages, RT, integration, T-cells.',
  scheme: [['Reverse transcriptase makes viral DNA', 1], ['Integration; macrophage as factory', 1], ['Helper T-cells infected and reduced', 1]],
  d: 2, c: 'understanding', t: [4],
}));
{
  const neg = [0.07, 0.09];
  const s = [0.11, 1.32, 0.95];
  const res = elisa(s, neg);
  add('elisa-short', short({
    marks: 3,
    stem: `State the principle of ELISA for diagnosing HIV infection. In one test the negative controls read ${neg.join(' and ')}, the cut-off is 3 × their mean, and three samples read ${s.join(', ')}. Which samples are positive?`,
    model: `ELISA is based on **antigen–antibody interaction**: HIV antigens fixed in a well bind **antibodies** in the patient’s serum, and an **enzyme-linked** second antibody produces a **colour**; more colour means more antibody. Cut-off = 3 × ${Math.round(((neg[0] + neg[1]) / 2) * 1000) / 1000} = **${res.cutoff}**. Samples **${s.filter((_, i) => res.positive[i]).join(' and ')}** exceed it and are **positive**; ${s.filter((_, i) => !res.positive[i]).join(', ')} is **negative**.`,
    sol: 'Principle; cut-off; positives.',
    scheme: [['Antigen–antibody with enzyme colour', 1], [`Cut-off ${res.cutoff}`, 1], ['Correct positives', 1]],
    d: 3, c: 'application', t: [4],
  }), () => (res.cutoff === 0.24 && res.positive.join() === 'false,true,true') || 'elisa');
}
add('prevention-short', short({
  marks: 3,
  stem: 'Suggest three measures a state health department should take to reduce the spread of HIV, and explain how each breaks a route of transmission.',
  model: '(i) **Screen all donated blood** in blood banks — prevents spread by **transfusion**. (ii) Ensure **disposable needles and syringes** in clinics and needle-exchange for drug users — prevents spread through **shared needles**. (iii) **Awareness campaigns** and **free distribution of condoms** — reduce **sexual transmission**; regular testing of high-risk groups and of pregnant women also reduces **mother-to-child** spread.',
  sol: 'Three measures.',
  scheme: [['Blood screening', 1], ['Disposable needles', 1], ['Safe sex and awareness', 1]],
  d: 3, c: 'application', t: [4],
}));
add('aids-long', long({
  stem: '(a) Expand AIDS and name its causative agent. List three ways in which it is transmitted. [2]\n(b) Explain why a person with AIDS falls ill with infections that healthy people resist. [2]\n(c) Name the test used to diagnose HIV infection. [1]',
  model: '(a) **Acquired Immuno Deficiency Syndrome**, caused by **HIV**, a **retrovirus**. It spreads by **sexual contact** with an infected person, **transfusion of contaminated blood**, **sharing infected needles**, and from **mother to child** through the placenta.\n\n(b) HIV multiplies in **helper T-lymphocytes** and destroys them, so their **number falls**. Helper T-cells coordinate both **humoral** and **cell-mediated** responses, so immunity **weakens**, and **opportunistic infections** (such as tuberculosis, fungal and Toxoplasma infections) take hold.\n\n(c) **ELISA** (Enzyme-Linked Immunosorbent Assay).',
  sol: 'AIDS; immune collapse; ELISA.',
  scheme: [['(a) Expansion, HIV', 1], ['(a) Three routes', 1], ['(b) Helper T-cells destroyed', 1], ['(b) Opportunistic infections', 1], ['(c) ELISA', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 alcohol, smoking and drugs
add('poppy-mcq', mcq({
  stem: 'Morphine, from which heroin is made, is extracted from the latex of',
  right: 'the poppy plant, Papaver somniferum',
  wrong: ['the coca plant, Erythroxylum coca', 'Cannabis sativa', 'Datura'],
  sol: 'Morphine is obtained from poppy latex; heroin is diacetylmorphine — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('cocaine-mcq', mcq({
  stem: 'Cocaine produces euphoria and a feeling of increased energy mainly by',
  right: 'interfering with the transport of the neurotransmitter dopamine',
  wrong: ['binding opioid receptors in the gut', 'stimulating release of IgE', 'blocking cannabinoid receptors'],
  sol: 'Cocaine affects dopamine transport and stimulates the CNS — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('cannabis-mcq', mcq({
  stem: 'Marijuana, hashish, charas and ganja are all obtained from',
  right: 'the inflorescences of Cannabis sativa',
  wrong: ['the latex of the poppy', 'the leaves of the coca plant', 'tobacco leaves'],
  sol: 'These cannabinoids come from Cannabis sativa — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('nicotine-mcq', mcq({
  stem: 'A heavy smoker is found to have high blood pressure and a fast heart rate. Which action of nicotine best explains this?',
  right: 'It stimulates the adrenal gland to release adrenaline and noradrenaline.',
  wrong: ['It makes mast cells release histamine.', 'It destroys helper T-cells.', 'It blocks dopamine transport like cocaine.'],
  sol: 'Nicotine causes release of adrenaline and noradrenaline — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('barbiturate-mcq', mcq({
  stem: 'Which group of drugs, normally prescribed for insomnia and depression, is often abused?',
  right: 'Barbiturates and benzodiazepines',
  wrong: ['Antibiotics', 'Antivenoms', 'Anti-retroviral drugs'],
  sol: 'Sedative medicines such as barbiturates are misused — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('withdrawal-mcq', mcq({
  stem: 'A person dependent on alcohol stops drinking suddenly and becomes anxious, shaky and nauseous and starts sweating. This condition is called',
  right: 'withdrawal syndrome',
  wrong: ['autoimmunity', 'an allergic reaction', 'an opportunistic infection'],
  sol: 'These are withdrawal symptoms of dependence — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('alcohol-mcq', mcq({
  stem: 'A man who has drunk heavily for many years has a scarred, poorly working liver. The condition is most likely',
  right: 'cirrhosis of the liver',
  wrong: ['filariasis', 'emphysema', 'rheumatoid arthritis'],
  sol: 'Chronic alcohol use damages the liver, causing cirrhosis — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('co-ar', ar({
  a: 'Smoking reduces the amount of oxygen carried by the blood.',
  r: 'Carbon monoxide in tobacco smoke binds haemoglobin, leaving less haemoglobin to carry oxygen.',
  key: 'a',
  sol: 'Both are true, and binding of carbon monoxide to haemoglobin explains the reduced oxygen transport — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('cocaine-fill', fill({
  stem: 'Cocaine is obtained from the coca plant, Erythroxylum ______, native to South America.',
  acc: [['coca']],
  sol: 'Erythroxylum coca.',
  d: 1, c: 'recall', t: [5],
}));
{
  const py = packYears(30, 12);
  add('packyears-num', num({
    stem: 'Pack-years = (cigarettes per day ÷ 20) × years smoked. A woman smoked 30 cigarettes a day for 12 years. How many pack-years is this?',
    value: py,
    sol: r`$\dfrac{30}{20} \times 12 = 1.5 \times 12 = ${py}$ pack-years.`,
    scheme: [[`${py}`, 1]],
    d: 2, c: 'application', t: [5],
  }), (q) => q.answer.value === 18 || 'value');
}
add('drugsource-short', short({
  marks: 2,
  stem: 'Name the plant source of (i) heroin, (ii) cocaine, (iii) marijuana and (iv) nicotine.',
  model: '(i) **Heroin** — morphine from the latex of the **poppy, *Papaver somniferum***. (ii) **Cocaine** — the **coca plant, *Erythroxylum coca***. (iii) **Marijuana** — inflorescences of ***Cannabis sativa***. (iv) **Nicotine** — the **tobacco** plant (*Nicotiana*).',
  sol: 'Four sources.',
  scheme: [['Two sources', 1], ['Two more', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('addiction-short', short({
  marks: 2,
  stem: 'State two reasons why adolescents start using drugs or alcohol, and two danger signs parents should watch for.',
  model: '**Reasons:** **curiosity** and the wish for adventure or excitement; **peer pressure**; escape from **stress or failure**; the false idea that it is “**cool**”. **Danger signs:** **falling grades** or absence from school, **withdrawal** from family and friends, changes in **sleep and appetite**, and **loss of interest** in hobbies.',
  sol: 'Reasons and signs.',
  scheme: [['Two reasons', 1], ['Two danger signs', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('smoking-short', short({
  marks: 3,
  stem: 'A 45-year-old man who has smoked since college has a persistent cough, gets breathless climbing stairs, and has high blood pressure. Relate each problem to an effect of smoking.',
  model: '**Persistent cough** — smoke irritates and damages the airways, causing **bronchitis**. **Breathlessness** — smoking destroys the walls of **alveoli** (**emphysema**), and **carbon monoxide** binds haemoglobin, reducing oxygen supply. **High blood pressure** — **nicotine** stimulates the release of **adrenaline and noradrenaline**, raising **blood pressure and heart rate**.',
  sol: 'Three effects.',
  scheme: [['Cough: bronchitis', 1], ['Breathless: emphysema, CO', 1], ['BP: nicotine, adrenaline', 1]],
  d: 3, c: 'application', t: [5],
}));
add('drugs-short', short({
  marks: 3,
  stem: 'Compare opioids, cannabinoids and cocaine with respect to their source and their effect on the body.',
  model: '**Opioids** (heroin) — from **morphine** in the latex of the **poppy**; bind **opioid receptors** in the brain and gut; a **depressant** that slows body functions. **Cannabinoids** (marijuana, hashish) — from ***Cannabis sativa***; bind **cannabinoid receptors** in the brain and affect the **heart and circulation**. **Cocaine** — from the **coca plant**; interferes with **dopamine** transport; a **stimulant** causing euphoria and, in excess, **hallucinations**.',
  sol: 'Three drugs.',
  scheme: [['Opioids', 1], ['Cannabinoids', 1], ['Cocaine', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('drugs-long', long({
  stem: '(a) Name the source of heroin and explain why it is called a depressant. [1]\n(b) Describe two effects each of chronic alcohol use and of smoking. [2]\n(c) What is withdrawal syndrome? [1]\n(d) Suggest two ways in which schools can help prevent drug abuse among students. [1]',
  model: '(a) Heroin is made from **morphine** in the latex of the **poppy (*Papaver somniferum*)**; it **slows down body functions** by binding opioid receptors, so it is a **depressant**.\n\n(b) **Alcohol:** **liver cirrhosis**; damage to the **nervous system**; harm to the **foetus** in pregnancy. **Smoking:** **lung and throat cancer**, **bronchitis and emphysema**, **raised blood pressure** from nicotine, **less oxygen** carried because of carbon monoxide.\n\n(c) Unpleasant symptoms — **anxiety, shakiness, nausea, sweating** — when a dependent person **stops** a drug **abruptly**.\n\n(d) **Education and counselling** about the effects; **reducing peer pressure** through activities and mentors; teachers watching for **danger signs** and referring students for **help**.',
  sol: 'Heroin; effects; withdrawal; prevention.',
  scheme: [['(a) Source and depressant', 1], ['(b) Alcohol effects', 1], ['(b) Smoking effects', 1], ['(c) Withdrawal', 1], ['(d) Two school measures', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const T = [[0, 2], [7, 18], [14, 34], [28, 20], [42, 6], [49, 120], [56, 210]];
  const peak1 = Math.max(...T.filter(([d]) => d < 42).map(([, v]) => v));
  const peak2 = Math.max(...T.filter(([d]) => d >= 42).map(([, v]) => v));
  const fold = Math.round((peak2 / peak1) * 10) / 10;
  add('booster-case', mk.case({
    passage: `A volunteer received a first dose of a tetanus vaccine on day 0 and a booster on day 42. Antibody levels (arbitrary units) were measured:\n\n| Day | ${T.map(([d]) => d).join(' | ')} |\n|${T.map(() => '---|').join('')}---|\n| Antibody level | ${T.map(([, v]) => v).join(' | ')} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'By how many times is the highest level after the booster greater than the highest level after the first dose? (One decimal place.)',
        value: fold, tol: 0.05,
        sol: r`$\dfrac{${peak2}}{${peak1}} = ${fold}$.`,
        scheme: [[`${fold}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Why did antibody levels rise so much faster after the booster?',
        right: 'Memory cells formed after the first dose responded quickly.',
        wrong: ['The booster contained ready-made antibodies.', 'The volunteer caught tetanus between doses.', 'Innate barriers were removed by the first dose.'],
        sol: 'The secondary response depends on memory B and T cells — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'If this volunteer later steps on a rusty nail, why is he unlikely to develop tetanus?',
        model: 'He has **memory cells** against the tetanus antigen, so any toxin or bacteria entering the wound trigger a **rapid, strong secondary response**; **antibodies** neutralise the toxin **before** it can cause disease.',
        sol: 'Secondary response.',
        scheme: [['Memory cells present', 1], ['Rapid antibody response neutralises toxin', 1]],
        d: 3, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'An unvaccinated person with the same wound is given anti-tetanus serum. How does his protection differ from the volunteer’s?',
          model: 'The serum gives **passive immunity**: ready-made antibodies act **at once** but **do not last** and leave **no memory**. The volunteer has **active immunity** with **memory**, which lasts for years.',
          sol: 'Passive vs active.',
          scheme: [['Serum: immediate, short-lived, no memory', 1], ['Volunteer: long-lasting with memory', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 6.2 || 'value');
}
{
  const S = { surveyed: 400, tried: 64, peer: 40 };
  const p = pct(S.tried, S.surveyed), pp = pct(S.peer, S.tried);
  add('survey-case', mk.case({
    passage: `A school counsellor surveyed ${S.surveyed} students of classes 11 and 12 anonymously. ${S.tried} said they had tried tobacco, alcohol or another drug; of these, ${S.peer} said friends had persuaded them, and the rest gave curiosity or stress as the reason.`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What percentage of the students surveyed had tried a substance?',
        value: p, unit: '%',
        sol: r`$\dfrac{${S.tried}}{${S.surveyed}} \times 100 = ${p}$ percent.`,
        scheme: [[`${p}`, 1]],
        d: 2, c: 'application', t: [5],
      })),
      part('b', mcq({
        stem: `Among those who had tried a substance, ${pp} percent named friends as the reason. Which preventive measure does this result most support?`,
        right: 'Programmes that help students resist undue peer pressure',
        wrong: ['Giving antibiotics to all students', 'Testing every student by ELISA', 'Vaccinating students against nicotine'],
        sol: 'Peer pressure was the commonest reason given — option (@K).',
        d: 3, c: 'analysis', t: [5],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why was it important that the survey was anonymous?',
        model: 'Students would fear **punishment or shame** and might **hide** their use if named, giving **under-reporting**. Anonymity makes **honest answers** more likely, so the results are **more reliable** for planning help.',
        sol: 'Honest answers.',
        scheme: [['Fear of exposure leads to hiding', 1], ['Anonymity gives reliable data', 1]],
        d: 3, c: 'analysis', t: [5],
      }), [
        short({
          marks: 2,
          stem: 'Suggest two ways the counsellor can help the students who tried substances because of stress.',
          model: 'Offer **individual counselling** and teach healthy ways to **manage stress** (sport, hobbies, relaxation). Involve **parents and teachers** to reduce **academic pressure**, and refer anyone showing **dependence** to **medical or de-addiction** help.',
          sol: 'Counselling and support.',
          scheme: [['Counselling and stress management', 1], ['Family or professional support', 1]],
          d: 2, c: 'application', t: [5],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 16 || 'value');
}
