import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe2, GraduationCap } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import type { Destination } from '@/types';

export const metadata: Metadata = {
  title: 'Study Destinations',
  description: 'Explore 15+ countries where BrightPath can guide your education journey — from Australia and Canada to Japan, Germany, and beyond.',
  openGraph: {
    title: 'Study Destinations | BrightPath',
    description: 'Explore 15+ countries where BrightPath can guide your education journey.',
  },
};

export default function DestinationsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-r from-[#214aaf] to-brand-blue">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] mb-6">
            <Globe2 className="w-3.5 h-3.5" aria-hidden="true" />
            {DESTINATIONS.length} Countries Available
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Find Your Perfect <br />
            <span className="text-blue-200">Destination.</span>
          </h1>
          <p className="text-blue-50 text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
            From world-class universities in Australia to affordable programs in Europe — we guide you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {DESTINATIONS.map((destination: Destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.id}`}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={`${destination.country} study destination`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                    <GraduationCap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">
                      {destination.count}+ Programs
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5">
                    <h2 className="text-2xl font-black tracking-tight text-white transition-colors group-hover:text-blue-200">
                      {destination.country}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-blue-50/90">
                      {destination.highlight}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {destination.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 transition-colors group-hover:border-blue-100 group-hover:text-brand-blue"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-brand-blue transition-all group-hover:gap-3">
                    Explore {destination.country}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-24 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Not sure where to go?
              </h2>
              <p className="text-blue-100 text-lg font-medium max-w-xl mx-auto leading-relaxed opacity-90">
                Our counselors match your goals, budget, and profile to the right country and university.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-brand-blue text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.15em] shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}