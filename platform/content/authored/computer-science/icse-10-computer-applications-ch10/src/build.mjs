// Build ICSE 10 Computer Applications ch10 "Encapsulation". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch10/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch10', 'computer-science');
useJavaCache(SRC);
await import('./q_a.mjs');
await import('./q_b.mjs');
await import('./q_c.mjs');
const S = await import('./snips.mjs');
const { code, F, ic, out, oline, mustFail, expect, two, verdict } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');
const lines = (s) => s.split('\n');
const cl = (name, members) => ['class ' + name + ' {', ...members.map((l) => '    ' + l), '}'].join('\n');

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(out(S.cDefRead), '5', 'default member notes');
expect(out(S.cProtRead), '2', 'protected member seals');
expect(out(S.cPubRead), '1', 'public member slots');
expect(out(S.cTotal), '90', 'total of the gullak');
expect(mustFail(S.cPrivRead), 'coins has private access in Gullak', 'private read message');
expect(mustFail(S.cPrivCall), 'audit() has private access in Gullak', 'private method message');
expect(out(S.cStall), 'true', 'stall beats');
expect(mustFail(S.cStallOutside), 'sales has private access in Stall', 'stall outside message');
expect(out(S.cThermo([31.5])), '31.5', 'thermo accepted');
expect(out(S.cThermo([80])), 'Rejected: 80.0\n0.0', 'thermo rejected from the start');
expect(out(S.cRaw), '80.0', 'raw accepts 80');
expect(mustFail(S.cBadgeSet), 'cannot find symbol', 'no setter');
expect(mustFail(S.cMint), 'Mint() has private access in Mint', 'private constructor');
expect(mustFail(S.cTopPrivate), 'modifier private not allowed here', 'private top-level');
expect(out(S.cPiggy), '350', 'piggy total');
expect(out(S.cTokenN(3)), '4', 'next after three objects');
expect(out(S.cTokenBefore), '1', 'next before any object');
expect(out(S.cTokenShare), '50', 'static through a reference');
expect(out(S.cTokenOwn), '70 2', 'instance copies');
expect(out(S.cTally), '1 1 1\n2 1 3', 'tally');
expect(out(S.cByValue), 'inside 15\noutside 10', 'pass by value');
expect(out(S.cGaugeBad), '10', 'shadowing keeps the member');
expect(out(S.cGaugeOk), '25', 'this.level updates the member');
expect(out(S.cGaugeShow), '99 10', 'local hides member');
expect(out(S.cInstDefault), '0 0.0 false', 'defaults');
expect(out(S.cCafe), '60 4', 'cafe');
expect(out(S.cTwoLoops), '106', 'two loops');
expect(mustFail(S.cLoopScope), 'cannot find symbol', 'loop scope');
expect(mustFail(S.cRedecl), 'variable x is already defined in method main(String[])', 'redeclaration');
expect(mustFail(S.cUninit), 'variable total might not have been initialized', 'uninitialised');
expect(mustFail(S.cVisitsErr), 'non-static variable count cannot be referenced from a static context', 'static context variable');

// ---------------------------------------------------------------- SVG helpers
const box = (s, x, y, w, h, label, o = {}) => { s.rect(x, y, w, h, { rx: o.rx ?? 8, fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: o.sw ?? 1.6, dash: o.dash }); if (label) s.text(x + w / 2, y + h / 2, label, { size: o.size ?? 13, bold: o.bold, muted: o.muted }); };
const gullakClass = cl('Gullak', S.GULLAK);
const thermoClass = cl('Thermo', S.THERMO);
const tokenClass = cl('TokenDesk', S.TOKEN);
const gaugeClass = cl('Gauge', S.GAUGE);
const piggyClass = cl('Piggy', S.PIGGY);

// ---------------------------------------------------------------- visuals: Part 1 (access specifiers, encapsulation)
const vRoute1 = flow('LR', ['Encapsulation', 'Four access specifiers', 'Visibility table', 'private in action', 'Getters and setters', 'Validation', 'Read-only data'], 'Route map of Part 1: encapsulation, the four access specifiers, the visibility table, private in action, getters and setters, validation and read-only data', 'Part 1 at a glance');
const vCapsule = (() => {
  const s = new Svg(620, 300);
  box(s, 250, 20, 350, 260, '', { rx: 14, sw: 2.4 });
  s.text(425, 40, 'class Thermo', { size: 14, bold: true });
  box(s, 430, 120, 150, 60, 'private reading', { bold: true });
  box(s, 205, 70, 110, 40, 'setReading()');
  box(s, 205, 190, 110, 40, 'getReading()');
  box(s, 10, 120, 110, 60, 'Other classes', { bold: true });
  s.arrow(120, 135, 203, 95, { sw: 1.8 });
  s.arrow(120, 165, 203, 210, { sw: 1.8 });
  s.arrow(315, 90, 428, 138, { sw: 1.8, color: 'accent' });
  s.arrow(428, 165, 317, 210, { sw: 1.8, color: 'accent' });
  s.line(120, 150, 232, 150, { sw: 1.6, dash: true, color: 'muted' });
  s.text(262, 150, 'X', { size: 20, bold: true });
  s.text(150, 262, 'direct access refused', { size: 12, muted: true });
  s.text(260, 268, 'public methods on the boundary', { size: 12, muted: true, anchor: 'middle' });
  return s.visual('Diagram of encapsulation: the class Thermo is a box with the private data reading inside; the public methods setReading and getReading sit on its boundary; other classes call the methods with solid arrows, while a dashed arrow straight to the private data is blocked by a cross', 'The boundary of the class: other classes reach the private data only through its public methods.');
})();
const vSpec = table(
  ['Access', 'Keyword', 'In one line'],
  [
    ['private', ic('private'), 'the narrowest: its own class only'],
    ['default (package)', 'none written', 'its own class and the same package'],
    ['protected', ic('protected'), 'default access plus subclasses'],
    ['public', ic('public'), 'the widest: every class'],
  ],
  'Table of the four access specifiers: private for its own class only, default with no keyword for the same package, protected for the package and subclasses, and public for every class',
);
const vPrivErr = table(
  ['Statement in the class Check', 'What the compiler says'],
  [
    [ic('System.out.println(g.coins);'), mustFail(S.cPrivRead)],
    [ic('g.coins = 100;'), mustFail(S.cPrivWrite)],
    [ic('g.audit();'), mustFail(S.cPrivCall)],
  ],
  `Table of three refused statements: reading coins gives ${mustFail(S.cPrivRead)}, writing coins gives ${mustFail(S.cPrivWrite)} and calling audit gives ${mustFail(S.cPrivCall)}`,
  'All three errors appear at compile time, before the program runs.',
);
const vVisibility = table(
  ['Member is', 'Same class', 'Same package', 'Subclass in another package', 'Any other class'],
  [
    ['private', 'Yes', 'No', 'No', 'No'],
    ['default (no specifier)', 'Yes', 'Yes', 'No', 'No'],
    ['protected', 'Yes', 'Yes', 'Yes', 'No'],
    ['public', 'Yes', 'Yes', 'Yes', 'Yes'],
  ],
  'Visibility table: private is accessible in the same class only; default in the same class and the same package; protected in the same class, the same package and subclasses in other packages; public everywhere',
  'Moving down the table, the access only widens.',
);
const useRows = [
  [ic('g.coins'), 'private', S.cPrivRead],
  [ic('g.notes'), 'default', S.cDefRead],
  [ic('g.seals'), 'protected', S.cProtRead],
  [ic('g.slots'), 'public', S.cPubRead],
  [ic('g.total()'), 'public method', S.cTotal],
  [ic('g.audit()'), 'private method', S.cPrivCall],
];
const vEx1 = table(
  ['Use in the class Check', 'Declared as', 'Result'],
  useRows.map(([u, k, src]) => [u, k, verdict(src)]),
  `Table of six uses of Gullak members from another class of the same package: ${useRows.map(([u, k, src]) => `${u.replace(/`/g, '')} (${k}) gives ${verdict(src)}`).join('; ')}`,
  'Private members are refused; default, protected and public ones are accepted in the same package.',
);
const vOneFile = table(
  ['Case', 'Shown by a one-file program?', 'What the program shows'],
  [
    ['private, from another class', 'yes', verdict(S.cPrivRead)],
    ['default, same package', 'yes', `accepted: ${verdict(S.cDefRead)}`],
    ['protected, same package', 'yes', `accepted: ${verdict(S.cProtRead)}`],
    ['public, any class', 'yes', `accepted: ${verdict(S.cPubRead)}`],
    ['protected, subclass in another package', 'no', 'stated as a rule of the visibility table only'],
  ],
  'Table of what one-file programs can show: private refusal and default, protected and public acceptance within one package can be run, while the subclass in another package is stated only as a rule',
);
const vStall = table(
  ['Where the statement is written', 'Statement', 'Result'],
  [
    ['inside the class Stall', ic('return sales > other.sales;'), `works: a.beats(b) gives ${out(S.cStall)}`],
    ['inside the class Market', ic('a.sales'), mustFail(S.cStallOutside)],
  ],
  `Table: inside the class Stall the private sales of another object can be read and beats gives ${out(S.cStall)}; in the class Market, a.sales gives ${mustFail(S.cStallOutside)}`,
  'Access is decided by the class in which the code is written, not by the object.',
);
const vAccessors = table(
  ['Kind', 'Job', 'Example (class Thermo)'],
  [
    ['accessor (getter)', 'returns the value of a private member; changes nothing', ic('getReading()')],
    ['mutator (setter)', 'changes a private member, usually after a check', ic('setReading(double t)')],
  ],
  'Table of accessor and mutator methods: the getter returns a private value and changes nothing; the setter changes a private value, usually after a check; examples getReading and setReading of the class Thermo',
);
const vSetterFlow = flow('LR', ['setReading(t) is called', 'Is t from -10 to 55?', 'Yes: reading is set to t', 'No: message, old reading stays'], 'Flow of the setter: setReading is called, the range from minus 10 to 55 is tested, a valid value is stored and an invalid one gives a message and leaves the old reading', 'The setter is the gatekeeper of the private data.');
const reads = [31.5, 80, -20];
const vEx2 = table(
  ['Call', 'Printed by the setter', 'Value returned by getReading()'],
  reads.map((v) => { const lns = lines(out(S.cThermo([v]))); return [ic(`setReading(${v})`), lns.length > 1 ? lns[0] : '(nothing)', lns[lns.length - 1]]; }),
  `Table of three separate readings given to a new Thermo object: ${reads.map((v) => `setReading ${v} then getReading gives ${oline(S.cThermo([v]))}`).join('; ')}`,
  'A new Thermo object starts with the default reading 0.0.',
);
const vRaw = table(
  ['Design', 'Assignment of 80 from another class', 'Result'],
  [
    ['public data member (class Raw)', ic('t.reading = 80;'), `accepted, prints ${out(S.cRaw)}`],
    ['private data member (class Thermo)', ic('t.reading = 80;'), mustFail(S.cThermoDirect)],
    ['private data and a checking setter', ic('t.setReading(80);'), `refused with the message: ${lines(out(S.cThermo([80])))[0]}`],
  ],
  `Table comparing three designs: a public data member accepts 80 and prints ${out(S.cRaw)}; a private member refuses direct assignment with ${mustFail(S.cThermoDirect)}; a private member with a checking setter refuses the value with a message`,
);
const vReadOnly = table(
  ['Code', 'Result'],
  [
    [ic('b.getBadgeNo()'), `works: prints ${out(S.cBadgeGet)}`],
    [ic('b.setBadgeNo(9);'), `no such method: ${mustFail(S.cBadgeSet)}`],
    [ic('b.badgeNo = 9;'), mustFail(S.cBadgeDirect)],
    [ic('new Mint()  (private constructor)'), mustFail(S.cMint)],
  ],
  `Table for the class Badge, which has a private number and only a getter: the getter prints ${out(S.cBadgeGet)}; a setter call gives ${mustFail(S.cBadgeSet)}; direct assignment gives ${mustFail(S.cBadgeDirect)}; a private constructor gives ${mustFail(S.cMint)}`,
  'Private data and a getter only: the attribute is read-only for other classes.',
);
const vTop = table(
  ['Modifier before a top-level class', 'Compiler result'],
  [
    [ic('public class'), 'accepted'],
    [ic('class  (no modifier)'), 'accepted'],
    [ic('private class'), mustFail(S.cTopPrivate)],
    [ic('protected class'), mustFail(S.cTopProtected)],
    [ic('static class'), mustFail(S.cTopStatic)],
  ],
  `Table of modifiers before a top-level class: public and no modifier are accepted; private gives ${mustFail(S.cTopPrivate)}, protected gives ${mustFail(S.cTopProtected)} and static gives ${mustFail(S.cTopStatic)}`,
  'The levels private and protected are meant for the members of a class.',
);
const piggyRun = (k) => two('Piggy', S.PIGGY, 'Home', ['Piggy p = new Piggy();', ...[250, -40, 100].slice(0, k).map((v) => `p.deposit(${v});`), 'System.out.println(p.getRupees());']);
const vEx3 = table(
  ['After the call', 'getRupees() gives', 'Why'],
  [
    [ic('deposit(250)'), out(piggyRun(1)), 'positive amount, added'],
    [ic('deposit(-40)'), out(piggyRun(2)), 'not positive, ignored'],
    [ic('deposit(100)'), out(piggyRun(3)), 'positive amount, added'],
  ],
  `Trace table of the Piggy savings box: after deposit 250 the amount is ${out(piggyRun(1))}; after deposit minus 40 it is ${out(piggyRun(2))}; after deposit 100 it is ${out(piggyRun(3))}`,
);
expect(out(piggyRun(2)), '250', 'piggy after the negative deposit');
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['encapsulation', 'data and methods in one class; data hidden'],
    ['specifiers', 'private, default, protected, public'],
    ['visibility', 'private: class; default: package; protected: package and subclasses; public: all'],
    ['private', 'refused by the compiler outside its class (class-wide, not object-wide)'],
    ['getter and setter', 'public methods; the setter validates'],
    ['read-only', 'private data with a getter only'],
  ],
  'Summary table of Part 1: encapsulation, the four specifiers, the visibility rule of each, private access being class-wide, getters and setters, and read-only data',
);

// ---------------------------------------------------------------- visuals: Part 2 (scope of variables)
const vRoute2 = flow('LR', ['Four kinds of variables', 'Instance variables', 'Static variables', 'Argument variables', 'Local variables and blocks', 'Hiding and this', 'Static context', 'Lifetime'], 'Route map of Part 2: the four kinds of variables, instance variables, static variables, argument variables, local variables and blocks, hiding and this, static context and lifetime', 'Part 2 at a glance');
const vKinds = table(
  ['Kind', 'Declared', 'Copies', 'Scope'],
  [
    ['instance variable', 'in the class, outside methods, no static', 'one for each object', 'the methods of the class, through an object'],
    ['static (class) variable', 'in the class, outside methods, with static', 'one for the whole class', 'the whole class; through the class name elsewhere'],
    ['argument variable', 'in the header of a method or constructor', 'one for each call', 'the body of that method'],
    ['local variable', 'inside a method, constructor or block', 'one for each call', 'its block, from the declaration onwards'],
  ],
  'Table of the four kinds of variables: instance variables with one copy for each object, static variables with one copy for the class, argument variables of a method header, and local variables inside a block, each with its scope',
);
const vTokenKinds = table(
  ['Variable', 'Kind', 'Why'],
  [
    [ic('next'), 'static (class) variable', 'declared with static in the class'],
    [ic('token'), 'instance variable', 'in the class, no static'],
    [ic('counter'), 'argument variable', 'in the header of serve'],
    [ic('wait'), 'local variable', 'inside the body of serve'],
  ],
  'Table of the variables of the class TokenDesk: next is static, token is an instance variable, counter is an argument variable of serve and wait is a local variable of serve',
);
const vCafe = table(
  ['Variable', 'Type', 'Declared in', 'Scope'],
  [
    [ic('served'), 'static', 'the class', 'whole class; shared'],
    [ic('price'), 'instance', 'the class', 'whole class; one per object'],
    [ic('p'), 'argument', 'constructor header', 'the constructor'],
    [ic('qty'), 'argument', 'header of order', 'the method order'],
    [ic('bill'), 'local', 'body of order', 'the method order'],
    [ic('c, amount'), 'local', 'body of main', 'the method main'],
  ],
  `Table that classifies the variables of the Cafe program: served is static, price is an instance variable, p and qty are argument variables, and bill, c and amount are local variables; the program prints ${out(S.cCafe)}`,
  `The program prints ${out(S.cCafe).replace(' ', ' and ')}.`,
);
const vInstance = table(
  ['Program', 'Output', 'What it shows'],
  [
    [ic('three objects, print a.token b.token c.token'), out(S.cTokenIds), 'each object has its own token'],
    [ic('a.token = 70; print a.token b.token'), out(S.cTokenOwn), 'changing one copy leaves the other'],
  ],
  `Table of instance variables: three objects print their tokens ${out(S.cTokenIds)}; after a.token is set to 70 the objects print ${out(S.cTokenOwn)}`,
);
const vStaticPic = (() => {
  const s = new Svg(620, 270);
  box(s, 190, 15, 240, 70, '', { rx: 10 });
  s.text(310, 34, 'TokenDesk (the class)', { size: 14, bold: true });
  s.text(310, 62, `static next = ${out(S.cTokenN(2))}`, { size: 14 });
  box(s, 40, 160, 190, 80, '', { rx: 10 });
  s.text(135, 180, 'object a', { size: 14, bold: true });
  s.text(135, 214, `token = ${out(S.cTokenIds).split(' ')[0]}`, { size: 14 });
  box(s, 390, 160, 190, 80, '', { rx: 10 });
  s.text(485, 180, 'object b', { size: 14, bold: true });
  s.text(485, 214, `token = ${out(S.cTokenIds).split(' ')[1]}`, { size: 14 });
  s.line(135, 160, 245, 87, { sw: 1.4, dash: true, color: 'muted' });
  s.line(485, 160, 375, 87, { sw: 1.4, dash: true, color: 'muted' });
  s.text(310, 130, 'both objects share the one next', { size: 12, muted: true });
  return s.visual(`Diagram of a static variable: the class TokenDesk holds one static variable next with the value ${out(S.cTokenN(2))} after two objects; the objects a and b each hold their own token, 1 and 2, and dashed lines show both objects sharing the single next`, 'One static copy for the class; one instance copy for each object.');
})();
expect(out(S.cTokenN(2)), '3', 'next after two objects');
expect(out(S.cTokenN(1)), '2', 'next after one object');
const nexts = [0, 1, 2, 3];
const vNext = table(
  ['Objects created', 'Value of next', 'How it is read'],
  nexts.map((k) => [String(k), out(k === 0 ? S.cTokenBefore : S.cTokenN(k)), ic('TokenDesk.next')]),
  `Table of the static variable next after 0, 1, 2 and 3 objects: ${nexts.map((k) => out(k === 0 ? S.cTokenBefore : S.cTokenN(k))).join(', ')}`,
  'The variable exists from the moment the class is loaded, even before the first object.',
);
const vViaRef = table(
  ['Program', 'Output', 'Meaning'],
  [
    [ic('print TokenDesk.next (no object yet)'), out(S.cTokenBefore), 'the class name is enough'],
    [ic('a.next = 50; print b.next'), out(S.cTokenShare), 'one copy: seen through every reference'],
  ],
  `Table of reaching a static variable: with no object, TokenDesk.next prints ${out(S.cTokenBefore)}; after a.next is set to 50, b.next prints ${out(S.cTokenShare)}`,
);
const tallySteps = [['a.bump()', 'a'], ['a.bump()', 'a'], ['b.bump()', 'b']];
const tallyRow = (k) => {
  const pre = tallySteps.slice(0, k - 1).map(([c]) => `${c};`);
  const src = two('Tally', S.TALLY, 'Run', ['Tally a = new Tally();', 'Tally b = new Tally();', ...pre, `int r = ${tallySteps[k - 1][0]};`, 'System.out.println(r + " " + a.inst + " " + b.inst + " " + Tally.stat);']);
  const [r, ai, bi, st] = out(src).split(' ');
  return [`${k}. ${ic(tallySteps[k - 1][0])}`, r, ai, bi, st];
};
const vTally = table(
  ['Call', 'Returned (local)', 'a.inst', 'b.inst', 'Tally.stat'],
  [1, 2, 3].map(tallyRow),
  `Trace table of the Tally program: ${[1, 2, 3].map((k) => { const r = tallyRow(k); return `after call ${k} the local result is ${r[1]}, a.inst ${r[2]}, b.inst ${r[3]} and stat ${r[4]}`; }).join('; ')}`,
  'The local variable restarts at 0 in every call; the instance variable counts per object; the static variable counts for all.',
);
const vArg = table(
  ['Where', 'Variable', 'Value printed'],
  [
    ['inside raise', ic('m (argument)'), lines(out(S.cByValue))[0]],
    ['in main, after the call', ic('m (local)'), lines(out(S.cByValue))[1]],
  ],
  `Table of an argument variable: inside raise the copy m prints ${lines(out(S.cByValue))[0]}; in main the original m still prints ${lines(out(S.cByValue))[1]}`,
  'The method works on a copy.',
);
const vBlock = (() => {
  const s = new Svg(620, 340);
  box(s, 10, 10, 600, 320, '', { rx: 12, sw: 2.2 });
  s.text(30, 32, 'method: int total is declared here', { anchor: 'start', size: 13, bold: true });
  s.text(30, 54, 'total is visible in all the blocks below', { anchor: 'start', size: 12, muted: true });
  box(s, 40, 80, 420, 220, '', { rx: 10 });
  s.text(60, 102, 'for block: int i is declared in the header', { anchor: 'start', size: 13, bold: true });
  s.text(60, 124, 'i is visible inside this block only', { anchor: 'start', size: 12, muted: true });
  box(s, 70, 150, 360, 120, '', { rx: 10, dash: true });
  s.text(90, 174, 'if block: int bonus is declared here', { anchor: 'start', size: 13, bold: true });
  s.text(90, 196, 'bonus is visible in this block only', { anchor: 'start', size: 12, muted: true });
  s.text(90, 228, 'a name from an outer block can be used', { anchor: 'start', size: 12, muted: true });
  s.text(90, 248, 'here, but cannot be declared again', { anchor: 'start', size: 12, muted: true });
  s.text(540, 190, 'after', { size: 13, bold: true });
  s.text(540, 210, 'the braces', { size: 13, bold: true });
  s.text(540, 235, 'i and bonus', { size: 12, muted: true });
  s.text(540, 253, 'are unknown', { size: 12, muted: true });
  return s.visual('Diagram of block scope: the method holds the variable total, visible everywhere inside it; inside it a for block declares i, visible only in that block; inside that an if block declares bonus, visible only in the if block; after the closing braces i and bonus are unknown', 'Scope shrinks to the block in which a variable is declared.');
})();
const vScopeErr = table(
  ['Mistake', 'What the compiler says'],
  [
    ['loop variable used after the loop', mustFail(S.cLoopScope)],
    ['variable of an if block used after the block', mustFail(S.cIfScope)],
    ['a name declared again inside a nested block', mustFail(S.cRedecl)],
    ['a local with the name of a parameter', mustFail(S.cParamRedecl)],
    ['a local variable used before it is given a value', mustFail(S.cUninit)],
  ],
  `Table of five scope mistakes and compiler messages: ${mustFail(S.cLoopScope)}; ${mustFail(S.cIfScope)}; ${mustFail(S.cRedecl)}; ${mustFail(S.cParamRedecl)}; ${mustFail(S.cUninit)}`,
  'Two loops one after the other may each declare their own i: the fragment prints ' + out(S.cTwoLoops) + '.',
);
const vShadow = table(
  ['Method', 'Statement', 'Value of the data member afterwards'],
  [
    [ic('raiseBad(20)'), ic('level = level + 5;'), out(S.cGaugeBad)],
    [ic('raiseOk(20)'), ic('this.level = level + 5;'), out(S.cGaugeOk)],
    [ic('show()'), ic('int level = 99;  print level, this.level'), `prints ${out(S.cGaugeShow)}`],
  ],
  `Table of hiding: raiseBad changes only the parameter, so the data member stays ${out(S.cGaugeBad)}; raiseOk uses this dot level and the member becomes ${out(S.cGaugeOk)}; show prints ${out(S.cGaugeShow)}, the local variable first and the data member second`,
  'A parameter or local variable hides a data member of the same name; this reaches the member.',
);
const vStaticCtx = table(
  ['Program', 'Result'],
  [
    [ic('main uses the instance variable count'), mustFail(S.cVisitsErr)],
    [ic('main calls the instance method show()'), mustFail(S.cVisitsMeth)],
    [ic('main creates Visits v and uses v.count'), `works: prints ${out(S.cVisitsFix)}`],
  ],
  `Table of the static context: main using count gives ${mustFail(S.cVisitsErr)}; main calling show gives ${mustFail(S.cVisitsMeth)}; creating an object first works and prints ${out(S.cVisitsFix)}`,
);
const vLife = table(
  ['Variable', 'Created', 'Destroyed', 'Default value'],
  [
    ['static', 'when the class is loaded', 'when the program ends', 'yes'],
    ['instance', 'when the object is created', 'when the object is no longer used', 'yes'],
    ['argument', 'when the method is called', 'when the method returns', 'no, it receives the value passed'],
    ['local', 'when the method is called', 'when the method returns', 'no, it must be given a value'],
  ],
  'Table of lifetimes: static variables live from class loading to the end of the program, instance variables live with their object, argument and local variables live from the call to the return of the method; static and instance variables have default values, local variables do not',
);
const vDefaults = table(
  ['Program', 'Result'],
  [
    [ic('data members int, double, boolean, no values given'), out(S.cInstDefault)],
    [ic('local int total, printed without a value'), mustFail(S.cUninit)],
  ],
  `Table of default values: unassigned data members print ${out(S.cInstDefault)}; an unassigned local variable gives ${mustFail(S.cUninit)}`,
);
const vFix = table(
  ['Version', 'Result'],
  [
    [ic('count++;  inside static main'), mustFail(S.cVisitsErr)],
    [ic('Visits v = new Visits(); v.count++;'), out(S.cVisitsFix)],
  ],
  `Table of the fix: using count directly in static main gives ${mustFail(S.cVisitsErr)}; creating an object and using v.count prints ${out(S.cVisitsFix)}`,
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['four kinds', 'instance, static, argument, local'],
    ['instance', 'one copy for each object'],
    ['static', 'one copy for the class, shared; usable through the class name'],
    ['argument and local', 'live from call to return; scope is the method or block'],
    ['hiding', 'a parameter or local hides a data member; use this'],
    ['static context', 'main (static) needs an object for instance members'],
  ],
  'Summary table of Part 2: the four kinds of variables, instance and static copies, argument and local lifetimes and scope, hiding with this, and the static context of main',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Access Specifiers and Encapsulation',
  goals: [
    'State where a member declared private, default, protected or public can be accessed',
    'Read and predict the result of access to members from another class of the same package',
    'Explain how private data with public methods achieves encapsulation',
    'Write getter and setter methods that validate a value before it is stored',
  ],
  slides: [
    sl('title', 'Encapsulation and access specifiers', {
      b: 'Part 1: **encapsulation**, the four **access specifiers**, the **visibility table**, and **getters and setters** that guard private data.',
      v: vRoute1,
      n: 'Welcome to encapsulation. In this part we learn how a class protects its data. We meet the four access specifiers, private, default, protected and public, and the table that tells which code may use a member. We watch the compiler refuse private access, and we write getter and setter methods that check a value before it is stored. We also build read only data.',
    }),
    sl('concept', 'Data and methods, wrapped together', {
      b: '**Encapsulation** binds the data members and the methods that use them into one class and **hides the data**. Other classes reach the data only through the **public methods** of the class.',
      v: vCapsule,
      n: 'Encapsulation means two things. First, the data and the methods that work on it are placed together in one class. Second, the data is hidden: it is made private, so other classes cannot touch it directly. They have to ask the public methods of the class. In the picture, the boundary stops the direct arrow, and the public methods are the doors.',
    }),
    sl('concept', 'The four access specifiers', {
      b: 'An **access specifier** decides which code may use a member. It is written before the data member, method or constructor. When none is written, the member has **default** (package) access.',
      v: vSpec,
      n: 'An access specifier decides which code may use a member of a class. Java has four levels. Private is the narrowest. If no specifier is written, the member has default access, which is also called package access. Protected is wider, and public is the widest. The same specifiers can be written before data members, methods and constructors.',
    }),
    sl('concept', 'private: only inside its own class', {
      b: `${F(S.cPrivRead)}\n\nThe class **Check** is a different class, so it cannot use the private member of **Gullak**, even in the same file.`,
      v: vPrivErr,
      n: 'A private member can be used only by code written inside its own class. Here the class Check is a different class, even though it is in the same file. Reading coins gives a compile time error that says coins has private access in Gullak. Writing to coins gives the same message, and calling the private method audit gives a similar one. All these errors appear at compile time.',
    }),
    sl('concept', 'The visibility table', {
      b: 'Learn this table. Inheritance is not part of this chapter: for **protected**, only the rule about subclasses is needed.',
      v: vVisibility,
      n: 'This table is worth learning by heart. Private members are open only to their own class. Default members are open to the same package as well. Protected members are open to the same package and also to subclasses, even in other packages. Public members are open to every class. Moving down the table, the access only widens. Inheritance is not in this chapter, so only the rule for subclasses is needed.',
    }),
    sl('example', 'Worked example 1: which statements compile?', {
      b: `${F(gullakClass)}\n\nThe class **Check** (same package) uses each member. Find the result of every use.`,
      v: vEx1,
      n: 'Let us test every level from the class Check. Reading notes, which has default access, displays five. Reading seals, which is protected, displays two, because Check is in the same package. Reading slots, which is public, displays one. The public method total displays ninety. But the private coins and the private method audit are refused by the compiler.',
    }),
    sl('check', 'Quick check: match the access', {
      b: 'Match each specifier with the places it allows.',
      chk: 'mt_spec',
      n: 'Think of the table from narrowest to widest access, and match each specifier with its places.',
    }),
    sl('concept', 'What one file can show', {
      b: 'The runner compiles **one file**, so every class here is in the **same package**. Cross-package cases are given as rules, not as demonstrations.',
      v: vOneFile,
      n: 'The online Java runner compiles a single file, so every class here is in the same package. That means we can show private access being refused, and default, protected and public access being allowed inside the package. We cannot show a subclass in another package, so for that case we only state the rule from the table. We never pretend that a demonstration has run when it has not.',
    }),
    sl('concept', 'private belongs to the class, not to the object', {
      b: `${F(S.cStall)}\n\nCode written **inside** the class may read the private member of **any** object of that class.`,
      v: vStall,
      n: 'Private access is decided by the class, not by the object. In the class Stall, the method beats reads the private sales of another Stall object, and this is allowed because the method is written inside the class. The program prints true. But the class Market cannot read a dot sales: the compiler says sales has private access in Stall.',
    }),
    sl('concept', 'Public methods: the doors of the class', {
      b: 'Private data needs public methods to be useful. An **accessor** (getter) reads a value. A **mutator** (setter) changes it, and can **check** the new value first.',
      v: vAccessors,
      n: 'Private data is useful only when the class offers public methods. An accessor, also called a getter, returns a value and changes nothing. A mutator, also called a setter, changes the value. The great advantage is that a setter can check the new value before storing it. The class Thermo has one of each, getReading and setReading.',
    }),
    sl('concept', 'A setter that validates', {
      b: `${F(thermoClass)}\n\nOnly the setter writes the data, and it accepts values from -10 to 55 only.`,
      v: vSetterFlow,
      n: 'Here is the class Thermo. The reading is private. The setter tests whether the new value lies from minus ten to fifty five. If it does, the reading is stored. If not, the setter prints a message and the old reading stays. Because no other code can write the reading, the object can never hold an impossible temperature.',
    }),
    sl('example', 'Worked example 2: three readings', {
      b: `${F(S.cThermo([31.5]))}\n\nTry the readings 31.5, 80 and -20, each in a new Thermo object.`,
      v: vEx2,
      n: 'We give three readings, each to a new Thermo object. Thirty one point five is inside the range, so it is stored and the getter returns it. Eighty is outside the range, so the setter prints Rejected, and the getter returns the starting value, zero point zero. Minus twenty is also outside the range and is rejected in the same way.',
    }),
    sl('check', 'Quick check: private access', {
      b: 'Choose the correct result.',
      chk: 'm_private_err',
      n: 'Remember what the compiler does when another class touches a private member.',
    }),
    sl('concept', 'Without encapsulation', {
      b: `${F(S.cRaw)}\n\nA **public** data member can be given **any** value by **any** class, valid or not.`,
      v: vRaw,
      n: 'See what happens without encapsulation. In the class Raw the reading is public, so any class can assign eighty and the object accepts it without complaint. In the class Thermo the reading is private, so the same assignment is refused by the compiler. The setter does allow a controlled change, and it refuses eighty with a message.',
    }),
    sl('concept', 'Read-only data and private constructors', {
      b: '**Private data with only a getter** is read-only for other classes. A **private constructor** cannot be used to create objects from other classes.',
      v: vReadOnly,
      n: 'If a class has a private number and only a getter, other classes can read the number but not change it. A call of a setter that was never written gives cannot find symbol, and direct assignment is refused. Constructors can be private too. Then another class cannot create an object with new, and the compiler says that the constructor has private access.',
    }),
    sl('example', 'Worked example 3: the Piggy savings box', {
      b: `${F(piggyClass)}\n\nTrace the amount after the deposits 250, -40 and 100.`,
      v: vEx3,
      n: 'The Piggy class keeps the rupees private. The method deposit adds an amount only when it is positive. After a deposit of two hundred fifty, the amount is two hundred fifty. A deposit of minus forty is not positive, so it is ignored, and the amount stays the same. A deposit of one hundred then brings the amount to three hundred fifty.',
    }),
    sl('check', 'Quick check: protected', {
      b: 'Decide on the assertion and the reason.',
      chk: 'ar_protected',
      n: 'Recall which classes get access to a protected member, and test the statement against the visibility table.',
    }),
    sl('concept', 'Access for classes themselves', {
      b: 'A **top-level class** is either **public** or has default access. The levels private and protected are for members.',
      v: vTop,
      n: 'The access specifiers are meant mainly for members. A top level class can be public, or it can have no specifier, which means default access. Writing private or protected before a top level class is an error, and the compiler says that the modifier is not allowed here. The word static is not allowed there either.',
    }),
    sl('check', 'Quick check: steps of encapsulation', {
      b: 'Arrange the steps in order.',
      chk: 'ord_encap',
      n: 'Decide what must exist first, then which methods guard the data, and who uses them last.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Encapsulation keeps data and methods together and hides the data. The four specifiers are private, default, protected and public, and the visibility table shows how far each one reaches. Private access is refused outside the class, but it is allowed for any object inside the class. Getters read, setters change and validate, and a getter alone makes the data read only.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the visibility table: private is the class only, default adds the package, protected adds subclasses, public is everyone.',
        'Name the rule when you explain an error: "a private member cannot be accessed outside its class".',
        'In a program keep the data members `private` and give `public` methods; validate in the setter and in the constructor.',
        'A default member has no keyword: do not write the word default before a member.',
        'Say "accessor" or "getter" for a method that reads, and "mutator" or "setter" for a method that changes.',
      ],
      n: 'Some exam tips. Learn the visibility table: private is the class only, default adds the package, protected adds subclasses, and public is everyone. When you explain an error, name the rule, that a private member cannot be accessed outside its class. In programs, keep the data private, give public methods, and validate in the setter and in the constructor. A default member has no keyword.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Scope and Lifetime of Variables',
  goals: [
    'Name the four kinds of variables and state where each is declared',
    'Compare instance and static variables with programs',
    'Explain the scope of argument and local variables and the effect of blocks',
    'Identify the type and scope of each variable in a given program',
  ],
  slides: [
    sl('title', 'Scope of variables', {
      b: 'Part 2: **instance**, **static**, **argument** and **local** variables, their **scope** and **lifetime**, hiding with **this**, and the static context.',
      v: vRoute2,
      n: 'Welcome to the second part. Every variable in a program has a kind, a scope and a lifetime. We study instance variables, static variables, argument variables and local variables. We see how blocks limit the scope of a variable, how one name can hide another, why the main method cannot use an instance variable directly, and how long each kind of variable lives.',
    }),
    sl('concept', 'Four kinds of variables', {
      b: 'The **place** of the declaration, and the keyword **static**, decide the kind of a variable.',
      v: vKinds,
      n: 'There are four kinds of variables. An instance variable is declared in the class, outside the methods, without the word static, and each object has its own copy. A static variable is declared with the word static and is shared by the whole class. An argument variable is declared in the header of a method. A local variable is declared inside a method or a block.',
    }),
    sl('concept', 'Spotting the kinds in a program', {
      b: `${F(tokenClass)}`,
      v: vTokenKinds,
      n: 'Look at the class TokenDesk. The variable next is declared with static, so it is a static variable. The variable token is in the class without static, so it is an instance variable. The variable counter is in the header of serve, so it is an argument variable. The variable wait is inside the body of serve, so it is a local variable.',
    }),
    sl('example', 'Worked example 1: type and scope in a program', {
      b: `${F(S.cCafe)}\n\nGive the type, the place of declaration and the scope of every variable.`,
      v: vCafe,
      n: 'Let us classify the variables of the Cafe program. The variable served has the word static, so it belongs to the class. The variable price is an instance variable. The names p and qty are argument variables, of the constructor and of order. The variable bill is local to order. The variables c and amount are local to main. The program prints sixty and four.',
    }),
    sl('concept', 'Instance variables: one copy for each object', {
      b: 'Every object has **its own copy** of an instance variable. Changing it in one object does not affect the others.',
      v: vInstance,
      n: 'An instance variable has one copy for each object. Three TokenDesk objects hold the tokens one, two and three. When we assign seventy to the token of a, the token of b is not touched, and it still holds two. Each copy is created with its object and is reached with the name of the object and a dot.',
    }),
    sl('concept', 'Static variables: one copy for the class', {
      b: 'A **static (class) variable** has **one copy** shared by all the objects. It is created when the class is loaded.',
      v: vStaticPic,
      n: 'A static variable belongs to the class and has only one copy. In the picture the class holds the variable next, and the objects a and b hold one token each. The constructor copies next into the token and then increases next. So the objects get different tokens, but there is one shared counter, which now stands at three.',
    }),
    sl('check', 'Quick check: the counter', {
      b: 'What is the value of next?',
      chk: 'm_token_next',
      n: 'Count how many times the constructor runs, and remember that there is one shared variable.',
    }),
    sl('concept', 'Reaching a static variable', {
      b: 'Use the **class name**: `TokenDesk.next`. It works even **before any object exists**. Through a reference it reaches the **same** single copy.',
      v: vNext,
      n: 'A static variable is reached by the class name and a dot. It exists as soon as the class is loaded, so it can be read before any object is created. The table shows the value after zero, one, two and three objects. The usual style is to write the class name, but a reference reaches the same single copy, so a change made through one reference is seen through every other.',
    }),
    sl('check', 'Quick check: before any object', {
      b: 'True or false?',
      chk: 'tf_static_obj',
      n: 'Ask when a static variable is created: with the class, or with an object?',
    }),
    sl('example', 'Worked example 2: static, instance and local together', {
      b: `${F(S.cTally)}\n\nTrace the three calls of **bump()**.`,
      v: vTally,
      n: 'The method bump has a local variable, an instance variable and a static variable, and the table shows each call. The local variable starts at zero in every call, so every call returns one. The instance variable counts for each object, so a ends at two and b at one. The static variable counts all three calls, and ends at three.',
    }),
    sl('check', 'Quick check: trace the counters', {
      b: 'Write the exact output.',
      chk: 'co_tally',
      n: 'Count the calls on each object for the instance variable, and all calls for the static variable.',
    }),
    sl('concept', 'Argument variables: copies of the values', {
      b: `${F(S.cByValue)}\n\nThe argument variable **m** of raise is a **copy**; the variable m of main is another variable.`,
      v: vArg,
      n: 'An argument variable is created when the method is called, and it receives a copy of the value passed. In the program, raise adds five to its own copy of m, and prints fifteen. Back in main, the variable m still holds ten, because the two variables are different, although they have the same name. The argument variable ceases to exist when the method returns.',
    }),
    sl('concept', 'Local variables and blocks', {
      b: 'A **local variable** is known from its declaration to the closing brace of its **block**. A `for` variable belongs to the loop.',
      v: vBlock,
      n: 'A local variable is known from its declaration to the closing brace of its block. A variable of the method is visible in the whole method. A variable declared in a for header is visible only in that loop, and a variable declared in an if block is visible only in that block. After the braces the names are unknown, and an inner block cannot declare a name again that an outer block already uses.',
    }),
    sl('concept', 'Mistakes with scope', {
      b: 'Each mistake is caught at **compile time**. Two loops one after the other may reuse a loop variable name.',
      v: vScopeErr,
      n: 'The compiler catches scope mistakes. Using the loop variable after the loop gives cannot find symbol. Declaring a name again inside a nested block gives already defined, and so does a local variable with the name of a parameter. A local variable used before it is given a value gives might not have been initialized. Two separate loops may each declare their own i.',
    }),
    sl('concept', 'A name hiding another name', {
      b: `${F(gaugeClass)}\n\nA **parameter** or **local variable** with the name of a data member **hides** it. The keyword **this** reaches the data member.`,
      v: vShadow,
      n: 'When a parameter has the same name as a data member, the parameter hides the data member inside the method. The method raiseBad changes only the parameter, so the data member stays at ten. The method raiseOk writes this dot level, which means the data member of the object, and it becomes twenty five. A local variable hides a data member in the same way, and the keyword this still reaches the member.',
    }),
    sl('example', 'Worked example 3: which level is printed?', {
      b: `${F(S.cGaugeShow)}\n\nIn **show**, the local variable **level** hides the data member.`,
      v: vShadow,
      n: 'In the method show, a local variable level is set to ninety nine. The first value printed is the plain name level, which means the local variable, ninety nine. The second value is this dot level, the data member of the object, which still holds ten. So the output is ninety nine and ten. The local variable disappears when the method ends.',
    }),
    sl('concept', 'The static context of main', {
      b: 'The method **main** is **static**: it runs without an object, so it cannot use an **instance variable** or call an **instance method** directly. It needs an object.',
      v: vStaticCtx,
      n: 'The main method is static, so it runs with no object at all. An instance variable belongs to an object, so main cannot use it directly. The compiler says non static variable cannot be referenced from a static context. A call to an instance method gives the same kind of message. The remedy is to create an object first and use its members.',
    }),
    sl('concept', 'Lifetime and default values', {
      b: '**Static** and **instance** variables get **default values**. **Local** variables get none and must be given a value before use.',
      v: vLife,
      n: 'The lifetime of a variable is how long it exists. A static variable lives from the loading of the class to the end of the program. An instance variable lives as long as its object. Argument and local variables live from the call of the method to its return. Static and instance variables get default values, zero for numbers and false for boolean, but a local variable gets none.',
    }),
    sl('example', 'Worked example 4: removing the static context error', {
      b: `${F(S.cVisitsFix)}\n\nThe object **v** gives **main** an instance of Visits whose count it can use.`,
      v: vFix,
      n: 'Here is the repair of the static context error. Inside main we create an object of the class Visits, and then use its variable through the object. The statement v dot count plus plus now works, and the program prints one. Another way out is to declare the variable count static, so that it belongs to the class and main may use it directly.',
    }),
    sl('check', 'Quick check: kinds of variables', {
      b: 'Fill in the blank.',
      chk: 'fb_scope',
      n: 'Think of where such a variable is declared and how far its scope reaches.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. There are four kinds of variables: instance, static, argument and local. An instance variable has one copy for each object, and a static variable has one copy for the class. Argument and local variables live from the call to the return, and their scope is the method or block. A parameter can hide a data member, and this reaches it. The static main needs an object for instance members.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'To identify a variable look at where it is declared: in the class (instance or `static`), in a method header (argument) or in a body (local).',
        'Write the scope as a place: "the whole class", "the method order" or "the for block".',
        'For output questions keep separate columns for each object when an instance variable changes, and one column for a `static` variable.',
        'A local variable restarts at its initial value at every call; an instance or `static` variable remembers.',
        'Remember the errors: cannot find symbol (out of scope), already defined, might not have been initialized, non-static variable in a static context.',
      ],
      n: 'Some exam tips. To identify a variable, look at where it is declared: in the class, in a method header, or in a body. Write the scope as a place, such as the whole class, the method, or the for block. In output questions keep separate columns for each object when an instance variable changes, and one shared column for a static variable. A local variable starts again at every call.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Encapsulation: notes',
  sections: [
    {
      h: '1. Encapsulation and the access specifiers',
      t: 1,
      b: `**Encapsulation** is the binding of the data members and the methods that work on them in a class, with the data protected from direct access by other classes (data hiding). The way into the data is a set of public methods.\n\nAn **access specifier** is written before a member and decides which code may use it: **private**, **protected** and **public**; a member with none has **default** (package) access.\n\n**Visibility**\n\n| Member is | Same class | Same package | Subclass in another package | Any other class |\n|---|---|---|---|---|\n| private | Yes | No | No | No |\n| default | Yes | Yes | No | No |\n| protected | Yes | Yes | Yes | No |\n| public | Yes | Yes | Yes | Yes |`,
      terms: [
        ['Encapsulation', 'The binding of data and methods in a class, with the data hidden from direct access outside the class.'],
        ['Access specifier', 'A keyword (private, protected or public) that fixes where a member can be accessed; no keyword means default access.'],
        ['Default (package) access', 'The access of a member with no specifier: its own class and the classes of the same package.'],
      ],
      v: vCapsule,
      vs: [vSpec, vVisibility],
    },
    {
      h: '2. private, default and protected in action',
      t: 1,
      b: `Written in a second class of the same package, the statement ${ic('g.coins')} (private) is refused: "${mustFail(S.cPrivRead)}"; ${ic('g.audit()')} gives "${mustFail(S.cPrivCall)}". The statements that use the default member notes, the protected member seals and the public member slots all compile and display ${ic(out(S.cDefRead))}, ${ic(out(S.cProtRead))} and ${ic(out(S.cPubRead))}.\n\n${F(gullakClass)}\n\nA program is compiled as one file, so every class in it belongs to one package. The access of a subclass in another package is known only from the table.\n\n**Private is class-wide:** code inside a class may read the private members of any object of that class, as ${ic('other.sales')} in the method beats of Stall (prints ${ic(out(S.cStall))}), but code outside the class may not.`,
      terms: [
        ['private', 'The narrowest access: a private member can be used only inside the class that declares it.'],
        ['protected', 'Access for the same class, the classes of the same package and the subclasses of the class.'],
        ['public', 'The widest access: a public member can be used by every class.'],
      ],
      v: vPrivErr,
      vs: [vEx1, vOneFile, vStall],
    },
    {
      h: '3. Accessors, mutators and validation',
      t: 1,
      b: `An **accessor** (getter) returns the value of a private member. A **mutator** (setter) changes it, and can reject an invalid value.\n\n${F(thermoClass)}\n\nWith the readings 31.5 and 80 the program prints ${ic(oline(S.cThermo([31.5, 80])))}: the second reading is refused and the stored value stays.\n\nIf the member were public (class Raw), any class could store 80 and the program would print ${ic(out(S.cRaw))}.`,
      terms: [
        ['Accessor method', 'A public method that returns the value of a private data member without changing it (a getter).'],
        ['Mutator method', 'A public method that changes the value of a private data member, usually after checking it (a setter).'],
      ],
      v: vAccessors,
      vs: [vSetterFlow, vEx2, vRaw],
    },
    {
      h: '4. Read-only data and the access of classes',
      t: 1,
      b: `Private data with a getter and no setter is **read-only** for other classes: ${ic('b.setBadgeNo(9)')} gives "${mustFail(S.cBadgeSet)}" and ${ic('b.badgeNo = 9')} gives "${mustFail(S.cBadgeDirect)}".\n\nA constructor may be private too: ${ic('new Mint()')} from another class gives "${mustFail(S.cMint)}".\n\nA top-level class may be public or have default access; private, protected and static before it give errors such as "${mustFail(S.cTopPrivate)}".\n\n${F(piggyClass)}\n\nThe deposits 250, -40 and 100 leave ${ic(out(S.cPiggy))} in the box: the negative amount is ignored.`,
      terms: [
        ['Read-only attribute', 'A private data member that has a getter but no setter, so other classes can read it but not change it.'],
      ],
      v: vReadOnly,
      vs: [vTop, vEx3],
    },
    {
      h: '5. Scope of variables: the four kinds',
      t: 2,
      b: `The **scope** of a variable is the part of a program in which it can be used. The place of declaration and the keyword static decide the kind.\n\n- **Instance variable:** in the class, outside the methods, no static; one copy for each object.\n- **Static (class) variable:** in the class with static; one copy shared by all objects; reached as ${ic('TokenDesk.next')}.\n- **Argument (formal) variable:** in the header of a method or constructor; a copy of the value passed.\n- **Local variable:** inside a method, constructor or block; known from its declaration to the end of the block.\n\n${F(S.cCafe)}\n\nThe program prints ${ic(out(S.cCafe))}. Here served is static, price is an instance variable, p and qty are argument variables, and bill, c and amount are local variables.`,
      terms: [
        ['Scope', 'The part of a program in which a variable can be used.'],
        ['Static (class) variable', 'A data member declared with static; one copy exists for the whole class and is shared by all its objects.'],
        ['Instance variable', 'A data member declared without static; every object has its own copy.'],
        ['Argument variable', 'A variable declared in the header of a method or constructor that receives a value from the call.'],
        ['Local variable', 'A variable declared inside a method, constructor or block, usable only in that block.'],
      ],
      v: vKinds,
      vs: [vTokenKinds, vCafe, vInstance],
    },
    {
      h: '6. Static against instance, blocks, hiding and the static context',
      t: 2,
      b: `After three TokenDesk objects the static variable next is ${ic(out(S.cTokenN(3)))}, and it can be read even before any object exists (${ic(out(S.cTokenBefore))}).\n\n${F(S.cTally)}\n\nOutput: ${ic(oline(S.cTally))}. The local variable restarts at every call (1 1 1), the instance variable counts per object (2 and 1) and the static variable counts all calls (3).\n\n**Blocks:** a variable declared in a for header or in an if block cannot be used after the block (${ic(mustFail(S.cLoopScope))}), and a name that an outer block already uses cannot be declared again (${ic(mustFail(S.cRedecl))}).\n\n**Hiding:** a parameter or local variable with the name of a data member hides it; the keyword **this** reaches the member: the unfixed method leaves the member at ${ic(out(S.cGaugeBad))}, the version with this.level gives ${ic(out(S.cGaugeOk))}.\n\n**Static context:** the static method main cannot use an instance variable directly (${ic(mustFail(S.cVisitsErr))}); it needs an object. **Lifetime:** local and argument variables live from the call to the return, instance variables with their object, static variables as long as the program. Data members get default values (${ic(out(S.cInstDefault))}); local variables get none.`,
      terms: [
        ['this', 'A keyword that refers to the current object; this.level means the data member level of that object.'],
      ],
      v: vTally,
      vs: [vBlock, vScopeErr, vShadow, vStaticCtx, vLife],
    },
  ],
  tips: '**Common mistakes**\n- Writing the visibility table wrongly: protected also includes the package, and default does not include subclasses in other packages.\n- Making the data members public and then saying the class is encapsulated.\n- Forgetting that a private member is accessible to every object of the same class, inside that class.\n- Writing the word default before a member (a member with no specifier has default access).\n- Using a loop variable or a block variable after its block.\n- Using an instance variable directly in main.\n- Assuming a static variable restarts for every object, or a local variable remembers its value from the last call.\n\n**How marks are usually awarded**\n- Definitions: the key words (binding of data and methods, data hiding, one copy for the class).\n- Differences: two points, each stated for both sides.\n- Programs (15 marks): private data members and public methods, constructor, validation, static counter where asked, input and output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is encapsulation?', 'The binding of data and methods in a class, with the data hidden from direct access by other classes.', 'definition', 1],
  ['Another name for the hiding of data in a class', 'Data hiding.', 'fact', 1],
  ['How do private data and public methods achieve encapsulation?', 'Other classes cannot touch the private data; they must use public methods, which can check each value.', 'concept', 1],
  ['What is an access specifier?', 'A keyword written before a member that decides where the member can be accessed.', 'definition', 1],
  ['Name the four levels of access', 'private, default (no specifier), protected, public.', 'fact', 1],
  ['Where can a private member be accessed?', 'Only inside the class that declares it.', 'fact', 1],
  ['Where can a default (package) member be accessed?', 'In its own class and in the classes of the same package.', 'fact', 1],
  ['Where can a protected member be accessed?', 'In its own class, in the same package and in the subclasses of its class.', 'fact', 1],
  ['Where can a public member be accessed?', 'In every class.', 'fact', 1],
  ['Which keyword gives default access?', 'None: a member with no specifier has default access. Do not write the word default.', 'exam-tip', 1],
  ['Which access is the narrowest and which the widest?', 'private is the narrowest; public is the widest.', 'fact', 1],
  ['Compiler message for reading a private member of another class', ic(mustFail(S.cPrivRead)), 'example', 1],
  ['Is private access decided by the object or by the class?', `By the class: code inside Stall may read other.sales of another object (prints ${out(S.cStall)}).`, 'concept', 1],
  ['What is an accessor method?', 'A public method that returns the value of a private member (a getter) and changes nothing.', 'definition', 1],
  ['What is a mutator method?', 'A public method that changes the value of a private member, often after a check (a setter).', 'definition', 1],
  ['Why validate in a setter?', 'So that the object can never hold an invalid value, such as a temperature of 80.', 'concept', 1],
  ['How is read-only data made?', 'Private data member with a getter and no setter.', 'concept', 1],
  ['Which modifiers may a top-level class have?', 'public, or none (default access). private and protected are errors.', 'fact', 1],
  ['What is the scope of a variable?', 'The part of the program in which the variable can be used.', 'definition', 2],
  ['Name the four kinds of variables', 'Instance, static (class), argument (formal parameter) and local variables.', 'fact', 2],
  ['What is an instance variable?', 'A data member declared without static; every object has its own copy.', 'definition', 2],
  ['What is a static (class) variable?', 'A data member declared with static; one copy shared by all the objects of the class.', 'definition', 2],
  ['How is a static variable reached from outside the class?', `With the class name, as TokenDesk.next. It works even before an object exists (prints ${out(S.cTokenBefore)}).`, 'fact', 2],
  ['Value of next after three TokenDesk objects (starts at 1)', ic(out(S.cTokenN(3))), 'example', 2],
  ['What is an argument variable?', 'A variable in the header of a method or constructor; it receives a copy of the value passed.', 'definition', 2],
  ['What is a local variable?', 'A variable declared inside a method, constructor or block; usable only in that block.', 'definition', 2],
  ['Scope of a for loop variable', 'The for statement only; after the loop the name is unknown.', 'fact', 2],
  ['Compiler message for a variable used after its block', ic(mustFail(S.cLoopScope)), 'example', 2],
  ['Can an inner block declare a name that an outer block already uses?', `No: ${mustFail(S.cRedecl)}.`, 'exam-tip', 2],
  ['What does a parameter with the name of a data member do?', 'It hides the data member inside the method; this.name reaches the data member.', 'concept', 2],
  ['Lifetime of a local variable', 'From the call of the method to its return; it starts afresh at every call.', 'fact', 2],
  ['Do local variables get default values?', `No. A local variable must be given a value: ${mustFail(S.cUninit)}.`, 'exam-tip', 2],
  ['Why can main not use an instance variable directly?', 'main is static and runs without an object; an instance variable belongs to an object.', 'concept', 2],
  ['Compiler message for an instance variable used in main', ic(mustFail(S.cVisitsErr)), 'example', 2],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Encapsulation',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_private_where', 'm_which_specifier', 'm_thermo_trace', 'm_static_def', 'm_tally_static', 'm_static_ctx', 's_encap', 's_static_inst'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_coop', 'l_token'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Encapsulation',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_encap_def', 'm_default_where', 'm_private_call', 'm_same_class', 'm_readonly', 'm_instance_def', 'm_scope_err', 'm_shadow', 'm_uninit', 'm_pass_value', 's_setter', 's_identify', 's_default_protected', 'co_thermo', 'co_token'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_club', 'l_temp', 'l_fee'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of icse-10-computer-applications-ch10 only',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
