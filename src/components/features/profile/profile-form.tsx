'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getCurrentUser, updateUserProfile } from '@/lib/supabase';
import { VibeButton } from '@/components/ui/vibe-button';
import { VibeInput } from '@/components/ui/vibe-input';
import { toast } from 'sonner';

// Schema para validación
const profileSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
});

type ProfileValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onSuccess?: (data: ProfileValues) => void;
  onError?: (error: Error) => void;
}

export function ProfileForm({ onSuccess, onError }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Inicializar el formulario con react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // Cargar los datos del usuario al iniciar
  useEffect(() => {
    const loadUserData = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
        // Actualizar los valores por defecto del formulario
        reset({
          name: user.user_metadata?.name || user.user_metadata?.full_name || '',
          email: user.email || '',
        });
      }
    };

    loadUserData();
  }, [reset]);

  const onSubmit = async (values: ProfileValues) => {
    setIsLoading(true);
    setFormError(null);
    
    try {
      // Actualizar perfil en Supabase
      const { data, error } = await updateUserProfile({
        email: values.email,
        data: {
          name: values.name,
          full_name: values.name,
        }
      });
      
      if (error) {
        let errorMessage = error.message;
        // Mensajes de error más amigables
        if (error.message.includes('email change requires verification')) {
          errorMessage = 'Se ha enviado un correo electrónico para verificar el cambio de email.';
          toast.success(errorMessage);
          if (onSuccess) onSuccess(values);
          return;
        }
        
        setFormError(errorMessage);
        if (onError) onError(error);
        return;
      }

      toast.success('Perfil actualizado con éxito');
      if (onSuccess) onSuccess(values);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setFormError('Ocurrió un error al actualizar el perfil. Por favor intenta nuevamente.');
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <VibeInput
            label="Nombre"
            placeholder="Tu nombre"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

        <div className="space-y-2">
          <VibeInput
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <p className="text-xs text-muted-foreground">
            Al cambiar tu email, recibirás un correo de verificación.
          </p>
        </div>

        {formError && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {formError}
          </div>
        )}

        <VibeButton
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Actualizar Perfil
        </VibeButton>
      </form>
    </div>
  );
} 