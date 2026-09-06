import Link from 'next/link';

const siteLinks = [
  { label: 'The SOYL Method', href: '/method' },
  { label: 'What We Teach', href: '/what-we-teach' },
  { label: 'For Schools', href: '/schools' },
  { label: 'For Students', href: '/students' },
];

const companyLinks = [
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Placeholder routes — these pages do not exist yet.
const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms', href: '#' },
];

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
];

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-eyebrow text-ink-lighter mb-5">{heading}</h2>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-body text-ink-light transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-white rule-top overflow-hidden" role="contentinfo">
      <div className="container-default pt-20 md:pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-4">
            <p className="text-subhead text-ink mb-2">SOYL Academy</p>
            <p className="font-editorial text-xl text-ink-light mb-10">
              Story Of Your Life
            </p>

            <div className="flex items-center gap-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-ink-lighter transition-colors duration-200 hover:text-ink"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
            <LinkColumn heading="Learn" links={siteLinks} />
            <LinkColumn heading="Company" links={companyLinks} />
            <LinkColumn heading="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-20 md:mt-28 pt-8 rule-top flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <p className="text-small text-ink-lighter">
            © 2026 SOYL AI Private Limited
          </p>
          <p className="text-small text-ink-lighter max-w-md md:text-right">
            732, Chinmaya Mission Hospital Road, Indiranagar Stage 1, Bengaluru,
            Karnataka 560043
          </p>
        </div>
      </div>

      {/* Closing wordmark — photography read through the letterforms */}
      <div
        className="w-full flex items-end justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="w-full text-center font-sans"
          style={{
            fontSize: 'clamp(6rem, 25vw, 26rem)',
            fontWeight: 700,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            backgroundImage: "url('/images/hero_students_collaborating.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          soyl
        </p>
      </div>
    </footer>
  );
}
