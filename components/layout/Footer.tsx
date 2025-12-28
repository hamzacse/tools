import React from 'react';
import Link from 'next/link';

const financeTools = [
    { name: 'Loan Calculator', href: '/finance/loan-calculator' },
    { name: 'Tax Estimator', href: '/finance/tax-estimator' },
    { name: 'Salary Calculator', href: '/finance/salary-calculator' },
];

const devTools = [
    { name: 'JSON Formatter', href: '/dev/json-formatter' },
    { name: 'JWT Decoder', href: '/dev/jwt-decoder' },
    { name: 'Regex Tester', href: '/dev/regex-tester' },
];

const legalLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Contact', href: '/contact' },
];

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface-50 border-t border-surface-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4">
                            <span className="text-2xl">⚡</span>
                            <span className="gradient-text">ToolForge</span>
                        </Link>
                        <p className="text-sm text-surface-600 leading-relaxed">
                            Free online tools for finance calculations and developer utilities.
                            Fast, accurate, and privacy-focused.
                        </p>
                    </div>

                    {/* Finance Tools */}
                    <div>
                        <h3 className="text-sm font-semibold text-surface-900 mb-4">
                            Finance Tools
                        </h3>
                        <ul className="space-y-3">
                            {financeTools.map((tool) => (
                                <li key={tool.href}>
                                    <Link
                                        href={tool.href}
                                        className="text-sm text-surface-600 hover:text-primary-600 transition-colors"
                                    >
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Developer Tools */}
                    <div>
                        <h3 className="text-sm font-semibold text-surface-900 mb-4">
                            Developer Tools
                        </h3>
                        <ul className="space-y-3">
                            {devTools.map((tool) => (
                                <li key={tool.href}>
                                    <Link
                                        href={tool.href}
                                        className="text-sm text-surface-600 hover:text-primary-600 transition-colors"
                                    >
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-surface-900 mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-surface-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-surface-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-surface-500">
                            © {currentYear} ToolForge. All rights reserved.
                        </p>
                        <p className="text-sm text-surface-400">
                            Made with ❤️ for developers and everyone
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
