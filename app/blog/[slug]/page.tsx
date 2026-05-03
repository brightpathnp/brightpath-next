import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS as STATIC_POSTS } from '@/lib/constants';
import { fetchWordPressPosts } from '@/services/wordpressService';
import type { BlogPost } from '@/types';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const WP_URL = 'https://www.brightpathnepal.com/wp-json/wp/v2';
    const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const wpPosts = await res.json() as unknown[];
      if (Array.isArray(wpPosts) && wpPosts.length > 0) {
        const { posts } = await fetchWordPressPosts(1, 1);
        const match = posts.find((p) => p.slug === slug);
        if (match) return match;
      }
    }
  } catch {
    // fall through to static
  }
  return STATIC_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return STATIC_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | BrightPath Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}