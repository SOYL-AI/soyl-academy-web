// CBSE 12 Computer Science, ch09 Interface of Python with an SQL Database — question bank. Every program, table,
// scenario and data value is written by SOYL (imagined schools, shops and clinics); no textbook, NCERT or
// board-paper program is reused (D-036).
//
// HOW OUTPUTS ARE PRODUCED. Students see mysql.connector programs, as the syllabus requires. MySQL is not
// available at build time, so every stated output comes from running the SAME program with Python's sqlite3:
// toSqlite() rewrites only (1) the import line, (2) the connect(...) call, (3) `mysql.connector.Error`,
// (4) `x.is_connected()` (to `(x is not None)`) and (5) the `%s` placeholders (to sqlite3's `?`). The tables are
// created first by hidden setup code with the same rows. To keep both drivers' results identical, the data use
// only INT and short text columns (mysql.connector returns DECIMAL/DATE as Decimal/datetime objects; SUM and AVG
// return Decimal), every multi-row query that prints rows in order has ORDER BY (or relies on primary-key order
// with rows inserted in key order), string comparisons use the stored case, and no item asks for rowcount after a
// SELECT (the drivers differ there). INSERT/UPDATE/DELETE rowcount and the effect of a missing commit() are the
// same in both.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr, runSql } from './lib.mjs';

const S2 = [25, 50];
const S3 = [40, 75];
const L5 = [80, 140];
/** A Python code fence. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
/** A plain-text fence for printed output. */
export const OUT = (s) => '```text\n' + s + '\n```';
export const code = (...lines) => lines.join('\n');
export const ic = (s) => '`' + s + '`';
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
const expect = (actual, expected, what) => {
  if (actual !== expected) throw new Error(`${what}: expected ${JSON.stringify(expected)}, Python printed ${JSON.stringify(actual)}`);
  return actual;
};

// ---------------------------------------------------------------- databases (imagined, SOYL)
export const SCHOOL = [
  "CREATE TABLE student (roll INT PRIMARY KEY, name VARCHAR(20), sec VARCHAR(5), fee INT, house VARCHAR(10));",
  "INSERT INTO student VALUES (1, 'Aarav', '12A', 4500, 'Tagore');",
  "INSERT INTO student VALUES (2, 'Bhavna', '12B', 4200, 'Raman');",
  "INSERT INTO student VALUES (3, 'Chetan', '12A', 4800, 'Bose');",
  "INSERT INTO student VALUES (4, 'Dia', '12C', 4200, 'Tagore');",
  "INSERT INTO student VALUES (5, 'Eshan', '12B', 5000, 'Raman');",
].join('\n');
export const SHOP = [
  "CREATE TABLE item (icode INT PRIMARY KEY, iname VARCHAR(20), price INT, qty INT);",
  "INSERT INTO item VALUES (101, 'Notebook', 60, 40);",
  "INSERT INTO item VALUES (102, 'Gel pen', 15, 120);",
  "INSERT INTO item VALUES (103, 'Geometry box', 150, 12);",
  "INSERT INTO item VALUES (104, 'Highlighter', 35, 0);",
  "INSERT INTO item VALUES (105, 'Stapler', 90, 8);",
].join('\n');
export const CLINIC = [
  "CREATE TABLE patient (pid INT PRIMARY KEY, pname VARCHAR(20), dept VARCHAR(15), age INT);",
  "INSERT INTO patient VALUES (11, 'Meera', 'Dental', 34);",
  "INSERT INTO patient VALUES (12, 'Kabir', 'ENT', 8);",
  "INSERT INTO patient VALUES (13, 'Farah', 'Dental', 61);",
  "INSERT INTO patient VALUES (14, 'Rohan', 'Ortho', 45);",
  "INSERT INTO patient VALUES (15, 'Sana', 'ENT', 27);",
].join('\n');

/** The mysql.connector program rewritten for sqlite3 (see the header comment). */
export function toSqlite(prog) {
  let p = prog;
  const m = /^import mysql\.connector(?: as (\w+))?[ \t]*$/m.exec(p);
  if (!m) throw new Error(`toSqlite: no "import mysql.connector" line in:\n${prog}`);
  const alias = (m[1] ?? 'mysql.connector').replace(/\./g, '\\.');
  p = p.replace(m[0], 'import sqlite3');
  p = p.replace(new RegExp(`${alias}\\.connect\\([^)]*\\)`, 'g'), 'sqlite3.connect("db.sqlite")');
  p = p.replace(new RegExp(`${alias}\\.Error`, 'g'), 'sqlite3.Error');
  p = p.replace(/(\w+)\.is_connected\(\)/g, '($1 is not None)');
  p = p.replace(/%s/g, '?');
  if (/mysql/.test(p)) throw new Error(`toSqlite: a mysql reference is left in:\n${p}`);
  return p;
}
const setupFor = (schema) => `import sqlite3 as _sq\n_c = _sq.connect("db.sqlite")\n_c.executescript(${JSON.stringify(schema)})\n_c.commit()\n_c.close()\ndel _sq, _c`;
/** Output of a mysql.connector program, executed through sqlite3 on `schema`. */
export const my = (prog, schema, stdin = '') => pyOut(toSqlite(prog), { setup: setupFor(schema), stdin });
/** The error line of a program that must fail (only where both drivers fail the same way). */
export const myErr = (prog, schema) => pyErr(toSqlite(prog), { setup: setupFor(schema) });
/** Rows of a query on a schema, as tuples printed by Python. */
export const rowsOf = (schema, q) => runSql(schema, q);

/** Connection lines used in most programs. */
export const CON = (db) => [
  'import mysql.connector',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  `                                passwd="your_password", database="${db}")`,
  'cur = mycon.cursor()',
];
const prog = (db, ...lines) => code(...CON(db), ...lines);

// ================================================================ MCQs
Q('m_module', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Nisha wants her Python program to talk to a MySQL database, as in the CBSE syllabus. Which module should she import?',
  opts: [ic('mysql.connector'), ic('csv'), ic('pickle'), ic('statistics')],
  sol: 'mysql.connector is the driver module that lets Python connect to a MySQL server. csv and pickle work with files, and statistics does calculations.',
}));
Q('m_install', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which command, typed at the system prompt, installs the MySQL connector package for Python?',
  opts: [ic('pip install mysql-connector-python'), ic('import mysql.connector'), ic('mysql --install python'), ic('python install mysql')],
  sol: 'Packages are installed with pip; the package name is mysql-connector-python. import mysql.connector is the statement used inside a program after installation.',
}));
Q('m_connect_params', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these is **NOT** a keyword argument normally passed to `mysql.connector.connect()` when a school program logs in to its server?',
  opts: [ic('cursor'), ic('host'), ic('user'), ic('database')],
  sol: 'connect() takes login details such as host, user, password (passwd) and database. A cursor is created afterwards, from the connection object, with cursor().',
}));
Q('m_cursor_role', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'In a program that reads the student table, what is the **cursor object** used for?',
  opts: [
    'To run SQL statements and hold the rows a query returns',
    'To install the connector package',
    'To store the MySQL password in the program',
    'To draw tables on the screen',
  ],
  sol: 'cursor() gives an object whose execute() sends SQL to the server; the rows of a SELECT are then fetched from the same cursor.',
}));
Q('m_execute_returns', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which cursor method actually sends an SQL statement such as an UPDATE on the item table to the MySQL server?',
  opts: [ic('execute()'), ic('fetchone()'), ic('commit()'), ic('connect()')],
  sol: 'execute() runs the statement. fetchone() reads a row of a result, commit() is a connection method that saves changes, and connect() opens the connection.',
}));
Q('m_close', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'At the end of the clinic program, which statement releases the connection held in `mycon`?',
  opts: [ic('mycon.close()'), ic('mycon.end()'), ic('cur.commit()'), ic('del mysql')],
  sol: 'A connection object is closed with close(). commit() belongs to the connection (not the cursor) and saves changes; it does not close anything.',
}));
const cSec12A = prog('school',
  'cur.execute("SELECT name, fee FROM student WHERE sec = \'12A\' ORDER BY roll")',
  'print(cur.fetchall())',
);
const oSec12A = expect(my(cSec12A, SCHOOL), "[('Aarav', 4500), ('Chetan', 4800)]", 'sec 12A');
Q('m_fetchall_type', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The \`student\` table of an imagined school has the rows shown in the notes. What does this program print for section 12A?\n\n${F(cSec12A)}`,
  opts: distinct([ic(oSec12A), ic("('Aarav', 4500), ('Chetan', 4800)"), ic("[['Aarav', 4500], ['Chetan', 4800]]"), ic("['Aarav', 'Chetan']")]),
  sol: 'fetchall() returns a list whose items are tuples, one tuple per row, with the selected columns in order: name, then fee.',
}));
const cOneNone = prog('school',
  'cur.execute("SELECT name FROM student WHERE house = \'Bose\'")',
  'print(cur.fetchone())',
  'print(cur.fetchone())',
);
const oOneNone = expect(my(cOneNone, SCHOOL), "('Chetan',)\nNone", 'fetchone none');
Q('m_fetchone_none', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Only one student is in Bose house. A program runs `SELECT name FROM student WHERE house = \'Bose\'` and then calls `cur.fetchone()` **twice**. What does the second call return?',
  opts: [ic('None'), ic("('Chetan',)"), ic('[]'), ic('0')],
  sol: `The first call returns the only row as a one-item tuple; when no rows are left, fetchone() returns None. The two prints show:\n\n${OUT(oOneNone)}`,
}));
const cRaman = prog('school',
  'cur.execute("UPDATE student SET fee = fee + 300 WHERE house = \'Raman\'")',
  'mycon.commit()',
  'print(cur.rowcount)',
);
const oRaman = expect(my(cRaman, SCHOOL), '2', 'raman rowcount');
Q('m_rowcount_update', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The school raises the fee of every student in Raman house. What does the program print?\n\n${F(cRaman)}`,
  opts: distinct([ic(oRaman), ic('5'), ic('300'), ic('1')]),
  sol: 'rowcount after an UPDATE is the number of rows changed. Bhavna and Eshan are in Raman house, so 2 rows change.',
}));
Q('m_placeholder', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Which statement correctly fetches the record of roll number 4 from the student table using a `%s` placeholder?',
  opts: [
    ic('cur.execute("SELECT * FROM student WHERE roll = %s", (4,))'),
    ic('cur.execute("SELECT * FROM student WHERE roll = %s", 4)'),
    ic('cur.execute("SELECT * FROM student WHERE roll = %s" % 4)'),
    ic('cur.execute("SELECT * FROM student WHERE roll = {}", (4,))'),
  ],
  sol: 'With mysql.connector the values for %s placeholders go in a tuple (or list) as the second argument; a single value needs the comma, (4,). The % operator formats the string in Python instead of passing a parameter, and {} is a format() field, not a placeholder.',
}));
const cFmt = code('limit = 4400', 'q = "SELECT name FROM student WHERE fee > {}".format(limit)', 'print(q)');
const oFmt = pyOut(cFmt);
Q('m_format', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Before running a fee query, Raghav prints the query string he built with \`format()\`. What does he see?\n\n${F(cFmt)}`,
  opts: distinct([ic(oFmt), ic('SELECT name FROM student WHERE fee > {}'), ic('SELECT name FROM student WHERE fee > limit'), ic("SELECT name FROM student WHERE fee > '4400'")]),
  sol: 'format() replaces the {} field with the value of limit, so the finished string contains the number 4400. Only after this is the string sent with execute().',
}));
Q('m_format_quotes', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Which statement builds a **valid** query to list students of Tagore house with `format()`?',
  opts: [
    ic(`q = "SELECT name FROM student WHERE house = '{}'".format("Tagore")`),
    ic(`q = "SELECT name FROM student WHERE house = {}".format("Tagore")`),
    ic(`q = "SELECT name FROM student WHERE house = {}".format(Tagore)`),
    ic(`q = "SELECT name FROM student WHERE house = '%s'".format("Tagore")`),
  ],
  sol: 'A text value must appear inside single quotes in the SQL, so the {} field is written inside quotes. Without them the server reads Tagore as a column name; an unquoted Tagore in Python is an undefined variable; and %s is not replaced by format().',
}));
const cMany = prog('school',
  'cur.execute("SELECT roll FROM student ORDER BY roll")',
  'print(cur.fetchmany(2))',
  'print(cur.fetchone())',
);
const oMany = expect(my(cMany, SCHOOL), '[(1,), (2,)]\n(3,)', 'fetchmany');
Q('m_fetchmany', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A program reads roll numbers in batches from the five-row student table. What does the **second** print statement display?\n\n${F(cMany)}`,
  opts: distinct([ic(oMany.split('\n')[1]), ic('(1,)'), ic('[(3,)]'), ic('(2,)')]),
  sol: `fetchmany(2) takes the first two rows; the cursor then stands at the third row, so fetchone() returns (3,). The full output is:\n\n${OUT(oMany)}`,
}));
const cAgain = prog('clinic',
  'cur.execute("SELECT pname FROM patient ORDER BY pid")',
  'first = cur.fetchall()',
  'second = cur.fetchall()',
  'print(len(first), second)',
);
const oAgain = expect(my(cAgain, CLINIC), '5 []', 'fetchall again');
Q('m_after_fetchall', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `At an imagined clinic the \`patient\` table has five rows. What does this program print?\n\n${F(cAgain)}`,
  opts: distinct([ic(oAgain), ic('5 None'), ic("5 [('Meera',)]"), ic('0 []')]),
  sol: 'The first fetchall() takes all five rows. Nothing is left in the result, so the second fetchall() returns an empty list (fetchone() would return None).',
}));
Q('m_row_index', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the loop `for row in cur.fetchall(): print(row[0])` run after `SELECT pname, dept FROM patient`, what does `row[0]` hold on each pass?',
  opts: ['The patient name of that row', 'The whole first row of the table', 'The number of rows fetched', 'The department of that row'],
  sol: 'Each row is a tuple of the selected columns in order, so index 0 is pname and index 1 is dept.',
}));
const cZero = prog('shop',
  'cur.execute("SELECT COUNT(*) FROM item WHERE qty = 0")',
  'print(cur.fetchone()[0])',
);
const oZero = expect(my(cZero, SHOP), '1', 'count zero');
Q('m_count_query', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `An imagined stationery shop keeps its stock in an \`item\` table (shown in the notes). What does this program print?\n\n${F(cZero)}`,
  opts: distinct([ic(oZero), ic('(1,)'), ic('0'), ic('104')]),
  sol: 'COUNT(*) returns one row with one column; fetchone() gives that row as a tuple and [0] picks the number. Only the Highlighter has qty 0.',
}));
const cDelYoung = prog('clinic',
  'cur.execute("DELETE FROM patient WHERE age < 30")',
  'mycon.commit()',
  'print(cur.rowcount)',
);
const oDelYoung = expect(my(cDelYoung, CLINIC), '2', 'delete young');
Q('m_delete_rowcount', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The clinic removes the records of patients younger than 30 from its practice database. What is printed?\n\n${F(cDelYoung)}`,
  opts: distinct([ic(oDelYoung), ic('3'), ic('5'), ic('30')]),
  sol: 'Kabir (8) and Sana (27) are under 30, so DELETE removes 2 rows and rowcount is 2.',
}));
const cLost = code(
  ...CON('school'),
  'cur.execute("INSERT INTO student VALUES (6, \'Farhan\', \'12C\', 4600, \'Bose\')")',
  'mycon.close()',
  '',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  '                                passwd="your_password", database="school")',
  'cur = mycon.cursor()',
  'cur.execute("SELECT COUNT(*) FROM student")',
  'print(cur.fetchone()[0])',
);
const oLost = expect(my(cLost, SCHOOL), '5', 'lost insert');
Q('m_no_commit_effect', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Ravi adds Farhan to the five-row student table, closes the connection, then reconnects to check. What does the last line print?\n\n${F(cLost)}`,
  opts: distinct([ic(oLost), ic('6'), ic('None'), ic('1')]),
  sol: 'The INSERT was never committed, and mysql.connector does not commit automatically, so closing the connection discards it. The new session still counts 5 rows.',
}));
Q('m_why_param', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A library app takes a member\'s name from a text box. Why is `cur.execute("... WHERE mname = %s", (name,))` safer than joining the name into the query string?',
  opts: [
    'The value is sent separately from the SQL, so text typed by a user cannot change the query itself',
    'Placeholders make the query run without a connection',
    'Placeholders automatically commit the change',
    'Joined strings cannot contain spaces',
  ],
  sol: 'With placeholders the driver passes the value as data and quotes it correctly; text such as a stray quote or extra SQL in the input cannot become part of the command (the idea behind SQL injection).',
}));
Q('m_server_role', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In a school setup, a Python program on a laptop reads marks stored in MySQL. Which statement describes the arrangement correctly?',
  opts: [
    'The MySQL server stores the database; the Python program is a client that sends SQL through the connector',
    'The Python program stores the tables and MySQL only displays them',
    'The connector module stores a copy of every table inside the program file',
    'The cursor is the database server',
  ],
  sol: 'The server holds and manages the data. The program is a client: it opens a connection through the driver (mysql.connector), sends SQL and receives rows.',
}));
const cRowIdx = prog('shop',
  'cur.execute("SELECT * FROM item WHERE icode = 101")',
  'row = cur.fetchone()',
  'print(row[1], row[2] * 2)',
);
const oRowIdx = expect(my(cRowIdx, SHOP), 'Notebook 120', 'row index');
Q('m_tuple_index', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The shop owner prints the price of two notebooks from the \`item\` table. What is the output?\n\n${F(cRowIdx)}`,
  opts: distinct([ic(oRowIdx), ic('101 120'), ic('Notebook 60'), ic('60 120')]),
  sol: 'SELECT * returns all four columns in order (icode, iname, price, qty). row[1] is the name and row[2] the price, 60, so 60 × 2 = 120.',
}));
Q('m_commit_why', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why must a program call `mycon.commit()` after inserting a new patient record?',
  opts: [
    'Changes made through the connector are not saved permanently until they are committed',
    'commit() opens the connection to the server',
    'commit() is needed before every SELECT query',
    'commit() prints the inserted record',
  ],
  sol: 'mysql.connector starts a transaction and does not autocommit by default. commit() makes INSERT, UPDATE and DELETE changes permanent; without it they are rolled back when the connection closes.',
}));
const cConnected = code(
  'import mysql.connector',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  '                                passwd="your_password", database="clinic")',
  'if mycon.is_connected():',
  '    print("Connected to clinic")',
  'else:',
  '    print("Not connected")',
);
export const oConnected = expect(my(cConnected, CLINIC), 'Connected to clinic', 'is_connected');
export { cConnected };
Q('m_is_connected', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'After calling `connect()`, which method can a program use to check that the connection to the clinic server succeeded?',
  opts: [ic('is_connected()'), ic('fetchone()'), ic('rowcount()'), ic('commit()')],
  sol: 'The connection object\'s is_connected() returns True when the connection is open. rowcount is an attribute of the cursor, not a method.',
}));
const cHouseCount = prog('school',
  'cur.execute("SELECT house, COUNT(*) FROM student GROUP BY house ORDER BY house")',
  'for h, n in cur.fetchall():',
  '    print(h, n)',
);
const oHouseCount = expect(my(cHouseCount, SCHOOL), 'Bose 1\nRaman 2\nTagore 2', 'house count');
Q('m_group_loop', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The sports teacher counts students in each house. What is the **last** line printed?\n\n${F(cHouseCount)}`,
  opts: distinct([ic(oHouseCount.split('\n')[2]), ic('Bose 1'), ic('Raman 2'), ic('Tagore 1')]),
  sol: `Rows come back in ORDER BY house order: Bose, Raman, Tagore. Each row is unpacked into h and n. Output:\n\n${OUT(oHouseCount)}`,
}));
const cInsCount = prog('clinic',
  'cur.execute("INSERT INTO patient VALUES (16, \'Tara\', \'Ortho\', 52)")',
  'print(cur.rowcount)',
  'mycon.commit()',
);
const oInsCount = expect(my(cInsCount, CLINIC), '1', 'insert rowcount');
Q('m_insert_rowcount', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A receptionist adds one new patient, Tara, through this program. What does it print?\n\n${F(cInsCount)}`,
  opts: distinct([ic(oInsCount), ic('6'), ic('16'), ic('0')]),
  sol: 'One INSERT statement adds one row, so rowcount is 1. It reports the rows affected by the last statement, not the size of the table.',
}));
Q('m_fetch_order', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which order of statements correctly reads and prints all stapler records from the shop database?',
  opts: [
    'connect() → cursor() → execute() → fetchall() → print the rows → close()',
    'connect() → fetchall() → cursor() → execute() → close()',
    'cursor() → connect() → execute() → commit() → fetchall()',
    'execute() → connect() → cursor() → fetchall() → close()',
  ],
  sol: 'A cursor comes from a connection, a query must be executed before its rows can be fetched, and the connection is closed last. commit() is not needed for a SELECT.',
}));

// ================================================================ Assertion-reason
Q('ar_commit', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Rows inserted through a mysql.connector cursor are not saved permanently until `commit()` is called.',
  r: 'By default mysql.connector does not commit each statement automatically.',
  sol: 'Both are true, and R explains A: since autocommit is off by default, the changes stay in an open transaction until commit() makes them permanent.',
}));
Q('ar_tuple_rows', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: '`fetchone()` returns a row of the result as a tuple.',
  r: 'The connector returns each row of a result set as a tuple of its column values.',
  sol: 'Both are true and R explains A: fetchone() hands back the next row, and rows are tuples (it returns None only when no row is left).',
}));
Q('ar_one_cursor', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'One cursor object can be used to execute several queries one after another.',
  r: 'A new connection must be opened for every query a program runs.',
  sol: 'A is true: the same cursor can run many statements. R is false: one connection serves many queries until it is closed.',
}));
Q('ar_rowcount_attr', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'After an UPDATE, `cur.rowcount` gives the number of rows changed.',
  r: '`rowcount` is a method, so it must always be written as `cur.rowcount()`.',
  sol: 'A is true. R is false: rowcount is an attribute (a property) of the cursor and is written without brackets.',
}));
Q('ar_quotes', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'When a query is built with `format()`, a text value must be placed inside quotes in the query string.',
  r: 'SQL treats an unquoted word as the name of a column or keyword, not as a text value.',
  sol: 'Both are true and R explains A: format() pastes the value into the text as it is, so the quotes SQL needs around a string must be written in the query string.',
}));
Q('ar_select_commit', ar({
  t: 1, d: 2, c: 'understanding', key: 'd',
  a: '`commit()` must be called after every SELECT query before its rows can be fetched.',
  r: '`commit()` makes the changes of INSERT, UPDATE and DELETE statements permanent.',
  sol: 'A is false: a SELECT changes nothing, so its rows are fetched directly. R is true: commit() is for statements that change data.',
}));

// ================================================================ True/false, fill-blank, match, ordering
Q('tf_fetchall_list', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? `fetchall()` returns the remaining rows of a query as a list of tuples.',
  sol: 'Each row is a tuple; fetchall() collects all remaining rows into a list (an empty list if none remain).',
}));
Q('tf_server_needed', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? `mysql.connector.connect()` succeeds even when the MySQL server is not running, because the connector keeps its own copy of the data.',
  sol: 'The connector is only a driver; it holds no data. If the server is not running (or the login is wrong), connect() raises an error.',
}));
Q('tf_after_close', tf({
  t: 1, d: 2, c: 'application', ans: false,
  stem: 'True or false? After `mycon.close()`, the program can still run new queries through the cursor it created from `mycon`.',
  sol: 'Closing the connection ends the session with the server, so its cursors can no longer run queries; a new connection is needed.',
}));
Q('fb_cursor', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In the statement `cur = mycon.___()`, the missing method creates the object used to execute queries.',
  acc: [['cursor']],
  sol: 'The connection object\'s cursor() method creates a cursor.',
}));
Q('fb_commit', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'To make an UPDATE on the stock table permanent, the program calls `mycon.___()`.',
  acc: [['commit']],
  sol: 'commit() saves the changes of the current transaction.',
}));
Q('fb_placeholder', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Fill in the placeholder that mysql.connector expects in this pen-price query: `cur.execute("SELECT iname FROM item WHERE price < ___", (50,))`',
  acc: [['%s']],
  sol: 'mysql.connector uses %s for every value, whatever its type; the values are given as a tuple in execute().',
}));
Q('mt_methods', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each part of a Python–MySQL program with what it does.',
  pairs: [
    [ic('connect()'), 'Opens a session with the MySQL server'],
    [ic('cursor()'), 'Creates the object that runs SQL statements'],
    [ic('execute()'), 'Sends one SQL statement to the server'],
    [ic('fetchall()'), 'Returns all remaining rows of a result'],
  ],
  sol: 'connect() opens the connection, cursor() makes a cursor from it, execute() runs a statement, and fetchall() reads the rows of a SELECT.',
}));
Q('mt_returns', match({
  t: 1, d: 3, c: 'application',
  stem: 'Match each expression, used after a query on the patient table, with the kind of value it gives.',
  pairs: [
    [`${ic('fetchone()')} when a row is left`, 'A tuple'],
    [`${ic('fetchone()')} when no row is left`, ic('None')],
    [ic('fetchall()'), 'A list of tuples'],
    [`${ic('rowcount')} after a DELETE`, 'An integer'],
  ],
  sol: 'Rows are tuples; fetchone() gives None at the end; fetchall() gives a list; rowcount is a whole number of rows affected.',
}));
Q('ord_steps', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of a program that adds a new item to the stationery shop\'s database in the correct order.',
  items: [
    'Import mysql.connector',
    'Open a connection with connect()',
    'Create a cursor with cursor()',
    'Run the INSERT statement with execute()',
    'Save the change with commit()',
    'Close the connection with close()',
  ],
  sol: 'Import the module, connect, create a cursor, execute the statement, commit the change, and close the connection.',
}));

// ================================================================ Code-output (executed through sqlite3)
const cSec12B = prog('school',
  'cur.execute("SELECT name FROM student WHERE sec = \'12B\' ORDER BY name DESC")',
  'for row in cur.fetchall():',
  '    print(row[0].upper())',
);
Q('co_sec12b', co({
  t: 1, d: 2, c: 'understanding', marks: 2, code: cSec12B, output: my(cSec12B, SCHOOL),
  pre: 'The class teacher of 12B lists her students in reverse alphabetical order, in capitals. Write the exact output.',
  sol: 'Two students are in 12B, Bhavna and Eshan; ORDER BY name DESC puts Eshan first, and upper() capitalises each name.',
}));
const cTwice = prog('shop',
  'cur.execute("SELECT iname, qty FROM item WHERE qty < 20 ORDER BY qty")',
  'r1 = cur.fetchone()',
  'r2 = cur.fetchone()',
  'print(r1)',
  'print(r2[0], "needs", 20 - r2[1], "more")',
);
Q('co_low_stock', co({
  t: 1, d: 3, c: 'application', marks: 2, code: cTwice, output: my(cTwice, SHOP),
  pre: 'The shopkeeper reads low-stock items (fewer than 20) one row at a time. Write the exact output.',
  sol: 'Rows with qty below 20, in qty order: Highlighter 0, Stapler 8, Geometry box 12. r1 is the first tuple; r2 is the Stapler row, which needs 20 − 8 = 12 more.',
}));
const cRaise = prog('school',
  'cur.execute("UPDATE student SET fee = fee + 250 WHERE sec = \'12A\'")',
  'mycon.commit()',
  'print("Rows updated:", cur.rowcount)',
  'cur.execute("SELECT name, fee FROM student WHERE sec = \'12A\' ORDER BY roll")',
  'for name, fee in cur.fetchall():',
  '    print(name, fee)',
);
Q('co_fee_raise', co({
  t: 1, d: 3, c: 'application', marks: 3, code: cRaise, output: my(cRaise, SCHOOL),
  pre: 'The accounts office raises the fee of section 12A by ₹250 and then checks the new fees. Write the exact output.',
  sol: 'Aarav and Chetan are in 12A, so 2 rows change; their fees become 4500 + 250 = 4750 and 4800 + 250 = 5050.',
}));
const cKept = code(
  ...CON('clinic'),
  'cur.execute("INSERT INTO patient VALUES (16, \'Tara\', \'Ortho\', 52)")',
  'mycon.commit()',
  'mycon.close()',
  '',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  '                                passwd="your_password", database="clinic")',
  'cur = mycon.cursor()',
  'cur.execute("SELECT COUNT(*) FROM patient WHERE dept = \'Ortho\'")',
  'print(cur.fetchone())',
);
Q('co_commit_kept', co({
  t: 1, d: 3, c: 'application', marks: 2, code: cKept, output: my(cKept, CLINIC),
  pre: 'The clinic adds Tara to the orthopaedics list, commits, and checks the count in a new session. Write the exact output.',
  sol: 'The INSERT was committed, so it survives closing the connection. Ortho now has Rohan and Tara: COUNT(*) gives 2, and fetchone() returns it as a one-item tuple.',
}));
const cLost2 = code(
  ...CON('shop'),
  'cur.execute("DELETE FROM item WHERE qty = 0")',
  'print("Deleted:", cur.rowcount)',
  'mycon.close()',
  '',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  '                                passwd="your_password", database="shop")',
  'cur = mycon.cursor()',
  'cur.execute("SELECT COUNT(*) FROM item")',
  'print("Items:", cur.fetchone()[0])',
);
Q('co_delete_uncommitted', co({
  t: 1, d: 4, c: 'analysis', marks: 2, code: cLost2, output: my(cLost2, SHOP),
  pre: 'A trainee at the stationery shop deletes out-of-stock items but forgets one statement. Write the exact output of the two sessions.',
  sol: 'The DELETE affects one row (the Highlighter), so rowcount is 1. It is never committed, so it is rolled back when the connection closes, and the new session still counts 5 items.',
}));
const cFmtRun = prog('shop',
  'limit = 50',
  'q = "SELECT iname FROM item WHERE price < {} ORDER BY price".format(limit)',
  'print(q)',
  'cur.execute(q)',
  'print(cur.fetchall())',
);
Q('co_format_run', co({
  t: 1, d: 3, c: 'understanding', marks: 2, code: cFmtRun, output: my(cFmtRun, SHOP),
  pre: 'A query for items cheaper than ₹50 is built with format() and printed before it runs. Write the exact output.',
  sol: 'format() puts 50 into the string. Items under ₹50 in price order are the Gel pen (15) and the Highlighter (35).',
}));
const cParamLoop = prog('school',
  'for r in [5, 2, 4]:',
  '    cur.execute("SELECT name, house FROM student WHERE roll = %s", (r,))',
  '    name, house = cur.fetchone()',
  '    print(r, name, house[0])',
);
Q('co_param_loop', co({
  t: 1, d: 3, c: 'application', marks: 2, code: cParamLoop, output: my(cParamLoop, SCHOOL),
  pre: 'The house captain looks up three roll numbers with a parameterised query and prints the first letter of each house. Write the exact output.',
  sol: 'Each pass passes r in a one-item tuple. Roll 5 is Eshan (Raman), 2 is Bhavna (Raman) and 4 is Dia (Tagore); house[0] is the first letter.',
}));
const cManyAll = prog('clinic',
  'cur.execute("SELECT pid FROM patient ORDER BY age")',
  'print(cur.fetchmany(3))',
  'print(cur.fetchall())',
);
Q('co_fetchmany_rest', co({
  t: 1, d: 3, c: 'application', marks: 2, code: cManyAll, output: my(cManyAll, CLINIC),
  pre: 'The clinic lists patient IDs from youngest to oldest, three first and then the rest. Write the exact output.',
  sol: 'Ages in order: Kabir 8 (12), Sana 27 (15), Meera 34 (11), Rohan 45 (14), Farah 61 (13). fetchmany(3) takes the first three; fetchall() returns the remaining two.',
}));
const cDept = prog('clinic',
  'cur.execute("DELETE FROM patient WHERE dept = \'ENT\'")',
  'mycon.commit()',
  'gone = cur.rowcount',
  'cur.execute("SELECT pname FROM patient ORDER BY pname")',
  'left = [r[0] for r in cur.fetchall()]',
  'print(gone, left)',
);
Q('co_delete_dept', co({
  t: 1, d: 3, c: 'application', marks: 2, code: cDept, output: my(cDept, CLINIC),
  pre: 'The ENT clinic moves to another building, so its patients are removed from this database. Write the exact output.',
  sol: 'Kabir and Sana are ENT patients: 2 rows go. The remaining names in alphabetical order are Farah, Meera and Rohan, collected into a list.',
}));
const cAlert = prog('shop',
  'cur.execute("SELECT iname, qty FROM item ORDER BY icode")',
  'for name, qty in cur.fetchall():',
  '    if qty == 0:',
  '        print(name, ": out of stock")',
  '    elif qty < 15:',
  '        print(name, ": reorder")',
);
Q('co_stock_alert', co({
  t: 1, d: 3, c: 'application', marks: 2, code: cAlert, output: my(cAlert, SHOP),
  pre: 'Every evening the stationery shop prints stock alerts from its item table. Write the exact output.',
  sol: 'In icode order: Geometry box (12) needs reordering, Highlighter (0) is out of stock, and Stapler (8) needs reordering. print() puts a space before the colon because the name and the text are separate arguments.',
}));
const cLen = prog('school',
  'cur.execute("SELECT * FROM student WHERE fee >= 4500 ORDER BY fee")',
  'rows = cur.fetchall()',
  'print(len(rows), rows[-1][1], rows[0][3])',
);
Q('co_len_rows', co({
  t: 1, d: 3, c: 'analysis', marks: 2, code: cLen, output: my(cLen, SCHOOL),
  pre: 'The bursar counts students paying ₹4500 or more and reads two values from the result. Write the exact output.',
  sol: 'Fees of 4500 or more: Aarav 4500, Chetan 4800, Eshan 5000 (in fee order). len gives 3; the last row is Eshan\'s, column 1 is the name; the first row\'s column 3 is the fee 4500.',
}));
const cConnTest = cConnected;
Q('co_connected', co({
  t: 1, d: 1, c: 'understanding', marks: 1, code: cConnTest, output: oConnected,
  pre: 'The clinic\'s program first checks its connection. Assuming the server is running and the login is correct, write the exact output.',
  sol: 'is_connected() returns True for an open connection, so the if branch prints the message.',
}));
const cMaxPrice = prog('shop',
  'cur.execute("SELECT MAX(price), MIN(price) FROM item")',
  'hi, lo = cur.fetchone()',
  'print("Range:", hi - lo)',
);
Q('co_price_range', co({
  t: 1, d: 2, c: 'understanding', marks: 1, code: cMaxPrice, output: my(cMaxPrice, SHOP),
  pre: 'The shopkeeper finds the gap between her dearest and cheapest items. Write the exact output.',
  sol: 'MAX(price) is 150 and MIN(price) is 15; the row is unpacked into hi and lo, and 150 − 15 = 135.',
}));

// ================================================================ Short answers (2 and 3 marks)
Q('s_steps', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'List, in order, the steps a Python program follows to read records from a MySQL table of library books.',
  model: '1. Import **mysql.connector**. 2. Open a connection with **connect()**. 3. Create a **cursor**. 4. Run the SELECT with **execute()**. 5. Read rows with **fetchone()/fetchall()**. 6. **Close** the connection.',
  sol: 'Six steps in order; commit() is not needed for reading.',
  scheme: [['First three steps in order', 1], ['Execute, fetch and close', 1]],
}));
Q('s_fetchone_fetchall', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between `fetchone()` and `fetchall()` with reference to a query on the clinic\'s patient table.',
  model: '**fetchone()** returns the **next single row** as a tuple (or **None** when no row is left). **fetchall()** returns **all remaining rows** as a **list of tuples** (an empty list if none remain).',
  sol: 'One row as a tuple vs all remaining rows as a list; mention the end-of-result values.',
  scheme: [['fetchone()', 1], ['fetchall()', 1]],
}));
Q('s_rowcount', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'What is `rowcount`? What would it show after the shop runs `UPDATE item SET price = price + 5 WHERE price < 50`?',
  model: `**rowcount** is a cursor attribute giving the **number of rows affected** by the last statement. Here two items cost under ₹50 (Gel pen and Highlighter), so it shows **${my(prog('shop', 'cur.execute("UPDATE item SET price = price + 5 WHERE price < 50")', 'mycon.commit()', 'print(cur.rowcount)'), SHOP)}**.`,
  sol: 'Meaning, then apply it to the data.',
  scheme: [['Meaning of rowcount', 1], ['Correct value for this update', 1]],
}));
Q('s_commit_need', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is `commit()` needed after an INSERT but not after a SELECT in a school fee program?',
  model: 'An **INSERT changes** the data; mysql.connector keeps the change in an open transaction (no autocommit), so **commit()** is needed to save it permanently. A **SELECT only reads** data and changes nothing, so there is nothing to commit.',
  sol: 'Change vs read; autocommit is off by default.',
  scheme: [['Why INSERT needs commit', 1], ['Why SELECT does not', 1]],
}));
Q('s_placeholder_vs_format', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A program must look up a book by its title typed by the user. Compare building the query with `format()` and passing the title with a `%s` placeholder.',
  model: 'With **format()** the title is pasted into the SQL text, so the programmer must add quotes, and a stray quote in the input can **break or change the query**. With **%s** the title is sent **separately as data** and the driver quotes it, which is **safer** (it prevents SQL injection).',
  sol: 'Two contrasts: quoting and safety.',
  scheme: [['format() pastes the value into the text', 1], ['%s passes it separately and safely', 1]],
}));
const cErrCommit = code(
  ...CON('shop'),
  'name = "Eraser"',
  'cur.execute("INSERT INTO item VALUES (106, %s, 10, 50)", name)',
  'mycon.close()',
);
// The bad parameter (a str, not a tuple) fails in both drivers: confirm that this program really errors.
const eErrCommit = myErr(cErrCommit, SHOP);
const cFixCommit = code(
  ...CON('shop'),
  'name = "Eraser"',
  'cur.execute("INSERT INTO item VALUES (106, %s, 10, 50)", (name,))',
  'mycon.commit()',
  'mycon.close()',
  '',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  '                                passwd="your_password", database="shop")',
  'cur = mycon.cursor()',
  'cur.execute("SELECT iname FROM item WHERE icode = 106")',
  'print(cur.fetchone())',
);
expect(my(cFixCommit, SHOP), "('Eraser',)", 'fixed eraser insert');
Q('s_err_commit', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `The shop assistant wants to add an eraser to the item table, but the record is never stored. Find **two** errors and write the corrected statements.\n\n${F(cErrCommit)}`,
  model: `1. The value for %s must be passed as a **tuple**: \`(name,)\`, not \`name\` (as written, the driver raises an error).\n2. **commit()** is missing before closing, so even a successful insert would be discarded.\n\n${F('cur.execute("INSERT INTO item VALUES (106, %s, 10, 50)", (name,))', 'mycon.commit()')}`,
  sol: 'Parameters go in a tuple; changes need commit() before close().',
  scheme: [['Tuple for the parameter', 1], ['commit() added', 1]],
}));
if (!eErrCommit) throw new Error('expected an error');
const cErrQuote = prog('school',
  'h = "Tagore"',
  'cur.execute("SELECT name FROM student WHERE house = {}".format(h))',
  'print(cur.fetchall())',
);
myErr(cErrQuote, SCHOOL); // the unquoted text makes the server reject the query (unknown column) in both drivers
const cFixQuote = prog('school',
  'h = "Tagore"',
  'cur.execute("SELECT name FROM student WHERE house = \'{}\' ORDER BY roll".format(h))',
  'print(cur.fetchall())',
);
const oFixQuote = expect(my(cFixQuote, SCHOOL), "[('Aarav',), ('Dia',)]", 'fixed quote');
Q('s_err_format_quotes', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `A program meant to list Tagore house students stops with an error from the database. Explain the error and correct the statement.\n\n${F(cErrQuote)}`,
  model: `format() produces \`... WHERE house = Tagore\`; without quotes the server reads **Tagore as a column name** and reports an unknown column. Put the field inside quotes:\n\n${F('cur.execute("SELECT name FROM student WHERE house = \'{}\'".format(h))')}\n\nIt then prints ${ic(oFixQuote)} (with ORDER BY roll).`,
  sol: 'Text values need quotes around the {} field.',
  scheme: [['Cause: unquoted text read as a column', 1], ['Corrected statement', 1]],
}));
Q('s_connect_stmt', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Write statements to connect to a MySQL database `hostel` on `localhost` with user `warden` and password `your_password`, and to create a cursor named `hc`.',
  model: F('import mysql.connector', 'con = mysql.connector.connect(host="localhost", user="warden",', '                              passwd="your_password", database="hostel")', 'hc = con.cursor()'),
  sol: 'connect() with host, user, password and database, then cursor() on the connection.',
  scheme: [['Correct connect() with all four details', 1], ['Cursor created from the connection', 1]],
}));
const cComplete = code(
  'import mysql.connector',
  'mycon = mysql.connector.connect(host="localhost", user="root",',
  '                                passwd="your_password", database="clinic")',
  'cur = mycon.cursor()',
  'cur.execute("UPDATE patient SET dept = \'Dental\' WHERE pid = 14")',
  'mycon.commit()',
  'cur.execute("SELECT pname FROM patient WHERE dept = \'Dental\' ORDER BY pid")',
  'for r in cur.fetchall():',
  '    print(r[0])',
  'mycon.close()',
);
const oComplete = expect(my(cComplete, CLINIC), 'Meera\nFarah\nRohan', 'complete');
Q('s3_complete', short({
  t: 1, d: 2, c: 'application', marks: 3,
  stem: `The clinic moves patient 14 to the Dental department and lists all Dental patients. Write the missing statements 1, 2 and 3.\n\n${F(
    'import mysql.connector',
    'mycon = mysql.connector.connect(host="localhost", user="root",',
    '                                passwd="your_password", database="clinic")',
    'cur = __________                      # Statement 1: create a cursor',
    'cur.execute("UPDATE patient SET dept = \'Dental\' WHERE pid = 14")',
    '__________                            # Statement 2: save the change',
    'cur.execute("SELECT pname FROM patient WHERE dept = \'Dental\' ORDER BY pid")',
    'for r in __________:                  # Statement 3: all rows of the result',
    '    print(r[0])',
    'mycon.close()',
  )}`,
  model: `Statement 1: \`mycon.cursor()\`\nStatement 2: \`mycon.commit()\`\nStatement 3: \`cur.fetchall()\`\n\nThe completed program prints:\n\n${OUT(oComplete)}`,
  sol: 'Cursor from the connection, commit on the connection, fetchall on the cursor.',
  scheme: [['Statement 1', 1], ['Statement 2', 1], ['Statement 3', 1]],
}));
const cErrMulti = code(
  'import mysql.connector as sq',
  'db = sq.connect(host="localhost", user="root", passwd="your_password", database="shop")',
  'cur = db.cursor',
  'cur.execute("SELECT iname FROM item WHERE qty > 30")',
  'print(cur.fetchall)',
  'db.close',
);
const cFixMulti = code(
  'import mysql.connector as sq',
  'db = sq.connect(host="localhost", user="root", passwd="your_password", database="shop")',
  'cur = db.cursor()',
  'cur.execute("SELECT iname FROM item WHERE qty > 30 ORDER BY icode")',
  'print(cur.fetchall())',
  'db.close()',
);
const eMulti = myErr(cErrMulti, SHOP);
const oFixMulti = expect(my(cFixMulti, SHOP), "[('Notebook',), ('Gel pen',)]", 'fix multi');
Q('s3_err_multi', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: `Mohit's program should print the items with more than 30 pieces in stock, but it fails. Identify **three** errors and rewrite the program correctly.\n\n${F(cErrMulti)}`,
  model: `Methods must be **called** with brackets: \`db.cursor()\`, \`cur.fetchall()\`, \`db.close()\`. As written, \`cur\` is the method itself, so \`cur.execute(...)\` fails (${ic(eMulti.split(':')[0])}), \`print(cur.fetchall)\` would print a method object, and \`db.close\` would not close anything.\n\n${F('cur = db.cursor()', 'print(cur.fetchall())', 'db.close()')}\n\nWith these three corrections the program prints ${ic(oFixMulti)}.`,
  sol: 'Three missing pairs of brackets; the first one makes the program crash.',
  scheme: [['cursor() corrected', 1], ['fetchall() corrected', 1], ['close() corrected', 1]],
}));
const cShowLow = code(
  'import mysql.connector',
  '',
  'def show_low(level):',
  '    con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="shop")',
  '    cur = con.cursor()',
  '    cur.execute("SELECT icode, iname, qty FROM item WHERE qty < %s ORDER BY qty", (level,))',
  '    rows = cur.fetchall()',
  '    for code_no, name, qty in rows:',
  '        print(code_no, name, qty)',
  '    print("Items:", len(rows))',
  '    con.close()',
  '',
  'show_low(15)',
);
const oShowLow = expect(my(cShowLow, SHOP), '104 Highlighter 0\n105 Stapler 8\n103 Geometry box 12\nItems: 3', 'show_low');
Q('s3_display_fn', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Write a function `show_low(level)` that displays the code, name and quantity of every item in the shop\'s `item` table whose quantity is below `level` (lowest stock first) and then the number of such items. Use a `%s` placeholder. Show the output of `show_low(15)` for the table in the notes.',
  model: `${F(cShowLow)}\n\nOutput:\n\n${OUT(oShowLow)}`,
  sol: 'Parameterised SELECT with ORDER BY qty, fetchall, loop, count with len.',
  scheme: [['Connection and parameterised query', 1], ['Loop displaying the rows', 1], ['Count and close', 1]],
}));
const cUpdHouse = code(
  'import mysql.connector',
  '',
  'def raise_fee(house, amount):',
  '    con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="school")',
  '    cur = con.cursor()',
  '    cur.execute("UPDATE student SET fee = fee + %s WHERE house = %s", (amount, house))',
  '    con.commit()',
  '    print(cur.rowcount, "record(s) updated")',
  '    con.close()',
  '',
  'raise_fee("Tagore", 400)',
);
const oUpdHouse = expect(my(cUpdHouse, SCHOOL), '2 record(s) updated', 'raise fee');
Q('s3_update_prog', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Write a function `raise_fee(house, amount)` that increases the fee of every student of the given house by `amount` in the `student` table, saves the change and prints how many records were updated. Show the output of `raise_fee("Tagore", 400)`.',
  model: `${F(cUpdHouse)}\n\nOutput: ${ic(oUpdHouse)}`,
  sol: 'UPDATE with two placeholders in the right order, commit, rowcount.',
  scheme: [['Parameterised UPDATE with values in order', 1], ['commit()', 1], ['rowcount printed', 1]],
}));
Q('s3_why_param', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A student says, "I will always build queries by joining the user\'s text into the SQL string; placeholders are unnecessary." Evaluate this with an example from a login form.',
  model: 'Joining text is **unsafe**. If a user types `x\' OR \'1\'=\'1` as a password, the joined query becomes `... WHERE pwd = \'x\' OR \'1\'=\'1\'`, which is always true, so anyone could log in (**SQL injection**). With `%s` placeholders the driver sends the text **as data** and quotes it, so it cannot change the query; it also avoids quoting mistakes. So placeholders **are necessary** for user input.',
  sol: 'Judge the claim, give an injection example, and state the benefit of placeholders.',
  scheme: [['Judgement that the claim is wrong', 1], ['Example of the risk', 1], ['How placeholders prevent it', 1]],
}));

// ================================================================ Long answers (5 marks)
const cAddPatient = code(
  'import mysql.connector',
  'con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="clinic")',
  'cur = con.cursor()',
  'pid = int(input("Patient ID: "))',
  'name = input("Name: ")',
  'dept = input("Department: ")',
  'age = int(input("Age: "))',
  'cur.execute("INSERT INTO patient VALUES (%s, %s, %s, %s)", (pid, name, dept, age))',
  'con.commit()',
  'print("Saved", cur.rowcount, "record")',
  'cur.execute("SELECT * FROM patient WHERE dept = %s ORDER BY pid", (dept,))',
  'for row in cur.fetchall():',
  '    print(row)',
  'con.close()',
);
const inAddPatient = '17\nIshaan\nENT\n19\n';
const oAddPatient = my(cAddPatient, CLINIC, inAddPatient);
Q('l_insert_input', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that inputs a patient\'s ID, name, department and age, adds the record to the clinic\'s `patient` table using `%s` placeholders, saves it, and then displays all patients of that department. Show the output when the input is 17, Ishaan, ENT, 19.',
  model: `${F(cAddPatient)}\n\nWith input 17, Ishaan, ENT and 19 the program prints the following. (The typed values come from the keyboard and are not part of the printed output, so the four prompts run together on the first line.)\n\n${OUT(oAddPatient)}`,
  sol: 'Input and convert, parameterised INSERT, commit, then a parameterised SELECT and a display loop.',
  scheme: [['Connection and cursor', 1], ['Inputs with int() where needed', 1], ['Parameterised INSERT', 1], ['commit()', 1], ['Display of the department\'s records', 1]],
}));
const cSearch = code(
  'import mysql.connector',
  'con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="school")',
  'cur = con.cursor()',
  'roll = int(input("Roll number: "))',
  'cur.execute("SELECT name, sec, fee FROM student WHERE roll = %s", (roll,))',
  'row = cur.fetchone()',
  'if row is None:',
  '    print("No student with roll", roll)',
  'else:',
  '    print("Name:", row[0])',
  '    print("Section:", row[1], "Fee:", row[2])',
  'con.close()',
);
const oSearch3 = my(cSearch, SCHOOL, '3\n');
const oSearch9 = my(cSearch, SCHOOL, '9\n');
Q('l_search', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that inputs a roll number and displays the name, section and fee of that student from the `student` table, or a suitable message if no such student exists. Use `fetchone()`. Show the output for the inputs 3 and 9.',
  model: `${F(cSearch)}\n\nPrinted output (the typed number itself is not printed, so the answer follows the prompt):\n\nInput 3:\n\n${OUT(oSearch3)}\n\nInput 9:\n\n${OUT(oSearch9)}`,
  sol: 'fetchone() returns None when no row matches; test for it before indexing.',
  scheme: [['Connection, cursor and input', 1], ['Parameterised SELECT', 1], ['fetchone() and the None test', 1], ['Display of the fields', 1], ['Closing; correct sample output', 1]],
}));
const cPrice = code(
  'import mysql.connector',
  'con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="shop")',
  'cur = con.cursor()',
  'cur.execute("UPDATE item SET price = price + 10 WHERE price >= 50")',
  'con.commit()',
  'print("Prices changed:", cur.rowcount)',
  'cur.execute("SELECT iname, price FROM item ORDER BY price DESC")',
  'for name, price in cur.fetchall():',
  '    print(name.ljust(14), price)',
  'con.close()',
);
const oPrice = my(cPrice, SHOP);
Q('l_update_price', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'The stationery shop increases the price of every item costing ₹50 or more by ₹10. Write a program that makes this change permanent, prints how many prices changed, and then displays every item\'s name and price from the costliest to the cheapest. Show the output for the table in the notes.',
  model: `${F(cPrice)}\n\nOutput:\n\n${OUT(oPrice)}`,
  sol: 'UPDATE with a WHERE condition, commit, rowcount, then SELECT … ORDER BY price DESC.',
  scheme: [['Connection and cursor', 1], ['Correct UPDATE', 1], ['commit() and rowcount', 1], ['SELECT with ORDER BY DESC', 1], ['Display loop and close', 1]],
}));
const cDelZero = code(
  'import mysql.connector',
  '',
  'def clear_out_of_stock():',
  '    con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="shop")',
  '    cur = con.cursor()',
  '    cur.execute("SELECT iname FROM item WHERE qty = 0")',
  '    names = [r[0] for r in cur.fetchall()]',
  '    cur.execute("DELETE FROM item WHERE qty = 0")',
  '    con.commit()',
  '    print("Removed:", names)',
  '    cur.execute("SELECT COUNT(*) FROM item")',
  '    print("Items left:", cur.fetchone()[0])',
  '    con.close()',
  '',
  'clear_out_of_stock()',
);
const oDelZero = expect(my(cDelZero, SHOP), "Removed: ['Highlighter']\nItems left: 4", 'del zero');
Q('l_delete_zero_stock', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Write a function `clear_out_of_stock()` that finds the names of items with quantity 0 in the shop\'s `item` table, deletes those items permanently, and prints the names removed and the number of items left. Show the output for the table in the notes.',
  model: `${F(cDelZero)}\n\nOutput:\n\n${OUT(oDelZero)}`,
  sol: 'Read the names first (they are gone after the DELETE), delete, commit, then count.',
  scheme: [['Connection and cursor', 1], ['SELECT names before deleting', 1], ['DELETE with the condition', 1], ['commit()', 1], ['Display of names and count', 1]],
}));
const cAddStudent = code(
  'import mysql.connector',
  '',
  'def add_student(roll, name, sec, fee, house):',
  '    con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="school")',
  '    cur = con.cursor()',
  '    cur.execute("INSERT INTO student VALUES (%s, %s, %s, %s, %s)", (roll, name, sec, fee, house))',
  '    con.commit()',
  '    con.close()',
  '',
  'def house_list(house):',
  '    con = mysql.connector.connect(host="localhost", user="root", passwd="your_password", database="school")',
  '    cur = con.cursor()',
  '    cur.execute("SELECT roll, name FROM student WHERE house = %s ORDER BY roll", (house,))',
  '    for roll, name in cur.fetchall():',
  '        print(roll, name)',
  '    con.close()',
  '',
  'add_student(6, "Gauri", "12C", 4600, "Bose")',
  'house_list("Bose")',
);
const oAddStudent = expect(my(cAddStudent, SCHOOL), '3 Chetan\n6 Gauri', 'add student');
Q('l_add_and_list', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'Write two functions for the school database: `add_student(roll, name, sec, fee, house)`, which adds a record to `student` using placeholders and saves it, and `house_list(house)`, which displays the roll number and name of every student of a house in roll order. Show the output of `add_student(6, "Gauri", "12C", 4600, "Bose")` followed by `house_list("Bose")`.',
  model: `${F(cAddStudent)}\n\nOutput:\n\n${OUT(oAddStudent)}`,
  sol: 'Five placeholders with a five-value tuple and commit(); a parameterised SELECT with ORDER BY roll.',
  scheme: [['add_student: connection and parameterised INSERT', 1], ['add_student: commit and close', 1], ['house_list: parameterised SELECT', 1], ['house_list: display loop', 1], ['Correct output', 1]],
}));
Q('l_explain', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the steps of connecting a Python program to a MySQL database and working with its data. Name the method or attribute used at each step.',
  model: '1. **Import** the driver: `import mysql.connector`.\n2. **Connect** with `connect(host, user, passwd, database)`; `is_connected()` checks the connection.\n3. Create a **cursor** with `cursor()`; it runs statements and holds results.\n4. **Execute** SQL with `execute()`, passing values through **%s placeholders** (or building the text with `format()`).\n5. For a SELECT, read rows with **fetchone()**, **fetchall()** or **fetchmany(n)**; for INSERT, UPDATE or DELETE, save with **commit()** and check **rowcount**; finally **close()** the connection.',
  sol: 'Five steps, each with the right method.',
  scheme: [['Import', 1], ['connect() with its details', 1], ['cursor()', 1], ['execute() with placeholders', 1], ['Fetch / commit / rowcount / close', 1]],
}));

// ================================================================ Case-based (4 marks)
const cClinicCase = prog('clinic',
  'cur.execute("SELECT pname, age FROM patient WHERE dept = %s ORDER BY age", ("Dental",))',
  'rows = cur.fetchall()',
  'for name, age in rows:',
  '    print(name, age)',
  'print("Total:", len(rows))',
);
const oClinicCase = expect(my(cClinicCase, CLINIC), 'Meera 34\nFarah 61\nTotal: 2', 'clinic case');
Q('cb_clinic', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the appointment desk at Shanti Clinic and answer the questions. *(Imagined clinic and patients, written by SOYL for practice.)*',
  passage: `Shanti Clinic keeps its patient records in a MySQL table \`patient(pid, pname, dept, age)\` with five rows: (11, Meera, Dental, 34), (12, Kabir, ENT, 8), (13, Farah, Dental, 61), (14, Rohan, Ortho, 45) and (15, Sana, ENT, 27). The receptionist runs this program each morning.\n\n${F(cClinicCase)}`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'b', stem: 'What is the last line the program prints?', opts: [ic('Total: 5'), ic(oClinicCase.split('\n')[2]), ic('Total: 1'), ic('2')], sol: 'Two patients are in Dental (Meera and Farah), and len(rows) counts the rows fetched.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'In this program, `("Dental",)` supplies the value for the ___ placeholder in the query.', acc: [['%s']], sol: 'The %s placeholder receives the value from the tuple.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write statements to move Kabir (pid 12) to the Dental department permanently.', model: F('cur.execute("UPDATE patient SET dept = %s WHERE pid = %s", ("Dental", 12))', 'mycon.commit()'), sol: 'A parameterised UPDATE followed by commit().', scheme: [['Correct UPDATE', 1], ['commit()', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the program not need `mycon.commit()`? Name one statement that would need it.', model: 'The program only **reads** data with SELECT, so nothing changes and nothing needs saving. A statement such as **INSERT, UPDATE or DELETE** (e.g. adding a new patient) would need commit().', sol: 'SELECT reads; data-changing statements need commit().', scheme: [['Reason', 1], ['Example statement', 1]] }),
    ]),
  ],
}));
const cShopCase = prog('shop',
  'cur.execute("SELECT iname, price * qty FROM item WHERE qty > 0 ORDER BY icode")',
  'total = 0',
  'for name, value in cur.fetchall():',
  '    total = total + value',
  'print("Stock value:", total)',
);
const oShopCase = my(cShopCase, SHOP);
Q('cb_shop', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about Pencil Point, a stationery shop, and answer the questions. *(Imagined shop, items and prices, written by SOYL for practice.)*',
  passage: `Pencil Point stores its stock in a table \`item(icode, iname, price, qty)\`: (101, Notebook, 60, 40), (102, Gel pen, 15, 120), (103, Geometry box, 150, 12), (104, Highlighter, 35, 0), (105, Stapler, 90, 8). The owner uses this program to find the value of the stock on the shelves.\n\n${F(cShopCase)}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'c', stem: 'What does the program print?', opts: [ic('Stock value: 315'), ic('Stock value: 4000'), ic(oShopCase), ic('Stock value: 5')], sol: 'Values: 60 × 40 = 2400, 15 × 120 = 1800, 150 × 12 = 1800, 90 × 8 = 720 (the Highlighter is excluded); the total is 6720.' })),
    child('b', tf({ t: 1, d: 2, c: 'understanding', stem: 'True or false? Each item that `fetchall()` returns here is a tuple of two values.', ans: true, sol: 'Two columns are selected, so each row is a two-value tuple, unpacked into name and value.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write statements to record that 30 more highlighters have arrived (add 30 to the quantity of icode 104) and save the change.', model: F('cur.execute("UPDATE item SET qty = qty + 30 WHERE icode = %s", (104,))', 'mycon.commit()'), sol: 'Parameterised UPDATE that adds to qty, then commit().', scheme: [['Correct UPDATE', 1], ['commit()', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The owner suggests replacing the loop with `print(cur.fetchone())`. What would be printed, and why is this not the stock value?', model: `It prints only the **first row**, ${ic(my(prog('shop', 'cur.execute("SELECT iname, price * qty FROM item WHERE qty > 0 ORDER BY icode")', 'print(cur.fetchone())'), SHOP))}, which is the value of the notebooks alone. **fetchone()** reads one row, so the other items are never added.`, sol: 'fetchone() gives one tuple; the total needs all rows.', scheme: [['Correct printed tuple', 1], ['Reason', 1]] }),
    ]),
  ],
}));
const cFeeCase = prog('school',
  'cur.execute("SELECT name, fee FROM student WHERE fee < %s ORDER BY name", (4600,))',
  'for name, fee in cur.fetchall():',
  '    print(name, 4600 - fee)',
);
const oFeeCase = expect(my(cFeeCase, SCHOOL), 'Aarav 100\nBhavna 400\nDia 400', 'fee case');
Q('cb_school_fee', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the fee review at Hillview School and answer the questions. *(Imagined school, students and fees, written by SOYL for practice.)*',
  passage: `Hillview School keeps a table \`student(roll, name, sec, fee, house)\`: (1, Aarav, 12A, 4500, Tagore), (2, Bhavna, 12B, 4200, Raman), (3, Chetan, 12A, 4800, Bose), (4, Dia, 12C, 4200, Tagore), (5, Eshan, 12B, 5000, Raman). The school plans a minimum fee of ₹4600 and wants to know how much each student below it would pay extra.\n\n${F(cFeeCase)}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'a', stem: 'Which line does the program print **first**?', opts: [ic(oFeeCase.split('\n')[0]), ic('Bhavna 400'), ic('Aarav 4500'), ic('Dia 400')], sol: 'Three students pay less than 4600; ORDER BY name puts Aarav first, and 4600 − 4500 = 100.' })),
    child('b', mcq({ t: 1, d: 2, c: 'understanding', fixed: true, key: 'd', stem: 'Why is `(4600,)` written with a comma?', opts: ['To make the query run faster', 'Because the fee column is text', 'To commit the query', 'A one-value tuple needs a comma; without it the value is just a number in brackets'], sol: 'Parameters are passed as a tuple; (4600) is only the number 4600.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write statements to raise every fee below ₹4600 to ₹4600 and save the change.', model: F('cur.execute("UPDATE student SET fee = %s WHERE fee < %s", (4600, 4600))', 'mycon.commit()'), sol: 'One UPDATE with a condition and commit().', scheme: [['Correct UPDATE', 1], ['commit()', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): After that update, how many rows would `rowcount` report, and what would this program then print?', model: `**${my(prog('school', 'cur.execute("UPDATE student SET fee = %s WHERE fee < %s", (4600, 4600))', 'mycon.commit()', 'print(cur.rowcount)'), SCHOOL)}** rows (Aarav, Bhavna and Dia). Afterwards no fee is below 4600, so the program prints **nothing**.`, sol: 'Three rows change; the query then finds no rows.', scheme: [['rowcount 3', 1], ['Prints nothing', 1]] }),
    ]),
  ],
}));
// Confirm the claim in cb_school_fee (c)(ii): after the update the program prints nothing.
expect(my(code(...CON('school'), 'cur.execute("UPDATE student SET fee = %s WHERE fee < %s", (4600, 4600))', 'mycon.commit()', 'cur.execute("SELECT name, fee FROM student WHERE fee < %s ORDER BY name", (4600,))', 'for name, fee in cur.fetchall():', '    print(name, 4600 - fee)'), SCHOOL), '', 'after update nothing');
