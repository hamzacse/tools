import type { Metadata } from 'next';
import { TaxEstimator } from '@/components/tools/DynamicTools';
import { FAQ } from '@/components/ui/FAQ';
import { AdSection } from '@/components/ui/AdPlaceholder';

export const metadata: Metadata = {
    title: 'Free Tax Estimator - Calculate Income Tax Online',
    description: 'Estimate your income tax with our free online tax calculator. Supports US, UK, and India tax slabs. Get instant tax breakdown and net income calculation.',
    keywords: ['tax calculator', 'income tax estimator', 'tax estimator', 'tax slab calculator', 'free tax calculator'],
    openGraph: {
        title: 'Free Tax Estimator - Calculate Income Tax Online',
        description: 'Estimate your income tax with our free online calculator. Supports multiple countries.',
    },
};

export const revalidate = 86400; // 24 hours

const faqItems = [
    {
        question: "How accurate is this tax estimator?",
        answer: "This calculator provides a reasonable estimate based on standard progressive tax slabs. However, actual tax liability depends on many factors including specific deductions, credits, filing status, and local tax laws. Always consult a qualified tax professional for accurate tax advice."
    },
    {
        question: "What is a progressive tax system?",
        answer: "A progressive tax system means higher income earners pay a higher percentage of their income in taxes. Income is divided into brackets, with each bracket taxed at an increasing rate. Only the income within each bracket is taxed at that rate, not your entire income."
    },
    {
        question: "What is the effective tax rate?",
        answer: "The effective tax rate is the actual percentage of your total taxable income that you pay in taxes. It's typically lower than your marginal tax rate because only a portion of your income falls into the highest tax bracket."
    },
    {
        question: "What deductions can I claim?",
        answer: "Common deductions include standard deductions (automatically applied), retirement contributions, health insurance premiums, mortgage interest, charitable donations, and education expenses. The available deductions vary by country and your specific situation."
    },
    {
        question: "Why do different countries have different tax slabs?",
        answer: "Each country designs its tax system based on its economic policies, social programs, and revenue needs. Some countries have more tax brackets with gradual increases, while others have fewer brackets with larger jumps between rates."
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

export default function TaxEstimatorPage() {
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
                                    Free Income Tax Estimator
                                </h1>
                                <p className="text-lg text-surface-600 max-w-2xl">
                                    Estimate your income tax liability using progressive tax slabs.
                                    Supports multiple countries including US, UK, and India with configurable deductions.
                                </p>
                            </div>

                            <TaxEstimator />

                            {/* FAQ Section - Right below the tool */}
                            <FAQ items={faqItems} />

                            <div className="mt-12 p-6 rounded-2xl bg-surface-50 border border-surface-200">
                                <h2 className="text-xl font-semibold text-surface-900 mb-4">Understanding Your Tax Estimate</h2>
                                <p className="text-surface-600 leading-relaxed mb-4">
                                    This tax estimator helps you understand how much tax you might owe based on your
                                    annual income and applicable deductions. The calculator uses progressive tax slabs,
                                    where different portions of your income are taxed at different rates.
                                </p>
                                <p className="text-surface-600 leading-relaxed">
                                    The effective tax rate shown is the actual percentage of your total income paid as
                                    tax. This is typically lower than your marginal rate because only income above
                                    certain thresholds is taxed at higher rates.
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
