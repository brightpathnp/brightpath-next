'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, CheckCircle, AlertCircle, CalendarClock } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import type { ConsultationModalProps, Destination } from '@/types/index';



export default function ConsultationModal({
  isOpen,
  onClose,
  title = 'Free Consultation',
}: ConsultationModalProps): JSX.Element | null {
  const [testGiven, setTestGiven] = useState<'yes' | 'no'>('no');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const isCallBack = title === 'Request Call Back';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    await new Promise((res) => setTimeout(res, 1200));
    setIsSubmitting(false);
    setStatus('success');
    setTimeout(() => {
      onClose();
      setStatus('idle');
      setTestGiven('no');
      formRef.current?.reset();
    }, 3000);
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-600/10 outline-none text-sm transition-all';

  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-purple px-6 py-4 flex justify-between items-center text-white shrink-0">
          <div>
            <h3 id="modal-title" className="text-xl font-bold">{title}</h3>
            <p className="text-blue-100 text-xs">Start your journey with BrightPath</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 md:p-8 overflow-y-auto">

          {/* Success Banner */}
          {status === 'success' && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Message sent successfully!</p>
                <p className="text-xs text-green-600">Our counselor will contact you shortly.</p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {status === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Unable to submit at this time</p>
                <p className="text-xs text-red-600">Please try again later or contact us directly.</p>
              </div>
            </div>
          )}

          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit} noValidate>

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="firstName" required className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="lastName" required className={inputCls} />
              </div>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="phone" required className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" name="email" required className={inputCls} />
              </div>
            </div>

            {/* City + Qualification */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  City
                </label>
                <input type="text" name="city" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Qualification
                </label>
                <select name="qualification" className={inputCls + ' text-slate-600'}>
                  <option value="">Select Level</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Diploma">Diploma</option>
                  <option value="High School">High School (12)</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                </select>
              </div>
            </div>

            {/* ── Suitable Date & Time for Call ── */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                  Suitable Date &amp; Time for Call
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="modal-call-date"
                    className="block text-xs font-bold text-blue-700 uppercase tracking-wide mb-1"
                  >
                    Preferred Date {isCallBack && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    id="modal-call-date"
                    type="date"
                    name="preferredDate"
                    min={today}
                    required={isCallBack}
                    className="w-full px-3 py-2.5 rounded-lg border border-blue-200 bg-white text-sm text-slate-700 focus:border-brand-blue focus:ring-2 focus:ring-blue-600/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-call-time"
                    className="block text-xs font-bold text-blue-700 uppercase tracking-wide mb-1"
                  >
                    Preferred Time {isCallBack && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    id="modal-call-time"
                    type="time"
                    name="preferredTime"
                    min="09:00"
                    max="18:00"
                    required={isCallBack}
                    className="w-full px-3 py-2.5 rounded-lg border border-blue-200 bg-white text-sm text-slate-700 focus:border-brand-blue focus:ring-2 focus:ring-blue-600/10 outline-none transition-all"
                  />
                </div>
              </div>
              <p className="text-[10px] text-blue-400 font-medium mt-2">
                Office hours: Sun – Fri, 9:00 AM – 6:00 PM (NPT)
              </p>
            </div>

            {/* English Test Toggle */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  English Test Given?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="modalEnglishTest"
                      value="yes"
                      checked={testGiven === 'yes'}
                      onChange={() => setTestGiven('yes')}
                      className="text-brand-blue focus:ring-blue-600"
                    />
                    <span className="text-xs">Yes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="modalEnglishTest"
                      value="no"
                      checked={testGiven === 'no'}
                      onChange={() => setTestGiven('no')}
                      className="text-brand-blue focus:ring-blue-600"
                    />
                    <span className="text-xs">No</span>
                  </label>
                </div>
              </div>
              {testGiven === 'yes' && (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <select
                    name="testType"
                    className="px-3 py-2 rounded border border-slate-200 text-xs focus:border-brand-blue outline-none"
                  >
                    <option value="">Select Test</option>
                    <option value="IELTS">IELTS</option>
                    <option value="PTE">PTE</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="Duolingo">Duolingo</option>
                  </select>
                  <input
                    type="text"
                    name="testScore"
                    placeholder="Score"
                    className="px-3 py-2 rounded border border-slate-200 text-xs focus:border-brand-blue outline-none"
                  />
                </div>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Interested Destination
              </label>
              <select name="destination" className={inputCls + ' text-slate-600'}>
                <option value="">Select Country</option>
                {DESTINATIONS.map((d: Destination) => (
                  <option key={d.id} value={d.country}>{d.country}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={2}
                placeholder="How can we help?"
                className={inputCls + ' resize-none'}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-purple hover:brightness-110 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send className="w-4 h-4" />
              }
              <span>{isCallBack ? 'Request Call Back' : 'Book Now'}</span>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}