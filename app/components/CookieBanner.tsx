'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner(): React.JSX.Element | null {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = sessionStorage.getItem('bp_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept(): void {
    sessionStorage.setItem('bp_cookie_consent', 'accepted');
    setVisible(false);
  }

  function handleDecline(): void {
    sessionStorage.setItem('bp_cookie_consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-gray-900 text-gray-200 rounded-xl shadow-2xl border border-gray-700 p-5"
    >
      <button
        onClick={handleDecline}
        aria-label="Dismiss cookie banner"
        className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-3 mb-3">
        <Cookie size={20} className="shrink-0 mt-0.5 text-blue-500" />
        <div>
          <p className="text-sm font-semibold text-white mb-1">We use cookies</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            We use cookies to improve your browsing experience and analyse site traffic. By
            clicking <strong className="text-gray-200">Accept</strong>, you consent to our use
            of cookies.{' '}
            <Link href="/privacy-policy" className="text-blue-500 hover:text-teal-300 underline underline-offset-2">
              Learn more
            </Link>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleAccept}
          className="flex-1 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Accept All
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}