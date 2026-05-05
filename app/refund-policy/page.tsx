import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'Learn about BrightPath Nepal\'s refund policy — what fees are refundable, the 72-hour request window, and how to initiate a refund.',
  openGraph: {
    title: 'Refund Policy | BrightPath',
    description:
      'Learn about BrightPath Nepal\'s refund policy — what fees are refundable and the conditions that apply.',
    url: 'https://brightpathnp.com/refund-policy',
  },
};

interface PolicySection {
  heading: string;
  content: string[];
  items?: string[];
  steps?: string[];
}

const policySections: PolicySection[] = [
  {
    heading: '1. Overview',
    content: [
      'BrightPath Nepal Education ("BrightPath", "we", "us", or "our") is committed to providing transparent and fair policies for all clients. This Refund Policy outlines the conditions under which a refund may be requested and processed.',
      'By engaging our services, you agree to the terms described in this Refund Policy. Please read it carefully before making any payment.',
    ],
  },
  {
    heading: '2. What Is Refundable',
    content: [
      'Only 50% of the service fee paid directly to BrightPath is eligible for a refund. This refers solely to the consultation and processing fee charged by BrightPath for our advisory and application support services.',
      'No other fees or charges are eligible for a refund under this policy unless explicitly stated otherwise in a separate written agreement.',
    ],
  },
  {
    heading: '3. University & Institution Fees',
    content: [
      'Any fees paid to universities, colleges, or educational institutions on your behalf are subject to the respective institution\'s own refund policies. BrightPath has no authority over these fees and cannot guarantee or facilitate their refund.',
      'It is solely at the discretion of the university or institution whether such fees are refunded, partially refunded, or forfeited. We strongly recommend reviewing the refund and withdrawal policies of your chosen institution before making any payment.',
    ],
  },
  {
    heading: '4. Non-Refundable Fees',
    content: [
      'The following fees are not covered under BrightPath\'s refund policy and will not be refunded by us under any circumstances:',
    ],
    items: [
      'Government visa or immigration filing fees',
      'Third-party test registration fees (IELTS, TOEFL, SAT, GRE, etc.)',
      'Embassy or consulate fees',
      'Courier, documentation, or notarization charges',
    ],
  },
  {
    heading: '5. Refund Request Window',
    content: [
      'Refund requests for BrightPath\'s service fee must be submitted strictly within 72 hours of your initial payment. The 72-hour period begins at the exact time of confirmed payment receipt by BrightPath.',
      'No exceptions will be made for requests received after this window, regardless of the reason provided. We encourage all clients to review this policy carefully before making payment.',
    ],
  },
  {
    heading: '6. Eligibility Conditions',
    content: [
      'To be eligible for a service fee refund, all of the following conditions must be satisfied at the time of the request:',
    ],
    items: [
      'The request is submitted in writing via email within the 72-hour window',
      'No consultation session has taken place at the time of the request',
      'Application processing has not commenced',
      'The original payment receipt or transaction ID is included',
      'The request clearly states the reason for the refund',
    ],
  },
  {
    heading: '7. How to Request a Refund',
    content: [
      'To initiate a refund, please follow the steps below. Incomplete requests may result in delays or rejection.',
    ],
    steps: [
      'Email us at info@brightpathnepal.com within 72 hours of payment',
      'Include your full name, contact number, and proof of payment',
      'Clearly state your reason for requesting a refund',
      'Our team will review your request within 3–5 business days',
      'Approved refunds will be processed to the original payment method within 7–10 business days',
    ],
  },
  {
    heading: '8. Discretionary Review',
    content: [
      'BrightPath reserves the right to review all refund requests on a case-by-case basis. Submission of a request does not guarantee approval.',
      'Our team will evaluate each case in accordance with this policy and communicate the outcome in writing.',
    ],
  },
  {
    heading: '9. Policy Amendments',
    content: [
      'BrightPath Educational Consultancy reserves the right to update or modify this Refund Policy at any time without prior notice. Any updates will be posted on this page with a revised effective date.',
      'Your continued use of our website or services after changes are posted means you accept the updated Refund Policy.',
    ],
  },
  {
    heading: '10. Contact Us',
    content: [
      'If you have any questions about this Refund Policy or wish to initiate a refund request, please contact us at info@brightpathnepal.com or visit our office during business hours.',
      'We are dedicated to resolving all concerns promptly and fairly.',
    ],
  },
];

export default function RefundPolicyPage(): React.JSX.Element {
  return (
    <>
      <section className="bg-gradient-deep px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Legal
          </p>
          <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
            Refund Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-blue-100">
            This policy explains what fees are refundable, the conditions that apply,
            and how to request a refund within the eligible window.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <p className="text-base leading-relaxed text-slate-600">
              At BrightPath, we believe in full transparency regarding fees and payments.
              Only our <strong className="font-semibold text-slate-800">service fee</strong> is
              eligible for a refund, and requests must be submitted within{' '}
              <strong className="font-semibold text-slate-800">72 hours</strong> of payment.
              Fees paid to universities or institutions are subject to{' '}
              <strong className="font-semibold text-slate-800">their own refund policies</strong>{' '}
              and are at their sole discretion. Please review this policy carefully before
              engaging our services.
            </p>
          </div>

          <div className="space-y-12">
            {policySections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 border-b border-slate-100 pb-3 text-xl font-bold text-slate-900">
                  {section.heading}
                </h2>

                <div className="space-y-4">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.items && (
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base text-slate-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.steps && (
                  <ol className="mt-4 space-y-3">
                    {section.steps.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-start gap-4 text-base text-slate-600"
                      >
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-slate-200 pt-10 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
                Related Policies
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <Link href="/terms" className="text-brand-blue hover:underline">
                  Terms of Use
                </Link>
                <Link href="/privacy-policy" className="text-brand-blue hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/gdpr" className="text-brand-blue hover:underline">
                  GDPR Compliance
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
    </>
  );
}