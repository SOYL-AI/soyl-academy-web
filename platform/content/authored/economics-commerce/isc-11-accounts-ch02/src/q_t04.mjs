// t04: Accounting Standards (meaning, need, advantages, limitations) and IFRS (brief). General facts only: no
// standard numbers, dates or rates. Imagined firms.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { QQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_as_need', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Several imagined shopkeepers in one town value their stock and charge depreciation in different ways, so their profits cannot be compared. The need that accounting standards meet here is',
  opts: ['uniform treatment, so that statements become comparable', 'higher profits for every shopkeeper', 'avoidance of all taxes', 'removal of the need to keep books'],
  sol: 'Standards lay down uniform rules and policies, which makes statements comparable and reliable. They do not raise profits, lower taxes or replace books.',
}));
QQ('m_as_limit', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of the following is a limitation, and not an advantage, of accounting standards for an imagined small firm?',
  opts: ['A standard may be too rigid to suit every special situation of the firm', 'Statements of the firm can be compared with those of other firms', 'The choice of alternative accounting methods is narrowed', 'Users can place more trust in the reported figures'],
  sol: 'A fixed rule cannot fit every case, which is a drawback. The other statements describe benefits: comparability, fewer alternatives and greater reliability.',
}));
QQ('m_ifrs_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'International Financial Reporting Standards, as a set of standards, are',
  opts: ['accounting standards issued by the International Accounting Standards Board for use in many countries', 'rules of one country\'s tax department for income tax returns', 'a list of accounting books every firm must keep', 'standards of quality for goods sold across borders'],
  sol: 'IFRS are a common set of accounting standards issued by an international body so that financial statements can be understood across countries. They are not tax rules, a list of books or product standards.',
}));
QQ('m_convergence', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Tezpur Rubber Exports, an imagined company in India, wishes to raise funds from investors abroad. How does convergence of its accounting standards with IFRS help it most?',
  opts: ['Foreign investors can read and compare its statements with those of firms in their own countries', 'It is freed from preparing any financial statements', 'It need not follow the law of its own country', 'Its profit is automatically raised'],
  sol: 'Common standards make statements understandable and comparable across borders, which gives investors confidence. Convergence does not remove the duty to prepare statements, override local law or raise profit.',
}));

// ================================================================ assertion-reason
QQ('ar_standards', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Accounting standards narrow the choice of accounting methods open to a firm.',
  r: 'The Institute of Chartered Accountants of India is a professional body of accountants.',
  sol: 'Both are true, but the second does not explain the first. Standards narrow the choice because they lay down uniform rules and policies, not because of who the issuing body is.',
}));
QQ('ar_ifrs', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-false',
  a: 'International Financial Reporting Standards are issued by the tax department of each country for its own firms.',
  r: 'Convergence with these standards makes the statements of Indian companies harder to compare with those of foreign companies.',
  sol: 'Both are false. The standards are issued by an international accounting body, not by national tax departments, and convergence makes statements easier to compare across countries.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_as_judgement', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'Because Mandla Weaves, an imagined firm, follows accounting standards, its accountant need not exercise any judgement in preparing the statements.',
  sol: 'Standards limit judgement and the choice of methods, but they cannot cover every situation, so the accountant must still use judgement.',
}));
QQ('fb_standards', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'Accounting standards narrow the choice of ______ accounting methods, so the statements of different firms become more ______.',
  acc: [['alternative', 'different', 'permitted'], ['comparable', 'uniform']],
  sol: 'Standards reduce alternative methods and make the statements comparable.',
}));
QQ('fb_ifrs', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'IFRS stands for International ______ Reporting Standards, issued by the International ______ Standards Board.',
  acc: [['financial'], ['accounting']],
  sol: 'The full form is International Financial Reporting Standards, issued by the International Accounting Standards Board.',
}));

// ================================================================ short answer, 2 marks
QQ('s2_as_meaning', short({
  t: 4, d: 1, c: 'recall', marks: 2,
  stem: 'What are accounting standards? Name the body that formulates them in India.',
  model: '**Accounting standards** are written statements of uniform accounting rules and policies for the treatment and disclosure of items in the financial statements.\n\nIn India they are formulated by the Institute of Chartered Accountants of India.',
  sol: 'Meaning, then the issuing body.',
  scheme: [['Meaning of accounting standards', 1], ['Institute of Chartered Accountants of India', 1]],
}));
QQ('s2_ifrs', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'State what IFRS are and give one reason why countries move towards them.',
  model: '**IFRS** are International Financial Reporting Standards, a common set of accounting standards issued by the International Accounting Standards Board for use in many countries.\n\nOne reason: statements prepared on common standards can be compared across countries, which helps investors.',
  sol: 'What they are, then one reason.',
  scheme: [['Meaning of IFRS with the issuing body', 1], ['One reason for adopting them', 1]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_as_limits', short({
  t: 4, d: 3, c: 'analysis', marks: 3,
  stem: 'An imagined owner of a small shop says: "Accounting standards are not suited to me." Give three limitations of accounting standards that could support the owner\'s view.',
  model: '1. **Rigidity:** a standard is a fixed rule and may not fit the special situation of a small firm.\n\n2. **Cost and effort:** following the standards and their disclosures needs time, trained staff and money.\n\n3. **Judgement still needed:** some choice between methods remains and the accountant must still judge, so the figures are not free from bias.\n\n(Other valid points: standards may need to be revised as business changes; law prevails where it conflicts.)',
  sol: 'Any three limitations, one mark each.',
  scheme: [['First limitation with explanation', 1], ['Second limitation with explanation', 1], ['Third limitation with explanation', 1]],
}));
QQ('s3_convergence', short({
  t: 4, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain three benefits of converging a country\'s accounting standards with IFRS.',
  model: '1. **Comparability:** statements of firms in different countries can be compared by investors and lenders.\n\n2. **Easier raising of funds:** a company can seek money abroad because foreign investors can understand its accounts.\n\n3. **Less duplication:** a group with units in several countries can prepare one set of accounts and not several.',
  sol: 'Any three benefits, one mark each.',
  scheme: [['First benefit explained', 1], ['Second benefit explained', 1], ['Third benefit explained', 1]],
}));

// ================================================================ long answer, 5 marks
QQ('l5_standards', long({
  t: 4, d: 2, c: 'understanding', marks: 5,
  stem: 'Explain the meaning of accounting standards. Why are they needed? State two advantages and two limitations of accounting standards.',
  model: '**Meaning:** accounting standards are written statements of uniform accounting rules and policies for the treatment and disclosure of items in the financial statements.\n\n**Need:** (i) to make the statements of different firms and years comparable; (ii) to make the statements reliable by limiting personal judgement; (iii) to reduce the alternative methods open to accountants.\n\n**Advantages:** (i) uniform practice across firms; (ii) greater trust of lenders, investors and other users; (iii) easier work for auditors.\n\n**Limitations:** (i) a standard may be too rigid for every special situation; (ii) following the standards costs time and effort; (iii) judgement is still needed.',
  sol: 'Meaning and need, then two advantages and two limitations.',
  scheme: [['Meaning of accounting standards', 1], ['Need for standards: any two reasons', 1], ['Two advantages', 1], ['Two limitations', 1], ['Clear, correct explanation throughout', 1]],
}));
QQ('l5_ifrs', long({
  t: 4, d: 3, c: 'analysis', marks: 5,
  stem: 'Dhubri Metals, an imagined Indian company with buyers and investors in several countries, is advised to follow IFRS. (a) State what IFRS are and name the body that issues them. [2] (b) Give two objectives of IFRS. [1] (c) Explain two benefits of convergence with IFRS for Dhubri Metals. [2]',
  model: '**(a)** IFRS are International Financial Reporting Standards, a common set of accounting standards for use in many countries. They are issued by the International Accounting Standards Board.\n\n**(b)** Two objectives: (i) to bring a single set of understandable, high-quality standards for use across the world; (ii) to improve transparency and comparability of financial statements.\n\n**(c)** (i) Foreign investors and lenders can read and compare Dhubri Metals\' statements with those of firms in their own countries, so it can raise funds abroad more easily. (ii) Its Indian and foreign units can follow one set of standards, so there is less duplication of effort in preparing group accounts.',
  sol: 'Meaning and issuer, two objectives, then two benefits tied to the firm.',
  scheme: [['Meaning of IFRS', 1], ['Issuing body', 1], ['Two objectives', 1], ['First benefit applied to the firm', 1], ['Second benefit applied to the firm', 1]],
}));
