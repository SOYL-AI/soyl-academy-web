// Build CBSE 12 Computer Science ch04 File Handling. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch04/src/build.mjs
// Every program output shown in decks, notes and flashcards is produced by pyOut() (Python 3) in a fresh folder
// holding the files shown, never typed.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch04', 'computer-science');
usePyCache(SRC);
const { F, TXT, HILLS, STOCK, ROUTES, MARKS_CSV, BOOKS, BOOKS_SETUP, BOOKS_TEXT, outAndFile } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const code = (...lines) => lines.join('\n');
const ic = (s) => '`' + s + '`';
const rowsOf = (c, opts) => JSON.parse(pyOut(c, opts));
const H = { files: { 'hills.txt': HILLS } };

// ---------------------------------------------------------------- visuals: Part 1 (files, paths, text files)
const vRoute1 = flow('LR', ['Why files?', 'Text, binary and CSV', 'Paths', 'open() and modes', 'Writing', 'Reading', 'seek() and tell()', 'Processing lines'], 'Route map of Part 1: why files, the three kinds of file, paths, open and modes, writing, reading, seek and tell, and processing lines', 'Part 1 at a glance');
const vWhy = table(
  ['Variables in memory (RAM)', 'Data in a file'],
  [
    ['Lost when the program ends', 'Kept after the program ends (persistent)'],
    ['Belong to one run of one program', 'Can be read later or by other programs'],
    ['Fast but limited in size', 'Stored on disk; can be very large'],
  ],
  'Comparison table: variables in memory are lost when a program ends and belong to one run, while data in a file persist, can be shared and can be large',
);
const vKinds = table(
  ['Kind', 'What it stores', 'Typical use', 'Read with'],
  [
    ['Text', 'Characters in lines ending with `\\n`', 'Notices, logs, stories', '`read()`, `readline()`, `readlines()`'],
    ['Binary', 'Raw bytes, e.g. pickled Python objects', 'Records kept as lists or dictionaries', '`pickle.load()`'],
    ['CSV', 'Text lines of comma-separated values', 'Tables shared with spreadsheets', '`csv.reader()`'],
  ],
  'Table of the three kinds of file: text files store characters in lines, binary files store raw bytes such as pickled objects, and CSV files store comma-separated values; each with a typical use and how it is read',
);
const vPaths = table(
  ['Path', 'Kind', 'Meaning'],
  [
    ['`C:\\School\\CS\\notes.txt`', 'Absolute (Windows)', 'Full location from the drive root'],
    ['`/home/asha/cs/notes.txt`', 'Absolute (Linux)', 'Full location from the root /'],
    ['`notes.txt`', 'Relative', 'In the current working directory'],
    ['`data\\notes.txt`', 'Relative', 'In the data folder inside the current one'],
    ['`..\\notes.txt`', 'Relative', 'In the parent of the current folder'],
  ],
  'Table of paths: two absolute paths, one for Windows starting with C drive and one for Linux starting with slash, and three relative paths for the current folder, a sub-folder and the parent folder',
  'In a Python string write Windows paths as r"C:\\School" or with doubled backslashes.',
);
const vModes = table(
  ['Mode', 'Opens for', 'If the file exists', 'If it does not exist', 'Pointer starts at'],
  [
    ['`r`', 'Reading (default)', 'Read from the start', 'FileNotFoundError', 'Beginning'],
    ['`w`', 'Writing', 'Emptied (truncated)', 'Created', 'Beginning'],
    ['`a`', 'Appending', 'Kept; writes go at the end', 'Created', 'End'],
    ['`r+`', 'Reading and writing', 'Kept', 'FileNotFoundError', 'Beginning'],
    ['`w+`', 'Writing and reading', 'Emptied', 'Created', 'Beginning'],
    ['`a+`', 'Appending and reading', 'Kept', 'Created', 'End'],
    ['`rb` `wb` `ab` …', 'The same, in binary', 'As above', 'As above', 'As above'],
  ],
  'Table of file modes r, w, a, r plus, w plus and a plus, with what each opens for, what happens if the file exists or not, and where the file pointer starts; adding b gives the binary versions',
);
const vLifecycle = flow('LR', ['open(name, mode) gives a file object', 'read or write through the object', 'close() saves and releases the file'], 'Flow of file handling: open with a name and mode to get a file object, read or write through it, then close it to save and release the file', 'A with block does the close() for you.');
const writeDemo = code('with open("demo.txt", "w") as f:', '    n = f.write("Line one\\n")', '    f.writelines(["Line two\\n", "Line three\\n"])', 'print(n)', 'with open("demo.txt") as f:', '    print(f.read(), end="")');
const writeOut = pyOut(writeDemo).split('\n');
const vWrite = table(
  ['Statement', 'Effect'],
  [
    [ic('n = f.write("Line one\\n")'), `writes one string and returns its length: n is ${ic(writeOut[0])}`],
    [ic('f.writelines(["Line two\\n", "Line three\\n"])'), 'writes each string of the list, adding nothing between them'],
    ['File afterwards', writeOut.slice(1).map(ic).join(', ')],
  ],
  `Table of writing methods run in Python: write returns the number of characters written, here ${writeOut[0]}, and writelines writes each string of a list; the file then holds three lines`,
  'Neither method adds a newline: put \\n in the strings yourself.',
);
const readRows = [
  ['f.read()', 'print(repr(f.read()))'],
  ['f.read(6)', 'print(repr(f.read(6)))'],
  ['f.readline()', 'print(repr(f.readline()))'],
  ['f.readlines()[1]', 'print(repr(f.readlines()[1]))'],
].map(([call, body]) => [ic(call), ic(pyOut(`with open("hills.txt") as f:\n    ${body}`, H).slice(0, 70))]);
const vRead = table(
  ['Call on a freshly opened hills.txt', 'Returns (run in Python)'],
  readRows,
  'Table of reading methods on a freshly opened hills.txt, run in Python: read gives the whole file as one string, read with 6 gives the first six characters, readline gives the first line with its newline, and readlines gives a list whose item 1 is the second line',
  'read() returns one string; readline() one line; readlines() a list of lines (shown cut at 70 characters).',
);
const countCode = code('rows = []', 'lines = words = chars = 0', 'with open("hills.txt") as f:', '    for line in f:', '        lines += 1', '        words += len(line.split())', '        chars += len(line)', '        rows.append([lines, len(line.split()), len(line), words, chars])', 'import json', 'print(json.dumps(rows))');
const countRows = rowsOf(countCode, H);
const vCountTrace = table(
  ['Line', 'Words in line', 'Characters (with \\n)', 'Words so far', 'Characters so far'],
  countRows.map((r) => r.map(String)),
  `Trace table for counting lines, words and characters of hills.txt, run in Python: after ${countRows.length} lines there are ${countRows.at(-1)[3]} words and ${countRows.at(-1)[4]} characters including the newlines`,
  'Dry run produced by running the loop in Python.',
);
const FIRST = HILLS.split('\n')[0];
const pos6 = pyOut('with open("hills.txt") as f:\n    f.read(6)\n    print(f.tell())', H);
const vPointer = (() => {
  const shown = FIRST.slice(0, 13);
  const s = new Svg(600, 190);
  const w = 40, x0 = 40, y = 70;
  [...shown].forEach((ch, i) => {
    s.rect(x0 + i * w, y, w, 40, { fill: i < 6 ? 'fill' : undefined, color: 'accent', sw: 1.4, rx: 2 });
    s.text(x0 + i * w + w / 2, y + 20, ch === ' ' ? '␣' : ch, { size: 16, bold: true });
    s.text(x0 + i * w + w / 2, y + 56, String(i), { size: 12, muted: true });
  });
  const px = x0 + Number(pos6) * w;
  s.arrow(px, 30, px, y - 4, { color: 'accent', sw: 2 });
  s.text(px + 8, 24, `after read(6): tell() is ${pos6}`, { anchor: 'start', size: 13, color: 'accent' });
  s.text(300, 168, 'seek(0) moves the pointer back to position 0', { size: 13, muted: true });
  return s.visual(`Diagram of the first characters of hills.txt in numbered boxes from 0; the first six boxes, Clouds, are shaded as already read, and an arrow marks the file pointer at position ${pos6}; seek 0 moves it back to the start`, 'The file pointer marks where the next read or write happens.');
})();
const stCode = code('out = []', 'with open("stock.txt") as f:', '    out.append([f.tell(), repr(f.readline())])', '    out.append([f.tell(), repr(f.read(7))])', '    f.seek(0)', '    out.append([f.tell(), repr(f.read(4))])', 'import json', 'print(json.dumps(out))');
const stRows = rowsOf(stCode, { files: { 'stock.txt': STOCK } });
const vSeekTell = table(
  ['Step on stock.txt', 'tell() before', 'Returned'],
  [['readline()', ...stRows[0].map(String)], ['read(7)', ...stRows[1].map(String)], ['seek(0), then read(4)', ...stRows[2].map(String)]].map(([a, b, c]) => [ic(a), b, ic(c)]),
  'Table of file pointer positions on stock.txt, run in Python: readline from position 0 returns the first line, read 7 continues from position 8, and after seek 0 the pointer is back at 0',
  'Positions are counted in bytes from the start of the file.',
);
const filterCode = code('with open("routes.txt") as src, open("caps.txt", "w") as dst:', '    for line in src:', '        if line[0].isupper():', '            dst.write(line)');
const filterRun = outAndFile(filterCode, 'caps.txt', { files: { 'routes.txt': ROUTES } });
const vFilter = table(
  ['Line of routes.txt', 'First letter upper case?', 'Copied?'],
  ROUTES.trim().split('\n').map((l) => [l, /^[A-Z]/.test(l) ? 'Yes' : 'No', filterRun.file.includes(l) ? 'Yes' : 'No']),
  'Table of the five lines of routes.txt showing which begin with a capital letter and are copied to caps.txt by the program, as checked by running it in Python',
  'The Copied? column is read back from caps.txt after running the program.',
);
const errFiles = { 'diary.txt': 'Day 0: sun\n' };
const vErrors = table(
  ['Code', 'Python reports'],
  [
    ['`open("nofile.txt")`', ic(pyErr('open("nofile.txt")'))],
    ['`open("diary.txt").write("x")`', ic(pyErr('open("diary.txt").write("x")', { files: errFiles }))],
    ['`open("n.txt", "w").write(5)`', ic(pyErr('open("n.txt", "w").write(5)'))],
  ],
  'Table of three common file errors produced by running Python: opening a missing file for reading, writing to a file opened for reading, and writing a number instead of a string',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Kinds of file', 'text (lines), binary (bytes), CSV (comma-separated text)'],
    ['Paths', 'absolute from the root; relative from the current folder'],
    ['Modes', '`r` must exist; `w` empties; `a` adds at the end'],
    ['`with`', 'closes the file automatically'],
    ['Reading', '`read()` string, `readline()` one line, `readlines()` list'],
    ['Writing', '`write()` one string, `writelines()` many; add `\\n` yourself'],
    ['Pointer', '`tell()` reports, `seek(n)` moves'],
  ],
  'Summary table of Part 1: kinds of file, absolute and relative paths, the r, w and a modes, the with statement, the reading and writing methods, and tell and seek',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'File Handling — Part 1: Files, Paths and Text Files',
  goals: [
    'Tell text, binary and CSV files apart, and absolute paths from relative ones',
    'Open files in the right mode, and close them, or use a with block',
    'Read and write text files and move the file pointer with seek and tell',
    'Write programs that count, search and copy lines of a text file',
  ],
  slides: [
    sl('title', 'File Handling', {
      b: 'Part 1 — **files**, **paths**, **modes** and **text files**.',
      v: vRoute1,
      n: 'So far our programs forgot everything the moment they stopped. In this chapter we learn to keep data in files, so that it is still there tomorrow. In this first part we meet the three kinds of file, see how a program finds a file through its path, and learn to read and write text files.',
    }),
    sl('concept', 'Why do we need files?', {
      b: 'Data in variables live in **memory** and disappear when the program ends. A **file** keeps them on disk.',
      v: vWhy,
      n: 'Variables live in the computer memory, which is cleared when a program finishes. A file is stored on the disk, so its data persist after the program ends, can be read again later, and can be shared with other programs. That is why marks, bills and records are kept in files.',
    }),
    sl('concept', 'Three kinds of file', {
      v: vKinds,
      n: 'The syllabus covers three kinds of file. A text file holds characters arranged in lines, each ending with a newline character. A binary file holds raw bytes; we will use it to store Python lists and dictionaries with the pickle module. A CSV file is a text file in which each line is a record and the values are separated by commas.',
    }),
    sl('concept', 'Absolute and relative paths', {
      b: 'A **path** tells Python where a file is.',
      v: vPaths,
      n: 'An absolute path gives the full address of a file, starting from the root of the drive, such as C drive on Windows or the slash folder on Linux. A relative path starts from the folder the program is running in, called the current working directory. Two dots stand for the parent folder. Most school programs use simple relative names like notes dot t x t.',
    }),
    sl('check', 'Quick check: write mode', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_w_creates',
      n: 'Think about what write mode does when the file is missing, and what it does when the file already exists.',
    }),
    sl('concept', 'open() and file modes', {
      b: `${F('f = open("notes.txt", "a")')}\n\nThe **mode** decides what you may do and where the file pointer starts.`,
      v: vModes,
      n: 'The open function takes a file name and a mode, and returns a file object. Read mode is the default and needs the file to exist. Write mode creates the file or empties it. Append mode keeps old data and writes at the end. A plus sign adds the other operation, and the letter b gives the binary version of each mode.',
    }),
    sl('diagram', 'Open, process, close and the with statement', {
      b: F('with open("notes.txt") as f:', '    data = f.read()', '# the file is closed here'),
      v: vLifecycle,
      n: 'Every file task has three steps: open the file, read or write through the file object, and close it. Closing saves the data and releases the file. A with block does the closing for us when the block ends, even if an error interrupts it, so it is the safest way to work with files.',
    }),
    sl('concept', 'Writing: write() and writelines()', {
      b: F(writeDemo),
      v: vWrite,
      n: 'The write method writes one string and returns the number of characters written. The writelines method writes every string in a list, one after another. Neither of them adds a newline on its own, so we must put the newline character at the end of each line ourselves. Writing a number directly is an error; convert it with str first.',
    }),
    sl('concept', 'Reading: read(), readline() and readlines()', {
      b: `The file \`hills.txt\`:\n\n${TXT(HILLS)}`,
      v: vRead,
      n: 'There are three ways to read a text file. The read method returns the whole remaining file as one string, or only a given number of characters. The readline method returns one line including its newline, and an empty string at the end of the file. The readlines method returns a list of all the remaining lines. A for loop over the file object also gives one line at a time.',
    }),
    sl('example', 'Worked example 1: counting lines, words and characters', {
      b: F('lines = words = chars = 0', 'with open("hills.txt") as f:', '    for line in f:', '        lines += 1', '        words += len(line.split())', '        chars += len(line)', 'print(lines, words, chars)'),
      v: vCountTrace,
      n: 'Let us count the lines, words and characters of hills dot t x t. The loop reads one line at a time. Each pass adds one to the line count, adds the number of words found by split, and adds the length of the line, which includes its newline character. The trace table shows the totals growing line by line.',
    }),
    sl('check', 'Quick check: readlines()', {
      b: 'Predict the output, then check the answer.',
      chk: 'co_readlines_len',
      n: 'Remember what kind of value readlines returns, and that the last line may end with a newline.',
    }),
    sl('diagram', 'The file pointer', {
      v: vPointer,
      n: 'Python keeps a file pointer that marks where the next read or write will happen. When a file is opened for reading, the pointer is at position zero. Reading six characters moves it to position six. The tell method reports the position, and the seek method moves the pointer, for example back to the start with seek zero.',
    }),
    sl('concept', 'seek() and tell() in action', {
      b: `The file \`stock.txt\`:\n\n${TXT(STOCK)}`,
      v: vSeekTell,
      n: 'Here is the pointer at work on stock dot t x t. Reading the first line moves the pointer past its newline. Reading seven more characters continues from there. After seek zero the pointer is back at the start, so reading four characters gives the first word again. Positions are counted in bytes.',
    }),
    sl('check', 'Quick check: tell()', {
      b: 'Fill in the blank.',
      chk: 'fb_tell',
      n: 'One method reports where the file pointer is; another one moves it.',
    }),
    sl('check', 'Quick check: back to the start', {
      b: 'Choose the correct call.',
      chk: 'm_seek',
      n: 'Which method moves the pointer, and which position is the very beginning of the file?',
    }),
    sl('example', 'Worked example 2: copying selected lines', {
      b: `${F(filterCode)}\n\nThe file \`routes.txt\`:\n\n${TXT(ROUTES)}`,
      v: vFilter,
      n: 'A common task is to copy only some lines into a new file. Here we open routes dot t x t for reading and caps dot t x t for writing in one with statement. For each line we test whether its first letter is a capital, and if so we write the line unchanged. The table shows which lines were copied when the program was run.',
    }),
    sl('concept', 'Common errors with files', {
      v: vErrors,
      n: 'Three errors appear again and again. Opening a missing file for reading raises a file not found error. Writing to a file opened in read mode is not supported. And write accepts only strings, so writing a number raises a type error. Read the last line of the error message: it names the problem.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1: text files hold lines, binary files hold bytes and CSV files hold comma-separated text. Read mode needs an existing file, write mode empties it and append mode adds at the end. A with block closes the file for you. Use read, readline and readlines to read, write and writelines to write, and tell and seek for the pointer.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Choose the mode carefully: `w` **erases** an existing file; use `a` to add.',
        'Output questions: track the **file pointer** after every `read(n)`, `readline()` and `seek()`.',
        'Remember that lines keep their `\\n`: use `strip()` before comparing or printing.',
        'In programs, always open with `with` (or call `close()`), and convert numbers with `str()` before `write()`.',
        'Marks: 1 for opening in the right mode, 1 for the loop, 1 for the logic, and the rest for correct output.',
      ],
      n: 'Some advice for the exam. Choose the mode with care, because write mode erases an existing file. In output questions, follow the file pointer after every read and seek. Lines keep their newline characters, so strip them before comparing. In programs, use a with block and convert numbers to strings before writing. Marks are given for the mode, the loop, the logic and the output.',
    }),
  ],
});

// ---------------------------------------------------------------- visuals: Part 2 (binary and CSV files)
const vRoute2 = flow('LR', ['Binary files and pickle', 'dump() and load()', 'Reading till EOFError', 'Searching and updating', 'CSV files', 'csv.writer', 'csv.reader'], 'Route map of Part 2: binary files and pickle, dump and load, reading until EOFError, searching and updating records, CSV files, the csv writer and the csv reader', 'Part 2 at a glance');
const vPickleTerms = table(
  ['Term', 'Meaning', 'Function'],
  [
    ['Pickling (serialisation)', 'Python object → byte stream', '`pickle.dump(obj, f)`'],
    ['Unpickling (deserialisation)', 'byte stream → Python object', '`obj = pickle.load(f)`'],
    ['Binary modes', 'bytes, not characters', '`"wb"`, `"rb"`, `"ab"`, `"rb+"`'],
  ],
  'Table of pickle terms: pickling or serialisation turns an object into bytes with dump, unpickling or deserialisation turns bytes back into an object with load, and binary modes such as wb, rb and ab are used',
);
const vPickleFlow = flow('LR', ['A Python list or dictionary', 'pickle.dump() writes bytes', 'Binary file on disk', 'pickle.load() reads bytes', 'The same list or dictionary again'], 'Flow of pickling: a Python list or dictionary is written as bytes by dump into a binary file, and load reads the bytes back into an equal list or dictionary', 'Each dump() writes one object; each load() reads the next one.');
const vBooks = table(
  ['book_id', 'title', 'price (₹)'],
  BOOKS.map((r) => r.map(String)),
  'Table of the four imagined book records stored in books.dat, each as a list of book id, title and price: Desert Sky 240, Paper Boats 180, Hill Station Tales 320 and Lantern Lane 150',
  'Imagined records; each list is written with one pickle.dump().',
);
const vEofFlow = flow('TB', ['Open the file in "rb"', 'try: load() one record', 'Process the record', 'Repeat load()', 'except EOFError: stop'], 'Flow of reading a binary file to the end: open in rb, inside try load and process records repeatedly, and stop when load raises EOFError', 'The EOFError is expected: it means every record has been read.');
const traceBooks = code('import pickle', 'rows = []', 'with open("books.dat", "rb") as f:', '    try:', '        while True:', '            b = pickle.load(f)', '            rows.append([b[1], b[2], b[2] > 200])', '    except EOFError:', '        pass', 'import json', 'print(json.dumps(rows))');
const bookRows = rowsOf(traceBooks, { setup: BOOKS_SETUP });
const vSearchTrace = table(
  ['Record loaded', 'price', 'price > 200?', 'Displayed?'],
  bookRows.map(([t, p, x]) => [t, String(p), x ? 'Yes' : 'No', x ? 'Yes' : 'No']),
  `Trace table of searching books.dat for books priced above 200, run in Python: ${bookRows.filter((r) => r[2]).map((r) => r[0]).join(' and ')} are displayed`,
  'Dry run produced by running the search loop in Python.',
);
const vUpdateFlow = flow('LR', ['Load every record into a list ("rb")', 'Find the record and change it in the list', 'Dump every record back ("wb")'], 'Flow of updating a binary file: load all records into a list, change the matching record in memory, then rewrite the file by dumping every record in wb mode', 'Pickled records can differ in length, so the whole file is rewritten.');
const vCsvView = table(
  ['Line of marks.csv', 'As a spreadsheet row', 'From csv.reader'],
  MARKS_CSV.trim().split('\n').slice(0, 3).map((l, i) => [ic(l), l.split(',').join(' | '), ic(pyOut(`import csv\nwith open("marks.csv", newline="") as f:\n    print(list(csv.reader(f))[${i}])`, { files: { 'marks.csv': MARKS_CSV } }))]),
  'Table showing the first three lines of marks.csv as text, as spreadsheet cells, and as the lists of strings that csv reader returns when run in Python',
  'Every field comes back as a string.',
);
const vCsvWriter = table(
  ['Step', 'Code'],
  [
    ['Import the module', '`import csv`'],
    ['Open with `newline=""`', '`f = open("marks.csv", "w", newline="")`'],
    ['Create a writer', '`w = csv.writer(f)`'],
    ['Write one row', '`w.writerow(["roll", "name", "marks"])`'],
    ['Write many rows', '`w.writerows([[1, "Aarav", 78], [2, "Bina", 91]])`'],
    ['Close', '`f.close()` (or use `with`)'],
  ],
  'Table of the steps for writing a CSV file: import csv, open with newline equal to empty string, create a writer, write one row with writerow, write many with writerows, and close',
);
const avgCode = code('import csv', 'rows = []', 'total = 0', 'with open("marks.csv", newline="") as f:', '    r = csv.reader(f)', '    next(r)', '    for roll, name, m in r:', '        total += int(m)', '        rows.append([name, m, total])', 'rows.append(["average", "", total / (len(rows))])', 'import json', 'print(json.dumps(rows))');
const avgRows = rowsOf(avgCode, { files: { 'marks.csv': MARKS_CSV } });
const vAvgTrace = table(
  ['name', 'marks (string read)', 'total after int()'],
  avgRows.map((r) => r.map(String)),
  `Trace table of averaging the marks in marks.csv, run in Python: the totals grow to ${avgRows.at(-2)[2]} and the average is ${avgRows.at(-1)[2]}`,
  'Dry run produced by running the loop in Python; the last row is the average.',
);
const vCompare = table(
  ['Feature', 'Text', 'Binary (pickle)', 'CSV'],
  [
    ['Stores', 'characters in lines', 'bytes of Python objects', 'comma-separated text'],
    ['Human-readable?', 'Yes', 'No', 'Yes'],
    ['Write with', '`write()`, `writelines()`', '`pickle.dump()`', '`writerow()`, `writerows()`'],
    ['Read with', '`read()`, `readline()`, `readlines()`', '`pickle.load()` until EOFError', '`csv.reader()`'],
    ['Types after reading', 'str', 'the original types', 'str in every field'],
  ],
  'Comparison table of text, binary and CSV files: what each stores, whether it is human-readable, how it is written and read, and the types of the values read back',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['pickle', '`dump(obj, f)` writes, `load(f)` reads one object'],
    ['Modes', 'binary files use `"wb"`, `"rb"`, `"ab"`'],
    ['End of file', '`load()` raises EOFError: catch it'],
    ['Update', 'load all, change in memory, dump all in `"wb"`'],
    ['CSV writing', '`newline=""`, `csv.writer`, `writerow`/`writerows`'],
    ['CSV reading', '`csv.reader` gives lists of strings; `next()` skips the header'],
  ],
  'Summary table of Part 2: pickle dump and load, binary modes, EOFError at the end of the file, updating by rewriting, writing CSV files and reading them',
);

// ---------------------------------------------------------------- deck 2
const pickleDemo = code('import pickle', 'with open("books.dat", "wb") as f:', '    pickle.dump([101, "Desert Sky", 240], f)', '    pickle.dump([102, "Paper Boats", 180], f)', 'with open("books.dat", "rb") as f:', '    print(pickle.load(f))', '    print(pickle.load(f)[1])');
const csvReadDemo = code('import csv', 'with open("marks.csv", newline="") as f:', '    for row in csv.reader(f):', '        print(row)');
const part2 = deck({
  part: 2,
  title: 'File Handling — Part 2: Binary Files and CSV Files',
  goals: [
    'Store and read Python objects in binary files with pickle.dump() and pickle.load()',
    'Read a binary file to the end by handling EOFError, and search and update its records',
    'Write and read CSV files with csv.writer and csv.reader',
  ],
  slides: [
    sl('title', 'Binary Files and CSV Files', {
      b: 'Part 2 — storing **Python objects** with pickle, and **tables** in CSV files.',
      v: vRoute2,
      n: 'In Part 2 we store data that has more structure than lines of text. First we use binary files and the pickle module to save whole Python lists and dictionaries, and read them back. Then we use CSV files, which store tables that both Python and spreadsheets understand.',
    }),
    sl('concept', 'Binary files and pickle', {
      b: 'A record such as `[101, "Desert Sky", 240]` can be stored **as it is** in a binary file.',
      v: vPickleTerms,
      n: 'Writing a list to a text file would turn it into characters, and we would have to rebuild it ourselves. The pickle module does this for us. Pickling converts an object into a stream of bytes, which dump writes to a binary file. Unpickling, done by load, turns the bytes back into the same kind of object.',
    }),
    sl('diagram', 'From object to bytes and back', {
      b: `${F(pickleDemo)}\n\nOutput:\n\n${TXT(pyOut(pickleDemo))}`,
      v: vPickleFlow,
      n: 'Here two book records are dumped one after the other into books dot dat, opened in write binary mode. Reading in read binary mode, each call to load returns the next record in the order it was written. The first load gives the whole first list; the second gives the second list, from which we print the title.',
    }),
    sl('concept', 'A file of records', {
      b: `The imagined file \`books.dat\` holds four records:\n\n${BOOKS_TEXT}`,
      v: vBooks,
      n: 'Most binary file programs work with a file of records, one pickled list or dictionary per record. In our examples, books dot dat holds four imagined books, each stored as a list of the book number, the title and the price. Programs search, count, add and update these records.',
    }),
    sl('diagram', 'Reading to the end: EOFError', {
      b: F('with open("books.dat", "rb") as f:', '    try:', '        while True:', '            rec = pickle.load(f)', '            print(rec)', '    except EOFError:', '        pass'),
      v: vEofFlow,
      n: 'We usually do not know how many records a file holds. So we call load again and again in an endless loop inside a try block. When no record is left, load raises an end of file error, and the except clause quietly ends the loop. This pattern appears in almost every binary file question.',
    }),
    sl('check', 'Quick check: the read mode for pickle', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_pickle_mode_rb',
      n: 'Think about what kind of data pickle writes, and which mode suits that kind of data.',
    }),
    sl('example', 'Worked example 1: searching records', {
      b: F('import pickle', 'with open("books.dat", "rb") as f:', '    try:', '        while True:', '            b = pickle.load(f)', '            if b[2] > 200:', '                print(b[1], b[2])', '    except EOFError:', '        pass'),
      v: vSearchTrace,
      n: 'To display books costing more than two hundred rupees, we load each record in turn and test its price, which is item two of the list. Matching records are displayed. The trace table shows each record loaded, the test, and whether it was displayed, as found by running the program. The loop ends with the end of file error.',
    }),
    sl('concept', 'Updating a record', {
      v: vUpdateFlow,
      n: 'To change a record, such as the price of one book, we load every record into a list, change the matching record in memory, and then open the file again in write binary mode and dump every record back. Rewriting the whole file is safe because pickled records can be of different lengths.',
    }),
    sl('check', 'Quick check: a pickled dictionary', {
      b: 'Predict the output, then check the answer.',
      chk: 'co_pickle_round',
      n: 'Ask yourself whether the object loaded back is equal to the one dumped, and whether it is the very same object.',
    }),
    sl('concept', 'CSV files', {
      b: `The imagined file \`marks.csv\`:\n\n${TXT(MARKS_CSV)}`,
      v: vCsvView,
      n: 'A CSV file is a text file in which each line is a record and its values are separated by commas. The first line is often a header naming the columns. Spreadsheets open CSV files as tables. In Python, the csv module reads each line as a list of strings, as the table shows.',
    }),
    sl('concept', 'Writing a CSV file', {
      v: vCsvWriter,
      n: 'To write a CSV file, import the csv module and open the file with newline set to an empty string. Create a writer object from the file. Then writerow writes one list as one line, and writerows writes a list of lists, one line each. Numbers are written as text. Finally close the file, or use a with block.',
    }),
    sl('check', 'Quick check: newline', {
      b: 'Choose the correct reason.',
      chk: 'm_newline',
      n: 'Think about who adds the line endings when the csv writer writes a row.',
    }),
    sl('concept', 'Reading a CSV file', {
      b: `${F(csvReadDemo)}\n\nOutput:\n\n${TXT(pyOut(csvReadDemo, { files: { 'marks.csv': MARKS_CSV } }))}`,
      v: table(['Task', 'How'], [['Skip the header', '`next(reader)` once before the loop'], ['Use a number', '`int(row[2])` or `float(...)`'], ['All rows at once', '`rows = list(reader)`']], 'Table of reading tasks: skip the header with next, convert numbers with int or float, and get all rows with list'),
      n: 'A reader object gives one row at a time as a list of strings. The header comes first, so call next once to skip it. Because every field is a string, convert numbers with int or float before doing arithmetic. To keep all the rows, turn the reader into a list.',
    }),
    sl('example', 'Worked example 2: average marks', {
      b: F('import csv', 'total = 0', 'with open("marks.csv", newline="") as f:', '    r = csv.reader(f)', '    next(r)', '    for roll, name, m in r:', '        total += int(m)', 'print(total / 4)'),
      v: vAvgTrace,
      n: 'To find the average mark, we open marks dot c s v, create a reader and skip the header. For each row we unpack roll, name and marks, convert the marks with int and add them to the total. The trace table, produced by running the program, shows the total growing and the average at the end.',
    }),
    sl('check', 'Quick check: is CSV text?', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_csv_text',
      n: 'Think about what you would see if you opened a CSV file in a plain text editor.',
    }),
    sl('two-column', 'Text, binary and CSV compared', {
      cols: [
        '**Text and CSV** are characters: readable, but every value read back is a string.',
        '**Binary (pickle)** keeps Python objects and their types, but people cannot read the file.',
      ],
      v: vCompare,
      n: 'Let us compare the three kinds of file. Text and CSV files are readable by people, but every value read back is a string. Binary files written with pickle keep whole Python objects with their types, but they cannot be read in an editor. Choose the kind of file that suits the data and who will use it.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2: pickle dump writes an object and load reads one back, using binary modes. Reading to the end means catching the end of file error. To update, load everything, change it, and dump it all again. For CSV files, open with newline empty, write with writerow or writerows, and read with the csv reader, which gives strings.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Binary files: always `import pickle` and use `"rb"`, `"wb"` or `"ab"`.',
        'Reading till the end: `while True` with `load()` inside `try`, and `except EOFError`.',
        'Updating: read **all** records, change, then rewrite **all** in `"wb"`.',
        'CSV: `newline=""` when writing; `next(reader)` to skip a header; `int()` before adding.',
        'Marks: imports and modes, the loop, the condition, and the output each earn credit.',
      ],
      n: 'For the exam, remember to import pickle and to use binary modes. To read every record, put load inside a try block in an endless loop and catch the end of file error. To update, read everything, change it and rewrite everything. With CSV files, use newline empty when writing, skip the header with next, and convert numbers before adding them.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const pickleAppend = code('import pickle', 'with open("books.dat", "ab") as f:', '    pickle.dump([105, "Blue Kettle", 210], f)', 'n = 0', 'with open("books.dat", "rb") as f:', '    try:', '        while True:', '            pickle.load(f)', '            n += 1', '    except EOFError:', '        pass', 'print(n)');
const N = notes({
  title: 'File Handling — notes',
  sections: [
    {
      h: '1. Files, kinds of file and paths',
      t: 1,
      b: 'A **file** keeps data on disk after a program ends (data in variables are lost).\n\n- **Text file:** characters in lines; each line ends with the EOL character `\\n`. Readable in any editor.\n- **Binary file:** raw bytes, e.g. Python objects stored with **pickle**; not human-readable.\n- **CSV file:** a text file of **comma-separated values**, one record per line; opens in spreadsheets.\n\n**Paths.** An **absolute path** starts at the root (`C:\\School\\cs\\a.txt`, `/home/asha/cs/a.txt`). A **relative path** starts at the **current working directory** (`a.txt`, `data\\a.txt`, `..\\a.txt`, where `..` is the parent folder).',
      terms: [
        ['EOL', 'End-of-line character (\\n) that ends each line of a text file.'],
        ['Absolute path', 'The full location of a file from the root of the drive.'],
        ['Relative path', 'A location worked out from the current working directory.'],
      ],
      v: vKinds,
      vs: [vPaths],
    },
    {
      h: '2. Opening and closing files',
      t: 2,
      b: '`f = open(name, mode)` returns a **file object**; `f.close()` saves and releases the file.\n\n- `"r"` read (default; file must exist), `"w"` write (creates or **empties**), `"a"` append (creates or adds at the end).\n- `"r+"`, `"w+"`, `"a+"` add the other operation; add `b` for binary: `"rb"`, `"wb"`, `"ab"`.\n\nThe **with statement** closes the file automatically, even after an error:\n\n' + F('with open("notes.txt", "a") as f:', '    f.write("New entry\\n")'),
      terms: [
        ['File object', 'The object returned by open(), through which a program reads or writes.'],
        ['Context manager', 'The with statement, which closes the file when its block ends.'],
      ],
      v: vModes,
      vs: [vLifecycle],
    },
    {
      h: '3. Reading and writing text files',
      t: 2,
      b: '**Writing:** `write(s)` writes one string and returns its length; `writelines(list)` writes each string. Neither adds `\\n`. Convert numbers with `str()`.\n\n**Reading:** `read()` → whole remaining text as one string; `read(n)` → n characters; `readline()` → one line (`""` at the end of the file); `readlines()` → list of lines; `for line in f:` → one line per pass.\n\nOutput of the writing example (run in Python):\n\n' + TXT(writeOut.slice(1).join('\n')),
      v: vRead,
      vs: [vWrite],
    },
    {
      h: '4. seek(), tell() and processing lines',
      t: 2,
      b: '`tell()` gives the file pointer\'s position in bytes; `seek(n)` moves it to byte n (`seek(0)` = start).\n\nTypical processing tasks: count lines, words (`split()`), characters (`len()`), or lines that start with a letter; display long words; copy selected lines to another file opened in `"w"` mode.\n\n' + F('with open("routes.txt") as src, open("caps.txt", "w") as dst:', '    for line in src:', '        if line[0].isupper():', '            dst.write(line)') + `\n\nResulting \`caps.txt\` (run in Python):\n\n${TXT(filterRun.file)}`,
      v: vPointer,
      vs: [vSeekTell, vCountTrace],
    },
    {
      h: '5. Binary files with pickle',
      t: 3,
      b: '`import pickle`. **Pickling** (`pickle.dump(obj, f)`) writes an object as bytes; **unpickling** (`pickle.load(f)`) reads the next object back.\n\n- Open in `"wb"` (new file), `"ab"` (add records) or `"rb"` (read).\n- **Read till the end:** call `load()` in `while True` inside `try`, and stop on `except EOFError`.\n- **Search:** load each record and test it; use a flag to report "not found".\n- **Update:** load all records into a list, change in memory, dump all again in `"wb"`.\n\nAppending a fifth record and counting again (run in Python):\n\n' + F(pickleAppend) + `\n\nOutput: ${ic(pyOut(pickleAppend, { setup: BOOKS_SETUP }))}`,
      terms: [
        ['Pickling', 'Converting a Python object into a byte stream (serialisation) with dump().'],
        ['Unpickling', 'Rebuilding the object from the byte stream (deserialisation) with load().'],
        ['EOFError', 'Raised by load() when no object is left in the file.'],
      ],
      v: vPickleFlow,
      vs: [vEofFlow, vUpdateFlow],
    },
    {
      h: '6. CSV files',
      t: 4,
      b: '`import csv`. Open with `newline=""` so that the writer controls line endings.\n\n- **Writing:** `w = csv.writer(f)`, then `w.writerow(list)` or `w.writerows(list_of_lists)`.\n- **Reading:** `for row in csv.reader(f):` gives each line as a **list of strings**; `next(reader)` skips the header; convert numbers with `int()`.\n\n' + F(csvReadDemo) + `\n\nOutput (run in Python):\n\n${TXT(pyOut(csvReadDemo, { files: { 'marks.csv': MARKS_CSV } }))}`,
      terms: [
        ['CSV', 'Comma-separated values: a text file holding a table, one record per line.'],
        ['Delimiter', 'The character that separates fields (a comma by default).'],
      ],
      v: vCsvWriter,
      vs: [vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Opening an existing file in `"w"` when the task says *add*: the old data are lost.\n- Forgetting `\\n` in `write()`, or comparing a line without `strip()`.\n- Writing numbers without `str()` (TypeError).\n- Using text modes with pickle, or forgetting `import pickle`.\n- Reading a binary file with a fixed loop count instead of handling **EOFError**.\n- Adding CSV fields without `int()`, or forgetting to skip the header.\n\n**How marks are usually awarded**\n- Output questions: each correct line of output.\n- Functions on files: importing the module, opening in the right mode, the loop, the condition or logic, and the result.\n- Error-finding: 1 mark per error identified and corrected.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Why store data in a **file**?', 'Data in variables are lost when the program ends; a file keeps them on disk.', 'concept', 1],
  ['**Text** vs **binary** file', 'Text: characters in lines with `\\n`, readable. Binary: raw bytes, not human-readable.', 'concept', 1],
  ['What is a **CSV** file?', 'A text file of comma-separated values, one record per line.', 'definition', 1],
  ['**Absolute** path', 'Full location from the root, e.g. `C:\\School\\a.txt`.', 'definition', 1],
  ['**Relative** path', 'Location from the current working directory, e.g. `data\\a.txt`; `..` is the parent.', 'definition', 1],
  ['Default mode of `open()`', '`"r"` (read, text).', 'fact', 2],
  ['Mode `"w"` on an existing file', 'The file is **emptied** (truncated).', 'exam-tip', 2],
  ['Mode `"a"`', 'Keeps old data and writes at the **end**; creates the file if missing.', 'fact', 2],
  ['`"r"` or `"r+"` on a missing file', '**FileNotFoundError**.', 'fact', 2],
  ['Why use `with open(...) as f:`?', 'The file is closed automatically, even if an error occurs.', 'concept', 2],
  ['`write()` returns…', 'The number of characters written.', 'fact', 2],
  ['Does `writelines()` add newlines?', '**No**; put `\\n` in each string.', 'exam-tip', 2],
  ['`read()` vs `readline()` vs `readlines()`', 'Whole text (str) / one line (str) / all lines (list).', 'concept', 2],
  ['`readline()` at the end of a file', 'Returns an empty string `""`.', 'fact', 2],
  ['`tell()`', 'Current position of the file pointer, in bytes.', 'definition', 2],
  ['`seek(0)`', 'Moves the file pointer back to the start.', 'fact', 2],
  [`On ${ic('hills.txt')}: tell() after ${ic('read(6)')}`, ic(pos6), 'example', 2],
  ['`f.write(25)` on a text file', `${ic(pyErr('open("n.txt", "w").write(25)').split(':')[0])}: write() needs a string; use str(25).`, 'exam-tip', 2],
  ['**Pickling**', 'Converting a Python object to a byte stream with `pickle.dump(obj, f)`.', 'definition', 3],
  ['**Unpickling**', 'Rebuilding the object with `pickle.load(f)`.', 'definition', 3],
  ['Modes for binary files', '`"wb"`, `"rb"`, `"ab"` (and `"rb+"`, `"wb+"`).', 'fact', 3],
  ['How many objects does one `load()` read?', 'Exactly **one**: the next one dumped.', 'fact', 3],
  ['Signal that a binary file is finished', '`load()` raises **EOFError**; catch it with try-except.', 'concept', 3],
  ['Three steps to update a pickled record', 'Load all into a list → change in memory → dump all in `"wb"`.', 'concept', 3],
  ['Module for CSV files', '`csv`', 'fact', 4],
  ['Why `newline=""` for CSV?', 'Stops extra blank lines: the writer adds its own line endings.', 'exam-tip', 4],
  ['`writerow()` vs `writerows()`', 'One row (a list) vs many rows (a list of lists).', 'concept', 4],
  ['Type of each field from `csv.reader`', '**str**; convert numbers with `int()`.', 'exam-tip', 4],
  ['Skip a CSV header', 'Call `next(reader)` once before the loop.', 'fact', 4],
  ['Which file keeps Python types after reading?', 'A **binary** file written with pickle.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests (cbse-12-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — File Handling',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_text_binary', 'm_mode_w', 'm_dump', 'ar_with'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words (or code) and the 3-mark question in about 60 words (or code).', items: ['s_text_binary', 's_err_mode', 's3_count_t'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the output for the file given.', items: [{ attempt: 1, keys: ['l_word_stats', 'l_bin_search'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_diary_text'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — File Handling',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_abs_path', 'm_rplus_missing', 'm_tell', 'm_with_close', 'm_write_int', 'm_eoferror', 'm_writerows', 'm_reader_strings', 'ar_csv_strings', 'ar_pickle_objects'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words (or code) and 3-mark questions in about 60 words (or code).', items: ['s_abs_rel', 's_writerow_rows', { attempt: 1, keys: ['s_err_missing', 's_err_pickle_eof'] }, 's3_write_writelines', { attempt: 1, keys: ['s3_update_steps', 's3_csv_toppers'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18. Show the output for the files given.', items: ['l_copy_filter', { attempt: 1, keys: ['l_bin_update', 'l_csv_add_show'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_library_bin', 'cb_canteen_csv'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-computer-science-ch04 only (files, paths and file types; text files; binary files with pickle; CSV files)',
    originality: 'every program, file, record and scenario written for this chapter by SOYL; no textbook, NCERT or board-paper program reused (D-036)',
    execution: 'every output in items, slides, notes and flashcards produced by running the code with Python 3 (runPy in lib.mjs) in a fresh folder holding the files shown; binary files created by hidden setup code described in the stems; results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
