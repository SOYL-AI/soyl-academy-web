// CBSE 11 Computer Science, ch05 Strings — question bank. Every program, scenario and data value is written by SOYL
// (imagined people, shops and events); no textbook, NCERT or board-paper program is reused. Every output, error,
// count and trace table stated anywhere is produced by running the program with runPy()/pyOut()/pyErr() in lib.mjs.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

/** A Python code fence. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
/** A plain output fence. */
export const O = (text) => '```text\n' + text + '\n```';
export const code = (...lines) => lines.join('\n');
export const ic = (s) => '`' + s + '`';
const outIc = (c, opts) => ic(pyOut(c, opts));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
export const rowsOf = (c, opts) => JSON.parse(pyOut(c, opts));
export const mdTable = (headers, rows) =>
  [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(String).join(' | ')} |`)].join('\n');
/** Value of a Python expression, printed as print() shows it. */
export const val = (expr) => pyOut(`print(${expr})`);
/** Value of a Python expression as repr() shows it (strings with quotes). */
export const rv = (expr) => pyOut(`print(repr(${expr}))`);
/** Python truth of an expression for several values of x, as "T F T". */
export const truths = (expr, xs) => pyOut(`print(" ".join("T" if (${expr}) else "F" for x in ${JSON.stringify(xs)}))`);
/** Output lines of a program, each split at spaces: the rows of a trace table. */
export const outRows = (src, opts) => pyOut(src, opts).split('\n').map((l) => l.split(' '));

// ================================================================ t01 objective items (single topic: t 1)
const asg = code('name = "Ravi"', 'name[0] = "J"');
if (!pyErr(asg).startsWith('TypeError')) throw new Error('assignment error');
Q('m_immutable', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Ravi stores his name with ${ic('name = "Ravi"')} and then runs the line ${ic('name[0] = "J"')}. What does Python do?`,
  opts: ['It stops with a TypeError, because a string cannot be changed in place', 'It changes name to Javi', 'It stops with an IndexError', 'It ignores the line and name stays Ravi'],
  sol: `A string is immutable, so item assignment is refused and Python reports ${ic(pyErr(asg))}. A new string has to be built instead.`,
}));
const negOpts = ['"MANGOES"[-3]', '"MANGOES"[3]', '"MANGOES"[-2]', '"MANGOES"[-5]'];
Q('m_neg_index', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Jaya keeps the word ${ic('s = "MANGOES"')}. Which character does ${ic('s[-3]')} give?`,
  opts: distinct(negOpts.map((e) => ic(rv(e)))),
  sol: `A negative index counts from the right end, where -1 is the last character: the characters from the right are ${val('" ".join("MANGOES"[::-1])')}, so the third from the right is ${rv('"MANGOES"[-3]')}.`,
}));
Q('m_slice_basic', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Pooja writes ${ic('t = "marigold"')}. What is the value of ${ic('t[2:6]')}?`,
  opts: distinct(['"marigold"[2:6]', '"marigold"[2:5]', '"marigold"[3:6]', '"marigold"[2:7]'].map((e) => ic(rv(e)))),
  sol: `The slice starts at index 2 and stops before index 6, so it holds the characters at indexes 2, 3, 4 and 5, which is ${rv('"marigold"[2:6]')}. Taking index 6 as well, or starting one place later, would give a different string.`,
}));
Q('m_slice_step', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `A nursery labels its plants using ${ic('p = "sunflower"')}. Which string does the slice ${ic('p[1::3]')} give?`,
  opts: distinct(['"sunflower"[1::3]', '"sunflower"[::3]', '"sunflower"[1:3]', '"sunflower"[2::3]'].map((e) => ic(rv(e)))),
  sol: `With an empty stop the slice runs to the end. It starts at index 1 and takes every third character (indexes 1, 4 and 7), giving ${rv('"sunflower"[1::3]')}.`,
}));
Q('m_slice_neg', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A word game uses ${ic('w = "pineapple"')}. What does ${ic('w[::-2]')} give?`,
  opts: distinct(['"pineapple"[::-2]', '"pineapple"[::2]', '"pineapple"[-2::-2]', '"pineapple"[::-1]'].map((e) => ic(rv(e)))),
  sol: `A negative step walks from the last character towards the first, taking every second one (indexes 8, 6, 4, 2 and 0), so the result is ${rv('"pineapple"[::-2]')}. A step of 2 would walk forwards instead.`,
}));
const lenS = '"  hot tea "';
Q('m_len', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Mohit stores ${ic('s = ' + lenS)}, which has spaces at both ends. What is the value of ${ic('len(s)')}?`,
  opts: distinct([val(`len(${lenS})`), val(`len(${lenS}.strip())`), val(`len(${lenS}.split())`), val(`len(${lenS}) - 1`)].map(ic)),
  sol: `len() counts every character, spaces included: two spaces, the seven characters of hot tea, and one more space make ${val(`len(${lenS})`)}. Stripping first would give ${val(`len(${lenS}.strip())`)}.`,
}));
Q('m_repeat', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Preeti prints a decorative border for a notice board by evaluating ${ic('"-=" * 3 + "-"')}. Which string forms the border?`,
  opts: distinct(['"-=" * 3 + "-"', '"-=" + "-" * 3', '("-=" + "-") * 3', '"-" + "-=" * 3'].map((e) => ic(rv(e)))),
  sol: `The repetition ${ic('*')} is carried out before the concatenation ${ic('+')}, so the string -= is repeated three times and one dash is joined to the end: ${rv('"-=" * 3 + "-"')}.`,
}));
const kol = ['"Kol" in s', '"KOL" in s', '"ata" not in s', '"ka" not in s'];
if (kol.map((e) => pyOut(`s = "Kolkata"\nprint(${e})`)).join() !== 'True,False,False,False') throw new Error('membership options');
Q('m_membership', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `With ${ic('s = "Kolkata"')}, which of these expressions has the value True?`,
  opts: kol.map(ic),
  sol: 'The test in is case sensitive and looks for the characters together, in order. Kol appears at the start of Kolkata. All capitals KOL do not appear, and ata and ka both do appear, so the not in forms are False.',
}));
Q('m_find_start', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `What does ${ic('"banana".find("an", 2)')} return?`,
  opts: distinct(['"banana".find("an", 2)', '"banana".find("an")', '"banana".find("an", 4)', '"banana".count("an")'].map((e) => ic(val(e)))),
  sol: `find() looks for the substring from the start index given, here 2, and returns the index where it is first found. The match at index 1 lies before the start, so the next match, at index ${val('"banana".find("an", 2)')}, is returned. Starting at 4 finds nothing and gives ${val('"banana".find("an", 4)')}.`,
}));
Q('m_count', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `Zarina uses ${ic('"banana".count("ana")')} in a spelling checker. What is its value?`,
  opts: distinct(['"banana".count("ana")', '"banana".count("a")', '"banana".count("ana") + 1', '"banana".count("xyz")'].map((e) => ic(val(e)))),
  sol: `count() counts matches that do not overlap. The first ana is at index 1; the search then continues after it, from index 4, where only na is left, so the count is ${val('"banana".count("ana")')}. Counting the overlapping match would give one more.`,
}));
Q('m_split_len', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A tuck-shop order is stored as ${ic('order = "tea,milk,,sugar"')}. What is the value of ${ic('len(order.split(","))')}?`,
  opts: distinct([val('len("tea,milk,,sugar".split(","))'), '3', '5', '1'].map(ic)),
  sol: `split(",") cuts at every comma and keeps the empty piece between the two consecutive commas, so there are ${val('len("tea,milk,,sugar".split(","))')} pieces: ${val('"tea,milk,,sugar".split(",")')}. The empty string counts as a piece.`,
}));
Q('m_join', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `What does ${ic('"/".join("2025")')} give?`,
  opts: distinct(['"/".join("2025")', '"/2/0/2/5"', '"2/0/2/5/"', '"2025"'].map((e) => ic(rv(e)))),
  sol: `join() puts the separator between the characters of the string it is given, never at either end: ${rv('"/".join("2025")')}. Every character of a string counts as a separate item.`,
}));
const replOrig = code('s = "tomato"', 's.replace("o", "a")', 'print(s)');
Q('m_replace_orig', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Nisha runs the program below. What does it print?\n\n${F(replOrig)}`,
  opts: distinct([outIc(replOrig), ic(val('"tomato".replace("o", "a")')), ic(val('"tomato".replace("o", "a", 1)')), ic('tomata')]),
  sol: 'replace() returns a new string and never changes the original, because strings are immutable. The result of the second line was not stored in any variable, so s still holds its first value.',
}));
const alp = ['"Class11"', '"hello world"', '"Python"', '""'];
if (alp.map((e) => pyOut(`print(${e}.isalpha())`)).join() !== 'False,False,True,False') throw new Error('isalpha options');
Q('m_isalpha', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'For which one of these strings does `isalpha()` return True?',
  opts: ['"Python"', '"Class11"', '"hello world"', '""'].map(ic),
  sol: 'isalpha() is True only when the string is not empty and every character is a letter. A digit, a space or an empty string makes it False.',
}));
Q('m_strip_len', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `Ajay stores ${ic('code = "**hello**"')}. What is the value of ${ic('len(code.strip())')}?`,
  opts: distinct([val('len("**hello**".strip())'), val('len("**hello**".strip("*"))'), '7', '8'].map(ic)),
  sol: `With no argument, strip() removes only whitespace, and the string has none, so nothing is removed and the length stays ${val('len("**hello**".strip())')}. Only strip("*") would remove the stars and leave ${val('len("**hello**".strip("*"))')} characters.`,
}));
const partQ = code('a, b, c = "user@mail@host".partition("@")', 'print(c)');
Q('m_partition', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Study the program, which splits an address at the first at sign. What does it print?\n\n${F(partQ)}`,
  opts: distinct([outIc(partQ), ic('mail'), ic('host'), ic('@')]),
  sol: 'partition() splits at the first occurrence of the separator only and gives three parts: the text before it, the separator itself, and everything after it, including any later at signs.',
}));
Q('m_title', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `What is the value of ${ic('"hELLO wORLD".capitalize()')}?`,
  opts: distinct(['"hELLO wORLD".capitalize()', '"hELLO wORLD".title()', '"hELLO wORLD".upper()', '"hELLO wORLD"'].map((e) => ic(rv(e)))),
  sol: `capitalize() makes the first character a capital and all the other characters small, for the whole string, giving ${rv('"hELLO wORLD".capitalize()')}. title() would start every word with a capital.`,
}));
const idxErr = 'print("Delhi"[5])';
Q('m_index_error', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The word Delhi has five characters. What happens when the statement `print("Delhi"[5])` is run?',
  opts: [ic(pyErr(idxErr)) + ' is reported', 'The letter i is printed', 'An empty string is printed', 'The number -1 is printed'],
  sol: `The valid indexes of a five-character string are 0 to 4 (or -5 to -1), so index 5 is outside the string and Python stops with ${ic(pyErr(idxErr))}.`,
}));
const fnameConds = ['fname.startswith("photo")', 'fname.endswith(".jpg")', 'fname.startswith("Photo")', 'fname.endswith("2024")'];
if (fnameConds.map((e) => pyOut(`fname = "photo_2024.jpeg"\nprint(${e})`)).join() !== 'True,False,False,False') throw new Error('startswith options');
Q('m_startswith', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'With `fname = "photo_2024.jpeg"`, which of these conditions is True?',
  opts: fnameConds.map(ic),
  sol: 'The file name does begin with the lower-case word photo. It does not end with .jpg (it ends with .jpeg) or with 2024, and startswith is case sensitive, so Photo with a capital P does not match.',
}));
const upLoop = code('s = "Hello World From Goa"', 'n = 0', 'for ch in s:', '    if ch.isupper():', '        n += 1', 'print(n)');
Q('m_upper_loop', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Rohan counts something in a school slogan with the program below. What does it print?\n\n${F(upLoop)}`,
  opts: distinct([outIc(upLoop), ic(val('sum(c.isalpha() for c in "Hello World From Goa")')), ic(val('len("Hello World From Goa")')), ic(val('"Hello World From Goa".count(" ")'))]),
  sol: 'The loop takes one character at a time, and n grows only for capital letters. The slogan has a capital at the start of each of its four words. The other counts belong to letters, all characters and spaces.',
}));
Q('m_traverse_count', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Aditi traverses ${ic('city = "Jamshedpur"')} with ${ic('for i in range(len(city)):')}. How many times does the body of the loop run?`,
  opts: distinct([val('len("Jamshedpur")'), val('len("Jamshedpur") - 1'), val('len("Jamshedpur") + 1'), '1'].map(ic)),
  sol: `len(city) is ${val('len("Jamshedpur")')}, so range(len(city)) gives the indexes 0 to ${val('len("Jamshedpur") - 1')} and the body runs once for each character. Counting the stop value or leaving out index 0 would be wrong.`,
}));
const catOpts = ['"Age: " + 15', '"Age: " + "15"', '"15" * 2', '"Age: " * 2'];
const catErr = pyErr(`print(${catOpts[0]})`);
if (!catErr.startsWith('TypeError') || catOpts.slice(1).some((e) => !val(e))) throw new Error('concat options');
Q('m_concat_type', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which one of these four expressions stops with an error when it is evaluated?',
  opts: catOpts.map(ic),
  sol: `The + operator cannot join a string and an integer, and Python reports ${ic(catErr)}. Joining two strings, and repeating a string by an integer, are both allowed.`,
}));
Q('m_slice_beyond', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'What does `print("lantern"[3:50])` display?',
  opts: distinct(['"lantern"[3:50]', '"lantern"[2:]'].map((e) => ic(val(e))).concat(['An empty line', ic(pyErr('print("lantern"[50])'))])),
  sol: `A slice never raises an error for limits outside the string; Python simply stops at the end, so the slice from index 3 gives ${rv('"lantern"[3:50]')}. Only a single index such as ${ic('[50]')} outside the string causes an IndexError.`,
}));

// ---- assertion-reason
Q('ar_immutable', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'The statement `s[0] = "x"` gives an error when s is a string.',
  r: 'Strings in Python are immutable, so their characters cannot be changed in place.',
  sol: 'Both are true and R explains A: item assignment would change the string in place, which immutability does not allow.',
}));
Q('ar_repeat', ar({
  t: 1, d: 2, c: 'understanding', key: 'b',
  a: 'The expression `"ab" * 3` has the value "ababab".',
  r: 'The `+` operator joins two strings.',
  sol: 'Both statements are true, but R does not explain A: the value comes from the repetition operator *, not from +.',
}));
Q('ar_index', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'The call `"pen".index("z")` stops the program with a ValueError.',
  r: 'The method `index()` returns -1 when the substring is not found.',
  sol: `A is true: index() raises ${ic(pyErr('"pen".index("z")'))} when the substring is absent. R is false: returning -1 is what find() does.`,
}));
Q('ar_isupper', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'The call `"Hello".isupper()` returns True.',
  r: 'isupper() returns True only if every cased character is a capital and there is at least one capital.',
  sol: `A is false: the string has small letters, so the result is ${val('"Hello".isupper()')}. R is true: it states the actual rule of isupper().`,
}));
Q('ar_neg', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'For a string s that is not empty, `s[-1]` is its last character.',
  r: 'Negative indexes count from the right end of the string, starting at -1.',
  sol: 'Both are true and R explains A: index -1 is the first position from the right end, which is the last character.',
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_upper_change', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Calling `name.upper()` changes the string stored in `name` to capital letters.',
  sol: 'upper() builds and returns a new string; the variable name still holds the old one unless the result is assigned back.',
}));
Q('tf_in_substring', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The expression `"ana" in "Banana"` is True.',
  sol: `The three characters ana appear together, in order, inside Banana, so the test gives ${val('"ana" in "Banana"')}.`,
}));
Q('tf_slice_range', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The slice `"abc"[1:10]` stops with an IndexError because 10 is larger than the length.',
  sol: `Slices are forgiving: the limit is cut to the end of the string and the result is ${rv('"abc"[1:10]')}.`,
}));
Q('tf_isalpha_space', tf({
  t: 1, d: 3, c: 'application', ans: false,
  stem: 'True or false? Both `"Hello".isalpha()` and `"Hello World".isalpha()` return True.',
  sol: `The first is ${val('"Hello".isalpha()')}, but the space in the second string is not a letter, so its result is ${val('"Hello World".isalpha()')}.`,
}));
Q('fb_strip', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The string method ___ removes the spaces at both the beginning and the end of a string.',
  acc: [['strip', 'strip()']],
  sol: 'strip() removes leading and trailing whitespace; lstrip() works on the left end only and rstrip() on the right end only.',
}));
Q('fb_last_index', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In Python, the negative index of the last character of any non-empty string is ___.',
  acc: [['-1', 'minus 1', 'minus one']],
  sol: 'Negative indexes start at -1 for the last character and go left: -2 is the second from the end.',
}));
Q('fb_immutable', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A string cannot be changed after it is created, which is why we say that a string is ___.',
  acc: [['immutable']],
  sol: 'Immutable means that the characters cannot be changed in place; every operation makes a new string.',
}));
Q('fb_operators', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'The ___ operator joins two strings, and the ___ operator repeats a string a given number of times.',
  acc: [['+', 'plus', 'concatenation'], ['*', 'multiplication', 'star']],
  sol: 'Concatenation uses +, and repetition uses *; for example "ab" + "cd" and "ab" * 3.',
}));
const sliceMatch = ['"monsoon"[2:5]', '"monsoon"[::-1]', '"monsoon"[-3:]', '"monsoon"[::3]'].map((e) => [e, val(e)]);
if (new Set(sliceMatch.map((p) => p[1])).size !== 4) throw new Error('match slice results');
Q('mt_slices', match({
  t: 1, d: 3, c: 'understanding',
  stem: 'Match each slice of the string "monsoon", used in a weather-word puzzle, with the string it gives.',
  pairs: sliceMatch,
  sol: 'Each slice is evaluated on its own: [2:5] takes indexes 2 to 4, [::-1] reverses, [-3:] takes the last three characters and [::3] takes every third character from the start.',
}));
Q('mt_methods', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each string method used in a form-checking program with what it does.',
  pairs: [
    ['isdigit()', 'True if every character is a digit'],
    ['partition(sep)', 'Splits at the first separator into three parts'],
    ['count(sub)', 'Gives the number of non-overlapping matches'],
    ['title()', 'Makes the first letter of each word a capital'],
  ],
  sol: 'Each method is paired with its job: isdigit() tests the characters, partition() splits once, count() counts matches and title() capitalises words.',
}));
Q('ord_vowels', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of a program that counts the vowels in a word typed by Kabir, in the order in which they must happen.',
  items: ['Read the word and set a counter to 0', 'Take the next character of the word', 'Test whether the character is a vowel', 'If it is, add 1 to the counter', 'After the last character, print the counter'],
  sol: 'The counter is set first, each character is taken and tested in turn, a vowel adds 1, and the total is printed only when the loop has finished.',
}));
Q('ord_palindrome', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of a program that tells whether a word is a palindrome, by comparing the word with its reverse.',
  items: ['Read the word and turn it into lower case', 'Build the reverse of the word with a slice', 'Compare the word with its reverse', 'If they are equal, print Palindrome', 'Otherwise print Not a palindrome'],
  sol: 'The word is read and cleaned first, then reversed, then compared, and the message is chosen last from the result of the comparison.',
}));

// ================================================================ code-output items
const cSlices = code('tag = "KLM-2048-XZ"', 'print(tag[:3])', 'print(tag[4:8])', 'print(tag[-2:])', 'print(tag[::4])');
Q('co_slices', co({
  pre: 'A courier tags every parcel with a code, and a sorting program cuts the code into parts with the program below. Write exactly what it prints.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cSlices,
  sol: 'Each print shows one slice of the tag: the first three characters, the characters at indexes 4 to 7, the last two characters, and every fourth character from the start.',
}));
const cMethods = code('note = "  Fresh Fish Fry  "', 'print(note.strip())', 'print(len(note), len(note.strip()))', 'print(note.lower().count("f"))', 'print(note.find("Fish"), note.index("Fry"))');
Q('co_methods', co({
  pre: 'The board outside a fish stall is stored in a variable, and four statements examine it. Write the exact output of the program.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cMethods,
  sol: 'strip() removes the two spaces at each end, so the length falls by four. count() is made on the lower-case copy, which has every f small, and find() and index() give the positions in the original string, with the leading spaces counted.',
}));
const cReplace = code('msg = "see you at seven"', 'new = msg.replace("se", "SE")', 'print(msg)', 'print(new)', 'print(new.count("SE"))');
Q('co_replace', co({
  pre: 'Lalit edits a text message with replace(). Write what his program prints, remembering what happens to the original message.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cReplace,
  sol: 'The first print shows the original, which replace() did not change. The second shows the new string with every se in capitals, and the count shows how many replacements were made.',
}));
const cSplitJoin = code('line = "orange;;lime;mango"', 'parts = line.split(";")', 'print(len(parts))', 'print(parts[1] == "")', 'print("+".join(parts))');
Q('co_split_join', co({
  pre: 'A juice stall records fruits in one line separated by semicolons. Write the exact output of the program that splits and joins the record.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cSplitJoin,
  sol: 'Two semicolons together leave an empty piece between them, which counts as an item and is also at index 1; join() then puts a plus sign between all the items, the empty one too.',
}));
const cFindLoop = code('s = "banana bandana"', 'pos = s.find("an")', 'while pos != -1:', '    print(pos)', '    pos = s.find("an", pos + 1)');
Q('co_find_loop', co({
  pre: 'Anwar scans a phrase for every place where an occurs, using find() with a start index. What does his loop print?',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: cFindLoop,
  sol: 'Each find() starts one place after the previous match, so overlapping matches would also be found; the loop stops when find() returns -1. The printed numbers are the indexes of every match.',
}));
const cNegStep = code('w = "nightingale"', 'print(w[::-1])', 'print(w[-1:-5:-1])', 'print(w[8:2:-2])');
Q('co_neg_step', co({
  pre: 'A bird-watching club reverses and samples the word below. Write the exact output of the three slices.',
  t: 1, d: 4, c: 'application', marks: 2,
  code: cNegStep,
  sol: 'A negative step moves left. The first slice reverses everything, the second takes the last four characters in reverse, and the third starts at index 8 and moves left in steps of 2, stopping before index 2.',
}));
const cMirror = code('s = "level"', 'for i in range(len(s)):', '    print(i, s[i], s[-1 - i], s[i] == s[-1 - i])');
Q('co_mirror', co({
  pre: 'Gauri compares each letter of a word with the letter at the matching place from the other end. What does her program print?',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cMirror,
  sol: 'For each index i the program shows the letter at i, the letter at -1 - i, and whether they are equal. For this word the letters at the two ends always agree.',
}));
const cSwap = code('t = "Go Pune 24"', 'r = ""', 'for ch in t:', '    if ch.isupper():', '        r = r + ch.lower()', '    elif ch.islower():', '        r = r + ch.upper()', '    else:', '        r = r + ch', 'print(r)');
Q('co_swap_case', co({
  pre: 'A poster program changes the case of every letter of a slogan and builds a new string one character at a time. Write its exact output.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cSwap,
  sol: 'Capitals become small letters, small letters become capitals, and the space and the digits are copied unchanged, so the new string is built one character at a time.',
}));
const cPart = code('entry = "cabin: 12: 450"', 'left, sep, right = entry.partition(":")', 'print(left)', 'print(sep)', 'a, s, b = right.partition(":")', 'print(a.strip(), b.strip())');
Q('co_partition', co({
  pre: 'A hostel register line is cut twice at colons with partition(). What exactly does the program print?',
  t: 1, d: 4, c: 'application', marks: 2,
  code: cPart,
  sol: 'The first partition splits at the first colon only, giving the word cabin, the colon itself and the rest. The rest is split again, and strip() removes the spaces after each colon.',
}));
const cKinds = code('s = "Room 42, Block 7!"', 'letters = 0', 'digits = 0', 'spaces = 0', 'for ch in s:', '    if ch.isalpha():', '        letters += 1', '    elif ch.isdigit():', '        digits += 1', '    elif ch.isspace():', '        spaces += 1', 'print(letters, digits, spaces, len(s))');
Q('co_kinds', co({
  pre: 'A form-filling helper sorts every character of an address into kinds. What does it print at the end?',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cKinds,
  sol: 'Letters, digits and spaces are counted separately; the comma and the exclamation mark are counted in none of them, so the three counts do not add up to the length.',
}));
const cWhileStep = code('s = "STATIONARY"', 'i = 0', 'out = ""', 'while i < len(s):', '    out = out + s[i]', '    i = i + 3', 'print(out)', 'print(i)');
Q('co_while_step', co({
  pre: 'Dev reads every third letter of a word with a while loop. Write the exact output of the loop and the final print of the index.',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: cWhileStep,
  sol: 'The index goes 0, 3, 6, 9 and then 12, which is no longer below the length, so the loop ends. The last value of the index is printed after the loop.',
}));
const cBools = code('for w in ["Goa12", "goa", "GOA", "  ", "12"]:', '    print(w.isalnum(), w.isalpha(), w.isdigit(), w.islower())');
Q('co_bools', co({
  pre: 'A signup form tests five entries with four methods each. Write the exact output of the testing program.',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: cBools,
  sol: 'Each line gives four truth values for one entry. A string of spaces is neither alphanumeric nor alphabetic nor made of digits, and islower() needs at least one small letter.',
}));

// ================================================================ short answers (2 marks)
const errAssign = code('pet = "cat"', 'pet[0] = "h"', 'print(pet)');
const errAssignFix = code('pet = "cat"', 'pet = "h" + pet[1:]', 'print(pet)');
Q('s2_err_assign', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `Kiran wants to change the first letter of a pet's name, but the program below stops with an error. Name the error, give the reason, and correct the program.\n\n${F(errAssign)}`,
  model: `Python reports ${ic(pyErr(errAssign))}, because a string is immutable and its characters cannot be changed one by one.\n\nThe corrected program builds a new string and stores it back:\n\n${F(errAssignFix)}\n\nOutput: ${ic(pyOut(errAssignFix))}`,
  sol: 'One mark for the error and its reason, one for a corrected program that builds a new string.',
  scheme: [['Error and reason identified', 1], ['Corrected program', 1]],
}));
const errCat = code('qty = 12', 'print("Packets: " + qty)');
const errCatFix = code('qty = 12', 'print("Packets: " + str(qty))');
Q('s2_err_concat', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Meghna's billing program fails when it is run. Find the error and write the corrected program.\n\n${F(errCat)}`,
  model: `Python reports ${ic(pyErr(errCat))}: a string cannot be joined to an integer with +.\n\nConvert the number with str():\n\n${F(errCatFix)}\n\nOutput: ${ic(pyOut(errCatFix))}`,
  sol: 'One mark for the error and its cause, one for the correction with str().',
  scheme: [['TypeError and cause', 1], ['Corrected program', 1]],
}));
const errIdx = code('word = "Kerala"', 'for i in range(len(word) + 1):', '    print(word[i])');
const errIdxFix = code('word = "Kerala"', 'for i in range(len(word)):', '    print(word[i])');
Q('s2_err_index', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `Sneha's program should print the letters of a state name one below another, but it ends with an error message. Find the error and correct the program.\n\n${F(errIdx)}`,
  model: `After printing all six letters it stops with ${ic(pyErr(errIdx))}: the loop runs once too often and tries index 6, which does not exist in a string of length 6.\n\n${F(errIdxFix)}\n\nThe stop value len(word) is not generated, so the indexes are 0 to 5.`,
  sol: 'One mark for the error and its cause (the extra pass with index 6), one for the corrected range().',
  scheme: [['IndexError and cause', 1], ['Corrected range()', 1]],
}));
Q('s2_neg_pos', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'In the string `town = "Chennai"`, the letter n occurs twice. Write the positive index and the negative index of its first occurrence, and show how you can check them with Python.',
  model: `The first n is at positive index ${val('"Chennai".find("n")')} and at negative index ${val('"Chennai".find("n") - len("Chennai")')}, because the length is ${val('len("Chennai")')} and the negative index equals the positive index minus the length.\n\n${F('town = "Chennai"', 'print(town[3], town[-4])')}\n\nOutput: ${outIc(code('town = "Chennai"', 'print(town[3], town[-4])'))}`,
  sol: 'One mark for each correct index, or one mark for both indexes and one for the check.',
  scheme: [['Positive index', 1], ['Negative index', 1]],
}));
Q('s2_slice_write', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'For the string `s = "Mathematics"`, write one slice expression for (i) its first four characters and (ii) its last three characters, and state the value of each.',
  model: `(i) ${ic('s[:4]')} gives ${rv('"Mathematics"[:4]')}.\n\n(ii) ${ic('s[-3:]')} gives ${rv('"Mathematics"[-3:]')}.\n\nAn empty start means the beginning; an empty stop means the end of the string.`,
  sol: 'One mark for each correct slice with its value.',
  scheme: [['First four characters', 1], ['Last three characters', 1]],
}));
Q('s2_find_index', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'State one difference between the `find()` and `index()` methods of a string. Show it with the substring "z" and the string "pen".',
  model: `Both give the position of the first match, but when the substring is absent find() returns ${val('"pen".find("z")')}, while index() stops with an error: ${ic(pyErr('"pen".index("z")'))}.`,
  sol: 'One mark for the difference and one for the result of each call on the example.',
  scheme: [['Difference stated', 1], ['Both results shown', 1]],
}));
Q('s2_immutable', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'What does it mean that strings are immutable? Show how the word "mud" can be turned into "bud" with a string operation.',
  model: `The characters of a string cannot be changed in place; any change creates a new string.\n\n${F('w = "mud"', 'w = "b" + w[1:]', 'print(w)')}\n\nOutput: ${outIc(code('w = "mud"', 'w = "b" + w[1:]', 'print(w)'))}`,
  sol: 'One mark for the meaning and one for a working operation that builds a new string.',
  scheme: [['Meaning of immutable', 1], ['New string built', 1]],
}));
const memb = code('s = "monsoon rain"', 'print("soon" in s)', 'print("rain" not in s)', 'print("Rain" in s)');
Q('s2_membership', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: `Write the three values printed by the program below and say why the third one is not the same as the second.\n\n${F(memb)}`,
  model: `Output:\n\n${O(pyOut(memb))}\n\nThe in test is case sensitive, so Rain with a capital R is not found in the string, while rain is found and the not in test on it is False.`,
  sol: 'One mark for the three values and one for the case-sensitivity reason.',
  scheme: [['Three values', 1], ['Reason: case sensitive', 1]],
}));
const dateConv = code('d = "10/05/2025"', 'print("-".join(d.split("/")))');
Q('s2_join_split', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'A date is stored as `d = "10/05/2025"`. Write one print statement that shows it as 10-05-2025 using split() and join(), and give its output.',
  model: `${F(dateConv)}\n\nsplit("/") cuts the date at the slashes and join() puts dashes between the pieces. Output: ${outIc(dateConv)}`,
  sol: 'One mark for the split and join statement and one for the output.',
  scheme: [['split() and join() used', 1], ['Output', 1]],
}));
const stripS = '"  ink  "';
Q('s2_strip_diff', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: `Explain how lstrip(), rstrip() and strip() differ. What is the length of each result for ${ic('s = ' + stripS)}?`,
  model: `lstrip() removes spaces at the left end only, rstrip() at the right end only, and strip() at both ends.\n\nFor ${stripS} (length ${val('len(' + stripS + ')')}) the lengths are ${val(`len(${stripS}.lstrip())`)}, ${val(`len(${stripS}.rstrip())`)} and ${val(`len(${stripS}.strip())`)} in that order.`,
  sol: 'One mark for the three descriptions and one for the three lengths.',
  scheme: [['Three methods described', 1], ['Three lengths', 1]],
}));

// ================================================================ short answers (3 marks)
const traceS = code('word = "tattoo"', 'n = 0', 'for ch in word:', '    if ch == "t":', '        n += 1', '    print(ch, n)');
const traceRows = outRows(traceS);
Q('s3_trace_count', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `The program below counts a letter in a word. Dry run it with a trace table and state the final value of n.\n\n${F(traceS)}`,
  model: `${mdTable(['ch', 'n after the pass'], traceRows)}\n\nThe loop takes the six characters in turn, and n grows only for the letter t. The last line shows the final value, ${ic(traceRows.at(-1)[1])}.`,
  sol: 'One mark for a row for every character, one for correct values of n and one for the final value.',
  scheme: [['A row for each character', 1], ['Correct values of n', 1], ['Final value', 1]],
}));
const diffS = code('s = "mississippi"', 'print(s.find("ss"))', 'print(s.count("ss"))', 'print(s.replace("ss", "S"))');
Q('s3_methods_three', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Give the output of the program below, and say in one line what each of its three methods does.\n\n${F(diffS)}`,
  model: `Output:\n\n${O(pyOut(diffS))}\n\nfind() gives the index of the first match, count() gives the number of non-overlapping matches, and replace() returns a new string in which every match is replaced.`,
  sol: 'One mark for the three correct output lines, and two for describing the methods (one for find and count, one for replace).',
  scheme: [['Three output lines', 1], ['find() and count() described', 1], ['replace() described', 1]],
}));
const palFrag = code('s = "refer"', 'if s == s[::-1]:', '    print("Palindrome")', 'else:', '    print("Not a palindrome")');
Q('s3_palindrome_slice', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Write a short program, using a slice, that tests whether the string stored in `s` is a palindrome and prints a message. Show its output for `s = "refer"` and for `s = "tower"`.',
  model: `${F(palFrag)}\n\nOutput for refer: ${outIc(palFrag)}\n\nOutput for tower: ${outIc(palFrag.replace('"refer"', '"tower"'))}\n\nThe slice [::-1] reverses the string, and a palindrome equals its reverse.`,
  sol: 'One mark for the reversing slice, one for the comparison with a message and one for both outputs.',
  scheme: [['Reverse by slice', 1], ['Comparison and messages', 1], ['Both outputs', 1]],
}));
const plate = '"MH12AB3456"';
Q('s3_plate', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `A vehicle number is stored as ${ic('plate = ' + plate)}: two letters for the state, two digits for the district, two letters for the series and four digits for the number. Write slices that give each of the four parts, and state their values.`,
  model: `State ${ic('plate[:2]')} gives ${rv(plate + '[:2]')}; district ${ic('plate[2:4]')} gives ${rv(plate + '[2:4]')}; series ${ic('plate[4:6]')} gives ${rv(plate + '[4:6]')}; number ${ic('plate[6:]')} gives ${rv(plate + '[6:]')}.`,
  sol: 'One mark for the two slices at the ends, one for the two middle slices and one for all four values.',
  scheme: [['First and last slices', 1], ['Two middle slices', 1], ['Four values', 1]],
}));
const chain = code('text = "  Art and Craft Fair  "', 'print(text.strip())', 'print(text.strip().upper())', 'print(text.strip().lower().count("a"))', 'print(len(text.strip()))');
Q('s3_chain', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Show the value of each of the four expressions evaluated in the program below, and explain how a method chain such as ${ic('text.strip().upper()')} is worked out.\n\n${F(chain)}`,
  model: `Output:\n\n${O(pyOut(chain))}\n\nA chain is worked out from left to right: strip() returns a new string, and the next method is applied to that new string.`,
  sol: 'Two marks for the four values (one for the first two, one for the last two) and one for the explanation of the chain.',
  scheme: [['First two values', 1], ['Last two values', 1], ['Chain explained', 1]],
}));
const wordsFrag = code('text = "rain falls on the hills"', 'words = text.split()', 'print(len(words))', 'print(words[0], words[-1])');
Q('s3_words', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Write statements that store the sentence "rain falls on the hills", split it into words, and print the number of words, the first word and the last word. Give the output.',
  model: `${F(wordsFrag)}\n\nOutput:\n\n${O(pyOut(wordsFrag))}\n\nsplit() with no argument cuts at runs of whitespace; len() counts the words, and the indexes 0 and -1 reach the first and the last.`,
  sol: 'One mark for split(), one for the count and the two indexes, and one for the correct output.',
  scheme: [['split() used', 1], ['Count and first and last word', 1], ['Output', 1]],
}));

// ================================================================ long answers (5 marks)
const palProg = code('s = input().strip().lower()', 'ok = True', 'for i in range(len(s) // 2):', '    if s[i] != s[-1 - i]:', '        ok = False', '        break', 'if ok:', '    print("Palindrome")', 'else:', '    print("Not a palindrome")');
Q('l_palindrome', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'The English club of a school wants a program that reads a word, ignores its case, and prints Palindrome or Not a palindrome by comparing characters from both ends (use a loop and a flag, not a reversing slice). Write the program and show its output for the inputs Level and Monday.',
  model: `${F(palProg)}\n\nOutput for Level: ${outIc(palProg, { stdin: 'Level\n' })}\n\nOutput for Monday: ${outIc(palProg, { stdin: 'Monday\n' })}\n\nOnly the first half of the word is compared with the second half, using s[i] and s[-1 - i]; one mismatch is enough to stop with break.`,
  sol: 'Marks: reading and lower-casing the input, the flag, the loop over half of the word with the mirrored comparison, break and the final decision, and both outputs.',
  scheme: [['Input read and case ignored', 1], ['Flag set before the loop', 1], ['Mirrored comparison in a loop', 1], ['break and the final messages', 1], ['Both outputs correct', 1]],
}));
const kindsProg = code('text = input()', 'up = low = dig = sp = other = 0', 'for ch in text:', '    if ch.isupper():', '        up += 1', '    elif ch.islower():', '        low += 1', '    elif ch.isdigit():', '        dig += 1', '    elif ch.isspace():', '        sp += 1', '    else:', '        other += 1', 'print("Capitals:", up)', 'print("Small letters:", low)', 'print("Digits:", dig)', 'print("Spaces:", sp)', 'print("Others:", other)');
const kindsIn = 'Room 12B, Gate-4 (North)\n';
Q('l_kinds', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'A hostel office wants to analyse the address line typed by a visitor. Write a program that reads a line and prints how many capital letters, small letters, digits, spaces and other characters it contains. Show the output for the input `Room 12B, Gate-4 (North)`.',
  model: `${F(kindsProg)}\n\nOutput:\n\n${O(pyOut(kindsProg, { stdin: kindsIn }))}\n\nThe elif chain makes sure that every character is counted in exactly one group.`,
  sol: 'Marks: input and the five counters, the traversal of the string, the tests for the four kinds in an elif chain, the else group, and the output for the given line.',
  scheme: [['Input and counters', 1], ['Traversal of the string', 1], ['Tests for the four kinds', 1], ['Other characters and output lines', 1], ['Correct output for the input', 1]],
}));
const wsProg = code('sentence = input()', 'words = sentence.split()', 'longest = words[0]', 'for i in range(1, len(words)):', '    if len(words[i]) > len(longest):', '        longest = words[i]', 'print("Words:", len(words))', 'print("Longest:", longest, len(longest))');
const wsIn = 'monsoon rains fill the river banks overnight\n';
Q('l_wordstats', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'A newspaper desk wants a program that reads a sentence and prints the number of words in it and the longest word with its length. Write the program, using split(), and show the output for the input `monsoon rains fill the river banks overnight`.',
  model: `${F(wsProg)}\n\nOutput:\n\n${O(pyOut(wsProg, { stdin: wsIn }))}\n\nThe first word is taken as the longest to begin with; a later word replaces it only when it is strictly longer, so on a tie the earlier word is kept.`,
  sol: 'Marks: reading and split(), the count with len(), the starting value of the longest word, the loop with the length comparison, and the correct output.',
  scheme: [['Input and split()', 1], ['Word count', 1], ['Starting value of longest', 1], ['Loop with length comparison', 1], ['Correct output', 1]],
}));
const maskProg = code('word = input()', 'masked = ""', 'count = 0', 'for ch in word:', '    if ch.lower() in "aeiou":', '        masked = masked + "*"', '        count += 1', '    else:', '        masked = masked + ch', 'print(masked)', 'print("Vowels replaced:", count)');
Q('l_mask', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'A quiz screen hides every vowel of a clue with a star. Write a program that reads a clue, builds a new string in which every vowel (capital or small) is replaced by *, and prints it with the number of vowels replaced. Show the output for the input `Telescope Mission`.',
  model: `${F(maskProg)}\n\nOutput:\n\n${O(pyOut(maskProg, { stdin: 'Telescope Mission\n' }))}\n\nA string cannot be changed in place, so the program builds a new string one character at a time. Converting the character to lower case first lets a single test cover both cases.`,
  sol: 'Marks: input and the empty result string, the loop over the characters, the case-insensitive vowel test, the star and the counter, and the correct output.',
  scheme: [['Input and empty result string', 1], ['Loop over characters', 1], ['Case-insensitive vowel test', 1], ['Star added and counter updated', 1], ['Correct output', 1]],
}));
const iniProg = code('parts = input().split()', 'res = ""', 'for i in range(len(parts)):', '    res = res + parts[i][0].upper() + "."', 'print(res)');
Q('l_initials', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'A library card prints the initials of a member. Write a program that reads a full name of any number of words and prints the initials in capitals, each followed by a dot. Show the output for the inputs `ravi shankar prasad` and `meena iyer`.',
  model: `${F(iniProg)}\n\nOutput for ravi shankar prasad: ${outIc(iniProg, { stdin: 'ravi shankar prasad\n' })}\n\nOutput for meena iyer: ${outIc(iniProg, { stdin: 'meena iyer\n' })}\n\nsplit() gives the words; parts[i][0] is the first character of word i, and upper() makes it a capital.`,
  sol: 'Marks: reading and split(), the empty result, the loop over the words, the first character made a capital with a dot, and both outputs.',
  scheme: [['Input and split()', 1], ['Empty result string', 1], ['Loop over the words', 1], ['First character, capital and dot', 1], ['Both outputs correct', 1]],
}));
const pwProg = code('pw = input()', 'has_digit = False', 'has_upper = False', 'has_lower = False', 'for ch in pw:', '    if ch.isdigit():', '        has_digit = True', '    elif ch.isupper():', '        has_upper = True', '    elif ch.islower():', '        has_lower = True', 'if len(pw) >= 8 and has_digit and has_upper and has_lower:', '    print("Strong")', 'else:', '    print("Weak")');
Q('l_password', long({
  t: 1, d: 5, c: 'analysis', marks: 5,
  stem: 'A school portal accepts a password as Strong only if it has at least 8 characters and contains a digit, a capital letter and a small letter. Write a program that reads a password and prints Strong or Weak. Show the output for `Blue7Tiger` and for `tiger2023`.',
  model: `${F(pwProg)}\n\nOutput for Blue7Tiger: ${outIc(pwProg, { stdin: 'Blue7Tiger\n' })}\n\nOutput for tiger2023: ${outIc(pwProg, { stdin: 'tiger2023\n' })}\n\nThree flags record what has been seen during the traversal, and the decision is made once, after the loop; tiger2023 has no capital letter.`,
  sol: 'Marks: input and three flags, the traversal, the tests that set each flag, the combined final condition with the length, and both outputs.',
  scheme: [['Input and flags', 1], ['Traversal of the password', 1], ['Tests that set the flags', 1], ['Final condition with length', 1], ['Both outputs correct', 1]],
}));

// ================================================================ case-based (4 marks)
const email = (raw) => code(`raw = "${raw}"`, 'mail = raw.strip().lower()', 'user, sep, site = mail.partition("#")', 'print(user)', 'print(site)', 'print(len(user))');
Q('cb_email', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the Greenhill School login desk and answer the questions. *(Imagined school and login ids, written by SOYL for practice.)*',
  passage: `The Greenhill School office receives login ids typed by parents in the form user#site, often with extra spaces and capital letters. Imran writes a program that cleans an id and separates the user name from the site.\n\n${F(email('  Meera.Nair#School.EDU '))}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'c', stem: 'What is the second line printed by the program for the login id shown?', opts: distinct([ic('School.EDU'), ic('#school.edu'), ic(pyOut(email('  Meera.Nair#School.EDU ')).split('\n')[1]), ic('meera.nair')]), sol: 'strip() and lower() are applied first, so the id is all in small letters; partition() then gives the part after the first hash sign as the third value, which is the site.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The method ___ is used in the program to turn all the letters of the id into small letters.', acc: [['lower', 'lower()']], sol: 'lower() returns a copy of the string with every letter in lower case.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give the three lines printed when raw is "  Rahul.Das#Mail.COM  ".', model: O(pyOut(email('  Rahul.Das#Mail.COM  '))), sol: 'One mark for the user name and its length and one for the domain.', scheme: [['User name and length', 1], ['Domain', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Write a statement that prints True when the cleaned id ends with ".edu", and give its output for the login id shown.', model: `${F(code(email('  Meera.Nair#School.EDU '), 'print(mail.endswith(".edu"))'))}\n\nThe last line prints ${ic(pyOut(code(email('  Meera.Nair#School.EDU '), 'print(mail.endswith(".edu"))')).split('\n').at(-1))}, because the id was changed to small letters before the test.`, sol: 'One mark for endswith() on the cleaned address and one for the output.', scheme: [['endswith() used on mail', 1], ['Output', 1]] }),
    ]),
  ],
}));
const roll = (c) => code(`code = "${c}"`, 'cls = code[:2]', 'stream = code[2:4]', 'num = code[4:]', 'print(cls, stream, num)', 'print(num.isdigit(), len(num))');
Q('cb_roll', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the roll codes of Lakeview School and answer the questions. *(Imagined school and codes, written by SOYL for practice.)*',
  passage: `Every student of Lakeview School has a roll code made of the class (2 digits), the stream (2 letters) and a serial number (3 digits), as in 11SC045. The office program below cuts a code into its parts and checks the serial number.\n\n${F(roll('11SC045'))}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'b', stem: 'What is printed by the first print statement for the code shown?', opts: distinct([ic('11 SC 04'), ic(pyOut(roll('11SC045')).split('\n')[0]), ic('11 SC5'), ic('1 1SC 045')]), sol: 'The slices [:2], [2:4] and [4:] cut the code into the class, the stream and the serial number, and print() separates them with spaces.' })),
    child('b', tf({ t: 1, d: 3, c: 'understanding', ans: true, stem: 'True or false? For the code 11SC0A5 the program prints False in the second line.', sol: `The serial part 0A5 contains a letter, so isdigit() gives ${val('"0A5".isdigit()')}.` })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give the output of the program for the code 12CM108.', model: O(pyOut(roll('12CM108'))), sol: 'One mark for the first line and one for the second line.', scheme: [['First line', 1], ['Second line', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the program would give a wrong class for a code such as 9SC045 that has a one-digit class, and say what it prints.', model: `The slices assume that the class always takes two characters. For this code the program prints ${ic(pyOut(roll('9SC045')).split('\n')[0])} and ${ic(pyOut(roll('9SC045')).split('\n')[1])}, so the stream and the serial number are cut at the wrong places.`, sol: 'One mark for the fixed-width assumption and one for the printed output.', scheme: [['Fixed-width assumption', 1], ['Output', 1]] }),
    ]),
  ],
}));
const dnaSrc = (s) => code(`dna = "${s}"`, 'print(dna.count("GA"))', 'print(dna.find("TAG"))', 'rna = dna.replace("T", "U")', 'print(rna)', 'print(len(rna))');
Q('cb_dna', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the school biology club and answer the questions. *(Imagined strand and project, written by SOYL for practice.)*',
  passage: `The biology club of a school stores a short DNA strand as a string of the letters A, C, G and T. Their program counts a pattern, finds a stop signal and converts the strand to RNA by replacing T with U.\n\n${F(dnaSrc('ATGCGATACGATTAG'))}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'd', stem: 'What does the first print statement show for the strand given?', opts: distinct([ic('1'), ic('3'), ic('0'), ic(pyOut(dnaSrc('ATGCGATACGATTAG')).split('\n')[0])]), sol: 'count() gives the number of non-overlapping matches of GA in the strand.' })),
    child('b', tf({ t: 1, d: 2, c: 'understanding', ans: true, stem: 'True or false? The statement `dna.replace("T", "U")` on its own, with the result not stored, would leave `dna` unchanged.', sol: 'replace() returns a new string; the original string is immutable and stays as it was.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give the four lines printed when dna is "GATTACAGATT".', model: O(pyOut(dnaSrc('GATTACAGATT'))), sol: 'One mark for the first two lines and one for the last two.', scheme: [['First two lines', 1], ['Last two lines', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Write a statement that prints the part of dna that comes before the first TAG, and give its output for the strand in the passage.', model: `${F(code('dna = "ATGCGATACGATTAG"', 'print(dna[:dna.find("TAG")])'))}\n\nOutput: ${outIc(code('dna = "ATGCGATACGATTAG"', 'print(dna[:dna.find("TAG")])'))}`, sol: 'One mark for the slice up to find() and one for the output.', scheme: [['Slice with find()', 1], ['Output', 1]] }),
    ]),
  ],
}));
const headSrc = (h) => code(`head = "${h}"`, 'print(head.title())', 'words = head.split()', 'print(len(words))', 'print("-".join(words))', 'print(head.replace("grand", "GRAND"))');
Q('cb_headline', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the school magazine and answer the questions. *(Imagined magazine and headline, written by SOYL for practice.)*',
  passage: `The editors of a school magazine type headlines in small letters. The layout program formats a headline, counts its words, makes a web-address style slug and highlights one word.\n\n${F(headSrc('annual sports day: grand finale'))}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'a', stem: 'What does the third print statement show for the headline given?', opts: distinct([ic(pyOut(headSrc('annual sports day: grand finale')).split('\n')[2]), ic('annual-sports-day-grand-finale'), ic('annual sports day: grand finale'), ic('Annual-Sports-Day:-Grand-Finale')]), sol: 'split() cuts the headline at runs of spaces, so the colon stays attached to the word day; join() then puts a dash between the words.' })),
    child('b', fb({ t: 1, d: 2, c: 'understanding', stem: 'The method ___ of the string makes the first letter of every word a capital letter.', acc: [['title', 'title()']], sol: 'title() capitalises each word; capitalize() would change only the first letter of the whole string.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Give the four lines printed when head is "grand opening of the new library".', model: O(pyOut(headSrc('grand opening of the new library'))), sol: 'One mark for the first two lines and one for the last two.', scheme: [['First two lines', 1], ['Last two lines', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The editors want the slug in small letters with the colon removed. Write one statement that does it for the headline in the passage and give its output.', model: `${F(code('head = "annual sports day: grand finale"', 'print("-".join(head.replace(":", "").split()))'))}\n\nOutput: ${outIc(code('head = "annual sports day: grand finale"', 'print("-".join(head.replace(":", "").split()))'))}`, sol: 'One mark for removing the colon with replace() before split() and join(), and one for the output.', scheme: [['replace(), split() and join() combined', 1], ['Output', 1]] }),
    ]),
  ],
}));
