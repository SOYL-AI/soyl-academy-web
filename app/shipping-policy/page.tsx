import { Metadata } from 'next';
import { LegalNote, LegalPage, LegalSection, legalQuiet } from '@/components/legal/LegalPage';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  path: '/shipping-policy',
  title: 'Shipping & Delivery Policy',
  description: 'Shipping, packaging, and delivery timelines for the official ESP32-C3 hardware kit dispatched to Future Builders students across India.',
});

// Ink and wash (phase 5): restyled with components/legal/LegalPage. The policy text is unchanged.
export default function ShippingPolicyPage() {
  return (
    <LegalPage
      label="Physical Hardware Delivery"
      title="Shipping & Delivery Policy"
      updated="Last updated: October 2026 • SOYL AI Private Limited (Bengaluru 560043)"
      links={[
        { href: '/refund-policy', label: 'Refund Policy' },
        { href: '/privacy', label: 'Privacy Policy' },
      ]}
    >
      <LegalSection>
        <h2>1. Hardware Kit Overview</h2>
        <p>
          Students enrolling in the <strong>Future Builders Programme (Grades 7–12)</strong> receive our custom physical hardware kit, which includes:
        </p>
        <ul>
          <li>ESP32-C3 microcontroller development board (Wi-Fi + BLE enabled)</li>
          <li>Sensor suite (temperature/humidity, PIR motion, ultrasonic distance, photoresistor)</li>
          <li>Actuator array (programmable LEDs, mini servo motor, piezo buzzer, OLED display)</li>
          <li>Solderless breadboard, jumper wire set, and USB-C data cable</li>
          <li>Illustrated quick-start wiring map & safety guide</li>
        </ul>
      </LegalSection>

      <LegalSection>
        <h2>2. Shipping Costs & Domestic Coverage</h2>
        <p>
          <strong>100% Free Shipping Across India:</strong> All shipping, handling, and packaging costs are included in the tuition fee. There are no hidden or extra delivery charges.
        </p>
        <p>
          We deliver to all major cities, tier-2/tier-3 towns, and pin codes serviced by India Post, Delhivery, BlueDart, and DTDC across all states and union territories in India.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>3. Dispatch & Delivery Timelines</h2>
        <div>
          <LegalNote>
            <h3>Dispatch Window</h3>
            <p className={legalQuiet}>
              Hardware kits are carefully packaged and sent around <strong>week 3 or 4 of the programme</strong>.
            </p>
          </LegalNote>
          <LegalNote>
            <h3>Estimated Delivery Time</h3>
            <p className={legalQuiet}>
              Metro areas (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune): <strong>2–3 business days</strong>.<br />
              Rest of India: <strong>3–5 business days</strong>.
            </p>
          </LegalNote>
        </div>
      </LegalSection>

      <LegalSection>
        <h2>4. Shipment Tracking</h2>
        <p>
          As soon as your hardware kit is picked up by the courier partner, an automated notification containing the courier name and live tracking link will be sent to the parent email address and WhatsApp number provided at registration.
        </p>
      </LegalSection>

      <LegalSection>
        <h2>5. Damaged or Missing Components Replacement</h2>
        <p>
          We test all microcontrollers and sensor modules before dispatch. In the unlikely event that a component arrives damaged or non-functional:
        </p>
        <ul>
          <li>Notify our technical support team within 48 hours of kit delivery.</li>
          <li>Send a quick photo or description to <a href="mailto:outreach@soyl.cloud" className="link font-medium">outreach@soyl.cloud</a> or WhatsApp at <a href="https://wa.me/917022509965" className="link font-medium">+91 7022509965</a>.</li>
          <li>We will dispatch a free expedited replacement component immediately so your child doesn&apos;t miss any hands-on session.</li>
        </ul>
      </LegalSection>

      <LegalSection>
        <h2>6. Shipping Support Contact</h2>
        <LegalNote className="space-y-1.5">
          <p><strong>Dispatch Origin:</strong> Bengaluru 560043, India</p>
          <p><strong>Support Email:</strong> <a href="mailto:outreach@soyl.cloud" className="link font-medium">outreach@soyl.cloud</a></p>
          <p><strong>WhatsApp Support:</strong> <a href="https://wa.me/917022509965" className="link font-medium">+91 7022509965</a></p>
        </LegalNote>
      </LegalSection>
    </LegalPage>
  );
}
