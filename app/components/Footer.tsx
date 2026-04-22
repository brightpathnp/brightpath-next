import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

const navigation = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Why Choose Us', href: '/about#why-choose-us' },
    { label: 'Success Stories', href: '/about#success-stories' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'University Admissions', href: '/services/university-admissions' },
    { label: 'Visa Guidance', href: '/services/visa-guidance' },
    { label: 'Language Preparation', href: '/services/language-preparation' },
    { label: 'Career Counseling', href: '/services/career-counseling' },
    { label: 'Scholarship Assistance', href: '/services/scholarship-assistance' },
  ],
  destinations: [
    { label: 'Australia', href: '/destinations/australia' },
    { label: 'Canada', href: '/destinations/canada' },
    { label: 'United Kingdom', href: '/destinations/united-kingdom' },
    { label: 'United States', href: '/destinations/united-states' },
    { label: 'Japan', href: '/destinations/japan' },
  ],
};

// const socialLinks = [
//   { label: 'Facebook', href: 'https://facebook.com/brightpathnp', icon: Facebook },
//   { label: 'Instagram', href: 'https://instagram.com/brightpathnp', icon: Instagram },
//   { label: 'YouTube', href: 'https://youtube.com/@brightpathnp', icon: Youtube },
//   { label: 'Twitter', href: 'https://twitter.com/brightpathnp', icon: Twitter },
// ];

export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white tracking-tight">
                Bright<span className="text-blue-500">Path</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm mb-6">
              Your trusted partner for studying abroad. We guide students through every step —
              from choosing the right university to landing your visa.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-500" />
                <span>Bagbazar, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-blue-500" />
                <a href="tel:+97714567890" className="hover:text-white transition-colors">
                  +977 9845411411
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-blue-500" />
                <a href="mailto:info@brightpathnp.com" className="hover:text-white transition-colors">
                  info@brightpathnp.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Destinations
            </h3>
            <ul className="space-y-2">
              {navigation.destinations.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} BrightPath Educational Consultancy. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow BrightPath on ${label}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-teal-600 hover:text-white transition-colors"
              >
                <Icon size={15} />
              </a>
            ))} */}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}