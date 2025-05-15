import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VibeButton } from '@/components/ui/vibe-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { animations } from '@/theme/animations';

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
    try {
      // Simular inicio de sesión
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (onSuccess) onSuccess(values);
    } catch (error) {
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md p-6 space-y-8 border border-border rounded-xl bg-card"
      initial={animations.scale.initial}
      animate={animations.scale.animate}
      transition={animations.scale.transition}
    >
      <div className="space-y-2 text-center">
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

      <motion.form 
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              className="w-full p-2 rounded-md border border-input bg-background"
            />
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm font-medium text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-2 rounded-md border border-input bg-background"
            />
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm font-medium text-red-500"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>
        </div>

        <VibeButton
          type="submit"
          className="w-full"
          variant="gradient"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" color="white" className="mr-2" /> : null}
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </VibeButton>

        <div className="mt-4 text-center text-sm">
          <a href="#" className="text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </motion.form>
    </motion.div>
  );
} 