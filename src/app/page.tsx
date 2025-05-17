'use client';

import React from 'react';
import Link from 'next/link';
import { VibeButton } from '@/components/ui/vibe-button';
import { VibeCard } from '@/components/ui/vibe-card';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="header">
        <div className="container flex justify-between items-center">
          <div className="font-bold">
            <span className="gradient-text">VibeApp</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <VibeButton variant="ghost">Login</VibeButton>
            </Link>
            <Link href="/register">
              <VibeButton variant="primary">Registro</VibeButton>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bold mb-6">
              Tu Nueva Experiencia <br />
              <span className="gradient-text">SaaS Moderna</span>
            </h1>
            <p className="mb-8 mx-auto" style={{ maxWidth: "640px" }}>
              Descubre el poder del vibe coding con nuestra plataforma de última generación.
              Interfaz moderna, animaciones fluidas y una experiencia de usuario excepcional.
            </p>
            <div className="flex justify-center gap-4">
              <VibeButton href="/register" size="lg">
                Comenzar ahora
              </VibeButton>
              <VibeButton href="#features" variant="outline" size="lg">
                Ver características
              </VibeButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="feature-section">
        <div className="container">
          <h2 className="font-bold text-center mb-12">
            Características principales
          </h2>
          <div className="grid">
            {[
              {
                title: 'Diseño moderno',
                description: 'Interfaz de usuario limpia y moderna con animaciones fluidas',
                icon: '✨',
              },
              {
                title: 'Estadísticas en tiempo real',
                description: 'Monitorea tu progreso con análisis detallados y visualizaciones',
                icon: '📊',
              },
              {
                title: 'Panel de control personalizable',
                description: 'Adapta tu experiencia con widgets y temas personalizados',
                icon: '🛠️',
              },
            ].map((feature, index) => (
              <VibeCard
                key={index}
                hover="lift"
                variant="default"
                className="feature-card"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </VibeCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center" style={{ maxWidth: "800px" }}>
          <h2 className="font-bold mb-6">
            ¿Listo para empezar tu experiencia?
          </h2>
          <p className="mb-8">
            Únete a miles de desarrolladores que están creando el futuro con VibeApp
          </p>
          <VibeButton href="/register" size="lg">
            Registrarse
          </VibeButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer mt-auto">
        <div className="container">
          <div className="flex flex-col flex-md-row justify-between items-center">
            <div className="mb-4">
              <span className="gradient-text font-bold">VibeApp</span>
            </div>
            <div className="text-center">
              <p>
                © 2025 VibeApp. Todos los derechos reservados.
              </p>
              <p className="mt-1">
                Una demostración de vibe coding con Next.js.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
