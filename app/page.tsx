import Link from 'next/link';
import { AdSection } from '@/components/ui/AdPlaceholder';

const financeTools = [
  {
    name: 'Loan Calculator',
    description: 'Calculate EMI, total interest, and payment schedule for any loan.',
    href: '/finance/loan-calculator',
    icon: '💰',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Tax Estimator',
    description: 'Estimate income tax with progressive slabs for US, UK, and India.',
    href: '/finance/tax-estimator',
    icon: '📊',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Salary Calculator',
    description: 'Calculate net salary with allowances and deductions breakdown.',
    href: '/finance/salary-calculator',
    icon: '💵',
    color: 'from-violet-500 to-purple-600',
  },
];

const devTools = [
  {
    name: 'JSON Formatter',
    description: 'Validate, format, and beautify JSON data with syntax highlighting.',
    href: '/dev/json-formatter',
    icon: '📋',
    color: 'from-orange-500 to-red-600',
  },
  {
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Token headers and payloads.',
    href: '/dev/jwt-decoder',
    icon: '🔐',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Regex Tester',
    description: 'Test regular expressions with real-time match highlighting.',
    href: '/dev/regex-tester',
    icon: '🔍',
    color: 'from-cyan-500 to-blue-600',
  },
];

const ToolCard = ({ tool }: { tool: typeof financeTools[0] }) => (
  <Link
    href={tool.href}
    className="group block p-6 bg-white rounded-2xl border border-surface-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
  >
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
      {tool.icon}
    </div>
    <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
      {tool.name}
    </h3>
    <p className="text-sm text-surface-600 leading-relaxed">
      {tool.description}
    </p>
    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
      Try it now
      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </Link>
);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 mb-6">
              Free Online Tools for{' '}
              <span className="gradient-text">Everyone</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-600 mb-8 leading-relaxed">
              Powerful finance calculators and developer utilities.
              Fast, accurate, and privacy-focused. No signup required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#finance-tools"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all"
              >
                Explore Finance Tools
              </Link>
              <Link
                href="#dev-tools"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-white border border-surface-200 text-surface-700 font-medium hover:bg-surface-50 hover:border-surface-300 transition-all"
              >
                Developer Tools
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600">6+</div>
              <div className="text-sm text-surface-500 mt-1">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-surface-500 mt-1">Privacy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600">0</div>
              <div className="text-sm text-surface-500 mt-1">Signup Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <AdSection position="top" className="py-6 bg-surface-50" />

      {/* Finance Tools Section */}
      <section id="finance-tools" className="py-16 md:py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Finance Tools
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Make informed financial decisions with our accurate calculators.
              Plan loans, estimate taxes, and understand your salary.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Developer Tools Section */}
      <section id="dev-tools" className="py-16 md:py-20 bg-surface-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Developer Tools
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Essential utilities for developers. Format JSON, decode JWTs,
              and test regex patterns - all in your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Why Choose ToolForge?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-surface-600">Instant calculations with no loading time. Everything runs in your browser.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-success-100 text-success-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">Privacy First</h3>
              <p className="text-sm text-surface-600">Your data never leaves your device. No tracking, no data collection.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-warning-100 text-warning-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">100% Free</h3>
              <p className="text-sm text-surface-600">All tools are completely free. No hidden fees, no premium tiers.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">Mobile Ready</h3>
              <p className="text-sm text-surface-600">Works perfectly on any device. Use our tools anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      <AdSection position="footer" className="py-6 bg-surface-50" />
    </div>
  );
}
