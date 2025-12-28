'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardResults } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { useDebounce } from '@/lib/hooks/useDebounce';
import {
    decodeJwt,
    isExpired,
    getExpirationStatus,
    formatTimestamp,
    getClaimDescription,
    type JwtResult
} from '@/lib/utils/jwt';

export const JwtDecoder: React.FC = () => {
    const [token, setToken] = useState<string>('');

    // Debounce token to improve INP
    const debouncedToken = useDebounce(token, 400);

    const result = useMemo<JwtResult>(() => {
        if (!debouncedToken.trim()) {
            return { success: true };
        }
        return decodeJwt(debouncedToken);
    }, [debouncedToken]);

    const handleSample = () => {
        // Sample JWT token (expired, for demo purposes)
        const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        setToken(sampleToken);
    };

    const handleClear = () => {
        setToken('');
    };

    const renderValue = (value: unknown): React.ReactNode => {
        if (typeof value === 'object' && value !== null) {
            return (
                <pre className="text-sm bg-surface-50 p-2 rounded-lg overflow-x-auto">
                    {JSON.stringify(value, null, 2)}
                </pre>
            );
        }
        return String(value);
    };

    const ClaimRow = ({ claim, value, isTimestamp = false }: {
        claim: string;
        value: unknown;
        isTimestamp?: boolean;
    }) => {
        const description = getClaimDescription(claim);
        const isStandardClaim = ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'].includes(claim);

        return (
            <div className="py-3 border-b border-surface-100 last:border-0">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium text-primary-600">{claim}</span>
                            {isStandardClaim && (
                                <span className="text-xs text-surface-400" title={description}>
                                    ({description.split(' - ')[0]})
                                </span>
                            )}
                        </div>
                        <div className="mt-1 text-sm text-surface-700">
                            {renderValue(value)}
                            {isTimestamp && typeof value === 'number' && (
                                <p className="text-xs text-surface-500 mt-1">
                                    {formatTimestamp(value)}
                                </p>
                            )}
                        </div>
                    </div>
                    <CopyButton text={String(value)} />
                </div>
            </div>
        );
    };

    return (
        <Card variant="elevated" padding="lg" className="max-w-4xl mx-auto">
            <CardHeader
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                }
                title="JWT Decoder"
                description="Decode and inspect JSON Web Tokens (header & payload only)"
            />

            <div className="space-y-4">
                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={handleSample}>
                        Load Sample
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleClear}>
                        Clear
                    </Button>
                </div>

                {/* Input */}
                <Textarea
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                    rows={4}
                    error={result.error}
                />

                {/* Security Warning */}
                <div className="p-4 rounded-lg bg-warning-50 border border-warning-500/20">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-warning-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-warning-700">Security Notice</p>
                            <p className="text-sm text-warning-600 mt-1">
                                This tool only decodes the token - it does <strong>not verify the signature</strong>.
                                Never trust unverified tokens in production applications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="min-h-[400px]">
                {result.success && result.header && result.payload && (
                    <CardResults>
                        <div className="space-y-6">
                            {/* Expiration Status */}
                            {result.payload.exp && (
                                <div className={`p-4 rounded-lg ${isExpired(result.payload) ? 'bg-error-50 border border-error-200' : 'bg-success-50 border border-success-200'}`}>
                                    <div className="flex items-center gap-3">
                                        {isExpired(result.payload) ? (
                                            <svg className="w-5 h-5 text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                        <span className={`text-sm font-medium ${isExpired(result.payload) ? 'text-error-700' : 'text-success-700'}`}>
                                            {getExpirationStatus(result.payload)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Header Section */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-surface-900">Header</h3>
                                    <CopyButton text={JSON.stringify(result.header, null, 2)} variant="text" />
                                </div>
                                <div className="bg-surface-50 rounded-xl p-4">
                                    {Object.entries(result.header).map(([key, value]) => (
                                        <ClaimRow key={key} claim={key} value={value} />
                                    ))}
                                </div>
                            </div>

                            {/* Payload Section */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-surface-900">Payload</h3>
                                    <CopyButton text={JSON.stringify(result.payload, null, 2)} variant="text" />
                                </div>
                                <div className="bg-surface-50 rounded-xl p-4">
                                    {Object.entries(result.payload).map(([key, value]) => (
                                        <ClaimRow
                                            key={key}
                                            claim={key}
                                            value={value}
                                            isTimestamp={['exp', 'nbf', 'iat'].includes(key)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Raw JSON */}
                            <div>
                                <h3 className="text-sm font-semibold text-surface-900 mb-3">Raw JSON</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-surface-500 mb-2">Header</p>
                                        <pre className="p-4 rounded-xl bg-surface-900 text-surface-100 text-xs overflow-x-auto">
                                            {JSON.stringify(result.header, null, 2)}
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-xs text-surface-500 mb-2">Payload</p>
                                        <pre className="p-4 rounded-xl bg-surface-900 text-surface-100 text-xs overflow-x-auto">
                                            {JSON.stringify(result.payload, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardResults>
                )}
            </div>
        </Card>
    );
};
