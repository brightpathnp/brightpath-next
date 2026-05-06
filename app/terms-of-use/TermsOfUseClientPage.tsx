'use client';

import Link from 'next/link';
import { useState } from 'react';
import ContactPolicyModal from '@/app/components/ContactPolicyModal';

interface TermsSection {
  heading: string;
  content: string[];
}

const termsSections: TermsSection[] = [
  {
    heading: '1. Acceptance of Terms',
    content: [
      'By accessing or using the BrightPath website (www.brightpathnepal.com) and any services offered through it, you agree to be bound by these Terms of Use, our Privacy Policy, and all applicable laws and regulations.',
      'If you do not agree with any of these terms, you are prohibited from using or accessing this site. We reserve the right to update or modify these terms at any time without prior notice.',
    ],
  },
  {
    heading: '2. Use of Website',
    content: [
      'You may use this website for lawful purposes only. You agree not to use the website in any way that is unlawful, harmful, fraudulent, or that infringes upon the rights of others. You must not attempt to gain unauthorized access to any part of the website, its servers, or related systems.',
      'We reserve the right to terminate or restrict your access to the website at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, third parties, or for any other reason.',
    ],
  },
  {
    heading: '3. Intellectual Property',
    content: [
      'All content on this website — including text, graphics, logos, images, audio clips, downloadable files, and software — is the property of BrightPath or its content suppliers and is protected by applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, transmit, reuse, or republish any content from this website for public or commercial purposes without prior written permission from BrightPath.',
    ],
  },
  {
    heading: '4. Services and Information',
    content: [
      'BrightPath Nepal provides educational consultancy services including guidance on university admissions, visa applications, language test preparation, and scholarship information. While we strive to provide accurate and up-to-date information, we do not warrant the completeness or accuracy of any information on this website.',
      'All information provided is for general guidance only and does not constitute legal or professional advice. You should independently verify information with the relevant institutions or authorities before making any decisions.',
    ],
  },
  {
    heading: '5. User Submissions',
    content: [
      'By submitting any content, inquiry, or personal information through our website — including through forms, emails, or any other channel — you grant BrightPath Nepal a non-exclusive, royalty-free license to use, process, and store such information for the purpose of providing our services.',
      'You are responsible for ensuring that any information you provide is accurate, truthful, and does not violate the rights of any third party. BrightPath Nepal reserves the right to refuse service if submitted information is found to be false, misleading, or incomplete.',
    ],
  },
  {
    heading: '6. Third-Party Links',
    content: [
      'Our website may contain links to external websites operated by third parties, including universities, embassies, test centers, and partner institutions. These links are provided for your convenience and do not imply endorsement or affiliation.',
      'BrightPath Nepal has no control over the content, availability, or privacy practices of third-party websites and accepts no responsibility for them. We encourage you to read the terms and privacy policies of any third-party sites you visit.',
    ],
  },
  {
    heading: '7. Disclaimer of Warranties',
    content: [
      'This website and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      'BrightPath Nepal does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. You assume full responsibility for your use of the website.',
    ],
  },
  {
    heading: '8. Limitation of Liability',
    content: [
      'To the fullest extent permitted by applicable law, BrightPath Nepal and its directors, employees, agents, and partners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website or its services.',
      'This includes, without limitation, damages for loss of data, revenue, profits, goodwill, or other intangible losses, even if we have been advised of the possibility of such damages.',
    ],
  },
  {
    heading: '9. Privacy',
    content: [
      'Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Use by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and protection of your personal information.',
    ],
  },
  {
    heading: '10. Governing Law',
    content: [
      'These Terms of Use shall be governed by and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions. Any disputes arising from or related to your use of this website shall be subject to the exclusive jurisdiction of the courts of Nepal.',
    ],
  },
  {
    heading: '11. Changes to These Terms',
    content: [
      'BrightPath Nepal reserves the right to revise these Terms of Use at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any modifications indicates your acceptance of the revised terms.',
      'We encourage you to review this page periodically to stay informed of any updates.',
    ],
  },
  {
    heading: '12. Contact Us',
    content: [],
  },
];

export default function TermsOfUseClientPage(): JSX.Element {
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  return (
    <>
      <section className="bg-gradient-deep px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Legal
          </p>
          <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
            Terms of Use
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-blue-100">
            Please read these terms carefully before using the BrightPath Nepal
            website or any of our educational consultancy services.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <p className="text-base leading-relaxed text-slate-600">
              These Terms of Use govern your access to and use of the BrightPath website (www.brightpathnepal.com) and the services we provide. By using our website or engaging with our consultancy services, you confirm that you have read, understood, and agree to be bound by these terms.
            </p>
          </div>

          <div className="space-y-12">
            {termsSections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 border-b border-slate-100 pb-3 text-xl font-bold text-slate-900">
                  {section.heading}
                </h2>

                <div className="space-y-4">
                  {section.heading === '12. Contact Us' ? (
                    <p className="text-base leading-relaxed text-slate-600">
                      If you have any questions, concerns, or requests regarding these Terms of
                      Use, please{' '}
                      <button
                        type="button"
                        onClick={() => setIsContactModalOpen(true)}
                        className="font-medium text-brand-blue underline underline-offset-4 transition-colors hover:text-brand-dark"
                      >
                        contact us
                      </button>{' '}
                       or visit our office in Kathmandu, Nepal.
                    </p>
                  ) : (
                    section.content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-relaxed text-slate-600"
                      >
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-slate-200 pt-10 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
                Related Policies
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <Link href="/privacy-policy" className="text-brand-blue hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/refund-policy" className="text-brand-blue hover:underline">
                  Refund Policy
                </Link>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <ContactPolicyModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contact Us"
      />
    </>
  );
}