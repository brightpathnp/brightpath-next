import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import type { Service } from '@/types';

function getIcon(iconName: string): React.ElementType {
  const key =
    iconName.charAt(0).toUpperCase() +
    iconName.slice(1).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  return (LucideIcons as unknown as Record<string, React.ElementType>)[key] ?? LucideIcons.Globe;
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-purple uppercase bg-purple-50 rounded-full border border-purple-100">
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Expert Services for Global Students.
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.slice(0, 4).map((service: Service) => {
            const Icon = getIcon(service.icon);
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group p-10 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 text-brand-blue shadow-sm border border-slate-100 group-hover:scale-110 group-hover:border-brand-blue/30 group-hover:shadow-md transition-all duration-300">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-blue opacity-0 group-hover:opacity-100 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}