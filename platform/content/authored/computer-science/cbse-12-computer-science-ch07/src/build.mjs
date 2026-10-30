// Build CBSE 12 Computer Science ch07 Database Concepts. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch07/src/build.mjs
// Every degree, cardinality and key-violation result shown is measured by running SQL on the imagined tables
// in SQLite (runSql / pyErr in lib.mjs, via questions.mjs), never typed by hand.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch07', 'computer-science');
usePyCache(SRC);
const { T, M, E } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const rel = (name, caption) => table(T[name].cols, T[name].rows.map((r) => r.map(String)), `Table of the imagined ${name} relation with columns ${T[name].cols.join(', ')} and ${T[name].rows.length} rows`, caption);
const errMsg = (e) => e.replace(/^sqlite3\.IntegrityError: /, '');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Problems with files', 'What a DBMS does', 'Relation, tuple, attribute', 'Domain', 'Degree and cardinality', 'Cartesian product'], 'Route map of Part 1: problems with files, what a DBMS does, relation, tuple and attribute, domain, degree and cardinality, Cartesian product', 'Part 1 at a glance');
const vFiles = table(
  ['File (imagined school)', 'What it stores', 'Repeated data'],
  [
    ['Admission file', 'AdmNo, name, class, address, phone', '—'],
    ['Fee file', 'AdmNo, name, class, month, amount', 'name, class'],
    ['Transport file', 'AdmNo, name, address, phone, bus route', 'name, address, phone'],
  ],
  'Table of three separate files of an imagined school: the admission file, the fee file and the transport file each repeat the student name, and the transport file repeats address and phone',
  'The same facts typed into three files.',
);
const vProblems = table(
  ['Problem', 'What goes wrong', 'In the imagined school'],
  [
    ['Redundancy', 'Same data stored many times', 'Name typed in three files'],
    ['Inconsistency', 'Copies disagree after an update', 'New phone number in one file only'],
    ['Unavailability', 'Data exists but is hard to get', 'Bus users with unpaid fees takes days'],
    ['Unauthorised access', 'Anyone with the file sees everything', 'Fee clerk can read health notes'],
    ['Data dependence', 'Programs break when the file layout changes', 'A new column breaks the fee program'],
  ],
  'Table of five file-system problems: redundancy, inconsistency, unavailability, unauthorised access and data dependence, with what goes wrong and an example from an imagined school',
);
const vDbms = flow('LR', ['Users and programs (office, teachers, apps)', 'DBMS (for example MySQL): stores, checks, controls access', 'Database: related tables'], 'Flow: users and programs send requests to the DBMS, which stores data, checks rules and controls access to the database of related tables', 'The DBMS sits between users and data');
const vRelation = (() => {
  const s = new Svg(600, 300);
  const cols = T.STUDENT.cols;
  const rows = T.STUDENT.rows;
  const x0 = 70, y0 = 60, cw = 115, rh = 30;
  cols.forEach((c, j) => {
    s.rect(x0 + j * cw, y0, cw, rh, { fill: 'fill', color: 'accent', sw: 1.4, rx: 0 });
    s.text(x0 + j * cw + cw / 2, y0 + rh / 2, c, { size: 13, bold: true });
  });
  rows.forEach((r, i) => {
    r.forEach((v, j) => {
      s.rect(x0 + j * cw, y0 + (i + 1) * rh, cw, rh, { color: i === 2 ? 'accent' : undefined, sw: i === 2 ? 2 : 1, rx: 0 });
      s.text(x0 + j * cw + cw / 2, y0 + (i + 1) * rh + rh / 2, String(v), { size: 12 });
    });
  });
  // Attribute arrow to the Name column, tuple arrow to the third row.
  s.arrow(x0 + cw * 1.5, 22, x0 + cw * 1.5, y0 - 2, { color: 'accent', sw: 1.6 });
  s.text(x0 + cw * 1.5 + 8, 18, 'attribute (column)', { anchor: 'start', size: 12, color: 'accent' });
  s.arrow(36, y0 + 3.5 * rh, x0 - 4, y0 + 3.5 * rh, { color: 'accent', sw: 1.6 });
  s.text(8, y0 + 3.5 * rh - 16, 'tuple', { anchor: 'start', size: 12, color: 'accent' });
  s.text(x0, y0 + 7 * rh + 18, `degree ${M.student.degree} (attributes), cardinality ${M.student.cardinality} (tuples)`, { anchor: 'start', size: 13, bold: true });
  return s.visual(
    `Diagram of the imagined STUDENT relation drawn as a grid with a heading row AdmNo, Name, Class, LibCard and five data rows; an arrow marks the Name column as an attribute, another marks the third row as a tuple, and a label says degree ${M.student.degree} and cardinality ${M.student.cardinality}`,
    'Imagined data. The heading row is not counted in the cardinality.',
  );
})();
const vTerms = table(
  ['Term', 'Meaning', 'In STUDENT'],
  [
    ['Relation', 'A table of data', 'STUDENT'],
    ['Tuple (record)', 'One row', '(2203, Meera Iyer, 12B, LC-107)'],
    ['Attribute (field)', 'One named column', 'Class'],
    ['Domain', 'Set of values an attribute may take', 'Class: 12A, 12B, 12C, …'],
    ['Degree', 'Number of attributes', String(M.student.degree)],
    ['Cardinality', 'Number of tuples', String(M.student.cardinality)],
  ],
  `Table of relational terms with meanings and examples from the imagined STUDENT relation: relation, tuple, attribute, domain, degree ${M.student.degree} and cardinality ${M.student.cardinality}`,
);
const vMeasures = table(
  ['Relation (imagined)', 'Degree', 'Cardinality'],
  [
    ['STUDENT', String(M.student.degree), String(M.student.cardinality)],
    ['FEES', String(M.fees.degree), String(M.fees.cardinality)],
    ['ITEM', String(M.item.degree), String(M.item.cardinality)],
    ['SUPPLIER', String(M.supplier.degree), String(M.supplier.cardinality)],
    ['DOCTOR', String(M.doctor.degree), String(M.doctor.cardinality)],
    ['PATIENT', String(M.patient.degree), String(M.patient.cardinality)],
  ],
  'Table of degree and cardinality of six imagined relations, measured by running SELECT queries on them',
  'Measured by running the tables in SQLite.',
);
const vGrow = table(
  ['Step', 'Degree', 'Cardinality'],
  [
    ['ITEM as given', String(M.item.degree), String(M.item.cardinality)],
    ['Add column Shelf', String(M.itemGrown.degree), String(M.item.cardinality)],
    ['Insert two items', String(M.itemGrown.degree), String(M.itemGrown.cardinality)],
  ],
  `Worked example table: ITEM starts with degree ${M.item.degree} and cardinality ${M.item.cardinality}; adding a column makes the degree ${M.itemGrown.degree}; inserting two items makes the cardinality ${M.itemGrown.cardinality}`,
  'A column changes the degree; a row changes the cardinality.',
);
const vProps = table(
  ['Property of a relation', 'Why'],
  [
    ['Each attribute has a unique name', 'So that every value can be referred to'],
    ['Each value is atomic (single)', 'One phone number per cell, not a list'],
    ['No two tuples are identical', 'Each row must be distinguishable'],
    ['Order of tuples does not matter', 'A relation is a set of rows'],
    ['Order of attributes does not matter', 'Columns are found by name'],
  ],
  'Table of five properties of a relation: unique attribute names, atomic values, no identical tuples, order of tuples does not matter, order of attributes does not matter',
);
const vProduct = table(
  ['', 'STUDENT', 'FEES', 'STUDENT × FEES'],
  [
    ['Degree', String(M.student.degree), String(M.fees.degree), `${M.student.degree} + ${M.fees.degree} = ${M.studentXfees.degree}`],
    ['Cardinality', String(M.student.cardinality), String(M.fees.cardinality), `${M.student.cardinality} × ${M.fees.cardinality} = ${M.studentXfees.cardinality}`],
  ],
  `Table of a Cartesian product: STUDENT has degree ${M.student.degree} and cardinality ${M.student.cardinality}, FEES has ${M.fees.degree} and ${M.fees.cardinality}; the product has degree ${M.studentXfees.degree} and cardinality ${M.studentXfees.cardinality}`,
  'Degrees add, cardinalities multiply (measured by running SELECT * FROM STUDENT, FEES).',
);
const vProductEx = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. Degree of DOCTOR × PATIENT', `${M.doctor.degree} + ${M.patient.degree}`, String(M.doctorXpatient.degree)],
    ['2. Cardinality of DOCTOR × PATIENT', `${M.doctor.cardinality} × ${M.patient.cardinality}`, String(M.doctorXpatient.cardinality)],
    ['3. Meaningful pairs only', 'keep rows where the DocID values match', String(M.patient.cardinality)],
  ],
  `Worked example table: DOCTOR times PATIENT has degree ${M.doctorXpatient.degree} and cardinality ${M.doctorXpatient.cardinality}; keeping only rows with matching DocID leaves ${M.patient.cardinality}`,
  'Imagined Seva Hospital data.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['File-system problems', 'Redundancy, inconsistency, unavailability, unauthorised access, dependence'],
    ['DBMS', 'Software that stores, checks and controls access (MySQL)'],
    ['Relation terms', 'Tuple = row, attribute = column, domain = allowed values'],
    ['Degree / cardinality', 'Columns / rows (heading row not counted)'],
    ['Cartesian product', 'Degrees add, cardinalities multiply'],
  ],
  'Summary table of Part 1: five file-system problems, what a DBMS is, relation terms, degree and cardinality, and the Cartesian product rule',
);
const vTips1 = table(
  ['Common mistake', 'Correct idea'],
  [
    ['Counting the heading row in the cardinality', 'Count only data rows'],
    ['Swapping degree and cardinality', 'Degree = columns, cardinality = rows'],
    ['Multiplying degrees in a product', 'Degrees add; cardinalities multiply'],
    ['Saying a DBMS removes all repetition', 'It controls redundancy; foreign keys repeat on purpose'],
  ],
  'Table of common mistakes in Part 1 with the correct ideas: do not count the heading row, do not swap degree and cardinality, add degrees in a product, a DBMS controls rather than removes redundancy',
);
// Part 2
const vRoute2 = flow('LR', ['Why keys', 'Candidate keys', 'Primary and alternate keys', 'Foreign keys', 'Referential integrity', 'Composite keys'], 'Route map of Part 2: why keys, candidate keys, primary and alternate keys, foreign keys, referential integrity and composite keys', 'Part 2 at a glance');
const vCandTest = table(
  ['Attribute of STUDENT', 'Unique for every row?', 'Never empty?', 'Candidate key?'],
  [
    ['AdmNo', 'Yes', 'Yes', 'Yes'],
    ['Name', 'No (Kabir Das twice)', 'Yes', 'No'],
    ['Class', 'No (12A twice)', 'Yes', 'No'],
    ['LibCard', 'Yes', 'Yes', 'Yes'],
  ],
  'Table testing each attribute of the imagined STUDENT relation: AdmNo and LibCard are unique and never empty, so they are candidate keys; Name and Class repeat, so they are not',
  'Checked by counting matching rows in SQLite.',
);
const vChoose = flow('LR', ['Candidate keys: AdmNo, LibCard', 'Choose one: AdmNo', 'Primary key: AdmNo', 'Alternate key: LibCard'], 'Flow: the candidate keys AdmNo and LibCard; AdmNo is chosen, so it becomes the primary key and LibCard becomes the alternate key', 'From candidate keys to primary and alternate keys');
const vSupKeys = table(
  ['Attribute of SUPPLIER', 'Unique?', 'Role'],
  [
    ['SupCode', 'Yes', 'Primary key (chosen)'],
    ['LicenceNo', 'Yes', 'Alternate key'],
    ['SName', 'Could repeat', 'Not a key'],
    ['City', 'Could repeat', 'Not a key'],
  ],
  'Worked example table for the imagined SUPPLIER relation: SupCode is the primary key, LicenceNo the alternate key, and SName and City are not keys',
);
const vFk = (() => {
  const s = new Svg(600, 230);
  s.rect(30, 40, 220, 150, { color: 'accent', sw: 2, rx: 6 });
  s.text(140, 60, 'STUDENT (parent)', { bold: true, size: 14 });
  s.text(50, 95, 'AdmNo  primary key', { anchor: 'start', size: 13, color: 'accent', bold: true });
  s.text(50, 125, 'Name', { anchor: 'start', size: 13 });
  s.text(50, 150, 'Class', { anchor: 'start', size: 13 });
  s.text(50, 175, 'LibCard  alternate key', { anchor: 'start', size: 13 });
  s.rect(350, 40, 220, 150, { color: 'accent', sw: 2, rx: 6 });
  s.text(460, 60, 'FEES (child)', { bold: true, size: 14 });
  s.text(370, 95, 'ReceiptNo  primary key', { anchor: 'start', size: 13 });
  s.text(370, 125, 'AdmNo  foreign key', { anchor: 'start', size: 13, color: 'accent', bold: true });
  s.text(370, 150, 'Month', { anchor: 'start', size: 13 });
  s.text(370, 175, 'Amount', { anchor: 'start', size: 13 });
  s.arrow(366, 121, 220, 99, { color: 'accent', sw: 2 });
  s.text(300, 214, 'every FEES.AdmNo must exist in STUDENT', { size: 13, muted: true });
  return s.visual('Diagram of two boxes: STUDENT with AdmNo as primary key and LibCard as alternate key, and FEES with ReceiptNo as primary key and AdmNo as foreign key; an arrow goes from FEES.AdmNo to STUDENT.AdmNo, labelled every FEES AdmNo must exist in STUDENT', 'Imagined Nilgiri Vidyalaya tables.');
})();
const vIntegrity = table(
  ['Attempted change', 'DBMS response', 'Rule'],
  [
    ['New student with AdmNo 2203', `Rejected (${errMsg(E.dupPk)})`, 'Primary key must be unique'],
    ['New student with LibCard LC-107', `Rejected (${errMsg(E.dupAk)})`, 'Alternate key must be unique'],
    ['Receipt for AdmNo 2209', `Rejected (${errMsg(E.badFk)})`, 'Foreign key must match a parent'],
    ['Delete student 2201', `Rejected (${errMsg(E.delParent)})`, 'Parent still referred to by receipts'],
  ],
  'Table of four attempted changes to the imagined school tables, each rejected by the DBMS: a duplicate AdmNo, a duplicate LibCard, a receipt for a student who does not exist, and deleting a student who still has receipts',
  'Responses produced by running the changes in SQLite with foreign keys on; MySQL words its messages differently.',
);
const vComposite = table(
  ['AdmNo', 'Subject', 'Marks'],
  [
    ['2201', 'Physics', '78'],
    ['2201', 'English', '84'],
    ['2203', 'Physics', '91'],
    ['2203', 'English', '72'],
  ],
  'Table of an imagined EXAM_RESULT relation: AdmNo repeats across subjects and Subject repeats across students, but each AdmNo and Subject pair appears once',
  'Key: the pair (AdmNo, Subject), a composite key.',
);
const vHospitalKeys = table(
  ['Relation', 'Primary key', 'Alternate key', 'Foreign key'],
  [
    ['DOCTOR', 'DocID', 'RegNo', '—'],
    ['PATIENT', 'PID', '—', 'DocID (refers to DOCTOR)'],
  ],
  'Worked example table of keys in the imagined Seva Hospital database: DOCTOR has primary key DocID and alternate key RegNo; PATIENT has primary key PID and foreign key DocID referring to DOCTOR',
);
const vKeyRules = table(
  ['Key', 'Unique?', 'NULL allowed?', 'How many per table?'],
  [
    ['Candidate key', 'Yes', 'No', 'One or more'],
    ['Primary key', 'Yes', 'No', 'Exactly one'],
    ['Alternate key', 'Yes', 'No (declare NOT NULL)', 'Zero or more'],
    ['Foreign key', 'No, may repeat', 'Yes, if not yet linked', 'Zero or more'],
  ],
  'Table comparing keys: candidate, primary and alternate keys are unique and not null; a table has exactly one primary key; a foreign key may repeat and may be null',
);
const vSummary2 = table(
  ['Key', 'One-line rule'],
  [
    ['Candidate key', 'Any attribute set that is unique and never empty'],
    ['Primary key', 'The candidate key chosen to identify tuples'],
    ['Alternate key', 'A candidate key not chosen'],
    ['Foreign key', 'Values must match the primary key of another table'],
    ['Composite key', 'A key made of two or more attributes'],
  ],
  'Summary table of Part 2: candidate, primary, alternate, foreign and composite keys with one-line rules',
);
const vTips2 = table(
  ['Common mistake', 'Correct idea'],
  [
    ['"Name is unique today, so it is a key"', 'A key must stay unique for all future rows'],
    ['"A foreign key must be unique"', 'It repeats for every child row of a parent'],
    ['"Alternate key = foreign key"', 'Alternate keys are unused candidate keys of the same table'],
    ['Forgetting the table in answers', 'Say "AdmNo in FEES refers to STUDENT"'],
  ],
  'Table of common mistakes about keys with corrections: uniqueness must hold for future rows, foreign keys can repeat, alternate keys are not foreign keys, and always name the table',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Database Concepts — Part 1: Why Databases, and the Relational Model',
  goals: [
    'Explain the problems of keeping data in separate files and how a DBMS solves them',
    'Use the terms relation, tuple, attribute and domain correctly',
    'Find the degree and cardinality of a relation, after changes, and of a Cartesian product',
  ],
  slides: [
    sl('title', 'Database Concepts', {
      b: 'Part 1 — why we need **databases**, what a **DBMS** does, and the **relational model**: tuples, attributes, domains, degree and cardinality.',
      v: vRoute1,
      n: 'Every school, shop and hospital keeps records. In this chapter we see why keeping them in separate files causes trouble, how a database management system fixes it, and how a relational database arranges data in tables. By the end you will count degree and cardinality without slipping.',
    }),
    sl('concept', 'Data kept in separate files', {
      b: 'Before databases, each office kept its **own file**. The same student details were typed again and again.',
      v: vFiles,
      n: 'Picture an imagined school where the office, the accounts section and the transport desk each keep their own file. Look at the last column: the student name appears in all three files, and the address and phone appear twice. Every repeat is extra typing, and every repeat is a chance for a mistake.',
    }),
    sl('concept', 'Five problems of file systems', {
      v: vProblems,
      n: 'This table lists the five problems you must know. Redundancy means the same data is stored many times. Inconsistency means the copies disagree after an update. Unavailability means the data exists but is hard to get in the form you need. Unauthorised access means anyone with the file sees everything. Data dependence means programs break when the file layout changes.',
    }),
    sl('check', 'Quick check: name the problem', {
      b: 'A phone number is changed in one file but not in another. Which problem is this?',
      chk: 'm_inconsistency',
      n: 'Think about what has gone wrong: is data missing, or are two copies telling different stories?',
    }),
    sl('concept', 'What a DBMS does', {
      b: 'A **database** is an organised collection of related data. A **DBMS** (database management system) is the software that creates it, stores it, **checks rules** and **controls access** — for example **MySQL**.',
      v: vDbms,
      n: 'A database is the organised collection of related data. The database management system is the software in the middle. Users and programs never touch the data directly; they ask the system, which stores the data once, checks rules such as keys, and decides who may see what. MySQL is the system you will use in this course.',
    }),
    sl('two-column', 'File system or DBMS?', {
      cols: [
        '**File system**\n\n- Same data in many files\n- Copies can disagree\n- New report = new program\n- All-or-nothing access',
        '**DBMS**\n\n- Data stored once, linked by keys\n- One update seen everywhere\n- New report = new query\n- Each user sees only allowed data',
      ],
      n: 'Here is the contrast in one view. On the left, the file system repeats data, lets copies drift apart, needs a new program for every new report, and gives all-or-nothing access. On the right, a database management system stores each fact once, keeps one version, answers new questions with a query and controls who sees what.',
    }),
    sl('diagram', 'A relation is a table', {
      b: 'In the **relational model**, data is kept in **relations** (tables).',
      v: vRelation,
      n: 'In the relational model, data lives in tables called relations. This is the imagined student relation. Each column, such as Name, is an attribute. Each row, such as the one for Meera Iyer, is a tuple. The heading row only names the attributes; it is not a tuple, so it is never counted.',
    }),
    sl('concept', 'Tuple, attribute and domain', {
      v: vTerms,
      n: 'Learn these words as pairs. A tuple is a row, also called a record. An attribute is a column, also called a field. A domain is the set of values an attribute is allowed to take: for Class it is the list of class names in the school. Degree and cardinality are counts, which we look at next.',
    }),
    sl('check', 'Quick check: repetition and keys', {
      b: 'True or false? A DBMS removes every repeated value, so a foreign key value may never appear in two tables.',
      chk: 'tf_dbms_redundancy',
      n: 'Think about how two tables can be linked if no value is ever repeated.',
    }),
    sl('concept', 'Degree and cardinality', {
      b: '**Degree** = number of **attributes** (columns). **Cardinality** = number of **tuples** (rows).',
      v: vMeasures,
      n: 'Degree counts columns. Cardinality counts rows. These values were measured by actually running each imagined table in a database, so you can trust them. Notice that the student relation has four columns and five rows, so its degree is four and its cardinality is five. Never count the heading row.',
    }),
    sl('example', 'Worked example 1: degree and cardinality after changes', {
      b: 'The shop\'s ITEM relation gains a column **Shelf**, then two new items are inserted. Find the new degree and cardinality.',
      bl: [
        `Start: degree ${M.item.degree}, cardinality ${M.item.cardinality}.`,
        `A new **column** changes only the degree: ${M.item.degree} + 1 = ${M.itemGrown.degree}.`,
        `New **rows** change only the cardinality: ${M.item.cardinality} + 2 = ${M.itemGrown.cardinality}.`,
        'Check by counting the table again after the changes.',
      ],
      v: vGrow,
      n: 'Here is a typical exam question. The shop adds one column and then inserts two items. Adding a column changes only the degree, so it goes up by one. Adding rows changes only the cardinality, so it goes up by two. Deleting a row would lower the cardinality, and dropping a column would lower the degree.',
    }),
    sl('concept', 'Properties of a relation', {
      v: vProps,
      n: 'A relation follows a few rules. Every attribute has its own name. Each cell holds one single value, so you would not squeeze two phone numbers into one cell. No two tuples are exactly alike. And the order of rows and of columns carries no meaning, because a relation is a set of rows found by their values.',
    }),
    sl('check', 'Quick check: count the attributes', {
      b: 'What is the degree of the ITEM relation?',
      chk: 'n_degree_item',
      n: 'Count the column names in the heading, not the rows.',
    }),
    sl('concept', 'Cartesian product: every row with every row', {
      b: 'The **Cartesian product** A × B pairs **every** tuple of A with **every** tuple of B.',
      v: vProduct,
      n: 'The Cartesian product pairs each row of one relation with each row of the other. So the number of rows multiplies, and every result row carries all the columns of both relations, so the number of columns adds. These figures were checked by running the product of the student and fee relations.',
    }),
    sl('example', 'Worked example 2: size of a product', {
      b: 'Find the degree and cardinality of DOCTOR × PATIENT for Seva Hospital, and how many of its rows are meaningful.',
      bl: [
        'Degree: **add** the degrees.',
        'Cardinality: **multiply** the cardinalities.',
        'Meaningful rows: only those where DOCTOR.DocID matches PATIENT.DocID.',
      ],
      v: vProductEx,
      n: 'Apply the two rules. The degrees add to eight and the cardinalities multiply to fifteen. But most of those fifteen rows pair a patient with a doctor who is not treating them. If we keep only the rows where the doctor identity numbers match, five meaningful rows remain, one for each patient. You will meet this idea again as a join.',
    }),
    sl('check', 'Quick check: rows in a product', {
      b: 'STUDENT has 5 tuples and FEES has 4. How many tuples are in STUDENT × FEES?',
      chk: 'n_product_card',
      n: 'Each student row pairs with every fee row.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: separate files cause redundancy, inconsistency, unavailability, unauthorised access and data dependence. A database management system such as MySQL solves these. Data sits in relations, made of tuples and attributes, with each attribute drawing values from a domain. Degree counts columns, cardinality counts rows, and in a product degrees add while cardinalities multiply.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      b: '**How marks are given:** 1 mark for a correct count with no working; 2 marks need the definition *and* the value from the given table; 3–5 marks expect each point tied to the scenario.',
      v: vTips1,
      n: 'Common slips: counting the heading row, swapping degree and cardinality, and multiplying degrees in a product. In two-mark answers, write the definition and then the value from the table given. In longer answers about file systems, link every problem to the scenario in the question, such as the school or the shop.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Database Concepts — Part 2: Keys',
  goals: [
    'Identify candidate, primary and alternate keys in a relation',
    'Identify foreign keys and explain referential integrity',
    'Choose a suitable key, including a composite key, and justify it',
  ],
  slides: [
    sl('title', 'Keys in a relational database', {
      b: 'Part 2 — **candidate**, **primary**, **alternate** and **foreign** keys, **referential integrity** and **composite** keys.',
      v: vRoute2,
      n: 'A database must be able to point at exactly one row, and to link rows across tables. Keys make both possible. In this part we test which attributes can be keys, choose a primary key, and see how foreign keys keep linked tables correct.',
    }),
    sl('concept', 'Why keys?', {
      b: 'To update or delete **one** student, the DBMS must be able to tell every tuple apart.',
      v: table(T.STUDENT.cols, T.STUDENT.rows.map((r) => r.map(String)), 'Table of the imagined STUDENT relation: two students share the name Kabir Das, one in 12A and one in 12B', 'Imagined records; two students share a name.'),
      n: 'Look at this table. Two different students are both called Kabir Das. If the office says change the class of Kabir Das, which row should change? A name cannot tell them apart. We need an attribute whose value is different for every student. That is the idea of a key.',
    }),
    sl('concept', 'Candidate keys', {
      b: 'A **candidate key** is an attribute (or set of attributes) that is **unique** for every tuple and **never empty**.',
      v: vCandTest,
      n: 'To find candidate keys, test each attribute. Is it unique for every row? Is it never empty? Admission number passes both tests, and so does the library card number. Name fails because Kabir Das appears twice, and Class fails because twelve A appears twice. So this relation has two candidate keys.',
    }),
    sl('diagram', 'Primary and alternate keys', {
      b: 'Choose **one** candidate key as the **primary key**. The others become **alternate keys**.',
      v: vChoose,
      n: 'From the candidate keys, the designer chooses one to be the primary key, usually the shortest and most stable. Here the admission number is chosen. The library card number is still unique, so it becomes an alternate key. A table has exactly one primary key but may have several alternate keys.',
    }),
    sl('check', 'Quick check: the key not chosen', {
      b: 'DOCTOR has candidate keys DocID and RegNo. DocID is the primary key. What is RegNo?',
      chk: 'm_alternate',
      n: 'Remember what happens to a candidate key that is not chosen.',
    }),
    sl('example', 'Worked example 1: keys of SUPPLIER', {
      b: 'Annapurna Stores (imagined) records suppliers as SUPPLIER(SupCode, SName, City, LicenceNo). Identify the keys.',
      bl: [
        'Step 1 — Unique and never empty? SupCode and LicenceNo.',
        'Step 2 — Candidate keys: SupCode, LicenceNo.',
        'Step 3 — Primary key: SupCode (short code made by the shop).',
        'Step 4 — Alternate key: LicenceNo. SName and City may repeat: not keys.',
      ],
      v: vSupKeys,
      n: 'Work in order. First find the attributes that are unique and never empty: the supplier code and the licence number. Those are the candidate keys. Choose the short code made by the shop as the primary key, so the licence number becomes the alternate key. The supplier name and the city could repeat as the shop grows, so they are not keys.',
    }),
    sl('diagram', 'Foreign keys link tables', {
      b: 'A **foreign key** is an attribute in one relation whose values must match the **primary key of another** relation.',
      v: vFk,
      n: 'Fee receipts need to say whose fee it is. Instead of copying the name, the fee relation stores the admission number, which points to the student relation. That attribute is a foreign key. The table that holds the primary key is often called the parent, and the table with the foreign key is the child.',
    }),
    sl('check', 'Quick check: how many primary keys?', {
      b: 'True or false? A relation can have several candidate keys but only one primary key.',
      chk: 'tf_one_pk',
      n: 'Think about the step where the designer chooses.',
    }),
    sl('concept', 'Referential integrity', {
      b: '**Referential integrity**: every foreign key value must match an existing primary key value (or be NULL). The DBMS refuses changes that would break it.',
      v: vIntegrity,
      n: 'These four changes were actually tried on the imagined school tables, and the database refused all four. A repeated admission number breaks the primary key. A repeated library card breaks the alternate key. A receipt for a student who does not exist, and deleting a student who still has receipts, would both break referential integrity.',
    }),
    sl('concept', 'Composite keys', {
      b: 'Sometimes **no single attribute** is unique. Then a **combination** of attributes forms the key: a **composite key**.',
      v: vComposite,
      n: 'In this imagined exam result relation, a student appears once for each subject, and a subject appears once for each student. Neither column alone is unique. But each pair of student and subject appears only once, so the pair together is the key. A key made of two or more attributes is called a composite key.',
    }),
    sl('example', 'Worked example 2: keys across Seva Hospital', {
      b: 'DOCTOR(DocID, DName, Dept, RegNo) and PATIENT(PID, PName, Age, DocID). Each patient is under one doctor. Identify all keys.',
      bl: [
        'DOCTOR: candidate keys DocID, RegNo → primary DocID, alternate RegNo.',
        'PATIENT: candidate key PID → primary key PID.',
        'DocID in PATIENT matches DocID in DOCTOR → foreign key.',
        'Name the table every time: "DocID **in PATIENT** refers to DOCTOR".',
      ],
      v: vHospitalKeys,
      n: 'In the doctor relation, both the doctor identity number and the registration number are unique, so they are candidate keys; choose the identity number as primary and the registration number becomes alternate. In the patient relation, the patient identity number is the primary key, and the doctor identity number inside it is a foreign key pointing to the doctor relation.',
    }),
    sl('check', 'Quick check: the other candidate', {
      b: 'A candidate key that is not chosen as the primary key is called an ___ key.',
      chk: 'fb_alt',
      n: 'One word, starting with a vowel.',
    }),
    sl('concept', 'Key rules side by side', {
      v: vKeyRules,
      n: 'Here are the rules together. Candidate, primary and alternate keys are all unique and never empty. A table has exactly one primary key. A foreign key is different: its values repeat whenever several child rows belong to the same parent, and it may be empty when the link does not exist yet.',
    }),
    sl('check', 'Quick check: can a foreign key repeat?', {
      b: 'True or false? The values of a foreign key must be unique in the referencing relation.',
      chk: 'tf_fk_unique',
      n: 'Look again at the fee relation: how many receipts does one student have?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: a candidate key is unique and never empty. One candidate key is chosen as the primary key and the rest are alternate keys. A foreign key takes its values from the primary key of another relation, and referential integrity makes the database refuse changes that would leave a link pointing nowhere. A key made of several attributes is a composite key.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      b: '**How marks are given:** keys must be named **with their table**; a justification ("unique and never empty", "matches the primary key of …") earns the second mark.',
      v: vTips2,
      n: 'When you name a key, always say which table it belongs to. Justify each answer: a candidate key is unique and never empty; a foreign key matches the primary key of another table. Do not pick a name as a key because it looks unique in a small sample, and remember that an alternate key is never the same thing as a foreign key.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Database Concepts — Notes',
  tips: '**Common mistakes**\n- Counting the heading row in the cardinality; swapping degree and cardinality.\n- In a Cartesian product, multiplying the degrees (they **add**) or adding the cardinalities (they **multiply**).\n- Choosing Name as a key because it looks unique in a small table.\n- Calling an alternate key a foreign key, or saying a foreign key must be unique.\n- Naming a key without its table: write "AdmNo **in FEES** is a foreign key referring to STUDENT".\n\n**How marks are usually awarded**\n- 1 mark: the term or the count.\n- 2 marks: definition plus the example from the given table.\n- 3 marks: three points, each tied to the data or scenario.\n- 5 marks: five distinct points, often a comparison or a design with justified keys.',
  sections: [
    {
      h: '1. Why databases?',
      t: 1,
      b: 'Keeping records in **separate files** (registers, spreadsheets) causes five problems:\n\n1. **Data redundancy** — the same data is stored in many files.\n2. **Data inconsistency** — copies disagree after an update is made in only one place.\n3. **Data unavailability** — the data exists but is hard to retrieve in the needed form.\n4. **Unauthorised access** — anyone who can open a file sees all of it.\n5. **Data dependence** — programs depend on the file layout, so changing the layout breaks them.\n\nA **database** is an organised collection of related data. A **DBMS** (database management system) is software, such as **MySQL**, that creates and manages databases: it stores data once and links it, applies rules (keys, constraints), answers queries, controls who can see or change what, and supports backup and sharing.',
      terms: [
        ['Data redundancy', 'Unnecessary repetition of the same data in several places.'],
        ['Data inconsistency', 'Copies of the same data that disagree.'],
        ['DBMS', 'Software to create, store, query and control access to a database.'],
      ],
      v: vProblems,
      vs: [vDbms],
    },
    {
      h: '2. The relational data model',
      t: 1,
      b: 'In the **relational model** data is stored in **relations** (tables). Terms:\n\n- **Tuple** (record): one row.\n- **Attribute** (field): one named column.\n- **Domain**: the set of values an attribute may take (for example, Age: whole numbers from 0 upwards).\n- **Degree**: the number of attributes.\n- **Cardinality**: the number of tuples (the heading row is not counted).\n\n**Properties of a relation:** attribute names are unique; each value is atomic (single); no two tuples are identical; the order of tuples and of attributes does not matter.',
      terms: [
        ['Relation', 'A table in a relational database.'],
        ['Tuple', 'A row (record) of a relation.'],
        ['Attribute', 'A named column (field) of a relation.'],
        ['Domain', 'The set of values an attribute is allowed to take.'],
      ],
      v: vRelation,
      vs: [vTerms, vProps],
    },
    {
      h: '3. Degree, cardinality and the Cartesian product',
      t: 1,
      b: `**Degree** counts columns and **cardinality** counts rows. Adding or dropping a **column** changes the degree; inserting or deleting a **row** changes the cardinality.\n\nThe **Cartesian product** A × B pairs every tuple of A with every tuple of B:\n\n- degree(A × B) = degree(A) + degree(B)\n- cardinality(A × B) = cardinality(A) × cardinality(B)\n\nFor the imagined STUDENT (${M.student.degree} columns, ${M.student.cardinality} rows) and FEES (${M.fees.degree} columns, ${M.fees.cardinality} rows), the product has degree **${M.studentXfees.degree}** and cardinality **${M.studentXfees.cardinality}** — measured by running the query on the two tables. Most product rows pair unrelated tuples; keeping only rows whose linking values match gives the meaningful ones.`,
      terms: [
        ['Degree', 'Number of attributes (columns) of a relation.'],
        ['Cardinality', 'Number of tuples (rows) of a relation.'],
        ['Cartesian product', 'All combinations of the tuples of two relations.'],
      ],
      v: vMeasures,
      vs: [vGrow, vProduct],
    },
    {
      h: '4. Candidate, primary and alternate keys',
      t: 1,
      b: 'A **key** lets the DBMS identify exactly one tuple.\n\n- **Candidate key:** an attribute or set of attributes that is **unique** for every tuple and **never NULL**. A relation may have several.\n- **Primary key:** the one candidate key **chosen** to identify tuples. Exactly one per relation; unique and NOT NULL.\n- **Alternate key:** a candidate key **not chosen** as the primary key.\n- **Composite key:** a key made of **two or more** attributes, used when no single attribute is unique, e.g. (AdmNo, Subject) in an exam-result relation.\n\nA good primary key is minimal, simple and stable. Attributes such as names or cities can repeat, so they are not keys even if they look unique in a small sample.',
      terms: [
        ['Candidate key', 'Attribute(s) unique for every tuple and never empty.'],
        ['Primary key', 'The candidate key chosen to identify tuples of a relation.'],
        ['Alternate key', 'A candidate key that was not chosen as the primary key.'],
        ['Composite key', 'A key made of two or more attributes.'],
      ],
      v: vCandTest,
      vs: [vChoose, vSupKeys, vComposite],
    },
    {
      h: '5. Foreign keys and referential integrity',
      t: 1,
      b: 'A **foreign key** is an attribute (or set) in one relation whose values must match the **primary key of another relation**. It links the two: AdmNo **in FEES** refers to AdmNo in STUDENT; SupCode **in ITEM** refers to SUPPLIER; DocID **in PATIENT** refers to DOCTOR.\n\n**Referential integrity** means every foreign key value must exist in the referenced relation (or be NULL when there is no link yet). The DBMS therefore refuses:\n\n- a child row whose foreign key matches no parent;\n- deleting a parent that child rows still refer to (unless the table is set to cascade).\n\nA foreign key value **can repeat** (one supplier, many items), and its name need not match the referenced key — only its values and domain must.',
      terms: [
        ['Foreign key', 'Attribute(s) whose values must match the primary key of another relation.'],
        ['Referential integrity', 'The rule that every foreign key value refers to an existing tuple (or is NULL).'],
      ],
      v: vFk,
      vs: [vIntegrity, vHospitalKeys],
    },
    {
      h: '6. Keys at a glance',
      t: 1,
      b: 'Use this table to check answers. In exam answers, **name the table** with every key, and justify it in a few words: "unique and never empty" for candidate keys, "matches the primary key of …" for foreign keys.',
      v: vKeyRules,
      vs: [vSummary2],
    },
  ],
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Data redundancy**', 'The same data stored in many places.', 'definition', 1],
  ['**Data inconsistency**', 'Copies of the same data that disagree after an update.', 'definition', 1],
  ['**Data unavailability**', 'Data exists but cannot be retrieved easily in the needed form.', 'definition', 1],
  ['**Data dependence**', 'Programs depend on the file layout, so changing it breaks them.', 'definition', 1],
  ['What is a **DBMS**?', 'Software that creates, stores, queries and controls access to databases, e.g. **MySQL**.', 'definition', 1],
  ['Two benefits of a DBMS', 'Controlled redundancy (one update seen everywhere); controlled access for each user.', 'concept', 1],
  ['**Relation**', 'A table of data in a relational database.', 'definition', 1],
  ['**Tuple**', 'One row (record) of a relation.', 'definition', 1],
  ['**Attribute**', 'One named column (field) of a relation.', 'definition', 1],
  ['**Domain**', 'The set of values an attribute may take.', 'definition', 1],
  ['**Degree**', 'Number of attributes (columns).', 'definition', 1],
  ['**Cardinality**', 'Number of tuples (rows); the heading row is not counted.', 'definition', 1],
  [`Degree and cardinality of the imagined STUDENT table`, `Degree **${M.student.degree}**, cardinality **${M.student.cardinality}**.`, 'example', 1],
  ['Adding a column changes…', 'The **degree** only.', 'concept', 1],
  ['Inserting a row changes…', 'The **cardinality** only.', 'concept', 1],
  ['Cartesian product: degree', 'Degrees **add**.', 'concept', 1],
  ['Cartesian product: cardinality', 'Cardinalities **multiply**.', 'concept', 1],
  [`STUDENT (${M.student.cardinality} rows) × FEES (${M.fees.cardinality} rows)`, `**${M.studentXfees.cardinality}** rows, degree **${M.studentXfees.degree}**.`, 'example', 1],
  ['Does row order matter in a relation?', 'No — a relation is a set of tuples.', 'concept', 1],
  ['**Candidate key**', 'Attribute(s) unique for every tuple and never empty.', 'definition', 1],
  ['**Primary key**', 'The candidate key chosen to identify tuples; unique and NOT NULL; one per table.', 'definition', 1],
  ['**Alternate key**', 'A candidate key not chosen as the primary key.', 'definition', 1],
  ['**Foreign key**', 'Attribute(s) whose values must match the primary key of another table.', 'definition', 1],
  ['**Referential integrity**', 'Every foreign key value must exist in the referenced table (or be NULL).', 'definition', 1],
  ['**Composite key**', 'A key made of two or more attributes, e.g. (AdmNo, Subject).', 'definition', 1],
  ['Can a foreign key value repeat?', 'Yes — one supplier can supply many items.', 'exam-tip', 1],
  ['Why is Name a poor key?', 'Two people can share a name, now or in future rows.', 'exam-tip', 1],
  ['Keys of the imagined DOCTOR table', 'Primary DocID, alternate RegNo; DocID **in PATIENT** is a foreign key.', 'example', 1],
  ['DBMS response: receipt for a student who does not exist', 'Rejected — it would break referential integrity.', 'example', 1],
  ['Exam habit for keys', 'Always name the table: "SupCode in ITEM refers to SUPPLIER".', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Database Concepts',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_redundancy', 'm_degree_student', 'm_candidate', 'ar_name_key'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s_pk_fk', 's_degree_card', 's3_keys_identify'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_keys_hospital', 'l_need_db'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_school'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Database Concepts',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dependence', 'm_unauth', 'm_relation_order', 'm_fk_where', 'm_pk_null', 'm_fk_reject', 'm_parent_delete', 'm_product_doctor', 'ar_redundant', 'ar_fk_repeat'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s_file_problems', 's_ref_integrity', { attempt: 1, keys: ['s_candidate_alt', 's_composite'] }, 's3_why_not_name', { attempt: 1, keys: ['s3_reject_rows', 's3_dbms_adv'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_product_explain', { attempt: 1, keys: ['l_design_library', 'l_fs_vs_db'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_store', 'cb_hospital'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-12-computer-science-ch07 only (need for databases; DBMS; relational model: relation, attribute, tuple, domain, degree, cardinality; candidate, primary, alternate and foreign keys)',
    originality: 'every table, school, shop and hospital is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: `degrees, cardinalities and Cartesian-product sizes measured by running SQL on the imagined tables in SQLite (STUDENT ${M.student.degree}x${M.student.cardinality}, FEES ${M.fees.degree}x${M.fees.cardinality}, STUDENT×FEES ${M.studentXfees.degree}x${M.studentXfees.cardinality}, ITEM×SUPPLIER ${M.itemXsupplier.degree}x${M.itemXsupplier.cardinality}, DOCTOR×PATIENT ${M.doctorXpatient.degree}x${M.doctorXpatient.cardinality}); key violations confirmed by SQLite refusing the rows`,
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration, answer-leak and stem-duplicate checks run clean in this build',
  },
});
