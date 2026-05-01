import type { Metadata } from 'next';
import DestinationsClient from './DestinationsClient';

export const metadata: Metadata = {
  title: 'Study Destinations | BrightPath',
  description:
    'Explore 15+ countries where BrightPath can guide your education journey — from Australia and Canada to Japan, Germany, and beyond.',
  openGraph: {
    title: 'Study Destinations | BrightPath',
    description: 'Explore 15+ countries where BrightPath can guide your education journey.',
  },
};

export default function DestinationsPage(): JSX.Element {
  return <DestinationsClient />;
}