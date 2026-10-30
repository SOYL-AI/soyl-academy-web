// ch14 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, fwdPlot, revPlot, halfPlot, fullPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Semiconductor Electronics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Energy bands',
      `- In a crystal, atomic energy levels spread into **bands**: the **valence band** (valence electrons) and the **conduction band** (free electrons), separated by the **band gap** $E_g$.
- **Conductor:** bands overlap; many free electrons; resistivity about $10^{-8}$–$10^{-6}$ Ω m.
- **Semiconductor:** small gap, about 1 eV (Si 1.1 eV, Ge 0.7 eV); a few electrons cross it at room temperature; resistivity about $10^{-5}$–$10^{6}$ Ω m; resistance **falls** on heating.
- **Insulator:** large gap, over 3 eV (diamond 5.4 eV); resistivity about $10^{11}$–$10^{19}$ Ω m.
- A photon can create an electron–hole pair only if $h\\nu \\ge E_g$, i.e. $\\lambda \\le hc/E_g$.`,
      [kt('Band gap', 'The forbidden energy range between the top of the valence band and the bottom of the conduction band.')],
      [fm(r`\lambda_\text{max} = \dfrac{hc}{E_g}`, 'Longest wavelength that can excite across the gap')],
      V.bands,
      [1],
    ),
    sec(
      '2. Intrinsic and extrinsic semiconductors',
      `- **Intrinsic** (pure Si, Ge): thermal energy breaks bonds, creating equal numbers of free electrons and **holes**: $n_e = n_h = n_i$. A hole is a missing electron in a bond and behaves as a **positive** carrier. Current $I = I_e + I_h$.
- **n-type:** doped with a **pentavalent** impurity (P, As, Sb), a **donor**; majority carriers **electrons**, minority holes.
- **p-type:** doped with a **trivalent** impurity (B, Al, In), an **acceptor**; majority carriers **holes**, minority electrons.
- Doping level is tiny (≈ 1 in 10⁶) but raises conductivity enormously. Doped crystals remain electrically **neutral** (fixed ions balance the carriers).
- In equilibrium $n_e n_h = n_i^2$.`,
      [kt('Hole', 'A vacancy left by an electron in a covalent bond; it acts as a positive charge carrier.'), kt('Donor', 'A pentavalent impurity atom that gives a free electron.'), kt('Acceptor', 'A trivalent impurity atom that creates a hole.')],
      [fm(r`n_e n_h = n_i^2`, 'Mass-action law')],
      V.doping,
      [2],
    ),
    sec(
      '3. The p-n junction and its characteristics',
      `- **Formation:** electrons diffuse from n to p and holes from p to n and recombine, leaving a **depletion layer** of fixed ions (negative on the p side, positive on the n side). The field points **n → p**, creating a **barrier potential** (≈ 0.7 V Si, ≈ 0.3 V Ge). In equilibrium, diffusion current = drift current.
- **Forward bias** (p to +): barrier lowered, depletion layer **narrows**; current rises sharply above the **knee voltage**; current in mA.
- **Reverse bias** (p to −): barrier raised, depletion layer **widens**; tiny, nearly constant **reverse saturation current** of minority carriers (μA); sharp rise at the **breakdown voltage**.
- The diode is **non-ohmic**; dynamic resistance $r_d = \\Delta V/\\Delta I$.`,
      [kt('Depletion layer', 'Region around a p-n junction emptied of mobile carriers, containing fixed ions.'), kt('Barrier potential', 'Potential difference across the depletion layer that opposes further diffusion.'), kt('Knee voltage', 'Forward voltage beyond which the diode current rises sharply.')],
      [fm(r`r_d = \dfrac{\Delta V}{\Delta I}`, 'Dynamic resistance')],
      V.junction,
      [3],
      [V.bias, fwdPlot, revPlot],
    ),
    sec(
      '4. The diode as a rectifier',
      `- **Rectification:** converting AC into unidirectional (DC) current, using the diode’s one-way conduction.
- **Half-wave:** one diode in series with the load; conducts only in half-cycles when it is forward biased; output frequency = input frequency $f$.
- **Full-wave (centre tap):** two diodes; D₁ conducts when one end of the secondary is positive, D₂ in the other half-cycle; current through the load is always in the same direction; output pulse frequency $2f$.
- Peak output ≈ peak input − diode drop (≈ 0.7 V for Si); $V_0 = \\sqrt{2}V_\\text{rms}$.
- A **capacitor filter** across the load smooths the pulsating output.`,
      [kt('Rectifier', 'A circuit that converts alternating current into direct (unidirectional) current.')],
      [fm(r`V_0 = \sqrt{2}\,V_\text{rms}`, 'Peak voltage of the AC input')],
      V.full,
      [4],
      [V.half, halfPlot, fullPlot],
    ),
  ],
  exam_tips_md: `- Band diagrams: label valence band, conduction band and $E_g$ for all three types.
- Donors P, As, Sb → n-type; acceptors B, Al, In → p-type; both neutral.
- Depletion layer narrows in forward bias, widens in reverse bias.
- Rectifiers: draw circuit and aligned input/output waveforms; full-wave output frequency $2f$.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is the band gap?', 'Forbidden energy gap between valence and conduction bands.', 'concept', 1),
    fc(2, 'Band picture of a conductor?', 'Valence and conduction bands overlap.', 'concept', 1),
    fc(3, 'Band gap of silicon?', 'About 1.1 eV.', 'fact', 1),
    fc(4, 'Band gap of germanium?', 'About 0.7 eV.', 'fact', 1),
    fc(5, 'Band gap of an insulator such as diamond?', 'Large, about 5.4 eV (over 3 eV).', 'fact', 1),
    fc(6, 'Effect of heating on a semiconductor’s resistance?', 'It falls (more carriers).', 'concept', 1),
    fc(7, 'Longest wavelength that can cross a gap Eg?', '$\\lambda = hc/E_g$.', 'formula', 1),
    fc(8, 'What is a hole?', 'Vacancy of an electron in a bond; acts as a positive carrier.', 'concept', 2),
    fc(9, 'Intrinsic semiconductor carrier relation?', '$n_e = n_h = n_i$.', 'formula', 2),
    fc(10, 'Dopant for n-type?', 'Pentavalent: P, As, Sb (donors).', 'fact', 2),
    fc(11, 'Dopant for p-type?', 'Trivalent: B, Al, In (acceptors).', 'fact', 2),
    fc(12, 'Majority carriers in n-type?', 'Electrons.', 'fact', 2),
    fc(13, 'Majority carriers in p-type?', 'Holes.', 'fact', 2),
    fc(14, 'Is n-type silicon negatively charged?', 'No, it is neutral.', 'concept', 2),
    fc(15, 'Mass-action law?', '$n_e n_h = n_i^2$.', 'formula', 2),
    fc(16, 'How is the depletion layer formed?', 'Diffusion and recombination of carriers leave fixed ions near the junction.', 'concept', 3),
    fc(17, 'Direction of the field in the depletion layer?', 'From n to p.', 'fact', 3),
    fc(18, 'Barrier potential of Si?', 'About 0.7 V.', 'fact', 3),
    fc(19, 'Forward bias connection?', 'p to +, n to −.', 'fact', 3),
    fc(20, 'Depletion layer in forward bias?', 'Narrows.', 'fact', 3),
    fc(21, 'Depletion layer in reverse bias?', 'Widens.', 'fact', 3),
    fc(22, 'Reverse saturation current is due to?', 'Minority carriers.', 'concept', 3),
    fc(23, 'Dynamic resistance?', '$r_d = \\Delta V/\\Delta I$.', 'formula', 3),
    fc(24, 'Is a diode ohmic?', 'No: its I–V graph is not a straight line.', 'concept', 3),
    fc(25, 'What is rectification?', 'Converting AC to DC.', 'concept', 4),
    fc(26, 'Output frequency of a half-wave rectifier (50 Hz input)?', '50 Hz.', 'example', 4),
    fc(27, 'Output frequency of a full-wave rectifier (50 Hz input)?', '100 Hz.', 'example', 4),
    fc(28, 'Why does a full-wave rectifier need a centre tap?', 'Each half of the secondary drives one diode in alternate half-cycles.', 'concept', 4),
    fc(29, 'Exam tip: rectifier waveforms?', 'Draw input and output aligned in time.', 'exam-tip', 4),
    fc(30, 'Exam tip: band diagrams?', 'Label VB, CB and Eg for all three materials.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
