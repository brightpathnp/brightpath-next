'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Briefcase,
  DollarSign,
  Calendar,
  BookOpen,
  ClipboardList,
  FileText,
  HelpCircle,
} from 'lucide-react';
import ConsultationModal from '@/app/components/ConsultationModal';
import type { Destination } from '@/types';

interface DestinationDetailClientProps {
  destination: Destination;
}

export default function DestinationDetailClient({ destination }: DestinationDetailClientProps): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { details } = destination;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-slate-900 py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={destination.image}
            alt={destination.country}
            fill
            className="object-cover opacity-100"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/40 z-0" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 text-[10px] font-black uppercase tracking-[0.3em] transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            All Destinations
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <GraduationCap className="w-4 h-4 text-blue-200" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {destination.count}+ Programs Available
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Study in <br />
                <span className="text-blue-200">{destination.country}</span>
              </h1>
              <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                {destination.highlight}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {destination.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {details && (
              <div className="hidden lg:block">
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 space-y-4">
                  <h2 className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-300 mb-4">
                    Key Facts
                  </h2>
                  {details.costs && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <DollarSign className="w-4 h-4 text-blue-200" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-0.5">Tuition</p>
                          <p className="text-sm font-medium text-white">{details.costs.tuition}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Briefcase className="w-4 h-4 text-blue-200" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-0.5">Living Cost</p>
                          <p className="text-sm font-medium text-white">{details.costs.living}</p>
                        </div>
                      </div>
                    </>
                  )}
                  {details.intakes && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-blue-200" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">Intakes</p>
                        <div className="flex flex-wrap gap-1.5">
                          {details.intakes.map((intake) => (
                            <span key={intake} className="text-[10px] font-bold text-blue-100 bg-white/10 px-2 py-1 rounded-lg">
                              {intake}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {details.workRights && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-blue-200" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-0.5">Work Rights</p>
                        <p className="text-sm font-medium text-white">{details.workRights}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 space-y-16">
        {details ? (
          <>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-14">
                {details.overview && (
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                      Overview
                    </h2>
                    <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-6" />
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {details.overview}
                    </p>
                  </div>
                )}

                {details.whyStudy && (
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                      Why Study in {destination.country}?
                    </h2>
                    <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-8" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      {details.whyStudy.map((reason, i) => (
                        <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                          <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />
                          <p className="text-sm font-bold text-slate-700">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {details.popularCourses && (
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-brand-blue" aria-hidden="true" />
                      Popular Courses
                    </h2>
                    <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-6" />
                    <div className="flex flex-wrap gap-3">
                      {details.popularCourses.map((course) => (
                        <span
                          key={course}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {details.requirements && (
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                      Entry Requirements
                    </h2>
                    <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-6" />
                    <ul className="space-y-3">
                      {details.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-brand-blue" aria-hidden="true" />
                          </div>
                          <span className="text-sm font-medium text-slate-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(details.admissionChecklist || details.visaChecklist) && (
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                      <ClipboardList className="w-6 h-6 text-brand-blue" aria-hidden="true" />
                      Document Checklists
                    </h2>
                    <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-8" />
                    <div className="grid sm:grid-cols-2 gap-6">
                      {details.admissionChecklist && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue mb-4 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" aria-hidden="true" />
                            Admission Documents
                          </h3>
                          <ul className="space-y-2.5">
                            {details.admissionChecklist.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {details.visaChecklist && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" aria-hidden="true" />
                            Visa Documents
                          </h3>
                          <ul className="space-y-2.5">
                            {details.visaChecklist.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {details.faqs && details.faqs.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                      <HelpCircle className="w-6 h-6 text-brand-blue" aria-hidden="true" />
                      Frequently Asked Questions
                    </h2>
                    <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-8" />
                    <div className="space-y-3">
                      {details.faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            aria-expanded={openFaq === i}
                            className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                          >
                            <span className="text-sm font-black text-slate-900 pr-4">{faq.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-brand-blue shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                          {openFaq === i && (
                            <div className="px-6 pb-5">
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#214aaf] to-brand-blue p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden sticky top-28">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-xl font-black mb-3 relative z-10">
                    Ready to Study in {destination.country}?
                  </h3>
                  <p className="text-blue-100 text-sm font-medium mb-6 relative z-10">
                    Get expert guidance on admission, visa, and scholarship options today.
                  </p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-4 bg-white text-brand-blue font-black text-[11px] rounded-2xl uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10"
                  >
                    Book Free Consultation
                  </button>
                  <Link
                    href="/destinations"
                    className="mt-3 w-full py-3 flex items-center justify-center gap-2 bg-white/10 text-white font-black text-[11px] rounded-2xl uppercase tracking-widest hover:bg-white/20 transition-all relative z-10"
                  >
                    All Destinations
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>

                {details.intakes && (
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      Intake Periods
                    </h3>
                    <div className="space-y-2">
                      {details.intakes.map((intake) => (
                        <div key={intake} className="flex items-center gap-2.5 py-2 border-b border-slate-50 last:border-0">
                          <div className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                          <span className="text-sm font-medium text-slate-700">{intake}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                  Why Study in {destination.country}?
                </h2>
                <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-8" />
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm font-bold text-slate-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
                <p className="text-sm font-medium text-blue-700 leading-relaxed">
                  Contact our counselors for detailed information about requirements, costs, and intakes for {destination.country}.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-[#214aaf] to-brand-blue p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden sticky top-28">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xl font-black mb-3 relative z-10">
                  Interested in {destination.country}?
                </h3>
                <p className="text-blue-100 text-sm font-medium mb-6 relative z-10">
                  Our counselors have full details on requirements, costs, and intakes.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-4 bg-white text-brand-blue font-black text-[11px] rounded-2xl uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#0f172a] p-16 md:p-20 rounded-[4rem] text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-blue-100 text-lg font-medium max-w-xl mx-auto leading-relaxed opacity-90">
              BrightPath handles every step — admission, visa, language prep, and more.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-10 py-4 bg-brand-blue text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.15em] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}