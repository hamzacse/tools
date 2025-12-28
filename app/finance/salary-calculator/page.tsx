import type { Metadata } from 'next';
import { SalaryCalculator } from '@/components/tools/SalaryCalculator';
import { FAQ } from '@/components/ui/FAQ';
import { AdSection } from '@/components/ui/AdPlaceholder';

export const metadata: Metadata = {
    title: 'Free Salary Calculator - Calculate Net Salary & Take Home Pay',
    description: 'Calculate your net salary from gross pay with our free salary calculator. Add allowances, deductions, and see your monthly and yearly take-home pay instantly.',
    keywords: ['salary calculator', 'net salary calculator', 'take home pay calculator', 'gross to net salary', 'paycheck calculator'],
    openGraph: {
        title: 'Free Salary Calculator - Net Salary & Take Home Pay',
        description: 'Calculate your net salary with allowances and deductions. Free online calculator.',
    },
};

const faqItems = [
    {
        question: "What is the difference between gross and net salary?",
        answer: "Gross salary is your total earnings before any deductions. Net salary (take-home pay) is what you receive after all deductions like taxes, insurance, retirement contributions, and other withholdings are subtracted from your gross salary."
    },
    {
        question: "What are common salary deductions?",
        answer: "Common deductions include income tax, social security contributions, health insurance premiums, retirement fund contributions (401k, pension), life insurance, professional tax, and union dues. These can be fixed amounts or percentages of your salary."
    },
    {
        question: "What are salary allowances?",
        answer: "Allowances are additional payments on top of your base salary, such as housing allowance, transport allowance, meal allowance, medical allowance, or special skills allowance. They can be fixed amounts or calculated as a percentage of your base salary."
    },
    {
        question: "How do percentage-based deductions work?",
        answer: "Percentage-based deductions are calculated as a percentage of your salary before the deduction is applied. For example, a 12% provident fund contribution on a $5,000 salary would be $600."
    },
    {
        question: "Can I add custom allowances and deductions?",
        answer: "Yes! You can add as many custom allowances and deductions as needed. Simply click the '+ Add' button to create new entries. Each entry can be set as either a fixed amount or a percentage of your salary."
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

export default function SalaryCalculatorPage() {
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
                                    Free Salary Calculator
                                </h1>
                                <p className="text-lg text-surface-600 max-w-2xl">
                                    Calculate your take-home pay instantly. Add allowances, subtract deductions,
                                    and see both monthly and yearly net salary with a detailed breakdown.
                                </p>
                            </div>

                            <SalaryCalculator />

                            {/* FAQ Section - Right below the tool */}
                            <FAQ items={faqItems} />

                            <div className="mt-12 p-6 rounded-2xl bg-surface-50 border border-surface-200">
                                <h2 className="text-xl font-semibold text-surface-900 mb-4">Understanding Your Salary Breakdown</h2>
                                <p className="text-surface-600 leading-relaxed mb-4">
                                    This salary calculator helps you understand the difference between your gross
                                    earnings and what you actually take home. By adding your allowances and deductions,
                                    you can see exactly how your final paycheck is calculated.
                                </p>
                                <p className="text-surface-600 leading-relaxed">
                                    Whether you&apos;re negotiating a new job offer, planning your budget, or just curious
                                    about your pay structure, this tool provides a clear picture of your compensation.
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
