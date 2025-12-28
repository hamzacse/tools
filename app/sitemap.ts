import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://toolsforuse.vercel.app';

    // Core routes
    const routes = [
        '',
        '/blog',
        '/contact',
        '/privacy',
        '/disclaimer',
        '/finance/loan-calculator',
        '/finance/tax-estimator',
        '/finance/salary-calculator',
        '/dev/json-formatter',
        '/dev/jwt-decoder',
        '/dev/regex-tester',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog posts
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}
