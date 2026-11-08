import { FutureBuildersForm } from '@/components/forms/FutureBuildersForm';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Photo } from '@/components/media/Photo';
import { Drawn } from '@/components/motion/Text';
import { Label, SectionHeader } from '@/components/ui/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { PriceCard, StatusCard } from '@/components/future-builders/Cards';
import { Curriculum } from '@/components/future-builders/Curriculum';
import { CtaTracker } from '@/components/future-builders/CtaTracker';
import { DiwaliOfferBand } from '@/components/future-builders/Diwali';
import { StickyCta } from '@/components/future-builders/StickyCta';
import { getFutureBuildersFaqs } from '@/content/future-builders-faqs';
import {
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  LIST_PRICE,
  STANDARD_OFFER,
  WHATSAPP_DISPLAY,
  campTimingLine,
  formatCohortDate,
  getActiveOffer,
  getCohortState,
  getOpenCohort,
  getUpcomingCohort,
  previewNow,
  rupees,
  today,
  whatsappLink,
  whatsappShareLink,
} from '@/content/future-builders';
import { images } from '@/content/images';
import { ORGANIZATION_ID, SITE_URL, absoluteUrl } from '@/lib/seo/config';
import { createMetadata, ogImageUrl } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({
  path: '/future-builders',
  keywords: ['summer coding camp for kids', 'online summer camp India', 'robotics for students', 'AI course for teenagers', 'IoT for grades 7 to 12', 'entrepreneurship for students', 'Future Builders SOYL'],
});

// Registration state and the offer come from the date; re-check every 5 minutes so the Diwali
// price and theme go within minutes of the offer's end (the payment API prices by its own clock).
export const revalidate = 300;

const WHATSAPP_URL = whatsappLink('Hi, I have a question about the Future Builders summer camp');

/** Problem → transformation: where a student starts, and what they can do by Demo Day. */
const CHANGES: [string, string][] = [
  ['Uses apps and games someone else built.', 'Writes Python programs that run, and fixes them when they don’t.'],
  ['Hears about AI in the news.', 'Has trained a model to recognise images.'],
  ['Meets electronics in a textbook diagram.', 'Has wired sensors and a motor to a board of their own.'],
  ['Keeps ideas in a notebook.', 'Has interviewed users, costed a product and pitched it to an audience.'],
  ['Has marks to show for the year.', 'Has a portfolio to show: code, a working device and a recorded pitch.'],
];

const PORTFOLIO = [
  { title: 'A public GitHub repository', line: 'Python, APIs and ESP32 firmware, documented with a README.' },
  { title: 'A recorded Demo Day pitch', line: 'Three minutes explaining the build, the testing and the business case.' },
  { title: 'A working device', line: 'A physical gadget with live sensor data that the student keeps improving.' },
  { title: 'A certificate of completion', line: 'For the full programme across software, AI, IoT and entrepreneurship.' },
];

const SKILLS = ['Python', 'APIs', 'SQLite', 'Machine learning', 'Image recognition', 'ESP32 electronics', 'Sensors and servos', 'Customer interviews', 'Cost sheets', 'Pitching', 'Teamwork'];

/**
 * Future Builders: the summer camp's sales page. One structure, four registration states from
 * content/future-builders.ts:
 *   open / closing-soon → pay (Razorpay, verified on the server) or request a call
 *   upcoming            → "notify me when registration opens" or request a call
 *   waitlist            → join the waitlist or request a call
 * and two offers by date: the Diwali early-bird (with its theme, until 15 Nov 2026 23:59 IST), then
 * the standard fee. Nothing is stated unless it is in the config: no invented dates, timetable,
 * seat counts, hours or proof.
 */
export default function FutureBuildersPage() {
  const now = today();
  const state = getCohortState(now);
  const camp = getOpenCohort(now);
  const upcoming = camp ? null : getUpcomingCohort(now);
  const shown = camp ?? upcoming;
  const offer = getActiveOffer(now);
  const diwali = Boolean(camp) && offer.theme === 'diwali';
  const preview = previewNow();
  // eslint-disable-next-line react-hooks/purity -- dev preview only: aligns the countdown with COHORT_PREVIEW_DATE
  const offsetMs = preview ? preview.getTime() - Date.now() : undefined;
  const faqs = getFutureBuildersFaqs(state, now);
  const url = absoluteUrl('/future-builders');
  const price = rupees(offer.price);

  const primary = camp
    ? { label: `Register now · ${price}`, short: 'Register', track: 'enrol' }
    : upcoming
      ? { label: 'Notify me when registration opens', short: 'Notify me', track: 'notify' }
      : { label: 'Join the waitlist', short: 'Join waitlist', track: 'waitlist' };

  const chips = ['Live online', shown ? `${shown.months} summer camp` : 'Summer camp', 'Four modules', 'Grades 7–12', 'Kit shipped home'];

  const facts: [number, string][] = [
    [4, 'modules: software, AI, IoT and entrepreneurship'],
    [1, 'working product per team, pitched on Demo Day'],
    [2, 'months of live building, in the summer break'],
  ];

  const how: [string, string][] = [
    ['When it runs', shown ? `${shown.months}, during the summer break. Live on video (IST); the exact dates and timetable are shared after registration.` : 'During the summer break, live on video (IST). Dates for the next camp are being set.'],
    ['Recorded, always', 'Every session is recorded. A clash or a family function? Watch it later and catch up on the build.'],
    ['Personal attention', 'Students build in teams of 3–4, and instructors review every student’s project.'],
    ['A kit of their own', 'An ESP32-C3 microcontroller, breadboard, sensors, LEDs and a servo, shipped free across India. Theirs to keep.'],
    ['What they need', 'A laptop or desktop computer with a USB port, and internet that can handle a video call. We help set up the tools at orientation.'],
    ['What parents see', 'You’re invited to Demo Day, the code lives in a GitHub repository you can open any time, and our team is a WhatsApp message away.'],
  ];

  // Course rich result: only facts that are true today. The offer and the course instance exist
  // only while registration is open; the instance is month-level until exact dates are set.
  const courseNode = {
    '@type': 'Course',
    '@id': `${url}#course`,
    name: 'Future Builders Summer Camp',
    description: 'A live online summer camp for Grades 7 to 12: software, AI, IoT robotics and entrepreneurship, with a hardware kit. Students build a working prototype in teams and pitch it on Demo Day.',
    url,
    image: ogImageUrl('/future-builders'),
    inLanguage: 'en-IN',
    provider: { '@id': ORGANIZATION_ID },
    educationalLevel: 'Grades 7 to 12',
    coursePrerequisites: 'None. Designed for complete beginners.',
    teaches: ['Python programming', 'APIs and SQLite databases', 'Machine learning and image recognition', 'ESP32 electronics, sensors and servos', 'Entrepreneurship and pitching'],
    educationalCredentialAwarded: 'Certificate of completion',
    ...(camp
      ? {
          offers: {
            '@type': 'Offer',
            category: 'Paid',
            name: offer.name,
            price: String(offer.price),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${url}#enroll`,
            validFrom: camp.registrationOpens,
            validThrough: offer.endsAt ?? camp.registrationCloses,
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            name: `Future Builders ${camp.name}`,
            courseMode: 'online',
            startDate: camp.dates?.classesStart ?? camp.startMonth,
            endDate: camp.dates?.ends ?? camp.endMonth,
          },
        }
      : {}),
  };

  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/future-builders', mainEntityId: `${url}#course` }),
          breadcrumbNode('/future-builders', topLevelCrumbs('/future-builders')),
          courseNode,
          faqNode('/future-builders', faqs)
        )}
      />
      <CtaTracker state={state} />

      {diwali && <DiwaliOfferBand offer={offer} listPrice={LIST_PRICE} nextPrice={STANDARD_OFFER.price} offsetMs={offsetMs} />}

      <PageHero
        tone="yellow"
        label="Future Builders · Summer camp · Grades 7–12"
        title={
          <>
            Build a <span className="t-accent">real</span> product this summer.
          </>
        }
        intro="A live online summer camp where your child learns to code in Python, trains an AI model, wires a device that senses and acts, and pitches it on Demo Day. No coding experience needed."
        actions={
          <div id="hero-cta" className="flex w-full flex-col gap-6">
            <ul className="flex flex-wrap gap-2" aria-label="The programme in brief">
              {chips.map((chip) => (
                <li key={chip} className="t-small rounded-full border border-rule-strong px-3 py-1 text-ink">
                  {chip}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="#enroll" size="lg" arrow data-track={primary.track} data-track-at="hero">
                {primary.label}
              </ButtonLink>
              <ButtonLink href="#talk" variant="secondary" size="lg" data-track="talk" data-track-at="hero">
                Talk to us
              </ButtonLink>
            </div>
            <p className="t-small max-w-[56ch] text-muted">
              {camp
                ? 'Full refund if Session 1 isn’t right for your child, and the kit is theirs to keep. Secure payment by Razorpay.'
                : upcoming
                  ? `Registration opens ${upcoming.registrationOpensLabel}. Getting notified is free and commits you to nothing. Prefer to chat?`
                  : 'Joining the waitlist is free and commits you to nothing. Prefer to chat?'}{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link" data-track="whatsapp" data-track-at="hero">
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </p>
          </div>
        }
        aside={<StatusCard state={state} camp={camp} upcoming={upcoming} offer={offer} listPrice={LIST_PRICE} />}
        image={images.fbPresentation}
        imageLayout="wide"
      />

      {/* 01 · Problem → transformation */}
      <section className="section" aria-labelledby="change-heading">
        <div className="page grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              id="change-heading"
              layout="stack"
              label="What changes"
              num="01"
              title={
                <>
                  From using technology to <span className="t-accent">building</span> it.
                </>
              }
              intro="Most teenagers spend hours a day on apps someone else made, and meet coding as theory for marks. Future Builders gives them a summer to make something that works."
            />
            <Photo
              backdrop="blue"
              backdropSide="left"
              image={images.studentThinking}
              aspect="aspect-[4/3]"
              className="mt-10 hidden lg:block"
              sizes="(min-width: 1320px) 480px, 38vw"
            />
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pl-6" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <div aria-hidden="true" className="t-eyebrow hidden grid-cols-2 gap-8 border-b border-ink pb-4 sm:grid">
              <span className="text-muted">Before</span>
              <span className="text-cobalt">By Demo Day</span>
            </div>
            <ul className="border-t border-ink sm:border-t-0">
              {CHANGES.map(([before, after]) => (
                <li key={before} className="grid gap-1.5 border-b border-rule py-5 sm:grid-cols-2 sm:gap-8 sm:py-6">
                  <p className="text-muted">
                    <span className="t-eyebrow mb-1 block text-[12px] sm:sr-only">Before</span>
                    {before}
                  </p>
                  <p className="font-serif text-[1.375rem] leading-snug text-ink">
                    <span className="t-eyebrow mb-1 block font-sans text-[12px] text-cobalt sm:sr-only">By Demo Day</span>
                    {after}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 02 · The programme, module by module */}
      <Curriculum timing={shown ? `The ${shown.name} runs in ${shown.months}; the ${shown.timingNote}` : undefined} />

      {/* 03 · How it works */}
      <section className="section" aria-labelledby="how-heading">
        <div className="page">
          <SectionHeader
            id="how-heading"
            label="How it works"
            num="03"
            title={
              <>
                Live, personal and <span className="t-accent">hands-on.</span>
              </>
            }
            intro="Live sessions on video during the summer break, with instructors who review every student’s project."
          />

          <dl className="mt-12 grid grid-cols-1 border-y border-ink sm:grid-cols-3 md:mt-16" data-reveal>
            {facts.map(([n, line], i) => (
              <div key={line} className={`flex items-baseline gap-4 py-6 sm:block sm:px-6 sm:py-8 ${i > 0 ? 'border-t border-rule sm:border-l sm:border-t-0' : 'sm:pl-0'}`}>
                <dt className="t-num font-serif text-[clamp(3rem,6vw,4.5rem)] leading-none text-ink">{n}</dt>
                <dd className="mt-2 max-w-[22ch] text-muted">{line}</dd>
              </div>
            ))}
          </dl>

          <dl className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {how.map(([title, line], i) => (
              <div key={title} data-reveal style={{ '--d': `${(i % 3) * 80}ms` } as React.CSSProperties} className="border-t border-rule-strong pb-8 pt-6">
                <dt className="font-serif text-[1.625rem] leading-tight">{title}</dt>
                <dd className="mt-2 max-w-[38ch] text-muted">{line}</dd>
              </div>
            ))}
          </dl>

          <div className="tone-yellow mt-8 grid-12 items-center gap-y-6 rounded-[var(--radius-lg)] bg-[var(--tone-soft)] p-6 md:p-10" data-reveal>
            <div className="col-span-12 lg:col-span-8">
              <p className="t-eyebrow text-ink">Who teaches</p>
              <h3 className="t-title mt-3">Meet the mentors at orientation.</h3>
              <p className="mt-3 max-w-[60ch] text-ink">
                Every session is taught live by SOYL instructors, who guide students step by step through the code and the hardware and review each project personally. You and your child meet them at orientation, before the first class.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <a href="#talk" className="arrow-link" data-track="talk" data-track-at="mentors">
                Ask us about the instructors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · Outcomes */}
      <section className="section bg-paper" aria-labelledby="outcomes-heading">
        <div className="page grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <Label num="04" className="mb-6">What they leave with</Label>
            <h2 id="outcomes-heading" className="t-headline max-w-[12ch]">
              Proof of work, not just <span className="t-accent">marks.</span>
            </h2>
            <p className="t-lead mt-6 max-w-[42ch]">
              Admissions panels, scholarships and internships look for what a student has actually built. Every Future Builder leaves with four things to show.
            </p>
            <h3 className="t-label mt-10 font-semibold text-ink">Skills they practise</h3>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Skills they practise">
              {SKILLS.map((s) => (
                <li key={s} className="t-small rounded-full bg-white px-3 py-1 text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <ul className="col-span-12 border-t border-ink lg:col-span-6 lg:col-start-7">
            {PORTFOLIO.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties} className="flex gap-6 border-b border-rule py-6">
                <span className="t-num font-serif text-[2.25rem] leading-none text-cobalt">{i + 1}</span>
                <div>
                  <h3 className="t-subtitle">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bring a friend: only while there is something to register for */}
      {camp && (
        <section className="section-tight">
          <div className="page">
            <div className="grid-12 items-center gap-y-6 rounded-[var(--radius-lg)] bg-highlighter p-6 md:p-12" data-reveal>
              <div className="col-span-12 lg:col-span-8">
                <p className="t-eyebrow mb-4 text-ink">Bring a friend</p>
                <h2 className="t-headline">You both save ₹{FRIEND_DISCOUNT}.</h2>
                <p className="mt-4 max-w-[52ch] text-ink">
                  Projects are built in teams of 3–4, so it’s better with a friend. Use code <strong className="rounded bg-ink px-1.5 py-0.5 font-mono text-[15px] text-white">{FRIEND_CODE}</strong> at checkout with your friend’s name
                  {diwali ? `: ${rupees(offer.price - FRIEND_DISCOUNT)} instead of ${price} during the ${offer.name} offer` : ''}. Your friend gets ₹{FRIEND_DISCOUNT} too.
                </p>
              </div>
              <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
                <ButtonLink href={`/future-builders?coupon=${FRIEND_CODE}#enroll`} size="lg" data-track="enrol" data-track-at="friend">
                  Register with {FRIEND_CODE}
                </ButtonLink>
                <a
                  href={whatsappShareLink(`Future Builders by SOYL Academy: a live online summer camp for Grades 7–12 (software, AI, IoT, with a hardware kit), ${camp.months}. Use code ${FRIEND_CODE} and we both save ₹${FRIEND_DISCOUNT}: ${SITE_URL}/future-builders?coupon=${FRIEND_CODE}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link justify-center"
                  data-track="share"
                  data-track-at="friend"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 05 · Fee and registration / notify / waitlist: exactly one state */}
      <section id="enroll" className="section scroll-mt-16" aria-labelledby="enroll-heading">
        <div className="page grid-12 gap-y-10 lg:gap-y-8">
          <div className="col-span-12 lg:col-span-5 lg:row-start-1">
            <Label num="05" className="mb-6">{camp ? 'Fee and registration' : upcoming ? 'Registration opens soon' : 'Waitlist'}</Label>
            <h2 id="enroll-heading" className="t-headline max-w-[14ch]">
              {camp ? `Join the ${camp.name}.` : upcoming ? 'Be first when registration opens.' : 'Be first for the next camp.'}
            </h2>
            <p className="mt-5 max-w-[42ch] text-muted">
              {camp
                ? `${campTimingLine(camp)}. Registration is open until ${formatCohortDate(camp.registrationCloses, true)}.`
                : upcoming
                  ? `The ${upcoming.name} runs in ${upcoming.months}. Registration opens ${upcoming.registrationOpensLabel}.`
                  : 'Waitlisted families hear the next camp’s dates and fee first.'}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <span id="talk" aria-hidden="true" className="block scroll-mt-24" />
            {camp ? (
              <FutureBuildersForm
                closesOn={formatCohortDate(camp.registrationCloses, true)}
                campName={camp.name}
                sourceTag={camp.sourceTag}
                listPrice={LIST_PRICE}
                offer={{ slug: offer.slug, name: offer.name, price: offer.price, endsLabel: offer.endsLabel }}
              />
            ) : upcoming ? (
              <WaitlistForm notify={{ cohortName: upcoming.name, opensLabel: upcoming.registrationOpensLabel }} source={upcoming.sourceTag} state={state} />
            ) : (
              <WaitlistForm source="fb_waitlist" state={state} />
            )}
          </div>
          <div className="col-span-12 lg:col-span-5 lg:row-start-2">
            <PriceCard
              mode={camp ? 'open' : upcoming ? 'upcoming' : 'waitlist'}
              campName={camp?.name ?? upcoming?.name}
              opensLabel={upcoming?.registrationOpensLabel}
              offer={offer}
              listPrice={LIST_PRICE}
            />
          </div>
        </div>
      </section>

      {/* 06 · Questions */}
      <Faq faqs={faqs} heading="Questions parents ask" num="06" className="bg-paper" />

      {/* Close */}
      <section id="final-cta" className="bg-white" aria-labelledby="final-heading">
        <div className="page section grid-12 items-end gap-y-10">
          <h2 id="final-heading" className="t-display col-span-12 max-w-[13ch] lg:col-span-8" data-reveal>
            This summer, one{' '}
            <span className="t-accent">
              <Drawn>real product.</Drawn>
            </span>
          </h2>
          <div className="col-span-12 lg:col-span-4" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <p className="t-lead max-w-[40ch] text-ink">
              {camp
                ? `Registration for the ${camp.name} is open until ${formatCohortDate(camp.registrationCloses, true)}.${diwali ? ` The ${offer.name} price of ${price} ends ${offer.endsLabel}.` : ''}`
                : upcoming
                  ? `Registration for the ${upcoming.name} opens ${upcoming.registrationOpensLabel}. Leave your details and we’ll tell you the day it does.`
                  : 'Dates for the next camp are being set. Join the waitlist to hear them first, or talk to us now.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="#enroll" size="lg" arrow data-track={primary.track} data-track-at="final">
                {upcoming ? 'Notify me' : primary.label}
              </ButtonLink>
              <ButtonLink href="#talk" variant="secondary" size="lg" data-track="talk" data-track-at="final">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <StickyCta
        line={
          camp
            ? diwali
              ? `${price} (${rupees(LIST_PRICE)}) · Diwali offer ends ${offer.endsLabel}`
              : `${price} · ${camp.months} summer camp`
            : upcoming
              ? `Opens ${upcoming.registrationOpensLabel}`
              : 'Next camp: dates soon'
        }
        label={primary.short}
        track={primary.track}
        after="hero-cta"
        hideOver={['enroll', 'final-cta']}
      />
    </>
  );
}
