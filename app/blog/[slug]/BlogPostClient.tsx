'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft, Calendar, User, Clock, Search, Hash,
  ChevronDown, ChevronUp, MessageCircle, ThumbsUp,
  Send, UserCircle2, Tag as TagIcon,
} from 'lucide-react';
import { BLOG_POSTS as STATIC_POSTS } from '@/lib/constants';
import { fetchWordPressPosts, fetchWordPressCategories } from '@/services/wordpressService';
import type { WPCategory } from '@/services/wordpressService';
import type { BlogPost } from '@/types';
import ConsultationModal from '@/app/components/ConsultationModal';

interface BlogPostClientProps {
  post: BlogPost;
}

const STATIC_TAGS = [
  'StudyAbroad', 'VisaGuide', 'Japan', 'IELTS',
  'Australia', 'Education', 'Scholarships', 'PTE', 'Success',
];

const MOCK_COMMENTS = [
  { name: 'Sagar KC',     date: '3 hours ago', text: 'Thank you for this update. Very helpful for Nepali students.', avatar: 'https://i.pravatar.cc/150?u=12' },
  { name: 'Pooja Sharma', date: '6 hours ago', text: 'Does this apply to those who already have a COE?',            avatar: 'https://i.pravatar.cc/150?u=44' },
];

export default function BlogPostClient({ post }: BlogPostClientProps): JSX.Element {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [liveCategories, setLiveCategories] = useState<WPCategory[]>([]);
  const [isRecentExpanded, setIsRecentExpanded] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(142);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [activeAuth, setActiveAuth] = useState<'guest' | 'fb' | 'google'>('fb');
  const [shareUrl, setShareUrl] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const loadSidebar = async (): Promise<void> => {
      const [{ posts }, cats] = await Promise.all([
        fetchWordPressPosts(1, 15),
        fetchWordPressCategories(),
      ]);
      setRecentPosts(posts.length > 0 ? posts : STATIC_POSTS.slice(0, 15));
      setLiveCategories(cats);
    };
    void loadSidebar();
    window.scrollTo(0, 0);
  }, [post]);

  const handleLike = (): void => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="page-transition min-h-screen bg-slate-50 font-sans pb-20">

      {/* ── Article Hero Header ── */}
      <section className="bg-brand-dark relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover opacity-20 blur-[2px] scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 text-[10px] font-black uppercase tracking-widest transition-all group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Blog
          </Link>

          <div className="inline-block px-4 py-1.5 bg-brand-blue text-white rounded-full text-[9px] font-black uppercase tracking-widest mb-6 shadow-xl shadow-blue-500/20">
            {post.category}
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8 max-w-4xl tracking-tight"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          <div className="flex flex-wrap items-center gap-6 text-white/40 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue" aria-hidden="true" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-blue" aria-hidden="true" /> By {post.author}
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-brand-blue" aria-hidden="true" /> 24 Comments
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* ── Article Body ── */}
            <div className="lg:col-span-3">

              {/* Article Content Card */}
              <div className="bg-white p-6 md:p-14 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div
                  className="wp-content-rendering prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium mb-12"
                  dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
                />

                {/* Interaction Row */}
                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isLiked ? 'bg-brand-blue text-white shadow-lg' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} aria-hidden="true" />
                      {isLiked ? 'Recommended' : 'Recommend'}
                    </button>
                    <div className="text-[11px] font-bold text-slate-400">
                      <span className="text-slate-900">{likeCount}</span> people recommend this.
                    </div>
                  </div>

                  {/* Share Buttons — simpleicons CDN (lucide-react has no social icons) */}
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Share:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                        className="p-3 bg-slate-50 rounded-xl transition-all shadow-sm hover:bg-blue-600"
                      >
                        <Image src="https://cdn.simpleicons.org/facebook/64748b" alt="Facebook" width={16} height={16} />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on X / Twitter"
                        className="p-3 bg-slate-50 rounded-xl transition-all shadow-sm hover:bg-sky-500"
                      >
                        <Image src="https://cdn.simpleicons.org/x/64748b" alt="X / Twitter" width={16} height={16} />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                        className="p-3 bg-slate-50 rounded-xl transition-all shadow-sm hover:bg-blue-700"
                      >
                        <Image src="https://cdn.simpleicons.org/linkedin/64748b" alt="LinkedIn" width={16} height={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8 bg-white p-6 md:p-14 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Post a Comment</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Login via</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveAuth('fb')}
                        aria-label="Login via Facebook"
                        className={`p-2 rounded-lg border transition-all ${activeAuth === 'fb' ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100'}`}
                      >
                        <Image src="https://cdn.simpleicons.org/facebook/64748b" alt="Facebook" width={16} height={16} />
                      </button>
                      <button
                        onClick={() => setActiveAuth('google')}
                        aria-label="Login via Google"
                        className={`p-2 rounded-lg border transition-all ${activeAuth === 'google' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'}`}
                      >
                        <Image src="https://cdn.simpleicons.org/google/64748b" alt="Google" width={16} height={16} />
                      </button>
                      <button
                        onClick={() => setActiveAuth('guest')}
                        aria-label="Continue as guest"
                        className={`p-2 rounded-lg border transition-all ${activeAuth === 'guest' ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-white border-slate-100 text-slate-400'}`}
                      >
                        <UserCircle2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comment Input */}
                <div className="flex gap-5 mb-12">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl shrink-0 flex items-center justify-center border border-slate-200 overflow-hidden">
                    {activeAuth === 'fb'
                      ? <Image src="https://cdn.simpleicons.org/facebook/2563eb" alt="Facebook" width={28} height={28} />
                      : <UserCircle2 className="w-7 h-7 text-slate-400" aria-hidden="true" />
                    }
                  </div>
                  <div className="flex-1 space-y-4">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment or join the discussion..."
                      aria-label="Comment text"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-medium outline-none focus:ring-4 focus:ring-brand-blue/5 min-h-[140px] resize-none transition-all"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                        <p className="text-xs font-bold text-slate-600">
                          {activeAuth === 'fb' ? 'Social User' : activeAuth === 'google' ? 'Verified Account' : 'Anonymous Guest'}
                        </p>
                      </div>
                      <button className="px-10 py-4 bg-brand-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-brand-dark transition-all flex items-center gap-2 group">
                        Submit Comment
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Existing Comments */}
                <div className="space-y-10">
                  {MOCK_COMMENTS.map((cmt, idx) => (
                    <div key={idx} className="flex gap-5">
                      <Image
                        src={cmt.avatar}
                        alt={cmt.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-sm font-black text-slate-900 tracking-tight">{cmt.name}</h4>
                          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{cmt.date}</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{cmt.text}</p>
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 hover:text-brand-blue transition-colors uppercase tracking-widest">
                            <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" /> Like
                          </button>
                          <button className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 hover:text-brand-blue transition-colors uppercase tracking-widest">
                            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" /> Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WP Content Styles */}
              <style dangerouslySetInnerHTML={{ __html: `
                .wp-content-rendering p { margin-bottom: 2rem; line-height: 1.8; }
                .wp-content-rendering h2 { font-size: 2.25rem; font-weight: 900; color: #0f172a; margin-top: 4rem; margin-bottom: 2rem; letter-spacing: -0.02em; line-height: 1.2; }
                .wp-content-rendering h3 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-top: 3rem; margin-bottom: 1.5rem; letter-spacing: -0.01em; }
                .wp-content-rendering img { border-radius: 2.5rem; margin: 4rem 0; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); width: auto; max-width: 100%; height: auto; object-fit: contain; }
                .wp-content-rendering .wp-block-image img { width: auto; max-width: 100%; }
                .wp-content-rendering li img { display: inline-block; vertical-align: middle; width: 20px !important; height: 20px !important; margin: 0 10px 0 0 !important; box-shadow: none !important; border-radius: 0 !important; }
                .wp-content-rendering blockquote { border-left: 6px solid #2563eb; padding-left: 2rem; font-style: italic; color: #334155; margin: 3rem 0; font-size: 1.5rem; font-weight: 300; line-height: 1.6; background: #f8fafc; padding-top: 2rem; padding-bottom: 2rem; border-radius: 0 2rem 2rem 0; }
                .wp-content-rendering ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 2.5rem; }
                .wp-content-rendering li { margin-bottom: 1rem; color: #475569; }
              `}} />
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8 pb-10">

                {/* Search */}
                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" /> Search Blog
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Keywords..."
                      aria-label="Search blog"
                      className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none text-xs font-medium focus:ring-4 focus:ring-brand-blue/5 transition-all"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" aria-hidden="true" />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" /> Categories
                  </h3>
                  <div className="flex flex-col gap-3">
                    {liveCategories.map((cat: WPCategory) => (
                      <button key={cat.id} className="flex justify-between items-center group text-left">
                        <span className="text-[12px] font-bold text-slate-500 group-hover:text-brand-blue transition-colors line-clamp-1">
                          {cat.name}
                        </span>
                        <span className="text-[9px] font-black px-2 py-0.5 bg-slate-50 rounded-lg text-slate-300 border border-slate-100">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" /> Latest Updates
                  </h3>
                  <div className="space-y-6">
                    {(isRecentExpanded ? recentPosts : recentPosts.slice(0, 6)).map(
                      (article: BlogPost, idx: number) => (
                        <Link
                          key={article.id}
                          href={`/blog/${article.slug}`}
                          className="group block border-b border-slate-50 pb-5 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-[10px] font-black text-slate-200 mt-1 shrink-0">
                              {idx + 1}
                            </span>
                            <div className="space-y-1">
                              <h4
                                className="text-[12px] font-bold text-slate-700 leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors"
                                dangerouslySetInnerHTML={{ __html: article.title }}
                              />
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                {article.date}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ),
                    )}
                  </div>
                  {recentPosts.length > 6 && (
                    <button
                      onClick={() => setIsRecentExpanded(!isRecentExpanded)}
                      className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 rounded-xl hover:text-brand-blue transition-all border border-slate-100"
                    >
                      {isRecentExpanded
                        ? <><ChevronUp className="w-3.5 h-3.5" aria-hidden="true" /> Less</>
                        : <><ChevronDown className="w-3.5 h-3.5" aria-hidden="true" /> View All ({recentPosts.length})</>
                      }
                    </button>
                  )}
                </div>

                {/* Tag Cloud */}
                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                    <TagIcon className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" /> Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {STATIC_TAGS.map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-50 text-slate-400 hover:bg-brand-blue hover:text-white transition-all border border-slate-100"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Widget */}
                <div className="bg-gradient-to-br from-brand-dark to-brand-blue p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity duration-700"
                    aria-hidden="true"
                  />
                  <h4 className="text-xl font-black mb-3 tracking-tight">Need a Callback?</h4>
                  <p className="text-[11px] text-blue-100 mb-6 leading-relaxed font-medium">
                    Leave your details and our expert counselors will reach out to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-4 bg-white text-brand-dark font-black text-[10px] rounded-xl uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    Book Call Back
                  </button>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request Call Back"
      />
    </div>
  );
}