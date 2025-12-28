'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Loading placeholders
const DefaultLoading = () => (
    <div className="max-w-4xl mx-auto h-[500px] bg-surface-50 animate-pulse rounded-2xl border border-surface-200" />
);

const LargeLoading = () => (
    <div className="max-w-4xl mx-auto h-[600px] bg-surface-50 animate-pulse rounded-2xl border border-surface-200" />
);

// Dynamic imports with ssr: false
export const JsonFormatter = dynamic(() => import('./JsonFormatter').then(mod => mod.JsonFormatter), {
    ssr: false,
    loading: () => <DefaultLoading />
});

export const JwtDecoder = dynamic(() => import('./JwtDecoder').then(mod => mod.JwtDecoder), {
    ssr: false,
    loading: () => <LargeLoading />
});

export const RegexTester = dynamic(() => import('./RegexTester').then(mod => mod.RegexTester), {
    ssr: false,
    loading: () => <LargeLoading />
});

export const LoanCalculator = dynamic(() => import('./LoanCalculator').then(mod => mod.LoanCalculator), {
    ssr: false,
    loading: () => <DefaultLoading />
});

export const SalaryCalculator = dynamic(() => import('./SalaryCalculator').then(mod => mod.SalaryCalculator), {
    ssr: false,
    loading: () => <LargeLoading />
});

export const TaxEstimator = dynamic(() => import('./TaxEstimator').then(mod => mod.TaxEstimator), {
    ssr: false,
    loading: () => <DefaultLoading />
});
