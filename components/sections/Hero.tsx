import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full bg-white pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 lg:pb-28">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          {/* Text — 6 of 12, sits low against the image baseline */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="text-eyebrow text-ink-light mb-7 md:mb-9">SOYL Academy</p>

            <h1 className="text-hero text-ink mb-8 md:mb-10">
              Homework was built for a world before AI.
            </h1>

            <p className="text-lead text-ink-light max-w-[34ch] mb-10 md:mb-12">
              SOYL Academy helps teachers create outcome-based learning experiences
              that ask students to think, apply, create, explain and defend — not
              simply submit.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/method"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 bg-ink text-white text-[15px] font-medium rounded-sm transition-colors duration-300 hover:bg-cobalt"
              >
                See how SOYL works
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/schools"
                className="inline-flex items-center justify-center h-12 px-6 border border-border-dark text-ink text-[15px] font-medium rounded-sm transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
              >
                For Schools
              </Link>
            </div>
          </div>

          {/* Image — bleeds off the right edge of the viewport */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-lg lg:mr-[calc(50%-50vw)] lg:rounded-r-none">
              <Image
                src="/images/hero_students_collaborating.jpg"
                alt="Secondary-school students working through a problem together at a classroom table"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Teacher annotation — the one red mark on an otherwise white page */}
            <div className="hidden md:flex absolute -bottom-9 left-6 lg:-left-10 items-end gap-2.5 pointer-events-none select-none">
              <svg
                className="text-teacher-red w-9 h-9 rotate-[168deg] shrink-0"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 80 Q 40 40 80 12 M68 10 L86 8 L82 26"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-editorial italic text-[19px] leading-none text-teacher-red -rotate-2 pb-1">
                What did they actually learn?
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
