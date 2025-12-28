import React from 'react';

interface AdPlaceholderProps {
    position: 'top' | 'sidebar' | 'footer' | 'inline';
    className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
    position,
    className = ''
}) => {
    const sizeStyles = {
        top: 'h-24 w-full max-w-4xl mx-auto',
        sidebar: 'h-[600px] w-[300px]',
        footer: 'h-24 w-full max-w-4xl mx-auto',
        inline: 'h-32 w-full',
    };

    return (
        <div
            className={`
        ${sizeStyles[position]}
        bg-surface-50 
        border border-dashed border-surface-200 
        rounded-lg
        flex items-center justify-center
        ${className}
      `}
            aria-hidden="true"
        >
            <div className="text-center">
                <p className="text-sm text-surface-400">Advertisement</p>
                <p className="text-xs text-surface-300 mt-1">
                    {position === 'sidebar' ? '300×600' : position === 'top' || position === 'footer' ? '728×90' : '300×250'}
                </p>
            </div>
        </div>
    );
};

// Wrapper component for ad sections
interface AdSectionProps {
    position: 'top' | 'sidebar' | 'footer' | 'inline';
    children?: React.ReactNode;
    className?: string;
}

export const AdSection: React.FC<AdSectionProps> = ({
    position,
    children,
    className = ''
}) => {
    return (
        <aside
            className={`ad-section ad-${position} ${className}`}
            aria-label="Advertisement"
        >
            {children || <AdPlaceholder position={position} />}
        </aside>
    );
};
