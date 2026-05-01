'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Globe, MapPin, Check, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants';
import type { Destination } from '@/types';

export default function DestinationsClient(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = DESTINATIONS.filter(
    (d) =>
      d.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.highlight.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="page-transition min-h-screen">

      {/* Hero + Search */}
      <section className="bg-gradient-brand py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-8">Study Abroad Destinations</h1>
          <div className="max-w-xl mx-auto relative">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search for a country..."
              className="w-full py-6 pl-16 pr-6 rounded-full bg-white text-slate-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/20 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search destinations"
            />
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((dest: Destination) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 group"
                >
                  <div className="h-64 relative overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.country}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                      <Globe className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">
                        {dest.count}+ Institutions
                      </span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-brand-blue mb-4">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm font-bold uppercase tracking-widest">
                        Featured Destination
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 mb-4">{dest.country}</h2>

                    <p className="text-blue-600 font-bold text-sm mb-6 pb-6 border-b border-slate-100">
                      {dest.highlight}
                    </p>

                    <div className="space-y-3 mb-10 flex-1">
                      {dest.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 p-0.5 bg-green-100 rounded-full shrink-0">
                            <Check className="w-3 h-3 text-green-600" aria-hidden="true" />
                          </div>
                          <span className="text-sm text-slate-600 leading-tight font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/destinations/${dest.id}`}
                      className="w-full py-4 bg-brand-blue text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-dark transition-all group/btn"
                    >
                      View Detailed Guide
                      <ArrowRight
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl font-medium">
                No destinations found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}