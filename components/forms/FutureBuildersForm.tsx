'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { findCoupon, hasFriendName } from '@/lib/future-builders/pricing';
import { GRADES, REGISTRATION_STORAGE_KEY, normalizeIndianPhone } from '@/lib/future-builders/registration';
import { CALLBACK_PROMISE, FRIEND_CODE, FRIEND_DISCOUNT, rupees, whatsappLink, type OfferSlug } from '@/content/future-builders';
import { Field, describedBy, inputClasses } from '@/components/ui/Field';
import { buttonClasses } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics/track';
import { useTalkMode } from './use-talk-mode';

const WHATSAPP_URL = whatsappLink('Hi, I would like to register my child for the Future Builders summer camp. Could you help me?');

type FormFields = { parentName: string; studentName: string; email: string; phone: string; grade: string };
type Errors = Partial<Record<keyof FormFields | 'friendName', string>>;

export function validateFamily(f: FormFields): Errors {
  const e: Errors = {};
  if (f.parentName.trim().length < 2) e.parentName = 'Please enter the parent’s name.';
  if (f.studentName.trim().length < 2) e.studentName = 'Please enter the student’s name.';
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!normalizeIndianPhone(f.phone)) e.phone = 'Please enter a 10-digit Indian mobile number.';
  if (!f.grade) e.grade = 'Please choose a grade.';
  return e;
}

export interface FormOffer {
  slug: OfferSlug;
  name: string;
  price: number;
  endsLabel?: string;
}

interface FutureBuildersFormProps {
  /** e.g. "31 Mar 2027": shown in the form header. */
  closesOn: string;
  campName: string;
  /** Tag stored with call requests, e.g. fb_summer_2027. */
  sourceTag: string;
  /** ₹11,999, shown struck through. */
  listPrice: number;
  /** The offer in force when the page was rendered. The payment API re-prices by its own clock. */
  offer: FormOffer;
}

interface OrderResponse {
  id: string;
  amount: number;
  currency: string;
  keyId: string;
  offer: OfferSlug;
  mock?: boolean;
  error?: string;
}

interface CheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

type RazorpayCtor = new (options: unknown) => { on: (event: string, cb: (r: unknown) => void) => void; open: () => void };

function loadRazorpay(): Promise<boolean> {
  if ((window as unknown as { Razorpay?: RazorpayCtor }).Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/** Registration form: Razorpay payment (verified on the server), or a callback request. Only rendered while registration is open. */
export function FutureBuildersForm({ closesOn, campName, sourceTag, listPrice, offer }: FutureBuildersFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'pay' | 'callback'>('pay');
  const [formData, setFormData] = useState<FormFields>({ parentName: '', studentName: '', email: '', phone: '', grade: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [callbackDone, setCallbackDone] = useState(false);
  /** Razorpay took the payment but we couldn't confirm it yet: never ask to pay again. */
  const [pending, setPending] = useState<{ paymentId: string } | null>(null);
  const [confirming, setConfirming] = useState(false);
  /** The offer price; replaced by the server's if the offer ended while the page was open. */
  const [basePrice, setBasePrice] = useState(offer.price);
  const [offerName, setOfferName] = useState(offer.name);
  const doneRef = useRef<HTMLDivElement>(null);

  // "Talk to us" links (#talk) open the form in callback mode.
  useTalkMode(useCallback(() => setMode('callback'), []));

  useEffect(() => {
    if (callbackDone || pending) doneRef.current?.focus();
  }, [callbackDone, pending]);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [friendName, setFriendName] = useState('');

  const applied = findCoupon(appliedCode);
  const needsFriendName = !!applied?.needsFriendName;
  // FRIEND500 only counts once the friend's name is filled in: the same rule the payment API applies.
  const discount = applied && (!needsFriendName || hasFriendName(friendName)) ? applied.discount : 0;
  const price = basePrice - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const next = { ...formData, [e.target.name]: e.target.value };
    setFormData(next);
    // Re-validate a field that already shows an error, so it clears as soon as it's fixed.
    if (errors[e.target.name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: validateFamily(next)[e.target.name as keyof FormFields] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof FormFields;
    setErrors((prev) => ({ ...prev, [name]: validateFamily(formData)[name] }));
  };

  const applyCouponCode = useCallback((codeToApply: string) => {
    const coupon = findCoupon(codeToApply);
    if (coupon) {
      setCouponCode(coupon.code);
      setAppliedCode(coupon.code);
      setCouponMessage(coupon.needsFriendName ? `${coupon.message} Add your friend’s name below.` : coupon.message);
      trackEvent('fb_coupon_applied', { code: coupon.code });
    } else {
      setAppliedCode('');
      setCouponMessage(`That code isn’t valid. The only code is ${FRIEND_CODE}, for families who enrol with a friend.`);
    }
  }, []);

  useEffect(() => {
    const couponParam = new URLSearchParams(window.location.search).get('coupon');
    if (!couponParam) return;
    const timer = setTimeout(() => applyCouponCode(couponParam), 0);
    return () => clearTimeout(timer);
  }, [applyCouponCode]);

  const registrant = () => ({
    parentName: formData.parentName.trim(),
    studentName: formData.studentName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    grade: formData.grade,
    coupon: discount > 0 ? appliedCode : null,
    friendName: discount > 0 && needsFriendName ? friendName.trim() : null,
  });

  /** Server-side verification; on success, go to the confirmation page. */
  const confirm = async (payment: CheckoutResponse, amountPaise: number, mock: boolean) => {
    setConfirming(true);
    try {
      const res = await fetch('/api/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payment, ...(mock ? { registrant: registrant() } : {}) }),
      });
      const data = (await res.json().catch(() => ({}))) as { receiptNumber?: string; email?: string };
      if (!res.ok || !data.receiptNumber) throw new Error('not confirmed');
      try {
        window.sessionStorage.setItem(
          REGISTRATION_STORAGE_KEY,
          JSON.stringify({ receiptNumber: data.receiptNumber, email: data.email ?? formData.email.trim(), student: formData.studentName.trim().split(' ')[0] }),
        );
      } catch {
        // Storage blocked: the confirmation page still shows the receipt number from the URL.
      }
      trackEvent('fb_payment_success', { amount: amountPaise / 100, coupon: discount > 0 ? appliedCode : 'none', offer: offer.slug });
      router.push(`/future-builders/registered?receipt=${encodeURIComponent(data.receiptNumber)}`);
    } catch {
      // Razorpay has the money; only our confirmation failed. The webhook and our team follow up.
      trackEvent('fb_payment_success', { amount: amountPaise / 100, coupon: discount > 0 ? appliedCode : 'none', offer: offer.slug, confirmed: false });
      setPending({ paymentId: payment.razorpay_payment_id });
      setConfirming(false);
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      // The server prices the order; the browser never sends an amount.
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrant()),
      });
      const order = (await res.json().catch(() => ({ error: 'Payment couldn’t start. Please try again.' }))) as OrderResponse;
      if (!res.ok || order.error) throw new Error(order.error || 'Payment couldn’t start. Please try again.');

      // The offer changed since the page loaded (e.g. the early-bird price ended): show the new total first.
      if (order.amount !== price * 100) {
        const newBase = order.amount / 100 + discount;
        setBasePrice(newBase);
        if (order.offer !== offer.slug) setOfferName('Summer camp fee');
        setNotice(
          order.offer !== offer.slug
            ? `The ${offer.name} offer has ended. The fee is now ${rupees(order.amount / 100)}. Press pay again to continue.`
            : `The fee is ${rupees(order.amount / 100)}. Press pay again to continue.`,
        );
        setLoading(false);
        return;
      }

      if (order.mock) {
        // Local development only (no Razorpay keys): skip the checkout window.
        await confirm({ razorpay_order_id: order.id, razorpay_payment_id: `pay_devmock${Date.now()}`, razorpay_signature: 'mock' }, order.amount, true);
        return;
      }

      if (!(await loadRazorpay())) throw new Error('The payment window couldn’t load. Please check your connection and try again.');

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'SOYL Academy',
        description: `Future Builders · ${campName}`,
        order_id: order.id,
        handler: (response: unknown) => {
          void confirm(response as CheckoutResponse, order.amount, false);
        },
        prefill: { name: formData.parentName.trim(), email: formData.email.trim(), contact: normalizeIndianPhone(formData.phone) ?? formData.phone.trim() },
        theme: { color: '#141414' },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new (window as unknown as { Razorpay: RazorpayCtor }).Razorpay(options);
      rzp.on('payment.failed', (response: unknown) => {
        const description = (response as { error?: { description?: string } }).error?.description;
        setError(`${description ? `${description} ` : ''}No money was taken for this attempt. You can try again or use another payment method.`);
        setLoading(false);
      });
      rzp.open();
      trackEvent('fb_checkout_open', { amount: order.amount / 100, offer: order.offer });
    } catch (err: unknown) {
      setError((err as Error).message || 'Payment couldn’t start. Please try again.');
      setLoading(false);
    }
  };

  const requestCallback = async () => {
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...registrant(), coupon: undefined, friendName: undefined, mode: 'callback', source: sourceTag }),
      });
      if (!res.ok) throw new Error('not saved');
      trackEvent('fb_callback_request', { state: 'open' });
      setCallbackDone(true);
    } catch {
      setError('We couldn’t send your request just now. Please try again, or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateFamily(formData);
    if (mode === 'pay' && needsFriendName && !hasFriendName(friendName)) found.friendName = 'Please enter your friend’s name.';
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`fb-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setLoading(true);
    setError('');
    setNotice('');
    if (mode === 'pay') await handlePayment();
    else await requestCallback();
  };

  if (pending) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="module border-success/40 p-6 outline-none md:p-8">
        <p className="t-label mb-3 text-success">Payment received</p>
        <h3 className="t-title">We’re confirming your registration.</h3>
        <p className="mt-3 text-ink">
          <strong>Please don’t pay again.</strong> Razorpay has your payment, and we’ll email {formData.email.trim()} your confirmation and receipt shortly.
        </p>
        <p className="t-small mt-3 text-muted">
          Payment reference: <span className="font-mono text-ink">{pending.paymentId}</span>. If the email hasn’t arrived within a few hours,{' '}
          <a href={whatsappLink(`Hi, I paid for Future Builders (payment ${pending.paymentId}) and I’m waiting for my confirmation.`)} target="_blank" rel="noopener noreferrer" className="link">
            message us on WhatsApp
          </a>{' '}
          with this reference.
        </p>
      </div>
    );
  }

  if (callbackDone) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="module border-success/40 p-6 outline-none md:p-8">
        <p className="t-label mb-3 text-success">Request received</p>
        <h3 className="t-title">Thank you, {formData.parentName.trim().split(' ')[0]}.</h3>
        <p className="mt-3 text-muted">
          Our team will call you at {formData.phone.trim()} {CALLBACK_PROMISE}. Can’t wait?{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">
            Message us on WhatsApp
          </a>
          .
        </p>
        <button type="button" onClick={() => setCallbackDone(false)} className="link mt-4 font-medium">
          Go back
        </button>
      </div>
    );
  }

  const field = (name: keyof FormFields, label: string, type = 'text', autoComplete?: string, inputMode?: 'tel' | 'email') => (
    <Field id={`fb-${name}`} label={label} required error={errors[name]}>
      <input
        id={`fb-${name}`}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={inputClasses}
        aria-invalid={!!errors[name]}
        aria-describedby={describedBy(`fb-${name}`, { error: !!errors[name] })}
      />
    </Field>
  );

  const busyLabel = confirming ? 'Confirming payment…' : mode === 'pay' ? 'Opening payment…' : 'Sending…';

  return (
    <form onSubmit={handleSubmit} noValidate className="module p-5 shadow-[0_30px_60px_-45px_rgba(20,20,20,0.4)] md:p-10">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="t-title">Register your child</h3>
        <p className="t-small text-muted">Registration open until {closesOn}</p>
      </div>

      <div role="group" aria-label="How would you like to register?" className="mb-6 grid grid-cols-2 rounded-full border border-rule bg-paper p-1">
        {(['pay', 'callback'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn('press h-10 rounded-full text-[15px] font-semibold', mode === m ? 'bg-ink text-white' : 'text-ink hover:text-cobalt')}
          >
            {m === 'pay' ? 'Pay and register' : 'Request a call'}
          </button>
        ))}
      </div>

      {error && (
        <div role="alert" className="t-small mb-6 border-l-2 border-red-pen bg-paper px-3 py-2 text-ink">
          {error}{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">
            WhatsApp us
          </a>
        </div>
      )}
      {notice && (
        <div role="status" className="t-small mb-6 border-l-2 border-ink bg-paper px-3 py-2 text-ink">
          {notice}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {field('parentName', 'Parent’s name', 'text', 'name')}
        {field('studentName', 'Student’s name')}
        {field('email', 'Email', 'email', 'email', 'email')}
        {field('phone', 'Mobile number', 'tel', 'tel', 'tel')}
        <Field id="fb-grade" label="Student’s grade" required error={errors.grade} className="md:col-span-2">
          <select
            id="fb-grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(inputClasses, 'cursor-pointer')}
            aria-invalid={!!errors.grade}
            aria-describedby={describedBy('fb-grade', { error: !!errors.grade })}
          >
            <option value="">Choose a grade…</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {mode === 'pay' && (
        <div className="mt-6">
          <label htmlFor="fb-coupon" className="t-label mb-1.5 block text-ink">
            Friend code <span className="font-normal text-muted">(optional)</span>
          </label>
          <div className="flex gap-2">
            <input
              id="fb-coupon"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className={cn(inputClasses, 'uppercase')}
              aria-describedby={couponMessage ? 'fb-coupon-msg' : undefined}
            />
            <button type="button" onClick={() => applyCouponCode(couponCode)} className={buttonClasses('secondary', 'md', 'h-12')}>
              Apply
            </button>
          </div>
          {couponMessage && (
            <p id="fb-coupon-msg" role="status" className={cn('t-small mt-1.5 font-medium', applied ? 'text-success' : 'text-ink')}>
              {couponMessage}
            </p>
          )}
          {needsFriendName && (
            <Field id="fb-friendName" label="Friend’s name (referred you, or registering with you)" required error={errors.friendName} className="mt-4">
              <input
                id="fb-friendName"
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className={inputClasses}
                aria-invalid={!!errors.friendName}
                aria-describedby={describedBy('fb-friendName', { error: !!errors.friendName })}
              />
            </Field>
          )}
          {!applied && (
            <p className="t-small mt-2 text-muted">
              Registering with a friend, or referred by one? Use{' '}
              <button type="button" onClick={() => applyCouponCode(FRIEND_CODE)} className="link font-semibold">
                {FRIEND_CODE}
              </button>
              . You both save ₹{FRIEND_DISCOUNT}.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 border-t border-rule pt-6">
        <dl className="t-small space-y-1.5 text-muted">
          <div className="flex justify-between">
            <dt>List price</dt>
            <dd className="t-num line-through">{rupees(listPrice)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{offerName}</dt>
            <dd className="t-num text-ink">{rupees(basePrice)}</dd>
          </div>
          {mode === 'pay' && discount > 0 && (
            <div className="flex justify-between">
              <dt>{appliedCode} friend discount</dt>
              <dd className="t-num text-ink">−{rupees(discount)}</dd>
            </div>
          )}
        </dl>
        <p className="mt-3 flex items-baseline justify-between border-t border-rule pt-3">
          <span className="font-semibold">Total</span>
          <span className="t-num font-serif text-[2.5rem] leading-none">{rupees(mode === 'pay' ? price : basePrice)}</span>
        </p>
        {offer.endsLabel && offerName === offer.name && (
          <p className="t-small mt-2 text-muted">
            {offer.name} price until {offer.endsLabel} IST. One payment; the hardware kit and its delivery are included.
          </p>
        )}
        <p className="t-small mt-1 text-muted">Full refund if requested within 24 hours of Session 1; the kit is yours to keep.</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={loading} className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
          {loading ? busyLabel : mode === 'pay' ? `Pay ${rupees(price)} and register` : 'Request a call'}
        </button>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="arrow-link" data-track="whatsapp" data-track-at="form">
          Questions? WhatsApp us
        </a>
      </div>
      {mode === 'pay' ? (
        <p className="t-small mt-4 text-muted">Payments are processed securely by Razorpay. We email your confirmation and receipt as soon as the payment is confirmed.</p>
      ) : (
        <p className="t-small mt-4 text-muted">We call back {CALLBACK_PROMISE}.</p>
      )}
    </form>
  );
}
