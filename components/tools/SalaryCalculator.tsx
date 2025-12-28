'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardResults } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button, IconButton } from '@/components/ui/Button';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { InfoTooltip } from '@/components/ui/Tooltip';
import {
    calculateSalary,
    formatCurrency,
    generateId,
    type SalaryComponent,
    type SalaryResult
} from '@/lib/calculations/salary';
import { CopyButton } from '@/components/ui/CopyButton';

export const SalaryCalculator: React.FC = () => {
    const [grossSalary, setGrossSalary] = useState<string>('5000');
    const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const [currency, setCurrency] = useState<string>('USD');

    const [allowances, setAllowances] = useState<SalaryComponent[]>([
        { id: generateId(), name: 'Housing Allowance', value: 500, type: 'fixed' },
    ]);

    const [deductions, setDeductions] = useState<SalaryComponent[]>([
        { id: generateId(), name: 'Tax', value: 15, type: 'percentage' },
        { id: generateId(), name: 'Insurance', value: 100, type: 'fixed' },
    ]);

    // Debounce inputs to improve INP
    const debouncedGrossSalary = useDebounce(grossSalary, 300);
    const debouncedAllowances = useDebounce(allowances, 300);
    const debouncedDeductions = useDebounce(deductions, 300);

    const result = useMemo<SalaryResult | null>(() => {
        const grossNum = parseFloat(debouncedGrossSalary);

        if (isNaN(grossNum) || grossNum < 0) {
            return null;
        }

        return calculateSalary({
            grossSalary: grossNum,
            period,
            allowances: debouncedAllowances.filter(a => a.value > 0),
            deductions: debouncedDeductions.filter(d => d.value > 0),
        });
    }, [debouncedGrossSalary, period, debouncedAllowances, debouncedDeductions]);

    const addAllowance = () => {
        setAllowances([...allowances, {
            id: generateId(),
            name: '',
            value: 0,
            type: 'fixed'
        }]);
    };

    const removeAllowance = (id: string) => {
        setAllowances(allowances.filter(a => a.id !== id));
    };

    const updateAllowance = (id: string, field: keyof SalaryComponent, value: string | number) => {
        setAllowances(allowances.map(a =>
            a.id === id ? { ...a, [field]: value } : a
        ));
    };

    const addDeduction = () => {
        setDeductions([...deductions, {
            id: generateId(),
            name: '',
            value: 0,
            type: 'fixed'
        }]);
    };

    const removeDeduction = (id: string) => {
        setDeductions(deductions.filter(d => d.id !== id));
    };

    const updateDeduction = (id: string, field: keyof SalaryComponent, value: string | number) => {
        setDeductions(deductions.map(d =>
            d.id === id ? { ...d, [field]: value } : d
        ));
    };

    const handleReset = () => {
        setGrossSalary('5000');
        setPeriod('monthly');
        setAllowances([{ id: generateId(), name: 'Housing Allowance', value: 500, type: 'fixed' }]);
        setDeductions([
            { id: generateId(), name: 'Tax', value: 15, type: 'percentage' },
            { id: generateId(), name: 'Insurance', value: 100, type: 'fixed' },
        ]);
    };

    const ComponentRow = ({
        item,
        onUpdate,
        onRemove,
        type
    }: {
        item: SalaryComponent;
        onUpdate: (id: string, field: keyof SalaryComponent, value: string | number) => void;
        onRemove: (id: string) => void;
        type: 'allowance' | 'deduction';
    }) => (
        <div className="flex gap-2 items-end">
            <div className="flex-1">
                <Input
                    value={item.name}
                    onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
                    placeholder={type === 'allowance' ? 'Allowance name' : 'Deduction name'}
                    size="sm"
                />
            </div>
            <div className="w-28">
                <Input
                    type="number"
                    value={item.value || ''}
                    onChange={(e) => onUpdate(item.id, 'value', parseFloat(e.target.value) || 0)}
                    placeholder="Amount"
                    min="0"
                    size="sm"
                />
            </div>
            <select
                value={item.type}
                onChange={(e) => onUpdate(item.id, 'type', e.target.value)}
                className="h-9 px-2 rounded-lg border border-surface-200 bg-background text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            >
                <option value="fixed">Fixed</option>
                <option value="percentage">%</option>
            </select>
            <IconButton
                variant="ghost"
                size="sm"
                label="Remove"
                onClick={() => onRemove(item.id)}
                className="text-error-500 hover:bg-error-50"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </IconButton>
        </div>
    );

    return (
        <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto">
            <CardHeader
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 8.5H22M6 16.5H8M10.5 16.5H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="2" y="4.5" width="20" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                }
                title="Salary Calculator"
                description="Calculate your net salary with allowances and deductions"
            />

            <div className="space-y-6">
                {/* Gross Salary */}
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <label className="text-sm font-medium text-surface-700">Gross Salary</label>
                        <InfoTooltip content="Your base salary before any additions or deductions" />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="h-11 px-3 rounded-lg border border-surface-200 bg-background text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                        >
                            <option value="USD">$</option>
                            <option value="EUR">€</option>
                            <option value="GBP">£</option>
                            <option value="INR">₹</option>
                        </select>
                        <Input
                            type="number"
                            value={grossSalary}
                            onChange={(e) => setGrossSalary(e.target.value)}
                            placeholder="Enter gross salary"
                            min="0"
                            className="flex-1"
                        />
                        <div className="flex rounded-lg border border-surface-200 overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setPeriod('monthly')}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${period === 'monthly'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-background text-surface-600 hover:bg-surface-50'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                type="button"
                                onClick={() => setPeriod('yearly')}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${period === 'yearly'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-background text-surface-600 hover:bg-surface-50'
                                    }`}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                </div>

                {/* Allowances */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-surface-700">Allowances</label>
                            <InfoTooltip content="Additional payments added to your base salary" />
                        </div>
                        <Button variant="ghost" size="sm" onClick={addAllowance}>
                            + Add
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {allowances.map((item) => (
                            <ComponentRow
                                key={item.id}
                                item={item}
                                onUpdate={updateAllowance}
                                onRemove={removeAllowance}
                                type="allowance"
                            />
                        ))}
                        {allowances.length === 0 && (
                            <p className="text-sm text-surface-400 italic">No allowances added</p>
                        )}
                    </div>
                </div>

                {/* Deductions */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-surface-700">Deductions</label>
                            <InfoTooltip content="Amounts deducted from your salary (taxes, insurance, etc.)" />
                        </div>
                        <Button variant="ghost" size="sm" onClick={addDeduction}>
                            + Add
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {deductions.map((item) => (
                            <ComponentRow
                                key={item.id}
                                item={item}
                                onUpdate={updateDeduction}
                                onRemove={removeDeduction}
                                type="deduction"
                            />
                        ))}
                        {deductions.length === 0 && (
                            <p className="text-sm text-surface-400 italic">No deductions added</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={handleReset} className="flex-1">
                        Reset
                    </Button>
                </div>
            </div>

            {/* Results Section */}
            <div className="min-h-[450px]">
                {result && (
                    <CardResults>
                        <div className="space-y-6">
                            {/* Net Salary Highlight */}
                            <div className="p-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white relative overflow-hidden">
                                <div className="relative z-10 text-center">
                                    <p className="text-sm opacity-90 mb-1">Monthly Net Salary</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <p className="text-4xl font-bold">
                                            {formatCurrency(result.monthlyNet, currency)}
                                        </p>
                                        <CopyButton text={result.monthlyNet.toFixed(2)} variant="icon" className="text-white hover:bg-white/10 hover:text-white h-8 w-8" />
                                    </div>
                                    <p className="text-sm opacity-75 mt-2">
                                        {formatCurrency(result.yearlyNet, currency)} / year
                                    </p>
                                </div>
                                {/* Decorative background elements */}
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
                            </div>

                            {/* Summary */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-surface-50 text-center">
                                    <p className="text-xs text-surface-500 mb-1">Gross</p>
                                    <p className="text-lg font-semibold text-surface-900">
                                        {formatCurrency(result.grossSalary, currency)}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-success-50 text-center">
                                    <p className="text-xs text-success-600 mb-1">Allowances</p>
                                    <p className="text-lg font-semibold text-success-700">
                                        +{formatCurrency(result.totalAllowances, currency)}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-error-50 text-center">
                                    <p className="text-xs text-error-600 mb-1">Deductions</p>
                                    <p className="text-lg font-semibold text-error-700">
                                        -{formatCurrency(result.totalDeductions, currency)}
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Breakdown */}
                            {(result.breakdown.allowances.length > 0 || result.breakdown.deductions.length > 0) && (
                                <div className="space-y-4">
                                    {result.breakdown.allowances.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-success-700 mb-2">Allowances</h4>
                                            {result.breakdown.allowances.map((item, index) => (
                                                <div key={index} className="flex justify-between py-1.5 text-sm">
                                                    <span className="text-surface-600">{item.name}</span>
                                                    <span className="font-medium text-success-600">
                                                        +{formatCurrency(item.amount, currency)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {result.breakdown.deductions.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-error-700 mb-2">Deductions</h4>
                                            {result.breakdown.deductions.map((item, index) => (
                                                <div key={index} className="flex justify-between py-1.5 text-sm">
                                                    <span className="text-surface-600">{item.name}</span>
                                                    <span className="font-medium text-error-600">
                                                        -{formatCurrency(item.amount, currency)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardResults>
                )}
            </div>
        </Card>
    );
};
