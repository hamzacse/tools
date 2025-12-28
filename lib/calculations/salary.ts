/**
 * Salary Calculator Utilities
 * Calculate net salary from gross with allowances and deductions
 */

export interface SalaryComponent {
    id: string;
    name: string;
    value: number;
    type: 'fixed' | 'percentage';
}

export interface SalaryInput {
    grossSalary: number;
    period: 'monthly' | 'yearly';
    allowances: SalaryComponent[];
    deductions: SalaryComponent[];
}

export interface SalaryResult {
    grossSalary: number;
    totalAllowances: number;
    totalDeductions: number;
    netSalary: number;
    monthlyNet: number;
    yearlyNet: number;
    breakdown: SalaryBreakdown;
}

export interface SalaryBreakdown {
    allowances: ComponentBreakdown[];
    deductions: ComponentBreakdown[];
}

export interface ComponentBreakdown {
    name: string;
    amount: number;
    percentage: number;
}

/**
 * Default allowance templates
 */
export const defaultAllowances: SalaryComponent[] = [
    { id: 'hra', name: 'House Rent Allowance', value: 0, type: 'percentage' },
    { id: 'ta', name: 'Transport Allowance', value: 0, type: 'fixed' },
    { id: 'medical', name: 'Medical Allowance', value: 0, type: 'fixed' },
    { id: 'special', name: 'Special Allowance', value: 0, type: 'fixed' },
];

/**
 * Default deduction templates
 */
export const defaultDeductions: SalaryComponent[] = [
    { id: 'pf', name: 'Provident Fund', value: 12, type: 'percentage' },
    { id: 'tax', name: 'Income Tax', value: 0, type: 'fixed' },
    { id: 'insurance', name: 'Insurance', value: 0, type: 'fixed' },
    { id: 'other', name: 'Other Deductions', value: 0, type: 'fixed' },
];

/**
 * Calculate salary breakdown
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
    const { grossSalary, period, allowances, deductions } = input;

    // Convert to monthly if yearly
    const monthlyGross = period === 'yearly' ? grossSalary / 12 : grossSalary;

    // Calculate allowances
    let totalAllowances = 0;
    const allowanceBreakdown: ComponentBreakdown[] = [];

    for (const allowance of allowances) {
        if (allowance.value > 0) {
            const amount = allowance.type === 'percentage'
                ? (monthlyGross * allowance.value) / 100
                : allowance.value;

            totalAllowances += amount;
            allowanceBreakdown.push({
                name: allowance.name,
                amount: roundToTwo(amount),
                percentage: roundToTwo((amount / monthlyGross) * 100),
            });
        }
    }

    // Calculate deductions
    let totalDeductions = 0;
    const deductionBreakdown: ComponentBreakdown[] = [];

    // Calculate deductions based on gross + allowances
    const salaryBeforeDeductions = monthlyGross + totalAllowances;

    for (const deduction of deductions) {
        if (deduction.value > 0) {
            const amount = deduction.type === 'percentage'
                ? (salaryBeforeDeductions * deduction.value) / 100
                : deduction.value;

            totalDeductions += amount;
            deductionBreakdown.push({
                name: deduction.name,
                amount: roundToTwo(amount),
                percentage: roundToTwo((amount / salaryBeforeDeductions) * 100),
            });
        }
    }

    // Calculate net salary
    const netSalary = salaryBeforeDeductions - totalDeductions;
    const monthlyNet = netSalary;
    const yearlyNet = netSalary * 12;

    return {
        grossSalary: roundToTwo(monthlyGross),
        totalAllowances: roundToTwo(totalAllowances),
        totalDeductions: roundToTwo(totalDeductions),
        netSalary: roundToTwo(netSalary),
        monthlyNet: roundToTwo(monthlyNet),
        yearlyNet: roundToTwo(yearlyNet),
        breakdown: {
            allowances: allowanceBreakdown,
            deductions: deductionBreakdown,
        },
    };
}

/**
 * Round number to 2 decimal places
 */
function roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Generate unique ID for new components
 */
export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}
