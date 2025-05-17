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
          <div className="font-bold text-xl">
            <span className="gradient-text">VibeApp</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <VibeButton variant="ghost">Iniciar sesión</VibeButton>
            </Link>
            <Link href="/register">
              <VibeButton variant="primary">Registro</VibeButton>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container max-w-6xl py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex mb-6 px-4 py-1.5 bg-primary-5 text-primary text-sm font-medium rounded-full">
                La nueva era de los SaaS modernos
              </div>
              <h1 className="mb-6 text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight">
                Tu Nueva <span className="gradient-text">Experiencia SaaS</span>
              </h1>
              <p className="mb-8 text-text-secondary-color text-lg">
                Descubre el poder del vibe coding con nuestra plataforma de última generación.
                Interfaz moderna, animaciones fluidas y una experiencia de usuario excepcional.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <VibeButton href="/register" size="lg">
                  Comenzar ahora
                </VibeButton>
                <VibeButton href="#features" variant="outline" size="lg">
                  Ver características
                </VibeButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative p-2 bg-gradient-to-b from-primary/20 to-background rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl opacity-70 rounded-2xl"></div>
                <div className="relative bg-card rounded-xl p-6 shadow-sm overflow-hidden">
                  <div className="h-[350px] w-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                    <div className="text-8xl">✨</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="feature-section py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-3xl sm:text-4xl mb-6">
              Características principales
            </h2>
            <p className="text-muted-foreground text-lg">
              Nuestra plataforma combina potencia, simplicidad y elegancia para brindarte
              la mejor experiencia de usuario.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Diseño moderno',
                description: 'Interfaz de usuario limpia y moderna con animaciones fluidas para una experiencia premium.',
                icon: '✨',
                color: 'bg-primary-5 text-primary',
                delay: 0.1
              },
              {
                title: 'Estadísticas en tiempo real',
                description: 'Monitorea tu progreso con análisis detallados y visualizaciones actualizadas en tiempo real.',
                icon: '📊',
                color: 'bg-accent-5 text-accent',
                delay: 0.3
              },
              {
                title: 'Panel personalizable',
                description: 'Adapta tu experiencia con widgets y temas personalizados según tus necesidades.',
                icon: '🛠️',
                color: 'bg-secondary/10 text-secondary',
                delay: 0.5
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true }}
              >
                <VibeCard
                  hover="lift"
                  variant="default"
                  className="h-full flex flex-col"
                >
                  <div className={`text-3xl mb-4 w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </VibeCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container max-w-4xl text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card p-8 sm:p-12 rounded-2xl shadow-xl"
          >
            <h2 className="font-bold text-3xl sm:text-4xl mb-6">
              ¿Listo para comenzar tu experiencia?
            </h2>
            <p className="mb-8 text-muted-foreground text-lg max-w-2xl mx-auto">
              Únete a miles de desarrolladores que están creando el futuro con VibeApp
              y lleva tus proyectos al siguiente nivel.
            </p>
            <VibeButton href="/register" size="lg" variant="gradient">
              Crear cuenta gratis
            </VibeButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center py-8">
            <div className="mb-4 md:mb-0">
              <span className="gradient-text font-bold text-xl">VibeApp</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground">
                © 2025 VibeApp. Todos los derechos reservados.
              </p>
              <p className="mt-1 text-muted-foreground text-sm">
                Una demostración de vibe coding con Next.js.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
