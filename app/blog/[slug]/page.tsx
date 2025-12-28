import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, formatDate, getRecentPosts } from '@/lib/blog/posts';
import { AdSection } from '@/components/ui/AdPlaceholder';
import { Card } from '@/components/ui/Card';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

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

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

    // Improved markdown-like rendering
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let i = 0;

        const parseInline = (text: string) => {
            // Very basic link and bold support
            let parts: React.ReactNode[] = [text];

            // Bold
            parts = parts.flatMap((part) => {
                if (typeof part !== 'string') return part;
                const matches = [...part.matchAll(/\*\*(.*?)\*\*/g)];
                if (matches.length === 0) return part;

                const result: React.ReactNode[] = [];
                let lastIndex = 0;
                matches.forEach((match) => {
                    if (match.index! > lastIndex) {
                        result.push(part.slice(lastIndex, match.index));
                    }
                    result.push(<strong key={match.index} className="font-bold text-surface-900">{match[1]}</strong>);
                    lastIndex = match.index! + match[0].length;
                });
                if (lastIndex < part.length) {
                    result.push(part.slice(lastIndex));
                }
                return result;
            });

            // Inline code
            parts = parts.flatMap((part) => {
                if (typeof part !== 'string') return part;
                const matches = [...part.matchAll(/`(.*?)`/g)];
                if (matches.length === 0) return part;

                const result: React.ReactNode[] = [];
                let lastIndex = 0;
                matches.forEach((match) => {
                    if (match.index! > lastIndex) {
                        result.push(part.slice(lastIndex, match.index));
                    }
                    result.push(<code key={match.index} className="px-1.5 py-0.5 rounded bg-surface-100 text-primary-600 font-mono text-sm">{match[1]}</code>);
                    lastIndex = match.index! + match[0].length;
                });
                if (lastIndex < part.length) {
                    result.push(part.slice(lastIndex));
                }
                return result;
            });

            return parts;
        };

        while (i < lines.length) {
            const line = lines[i];

            // H1
            if (line.startsWith('# ')) {
                elements.push(<h1 key={i} className="text-2xl font-bold text-surface-900 mt-8 mb-6">{line.slice(2)}</h1>);
                i++;
                continue;
            }

            // H2
            if (line.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-xl font-semibold text-surface-900 mt-8 mb-4">{line.slice(3)}</h2>);
                i++;
                continue;
            }

            // H3
            if (line.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-lg font-semibold text-surface-900 mt-6 mb-3">{line.slice(4)}</h3>);
                i++;
                continue;
            }

            // Code blocks
            if (line.startsWith('```')) {
                const blockContent: string[] = [];
                i++;
                while (i < lines.length && !lines[i].startsWith('```')) {
                    blockContent.push(lines[i]);
                    i++;
                }
                elements.push(
                    <pre key={i} className="bg-surface-900 text-surface-100 p-4 rounded-xl my-6 overflow-x-auto font-mono text-sm">
                        <code>{blockContent.join('\n')}</code>
                    </pre>
                );
                i++;
                continue;
            }

            // Tables
            if (line.startsWith('|')) {
                const tableRows: string[] = [];
                while (i < lines.length && lines[i].startsWith('|')) {
                    tableRows.push(lines[i]);
                    i++;
                }

                const processRows = tableRows.filter(row => !row.includes('---'));

                elements.push(
                    <div key={i} className="overflow-x-auto my-6">
                        <table className="w-full text-left border-collapse border border-surface-200 rounded-lg overflow-hidden">
                            <tbody>
                                {processRows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className={rowIndex === 0 ? 'bg-surface-50' : 'border-t border-surface-200'}>
                                        {row.split('|').filter(cell => cell.trim() !== '').map((cell, cellIndex) => (
                                            <td key={cellIndex} className={`p-3 text-sm ${rowIndex === 0 ? 'font-semibold text-surface-900' : 'text-surface-600'}`}>
                                                {parseInline(cell.trim())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                continue;
            }

            // Lists
            if (line.trim().startsWith('- ') || line.trim().match(/^\d+\. /)) {
                const isOrdered = line.trim().match(/^\d+\. /);
                const listItems: string[] = [];

                while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().match(/^\d+\. /))) {
                    listItems.push(lines[i].trim().replace(/^- |\d+\. /, ''));
                    i++;
                }

                const ListTag = isOrdered ? 'ol' : 'ul';
                elements.push(
                    <ListTag key={i} className={`my-4 space-y-2 ${isOrdered ? 'list-decimal ml-6' : 'list-disc ml-6'}`}>
                        {listItems.map((item, idx) => (
                            <li key={idx} className="text-surface-600 leading-relaxed pl-2">
                                {parseInline(item)}
                            </li>
                        ))}
                    </ListTag>
                );
                continue;
            }

            // Paragraphs
            if (line.trim()) {
                elements.push(<p key={i} className="text-surface-600 leading-relaxed mb-4">{parseInline(line)}</p>);
            } else {
                elements.push(<div key={i} className="h-4" />);
            }
            i++;
        }

        return elements;
    };

    return (
        <div className="min-h-screen bg-surface-50">
            <AdSection position="top" className="py-4" />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm">
                        <li>
                            <Link href="/" className="text-surface-500 hover:text-primary-600">
                                Home
                            </Link>
                        </li>
                        <li className="text-surface-400">/</li>
                        <li>
                            <Link href="/blog" className="text-surface-500 hover:text-primary-600">
                                Blog
                            </Link>
                        </li>
                        <li className="text-surface-400">/</li>
                        <li className="text-surface-700 truncate max-w-[200px]">{post.title}</li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
                            {categoryLabels[post.category]}
                        </span>
                        <span className="text-sm text-surface-500">{post.readTime}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
                        {post.title}
                    </h1>

                    <p className="text-lg text-surface-600 mb-6">
                        {post.description}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-surface-200">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-medium">TF</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-surface-900">{post.author}</p>
                            <p className="text-sm text-surface-500">{formatDate(post.date)}</p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="bg-surface-50 rounded-2xl border border-surface-200 p-6 md:p-10 mb-12 shadow-sm">
                    <div className="prose prose-surface max-w-none">
                        {renderContent(post.content)}
                    </div>
                </div>

                {/* Recommended Tools Section */}
                {post.relatedTools && post.relatedTools.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-surface-900 mb-6 flex items-center gap-2">
                            <span className="text-primary-600 text-3xl">🛠️</span>
                            Recommended Tools
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {post.relatedTools.map((tool) => (
                                <Link key={tool.href} href={tool.href} className="group">
                                    <div className="flex items-center gap-4 p-4 bg-surface-50 border border-surface-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                                        <div className="w-12 h-12 flex items-center justify-center bg-surface-50 rounded-lg text-2xl group-hover:bg-primary-50 transition-colors">
                                            {tool.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">
                                                {tool.name}
                                            </h3>
                                            <p className="text-sm text-surface-500">
                                                {tool.description}
                                            </p>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-center text-white mb-12 shadow-md">
                    <h2 className="text-2xl font-bold mb-3">Master Your Calculations</h2>
                    <p className="text-primary-100 mb-6 max-w-md mx-auto">
                        Put what you&apos;ve learned into practice with our accurate and privacy-first tools.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/finance/loan-calculator"
                            className="px-6 py-2.5 rounded-lg bg-surface-50 text-primary-600 font-medium hover:bg-primary-50 transition-colors"
                        >
                            Loan Calculator
                        </Link>
                        <Link
                            href="/dev/json-formatter"
                            className="px-6 py-2.5 rounded-lg bg-primary-400 text-white font-medium hover:bg-primary-300 transition-colors"
                        >
                            JSON Formatter
                        </Link>
                    </div>
                </div>

                {/* Related Posts */}
                {recentPosts.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-surface-900 mb-6 flex items-center gap-2">
                            <span className="text-primary-600 text-3xl">📚</span>
                            More Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentPosts.slice(0, 2).map((relatedPost) => (
                                <Link
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group block p-6 bg-surface-50 rounded-xl border border-surface-200 hover:border-primary-200 hover:shadow-md transition-all"
                                >
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[relatedPost.category]} mb-3`}>
                                        {categoryLabels[relatedPost.category]}
                                    </span>
                                    <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors mb-2">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm text-surface-600 line-clamp-2">
                                        {relatedPost.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>

            <AdSection position="footer" className="py-4" />
        </div>
    );
}
