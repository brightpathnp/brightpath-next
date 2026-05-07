'use client';

import { useEffect, useState } from 'react';
import { X, Send, Loader2, CheckCircle, AlertCircle, CalendarClock } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import type { ConsultationModalProps, Destination } from '@/types/index';

interface ConsultationFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  qualification: string;
  preferredDate: string;
  preferredTime: string;
  englishTest: 'yes' | 'no';
  testType: string;
  testScore: string;
  destination: string;
  message: string;
  consent: boolean;
}

const initialFormData: ConsultationFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  qualification: '',
  preferredDate: '',
  preferredTime: '',
  englishTest: 'no',
  testType: '',
  testScore: '',
  destination: '',
  message: '',
  consent: true,
};

export default function ConsultationModal({
  isOpen,
  onClose,
  title = 'Free Consultation',
}: ConsultationModalProps): JSX.Element | null {
  const [formData, setFormData] = useState<ConsultationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isCallBack = title === 'Request Call Back';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value, type } = e.target;
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => {
      if (name === 'englishTest') {
        const nextEnglishTest = value as 'yes' | 'no';

        return {
          ...prev,
          englishTest: nextEnglishTest,
          testType: nextEnglishTest === 'yes' ? prev.testType : '',
          testScore: nextEnglishTest === 'yes' ? prev.testScore : '',
        };
      }

      return {
        ...prev,
        [name]: nextValue,
      };
    });
  };

  const resetForm = (): void => {
    setFormData(initialFormData);
    setIsSubmitting(false);
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.consent) {
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      qualification: formData.qualification,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      englishTest: formData.englishTest,
      testType: formData.englishTest === 'yes' ? formData.testType : '',
      testScore: formData.englishTest === 'yes' ? formData.testScore : '',
      destination: formData.destination,
      message: formData.message,
      formType: title,
      consent: formData.consent,
    };

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      setStatus('success');

      setTimeout(() => {
        resetForm();
        onClose();
      }, 3000);
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-600/10 outline-none text-sm transition-all';

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-brand-blue to-brand-purple px-6 py-4 flex justify-between items-center text-white shrink-0">
          <div>
            <h3 id="modal-title" className="text-xl font-bold">
              {title}
            </h3>
            <p className="text-blue-100 text-xs">Start your journey with BrightPath</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          {status === 'success' && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-black text-sm uppercase tracking-wider">Message sent successfully!</p>
                <p className="text-xs font-bold text-green-600/80">
                  Check your email for confirmation. Our counselor will contact you shortly.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Unable to submit at this time</p>
                <p className="text-xs text-red-600">Please try again later or contact us directly.</p>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                  Qualification
                </label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className={inputCls + ' text-slate-600'}
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
                    value={formData.preferredDate}
                    onChange={handleChange}
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
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg border border-blue-200 bg-white text-sm text-slate-700 focus:border-brand-blue focus:ring-2 focus:ring-blue-600/10 outline-none transition-all"
                  />
                </div>
              </div>
              <p className="text-[10px] text-blue-400 font-medium mt-2">
                Office hours: Sun – Fri, 9:00 AM – 5:00 PM (NPT)
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  English Test Given?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="englishTest"
                      value="yes"
                      checked={formData.englishTest === 'yes'}
                      onChange={handleChange}
                      className="text-brand-blue focus:ring-blue-600"
                    />
                    <span className="text-xs">Yes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="englishTest"
                      value="no"
                      checked={formData.englishTest === 'no'}
                      onChange={handleChange}
                      className="text-brand-blue focus:ring-blue-600"
                    />
                    <span className="text-xs">No</span>
                  </label>
                </div>
              </div>
              {formData.englishTest === 'yes' && (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <select
                    name="testType"
                    value={formData.testType}
                    onChange={handleChange}
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
                    value={formData.testScore}
                    onChange={handleChange}
                    className="px-3 py-2 rounded border border-slate-200 text-xs focus:border-brand-blue outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Interested Destination
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className={inputCls + ' text-slate-600'}
              >
                <option value="">Select Country</option>
                {DESTINATIONS.map((d: Destination) => (
                  <option key={d.id} value={d.country}>
                    {d.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={2}
                placeholder="How can we help?"
                value={formData.message}
                onChange={handleChange}
                className={inputCls + ' resize-none'}
              />
            </div>

            <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                name="consent"
                required
                aria-required="true"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
              />
              <span className="text-xs leading-5 text-slate-600">
                By submitting this form, I consent to receiving marketing communications from Brightpath at any time.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !formData.consent}
              className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-purple hover:brightness-110 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{isCallBack ? 'Request Call Back' : 'Book Now'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}