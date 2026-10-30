// Build CBSE 12 Computer Science ch09 Interface of Python with an SQL Database. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch09/src/build.mjs
// Students see mysql.connector programs; every output shown is produced by running the same program through
// Python's sqlite3 (toSqlite() in questions.mjs explains the five rewrites), never typed by hand.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch09', 'computer-science');
usePyCache(SRC);
const { F, OUT, code, ic, my, rowsOf, CON, SCHOOL, SHOP, CLINIC, cConnected, oConnected } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const prog = (db, ...lines) => code(...CON(db), ...lines);
const cell = (v) => (typeof v === 'number' ? String(v) : v);
const dbTable = (schema, q, alt, caption) => {
  const r = rowsOf(schema, q);
  return table(r.cols, r.rows.map((row) => row.map(cell)), alt, caption);
};

// ---------------------------------------------------------------- executed demonstrations
const cTagore = prog('school',
  'cur.execute("SELECT name, fee FROM student WHERE house = \'Tagore\' ORDER BY roll")',
  'data = cur.fetchall()',
  'print(data)',
  'for name, fee in data:',
  '    print(name, "pays", fee)',
  'mycon.close()',
);
const oTagore = my(cTagore, SCHOOL);
const cFetchOne = prog('school',
  'cur.execute("SELECT name FROM student WHERE house = \'Raman\' ORDER BY roll")',
  'print(cur.fetchone())',
  'print(cur.fetchone())',
  'print(cur.fetchone())',
);
const oFetchOne = my(cFetchOne, SCHOOL);
const cPtr = prog('school',
  'cur.execute("SELECT roll FROM student ORDER BY roll")',
  'a = cur.fetchmany(2)',
  'b = cur.fetchone()',
  'c = cur.fetchall()',
  'print(a)',
  'print(b)',
  'print(c)',
);
const oPtr = my(cPtr, SCHOOL).split('\n');
const cSecCount = prog('school',
  'cur.execute("SELECT sec, COUNT(*) FROM student GROUP BY sec ORDER BY sec")',
  'for sec, n in cur.fetchall():',
  '    print("Section", sec, "has", n, "student(s)")',
  'mycon.close()',
);
const oSecCount = my(cSecCount, SCHOOL);
const cInsert = prog('clinic',
  'cur.execute("SELECT COUNT(*) FROM patient")',
  'print("Before:", cur.fetchone()[0])',
  'cur.execute("INSERT INTO patient VALUES (16, \'Tara\', \'Ortho\', 52)")',
  'mycon.commit()',
  'print("Inserted:", cur.rowcount)',
  'cur.execute("SELECT COUNT(*) FROM patient")',
  'print("After:", cur.fetchone()[0])',
  'mycon.close()',
);
const oInsert = my(cInsert, CLINIC).split('\n');
const cForgot = code(
  ...CON('clinic'),
  'cur.execute("INSERT INTO patient VALUES (16, \'Tara\', \'Ortho\', 52)")',
  'mycon.close()                       # no commit()',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  '                                passwd="your_password", database="clinic")',
  'cur = mycon.cursor()',
  'cur.execute("SELECT COUNT(*) FROM patient")',
  'print("Rows now:", cur.fetchone()[0])',
);
const oForgot = my(cForgot, CLINIC);
const cRow = prog('shop',
  'cur.execute("UPDATE item SET qty = qty + 25 WHERE qty < 15")',
  'mycon.commit()',
  'print("Restocked:", cur.rowcount)',
  'cur.execute("DELETE FROM item WHERE price > 100")',
  'mycon.commit()',
  'print("Removed:", cur.rowcount)',
);
const oRow = my(cRow, SHOP);
const cParam = prog('shop',
  'max_price = 60',
  'cur.execute("SELECT iname, price FROM item WHERE price <= %s ORDER BY price", (max_price,))',
  'for row in cur.fetchall():',
  '    print(row)',
);
const oParam = my(cParam, SHOP);
const cFormat = prog('shop',
  'max_price = 60',
  'q = "SELECT iname, price FROM item WHERE price <= {} ORDER BY price".format(max_price)',
  'print(q)',
  'cur.execute(q)',
  'print(len(cur.fetchall()), "items")',
);
const oFormat = my(cFormat, SHOP);
const cInput = code(
  'import mysql.connector',
  'con = mysql.connector.connect(host="localhost", user="root",',
  '                              passwd="your_password", database="shop")',
  'cur = con.cursor()',
  'code_no = int(input("Item code: "))',
  'name = input("Item name: ")',
  'price = int(input("Price: "))',
  'qty = int(input("Quantity: "))',
  'cur.execute("INSERT INTO item VALUES (%s, %s, %s, %s)", (code_no, name, price, qty))',
  'con.commit()',
  'cur.execute("SELECT * FROM item WHERE icode = %s", (code_no,))',
  'print()',
  'print("Saved:", cur.fetchone())',
  'con.close()',
);
const inInput = '106\nEraser\n10\n50\n';
const oInput = my(cInput, SHOP, inInput);
const cTry = prog('school',
  'try:',
  '    cur.execute("INSERT INTO student VALUES (%s, %s, %s, %s, %s)",',
  '                (2, "Hari", "12A", 4500, "Bose"))',
  '    mycon.commit()',
  '    print("Saved")',
  'except mysql.connector.Error:',
  '    print("Could not save: roll 2 already exists")',
  'mycon.close()',
);
const oTry = my(cTry, SCHOOL);

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Why connect Python to MySQL', 'The connector module', 'connect()', 'cursor()', 'execute()', 'fetchone, fetchall, fetchmany'], 'Route map of Part 1: why connect Python to MySQL, the connector module, connect, cursor, execute, and the three fetch methods', 'Part 1 at a glance');
const vArch = (() => {
  const s = new Svg(660, 210);
  const boxes = [
    [10, 'Python program', '(the client)'],
    [230, 'mysql.connector', '(the driver)'],
    [450, 'MySQL server', 'database: school'],
  ];
  for (const [x, a, b] of boxes) {
    s.rect(x, 60, 200, 80, { fill: 'fill', color: 'accent' });
    s.text(x + 100, 90, a, { bold: true, size: 15 });
    s.text(x + 100, 116, b, { size: 13, muted: true });
  }
  s.arrow(210, 85, 230, 85, { color: 'accent' });
  s.arrow(430, 85, 450, 85, { color: 'accent' });
  s.arrow(230, 118, 210, 118, { color: 'blue' });
  s.arrow(450, 118, 430, 118, { color: 'blue' });
  s.text(330, 30, 'SQL statements go to the server', { color: 'accent', size: 13 });
  s.text(330, 180, 'rows come back as tuples', { color: 'blue', size: 13 });
  return s.visual('Diagram of three boxes: a Python program (the client) sends SQL statements through the mysql.connector driver to the MySQL server that holds the school database; rows come back through the driver as tuples', 'The driver carries SQL one way and rows the other.');
})();
const vSteps = flow('LR', ['import mysql.connector', 'connect()', 'cursor()', 'execute()', 'fetch… or commit()', 'close()'], 'Flow of the six steps: import the connector, connect, create a cursor, execute a statement, fetch rows or commit changes, and close the connection', 'Six steps in every program');
const vParams = table(
  ['Argument', 'Meaning', 'Example'],
  [
    ['`host`', 'Computer running the MySQL server', '`"localhost"`'],
    ['`user`', 'MySQL user name', '`"root"`'],
    ['`passwd` (or `password`)', 'That user\'s password', '`"your_password"`'],
    ['`database`', 'Database to open', '`"school"`'],
  ],
  'Table of connect arguments: host is the computer running the server, user is the MySQL user name, passwd or password is the password, and database is the database to open',
  'Never write a real password in shared code.',
);
const vMethods = table(
  ['Name', 'Belongs to', 'What it does'],
  [
    ['`cursor()`', 'connection', 'Creates a cursor'],
    ['`execute(sql, values)`', 'cursor', 'Runs one SQL statement'],
    ['`fetchone()`', 'cursor', 'Next row as a tuple, or `None`'],
    ['`fetchall()`', 'cursor', 'All remaining rows as a list of tuples'],
    ['`fetchmany(n)`', 'cursor', 'Next n rows as a list'],
    ['`rowcount`', 'cursor (attribute)', 'Rows affected by the last INSERT, UPDATE or DELETE'],
    ['`commit()`', 'connection', 'Saves changes permanently'],
    ['`close()`', 'connection or cursor', 'Ends the session'],
  ],
  'Table of methods: cursor and commit belong to the connection; execute, fetchone, fetchall, fetchmany and the rowcount attribute belong to the cursor; close ends the session',
);
const vStudent = dbTable(SCHOOL, 'SELECT * FROM student ORDER BY roll', 'The imagined student table with columns roll, name, sec, fee and house and five rows: Aarav, Bhavna, Chetan, Dia and Eshan', 'Table student (database school), imagined.');
const vShop = dbTable(SHOP, 'SELECT * FROM item ORDER BY icode', 'The imagined item table with columns icode, iname, price and qty: Notebook, Gel pen, Geometry box, Highlighter and Stapler', 'Table item (database shop), imagined.');
const vClinic = dbTable(CLINIC, 'SELECT * FROM patient ORDER BY pid', 'The imagined patient table with columns pid, pname, dept and age: Meera, Kabir, Farah, Rohan and Sana', 'Table patient (database clinic), imagined.');
const vTagoreOut = table(['Line printed', 'Why'], [[ic(oTagore.split('\n')[0]), 'fetchall() gives a list of tuples'], [ic(oTagore.split('\n')[1]), 'first tuple unpacked into name and fee'], [ic(oTagore.split('\n')[2]), 'second tuple']], 'Table of the output of worked example 1: the list of two tuples for Tagore house, then one line for each student with the fee', 'Output produced by running the program.');
const vFetchTrace = table(['Call', 'Returns'], oFetchOne.split('\n').map((o, i) => [`fetchone() call ${i + 1}`, ic(o)]), 'Trace table of three fetchone calls on the two Raman house rows: Bhavna, then Eshan, then None', 'Two rows, three calls.');
const vPtr = (() => {
  const s = new Svg(640, 250);
  const rolls = [1, 2, 3, 4, 5];
  rolls.forEach((r, i) => {
    const y = 20 + i * 42;
    s.rect(40, y, 120, 34, { fill: 'fill', rx: 4 });
    s.text(100, y + 17, `row (${r},)`, { size: 14 });
  });
  const bracket = (from, to, label, color) => {
    const y1 = 20 + from * 42, y2 = 20 + to * 42 + 34;
    s.line(175, y1, 175, y2, { color, sw: 3 });
    s.text(190, (y1 + y2) / 2, label, { anchor: 'start', size: 13, color });
  };
  bracket(0, 1, `fetchmany(2) → ${oPtr[0]}`, 'accent');
  bracket(2, 2, `fetchone() → ${oPtr[1]}`, 'blue');
  bracket(3, 4, `fetchall() → ${oPtr[2]}`, 'green');
  return s.visual(`Diagram of five result rows: fetchmany two takes rows one and two, fetchone then takes row three, and fetchall takes rows four and five; the printed values are ${oPtr.join(', ')}`, 'Each fetch continues where the last one stopped.');
})();
const vSecOut = table(['Output line'], oSecCount.split('\n').map((l) => [ic(l)]), 'Table of the output of worked example 2: one line per section saying how many students it has', 'Output produced by running the program.');
const vSummary1 = table(
  ['Step', 'Statement'],
  [['Import', '`import mysql.connector`'], ['Connect', '`con = mysql.connector.connect(host=…, user=…, passwd=…, database=…)`'], ['Cursor', '`cur = con.cursor()`'], ['Run', '`cur.execute("SELECT …")`'], ['Read', '`fetchone()` / `fetchall()` / `fetchmany(n)`'], ['Finish', '`con.close()`']],
  'Summary table of Part 1: import, connect, cursor, execute, fetch with fetchone, fetchall or fetchmany, and close',
);
const vTips1 = table(
  ['Mistake', 'Correct form'],
  [['`cur = con.cursor` (no brackets)', '`cur = con.cursor()`'], ['Fetching before `execute()`', 'Execute first, then fetch'], ['Expecting `fetchall()` to give a tuple', 'It gives a **list** of tuples'], ['Indexing a `None` from `fetchone()`', 'Test `if row is None` first']],
  'Table of common mistakes in Part 1: missing brackets on cursor, fetching before execute, expecting a tuple from fetchall, and indexing None returned by fetchone',
);
const vRoute2 = flow('LR', ['INSERT, UPDATE, DELETE', 'commit()', 'rowcount', '%s placeholders', 'format()', 'Complete programs'], 'Route map of Part 2: data-changing statements, commit, rowcount, placeholders, the format method, and complete programs', 'Part 2 at a glance');
const vCommit = flow('LR', ['execute() an INSERT, UPDATE or DELETE', 'Change waits in an open transaction', 'commit() makes it permanent', 'close() without commit() throws it away'], 'Flow: a data-changing statement waits in an open transaction; commit saves it permanently, while closing without commit discards it', 'mysql.connector does not autocommit by default.');
const vInsertOut = table(['Line printed', 'Meaning'], [[ic(oInsert[0]), 'rows before'], [ic(oInsert[1]), 'rowcount of the INSERT'], [ic(oInsert[2]), 'rows after commit()']], 'Table of the output of worked example 3: five rows before, one row inserted, six rows after commit', 'Output produced by running the program.');
const vRowcount = table(['Statement', 'Rows matched', 'Printed'], [['`UPDATE … WHERE qty < 15`', 'Geometry box, Highlighter, Stapler', ic(oRow.split('\n')[0])], ['`DELETE … WHERE price > 100`', 'Geometry box', ic(oRow.split('\n')[1])]], 'Table showing rowcount: the restocking update matches three items, the delete matches one item', 'rowcount counts the rows the last statement changed.');
const vParamCmp = table(
  ['', '`%s` placeholder', '`format()`'],
  [['How the value gets in', 'Sent separately in a tuple', 'Pasted into the SQL text'], ['Quotes for text values', 'Added by the driver', 'You must write them'], ['Safe with user input?', 'Yes', 'No: input can change the query'], ['Example', '`execute(q, (60,))`', '`q = "… <= {}".format(60)`']],
  'Comparison table: with a percent s placeholder the value is sent separately and quoted by the driver, which is safe; with format the value is pasted into the text, quotes must be written by hand and user input can change the query',
);
const vFormatFlow = flow('LR', ['A value in a variable', 'format() puts it into the {} field', 'A finished SQL string', 'execute() runs it'], 'Flow of the format method: a value goes into the curly-bracket field, giving a finished SQL string that execute runs', 'Print the string first when debugging.');
const vInputOut = table(['Typed', 'Value'], [['Item code', '106'], ['Item name', 'Eraser'], ['Price', '10'], ['Quantity', '50'], ['Last line printed', ic(oInput.split('\n').pop())]], 'Table of the inputs typed in worked example 4 (106, Eraser, 10, 50) and the saved row printed at the end', 'Run with these inputs.');
const vBlanks = table(['Blank', 'Usual answer'], [['Create a cursor', '`con.cursor()`'], ['Run the query', '`cur.execute(q)` or `cur.execute(q, values)`'], ['Save a change', '`con.commit()`'], ['All rows / one row', '`cur.fetchall()` / `cur.fetchone()`'], ['Rows changed', '`cur.rowcount`']], 'Table of the statements most often asked in fill-the-missing-statement questions: cursor, execute, commit, fetchall or fetchone, and rowcount');
const vSummary2 = table(
  ['Task', 'Remember'],
  [['Change data', '`execute()` then `commit()`'], ['How many rows changed', '`cur.rowcount` (no brackets)'], ['Values from variables', '`%s` + a tuple: `(x,)` for one value'], ['format()', 'Quotes around text fields: `\'{}\'`'], ['Errors from the database', '`except mysql.connector.Error:`']],
  'Summary table of Part 2: execute then commit to change data, rowcount without brackets, percent s with a tuple, quotes with format, and catching database errors',
);
const vTips2 = table(
  ['Mistake', 'Fix'],
  [['No `commit()` after INSERT/UPDATE/DELETE', 'Add `con.commit()` before closing'], ['`execute(q, 5)`', '`execute(q, (5,))`'], ['`… = {}`.format("Dia")', '`… = \'{}\'`.format("Dia")'], ['`cur.rowcount()`', '`cur.rowcount`'], ['`%s` used with format()', 'Use `{}` with format(), `%s` with execute()']],
  'Table of common mistakes in Part 2: missing commit, a bare value instead of a tuple, missing quotes with format, brackets after rowcount, and mixing percent s with format',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Interface of Python with an SQL Database — Part 1: Connecting and Reading Data',
  goals: [
    'Explain how a Python program works with a MySQL database through mysql.connector',
    'Connect to a database and create a cursor',
    'Run SELECT queries with execute() and read rows with fetchone(), fetchall() and fetchmany()',
  ],
  slides: [
    sl('title', 'Python meets MySQL', {
      b: 'Part 1 — **connecting** to a MySQL database and **reading** its rows from Python.',
      v: vRoute1,
      n: 'Namaste! So far you have written SQL directly in MySQL, and Python programs that work with files. Real applications join the two: a school app shows fees from a database, a shop app updates its stock. In this part we connect a Python program to a MySQL database and read data from it, one row or many rows at a time.',
    }),
    sl('diagram', 'Why connect Python to a database?', {
      b: 'The **server** stores the data; your **program** is a client that sends SQL and receives rows.',
      v: vArch,
      n: 'Look at the three boxes. The MySQL server stores and protects the data. Your Python program is a client: it decides what to ask. In between sits the driver, a module that carries SQL statements to the server and brings the rows back as tuples. This lets one program offer menus, checks and calculations on top of the database.',
    }),
    sl('concept', 'Installing and importing the connector', {
      b: `The driver is the package **mysql-connector-python**. Install it once at the command prompt:\n\n\`\`\`text\npip install mysql-connector-python\n\`\`\`\n\nThen, in every program:\n\n${F('import mysql.connector')}`,
      n: 'The driver is not part of standard Python, so it is installed once with pip, using the package name shown. After that, every program begins by importing it. Some programs give it a short name while importing, such as import mysql dot connector as sq; then the short name is used everywhere after.',
    }),
    sl('diagram', 'Six steps in every program', {
      v: vSteps,
      n: 'Every database program follows the same six steps. Import the module. Open a connection with connect. Create a cursor from the connection. Run a statement with execute. Then either fetch the rows of a query, or commit a change to the data. Finally close the connection. Learn this order well, because many board questions ask you to fill in one of these statements.',
    }),
    sl('check', 'Quick check: installing the driver', {
      b: 'Which command installs the connector?',
      chk: 'm_install',
      n: 'Think about where you type the command, and whether it installs or imports.',
    }),
    sl('concept', 'Step 2: connect()', {
      b: `${F('import mysql.connector', 'mycon = mysql.connector.connect(host="localhost", user="root",', '                                passwd="your_password", database="school")')}`,
      v: vParams,
      n: 'The connect function opens a session with the server. Host is the computer running MySQL; localhost means this same computer. User and password are your MySQL login, and database chooses which database to open. Connect returns a connection object, which we store in a variable such as my con. Never put a real password in code you share.',
    }),
    sl('concept', 'Checking the connection', {
      b: `${F(cConnected)}\n\nOutput when the server is running and the login is correct:\n\n${OUT(oConnected)}`,
      n: 'The connection object has a method called is connected, which returns true when the session is open. It is a handy first check. If the server is not running, or the password is wrong, connect itself raises an error, which we will learn to catch in Part 2.',
    }),
    sl('concept', 'Step 3: the cursor', {
      b: `${F('cur = mycon.cursor()')}\n\nA **cursor** runs statements and holds the result of a query.`,
      v: vMethods,
      n: 'From the connection we create a cursor. Think of it as a worker who carries your SQL to the server and keeps the rows that come back, with a pointer to the next row to read. The table shows which methods belong to the cursor and which belong to the connection. Notice that commit belongs to the connection, and rowcount is an attribute without brackets.',
    }),
    sl('diagram', 'Our practice table: student', {
      v: vStudent,
      n: 'Most examples use this imagined student table in a database called school, with five students, their sections, fees and houses. Keep it in front of you: every output in this lesson was produced by actually running the programs on exactly these rows.',
    }),
    sl('check', 'Quick check: the cursor', {
      b: 'What is the cursor object used for?',
      chk: 'm_cursor_role',
      n: 'Remember the worker who carries SQL to the server and brings rows back.',
    }),
    sl('example', 'Worked example 1: fetchall()', {
      b: `List the Tagore house students and their fees.\n\n${F(cTagore)}`,
      v: vTagoreOut,
      n: 'The query selects two columns for Tagore house. Fetch all returns every row at once as a list, and each row is a tuple of the selected columns in order. Printing the list shows square brackets around round brackets. The for loop then unpacks each tuple into name and fee, giving one tidy line per student.',
    }),
    sl('concept', 'fetchone(): one row at a time', {
      b: F(cFetchOne),
      v: vFetchTrace,
      n: 'Fetch one returns just the next row as a tuple, and moves the pointer forward. Raman house has two students, so the first call gives Bhavna and the second gives Eshan. The third call finds nothing left and returns None, not an error. Always test for None before using a row from fetch one.',
    }),
    sl('check', 'Quick check: when the rows run out', {
      b: 'What does fetchone() return when no row is left?',
      chk: 'm_fetchone_none',
      n: 'Think about what you just saw on the third call.',
    }),
    sl('two-column', 'fetchmany(n) and the row pointer', {
      cols: [
        `${F(cPtr)}`,
        `**Output**\n\n${OUT(oPtr.join('\n'))}\n\nThe pointer never goes back: each fetch starts where the last one stopped.`,
      ],
      v: vPtr,
      n: 'Fetch many takes the next n rows as a list. Here it takes rolls one and two. Fetch one then gives roll three as a tuple, and fetch all collects whatever is left, rolls four and five. The cursor keeps one pointer, and every fetch method moves it forward. To read the rows again, execute the query again.',
    }),
    sl('example', 'Worked example 2: counting by section', {
      b: `Show how many students each section has.\n\n${F(cSecCount)}`,
      v: vSecOut,
      n: 'SQL can do the counting for us. Group by section with count returns one row per section, and order by keeps the sections in order. The loop unpacks each two-value tuple and prints a sentence. Notice that we do not need commit here, because a select only reads data.',
    }),
    sl('check', 'Quick check: what fetchall() returns', {
      b: 'True or false?',
      chk: 'tf_fetchall_list',
      n: 'Picture the square and round brackets in the output of worked example one.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Import the connector, connect with host, user, password and database, and create a cursor. Run a query with execute. Read the result with fetch one for a single tuple, fetch all for a list of tuples, or fetch many for the next few rows. The pointer only moves forward. Close the connection at the end.',
    }),
    sl('exam-tips', 'Exam tips: reading data', {
      v: vTips1,
      b: '**How marks are usually given:** one mark per correct statement in fill-the-blank questions; for output questions the exact brackets, quotes and commas of tuples and lists matter.',
      n: 'Watch out for these mistakes. Methods need brackets, so cursor without brackets is wrong. You must execute before you fetch. Fetch all gives a list, even for one row. And fetch one can return None, so check before indexing. In output questions, copy Python’s brackets, quotes and commas exactly, including the comma in a one-item tuple.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Interface of Python with an SQL Database — Part 2: Changing Data and Parameterised Queries',
  goals: [
    'Insert, update and delete records from Python and save them with commit()',
    'Use rowcount to find how many rows a statement changed',
    'Build queries with %s placeholders and with format(), and write complete programs',
  ],
  slides: [
    sl('title', 'Changing data from Python', {
      b: 'Part 2 — **INSERT, UPDATE, DELETE**, `commit()`, `rowcount`, and values from variables.',
      v: vRoute2,
      n: 'In Part 1 we only read data. Now we change it: adding new records, updating fees and prices, and deleting rows. We will see why commit matters, how rowcount tells us what happened, and how to put values from variables into a query safely. We end with complete programs of the kind the board paper asks you to write.',
    }),
    sl('diagram', 'Why commit() matters', {
      v: vCommit,
      n: 'When you execute an insert, update or delete, the change is not yet permanent. Mysql connector starts a transaction and waits. Commit, called on the connection, saves the change for good. If the program closes the connection without committing, the change is thrown away. So every data-changing program needs commit.',
    }),
    sl('example', 'Worked example 3: inserting a patient', {
      b: `The clinic adds Tara to the \`patient\` table.\n\n${F(cInsert)}`,
      v: vInsertOut,
      n: 'This program counts the rows, inserts one patient, commits, and counts again. Rowcount after the insert is one, because one row was added. The count goes from five to six. Notice the order: execute the insert, then commit on the connection, then read rowcount from the cursor.',
    }),
    sl('concept', 'What if commit() is forgotten?', {
      b: `${F(cForgot)}\n\nOutput:\n\n${OUT(oForgot)}`,
      n: 'Here the same insert is run, but the program closes without committing. When it reconnects and counts, there are still only five rows: the new record was discarded. Examiners love this error. Whenever you see insert, update or delete in a program, look for commit before close.',
    }),
    sl('check', 'Quick check: why commit()?', {
      b: 'Why must the program call commit()?',
      chk: 'm_commit_why',
      n: 'Remember what happened when the program closed without it.',
    }),
    sl('concept', 'rowcount after UPDATE and DELETE', {
      b: `${F(cRow)}\n\nOutput:\n\n${OUT(oRow)}`,
      v: vRowcount,
      n: 'Rowcount is an attribute of the cursor, written without brackets. After an update or delete it tells how many rows were changed. Three items had fewer than fifteen pieces, so three were restocked. Only the geometry box costs more than one hundred rupees, so one row was deleted. Rowcount always describes the last statement only.',
    }),
    sl('concept', 'Values from variables: the %s placeholder', {
      b: `${F(cParam)}\n\nOutput:\n\n${OUT(oParam)}`,
      v: vParamCmp,
      n: 'Programs usually take values from variables or from the user. With mysql connector, write percent s in the query wherever a value goes, and pass the values as a tuple in execute. The driver puts each value in, quoting text for you. For one value, remember the comma inside the brackets, otherwise it is not a tuple.',
    }),
    sl('check', 'Quick check: building a query string', {
      b: 'What does the printed query look like?',
      chk: 'm_format',
      n: 'Ask what the curly brackets are replaced with.',
    }),
    sl('concept', 'Building the query with format()', {
      b: `${F(cFormat)}\n\nOutput:\n\n${OUT(oFormat)}`,
      v: vFormatFlow,
      n: 'The other way is to build the whole query string first with the format method, then execute it. Format replaces the curly brackets with the value, and printing the string is a good way to check it. For text values you must write single quotes around the curly brackets yourself, or the server reads the word as a column name.',
    }),
    sl('concept', 'Which way is safer?', {
      b: 'If the user types text, **placeholders** are safer: the value is sent as data and cannot change the query. With `format()`, a stray quote or extra SQL in the input becomes part of the command (**SQL injection**).',
      v: table(['Typed by a user', 'With format()', 'With %s'], [['`Dia`', 'Needs quotes written by you', 'Quoted by the driver'], ["`x' OR '1'='1`", 'Changes the WHERE condition', 'Treated as plain text']], 'Table showing that typed text is quoted by the driver with placeholders, while with format it must be quoted by hand and a crafted input can change the WHERE condition'),
      n: 'Both methods appear in the syllabus, but they are not equally safe. With format, whatever the user types is pasted into the command, so a cleverly typed quote can change the meaning of the query. With placeholders, the driver sends the value separately as plain data. That is why real applications prefer placeholders.',
    }),
    sl('check', 'Quick check: the placeholder', {
      b: 'Fill in the blank.',
      chk: 'fb_placeholder',
      n: 'It is the same placeholder for numbers and for text.',
    }),
    sl('example', 'Worked example 4: adding an item typed by the user', {
      b: `${F(cInput)}\n\nInputs typed: 106, Eraser, 10, 50.`,
      v: vInputOut,
      n: 'This complete program asks for an item code, name, price and quantity, converting the numbers with int. It inserts them with four placeholders and a four-value tuple, commits, and reads the new row back to confirm. With the inputs shown, the last line prints the saved tuple for the eraser.',
    }),
    sl('concept', 'Board pattern: complete the missing statements', {
      b: 'Board questions often give a program with blanks such as **Statement 1: create a cursor**, **Statement 2: save the changes**.',
      v: vBlanks,
      n: 'A very common board question gives a program with a few statements missing and a comment saying what each should do. The answers come from a short list: create a cursor, execute the query, commit the change, fetch the rows, or read rowcount. Write the full statement with the right object name from the program.',
    }),
    sl('check', 'Quick check: putting the steps in order', {
      b: 'Arrange the steps.',
      chk: 'ord_steps',
      n: 'Start from the import and finish with closing the connection.',
    }),
    sl('concept', 'When the database refuses: catching errors', {
      b: `${F(cTry)}\n\nOutput:\n\n${OUT(oTry)}`,
      n: 'Sometimes the database refuses a statement, for example when a primary key value already exists. The connector then raises an error. Putting the statements in a try block and catching mysql connector dot Error lets the program print a friendly message instead of crashing. Roll two already exists, so this insert is refused.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Insert, update and delete need commit to become permanent. Rowcount, without brackets, tells how many rows the last statement changed. Values come in through percent s placeholders with a tuple, or through format with quotes around text. Catch database errors with try and except.',
    }),
    sl('exam-tips', 'Exam tips: changing data', {
      v: vTips2,
      b: '**How marks are usually given:** in programs, marks for connecting, the correct query, `commit()` where data changes, and displaying or closing; in error questions, ½–1 mark for each error found and corrected.',
      n: 'Common mistakes cost easy marks. Forgetting commit after a change. Passing a single value without making it a tuple. Leaving out quotes around text when using format. Writing rowcount with brackets. Mixing percent s with format. Before you finish a program, check the six steps one by one.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Interface of Python with an SQL Database — Notes',
  sections: [
    {
      h: '1. Why connect, and what you need',
      t: 1,
      b: 'A database stores data safely and lets many users query it; a Python program adds menus, checks and calculations. The program is a **client**; the **MySQL server** holds the database; the **driver** `mysql.connector` carries SQL to the server and rows back.\n\nInstall once: `pip install mysql-connector-python`. Import in every program: `import mysql.connector` (or `import mysql.connector as sq`).',
      terms: [['Driver (connector)', 'A module that lets a program talk to a database server.'], ['Client', 'The program that sends requests to the server.']],
      v: vArch,
    },
    {
      h: '2. Connecting and creating a cursor',
      t: 1,
      b: `${F('import mysql.connector', 'mycon = mysql.connector.connect(host="localhost", user="root",', '                                passwd="your_password", database="school")', 'if mycon.is_connected():', '    print("Connected")', 'cur = mycon.cursor()')}\n\n- **connect()** opens the session and returns a connection object.\n- **is_connected()** returns True if it is open.\n- **cursor()** (a method of the connection) returns a cursor, which runs statements and keeps the result.\n- **close()** ends the session at the end of the program.`,
      terms: [['Connection object', 'Represents an open session with the server; has cursor(), commit(), close(), is_connected().'], ['Cursor', 'Runs SQL with execute() and holds the rows of a query.']],
      v: vParams,
      vs: [vMethods],
    },
    {
      h: '3. Practice tables used in this chapter',
      t: 1,
      b: 'All programs in the slides, notes and questions use these imagined tables. Every output shown was produced by running the program on exactly these rows.',
      v: vStudent,
      vs: [vShop, vClinic],
    },
    {
      h: '4. Reading rows: fetchone(), fetchall(), fetchmany(n)',
      t: 1,
      b: `After \`cur.execute("SELECT …")\`:\n\n- **fetchone()** — the next row as a **tuple**; **None** when no row is left.\n- **fetchall()** — all remaining rows as a **list of tuples**; \`[]\` when none are left.\n- **fetchmany(n)** — the next n rows as a list.\n\nThe cursor keeps one pointer that only moves forward; to read again, execute again. Each tuple holds the selected columns in order, so \`row[0]\` is the first selected column.\n\n${F(cPtr)}\n\nOutput:\n\n${OUT(oPtr.join('\n'))}`,
      terms: [['Result set', 'The rows returned by a SELECT, read through the cursor.'], ['Row tuple', 'One row of a result, e.g. (1, \'Aarav\', \'12A\', 4500, \'Tagore\').']],
      v: vPtr,
      vs: [vFetchTrace],
    },
    {
      h: '5. Changing the data with commit() and rowcount',
      t: 1,
      b: `INSERT, UPDATE and DELETE are run with \`execute()\` like any query, but **mysql.connector does not autocommit**: the change stays in an open transaction until \`mycon.commit()\`. Closing without commit discards it.\n\n\`cur.rowcount\` (an attribute, no brackets) is the number of rows the last INSERT, UPDATE or DELETE affected.\n\n${F(cRow)}\n\nOutput:\n\n${OUT(oRow)}`,
      terms: [['commit()', 'Connection method that makes changes permanent.'], ['rowcount', 'Cursor attribute: rows affected by the last statement.'], ['Transaction', 'A group of changes saved together by commit().']],
      v: vCommit,
      vs: [vRowcount],
    },
    {
      h: '6. Values from variables: %s and format()',
      t: 1,
      b: `**Placeholders:** write \`%s\` for each value and pass a tuple: \`cur.execute("SELECT * FROM student WHERE roll = %s", (r,))\`. Text is quoted by the driver; the comma in \`(r,)\` makes a one-value tuple.\n\n**format():** build the string first: \`q = "SELECT * FROM student WHERE house = '{}'".format(h)\`; text values need quotes written around \`{}\`.\n\nPlaceholders are **safer** with user input (they prevent SQL injection).\n\n**Complete program with input:**\n\n${F(cInput)}\n\nWith inputs 106, Eraser, 10 and 50 the last line printed is ${ic(oInput.split('\n').pop())}.\n\n**Catching errors:** \`except mysql.connector.Error:\` catches errors reported by the database (e.g. a duplicate primary key).`,
      terms: [['Parameterised query', 'A query with %s placeholders whose values are passed separately.'], ['SQL injection', 'Typed text that changes a query when it is pasted into the SQL string.']],
      v: vParamCmp,
      vs: [vFormatFlow, vBlanks],
    },
  ],
  tips: '**Common mistakes**\n- `cur = con.cursor` without brackets; `cur.rowcount()` with brackets.\n- Fetching before `execute()`; indexing the `None` that `fetchone()` returns.\n- No `commit()` after INSERT, UPDATE or DELETE.\n- `execute(q, 5)` instead of `execute(q, (5,))`.\n- Missing quotes around text in a `format()` query.\n\n**How marks are usually awarded**\n- Output questions: the exact printed form of tuples and lists (brackets, quotes, commas).\n- Fill-the-missing-statement: one mark per statement.\n- Programs (4–5 marks): connection and cursor, correct query with placeholders, `commit()` where data changes, display/rowcount, closing.\n\n**About the outputs in SOYL practice:** programs are shown with mysql.connector, as in the syllabus; their outputs were produced by running the same programs on the same rows with Python\'s built-in database module, using only whole-number and text columns so the printed values match.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Module used to connect Python with MySQL', '`mysql.connector`', 'fact', 1],
  ['Install command for the connector', '`pip install mysql-connector-python`', 'fact', 1],
  ['Four details given to `connect()`', '`host`, `user`, `passwd` (password), `database`', 'fact', 1],
  ['What does `connect()` return?', 'A **connection object**.', 'concept', 1],
  ['Method that checks the connection is open', '`is_connected()`', 'fact', 1],
  ['How is a cursor created?', '`cur = mycon.cursor()` — from the connection.', 'fact', 1],
  ['What does a cursor do?', 'Runs SQL with `execute()` and holds the rows of a result.', 'concept', 1],
  ['`fetchone()` returns…', 'The next row as a **tuple**, or **None** if no row is left.', 'concept', 1],
  ['`fetchall()` returns…', 'All remaining rows as a **list of tuples** (`[]` if none).', 'concept', 1],
  ['`fetchmany(n)` returns…', 'The next n rows as a list.', 'concept', 1],
  ['Can fetch methods go back to earlier rows?', '**No.** Execute the query again to re-read.', 'exam-tip', 1],
  [`Printed by \`print(cur.fetchone())\` for one-column row Chetan`, ic("('Chetan',)"), 'example', 1],
  ['Which statements need `commit()`?', 'INSERT, UPDATE, DELETE (not SELECT).', 'concept', 1],
  ['Does mysql.connector autocommit by default?', '**No.** Call `mycon.commit()`.', 'fact', 1],
  ['Close without commit after an INSERT?', 'The new row is **discarded**.', 'exam-tip', 1],
  ['`commit()` belongs to…', 'The **connection** object, not the cursor.', 'fact', 1],
  ['`rowcount`', 'Cursor **attribute** (no brackets): rows affected by the last INSERT/UPDATE/DELETE.', 'definition', 1],
  ['Placeholder used by mysql.connector', '`%s`, for numbers and text alike.', 'fact', 1],
  ['Pass one value for `%s`', 'As a tuple: `(value,)` — the comma matters.', 'exam-tip', 1],
  ['`format()` with a text value', 'Write quotes around the field: `\'{}\'`.', 'exam-tip', 1],
  ['Why prefer `%s` for user input?', 'The value is sent as data, so it cannot change the query (prevents SQL injection).', 'concept', 1],
  ['**SQL injection**', 'Typed text that alters a query when pasted into the SQL string.', 'definition', 1],
  ['Read a column from a row tuple', 'By index: `row[0]` is the first selected column.', 'concept', 1],
  ['`SELECT COUNT(*) …` then `fetchone()[0]`', 'Gives the count as a number.', 'example', 1],
  ['Catch errors from the database', '`except mysql.connector.Error:`', 'fact', 1],
  ['Inserting a duplicate primary key', 'The database refuses it and the connector raises an error.', 'concept', 1],
  ['Order of the six steps', 'import → connect → cursor → execute → fetch/commit → close', 'exam-tip', 1],
  ['Value of `rowcount` after an UPDATE matching 3 rows', '3', 'example', 1],
  ['Common error: `cur = con.cursor`', 'Missing brackets: `con.cursor()`.', 'exam-tip', 1],
  ['Close the connection', '`mycon.close()` at the end of the program.', 'fact', 1],
]);

// ---------------------------------------------------------------- tests (cbse-12-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Interface of Python with an SQL Database',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_module', 'm_rowcount_update', 'm_placeholder', 'ar_commit'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words (or code) and the 3-mark question in about 60 words (or code). Use the tables given in the notes.', items: ['s_steps', 's_err_commit', 's3_complete'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the output for the input given.', items: [{ attempt: 1, keys: ['l_insert_input', 'l_search'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_clinic'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Interface of Python with an SQL Database',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_connect_params', 'm_fetchall_type', 'm_close', 'm_execute_returns', 'm_after_fetchall', 'm_count_query', 'm_delete_rowcount', 'm_no_commit_effect', 'ar_rowcount_attr', 'ar_quotes'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words (or code) and 3-mark questions in about 60 words (or code).', items: ['s_fetchone_fetchall', 's_rowcount', { attempt: 1, keys: ['s_commit_need', 's_placeholder_vs_format'] }, 's3_err_multi', { attempt: 1, keys: ['s3_display_fn', 's3_update_prog'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18. Show the output for the data given.', items: ['l_update_price', { attempt: 1, keys: ['l_delete_zero_stock', 'l_add_and_list'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_shop', 'cb_school_fee'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-12-computer-science-ch09 only (connect(), cursor(), execute(), commit(), fetchone(), fetchall(), fetchmany(), rowcount, %s placeholders and format())',
    originality: 'every program, table, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused (D-036)',
    execution: 'every output in items, slides, notes and flashcards produced by running the program with Python 3: mysql.connector programs are executed through sqlite3 after toSqlite() rewrites the import, connect(), Error, is_connected() and %s; INT and text columns only; results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
