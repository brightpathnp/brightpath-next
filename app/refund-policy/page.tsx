import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Refund Policy | BrightPath Educational Consultancy",
    description:
        "Understand BrightPath's refund policy — what fees are refundable, the 72-hour request window, and how to initiate a refund.",
    openGraph: {
        title: "Refund Policy | BrightPath Educational Consultancy",
        description:
            "Understand BrightPath's refund policy — what fees are refundable, the 72-hour request window, and how to initiate a refund.",
        url: "https://brightpathnepal.com/refund-policy",
    },
};

interface PolicySection {
    id: string;
    title: string;
    content?: string;
    items?: string[];
    steps?: string[];
}

const sections: PolicySection[] = [
    {
        id: "overview",
        title: "1. Overview",
        content:
            "BrightPath Educational Consultancy is committed to providing transparent and fair policies for all clients. This Refund Policy outlines the conditions under which a refund may be requested and processed. By engaging our services, you agree to the terms described herein.",
    },
    {
        id: "refundable-fees",
        title: "2. What Is Refundable",
        content:
            "Only the service fee paid directly to BrightPath Educational Consultancy is eligible for a refund. This refers solely to the consultation and processing fee charged by BrightPath for our advisory and application support services. No other fees or charges are eligible for refund.",
    },
    {
        id: "non-refundable",
        title: "3. Non-Refundable Fees",
        content:
            "The following fees are strictly non-refundable, regardless of the outcome of your application or any other circumstances:",
        items: [
            "University or institution application fees paid on your behalf",
            "Government visa or immigration filing fees",
            "Third-party test registration fees (IELTS, TOEFL, SAT, GRE, etc.)",
            "Embassy or consulate fees",
            "Courier, documentation, or notarization charges",
            "Any fees paid directly to educational institutions",
        ],
    },
    {
        id: "refund-window",
        title: "4. Refund Request Window",
        content:
            "Refund requests must be submitted within 72 hours of your initial service fee payment. Requests received after this window will not be considered under any circumstances. The 72-hour period begins at the exact time of confirmed payment receipt by BrightPath.",
    },
    {
        id: "conditions",
        title: "5. Eligibility Conditions",
        content:
            "To be eligible for a refund, all of the following conditions must be met:",
        items: [
            "The request is submitted in writing via email within the 72-hour window",
            "No consultation session has taken place at the time of the request",
            "Application processing has not commenced",
            "The original payment receipt or transaction ID is provided",
            "The request clearly states the reason for the refund",
        ],
    },
    {
        id: "process",
        title: "6. How to Request a Refund",
        content:
            "To initiate a refund, please follow the steps below:",
        steps: [
            "Email us at info@brightpathnepal.com within 72 hours of payment",
            "Include your full name, contact number, and proof of payment",
            "Clearly state your reason for requesting a refund",
            "Our team will review your request within 3–5 business days",
            "Approved refunds will be processed to the original payment method within 7–10 business days",
        ],
    },
    {
        id: "discretion",
        title: "7. Discretionary Review",
        content:
            "BrightPath reserves the right to review all refund requests on a case-by-case basis. Submission of a request does not guarantee approval. Our team will evaluate each case in accordance with this policy and communicate the outcome in writing.",
    },
    {
        id: "amendments",
        title: "8. Policy Amendments",
        content:
            "BrightPath Educational Consultancy reserves the right to update or modify this Refund Policy at any time without prior notice. The most current version will always be published on our website. Continued use of our services constitutes your acceptance of any updated policy.",
    },
    {
        id: "contact",
        title: "9. Contact Us",
        content:
            "If you have any questions about this Refund Policy or wish to initiate a refund request, please contact us at info@brightpathnepal.com or visit our office during business hours. We are dedicated to resolving all concerns promptly and fairly.",
    },
];

export default function RefundPolicyPage() {
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
                        BrightPath Educational Consultancy is committed to providing transparent and fair policies for all clients. This Refund Policy outlines the conditions under which a refund may be requested and processed. By engaging our services, you agree to the terms described herein.
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
                        {sections.map((section) => (
                            <section key={section.title}>
                                <h2 className="mb-4 border-b border-slate-100 pb-3 text-xl font-bold text-slate-900">
                                    {section.title}
                                </h2>

                                <div className="space-y-4">

                                    <p
                                        key={section.title}
                                        className="text-base leading-relaxed text-slate-600"
                                    >
                                        {section.content}
                                    </p>

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
                                <Link href="/privacy-policy" className="text-brand-blue hover:underline">
                                    Privacy Policy
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