// Build CBSE 12 Computer Science ch08 Structured Query Language (SQL). Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch08/src/build.mjs
// Every query result shown in decks, notes and flashcards is produced by runSql() (SQLite through Python), never typed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache } from './lib.mjs';
import { words, shingles } from '../../../../../content-pipeline/src/originality/ngrams.ts';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch08', 'computer-science');
usePyCache(SRC);
const { DB_SCHOOL, DB_SHOP, SQ, sql, fmt, cells, tt } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const res = (db, q) => sql(db, q);
const vt = (db, q, alt, caption) => {
  const r = res(db, q);
  return table(r.cols, cells(r), alt, caption ?? q);
};

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What SQL is', 'DDL and DML', 'Data types and constraints', 'Database and table commands', 'SELECT and WHERE', 'IN, BETWEEN, LIKE', 'NULL and ORDER BY'], 'Route map of Part 1: what SQL is, DDL and DML, data types and constraints, database and table commands, SELECT with WHERE, IN, BETWEEN and LIKE, NULL and ORDER BY', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Aggregate functions', 'COUNT and NULL', 'GROUP BY', 'HAVING', 'Cartesian product', 'Equi-join and natural join', 'UPDATE and DELETE'], 'Route map of Part 2: aggregate functions, COUNT and NULL, GROUP BY, HAVING, Cartesian product, equi-join and natural join, UPDATE and DELETE', 'Part 2 at a glance');
const vAdvantages = table(
  ['Feature of SQL', 'What it means for you'],
  [
    ['Declarative', 'You state **what** data you want; the database decides how to fetch it'],
    ['Standard', 'The same core commands work in MySQL and other relational databases'],
    ['English-like', '`SELECT`, `FROM`, `WHERE` read almost like sentences'],
    ['Powerful', 'One query can filter, sort, group and combine thousands of rows'],
    ['Shared and safe', 'Many users can work on the same data with keys and constraints keeping it correct'],
  ],
  'Table of the advantages of SQL: declarative, standard, English-like, powerful, and shared and safe with constraints',
);
const vDdlDml = table(
  ['Category', 'Works on', 'Commands'],
  [
    ['DDL (Data Definition Language)', 'Structure of databases and tables', '`CREATE`, `ALTER`, `DROP`'],
    ['DML (Data Manipulation Language)', 'Rows of data in tables', '`INSERT`, `UPDATE`, `DELETE`, `SELECT`'],
  ],
  'Table comparing DDL, which works on structure with CREATE, ALTER and DROP, and DML, which works on rows with INSERT, UPDATE, DELETE and SELECT',
);
const vTypes = table(
  ['Data type', 'Stores', 'Example'],
  [
    ['`CHAR(n)`', 'Fixed-length text of n characters (padded)', '`Class CHAR(3)` → 12A'],
    ['`VARCHAR(n)`', 'Variable-length text, up to n characters', '`Name VARCHAR(20)` → Aarav'],
    ['`INT`', 'Whole numbers', '`Marks INT` → 88'],
    ['`FLOAT`', 'Numbers with a decimal part', '`Rating FLOAT` → 4.5'],
    ['`DATE`', 'A date written YYYY-MM-DD', '`StartDate DATE` → 2026-11-14'],
  ],
  'Table of MySQL data types: CHAR fixed-length text, VARCHAR variable-length text, INT whole numbers, FLOAT decimal numbers and DATE in year-month-day form, each with an example column',
);
const vConstraints = table(
  ['Constraint', 'Rule it enforces', 'Typical column'],
  [
    ['`NOT NULL`', 'A value must be entered', '`Name`'],
    ['`UNIQUE`', 'No two rows may have the same value (several NULLs allowed)', '`Email`'],
    ['`PRIMARY KEY`', 'Unique **and** not null; identifies each row; one per table', '`RollNo`'],
  ],
  'Table of constraints: NOT NULL requires a value, UNIQUE forbids repeated values, and PRIMARY KEY is unique and not null and identifies each row',
);
const vDesign = table(
  ['Column', 'Type', 'Constraint'],
  [
    ['RollNo', 'INT', 'PRIMARY KEY'],
    ['Name', 'VARCHAR(20)', 'NOT NULL'],
    ['Class', 'CHAR(3)', ''],
    ['Stream', 'VARCHAR(12)', ''],
    ['Marks', 'INT', ''],
    ['City', 'VARCHAR(15)', ''],
    ['ClubID', 'INT', ''],
  ],
  'Design of the STUDENT table: RollNo integer primary key, Name variable text not null, Class fixed three characters, Stream, Marks integer, City and ClubID integer',
  'Design of STUDENT (the structure DESCRIBE STUDENT would report)',
);
const vDbFlow = flow('LR', ['CREATE DATABASE vidyalaya;', 'SHOW DATABASES;', 'USE vidyalaya;', 'CREATE TABLE …;', 'SHOW TABLES;', 'DESCRIBE STUDENT;'], 'Flow of database commands: create the database, list databases, use it, create a table, list the tables and describe a table', 'A first session in MySQL');
const vAlterDrop = table(
  ['Task', 'Command'],
  [
    ['Add a column', '`ALTER TABLE STUDENT ADD Phone CHAR(10);`'],
    ['Remove a column', '`ALTER TABLE STUDENT DROP Phone;`'],
    ['Add a primary key', '`ALTER TABLE ROOM ADD PRIMARY KEY (RoomNo);`'],
    ['Remove the primary key', '`ALTER TABLE ROOM DROP PRIMARY KEY;`'],
    ['Delete a table', '`DROP TABLE ROOM;`'],
    ['Delete a database', '`DROP DATABASE hostel;`'],
  ],
  'Table of ALTER and DROP commands: add or remove a column, add or remove a primary key, drop a table and drop a database',
);
const vStudent = vt(DB_SCHOOL, 'SELECT * FROM STUDENT ORDER BY RollNo;', 'The imagined STUDENT table with eight students: roll number, name, class, stream, marks, city and club number, where two students have no club', 'STUDENT (imagined data used throughout this chapter)');
const vClub = vt(DB_SCHOOL, 'SELECT * FROM CLUB ORDER BY ClubID;', 'The imagined CLUB table with four clubs: Robotics, Music, Debate and Chess, with teachers and fees', 'CLUB');
const qAlias = "SELECT Name, Marks + 5 AS Revised FROM STUDENT WHERE City = 'Nashik' ORDER BY Name;";
const vAlias = vt(DB_SCHOOL, qAlias, 'Result of an alias query: the two Nashik students with their marks increased by five under the heading Revised');
const qWhere = "SELECT Name, Stream, Marks FROM STUDENT WHERE Marks >= 80 AND Stream <> 'Science' ORDER BY Marks DESC;";
const vWhere = vt(DB_SCHOOL, qWhere, 'Result of a WHERE query with AND: students with at least eighty marks who are not in Science, highest first');
const qInB = "SELECT Name, Marks FROM STUDENT WHERE Marks BETWEEN 70 AND 90 AND City IN ('Pune', 'Nagpur') ORDER BY Name;";
const vInB = vt(DB_SCHOOL, qInB, 'Result of a query with BETWEEN and IN: students from Pune or Nagpur with marks from seventy to ninety');
const qLike = "SELECT PName FROM PRODUCT WHERE PName LIKE '%Box' ORDER BY PName;";
const vLike = vt(DB_SHOP, qLike, 'Result of a LIKE query on PRODUCT: names ending with Box, that is Geometry Box and Lunch Box');
const qNull = 'SELECT Name, Stream FROM STUDENT WHERE ClubID IS NULL ORDER BY Name;';
const vNull = vt(DB_SCHOOL, qNull, 'Result of an IS NULL query: the two students without a club');
const qOrder = 'SELECT Name, Class, Marks FROM STUDENT ORDER BY Class, Marks DESC;';
const vOrder = vt(DB_SCHOOL, qOrder, 'Result of ORDER BY on two columns: students sorted by class and, within each class, by marks from highest to lowest');
const vClauseOrder = flow('LR', ['FROM: pick the table', 'WHERE: keep matching rows', 'GROUP BY: form groups', 'HAVING: keep matching groups', 'SELECT: choose columns', 'ORDER BY: sort'], 'Flow of how a query is worked out: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY', 'How MySQL works out a query (written order differs: SELECT comes first)');
const qWe2 = "SELECT PName, Price FROM PRODUCT WHERE Category = 'Stationery' AND Stock IS NOT NULL ORDER BY Price DESC;";
const vWe2 = vt(DB_SHOP, qWe2, 'Result of worked example 2: stationery items whose stock is known, dearest first');

// Part 2 visuals
const qAgg = 'SELECT COUNT(*), MIN(Marks), MAX(Marks), SUM(Marks), AVG(Marks) FROM STUDENT;';
const rAgg = res(DB_SCHOOL, qAgg);
const vAgg = table(rAgg.cols, cells(rAgg), `Result of five aggregate functions on STUDENT: ${rAgg.rows[0].map(fmt).join(', ')} for count, lowest, highest, total and average`, `${qAgg} (MySQL shows the average as ${rAgg.rows[0][4].toFixed(4)})`);
const qCount = 'SELECT COUNT(*), COUNT(ClubID), COUNT(DISTINCT ClubID) FROM STUDENT;';
const vCount = vt(DB_SCHOOL, qCount, 'Result comparing COUNT star, COUNT of ClubID and COUNT of distinct ClubID: eight, six and three');
const qGroup = 'SELECT Stream, COUNT(*), AVG(Marks) FROM STUDENT GROUP BY Stream ORDER BY Stream;';
const vGroup = vt(DB_SCHOOL, qGroup, 'Result of GROUP BY Stream: the number of students and the average marks of Commerce, Humanities and Science');
const vWhereHaving = table(
  ['', 'WHERE', 'HAVING'],
  [
    ['Works on', 'Single rows', 'Groups'],
    ['When', 'Before GROUP BY', 'After GROUP BY'],
    ['Aggregate functions allowed?', 'No', 'Yes'],
    ['Example', '`WHERE Marks > 60`', '`HAVING COUNT(*) >= 2`'],
  ],
  'Table comparing WHERE and HAVING: WHERE works on rows before grouping and cannot use aggregates; HAVING works on groups after grouping and can',
);
const qWe3 = 'SELECT City, COUNT(*), MAX(Marks) FROM STUDENT WHERE Stream <> \'Commerce\' GROUP BY City HAVING COUNT(*) >= 2 ORDER BY City;';
if (JSON.stringify(res(DB_SCHOOL, qWe3).rows) !== JSON.stringify([['Nashik', 2, 95], ['Pune', 2, 88]])) throw new Error('worked example 3 narration no longer matches the result');
const vWe3 = vt(DB_SCHOOL, qWe3, 'Result of worked example 3: cities with at least two non-Commerce students, with the count and highest marks');
const cart = res(DB_SCHOOL, 'SELECT S.RollNo, C.ClubID FROM STUDENT S, CLUB C;');
const vCart = table(['STUDENT', 'CLUB', 'Cartesian product'], [['8 rows × 7 columns', '4 rows × 4 columns', `${cart.rows.length} rows × ${res(DB_SCHOOL, 'SELECT * FROM STUDENT, CLUB').cols.length} columns`]], 'Table showing that the Cartesian product of STUDENT with 8 rows and 7 columns and CLUB with 4 rows and 4 columns has 32 rows and 11 columns', 'Rows multiply, columns add');
// SVG: matching ClubID values between STUDENT and CLUB (first five students), computed from the data.
const vJoin = (() => {
  const st = res(DB_SCHOOL, 'SELECT Name, ClubID FROM STUDENT WHERE RollNo <= 5 ORDER BY RollNo').rows;
  const cl = res(DB_SCHOOL, 'SELECT ClubID, ClubName FROM CLUB ORDER BY ClubID').rows;
  const s = new Svg(520, 300);
  s.text(90, 20, 'STUDENT (Name, ClubID)', { bold: true, size: 13 });
  s.text(420, 20, 'CLUB (ClubID, ClubName)', { bold: true, size: 13 });
  const ys = st.map((_, i) => 60 + i * 50);
  const yc = cl.map((_, i) => 70 + i * 55);
  st.forEach(([n, id], i) => {
    s.rect(20, ys[i] - 16, 150, 32, { rx: 6, color: 'muted', sw: 1.4 });
    s.text(95, ys[i], `${n}, ${id === null ? 'NULL' : id}`, { size: 13 });
  });
  cl.forEach(([id, n], i) => {
    s.rect(350, yc[i] - 16, 150, 32, { rx: 6, color: 'muted', sw: 1.4 });
    s.text(425, yc[i], `${id}, ${n}`, { size: 13 });
  });
  st.forEach(([, id], i) => {
    const j = cl.findIndex((c) => c[0] === id);
    if (j >= 0) s.arrow(172, ys[i], 346, yc[j], { color: 'accent', sw: 1.8 });
    else s.text(250, ys[i], 'no match', { size: 12, muted: true });
  });
  return s.visual('Diagram of an equi-join: five students on the left linked by arrows to the club with the same ClubID on the right; Chirag, whose ClubID is NULL, has no match, and Chess has no student among these five', 'Equi-join pairs rows with equal ClubID values');
})();
const qNat = 'SELECT PName, SupName, City FROM PRODUCT NATURAL JOIN SUPPLIER WHERE Price < 100 ORDER BY PName;';
const vNat = vt(DB_SHOP, qNat, 'Result of a natural join of PRODUCT and SUPPLIER for products under one hundred rupees, with supplier name and city');
const qWe4 = "SELECT S.Name, C.ClubName, C.Fee FROM STUDENT S, CLUB C WHERE S.ClubID = C.ClubID AND S.Marks > 80 ORDER BY C.Fee DESC, S.Name;";
const vWe4 = vt(DB_SCHOOL, qWe4, 'Result of worked example 4: students with more than eighty marks, their club and its fee, highest fee first');
const qUpd = "SELECT ClubName, Fee FROM CLUB ORDER BY ClubID;";
const vUpd = table(['ClubName', 'Fee before', 'Fee after'], (() => {
  const before = res(DB_SCHOOL, qUpd).rows;
  const after = res(DB_SCHOOL + 'UPDATE CLUB SET Fee = Fee + 100 WHERE Fee >= 300;', qUpd).rows;
  return before.map((r, i) => [r[0], fmt(r[1]), fmt(after[i][1])]);
})(), 'Table of club fees before and after an UPDATE that adds one hundred rupees to clubs charging three hundred or more: Robotics 500 to 600 and Music 300 to 400', 'UPDATE CLUB SET Fee = Fee + 100 WHERE Fee >= 300;');
const vDelDrop = table(
  ['Command', 'Removes', 'Table remains?', 'Category'],
  [
    ['`DELETE FROM T WHERE …;`', 'Matching rows', 'Yes', 'DML'],
    ['`DELETE FROM T;`', 'All rows', 'Yes (empty)', 'DML'],
    ['`DROP TABLE T;`', 'Table, structure and data', 'No', 'DDL'],
  ],
  'Table comparing DELETE with a condition, DELETE without a condition and DROP TABLE: what each removes, whether the table remains, and whether it is DML or DDL',
);
const vSummary1 = table(
  ['Need', 'Use'],
  [
    ['Define or change structure', '`CREATE`, `ALTER`, `DROP` (DDL)'],
    ['Pick rows', '`WHERE` with `=`, `<>`, `>`, `AND`, `OR`, `NOT`'],
    ['A list or a range', '`IN (…)`, `BETWEEN a AND b` (ends included)'],
    ['A pattern', '`LIKE` with `%` (any run) and `_` (one character)'],
    ['Missing values', '`IS NULL`, `IS NOT NULL` (never `= NULL`)'],
    ['Sort', '`ORDER BY col` (ASC default), `DESC`'],
  ],
  'Summary table of Part 1: DDL for structure, WHERE for rows, IN and BETWEEN, LIKE patterns, IS NULL, and ORDER BY',
);
const vSummary2 = table(
  ['Need', 'Use'],
  [
    ['One value from many rows', '`COUNT`, `SUM`, `AVG`, `MIN`, `MAX` (NULLs skipped)'],
    ['One value per group', '`GROUP BY col`'],
    ['Keep some groups', '`HAVING` with an aggregate'],
    ['Combine two tables', 'Equi-join with `=` in WHERE, or `NATURAL JOIN`'],
    ['Change or remove rows', '`UPDATE … SET … WHERE`, `DELETE FROM … WHERE`'],
  ],
  'Summary table of Part 2: aggregates, GROUP BY, HAVING, joins, and UPDATE and DELETE',
);
const vTips = table(
  ['Mistake', 'Correct form'],
  [
    ['`WHERE ClubID = NULL`', '`WHERE ClubID IS NULL`'],
    ['`WHERE COUNT(*) > 2`', '`GROUP BY … HAVING COUNT(*) > 2`'],
    ['Forgetting the join condition', 'Add `WHERE A.col = B.col`, or the result is a Cartesian product'],
    ['`UPDATE` without `WHERE`', 'Changes every row: add the condition'],
  ],
  'Table of common SQL mistakes and their corrections: IS NULL, HAVING for aggregates, join conditions, and WHERE in UPDATE',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Structured Query Language — Part 1: Defining Tables and Writing Queries',
  goals: [
    'Tell DDL from DML and choose suitable data types and constraints for a table',
    'Use database and table commands: CREATE, USE, SHOW, DESCRIBE, ALTER and DROP',
    'Write SELECT queries with WHERE, DISTINCT, aliases, IN, BETWEEN, LIKE, IS NULL and ORDER BY, and predict their results',
  ],
  slides: [
    sl('title', 'Structured Query Language (SQL)', {
      b: 'Part 1 — **defining tables** and **asking questions** of the data with SELECT.',
      v: vRoute1,
      n: 'In the last chapter you met the relational model: data stored in tables of rows and columns. Now we learn the language used to talk to such a database, the Structured Query Language. In this first part we create databases and tables, and then ask questions of the data with the select command. Every result you will see was produced by actually running the query.',
    }),
    sl('concept', 'Why SQL?', {
      b: 'SQL is the standard language of relational databases such as **MySQL**.',
      v: vAdvantages,
      n: 'SQL is declarative. You describe the data you want, and the database works out how to fetch it. The same core commands work across relational databases, the keywords read almost like English, and a single query can filter, sort, group and combine thousands of rows. Constraints and keys keep shared data correct even when many people use it.',
    }),
    sl('concept', 'Two kinds of commands: DDL and DML', {
      b: 'Some commands shape the **containers**; others work on the **contents**.',
      v: vDdlDml,
      n: 'SQL commands fall into two main groups. Data definition language commands, such as create, alter and drop, build or change the structure of databases and tables. Data manipulation language commands, such as insert, update, delete and select, work on the rows stored inside. A useful test: does the command change the shape of the table, or the data in it?',
    }),
    sl('concept', 'Data types', {
      b: 'Each column gets a **data type** that decides what it can store.',
      v: vTypes,
      n: 'When you create a table, every column needs a data type. Char with a size stores text of a fixed length and pads short values with spaces. Varchar stores text of varying length up to its limit. Int stores whole numbers, float stores numbers with a decimal part, and date stores a calendar date written as year, month and day.',
    }),
    sl('concept', 'Constraints', {
      b: 'Constraints are rules the database checks on every insert and update.',
      v: vConstraints,
      n: 'Constraints protect the data. Not null forces a value to be entered. Unique stops two rows from having the same value, although several rows may leave it empty. A primary key is both unique and not null, so it identifies each row. A table has only one primary key, such as the roll number of a student.',
    }),
    sl('example', 'Worked example 1: creating the STUDENT table', {
      b: `${SQ('CREATE TABLE STUDENT (', '  RollNo INT PRIMARY KEY,', '  Name VARCHAR(20) NOT NULL,', '  Class CHAR(3),', '  Stream VARCHAR(12),', '  Marks INT,', '  City VARCHAR(15),', '  ClubID INT', ');')}`,
      v: vDesign,
      n: 'Here is the statement that creates our student table. Each column is written with its name and type, separated by commas. Roll number is an integer and the primary key. Name is variable text and cannot be left empty. Class is always three characters, so a fixed char type suits it. The table on the right is the design that the describe command would report.',
    }),
    sl('concept', 'Working with databases', {
      b: 'A first session: create a database, open it, make a table and look at it.',
      v: vDbFlow,
      n: 'Before creating tables, you create a database and open it with the use command. Show databases lists the databases on the server, and show tables lists the tables in the database you are using. Describe followed by a table name shows its columns, types and keys. These small commands are often asked as one-mark questions.',
    }),
    sl('check', 'Quick check: seeing a table\'s structure', {
      b: 'Which command shows the columns and types of PRODUCT?',
      chk: 'm_describe',
      n: 'Think of the command that describes a table rather than listing its rows.',
    }),
    sl('concept', 'Changing and removing structure', {
      b: 'ALTER TABLE changes columns and keys; DROP removes whole tables or databases.',
      v: vAlterDrop,
      n: 'Once a table exists, alter table changes its structure. You can add or remove a column, and add or remove a primary key. Drop table deletes a table with all its data, and drop database deletes a whole database. These cannot be undone, so they are used with great care.',
    }),
    sl('diagram', 'The STUDENT table we will use', {
      v: vStudent,
      n: 'From here on we use this imagined student table. Eight students from three cities are in three streams. Notice that two students have no club: their club number is empty, which SQL calls null. Keep an eye on those two rows; they behave differently in many queries.',
    }),
    sl('diagram', 'The CLUB table we will use', {
      b: 'ClubID links STUDENT to CLUB.',
      v: vClub,
      n: 'The club table lists four clubs with their teachers and fees. Club number is its primary key, and the same column appears in the student table to show which club each student joined. No student has joined chess yet. We will use this link when we join the two tables in the second part.',
    }),
    sl('concept', 'SELECT, DISTINCT and aliases', {
      b: `${SQ(qAlias)}\n\n\`SELECT DISTINCT City\` shows each city once; \`AS\` gives a column a new heading; arithmetic such as \`Marks + 5\` is allowed.`,
      v: vAlias,
      n: 'Select chooses columns, and from names the table. You can work out new values with arithmetic, and give them a heading with the word as, which is called an alias. Distinct removes repeated values from the result. Here the two Nashik students are shown with five marks added under the heading revised.',
    }),
    sl('concept', 'WHERE: choosing rows', {
      b: `${SQ(qWhere)}\n\nRelational operators: \`=\`, \`<>\`, \`>\`, \`<\`, \`>=\`, \`<=\`; logical operators: \`AND\`, \`OR\`, \`NOT\`.`,
      v: vWhere,
      n: 'Where keeps only the rows for which a condition is true. Conditions use relational operators such as equals, not equal to, greater than and less than, joined by and, or and not. This query keeps students with at least eighty marks who are not in the science stream, and sorts them from the highest marks down.',
    }),
    sl('check', 'Quick check: a missing value', {
      b: 'Complete the condition that finds students without a club.',
      chk: 'fb_isnull',
      n: 'Remember that an empty value cannot be compared with the equals sign. Which two words test for it?',
    }),
    sl('concept', 'IN and BETWEEN', {
      b: `${SQ(qInB)}\n\n\`IN (…)\` matches any value in a list; \`BETWEEN a AND b\` includes **both** end values.`,
      v: vInB,
      n: 'In is a short way of writing several equality tests joined by or. Between checks a range, and it includes both end values, so marks of exactly seventy or ninety would count. This query finds students from Pune or Nagpur whose marks lie from seventy to ninety.',
    }),
    sl('concept', 'LIKE: matching patterns', {
      b: `${SQ(qLike)}\n\n\`%\` stands for any number of characters (even none); \`_\` stands for exactly one character.`,
      v: vLike,
      n: 'Like searches text with a pattern. The percent sign stands for any number of characters, and the underscore stands for exactly one character. A pattern of percent followed by Box matches names that end with the word Box. A pattern of four underscores would match names exactly four letters long.',
    }),
    sl('concept', 'NULL and ORDER BY', {
      b: `${SQ(qNull)}\n\nSort on more than one column: \`ORDER BY Class, Marks DESC\` (within each class, highest marks first).`,
      v: vNull,
      n: 'Null means a value is missing or unknown. Because it is unknown, a comparison with equals is never true, so we test it with is null or is not null. Order by sorts the result, ascending unless you write descending. You can sort on two columns: the second one decides the order within ties of the first.',
    }),
    sl('diagram', 'Sorting on two columns', {
      v: vOrder,
      n: 'Here the students are sorted by class first. Inside each class they are sorted by marks from the highest down. Look at class twelve A: Gaurav with ninety five comes before Aarav and Chirag. Always add order by when the order of rows matters, because without it the database may return rows in any order.',
    }),
    sl('example', 'Worked example 2: building a query clause by clause', {
      b: `Task: names and prices of stationery items whose stock is known, dearest first.\n\n${SQ(qWe2)}\n\n${tt(res(DB_SHOP, qWe2))}`,
      v: vClauseOrder,
      n: 'Build a query in steps. First the table: product. Then the rows: category must be stationery, and stock must be known, so is not null. Then the columns: name and price. Finally the order: price, descending. The flow shows the order in which the database works out a query, which differs from the order in which we write it.',
    }),
    sl('check', 'Quick check: BETWEEN', {
      b: 'Which roll numbers does the BETWEEN query return?',
      chk: 'm_between',
      n: 'Check each student\'s marks, and remember whether the end values of the range are included.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us sum up. Data definition commands create, alter and drop structure; constraints keep the data correct. Select with where picks rows, using relational and logical operators. In tests a list, between tests a range with both ends included, and like matches patterns. Null is tested with is null, and order by sorts the result.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write keywords in capitals and end each statement with a semicolon; quote text and dates with single quotes: `\'Pune\'`.',
        '`BETWEEN 65 AND 83` **includes** 65 and 83.',
        'Never write `= NULL`; write `IS NULL` or `IS NOT NULL`.',
        'For "output" questions, check every row against every condition and then apply ORDER BY.',
        'DELETE removes rows (DML); DROP removes the table (DDL).',
      ],
      v: vTips,
      n: 'A few habits earn easy marks. Quote text values in single quotes and end statements with a semicolon. Remember that between includes its end values. Never compare with equals null. In output questions, test each row against every condition, and only then sort. And keep delete, which removes rows, separate from drop, which removes the table.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Structured Query Language — Part 2: Aggregates, Groups, Joins and Changes',
  goals: [
    'Use COUNT, SUM, AVG, MIN and MAX, and explain how they treat NULL',
    'Group rows with GROUP BY and filter groups with HAVING',
    'Join two tables by Cartesian product, equi-join and natural join',
    'Change and remove rows with UPDATE and DELETE',
  ],
  slides: [
    sl('title', 'SQL: aggregates, groups, joins and changes', {
      b: 'Part 2 — summarising data, combining two tables, and changing rows.',
      v: vRoute2,
      n: 'In the first part each query returned rows from a single table. Now we summarise many rows into a single value, form groups, combine two tables with joins, and change or remove rows. These are the queries that carry the most marks in board papers, so practise each one with the tables we already know.',
    }),
    sl('concept', 'Aggregate functions', {
      b: `${SQ(qAgg)}`,
      v: vAgg,
      n: 'Aggregate functions turn many rows into one value. Count gives the number of rows, minimum and maximum give the smallest and largest values, sum adds them, and average gives their mean. For our eight students the marks run from fifty eight to ninety five. MySQL shows averages with extra zeros after the decimal point.',
    }),
    sl('concept', 'COUNT and NULL', {
      b: `${SQ(qCount)}\n\nAggregates **skip NULL**; only \`COUNT(*)\` counts every row.`,
      v: vCount,
      n: 'Aggregate functions skip null values. Count star counts every row, so it gives eight. Count of club number counts only the six students who have a club. Count distinct counts the different clubs that appear, which is three. The same rule applies to sum and average: an empty value is simply left out.',
    }),
    sl('check', 'Quick check: SUM and COUNT with NULL', {
      b: 'What does the stationery query show?',
      chk: 'm_sum_null',
      n: 'One stationery item has no stock entered. Decide what sum and count do with that row.',
    }),
    sl('concept', 'GROUP BY', {
      b: `${SQ(qGroup)}`,
      v: vGroup,
      n: 'Group by collects rows that share a value into groups, and each aggregate is then worked out once per group. Here we get one row for each stream: how many students it has and their average marks. Columns in the select list should either be the grouping column or inside an aggregate function.',
    }),
    sl('concept', 'HAVING versus WHERE', {
      b: 'WHERE filters **rows** before grouping; HAVING filters **groups** after grouping.',
      v: vWhereHaving,
      n: 'Where and having both filter, but at different moments. Where looks at single rows before any groups exist, so it cannot use count or average. Having looks at whole groups after grouping, so it can. A query may use both: first where removes rows, then groups are formed, then having keeps the groups you want.',
    }),
    sl('example', 'Worked example 3: WHERE, GROUP BY and HAVING together', {
      b: `Task: for cities with at least two students outside Commerce, the number of such students and their highest marks.\n\n${SQ(qWe3)}`,
      v: vWe3,
      n: 'Follow the steps. Where first removes the three commerce students, leaving five rows. Group by then forms one group per city: Nagpur has one row, Nashik two and Pune two. Having keeps the cities with at least two rows, so Nagpur is dropped. For each remaining city we see the count and the highest marks: ninety five in Nashik and eighty eight in Pune.',
    }),
    sl('check', 'Quick check: the group clause', {
      b: 'Which clause keeps only some groups?',
      chk: 'm_having',
      n: 'Think about which filter runs after the groups have been formed.',
    }),
    sl('concept', 'Cartesian product', {
      b: '`SELECT * FROM STUDENT, CLUB;` pairs **every** student with **every** club.',
      v: vCart,
      n: 'When two tables are listed in from without any condition, every row of the first is paired with every row of the second. This is the Cartesian product. Its degree, the number of columns, is the sum of the two degrees. Its cardinality, the number of rows, is the product of the two cardinalities: eight times four gives thirty two.',
    }),
    sl('diagram', 'Equi-join: matching on a common column', {
      b: `${SQ('SELECT S.Name, C.ClubName', 'FROM STUDENT S, CLUB C', 'WHERE S.ClubID = C.ClubID;')}`,
      v: vJoin,
      n: 'Most of those thirty two pairs make no sense. An equi-join keeps only pairs whose common column values are equal, here club number. Each arrow joins a student to the club with the same number. Chirag has no club, so he finds no partner and drops out. The letters S and C are short aliases for the table names.',
    }),
    sl('concept', 'Natural join', {
      b: `${SQ(qNat)}\n\nA natural join matches on the column with the **same name** in both tables and shows it **once**.`,
      v: vNat,
      n: 'A natural join does the matching for you. It looks for the column with the same name in both tables, here supplier code, and keeps the rows where the values are equal. Unlike an equi-join written with select star, it shows the common column only once. This query lists cheaper products with the name and city of their supplier.',
    }),
    sl('example', 'Worked example 4: a join with conditions', {
      b: `Task: students with more than 80 marks, with their club and its fee, highest fee first.\n\n${SQ(qWe4)}`,
      v: vWe4,
      n: 'Combine a join with other conditions using and. The first condition matches club numbers; the second keeps students with more than eighty marks. We then sort by fee from the highest, and by name when fees are equal. Diya and Hina both belong to the debate club, so the name decides their order.',
    }),
    sl('check', 'Quick check: degree and cardinality', {
      b: 'Work out the size of the Cartesian product of STUDENT and CLUB.',
      chk: 'm_cartesian',
      n: 'Columns add and rows multiply. Use the sizes given in the question.',
    }),
    sl('concept', 'UPDATE: changing values', {
      b: `${SQ('UPDATE CLUB SET Fee = Fee + 100 WHERE Fee >= 300;')}\n\nSeveral columns: \`SET Stream = 'Science', Class = '12A'\`. Without WHERE, **every** row changes.`,
      v: vUpd,
      n: 'Update changes values in rows that already exist. Set names the column and its new value, which may use the old value, as in fee plus one hundred. Where decides which rows change. Here only the clubs charging three hundred or more go up. Forget the where clause and every row would change, a costly mistake.',
    }),
    sl('concept', 'DELETE and DROP', {
      b: '`DELETE FROM STUDENT WHERE Marks < 60;` removes matching rows only.',
      v: vDelDrop,
      n: 'Delete removes rows. With a where clause it removes only the matching rows; without one it empties the table but keeps it. Drop table is different: it removes the table itself, with its structure and data. Delete belongs to the data manipulation language and drop to the data definition language.',
    }),
    sl('check', 'Quick check: rows left after DELETE', {
      b: 'How many students remain after the DELETE?',
      chk: 'm_delete_rows',
      n: 'Find the marks below seventy, remove those rows and count what is left.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: aggregate functions turn many rows into one value and skip nulls, except count star. Group by gives one value per group, and having keeps the groups you want. Joins combine tables: a Cartesian product pairs everything, while equi and natural joins keep matching rows. Update and delete change or remove rows chosen by where.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Aggregates in a condition go in **HAVING**, never in WHERE.',
        '`COUNT(col)` skips NULL; `COUNT(*)` does not.',
        'Cartesian product: degree = sum of degrees; cardinality = product of cardinalities.',
        'Always write the join condition, and prefix shared column names: `S.ClubID`.',
        'Give UPDATE and DELETE a WHERE clause unless every row must change.',
      ],
      v: vTips,
      n: 'Remember these points for the exam. Conditions on aggregates go in having. Count of a column skips nulls, count star does not. For a Cartesian product, add the columns and multiply the rows. Write the join condition every time, and put the table name or alias before a column that both tables share. Check every update and delete for its where clause.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Structured Query Language (SQL) — Notes',
  sections: [
    {
      h: '1. SQL, DDL and DML; data types and constraints',
      t: 1,
      b: 'SQL is the standard, declarative language of relational databases such as MySQL.\n\n- **DDL** (structure): `CREATE`, `ALTER`, `DROP`.\n- **DML** (rows): `INSERT`, `UPDATE`, `DELETE`, `SELECT`.\n\n**Data types:** `CHAR(n)` fixed length (padded), `VARCHAR(n)` variable length, `INT`, `FLOAT`, `DATE` (\'YYYY-MM-DD\').\n\n**Constraints:** `NOT NULL` (value required), `UNIQUE` (no repeats; several NULLs allowed), `PRIMARY KEY` (unique and not null; one per table).',
      terms: [
        ['DDL', 'Commands that define or change the structure of databases and tables: CREATE, ALTER, DROP.'],
        ['DML', 'Commands that insert, change, delete or retrieve rows: INSERT, UPDATE, DELETE, SELECT.'],
        ['Constraint', 'A rule on a column that the database enforces, such as NOT NULL, UNIQUE or PRIMARY KEY.'],
      ],
      v: vDdlDml,
      vs: [vTypes, vConstraints],
    },
    {
      h: '2. Database and table commands',
      t: 1,
      b: `${SQ('CREATE DATABASE vidyalaya;', 'SHOW DATABASES;', 'USE vidyalaya;', 'SHOW TABLES;', 'DESCRIBE STUDENT;', 'ALTER TABLE STUDENT ADD Phone CHAR(10);', 'ALTER TABLE STUDENT DROP Phone;', 'ALTER TABLE ROOM ADD PRIMARY KEY (RoomNo);', 'ALTER TABLE ROOM DROP PRIMARY KEY;', 'DROP TABLE ROOM;', 'DROP DATABASE hostel;')}\n\n**INSERT:** \`INSERT INTO CLUB VALUES (5, 'Art', 'Ms Das', 250);\` or with a column list: \`INSERT INTO CLUB (ClubID, ClubName) VALUES (6, 'Yoga');\` (unlisted columns become NULL).`,
      terms: [
        ['DESCRIBE', 'Shows the columns, data types and keys of a table.'],
        ['ALTER TABLE', 'Changes the structure of a table: adds or removes columns or keys.'],
      ],
      v: vAlterDrop,
      vs: [vDbFlow, vDesign],
    },
    {
      h: '3. SELECT with WHERE, IN, BETWEEN and LIKE',
      t: 2,
      b: `General form: \`SELECT columns FROM table WHERE condition ORDER BY column;\`\n\n- \`*\` selects all columns; \`DISTINCT\` removes repeated rows; \`AS\` gives an alias; arithmetic (\`Price * Stock\`) is allowed.\n- Relational: \`=\`, \`<>\`, \`>\`, \`<\`, \`>=\`, \`<=\`; logical: \`AND\`, \`OR\`, \`NOT\`.\n- \`IN ('Pune', 'Nashik')\` matches any value in the list; \`BETWEEN 70 AND 90\` includes both ends.\n- \`LIKE\`: \`%\` any run of characters, \`_\` exactly one character.\n\n${SQ(qInB)}\n\n${tt(res(DB_SCHOOL, qInB))}`,
      terms: [
        ['Alias', 'A temporary name for a column or table in a query, given with AS.'],
        ['Wildcard', 'A LIKE symbol: % for any number of characters, _ for exactly one.'],
      ],
      v: vWhere,
      vs: [vLike, vAlias],
    },
    {
      h: '4. NULL and ORDER BY',
      t: 2,
      b: `NULL means missing or unknown. Any comparison with NULL using \`=\` or \`<>\` is never true, so test with **IS NULL** or **IS NOT NULL**.\n\n\`ORDER BY\` sorts ascending by default; \`DESC\` sorts descending. With two columns, the second sorts within ties of the first. In ascending order MySQL puts NULL first.\n\n${SQ('SELECT PName, Stock FROM PRODUCT ORDER BY Stock DESC;')}\n\n${tt(res(DB_SHOP, 'SELECT PName, Stock FROM PRODUCT ORDER BY Stock DESC;'))}\n\nIn descending order the NULL stock comes last.`,
      terms: [['NULL', 'A missing or unknown value; not zero and not an empty string.']],
      v: vNull,
      vs: [vOrder],
    },
    {
      h: '5. Aggregate functions, GROUP BY and HAVING',
      t: 3,
      b: `\`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\` give one value from many rows and **skip NULL** (only \`COUNT(*)\` counts every row). MySQL shows averages with decimal places (for example 85.0000).\n\n\`GROUP BY col\` gives one result row per group; \`HAVING\` filters groups and may use aggregates; \`WHERE\` filters rows before grouping and may not.\n\nWritten order: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY.\n\n${SQ(qWe3)}\n\n${tt(res(DB_SCHOOL, qWe3))}`,
      terms: [
        ['Aggregate function', 'A function that returns one value from a set of rows: COUNT, SUM, AVG, MIN, MAX.'],
        ['HAVING', 'The clause that keeps only the groups satisfying a condition, written after GROUP BY.'],
      ],
      v: vGroup,
      vs: [vAgg, vCount, vWhereHaving],
    },
    {
      h: '6. Joins, UPDATE and DELETE',
      t: 4,
      b: `**Cartesian product:** \`SELECT * FROM A, B;\` pairs every row of A with every row of B. Degree = degree(A) + degree(B); cardinality = cardinality(A) × cardinality(B).\n\n**Equi-join:** \`WHERE A.col = B.col\`; the common column appears twice with \`SELECT *\`.\n\n**Natural join:** \`A NATURAL JOIN B\` matches the column with the same name and shows it once.\n\n${SQ(qWe4)}\n\n${tt(res(DB_SCHOOL, qWe4))}\n\n**UPDATE** \`table SET col = value WHERE …;\` changes rows; **DELETE FROM** \`table WHERE …;\` removes rows (all rows without WHERE; the table remains).`,
      terms: [
        ['Equi-join', 'A join that keeps pairs of rows with equal values in the joining columns.'],
        ['Natural join', 'A join on the column with the same name in both tables, which appears once in the result.'],
        ['Cardinality', 'The number of rows of a table or result; degree is the number of columns.'],
      ],
      v: vJoin,
      vs: [vCart, vNat, vUpd, vDelDrop],
    },
  ],
  tips: '**Common mistakes**\n- `= NULL` instead of `IS NULL`.\n- An aggregate in WHERE instead of HAVING.\n- Forgetting the join condition (giving a Cartesian product), or not prefixing a column both tables share.\n- Treating BETWEEN as excluding its ends.\n- Mixing up DELETE (rows, DML) and DROP (table, DDL).\n\n**How marks are usually awarded**\n- 1 mark: the correct option or keyword.\n- 2–3 marks: one mark per correct query (or per query with its output).\n- 5 marks: five correct queries or statements, each with the right clauses; outputs in the right order with column headings.\n\n**About the data here:** all tables are imagined. Results were produced by running each query; MySQL may show averages with trailing zeros (85.0000).',
});

// ---------------------------------------------------------------- flashcards
const avgAll = fmt(res(DB_SCHOOL, 'SELECT AVG(Marks) FROM STUDENT').rows[0][0]);
const FC = cards([
  ['What is **SQL**?', 'Structured Query Language: the standard, declarative language of relational databases.', 'definition', 1],
  ['**DDL** commands', '`CREATE`, `ALTER`, `DROP` — they change structure.', 'definition', 1],
  ['**DML** commands', '`INSERT`, `UPDATE`, `DELETE`, `SELECT` — they work on rows.', 'definition', 1],
  ['`CHAR(n)` vs `VARCHAR(n)`', 'CHAR is fixed length (padded with spaces); VARCHAR keeps only the characters entered.', 'concept', 1],
  ['**PRIMARY KEY**', 'Unique and NOT NULL; identifies each row; one per table.', 'definition', 1],
  ['Can a UNIQUE column hold NULL?', 'Yes, and in several rows: one NULL is not equal to another.', 'exam-tip', 1],
  ['Command to open a database', '`USE dbname;`', 'fact', 1],
  ['Command to see a table\'s structure', '`DESCRIBE tablename;` (or `DESC`).', 'fact', 1],
  ['Add a column', '`ALTER TABLE T ADD col type;`', 'example', 1],
  ['Remove a primary key', '`ALTER TABLE T DROP PRIMARY KEY;`', 'example', 1],
  ['What does `DISTINCT` do?', 'Removes repeated rows from the result.', 'concept', 2],
  ['Does `BETWEEN 70 AND 90` include 70 and 90?', 'Yes, both end values are included.', 'exam-tip', 2],
  ['`%` and `_` in LIKE', '`%` any number of characters (even none); `_` exactly one character.', 'concept', 2],
  ['`LIKE \'_i%\'` matches…', 'Values whose **second** character is i.', 'example', 2],
  ['Testing for a missing value', '`IS NULL` / `IS NOT NULL` — never `= NULL`.', 'exam-tip', 2],
  ['Default order of ORDER BY', 'Ascending (ASC); write DESC for descending.', 'fact', 2],
  ['Where does NULL go in ascending ORDER BY (MySQL)?', 'First (and last in descending order).', 'fact', 2],
  ['Written order of clauses', 'SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY.', 'concept', 2],
  ['Five aggregate functions', '`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.', 'definition', 3],
  ['`COUNT(*)` vs `COUNT(col)`', 'COUNT(*) counts all rows; COUNT(col) skips NULLs in col.', 'concept', 3],
  ['Average marks of all eight imagined students', `${avgAll} (MySQL shows more decimal places).`, 'example', 3],
  ['WHERE vs HAVING', 'WHERE filters rows before grouping; HAVING filters groups and may use aggregates.', 'concept', 3],
  ['Error: `WHERE COUNT(*) > 2`', 'Aggregates cannot go in WHERE; use `GROUP BY … HAVING COUNT(*) > 2`.', 'exam-tip', 3],
  ['Cartesian product of 8 × 7 and 4 × 4 tables', `${cart.rows.length} rows and 11 columns.`, 'example', 4],
  ['**Equi-join**', 'Join with `=` on the common column in WHERE; that column appears twice with `SELECT *`.', 'definition', 4],
  ['**Natural join**', 'Joins on the same-named column automatically and shows it once.', 'definition', 4],
  ['Why does a supplier with no products vanish from an equi-join?', 'No row has an equal value to pair with it.', 'concept', 4],
  ['UPDATE without WHERE', 'Changes the column in **every** row.', 'exam-tip', 5],
  ['DELETE vs DROP TABLE', 'DELETE removes rows (table stays, DML); DROP removes the table (DDL).', 'concept', 5],
  ['Change two columns at once', '`UPDATE T SET a = 1, b = \'x\' WHERE …;`', 'example', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Structured Query Language',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ddl_cmd', 'm_in', 'm_count_distinct', 'ar_alter'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words (or SQL) and the 3-mark question in about 60 words (or SQL). Give outputs where asked.', items: ['s_ddl_dml', 's_err_null', 's3_aggregate'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l_ddl', 'l_queries_student'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_fest_events'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Structured Query Language',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dml_cmd', 'm_pk', 'm_where_count', 'm_like', 'm_count_null', 'm_groupby', 'm_join_count', 'm_update', 'ar_null_eq', 'ar_where_agg'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words (or SQL) and 3-mark questions in about 60 words (or SQL). Give outputs where asked.', items: ['s_char_varchar', 's_queries_school', { attempt: 1, keys: ['s_err_having', 's_join'] }, 's3_create', { attempt: 1, keys: ['s3_queries_product', 's3_join'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_group', { attempt: 1, keys: ['l_join', 'l_update'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_school_club', 'cb_shop_stock'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-computer-science-ch08 only (DDL and DML, types and constraints; SELECT with WHERE, IN, BETWEEN, LIKE, ORDER BY, NULL; aggregates, GROUP BY, HAVING; joins; UPDATE and DELETE)',
    originality: 'every table, row and query written for this chapter by SOYL (imagined school, shop and fest); no textbook, NCERT or board-paper table or query reused (D-036)',
    execution: 'every query result in items, slides, notes and flashcards produced by running the query in SQLite through Python (runSql in lib.mjs), only SQL whose result is the same in MySQL; results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});

// Near-duplicate check against the whole bank, as the originality gate does (5-gram Jaccard >= 0.7, 10+ words).
{
  const root = path.resolve(DIR, '..', '..');
  const mine = JSON.parse(fs.readFileSync(path.join(DIR, fs.existsSync(path.join(DIR, 'release.json')) ? 'release.json' : 'release.wip.json'), 'utf8')).questions;
  const others = [];
  for (const fam of fs.readdirSync(root)) {
    const fd = path.join(root, fam);
    if (!fs.statSync(fd).isDirectory()) continue;
    for (const ch of fs.readdirSync(fd)) {
      const f = ['release.json', 'release.wip.json'].map((x) => path.join(fd, ch, x)).find((x) => fs.existsSync(x));
      if (!f || ch === 'cbse-12-computer-science-ch08') continue;
      for (const q of JSON.parse(fs.readFileSync(f, 'utf8')).questions ?? []) others.push(q);
    }
  }
  const sh = (q) => {
    const w = words(`${q.passage_md ?? ''}\n${q.stem_md}`);
    return w.length >= 10 ? new Set(shingles(w, 5)) : new Set();
  };
  const all = [...mine.map((q) => [q, sh(q), true]), ...others.map((q) => [q, sh(q), false])];
  let hits = 0;
  for (let i = 0; i < mine.length; i++) {
    const [a, A] = all[i];
    if (!A.size) continue;
    for (let j = i + 1; j < all.length; j++) {
      const [b, B] = all[j];
      if (!B.size) continue;
      let inter = 0;
      for (const g of A) if (B.has(g)) inter++;
      const sim = inter / (A.size + B.size - inter);
      if (sim >= 0.7) {
        hits++;
        console.log(`NEAR-DUPLICATE ${a.id} ~ ${b.id}: ${Math.round(sim * 100)}%`);
      }
    }
  }
  console.log(`near-duplicate self-check: ${hits} pair(s)`);
  if (hits) process.exitCode = 1;
}
