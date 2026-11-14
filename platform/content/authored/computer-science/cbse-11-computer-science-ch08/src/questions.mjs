// CBSE 11 Computer Science, ch08 Society, Law and Ethics — question bank, part 1 (topics t01 and t02). Theory chapter: no
// programs. Every scenario is imagined by SOYL (invented students, schools and shops); no real person, brand, company or
// incident is named, and no section number, penalty or sentence of any law is quoted. Every number stated in an item is
// derived from the constants below and asserted in JavaScript, never typed by hand.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from './lib.mjs';

/** A number written in words, so that every count in prose comes from the data and not from the author's hand. */
export const W = (n) => ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][n];
export const ic = (s) => '`' + s + '`';
export const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
export const mdTable = (headers, rows) =>
  [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((r) => r.map(String).join(' | ')).map((r) => `| ${r} |`)].join('\n');

// ---------------------------------------------------------------- data behind the numbers in the chapter
/** The four elements of a Creative Commons licence: [code, name, what it requires]. */
export const CC = [
  ['BY', 'Attribution', 'give credit to the creator'],
  ['SA', 'ShareAlike', 'release new versions under the same licence'],
  ['NC', 'NonCommercial', 'do not use the work for commercial gain'],
  ['ND', 'NoDerivatives', 'share only unchanged copies'],
];
assert.equal(CC.length, 4);
assert.deepEqual(CC.map((c) => c[0]), ['BY', 'SA', 'NC', 'ND']);
/** The three kinds of intellectual property right in the syllabus. */
export const IPR = ['copyright', 'patent', 'trademark'];
assert.equal(IPR.length, 3);
/** The kinds of IPR violation named in the syllabus. */
export const VIOL = ['plagiarism', 'copyright infringement', 'trademark infringement'];
assert.equal(VIOL.length, 3);
/** A school lab clears out old computers (case item and worked example). */
export const LAB = { total: 48, reuse: 18, recycle: 20 };
LAB.rest = LAB.total - LAB.reuse - LAB.recycle;
LAB.reusePct = (LAB.reuse * 100) / LAB.total;
assert.equal(LAB.rest, 10);
assert.equal(LAB.reusePct, 37.5);
assert.equal(LAB.reuse + LAB.recycle + LAB.rest, LAB.total);
/** The 20-20-20 screen-break habit: every 20 minutes look 20 feet away for 20 seconds. */
export const BREAK = { every: 20, session: 120 };
BREAK.count = BREAK.session / BREAK.every;
assert.equal(BREAK.count, 6);
assert.ok(Number.isInteger(BREAK.count));

// ================================================================ t01 digital footprints, netiquette, privacy
Q('m_active_fp', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of the following creates an **active** digital footprint?',
  opts: distinct([
    'Writing and posting a comment on the school discussion board',
    'A website recording the type of device that was used to visit it',
    'A map app noting the places a phone has been to in the background',
    'A search engine keeping a log of the pages that were opened from its results',
  ]),
  sol: 'An active footprint is left by what the user knowingly submits, such as a typed and posted comment. Device details, background location and search logs are collected without the user doing anything on purpose, so they are passive.',
}));
Q('m_passive_fp', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Kavya opens a stories website on her tablet without logging in or typing anything. Later she keeps seeing advertisements on other sites about the same stories. The data that made this possible belongs to her',
  opts: distinct(['passive digital footprint', 'active digital footprint', 'digital signature', 'public domain work']),
  sol: 'She submitted nothing herself; the site and its cookies gathered her visit details automatically. Data collected in this way without a deliberate action forms the passive part of a footprint.',
}));
Q('m_netizen', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A **netizen** is best described as',
  opts: distinct([
    'a member of the online community who has rights and responsibilities while using the internet',
    'a government officer who decides which websites may be opened',
    'a program that guards a network from outside attacks',
    'a company that sells internet connections to homes',
  ]),
  sol: 'The word joins net and citizen: someone who takes part in online life and is expected to behave responsibly, just as a citizen does in society.',
}));
Q('m_caps', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Arjun types an entire message to the class group in capital letters, with many exclamation marks, to demand the homework. Which etiquette has he mainly ignored?',
  opts: distinct([
    'Communication etiquette, since capital letters read as shouting and the tone is rude',
    'Trademark rules, since he has misused a brand name',
    'Data protection rules, since he has shared a password',
    'Licensing rules, since he has copied a program',
  ]),
  sol: 'Courteous wording and a calm tone are the basics of communication etiquette. Nothing in the message concerns a brand, a password or a software licence.',
}));
Q('m_share_photo', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Meera has a picnic photo in which several classmates are clearly visible, and she wants to put it on her public account. The most responsible step is to',
  opts: distinct([
    'ask the classmates for permission, and crop or leave out anyone who does not agree',
    'post it, because she clicked the photo and so everyone in it has agreed',
    'post it only if she expects it to collect a lot of likes',
    'post it with a line saying that anyone may copy it',
  ]),
  sol: 'Taking a photograph does not give permission to publish other people. Respecting consent, and the privacy of those who say no, is part of good social media behaviour.',
}));
Q('m_wifi', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Dinesh is waiting at a bus stand where a free public Wi-Fi network is available. Which action is the safest?',
  opts: distinct([
    'Avoid signing in to the bank or e-mail account on it, or use his own mobile data for those tasks',
    'Sign in to the bank account, since the network is free and therefore trusted',
    'Switch on file sharing so that nearby friends can reach his phone',
    'Save every password in the browser and use the same one everywhere',
  ]),
  sol: 'Anyone may be able to watch traffic on an open network, so sensitive log-ins should wait for a trusted connection. Sharing files or reusing passwords makes the exposure worse.',
}));

Q('ar_active_passive', ar({
  t: 1, d: 2, c: 'understanding', key: 'b',
  a: 'The e-mails and posts that a user sends form part of the active digital footprint.',
  r: 'The IP address of the device is recorded by the websites that it visits.',
  sol: 'Both statements are true. However, the recorded IP address is a passive trace made without any action by the user, so it does not explain why sent e-mails count as active.',
}));
Q('ar_fp', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'A person can leave a passive digital footprint without typing or posting anything.',
  r: 'Websites and apps can collect details such as visit history and device information in the background.',
  sol: 'Both are true and R gives the reason. Collection in the background happens whether or not the user submits anything, which is exactly what makes the footprint passive.',
}));
Q('tf_delete', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? After you remove a photo from your own profile, every copy that other people saved or shared is removed too.',
  sol: 'Others may already have downloaded, screenshotted or forwarded the photo, and archives may hold it. Removal from one account cannot reach those copies, which is why posts need thought beforehand.',
}));
Q('tf_private', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Browsing in a private window makes a user invisible to the websites visited and to the network provider.',
  sol: 'Private mode mainly stops the browser from keeping history and cookies on that device. Websites, the network and the internet provider can still see the activity.',
}));
Q('fb_active', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Information that a user deliberately shares, such as a photo uploaded to a class page, forms the ___ digital footprint.',
  acc: [['active']],
  sol: 'Deliberately submitted data makes the active footprint; data collected without a deliberate action is the passive footprint.',
}));
Q('mt_terms', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each term that comes up when a class sets rules for its online group with its meaning.',
  pairs: [
    ['Netizen', 'A responsible member of the online community'],
    ['Netiquette', 'Accepted rules of polite behaviour on the internet'],
    ['Digital footprint', 'The trail of data a person leaves while using digital devices'],
    ['Data privacy', 'Control over how personal information is collected and shared'],
  ],
  sol: 'The four terms describe a person, the behaviour expected of that person, the trace left behind and the right to control personal information.',
}));
Q('ord_post', ord({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'A forwarded message in the class group claims that tomorrow\'s exam is cancelled. Arrange the steps of a sensible check before anyone shares it further.',
  items: [
    'Read the whole message and not just its heading',
    'Look for who first published it and whether a trusted source says the same',
    'Think about who may be misled or harmed if the message is false',
    'Forward it only if it is confirmed, or else leave it unshared',
  ]  ,
  sol: 'Reading comes first, then verification, then the thought about harm; the decision to share is last, taken only after the checks.',
}));
Q('s2_active_passive', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Differentiate between an active and a passive digital footprint, with one example of each.',
  model: 'An active footprint is data the user knowingly submits, for example a comment posted on a blog. A passive footprint is data collected without the user taking any action, for example the browsing history that a website stores through cookies.',
  sol: 'One mark for the active footprint with an example and one mark for the passive footprint with an example.',
  scheme: [['Active footprint defined with example', 1], ['Passive footprint defined with example', 1]],
}));
Q('s2_privacy_steps', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Tanya is opening a social media account for the first time. State any two settings or habits that will protect her privacy.',
  model: 'She should set the profile and posts to be visible only to people she knows, and keep a strong password with two-step verification. She may also avoid giving her phone number, address or school timetable in her profile.',
  sol: 'One mark for each valid protective step, with a brief reason or detail. Any two sensible steps are accepted.',
  scheme: [['First valid step', 1], ['Second valid step', 1]],
}));
Q('s3_social_etiquette', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Rohit is the moderator of his school\'s science club group. Write three social media etiquette rules he should display for members, and give a reason for each.',
  model: '1. Think before posting: a post may be copied and cannot be fully recalled.\n2. Do not share unverified news or rumours: they can mislead and cause panic.\n3. Ask before sharing another person\'s photo or details: this respects privacy and consent.\n(Other valid rules: be polite in comments, credit the source of pictures.)',
  sol: 'One mark for each rule that is stated together with a sensible reason.',
  scheme: [['Rule 1 with reason', 1], ['Rule 2 with reason', 1], ['Rule 3 with reason', 1]],
}));
Q('s3_footprint_future', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: 'A school asks Class 11 students to look up their own online footprint before they apply to colleges. Give three reasons why this is a useful exercise.',
  model: '1. Old posts may be seen by an admission panel or employer and could create a poor impression.\n2. The student can find and remove or hide posts or details that are no longer suitable.\n3. It shows how much personal information is public, so privacy settings can be tightened.',
  sol: 'One mark for each distinct, relevant reason. A reason that only repeats an earlier one earns no mark.',
  scheme: [['Reason 1', 1], ['Reason 2', 1], ['Reason 3', 1]],
}));
Q('l_citizen', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Describe how a student who is a responsible netizen should behave online. Refer to communication etiquette, social media etiquette, digital footprint and data protection.',
  model: '**Communication etiquette:** use polite and clear language, avoid capital-letter shouting and abusive words, and reply promptly and respectfully.\n\n**Social media etiquette:** think before posting, do not spread unverified news, take permission before sharing others\' photos and report abuse instead of joining in.\n\n**Digital footprint:** remember that posts, comments and searches leave a trail that can last long, so share only what one would be comfortable to have seen later.\n\n**Data protection:** keep passwords and OTPs private, use strong unique passwords with two-step verification, and keep personal details out of public profiles.\n\nA netizen therefore uses the internet with the same care and respect that a good citizen shows in society.',
  sol: 'Marks are given for the four areas and a concluding link to responsible behaviour.',
  scheme: [['Communication etiquette with detail', 1], ['Social media etiquette with detail', 1], ['Digital footprint explained', 1], ['Data protection measures', 1], ['Link to responsible netizen behaviour', 1]],
}));

const fpPassage = 'Ishaan studies in Class 11 at Hillcrest Public School (an imagined school). He joins a hobby forum for cycle lovers and fills in his full name, birth date and school name on the sign-up form. He posts a photo in his school uniform with the caption "Back from the long ride!" and never opens the privacy settings. The forum also records the phone model and the time he logs in.';
Q('cb_footprint', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about Ishaan\'s account on a hobby forum and answer the questions. *(Imagined student and school, written by SOYL for practice.)*',
  passage: fpPassage,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'c', stem: 'Which of these forms part of Ishaan\'s **passive** digital footprint?', opts: ['The sign-up form that he filled in', 'The photo that he posted', 'The phone model and log-in time recorded by the forum', 'The caption that he typed'], sol: 'The forum noted the phone model and log-in time on its own, without Ishaan submitting them. The form, photo and caption were all entered deliberately and so are active.' })),
    child('b', tf({ t: 1, d: 2, c: 'application', ans: true, stem: 'True or false? Putting his school name together with a photo in uniform makes it easier for a stranger to find where Ishaan studies.', sol: 'Small details such as a school name and a uniform can be joined by a stranger, which is why such details should not be public.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Name two items of information that Ishaan should have kept out of his public profile, with a reason for each.', model: 'His full birth date and his school name should have been left out. Together with his photo they help a stranger identify him and find where he will be, and a birth date is often used to guess passwords.', sol: 'One mark for each item named with its reason.', scheme: [['First item with reason', 1], ['Second item with reason', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two steps that Ishaan can take now to reduce the risk created by his earlier posts.', model: 'He can change the privacy settings so that only approved members see his posts, and he can delete or edit the photo and the personal details in his profile. He should also use a strong password for the forum.', sol: 'One mark for each suitable step.', scheme: [['First step', 1], ['Second step', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 intellectual property, licensing, open source
Q('m_copyright_what', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Copyright is the legal right that protects',
  opts: distinct([
    'original creative works such as writing, music, drawings, films and software code',
    'a new machine or process that is useful and has not been made before',
    'a name or symbol that tells buyers which maker a product comes from',
    'a secret password that opens a protected file',
  ]),
  sol: 'Copyright covers the expression of original creative work. The second description is a patent and the third is a trademark.',
}));
Q('m_tm_scn', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A small bakery puts a distinctive name and logo on its packs so that buyers can tell its biscuits from those of other makers. The kind of intellectual property right meant for this purpose is a',
  opts: distinct(['trademark', 'patent', 'Creative Commons licence', 'digital signature']),
  sol: 'A trademark identifies the source of goods or services. A patent is for inventions, and a Creative Commons licence is a way of sharing creative work.',
}));
Q('m_ipr_scn', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which of these is the most suitable subject for a **patent**?',
  opts: distinct([
    'A new hand-operated water pump that works by a method never used before',
    'A song composed by a school choir for the annual day',
    'A catchy name for a new tuition centre',
    'A short story written for the school magazine',
  ]),
  sol: 'A patent protects a new, useful invention. The song and the story fall under copyright, and the name for the centre would be protected, if at all, as a trademark.',
}));
Q('m_plag_scn', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Nisha copies three paragraphs from an online article into her project and hands it in as her own writing, without naming the source. This act is',
  opts: distinct(['plagiarism', 'trademark infringement', 'patent filing', 'ethical hacking']),
  sol: 'Presenting another person\'s words or ideas as one\'s own, without credit, is plagiarism. It would not be one if the passage were quoted with the source named.',
}));
Q('m_piracy_scn', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A shopkeeper copies a paid educational software on to discs and sells them cheaply without the permission of its makers. This is a case of',
  opts: distinct(['copyright infringement', 'trademark infringement', 'cyber trolling', 'netiquette']),
  sol: 'Copying and selling protected software without the owner\'s permission violates the owner\'s copyright. Software piracy is the common name for it.',
}));
Q('m_cc_nc', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A photographer shares a picture under a licence that has the **NC** element (and BY). Which use of the picture is **not** allowed?',
  opts: distinct([
    'Printing it on posters that a shop sells for profit',
    'Showing it, with credit, on a school noticeboard',
    'Sharing the link with friends, with credit to the photographer',
    'Using it, with credit, in a free class presentation',
  ]),
  sol: 'NC means NonCommercial, so using the work to earn money is outside the licence. The other uses are non-commercial and give credit as BY requires.',
}));
Q('m_gpl', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which statement about the GNU General Public License (GPL) is correct?',
  opts: distinct([
    'Software derived from GPL code must itself be shared under the GPL when it is distributed',
    'It forbids anyone from changing the program\'s source code',
    'It lets a company keep the source code of its changed version secret',
    'It is used only for music and photographs',
  ]),
  sol: 'The GPL is a copyleft licence: freedoms to study, change and share are passed on to every derived version. It is meant for software, not only for creative works.',
}));
Q('m_apache', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A start-up wants to include an open source library in a product that it will sell without releasing its own code. Which type of licence on the library would allow this, as long as the licence notice and credit are kept?',
  opts: distinct(['A permissive licence such as the Apache licence', 'The GPL', 'A Creative Commons licence with the ND element', 'A proprietary licence that bans redistribution']),
  sol: 'Permissive licences such as Apache permit use inside closed products if the notice is kept. The GPL would require the combined work to be shared under the same terms, and a proprietary licence of that kind would forbid the use.',
}));
Q('ar_copyright', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Copyright protects the way an idea is expressed, not the bare idea itself.',
  r: 'Two students who write their own stories on the same idea, without seeing each other\'s work, necessarily infringe each other\'s copyright.',
  sol: 'A is true. R is false: independent creation is not copying, and a shared idea can be expressed in many original ways, so neither student infringes the other.',
}));
Q('ar_oss', ar({
  t: 2, d: 2, c: 'understanding', key: 'd',
  a: 'Open source software is always available free of cost.',
  r: 'The source code of open source software can be studied, changed and shared.',
  sol: 'A is false because open source refers to freedom over the code, not to the price; sellers may charge for it. R is true.',
}));
Q('tf_reword', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Changing a few words of someone else\'s idea and presenting it as your own, without crediting the source, is still plagiarism.',
  sol: 'Plagiarism concerns taking ideas as well as exact words. Only credit to the source, or a truly original contribution, avoids it.',
}));
Q('fb_ipr', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The three main kinds of intellectual property right are copyright, ___ and trademark.',
  acc: [['patent', 'patents']],
  sol: 'A patent protects an invention; copyright protects creative works; a trademark identifies the source of goods or services.',
}));
Q('mt_cc', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each Creative Commons licence element with what it asks of a person who reuses the work.',
  pairs: CC.map(([code, name, req]) => [`${code} (${name})`, req[0].toUpperCase() + req.slice(1)]),
  sol: 'Each element is one condition: credit the creator, share new versions alike, avoid commercial gain, and share only unchanged copies.',
}));
Q('s2_ipr_diff', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Differentiate between a copyright and a patent, giving one example of each.',
  model: 'Copyright protects an original creative work such as a poem or a program\'s code, and it arises when the work is created. A patent protects a new, useful invention, such as a new kind of water filter, and gives its owner exclusive rights for a limited period.',
  sol: 'One mark for each right correctly distinguished with an example.',
  scheme: [['Copyright with example', 1], ['Patent with example', 1]],
}));
Q('s2_plag_avoid', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Dhruv is writing a project report using material from the internet. Give two ways in which he can avoid plagiarism.',
  model: 'He can write the ideas in his own words and name every source he used. If he quotes sentences exactly, he should put them in quotation marks and give the source.',
  sol: 'One mark for each practical way, such as own words, citing sources, or quoting with credit.',
  scheme: [['First way', 1], ['Second way', 1]],
}));
Q('s2_foss_prop', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Write two differences between proprietary software and free and open source software.',
  model: 'Proprietary software keeps its source code secret and its licence restricts copying and changing, whereas open source software makes the source code available. Free and open source software may be modified and redistributed, but proprietary software may not.',
  sol: 'One mark for each valid difference, which must be stated for both kinds of software.',
  scheme: [['Difference about source code', 1], ['Difference about changing or sharing', 1]],
}));
Q('s3_cc_licence', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Anita publishes her nature photographs online under a licence with the elements BY, NC and SA. State in three points what a user may and may not do with them.',
  model: '1. The user must give credit to Anita as the creator (BY).\n2. The user may not use the photographs for commercial gain (NC).\n3. If the user makes a new work from them, it must be released under the same licence (SA).',
  sol: 'One mark for each element explained in terms of what the user must or must not do.',
  scheme: [['BY: credit required', 1], ['NC: no commercial use', 1], ['SA: same licence for new versions', 1]],
}));
Q('s3_infringe', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Name the ${W(VIOL.length)} kinds of IPR violation mentioned in your syllabus and give one imagined example for each.`,
  model: '1. Plagiarism: a student submits a classmate\'s essay as her own.\n2. Copyright infringement: a shop sells unauthorised copies of a paid software.\n3. Trademark infringement: a new tea stall uses a name and font that copy a well-known registered brand to confuse buyers.',
  sol: 'One mark for each violation named with a fitting example.',
  scheme: [['Plagiarism with example', 1], ['Copyright infringement with example', 1], ['Trademark infringement with example', 1]],
}));
Q('l_ipr', long({
  t: 2, d: 3, c: 'understanding', marks: 5,
  stem: 'Explain the three kinds of intellectual property right and what is meant by a violation of each, with an example of every violation.',
  model: '**Copyright** protects original creative works such as books, music, films and software code. Copying or distributing such a work without permission is **copyright infringement**, for example selling pirated software.\n\n**Patent** protects a new and useful invention and gives the inventor exclusive rights for a limited period. Making or selling the invention without the patent holder\'s permission violates the patent.\n\n**Trademark** covers the name, logo or symbol by which buyers recognise who made the goods or services. Using an identical or confusingly similar mark to mislead buyers is **trademark infringement**, for example a shop copying a famous brand\'s name and logo.\n\nSeparately, **plagiarism** is presenting someone else\'s work or ideas as one\'s own without credit.',
  sol: 'Marks are shared among the three rights, their violations with examples, and the mention of plagiarism.',
  scheme: [['Copyright and its violation', 1], ['Patent and its violation', 1], ['Trademark and its violation', 1], ['An example for each violation', 1], ['Plagiarism defined', 1]],
}));
Q('l_licences', long({
  t: 2, d: 5, c: 'evaluation', marks: 5,
  stem: 'A school wants to adopt a free timetable program, improve it and share the improved version with other schools. Compare proprietary software with free and open source software for this need, and explain how the GPL and Apache licences would differ for the improved version.',
  model: '**Proprietary software** keeps its source code closed and its licence limits copying, changing and sharing, so the school could not improve and share it. **Free and open source software** provides the source code and permits studying, changing and redistributing, which suits the school\'s plan.\n\n**GPL (copyleft):** if the school shares its improved version, it must also make the source available under the GPL, so every later user keeps the same freedoms.\n\n**Apache (permissive):** the school may share the version under its own terms, even inside a closed product, provided it keeps the notices and gives credit.\n\nFor a school that wants every other school to enjoy the same freedoms, the GPL is the closer fit; the Apache licence gives more freedom to those who reuse the code.',
  sol: 'Marks for the two kinds of software compared, the GPL consequence, the Apache consequence and a reasoned conclusion.',
  scheme: [['Proprietary software limits improvement and sharing', 1], ['Open source software allows improvement and sharing', 1], ['GPL: same terms and source must pass on', 1], ['Apache: permissive, notice and credit kept', 1], ['Reasoned conclusion', 1]],
}));
Q('cb_licence', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about Tara\'s garden photographs and answer the questions. *(Imagined students and school, written by SOYL for practice.)*',
  passage: 'Tara, a student of Riverside School (an imagined school), photographs the birds in the school garden and publishes the album online under a Creative Commons licence with the elements **BY** and **NC**. Her classmate Veer wants to use one photograph in the free school magazine that goes to parents, and he also thinks of printing another on T-shirts that he will sell at the school fair.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'understanding', fixed: true, key: 'b', stem: 'What does the **BY** element in Tara\'s licence require Veer to do?', opts: ['Release his own work under the same licence', 'Give credit to Tara as the creator', 'Avoid all changes to the photographs', 'Pay Tara a fee for every use'], sol: 'BY is the attribution element: any reuse must name the creator. Same-licence sharing is SA, a ban on changes is ND, and no fee is set by the licence itself.' })),
    child('b', tf({ t: 2, d: 3, c: 'application', ans: false, stem: 'True or false? Because Tara\'s licence has the NC element, Veer may print the photograph on T-shirts and sell them, as long as he credits her.', sol: 'Selling T-shirts is commercial use, which the NC element rules out even when credit is given. The free magazine use remains within the licence.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Say whether Veer may use the photograph in the free school magazine, and state what he must include with it.', model: 'Yes, because the use is non-commercial. He must credit Tara as the creator of the photograph, which is the BY condition, and he should not claim it as his own.', sol: 'One mark for the permission with its reason and one for the credit condition.', scheme: [['Permitted, as non-commercial', 1], ['Credit to Tara required', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Tara now wants nobody to publish edited or cropped versions of her photographs. Which element should she add, and what will it mean for users?', model: 'She should add the ND (NoDerivatives) element. Users could then share only the unchanged photographs, with credit, and could not publish cropped or edited versions.', sol: 'One mark for naming ND and one for explaining its effect.', scheme: [['ND named', 1], ['Effect on users explained', 1]] }),
    ]),
  ],
}));
