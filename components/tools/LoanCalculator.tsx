'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardResults } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { InfoTooltip } from '@/components/ui/Tooltip';
import {
    calculateLoan,
    formatCurrency,
    type LoanInput,
    type LoanResult
} from '@/lib/calculations/loan';

export const LoanCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState<string>('100000');
    const [interestRate, setInterestRate] = useState<string>('8.5');
    const [tenure, setTenure] = useState<string>('20');
    const [tenureType, setTenureType] = useState<'months' | 'years'>('years');
    const [currency, setCurrency] = useState<string>('USD');

    const result = useMemo<LoanResult | null>(() => {
        const principalNum = parseFloat(principal);
        const rateNum = parseFloat(interestRate);
        const tenureNum = parseFloat(tenure);

        if (isNaN(principalNum) || isNaN(rateNum) || isNaN(tenureNum)) {
            return null;
        }

        if (principalNum <= 0 || rateNum < 0 || tenureNum <= 0) {
            return null;
        }

        const input: LoanInput = {
            principal: principalNum,
            interestRate: rateNum,
            tenure: tenureNum,
            tenureType,
        };

        return calculateLoan(input);
    }, [principal, interestRate, tenure, tenureType]);

    const handleReset = () => {
        setPrincipal('100000');
        setInterestRate('8.5');
        setTenure('20');
        setTenureType('years');
    };

    // Calculate percentage for pie chart visualization
    const principalPercent = result
        ? (parseFloat(principal) / result.totalPayable) * 100
        : 0;

    return (
        <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto">
            <CardHeader
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2v20M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
                title="Loan Calculator"
                description="Calculate your EMI, total interest, and payment schedule"
            />

            <div className="space-y-5">
                {/* Loan Amount */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Loan Amount</label>
                        <InfoTooltip content="The total amount you want to borrow" />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="h-11 px-3 rounded-lg border border-surface-200 bg-white text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                        >
                            <option value="USD">$</option>
                            <option value="EUR">€</option>
                            <option value="GBP">£</option>
                            <option value="INR">₹</option>
                        </select>
                        <Input
                            type="number"
                            value={principal}
                            onChange={(e) => setPrincipal(e.target.value)}
                            placeholder="Enter loan amount"
                            min="0"
                        />
                    </div>
                </div>

                {/* Interest Rate */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Interest Rate (% per annum)</label>
                        <InfoTooltip content="Annual interest rate on the loan" />
                    </div>
                    <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Enter interest rate"
                        min="0"
                        max="50"
                        step="0.1"
                        rightIcon={<span className="text-surface-500">%</span>}
                    />
                </div>

                {/* Tenure */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Loan Tenure</label>
                        <InfoTooltip content="Duration of the loan" />
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                            placeholder="Enter tenure"
                            min="1"
                            className="flex-1"
                        />
                        <div className="flex rounded-lg border border-surface-200 overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setTenureType('years')}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${tenureType === 'years'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white text-surface-600 hover:bg-surface-50'
                                    }`}
                            >
                                Years
                            </button>
                            <button
                                type="button"
                                onClick={() => setTenureType('months')}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${tenureType === 'months'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white text-surface-600 hover:bg-surface-50'
                                    }`}
                            >
                                Months
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <Button variant="secondary" onClick={handleReset} className="flex-1">
                        Reset
                    </Button>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <CardResults>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: Numbers */}
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
                                <p className="text-sm text-primary-600 mb-1">Monthly EMI</p>
                                <p className="text-3xl font-bold text-primary-700">
                                    {formatCurrency(result.emi, currency)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-surface-50">
                                    <p className="text-sm text-surface-500 mb-1">Total Interest</p>
                                    <p className="text-xl font-semibold text-surface-900">
                                        {formatCurrency(result.totalInterest, currency)}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-surface-50">
                                    <p className="text-sm text-surface-500 mb-1">Total Payable</p>
                                    <p className="text-xl font-semibold text-surface-900">
                                        {formatCurrency(result.totalPayable, currency)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Visual */}
                        <div className="flex items-center justify-center">
                            <div className="relative w-40 h-40">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    {/* Background circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#e4e4e7"
                                        strokeWidth="12"
                                    />
                                    {/* Principal portion */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#6366f1"
                                        strokeWidth="12"
                                        strokeDasharray={`${principalPercent * 2.51} ${251 - principalPercent * 2.51}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xs text-surface-500">Principal</span>
                                    <span className="text-lg font-semibold text-surface-900">
                                        {principalPercent.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-surface-100">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary-500" />
                            <span className="text-sm text-surface-600">Principal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-surface-200" />
                            <span className="text-sm text-surface-600">Interest</span>
                        </div>
                    </div>
                </CardResults>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 rounded-lg bg-warning-50 border border-warning-500/20">
                <p className="text-sm text-warning-600">
                    <strong>Disclaimer:</strong> This calculator provides estimates for informational purposes only.
                    Actual loan terms may vary. Please consult your financial institution for accurate figures.
                </p>
            </div>
        </Card>
    );
};
