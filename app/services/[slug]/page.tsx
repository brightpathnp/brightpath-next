import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES } from '@/lib/constants';
import ServiceDetailClient from './ServiceDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.fullDescription ?? service.description,
    openGraph: {
      title: `${service.title} | BrightPath`,
      description: service.fullDescription ?? service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}