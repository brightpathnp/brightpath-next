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

export default function Contact({ defaultDestination }: ContactProps): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    await new Promise((res) => setTimeout(res, 1200));
    setIsSubmitting(false);
    setStatus('success');
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="grid lg:grid-cols-3 overflow-hidden bg-white">
      {/* Left Panel */}
      <div className="lg:col-span-1 bg-gradient-to-br from-brand-dark via-brand-blue to-blue-500 p-12 md:p-14 text-white relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 -translate-y-1/3 opacity-5 blur-[100px]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 rounded-full -translate-x-1/2 translate-y-1/2 opacity-10 blur-[80px]" aria-hidden="true" />

        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4 tracking-tight">Direct Support</h2>
          <p className="text-blue-100/70 font-medium mb-12 text-sm leading-relaxed">
            Connect with us via our global support channels.
          </p>

          <div className="space-y-10">
            <div className="flex items-start gap-5 group">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-blue-600 transition-all shrink-0">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-2">Location</h4>
                <p className="text-sm font-bold text-white leading-relaxed">
                  5th Floor, SIMCO Tower,<br />
                  Adwait Marga, Bagbazar,<br />
                  Kathmandu, Nepal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-blue-600 transition-all shrink-0">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-2">Phone & Hotlines</h4>
                <div className="space-y-4">
                  <p className="text-sm font-bold">
                    01-5313666{' '}
                    <span className="text-[9px] text-blue-200/50 font-normal ml-1">(Reception)</span>
                  </p>
                  <div className="grid grid-cols-1 gap-y-3 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-[8px] font-black uppercase text-blue-200/40 mb-1">Dubai/UAE</p>
                      <a href="tel:9704532363" className="text-xs font-bold hover:text-blue-300 transition-colors">9704532363</a>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-blue-200/40 mb-1">United Kingdom</p>
                      <a href="tel:9704532353" className="text-xs font-bold hover:text-blue-300 transition-colors">9704532353</a>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-blue-200/40 mb-1">WhatsApp Hub</p>
                      <a href="https://wa.me/9779845411411" target="_blank" rel="noopener noreferrer" className="text-xs font-bold hover:text-blue-300 transition-colors">
                        +977 9845411411
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-blue-600 transition-all shrink-0">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-2">Official Email</h4>
                <a href="mailto:info@brightpathnepal.com" className="text-sm font-bold hover:text-blue-200 transition-colors lowercase block">
                  info@brightpathnepal.com
                </a>
                <a href="mailto:bec.edu.nep@gmail.com" className="text-xs font-medium text-blue-100/50 mt-1 lowercase block hover:text-blue-200 transition-colors">
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
                className="w-9 h-9 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all"
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

      {/* Right Panel — Form */}
      <div className="lg:col-span-2 p-12 md:p-16 lg:p-20 bg-gradient-to-br from-white to-slate-50">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Contact Us</h2>
        <p className="text-slate-500 mb-10 font-medium">
          Complete the form below and a  counselor will reach out within 24 hours.
        </p>

        {status === 'success' && (
          <div className="mb-8 p-5 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-4 text-green-700">
            <CheckCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black text-sm uppercase tracking-wider">Message Received!</p>
              <p className="text-xs font-bold text-green-600/80">Check your email for confirmation.</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-4 text-red-700">
            <AlertCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black text-sm uppercase tracking-wider">Submission Error</p>
              <p className="text-xs font-bold text-red-600/80">Please check your network or try again later.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">First Name *</label>
              <input id="firstName" type="text" name="firstName" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Last Name *</label>
              <input id="lastName" type="text" name="lastName" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address *</label>
              <input id="email" type="email" name="email" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Phone Number *</label>
              <input id="phone" type="tel" name="phone" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all font-medium" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="destination" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Interested Destination</label>
              <select
                id="destination"
                name="destination"
                defaultValue={defaultDestination ?? ''}
                className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-blue outline-none transition-all font-bold text-slate-700 appearance-none"
              >
                <option value="">Select Country</option>
                {DESTINATIONS.map((d: Destination) => (
                  <option key={d.id} value={d.country}>{d.country}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="qualification" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Highest Qualification</label>
              <select id="qualification" name="qualification" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-brand-blue outline-none transition-all font-bold text-slate-700 appearance-none">
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
            <label htmlFor="message" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Message / Questions</label>
            <textarea id="message" name="message" rows={4} placeholder="Tell us about your goals..." className="w-full px-6 py-5 rounded-2xl bg-white border border-slate-200 focus:border-brand-blue outline-none transition-all font-medium resize-none" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-gradient-to-r from-brand-blue via-brand-blue to-brand-purple text-white font-black rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 disabled:opacity-70 group"
          >
            {isSubmitting
              ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              : <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            }
            <span className="uppercase tracking-[0.2em] text-xs">Send Your Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}



