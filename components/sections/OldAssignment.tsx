const CHAIN = ['Prompt', 'AI', 'Answer', 'Submit'];

export function OldAssignment() {
  return (
    <section className="w-full bg-bone section-padding overflow-hidden">
      <div className="container-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* The artifact — paper, tilted, physical */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-[620px] rotate-[-1.2deg]">
              {/* Sheet behind, for physical depth */}
              <div
                className="absolute inset-0 translate-x-2 translate-y-3 rotate-[1.6deg] bg-paper-dark/70"
                aria-hidden="true"
              />

              <article className="relative paper-ruled shadow-[0_18px_50px_-20px_rgba(23,23,23,0.35)] px-7 py-10 md:px-14 md:py-14">
                {/* Red margin rule */}
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

                {/* Teacher's grade, in the corner where it always is */}
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

          {/* The verdict */}
          <div className="lg:col-span-5 lg:pl-4">
            <p className="text-subhead text-ink-light mb-5">
              Everything looks complete.
            </p>
            <p className="text-headline text-ink annotation-underline decoration-teacher-red">
              Except the learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
