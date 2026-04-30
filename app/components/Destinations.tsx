import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import type { Destination } from '@/types';

export default function Destinations(): JSX.Element {
  return (
    <section id="destinations" className="py-24 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Top Destinations
            </h2>
            <p className="text-slate-500 mt-6 text-xl font-light leading-relaxed">
              Discover your next academic home. From the high-tech cities of Japan to the research
              hubs of Australia.
            </p>
          </div>
          <Link
            href="/destinations"
            className="px-10 py-4 bg-brand-blue text-white rounded-full font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all whitespace-nowrap"
          >
            Explore All 15+ Countries
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DESTINATIONS.slice(0, 6).map((dest: Destination) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className="group relative h-[400px] block rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-white"
            >
              <Image
                src={dest.image}
                alt={dest.country}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20 opacity-80 group-hover:opacity-95 transition-all duration-500" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="absolute top-6 left-6 bg-brand-blue/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                  {dest.count}+ Institutions
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-1 tracking-tight group-hover:text-blue-100 transition-colors">
                    {dest.country}
                  </h3>
                  <p className="text-xs font-bold text-white mb-4 group-hover:text-sky-300 transition-colors">
                    {dest.highlight}
                  </p>

                  <div className="space-y-1.5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {dest.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-1 p-0.5 bg-green-500 rounded-full shrink-0">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-100 leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                    <div className="pt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-sky-300 transition-colors">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}