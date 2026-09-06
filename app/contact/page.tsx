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
    <div className="min-h-screen bg-white text-ink pt-24 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="mb-12 text-center">
          <h1 className="text-headline mb-4">Bring SOYL to your school</h1>
          <p className="text-xl text-ink/70">
            Fill out the form below and our team will get in touch.
          </p>
        </header>

        {status === 'success' ? (
          <div className="bg-paper p-8 text-center rounded-lg border border-ink/10">
            <h2 className="text-subhead text-ink mb-2">Thank you</h2>
            <p className="text-ink/80">{message}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 bg-cobalt text-white px-6 py-2 rounded-full font-medium hover:bg-cobalt/90 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-paper p-8 md:p-12 border border-ink/10 rounded-xl">
            {status === 'error' && (
              <div className="bg-teacher-red/10 text-teacher-red p-4 rounded-md text-sm" role="alert">
                {message}
              </div>
            )}
            
            <div className="hidden" aria-hidden="true">
              <label htmlFor="botField">Don&rsquo;t fill this out if you&rsquo;re human:</label>
              <input type="text" id="botField" {...register('honeypot')} tabIndex={-1} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`w-full px-4 py-3 bg-white border ${errors.name ? 'border-teacher-red' : 'border-ink/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <p className="mt-1 text-sm text-teacher-red">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Work email *</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 bg-white border ${errors.email ? 'border-teacher-red' : 'border-ink/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <p className="mt-1 text-sm text-teacher-red">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-semibold mb-2">School / Organisation *</label>
              <input
                id="school"
                type="text"
                {...register('school')}
                className={`w-full px-4 py-3 bg-white border ${errors.school ? 'border-teacher-red' : 'border-ink/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt`}
              />
              {errors.school && <p className="mt-1 text-sm text-teacher-red">{errors.school.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className="block text-sm font-semibold mb-2">Role *</label>
                <select
                  id="role"
                  {...register('role')}
                  className={`w-full px-4 py-3 bg-white border ${errors.role ? 'border-teacher-red' : 'border-ink/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt appearance-none`}
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
                {errors.role && <p className="mt-1 text-sm text-teacher-red">{errors.role.message}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold mb-2">City *</label>
                <input
                  id="city"
                  type="text"
                  {...register('city')}
                  className={`w-full px-4 py-3 bg-white border ${errors.city ? 'border-teacher-red' : 'border-ink/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt`}
                />
                {errors.city && <p className="mt-1 text-sm text-teacher-red">{errors.city.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="studentCount" className="block text-sm font-semibold mb-2">Number of students (optional)</label>
                <input
                  id="studentCount"
                  type="text"
                  {...register('studentCount')}
                  className="w-full px-4 py-3 bg-white border border-ink/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-semibold mb-2">What would you like to explore? *</label>
                <select
                  id="interest"
                  {...register('interest')}
                  className={`w-full px-4 py-3 bg-white border ${errors.interest ? 'border-teacher-red' : 'border-ink/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt appearance-none`}
                >
                  <option value="">Select an area...</option>
                  <option value="Outcome-based assignments">Outcome-based assignments</option>
                  <option value="Teacher workshops">Teacher workshops</option>
                  <option value="School pilot program">School pilot program</option>
                  <option value="Student programs">Student programs</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                {errors.interest && <p className="mt-1 text-sm text-teacher-red">{errors.interest.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">Message *</label>
              <textarea
                id="message"
                rows={4}
                {...register('message')}
                className={`w-full px-4 py-3 bg-white border ${errors.message ? 'border-teacher-red' : 'border-ink/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-cobalt resize-y`}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-teacher-red">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-cobalt text-white py-4 px-6 rounded-md font-semibold text-lg hover:bg-cobalt/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
