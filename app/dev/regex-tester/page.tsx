import type { Metadata } from 'next';
import { RegexTester } from '@/components/tools/RegexTester';
import { FAQ } from '@/components/ui/FAQ';
import { AdSection } from '@/components/ui/AdPlaceholder';

export const metadata: Metadata = {
    title: 'Regex Tester - Test Regular Expressions Online with Highlighting',
    description: 'Test and debug regular expressions with real-time match highlighting. Supports all regex flags (g, i, m, s, u). Includes common pattern library. Free online regex tester.',
    keywords: ['regex tester', 'regular expression tester', 'regex debugger', 'regex online', 'test regex patterns'],
    openGraph: {
        title: 'Regex Tester - Test Regular Expressions Online',
        description: 'Test regex patterns with real-time match highlighting. Free online tool.',
    },
};

const faqItems = [
    {
        question: "What is a regular expression (regex)?",
        answer: "A regular expression (regex) is a sequence of characters that defines a search pattern. It's used for pattern matching within strings, commonly for validation (emails, phones), search and replace, and text parsing."
    },
    {
        question: "What do the regex flags mean?",
        answer: "g (global) finds all matches instead of stopping at first; i (ignoreCase) makes matching case-insensitive; m (multiline) makes ^ and $ match line boundaries; s (dotAll) makes . match newlines; u (unicode) enables Unicode matching."
    },
    {
        question: "Why isn't my regex pattern working?",
        answer: "Common issues include: forgetting to escape special characters (like . or $), not enabling the global flag for multiple matches, case sensitivity issues (try the 'i' flag), or incorrect character class syntax. Check the error message for specific issues."
    },
    {
        question: "Do I need to include slashes around my pattern?",
        answer: "No, just enter the pattern itself without the surrounding slashes. For example, enter 'd+' instead of '/d+/'. The flags are selected using the toggle buttons instead."
    },
    {
        question: "What are the common regex special characters?",
        answer: "Common special characters: . (any character), d (digit), w (word character), s (whitespace), ^ (start), $ (end), * (0 or more), + (1 or more), ? (0 or 1), [] (character class), () (group), | (or)."
    }
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
        }
    }))
};

export default function RegexTesterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="min-h-screen bg-surface-50">
                <AdSection position="top" className="py-4" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                        <div>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-surface-900 mb-3">
                                    Regex Tester
                                </h1>
                                <p className="text-lg text-surface-600 max-w-2xl">
                                    Test regular expressions with real-time match highlighting.
                                    Toggle flags, use common patterns, and see detailed match information
                                    instantly. All testing happens in your browser.
                                </p>
                            </div>

                            <RegexTester />

                            {/* FAQ Section - Right below the tool */}
                            <FAQ items={faqItems} />

                            <div className="mt-12 p-6 rounded-2xl bg-white border border-surface-200">
                                <h2 className="text-xl font-semibold text-surface-900 mb-4">How to Use This Regex Tester</h2>
                                <p className="text-surface-600 leading-relaxed mb-4">
                                    Enter your regular expression pattern in the first field (without surrounding
                                    slashes), then enter test text in the textarea below. Matches will be highlighted
                                    in real-time.
                                </p>
                                <p className="text-surface-600 leading-relaxed">
                                    Use the flag buttons to modify matching behavior. The global flag (g) finds all
                                    matches, ignoreCase (i) makes matching case-insensitive, and multiline (m) makes
                                    ^ and $ match line boundaries.
                                </p>
                            </div>
                        </div>

                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <AdSection position="sidebar" />
                            </div>
                        </aside>
                    </div>
                </div>

                <AdSection position="footer" className="py-4" />
            </div>
        </>
    );
}
