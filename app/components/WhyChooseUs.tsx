import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const points: string[] = [
  'Authorized Representative of Global Top 500 Universities',
  'Ministry of Social Development (MoSD) Approved Consultancy',
  'Counselors Trained by CTEVT TITI & British Council',
  'Industry-Leading 98.4% Visa Success Rate',
  '100% Transparent Scholarship Documentation Process',
];

export default function WhyChooseUs(): React.ReactElement {
  return (
    <section id="about" className="py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#0a1628] rounded-[3.5rem] overflow-hidden relative shadow-2xl">
          {/* Ambient glows */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full -translate-x-1/2 translate-y-1/2 opacity-20 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-10 md:p-14 text-white items-center">
            {/* Left column */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Beyond Visas.{' '}
                <br />
                We Build{' '}
                <span className="text-blue-300">Global Careers.</span>
              </h2>

              <p className="text-blue-100 text-lg font-light leading-relaxed">
                Our personalized approach ensures that every student gets guidance
                tailored to their unique profile and aspirations. We are your
                bridge to a brighter future.
              </p>

              <ul className="space-y-4" role="list">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-4 text-sm font-semibold tracking-wide"
                  >
                    <span className="p-1 bg-green-500 rounded-full shrink-0" aria-hidden="true">
                      <CheckCircle2 className="text-white w-3 h-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-xs"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Right column — testimonial card */}
            <div>
              <figure className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-inner">
                <blockquote>
                  <p className="text-xl italic font-light mb-6 leading-relaxed text-blue-100">
                    &ldquo;Education is the most powerful weapon which you can use
                    to change the world. At BrightPath, we empower you with that
                    weapon through precise global guidance.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
                    alt="Sita Lamsal, Managing Director of BrightPath"
                    width={64}
                    height={64}
                    className="rounded-2xl border-2 border-white/20 object-cover shadow-2xl"
                  />
                  <div>
                    <p className="font-black text-lg">Sita Lamsal</p>
                    <p className="text-xs text-blue-300 font-bold uppercase tracking-widest">
                      Managing Director
                    </p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}