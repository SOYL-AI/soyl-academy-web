// ICSE 10 Computer Applications, ch13: String Handling. Topics t03 (substring, replace, valueOf) and t04 (programs that process characters).
// Every scenario is imagined for SOYL. Every output, value or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, rtErr, rtOut, expect } from './q_util.mjs';

// ---- shared code used by several items and by the slides
export const cRevPrepend = code('String s = "Priya";', 'String r = "";', 'for (int i = 0; i < s.length(); i++)', '    r = s.charAt(i) + r;', 'System.out.println(r);');
export const cToggle = code(
  'String s = "Oct 2026 Fest";',
  'String t = "";',
  'for (int i = 0; i < s.length(); i++) {',
  '    char c = s.charAt(i);',
  '    if (Character.isUpperCase(c))',
  '        t = t + Character.toLowerCase(c);',
  '    else if (Character.isLowerCase(c))',
  '        t = t + Character.toUpperCase(c);',
  '    else',
  '        t = t + c;',
  '}',
  'System.out.println(t);',
);
export const cSubRef = code('String ref = "SOY-2026-IND-045";', 'System.out.println(ref.substring(4, 8));', 'System.out.println(ref.substring(9));', 'System.out.println(ref.substring(0, 3) + ref.substring(12));');
export const cRepVal = code(
  'String slogan = "Go green, grow green";',
  "System.out.println(slogan.replace('g', 'G'));",
  'System.out.println(slogan.replace("green", "fresh"));',
  'String t = String.valueOf(45) + String.valueOf(2.5) + String.valueOf(true) + String.valueOf(\'Z\');',
  'System.out.println(t);',
  'System.out.println(t.length());',
);
export const cSubErr = code('String batch = "Batch-Aryan";', 'String name = batch.substring(6, 3);', 'System.out.println(name);');
export const cCountVowels = (s) => code(
  `String s = "${s}";`,
  'int v = 0;',
  'for (int i = 0; i < s.length(); i++) {',
  '    char c = Character.toUpperCase(s.charAt(i));',
  "    if (c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U')",
  '        v++;',
  '}',
  'System.out.println(v);',
);
export const cInitials = code(
  'String s = "Sunrise Public School";',
  'String init = "" + s.charAt(0);',
  'for (int i = 1; i < s.length(); i++)',
  "    if (s.charAt(i - 1) == ' ')",
  '        init = init + s.charAt(i);',
  'System.out.println(init);',
);
export const cWords = (s) => code(`String s = "${s}";`, 'int w = 1;', 'for (int i = 0; i < s.length(); i++)', "    if (s.charAt(i) == ' ')", '        w++;', 'System.out.println(w);');
export const pigFrag = (w, tail) => code(`String w = "${w}";`, 'int p = 0;', 'while ("AEIOU".indexOf(w.charAt(p)) == -1)', '    p++;', `System.out.println(${tail});`);
const V = 'String v = "Vijayawada";';

// ================================================================ t03 substring, replace, valueOf
const cViz = 'String town = "Visakhapatnam";';
Q('m_sub_from', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `One argument only is given to substring. Find the output of the code below.\n\n${F(code(cViz, 'System.out.println(town.substring(5));'))}`,
  opts: distinct(['town.substring(5)', 'town.substring(4)', 'town.substring(0, 5)', 'town.substring(6)'].map((e) => ic(ev(e, cViz)))),
  sol: `substring(5) returns the characters from index 5 to the end of the string. The characters of Visakhapatnam are V(0) i(1) s(2) a(3) k(4) h(5) a(6) p(7) a(8) t(9) n(10) a(11) m(12), so the result is ${ic(ev('town.substring(5)', cViz))}. Starting one place earlier gives ${ev('town.substring(4)', cViz)}, the first five characters are ${ev('town.substring(0, 5)', cViz)}, and starting one place later gives ${ev('town.substring(6)', cViz)}.`,
}));
const cCoim = 'String s = "Coimbatore";';
Q('m_sub_range', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Two arguments are given to substring. Find what the code below prints.\n\n${F(code(cCoim, 'System.out.println(s.substring(2, 6));'))}`,
  opts: distinct(['s.substring(2, 6)', 's.substring(2, 5)', 's.substring(3, 6)', 's.substring(2, 7)'].map((e) => ic(ev(e, cCoim)))),
  sol: `substring(2, 6) takes the characters from index 2 up to index 5; the character at index 6 is not included. In Coimbatore the characters at indexes 2, 3, 4 and 5 are ${ic(ev('s.substring(2, 6)', cCoim))}. ${ev('s.substring(2, 5)', cCoim)} stops one place early, ${ev('s.substring(3, 6)', cCoim)} starts one place late and ${ev('s.substring(2, 7)', cCoim)} runs one place too far.`,
}));
Q('m_sub_end', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the call s.substring(begin, end), which characters of s form the result?',
  opts: distinct(['The characters from index begin up to index end - 1', 'The characters from index begin up to index end', 'The characters from index begin + 1 up to index end', 'Only the characters at index begin and at index end']),
  sol: `The begin index is included and the end index is excluded, so the result has end - begin characters. For example ${ic('"Mysuru".substring(1, 4)')} gives ${ev('"Mysuru".substring(1, 4)')}, which has ${ev('"Mysuru".substring(1, 4).length()')} characters.`,
}));
const cJal = 'String s = "Jalandhar";';
Q('m_replace', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Every matching character is changed by replace. What does the code below show?\n\n${F(code(cJal, "System.out.println(s.replace('a', 'o'));"))}`,
  opts: distinct([ic(ev("s.replace('a', 'o')", cJal)), ic(ev("s.replace('l', 'o')", cJal)), ic(ev("s.replace('J', 'o')", cJal)), ic(ev("s.replace('A', 'o')", cJal))]),
  sol: `replace(old, new) replaces every occurrence of the old character, and Jalandhar has the letter a three times, so the result is ${ic(ev("s.replace('a', 'o')", cJal))}. The other options replace a different letter (${ev("s.replace('l', 'o')", cJal)} and ${ev("s.replace('J', 'o')", cJal)}) or the capital A, which is not present, so that the text stays ${ev("s.replace('A', 'o')", cJal)}.`,
}));
const cBad = code('int n = 4500;', 'System.out.println(n.length());');
Q('m_valueof_digits', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A program stores a quantity in the int variable n and wants to know how many digits it has. Which expression gives the number of digits?',
  opts: distinct([ic('String.valueOf(n).length()'), ic('n.length()'), ic('n.size()'), ic('length(n)')]),
  sol: `An int is a primitive value and has no methods. String.valueOf(n) converts it to a String, whose length() counts the digits: for n = 4500 the value is ${ev('String.valueOf(n).length()', 'int n = 4500;')}. Writing n.length() is a compile-time error: "${mustFail(cBad)}".`,
}));
Q('ar_sub_end', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The call `"Mysuru".substring(2, 5)` returns a String of three characters.',
  r: 'In substring(begin, end) the character at the index end is included in the result.',
  sol: `The result is ${ic(ev('"Mysuru".substring(2, 5)'))}, which has ${ev('"Mysuru".substring(2, 5).length()')} characters, so (A) is true. The end index is excluded, so (R) is false.`,
}));
Q('ar_valueof', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The expression `String.valueOf(1234).length()` gives 4.',
  r: 'valueOf is a static method of the String class.',
  sol: `The value is ${ev('String.valueOf(1234).length()')} because the converted text 1234 has four characters, so (A) is true. (R) is also true, but it only says how the method is called; it does not explain why the length is 4.`,
}));
Q('tf_valueof', tf({
  t: 3, d: 3, c: 'application', ans: false,
  stem: 'True or false? The expression String.valueOf(7) + String.valueOf(7) gives the int value 14.',
  sol: `valueOf converts each number to a String, and + joins two Strings, so the value is the String ${ic(ev('String.valueOf(7) + String.valueOf(7)'))}, not the int 14.`,
}));
Q('fb_sub', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The call s.substring(2, 6) returns the characters from index ___ to index ___ of the String s.',
  acc: [['2', 'two'], ['5', 'five']],
  sol: 'The begin index 2 is included, and the end index 6 is excluded, so the last character taken is the one at index 5.',
}));
Q('mt_sub', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'The String v is "Vijayawada". Match each expression with its value.',
  pairs: [
    [ic('v.substring(6)'), ic(ev('v.substring(6)', V))],
    [ic('v.substring(0, 3)'), ic(ev('v.substring(0, 3)', V))],
    [ic("v.replace('a', 'o')"), ic(ev("v.replace('a', 'o')", V))],
    [ic('String.valueOf(4.5)'), ic(ev('String.valueOf(4.5)'))],
  ],
  sol: 'substring(6) takes everything from index 6, substring(0, 3) the first three characters, replace changes every letter a, and valueOf gives the text of the number.',
}));

Q('co_sub', co({
  pre: 'A snack stall issues reference tokens and splits one of them with the code below. Write the exact output.',
  t: 3, d: 3, c: 'application',
  code: cSubRef,
  sol: 'Indexes in SOY-2026-IND-045: SOY is 0 to 2, 2026 is 4 to 7, IND is 9 to 11 and 045 is 13 to 15. substring(4, 8) stops before index 8, substring(9) goes to the end, and the third line joins the first three characters with the part from index 12.',
  scheme: [['First two lines', 1], ['Third line', 1]],
}));
Q('co_repval', co({
  pre: 'A school poster is edited with the replace and valueOf methods in the code below. Write the exact output.',
  t: 3, d: 4, c: 'application',
  code: cRepVal,
  sol: 'The first replace changes the character g to G (the capital G of Go is already capital), the second replaces the whole word. valueOf turns each value into text: 45, 2.5, true and Z are joined into one String of 2 + 3 + 4 + 1 characters.',
  scheme: [['Both replace lines', 1], ['The joined String and its length', 1]],
}));
Q('co_err_substr', co({
  pre: 'A student tries to cut a name out of a String by giving the end index before the begin index, as in the code below. State the error and its message.',
  t: 3, d: 4, c: 'understanding', error: true,
  code: cSubErr,
  sol: `The begin index 6 is greater than the end index 3, so substring throws an exception while the program runs (the code compiles): "${rtErr(cSubErr)}". The begin index must not be greater than the end index.`,
  scheme: [['Run-time error with the exception name and message', 1], ['Cause: begin index greater than end index', 1]],
}));

Q('s_sub', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'Explain the two forms of the substring method of the String class, with one example of each.',
  model: `**substring(begin)** returns the characters from index begin to the end of the String: ${ic('"Vijayawada".substring(6)')} gives ${ev('"Vijayawada".substring(6)')}.\n\n**substring(begin, end)** returns the characters from index begin up to index end - 1 (the end index is excluded): ${ic('"Vijayawada".substring(0, 3)')} gives ${ev('"Vijayawada".substring(0, 3)')}.`,
  sol: 'One mark for each form with a correct example.',
  scheme: [['substring(begin): from begin to the end, with example', 1], ['substring(begin, end): end index excluded, with example', 1]],
}));
const cRep = code('String s = "banana";', "String t = s.replace('a', '*');", 'int n = 1250;', 'String d = String.valueOf(n);', 'System.out.println(t + " " + d.length());');
Q('s_repl', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'A String s holds the word banana. Write Java statements to store in t the text obtained by replacing every letter a of s by *, and to convert the int value 1250 to a String.',
  model: `${F(cRep)}\n\nOutput: ${ic(out(cRep))}. replace(char, char) changes every occurrence and String.valueOf(int) converts the number to text; the length 4 shows that d is a String of four digits.`,
  sol: 'One mark for the replace statement and one for the conversion with String.valueOf.',
  scheme: [["Use of replace('a', '*') and the result stored in t", 1], ['Use of String.valueOf(1250)', 1]],
}));

// ================================================================ t04 programs that process characters
const cLevel = 'String s = "Level";\nString rev = "";\nfor (int i = s.length() - 1; i >= 0; i--)\n    rev = rev + s.charAt(i);';
Q('m_pal_cond', mcq({
  t: 4, d: 3, c: 'application',
  stem: `The code below builds the reverse of the String s in rev. Which condition should be used to report that the word is a palindrome when the case of the letters is to be ignored?\n\n${F(cLevel)}`,
  opts: distinct([ic('s.equalsIgnoreCase(rev)'), ic('s.equals(rev)'), ic('s == rev'), ic('s.compareTo(rev) > 0')]),
  sol: `For s = "Level" the reverse is ${ic(ev('rev', cLevel))}. ${ic('s.equalsIgnoreCase(rev)')} is ${ev('s.equalsIgnoreCase(rev)', cLevel)}. ${ic('s.equals(rev)')} is ${ev('s.equals(rev)', cLevel)} because L and l differ, ${ic('s == rev')} is ${ev('s == rev', cLevel)} because it compares references, and ${ic('s.compareTo(rev) > 0')} is ${ev('s.compareTo(rev) > 0', cLevel)} (the value is ${ev('s.compareTo(rev)', cLevel)}).`,
}));
Q('m_pig_frag', mcq({
  t: 4, d: 4, c: 'application',
  stem: `The code below converts a word to a pig Latin form: the letters before the first vowel move to the end and AY is added. What does it display?\n\n${F(pigFrag('CHAIR', 'w.substring(p) + w.substring(0, p) + "AY"'))}`,
  opts: distinct([ic(out(pigFrag('CHAIR', 'w.substring(p) + w.substring(0, p) + "AY"'))), ic(out(pigFrag('CHAIR', 'w.substring(0, p) + w.substring(p) + "AY"'))), ic(out(pigFrag('CHAIR', 'w.substring(p) + "AY"'))), ic(out(pigFrag('CHAIR', 'w.substring(p) + w.substring(0, p)')))]),
  sol: `The loop stops at the first vowel, so p becomes ${out(pigFrag('CHAIR', 'p'))}. substring(p) is ${ic(out(pigFrag('CHAIR', 'w.substring(p)')))}, substring(0, p) is ${ic(out(pigFrag('CHAIR', 'w.substring(0, p)')))} and AY is added at the end. The other options keep the original order of the letters, forget the moved letters or forget the AY.`,
}));
const cTog = code("char c = 'g';", 'c = (char) (c - 32);', 'System.out.println(c);');
Q('m_toggle', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A single letter is changed using its character code. What does the code below display?\n\n${F(cTog)}`,
  opts: distinct([ic(out(cTog)), ic(ev("'g' - 32")), ic('g'), 'A compile-time error is reported']),
  sol: `The code of g is ${ev("(int) 'g'")} and every small letter is 32 above its capital, so c - 32 is the code of ${ev("(char) ('g' - 32)")}. The cast (char) turns the int result back into a character; without it the program would not compile, and printing the int itself would give ${ev("'g' - 32")}.`,
}));
const wText = 'Sun rises in the east';
Q('m_count_words', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A sentence has single spaces between words and no space at either end. What does the code below display?\n\n${F(cWords(wText))}`,
  opts: distinct([ic(out(cWords(wText))), ic(out(cWords(wText).replace('int w = 1', 'int w = 0'))), ic(ev('s.length()', `String s = "${wText}";`)), ic(out(cWords(wText).replace('int w = 1', 'int w = 2')))]),
  sol: `The loop adds 1 for every space. There are ${out(cWords(wText).replace('int w = 1', 'int w = 0'))} spaces, and w starts at 1 because the last word has no space after it, so the number of words is ${out(cWords(wText))}. ${out(cWords(wText).replace('int w = 1', 'int w = 0'))} is the number of spaces and ${ev('s.length()', `String s = "${wText}";`)} the number of characters.`,
}));
Q('ord_pal', ord({
  t: 4, d: 2, c: 'understanding',
  stem: 'Arrange the steps of a program that checks whether a word is a palindrome (the case of the letters is ignored) in the correct order.',
  items: ['Accept the word', 'Set the reverse to an empty String', 'Add the characters of the word to the reverse, from the last one to the first', 'Compare the word with its reverse, ignoring the case', 'Display whether the word is a palindrome'],
  sol: `The reverse can be built only after it has been started as an empty String, and it must be complete before the comparison. For Rotor the reverse is ${ic(ev('rev', 'String w = "Rotor";\nString rev = "";\nfor (int i = w.length() - 1; i >= 0; i--)\n    rev = rev + w.charAt(i);'))} and equalsIgnoreCase gives true.`,
}));

Q('co_rev', co({
  pre: 'A name-plate painter writes a name backwards using the code below. Write the exact output.',
  t: 4, d: 3, c: 'application',
  code: cRevPrepend,
  sol: 'Every character is joined in front of the text built so far (s.charAt(i) + r), so the first character ends up last. P, then iP, then riP, then yriP and finally ayriP; the capital P is at the end.',
}));
Q('co_case', co({
  pre: 'A poster title is changed by the case-toggling loop below. Write the exact output.',
  t: 4, d: 4, c: 'application',
  code: cToggle,
  sol: 'Each upper-case letter becomes lower case and each lower-case letter becomes upper case. The space and the digits are neither, so they are copied unchanged by the last else.',
}));

Q('s_count_vowels', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Write Java statements to count the vowels (a, e, i, o, u in upper or lower case) in a String s.',
  model: `${F(cCountVowels('Education Board'))}\n\nFor Education Board the output is ${ic(out(cCountVowels('Education Board')))}. Every character is converted to upper case so that only five letters have to be tested.`,
  sol: 'A loop over all the characters with charAt, and a condition for the five vowels that increases a counter.',
  scheme: [['Loop from 0 to length() - 1 using charAt', 1], ['Vowel condition (case handled) and counter increment', 1]],
}));
Q('s_first_letters', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'A sentence is stored in a String s, with a single space between the words. Write Java statements to display a new String made of the first letter of every word.',
  model: `${F(cInitials)}\n\nOutput: ${ic(out(cInitials))}. The first character is always the start of a word, and after that a character starts a word when the character before it is a space.`,
  sol: 'The first character is taken, then every character that follows a space is added to a new String.',
  scheme: [['First letter taken and the loop with the test of the previous character for a space', 1], ['New String built by joining the letters and displayed', 1]],
}));
