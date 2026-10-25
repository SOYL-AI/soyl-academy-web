'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { findCoupon, priceFor } from '@/lib/future-builders/pricing';
import {
  BASE_PRICE,
  CALLBACK_PROMISE,
  FRIEND_CODE,
  FRIEND_DISCOUNT,
  VALUE_LINE,
  whatsappLink,
} from '@/content/future-builders';
import { Field, describedBy, inputClasses } from '@/components/notebook/Field';
import { buttonClasses } from '@/components/notebook/Button';

const WHATSAPP_URL = whatsappLink('Hi, I would like to enroll my child in Future Builders. Could you help me?');

type FormFields = { parentName: string; studentName: string; email: string; phone: string; grade: string };
type Errors = Partial<Record<keyof FormFields | 'friendName', string>>;

const GRADES = ['7', '8', '9', '10', '11', '12'];

export function validateFamily(f: FormFields): Errors {
  const e: Errors = {};
  if (f.parentName.trim().length < 2) e.parentName = 'Please enter the parent’s name.';
  if (f.studentName.trim().length < 2) e.studentName = 'Please enter the student’s name.';
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!/^[+()\-\s\d]{8,20}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!f.grade) e.grade = 'Please choose a grade.';
  return e;
}

interface FutureBuildersFormProps {
  /** e.g. "22 Oct" — shown in the form header. */
  closesOn: string;
  orientationOn: string;
  cohortName: string;
}

/** Enrolment form: Razorpay payment, or a callback request. Only rendered while registration is open. */
export function FutureBuildersForm({ closesOn, orientationOn, cohortName }: FutureBuildersFormProps) {
  const [mode, setMode] = useState<'pay' | 'callback'>('pay');
  const [formData, setFormData] = useState<FormFields>({ parentName: '', studentName: '', email: '', phone: '', grade: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [friendName, setFriendName] = useState('');

  const applied = findCoupon(appliedCode);
  const needsFriendName = !!applied?.needsFriendName;
  // FRIEND500 only counts once the friend's name is filled in — same rule the payment API applies.
  const price = priceFor(appliedCode, needsFriendName ? friendName : undefined);
  const discount = BASE_PRICE - price;

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
      setCouponMessage(coupon.message);
    } else {
      setAppliedCode('');
      setCouponMessage('That code isn’t valid.');
    }
  }, []);

  useEffect(() => {
    const couponParam = new URLSearchParams(window.location.search).get('coupon');
    if (!couponParam) return;
    const timer = setTimeout(() => applyCouponCode(couponParam), 0);
    return () => clearTimeout(timer);
  }, [applyCouponCode]);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const saveToSheet = async (submissionMode: 'pay' | 'callback', paymentId = '') => {
    try {
      await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mode: submissionMode,
          coupon: discount > 0 ? appliedCode : '',
          referredBy: needsFriendName ? friendName.trim() : '',
          paymentId,
        }),
      });
    } catch (e) {
      console.error('Failed to save', e);
    }
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      setError('The payment window couldn’t load. Please check your connection and try again.');
      setLoading(false);
      return;
    }

    try {
      // The server prices the order from the coupon; the browser never sends an amount.
      const orderData = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupon: appliedCode, friendName }),
      }).then((t) => t.json());

      if (orderData.error) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SOYL Academy',
        description: `Future Builders Programme (${cohortName})`,
        order_id: orderData.id,
        handler: async function (response: unknown) {
          await saveToSheet('pay', (response as { razorpay_payment_id: string }).razorpay_payment_id);
          setSuccess(true);
          setLoading(false);
        },
        prefill: { name: formData.parentName, email: formData.email, contact: formData.phone },
        theme: { color: '#3155FF' },
      };

      const rzp1 = new (window as unknown as {
        Razorpay: new (options: unknown) => { on: (event: string, cb: (r: unknown) => void) => void; open: () => void };
      }).Razorpay(options);
      rzp1.on('payment.failed', function (response: unknown) {
        setError((response as { error: { description: string } }).error.description);
        setLoading(false);
      });
      rzp1.open();
    } catch (err: unknown) {
      setError((err as Error).message || 'Payment couldn’t start. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateFamily(formData);
    if (needsFriendName && friendName.trim().length < 2) found.friendName = 'Please enter your friend’s name.';
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`fb-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setLoading(true);
    setError('');
    if (mode === 'pay') await handlePayment();
    else {
      await saveToSheet('callback');
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div role="status" className="module border-t-2 border-t-success p-6 md:p-8">
        <p className="t-label mb-3 text-success">{mode === 'pay' ? 'Payment received' : 'Request received'}</p>
        {mode === 'pay' ? (
          <>
            <h3 className="t-title">Welcome to Future Builders.</h3>
            <p className="mt-3 text-muted">
              We’ve sent a receipt and onboarding instructions to {formData.email}. See you at orientation on {orientationOn}.
            </p>
            <p className="mt-4 text-muted">
              Know a friend who’d enjoy this? Share code <strong className="text-ink">{FRIEND_CODE}</strong>: they save ₹{FRIEND_DISCOUNT}, and we’ll send you ₹{FRIEND_DISCOUNT} back when they enrol.
            </p>
          </>
        ) : (
          <>
            <h3 className="t-title">Thank you, {formData.parentName.split(' ')[0]}.</h3>
            <p className="mt-3 text-muted">
              Our team will call you at {formData.phone} {CALLBACK_PROMISE}. Can’t wait?{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">Message us on WhatsApp</a>.
            </p>
            <button type="button" onClick={() => setSuccess(false)} className="link mt-4 font-medium">
              Go back
            </button>
          </>
        )}
      </div>
    );
  }

  const field = (name: keyof FormFields, label: string, type = 'text', autoComplete?: string) => (
    <Field id={`fb-${name}`} label={label} required error={errors[name]}>
      <input
        id={`fb-${name}`}
        name={name}
        type={type}
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

  return (
    <form onSubmit={handleSubmit} noValidate className="module p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="t-title">Secure a seat</h3>
        <p className="t-small text-muted">Registration closes {closesOn}</p>
      </div>

      <div role="group" aria-label="How would you like to enrol?" className="mb-6 grid grid-cols-2 border border-ink p-0.5">
        {(['pay', 'callback'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn('press h-11 text-[15px] font-semibold', mode === m ? 'bg-ink text-white' : 'text-ink hover:bg-paper')}
          >
            {m === 'pay' ? 'Pay and enrol' : 'Request a callback'}
          </button>
        ))}
      </div>

      {error && (
        <div role="alert" className="t-small mb-6 border-l-2 border-red-pen bg-paper px-3 py-2 text-ink">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {field('parentName', 'Parent’s name', 'text', 'name')}
        {field('studentName', 'Student’s name')}
        {field('email', 'Email', 'email', 'email')}
        {field('phone', 'Phone', 'tel', 'tel')}
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
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
        </Field>
      </div>

      {mode === 'pay' && (
        <div className="mt-6">
          <label htmlFor="fb-coupon" className="t-label mb-1.5 block text-ink">
            Discount code <span className="font-normal text-muted">(optional)</span>
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
            <p id="fb-coupon-msg" className={cn('t-small mt-1.5 font-medium', applied ? 'text-success' : 'text-ink')}>
              {couponMessage}
            </p>
          )}
          {needsFriendName && (
            <Field id="fb-friendName" label="Friend’s name (referred you, or enrolling with you)" required error={errors.friendName} className="mt-4">
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
              Enrolling with a friend, or referred by one? Use{' '}
              <button type="button" onClick={() => applyCouponCode(FRIEND_CODE)} className="link font-semibold">
                {FRIEND_CODE}
              </button>
              . You both save ₹{FRIEND_DISCOUNT}.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 border-t border-rule pt-6">
        {discount > 0 && mode === 'pay' && (
          <p className="t-small flex justify-between text-muted">
            <span>Full fee</span>
            <span className="t-num line-through">₹{BASE_PRICE.toLocaleString('en-IN')}</span>
          </p>
        )}
        <p className="flex items-baseline justify-between">
          <span className="font-semibold">Total</span>
          <span className="t-num font-serif text-[2.5rem] leading-none">
            ₹{(mode === 'pay' ? price : BASE_PRICE).toLocaleString('en-IN')}
          </span>
        </p>
        <p className="t-small mt-2 text-muted">{VALUE_LINE}</p>
        <p className="t-small mt-1 text-muted">Full refund if requested within 24 hours of Session 1; the kit is yours to keep.</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={loading} className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
          {loading
            ? mode === 'pay'
              ? 'Opening payment…'
              : 'Sending…'
            : mode === 'pay'
              ? `Pay ₹${price.toLocaleString('en-IN')} and enrol`
              : 'Request a callback'}
        </button>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="arrow-link">
          Questions? WhatsApp us
        </a>
      </div>
      {mode === 'pay' ? (
        <p className="t-small mt-4 text-muted">Payments are processed securely by Razorpay.</p>
      ) : (
        <p className="t-small mt-4 text-muted">We call back {CALLBACK_PROMISE}.</p>
      )}
    </form>
  );
}
