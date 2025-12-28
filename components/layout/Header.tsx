'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const financeTools = [
    { name: 'Loan Calculator', href: '/finance/loan-calculator', icon: '💰' },
    { name: 'Tax Estimator', href: '/finance/tax-estimator', icon: '📊' },
    { name: 'Salary Calculator', href: '/finance/salary-calculator', icon: '💵' },
];

const devTools = [
    { name: 'JSON Formatter', href: '/dev/json-formatter', icon: '📋' },
    { name: 'JWT Decoder', href: '/dev/jwt-decoder', icon: '🔐' },
    { name: 'Regex Tester', href: '/dev/regex-tester', icon: '🔍' },
];

import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

    return (
        <header className="sticky top-0 z-50 glass border-b border-surface-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105"
                    >
                        <span className="text-2xl">⚡</span>
                        <span className="gradient-text">ToolForge</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        {/* Finance Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('finance')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                className={`
                  flex items-center gap-1 px-4 py-2 rounded-lg
                  text-sm font-medium transition-colors
                  ${isActive('/finance')
                                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                                    }
                `}
                            >
                                Finance Tools
                                <svg
                                    className={`w-4 h-4 transition-transform ${activeDropdown === 'finance' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {activeDropdown === 'finance' && (
                                <div className="absolute top-full left-0 mt-1 w-56 py-2 bg-surface-50 dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 animate-fade-in">
                                    {financeTools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            className={`
                        flex items-center gap-3 px-4 py-2.5 text-sm
                        transition-colors
                        ${isActive(tool.href)
                                                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50 dark:hover:bg-surface-700'
                                                }
                      `}
                                        >
                                            <span>{tool.icon}</span>
                                            {tool.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Dev Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('dev')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button
                                className={`
                  flex items-center gap-1 px-4 py-2 rounded-lg
                  text-sm font-medium transition-colors
                  ${isActive('/dev')
                                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                                    }
                `}
                            >
                                Developer Tools
                                <svg
                                    className={`w-4 h-4 transition-transform ${activeDropdown === 'dev' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {activeDropdown === 'dev' && (
                                <div className="absolute top-full left-0 mt-1 w-56 py-2 bg-surface-50 dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 animate-fade-in">
                                    {devTools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            className={`
                        flex items-center gap-3 px-4 py-2.5 text-sm
                        transition-colors
                        ${isActive(tool.href)
                                                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50 dark:hover:bg-surface-700'
                                                }
                      `}
                                        >
                                            <span>{tool.icon}</span>
                                            {tool.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Blog Link */}
                        <Link
                            href="/blog"
                            className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive('/blog')
                                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                                }
                `}
                        >
                            Blog
                        </Link>

                        <div className="ml-4 pl-4 border-l border-surface-200">
                            <ThemeToggle />
                        </div>
                    </nav>

                    {/* Mobile menu and toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <button
                            className="p-2 rounded-lg text-surface-600 hover:bg-surface-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-surface-200 animate-fade-in">
                        <div className="mb-4">
                            <h3 className="px-2 mb-2 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                                Finance Tools
                            </h3>
                            {financeTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                    flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm
                    ${isActive(tool.href)
                                            ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                            : 'text-surface-600 hover:bg-surface-50 dark:hover:bg-surface-800'
                                        }
                  `}
                                >
                                    <span>{tool.icon}</span>
                                    {tool.name}
                                </Link>
                            ))}
                        </div>
                        <div>
                            <h3 className="px-2 mb-2 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                                Developer Tools
                            </h3>
                            {devTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`
                    flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm
                    ${isActive(tool.href)
                                            ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                            : 'text-surface-600 hover:bg-surface-50 dark:hover:bg-surface-800'
                                        }
                  `}
                                >
                                    <span>{tool.icon}</span>
                                    {tool.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-surface-200">
                            <Link
                                href="/blog"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                    flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm
                    ${isActive('/blog')
                                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                        : 'text-surface-600 hover:bg-surface-50 dark:hover:bg-surface-800'
                                    }
                  `}
                            >
                                <span>📝</span>
                                Blog
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
