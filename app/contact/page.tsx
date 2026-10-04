'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validation/contact-schema';
import { submitContact } from './actions';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    try {
      const result = await submitContact(data);
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        reset();
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-black pt-32 pb-32">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Bring SOYL to your school</h1>
          <p className="text-xl text-brand-black/70">
            Fill out the form below and our team will get in touch.
          </p>
        </header>

        {status === 'success' ? (
          <div className="bg-brand-black/5 p-12 text-center rounded-[2rem]">
            <h2 className="text-3xl font-bold mb-4">Thank you</h2>
            <p className="text-xl text-brand-black/80">{message}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 bg-brand-black text-brand-cream px-8 py-3 text-lg font-bold transition-colors hover:bg-brand-black/90 press"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-brand-black/5 p-8 md:p-16 rounded-[2rem]">
            {status === 'error' && (
              <div className="bg-brand-red/10 text-brand-red p-4 font-medium" role="alert">
                {message}
              </div>
            )}
            
            <div className="hidden" aria-hidden="true">
              <label htmlFor="botField">Don&rsquo;t fill this out if you&rsquo;re human:</label>
              <input type="text" id="botField" {...register('honeypot')} tabIndex={-1} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">Name *</label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`w-full px-6 py-4 bg-brand-cream border-2 ${errors.name ? 'border-brand-red' : 'border-brand-black/10'} focus:outline-none focus:border-brand-black font-medium transition-colors`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <p className="mt-2 text-sm text-brand-red font-medium">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">Work email *</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`w-full px-6 py-4 bg-brand-cream border-2 ${errors.email ? 'border-brand-red' : 'border-brand-black/10'} focus:outline-none focus:border-brand-black font-medium transition-colors`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <p className="mt-2 text-sm text-brand-red font-medium">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">School / Organisation *</label>
              <input
                id="school"
                type="text"
                {...register('school')}
                className={`w-full px-6 py-4 bg-brand-cream border-2 ${errors.school ? 'border-brand-red' : 'border-brand-black/10'} focus:outline-none focus:border-brand-black font-medium transition-colors`}
              />
              {errors.school && <p className="mt-2 text-sm text-brand-red font-medium">{errors.school.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="role" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">Role *</label>
                <select
                  id="role"
                  {...register('role')}
                  className={`w-full px-6 py-4 bg-brand-cream border-2 ${errors.role ? 'border-brand-red' : 'border-brand-black/10'} focus:outline-none focus:border-brand-black font-medium transition-colors appearance-none cursor-pointer`}
                >
                  <option value="">Select a role...</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Principal">Principal</option>
                  <option value="School Administrator">School Administrator</option>
                  <option value="Department Head">Department Head</option>
                  <option value="Parent">Parent</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
                {errors.role && <p className="mt-2 text-sm text-brand-red font-medium">{errors.role.message}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">City *</label>
                <input
                  id="city"
                  type="text"
                  {...register('city')}
                  className={`w-full px-6 py-4 bg-brand-cream border-2 ${errors.city ? 'border-brand-red' : 'border-brand-black/10'} focus:outline-none focus:border-brand-black font-medium transition-colors`}
                />
                {errors.city && <p className="mt-2 text-sm text-brand-red font-medium">{errors.city.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="studentCount" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">Students (optional)</label>
                <input
                  id="studentCount"
                  type="text"
                  {...register('studentCount')}
                  className="w-full px-6 py-4 bg-brand-cream border-2 border-brand-black/10 focus:outline-none focus:border-brand-black font-medium transition-colors"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">Interest *</label>
                <select
                  id="interest"
                  {...register('interest')}
                  className={`w-full px-6 py-4 bg-brand-cream border-2 ${errors.interest ? 'border-brand-red' : 'border-brand-black/10'} focus:outline-none focus:border-brand-black font-medium transition-colors appearance-none cursor-pointer`}
                >
                  <option value="">Select an area...</option>
                  <option value="Outcome-based assignments">Outcome-based assignments</option>
                  <option value="Teacher workshops">Teacher workshops</option>
                  <option value="School pilot program">School pilot program</option>
                  <option value="Student programs">Student programs</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                {errors.interest && <p className="mt-2 text-sm text-brand-red font-medium">{errors.interest.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold tracking-widest uppercase text-brand-black/60 mb-3">Message *</label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                className={`w-full px-6 py-4 bg-brand-cream border-2 ${errors.message ? 'border-brand-red' : 'border-brand-black/10'} focus:outline-none focus:border-brand-black font-medium transition-colors resize-y`}
              ></textarea>
              {errors.message && <p className="mt-2 text-sm text-brand-red font-medium">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="press group flex w-full items-center justify-center gap-2 h-16 bg-brand-black text-brand-cream text-xl font-bold transition-colors duration-300 hover:bg-brand-black/90 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
              <svg
                width="15"
                height="15"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
