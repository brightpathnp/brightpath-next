'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  ArrowRight,
} from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient(
  { post }: BlogPostClientProps,
): JSX.Element {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <section className="bg-gradient-to-r from-brand-dark via-brand-blue to-brand-purple py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-semibold mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>

          <div className="m-5 inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-blue-100 text-[10px] font-black uppercase tracking-[0.2em] mb-5 backdrop-blur-sm border border-white/10">
            {post.category}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-blue-100 text-xs font-bold uppercase tracking-widest">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4" aria-hidden="true" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      <article className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative w-full h-[240px] md:h-[440px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 md:p-10 lg:p-12">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8 pb-8 border-b border-slate-100">
                <span className="inline-flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <Tag className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" />
                  Tags
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div
              className="max-w-none text-slate-700 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
[&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-black [&_h1]:text-slate-900 [&_h1]:leading-tight [&_h1]:mt-14 [&_h1]:mb-6
[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:leading-tight [&_h2]:mt-14 [&_h2]:mb-5
[&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-black [&_h3]:text-slate-900 [&_h3]:leading-snug [&_h3]:mt-10 [&_h3]:mb-4
[&_h4]:text-lg [&_h4]:font-black [&_h4]:text-slate-900 [&_h4]:mt-8 [&_h4]:mb-3
[&_p]:text-base [&_p]:md:text-[17px] [&_p]:leading-8 [&_p]:text-slate-600 [&_p]:mb-6 [&_p]:text-justify
[&_a]:text-brand-blue [&_a]:font-semibold hover:[&_a]:text-brand-dark [&_a]:underline [&_a]:underline-offset-4
[&_strong]:text-slate-900 [&_strong]:font-bold
[&_ul]:my-6 [&_ul]:pl-6 [&_ul]:space-y-3
[&_ol]:my-6 [&_ol]:pl-6 [&_ol]:space-y-3
[&_li]:text-base [&_li]:md:text-[17px] [&_li]:leading-8 [&_li]:text-slate-600 [&_li]:text-justify [&_li]:relative [&_li]:flex [&_li]:items-start [&_li]:gap-2
[&_li_svg]:shrink-0 [&_li_svg]:w-4 [&_li_svg]:h-4 [&_li_svg]:mt-1 [&_li_svg]:text-slate-600
[&_svg]:inline [&_svg]:w-auto [&_svg]:h-[1em] [&_svg]:max-w-[1.25em]
[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-blue [&_blockquote]:bg-blue-50/50 [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:rounded-r-2xl
[&_blockquote_p]:text-slate-700 [&_blockquote_p]:text-lg [&_blockquote_p]:leading-8 [&_blockquote_p]:font-medium [&_blockquote_p]:mb-0 [&_blockquote_p]:text-justify
[&_img]:rounded-2xl [&_img]:my-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:block
[&_img.emoji]:w-4 [&_img.emoji]:h-4 [&_img.emoji]:inline [&_img.emoji]:my-0 [&_img.emoji]:rounded-none [&_img.emoji]:align-middle
[&_figure]:my-8 [&_figure]:max-w-full
[&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-slate-400
[&_hr]:my-10 [&_hr]:border-slate-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all group"
            >
              Explore More Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}