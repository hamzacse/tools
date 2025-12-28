/**
 * Tax Estimator Utilities
 * Country-agnostic progressive tax calculation with configurable slabs
 */

export interface TaxSlab {
    min: number;
    max: number | null;  // null for highest bracket (no upper limit)
    rate: number;        // Tax rate as percentage
}

export interface TaxConfig {
    name: string;
    currency: string;
    slabs: TaxSlab[];
    standardDeduction?: number;
}

export interface TaxInput {
    annualIncome: number;
    deductions: number;
    config: TaxConfig;
}

export interface TaxResult {
    grossIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    taxAmount: number;
    effectiveRate: number;
    netIncome: number;
    slabBreakdown: SlabBreakdown[];
}

export interface SlabBreakdown {
    slab: string;
    rate: number;
    taxableAmount: number;
    taxAmount: number;
}

/**
 * Default tax configurations for common countries
 */
export const taxConfigs: Record<string, TaxConfig> = {
    us: {
        name: 'United States (2024)',
        currency: 'USD',
        standardDeduction: 14600,
        slabs: [
            { min: 0, max: 11600, rate: 10 },
            { min: 11600, max: 47150, rate: 12 },
            { min: 47150, max: 100525, rate: 22 },
            { min: 100525, max: 191950, rate: 24 },
            { min: 191950, max: 243725, rate: 32 },
            { min: 243725, max: 609350, rate: 35 },
            { min: 609350, max: null, rate: 37 },
        ],
    },
    uk: {
        name: 'United Kingdom (2024-25)',
        currency: 'GBP',
        standardDeduction: 12570,
        slabs: [
            { min: 0, max: 12570, rate: 0 },
            { min: 12570, max: 50270, rate: 20 },
            { min: 50270, max: 125140, rate: 40 },
            { min: 125140, max: null, rate: 45 },
        ],
    },
    india: {
        name: 'India - New Regime (2024-25)',
        currency: 'INR',
        standardDeduction: 50000,
        slabs: [
            { min: 0, max: 300000, rate: 0 },
            { min: 300000, max: 600000, rate: 5 },
            { min: 600000, max: 900000, rate: 10 },
            { min: 900000, max: 1200000, rate: 15 },
            { min: 1200000, max: 1500000, rate: 20 },
            { min: 1500000, max: null, rate: 30 },
        ],
    },
    custom: {
        name: 'Custom',
        currency: 'USD',
        slabs: [
            { min: 0, max: 10000, rate: 10 },
            { min: 10000, max: 40000, rate: 20 },
            { min: 40000, max: 80000, rate: 30 },
            { min: 80000, max: null, rate: 40 },
        ],
    },
};

/**
 * Calculate tax based on progressive slabs
 */
export function calculateTax(input: TaxInput): TaxResult {
    const { annualIncome, deductions, config } = input;

    // Apply standard deduction if available
    const standardDeduction = config.standardDeduction || 0;
    const totalDeductions = deductions + standardDeduction;

    // Calculate taxable income
    const taxableIncome = Math.max(0, annualIncome - totalDeductions);

    // Calculate tax using progressive slabs
    let taxAmount = 0;
    const slabBreakdown: SlabBreakdown[] = [];

    for (const slab of config.slabs) {
        const slabMax = slab.max ?? Infinity;

        if (taxableIncome > slab.min) {
            const taxableInSlab = Math.min(taxableIncome, slabMax) - slab.min;
            const taxForSlab = (taxableInSlab * slab.rate) / 100;

            taxAmount += taxForSlab;

            if (taxableInSlab > 0) {
                slabBreakdown.push({
                    slab: slab.max
                        ? `${formatCurrency(slab.min, config.currency)} - ${formatCurrency(slab.max, config.currency)}`
                        : `Above ${formatCurrency(slab.min, config.currency)}`,
                    rate: slab.rate,
                    taxableAmount: roundToTwo(taxableInSlab),
                    taxAmount: roundToTwo(taxForSlab),
                });
            }
        }
    }

    // Calculate effective tax rate
    const effectiveRate = taxableIncome > 0
        ? (taxAmount / taxableIncome) * 100
        : 0;

    // Calculate net income
    const netIncome = annualIncome - taxAmount;

    return {
        grossIncome: roundToTwo(annualIncome),
        totalDeductions: roundToTwo(totalDeductions),
        taxableIncome: roundToTwo(taxableIncome),
        taxAmount: roundToTwo(taxAmount),
        effectiveRate: roundToTwo(effectiveRate),
        netIncome: roundToTwo(netIncome),
        slabBreakdown,
    };
}

/**
 * Round number to 2 decimal places
 */
function roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    const locales: Record<string, string> = {
        USD: 'en-US',
        GBP: 'en-GB',
        INR: 'en-IN',
        EUR: 'de-DE',
    };

    return new Intl.NumberFormat(locales[currency] || 'en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
