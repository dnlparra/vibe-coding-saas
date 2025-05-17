'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/features/auth/register-form';
import { animations } from '@/theme/animations';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    // En una aplicación real, aquí redirigimos al usuario a verificar su email
    // o directamente al login

    // Redirigir al login después de registrarse
    router.push('/login?registered=true');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-background to-[#fdf2ff]">
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
            Únete a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">VibeApp</span>
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Crea tu cuenta y descubre todas las funcionalidades que tenemos para ti.
          </motion.p>
          <motion.ul
            className="space-y-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
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
                <span className="mr-2 text-accent">✓</span> {item}
              </motion.li>
            ))}
          </motion.ul>
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