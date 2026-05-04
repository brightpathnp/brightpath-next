'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import {
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Award,
  Star,
} from 'lucide-react';
import type { Service } from '@/types/index';
import ConsultationModal from '@/app/components/ConsultationModal';

interface ServiceDetailClientProps {
  service: Service;
}

function resolveIcon(iconName: string): React.ElementType {
  const key = iconName.charAt(0).toUpperCase() +
    iconName.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  return (LucideIcons as unknown as Record<string, React.ElementType>)[key] ?? LucideIcons.Globe;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const Icon = resolveIcon(service.icon);

  return (
    <div className="page-transition min-h-screen bg-slate-50 font-sans pb-24">
      {/* Header Banner */}
      <section className="bg-brand-dark py-10 md:py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-purple rounded-full blur-[100px] opacity-10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-blue border border-white/10 shadow-xl">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                {service.title}
              </h1>
              <p className="text-blue-100 text-sm md:text-base font-medium leading-relaxed opacity-90 max-w-xl">
                {service.fullDescription ?? service.description}
              </p>
            </div>
            {service.points && (
              <div className="hidden lg:flex justify-end">
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 max-w-sm">
                  <h2 className="text-blue-300 font-black uppercase tracking-[0.2em] text-[9px] mb-4">
                    Service Highlights
                  </h2>
                  <ul className="space-y-3">
                    {service.points.map((p, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className="w-5 h-5 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-green-400" aria-hidden="true" />
                        </div>
                        <span className="text-blue-50 font-bold text-xs">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                  How we work.
                </h2>
                <div className="w-20 h-2 bg-brand-blue rounded-full" />
                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                  {service.methodology}
                </p>
              </div>

              {service.detailedProcess && (
                <div className="space-y-8">
                  {service.detailedProcess.map((step, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="w-14 h-14 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#3B82F6] font-black text-xl shrink-0 group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-8">
              {service.credentials && (
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-blue" aria-hidden="true" />
                    Expert Credentials
                  </h3>
                  <div className="space-y-4">
                    {service.credentials.map((cred, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <Award className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-xs font-bold text-slate-700 leading-tight">{cred}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{ background: 'linear-gradient(to right, #214aaf, #3B82F6)' }}
                className="bg-white p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-black mb-4 relative z-10">Ready to Start?</h3>
                <p className="text-blue-100 text-sm font-medium mb-8 relative z-10">
                  Get a specialized consultation session for {service.title} today.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-4 bg-white font-black text-[11px] rounded-2xl uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10"
                  style={{ color: '#3b8df6' }}
                >
                  Book Session Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {service.team && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                Our Experts.
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Our team consists of certified professionals with years of experience in the education sector.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.team.map((member, i) => (
                <Link
                  key={i}
                  href={`/team/${member.slug}`}
                  className="group bg-slate-50 p-6 rounded-[3rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 text-center block"
                >
                  <div className="relative inline-block mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-[2rem] object-cover border-4 border-white shadow-lg mx-auto"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-blue text-white rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
                      <Star className="w-5 h-5 fill-white" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-brand-blue transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-brand-blue text-[10px] font-black uppercase tracking-widest mb-6">
                    {member.role}
                  </p>
                  <div className="flex flex-col gap-2 mt-1">
                    {member.credentials.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-brand-blue flex-shrink-0"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                          <path
                            d="M3.5 6l1.8 1.8 3.2-3.6"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-xs text-left font-semibold text-slate-600">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] font-black text-brand-blue uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View Profile <ChevronLeft className="w-3.5 h-3.5 rotate-180" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-100 p-16 md:p-24 rounded-[4rem] text-center text-black shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Need Personalized Guidance?
              </h2>
              <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed text-transparent bg-clip-text bg-gradient-brand">
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

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={service.title}
      />
    </div>
  );
}