/**
 * Regex Tester Utilities
 * Test regular expressions with match highlighting
 */

export interface RegexFlags {
    global: boolean;      // g - Find all matches
    ignoreCase: boolean;  // i - Case-insensitive
    multiline: boolean;   // m - ^ and $ match line boundaries
    dotAll: boolean;      // s - . matches newlines
    unicode: boolean;     // u - Unicode mode
}

export interface RegexMatch {
    match: string;
    index: number;
    length: number;
    groups?: Record<string, string>;
}

export interface RegexResult {
    success: boolean;
    matches: RegexMatch[];
    matchCount: number;
    highlightedText: string;
    error?: string;
}

/**
 * Default regex flags
 */
export const defaultFlags: RegexFlags = {
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
};

/**
 * Test a regular expression against input text
 */
export function testRegex(
    pattern: string,
    text: string,
    flags: RegexFlags = defaultFlags
): RegexResult {
    if (!pattern) {
        return {
            success: true,
            matches: [],
            matchCount: 0,
            highlightedText: escapeHtml(text),
        };
    }

    try {
        // Build flags string
        let flagStr = '';
        if (flags.global) flagStr += 'g';
        if (flags.ignoreCase) flagStr += 'i';
        if (flags.multiline) flagStr += 'm';
        if (flags.dotAll) flagStr += 's';
        if (flags.unicode) flagStr += 'u';

        const regex = new RegExp(pattern, flagStr);
        const matches: RegexMatch[] = [];

        if (flags.global) {
            let match;
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    match: match[0],
                    index: match.index,
                    length: match[0].length,
                    groups: match.groups,
                });

                // Prevent infinite loops for zero-length matches
                if (match[0].length === 0) {
                    regex.lastIndex++;
                }
            }
        } else {
            const match = regex.exec(text);
            if (match) {
                matches.push({
                    match: match[0],
                    index: match.index,
                    length: match[0].length,
                    groups: match.groups,
                });
            }
        }

        // Generate highlighted text
        const highlightedText = highlightMatches(text, matches);

        return {
            success: true,
            matches,
            matchCount: matches.length,
            highlightedText,
        };
    } catch (err) {
        return {
            success: false,
            matches: [],
            matchCount: 0,
            highlightedText: escapeHtml(text),
            error: (err as Error).message,
        };
    }
}

/**
 * Highlight matches in text
 */
function highlightMatches(text: string, matches: RegexMatch[]): string {
    if (matches.length === 0) {
        return escapeHtml(text);
    }

    // Sort matches by index (should already be sorted, but just in case)
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    let result = '';
    let lastIndex = 0;

    for (const match of sortedMatches) {
        // Add text before match
        result += escapeHtml(text.substring(lastIndex, match.index));
        // Add highlighted match
        result += `<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">${escapeHtml(match.match)}</mark>`;
        lastIndex = match.index + match.length;
    }

    // Add remaining text
    result += escapeHtml(text.substring(lastIndex));

    return result;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Validate regex pattern without executing
 */
export function validatePattern(pattern: string): { valid: boolean; error?: string } {
    if (!pattern) {
        return { valid: true };
    }

    try {
        new RegExp(pattern);
        return { valid: true };
    } catch (err) {
        return { valid: false, error: (err as Error).message };
    }
}

/**
 * Get regex flag descriptions
 */
export function getFlagDescription(flag: keyof RegexFlags): string {
    const descriptions: Record<keyof RegexFlags, string> = {
        global: 'Find all matches instead of stopping after the first match',
        ignoreCase: 'Case-insensitive matching',
        multiline: '^  and $ match start/end of each line',
        dotAll: '. matches newline characters',
        unicode: 'Enable Unicode matching',
    };
    return descriptions[flag];
}

/**
 * Common regex patterns for quick reference
 */
export const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'URL', pattern: 'https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&\'()*+,;=%]+' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}' },
    { name: 'IP Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { name: 'Time (HH:MM)', pattern: '(?:[01]\\d|2[0-3]):[0-5]\\d' },
    { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b' },
    { name: 'Credit Card', pattern: '\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b' },
];
