// ch09 Mechanical Properties of Fluids — two decks: Part 1 (t01–t02) pressure, Pascal's law, continuity and Bernoulli's principle;
// Part 2 (t03–t04) viscosity, Stokes' law, terminal velocity, Reynolds number and surface tension. Every number comes from data.mjs.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, RHO, RHO_HG, PATM, S_W, R6 } from './phys.mjs';
import { BARO, e1, e3, e4, e5, e6, s1, s2, s3, s4, s5, s6 } from './data.mjs';
import * as G from './svgs.mjs';

const KC = (2 * S_W) / (RHO * g) * 1e5; // h (cm) = KC / r (mm) for water in a clean glass tube
const kp = (x) => dec(x / 1000, 4);
/** Plain-text scientific notation with Unicode superscripts, 3 significant figures. */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const un = (x) => {
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = Number((x / 10 ** e).toPrecision(3));
  return `${m.toFixed(2)} × 10${String(e).split('').map((c) => SUP[c]).join('')}`;
};

// ---------------------------------------------------------------- visuals
export const V = {
  depth: svgV(G.DEPTH_FIG, 'Bars showing the absolute pressure in water at depths of 0, 10 and 20 metres, each an atmospheric part plus a part rho g h', 'Pressure grows in proportion to depth.'),
  baro: svgV(G.BARO_FIG, 'A mercury barometer with a column 760 millimetres high above the level in the trough', 'The column balances the atmosphere.'),
  lift: svgV(G.LIFT_FIG, 'A hydraulic lift with a narrow and a wide piston and the work in equal to the work out', 'Small force over a long distance, large force over a short one.'),
  pipe: svgV(G.PIPE_FIG, 'A hose narrowing into a nozzle with crowded streamlines and a higher speed', 'Where the streamlines crowd, the speed is larger.'),
  tank: svgV(G.TANK_FIG, 'A tank with a hole 0.50 metres below the surface and the parabolic jet that leaves it', 'The jet speed depends only on the depth of the hole.'),
  venturi: svgV(G.VENTURI_FIG, 'A Venturi meter with two open tubes showing a lower liquid level over the narrow throat', 'Higher speed, lower pressure.'),
  aero: svgV(G.AERO_FIG, 'An aerofoil with crowded streamlines above it and wider ones below', 'Faster air above, lower pressure above, lift upward.'),
  shear: svgV(G.SHEAR_FIG, 'A liquid film between a fixed and a moving plate with layer speeds growing linearly with distance', 'Viscous force opposes the sliding of layers.'),
  stokes: svgV(G.STOKES_FIG, 'A steel ball falling at terminal speed in oil with weight, upthrust and drag drawn to scale', 'At terminal speed: weight = upthrust + drag.'),
  film: svgV(G.FILM_FIG, 'A soap film on a U-shaped wire with a sliding wire pulled out by 5.0 centimetres', 'Two surfaces pull on the wire.'),
  contact: svgV(G.CONTACT_FIG, 'Two drops on glass with acute and obtuse angles of contact', 'The angle is measured inside the liquid.'),
  bubble: svgV(G.BUBBLE_FIG, 'Force balance on half of a drop and half of a soap bubble giving 2S over R and 4S over R', 'A soap bubble has two surfaces.'),
  cap: svgV(G.CAP_FIG, 'Water rising and mercury falling in thin glass tubes', 'Wetting liquids rise; non-wetting liquids fall.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotDepth = plot(
  {
    x: ax('depth h (m)', 0, 30),
    y: ax('absolute pressure (kPa)', 0, 420),
    functions: [{ expr: `${kp(PATM)}+${R6((RHO * g) / 1000)}*x`, label: 'P = P₀ + ρ g h (kPa)', domain: [0, 30] }],
    points: [{ at: [10, R6(PATM / 1000 + (RHO * g * 10) / 1000)], label: '10 m: 199.3 kPa' }, { at: [20, R6(PATM / 1000 + (RHO * g * 20) / 1000)], label: '20 m: 297.3 kPa' }],
  },
  'Straight line of absolute pressure in water against depth, starting at 101.3 kilopascals at the surface and rising by 9.8 kilopascals for every metre',
  'Each 10 m of water adds about one atmosphere.',
);
export const plotRange = plot(
  {
    x: ax('hole depth h below the surface (m)', 0, 2),
    y: ax('horizontal range R (m)', 0, 2.3),
    functions: [{ expr: '2*sqrt(x*(2-x))', label: 'R = 2√(h(H − h)), H = 2.0 m', domain: [0, 2] }],
    vlines: [{ x: 1, label: 'h = H/2: largest range, 2.0 m', dashed: true }],
    points: [{ at: [e5.h, R6(e5.R)], label: 'h = 0.50 m: R = 1.73 m' }],
  },
  'Range of the jet against the depth of the hole in a tank 2.0 metres deep: a symmetric arch with its maximum of 2.0 metres at a depth of 1.0 metre',
  'Holes at h and H − h give the same range.',
);
export const plotTerm = plot(
  {
    x: ax('time t (s)', 0, 0.02),
    y: ax('speed v (cm/s)', 0, 4.4),
    functions: [{ expr: `${R6(s2.vt * 100)}*(1-exp(-x/${R6(s2.tau)}))`, label: 'v = v_t (1 − e^(−t/τ))', domain: [0, 0.02] }],
    hlines: [{ y: R6(s2.vt * 100), label: `terminal speed ${dec(s2.vt * 100, 3)} cm/s`, dashed: true }],
    vlines: [{ x: R6(s2.tau), label: `τ = ${dec(s2.tau * 1000, 3)} ms`, dashed: true }],
  },
  'Speed of a steel ball released from rest in oil: it rises quickly and levels off at the terminal speed of 3.76 centimetres per second within about twenty milliseconds',
  'The speed approaches v_t and never exceeds it.',
);
export const plotCap = plot(
  {
    x: ax('tube radius r (mm)', 0.2, 3),
    y: ax('rise h (cm)', 0, 8),
    functions: [{ expr: `${R6(KC)}/x`, label: 'h = 2S/(ρ g r) for water', domain: [0.2, 3] }],
    points: [{ at: [0.5, R6(KC / 0.5)], label: 'r = 0.50 mm: h = 2.94 cm' }],
  },
  'Capillary rise of water against the radius of the tube: a falling hyperbola, 2.94 centimetres at a radius of 0.50 millimetres and half of that at twice the radius',
  'Rise is inversely proportional to the tube radius.',
);

// ---------------------------------------------------------------- tables
const T_UNITS = table(
  ['Unit', 'Value in pascal', 'Where it is used'],
  [
    ['1 pascal (Pa)', '1 N m⁻²', 'SI unit'],
    ['1 atmosphere (atm)', dec(PATM, 4) + ' Pa', 'standard atmospheric pressure'],
    ['1 bar', '1.000 × 10⁵ Pa', 'weather maps, gas cylinders'],
    ['1 mm of mercury (torr)', `${dec(RHO_HG * g * 0.001, 3)} Pa`, 'blood pressure, barometers'],
    ['1 m of water', `${dec(RHO * g, 4)} Pa`, 'pump heads, water towers'],
  ],
  'Table of pressure units: pascal, atmosphere, bar, millimetre of mercury and metre of water with their values in pascal',
);
const T_GAUGE = table(
  ['Quantity', 'Meaning', 'Example from this lesson'],
  [
    ['Atmospheric pressure P₀', 'pressure of the air outside', `${dec(PATM, 4)} Pa`],
    ['Gauge pressure', 'absolute minus atmospheric', `ρ g h = ${dec(e1.gauge, 4)} Pa at 18 m depth`],
    ['Absolute pressure', 'gauge plus atmospheric', `${dec(e1.abs, 4)} Pa at 18 m depth`],
    ['Barometer column', 'h = P₀ / (ρ g)', `${dec(BARO.h * 1000, 3)} mm of mercury, ${dec(BARO.hw, 3)} m of water`],
  ],
  'Table relating atmospheric, gauge and absolute pressure with values for a tap 18 metres below the water level of a tank',
);
const T_PASCAL = table(
  ['Device', 'What the small piston does', 'Why it works'],
  [
    ['Hydraulic lift or jack', 'a small push lifts a heavy load', 'same pressure, larger area gives larger force'],
    ['Hydraulic brake', 'a pedal push acts on every wheel', 'pressure reaches all slave pistons equally'],
    ['Hydraulic press', 'a small force squeezes metal sheets', 'force ratio equals area ratio'],
  ],
  'Table of applications of Pascal law: hydraulic lift, hydraulic brake and hydraulic press',
);
const T_E3 = table(
  ['Quantity', 'Narrow piston (r = 3.0 cm)', 'Wide piston (r = 12 cm)'],
  [
    ['Area ratio', '1', String(e3.ratio)],
    ['Force', `${dec(e3.F1, 3)} N`, `${dec(e3.W, 3)} N`],
    ['Distance moved', `${e3.d1} m`, `${e3.d2} m`],
    ['Work done', `${dec(e3.work, 4)} J`, `${dec(e3.work, 4)} J`],
  ],
  'Table comparing force, distance moved and work for the narrow and the wide piston of a hydraulic lift',
);
const T_BERN = table(
  ['Term in Bernoulli equation', 'Meaning', 'Unit'],
  [
    ['P', 'pressure energy per unit volume', 'J m⁻³ = Pa'],
    ['½ ρ v²', 'kinetic energy per unit volume', 'J m⁻³ = Pa'],
    ['ρ g h', 'potential energy per unit volume', 'J m⁻³ = Pa'],
    ['P + ½ρv² + ρgh', 'total, constant along a streamline', 'J m⁻³ = Pa'],
  ],
  'Table of the three terms of the Bernoulli equation, each an energy per unit volume',
);
const T_E4 = table(
  ['Part of the hose', 'Radius', 'Area', 'Speed'],
  [
    ['Hose', '3.0 cm', `${un(Math.PI * e4.r1 ** 2)} m²`, `${dec(e4.v1, 2)} m s⁻¹`],
    ['Nozzle', '1.5 cm', `${un(Math.PI * e4.r2 ** 2)} m²`, `${dec(e4.v2, 2)} m s⁻¹`],
  ],
  'Table of the radius, area and water speed in the wide hose and in the narrow nozzle',
);
const T_APPS = table(
  ['Situation', 'Where the air or liquid is faster', 'Result'],
  [
    ['Venturi meter', 'in the narrow throat', 'lower pressure, lower liquid level in the throat tube'],
    ['Aerofoil', 'above the curved upper surface', 'lower pressure above, dynamic lift'],
    ['Paint sprayer or atomiser', 'across the top of the narrow tube', 'liquid pushed up by the higher outside pressure'],
    ['Storm over a roof', 'outside, above the roof', 'higher pressure inside can lift the roof'],
  ],
  'Table of applications of Bernoulli principle: Venturi meter, aerofoil, sprayer and a roof in a storm',
);
const T_E6 = table(
  ['Quantity', 'Wide part', 'Throat'],
  [
    ['Diameter', '8.0 cm', '4.0 cm'],
    ['Area ratio A₁ : A₂', '4 : 1', ''],
    ['Speed', `${dec(e6.v1, 2)} m s⁻¹`, `${dec(e6.v2, 2)} m s⁻¹`],
    ['Pressure difference', `${dec(e6.dP, 4)} Pa`, `= ½ρ(v₂² − v₁²)`],
  ],
  'Table of diameters, speeds and the pressure difference of a Venturi meter',
);
const T_VISC = table(
  ['Fluid (about 20 °C)', 'Viscosity η (Pa s)', 'Remark'],
  [
    ['Air', '1.8 × 10⁻⁵', 'η of a gas rises as it gets hotter'],
    ['Water', '1.0 × 10⁻³', 'η of a liquid falls as it gets hotter'],
    ['Glycerine', '1.4', 'about 1400 times as viscous as water'],
  ],
  'Table of the coefficient of viscosity of air, water and glycerine at about twenty degrees Celsius and how it changes with temperature',
);
const T_TERM = table(
  ['Change', 'Effect on terminal speed v_t = 2r²(ρ − σ)g / 9η'],
  [
    ['radius doubled', 'v_t becomes 4 times (varies as r²)'],
    ['liquid η doubled', 'v_t halves (varies as 1/η)'],
    ['sphere denser, ρ − σ larger', 'v_t larger (varies as ρ − σ)'],
    ['ρ = σ (neutrally buoyant)', 'v_t = 0: the ball does not sink'],
  ],
  'Table showing how the terminal speed depends on radius, viscosity and density difference',
);
const T_RE = table(
  ['Situation', 'Re = ρ v d / η', 'Flow'],
  [
    ['water, d = 1.0 cm, v = 0.05 m s⁻¹', dec(s3.Re1, 3), 'laminar (below about 1000)'],
    ['water, d = 1.5 cm, v = 1.5 m s⁻¹', dec(s3.Re2, 4), 'turbulent (above about 2000)'],
    ['between about 1000 and 2000', 'unstable', 'may switch between the two'],
  ],
  'Table of two Reynolds numbers for water in pipes and the kind of flow each gives',
);
const T_S = table(
  ['Liquid (about 20 °C)', 'Surface tension S (N m⁻¹)'],
  [
    ['Water', '0.072'],
    ['Soap solution', 'about 0.03'],
    ['Ethyl alcohol', 'about 0.022'],
    ['Mercury', '0.465'],
  ],
  'Table of the surface tension of water, soap solution, ethyl alcohol and mercury',
);
const T_CONTACT = table(
  ['Angle of contact θ', 'Liquid and solid', 'Meniscus', 'In a narrow tube'],
  [
    ['θ < 90°', 'water on clean glass (θ close to 0°)', 'concave', 'liquid rises'],
    ['θ > 90°', 'mercury on glass (θ about 140°)', 'convex', 'liquid is depressed'],
    ['θ = 90°', 'flat surface', 'flat', 'no rise or fall'],
  ],
  'Table of angle of contact, meniscus shape and rise or fall in a narrow tube',
);
const T_E6B = table(
  ['Tube radius (mm)', 'Rise of water (cm)'],
  [0.25, 0.5, 1, 2].map((rr) => [String(rr), dec(KC / rr, 3)]),
  'Table of the capillary rise of water in tubes of radius 0.25, 0.50, 1.0 and 2.0 millimetres',
);
export const TABLES = { T_UNITS, T_GAUGE, T_PASCAL, T_E3, T_BERN, T_E4, T_APPS, T_E6, T_VISC, T_TERM, T_RE, T_S, T_CONTACT, T_E6B };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Mechanical Properties of Fluids — Part 1: Pressure, Pascal’s law, continuity and Bernoulli’s principle',
  goals: [
    'Calculate pressure, gauge pressure and absolute pressure at a depth in a liquid',
    'Apply Pascal’s law to hydraulic lifts and brakes',
    'Apply the equation of continuity and Bernoulli’s principle to efflux, Venturi meters and dynamic lift',
  ],
  slides: [
    sl('title', 'Mechanical Properties of Fluids', {
      b: 'Part 1 — how a fluid at rest pushes on its surroundings, and how a fluid in steady motion trades pressure for speed.',
      v: V.depth,
      n: 'A diver feels her ears squeezed as she goes deeper. A water tower sends water to the top floor of a building. An aeroplane stays in the air. In this part we learn what pressure is, how it changes with depth, how a small force can lift a car, and how the pressure in moving water is linked to its speed.',
    }),
    sl('concept', 'Pressure', {
      b: r`Pressure is the normal force on a surface divided by its area: $P = \dfrac{F}{A}$.`,
      ul: [
        'It is a scalar: in a fluid at rest it acts equally in all directions at a point and always at right angles to any surface.',
        'SI unit: pascal (Pa) = newton per square metre.',
        'The same force on a smaller area gives a larger pressure: a needle pierces, a flat palm does not.',
      ],
      v: T_UNITS,
      n: 'Pressure is the force pressing at right angles on a surface, divided by the area of that surface. It is a scalar. In a fluid at rest it pushes equally in every direction at a given point. Its unit is the pascal, one newton per square metre. The same force over a smaller area gives a larger pressure, which is why a needle goes in easily.',
    }),
    sl('diagram', 'Pressure at a depth', {
      b: r`Take a vertical column of liquid of area $A$ and height $h$ at rest. Its weight $\rho A h g$ is carried by the extra pressure on its base:`,
      m: [r`P = P_0 + \rho g h`],
      ul: [
        r`$P_0$ is the pressure at the free surface (usually the atmosphere); $\rho g h$ is the **gauge pressure** at depth $h$.`,
        'Pressure depends only on depth, density and g: not on the shape of the vessel or the amount of liquid.',
        'All points at the same level in the same liquid, at rest and connected, have the same pressure.',
      ],
      v: V.depth,
      n: 'Think of a vertical column of liquid. Its weight must be carried by the pressure difference between its bottom and its top. That gives the pressure at depth h as the surface pressure plus rho g h. The extra part depends only on the depth, the density and g, not on the shape of the vessel. Points at the same level in a connected liquid at rest have the same pressure.',
    }),
    sl('example', 'Worked example 1: a tap below a tank', {
      b: r`An open overhead tank in a Pune apartment block has its water surface ${e1.h} m above a tap on the ground floor. Take $\rho = 1000$ kg m$^{-3}$, $g = 9.8$ m s$^{-2}$ and $P_0 = 1.013 \times 10^{5}$ Pa. Find the gauge pressure and the absolute pressure at the tap.`,
      ul: [
        r`Gauge pressure $= \rho g h = 1000 \times 9.8 \times ${e1.h} = ${sci(e1.gauge, 4)}$ Pa.`,
        r`Absolute pressure $= P_0 + \rho g h = 1.013 \times 10^{5} + ${sci(e1.gauge, 4)} = ${sci(e1.abs, 4)}$ Pa.`,
        'The absolute pressure is about 2.7 times the atmospheric pressure.',
      ],
      v: plotDepth,
      n: 'The water surface is eighteen metres above the tap. The gauge pressure is rho g h, which is one thousand times nine point eight times eighteen, about one point seven six times ten to the five pascal. Adding the atmospheric pressure of one point zero one three times ten to the five gives about two point seven eight times ten to the five pascal. That is almost three atmospheres.',
    }),
    sl('check', 'Quick check: pressure at a depth', {
      b: 'Choose the correct option.',
      v: plotDepth,
      chk: 'abs-mcq',
      n: 'Remember to decide whether the question asks for gauge pressure or absolute pressure.',
    }),
    sl('concept', 'Atmospheric, gauge and absolute pressure', {
      b: 'A barometer is a closed tube of mercury inverted in a trough: the column stands at the height where its pressure equals the atmosphere.',
      m: [r`P_0 = \rho g h`],
      ul: [
        r`Standard atmosphere: $1.013 \times 10^{5}$ Pa $\approx$ 760 mm of mercury.`,
        'Absolute pressure = gauge pressure + atmospheric pressure. A tyre gauge or a blood-pressure meter shows gauge pressure.',
        'The height of a barometer column does not change if the tube is tilted or is wider; only the vertical height counts.',
      ],
      v: V.baro,
      n: 'A mercury barometer is a closed glass tube, filled with mercury and turned upside down in a trough. The column stands at the height where its weight per unit area equals the atmospheric pressure. Absolute pressure is gauge pressure plus atmospheric pressure. Tilting or widening the tube does not change the vertical height of the column.',
    }),
    sl('example', 'Worked example 2: how tall is a barometer column?', {
      b: r`Find the height of the column of mercury ($13\,600$ kg m$^{-3}$) and, for comparison, of water that atmospheric pressure $1.013 \times 10^{5}$ Pa can support. Use $g = 9.8$ m s$^{-2}$.`,
      ul: [
        r`Mercury: $h = \dfrac{P_0}{\rho g} = \dfrac{1.013 \times 10^{5}}{13600 \times 9.8} \approx ${dec(BARO.h, 3)}$ m, that is 760 mm.`,
        r`Water: $h = \dfrac{1.013 \times 10^{5}}{1000 \times 9.8} \approx ${dec(BARO.hw, 3)}$ m, about 13.6 times taller.`,
        'This is why mercury, a very dense liquid, is used in barometers.',
      ],
      v: T_GAUGE,
      n: 'For mercury, divide the atmospheric pressure by rho g: about zero point seven six metres, which is seven hundred and sixty millimetres. A water barometer would need a column of about ten point three metres, thirteen point six times taller, because water is that much less dense. That is why barometers use mercury.',
    }),
    sl('concept', 'Pascal’s law', {
      b: 'A change of pressure applied to an enclosed fluid is transmitted undiminished to every point of the fluid and to the walls of the container.',
      ul: [
        'It follows from the fact that pressure in a fluid at rest depends only on depth: add the same extra pressure at the top and every point gains the same amount.',
        'It is the principle behind the hydraulic lift, the hydraulic press and hydraulic brakes.',
        'Liquids are nearly incompressible, so the pressure change is passed on at once.',
      ],
      v: T_PASCAL,
      n: 'Pascal’s law says that when you change the pressure on an enclosed fluid, the change reaches every point of the fluid and the walls of the vessel undiminished. It follows from the fact that pressure at rest depends only on depth. Hydraulic lifts, presses and brakes all use it, and they work well because liquids are almost incompressible.',
    }),
    sl('diagram', 'The hydraulic lift', {
      b: r`The same pressure acts on both pistons, so $\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2}$ and $F_2 = F_1\,\dfrac{A_2}{A_1}$.`,
      ul: [
        'A small force on the narrow piston gives a large force on the wide piston: a force multiplier.',
        'The liquid is incompressible, so the volumes moved are equal: $A_1 d_1 = A_2 d_2$. The narrow piston moves farther.',
        'Work in = work out: the lift multiplies force, not energy.',
      ],
      v: V.lift,
      n: 'The pressure is the same on both pistons, so the force on the wide piston is the force on the narrow piston times the ratio of the areas. A small push thus supports a heavy load. But the liquid volume is conserved, so the narrow piston must travel much farther than the wide one. The work done on each piston is the same. The machine multiplies force, not energy.',
    }),
    sl('example', 'Worked example 3: lifting a car', {
      b: r`A garage lift has a narrow piston of radius 3.0 cm and a wide piston of radius 12 cm. A car of mass 1500 kg stands on the wide piston ($g = 9.8$ m s$^{-2}$). Find the force on the narrow piston, the distance it moves when the car rises ${e3.d2} m, and the gauge pressure in the liquid.`,
      ul: [
        r`$W = mg = 1500 \times 9.8 = ${e3.W}$ N; area ratio $= \left(\dfrac{12}{3.0}\right)^2 = ${e3.ratio}$.`,
        r`$F_1 = \dfrac{W}{${e3.ratio}} = \dfrac{${e3.W}}{${e3.ratio}} \approx ${dec(e3.F1, 3)}$ N.`,
        r`$d_1 = ${e3.ratio} \times ${e3.d2} = ${e3.d1}$ m; work $= ${dec(e3.F1, 3)} \times ${e3.d1} \approx ${dec(e3.work, 4)}$ J on each side.`,
        r`$P = \dfrac{F_1}{A_1} = \dfrac{${e3.F1}}{\pi (0.030)^2} \approx ${sci(e3.p, 3)}$ Pa (gauge).`,
      ],
      v: T_E3,
      n: 'The car weighs fourteen thousand seven hundred newtons. The radius ratio is four, so the area ratio is sixteen, and the force needed on the narrow piston is about nine hundred and nineteen newtons. To raise the car by fifteen centimetres, the narrow piston must move sixteen times as far, two point four metres. The work is about two thousand two hundred joules on both sides.',
    }),
    sl('check', 'Quick check: a hydraulic press', {
      b: 'Choose the correct option.',
      v: V.lift,
      chk: 'lift-mcq',
      n: 'Compare the areas of the two pistons, then decide how the forces and distances compare.',
    }),
    sl('concept', 'Streamline flow and the equation of continuity', {
      b: 'In **steady (streamline) flow** every particle passing a point follows the same path, the streamline; streamlines never cross.',
      m: [r`A_1 v_1 = A_2 v_2 = \text{constant}`],
      ul: [
        'For an incompressible fluid the volume flowing per second, A v, is the same at every cross-section.',
        'Where the pipe narrows the streamlines crowd together and the fluid speeds up.',
        'This is the idea behind putting a thumb over the end of a garden hose.',
      ],
      v: V.pipe,
      n: 'In steady streamline flow each particle follows the same path, and the paths never cross. If the fluid cannot be compressed, the volume passing every cross-section each second must be the same, so area times speed is constant. Where a pipe narrows, the streamlines crowd together and the fluid moves faster, as when you put a thumb over a garden hose.',
    }),
    sl('example', 'Worked example 4: a fire hose', {
      b: r`Water flows at ${dec(e4.v1, 2)} m s$^{-1}$ through a hose of radius 3.0 cm that ends in a nozzle of radius 1.5 cm. Find the speed at the nozzle and the volume flow rate.`,
      ul: [
        r`$v_2 = v_1 \dfrac{A_1}{A_2} = ${dec(e4.v1, 2)} \times \left(\dfrac{3.0}{1.5}\right)^2 = ${dec(e4.v2, 2)}$ m s$^{-1}$.`,
        r`$Q = A_1 v_1 = \pi (0.030)^2 \times ${dec(e4.v1, 2)} \approx ${sci(e4.Q, 3)}$ m$^3$ s$^{-1}$, about ${dec(e4.Q * 1000, 3)} litres per second.`,
      ],
      v: T_E4,
      n: 'The radius halves at the nozzle, so the area falls to a quarter and the speed rises to four times, eight metres per second. The volume flow rate is the hose area times the hose speed, about five point six five times ten to the minus three cubic metres per second, which is about five point six five litres every second.',
    }),
    sl('concept', 'Bernoulli’s principle', {
      b: 'For steady, non-viscous, incompressible flow along a streamline, the energy per unit volume is constant:',
      m: [r`P + \tfrac{1}{2}\rho v^2 + \rho g h = \text{constant}`],
      ul: [
        'It is the work–energy theorem for a flowing fluid: pressure does work, and the energy goes into speed and height.',
        'At the same height, higher speed means lower pressure.',
        'It does not apply to turbulent or strongly viscous flow, or to compressible flow.',
      ],
      v: T_BERN,
      n: 'Bernoulli’s principle is the work energy theorem for a moving fluid. Along a streamline, pressure plus half rho v squared plus rho g h stays constant. It assumes steady flow of a fluid that is incompressible and has no viscosity. At the same height, a faster fluid has a lower pressure. It does not hold for turbulent flow.',
    }),
    sl('example', 'Worked example 5: speed of efflux', {
      b: r`An open tank of water is ${dec(e5.H, 2)} m deep. A small hole is made ${dec(e5.h, 2)} m below the surface. Find the speed of the water leaving the hole and where the jet lands on the ground, taking the tank base on the ground ($g = 9.8$ m s$^{-2}$).`,
      ul: [
        r`Bernoulli between the surface ($P_0$, $v \approx 0$) and the hole ($P_0$, $v$): $v = \sqrt{2gh} = \sqrt{2 \times 9.8 \times ${dec(e5.h, 2)}} \approx ${dec(e5.v, 3)}$ m s$^{-1}$ (Torricelli).`,
        r`The jet leaves horizontally and falls ${dec(e5.fall, 2)} m: $t = \sqrt{\dfrac{2 \times ${dec(e5.fall, 2)}}{9.8}} \approx ${dec(e5.t, 3)}$ s.`,
        r`Range $R = v t \approx ${dec(e5.v, 3)} \times ${dec(e5.t, 3)} \approx ${dec(e5.R, 3)}$ m.`,
      ],
      v: V.tank,
      n: 'Apply Bernoulli between the surface and the hole. Both are open to the air, and the surface moves very slowly, so the speed at the hole is the square root of two g h, about three point one three metres per second. That is the speed of a body that fell freely through the same depth. The jet then falls one point five metres, which takes about half a second, and lands about one point seven metres away.',
    }),
    sl('concept', 'Where should the hole be?', {
      b: r`For a hole at depth $h$ in a tank of depth $H$ standing on the ground: $R = 2\sqrt{h\,(H - h)}$.`,
      ul: [
        'The range is largest, equal to H, when the hole is half-way down (h = H/2).',
        'Holes at depths h and H − h give the same range.',
        'The speed depends only on the depth of the hole, not on the density of the liquid.',
      ],
      v: plotRange,
      n: 'The range of the jet depends on the speed and on the time of fall. A hole near the surface gives a slow jet that falls a long way; a hole near the base gives a fast jet that falls only a little. The range is largest when the hole is half way down. Two holes at equal distances above and below the middle give the same range.',
    }),
    sl('diagram', 'The Venturi meter', {
      b: 'A horizontal pipe with a narrow throat. Continuity makes the fluid faster in the throat; Bernoulli makes the pressure lower there.',
      m: [r`P_1 - P_2 = \tfrac{1}{2}\rho\,(v_2^2 - v_1^2) = \rho g \Delta h`],
      ul: [
        'The height difference Δh of the liquid in two open tubes measures the pressure difference.',
        r`With $v_2 = v_1 A_1/A_2$ one gets $v_1 = \sqrt{\dfrac{2(P_1 - P_2)}{\rho\,[(A_1/A_2)^2 - 1]}}$, and the flow rate $Q = A_1 v_1$.`,
      ],
      v: V.venturi,
      n: 'In a Venturi meter the fluid speeds up in the narrow throat, so its pressure falls. Two open tubes show the pressure difference as a difference in liquid height. Combining continuity with Bernoulli’s equation gives the speed in the wide part, and the flow rate is that speed times the area. Venturi meters measure the flow in pipes.',
    }),
    sl('example', 'Worked example 6: reading a Venturi meter', {
      b: r`Water flows through a horizontal pipe of diameter 8.0 cm with a throat of diameter 4.0 cm. The pressure in the throat is ${dec(e6.dP, 4)} Pa lower than in the wide part. Find the speeds and the flow rate ($\rho = 1000$ kg m$^{-3}$).`,
      ul: [
        r`$\dfrac{A_1}{A_2} = \left(\dfrac{8.0}{4.0}\right)^2 = 4$, so $v_2 = 4 v_1$.`,
        r`$P_1 - P_2 = \tfrac{1}{2}\rho (16 v_1^2 - v_1^2)$, so $${dec(e6.dP, 4)} = 500 \times 15\, v_1^2$ and $v_1 = \sqrt{\dfrac{${dec(e6.dP, 4)}}{7500}} = ${dec(e6.v1, 2)}$ m s$^{-1}$.`,
        r`$v_2 = ${dec(e6.v2, 2)}$ m s$^{-1}$; $Q = A_1 v_1 = \pi (0.040)^2 \times ${dec(e6.v1, 2)} \approx ${sci(e6.Q, 3)}$ m$^3$ s$^{-1}$.`,
      ],
      v: T_E6,
      n: 'The diameter ratio is two, so the area ratio is four and the throat speed is four times the speed in the wide part. Half rho times sixteen minus one times v one squared equals the pressure difference. That gives a speed of one metre per second in the wide part and four metres per second in the throat. The flow rate is about five litres per second.',
    }),
    sl('concept', 'Dynamic lift', {
      b: 'An aerofoil, a spinning ball or a tilted kite pushes the air so that the speed is higher on one side.',
      ul: [
        'Streamlines crowd above the wing: the air is faster and the pressure lower there; below the wing the pressure is higher.',
        r`Lift $\approx (P_{\text{below}} - P_{\text{above}})\,A = \tfrac{1}{2}\rho\,(v_{\text{above}}^2 - v_{\text{below}}^2)\,A$.`,
        'A spinning ball drags air round with it and curves in flight (the Magnus effect).',
      ],
      v: V.aero,
      n: 'An aerofoil is shaped and tilted so that the air moves faster over its upper surface. By Bernoulli’s principle the pressure above is lower than the pressure below, and the difference times the wing area gives an upward force, the dynamic lift. A spinning ball drags air with it, which is why it curves in flight.',
    }),
    sl('check', 'Quick check: Bernoulli’s principle', {
      b: 'Choose the correct option.',
      v: T_APPS,
      chk: 'bern-mcq',
      n: 'Decide where the fluid moves faster and what Bernoulli’s principle then says about the pressure.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Pressure', 'P = F/A; at depth h: P = P₀ + ρ g h'],
          ['Gauge and barometer', 'gauge = P − P₀; P₀ = ρ g h = 1.013 × 10⁵ Pa = 760 mm Hg'],
          ['Pascal’s law', 'pressure change is transmitted undiminished; F₂ = F₁ A₂/A₁'],
          ['Continuity', 'A₁v₁ = A₂v₂: narrower pipe, faster flow'],
          ['Bernoulli', 'P + ½ρv² + ρgh = constant along a streamline'],
          ['Applications', 'efflux v = √(2gh); Venturi meter; dynamic lift'],
        ],
        'Summary table of pressure, Pascal law, continuity and Bernoulli principle',
      ),
      n: 'To sum up. Pressure is force per unit area, and at depth h in a liquid it is the surface pressure plus rho g h. Pascal’s law lets a hydraulic device multiply force, though never energy. For steady flow the product of area and speed is constant, and Bernoulli’s principle keeps the sum of pressure, kinetic energy and potential energy per unit volume constant along a streamline.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State whether you are finding gauge or absolute pressure, and add P₀ only for absolute.',
        'In hydraulic problems use the area ratio (radius squared), and remember the distances move in the inverse ratio.',
        'Check the conditions before using Bernoulli: steady flow, no viscosity, along one streamline.',
        'Convert cm to m and L to m³ before substituting.',
      ],
      v: T_UNITS,
      n: 'Always say whether the pressure is gauge or absolute. In hydraulic problems the force ratio is the ratio of the areas, which is the square of the ratio of the radii, and the distances go the other way. Check that the flow is steady and the fluid is non viscous before using Bernoulli. And change centimetres to metres and litres to cubic metres first.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Mechanical Properties of Fluids — Part 2: Viscosity, Stokes’ law and surface tension',
  goals: [
    'Explain viscosity and use Stokes’ law and the terminal velocity of a falling sphere',
    'Use the Reynolds number to tell laminar from turbulent flow',
    'Explain surface tension, surface energy, angle of contact, excess pressure and capillary rise',
  ],
  slides: [
    sl('title', 'Viscosity and Surface Tension', {
      b: 'Part 2 — why honey flows slowly, why a raindrop does not accelerate for ever, and why a thin tube can lift water.',
      v: V.shear,
      n: 'Honey pours slowly, water pours fast. A raindrop falls at a steady speed. A needle can float on water, and water climbs up the thin wick of a lamp. In this part we meet viscosity, which opposes the flow of a fluid, and surface tension, which makes a liquid surface behave like a stretched skin.',
    }),
    sl('concept', 'Viscosity', {
      b: 'Viscosity is the internal friction of a fluid: layers moving at different speeds drag on each other.',
      m: [r`F = \eta A \dfrac{v}{d}`],
      ul: [
        r`$F$ is the force on a plate of area $A$ moving at speed $v$ over a fluid layer of thickness $d$; $v/d$ is the velocity gradient.`,
        r`$\eta$ is the coefficient of viscosity; SI unit pascal second (Pa s) = N s m$^{-2}$.`,
        'The layer next to a solid surface moves with it; layers farther away are dragged along.',
      ],
      v: V.shear,
      n: 'Imagine a fluid between a fixed plate and a moving plate. The layer touching each plate moves with it, and the layers in between slide over each other, with speed growing steadily from zero to the plate speed. The force needed to keep the top plate moving is eta times the area times the velocity gradient. The coefficient eta is the viscosity.',
    }),
    sl('concept', 'Viscosity of liquids and gases', {
      b: 'Typical values of η at about 20 °C:',
      ul: [
        'Liquids become less viscous as the temperature rises (honey flows faster when warm).',
        'Gases become more viscous as the temperature rises, because faster molecules exchange more momentum between layers.',
        'Viscosity is the reason a flowing fluid needs a pressure difference to keep moving.',
      ],
      v: T_VISC,
      n: 'Water has a viscosity of about one thousandth of a pascal second. Glycerine is more than a thousand times as viscous. Air is far less viscous than water. When the temperature rises, the viscosity of a liquid falls, but the viscosity of a gas rises. Viscosity is why a pressure difference is needed to keep a fluid flowing through a pipe.',
    }),
    sl('example', 'Worked example 1: sliding a plate on oil', {
      b: r`A flat plate of area ${dec(s1.A, 2)} m$^2$ is pulled at ${dec(s1.v, 2)} m s$^{-1}$ over a layer of oil ${dec(s1.d * 1000, 2)} mm thick on a fixed plate. The viscosity of the oil is ${dec(s1.eta, 2)} Pa s. Find the force needed.`,
      ul: [
        r`Velocity gradient $= \dfrac{v}{d} = \dfrac{${dec(s1.v, 2)}}{${s1.d}} = ${s1.v / s1.d}$ s$^{-1}$.`,
        r`$F = \eta A \dfrac{v}{d} = ${dec(s1.eta, 2)} \times ${dec(s1.A, 2)} \times ${s1.v / s1.d} = ${dec(s1.F, 2)}$ N.`,
        'Halving the oil thickness doubles the force needed.',
      ],
      v: V.shear,
      n: 'The velocity gradient is the plate speed divided by the oil thickness, which is zero point five over zero point zero zero two, two hundred and fifty per second. The force is the viscosity times the area times the gradient, point eight times point zero four times two hundred and fifty, which is eight newtons. Halve the thickness and the force doubles.',
    }),
    sl('check', 'Quick check: viscosity', {
      b: 'Choose the correct option.',
      v: T_VISC,
      chk: 'visc-mcq',
      n: 'Recall how the viscosity of a liquid and of a gas change when they are heated.',
    }),
    sl('concept', 'Stokes’ law and terminal velocity', {
      b: r`A small sphere of radius $r$ moving at speed $v$ through a fluid feels the viscous drag $F = 6\pi\eta r v$ (Stokes’ law).`,
      m: [r`v_t = \dfrac{2 r^2 (\rho - \sigma)\, g}{9\eta}`],
      ul: [
        r`A falling sphere speeds up until weight = upthrust + drag; then the net force is zero and it falls at the constant **terminal velocity** $v_t$.`,
        r`$\rho$ is the density of the sphere and $\sigma$ that of the fluid.`,
        'Stokes’ law holds for small spheres at low speed, where the flow is smooth.',
      ],
      v: V.stokes,
      n: 'A sphere falling through a fluid is pulled down by its weight and pushed up by the upthrust and by the viscous drag, six pi eta r v. As the speed grows the drag grows, until the three forces balance and the speed stops changing. That is the terminal velocity. Setting weight equal to upthrust plus drag gives two r squared times the density difference times g over nine eta.',
    }),
    sl('example', 'Worked example 2: a steel ball in oil', {
      b: r`A steel ball of radius ${dec(s2.r * 1000, 2)} mm (density ${s2.rs} kg m$^{-3}$) is released in oil of density ${s2.sg} kg m$^{-3}$ and viscosity ${dec(s2.eta, 2)} Pa s. Find its terminal velocity ($g = 9.8$ m s$^{-2}$) and check that the flow is smooth.`,
      ul: [
        r`$v_t = \dfrac{2 r^2 (\rho - \sigma) g}{9\eta} = \dfrac{2 \times (1.0 \times 10^{-3})^2 \times ${s2.rs - s2.sg} \times 9.8}{9 \times ${dec(s2.eta, 2)}} \approx ${sci(s2.vt, 3)}$ m s$^{-1}$, that is ${dec(s2.vt * 100, 3)} cm s$^{-1}$.`,
        r`Reynolds number $\approx \dfrac{\sigma v_t (2r)}{\eta} = \dfrac{${s2.sg} \times ${dec(s2.vt, 3)} \times 0.0020}{${dec(s2.eta, 2)}} \approx ${dec(s2.Re, 2)}$, far below 1: Stokes’ law is valid.`,
        r`It reaches this speed within about $\tau = \dfrac{2\rho r^2}{9\eta} \approx ${dec(s2.tau * 1000, 3)}$ ms.`,
      ],
      v: plotTerm,
      n: 'Put the numbers into the terminal velocity formula: radius one millimetre, density difference six thousand nine hundred, viscosity zero point four. The result is about three point seven six centimetres per second. The Reynolds number is only about zero point one seven, so the flow is smooth and Stokes’ law applies. The ball reaches this speed in a few milliseconds.',
    }),
    sl('concept', 'What controls the terminal velocity?', {
      b: r`From $v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta}$:`,
      ul: [
        'Bigger spheres fall faster: v_t grows as r², so a drop of twice the radius falls four times as fast.',
        'A more viscous fluid slows the sphere: v_t varies as 1/η.',
        'If the sphere is lighter than the fluid, ρ − σ is negative and it rises with a terminal speed (a bubble in honey).',
        'A raindrop in air also reaches a terminal speed, which is why rain does not hurt.',
      ],
      v: T_TERM,
      n: 'The terminal speed grows with the square of the radius, so a drop of twice the radius falls four times as fast. It falls with the inverse of the viscosity, so honey slows a ball much more than water does. If the sphere is lighter than the fluid, the speed turns negative and the sphere rises, as a bubble does in honey. Rain reaches a terminal speed in air too.',
    }),
    sl('concept', 'Streamline and turbulent flow: the Reynolds number', {
      b: r`Flow in a pipe is smooth (**laminar**) at low speed and becomes irregular (**turbulent**) at high speed. The Reynolds number decides:`,
      m: [r`Re = \dfrac{\rho\, v\, d}{\eta}`],
      ul: [
        'Re below about 1000: laminar. Above about 2000: turbulent. In between: unstable.',
        'The speed at which the flow turns turbulent is the **critical velocity**.',
        'Turbulence increases the resistance to flow; Bernoulli’s equation does not apply to it.',
      ],
      v: T_RE,
      n: 'At low speed a fluid flows in smooth layers. At high speed the flow becomes irregular and swirling. The Reynolds number, density times speed times pipe diameter over viscosity, decides which. Below about one thousand the flow is laminar, and above about two thousand it is turbulent. The speed at which turbulence begins is called the critical velocity.',
    }),
    sl('example', 'Worked example 3: laminar or turbulent?', {
      b: r`Water ($\rho = 1000$ kg m$^{-3}$, $\eta = 1.0 \times 10^{-3}$ Pa s) flows through a pipe of diameter ${dec(s3.d1 * 100, 2)} cm at ${dec(s3.v1, 2)} m s$^{-1}$, and through a tap pipe of diameter ${dec(s3.d2 * 100, 2)} cm at ${dec(s3.v2, 2)} m s$^{-1}$. Classify each flow.`,
      ul: [
        r`$Re_1 = \dfrac{1000 \times ${dec(s3.v1, 2)} \times ${s3.d1}}{1.0 \times 10^{-3}} = ${s3.Re1}$: below 1000, so laminar.`,
        r`$Re_2 = \dfrac{1000 \times ${dec(s3.v2, 2)} \times ${s3.d2}}{1.0 \times 10^{-3}} = ${s3.Re2}$: far above 2000, so turbulent.`,
        'A slowly trickling tap is laminar; a fully open tap is turbulent.',
      ],
      v: T_RE,
      n: 'For the first pipe, density times speed times diameter over viscosity gives five hundred, which is below one thousand, so the flow is laminar. For the tap pipe at one point five metres per second the number is twenty two thousand five hundred, far above two thousand, so the flow is turbulent. A trickle is laminar; a fully open tap is turbulent.',
    }),
    sl('check', 'Quick check: terminal velocity', {
      b: 'Choose the correct option.',
      v: T_TERM,
      chk: 'stokes-mcq',
      n: 'Use the dependence of terminal speed on the radius of the sphere.',
    }),
    sl('concept', 'Surface tension', {
      b: 'Molecules inside a liquid are pulled equally in all directions; those at the surface are pulled inward, so the surface acts like a stretched elastic skin.',
      m: [r`S = \dfrac{F}{l}`],
      ul: [
        'Surface tension S is the force per unit length acting along a line drawn on the surface, at right angles to the line and tangent to the surface: SI unit N m⁻¹.',
        'A film with two surfaces (a soap film) pulls on a wire of length l with force F = 2 S l.',
        'It makes small drops spherical and lets a needle float on water.',
      ],
      v: V.film,
      n: 'A molecule inside a liquid is pulled equally in all directions, but a molecule at the surface is pulled inward. The surface therefore behaves like a stretched skin. Surface tension is the force per unit length along a line on the surface. A soap film has two surfaces, so it pulls on a wire of length l with a force of two S l.',
    }),
    sl('example', 'Worked example 4: stretching a soap film', {
      b: r`A soap film on a wire frame has surface tension ${dec(s4.S, 2)} N m$^{-1}$. A sliding wire of length ${dec(s4.l * 100, 2)} cm is pulled ${dec(s4.d * 100, 2)} cm. Find the force on the wire, the increase of surface area and the work done.`,
      ul: [
        r`Two surfaces: $F = 2Sl = 2 \times ${dec(s4.S, 2)} \times ${dec(s4.l, 2)} = ${sci(s4.F, 3)}$ N.`,
        r`$\Delta A = 2 l d = 2 \times ${dec(s4.l, 2)} \times ${dec(s4.d, 2)} = ${sci(s4.dA, 3)}$ m$^2$.`,
        r`$W = F d = ${sci(s4.F, 3)} \times ${dec(s4.d, 2)} = ${sci(s4.W, 3)}$ J $= S\,\Delta A$: the work is stored as **surface energy**.`,
      ],
      v: V.film,
      n: 'The film has two surfaces, so the force is two S l, which is two times zero point zero three times zero point zero eight, four point eight times ten to the minus three newton. The area added is two times length times distance, eight times ten to the minus three square metres. The work, force times distance, equals surface tension times the new area, about two point four times ten to the minus four joule.',
    }),
    sl('concept', 'Surface energy and surface tension of liquids', {
      b: r`Surface energy per unit area equals the surface tension: $S = \dfrac{W}{\Delta A}$ (J m$^{-2}$ = N m$^{-1}$).`,
      ul: [
        'Making a new surface needs work against the inward pull, so a liquid takes the shape of least surface area: a sphere for a free drop.',
        'Surface tension falls as the temperature rises and when a detergent is added.',
        'When small drops merge into one big drop the total surface area falls, and energy is released.',
      ],
      v: T_S,
      n: 'The work needed to create new surface, divided by the area created, is the surface energy per unit area, and it equals the surface tension. A liquid therefore tends to take the shape of the least surface area, a sphere for a free drop. Surface tension falls when the liquid is heated or when detergent is added. Merging drops release energy.',
    }),
    sl('concept', 'Angle of contact', {
      b: 'Where a liquid surface meets a solid, the **angle of contact** θ is the angle between the solid surface and the tangent to the liquid surface, measured inside the liquid.',
      ul: [
        'θ < 90°: the liquid wets the solid and spreads (water on clean glass, θ close to 0°).',
        'θ > 90°: the liquid does not wet the solid and bunches up (mercury on glass, about 140°).',
        'The angle depends on the liquid, the solid and the surrounding medium; it is why water beads on a waxed surface.',
      ],
      v: V.contact,
      n: 'At the line where a liquid touches a solid, draw the tangent to the liquid surface. The angle between this tangent and the solid, measured inside the liquid, is the angle of contact. If it is less than ninety degrees, the liquid wets the solid and spreads. If it is more than ninety degrees, as for mercury on glass, the liquid does not wet the solid and gathers into beads.',
    }),
    sl('concept', 'Excess pressure in a drop and a bubble', {
      b: 'The pressure inside a curved liquid surface is higher than outside. For a spherical surface of radius R:',
      m: [r`\Delta P_{\text{drop}} = \dfrac{2S}{R}, \qquad \Delta P_{\text{soap bubble}} = \dfrac{4S}{R}`],
      ul: [
        'A liquid drop, or an air bubble inside a liquid, has one surface: 2S/R.',
        'A soap bubble has two surfaces (inside and outside the film): 4S/R.',
        'Smaller drops and bubbles have a larger excess pressure.',
      ],
      v: V.bubble,
      n: 'Cut a drop in half and balance the forces on one half. The excess pressure acting on the flat circle must equal the surface tension pulling along the rim, so the excess pressure is two S over R. A soap bubble has two surfaces, so the pull is doubled and the excess pressure is four S over R. The smaller the bubble, the larger the excess pressure.',
    }),
    sl('example', 'Worked example 5: a soap bubble and a water drop', {
      b: r`Find the excess pressure inside (a) a soap bubble of radius ${dec(s5.Rb * 100, 2)} cm in a soap solution with $S = ${dec(s5.S, 2)}$ N m$^{-1}$, (b) a water drop of radius ${dec(s5.Rd * 1000, 2)} mm ($S = 0.072$ N m$^{-1}$).`,
      ul: [
        r`(a) $\Delta P = \dfrac{4S}{R} = \dfrac{4 \times ${dec(s5.S, 2)}}{${s5.Rb}} = ${s5.dPb}$ Pa.`,
        r`(b) $\Delta P = \dfrac{2S}{R} = \dfrac{2 \times 0.072}{${s5.Rd}} = ${s5.dPd}$ Pa.`,
        'The tiny drop has the greater excess pressure although its surface tension is larger only by a factor of 2.4.',
      ],
      v: V.bubble,
      n: 'For the soap bubble use four S over R: four times point zero three over point zero one five, which is eight pascal. For the water drop use two S over R: two times point zero seven two over five times ten to the minus four, which is two hundred and eighty eight pascal. The much smaller drop has by far the larger excess pressure.',
    }),
    sl('concept', 'Capillary rise', {
      b: 'In a narrow tube of radius r dipped in a liquid with angle of contact θ, the meniscus is curved and the liquid rises or falls to a height',
      m: [r`h = \dfrac{2S\cos\theta}{\rho\, g\, r}`],
      ul: [
        'θ < 90°: cos θ is positive, the meniscus is concave and the liquid rises (water in glass).',
        'θ > 90°: cos θ is negative, the meniscus is convex and the liquid is depressed (mercury in glass).',
        'The rise is inversely proportional to the radius: a thinner tube lifts the liquid higher.',
      ],
      v: V.cap,
      n: 'In a thin tube the liquid surface is strongly curved, so there is a pressure difference across it. The liquid moves until the weight of the column balances the upward pull of surface tension around the rim, giving h equals two S cos theta over rho g r. Water, with a small angle of contact, rises. Mercury, with an angle above ninety degrees, is pushed down.',
    }),
    sl('example', 'Worked example 6: water up and mercury down', {
      b: r`Find the rise of water ($S = 0.072$ N m$^{-1}$, $\theta \approx 0^\circ$) in a glass tube of radius ${dec(s6.r * 1000, 2)} mm, and the change of level of mercury ($S = ${dec(s6.Sh, 3)}$ N m$^{-1}$, $\theta = ${s6.th}^\circ$, $\rho = 13600$ kg m$^{-3}$) in a tube of radius ${dec(s6.rh * 1000, 2)} mm. Use $g = 9.8$ m s$^{-2}$.`,
      ul: [
        r`Water: $h = \dfrac{2 \times 0.072 \times 1}{1000 \times 9.8 \times ${s6.r}} = ${sci(s6.h, 3)}$ m $\approx ${dec(s6.h * 100, 3)}$ cm.`,
        r`Mercury: $h = \dfrac{2 \times ${dec(s6.Sh, 3)} \times \cos ${s6.th}^\circ}{13600 \times 9.8 \times ${s6.rh}} \approx ${sci(s6.hHg, 3)}$ m: the negative sign means a **fall** of ${dec(-s6.hHg * 1000, 3)} mm.`,
      ],
      v: plotCap,
      n: 'For water in a tube of half a millimetre radius, the rise is two times point zero seven two over one thousand times nine point eight times five times ten to the minus four, about two point nine four centimetres. For mercury the cosine of one hundred and forty degrees is negative, so the answer is negative: the mercury surface is pushed down by about five point three five millimetres.',
    }),
    sl('check', 'Quick check: capillary rise', {
      b: 'Choose the correct option.',
      v: T_E6B,
      chk: 'cap-mcq',
      n: 'Think about how the rise depends on the radius of the tube.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Viscosity', 'F = η A v/d; unit Pa s; liquids thin out when warm, gases thicken'],
          ['Stokes’ law', 'drag = 6π η r v; v_t = 2r²(ρ − σ)g / 9η'],
          ['Reynolds number', 'Re = ρ v d / η; laminar below about 1000, turbulent above about 2000'],
          ['Surface tension', 'S = F/l = energy per unit area; soap film pulls with 2 S l'],
          ['Excess pressure', 'drop 2S/R; soap bubble 4S/R'],
          ['Capillary rise', 'h = 2S cos θ / (ρ g r); θ > 90° gives a fall'],
        ],
        'Summary table of viscosity, Stokes law, Reynolds number, surface tension, excess pressure and capillary rise',
      ),
      n: 'To sum up. Viscous force is eta A v over d. Stokes drag is six pi eta r v, and a falling sphere reaches a terminal speed proportional to the square of its radius. The Reynolds number tells laminar from turbulent flow. Surface tension is force per unit length or energy per unit area, giving excess pressures of two S over R for a drop and four S over R for a soap bubble, and capillary rise two S cos theta over rho g r.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'In terminal-velocity problems use ρ − σ, and say that Stokes’ law needs a small sphere at low speed.',
        'A soap bubble has two surfaces: use 4S/R and 2 S l for a film.',
        'Change mm to m and cm to m before using the capillary formula.',
        'Give the sign of h in capillary action: negative means depression, as with mercury.',
      ],
      v: T_CONTACT,
      n: 'In terminal velocity problems use the difference between the density of the sphere and of the fluid. Remember that a soap bubble and a soap film have two surfaces. Change millimetres and centimetres to metres before using the capillary formula. And note the sign of the answer: a negative height means the liquid is pushed down, as mercury is in a glass tube.',
    }),
  ],
});
