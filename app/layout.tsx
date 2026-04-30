import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import './globals.css';
import TopBar from './components/TopBar';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BrightPath | Educational Consultancy',
    template: '%s | BrightPath',
  },
  description:
    'BrightPath is a trusted educational consultancy helping students achieve their dreams of studying abroad. Expert guidance for university admissions, visas, and language preparation.',
  keywords: [
    'educational consultancy',
    'study abroad',
    'university admissions',
    'Nepal',
    'visa guidance',
    'IELTS preparation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brightpathnp.com',
    siteName: 'BrightPath',
    title: 'BrightPath | Educational Consultancy',
    description:
      'BrightPath is a trusted educational consultancy helping students achieve their dreams of studying abroad.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BrightPath Educational Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrightPath | Educational Consultancy',
    description:
      'Trusted educational consultancy helping students study abroad.',
    images: ['/images/og-image.jpg'],
  },
  metadataBase: new URL('https://brightpathnp.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className={openSans.variable}>
      <body
      >
        <TopBar />
        <Header />
        <main className="pt-16 sm:pt-24">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}