import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular',
    width,
    height,
    lines = 1,
}) => {
    const baseStyles = 'skeleton rounded';

    const variantStyles = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;

    if (variant === 'text' && lines > 1) {
        return (
            <div className={`space-y-2 ${className}`}>
                {Array.from({ length: lines }).map((_, index) => (
                    <div
                        key={index}
                        className={`${baseStyles} ${variantStyles.text}`}
                        style={{
                            ...style,
                            width: index === lines - 1 ? '75%' : style.width || '100%',
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            style={style}
        />
    );
};

interface SkeletonCardProps {
    className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
    return (
        <div className={`p-6 rounded-xl border border-surface-200 ${className}`}>
            <div className="flex items-center gap-3 mb-6">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton width="60%" height={24} />
            </div>
            <div className="space-y-4">
                <Skeleton height={44} />
                <Skeleton height={44} />
                <Skeleton height={44} />
            </div>
            <div className="mt-6 pt-6 border-t border-surface-200">
                <Skeleton height={80} />
            </div>
        </div>
    );
};

interface SkeletonResultProps {
    className?: string;
}

export const SkeletonResult: React.FC<SkeletonResultProps> = ({ className = '' }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex justify-between items-center">
                <Skeleton width={100} height={16} />
                <Skeleton width={80} height={24} />
            </div>
            <div className="flex justify-between items-center">
                <Skeleton width={120} height={16} />
                <Skeleton width={90} height={24} />
            </div>
            <div className="flex justify-between items-center">
                <Skeleton width={90} height={16} />
                <Skeleton width={100} height={24} />
            </div>
        </div>
    );
};
