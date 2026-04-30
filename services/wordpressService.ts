import type { BlogPost } from '@/types';

const WP_URL = 'https://www.brightpathnepal.com/wp-json/wp/v2';

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
}

interface WPEmbeddedMedia {
  source_url?: string;
}

interface WPEmbeddedAuthor {
  name?: string;
}

interface WPEmbeddedTerm {
  id: number;
  name: string;
}

interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: WPEmbeddedMedia[];
    'wp:term'?: WPEmbeddedTerm[][];
    author?: WPEmbeddedAuthor[];
  };
}

const cleanHtml = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
};

export const fetchWordPressCategories = async (): Promise<WPCategory[]> => {
  try {
    const response = await fetch(`${WP_URL}/categories?per_page=100&hide_empty=true`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    return (await response.json()) as WPCategory[];
  } catch (error) {
    console.error('Fetch Categories Error:', error);
    return [];
  }
};

export const fetchWordPressTags = async (): Promise<WPTag[]> => {
  try {
    const response = await fetch(`${WP_URL}/tags?per_page=20&orderby=count&order=desc`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    return (await response.json()) as WPTag[];
  } catch (error) {
    console.error('Fetch Tags Error:', error);
    return [];
  }
};

export const fetchWordPressPosts = async (
  page = 1,
  perPage = 10,
  categoryId?: number
): Promise<{ posts: BlogPost[]; total: number }> => {
  try {
    let url = `${WP_URL}/posts?page=${page}&per_page=${perPage}&_embed`;
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error('Failed to fetch WordPress posts');

    const total = parseInt(response.headers.get('X-WP-Total') ?? '0', 10);
    const wpPosts = (await response.json()) as WPPost[];

    const mappedPosts: BlogPost[] = wpPosts.map((wp) => {
      const featuredImage =
        wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800';

      const categoryObj = wp._embedded?.['wp:term']?.[0]?.[0];
      const category = categoryObj?.name ?? 'Uncategorized';
      const catId = categoryObj?.id;

      const tags =
        wp._embedded?.['wp:term']?.[1]?.map((t) => t.name) ?? [];

      const rawExcerpt = cleanHtml(wp.excerpt.rendered);
      const rawContent = cleanHtml(wp.content.rendered);

      const finalExcerpt =
        rawExcerpt.length > 20
          ? rawExcerpt
          : rawContent.substring(0, 160).replace(/\s+/g, ' ') + '...';

      return {
        id: wp.id.toString(),
        title: cleanHtml(wp.title.rendered),
        excerpt: finalExcerpt,
        content: wp.content.rendered,
        date: new Date(wp.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        author: wp._embedded?.author?.[0]?.name ?? 'BrightPath Team',
        category,
        categoryId: catId,
        tags,
        image: featuredImage,
        slug: wp.slug,
      };
    });

    return { posts: mappedPosts, total };
  } catch (error) {
    console.error('WordPress Fetch Error:', error);
    return { posts: [], total: 0 };
  }
};