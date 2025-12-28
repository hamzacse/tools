import type { Metadata } from 'next';
import { JsonFormatter } from '@/components/tools/JsonFormatter';
import { FAQ } from '@/components/ui/FAQ';
import { AdSection } from '@/components/ui/AdPlaceholder';

export const metadata: Metadata = {
    title: 'JSON Formatter & Validator - Format, Beautify & Minify JSON',
    description: 'Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly. Shows syntax errors with line numbers. No data sent to servers.',
    keywords: ['JSON formatter', 'JSON validator', 'JSON beautifier', 'JSON minifier', 'format JSON online'],
    openGraph: {
        title: 'JSON Formatter & Validator - Free Online Tool',
        description: 'Beautify, minify, and validate JSON data instantly. Free online tool.',
    },
};

const faqItems = [
    {
        question: "What is JSON and why format it?",
        answer: "JSON (JavaScript Object Notation) is a lightweight data format used for data exchange between servers and web applications. Formatting JSON makes it readable by adding proper indentation and line breaks, which helps developers understand and debug data structures more easily."
    },
    {
        question: "Is my JSON data secure with this tool?",
        answer: "Yes, completely. All processing happens directly in your browser using JavaScript. Your JSON data never leaves your computer or gets sent to any server. This makes it safe to use with sensitive data."
    },
    {
        question: "What is JSON minification?",
        answer: "JSON minification removes all unnecessary whitespace (spaces, tabs, newlines) from JSON data. This reduces file size, making it more efficient for storage and network transfer while keeping the data identical."
    },
    {
        question: "How do I fix a JSON syntax error?",
        answer: "Our tool shows you exactly where the error occurred with line and column numbers. Common issues include missing commas between items, unquoted keys, trailing commas, and mismatched brackets. Check the error message for specific guidance."
    },
    {
        question: "What do the stats (Keys, Depth, Size) mean?",
        answer: "Keys shows the total number of key-value pairs in your JSON. Depth indicates how many levels of nesting exist (objects within objects). Size shows the file size of your JSON data in bytes, KB, or MB."
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

export default function JsonFormatterPage() {
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
                                    JSON Formatter & Validator
                                </h1>
                                <p className="text-lg text-surface-600 max-w-2xl">
                                    Format, beautify, minify, and validate your JSON data instantly.
                                    Get clear error messages with line numbers for invalid JSON.
                                    All processing happens in your browser - your data stays private.
                                </p>
                            </div>

                            <JsonFormatter />

                            {/* FAQ Section - Right below the tool */}
                            <FAQ items={faqItems} />

                            <div className="mt-12 p-6 rounded-2xl bg-white border border-surface-200">
                                <h2 className="text-xl font-semibold text-surface-900 mb-4">Why Use This JSON Formatter?</h2>
                                <p className="text-surface-600 leading-relaxed mb-4">
                                    Our JSON formatter is designed for developers who need to quickly validate and
                                    beautify JSON data. Whether you&apos;re debugging API responses, editing configuration
                                    files, or just trying to understand a complex data structure, this tool makes it easy.
                                </p>
                                <p className="text-surface-600 leading-relaxed">
                                    The formatter shows you exactly where syntax errors occur, with line and column
                                    numbers to help you fix issues quickly.
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
