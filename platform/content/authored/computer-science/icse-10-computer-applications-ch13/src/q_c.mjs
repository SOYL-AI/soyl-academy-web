// ICSE 10 Computer Applications, ch13: String Handling. Topic t05 (arrays of Strings: sorting and searching) and the 15-mark programs.
// Every scenario is imagined for SOYL. Every output, value or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, ord, short, long, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, prog, S15 } from './q_util.mjs';

// ---- shared code
export const cSortPass = code(
  'String[] n = {"Tara", "Asha", "Mohan", "Bina"};',
  'for (int j = 0; j < n.length - 1; j++) {',
  '    if (n[j].compareTo(n[j + 1]) > 0) {',
  '        String t = n[j];',
  '        n[j] = n[j + 1];',
  '        n[j + 1] = t;',
  '    }',
  '}',
  'System.out.println(n[0] + " " + n[1] + " " + n[2] + " " + n[3]);',
);
export const cSearch = code(
  'String[] fruit = {"Mango", "Guava", "Apple", "Papaya"};',
  'String key = "apple";',
  'int a = -1, b = -1;',
  'for (int i = 0; i < fruit.length; i++) {',
  '    if (a == -1 && fruit[i].equals(key))',
  '        a = i;',
  '    if (b == -1 && fruit[i].equalsIgnoreCase(key))',
  '        b = i;',
  '}',
  'System.out.println(a + " " + b);',
);
export const cBadOp = code('String[] w = {"cat", "bat"};', 'if (w[0] > w[1])', '    System.out.println("swap");');
export const cSelPass = code(
  'String[] n = {"Zoya", "Arun", "Meera", "Chetan"};',
  'for (int i = 0; i < n.length - 1; i++) {',
  '    int small = i;',
  '    for (int j = i + 1; j < n.length; j++)',
  '        if (n[j].compareTo(n[small]) < 0)',
  '            small = j;',
  '    String t = n[i];',
  '    n[i] = n[small];',
  '    n[small] = t;',
  '    System.out.println(String.join(" ", n));',
  '}',
);
export const cFind = (key) => code(
  'String[] names = {"Ravi", "Sana", "Tarun", "Uma"};',
  `String key = "${key}";`,
  'int pos = -1;',
  'for (int i = 0; i < names.length; i++) {',
  '    if (names[i].equals(key)) {',
  '        pos = i;',
  '        break;',
  '    }',
  '}',
  'if (pos == -1)',
  '    System.out.println("Not found");',
  'else',
  '    System.out.println("Found at index " + pos);',
);
export const cCount = (key) => code(
  'String[] a = {"Anil", "Bela", "Chitra", "Dev", "Esha", "Farid", "Gita", "Hari"};',
  `String key = "${key}";`,
  'int c = 0;',
  'for (int i = 0; i < a.length; i++) {',
  '    c++;',
  '    if (a[i].equals(key))',
  '        break;',
  '}',
  'System.out.println(c);',
);

// ================================================================ t05 String arrays: sorting and searching
Q('m_sort_cmp', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'In a bubble sort that arranges the String array n in ascending alphabetical order, which condition decides that the neighbouring names n[j] and n[j + 1] must be swapped?',
  opts: distinct([ic('n[j].compareTo(n[j + 1]) > 0'), ic('n[j].compareTo(n[j + 1]) < 0'), ic('n[j] > n[j + 1]'), ic('n[j].equals(n[j + 1])')]),
  sol: `A positive value of compareTo means that n[j] comes after n[j + 1] in the alphabet, so the two names are out of order: ${ic('"Tara".compareTo("Asha")')} is ${ev('"Tara".compareTo("Asha")')}. A negative value would swap names that are already in order, and equals() gives only true or false. The operator > cannot be applied to Strings: javac says "${mustFail(cBadOp)}".`,
}));
const nSix = 'String[] n = {"Tara", "Asha", "Mohan", "Bina", "Divya", "Kiran"};';
Q('m_bubble_pass', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A bubble sort pass compares each name of an array of 6 names with its right-hand neighbour, starting from the first name. How many comparisons does one full pass make?',
  opts: distinct([ic(ev('n.length - 1', nSix)), ic(ev('n.length', nSix)), ic(ev('n.length * (n.length - 1) / 2', nSix)), ic(ev('n.length * n.length', nSix))]),
  sol: `The pairs are (1st, 2nd), (2nd, 3rd), and so on up to (5th, 6th), that is n.length - 1 = ${ev('n.length - 1', nSix)} pairs. ${ev('n.length', nSix)} would count a pair with a name that does not exist; ${ev('n.length * (n.length - 1) / 2', nSix)} is the largest number of comparisons of all the passes together if no shortcut is used, and ${ev('n.length * n.length', nSix)} is not a count of comparisons at all.`,
}));
Q('m_lin_missing', mcq({
  t: 5, d: 3, c: 'application',
  stem: `The code below searches an array of eight names for the name Indu, which is not in the array. What does it display?\n\n${F(cCount('Indu'))}`,
  opts: distinct([ic(out(cCount('Indu'))), ic(out(cCount('Dev'))), ic(out(cCount('Anil'))), ic(out(cCount('Gita')))]),
  sol: `The counter c is increased before every comparison, and a missing name is compared with every element, so c is ${out(cCount('Indu'))}. The other options are the counts when the name is found early: Dev gives ${out(cCount('Dev'))}, Anil ${out(cCount('Anil'))} and Gita ${out(cCount('Gita'))}.`,
}));
Q('ar_sort', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A program that sorts an array of names alphabetically uses compareTo() in place of the > operator.',
  r: 'The relational operators such as > and < can be applied only to numbers and characters, not to String objects.',
  sol: `Applying > to two Strings is rejected: javac says "${mustFail(cBadOp)}". So the order has to be found with compareTo(), which means (A) is true and (R) is true and gives the reason for it.`,
}));
Q('ord_sel', ord({
  t: 5, d: 3, c: 'understanding',
  stem: 'Arrange the steps of one pass of selection sort (ascending order) on a String array in the correct order.',
  items: [
    'Take the first unsorted position as the position of the smallest name so far',
    'Compare every later name with the smallest name so far using compareTo',
    'Note the position of any name that is found to be smaller',
    'Swap the smallest name with the name at the first unsorted position',
  ],
  sol: `The smallest position is known only after all the later names have been compared, so the swap comes last. On {Zoya, Arun, Meera, Chetan} the first pass gives ${ic(out(cSelPass).split('\n')[0])}.`,
}));

Q('co_sort', co({
  pre: 'One pass of a bubble sort is applied to a list of names, as in the code below. Write the exact output.',
  t: 5, d: 4, c: 'application',
  code: cSortPass,
  sol: 'Tara is compared with Asha and swapped, then with Mohan and swapped, then with Bina and swapped: the largest name moves to the end in one pass. The other names keep their relative order.',
  scheme: [['Tara carried to the end', 1], ['Order of the remaining three names', 1]],
}));
Q('co_search', co({
  pre: 'A fruit-stall owner looks for the word apple in an array with the loop below. Write the exact output.',
  t: 5, d: 3, c: 'application',
  code: cSearch,
  sol: 'equals() is case-sensitive, so the text apple never matches Apple and a stays -1. equalsIgnoreCase() matches Apple at index 2, so b becomes 2.',
}));
Q('co_err_op', co({
  pre: 'A student compares two names in the sorting code with the operator > as shown below. State the error that the compiler reports.',
  t: 5, d: 3, c: 'understanding', error: true,
  code: cBadOp,
  sol: 'The relational operator > is defined only for numeric and char operands, so it cannot compare two String objects. compareTo() should be used: w[0].compareTo(w[1]) > 0.',
  scheme: [['Compile-time error with the correct line', 1], ['Cause: > cannot be used with Strings; compareTo should be used', 1]],
}));

Q('s_sel_pass', short({
  t: 5, d: 4, c: 'application', marks: 2,
  stem: 'The array {"Zoya", "Arun", "Meera", "Chetan"} is arranged in ascending alphabetical order by selection sort. Show the contents of the array after each pass.',
  model: `After pass 1: ${ic(out(cSelPass).split('\n')[0])}\n\nAfter pass 2: ${ic(out(cSelPass).split('\n')[1])}\n\nAfter pass 3: ${ic(out(cSelPass).split('\n')[2])}\n\nEach pass finds the smallest name of the unsorted part with compareTo and swaps it into the first unsorted place; in pass 3 the smallest is already in place, so nothing moves. The result was produced by this code:\n\n${F(cSelPass)}`,
  sol: 'One mark for pass 1 and 2 and one mark for pass 3 and the final order.',
  scheme: [['Passes 1 and 2 correct', 1], ['Pass 3 and the final sorted order', 1]],
}));
Q('s_search_code', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: 'An array names holds four Strings and a String key holds the name to be found. Write Java statements for a linear search that displays Found at index followed by the position, or Not found.',
  model: `${F(cFind('Tarun'))}\n\nOutput: ${ic(out(cFind('Tarun')))}. For the key Meena the output is ${ic(out(cFind('Meena')))}. The loop compares the key with each element using equals() and stops at the first match; pos stays -1 if there is none.`,
  sol: 'A loop over all positions with equals(), the position stored on a match, and the final decision on the value of pos.',
  scheme: [['Loop with equals() comparison and the position stored', 1], ['Correct display for found and for not found', 1]],
}));

// ================================================================ 15-mark programs
// ---- palindrome word
export const srcPal = code(
  'import java.util.Scanner;',
  '',
  'public class MirrorWord {',
  '    // Checks whether a word reads the same forwards and backwards, ignoring the case of its letters',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String word = sc.next();',
  '        String rev = "";',
  '        for (int i = word.length() - 1; i >= 0; i--)',
  '            rev = rev + word.charAt(i);',
  '        System.out.println("Reverse = " + rev);',
  '        if (word.equalsIgnoreCase(rev))',
  '            System.out.println(word + " is a palindrome");',
  '        else',
  '            System.out.println(word + " is not a palindrome");',
  '    }',
  '}',
);
Q('l_palin', long({
  t: 4, d: 3, c: 'application', marks: 15,
  stem: 'A sign painter in an imagined town wants to know whether a word reads the same from both ends, whatever the case of its letters. Write a program in Java to accept a single word and display its reverse and a message saying whether it is a palindrome. Sample input: Rotor (a palindrome).',
  model: prog({ src: srcPal, stdin: 'Rotor\n', also: ['Kalyan\n'], vars: [['word', 'String', 'word accepted from the user'], ['rev', 'String', 'reverse of the word, built from the last character to the first'], ['i', 'int', 'loop variable, the index of the character']] }),
  sol: 'Build the reverse by joining the characters of the word from the last index to the first, then compare the word with its reverse using equalsIgnoreCase, so that R and r are treated as equal. The method equals would fail for Rotor because the first and last letters differ in case.',
  scheme: S15(3, 2, 'Reverse built with a loop and charAt; comparison with equalsIgnoreCase; correct decision for both outcomes', 2, 2),
}));

// ---- pig Latin
export const srcPig = code(
  'import java.util.Scanner;',
  '',
  'public class PigLatin {',
  '    // Converts a word to pig Latin: the letters before the first vowel move to the end, then AY is added',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String w = sc.next().toUpperCase();',
  '        int p = 0;',
  '        for (int i = 0; i < w.length(); i++) {',
  '            char c = w.charAt(i);',
  '            if ("AEIOU".indexOf(c) != -1) {',
  '                p = i;',
  '                break;',
  '            }',
  '        }',
  '        String pig = w.substring(p) + w.substring(0, p) + "AY";',
  '        System.out.println("Pig Latin = " + pig);',
  '    }',
  '}',
);
Q('l_pig', long({
  t: 4, d: 4, c: 'application', marks: 15,
  stem: 'A word game in an imagined school club converts a word to its pig Latin form by this rule: the letters that come before the first vowel (A, E, I, O or U) are moved to the end of the word and the letters AY are added; if the word starts with a vowel, only AY is added. Write a program in Java to accept a word (it has at least one vowel and may be in any case) and display its pig Latin form in capital letters. Sample input: Stripe (the first vowel is at index 3).',
  model: prog({ src: srcPig, stdin: 'Stripe\n', also: ['Orange\n'], vars: [['w', 'String', 'the word in capital letters'], ['p', 'int', 'index of the first vowel'], ['i', 'int', 'loop variable'], ['c', 'char', 'character of the word being examined'], ['pig', 'String', 'the pig Latin form of the word']] }),
  sol: 'Convert the word to capitals, find the index p of its first vowel by checking each character, and form substring(p) + substring(0, p) + "AY". When the word starts with a vowel p stays 0, so substring(0, 0) is empty and only AY is added.',
  scheme: S15(3, 2, 'Word converted to capitals; index of the first vowel found; substring(p) + substring(0, p) + AY formed', 2, 2),
}));

// ---- counting words, vowels and capital letters
export const srcCount = code(
  'import java.util.Scanner;',
  '',
  'public class TextSummary {',
  '    // Counts the words, vowels and capital letters of a sentence',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String s = sc.nextLine().trim();',
  '        int words = 1, vowels = 0, upper = 0;',
  '        for (int i = 0; i < s.length(); i++) {',
  '            char c = s.charAt(i);',
  "            if (c == ' ')",
  '                words++;',
  '            if ("AEIOUaeiou".indexOf(c) != -1)',
  '                vowels++;',
  '            if (Character.isUpperCase(c))',
  '                upper++;',
  '        }',
  '        System.out.println("Words = " + words);',
  '        System.out.println("Vowels = " + vowels);',
  '        System.out.println("Capital letters = " + upper);',
  '    }',
  '}',
);
Q('l_count', long({
  t: 4, d: 4, c: 'application', marks: 15,
  stem: 'A school magazine editor wants a summary of a line of text. Write a program in Java to accept a sentence (the words are separated by a single space) and display the number of words, the number of vowels (a, e, i, o, u in either case) and the number of capital letters. Sample input: Kavita visits Hampi on Sunday',
  model: prog({ src: srcCount, stdin: 'Kavita visits Hampi on Sunday\n', also: ['Bright Stars Shine\n'], vars: [['s', 'String', 'the sentence, with the spaces at both ends removed'], ['words', 'int', 'number of words, starts at 1 and grows with every space'], ['vowels', 'int', 'count of vowels'], ['upper', 'int', 'count of capital letters'], ['i', 'int', 'loop variable'], ['c', 'char', 'character examined']] }),
  sol: 'Read the whole line with nextLine, trim it and visit every character with charAt. A space adds one to the word count (which starts at 1 because the last word has no space after it), a character found in "AEIOUaeiou" by indexOf adds one to the vowel count and Character.isUpperCase adds one to the capital-letter count.',
  scheme: S15(3, 2, 'Loop over all the characters; word count by spaces; vowel test in both cases; capital-letter test', 2, 2),
}));

// ---- bubble sort of names
export const srcBubble = code(
  'import java.util.Scanner;',
  '',
  'public class NameSorter {',
  '    // Arranges five names in ascending alphabetical order by bubble sort',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int n = 5;',
  '        String[] names = new String[n];',
  '        for (int i = 0; i < n; i++)',
  '            names[i] = sc.next();',
  '        for (int i = 0; i < n - 1; i++) {',
  '            for (int j = 0; j < n - 1 - i; j++) {',
  '                if (names[j].compareTo(names[j + 1]) > 0) {',
  '                    String t = names[j];',
  '                    names[j] = names[j + 1];',
  '                    names[j + 1] = t;',
  '                }',
  '            }',
  '        }',
  '        System.out.println("Names in alphabetical order:");',
  '        for (int i = 0; i < n; i++)',
  '            System.out.println(names[i]);',
  '    }',
  '}',
);
Q('l_bubble', long({
  t: 5, d: 4, c: 'application', marks: 15,
  stem: 'The organiser of an imagined science fair has the names of five participants, each a single word starting with a capital letter. Write a program in Java to accept the five names into an array and display them in ascending alphabetical order, using bubble sort and the method compareTo. Sample input: Tanvi Arjun Meera Zoya Chetan',
  model: prog({ src: srcBubble, stdin: 'Tanvi Arjun Meera Zoya Chetan\n', also: ['Zoya Yash Xavier Wasim Vikram\n'], vars: [['n', 'int', 'number of names'], ['names', 'String[]', 'array holding the names'], ['i', 'int', 'index of the pass and of the input loop'], ['j', 'int', 'index of the pair being compared'], ['t', 'String', 'temporary variable used to swap two names']] }),
  sol: 'In each pass the neighbouring names are compared with compareTo; when the left name comes after the right name (the value is positive) they are swapped with the help of a temporary variable. After each pass the largest remaining name is at the end, so the inner loop can stop one place earlier each time.',
  scheme: S15(3, 2, 'Names read into the array; nested loops; compareTo condition; swap with a temporary variable', 2, 2),
}));

// ---- selection sort, descending
export const srcSelect = code(
  'import java.util.Scanner;',
  '',
  'public class RiverOrder {',
  '    // Arranges five river names from Z to A by selection sort',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        int n = 5;',
  '        String[] r = new String[n];',
  '        for (int i = 0; i < n; i++)',
  '            r[i] = sc.next();',
  '        for (int i = 0; i < n - 1; i++) {',
  '            int big = i;',
  '            for (int j = i + 1; j < n; j++) {',
  '                if (r[j].compareTo(r[big]) > 0)',
  '                    big = j;',
  '            }',
  '            String t = r[i];',
  '            r[i] = r[big];',
  '            r[big] = t;',
  '        }',
  '        System.out.println("Names from Z to A:");',
  '        for (int i = 0; i < n; i++)',
  '            System.out.println(r[i]);',
  '    }',
  '}',
);
Q('l_select', long({
  t: 5, d: 4, c: 'application', marks: 15,
  stem: 'A geography teacher of an imagined school keeps the names of five rivers, each a single word starting with a capital letter. Write a program in Java to accept the names into an array and display them in descending alphabetical order (Z to A) using selection sort and the method compareTo. Sample input: Ganga Yamuna Kaveri Narmada Godavari',
  model: prog({ src: srcSelect, stdin: 'Ganga Yamuna Kaveri Narmada Godavari\n', also: ['Beas Krishna Tapti Sutlej Chenab\n'], vars: [['n', 'int', 'number of names'], ['r', 'String[]', 'array holding the river names'], ['i', 'int', 'position that is being filled in the current pass'], ['j', 'int', 'index of the name compared with the largest so far'], ['big', 'int', 'position of the alphabetically largest name found in the pass'], ['t', 'String', 'temporary variable used to swap']] }),
  sol: 'In pass i the position big of the largest name of the unsorted part r[i] to r[n - 1] is found by comparing each later name with r[big] using compareTo (a positive value means a larger name). The name at big is then swapped with r[i], so that the names fill the array from the front in descending order.',
  scheme: S15(3, 2, 'Names read into the array; position of the largest name found with compareTo; swap after the inner loop; descending order', 2, 2),
}));

// ---- linear search of names
export const srcFind = code(
  'import java.util.Scanner;',
  '',
  'public class MemberFinder {',
  '    // Linear search of a name in a list of six members, ignoring the case of the letters',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String[] m = new String[6];',
  '        for (int i = 0; i < m.length; i++)',
  '            m[i] = sc.next();',
  '        String key = sc.next();',
  '        int pos = -1;',
  '        for (int i = 0; i < m.length; i++) {',
  '            if (m[i].equalsIgnoreCase(key)) {',
  '                pos = i;',
  '                break;',
  '            }',
  '        }',
  '        if (pos == -1)',
  '            System.out.println(key + " is not in the list");',
  '        else',
  '            System.out.println(key + " is at position " + (pos + 1));',
  '    }',
  '}',
);
Q('l_search', long({
  t: 5, d: 3, c: 'application', marks: 15,
  stem: 'An imagined hobby club keeps the names of six members in a String array. Write a program in Java to accept the six names (single words) and then a name to be searched. Using linear search, display the position of the name in the list, counting from 1, or a message that it is not in the list. The letter case of the name should not matter. Sample input: Ishaan Devika Rohit Anaya Kabir Sneha ROHIT',
  model: prog({ src: srcFind, stdin: 'Ishaan Devika Rohit Anaya Kabir Sneha ROHIT\n', also: ['Ishaan Devika Rohit Anaya Kabir Sneha Mohan\n'], vars: [['m', 'String[]', 'array of the six member names'], ['key', 'String', 'name to be searched'], ['pos', 'int', 'index of the match, -1 while no match is found'], ['i', 'int', 'loop variable']] }),
  sol: 'Each name of the array is compared with the key by equalsIgnoreCase. On the first match the index is stored in pos and the loop is left with break; pos still equal to -1 after the loop means that the name is absent. The position shown to the user is the index plus 1.',
  scheme: S15(3, 2, 'Names and the key read; loop with equalsIgnoreCase; match stored and loop stopped; both outcomes reported', 2, 2),
}));

// ---- name abbreviation
export const srcAbbr = code(
  'import java.util.Scanner;',
  '',
  'public class NameInitials {',
  '    // Shortens a three-word name to the initials of the first two words followed by the surname',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        String name = sc.nextLine().trim();',
  "        int first = name.indexOf(' ');",
  "        int last = name.lastIndexOf(' ');",
  '        String middle = name.substring(first + 1, last);',
  '        String surname = name.substring(last + 1);',
  '        System.out.println(name.charAt(0) + ". " + middle.charAt(0) + ". " + surname);',
  '    }',
  '}',
);
Q('l_abbrev', long({
  t: 3, d: 4, c: 'application', marks: 15,
  stem: 'A library desk of an imagined school prints members\' names in a short form. Write a program in Java to accept a name of exactly three words, separated by single spaces, and display it with the first two words replaced by their initial letters, each followed by a full stop, and the third word written in full. Use the methods indexOf, lastIndexOf, substring and charAt. Sample input: Anand Kumar Sharma',
  model: prog({ src: srcAbbr, stdin: 'Anand Kumar Sharma\n', also: ['Meera Devi Nair\n'], vars: [['name', 'String', 'the full name, with the spaces at the ends removed'], ['first', 'int', 'index of the first space'], ['last', 'int', 'index of the last space'], ['middle', 'String', 'the second word of the name'], ['surname', 'String', 'the third word of the name']] }),
  sol: 'The first space is found with indexOf and the last space with lastIndexOf. The second word is substring(first + 1, last) and the third word is substring(last + 1). The initial letters are taken with charAt(0), and char + String joins them into one output String.',
  scheme: S15(3, 2, 'Positions of the two spaces; substring for the middle word and the surname; initials with charAt(0)', 2, 2),
}));
