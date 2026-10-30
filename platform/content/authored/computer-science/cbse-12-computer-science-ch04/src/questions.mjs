// CBSE 12 Computer Science, ch04 File Handling — question bank. Every program, file, record and scenario is
// written by SOYL (imagined schools, shops and people); no textbook, NCERT or board-paper program is reused (D-036).
// Every output stated anywhere in an item is produced by running the code with Python 3 through runPy()/pyOut()
// in lib.mjs, in a fresh folder that holds exactly the files shown in the stem (`files`), plus binary or CSV files
// created by hidden `setup` code that the stem describes in a text block.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

const S2 = [25, 50];
const S3 = [40, 75];
/** A Python code fence. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
/** A plain-text fence (file contents). */
export const TXT = (s) => '```text\n' + s.replace(/\n$/, '') + '\n```';
const code = (...lines) => lines.join('\n');
const ic = (s) => '`' + s + '`';
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
/** Output of `c` and then the contents of file `name` after `c` has run (both from one Python run). */
export function outAndFile(c, name, opts = {}) {
  const tail = `\nprint("@@FILE@@")\nwith open(${JSON.stringify(name)}) as _f:\n    print(_f.read(), end="")`;
  const r = pyOut(c + tail, opts);
  const [out, file] = r.split('@@FILE@@');
  return { out: out.replace(/\n$/, ''), file: file.replace(/^\n/, '') };
}

// ---------------------------------------------------------------- shared files (imagined, written by SOYL)
export const HILLS = 'Clouds gather over the hills\nthe bus waits at the stop\ntea stalls open one by one\nEvening lights come on\n';
export const STOCK = 'pens 40\nerasers 15\nnotebooks 60\nrulers 25\n';
export const ROUTES = 'Route 7 Kothrud\nroute 12 Aundh\nRoute 3 Hadapsar\nroute 9 Baner\nRoute 21 Wakad\n';
export const MARKS_CSV = 'roll,name,marks\n1,Aarav,78\n2,Bina,91\n3,Chetan,64\n4,Divya,85\n';
export const BOOKS = [
  [101, 'Desert Sky', 240],
  [102, 'Paper Boats', 180],
  [103, 'Hill Station Tales', 320],
  [104, 'Lantern Lane', 150],
];
export const BOOKS_SETUP = code(
  'import pickle as _p',
  'with open("books.dat", "wb") as _f:',
  `    for _r in ${JSON.stringify(BOOKS)}:`,
  '        _p.dump(_r, _f)',
);
export const BOOKS_TEXT = TXT(BOOKS.map((r) => JSON.stringify(r).replace(/,/g, ', ')).join('\n'));

// ================================================================ t01 Files, paths and file types
Q('m_text_binary', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which statement about **text** and **binary** files is correct?',
  opts: [
    'A text file stores characters with an end-of-line marker; a binary file stores bytes exactly as they are in memory',
    'A binary file can be read and edited easily in a text editor such as Notepad',
    'A text file can store only numbers, never letters',
    'A binary file always has the extension .txt',
  ],
  sol: 'Text files hold human-readable characters, organised into lines that end with an EOL character. Binary files hold raw bytes (for example pickled Python objects), which look like junk in a text editor. Extensions are only conventions.',
}));
Q('m_csv_delim', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is the **default delimiter** that separates values in a CSV file?',
  opts: ['A comma', 'A tab', 'A semicolon', 'A newline'],
  sol: 'CSV stands for comma-separated values. Each record is one line, and its fields are separated by commas by default; another delimiter can be chosen with the delimiter argument.',
}));
Q('m_abs_path', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Kavya keeps her project at `D:\\Class12\\Project`. Which of these is an **absolute** path to the file `scores.txt` inside its `data` folder?',
  opts: [ic('D:\\Class12\\Project\\data\\scores.txt'), ic('data\\scores.txt'), ic('..\\data\\scores.txt'), ic('.\\scores.txt')],
  sol: 'An absolute path starts from the root of the drive (D:\\) and names every folder on the way. The other three are relative paths, worked out from the current working directory.',
}));
Q('m_rel_parent', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A program runs from the folder `/home/ravi/school/cs`. Which file does the relative path `../maths/sums.txt` refer to?',
  opts: [ic('/home/ravi/school/maths/sums.txt'), ic('/home/ravi/school/cs/maths/sums.txt'), ic('/home/maths/sums.txt'), ic('/maths/sums.txt')],
  sol: 'Two dots mean the parent of the current folder, here /home/ravi/school. From there the path goes into maths and names sums.txt.',
}));
Q('tf_binary_editor', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? A file written with the `pickle` module usually shows unreadable symbols when opened in a plain text editor.',
  sol: 'pickle writes a binary encoding of Python objects, not lines of characters, so a text editor shows symbols that do not make sense to a reader.',
}));
Q('fb_eol', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In a Python text file, each line ends with the end-of-line character, written in code as ___.',
  acc: [['\\n', 'newline', 'new line']],
  sol: 'The EOL character \\n (newline) marks the end of each line of a text file.',
}));
Q('mt_file_kinds', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each file used by an imagined school office with the most suitable kind of file.',
  pairs: [
    ['A notice to be read in any editor', 'Text file'],
    ['Student records kept as Python lists', 'Binary file written with pickle'],
    ['A marks table to be opened in a spreadsheet', 'CSV file'],
    ['A location written as data/notice.txt', 'Relative path'],
  ],
  sol: 'Readable notices are text files; Python objects are pickled into binary files; tables for spreadsheets are CSV files; a path that starts from the current folder is relative.',
}));
Q('s_text_binary', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two differences between a text file and a binary file.',
  model: '1. A **text file** stores characters in lines ending with **EOL** and is readable in any editor; a **binary file** stores **raw bytes** and is not human-readable.\n2. Text is translated (encoding, newlines) when read or written; binary data are copied **exactly as bytes**, and can hold Python objects through pickle.',
  sol: 'Two clear differences, one mark each.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_abs_rel', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Differentiate between an absolute path and a relative path, with one example of each for a file `fees.csv` kept in `C:\\Accounts\\2026`.',
  model: '1. An **absolute path** gives the full location from the root, e.g. `C:\\Accounts\\2026\\fees.csv`; it works from any current folder.\n2. A **relative path** is worked out from the **current working directory**; if the program runs in `C:\\Accounts`, the path is `2026\\fees.csv`.',
  sol: 'Explain both kinds and give a matching example of each.',
  scheme: [['Absolute path with example', 1], ['Relative path with example', 1]],
}));

// ================================================================ t02 Text files
Q('m_mode_w', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Rohan opens an existing file `log.txt`, which already has 20 lines, with `open("log.txt", "w")` and writes one line. How many lines does the file have afterwards?',
  opts: ['1', '21', '20', 'An error is raised because the file exists'],
  sol: 'Mode "w" creates the file if needed and truncates (empties) an existing file, so only the newly written line remains. Mode "a" would have kept the 20 lines and added one.',
}));
Q('m_mode_a', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Which file mode adds new data at the **end** of an existing text file without deleting what is already there?',
  opts: [ic('"a"'), ic('"w"'), ic('"r"'), ic('"x"')],
  sol: 'Append mode places the file pointer at the end, so writes are added after the existing contents. "w" empties the file and "r" opens it only for reading.',
}));
const cRplusMissing = code('f = open("missing.txt", "r+")');
Q('m_rplus_missing', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'What happens when this statement runs in a folder where `missing.txt` does **not** exist?\n\n' + F(cRplusMissing),
  opts: [
    `It raises ${ic(pyErr(cRplusMissing).split(':')[0])}`,
    'It creates an empty file and opens it for reading and writing',
    'It opens the file in append mode',
    'It returns None',
  ],
  sol: 'Modes "r" and "r+" need the file to exist; they never create it. Python reports: ' + pyErr(cRplusMissing) + '. Modes "w+" and "a+" would create it.',
}));
Q('m_read_type', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What type of value does `f.readlines()` return for a text file?',
  opts: ['A list of strings, one per line', 'A single string', 'A tuple of lines', 'An integer count of lines'],
  sol: 'readlines() returns a list whose items are the lines, each still ending with \\n (except perhaps the last). read() returns one string; readline() returns one line.',
}));
Q('m_with_close', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why do programmers prefer `with open("notes.txt") as f:` to calling `open()` and `close()` separately?',
  opts: [
    'The file is closed automatically when the block ends, even if an error occurs',
    'It makes the file read-only for other programs',
    'It reads the whole file into memory at once',
    'It is the only way to open a file in append mode',
  ],
  sol: 'The with statement is a context manager: it closes the file at the end of the block, even when an exception interrupts the block, so data is flushed and the file is released.',
}));
const cTell = code('with open("hills.txt") as f:', '    f.read(6)', '    print(f.tell())');
Q('m_tell', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The file `hills.txt` begins with the line `Clouds gather over the hills`. What does this program print?\n\n' + F(cTell),
  opts: distinct([ic(pyOut(cTell, { files: { 'hills.txt': HILLS } })), ic('0'), ic('7'), ic('5')]),
  sol: 'tell() gives the current position of the file pointer in bytes from the start. After reading 6 characters of plain ASCII text, the pointer stands at position 6.',
}));
Q('m_seek', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'After reading part of a file, which call moves the file pointer back to the very beginning?',
  opts: [ic('f.seek(0)'), ic('f.tell(0)'), ic('f.seek(-1)'), ic('f.read(0)')],
  sol: 'seek(offset) moves the pointer to the given byte position from the start, so seek(0) returns to the beginning. tell() only reports the position.',
}));
const cWriteInt = code('with open("count.txt", "w") as f:', '    f.write(25)');
Q('m_write_int', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Anu wants to store the number of visitors in a file. What happens when her code runs?\n\n' + F(cWriteInt),
  opts: [
    `A ${ic(pyErr(cWriteInt).split(':')[0])} is raised, because write() accepts only a string`,
    'The file contains 25',
    'The file contains the binary form of 25',
    'Nothing is written, but no error is raised',
  ],
  sol: 'write() on a text file needs a str. Python reports: ' + pyErr(cWriteInt) + '. Writing str(25) fixes it.',
}));
Q('m_readline_end', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A loop reads a text file with `line = f.readline()` repeatedly. How does the program know it has reached the end of the file?',
  opts: [
    'readline() returns an empty string',
    'readline() returns None',
    'readline() raises EOFError',
    'readline() returns the string "\\n"',
  ],
  sol: 'At the end of a text file, readline() returns an empty string "". A blank line inside the file is returned as "\\n", which is not empty, so the loop does not stop early. EOFError belongs to pickle.load().',
}));
Q('ar_with', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'A file opened with a `with` statement does not need an explicit call to `close()`.',
  r: 'The `with` statement closes the file automatically when control leaves its block.',
  sol: 'Both are true and R is exactly why A holds: leaving the with block (normally or through an error) closes the file.',
}));
Q('ar_readlines_newline', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Each item returned by `readlines()` usually ends with the newline character.',
  r: 'The `read()` method returns the whole remaining file as one string.',
  sol: 'Both are true, but R describes read(), not why readlines() keeps the \\n: the lines are returned exactly as stored, including their EOL characters.',
}));
Q('tf_w_creates', tf({
  t: 2, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Opening a file that does not exist in mode `"w"` creates a new, empty file.',
  sol: 'Write mode creates the file if it is missing (and empties it if it exists). Only the read modes "r" and "r+" raise FileNotFoundError for a missing file.',
}));
Q('fb_tell', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The file method ___ returns the current position of the file pointer, and seek() changes it.',
  acc: [['tell()', 'tell']],
  sol: 'tell() reports the position in bytes from the beginning of the file.',
}));
Q('ord_copy', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of a program that copies only the lines containing a word from `a.txt` to `b.txt`.',
  items: [
    'Open a.txt in read mode and b.txt in write mode',
    'Read a line from a.txt',
    'Check whether the line contains the word',
    'If it does, write the line to b.txt',
    'Close both files when every line has been read',
  ],
  sol: 'Open both files, then for each line read, test it and write it if it matches; close the files at the end (or let a with block close them).',
}));

// --- code-output: text files
Q('co_read_parts', co({
  t: 2, d: 2, c: 'application', marks: 2,
  pre: 'The input file `hills.txt` contains:\n\n' + TXT(HILLS) + '\nThis program mixes read(6) with two readline() calls on it. Write its exact output.',
  code: code('with open("hills.txt") as f:', '    a = f.read(6)', '    b = f.readline()', '    c = f.readline()', 'print(a)', 'print(b.strip())', 'print(c, end="")'),
  run: { files: { 'hills.txt': HILLS } },
  sol: 'read(6) takes "Clouds". The first readline() returns the rest of that line, " gather over the hills\\n", which strip() trims. The next readline() returns the whole second line, printed with its own newline and end="".',
}));
Q('co_readlines_len', co({
  t: 2, d: 2, c: 'understanding', marks: 1, time: 60,
  pre: 'The input file `hills.txt` contains:\n\n' + TXT(HILLS) + '\nThis program counts its lines with readlines() and shows the last one in capitals. Write its exact output.',
  code: code('with open("hills.txt") as f:', '    lines = f.readlines()', 'print(len(lines), lines[-1].upper().strip())'),
  run: { files: { 'hills.txt': HILLS } },
  sol: 'readlines() gives a list with one item per line: 4 lines. The last line is upper-cased and its newline stripped.',
}));
Q('co_count_words', co({
  t: 2, d: 3, c: 'application', marks: 2,
  pre: 'The input file `hills.txt` contains:\n\n' + TXT(HILLS) + '\nThis program counts the words of the file and finds the longest word. Write its exact output.',
  code: code('words = 0', 'longest = ""', 'with open("hills.txt") as f:', '    for line in f:', '        for w in line.split():', '            words += 1', '            if len(w) > len(longest):', '                longest = w', 'print(words, longest)'),
  run: { files: { 'hills.txt': HILLS } },
  sol: 'Iterating over the file gives one line at a time; split() breaks each line into words. The counter goes through every word, and longest is replaced only by a strictly longer word, so the first word of the greatest length is kept.',
}));
Q('co_seek_tell', co({
  t: 2, d: 3, c: 'analysis', marks: 2,
  pre: 'The input file `stock.txt` contains:\n\n' + TXT(STOCK) + '\nThis program reads from `stock.txt`, moves back with seek(0) and reports tell(). Write its exact output.',
  code: code('with open("stock.txt") as f:', '    print(f.read(4))', '    f.seek(0)', '    print(f.readline().split()[1])', '    print(f.tell())'),
  run: { files: { 'stock.txt': STOCK } },
  sol: 'read(4) gives "pens". seek(0) goes back to the start, so readline() returns the whole first line "pens 40\\n", whose second word is 40. The first line has 8 bytes including its newline, so tell() gives 8.',
}));
Q('co_append_read', co({
  t: 2, d: 3, c: 'application', marks: 2,
  pre: 'The input file `stock.txt` contains:\n\n' + TXT(STOCK) + '\nThis program appends a line for glue to `stock.txt` and reads the file back. Write its exact output.',
  code: code('with open("stock.txt", "a") as f:', '    f.write("glue 10\\n")', 'with open("stock.txt") as f:', '    items = f.readlines()', 'print(len(items))', 'print(items[0].strip(), "|", items[-1].strip())'),
  run: { files: { 'stock.txt': STOCK } },
  sol: 'Append mode adds "glue 10" after the four existing lines, giving 5 lines. The first and last lines are printed without their newlines, separated by " | ".',
}));
Q('co_filter_routes', co({
  t: 2, d: 3, c: 'application', marks: 2,
  pre: 'The input file `routes.txt` contains:\n\n' + TXT(ROUTES) + '\nThis program lists the areas of the routes whose lines start with a capital R. Write its exact output.',
  code: code('count = 0', 'with open("routes.txt") as f:', '    for line in f:', '        if line.startswith("Route"):', '            count += 1', '            print(line.split()[2], end=" ")', 'print()', 'print(count)'),
  run: { files: { 'routes.txt': ROUTES } },
  sol: 'startswith() is case-sensitive, so only the lines beginning with a capital R count. For each, the third word (the area) is printed on one line; then a newline and the count.',
}));
Q('co_strip_lens', co({
  t: 2, d: 2, c: 'understanding', marks: 1, time: 60,
  pre: 'The input file `stock.txt` contains:\n\n' + TXT(STOCK) + '\nThis program measures the characters, newlines and words of `stock.txt`. Write its exact output.',
  code: code('with open("stock.txt") as f:', '    data = f.read()', 'print(len(data), data.count("\\n"), len(data.split()))'),
  run: { files: { 'stock.txt': STOCK } },
  sol: 'read() returns the whole file as one string; its length counts every character including the four newlines. split() with no argument splits on any whitespace, giving 8 words.',
}));
const cWritelines = code('with open("out.txt", "w") as f:', '    f.writelines(["red", "amber", "green"])', '    f.write("\\nstop")', 'with open("out.txt") as f:', '    print(f.read())');
Q('co_writelines', co({
  pre: 'This program writes traffic-light colours to `out.txt` with writelines() and then reads the file. Write its exact output.',
  t: 2, d: 3, c: 'analysis', marks: 2,
  code: cWritelines,
  sol: 'writelines() writes each string exactly as given; it does not add newlines, so the three words run together on one line. The write() call then adds a newline and "stop".',
}));

// --- error-finding and written answers: text files
const cErrNotWritable = code('f = open("diary.txt", "r")', 'f.write("Day 1: rain")', 'f.close()');
const cErrNotWritableFix = code('f = open("diary.txt", "a")', 'f.write("Day 1: rain\\n")', 'f.close()');
Q('s_err_mode', short({
  t: 2, d: 2, c: 'analysis', marks: 2,
  stem: 'Ira wants to add an entry to her existing diary file, but the program stops with an error. Name the error, explain it and correct the code so that old entries are kept.\n\n' + F(cErrNotWritable),
  model: `**Error:** ${ic(pyErr(cErrNotWritable, { files: { 'diary.txt': 'Day 0: sun\n' } }))}. A file opened in read mode "r" cannot be written to.\n\n**Corrected code** (append mode keeps the old entries):\n\n${F(cErrNotWritableFix)}`,
  sol: 'Identify the unsupported write on a read-only file and change the mode to "a" (not "w", which would erase the diary).',
  scheme: [['Error named with its reason', 1], ['Mode changed to append', 1]],
}));
const cErrMissing = code('with open("results.txt") as f:', '    print(f.read())');
Q('s_err_missing', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'This program runs in a folder that does not contain `results.txt`. What happens? Suggest one way to handle the situation in the program.\n\n' + F(cErrMissing),
  model: `Python raises ${ic(pyErr(cErrMissing))}, because mode "r" (the default) needs an existing file.\n\nHandle it with exception handling:\n\n${F('try:', '    with open("results.txt") as f:', '        print(f.read())', 'except FileNotFoundError:', '    print("results.txt not found")')}\n\nOutput: ${ic(pyOut(code('try:', '    with open("results.txt") as f:', '        print(f.read())', 'except FileNotFoundError:', '    print("results.txt not found")')))}`,
  sol: 'Name FileNotFoundError and handle it with try/except (or create the file first in "w" or "a" mode).',
  scheme: [['FileNotFoundError with reason', 1], ['A correct way to handle it', 1]],
}));
Q('s_read_trio', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between `read()`, `readline()` and `readlines()` by what each returns.',
  model: '1. `read()` returns the **whole remaining file as one string** (or `n` characters with `read(n)`).\n2. `readline()` returns **one line** (up to and including `\\n`), and `""` at the end of the file.\n3. `readlines()` returns a **list of all remaining lines**.',
  sol: 'What each method returns; two of three correct earns 1 mark.',
  scheme: [['Two methods correctly described', 1], ['All three correctly described', 1]],
}));
Q('s3_write_writelines', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the difference between `write()` and `writelines()`. Write one statement using each to store the lines `Maths` and `Physics` in a file object `f`, each on its own line.',
  model: '1. `write(s)` writes **one string** and returns the number of characters written.\n2. `writelines(seq)` writes **every string of a list (or other sequence)** one after another.\n3. Neither adds a newline by itself, so `\\n` must be included:\n\n' + F('f.write("Maths\\nPhysics\\n")', 'f.writelines(["Maths\\n", "Physics\\n"])'),
  sol: 'One mark for each method and one for correct statements with explicit newlines.',
  scheme: [['write() explained', 1], ['writelines() explained', 1], ['Both statements correct with \\n', 1]],
}));
const cCountT = code(
  'def count_t():',
  '    n = 0',
  '    with open("hills.txt") as f:',
  '        for line in f:',
  '            if line[0] in "Tt":',
  '                n += 1',
  '    return n',
  '',
  'print(count_t())',
);
Q('s3_count_t', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Write a function `count_t()` that counts and returns the number of lines in `hills.txt` that begin with the letter T or t. Show the result for the file below.\n\n' + TXT(HILLS),
  model: `${F(cCountT)}\n\nOutput: ${ic(pyOut(cCountT, { files: { 'hills.txt': HILLS } }))} (the lines beginning "the bus" and "tea stalls").`,
  sol: 'Open the file, loop over its lines, test the first character against both cases, and return the count.',
  scheme: [['File opened and read line by line', 1], ['Correct test for T or t', 1], ['Count returned, correct result', 1]],
}));
const cCopyFilter = code(
  'def copy_without(word):',
  '    kept = 0',
  '    with open("routes.txt") as src, open("short.txt", "w") as dst:',
  '        for line in src:',
  '            if word.lower() not in line.lower():',
  '                dst.write(line)',
  '                kept += 1',
  '    return kept',
  '',
  'print(copy_without("route 1"))',
);
const copyRun = outAndFile(cCopyFilter, 'short.txt', { files: { 'routes.txt': ROUTES } });
Q('l_copy_filter', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: 'Write a function `copy_without(word)` that copies every line of `routes.txt` that does **not** contain `word` (ignoring case) into a new file `short.txt`, and returns the number of lines copied. Show the return value and the contents of `short.txt` for `copy_without("route 1")` with this `routes.txt`:\n\n' + TXT(ROUTES),
  model: `${F(cCopyFilter)}\n\nOutput: ${ic(copyRun.out)}\n\n\`short.txt\` afterwards:\n\n${TXT(copyRun.file)}\n\nIgnoring case, only the line "route 12 Aundh" contains the text "route 1", so it is the only line left out.`,
  sol: 'Open the source for reading and the target for writing, test each line case-insensitively with not in, write the kept lines and count them.',
  scheme: [['Both files opened in the right modes', 1], ['Loop over lines', 1], ['Case-insensitive test', 1], ['Lines written and counted', 1], ['Correct output and file', 1]],
}));
const cWordStats = code(
  'def long_words(n):',
  '    found = []',
  '    with open("hills.txt") as f:',
  '        for w in f.read().split():',
  '            if len(w) > n:',
  '                found.append(w)',
  '    print(" ".join(found))',
  '    print("Count:", len(found))',
  '',
  'long_words(5)',
);
Q('l_word_stats', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'Write a function `long_words(n)` that displays all words of `hills.txt` that have **more than** `n` characters, on one line, followed by their count. Show the output of `long_words(5)` for this file:\n\n' + TXT(HILLS),
  model: `${F(cWordStats)}\n\nOutput:\n\n${TXT(pyOut(cWordStats, { files: { 'hills.txt': HILLS } }))}`,
  sol: 'Read the file, split into words, filter on length, display them and the count.',
  scheme: [['File opened and read', 1], ['Words split', 1], ['Length test', 1], ['Display and count', 1], ['Correct output', 1]],
}));

// ================================================================ t03 Binary files with pickle
Q('m_dump', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which statement writes the list `rec` into the binary file object `f`?',
  opts: [ic('pickle.dump(rec, f)'), ic('pickle.load(rec, f)'), ic('f.write(rec)'), ic('pickle.dump(f, rec)')],
  sol: 'pickle.dump(object, file) serialises the object into the file. load() reads an object back; write() on a binary file needs bytes; the arguments of dump() are object first, file second.',
}));
Q('m_wb', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In which mode must a file be opened to store new pickled records, replacing any old contents?',
  opts: [ic('"wb"'), ic('"w"'), ic('"rb"'), ic('"ab"')],
  sol: 'Pickled data are bytes, so a binary mode is needed; "wb" writes and empties any old contents. "ab" would keep them and add at the end; "rb" only reads.',
}));
Q('m_eoferror', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A program calls `pickle.load(f)` in a loop to read every record of a binary file. What signals that all records have been read?',
  opts: [
    `An ${ic('EOFError')} is raised, which the program catches with try-except`,
    'load() returns an empty string',
    'load() returns None',
    'load() raises FileNotFoundError',
  ],
  sol: 'Each load() reads one pickled object. When no object is left, load() raises EOFError, so reading-till-the-end loops wrap load() in try and stop in except EOFError.',
}));
const cPickleText = code('import pickle', 'with open("data.dat", "w") as f:', '    pickle.dump([1, 2], f)');
Q('m_pickle_text', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why does this program fail?\n\n' + F(cPickleText),
  opts: [
    'The file is opened in text mode "w", but dump() writes bytes',
    'A list cannot be pickled',
    'The file name must end in .txt',
    'dump() needs the file to exist already',
  ],
  sol: 'dump() produces bytes, and a text-mode file accepts only str. Python reports: ' + pyErr(cPickleText) + '. Opening with "wb" fixes it.',
}));
Q('ar_pickle_objects', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'A dictionary of student records can be stored in a binary file and read back as a dictionary.',
  r: 'The pickle module converts Python objects into a byte stream and back again.',
  sol: 'Both are true and R explains A: pickling (serialisation) turns the dictionary into bytes for dump(), and unpickling with load() rebuilds the same dictionary.',
}));
Q('ar_load_count', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'One call to `pickle.load()` returns exactly one object, the one written by a single `dump()`.',
  r: 'A binary file can hold only one pickled object.',
  sol: 'A is true: each load() returns the next object in the order they were dumped. R is false: many objects can be dumped one after another into the same file, which is why we read in a loop.',
}));
Q('tf_pickle_mode_rb', tf({
  t: 3, d: 1, c: 'recall', ans: false,
  stem: 'True or false? To read pickled records, a binary file should be opened in mode `"r"`.',
  sol: 'Pickled data are bytes, so the file must be opened in "rb" (or "rb+"). Text mode would try to decode the bytes as characters.',
}));
Q('fb_unpickle', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Converting a byte stream back into a Python object with pickle.load() is called ___.',
  acc: [['unpickling', 'deserialisation', 'deserialization', 'de-serialisation']],
  sol: 'Pickling (serialisation) converts an object to bytes; unpickling (deserialisation) converts the bytes back into the object.',
}));
Q('co_pickle_round', co({
  pre: 'This program pickles a student dictionary into `stu.dat` and loads it back. Write its exact output.',
  t: 3, d: 2, c: 'understanding', marks: 2,
  code: code('import pickle', 'rec = {"roll": 7, "name": "Meera", "marks": [88, 92]}', 'with open("stu.dat", "wb") as f:', '    pickle.dump(rec, f)', 'with open("stu.dat", "rb") as f:', '    back = pickle.load(f)', 'print(back["name"], sum(back["marks"]))', 'print(back == rec, back is rec)'),
  sol: 'load() rebuilds an equal dictionary, so == is True, but it is a new object in memory, so is gives False. The name and the sum of the marks list are printed first.',
}));
const cPickleLoop = code(
  'import pickle',
  'count = 0',
  'total = 0',
  'with open("books.dat", "rb") as f:',
  '    try:',
  '        while True:',
  '            b = pickle.load(f)',
  '            count += 1',
  '            total += b[2]',
  '    except EOFError:',
  '        pass',
  'print(count, total)',
);
Q('co_pickle_loop', co({
  t: 3, d: 3, c: 'application', marks: 2,
  pre: '`books.dat` holds these four records, each written with one `pickle.dump()` (book id, title, price):\n\n' + BOOKS_TEXT + '\nThis program counts the books in `books.dat` and totals their prices. Write its exact output.',
  code: cPickleLoop,
  run: { setup: BOOKS_SETUP },
  sol: 'The loop loads one record at a time until load() raises EOFError, which ends the loop. It counts four books and adds their prices.',
}));
const cPickleSearch = code(
  'import pickle',
  'found = False',
  'with open("books.dat", "rb") as f:',
  '    try:',
  '        while True:',
  '            b = pickle.load(f)',
  '            if b[2] < 200:',
  '                print(b[1])',
  '                found = True',
  '    except EOFError:',
  '        pass',
  'if not found:',
  '    print("None cheaper")',
);
Q('co_pickle_search', co({
  t: 3, d: 3, c: 'application', marks: 2,
  pre: '`books.dat` holds these four records, each written with one `pickle.dump()`:\n\n' + BOOKS_TEXT + '\nThis program searches `books.dat` for books priced below 200. Write its exact output.',
  code: cPickleSearch,
  run: { setup: BOOKS_SETUP },
  sol: 'Every record is loaded and tested; titles of books priced below 200 are printed in file order, and found becomes True, so the last message is not printed.',
}));
const cErrPickleRead = code('import pickle', 'with open("books.dat", "rb") as f:', '    for i in range(5):', '        print(pickle.load(f)[1])');
Q('s_err_pickle_eof', short({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: '`books.dat` holds exactly four pickled records. Sana reads it with the code below. What goes wrong, and how should the loop be written?\n\n' + F(cErrPickleRead),
  model: `The loop asks for five records, so after printing four titles the fifth load() raises ${ic(pyErr(cErrPickleRead, { setup: BOOKS_SETUP }))}.\n\nRead until the end instead of a fixed count:\n\n${F('import pickle', 'with open("books.dat", "rb") as f:', '    try:', '        while True:', '            print(pickle.load(f)[1])', '    except EOFError:', '        pass')}`,
  sol: 'Identify the EOFError on the extra load() and replace the fixed loop with a while True loop inside try-except EOFError.',
  scheme: [['EOFError identified with reason', 1], ['Correct read-till-end loop', 1]],
}));
Q('s3_update_steps', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the steps a program follows to **update** the price of one book in a binary file of pickled records.',
  model: '1. Open the file in **"rb"** mode and **load every record** into a list (until EOFError).\n2. **Search** the list for the book id and change its price in memory; note whether it was found.\n3. Open the file again in **"wb"** mode and **dump every record** back, so the file holds the updated data. (Alternatively, write the records to a temporary file and rename it.)',
  sol: 'Read all, change in memory, write all back; one mark per step.',
  scheme: [['Read all records', 1], ['Search and modify', 1], ['Write all records back', 1]],
}));
const cBinSearch = code(
  'import pickle',
  '',
  'def costly(limit):',
  '    n = 0',
  '    with open("books.dat", "rb") as f:',
  '        try:',
  '            while True:',
  '                b = pickle.load(f)',
  '                if b[2] > limit:',
  '                    print(b[0], b[1], b[2])',
  '                    n += 1',
  '        except EOFError:',
  '            pass',
  '    if n == 0:',
  '        print("No book costs more than", limit)',
  '',
  'costly(200)',
  'costly(400)',
);
Q('l_bin_search', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: 'The binary file `books.dat` stores records of the form `[book_id, title, price]`, one `pickle.dump()` per record. Write a function `costly(limit)` that displays every book priced **above** `limit`, or a suitable message if there is none. Show the output of `costly(200)` and `costly(400)` for these records:\n\n' + BOOKS_TEXT,
  model: `${F(cBinSearch)}\n\nOutput:\n\n${TXT(pyOut(cBinSearch, { setup: BOOKS_SETUP }))}`,
  sol: 'Open in "rb", load in a try loop until EOFError, test the price, display and count; print a message when nothing matched.',
  scheme: [['pickle imported and file opened in rb', 1], ['Read-till-end loop with EOFError', 1], ['Correct condition and display', 1], ['Message when none found', 1], ['Correct output', 1]],
}));
const cBinUpdate = code(
  'import pickle',
  '',
  'def change_price(book_id, new_price):',
  '    books = []',
  '    with open("books.dat", "rb") as f:',
  '        try:',
  '            while True:',
  '                books.append(pickle.load(f))',
  '        except EOFError:',
  '            pass',
  '    found = False',
  '    for b in books:',
  '        if b[0] == book_id:',
  '            b[2] = new_price',
  '            found = True',
  '    with open("books.dat", "wb") as f:',
  '        for b in books:',
  '            pickle.dump(b, f)',
  '    return found',
  '',
  'print(change_price(102, 210), change_price(110, 99))',
  'with open("books.dat", "rb") as f:',
  '    pickle.load(f)',
  '    print(pickle.load(f))',
);
Q('l_bin_update', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: 'Using the same `books.dat` (records `[book_id, title, price]`), write a function `change_price(book_id, new_price)` that updates the price of the given book in the file and returns `True` if the book was found, otherwise `False`. Show the output of the test lines at the end of the program.\n\n' + BOOKS_TEXT,
  model: `${F(cBinUpdate)}\n\nOutput:\n\n${TXT(pyOut(cBinUpdate, { setup: BOOKS_SETUP }))}\n\nBook 110 does not exist, so the second call returns False and leaves the file unchanged in content.`,
  sol: 'Load all records, modify the matching one, dump all records back in "wb" mode, return the flag.',
  scheme: [['All records read', 1], ['Matching record changed', 1], ['File rewritten in wb', 1], ['Flag returned', 1], ['Correct output', 1]],
}));

// ================================================================ t04 CSV files
Q('m_csv_writer', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which statement creates a writer object for the open file `f` so that rows can be written to a CSV file?',
  opts: [ic('w = csv.writer(f)'), ic('w = csv.write(f)'), ic('w = f.writer()'), ic('w = csv.reader(f)')],
  sol: 'csv.writer(fileobject) returns a writer whose writerow() and writerows() methods write rows; csv.reader() is for reading.',
}));
Q('m_newline', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why is a CSV file usually opened with `newline=""`, as in `open("marks.csv", "w", newline="")`?',
  opts: [
    'So that the csv module controls line endings and no extra blank lines appear between rows',
    'So that the file is opened in binary mode',
    'So that every value is written on a new line',
    'So that the first row is treated as a header',
  ],
  sol: 'The csv writer adds its own line terminator. Without newline="", text mode may translate it again (on Windows), leaving a blank line after every row.',
}));
Q('m_writerows', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Dev has a list `rows = [[1, "Asha"], [2, "Bilal"], [3, "Charu"]]`. Which single statement writes all three rows with the writer `w`?',
  opts: [ic('w.writerows(rows)'), ic('w.writerow(rows)'), ic('w.write(rows)'), ic('w.writelines(rows)')],
  sol: 'writerows() takes a list of rows and writes each as one line. writerow(rows) would write one line whose fields are the three lists.',
}));
const cCsvType = code('import csv', 'with open("marks.csv", newline="") as f:', '    r = csv.reader(f)', '    next(r)', '    row = next(r)', 'print(row, type(row[2]).__name__)');
Q('m_reader_strings', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: '`marks.csv` contains:\n\n' + TXT(MARKS_CSV) + '\nWhat does this program print?\n\n' + F(cCsvType),
  opts: distinct([ic(pyOut(cCsvType, { files: { 'marks.csv': MARKS_CSV } })), ic("[1, 'Aarav', 78] int"), ic("['roll', 'name', 'marks'] str"), ic("['1', 'Aarav', 78] int")]),
  sol: 'The first next() skips the header row. csv.reader returns every field as a string, so the row is a list of three strings and the marks field has type str.',
}));
Q('ar_csv_strings', ar({
  t: 4, d: 2, c: 'analysis', key: 'a',
  a: 'To total the marks column of a CSV file, each value must be converted with `int()` (or `float()`).',
  r: 'csv.reader returns every field of a row as a string.',
  sol: 'Both are true and R explains A: adding the strings "78" and "91" would join them, not add them, so they must be converted to numbers first.',
}));
Q('tf_csv_text', tf({
  t: 4, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? A CSV file is a kind of text file and can be opened in a text editor as well as in a spreadsheet.',
  sol: 'CSV files are plain text: each record is a line and fields are separated by commas, so any text editor can show them.',
}));
Q('mt_csv_methods', match({
  t: 4, d: 2, c: 'understanding',
  stem: 'Match each part of the csv module with what it does.',
  pairs: [
    [ic('csv.writer(f)'), 'Creates an object that writes rows to a file'],
    [ic('writerow(row)'), 'Writes one list as one line'],
    [ic('writerows(rows)'), 'Writes a list of lists, one line each'],
    [ic('csv.reader(f)'), 'Gives each line back as a list of strings'],
  ],
  sol: 'writer() and reader() create the objects; writerow() writes one row and writerows() many; the reader yields lists of strings.',
}));
const cCsvRead = code('import csv', 'with open("marks.csv", newline="") as f:', '    for row in csv.reader(f):', '        if row[0] != "roll" and int(row[2]) >= 80:', '            print(row[1], row[2], sep=":")');
Q('co_csv_read', co({
  t: 4, d: 2, c: 'application', marks: 2,
  pre: 'The input file `marks.csv` contains:\n\n' + TXT(MARKS_CSV) + '\nThis program lists the students in `marks.csv` who scored 80 or more. Write its exact output.',
  code: cCsvRead,
  run: { files: { 'marks.csv': MARKS_CSV } },
  sol: 'The header row is skipped by the first test; marks are converted with int() before comparing; sep=":" joins name and marks with a colon.',
}));
const cCsvSum = code('import csv', 'total = 0', 'with open("marks.csv", newline="") as f:', '    r = csv.reader(f)', '    head = next(r)', '    rows = list(r)', 'for row in rows:', '    total += int(row[2])', 'print(head[2], len(rows), total / len(rows))');
Q('co_csv_avg', co({
  t: 4, d: 3, c: 'application', marks: 2,
  pre: 'The input file `marks.csv` contains:\n\n' + TXT(MARKS_CSV) + '\nThis program finds the number of students in `marks.csv` and their average mark. Write its exact output.',
  code: cCsvSum,
  run: { files: { 'marks.csv': MARKS_CSV } },
  sol: 'next() takes the header; list(r) collects the four remaining rows; the marks are summed after int() and divided by 4 with true division, which gives a float.',
}));
const cCsvWrite = code('import csv', 'rows = [["kit", 2, 150], ["bag", 1, 600]]', 'with open("order.csv", "w", newline="") as f:', '    w = csv.writer(f)', '    w.writerow(["item", "qty", "price"])', '    w.writerows(rows)', 'with open("order.csv") as f:', '    print(f.read(), end="")');
Q('co_csv_write', co({
  pre: 'This program writes a shop order to `order.csv` with a csv writer and prints the file. Write its exact output.',
  t: 4, d: 2, c: 'understanding', marks: 2,
  code: cCsvWrite,
  sol: 'writerow() writes the header and writerows() one line per inner list; numbers are written as text; fields are joined with commas. Reading the file back shows three lines.',
}));
const cCsvDelim = code('import csv', 'with open("t.csv", "w", newline="") as f:', '    csv.writer(f, delimiter="|").writerow(["Pune", 41, "hot"])', 'with open("t.csv", newline="") as f:', '    print(next(csv.reader(f)))', '    f.seek(0)', '    print(f.read().strip())');
Q('co_csv_delim', co({
  pre: 'This program writes a weather row to `t.csv` with "|" as the delimiter and reads it back with a default reader. Write its exact output.',
  t: 4, d: 4, c: 'analysis', marks: 2,
  code: cCsvDelim,
  sol: 'The row is written with | as the delimiter. A reader with the default comma delimiter finds no comma, so the whole line comes back as a single field. After seek(0), the raw line shows the | separators.',
}));
const cCsvSplit = code('with open("marks.csv") as f:', '    for line in f:', '        print(line.split(","))', '        break');
Q('s_csv_vs_split', short({
  t: 4, d: 3, c: 'analysis', marks: 2,
  stem: 'Zoya reads `marks.csv` (first line `roll,name,marks`) with plain text methods instead of the csv module:\n\n' + F(cCsvSplit) + '\nWrite its output and state one advantage of using `csv.reader` instead.',
  model: `Output: ${ic(pyOut(cCsvSplit, { files: { 'marks.csv': MARKS_CSV } }))}. The last field keeps the newline character.\n\nAdvantage: \`csv.reader\` removes line endings and correctly handles fields that contain commas inside quotes, which a plain \`split(",")\` would break apart.`,
  sol: 'Output with the trailing \\n on the last field; one valid advantage of the csv module.',
  scheme: [['Correct output including the newline', 1], ['One valid advantage', 1]],
}));
Q('s_writerow_rows', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between `writerow()` and `writerows()` of a csv writer object, with an example of each.',
  model: '1. `writerow(row)` writes **one row** (a list) as one line, e.g. `w.writerow(["roll", "name"])`.\n2. `writerows(rows)` writes **several rows** from a list of lists, one line each, e.g. `w.writerows([[1, "Asha"], [2, "Bilal"]])`.',
  sol: 'One row versus many rows, each with an example.',
  scheme: [['writerow() with example', 1], ['writerows() with example', 1]],
}));
const cCsvToppers = code(
  'import csv',
  '',
  'def toppers(cut):',
  '    with open("marks.csv", newline="") as f:',
  '        r = csv.reader(f)',
  '        next(r)',
  '        for roll, name, m in r:',
  '            if int(m) >= cut:',
  '                print(roll, name, m)',
  '',
  'toppers(85)',
);
Q('s3_csv_toppers', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: 'Write a function `toppers(cut)` that reads `marks.csv` (with a header row `roll,name,marks`) and displays the records of students who scored `cut` or more. Show the output of `toppers(85)` for:\n\n' + TXT(MARKS_CSV),
  model: `${F(cCsvToppers)}\n\nOutput:\n\n${TXT(pyOut(cCsvToppers, { files: { 'marks.csv': MARKS_CSV } }))}`,
  sol: 'Open with newline="", create a reader, skip the header with next(), convert marks with int() and compare.',
  scheme: [['Reader created and header skipped', 1], ['int() conversion and comparison', 1], ['Correct display and output', 1]],
}));
const cCsvAdd = code(
  'import csv',
  '',
  'def add_student(roll, name, marks):',
  '    with open("marks.csv", "a", newline="") as f:',
  '        csv.writer(f).writerow([roll, name, marks])',
  '',
  'def show_all():',
  '    with open("marks.csv", newline="") as f:',
  '        rows = list(csv.reader(f))',
  '    for row in rows[1:]:',
  '        print(" - ".join(row))',
  '    print("Students:", len(rows) - 1)',
  '',
  'add_student(5, "Esha", 73)',
  'show_all()',
);
Q('l_csv_add_show', long({
  t: 4, d: 3, c: 'application', marks: 5,
  stem: 'Write two functions for the school file `marks.csv` (header `roll,name,marks`):\n\n- `add_student(roll, name, marks)` appends one record;\n- `show_all()` displays every record (without the header) with the fields joined by " - ", followed by the number of students.\n\nShow the output of `add_student(5, "Esha", 73)` followed by `show_all()` for this file:\n\n' + TXT(MARKS_CSV),
  model: `${F(cCsvAdd)}\n\nOutput:\n\n${TXT(pyOut(cCsvAdd, { files: { 'marks.csv': MARKS_CSV } }))}`,
  sol: 'Append mode with newline="" and writerow(); read all rows with a reader, skip the header, join the fields and count.',
  scheme: [['Append mode with newline=""', 1], ['writerow() used correctly', 1], ['Reader and header skipped', 1], ['Display and count', 1], ['Correct output', 1]],
}));
Q('l_file_kinds', long({
  t: [1, 4], d: 3, c: 'analysis', marks: 5, wl: [100, 150],
  stem: 'A school wants to store (a) the text of its daily notices, (b) student records as Python dictionaries to be searched and updated by a program, and (c) a marks table that teachers will also open in a spreadsheet. Suggest a suitable file type for each, and justify your choices by comparing text, binary and CSV files.',
  model: '1. **(a) Text file:** notices are characters in lines; anyone can read or edit them in a text editor.\n2. **(b) Binary file with pickle:** dictionaries are dumped and loaded **as Python objects**, with no conversion to strings; the data are not readable by people, which also discourages casual editing.\n3. **(c) CSV file:** a CSV file is plain text with comma-separated fields, so **spreadsheets** and the **csv module** can both use it.\n4. **Text and CSV** files store everything as characters, so numbers must be converted with int() after reading; **binary** files keep the types.\n5. Reading: text files with read()/readline(); binary files with **load() until EOFError**; CSV files with **csv.reader**.',
  sol: 'Three choices with reasons and a comparison of the three kinds of file.',
  scheme: [['Text file for notices, with reason', 1], ['Binary file for records, with reason', 1], ['CSV for the marks table, with reason', 1], ['Comparison of how data are stored', 1], ['How each is read', 1]],
}));

// ================================================================ case-based
const cLib = code(
  'import pickle',
  'def issue(book_id):',
  '    recs = []',
  '    with open("library.dat", "rb") as f:',
  '        try:',
  '            while True:',
  '                recs.append(pickle.load(f))',
  '        except EOFError:',
  '            pass',
  '    for r in recs:',
  '        if r["id"] == book_id and r["copies"] > 0:',
  '            r["copies"] -= 1',
  '    with open("library.dat", "wb") as f:',
  '        for r in recs:',
  '            pickle.dump(r, f)',
);
const LIB_RECS = [
  { id: 11, title: 'Kite Days', copies: 2 },
  { id: 12, title: 'Salt Roads', copies: 0 },
  { id: 13, title: 'Night Train', copies: 1 },
];
const LIB_SETUP = code('import pickle as _p', 'with open("library.dat", "wb") as _f:', `    for _r in ${JSON.stringify(LIB_RECS)}:`, '        _p.dump(_r, _f)');
const libAfter = pyOut(cLib + '\n' + code('issue(11)', 'issue(12)', 'with open("library.dat", "rb") as f:', '    print([pickle.load(f)["copies"] for i in range(3)])'), { setup: LIB_SETUP });
Q('cb_library_bin', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case about the Sunrise School library program and answer the questions. *(Imagined school and books, written by SOYL for practice.)*',
  passage: `The Sunrise School library keeps one dictionary per book in the binary file \`library.dat\`:\n\n${TXT(LIB_RECS.map((r) => JSON.stringify(r).replace(/,/g, ', ').replace(/:/g, ': ')).join('\n'))}\n\nA student volunteer wrote this function to issue a book:\n\n${F(cLib)}`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', fixed: true, key: 'b', stem: 'After `issue(11)` and then `issue(12)`, what are the copies of books 11, 12 and 13 in the file?', opts: [ic('[2, 0, 1]'), ic(libAfter), ic('[1, -1, 1]'), ic('[0, 0, 1]')], sol: 'Book 11 had 2 copies and drops to 1. Book 12 has no copies, so the condition copies > 0 is False and nothing changes. Book 13 is untouched.' })),
    child('b', fb({ t: 3, d: 1, c: 'recall', stem: 'The loop that reads records stops when pickle.load() raises the exception ___.', acc: [['EOFError']], sol: 'At the end of the file, load() raises EOFError, which the except clause catches.' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why does the function open the file a second time in "wb" mode instead of writing the changed record in place?', model: 'Records were loaded into the list `recs` and changed **in memory**. Pickled records can have different lengths, so the safe way is to **rewrite the whole file** with "wb", dumping every record (changed and unchanged) again.', sol: 'Changes are made in memory and the whole file is rewritten, because records cannot simply be overwritten in place.', scheme: [['Changes are in memory', 1], ['Whole file rewritten', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Change the function so that it prints "Not available" when the requested book has no copies left. Write only the changed lines.', model: F('        if r["id"] == book_id:', '            if r["copies"] > 0:', '                r["copies"] -= 1', '            else:', '                print("Not available")'), sol: 'Split the test: match the id first, then check copies and print the message in the else.', scheme: [['Id matched first', 1], ['Else branch with the message', 1]] }),
    ]),
  ],
}));
export const SALES_CSV = 'day,item,qty,rate\nMon,samosa,40,12\nMon,tea,65,10\nTue,samosa,35,12\nTue,juice,20,25\n';
const cSales = code('import csv', 'total = {}', 'with open("sales.csv", newline="") as f:', '    r = csv.reader(f)', '    next(r)', '    for day, item, qty, rate in r:', '        total[day] = total.get(day, 0) + int(qty) * int(rate)', 'print(total)');
Q('cb_canteen_csv', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case about the Riverside canteen sales file and answer the questions. *(Imagined canteen and figures, written by SOYL for practice.)*',
  passage: `The Riverside School canteen records its sales in \`sales.csv\`:\n\n${TXT(SALES_CSV)}\n\nThe treasurer runs this program to find the takings for each day:\n\n${F(cSales)}`,
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', fixed: true, key: 'c', stem: 'What does the program print?', opts: [ic("{'Mon': 105, 'Tue': 55}"), ic("{'Mon': 650, 'Tue': 920}"), ic(pyOut(cSales, { files: { 'sales.csv': SALES_CSV } })), ic("{'Mon': 1150}")], sol: 'Monday: 40 × 12 + 65 × 10 = 480 + 650 = 1130. Tuesday: 35 × 12 + 20 × 25 = 420 + 500 = 920.' })),
    child('b', fb({ t: 4, d: 1, c: 'understanding', stem: 'The statement next(r) is used to skip the ___ row of the file.', acc: [['header', 'heading', 'first']], sol: 'next(r) reads and discards the header row day,item,qty,rate.' })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What would happen if `int(qty) * int(rate)` were written as `qty * rate`? Explain.', model: 'csv.reader gives **strings**, and multiplying two strings is not allowed, so Python raises a **TypeError** ("can\'t multiply sequence by non-int of type \'str\'"). The values must be converted to numbers first.', sol: 'Fields are strings; str * str is a TypeError.', scheme: [['Fields are strings', 1], ['TypeError and its cause', 1]] }), [
      short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write statements to add the record `Wed, tea, 50, 10` to the end of `sales.csv`.', model: F('with open("sales.csv", "a", newline="") as f:', '    csv.writer(f).writerow(["Wed", "tea", 50, 10])'), sol: 'Open in append mode with newline="" and use writerow() with a list.', scheme: [['Append mode with newline=""', 1], ['writerow() with the record', 1]] }),
    ]),
  ],
}));
export const DIARY = 'Mon: rain, no match\nTue: practice at 6\nWed: rain again\nThu: match won\n';
const cDiary = code('with open("diary.txt") as f:', '    lines = f.readlines()', 'rainy = [x.split(":")[0] for x in lines if "rain" in x]', 'print(rainy, len(lines))');
Q('cb_diary_text', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case about Tara\'s cricket-club diary and answer the questions. *(Imagined club and entries, written by SOYL for practice.)*',
  passage: `Tara keeps her cricket club\'s weekly diary in a text file, \`diary.txt\`:\n\n${TXT(DIARY)}\n\nShe writes a program to list the days on which it rained:\n\n${F(cDiary)}`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', fixed: true, key: 'd', stem: 'What does the program print?', opts: [ic("['Mon', 'Wed'] 2"), ic("['Mon'] 4"), ic("['Mon: rain, no match', 'Wed: rain again'] 4"), ic(pyOut(cDiary, { files: { 'diary.txt': DIARY } }))], sol: 'readlines() gives four lines. The lines containing "rain" are Monday and Wednesday; split(":")[0] keeps only the day.' })),
    child('b', mcq({ t: 2, d: 2, c: 'understanding', fixed: true, key: 'a', stem: 'Tara wants to add a new entry for Friday without losing the old ones. Which mode should she use?', opts: [ic('"a"'), ic('"w"'), ic('"r"'), ic('"rb"')], sol: 'Append mode adds at the end and keeps the existing entries; "w" would erase them.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write statements to add the line `Fri: nets at 5` to the diary.', model: F('with open("diary.txt", "a") as f:', '    f.write("Fri: nets at 5\\n")'), sol: 'Append mode and write() with a newline at the end.', scheme: [['Append mode', 1], ['write() with \\n', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the program use `"rain" in x` rather than `x.startswith("rain")`?', model: 'Each line starts with the **day name** ("Mon: ..."), so `startswith("rain")` is never True. The membership test `in` finds "rain" **anywhere** in the line.', sol: 'Lines begin with the day, so only a membership test finds the word.', scheme: [['Lines begin with the day', 1], ['in finds the word anywhere', 1]] }),
    ]),
  ],
}));
