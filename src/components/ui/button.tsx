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
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      primary:
        'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_-3px_rgba(0,229,255,0.4)] hover:bg-cyan-400 hover:shadow-[0_0_20px_-3px_rgba(0,229,255,0.6)] active:scale-[0.98]',
      secondary:
        'bg-secondary text-white shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] hover:bg-secondary/90 hover:shadow-[0_0_20px_-3px_rgba(99,102,241,0.6)] active:scale-[0.98]',
      outline:
        'border border-border bg-card/50 text-foreground hover:bg-accent/40 hover:border-cyan-500/40 hover:text-cyan-300 hover:shadow-[0_0_15px_-5px_rgba(0,229,255,0.2)] active:scale-[0.98]',
      ghost:
        'text-muted-foreground hover:bg-accent/60 hover:text-foreground active:scale-[0.98]',
      destructive:
        'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.4)] active:scale-[0.98]',
      cyber:
        'border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_0_rgba(0,229,255,0.3)] active:scale-[0.98] font-mono tracking-wider',
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
