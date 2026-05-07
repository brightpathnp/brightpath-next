'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, User, Search, ArrowRight,
  ChevronLeft, ChevronRight, Hash, Clock,
  ChevronDown, ChevronUp, Loader2, Tag as TagIcon, X
} from 'lucide-react';
import { BLOG_POSTS as STATIC_POSTS } from '@/lib/constants';
import {
  fetchWordPressPosts,
  fetchWordPressCategories,
  fetchWordPressTags,
} from '@/services/wordpressService';
import type { WPCategory, WPTag } from '@/services/wordpressService';
import type { BlogPost } from '@/types';

const POSTS_PER_PAGE = 6;

export default function BlogClient(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [liveCategories, setLiveCategories] = useState<WPCategory[]>([]);
  const [liveTags, setLiveTags] = useState<WPTag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeTagId, setActiveTagId] = useState<number | null>(null);
  const [blogSearch, setBlogSearch] = useState<string>('');
  const [isRecentExpanded, setIsRecentExpanded] = useState<boolean>(false);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  useEffect(() => {
    const loadMeta = async (): Promise<void> => {
      const [cats, tags] = await Promise.all([
        fetchWordPressCategories(),
        fetchWordPressTags(),
      ]);
      setLiveCategories(cats);
      setLiveTags(tags);
    };
    void loadMeta();
  }, []);

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      setIsLoading(true);
      const { posts: wpPosts, total } = await fetchWordPressPosts(
        currentPage,
        POSTS_PER_PAGE,
        activeCategoryId ?? undefined,
        activeTagId ?? undefined
      );

      if (currentPage === 1 && !activeCategoryId && !activeTagId) {
        const { posts: latest } = await fetchWordPressPosts(1, 15);
        setRecentPosts(latest.length > 0 ? latest : STATIC_POSTS.slice(0, 15));
      }

      if (wpPosts.length === 0 && currentPage === 1 && !activeCategoryId) {
        setPosts(STATIC_POSTS);
        setTotalPosts(STATIC_POSTS.length);
      } else {
        setPosts(wpPosts);
        setTotalPosts(total);
      }
      setIsLoading(false);
    };
    void loadPosts();
  }, [currentPage, activeCategoryId, activeTagId]);

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(blogSearch.toLowerCase()),
  );

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handlePageChange = (p: number): void => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (id: number | null): void => {
    setActiveCategoryId(id);
    setActiveTagId(null);
    setCurrentPage(1);
  };

  const handleTagClick = (id: number): void => {
    setActiveTagId((prev) => (prev === id ? null : id));
    setActiveCategoryId(null);
    setCurrentPage(1);
  };

  const activeTagName = liveTags.find((t) => t.id === activeTagId)?.name;

  return (
    <div className="page-transition min-h-screen bg-slate-50 font-sans">

      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-r from-brand-dark via-brand-blue to-brand-purple py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 border border-blue-400/30 rounded-full bg-blue-900/20 backdrop-blur-sm">
            BrightPath Newsroom
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
            Expert Insights &amp; Global Updates
          </h1>
          <p className="text-blue-100 text-sm md:text-base font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Live updates synced directly from our headquarters.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* ── Posts Feed ── */}
            <div className="lg:col-span-3">

              {/* Category Filter Bar */}
              <div className="bg-white rounded-2xl p-3 mb-8 shadow-sm border border-slate-200 flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all whitespace-nowrap uppercase tracking-wider ${activeCategoryId === null && activeTagId === null ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                  All
                </button>
                {liveCategories.map((cat: WPCategory) => (
                  <button
                    key={cat.id}
                    onClick={() => { handleCategoryClick(cat.id) }}
                    className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all whitespace-nowrap uppercase tracking-wider ${activeCategoryId === cat.id ? 'bg-brand-blue text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              {activeTagId !== null && (
                <div className="mb-6 flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Filtering by tag:
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                    #{activeTagName}
                    <button
                      onClick={() => { setActiveTagId(null); setCurrentPage(1); }}
                      aria-label="Clear tag filter"
                      className="ml-0.5 hover:opacity-70 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </div>
              )}

              {/* Posts or Loader */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-4">
                  <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                    Fetching Live Content...
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredPosts.map((post: BlogPost) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col group h-full"
                      >
                        <div className="h-52 overflow-hidden relative">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          />
                          <div className="absolute top-5 left-5 bg-brand-blue/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-lg">
                            {post.category}
                          </div>
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                          <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black mb-4 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" aria-hidden="true" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" aria-hidden="true" /> {post.author}
                            </span>
                          </div>
                          <h2
                            className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-brand-blue transition-colors"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />
                          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3 font-light">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-brand-blue font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                            Read Article <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Empty State */}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200">
                      <p className="text-slate-400 text-lg font-medium">
                        No articles found in this section.
                      </p>
                      <button
                        onClick={() => { setBlogSearch(''); setActiveCategoryId(null); setActiveTagId(null); }}
                        className="mt-4 text-brand-blue font-bold underline"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 bg-white border border-slate-200 rounded-full disabled:opacity-30 hover:border-brand-blue transition-colors"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Page {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 bg-white border border-slate-200 rounded-full disabled:opacity-30 hover:border-brand-blue transition-colors"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8 pb-10">

                {/* Quick Search */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" /> Quick Search
                  </h3>
                  <input
                    type="text"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    placeholder="Keywords..."
                    aria-label="Search blog posts"
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-xs font-medium focus:ring-2 focus:ring-brand-blue/5"
                  />
                </div>

                {/* Popular Tags */}
                <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <TagIcon className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" /> Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {liveTags.map((tag: WPTag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleTagClick(tag.id)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border transition-all ${activeTagId === tag.id
                            ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                            : 'bg-slate-50 text-slate-400 border-slate-100 hover:text-brand-blue hover:bg-blue-50'
                          }`}
                      >
                        #{tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Latest Stories */}
                <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" /> Latest Stories
                  </h3>
                  <div className="space-y-6">
                    {(isRecentExpanded ? recentPosts : recentPosts.slice(0, 8)).map(
                      (article: BlogPost, idx: number) => (
                        <Link
                          key={article.id}
                          href={`/blog/${article.slug}`}
                          className="group block border-b border-slate-50 pb-5 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-[9px] font-black text-slate-200 mt-1 shrink-0">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <h4
                              className="text-[12px] font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors"
                              dangerouslySetInnerHTML={{ __html: article.title }}
                            />
                          </div>
                        </Link>
                      ),
                    )}
                  </div>
                  {recentPosts.length > 8 && (
                    <button
                      onClick={() => setIsRecentExpanded(!isRecentExpanded)}
                      className="w-full mt-6 py-2.5 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 rounded-xl hover:text-brand-blue transition-all"
                    >
                      {isRecentExpanded ? (
                        <><ChevronUp className="w-3 h-3" aria-hidden="true" /> Less</>
                      ) : (
                        <><ChevronDown className="w-3 h-3" aria-hidden="true" /> More (+{recentPosts.length - 8})</>
                      )}
                    </button>
                  )}
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}