'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface VibeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const VibeInput = forwardRef<HTMLInputElement, VibeInputProps>(
  ({ 
    label, 
    error, 
    className, 
    inputClassName, 
    labelClassName, 
    errorClassName, 
    ...props 
  }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label 
            htmlFor={props.id} 
            className={cn(
              "block text-sm font-medium text-foreground", 
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
            error ? "border-destructive" : "border-input",
            inputClassName
          )}
          {...props}
        />
        
        {error && (
          <p className={cn("text-sm text-destructive", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

VibeInput.displayName = 'VibeInput'; 