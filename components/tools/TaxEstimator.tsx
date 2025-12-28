'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardResults } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { InfoTooltip } from '@/components/ui/Tooltip';
import {
    calculateTax,
    formatCurrency as formatTaxCurrency,
    taxConfigs,
    type TaxConfig,
    type TaxResult
} from '@/lib/calculations/tax';
import { CopyButton } from '@/components/ui/CopyButton';

export const TaxEstimator: React.FC = () => {
    const [income, setIncome] = useState<string>('75000');
    const [deductions, setDeductions] = useState<string>('0');
    const [selectedCountry, setSelectedCountry] = useState<string>('us');

    const config: TaxConfig = taxConfigs[selectedCountry] || taxConfigs.us;

    const result = useMemo<TaxResult | null>(() => {
        const incomeNum = parseFloat(income);
        const deductionsNum = parseFloat(deductions) || 0;

        if (isNaN(incomeNum) || incomeNum < 0) {
            return null;
        }

        return calculateTax({
            annualIncome: incomeNum,
            deductions: deductionsNum,
            config,
        });
    }, [income, deductions, config]);

    const handleReset = () => {
        setIncome('75000');
        setDeductions('0');
        setSelectedCountry('us');
    };

    return (
        <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto">
            <CardHeader
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 12H15M9 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
                title="Tax Estimator"
                description="Estimate your income tax based on progressive tax slabs"
            />

            <div className="space-y-5">
                {/* Country Selection */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Tax Region</label>
                        <InfoTooltip content="Select your tax jurisdiction for applicable tax slabs" />
                    </div>
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-surface-200 bg-background text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    >
                        {Object.entries(taxConfigs).map(([key, cfg]) => (
                            <option key={key} value={key}>{cfg.name}</option>
                        ))}
                    </select>
                </div>

                {/* Annual Income */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Annual Gross Income</label>
                        <InfoTooltip content="Your total yearly income before any deductions" />
                    </div>
                    <Input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Enter annual income"
                        min="0"
                        leftIcon={<span className="text-surface-500 font-medium">{config.currency === 'USD' ? '$' : config.currency === 'GBP' ? '£' : config.currency === 'INR' ? '₹' : '€'}</span>}
                    />
                </div>

                {/* Additional Deductions */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Additional Deductions</label>
                        <InfoTooltip content="Extra deductions beyond standard deduction (investments, donations, etc.)" />
                    </div>
                    <Input
                        type="number"
                        value={deductions}
                        onChange={(e) => setDeductions(e.target.value)}
                        placeholder="Enter additional deductions"
                        min="0"
                        helperText={config.standardDeduction ? `Standard deduction of ${formatTaxCurrency(config.standardDeduction, config.currency)} will be applied automatically` : undefined}
                    />
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
                    <div className="space-y-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-error-50 dark:bg-error-900/10 border border-error-100 dark:border-error-800">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm text-error-600">Estimated Tax</p>
                                    <CopyButton text={result.taxAmount.toFixed(2)} variant="icon" className="h-7 w-7" />
                                </div>
                                <p className="text-2xl font-bold text-error-700 dark:text-error-400">
                                    {formatTaxCurrency(result.taxAmount, config.currency)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-success-50 dark:bg-success-900/10 border border-success-100 dark:border-success-800">
                                <p className="text-sm text-success-600 mb-1">Net Income</p>
                                <p className="text-2xl font-bold text-success-700 dark:text-success-400">
                                    {formatTaxCurrency(result.netIncome, config.currency)}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800">
                                <p className="text-sm text-primary-600 mb-1">Effective Rate</p>
                                <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                                    {result.effectiveRate.toFixed(2)}%
                                </p>
                            </div>
                        </div>

                        {/* Breakdown Table */}
                        <div>
                            <h4 className="text-sm font-semibold text-surface-900 mb-3">Income Breakdown</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between py-2 border-b border-surface-100">
                                    <span className="text-sm text-surface-600">Gross Income</span>
                                    <span className="text-sm font-medium text-surface-900">
                                        {formatTaxCurrency(result.grossIncome, config.currency)}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-surface-100">
                                    <span className="text-sm text-surface-600">Total Deductions</span>
                                    <span className="text-sm font-medium text-success-600">
                                        -{formatTaxCurrency(result.totalDeductions, config.currency)}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-surface-100">
                                    <span className="text-sm text-surface-600">Taxable Income</span>
                                    <span className="text-sm font-medium text-surface-900">
                                        {formatTaxCurrency(result.taxableIncome, config.currency)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tax Slab Breakdown */}
                        {result.slabBreakdown.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-surface-900 mb-3">Tax by Slab</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-surface-50">
                                                <th className="text-left py-2 px-3 font-medium text-surface-600">Slab</th>
                                                <th className="text-right py-2 px-3 font-medium text-surface-600">Rate</th>
                                                <th className="text-right py-2 px-3 font-medium text-surface-600">Taxable</th>
                                                <th className="text-right py-2 px-3 font-medium text-surface-600">Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.slabBreakdown.map((slab, index) => (
                                                <tr key={index} className="border-b border-surface-100">
                                                    <td className="py-2 px-3 text-surface-700">{slab.slab}</td>
                                                    <td className="py-2 px-3 text-right text-surface-600">{slab.rate}%</td>
                                                    <td className="py-2 px-3 text-right text-surface-700">
                                                        {formatTaxCurrency(slab.taxableAmount, config.currency)}
                                                    </td>
                                                    <td className="py-2 px-3 text-right font-medium text-surface-900">
                                                        {formatTaxCurrency(slab.taxAmount, config.currency)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </CardResults>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 rounded-lg bg-warning-50 border border-warning-500/20">
                <p className="text-sm text-warning-600">
                    <strong>Disclaimer:</strong> This is an estimate for informational purposes only.
                    Actual tax liability may vary based on individual circumstances.
                    Please consult a qualified tax professional for accurate tax advice.
                </p>
            </div>
        </Card>
    );
};
