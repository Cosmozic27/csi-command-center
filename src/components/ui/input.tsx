import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', icon: Icon, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative flex items-center">
          {Icon && (
            <Icon className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <input
            type={type}
            ref={ref}
            className={`w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-cyan-500/60 focus:bg-card/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50 ${
              Icon ? 'pl-9' : ''
            } ${error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
