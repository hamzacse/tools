import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { AdSection } from '@/components/ui/AdPlaceholder';
import { Skeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
    title: 'Blog - Finance Tips & Developer Guides | ToolForge',
    description: 'Read our latest articles on personal finance, tax tips, salary negotiation, and developer guides. Expert insights to help you calculate better.',
    keywords: ['finance blog', 'developer blog', 'tax tips', 'coding tutorials', 'personal finance'],
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-surface-50">
            <AdSection position="top" className="py-4" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-surface-900 mb-6 tracking-tight">
                        Insights & <span className="gradient-text">Guides</span>
                    </h1>
                    <p className="text-xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
                        Expert advice on personal finance, tool deep-dives, and technical guides
                        to help you master your workflow.
                    </p>
                </div>

                {/* Blog Content with Suspense for Search Params */}
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-surface-200 p-6">
                                <Skeleton className="h-48 w-full rounded-xl mb-6" />
                                <Skeleton className="h-6 w-3/4 mb-4" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-6" />
                                <Skeleton className="h-8 w-24 rounded-lg" />
                            </div>
                        ))}
                    </div>
                }>
                    <BlogGrid />
                </Suspense>
            </div>

            <AdSection position="footer" className="py-8" />
        </div>
    );
}
