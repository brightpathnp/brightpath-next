'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, Send, X } from 'lucide-react';

interface ContactPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ContactPolicyModal({
  isOpen,
  onClose,
  title = 'Contact Us',
}: ContactPolicyModalProps): JSX.Element | null {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      formRef.current?.reset();

      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2500);
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-blue-600/10';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-contact-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="shrink-0 bg-gradient-to-r from-brand-blue to-brand-purple px-6 py-4 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 id="policy-contact-modal-title" className="text-xl font-bold">
                {title}
              </h3>
              <p className="text-xs text-blue-100">
                Send us your question and our team will get back to you.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
              aria-label="Close contact modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          {status === 'success' && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-bold">Message sent successfully!</p>
                <p className="text-xs text-green-600">Our team will contact you shortly.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-bold">Unable to submit at this time.</p>
                <p className="text-xs text-red-600">Please try again shortly.</p>
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="policy-first-name"
                  className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="policy-first-name"
                  name="firstName"
                  type="text"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label
                  htmlFor="policy-last-name"
                  className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="policy-last-name"
                  name="lastName"
                  type="text"
                  required
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="policy-phone"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="policy-phone"
                name="phone"
                type="tel"
                required
                className={inputCls}
              />
            </div>

            <div>
              <label
                htmlFor="policy-email"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="policy-email"
                name="email"
                type="email"
                required
                className={inputCls}
              />
            </div>

            <div>
              <label
                htmlFor="policy-message"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="policy-message"
                name="message"
                rows={4}
                required
                placeholder="How can we help?"
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple py-3 font-bold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}