'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  serviceTitle,
}: ConsultationModalProps): React.JSX.Element | null {
  const dialogRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className="relative bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-lg shadow-2xl z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        <div className="mb-8">
          <h2
            id="modal-title"
            className="text-2xl font-black text-slate-900 tracking-tight mb-2"
          >
            Book Free Consultation
          </h2>
          {serviceTitle && (
            <p className="text-sm text-slate-500 font-medium">
              For: <span className="text-brand-blue font-bold">{serviceTitle}</span>
            </p>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thanks! We\'ll be in touch shortly.');
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="modal-name" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Full Name
            </label>
            <input
              id="modal-name"
              type="text"
              required
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="modal-email" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Email Address
            </label>
            <input
              id="modal-email"
              type="email"
              required
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="modal-phone" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Phone Number
            </label>
            <input
              id="modal-phone"
              type="tel"
              placeholder="+977 98XXXXXXXX"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="modal-message" className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
              Message (Optional)
            </label>
            <textarea
              id="modal-message"
              rows={3}
              placeholder="Tell us about your goals..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-[#2563eb] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-2"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}