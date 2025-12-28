/**
 * Loan Calculator Utilities
 * Uses the standard EMI formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 */

export interface LoanInput {
    principal: number;       // Loan amount
    interestRate: number;    // Annual interest rate in percentage
    tenure: number;          // Loan tenure
    tenureType: 'months' | 'years';
}

export interface LoanResult {
    emi: number;
    totalInterest: number;
    totalPayable: number;
    monthlyBreakdown: MonthlyPayment[];
}

export interface MonthlyPayment {
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
}

/**
 * Calculate EMI and loan details
 */
export function calculateLoan(input: LoanInput): LoanResult {
    const { principal, interestRate, tenure, tenureType } = input;

    // Convert tenure to months
    const tenureInMonths = tenureType === 'years' ? tenure * 12 : tenure;

    // Convert annual interest rate to monthly rate (as decimal)
    const monthlyRate = interestRate / 12 / 100;

    let emi: number;
    let totalPayable: number;
    let totalInterest: number;

    if (monthlyRate === 0) {
        // If interest rate is 0, simple division
        emi = principal / tenureInMonths;
        totalPayable = principal;
        totalInterest = 0;
    } else {
        // EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
        const factor = Math.pow(1 + monthlyRate, tenureInMonths);
        emi = (principal * monthlyRate * factor) / (factor - 1);
        totalPayable = emi * tenureInMonths;
        totalInterest = totalPayable - principal;
    }

    // Generate monthly breakdown
    const monthlyBreakdown = generateMonthlyBreakdown(
        principal,
        monthlyRate,
        emi,
        tenureInMonths
    );

    return {
        emi: roundToTwo(emi),
        totalInterest: roundToTwo(totalInterest),
        totalPayable: roundToTwo(totalPayable),
        monthlyBreakdown,
    };
}

/**
 * Generate month-by-month payment breakdown
 */
function generateMonthlyBreakdown(
    principal: number,
    monthlyRate: number,
    emi: number,
    months: number
): MonthlyPayment[] {
    const breakdown: MonthlyPayment[] = [];
    let balance = principal;

    for (let month = 1; month <= months; month++) {
        const interest = balance * monthlyRate;
        const principalPaid = emi - interest;
        balance = balance - principalPaid;

        breakdown.push({
            month,
            emi: roundToTwo(emi),
            principal: roundToTwo(principalPaid),
            interest: roundToTwo(interest),
            balance: roundToTwo(Math.max(0, balance)),
        });
    }

    return breakdown;
}

/**
 * Round number to 2 decimal places
 */
function roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Format currency with commas
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
}
