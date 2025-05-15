import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        // Variantes para vibe coding
        neon: "bg-black text-accent-foreground border border-accent hover:bg-accent/10 relative overflow-hidden",
        gradient: "bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Efecto de resplandor para botones neon
const glowEffect = {
  initial: { boxShadow: "0 0 0px rgba(236, 72, 153, 0)" },
  animate: { boxShadow: "0 0 20px rgba(236, 72, 153, 0.7)" },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse",
  },
};

export interface VibeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  glowIntensity?: "none" | "subtle" | "medium" | "intense";
}

const VibeButton = React.forwardRef<HTMLButtonElement, VibeButtonProps>(
  ({ className, variant, size, glowIntensity = "none", asChild = false, ...props }, ref) => {
    // Determinar si aplicar el efecto de resplandor
    const shouldGlow = variant === "neon" && glowIntensity !== "none";
    
    // Configurar intensidad del resplandor
    let glowConfig = {};
    if (shouldGlow) {
      switch (glowIntensity) {
        case "subtle":
          glowConfig = {
            ...glowEffect,
            animate: { boxShadow: "0 0 10px rgba(236, 72, 153, 0.4)" }
          };
          break;
        case "medium":
          glowConfig = glowEffect;
          break;
        case "intense":
          glowConfig = {
            ...glowEffect,
            animate: { boxShadow: "0 0 30px rgba(236, 72, 153, 0.9)" }
          };
          break;
      }
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...(shouldGlow ? glowConfig : {})}
        {...props}
      />
    );
  }
);

VibeButton.displayName = "VibeButton";

export { VibeButton, buttonVariants }; 