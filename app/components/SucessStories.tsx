import Image from 'next/image';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import type { Testimonial } from '@/types';

export default function SucessStories(): JSX.Element {
  return (
    <section id="testimonials" className="py-12 md:py-14 bg-white relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-blue uppercase bg-blue-50 rounded-full border border-blue-100">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-light">
            Join thousands of successful students who have built their careers with Bright Path.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t: Testimonial) => (
            <div
              key={t.id}
              className="bg-slate-50/50 p-8 rounded-2xl shadow-lg border border-blue-100 relative group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 text-brand-purple">
                <Quote className="w-10 h-10" />
              </div>
              <p className="text-slate-600 mb-8 italic font-light">{t.content}</p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-xs text-brand-blue font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}