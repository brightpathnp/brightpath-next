'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'University Admissions', href: '/services/university-admissions' },
      { label: 'Visa Guidance', href: '/services/visa-guidance' },
      { label: 'Language Preparation', href: '/services/language-preparation' },
      { label: 'Career Counseling', href: '/services/career-counseling' },
      { label: 'Scholarship Assistance', href: '/services/scholarship-assistance' },
    ],
  },
  {
    label: 'Destinations',
    href: '/destinations',
    children: [
      { label: 'All Destinations', href: '/destinations' },
      { label: 'Australia', href: '/destinations/au' },
      { label: 'Canada', href: '/destinations/ca' },
      { label: 'United Kingdom', href: '/destinations/uk' },
      { label: 'United States', href: '/destinations/us' },
      { label: 'Japan', href: '/destinations/jp' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function toggleDropdown(label: string): void {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header
      className={`fixed top-0 sm:top-8 inset-x-0 z-40 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-sm border-b border-gray-100' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="shrink-0">
            <span className="text-xl font-bold text-black tracking-tight">
              BrightPath
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 ml-auto mr-4" ref={dropdownRef}>
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-black cursor-pointer transition-colors ${
                        isActive(item.href) ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-xs font-black transition-colors ${
                              pathname === child.href
                                ? 'text-blue-500 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-xs font-black transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-500'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="bg-brand-blue text-white text-xs font-black px-4 py-2 rounded-lg transition-colors hover:opacity-90"
            >
              Free Consultation
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden fixed inset-0 top-16 bg-white z-30 overflow-y-auto"
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={openDropdown === item.label}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-500 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2.5 rounded-lg text-xs font-black transition-colors ${
                            pathname === child.href
                              ? 'text-blue-500 bg-blue-50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-3 rounded-lg text-xs font-black transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-500 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                className="block w-full text-center bg-brand-blue text-white text-xs font-black px-4 py-3 rounded-lg transition-colors hover:opacity-90"
              >
                Free Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}