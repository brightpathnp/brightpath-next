'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import type { Destination, ContactProps } from '@/types';

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/brightpatheducation', slug: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/brightpathnepal/', slug: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@BrightPathNepal', slug: 'youtube' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@brightpathnepal', slug: 'tiktok' },
] as const;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destination: string;
  qualification: string;
  message: string;
  consent: boolean;
}

const INITIAL_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  destination: '',
  qualification: '',
  message: '',
  consent: false,
};

export default function Contact({ defaultDestination }: ContactProps): JSX.Element {
  const [form, setForm] = useState<FormState>({
    ...INITIAL_FORM,
    destination: defaultDestination ?? '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isFormValid =
    form.firstName.trim() !== '' &&
    form.lastName.trim() !== '' &&
    form.email.trim() !== '' &&
    form.phone.trim() !== '' &&
    form.consent;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type } = e.target;
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      destination: form.destination,
      qualification: form.qualification,
      message: form.message,
      consent: form.consent,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Server error');

      setStatus('success');
      setForm({
        ...INITIAL_FORM,
        destination: defaultDestination ?? '',
      });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid overflow-hidden bg-white lg:grid-cols-3">
      <div className="relative bg-gradient-to-br from-brand-dark via-brand-blue to-blue-500 p-12 text-white md:p-14 lg:col-span-1">
        <div
          className="absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-white opacity-5 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-400 opacity-10 blur-[80px]"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h2 className="mb-4 text-3xl font-black tracking-tight">Direct Support</h2>
          <p className="mb-12 text-sm font-medium leading-relaxed text-blue-100/70">
            Connect with us via our global support channels.
          </p>

          <div className="space-y-10">
            <div className="group flex items-start gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md transition-all group-hover:bg-blue-600">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                  Location
                </h4>
                <p className="text-sm font-bold leading-relaxed text-white">
                  5th Floor, SIMCO Tower,
                  <br />
                  Adwait Marga, Bagbazar,
                  <br />
                  Kathmandu, Nepal
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md transition-all group-hover:bg-blue-600">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                  Phone & Hotlines
                </h4>
                <div className="space-y-4">
                  <p className="text-sm font-bold">
                    01-5313666{' '}
                    <span className="ml-1 text-[9px] font-normal text-blue-200/50">
                      (Reception)
                    </span>
                  </p>
                  <div className="grid grid-cols-1 gap-y-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="mb-1 text-[8px] font-black uppercase text-blue-200/40">
                        Dubai/UAE
                      </p>
                      <a
                        href="tel:9704532363"
                        className="text-xs font-bold transition-colors hover:text-blue-300"
                      >
                        9704532363
                      </a>
                    </div>
                    <div>
                      <p className="mb-1 text-[8px] font-black uppercase text-blue-200/40">
                        United Kingdom
                      </p>
                      <a
                        href="tel:9704532353"
                        className="text-xs font-bold transition-colors hover:text-blue-300"
                      >
                        9704532353
                      </a>
                    </div>
                    <div>
                      <p className="mb-1 text-[8px] font-black uppercase text-blue-200/40">
                        WhatsApp Hub
                      </p>
                      <a
                        href="https://wa.me/9779845411411"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold transition-colors hover:text-blue-300"
                      >
                        +977 9845411411
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group flex items-start gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md transition-all group-hover:bg-blue-600">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                  Official Email
                </h4>
                <a
                  href="mailto:info@brightpathnepal.com"
                  className="block text-sm font-bold lowercase transition-colors hover:text-blue-200"
                >
                  info@brightpathnepal.com
                </a>
                <a
                  href="mailto:bec.edu.nep@gmail.com"
                  className="mt-1 block text-xs font-medium lowercase text-blue-100/50 transition-colors hover:text-blue-200"
                >
                  bec.edu.nep@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-all hover:border-blue-600 hover:bg-blue-600"
              >
                <Image
                  src={`https://cdn.simpleicons.org/${social.slug}/ffffff`}
                  alt={social.label}
                  width={16}
                  height={16}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 p-12 md:p-16 lg:col-span-2 lg:p-20">
        <h2 className="mb-2 text-3xl font-black tracking-tight text-slate-900">Contact Us</h2>
        <p className="mb-10 font-medium text-slate-500">
          Complete the form below and a counselor will reach out within 24 hours.
        </p>

        {status === 'success' && (
          <div className="mb-8 flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
            <CheckCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-black uppercase tracking-wider">Message Received!</p>
              <p className="text-xs font-bold text-green-600/80">
                Check your email for confirmation.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <AlertCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-black uppercase tracking-wider">Submission Error</p>
              <p className="text-xs font-bold text-red-600/80">
                Please check your network or try again later.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
              >
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 font-medium outline-none transition-all focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
              >
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 font-medium outline-none transition-all focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 font-medium outline-none transition-all focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
              >
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 font-medium outline-none transition-all focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="destination"
                className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
              >
                Interested Destination
              </label>
              <select
                id="destination"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 outline-none transition-all focus:border-brand-blue"
              >
                <option value="">Select Country</option>
                {DESTINATIONS.map((d: Destination) => (
                  <option key={d.id} value={d.country}>
                    {d.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="qualification"
                className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
              >
                Highest Qualification
              </label>
              <select
                id="qualification"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-700 outline-none transition-all focus:border-brand-blue"
              >
                <option value="">Select Level</option>
                <option value="Class 10">Class 10</option>
                <option value="Diploma">Diploma</option>
                <option value="High School">High School (12)</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
            >
              Message / Questions
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your goals..."
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-6 py-5 font-medium outline-none transition-all focus:border-brand-blue"
            />
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              name="consent"
              required
              aria-required="true"
              checked={form.consent}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <span className="text-xs leading-5 text-slate-600">
              By submitting this form, I consent to receiving marketing communications
              from Brightpath at any time.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-blue to-brand-purple py-5 font-black text-white shadow-xl shadow-blue-600/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <Send
                className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            )}
            <span className="text-xs uppercase tracking-[0.2em]">Send Your Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}