import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe2, GraduationCap } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import type { Destination } from '@/types';

export default function Destinations(): React.JSX.Element {
  const featuredDestinations = DESTINATIONS.slice(0, 6);

  return (
    <section id="destinations" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-blue-100 bg-blue-50 text-brand-blue">
              <Globe2 className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-black uppercase tracking-widest">
                Study Destinations
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Explore countries where your next chapter can begin.
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-brand-blue text-sm font-bold uppercase tracking-widest transition-all hover:gap-3"
          >
            View All Destinations
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredDestinations.map((destination: Destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={`${destination.country} study destination`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">
                    {destination.count}+ Programs
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-blue-200">
                    Featured Country
                  </p>
                  <h3 className="text-3xl font-black tracking-tight text-white transition-colors group-hover:text-blue-200">
                    {destination.country}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-blue-50/90">
                    {destination.highlight}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6 flex flex-wrap gap-2">
                  {destination.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 transition-colors group-hover:border-blue-100 group-hover:text-brand-blue"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-brand-blue transition-all group-hover:gap-3">
                  Explore Destination
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}