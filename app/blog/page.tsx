import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Blog & News | BrightPath',
  description:
    'Expert insights, visa updates, scholarship news, and study abroad guides — live from BrightPath Nepal.',
  openGraph: {
    title: 'Blog & News | BrightPath',
    description: 'Expert insights and study abroad guides from BrightPath Nepal.',
  },
};

export default function BlogPage(): ReactElement {
  return <BlogClient />;
}