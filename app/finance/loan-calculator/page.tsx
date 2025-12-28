import type { Metadata } from 'next';
import { LoanCalculator } from '@/components/tools/LoanCalculator';
import { FAQ } from '@/components/ui/FAQ';
import { AdSection } from '@/components/ui/AdPlaceholder';

export const metadata: Metadata = {
    title: 'Free Loan Calculator - Calculate EMI, Interest & Payments',
    description: 'Calculate your loan EMI, total interest, and payment schedule instantly. Free online loan calculator with amortization breakdown. No signup required.',
    keywords: ['loan calculator', 'EMI calculator', 'loan interest calculator', 'mortgage calculator', 'loan payment calculator'],
    openGraph: {
        title: 'Free Loan Calculator - Calculate EMI & Interest',
        description: 'Calculate your loan EMI, total interest, and payment schedule instantly. Free online calculator.',
    },
};

const faqItems = [
    {
        question: "What is EMI and how is it calculated?",
        answer: "EMI (Equated Monthly Installment) is a fixed payment made by a borrower to a lender each month. It's calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the principal amount, r is the monthly interest rate, and n is the number of months."
    },
    {
        question: "Does this calculator provide accurate results?",
        answer: "Yes, our calculator uses the standard EMI formula used by banks and financial institutions. However, actual loan terms may vary based on your credit score, lender policies, and other factors. Always consult your financial institution for final figures."
    },
    {
        question: "What factors affect my loan EMI?",
        answer: "Three main factors affect your EMI: Principal amount (higher principal = higher EMI), interest rate (higher rate = higher EMI), and loan tenure (longer tenure = lower EMI but higher total interest paid)."
    },
    {
        question: "Can I use this for different types of loans?",
        answer: "Yes! This calculator works for home loans, personal loans, car loans, education loans, and any other type of amortizing loan that uses the standard EMI formula."
    },
    {
        question: "Why does a longer tenure result in higher total interest?",
        answer: "With a longer tenure, you make more monthly payments, and each payment includes interest on the remaining balance. While your monthly EMI is lower, you're paying interest for a longer period, resulting in higher total interest paid over the loan's lifetime."
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

export default function LoanCalculatorPage() {
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
                            {/* Page Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-surface-900 mb-3">
                                    Free Loan Calculator
                                </h1>
                                <p className="text-lg text-surface-600 max-w-2xl">
                                    Calculate your monthly loan payments, total interest, and view a complete
                                    amortization schedule. Our calculator uses the standard EMI formula for accurate results.
                                </p>
                            </div>

                            {/* Calculator Tool */}
                            <LoanCalculator />

                            {/* FAQ Section - Right below the tool */}
                            <FAQ items={faqItems} />

                            {/* Additional Content */}
                            <div className="mt-12 p-6 rounded-2xl bg-surface-50 border border-surface-200">
                                <h2 className="text-xl font-semibold text-surface-900 mb-4">How to Use This Calculator</h2>
                                <p className="text-surface-600 leading-relaxed mb-4">
                                    Our loan calculator helps you understand your borrowing costs before committing to a loan.
                                    Simply enter your loan amount, interest rate, and desired repayment period to see your
                                    monthly EMI, total interest payable, and the complete payment breakdown.
                                </p>
                                <p className="text-surface-600 leading-relaxed">
                                    This tool is perfect for comparing different loan options, planning your budget, or
                                    understanding how changing the loan term affects your payments.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar Ad */}
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
