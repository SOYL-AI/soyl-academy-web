/**
 * Gallery / test fixtures: realistic slides that exercise every layout in deck.ts and every visual
 * kind in visual.ts, in English and Hindi (Devanagari), with maths and mhchem. Original content.
 * Raw JSON-shaped input: __tests__/fixtures.test.ts proves both decks parse with the shared Deck schema.
 */

export const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" font-size="13">
  <title>Light ray refracting from air into glass</title>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="currentColor"/>
    </marker>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--diagram-blue)" stop-opacity="0.25"/>
      <stop offset="1" stop-color="var(--diagram-blue)" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect x="10" y="100" width="300" height="90" fill="url(#glass)" stroke="var(--diagram-muted)"/>
  <line x1="160" y1="10" x2="160" y2="190" stroke="var(--diagram-muted)" stroke-dasharray="5 4"/>
  <line x1="70" y1="20" x2="160" y2="100" stroke="var(--diagram-red)" stroke-width="2.5" marker-end="url(#arrow)"/>
  <line x1="160" y1="100" x2="205" y2="185" stroke="var(--diagram-red)" stroke-width="2.5" marker-end="url(#arrow)"/>
  <text x="20" y="90" fill="currentColor">Air</text>
  <text x="20" y="180" fill="currentColor">Glass (blue)</text>
  <text x="168" y="30" fill="currentColor" class="diagram-label">Normal</text>
  <text x="66" y="16" fill="currentColor">Incident ray</text>
  <text x="212" y="170" fill="currentColor">Refracted ray</text>
</svg>`;

/** English sample deck: one slide per layout and every visual kind. */
export const SAMPLE_DECK = {
  unit: 'cbse-10-mathematics-ch06',
  part: null,
  version: 1,
  title: 'Design system sample: visuals, maths and chemistry',
  language: 'en',
  goals: ['Read a straight-line graph', 'Use the Pythagoras theorem in a right triangle', 'Balance a simple chemical equation'],
  status: 'draft',
  slides: [
    {
      id: 's01',
      layout: 'title',
      heading: 'Lines, triangles and reactions',
      body_md: 'A short tour of everything a lesson slide can show.',
      narration: 'Welcome. In this short lesson we will look at a graph, a triangle and a chemical reaction. Read each slide at your own pace, or press play to listen.',
    },
    {
      id: 's02',
      layout: 'concept',
      heading: 'The slope of a line',
      body_md: 'A straight line has the equation $y = mx + c$. The **slope** $m$ tells you how steeply it rises; $c$ is where it crosses the $y$-axis.',
      bullets: ['If $m > 0$ the line rises to the right', 'If $m < 0$ it falls', 'Parallel lines have equal slopes'],
      visual: {
        kind: 'plot',
        spec: {
          x: { min: -4, max: 4, label: 'x' },
          y: { min: -3, max: 7, label: 'y' },
          functions: [
            { expr: '2x + 1', label: 'y = 2x + 1' },
            { expr: '-x + 2', label: 'y = −x + 2' },
            { expr: '0.25x^2', label: 'y = x²/4', domain: [-4, 4] },
          ],
          points: [{ at: [0, 1], label: '(0, 1)' }],
          grid: true,
        },
        alt: 'Graph of the lines y = 2x + 1 (rising) and y = −x + 2 (falling), and the curve y = x²/4, with the y-intercept (0, 1) marked',
        caption: 'Two lines and a parabola on the same axes',
      },
      narration: 'Look at the two straight lines. The one that rises to the right has a positive slope. The one that falls has a negative slope. The curved one is not a straight line at all.',
    },
    {
      id: 's03',
      layout: 'diagram',
      heading: 'Pythagoras in a right triangle',
      body_md: 'In right triangle $ABC$ with the right angle at $B$:',
      math: ['AC^2 = AB^2 + BC^2', '\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5'],
      visual: {
        kind: 'geometry',
        spec: {
          width: 8,
          height: 6,
          points: { A: [1, 5], B: [1, 1], C: [7, 1] },
          segments: [
            { from: 'A', to: 'B', label: '3 cm' },
            { from: 'B', to: 'C', label: '4 cm' },
            { from: 'A', to: 'C', label: '5 cm' },
          ],
          angles: [
            { at: 'B', from: 'A', to: 'C', right: true },
            { at: 'C', from: 'B', to: 'A', label: 'θ' },
          ],
          polygons: [{ vertices: ['A', 'B', 'C'], fill: true }],
          circles: [],
        },
        alt: 'Right triangle ABC with the right angle at B; AB is 3 cm, BC is 4 cm and the hypotenuse AC is 5 cm; angle θ is at C',
      },
      narration: 'Here is a right triangle. The right angle is at B. The longest side, opposite the right angle, is called the hypotenuse. Its square equals the sum of the squares of the other two sides.',
    },
    {
      id: 's04',
      layout: 'two-column',
      heading: 'Physical or chemical change?',
      columns: [
        '**Physical change**\n\n- No new substance\n- Usually reversible\n- Example: ice melting',
        '**Chemical change**\n\n- New substance forms\n- Hard to reverse\n- Example: \\ce{Mg + O2 -> MgO} (unbalanced)',
      ],
      narration: 'Compare the two columns. A physical change makes no new substance. A chemical change does, and it is usually hard to undo. Burning a magnesium ribbon is a chemical change.',
    },
    {
      id: 's05',
      layout: 'example',
      heading: 'Balance the burning of magnesium',
      body_md: 'Balance: magnesium + oxygen → magnesium oxide.',
      bullets: [
        'Write the skeletal equation: $\\ce{Mg + O2 -> MgO}$',
        'Oxygen: 2 on the left, 1 on the right, so put 2 before MgO',
        'Magnesium: now 2 on the right, so put 2 before Mg',
        'Check every element: Mg 2 = 2, O 2 = 2 ✓',
      ],
      math: ['\\ce{2Mg + O2 ->[\\Delta] 2MgO}'],
      visual: {
        kind: 'table',
        spec: {
          headers: ['Element', 'Left side', 'Right side'],
          rows: [
            ['Mg', '2', '2'],
            ['O', '2', '2'],
          ],
        },
        alt: 'Atom count after balancing: magnesium 2 on each side, oxygen 2 on each side',
        caption: 'Atom count after balancing',
      },
      narration: 'Let us balance this step by step. Count the oxygen atoms first, then fix magnesium. Always finish by counting every element on both sides.',
    },
    {
      id: 's06',
      layout: 'concept',
      heading: 'From words to a balanced equation',
      body_md: 'Every chemical equation goes through the same four steps.',
      visual: {
        kind: 'flow',
        spec: {
          direction: 'LR',
          nodes: [
            { id: 'w', label: 'Word equation' },
            { id: 's', label: 'Skeletal equation' },
            { id: 'b', label: 'Balanced equation' },
            { id: 'st', label: 'Add state symbols' },
          ],
          edges: [
            { from: 'w', to: 's', label: 'formulae' },
            { from: 's', to: 'b', label: 'count atoms' },
            { from: 'b', to: 'st' },
          ],
        },
        alt: 'Flow: word equation, then skeletal equation, then balanced equation, then add state symbols',
      },
      narration: 'Think of it as four steps. Words first, then formulae, then balancing, and finally the state symbols that tell us solid, liquid, gas or solution.',
    },
    {
      id: 's07',
      layout: 'diagram',
      heading: 'Refraction at a glass surface',
      body_md: 'Light bends **towards the normal** when it enters a denser medium.',
      visual: { kind: 'svg', spec: SAMPLE_SVG, alt: 'A light ray in air strikes a glass block and bends towards the dashed normal as it enters the glass', caption: 'Hand-drawn SVG, sanitised before rendering' },
      narration: 'When light goes from air into glass, it slows down and bends towards the normal. The dashed line is the normal, drawn at right angles to the surface.',
    },
    {
      id: 's08',
      layout: 'diagram',
      heading: 'Ethanol, drawn from SMILES',
      body_md: 'Ethanol, $\\ce{C2H5OH}$, is the alcohol in hand sanitiser.',
      visual: { kind: 'chem', spec: { smiles: 'CCO', name: 'Ethanol' }, alt: 'Structure of ethanol: two carbon atoms in a chain with an OH group on the second carbon' },
      narration: 'This is ethanol. Two carbon atoms are joined in a chain, and the second one carries an O H group. That group is what makes it an alcohol.',
    },
    {
      id: 's09',
      layout: 'check',
      heading: 'Quick check: which is balanced?',
      body_md: 'Choose the balanced equation.',
      check_question_id: 'q_sample_balance_001',
      narration: 'Your turn. Look at the four equations and pick the one where every element has the same number of atoms on both sides.',
    },
    {
      id: 's10',
      layout: 'summary',
      heading: 'Summary',
      bullets: ['Slope $m$ in $y = mx + c$ sets the steepness', '$AC^2 = AB^2 + BC^2$ in a right triangle', 'Balance equations by counting atoms of each element'],
      visual: {
        kind: 'chem',
        spec: { equation: '2H2 + O2 -> 2H2O' },
        alt: 'Balanced equation: two hydrogen molecules and one oxygen molecule form two water molecules',
      },
      narration: 'Let us recap. Slope tells steepness. Pythagoras links the three sides of a right triangle. And a balanced equation has the same atoms on both sides.',
    },
    {
      id: 's11',
      layout: 'exam-tips',
      heading: 'Exam tips',
      bullets: ['Write state symbols such as $\\ce{(s)}$, $\\ce{(aq)}$ when the question asks', 'Never change a subscript to balance: change the coefficient', 'Show the formula before substituting numbers: step marks are given for it'],
      narration: 'Three tips for the board exam. Add state symbols when asked. Balance with coefficients, never by changing formulae. And write the formula before you put in numbers, because it earns a mark.',
    },
  ],
};

/** Hindi sample deck (Devanagari), including maths and a Devanagari table. */
export const SAMPLE_DECK_HI = {
  unit: 'cbse-10-hindi-ch02',
  part: null,
  version: 1,
  title: 'संज्ञा और उसके भेद',
  language: 'hi',
  goals: ['संज्ञा की पहचान करना', 'संज्ञा के तीन भेद समझना'],
  status: 'draft',
  slides: [
    {
      id: 's01',
      layout: 'concept',
      heading: 'संज्ञा किसे कहते हैं?',
      body_md: 'किसी **व्यक्ति**, **वस्तु**, **स्थान** या **भाव** के नाम को *संज्ञा* कहते हैं। जैसे — राम, किताब, दिल्ली, ख़ुशी।',
      bullets: ['व्यक्तिवाचक संज्ञा — गंगा, ताजमहल', 'जातिवाचक संज्ञा — नदी, इमारत', 'भाववाचक संज्ञा — मिठास, बचपन'],
      visual: {
        kind: 'table',
        spec: {
          headers: ['भेद', 'उदाहरण'],
          rows: [
            ['व्यक्तिवाचक', 'हिमालय, कबीर'],
            ['जातिवाचक', 'पहाड़, कवि'],
            ['भाववाचक', 'ऊँचाई, सच्चाई'],
          ],
        },
        alt: 'संज्ञा के तीन भेद और उनके उदाहरण की तालिका',
      },
      narration: 'संज्ञा का मतलब है नाम। किसी व्यक्ति, जगह, चीज़ या भाव का नाम संज्ञा कहलाता है। आइए इसके तीन भेद देखें।',
    },
    {
      id: 's02',
      layout: 'example',
      heading: 'गणित में भी हिंदी',
      body_md: 'एक आयत की लंबाई $l = 8$ सेमी और चौड़ाई $b = 5$ सेमी है। क्षेत्रफल ज्ञात कीजिए।',
      bullets: ['सूत्र लिखिए: $A = l \\times b$', 'मान रखिए: $A = 8 \\times 5$', 'उत्तर: $A = 40$ वर्ग सेमी'],
      narration: 'पहले सूत्र लिखिए। फिर लंबाई और चौड़ाई के मान रखिए। आठ गुणा पाँच चालीस होता है, इसलिए क्षेत्रफल चालीस वर्ग सेंटीमीटर है।',
    },
  ],
};

/** The question shown on the check slide (rendered by the gallery's renderCheck). */
export const SAMPLE_CHECK_QUESTION = {
  id: 'q_sample_balance_001',
  stem_md: 'Which equation is balanced?',
  options: [
    { id: 'a', text_md: '$\\ce{H2 + O2 -> H2O}$' },
    { id: 'b', text_md: '$\\ce{2H2 + O2 -> 2H2O}$' },
    { id: 'c', text_md: '$\\ce{H2 + 2O2 -> 2H2O}$' },
    { id: 'd', text_md: '$\\ce{2H2 + 2O2 -> H2O}$' },
  ],
};
