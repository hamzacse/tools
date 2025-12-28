'use client';

import React, { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'default', padding = 'md', hover = false, className = '', children, ...props }, ref) => {
        const baseStyles = 'rounded-xl transition-all duration-200';

        const variantStyles = {
            default: 'bg-background dark:bg-surface-100 border border-surface-200',
            elevated: 'bg-background dark:bg-surface-100 shadow-md dark:shadow-none dark:border dark:border-surface-200',
            outlined: 'bg-transparent border-2 border-surface-200',
        };

        const paddingStyles = {
            none: '',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        };

        const hoverStyles = hover ? 'card-hover cursor-pointer' : '';

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    icon,
    title,
    description,
    className = '',
    ...props
}) => {
    return (
        <div className={`mb-6 ${className}`} {...props}>
            <div className="flex items-center gap-3 mb-2">
                {icon && (
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                        {icon}
                    </div>
                )}
                <h2 className="text-xl font-semibold text-surface-900">{title}</h2>
            </div>
            {description && (
                <p className="text-surface-600 text-sm">{description}</p>
            )}
        </div>
    );
};

interface CardResultsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardResults: React.FC<CardResultsProps> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`mt-6 pt-6 border-t border-surface-200 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
