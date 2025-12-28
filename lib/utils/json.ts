/**
 * JSON Formatter Utilities
 * Validate, format, and minify JSON
 */

export interface JsonResult {
    success: boolean;
    formatted?: string;
    error?: JsonError;
}

export interface JsonError {
    message: string;
    line?: number;
    column?: number;
    position?: number;
}

/**
 * Validate and format JSON
 */
export function formatJson(input: string, indentSpaces: number = 2): JsonResult {
    if (!input.trim()) {
        return {
            success: false,
            error: { message: 'Please enter some JSON to format' },
        };
    }

    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, indentSpaces);
        return { success: true, formatted };
    } catch (err) {
        const error = parseJsonError(err as SyntaxError, input);
        return { success: false, error };
    }
}

/**
 * Minify JSON
 */
export function minifyJson(input: string): JsonResult {
    if (!input.trim()) {
        return {
            success: false,
            error: { message: 'Please enter some JSON to minify' },
        };
    }

    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        return { success: true, formatted: minified };
    } catch (err) {
        const error = parseJsonError(err as SyntaxError, input);
        return { success: false, error };
    }
}

/**
 * Validate JSON without formatting
 */
export function validateJson(input: string): JsonResult {
    if (!input.trim()) {
        return {
            success: false,
            error: { message: 'Please enter some JSON to validate' },
        };
    }

    try {
        JSON.parse(input);
        return { success: true };
    } catch (err) {
        const error = parseJsonError(err as SyntaxError, input);
        return { success: false, error };
    }
}

/**
 * Parse JSON syntax error to get line and column info
 */
function parseJsonError(err: SyntaxError, input: string): JsonError {
    const message = err.message;

    // Try to extract position from error message
    const posMatch = message.match(/position (\d+)/i);
    if (posMatch) {
        const position = parseInt(posMatch[1], 10);
        const { line, column } = getLineAndColumn(input, position);
        return {
            message: cleanErrorMessage(message),
            line,
            column,
            position,
        };
    }

    // Try to extract line number from error message
    const lineMatch = message.match(/line (\d+)/i);
    if (lineMatch) {
        return {
            message: cleanErrorMessage(message),
            line: parseInt(lineMatch[1], 10),
        };
    }

    return { message: cleanErrorMessage(message) };
}

/**
 * Get line and column number from character position
 */
function getLineAndColumn(input: string, position: number): { line: number; column: number } {
    const lines = input.substring(0, position).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    return { line, column };
}

/**
 * Clean up error message for display
 */
function cleanErrorMessage(message: string): string {
    // Remove technical details
    return message
        .replace(/Unexpected token (\S) in JSON at position \d+/, 'Unexpected character "$1"')
        .replace(/Unexpected end of JSON input/, 'Unexpected end of input - JSON is incomplete')
        .replace(/Unexpected token (\S+)/, 'Unexpected token: $1')
        .replace(/Expected.*got (.+)/, 'Unexpected $1');
}

/**
 * Get JSON stats
 */
export function getJsonStats(input: string): { keys: number; depth: number; size: string } | null {
    try {
        const parsed = JSON.parse(input);
        const keys = countKeys(parsed);
        const depth = getDepth(parsed);
        const size = formatBytes(new Blob([input]).size);
        return { keys, depth, size };
    } catch {
        return null;
    }
}

/**
 * Count total keys in JSON object
 */
function countKeys(obj: unknown, count = 0): number {
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            for (const item of obj) {
                count = countKeys(item, count);
            }
        } else {
            for (const key in obj) {
                count++;
                count = countKeys((obj as Record<string, unknown>)[key], count);
            }
        }
    }
    return count;
}

/**
 * Get max depth of JSON object
 */
function getDepth(obj: unknown): number {
    if (typeof obj !== 'object' || obj === null) {
        return 0;
    }

    if (Array.isArray(obj)) {
        if (obj.length === 0) return 1;
        return 1 + Math.max(...obj.map(getDepth));
    }

    const values = Object.values(obj);
    if (values.length === 0) return 1;
    return 1 + Math.max(...values.map(getDepth));
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
