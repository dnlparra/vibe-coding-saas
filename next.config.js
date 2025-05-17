/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Para optimizar el despliegue en Vercel
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
