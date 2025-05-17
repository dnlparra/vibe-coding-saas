import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VibeButton } from '@/components/ui/vibe-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { animations } from '@/theme/animations';
import { signInWithEmail } from '@/lib/supabase';

const loginSchema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: (values: LoginValues) => void;
  onError?: (error: Error) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Autenticación con Supabase
      const { data, error } = await signInWithEmail(values.email, values.password);
      
      if (error) {
        let errorMessage = error.message;
        // Mensajes de error más amigables
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Credenciales inválidas. Por favor verifica tu email y contraseña.';
        }
        setAuthError(errorMessage);
        if (onError) onError(error);
        return;
      }

      console.log('Usuario autenticado:', data?.user);
      if (onSuccess) onSuccess(values);
    } catch (error) {
      console.error('Error de autenticación:', error);
      setAuthError('Ocurrió un error al iniciar sesión. Por favor intenta nuevamente.');
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md p-8 space-y-8 rounded-xl bg-card shadow-lg border border-border/50"
      initial={animations.scale.initial}
      animate={animations.scale.animate}
      transition={animations.scale.transition}
    >
      <div className="space-y-3 text-center">
        <motion.h1 
          className="text-2xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Bienvenido de nuevo
        </motion.h1>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Ingresa tus credenciales para acceder a tu cuenta
        </motion.p>
      </div>

      {authError && (
        <motion.div
          className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {authError}
        </motion.div>
      )}

      <motion.form 
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              disabled={isLoading}
            />
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm font-medium text-destructive"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <a href="#" className="text-xs text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              disabled={isLoading}
            />
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm font-medium text-destructive"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>
        </div>

        <VibeButton
          type="submit"
          className="w-full py-2"
          variant="gradient"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Iniciar sesión
        </VibeButton>
      </motion.form>
    </motion.div>
  );
} 