import type { Metadata } from 'next';
import PrivacyPolicyClientPage from './PrivacyPolicyClientPage';

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

export default function PrivacyPolicyPage(): React.JSX.Element {
  return <PrivacyPolicyClientPage />;
}