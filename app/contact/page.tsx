import type { Metadata } from 'next';
import { MessageCircleMore } from 'lucide-react';
import Contact from '@/app/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us | BrightPath Education Consultancy',
  description:
    "Your Future Starts Here. Whether you're exploring options or ready to apply, our team is committed to your success. Reach out and let's discuss your roadmap.",
  openGraph: {
    title: 'Contact Us | BrightPath Education Consultancy',
    description:
      "Your Future Starts Here. Whether you're exploring options or ready to apply, our team is committed to your success. Reach out and let's discuss your roadmap.",
    url: 'https://brightpathnepal.com/contact',
  },
};

export default function ContactPage(): JSX.Element {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-blue to-brand-purple">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_24%)]"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:min-h-[500px] md:py-24 lg:px-8 lg:py-28">
          <div className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
            <span className="mr-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-blue shadow-lg shadow-blue-950/20">
              <MessageCircleMore className="h-5 w-5 animate-[pulse_2s_ease-in-out_infinite]" aria-hidden="true" />
            </span>
            <span className="text-sm font-black uppercase tracking-[0.24em] text-white">
              Connect with Experts
            </span>
          </div>

          <h1 className="mt-8 text-center text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Future
            <br />
            Starts Here.
          </h1>

          <p className="mt-6 max-w-3xl text-center text-base font-medium leading-relaxed text-blue-50/90 sm:text-lg lg:text-xl">
            Whether you&apos;re exploring options or ready to apply, our team is committed to your
            success. Reach out and let&apos;s discuss your roadmap.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-10 pb-16 md:-mt-14 md:pb-24 lg:-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
            <Contact />
          </div>
        </div>
      </section>
    </main>
  );
}