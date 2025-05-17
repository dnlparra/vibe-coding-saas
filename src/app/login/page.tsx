'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Componente mejorado de formulario de login con Tailwind
const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  return (
    <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-card shadow-lg border border-border/50">
      <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSuccess(); }} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className={cn(
                'w-full px-3 py-2 rounded-md border border-input text-foreground',
                'bg-background focus:outline-none focus:ring-2 ring-primary-50',
                'placeholder:text-muted-foreground'
              )}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className={cn(
                'w-full px-3 py-2 rounded-md border border-input text-foreground',
                'bg-background focus:outline-none focus:ring-2 ring-primary-50',
                'placeholder:text-muted-foreground'
              )}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className={cn(
            'w-full inline-flex items-center justify-center rounded-md font-medium',
            'h-10 px-4 py-2 bg-gradient-to-r from-primary to-accent',
            'text-primary-foreground transition-all hover:brightness-105',
            'focus-visible:outline-none focus-visible:ring-2 ring-primary-50'
          )}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // En una aplicación real, aquí guardaríamos el token de sesión
    // y haríamos verificaciones adicionales

    // Redirigir al dashboard después de iniciar sesión
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-background to-[#fdf2ff]">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="hidden md:flex flex-col space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Bienvenido a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">VibeApp</span>
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Accede a tu cuenta para descubrir todas las funcionalidades que tenemos para ti.
          </motion.p>
          <motion.ul
            className="space-y-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              'Dashboard personalizado con estadísticas en tiempo real',
              'Interfaz de usuario moderna y atractiva',
              'Animaciones fluidas para una mejor experiencia',
              'Análisis detallados de tu actividad',
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <span className="mr-2 text-accent">✓</span> {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="flex flex-col items-center">
          <LoginForm onSuccess={handleLoginSuccess} />
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link 
                href="/register" 
                className="text-primary font-medium hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Al iniciar sesión, aceptas nuestros{' '}
              <Link href="/terms" className="hover:underline">
                Términos de servicio
              </Link>{' '}
              y{' '}
              <Link href="/privacy" className="hover:underline">
                Política de privacidad
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 