// ICSE 10 Computer Applications, ch13: String Handling. Topics t01 (the String class and its basic methods) and t02 (comparison).
// Every scenario is imagined for SOYL. Every output, value or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, rtErr, rtOut, exName, expect } from './q_util.mjs';

// ---- facts quoted as numbers in solutions (character codes, lengths); the build stops if Java disagrees
for (const [ch, n] of [['n', 110], ['r', 114], ['p', 112], ['Z', 90], ['a', 97], ['A', 65], ['K', 75], ['k', 107], ['o', 111], ['O', 79]]) expect(ev(`(int) '${ch}'`), n, `code of ${ch}`);
expect(ev('"Hampi Ruins".length()'), 11, 'length of Hampi Ruins');
expect(ev('"Hampi Ruins".charAt(6)'), 'R', 'charAt 6 of Hampi Ruins');
expect(ev('"Delhi".length()') + ev('"Delhi Cantt".length()'), '511', 'lengths of Delhi and Delhi Cantt');
expect(ev('"Kanpur".length()') + ev('"Kan".length()'), '63', 'lengths of Kanpur and Kan');
expect(ev('"Banyan".length()') + ev('"Tree".length()'), '64', 'lengths of Banyan and Tree');
expect(ev('"Kerala".length()'), 6, 'length of Kerala');
expect(ev('"TN07".length()'), 4, 'length of TN07');

// ---- shared code used by several items and by the slides
export const cTrail = (s) => code(`String trail = "${s}";`, 'System.out.println(trail.length());');
export const cImmut = code('String s = "pune";', 's.toUpperCase();', 'System.out.println(s);');
export const cImmut3 = code('String city = "agra";', 'String big = city.toUpperCase();', 'System.out.println(city + " " + big);');
export const cRef2 = code('String m = "ra".concat("ma");', 'String n = "ra".concat("ma");', 'System.out.println(m == n);', 'System.out.println(m.equals(n));');
export const cImmut2 = code('String a = "kolkata";', 'String b = a.toUpperCase();', 'a.concat(" city");', 'System.out.println(a + " " + b);');
export const cLenChar = code('String s = "Hampi Ruins";', 'int n = s.length();', 'System.out.println(n);', 'System.out.println(s.charAt(n - 1));', 'System.out.println(s.charAt(0) + "" + s.charAt(6));');
export const cIdx = code('String s = "mango juice, mango pulp";', 'System.out.println(s.indexOf("mango"));', 'System.out.println(s.lastIndexOf("mango"));', "System.out.println(s.indexOf('o', 3));", 'System.out.println(s.indexOf("lemon"));');
export const cTravel = code('String plate = "KA05";', 'for (int i = 0; i < plate.length(); i++)', '    System.out.println(i + " " + plate.charAt(i));');
export const cOutOfRange = code('String tag = "TN07";', 'for (int i = 0; i <= tag.length(); i++)', '    System.out.print(tag.charAt(i) + " ");');
export const cCmp1 = code('String a = "Meena", b = "Meera";', 'System.out.println(a.compareTo(b));', 'System.out.println(b.compareTo(a));', 'System.out.println(a.compareToIgnoreCase("MEENA"));');
export const cRef = code('String x = "pa";', 'String p = x.concat("ni");', 'String q = x.concat("ni");', 'System.out.println(p == q);', 'System.out.println(p.equals(q));');
export const cCmpBool = code('String a = "Ravi", b = "Ravindra";', 'boolean same = a.compareTo(b);', 'System.out.println(same);');
const none = (s) => (s === '' ? 'nothing' : s);

// ================================================================ t01 the String class and its methods
Q('m_len_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which method of the String class returns the number of characters in a string?',
  opts: distinct([ic('length()'), ic('size()'), ic('count()'), ic('charAt()')]),
  sol: `A String has the method length(), for example ${ic('"Rohini".length()')} gives ${ev('"Rohini".length()')}. size() and count() are not methods of String, and charAt() returns one character of the string.`,
}));
Q('m_len_space', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The code below stores the name of a nature trail. What does it display?\n\n${F(cTrail('Banyan Tree'))}`,
  opts: distinct([ic(out(cTrail('Banyan Tree'))), ic(out(cTrail('BanyanTree'))), ic(out(cTrail('Banyan Tree '))), ic(out(cTrail('Banyan')))]),
  sol: `length() counts every character, and the space between the two words is a character. "Banyan Tree" has 6 + 1 + 4 = ${out(cTrail('Banyan Tree'))} characters. ${out(cTrail('BanyanTree'))} forgets the space, ${out(cTrail('Banyan Tree '))} counts an extra trailing space and ${out(cTrail('Banyan'))} counts only the first word.`,
}));
const cTown = 'String town = "Gandhinagar";';
Q('m_char_at', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Indexes of a String start from 0. What does the code below display?\n\n${F(code(cTown, 'System.out.println(town.charAt(4));'))}`,
  opts: distinct([ic(ev('town.charAt(4)', cTown)), ic(ev('town.charAt(3)', cTown)), ic(ev('town.charAt(5)', cTown)), ic(ev('town.charAt(10)', cTown))]),
  sol: `The characters of Gandhinagar are G(0) a(1) n(2) d(3) h(4) i(5) n(6) a(7) g(8) a(9) r(10). charAt(4) is ${ic(ev('town.charAt(4)', cTown))}; charAt(3) is ${ev('town.charAt(3)', cTown)}, charAt(5) is ${ev('town.charAt(5)', cTown)} and charAt(10) is ${ev('town.charAt(10)', cTown)}.`,
}));
const cHyd = 'String s = "Hyderabad";';
Q('m_idx_sum', mcq({
  t: 1, d: 3, c: 'application',
  stem: `What value does the code below display?\n\n${F(code(cHyd, "System.out.println(s.indexOf('a') + s.lastIndexOf('a'));"))}`,
  opts: distinct([ic(ev("s.indexOf('a') + s.lastIndexOf('a')", cHyd)), ic(ev("s.indexOf('a') + s.lastIndexOf('d')", cHyd)), ic(ev("s.lastIndexOf('a') + s.lastIndexOf('d')", cHyd)), ic(ev("s.indexOf('d') + s.indexOf('a')", cHyd))]),
  sol: `In Hyderabad the letter a is first at index ${ev("s.indexOf('a')", cHyd)} and last at index ${ev("s.lastIndexOf('a')", cHyd)}, and d is first at index ${ev("s.indexOf('d')", cHyd)} and last at index ${ev("s.lastIndexOf('d')", cHyd)}. indexOf('a') is ${ev("s.indexOf('a')", cHyd)} and lastIndexOf('a') is ${ev("s.lastIndexOf('a')", cHyd)}, so the sum is ${ev("s.indexOf('a') + s.lastIndexOf('a')", cHyd)}. The other values come from mixing the first and last positions of a and d.`,
}));
Q('m_idx_absent', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A program searches a city name for the letter z using the indexOf method. What is returned when the letter is not present in the string?',
  opts: distinct([ic('-1'), ic('0'), ic('null'), 'The method throws an exception']),
  sol: `indexOf never throws an exception for an absent character: it returns -1. For example ${ic('"Hyderabad".indexOf("z")')} gives ${ev('"Hyderabad".indexOf("z")')}. Zero would mean the character is at the first position.`,
}));
const cChd = 'String city = "Chandigarh";';
Q('m_idx_from', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The search for a character starts at index 3 here. What is printed by the code below?\n\n${F(code(cChd, "System.out.println(city.indexOf('h', 3));"))}`,
  opts: distinct([ic(ev("city.indexOf('h', 3)", cChd)), ic(ev("city.indexOf('h')", cChd)), ic(ev("city.indexOf('a', 3)", cChd)), ic(ev("city.indexOf('n', 3)", cChd))]),
  sol: `indexOf(ch, from) starts the search at index from. The first h of Chandigarh is at index 1, but the search begins at index 3, so the next h, at index ${ev("city.indexOf('h', 3)", cChd)}, is found. ${ev("city.indexOf('h')", cChd)} is the answer of indexOf('h') without the starting index.`,
}));
Q('m_immut_out', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A student writes the code below. What does it display?\n\n${F(cImmut)}`,
  opts: distinct([ic(out(cImmut)), ic('PUNE'), ic('Pune'), 'Nothing is displayed']),
  sol: 'A String object cannot be changed. toUpperCase() builds and returns a new String, but here the returned value is thrown away, so s still refers to the original text. To use the upper-case text it must be stored: s = s.toUpperCase();',
}));
Q('m_trim_concat', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The code below shows the result between square brackets. What does it display?\n\n${F(code('String r = "  Asha ".trim().concat("Devi");', 'System.out.println("[" + r + "]");'))}`,
  opts: distinct(['"  Asha ".trim().concat("Devi")', '"  Asha ".concat("Devi")', '"  Asha ".trim().concat(" Devi")', '"  Asha ".trim()'].map((e) => ic(ev(`"[" + ${e} + "]"`)))),
  sol: `trim() removes the spaces at the beginning and the end only, giving Asha, and concat("Devi") joins the new text directly with no space, so the display is ${ic(ev('"[" + "  Asha ".trim().concat("Devi") + "]"'))}. Without trim() the leading spaces and the trailing space stay (${ic(ev('"[" + "  Asha ".concat("Devi") + "]"'))}), and concat(" Devi") would add a space.`,
}));
const cKerala = code('String s = "Kerala";', 'System.out.println(s.charAt(s.length()));');
Q('m_exc', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `The program below compiles. What happens when it runs?\n\n${F(cKerala)}`,
  opts: distinct([`It throws ${ic(exName(rtErr(cKerala)))}`, `It throws ${ic('NullPointerException')}`, `It throws ${ic('ArithmeticException')}`, 'It displays a blank space']),
  sol: `Kerala has 6 characters with indexes 0 to 5, so index s.length() (6) is outside the string. Java reports "${rtErr(cKerala)}". The last valid index is always length() - 1.`,
}));

Q('ar_immut', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'After the statement `s.concat("Ltd");` alone, the String s still holds its old text.',
  r: 'String objects are immutable, so a String method returns a new String instead of changing the object.',
  sol: `The result of concat is a new String that the statement does not store. Running ${ic('String s = "Mehta"; s.concat("Ltd"); System.out.println(s);')} shows ${ic(out(code('String s = "Mehta";', 's.concat("Ltd");', 'System.out.println(s);')))}, so (A) is true. (R) is true and is the reason for it.`,
}));
const cAbsent = 'String s = "Madurai";';
Q('tf_len_brackets', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'True or false? The number of characters of a String variable s can be found with the expression s.length, written without brackets.',
  sol: `length is a method of String, so the brackets are needed: s.length(). Without them javac reports "${mustFail(code(cAbsent, 'System.out.println(s.length);'))}".`,
}));
Q('fb_idx', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The String method ___ returns the position of the first occurrence of a character, and it returns ___ when the character is not found.',
  acc: [['indexOf', 'indexof'], ['-1', 'minus one', '- 1']],
  sol: 'indexOf gives the position of the first occurrence (lastIndexOf the last one). When the character or substring is absent the result is -1.',
}));
const K = 'String s = "Kalyani";';Q('mt_methods', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'The String s is "Kalyani". Match each expression with its value.',
  pairs: [
    [ic('s.length()'), ic(ev('s.length()', 'String s = "Kalyani";'))],
    [ic('s.charAt(2)'), ic(ev('s.charAt(2)', 'String s = "Kalyani";'))],
    [ic("s.indexOf('a')"), ic(ev("s.indexOf('a')", 'String s = "Kalyani";'))],
    [ic("s.lastIndexOf('a')"), ic(ev("s.lastIndexOf('a')", 'String s = "Kalyani";'))],
  ],
  sol: `The characters of Kalyani are K(0) a(1) l(2) y(3) a(4) n(5) i(6): ${ev('s.length()', K)} characters, charAt(2) is ${ev('s.charAt(2)', K)}, the first a is at index ${ev("s.indexOf('a')", K)} and the last a is at index ${ev("s.lastIndexOf('a')", K)}.`,
}));

// ---- code output, t01
Q('co_len_char', co({
  pre: 'A museum clerk stores a gallery name in a String variable and examines it with the code below. Write the exact output.',
  t: 1, d: 3, c: 'application',
  code: cLenChar,
  sol: 'Hampi Ruins has 11 characters including the space, so length() is 11 and charAt(n - 1) is the last character. charAt(0) is H and charAt(6) is R; adding "" between them makes the + a String join, not a number addition.',
  scheme: [['First two lines (length and last character)', 1], ['Third line: the two characters joined', 1]],
}));
Q('co_idx', co({
  pre: 'A juice stall board is stored in a String and searched with the code below. Write the exact output.',
  t: 1, d: 3, c: 'application',
  code: cIdx,
  sol: 'indexOf("mango") gives the first position and lastIndexOf("mango") the last one. indexOf(\'o\', 3) searches from index 3 onwards, and a word that is absent gives -1.',
  scheme: [['First two lines correct', 1], ['Last two lines correct', 1]],
}));
Q('co_immut', co({
  pre: 'Two Strings are prepared and joined by the code below. Write the exact output.',
  t: 1, d: 3, c: 'application',
  code: cImmut2,
  sol: 'toUpperCase() returns a new String, which is stored in b. The value of a.concat(" city") is not stored anywhere, so a keeps its original text.',
}));
Q('co_err_charat', co({
  pre: 'A loop meant to display every character of a vehicle tag is written below. State the kind of error that occurs and its message.',
  t: 1, d: 3, c: 'understanding', error: true,
  code: cOutOfRange,
  sol: `The condition i <= tag.length() lets i reach 4, but the valid indexes of TN07 are 0 to 3. The loop first prints ${ic(rtOut(cOutOfRange).trim())} and then the call tag.charAt(4) throws the exception. The condition should be i < tag.length().`,
  scheme: [['Run-time error with the exception name and message', 1], ['Cause: the index is equal to the length (the condition should be i < length)', 1]],
}));

// ================================================================ t02 comparison methods
Q('m_equals_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which String method gives true only when both strings contain exactly the same characters, letter case included?',
  opts: distinct([ic('equals()'), ic('equalsIgnoreCase()'), ic('compareTo()'), ic('startsWith()')]),
  sol: `equals() is case-sensitive: ${ic('"Goa".equals("goa")')} gives ${ev('"Goa".equals("goa")')}. equalsIgnoreCase() ignores case, compareTo() returns an int and startsWith() tests only the beginning.`,
}));
Q('m_cmp_type', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What is the data type of the value returned by the compareTo() method of the String class?',
  opts: distinct([ic('int'), ic('boolean'), ic('String'), ic('char')]),
  sol: `compareTo() returns an integer: zero, a negative number or a positive number. That is why ${ic('boolean same = a.compareTo(b);')} is rejected by javac with "${mustFail(cCmpBool)}".`,
}));
Q('m_cmp_value', mcq({
  t: 2, d: 3, c: 'application',
  stem: `What value does the following statement display?\n\n${F('System.out.println("apple".compareTo("apricot"));')}`,
  opts: distinct(['"apple".compareTo("apricot")', '"apricot".compareTo("apple")', '"apple".compareTo("applesauce")', '"Apple".compareTo("apple")'].map((e) => ic(ev(e)))),
  sol: `The strings first differ at index 2: p (112) in apple and r (114) in apricot. compareTo returns the difference of these character codes, 112 - 114 = ${ev('"apple".compareTo("apricot")')}. Reversing the strings gives ${ev('"apricot".compareTo("apple")')}; ${ev('"apple".compareTo("applesauce")')} is the length difference when one string is the start of the other; ${ev('"Apple".compareTo("apple")')} is the difference between A (65) and a (97).`,
}));
Q('m_prefix_cmp', mcq({
  t: 2, d: 3, c: 'application',
  stem: `What does the statement below display?\n\n${F('System.out.println("Kanpur".compareTo("Kan"));')}`,
  opts: distinct(['"Kanpur".compareTo("Kan")', '"Kan".compareTo("Kanpur")', '"Kanpur".compareTo("Kanpur")', '"Kanpur".compareTo("kan")'].map((e) => ic(ev(e)))),
  sol: `The shorter string Kan is the beginning of Kanpur, so no character differs and compareTo returns the difference of the lengths, 6 - 3 = ${ev('"Kanpur".compareTo("Kan")')}. The reversed call gives ${ev('"Kan".compareTo("Kanpur")')}, equal strings give ${ev('"Kanpur".compareTo("Kanpur")')}, and ${ev('"Kanpur".compareTo("kan")')} comes from comparing K (75) with k (107).`,
}));
Q('m_ignore_true', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following expressions gives true?',
  opts: distinct(['"Goa".equalsIgnoreCase("GOA")', '"Goa".equals("GOA")', '"Goa".compareTo("GOA") == 0', '"Goa".startsWith("GO")'].map(ic)),
  sol: `${ic('"Goa".equalsIgnoreCase("GOA")')} is ${ev('"Goa".equalsIgnoreCase("GOA")')} because case is ignored. ${ic('"Goa".equals("GOA")')} is ${ev('"Goa".equals("GOA")')} and ${ic('"Goa".compareTo("GOA") == 0')} is ${ev('"Goa".compareTo("GOA") == 0')} because o and O are different characters; ${ic('"Goa".startsWith("GO")')} is ${ev('"Goa".startsWith("GO")')}, as the second letter is a lower-case o.`,
}));
const cStart = 'String s = "Rajkot";';
const stEnd = (a, b) => code(cStart, `System.out.println(s.startsWith("${a}") + " " + s.endsWith("${b}"));`);
Q('m_startswith', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Match the exact letters carefully. What does the code below display?\n\n${F(stEnd('raj', 'kot'))}`,
  opts: distinct([ic(out(stEnd('raj', 'kot'))), ic(out(stEnd('Raj', 'kot'))), ic(out(stEnd('Raj', 'kota'))), ic(out(stEnd('raj', 'kota')))]),
  sol: `startsWith and endsWith are case-sensitive. "Rajkot" does not start with raj (small r) but it ends with kot, so the display is ${ic(out(stEnd('raj', 'kot')))}. Each of the other options is the result of changing the case of the first prefix or the last letters of the suffix.`,
}));
const cRefMcq = code('String a = "tea";', 'String b = "t".concat("ea");', 'System.out.println((a == b) + " " + a.equals(b));');
Q('m_ref', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `The second String below is built at run time by concat. What does the code display?\n\n${F(cRefMcq)}`,
  opts: distinct([ic(out(cRefMcq)), ic('true true'), ic('true false'), ic('false false')]),
  sol: 'The operator == compares references, that is, whether both variables point to the same object. concat builds a new object, so a and b are different objects and == gives false, while equals() compares the characters, which are the same, and gives true.',
}));
Q('ar_cmp', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The statement `"apple".compareTo("apricot")` returns a positive value.',
  r: 'compareTo returns the difference of the character codes at the first position where the two strings differ.',
  sol: `The first difference is p (112) against r (114), so the value is ${ev('"apple".compareTo("apricot")')}, a negative number: (A) is false. (R) states the rule correctly, so (R) is true.`,
}));
Q('tf_cmp_zero', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? For two Strings with exactly the same characters, the method compareTo returns 0.',
  sol: `compareTo returns 0 only when the strings are identical in length and in every character: ${ic('"Lucknow".compareTo("Lucknow")')} gives ${ev('"Lucknow".compareTo("Lucknow")')}.`,
}));
Q('fb_cmp_ic', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The method ___ compares two strings alphabetically without considering the case of the letters and returns an int.',
  acc: [['compareToIgnoreCase', 'comparetoignorecase']],
  sol: `compareToIgnoreCase returns 0 for two strings that differ only in case: ${ic('"INDORE".compareToIgnoreCase("indore")')} gives ${ev('"INDORE".compareToIgnoreCase("indore")')}.`,
}));

Q('co_cmp1', co({
  pre: 'Two cousins, Meena and Meera, are placed in order of name by the code below. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: cCmp1,
  sol: 'Meena and Meera first differ at index 3: n (110) and r (114). So the first call gives 110 - 114 and the second the opposite value. compareToIgnoreCase treats MEENA and Meena as the same text and returns 0.',
  scheme: [['First two lines (signs and values)', 1], ['Third line', 1]],
}));
Q('co_ref', co({
  pre: 'A sweet shop builds the same product code twice at run time and compares it in two ways. Write the exact output.',
  t: 2, d: 4, c: 'analysis',
  code: cRef,
  sol: 'concat creates a new String object every time, so p and q are two different objects: == compares the references and gives false. equals() compares the characters of the two Strings and gives true.',
}));
Q('co_err_cmp', co({
  pre: 'A student wants to store whether two names are equal. State the error that the compiler reports for the code below.',
  t: 2, d: 3, c: 'understanding', error: true,
  code: cCmpBool,
  sol: 'compareTo returns an int, which cannot be stored in a boolean variable. The correct statement is boolean same = a.equals(b);',
  scheme: [['Compile-time error with the correct line', 1], ['Cause: compareTo returns int, not boolean', 1]],
}));

// ---- short answers, t01 and t02
Q('s_immutable', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is meant by saying that a String is immutable? Show with a short example how the methods of String behave because of it.',
  model: `A String object cannot be changed after it is created. Every method such as toUpperCase() or concat() leaves the original object as it is and **returns a new String**.\n\n${F(cImmut3)}\n\nHere city still holds ${ic(out(cImmut3).split(' ')[0])} while big holds ${ic(out(cImmut3).split(' ')[1])}. To keep a changed text the result must be stored in a variable.`,
  sol: 'One mark for the meaning of immutable and one mark for the example showing that the original is unchanged and a new String is returned.',
  scheme: [['Meaning: the object cannot be modified; methods return a new String', 1], ['Example in which the original variable is unchanged', 1]],
}));
const cLoopChar = code('String word = "Sita";', 'for (int i = 0; i < word.length(); i++)', '    System.out.println(word.charAt(i));');
Q('s_trav', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Write a loop in Java to display every character of a String variable word on a separate line.',
  model: `${F(cLoopChar)}\n\nFor word = "Sita" the output is ${ic(out(cLoopChar).split('\n').join(' / '))}. The loop variable runs from 0 to length() - 1 and charAt(i) picks the character.`,
  sol: 'A loop from index 0 while i < word.length() and the use of charAt(i) in the output statement.',
  scheme: [['Loop runs from 0 to word.length() - 1', 1], ['charAt(i) displayed on its own line', 1]],
}));
Q('s_idx', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between the methods indexOf and lastIndexOf of the String class, with an example. What do both return when the searched character is absent?',
  model: `indexOf gives the position of the **first** occurrence and lastIndexOf the position of the **last** occurrence of a character or substring. For String s = "Hyderabad", ${ic("s.indexOf('d')")} is ${ev("s.indexOf('d')", cHyd)} and ${ic("s.lastIndexOf('d')")} is ${ev("s.lastIndexOf('d')", cHyd)}. If the character is absent, both return ${ev("s.indexOf('z')", cHyd)}.`,
  sol: 'One mark for the difference with an example and one mark for the value -1 when the character is absent.',
  scheme: [['First occurrence against last occurrence, with an example', 1], ['-1 when not found', 1]],
}));

// ---- short answers, t02
Q('s_eq_vs', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'Distinguish between the equals() method and the == operator when they are used with two String objects.',
  model: `**equals()** compares the **characters** of the two Strings and returns true when they are the same (it is case-sensitive). **==** compares the **references**: it is true only when both variables point to the same object.\n\n${F(cRef2)}\n\nThe two Strings m and n are built at run time: ${ic('m == n')} gives ${out(cRef2).split('\n')[0]} but ${ic('m.equals(n)')} gives ${out(cRef2).split('\n')[1]}.`,
  sol: 'One mark for the working of equals() (contents) and one for the == operator (references), with the example.',
  scheme: [['equals() compares the contents of the Strings', 1], ['== compares references (same object); example', 1]],
}));
Q('s_cmp_pred', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'State the value returned by each of the following calls and explain how it is obtained:\n\n(a) `"Delhi".compareTo("Delhi Cantt")`\n\n(b) `"Zebra".compareTo("apple")`',
  model: `(a) ${ev('"Delhi".compareTo("Delhi Cantt")')}. Delhi is the beginning of Delhi Cantt, so the length difference 5 - 11 is returned.\n\n(b) ${ev('"Zebra".compareTo("apple")')}. The first characters differ: Z has code 90 and a has code 97, so 90 - 97 is returned.`,
  sol: 'One mark for each value with its reason.',
  scheme: [['(a) length difference when one string begins the other', 1], ['(b) difference of the first differing characters (capital letters come before small letters)', 1]],
}));
const cEqIc = code('String entered = "mumbai";', 'if (entered.equalsIgnoreCase("MUMBAI"))', '    System.out.println("City matched");');
Q('s_ignore', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Write a statement in Java that displays City matched when the String entered holds the word MUMBAI in any combination of upper and lower case letters.',
  model: `${F(cEqIc)}\n\nOutput: ${ic(out(cEqIc))}. equalsIgnoreCase returns true whatever the case of the letters, so no case conversion is needed.`,
  sol: 'The method equalsIgnoreCase with the argument MUMBAI inside an if statement, and the output statement.',
  scheme: [['Condition with equalsIgnoreCase and the correct String', 1], ['if statement with the display statement', 1]],
}));
