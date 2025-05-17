import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isLoading?: boolean;
}

export const VibeButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isLoading = false,
  className = '',
  disabled = false,
  ...props
}) => {
  // Definir clases base según variante
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-sm',
    secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-sm',
    outline: 'border border-input bg-transparent hover:bg-primary-5 hover:border-primary/40 text-foreground',
    ghost: 'hover:bg-primary-5 text-foreground',
    subtle: 'bg-primary-5 text-primary hover:bg-primary-10',
    gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:brightness-105 shadow-sm',
  };

  // Definir clases de tamaño
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-10 px-4 py-2 rounded-md',
    lg: 'h-11 px-5 py-2.5 text-base rounded-lg',
  };
  
  // Combinar todas las clases
  const buttonClasses = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    isLoading && 'opacity-80 pointer-events-none',
    className
  );
  
  // Si href está proporcionado y el botón no está cargando ni deshabilitado, renderizar un Link
  if (href && !isLoading && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full mr-2" />
            Cargando...
          </>
        ) : (
          children
        )}
      </Link>
    );
  }
  
  // De lo contrario, renderizar un botón
  return (
    <button 
      className={buttonClasses} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current/30 border-t-current animate-spin rounded-full mr-2" />
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
}; 