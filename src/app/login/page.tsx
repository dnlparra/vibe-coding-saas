'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/features/auth/login-form';
import { animations } from '@/theme/animations';
import { VibeCard } from '@/components/ui/vibe-card';

// Componente para usar searchParams de manera segura
const LoginMessage = () => {
  // useSearchParams solo se usa dentro de este componente
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const registeredSuccess = searchParams.get('registered') === 'true';

  if (!registeredSuccess) return null;

  return (
    <motion.div
      className="mb-4 w-full p-4 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      ¡Registro exitoso! Por favor, inicia sesión con tus credenciales.
    </motion.div>
  );
};

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-background to-[var(--purple-1)]">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="hidden md:flex flex-col space-y-6"
          initial={animations.fadeIn.initial}
          animate={animations.fadeIn.animate}
          transition={animations.fadeIn.transition}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex mb-2 px-4 py-1.5 bg-primary-5 text-primary text-sm font-medium rounded-full self-start"
          >
            Plataforma SaaS moderna
          </motion.div>
          <motion.h1 
            className="text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Bienvenido a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">VibeApp</span>
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Accede a tu cuenta para descubrir todas las funcionalidades que tenemos para ti.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <VibeCard
              variant="glass"
              className="border-primary border-opacity-10"
            >
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">¿Qué ofrecemos?</h3>
                <ul className="space-y-3">
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
                      <span className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-primary-5 text-primary">✓</span> 
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </VibeCard>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center">
          <Suspense fallback={null}>
            <LoginMessage />
          </Suspense>

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