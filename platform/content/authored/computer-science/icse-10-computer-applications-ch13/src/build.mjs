// Build ICSE 10 Computer Applications ch13 "String Handling". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch13/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch13', 'computer-science');
useJavaCache(SRC);
const A = await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const { code, F, ic, ev, out, oline, rtErr, rtOut, mustFail, expect } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const one = (s) => (s === '' ? '(nothing is printed)' : s.split('\n').join(' / '));

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
const KAL = 'String s = "Kalyani";';
expect(ev('s.length()', KAL), '7', 'Kalyani has seven characters');
expect(ev('s.charAt(0)', KAL), 'K', 'first character');
expect(out(A.cImmut), 'pune', 'toUpperCase alone leaves s');
expect(out(A.cImmut3), 'agra AGRA', 'immutable example');
expect(ev('"apple".compareTo("apricot")'), '-2', 'apple apricot');
expect(ev('"Delhi".compareTo("Delhi Cantt")'), '-6', 'prefix difference');
expect(ev('"Goa".equals("goa")'), 'false', 'equals is case-sensitive');
expect(ev('"Goa".equalsIgnoreCase("GOA")'), 'true', 'equalsIgnoreCase');
expect(out(A.cRef2), 'false\ntrue', 'run-time Strings: == and equals');
expect(ev('"Vijayawada".substring(6)'), 'wada', 'substring from 6');
expect(ev('"Vijayawada".substring(0, 3)'), 'Vij', 'substring 0 to 3');
expect(ev('String.valueOf(45) + String.valueOf(2.5)'), '452.5', 'valueOf joins');
expect(out(B.cRevPrepend), 'ayirP', 'reverse by prepending');
expect(out(C.srcPal, 'Rotor\n'), 'Reverse = rotoR\nRotor is a palindrome', 'palindrome program');
expect(out(C.srcPig, 'Stripe\n'), 'Pig Latin = IPESTRAY', 'pig Latin');
expect(out(C.srcPig, 'Orange\n'), 'Pig Latin = ORANGEAY', 'pig Latin vowel first');
expect(out(B.cInitials), 'SPS', 'initials');
expect(out(B.cToggle), 'oCT 2026 fEST', 'toggled title');
expect(ev("'a' - 'A'"), '32', 'gap between small and capital');
expect(out(C.cSortPass), 'Asha Mohan Bina Tara', 'one bubble pass');
expect(out(C.cSelPass).split('\n')[0], 'Arun Zoya Meera Chetan', 'selection sort first pass');
expect(out(C.cFind('Tarun')), 'Found at index 2', 'linear search found');
expect(out(C.cFind('Meena')), 'Not found', 'linear search missing');
expect(out(C.srcAbbr, 'Anand Kumar Sharma\n'), 'A. K. Sharma', 'initials of a name');

// ---------------------------------------------------------------- SVG helpers
const strBoxes = (s, { range, label } = {}) => {
  const w = 44, n = s.length, W = Math.max(n * w + 90, 330), x0 = (W - n * w) / 2;
  const sv = new Svg(W, 120);
  if (label) sv.text(W / 2, 14, label, { size: 14, bold: true });
  [...s].forEach((ch, i) => {
    const hi = range && i >= range[0] && i < range[1];
    sv.rect(x0 + i * w, 28, w - 4, 40, { rx: 4, fill: hi ? 'accent' : 'fill', fillOpacity: hi ? 0.35 : undefined, color: 'accent', sw: 1.6 });
    sv.text(x0 + i * w + (w - 4) / 2, 48, ch === ' ' ? '_' : ch, { size: 18, bold: true });
    sv.text(x0 + i * w + (w - 4) / 2, 86, String(i), { size: 13, muted: true });
  });
  sv.text(W / 2, 110, 'index', { size: 12, muted: true });
  return sv;
};
const arrBoxes = (arr, label) => {
  const w = 96, n = arr.length, W = n * w + 60, x0 = 30;
  const sv = new Svg(W, 120);
  if (label) sv.text(W / 2, 14, label, { size: 14, bold: true });
  arr.forEach((x, i) => {
    sv.rect(x0 + i * w, 28, w - 6, 40, { rx: 4, fill: 'fill', color: 'accent', sw: 1.6 });
    sv.text(x0 + i * w + (w - 6) / 2, 48, x, { size: 16, bold: true });
    sv.text(x0 + i * w + (w - 6) / 2, 86, String(i), { size: 13, muted: true });
  });
  sv.text(W / 2, 110, 'index', { size: 12, muted: true });
  return sv;
};

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['The String class', 'length, charAt, indexOf', 'trim, case, concat', 'Comparison methods', 'substring, replace, valueOf'], 'Route map of Part 1: the String class, length, charAt and indexOf, trim and case methods, comparison methods, and substring, replace and valueOf', 'Part 1 at a glance');
const vString = strBoxes('Kalyani', { label: 'String s = "Kalyani";' }).visual('The String Kalyani drawn as seven boxes, one character in each, with the indexes 0 to 6 written below the boxes', 'The seven characters of Kalyani have the indexes 0 to 6.');
const kalRows = [['s.length()', 's.length()'], ['s.charAt(0)', 's.charAt(0)'], ['s.charAt(s.length() - 1)', 's.charAt(s.length() - 1)'], ["s.indexOf('a')", "s.indexOf('a')"], ["s.lastIndexOf('a')", "s.lastIndexOf('a')"], ["s.indexOf('z')", "s.indexOf('z')"]];
const vLen = table(['Expression (s = Kalyani)', 'Value'], kalRows.map(([l, e]) => [ic(l), ic(ev(e, KAL))]),
  `Table of six calls on the String Kalyani: ${kalRows.map(([l, e]) => `${l} gives ${ev(e, KAL)}`).join('; ')}`, 'The last index of a String is length() - 1.');
const cMango = 's = "mango juice, mango pulp"';
const idxLines = out(A.cIdx).split('\n');
const idxExprs = ['s.indexOf("mango")', 's.lastIndexOf("mango")', "s.indexOf('o', 3)", 's.indexOf("lemon")'];
const vIdx = table(['Call on s = "mango juice, mango pulp"', 'Value', 'Meaning'], idxExprs.map((e, i) => [ic(e), ic(idxLines[i]), ['first occurrence', 'last occurrence', 'first occurrence at or after index 3', 'not present'][i]]),
  `Table of four searches in the String mango juice, mango pulp: ${idxExprs.map((e, i) => `${e} gives ${idxLines[i]}`).join('; ')}`, 'A search that finds nothing returns -1.');
const caseRows = [
  ['"  Mira Das  ".trim()', ic(ev('"[" + "  Mira Das  ".trim() + "]"')), 'removes the spaces at both ends only'],
  ['"Mira Das".toUpperCase()', ic(ev('"Mira Das".toUpperCase()')), 'every letter to capital'],
  ['"Mira Das".toLowerCase()', ic(ev('"Mira Das".toLowerCase()')), 'every letter to small'],
  ['"Mira".concat(" Das")', ic(ev('"Mira".concat(" Das")')), 'joins the argument at the end'],
];
const vCase = table(['Call', 'Result', 'Job'], caseRows.map(([e, v, j]) => [ic(e), v, j]),
  `Table of four calls: trim gives ${ev('"[" + "  Mira Das  ".trim() + "]"')} within square brackets, toUpperCase gives ${ev('"Mira Das".toUpperCase()')}, toLowerCase gives ${ev('"Mira Das".toLowerCase()')} and concat gives ${ev('"Mira".concat(" Das")')}`, 'Each method returns a new String.');
const vImmut = table(['Statement', 'Value of s afterwards'], [[ic('s.toUpperCase();'), ic(out(A.cImmut))], [ic('s = s.toUpperCase();'), ic(out(code('String s = "pune";', 's = s.toUpperCase();', 'System.out.println(s);')))]],
  `Table of two statements applied to the String pune: s.toUpperCase() alone leaves s as ${out(A.cImmut)}, while s = s.toUpperCase() stores the new String and s becomes ${out(code('String s = "pune";', 's = s.toUpperCase();', 'System.out.println(s);'))}`, 'The result of a String method must be stored to be kept.');
const travLines = out(A.cTravel).split('\n');
const vTrav = table(['i', 'plate.charAt(i)', 'Output line'], travLines.map((l, i) => [String(i), ic(l.split(' ')[1]), ic(l)]),
  `Trace table of the loop over the String KA05: ${travLines.map((l) => l.replace(' ', ' gives ')).join('; ')}`, 'The loop condition is i < plate.length().');
const excMsg = rtErr(A.cOutOfRange);
const vExc = table(['Item', 'Value'], [
  ['The String', ic('"TN07"')],
  ['Valid indexes', `0 to ${ev('"TN07".length() - 1')}`],
  ['Call that fails', ic('tag.charAt(4)')],
  ['Printed before the failure', ic(rtOut(A.cOutOfRange).trim())],
  ['Message of the exception', ic(excMsg)],
], `Table describing the failing loop over the String TN07: valid indexes are 0 to 3, the call charAt of 4 fails after the loop printed ${rtOut(A.cOutOfRange).trim()}, with the message ${excMsg}`, 'The condition i <= length() runs one place too far.');
const eqRows = ['"Goa".equals("Goa")', '"Goa".equals("goa")', '"Goa".equalsIgnoreCase("GOA")'];
const vEq = table(['Expression', 'Value'], eqRows.map((e) => [ic(e), ic(ev(e))]),
  `Table of three comparisons: ${eqRows.map((e) => `${e} is ${ev(e)}`).join('; ')}`, 'equals is case-sensitive; equalsIgnoreCase is not.');
const cmpPairs = [['apple', 'apricot', 'p and r differ first: 112 - 114'], ['Meera', 'Meena', 'r and n differ first, at index 3: 114 - 110'], ['Delhi', 'Delhi Cantt', 'Delhi begins the other String: 5 - 11'], ['Zebra', 'apple', 'Z and a differ first: 90 - 97']];
const cmpVals = cmpPairs.map(([a, b]) => ev(`"${a}".compareTo("${b}")`));
const vCmpRule = table(['Rule', 'compareTo returns'], [
  ['The Strings are exactly equal', '0'],
  ['They differ at some index', 'the difference of the two character codes there'],
  ['One String begins the other', 'the difference of the lengths'],
  ['Sign of the result', 'negative: first String comes first; positive: it comes later'],
], 'Table of the rules of compareTo: zero for equal Strings, the difference of the character codes at the first difference, the difference of the lengths when one String begins the other, and the sign that tells the alphabetical order', 'The order is that of the character codes, so capital letters come before small letters.');
const vEx2 = table(['String a', 'String b', 'a.compareTo(b)', 'Why'], cmpPairs.map(([a, b, w], i) => [a, b, cmpVals[i], w]),
  `Trace table of four compareTo calls: ${cmpPairs.map(([a, b], i) => `${a} with ${b} gives ${cmpVals[i]}`).join('; ')}`, 'The sign tells the order; the size is the difference found.');
const MYS = 'String s = "Mysuru Palace";';
const moreRows = [
  ['s.startsWith("Mys")', ev('s.startsWith("Mys")', MYS)], ['s.startsWith("mys")', ev('s.startsWith("mys")', MYS)], ['s.endsWith("ace")', ev('s.endsWith("ace")', MYS)],
  ['"Kiran".compareToIgnoreCase("KIRAN")', ev('"Kiran".compareToIgnoreCase("KIRAN")')], ['"Kiran".compareToIgnoreCase("kirti")', ev('"Kiran".compareToIgnoreCase("kirti")')],
];
const vMore = table(['Expression (s = Mysuru Palace)', 'Value'], moreRows.map(([e, v]) => [ic(e), ic(v)]),
  `Table of five calls: ${moreRows.map(([e, v]) => `${e} gives ${v}`).join('; ')}`, 'startsWith and endsWith are case-sensitive and return boolean.');
const RUN = 'String m = "ra".concat("ma");\nString n = "ra".concat("ma");';
const vThree = table(['', 'equals()', 'compareTo()', '=='], [
  ['Returns', 'boolean', 'int', 'boolean'],
  ['Compares', 'the characters', 'the characters, in order', 'the references (objects)'],
  ['m and n built at run time with the same text', ic(ev('m.equals(n)', RUN)), ic(ev('m.compareTo(n)', RUN)), ic(ev('m == n', RUN))],
], `Table comparing equals, compareTo and the double equals operator: equals returns boolean and compares characters, compareTo returns int, == compares references; for two Strings built at run time with the same text, equals gives ${ev('m.equals(n)', RUN)}, compareTo gives ${ev('m.compareTo(n)', RUN)} and == gives ${ev('m == n', RUN)}`, 'Use equals or compareTo for the text of Strings, never ==.');
const vSub = strBoxes('Vijayawada', { range: [0, 3], label: 'substring(0, 3) of "Vijayawada"' }).visual(`The String Vijayawada drawn as ten boxes with indexes 0 to 9; the first three boxes are shaded because substring of 0 and 3 gives ${ev('"Vijayawada".substring(0, 3)')}; substring of 6 gives ${ev('"Vijayawada".substring(6)')}`, 'The end index is not included: substring(0, 3) takes the indexes 0, 1 and 2.');
const subLines = out(B.cSubRef).split('\n');
const vEx3 = table(['Statement', 'Output'], [['ref.substring(4, 8)', subLines[0]], ['ref.substring(9)', subLines[1]], ['ref.substring(0, 3) + ref.substring(12)', subLines[2]]].map(([e, v]) => [ic(e), ic(v)]),
  `Trace table of the three statements on the token SOY-2026-IND-045: ${subLines.join('; ')}`, 'The token is SOY-2026-IND-045.');
const V = 'String v = "Vijayawada";';
const repRows = [['v.replace(\'a\', \'o\')', ev("v.replace('a', 'o')", V)], ['v.replace("ya", "YA")', ev('v.replace("ya", "YA")', V)], ['String.valueOf(45)', ev('String.valueOf(45)')], ['String.valueOf(2.5)', ev('String.valueOf(2.5)')], ['String.valueOf(true)', ev('String.valueOf(true)')], ["String.valueOf('Z')", ev("String.valueOf('Z')")]];
const vRepVal = table(['Call (v = Vijayawada)', 'Result'], repRows.map(([e, v]) => [ic(e), ic(v)]),
  `Table of replace and valueOf calls: ${repRows.map(([e, v]) => `${e} gives ${v}`).join('; ')}`, 'valueOf turns any value into a String.');
const vSummary1 = table(['Topic', 'Remember'], [
  ['String', 'a sequence of characters; indexes start at 0; objects are immutable'],
  ['length, charAt', 'last index is length() - 1; a wrong index throws an exception'],
  ['indexOf, lastIndexOf', 'first and last position; -1 when absent'],
  ['trim, case, concat', 'return a new String; store the result to keep it'],
  ['equals, compareTo, ==', 'text, order, and references'],
  ['substring, replace, valueOf', 'end index excluded; replace changes all; valueOf converts'],
], 'Summary table of Part 1: the String class, length and charAt, indexOf, trim case and concat, the comparison methods, and substring replace and valueOf');

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Build a String', 'Palindrome', 'Count characters', 'Change case', 'Pig Latin', 'Sort names', 'Search names'], 'Route map of Part 2: building a String, palindrome, counting characters, changing case, pig Latin, sorting names and searching names', 'Part 2 at a glance');
const vBuild = table(['Statement in the loop', 'Result for the word Priya'], [[ic('r = r + s.charAt(i);'), ic(out(code('String s = "Priya";', 'String r = "";', 'for (int i = 0; i < s.length(); i++)', '    r = r + s.charAt(i);', 'System.out.println(r);')))], [ic('r = s.charAt(i) + r;'), ic(out(B.cRevPrepend))]],
  `Table of the two ways to build a new String in a loop for the word Priya: adding each character at the end gives ${out(code('String s = "Priya";', 'String r = "";', 'for (int i = 0; i < s.length(); i++)', '    r = r + s.charAt(i);', 'System.out.println(r);'))}, adding each character in front gives ${out(B.cRevPrepend)}`, 'Start with an empty String, "".');
const vPalFlow = flow('LR', ['Accept the word', 'rev = empty String', 'Add characters from the last to the first', 'Compare word and rev with equalsIgnoreCase', 'Display the message'], 'Flow of the palindrome check: accept the word, start the reverse as an empty String, add the characters from the last to the first, compare the word with its reverse ignoring case, and display the message', 'The palindrome program in five steps.');
const palWords = ['Rotor', 'Kalyan', 'Civic'];
const vEx1 = table(['Word', 'Output (joined by /)'], palWords.map((w) => [w, ic(one(out(C.srcPal, `${w}\n`)))]),
  `Trace table of the palindrome program: ${palWords.map((w) => `${w} prints ${one(out(C.srcPal, `${w}\n`))}`).join('; ')}`, 'equalsIgnoreCase makes R and r equal.');
const tests6 = [['Vowel, either case', '"AEIOUaeiou".indexOf(c) != -1'], ['Capital letter', 'Character.isUpperCase(c)'], ['Space between words', "c == ' '"], ['Digit', 'Character.isDigit(c)']];
const vCount = table(['Task', 'Condition', "c is 'E'", "c is '7'"], tests6.map(([t, e]) => [t, ic(e), ic(ev(e, "char c = 'E';")), ic(ev(e, "char c = '7';"))]),
  `Table of four character tests: ${tests6.map(([t, e]) => `${t}, for E ${ev(e, "char c = 'E';")} and for 7 ${ev(e, "char c = '7';")}`).join('; ')}`, 'Character methods come from the wrapper class Character.');
const sents = ['Kavita visits Hampi on Sunday', 'Bright Stars Shine', 'sun and moon'];
const vEx2b = table(['Sentence', 'Words / Vowels / Capital letters'], sents.map((s) => [s, ic(one(out(C.srcCount, `${s}\n`)))]),
  `Trace table of the counting program: ${sents.map((s) => `${s} gives ${one(out(C.srcCount, `${s}\n`))}`).join('; ')}`, 'The word count is the number of spaces plus 1.');
const togRows = ["(int) 'A'", "(int) 'a'", "'a' - 'A'", "(char) ('g' - 32)", "Character.toUpperCase('g')", "Character.toLowerCase('G')"];
const vTog = table(['Expression', 'Value'], togRows.map((e) => [ic(e), ic(ev(e))]),
  `Table of case conversions: ${togRows.map((e) => `${e} is ${ev(e)}`).join('; ')}`, 'A small letter is 32 above its capital.');
const vPigFlow = flow('LR', ['Accept the word, capital letters', 'Find the index p of the first vowel', 'Take substring(p)', 'Add substring(0, p)', 'Add AY'], 'Flow of the pig Latin rule: accept the word in capital letters, find the index p of the first vowel, take the letters from p to the end, add the letters before p, then add AY', 'Pig Latin: move the front letters to the back and add AY.');
const pigWords = ['Stripe', 'Orange', 'Tree'];
const vEx3p = table(['Word', 'Index p of first vowel', 'Output'], pigWords.map((w) => [w, ev('p', B.pigFrag(w.toUpperCase(), 'p').split('\n').slice(0, -1).join('\n')), ic(out(C.srcPig, `${w}\n`))]),
  `Trace table of the pig Latin program: ${pigWords.map((w) => `${w} has its first vowel at index ${ev('p', B.pigFrag(w.toUpperCase(), 'p').split('\n').slice(0, -1).join('\n'))} and gives ${out(C.srcPig, `${w}\n`)}`).join('; ')}`, 'When p is 0 only AY is added.');
const SPS = 'String s = "Sunrise Public School";';
const vInit = table(['Word starts at index', 'Letter taken', 'How the index is found'], [['0', ev('s.charAt(0)', SPS), 'always the first word'], [ev('s.indexOf(" ") + 1', SPS), ev('s.charAt(s.indexOf(" ") + 1)', SPS), 'after the first space'], [ev('s.lastIndexOf(" ") + 1', SPS), ev('s.charAt(s.lastIndexOf(" ") + 1)', SPS), 'after the last space']].map((r) => r),
  `Table of the first letters of the sentence Sunrise Public School: the word at index 0 gives ${ev('s.charAt(0)', SPS)}, the word after the first space starts at ${ev('s.indexOf(" ") + 1', SPS)} and gives ${ev('s.charAt(s.indexOf(" ") + 1)', SPS)}, the word after the last space starts at ${ev('s.lastIndexOf(" ") + 1', SPS)} and gives ${ev('s.charAt(s.lastIndexOf(" ") + 1)', SPS)}; the program prints ${out(B.cInitials)}`, 'A letter starts a word when the character before it is a space.');
const vArr = arrBoxes(['Tara', 'Asha', 'Mohan', 'Bina'], 'String[] names = {"Tara", "Asha", "Mohan", "Bina"};').visual('An array of four Strings drawn as four boxes holding Tara, Asha, Mohan and Bina, with the indexes 0 to 3 below them', 'Each element of the array is a String, so its methods can be used: names[2].length().');
const NAMES = 'String[] n = {"Tara", "Asha", "Mohan", "Bina"};';
const nbPairs = [[0, 1], [1, 2], [2, 3]];
const vCmpNames = table(['Neighbours', 'compareTo value', 'Action'], nbPairs.map(([i, j]) => { const v = ev(`n[${i}].compareTo(n[${j}])`, NAMES); return [ic(`n[${i}], n[${j}]`), v, Number(v) > 0 ? 'swap' : 'no swap']; }),
  `Table of the first three comparisons of the first bubble sort pass on Tara, Asha, Mohan and Bina using the original array: ${nbPairs.map(([i, j]) => `n of ${i} with n of ${j} gives ${ev(`n[${i}].compareTo(n[${j}])`, NAMES)}`).join('; ')}`, 'A positive value means the names are out of order.');
const cBubbleAll = code('String[] n = {"Tara", "Asha", "Mohan", "Bina"};', 'for (int i = 0; i < n.length - 1; i++) {', '    for (int j = 0; j < n.length - 1 - i; j++) {', '        if (n[j].compareTo(n[j + 1]) > 0) {', '            String t = n[j];', '            n[j] = n[j + 1];', '            n[j + 1] = t;', '        }', '    }', '    System.out.println(n[0] + " " + n[1] + " " + n[2] + " " + n[3]);', '}');
const bubLines = out(cBubbleAll).split('\n');
const vBubble = table(['After', 'Array'], [['start', 'Tara Asha Mohan Bina'], ...bubLines.map((l, i) => [`pass ${i + 1}`, l])].map(([a, b]) => [a, ic(b)]),
  `Trace table of bubble sort on Tara, Asha, Mohan and Bina: ${bubLines.map((l, i) => `after pass ${i + 1} the array is ${l}`).join('; ')}`, 'After pass 1 the largest name is last.');
const selLines = out(C.cSelPass).split('\n');
const vSel = table(['After', 'Array'], [['start', 'Zoya Arun Meera Chetan'], ...selLines.map((l, i) => [`pass ${i + 1}`, l])].map(([a, b]) => [a, ic(b)]),
  `Trace table of selection sort on Zoya, Arun, Meera and Chetan: ${selLines.map((l, i) => `after pass ${i + 1} the array is ${l}`).join('; ')}`, 'Each pass places the smallest remaining name in front.');
const vSearchFlow = flow('LR', ['Accept the key', 'pos = -1; start at index 0', 'Does names[i] equal the key?', 'Yes: store i in pos and stop', 'No: go to the next index', 'After the loop: pos is -1 means not found'], 'Flow of linear search in a String array: accept the key, set pos to minus one, test each element with equals, store the index and stop on a match, move on otherwise, and report not found if pos is still minus one', 'Linear search checks the elements one by one.');
const vSummary2 = table(['Topic', 'Remember'], [
  ['New String from a String', 'start with "" and join characters in a loop'],
  ['Palindrome', 'reverse the word, compare with equalsIgnoreCase'],
  ['Counting', 'visit each character; test vowel, capital, space'],
  ['Changing case', 'Character methods or the gap of 32; copy other characters'],
  ['Pig Latin', 'substring(p) + substring(0, p) + AY'],
  ['Sorting names', 'compareTo in bubble or selection sort, never >'],
  ['Searching', 'equals or equalsIgnoreCase in a loop; -1 for not found'],
], 'Summary table of Part 2: building a String, palindrome, counting, changing case, pig Latin, sorting names with compareTo, and searching with equals');

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'The String Class: Methods, Comparison and Extraction',
  goals: [
    'Predict the output of expressions that use length, charAt, indexOf, lastIndexOf, trim, case methods and concat',
    'Predict the value of equals, equalsIgnoreCase and compareTo, and tell them from the double equals operator',
    'Extract parts of a String with substring and change it with replace',
    'Convert values of other types to Strings with valueOf',
  ],
  slides: [
    sl('title', 'The String class', {
      b: 'Part 1: **length**, **charAt**, **indexOf**, **trim**, case methods, **concat**, the comparison methods, **substring**, **replace** and **valueOf**.',
      v: vRoute1,
      n: 'Welcome to String handling. In this part we study the String class. We find the length and the characters of a String and search it. We change case, trim spaces and join Strings. We compare Strings with equals and compareTo, and we cut out parts with substring. Finally we replace characters and convert numbers to Strings with valueOf.',
    }),
    sl('concept', 'What is a String?', {
      b: 'A **String** is a sequence of characters; in Java it is an **object** of the **String** class (package `java.lang`, no import needed). The characters have **indexes** starting from **0**.',
      v: vString,
      n: 'A String is a sequence of characters, and in Java it is an object of the String class. The class belongs to the java dot lang package, so no import is needed. The picture shows the String Kalyani. It has seven characters, and their indexes run from zero to six. The first character is at index zero and the last at the length minus one.',
    }),
    sl('concept', 'length() and charAt()', {
      b: '`length()` gives the **number of characters**; `charAt(i)` gives the **character at index i**. The last index is `length() - 1`.',
      v: vLen,
      n: 'The method length gives the number of characters, here seven. The method charAt gives the character at a given index. Index zero gives K, and the last character is at length minus one. The table also shows indexOf, which gives the first position of a character, and lastIndexOf, which gives the last. A character that is not present gives minus one.',
    }),
    sl('concept', 'indexOf() and lastIndexOf()', {
      b: 'Both accept a **char** or a **String**. `indexOf(ch, from)` starts the search at index **from**. A search that fails returns **-1**.',
      v: vIdx,
      n: 'The method indexOf returns the position of the first occurrence, and lastIndexOf returns the position of the last occurrence. Both work with a character or with a word. With a second argument, indexOf starts looking at that index. In the table, the word mango is first found at index zero and last found at index thirteen. A word that is absent gives minus one.',
    }),
    sl('concept', 'trim(), toUpperCase(), toLowerCase(), concat()', {
      b: '`trim()` removes spaces at **both ends** only. `toUpperCase()` and `toLowerCase()` change the case of every letter. `concat(s)` joins a String at the end, like `+`.',
      v: vCase,
      n: 'Four more methods. Trim removes the spaces at the beginning and at the end, but not those inside the String. To upper case and to lower case change every letter. Concat joins another String at the end, and gives the same result as the plus operator. Remember that each of these methods returns a new String.',
    }),
    sl('concept', 'Strings are immutable', {
      b: 'A String object **cannot be changed**. Methods return a **new String**; the old one stays as it was. To keep the result, **store it**.',
      v: vImmut,
      n: 'A String is immutable, which means that the object can never be changed. When we call to upper case on the String pune, a new String is made, but if we do not store it, the new String is lost and s still holds pune. To keep the capital letters, we must write s equals s dot to upper case.',
    }),
    sl('check', 'Quick check: immutability', { b: 'Choose the correct output.', chk: 'm_immut_out', n: 'Remember that a String method returns a new String and does not change the old one.' }),
    sl('example', 'Worked example 1: visiting every character', {
      b: `${F(A.cTravel)}\n\nA loop from 0 to \`length() - 1\` visits every character with \`charAt(i)\`.`,
      v: vTrav,
      n: 'Let us trace a loop over the String K A zero five. The variable i runs from zero up to length minus one, which is three. Each time, charAt of i gives the character at that index, and the program prints the index and the character. The condition is i less than length, and not less than or equal to.',
    }),
    sl('concept', 'StringIndexOutOfBoundsException', {
      b: 'A wrong index in `charAt` or `substring` stops the program with a **run-time exception**. The valid indexes are **0 to length() - 1**.',
      v: vExc,
      n: 'If the index is not valid, the program stops with a run time exception. The loop in the table used less than or equal to, so i reached four, which is the length of the String. The valid indexes are zero to three. The program printed the four characters and then failed on the fifth call. The message names the exception and the index.',
    }),
    sl('concept', 'equals() and equalsIgnoreCase()', {
      b: '`equals` is true only for **exactly the same characters**, case included. `equalsIgnoreCase` ignores the case. Both return **boolean**.',
      v: vEq,
      n: 'To test whether two Strings have the same text, use equals. It is true only when every character matches, including the case. So Goa and goa are not equal. If the case does not matter, use equals ignore case, which is true for Goa and capital G O A. Both methods return a boolean value.',
    }),
    sl('concept', 'compareTo()', {
      b: '`a.compareTo(b)` returns an **int**: **0** if equal; the **difference of the character codes** at the first difference; the **difference of the lengths** if one String begins the other.',
      v: vCmpRule,
      n: 'The method compareTo returns an integer. It is zero for equal Strings. If the Strings differ at some index, it returns the difference of the two character codes at the first difference. If one String is the beginning of the other, it returns the difference of their lengths. A negative result means that the first String comes first in the dictionary order.',
    }),
    sl('example', 'Worked example 2: predicting compareTo', {
      b: 'Find the first index where the Strings differ and subtract the codes; if there is none, subtract the lengths.',
      v: vEx2,
      n: 'Let us predict four values. Apple and apricot first differ at index two, where p is one hundred twelve and r is one hundred fourteen, so the value is minus two. Meera and Meena differ at index three. Delhi is the beginning of Delhi Cantt, so the value is the difference of the lengths, minus six. Capital Z comes before small a, so the last value is negative.',
    }),
    sl('check', 'Quick check: compareTo', { b: 'Write the exact output.', chk: 'co_cmp1', n: 'Find the first index at which the two names differ and subtract the codes.' }),
    sl('concept', 'compareToIgnoreCase(), startsWith(), endsWith()', {
      b: '`compareToIgnoreCase` works like `compareTo` but ignores case. `startsWith(prefix)` and `endsWith(suffix)` return **boolean** and are **case-sensitive**.',
      v: vMore,
      n: 'The method compareToIgnoreCase works like compareTo, but it ignores the case of the letters. The methods startsWith and endsWith test the beginning and the end of a String and return a boolean value. They are case sensitive, so starts with small m y s is false for Mysuru. The last row shows that Kiran comes before kirti even when the case is ignored.',
    }),
    sl('concept', 'equals() or compareTo() or ==?', {
      b: '`equals` and `compareTo` look at the **characters**. The operator `==` compares **references**: it asks whether both variables point to the **same object**.',
      v: vThree,
      n: 'Three ways of comparing, three different meanings. Equals returns a boolean and compares the characters. CompareTo returns an integer, and gives the order. The double equals operator compares references, that is, whether two variables point to the same object. Two Strings built at run time with the same text are equal and have compareTo zero, but the double equals operator gives false.',
    }),
    sl('check', 'Quick check: startsWith and endsWith', { b: 'Choose the correct output.', chk: 'm_startswith', n: 'Both methods are case sensitive. Check the first letters of the prefix and the last letters of the suffix.' }),
    sl('concept', 'substring()', {
      b: '`substring(begin)` goes from **begin** to the end. `substring(begin, end)` goes from **begin** to **end - 1**: the end index is **not included**.',
      v: vSub,
      n: 'The method substring has two forms. With one argument, it returns everything from that index to the end. With two arguments, it returns the characters from the begin index up to, but not including, the end index. In the picture, substring zero comma three takes the first three characters, V i j. The result has end minus begin characters.',
    }),
    sl('example', 'Worked example 3: splitting a token', {
      b: `${F(B.cSubRef)}\n\nWork out each result from the indexes: SOY is 0 to 2, 2026 is 4 to 7, IND is 9 to 11.`,
      v: vEx3,
      n: 'Let us split the token S O Y, two zero two six, I N D, zero four five. Substring from four to eight takes the four digits of the year. Substring from nine takes everything from index nine to the end. The third statement joins the first three characters with the part that starts at index twelve, so the year and the middle part are dropped.',
    }),
    sl('concept', 'replace() and valueOf()', {
      b: '`replace(old, new)` changes **every** occurrence, for a char or for a String. `String.valueOf(x)` converts an **int, double, char or boolean** to a String.',
      v: vRepVal,
      n: 'The method replace changes every occurrence of a character, or of a word, and returns a new String. The method valueOf of the String class converts a value of another type to a String. It works for int, double, char and boolean values. After the conversion, string methods such as length can be used, which is not possible on an int.',
    }),
    sl('check', 'Quick check: matching', { b: 'Match each expression with its value.', chk: 'mt_sub', n: 'Work out each substring from the indexes, and remember that replace changes every occurrence.' }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A String is an object whose characters are numbered from zero. Length, charAt, indexOf and lastIndexOf examine it. Trim, case methods, concat, replace and substring return new Strings, because a String is immutable. Equals compares text, compareTo gives the order, and the double equals operator compares references. The valueOf method converts other values to Strings.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Number the characters from 0 and write the indexes under the String before answering.',
        'The end index of `substring(b, e)` is not included; the result has `e - b` characters.',
        '`compareTo`: find the first different character and subtract; if there is none, subtract the lengths.',
        'Never use `==` for the text of Strings; use `equals` or `equalsIgnoreCase`.',
        'A String method does not change the String: look for the assignment that stores the result.',
      ],
      n: 'Some exam tips. Write the indexes under the String before you answer. In substring, the end index is not included. For compareTo, subtract the first different characters, or the lengths if one String begins the other. Use equals for the text of Strings and never the double equals operator. A String method does not change the String, so look for the statement that stores the result.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Programs on Strings, and String Arrays: Sorting and Searching',
  goals: [
    'Build a new String by processing the characters of a String one by one',
    'Write programs for palindromes, pig Latin, counting characters and changing case',
    'Sort an array of names alphabetically by bubble sort or selection sort using compareTo',
    'Search an array of Strings for a word by linear search',
  ],
  slides: [
    sl('title', 'Programs on Strings', {
      b: 'Part 2: building new Strings, **palindrome**, **counting**, **changing case**, **pig Latin**, and **String arrays**: sorting and searching.',
      v: vRoute2,
      n: 'Welcome to the second part. We write programs that process a String character by character and build a new String. We check palindromes, count vowels and words, change the case of letters and form pig Latin words. Then we move to arrays of Strings, where we sort names alphabetically with bubble sort and selection sort, and search for a name with linear search.',
    }),
    sl('concept', 'Building a new String', {
      b: 'Start with an **empty String** and join one character in each step of a loop. The place where the character is joined decides the order.',
      v: vBuild,
      n: 'Most String programs have the same pattern. Start with an empty String. In a loop, take each character with charAt and join it to the new String. If the character is joined at the end, the order stays the same. If it is joined in front, the order is reversed, so the word Priya becomes a y i r P.',
    }),
    sl('concept', 'Palindrome words', {
      b: 'A word is a **palindrome** if it reads the same **forwards and backwards**. Build the reverse and compare it with the word using `equalsIgnoreCase`.',
      v: vPalFlow,
      n: 'A palindrome reads the same from both ends. The program has five steps. Accept the word, start the reverse as an empty String, and add the characters of the word from the last to the first. Then compare the word with its reverse. If the case of letters should not matter, use equals ignore case. Finally display the message.',
    }),
    sl('example', 'Worked example 1: palindrome words', {
      b: `${F(C.srcPal.split(String.fromCharCode(10)).filter((l) => !l.trim().startsWith("//")).join(String.fromCharCode(10)))}`,
      v: vEx1,
      n: 'Let us run the palindrome program for three words. Rotor reversed is small r o t o capital R. The letters differ in case, but equals ignore case is true, so Rotor is a palindrome. Kalyan reversed is n a y l a K, which is not the same word, so the message says that it is not a palindrome. Civic reads the same both ways.',
    }),
    sl('check', 'Quick check: palindrome steps', { b: 'Arrange the steps in order.', chk: 'ord_pal', n: 'The reverse must be started before it is built, and built before it is compared.' }),
    sl('concept', 'Counting characters', {
      b: 'Visit every character with `charAt(i)` and use a **condition** with a **counter**: vowels, capital letters, digits or spaces.',
      v: vCount,
      n: 'To count something, visit every character with a loop and use a condition that increases a counter. The table gives the conditions. A vowel is tested by searching the character in the String of vowels, which gives minus one when it is not there. Character dot is upper case tests capital letters. The number of words is the number of spaces plus one.',
    }),
    sl('example', 'Worked example 2: words, vowels and capital letters', {
      b: `The program reads a sentence with \`nextLine()\`, trims it, and counts in one loop.\n\n${F(C.srcCount.split('\n').slice(6, 20).join('\n'))}`,
      v: vEx2b,
      n: 'Here is the output of the counting program for three sentences. In the first sentence there are five words, so the word counter, which starts at one, ends at five after four spaces. The vowel count includes capital and small vowels, and the capital letters are counted separately. The last sentence has no capital letters at all.',
    }),
    sl('check', 'Quick check: counting words', { b: 'Choose the correct output.', chk: 'm_count_words', n: 'Count the spaces, and remember where the counter starts.' }),
    sl('concept', 'Changing the case of letters', {
      b: 'Use `Character.isUpperCase` and `Character.isLowerCase` to decide, and `Character.toLowerCase` and `Character.toUpperCase` to change. Other characters are **copied unchanged**.',
      v: vTog,
      n: 'To toggle the case, test each character. An upper case letter is changed to lower case, a lower case letter to upper case, and every other character, such as a space or a digit, is copied unchanged. The table also shows that a small letter has a code thirty two above its capital, so subtracting thirty two and casting to char gives the capital letter.',
    }),
    sl('check', 'Quick check: character codes', { b: 'Choose the correct output.', chk: 'm_toggle', n: 'The code of a small letter is thirty two more than the code of its capital.' }),
    sl('concept', 'Pig Latin', {
      b: '**Rule used here:** the letters **before the first vowel** move to the end of the word and **AY** is added; if the word starts with a vowel, only **AY** is added.',
      v: vPigFlow,
      n: 'Pig Latin follows a rule. The letters before the first vowel move to the end of the word, and the letters A Y are added. If the word starts with a vowel, only A Y is added. The program finds the index p of the first vowel, and forms substring from p, then substring from zero to p, then A Y. If p is zero the second part is empty.',
    }),
    sl('example', 'Worked example 3: pig Latin words', {
      b: `${F(C.srcPig.split('\n').slice(6, 17).join('\n'))}`,
      v: vEx3p,
      n: 'Let us trace three words. Stripe has its first vowel I at index three, so the front letters S T R move to the end, and the result is I P E S T R A Y. Orange starts with a vowel, so p is zero and only A Y is added. In Tree, the first vowel is at index two, so T R moves to the end after E E.',
    }),
    sl('concept', 'Words and first letters', {
      b: `${F(B.cInitials)}\n\nA character starts a word when the **character before it is a space**; the first character always does.`,
      v: vInit,
      n: 'To take the first letter of each word, remember that a word begins at index zero, or at the character after a space. The loop checks the character before the current one. In the sentence Sunrise Public School, the words start at index zero, eight and fifteen, and the letters are S, P and S. The program prints the three letters joined.',
    }),
    sl('concept', 'Arrays of Strings', {
      b: 'In `String[] names`, each element is a **String**. `names.length` (no brackets) is the **number of elements**; `names[i].length()` is the **length of one name**.',
      v: vArr,
      n: 'An array can hold Strings. Each element is a String object, so we can call its methods, for example names of two dot length. Take care of the difference. For an array, length is a property and is written without brackets. For a String, length is a method and is written with brackets.',
    }),
    sl('concept', 'Comparing names for sorting', {
      b: 'Sorting names needs **compareTo**: the operator `>` cannot be used on Strings. A **positive** value means the two names are **out of order** for ascending order.',
      v: vCmpNames,
      n: 'To sort names, the program must know which of two names comes first. The operator greater than cannot be used with Strings, so we use compareTo. For ascending order, a positive value means that the left name comes after the right name, so the two are swapped. A negative value means that the pair is already in order.',
    }),
    sl('example', 'Worked example 4: bubble sort passes', {
      b: `${F(cBubbleAll)}\n\nIn every pass neighbouring names are compared; the **largest name moves to the end**.`,
      v: vBubble,
      n: 'Let us watch bubble sort on four names. In pass one, Tara is swapped with each neighbour and moves to the end. In pass two, Mohan moves to the third place, and the array is sorted. Pass three finds nothing to swap, so the array is unchanged. After each pass the inner loop can stop one place earlier.',
    }),
    sl('concept', 'Selection sort', {
      b: 'In each pass find the **position of the smallest name** of the unsorted part with `compareTo`, then **swap** it into the first unsorted place.',
      v: vSel,
      n: 'Selection sort works differently. In each pass, the program finds the position of the smallest name in the unsorted part, and then swaps it with the name at the first unsorted position. After pass one, Arun is in front. After pass two, Chetan is in second place. In pass three the smallest is already in place, so the array is unchanged.',
    }),
    sl('concept', 'Linear search for a String', {
      b: `${F(C.cFind('Tarun'))}\n\nCompare the key with each element by **equals** (or **equalsIgnoreCase**); **-1** at the end means the key is absent.`,
      v: vSearchFlow,
      n: 'In a linear search we look at the elements one by one. Set the position to minus one. For each index, compare the element with the key using equals, or equals ignore case. If they match, store the index and stop. After the loop, a position of minus one means that the name is not in the array. Never use the double equals operator for the comparison.',
    }),
    sl('check', 'Quick check: searching', { b: 'Write the exact output.', chk: 'co_search', n: 'Equals is case sensitive, equals ignore case is not. Follow both variables through the loop.' }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. A new String is built by joining characters in a loop. A palindrome is found by comparing the word with its reverse. Counting uses a condition and a counter. Case is changed with the Character methods. Pig Latin moves the letters before the first vowel to the end and adds A Y. Names are sorted with compareTo, and searched with equals in a loop.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Declare the new String as `""` before the loop, and display it after the loop.',
        'Use `equalsIgnoreCase` for a palindrome that ignores case; use `compareTo`, not `>`, to sort names.',
        'State the pig Latin rule you use, and test a word that begins with a vowel.',
        'In a search, set `pos = -1`, stop at the first match and test `pos` after the loop.',
        'Add a variable description table or comments to every program.',
      ],
      n: 'Some exam tips. Declare the new String as an empty String before the loop and display it after the loop. Use equals ignore case for a palindrome that ignores case, and compareTo for sorting names. State the pig Latin rule you use. In a search, start with minus one and test it after the loop. Always add a variable description or comments to a program.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'String Handling: notes',
  sections: [
    {
      h: '1. The String class: length, charAt, indexOf and the case methods',
      t: 1,
      b: `A **String** is a sequence of characters; it is an object of the **String** class (package \`java.lang\`). Its characters have indexes from **0** to **length() - 1**.\n\n- \`length()\` returns the number of characters; \`charAt(i)\` returns the character at index i.\n- \`indexOf\` and \`lastIndexOf\` return the first and the last position of a char or String, or **-1** if it is absent; \`indexOf(ch, from)\` starts at index from.\n- \`trim()\` removes the spaces at both ends; \`toUpperCase()\`, \`toLowerCase()\` change the case; \`concat(s)\` joins a String at the end.\n\nTo visit every character:\n\n${F(A.cTravel)}\n\nOutput: ${ic(one(out(A.cTravel)))}.\n\nFor s = "Kalyani", ${ic("s.indexOf('a')")} is ${ev("s.indexOf('a')", KAL)} and ${ic("s.lastIndexOf('a')")} is ${ev("s.lastIndexOf('a')", KAL)}.`,
      terms: [
        ['String', 'A sequence of characters, handled in Java as an object of the String class.'],
        ['Index', 'The position of a character in a String, counted from 0.'],
        ['Immutable', 'Not changeable: a String object never changes, and its methods return a new String.'],
      ],
      v: vString,
      vs: [vLen, vIdx, vCase],
    },
    {
      h: '2. Immutability and index errors',
      t: 1,
      b: `A String method never changes the String it is called on; it returns a **new** String. The result must be stored to be kept.\n\n${F(A.cImmut2)}\n\nOutput: ${ic(out(A.cImmut2))}.\n\nA wrong index in \`charAt\` or \`substring\` throws a **StringIndexOutOfBoundsException** at run time. For the String TN07 (indexes 0 to 3) a loop that reaches index 4 prints ${ic(rtOut(A.cOutOfRange).trim())} and then stops with: ${ic(excMsg)}.`,
      terms: [['StringIndexOutOfBoundsException', 'The run-time exception thrown when an index (or a begin or end index) is outside the String.']],
      v: vImmut,
      vs: [vTrav, vExc],
    },
    {
      h: '3. Comparison: equals, compareTo and ==',
      t: 2,
      b: `- \`equals(s)\`: true for exactly the same characters (case-sensitive); \`equalsIgnoreCase(s)\` ignores the case.\n- \`compareTo(s)\` returns an **int**: 0 when equal; otherwise the **difference of the character codes** at the first difference, or the **difference of the lengths** when one String begins the other. A negative value means the first String comes first in the dictionary order. \`compareToIgnoreCase\` ignores the case.\n- \`startsWith(p)\` and \`endsWith(p)\` return boolean and are case-sensitive.\n- \`==\` compares the **references** of two objects, not their text.\n\nExamples: ${ic('"apple".compareTo("apricot")')} is ${ev('"apple".compareTo("apricot")')}; ${ic('"Delhi".compareTo("Delhi Cantt")')} is ${ev('"Delhi".compareTo("Delhi Cantt")')}.\n\nFor two Strings m and n built at run time from the same text, ${ic('m == n')} gives ${out(A.cRef2).split('\\n')[0]} while ${ic('m.equals(n)')} gives ${out(A.cRef2).split('\\n')[1]}.`,
      terms: [
        ['equals()', 'A String method that returns true when the two Strings have the same characters in the same case.'],
        ['compareTo()', 'A String method that returns an int: zero if equal, otherwise the difference of the first differing character codes or of the lengths.'],
      ],
      v: vEq,
      vs: [vCmpRule, vEx2, vMore, vThree],
    },
    {
      h: '4. Extraction and conversion: substring, replace and valueOf',
      t: 3,
      b: `- \`substring(begin)\` returns the characters from index begin to the end.\n- \`substring(begin, end)\` returns the characters from begin to **end - 1**; the end index is excluded and the result has end - begin characters.\n- \`replace(old, new)\` replaces **every** occurrence of a char or of a String and returns a new String.\n- \`String.valueOf(x)\` converts an int, double, char or boolean to a String.\n\n${F(B.cSubRef)}\n\nOutput: ${ic(one(out(B.cSubRef)))}.\n\nAn int has no methods: to count the digits of n write ${ic('String.valueOf(n).length()')}.`,
      terms: [
        ['substring()', 'A String method that returns a part of the String, from a begin index up to but not including an end index (or to the end).'],
        ['valueOf()', 'A static method of the String class that converts a value of another type to a String.'],
      ],
      v: vSub,
      vs: [vEx3, vRepVal],
    },
    {
      h: '5. Programs that process the characters of a String',
      t: 4,
      b: `Most programs start with an empty String or a counter and visit the characters in a loop.\n\n- **New String:** \`r = r + s.charAt(i)\` keeps the order; \`r = s.charAt(i) + r\` reverses it (Priya gives ${ic(out(B.cRevPrepend))}).\n- **Palindrome:** compare the word with its reverse using \`equalsIgnoreCase\`.\n- **Counting:** a condition and a counter: vowels (\`"AEIOUaeiou".indexOf(c) != -1\`), capital letters (\`Character.isUpperCase\`), words (spaces + 1).\n- **Changing case:** toggle with \`Character.toUpperCase\` and \`Character.toLowerCase\`; copy other characters: ${ic(out(B.cToggle))} for the title Oct 2026 Fest.\n- **Pig Latin (rule used here):** move the letters before the first vowel to the end and add AY; a word that begins with a vowel only gets AY. Stripe gives ${ic(out(C.srcPig, 'Stripe\n').replace('Pig Latin = ', ''))}.\n- **First letters of words:** take the first character and every character that follows a space (${ic(out(B.cInitials))} for Sunrise Public School).`,
      terms: [
        ['Palindrome', 'A word that reads the same forwards and backwards.'],
        ['Pig Latin', 'A word game: the letters before the first vowel move to the end and AY is added.'],
      ],
      v: vBuild,
      vs: [vPalFlow, vEx1, vCount, vEx2b, vTog, vPigFlow, vEx3p, vInit],
    },
    {
      h: '6. String arrays: sorting and searching',
      t: 5,
      b: `Each element of a String array is a String. \`names.length\` is the number of elements; \`names[i].length()\` is the length of one name.\n\n- **Sorting:** the operator \`>\` cannot be used on Strings; use \`compareTo\`. For ascending order two neighbours are swapped when \`n[j].compareTo(n[j + 1]) > 0\`.\n- **Bubble sort:** neighbouring names are compared in every pass; the largest name reaches the end. One pass on Tara, Asha, Mohan, Bina gives ${ic(out(C.cSortPass))}.\n- **Selection sort:** in each pass the position of the smallest name of the unsorted part is found and that name is swapped to the front.\n- **Linear search:** compare the key with each element by \`equals\` or \`equalsIgnoreCase\`; the position of a match is stored and the loop stops; -1 means absent.\n\n${F(C.cFind('Tarun'))}\n\nOutput: ${ic(out(C.cFind('Tarun')))}; for the key Meena it is ${ic(out(C.cFind('Meena')))}.`,
      terms: [
        ['Bubble sort', 'A sorting method that compares neighbouring elements in each pass and swaps those that are out of order.'],
        ['Selection sort', 'A sorting method that finds the smallest element of the unsorted part in each pass and swaps it into the first unsorted place.'],
        ['Linear search', 'A search that compares the key with the elements of an array one by one until it is found or the end is reached.'],
      ],
      v: vArr,
      vs: [vCmpNames, vBubble, vSel, vSearchFlow],
    },
  ],
  tips: '**Common mistakes**\n- Counting from 1 instead of 0, or running a loop to `i <= length()` (an exception).\n- Using `==` to compare the text of Strings, or `>` to compare names.\n- Forgetting that `substring(b, e)` leaves out the character at index e.\n- Calling `s.toUpperCase();` and not storing the result.\n- Writing `s.length` for a String or `names.length()` for an array (the brackets are the other way round).\n- Testing `compareTo` for `== 1` instead of `> 0`.\n\n**How marks are usually awarded**\n- Output questions: each line in the exact order and format; error questions: the kind of error and its cause.\n- Programs (15 marks): class and method structure, input, the loop and the String methods in the right place, correct output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a String in Java?', 'A sequence of characters; an object of the String class (package java.lang), with indexes from 0.', 'definition', 1],
  ['Why is a String called immutable?', 'The object cannot be changed; every method returns a new String and the old one is unchanged.', 'definition', 1],
  ['What does length() return?', 'The number of characters of the String; the last index is length() - 1.', 'fact', 1],
  ['What does charAt(i) return?', 'The character at index i, counted from 0.', 'fact', 1],
  ['indexOf and lastIndexOf', 'The position of the first and the last occurrence of a char or String; -1 when absent.', 'fact', 1],
  ['What does indexOf(ch, from) do?', 'Searches for ch starting at index from.', 'concept', 1],
  ['What does trim() remove?', 'Spaces at the beginning and the end only, not those inside.', 'fact', 1],
  ['toUpperCase and toLowerCase', 'Return a new String with every letter changed to capital or small.', 'fact', 1],
  ['What does concat do?', 'Returns a new String with the argument joined at the end (like +).', 'fact', 1],
  ['s.toUpperCase(); on its own', `Does not change s: ${ic(out(A.cImmut))} is still printed for s = "pune". Store the result: s = s.toUpperCase();`, 'exam-tip', 1],
  ['Exception for a wrong index in charAt', `StringIndexOutOfBoundsException, for example ${ic(excMsg)}.`, 'exam-tip', 1],
  ['What does equals() return?', 'boolean: true when both Strings have the same characters, case included.', 'fact', 2],
  ['equalsIgnoreCase', `Like equals but ignores the case: ${ic('"Goa".equalsIgnoreCase("GOA")')} is ${ev('"Goa".equalsIgnoreCase("GOA")')}.`, 'concept', 2],
  ['What does compareTo return?', 'An int: 0 if equal; the difference of the first differing character codes; the difference of the lengths if one String begins the other.', 'definition', 2],
  ['"apple".compareTo("apricot")', `${ev('"apple".compareTo("apricot")')}: p (112) minus r (114) at index 2.`, 'example', 2],
  ['"Delhi".compareTo("Delhi Cantt")', `${ev('"Delhi".compareTo("Delhi Cantt")')}: the length difference 5 - 11.`, 'example', 2],
  ['Sign of compareTo', 'Negative: the first String comes first; positive: it comes later; zero: equal.', 'concept', 2],
  ['startsWith and endsWith', 'Return boolean; both are case-sensitive.', 'fact', 2],
  ['What does == compare for Strings?', 'References (whether both variables point to the same object), not the text. Use equals for the text.', 'exam-tip', 2],
  ['m == n for two Strings built at run time with the same text', `${out(A.cRef2).split('\n')[0]}, while m.equals(n) gives ${out(A.cRef2).split('\n')[1]}.`, 'example', 2],
  ['substring(begin) and substring(begin, end)', 'From begin to the end; from begin to end - 1 (end index excluded).', 'definition', 3],
  ['"Vijayawada".substring(6)', ic(ev('"Vijayawada".substring(6)')), 'example', 3],
  ['"Vijayawada".substring(0, 3)', ic(ev('"Vijayawada".substring(0, 3)')), 'example', 3],
  ['What does replace do?', 'Replaces every occurrence of a char (or String) and returns a new String.', 'fact', 3],
  ['What does String.valueOf(x) do?', 'Converts an int, double, char or boolean to a String.', 'definition', 3],
  ['Count the digits of an int n', `${ic('String.valueOf(n).length()')}: an int has no methods.`, 'exam-tip', 3],
  ['How is a palindrome tested?', 'Build the reverse of the word and compare it with the word (equalsIgnoreCase to ignore case).', 'concept', 4],
  ['Pattern for building a new String', 'Start with "" and join one character in each step of a loop; r = s.charAt(i) + r reverses.', 'concept', 4],
  ['Number of words in a trimmed sentence with single spaces', 'The number of spaces plus 1.', 'fact', 4],
  ['Pig Latin rule used in this chapter', 'Move the letters before the first vowel to the end and add AY; only AY if the word starts with a vowel.', 'definition', 4],
  ['Why not use > to sort names?', `The operator > cannot be applied to Strings (javac: ${mustFail(C.cBadOp)}); use compareTo.`, 'exam-tip', 5],
  ['Swap condition in ascending bubble sort of names', 'n[j].compareTo(n[j + 1]) > 0.', 'fact', 5],
  ['What does one pass of selection sort do?', 'Finds the smallest name of the unsorted part and swaps it into the first unsorted place.', 'concept', 5],
  ['Linear search for a String', 'Compare the key with each element using equals; keep pos = -1 until a match; -1 after the loop means absent.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): String Handling',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_len_space', 'm_idx_sum', 'm_cmp_value', 'm_sub_range', 'm_pal_cond', 'm_sort_cmp', 's_immutable', 's_eq_vs'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_palin', 'l_pig'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): String Handling',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_char_at', 'm_trim_concat', 'm_exc', 'm_equals_def', 'm_prefix_cmp', 'm_ref', 'm_sub_from', 'm_replace', 'm_valueof_digits', 'm_pig_frag', 's_cmp_pred', 's_sel_pass', 's_count_vowels', 'co_sub', 'co_sort'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_count', 'l_bubble', 'l_search'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t05 of icse-10-computer-applications-ch13 only',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
