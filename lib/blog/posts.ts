export interface RelatedTool {
    name: string;
    href: string;
    icon: string;
    description: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    category: 'finance' | 'development' | 'tips';
    readTime: string;
    image?: string;
    content: string;
    relatedTools: RelatedTool[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'how-to-calculate-loan-emi',
        title: 'How to Calculate Loan EMI: A Complete Guide',
        description: 'Learn the EMI formula, understand how interest rates affect your payments, and make informed borrowing decisions.',
        date: '2024-12-28',
        author: 'ToolForge Team',
        category: 'finance',
        readTime: '5 min read',
        relatedTools: [
            { name: 'Loan Calculator', href: '/finance/loan-calculator', icon: '💰', description: 'Calculate your EMI instantly' },
            { name: 'Tax Estimator', href: '/finance/tax-estimator', icon: '📊', description: 'Estimate your tax liability' },
        ],
        content: `
# How to Calculate Loan EMI: A Complete Guide

Taking out a loan is a significant financial decision. Understanding how your EMI (Equated Monthly Installment) is calculated helps you plan your finances better and make informed borrowing decisions.

## What is EMI?

EMI stands for Equated Monthly Installment. It's the fixed amount you pay to your lender every month until the loan is fully repaid. Each EMI consists of two components:

1. **Principal repayment** - The portion that reduces your outstanding loan
2. **Interest payment** - The cost of borrowing money

## The EMI Formula

The standard EMI formula is:

\`\`\`
EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
\`\`\`

Where:
- **P** = Principal loan amount
- **r** = Monthly interest rate (annual rate ÷ 12 ÷ 100)
- **n** = Loan tenure in months

## Example Calculation

Let's calculate the EMI for a $100,000 loan at 8% annual interest for 20 years:

- P = $100,000
- r = 8% ÷ 12 ÷ 100 = 0.00667
- n = 20 × 12 = 240 months

EMI = $100,000 × 0.00667 × (1.00667)^240 / ((1.00667)^240 - 1)
EMI ≈ $836.44

## Tips for Managing Your Loan

1. **Make prepayments when possible** - Even small extra payments reduce your total interest
2. **Choose the right tenure** - Shorter tenure means higher EMI but less total interest
3. **Compare interest rates** - Even 0.5% difference can save thousands over the loan term
4. **Use a loan calculator** - Always calculate before committing to a loan

## Conclusion

Understanding EMI calculation empowers you to make better financial decisions. Use our free loan calculator to experiment with different scenarios and find the best option for your situation.
    `
    },
    {
        slug: 'understanding-progressive-tax-system',
        title: 'Understanding Progressive Tax Systems: What You Pay and Why',
        description: 'Demystify how progressive tax brackets work and why your effective tax rate matters more than your marginal rate.',
        date: '2024-12-27',
        author: 'ToolForge Team',
        category: 'finance',
        readTime: '6 min read',
        relatedTools: [
            { name: 'Tax Estimator', href: '/finance/tax-estimator', icon: '📊', description: 'Estimate your tax liability' },
            { name: 'Salary Calculator', href: '/finance/salary-calculator', icon: '💵', description: 'Calculate take-home pay' },
        ],
        content: `
# Understanding Progressive Tax Systems

Many people misunderstand how tax brackets work. A common misconception is that moving to a higher tax bracket means all your income gets taxed at the higher rate. Let's clear that up.

## How Progressive Taxation Works

In a progressive tax system, different portions of your income are taxed at different rates. Only the income within each bracket is taxed at that bracket's rate.

### Example with US 2024 Tax Brackets

If you earn $60,000:

| Bracket | Income Range | Tax Rate | Tax Amount |
|---------|-------------|----------|------------|
| 10% | $0 - $11,600 | 10% | $1,160 |
| 12% | $11,600 - $47,150 | 12% | $4,266 |
| 22% | $47,150 - $60,000 | 22% | $2,827 |
| **Total** | | | **$8,253** |

Your **effective tax rate** = $8,253 ÷ $60,000 = **13.76%**

## Marginal vs Effective Tax Rate

- **Marginal rate**: The rate on your last dollar earned (22% in the example)
- **Effective rate**: The actual percentage of total income paid (13.76%)

## Why This Matters

1. Don't fear earning more - you won't "lose money" by moving to a higher bracket
2. Focus on your effective rate for budgeting
3. Deductions reduce taxable income, saving you at your marginal rate

Use our tax estimator to see how different income levels affect your actual tax burden.
    `
    },
    {
        slug: 'jwt-tokens-explained-for-developers',
        title: 'JWT Tokens Explained: A Developer\'s Guide to JSON Web Tokens',
        description: 'Everything developers need to know about JWTs - structure, security considerations, and best practices for authentication.',
        date: '2024-12-26',
        author: 'ToolForge Team',
        category: 'development',
        readTime: '8 min read',
        relatedTools: [
            { name: 'JWT Decoder', href: '/dev/jwt-decoder', icon: '🔐', description: 'Decode JWT tokens instantly' },
            { name: 'JSON Formatter', href: '/dev/json-formatter', icon: '📋', description: 'Format and validate JSON' },
        ],
        content: `
# JWT Tokens Explained: A Developer's Guide

JSON Web Tokens (JWTs) are everywhere in modern web development. Understanding how they work is essential for any developer working with authentication.

## JWT Structure

A JWT consists of three parts separated by dots:

\`\`\`
header.payload.signature
\`\`\`

### 1. Header
Contains the token type and signing algorithm:
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

### 2. Payload
Contains claims (data) about the user:
\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
\`\`\`

### 3. Signature
Ensures the token hasn't been tampered with:
\`\`\`
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
\`\`\`

## Common JWT Claims

| Claim | Name | Description |
|-------|------|-------------|
| iss | Issuer | Who created the token |
| sub | Subject | Who the token is about |
| exp | Expiration | When the token expires |
| iat | Issued At | When the token was created |
| aud | Audience | Who the token is for |

## Security Best Practices

1. **Always verify signatures** - Never trust a token without verification
2. **Use HTTPS** - JWTs can be read by anyone with the token
3. **Keep secrets secure** - Never expose your signing key
4. **Set short expiration** - Use refresh tokens for long-lived sessions
5. **Don't store sensitive data** - Payload is only encoded, not encrypted

## When to Use JWTs

✅ **Good for:**
- Stateless authentication
- API authorization
- Single sign-on (SSO)

❌ **Not ideal for:**
- Session management requiring immediate revocation
- Storing sensitive user data

Use our JWT decoder to inspect tokens during development!
    `
    },
    {
        slug: 'regex-patterns-every-developer-should-know',
        title: '10 Regex Patterns Every Developer Should Know',
        description: 'Master these essential regular expressions for validation, parsing, and text manipulation in any programming language.',
        date: '2024-12-25',
        author: 'ToolForge Team',
        category: 'development',
        readTime: '7 min read',
        relatedTools: [
            { name: 'Regex Tester', href: '/dev/regex-tester', icon: '🔍', description: 'Test regex patterns online' },
            { name: 'JSON Formatter', href: '/dev/json-formatter', icon: '📋', description: 'Format and validate JSON' },
        ],
        content: `
# 10 Regex Patterns Every Developer Should Know

Regular expressions are powerful tools for text processing. Here are the patterns you'll use most often.

## 1. Email Validation

\`\`\`regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
\`\`\`

## 2. URL Matching

\`\`\`regex
https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)
\`\`\`

## 3. Phone Number (US)

\`\`\`regex
^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$
\`\`\`

## 4. Password Strength

At least 8 chars, 1 uppercase, 1 lowercase, 1 number:
\`\`\`regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$
\`\`\`

## 5. IP Address

\`\`\`regex
^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
\`\`\`

## 6. Date (YYYY-MM-DD)

\`\`\`regex
^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$
\`\`\`

## 7. Hex Color

\`\`\`regex
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
\`\`\`

## 8. Credit Card Number

\`\`\`regex
^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$
\`\`\`

## 9. HTML Tags

\`\`\`regex
<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)
\`\`\`

## 10. Whitespace Trimming

\`\`\`regex
^\\s+|\\s+$
\`\`\`

## Tips for Working with Regex

1. **Start simple** - Build patterns incrementally
2. **Use a tester** - Our regex tester highlights matches in real-time
3. **Add comments** - Use verbose mode for complex patterns
4. **Test edge cases** - Empty strings, special characters, etc.

Practice these patterns with our free regex tester!
    `
    },
    {
        slug: 'salary-negotiation-tips',
        title: '5 Things to Know Before Negotiating Your Salary',
        description: 'Understanding gross vs net salary, benefits valuation, and how to calculate your true compensation package.',
        date: '2024-12-24',
        author: 'ToolForge Team',
        category: 'tips',
        readTime: '5 min read',
        relatedTools: [
            { name: 'Salary Calculator', href: '/finance/salary-calculator', icon: '💵', description: 'Calculate take-home pay' },
            { name: 'Loan Calculator', href: '/finance/loan-calculator', icon: '💰', description: 'Plan your finances better' },
        ],
        content: `
# 5 Things to Know Before Negotiating Your Salary

Negotiating a job offer? Understanding the full picture of compensation goes beyond the base salary number.

## 1. Gross vs Net Salary

The number in your offer letter is your gross salary. Your take-home pay (net salary) will be significantly less after deductions:

- **Federal & state taxes** (15-35% typically)
- **Social Security** (6.2%)
- **Medicare** (1.45%)
- **Health insurance premiums**
- **Retirement contributions**

Use our salary calculator to see the real numbers.

## 2. Total Compensation Matters

Consider the full package:

| Benefit | Annual Value |
|---------|-------------|
| Health insurance | $6,000 - $20,000 |
| 401(k) match | 3-6% of salary |
| Stock options/RSUs | Varies widely |
| Paid time off | ~$2,000 per week |
| Professional development | $1,000 - $5,000 |

## 3. Know Your Market Value
Research salary ranges using:
- Glassdoor, LinkedIn Salary
- Industry surveys
- Professional networks
- Recruiters

## 4. Consider Cost of Living
$100,000 in San Francisco ≠ $100,000 in Austin

Adjust salary expectations based on:
- Housing costs
- State income tax
- Transportation
- General cost of living

## 5. Negotiate More Than Salary
If salary is fixed, negotiate:
- Signing bonus
- Remote work flexibility
- Extra vacation days
- Professional development budget
- Earlier review date

## The Bottom Line

Focus on total compensation and net income, not just the headline salary. A thorough understanding of your true compensation helps you make better career decisions.
    `
    }
];

export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
    return blogPosts.filter(post => post.category === category);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
    return [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
