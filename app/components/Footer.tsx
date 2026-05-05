import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const socialLinks = [
  { label: 'Facebook',  href: 'https://www.facebook.com/brightpatheducation', slug: 'facebook'  },
  { label: 'Instagram', href: 'https://www.instagram.com/brightpathnepal/',   slug: 'instagram' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@BrightPathNepal',     slug: 'youtube'   },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@brightpathnepal',      slug: 'tiktok'    },
] as const;

const classes = [
  'IELTS Academic',
  'PTE Academic',
  'Japanese N5-N4',
  'Korean TOPIK',
  'German A1-B2',
];

const legal = [
  { label: 'Privacy Policy',  href: '/privacy-policy' },
  { label: 'Terms of Use',    href: '/terms-of-use'           },
  { label: 'Refund Policy',   href: '/refund-policy'   },
];

export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 py-24 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">  
               <div className="text-white font-black">BP</div>
                {/* TODO: Replace with actual logo-icon-white.png in /public */}
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                <Image width={125} height={125} src='/bp-logo.png' alt='bightpath-logo'/>
              </span>
            </Link>

            <p className="max-w-sm mb-10 text-slate-500 font-light leading-relaxed text-lg">
              Trusted educational guidance since 2019. Empowering the next generation of global
              leaders through ethical counseling and high visa success.
            </p>

            <div className="flex gap-4">
              {socialLinks.map(({ label, href, slug }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 bg-white shadow-sm border border-slate-200 rounded-2xl hover:bg-brand-blue hover:border-brand-blue transition-all group"
                >
                  <Image
                    src={`https://cdn.simpleicons.org/${slug}/64748b`}
                    alt={label}
                    width={20}
                    height={20}
                    className="group-hover:brightness-0 group-hover:invert transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-8 text-sm uppercase tracking-[0.2em]">
              Explore
            </h4>
            <ul className="space-y-4 text-sm font-bold">
              {[
                { label: 'Home',         href: '/'             },
                { label: 'Services',     href: '/services'     },
                { label: 'Destinations', href: '/destinations' },
                { label: 'About Us',     href: '/about'        },
                { label: 'Updates',      href: '/blog'         },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-blue flex items-center gap-2 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-8 text-sm uppercase tracking-[0.2em]">
              Classes
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {classes.map((cls) => (
                <li key={cls}>
                  <Link href="/services" className="hover:text-brand-blue transition-colors">
                    {cls}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-8 text-sm uppercase tracking-[0.2em]">
              Legal
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-blue transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          <p>&copy; {currentYear} BrightPath Pvt Ltd. | All rights reserved.</p>
          <p className="flex items-center gap-2">
            Designed for Global Excellence <ChevronRight className="w-3 h-3" />
          </p>
        </div>

      </div>
    </footer>
  );
}