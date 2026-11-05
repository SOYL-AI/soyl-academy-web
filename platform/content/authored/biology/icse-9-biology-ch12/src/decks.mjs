// ICSE 9 Biology ch12 The Skin — Part 1 (t01–t02), Part 2 (t03).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { SKIN, CLIMATE } from './svgs.mjs';
import { PALM, PALM_AREA, PALM_GLANDS, NORMAL, RUN_SWEAT, RUN_HEAT, KJ_PER_ML, SWEAT, SWEAT_RATIO, SWEAT_EXTRA, SWEAT_EXTRA_HEAT, FINGER, FINGER_FALL, FINGER_PER_MIN } from './calc.mjs';

export const V = {
  skin: svgV(SKIN, 'A vertical section of human skin showing the horny layer, Malpighian layer, dermis, hair follicle, sebaceous gland, erector muscle, blood vessels, nerve ending, sweat gland and fat layer'),
  climate: svgV(CLIMATE, 'The skin on a hot day with a wide blood vessel and sweat, beside the skin on a cold day with a narrow blood vessel and erect hairs'),
};

export const deck1 = deck({
  part: 1,
  title: 'The Skin — Part 1: Structure, functions and derivatives of the skin',
  goals: [
    'Label a vertical section of the skin and describe the epidermis and the dermis',
    'List the functions of the skin',
    'State the function of each skin derivative',
  ],
  slides: [
    sl('title', 'The Skin', {
      b: 'Part 1 — the largest organ of the body.',
      v: flow('LR', [['s', 'Skin'], ['p', 'Protects'], ['f', 'Feels'], ['r', 'Regulates temperature']], [['s', 'p'], ['s', 'f'], ['s', 'r']], 'Flow from the skin to protection, feeling and temperature regulation'),
      n: 'The skin covers the whole body and is its largest organ. It is a waterproof wrapper that protects us, a sense organ that tells us about the world, and a thermostat that helps keep our temperature steady.',
    }),
    sl('diagram', 'A vertical section of the skin', {
      b: 'Two main layers: the **epidermis** on top and the **dermis** below, over a **fat layer**.',
      v: V.skin,
      n: 'The skin has two layers. The thin epidermis is the outer layer and has no blood vessels. The thick dermis below it holds blood vessels, nerve endings, glands and hair roots. Under the dermis lies a layer of fat.',
    }),
    sl('concept', 'The epidermis', {
      v: table(['Part', 'Cells', 'Job'], [['Horny layer (outermost)', 'Dead, flat cells filled with keratin', 'Waterproof, protects against germs and wear; rubs off and is replaced'], ['Malpighian layer (innermost)', 'Living cells that keep dividing', 'Makes new cells to replace the horny layer; contains melanin, the dark pigment that shields from sunlight']], 'Table describing the horny layer and the Malpighian layer of the epidermis'),
      n: 'The epidermis has two parts. The horny layer on the outside is made of dead cells filled with a tough protein called keratin. It is waterproof. Below it the Malpighian layer has living cells that divide to replace the dead ones, and it contains the pigment melanin.',
    }),
    sl('concept', 'The dermis', {
      v: table(['Part', 'Where', 'Job'], [['Blood vessels', 'Throughout', 'Bring food and oxygen; carry heat; help control temperature'], ['Nerve endings', 'Throughout', 'Sense touch, pain, pressure, heat and cold'], ['Sweat glands', 'Deep in the dermis', 'Make sweat'], ['Sebaceous glands', 'Beside hair follicles', 'Make oily sebum'], ['Hair follicles and erector muscles', 'Dermis', 'Grow hair; the muscle makes the hair stand up'], ['Fat cells', 'Below the dermis', 'Store fat; insulate the body']], 'Table of the parts of the dermis with their position and job'),
      n: 'The dermis holds many things. Blood vessels bring food and oxygen and carry heat. Nerve endings sense touch, pain and temperature. It has the sweat glands, the oil glands, the hair roots and tiny muscles that make hairs stand up. Fat cells below it store fat and keep us warm.',
    }),
    sl('check', 'Quick check: the pigment', {
      b: 'The dark pigment that protects the skin from sunlight is made in the Malpighian layer. It is called',
      chk: 'chk-melanin',
      n: 'The darker the skin, the more of this pigment it holds.',
    }),
    sl('concept', 'Functions of the skin', {
      v: table(['Function', 'How'], [['Protection', 'Horny layer keeps out germs and water; melanin shields from sunlight'], ['Sense organ', 'Nerve endings detect touch, pain, pressure, heat and cold'], ['Temperature control', 'Sweating and changes in blood vessels keep the body at the right temperature'], ['Excretion', 'Sweat removes water, salts and a little urea'], ['Vitamin D', 'Sunlight on the skin helps to make vitamin D'], ['Storage and insulation', 'The fat layer stores fat and reduces heat loss']], 'Table of six functions of the skin and how each is carried out'),
      n: 'The skin protects the body from germs, water loss and sunlight. It senses touch, pain and temperature. It helps to control body temperature. It removes some waste in sweat. In sunlight it helps to make vitamin D, and its fat layer stores food and keeps us warm.',
    }),
    sl('example', 'Worked example 1: counting sweat glands', {
      b: `A patch of palm skin is ${PALM.l} cm by ${PALM.w} cm and has ${PALM.density} sweat glands on every square centimetre. How many sweat glands are on the patch?`,
      ul: [`Step 1: area = ${PALM.l} × ${PALM.w} = **${PALM_AREA}** square centimetres.`, `Step 2: glands = ${PALM_AREA} × ${PALM.density} = **${PALM_GLANDS}**.`, 'Step 3: so a small patch holds many glands, which is why the palms get damp when we are nervous or hot.'],
      v: table(['Quantity', 'Value'], [['Length (cm)', String(PALM.l)], ['Width (cm)', String(PALM.w)], ['Area (square cm)', String(PALM_AREA)], ['Glands per square cm', String(PALM.density)], ['Glands on the patch', String(PALM_GLANDS)]], 'Worked table: six square centimetres and eighteen hundred sweat glands'),
      n: 'First find the area by multiplying length by width. That gives six square centimetres. Then multiply by the number of glands in each square centimetre. The patch has one thousand eight hundred sweat glands.',
    }),
    sl('concept', 'The skin as a sense organ', {
      v: table(['Sensation', 'Detected by'], [['Touch and pressure', 'Nerve endings in the dermis, many in the fingertips and lips'], ['Pain', 'Free nerve endings in the epidermis and dermis'], ['Heat and cold', 'Separate nerve endings that sense temperature']], 'Table of sensations in the skin and the nerve endings that detect them'),
      n: 'Nerve endings in the skin send messages to the brain. Some sense touch and pressure, and there are many in the fingertips. Others sense pain, and others sense heat or cold. This helps us avoid danger.',
    }),
    sl('check', 'Quick check: the outermost layer', {
      b: 'The outermost layer of the epidermis is made of dead cells filled with keratin. It is the',
      chk: 'chk-horny',
      n: 'It is also waterproof.',
    }),
    sl('concept', 'Derivatives of the skin', {
      v: table(['Derivative', 'Function'], [['Sweat glands', 'Make sweat, which cools the body and removes some wastes'], ['Sebaceous glands', 'Make sebum, an oil that keeps skin and hair soft and waterproof'], ['Hair', 'Protects the head, traps air to keep warm, and senses touch'], ['Nails', 'Protect the tips of the fingers and toes; help in picking up small things'], ['Mammary glands', 'Make milk to feed a baby']], 'Table of skin derivatives and the function of each'),
      n: 'Some structures grow out of the skin. Sweat glands make sweat to cool the body. Sebaceous glands make oil that keeps skin and hair soft. Hair protects and keeps us warm. Nails protect the tips of the fingers. Mammary glands make milk for a baby.',
    }),
    sl('example', 'Worked example 2: which derivative is at fault?', {
      b: 'A doctor notes five problems. Name the skin derivative responsible for each.',
      ul: ['Step 1: ask what each derivative does.', 'Step 2: match **dry, cracked skin and rough hair** with **sebaceous glands** (no oil).', 'Step 3: match **overheating in the sun** with **sweat glands**; **sore fingertips** with **nails**; a mother **unable to feed her baby** with **mammary glands**.'],
      v: table(['Problem', 'Derivative'], [['Dry, cracked skin and rough hair', 'Sebaceous glands'], ['Overheating in the sun', 'Sweat glands'], ['Sore, unprotected fingertips', 'Nails'], ['Unable to feed a baby', 'Mammary glands'], ['Cold head in winter', 'Hair']], 'Worked table matching five problems with the skin derivative responsible'),
      n: 'Think about the job each derivative does, then match it to the problem. No oil means dry skin and hair, so the sebaceous glands. Overheating points to the sweat glands. Sore fingertips point to the nails. A baby that cannot be fed points to the mammary glands.',
    }),
    sl('check', 'Quick check: sebum', {
      b: 'Sebum, an oily secretion that keeps skin and hair soft, is made by the',
      chk: 'chk-sebum',
      n: 'They lie beside the hair follicles.',
    }),
    sl('concept', 'Hair and nails', {
      v: table(['', 'Hair', 'Nails'], [['Made of', 'Keratin', 'Keratin'], ['Grows from', 'Hair follicle in the dermis', 'Nail root under the skin'], ['Living or dead', 'The shaft is dead; the root is living', 'The plate is dead; the root is living'], ['Function', 'Protect, keep warm, sense touch', 'Protect finger tips']], 'Table comparing hair and nails in material, growth, living state and function'),
      n: 'Hair and nails are both made of keratin, the same tough protein as the horny layer. The part you see is made of dead cells and grows from a living root under the skin. That is why cutting hair or nails does not hurt.',
    }),
    sl('summary', 'Summary', {
      ul: ['Epidermis: horny layer (dead, keratin) and Malpighian layer (living, melanin).', 'Dermis: blood vessels, nerve endings, sweat and sebaceous glands, hair follicles.', 'Functions: protection, sensation, temperature control, excretion, vitamin D.', 'Derivatives: sweat glands, sebaceous glands, hair, nails, mammary glands.'],
      v: table(['Layer', 'Contains'], [['Epidermis', 'Horny layer and Malpighian layer'], ['Dermis', 'Vessels, nerves, glands, follicles'], ['Fat layer', 'Fat cells']], 'Summary table of the layers of the skin and what each contains'),
      n: 'To recap. The epidermis has a dead horny layer and a living Malpighian layer with melanin. The dermis holds vessels, nerves, glands and follicles. The skin protects, senses, controls temperature and removes waste. Its derivatives are sweat glands, sebaceous glands, hair, nails and mammary glands.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['In a skin diagram, label **horny layer, Malpighian layer, dermis, sweat gland, sebaceous gland, hair follicle, erector muscle, blood vessel** and **nerve ending**.', 'Say that the **horny layer is dead** and the **Malpighian layer is living**.', 'Give each derivative a **secretion or function**: **sweat, sebum, milk**.', 'Do not write that sweat glands lie in the epidermis; they lie in the **dermis**.'],
      n: 'Exam tips. When you draw a section of the skin, label the layers and the glands. Say that the horny layer is dead and the Malpighian layer is living. Link each derivative to its secretion or function, and place the sweat glands in the dermis.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'The Skin — Part 2: Heat regulation, vasodilation and vasoconstriction',
  goals: [
    'State why body temperature must be kept steady',
    'Explain vasodilation and sweating on a hot day',
    'Explain vasoconstriction and other responses on a cold day',
  ],
  slides: [
    sl('title', 'Keeping the Temperature Steady', {
      b: 'Part 2 — how the skin helps the body stay at about thirty-seven degrees.',
      v: flow('LR', [['h', 'Hot day: lose more heat'], ['b', 'Body at about 37 degrees'], ['c', 'Cold day: lose less heat']], [['h', 'b'], ['c', 'b']], 'Flow showing that on a hot day the body loses more heat and on a cold day less heat to stay at thirty-seven degrees'),
      n: 'Whatever the weather, the temperature inside your body stays close to thirty-seven degrees. The skin does much of this work. On a hot day it helps the body lose more heat, and on a cold day it helps the body keep it.',
    }),
    sl('concept', 'Why a steady temperature matters', {
      v: table(['Fact', 'Detail'], [['Normal body temperature', `About ${NORMAL} degrees Celsius`], ['Why it must be steady', 'Enzymes work best at this temperature'], ['Too hot or too cold', 'Reactions in cells slow down or go wrong'], ['What controls it', 'The brain, with the skin as the main organ of response']], 'Table giving the normal body temperature and why it must stay steady'),
      n: 'Enzymes in our cells work best at about thirty-seven degrees. If the body gets too hot or too cold, the reactions in the cells slow down or go wrong. So the brain checks the temperature and uses the skin to adjust heat loss.',
    }),
    sl('concept', 'Heat gain and heat loss', {
      v: table(['Heat gained from', 'Heat lost by'], [['Respiration in cells', 'Evaporation of sweat'], ['Warm surroundings and sunlight', 'Radiation from the skin'], ['Exercise', 'Contact with cooler air and objects']], 'Table of the sources of heat gain and the ways of heat loss'),
      n: 'The body gains heat from respiration, from exercise and from warm surroundings. It loses heat by evaporation of sweat, by radiation from the skin, and by contact with cooler air. The skin can speed up or slow down this loss.',
    }),
    sl('diagram', 'The skin on a hot day and on a cold day', {
      b: 'The same skin behaves differently: look at the **blood vessel** and the **sweat**.',
      v: V.climate,
      n: 'On a hot day the blood vessels near the surface are wide, a lot of blood flows near the surface, and sweat comes out. On a cold day the vessels are narrow, little blood flows near the surface and the hairs stand up.',
    }),
    sl('concept', 'A hot day: vasodilation', {
      v: table(['What happens', 'Why it helps'], [['Blood vessels of the skin widen (vasodilation)', 'More warm blood flows near the surface'], ['More heat is lost', 'By radiation and by contact with the air'], ['Skin looks red and feels warm', 'This is the sign of the extra blood'], ['Sweat glands make more sweat', 'See the next slide']], 'Table of the changes in the skin on a hot day and why each helps'),
      n: 'On a hot day the muscles in the walls of the skin blood vessels relax, and the vessels widen. This is called vasodilation. More warm blood flows near the surface, so more heat is lost to the air. This is why the face looks red after exercise.',
    }),
    sl('check', 'Quick check: widening vessels', {
      b: 'The widening of blood vessels in the skin on a hot day is called',
      chk: 'chk-dilate',
      n: 'The prefix tells you the vessels widen.',
    }),
    sl('concept', 'A hot day: sweating', {
      v: table(['Step', 'Detail'], [['1', 'Sweat glands pour sweat on to the skin through pores'], ['2', 'Sweat is mostly water, with salts and a little urea'], ['3', 'The sweat evaporates'], ['4', 'Evaporation takes heat from the skin, which cools the body']], 'Table of the four steps in cooling by sweating'),
      n: 'Sweat glands pour sweat on to the skin. When the sweat evaporates, it takes heat from the skin. This cools the body. On a damp day sweat dries slowly, so we feel hotter and stickier.',
    }),
    sl('example', 'Worked example 1: heat lost by sweating', {
      b: `A runner sweats ${RUN_SWEAT} mL in an hour. Each millilitre that evaporates takes away about ${KJ_PER_ML} kilojoules of heat. How much heat does the sweat carry away?`,
      ul: [`Step 1: sweat = ${RUN_SWEAT} mL.`, `Step 2: heat lost = ${RUN_SWEAT} × ${KJ_PER_ML} = **${RUN_HEAT} kilojoules**.`, 'Step 3: this heat would otherwise raise the body temperature, so sweating is a very effective cooler.'],
      v: table(['Quantity', 'Value'], [['Sweat in an hour (mL)', String(RUN_SWEAT)], ['Heat taken by each mL (kilojoules)', String(KJ_PER_ML)], ['Heat lost (kilojoules)', String(RUN_HEAT)]], 'Worked table: six hundred millilitres of sweat carry away fourteen hundred forty kilojoules'),
      n: 'Multiply the volume of sweat by the heat each millilitre takes away. Six hundred times two point four gives one thousand four hundred and forty kilojoules. That is a great deal of heat removed from the body.',
    }),
    sl('concept', 'A cold day: vasoconstriction', {
      v: table(['What happens', 'Why it helps'], [['Blood vessels of the skin narrow (vasoconstriction)', 'Less blood flows near the surface'], ['Less heat is lost', 'The warm blood stays deeper in the body'], ['Skin looks pale and feels cold', 'This is the sign of the reduced blood flow'], ['Sweat glands make very little sweat', 'No cooling by evaporation']], 'Table of the changes in the skin on a cold day and why each helps'),
      n: 'On a cold day the muscles in the vessel walls tighten and the vessels narrow. This is called vasoconstriction. Less blood flows near the surface, so less heat is lost. The skin looks pale and the fingers feel cold.',
    }),
    sl('check', 'Quick check: narrowing vessels', {
      b: 'The narrowing of blood vessels in the skin on a cold day is called',
      chk: 'chk-constrict',
      n: 'The opposite of vasodilation.',
    }),
    sl('concept', 'A cold day: other responses', {
      v: table(['Response', 'How it helps'], [['Erector muscles pull the hairs up', 'Raised hairs trap a layer of air, which is a poor conductor of heat'], ['Shivering', 'Muscles contract rapidly and release heat'], ['Fat layer', 'Insulates and reduces heat loss']], 'Table of other responses to cold with how each helps'),
      n: 'Other changes also help in the cold. Tiny muscles pull the hairs up, so they trap air that holds heat. We shiver, which makes the muscles release heat. The layer of fat under the skin also keeps heat in.',
    }),
    sl('example', 'Worked example 2: reading the fingertip temperature', {
      b: `A student puts a hand in cold air. The fingertip temperature is ${FINGER[0]} degrees at the start, ${FINGER[1]} after 5 minutes and ${FINGER[2]} after 10 minutes. What happened to the skin and what is the mean fall each minute?`,
      ul: [`Step 1: fall = ${FINGER[0]} − ${FINGER[2]} = **${FINGER_FALL}** degrees.`, `Step 2: mean fall = ${FINGER_FALL} ÷ 10 = **${FINGER_PER_MIN}** degree each minute.`, 'Step 3: the fingertips cooled because the skin **blood vessels narrowed** (vasoconstriction), so less warm blood reached them.'],
      v: table(['Time (minutes)', '0', '5', '10'], [['Fingertip temperature (degrees)', ...FINGER.map(String)]], 'Worked table of fingertip temperatures of thirty-two, twenty-seven and twenty-two degrees'),
      n: 'Find the total fall by subtracting the last reading from the first. The temperature fell by ten degrees in ten minutes, so the mean fall is one degree every minute. The cause is vasoconstriction, which cuts the flow of warm blood to the fingertips.',
    }),
    sl('concept', 'Hot day and cold day compared', {
      v: table(['Feature', 'Hot day', 'Cold day'], [['Skin blood vessels', 'Widen (vasodilation)', 'Narrow (vasoconstriction)'], ['Blood near the surface', 'More', 'Less'], ['Heat loss', 'More', 'Less'], ['Sweating', 'Much', 'Little'], ['Hairs', 'Lie flat', 'Stand up'], ['Appearance of skin', 'Red and warm', 'Pale and cold']], 'Table comparing the skin on a hot day and a cold day'),
      n: 'Compare the two days feature by feature. On a hot day vessels widen, more blood reaches the surface, heat loss increases and sweating is heavy. On a cold day the vessels narrow, heat loss falls, sweating is small and the hairs stand up.',
    }),
    sl('check', 'Quick check: cooling by sweat', {
      b: 'Sweating cools the body because',
      chk: 'chk-evap',
      n: 'Think about what the evaporating sweat takes from the skin.',
    }),
    sl('summary', 'Summary', {
      ul: ['Body temperature is kept at about 37 degrees Celsius.', 'Hot day: vasodilation, more sweat, more heat lost.', 'Cold day: vasoconstriction, little sweat, hairs erect, shivering.'],
      v: table(['', 'Vessels', 'Heat loss'], [['Hot day', 'Vasodilation', 'More'], ['Cold day', 'Vasoconstriction', 'Less']], 'Summary table of vasodilation on a hot day and vasoconstriction on a cold day'),
      n: 'To recap. The body is kept near thirty-seven degrees. On a hot day the skin vessels widen and sweating cools the body. On a cold day the vessels narrow, the hairs stand up and we may shiver, so less heat is lost.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Use the exact terms **vasodilation** and **vasoconstriction**.', 'Say that sweat **evaporates** and **takes heat** from the body.', 'Do not mix up the days: **hot** gives **wide vessels**; **cold** gives **narrow vessels**.', 'In a diagram of the skin, show the **vessel width**, the **sweat gland** and the **hair**.'],
      n: 'Exam tips. Use the exact words vasodilation and vasoconstriction. Say that sweat evaporates and takes heat with it. Do not mix up the two days: hot means wide vessels and cold means narrow ones. In a skin diagram show the vessel, the sweat gland and the hair.',
    }),
  ],
});
