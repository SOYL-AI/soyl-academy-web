// ICSE 9 Physics ch08 Reflection of Light at Plane Mirrors: question bank in ICSE school-examination style (short stems,
// "state", "define", "give a reason", numericals with formula, substitution and unit, 10-mark structured questions in parts).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R
// explains, d = both true and R does not explain.
import { mk, add, svgV, r, sig } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { LAWS_LETTERED, PERI_LETTERED, PARALLEL_PLAIN, INCL90_LETTERED, INCL90_DOUBLE } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const lawFig = svgV(LAWS_LETTERED, 'A ray reflected at a plane mirror with the parts lettered A to E');
const periFig = svgV(PERI_LETTERED, 'A periscope with the parts lettered A to E');
const parFig = svgV(PARALLEL_PLAIN, 'An object between two parallel plane mirrors 40 cm apart');
const inclFig = svgV(INCL90_LETTERED, 'Two plane mirrors at right angles with an object and three lettered images');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-law', mcq({
  stem: 'A ray of light falls on a plane mirror with an angle of incidence of 40°. The angle of reflection is',
  right: '40°', wrong: ['50°', '80°', '140°'],
  sol: 'By the first law of reflection the angle of reflection equals the angle of incidence, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-ang', mcq({
  stem: 'A ray makes an angle of 30° with a plane mirror. The angle of reflection is',
  right: `${K.CHK_ANG.r}°`, wrong: ['30°', '120°', '150°'],
  sol: r`Angle of incidence $= 90° - 30° = ${K.CHK_ANG.r}°$, and $r = i$, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => K.CHK_ANG.r === 60 || 'ang');
add('chk-char', mcq({
  stem: 'The image formed by a plane mirror, which cannot be received on a screen, is',
  right: 'virtual', wrong: ['real', 'inverted and enlarged', 'real and erect'],
  sol: 'Only virtual images cannot be received on a screen, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-par', mcq({
  stem: 'The number of images of an object formed between two parallel plane mirrors is, in principle,',
  right: 'infinite', wrong: ['one', 'two', 'four'],
  sol: 'Each image is an object for the other mirror, so the process never ends, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-incl', mcq({
  stem: 'Two plane mirrors are placed at right angles to each other with an object between them. The number of images formed is',
  right: '3', wrong: ['2', '4', '5'],
  sol: r`$n = \dfrac{360}{90} - 1 = 3$, option (@K).`,
  d: 1, c: 'application', t: [3],
}), () => K.LI.n === 3 || 'n');
add('chk-bright', mcq({
  stem: 'The successive images formed by two parallel plane mirrors become fainter because',
  right: 'a part of the light is lost at each reflection', wrong: ['the mirrors get hotter', 'the object moves away', 'the images are real'],
  sol: 'Each reflection absorbs or scatters a part of the light, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t01 laws of reflection and their verification
add('lw-mcq1', mcq({
  stem: 'According to the second law of reflection, the incident ray, the reflected ray and the normal at the point of incidence',
  right: 'all lie in the same plane', wrong: ['are at right angles to one another', 'all lie along one straight line', 'make equal angles with the mirror'],
  sol: 'This is the statement of the second law, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('lw-mcq2', mcq({
  stem: 'A ray of light is incident on a plane mirror at 20° to the normal. The angle between the incident ray and the reflected ray is',
  right: `${K.M_LW2.between}°`, wrong: ['20°', '70°', '160°'],
  sol: r`$i = r = 20°$, so the angle between the rays $= 20° + 20° = ${K.M_LW2.between}°$, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => K.M_LW2.between === 40 || 'angle');
add('lw-mcq3', mcq({
  stem: 'A ray of light falls on a plane mirror along the normal. The ray',
  right: 'returns along the same path', wrong: ['passes through the mirror', 'is reflected at 90° to the incident ray', 'is reflected along the surface of the mirror'],
  sol: 'The angle of incidence is zero, so the angle of reflection is also zero, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('lw-mcq4', mcq({
  stem: 'In the pin experiment, pins P3 and P4 are fixed so that, looking into the mirror, they',
  right: 'appear in line with the images of pins P1 and P2', wrong: ['touch the mirror', 'are exactly the same distance from the mirror as P1', 'hide the normal'],
  sol: 'P3 and P4 mark the reflected ray, which appears to come from the images of P1 and P2, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('lw-mcq5', mcq({
  stem: 'The angle between an incident ray and the reflected ray at a plane mirror is 90°. The angle of incidence is',
  right: `${K.M_LW5.i}°`, wrong: ['90°', '30°', '60°'],
  sol: r`$i + r = 90°$ and $i = r$, so $i = \dfrac{90°}{2} = ${K.M_LW5.i}°$, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => K.M_LW5.i === 45 || 'i');
add('lw-mcq6', mcq({
  stem: 'A ray of light makes an angle of 70° with the surface of a plane mirror. The angle of reflection is',
  right: `${K.M_LW6.r}°`, wrong: ['70°', '35°', '140°'],
  sol: r`The angle of incidence is measured from the normal: $90° - 70° = ${K.M_LW6.r}°$, and $r = i$, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => K.M_LW6.r === 20 || 'r');
add('lw-short2c', short({
  marks: 2, wl: null,
  stem: 'Define the angle of incidence and the angle of reflection.',
  model: 'The **angle of incidence** is the angle between the **incident ray and the normal** at the point of incidence; the **angle of reflection** is the angle between the **reflected ray and the normal**.',
  sol: 'Angles of the incident ray and the reflected ray with the normal.',
  scheme: [['Angle of incidence: incident ray and normal', 1], ['Angle of reflection: reflected ray and normal', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('lw-short2d', short({
  marks: 2, wl: null,
  stem: 'State two precautions to be taken while fixing the pins in the experiment on the laws of reflection.',
  model: 'Keep the **pins vertical** (upright on the paper), and fix the pins P3 and P4 by sighting the **bases** of the pins and of the images, with the eye at the level of the table; the mirror must also stay **exactly on its line** (any two).',
  sol: 'Any two: pins upright, sight the bases, mirror on its line.',
  scheme: [['First precaution', 1], ['Second precaution', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lw-ar', ar({
  a: 'A ray of light that falls on a plane mirror along the normal is reflected back along the same path.',
  r: 'For a ray along the normal, the angle of incidence is 90°.',
  key: 'a',
  sol: '(A) is true; (R) is false because the angle of incidence of a ray along the normal is 0°, option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('lw-tf', tf({
  stem: 'The angle of incidence is the angle between the incident ray and the surface of the mirror.',
  key: 'f',
  sol: 'False. It is the angle between the incident ray and the normal.',
  d: 1, c: 'recall', t: [1],
}));
add('lw-fill', fill({
  marks: 3,
  stem: 'The angle of incidence and the angle of reflection are measured from the ___. According to the first law of reflection, the angle of incidence is ___ to the angle of reflection. The incident ray, the reflected ray and the normal lie in the same ___.',
  acc: [['normal'], ['equal', 'equal to'], ['plane']],
  sol: 'Normal; equal; plane.',
  d: 1, c: 'recall', t: [1],
}));
add('lw-term', term({
  stem: 'What is meant by the normal at the point of incidence?',
  model: 'The **line drawn perpendicular (at 90°) to the mirror** at the point where the incident ray strikes it.', sol: 'Perpendicular to the mirror at the point of incidence.', sch: 'Perpendicular to the mirror at that point',
  d: 1, c: 'recall', t: [1],
}));
add('lw-short2a', short({
  marks: 2, wl: null,
  stem: 'State the two laws of reflection of light.',
  model: '**First law:** the angle of incidence is equal to the angle of reflection. **Second law:** the incident ray, the reflected ray and the normal at the point of incidence lie in the same plane.',
  sol: 'i equals r; all three lines in one plane.',
  scheme: [['Angle of incidence equals angle of reflection', 1], ['Rays and normal in the same plane', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('lw-short2b', short({
  marks: 2, wl: null,
  stem: 'A ray of light falls on a plane mirror at right angles to its surface. State the angle of incidence and the direction of the reflected ray.',
  model: 'The ray is along the normal, so the angle of incidence is **0°**; the reflected ray goes **back along the incident ray**.',
  sol: '0°; returns along the same path.',
  scheme: [['Angle of incidence 0°', 1], ['Reflected back along the same path', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lw-short3', short({
  marks: 3, wl: null,
  stem: 'In the pin experiment to verify the laws of reflection, how are the incident ray and the reflected ray marked, and what do you measure and conclude?',
  model: 'Pins **P1 and P2** are fixed along the incident ray, and pins **P3 and P4** are fixed so that they appear **in line with the images** of P1 and P2. The lines through them are joined to the point of incidence; the **angles of incidence and reflection are measured from the normal** with a protractor. They are found **equal**, which verifies the first law.',
  sol: 'P1 P2 incident, P3 P4 in line with images; measure i and r; equal.',
  scheme: [['P1 and P2 mark the incident ray', 1], ['P3 and P4 in line with the images mark the reflected ray', 1], ['Angles measured from the normal are equal', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lw-short3b', short({
  marks: 3, wl: null,
  stem: `After reflection at a plane mirror, a ray makes an angle of ${K.LW3B.refWithMirror}° with the mirror surface. Find (a) the angle of reflection, (b) the angle of incidence and (c) the angle between the incident and the reflected rays.`,
  model: r`**(a)** Angle of reflection $= 90° - ${K.LW3B.refWithMirror}° = ${K.LW3B.r}°$.` + '\n\n' + r`**(b)** By the first law, the angle of incidence $= ${K.LW3B.i}°$.` + '\n\n' + r`**(c)** Angle between the rays $= ${K.LW3B.i}° + ${K.LW3B.r}° = ${K.LW3B.between}°$.`,
  sol: '62°; 62°; 124°.',
  scheme: [['62°', 1], ['62° by the first law', 1], ['124°', 1]],
  d: 3, c: 'application', t: [1],
}), () => K.LW3B.r === 62 && K.LW3B.between === 124 || 'lw3b');
add('num-ang1', num({
  stem: 'A ray strikes a plane mirror so that it makes an angle of 25° with the mirror. Find the angle between the incident ray and the reflected ray.',
  value: K.N_ANG1.between, tol: 0, unit: '°',
  sol: r`Angle of incidence $= 90° - 25° = ${K.N_ANG1.i}°$; angle of reflection $= ${K.N_ANG1.i}°$; angle between the rays $= 2 \times ${K.N_ANG1.i}° = ${K.N_ANG1.between}°$.`,
  scheme: [['Angle of incidence 65°', 0.5], [`${K.N_ANG1.between}°`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_ANG1.between === 130 || 'ang1');
add('num-ang2', num({
  stem: 'The angle between the incident ray and the reflected ray at a plane mirror is 76°. Find the angle of incidence.',
  value: K.N_ANG2.i, tol: 0, unit: '°',
  sol: r`$i + r = 76°$ and $i = r$, so $i = \dfrac{76°}{2} = ${K.N_ANG2.i}°$.`,
  scheme: [['i + r = 76° with i = r', 0.5], [`${K.N_ANG2.i}°`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_ANG2.i === 38 || 'ang2');
add('num-ang3', num({
  stem: 'A ray is incident on a plane mirror at an angle of incidence of 38°. Find the angle that the reflected ray makes with the surface of the mirror.',
  value: K.N_ANG3.withMirrorRef, tol: 0, unit: '°',
  sol: r`$r = i = 38°$, so the reflected ray makes $90° - 38° = ${K.N_ANG3.withMirrorRef}°$ with the mirror.`,
  scheme: [['r = 38°', 0.5], [`${K.N_ANG3.withMirrorRef}°`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_ANG3.withMirrorRef === 52 || 'ang3');

// ---------------------------------------------------------------- t02 image in a plane mirror; uses
add('im-mcq1', mcq({
  stem: 'Which of the following is NOT a characteristic of the image formed by a plane mirror?',
  right: 'it is smaller than the object', wrong: ['it is virtual', 'it is laterally inverted', 'it is as far behind the mirror as the object is in front'],
  sol: 'The image is the same size as the object, so "smaller" is not a characteristic, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('im-mcq2', mcq({
  stem: 'A girl stands 0.8 m in front of a plane mirror. The distance between the girl and her image is',
  right: `${K.M_IMG.apart} m`, wrong: ['0.8 m', '0.4 m', '3.2 m'],
  sol: r`The image is 0.8 m behind the mirror, so the distance $= 0.8 + 0.8 = ${K.M_IMG.apart}$ m, option (@K).`,
  d: 1, c: 'application', t: [2],
}), () => K.M_IMG.apart === 1.6 || 'dist');
add('im-mcq3', mcq({
  stem: 'A wall clock seen in a plane mirror appears to show 8:20. The actual time is',
  right: '3:40', wrong: ['8:20', '4:20', '3:20'],
  sol: 'The reading in the mirror is 12:00 minus the actual time, so the actual time is 12:00 − 8:20 = 3:40, option (@K).',
  d: 3, c: 'application', t: [2],
}), () => 12 * 60 - (K.CLOCK.seen[0] * 60 + K.CLOCK.seen[1]) === 3 * 60 + 40 || 'clock');
add('im-mcq4', mcq({
  stem: 'The word AMBULANCE is written in reversed letters on the front of the vehicle so that',
  right: 'it can be read correctly in the rear-view mirror of a car ahead', wrong: ['it looks different from other vehicles', 'it can be read from behind the vehicle', 'the image formed by the mirror becomes real'],
  sol: 'Lateral inversion in the mirror turns the reversed letters into correct ones, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('im-mcq5', mcq({
  stem: 'A periscope is made of two plane mirrors, each inclined to the axis of the tube at',
  right: '45°', wrong: ['30°', '60°', '90°'],
  sol: 'At 45° each mirror turns the ray through a right angle, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('im-mcq6', mcq({
  stem: 'Which of these is NOT a use of plane mirrors?',
  right: 'magnifying small print for a person with weak eyesight', wrong: ['viewing the back of the head in a barber’s shop', 'making a periscope', 'making a kaleidoscope'],
  sol: 'A plane mirror forms an image of the same size, so it cannot magnify, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('im-ar', ar({
  a: 'The image formed by a plane mirror cannot be obtained on a screen.',
  r: 'The reflected rays do not actually meet at the image; they only appear to come from it.',
  key: 'c',
  sol: 'Both are true; a screen needs real rays to meet, so (R) explains (A), option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('im-tf', tf({
  stem: 'The image formed by a plane mirror is as far behind the mirror as the object is in front of it.',
  key: 't',
  sol: 'True. The image distance equals the object distance.',
  d: 1, c: 'recall', t: [2],
}));
add('im-term', term({
  stem: 'What is meant by lateral inversion?',
  model: 'The **interchange of left and right** in the image formed by a plane mirror.', sol: 'Left and right are interchanged in the image.', sch: 'Left and right interchanged',
  d: 1, c: 'recall', t: [2],
}));
add('im-short2a', short({
  marks: 2, wl: null,
  stem: 'State two characteristics of the image formed by a plane mirror other than being virtual.',
  model: 'The image is **erect** and **of the same size** as the object; it is also **as far behind the mirror as the object is in front**, and **laterally inverted** (any two).',
  sol: 'Any two of: erect, same size, same distance behind, laterally inverted.',
  scheme: [['First characteristic', 1], ['Second characteristic', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('im-short2b', short({
  marks: 2, wl: null,
  stem: 'Why is the word AMBULANCE written in reversed letters on the front of an ambulance?',
  model: 'A plane mirror **laterally inverts** the image. The driver of a car ahead sees the word in the **rear-view mirror** and reads it **correctly**.',
  sol: 'Lateral inversion in the rear-view mirror makes the word readable.',
  scheme: [['Plane mirror inverts left and right', 1], ['Word reads correctly in the rear-view mirror', 1]],
  d: 2, c: 'application', t: [2],
}));
add('im-short2c', short({
  marks: 2, wl: null,
  stem: 'Name two devices in which plane mirrors are used.',
  model: 'A **periscope** (two plane mirrors at 45°) and a **kaleidoscope** (mirrors inclined at an angle); also dressing mirrors (any two).',
  sol: 'Any two: periscope, kaleidoscope, dressing mirror.',
  scheme: [['First device', 1], ['Second device', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('im-short3a', short({
  marks: 3, wl: null,
  stem: 'A student says that the image of a candle in a plane mirror is real because she can see it. Explain why she is wrong and say how you would test it.',
  model: 'The image is **virtual**: the reflected rays only **appear to come** from behind the mirror and do **not actually meet** there. Seeing it with the eye does not make it real. To test, **place a screen at the position of the image**: no image forms on it, which shows that it is virtual.',
  sol: 'Virtual: rays do not meet; test with a screen where no image forms.',
  scheme: [['Image is virtual', 1], ['Rays only appear to come from it', 1], ['Screen test shows nothing forms', 1]],
  d: 2, c: 'application', t: [2],
}));
add('im-short3b', short({
  marks: 3, wl: null,
  stem: 'Describe, with a labelled diagram in words, how a periscope works.',
  model: 'A periscope has **two parallel plane mirrors**, each inclined at **45°** to the axis of a tube, facing each other. Light from the object falls on the **top mirror** and is turned through **90°** down the tube; the **lower mirror** turns it through another **90°** towards the eye, so the observer sees over an obstacle.',
  sol: 'Two parallel plane mirrors at 45° in a tube; each turns the light through 90°.',
  scheme: [['Two parallel mirrors at 45° in a tube', 1], ['Top mirror turns the light down the tube', 1], ['Lower mirror turns it to the eye', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('num-dist', num({
  stem: 'A flower pot is placed 35 cm in front of a plane mirror. Find the distance between the pot and its image.',
  value: K.N_DIST.apart, tol: 0, unit: 'cm',
  sol: r`The image is as far behind the mirror as the object is in front, so the distance $= 35 + 35 = ${K.N_DIST.apart}$ cm.`,
  scheme: [['Image distance 35 cm', 0.5], [`${K.N_DIST.apart} cm`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => K.N_DIST.apart === 70 || 'dist');
add('num-walk', num({
  stem: 'A girl stands 2.5 m from a plane mirror and walks 1 m towards it. Find the distance between her and her image now.',
  value: K.N_WALK.apart, tol: 0, unit: 'm',
  sol: r`Her distance from the mirror is $2.5 - 1 = 1.5$ m, so her image is also 1.5 m behind the mirror and the distance between them is $2 \times 1.5 = ${K.N_WALK.apart}$ m.`,
  scheme: [['Distance from the mirror 1.5 m', 0.5], [`${K.N_WALK.apart} m`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => K.N_WALK.apart === 3 || 'walk');
add('num-speed', num({
  stem: 'A boy walks straight towards a plane mirror at 1.2 m s⁻¹. Find the speed at which his image approaches him.',
  value: sig(K.N_SPEED.rel, 3), tol: 0, unit: 'm s⁻¹',
  sol: r`The image also moves towards the mirror at 1.2 m s⁻¹, so the distance between the boy and his image changes at $1.2 + 1.2 = ${sig(K.N_SPEED.rel, 3)}$ m s⁻¹.`,
  scheme: [['Image moves at 1.2 m s⁻¹ towards the mirror', 0.5], [`${sig(K.N_SPEED.rel, 3)} m s⁻¹`, 0.5]],
  d: 3, c: 'application', t: [2],
}), () => sig(K.N_SPEED.rel, 3) === 2.4 || 'speed');
add('num-away', num({
  stem: 'A toy is 15 cm in front of a plane mirror and is then moved 6 cm away from it. Find the new distance between the toy and its image.',
  value: K.N_AWAY.apart, tol: 0, unit: 'cm',
  sol: r`New distance of the toy from the mirror $= 15 + 6 = ${K.N_AWAY.v}$ cm, so the distance between the toy and its image $= 2 \times ${K.N_AWAY.v} = ${K.N_AWAY.apart}$ cm.`,
  scheme: [['21 cm from the mirror', 0.5], [`${K.N_AWAY.apart} cm`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => K.N_AWAY.apart === 42 || 'away');
add('im-match', match({
  marks: 5,
  stem: 'Match each term about mirrors in Column A with its correct description in Column B.',
  pairs: [
    ['Image in a plane mirror', 'virtual and erect'],
    ['Periscope', 'two plane mirrors at 45°'],
    ['AMBULANCE written reversed', 'lateral inversion in a rear-view mirror'],
    ['Pin P3', 'placed in line with the image of P1'],
    ['Normal', 'perpendicular to the mirror at the point of incidence'],
  ],
  order: [1, 3, 0, 4, 2],
  sol: 'Plane mirror image: virtual, erect; periscope: two mirrors at 45°; AMBULANCE: lateral inversion; P3: in line with the image; normal: perpendicular.',
  d: 2, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 images in two mirrors
add('pm-mcq1', mcq({
  stem: 'In two parallel plane mirrors M1 and M2, the image of an object O formed by M2 acts as an object for M1. This is the reason why',
  right: 'many images of the object are formed', wrong: ['the images are real', 'the images are larger than the object', 'only two images are formed'],
  sol: 'Each image becomes an object for the other mirror, so there is a series of images, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('pm-mcq2', mcq({
  stem: 'Two plane mirrors are inclined at 60° to each other and an object is placed between them. The number of images formed is',
  right: `${K.M_PM[0]}`, wrong: ['4', '6', '7'],
  sol: r`$n = \dfrac{360}{60} - 1 = ${K.M_PM[0]}$, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => K.M_PM[0] === 5 || 'n');
add('pm-mcq3', mcq({
  stem: 'Two plane mirrors placed at 45° to each other form how many images of an object kept between them?',
  right: `${K.M_PM[1]}`, wrong: ['3', '5', '8'],
  sol: r`$n = \dfrac{360}{45} - 1 = ${K.M_PM[1]}$, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => K.M_PM[1] === 7 || 'n');
add('pm-mcq4', mcq({
  stem: 'Two plane mirrors are inclined at 72° and an object is placed on the bisector of the angle between them. The number of images is',
  right: `${K.M_PM[2]}`, wrong: ['3', '5', '6'],
  sol: r`$\dfrac{360}{72} = 5$ is odd and the object is on the bisector, so $n = 5 - 1 = ${K.M_PM[2]}$, option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => K.M_PM[2] === 4 || 'n');
add('pm-mcq5', mcq({
  stem: 'Two plane mirrors at right angles are slowly closed up until the angle between them is 45°. The number of images of an object between them changes from',
  right: `${K.M_PM5.from} to ${K.M_PM5.to}`, wrong: ['4 to 8', '2 to 4', '3 to 5'],
  sol: r`At 90°, $n = 3$; at 45°, $n = \dfrac{360}{45} - 1 = ${K.M_PM5.to}$, option (@K).`,
  d: 3, c: 'analysis', t: [3],
}), () => K.M_PM5.to === 7 || 'n');
add('pm-mcq8', mcq({
  stem: 'Two plane mirrors are inclined at 40° and an object is placed NOT on the bisector of the angle between them. The number of images is',
  right: '9', wrong: ['8', '10', '7'],
  sol: r`$\dfrac{360}{40} = 9$ is odd and the object is off the bisector, so $n = 9$, option (@K).`,
  d: 4, c: 'analysis', t: [3],
}), () => K.N_OFF.off === 9 || 'n');
add('pm-ar', ar({
  a: 'Two plane mirrors at right angles to each other form four images of an object between them.',
  r: 'The number of images formed by two inclined plane mirrors is 360 ÷ θ − 1, when 360 ÷ θ is an even number.',
  key: 'b',
  sol: '(A) is false because 360 ÷ 90 − 1 = 3 images are formed; (R) is true, option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('pm-ar2', ar({
  a: 'The tenth image formed by two parallel plane mirrors is fainter than the second image.',
  r: 'The distance between two parallel mirrors is fixed.',
  key: 'd',
  sol: 'Both statements are true, but (R) does not explain (A); the image is fainter because light is lost at each reflection, option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('pm-tf', tf({
  stem: 'Two plane mirrors inclined at 90° to each other form four images of an object placed between them.',
  key: 'f',
  sol: 'False. Three images are formed: 360 ÷ 90 − 1 = 3.',
  d: 2, c: 'application', t: [3],
}));
add('pm-term', term({
  stem: 'Write the formula for the number of images formed by two plane mirrors inclined at an angle θ.',
  model: r`$n = \dfrac{360}{\theta} - 1$ (when $\dfrac{360}{\theta}$ is a whole number).`, sol: 'n = 360 ÷ θ − 1.', sch: 'n = 360 ÷ θ − 1',
  d: 1, c: 'recall', t: [3],
}));
add('pm-short2a', short({
  marks: 2, wl: null,
  stem: 'Why are many images formed when an object is placed between two parallel plane mirrors?',
  model: 'The image formed by one mirror **acts as an object** for the other mirror, which forms a further image, and the process **repeats** between the two mirrors.',
  sol: 'An image in one mirror is an object for the other, and this repeats.',
  scheme: [['Image formed by one mirror acts as an object for the other', 1], ['The process repeats many times', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('pm-short2b', short({
  marks: 2, wl: null,
  stem: 'Two plane mirrors are inclined at 120°. Find the number of images when the object is (i) on the bisector and (ii) not on the bisector.',
  model: r`$\dfrac{360}{120} = 3$ is odd. **(i)** On the bisector, $n = 3 - 1 = ${K.nFormula(120, true)}$. **(ii)** Off the bisector, $n = 3$.`,
  sol: '2 on the bisector; 3 off it.',
  scheme: [['2 images on the bisector', 1], ['3 images off the bisector', 1]],
  d: 3, c: 'application', t: [3],
}), () => K.nFormula(120, true) === 2 && K.nFormula(120, false) === 3 || 'n');
add('pm-short3a', short({
  marks: 3, wl: null,
  stem: 'An object O is placed between two parallel plane mirrors M1 and M2. Explain how the first four images are formed and name the images which are brightest.',
  model: 'M1 forms **I1** and M2 forms **I2**, each by a single reflection; these are the **brightest**. **I1 acts as an object for M2** and forms **I4**, and **I2 acts as an object for M1** and forms **I3**; these have been reflected twice and are fainter.',
  sol: 'I1 by M1 and I2 by M2 are brightest; I3 and I4 are images of images and fainter.',
  scheme: [['I1 and I2 formed by single reflections', 1], ['I3 and I4 formed with an image acting as an object', 1], ['I1 and I2 brightest, with the reason', 1]],
  d: 3, c: 'application', t: [3],
}));
add('pm-short3b', short({
  marks: 3, wl: null,
  stem: 'Two plane mirrors are inclined at 72° to each other. Explain why the number of images can be different for two positions of the object, and state the numbers.',
  model: r`$\dfrac{360}{72} = 5$ is an **odd** number. If the object is on the **bisector**, there are $5 - 1 = ${K.D2_EX2.on}$ images. If it is **not** on the bisector, one more image is formed, so there are **${K.D2_EX2.off}** images.`,
  sol: '360 ÷ 72 = 5 is odd: 4 images on the bisector and 5 elsewhere.',
  scheme: [['360 ÷ 72 = 5 is odd', 1], ['4 images on the bisector', 1], ['5 images off the bisector', 1]],
  d: 3, c: 'analysis', t: [3],
}), () => K.D2_EX2.on === 4 && K.D2_EX2.off === 5 || 'n');
add('num-par1', num({
  stem: 'An object is 10 cm from a plane mirror M1 and 30 cm from a parallel plane mirror M2. Find the distance between the object and the first image formed by M2.',
  value: K.PAR_OBJ_I2, tol: 0, unit: 'cm',
  sol: r`The first image in M2 is 30 cm behind M2, so the distance from the object $= 30 + 30 = ${K.PAR_OBJ_I2}$ cm.`,
  scheme: [['Image 30 cm behind M2', 0.5], [`${K.PAR_OBJ_I2} cm`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => K.PAR_OBJ_I2 === 60 || 'par1');
add('num-par2', num({
  stem: 'Two parallel plane mirrors M1 and M2 are 40 cm apart. An object O is 10 cm from M1. The first image formed by M1 acts as an object for M2. Find the distance of the image it forms in M2 from M2.',
  value: K.PAR_I21, tol: 0, unit: 'cm',
  sol: r`The first image in M1 is 10 cm behind M1, which is $40 + 10 = ${K.PAR_I21}$ cm from M2; the new image is the same distance behind M2, that is ${K.PAR_I21} cm.`,
  scheme: [['Distance of the first image from M2 is 50 cm', 0.5], [`${K.PAR_I21} cm`, 0.5]],
  d: 3, c: 'application', t: [3],
}), () => K.PAR_I21 === 50 || 'par2');
add('num-incl1', num({
  stem: 'Find the number of images formed when an object is placed between two plane mirrors inclined at 30°.',
  value: K.N_INC.b[1], tol: 0, unit: null,
  sol: r`$n = \dfrac{360}{30} - 1 = 12 - 1 = ${K.N_INC.b[1]}$.`,
  scheme: [['360 ÷ 30 − 1', 0.5], [`${K.N_INC.b[1]}`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => K.N_INC.b[1] === 11 || 'n');
add('num-angle', num({
  stem: 'Two plane mirrors inclined at an angle θ form 7 images of an object kept between them. Find θ.',
  value: K.N_ANGLE.th, tol: 0, unit: '°',
  sol: r`$7 = \dfrac{360}{\theta} - 1$, so $\dfrac{360}{\theta} = 8$ and $\theta = \dfrac{360}{8} = ${K.N_ANGLE.th}°$.`,
  scheme: [['360 ÷ θ = 8', 0.5], [`${K.N_ANGLE.th}°`, 0.5]],
  d: 3, c: 'application', t: [3],
}), () => K.N_ANGLE.th === 45 || 'theta');
add('num-off', num({
  stem: 'Two plane mirrors are inclined at 40° and an object is placed between them, away from the bisector of the angle. Find the number of images.',
  value: K.N_OFF.off, tol: 0, unit: null,
  sol: r`$\dfrac{360}{40} = 9$ is odd and the object is off the bisector, so $n = 9$.`,
  scheme: [['360 ÷ 40 = 9, odd', 0.5], [`${K.N_OFF.off}`, 0.5]],
  d: 3, c: 'application', t: [3],
}), () => K.N_OFF.off === 9 || 'n');

// ---------------------------------------------------------------- 10-mark structured questions
add('long-law', long({
  marks: 10, wl: null,
  stem: `The figure shows a ray of light reflected at a plane mirror, with its parts lettered A to E. The incident ray A makes an angle of ${K.LL.withMirror}° with the mirror surface.\n\n(a) Name the parts A, B, C, D and E. [3]\n\n(b) Find the angle of incidence. [2]\n\n(c) Find the angle that the reflected ray makes with the mirror. [2]\n\n(d) Find the angle between the incident ray and the reflected ray. [1]\n\n(e) State the second law of reflection. [2]`,
  model: '**(a)** **A** is the incident ray; **B** is the reflected ray; **C** is the normal; **D** is the plane mirror; **E** is the point of incidence.\n\n' + r`**(b)** Angle of incidence $= 90° - ${K.LL.withMirror}° = ${K.LL.i}°$.` + '\n\n' + r`**(c)** By the first law, $r = i = ${K.LL.r}°$, so the reflected ray makes $90° - ${K.LL.r}° = ${K.LL.reflWithMirror}°$ with the mirror.` + '\n\n' + r`**(d)** Angle between the rays $= ${K.LL.i}° + ${K.LL.r}° = ${K.LL.between}°$.` + '\n\n**(e)** The **incident ray, the reflected ray and the normal** at the point of incidence all lie in the **same plane**.',
  sol: 'Incident ray, reflected ray, normal, mirror, point of incidence; 35°; 55°; 70°; second law.',
  scheme: [['A and B named', 1], ['C and D named', 1], ['E named', 1], ['90° − 55°', 1], ['35°', 1], ['r = 35° and 90° − 35°', 1], ['55°', 1], ['70°', 1], ['Incident ray, reflected ray and normal', 1], ['In the same plane', 1]],
  d: 3, c: 'application', t: [1],
  assets: [lawFig],
}), () => K.LL.i === 35 && K.LL.between === 70 && K.LL.reflWithMirror === 55 || 'law');
add('long-pins', long({
  marks: 10, wl: null,
  stem: `A student verifies a law of reflection with pins and a plane mirror. For four different incident rays she measures the angle of incidence i and the angle of reflection r from the normal.\n\n| i (degrees) | ${K.PIN_I.join(' | ')} |\n|---|---|---|---|---|\n| r (degrees) | ${K.PIN_R.join(' | ')} |\n\n(a) State the law of reflection that she is verifying. [1]\n\n(b) Describe how she marks the incident ray and the reflected ray. [3]\n\n(c) Find the mean value of i and the mean value of r, and state the conclusion. [3]\n\n(d) Give one reason why the readings of i and r differ slightly. [1]\n\n(e) State two precautions she should take. [2]`,
  model: '**(a)** The **angle of incidence is equal to the angle of reflection**.\n\n**(b)** She fixes pins **P1 and P2** along the incident ray. Looking into the mirror, she fixes pins **P3 and P4** so that they appear **in line with the images** of P1 and P2; the line through P3 and P4 is the reflected ray.\n\n' + r`**(c)** Mean $i = \dfrac{${K.PIN_I.join(' + ')}}{4} = ${K.PIN_MEAN_I}°$; mean $r = \dfrac{${K.PIN_R.join(' + ')}}{4} = ${K.PIN_MEAN_R}°$. They are **equal**, which verifies that $i = r$.` + '\n\n**(d)** The angles are read with a protractor, so there is a **small error of reading**.\n\n**(e)** Keep the **pins vertical**; fix P3 and P4 by looking at the **bases** of the images; keep the mirror exactly on its line (any two).',
  sol: 'i equals r; P1 P2 incident, P3 P4 aligned with images; both means 35°, equal; reading error; pins vertical and sight bases.',
  scheme: [['i = r stated', 1], ['P1 and P2 on the incident ray', 1], ['P3 and P4 in line with the images', 1], ['Reflected ray joined through P3 and P4', 1], ['Mean i = 35°', 1], ['Mean r = 35°', 1], ['Equal, so i = r verified', 1], ['Error of reading the protractor', 1], ['First precaution', 1], ['Second precaution', 1]],
  d: 3, c: 'analysis', t: [1],
}), () => K.PIN_MEAN_I === 35 && K.PIN_MEAN_R === 35 || 'pins');
add('long-boy', long({
  marks: 10, wl: null,
  stem: `A boy stands ${K.LB.d0} m in front of a large plane mirror.\n\n(a) Find the distance between the boy and his image. [1]\n\n(b) He walks ${K.LB.step} m towards the mirror. Find the new distance between him and his image. [2]\n\n(c) He walks towards the mirror at ${K.LB.v} m s⁻¹. Find the speed at which his image approaches him. [2]\n\n(d) State three characteristics of the image. [3]\n\n(e) He holds a card showing the letter P up to the mirror. Describe what he sees in the mirror, and name the effect. [2]`,
  model: r`**(a)** The image is ${K.LB.d0} m behind the mirror, so the distance $= ${K.LB.d0} + ${K.LB.d0} = ${K.LB.apart0}$ m.` + '\n\n' + r`**(b)** His distance from the mirror $= ${K.LB.d0} - ${K.LB.step} = ${K.LB.d0 - K.LB.step}$ m, so the distance between him and the image $= 2 \times ${K.LB.d0 - K.LB.step} = ${K.LB.apart1}$ m.` + '\n\n' + r`**(c)** The image also moves at ${K.LB.v} m s⁻¹ towards the mirror, so it approaches him at $${K.LB.v} + ${K.LB.v} = ${K.LB.rel}$ m s⁻¹.` + '\n\n**(d)** Any three: **virtual**, **erect**, **same size**, **as far behind the mirror as the object is in front**, **laterally inverted**.\n\n**(e)** He sees the letter P **turned left to right** (reversed); this is **lateral inversion**.',
  sol: '4 m; 3 m; 3 m s⁻¹; virtual, erect, same size; reversed P, lateral inversion.',
  scheme: [['4 m', 1], ['Distance from the mirror 1.5 m', 1], ['3 m', 1], ['Image moves at 1.5 m s⁻¹', 1], ['3 m s⁻¹', 1], ['First characteristic', 1], ['Second characteristic', 1], ['Third characteristic', 1], ['Letter appears reversed left to right', 1], ['Lateral inversion', 1]],
  d: 3, c: 'application', t: [2],
}), () => K.LB.apart0 === 4 && K.LB.apart1 === 3 && K.LB.rel === 3 || 'boy');
add('long-par', long({
  marks: 10, wl: null,
  stem: 'The figure shows an object O between two parallel plane mirrors M1 and M2, which are 40 cm apart. O is 10 cm from M1.\n\n(a) Find the distance of the first image formed by M1 from M1, and the distance of the first image formed by M2 from M2. [2]\n\n(b) Find the distance between these two first images. [2]\n\n(c) The first image formed by M1 acts as an object for M2. Find the distance of the image it forms from M2. [2]\n\n(d) Why do the later images become fainter? [2]\n\n(e) State the number of images formed in principle and give a reason. [2]',
  model: r`**(a)** Behind M1: **${K.PAR_I1} cm**; behind M2: $40 - 10 = $ **${K.PAR_I2} cm**.` + '\n\n' + r`**(b)** Taking M1 as zero, the first image in M1 is at ${K.PAR_IM.chainA[0]} cm and the first image in M2 is at ${K.PAR_IM.chainB[0]} cm along the line, so the distance between them $= ${K.PAR_IM.chainB[0]} + ${-K.PAR_IM.chainA[0]} = ${K.PAR_I1_I2}$ cm.` + '\n\n' + r`**(c)** The first image in M1 is ${K.PAR_I21} cm from M2, so the new image is **${K.PAR_I21} cm** behind M2.` + '\n\n**(d)** A part of the light is **absorbed or lost at each reflection**, so each later image is less bright.\n\n**(e)** **Infinite**, because the image formed in one mirror always acts as an object for the other mirror.',
  sol: '10 cm and 30 cm; 80 cm; 50 cm; light is lost at each reflection; infinite, each image is an object for the other mirror.',
  scheme: [['10 cm behind M1', 1], ['30 cm behind M2', 1], ['Positions on one line', 1], ['80 cm', 1], ['Image 50 cm from M2', 1], ['50 cm behind M2', 1], ['Light lost at each reflection', 1], ['So later images are less bright', 1], ['Infinite number', 1], ['Each image acts as an object for the other mirror', 1]],
  d: 3, c: 'analysis', t: [3],
  assets: [parFig],
}), () => K.PAR_I1 === 10 && K.PAR_I2 === 30 && K.PAR_I1_I2 === 80 && K.PAR_I21 === 50 || 'par');
add('long-incl', long({
  marks: 10, wl: null,
  stem: 'The figure shows two plane mirrors M1 and M2 at right angles to each other, with an object O between them. Three images, lettered P, Q and R, are formed.\n\n(a) State the number of images formed when two plane mirrors are inclined at an angle θ, in terms of θ. [1]\n\n(b) Which of the images P, Q and R is formed by two reflections? [1]\n\n(c) Find the number of images when the mirrors are inclined at (i) 60° and (ii) 45°. [3]\n\n(d) The mirrors are now inclined at 72°. Find the number of images when the object is (i) on the bisector and (ii) not on the bisector. [3]\n\n(e) What happens to the number of images as the mirrors are brought nearer to parallel? [2]',
  model: r`**(a)** $n = \dfrac{360}{\theta} - 1$ (when $\dfrac{360}{\theta}$ is a whole number).` + '\n\n' + `**(b)** Image **${INCL90_DOUBLE}**, which is the image of the image formed in the other mirror.\n\n` + r`**(c)** **(i)** $\dfrac{360}{60} - 1 = ${K.LI.a}$. **(ii)** $\dfrac{360}{45} - 1 = ${K.LI.b}$.` + '\n\n' + r`**(d)** $\dfrac{360}{72} = 5$ is odd. **(i)** On the bisector: $5 - 1 = ${K.LI.on}$. **(ii)** Off the bisector: ${K.LI.off}.` + '\n\n**(e)** The number of images **increases**, and becomes **infinite** when the mirrors are parallel.',
  sol: 'n = 360/θ − 1; the double-reflection image; 5 and 7; 4 and 5; increases without limit.',
  scheme: [['n = 360 ÷ θ − 1', 1], ['Image formed by two reflections identified', 1], ['5 images at 60°', 1], ['7 images at 45°', 1], ['Working shown', 1], ['4 images on the bisector', 1], ['5 images off the bisector', 1], ['Odd quotient recognised', 1], ['Number increases', 1], ['Infinite for parallel mirrors', 1]],
  d: 3, c: 'analysis', t: [3],
  assets: [inclFig],
}), () => K.LI.a === 5 && K.LI.b === 7 && K.LI.on === 4 && K.LI.off === 5 || 'incl');
add('long-peri', long({
  marks: 10, wl: null,
  stem: 'The figure shows the ray of light through a periscope, with its parts lettered A to E. A is the top mirror and B is the bottom mirror.\n\n(a) Name the parts C, D and E. [3]\n\n(b) State the angle that each mirror makes with the axis of the tube and the angle of incidence of the ray on each mirror. [3]\n\n(c) State two characteristics of the final image seen by the observer. [2]\n\n(d) Two plane mirrors inclined at 60° are used in a kaleidoscope. Find the number of images formed of a bead placed between them. [2]',
  model: '**(a)** **C** is the ray from the object (incident on the top mirror); **D** is the ray travelling down the tube; **E** is the ray reaching the eye.\n\n**(b)** Each mirror makes an angle of **45°** with the axis of the tube. The ray falls on each mirror at an angle of incidence of **45°**, so it is turned through **90°** by each mirror.\n\n**(c)** The image is **virtual**, **erect** and of the **same size** as the object (any two).\n\n' + r`**(d)** $n = \dfrac{360}{60} - 1 = ${K.LK.n}$ images.`,
  sol: 'Incident ray, ray in the tube, ray to the eye; 45° and 45°; virtual and erect; 5 images.',
  scheme: [['C named', 1], ['D named', 1], ['E named', 1], ['Mirrors at 45° to the axis', 1], ['Angle of incidence 45°', 1], ['Turned through 90° by each mirror', 1], ['First characteristic', 1], ['Second characteristic', 1], ['360 ÷ 60 − 1', 1], ['5 images', 1]],
  d: 3, c: 'application', t: [2, 3],
  assets: [periFig],
}), () => K.LK.n === 5 || 'peri');
