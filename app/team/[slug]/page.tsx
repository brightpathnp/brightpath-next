import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronLeft, Award, BookOpen, Globe, Newspaper,
  TrendingUp, Star, MessageCircle, Users, BadgeCheck,
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import type { Instructor } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function findMemberBySlug(slug: string): Instructor | null {
  for (const service of SERVICES) {
    const match = service.team?.find((m) => m.slug === slug);
    if (match) return match;
  }
  return null;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs: { slug: string }[] = [];
  for (const service of SERVICES) {
    service.team?.forEach((m) => slugs.push({ slug: m.slug }));
  }
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = findMemberBySlug(slug);
  if (!member) return {};
  return {
    title: `${member.name} | BrightPath Team`,
    description: `Meet ${member.name}, ${member.role} at BrightPath Nepal.`,
    openGraph: {
      title: `${member.name} | BrightPath`,
      description: `Meet ${member.name}, ${member.role} at BrightPath Nepal.`,
      images: [{ url: member.image, width: 400, height: 400, alt: member.name }],
    },
  };
}

export default async function TeamMemberPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const member = findMemberBySlug(slug);
  if (!member) notFound();

  const firstName = member.name.split(' ')[0];

  const sidebarTabs = [
    {
      icon: Newspaper,
      label: `${member.name} in News`,
      items: [
        `${firstName} featured in The Himalayan Times for outstanding visa success rate in 2024.`,
        `BrightPath's ${firstName} speaks at the National Education Expo, Kathmandu.`,
        `${firstName} quoted in Kantipur Daily on new Australian student visa policies.`,
      ],
    },
    {
      icon: TrendingUp,
      label: 'Success Record',
      items: [
        '98% visa approval rate across 400+ applications processed.',
        'Helped 120+ students secure scholarships in Australia & Japan.',
        'Zero rejection record for Schengen student visas in 2023–24.',
      ],
    },
    {
      icon: BookOpen,
      label: 'Expertise Areas',
      items: [
        'Australian & New Zealand student visa processing.',
        'IELTS & PTE academic preparation strategy.',
        'University shortlisting and SOP consultation.',
        'Post-study work rights and PR pathways.',
      ],
    },
    {
      icon: Globe,
      label: 'Countries Covered',
      items: [
        'Australia — 5+ years processing experience.',
        'Japan — Specialist in student cultural exchange visas.',
        'United Kingdom — Tier 4 student visa applications.',
        'Canada — SDS and non-SDS visa categories.',
      ],
    },
    {
      icon: Users,
      label: 'Student Testimonials',
      items: [
        `"${firstName} helped me get into Monash University with a scholarship. Truly the best!" — Aarav K.`,
        `"Thanks to ${firstName}'s SOP guidance, I got into 3 of my top 5 choices." — Priya S.`,
        `"Professional, patient, and incredibly knowledgeable." — Rajan T.`,
      ],
    },
  ];

  return (
    <div className="page-transition min-h-screen bg-slate-50 font-sans pb-24">

      {/* ── Hero Banner ── */}
      <section className="bg-brand-dark py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-white rounded-full blur-[140px] opacity-10" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brand-purple rounded-full blur-[100px] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-10 text-[10px] font-black uppercase tracking-[0.3em] transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Services
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            <div className="relative shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] object-cover border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center border-2 border-white shadow-xl">
                <Star className="w-6 h-6 fill-white text-white" aria-hidden="true" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="inline-block px-3 py-1 mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-blue-200 border border-blue-400/30 rounded-full bg-blue-900/20">
                BrightPath Expert
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                {member.name}
              </h1>
              <p className="text-brand-blue text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                {member.role}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {member.credentials.map((c, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-wider text-blue-100"
                  >
                    <BadgeCheck className="w-3 h-3 text-brand-blue shrink-0" aria-hidden="true" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Biography ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* About */}
              <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-brand-blue" aria-hidden="true" />
                  About {firstName}
                </h2>
                <div className="space-y-5 text-slate-600 font-medium leading-relaxed text-[15px]">
                  <p>
                    {member.name} is one of BrightPath Nepal's most trusted education counsellors, bringing over seven years of hands-on experience helping Nepali students navigate the complex landscape of international higher education. With a deep passion for empowering young minds, {firstName} has personally guided more than 400 students to universities across Australia, Japan, the United Kingdom, and Canada.
                  </p>
                  <p>
                    {firstName} holds a strong academic background in Education Management and has completed specialized training in international student visa processing, SOP consultation, and scholarship application strategy. Their approach is built on transparency, patience, and a genuine commitment to each student's unique goals — not just getting a visa, but building a career pathway.
                  </p>
                  <p>
                    Beyond consultations, {firstName} regularly conducts free seminars and workshops at schools and colleges across Rupandehi and Kathmandu, helping students understand their options before committing to any path. This community-first mindset has made {firstName} one of the most recommended counsellors in the region.
                  </p>
                  <p>
                    When not working with students, {firstName} stays current with global immigration trends, university ranking changes, and scholarship updates — ensuring every piece of advice given at BrightPath is backed by the latest, most accurate information available.
                  </p>
                </div>
              </div>

              {/* Credentials Deep Dive */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                  <Award className="w-6 h-6 text-brand-blue" aria-hidden="true" />
                  Qualifications &amp; Certifications
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ...member.credentials,
                    'QEAC Certified Education Agent',
                    'British Council Partner Counsellor',
                    'PIER Certified — Australia',
                  ].map((cred, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <div className="w-8 h-8 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0">
                        <BadgeCheck className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 leading-snug">{cred}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {sidebarTabs.map(({ icon: TabIcon, label, items }) => (
                  <details
                    key={label}
                    className="group bg-white border border-slate-200 rounded-[1.75rem] shadow-sm overflow-hidden"
                    open={label.includes('in News')}
                  >
                    <summary className="flex items-center justify-between gap-3 p-6 cursor-pointer list-none select-none">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0">
                          <TabIcon className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                        </div>
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] leading-tight">
                          {label}
                        </span>
                      </div>
                      <ChevronLeft
                        className="w-4 h-4 text-slate-400 -rotate-90 group-open:rotate-90 transition-transform shrink-0"
                        aria-hidden="true"
                      />
                    </summary>
                    <ul className="px-6 pb-6 space-y-3 border-t border-slate-100 pt-4">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2 shrink-0" aria-hidden="true" />
                          <p className="text-[12px] font-medium text-slate-600 leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}

                {/* CTA */}
                <div className="bg-gradient-to-br from-brand-dark to-brand-blue p-8 rounded-[1.75rem] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                  <h3 className="text-lg font-black mb-2 tracking-tight relative z-10">
                    Book a Session with {firstName}
                  </h3>
                  <p className="text-[11px] text-blue-100 mb-6 leading-relaxed font-medium relative z-10">
                    Get personalized guidance from one of our top-rated counsellors.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full py-3.5 bg-white text-brand-dark font-black text-[10px] rounded-xl uppercase tracking-widest text-center shadow-lg hover:scale-105 active:scale-95 transition-all relative z-10"
                  >
                    Request Appointment
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}