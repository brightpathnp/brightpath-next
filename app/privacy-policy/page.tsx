import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'Learn how BrightPath Nepal collects, uses, and protects your personal information when you use our educational consultancy services.',
    openGraph: {
        title: 'Privacy Policy | BrightPath',
        description:
            'Learn how BrightPath Nepal collects, uses, and protects your personal information.',
        url: 'https://brightpathnp.com/privacy-policy',
    },
};

interface PolicySection {
    heading: string;
    content: string[];
}

const policySections: PolicySection[] = [
    {
        heading: '1. Introduction',
        content: [
            'BrightPath Nepal Education ("BrightPath", "we", "us", or "our") is committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our educational consultancy services.',
            'By accessing our website or using our services, you agree to the collection and use of information in accordance with this Privacy Policy.',
        ],
    },
    {
        heading: '2. Information We Collect',
        content: [
            'We may collect personal information that you voluntarily provide to us when you fill out inquiry forms, request consultations, apply for services, or communicate with us. This may include your full name, email address, phone number, address, date of birth, educational background, intended study destination, academic records, passport details, and any other information relevant to your application or counseling process.',
            'We may also collect limited technical data automatically when you browse our website, including your IP address, browser type, device information, referring pages, and browsing activity.',
        ],
    },
    {
        heading: '3. How We Use Your Information',
        content: [
            'We use the information we collect to provide educational counseling, process university and visa applications, communicate with you about your inquiries, recommend suitable academic opportunities, improve our website and services, and comply with legal or regulatory obligations.',
            'We may also use your contact details to send important updates, appointment confirmations, service-related notices, and relevant promotional communication about our offerings.',
        ],
    },
    {
        heading: '4. Sharing of Information',
        content: [
            'We may share your information with universities, colleges, language institutions, embassies, visa offices, test preparation partners, and other relevant third parties strictly as needed to provide our services and support your application process.',
            'We may also share information with trusted service providers who help us operate our business, provided they protect your information appropriately. We do not sell your personal information to third parties.',
        ],
    },
    {
        heading: '5. Cookies and Website Analytics',
        content: [
            'Our website may use cookies and similar technologies to improve functionality, understand visitor behavior, and enhance user experience. Cookies help us analyze traffic, remember preferences, and optimize our website content.',
            'You can choose to disable cookies through your browser settings, though some parts of the website may not function properly as a result.',
        ],
    },
    {
        heading: '6. Data Retention',
        content: [
            'We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, including service delivery, recordkeeping, legal compliance, and dispute resolution.',
            'When information is no longer required, we take reasonable steps to securely delete, anonymize, or archive it in accordance with applicable legal requirements.',
        ],
    },
    {
        heading: '7. Data Security',
        content: [
            'We take reasonable administrative, technical, and organizational measures to protect your personal information from unauthorized access, misuse, alteration, disclosure, or destruction.',
            'However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
        ],
    },
    {
        heading: '8. Your Rights',
        content: [
            'Depending on applicable laws, you may have the right to request access to the personal information we hold about you, request corrections, request deletion, object to certain uses, or withdraw consent where processing is based on consent.',
            'To make such a request, please contact us using the contact details provided below. We may ask you to verify your identity before responding.',
        ],
    },
    {
        heading: '9. Third-Party Links',
        content: [
            'Our website may contain links to third-party websites, including partner institutions or external resources. We are not responsible for the privacy practices, content, or security of those third-party websites.',
            'We encourage you to review the privacy policies of any external websites you visit.',
        ],
    },
    {
        heading: '10. Updates to This Privacy Policy',
        content: [
            'We may update this Privacy Policy from time to time to reflect changes in our practices, services, legal requirements, or operational needs. Any updates will be posted on this page with a revised effective date.',
            'Your continued use of our website or services after changes are posted means you accept the updated Privacy Policy.',
        ],
    },
];

export default function PrivacyPolicyPage(): React.JSX.Element {
    return (
        <>
            <section className="bg-gradient-deep px-4 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                        Legal
                    </p>
                    <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
                        Privacy Policy
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-blue-100">
                        This policy explains how BrightPath Nepal collects, uses, and protects
                        your personal information when you interact with our website and services.
                    </p>
                </div>
            </section>

            <section className="bg-white px-4 py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
                        <p className="text-base leading-relaxed text-slate-600">
                            At Bright Path, we prioritize your privacy and are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect your data when you visit our website (www.brightpathnepal.com) or use our services. By accessing our website, you consent to the terms outlined below.
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
                            </section>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-slate-200 pt-10 sm:flex-row sm:items-center">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
                                Related Policies
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm font-medium">
                                <Link href="/terms-of-use" className="text-brand-blue hover:underline">
                                    Terms of Use
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
        </>
    );
}