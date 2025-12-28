import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Disclaimer for ToolForge - Important information about our tools and their limitations.',
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-3xl font-bold text-surface-900 mb-8">Disclaimer</h1>

                <div className="prose prose-surface max-w-none">
                    <p className="text-surface-600 text-lg mb-8">
                        Last updated: December 2024
                    </p>

                    <h2>General Information</h2>
                    <p>
                        The information provided by ToolForge (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on this website is for
                        general informational purposes only. All information on the site is provided in good
                        faith, however, we make no representation or warranty of any kind, express or implied,
                        regarding the accuracy, adequacy, validity, reliability, availability, or completeness
                        of any information on the site.
                    </p>

                    <h2>Calculator Accuracy</h2>
                    <p>
                        Our calculators and tools are designed to provide reasonable estimates and help with
                        general planning and understanding. However:
                    </p>
                    <ul>
                        <li>
                            <strong>Financial calculators</strong> (Loan Calculator, Tax Estimator, Salary Calculator)
                            provide estimates only. Actual amounts may vary based on individual circumstances,
                            lender policies, tax laws, and other factors.
                        </li>
                        <li>
                            <strong>Developer tools</strong> (JSON Formatter, JWT Decoder, Regex Tester) are provided
                            as utilities. While we strive for accuracy, we cannot guarantee results will be
                            error-free in all cases.
                        </li>
                    </ul>

                    <h2>Not Professional Advice</h2>
                    <p>
                        The content on this website is not intended to be a substitute for professional advice.
                        Specifically:
                    </p>
                    <ul>
                        <li>
                            <strong>Financial tools</strong> do not constitute financial, investment, tax, legal,
                            or any other professional advice. Always consult qualified professionals before making
                            financial decisions.
                        </li>
                        <li>
                            <strong>Tax estimates</strong> are not a substitute for advice from a certified public
                            accountant (CPA), tax advisor, or other qualified tax professional.
                        </li>
                        <li>
                            <strong>Loan calculations</strong> should be verified with your lending institution
                            before making any commitments.
                        </li>
                    </ul>

                    <h2>External Links</h2>
                    <p>
                        This website may contain links to external websites that are not provided or maintained
                        by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any
                        information on these external websites.
                    </p>

                    <h2>Limitation of Liability</h2>
                    <p>
                        Under no circumstance shall we have any liability to you for any loss or damage of any
                        kind incurred as a result of the use of the site or reliance on any information provided
                        on the site. Your use of the site and your reliance on any information on the site is
                        solely at your own risk.
                    </p>

                    <h2>No Guarantees</h2>
                    <p>We do not guarantee:</p>
                    <ul>
                        <li>The accuracy of any calculations or results</li>
                        <li>That the tools will meet your specific requirements</li>
                        <li>That the website will be available uninterrupted</li>
                        <li>That any errors will be corrected</li>
                    </ul>

                    <h2>User Responsibility</h2>
                    <p>
                        You are responsible for verifying any information obtained from our tools before
                        relying on it. You should independently verify all calculations and results with
                        appropriate professionals or institutions.
                    </p>

                    <h2>Changes to This Disclaimer</h2>
                    <p>
                        We reserve the right to make changes to this disclaimer at any time. Any changes
                        will be posted on this page with an updated revision date.
                    </p>

                    <h2>Contact</h2>
                    <p>
                        If you have any questions about this disclaimer, please{' '}
                        <a href="/contact" className="text-primary-600 hover:text-primary-700">
                            contact us
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
