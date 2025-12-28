import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Script from 'next/script';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolsforuse.vercel.app'),
  title: {
    default: "ToolForge - Free Online Finance & Developer Tools",
    template: "%s | ToolForge",
  },
  description: "Use powerful online finance calculators and developer utilities like Loan Calculator, Tax Estimator, JSON Formatter & more — free, fast, and privacy-first.",
  keywords: ["online tools", "calculator", "finance tools", "developer tools", "loan calculator", "tax estimator", "JSON formatter", "JWT decoder", "regex tester"],
  authors: [{ name: "ToolForge" }],
  creator: "ToolForge",
  publisher: "ToolForge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ToolForge",
    title: "ToolForge - Free Online Finance & Developer Tools",
    description: "Free online tools for finance calculations and developer utilities. Calculate loans, estimate taxes, and format data instantly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolForge - Free Online Finance & Developer Tools",
    description: "Free online tools for finance calculations and developer utilities. Privacy-first and zero signup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ToolForge",
  "url": "https://toolsforuse.vercel.app/",
  "description": "Free online finance and developer tools",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://toolsforuse.vercel.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ToolForge",
  "url": "https://toolsforuse.vercel.app/",
  "logo": "https://toolsforuse.vercel.app/logo.png"
};


import { ThemeProvider } from "@/lib/context/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VZBDLC214N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VZBDLC214N');
          `}
        </Script>

        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
