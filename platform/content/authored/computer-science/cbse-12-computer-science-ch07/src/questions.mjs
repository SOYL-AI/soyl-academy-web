// CBSE 12 Computer Science, ch07 Database Concepts — question bank. Every table, school, shop and hospital is
// imagined and written by SOYL; no NCERT example or exercise and no board/sample-paper item is reused (D-036).
// Degrees, cardinalities and Cartesian-product sizes are computed by running SQL on the same tables in SQLite
// (runSql in lib.mjs), and key violations are confirmed by letting SQLite refuse the row (pyErr).
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child, runSql, pyErr } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [100, 150];

// ---------------------------------------------------------------- imagined tables (one source for SQL and Markdown)
export const T = {
  STUDENT: {
    ddl: 'CREATE TABLE STUDENT (AdmNo INTEGER PRIMARY KEY, Name TEXT NOT NULL, Class TEXT, LibCard TEXT UNIQUE NOT NULL);',
    cols: ['AdmNo', 'Name', 'Class', 'LibCard'],
    rows: [
      [2201, 'Ishita Rao', '12A', 'LC-118'],
      [2202, 'Kabir Das', '12A', 'LC-131'],
      [2203, 'Meera Iyer', '12B', 'LC-107'],
      [2204, 'Kabir Das', '12B', 'LC-142'],
      [2205, 'Tanvi Shah', '12C', 'LC-125'],
    ],
  },
  FEES: {
    ddl: 'CREATE TABLE FEES (ReceiptNo TEXT PRIMARY KEY, AdmNo INTEGER REFERENCES STUDENT(AdmNo), Month TEXT, Amount INTEGER);',
    cols: ['ReceiptNo', 'AdmNo', 'Month', 'Amount'],
    rows: [
      ['R501', 2201, 'April', 4500],
      ['R502', 2203, 'April', 4500],
      ['R503', 2201, 'May', 4500],
      ['R504', 2204, 'April', 4200],
    ],
  },
  SUPPLIER: {
    ddl: 'CREATE TABLE SUPPLIER (SupCode TEXT PRIMARY KEY, SName TEXT, City TEXT, LicenceNo TEXT UNIQUE NOT NULL);',
    cols: ['SupCode', 'SName', 'City', 'LicenceNo'],
    rows: [
      ['S1', 'Kaveri Foods', 'Mysuru', 'FL-2207'],
      ['S2', 'Tapti Traders', 'Surat', 'FL-3118'],
      ['S3', 'Ganga Agro', 'Patna', 'FL-1442'],
    ],
  },
  ITEM: {
    ddl: 'CREATE TABLE ITEM (ItemCode TEXT PRIMARY KEY, IName TEXT, Price INTEGER, Qty INTEGER, SupCode TEXT REFERENCES SUPPLIER(SupCode));',
    cols: ['ItemCode', 'IName', 'Price', 'Qty', 'SupCode'],
    rows: [
      ['I01', 'Rice 5 kg', 320, 40, 'S1'],
      ['I02', 'Tea 250 g', 145, 25, 'S2'],
      ['I03', 'Jaggery 1 kg', 90, 60, 'S1'],
      ['I04', 'Lentils 1 kg', 135, 35, 'S3'],
      ['I05', 'Salt 1 kg', 28, 80, 'S2'],
      ['I06', 'Ragi flour 1 kg', 75, 30, 'S1'],
    ],
  },
  DOCTOR: {
    ddl: 'CREATE TABLE DOCTOR (DocID TEXT PRIMARY KEY, DName TEXT, Dept TEXT, RegNo TEXT UNIQUE NOT NULL);',
    cols: ['DocID', 'DName', 'Dept', 'RegNo'],
    rows: [
      ['D1', 'Dr Anjali Menon', 'Cardiology', 'REG-4471'],
      ['D2', 'Dr Farhan Qureshi', 'Orthopaedics', 'REG-3902'],
      ['D3', 'Dr Lata Joshi', 'Paediatrics', 'REG-5136'],
    ],
  },
  PATIENT: {
    ddl: 'CREATE TABLE PATIENT (PID TEXT PRIMARY KEY, PName TEXT, Age INTEGER, DocID TEXT REFERENCES DOCTOR(DocID));',
    cols: ['PID', 'PName', 'Age', 'DocID'],
    rows: [
      ['P101', 'Ramesh Gowda', 58, 'D1'],
      ['P102', 'Sana Mirza', 9, 'D3'],
      ['P103', 'Joseph Kurian', 41, 'D2'],
      ['P104', 'Pooja Nair', 7, 'D3'],
      ['P105', 'Harjit Singh', 63, 'D1'],
    ],
  },
  BOOK: {
    ddl: 'CREATE TABLE BOOK (BookID TEXT PRIMARY KEY, Title TEXT, AccNo INTEGER UNIQUE NOT NULL, Copies INTEGER);',
    cols: ['BookID', 'Title', 'AccNo', 'Copies'],
    rows: [
      ['B11', 'Monsoon Diaries', 7041, 3],
      ['B12', 'The Clockmaker', 7042, 1],
      ['B13', 'Stars over Leh', 7043, 2],
    ],
  },
};
const lit = (v) => (typeof v === 'number' ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
const inserts = (name) => T[name].rows.map((r) => `INSERT INTO ${name} VALUES (${r.map(lit).join(', ')});`).join('\n');
/** CREATE + INSERT script for the named tables (foreign keys enforced). */
export const schema = (...names) => ['PRAGMA foreign_keys = ON;', ...names.flatMap((n) => [T[n].ddl, inserts(n)])].join('\n');
/** Markdown table of an imagined relation. */
export const mdTable = (name) => `**${name}**\n\n| ${T[name].cols.join(' | ')} |\n|${T[name].cols.map(() => '---').join('|')}|\n${T[name].rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
/** Degree and cardinality of a SELECT, measured by running it. */
export function shape(names, query) {
  const r = runSql(schema(...names), query);
  return { degree: r.cols.length, cardinality: r.rows.length, cols: r.cols, rows: r.rows };
}
const fence = (sql) => '```sql\n' + sql + '\n```';

// Measured facts used below and in build.mjs.
export const M = {
  student: shape(['STUDENT'], 'SELECT * FROM STUDENT'),
  fees: shape(['STUDENT', 'FEES'], 'SELECT * FROM FEES'),
  item: shape(['SUPPLIER', 'ITEM'], 'SELECT * FROM ITEM'),
  supplier: shape(['SUPPLIER'], 'SELECT * FROM SUPPLIER'),
  doctor: shape(['DOCTOR'], 'SELECT * FROM DOCTOR'),
  patient: shape(['DOCTOR', 'PATIENT'], 'SELECT * FROM PATIENT'),
  book: shape(['BOOK'], 'SELECT * FROM BOOK'),
  studentXfees: shape(['STUDENT', 'FEES'], 'SELECT * FROM STUDENT, FEES'),
  itemXsupplier: shape(['SUPPLIER', 'ITEM'], 'SELECT * FROM ITEM, SUPPLIER'),
  doctorXpatient: shape(['DOCTOR', 'PATIENT'], 'SELECT * FROM DOCTOR, PATIENT'),
};
// ITEM after adding a column and two rows: the changes go into the setup script, the SELECT measures the result.
{
  const grown = runSql(
    schema('SUPPLIER', 'ITEM') + "\nALTER TABLE ITEM ADD COLUMN Shelf TEXT;\nINSERT INTO ITEM VALUES ('I07', 'Poha 500 g', 48, 50, 'S3', NULL);\nINSERT INTO ITEM VALUES ('I08', 'Honey 250 g', 160, 12, 'S2', NULL);",
    'SELECT * FROM ITEM',
  );
  M.itemGrown = { degree: grown.cols.length, cardinality: grown.rows.length };
}
assert.deepEqual([M.student.degree, M.student.cardinality], [4, 5]);
assert.deepEqual([M.fees.degree, M.fees.cardinality], [4, 4]);
assert.deepEqual([M.item.degree, M.item.cardinality], [5, 6]);
assert.deepEqual([M.studentXfees.degree, M.studentXfees.cardinality], [8, 20]);
assert.deepEqual([M.itemXsupplier.degree, M.itemXsupplier.cardinality], [9, 18]);
assert.deepEqual([M.doctorXpatient.degree, M.doctorXpatient.cardinality], [8, 15]);
assert.deepEqual([M.itemGrown.degree, M.itemGrown.cardinality], [6, 8]);
// Name is not a key: two students share it.
assert.equal(shape(['STUDENT'], "SELECT * FROM STUDENT WHERE Name = 'Kabir Das'").cardinality, 2);
// Class is not a key either.
assert.equal(shape(['STUDENT'], "SELECT * FROM STUDENT WHERE Class = '12A'").cardinality, 2);

// Key violations, confirmed by SQLite refusing the row.
const errOf = (names, stmt) => pyErr(`import sqlite3\ncon = sqlite3.connect(':memory:')\ncon.executescript(${JSON.stringify(schema(...names))})\ncon.execute(${JSON.stringify(stmt)})`);
export const E = {
  dupPk: errOf(['STUDENT'], "INSERT INTO STUDENT VALUES (2203, 'Neel Bose', '12C', 'LC-150')"),
  dupAk: errOf(['STUDENT'], "INSERT INTO STUDENT VALUES (2206, 'Neel Bose', '12C', 'LC-107')"),
  badFk: errOf(['STUDENT', 'FEES'], "INSERT INTO FEES VALUES ('R505', 2209, 'May', 4500)"),
  delParent: errOf(['STUDENT', 'FEES'], 'DELETE FROM STUDENT WHERE AdmNo = 2201'),
  nullAk: errOf(['SUPPLIER'], "INSERT INTO SUPPLIER VALUES ('S4', 'Narmada Mills', 'Indore', NULL)"),
};
assert.match(E.dupPk, /IntegrityError: UNIQUE constraint failed: STUDENT\.AdmNo/);
assert.match(E.dupAk, /IntegrityError: UNIQUE constraint failed: STUDENT\.LibCard/);
assert.match(E.badFk, /IntegrityError: FOREIGN KEY constraint failed/);
assert.match(E.delParent, /IntegrityError: FOREIGN KEY constraint failed/);
assert.match(E.nullAk, /IntegrityError: NOT NULL constraint failed: SUPPLIER\.LicenceNo/);

// ================================================================ need for databases, DBMS
Q('m_redundancy', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'A school keeps a student\'s address in the admission file, the fee file and the transport file. What is this repetition of the same data called?',
  opts: ['Data redundancy', 'Data integrity', 'Data independence', 'Data security'],
  sol: 'Storing the same data in several files is redundancy. Integrity, independence and security are things a DBMS provides, not names for repetition.',
}));
Q('m_inconsistency', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Kabir\'s phone number was changed in the office file of Nilgiri Vidyalaya (imagined) but not in the bus-route file, so the two files now disagree. Which file-system problem does this show?',
  opts: ['Data inconsistency', 'Data unavailability', 'Unauthorised access', 'Controlled redundancy'],
  sol: 'Two copies of the same fact that disagree is inconsistency, which follows from uncontrolled redundancy. Nothing here is missing or seen by the wrong person.',
}));
Q('m_dependence', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In a shop that keeps stock in files, adding one new field to the stock file means every program that reads the file must be rewritten. Which limitation of file systems is this?',
  opts: ['Data dependence', 'Data redundancy', 'Data inconsistency', 'Data unavailability'],
  sol: 'When programs depend on the exact layout of a file, changing the layout breaks them: data dependence. A DBMS separates data from programs.',
}));
Q('m_unauth', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At an imagined clinic, any receptionist who can open the patient-record spreadsheet can also read every diagnosis. Which file-system problem does a DBMS remove here?',
  opts: ['Unauthorised access to data', 'Data redundancy', 'Data dependence', 'Too many tuples'],
  sol: 'A DBMS can give each user only the data they are allowed to see; a plain file is all-or-nothing.',
}));
Q('m_dbms_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement best describes a database management system (DBMS)?',
  opts: [
    'Software to create, store, update and query a database while controlling who can use it',
    'A single table that holds every record of an organisation',
    'A spreadsheet formula that adds a column of numbers',
    'A storage device such as a hard disk',
  ],
  sol: 'A DBMS is the software (for example MySQL) that manages the database. A table is part of a database; a disk is hardware.',
}));
Q('m_dbms_example', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of these is an example of a relational DBMS used in the CBSE syllabus?',
  opts: ['MySQL', 'Python', 'HTML', 'Notepad'],
  sol: 'MySQL is a relational DBMS. Python is a programming language, HTML a markup language and Notepad a text editor.',
}));
Q('tf_dbms_redundancy', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A DBMS removes every repeated value from a database, so a foreign key value may never appear in two tables.',
  sol: 'A DBMS controls redundancy; it does not remove all repetition. A foreign key value is deliberately repeated in the referencing table to link the two tables.',
}));
Q('s_file_problems', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A coaching centre (imagined) keeps student details in separate spreadsheets for fees, attendance and tests. State two problems it is likely to face.',
  model: '1. **Redundancy:** the same name and phone number are typed in all three sheets, wasting space and effort.\n2. **Inconsistency:** if a phone number is changed in one sheet only, the sheets disagree about the student.',
  sol: 'Any two of redundancy, inconsistency, unavailability, unauthorised access and data dependence, each linked to the centre.',
  scheme: [['First problem explained', 1], ['Second problem explained', 1]],
}));
Q('s3_dbms_adv', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three advantages of moving the records of a small hospital from paper registers and separate files to a DBMS.',
  model: '1. **Less redundancy and inconsistency:** each patient\'s details are stored once and linked by keys, so a change is made in one place.\n2. **Controlled access:** a receptionist can see appointments while only doctors see diagnoses.\n3. **Easy retrieval and sharing:** queries find, for example, all patients of one doctor at once, and many users can work on the data together.',
  sol: 'Three distinct advantages, each tied to the hospital.',
  scheme: [['First advantage', 1], ['Second advantage', 1], ['Third advantage', 1]],
}));
Q('ar_redundant', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Uncontrolled redundancy in file systems often leads to data inconsistency.',
  r: 'When the same data is stored in several places, an update made in one place may be missed in another.',
  sol: 'Both are true and R explains A: copies that are updated separately drift apart, which is inconsistency.',
}));
Q('fb_dbms', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Software that is used to create and manage databases is called a ___ (write the four-letter short form).',
  acc: [['DBMS']],
  sol: 'A Database Management System (DBMS), for example MySQL.',
}));

// ================================================================ relational model terms
Q('m_tuple', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the relational model, what is one row of a relation called?',
  opts: ['A tuple', 'An attribute', 'A domain', 'A degree'],
  sol: 'A row is a tuple (a record). A column is an attribute; a domain is the set of allowed values; degree is the number of attributes.',
}));
Q('m_attribute', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the relational model, each named column of a relation is called',
  opts: ['an attribute', 'a tuple', 'a cardinality', 'a key violation'],
  sol: 'Columns are attributes (fields). Rows are tuples, and cardinality is the count of rows.',
}));
Q('m_domain', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the imagined STUDENT relation of Nilgiri Vidyalaya, the Class attribute may only hold values such as 12A, 12B and 12C. This set of allowed values is the attribute\'s',
  opts: ['domain', 'degree', 'cardinality', 'primary key'],
  sol: 'The pool of values an attribute may take is its domain.',
}));
Q('m_degree_student', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Look at the imagined relation below. What are its degree and cardinality?\n\n${mdTable('STUDENT')}`,
  opts: [`Degree ${M.student.degree}, cardinality ${M.student.cardinality}`, `Degree ${M.student.cardinality}, cardinality ${M.student.degree}`, `Degree ${M.student.degree}, cardinality ${M.student.cardinality + 1}`, `Degree ${M.student.degree * M.student.cardinality}, cardinality 1`],
  sol: `Degree counts attributes (columns): ${M.student.degree}. Cardinality counts tuples (rows, not the heading): ${M.student.cardinality}.`,
}));
Q('m_relation_order', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Two printouts of the imagined SUPPLIER relation list the same three tuples, but in a different order. What can you conclude?',
  opts: [
    'They show the same relation, because the order of tuples in a relation does not matter',
    'They are different relations, because the first tuple differs',
    'One printout must contain a key violation',
    'The degree of the two relations is different',
  ],
  sol: 'A relation is a set of tuples, so the order of rows carries no meaning. The degree and the tuples are the same.',
}));
Q('tf_duplicate_tuple', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In a relation with a primary key, no two tuples can be exactly identical.',
  sol: 'The primary key value is unique for every tuple, so two tuples can never match in all attributes.',
}));
Q('tf_degree_rows', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The degree of a relation is the number of rows it contains.',
  sol: 'Degree is the number of attributes (columns); the number of rows is the cardinality.',
}));
Q('fb_cardinality', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The number of tuples in a relation is called its ___.',
  acc: [['cardinality']],
  sol: 'Cardinality = number of tuples (rows).',
}));
Q('mt_terms', match({
  t: 1, d: 1, c: 'recall',
  stem: 'Match each relational-model term with what it means in the imagined ITEM table of Annapurna Stores.',
  pairs: [
    ['Tuple', 'The full record of Tea 250 g'],
    ['Attribute', 'The Price column'],
    ['Degree', 'The number of columns in ITEM'],
    ['Cardinality', 'The number of items listed in ITEM'],
  ],
  sol: 'A row is a tuple, a column an attribute, the column count the degree and the row count the cardinality.',
}));
Q('n_degree_item', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: M.item.degree, unit: null,
  stem: `What is the degree of the imagined ITEM relation below?\n\n${mdTable('ITEM')}`,
  sol: `Count the attributes: ItemCode, IName, Price, Qty, SupCode. Degree = ${M.item.degree}.`,
}));
Q('n_card_patient', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: M.patient.cardinality, unit: null,
  stem: `What is the cardinality of the imagined PATIENT relation of Seva Hospital?\n\n${mdTable('PATIENT')}`,
  sol: `Count the tuples (rows below the heading): P101 to P105, so cardinality = ${M.patient.cardinality}.`,
}));
Q('n_item_grown', num({
  t: 1, d: 3, c: 'application', marks: 1, value: M.itemGrown.cardinality, unit: null,
  stem: `The imagined ITEM relation of Annapurna Stores has degree ${M.item.degree} and cardinality ${M.item.cardinality}. The owner adds a column Shelf and then inserts two new items. What is the new cardinality of ITEM?`,
  sol: `Adding a column changes only the degree (to ${M.itemGrown.degree}). Two new rows raise the cardinality: ${M.item.cardinality} + 2 = ${M.itemGrown.cardinality}.`,
}));
Q('n_product_card', num({
  t: 1, d: 3, c: 'application', marks: 1, value: M.studentXfees.cardinality, unit: null,
  stem: `The imagined STUDENT relation has ${M.student.cardinality} tuples and FEES has ${M.fees.cardinality} tuples. How many tuples are there in their Cartesian product STUDENT × FEES?`,
  sol: `In a Cartesian product every tuple of one relation is paired with every tuple of the other: ${M.student.cardinality} × ${M.fees.cardinality} = ${M.studentXfees.cardinality}.`,
}));
Q('n_product_degree', num({
  t: 1, d: 3, c: 'understanding', marks: 1, value: M.itemXsupplier.degree, unit: null,
  stem: `The imagined ITEM relation has degree ${M.item.degree} and SUPPLIER has degree ${M.supplier.degree}. What is the degree of the Cartesian product ITEM × SUPPLIER?`,
  sol: `Degrees add in a Cartesian product: ${M.item.degree} + ${M.supplier.degree} = ${M.itemXsupplier.degree}.`,
}));
Q('m_product_doctor', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Seva Hospital's imagined DOCTOR relation has degree ${M.doctor.degree} and cardinality ${M.doctor.cardinality}; PATIENT has degree ${M.patient.degree} and cardinality ${M.patient.cardinality}. What are the degree and cardinality of DOCTOR × PATIENT?`,
  opts: [
    `Degree ${M.doctorXpatient.degree}, cardinality ${M.doctorXpatient.cardinality}`,
    `Degree ${M.doctor.degree * M.patient.degree}, cardinality ${M.doctor.cardinality + M.patient.cardinality}`,
    `Degree ${M.doctorXpatient.degree}, cardinality ${M.doctor.cardinality + M.patient.cardinality}`,
    `Degree ${M.doctor.degree}, cardinality ${M.doctorXpatient.cardinality}`,
  ],
  sol: `Degrees add (${M.doctor.degree} + ${M.patient.degree} = ${M.doctorXpatient.degree}) and cardinalities multiply (${M.doctor.cardinality} × ${M.patient.cardinality} = ${M.doctorXpatient.cardinality}).`,
}));
Q('ar_product', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'If relation A has 3 tuples and relation B has 4 tuples, the Cartesian product A × B has 12 tuples.',
  r: 'The Cartesian product pairs every tuple of A with every tuple of B.',
  sol: 'Both are true and R explains A: 3 tuples, each paired with 4, give 3 × 4 = 12.',
}));
Q('s_degree_card', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between the degree and the cardinality of a relation, using the imagined BOOK relation of a school library (BookID, Title, AccNo, Copies, with three books) as the example.',
  model: `**Degree** is the number of **attributes** (columns). BOOK has ${M.book.degree} attributes, so its degree is ${M.book.degree}.\n**Cardinality** is the number of **tuples** (rows). BOOK lists ${M.book.cardinality} books, so its cardinality is ${M.book.cardinality}.`,
  sol: 'Define each and apply it to BOOK.',
  scheme: [['Degree defined with value', 1], ['Cardinality defined with value', 1]],
}));
Q('s_domain_eg', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the domain of an attribute? State a suitable domain for the Age attribute of the imagined PATIENT relation of Seva Hospital.',
  model: 'The **domain** of an attribute is the **set of values it is allowed to take**. For Age in PATIENT a suitable domain is **whole numbers from 0 to about 120**, so a negative age or a name could not be stored there.',
  sol: 'Meaning of domain, then a sensible set of values for Age.',
  scheme: [['Meaning of domain', 1], ['Suitable domain for Age', 1]],
}));
Q('s3_terms_table', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Using the imagined DOCTOR relation below, identify (i) one tuple, (ii) one attribute and its domain, and (iii) the degree and cardinality.\n\n${mdTable('DOCTOR')}`,
  model: `(i) **Tuple:** (D2, Dr Farhan Qureshi, Orthopaedics, REG-3902) is one tuple, the complete record of one doctor.
(ii) **Attribute:** Dept is one attribute (column). Its **domain** is the set of department names the hospital uses, such as Cardiology, Orthopaedics or Paediatrics, so a value like 45 could not be stored there.
(iii) **Degree** = ${M.doctor.degree}, because there are ${M.doctor.degree} columns; **cardinality** = ${M.doctor.cardinality}, because there are ${M.doctor.cardinality} rows of doctors (the heading row is not counted).`,
  sol: 'One correct item for each of the three parts.',
  scheme: [['A tuple', 1], ['An attribute with a sensible domain', 1], ['Degree and cardinality', 1]],
}));

// ================================================================ keys
Q('m_candidate', mcq({
  t: 1, d: 2, c: 'application',
  stem: `In the imagined STUDENT relation below, which attributes can each identify a tuple uniquely, that is, which are the candidate keys?\n\n${mdTable('STUDENT')}`,
  opts: ['AdmNo and LibCard', 'AdmNo and Name', 'Name and Class', 'Class and LibCard'],
  sol: 'AdmNo and LibCard are unique for every student. Name repeats (two students are called Kabir Das) and Class repeats (12A appears twice).',
}));
Q('m_alternate', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined DOCTOR relation has candidate keys DocID and RegNo. If DocID is chosen as the primary key, what is RegNo called?',
  opts: ['An alternate key', 'A foreign key', 'A composite attribute', 'A domain'],
  sol: 'A candidate key that is not chosen as the primary key is an alternate key.',
}));
Q('m_fk_where', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In the imagined Annapurna Stores database, ITEM has an attribute SupCode whose values must appear as SupCode in SUPPLIER. Which statement is correct?',
  opts: [
    'SupCode is a foreign key in ITEM that references the primary key of SUPPLIER',
    'SupCode is the primary key of ITEM',
    'SupCode is an alternate key of SUPPLIER',
    'SupCode must be unique in ITEM',
  ],
  sol: 'An attribute of one table whose values come from the primary key of another table is a foreign key. In ITEM, S1 appears for several items, so it is not unique there and cannot be ITEM\'s key.',
}));
Q('m_pk_null', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these is true of a primary key?',
  opts: ['Its value is unique for every tuple and can never be NULL', 'It may repeat but can never be NULL', 'It may be NULL if the value is unknown', 'It must always be the first column'],
  sol: 'A primary key identifies each tuple, so it must be unique and NOT NULL. Its position in the table does not matter.',
}));
Q('m_fk_null', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In an imagined hostel database, ROOM_ALLOT has a foreign key RoomNo referring to ROOM. A newly admitted student has not yet been given a room. Which value of RoomNo in her ROOM_ALLOT tuple keeps referential integrity?',
  opts: ['NULL, because a foreign key may be empty when no reference exists yet', 'Any room number, even one that is not in ROOM', 'Her own admission number', 'Zero, which every foreign key accepts'],
  sol: 'A foreign key must either match a primary key value of the referenced table or be NULL (if the column allows it). A made-up room number or 0 would point to a room that does not exist.',
}));
Q('m_composite', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'An imagined EXAM_RESULT relation has the attributes AdmNo, Subject and Marks. One student has many subjects, and one subject has many students. Which is the most suitable primary key?',
  opts: ['The combination (AdmNo, Subject)', 'AdmNo alone', 'Subject alone', 'Marks'],
  sol: 'AdmNo repeats for each subject and Subject repeats for each student, but each pair occurs once. A key made of more than one attribute is a composite key.',
}));
Q('m_dup_pk_reject', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A clerk at Nilgiri Vidyalaya (imagined) tries to add a new student with AdmNo 2203, but AdmNo 2203 already belongs to Meera Iyer. AdmNo is the primary key. What will the DBMS do?',
  opts: ['Reject the new tuple, because a primary key value cannot repeat', 'Accept it and give it AdmNo 2206 automatically', 'Overwrite Meera Iyer\'s record', 'Accept it, because the names are different'],
  sol: `The DBMS refuses a duplicate primary key value. (Run on the same table in SQLite, the insert fails with: ${E.dupPk.replace(/^sqlite3\./, '')}.) It never renumbers or overwrites rows on its own.`,
}));
Q('m_fk_reject', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined FEES relation has AdmNo as a foreign key referencing STUDENT. A clerk enters a receipt for AdmNo 2209, but no student has that number. What happens?',
  opts: ['The DBMS rejects the receipt, because it would break referential integrity', 'The DBMS adds student 2209 to STUDENT automatically', 'The receipt is stored and the student is added later', 'The DBMS deletes all receipts of 2209'],
  sol: `A foreign key value must exist in the referenced table. (In SQLite with foreign keys switched on, the insert fails with: ${E.badFk.replace(/^sqlite3\./, '')}.)`,
}));
Q('m_parent_delete', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Student 2201 has two receipts in the imagined FEES relation. With referential integrity enforced (and no cascading rule), the office tries to delete student 2201 from STUDENT. What happens?',
  opts: ['The deletion is refused, because FEES tuples still refer to 2201', 'Student 2201 is deleted and the receipts keep pointing to 2201', 'Both receipts are deleted silently', 'AdmNo in FEES is changed to NULL silently'],
  sol: `Deleting a referenced tuple would leave orphan receipts, so it is refused. (SQLite reports: ${E.delParent.replace(/^sqlite3\./, '')}.) Cascading deletes or setting NULL happen only if the table is defined that way.`,
}));
Q('ar_alt_unique', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'An alternate key of a relation can uniquely identify each tuple.',
  r: 'Every relation must have at least one foreign key.',
  sol: 'A is true: an alternate key is a candidate key, so it is unique for every tuple. R is false: a relation that is not linked to any other table (such as BOOK on its own) has no foreign key.',
}));
Q('ar_fk_repeat', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A foreign key value may appear in many tuples of the referencing relation.',
  r: 'Many tuples of the referencing relation can be linked to the same tuple of the referenced relation.',
  sol: 'Both are true and R explains A: supplier S1 supplies several items, so S1 appears in several ITEM tuples.',
}));
Q('ar_name_key', ar({
  t: 1, d: 2, c: 'analysis', key: 'd',
  a: 'In the imagined STUDENT relation, Name is a good choice of primary key.',
  r: 'Two students in a school can have the same name.',
  sol: 'A is false: names can repeat (two students are called Kabir Das), so Name cannot be a key. R is true, and it is the reason A is false.',
}));
Q('tf_one_pk', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A relation can have several candidate keys but only one primary key.',
  sol: 'Any number of attributes (or combinations) may qualify as candidate keys; exactly one of them is chosen as the primary key and the others become alternate keys.',
}));
Q('fb_alt', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A candidate key that is not chosen as the primary key is called an ___ key.',
  acc: [['alternate', 'alternative']],
  sol: 'It is an alternate key.',
}));
Q('mt_keys', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each attribute of the imagined Seva Hospital database with the kind of key it is (DocID is the primary key of DOCTOR; PID of PATIENT).',
  pairs: [
    ['DocID in DOCTOR', 'Primary key'],
    ['RegNo in DOCTOR', 'Alternate key'],
    ['DocID in PATIENT', 'Foreign key'],
    ['PID in PATIENT', 'Primary key of the referencing table'],
  ],
  sol: 'DocID identifies doctors (primary key); RegNo is the other candidate (alternate key); DocID inside PATIENT points to DOCTOR (foreign key); PID identifies patients.',
}));
Q('ord_design', ord({
  t: 1, d: 3, c: 'application', marks: 1,
  stem: 'Arrange the steps a student follows to choose keys for a new relation, in the correct order.',
  items: [
    'List the attributes and the data they will hold',
    'Find every attribute (or combination) that is unique and never empty: the candidate keys',
    'Choose one candidate key as the primary key',
    'Call the remaining candidate keys alternate keys and add foreign keys to link related tables',
  ],
  sol: 'Candidate keys can only be found once the attributes are known; the primary key is picked from them; what is left are alternate keys, and links to other tables come through foreign keys.',
}));
Q('s_pk_fk', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Differentiate between a primary key and a foreign key, with one example of each from the imagined STUDENT and FEES relations of Nilgiri Vidyalaya.',
  model: '**Primary key:** an attribute that **uniquely identifies each tuple** of its own relation and cannot be NULL, e.g. **AdmNo in STUDENT**.\n**Foreign key:** an attribute whose values **must match the primary key of another relation**, linking the two, e.g. **AdmNo in FEES**, which refers to STUDENT.',
  sol: 'Define both and give the two examples.',
  scheme: [['Primary key with example', 1], ['Foreign key with example', 1]],
}));
Q('s_candidate_alt', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined SUPPLIER relation of Annapurna Stores has the attributes SupCode, SName, City and LicenceNo. Name its candidate keys and, choosing one as the primary key, name the alternate key.',
  model: '**Candidate keys:** SupCode and LicenceNo (each is unique for a supplier and never empty).\n**Primary key:** SupCode, so **LicenceNo** is the **alternate key**. SName and City can repeat, so they are not keys.',
  sol: 'Both candidate keys, a primary key and the matching alternate key.',
  scheme: [['Candidate keys', 1], ['Primary and alternate key', 1]],
}));
Q('s_ref_integrity', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'What is referential integrity? Explain it using the DocID attribute shared by the imagined DOCTOR and PATIENT relations.',
  model: '**Referential integrity** means every foreign key value must **match an existing primary key value** in the referenced relation (or be NULL). Every DocID stored in PATIENT must be a DocID that exists in DOCTOR, so no patient is assigned to a doctor who is not on the hospital\'s list.',
  sol: 'Meaning plus the DOCTOR–PATIENT illustration.',
  scheme: [['Meaning of referential integrity', 1], ['Correct illustration', 1]],
}));
Q('s3_keys_identify', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For the imagined relations below, identify (i) the candidate keys of SUPPLIER, (ii) the primary and alternate key you would choose, and (iii) the foreign key, saying which table it is in and what it refers to.\n\n${mdTable('SUPPLIER')}\n\n${mdTable('ITEM')}`,
  model: `(i) **Candidate keys of SUPPLIER:** SupCode and LicenceNo, because each is different for every supplier and is never left empty. SName and City could repeat as more suppliers are added.
(ii) **Primary key:** SupCode, a short code the shop itself controls; **alternate key:** LicenceNo, the candidate key not chosen.
(iii) **Foreign key:** SupCode **in ITEM**, which refers to SupCode, the primary key of **SUPPLIER**; its values S1, S2 and S3 all exist in SUPPLIER.`,
  sol: 'One mark for each part.',
  scheme: [['Candidate keys', 1], ['Primary and alternate key', 1], ['Foreign key with its table and reference', 1]],
}));
Q('s3_why_not_name', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `A student suggests making Name the primary key of the imagined STUDENT relation below, "because every student has a name". Evaluate the suggestion and propose a better key.\n\n${mdTable('STUDENT')}`,
  model: '1. Having a value is not enough: a primary key must be **unique**. Name is **not unique** here: two students are called **Kabir Das** (2202 and 2204).\n2. Names can also change or be spelt differently, which would break links from other tables.\n3. **AdmNo** is unique, never empty and stable, so it is the better primary key (LibCard could be the alternate key).',
  sol: 'Reject Name with evidence from the table, give a second reason, and propose AdmNo.',
  scheme: [['Uniqueness test fails, with evidence', 1], ['Another reason', 1], ['Better key proposed with reason', 1]],
}));
Q('s3_reject_rows', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'With AdmNo as the primary key of the imagined STUDENT relation, LibCard declared unique, and FEES.AdmNo a foreign key referring to STUDENT, say whether the DBMS accepts or rejects each change, and why.\n\n(i) Add student 2206, Neel Bose, 12C, LC-107.\n(ii) Add receipt R505 for AdmNo 2209.\n(iii) Add receipt R506 for AdmNo 2205.',
  model: '(i) **Rejected:** LC-107 already belongs to Meera Iyer, and LibCard must be unique (it is an alternate key).\n(ii) **Rejected:** no student 2209 exists, so the foreign key would break referential integrity.\n(iii) **Accepted:** student 2205 exists, and R506 is a new receipt number.',
  sol: 'Each verdict with the rule behind it; checked by running the same inserts in SQLite.',
  scheme: [['(i) with reason', 1], ['(ii) with reason', 1], ['(iii) with reason', 1]],
}));
assert.match(E.dupAk, /LibCard/);

// ================================================================ long answers
Q('l_need_db', long({
  t: 1, d: 3, c: 'evaluation', marks: 5, wl: L5,
  stem: 'An imagined chain of three pharmacies keeps its stock, supplier and sales data in separate spreadsheets at each shop. Explain the problems this causes and evaluate how a relational DBMS would solve them.',
  model: '1. **Redundancy:** each shop types the same medicine and supplier details again. A DBMS stores each medicine once in one table and links it by key.\n2. **Inconsistency:** a price changed at one shop is not changed at another, so bills differ. In a DBMS the price lives in one place.\n3. **Unavailability:** the head office cannot quickly see total stock of a medicine across shops; a DBMS answers this with a single query.\n4. **Unauthorised access and security:** any staff member with the file sees supplier rates; a DBMS gives each user only what they need and keeps backups.\n5. **Data dependence and integrity:** changing a sheet layout breaks formulas; a DBMS separates data from programs and enforces keys, so a sale cannot refer to a medicine that does not exist. **On balance** the DBMS costs some setup and training, but it removes all five problems.',
  sol: 'Five problems, each paired with how a DBMS removes it, and a brief judgement.',
  scheme: [['Redundancy and its solution', 1], ['Inconsistency and its solution', 1], ['Unavailability and its solution', 1], ['Access control or security', 1], ['Integrity or dependence, with a judgement', 1]],
}));
Q('l_keys_hospital', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Study the imagined Seva Hospital relations below and answer.\n\n${mdTable('DOCTOR')}\n\n${mdTable('PATIENT')}\n\n(a) Write the degree and cardinality of each relation. (b) Identify the candidate keys of DOCTOR, its primary key and alternate key. (c) Identify the foreign key and explain how it keeps the data correct.`,
  model: `(a) **DOCTOR:** degree ${M.doctor.degree} (DocID, DName, Dept, RegNo) and cardinality ${M.doctor.cardinality} (three doctors). **PATIENT:** degree ${M.patient.degree} (PID, PName, Age, DocID) and cardinality ${M.patient.cardinality} (five patients).
(b) **Candidate keys** of DOCTOR: DocID and RegNo, since each is unique for every doctor and never empty. **Primary key:** DocID; **alternate key:** RegNo. DName and Dept could repeat, so they are not keys.
(c) **DocID in PATIENT** is a **foreign key** referring to DocID, the primary key of DOCTOR. Referential integrity means a patient can only be assigned to a doctor who exists (D1, D2 or D3), and a doctor who still has patients cannot simply be deleted, so no patient is ever left linked to a missing doctor.`,
  sol: 'Two marks for part (a), one for (b), two for (c).',
  scheme: [['Degree and cardinality of DOCTOR', 1], ['Degree and cardinality of PATIENT', 1], ['Candidate, primary and alternate keys', 1], ['Foreign key identified', 1], ['How it keeps the data correct', 1]],
}));
Q('l_design_library', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Design two relations for an imagined school library: one for books and one for issues of books to students (a student may borrow many books, and a book may be issued many times over the year). For each relation list the attributes, the primary key and any alternate key, and state the foreign keys with what they refer to. Justify each key.',
  model: '1. **BOOK(BookID, Title, Author, AccNo, Copies):** **primary key BookID** (unique code given by the library); **alternate key AccNo** (the accession number is also unique).\n2. **ISSUE(IssueNo, BookID, AdmNo, IssueDate, ReturnDate):** **primary key IssueNo**, because the same book and student can appear in many issues.\n3. **Foreign key BookID in ISSUE** refers to BOOK, so only existing books can be issued.\n4. **Foreign key AdmNo in ISSUE** refers to the school\'s STUDENT relation, so only enrolled students can borrow.\n5. Title or Author cannot be keys because they repeat across copies and books; keeping titles only in BOOK avoids redundancy.',
  sol: 'Two sensible relations, correct primary, alternate and foreign keys, each justified.',
  scheme: [['BOOK relation with keys', 1], ['ISSUE relation with primary key justified', 1], ['Foreign key to BOOK', 1], ['Foreign key to STUDENT', 1], ['Justification of non-keys or redundancy', 1]],
}));
Q('l_terms_school', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the following terms of the relational model with examples from the imagined FEES relation below: relation, attribute, tuple, domain, and degree and cardinality.\n\n${mdTable('FEES')}`,
  model: `1. **Relation:** a table of related data; here FEES is the relation that holds the fee receipts of the school.
2. **Attribute:** a named column of the relation, such as Amount, which stores the fee paid on each receipt.
3. **Tuple:** one row, that is one complete receipt, such as (R502, 2203, April, 4500).
4. **Domain:** the set of values an attribute is allowed to take; for example, Month may only take the names of the twelve months.
5. **Degree and cardinality:** FEES has ${M.fees.degree} attributes, so its degree is ${M.fees.degree}, and ${M.fees.cardinality} tuples, so its cardinality is ${M.fees.cardinality}.`,
  sol: 'One mark per term with a correct example from FEES.',
  scheme: [['Relation', 1], ['Attribute', 1], ['Tuple', 1], ['Domain', 1], ['Degree and cardinality', 1]],
}));
Q('l_product_explain', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The imagined relations ITEM (degree ${M.item.degree}, cardinality ${M.item.cardinality}) and SUPPLIER (degree ${M.supplier.degree}, cardinality ${M.supplier.cardinality}) are combined by a Cartesian product. (a) Find the degree and cardinality of ITEM × SUPPLIER and explain the rule. (b) Explain why most tuples of this product are not meaningful, and how the foreign key SupCode helps pick the meaningful ones.`,
  model: `(a) **Degree** = ${M.item.degree} + ${M.supplier.degree} = **${M.itemXsupplier.degree}**, because each product tuple has all the attributes of both relations. **Cardinality** = ${M.item.cardinality} × ${M.supplier.cardinality} = **${M.itemXsupplier.cardinality}**, because every item is paired with every supplier.\n(b) Each item is paired even with suppliers who do **not** supply it (e.g. Rice with Tapti Traders), so most of the ${M.itemXsupplier.cardinality} tuples are meaningless. Keeping only tuples where **ITEM.SupCode = SUPPLIER.SupCode** leaves one tuple per item (${M.item.cardinality} tuples), each showing the item with its real supplier; this is how the foreign key links the tables.`,
  sol: 'Rules with values, then why the plain product over-pairs and how matching the foreign key fixes it.',
  scheme: [['Degree with rule', 1], ['Cardinality with rule', 1], ['Why most tuples are meaningless', 1], ['Matching on SupCode', 1], ['Result: one tuple per item', 1]],
}));
assert.equal(shape(['SUPPLIER', 'ITEM'], 'SELECT * FROM ITEM, SUPPLIER WHERE ITEM.SupCode = SUPPLIER.SupCode').cardinality, M.item.cardinality);
Q('l_fs_vs_db', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare a file-processing system with a database management system on five points, using an imagined school\'s student records as the running example.',
  model: '1. **Redundancy:** files repeat the student\'s details in admission, fee and transport files; a DBMS stores them once and links by AdmNo.\n2. **Consistency:** changing an address in one file leaves others wrong; in a DBMS one update is seen everywhere.\n3. **Getting answers out:** a file needs a new program for each new report; a DBMS answers a new question with a query.\n4. **Security:** files are all-or-nothing; a DBMS lets the fee clerk see fees but not health records.\n5. **Integrity and independence:** files cannot stop a fee entry for a non-existent student, and layout changes break programs; a DBMS enforces keys and separates data from programs.',
  sol: 'Five points of contrast, each with the school example.',
  scheme: [['Point 1', 1], ['Point 2', 1], ['Point 3', 1], ['Point 4', 1], ['Point 5', 1]],
}));

// ================================================================ case-based
Q('cb_school', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case about the records of Nilgiri Vidyalaya and answer the questions. *(Imagined school and data, written by SOYL for practice.)*',
  passage: `The office of Nilgiri Vidyalaya has moved its records into a relational database. Two of its relations are shown.\n\n${mdTable('STUDENT')}\n\n${mdTable('FEES')}`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: M.fees.cardinality, unit: null, stem: 'What is the cardinality of FEES?', sol: `FEES has ${M.fees.cardinality} tuples (R501 to R504).` })),
    child('b', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'b', stem: 'Which attribute of FEES is a foreign key?', opts: ['ReceiptNo', 'AdmNo', 'Month', 'Amount'], sol: 'AdmNo in FEES refers to AdmNo, the primary key of STUDENT.' })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The clerk wants to delete student 2201, who has left the school. Explain what the DBMS does and why, and what the clerk should do first.', model: 'The DBMS **refuses** the deletion because receipts R501 and R503 in FEES still refer to AdmNo 2201; deleting the student would leave them pointing to nobody (**referential integrity**). The clerk must first deal with those receipts (archive or delete them) or the table must be set up to cascade the deletion.', sol: 'Refusal, the reason (referential integrity with the two receipts), and the remedy.', scheme: [['Refusal with reason', 1], ['Remedy', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why can neither Name nor Class be a candidate key of STUDENT? Quote evidence from the table.', model: '**Name** repeats: two students are called **Kabir Das** (2202 and 2204). **Class** repeats: **12A** appears for 2201 and 2202 (and 12B twice). A candidate key must be unique for every tuple.', sol: 'Evidence of repetition for each attribute and the uniqueness rule.', scheme: [['Name with evidence', 1], ['Class with evidence', 1]] }),
    ]),
  ],
}));
Q('cb_store', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case about Annapurna Stores and answer the questions. *(Imagined shop, suppliers and prices, written by SOYL for practice.)*',
  passage: `Mrs Kamath runs Annapurna Stores and has just put her stock records into a database with two relations.\n\n${mdTable('SUPPLIER')}\n\n${mdTable('ITEM')}`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'c', stem: 'Which pair are the candidate keys of SUPPLIER?', opts: ['SName and City', 'SupCode and City', 'SupCode and LicenceNo', 'City and LicenceNo'], sol: 'SupCode and LicenceNo are unique for each supplier; names and cities could repeat as more suppliers are added.' })),
    child('b', num({ t: 1, d: 3, c: 'application', marks: 1, value: M.itemXsupplier.cardinality, unit: null, stem: 'How many tuples would the Cartesian product ITEM × SUPPLIER have?', sol: `${M.item.cardinality} × ${M.supplier.cardinality} = ${M.itemXsupplier.cardinality} tuples.` })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Mrs Kamath tries to add a new item with SupCode S5. Explain what the DBMS does and how she can add the item correctly.', model: 'S5 does not exist in SUPPLIER, so the DBMS **rejects** the item: SupCode in ITEM is a **foreign key** and must match an existing supplier (referential integrity). She should **first add supplier S5 to SUPPLIER** (with its LicenceNo) and then add the item.', sol: 'Rejection with the foreign-key reason, and the correct order of insertion.', scheme: [['Rejection with reason', 1], ['Correct procedure', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Her nephew suggests storing the supplier\'s name and city in every ITEM row and dropping SUPPLIER. Give two reasons why this is a poor idea.', model: '1. **Redundancy:** Kaveri Foods, Mysuru would be typed for every item it supplies (three items now).\n2. **Inconsistency:** if Kaveri Foods moves, every one of those rows must be changed; missing one leaves the data contradicting itself. A separate SUPPLIER table linked by SupCode avoids both.', sol: 'Redundancy and inconsistency, tied to the data.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('cb_hospital', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case about Seva Hospital\'s patient records and answer the questions. *(Imagined hospital and people, written by SOYL for practice.)*',
  passage: `Seva Hospital keeps doctors and patients in two linked relations. Each patient is under exactly one doctor.\n\n${mdTable('DOCTOR')}\n\n${mdTable('PATIENT')}`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', fixed: true, key: 'd', stem: 'If DocID is the primary key of DOCTOR, what is RegNo?', opts: ['A foreign key', 'A tuple', 'A domain', 'An alternate key'], sol: 'RegNo is unique for every doctor, so it is a candidate key; not being chosen, it is an alternate key.' })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: M.doctorXpatient.degree, unit: null, stem: 'What is the degree of DOCTOR × PATIENT?', sol: `${M.doctor.degree} + ${M.patient.degree} = ${M.doctorXpatient.degree}.` })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): A new patient, P106, is to be put under Dr Lata Joshi. Write the tuple to be added to PATIENT (use an age of your choice) and explain why DocID must be D3.', model: '(P106, Arjun Pillai, 6, **D3**). DocID in PATIENT is a **foreign key**: it must be a DocID that exists in DOCTOR, and **Dr Lata Joshi\'s DocID is D3**. Writing her name or an unknown code would break referential integrity.', sol: 'A valid tuple with D3 and the foreign-key reason.', scheme: [['Valid tuple with D3', 1], ['Foreign-key reason', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why would PName be a poor primary key for PATIENT even though all five names are different today?', model: 'A key must stay unique for **every future tuple**, not just today\'s five. Two patients with the same name can easily be admitted, and names may be spelt differently or changed. **PID** is assigned by the hospital, so it stays unique and stable.', sol: 'Uniqueness must hold for all future data; propose PID.', scheme: [['Future uniqueness argument', 1], ['PID proposed with reason', 1]] }),
    ]),
  ],
}));
Q('cb_library', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case about the reading room of Sunbeam School and answer the questions. *(Imagined school, books and numbers, written by SOYL for practice.)*',
  passage: `Until last year the librarian of Sunbeam School kept a register for books and a separate notebook for issues, where she copied the full title of a book every time it was lent. This year she uses a database. Its BOOK relation is shown.\n\n${mdTable('BOOK')}`,
  parts: [
    child('a', tf({ t: 1, d: 2, c: 'application', ans: true, stem: 'True or false? Both BookID and AccNo are candidate keys of BOOK.', sol: 'Each is different for every book and is never empty, so both can identify a tuple.' })),
    child('b', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'a', stem: 'Copying the full title into the issue notebook every time a book was lent is an example of', opts: ['data redundancy', 'referential integrity', 'a candidate key', 'data independence'], sol: 'The same title was stored again and again: redundancy.' })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Suggest the attributes and keys of an ISSUE relation for the new database so that titles are not copied again.', model: 'ISSUE(**IssueNo**, BookID, AdmNo, IssueDate). **Primary key:** IssueNo. **BookID** is a **foreign key** referring to BOOK, so the title is looked up from BOOK instead of being copied.', sol: 'Sensible attributes, a primary key and BookID as a foreign key.', scheme: [['Attributes with primary key', 1], ['BookID as foreign key, avoiding copies', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The librarian buys two more books and adds a column Shelf to BOOK. What are the new degree and cardinality? Show how you got them.', model: `Degree: ${M.book.degree} + 1 = **${M.book.degree + 1}** (one new attribute). Cardinality: ${M.book.cardinality} + 2 = **${M.book.cardinality + 2}** (two new tuples).`, sol: 'Add one to the degree and two to the cardinality.', scheme: [['New degree', 1], ['New cardinality', 1]] }),
    ]),
  ],
}));

// ================================================================ more objective items (decks' checks and tests)
Q('m_row_term', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which pair of terms means the same thing in a relational database?',
  opts: ['Tuple and record', 'Attribute and record', 'Degree and row', 'Domain and table'],
  sol: 'A tuple is also called a record (row). An attribute is a field (column).',
}));
Q('m_unavail', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The principal of an imagined school asks for a list of students who use the school bus and have unpaid fees. The answer takes two days because the data is spread over unrelated files. Which problem is this?',
  opts: ['Data unavailability', 'Data redundancy', 'Referential integrity', 'Too high a degree'],
  sol: 'Data exists but cannot be got in time in the needed form: unavailability. A DBMS answers such a request with one query.',
}));
Q('m_degree_change', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The imagined ITEM relation has degree ${M.item.degree} and cardinality ${M.item.cardinality}. Mrs Kamath deletes one item and adds a column Discount. What are the new degree and cardinality?`,
  opts: [`Degree ${M.item.degree + 1}, cardinality ${M.item.cardinality - 1}`, `Degree ${M.item.degree - 1}, cardinality ${M.item.cardinality + 1}`, `Degree ${M.item.degree}, cardinality ${M.item.cardinality}`, `Degree ${M.item.degree + 1}, cardinality ${M.item.cardinality}`],
  sol: `A new column raises the degree to ${M.item.degree + 1}; deleting a row lowers the cardinality to ${M.item.cardinality - 1}.`,
}));
Q('m_key_null_alt', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Annapurna Stores (imagined) declares LicenceNo in SUPPLIER as unique and NOT NULL. A clerk tries to add supplier S4 with no licence number. What happens, and why?',
  opts: [
    'The row is rejected, because LicenceNo is a candidate key that may not be empty',
    'The row is accepted, because only the primary key must be filled',
    'The DBMS invents a licence number',
    'The row is accepted but SupCode is set to NULL',
  ],
  sol: `LicenceNo was declared NOT NULL because it is a candidate (alternate) key, so an empty value is refused. (SQLite reports: ${E.nullAk.replace(/^sqlite3\./, '')}.)`,
}));
Q('m_fk_same_name', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In the imagined school database, the foreign key in FEES is named AdmNo, just like the primary key of STUDENT. Must a foreign key always have the same name as the key it refers to?',
  opts: ['No; it must have matching values and domain, but its name may differ', 'Yes; the DBMS links tables only by matching names', 'Yes, and it must also be the first column', 'No, and its values need not match either'],
  sol: 'What matters is that its values come from the referenced primary key (same domain). The name is a design choice; using the same name only makes it easier to read.',
}));
Q('m_pk_choice', mcq({
  t: 1, d: 3, c: 'evaluation',
  stem: 'For an imagined bus-pass relation, the candidate keys are PassNo (a short code issued by the school) and the combination (StudentName, Address). Which should be the primary key?',
  opts: ['PassNo, because it is short, simple and never changes', 'The combination, because it uses more attributes', 'Both together, to be safe', 'Address, because no two students live at the same place'],
  sol: 'A good primary key is minimal, stable and simple. Names and addresses are long and can change; Address alone is not unique.',
}));
Q('tf_fk_unique', tf({
  t: 1, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? The values of a foreign key must be unique in the referencing relation.',
  sol: 'A foreign key value repeats whenever several tuples refer to the same parent: AdmNo 2201 appears in two FEES tuples.',
}));
Q('ar_dbms_access', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'A DBMS can stop a canteen clerk from viewing students\' medical records stored in the same school database.',
  r: 'A DBMS lets the administrator give different users permission to see or change different data.',
  sol: 'Both are true and R explains A: access control is a DBMS feature.',
}));
Q('s_composite', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined SPORTS_ENTRY relation records which student takes part in which event: (AdmNo, Event, House). A student may enter many events. Suggest its primary key and justify it.',
  model: 'The primary key should be **(AdmNo, Event)**. AdmNo alone repeats when a student enters several events, and Event repeats for many students, but **each student enters an event only once**, so the pair is unique. A key made of two attributes is a **composite key**.',
  sol: 'Composite key with the reasoning about repetition.',
  scheme: [['Correct composite key', 1], ['Justification', 1]],
}));
Q('s_alt_role', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why might a database designer keep RegNo as an alternate key of the imagined DOCTOR relation, instead of ignoring it once DocID is the primary key?',
  model: 'RegNo is still **unique** for each doctor, so declaring it an **alternate key** (unique, not NULL) lets the DBMS **stop two doctors being entered with the same registration number** and lets staff look a doctor up by it.',
  sol: 'Uniqueness enforcement and use for lookup.',
  scheme: [['Uniqueness is enforced', 1], ['Practical use', 1]],
}));
