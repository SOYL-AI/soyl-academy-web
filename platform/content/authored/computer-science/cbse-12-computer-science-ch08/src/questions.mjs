// CBSE 12 Computer Science, ch08 Structured Query Language (SQL) — question bank. Every table, row and query is
// written by SOYL (an imagined school, shop and fest); no textbook, NCERT or board-paper table or query is reused
// (D-036). Every result shown anywhere (code-output keys, MCQ options, solutions, model answers, case answers) is
// produced by running the query with runSql() in lib.mjs (SQLite through Python's sqlite3); nothing is typed by
// hand. Only SQL whose result is the same in MySQL is used: no integer division, no || joining, no date functions,
// always ORDER BY where the order of rows matters.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, runSql, runPy } from './lib.mjs';

const S2 = [25, 50];
const S3 = [40, 75];

// ---------------------------------------------------------------- the imagined databases
export const DB_SCHOOL = `
CREATE TABLE STUDENT (RollNo INT PRIMARY KEY, Name VARCHAR(20) NOT NULL, Class CHAR(3), Stream VARCHAR(12), Marks INT, City VARCHAR(15), ClubID INT);
INSERT INTO STUDENT VALUES
 (1, 'Aarav', '12A', 'Science', 88, 'Pune', 2),
 (2, 'Bhavna', '12B', 'Commerce', 74, 'Nagpur', 1),
 (3, 'Chirag', '12A', 'Science', 65, 'Pune', NULL),
 (4, 'Diya', '12C', 'Humanities', 91, 'Nashik', 3),
 (5, 'Eshan', '12B', 'Commerce', 58, 'Pune', 2),
 (6, 'Farah', '12C', 'Humanities', 79, 'Nagpur', NULL),
 (7, 'Gaurav', '12A', 'Science', 95, 'Nashik', 1),
 (8, 'Hina', '12B', 'Commerce', 83, 'Pune', 3);
CREATE TABLE CLUB (ClubID INT PRIMARY KEY, ClubName VARCHAR(20) NOT NULL, Teacher VARCHAR(20), Fee INT);
INSERT INTO CLUB VALUES
 (1, 'Robotics', 'Mr Rao', 500),
 (2, 'Music', 'Ms Iyer', 300),
 (3, 'Debate', 'Mr Khan', 200),
 (4, 'Chess', 'Ms Bose', 150);
`;
export const DB_SHOP = `
CREATE TABLE PRODUCT (PCode CHAR(3) PRIMARY KEY, PName VARCHAR(20) NOT NULL, Category VARCHAR(12), Price INT, Stock INT, SupCode CHAR(2));
INSERT INTO PRODUCT VALUES
 ('P01', 'Notebook', 'Stationery', 60, 120, 'S1'),
 ('P02', 'Gel Pen', 'Stationery', 25, 300, 'S2'),
 ('P03', 'Water Bottle', 'Kitchen', 180, 45, 'S3'),
 ('P04', 'Lunch Box', 'Kitchen', 240, 30, 'S3'),
 ('P05', 'Geometry Box', 'Stationery', 95, NULL, 'S1'),
 ('P06', 'Desk Lamp', 'Electrical', 650, 12, 'S4'),
 ('P07', 'Extension Board', 'Electrical', 420, 20, 'S4'),
 ('P08', 'Sketch Pens', 'Stationery', 110, 80, 'S2');
CREATE TABLE SUPPLIER (SupCode CHAR(2) PRIMARY KEY, SupName VARCHAR(25), City VARCHAR(15));
INSERT INTO SUPPLIER VALUES
 ('S1', 'Kaveri Traders', 'Chennai'),
 ('S2', 'Swastik Supplies', 'Indore'),
 ('S3', 'Neel Homeware', 'Kochi'),
 ('S4', 'Prakash Electricals', 'Jaipur'),
 ('S5', 'Ganga Distributors', 'Patna');
`;
export const DB_FEST = `
CREATE TABLE EVENT (EID CHAR(2) PRIMARY KEY, EName VARCHAR(20), Venue VARCHAR(12), Participants INT, EntryFee INT);
INSERT INTO EVENT VALUES
 ('E1', 'Quiz', 'Hall A', 40, 50),
 ('E2', 'Rangoli', 'Courtyard', 25, NULL),
 ('E3', 'Coding Sprint', 'Lab 2', 30, 100),
 ('E4', 'Debate', 'Hall A', 18, 50),
 ('E5', 'Photography', 'Courtyard', 22, 80),
 ('E6', 'Treasure Hunt', 'Ground', 60, 30);
`;

// ---------------------------------------------------------------- helpers
export const SQ = (...lines) => '```sql\n' + lines.join('\n') + '\n```';
const ic = (s) => '`' + s + '`';
export const sql = (db, query) => runSql(db, query);
/** A value as MySQL would show it: NULL for null; averages to MySQL's four decimal places, trailing zeros dropped. */
export const fmt = (v) => (v === null ? 'NULL' : typeof v === 'number' && !Number.isInteger(v) ? String(+v.toFixed(4)) : String(v));
/** Result set as an aligned plain-text table in a ```text fence (header row included). */
export function tt(res) {
  const all = [res.cols, ...res.rows.map((r) => r.map(fmt))];
  const w = res.cols.map((_, i) => Math.max(...all.map((r) => r[i].length)));
  return '```text\n' + all.map((r) => r.map((v, i) => v.padEnd(w[i])).join('  ').trimEnd()).join('\n') + '\n```';
}
/** Result set as a Markdown table (for visuals: headers + string rows). */
export const cells = (res) => res.rows.map((r) => r.map(fmt));
/** The code-output format: one row per line, values separated by a comma and a space, no headings. */
export const plain = (res) => res.rows.map((r) => r.map(fmt).join(', ')).join('\n');
const FMT = 'Write each row of the result on its own line, with the values separated by a comma and a space, and no column headings.';
/** Query + its result in a model answer. */
const qa = (db, query) => `${SQ(query)}\n\n${tt(sql(db, query))}`;
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
const expect = (got, want, what) => {
  if (JSON.stringify(got) !== JSON.stringify(want)) throw new Error(`${what}: expected ${JSON.stringify(want)}, SQL gave ${JSON.stringify(got)}`);
  return got;
};
/** The first value of the first row. */
const one = (db, query) => sql(db, query).rows[0][0];
/** Names (first column) of a result, joined. */
const list = (db, query) => sql(db, query).rows.map((r) => r[0]).join(', ');
/** SQL that must fail (error-finding items): returns SQLite's error line. */
export function sqlErr(db, query) {
  const code = `import sqlite3\ncon = sqlite3.connect(':memory:')\ncur = con.cursor()\ncur.executescript(${JSON.stringify(db)})\ncur.execute(${JSON.stringify(query)})\nprint(cur.fetchall())`;
  const r = runPy(code);
  if (!r.err) throw new Error(`sqlErr: expected an error for ${query}`);
  return r.err;
}
const SCHOOL_TABLES = () => `**STUDENT**\n\n${tt(sql(DB_SCHOOL, 'SELECT * FROM STUDENT ORDER BY RollNo'))}\n\n**CLUB**\n\n${tt(sql(DB_SCHOOL, 'SELECT * FROM CLUB ORDER BY ClubID'))}`;
const SHOP_TABLES = () => `**PRODUCT**\n\n${tt(sql(DB_SHOP, 'SELECT * FROM PRODUCT ORDER BY PCode'))}\n\n**SUPPLIER**\n\n${tt(sql(DB_SHOP, 'SELECT * FROM SUPPLIER ORDER BY SupCode'))}`;
const FEST_TABLE = () => `**EVENT**\n\n${tt(sql(DB_FEST, 'SELECT * FROM EVENT ORDER BY EID'))}`;
export { SCHOOL_TABLES, SHOP_TABLES, FEST_TABLE };

// ================================================================ t01 DDL, DML, data types and constraints
Q('m_ddl_cmd', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of these SQL commands belongs to the **Data Definition Language (DDL)**?',
  opts: [ic('ALTER TABLE'), ic('INSERT INTO'), ic('UPDATE'), ic('SELECT')],
  sol: 'DDL commands create or change the structure of database objects: CREATE, ALTER and DROP. INSERT, UPDATE and SELECT work on the data stored in tables, so they are DML commands.',
}));
Q('m_dml_cmd', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The office of an imagined school wants to change the city of a student whose record is already stored in the STUDENT table. Which category of command and which command should it use?',
  opts: ['DML, the UPDATE command', 'DDL, the ALTER TABLE command', 'DDL, the DROP TABLE command', 'DML, the INSERT INTO command'],
  sol: 'Changing a value inside an existing row changes data, not structure, so a DML command is needed: UPDATE. ALTER TABLE changes columns, DROP TABLE removes the whole table, and INSERT adds a new row.',
}));
Q('m_char_space', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A column is declared as `CHAR(10)` and the value `Pune` (4 characters) is stored in it. How much space does MySQL keep for this value?',
  opts: ['A fixed 10 characters, padded with spaces', 'Only 4 characters', '5 characters: the value and its length', 'As many characters as the longest value in the column'],
  sol: 'CHAR(n) is fixed-length: every value occupies n characters, padded with spaces. VARCHAR(n) is variable-length and keeps only the characters actually entered (up to n).',
}));
Q('m_pk', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement about a **PRIMARY KEY** column of a MySQL table is correct?',
  opts: [
    'Its values must be unique and it cannot contain NULL',
    'Its values may repeat but cannot be NULL',
    'A table may have several separate primary keys',
    'It must always be the first column of the table',
  ],
  sol: 'A primary key identifies each row, so it is both UNIQUE and NOT NULL. A table has only one primary key (it may span more than one column), and its position among the columns does not matter.',
}));
Q('m_describe', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which MySQL command shows the column names, data types and keys of the table PRODUCT?',
  opts: [ic('DESCRIBE PRODUCT;'), ic('SHOW PRODUCT;'), ic('SELECT STRUCTURE FROM PRODUCT;'), ic('DISPLAY TABLE PRODUCT;')],
  sol: 'DESCRIBE (or DESC) shows the structure of a table. SHOW is used as SHOW DATABASES or SHOW TABLES; the other two are not SQL commands.',
}));
Q('m_alter_add', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Meera wants to add a column `Phone` of type `CHAR(10)` to the existing STUDENT table without losing any data. Which statement should she run?',
  opts: [ic('ALTER TABLE STUDENT ADD Phone CHAR(10);'), ic('UPDATE STUDENT ADD Phone CHAR(10);'), ic('INSERT INTO STUDENT COLUMN Phone CHAR(10);'), ic('CREATE TABLE STUDENT ADD Phone CHAR(10);')],
  sol: 'A new column changes the structure of the table, so it needs ALTER TABLE … ADD. UPDATE changes values, INSERT adds rows and CREATE TABLE makes a new table.',
}));
Q('m_drop_delete', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Kabir runs `DELETE FROM EVENT;` and Neha runs `DROP TABLE EVENT;` on two copies of the same database. Which statement describes the two results correctly?',
  opts: [
    'Kabir is left with an empty EVENT table; Neha has no EVENT table at all',
    'Both are left with an empty EVENT table',
    'Kabir has no EVENT table; Neha is left with an empty EVENT table',
    'Kabir\'s command gives an error because it has no WHERE clause',
  ],
  sol: 'DELETE without WHERE removes every row but keeps the table and its structure. DROP TABLE removes the table itself, structure and data together. A WHERE clause is optional in DELETE.',
}));
Q('ar_unique_null', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'In MySQL, a column declared UNIQUE (but not NOT NULL) may hold NULL in more than one row.',
  r: 'NULL means an unknown value, and one NULL is not treated as equal to another NULL.',
  sol: 'Both are true and R explains A: UNIQUE forbids two equal values, but NULLs are not equal to each other, so several rows may have NULL. A primary key, which is also NOT NULL, allows no NULL at all.',
}));
Q('ar_alter', ar({
  t: 1, d: 2, c: 'analysis', key: 'c',
  a: 'ALTER TABLE is a Data Definition Language command.',
  r: 'ALTER TABLE is used to change the values stored in existing rows of a table.',
  sol: 'A is true: ALTER TABLE changes structure (adding or removing columns or keys), so it is DDL. R is false: values in existing rows are changed with UPDATE, a DML command.',
}));
Q('tf_drop_db', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? `DROP DATABASE shop;` deletes all the tables in the database `shop` but keeps the empty database.',
  sol: 'DROP DATABASE removes the whole database: its tables, their data and the database itself. It cannot be undone, so it is used with great care.',
}));
Q('fb_use', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'To start working with an existing database named `vidyalaya`, the MySQL command is `___ vidyalaya;`.',
  acc: [['USE']],
  sol: 'The USE command makes a database the current one, so later commands work on its tables.',
}));
Q('mt_commands', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each MySQL command used by the school\'s data team with what it does.',
  pairs: [
    [ic('SHOW DATABASES;'), 'Lists all the databases on the server'],
    [ic('SHOW TABLES;'), 'Lists the tables of the current database'],
    [ic('DESCRIBE CLUB;'), 'Shows the structure of the CLUB table'],
    [ic('DROP TABLE CLUB;'), 'Removes the CLUB table along with its data'],
  ],
  sol: 'SHOW DATABASES and SHOW TABLES list objects, DESCRIBE shows a table\'s columns and types, and DROP TABLE deletes a table permanently.',
}));
Q('s_ddl_dml', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between DDL and DML commands of SQL, giving two commands of each kind.',
  model: '1. **DDL** (Data Definition Language) commands create, change or remove the **structure** of database objects, e.g. `CREATE TABLE` and `ALTER TABLE` (also `DROP`).\n2. **DML** (Data Manipulation Language) commands work on the **rows of data** stored in tables, e.g. `INSERT` and `UPDATE` (also `DELETE`, `SELECT`).',
  sol: 'One mark for each side: what the commands act on, with two correct examples.',
  scheme: [['DDL explained with two commands', 1], ['DML explained with two commands', 1]],
}));
Q('s_char_varchar', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between the `CHAR` and `VARCHAR` data types of MySQL with one example of a column suited to each.',
  model: '1. **CHAR(n)** is **fixed-length**: every value takes n characters, padded with spaces. It suits values of the same length, e.g. a `Class` code such as 12A as CHAR(3).\n2. **VARCHAR(n)** is **variable-length**: it keeps only the characters entered, up to n. It suits values whose length varies, e.g. a student\'s `Name` as VARCHAR(20).',
  sol: 'Fixed against variable length, with a sensible column for each.',
  scheme: [['CHAR explained with a suitable column', 1], ['VARCHAR explained with a suitable column', 1]],
}));
// The CREATE TABLE in this answer is executed in SQLite (with an INSERT and a SELECT) to check that it is valid.
const createEvent = "CREATE TABLE WORKSHOP (\n  WID CHAR(3) PRIMARY KEY,\n  Topic VARCHAR(30) NOT NULL,\n  Trainer VARCHAR(20),\n  Seats INT,\n  StartDate DATE,\n  Email VARCHAR(30) UNIQUE\n);";
expect(sql(`${createEvent}\nINSERT INTO WORKSHOP VALUES ('W01', 'Paper Craft', 'Ms Nair', 25, '2026-11-14', 'paper@example.org');`, 'SELECT COUNT(*) FROM WORKSHOP').rows, [[1]], 'WORKSHOP create');
Q('s3_create', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'An imagined school is planning weekend workshops. Write a MySQL statement to create a table **WORKSHOP** with these columns: `WID` (3 fixed characters, primary key), `Topic` (up to 30 characters, must not be empty), `Trainer` (up to 20 characters), `Seats` (whole number), `StartDate` (a date) and `Email` (up to 30 characters, no two rows may have the same e-mail).',
  model: `${SQ(createEvent)}\n\nCHAR(3) for the fixed code, VARCHAR for text of varying length, INT for a count and DATE for the date; PRIMARY KEY, NOT NULL and UNIQUE give the three constraints.`,
  sol: 'Correct data types, the three constraints on the right columns, and valid syntax (commas between column definitions, brackets, semicolon).',
  scheme: [['Correct data types for all six columns', 1], ['PRIMARY KEY, NOT NULL and UNIQUE placed correctly', 1], ['Valid CREATE TABLE syntax', 1]],
}));
const addCol = 'ALTER TABLE ROOM ADD Floor INT;';
expect(sql('CREATE TABLE ROOM (RoomNo INT PRIMARY KEY, Block CHAR(1), Beds INT);\n' + addCol + "\nINSERT INTO ROOM VALUES (101, 'A', 2, 1);", 'SELECT * FROM ROOM').cols, ['RoomNo', 'Block', 'Beds', 'Floor'], 'ROOM alter');
Q('l_ddl', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'The warden of an imagined hostel wants to keep room records in MySQL. Write SQL commands to:\n\n(i) create a database named `hostel`;\n(ii) open it for use;\n(iii) create a table `ROOM` with columns `RoomNo` (integer, primary key), `Block` (one character) and `Beds` (integer);\n(iv) add a column `Floor` (integer) to `ROOM`;\n(v) remove the primary key from `ROOM`, and then see the structure of the table.',
  model: `${SQ('CREATE DATABASE hostel;', 'USE hostel;', 'CREATE TABLE ROOM (RoomNo INT PRIMARY KEY, Block CHAR(1), Beds INT);', addCol, 'ALTER TABLE ROOM DROP PRIMARY KEY;', 'DESCRIBE ROOM;')}\n\nOne mark for each of (i) to (v); in (v), DESCRIBE (or DESC) shows the columns, now without a key on RoomNo.`,
  sol: 'CREATE DATABASE, USE, CREATE TABLE with the key, ALTER TABLE … ADD, and ALTER TABLE … DROP PRIMARY KEY followed by DESCRIBE.',
  scheme: [['(i) CREATE DATABASE', 1], ['(ii) USE', 1], ['(iii) CREATE TABLE with types and primary key', 1], ['(iv) ALTER TABLE … ADD', 1], ['(v) DROP PRIMARY KEY and DESCRIBE', 1]],
}));

// ================================================================ t02 SELECT with WHERE, IN, BETWEEN, LIKE, ORDER BY, NULL
const qPuneHigh = "SELECT Name FROM STUDENT WHERE City = 'Pune' AND Marks > 70;";
const nPuneHigh = sql(DB_SCHOOL, qPuneHigh).rows.length;
Q('m_where_count', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Using the STUDENT table of the imagined school, how many rows does this query return?\n\n${SQ(qPuneHigh)}\n\n${tt(sql(DB_SCHOOL, 'SELECT RollNo, Name, Marks, City FROM STUDENT ORDER BY RollNo'))}`,
  opts: distinct([String(nPuneHigh), String(nPuneHigh + 2), String(nPuneHigh - 1), '8'].map((x) => x)),
  sol: `AND needs both conditions to be true: the city must be Pune and the marks above 70. Of the four Pune students, ${list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE City = 'Pune' AND Marks > 70 ORDER BY RollNo")} qualify, so ${nPuneHigh} rows are returned.`,
}));
const qIn = "SELECT Name FROM STUDENT WHERE City IN ('Nashik', 'Nagpur') ORDER BY Name;";
const inNames = list(DB_SCHOOL, qIn);
Q('m_in', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which names does this query on the STUDENT table list, in order?\n\n${SQ(qIn)}`,
  opts: distinct([inNames, list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE City = 'Pune' ORDER BY Name"), list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE City IN ('Nashik') ORDER BY Name"), list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE City IN ('Nashik', 'Nagpur') ORDER BY RollNo DESC")]),
  sol: `IN ('Nashik', 'Nagpur') is the same as City = 'Nashik' OR City = 'Nagpur'. The four matching names in alphabetical order are ${inNames}.`,
}));
const qBetween = 'SELECT RollNo FROM STUDENT WHERE Marks BETWEEN 65 AND 83 ORDER BY RollNo;';
const betweenRolls = list(DB_SCHOOL, qBetween);
Q('m_between', mcq({
  t: 2, d: 3, c: 'application',
  stem: `For the imagined STUDENT table, which roll numbers does this query return?\n\n${SQ(qBetween)}`,
  opts: distinct([betweenRolls, list(DB_SCHOOL, 'SELECT RollNo FROM STUDENT WHERE Marks > 65 AND Marks < 83 ORDER BY RollNo'), list(DB_SCHOOL, 'SELECT RollNo FROM STUDENT WHERE Marks NOT BETWEEN 65 AND 83 ORDER BY RollNo'), list(DB_SCHOOL, 'SELECT RollNo FROM STUDENT WHERE Marks >= 65 ORDER BY RollNo')]),
  sol: `BETWEEN includes both end values, so marks of exactly 65 and 83 are included: roll numbers ${betweenRolls}. Leaving out the end values is the common mistake.`,
}));
const qLikeA = "SELECT Name FROM STUDENT WHERE Name LIKE '%a' ORDER BY Name;";
const likeA = list(DB_SCHOOL, qLikeA);
Q('m_like', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which student names does this pattern search on the STUDENT table return?\n\n${SQ(qLikeA)}`,
  opts: distinct([likeA, list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE Name LIKE 'A%' ORDER BY Name"), list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE Name LIKE '%a%' AND Name NOT LIKE '%a' ORDER BY Name"), 'Bhavna, Diya, Farah, Hina']),
  sol: `% stands for any number of characters, so '%a' matches names that end with a: ${likeA}. A name that only starts with A (or has a in the middle) does not match.`,
}));
const qLike2 = "SELECT Name FROM STUDENT WHERE Name LIKE '_i%' ORDER BY Name;";
const like2 = list(DB_SCHOOL, qLike2);
Q('m_like_underscore', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `The pattern below uses the underscore wildcard. Which names from STUDENT does it return?\n\n${SQ(qLike2)}`,
  opts: distinct([like2, list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE Name LIKE '%i%' ORDER BY Name"), list(DB_SCHOOL, "SELECT Name FROM STUDENT WHERE Name LIKE 'i%' ORDER BY Name") || 'No rows', 'Bhavna, Diya, Hina']),
  sol: `_ stands for exactly one character, so '_i%' means: any one letter, then i as the second letter, then anything. Only ${like2} have i in the second place; Chirag has i in the third place and Bhavna has none.`,
}));
const qCounts = 'SELECT COUNT(ClubID), COUNT(*) FROM STUDENT;';
const [cClub, cAll] = sql(DB_SCHOOL, qCounts).rows[0];
Q('m_count_null', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Two students of the imagined school have not joined any club (their ClubID is NULL). What does this query show?\n\n${SQ(qCounts)}`,
  opts: distinct([`${cClub} and ${cAll}`, `${cAll} and ${cAll}`, `${cClub} and ${cClub}`, `${cAll} and ${cClub}`]),
  sol: `COUNT(column) counts only the non-NULL values of that column (${cClub}), while COUNT(*) counts every row (${cAll}).`,
}));
const nCities = one(DB_SCHOOL, 'SELECT COUNT(*) FROM (SELECT DISTINCT City FROM STUDENT);');
Q('m_distinct', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'How many rows does `SELECT DISTINCT City FROM STUDENT;` return for the imagined school, whose eight students come from Pune, Nagpur and Nashik?',
  opts: distinct([String(nCities), '8', '1', '4']),
  sol: `DISTINCT removes repeated values from the result, so each city appears once: ${nCities} rows.`,
}));
const qTop = 'SELECT Name, Marks FROM STUDENT ORDER BY Marks DESC;';
const top = sql(DB_SCHOOL, qTop).rows;
Q('m_orderby', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which row of the STUDENT table appears **first** in the result of this query?\n\n${SQ(qTop)}`,
  opts: distinct([`${top[0][0]}, ${top[0][1]}`, `${top[top.length - 1][0]}, ${top[top.length - 1][1]}`, 'Aarav, 88', `${top[1][0]}, ${top[1][1]}`]),
  sol: `DESC sorts from the highest value down, so the highest marks (${top[0][1]}, ${top[0][0]}) come first. Without DESC the lowest would come first.`,
}));
const qNullOrder = 'SELECT PName, Stock FROM PRODUCT ORDER BY Stock;';
const nullFirst = sql(DB_SHOP, qNullOrder).rows[0];
expect(nullFirst[1], null, 'NULL sorts first');
Q('m_null_order', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `In the imagined shop's PRODUCT table the stock of one item has not been entered (NULL). Which row comes **first** in the output of this query?\n\n${SQ(qNullOrder)}`,
  opts: distinct([`${nullFirst[0]}, NULL`, `${sql(DB_SHOP, qNullOrder).rows[1][0]}, ${sql(DB_SHOP, qNullOrder).rows[1][1]}`, 'Gel Pen, 300', 'The query gives an error because of the NULL']),
  sol: `In ascending order MySQL places NULL before every other value, so the row with no stock entered, ${nullFirst[0]}, comes first; in descending order it would come last.`,
}));
Q('ar_null_eq', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: `The query \`SELECT Name FROM STUDENT WHERE ClubID = NULL;\` returns no rows, even though ${cAll - cClub} students have no club.`,
  r: 'A comparison such as = with NULL is never true; NULL must be tested with IS NULL.',
  sol: `Both are true and R explains A: = NULL is unknown for every row (the query returns ${sql(DB_SCHOOL, 'SELECT Name FROM STUDENT WHERE ClubID = NULL').rows.length} rows), so WHERE ClubID IS NULL is needed.`,
}));
Q('tf_order_default', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? `ORDER BY Marks` sorts the rows in ascending order of marks, because ASC is the default.',
  sol: 'ORDER BY sorts in ascending order unless DESC is written after the column; ASC may be written but is optional.',
}));
Q('fb_isnull', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'To list the students of the imagined school who have not joined any club, the query is `SELECT Name FROM STUDENT WHERE ClubID ___;` (fill in two words).',
  acc: [['IS NULL']],
  sol: `NULL is tested with IS NULL (never = NULL). Here it returns ${list(DB_SCHOOL, 'SELECT Name FROM STUDENT WHERE ClubID IS NULL ORDER BY Name')}.`,
}));
Q('ord_clauses', ord({
  t: 2, d: 3, c: 'understanding', marks: 1,
  stem: 'Arrange these clauses in the order in which they must be written in a single SELECT query.',
  items: ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'],
  sol: 'The written order is SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. WHERE filters rows before grouping, HAVING filters the groups, and ORDER BY sorts the final result.',
}));
const coWhere = "SELECT Name, Marks FROM STUDENT\nWHERE Stream = 'Science' OR Marks >= 85\nORDER BY RollNo;";
Q('co_where_or', co({
  t: 2, d: 2, c: 'application', lang: 'sql', marks: 2,
  pre: `The school wants the names and marks of students who are either in the Science stream or scored 85 or more. Using the STUDENT table, write the output of this query. ${FMT}`,
  code: coWhere, output: plain(sql(DB_SCHOOL, coWhere)),
  sol: 'OR keeps a row if either condition is true: all three Science students, plus Diya from Humanities with 91. Rows come in RollNo order.',
}));
const coLike = "SELECT PName, Price FROM PRODUCT\nWHERE PName LIKE '%Pen%'\nORDER BY Price;";
Q('co_like_pen', co({
  t: 2, d: 2, c: 'understanding', lang: 'sql', marks: 1,
  pre: `A shopkeeper searches the PRODUCT table of the imagined stationery shop for every item with "Pen" in its name. Write the output. ${FMT}`,
  code: coLike, output: plain(sql(DB_SHOP, coLike)),
  sol: "'%Pen%' matches Pen anywhere in the name, so Gel Pen and Sketch Pens match; they are listed from the cheaper to the dearer.",
}));
const coBetween = 'SELECT PCode, PName FROM PRODUCT\nWHERE Price BETWEEN 100 AND 450\nORDER BY PCode;';
Q('co_between_price', co({
  t: 2, d: 2, c: 'understanding', lang: 'sql', marks: 2,
  pre: `Which products of the imagined shop are priced from ₹100 to ₹450, both included? Write the output of this query on PRODUCT. ${FMT}`,
  code: coBetween, output: plain(sql(DB_SHOP, coBetween)),
  sol: 'BETWEEN 100 AND 450 includes both limits; four products have prices in that range, listed by code.',
}));
const coNull = 'SELECT PName FROM PRODUCT\nWHERE Stock IS NULL OR Stock < 25\nORDER BY PName;';
Q('co_null_stock', co({
  t: 2, d: 3, c: 'analysis', lang: 'sql', marks: 2,
  pre: `The shop wants to reorder items that are running low or whose stock was never entered. Write the output of this query on the PRODUCT table. ${FMT}`,
  code: coNull, output: plain(sql(DB_SHOP, coNull)),
  sol: 'Stock IS NULL picks the Geometry Box; Stock < 25 picks the two electrical items. Names are sorted alphabetically.',
}));
const coAlias = "SELECT PName, Price * Stock AS StockValue\nFROM PRODUCT\nWHERE Category = 'Electrical'\nORDER BY StockValue DESC;";
Q('co_alias_value', co({
  t: 2, d: 3, c: 'application', lang: 'sql', marks: 2,
  pre: `To find the value of electrical goods in the imagined shop, a column alias is used for price multiplied by stock. Write the output of this query on PRODUCT. ${FMT}`,
  code: coAlias, output: plain(sql(DB_SHOP, coAlias)),
  sol: 'Each value is Price × Stock: 650 × 12 = 7800 and 420 × 20 = 8400. Sorting the alias in descending order puts 8400 first.',
}));
const coDistinctStream = "SELECT DISTINCT Stream FROM STUDENT\nWHERE City <> 'Pune'\nORDER BY Stream;";
Q('co_distinct_stream', co({
  t: 2, d: 2, c: 'understanding', lang: 'sql', marks: 1,
  pre: `Which streams have at least one student from outside Pune? Write the output of this DISTINCT query on the STUDENT table. ${FMT}`,
  code: coDistinctStream, output: plain(sql(DB_SCHOOL, coDistinctStream)),
  sol: '<> means not equal to. The students outside Pune are from all three streams, and DISTINCT shows each stream once, in alphabetical order.',
}));
const errNull = 'SELECT Name, Class FROM STUDENT WHERE ClubID = NULL;';
const fixNull = 'SELECT Name, Class FROM STUDENT WHERE ClubID IS NULL ORDER BY Name;';
expect(sql(DB_SCHOOL, errNull).rows.length, 0, 'ClubID = NULL');
Q('s_err_null', short({
  t: 2, d: 2, c: 'analysis', marks: 2,
  stem: `Rohan wants the names and classes of students who have not joined any club. His query runs but returns no rows. Find the mistake and write the correct query with its output for the STUDENT table.\n\n${SQ(errNull)}`,
  model: `**Mistake:** NULL cannot be compared with \`=\`; the comparison is never true, so no row is returned. NULL is tested with **IS NULL**.\n\n${qa(DB_SCHOOL, fixNull)}`,
  sol: 'Explain why = NULL fails, replace it with IS NULL, and show the two rows.',
  scheme: [['Mistake explained', 1], ['Correct query with IS NULL and its output', 1]],
}));
const qCommerce = "SELECT Name, Marks FROM STUDENT WHERE Stream = 'Commerce' ORDER BY Marks DESC;";
const qCityList = 'SELECT DISTINCT City FROM STUDENT ORDER BY City;';
Q('s_queries_school', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Write SQL queries on the imagined STUDENT table for the following, and give the output of each.\n\n(i) Names and marks of Commerce students, highest marks first.\n(ii) The list of different cities the students come from, in alphabetical order.\n\n${tt(sql(DB_SCHOOL, 'SELECT RollNo, Name, Stream, Marks, City FROM STUDENT ORDER BY RollNo'))}`,
  model: `(i)\n\n${qa(DB_SCHOOL, qCommerce)}\n\n(ii)\n\n${qa(DB_SCHOOL, qCityList)}`,
  sol: 'WHERE with ORDER BY … DESC for (i); DISTINCT with ORDER BY for (ii).',
  scheme: [['(i) correct query and output', 1], ['(ii) correct query and output', 1]],
}));
const p1 = "SELECT PName, Price FROM PRODUCT WHERE Category = 'Stationery' AND Price < 100 ORDER BY Price;";
const p2 = "SELECT PCode, PName FROM PRODUCT WHERE SupCode IN ('S3', 'S4') ORDER BY PCode;";
const p3 = 'SELECT PName, Price + 10 AS NewPrice FROM PRODUCT WHERE Stock > 100 ORDER BY PName;';
Q('s3_queries_product', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `For the imagined shop's PRODUCT table, write SQL queries for the following and give the output of each.\n\n(i) Names and prices of stationery items costing less than ₹100, cheapest first.\n(ii) Codes and names of products supplied by S3 or S4 (use IN).\n(iii) Names and prices increased by ₹10 (shown under the heading NewPrice) of products with more than 100 in stock, in alphabetical order.\n\n${tt(sql(DB_SHOP, 'SELECT * FROM PRODUCT ORDER BY PCode'))}`,
  model: `(i)\n\n${qa(DB_SHOP, p1)}\n\n(ii)\n\n${qa(DB_SHOP, p2)}\n\n(iii)\n\n${qa(DB_SHOP, p3)}`,
  sol: 'AND with a relational operator, IN with a list, and an arithmetic expression with an alias.',
  scheme: [['(i) query and output', 1], ['(ii) query and output', 1], ['(iii) query and output', 1]],
}));
const lk1 = "SELECT Name FROM STUDENT WHERE Name LIKE '%r%' ORDER BY Name;";
const lk2 = "SELECT Name FROM STUDENT WHERE Name LIKE '____' ORDER BY Name;";
Q('s3_like', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: 'Explain the two wildcard characters used with LIKE. Write one query on the STUDENT table for each: names containing the letter r anywhere, and names of exactly four letters. Give both outputs.',
  model: `**%** matches any sequence of characters (including none); **_** matches exactly one character.\n\n${qa(DB_SCHOOL, lk1)}\n\n${qa(DB_SCHOOL, lk2)}`,
  sol: 'Meaning of each wildcard, then one correct query and output for each.',
  scheme: [['Both wildcards explained', 1], ['Query with % and output', 1], ['Query with four underscores and output', 1]],
}));
const lq1 = "SELECT * FROM STUDENT WHERE Class = '12A' ORDER BY Marks;";
const lq2 = 'SELECT Name, City FROM STUDENT WHERE Marks NOT BETWEEN 60 AND 90 ORDER BY Name;';
const lq3 = "SELECT RollNo, Name FROM STUDENT WHERE City = 'Nagpur' OR ClubID IS NULL ORDER BY RollNo;";
const lq4 = "SELECT Name, Marks + 5 AS Revised FROM STUDENT WHERE Stream = 'Humanities' ORDER BY Name;";
const lq5 = "SELECT Name FROM STUDENT WHERE Name LIKE 'A%' OR Name LIKE '%h' ORDER BY Name;";
Q('l_queries_student', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: `Consider the imagined STUDENT table below. Write SQL queries for (i) to (v) and give the output of each.\n\n(i) All details of students of class 12A in ascending order of marks.\n(ii) Names and cities of students whose marks are not from 60 to 90.\n(iii) Roll numbers and names of students who live in Nagpur or have not joined a club.\n(iv) Names and marks raised by 5 (heading Revised) of Humanities students.\n(v) Names that begin with A or end with h.\n\n${tt(sql(DB_SCHOOL, 'SELECT * FROM STUDENT ORDER BY RollNo'))}`,
  model: [lq1, lq2, lq3, lq4, lq5].map((x, i) => `(${['i', 'ii', 'iii', 'iv', 'v'][i]})\n\n${qa(DB_SCHOOL, x)}`).join('\n\n'),
  sol: 'One mark for each correct query with its output: ORDER BY, NOT BETWEEN, OR with IS NULL, an arithmetic alias, and LIKE with OR.',
  scheme: [['(i)', 1], ['(ii)', 1], ['(iii)', 1], ['(iv)', 1], ['(v)', 1]],
}));

// ================================================================ t03 Aggregate functions, GROUP BY, HAVING
const avgHum = one(DB_SCHOOL, "SELECT AVG(Marks) FROM STUDENT WHERE Stream = 'Humanities';");
Q('m_avg', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the imagined school, the Humanities students scored 91 and 79. What value does `SELECT AVG(Marks) FROM STUDENT WHERE Stream = \'Humanities\';` give? (Ignore trailing zeros that MySQL may display.)',
  opts: distinct([fmt(avgHum), '170', '2', '79']),
  sol: `AVG adds the values and divides by how many there are: (91 + 79) ÷ 2 = ${fmt(avgHum)}. MySQL may display it as ${fmt(avgHum)}.0000.`,
}));
const nDistCity = one(DB_SCHOOL, 'SELECT COUNT(DISTINCT City) FROM STUDENT;');
Q('m_count_distinct', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What does `SELECT COUNT(DISTINCT City) FROM STUDENT;` return for the eight students of the imagined school?',
  opts: distinct([String(nDistCity), '8', String(cClub), '4']),
  sol: `COUNT(DISTINCT City) counts the different cities, not the rows: Pune, Nagpur and Nashik, so ${nDistCity}.`,
}));
const qGroupMax = 'SELECT Stream, MAX(Marks) FROM STUDENT GROUP BY Stream ORDER BY Stream;';
const gm = sql(DB_SCHOOL, qGroupMax).rows;
Q('m_groupby', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Which one of these rows appears in the output of the following query on STUDENT?\n\n${SQ(qGroupMax)}`,
  opts: distinct([`${gm[1][0]}, ${gm[1][1]}`, 'Humanities, 79', 'Science, 88', 'Commerce, 74']),
  sol: `GROUP BY forms one group per stream, and MAX gives the highest marks in each: ${gm.map((r) => `${r[0]} ${r[1]}`).join(', ')}.`,
}));
Q('m_having', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In a query with GROUP BY, which clause is used to keep only those **groups** that satisfy a condition such as `COUNT(*) > 2`?',
  opts: ['HAVING', 'WHERE', 'ORDER BY', 'DISTINCT'],
  sol: 'HAVING tests a condition on each group after grouping, and may use aggregate functions. WHERE filters individual rows before grouping and cannot use aggregates.',
}));
const qSumStat = "SELECT SUM(Stock), COUNT(Stock) FROM PRODUCT WHERE Category = 'Stationery';";
const [sumStat, cntStat] = sql(DB_SHOP, qSumStat).rows[0];
Q('m_sum_null', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `The imagined shop has four stationery items; the stock of one of them is NULL. What does this query show?\n\n${SQ(qSumStat)}`,
  opts: distinct([`${sumStat} and ${cntStat}`, `${sumStat} and 4`, 'NULL and 4', 'NULL and 3']),
  sol: `Aggregate functions skip NULL values: SUM adds the three known stocks (${sumStat}) and COUNT(Stock) counts only those three (${cntStat}). A NULL does not make the whole sum NULL.`,
}));
const errAgg = "SELECT Stream, AVG(Marks) FROM STUDENT WHERE AVG(Marks) > 75 GROUP BY Stream;";
sqlErr(DB_SCHOOL, errAgg);
Q('ar_where_agg', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A query with the condition `WHERE COUNT(*) > 2` gives an error.',
  r: 'WHERE filters individual rows before any groups are formed, so an aggregate function cannot be used in it; such a condition belongs in HAVING.',
  sol: 'Both are true and R explains A: aggregate values exist only after grouping, so the condition must be written as HAVING COUNT(*) > 2.',
}));
Q('ar_count_star', ar({
  t: 3, d: 2, c: 'analysis', key: 'b',
  a: `For the imagined STUDENT table, COUNT(*) gives ${cAll} but COUNT(ClubID) gives ${cClub}.`,
  r: 'ClubID is the column that links the STUDENT table with the CLUB table.',
  sol: `Both are true, but R does not explain A. The counts differ because COUNT with a column name skips NULL values: two students have NULL in ClubID, so COUNT(ClubID) is ${cAll} − 2 = ${cClub}. Being a linking column has nothing to do with it.`,
}));
Q('tf_where_having', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A single SELECT query may contain both a WHERE clause and a HAVING clause.',
  sol: 'Yes: WHERE first removes unwanted rows, then GROUP BY forms groups of the remaining rows, and HAVING keeps only the groups that satisfy its condition.',
}));
Q('fb_groupby', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The clause that collects rows having the same value in a column, so that an aggregate is worked out for each set, is ___.',
  acc: [['GROUP BY']],
  sol: 'GROUP BY forms the groups; aggregate functions such as COUNT or SUM then give one value per group.',
}));
const coGroupCity = 'SELECT City, COUNT(*) FROM STUDENT\nGROUP BY City\nORDER BY City;';
Q('co_group_city', co({
  t: 3, d: 2, c: 'understanding', lang: 'sql', marks: 2,
  pre: `How many students of the imagined school come from each city? Write the output of this GROUP BY query on STUDENT. ${FMT}`,
  code: coGroupCity, output: plain(sql(DB_SCHOOL, coGroupCity)),
  sol: 'One group per city; COUNT(*) gives the number of rows in each group. ORDER BY City lists the cities alphabetically.',
}));
const coHaving = 'SELECT Category, COUNT(*), MAX(Price) FROM PRODUCT\nGROUP BY Category\nHAVING COUNT(*) >= 2\nORDER BY Category;';
Q('co_having_cat', co({
  t: 3, d: 3, c: 'application', lang: 'sql', marks: 2,
  pre: `For each product category of the imagined shop that has at least two items, this query finds the number of items and the highest price. Write its output. ${FMT}`,
  code: coHaving, output: plain(sql(DB_SHOP, coHaving)),
  sol: 'Electrical and Kitchen have 2 items each and Stationery has 4, so all three groups pass HAVING COUNT(*) >= 2; MAX(Price) is worked out within each group.',
}));
const coMinMax = "SELECT MIN(Price), MAX(Price), SUM(Price) FROM PRODUCT\nWHERE Category <> 'Kitchen';";
Q('co_minmax', co({
  t: 3, d: 2, c: 'understanding', lang: 'sql', marks: 2,
  pre: `Leaving out the kitchen items, the shop owner wants the lowest, highest and total price. Write the output of this aggregate query on PRODUCT. ${FMT}`,
  code: coMinMax, output: plain(sql(DB_SHOP, coMinMax)),
  sol: 'WHERE first removes the two kitchen items; the aggregates then work on the remaining six prices.',
}));
const coHavingStream = 'SELECT Stream, COUNT(*), SUM(Marks) FROM STUDENT\nWHERE Marks > 60\nGROUP BY Stream\nHAVING SUM(Marks) > 160\nORDER BY Stream;';
Q('co_where_having', co({
  t: 3, d: 4, c: 'analysis', lang: 'sql', marks: 3,
  pre: `This query on the STUDENT table uses both WHERE and HAVING. Trace it carefully and write its output. ${FMT}`,
  code: coHavingStream, output: plain(sql(DB_SCHOOL, coHavingStream)),
  sol: 'WHERE removes Eshan (58) first. The groups are then Commerce 74 + 83 = 157, Humanities 91 + 79 = 170 and Science 88 + 65 + 95 = 248. HAVING SUM(Marks) > 160 drops Commerce.',
}));
const errHaving = "SELECT Stream, AVG(Marks) FROM STUDENT\nWHERE AVG(Marks) > 75\nGROUP BY Stream;";
const fixHaving = 'SELECT Stream, AVG(Marks) FROM STUDENT GROUP BY Stream HAVING AVG(Marks) > 75 ORDER BY Stream;';
sqlErr(DB_SCHOOL, errHaving);
Q('s_err_having', short({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: `Tanvi wants the streams of the imagined school whose average marks are above 75, but her query gives an error. Find the error and write the correct query with its output.\n\n${SQ(errHaving)}`,
  model: `**Error:** an aggregate function (AVG) cannot be used in WHERE, because WHERE works on single rows before groups are formed. The group condition must go in **HAVING** after GROUP BY.\n\n${qa(DB_SCHOOL, fixHaving)}\n\n(MySQL shows averages with four decimal places, for example 85.0000 and 82.6667.)`,
  sol: 'Explain why WHERE cannot hold an aggregate and move the condition to HAVING; show the two streams.',
  scheme: [['Error explained', 1], ['Correct query with HAVING and its output', 1]],
}));
const a1 = 'SELECT COUNT(*) FROM PRODUCT WHERE Price > 100;';
const a2 = 'SELECT SupCode, SUM(Stock) FROM PRODUCT GROUP BY SupCode ORDER BY SupCode;';
const a3 = 'SELECT Category, MIN(Price) FROM PRODUCT GROUP BY Category HAVING MIN(Price) > 50 ORDER BY Category;';
Q('s3_aggregate', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Write SQL queries on the imagined shop's PRODUCT table for the following and give the output of each.\n\n(i) The number of products priced above ₹100.\n(ii) For each supplier code, the total stock supplied.\n(iii) The categories whose cheapest item costs more than ₹50, with that cheapest price.\n\n${tt(sql(DB_SHOP, 'SELECT * FROM PRODUCT ORDER BY PCode'))}`,
  model: `(i)\n\n${qa(DB_SHOP, a1)}\n\n(ii)\n\n${qa(DB_SHOP, a2)}\n\n(iii)\n\n${qa(DB_SHOP, a3)}\n\nIn (ii), SUM skips the NULL stock of P05, so S1's total is 120.`,
  sol: 'COUNT with WHERE; SUM with GROUP BY; MIN with GROUP BY and HAVING.',
  scheme: [['(i) query and output', 1], ['(ii) query and output', 1], ['(iii) query and output', 1]],
}));
const g1 = 'SELECT Class, COUNT(*), MAX(Marks) FROM STUDENT GROUP BY Class ORDER BY Class;';
const g2 = 'SELECT City, AVG(Marks) FROM STUDENT GROUP BY City HAVING COUNT(*) >= 2 ORDER BY City;';
const g3 = 'SELECT ClubID, COUNT(*) FROM STUDENT WHERE ClubID IS NOT NULL GROUP BY ClubID ORDER BY ClubID;';
expect(fmt(sql(DB_SCHOOL, g2).rows[1][1]), '93', 'Nashik average');
Q('l_group', long({
  t: 3, d: 4, c: 'analysis', marks: 5,
  stem: `For the imagined STUDENT table:\n\n(a) Write queries, with their outputs, to show: (i) for each class, the number of students and the highest marks; (ii) the average marks of each city that has at least two students; (iii) the number of students in each club, leaving out students with no club.\n(b) Explain, with reference to (ii), why COUNT(*) >= 2 is written after HAVING and not after WHERE.\n\n${tt(sql(DB_SCHOOL, 'SELECT * FROM STUDENT ORDER BY RollNo'))}`,
  model: `(a)(i)\n\n${qa(DB_SCHOOL, g1)}\n\n(a)(ii)\n\n${qa(DB_SCHOOL, g2)}\n\n(a)(iii)\n\n${qa(DB_SCHOOL, g3)}\n\n(b) COUNT(*) is the size of a **group**; it exists only after GROUP BY has formed the groups. WHERE works on single rows before grouping, so a condition on an aggregate must go in HAVING.`,
  sol: 'Three grouped queries with correct outputs, then the row-versus-group explanation.',
  scheme: [['(a)(i) query and output', 1], ['(a)(ii) query and output', 1], ['(a)(iii) query and output', 1], ['(b) WHERE works on rows before grouping', 1], ['(b) aggregate conditions need HAVING', 1]],
}));

// ================================================================ t04 Joins
const cart = sql(DB_SCHOOL, 'SELECT * FROM STUDENT, CLUB;');
const cartCols = cart.cols.length;
const cartRows = cart.rows.length;
expect([cartCols, cartRows], [11, 32], 'Cartesian product');
Q('m_cartesian', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The imagined STUDENT table has 7 columns and 8 rows; CLUB has 4 columns and 4 rows. What are the degree and cardinality of the Cartesian product `SELECT * FROM STUDENT, CLUB;`?',
  opts: distinct([`Degree ${cartCols}, cardinality ${cartRows}`, 'Degree 28, cardinality 12', 'Degree 11, cardinality 12', `Degree ${cartRows}, cardinality ${cartCols}`]),
  sol: `In a Cartesian product the columns add up (7 + 4 = ${cartCols}) and every row of one table pairs with every row of the other (8 × 4 = ${cartRows}).`,
}));
Q('m_equi', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which query performs an **equi-join** of STUDENT and CLUB on the club each student has joined?',
  opts: [
    ic('SELECT Name, ClubName FROM STUDENT, CLUB WHERE STUDENT.ClubID = CLUB.ClubID;'),
    ic('SELECT Name, ClubName FROM STUDENT, CLUB;'),
    ic('SELECT Name, ClubName FROM STUDENT, CLUB WHERE STUDENT.ClubID > CLUB.ClubID;'),
    ic('SELECT Name, ClubName FROM STUDENT WHERE ClubID IN CLUB;'),
  ],
  sol: 'An equi-join keeps only the pairs of rows whose common column values are equal, using =. Without a condition it is a Cartesian product; > is not an equality, and the last query is not valid SQL.',
}));
Q('m_natural', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'How does the output of a NATURAL JOIN of PRODUCT and SUPPLIER (common column SupCode) differ from that of their equi-join written with `SELECT *`?',
  opts: [
    'In the natural join the common column SupCode appears only once',
    'The natural join shows every product with every supplier',
    'The natural join shows only suppliers who supply nothing',
    'The equi-join removes the common column altogether',
  ],
  sol: 'Both keep only matching pairs, but SELECT * on an equi-join shows SupCode twice (once from each table); a natural join matches on the common column automatically and shows it once.',
}));
const nJoin = one(DB_SCHOOL, 'SELECT COUNT(*) FROM STUDENT S, CLUB C WHERE S.ClubID = C.ClubID;');
Q('m_join_count', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `In the imagined school, two students have no club and the Chess club has no members. How many rows does this query return?\n\n${SQ('SELECT S.Name, C.ClubName FROM STUDENT S, CLUB C', 'WHERE S.ClubID = C.ClubID;')}`,
  opts: distinct([String(nJoin), '8', '4', String(cartRows)]),
  sol: `Only rows with equal ClubID values pair up. The two NULL ClubIDs match nothing, and Chess (4) has no student, so ${nJoin} rows remain.`,
}));
const coEqui = "SELECT S.Name, C.ClubName\nFROM STUDENT S, CLUB C\nWHERE S.ClubID = C.ClubID AND S.City = 'Pune'\nORDER BY S.Name;";
Q('co_equi_pune', co({
  t: 4, d: 3, c: 'application', lang: 'sql', marks: 2,
  pre: `Which club has each Pune student joined? Write the output of this equi-join of STUDENT and CLUB (S and C are table aliases). ${FMT}`,
  code: coEqui, output: plain(sql(DB_SCHOOL, coEqui)),
  sol: 'The join pairs each student with the club of the same ClubID; the extra condition keeps only Pune students, and Chirag drops out because his ClubID is NULL.',
}));
const coNatural = "SELECT PName, SupName\nFROM PRODUCT NATURAL JOIN SUPPLIER\nWHERE City = 'Kochi'\nORDER BY PName;";
Q('co_natural_kochi', co({
  t: 4, d: 3, c: 'application', lang: 'sql', marks: 2,
  pre: `The shop wants the products that come from its supplier in Kochi. Write the output of this natural join of PRODUCT and SUPPLIER. ${FMT}`,
  code: coNatural, output: plain(sql(DB_SHOP, coNatural)),
  sol: 'The natural join matches PRODUCT and SUPPLIER on SupCode. The Kochi supplier is S3, which supplies the water bottle and the lunch box.',
}));
const coJoinGroup = 'SELECT C.ClubName, COUNT(*)\nFROM STUDENT S, CLUB C\nWHERE S.ClubID = C.ClubID\nGROUP BY C.ClubName\nORDER BY C.ClubName;';
Q('co_join_group', co({
  t: 4, d: 4, c: 'analysis', lang: 'sql', marks: 2,
  pre: `This query joins STUDENT and CLUB and then counts the members of each club. Write its output, and notice which club does not appear. ${FMT}`,
  code: coJoinGroup, output: plain(sql(DB_SCHOOL, coJoinGroup)),
  sol: 'Grouping the joined rows by club name gives two members each for Debate, Music and Robotics. Chess has no matching student, so it is absent from an equi-join.',
}));
Q('ar_unmatched', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'Ganga Distributors (S5) appears in the equi-join of PRODUCT and SUPPLIER on SupCode, with NULL in the product columns.',
  r: 'An equi-join returns only those pairs of rows whose values in the joining columns are equal.',
  sol: `A is false and R is true: an equi-join keeps only matching pairs, and no product has SupCode S5, so S5 does not appear at all (the join returns ${one(DB_SHOP, "SELECT COUNT(*) FROM PRODUCT P, SUPPLIER S WHERE P.SupCode = S.SupCode AND S.SupCode = 'S5'")} rows for it).`,
}));
const jq = 'SELECT S.Name, C.Teacher FROM STUDENT S, CLUB C WHERE S.ClubID = C.ClubID AND C.Fee > 250 ORDER BY S.Name;';
Q('s_join', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: `Using the imagined STUDENT and CLUB tables, write a query to show the name of each student with the teacher in charge of his or her club, only for clubs whose fee is more than ₹250. Give the output.\n\n${SCHOOL_TABLES()}`,
  model: qa(DB_SCHOOL, jq),
  sol: 'An equi-join on ClubID plus the condition on Fee; Robotics (500) and Music (300) qualify.',
  scheme: [['Correct join condition', 1], ['Fee condition and correct output', 1]],
}));
const ej = 'SELECT * FROM PRODUCT P, SUPPLIER S WHERE P.SupCode = S.SupCode AND P.Price > 400 ORDER BY P.PCode;';
const nj = 'SELECT * FROM PRODUCT NATURAL JOIN SUPPLIER WHERE Price > 400 ORDER BY PCode;';
const ejCols = sql(DB_SHOP, ej).cols.length;
const njCols = sql(DB_SHOP, nj).cols.length;
expect([ejCols, njCols], [9, 8], 'equi vs natural columns');
Q('s3_join', short({
  t: 4, d: 3, c: 'analysis', marks: 3,
  stem: 'Differentiate between an equi-join and a natural join. Write one query of each kind on the imagined PRODUCT and SUPPLIER tables to show all details of products priced above ₹400 with their suppliers, and say how many columns each result has.',
  model: `1. An **equi-join** states the equality condition on the common column in WHERE; with SELECT * the common column appears **twice**:\n\n${SQ(ej)}\n\nIts result has **${ejCols} columns**.\n\n2. A **natural join** joins automatically on the column with the same name and shows it **once**:\n\n${SQ(nj)}\n\nIts result has **${njCols} columns**. Both return the same two products (Desk Lamp and Extension Board, from Prakash Electricals).`,
  sol: 'The difference (explicit condition, common column twice versus once), one query of each kind, and the column counts.',
  scheme: [['Difference explained', 1], ['Equi-join query with column count', 1], ['Natural join query with column count', 1]],
}));
const lj1 = 'SELECT P.PName, S.SupName FROM PRODUCT P, SUPPLIER S WHERE P.SupCode = S.SupCode ORDER BY P.PName;';
const lj2 = "SELECT PName, Price FROM PRODUCT NATURAL JOIN SUPPLIER WHERE City = 'Indore' ORDER BY Price DESC;";
const lj3 = 'SELECT S.City, COUNT(*) FROM PRODUCT P, SUPPLIER S WHERE P.SupCode = S.SupCode GROUP BY S.City ORDER BY S.City;';
const lj4 = 'SELECT COUNT(*) FROM PRODUCT, SUPPLIER;';
Q('l_join', long({
  t: 4, d: 4, c: 'application', marks: 5,
  stem: `Consider the imagined shop's PRODUCT and SUPPLIER tables. Write SQL queries for (i) to (iv) with their outputs, and answer (v).\n\n(i) Each product name with its supplier's name, in alphabetical order of product.\n(ii) Names and prices of products supplied from Indore, using a natural join, dearest first.\n(iii) The number of products supplied from each city.\n(iv) The number of rows in the Cartesian product of the two tables.\n(v) Why does Patna not appear in the output of (iii)?\n\n${SHOP_TABLES()}`,
  model: `(i)\n\n${qa(DB_SHOP, lj1)}\n\n(ii)\n\n${qa(DB_SHOP, lj2)}\n\n(iii)\n\n${qa(DB_SHOP, lj3)}\n\n(iv)\n\n${qa(DB_SHOP, lj4)}\n\n(v) The Patna supplier (S5) supplies no product, so no PRODUCT row has SupCode S5 and the equi-join finds no matching pair for it.`,
  sol: 'An equi-join with ORDER BY, a natural join with a condition, a join with GROUP BY, the Cartesian count 8 × 5, and the reason for the missing supplier.',
  scheme: [['(i)', 1], ['(ii)', 1], ['(iii)', 1], ['(iv)', 1], ['(v)', 1]],
}));

// ================================================================ t05 UPDATE and DELETE
const kitchenAfter = one(DB_SHOP + "UPDATE PRODUCT SET Price = Price + 20 WHERE Category = 'Kitchen';", "SELECT SUM(Price) FROM PRODUCT WHERE Category = 'Kitchen';");
Q('m_update', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'The imagined shop sells two kitchen items priced ₹180 and ₹240. After `UPDATE PRODUCT SET Price = Price + 20 WHERE Category = \'Kitchen\';` what does `SELECT SUM(Price) FROM PRODUCT WHERE Category = \'Kitchen\';` give?',
  opts: distinct([String(kitchenAfter), '420', '440', '820']),
  sol: `UPDATE adds 20 to the price of each kitchen row: 200 + 260 = ${kitchenAfter}. Adding 20 only once (440) is the common slip.`,
}));
const left = one(DB_SCHOOL + 'DELETE FROM STUDENT WHERE Marks < 70;', 'SELECT COUNT(*) FROM STUDENT;');
Q('m_delete_rows', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'How many rows remain in the imagined STUDENT table after `DELETE FROM STUDENT WHERE Marks < 70;` is run? (The marks are 88, 74, 65, 91, 58, 79, 95 and 83.)',
  opts: distinct([String(left), '2', '8', String(left + 1)]),
  sol: `Only the rows with marks below 70 (65 and 58) are deleted, so ${left} rows remain; the table itself stays.`,
}));
const coUpdate = 'UPDATE STUDENT SET ClubID = 4 WHERE ClubID IS NULL;\nSELECT ClubID, COUNT(*) FROM STUDENT\nGROUP BY ClubID\nORDER BY ClubID;';
Q('co_update_club', co({
  t: 5, d: 3, c: 'application', lang: 'sql', marks: 2,
  pre: `The two students without a club are put in the Chess club (ClubID 4). Write the output of the SELECT that follows the UPDATE on STUDENT. ${FMT}`,
  code: coUpdate,
  output: plain(sql(DB_SCHOOL + 'UPDATE STUDENT SET ClubID = 4 WHERE ClubID IS NULL;', 'SELECT ClubID, COUNT(*) FROM STUDENT GROUP BY ClubID ORDER BY ClubID;')),
  sol: 'The UPDATE fills ClubID 4 in the two NULL rows; grouping then gives two members in each of the four clubs.',
}));
Q('tf_delete_all', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? `DELETE FROM PRODUCT;` without a WHERE clause removes every row of PRODUCT, but the table and its structure remain.',
  sol: `Without WHERE the condition is true for every row, so all rows go (${one(DB_SHOP + 'DELETE FROM PRODUCT;', 'SELECT COUNT(*) FROM PRODUCT;')} left), but the empty table still exists. DROP TABLE would remove the table itself.`,
}));
const u1 = "UPDATE PRODUCT SET Stock = 50 WHERE PCode = 'P05';";
const u2 = 'DELETE FROM PRODUCT WHERE Stock < 25;';
Q('s_update', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: 'Write SQL statements for the imagined shop: (i) set the stock of product P05 to 50; (ii) remove the products whose stock is below 25. Then show the codes and stock of all remaining products in code order.',
  model: `${SQ(u1, u2, 'SELECT PCode, Stock FROM PRODUCT ORDER BY PCode;')}\n\n${tt(sql(DB_SHOP + u1 + '\n' + u2, 'SELECT PCode, Stock FROM PRODUCT ORDER BY PCode;'))}`,
  sol: 'UPDATE … SET … WHERE for (i); DELETE … WHERE for (ii); the two electrical items are removed.',
  scheme: [['(i) correct UPDATE', 1], ['(ii) correct DELETE with the remaining rows', 1]],
}));
const ud1 = 'UPDATE CLUB SET Fee = Fee + 50 WHERE Fee < 250;';
const ud2 = "UPDATE STUDENT SET Stream = 'Science', Class = '12A' WHERE RollNo = 6;";
const ud3 = 'DELETE FROM STUDENT WHERE ClubID IS NULL AND Marks < 70;';
const udAll = DB_SCHOOL + [ud1, ud2, ud3].join('\n');
Q('l_update', long({
  t: 5, d: 3, c: 'application', marks: 5,
  stem: `The imagined school makes some changes to its STUDENT and CLUB tables. Write SQL statements to:\n\n(i) raise the fee by ₹50 for every club whose fee is below ₹250;\n(ii) move roll number 6 to the Science stream in class 12A (change both columns in one statement);\n(iii) remove students who have no club and scored below 70;\n(iv) show all details of the clubs after (i), in order of ClubID;\n(v) show how many students remain after (iii), and explain how DELETE differs from DROP TABLE.\n\n${SCHOOL_TABLES()}`,
  model: `${SQ(ud1, ud2, ud3)}\n\n(iv)\n\n${SQ('SELECT * FROM CLUB ORDER BY ClubID;')}\n\n${tt(sql(udAll, 'SELECT * FROM CLUB ORDER BY ClubID;'))}\n\n(v)\n\n${SQ('SELECT COUNT(*) FROM STUDENT;')}\n\n${tt(sql(udAll, 'SELECT COUNT(*) FROM STUDENT;'))}\n\nDELETE removes rows (all of them without WHERE) but keeps the table; DROP TABLE removes the table with its structure and data.`,
  sol: 'Two UPDATEs (one with a condition on the old value, one setting two columns), a DELETE with AND, then the checks and the DELETE–DROP difference.',
  scheme: [['(i) UPDATE with condition', 1], ['(ii) UPDATE of two columns', 1], ['(iii) DELETE with AND and IS NULL', 1], ['(iv) query and output', 1], ['(v) count and DELETE versus DROP', 1]],
}));

// ================================================================ case-based items
const cs1 = "SELECT Name, Marks FROM STUDENT WHERE Class = '12B' ORDER BY Marks DESC;";
const cs1Rows = sql(DB_SCHOOL, cs1).rows;
Q('cb_school_club', caseQ({
  t: [2, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the club records of an imagined school in Maharashtra and answer the questions. *(Imagined school and data, written by SOYL for practice.)*',
  passage: `The activity coordinator of Sahyadri Vidyalaya keeps two tables in MySQL. STUDENT stores each Class 12 student with the ClubID of the club joined (NULL if none); CLUB stores the clubs, their teachers and fees.\n\n${SCHOOL_TABLES()}`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', fixed: true, key: 'a', stem: `Which student is listed first by \`${cs1}\`?`, opts: distinct([cs1Rows[0][0], cs1Rows[cs1Rows.length - 1][0], 'Bhavna', 'Gaurav']), sol: `Class 12B has Bhavna (74), Eshan (58) and Hina (83); in descending order of marks ${cs1Rows[0][0]} comes first.` })),
    child('b', fb({ t: 4, d: 2, c: 'understanding', stem: 'The column that links the two tables, so that they can be joined, is ___.', acc: [['ClubID']], sol: 'ClubID appears in both tables: it is the primary key of CLUB and refers to a club in STUDENT.' })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write a query to show the names of students and the names of their clubs, for students of the Science stream only. Give the output.', model: qa(DB_SCHOOL, "SELECT S.Name, C.ClubName FROM STUDENT S, CLUB C WHERE S.ClubID = C.ClubID AND S.Stream = 'Science' ORDER BY S.Name;"), sol: 'Equi-join on ClubID with the Stream condition; Chirag has no club, so two rows remain.', scheme: [['Join condition', 1], ['Stream condition and output', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write a query to show each stream with the number of its students who have joined a club. Give the output.', model: qa(DB_SCHOOL, 'SELECT Stream, COUNT(ClubID) FROM STUDENT GROUP BY Stream ORDER BY Stream;'), sol: 'COUNT(ClubID) skips the NULLs, so Science and Humanities each lose one student; GROUP BY Stream gives one row per stream.', scheme: [['GROUP BY Stream', 1], ['COUNT(ClubID) and correct output', 1]] }),
    ]),
  ],
}));
const cs2 = "SELECT COUNT(*) FROM PRODUCT WHERE Category = 'Stationery';";
Q('cb_shop_stock', caseQ({
  t: [3, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the stock database of an imagined school stationery shop and answer the questions. *(Imagined shop, suppliers and prices, written by SOYL for practice.)*',
  passage: `Kiran runs a small shop near a school in Bhopal. She keeps her products and suppliers in two MySQL tables. The stock of the geometry boxes has not been counted yet, so it is NULL.\n\n${SHOP_TABLES()}`,
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'understanding', fixed: true, key: 'b', stem: `What does \`${cs2}\` return?`, opts: ['3', String(one(DB_SHOP, cs2)), '8', '5'], sol: `Four products have the category Stationery; COUNT(*) counts rows, so the NULL stock does not matter: ${one(DB_SHOP, cs2)}.` })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Write a query to find the average price of the kitchen items.', model: `${qa(DB_SHOP, "SELECT AVG(Price) FROM PRODUCT WHERE Category = 'Kitchen';")}\n\n(MySQL may display it as 210.0000.)`, sol: 'AVG with a WHERE condition on Category.', scheme: [['Correct AVG query', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write a query to show the name and city of the supplier of every product costing more than ₹150, with the product name. Give the output.', model: qa(DB_SHOP, 'SELECT P.PName, S.SupName, S.City FROM PRODUCT P, SUPPLIER S WHERE P.SupCode = S.SupCode AND P.Price > 150 ORDER BY P.PName;'), sol: 'Equi-join on SupCode with the price condition: four products qualify.', scheme: [['Join on SupCode', 1], ['Price condition and output', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Write a query to show, for each supplier code, the number of products and their total stock, only for suppliers with total stock above 100. Give the output.', model: qa(DB_SHOP, 'SELECT SupCode, COUNT(*), SUM(Stock) FROM PRODUCT GROUP BY SupCode HAVING SUM(Stock) > 100 ORDER BY SupCode;'), sol: 'GROUP BY SupCode with HAVING on SUM(Stock); SUM ignores the NULL stock of P05.', scheme: [['GROUP BY with COUNT and SUM', 1], ['HAVING and output', 1]] }),
    ]),
  ],
}));
const cs3 = 'SELECT Venue, SUM(Participants) FROM EVENT GROUP BY Venue ORDER BY Venue;';
const cs3Rows = sql(DB_FEST, cs3).rows;
Q('cb_fest_events', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the events table of an imagined inter-school fest and answer the questions. *(Imagined fest and data, written by SOYL for practice.)*',
  passage: `Students of an imagined school in Kochi are organising a one-day fest. Their EVENT table stores each event, its venue, the number of participants registered and the entry fee in rupees. Rangoli has no entry fee decided yet (NULL).\n\n${FEST_TABLE()}`,
  parts: [
    child('a', mcq({ t: 3, d: 3, c: 'application', fixed: true, key: 'c', stem: `Which row appears in the output of \`${cs3}\`?`, opts: ['Hall A, 40', 'Courtyard, 25', `${cs3Rows.find((r) => r[0] === 'Hall A')[0]}, ${cs3Rows.find((r) => r[0] === 'Hall A')[1]}`, 'Ground, 30'], sol: `Grouping by venue adds the participants of events held there: ${cs3Rows.map((r) => `${r[0]} ${r[1]}`).join(', ')}.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Write a query to show the names of events whose entry fee has not been decided.', model: qa(DB_FEST, 'SELECT EName FROM EVENT WHERE EntryFee IS NULL;'), sol: 'Use IS NULL on EntryFee.', scheme: [['Query with IS NULL', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write a query to show the names and fees of events held in Hall A or the Courtyard with a fee of at least ₹50, highest fee first. Give the output.', model: qa(DB_FEST, "SELECT EName, EntryFee FROM EVENT WHERE Venue IN ('Hall A', 'Courtyard') AND EntryFee >= 50 ORDER BY EntryFee DESC, EName;"), sol: 'IN for the two venues, AND for the fee, ORDER BY … DESC (with the name to settle the tie between Quiz and Debate).', scheme: [['IN and fee condition', 1], ['ORDER BY and output', 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The organisers want the total money expected from entry fees (participants × fee) for each venue. Write the query and give its output. Why does Rangoli add nothing to its venue\'s total?', model: `${qa(DB_FEST, 'SELECT Venue, SUM(Participants * EntryFee) AS Collection FROM EVENT GROUP BY Venue ORDER BY Venue;')}\n\nFor Rangoli, Participants × NULL is NULL, and SUM skips NULL values, so the Courtyard total comes only from Photography.`, sol: 'SUM of an expression with GROUP BY, and the NULL rule for arithmetic and aggregates.', scheme: [['Correct grouped query and output', 1], ['NULL explanation', 1]] }),
    ]),
  ],
}));
