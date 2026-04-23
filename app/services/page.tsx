'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import ConsultationModal from '@/app/components/ConsultationModal';
import type { Service } from '@/types/index';

function resolveIcon(iconName: string): React.ElementType {
  const key = iconName.charAt(0).toUpperCase() +
    iconName.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  return (LucideIcons as unknown as Record<string, React.ElementType>)[key] ?? LucideIcons.Globe;
}

export default function ServicesPage(): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="page-transition min-h-screen">
      {/* Hero Banner */}
      <section className="py-16 md:py-20 relative overflow-hidden" 
      style={{ background: 'linear-gradient(to right, #214aaf, #3B82F6)' }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] mb-6">
            Premium Support
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Our Specialized <br />
            <span className="text-blue-200">Excellence.</span>
          </h1>
          <p className="text-blue-50 text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
            From first consultation to global placement, we provide a structured pathway for every student aspiring for world-class education.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service: Service) => {
              const Icon = resolveIcon(service.icon);
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:border-brand-blue hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-blue mb-8 group-hover:bg-white group-hover:text-brand-blue transition-all shadow-sm border border-slate-100 shrink-0">
                    <Icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 mb-8 flex-1 leading-relaxed font-medium line-clamp-3">
                    {service.fullDescription ?? service.description}
                  </p>
                  {service.points && (
                    <div className="space-y-3 mb-10">
                      {service.points.slice(0, 3).map((p, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs text-slate-600 font-bold uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" aria-hidden="true" />
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="w-full py-4 bg-white border border-slate-200 text-brand-blue font-black text-[11px] uppercase tracking-widest rounded-2xl group-hover:bg-white group-hover:text-brand-blue group-hover:border-slate-200 transition-all flex items-center justify-center gap-2 shrink-0">
                    Read More <ArrowRight className="w-4 h-4 text-current group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-24 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Need Personalized Guidance?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
                Speak with our certified counselors today and build your global roadmap.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="px-14 py-5 bg-[#2563eb] text-white rounded-2xl font-black text-[14px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                BOOK FREE CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}