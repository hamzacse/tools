import type { Metadata } from 'next';
import { JwtDecoder } from '@/components/tools/JwtDecoder';
import { FAQ } from '@/components/ui/FAQ';
import { AdSection } from '@/components/ui/AdPlaceholder';

export const metadata: Metadata = {
    title: 'JWT Decoder - Decode & Inspect JSON Web Tokens Online',
    description: 'Decode JWT tokens instantly. View header and payload data, check expiration, and understand claims. Free online JWT decoder with no server-side processing.',
    keywords: ['JWT decoder', 'JSON Web Token decoder', 'decode JWT', 'JWT debugger', 'JWT inspector'],
    openGraph: {
        title: 'JWT Decoder - Decode JSON Web Tokens Online',
        description: 'Decode and inspect JWT tokens instantly. Free online tool.',
    },
};

const faqItems = [
    {
        question: "What is a JWT token?",
        answer: "A JWT (JSON Web Token) is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three parts: a header (algorithm info), a payload (claims/data), and a signature (for verification)."
    },
    {
        question: "Does this decoder verify the JWT signature?",
        answer: "No, this tool only decodes the header and payload for inspection purposes. It does not verify the signature, which would require the secret key or public key. Never trust decoded token data without proper server-side verification."
    },
    {
        question: "Is it safe to paste my JWT token here?",
        answer: "Yes, all decoding happens locally in your browser. Your token is never sent to any server. However, remember that JWT payloads are only Base64 encoded (not encrypted), so anyone with the token can read the payload data."
    },
    {
        question: "What do the standard JWT claims mean?",
        answer: "Common claims include: 'iss' (issuer), 'sub' (subject/user ID), 'aud' (audience), 'exp' (expiration time), 'iat' (issued at), 'nbf' (not valid before), and 'jti' (unique token ID). Hover over claims to see their descriptions."
    },
    {
        question: "Why does my token show as expired?",
        answer: "The 'exp' claim contains a Unix timestamp indicating when the token expires. If the current time is past this timestamp, the token is considered expired. Expired tokens should not be accepted by servers for authentication."
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

export default function JwtDecoderPage() {
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
                                    JWT Decoder
                                </h1>
                                <p className="text-lg text-surface-600 max-w-2xl">
                                    Decode and inspect JSON Web Tokens instantly. View the header, payload,
                                    and check token expiration. All decoding happens in your browser -
                                    your tokens stay private.
                                </p>
                            </div>

                            <JwtDecoder />

                            {/* FAQ Section - Right below the tool */}
                            <FAQ items={faqItems} />

                            <div className="mt-12 p-6 rounded-2xl bg-white border border-surface-200">
                                <h2 className="text-xl font-semibold text-surface-900 mb-4">Understanding JWT Tokens</h2>
                                <p className="text-surface-600 leading-relaxed mb-4">
                                    JSON Web Tokens (JWTs) are a popular method for securely transmitting information
                                    between parties. They&apos;re commonly used for authentication and authorization in
                                    web applications.
                                </p>
                                <p className="text-surface-600 leading-relaxed">
                                    A JWT consists of three parts separated by dots: the header (specifying the
                                    algorithm), the payload (containing claims), and the signature (for verification).
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
