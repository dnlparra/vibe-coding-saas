# VibeApp SaaS - Ejemplo de Vibe Coding

Este es un proyecto de ejemplo que muestra cómo crear una aplicación web SaaS moderna utilizando los principios de "vibe coding" con Next.js, TailwindCSS y Framer Motion.

## 🚀 Características

- ✅ Diseño moderno con animaciones fluidas
- ✅ Login de usuarios simulado
- ✅ Dashboard con estadísticas ficticias
- ✅ Componentes reutilizables con estilo "vibe"
- ✅ Tema claro/oscuro automático

## 📋 Requisitos Previos

- Node.js 18.18.0 o superior
- NPM o Yarn
- Git

## 🛠️ Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd vibe-coding-saas
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Visita `http://localhost:3000` para ver la aplicación.

## 🔧 Estructura del Proyecto

La estructura del proyecto sigue las mejores prácticas para vibe coding:

```
src/
  app/                  # App Router de Next.js
  components/           # Componentes reutilizables
    ui/                 # Componentes de UI básicos
    features/           # Componentes específicos de features
    layout/             # Componentes de disposición
  lib/                  # Utilidades y configuraciones
    hooks/              # Custom hooks
    utils/              # Funciones utilitarias
  theme/                # Sistema de diseño
    animations.ts       # Definición de animaciones
  features/             # Organización por características
    auth/               # Autenticación
    dashboard/          # Panel de control
  styles/               # Estilos globales
  types/                # Definiciones de tipos
```

## 🌐 Despliegue

Para desplegar esta aplicación, recomendamos usar Vercel o Netlify. A continuación te explico cómo hacerlo:

### Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub, GitLab o Bitbucket
3. Configura el proyecto:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (por defecto)
   - Output Directory: `.next` (por defecto)
4. Haz clic en "Deploy"

### Despliegue en Netlify

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Haz clic en "New site from Git"
3. Conecta tu repositorio
4. Configura el proyecto:
   - Build Command: `npm run build`
   - Publish Directory: `out`
5. Haz clic en "Deploy site"

## 📦 Servicios Externos

Para un proyecto completo en producción, necesitarías configurar:

### Supabase (Base de datos y autenticación)

1. Crea una cuenta en [Supabase](https://supabase.io)
2. Crea un nuevo proyecto
3. Obtén tu URL y Anon Key desde la configuración del proyecto
4. Configura las variables de entorno en tu archivo `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-de-supabase
   ```

## 🔐 Variables de Entorno

Para desarrollo local, crea un archivo `.env.local` con las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-de-supabase
```

## 📚 Recursos y Documentación

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Creado con ❤️ utilizando vibe coding principles
