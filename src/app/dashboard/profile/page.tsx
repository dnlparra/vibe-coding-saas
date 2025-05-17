'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProfileForm } from '@/components/features/profile/profile-form';
import { toast } from 'sonner';

export default function ProfilePage() {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirigir al dashboard después de una actualización exitosa
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const handleError = (error: Error) => {
    toast.error(`Error al actualizar el perfil: ${error.message}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Tu Perfil</h1>
          <p className="text-muted-foreground mt-1">
            Actualiza tu información personal
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <ProfileForm onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </div>
  );
} 