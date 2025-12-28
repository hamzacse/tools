'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
    text: string;
    className?: string;
    variant?: 'icon' | 'text' | 'full';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
    text,
    className = '',
    variant = 'icon'
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    if (variant === 'icon') {
        return (
            <button
                onClick={handleCopy}
                className={`
          inline-flex items-center justify-center 
          w-9 h-9 rounded-lg
          text-surface-500 hover:text-surface-700
          hover:bg-surface-100
          transition-all duration-200
          ${className}
        `}
                aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
                title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
                {copied ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5 15V5C5 3.89543 5.89543 3 7 3H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )}
            </button>
        );
    }

    if (variant === 'text') {
        return (
            <button
                onClick={handleCopy}
                className={`
          inline-flex items-center gap-1.5
          text-sm text-primary-600 hover:text-primary-700
          transition-colors duration-200
          ${className}
        `}
            >
                {copied ? (
                    <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Copied!
                    </>
                ) : (
                    <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M5 15V5C5 3.89543 5.89543 3 7 3H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Copy
                    </>
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleCopy}
            className={`
        inline-flex items-center justify-center gap-2
        h-10 px-4 rounded-lg
        bg-background border border-surface-200
        text-sm font-medium text-surface-700
        hover:bg-surface-50 hover:border-surface-300
        transition-all duration-200
        ${className}
      `}
        >
            {copied ? (
                <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                    </svg>
                    Copied!
                </>
            ) : (
                <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5 15V5C5 3.89543 5.89543 3 7 3H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Copy to Clipboard
                </>
            )}
        </button>
    );
};
