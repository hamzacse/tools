import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for ToolForge - Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-3xl font-bold text-surface-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-surface max-w-none">
                    <p className="text-surface-600 text-lg mb-8">
                        Last updated: December 2024
                    </p>

                    <h2>Introduction</h2>
                    <p>
                        At ToolForge, we take your privacy seriously. This Privacy Policy explains how we collect,
                        use, and protect your information when you use our website and tools.
                    </p>

                    <h2>Information We Collect</h2>

                    <h3>Information You Provide</h3>
                    <p>
                        When you use our calculators and tools, you may enter data such as numbers, text,
                        or code. <strong>This data is processed entirely in your browser and is never sent to
                            our servers.</strong> We do not store, collect, or have access to the data you input
                        into our tools.
                    </p>

                    <h3>Automatically Collected Information</h3>
                    <p>We may automatically collect certain information when you visit our website:</p>
                    <ul>
                        <li>Browser type and version</li>
                        <li>Operating system</li>
                        <li>Pages visited and time spent</li>
                        <li>Referring website</li>
                        <li>IP address (anonymized)</li>
                    </ul>

                    <h2>How We Use Information</h2>
                    <p>We use collected information to:</p>
                    <ul>
                        <li>Improve our website and tools</li>
                        <li>Analyze usage patterns</li>
                        <li>Ensure website security</li>
                        <li>Display relevant advertisements</li>
                    </ul>

                    <h2>Cookies</h2>
                    <p>
                        We use cookies to improve your browsing experience and for analytics purposes.
                        These include:
                    </p>
                    <ul>
                        <li><strong>Essential cookies:</strong> Required for website functionality</li>
                        <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                        <li><strong>Advertising cookies:</strong> Used by our advertising partners to deliver relevant ads</li>
                    </ul>

                    <h2>Third-Party Services</h2>

                    <h3>Google Analytics</h3>
                    <p>
                        We use Google Analytics to understand how visitors interact with our website.
                        Google Analytics uses cookies to collect anonymous usage data. You can opt out
                        using the Google Analytics Opt-out Browser Add-on.
                    </p>

                    <h3>Google AdSense</h3>
                    <p>
                        We use Google AdSense to display advertisements. Google may use cookies to
                        personalize ads based on your browsing history. You can manage your ad
                        preferences in your Google Account settings.
                    </p>

                    <h2>Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect against unauthorized access
                        or alteration of any information we collect. Since our tools process data locally
                        in your browser, your input data is never transmitted over the network.
                    </p>

                    <h2>Children&apos;s Privacy</h2>
                    <p>
                        Our website is not intended for children under 13 years of age. We do not
                        knowingly collect personal information from children.
                    </p>

                    <h2>Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access information we hold about you</li>
                        <li>Request correction of inaccurate information</li>
                        <li>Request deletion of your information</li>
                        <li>Opt out of marketing communications</li>
                        <li>Disable cookies in your browser settings</li>
                    </ul>

                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any
                        changes by posting the new Privacy Policy on this page and updating the
                        &quot;Last updated&quot; date.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a href="/contact" className="text-primary-600 hover:text-primary-700">
                            our contact page
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
