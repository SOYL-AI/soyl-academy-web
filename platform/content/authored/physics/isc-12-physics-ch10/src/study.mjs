// ISC 12 Physics ch10 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, fluxPlot, powerPlot, lossPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electromagnetic Induction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Magnetic flux and Faraday’s laws',
      `- **Magnetic flux** through a flat coil of area A in a uniform field: $\\Phi = \\vec B \\cdot \\vec A = BA\\cos\\theta$, θ between $\\vec B$ and the **normal**. Unit: weber, 1 Wb = 1 T m². Flux linkage of N turns: $N\\Phi$.
- If the angle is given from the **plane** of the coil, use θ = 90° minus that angle.
- **First law:** an emf is induced whenever the flux linked with a circuit changes, and only while it changes. **Second law:** $\\varepsilon = -N\\,\\dfrac{d\\Phi}{dt}$ (the minus sign is Lenz’s law).
- The flux can change through B, A or θ. On a Φ–t graph the emf per turn is the (negative) **slope**: a steady flux, however large, gives no emf.
- Charge that flows round a closed coil of resistance R: $q = \\dfrac{N\\Delta\\Phi}{R}$, independent of how fast the change happens.`,
      [kt('Magnetic flux', 'BA cos θ for a flat area A in a uniform field, θ measured from the normal; unit weber.'), kt('Flux linkage', 'Total flux through all the turns of a coil, NΦ.')],
      [fm(r`\Phi = BA\cos\theta`, 'Flux'), fm(r`\varepsilon = -N\,\dfrac{d\Phi}{dt},\qquad q = \dfrac{N\Delta\Phi}{R}`, 'Faraday’s law; charge')],
      V.flux,
      [1],
      [fluxPlot],
    ),
    sec(
      '2. Lenz’s law and motional emf',
      `- **Lenz’s law:** the induced current flows so as to **oppose the change** of flux that produces it (not the flux itself). Flux increasing: induced field against B; flux decreasing: induced field along B.
- Steps: (1) is the flux through the loop increasing or decreasing, and which way does it point? (2) choose the induced field that opposes the change; (3) right-hand rule for the current.
- Lenz’s law follows from **conservation of energy**: because the induced current opposes the motion, work must be done, and that work becomes the electrical energy.
- **Motional emf:** a bar of length l moving at v on rails in a perpendicular field: $\\Phi = Blx$, so $\\varepsilon = Bl\\,\\dfrac{dx}{dt} = Blv$. Same result from forces: $qvB$ on each free charge balances $qE$, so $\\varepsilon = El = Blv$.
- With circuit resistance R: $I = Blv/R$; opposing force $F = BIl = B^2l^2v/R$; power to keep v steady $P = Fv = (Blv)^2/R = I^2R$.`,
      [kt('Lenz’s law', 'The induced current opposes the change of flux that causes it.'), kt('Motional emf', 'The emf Blv across a conductor moving through a magnetic field.')],
      [fm(r`\varepsilon = Blv,\qquad F = \dfrac{B^2l^2v}{R}`, 'Motional emf; drag force'), fm(r`P = \dfrac{(Blv)^2}{R}`, 'Power')],
      V.lenz,
      [2],
      [V.rod, powerPlot],
    ),
    sec(
      '3. Eddy currents (qualitative)',
      `- **Eddy currents** are induced currents circulating in closed loops inside a bulk conductor when the flux through it changes (the metal moves in a field or the field changes).
- **Effects:** heating of the metal; a force that **opposes** the relative motion (Lenz’s law).
- **Uses:** induction furnaces and cooktops (heating); electromagnetic brakes on trains; dead-beat galvanometers (damping by the metal frame); speedometers and energy-meter discs.
- **Unwanted:** heating of transformer and motor cores. **Lamination** (thin sheets insulated by varnish) confines the eddy currents to small, high-resistance paths and reduces the loss. Slots cut in a plate do the same.
- ISC treats eddy currents qualitatively only.`,
      [kt('Eddy currents', 'Induced currents that circulate inside a bulk piece of metal when the flux through it changes.'), kt('Lamination', 'Building a core from thin sheets insulated from one another to reduce eddy currents.')],
      [],
      V.eddy,
      [3],
    ),
    sec(
      '4. Self-induction',
      `- The flux linkage of a coil is proportional to its own current: $N\\Phi = LI$, and $\\varepsilon = -L\\,\\dfrac{dI}{dt}$. **Self-inductance** L, unit **henry** (1 H = 1 Wb A⁻¹ = 1 V s A⁻¹).
- **Long solenoid** (N turns, length l, area A, n = N/l): $B = \\mu_0NI/l$, $N\\Phi = \\mu_0N^2AI/l$, so $L = \\dfrac{\\mu_0N^2A}{l} = \\mu_0n^2Al$; with a core $\\mu_r$ times larger.
- L depends on the turns, size, shape and core, **not** on the current.
- **Back emf** opposes the **change** of current: the current grows gradually when switched on; a large emf (spark) appears when it is switched off. It depends on dI/dt, so it can be large when I is zero. Inductance is “electrical inertia”.`,
      [kt('Self-inductance', 'Flux linkage of a coil per unit current through it, L = NΦ/I; unit henry.'), kt('Back emf', 'The emf −L dI/dt induced in a coil by a change of its own current.')],
      [fm(r`N\Phi = LI,\qquad \varepsilon = -L\,\dfrac{dI}{dt}`, 'Self-induction'), fm(r`L = \dfrac{\mu_0N^2A}{l}`, 'Long solenoid')],
      V.sol,
      [4],
    ),
    sec(
      '5. Mutual induction',
      `- A current $I_1$ in coil 1 links flux with coil 2: $N_2\\Phi_2 = MI_1$ and $\\varepsilon_2 = -M\\,\\dfrac{dI_1}{dt}$. **Mutual inductance** M, in henry; $M_{12} = M_{21}$.
- M grows with the turns and areas, with closer, coaxial placing and with a soft-iron core through both coils.
- **Coaxial solenoids** (inner radius $r_1$, $n_1$ and $n_2$ turns per metre, common length l): the outer field $\\mu_0n_2I_2$ passes through the inner area $\\pi r_1^2$ and links $n_1l$ turns, so $M = \\mu_0n_1n_2\\pi r_1^2l$. Only the **inner** area counts.`,
      [kt('Mutual inductance', 'Flux linkage of one coil per unit current in another, M = N₂Φ₂/I₁; unit henry.')],
      [fm(r`N_2\Phi_2 = MI_1,\qquad \varepsilon_2 = -M\,\dfrac{dI_1}{dt}`, 'Mutual induction'), fm(r`M = \mu_0n_1n_2\pi r_1^2l`, 'Coaxial solenoids')],
      V.coax,
      [5],
    ),
    sec(
      '6. The transformer and power transmission',
      `- **Principle:** mutual induction. Primary ($N_p$) and secondary ($N_s$) on a laminated soft-iron core; the alternating primary current sets up an alternating flux that links the secondary. It does not work on steady DC.
- **Ideal** (no flux leakage, no losses): $\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p} = \\dfrac{I_p}{I_s}$. Step-up: $N_s > N_p$; step-down: $N_s < N_p$. It never increases power.
- **Efficiency** $\\eta = \\dfrac{V_sI_s}{V_pI_p}$ (95–99% for large transformers). **Losses:** copper ($I^2R$; thick wire), eddy currents (laminated core), hysteresis (soft iron or silicon steel), flux leakage (windings one over the other).
- **Transmission:** line loss $I^2R = \\dfrac{P^2R}{V^2}$; raising V k times cuts the loss $k^2$ times. Power is stepped up for long lines and stepped down to 230 V, 50 Hz near users.`,
      [kt('Transformer', 'Device that changes an alternating voltage by mutual induction between two coils on a common core.'), kt('Efficiency of a transformer', 'Output power divided by input power.')],
      [fm(r`\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p} = \dfrac{I_p}{I_s}`, 'Ideal transformer'), fm(r`P_{loss} = \dfrac{P^2R}{V^2}`, 'Line loss')],
      V.trans,
      [6],
      [lossPlot],
    ),
  ],
  exam_tips_md: `- Flux: is the angle given from the plane or from the normal?
- Direction: change of flux first, then induced field, then current.
- Motional emf: write Φ = Blx and differentiate; power (Blv)²/R.
- Back emf depends on dI/dt; coaxial M uses the inner area; transformer V follows the turns ratio and I the inverse ratio.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Magnetic flux through a flat coil in a uniform field?', '$\\Phi = BA\\cos\\theta$, θ from the normal.', 'formula', 1),
    fc(2, 'One weber in base terms?', '1 T m² (also 1 V s).', 'definition', 1),
    fc(3, 'Faraday’s first law?', 'An emf is induced whenever the flux linked with a circuit changes, and only while it changes.', 'definition', 1),
    fc(4, 'Faraday’s second law for N turns?', '$\\varepsilon = -N\\,d\\Phi/dt$.', 'formula', 1),
    fc(5, 'Coil plane at 20° to B: θ in BA cos θ?', '70°.', 'example', 1),
    fc(6, 'Charge through a closed coil for a flux change ΔΦ per turn?', '$N\\Delta\\Phi/R$, whatever the speed of the change.', 'formula', 1),
    fc(7, 'Emf per turn from a Φ–t graph?', 'Minus the slope; zero where the graph is flat.', 'concept', 1),
    fc(8, 'Lenz’s law?', 'The induced current opposes the change of flux that produces it.', 'definition', 2),
    fc(9, 'Which conservation law underlies Lenz’s law?', 'Conservation of energy.', 'concept', 2),
    fc(10, 'Flux through a loop is decreasing: induced field?', 'Along the original field, trying to keep the flux.', 'concept', 2),
    fc(11, 'Motional emf of a bar on rails?', '$Blv$.', 'formula', 2),
    fc(12, 'Drag force on the bar (circuit resistance R)?', '$B^2l^2v/R$, opposite to v.', 'formula', 2),
    fc(13, 'Power to keep the bar moving steadily?', '$(Blv)^2/R$, equal to the heat in R.', 'formula', 2),
    fc(14, 'Speed of the bar doubled: power needed?', 'Four times.', 'example', 2),
    fc(15, 'What are eddy currents?', 'Induced currents circulating in loops inside bulk metal when the flux through it changes.', 'definition', 3),
    fc(16, 'Two effects of eddy currents?', 'Heating, and a force opposing the relative motion.', 'concept', 3),
    fc(17, 'How is eddy-current loss in a core reduced?', 'Lamination: thin sheets insulated by varnish.', 'fact', 3),
    fc(18, 'Three uses of eddy currents?', 'Induction furnaces and cooktops, electromagnetic brakes, dead-beat galvanometers.', 'fact', 3),
    fc(19, 'Self-inductance defined by flux linkage?', '$N\\Phi = LI$.', 'formula', 4),
    fc(20, 'One henry?', 'The inductance in which a current changing at 1 A s⁻¹ induces 1 V.', 'definition', 4),
    fc(21, 'Self-inductance of a long solenoid?', '$\\mu_0N^2A/l = \\mu_0n^2Al$.', 'formula', 4),
    fc(22, 'Turns of a solenoid doubled, same length and area: L?', 'Four times.', 'example', 4),
    fc(23, 'Why does a spark jump when a coil’s circuit is broken?', 'The current falls very fast, so the back emf −L dI/dt is very large.', 'concept', 4),
    fc(24, 'Mutual inductance defined by flux linkage?', '$N_2\\Phi_2 = MI_1$.', 'formula', 5),
    fc(25, 'Mutual inductance of two coaxial solenoids?', '$\\mu_0n_1n_2\\pi r_1^2l$, with $r_1$ the inner radius.', 'formula', 5),
    fc(26, 'Principle of the transformer?', 'Mutual induction.', 'concept', 6),
    fc(27, 'Ideal transformer relations?', '$V_s/V_p = N_s/N_p = I_p/I_s$.', 'formula', 6),
    fc(28, 'Four energy losses in a transformer?', 'Copper, eddy-current, hysteresis and flux leakage.', 'fact', 6),
    fc(29, 'Why transmit power at high voltage?', 'Line loss $P^2R/V^2$ falls as 1/V².', 'concept', 6),
    fc(30, 'Exam tip: direction of an induced current?', 'Change of flux, then induced field, then current by the right-hand rule.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
