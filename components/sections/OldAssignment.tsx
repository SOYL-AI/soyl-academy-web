import Image from 'next/image';

const CHAIN = ['Prompt', 'AI', 'Answer', 'Submit'];

export function OldAssignment() {
  return (
    <section className="w-full bg-bone section-padding overflow-hidden">
      <div className="container-default">
        {/* The world the assignment was designed for */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-16 lg:mb-0">
          <div className="lg:col-span-7">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/traditional_classroom.jpg"
                alt="Rows of students copying a worked proof from the board into their notebooks"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pb-6">
            <p className="text-eyebrow text-ink-light mb-6">The task as it stands</p>
            <p className="text-lead text-ink-light max-w-[34ch]">
              A task built for a world where finding the answer was the hard
              part.
            </p>
          </div>
        </div>

        {/* The artifact itself, overlapping the scene above */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 lg:col-start-5 relative z-10 lg:-mt-28">
            <div className="relative mx-auto max-w-[620px] rotate-[-1.2deg]">
              {/* A second sheet behind, for physical depth */}
              <div
                className="absolute inset-0 translate-x-2 translate-y-3 rotate-[1.6deg] bg-paper-dark/70"
                aria-hidden="true"
              />

              <article className="relative paper-ruled shadow-[0_24px_60px_-24px_rgba(23,23,23,0.45)] px-7 py-10 md:px-14 md:py-14">
                <div
                  className="absolute left-9 md:left-16 top-0 bottom-0 w-px bg-teacher-red/35"
                  aria-hidden="true"
                />

                <div className="relative pl-6 md:pl-8">
                  <header className="flex flex-wrap justify-between items-baseline gap-3 border-b border-ink/15 pb-4 mb-9">
                    <span className="text-eyebrow text-ink/70">
                      Science — Class VIII
                    </span>
                    <span className="text-small text-ink/45 tabular-nums">
                      Date __ / __ / ____
                    </span>
                  </header>

                  <p className="text-small font-semibold text-ink/55 mb-3">
                    Assignment
                  </p>
                  <p className="text-subhead text-ink mb-12 max-w-[24ch]">
                    Write 500 words explaining renewable energy and its
                    advantages.
                  </p>

                  {/* How it actually gets done */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                    {CHAIN.map((step, i) => (
                      <span key={step} className="flex items-center gap-3">
                        <span className="text-body font-medium text-ink/75">
                          {step}
                        </span>
                        {i < CHAIN.length - 1 && (
                          <svg
                            className="w-4 h-4 text-ink/30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path
                              d="M5 12h14m-7-7 7 7-7 7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    ))}
                    <svg
                      className="w-6 h-6 text-teacher-red ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-small text-ink/40">
                    Twelve minutes, start to finish.
                  </p>
                </div>

                {/* The grade, in the corner where it always is */}
                <div
                  className="absolute top-6 right-6 md:top-9 md:right-11 rotate-[9deg] select-none"
                  aria-hidden="true"
                >
                  <span className="font-editorial text-5xl md:text-6xl text-teacher-red">
                    A+
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* The verdict */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <p className="text-subhead text-ink-light mb-5">
              Everything looks complete.
            </p>
            <p className="text-headline text-ink annotation-underline">
              Except the learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
