import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'default' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const VibeButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...props
}) => {
  // Definir clases base según variante
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover-bg-primary-90 shadow-sm',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    default: 'bg-background text-foreground hover-bg-accent-50 border border-input',
    gradient: 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:brightness-105',
  };

  // Definir clases de tamaño
  const sizeClasses = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-6 py-3 text-lg',
  };
  
  // Combinar todas las clases
  const buttonClasses = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 ring-primary-50',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  // Si href está proporcionado, renderizar un Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }
  
  // De lo contrario, renderizar un botón
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}; 