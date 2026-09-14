import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'cyber';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a67c52] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      primary:
        'bg-[#5d4037] text-[#fff8ef] font-semibold shadow-sm hover:bg-[#3e2723] active:scale-[0.98]',
      secondary:
        'bg-[#795548] text-[#fff8ef] shadow-sm hover:bg-[#5d4037] active:scale-[0.98]',
      outline:
        'border border-[#b89e88] bg-[#fffdf8] text-[#5d4037] hover:bg-[#e3d4c2] hover:border-[#795548] active:scale-[0.98]',
      ghost:
        'text-[#5d4037] hover:bg-accent/60 hover:text-[#3e2723] active:scale-[0.98]',
      destructive:
        'bg-[#a85d55] border border-[#914c46] text-[#fff8ef] hover:bg-[#914c46] active:scale-[0.98]',
      cyber:
        'border border-[#b89e88] bg-transparent text-[#5d4037] hover:bg-[#e3d4c2] hover:border-[#795548] active:scale-[0.98]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
      md: 'h-9 px-4 text-sm rounded-lg gap-2',
      lg: 'h-11 px-6 text-base rounded-xl gap-2.5',
      icon: 'h-9 w-9 p-0 rounded-lg justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
