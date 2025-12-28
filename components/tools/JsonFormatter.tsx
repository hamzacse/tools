'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardResults } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { useDebounce } from '@/lib/hooks/useDebounce';
import {
    formatJson,
    minifyJson,
    getJsonStats,
    type JsonResult
} from '@/lib/utils/json';

export const JsonFormatter: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [indentSize, setIndentSize] = useState<number>(2);
    const [mode, setMode] = useState<'format' | 'minify'>('format');

    // Debounce input to improve INP
    const debouncedInput = useDebounce(input, 400);

    const result = useMemo<JsonResult>(() => {
        if (!debouncedInput.trim()) {
            return { success: true, formatted: '' };
        }
        return mode === 'format' ? formatJson(debouncedInput, indentSize) : minifyJson(debouncedInput);
    }, [debouncedInput, indentSize, mode]);

    const stats = useMemo(() => {
        if (result.success && result.formatted) {
            return getJsonStats(result.formatted);
        }
        return null;
    }, [result]);

    const handleSample = () => {
        const sampleJson = {
            name: "John Doe",
            age: 30,
            email: "john@example.com",
            address: {
                street: "123 Main St",
                city: "New York",
                country: "USA"
            },
            hobbies: ["reading", "coding", "gaming"],
            active: true
        };
        setInput(JSON.stringify(sampleJson));
    };

    const handleClear = () => {
        setInput('');
    };

    return (
        <Card variant="elevated" padding="lg" className="max-w-4xl mx-auto">
            <CardHeader
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 3H8C8.55228 3 9 3.44772 9 4V8C9 9.10457 8.10457 10 7 10C8.10457 10 9 10.8954 9 12V16C9 16.5523 8.55228 17 8 17H6"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 3H16C15.4477 3 15 3.44772 15 4V8C15 9.10457 15.8954 10 17 10C15.8954 10 15 10.8954 15 12V16C15 16.5523 15.4477 17 16 17H18"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
                title="JSON Formatter"
                description="Validate, format, and beautify your JSON data"
            />

            <div className="space-y-4">
                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex rounded-lg border border-surface-200 overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setMode('format')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${mode === 'format'
                                ? 'bg-primary-500 text-white'
                                : 'bg-background text-surface-600 hover:bg-surface-50'
                                }`}
                        >
                            Format
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('minify')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${mode === 'minify'
                                ? 'bg-primary-500 text-white'
                                : 'bg-background text-surface-600 hover:bg-surface-50'
                                }`}
                        >
                            Minify
                        </button>
                    </div>

                    {mode === 'format' && (
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-surface-600">Indent:</label>
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(parseInt(e.target.value))}
                                className="h-9 px-3 rounded-lg border border-surface-200 bg-background text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                            >
                                <option value={2}>2 spaces</option>
                                <option value={4}>4 spaces</option>
                                <option value={8}>8 spaces</option>
                            </select>
                        </div>
                    )}

                    <div className="flex-1" />

                    <Button variant="ghost" size="sm" onClick={handleSample}>
                        Load Sample
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleClear}>
                        Clear
                    </Button>
                </div>

                {/* Input */}
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Paste your JSON here, e.g. {"key": "value"}'
                    rows={8}
                    error={result.error?.message}
                />

                {/* Error Details */}
                {result.error && (
                    <div className="p-4 rounded-lg bg-error-50 border border-error-200">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-error-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-error-700">Invalid JSON</p>
                                <p className="text-sm text-error-600 mt-1">{result.error.message}</p>
                                {result.error.line && (
                                    <p className="text-xs text-error-500 mt-1">
                                        Line {result.error.line}{result.error.column ? `, Column ${result.error.column}` : ''}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Section */}
            <div className="min-h-[200px]">
                {result.success && result.formatted && (
                    <CardResults>
                        <div className="space-y-4">
                            {/* Stats */}
                            {stats && (
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-surface-500">Keys:</span>
                                        <span className="text-sm font-medium text-surface-700">{stats.keys}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-surface-500">Depth:</span>
                                        <span className="text-sm font-medium text-surface-700">{stats.depth}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-surface-500">Size:</span>
                                        <span className="text-sm font-medium text-surface-700">{stats.size}</span>
                                    </div>
                                    <div className="flex-1" />
                                    <CopyButton text={result.formatted} variant="full" />
                                </div>
                            )}

                            {/* Output */}
                            <div className="relative">
                                <pre className="p-4 rounded-xl bg-surface-900 text-surface-100 text-sm overflow-x-auto max-h-96">
                                    <code>{result.formatted}</code>
                                </pre>
                            </div>
                        </div>
                    </CardResults>
                )}

                {/* Success State (valid but empty output) */}
                {result.success && !result.formatted && input.trim() && (
                    <CardResults>
                        <div className="text-center py-8">
                            <div className="w-12 h-12 rounded-full bg-success-100 text-success-600 flex items-center justify-center mx-auto mb-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="text-surface-600">Valid JSON!</p>
                        </div>
                    </CardResults>
                )}
            </div>
        </Card>
    );
};
