import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Users,
  Briefcase,
  CheckCircle2,
  History,
  Star,
  Trophy,
  Sparkles,
  Zap,
  Building2,
  HeartHandshake,
  Verified,
  BookOpenCheck,
} from 'lucide-react';
import { MILESTONES } from '@/lib/constants';
import type { Milestone } from '@/types';

export const metadata: Metadata = {
  title: 'About Us | BrightPath',
  description:
    'Learn about BrightPath Nepal — a premier educational consultancy empowering Nepali students since 2019 with a 98% visa success rate.',
  openGraph: {
    title: 'About BrightPath Nepal',
    description: 'Empowering Nepali students since 2019 through integrity, precision, and a relentless focus on student outcomes.',
  },
};

const coreValues = [
  {
    icon: ShieldCheck,
    title: 'Honesty',
    desc: 'Straightforward advice and completely transparent fee structures.',
    color: 'text-blue-600',
  },
  {
    icon: Briefcase,
    title: 'Excellence',
    desc: 'Maintaining the highest visa success rates through meticulous work.',
    color: 'text-brand-blue',
  },
  {
    icon: CheckCircle2,
    title: 'Impact',
    desc: 'We focus on outcomes that genuinely change student lives.',
    color: 'text-green-600',
  },
];

const credentials = [
  'Ministry of Social Development Authorized',
  'CTEVT TITI Trained Team',
  'British Council Certified Experts',
  'Nepal Gov. (MoSD) Approved',
];

const edgeItems = [
  {
    icon: Zap,
    bg: 'bg-blue-50',
    color: 'text-brand-blue',
    hoverBg: 'group-hover:bg-brand-blue',
    title: '98.4% Proven Success',
    desc: 'Industry leading visa approval rates through meticulous documentation.',
  },
  {
    icon: Building2,
    bg: 'bg-purple-50',
    color: 'text-brand-purple',
    hoverBg: 'group-hover:bg-brand-purple',
    title: '500+ Partner Institutions',
    desc: 'Direct authorized representation of world-class universities globally.',
  },
  {
    icon: HeartHandshake,
    bg: 'bg-green-50',
    color: 'text-green-600',
    hoverBg: 'group-hover:bg-green-600',
    title: 'Ethical Guidance',
    desc: 'No hidden fees. No false promises. Just pure professional counseling.',
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <div className="page-transition min-h-screen bg-slate-50 font-sans">

      {/* ── Hero ── */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-blue-100/40 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-purple-100/30 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-brand-blue rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                Empowering Nepali Students Since 2019
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.95] mb-6 tracking-tighter">
                Your Success is{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                  Our Mission.
                </span>
              </h1>

              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-xl">
                BrightPath is a premier educational gateway, transforming global aspirations into
                reality through integrity, precision, and a relentless focus on student outcomes.
              </p>

              <div className="flex items-center gap-8 py-5 border-y border-slate-100">
                {[
                  { value: '5,000+', label: 'Students Guided' },
                  { value: '98%',    label: 'Visa Success'     },
                  { value: '15+',    label: 'Global Destinations' },
                ].map((stat, i, arr) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 leading-none">{stat.value}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</span>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-8 bg-slate-100" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200"
                  alt="BrightPath team helping students plan their global education"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 0px, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" aria-hidden="true" />
              </div>

              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 z-20 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-brand text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Industry Leader</p>
                    <div className="flex items-center gap-1" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About BrightPath ── */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />

            <div className="grid lg:grid-cols-5 gap-16 relative z-10">
              {/* Description */}
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">About BrightPath</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-6">
                  At <span className="text-brand-blue font-black">BrightPath</span>, we are committed
                  to providing high-quality, internationally accredited educational guidance that empowers
                  individuals to advance their academic careers and achieve their professional goals.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8">
                  With a focus on practical learning, expert instruction, and personalized counseling, we
                  equip students with the skills and global roadmap needed to succeed in today&apos;s
                  competitive world. Whether you&apos;re pursuing a specialized degree, language
                  certification, or career migration, our programs are designed to meet industry
                  standards and global expectations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  <div className="flex items-center gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <Verified className="w-8 h-8 text-brand-blue shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest leading-none mb-1">Government Approved</p>
                      <p className="text-xs font-bold text-slate-700">Ministry of Social Development</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-purple-50/50 rounded-2xl border border-purple-100">
                    <BookOpenCheck className="w-8 h-8 text-brand-purple shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[10px] font-black text-brand-purple uppercase tracking-widest leading-none mb-1">Certified Counsellors</p>
                      <p className="text-xs font-bold text-slate-700">British Council &amp; CTEVT TITI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials Sidebar */}
              <div className="lg:col-span-2 self-start">
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                  <h4 className="text-xl font-black mb-6 border-b border-white/10 pb-4">Our Credentials</h4>
                  <ul className="space-y-5">
                    {credentials.map((cred) => (
                      <li key={cred} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-white" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold text-blue-50">{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Our Mission</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                To deliver precise, career-oriented guidance to students through a network of certified
                experts and global academic partnerships.
              </p>
            </div>
            <div className="bg-brand-blue p-10 rounded-[2.5rem] text-white shadow-xl hover:bg-brand-dark transition-colors duration-500">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight text-white">Our Vision</h3>
              <p className="text-blue-50 text-base leading-relaxed font-medium">
                To be the primary bridge connecting Nepali potential with world-class education,
                fostering a generation of globally-aware leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-black mb-4 tracking-tight text-slate-900">Core Values</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-sm uppercase tracking-widest">
            Integrity. Excellence. Impact.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {coreValues.map((val) => (
            <div
              key={val.title}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-brand-blue transition-all group text-center"
            >
              <div className={`w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center ${val.color} mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <val.icon className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">{val.title}</h3>
              <p className="text-slate-500 font-bold leading-relaxed text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-4">
              <History className="w-7 h-7 text-brand-blue" aria-hidden="true" />
              Our Evolution
            </h2>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              A legacy of growth and trust
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-100 hidden md:block" aria-hidden="true" />
            <div className="space-y-12 md:space-y-20">
              {MILESTONES.map((milestone: Milestone, idx: number) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-5/12" />
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-brand-blue z-10 items-center justify-center shadow-md hidden md:flex">
                    <Star className="w-3 h-3 text-brand-blue fill-brand-blue" aria-hidden="true" />
                  </div>
                  <div className="w-full md:w-5/12 group">
                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-blue-900/5 transition-all">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-black text-brand-blue/30 group-hover:text-brand-blue transition-colors">
                          {milestone.year}
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{milestone.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed text-xs">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Director Note + BrightPath Edge ── */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-blue/20 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Director Quote */}
            <div className="space-y-6">
              <div className="w-12 h-1 bg-brand-blue rounded-full" />
              <h2 className="text-3xl font-black tracking-tight leading-tight">Leadership &amp; Trust.</h2>
              <p className="text-blue-100 text-xl italic font-light leading-relaxed border-l-4 border-blue-600/30 pl-6">
                &ldquo;At BrightPath, we don&apos;t just process applications; we curate futures. Every
                student deserves a transparent and professional path to their global dreams.&rdquo;
              </p>
              <div>
                <p className="text-xl font-black text-white">Sita Lamsal</p>
                <p className="text-sky-400 uppercase tracking-widest text-[10px] font-black mt-1">
                  Managing Director, BrightPath Nepal
                </p>
              </div>
            </div>

            {/* BrightPath Edge Card */}
            <div className="bg-white p-10 rounded-[3rem] text-slate-900 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 tracking-tighter border-b border-slate-100 pb-4">
                The BrightPath Edge.
              </h3>
              <div className="space-y-6">
                {edgeItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 group">
                    <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center shrink-0 ${item.hoverBg} group-hover:text-white transition-all`}>
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-black uppercase tracking-widest">Global Standards</span>
                <div className="flex gap-2" aria-hidden="true">
                  <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}