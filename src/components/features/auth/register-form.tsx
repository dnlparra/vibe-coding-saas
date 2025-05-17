import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VibeButton } from '@/components/ui/vibe-button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { animations } from '@/theme/animations';
import { signUpWithEmail } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
  confirmPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: (values: RegisterValues) => void;
  onError?: (error: Error) => void;
}

export function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [registrationStep, setRegistrationStep] = useState<'form' | 'success'>('form');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Registro con Supabase
      const userData = {
        name: values.name,
        full_name: values.name,
      };

      const { data, error } = await signUpWithEmail(
        values.email, 
        values.password, 
        userData
      );
      
      if (error) {
        let errorMessage = error.message;
        
        // Mensajes de error más amigables
        if (error.message.includes('already registered')) {
          errorMessage = 'Este correo electrónico ya está registrado. Por favor intenta con otro o inicia sesión.';
        }
        
        setAuthError(errorMessage);
        if (onError) onError(error);
        return;
      }

      console.log('Usuario registrado:', data?.user);
      setRegistrationStep('success');
      if (onSuccess) onSuccess(values);
    } catch (error) {
      console.error('Error de registro:', error);
      setAuthError('Ocurrió un error al crear la cuenta. Por favor intenta nuevamente.');
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar el formulario o el mensaje de éxito
  if (registrationStep === 'success') {
    return (
      <motion.div
        className="w-full max-w-md p-8 space-y-8 rounded-xl bg-card shadow-lg border border-border/50"
        initial={animations.scale.initial}
        animate={animations.scale.animate}
        transition={animations.scale.transition}
      >
        <div className="space-y-4 text-center">
          <motion.div 
            className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ¡Registro exitoso!
          </motion.h1>
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hemos enviado un correo de confirmación a tu email. 
            Por favor revisa tu bandeja de entrada para verificar tu cuenta.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <VibeButton 
            variant="primary" 
            className="w-full" 
            href="/login"
          >
            Ir a iniciar sesión
          </VibeButton>
        </motion.div>
      </motion.div>
    );
  }

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
          Crea tu cuenta
        </motion.h1>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Regístrate para acceder a todas las funcionalidades
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
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Nombre completo
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="Tu nombre"
              className={cn(
                'w-full px-3 py-2 rounded-md border text-foreground',
                'bg-background focus:outline-none focus:ring-2 ring-primary-50',
                'placeholder:text-muted-foreground disabled:opacity-50',
                errors.name ? 'border-destructive' : 'border-input'
              )}
              disabled={isLoading}
            />
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm font-medium text-destructive"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              className={cn(
                'w-full px-3 py-2 rounded-md border text-foreground',
                'bg-background focus:outline-none focus:ring-2 ring-primary-50',
                'placeholder:text-muted-foreground disabled:opacity-50',
                errors.email ? 'border-destructive' : 'border-input'
              )}
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
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Contraseña
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="••••••••"
              className={cn(
                'w-full px-3 py-2 rounded-md border text-foreground',
                'bg-background focus:outline-none focus:ring-2 ring-primary-50',
                'placeholder:text-muted-foreground disabled:opacity-50',
                errors.password ? 'border-destructive' : 'border-input'
              )}
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
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
              Confirmar contraseña
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className={cn(
                'w-full px-3 py-2 rounded-md border text-foreground',
                'bg-background focus:outline-none focus:ring-2 ring-primary-50',
                'placeholder:text-muted-foreground disabled:opacity-50',
                errors.confirmPassword ? 'border-destructive' : 'border-input'
              )}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm font-medium text-destructive"
              >
                {errors.confirmPassword.message}
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
          Crear cuenta
        </VibeButton>
      </motion.form>
    </motion.div>
  );
} 