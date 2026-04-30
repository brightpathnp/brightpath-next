'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Loader2, Sparkles } from 'lucide-react';
import { BLOG_POSTS as STATIC_POSTS } from '@/lib/constants';
import { fetchWordPressPosts } from '@/services/wordpressService';
import type { BlogPost } from '@/types';

interface BlogSectionProps {
  onNavigate?: () => void;
  onPostClick?: (post: BlogPost) => void;
}

const BlogSection = ({ onNavigate, onPostClick }: BlogSectionProps): JSX.Element => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    const loadHomePosts = async (): Promise<void> => {
      try {
        const { posts: wpPosts } = await fetchWordPressPosts(1, 6);

        if (wpPosts && wpPosts.length > 0) {
          setPosts(wpPosts);
        } else {
          setPosts(STATIC_POSTS.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching home posts:', error);
        setPosts(STATIC_POSTS.slice(0, 6));
      } finally {
        setIsLoading(false);
      }
    };

    void loadHomePosts();
  }, []);

  return (
    <section id="blog" className="pt-24 pb-12 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-black tracking-widest text-brand-blue uppercase bg-blue-50 rounded-full border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              Latest News
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              Expert Insights <br />
              <span className="text-slate-400">& News.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onNavigate}
            className="px-8 py-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all flex items-center gap-3 group"
          >
            Explore All Updates
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              Loading Feed...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-16">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => onPostClick?.(post)}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_32px_64px_rgba(37,99,235,0.08)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full cursor-pointer"
              >
                <div className="h-60 overflow-hidden relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                  <div className="absolute top-6 left-6 bg-brand-blue/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black text-white shadow-lg uppercase tracking-[0.2em]">
                    {post.category}
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-5 text-[10px] font-black text-slate-300 mb-6 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-black text-slate-900 mb-4 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />

                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-slate-900 transition-colors">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;