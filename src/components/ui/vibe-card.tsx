import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface VibeCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag'> {
  variant?: 'default' | 'glass' | 'dark' | 'gradient';
  hover?: 'none' | 'lift' | 'glow';
}

const hoverEffects = {
  none: '',
  lift: 'transition-transform hover:-translate-y-1 hover:shadow-md',
  glow: 'transition-all hover:shadow-lg shadow-primary-20',
};

const variantStyles = {
  default: 'bg-card border border-border',
  glass: 'bg-background/80 backdrop-blur-sm border border-border/50',
  dark: 'bg-foreground text-background',
  gradient: 'bg-gradient-to-br from-primary to-accent text-primary-foreground',
};

const VibeCard = React.forwardRef<HTMLDivElement, VibeCardProps>(
  ({ className = '', variant = 'default', hover = 'none', ...props }, ref) => {
    const cardClasses = cn(
      'rounded-lg p-4 shadow-sm',
      variantStyles[variant],
      hoverEffects[hover],
      className
    );
    
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props as Omit<HTMLMotionProps<"div">, "ref">}
      />
    );
  }
);

VibeCard.displayName = "VibeCard";

export { VibeCard }; 