import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ToolForge - Free Online Finance & Developer Tools",
    template: "%s | ToolForge",
  },
  description: "Free online tools for finance calculations and developer utilities. Calculate loans, estimate taxes, format JSON, decode JWTs, and more.",
  keywords: ["online tools", "calculator", "finance tools", "developer tools", "loan calculator", "tax estimator", "JSON formatter", "JWT decoder"],
  authors: [{ name: "ToolForge" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ToolForge",
    title: "ToolForge - Free Online Finance & Developer Tools",
    description: "Free online tools for finance calculations and developer utilities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolForge - Free Online Finance & Developer Tools",
    description: "Free online tools for finance calculations and developer utilities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
