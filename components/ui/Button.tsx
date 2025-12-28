'use client';

import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = 'primary',
        size = 'md',
        fullWidth = false,
        loading = false,
        leftIcon,
        rightIcon,
        className = '',
        disabled,
        children,
        ...props
    }, ref) => {
        const baseStyles = `
      inline-flex items-center justify-center gap-2 
      font-medium rounded-lg 
      transition-all duration-200 
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-60 disabled:cursor-not-allowed
    `.trim();

        const variantStyles = {
            primary: `
        bg-gradient-to-r from-primary-500 to-primary-600 
        text-white 
        hover:from-primary-600 hover:to-primary-700 
        focus-visible:ring-primary-500
        shadow-sm hover:shadow-md
      `,
            secondary: `
        bg-background border border-surface-200 
        text-surface-700 
        hover:bg-surface-50 hover:border-surface-300
        focus-visible:ring-primary-500
      `,
            ghost: `
        bg-transparent 
        text-surface-600 
        hover:bg-surface-100 hover:text-surface-900
        focus-visible:ring-primary-500
      `,
            danger: `
        bg-error-500 
        text-white 
        hover:bg-error-600
        focus-visible:ring-error-500
      `,
        };

        const sizeStyles = {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
        };

        const widthStyles = fullWidth ? 'w-full' : '';

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : leftIcon}
                {children}
                {!loading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    label: string;
    children: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({
        variant = 'ghost',
        size = 'md',
        label,
        className = '',
        children,
        ...props
    }, ref) => {
        const baseStyles = `
      inline-flex items-center justify-center 
      rounded-lg 
      transition-all duration-200 
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-60 disabled:cursor-not-allowed
    `.trim();

        const variantStyles = {
            primary: `
        bg-primary-500 text-white 
        hover:bg-primary-600 
        focus-visible:ring-primary-500
      `,
            secondary: `
        bg-background border border-surface-200 
        text-surface-600 
        hover:bg-surface-50 hover:text-surface-900
        focus-visible:ring-primary-500
      `,
            ghost: `
        bg-transparent 
        text-surface-500 
        hover:bg-surface-100 hover:text-surface-700
        focus-visible:ring-primary-500
      `,
        };

        const sizeStyles = {
            sm: 'h-8 w-8',
            md: 'h-10 w-10',
            lg: 'h-12 w-12',
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                aria-label={label}
                title={label}
                {...props}
            >
                {children}
            </button>
        );
    }
);

IconButton.displayName = 'IconButton';
