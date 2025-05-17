import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-[1.5px]',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-[3px]',
  };
  
  const colorClasses = {
    primary: 'border-primary',
    accent: 'border-accent',
    white: 'border-white',
  };
  
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <motion.div
        className={cn(
          "animate-spin rounded-full border-t-transparent border-b-transparent",
          sizeClasses[size],
          colorClasses[color]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
} 