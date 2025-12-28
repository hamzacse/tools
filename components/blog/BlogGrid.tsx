'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, formatDate } from '@/lib/blog/posts';

const categoryColors = {
    finance: 'bg-emerald-100 text-emerald-700',
    development: 'bg-blue-100 text-blue-700',
    tips: 'bg-purple-100 text-purple-700',
};

const categoryLabels = {
    finance: 'Finance',
    development: 'Development',
    tips: 'Tips & Guides',
};

type Category = 'finance' | 'development' | 'tips' | null;

export const BlogGrid = () => {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category') as Category;

    // Filter posts based on category
    const filteredPosts = categoryParam
        ? blogPosts.filter((post) => post.category === categoryParam)
        : blogPosts;

    const isActiveCategory = (cat: Category) => {
        if (cat === null) return categoryParam === null;
        return categoryParam === cat;
    };

    return (
        <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                <Link
                    href="/blog"
                    scroll={false}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActiveCategory(null)
                            ? 'bg-primary-500 text-white shadow-md shadow-primary-200'
                            : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600'
                        }`}
                >
                    All Posts
                </Link>
                <Link
                    href="/blog?category=finance"
                    scroll={false}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActiveCategory('finance')
                            ? 'bg-primary-500 text-white shadow-md shadow-primary-200'
                            : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600'
                        }`}
                >
                    Finance
                </Link>
                <Link
                    href="/blog?category=development"
                    scroll={false}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActiveCategory('development')
                            ? 'bg-primary-500 text-white shadow-md shadow-primary-200'
                            : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600'
                        }`}
                >
                    Development
                </Link>
                <Link
                    href="/blog?category=tips"
                    scroll={false}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActiveCategory('tips')
                            ? 'bg-primary-500 text-white shadow-md shadow-primary-200'
                            : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600'
                        }`}
                >
                    Tips & Guides
                </Link>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                    <article
                        key={post.slug}
                        className="group bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <Link href={`/blog/${post.slug}`}>
                            {/* Thumbnail */}
                            <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-colors">
                                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                                    {post.category === 'finance' ? '💰' : post.category === 'development' ? '💻' : '💡'}
                                </span>
                            </div>

                            <div className="p-6">
                                {/* Category & Date */}
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                                        {categoryLabels[post.category]}
                                    </span>
                                    <span className="text-xs text-surface-400">
                                        {formatDate(post.date)}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-lg font-bold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                                    {post.title}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-surface-600 mb-4 line-clamp-2">
                                    {post.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                                    <span className="text-xs text-surface-500">{post.readTime}</span>
                                    <span className="text-sm font-semibold text-primary-600 flex items-center gap-1">
                                        Read post
                                        <svg
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-surface-300">
                    <div className="text-5xl mb-4">🔍</div>
                    <p className="text-surface-900 font-semibold text-xl mb-2">No posts found</p>
                    <p className="text-surface-500 mb-6">We couldn&apos;t find any articles in this category.</p>
                    <Link
                        href="/blog"
                        className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors inline-block"
                    >
                        View all posts
                    </Link>
                </div>
            )}
        </>
    );
};
