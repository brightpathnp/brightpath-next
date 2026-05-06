import type { Metadata } from 'next';
import RefundPolicyClientPage from './RefundPolicyClientPage';

export const metadata: Metadata = {
  title: 'Refund Policy | BrightPath Educational Consultancy',
  description:
    "Understand BrightPath's refund policy — what fees are refundable, the 72-hour request window, and how to initiate a refund.",
  openGraph: {
    title: 'Refund Policy | BrightPath Educational Consultancy',
    description:
      "Understand BrightPath's refund policy — what fees are refundable, the 72-hour request window, and how to initiate a refund.",
    url: 'https://brightpathnepal.com/refund-policy',
  },
};

export default function RefundPolicyPage(): React.JSX.Element {
  return <RefundPolicyClientPage />;
}