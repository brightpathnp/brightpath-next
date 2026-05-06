import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/constants';
import { fetchWordPressPosts } from '@/services/wordpressService';
import type { BlogPost } from '@/types';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { posts } = await fetchWordPressPosts(1, 100);

  const livePost = posts.find((post) => post.slug === slug);
  if (livePost) {
    return livePost;
  }

  const staticPost = BLOG_POSTS.find((post) => post.slug === slug);
  return staticPost ?? null;
};

export async function generateMetadata(
  { params }: BlogPostPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | BrightPath',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | BrightPath Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | BrightPath Blog`,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage(
  { params }: BlogPostPageProps,
): Promise<JSX.Element> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}