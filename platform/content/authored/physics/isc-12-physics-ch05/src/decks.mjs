// ISC 12 Physics ch05 Electric Current, Ohm's Law and Resistivity — two decks: Part 1 (t01–t02) free electrons, drift, mobility
// and the microscopic form of Ohm's law; Part 2 (t03–t05) resistance and resistivity, V–I graphs, temperature dependence, power
// and billing. Numbers computed here (e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg).
import { sl, deck, table, flow, svgV, plot, r, sci, dec, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { n: 8.5e28, A: 1e-6, I: 1.5 };
ex1.vd = ex1.I / (ex1.n * QE * ex1.A);
ex1.t = 1 / ex1.vd; // seconds to drift 1 m
const ex2 = { rho: 2.4e-8, n: 5.9e28 };
ex2.tau = ME / (ex2.rho * ex2.n * QE ** 2);
ex2.mu = (QE * ex2.tau) / ME;
const ex3 = { rho: 1.1e-6, l: 1.5, d: 0.3e-3 };
ex3.A = Math.PI * (ex3.d / 2) ** 2;
ex3.R = (ex3.rho * ex3.l) / ex3.A;
const ex4 = { R20: 50, alpha: 3.9e-3 };
ex4.R80 = ex4.R20 * (1 + ex4.alpha * 60);
ex4.T60 = 20 + (60 / ex4.R20 - 1) / ex4.alpha;
const ex5 = { P: 1000, V: 230, V2: 200 };
ex5.R = ex5.V ** 2 / ex5.P;
ex5.P2 = ex5.V2 ** 2 / ex5.R;
ex5.I = ex5.P / ex5.V;
const ex6 = { heater: 2.0 * 3, bulb: 0.06 * 8, fan: 0.075 * 10, rate: 7, days: 30 };
ex6.day = ex6.heater + ex6.bulb + ex6.fan;
ex6.month = ex6.day * ex6.days;
ex6.bill = ex6.month * ex6.rate;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };

export const V = {
  drift: svgV(G.DRIFT, 'Electrons drifting opposite to the field in a conductor of cross-section A'),
  walk: svgV(G.WALK, 'Random path of a free electron without and with an electric field', 'Same random kicks in both; the field adds a steady drift opposite to E (checked).'),
  wire: svgV(G.WIRE, 'Wire of length l and cross-section A'),
  stretch: svgV(G.STRETCH, 'A wire stretched to twice its length at constant volume', 'Drawn to scale: twice the length, half the cross-section, four times the resistance (checked).'),
};
export const viPlot = plot(
  {
    x: { min: 0, max: 6, label: 'potential difference V (V)' },
    y: { min: 0, max: 1.6, label: 'current I (A)' },
    functions: [
      { expr: 'x/4', label: 'metal wire at constant temperature: ohmic (R = 4 Ω)' },
      { expr: '0.55sqrt(x)', label: 'filament lamp: non-ohmic, R rises as it heats' },
    ],
  },
  'Current against potential difference: a straight line through the origin for a metal wire at constant temperature, and a curve that bends over for a filament lamp whose resistance rises as it heats',
  'Ohmic: straight line through the origin. Non-ohmic: curved (or not through the origin, or different in each direction).',
);
export const rhoPlot = plot(
  {
    x: { min: 0, max: 300, label: 'temperature rise (°C)' },
    y: { min: 0, max: 2.4, label: 'ρ / ρ₀' },
    functions: [
      { expr: '1 + 0.0039x', label: 'copper (metal): rises almost linearly' },
      { expr: 'exp(-x/60)', label: 'semiconductor: falls steeply' },
    ],
  },
  'Resistivity against temperature rise: a metal such as copper rises nearly in a straight line, while a semiconductor falls steeply',
  'Metals: τ falls as ions vibrate more. Semiconductors: n rises enormously, outweighing the fall in τ.',
);
const quantTable = table(
  ['Quantity', 'Symbol and relation', 'SI unit'],
  [
    ['Current density', 'J = I/A = nevd', 'A m⁻²'],
    ['Conductivity', 'σ = ne²τ/m = 1/ρ', 'S m⁻¹ (Ω⁻¹ m⁻¹)'],
    ['Resistivity', 'ρ = m/(ne²τ)', 'Ω m'],
    ['Mobility', 'μ = vd/E = eτ/m', 'm² V⁻¹ s⁻¹'],
    ['Conductance', 'G = 1/R', 'S (siemens)'],
  ],
  'Table of current density, conductivity, resistivity, mobility and conductance with their relations and SI units',
);

export const deck1 = deck({
  part: 1,
  title: 'Electric Current, Ohm’s Law and Resistivity — Part 1: Drift of free electrons',
  goals: [
    'Explain conduction in metals using free electrons, relaxation time and drift velocity',
    'Derive I = neAvd and define mobility',
    'Derive J = σE and the expression ρ = m/(ne²τ)',
  ],
  slides: [
    sl('title', 'Electric Current, Ohm’s Law and Resistivity', {
      b: 'Part 1 — what really happens inside a wire when a current flows.',
      v: V.walk,
      n: 'Flip a switch and the lamp lights at once, yet the electrons in the wire crawl along at less than a millimetre per second. In this part we build a simple picture of a metal as a gas of free electrons bumping into vibrating ions, and from it we derive the current, Ohm’s law and the resistivity of the metal.',
    }),
    sl('concept', 'Electric current', {
      b: r`Current is the rate of flow of charge: $I = \dfrac{\Delta q}{\Delta t}$, unit ampere (1 A = 1 C s⁻¹). Conventional current flows in the direction positive charge would move; in metals the carriers are **electrons**, moving the other way.`,
      ul: ['Current is a scalar (it obeys algebraic, not vector, addition at junctions) although it has a sense along a wire.', 'A steady current needs a source of emf to keep a field in the conductor.'],
      v: V.drift,
      n: 'An electric current is the rate at which charge flows past a point, coulombs per second, or amperes. By convention we take its direction as the way positive charge would move. In a metal wire it is actually electrons that move, drifting the opposite way. A cell keeps a field inside the wire, and that field keeps the electrons drifting.',
    }),
    sl('diagram', 'Free electrons and relaxation time', {
      b: 'A metal holds a “gas” of **free electrons** moving randomly at about $10^5$ m s⁻¹, colliding with the vibrating ions. With no field their average velocity is zero.',
      ul: ['The average time between successive collisions is the **relaxation time** τ (about $10^{-14}$ s in copper).', 'In a field E, each electron accelerates at $a = eE/m$ (opposite to E) between collisions, then loses that extra velocity in the next collision.'],
      v: V.walk,
      n: 'Inside a metal, the outer electrons are not tied to any atom. They dash about at hundreds of kilometres per second, colliding with the ions, but in every direction equally, so on average they go nowhere. Switch on a field and between collisions each electron is pushed a little in the opposite direction. The average time between collisions is called the relaxation time.',
    }),
    sl('concept', 'Drift velocity and mobility', {
      b: r`The extra velocity averaged over many collisions is the **drift velocity**:
$$\vec v_d = -\dfrac{e\vec E}{m}\tau,\qquad |v_d| = \dfrac{eE\tau}{m}$$
**Mobility** $\mu = \dfrac{v_d}{E} = \dfrac{e\tau}{m}$ (m² V⁻¹ s⁻¹): drift speed per unit field.`,
      ul: ['Drift velocity is tiny (mm s⁻¹) compared with the random speed (10⁵ m s⁻¹).', 'A lamp lights at once because the **field** spreads along the wire at nearly the speed of light, setting all the electrons drifting together.'],
      v: V.walk,
      n: 'Averaging over collisions, electrons acquire a small steady velocity opposite to the field, e E tau over m. That is the drift velocity, only a fraction of a millimetre per second in a typical wire. Mobility measures how easily the carriers drift: drift speed per volt per metre. The lamp still lights instantly because the field sets every electron in the circuit moving at the same moment.',
    }),
    sl('diagram', 'Current and drift velocity: I = neAvd', {
      b: r`In time $\Delta t$, all free electrons within a length $v_d\Delta t$ cross a section of area $A$: their number is $nAv_d\Delta t$ (n = number per unit volume). Charge crossing $= n e A v_d\Delta t$, so
$$I = n e A v_d,\qquad J = \dfrac{I}{A} = n e v_d$$`,
      v: V.drift,
      n: 'Picture a slice of wire of length v d delta t. In time delta t, every free electron in that slice crosses the end face. The slice has volume A v d delta t, so it holds n A v d delta t electrons, carrying charge n e A v d delta t. Dividing by the time gives the current, n e A v d. The current per unit area is the current density.',
    }),
    sl('example', 'Worked example 1: how slow is drift?', {
      b: r`A copper wire of cross-section 1.0 mm² carries 1.5 A. Copper has $8.5 \times 10^{28}$ free electrons per m³. Find the drift velocity and the time to drift 1 m.`,
      ul: [
        r`Step 1 — $v_d = \dfrac{I}{n e A} = \dfrac{1.5}{8.5 \times 10^{28} \times 1.6 \times 10^{-19} \times 1.0 \times 10^{-6}} \approx ${sci(ex1.vd, 3)}$ m s$^{-1}$.`,
        r`Step 2 — $t = \dfrac{1}{${sci(ex1.vd, 3)}} \approx ${sci(ex1.t, 2)}$ s, more than two and a half hours.`,
      ],
      v: V.drift,
      n: 'Dividing the current by n e A gives a drift velocity of about a tenth of a millimetre per second. At that pace an electron would take more than two and a half hours to move one metre along the wire. Yet the lamp at the end lights in a split second, because the field, not the electrons, does the travelling.',
    }),
    sl('check', 'Quick check: drift velocity', {
      b: 'Choose the correct option.',
      v: V.drift,
      chk: 'halfarea-mcq',
      n: 'How does the drift velocity depend on the area for a given current?',
    }),
    sl('concept', 'Ohm’s law from drift: J = σE', {
      b: r`Substituting $v_d = \dfrac{eE\tau}{m}$ in $J = n e v_d$:
$$J = \dfrac{n e^2\tau}{m}E = \sigma E,\qquad \sigma = \dfrac{n e^2\tau}{m},\quad \rho = \dfrac{1}{\sigma} = \dfrac{m}{n e^2\tau}$$`,
      ul: ['For a wire: $E = V/l$ and $J = I/A$ give $V = \\dfrac{\\rho l}{A}I = RI$: **Ohm’s law**.', 'ρ depends on n and τ, properties of the material and its temperature, not on the wire’s shape.'],
      v: quantTable,
      n: 'Put the drift velocity into J equals n e v d and the current density comes out proportional to the field: J equals sigma E, where the conductivity sigma is n e squared tau over m. This is Ohm’s law in its microscopic form. For a wire of length l and area A, it becomes V equals I times rho l over A, the familiar V equals I R.',
    }),
    sl('example', 'Worked example 2: relaxation time and mobility in gold', {
      b: r`Gold, used to plate connector pins, has resistivity $2.4 \times 10^{-8}$ Ω m and $5.9 \times 10^{28}$ free electrons per m³. Find the relaxation time and the mobility of its free electrons.`,
      ul: [
        r`Step 1 — $\tau = \dfrac{m}{\rho n e^2} = \dfrac{9.1 \times 10^{-31}}{2.4 \times 10^{-8} \times 5.9 \times 10^{28} \times (1.6 \times 10^{-19})^2} \approx ${sci(ex2.tau, 3)}$ s.`,
        r`Step 2 — $\mu = \dfrac{e\tau}{m} = \dfrac{1.6 \times 10^{-19} \times ${sci(ex2.tau, 3)}}{9.1 \times 10^{-31}} \approx ${sci(ex2.mu, 3)}$ m² V$^{-1}$ s$^{-1}$.`,
      ],
      v: quantTable,
      n: 'Rearranging the resistivity formula, the relaxation time is m over rho n e squared: about two and a half times ten to the minus fourteen second between collisions. The mobility, e tau over m, is about four and a half times ten to the minus three square metres per volt second, so a field of one volt per metre would make the electrons drift at roughly four and a half millimetres per second.',
    }),
    sl('check', 'Quick check: relaxation time', {
      b: 'Judge the assertion and the reason.',
      v: quantTable,
      chk: 'tau-ar',
      n: 'Link the relaxation time to the resistivity formula.',
    }),
    sl('two-column', 'Random speed and drift speed', {
      b: 'Two very different speeds:',
      cols: ['**Random (thermal) motion**\n- About 10⁵ m s⁻¹\n- Directions random\n- Average velocity zero\n- No current', '**Drift**\n- About 10⁻⁴ m s⁻¹\n- Opposite to E\n- Steady average\n- Gives the current'],
      v: V.walk,
      n: 'Do not confuse the two speeds. The random motion of electrons is fast, around a hundred kilometres per second, but has no preferred direction, so it carries no current. The drift is a billion times slower but steady and in one direction, and it alone makes the current. The field skews the random motion just slightly.',
    }),
    sl('check', 'Quick check: drift in a battery lead', {
      b: 'Calculate the drift velocity.',
      v: V.drift,
      chk: 'vd-num',
      n: 'Use v d equals I over n e A, with the area in square metres.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: quantTable,
      n: 'To sum up: free electrons in a metal move randomly and collide every relaxation time tau. A field adds a slow drift, e E tau over m, opposite to the field, and the mobility is e tau over m. The current is n e A v d. Substituting gives J equals sigma E with sigma equal to n e squared tau over m, so the resistivity is m over n e squared tau: Ohm’s law at the microscopic level.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Derive I = neAvd with a labelled figure of the slice $v_d\\Delta t$ long.',
        'Derive ρ = m/(ne²τ) in three lines: $v_d$, J, J = σE.',
        'Convert mm² to m² (1 mm² = 10⁻⁶ m²) in drift problems.',
        'Explain why the lamp lights instantly (field, not electrons, travels fast).',
      ],
      v: table(['Asked', 'Key point'], [['Unit of mobility?', 'm² V⁻¹ s⁻¹'], ['Why is vd tiny?', 'n is huge'], ['Effect of temperature on τ?', 'τ falls']], 'Table of common questions and the key point for each'),
      n: 'For the derivations, a labelled figure of the slice of wire earns marks. The resistivity derivation is short: drift velocity, current density, then compare with J equals sigma E. Watch the units: one square millimetre is ten to the minus six square metre. And be ready to explain why a lamp lights instantly although the electrons drift so slowly.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electric Current, Ohm’s Law and Resistivity — Part 2: Resistance, temperature and power',
  goals: [
    'Calculate resistance from resistivity and dimensions; distinguish ohmic from non-ohmic devices',
    'Explain the temperature dependence of resistivity of metals and semiconductors',
    'Calculate electrical power, energy and electricity bills',
  ],
  slides: [
    sl('title', 'Resistance, temperature and power', {
      b: 'Part 2 — how the size of a wire and its temperature set its resistance, and what you pay for when you use electricity.',
      v: V.wire,
      n: 'Why is a heater element thin and long? Why does a light bulb draw a big surge of current when first switched on? And how does the electricity board work out your bill? In this part we connect resistance to the shape and temperature of a conductor, and work out power and energy in everyday units.',
    }),
    sl('diagram', 'Resistance and resistivity', {
      b: r`For a uniform wire:
$$R = \dfrac{\rho l}{A}$$
ρ is the **resistivity** (Ω m), a property of the material. **Conductance** $G = 1/R$ (siemens); **conductivity** $\sigma = 1/\rho$ (S m⁻¹).`,
      ul: ['Doubling the length doubles R; doubling the area halves R.', 'Stretching a wire to n times its length (same volume) multiplies R by n².'],
      v: V.wire,
      n: 'A long thin wire has more resistance than a short thick one: resistance is resistivity times length over area. Resistivity belongs to the material: about two times ten to the minus eight ohm metres for copper, about sixty times more for nichrome. If you stretch a wire to twice its length, its area halves at the same time, so its resistance goes up four times.',
    }),
    sl('example', 'Worked example 3: a heater element', {
      b: r`A nichrome wire ($\rho = 1.1 \times 10^{-6}$ Ω m) is 1.5 m long and 0.30 mm in diameter. Find its resistance.`,
      ul: [
        r`Step 1 — $A = \pi r^2 = \pi(0.15 \times 10^{-3})^2 \approx ${sci(ex3.A, 3)}$ m².`,
        r`Step 2 — $R = \dfrac{\rho l}{A} = \dfrac{1.1 \times 10^{-6} \times 1.5}{${sci(ex3.A, 3)}} \approx ${dec(ex3.R, 3)}$ Ω.`,
      ],
      v: V.wire,
      n: 'First the cross-section: the radius is point one five millimetres, so the area is about seven times ten to the minus eight square metre. Then resistivity times length over area gives about twenty three ohms, the kind of resistance found in a small heater. Remember to halve the diameter before squaring.',
    }),
    sl('diagram', 'Ohmic and non-ohmic conductors', {
      b: 'A conductor obeys **Ohm’s law** if V ∝ I at constant temperature: its V–I graph is a **straight line through the origin**.',
      ul: ['Ohmic: metal wires at constant temperature.', 'Non-ohmic: filament lamps (R rises with heating), diodes (one-way, non-linear), thermistors, electrolytes; graphs curved, not through the origin, or different in reverse.'],
      v: viPlot,
      n: 'Plot current against voltage. For a metal wire kept at a steady temperature you get a straight line through the origin: the resistance is constant, and the wire obeys Ohm’s law. A lamp filament heats up as the current rises, so its resistance increases and the graph bends over. Diodes conduct one way only. These are non-ohmic devices.',
    }),
    sl('check', 'Quick check: stretching a wire', {
      b: 'Choose the correct option.',
      v: V.stretch,
      chk: 'stretch-mcq',
      n: 'When a wire is stretched, its volume stays the same: what happens to its area?',
    }),
    sl('concept', 'Temperature dependence', {
      b: r`For metals, approximately $\rho_T = \rho_0[1 + \alpha(T - T_0)]$ (and $R_T = R_0[1 + \alpha(T - T_0)]$), with α > 0, the **temperature coefficient of resistivity**.`,
      ul: ['**Metals:** n is fixed; heating makes ions vibrate more, so **τ falls** and ρ rises.', '**Semiconductors:** heating frees many more carriers, so **n rises** steeply and ρ falls (negative α).', 'Alloys such as manganin and constantan have very small α: used for standard resistors.'],
      v: rhoPlot,
      n: 'Heat a metal and its resistance rises roughly in a straight line, because the ions vibrate more and electrons collide more often, so the relaxation time falls. Heat a semiconductor and the opposite happens: far more electrons are freed to carry current, and the resistivity drops steeply. Some alloys hardly change at all, which makes them ideal for standard resistors.',
    }),
    sl('example', 'Worked example 4: a motor winding warms up', {
      b: r`The copper winding of a pump motor measures 50 Ω in a workshop at 20 °C ($\alpha = 3.9 \times 10^{-3}$ °C$^{-1}$). What will it measure when the motor runs at 80 °C, and at what temperature will it read 60 Ω?`,
      ul: [
        r`Step 1 — $R_{80} = 50[1 + 3.9 \times 10^{-3} \times 60] = ${dec(ex4.R80, 3)}$ Ω.`,
        r`Step 2 — $60 = 50[1 + 3.9 \times 10^{-3}(T - 20)] \Rightarrow T - 20 = \dfrac{0.20}{3.9 \times 10^{-3}} \approx 51.3$, so $T \approx ${dec(ex4.T60, 3)}$ °C.`,
      ],
      v: rhoPlot,
      n: 'Warming by sixty degrees raises the resistance by alpha times sixty, about twenty three per cent, to nearly sixty two ohms. Working backwards, a rise of ten ohms, a fifth of the original, needs about fifty one degrees of warming, so the coil reaches sixty ohms at about seventy one degrees Celsius. Resistance thermometers use exactly this effect.',
    }),
    sl('check', 'Quick check: temperature', {
      b: 'Judge the assertion and the reason.',
      v: rhoPlot,
      chk: 'semi-ar',
      n: 'What changes most when a semiconductor is heated: the number of carriers or the time between collisions?',
    }),
    sl('concept', 'Electrical power and energy', {
      b: r`The rate at which electrical energy is converted:
$$P = VI = I^2R = \dfrac{V^2}{R}$$
Energy $W = Pt$. Commercial unit: **1 kilowatt hour** (kW h, “unit”) $= 1000 \times 3600 = 3.6 \times 10^{6}$ J.`,
      ul: ['Joule heating $I^2Rt$ heats heaters, irons and toasters; it wastes energy in cables.', 'Power is transmitted at high voltage so that the current, and the $I^2R$ loss, is small.'],
      v: table(['Formula', 'Use when'], [['P = VI', 'V and I known'], ['P = I²R', 'Same current (series)'], ['P = V²/R', 'Same voltage (parallel, mains)']], 'Table of the three power formulas and when to use each'),
      n: 'Electrical power is voltage times current, which can also be written I squared R or V squared over R. Choose the form that uses the quantity that is the same: I squared R for things in series, V squared over R for appliances on the mains. Energy is power times time. The board measures it in kilowatt hours, each worth three point six million joules.',
    }),
    sl('example', 'Worked example 5: a heater on a low supply', {
      b: r`A heater is rated 1000 W at 230 V. Find its resistance and current, and its power if the supply falls to 200 V (assume R unchanged).`,
      ul: [
        r`Step 1 — $R = \dfrac{V^2}{P} = \dfrac{230^2}{1000} = ${dec(ex5.R, 3)}$ Ω; $I = \dfrac{P}{V} = \dfrac{1000}{230} \approx ${dec(ex5.I, 3)}$ A.`,
        r`Step 2 — $P' = \dfrac{200^2}{${dec(ex5.R, 3)}} \approx ${dec(ex5.P2, 3)}$ W.`,
      ],
      v: viPlot,
      n: 'From the rating, the resistance is two hundred and thirty squared over a thousand, about fifty three ohms, and the current is about four point three amperes. On a low supply of two hundred volts the power falls with the square of the voltage, to about seven hundred and fifty six watts: a thirteen per cent drop in voltage costs about a quarter of the heat.',
    }),
    sl('example', 'Worked example 6: a household bill', {
      b: r`A home uses a 2.0 kW heater for 3 h, a 60 W lamp for 8 h and a 75 W fan for 10 h every day. Find the energy used in 30 days and the bill at ₹7 per kW h.`,
      ul: [
        r`Step 1 — daily: $2.0 \times 3 + 0.060 \times 8 + 0.075 \times 10 = 6.0 + 0.48 + 0.75 = ${dec(ex6.day, 3)}$ kW h.`,
        r`Step 2 — 30 days: $${dec(ex6.day, 3)} \times 30 = ${dec(ex6.month, 4)}$ kW h; bill $= ${dec(ex6.month, 4)} \times 7 \approx$ ₹${ex6.bill.toFixed(0)}.`,
      ],
      v: table(['Appliance', 'Power', 'Hours per day', 'kW h per day'], [['Heater', '2.0 kW', '3', '6.0'], ['Lamp', '60 W', '8', '0.48'], ['Fan', '75 W', '10', '0.75']], 'Worked table of daily energy: heater 6.0, lamp 0.48 and fan 0.75 kilowatt hours'),
      n: 'Convert each power to kilowatts and multiply by hours: the heater uses six units a day, the lamp about half a unit and the fan three quarters of a unit, seven point two three in all. Over thirty days that is about two hundred and seventeen units, and at seven rupees a unit the bill comes to about fifteen hundred rupees. The heater dominates.',
    }),
    sl('check', 'Quick check: power on a lower voltage', {
      b: 'Choose the correct option.',
      v: viPlot,
      chk: 'halfV-mcq',
      n: 'For a fixed resistance, how does power depend on voltage?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Resistance', '$R = \\rho l/A$; G = 1/R, σ = 1/ρ'],
          ['Stretching', 'Length × n (same volume): R × n²'],
          ['Ohmic', 'Straight V–I line through the origin'],
          ['Temperature', 'Metals: ρ rises (τ falls); semiconductors: ρ falls (n rises)'],
          ['Power', '$P = VI = I^2R = V^2/R$'],
          ['Commercial unit', '1 kW h = 3.6 × 10⁶ J'],
        ],
        'Summary table of resistance, stretching, ohmic devices, temperature dependence, power and the kilowatt hour',
      ),
      n: 'To sum up: resistance is resistivity times length over area, and stretching a wire raises it as the square of the stretch. Ohmic conductors have straight V–I graphs through the origin. Metals get more resistive when heated, semiconductors less. Power is V I, I squared R or V squared over R, and electricity is sold by the kilowatt hour, three point six megajoules.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'For stretching problems, keep the volume constant: $A_2 = A/n$ when $l_2 = nl$.',
        'Use $R_T = R_0[1 + \\alpha\\Delta T]$ with ΔT in °C (or K).',
        'Billing: kW × h = kW h; multiply by the rate per unit.',
        'Explain temperature dependence through n and τ in ρ = m/(ne²τ).',
      ],
      v: table(['Asked', 'Key point'], [['1 kW h in J?', '3.6 × 10⁶ J'], ['Wire stretched to 3l?', 'R × 9'], ['Why does a lamp’s V–I graph curve?', 'Filament heats; R rises']], 'Table of common questions and the key point for each'),
      n: 'In stretching problems, keep the volume fixed so that the area falls as the length rises. Use the temperature-coefficient formula with the change in temperature. For bills, multiply kilowatts by hours to get units, then by the price. And whenever temperature effects come up, explain them using the carrier density n and the relaxation time tau.',
    }),
  ],
});
