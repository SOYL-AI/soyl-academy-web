// Build ICSE 10 Computer Applications ch06 "Class as the Basis of all Computation". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch06/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch06', 'computer-science');
useJavaCache(SRC);
const A = await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const { code, F, ic, ev, out, oline, mustFail, expect, full, rtErr } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const one = (s) => s.split('\n').join(' / ');
const { smartCard, cardDriver, turnstile, turnDriver, scorer, scorerDriver } = A;
const { seedPacket, seedDriver, twoPackets, hostelRoom, roomRun } = B;
const { plot, plotDefaults, copyBody, copyDriver, eqBody, eqDriver, shelfDriver, shop, shopSrc, passDriver, pickDriver, strBody, strDriver } = C;
const sc = (...body) => full(smartCard, 'SmartCard c = new SmartCard();', ...body);

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(out(cardDriver(500, 35.5)), 'Card 4501: balance 489.5, trips 1\ntrue', 'card run');
expect(out(sc('c.recharge(500);', 'System.out.println(c.balance);')), '525.0', 'bonus on 500');
expect(out(sc('c.recharge(200);', 'System.out.println(c.balance);')), '200.0', 'no bonus on 200');
expect(out(turnDriver(3)), '1 1\n1 2\n1 3', 'turnstile');
expect(out(seedDriver(...twoPackets, 'System.out.println(a.costPerSeed());')), '0.5', 'cost a');
expect(out(seedDriver(...twoPackets, 'System.out.println(b.costPerSeed());')), '0.25', 'cost b');
expect(out(roomRun(3, 3)), '3 1 0', 'room run');
expect(out(plotDefaults), '0\n0.0\nfalse\nnull\nnull', 'defaults');
expect(out(copyDriver), '5 9\nOkra: 30 seeds, Rs 18.0', 'copy run');
expect(out(eqDriver), 'false\ntrue\ntrue', 'eq run');
expect(out(passDriver), '20.0 25.0', 'pass run');
expect(out(pickDriver), 'Marigold: 120 seeds, Rs 30.0\ntrue', 'pick run');
expect(out(strDriver), '4\nNEEM\nnull', 'string run');
expect(out(seedDriver(...twoPackets, 'System.out.println(a.variety + " " + a.seeds + " " + a.price);')), 'Tomato 50 25.0', 'seed fields');

// ---------------------------------------------------------------- SVG helpers
const box = (s, x, y, w, h, o = {}) => s.rect(x, y, w, h, { rx: o.rx ?? 8, fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: o.sw ?? 1.6, dash: o.dash });

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Members of a class', 'Variables in a class', 'Methods and state', 'Abstraction', 'Object factory', 'new and the dot operator'], 'Route map of Part 1: members of a class, the three kinds of variable, methods that change state and return values, abstraction, the class as an object factory, and new with the dot operator', 'Part 1 at a glance');
const vEntity = table(
  ['Real metro card', 'In the class SmartCard', 'Kind of member'],
  [
    ['its number', ic('int cardNo'), 'data member (attribute)'],
    ['money left on it', ic('double balance'), 'data member (attribute)'],
    ['journeys paid for', ic('int trips'), 'data member (attribute)'],
    ['can be issued a number, recharged, used, checked', `${ic('setCard')}, ${ic('recharge')}, ${ic('travel')}, ${ic('show')}`, 'member methods (behaviour)'],
  ],
  'Table that maps a real metro card to the class SmartCard: its number, money and journeys become the data members cardNo, balance and trips; what it can do becomes the member methods setCard, recharge, travel and show',
  'Attributes become data members; actions become member methods.',
);
const vAnatomy = (() => {
  const s = new Svg(640, 370);
  box(s, 20, 10, 600, 350, { rx: 10, sw: 2 });
  s.text(320, 34, 'class SmartCard', { size: 17, bold: true });
  box(s, 40, 52, 250, 250, { rx: 8 });
  s.text(165, 74, 'Data members (state)', { size: 14, bold: true });
  ['int cardNo;', 'double balance;', 'int trips;'].forEach((t, i) => s.text(60, 108 + i * 28, t, { anchor: 'start', size: 14 }));
  box(s, 310, 52, 290, 250, { rx: 8 });
  s.text(455, 74, 'Member methods (behaviour)', { size: 14, bold: true });
  ['void setCard(int no)', 'void recharge(double amount)', 'boolean travel(double fare)', 'void show()'].forEach((t, i) => s.text(326, 108 + i * 28, t, { anchor: 'start', size: 14 }));
  s.text(326, 240, 'local variable: bonus (inside recharge)', { anchor: 'start', size: 12, muted: true });
  s.text(326, 262, 'parameters: no, amount, fare', { anchor: 'start', size: 12, muted: true });
  s.text(320, 330, 'Every object made from this class gets its own cardNo, balance and trips', { size: 13, muted: true });
  return s.visual('Diagram of the class SmartCard: a box holding two sections. The data members section lists int cardNo, double balance and int trips. The member methods section lists setCard, recharge, travel and show, with a note that bonus is a local variable of recharge and no, amount and fare are parameters', 'Anatomy of a class: data members on one side, member methods on the other.');
})();
const vEx1 = table(
  ['Name', 'Declared in', 'Kind', 'Type'],
  [
    [ic('cardNo'), 'the class, outside every method', 'data member', ic('int')],
    [ic('balance'), 'the class, outside every method', 'data member', ic('double')],
    [ic('trips'), 'the class, outside every method', 'data member', ic('int')],
    [ic('no'), 'heading of setCard', 'parameter', ic('int')],
    [ic('amount'), 'heading of recharge', 'parameter', ic('double')],
    [ic('bonus'), 'body of recharge', 'local variable', ic('double')],
    [ic('fare'), 'heading of travel', 'parameter', ic('double')],
  ],
  'Table that classifies each name of the class SmartCard: cardNo, balance and trips are data members; no, amount and fare are parameters; bonus is a local variable of recharge',
  'Where a name is declared tells you what kind of variable it is.',
);
const errLocal = mustFail(code('int total;', 'System.out.println(total);'), 'local without value');
const vKinds = table(
  ['', 'Data member', 'Parameter', 'Local variable'],
  [
    ['Declared', 'in the class, outside methods', 'in the method heading', 'inside the method body'],
    ['Created', 'with the object (new)', 'at each call', 'at each call'],
    ['Lost', 'when the object goes', 'when the call ends', 'when the call ends'],
    ['Default value', `yes (${ic(one(out(plotDefaults)))} for Plot)`, 'takes the value of the argument', `none: ${errLocal}`],
  ],
  `Table comparing data members, parameters and local variables by place of declaration, creation, life and default value; a local variable has no default and javac says ${errLocal}`,
  'Only data members get default values.',
);
const trace = [
  ['new SmartCard()', []],
  ['c.setCard(4501);', ['c.setCard(4501);']],
  ['c.recharge(500);', ['c.setCard(4501);', 'c.recharge(500);']],
  ['c.travel(35.5);', ['c.setCard(4501);', 'c.recharge(500);', 'c.travel(35.5);']],
  ['c.travel(900);', ['c.setCard(4501);', 'c.recharge(500);', 'c.travel(35.5);', 'c.travel(900);']],
];
const traceRows = trace.map(([st, pre]) => [ic(st), ic(out(sc(...pre, 'c.show();')))]);
const vTrace = table(
  ['Statement just executed', 'State shown by c.show()'],
  traceRows,
  `Trace table of the state of one SmartCard object: ${trace.map(([st], i) => `after ${st} it shows ${out(sc(...trace[i][1], 'c.show();'))}`).join('; ')}`,
  'The last call is refused: the balance and trips do not change.',
);
const vReads = table(
  ['Member method', 'What it does to the state', 'Return type'],
  [
    [ic('setCard'), 'assigns cardNo', ic('void')],
    [ic('recharge'), 'changes balance (adds the amount and any bonus)', ic('void')],
    [ic('travel'), 'changes balance and trips, but only when the fare can be paid', ic('boolean')],
    [ic('show'), 'only reads the data members and prints them', ic('void')],
  ],
  'Table of the four member methods of SmartCard: setCard assigns cardNo, recharge changes balance, travel changes balance and trips only when the fare can be paid, and show only reads; the return types are void, void, boolean and void',
);
const vRet = table(
  ['Call', 'Return type', 'Value that comes back'],
  [
    [ic('c.travel(35.5)'), ic('boolean'), ic(out(sc('c.recharge(500);', 'System.out.println(c.travel(35.5));')))],
    [ic('c.travel(900)'), ic('boolean'), ic(out(sc('c.recharge(500);', 'System.out.println(c.travel(900));')))],
    [ic('x.average()'), ic('double'), ic(out(scorerDriver('CricketScorer x = new CricketScorer();', 'x.hit(4);', 'x.hit(6);', 'x.out();', 'System.out.println(x.average());')))],
    [ic('c.show()'), ic('void'), 'nothing: it cannot be stored in a variable'],
  ],
  `Table of values returned by member methods: travel returns ${out(sc('c.recharge(500);', 'System.out.println(c.travel(35.5));'))} when the fare is paid and ${out(sc('c.recharge(500);', 'System.out.println(c.travel(900));'))} when it is refused, average returns a double, and show returns nothing`,
  'A void method returns nothing; any other method must return a value of its declared type.',
);
const vAbs = table(
  ['', 'Kept in the class', 'Left out'],
  [
    ['Entity', 'a metro smart card in the fare program', ''],
    ['Attributes', `${ic('cardNo')}, ${ic('balance')}, ${ic('trips')}`, 'colour of the card, photo of the holder, thickness'],
    ['Actions', `${ic('recharge')}, ${ic('travel')}, ${ic('show')}`, 'printing the card, cutting it into pieces'],
  ],
  'Table of abstraction for a metro smart card: the class keeps cardNo, balance and trips with the actions recharge, travel and show, and leaves out the colour, the photo and the thickness',
  'Abstraction keeps only what the program needs.',
);
const vFactory = (() => {
  const s = new Svg(640, 270);
  box(s, 20, 90, 170, 90, { rx: 10, sw: 2 });
  s.text(105, 118, 'class', { size: 13, muted: true });
  s.text(105, 142, 'SeedPacket', { size: 16, bold: true });
  s.text(105, 164, 'blueprint', { size: 13, muted: true });
  const objs = [['a', 'Tomato', 50, '25.0'], ['b', 'Marigold', 120, '30.0'], ['c', 'Okra', 40, '20.0']];
  objs.forEach(([v, n, k, p], i) => {
    const y = 24 + i * 80;
    const shown = out(seedDriver(`SeedPacket ${v} = new SeedPacket();`, `${v}.set("${n}", ${k}, ${p});`, `${v}.show();`));
    box(s, 290, y, 330, 52, { rx: 8 });
    s.text(305, y + 26, `${v}`, { anchor: 'start', size: 15, bold: true });
    s.text(335, y + 26, shown, { anchor: 'start', size: 14 });
    s.arrow(190, 135, 290, y + 26, { sw: 1.6 });
    s.text(250, 135 + (y + 26 - 135) * 0.5 - 9, 'new', { size: 12, bold: true });
  });
  return s.visual('Diagram of a class as an object factory: the class SeedPacket on the left with three arrows labelled new to three objects a, b and c, each with its own values: Tomato 50 seeds Rs 25.0, Marigold 120 seeds Rs 30.0 and Okra 40 seeds Rs 20.0', 'One class, many objects, each with its own state.');
})();
const vNew = flow('LR', ['SeedPacket p', 'new SeedPacket()', 'object made, members get default values', 'reference stored in p', 'p.set(...) and p.show()'], 'Flow of creating an object: the variable p is declared, new SeedPacket creates the object with default values, its reference is stored in p, and p is then used with the dot operator to call set and show', 'Declaring a variable and creating an object are two different things.');
const vEx3 = table(
  ['Statement', 'Result'],
  [
    [ic('a.show();'), ic(out(seedDriver(...twoPackets, 'a.show();')))],
    [ic('b.show();'), ic(out(seedDriver(...twoPackets, 'b.show();')))],
    [ic('a.costPerSeed()'), ic(out(seedDriver(...twoPackets, 'System.out.println(a.costPerSeed());')))],
    [ic('b.costPerSeed()'), ic(out(seedDriver(...twoPackets, 'System.out.println(b.costPerSeed());')))],
  ],
  `Table of results for two SeedPacket objects created from one class: a shows ${out(seedDriver(...twoPackets, 'a.show();'))} and b shows ${out(seedDriver(...twoPackets, 'b.show();'))}; the cost per seed is 0.5 for a and 0.25 for b`,
  'The same method gives different answers on different objects.',
);
const dotCalls = ['a.costPerSeed()', 'b.costPerSeed()', 'a.cheaperThan(b)', 'b.cheaperThan(a)'];
const vDot = table(
  ['Call', 'Whose data it works on', 'Value'],
  [
    [ic(dotCalls[0]), 'object a', ic(out(seedDriver(...twoPackets, `System.out.println(${dotCalls[0]});`)))],
    [ic(dotCalls[1]), 'object b', ic(out(seedDriver(...twoPackets, `System.out.println(${dotCalls[1]});`)))],
    [ic(dotCalls[2]), 'a, and b is passed in', ic(out(seedDriver(...twoPackets, `System.out.println(${dotCalls[2]});`)))],
    [ic(dotCalls[3]), 'b, and a is passed in', ic(out(seedDriver(...twoPackets, `System.out.println(${dotCalls[3]});`)))],
  ],
  `Table of four calls with the dot operator on two seed packets: ${dotCalls.map((c) => `${c} gives ${out(seedDriver(...twoPackets, `System.out.println(${c});`))}`).join('; ')}`,
  'object.method(): the object before the dot receives the message.',
);
const roomPairs = [[3, 3], [2, 3], [5, 1], [1, 1]];
const roomWhy = ['3 fit; only 1 bed left for the second request', 'both requests fit', 'the first takes all 4 beds, nothing is left', 'both fit, 2 beds stay free'];
const vEx4 = table(
  ['admit(x), then admit(y)', 'Output a b vacancy', 'Why'],
  roomPairs.map(([x, y], i) => [`${x}, ${y}`, ic(out(roomRun(x, y))), roomWhy[i]]),
  `Trace table of the hostel room with 4 beds: ${roomPairs.map(([x, y]) => `admitting ${x} and then ${y} students prints ${out(roomRun(x, y))}`).join('; ')}`,
  'admit returns the number actually admitted.',
);
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['Data members', 'variables of the class outside methods; each object has its own copy; default values'],
    ['Member methods', 'give the behaviour; may read or change the data members; void or a return type'],
    ['Local variable, parameter', 'exist only during one call; a local variable has no default value'],
    ['Abstraction', 'keep only the attributes and actions the program needs'],
    ['Object factory', 'one class, many objects made with new, each with its own state'],
    ['Dot operator', 'object.method(): the object before the dot receives the message'],
  ],
  'Summary table of Part 1: data members, member methods, local variables and parameters, abstraction, the class as an object factory and the dot operator',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Primitive and composite types', 'Declaring variables', 'Value and reference', 'Default values', 'Copying', 'Comparing and null', 'Objects as arguments'], 'Route map of Part 2: primitive and composite types, declaring variables, value and reference, default values, copying, comparing with double equals and null, and objects as arguments and results', 'Part 2 at a glance');
const vFamilies = table(
  ['', 'Primitive', 'Composite (class)'],
  [
    ['Examples', `${ic('int')}, ${ic('double')}, ${ic('char')}, ${ic('boolean')}`, `${ic('String')}, ${ic('SeedPacket')}, ${ic('Plot')}`],
    ['Defined by', 'the language', 'a class (built in or written by you)'],
    ['A variable holds', 'the value itself', 'the reference of an object'],
    ['Memory size', 'fixed by the language', 'depends on the data members'],
    ['Default as a data member', `${ev('0')}, ${ev('0.0')}, ${ev('false')}`, 'null'],
  ],
  'Comparison table of primitive and composite types: examples, who defines them, what a variable holds, memory size and the default value as a data member',
);
const sizeTypes = [['byte', 'Byte'], ['short', 'Short'], ['char', 'Character'], ['int', 'Integer'], ['long', 'Long'], ['double', 'Double']];
const vSizes = table(
  ['Primitive type', 'Size in bytes'],
  sizeTypes.map(([t, w]) => [ic(t), ev(`${w}.BYTES`)]),
  `Table of the fixed sizes of six primitive types in bytes: ${sizeTypes.map(([t, w]) => `${t} ${ev(`${w}.BYTES`)}`).join(', ')}`,
  'The size of a primitive type never changes from one program to another.',
);
const vPlot = (() => {
  const s = new Svg(640, 330);
  box(s, 20, 10, 330, 310, { rx: 10, sw: 2 });
  s.text(185, 34, 'class Plot  (a composite type)', { size: 15, bold: true });
  const rows = [['int number', 'primitive'], ['double area', 'primitive'], ['boolean sold', 'primitive'], ['String owner', 'composite'], ['SeedPacket crop', 'composite']];
  rows.forEach(([t, k], i) => {
    const y = 66 + i * 50;
    box(s, 40, y - 18, 290, 38, { rx: 6, color: k === 'primitive' ? 'accent' : 'muted', dash: k !== 'primitive' });
    s.text(56, y + 1, t, { anchor: 'start', size: 14 });
    s.text(314, y + 1, k, { anchor: 'end', size: 12, muted: true });
  });
  box(s, 420, 160, 200, 120, { rx: 8, color: 'muted', dash: true });
  s.text(520, 182, 'class SeedPacket', { size: 13, bold: true });
  ['String variety', 'int seeds', 'double price'].forEach((t, i) => s.text(436, 210 + i * 24, t, { anchor: 'start', size: 13 }));
  s.arrow(330, 266, 420, 250, { sw: 1.6 });
  s.text(480, 140, 'built from primitive members too', { size: 12, muted: true });
  return s.visual('Diagram of the class Plot as a composite type: its members are three primitive ones, int number, double area and boolean sold, and two composite ones, String owner and SeedPacket crop; an arrow from crop leads to the class SeedPacket, which has String variety, int seeds and double price', 'A class groups members, some primitive and some composite.');
})();
const errP = mustFail(seedDriver('SeedPacket p;', 'p.show();'), 'declared only');
const vDecl = table(
  ['Declaration', 'What exists afterwards', 'What the variable holds'],
  [
    [ic('int x = 5;'), 'one int variable', '5'],
    [ic('SeedPacket p;'), 'a reference variable only', `nothing usable: javac says ${errP}`],
    [ic('SeedPacket p = new SeedPacket();'), 'the variable and one object', 'the reference of the object'],
    [ic('SeedPacket p = null;'), 'a reference variable only', 'null (no object)'],
  ],
  `Table of declarations: int x equal to 5 holds 5; a declared SeedPacket variable holds nothing usable and javac says ${errP}; with new it holds the reference of an object; with null it refers to no object`,
);
const vHold = (() => {
  const s = new Svg(640, 270);
  s.text(100, 22, 'int x = 5;', { size: 14, bold: true });
  box(s, 40, 34, 120, 46, { rx: 6 });
  s.text(100, 57, '5', { size: 18, bold: true });
  s.text(100, 120, 'SeedPacket a;', { size: 14, bold: true });
  box(s, 40, 132, 120, 46, { rx: 6 });
  s.dot(100, 155, 6);
  s.arrow(106, 155, 300, 170, { sw: 1.8, color: 'accent' });
  s.text(220, 138, 'reference', { size: 13, bold: true });
  box(s, 300, 110, 310, 120, { rx: 8 });
  s.text(455, 130, 'object of SeedPacket', { size: 13, muted: true });
  ['variety: Tomato', 'seeds: 50', 'price: 25.0'].forEach((t, i) => s.text(330, 158 + i * 24, t, { anchor: 'start', size: 14 }));
  s.text(320, 258, 'x holds the value 5; a holds only the way to find the object', { size: 13, muted: true });
  return s.visual('Diagram: the primitive variable x holds the value 5 inside its own box; the reference variable a holds an arrow that leads to a separate object of the class SeedPacket with variety Tomato, seeds 50 and price 25.0', 'A primitive variable holds a value; an object variable holds a reference.');
})();
const defRows = [['number', 'int'], ['area', 'double'], ['sold', 'boolean'], ['owner', 'String'], ['crop', 'SeedPacket']];
const defVals = out(plotDefaults).split('\n');
const vDefaults = table(
  ['Data member', 'Type', 'Value in a new Plot object'],
  defRows.map(([n, t], i) => [ic(n), ic(t), ic(defVals[i])]),
  `Table of default values of a new Plot object: ${defRows.map(([n], i) => `${n} is ${defVals[i]}`).join(', ')}`,
  'Printed by running the program; every member starts with a default.',
);
const vDefRule = table(
  ['Type of the member', 'Default value'],
  [
    ['int', defVals[0]],
    ['double', defVals[1]],
    ['boolean', defVals[2]],
    ['any class type (String, SeedPacket)', defVals[3]],
  ],
  `Table of default values by type: int ${defVals[0]}, double ${defVals[1]}, boolean ${defVals[2]}, any class type ${defVals[3]}`,
  'A local variable has no default value.',
);
const cpSteps = [['int x = 5;', 0], ['int y = x;', 1], ['y = 9;', 2]];
const cpPre = ['int x = 5;', 'int y = x;', 'y = 9;'];
const vCopyPrim = table(
  ['After the statement', 'x', 'y'],
  [
    [ic('int x = 5;'), out(code('int x = 5;', 'System.out.println(x);')), 'not yet declared'],
    [ic('int y = x;'), out(code('int x = 5;', 'int y = x;', 'System.out.println(x);')), out(code('int x = 5;', 'int y = x;', 'System.out.println(y);'))],
    [ic('y = 9;'), out(code(...cpPre, 'System.out.println(x);')), out(code(...cpPre, 'System.out.println(y);'))],
  ],
  `Trace table of copying an int: x is ${out(code(...cpPre, 'System.out.println(x);'))} and y is ${out(code(...cpPre, 'System.out.println(y);'))} at the end, so the copy is independent of the original`,
  'The value is copied; the two variables are independent.',
);
const vAlias = (() => {
  const s = new Svg(640, 260);
  box(s, 40, 40, 110, 44, { rx: 6 });
  s.text(95, 62, 'a', { size: 16, bold: true });
  box(s, 40, 150, 110, 44, { rx: 6 });
  s.text(95, 172, 'b', { size: 16, bold: true });
  s.arrow(150, 62, 330, 108, { sw: 1.8, color: 'accent' });
  s.arrow(150, 172, 330, 134, { sw: 1.8, color: 'accent' });
  box(s, 330, 70, 280, 110, { rx: 8 });
  s.text(470, 90, 'the one SeedPacket object', { size: 13, muted: true });
  ['variety: Okra', 'seeds: 30', 'price: 18.0'].forEach((t, i) => s.text(360, 118 + i * 24, t, { anchor: 'start', size: 14 }));
  s.text(320, 240, 'b = a copied the reference: a change through b is seen through a', { size: 13, muted: true });
  return s.visual('Diagram of two reference variables a and b with arrows to one and the same SeedPacket object whose current values are variety Okra, seeds 30 and price 18.0; the caption says that copying a into b copied the reference, so a change made through b is seen through a', 'Two names, one object.');
})();
const vEx2 = table(
  ['Statement', 'Result'],
  [
    [ic('int y = x;  y = 9;'), `x is still ${out(seedDriver('int x = 5;', 'int y = x;', 'y = 9;', 'System.out.println(x);'))}; y is ${out(seedDriver('int x = 5;', 'int y = x;', 'y = 9;', 'System.out.println(y);'))}`],
    [ic('a.show();  (before b.set)'), ic(out(seedDriver(...copyBody.slice(3, 6), 'a.show();')))],
    [ic('b.set("Okra", 30, 18.0);  a.show();'), ic(out(seedDriver(...copyBody.slice(3, 7), 'a.show();')))],
  ],
  `Trace table: copying an int leaves x at ${out(seedDriver('int x = 5;', 'int y = x;', 'y = 9;', 'System.out.println(x);'))} when y changes; before b.set, a shows ${out(seedDriver(...copyBody.slice(3, 6), 'a.show();'))}; after b.set, a shows ${out(copyDriver).split('\n')[1]} because a and b refer to one object`,
);
const eqExprs = [['a == b', 'two different objects'], ['a.price == b.price', 'two double values compared'], ['a == c', 'c holds the same reference as a']];
const vEq = table(
  ['Expression', 'Value', 'What is compared'],
  eqExprs.map(([e, w]) => [ic(e), out(seedDriver(...eqBody, `System.out.println(${e});`)), w]),
  `Table of equality tests on SeedPacket objects: ${eqExprs.map(([e]) => `${e} is ${out(seedDriver(...eqBody, `System.out.println(${e});`))}`).join(', ')}`,
  'For objects, == compares references, not contents.',
);
const npeMsg = rtErr(shelfDriver);
const vNull = table(
  ['Code', 'Result'],
  [
    [ic('String t = null;  System.out.println(t);'), ic(out(code('String t = null;', 'System.out.println(t);')))],
    [ic('Shelf s = new Shelf();  s.check();'), `run-time error: ${npeMsg}`],
  ],
  `Table about null: printing a null String shows ${out(code('String t = null;', 'System.out.println(t);'))}, while calling a method through a null reference stops the program with ${npeMsg}`,
  'null refers to no object, so there is nothing to receive the call.',
);
const vString = table(
  ['Statement', 'Output'],
  [
    [ic('s.length()'), out(code('String s = "Neem";', 'System.out.println(s.length());'))],
    [ic('s.toUpperCase()'), out(code('String s = "Neem";', 'System.out.println(s.toUpperCase());'))],
    [ic('String t = null; println(t)'), out(code('String t = null;', 'System.out.println(t);'))],
  ],
  'Table of String behaviour: a String variable called s holding Neem has length 4 and upper case NEEM; a String variable set to null prints null',
  'String is a class, so a String variable holds a reference.',
);
const vEx3b = table(
  ['Call in main', 'Argument', 'What the method receives', 'Effect in main'],
  [
    [ic('s.cutObject(a);'), 'object', 'a copy of the reference', `price of a is now ${out(passDriver).split(' ')[0]}`],
    [ic('s.cutNumber(rate);'), 'double', 'a copy of the value', `rate is still ${out(passDriver).split(' ')[1]}`],
  ],
  `Table about arguments: cutObject receives a copy of the reference, so the price of the object becomes ${out(passDriver).split(' ')[0]}; cutNumber receives a copy of the value, so rate stays ${out(passDriver).split(' ')[1]}`,
  `Output of the program: ${out(passDriver)}`,
);
const vReturn = table(
  ['Statement', 'Output'],
  [
    [ic('SeedPacket best = s.pick(a, b);  best.show();'), ic(out(pickDriver).split('\n')[0])],
    [ic('System.out.println(best == b);'), out(pickDriver).split('\n')[1]],
  ],
  `Table about a returned object: pick returns the reference of one of the arguments, so best.show() prints ${out(pickDriver).split('\n')[0]} and best == b is ${out(pickDriver).split('\n')[1]}`,
  'A method can return a reference to an existing object.',
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['Primitive types', 'hold the value itself; fixed size; defaults 0, 0.0, false'],
    ['Composite types', 'defined by a class; variable holds a reference; default null'],
    ['Declaration', 'a class-type variable alone creates no object; new does'],
    ['Copying', 'int: value copied; object variable: reference copied (an alias)'],
    ['==', 'for objects compares references, not contents'],
    ['null', 'no object; a call through it gives NullPointerException'],
  ],
  'Summary table of Part 2: primitive and composite types, declaration against creation, value copy against reference copy, double equals on objects, and null',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Members of a Class, Abstraction and Objects',
  goals: [
    'Identify data members, member methods, local variables and parameters in a class',
    'Explain how member methods read, change and return the state of an object',
    'Model a real-life entity as a class by choosing its attributes for a purpose (abstraction)',
    'Create several objects from one class with new and use them with the dot operator',
  ],
  slides: [
    sl('title', 'Class as the basis of all computation', {
      b: 'Part 1: the **members of a class**, three kinds of variable, **abstraction**, the class as an **object factory**, and **new**.',
      v: vRoute1,
      n: 'Welcome. In Java every program is built from classes. In this part we look inside a class: its data members and member methods, and the difference between data members, local variables and parameters. Then we model real things as classes, choosing only the attributes that matter, and see how one class makes many objects with the new operator.',
    }),
    sl('concept', 'Entities, state and behaviour', {
      b: 'A real-life **entity** is modelled by a class. Its **attributes** become **data members** (the state) and what it can do becomes **member methods** (the behaviour).',
      v: vEntity,
      n: 'Think of a metro smart card. It has a number, some money, and a count of journeys. These attributes become the data members of the class: the state of the card. The card can be issued a number, recharged, used for a journey and checked. These actions become member methods: the behaviour. State and behaviour together make an object.',
    }),
    sl('concept', 'Anatomy of a class definition', {
      b: `${F(smartCard)}`,
      v: vAnatomy,
      n: 'This is the anatomy of the class SmartCard. The data members are written once, outside every method: card number, balance and trips. Then come the member methods, each with a return type, a name and a list of parameters in brackets. Inside the method recharge there is also a local variable called bonus. Every object made from the class gets its own copy of the data members.',
    }),
    sl('example', 'Worked example 1: identify the members', {
      b: 'Look at the class above. For every name, find **where it is declared**; that tells its kind. The methods are setCard, recharge, travel and show.',
      v: vEx1,
      n: 'Let us sort the names of the class SmartCard. Card number, balance and trips are declared in the class outside every method, so they are data members. The names no, amount and fare are written in method headings, so they are parameters. The name bonus is declared inside the body of recharge, so it is a local variable. The class has three data members and four member methods.',
    }),
    sl('concept', 'Data member, parameter, local variable', {
      b: 'The three kinds of variable differ in **where they are declared**, **how long they live** and whether they get a **default value**.',
      v: vKinds,
      n: 'The three kinds of variable differ in three ways. A data member is declared in the class, is created with the object and has a default value. A parameter is declared in the method heading and takes the value of the argument. A local variable is declared inside the method, starts afresh at each call and has no default value. Using it before giving it a value is a compile time error.',
    }),
    sl('check', 'Quick check: which is local?', {
      b: 'Choose the correct answer.',
      chk: 'm_local_var',
      n: 'Look for the variable declared inside the body of a method.',
    }),
    sl('concept', 'Methods that read and change state', {
      b: 'A member method can **read** the data members, **change** them with assignment, or both. A change made by one call is still there at the next call.',
      v: vReads,
      n: 'Member methods work on the data members. The method set card assigns the number. Recharge changes the balance. Travel changes the balance and the trips, but only when the fare can be paid. Show only reads the data members and prints them. A change made by one call stays in the object, and the next call sees it.',
    }),
    sl('example', 'Worked example 2: tracing the state of one card', {
      b: `${F(code('SmartCard c = new SmartCard();', 'c.setCard(4501);', 'c.recharge(500);', 'c.travel(35.5);', 'c.travel(900);', 'c.show();'))}\n\nAfter each statement the state is shown with \`c.show()\`.`,
      v: vTrace,
      n: 'Let us follow one card. A new card has everything at zero. Then the number is set. Recharging with five hundred earns the bonus of twenty five, so the balance is five hundred twenty five. A journey of thirty five and a half leaves four hundred eighty nine and a half, with one trip. The last journey costs nine hundred, which the balance cannot pay, so nothing changes.',
    }),
    sl('check', 'Quick check: two cards', {
      b: 'Write the exact output.',
      chk: 'co_two_cards',
      n: 'Each object keeps its own balance and trips, so follow the two cards separately.',
    }),
    sl('concept', 'Methods that return values', {
      b: 'The **return type** in the heading says what comes back. A **void** method returns nothing. Any other method must end with **return** and a value of that type.',
      v: vRet,
      n: 'The return type in the method heading says what kind of value comes back. Travel is a boolean method. It returns true when the fare is paid and false when it is refused, so the caller can test it. Average returns a double. Show is void: it returns nothing, so its call cannot be stored in a variable.',
    }),
    sl('concept', 'Abstraction: choose what matters', {
      b: '**Abstraction** means modelling only the attributes and actions that the program **needs**. A different purpose gives a different class for the same entity.',
      v: vAbs,
      n: 'No class can describe everything about a real thing. Abstraction means keeping only what the program needs. For a fare program a metro card needs a number, a balance and a trip count, and the actions recharge, travel and show. The colour of the card or the photo of the holder would only add clutter. A different program, such as an identity check, would choose different attributes.',
    }),
    sl('concept', 'The class as an object factory', {
      b: 'A class is a **blueprint**, and also an **object factory**: each use of **new** makes one more **object** with its own copy of the data members.',
      v: vFactory,
      n: 'A class is a blueprint, and also an object factory. The class SeedPacket describes what a packet has and does, but it is not a packet. Each use of the new operator makes one real packet. The three packets in the picture come from the same class, yet each holds its own variety, seeds and price. Changing one never changes another.',
    }),
    sl('concept', 'Creating an object with new', {
      b: `${F(code('SeedPacket p = new SeedPacket();', 'p.set("Tomato", 50, 25.0);', 'p.show();'))}\n\nDeclaring \`p\` makes only a **reference variable**. The object is made by **new**.`,
      v: vNew,
      n: 'Two things happen in one statement. The part before the equals sign declares a reference variable named p. The new operator makes the object, giving its data members default values, and returns its reference, which is stored in p. After that, p is used with the dot operator to call the methods of the object.',
    }),
    sl('check', 'Quick check: how many objects?', {
      b: 'Choose the correct answer.',
      chk: 'm_objects_count',
      n: 'Only the new operator creates an object. Count how many times it is executed.',
    }),
    sl('example', 'Worked example 3: a class for a real-life entity', {
      b: `${F(seedPacket)}\n\nTwo objects are made in main and used with the dot operator.`,
      v: vEx3,
      n: 'Here is a class written for a seed packet: three data members and methods to set, price and show. In main, two objects are made. The first is a tomato packet of fifty seeds for twenty five rupees, which costs half a rupee a seed. The second is a marigold packet of one hundred twenty seeds for thirty rupees, which costs a quarter of a rupee. One method, two answers.',
    }),
    sl('concept', 'Message passing with the dot operator', {
      b: '**object.method(arguments)** sends a message to the object before the dot. The method works on **that object\'s** data members. An object can also be passed **as an argument**.',
      v: vDot,
      n: 'The dot operator sends a message to an object. The cost per seed call on a uses the data of a. The same call on b uses the data of b. The method cheaper than receives another packet as its argument and compares its cost with the cost of the object that received the message. A tomato packet is not cheaper than a marigold packet, but the marigold is cheaper than the tomato.',
    }),
    sl('example', 'Worked example 4: methods with return values', {
      b: `${F(hostelRoom)}\n\nA room has 4 beds. Trace two requests to admit students.`,
      v: vEx4,
      n: 'A hostel room has four beds. The method admit takes only as many students as there are free beds, changes the data member occupied, and returns the number admitted. Asking for three and then three admits three, then only one, and leaves no vacancy. Asking for five and then one admits four, then none. Always read the returned value, not the request.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with its meaning.',
      chk: 'mt_oop_terms',
      n: 'Recall the role of the class, the object, the instance variable and the member method.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Data members hold the state, and each object has its own copy with default values. Member methods give the behaviour and can read, change or return values. Local variables and parameters live only for one call. Abstraction keeps just the attributes the program needs. A class is an object factory: new makes objects, and the dot operator sends them messages.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'To classify a name, find where it is declared: in the class (data member), in the heading (parameter) or in the body (local variable).',
        'A local variable starts afresh at every call; a data member keeps its value as long as the object lives.',
        'Declaring `SeedPacket p;` creates no object; `new` does. Count the `new`s to count the objects.',
        'Trace each object separately: a call on one object never changes another.',
        'In a program, give values with an `accept` or `set` method, create the object with `new` in `main`, and call the methods with the dot operator.',
      ],
      n: 'Some exam tips. To classify a name, find where it is declared. Remember that a local variable starts afresh at each call, while a data member keeps its value. A declaration alone creates no object, so count the uses of new. Trace every object separately. In a program, give values with an accept method, create the object in main, and call its methods with the dot operator.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Primitive and Composite Types: Value and Reference',
  goals: [
    'Distinguish primitive data types from composite (class) types with examples',
    'Explain what a variable holds: a value for a primitive, a reference for an object',
    'Predict default values, copies, == comparisons and NullPointerException',
    'Pass objects to methods and return objects from methods',
  ],
  slides: [
    sl('title', 'Primitive and composite types', {
      b: 'Part 2: **primitive** and **composite** types, **value** and **reference**, default values, copying, **==**, **null** and **String**.',
      v: vRoute2,
      n: 'Welcome to the second part. Every variable has a data type. We compare primitive types, which hold a value, with composite types made from classes, which hold a reference to an object. We study declarations, default values, what copying really copies, why double equals can surprise us, what null means, and how objects travel into and out of methods.',
    }),
    sl('concept', 'Two families of data types', {
      b: '**Primitive** types are built into Java and hold a simple value. **Composite** (class or reference) types are defined by a **class** and group members together.',
      v: vFamilies,
      n: 'Java has two families of data types. The primitive types, such as int, double, char and boolean, are built into the language. A variable of a primitive type holds the value itself. A composite type is defined by a class, whether a library class like String or one you write. A variable of that type holds a reference to an object, and the size of the object depends on its members.',
    }),
    sl('concept', 'Primitive types have a fixed size', {
      b: 'The size of each primitive type is **fixed by the language**: an int is always 4 bytes, a double always 8, in every program.',
      v: vSizes,
      n: 'The size of a primitive type never changes. A byte takes one byte, a short and a char take two, an int takes four, and a long and a double take eight. The numbers in the table were printed by Java itself. An object is different: it must hold all the data members of its class, so its size depends on the class.',
    }),
    sl('concept', 'A class is a user-defined composite type', {
      b: `${F(plot)}\n\nA class can have **primitive** members and **composite** members; the name \`Plot\` can now be used as a type, like \`int\`.`,
      v: vPlot,
      n: 'A class creates a new data type. The class Plot has three primitive members: an int, a double and a boolean. It also has two composite members: a String and a SeedPacket, which is itself a class built from primitive members. After this declaration, Plot can be used as a type, just like int, to declare variables.',
    }),
    sl('check', 'Quick check: primitive or not?', {
      b: 'Choose the correct answer.',
      chk: 'm_prim_list',
      n: 'Recall which types are built into the language and which are classes.',
    }),
    sl('concept', 'Declaring variables of both kinds', {
      b: 'A declaration of a primitive variable gives it a place for the value. A declaration of a class-type variable gives only a **reference variable**: the **object** needs **new**.',
      v: vDecl,
      n: 'Compare four declarations. Int x equals five makes one variable holding five. A SeedPacket variable declared alone makes only a reference variable, and using it is a compile time error. Adding new creates an object and stores its reference. A variable can also be set to null, which means it refers to no object.',
    }),
    sl('concept', 'What the variable holds: value or reference', {
      b: 'A primitive variable holds its **value**. An object variable holds a **reference** (address): the object itself lives elsewhere in memory.',
      v: vHold,
      n: 'In the picture, the variable x holds the value five inside its own box. The variable a holds no packet data at all. It holds a reference, drawn as an arrow, to a separate object that stores the variety, the seeds and the price. When we use a, Java follows the reference to find the object.',
    }),
    sl('example', 'Worked example 1: default values', {
      b: `${F(plotDefaults)}\n\nNothing is assigned to the members of the new \`Plot\`. Predict each printed line.`,
      v: vDefaults,
      n: 'A new Plot object is created and its members are printed without giving any value. The int is zero, the double is zero point zero, and the boolean is false. The String and the SeedPacket are reference members, and their default is null, which means no object. So the output is zero, zero point zero, false, null and null.',
    }),
    sl('concept', 'Default values by type', {
      b: 'Data members get a default value: **0** for int, **0.0** for double, **false** for boolean and **null** for every class type. A **local variable** gets **no** default.',
      v: vDefRule,
      n: 'The rule is simple. Numeric data members start at zero of their type, a boolean starts false, and every member of a class type starts as null. This applies only to data members. A local variable has no default value, and reading it before assigning a value is rejected by the compiler.',
    }),
    sl('check', 'Quick check: default values', {
      b: 'Choose the correct answer.',
      chk: 'm_default_values',
      n: 'Think about the type of each data member of the new object.',
    }),
    sl('concept', 'Copying a primitive: the value is copied', {
      b: `${F(code('int x = 5;', 'int y = x;', 'y = 9;'))}\n\n\`y = x\` copies the **value**, so the two variables are **independent**.`,
      v: vCopyPrim,
      n: 'When an int is copied, its value is copied. After y gets the value of x, both hold five. Changing y to nine does not touch x, which is still five. The two variables are completely independent, because each one holds its own value.',
    }),
    sl('concept', 'Copying an object variable: the reference is copied', {
      b: `${F(code('SeedPacket a = new SeedPacket();', 'SeedPacket b = a;'))}\n\nOnly the **reference** is copied. There is still **one object** and two names for it: an **alias**.`,
      v: vAlias,
      n: 'When an object variable is copied, only the reference is copied, not the object. After b gets the value of a, there is still one packet, with two names. A change made through b is seen through a, because both lead to the same object. To get a second object, we must use new again.',
    }),
    sl('example', 'Worked example 2: value copy against reference copy', {
      b: `${F(code(...copyBody))}\n\nPredict the two output lines.`,
      v: vEx2,
      n: 'Let us trace both copies together. The int y changes to nine, and x stays five. For the packets, b is a copy of a, so they share one object. Calling set through b changes the packet to Okra, thirty seeds, eighteen rupees, and now a shows Okra as well. The output is five and nine on one line, and the Okra packet on the next.',
    }),
    sl('check', 'Quick check: the alias', {
      b: 'Write the exact output.',
      chk: 'co_alias',
      n: 'Remember which copy shares one object and which copy keeps separate values.',
    }),
    sl('concept', 'Comparing with ==', {
      b: 'For primitives, **==** compares **values**. For objects, **==** compares **references**: it is true only when both variables refer to the **same object**.',
      v: vEq,
      n: 'The double equals operator compares what the variables hold. For two prices, which are doubles, it compares the numbers. For two object variables, it compares the references. The packets a and b were made by separate uses of new, so a double equals b is false even though their data are equal. The variable c is a copy of a, so a double equals c is true.',
    }),
    sl('concept', 'null and NullPointerException', {
      b: '**null** is the value of a reference that refers to **no object**. Calling a method through it stops the program with a **NullPointerException**, a run-time error.',
      v: vNull,
      n: 'Null means a reference that refers to no object. Printing a null String simply shows the word null. But calling a method through a null reference is a run time error: there is no object to receive the call. In the example, the shelf has never been given a packet, so its check method stops the program with a NullPointerException. The compiler cannot detect this in advance.',
    }),
    sl('concept', 'String: a built-in composite type', {
      b: '**String** is a class of the Java library, so a String variable holds a **reference**, and it can be **null**. Its methods are called with the dot operator.',
      v: vString,
      n: 'The type String is not primitive. It is a class of the Java library, so a String variable holds a reference to a String object. That is why we can call methods on it with the dot operator, such as length and to upper case. It is also why a String variable can be null. Strings are studied fully in a later chapter.',
    }),
    sl('example', 'Worked example 3: objects as arguments', {
      b: `${F(shop)}\n\nOne call passes an object and another passes a number. Predict what \`main\` prints.`,
      v: vEx3b,
      n: 'A method receives a copy of whatever argument is passed. For an object, the copy is a copy of the reference, so the method reaches the original object, and the price of the packet falls by five to twenty. For a double, the copy is a copy of the value, so only the parameter changes, and the variable in main stays twenty five. The output is twenty point zero and twenty five point zero.',
    }),
    sl('concept', 'Objects returned from methods', {
      b: 'A method can **return an object**: the value that comes back is a **reference**. It may refer to an argument or to a **new** object made inside the method.',
      v: vReturn,
      n: 'A method can also return an object. What comes back is a reference. The pick method returns one of the two packets it received, not a copy. So the returned reference and the original variable lead to the same object, and double equals between them is true. A method may also create a new object with new and return that instead.',
    }),
    sl('check', 'Quick check: reference or content?', {
      b: 'Decide whether the assertion and the reason are true.',
      chk: 'ar_ref_copy',
      n: 'Ask whether an assignment of an object variable copies the object or only the reference.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Primitive types hold a value and have a fixed size. Composite types come from classes; their variables hold a reference. A declaration alone creates no object. Copying an int copies the value, but copying an object variable copies the reference. Double equals on objects compares references. Null refers to no object, and calling a method through it gives a NullPointerException.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Ask for every variable: does it hold a value (primitive) or a reference (object)? The answer decides copying, `==` and defaults.',
        'After `b = a` for objects, draw two arrows to one box; a change through either name shows through both.',
        '`==` on two objects is true only for the same object, even when their data are equal.',
        'Defaults: 0, 0.0, false for primitive members, `null` for class types; a local variable has no default.',
        'A call through `null` gives a `NullPointerException` at run time; the compiler does not catch it.',
      ],
      n: 'Some exam tips. For every variable ask whether it holds a value or a reference. After copying an object variable, draw two arrows to one box. Double equals on objects is true only for the same object. Remember the defaults: zero, zero point zero, false and null. A local variable has no default. A call through null gives a NullPointerException when the program runs.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Class as the Basis of all Computation: notes',
  sections: [
    {
      h: '1. Objects, state and behaviour: members of a class',
      t: 1,
      b: `An object **encapsulates state and behaviour**. The state is held in the **data members** (member variables, instance variables, attributes); the behaviour is given by the **member methods**. Each object has its own copy of the data members.\n\n${F(smartCard)}\n\nSmartCard has 3 data members (\`cardNo\`, \`balance\`, \`trips\`) and 4 member methods (\`setCard\`, \`recharge\`, \`travel\`, \`show\`).\n\nRunning \`c.setCard(4501); c.recharge(500); c.travel(35.5); c.show();\` on a new card prints ${ic(out(cardDriver(500, 35.5)).split('\n')[0])}.`,
      terms: [
        ['Data member', 'A variable declared in a class outside every method; it holds part of the state of an object, and every object has its own copy.'],
        ['Member method', 'A function declared in a class; it gives the behaviour of the objects and works on the data members.'],
        ['State', 'The values held in the data members of an object at a moment.'],
        ['Behaviour', 'What an object can do, defined by the member methods of its class.'],
      ],
      v: vEntity,
      vs: [vAnatomy, vEx1],
    },
    {
      h: '2. Data members, parameters and local variables',
      t: 1,
      b: `- A **data member** is declared in the class; it lives as long as its object and gets a default value.\n- A **parameter** is declared in the method heading and takes the value of the argument of the call.\n- A **local variable** is declared in the body of a method; it is created at every call, lost when the call ends, and has **no default value** (javac: "${errLocal}").\n\nIn \`recharge\` of SmartCard, \`bonus\` is local and \`amount\` is a parameter. In Turnstile, the local variable \`today\` starts again at every call while the data member \`entries\` keeps counting: three calls print ${ic(one(out(turnDriver(3))))}.\n\n${F(turnstile)}`,
      terms: [
        ['Parameter', 'A variable named in the heading of a method that receives the value of the argument given in the call.'],
        ['Local variable', 'A variable declared inside a method; it exists only during one call and has no default value.'],
      ],
      v: vKinds,
      vs: [vTrace],
    },
    {
      h: '3. Member methods: changing state and returning values',
      t: 1,
      b: `A member method can **read** the data members, **change** them by assignment, or return a value. A change stays in the object for the next call.\n\nThe heading gives the **return type**. A **void** method returns nothing, and its call cannot be stored in a variable (\`int n = c.show();\` gives "${mustFail(full(smartCard, 'SmartCard c = new SmartCard();', 'int n = c.show();'))}"). Any other method ends with \`return\` and a value of that type: \`travel\` returns a boolean, which is ${ev('true')} when the fare is paid and ${ev('false')} when it is refused.\n\nA method may be given **objects** as arguments and may **return an object**; both use references.`,
      terms: [
        ['Return type', 'The type of the value a method gives back to its caller; void means that nothing is returned.'],
        ['Message passing', 'Calling a method of an object with the dot operator, in the form object.method(arguments).'],
      ],
      v: vReads,
      vs: [vRet, vDot],
    },
    {
      h: '4. Class as an abstraction and an object factory',
      t: 2,
      b: `A **class** is a **user-defined type** and a **blueprint** for a set of objects. It is an **abstraction**: only the attributes and actions that the program needs are modelled (a fare program keeps \`cardNo\`, \`balance\` and \`trips\` of a metro card, not its colour).\n\nA class is also an **object factory**: every use of \`new\` makes one more **object**, an **instance** of the class, with its own copy of the data members. Two seed packets from one class show ${ic(one(out(seedDriver(...twoPackets, 'a.show();', 'b.show();'))))}.\n\n${F(seedPacket)}`,
      terms: [
        ['Class', 'A user-defined data type that describes the data members and member methods common to a set of objects; a blueprint for objects.'],
        ['Object', 'An instance of a class, created with new, with its own state.'],
        ['Abstraction', 'Modelling only the essential attributes and actions of an entity that the program needs.'],
      ],
      v: vAbs,
      vs: [vFactory, vEx3],
    },
    {
      h: '5. Creating and using objects',
      t: 2,
      b: `${F(code('SeedPacket p = new SeedPacket();', 'p.set("Tomato", 50, 25.0);', 'p.show();'))}\n\nThe pattern is \`ClassName variable = new ClassName();\`. The declaration alone makes only a **reference variable**; using it gives "${errP}". \`new\` creates the object, sets default values and returns its **reference**, which is stored in the variable. Then \`object.method()\` sends a message to the object.\n\nTo count the objects of a program, count the executions of \`new\`. Values are given to an object with an \`accept\` or \`set\` method; constructors are studied in a later chapter.\n\nA hostel room of 4 beds, after \`admit(3)\` and \`admit(3)\`, prints ${ic(out(roomRun(3, 3)))} (admitted, admitted, vacancy).`,
      terms: [
        ['new operator', 'The operator that creates an object of a class and returns its reference.'],
        ['Reference variable', 'A variable of a class type; it holds the reference of an object, or null.'],
      ],
      v: vNew,
      vs: [vDot, vEx4],
    },
    {
      h: '6. Primitive and composite data types',
      t: 3,
      b: `**Primitive** types (\`int\`, \`double\`, \`char\`, \`boolean\` and others) are built into Java; a variable holds the **value**, and the size is fixed (int ${ev('Integer.BYTES')} bytes, double ${ev('Double.BYTES')} bytes). **Composite** (class, reference) types are defined by a class; a variable holds the **reference** of an object, and the size of the object depends on its data members. \`String\` is a built-in composite type; a class such as \`Plot\` is a user-defined one.\n\nDefault values of data members: 0, 0.0, false for primitives and \`null\` for class types. For a new Plot the five members print ${ic(one(out(plotDefaults)))}. A local variable has no default.\n\n${F(plot)}`,
      terms: [
        ['Primitive data type', 'A data type built into Java whose variable holds a single simple value, such as int, double, char or boolean.'],
        ['Composite data type', 'A data type defined by a class; its variable holds the reference of an object that groups several members.'],
        ['null', 'The value of a reference variable that refers to no object; the default value of every class-type data member.'],
      ],
      v: vFamilies,
      vs: [vSizes, vPlot, vDecl, vHold, vDefaults],
    },
    {
      h: '7. Copying, comparing, null and objects in methods',
      t: 3,
      b: `- **Copy:** \`int y = x;\` copies the value; \`SeedPacket b = a;\` copies the **reference**, so a and b are two names for one object (an alias): the copy program prints ${ic(one(out(copyDriver)))}.\n- **Compare:** \`==\` on primitives compares values; on objects it compares references: for two packets with equal data \`a == b\` is ${ev('a == b', 'Object a = new Object();\nObject b = new Object();')}.\n- **null:** a call through a null reference stops the program with a **NullPointerException** ("${npeMsg}"); the compiler cannot see it.\n- **Arguments:** an object argument passes a copy of the reference, so the method can change the object; a primitive argument passes a copy of the value, so the caller's variable does not change (${ic(out(passDriver))}).\n- **String** is a class: a String variable holds a reference and can be null.`,
      terms: [
        ['Alias', 'A second reference variable that refers to the same object as the first.'],
        ['NullPointerException', 'The run-time error that occurs when a method is called through a reference whose value is null.'],
      ],
      v: vCopyPrim,
      vs: [vAlias, vEq, vNull, vEx3b, vReturn],
    },
  ],
  tips: '**Common mistakes**\n- Counting `SeedPacket c;` as an object: a declaration creates only a reference variable; only `new` creates an object.\n- Expecting a local variable to keep its value between calls, or to have a default value.\n- Thinking `b = a` for objects makes a copy of the object; it copies the reference.\n- Using `==` to compare the contents of two objects.\n- Calling a method through a variable that is still `null`.\n- Storing the value of a `void` method in a variable.\n\n**How marks are usually awarded**\n- Output questions: each line in the exact order and format.\n- Error questions: the error named, with the line or the message.\n- Programs (15 marks): the class (data members and methods), `main` with Scanner and `new`, the calls, the output, and the variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What does an object encapsulate?', 'Its state (data members) and its behaviour (member methods).', 'definition', 1],
  ['What is a data member?', 'A variable declared in a class outside every method; each object has its own copy.', 'definition', 1],
  ['What is a member method?', 'A function declared in a class; it gives the behaviour of the objects and works on the data members.', 'definition', 1],
  ['Another name for a data member', 'Instance variable, member variable or attribute.', 'fact', 1],
  ['Where is a local variable declared?', 'Inside the body of a method.', 'fact', 1],
  ['Where is a parameter declared?', 'In the heading of a method, inside the brackets.', 'fact', 1],
  ['Life of a local variable', 'Created at each call of its method and lost when the call ends.', 'concept', 1],
  ['Life of a data member', 'As long as the object that owns it exists.', 'concept', 1],
  ['Does a local variable have a default value?', `No. Using it before assigning a value is a compile-time error: ${errLocal}.`, 'exam-tip', 1],
  ['What does a void method return?', 'Nothing; its call cannot be stored in a variable.', 'fact', 1],
  ['A method that returns a value ends with', 'A return statement with a value of the declared return type.', 'fact', 1],
  ['A member method changes the state of an object by', 'Assigning new values to its data members.', 'concept', 1],
  ['What is a class?', 'A user-defined data type: a blueprint for a set of objects with common data members and methods.', 'definition', 2],
  ['What is an object?', 'An instance of a class, created with new, with its own state.', 'definition', 2],
  ['What is abstraction?', 'Modelling only the essential attributes and actions of an entity that the program needs.', 'definition', 2],
  ['Why is a class an object factory?', 'Every use of new makes one more object, each with its own copy of the data members.', 'concept', 2],
  ['Pattern to create an object', ic('ClassName variable = new ClassName();'), 'fact', 2],
  ['What does `SeedPacket p;` create?', `Only a reference variable, no object. Using p gives the compile-time error: ${errP}.`, 'exam-tip', 2],
  ['What does the new operator do?', 'Creates an object, gives its data members default values and returns its reference.', 'definition', 2],
  ['How do you count the objects in a program?', 'Count how many times new is executed.', 'exam-tip', 2],
  ['What does the dot operator do?', 'In object.method(), it sends a message: the method works on the object before the dot.', 'concept', 2],
  ['What is a primitive data type?', 'A type built into Java whose variable holds the value itself, such as int, double, char, boolean.', 'definition', 3],
  ['What is a composite data type?', 'A type defined by a class; its variable holds the reference of an object that groups several members.', 'definition', 3],
  ['Size of a primitive type against an object', `A primitive type has a fixed size (int ${ev('Integer.BYTES')} bytes, double ${ev('Double.BYTES')} bytes); the size of an object depends on its data members.`, 'fact', 3],
  ['Default values of data members', `${ic(one(out(plotDefaults)))} for int, double, boolean, String and a class type (Plot example).`, 'fact', 3],
  ['What does `b = a` copy when a and b are objects?', 'Only the reference: a and b become two names (an alias) for one object.', 'concept', 3],
  ['What does `y = x` copy when x and y are ints?', 'The value: the two variables are independent.', 'concept', 3],
  ['What does `==` compare for two objects?', 'References: it is true only when both variables refer to the same object.', 'exam-tip', 3],
  ['What is null?', 'The value of a reference that refers to no object; the default of every class-type data member.', 'definition', 3],
  ['What happens when a method is called through null?', `A NullPointerException is thrown at run time, for example: ${npeMsg}.`, 'exam-tip', 3],
  ['Is String primitive?', 'No. It is a class of the Java library, so a String variable holds a reference and can be null.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Class as the Basis of all Computation',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_members_count', 'm_instance_def', 'm_class_def', 'm_new_op', 'm_var_holds', 'm_copy_ref', 's_local_instance', 's_class_object'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_metro', 'l_seed'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Class as the Basis of all Computation',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_card_run', 'm_scope_life', 'm_void_use', 'm_two_objects_out', 'm_create_stmt', 'm_hostel_run', 'm_composite_def', 'm_eq_ref', 'm_npe', 'm_size', 's_change_state', 's_abstraction', 's_copy', 'co_turnstile', 'co_pass'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_hostel', 'l_scorer', 'l_recipe'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of icse-10-computer-applications-ch06 only',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
