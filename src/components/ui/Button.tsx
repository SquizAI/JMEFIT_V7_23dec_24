import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3dd8e8]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[#3dd8e8] text-black hover:bg-[#34c5d3]': variant === 'primary',
            'bg-zinc-800 text-white hover:bg-zinc-700': variant === 'secondary',
            'bg-transparent hover:bg-zinc-800': variant === 'ghost',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;