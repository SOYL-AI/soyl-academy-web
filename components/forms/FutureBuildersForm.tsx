'use client';

import { useState } from 'react';


export function FutureBuildersForm() {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    grade: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const price = 5499;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Ensure it's not missing
    const res = await loadRazorpay();
    if (!res) {
      setError('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // 1. Create order
      const orderData = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price * 100 }), // amount in paise
      }).then((t) => t.json());

      if (orderData.error) {
        throw new Error(orderData.error);
      }

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SOYL Academy',
        description: 'Future Builders Programme (Oct Cohort)',
        order_id: orderData.id,
        handler: function (response: any) {
          // Success callback
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_signature);
          setSuccess(true);
          setLoading(false);
        },
        prefill: {
          name: formData.parentName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#2F3E9E',
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        setError(response.error.description);
        setLoading(false);
      });
      rzp1.open();
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-brand-cream border-2 border-brand-black p-8 md:p-12 text-center rounded-sm">
        <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6 text-brand-black">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="text-3xl font-bold mb-4">Registration Successful!</h3>
        <p className="text-lg text-brand-black/70 mb-8">
          Welcome to the Future Builders Programme. We've sent a receipt and onboarding instructions to {formData.email}.
        </p>
        <p className="text-brand-blue font-bold tracking-widest uppercase text-sm">See you on October 20th</p>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="bg-white border-2 border-brand-black p-8 md:p-12 shadow-[8px_8px_0_0_#141414] rounded-sm">
      <div className="mb-10 text-center">
        <h3 className="text-3xl font-bold mb-4">Secure your spot</h3>
        <p className="text-brand-black/70 text-lg">Registration is now open for the October 20th Cohort.</p>
      </div>

      {error && <div className="mb-6 p-4 bg-brand-red/10 text-brand-red border border-brand-red/20 text-sm font-bold">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold tracking-widest uppercase mb-2 text-brand-black/70">Parent Name</label>
          <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full h-14 px-4 bg-brand-cream border-2 border-brand-black focus:outline-none focus:ring-4 focus:ring-brand-yellow focus:border-brand-black transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold tracking-widest uppercase mb-2 text-brand-black/70">Student Name</label>
          <input required type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full h-14 px-4 bg-brand-cream border-2 border-brand-black focus:outline-none focus:ring-4 focus:ring-brand-yellow focus:border-brand-black transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold tracking-widest uppercase mb-2 text-brand-black/70">Email Address</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-14 px-4 bg-brand-cream border-2 border-brand-black focus:outline-none focus:ring-4 focus:ring-brand-yellow focus:border-brand-black transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold tracking-widest uppercase mb-2 text-brand-black/70">Phone Number</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-14 px-4 bg-brand-cream border-2 border-brand-black focus:outline-none focus:ring-4 focus:ring-brand-yellow focus:border-brand-black transition-all" />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold tracking-widest uppercase mb-2 text-brand-black/70">Student Grade</label>
        <select required name="grade" value={formData.grade} onChange={handleChange} className="w-full h-14 px-4 bg-brand-cream border-2 border-brand-black focus:outline-none focus:ring-4 focus:ring-brand-yellow focus:border-brand-black transition-all appearance-none cursor-pointer">
          <option value="">Select Grade</option>
          
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>          <option value="10">Grade 10</option>
        </select>
      </div>

      <div className="border-t-2 border-brand-black/10 pt-8 mb-8">
        <div className="flex justify-between items-end mb-4">
          <span className="text-xl font-bold">Total</span>
          <span className="text-4xl font-bold">₹{price}</span>
        </div>
        <p className="text-sm text-brand-black/50 font-medium text-right">Includes hardware kit (delivered to home) and 12-week access.</p>
      </div>

      <button disabled={loading} type="submit" className="w-full h-16 bg-brand-black text-brand-cream text-lg font-bold hover:bg-brand-blue focus:outline-none focus:ring-4 focus:ring-brand-blue/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? 'Processing...' : 'Pay & Enroll Now'}
      </button>
      
      <p className="text-center text-xs font-bold text-brand-black/40 uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Secured by Razorpay
      </p>
    </form>
  );
}
