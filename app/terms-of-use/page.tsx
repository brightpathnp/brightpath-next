import type { Metadata } from 'next';
import TermsOfUseClientPage from './TermsOfUseClientPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Read the Terms of Use for BrightPath Nepal. Understand your rights and responsibilities when using our educational consultancy website and services.',
  openGraph: {
    title: 'Terms of Use | BrightPath',
    description:
      'Read the Terms of Use for BrightPath Nepal educational consultancy services.',
    url: 'https://brightpathnp.com/terms-of-use',
  },
};

export default function TermsOfUsePage(): React.JSX.Element {
  return <TermsOfUseClientPage />;
}