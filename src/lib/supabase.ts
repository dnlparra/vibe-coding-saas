import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno para Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificar que las variables de entorno existen
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Error crítico: Las variables de entorno de Supabase no están configuradas. ' +
    'Por favor, configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY ' +
    'en el archivo .env.local'
  );
}

// Crear el cliente de Supabase
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Función para obtener el usuario actual
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    return null;
  }
};

// Función para iniciar sesión con email y contraseña
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error de inicio de sesión:', error);
    return { data: null, error };
  }
};

// Función para registrarse con email y contraseña
export const signUpWithEmail = async (email: string, password: string, userData: any) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error de registro:', error);
    return { data: null, error };
  }
};

// Función para cerrar sesión
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error al cerrar sesión:', error);
    return { error };
  }
};

// Función para solicitar recuperación de contraseña
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error al solicitar recuperación de contraseña:', error);
    return { error };
  }
};

// Función para actualizar el perfil del usuario
export const updateUserProfile = async (userData: { email?: string; data?: any }) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: userData.email,
      data: userData.data
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error al actualizar el perfil:', error);
    return { data: null, error };
  }
}; 