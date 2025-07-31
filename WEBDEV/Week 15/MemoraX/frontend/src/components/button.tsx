import type { ReactElement, ReactNode } from "react";
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  variant?: ButtonVariant;
  text?: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700',
  secondary: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
};

const sizeStyles = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3'
};

export function Button({
  variant = 'primary',
  text,
  startIcon,
  onClick,
  fullWidth = false,
  loading = false,
  className = '',
  children,
  size = 'md'
}: ButtonProps) {
  const buttonClasses = clsx(
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    {
      'w-full': fullWidth,
      'opacity-70': loading,
      'justify-start': startIcon || children
    },
    className
  );

  return (
    <button 
      type="button" 
      disabled={loading} 
      onClick={onClick} 
      className={buttonClasses}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children || text}
      {loading && (
        <span className="ml-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </button>
  );
}