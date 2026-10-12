import Link from 'next/link';

export function FutureBuildersFeature() {
  return (
    <section aria-label="Future Builders registrations" className="mb-20 border-2 border-brand-black bg-brand-yellow p-6 sm:p-10 rounded-2xl shadow-[6px_6px_0_0_#141414]">
      <p className="text-sm font-bold mb-4">Registrations open · Online · Grades 7–12</p>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Future Builders</h2>
          <p className="text-lg leading-relaxed max-w-2xl">12 weeks. 75 contact hours. Build a working prototype with software, AI, and a personal hardware kit. Individual students can enroll directly; no school partnership required.</p>
          <p className="mt-4 font-bold">Starts October 20, 2026 · ₹5,499 including hardware kit</p>
        </div>
        <Link href="/future-builders" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-xl bg-brand-black px-6 py-3 font-bold text-brand-cream hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black">
          Explore Future Builders
        </Link>
      </div>
    </section>
  );
}
