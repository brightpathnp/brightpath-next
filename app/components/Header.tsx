'use client';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { NavItem } from '@/types';
import Image from 'next/image';
import ConsultationModal from './ConsultationModal';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Education Counseling', href: '/services/education-counseling' },
      { label: 'Scholarship Guidance', href: '/services/scholarship-guidance' },
      { label: 'Test Preparation', href: '/services/test-preparation' },
      { label: 'Visa Documentation', href: '/services/visa-documentation' },
      { label: 'Student Accommodation', href: '/services/student-accommodation' },
      { label: 'Health Insurance', href: '/services/health-insurance' },
    ],
  },
  {
    label: 'Destinations',
    href: '/destinations',
    children: [
      { label: 'All Destinations', href: '/destinations' },
      { label: 'Australia', href: '/destinations/au' },
      { label: 'Canada', href: '/destinations/ca' },
      {
        label: 'Europe',
        href: '/destinations/europe',
        children: [
          { label: 'Cyprus', href: '/destinations/cy' },
          { label: 'Georgia', href: '/destinations/ge' },
          { label: 'Malta', href: '/destinations/mt' },
        ],
      },
      { label: 'United Kingdom', href: '/destinations/uk' },
      { label: 'United States', href: '/destinations/us' },
      { label: 'Japan', href: '/destinations/jp' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
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
    setOpenSubDropdown(null);
  }

  function toggleSubDropdown(label: string): void {
    setOpenSubDropdown((prev) => (prev === label ? null : label));
  }

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <>
    <header
      ref={headerRef}
      className={`fixed top-0 sm:top-8 inset-x-0 z-40 bg-white transition-all duration-300 ${scrolled ? 'shadow-sm border-b border-gray-100' : ''
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="shrink-0">
            <span className="text-xl font-bold text-black tracking-tight">
              <Image width={125} height={125} src='/bp-logo.png' alt='bightpath-logo' />
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 ml-auto mr-4">
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-xs font-black cursor-pointer transition-colors ${isActive(item.href) ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                        {item.children.map((child) =>
                          child.children ? (
                            <div
                              key={child.label}
                              className="relative"
                              onMouseEnter={() => setOpenSubDropdown(child.label)}
                              onMouseLeave={() => setOpenSubDropdown(null)}
                            >
                              <button
                                className={`w-full flex items-center justify-between px-4 py-2 text-xs font-black transition-colors ${isActive(child.href)
                                  ? 'text-blue-500 bg-blue-50'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                  }`}
                              >
                                {child.label}
                                <ChevronRight size={12} />
                              </button>
                              {openSubDropdown === child.label && (
                                <div className="absolute top-0 left-full ml-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                                  {child.children.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      className={`block px-4 py-2 text-xs font-black transition-colors ${pathname === sub.href
                                        ? 'text-blue-500 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2 text-xs font-black transition-colors ${pathname === child.href
                                ? 'text-blue-500 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-xs font-black transition-colors ${isActive(item.href)
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

          {/* <div className="hidden lg:flex items-center"> */}
            <button
              onClick={() => setModalOpen(true)}
              className="ml-4 px-6 py-3 bg-brand-blue text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/10 hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Free Consultation
            </button>
          {/* </div> */}

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
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-black cursor-pointer transition-colors ${isActive(item.href)
                      ? 'text-blue-500 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {item.children.map((child) =>
                        child.children ? (
                          <div key={child.label}>
                            <button
                              onClick={() => toggleSubDropdown(child.label)}
                              aria-expanded={openSubDropdown === child.label}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-black cursor-pointer transition-colors ${isActive(child.href)
                                ? 'text-blue-500 bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                              {child.label}
                              <ChevronDown
                                size={12}
                                className={`transition-transform duration-200 ${openSubDropdown === child.label ? 'rotate-180' : ''
                                  }`}
                              />
                            </button>
                            {openSubDropdown === child.label && (
                              <div className="ml-4 mt-1 flex flex-col gap-0.5">
                                {child.children.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className={`block px-3 py-2 rounded-lg text-xs font-black transition-colors ${pathname === sub.href
                                      ? 'text-blue-500 bg-blue-50'
                                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                      }`}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-3 py-2.5 rounded-lg text-xs font-black transition-colors ${pathname === child.href
                              ? 'text-blue-500 bg-blue-50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-3 rounded-lg text-sm font-black transition-colors ${isActive(item.href)
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
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}