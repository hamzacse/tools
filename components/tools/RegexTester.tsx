'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardResults } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { InfoTooltip } from '@/components/ui/Tooltip';
import {
    testRegex,
    validatePattern,
    getFlagDescription,
    commonPatterns,
    type RegexFlags,
    type RegexResult
} from '@/lib/utils/regex';

export const RegexTester: React.FC = () => {
    const [pattern, setPattern] = useState<string>('');
    const [testString, setTestString] = useState<string>('');
    const [flags, setFlags] = useState<RegexFlags>({
        global: true,
        ignoreCase: false,
        multiline: false,
        dotAll: false,
        unicode: false,
    });

    // Debounce inputs to improve INP
    const debouncedPattern = useDebounce(pattern, 400);
    const debouncedTestString = useDebounce(testString, 400);

    const result = useMemo<RegexResult>(() => {
        return testRegex(debouncedPattern, debouncedTestString, flags);
    }, [debouncedPattern, debouncedTestString, flags]);

    const patternValidation = useMemo(() => {
        return validatePattern(debouncedPattern);
    }, [debouncedPattern]);

    const toggleFlag = (flag: keyof RegexFlags) => {
        setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
    };

    const handlePatternSelect = (newPattern: string) => {
        setPattern(newPattern);
    };

    const handleClear = () => {
        setPattern('');
        setTestString('');
        setFlags({
            global: true,
            ignoreCase: false,
            multiline: false,
            dotAll: false,
            unicode: false,
        });
    };

    const handleSample = () => {
        setPattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
        setTestString('Contact us at support@example.com or sales@company.org for more information. Invalid: test@, @domain.com');
    };

    const FlagButton = ({ flag, label }: { flag: keyof RegexFlags; label: string }) => (
        <button
            type="button"
            onClick={() => toggleFlag(flag)}
            className={`
        px-3 py-1.5 rounded-lg text-sm font-mono font-medium
        transition-colors duration-200
        ${flags[flag]
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }
      `}
            title={getFlagDescription(flag)}
        >
            {label}
        </button>
    );

    return (
        <Card variant="elevated" padding="lg" className="max-w-4xl mx-auto">
            <CardHeader
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                }
                title="Regex Tester"
                description="Test regular expressions with real-time match highlighting"
            />

            <div className="space-y-5">
                {/* Pattern Input */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Regular Expression</label>
                        <InfoTooltip content="Enter your regex pattern without the surrounding slashes" />
                    </div>
                    <Input
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value)}
                        placeholder="Enter regex pattern, e.g. \d+|[a-z]+"
                        error={!patternValidation.valid ? patternValidation.error : undefined}
                        className="font-mono"
                    />
                </div>

                {/* Flags */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm font-medium text-surface-700">Flags</label>
                        <InfoTooltip content="Modify regex behavior with these flags" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <FlagButton flag="global" label="g" />
                        <FlagButton flag="ignoreCase" label="i" />
                        <FlagButton flag="multiline" label="m" />
                        <FlagButton flag="dotAll" label="s" />
                        <FlagButton flag="unicode" label="u" />
                    </div>
                    <p className="text-xs text-surface-500 mt-2">
                        {Object.entries(flags)
                            .filter(([, enabled]) => enabled)
                            .map(([flag]) => getFlagDescription(flag as keyof RegexFlags))
                            .join(' • ') || 'No flags selected'}
                    </p>
                </div>

                {/* Common Patterns */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm font-medium text-surface-700">Quick Patterns</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {commonPatterns.slice(0, 6).map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => handlePatternSelect(item.pattern)}
                                className="px-3 py-1.5 rounded-lg text-xs bg-surface-100 text-surface-600 hover:bg-surface-200 transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Test String */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Test String</label>
                    </div>
                    <Textarea
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        placeholder="Enter text to test against the regex"
                        rows={5}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button variant="ghost" onClick={handleSample}>
                        Load Example
                    </Button>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear All
                    </Button>
                </div>
            </div>

            {/* Results Section */}
            <div className="min-h-[300px]">
                {testString && (
                    <CardResults>
                        <div className="space-y-4">
                            {/* Match Count */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${result.matchCount > 0
                                            ? 'bg-success-100 text-success-700'
                                            : 'bg-surface-100 text-surface-600'
                                        }
                `}>
                                        {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
                                    </span>
                                    {result.error && (
                                        <span className="text-sm text-error-500">
                                            {result.error}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Highlighted Output */}
                            <div>
                                <h4 className="text-sm font-semibold text-surface-900 mb-2">Highlighted Text</h4>
                                <div
                                    className="p-4 rounded-xl bg-surface-50 border border-surface-200 text-sm whitespace-pre-wrap font-mono leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: result.highlightedText }}
                                />
                            </div>

                            {/* Match Details */}
                            {result.matches.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-surface-900 mb-2">Match Details</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-surface-50">
                                                    <th className="text-left py-2 px-3 font-medium text-surface-600">#</th>
                                                    <th className="text-left py-2 px-3 font-medium text-surface-600">Match</th>
                                                    <th className="text-right py-2 px-3 font-medium text-surface-600">Index</th>
                                                    <th className="text-right py-2 px-3 font-medium text-surface-600">Length</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.matches.slice(0, 20).map((match, index) => (
                                                    <tr key={index} className="border-b border-surface-100">
                                                        <td className="py-2 px-3 text-surface-400">{index + 1}</td>
                                                        <td className="py-2 px-3 font-mono">
                                                            <span className="bg-yellow-200 text-yellow-900 px-1 rounded">
                                                                {match.match.length > 50
                                                                    ? match.match.substring(0, 50) + '...'
                                                                    : match.match
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="py-2 px-3 text-right text-surface-600">{match.index}</td>
                                                        <td className="py-2 px-3 text-right text-surface-600">{match.length}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {result.matches.length > 20 && (
                                            <p className="text-sm text-surface-500 mt-2 text-center">
                                                Showing first 20 of {result.matches.length} matches
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardResults>
                )}
            </div>
        </Card>
    );
};
