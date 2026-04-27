import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DESTINATIONS } from '@/lib/constants';
import DestinationDetailClient from './DestinationDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return DESTINATIONS.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.id === slug);
  if (!destination) return {};
  return {
    title: `Study in ${destination.country}`,
    description: `${destination.highlight} Explore programs, requirements, costs, and visa details for studying in ${destination.country} with BrightPath.`,
    openGraph: {
      title: `Study in ${destination.country} | BrightPath`,
      description: destination.highlight,
      images: [{ url: destination.image, width: 800, height: 600, alt: destination.country }],
    },
  };
}

export default async function DestinationDetailPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.id === slug);
  if (!destination) notFound();
  return <DestinationDetailClient destination={destination} />;
}