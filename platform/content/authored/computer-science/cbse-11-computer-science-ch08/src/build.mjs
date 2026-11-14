// Build CBSE 11 Computer Science ch08 Society, Law and Ethics. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch08/src/build.mjs
// Theory chapter: there is no program to execute. Every count and sum shown in decks, notes, flashcards and items is
// derived from the constants in questions.mjs and asserted there (CC, IPR, VIOL, LAB, BREAK).
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch08', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
const { W, ic, CC, IPR, VIOL, LAB, BREAK } = await import('./questions.mjs');
await import('./questions2.mjs');
const DIR = path.resolve(SRC, '..');

// ---------------------------------------------------------------- visuals, Part 1
const vRoute1 = flow('LR', ['Digital footprints', 'Netizens and etiquette', 'Data protection', 'Intellectual property', 'Open source and licences'], 'Route map of Part 1: digital footprints, netizens and etiquette, data protection, intellectual property, and open source software with licences', 'Part 1 at a glance');
const vFootprint = table(
  ['Kind', 'How it is made', 'Examples'],
  [
    ['Active footprint', 'The user knowingly submits the data', 'Posts, comments, e-mails sent, forms filled in'],
    ['Passive footprint', 'Data is collected without the user acting', 'IP address, browsing history from cookies, device details, location data'],
  ],
  'Table comparing active and passive digital footprints: how each is made and examples of each',
  'Active means submitted on purpose; passive means collected in the background.',
);
const classify = [
  ['Sends an e-mail to a teacher', 'Active'],
  ['A website logs the IP address of a visit', 'Passive'],
  ['Uploads a video to a class channel', 'Active'],
  ['Browser cookies note the pages viewed', 'Passive'],
  ['Types her name in an online quiz form', 'Active'],
];
const vClassify = table(
  ['What happens', 'Type of footprint'],
  classify,
  `Table that classifies ${W(classify.length)} online actions as active or passive digital footprints`,
  'Ask: did the user submit it on purpose?',
);
const vNetizen = table(
  ['Right of a netizen', 'Matching responsibility'],
  [
    ['Access to information', 'Check facts before sharing them'],
    ['Privacy', 'Respect the privacy of other people'],
    ['Freedom of expression', 'Express views politely, without hurting others'],
    ['Safety', 'Protect your own data and other people\'s data'],
  ],
  'Table pairing each right of a netizen with a matching responsibility: access to information with checking facts, privacy with respecting others, freedom of expression with politeness, and safety with protecting data',
);
const vEtiquette = table(
  ['Area', 'Do', 'Avoid'],
  [
    ['Net etiquette (in general)', 'Respect others, follow the rules of the site', 'Rude or hurtful behaviour, spreading rumours'],
    ['Communication etiquette (e-mail, chat)', 'Clear subject, polite words, reply in time', 'Capital-letter shouting, abusive words, long messages without need'],
    ['Social media etiquette', 'Think before posting, ask before sharing others\' photos, credit sources', 'Oversharing, unverified news, mocking comments'],
  ],
  'Table of three areas of etiquette, net, communication and social media, with what to do and what to avoid in each',
);
const vPrivacy = table(
  ['Personal data', 'Risk if it is public', 'Protection'],
  [
    ['Passwords and OTPs', 'Account can be taken over', 'Never share; use strong passwords and two-step verification'],
    ['Birth date, address, school', 'Strangers can trace or impersonate you', 'Keep out of public profiles'],
    ['Photos of yourself and friends', 'Can be copied and misused', 'Use privacy settings; ask before sharing others'],
    ['Location', 'Shows where you are or will be', 'Switch off location sharing for apps that do not need it'],
  ],
  'Table of kinds of personal data, the risk if each is made public and how to protect it',
);
const vSafe = flow('LR', ['Pause before you post', 'Check the source', 'Check who can see it', 'Share, or keep it private'], 'Flow of a safe sharing habit: pause before you post, check the source, check who can see it, then share or keep it private', 'A short check before every share.');
const vIPR3 = table(
  ['Right', 'Protects', 'Example'],
  [
    ['Copyright', 'Original creative works, from the moment they are created', 'A novel, a song, a drawing, program code'],
    ['Patent', 'A new, useful invention, for a limited period', 'A new design of a water filter'],
    ['Trademark', 'A name, logo or symbol that identifies the maker of goods or services', 'A biscuit maker\'s name and logo'],
  ],
  `Table of the ${W(IPR.length)} kinds of intellectual property right, copyright, patent and trademark, with what each protects and an example`,
);
const which = [
  ['A student writes a poem for the school magazine', 'Copyright'],
  ['A team invents a low-cost seed-planting device', 'Patent'],
  ['A tea shop chooses a distinctive logo for its cups', 'Trademark'],
  ['A programmer writes the code of a quiz game', 'Copyright'],
];
const vWhich = table(
  ['Situation', 'Right that fits'],
  which,
  `Table matching ${W(which.length)} situations to copyright, patent or trademark`,
  'Creative work: copyright. Invention: patent. Identifier of goods: trademark.',
);
const vViol = table(
  ['Violation', 'Meaning', 'Imagined example'],
  [
    ['Plagiarism', 'Presenting another person\'s work or ideas as your own, without credit', 'Pasting an article into a project with no source named'],
    ['Copyright infringement', 'Copying, sharing or selling a protected work without permission', 'Selling unauthorised copies of paid software'],
    ['Trademark infringement', 'Using a mark that is identical or confusingly similar to another maker\'s mark', 'A stall copying the name and logo of a known brand'],
  ],
  `Table of the ${W(VIOL.length)} violations of IPR: plagiarism, copyright infringement and trademark infringement, each with its meaning and an example`,
);
const vOSS = table(
  ['Feature', 'Proprietary software', 'Free and open source software'],
  [
    ['Source code', 'Kept closed by the owner', 'Available to everyone'],
    ['Changing and sharing', 'Limited by the licence', 'Allowed under the licence'],
    ['Meaning of free', 'Not applicable', 'Freedom to use, study, change and share (not always free of cost)'],
    ['Who controls it', 'The owner', 'The community and the licence terms'],
  ],
  'Table comparing proprietary software with free and open source software in source code, changing and sharing, meaning of free, and control',
);
const vLic = table(
  ['Licence', 'Kind', 'If you share a changed version'],
  [
    ['GPL', 'Copyleft', 'It must also be shared under the GPL, with its source code'],
    ['Apache', 'Permissive', 'You may share it under your own terms, even in a closed product, if you keep the notices and credit'],
  ],
  'Table comparing the GPL, a copyleft licence, with the Apache licence, a permissive licence, in what must happen when a changed version is shared',
  'Copyleft passes the freedoms on; permissive licences ask for little.',
);
const vCC = table(
  ['Element', 'Name', 'What it asks of the user'],
  CC.map(([code, name, req]) => [code, name, req[0].toUpperCase() + req.slice(1)]),
  `Table of the ${W(CC.length)} Creative Commons elements BY, SA, NC and ND with their names and what each asks of the user`,
  'Elements are combined to make a licence, such as BY-NC.',
);
const vCCread = table(
  ['Question about a work', 'BY-NC-SA', 'BY-ND'],
  [
    ['Must you credit the creator?', 'Yes', 'Yes'],
    ['May you use it for profit?', 'No', 'Yes, if the work is not changed'],
    ['May you edit or remix it?', 'Yes', 'No'],
    ['Licence for your new version', 'The same licence', 'Not applicable'],
  ],
  'Table that reads two Creative Commons licences, BY-NC-SA and BY-ND, answering whether credit is needed, whether profit use, editing and remixing are allowed, and the licence for a new version',
  'BY-ND allows commercial use of unchanged copies because it has no NC element.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Footprint', 'active (submitted) and passive (collected)'],
    ['Etiquette', 'net, communication and social media: be polite, think before you post'],
    ['Privacy', 'guard passwords, OTPs, photos, location and personal details'],
    ['IPR', 'copyright, patent, trademark; violations: plagiarism, infringement'],
    ['Licences', 'proprietary, GPL, Apache, Creative Commons BY, SA, NC, ND'],
  ],
  'Summary table of Part 1: footprints, etiquette, privacy, intellectual property rights and licences',
);

// ---------------------------------------------------------------- visuals, Part 2
const vRoute2 = flow('LR', ['Cyber crimes', 'Malware', 'Cyber safety', 'The IT Act', 'E-waste, health and inclusion'], 'Route map of Part 2: cyber crimes, malware, cyber safety, the Information Technology Act, and e-waste, health and inclusion', 'Part 2 at a glance');
const vCrimes = table(
  ['Crime', 'What happens'],
  [
    ['Hacking', 'Unauthorised entry into a computer system or account'],
    ['Eavesdropping', 'Secretly capturing data while it travels over a network'],
    ['Phishing and fraud e-mails', 'Fake messages that trick people into giving details or money'],
    ['Ransomware', 'Files are locked until a payment is made'],
    ['Cyber trolling and bullying', 'Offensive or repeated hurtful messages aimed at people'],
  ],
  'Table of cyber crimes and what happens in each: hacking, eavesdropping, phishing and fraud e-mails, ransomware, and cyber trolling and bullying',
);
const vHack = table(
  ['', 'Ethical hacker', 'Malicious hacker'],
  [
    ['Permission of the owner', 'Taken beforehand', 'Not taken'],
    ['Purpose', 'Find weaknesses so they can be fixed', 'Steal, damage or misuse data'],
    ['Legal position', 'Lawful, when within the agreed limits', 'A cyber crime'],
  ],
  'Table comparing an ethical hacker with a malicious hacker on permission, purpose and legal position',
);
const vPhish = table(
  ['Warning sign', 'Why it is suspicious'],
  [
    ['Sender address with a small spelling change', 'Fake addresses imitate real ones'],
    ['Threat or deadline: account closes today', 'Urgency stops you from thinking'],
    ['Request for password, OTP or card details', 'A genuine bank never asks for these by message'],
    ['Link whose address looks different', 'It may lead to a copy of the real page'],
    ['Prize you never entered for, with a fee to claim it', 'Fraud e-mails promise money to collect yours'],
  ],
  'Table of warning signs of phishing and fraud e-mails with the reason why each is suspicious',
);
const spot = [
  ['The sender address misspells the shop\'s name', 'Imitation of a real sender'],
  ['It says you must pay a small fee to claim a prize', 'A fraud e-mail asking for money'],
  ['It tells you to act within the hour', 'False urgency'],
  ['It asks for your card number and OTP', 'Genuine firms do not ask for these in messages'],
];
const vSpot = table(
  ['Clue in the e-mail', 'What it tells us'],
  spot,
  `Table of ${W(spot.length)} clues in a suspicious e-mail and what each one tells us`,
  'Several clues together make the case.',
);
const vRTB = table(
  ['Crime', 'What it is', 'Sensible response'],
  [
    ['Ransomware', 'Malware that locks files and demands payment', 'Keep offline backups; do not open unknown attachments'],
    ['Cyber troll', 'Posts provocative or offensive messages to upset or start fights', 'Do not feed it; block and report'],
    ['Cyber bullying', 'Repeated online harassment of a person', 'Save the evidence, block, tell a trusted adult, report'],
  ],
  'Table of ransomware, cyber trolls and cyber bullying with what each is and a sensible response',
);
const vMalware = table(
  ['Malware', 'How it behaves'],
  [
    ['Virus', 'Attaches to files and spreads when they are run or shared'],
    ['Worm', 'Copies itself across a network on its own, needing no host file'],
    ['Trojan', 'Looks like useful software but hides harmful actions'],
    ['Adware', 'Shows unwanted advertisements, often as pop-ups'],
    ['Spyware', 'Secretly watches what you do and reports it'],
  ],
  'Table of kinds of malware, virus, worm, Trojan, adware and spyware, and how each behaves',
);
const vSafety = table(
  ['Idea', 'Meaning', 'Habit'],
  [
    ['Safe browsing', 'Visiting sites and downloading files with care', 'Check the address and secure connection; download from trusted sources; keep antivirus updated'],
    ['Identity protection', 'Keeping your identity from being misused', 'Never share passwords, OTPs or ID numbers; use two-step verification'],
    ['Confidentiality', 'Information is seen only by authorised people', 'Use privacy settings; share personal data only when needed'],
  ],
  'Table of cyber safety ideas, safe browsing, identity protection and confidentiality, with the meaning and habits for each',
);
const vITAct = table(
  ['Purpose', 'What it means'],
  [
    ['Legal recognition', 'Electronic records and digital signatures are valid in law'],
    ['Cyber offences', 'Certain misuse of computers and data is defined as an offence'],
    ['Penalties', 'Offences can be punished or compensated'],
    ['Adjudication and appeal', 'Disputes are decided by officers, with appeal to a tribunal such as the Cyber Appellate Tribunal'],
  ],
  'Table of the purposes of the Information Technology Act 2000 as amended in 2008: legal recognition, cyber offences, penalties, and adjudication and appeal',
  'The Act is described here by purpose; section numbers are not needed.',
);
const itScn = [
  ['A supplier accepts an order signed with a digital signature', 'Legal recognition'],
  ['Someone enters a company\'s system without permission', 'Cyber offence'],
  ['A dispute about such an offence is decided by an officer, then appealed', 'Adjudication and appeal'],
];
const vITScn = table(
  ['Situation', 'Purpose of the IT Act involved'],
  itScn,
  `Table matching ${W(itScn.length)} situations to the purpose of the IT Act that applies`,
);
const vEwaste = flow('LR', ['Reduce', 'Reuse', 'Recycle', 'Safe disposal'], 'Flow of e-waste management in order of preference: reduce, reuse, recycle through authorised recyclers, and safe disposal of what is left', 'Prefer the steps on the left.');
const vLab = table(
  ['What happens to the old computers', 'Number', 'Share of the total'],
  [
    ['Given to a village library (reuse)', String(LAB.reuse), `${LAB.reusePct}%`],
    ['Sent to an authorised recycler', String(LAB.recycle), `${((LAB.recycle * 100) / LAB.total).toFixed(1)}%`],
    ['Kept for spare parts', String(LAB.rest), `${((LAB.rest * 100) / LAB.total).toFixed(1)}%`],
    ['All old computers', String(LAB.total), `${((LAB.reuse + LAB.recycle + LAB.rest) * 100) / LAB.total}%`],
  ],
  `Table that splits ${LAB.total} old lab computers into ${LAB.reuse} given away, ${LAB.recycle} recycled and ${LAB.rest} kept for spare parts, with shares of the total`,
  'The three parts add up to the whole.',
);
const vHealth = table(
  ['Problem', 'Cause', 'Remedy'],
  [
    ['Digital eye strain', 'Long, unbroken screen time', 'Regular breaks; look at distant objects'],
    ['Repetitive strain injury', 'Long typing or mouse use with poor wrist position', 'Breaks, stretching, relaxed wrist position'],
    ['Back and neck pain', 'Poor sitting posture, screen too low', 'Supported back, screen at eye level'],
    ['Internet addiction', 'Overuse that replaces sleep, study and meals', 'Time limits, offline hobbies, talk to a trusted adult'],
  ],
  'Table of health problems linked to technology, digital eye strain, repetitive strain injury, back and neck pain, and internet addiction, with the cause and remedy for each',
);
const vInclude = table(
  ['Issue', 'Example', 'Way forward'],
  [
    ['Gender gap', 'Girls discouraged from computer or robotics clubs', 'Equal chances, role models, challenge stereotypes'],
    ['Disability', 'A blind student cannot read an image-only page', 'Screen readers, alternative text, captions, keyboard access'],
    ['Access', 'A student has no device or connection at home', 'Shared labs, loan devices, low-bandwidth content'],
  ],
  'Table of issues of gender and disability in using and teaching computers, with an example and a way forward for each',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Cyber crimes', 'hacking, eavesdropping, phishing, ransomware, trolling, bullying'],
    ['Malware', 'virus, worm, Trojan, adware, spyware'],
    ['Cyber safety', 'safe browsing, identity protection, confidentiality'],
    ['IT Act', 'recognition of records and signatures, offences, adjudication and appeal'],
    ['E-waste and health', 'reduce, reuse, recycle; breaks, posture, balance'],
    ['Inclusion', 'equal access for all genders and abilities'],
  ],
  'Summary table of Part 2: cyber crimes, malware, cyber safety, the IT Act, e-waste and health, and inclusion',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Society, Law and Ethics — Part 1: Digital Footprints, Etiquette, Privacy and Intellectual Property',
  goals: [
    'Distinguish active and passive digital footprints and describe the behaviour of a responsible netizen',
    'Explain data protection, privacy and safe online behaviour',
    'Describe copyright, patent and trademark, their violations, and open source and Creative Commons licences',
  ],
  slides: [
    sl('title', 'Society, Law and Ethics', {
      b: 'Part 1 — **behaving well online** and **respecting other people\'s work**.',
      v: vRoute1,
      n: 'Every time we use a phone or a computer we join a digital society. In this part we look at the trail we leave online, how a responsible netizen behaves, how to protect our data, and how the law and licences protect the work of creators.',
    }),
    sl('concept', 'Digital footprints', {
      b: 'Every online action leaves a **digital footprint**: the trail of data about a person.',
      v: vFootprint,
      n: 'A digital footprint is the trail of data you leave online. The active footprint is what you knowingly submit, such as posts, comments and e-mails you send. The passive footprint is collected without you doing anything, such as your address on the network, browsing history from cookies, and device details.',
    }),
    sl('example', 'Worked example 1: active or passive?', {
      b: 'Decide for each action whether the user **submitted** the data on purpose.',
      v: vClassify,
      n: 'Ask one question: did the user submit this data on purpose? Sending an e-mail, uploading a video and typing a name into a form are all deliberate, so they are active. A site noting the visit address and cookies recording pages viewed happen in the background, so they are passive.',
    }),
    sl('check', 'Quick check: kinds of footprint', {
      b: 'Fill in the blank.',
      chk: 'fb_active',
      n: 'Remember what makes a footprint active.',
    }),
    sl('concept', 'Digital society and netizens', {
      b: 'A **netizen** is a member of the online community, with **rights** and matching **responsibilities**.',
      v: vNetizen,
      n: 'Netizen joins the words net and citizen. A netizen has rights, such as access to information and privacy, and each right comes with a responsibility. We check facts before sharing, respect the privacy of others, express views politely, and protect data, our own and other people\'s.',
    }),
    sl('concept', 'Net, communication and social media etiquette', {
      b: '**Netiquette** is the set of accepted rules of polite behaviour online.',
      v: vEtiquette,
      n: 'Netiquette means polite and responsible behaviour online. In e-mail and chat, use a clear subject and polite words, and avoid shouting in capital letters. On social media, think before posting, ask before sharing someone else\'s photo, and do not spread unverified news.',
    }),
    sl('concept', 'Data protection and privacy', {
      b: '**Data privacy** is control over how personal information is collected, used and shared.',
      v: vPrivacy,
      n: 'Privacy means controlling who can see and use your personal information. Passwords and one time codes must never be shared. Birth date, address and school should stay out of public profiles. Use privacy settings for photos, and switch off location sharing where it is not needed.',
    }),
    sl('concept', 'Safe online behaviour', {
      b: 'Build a small **habit of checking** before every share.',
      v: vSafe,
      n: 'A short routine keeps you safe. Pause before you post. Check the source of what you are sharing. Check who can see it. Then either share it or keep it private. Remember that deleting a post later does not remove copies that others have saved.',
    }),
    sl('check', 'Quick check: before sharing', {
      b: 'Put the steps in order.',
      chk: 'ord_post',
      n: 'Think about what comes first, checking the message or forwarding it.',
    }),
    sl('concept', 'Intellectual property rights', {
      b: '**Intellectual property** is the creation of the mind; the law gives its creator rights over it.',
      v: vIPR3,
      n: 'Intellectual property means creations of the mind. Copyright protects original creative work such as books, songs and program code. A patent protects a new and useful invention for a limited period. A trademark protects the name, logo or symbol that tells buyers which maker a product comes from.',
    }),
    sl('example', 'Worked example 2: which right fits?', {
      b: 'Match the situation to **copyright**, **patent** or **trademark**.',
      v: vWhich,
      n: 'Look at what is being protected. A poem and the code of a game are creative works, so copyright applies. A new device that solves a problem is an invention, so a patent fits. A logo that identifies a shop\'s goods is a trademark.',
    }),
    sl('concept', 'Violation of IPR', {
      b: 'Using protected work without permission or credit is a **violation**.',
      v: vViol,
      n: 'There are three common violations. Plagiarism is presenting another person\'s work or ideas as your own without credit. Copyright infringement is copying, sharing or selling a protected work without permission. Trademark infringement is using a mark that is identical or confusingly similar to another maker\'s mark.',
    }),
    sl('check', 'Quick check: spot the violation', {
      b: 'Choose the correct term.',
      chk: 'm_plag_scn',
      n: 'The student used another person\'s words without naming the source.',
    }),
    sl('concept', 'Proprietary and free and open source software', {
      b: 'In **free and open source software** the word free is about **freedom**, not price.',
      v: vOSS,
      n: 'Proprietary software is owned by a person or company, keeps its source code closed and limits copying and changing through its licence. Free and open source software makes the source code available and allows you to use, study, change and share it. Free here means freedom, and it need not mean zero cost.',
    }),
    sl('concept', 'Software licences: GPL and Apache', {
      b: 'A **licence** states what a user may do with software.',
      v: vLic,
      n: 'A licence tells users what they may do. The GPL is a copyleft licence: if you share a changed version, you must share it under the same licence with its source code. The Apache licence is permissive: you may use the code even inside a closed product, if you keep the notices and give credit.',
    }),
    sl('concept', 'Creative Commons licences', {
      b: 'Creative Commons lets creators allow some uses of their **creative work** in advance.',
      v: vCC,
      n: `Creative Commons licences are built from ${W(CC.length)} elements. BY asks users to credit the creator. SA, share alike, asks that new versions carry the same licence. NC, non commercial, forbids use for profit. ND, no derivatives, allows only unchanged copies. They are meant for creative works more than for software.`,
    }),
    sl('example', 'Worked example 3: reading a licence', {
      b: 'Read two licence codes: **BY-NC-SA** and **BY-ND**.',
      v: vCCread,
      n: 'Take each element in turn. With BY, NC and SA you must credit the creator, you may not use it for profit, you may remix it, and your new version must carry the same licence. With BY and ND you must credit, you may not change it, but unchanged copies may be used even commercially.',
    }),
    sl('check', 'Quick check: Creative Commons', {
      b: 'Match each element with its meaning.',
      chk: 'mt_cc',
      n: 'Recall what each of the four letter codes asks of the user.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Footprints are active or passive. A netizen follows etiquette and protects privacy. Copyright, patent and trademark protect creations, and plagiarism and infringement violate them. Software may be proprietary or open source, and licences such as the GPL, Apache and Creative Commons state what users may do.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Give **one example** with each footprint, right or violation you define.',
        'Name the **right that fits** a situation: creative work, invention or identifier.',
        'Remember that **free** in open source means freedom, not zero price.',
        'Explain each Creative Commons element by what it **asks of the user**.',
        'State copyleft (GPL) and permissive (Apache) as **different rules for shared changes**.',
      ],
      n: 'Some advice for the exam. Give an example with every definition. When a situation is described, name the right that fits. Remember that free in open source means freedom. Explain each Creative Commons element by what it asks of the user, and keep the GPL and Apache licences apart.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Society, Law and Ethics — Part 2: Cyber Crime, the IT Act, E-waste and Technology in Society',
  goals: [
    'Identify cyber crimes and the kinds of malware, and describe safe browsing, identity protection and confidentiality',
    'State the purpose and scope of the Information Technology Act, 2000 (amended 2008)',
    'Explain e-waste management, health effects of technology use, and gender and disability issues',
  ],
  slides: [
    sl('title', 'Cyber crime, the law and technology in society', {
      b: 'Part 2 — **threats**, **protection** and **responsible use of technology**.',
      v: vRoute2,
      n: 'In this part we meet the common cyber crimes and the malware behind many of them, learn how to stay safe, and see how the Information Technology Act deals with cyber offences. We end with the effects of technology on the environment, on health and on fairness in society.',
    }),
    sl('concept', 'Cyber crimes at a glance', {
      b: 'A **cyber crime** is an offence in which a computer, a network or data is the target or the tool.',
      v: vCrimes,
      n: 'Cyber crime is an offence carried out using computers or networks. Hacking is unauthorised entry. Eavesdropping is secretly capturing data in transit. Phishing and fraud e-mails trick people. Ransomware locks files for payment. Trolling and bullying hurt people with offensive or repeated messages.',
    }),
    sl('concept', 'Hacking and eavesdropping', {
      b: 'Hacking is a crime when it is done **without permission**.',
      v: vHack,
      n: 'Hacking means gaining access to a system. An ethical hacker has the owner\'s permission and tests a system to find weaknesses so that they can be fixed. A malicious hacker has no permission and steals, damages or misuses data. Eavesdropping secretly captures data as it travels, for example on an open Wi-Fi network.',
    }),
    sl('concept', 'Phishing and fraud e-mails', {
      b: '**Phishing** is a fake message or page that imitates a trusted sender to steal details.',
      v: vPhish,
      n: 'Phishing uses a fake message or page that imitates a trusted sender. Watch for an address with a small spelling change, a threat or deadline, a request for a password or one time code, or a strange link. Fraud e-mails also promise prizes and ask for a fee.',
    }),
    sl('example', 'Worked example 1: spotting the signs', {
      b: 'A message from a shop says you won a prize and must pay a small fee today.',
      v: vSpot,
      n: 'Read the message clue by clue. The misspelt sender address shows imitation. The fee to claim a prize is a fraud. The demand to act within the hour is false urgency. A request for your card number and code is something genuine firms never make by message. Do not reply, and report it.',
    }),
    sl('check', 'Quick check: which malware?', {
      b: 'Choose the correct term.',
      chk: 'm_ransom_scn',
      n: 'Files are locked and a payment is demanded.',
    }),
    sl('concept', 'Ransomware, cyber trolls and cyber bullying', {
      b: 'Some cyber crimes hurt **files**, others hurt **people**.',
      v: vRTB,
      n: 'Ransomware holds files hostage, so keep backups away from the computer. A cyber troll posts provocative or offensive messages to upset people, so do not feed it, block and report. Cyber bullying is repeated online harassment, so save the evidence, block the sender and tell a trusted adult.',
    }),
    sl('concept', 'Malware', {
      b: '**Malware** is harmful software. Know how each kind behaves.',
      v: vMalware,
      n: 'Malware means harmful software. A virus attaches to files and spreads when they are run or shared. A worm copies itself across a network on its own. A Trojan hides harm inside a useful looking program. Adware shows unwanted advertisements, and spyware secretly watches and reports what you do.',
    }),
    sl('check', 'Quick check: kinds of malware', {
      b: 'Match each malware with its behaviour.',
      chk: 'mt_malware',
      n: 'Think about which one needs a host file and which one travels by itself.',
    }),
    sl('concept', 'Cyber safety', {
      b: 'Three ideas keep a user safe: **safe browsing**, **identity protection** and **confidentiality**.',
      v: vSafety,
      n: 'Safe browsing means checking the address and the secure connection, and downloading only from trusted places. Identity protection means never sharing passwords, one time codes or identity numbers. Confidentiality means information is seen only by those who are authorised, which we support with privacy settings.',
    }),
    sl('check', 'Quick check: is antivirus enough?', {
      b: 'True or false?',
      chk: 'tf_antivirus',
      n: 'Think about whether software alone can stop a user from being tricked.',
    }),
    sl('concept', 'The Information Technology Act, 2000', {
      b: 'India\'s **IT Act, 2000** (amended in 2008) gives a legal frame for electronic transactions and cyber offences.',
      v: vITAct,
      n: 'The Information Technology Act of two thousand, amended in two thousand eight, has several purposes. It gives legal recognition to electronic records and digital signatures. It defines cyber offences and penalties. And it provides adjudication of disputes, with appeals to an appellate tribunal.',
    }),
    sl('example', 'Worked example 2: which purpose applies?', {
      b: 'Link each situation to a **purpose** of the Act.',
      v: vITScn,
      n: 'A supplier accepting an order signed with a digital signature shows legal recognition of electronic records. Someone entering a company system without permission is a cyber offence. A dispute decided by an officer, then appealed, is adjudication and appeal. We describe the Act by purpose and not by section number.',
    }),
    sl('concept', 'E-waste: hazards and management', {
      b: '**E-waste** is discarded electrical and electronic equipment. Burning or dumping it is **harmful**.',
      v: vEwaste,
      n: 'E-waste is discarded electronic equipment such as old computers and phones. It contains toxic substances, so burning it pollutes the air and dumping it can contaminate soil and water. Manage it by reducing purchases, reusing devices, and recycling through authorised recyclers.',
    }),
    sl('example', 'Worked example 3: a school lab clear-out', {
      b: `A lab has **${LAB.total}** old computers. ${LAB.reuse} go to a village library and ${LAB.recycle} to an authorised recycler. How many are left?`,
      v: vLab,
      n: `The lab has ${LAB.total} old computers. ${LAB.reuse} working ones are reused, which is the first choice. ${LAB.recycle} beyond repair go to an authorised recycler. The remaining ${LAB.rest} are kept as spare parts. The three parts add up to the whole, and nothing is burnt or dumped.`,
    }),
    sl('check', 'Quick check: the three Rs', {
      b: 'Fill in the blank.',
      chk: 'fb_3r',
      n: 'Recall the middle word between reduce and recycle.',
    }),
    sl('concept', 'Health and technology', {
      b: 'Heavy use of screens can affect the **eyes**, **muscles**, **posture** and **habits**.',
      v: vHealth,
      n: 'Long use of devices can cause digital eye strain, repetitive strain injury in the wrists and fingers, and back and neck pain from poor posture. Overuse can also become internet addiction. Take breaks, set up a comfortable position, and keep time for sleep, study and play.',
    }),
    sl('concept', 'Technology and society: gender and disability', {
      b: 'Technology should be **open to all**, whatever their gender or ability.',
      v: vInclude,
      n: 'Technology should be open to everyone. Girls should get equal chances in computer clubs, and stereotypes must be challenged. Students with disabilities need accessible design, such as screen readers, alternative text and captions, which are examples of assistive technology. Access to devices must be fair too.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Cyber crimes include hacking, eavesdropping, phishing, ransomware, trolling and bullying. Malware includes viruses, worms, Trojans, adware and spyware. Safe browsing, identity protection and confidentiality reduce risk. The IT Act gives legal recognition, defines offences and provides adjudication. E-waste needs reduce, reuse and recycle, and technology must be healthy and inclusive.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the crime from the **scenario clues**: fake sender, locked files, repeated messages.',
        'Separate **virus** (needs a host file) from **worm** (spreads by itself) and **Trojan** (disguised).',
        'Describe the IT Act by **purpose**; do not quote section numbers or penalties.',
        'Never recommend burning or dumping e-waste: say **authorised recycler**.',
        'Pair every health problem with a **remedy**.',
      ],
      n: 'Some advice for the exam. Read the clues in a scenario before you name the crime. Keep virus, worm and Trojan apart. Describe the IT Act by its purpose and do not quote section numbers. For e-waste always say authorised recycler, and give a remedy with every health problem.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Society, Law and Ethics — Notes',
  sections: [
    {
      h: '1. Digital footprints, netizens and safe behaviour',
      t: 1,
      b: 'A **digital footprint** is the trail of data a person leaves online. The **active** footprint is made of what the user submits on purpose: posts, comments, e-mails sent and forms filled in. The **passive** footprint is collected in the background: the IP address, browsing history gathered by cookies, device details and location data.\n\nA **netizen** is a member of the online community, with rights (information, privacy, expression, safety) and matching responsibilities. **Netiquette** covers net etiquette in general, **communication etiquette** (polite, clear e-mail and chat; no shouting in capital letters) and **social media etiquette** (think before posting, ask before sharing others\' photos, avoid rumours).\n\n**Data protection and privacy:** keep passwords and OTPs secret, keep birth date, address and school out of public profiles, use privacy settings, and be careful on public Wi-Fi. A deleted post may survive in copies, so think before you post.',
      terms: [
        ['Digital footprint', 'The trail of data left by a person\'s online actions.'],
        ['Netiquette', 'Accepted rules of polite and responsible behaviour online.'],
        ['Data privacy', 'The right to control how one\'s personal information is collected, used and shared.'],
      ],
      v: vFootprint,
      vs: [vNetizen, vEtiquette, vPrivacy, vSafe],
    },
    {
      h: '2. Intellectual property rights and their violation',
      t: 2,
      b: `**Intellectual property** is a creation of the mind. The law gives its creator rights, of ${W(IPR.length)} main kinds:\n- **Copyright** protects original creative works (writing, music, art, films, program code), and arises as soon as the work is created.\n- **Patent** protects a new, useful invention for a limited period.\n- **Trademark** protects a name, logo or symbol that identifies the maker of goods or services.\n\nViolations: **plagiarism** (presenting another's work or ideas as your own without credit), **copyright infringement** (copying, sharing or selling a protected work without permission, as in software piracy) and **trademark infringement** (using an identical or confusingly similar mark). Quoting with credit, or writing in your own words and naming the source, avoids plagiarism.`,
      terms: [
        ['Copyright', 'The right over an original creative work.'],
        ['Patent', 'An exclusive right, for a limited period, over a new and useful invention.'],
        ['Trademark', 'A name, logo or symbol that identifies the source of goods or services.'],
        ['Plagiarism', 'Presenting someone else\'s work or ideas as one\'s own, without credit.'],
      ],
      v: vIPR3,
      vs: [vWhich, vViol],
    },
    {
      h: '3. Open source software and licensing',
      t: 2,
      b: '**Proprietary software** is owned by a person or company, its source code is kept closed, and its licence limits copying, changing and sharing. In **free and open source software (FOSS)** the source code is open and users may use, study, change and share it; free means freedom, not necessarily no price.\n\nA **licence** states what a user may do. The **GPL** is a copyleft licence: changed versions that are shared must carry the same licence and source code. The **Apache licence** is permissive: the code may be used, even in closed products, if notices and credit are kept.\n\n**Creative Commons** licences let creators allow some uses of creative works in advance. The elements are **BY** (give credit), **SA** (ShareAlike: new versions under the same licence), **NC** (no commercial use) and **ND** (NoDerivatives: unchanged copies only). SA and ND cannot be combined, because SA concerns new versions and ND forbids them.',
      terms: [
        ['FOSS', 'Software whose source code is open to use, study, change and share.'],
        ['Copyleft', 'A licence rule that passes the same freedoms on to every shared version.'],
        ['Creative Commons', 'A set of licences, built from BY, SA, NC and ND, for sharing creative works.'],
      ],
      v: vOSS,
      vs: [vLic, vCC, vCCread],
    },
    {
      h: '4. Cyber crime, malware and cyber safety',
      t: 3,
      b: '**Hacking** is unauthorised access (an ethical hacker works with the owner\'s permission). **Eavesdropping** is secretly capturing data in transit. **Phishing** and **fraud e-mails** use fake messages to steal details or money; signs are a misspelt sender, urgency, requests for passwords or OTPs and strange links. **Ransomware** locks files for payment; offline backups are the remedy. A **cyber troll** posts provocative or offensive messages to upset people. **Cyber bullying** is repeated online harassment.\n\n**Malware** is harmful software: a **virus** attaches to files and spreads when they are run or shared; a **worm** copies itself across a network on its own; a **Trojan** is disguised as useful software; **adware** shows unwanted advertisements; **spyware** secretly watches the user.\n\n**Cyber safety:** safe browsing (check the address and secure connection, download from trusted places, keep antivirus updated), identity protection (never share passwords, OTPs or ID numbers) and confidentiality (information seen only by authorised people).',
      terms: [
        ['Phishing', 'A fake message or page imitating a trusted sender to steal details.'],
        ['Malware', 'Software designed to harm a computer or its user.'],
        ['Confidentiality', 'Keeping information accessible only to those who are authorised.'],
      ],
      v: vCrimes,
      vs: [vHack, vPhish, vRTB, vMalware, vSafety],
    },
    {
      h: '5. The Information Technology Act, 2000',
      t: 3,
      b: 'The **Information Technology Act, 2000** of India, amended in **2008**, gives a legal frame for the digital world. Its purposes are to give **legal recognition** to electronic records and digital signatures, so that online contracts and e-governance are valid; to define **cyber offences** such as unauthorised access and misuse of data and to provide for penalties; and to provide **adjudication** of disputes and **appeal** to a tribunal (the Act set up the Cyber Appellate Tribunal; since 2017 its work has been done by the Telecom Disputes Settlement and Appellate Tribunal).\n\nFor examinations, describe the Act by its purpose and scope. Section numbers, amounts of penalties and terms of punishment are not needed.',
      terms: [
        ['IT Act', 'The Indian law of 2000, amended in 2008, covering electronic records, digital signatures and cyber offences.'],
        ['Digital signature', 'An electronic way of signing that shows who sent a record and that it was not changed.'],
      ],
      v: vITAct,
      vs: [vITScn],
    },
    {
      h: '6. E-waste, health and technology in society',
      t: 4,
      b: '**E-waste** is discarded electrical and electronic equipment. It holds toxic substances such as lead and mercury; burning it pollutes the air and dumping it can contaminate soil and water. Manage it by the **three Rs**: **reduce** purchases, **reuse** and repair devices, **recycle** through **authorised recyclers**.\n\n**Health:** digital eye strain (breaks; look at far objects), repetitive strain injury (rest, stretch, natural wrist position), back and neck pain (supported back, screen at eye level) and internet addiction (time limits, offline hobbies).\n\n**Technology and society:** girls and boys should have equal chances in computing; students with disabilities need accessible design and **assistive technology** (screen readers, captions, alternative text, speech input); fair access to devices matters too.',
      terms: [
        ['E-waste', 'Discarded electrical and electronic equipment.'],
        ['Assistive technology', 'Devices and software that help people with disabilities to use technology.'],
        ['Inclusive design', 'Designing so that people of different abilities and backgrounds can use a product.'],
      ],
      v: vEwaste,
      vs: [vLab, vHealth, vInclude],
    },
  ],
  tips: '**Common mistakes**\n- Calling data that the user did not submit an active footprint.\n- Saying open source software must be free of cost.\n- Mixing the three rights: invention (patent), creative work (copyright), identifier of goods (trademark).\n- Confusing a virus (needs a host file) with a worm (spreads by itself) or a Trojan (disguised).\n- Quoting section numbers or penalties of the IT Act from memory, or inventing cases.\n- Suggesting that e-waste can be burned or put in ordinary garbage.\n\n**How marks are usually awarded**\n- Definitions and differences (2 marks): one point each, with an example.\n- Scenario items: naming the crime or right, then the reason from the clues.\n- Long answers: one mark for each idea explained with an example or remedy, so give a heading for each.\n- Case-based items: short answers that use words from the passage.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a **digital footprint**?', 'The trail of data a person leaves through online actions.', 'definition', 1],
  ['What is an **active** digital footprint?', 'Data the user knowingly submits: posts, comments, e-mails sent, forms filled in.', 'concept', 1],
  ['What is a **passive** digital footprint?', 'Data collected without the user acting: IP address, cookies, device and location data.', 'concept', 1],
  ['Who is a **netizen**?', 'A member of the online community, with rights and responsibilities.', 'definition', 1],
  ['What is **netiquette**?', 'Accepted rules of polite and responsible behaviour on the internet.', 'definition', 1],
  ['Give one rule of **communication etiquette**.', 'Use polite, clear words; avoid typing in all capital letters, which reads as shouting.', 'exam-tip', 1],
  ['Give one rule of **social media etiquette**.', 'Think before posting, and ask before sharing another person\'s photo.', 'exam-tip', 1],
  ['What is **data privacy**?', 'Control over how personal information is collected, used and shared.', 'definition', 1],
  ['Does deleting a post remove every copy?', '**No.** Others may have saved, shared or archived it.', 'exam-tip', 1],
  [`Name the ${W(IPR.length)} kinds of **IPR**.`, 'Copyright, patent and trademark.', 'fact', 2],
  ['What does **copyright** protect?', 'Original creative works such as writing, music, art, films and software code.', 'concept', 2],
  ['What does a **patent** protect?', 'A new and useful invention, for a limited period.', 'concept', 2],
  ['What does a **trademark** protect?', 'A name, logo or symbol that identifies the maker of goods or services.', 'concept', 2],
  ['What is **plagiarism**?', 'Presenting another person\'s work or ideas as your own, without credit.', 'definition', 2],
  ['What is **copyright infringement**?', 'Copying, sharing or selling a protected work without permission (for example, software piracy).', 'definition', 2],
  ['What is **trademark infringement**?', 'Using a mark that is identical or confusingly similar to another maker\'s mark.', 'definition', 2],
  ['What does **free** mean in free and open source software?', 'Freedom to use, study, change and share; it does not always mean zero cost.', 'concept', 2],
  ['How does the **GPL** differ from the **Apache** licence?', 'GPL is copyleft (shared changes keep the GPL); Apache is permissive (use even in closed products with notices kept).', 'concept', 2],
  [`The ${W(CC.length)} **Creative Commons** elements`, 'BY (credit), SA (same licence for new versions), NC (no commercial use), ND (unchanged copies only).', 'fact', 2],
  ['What is **phishing**?', 'A fake message or page imitating a trusted sender to steal details or money.', 'definition', 3],
  ['What is **ransomware**?', 'Malware that locks files and demands payment; offline backups are the remedy.', 'definition', 3],
  ['What is **eavesdropping**?', 'Secretly capturing data while it travels over a network.', 'definition', 3],
  ['Define **cyber bullying**.', 'Repeated online harassment of a person through messages, comments or pictures.', 'definition', 3],
  ['**Virus** versus **worm**', 'A virus needs a host file; a worm copies itself across a network on its own.', 'concept', 3],
  ['What is a **Trojan**?', 'Harmful software disguised as a useful program.', 'definition', 3],
  ['What do **adware** and **spyware** do?', 'Adware shows unwanted advertisements; spyware secretly watches and reports user activity.', 'concept', 3],
  ['Main purposes of the **IT Act, 2000** (amended 2008)', 'Legal recognition of electronic records and digital signatures; cyber offences and penalties; adjudication and appeal.', 'fact', 3],
  ['What are the three Rs of **e-waste**?', 'Reduce, reuse and recycle (through authorised recyclers).', 'fact', 4],
  ['Why is burning e-waste harmful?', 'It gives off toxic fumes and leaves metals that pollute air, soil and water.', 'concept', 4],
  ['What is **assistive technology**?', 'Devices and software, such as screen readers and captions, that help people with disabilities use technology.', 'definition', 4],
]);
assert.equal(FC.cards.length, 30);

// ---------------------------------------------------------------- tests (cbse-11-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Society, Law and Ethics',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_tm_scn', 'm_phish_scn', 'm_recycler', 'ar_active_passive'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s2_active_passive', 's2_phish_signs', 's3_cc_licence'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l_citizen', 'l_cybercrime'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_phish'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Society, Law and Ethics',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_active_fp', 'm_caps', 'm_copyright_what', 'm_gpl', 'm_eaves', 'm_trojan_scn', 'm_bully_scn', 'm_ewaste_hazard', 'ar_copyright', 'ar_ransom'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s2_privacy_steps', 's2_foss_prop', { attempt: 1, keys: ['s2_itact', 's2_3r'] }, 's3_social_etiquette', { attempt: 1, keys: ['s3_itact_scope', 's3_ewaste_hazard'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_ipr', { attempt: 1, keys: ['l_cybersafety_itact', 'l_ewaste_health'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_licence', 'cb_ewaste'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of cbse-11-computer-science-ch08 (digital footprints and etiquette, IPR and licensing, cyber crime and the IT Act, e-waste, health and inclusion)',
    originality: 'every scenario written for this chapter by SOYL with imagined people, schools, shops and messages; no textbook, NCERT or board-paper item reused; no real incident or court case',
    execution: 'theory chapter with no programs; every count and sum in the chapter is derived from constants asserted in questions.mjs',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
