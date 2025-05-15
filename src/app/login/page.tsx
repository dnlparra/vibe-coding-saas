'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/features/auth/login-form';
import { animations } from '@/theme/animations';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // En una aplicación real, aquí guardaríamos el token de sesión
    // y haríamos verificaciones adicionales

    // Redirigir al dashboard después de iniciar sesión
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-background to-accent/5">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="hidden md:flex flex-col space-y-4"
          initial={animations.fadeIn.initial}
          animate={animations.fadeIn.animate}
          transition={animations.fadeIn.transition}
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