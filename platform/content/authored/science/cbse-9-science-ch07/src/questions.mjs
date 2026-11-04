// ch07 Structure of an Atom — question bank. MCQ keys are placed by the builder (balanced).
// AR keys planned: alpha a, valency b, neutral c, bohr d, cobalt a, avg c.
// Every numerical and every distribution or count is computed (data.mjs), interpolated into stem and solution, and re-solved.
import { mk, add, r, near, dec } from './lib.mjs';
import { ELEMENTS, bySym, byZ, dist, valency, outer, count, total, avgMass } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const iso = (z, a, sym, chg = '') => `$^{${a}}_{${z}}\\text{${sym}}${chg ? `^{${chg}}` : ''}$`;
const dz = (z) => dist(z);

// ---------------------------------------------------------------- t01 particles and models
add('chk-cathode', mcq({
  stem: 'In a discharge tube, a glowing beam passes between two charged metal plates and is pulled towards the plate that carries a positive charge. This shows that the beam:',
  right: 'is made of negatively charged particles',
  wrong: ['is made of positively charged particles', 'is made of particles with no charge', 'is a beam of light, which charges cannot bend'],
  sol: 'Unlike charges attract. A beam pulled towards the positive plate must carry negative charge, so these particles (electrons) are negative — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chk-ruth', mcq({
  stem: 'Alpha particles are fired at a thin metal foil. A tiny number come straight back, although almost all the others pass through. This is best explained by saying that:',
  right: 'the positive charge and most of the mass of an atom are packed into a very small nucleus',
  wrong: ['the atom is a solid sphere with charges spread evenly through it', 'electrons in the atom are heavier than the alpha particles', 'the foil is too thick for alpha particles to pass through'],
  sol: 'Only a head-on meeting with a tiny, heavy, positive nucleus can turn a fast alpha particle back. Option (@K) states this. A solid evenly charged sphere would not turn back any alpha particle.',
  d: 3, c: 'analysis', t: [1],
}));
add('chk-bohr', mcq({
  stem: 'Rutherford\'s model failed because an electron circling the nucleus should lose energy and fall in. Which idea of Bohr removes this objection?',
  right: 'An electron in a fixed shell does not radiate energy',
  wrong: ['The nucleus is made of protons and neutrons', 'Electrons are embedded in a positive sphere', 'Alpha particles can bounce back from a foil'],
  sol: 'If an electron radiates no energy while it stays in a shell, it has no reason to spiral inwards. This is Bohr\'s postulate, option (@K). The other statements belong to other models or experiments.',
  d: 2, c: 'understanding', t: [1],
}));
add('m-canal', mcq({
  stem: 'Goldstein used a cathode with holes in it. The rays that came out behind the cathode were called canal rays. These rays:',
  right: 'carry a positive charge and move in the direction opposite to cathode rays',
  wrong: ['carry a negative charge and move in the same direction as cathode rays', 'carry no charge and are not affected by a magnet or by plates', 'are a beam of electrons that have gained energy'],
  sol: 'Gas atoms in the tube lose electrons and become positive. The positive particles move towards the cathode, pass through the holes, and travel the opposite way to cathode rays — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('m-thomson', mcq({
  stem: 'A student draws the Thomson model of the atom. Which description of her drawing is correct?',
  right: 'A positive sphere with small negative electrons scattered inside it',
  wrong: ['A small positive centre with electrons moving in circles outside it', 'A large negative sphere with small positive protons inside it', 'A set of fixed shells with electrons that jump between them'],
  sol: 'Thomson\'s model has a positive sphere with electrons embedded in it, as in option (@K). Option (@1) is Rutherford\'s picture and option (@3) is Bohr\'s.',
  d: 1, c: 'recall', t: [1],
}));
add('m-neutron', mcq({
  stem: 'Chadwick found a new particle in the nucleus in 1932. Which property made it harder to find than the electron or the proton?',
  right: 'It has no electric charge, so plates and magnets do not deflect it',
  wrong: ['It is much lighter than an electron', 'It carries a negative charge of two units', 'It is found outside the nucleus'],
  sol: 'Charged particles can be bent by electric or magnetic fields and so are easier to trace. The neutron has no charge, which made it difficult to detect — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('m-mass', mcq({
  stem: 'A nitrogen atom has 7 protons, 7 neutrons and 7 electrons. Almost all of its mass is in the nucleus because:',
  right: 'an electron is about 1800 times lighter than a proton or a neutron',
  wrong: ['electrons have no mass at all', 'protons and neutrons are lighter than electrons', 'the electrons are held far outside the atom'],
  sol: 'Each electron has only about 1/1836 of the mass of a proton, so the 14 nucleons carry almost all the mass — option (@K). Electrons do have a very small mass, so option (@1) is wrong.',
  d: 2, c: 'application', t: [1],
}));
add('m-bohr-fall', mcq({
  stem: 'In Bohr\'s model, an electron in a sodium atom drops from the M shell to the L shell. During this change, the atom:',
  right: 'gives out energy',
  wrong: ['takes in energy', 'neither takes in nor gives out energy', 'loses a proton'],
  sol: 'A lower shell has less energy. An electron falling to it gives out the difference in energy — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-alpha', ar({
  a: 'In Rutherford\'s experiment, almost all the alpha particles passed through the gold foil without being deflected.',
  r: 'Most of the volume of a gold atom is empty space.',
  key: 'a',
  sol: 'A is true, and R is true. The empty space lets the particles pass straight through, so R explains A — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('ar-bohr', ar({
  a: 'In Bohr\'s model, an electron that moves in a shell keeps radiating energy and slowly falls into the nucleus.',
  r: 'An electron jumps to another shell when it absorbs or emits a fixed amount of energy.',
  key: 'd',
  sol: 'A is false: in Bohr\'s model an electron in a shell does not radiate energy. R is true: jumps between shells involve fixed amounts of energy — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('tf-nucleus', tf({
  stem: 'In Rutherford\'s model, the electrons are packed inside the nucleus with the protons.',
  key: 'f',
  sol: 'False. The nucleus holds the protons and neutrons; the electrons revolve outside it, in the empty space.',
  d: 1, c: 'recall', t: [1],
}));
add('tf-neutron', tf({
  stem: 'A neutron has nearly the same mass as a proton but carries no electric charge.',
  key: 't',
  sol: 'True. A neutron is neutral and has a mass of about 1 u, almost the same as that of a proton.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-nuc', fill({
  stem: 'The particle with no charge that was found in the nucleus by James Chadwick is the ___.',
  acc: [['neutron']],
  sol: 'Chadwick discovered the **neutron**.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-shell', fill({
  stem: 'In the Bohr model, the shell that lies closest to the nucleus is called the ___ shell.',
  acc: [['K', 'k']],
  sol: 'The shell with $n = 1$ is the **K** shell.',
  d: 1, c: 'recall', t: [1],
}));
add('s2-canal', short({
  marks: 2,
  stem: 'Why were the rays that appear behind the cathode of a tube with a perforated cathode called canal rays, and what charge do they carry?',
  model: 'The rays pass through holes, or canals, in the cathode, so they were named canal rays. They are made of positive particles, formed when gas atoms lose electrons, so they carry a positive charge and move opposite to cathode rays.',
  sol: 'Pass through canals (holes) in the cathode; positive charge.',
  scheme: [['Named because they pass through holes (canals) in the cathode', 1], ['Carry a positive charge', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-stable', short({
  marks: 2,
  stem: 'A student says that an electron moving around a nucleus must lose energy and fall into it. Which idea of Bohr answers her, and why do atoms last?',
  model: 'Bohr said that electrons move only in certain fixed shells and do not radiate energy while they stay in one. Because an electron in a shell loses no energy, it does not spiral into the nucleus, and the atom stays stable.',
  sol: 'Stationary shells without radiation; so the electron stays in its shell and the atom is stable.',
  scheme: [['Electrons move only in fixed shells and do not radiate energy there', 1], ['So they do not spiral inwards and the atom is stable', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-neutral', short({
  marks: 2,
  stem: 'A copper wire is made of atoms that contain protons and electrons, yet the wire does not shock you when it is not connected to a battery. Explain why a normal atom is neutral.',
  model: 'A normal atom has as many electrons as protons. Each electron carries the same amount of negative charge as a proton carries positive charge, so the charges cancel. Neutrons carry no charge, so the atom as a whole has no net charge.',
  sol: 'Equal numbers of protons and electrons; equal and opposite charges cancel.',
  scheme: [['Number of protons equals the number of electrons', 1], ['Equal and opposite charges cancel, and neutrons have no charge', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-thomson', short({
  marks: 3,
  stem: 'Describe the Thomson model of the atom. Name one observation that this model could not explain.',
  model: 'Thomson pictured the atom as a sphere of positive charge spread evenly through it, with electrons embedded in it like plums in a pudding. The total positive and negative charges are equal, so the atom is neutral. The model could not explain why a very few alpha particles bounce back from a thin gold foil, as no concentrated positive centre exists in it.',
  sol: 'Positive sphere with embedded electrons; neutral; fails to explain rebounding alpha particles.',
  scheme: [['Positive sphere with electrons embedded in it', 1], ['Equal positive and negative charge, so neutral', 1], ['It could not explain alpha particles bouncing back from a gold foil', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('l-ruth', long({
  stem: '(a) Describe how Rutherford carried out his alpha-particle scattering experiment.\n\n(b) Give three observations and the conclusion drawn from each.\n\n(c) State one limitation of the model he proposed.',
  model: 'Rutherford directed a narrow beam of fast, positive alpha particles at a very thin gold foil and used a screen around it to see where they went. Most particles passed straight through, so most of the atom is empty space. A few were deflected through small angles, so the positive charge is concentrated in a small region. Very few, roughly one in many thousands, bounced back, so this region, the nucleus, is tiny, dense and holds nearly all the mass. His model could not explain why an electron circling the nucleus does not lose energy and spiral into it.',
  sol: 'Set-up; three observation-conclusion pairs; instability of the electron orbit.',
  scheme: [['(a) Alpha beam at thin gold foil, observed on a screen', 1.5], ['(b) Three observations with matching conclusions', 2.5], ['(c) Revolving electron should lose energy and fall in', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('l-bohr', long({
  stem: '(a) State the postulates of Bohr\'s model of the atom.\n\n(b) Explain how the model removes the main difficulty of Rutherford\'s model.\n\n(c) What happens to the energy of an atom when an electron jumps to a shell farther from the nucleus?',
  model: 'Bohr proposed that electrons revolve only in certain fixed paths called shells (K, L, M, N), each with a fixed energy, and that an electron does not radiate energy while it stays in its shell. Rutherford\'s electron should have lost energy and spiralled into the nucleus. Since an electron in a shell does not lose energy, it stays in its shell and the atom is stable. If an electron jumps to a shell farther away, which has higher energy, it must absorb energy, so the atom gains energy. When it falls back it emits the same amount.',
  sol: 'Fixed shells with fixed energy and no radiation; stability explained; absorbing energy to move out.',
  scheme: [['(a) Fixed shells with fixed energy; no radiation in a shell', 2], ['(b) No energy loss, so no spiral and the atom is stable', 1.5], ['(c) Energy is absorbed for a jump outwards', 1.5]],
  d: 3, c: 'understanding', t: [1],
}));
add('l-particles', long({
  stem: '(a) Name the three subatomic particles and give the charge and location of each.\n\n(b) Describe how the electron was found with a discharge tube.\n\n(c) Why is the neutron the last of the three to be discovered?',
  model: 'The electron has a negative charge and moves outside the nucleus. The proton is positive and the neutron is neutral, and both lie in the nucleus. In a low-pressure discharge tube a beam leaves the cathode, and Thomson found that it bends towards a positive plate, so it is made of negative particles, the electrons, that are the same for every gas. The neutron has no charge, so electric and magnetic fields do not deflect it, which made it hard to detect until Chadwick found it in 1932.',
  sol: 'Charges and locations; cathode ray bending; neutral so hard to detect.',
  scheme: [['(a) Three particles with charge and location', 2], ['(b) Cathode ray bends towards the positive plate, so negative', 2], ['(c) No charge, so not deflected and hard to detect', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('case-gold', mk.case({
  passage: r`In a classroom simulation of Rutherford's experiment, a screen records where 10 000 alpha particles land after they cross a thin foil. The counts are given for practice.

| Where the particle goes | Number of particles |
|---|---|
| Straight on, within 5° of the beam | 9 991 |
| Turned by 5° to 90° | 8 |
| Turned back by more than 90° | 1 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The count for particles turned by 5° to 90°, compared with those that went straight on, suggests that:',
      right: 'only a few particles passed close enough to the positive charge to be turned',
      wrong: ['all the particles were stopped by electrons', 'the foil has no positive charge', 'the particles hit a large solid sphere'],
      sol: 'Only 9 of 10 000 particles were turned at all, so very few passed near the concentrated positive charge — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'What fraction of the particles turned back by more than 90°?',
      model: r`1 out of 10 000, that is $\dfrac{1}{10\,000}$.`,
      sol: 'Fraction = 1/10 000.',
      scheme: [['1 in 10 000', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'What do the 9 991 particles that went straight on tell us about the structure of an atom?',
      model: 'Almost all the particles went through without being turned, so most of the space inside an atom must be empty. The charge that can turn them must be packed into a very small region.',
      sol: 'Mostly empty space; positive charge in a tiny region.',
      scheme: [['Most of the atom is empty space', 1], ['The turning charge is concentrated in a very small region', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Which part of the atom is responsible for turning back the single particle, and what two properties must it have?',
        model: 'The nucleus turns the particle back. It must be positively charged, to repel the positive alpha particle, and very dense and heavy, so that it can reverse the motion of a fast particle.',
        sol: 'Nucleus; positive and dense.',
        scheme: [['The nucleus', 1], ['Positive charge and high density (heavy)', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t02 electron distribution and valency
add('chk-fill', mcq({
  stem: `Chlorine has ${bySym('Cl').z} electrons in a neutral atom. Its distribution in the K, L and M shells is:`,
  right: dz(17).replace(/, /g, ', '),
  wrong: ['2, 8, 6', '2, 8, 8', '2, 7, 8'],
  sol: r`K takes 2 and L takes 8, which leaves $17 - 10 = 7$ for the M shell. The distribution is 2, 8, 7 — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => dz(17) === '2, 8, 7' || 'Cl');
add('m-dist', mcq({
  stem: `A silicon atom has ${bySym('Si').z} electrons. Which distribution is correct for it?`,
  right: dz(14),
  wrong: ['2, 8, 3', '2, 6, 6', '2, 12'],
  sol: r`K 2 and L 8 use 10 electrons, so the other $14 - 10 = 4$ go to the M shell: 2, 8, 4 — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => dz(14) === '2, 8, 4' || 'Si');
add('m-valency', mcq({
  stem: `Fluorine has atomic number ${bySym('F').z}. Its valency, found from the outer electrons, is:`,
  right: String(valency(9)),
  wrong: ['7', '9', '2'],
  sol: r`The distribution is ${dz(9)}, so there are ${outer(9)} outer electrons. For 5 to 7 outer electrons the valency is $8 - ${outer(9)} = ${valency(9)}$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => valency(9) === 1 && outer(9) === 7 || 'F');
add('m-inert', mcq({
  stem: 'Four elements have atomic numbers 16, 17, 18 and 19. Which one is chemically inert because of its outer shell?',
  right: 'The element with atomic number 18, which has 8 electrons in its outer shell',
  wrong: ['The element with atomic number 17, which has 7 electrons in its outer shell', 'The element with atomic number 19, which has 1 electron in its outer shell', 'The element with atomic number 16, which has 6 electrons in its outer shell'],
  sol: r`Distributions: 16 gives ${dz(16)}, 17 gives ${dz(17)}, 18 gives ${dz(18)} and 19 gives ${dz(19)}. Only 18 has a full outer shell of 8, so its valency is 0 — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => [16, 17, 18, 19].map(valency).join('') === '2101' || 'valencies');
add('ar-valency', ar({
  a: 'Sodium has a valency of 1.',
  r: 'A sodium atom has atomic number 11.',
  key: 'b',
  sol: 'A is true: the distribution is 2, 8, 1, so there is one outer electron. R is also true, but atomic number alone does not explain the valency; the single outer electron does — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('fill-val', fill({
  stem: 'An atom that has the electron distribution 2, 8, 3 has a valency of ___.',
  acc: [['3', 'three']],
  sol: 'There are 3 outer electrons, so the valency is **3**.',
  d: 1, c: 'application', t: [2],
}));
add('match-dist', (() => {
  const zs = [4, 14, 16, 18];
  return match({
    stem: 'Match each atom (Column A) with its electron distribution (Column B).',
    pairs: zs.map((z) => [`${byZ(z).name} (atomic number ${z})`, dz(z).replace(/, /g, ',')]),
    order: [2, 0, 3, 1],
    sol: zs.map((z) => `${byZ(z).name} is ${dz(z)}`).join('; ') + '.',
    d: 2, c: 'application', t: [2],
  });
})(), (q) => q.match_right.length === 4 || 'match-dist');
add('s2-valence', short({
  marks: 2,
  stem: 'Magnesium has atomic number 12. Write its electron distribution and explain why its valency is 2 and not 6.',
  model: `Magnesium has the distribution ${dz(12)}, so it has 2 electrons in its outer shell. With 1 to 4 outer electrons, the valency is the number of outer electrons, so the valency is 2. The subtraction from 8 is used only when there are 5 to 7 outer electrons.`,
  sol: 'Distribution 2, 8, 2; two outer electrons, so valency 2.',
  scheme: [['Distribution 2, 8, 2 with 2 outer electrons', 1], ['With 4 or fewer outer electrons valency equals their number', 1]],
  d: 2, c: 'application', t: [2],
}), () => dz(12) === '2, 8, 2' && valency(12) === 2 || 'Mg');
add('s3-shells', short({
  marks: 3,
  stem: 'State the rules for filling electrons into the shells of the first 20 elements, and write the distribution of calcium.',
  model: `Electrons go into the shell nearest the nucleus first. The K shell takes 2 and the L shell takes 8, and the M shell takes up to 8, with any further electrons going to the N shell. The outermost shell never holds more than 8. Calcium has 20 electrons, so its distribution is ${dz(20)}.`,
  sol: 'Nearest shell first; K 2, L 8, M up to 8, then N; calcium 2, 8, 8, 2.',
  scheme: [['Nearest shell is filled first; outer shell has at most 8', 1], ['K 2, L 8, M up to 8, then N', 1], ['Calcium: 2, 8, 8, 2', 1]],
  d: 2, c: 'application', t: [2],
}), () => dz(20) === '2, 8, 8, 2' || 'Ca');
add('l-dist', (() => {
  const zs = [12, 16, 18, 20];
  return long({
    stem: `(a) Write the electron distribution and valency of the elements with atomic numbers ${zs.join(', ')}.\n\n(b) Explain why the valency of the element with atomic number 18 is zero.`,
    model: `Atomic number ${zs[0]} has ${dz(zs[0])} and valency ${valency(zs[0])}; atomic number ${zs[1]} has ${dz(zs[1])} and valency ${valency(zs[1])}, found from 8 minus 6; atomic number ${zs[2]} has ${dz(zs[2])} and valency ${valency(zs[2])}; and atomic number ${zs[3]} has ${dz(zs[3])} and valency ${valency(zs[3])}. In (b), the element with atomic number 18, argon, has 8 electrons in its outer shell, a full shell. An atom with a full outer shell has no need to gain, lose or share electrons, so it does not combine and its valency is zero.`,
    sol: 'Distributions and valencies computed from the rules; argon has a full outer shell, so valency 0.',
    scheme: [['(a) Four correct distributions', 2], ['(a) Four correct valencies with reasoning', 1.5], ['(b) Full outer shell, no combining, valency 0', 1.5]],
    d: 3, c: 'application', t: [2],
  });
})(), (q) => [12, 16, 18, 20].map(valency).join(',') === '2,2,0,2' && dz(18) === '2, 8, 8' || 'l-dist');
add('case-elements', (() => {
  const t = [[7, 14, 'A'], [12, 24, 'B'], [14, 28, 'C'], [18, 40, 'D']];
  const row = ([z, a, n]) => `| ${n} | ${z} | ${a} |`;
  return mk.case({
    passage: r`A school laboratory has four unlabelled samples. The atomic number and mass number of the atoms in each are given. The letters are not the symbols of the elements.

| Element | Atomic number | Mass number |
|---|---|---|
${t.map(row).join('\n')}`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which element is chemically inert?',
        right: 'D',
        wrong: ['A', 'B', 'C'],
        sol: r`The distributions are A ${dz(7)}, B ${dz(12)}, C ${dz(14)} and D ${dz(18)}. Only D has a full outer shell of 8 electrons, so it is inert — option (@K).`,
        d: 2, c: 'application', t: [2],
      })),
      part('b', short({
        marks: 1, wl: null,
        stem: 'State the number of outer electrons in element C and its valency.',
        model: `Distribution ${dz(14)}; 4 outer electrons and valency 4.`,
        sol: 'C has 4 outer electrons, so its valency is 4.',
        scheme: [['4 outer electrons and valency 4', 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2, wl: null,
        stem: 'Find the number of neutrons in the atoms of elements A and B.',
        model: r`A: $14 - 7 = 7$ neutrons. B: $24 - 12 = 12$ neutrons.`,
        sol: 'Neutrons = A − Z: element A has 7, element B has 12.',
        scheme: [['A: 14 − 7 = 7', 1], ['B: 24 − 12 = 12', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2, wl: null,
          stem: 'Element B forms a positive ion by losing electrons. Give the number of electrons lost and the distribution of the ion.',
          model: `B has the distribution ${dz(12)}. Losing its 2 outer electrons leaves the distribution 2, 8, so the ion has 10 electrons and a charge of 2+.`,
          sol: 'Loses 2 electrons; ion distribution 2, 8.',
          scheme: [['2 electrons are lost', 1], ['Ion has the distribution 2, 8', 1]],
          d: 3, c: 'analysis', t: [3],
        }),
      ]),
    ],
  });
})(), null);

// ---------------------------------------------------------------- t03 atomic number, mass number, ions, isotopes, isobars
add('chk-ion', mcq({
  stem: 'Which of these ions has the same number of electrons as an atom of neon (atomic number 10)?',
  right: 'The fluoride ion, which is a fluorine atom (atomic number 9) with one extra electron',
  wrong: ['The chloride ion, which is a chlorine atom (atomic number 17) with one extra electron', 'The potassium ion, which is a potassium atom (atomic number 19) that has lost one electron', 'The sodium atom, with atomic number 11'],
  sol: r`Neon has 10 electrons. The fluoride ion has $9 + 1 = 10$ electrons. The chloride ion has $17 + 1 = 18$, the potassium ion has $19 - 1 = 18$, and the sodium atom has 11 — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => 9 + 1 === 10 && 17 + 1 === 18 && 19 - 1 === 18 || 'ions');
add('chk-use', mcq({
  stem: 'A museum wants to estimate the age of a wooden figure found at an old site. Which isotope would help most?',
  right: 'Carbon-14',
  wrong: ['Cobalt-60', 'Iodine-131', 'Uranium-235'],
  sol: 'Carbon-14 is used for carbon dating of fossils and old wooden objects — option (@K). Cobalt-60 is used in cancer treatment, iodine-131 for the thyroid and uranium-235 as reactor fuel.',
  d: 1, c: 'application', t: [3],
}));
add('m-isopair', mcq({
  stem: 'Which pair of atoms are isotopes of the same element?',
  right: `${iso(8, 16, 'O')} and ${iso(8, 18, 'O')}`,
  wrong: [`${iso(26, 58, 'Fe')} and ${iso(28, 58, 'Ni')}`, `${iso(11, 24, 'Na')} and ${iso(12, 24, 'Mg')}`, `${iso(6, 12, 'C')} and ${iso(7, 14, 'N')}`],
  sol: 'Isotopes have the same atomic number (8 here) and different mass numbers (16 and 18) — option (@K). The other pairs differ in atomic number, so they are different elements.',
  d: 2, c: 'application', t: [3],
}));
add('m-isobar', mcq({
  stem: `${iso(26, 58, 'Fe')} and ${iso(28, 58, 'Ni')} are best described as:`,
  right: 'isobars, because they have the same mass number but different atomic numbers',
  wrong: ['isotopes, because they have the same mass number', 'isotopes, because they have different atomic numbers', 'isobars, because they have the same atomic number'],
  sol: 'The mass number is 58 for both, and the atomic numbers are 26 and 28. Same A with different Z means isobars — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('m-isoelec', mcq({
  stem: 'Atoms of hydrogen-1 and hydrogen-2 (deuterium) differ in:',
  right: 'the number of neutrons only',
  wrong: ['the number of protons only', 'the number of electrons only', 'the number of protons and electrons'],
  sol: 'Both have 1 proton and 1 electron. Hydrogen-1 has 0 neutrons and hydrogen-2 has 1 neutron — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('m-i131', mcq({
  stem: 'A patient at a hospital has a swollen thyroid gland (goitre). The doctor may use a radioactive isotope of:',
  right: 'iodine, as iodine-131',
  wrong: ['uranium, as uranium-235', 'cobalt, as cobalt-60', 'carbon, as carbon-14'],
  sol: 'Iodine-131 is used for diagnosis and treatment of thyroid disorders — option (@K). The other isotopes have different uses.',
  d: 2, c: 'application', t: [3],
}));
add('m-avg', mcq({
  stem: 'The atomic mass of chlorine is given as 35.5 u, although no chlorine atom has a mass of 35.5 u. This is because:',
  right: 'natural chlorine is a mixture of isotopes, and 35.5 u is their average mass',
  wrong: ['chlorine atoms contain half a neutron', 'each chlorine atom loses mass when it is weighed', 'chlorine atoms keep changing their atomic number'],
  sol: 'Natural chlorine contains atoms of mass number 35 and 37 in a fixed ratio. The weighted average of their masses is 35.5 u — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('m-ion-protons', mcq({
  stem: 'When a magnesium atom changes into a magnesium ion with a 2+ charge, the number of:',
  right: 'electrons falls by two and the number of protons stays the same',
  wrong: ['protons falls by two and the number of electrons stays the same', 'protons rises by two', 'neutrons falls by two'],
  sol: 'An atom changes into an ion only by losing or gaining electrons. A 2+ ion has lost 2 electrons, while the nucleus (protons and neutrons) is unchanged — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-neutral', ar({
  a: 'An atom of any element is electrically neutral.',
  r: 'Every atom contains an equal number of protons and neutrons.',
  key: 'c',
  sol: 'A is true: a normal atom has equal numbers of protons and electrons. R is false: the numbers of protons and neutrons are usually different, and neutrons carry no charge anyway — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-cobalt', ar({
  a: 'Cobalt-60 is used in hospitals to treat cancer.',
  r: 'Cobalt-60 is radioactive, and its radiation can destroy cancer cells.',
  key: 'a',
  sol: 'A is true and R is true. The radiation from cobalt-60 is the reason it can destroy cancer cells, so R explains A — option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-avg', ar({
  a: 'The average atomic mass of boron is 10.8 u.',
  r: 'Every boron atom in nature has a mass of exactly 10.8 u.',
  key: 'c',
  sol: 'A is true: boron-10 and boron-11 are mixed in nature, giving an average of 10.8 u. R is false: no single boron atom has this mass — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('tf-ion', tf({
  stem: 'When a calcium atom forms a Ca²⁺ ion, it loses two protons.',
  key: 'f',
  sol: 'False. It loses two electrons; the number of protons stays the same.',
  d: 2, c: 'understanding', t: [3],
}));
add('match-use', match({
  stem: 'A science exhibition shows four isotopes. Match each isotope (Column A) with its use (Column B).',
  pairs: [
    ['Cobalt-60', 'Treating cancer with radiation'],
    ['Iodine-131', 'Treating a disorder of the thyroid gland'],
    ['Uranium-235', 'Fuel in a nuclear power station'],
    ['Carbon-14', 'Finding the age of an ancient wooden object'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Cobalt-60 treats cancer, iodine-131 is used for the thyroid, uranium-235 is a reactor fuel, and carbon-14 dates old wood.',
  d: 1, c: 'recall', t: [3],
}));
add('s2-ion', short({
  marks: 2,
  stem: 'A sodium atom (atomic number 11, mass number 23) changes into a sodium ion with a 1+ charge. What happens to its protons, neutrons and electrons?',
  model: `The protons stay at 11 and the neutrons stay at ${23 - 11}, because the nucleus does not change. The atom loses one electron, so the number of electrons falls from 11 to 10, and the ion has a charge of 1+.`,
  sol: 'Protons 11 and neutrons 12 unchanged; electrons fall from 11 to 10.',
  scheme: [['Protons (11) and neutrons (12) do not change', 1], ['One electron is lost: 11 to 10, giving a 1+ charge', 1]],
  d: 2, c: 'application', t: [3],
}), () => 23 - 11 === 12 || 'Na');
add('s2-chem', short({
  marks: 2,
  stem: 'Hydrogen-1 and hydrogen-2 both react with oxygen in the same way to form water, but a sample of hydrogen-2 is heavier. Explain both facts.',
  model: 'Both isotopes have one electron, so their chemical behaviour is the same and each forms water with oxygen. Hydrogen-2 has one neutron more than hydrogen-1, so each of its atoms has a larger mass and a sample of it is heavier.',
  sol: 'Same electrons, same chemistry; extra neutron means more mass.',
  scheme: [['Same number of electrons, so same chemical properties', 1], ['An extra neutron in hydrogen-2 makes its atoms heavier', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s3-isoisob', short({
  marks: 3,
  stem: 'Distinguish isotopes from isobars on three points, and give one example of each.',
  model: `Isotopes have the same atomic number but different mass numbers, and they belong to the same element, such as ${iso(8, 16, 'O')} and ${iso(8, 18, 'O')}. Isobars have the same mass number but different atomic numbers, and they are different elements, such as ${iso(11, 24, 'Na')} and ${iso(12, 24, 'Mg')}. Isotopes have the same chemical properties; isobars do not.`,
  sol: 'Atomic number, mass number and chemical properties compared; oxygen-16 and oxygen-18; sodium-24 and magnesium-24.',
  scheme: [['Same Z and different A for isotopes; same A and different Z for isobars', 1], ['Same element versus different elements and chemical properties', 1], ['One correct example of each', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s3-uses', short({
  marks: 3,
  stem: 'Name three radioactive isotopes and state one use of each.',
  model: 'Cobalt-60 gives radiation that is used to treat cancer and to sterilise medical equipment. Iodine-131 is used to diagnose and to treat problems of the thyroid gland. Uranium-235 is used as a fuel in nuclear reactors to produce electricity. Carbon-14 can also be named, for estimating the age of fossils.',
  sol: 'Three isotopes with uses: cobalt-60, iodine-131, uranium-235 (or carbon-14).',
  scheme: [['First isotope with a correct use', 1], ['Second isotope with a correct use', 1], ['Third isotope with a correct use', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('s3-avg', (() => {
  const pairs = [[20, 90], [22, 10]];
  const a = avgMass(pairs);
  return short({
    marks: 3,
    stem: `Neon in nature has two isotopes: neon-${pairs[0][0]} (${pairs[0][1]} %) and neon-${pairs[1][0]} (${pairs[1][1]} %), values given for practice. Find the average atomic mass of neon.`,
    model: `Average mass is the sum of each mass number multiplied by its percentage, divided by 100. This gives (${pairs[0][0]} × ${pairs[0][1]} + ${pairs[1][0]} × ${pairs[1][1]}) / 100 = (${pairs[0][0] * pairs[0][1]} + ${pairs[1][0] * pairs[1][1]}) / 100 = ${dec(a, 3)} u. This is not a whole number because the atoms in the sample are of two different masses.`,
    sol: r`$(20 \times 90 + 22 \times 10)/100 = ${dec(a, 3)}$ u.`,
    scheme: [['Method: mass × percentage, added, divided by 100', 1], [`${pairs[0][0] * pairs[0][1]} + ${pairs[1][0] * pairs[1][1]} = ${pairs[0][0] * pairs[0][1] + pairs[1][0] * pairs[1][1]}`, 1], [`${dec(a, 3)} u with the unit`, 1]],
    d: 3, c: 'application', t: [3],
  });
})(), (q) => near(avgMass([[20, 90], [22, 10]]), 20.2, 1e-9) || 'avg-ne');
add('l-iso', long({
  stem: '(a) Define isotopes and name the three isotopes of hydrogen with the number of neutrons in each.\n\n(b) Explain why isotopes of an element have the same chemical properties.\n\n(c) Name two radioactive isotopes and give a use of each.',
  model: 'Isotopes are atoms of the same element with the same atomic number and different mass numbers. Hydrogen has protium with no neutrons, deuterium with one neutron and tritium with two neutrons. Chemical properties depend on the electrons, and isotopes of an element have the same number of electrons and the same outer electrons, so they behave alike. For uses, cobalt-60 is used to treat cancer, and iodine-131 is used to treat disorders of the thyroid gland. Uranium-235 and carbon-14 are other examples.',
  sol: 'Definition and hydrogen isotopes; same electrons give same chemistry; two uses.',
  scheme: [['(a) Definition and three hydrogen isotopes with 0, 1 and 2 neutrons', 2], ['(b) Same electrons, same chemical properties', 1.5], ['(c) Two isotopes with uses', 1.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('case-isotopes', (() => {
  const sp = [['P', 6, 12], ['Q', 6, 14], ['R', 7, 14], ['T', 8, 16]];
  const rows = sp.map(([n, z, a]) => `| ${n} | ${z} | ${a} | ${a - z} |`).join('\n');
  return mk.case({
    passage: r`A student records the atomic number and the mass number of four neutral atoms.

| Atom | Atomic number | Mass number | Neutrons |
|---|---|---|---|
${rows}`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which two atoms are isotopes of the same element?',
        right: 'P and Q',
        wrong: ['Q and R', 'P and R', 'R and T'],
        sol: 'P and Q both have atomic number 6 but mass numbers 12 and 14 — option (@K). Q and R have the same mass number 14 but different atomic numbers.',
        d: 2, c: 'application', t: [3],
      })),
      part('b', short({
        marks: 1, wl: null,
        stem: 'Name the pair of atoms in the table that are isobars.',
        model: 'Q and R, because both have mass number 14 and different atomic numbers (6 and 7).',
        sol: 'Q and R (same A, different Z).',
        scheme: [['Q and R', 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2, wl: null,
        stem: 'Give the number of electrons in atom R and the number of neutrons in atom Q.',
        model: r`R has 7 electrons, as a neutral atom has as many electrons as protons. Q has $14 - 6 = 8$ neutrons.`,
        sol: 'R: 7 electrons; Q: 14 − 6 = 8 neutrons.',
        scheme: [['Atom R has 7 electrons', 1], ['Atom Q has 14 − 6 = 8 neutrons', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2, wl: null,
          stem: 'Atom Q is carbon-14. State one use of this isotope and say why atoms P and Q behave alike in chemical reactions.',
          model: 'Carbon-14 is used to estimate the age of fossils and old wooden objects. P and Q have the same number of electrons, 6, so their chemical properties are the same.',
          sol: 'Carbon dating; same electrons.',
          scheme: [['Carbon dating of fossils or old wood', 1], ['Same number of electrons, so same chemical properties', 1]],
          d: 3, c: 'application', t: [3],
        }),
      ]),
    ],
  });
})(), null);
add('case-hospital', (() => {
  const z = 53, a = 131;
  const n = a - z;
  return mk.case({
    passage: r`A district hospital has a radiotherapy unit that uses cobalt-60 to treat cancer. A nearby clinic uses iodine-131, which has atomic number ${z}, for thyroid patients. A university laboratory uses carbon-14 to find the age of old wood. All three isotopes are radioactive and are handled only by trained staff.`,
    d: 2, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The isotope used by the radiotherapy unit to treat cancer is:',
        right: 'cobalt-60',
        wrong: ['iodine-131', 'carbon-14', 'uranium-235'],
        sol: 'Cobalt-60 gives out radiation that is used to treat cancer — option (@K).',
        d: 1, c: 'recall', t: [3],
      })),
      part('b', short({
        marks: 1, wl: null,
        stem: 'Find the number of neutrons in an atom of iodine-131.',
        model: r`$${a} - ${z} = ${n}$ neutrons.`,
        sol: `Neutrons = ${a} − ${z} = ${n}.`,
        scheme: [[`${a} − ${z} = ${n}`, 1]],
        d: 2, c: 'application', t: [3],
      }), []),
      part('c', short({
        marks: 2, wl: null,
        stem: 'What does the university laboratory find out with carbon-14, and why is the isotope handled only by trained staff?',
        model: 'Carbon-14 is used to estimate the age of fossils and old wooden objects. It is radioactive, so its radiation can harm people and must be handled with care.',
        sol: 'Age of old wood; radiation is harmful.',
        scheme: [['Estimating the age of old wood or fossils', 1], ['It is radioactive and its radiation is harmful', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2, wl: null,
          stem: 'Which isotope used by the clinic treats the thyroid, and how many protons does one of its atoms have?',
          model: `The clinic uses iodine-131, which treats thyroid disorders. Its atomic number is ${z}, so each atom has ${z} protons.`,
          sol: 'Iodine-131; 53 protons.',
          scheme: [['Iodine-131', 1], ['53 protons, equal to the atomic number', 1]],
          d: 2, c: 'application', t: [3],
        }),
      ]),
    ],
  });
})(), null);

// ---------------------------------------------------------------- numericals
add('n-zn', (() => {
  const z = 30, a = 65;
  const n = a - z;
  return num({
    stem: `A zinc atom is written ${iso(z, a, 'Zn')}. Find the number of neutrons in its nucleus.`,
    value: n, tol: 0, unit: 'neutrons',
    sol: r`Neutrons $= A - Z = ${a} - ${z} = ${n}$.`,
    scheme: [['Neutrons = mass number − atomic number', 1], [`${a} − ${z} = ${n}`, 1]],
    marks: 2, d: 1, c: 'understanding', t: [3],
  });
})(), (q) => count(30, 65).n === 35 && q.answer.value === 35 || 'zn');
add('n-p3', (() => {
  const z = 15, a = 31, q = -3;
  const c = count(z, a, q);
  return num({
    stem: `A phosphorus atom (atomic number ${z}, mass number ${a}) gains 3 electrons and becomes a phosphide ion with a 3− charge. How many electrons does the ion have?`,
    value: c.e, tol: 0, unit: 'electrons',
    sol: r`Electrons $= Z + 3 = ${z} + 3 = ${c.e}$.`,
    scheme: [['An anion has Z + charge electrons', 1], [`${z} + 3 = ${c.e}`, 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => count(15, 31, -3).e === 18 && q.answer.value === 18 || 'p3');
add('n-mass', (() => {
  const p = 19, n = 21;
  const a = p + n;
  return num({
    stem: `A potassium atom has ${p} protons and ${n} neutrons. What is its mass number?`,
    value: a, tol: 0, unit: null,
    sol: r`Mass number $= \text{protons} + \text{neutrons} = ${p} + ${n} = ${a}$.`,
    scheme: [['Mass number = protons + neutrons', 1], [`${p} + ${n} = ${a}`, 1]],
    marks: 2, d: 1, c: 'understanding', t: [3],
  });
})(), (q) => 19 + 21 === 40 && q.answer.value === 40 || 'mass');
add('n-boron', (() => {
  const pairs = [[10, 20], [11, 80]];
  const a = avgMass(pairs);
  return num({
    stem: `Boron has two isotopes: boron-${pairs[0][0]} (${pairs[0][1]} %) and boron-${pairs[1][0]} (${pairs[1][1]} %). Find the average atomic mass of boron, in u. (Abundances are rounded and given for practice.)`,
    value: a, tol: 0.05, unit: 'u',
    sol: r`Average $= \dfrac{${pairs[0][0]} \times ${pairs[0][1]} + ${pairs[1][0]} \times ${pairs[1][1]}}{100} = \dfrac{${pairs[0][0] * pairs[0][1]} + ${pairs[1][0] * pairs[1][1]}}{100} = ${dec(a, 3)}$ u.`,
    scheme: [['Each mass number multiplied by its abundance and added', 1], [`Division by 100 gives ${dec(a, 3)} u`, 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(10 * 0.2 + 11 * 0.8, 10.8, 1e-9) && near(q.answer.value, 10.8, 1e-9) || 'boron');
add('n-mg', (() => {
  const pairs = [[24, 79], [25, 10], [26, 11]];
  const a = avgMass(pairs);
  return num({
    stem: `Magnesium in nature has three isotopes: magnesium-${pairs[0][0]} (${pairs[0][1]} %), magnesium-${pairs[1][0]} (${pairs[1][1]} %) and magnesium-${pairs[2][0]} (${pairs[2][1]} %). Find the average atomic mass, in u, to one decimal place. (Abundances are rounded and given for practice.)`,
    value: Number(a.toFixed(1)), tol: 0.05, unit: 'u',
    sol: r`Average $= \dfrac{${pairs[0][0]} \times ${pairs[0][1]} + ${pairs[1][0]} \times ${pairs[1][1]} + ${pairs[2][0]} \times ${pairs[2][1]}}{100} = \dfrac{${pairs[0][0] * pairs[0][1]} + ${pairs[1][0] * pairs[1][1]} + ${pairs[2][0] * pairs[2][1]}}{100} = ${dec(a, 4)} \approx ${a.toFixed(1)}$ u.`,
    scheme: [['Sum of mass number × abundance for all three isotopes', 1.5], [`Division by 100 gives ${dec(a, 4)}, which is ${a.toFixed(1)} u`, 1.5]],
    marks: 3, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(24 * 0.79 + 25 * 0.1 + 26 * 0.11, 24.32, 1e-9) && q.answer.value === 24.3 || 'mg');
add('n-li', (() => {
  const avg = 6.94;
  const x = ((avg - 6) / (7 - 6)) * 100;
  return num({
    stem: `Lithium has two isotopes, lithium-6 and lithium-7. Its average atomic mass is ${avg} u (given). What is the percentage of lithium-7 in a natural sample?`,
    value: Math.round(x), tol: 0.5, unit: '%',
    sol: r`Let lithium-7 be $x\%$. Then $6 \times (100 - x) + 7 \times x = ${avg} \times 100$, so $600 + x = ${Math.round(avg * 100)}$ and $x = ${Math.round(x)}$. Lithium-7 is about ${Math.round(x)} %.`,
    scheme: [['Setting up 6(100 − x) + 7x = 6.94 × 100', 1.5], ['x = 94 %', 1.5]],
    marks: 3, d: 4, c: 'evaluation', t: [3],
  });
})(), (q) => near(6 * 0.06 + 7 * 0.94, 6.94, 1e-9) && q.answer.value === 94 || 'li');
add('n-x2', (() => {
  const e = 10, q = 2, a = 25;
  const z = e + q;
  const n = a - z;
  return num({
    stem: `An ion X²⁺ has ${e} electrons, and the atom from which it forms has mass number ${a}. How many neutrons does the nucleus have?`,
    value: n, tol: 0, unit: 'neutrons',
    sol: r`The atom lost 2 electrons, so $Z = ${e} + ${q} = ${z}$. Neutrons $= ${a} - ${z} = ${n}$.`,
    scheme: [[`Atomic number = ${e} + ${q} = ${z}`, 1], [`Neutrons = ${a} − ${z} = ${n}`, 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => 25 - (10 + 2) === 13 && q.answer.value === 13 || 'x2');
add('n-f', (() => {
  const z = 9, a = 19, q = -1;
  const c = count(z, a, q);
  const t = total(c);
  return num({
    stem: `A fluoride ion is ${iso(z, a, 'F', '-')}. Find the total number of protons, neutrons and electrons together in one such ion.`,
    value: t, tol: 0, unit: 'particles',
    sol: r`Protons $= ${c.p}$; neutrons $= ${a} - ${z} = ${c.n}$; electrons $= ${z} + 1 = ${c.e}$. Total $= ${c.p} + ${c.n} + ${c.e} = ${t}$.`,
    scheme: [['Protons, neutrons and electrons found separately', 1.5], [`Total = ${t}`, 0.5]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => 9 + 10 + 10 === 29 && q.answer.value === 29 || 'f');
add('n-alpha', (() => {
  const fired = 36000, back = 9;
  const pct = (back / fired) * 100;
  return num({
    stem: `In a practice version of the gold-foil experiment, ${fired.toLocaleString('en-US').replace(',', ' ')} alpha particles are fired at a foil and ${back} bounce back. What percentage of the particles bounce back?`,
    value: pct, tol: 0.0005, unit: '%',
    sol: r`Percentage $= \dfrac{${back}}{${fired}} \times 100 = ${dec(pct, 2)}\%$, which is 1 in ${fired / back}.`,
    scheme: [[`Fraction ${back} / ${fired} = 1 in ${fired / back}`, 1], [`× 100 = ${dec(pct, 2)} %`, 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(9 / 36000 * 100, 0.025, 1e-9) && near(q.answer.value, 0.025, 1e-9) || 'alpha');
