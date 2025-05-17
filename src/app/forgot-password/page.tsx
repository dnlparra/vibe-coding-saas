'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VibeButton } from '@/components/ui/vibe-button';
import { VibeCard } from '@/components/ui/vibe-card';
import { animations } from '@/theme/animations';
import { resetPassword } from '@/lib/supabase';

const schema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await resetPassword(values.email);
      
      if (error) {
        setError('No pudimos procesar tu solicitud. Por favor, intenta nuevamente.');
        return;
      }
      
      setIsSuccess(true);
    } catch (error) {
      setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
      console.error('Error al solicitar recuperación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-background to-[var(--purple-1)]">
      <div className="w-full max-w-md">
        <motion.div
          initial={animations.scale.initial}
          animate={animations.scale.animate}
          transition={animations.scale.transition}
          className="text-center mb-6"
        >
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                VibeApp
              </span>
            </h1>
          </Link>
        </motion.div>
        
        <VibeCard className="w-full p-8">
          {isSuccess ? (
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-primary-5 text-primary rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">¡Revisa tu correo!</h2>
              <p className="text-muted-foreground">
                Hemos enviado instrucciones para restablecer tu contraseña a tu dirección de correo.
              </p>
              <div className="mt-6">
                <Link href="/login">
                  <VibeButton variant="outline" className="w-full">
                    Volver al inicio de sesión
                  </VibeButton>
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center mb-6">Recuperar contraseña</h2>
              
              {error && (
                <motion.div
                  className="p-3 mb-4 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Te enviaremos un enlace para restablecer tu contraseña.
                </p>
                
                <VibeButton
                  type="submit"
                  className="w-full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Recuperar contraseña
                </VibeButton>
                
                <div className="text-center mt-4">
                  <Link href="/login" className="text-sm text-primary hover:underline">
                    Volver al inicio de sesión
                  </Link>
                </div>
              </form>
            </>
          )}
        </VibeCard>
      </div>
    </main>
  );
} 