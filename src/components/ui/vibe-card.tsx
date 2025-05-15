import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "rounded-lg border shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        glass: "bg-white/10 backdrop-blur-md border-white/20",
        dark: "bg-slate-900 text-white border-slate-800",
        gradient: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none",
      },
      hover: {
        none: "",
        lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        glow: "transition-all duration-300 hover:shadow-[0_0_20px_rgba(192,132,252,0.5)]",
      }
    },
    defaultVariants: {
      variant: "default",
      hover: "none",
    },
  }
);

export interface VibeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const VibeCard = React.forwardRef<HTMLDivElement, VibeCardProps>(
  ({ className, variant, hover, asChild = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, hover, className }))}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
    );
  }
);

VibeCard.displayName = "VibeCard";

export { VibeCard, cardVariants }; 