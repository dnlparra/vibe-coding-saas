# Guía de Despliegue para VibeApp

Esta guía te ayudará a desplegar tu aplicación VibeApp creada con vibe coding. Sigue estos pasos para poner tu aplicación en producción.

## Requisitos Previos

1. **Actualiza Node.js**: 
   - Es necesario tener Node.js versión 18.18.0 o superior
   - Descarga la última versión estable desde [nodejs.org](https://nodejs.org)
   - Esta aplicación está desarrollada con tecnologías que requieren versiones modernas de Node.js

2. **Cuenta de GitHub**:
   - Necesitarás una cuenta en [GitHub](https://github.com)
   - Esto te permitirá guardar tu código y conectarlo a servicios de despliegue

3. **Editor de código**:
   - Se recomienda Visual Studio Code o Cursor

## Paso 1: Prepara tu repositorio

1. Inicializa Git en tu proyecto si aún no lo has hecho:
   ```bash
   git init
   ```

2. Crea un archivo `.gitignore` (si no existe ya) con el siguiente contenido:
   ```
   # dependencies
   /node_modules
   /.pnp
   .pnp.js
   
   # testing
   /coverage
   
   # next.js
   /.next/
   /out/
   
   # production
   /build
   
   # misc
   .DS_Store
   *.pem
   
   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   
   # local env files
   .env*.local
   
   # vercel
   .vercel
   
   # typescript
   *.tsbuildinfo
   next-env.d.ts
   ```

3. Haz tu primer commit:
   ```bash
   git add .
   git commit -m "Versión inicial de VibeApp"
   ```

4. Crea un repositorio en GitHub:
   - Ve a [github.com](https://github.com)
   - Haz clic en el botón "New" para crear un nuevo repositorio
   - Dale un nombre significativo (ej. "vibe-coding-saas")
   - No inicialices el repositorio con archivos adicionales

5. Conecta tu repositorio local con GitHub:
   ```bash
   git remote add origin https://github.com/tu-usuario/vibe-coding-saas.git
   git branch -M main
   git push -u origin main
   ```

## Paso 2: Configuración para producción

1. Revisa y actualiza el archivo `next.config.ts` si es necesario:
   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'standalone', // Para optimizar el despliegue en Vercel
   };
   
   export default nextConfig;
   ```

2. Crea un archivo `.env.production` con las variables de entorno (sin datos sensibles):
   ```
   # Ejemplo - reemplaza con tus valores reales en la plataforma de despliegue
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-de-supabase
   ```

## Paso 3: Configurar Supabase (opcional, para funcionalidad completa)

1. Crea una cuenta en [Supabase](https://supabase.io)
2. Crea un nuevo proyecto y dale un nombre significativo
3. Una vez creado el proyecto, ve a "Settings" > "API" para obtener:
   - URL de Supabase
   - Anon Key (clave pública)
4. Guarda estos valores para utilizarlos en tu plataforma de despliegue

## Paso 4: Despliegue en Vercel (recomendado)

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu cuenta de GitHub en "Add New" > "Project" > "Import Git Repository"
3. Busca y selecciona el repositorio de tu proyecto
4. Configura el proyecto:
   - Framework Preset: Next.js (detectado automáticamente)
   - Root Directory: ./ (si tu proyecto está en la raíz)
   - Build Command: `npm run build` (por defecto)
   - Output Directory: `.next` (por defecto)
   - En "Environment Variables", agrega las variables del archivo `.env.production`
5. Haz clic en "Deploy"
6. Espera a que el despliegue se complete
7. Una vez finalizado, Vercel te proporcionará una URL de tu aplicación (por ejemplo: `vibe-coding-saas.vercel.app`)

## Paso 5: Despliegue en Netlify (alternativa)

1. Crea una cuenta en [Netlify](https://netlify.com)
2. En el dashboard, haz clic en "New site from Git"
3. Selecciona GitHub como proveedor de Git
4. Busca y selecciona tu repositorio
5. Configura las opciones de construcción:
   - Build Command: `npm run build && next export`
   - Publish Directory: `out`
   - En la sección "Advanced build settings", añade las variables de entorno
6. Haz clic en "Deploy site"
7. Espera a que el sitio se construya y despliegue
8. Una vez completado, obtendrás una URL para tu sitio

## Paso 6: Configuración de dominio personalizado (opcional)

### En Vercel:
1. Ve a tu proyecto en el dashboard de Vercel
2. Navega a "Settings" > "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar los registros DNS

### En Netlify:
1. Ve a tu sitio en el dashboard de Netlify
2. Navega a "Site settings" > "Domain management"
3. Haz clic en "Add custom domain"
4. Sigue las instrucciones para configurar los registros DNS

## Solución de problemas comunes

### Error: "Module not found"
- Verifica que todas las dependencias están instaladas correctamente
- Ejecuta `npm install` antes de intentar desplegar nuevamente

### Error en las variables de entorno
- Asegúrate de que has configurado correctamente las variables de entorno en la plataforma de despliegue
- Las variables deben tener el mismo nombre que en tu archivo `.env.local`

### Problemas con la compilación
- Verifica los logs de construcción para identificar errores específicos
- Asegúrate de tener la versión correcta de Node.js configurada en tu plataforma de despliegue

## Recursos adicionales

- [Documentación de despliegue de Next.js](https://nextjs.org/docs/deployment)
- [Guía de despliegue de Vercel](https://vercel.com/docs/concepts/deployments/overview)
- [Guía de despliegue de Netlify](https://docs.netlify.com/site-deploys/overview/)
- [Documentación de Supabase](https://supabase.io/docs)

---

¡Felicidades! Tu aplicación VibeApp ahora debería estar desplegada y accesible en línea. Si tienes problemas o preguntas, consulta la documentación específica de cada plataforma o busca ayuda en sus respectivos foros de soporte. 