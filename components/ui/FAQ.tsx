'use client';

import React, { useState } from 'react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

export const FAQ: React.FC<FAQProps> = ({ items, title = "Frequently Asked Questions" }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-surface-900 mb-4">{title}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-surface-200 overflow-hidden bg-surface-50"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-50 transition-colors"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-medium text-surface-900 pr-4">{item.question}</span>
                            <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                        >
                            <div className="px-4 pb-4 text-surface-600 leading-relaxed">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Compact inline FAQ for embedding within tool cards
export const FAQInline: React.FC<FAQProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="rounded-lg bg-surface-50 overflow-hidden"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-surface-100 transition-colors"
                        aria-expanded={openIndex === index}
                    >
                        <span className="text-sm font-medium text-surface-700 pr-2">{item.question}</span>
                        <svg
                            className={`w-4 h-4 text-surface-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {openIndex === index && (
                        <div className="px-3 pb-3 text-sm text-surface-600">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
