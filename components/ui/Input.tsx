'use client';

import React, { forwardRef, useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        label,
        helperText,
        error,
        size = 'md',
        leftIcon,
        rightIcon,
        fullWidth = true,
        className = '',
        id,
        ...props
    }, ref) => {
        const [focused, setFocused] = useState(false);
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        const sizeStyles = {
            sm: 'h-9 text-sm px-3',
            md: 'h-11 text-base px-4',
            lg: 'h-12 text-lg px-4',
        };

        const hasError = !!error;

        const inputStyles = `
      w-full rounded-lg border bg-background 
      transition-all duration-200 
      placeholder:text-surface-400
      disabled:bg-surface-50 disabled:cursor-not-allowed
      ${hasError
                ? 'border-error-500 focus:border-error-500 focus:ring-2 focus:ring-error-500/20'
                : 'border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
            }
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${sizeStyles[size]}
    `.trim();

        return (
            <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-surface-700 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={inputStyles}
                        onFocus={(e) => {
                            setFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setFocused(false);
                            props.onBlur?.(e);
                        }}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {(helperText || error) && (
                    <p className={`mt-1.5 text-sm ${hasError ? 'text-error-500' : 'text-surface-500'}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        label,
        helperText,
        error,
        fullWidth = true,
        className = '',
        id,
        rows = 4,
        ...props
    }, ref) => {
        const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = !!error;

        const textareaStyles = `
      w-full rounded-lg border bg-background p-4
      transition-all duration-200 
      placeholder:text-surface-400
      disabled:bg-surface-50 disabled:cursor-not-allowed
      resize-none font-mono text-sm
      ${hasError
                ? 'border-error-500 focus:border-error-500 focus:ring-2 focus:ring-error-500/20'
                : 'border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
            }
    `.trim();

        return (
            <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-surface-700 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    rows={rows}
                    className={textareaStyles}
                    {...props}
                />
                {(helperText || error) && (
                    <p className={`mt-1.5 text-sm ${hasError ? 'text-error-500' : 'text-surface-500'}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    helperText?: string;
    error?: string;
    options: { value: string; label: string }[];
    fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({
        label,
        helperText,
        error,
        options,
        fullWidth = true,
        className = '',
        id,
        ...props
    }, ref) => {
        const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
        const hasError = !!error;

        const selectStyles = `
      w-full h-11 rounded-lg border bg-background px-4 pr-10
      transition-all duration-200 
      appearance-none cursor-pointer
      disabled:bg-surface-50 disabled:cursor-not-allowed
      ${hasError
                ? 'border-error-500 focus:border-error-500 focus:ring-2 focus:ring-error-500/20'
                : 'border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
            }
    `.trim();

        return (
            <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium text-surface-700 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={selectStyles}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-surface-400">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                {(helperText || error) && (
                    <p className={`mt-1.5 text-sm ${hasError ? 'text-error-500' : 'text-surface-500'}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
