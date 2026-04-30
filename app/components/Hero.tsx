'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

const Hero = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="relative flex items-center justify-center pt-0 pb-12 bg-slate-50 overflow-hidden font-sans"
        id="home"
      >
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div
            className="absolute top-0 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="max-w-7xl w-full mx-auto px-4 z-10 relative">
          {/* Inner Card */}
          <div className="bg-slate-100 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-sm border border-slate-200 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-60 translate-x-1/4 -translate-y-1/4 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm self-start">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brand-blue animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                    Welcome to BrightPath
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-slate-900">
                  Your Trusted <br />
                  Global Admissions <br />
                  <span className="text-transparent bg-clip-text bg-gradient-brand">Partner.</span>
                </h1>

                <p className="text-lg text-slate-600 max-w-xl leading-relaxed font-light">
                  Connecting students with top educational institutions worldwide. We are your
                  marketplace for seamless collaboration, driving success in your study abroad journey.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="px-8 py-3.5 bg-gradient-to-r from-brand-blue via-brand-blue to-brand-purple text-white rounded-md font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 uppercase tracking-wide"
                  >
                    REQUEST CALL BACK
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-50 inline-flex items-center gap-3 shadow-md shadow-blue-900/5 h-[50px]">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        Visa Success
                      </p>
                      <p className="text-lg font-bold text-brand-blue">98%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="relative hidden lg:block">
                <div className="relative z-10">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                      alt="Student planning global education"
                      fill
                      className="object-cover rounded-3xl shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700"
                      priority
                      sizes="(max-width: 1024px) 0px, 50vw"
                    />
                  </div>

                  {/* Floating Globe Card */}
                  <div
                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce"
                    style={{ animationDuration: '3s' }}
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Global Reach</p>
                      <p className="text-sm font-bold text-slate-900">12+ Countries</p>
                    </div>
                  </div>
                </div>

                {/* Dot Grid */}
                <div className="absolute -top-10 -right-10 grid grid-cols-6 gap-2 opacity-20" aria-hidden="true">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Hero;