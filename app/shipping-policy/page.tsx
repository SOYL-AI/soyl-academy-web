import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/shipping-policy',
  title: 'Shipping & Delivery Policy | SOYL Academy',
  description: 'Shipping, packaging, and delivery timelines for the official ESP32-C3 hardware kit dispatched to Future Builders students across India.',
});

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-black pt-32 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block bg-brand-yellow px-3 py-1 rounded border border-brand-black mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-black">
                Physical Hardware Delivery
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-brand-black">
              Shipping & Delivery Policy
            </h1>
            <p className="text-sm font-bold text-brand-black/60">
              Last updated: October 2026 • SOYL AI Private Limited (Begakuru 560043)
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-10 text-brand-black/85 leading-relaxed font-medium">
            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">1. Hardware Kit Overview</h2>
              <p className="mb-3">
                Students enrolling in the <strong>Future Builders Programme (Grades 7–12)</strong> receive our custom physical hardware kit, which includes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm">
                <li>ESP32-C3 microcontroller development board (Wi-Fi + BLE enabled)</li>
                <li>Sensor suite (temperature/humidity, PIR motion, ultrasonic distance, photoresistor)</li>
                <li>Actuator array (programmable LEDs, mini servo motor, piezo buzzer, OLED display)</li>
                <li>Solderless breadboard, jumper wire set, and USB-C data cable</li>
                <li>Illustrated quick-start wiring map & safety guide</li>
              </ul>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">2. Shipping Costs & Domestic Coverage</h2>
              <p className="mb-3">
                <strong>100% Free Shipping Across India:</strong> All shipping, handling, and packaging costs are included in the tuition fee. There are no hidden or extra delivery charges.
              </p>
              <p className="text-sm">
                We deliver to all major cities, tier-2/tier-3 towns, and pin codes serviced by India Post, Delhivery, BlueDart, and DTDC across all states and union territories in India.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">3. Dispatch & Delivery Timelines</h2>
              <div className="space-y-4">
                <div className="p-4 bg-brand-cream rounded-xl border border-brand-black/20">
                  <h3 className="font-bold text-lg text-brand-black mb-1">Dispatch Window</h3>
                  <p className="text-sm text-brand-black/75">
                    Hardware kits are carefully packaged and dispatched within <strong>24 to 48 hours</strong> of enrollment confirmation.
                  </p>
                </div>
                <div className="p-4 bg-brand-cream rounded-xl border border-brand-black/20">
                  <h3 className="font-bold text-lg text-brand-black mb-1">Estimated Delivery Time</h3>
                  <p className="text-sm text-brand-black/75">
                    Metro areas (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune): <strong>2–3 business days</strong>.<br />
                    Rest of India: <strong>3–5 business days</strong>.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">4. Shipment Tracking</h2>
              <p className="mb-3">
                As soon as your hardware kit is picked up by the courier partner, an automated notification containing the courier name and live tracking link will be sent to the parent email address and WhatsApp number provided at registration.
              </p>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">5. Damaged or Missing Components Replacement</h2>
              <p className="mb-3">
                We test all microcontrollers and sensor modules before dispatch. In the unlikely event that a component arrives damaged or non-functional:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm mb-4">
                <li>Notify our technical support team within 48 hours of kit delivery.</li>
                <li>Send a quick photo or description to <a href="mailto:outreach@soyl.cloud" className="text-brand-blue font-bold underline">outreach@soyl.cloud</a> or WhatsApp at <a href="https://wa.me/917022509965" className="text-brand-blue font-bold underline">+91 7022509965</a>.</li>
                <li>We will dispatch a free expedited replacement component immediately so your child doesn&apos;t miss any hands-on session.</li>
              </ul>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414]">
              <h2 className="text-2xl font-bold text-brand-black mb-3">6. Shipping Support Contact</h2>
              <div className="p-4 bg-brand-cream rounded-xl border border-brand-black/20 text-sm space-y-2">
                <p><strong>Dispatch Origin:</strong> Begakuru 560043, India</p>
                <p><strong>Support Email:</strong> <a href="mailto:outreach@soyl.cloud" className="text-brand-blue font-bold underline">outreach@soyl.cloud</a></p>
                <p><strong>WhatsApp Support:</strong> <a href="https://wa.me/917022509965" className="text-brand-blue font-bold underline">+91 7022509965</a></p>
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t-2 border-brand-black/20 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="text-sm font-bold text-brand-blue hover:text-brand-black underline underline-offset-4"
            >
              ← Back to SOYL Academy Home
            </Link>
            <div className="flex gap-4">
              <Link
                href="/refund-policy"
                className="text-sm font-bold text-brand-black/70 hover:text-brand-black underline underline-offset-4"
              >
                Refund Policy →
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-bold text-brand-black/70 hover:text-brand-black underline underline-offset-4"
              >
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
