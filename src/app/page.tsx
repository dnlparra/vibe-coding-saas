'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { VibeButton } from '@/components/ui/vibe-button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center font-bold text-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VibeApp
            </span>
          </motion.div>
          <nav className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Link href="/login">
                <VibeButton variant="ghost">Login</VibeButton>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/register">
                <VibeButton variant="default">Registro</VibeButton>
              </Link>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-background to-accent/5">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tu Nueva Experiencia <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SaaS Moderna
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Descubre el poder del vibe coding con nuestra plataforma de última generación.
            Interfaz moderna, animaciones fluidas y una experiencia de usuario excepcional.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/register">
              <VibeButton variant="gradient" size="lg">
                Comenzar ahora
              </VibeButton>
            </Link>
            <Link href="#features">
              <VibeButton variant="outline" size="lg">
                Ver características
              </VibeButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Características principales
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
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
              <motion.div
                key={feature.title}
                className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4 text-center text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2025 VibeApp. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">
            Una demostración de vibe coding con Next.js, TailwindCSS y Framer Motion.
          </p>
        </div>
      </footer>
    </main>
  );
}
