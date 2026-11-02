// ICSE 9 History & Civics, ch01 Our Constitution: Meaning, Adoption and Salient Features — question bank.
// Every scenario, village, voters' list, court case and school document is imagined by SOYL and labelled as such;
// no textbook text, box or exercise, no Article text and no specimen or board-paper item is reused (D-036);
// no person is quoted and no current office-holder is named. Civics is an elementary study: Article numbers are
// named only where they help; the wording of the Constitution is paraphrased, never quoted.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- figures used in items (asserted)
export const ADOPTED = Date.UTC(1949, 10, 26);
export const FORCE = Date.UTC(1950, 0, 26);
export const GAP_DAYS = Math.round((FORCE - ADOPTED) / 86400000);
assert.equal(GAP_DAYS, 61);
export const VOTE_OLD = 21;
export const VOTE_NEW = 18;
assert.equal(VOTE_OLD - VOTE_NEW, 3);
export const DUTIES_1976 = 10;
export const DUTIES_NOW = 11;
assert.equal(DUTIES_NOW - DUTIES_1976, 1);
export const FR_NOW = 6;

// ================================================================ t01 Meaning, adoption and enforcement
Q('m_const_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A student council in the imagined town of Kaveripur wants to tell Class 6 pupils what a constitution is. Which description should it use?',
  opts: [
    'The basic law that sets up the organs of government, limits their powers and protects the rights of citizens',
    'A list of the new laws that the legislature passes in a single year',
    'A speech in which the head of state announces the plans of the government',
    'The record of the decisions given by courts in past disputes',
  ],
  sol: 'A constitution is the fundamental law of a country: it creates the organs of government, divides and limits their powers and guarantees rights. A list of yearly laws is ordinary legislation, a speech of plans is a policy statement, and a record of judgments is case law, none of which is the basic framework.',
}));
Q('m_adoption_date', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'On which date did the Constituent Assembly adopt the Constitution of India?',
  opts: ['26 November 1949', '26 January 1950', '15 August 1947', '9 December 1946'],
  sol: '26 November 1949 is the date of adoption, now observed as Constitution Day. 26 January 1950 is the date it came into force, 15 August 1947 is the date of independence, and 9 December 1946 is the date of the first meeting of the Assembly.',
}));
Q('m_why_26jan', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did the framers choose 26 January 1950 as the day on which the Constitution would come into force?',
  opts: [
    'The date recalled the Independence Day that had been observed on 26 January 1930 after the demand for Purna Swaraj',
    'It was the day on which India became independent from British rule',
    'It was the birthday of the President of the Constituent Assembly',
    'It was the day on which the Drafting Committee was first appointed',
  ],
  sol: 'The date was chosen to honour 26 January 1930, observed as Independence Day after the Purna Swaraj resolution. Independence itself came on 15 August 1947; neither a birthday nor the appointment of the Drafting Committee explains the choice.',
}));
Q('m_assembly_first', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In an imagined history quiz, the card reads: the Constituent Assembly of India held its first meeting in December of which year?',
  opts: ['1946', '1947', '1949', '1950'],
  sol: 'The Assembly first met on 9 December 1946. 1947 is the year of independence, 1949 the year of adoption and 1950 the year the Constitution came into force.',
}));
Q('m_drafting', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Who chaired the Drafting Committee of the Constituent Assembly, the committee that prepared the draft of the Constitution?',
  opts: ['Dr B. R. Ambedkar', 'Dr Rajendra Prasad', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel'],
  sol: 'Dr B. R. Ambedkar chaired the Drafting Committee. Dr Rajendra Prasad was the President of the Constituent Assembly itself; the other two leaders were prominent members but did not chair the Drafting Committee.',
}));
Q('m_need_island', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined island state of Tarangia there is no written framework: the ruler decides how long to stay in office, what laws to make and which people may speak in public. Which need of a constitution does this situation show most clearly?',
  opts: [
    'The need to limit the power of rulers and protect the rights of the people',
    'The need to raise more revenue from taxes',
    'The need to choose a national flower and bird',
    'The need to replace all elections by appointments',
  ],
  sol: 'Where one person decides everything, nothing prevents misuse of power, so a constitution is needed to set limits and guarantee rights. Revenue, national symbols and appointments are not the central reason why a country needs a constitution.',
}));
Q('m_date_mixup', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In a Class 9 test paper from the imagined Sunrise School, a pupil writes that the Constitution was adopted and enforced on 26 January 1950. Which correction is accurate?',
  opts: [
    'It was adopted on 26 November 1949 and came into force on 26 January 1950',
    'It was adopted on 26 January 1950 and came into force on 26 November 1949',
    'Both events took place on 15 August 1947',
    'Both events took place on 9 December 1946',
  ],
  sol: 'Adoption and enforcement were two separate events about two months apart: adoption on 26 November 1949 and enforcement on 26 January 1950. The reversed order is impossible, and the two other dates mark independence and the first meeting of the Assembly.',
}));

// ================================================================ t02 Single citizenship
Q('m_single_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'What is meant by single citizenship in India?',
  opts: [
    'Every citizen is a citizen of India only, with no separate citizenship of a State',
    'Only one person in each family can be a citizen',
    'A citizen may live in one State alone for life',
    'Only one language may be used by citizens',
  ],
  sol: 'Single citizenship means one citizenship for the whole country, whichever State a person lives in. It says nothing about family members, residence for life or language.',
}));
Q('m_usa_contrast', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement correctly contrasts India with the United States of America in the matter of citizenship?',
  opts: [
    'In the United States a person is a citizen of the nation and of the State of residence; in India a person is a citizen of India alone',
    'In India a person is a citizen of the Union and of a State; in the United States, of the nation alone',
    'Both countries give their citizens a separate citizenship of every State',
    'Neither country has any rules on citizenship',
  ],
  sol: 'The United States has dual citizenship (national and State), while India has single citizenship. The second option reverses the two systems, the third is true of neither country, and every country has some rules on citizenship.',
}));
Q('m_meera_gujarat', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Meera, born and educated in Assam, takes up a teaching job in Gujarat. Under the Indian Constitution, which statement about her citizenship is correct?',
  opts: [
    'She remains a citizen of India, with no separate citizenship of Gujarat or Assam',
    'She becomes a citizen of Gujarat and loses her citizenship of Assam',
    'She holds the citizenship of Assam as well as the citizenship of India',
    'She must apply to the Gujarat government for fresh citizenship',
  ],
  sol: 'India has single citizenship, so moving between States does not change a citizen\'s status: there is no State citizenship to lose, keep or apply for. The three wrong options all assume a separate State citizenship, which the Constitution does not create.',
}));
Q('m_single_purpose', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'India is a federation of States, yet it has single citizenship. What is the main purpose of this choice?',
  opts: [
    'To promote national unity and a common identity among all citizens',
    'To let each State decide who may be called a citizen',
    'To stop people from moving from one State to another',
    'To weaken the powers of the Union government',
  ],
  sol: 'One citizenship for all tells people in every State that they belong to the same nation and share the same status, which supports unity. It does not let States make their own rules, restrict movement or weaken the Union.',
}));
Q('m_oci_card', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Dev, who lives abroad, holds an Overseas Citizenship of India card. A friend says that India now allows dual citizenship. Which reply is accurate?',
  opts: [
    'The card is not dual citizenship: it gives long-term travel and residence privileges but not the right to vote',
    'The card makes Dev a full citizen of India with the right to vote',
    'The card makes Dev a citizen of an Indian State as well as of his country of residence',
    'The card proves that the United States and India follow the same system',
  ],
  sol: 'India\'s Constitution is built on single citizenship; an Overseas Citizen of India holds a special status that gives certain privileges but not full citizenship, so no vote. The other options wrongly treat the card as full or State citizenship, or as a copy of the American system.',
}));

// ================================================================ t03 Universal Adult Franchise
Q('m_uaf_meaning', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'What is meant by universal adult franchise?',
  opts: [
    'Every adult citizen has the right to vote, without any discrimination of caste, religion, sex, education or wealth',
    'Only educated adults may vote',
    'Only adults who pay taxes may vote',
    'Every resident of the country, of any age, may vote',
  ],
  sol: 'Universal adult franchise gives each adult citizen one vote, whatever the person\'s background. Education and tax conditions would make the franchise limited, and children and non-citizens are not covered.',
}));
Q('m_vote_age', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What is the minimum age at which an Indian citizen can vote in elections to the Lok Sabha and State Assemblies today?',
  opts: ['18 years', '21 years', '25 years', '16 years'],
  sol: 'The voting age is 18 years since 1989, after the 61st Amendment. 21 years was the earlier limit, 25 years is the minimum age for candidates in Lok Sabha elections, and 16 years has never been the voting age.',
}));
Q('m_vote_age_change', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which Constitutional Amendment, passed in 1988, lowered the voting age from 21 to 18 years?',
  opts: ['The 61st Amendment', 'The 42nd Amendment', 'The 44th Amendment', 'The 86th Amendment'],
  sol: 'The 61st Amendment lowered the voting age, with effect from 1989. The 42nd added the Fundamental Duties, the 44th removed the right to property from the list of Fundamental Rights, and the 86th added the duty on education of children.',
}));
Q('m_chandanpur_list', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The voters\' list of the imagined village of Chandanpur names five citizens, all registered and none disqualified by law: Asha (19, graduate), Bilal (17, student), Charan (45, landless labourer), Devika (70, cannot read), and Esha (18, home-maker). Who is entitled to vote?',
  opts: [
    'Asha, Charan, Devika and Esha',
    'Asha and Esha only, because they are young',
    'Asha only, because she has a degree',
    'Charan and Devika only, because they are older',
  ],
  sol: 'Universal adult franchise depends on citizenship and age, not on education, property or sex, so everyone aged 18 or more may vote: Asha, Charan, Devika and Esha. Bilal is 17 and too young. The other options add conditions of age bracket, degree or seniority that the Constitution does not impose.',
}));
Q('m_uaf_reason', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which is the best reason why universal adult franchise strengthens democracy?',
  opts: [
    'Every adult has an equal say in choosing representatives, so the government rests on the consent of all',
    'It makes sure that only experienced people become voters',
    'It reduces the number of elections that must be held',
    'It gives more votes to citizens who pay more taxes',
  ],
  sol: 'Equal votes for all adults make the government answerable to the whole people. Voting is not limited to experienced people, the number of elections does not fall, and richer citizens do not get extra votes.',
}));
Q('m_zarvia_kingdom', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In the imagined kingdom of Zarvia, only men who own land above a fixed size may vote. Which feature of universal adult franchise is most clearly absent?',
  opts: [
    'Political equality of adults regardless of sex and property',
    'The holding of elections at regular intervals',
    'The choice of a written constitution',
    'The right of a citizen to move freely from town to town',
  ],
  sol: 'Barring women and those without land breaks the principle that every adult has an equal vote. Elections may still be regular, the constitution may still be written, and movement is a different matter altogether.',
}));

// ================================================================ t04 Fundamental Rights
Q('m_fr_count', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'As of 2024, how many categories of Fundamental Rights does the Constitution of India contain?',
  opts: ['Six', 'Seven', 'Five', 'Ten'],
  sol: 'There are six categories today. Seven was the number originally, before the right to property was taken out of the list by the 44th Amendment (1978). Five and ten are not correct.',
}));
Q('m_fr_justiciable', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'What does it mean to say that Fundamental Rights are justiciable?',
  opts: [
    'A citizen can approach a court to have them enforced when they are violated',
    'They can be changed by the government by an order',
    'They apply only to judges and lawyers',
    'They are only advice to the government',
  ],
  sol: 'Justiciable means that a court can hear a complaint and enforce the right. They cannot be changed by a mere order, they are not meant only for lawyers, and advice to the government describes non-justiciable guidelines.',
}));
Q('m_mill_workers', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The owner of an imagined brick kiln near Mehsana keeps his workers on the site, makes them labour sixteen hours a day and pays them nothing because of an old debt. Which Fundamental Right is being violated?',
  opts: ['Right against Exploitation', 'Right to Freedom of Religion', 'Cultural and Educational Rights', 'Right to Equality'],
  sol: 'Forced labour and unpaid compulsion fall under the Right against Exploitation. The facts have nothing to do with religion or minority education, and no unequal treatment between groups is described, so equality is not the best answer.',
}));
Q('m_minority_school', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An official of the imagined district of Tarapur orders a school to close only because its managers belong to a linguistic minority that wishes to preserve its own script. Which category of Fundamental Rights would the managers cite?',
  opts: ['Cultural and Educational Rights', 'Right against Exploitation', 'Right to Constitutional Remedies', 'Right to Freedom of Religion'],
  sol: 'Minorities may conserve their language and script and manage their own institutions, so the managers rely on Cultural and Educational Rights. Remedies would be the route for going to court, but the right violated is the cultural and educational one; exploitation and religion are not involved.',
}));
Q('m_caste_restaurant', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The owner of an imagined restaurant in Kaveripur refuses to seat a customer because of the customer\'s caste. Which right is the owner denying?',
  opts: ['Right to Equality', 'Right against Exploitation', 'Cultural and Educational Rights', 'Right to Constitutional Remedies'],
  sol: 'Refusing access to a public place on grounds of caste goes against the Right to Equality, which prohibits discrimination. No labour, minority institution or court action is involved in the facts given.',
}));
Q('m_fr_remedies', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Which Fundamental Right allows a person to move the Supreme Court or a High Court when another Fundamental Right is violated?',
  opts: ['Right to Constitutional Remedies', 'Right to Equality', 'Right to Freedom', 'Right against Exploitation'],
  sol: 'The Right to Constitutional Remedies lets citizens go to the courts to enforce their other rights. The remaining three are rights that may be violated, not the right that gives the way to enforce them.',
}));
Q('m_property_removed', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'As of 2024, which of the following is NOT one of the Fundamental Rights?',
  opts: ['Right to property', 'Right to Freedom of Religion', 'Right against Exploitation', 'Right to Equality'],
  sol: 'The 44th Amendment (1978) removed the right to property from the Fundamental Rights; it is now a legal right under a separate provision. The three other rights are still Fundamental Rights.',
}));
Q('m_fr_not_absolute', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'During a debate in the imagined Riverside School, Anita says that Fundamental Rights are absolute, so she may say anything she likes anywhere. Which reply is accurate?',
  opts: [
    'Rights are subject to reasonable restrictions, for example in the interest of public order, so freedom is not unlimited',
    'She is right, because no law can ever limit a Fundamental Right',
    'She is wrong, because rights apply only on Republic Day',
    'She is right, because courts cannot hear cases about rights',
  ],
  sol: 'The Constitution allows reasonable restrictions on several rights, such as public order and the security of the State, so the claim of an absolute freedom is wrong. Rights apply on every day, and courts can hear cases on them.',
}));

// ================================================================ t05 Fundamental Duties
Q('m_fd_amendment', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'By which Constitutional Amendment were the Fundamental Duties added to the Constitution?',
  opts: ['The 42nd Amendment (1976)', 'The 61st Amendment (1988)', 'The 44th Amendment (1978)', 'The 86th Amendment (2002)'],
  sol: 'The 42nd Amendment of 1976 added the Fundamental Duties. The 61st lowered the voting age, the 44th removed the right to property from the Fundamental Rights, and the 86th added the eleventh duty.',
}));
Q('m_fd_count', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'As of 2024, how many Fundamental Duties are listed in the Constitution?',
  opts: ['Eleven', 'Ten', 'Six', 'Twelve'],
  sol: 'There are eleven, because the 86th Amendment of 2002 added one to the original ten. Ten was the number in 1976, six is the number of Fundamental Rights, and twelve is not correct.',
}));
Q('m_fd_eleventh', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The eleventh Fundamental Duty, added by the 86th Amendment in 2002, concerns which matter?',
  opts: [
    'Parents and guardians providing opportunities for the education of children between six and fourteen years of age',
    'Citizens paying taxes on time',
    'Citizens voting in every election',
    'Citizens serving for two years in the armed forces',
  ],
  sol: 'The eleventh duty asks parents and guardians to give opportunities for education to children aged six to fourteen. Paying taxes, compulsory voting and compulsory military service are not Fundamental Duties.',
}));
Q('m_library_walls', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'A group of students scribble with chalk and tear pages out of books in the new public library of the imagined town of Haripur. Which Fundamental Duty are they neglecting?',
  opts: [
    'The duty to safeguard public property and give up violence',
    'The duty to respect the national anthem',
    'The duty to develop a scientific temper',
    'The duty to value the heritage of a composite culture',
  ],
  sol: 'Damaging a public library breaks the duty to protect public property. The other duties are real but are not the ones directly broken by the described behaviour.',
}));
Q('m_fd_not_enforced', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'How do the Fundamental Duties differ from the Fundamental Rights in the way they work?',
  opts: [
    'They are civic obligations that a citizen cannot directly enforce in court in the way a right is enforced',
    'They can be enforced by the Supreme Court in the same way as the Right to Equality',
    'They apply only to government officers',
    'They apply only to citizens living abroad',
  ],
  sol: 'The Constitution does not provide a direct court remedy to enforce the duties as it does for rights (though Parliament may make laws on some of the matters). They apply to every citizen, in India and abroad.',
}));
Q('m_not_a_duty', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Four pupils of the imagined Greenfield School list what they believe are Fundamental Duties. Which pupil has named something that is NOT in the list of Fundamental Duties?',
  opts: [
    'To vote in every election that is held',
    'To protect and improve the natural environment',
    'To develop scientific temper and spirit of inquiry',
    'To safeguard public property',
  ],
  sol: 'Voting is a civic responsibility and a right, but it is not listed among the Fundamental Duties. Protecting the environment, scientific temper and safeguarding public property are all listed duties.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_26jan', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Constitution of India was brought into force on 26 January 1950 and not on the day it was adopted.',
  r: 'The framers wanted the date to recall 26 January 1930, when Independence Day had been observed after the declaration of Purna Swaraj.',
  sol: 'Both are true, and the reason explains the choice: enforcement was timed to recall the 1930 Independence Day, which is why it came about two months after adoption.',
}));
Q('ar_single', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A citizen of India who lives in Punjab holds a separate citizenship of Punjab in addition to citizenship of India.',
  r: 'In the United States a person is a citizen of the nation and also of the State in which he or she lives.',
  sol: 'A is false because India has single citizenship and no separate State citizenship exists. R is true, since the United States has dual citizenship.',
}));
Q('ar_uaf', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'Universal adult franchise brings political equality among adult citizens.',
  r: 'Every adult citizen has one vote of equal value, whatever his or her wealth, education or sex.',
  sol: 'Both are true, and R explains A: because each adult counts for one vote of equal value, political equality results.',
}));
Q('ar_property', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The right to property was removed from the list of Fundamental Rights by the 44th Amendment in 1978.',
  r: 'The Constitution today lists six categories of Fundamental Rights.',
  sol: 'Both statements are true, but the second only states the count that results after the change; it does not explain why the right to property was removed, so R is not the explanation of A.',
}));
Q('ar_fd_enforce', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Fundamental Duties were added to the Constitution in 1976 by the 42nd Amendment.',
  r: 'The Fundamental Duties can be enforced by a citizen in court in exactly the same way as the Right to Equality.',
  sol: 'A is true. R is false: the Constitution gives a direct remedy only for Fundamental Rights, and the duties are not enforceable in that way.',
}));
Q('ar_rights_duties', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Fundamental Duties complement Fundamental Rights.',
  r: 'Rights can be enjoyed fully only in a society in which citizens also respect the rights of others and the common good.',
  sol: 'Both are true, and R explains A: since every right depends on others respecting it, the duties of citizens are the other side of rights.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_adopt_enforce', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In the history lesson of the imagined Lakeview School, the teacher says that the Constitution of India was adopted and came into force on the same day, 26 January 1950.',
  sol: 'It was adopted on 26 November 1949 and came into force on 26 January 1950, about two months later, so the statement is wrong.',
}));
Q('tf_state_citizenship', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? Sunil, born in Odisha, takes a job in Kerala and must take up Kerala citizenship in addition to his Indian citizenship.',
  sol: 'India has single citizenship: Sunil stays a citizen of India wherever he lives, and no separate State citizenship exists.',
}));
Q('tf_literate', tf({
  t: 3, d: 2, c: 'application', ans: true,
  stem: 'True or false? An 80-year-old citizen of the imagined village of Pipalgaon who cannot read or write is still entitled to vote, provided she is registered.',
  sol: 'Universal adult franchise does not require literacy, property or any other test; an adult citizen on the roll can vote.',
}));
Q('fb_single', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Whichever State she lives in, a citizen of India has only ___ citizenship, and there is no separate citizenship of a State.',
  acc: [['single', 'one']],
  sol: 'India has single citizenship for the whole country.',
}));
Q('fb_age', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The ___ Amendment of 1988 lowered the voting age from 21 to 18, with effect from 1989.',
  acc: [['61st', 'sixty-first', '61']],
  sol: 'The 61st Amendment made 18 the minimum voting age.',
}));
Q('fb_swaran', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'Fundamental Duties were added in 1976 on the recommendation of the ___ Singh Committee.',
  acc: [['Swaran']],
  sol: 'It was the Swaran Singh Committee that recommended the duties.',
}));
Q('mt_fr_cases', match({
  t: 4, d: 2, c: 'application',
  stem: 'Match each imagined situation with the category of Fundamental Rights that applies.',
  pairs: [
    ['Children of one hamlet are not allowed to draw water from the common well of Barauli because of their caste', 'Right to Equality'],
    ['Villagers of Nandgaon are stopped, without any lawful ground, from peacefully printing a pamphlet that criticises a road project', 'Right to Freedom'],
    ['A small community of Dhanipur opens a school to teach and preserve its own script', 'Cultural and Educational Rights'],
    ['A brother asks the High Court to order that a detained man be produced before it', 'Right to Constitutional Remedies'],
  ],
  sol: 'Caste discrimination at a well: equality. A lawful pamphlet stopped without ground: freedom of expression. A school to preserve script: cultural and educational rights. Asking the court to enforce a right: constitutional remedies.',
}));
Q('mt_duties_cases', match({
  t: 5, d: 2, c: 'application',
  stem: 'Match each imagined action of a student with the Fundamental Duty it fulfils.',
  pairs: [
    ['Dhruv stands in respect when the national anthem is played at the sports meet', 'Respect the national anthem'],
    ['Sana plants saplings around her colony and stops using plastic bags', 'Protect and improve the natural environment'],
    ['Imran tests a claim with an experiment before accepting it', 'Develop scientific temper and spirit of inquiry'],
    ['Pooja refuses to laugh at a joke that insults women', 'Renounce practices that are against the dignity of women'],
  ],
  sol: 'Anthem: respect for the anthem. Saplings: protecting the environment. Experiment: scientific temper. Refusing the insulting joke: women\'s dignity.',
}));
Q('ord_timeline', ord({
  t: 1, d: 2, c: 'understanding',
  stem: 'Arrange these events in the order in which they took place.',
  items: [
    'The Constituent Assembly meets for the first time (December 1946)',
    'The Constitution is adopted (26 November 1949)',
    'The Constitution comes into force (26 January 1950)',
    'Fundamental Duties are added by the 42nd Amendment (1976)',
  ],
  sol: 'First meeting 1946, adoption 1949, enforcement 1950, Fundamental Duties 1976.',
}));
Q('ord_amend', ord({
  t: 5, d: 3, c: 'understanding',
  stem: 'Arrange these changes to the Constitution in the order in which they were made.',
  items: [
    'Fundamental Duties are added (1976)',
    'The right to property is removed from the Fundamental Rights (1978)',
    'The voting age is lowered to 18 (effective 1989)',
    'The eleventh Fundamental Duty is added (2002)',
  ],
  sol: 'The 42nd Amendment (1976), the 44th (1978), the 61st (1988, effective 1989) and the 86th (2002).',
}));

// ================================================================ short answers (2 and 3 marks)
Q('s_const_need', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define a constitution and state one reason why a country needs one.',
  model: 'A **constitution** is the **fundamental law** of a country that sets up the organs of government and defines their powers. A country needs one to **limit the power of rulers** and to **protect the rights of citizens**.',
  sol: 'Definition and one reason.',
  scheme: [['Definition of a constitution', 1], ['One need, such as limiting power or protecting rights', 1]],
}));
Q('s_dates', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State the dates on which the Constitution of India was adopted and came into force.',
  model: 'It was **adopted** on **26 November 1949** by the Constituent Assembly. It **came into force** on **26 January 1950**, which is observed every year as Republic Day.',
  sol: 'The two dates, each with its event.',
  scheme: [['Adoption: 26 November 1949', 1], ['Enforcement: 26 January 1950', 1]],
}));
Q('s_why26', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why 26 January was chosen as the day on which the Constitution came into force.',
  model: 'On **26 January 1930** Independence Day had been observed after the demand for **Purna Swaraj**. The framers chose the same date in **1950** to **honour that pledge** and the struggle behind it.',
  sol: 'Link to Purna Swaraj and the 1930 observance.',
  scheme: [['Reference to Purna Swaraj and 26 January 1930', 1], ['Choice made to honour that pledge in 1950', 1]],
}));
Q('s_assembly', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the President of the Constituent Assembly and the chairman of its Drafting Committee.',
  model: '**Dr Rajendra Prasad** was the **President** of the Constituent Assembly, which first met on 9 December 1946. **Dr B. R. Ambedkar** chaired the **Drafting Committee**.',
  sol: 'Two names with their posts.',
  scheme: [['Dr Rajendra Prasad as President', 1], ['Dr B. R. Ambedkar as chairman of the Drafting Committee', 1]],
}));
Q('s_single', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Rahul, born in the imagined town of Bhavnagar, shifts to Chennai for work. Using his case, explain what is meant by single citizenship.',
  model: '**Single citizenship** means that all Indians are citizens of **India alone**, with no separate State citizenship. Rahul stays only a **citizen of India** after moving, and does not gain or lose a State citizenship.',
  sol: 'Meaning plus a suitable example.',
  scheme: [['Meaning of single citizenship', 1], ['Applied correctly to Rahul', 1]],
}));
Q('s_single_dual', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does single citizenship in India differ from the arrangement in the United States of America?',
  model: 'In **India** a person is a citizen of **India only**. In the **United States** a person is a citizen of the **nation** and also of the **State** in which he or she lives, which is **dual citizenship**.',
  sol: 'One line for each country.',
  scheme: [['India: citizenship of the nation only', 1], ['United States: dual citizenship', 1]],
}));
Q('s_uaf', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is universal adult franchise? State the minimum age for voting in India.',
  model: '**Universal adult franchise** gives every **adult citizen** the right to vote, without discrimination of caste, religion, sex, education or wealth. The minimum voting age is **18 years**.',
  sol: 'Meaning and the age.',
  scheme: [['Meaning of universal adult franchise', 1], ['Voting age: 18 years', 1]],
}));
Q('s_vote_age', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'By which amendment, and in which year, was the voting age lowered, and from which age to which?',
  model: 'The **61st Amendment**, passed in **1988**, lowered the voting age from **21 years** to **18 years**; it took effect from **1989**.',
  sol: 'Amendment, year and the two ages.',
  scheme: [['61st Amendment, 1988', 1], ['From 21 to 18 years', 1]],
}));
Q('s_fr_meaning', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why are the Fundamental Rights called fundamental? Mention their justiciable nature.',
  model: 'They are called **fundamental** because they are **essential for the all-round development** of the individual and are guaranteed by the Constitution. They are **justiciable**, so a citizen can **approach a court** if they are violated.',
  sol: 'Fundamental character and justiciable nature.',
  scheme: [['Why they are fundamental', 1], ['Justiciable: enforceable in court', 1]],
}));
Q('s_fr_cats', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the six categories of Fundamental Rights as of 2024.',
  model: 'The six are the Right to **Equality**, the Right to **Freedom**, the Right against **Exploitation**, the Right to **Freedom of Religion**, **Cultural and Educational Rights**, and the Right to **Constitutional Remedies**.',
  sol: 'All six names; two marks if all six, one mark for four or five.',
  scheme: [['Any three correct categories', 1], ['The remaining three categories', 1]],
}));
Q('s_remedies', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A weaver of the imagined town of Kotpur is kept from working at his loom without any lawful reason. Explain how the Right to Constitutional Remedies can help him.',
  model: 'He can **move the Supreme Court or a High Court** because his Fundamental Right has been violated. The court can order that the right be respected, so the right is **enforceable** and not a mere promise.',
  sol: 'Access to courts and why it matters.',
  scheme: [['Citizen can go to the Supreme Court or a High Court', 1], ['Makes other rights enforceable', 1]],
}));
Q('s_property', short({
  t: 4, d: 3, c: 'recall', marks: 2, wl: S2,
  stem: 'Which right was removed from the list of Fundamental Rights, by which amendment and in which year?',
  model: 'The **right to property** was removed by the **44th Amendment** in **1978**. It is now a legal right and no longer a Fundamental Right.',
  sol: 'Right, amendment and year.',
  scheme: [['Right to property', 1], ['44th Amendment, 1978', 1]],
}));
Q('s_fd_origin', short({
  t: 5, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'When and on whose recommendation were the Fundamental Duties added to the Constitution?',
  model: 'They were added in **1976** by the **42nd Amendment**, on the recommendation of the **Swaran Singh Committee**. A duty on the education of children was added later, in 2002.',
  sol: 'Year, amendment and committee.',
  scheme: [['1976 and the 42nd Amendment', 1], ['Swaran Singh Committee', 1]],
}));
Q('s_fd_complement', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The residents of the imagined Lakeside Colony ask every family to keep the shared park clean so that all may enjoy it. Explain how this reflects the way Fundamental Duties complement Fundamental Rights.',
  model: 'Each family\'s **enjoyment** of the park depends on others **respecting** it, so each has a **duty** to the community. This shows that **rights come with responsibilities**.',
  sol: 'Link between rights and duties.',
  scheme: [['Rights depend on others\' respect', 1], ['Duties remind citizens of responsibilities', 1]],
}));
Q('s3_const_need', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three reasons why a country such as the imagined island state of Tarangia needs a constitution.',
  model: '1. It **limits the powers** of rulers so that they cannot act as they please.\n2. It **protects the rights** of citizens against misuse of power.\n3. It **sets up institutions** and rules for making laws and settling disputes, giving the country **stability**.',
  sol: 'Three reasons: limits, rights, institutions.',
  scheme: [['Limits power', 1], ['Protects rights', 1], ['Sets up institutions and gives stability', 1]],
}));
Q('s3_single_unity', short({
  t: 2, d: 2, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how single citizenship helps to promote national unity in a large federation such as India.',
  model: '1. All citizens carry the **same status** wherever they live, so no one is treated as an outsider in another State.\n2. It builds a **common national identity** above regional identities.\n3. It makes **movement and settlement** across States easier, so people of different regions mix and unity grows.',
  sol: 'Same status, common identity, mobility.',
  scheme: [['Same status everywhere', 1], ['Common national identity', 1], ['Ease of movement across States', 1]],
}));
Q('s3_uaf_reasons', short({
  t: 3, d: 2, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons why universal adult franchise strengthens democracy in an imagined constituency such as Madhupur.',
  model: '1. It gives **political equality**: every adult has one vote of equal value.\n2. It makes the government **answerable to all**, so no group can be ignored.\n3. It gives people a **sense of participation** and helps the government earn **legitimacy**.',
  sol: 'Equality, answerability, participation.',
  scheme: [['Political equality', 1], ['Answerability to all', 1], ['Participation and legitimacy', 1]],
}));
Q('s3_justiciable', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain what makes a right fundamental and why such rights are justiciable.',
  model: '1. Fundamental Rights are **guaranteed by the Constitution**, the highest law, so ordinary laws cannot take them away.\n2. They are **essential for the dignity and development** of every person.\n3. They are **justiciable**: a person whose right is violated can **go to court** and have it enforced.',
  sol: 'Guarantee, importance, enforceability.',
  scheme: [['Guaranteed by the Constitution', 1], ['Essential for the person\'s development', 1], ['Justiciable: courts enforce them', 1]],
}));
Q('s3_fr_six', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the six categories of Fundamental Rights and give one example for each.',
  model: '**Equality** (no discrimination by caste); **Freedom** (speech and expression); **against Exploitation** (no forced labour); **Freedom of Religion** (practising one\'s faith); **Cultural and Educational Rights** (minorities running schools); **Constitutional Remedies** (going to court to enforce rights).',
  sol: 'Six categories, each with an example: half a mark for each pair.',
  scheme: [['Equality and Freedom with examples', 1], ['Exploitation and Religion with examples', 1], ['Cultural and Educational, and Remedies with examples', 1]],
}));
Q('s3_fd_five', short({
  t: 5, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'List any five Fundamental Duties of an Indian citizen. (Any five, in your own words.)',
  model: '1. To **respect the Constitution**, the national flag and the national anthem.\n2. To **protect the sovereignty, unity and integrity** of India.\n3. To **promote harmony** and brotherhood among all the people.\n4. To **protect and improve the environment**.\n5. To **safeguard public property** and give up violence.',
  sol: 'Any five duties; award 1 mark for the first two, 1 mark for the next two and 1 mark for the fifth with a clear statement.',
  scheme: [['Two correct duties', 1], ['Two more correct duties', 1], ['Fifth correct duty', 1]],
}));
Q('s3_rights_duties', short({
  t: [4, 5], d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A pupil of the imagined Maple School says, "I have rights, so I owe nothing in return." Explain, with two reasons, why this view is mistaken.',
  model: '1. Rights are **enjoyed by everyone**, so each person\'s rights are safe only if others **respect** them; this is a duty.\n2. The Constitution lists **Fundamental Duties** beside the rights to remind citizens to protect the **nation, public property and the environment**.\nHence rights and duties are **two sides** of citizenship.',
  sol: 'Two reasons and a conclusion.',
  scheme: [['Rights depend on others respecting them', 1], ['Constitution lists duties beside rights', 1], ['Conclusion: two sides of citizenship', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_const', long({
  t: 1, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'The imagined Class 9 of Greenfield School holds a debate on "Why we need a Constitution". Answer the following.\n\n(i) What is a constitution? Give two reasons why a country needs one. **[3]**\n(ii) Name the President of the Constituent Assembly and the chairman of its Drafting Committee, and state the date of the first meeting of the Assembly. **[3]**\n(iii) Give the dates of adoption and of enforcement of the Constitution, and explain why 26 January was chosen. **[4]**',
  model: '(i) A **constitution** is the **fundamental law** of a country, laying down how government is organised and what powers it has. A country needs one to **limit the power of rulers** and to **protect the rights** of citizens.\n\n(ii) **Dr Rajendra Prasad** was the **President** of the Constituent Assembly and **Dr B. R. Ambedkar** chaired the **Drafting Committee**. The Assembly first met on **9 December 1946**.\n\n(iii) The Constitution was **adopted on 26 November 1949** and **came into force on 26 January 1950**. The date was chosen because **26 January 1930** had been observed as **Independence Day** after the call for **Purna Swaraj**, and the framers wished to honour that pledge.',
  sol: 'Meaning and need; names and date; dates and reason for 26 January.',
  scheme: [['(i) Definition', 1], ['(i) Two reasons', 2], ['(ii) Two names with posts', 2], ['(ii) 9 December 1946', 1], ['(iii) Both dates', 2], ['(iii) Purna Swaraj link and explanation', 2]],
}));
Q('l_citizenship', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'India is a federation, but it does not follow the system of two citizenships. Answer the following.\n\n(i) What is meant by single citizenship? **[3]**\n(ii) How does the citizenship system of the United States differ from that of India? **[3]**\n(iii) Explain how single citizenship promotes national unity, and say whether Overseas Citizenship of India is the same as dual citizenship. **[4]**',
  model: '(i) **Single citizenship** means a person is a citizen of **India alone**, whichever State he or she lives in. **No separate State citizenship** exists.\n\n(ii) In the **United States** each person is a citizen of the **nation** and of the **State** of residence, which is **dual citizenship**. In **India** there is only citizenship of the nation, so rights do not depend on the State.\n\n(iii) A **common status** for all gives people a **shared national identity** and makes settling in any State easy, which **binds the country together**. **Overseas Citizenship of India** is **not** dual citizenship: it gives long-term privileges but **not the right to vote**.',
  sol: 'Meaning; contrast with the United States; unity and the OCI note.',
  scheme: [['(i) Meaning', 2], ['(i) No State citizenship', 1], ['(ii) United States: two citizenships', 2], ['(ii) India: one citizenship', 1], ['(iii) Unity explained', 2], ['(iii) OCI is not dual citizenship', 2]],
}));
Q('l_uaf', long({
  t: 3, d: 3, c: 'evaluation', marks: 10, wl: L10,
  stem: 'In the imagined town of Nalandapur, a small group argues that only educated and tax-paying adults should be allowed to vote. Answer the following.\n\n(i) What is universal adult franchise, and what is the minimum voting age in India? **[3]**\n(ii) By which amendment, and in which year, was the voting age lowered, and from which age? **[3]**\n(iii) Giving two reasons, explain why universal adult franchise strengthens democracy, and show what is wrong with the group\'s argument. **[4]**',
  model: '(i) **Universal adult franchise** is the right of **every adult citizen** to vote, whatever the person\'s caste, religion, sex, education or wealth. The minimum age is **18 years**.\n\n(ii) The **61st Amendment** (**1988**, effective 1989) lowered the voting age from **21 to 18 years**.\n\n(iii) It gives **political equality**, since each adult has one equal vote, and it makes the government **answerable to all** and gives it **legitimacy**. The group\'s argument is wrong because a **literacy or tax test** would **exclude** the poor and the unlettered from a say in decisions that affect them, which would make the vote **unequal**.',
  sol: 'Meaning and age; amendment; reasons and rebuttal.',
  scheme: [['(i) Meaning', 2], ['(i) 18 years', 1], ['(ii) 61st Amendment, 1988', 2], ['(ii) From 21 years', 1], ['(iii) Two reasons', 2], ['(iii) Rebuttal of the group\'s argument', 2]],
}));
Q('l_fr_cats', long({
  t: 4, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'A class of the imagined Sunrise School studies the Fundamental Rights. Answer the following.\n\n(i) What makes a right fundamental, and what does justiciable mean? **[3]**\n(ii) Name the six categories of Fundamental Rights as of 2024 and mention the right that was removed from the list. **[3]**\n(iii) Which category is violated in each of these cases: (a) a factory owner forces unpaid labour; (b) a restaurant refuses a customer because of caste; (c) a minority community is stopped from running its own school? Explain each in a line. **[4]**',
  model: '(i) A right is **fundamental** when it is **guaranteed by the Constitution** and essential for a person\'s development. **Justiciable** means that a citizen can **go to court** to enforce it.\n\n(ii) The categories are **Equality**, **Freedom**, **against Exploitation**, **Freedom of Religion**, **Cultural and Educational Rights** and **Constitutional Remedies**. The **right to property** was removed by the **44th Amendment** (1978).\n\n(iii) (a) **Right against Exploitation**, since forced labour is banned and a person cannot be made to work against his or her will. (b) **Right to Equality**, because discrimination on grounds of caste, especially in places open to the public, is prohibited. (c) **Cultural and Educational Rights**, because minorities have the right to conserve their language and culture and may set up and run institutions for this purpose.',
  sol: 'Fundamental and justiciable; six categories and the removed right; three cases classified.',
  scheme: [['(i) Meaning of fundamental', 1.5], ['(i) Justiciable', 1.5], ['(ii) Six categories', 2], ['(ii) Right to property removed, 44th Amendment', 1], ['(iii) Three categories identified', 1.5], ['(iii) A reason for each of the three cases', 2.5]],
}));
Q('l_fr_enforce', long({
  t: 4, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'A judge of the imagined High Court of Southvale tells a school audience that a right is only as strong as the way it can be enforced. Answer the following.\n\n(i) Why are Fundamental Rights not absolute? Give two examples of grounds on which they may be restricted. **[3]**\n(ii) Explain the Right to Constitutional Remedies. **[3]**\n(iii) Examine the judge\'s remark: explain how the justiciable nature of the Fundamental Rights makes them stronger than a mere promise, and mention one limit that remains. **[4]**',
  model: '(i) The Constitution allows **reasonable restrictions** so that one person\'s freedom does not harm others or the nation. Examples of grounds are **public order** and the **security of the State**.\n\n(ii) This right lets a citizen **move the Supreme Court or a High Court** when a Fundamental Right is violated. The courts can **issue orders** to enforce the right, so it is the right that **protects all the others**.\n\n(iii) Because the rights are **justiciable**, a victim need not depend on the goodwill of the government: an **independent court** can order the violation to stop. A mere promise has **no such remedy**. **A limit** is that rights remain subject to **reasonable restrictions**, and going to court takes **time and money**.',
  sol: 'Restrictions with examples; the remedies right; evaluation of the remark.',
  scheme: [['(i) Rights not absolute, with reason', 1], ['(i) Two grounds', 2], ['(ii) Approach to Supreme Court or High Court', 1.5], ['(ii) Courts enforce and protect other rights', 1.5], ['(iii) Justiciable versus promise', 2], ['(iii) One limit and a conclusion', 2]],
}));
Q('l_fd', long({
  t: 5, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The imagined Class 9 of Bluebell School prepares a poster on the Fundamental Duties. Answer the following.\n\n(i) When, by which amendment and on whose recommendation were the Fundamental Duties added? How many are there as of 2024? **[3]**\n(ii) State any four Fundamental Duties in your own words. **[3]**\n(iii) Name the duty added by the 86th Amendment and explain how Fundamental Duties complement Fundamental Rights. **[4]**',
  model: '(i) They were added in **1976** by the **42nd Amendment**, on the recommendation of the **Swaran Singh Committee**. As of 2024 there are **eleven**.\n\n(ii) To **respect the Constitution**, the flag and the anthem; to **promote harmony** among all people; to **protect and improve the environment**; and to **safeguard public property**.\n\n(iii) The 86th Amendment (**2002**) added the duty of **parents and guardians** to give a child between **six and fourteen** years opportunities for **education**. Duties **complement** rights: one person\'s rights are secure only when others **respect** them, so duties remind citizens that **rights come with responsibilities** towards the nation and society.',
  sol: 'Origin and number; four duties; the eleventh duty and the link with rights.',
  scheme: [['(i) 1976 and 42nd Amendment', 1.5], ['(i) Swaran Singh Committee and number', 1.5], ['(ii) Two duties', 1.5], ['(ii) Two more duties', 1.5], ['(iii) The eleventh duty, 2002', 2], ['(iii) Complement explained', 2]],
}));
Q('l_rights_duties', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'During a discussion in the imagined Harmony School, a pupil says that rights are more important than duties. Answer the following.\n\n(i) Explain two ways in which Fundamental Rights protect an individual. **[3]**\n(ii) State two Fundamental Duties and say how they differ from the rights in the way they are enforced. **[3]**\n(iii) Evaluate the pupil\'s statement by giving reasons for and against it. **[4]**',
  model: '(i) The rights **guard the individual against unequal treatment** and misuse of power, for example through the **Right to Equality**, and they can be **enforced in court** through the **Right to Constitutional Remedies**.\n\n(ii) Two duties are to **protect the environment** and to **safeguard public property**. Rights are **justiciable**, while duties are **not directly enforceable** in court in the same way.\n\n(iii) **For:** rights safeguard **dignity and freedom** and have a **direct legal remedy**. **Against:** rights can be enjoyed fully only when citizens also respect others, so **duties are the other side** of rights. A balanced view is that both are **equally needed** for a healthy democracy.',
  sol: 'Ways rights protect; two duties and the enforcement difference; balanced evaluation.',
  scheme: [['(i) Two ways with explanation', 3], ['(ii) Two duties', 1.5], ['(ii) Enforcement difference', 1.5], ['(iii) Reasons for the view', 2], ['(iii) Reasons against and a conclusion', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_mock_gazette', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined school gazette and answer the questions that follow. ${IMAG}`,
  passage: '**Greenfield School Gazette: report on the mock Constituent Assembly (imagined)**\n\nThe Class 9 students of Greenfield School met in the assembly hall for the first time in December to frame a charter for their school clubs. Meera Rao was chosen to preside over the meetings, and Arjun Das chaired a small drafting group that wrote the charter. On 26 November the following year the members voted to accept the charter, but the head teacher announced that it would apply only from 26 January, the day on which the school had first held a flag-hoisting ceremony. Some pupils asked why the charter could not start at once; the head teacher replied that a date with meaning would help everyone remember it.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Which office of the real Constituent Assembly did Meera Rao hold in this mock assembly?', model: 'The office of **President** of the Constituent Assembly, held in the real Assembly by Dr Rajendra Prasad.', sol: 'Presiding officer of the Assembly.', scheme: [['President of the Assembly', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which two real dates are imitated by the days on which the charter was accepted and on which it started to apply?', model: '**26 November** (adoption of the Constitution) and **26 January** (its coming into force).', sol: 'The two dates.', scheme: [['Both dates', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why 26 January was chosen for the real Constitution to come into force.', model: 'The date recalled **26 January 1930**, observed as **Independence Day** after the demand for **Purna Swaraj**; choosing it honoured that pledge.', sol: 'Link to Purna Swaraj.', scheme: [['Reference to the 1930 observance', 1], ['Honouring the Purna Swaraj pledge', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Using the report, give two reasons why a school club or a country needs a written charter or constitution.', model: 'It **sets out rules** that everyone can read, so decisions are not left to one person. It also **limits power** and gives a **fair way** to settle disputes.', sol: 'Two reasons linked to the report.', scheme: [['Written rules known to all', 1], ['Limits power and settles disputes', 1]] }),
    ]),
  ],
}));
Q('sb_voters_extract', source({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the extract from the imagined voters' list and answer the questions that follow. ${IMAG}`,
  passage: '**Extract from the voters\' list of Ward 4, Lohargaon (imagined)**\n\nAll persons listed are citizens of India living in the ward.\n\n- Kavita Nair, aged 18, first-time voter, student\n- Gopal Yadav, aged 52, landless farm labourer, cannot read or write\n- Fatima Sheikh, aged 34, shop owner, passed Class 8\n- Harbhajan Singh, aged 79, retired teacher\n- Tara Devi, aged 41, domestic worker, never attended school\n\nNote: Ravi Kumar, aged 17, has applied to be added when he turns 18.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'application', marks: 1, stem: 'Why is Ravi Kumar not on the list yet?', model: 'He is **17 years old**, and the minimum age for voting is **18 years**.', sol: 'Below the voting age.', scheme: [['Below 18 years', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which feature of universal adult franchise is shown by the names of Gopal Yadav and Tara Devi?', model: 'Voting does not depend on **education or property**: a landless labourer and a person who never attended school can vote.', sol: 'No literacy or property test.', scheme: [['No education or property condition', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name the amendment and year that made it possible for Kavita to be on the list at 18, and state the earlier age.', model: 'The **61st Amendment** (**1988**, effective 1989) lowered the voting age from **21** to **18**.', sol: 'Amendment, year and old age.', scheme: [['61st Amendment, 1988', 1], ['Earlier age of 21', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Using the list, give two reasons why such a broad franchise strengthens democracy.', model: 'People of **every background** have an **equal vote**, so the government is answerable to all of them. The labourer and the teacher alike **take part** in choosing representatives, which gives the result **legitimacy**.', sol: 'Equality and participation.', scheme: [['Equal vote for all backgrounds', 1], ['Participation and legitimacy', 1]] }),
    ]),
  ],
}));
Q('sb_pond_letter', source({
  t: [4, 5], d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined letter to a school magazine and answer the questions that follow. ${IMAG}`,
  passage: '**Letter to the editor of the Riverbank School magazine (imagined)**\n\nSome pupils have begun throwing plastic wrappers and broken toys into the school pond. When a prefect objected, one of them said that he had the right to freedom and could do what he liked. Our civics teacher answered that no right means freedom to harm the common good, and that the Constitution also lists duties for every citizen. I would like readers to think about which of the two pupils is correct.',
  parts: [
    child('a', short({ t: 5, d: 1, c: 'application', marks: 1, stem: 'Which Fundamental Duty is being neglected by the pupils who throw things into the pond?', model: 'The duty to **protect and improve the natural environment**.', sol: 'Environment.', scheme: [['Protect the environment', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'analysis', marks: 1, stem: 'Why is the pupil\'s claim of unlimited freedom mistaken?', model: 'Rights are subject to **reasonable restrictions**, so freedom does not include harming others or the common good.', sol: 'Reasonable restrictions.', scheme: [['Rights are not absolute', 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain how Fundamental Duties complement Fundamental Rights, using the letter.', model: 'One pupil\'s **right** to enjoy the school depends on others **respecting** it; the **duty** to protect the common good keeps rights safe for everyone.', sol: 'Link between the two.', scheme: [['Rights depend on others\' respect', 1], ['Duty protects common good', 1]] }), [
      short({ t: 5, d: 2, c: 'recall', marks: 2, stem: '**Or** (ii): State when and by which amendment the Fundamental Duties were added, and how many there are as of 2024.', model: 'They were added in **1976** by the **42nd Amendment**, and there are now **eleven** of them.', sol: 'Year, amendment, number.', scheme: [['1976, 42nd Amendment', 1], ['Eleven as of 2024', 1]] }),
    ]),
  ],
}));
