/**
 * JWT Decoder Utilities
 * Decode JWT tokens (header and payload only, no signature verification)
 */

export interface JwtResult {
    success: boolean;
    header?: JwtHeader;
    payload?: JwtPayload;
    error?: string;
}

export interface JwtHeader {
    alg?: string;
    typ?: string;
    kid?: string;
    [key: string]: unknown;
}

export interface JwtPayload {
    iss?: string;      // Issuer
    sub?: string;      // Subject
    aud?: string | string[];  // Audience
    exp?: number;      // Expiration time
    nbf?: number;      // Not before
    iat?: number;      // Issued at
    jti?: string;      // JWT ID
    [key: string]: unknown;
}

/**
 * Decode a JWT token
 */
export function decodeJwt(token: string): JwtResult {
    if (!token.trim()) {
        return { success: false, error: 'Please enter a JWT token' };
    }

    const parts = token.trim().split('.');

    if (parts.length !== 3) {
        return {
            success: false,
            error: `Invalid JWT format: Expected 3 parts separated by dots, got ${parts.length}`
        };
    }

    try {
        const header = decodeBase64Url(parts[0]);
        const payload = decodeBase64Url(parts[1]);

        return {
            success: true,
            header: JSON.parse(header) as JwtHeader,
            payload: JSON.parse(payload) as JwtPayload,
        };
    } catch (err) {
        return {
            success: false,
            error: `Failed to decode JWT: ${(err as Error).message}`
        };
    }
}

/**
 * Decode Base64URL encoded string
 */
function decodeBase64Url(str: string): string {
    // Add padding if necessary
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
        base64 += '='.repeat(4 - padding);
    }

    // Decode
    const decoded = atob(base64);

    // Handle UTF-8
    return decodeURIComponent(
        decoded
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
}

/**
 * Check if JWT is expired
 */
export function isExpired(payload: JwtPayload): boolean {
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
}

/**
 * Get expiration status with time remaining/elapsed
 */
export function getExpirationStatus(payload: JwtPayload): string {
    if (!payload.exp) return 'No expiration set';

    const now = Date.now();
    const expTime = payload.exp * 1000;

    if (now >= expTime) {
        const elapsed = now - expTime;
        return `Expired ${formatDuration(elapsed)} ago`;
    } else {
        const remaining = expTime - now;
        return `Expires in ${formatDuration(remaining)}`;
    }
}

/**
 * Format duration in human readable format
 */
function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
    });
}

/**
 * Get common JWT claim descriptions
 */
export function getClaimDescription(claim: string): string {
    const descriptions: Record<string, string> = {
        iss: 'Issuer - The entity that issued the token',
        sub: 'Subject - The user or entity the token represents',
        aud: 'Audience - The intended recipient of the token',
        exp: 'Expiration Time - When the token expires',
        nbf: 'Not Before - Token is not valid before this time',
        iat: 'Issued At - When the token was issued',
        jti: 'JWT ID - Unique identifier for the token',
        alg: 'Algorithm - The signing algorithm used',
        typ: 'Type - The type of token (usually "JWT")',
        kid: 'Key ID - Identifier for the key used to sign',
    };

    return descriptions[claim] || 'Custom claim';
}
