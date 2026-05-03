import type React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LanguageClass } from '@/types';
import { LANGUAGES } from '@/lib/constants';

export default function LanguagePrep(): React.JSX.Element {
  return (
    <section id="test-prep" className="py-12 md:py-14 bg-white font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-blue uppercase bg-blue-50 rounded-full border border-blue-100">
            Skill Enhancement
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Language Preparation</h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Prepare for IELTS, PTE, Duolingo, and TOPIK with top instructors. Get access to online & onsite classes, mock tests, and study materials. Benefit from small batch sizes, well-facilitated classrooms, and personalized feedback to ensure your success.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {LANGUAGES.map((lang: LanguageClass) => {
            const iconKey = lang.icon.charAt(0).toUpperCase() + lang.icon.slice(1);
            const Icon =
              (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconKey] ??
              LucideIcons.Globe;

            return (
              <div
                key={lang.name}
                className="group relative bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:border-brand-blue hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden text-center cursor-default"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue group-hover:scale-110 transition-transform group-hover:bg-brand-blue group-hover:text-white shadow-sm border border-slate-100">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 group-hover:text-brand-blue transition-colors">
                  {lang.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}