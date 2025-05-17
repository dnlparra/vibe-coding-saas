'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/features/auth/register-form';
import { animations } from '@/theme/animations';
import { VibeCard } from '@/components/ui/vibe-card';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    // En una aplicación real, aquí redirigimos al usuario a verificar su email
    // o directamente al login

    // Redirigir al login después de registrarse
    router.push('/login?registered=true');
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
            Crea tu cuenta en segundos
          </motion.div>
          <motion.h1 
            className="text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Únete a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">VibeApp</span>
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Crea tu cuenta y descubre todas las funcionalidades que tenemos para ti.
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
                <h3 className="font-semibold text-lg">Beneficios</h3>
                <ul className="space-y-3">
                  {[
                    'Registro gratuito en segundos',
                    'Acceso al dashboard personalizado',
                    'Estadísticas en tiempo real',
                    'Soporte técnico prioritario',
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
          <RegisterForm onSuccess={handleRegisterSuccess} />
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                href="/login" 
                className="text-primary font-medium hover:underline"
              >
                Inicia sesión aquí
              </Link>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Al registrarte, aceptas nuestros{' '}
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